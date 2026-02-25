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
  initErrorTracking,
  setupGlobalErrorHandlers,
  captureError,
  captureMessage,
  setUserContext,
  clearUserContext,
  addBreadcrumb,
  getErrorBoundaryConfig,
} from './errorTracking';

export {
  // Google Analytics 4
  initAnalytics,
  isAnalyticsEnabled,
  trackPageView,
  trackEvent,
  trackLogin,
  trackSignup,
  trackVideoExport,
  trackProjectAction,
  trackFeatureUsage,
  trackError,
  setUserProperties,
  trackTiming,
  trackOnboardingStep,
  trackSearch,
  // Core Web Vitals
  initCoreWebVitalsTracking,
  getAnalyticsBuffer,
  clearAnalyticsBuffer,
} from './analytics';
