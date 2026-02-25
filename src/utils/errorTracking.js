/**
 * Error Tracking Utility
 * Centralized error tracking using Sentry
 * @module utils/errorTracking
 */

import * as Sentry from '@sentry/react'

// Check if Sentry is configured
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
const IS_PRODUCTION = import.meta.env.PROD
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0'

/**
 * Initialize Sentry error tracking
 * Should be called once at app startup (in main.jsx)
 */
export function initErrorTracking() {
  if (!SENTRY_DSN) {
    if (IS_PRODUCTION) {
      console.warn('[ErrorTracking] Sentry DSN not configured. Error tracking disabled.')
    }
    return
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: IS_PRODUCTION ? 'production' : 'development',
    release: `clipcut@${APP_VERSION}`,
    
    // Performance monitoring sample rate (0.0 to 1.0)
    tracesSampleRate: IS_PRODUCTION ? 0.1 : 1.0,
    
    // Session replay for debugging (production only)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      /chrome-extension/,
      /moz-extension/,
      // Network errors that aren't actionable
      'Network request failed',
      'Failed to fetch',
      'Load failed',
      // ResizeObserver errors (common, harmless)
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
    ],
    
    // Add breadcrumbs for better context
    beforeBreadcrumb(breadcrumb) {
      // Filter out noisy breadcrumbs
      if (breadcrumb.category === 'console' && breadcrumb.level === 'log') {
        return null
      }
      return breadcrumb
    },
    
    // Process events before sending
    beforeSend(event, hint) {
      // Don't send events in development unless explicitly enabled
      if (!IS_PRODUCTION && !import.meta.env.VITE_SENTRY_DEBUG) {
        console.log('[Sentry] Event captured (dev mode, not sent):', event)
        return null
      }
      
      // Add additional context
      event.tags = {
        ...event.tags,
        app: 'clipcut',
        platform: 'web',
      }
      
      return event
    },
  })

  console.log('[ErrorTracking] Sentry initialized')
}

/**
 * Capture an error manually
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context for the error
 */
export function captureError(error, context = {}) {
  if (!SENTRY_DSN && IS_PRODUCTION) {
    console.error('[ErrorTracking] Error captured but Sentry not configured:', error)
    return
  }

  Sentry.withScope((scope) => {
    // Add custom context
    if (context.tags) {
      Object.entries(context.tags).forEach(([key, value]) => {
        scope.setTag(key, value)
      })
    }
    
    if (context.extra) {
      Object.entries(context.extra).forEach(([key, value]) => {
        scope.setExtra(key, value)
      })
    }
    
    if (context.level) {
      scope.setLevel(context.level)
    }
    
    if (context.fingerprint) {
      scope.setFingerprint(context.fingerprint)
    }

    Sentry.captureException(error)
  })
}

/**
 * Capture a message (non-error)
 * @param {string} message - The message to capture
 * @param {string} level - Severity level ('info', 'warning', 'error')
 */
export function captureMessage(message, level = 'info') {
  Sentry.captureMessage(message, level)
}

/**
 * Set user context for error tracking
 * Call this after user logs in
 * @param {Object} user - User object with id, email, username
 */
export function setUserContext(user) {
  if (!user) {
    clearUserContext()
    return
  }

  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username || user.user_metadata?.username,
  })
}

/**
 * Clear user context
 * Call this when user logs out
 */
export function clearUserContext() {
  Sentry.setUser(null)
}

/**
 * Add a breadcrumb for debugging
 * @param {Object} breadcrumb - Breadcrumb data
 */
export function addBreadcrumb(breadcrumb) {
  Sentry.addBreadcrumb({
    timestamp: Date.now() / 1000,
    ...breadcrumb,
  })
}

/**
 * Set up global error handlers
 * Catches uncaught errors and unhandled promise rejections
 */
export function setupGlobalErrorHandlers() {
  // Handle uncaught JavaScript errors
  window.onerror = (message, source, lineno, colno, error) => {
    captureError(error || new Error(message), {
      tags: { type: 'uncaught_error' },
      extra: {
        message,
        source,
        lineno,
        colno,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    })
    
    // Don't prevent default error handling
    return false
  }

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason))
    
    captureError(error, {
      tags: { type: 'unhandled_rejection' },
      extra: {
        reason: event.reason,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    })
  })

  console.log('[ErrorTracking] Global error handlers set up')
}

/**
 * Create error boundary configuration for Sentry
 * Use with Sentry.ErrorBoundary or custom ErrorBoundary
 */
export function getErrorBoundaryConfig() {
  return {
    fallback: null, // Use custom fallback UI
    showDialog: IS_PRODUCTION, // Show feedback dialog in production
    dialogOptions: {
      title: 'Something went wrong',
      subtitle: 'Our team has been notified.',
      subtitle2: "If you'd like to help, tell us what happened below.",
    },
  }
}

// Export Sentry for advanced usage
export { Sentry }
