/**
 * Validation Utilities
 * Provides input validation and sanitization for security
 * @module utils/validation
 */

/**
 * Password strength requirements
 */
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

/**
 * Username requirements
 */
export const USERNAME_REQUIREMENTS = {
  minLength: 3,
  maxLength: 30,
  pattern: /^[a-zA-Z0-9_]+$/, // alphanumeric + underscore only
};

/**
 * Email validation regex (RFC 5322 simplified)
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmed = email.trim().toLowerCase();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Email is required' };
  }

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

/**
 * Sanitize username input
 * Trims whitespace, removes invalid characters, and limits length
 * @param {string} username - Username to sanitize
 * @returns {string} Sanitized username
 */
export function sanitizeUsername(username) {
  if (!username || typeof username !== 'string') {
    return '';
  }

  // Trim whitespace
  let sanitized = username.trim();

  // Remove any characters that aren't alphanumeric or underscore
  sanitized = sanitized.replace(/[^a-zA-Z0-9_]/g, '');

  // Limit length
  if (sanitized.length > USERNAME_REQUIREMENTS.maxLength) {
    sanitized = sanitized.substring(0, USERNAME_REQUIREMENTS.maxLength);
  }

  return sanitized;
}

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateUsername(username) {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Username is required' };
  }

  const trimmed = username.trim();

  if (trimmed.length < USERNAME_REQUIREMENTS.minLength) {
    return { valid: false, error: `Username must be at least ${USERNAME_REQUIREMENTS.minLength} characters` };
  }

  if (trimmed.length > USERNAME_REQUIREMENTS.maxLength) {
    return { valid: false, error: `Username must be less than ${USERNAME_REQUIREMENTS.maxLength} characters` };
  }

  if (!USERNAME_REQUIREMENTS.pattern.test(trimmed)) {
    return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }

  return { valid: true };
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {{ valid: boolean, error?: string, strength: number }}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required', strength: 0 };
  }

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    return { 
      valid: false, 
      error: `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`,
      strength: 1 
    };
  }

  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    return { 
      valid: false, 
      error: `Password must be less than ${PASSWORD_REQUIREMENTS.maxLength} characters`,
      strength: 1 
    };
  }

  const checks = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password),
    hasMinLength: password.length >= PASSWORD_REQUIREMENTS.minLength,
    hasGoodLength: password.length >= 12,
  };

  // Calculate strength (1-4)
  let strength = 1;
  const passedChecks = Object.values(checks).filter(Boolean).length;
  
  if (passedChecks >= 3) strength = 2;
  if (passedChecks >= 4) strength = 3;
  if (passedChecks >= 5) strength = 4;

  // Build error message for missing requirements
  const errors = [];
  if (PASSWORD_REQUIREMENTS.requireUppercase && !checks.hasUppercase) {
    errors.push('uppercase letter');
  }
  if (PASSWORD_REQUIREMENTS.requireLowercase && !checks.hasLowercase) {
    errors.push('lowercase letter');
  }
  if (PASSWORD_REQUIREMENTS.requireNumber && !checks.hasNumber) {
    errors.push('number');
  }
  if (PASSWORD_REQUIREMENTS.requireSpecialChar && !checks.hasSpecialChar) {
    errors.push('special character');
  }

  if (errors.length > 0) {
    return {
      valid: false,
      error: `Password must include: ${errors.join(', ')}`,
      strength,
    };
  }

  return { valid: true, strength };
}

/**
 * Get password strength label and color
 * @param {number} strength - Password strength (1-4)
 * @returns {{ label: string, color: string }}
 */
export function getPasswordStrengthInfo(strength) {
  const info = {
    0: { label: '', color: '#333' },
    1: { label: 'Weak', color: '#ef4444' },
    2: { label: 'Fair', color: '#f59e0b' },
    3: { label: 'Strong', color: '#75AADB' },
    4: { label: 'Very Strong', color: '#22c55e' },
  };
  return info[strength] || info[0];
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Escape HTML for safe text display
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export function escapeHtml(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Validate passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirmation password
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePasswordMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    return { valid: false, error: "Passwords don't match" };
  }
  return { valid: true };
}

/**
 * Sanitize a generic error message for display
 * Prevents information leakage
 * @param {Error|string} error - Error object or message
 * @param {string} [fallback='An error occurred'] - Fallback message
 * @returns {string} Safe error message
 */
