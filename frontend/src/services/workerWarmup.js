/**
 * Best-effort pre-warm of the Cloudflare Worker AI proxy.
 *
 * Cloudflare Workers cold-start in 10–30s the first time they're hit; subsequent
 * calls within the warm window are <2s. Firing a tiny no-op fetch on editor mount
 * pays that cost while the user is still picking a clip, so the first real AI
 * action feels instant.
 *
 * Strictly silent — pre-warm failures must never bubble up.
 */

import { getWorkerUrl } from './workerConfig';

let warmupStarted = false;

export function warmupWorker() {
  if (warmupStarted) return;
  warmupStarted = true;

  const url = getWorkerUrl();
  if (!url) return;

  const controller = typeof AbortSignal !== 'undefined' && AbortSignal.timeout
    ? { signal: AbortSignal.timeout(5000) }
    : {};

  // Try /health first; if the Worker doesn't expose it, the request still spins
  // up the isolate (a 404 is just as warming as a 200). All errors swallowed.
  fetch(`${url}/health`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store',
    ...controller,
  }).catch((err) => {
    console.debug('[warmupWorker] non-fatal:', err?.message || err);
  });
}
