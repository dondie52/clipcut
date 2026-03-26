/**
 * Centralized Error Handling Utilities
 * Provides user-friendly error messages, retry logic, and error classification.
 * @module utils/errorHandling
 */

// ============ Error Classification ============

/**
 * Determine if an error is a network/connectivity error.
 * @param {Error} error
 * @returns {boolean}
 */
export function isNetworkError(error) {
  if (!error) return false;
  const msg = (error.message || '').toLowerCase();
  return (
    msg.includes('failed to fetch') ||
    msg.includes('network request failed') ||
    msg.includes('networkerror') ||
    msg.includes('net::err_') ||
    msg.includes('load failed') ||
    msg.includes('network error') ||
    msg.includes('econnrefused') ||
    msg.includes('econnreset') ||
    msg.includes('etimedout') ||
    error.name === 'TypeError' && msg.includes('fetch') ||
    !navigator.onLine
  );
}

/**
 * Determine if an error is an authentication/authorization error.
 * @param {Error} error
 * @returns {boolean}
 */
export function isAuthError(error) {
  if (!error) return false;
  const msg = (error.message || '').toLowerCase();
  const status = error.status || error.statusCode;
  return (
    status === 401 ||
    status === 403 ||
    msg.includes('jwt expired') ||
    msg.includes('invalid token') ||
    msg.includes('token expired') ||
    msg.includes('refresh_token') ||
    msg.includes('not authenticated') ||
    msg.includes('invalid credentials') ||
    msg.includes('invalid login') ||
    msg.includes('email not confirmed') ||
    msg.includes('session expired') ||
    msg.includes('unauthorized')
  );
}

/**
 * Determine if an error is an FFmpeg-related error.
 * @param {Error} error
 * @returns {boolean}
 */
export function isFFmpegError(error) {
  if (!error) return false;
  const msg = (error.message || '').toLowerCase();
  return (
    msg.includes('ffmpeg') ||
    msg.includes('wasm') ||
    msg.includes('sharedarraybuffer') ||
    msg.includes('out of memory') ||
    msg.includes('oom') ||
    msg.includes('memory access out of bounds') ||
    msg.includes('cross-origin isolation')
  );
}

/**
 * Determine if an error is a file upload error.
 * @param {Error} error
 * @returns {boolean}
 */
export function isUploadError(error) {
  if (!error) return false;
  const msg = (error.message || '').toLowerCase();
  return (
    msg.includes('upload') ||
    msg.includes('file too large') ||
    msg.includes('file type not allowed') ||
    msg.includes('storage') ||
    msg.includes('bucket') ||
    msg.includes('quota exceeded') ||
    error.name === 'AbortError'
  );
}

/**
 * Determine if the error is retryable.
 * @param {Error} error
 * @returns {boolean}
 */
export function isRetryable(error) {
  if (!error) return false;
  // Network errors are always retryable
  if (isNetworkError(error)) return true;
  // Server errors (5xx) are retryable
  const status = error.status || error.statusCode;
  if (status >= 500 && status < 600) return true;
  // Rate limit errors
  if (status === 429) return true;
  // Timeout errors
  const msg = (error.message || '').toLowerCase();
  if (msg.includes('timeout') || msg.includes('timed out')) return true;
  return false;
}

// ============ User-Friendly Error Messages ============

const AUTH_ERROR_MAP = {
  'invalid login credentials': 'Incorrect email or password. Please try again.',
  'email not confirmed': 'Please verify your email address before signing in. Check your inbox.',
  'user already registered': 'An account with this email already exists. Try signing in instead.',
  'signup disabled': 'Registration is currently unavailable. Please try again later.',
  'email rate limit exceeded': 'Too many attempts. Please wait a few minutes before trying again.',
  'invalid email': 'Please enter a valid email address.',
  'weak password': 'Your password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.',
  'jwt expired': 'Your session has expired. Please sign in again.',
  'refresh_token_not_found': 'Your session has expired. Please sign in again.',
  'invalid token': 'Your session is no longer valid. Please sign in again.',
  'user not found': 'No account found with this email address.',
  'popup_closed_by_user': 'Sign-in was cancelled. Please try again.',
  'oauth_error': 'Authentication service error. Please try again.',
};

const FFMPEG_ERROR_MAP = {
  'sharedarraybuffer': 'Your browser does not support video processing. Try using Chrome or Edge.',
  'cross-origin isolation': 'Video processing requires special browser settings. Try refreshing the page.',
  'out of memory': 'The video is too large to process in your browser. Try a shorter clip or lower resolution.',
  'memory access out of bounds': 'Video processing ran out of memory. Try closing other tabs and retry.',
  'wasm': 'Failed to load the video engine. Please refresh the page.',
  'ffmpeg': 'Video processing failed. Please try again with a different file.',
};

