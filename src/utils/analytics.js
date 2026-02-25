/**
 * Analytics Utility
 * Centralized analytics tracking using Google Analytics 4
 * @module utils/analytics
 */

import ReactGA from 'react-ga4'

// Check if Analytics is configured
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const IS_PRODUCTION = import.meta.env.PROD

// Track initialization state
let isInitialized = false

/**
 * Initialize Google Analytics
 * Should be called once at app startup
 */
export function initAnalytics() {
  if (isInitialized) {
    return
  }

  if (!GA_MEASUREMENT_ID) {
    if (IS_PRODUCTION) {
      console.warn('[Analytics] GA Measurement ID not configured. Analytics disabled.')
    }
    return
  }

  // Check for Do Not Track preference
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    console.log('[Analytics] Do Not Track enabled. Analytics disabled.')
    return
  }

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    testMode: !IS_PRODUCTION,
    gaOptions: {
      anonymizeIp: true, // Privacy-friendly
      siteSpeedSampleRate: 10,
    },
  })

  isInitialized = true
  console.log('[Analytics] Google Analytics initialized')
}

/**
 * Check if analytics is available and initialized
 * @returns {boolean}
 */
export function isAnalyticsEnabled() {
  return isInitialized && GA_MEASUREMENT_ID
}

/**
 * Track a page view
 * @param {string} path - Page path (e.g., '/dashboard')
 * @param {string} [title] - Optional page title
 */
export function trackPageView(path, title) {
  if (!isAnalyticsEnabled()) {
    return
  }

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  })
}

/**
 * Track a custom event
 * @param {string} category - Event category (e.g., 'Video', 'User')
 * @param {string} action - Event action (e.g., 'Export', 'Login')
 * @param {string} [label] - Optional event label
 * @param {number} [value] - Optional numeric value
 */
export function trackEvent(category, action, label, value) {
  if (!isAnalyticsEnabled()) {
    return
  }

  ReactGA.event({
    category,
    action,
    label,
    value,
  })
}

/**
 * Track user login
 * @param {string} method - Login method (e.g., 'email', 'google')
 */
export function trackLogin(method) {
  trackEvent('User', 'Login', method)
}

/**
 * Track user signup
 * @param {string} method - Signup method (e.g., 'email', 'google')
 */
export function trackSignup(method) {
  trackEvent('User', 'Signup', method)
}

/**
 * Track video export
 * @param {string} format - Export format (e.g., 'mp4', 'webm')
 * @param {string} resolution - Export resolution (e.g., '1080p', '720p')
 */
export function trackVideoExport(format, resolution) {
  trackEvent('Video', 'Export', `${format}_${resolution}`)
}

/**
 * Track project actions
 * @param {string} action - Action type (e.g., 'Create', 'Save', 'Load', 'Delete')
 */
export function trackProjectAction(action) {
  trackEvent('Project', action)
}

/**
 * Track feature usage
 * @param {string} feature - Feature name (e.g., 'Timeline', 'Effects', 'Transitions')
 * @param {string} action - Action performed
 */
export function trackFeatureUsage(feature, action) {
  trackEvent('Feature', action, feature)
}

/**
 * Track errors for analytics (separate from Sentry)
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 */
export function trackError(errorType, errorMessage) {
  if (!isAnalyticsEnabled()) {
    return
  }

  ReactGA.event({
    category: 'Error',
    action: errorType,
    label: errorMessage.substring(0, 100), // Limit label length
    nonInteraction: true,
  })
}

/**
 * Set user properties
 * @param {string} userId - User ID (anonymous or actual)
 * @param {Object} [properties] - Additional user properties
 */
export function setUserProperties(userId, properties = {}) {
  if (!isAnalyticsEnabled()) {
    return
  }

  // Set user ID for cross-session tracking
  ReactGA.set({
    userId,
    ...properties,
  })
}

/**
 * Track timing (for performance metrics)
 * @param {string} category - Timing category (e.g., 'Video Processing')
 * @param {string} variable - Timing variable (e.g., 'Load Time')
 * @param {number} value - Time in milliseconds
 * @param {string} [label] - Optional label
 */
export function trackTiming(category, variable, value, label) {
  if (!isAnalyticsEnabled()) {
    return
  }

  ReactGA.send({
    hitType: 'timing',
    timingCategory: category,
    timingVar: variable,
    timingValue: value,
    timingLabel: label,
  })
}

/**
 * Track onboarding progress
 * @param {number} step - Current onboarding step (1, 2, 3)
 * @param {boolean} completed - Whether the step was completed
 */
export function trackOnboardingStep(step, completed) {
  trackEvent('Onboarding', completed ? 'Complete' : 'Skip', `Step ${step}`)
}

/**
 * Track search actions
 * @param {string} searchTerm - What the user searched for
 * @param {number} resultsCount - Number of results returned
 */
export function trackSearch(searchTerm, resultsCount) {
  if (!isAnalyticsEnabled()) {
    return
  }

  ReactGA.event({
    category: 'Search',
    action: 'Query',
    label: searchTerm,
    value: resultsCount,
  })
}

// Export for direct GA access if needed
export { ReactGA }
