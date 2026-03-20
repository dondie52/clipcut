/**
 * Timeline Engine — Pure utility functions for timeline calculations.
 * No React dependencies, no side effects, fully deterministic.
 */

// ── Constants ───────────────────────────────────────────────────

export const MIN_CLIP_DURATION = 0.1;   // seconds
export const SNAP_THRESHOLD_PX = 8;
export const DRAG_THRESHOLD_PX = 3;

// ── Zoom ────────────────────────────────────────────────────────

/**
 * Convert zoom level (0–100) to pixels-per-second.
 * Logarithmic mapping gives natural feel: fine control at low zoom, rapid change at high zoom.
 * Range: 5 px/s (full overview) → 250 px/s (frame-level editing).
 */
export const zoomToPxPerSec = (zoom) => {
  const MIN = 5, MAX = 250;
  return MIN * Math.pow(MAX / MIN, zoom / 100);
};

// ── Coordinate conversions ──────────────────────────────────────

export const timeToX = (time, pps) => time * pps;
export const xToTime = (x, pps) => x / pps;

// ── Snapping ────────────────────────────────────────────────────

/**
 * Collect all snap-worthy time positions from clips + playhead + origin.
 * Returns a sorted, deduplicated array of time values.
 */
export const collectSnapTargets = (clips, excludeClipId, playheadTime) => {
  const set = new Set([0, playheadTime]);
  for (const c of clips) {
    if (c.id === excludeClipId) continue;
    set.add(c.startTime);
    set.add(c.startTime + c.duration);
  }
  return [...set].sort((a, b) => a - b);
};

/**
 * Snap a single time value to the nearest target within threshold.
 * Returns { time, snappedTo: number | null }.
 */
export const snapToNearest = (time, targets, pps, thresholdPx = SNAP_THRESHOLD_PX) => {
  const thresh = thresholdPx / pps;
  let best = time, bestTarget = null, minDist = thresh;
  for (const t of targets) {
    const d = Math.abs(time - t);
    if (d < minDist) { minDist = d; best = t; bestTarget = t; }
  }
  return { time: best, snappedTo: bestTarget };
};

/**
 * Snap a clip considering both its start and end edges.
 * Whichever edge is closer to a snap target wins.
 * Returns { startTime, snappedTo: number | null }.
 */
export const snapClipEdges = (startTime, duration, targets, pps, thresholdPx = SNAP_THRESHOLD_PX) => {
  const startSnap = snapToNearest(startTime, targets, pps, thresholdPx);
  const endSnap = snapToNearest(startTime + duration, targets, pps, thresholdPx);

  const sDist = startSnap.snappedTo !== null ? Math.abs(startTime - startSnap.time) : Infinity;
  const eDist = endSnap.snappedTo !== null ? Math.abs(startTime + duration - endSnap.time) : Infinity;

  if (sDist <= eDist && startSnap.snappedTo !== null)
    return { startTime: startSnap.time, snappedTo: startSnap.snappedTo };
  if (endSnap.snappedTo !== null)
    return { startTime: endSnap.time - duration, snappedTo: endSnap.snappedTo };
  return { startTime, snappedTo: null };
};

// ── Time ruler ──────────────────────────────────────────────────

/**
 * Choose a "nice" tick interval so major ticks are ~60–100 px apart.
 */
export const getTickInterval = (pps) => {
  const target = 80; // desired px between major ticks
  const raw = target / pps;
  const nice = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300];
  for (const n of nice) {
    if (n >= raw * 0.6) return n;
  }
  return 300;
};

/**
 * Generate ruler markers: { time, label, major }[].
 * Major ticks get time labels; minor ticks are unlabeled.
 */
export const generateMarkers = (totalDuration, pps) => {
  const interval = getTickInterval(pps);
  const subs = interval <= 1 ? 4 : interval <= 5 ? 5 : 4;
  const step = interval / subs;
  const markers = [];
  const end = totalDuration + interval;

  for (let t = 0; t <= end; t += step) {
    const rem = t % interval;
    const major = rem < 0.001 || Math.abs(rem - interval) < 0.001;
    if (major) {
      const m = Math.floor(t / 60);
      const s = t % 60;
      const sStr = s === Math.floor(s)
        ? Math.floor(s).toString().padStart(2, '0')
        : s.toFixed(1).padStart(4, '0');
      markers.push({ time: t, label: `${m}:${sStr}`, major: true });
    } else {
      markers.push({ time: t, label: '', major: false });
    }
  }
  return markers;
};

// ── Formatting ──────────────────────────────────────────────────

/** Format as m:ss.t (e.g. "1:05.3") */
export const formatTimecode = (s) => {
  if (s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toFixed(1).padStart(4, '0')}`;
};

/** Format as compact duration (e.g. "5.2s" or "1:30") */
export const formatDuration = (d) => {
  if (d < 60) return `${d.toFixed(1)}s`;
  const m = Math.floor(d / 60);
  const s = (d % 60).toFixed(0);
  return `${m}:${s.padStart(2, '0')}`;
};
