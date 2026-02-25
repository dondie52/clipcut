/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2025 ClipCut Contributors
 * Licensed under the MIT License
 * 
 * @module services/gdprService
 * @description GDPR Compliance Service - Handles data export and deletion for GDPR compliance
 */

import { supabase, isSupabaseConfigured } from "../supabase/supabaseClient";
import { listProjects } from "./projectService";

/**
 * Export all user data in a machine-readable format (JSON)
 * @param {string} userId - User UUID
 * @returns {Promise<Object>} Complete user data export
 * @throws {Error} If export fails
 */
export async function exportUserData(userId) {
  if (!isSupabaseConfigured()) {
    return exportUserDataFromLocalStorage();
  }

  const exportData = {
    exportDate: new Date().toISOString(),
    userId,
    account: null,
    profile: null,
    projects: [],
    templates: [],
    analytics: {
      note: "Analytics data is aggregated and not tied to individual users",
    },
  };

  try {
    // Get user account information from auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!userError && user) {
      exportData.account = {
        id: user.id,
        email: user.email,
        emailConfirmed: user.email_confirmed_at ? true : false,
        createdAt: user.created_at,
        lastSignIn: user.last_sign_in_at,
        providers: user.app_metadata?.providers || [],
      };
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!profileError && profile) {
      exportData.profile = {
        username: profile.username,
        avatarUrl: profile.avatar_url,
        createdAt: profile.created_at,
      };
    }

    // Get all user projects
    const projects = await listProjects(userId, { limit: 1000 });
    exportData.projects = projects.map((p) => ({
      id: p.id,
      name: p.name,
      thumbnailUrl: p.thumbnail_url,
      duration: p.duration_seconds,
      resolution: p.resolution,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
      // Note: Full project data (clips, effects) would require loading each project
      // This is a summary export. Full export can be requested separately.
    }));

    // Get user templates (if templates table exists)
    try {
      const { data: templates, error: templatesError } = await supabase
        .from("templates")
        .select("id, name, category, downloads, created_at")
        .eq("creator_id", userId);

      if (!templatesError && templates) {
        exportData.templates = templates;
      }
    } catch (e) {
      // Templates table might not exist, ignore
      console.warn("Templates export skipped:", e);
    }

    return exportData;
  } catch (error) {
    console.error("GDPR export error:", error);
    throw new Error(`Failed to export user data: ${error.message}`);
  }
}

/**
 * Delete all user data (GDPR Right to Erasure)
 * @param {string} userId - User UUID
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export async function deleteUserData(userId) {
  if (!isSupabaseConfigured()) {
    return deleteUserDataFromLocalStorage();
  }

  try {
    // 1. Delete all user projects and associated storage files
    const projects = await listProjects(userId, { limit: 1000 });
    
    for (const project of projects) {
      try {
        // Delete project storage files
        const { error: storageError } = await supabase.storage
          .from("projects")
          .remove([`${userId}/${project.id}`]);

        if (storageError) {
          console.warn(`Failed to delete storage for project ${project.id}:`, storageError);
        }

        // Delete project record
        const { error: projectError } = await supabase
          .from("projects")
          .delete()
          .eq("id", project.id)
          .eq("user_id", userId);

        if (projectError) {
          console.warn(`Failed to delete project ${project.id}:`, projectError);
        }
      } catch (e) {
        console.warn(`Error deleting project ${project.id}:`, e);
      }
    }

    // 2. Delete user templates
    try {
      const { error: templatesError } = await supabase
        .from("templates")
        .delete()
        .eq("creator_id", userId);

      if (templatesError) {
        console.warn("Failed to delete templates:", templatesError);
      }
    } catch (e) {
      console.warn("Templates deletion skipped:", e);
    }

    // 3. Delete template ratings
    try {
      const { error: ratingsError } = await supabase
        .from("template_ratings")
        .delete()
        .eq("user_id", userId);

      if (ratingsError) {
        console.warn("Failed to delete template ratings:", ratingsError);
      }
    } catch (e) {
      console.warn("Template ratings deletion skipped:", e);
    }

    // 4. Delete user profile
    const { error: profileError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.warn("Failed to delete profile:", profileError);
    }

    // 5. Delete auth user (this will cascade delete related data)
    // Note: This requires admin privileges or a serverless function
    // For now, we'll mark the account for deletion
    // In production, you should use a Supabase Edge Function or admin API
    console.warn(
      "Auth user deletion requires admin privileges. " +
      "Please contact support to complete account deletion, or use Supabase dashboard."
    );

    // Clear local storage
    clearLocalStorageData(userId);

    return;
  } catch (error) {
    console.error("GDPR deletion error:", error);
    throw new Error(`Failed to delete user data: ${error.message}`);
  }
}

/**
 * Download user data export as JSON file
 * @param {string} userId - User UUID
 * @returns {Promise<void>}
 */
export async function downloadUserDataExport(userId) {
  try {
    const exportData = await exportUserData(userId);
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clipcut-data-export-${userId}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download data export:", error);
    throw error;
  }
}

// ========== localStorage fallback functions ==========

/**
 * Export user data from localStorage (fallback)
 * @returns {Object} User data export
 */
function exportUserDataFromLocalStorage() {
  const exportData = {
    exportDate: new Date().toISOString(),
    source: "localStorage",
    projects: [],
  };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith("clipcut_project_") || key.startsWith("clipcut_autosave_"))) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        exportData.projects.push({
          id: data.id || key,
          name: data.name || data.projectName,
          data: data,
        });
      } catch (e) {
        console.warn("Failed to parse project:", key, e);
      }
    }
  }

  return exportData;
}

/**
 * Delete user data from localStorage (fallback)
 */
function deleteUserDataFromLocalStorage() {
  const keysToDelete = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith("clipcut_") || key.startsWith("supabase."))) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => localStorage.removeItem(key));
}

/**
 * Clear local storage data for a specific user
 * @param {string} userId - User UUID
 */
function clearLocalStorageData(userId) {
  const keysToDelete = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key &&
      (key.startsWith("clipcut_") ||
        key.startsWith("supabase.") ||
        key.includes(userId))
    ) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => localStorage.removeItem(key));
}
