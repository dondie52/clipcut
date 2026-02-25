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
    /token/i,
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
