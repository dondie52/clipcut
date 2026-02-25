/**
 * Analytics utility
 * Tracks user actions and sends event payloads to analytics backend.
 * @module utils/analytics
 */

import { logger } from './logger';

const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const enabled = Boolean(endpoint);

let coreVitalsInitialized = false;

const getSessionId = () => {
  const key = 'clipcut_analytics_session_id';
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;

  const newSessionId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  sessionStorage.setItem(key, newSessionId);
  return newSessionId;
};

const buildPayload = (eventName, properties = {}) => ({
  event: eventName,
  timestamp: new Date().toISOString(),
  sessionId: getSessionId(),
  path: window.location.pathname,
  userAgent: navigator.userAgent,
  properties,
});

const sendEvent = async (payload) => {
  if (!enabled) {
    logger.debug('Analytics disabled (missing endpoint)', { event: payload.event });
    return;
  }

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  });
};

export const trackEvent = async (eventName, properties = {}) => {
  try {
    const payload = buildPayload(eventName, properties);
    await sendEvent(payload);
    logger.debug('Tracked analytics event', { eventName, properties });
  } catch (error) {
    logger.warn('Failed to send analytics event', { eventName, error });
  }
};

const trackCoreWebVitalMetric = (name, value, details = {}) => {
  trackEvent(analyticsEvents.coreWebVital, {
    metric: name,
    value,
    ...details,
  });
};

export const initCoreWebVitalsTracking = () => {
  if (coreVitalsInitialized || typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return;
  }

  coreVitalsInitialized = true;

  try {
    let clsValue = 0;

    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const latestEntry = entries[entries.length - 1];
      if (latestEntry) {
        trackCoreWebVitalMetric('LCP', latestEntry.startTime, {
          entryType: latestEntry.entryType,
        });
      }
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }

      trackCoreWebVitalMetric('CLS', clsValue);
    });

    clsObserver.observe({ type: 'layout-shift', buffered: true });

    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        trackCoreWebVitalMetric('FID', fid, {
          entryType: entry.entryType,
        });
      }
    });

    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    logger.warn('Core Web Vitals tracking unavailable', { error });
  }
};

export const analyticsEvents = {
  pageView: 'page_view',
  coreWebVital: 'core_web_vital',
  loginAttempt: 'login_attempt',
  loginSuccess: 'login_success',
  loginFailure: 'login_failure',
  passwordResetRequested: 'password_reset_requested',
  registerAttempt: 'register_attempt',
  registerSuccess: 'register_success',
  registerFailure: 'register_failure',
  googleSignInAttempt: 'google_sign_in_attempt',
  onboardingContinue: 'onboarding_continue',
  onboardingSkip: 'onboarding_skip',
  dashboardNewProjectClick: 'dashboard_new_project_click',
  dashboardFileImport: 'dashboard_file_import',
  dashboardProjectOpen: 'dashboard_project_open',
  dashboardProjectDelete: 'dashboard_project_delete',
  dashboardAIFeatureSelect: 'dashboard_ai_feature_select',
  dashboardToolSelect: 'dashboard_tool_select',
};
