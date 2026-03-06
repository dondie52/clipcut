/**
 * Face-aware crop positioning for vertical (9:16) reframing.
 *
 * Uses the Shape Detection API (FaceDetector) available in Chrome/Edge.
 * Falls back gracefully: if the API is unavailable or no faces are found,
 * returns null so the caller uses the default center crop.
 *
 * Pipeline:
 *  1. Sample N frames across the segment (~1 per 1.5s, 8–40 frames)
 *  2. Run FaceDetector.detect() on each frame → ALL faces per frame
 *  3. Cluster faces into speaker tracks by horizontal position
 *  4. Per frame: if both speakers fit in 9:16 crop, center between them;
 *     otherwise pick the more active speaker (bbox size variation heuristic)
 *  5. Smooth keyframes with exponential moving average + velocity clamping
 *  6. Build a piecewise-linear FFmpeg crop expression for smooth panning
 */

// ─── Sampling constants ──────────────────────────────────────

const MIN_SAMPLES = 8;
const MAX_SAMPLES = 40;
const SAMPLES_PER_SECOND = 0.7; // ~1 sample per 1.5 seconds

/** Max horizontal pan speed in pixels per second (prevents jarring jumps) */
const MAX_PAN_PX_PER_SEC = 350;

/** EMA smoothing factor (lower = smoother but laggier, higher = more responsive) */
const SMOOTH_ALPHA = 0.35;

/** Faces within this fraction of frame width are considered the same speaker */
const CLUSTER_THRESHOLD_RATIO = 0.15;

/** A speaker track must appear in at least this fraction of face-containing frames */
const MIN_TRACK_PRESENCE = 0.20;

/** Activity sliding window size (frames) for speaker activity estimation */
const ACTIVITY_WINDOW = 4;

// ─── Browser API detection ────────────────────────────────────

export function isFaceDetectionSupported() {
  return typeof globalThis.FaceDetector === 'function';
}

// ─── Helpers ──────────────────────────────────────────────────

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function seekTo(video, time) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      video.removeEventListener('seeked', onSeeked);
      reject(new Error('Seek timeout'));
    }, 5000);

    const onSeeked = () => {
      clearTimeout(timeout);
      video.removeEventListener('seeked', onSeeked);
      resolve();
    };

    video.addEventListener('seeked', onSeeked);
    video.currentTime = time;
  });
}

function getSampleCount(duration) {
  return clamp(Math.round(duration * SAMPLES_PER_SECOND), MIN_SAMPLES, MAX_SAMPLES);
}

function arrayVariance(arr) {
  if (arr.length < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return arr.reduce((sum, v) => sum + (v - mean) ** 2, 0) / arr.length;
}

// ─── Frame sampling ───────────────────────────────────────────

/**
 * Sample frames across a video segment and detect ALL face positions.
 * Returns per-frame face arrays plus source video dimensions.
 */
async function sampleAllFaces(videoFile, startTime, duration) {
  let detector;
  try {
    detector = new FaceDetector({ maxDetectedFaces: 5, fastMode: true });
  } catch {
    return { frames: [], srcWidth: 0, srcHeight: 0 };
  }

  const blobUrl = URL.createObjectURL(videoFile);
  const video = document.createElement('video');
  video.muted = true;
  video.preload = 'auto';
  video.playsInline = true;

  try {
    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('timeout')), 15000);
      video.onloadeddata = () => { clearTimeout(t); resolve(); };
      video.onerror = () => { clearTimeout(t); reject(new Error('load failed')); };
      video.src = blobUrl;
    });

    const srcWidth = video.videoWidth;
    const srcHeight = video.videoHeight;
    const sampleCount = getSampleCount(duration);
    const interval = duration / (sampleCount + 1);
    const frames = [];

    for (let i = 1; i <= sampleCount; i++) {
      const relTime = interval * i;
      const absTime = startTime + relTime;
      try {
        await seekTo(video, absTime);
        const detected = await detector.detect(video);
        frames.push({
          time: relTime, // relative to segment start
          faces: detected.map(f => ({
            centerX: f.boundingBox.x + f.boundingBox.width / 2,
            centerY: f.boundingBox.y + f.boundingBox.height / 2,
            width: f.boundingBox.width,
            height: f.boundingBox.height,
            area: f.boundingBox.width * f.boundingBox.height,
          })),
        });
      } catch {
        // Skip this sample point
      }
    }

    const withFaces = frames.filter(f => f.faces.length > 0).length;
    console.log(`[Face] Sampled ${frames.length} frames, ${withFaces} contain faces`);
    return { frames, srcWidth, srcHeight };
  } catch (err) {
    console.warn('[Face] Sampling pipeline failed:', err.message);
    return { frames: [], srcWidth: 0, srcHeight: 0 };
  } finally {
    URL.revokeObjectURL(blobUrl);
    video.remove();
  }
}