export function sanitizeErrorMessage(error, fallback = 'An error occurred. Please try again.') {
  if (!error) {
    return fallback;
  }

  const message = typeof error === 'string' ? error : error.message || '';
  
  // List of sensitive patterns that should not be exposed to users
  const sensitivePatterns = [
    /database/i,
    /sql/i,
    /query/i,
    /connection/i,
    /timeout/i,
    /internal server/i,
    /stack trace/i,
    /undefined/i,
    /null reference/i,
    /postgres/i,
    /supabase.*key/i,
    /api.*key/i,
    /secret/i,
    /token(?!\s*(has\s+)?expir)/i,
  ];

  // Check if error message contains sensitive information
  for (const pattern of sensitivePatterns) {
    if (pattern.test(message)) {
      return fallback;
    }
  }

  // Map common auth errors to user-friendly messages
  const authErrorMap = {
    'Invalid login credentials': 'Invalid email or password',
    'User already registered': 'An account with this email already exists',
    'Password should be at least': 'Password does not meet requirements',
    'Unable to validate email address': 'Please enter a valid email address',
    'Email rate limit exceeded': 'Too many attempts. Please try again later.',
    'User not found': 'Invalid email or password', // Don't reveal if user exists
    'Email not confirmed': 'Please verify your email address',
  };

  // Check for known error patterns
  for (const [pattern, safeMessage] of Object.entries(authErrorMap)) {
    if (message.toLowerCase().includes(pattern.toLowerCase())) {
      return safeMessage;
    }
  }

  // If the message seems safe and short, return it
  if (message.length < 100 && !sensitivePatterns.some(p => p.test(message))) {
    return message;
  }

  return fallback;
}

/**
 * Validate all registration fields
 * @param {{ email: string, password: string, confirmPassword: string, username: string }} fields
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateRegistration({ email, password, confirmPassword, username }) {
  const errors = {};

  const emailResult = validateEmail(email);
  if (!emailResult.valid) {
    errors.email = emailResult.error;
  }

  const usernameResult = validateUsername(username);
  if (!usernameResult.valid) {
    errors.username = usernameResult.error;
  }

  const passwordResult = validatePassword(password);
  if (!passwordResult.valid) {
    errors.password = passwordResult.error;
  }

  const matchResult = validatePasswordMatch(password, confirmPassword);
  if (!matchResult.valid) {
    errors.confirmPassword = matchResult.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate login fields
 * @param {{ email: string, password: string }} fields
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateLogin({ email, password }) {
  const errors = {};

  const emailResult = validateEmail(email);
  if (!emailResult.valid) {
    errors.email = emailResult.error;
  }

  if (!password || password.length === 0) {
    errors.password = 'Password is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize text input for general text fields (project names, display names, bios)
 * Removes control characters, limits length, trims whitespace, and preserves allowed characters
 * @param {string} input - Text input to sanitize
 * @param {Object} [options] - Sanitization options
 * @param {number} [options.maxLength=1000] - Maximum length allowed
 * @param {boolean} [options.allowNewlines=false] - Whether to allow newline characters
 * @returns {string} Sanitized text
 */
export function sanitizeTextInput(input, options = {}) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const {
    maxLength = 100,
    allowNewlines = false,
  } = options;

  // Trim whitespace
  let sanitized = input.trim();

  // Remove control characters (except newlines if allowed)
  // Control characters are: \x00-\x1F and \x7F (except \n, \r, \t if needed)
  if (allowNewlines) {
    // Keep newlines (\n) and carriage returns (\r), remove other control chars
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  } else {
    // Remove all control characters including newlines
    sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  }

  // Remove HTML tags to prevent XSS
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Trim again after processing
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Sanitize filename for safe storage
 * Prevents path traversal attacks and removes dangerous characters
 * @param {string} fileName - Original filename
 * @returns {string} Sanitized filename
 */