const UPLOAD_ERROR_MAP = {
  'file too large': 'This file exceeds the maximum upload size (500 MB). Try compressing or trimming it first.',
  'file type not allowed': 'This file format is not supported. Accepted formats: MP4, WebM, MOV, AVI, MP3, WAV, JPEG, PNG.',
  'quota exceeded': 'Storage is full. Delete some old projects to free up space.',
  'bucket not found': 'Cloud storage is temporarily unavailable. Please try again later.',
};

/**
 * Convert a technical error into a user-friendly message.
 * @param {Error|string} error
 * @param {string} [context] - e.g. "auth", "upload", "ffmpeg", "project"
 * @returns {string}
 */
export function getUserFriendlyMessage(error, context) {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const msg = typeof error === 'string' ? error : (error.message || '');
  const lower = msg.toLowerCase();

  // Network errors take priority
  if (isNetworkError(typeof error === 'string' ? new Error(error) : error) || !navigator.onLine) {
    return 'Unable to connect. Please check your internet connection and try again.';
  }

  // Auth errors
  if (context === 'auth' || isAuthError(typeof error === 'string' ? new Error(error) : error)) {
    for (const [key, friendly] of Object.entries(AUTH_ERROR_MAP)) {
      if (lower.includes(key)) return friendly;
    }
    if (lower.includes('locked') || lower.includes('lockout')) {
      return msg; // Already user-friendly from lockout logic
    }
    return 'Authentication failed. Please try again.';
  }

  // FFmpeg errors
  if (context === 'ffmpeg' || isFFmpegError(typeof error === 'string' ? new Error(error) : error)) {
    for (const [key, friendly] of Object.entries(FFMPEG_ERROR_MAP)) {
      if (lower.includes(key)) return friendly;
    }
    return 'Video processing failed. Please try a different file or refresh the page.';
  }

  // Upload errors
  if (context === 'upload' || isUploadError(typeof error === 'string' ? new Error(error) : error)) {
    if (typeof error !== 'string' && error.name === 'AbortError') {
      return 'Upload was cancelled.';
    }
    for (const [key, friendly] of Object.entries(UPLOAD_ERROR_MAP)) {
      if (lower.includes(key)) return friendly;
    }
    return 'Upload failed. Please check your connection and try again.';
  }

  // Project/database errors
  if (context === 'project') {
    if (lower.includes('access denied')) return 'You do not have permission to access this project.';
    if (lower.includes('not found')) return 'This project could not be found. It may have been deleted.';
    return 'Failed to save or load your project. Please try again.';
  }

  // Generic fallback
  if (lower.includes('timeout') || lower.includes('timed out')) {
    return 'The request took too long. Please try again.';
  }

  // If the message is already user-facing (short, no stack trace), pass it through
  if (msg.length < 150 && !msg.includes('\n') && !msg.includes('  at ')) {
    return msg;
  }

  return 'Something went wrong. Please try again.';
}

// ============ Retry with Exponential Backoff ============

/**
 * Retry an async operation with exponential backoff.
 * @param {Function} fn - Async function to retry
 * @param {Object} [options]
 * @param {number} [options.maxRetries=3] - Maximum retry attempts
 * @param {number} [options.baseDelay=1000] - Base delay in ms
 * @param {number} [options.maxDelay=10000] - Maximum delay cap in ms
 * @param {Function} [options.shouldRetry] - Custom predicate (receives error, returns boolean)
 * @param {Function} [options.onRetry] - Called before each retry (receives { error, attempt, delay })
 * @param {AbortSignal} [options.signal] - AbortSignal for cancellation
 * @returns {Promise<*>} Result of fn
 */
export async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    shouldRetry = isRetryable,
    onRetry,
    signal,
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    // Check for abort
    if (signal?.aborted) {
      throw new DOMException('Operation aborted', 'AbortError');
    }

    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;

      // Don't retry AbortErrors
      if (error.name === 'AbortError') throw error;

      // Don't retry if we've exhausted attempts
      if (attempt >= maxRetries) break;

      // Don't retry non-retryable errors
      if (!shouldRetry(error)) break;

      // Calculate delay with jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt) + Math.random() * 500,
        maxDelay
      );

      if (onRetry) {
        onRetry({ error, attempt: attempt + 1, delay });
      }

      // Wait before retrying
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, delay);
        if (signal) {
          const onAbort = () => {
            clearTimeout(timeout);
            reject(new DOMException('Operation aborted', 'AbortError'));
          };
          signal.addEventListener('abort', onAbort, { once: true });
        }
      });
    }
  }

  throw lastError;
}

// ============ Network Status Monitor ============

let _onlineListeners = [];

/**
 * Subscribe to online/offline changes.
 * @param {Function} callback - Receives { online: boolean }
 * @returns {Function} Unsubscribe function
 */
export function onNetworkStatusChange(callback) {
  const handleOnline = () => callback({ online: true });
  const handleOffline = () => callback({ online: false });

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  _onlineListeners.push({ handleOnline, handleOffline });

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    _onlineListeners = _onlineListeners.filter(
      l => l.handleOnline !== handleOnline
    );
  };
}
