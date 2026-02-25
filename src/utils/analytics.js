/**
 * Analytics utility for Core Web Vitals reporting.
 * Sends LCP, FID, and CLS metrics to configured analytics endpoint.
 */

import { METRIC_TYPES } from './performance';

const CORE_WEB_VITALS = new Set([
  METRIC_TYPES.LCP,
  METRIC_TYPES.FID,
  METRIC_TYPES.CLS,
]);

const analyticsBuffer = [];
let unsubscribe = null;

/**
 * Send metric payload to analytics endpoint.
 * Falls back to local buffer when endpoint is not configured.
 * @param {Object} payload
 */
async function sendMetric(payload) {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;

  if (!endpoint) {
    analyticsBuffer.push(payload);
    return;
  }

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    const delivered = navigator.sendBeacon(endpoint, blob);
    if (delivered) return;
  }

  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  });
}

/**
 * Track and forward Core Web Vitals metrics.
 * @returns {Function} cleanup function
 */
export function initCoreWebVitalsTracking() {
  if (typeof window === 'undefined') return () => {};
  if (unsubscribe) return unsubscribe;

  const onMetric = (event) => {
    const metric = event.detail;
    if (!metric || !CORE_WEB_VITALS.has(metric.type)) return;

    const payload = {
      metric: metric.type,
      value: Number(metric.value),
      rating: metric.rating,
      path: window.location.pathname,
      timestamp: metric.timestamp || Date.now(),
      userAgent: navigator.userAgent,
    };

    // Non-blocking fire and forget
    void sendMetric(payload);
  };

  window.addEventListener('performance-metric', onMetric);

  unsubscribe = () => {
    window.removeEventListener('performance-metric', onMetric);
    unsubscribe = null;
  };

  return unsubscribe;
}

/**
 * Read buffered metrics for local diagnostics/dashboard.
 * @returns {Array<Object>}
 */
export function getAnalyticsBuffer() {
  return [...analyticsBuffer];
}

/**
 * Clear buffered metrics.
 */
export function clearAnalyticsBuffer() {
  analyticsBuffer.length = 0;
}
