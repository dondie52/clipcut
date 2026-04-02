/**
 * Project Service
 * Handles cloud project storage operations with Supabase
 * @module services/projectService
 */

import { supabase, isSupabaseConfigured } from "../supabase/supabaseClient";
import { uploadFile, compressImage } from "../utils/fileUpload";
import { trackAPIRequest, trackFileUpload, METRIC_TYPES } from "../utils/performance";
import { sanitizeTextInput, sanitizeFileName } from "../utils/validation";
import { retryWithBackoff, getUserFriendlyMessage } from "../utils/errorHandling";
import { logger } from "../utils/logger";
import { createRateLimiter } from "../utils/rateLimiter";
import { deleteProjectMedia as deleteProjectMediaFromIDB } from "../utils/mediaStore";

/**
 * Rate limiters for API operations
 */
const apiRateLimiter = createRateLimiter(30, 60000); // 30 API calls per minute
const uploadRateLimiter = createRateLimiter(10, 60000); // 10 uploads per minute

/**
 * Check rate limiter and throw if exceeded
 * @param {Object} limiter - Rate limiter instance
 * @param {string} operation - Operation name for error message
 */
function checkRateLimit(limiter, operation) {
  if (!limiter.canAttempt()) {
    const waitTime = Math.ceil(limiter.getTimeUntilReset() / 1000);
    throw new Error(`Too many ${operation} requests. Please wait ${waitTime} seconds before trying again.`);
  }
  limiter.recordAttempt();
}

/**
 * File upload security constants
 */
const UPLOAD_LIMITS = {
  // Maximum project file size (500MB)
  MAX_FILE_SIZE: 500 * 1024 * 1024,
  // Allowed video MIME types
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"],
  // Allowed audio MIME types
  ALLOWED_AUDIO_TYPES: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/webm"],
  // Allowed image MIME types
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
};

/**
 * Check if a file type is allowed for project media
 * @param {string} mimeType - File MIME type
 * @returns {boolean} True if allowed
 */
function isAllowedMediaType(mimeType) {
  return (
    UPLOAD_LIMITS.ALLOWED_VIDEO_TYPES.includes(mimeType) ||
    UPLOAD_LIMITS.ALLOWED_AUDIO_TYPES.includes(mimeType) ||
    UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES.includes(mimeType)
  );
}

/**
 * Generate a unique filename for storage
 * @param {string} originalName - Original filename
 * @returns {string} Unique filename
 */