// ─── Speaker clustering ───────────────────────────────────────

/**
 * Cluster detected faces across frames into speaker tracks.
 * Groups faces with consistent horizontal positions.
 *
 * @returns {Array<{avgCenterX: number, areas: number[], frameTimes: number[], activityScore: number}>}
 *   Sorted left-to-right by average X position.
 */
function clusterSpeakers(frames, srcWidth) {
  const mergeThreshold = srcWidth * CLUSTER_THRESHOLD_RATIO;
  const tracks = []; // [{centerXs, areas, frameTimes}]

  for (const frame of frames) {
    for (const face of frame.faces) {
      let matched = false;
      for (const track of tracks) {
        const avgX = track.centerXs.reduce((a, b) => a + b, 0) / track.centerXs.length;
        if (Math.abs(face.centerX - avgX) < mergeThreshold) {
          track.centerXs.push(face.centerX);
          track.areas.push(face.area);
          track.frameTimes.push(frame.time);
          matched = true;
          break;
        }
      }
      if (!matched) {
        tracks.push({
          centerXs: [face.centerX],
          areas: [face.area],
          frameTimes: [frame.time],
        });
      }
    }
  }

  // Filter noise: tracks appearing in too few frames
  const framesWithFaces = frames.filter(f => f.faces.length > 0).length;
  const minAppearances = Math.max(2, Math.floor(framesWithFaces * MIN_TRACK_PRESENCE));

  return tracks
    .filter(t => t.centerXs.length >= minAppearances)
    .map(t => ({
      avgCenterX: t.centerXs.reduce((a, b) => a + b, 0) / t.centerXs.length,
      centerXs: t.centerXs,
      areas: t.areas,
      frameTimes: t.frameTimes,
      activityScore: arrayVariance(t.areas),
    }))
    .sort((a, b) => a.avgCenterX - b.avgCenterX); // left to right
}

// ─── Crop target computation ──────────────────────────────────

/**
 * Determine the crop center-X for each sampled frame.
 *
 * Strategy:
 *  - If all speakers fit inside the 9:16 crop → center between them (stable)
 *  - Single speaker → follow their actual per-frame position
 *  - Multiple speakers that don't fit → pick the more active one per frame
 *    (activity = bbox area variance over a sliding window, proxy for speaking)
 */
function buildCropTargets(frames, speakers, srcWidth, srcHeight) {
  const cropW = Math.round(srcHeight * 9 / 16);

  if (speakers.length === 0) return [];

  // Check if all speakers can fit within the crop window
  if (speakers.length >= 2) {
    const leftmost = speakers[0].avgCenterX;
    const rightmost = speakers[speakers.length - 1].avgCenterX;
    // Estimate average face width from area (assume roughly square-ish faces)
    const totalArea = speakers.reduce((sum, s) => {
      return sum + s.areas.reduce((a, b) => a + b, 0) / s.areas.length;
    }, 0);
    const avgFaceW = Math.sqrt(totalArea / speakers.length);
    const totalSpan = (rightmost - leftmost) + avgFaceW * 1.5;

    if (totalSpan <= cropW * 0.9) {
      // Both fit — center between them every frame for maximum stability
      const midX = (leftmost + rightmost) / 2;
      console.log(`[Face] Both speakers fit in crop — centering at ${Math.round(midX)}px`);
      return frames
        .filter(f => f.faces.length > 0)
        .map(f => ({ time: f.time, centerX: midX }));
    }
  }

  // Single speaker — follow their per-frame position
  if (speakers.length === 1) {
    return buildSingleSpeakerTargets(frames, speakers[0]);
  }

  // Multiple speakers that don't fit — dynamic speaker tracking
  console.log(`[Face] ${speakers.length} speakers don't fit in crop — using activity-based targeting`);
  return buildMultiSpeakerTargets(frames, speakers, srcWidth);
}

