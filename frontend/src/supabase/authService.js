/**
 * Authentication Service
 * Handles all Supabase authentication operations
 * @module supabase/authService
 */

import { supabase } from "./supabaseClient";
import { sanitizeFileName, sanitizeTextInput } from "../utils/validation";
import { addBreadcrumb } from "../utils/errorTracking";

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
 * Sign up a new user with email and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @param {string} credentials.username - Desired username
 * @returns {Promise<Object>} Supabase auth response data
 * @throws {Error} If sign up fails
 */
export async function signUp({ email, password, username }) {
  addBreadcrumb({ category: 'auth', message: 'signUp.attempt', level: 'info' });
  // 1. Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }, // stored in user metadata
    },
  });

  if (error) {
    addBreadcrumb({
      category: 'auth',
      message: 'signUp.failed',
      level: 'error',
      data: { code: error.status, message: error.message },
    });
    throw error;
  }

  // 2. Create profile row (runs after email confirmation if enabled)
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      username,
      created_at: new Date().toISOString(),
    });
    if (profileError) console.warn("Profile creation deferred:", profileError.message);
  }

  return data;
}

/**
 * Sign in an existing user with email and password
 * Includes account lockout checking
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Supabase auth response with session and user
 * @throws {Error} If sign in fails or account is locked
 */
export async function signIn({ email, password }) {
  addBreadcrumb({ category: 'auth', message: 'signIn.attempt', level: 'info' });
  // Check if account is locked
  const lockoutStatus = await checkAccountLockout(email);
  if (lockoutStatus.locked) {
    const lockedUntil = new Date(lockoutStatus.lockedUntil);
    const minutesRemaining = Math.ceil((lockedUntil - new Date()) / 60000);
    addBreadcrumb({ category: 'auth', message: 'signIn.locked', level: 'warning' });
    throw new Error(`Account is locked due to too many failed attempts. Please try again in ${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}.`);
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Record failed attempt
      await recordFailedLoginAttempt(email);
      addBreadcrumb({
        category: 'auth',
        message: 'signIn.failed',
        level: 'error',
        data: { code: error.status, message: error.message },
      });
      throw error;
    }

    // Clear failed attempts on successful login
    await clearFailedLoginAttempts(email);
    return data;
  } catch (err) {
    // Re-throw the error
    throw err;
  }
}

/**
 * Sign in with Google OAuth
 * Redirects to Google for authentication with enhanced error handling
 * @returns {Promise<Object>} Supabase OAuth response
 * @throws {Error} If OAuth initialization fails
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/onboarding/1",
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      // Enhanced error handling for OAuth
      const errorMessages = {
        'popup_closed_by_user': 'Sign-in was cancelled. Please try again.',
        'oauth_error': 'Authentication failed. Please try again.',
        'network_error': 'Network error. Please check your connection and try again.',
      };
      
      const friendlyMessage = errorMessages[error.message] || 
        'Failed to sign in with Google. Please try again.';
      
      throw new Error(friendlyMessage);
    }
    
    return data;
  } catch (err) {
    // Re-throw with user-friendly message if not already handled
    if (err.message && !err.message.includes('Please try again')) {
      throw new Error('Failed to sign in with Google. Please try again.');
    }
    throw err;
  }
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

  // Sanitize the original filename before extracting extension
  const sanitizedOriginalName = sanitizeFileName(file.name);
  
  // Get sanitized extension from sanitized filename
  const originalExt = sanitizedOriginalName.split(".").pop()?.toLowerCase() || 'jpg';
  const safeExt = UPLOAD_SECURITY.ALLOWED_EXTENSIONS.includes(originalExt) ? originalExt : 'jpg';
  
  // Use a secure, predictable filename pattern (path traversal already prevented by userId validation)
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
  // Sanitize displayName and bio before saving to database
  const sanitizedDisplayName = sanitizeTextInput(onboardingData.displayName || '', { maxLength: 100 });
  const sanitizedBio = sanitizeTextInput(onboardingData.bio || '', { maxLength: 500, allowNewlines: true });

  const { data, error } = await supabase
    .from("profiles")
    .update({
      display_name: sanitizedDisplayName,
      bio: sanitizedBio,
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

/**
 * Email Verification Functions
 */

/**
 * Resend verification email to the user
 * @param {string} email - User email address
 * @returns {Promise<Object>} Supabase response
 * @throws {Error} If resend fails
 */