function generateUniqueFilename(originalName) {
  // Sanitize the original filename first
  const sanitized = sanitizeFileName(originalName);
  const ext = sanitized.split(".").pop();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}_${random}.${ext}`;
}

/**
 * Save a project to Supabase (database + storage)
 * @param {string} userId - User UUID
 * @param {Object} projectData - Project data
 * @param {string} projectData.name - Project name
 * @param {string} [projectData.id] - Existing project ID for updates
 * @param {Array} projectData.clips - Timeline clips
 * @param {number} projectData.duration - Total duration
 * @param {string} projectData.resolution - Export resolution
 * @param {Blob} [projectData.thumbnail] - Thumbnail image blob
 * @returns {Promise<Object>} Saved project data
 * @throws {Error} If save fails
 */
export async function saveProject(userId, projectData) {
  if (!isSupabaseConfigured()) {
    // Fallback to localStorage if Supabase not configured
    return saveProjectToLocalStorage(projectData);
  }

  checkRateLimit(apiRateLimiter, 'save');

  const { name, id, clips, duration, resolution, thumbnail, bgMusic } = projectData;
  
  // Sanitize project name before saving (max 100 chars, remove HTML, trim)
  const sanitizedName = sanitizeTextInput(name || "Untitled Project", { maxLength: 100 });

  // Prepare project data for database — clips already come pre-serialized
  // (binary fields stripped by caller), so store them as-is to preserve all effects
  const dbProjectData = {
    name: sanitizedName,
    project_data: {
      clips: clips,
      savedAt: new Date().toISOString(),
      ...(bgMusic ? { bgMusic } : {}),
    },
    duration_seconds: Math.round(duration || 0),
    resolution: resolution || "1080p",
    updated_at: new Date().toISOString(),
  };

  let savedProject;

  if (id) {
    // Update existing project
    savedProject = await trackAPIRequest(
      'projects/update',
      async () => {
        const result = await supabase
          .from("projects")
          .update(dbProjectData)
          .eq("id", id)
          .eq("user_id", userId)
          .select()
          .single();
        if (result.error) throw result.error;
        return result.data;
      },
      { operation: 'update', projectId: id }
    );
  } else {
    // Create new project
    savedProject = await trackAPIRequest(
      'projects/create',
      async () => {
        const result = await supabase
          .from("projects")
          .insert({ ...dbProjectData, user_id: userId })
          .select()
          .single();
        if (result.error) throw result.error;
        return result.data;
      },
      { operation: 'create' }
    );
  }

  // Upload thumbnail if provided
  if (thumbnail && savedProject.id) {
    try {
      const thumbnailUrl = await trackFileUpload(
        'thumbnail.jpg',
        thumbnail.size,
        async () => uploadProjectThumbnail(userId, savedProject.id, thumbnail),
        { operation: 'thumbnail', projectId: savedProject.id }
      );
      // Update project with thumbnail URL
      await trackAPIRequest(
        'projects/update-thumbnail',
        async () => {
          const result = await supabase
            .from("projects")
            .update({ thumbnail_url: thumbnailUrl })
            .eq("id", savedProject.id);
          if (result.error) throw result.error;
          return result;
        },
        { projectId: savedProject.id }
      );
      savedProject.thumbnail_url = thumbnailUrl;
    } catch (e) {
      console.warn("Thumbnail upload failed:", e);
    }
  }

  return savedProject;
}

/**
 * Load a project from Supabase
 * @param {string} projectId - Project UUID
 * @param {string} userId - User UUID (for RLS verification)
 * @returns {Promise<Object>} Project data
 * @throws {Error} If load fails
 */
export async function loadProject(projectId, userId) {
  if (!isSupabaseConfigured()) {
    return loadProjectFromLocalStorage(projectId);
  }

  checkRateLimit(apiRateLimiter, 'load');

  const data = await retryWithBackoff(
    () => trackAPIRequest(
      'projects/load',
      async () => {
        const result = await supabase
          .from("projects")
          .select("*")
          .eq("id", projectId)
          .single();
        if (result.error) throw result.error;
        return result.data;
      },
      { projectId, operation: 'load' }
    ),
    {
      maxRetries: 2,
      baseDelay: 1000,
      onRetry: ({ attempt }) => {
        logger.warn(`Retrying loadProject (attempt ${attempt})`);
      },
    }
  );

  // Verify ownership or public access
  if (data.user_id !== userId && !data.is_public) {
    throw new Error("Access denied");
  }

  return data;
}

/**
 * List all projects for a user
 * @param {string} userId - User UUID
 * @param {Object} [options] - Query options
 * @param {number} [options.limit=50] - Maximum projects to return
 * @param {number} [options.offset=0] - Offset for pagination
 * @param {string} [options.orderBy='updated_at'] - Sort field
 * @param {boolean} [options.ascending=false] - Sort direction
 * @returns {Promise<Array>} Array of project summaries
 * @throws {Error} If query fails
 */
export async function listProjects(userId, options = {}) {
  if (!isSupabaseConfigured()) {
    return listProjectsFromLocalStorage();
  }

  checkRateLimit(apiRateLimiter, 'list');

  const { limit = 50, offset = 0, orderBy = "updated_at", ascending = false } = options;

  const data = await retryWithBackoff(
    () => trackAPIRequest(
      'projects/list',
      async () => {
        const result = await supabase
          .from("projects")
          .select("id, name, thumbnail_url, duration_seconds, resolution, created_at, updated_at")
          .eq("user_id", userId)
          .order(orderBy, { ascending })
          .range(offset, offset + limit - 1);
        if (result.error) throw result.error;
        return result.data || [];
      },
      { operation: 'list', limit, offset }
    ),
    {
      maxRetries: 2,
      baseDelay: 1000,
      onRetry: ({ attempt, delay }) => {
        logger.warn(`Retrying listProjects (attempt ${attempt}, waiting ${Math.round(delay)}ms)`);
      },
    }
  );

  return data;
}

/**
 * Delete a project and its associated files
 * @param {string} projectId - Project UUID
 * @param {string} userId - User UUID
 * @returns {Promise<void>}
 * @throws {Error} If delete fails
 */
export async function deleteProject(projectId, userId) {
  if (!isSupabaseConfigured()) {
    return deleteProjectFromLocalStorage(projectId);
  }

  checkRateLimit(apiRateLimiter, 'delete');

  // Do not use .single() before delete — 0 rows → PGRST116 / HTTP 406 (already deleted, stale UI, or RLS).
  // Storage paths only need userId + projectId; DB delete is idempotent when no row matches.

  // Delete associated storage files
  try {
    const { error: storageError } = await supabase.storage
      .from("projects")
      .remove([`${userId}/${projectId}`]);

    if (storageError) console.warn("Storage cleanup warning:", storageError);
  } catch (e) {
    console.warn("Storage cleanup failed:", e);
  }

  // Delete the project record
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", userId);

  if (error) throw error;
}

/**
 * Update project metadata
 * @param {string} projectId - Project UUID
 * @param {string} userId - User UUID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated project
 * @throws {Error} If update fails
 */
export async function updateProject(projectId, userId, updates) {
  if (!isSupabaseConfigured()) {
    return updateProjectInLocalStorage(projectId, updates);
  }

  const allowedFields = ["name", "description", "resolution", "is_public", "is_template"];
  const filteredUpdates = {};

  for (const key of allowedFields) {
    if (key in updates) {
      filteredUpdates[key] = updates[key];
    }
  }

  filteredUpdates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("projects")
    .update(filteredUpdates)
    .eq("id", projectId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Upload a media file to project storage with chunking support
 * @param {string} userId - User UUID
 * @param {string} projectId - Project UUID
 * @param {File} file - File to upload
 * @param {Object} [options] - Upload options
 * @param {Function} [options.onProgress] - Progress callback (0-100)
 * @param {AbortSignal} [options.signal] - AbortSignal for cancellation
 * @param {boolean} [options.compressImages] - Compress image files before upload (default: true)
 * @returns {Promise<string>} Storage path
 * @throws {Error} If upload fails
 */
export async function uploadProjectMedia(userId, projectId, file, options = {}) {
  const {
    onProgress = () => {},
    signal = null,
    compressImages = true,
  } = options;

  // Support legacy API where options was just onProgress function
  const progressCallback = typeof options === 'function' ? options : onProgress;

  // Rate limit file uploads
  checkRateLimit(uploadRateLimiter, 'upload');

  // Validate file
  if (file.size > UPLOAD_LIMITS.MAX_FILE_SIZE) {
    throw new Error(`This file exceeds the maximum upload size (${UPLOAD_LIMITS.MAX_FILE_SIZE / (1024 * 1024)} MB). Try compressing or trimming it first.`);
  }

  if (!isAllowedMediaType(file.type)) {
    throw new Error("This file format is not supported. Accepted formats: MP4, WebM, MOV, AVI, MP3, WAV, JPEG, PNG.");
  }

  // Compress images before upload if enabled
  let fileToUpload = file;
  if (compressImages && UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    try {
      const compressedBlob = await compressImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
      });
      // Create a new File from the compressed blob
      fileToUpload = new File([compressedBlob], file.name, { type: 'image/jpeg' });
    } catch (error) {
      console.warn('[ProjectService] Image compression failed, using original:', error);
    }
  }

  const filename = generateUniqueFilename(file.name);
  const storagePath = `${userId}/${projectId}/${filename}`;

  // Use chunked upload utility for large files with progress tracking and retry
  try {
    await retryWithBackoff(
      () => trackFileUpload(
        filename,
        fileToUpload.size,
        async () => {
          await uploadFile(fileToUpload, "projects", storagePath, {
            onProgress: progressCallback,
            signal,
            resumable: true,
          });
        },
        { projectId, userId, operation: 'media' }
      ),
      {
        maxRetries: 2,
        baseDelay: 2000,
        signal,
        onRetry: ({ attempt, delay }) => {
          logger.warn(`Retrying media upload (attempt ${attempt}, waiting ${Math.round(delay)}ms)`);
          progressCallback(0); // Reset progress for retry
        },
      }
    );
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(getUserFriendlyMessage(error, 'upload'));
  }

  return storagePath;
}

/**
 * Get a signed URL for a project media file
 * @param {string} storagePath - Storage path
 * @param {number} [expiresIn=3600] - URL expiration in seconds
 * @returns {Promise<string>} Signed URL
 * @throws {Error} If URL generation fails
 */
export async function getProjectMediaUrl(storagePath, expiresIn = 3600) {
  const { data, error } = await supabase.storage
    .from("projects")
    .createSignedUrl(storagePath, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}

/**
 * Delete a media file from project storage
 * @param {string} storagePath - Storage path
 * @returns {Promise<void>}
 * @throws {Error} If delete fails
 */
export async function deleteProjectMedia(storagePath) {
  const { error } = await supabase.storage.from("projects").remove([storagePath]);

  if (error) throw error;
}

/**
 * Upload project thumbnail
 * @param {string} userId - User UUID
 * @param {string} projectId - Project UUID
 * @param {Blob} thumbnail - Thumbnail image blob
 * @returns {Promise<string>} Public URL
 */
async function uploadProjectThumbnail(userId, projectId, thumbnail) {
  const storagePath = `${userId}/${projectId}/thumbnail.jpg`;

  const { error } = await supabase.storage.from("projects").upload(storagePath, thumbnail, {
    cacheControl: "3600",
    upsert: true,
    contentType: "image/jpeg",
  });

  if (error) throw error;

  const { data } = supabase.storage.from("projects").getPublicUrl(storagePath);
  return data.publicUrl;
}

// ========== localStorage fallback functions ==========

/**
 * Save project to localStorage (fallback)
 * @param {Object} projectData - Project data
 * @returns {Object} Saved project with generated ID
 */
function saveProjectToLocalStorage(projectData) {
  const id = projectData.id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  // Sanitize project name before saving to localStorage
  const sanitizedName = sanitizeTextInput(projectData.name || "Untitled Project", { maxLength: 100 });

  // Convert thumbnail Blob to base64 data-URL for localStorage persistence
  let thumbnailDataUrl = projectData.thumbnailDataUrl || null;

  const project = {
    id,
    name: sanitizedName,
    project_data: {
      clips: projectData.clips,
      savedAt: new Date().toISOString(),
      ...(projectData.bgMusic ? { bgMusic: projectData.bgMusic } : {}),
    },
    thumbnail_url: thumbnailDataUrl,
    duration_seconds: Math.round(projectData.duration || 0),
    resolution: projectData.resolution || "1080p",
    created_at: projectData.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  localStorage.setItem(`clipcut_project_${id}`, JSON.stringify(project));
  return project;
}

/**
 * Load project from localStorage (fallback)
 * @param {string} projectId - Project ID
 * @returns {Object|null} Project data or null
 */
function loadProjectFromLocalStorage(projectId) {
  const stored = localStorage.getItem(`clipcut_project_${projectId}`);
  if (!stored) {
    // Try legacy format
    const legacy = localStorage.getItem(`clipcut_autosave_${projectId}`);
    if (legacy) {
      return JSON.parse(legacy);
    }
    return null;
  }
  return JSON.parse(stored);
}

/**
 * List projects from localStorage (fallback)
 * @returns {Array} Array of project summaries
 */
function listProjectsFromLocalStorage() {
  const projects = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith("clipcut_project_") || key.startsWith("clipcut_autosave_"))) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        const projectName = key.replace("clipcut_project_", "").replace("clipcut_autosave_", "");

        projects.push({
          id: data.id || projectName,
          name: data.name || data.projectName || projectName,
          thumbnail_url: data.thumbnail_url || null,
          duration_seconds: data.duration_seconds || 0,
          resolution: data.resolution || "1080p",
          created_at: data.created_at || data.savedAt,
          updated_at: data.updated_at || data.savedAt,
          _source: "localStorage",
        });
      } catch (e) {
        console.warn("Failed to parse project:", key, e);
      }
    }
  }

  // Sort by most recently updated
  projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return projects;
}

/**
 * Delete project from localStorage (fallback)
 * @param {string} projectId - Project ID
 */
function deleteProjectFromLocalStorage(projectId) {
  localStorage.removeItem(`clipcut_project_${projectId}`);
  localStorage.removeItem(`clipcut_autosave_${projectId}`);
  deleteProjectMediaFromIDB(projectId).catch(() => {});
}

/**
 * Update project in localStorage (fallback)
 * @param {string} projectId - Project ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated project
 */
function updateProjectInLocalStorage(projectId, updates) {
  const project = loadProjectFromLocalStorage(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  const updated = { ...project, ...updates, updated_at: new Date().toISOString() };
  localStorage.setItem(`clipcut_project_${projectId}`, JSON.stringify(updated));
  return updated;
}

/**
 * Migrate localStorage projects to Supabase
 * @param {string} userId - User UUID
 * @returns {Promise<number>} Number of projects migrated
 */
export async function migrateLocalProjectsToCloud(userId) {
  if (!isSupabaseConfigured()) {
    console.warn("Cannot migrate: Supabase not configured");
    return 0;
  }

  const localProjects = listProjectsFromLocalStorage();
  let migrated = 0;

  for (const project of localProjects) {
    try {
      const fullProject = loadProjectFromLocalStorage(project.id);
      if (fullProject) {
        // Save to cloud
        await saveProject(userId, {
          name: fullProject.name || fullProject.projectName,
          clips: fullProject.project_data?.clips || fullProject.clips || [],
          duration: fullProject.duration_seconds || 0,
          resolution: fullProject.resolution || "1080p",
        });

        // Mark as migrated (optionally delete local copy)
        localStorage.setItem(`clipcut_migrated_${project.id}`, "true");
        migrated++;
      }
    } catch (e) {
      console.warn("Failed to migrate project:", project.id, e);
    }
  }

  return migrated;
}
