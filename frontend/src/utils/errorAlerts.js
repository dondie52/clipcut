/**
 * Error alerting and Sentry integration configuration.
 * @module utils/errorAlerts
 */

import { logger } from './logger';

const CRITICAL_ERROR_WINDOW_MS = 5 * 60 * 1000;
const DEFAULT_THRESHOLD = Number(import.meta.env.VITE_ERROR_ALERT_THRESHOLD || 3);
const webhookUrl = import.meta.env.VITE_ERROR_ALERT_WEBHOOK_URL;

const errorTimestamps = [];

const pruneOldErrors = () => {
  const cutoff = Date.now() - CRITICAL_ERROR_WINDOW_MS;
  while (errorTimestamps.length > 0 && errorTimestamps[0] < cutoff) {
    errorTimestamps.shift();
  }
};

const sendAlert = async (payload) => {
  if (!webhookUrl) {
    logger.warn('Critical error alert skipped: no webhook URL configured', { payload });
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (error) {
    logger.error('Failed to send critical error alert', { error, payload });
  }
};

const maybeAlertOnThreshold = async () => {
  pruneOldErrors();
  if (errorTimestamps.length < DEFAULT_THRESHOLD) return;

  await sendAlert({
    type: 'critical_error_threshold_reached',
    threshold: DEFAULT_THRESHOLD,
    windowMs: CRITICAL_ERROR_WINDOW_MS,
    occurrences: errorTimestamps.length,
    at: new Date().toISOString(),
  });
};

export const captureError = async (error, context = {}) => {
  errorTimestamps.push(Date.now());

  // Prefer Sentry if available globally (e.g. loaded by host app)
  if (window.Sentry?.captureException) {
    window.Sentry.captureException(error, { extra: context });
  }

  logger.error('Captured application error', { error, context });
  await maybeAlertOnThreshold();
};

export const initErrorAlerts = () => {
  window.addEventListener('error', (event) => {
    captureError(event.error || new Error(event.message), { source: 'window.error' });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    captureError(reason, { source: 'window.unhandledrejection' });
  });

  logger.info('Error alerts initialized', {
    sentryEnabled: Boolean(window.Sentry?.captureException || import.meta.env.VITE_SENTRY_DSN),
    webhookConfigured: Boolean(webhookUrl),
    threshold: DEFAULT_THRESHOLD,
  });
};