function buildSingleSpeakerTargets(frames, speaker) {
  const keyframes = [];

  for (const frame of frames) {
    if (frame.faces.length > 0) {
      const closest = frame.faces.reduce((best, f) =>
        Math.abs(f.centerX - speaker.avgCenterX) < Math.abs(best.centerX - speaker.avgCenterX) ? f : best
      );
      keyframes.push({ time: frame.time, centerX: closest.centerX });
    } else {
      keyframes.push({ time: frame.time, centerX: speaker.avgCenterX });
    }
  }

  return keyframes;
}

function buildMultiSpeakerTargets(frames, speakers, srcWidth) {
  const matchThreshold = srcWidth * CLUSTER_THRESHOLD_RATIO;
  const keyframes = [];

  // Per-speaker sliding window of recent face areas for activity detection
  const recentAreas = speakers.map(() => []);

  for (const frame of frames) {
    // Update each speaker's recent area buffer
    for (let s = 0; s < speakers.length; s++) {
      const matchedFace = frame.faces.find(f =>
        Math.abs(f.centerX - speakers[s].avgCenterX) < matchThreshold
      );
      if (matchedFace) {
        recentAreas[s].push(matchedFace.area);
        if (recentAreas[s].length > ACTIVITY_WINDOW) recentAreas[s].shift();
      }
    }

    // Pick speaker with highest recent activity (bbox area variance)
    let bestIdx = 0;
    let bestActivity = -1;
    for (let s = 0; s < speakers.length; s++) {
      if (recentAreas[s].length < 2) continue;
      const activity = arrayVariance(recentAreas[s]);
      if (activity > bestActivity) {
        bestActivity = activity;
        bestIdx = s;
      }
    }

    // Use the actual face position of the chosen speaker in this frame
    const targetFace = frame.faces.find(f =>
      Math.abs(f.centerX - speakers[bestIdx].avgCenterX) < matchThreshold
    );
    keyframes.push({
      time: frame.time,
      centerX: targetFace ? targetFace.centerX : speakers[bestIdx].avgCenterX,
    });
  }

  return keyframes;
}

// ─── Public: face keyframe detection ──────────────────────────

/**
 * Sample frames across a video segment and detect face positions.
 *
 * @param {File|Blob} videoFile
 * @param {number}    startTime — segment start (seconds)
 * @param {number}    duration  — segment length (seconds)
 * @returns {Promise<Array<{time: number, centerX: number}>>}
 *   Keyframes with face center-X in source-pixel coords.
 *   `time` is relative to segment start (0 … duration).
 *   Empty array if detection is unavailable or finds nothing.
 */
export async function detectFaceKeyframes(videoFile, startTime, duration) {
  if (!isFaceDetectionSupported()) {
    console.log('[Face] FaceDetector API not available — will use center crop');
    return [];
  }

  const { frames, srcWidth, srcHeight } = await sampleAllFaces(videoFile, startTime, duration);

  if (!frames.length || srcWidth === 0) return [];

  const framesWithFaces = frames.filter(f => f.faces.length > 0);
  if (framesWithFaces.length === 0) {
    console.log('[Face] No faces detected in any sampled frame');
    return [];
  }

  // Cluster faces into speaker tracks
  const speakers = clusterSpeakers(frames, srcWidth);
  if (speakers.length === 0) {
    console.log('[Face] No consistent speaker tracks found');
    return [];
  }

  // Build per-frame crop targets
  const targets = buildCropTargets(frames, speakers, srcWidth, srcHeight);
  if (targets.length === 0) return [];

  console.log(`[Face] ${speakers.length} speaker(s), ${targets.length} keyframes from ${frames.length} samples`);
  return targets;
}

// ─── FFmpeg crop filter builder ───────────────────────────────