export function sanitizeFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    return 'file';
  }

  // Remove path traversal attempts (../, ..\, etc.)
  let sanitized = fileName
    .replace(/\.\./g, '') // Remove .. sequences
    .replace(/[\/\\]/g, '_') // Replace path separators with underscore
    .replace(/^\.+|\.+$/g, ''); // Remove leading/trailing dots

  // Remove or replace special characters, keep only alphanumeric, dots, hyphens, underscores
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Normalize multiple consecutive dots to single dot
  sanitized = sanitized.replace(/\.{2,}/g, '.');

  // Normalize multiple consecutive underscores/hyphens
  sanitized = sanitized.replace(/[_-]{2,}/g, '_');

  // Limit length (max 255 chars for filesystem compatibility)
  if (sanitized.length > 255) {
    // Preserve extension if present
    const lastDot = sanitized.lastIndexOf('.');
    if (lastDot > 0 && lastDot < sanitized.length - 1) {
      const name = sanitized.substring(0, lastDot);
      const ext = sanitized.substring(lastDot);
      const maxNameLength = 255 - ext.length;
      sanitized = name.substring(0, maxNameLength) + ext;
    } else {
      sanitized = sanitized.substring(0, 255);
    }
  }

  // Ensure filename is not empty
  if (sanitized.length === 0 || sanitized === '.') {
    sanitized = 'file';
  }

  return sanitized;
}

/**
 * Sanitize search query input
 * Removes HTML tags, limits length, escapes regex special characters, and trims whitespace
 * @param {string} query - Search query to sanitize
 * @param {Object} [options] - Sanitization options
 * @param {number} [options.maxLength=200] - Maximum length allowed
 * @param {boolean} [options.escapeRegex=false] - Whether to escape regex special characters
 * @returns {string} Sanitized search query
 */
export function sanitizeSearchQuery(query, options = {}) {
  if (!query || typeof query !== 'string') {
    return '';
  }

  const {
    maxLength = 200,
    escapeRegex = false,
  } = options;

  // Trim whitespace
  let sanitized = query.trim();

  // Remove HTML tags to prevent XSS
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Remove control characters
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

  // Escape regex special characters if needed
  if (escapeRegex) {
    // Escape special regex characters: . * + ? ^ $ { } [ ] \ | ( )
    sanitized = sanitized.replace(/[.*+?^${}()[\]\\|]/g, '\\$&');
  }

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Trim again after processing
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * UUID v4 validation regex
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * JWT token validation regex (simplified - checks basic structure)
 */
const JWT_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;

/**
 * Sanitize URL parameter for safe use
 * Validates format (UUID, enum values, etc.), removes dangerous characters, and limits length
 * @param {string} param - URL parameter value to sanitize
 * @param {Object} [options] - Sanitization options
 * @param {string} [options.type='string'] - Expected type: 'uuid', 'jwt', 'enum', or 'string'
 * @param {string[]} [options.allowedValues] - Allowed enum values (required if type is 'enum')
 * @param {number} [options.maxLength=500] - Maximum length allowed
 * @returns {{ valid: boolean, sanitized: string, error?: string }}
 */
export function sanitizeUrlParam(param, options = {}) {
  if (!param || typeof param !== 'string') {
    return { valid: false, sanitized: '', error: 'Parameter is required' };
  }

  const {
    type = 'string',
    allowedValues = [],
    maxLength = 500,
  } = options;

  // Trim whitespace
  let sanitized = param.trim();

  // Remove control characters and dangerous characters
  sanitized = sanitized.replace(/[\x00-\x1F\x7F<>"']/g, '');

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Validate based on type
  if (type === 'uuid') {
    if (!UUID_REGEX.test(sanitized)) {
      return { valid: false, sanitized: '', error: 'Invalid UUID format' };
    }
  } else if (type === 'jwt') {
    if (!JWT_REGEX.test(sanitized)) {
      return { valid: false, sanitized: '', error: 'Invalid JWT format' };
    }
  } else if (type === 'enum') {
    if (allowedValues.length === 0) {
      return { valid: false, sanitized: '', error: 'Allowed values must be specified for enum type' };
    }
    if (!allowedValues.includes(sanitized)) {
      return { valid: false, sanitized: '', error: `Value must be one of: ${allowedValues.join(', ')}` };
    }
  }

  // Additional validation: ensure no path traversal attempts
  if (sanitized.includes('..') || sanitized.includes('../') || sanitized.includes('..\\')) {
    return { valid: false, sanitized: '', error: 'Invalid parameter: path traversal detected' };
  }

  return { valid: true, sanitized };
}
