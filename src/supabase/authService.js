/**
 * Authentication Service
 * Handles all Supabase authentication operations
 * @module supabase/authService
 */

import { supabase } from "./supabaseClient";

/**
 * File upload security constants
 */
const UPLOAD_SECURITY = {
  // Maximum file size in bytes (5MB)
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  // Allowed image MIME types
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  // Allowed file extensions (must match MIME type)
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  // MIME type to extension mapping for validation
  MIME_TO_EXTENSION: {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
    'image/gif': ['gif'],
  },
};

/**
 * Validate file for upload security
 * @param {File} file - File to validate
 * @returns {{ valid: boolean, error?: string }}
 */
function validateFileUpload(file) {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Check file size
  if (file.size > UPLOAD_SECURITY.MAX_FILE_SIZE) {
    const maxSizeMB = UPLOAD_SECURITY.MAX_FILE_SIZE / (1024 * 1024);
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` };
  }

  // Check MIME type
  if (!UPLOAD_SECURITY.ALLOWED_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: 'File type not allowed. Please upload a JPEG, PNG, WebP, or GIF image.' };
  }

  // Get file extension
  const fileName = file.name || '';
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // Check extension
  if (!UPLOAD_SECURITY.ALLOWED_EXTENSIONS.includes(extension)) {
    return { valid: false, error: 'Invalid file extension' };
  }

  // Verify extension matches MIME type (prevent extension spoofing)
  const allowedExtensions = UPLOAD_SECURITY.MIME_TO_EXTENSION[file.type];
  if (!allowedExtensions || !allowedExtensions.includes(extension)) {
    return { valid: false, error: 'File extension does not match file type' };
  }

  return { valid: true };
}

/**
 * Sanitize filename for safe storage
 * @param {string} fileName - Original filename
 * @returns {string} Sanitized filename
 */
function sanitizeFileName(fileName) {
  // Remove path traversal attempts and special characters
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .substring(0, 100); // Limit length
}

/**
 * Sign up a new user with email and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @param {string} credentials.username - Desired username
 * @returns {Promise<Object>} Supabase auth response data
 * @throws {Error} If sign up fails
 */
export async function signUp({ email, password, username }) {
  // 1. Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }, // stored in user metadata
    },
  });

  if (error) throw error;

  // 2. Create profile row (runs after email confirmation if enabled)
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      username,
      email,
      created_at: new Date().toISOString(),
    });
    if (profileError) console.warn("Profile creation deferred:", profileError.message);
  }

  return data;
}

/**
 * Sign in an existing user with email and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Supabase auth response with session and user
 * @throws {Error} If sign in fails
 */
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in with Google OAuth
 * Redirects to Google for authentication
 * @returns {Promise<Object>} Supabase OAuth response
 * @throws {Error} If OAuth initialization fails
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/onboarding/1",
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out the current user
 * @returns {Promise<void>}
 * @throws {Error} If sign out fails
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Send password reset email
 * @param {string} email - User email address
 * @returns {Promise<Object>} Supabase response
 * @throws {Error} If reset email fails to send
 */
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/reset-password",
  });

  if (error) throw error;
  return data;
}

/**
 * Update user password
 * User must be authenticated to call this
 * @param {string} newPassword - New password to set
 * @returns {Promise<Object>} Updated user data
 * @throws {Error} If password update fails
 */
export async function updatePassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
}

/**
 * Get current user session
 * @returns {Promise<Object|null>} Current session or null if not authenticated
 * @throws {Error} If session retrieval fails
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/**
 * Get current authenticated user
 * @returns {Promise<Object|null>} Current user or null if not authenticated
 * @throws {Error} If user retrieval fails
 */
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

/**
 * Get user profile by ID
 * @param {string} userId - User UUID
 * @returns {Promise<Object>} User profile data
 * @throws {Error} If profile retrieval fails
 */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update user profile
 * @param {string} userId - User UUID
 * @param {Object} updates - Profile fields to update
 * @returns {Promise<Object>} Updated profile data
 * @throws {Error} If profile update fails
 */
export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Upload user avatar image
 * @param {string} userId - User UUID
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} Public URL of uploaded avatar
 * @throws {Error} If upload fails or file validation fails
 */
export async function uploadAvatar(userId, file) {
  // Validate user ID format (UUID)
  if (!userId || typeof userId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
    throw new Error('Invalid user ID');
  }

  // Validate file security
  const validation = validateFileUpload(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Get sanitized extension
  const originalExt = file.name.split(".").pop()?.toLowerCase() || 'jpg';
  const safeExt = UPLOAD_SECURITY.ALLOWED_EXTENSIONS.includes(originalExt) ? originalExt : 'jpg';
  
  // Use a secure, predictable filename pattern
  const fileName = `${userId}/avatar.${safeExt}`;

  // Upload with content type explicitly set
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { 
      upsert: true,
      contentType: file.type, // Explicitly set content type
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(fileName);

  // Update profile with avatar URL
  await updateProfile(userId, { avatar_url: publicUrl });

  return publicUrl;
}

/**
 * Save onboarding data for a user
 * @param {string} userId - User UUID
 * @param {Object} onboardingData - Onboarding form data
 * @param {string} onboardingData.displayName - User display name
 * @param {string} onboardingData.bio - User bio
 * @param {string} onboardingData.skillLevel - User skill level
 * @param {string[]} onboardingData.purposes - User purposes for using the app
 * @param {string} onboardingData.defaultResolution - Preferred export resolution
 * @returns {Promise<Object>} Updated profile data
 * @throws {Error} If save fails
 */
export async function saveOnboardingData(userId, onboardingData) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      display_name: onboardingData.displayName,
      bio: onboardingData.bio,
      skill_level: onboardingData.skillLevel,
      purposes: onboardingData.purposes,
      default_resolution: onboardingData.defaultResolution,
      onboarding_complete: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