/**
 * Build an FFmpeg -vf filter string for face-centered vertical crop.
 *
 * When keyframes exist, generates a piecewise-linear expression for the
 * crop X position so the crop window smoothly follows the face across time.
 *
 * Smoothing pipeline:
 *  1. Convert face centerX → crop X (face centered in crop window)
 *  2. Exponential moving average (EMA) to remove jitter
 *  3. Velocity clamping to prevent jumps faster than MAX_PAN_PX_PER_SEC
 *
 * @param {Array}  keyframes  — from detectFaceKeyframes()
 * @param {number} srcWidth   — source video width in pixels
 * @param {number} srcHeight  — source video height in pixels
 * @returns {string|null}
 *   FFmpeg -vf filter string, or null if no face data / not applicable
 *   (caller should fall back to default center crop).
 */
export function buildCropFilter(keyframes, srcWidth, srcHeight) {
  const cropW = Math.round(srcHeight * 9 / 16);
  const maxX = srcWidth - cropW;

  // Source is already narrower than or equal to 9:16 — no horizontal crop needed
  if (maxX <= 0) return null;

  // No face keyframes — fall back to center crop
  if (!keyframes.length) return null;

  // Step 1: Convert face centerX → crop X (face centered in the crop window)
  const rawPositions = keyframes.map(kf => ({
    time: kf.time,
    cropX: clamp(Math.round(kf.centerX - cropW / 2), 0, maxX),
  }));

  rawPositions.sort((a, b) => a.time - b.time);

  // Step 2: Exponential moving average smoothing
  const emaSmoothed = [rawPositions[0]];
  for (let i = 1; i < rawPositions.length; i++) {
    const prev = emaSmoothed[i - 1];
    emaSmoothed.push({
      time: rawPositions[i].time,
      cropX: clamp(
        Math.round(SMOOTH_ALPHA * rawPositions[i].cropX + (1 - SMOOTH_ALPHA) * prev.cropX),
        0, maxX
      ),
    });
  }

  // Step 3: Velocity clamping — limit how fast the crop can pan
  const smoothed = [emaSmoothed[0]];
  for (let i = 1; i < emaSmoothed.length; i++) {
    const dt = emaSmoothed[i].time - emaSmoothed[i - 1].time;
    const prev = smoothed[i - 1];
    if (dt > 0) {
      const maxDelta = MAX_PAN_PX_PER_SEC * dt;
      const delta = emaSmoothed[i].cropX - prev.cropX;
      const clamped = Math.abs(delta) > maxDelta
        ? prev.cropX + Math.sign(delta) * maxDelta
        : emaSmoothed[i].cropX;
      smoothed.push({
        time: emaSmoothed[i].time,
        cropX: clamp(Math.round(clamped), 0, maxX),
      });
    } else {
      smoothed.push({ ...emaSmoothed[i] });
    }
  }

  // Single keyframe → static face-centered crop
  if (smoothed.length === 1) {
    return `crop=${cropW}:${srcHeight}:${smoothed[0].cropX}:0,scale=1080:1920`;
  }

  // Multiple keyframes → piecewise-linear FFmpeg expression for smooth pan
  //
  // FFmpeg filtergraph escaping: commas inside a filter parameter must be
  // written as \, so they aren't mistaken for filter-chain separators.
  const E = '\\,'; // escaped comma

  // Build nested if() expression from the end backwards
  let expr = String(smoothed[smoothed.length - 1].cropX);

  for (let i = smoothed.length - 2; i >= 0; i--) {
    const curr = smoothed[i];
    const next = smoothed[i + 1];
    const dt = next.time - curr.time;
    if (dt <= 0) continue;

    const slope = (next.cropX - curr.cropX) / dt;
    const absSlope = Math.abs(slope).toFixed(4);
    const sign = slope >= 0 ? '+' : '-';

    // Linear interpolation: currX +/- |slope| * (t - currTime)
    const lerp = `${curr.cropX}${sign}${absSlope}*(t-${curr.time.toFixed(2)})`;
    expr = `if(lt(t${E}${next.time.toFixed(2)})${E}${lerp}${E}${expr})`;
  }

  // Hold first keyframe's position for frames before the first sample
  expr = `if(lt(t${E}${smoothed[0].time.toFixed(2)})${E}${smoothed[0].cropX}${E}${expr})`;

  // Clamp to valid pixel range
  expr = `max(0${E}min(${maxX}${E}${expr}))`;

  return `crop=${cropW}:${srcHeight}:${expr}:0,scale=1080:1920`;
}