export async function resendVerificationEmail(email) {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: window.location.origin + '/verify-email',
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Check if user's email is verified
 * @param {string} userId - User UUID
 * @returns {Promise<boolean>} True if email is verified
 */
export async function isEmailVerified(userId) {
  try {
    const user = await getUser();
    return !!user?.email_confirmed_at;
  } catch {
    return false;
  }
}

/**
 * Account Lockout Functions
 * Note: These functions require a 'login_attempts' table in Supabase
 * Create it with: CREATE TABLE login_attempts (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users(id),
 *   email TEXT NOT NULL,
 *   failed_attempts INTEGER DEFAULT 0,
 *   locked_until TIMESTAMPTZ,
 *   last_attempt TIMESTAMPTZ DEFAULT NOW(),
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 */

/**
 * Record a failed login attempt
 * @param {string} email - User email address
 * @returns {Promise<Object>} Lockout status
 */
export async function recordFailedLoginAttempt(email) {
  const MAX_ATTEMPTS = 5;

  try {
    const { data, error } = await supabase.rpc('record_failed_login_attempt', {
      p_email: email,
    });

    if (error) {
      console.warn('Account lockout tracking not available:', error);
      return { locked: false, attemptsRemaining: MAX_ATTEMPTS };
    }

    return {
      locked: data.locked,
      lockedUntil: data.locked_until || null,
      attemptsRemaining: data.attempts_remaining,
      attempts: data.attempts || 0,
    };
  } catch (err) {
    console.warn('Account lockout tracking not available:', err);
    return { locked: false, attemptsRemaining: MAX_ATTEMPTS };
  }
}

/**
 * Clear failed login attempts after successful login
 * @param {string} email - User email address
 */
export async function clearFailedLoginAttempts(email) {
  try {
    await supabase.rpc('clear_failed_login_attempts', { p_email: email });
  } catch (err) {
    console.warn('Failed to clear login attempts:', err);
  }
}

/**
 * Check if account is locked
 * @param {string} email - User email address
 * @returns {Promise<Object>} Lockout status
 */
export async function checkAccountLockout(email) {
  try {
    const { data, error } = await supabase.rpc('check_account_lockout', {
      p_email: email,
    });

    if (error || !data) {
      return { locked: false, attemptsRemaining: 5 };
    }

    return {
      locked: data.locked,
      lockedUntil: data.locked_until || null,
      attemptsRemaining: data.attempts_remaining,
    };
  } catch (err) {
    return { locked: false, attemptsRemaining: 5 };
  }
}

/**
 * Two-Factor Authentication (2FA) Functions
 * Uses Supabase's built-in TOTP support
 */

/**
 * Enable 2FA for the current user
 * @returns {Promise<Object>} QR code data and secret
 * @throws {Error} If enabling 2FA fails
 */
export async function enable2FA() {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'ClipCut Authenticator',
    });

    if (error) throw error;
    return data;
  } catch (err) {
    throw new Error(`Failed to enable 2FA: ${err.message}`);
  }
}

/**
 * Verify and enable 2FA with a TOTP code
 * @param {string} factorId - Factor ID from enable2FA
 * @param {string} code - TOTP verification code
 * @returns {Promise<Object>} Verification result
 * @throws {Error} If verification fails
 */
export async function verify2FA(factorId, code) {
  try {
    const { data, error } = await supabase.auth.mfa.verify({
      factorId,
      code,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    throw new Error(`2FA verification failed: ${err.message}`);
  }
}

/**
 * Disable 2FA for the current user
 * @param {string} factorId - Factor ID to remove
 * @returns {Promise<void>}
 * @throws {Error} If disabling fails
 */
export async function disable2FA(factorId) {
  try {
    const { data, error } = await supabase.auth.mfa.unenroll({
      factorId,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    throw new Error(`Failed to disable 2FA: ${err.message}`);
  }
}

/**
 * Get all enrolled 2FA factors for the current user
 * @returns {Promise<Array>} List of enrolled factors
 */
export async function get2FAFactors() {
  try {
    const { data, error } = await supabase.auth.mfa.listFactors();

    if (error) throw error;
    return data.factors || [];
  } catch (err) {
    console.warn('Failed to get 2FA factors:', err);
    return [];
  }
}

/**
 * Challenge 2FA during login
 * @param {string} factorId - Factor ID to challenge
 * @returns {Promise<Object>} Challenge data
 */
export async function challenge2FA(factorId) {
  try {
    const { data, error } = await supabase.auth.mfa.challenge({
      factorId,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    throw new Error(`2FA challenge failed: ${err.message}`);
  }
}

/**
 * Verify 2FA challenge code
 * @param {string} challengeId - Challenge ID from challenge2FA
 * @param {string} code - TOTP code
 * @returns {Promise<Object>} Verification result
 */
export async function verify2FAChallenge(challengeId, code) {
  try {
    const { data, error } = await supabase.auth.mfa.verify({
      challengeId,
      code,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    throw new Error(`2FA verification failed: ${err.message}`);
  }
}
