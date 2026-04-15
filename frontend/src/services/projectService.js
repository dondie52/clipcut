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

/** DB CHECK: projects.resolution IN ('480p','720p','1080p') */
function sanitizeResolution(res) {
  const r = String(res || "1080p").trim().toLowerCase();
  if (r === "480p" || r === "720p" || r === "1080p") return r;
  return "1080p";
}

function safeDurationSeconds(duration) {
  const n = Math.round(Number(duration) || 0);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Recursively replace non-finite numbers / strip undefined so JSONB round-trips cleanly */
function sanitizeForJsonb(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "boolean" || typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(sanitizeForJsonb);
  if (typeof value === "object") {
    const o = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      o[k] = sanitizeForJsonb(v);
    }
    return o;
  }
  return value;
}

let _lastSaveErrorKey = '';
let _saveErrorCount = 0;

function logSaveProjectFailure(operation, err, payloadSummary) {
  const key = `${operation}:${err?.code || ''}:${err?.message || ''}`;
  if (key === _lastSaveErrorKey) {
    _saveErrorCount++;
    if (_saveErrorCount <= 2) {
      console.warn(`[saveProject] Supabase ${operation} error repeated (${_saveErrorCount + 1}x) — suppressing further logs for this error`);
    }
    return;
  }
  _lastSaveErrorKey = key;
  _saveErrorCount = 0;
  console.error("[saveProject] Supabase error", {
    operation,
    message: err?.message,
    code: err?.code,
    details: err?.details,
    hint: err?.hint,
    status: err?.status,
    ...payloadSummary,
  });
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

  const { name, clips, duration, resolution, thumbnail, bgMusic } = projectData;
  // Strip non-UUID IDs (draft-xxx, local_xxx) — Supabase needs a real UUID or no ID (INSERT)
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const id = projectData.id && UUID_RE.test(projectData.id) ? projectData.id : undefined;
  
  // Sanitize project name before saving (max 100 chars, remove HTML, trim)
  const sanitizedName = sanitizeTextInput(name || "Untitled Project", { maxLength: 100 });

  let projectDataPayload = sanitizeForJsonb({
    clips: clips || [],
    mediaItems: projectData.mediaItems || [],
    savedAt: new Date().toISOString(),
    ...(bgMusic ? { bgMusic } : {}),
    // Embed thumbnail data URL in JSONB as fallback when Storage URLs break
    ...(projectData.thumbnailDataUrl ? { thumbnailDataUrl: projectData.thumbnailDataUrl } : {}),
  });

  // Follow-up saves (e.g. after media upload) often omit thumbnailDataUrl; merging avoids wiping JSONB.
  if (id && !projectData.thumbnailDataUrl) {
    try {
      const { data: existing } = await supabase
        .from("projects")
        .select("project_data")
        .eq("id", id)
        .eq("user_id", userId)
        .maybeSingle();
      const prev = existing?.project_data?.thumbnailDataUrl;
      if (prev) {
        projectDataPayload = { ...projectDataPayload, thumbnailDataUrl: prev };
      }
    } catch {
      /* non-fatal */
    }
  }

  // Do not set updated_at here — the DB trigger update_projects_updated_at handles it; sending it can
  // conflict with the trigger or PostgREST expectations on some deployments.
  const dbProjectData = {
    name: sanitizedName,
    project_data: projectDataPayload,
    duration_seconds: safeDurationSeconds(duration),
    resolution: sanitizeResolution(resolution),
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
        if (result.error) {
          logSaveProjectFailure("update", result.error, {
            projectId: id,
            name: dbProjectData.name,
            resolution: dbProjectData.resolution,
            duration_seconds: dbProjectData.duration_seconds,
            clipsCount: Array.isArray(clips) ? clips.length : 0,
            projectDataBytes: JSON.stringify(dbProjectData.project_data || {}).length,
          });
          throw result.error;
        }
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
        if (result.error) {
          logSaveProjectFailure("insert", result.error, {
            name: dbProjectData.name,
            resolution: dbProjectData.resolution,
            duration_seconds: dbProjectData.duration_seconds,
            clipsCount: Array.isArray(clips) ? clips.length : 0,
            projectDataBytes: JSON.stringify(dbProjectData.project_data || {}).length,
          });
          throw result.error;
        }
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
      console.warn("Thumbnail Storage upload failed, using data URL fallback:", e);
      // Fallback: save the base64 data URL directly to thumbnail_url
      if (projectData.thumbnailDataUrl) {
        try {
          await supabase
            .from("projects")
            .update({ thumbnail_url: projectData.thumbnailDataUrl })
            .eq("id", savedProject.id);
          savedProject.thumbnail_url = projectData.thumbnailDataUrl;
        } catch (e2) {
          console.warn("Thumbnail data URL fallback also failed:", e2);
        }
      }
    }
  } else if (!thumbnail && projectData.thumbnailDataUrl && savedProject.id) {
    // No blob thumbnail but we have a data URL — save it directly
    try {
      const { error } = await supabase
        .from("projects")
        .update({ thumbnail_url: projectData.thumbnailDataUrl })
        .eq("id", savedProject.id);
      if (!error) savedProject.thumbnail_url = projectData.thumbnailDataUrl;
    } catch (e) {
      // Non-critical — ignore
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

  if (data.thumbnail_url) {
    data.thumbnail_url = await rehydrateThumbnailUrl(data.thumbnail_url);
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
          .select("id, name, thumbnail_url, project_data, duration_seconds, resolution, created_at, updated_at")
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

  await Promise.all(
    data.map(async (p) => {
      if (p.thumbnail_url) {
        p.thumbnail_url = await rehydrateThumbnailUrl(p.thumbnail_url);
      }
    })
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
 * Extract a Supabase Storage path (within the `projects` bucket) from a URL,
 * regardless of whether it's a `public/` URL (which 400s on a private bucket)
 * or a `sign/` URL (whose token may be expired). Returns null if the URL is
 * not a Supabase Storage URL for the projects bucket.
 *
 * Examples of input → output:
 *   https://…/storage/v1/object/public/projects/u/p/thumb.jpg        → "u/p/thumb.jpg"
 *   https://…/storage/v1/object/sign/projects/u/p/thumb.jpg?token=x  → "u/p/thumb.jpg"
 *   data:image/png;base64,…                                          → null
 */
function extractProjectsStoragePath(url) {
  if (!url || typeof url !== "string") return null;
  if (url.startsWith("data:") || url.startsWith("blob:")) return null;
  const match = url.match(/\/storage\/v1\/object\/(?:public|sign)\/projects\/([^?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Heal a stored thumbnail_url that may contain a stale publicUrl or an
 * expired signed URL. Old projects (saved before the signed-URL fix) have
 * publicUrl strings pointing at a private bucket — these 400 on every render.
 * When the URL resolves to a path inside the `projects` bucket, we re-sign
 * it using the current session; otherwise we leave the value alone (data
 * URLs, avatars, external URLs all pass through unchanged). On sign failure
 * we return the original URL so the broken-image signal still surfaces for
 * files that are genuinely missing (needed to locate Part B candidates).
 */
async function rehydrateThumbnailUrl(url) {
  if (!url) return null;
  const storagePath = extractProjectsStoragePath(url);
  if (!storagePath) return url;
  try {
    return await getProjectMediaUrl(storagePath);
  } catch {
    return url;
  }
}

// In-memory cache for signed URLs. Dashboard renders many thumbnails per visit;
// without this, every render re-signs every URL. Re-signs when < 5 min of TTL
// remain so the returned URL has enough lifetime for the caller to use it.
// Deliberately NOT persisted — signed URLs expire; a stale one survives no
// better than none. Failures are not cached (caller retries on next call).
const SIGN_REFRESH_SKEW_MS = 5 * 60 * 1000;
const signedUrlCache = new Map();

/**
 * Get a signed URL for a project media file
 * @param {string} storagePath - Storage path
 * @param {number} [expiresIn=3600] - URL expiration in seconds
 * @returns {Promise<string>} Signed URL
 * @throws {Error} If URL generation fails
 */
export async function getProjectMediaUrl(storagePath, expiresIn = 3600) {
  const cacheKey = `${storagePath}|${expiresIn}`;
  const cached = signedUrlCache.get(cacheKey);
  if (cached && cached.expiresAt - Date.now() > SIGN_REFRESH_SKEW_MS) {
    return cached.url;
  }

  const { data, error } = await supabase.storage
    .from("projects")
    .createSignedUrl(storagePath, expiresIn);

  if (error) throw error;

  signedUrlCache.set(cacheKey, {
    url: data.signedUrl,
    expiresAt: Date.now() + expiresIn * 1000,
  });
  return data.signedUrl;
}

// Invalidate on delete so a new upload at the same path doesn't hand back a
// signed URL from before the delete. (Supabase tokens remain valid for the
// TTL regardless of file state, but the semantic contract is "URL for the
// current file," so clear the entry.)
function invalidateSignedUrl(storagePath) {
  for (const key of signedUrlCache.keys()) {
    if (key.startsWith(`${storagePath}|`)) signedUrlCache.delete(key);
  }
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
  invalidateSignedUrl(storagePath);
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

  // The `projects` bucket is private (see migration 005_storage_buckets.sql).
  // getPublicUrl returns a URL that 400s on read — use createSignedUrl instead.
  // 7-day TTL; autosave refreshes this on every thumbnail regeneration, and
  // project_data.thumbnailDataUrl provides a durable base64 fallback.
  const { data, error: signErr } = await supabase.storage
    .from("projects")
    .createSignedUrl(storagePath, 60 * 60 * 24 * 7);
  if (signErr) throw signErr;
  return data.signedUrl;
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
      mediaItems: projectData.mediaItems || [],
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
          thumbnail_url: data.thumbnail_url || data.project_data?.thumbnailDataUrl || null,
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

  // Deduplicate by project id — keep the most recently updated entry
  const byId = new Map();
  for (const p of projects) {
    const existing = byId.get(p.id);
    if (!existing || new Date(p.updated_at) > new Date(existing.updated_at)) {
      byId.set(p.id, p);
    }
  }

  // Sort by most recently updated
  return [...byId.values()].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
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
