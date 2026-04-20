/**
 * Single source of truth for the AI proxy / transcription Worker URL.
 *
 * Resolution precedence (highest to lowest):
 *   1. localStorage['clipcut.transcriptWorkerUrl'] — runtime override set via Settings
 *   2. import.meta.env.VITE_TRANSCRIPT_WORKER_URL — build-time env
 *   3. ''                                           — not configured
 *
 * The runtime override lets users unblock themselves without rebuilding when
 * VITE_TRANSCRIPT_WORKER_URL was empty at build time.
 */

const STORAGE_KEY = 'clipcut.transcriptWorkerUrl';

function readEnvUrl() {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TRANSCRIPT_WORKER_URL) || '';
  } catch {
    return '';
  }
}

function readStorageUrl() {
  try {
    if (typeof localStorage === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function normalise(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

/** Return the effective Worker URL (no trailing slash), or '' if not configured. */
export function getWorkerUrl() {
  return normalise(readStorageUrl()) || normalise(readEnvUrl());
}

/**
 * Report which layer is currently supplying the URL.
 * @returns {'runtime' | 'env' | 'none'}
 */
export function getWorkerUrlSource() {
  if (normalise(readStorageUrl())) return 'runtime';
  if (normalise(readEnvUrl())) return 'env';
  return 'none';
}

/** Persist a runtime override. Empty string clears. */
export function setWorkerUrl(url) {
  try {
    if (typeof localStorage === 'undefined') return;
    const cleaned = normalise(url);
    if (!cleaned) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, cleaned);
    }
  } catch {
    /* storage disabled (private mode / quota) — silent */
  }
}

/** Remove the runtime override, falling back to the env value. */
export function clearWorkerUrl() {
  setWorkerUrl('');
}

/** Actionable error for when no URL is configured. */
export const WORKER_URL_NOT_SET_ERROR =
  'AI proxy not configured. Open Settings → Integrations to set the Worker URL, or set VITE_TRANSCRIPT_WORKER_URL in .env and restart the dev server.';
