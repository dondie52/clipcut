/**
 * Utils Index
 * Export all utility functions
 * @module utils
 */

export {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordMatch,
  validateRegistration,
  validateLogin,
  getPasswordStrengthInfo,
  sanitizeInput,
  escapeHtml,
  sanitizeErrorMessage,
  PASSWORD_REQUIREMENTS,
  USERNAME_REQUIREMENTS,
} from './validation';

export {
  createRateLimiter,
  createPersistentRateLimiter,
} from './rateLimiter';

export {
  performanceMonitor,
  METRIC_TYPES,
  PERFORMANCE_THRESHOLDS,
  getPerformanceRating,
  trackVideoOperation,
  trackAPIRequest,
  trackFileUpload,
  trackUserInteraction,
} from './performance';

export {
  initCoreWebVitalsTracking,
  getAnalyticsBuffer,
  clearAnalyticsBuffer,
} from './analytics';
