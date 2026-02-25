/**
 * Error Tracking Utility
 * Centralized error tracking using Sentry
 * @module utils/errorTracking
 */

// Check if Sentry is configured
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
const IS_PRODUCTION = import.meta.env.PROD
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0'

const noop = () => {}
const noopScope = {
  setTag: noop,
  setExtra: noop,
  setLevel: noop,
  setFingerprint: noop,
}

let SentrySDK = {
  init: noop,
  withScope: (callback) => callback(noopScope),
  captureException: noop,
  captureMessage: noop,
  setUser: noop,
  addBreadcrumb: noop,
}

async function loadSentryIfAvailable() {
  try {
    const sentryImportPath = '@sentry/react'
    const sentryModule = await import(/* @vite-ignore */ sentryImportPath)
    SentrySDK = sentryModule
    return true
  } catch {
    if (IS_PRODUCTION) {
      console.warn('[ErrorTracking] @sentry/react not installed. Error tracking disabled.')
    }
    return false
  }
}

/**
 * Initialize Sentry error tracking
 * Should be called once at app startup (in main.jsx)
 */
export async function initErrorTracking() {
  if (!SENTRY_DSN) {
    if (IS_PRODUCTION) {
      console.warn('[ErrorTracking] Sentry DSN not configured. Error tracking disabled.')
    }
    return
  }

  const loaded = await loadSentryIfAvailable()
  if (!loaded) return

  SentrySDK.init({
    dsn: SENTRY_DSN,
    environment: IS_PRODUCTION ? 'production' : 'development',
    release: `clipcut@${APP_VERSION}`,
    tracesSampleRate: IS_PRODUCTION ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    ignoreErrors: [
      /chrome-extension/,
      /moz-extension/,
      'Network request failed',
      'Failed to fetch',
      'Load failed',
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
    ],
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.category === 'console' && breadcrumb.level === 'log') {
        return null
      }
      return breadcrumb
    },
    beforeSend(event) {
      if (!IS_PRODUCTION && !import.meta.env.VITE_SENTRY_DEBUG) {
        console.log('[Sentry] Event captured (dev mode, not sent):', event)
        return null
      }

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

export function captureError(error, context = {}) {
  if (!SENTRY_DSN && IS_PRODUCTION) {
    console.error('[ErrorTracking] Error captured but Sentry not configured:', error)
    return
  }

  SentrySDK.withScope((scope) => {
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

    SentrySDK.captureException(error)
  })
}

export function captureMessage(message, level = 'info') {
  SentrySDK.captureMessage(message, level)
}

export function setUserContext(user) {
  if (!user) {
    clearUserContext()
    return
  }

  SentrySDK.setUser({
    id: user.id,
    email: user.email,
    username: user.username || user.user_metadata?.username,
  })
}

export function clearUserContext() {
  SentrySDK.setUser(null)
}

export function addBreadcrumb(breadcrumb) {
  SentrySDK.addBreadcrumb({
    timestamp: Date.now() / 1000,
    ...breadcrumb,
  })
}

export function setupGlobalErrorHandlers() {
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

    return false
  }

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

export function getErrorBoundaryConfig() {
  return {
    fallback: null,
    showDialog: IS_PRODUCTION,
    dialogOptions: {
      title: 'Something went wrong',
      subtitle: 'Our team has been notified.',
      subtitle2: "If you'd like to help, tell us what happened below.",
    },
  }
}
