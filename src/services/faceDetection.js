/**
 * Face-aware crop positioning for vertical (9:16) reframing.
 *
 * Detection cascade:
 *  1. MediaPipe Face Landmarker — 478 landmarks + jawOpen blendshape (GPU)
 *  2. BlazeFace (TensorFlow.js) — ML face detection fallback
 *  3. Shape Detection API (FaceDetector) — Chrome/Edge native API
 *  4. Canvas zone analysis — pixel-level heuristic fallback
 *
 * Pipeline:
 *  1. Sample N frames across the segment (~1 per 1.5s, 8-40 frames)
 *  2. Detect faces per frame (BlazeFace → ShapeDetection → zones)
 *  3. Cluster faces into speaker tracks by horizontal position
 *  4. Per frame: if both speakers fit in 9:16 crop, center between them;
 *     otherwise pick the more active speaker (bbox size variation heuristic)
 *  5. Smooth keyframes with adaptive smoothing + velocity clamping
 *  6. Build a piecewise-linear FFmpeg crop expression for smooth panning
 */

import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// ── Sampling constants ──────────────────────────────────────

const MIN_SAMPLES = 8;
const MAX_SAMPLES = 40;
const SAMPLES_PER_SECOND = 0.7; // ~1 sample per 1.5 seconds

/** Max horizontal pan speed in pixels per second (prevents jarring jumps) */
const MAX_PAN_PX_PER_SEC = 600; // Raised — let real speaker changes arrive promptly

/** EMA smoothing factor — now used adaptively, this is the "slow" baseline */
const SMOOTH_ALPHA_SLOW = 0.25;

/** EMA smoothing factor for active transitions (speaker change detected) */
const SMOOTH_ALPHA_FAST = 0.7;

/** Minimum time (seconds) to hold a crop target before allowing another switch */
const MIN_HOLD_TIME = 0.6; // Reduced — conversational turns are fast

/** Dead zone: ignore crop movements smaller than this fraction of crop width */
const DEAD_ZONE_RATIO = 0.03; // Reduced — only filter sub-pixel jitter

/** Hysteresis threshold: movements must exceed this to START a new transition,
 *  but once moving, smaller corrections are allowed through */
const HYSTERESIS_RATIO = 0.06;

/** Minimum transition duration (seconds) for smooth easing */
const MIN_TRANSITION_DURATION = 0.25; // Shorter for snappier speaker switches

/** Maximum number of keyframes in the FFmpeg expression */
const MAX_EXPRESSION_KEYFRAMES = 30; // Raised to allow denser keyframes

/** Faces within this fraction of frame width are considered the same speaker */
const CLUSTER_THRESHOLD_RATIO = 0.15;

/** A speaker track must appear in at least this fraction of face-containing frames */
const MIN_TRACK_PRESENCE = 0.20;

/** Activity sliding window size (frames) for speaker activity estimation */
const ACTIVITY_WINDOW = 4;

/** Minimum pause between words (seconds) to infer a speaker change */
const SPEAKER_CHANGE_PAUSE = 0.4;

/** Normalized audio energy below this threshold is considered silence */
const AUDIO_ENERGY_THRESHOLD = 0.15;

/** Merge speaker intervals shorter than this (seconds) into neighbors */
const AUDIO_MIN_INTERVAL = 1.0;

/** Minimum ratio between best and median zone scores to consider detection confident.
 *  1.4 was too strict — rejected almost all real talking-head footage.
 *  1.15 allows zones that are clearly above average without requiring huge contrast. */
const ZONE_CONFIDENCE_RATIO = 1.15;

/** Penalty multiplier for edge zones (0 and last) to counter frame-border artifacts.
 *  0.35 was too harsh — when the subject IS near the edge, it completely suppressed
 *  the correct zone.  0.6 still penalizes but doesn't obliterate. */
const EDGE_ZONE_PENALTY = 0.6;

/** If this fraction or more of keyframes share the same position, detection is "flat"
 *  and the transcript should override crop positioning entirely. */
const FLAT_DETECTION_RATIO = 0.65;

/** jawOpen blendshape threshold for "this person is talking" */
const JAWOPEN_TALKING_THRESHOLD = 0.15;

// ── Debug data collector ─────────────────────────────────────

let _lastDebugData = null;

/** Retrieve the debug data collected during the last detectFaceKeyframes + buildCropFilter run. */
export function getLastDebugData() { return _lastDebugData; }

// ── BlazeFace (TensorFlow.js) singleton ──────────────────────

let blazeFaceModel = null;
let blazeFaceLoadPromise = null;
let blazeFaceLoadFailed = false;

/**
 * Load BlazeFace model once (singleton). Returns the model or null on failure.
 */
async function loadBlazeFace() {
  if (blazeFaceModel) return blazeFaceModel;
  if (blazeFaceLoadFailed) return null;
  if (blazeFaceLoadPromise) return blazeFaceLoadPromise;

  blazeFaceLoadPromise = (async () => {
    try {
      await tf.ready();
      console.log(`[Face] TF.js backend: ${tf.getBackend()}`);
      blazeFaceModel = await blazeface.load({
        maxFaces: 5,
        modelUrl: '/models/blazeface/model.json',
      });
      console.log('[Face] BlazeFace model loaded');
      return blazeFaceModel;
    } catch (err) {
      console.warn('[Face] BlazeFace load failed:', err.message);
      blazeFaceLoadFailed = true;
      return null;
    } finally {
      blazeFaceLoadPromise = null;
    }
  })();

  return blazeFaceLoadPromise;
}

// ── MediaPipe Face Landmarker singleton ──────────────────────

let mediaPipeLandmarker = null;
let mediaPipeLoadPromise = null;
let mediaPipeLoadFailed = false;

/**
 * Load MediaPipe Face Landmarker once (singleton).
 * Returns the landmarker or null on failure.
 */
async function loadMediaPipeLandmarker() {
  if (mediaPipeLandmarker) return mediaPipeLandmarker;
  if (mediaPipeLoadFailed) return null;
  if (mediaPipeLoadPromise) return mediaPipeLoadPromise;

  mediaPipeLoadPromise = (async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks('/mediapipe-wasm/');
      mediaPipeLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/mediapipe-wasm/face_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numFaces: 5,
        outputFaceBlendshapes: true,
      });
      console.log('[Face] MediaPipe Face Landmarker loaded');
      return mediaPipeLandmarker;
    } catch (err) {
      console.warn('[Face] MediaPipe load failed:', err.message);
      mediaPipeLoadFailed = true;
      return null;
    } finally {
      mediaPipeLoadPromise = null;
    }
  })();

  return mediaPipeLoadPromise;
}

// ── Browser API detection ────────────────────────────────────

export function isFaceDetectionSupported() {
  // BlazeFace is always available (loaded on demand), so face detection
  // is supported in all modern browsers. Keep the Shape Detection API
  // check as a secondary signal.
  return true;
}

// ── Helpers ──────────────────────────────────────────────────

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

/**
 * Easing function: ease-in-out cubic for smooth acceleration/deceleration
 * @param {number} t - Normalized time (0 to 1)
 * @returns {number} Eased value (0 to 1)
 */
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Detect whether a position change represents a speaker change (large deliberate
 * movement) vs. tracking jitter (small drift within same speaker).
 *
 * @param {number} distance - Absolute pixel distance of the move
 * @param {number} cropW    - Crop window width in pixels
 * @returns {'switch'|'drift'|'jitter'}
 */
function classifyMovement(distance, cropW) {
  const ratio = distance / cropW;
  if (ratio >= 0.12) return 'switch';  // >12% of crop = speaker change
  if (ratio >= 0.03) return 'drift';   // 3-12% = legitimate reframe
  return 'jitter';                      // <3% = noise
}

// ── Audio energy extraction ─────────────────────────────────

/**
 * Extract audio energy profile from a video file using Web Audio API.
 * Returns RMS energy levels per time window, normalized to 0-1.
 *
 * @param {File|Blob} videoFile
 * @param {number} startTime - segment start in seconds
 * @param {number} duration  - segment duration in seconds
 * @param {number} [windowSize=0.5] - analysis window in seconds
 * @returns {Promise<Array<{time: number, energy: number}>>}
 *   Segment-relative times. Empty array on failure.
 */
export async function extractAudioEnergy(videoFile, startTime, duration, windowSize = 0.5) {
  let audioContext;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      console.warn('[Audio] AudioContext not available');
      return [];
    }

    audioContext = new AudioCtx();
    const arrayBuffer = await videoFile.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const sampleRate = audioBuffer.sampleRate;
    const channelData = audioBuffer.getChannelData(0); // mono channel
    const startSample = Math.floor(startTime * sampleRate);
    const endSample = Math.min(
      Math.floor((startTime + duration) * sampleRate),
      channelData.length
    );
    const windowSamples = Math.floor(windowSize * sampleRate);

    if (windowSamples <= 0 || startSample >= endSample) return [];

    const energyProfile = [];

    for (let pos = startSample; pos < endSample; pos += windowSamples) {
      const windowEnd = Math.min(pos + windowSamples, endSample);
      let sumSquares = 0;
      let count = 0;

      for (let i = pos; i < windowEnd; i++) {
        sumSquares += channelData[i] * channelData[i];
        count++;
      }

      const rmsEnergy = Math.sqrt(sumSquares / (count || 1));
      const relativeTime = (pos - startSample) / sampleRate;

      energyProfile.push({ time: relativeTime, energy: rmsEnergy });
    }

    // Normalize to 0-1
    const maxEnergy = Math.max(...energyProfile.map(e => e.energy), 0.001);
    for (const entry of energyProfile) {
      entry.energy = entry.energy / maxEnergy;
    }

    console.log(`[Audio] Energy profile: ${energyProfile.length} windows, peak RMS normalized`);
    return energyProfile;
  } catch (err) {
    console.warn('[Audio] Energy extraction failed:', err.message);
    return [];
  } finally {
    if (audioContext) {
      try { await audioContext.close(); } catch (_) { /* ignore */ }
    }
  }
}

// ── Audio-only speaker turn detection ────────────────────────

/**
 * Detect speaking turns from audio energy profile alone.
 * Returns intervals similar to inferActiveSpeakerFromTranscript but
 * based purely on audio energy patterns.
 *
 * Logic:
 * - Consecutive high-energy windows = one speaking turn
 * - A gap of low energy (< threshold) for 0.3s+ = potential speaker change
 * - Alternating high segments after gaps get assigned alternating speaker indices
 *
 * This works even without transcript data or face detection.
 */
function detectSpeakingTurns(audioEnergy) {
  if (!audioEnergy || audioEnergy.length < 4) return [];

  const SILENCE_THRESHOLD = 0.15;
  const MIN_SILENCE_GAP = 0.3; // seconds
  const MIN_SPEAKING_DURATION = 0.5; // seconds - ignore very short sounds
  const windowSize = audioEnergy.length > 1
    ? audioEnergy[1].time - audioEnergy[0].time
    : 0.5;

  // Step 1: Find speaking segments (consecutive high-energy windows)
  const segments = [];
  let segStart = -1;

  for (let i = 0; i < audioEnergy.length; i++) {
    const isHigh = audioEnergy[i].energy >= SILENCE_THRESHOLD;

    if (isHigh && segStart === -1) {
      segStart = i;
    } else if (!isHigh && segStart !== -1) {
      const start = audioEnergy[segStart].time;
      const end = audioEnergy[i].time;
      if (end - start >= MIN_SPEAKING_DURATION) {
        segments.push({ start, end });
      }
      segStart = -1;
    }
  }
  // Close final segment
  if (segStart !== -1) {
    const start = audioEnergy[segStart].time;
    const end = audioEnergy[audioEnergy.length - 1].time + windowSize;
    if (end - start >= MIN_SPEAKING_DURATION) {
      segments.push({ start, end });
    }
  }

  if (segments.length === 0) return [];

  // Step 2: Find gaps between segments that indicate speaker changes
  // Assign alternating speaker indices to segments separated by silence
  const intervals = [];
  let currentSpeaker = 0;

  for (let i = 0; i < segments.length; i++) {
    if (i > 0) {
      const gap = segments[i].start - segments[i - 1].end;
      if (gap >= MIN_SILENCE_GAP) {
        // Silence gap = likely speaker change
        currentSpeaker = currentSpeaker === 0 ? 1 : 0;
      }
    }

    intervals.push({
      start: segments[i].start,
      end: segments[i].end,
      speakerIdx: currentSpeaker,
    });
  }

  // Only return if we actually detected multiple speakers
  const uniqueSpeakers = new Set(intervals.map(iv => iv.speakerIdx));
  if (uniqueSpeakers.size < 2) return [];

  console.log(`[Audio] Detected ${intervals.length} speaking turns, ${uniqueSpeakers.size} speakers from audio energy alone`);
  intervals.forEach((iv, i) => {
    console.log(`  Turn ${i + 1}: speaker ${iv.speakerIdx} from ${iv.start.toFixed(1)}s to ${iv.end.toFixed(1)}s`);
  });

  return intervals;
}

// ── Transcript-based speaker inference ──────────────────────

/**
 * Infer speaker change points from word-level timing.
 *
 * Pauses longer than SPEAKER_CHANGE_PAUSE between consecutive words are
 * treated as speaker switches.  Returns alternating intervals (0, 1, 0, ...).
 *
 * @param {Array<{word: string, start: number, end: number}>} words
 *   Word-level timing (absolute seconds).
 * @param {number} segmentStart - absolute start time of the segment
 * @param {number} duration     - segment length in seconds
 * @returns {Array<{start: number, end: number, speakerIdx: number}>}
 *   Intervals in segment-relative seconds.  Empty array when no words.
 */
export function inferActiveSpeakerFromTranscript(words, segmentStart, duration) {
  if (!words || words.length === 0) return [];

  const intervals = [];
  let currentSpeaker = 0;
  let intervalStart = Math.max(words[0].start - segmentStart, 0);

  for (let i = 1; i < words.length; i++) {
    const gap = words[i].start - words[i - 1].end;
    if (gap >= SPEAKER_CHANGE_PAUSE) {
      // Close current interval at the end of the previous word
      intervals.push({
        start: intervalStart,
        end: words[i - 1].end - segmentStart,
        speakerIdx: currentSpeaker,
      });
      // Toggle speaker and start new interval
      currentSpeaker = currentSpeaker === 0 ? 1 : 0;
      intervalStart = words[i].start - segmentStart;
    }
  }

  // Close the final interval
  intervals.push({
    start: intervalStart,
    end: Math.min(words[words.length - 1].end - segmentStart, duration),
    speakerIdx: currentSpeaker,
  });

  console.log(`[Face] Transcript speaker inference: ${intervals.length} intervals from ${words.length} words`);
  return intervals;
}

/**
 * Look up which speaker is active at a given time.
 * Returns speakerIdx (0 or 1), or -1 if the time falls outside all intervals.
 */
function getActiveSpeakerAt(time, speakerIntervals) {
  for (const iv of speakerIntervals) {
    if (time >= iv.start && time <= iv.end) return iv.speakerIdx;
  }
  return -1;
}

/**
 * Find the nearest speaker-change boundary to a given time.
 * Returns { time, distance } or null if no intervals.
 */
function nearestSpeakerChange(time, speakerIntervals) {
  if (!speakerIntervals || speakerIntervals.length < 2) return null;
  let closest = null;
  for (let i = 1; i < speakerIntervals.length; i++) {
    const boundary = speakerIntervals[i].start;
    const dist = Math.abs(time - boundary);
    if (!closest || dist < closest.distance) {
      closest = { time: boundary, distance: dist };
    }
  }
  return closest;
}

// ── Frame sampling ───────────────────────────────────────────

/**
 * Sample frames using the Shape Detection API (FaceDetector).
 * Returns null if FaceDetector is unavailable (triggering next fallback).
 */
async function sampleWithShapeDetection(videoFile, startTime, duration) {
  if (typeof globalThis.FaceDetector !== 'function') return null;

  let detector;
  try {
    detector = new FaceDetector({ maxDetectedFaces: 5, fastMode: true });
  } catch {
    return null;
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

// ── BlazeFace sampling ──────────────────────────────────────

/**
 * Sample frames using BlazeFace (TensorFlow.js) for face detection.
 * Returns same shape as sampleAllFaces() so downstream pipeline works unchanged.
 *
 * @param {File|Blob} videoFile
 * @param {number}    startTime - segment start (seconds)
 * @param {number}    duration  - segment length (seconds)
 * @returns {Promise<{frames: Array, srcWidth: number, srcHeight: number}|null>}
 *   Returns null if BlazeFace fails to load (triggering next fallback).
 */
async function sampleWithBlazeFace(videoFile, startTime, duration) {
  const model = await loadBlazeFace();
  if (!model) return null;

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
        const predictions = await model.estimateFaces(video, false /* returnTensors */);
        frames.push({
          time: relTime,
          faces: predictions.map(p => {
            // BlazeFace returns topLeft [x,y] and bottomRight [x,y]
            const [x1, y1] = p.topLeft;
            const [x2, y2] = p.bottomRight;
            const w = x2 - x1;
            const h = y2 - y1;
            return {
              centerX: x1 + w / 2,
              centerY: y1 + h / 2,
              width: w,
              height: h,
              area: w * h,
              probability: p.probability?.[0] ?? 1,
            };
          }).filter(f => (f.probability ?? 1) > 0.5), // Only keep confident detections
        });
      } catch {
        // Skip this sample point
      }
    }

    const withFaces = frames.filter(f => f.faces.length > 0).length;
    console.log(`[Face] BlazeFace sampled ${frames.length} frames, ${withFaces} contain faces`);
    return { frames, srcWidth, srcHeight };
  } catch (err) {
    console.warn('[Face] BlazeFace sampling failed:', err.message);
    return null;
  } finally {
    URL.revokeObjectURL(blobUrl);
    video.remove();
  }
}

// ── MediaPipe sampling ─────────────────────────────────────

/**
 * Sample frames using MediaPipe Face Landmarker.
 * Returns face positions AND jawOpen blendshape per face.
 * jawOpen > JAWOPEN_TALKING_THRESHOLD = person is likely talking.
 *
 * @param {File|Blob} videoFile
 * @param {number}    startTime - segment start (seconds)
 * @param {number}    duration  - segment length (seconds)
 * @returns {Promise<{frames: Array, srcWidth: number, srcHeight: number}|null>}
 */
async function sampleWithMediaPipe(videoFile, startTime, duration) {
  const landmarker = await loadMediaPipeLandmarker();
  if (!landmarker) return null;

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
    let lastTimestampMs = -1;

    for (let i = 1; i <= sampleCount; i++) {
      const relTime = interval * i;
      const absTime = startTime + relTime;
      try {
        await seekTo(video, absTime);

        // detectForVideo requires strictly increasing timestamps
        const timestampMs = Math.max(Math.round(absTime * 1000), lastTimestampMs + 1);
        lastTimestampMs = timestampMs;

        const result = landmarker.detectForVideo(video, timestampMs);

        const faces = [];
        if (result.faceLandmarks) {
          for (let f = 0; f < result.faceLandmarks.length; f++) {
            const landmarks = result.faceLandmarks[f];

            // Compute bounding box from landmarks
            let minX = Infinity, maxX = -Infinity;
            let minY = Infinity, maxY = -Infinity;
            for (const lm of landmarks) {
              const px = lm.x * srcWidth;
              const py = lm.y * srcHeight;
              if (px < minX) minX = px;
              if (px > maxX) maxX = px;
              if (py < minY) minY = py;
              if (py > maxY) maxY = py;
            }

            // Add ~10% padding for clustering consistency with BlazeFace
            const rawW = maxX - minX;
            const rawH = maxY - minY;
            const padX = rawW * 0.1;
            const padY = rawH * 0.1;
            minX = Math.max(0, minX - padX);
            maxX = Math.min(srcWidth, maxX + padX);
            minY = Math.max(0, minY - padY);
            maxY = Math.min(srcHeight, maxY + padY);

            const w = maxX - minX;
            const h = maxY - minY;
            const centerX = minX + w / 2;
            const centerY = minY + h / 2;

            // Extract jawOpen blendshape — the "is talking" signal
            let jawOpen = 0;
            let mouthClose = 1;
            if (result.faceBlendshapes && result.faceBlendshapes[f]) {
              const blendshapes = result.faceBlendshapes[f].categories;
              for (const bs of blendshapes) {
                if (bs.categoryName === 'jawOpen') jawOpen = bs.score;
                if (bs.categoryName === 'mouthClose') mouthClose = bs.score;
              }
            }

            faces.push({
              centerX,
              centerY,
              width: w,
              height: h,
              area: w * h,
              jawOpen,
              mouthClose,
              isTalking: jawOpen > JAWOPEN_TALKING_THRESHOLD,
            });
          }
        }

        frames.push({ time: relTime, faces });
      } catch (err) {
        console.warn(`[Face] MediaPipe frame ${i} failed:`, err.message);
      }
    }

    const withFaces = frames.filter(f => f.faces.length > 0).length;
    const talkingFrames = frames.filter(f => f.faces.some(face => face.isTalking)).length;
    console.log(`[Face] MediaPipe sampled ${frames.length} frames, ${withFaces} with faces, ${talkingFrames} with talking`);
    return { frames, srcWidth, srcHeight };
  } catch (err) {
    console.warn('[Face] MediaPipe sampling failed:', err.message);
    return null;
  } finally {
    URL.revokeObjectURL(blobUrl);
    video.remove();
  }
}

// ── Canvas-based zone analysis (fallback when FaceDetector unavailable) ──

/** Number of vertical zones to divide the frame into */
const ZONE_COUNT = 5;

/** Canvas width for zone analysis (small for performance) */
const ANALYSIS_CANVAS_W = 320;

/** Sample rate for zone analysis (higher than face detection for better coverage) */
const ZONE_SAMPLES_PER_SECOND = 1.5;
const ZONE_MIN_SAMPLES = 8;
const ZONE_MAX_SAMPLES = 20;

/** Minimum zone score to be considered a subject */
const ZONE_MIN_SCORE = 0.15;

/** Minimum separation between two subject zones (fraction of frame width) */
const ZONE_MIN_SEPARATION = 0.25;

/**
 * Sample frames and estimate subject positions using canvas pixel analysis.
 *
 * For each frame, divides the image into vertical zones and scores each by
 * edge density and inter-frame motion.  Returns results in the same format
 * as sampleAllFaces() so the downstream clustering/crop pipeline works
 * unchanged.
 *
 * @param {File|Blob} videoFile
 * @param {number}    startTime - segment start (seconds)
 * @param {number}    duration  - segment length (seconds)
 * @returns {Promise<{frames: Array, srcWidth: number, srcHeight: number}>}
 */
async function sampleFrameZones(videoFile, startTime, duration) {
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
    const scale = ANALYSIS_CANVAS_W / srcWidth;
    const canvasH = Math.round(srcHeight * scale);
    const canvasW = ANALYSIS_CANVAS_W;

    const canvas = document.createElement('canvas');
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const sampleCount = clamp(
      Math.round(duration * ZONE_SAMPLES_PER_SECOND),
      ZONE_MIN_SAMPLES, ZONE_MAX_SAMPLES
    );
    const interval = duration / (sampleCount + 1);

    const zoneWidth = Math.floor(canvasW / ZONE_COUNT);
    let prevZoneBrightness = null;
    const frames = [];

    for (let i = 1; i <= sampleCount; i++) {
      const relTime = interval * i;
      const absTime = startTime + relTime;
      try {
        await seekTo(video, absTime);
        ctx.drawImage(video, 0, 0, canvasW, canvasH);

        const zoneScores = [];
        const zoneBrightness = [];

        for (let z = 0; z < ZONE_COUNT; z++) {
          const x0 = z * zoneWidth;
          const w = (z === ZONE_COUNT - 1) ? canvasW - x0 : zoneWidth;
          const imageData = ctx.getImageData(x0, 0, w, canvasH);
          const pixels = imageData.data;

          // Edge density: sum of horizontal brightness gradients
          let edgeSum = 0;
          let brightnessSum = 0;
          const pixelCount = w * canvasH;

          for (let py = 0; py < canvasH; py++) {
            for (let px = 1; px < w; px++) {
              const idx = (py * w + px) * 4;
              const prevIdx = idx - 4;
              const bright = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
              const prevBright = (pixels[prevIdx] + pixels[prevIdx + 1] + pixels[prevIdx + 2]) / 3;
              edgeSum += Math.abs(bright - prevBright);
              brightnessSum += bright;
            }
          }

          const edgeDensity = edgeSum / (pixelCount * 255);
          const avgBrightness = brightnessSum / (pixelCount || 1);
          zoneBrightness.push(avgBrightness);

          // Inter-frame motion: difference in average brightness from previous frame
          let motion = 0;
          if (prevZoneBrightness) {
            motion = Math.abs(avgBrightness - prevZoneBrightness[z]) / 255;
          }

          // Combined score: edge density (subject detail) + motion (activity)
          const totalScore = edgeDensity * 0.6 + motion * 0.4;

          zoneScores.push({
            zoneIndex: z,
            centerX: (x0 + w / 2) / scale, // back to source pixel coords
            totalScore,
          });
        }

        prevZoneBrightness = zoneBrightness;

        // Penalize edge zones — frame borders create false edge-density spikes
        zoneScores[0].totalScore *= EDGE_ZONE_PENALTY;
        zoneScores[zoneScores.length - 1].totalScore *= EDGE_ZONE_PENALTY;

        // Pick the top-scoring zones as synthetic "face" detections
        const sorted = [...zoneScores].sort((a, b) => b.totalScore - a.totalScore);
        const syntheticFaces = [];

        // Confidence gate: best zone must stand out clearly from the median.
        const medianScore = [...zoneScores].sort((a, b) => a.totalScore - b.totalScore)[Math.floor(ZONE_COUNT / 2)].totalScore;
        const isConfident = medianScore > 0 ? (sorted[0].totalScore / medianScore) >= ZONE_CONFIDENCE_RATIO : sorted[0].totalScore >= ZONE_MIN_SCORE;

        // Diagnostic: log zone scores for first few frames or when confidence fails
        if (i <= 3 || !isConfident) {
          const scoreStr = zoneScores.map((z, zi) => `z${zi}=${z.totalScore.toFixed(4)}`).join(' ');
          const ratio = medianScore > 0 ? (sorted[0].totalScore / medianScore).toFixed(2) : 'N/A';
          console.log(`[Face] Frame ${i} zones: ${scoreStr} | best/median=${ratio} threshold=${ZONE_CONFIDENCE_RATIO} pass=${isConfident}`);
        }

        if (sorted[0].totalScore >= ZONE_MIN_SCORE && isConfident) {
          // Estimate a synthetic face width (~15% of source width)
          const synthFaceW = srcWidth * 0.15;
          syntheticFaces.push({
            centerX: sorted[0].centerX,
            centerY: srcHeight * 0.35, // assume upper-third (head region)
            width: synthFaceW,
            height: synthFaceW * 1.3,
            area: synthFaceW * synthFaceW * 1.3,
          });

          // Second zone only if it scores well AND is far enough from the first
          if (
            sorted.length > 1 &&
            sorted[1].totalScore >= ZONE_MIN_SCORE &&
            Math.abs(sorted[1].centerX - sorted[0].centerX) >= srcWidth * ZONE_MIN_SEPARATION
          ) {
            syntheticFaces.push({
              centerX: sorted[1].centerX,
              centerY: srcHeight * 0.35,
              width: synthFaceW,
              height: synthFaceW * 1.3,
              area: synthFaceW * synthFaceW * 1.3,
            });
          }
        }

        frames.push({ time: relTime, faces: syntheticFaces });
      } catch {
        // Skip this sample point
      }
    }

    const withFaces = frames.filter(f => f.faces.length > 0).length;
    const noFaces = frames.filter(f => f.faces.length === 0).length;
    console.log(`[Face] Canvas zone analysis: ${frames.length} frames, ${withFaces} have detected zones, ${noFaces} rejected by confidence gate`);
    return { frames, srcWidth, srcHeight };
  } catch (err) {
    console.warn('[Face] Canvas zone analysis failed:', err.message);
    return { frames: [], srcWidth: 0, srcHeight: 0 };
  } finally {
    URL.revokeObjectURL(blobUrl);
    video.remove();
  }
}

// ── Speaker clustering ───────────────────────────────────────

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

// ── Audio-visual speaker correlation ─────────────────────────

/**
 * Correlate audio energy with per-speaker face data to determine
 * who is talking at each moment.
 *
 * For each time window where audio energy is above threshold (someone
 * is speaking), check which speaker's face shows more bbox area variance
 * (proxy for mouth movement / head movement while talking) in that window.
 *
 * @param {Array<{time: number, energy: number}>} audioEnergy
 * @param {Array<{time: number, faces: Array}>} frames - sampled face frames
 * @param {Array<{avgCenterX: number, areas: number[], frameTimes: number[]}>} speakers
 * @param {number} srcWidth
 * @returns {Array<{start: number, end: number, speakerIdx: number}>}
 */
function correlateAudioWithFaces(audioEnergy, frames, speakers, srcWidth) {
  if (!audioEnergy.length || speakers.length < 2) return [];

  const WINDOW_SIZE = audioEnergy.length > 1
    ? audioEnergy[1].time - audioEnergy[0].time
    : 0.5;
  const matchThreshold = srcWidth * CLUSTER_THRESHOLD_RATIO;

  // For each audio window, determine which speaker is most active
  const windowSpeakers = [];

  for (const energyWindow of audioEnergy) {
    if (energyWindow.energy < AUDIO_ENERGY_THRESHOLD) {
      // Silence — potential speaker change point
      windowSpeakers.push({ time: energyWindow.time, speakerIdx: -1, energy: energyWindow.energy });
      continue;
    }

    // Find frames near this time window
    const nearbyFrames = frames.filter(f =>
      Math.abs(f.time - energyWindow.time) < WINDOW_SIZE * 1.5
    );

    if (nearbyFrames.length === 0) {
      windowSpeakers.push({ time: energyWindow.time, speakerIdx: -1, energy: energyWindow.energy });
      continue;
    }

    // For each speaker, compute face area variance in this window
    // (talking faces move more — jaw movement changes bbox height/area)
    let bestSpeakerIdx = 0;
    let bestVariance = -1;

    for (let s = 0; s < speakers.length; s++) {
      const areas = [];
      for (const frame of nearbyFrames) {
        const face = frame.faces.find(f =>
          Math.abs(f.centerX - speakers[s].avgCenterX) < matchThreshold
        );
        if (face) areas.push(face.area);
      }

      if (areas.length >= 2) {
        const variance = arrayVariance(areas);
        // Weight by detection count — speaker visible more often is more
        // likely the one facing camera (interview setup)
        const weightedVariance = variance * (areas.length / nearbyFrames.length);
        if (weightedVariance > bestVariance) {
          bestVariance = weightedVariance;
          bestSpeakerIdx = s;
        }
      }
    }

    windowSpeakers.push({
      time: energyWindow.time,
      speakerIdx: bestSpeakerIdx,
      energy: energyWindow.energy,
    });
  }

  // Convert window-level decisions into intervals
  const intervals = [];
  let currentSpeaker = -1;
  let intervalStart = 0;

  for (const w of windowSpeakers) {
    if (w.speakerIdx === -1) continue; // skip silence

    if (w.speakerIdx !== currentSpeaker) {
      if (currentSpeaker !== -1) {
        intervals.push({
          start: intervalStart,
          end: w.time,
          speakerIdx: currentSpeaker,
        });
      }
      currentSpeaker = w.speakerIdx;
      intervalStart = w.time;
    }
  }

  // Close final interval
  if (currentSpeaker !== -1) {
    const lastTime = audioEnergy[audioEnergy.length - 1].time + WINDOW_SIZE;
    intervals.push({
      start: intervalStart,
      end: lastTime,
      speakerIdx: currentSpeaker,
    });
  }

  // Merge very short intervals into neighbors to avoid jitter
  const merged = [];
  for (const iv of intervals) {
    const dur = iv.end - iv.start;
    if (dur < AUDIO_MIN_INTERVAL && merged.length > 0) {
      // Extend previous interval instead
      merged[merged.length - 1].end = iv.end;
    } else {
      merged.push({ ...iv });
    }
  }

  console.log(`[Audio] Speaker correlation: ${merged.length} intervals from ${windowSpeakers.length} windows`);
  merged.forEach((iv, i) => {
    console.log(`  Interval ${i + 1}: speaker ${iv.speakerIdx} from ${iv.start.toFixed(1)}s to ${iv.end.toFixed(1)}s (${(iv.end - iv.start).toFixed(1)}s)`);
  });

  return merged;
}

// ── Mouth-based speaker detection (MediaPipe) ───────────────

/**
 * Determine who is talking per frame using jawOpen blendshape.
 * Replaces area-variance and audio-energy heuristics when MediaPipe data available.
 *
 * For each frame with 2+ faces, the face with higher jawOpen is the talker.
 * Returns speaker intervals directly.
 *
 * @param {Array} frames  - frames with jawOpen per face (from sampleWithMediaPipe)
 * @param {Array} speakers - clustered speaker tracks
 * @param {number} srcWidth
 * @returns {Array<{start: number, end: number, speakerIdx: number}>}
 */
function detectSpeakerFromMouth(frames, speakers, srcWidth) {
  if (speakers.length < 2) return [];

  const matchThreshold = srcWidth * CLUSTER_THRESHOLD_RATIO;
  const windowResults = []; // {time, speakerIdx}

  for (const frame of frames) {
    if (frame.faces.length < 2) continue;

    // Match each face to a speaker cluster
    const speakerJawOpen = speakers.map(() => 0);
    const speakerMatched = speakers.map(() => false);

    for (const face of frame.faces) {
      for (let s = 0; s < speakers.length; s++) {
        if (Math.abs(face.centerX - speakers[s].avgCenterX) < matchThreshold) {
          speakerJawOpen[s] = Math.max(speakerJawOpen[s], face.jawOpen || 0);
          speakerMatched[s] = true;
          break;
        }
      }
    }

    // The speaker with higher jawOpen is talking
    let bestIdx = 0;
    let bestJaw = -1;
    for (let s = 0; s < speakers.length; s++) {
      if (speakerMatched[s] && speakerJawOpen[s] > bestJaw) {
        bestJaw = speakerJawOpen[s];
        bestIdx = s;
      }
    }

    windowResults.push({ time: frame.time, speakerIdx: bestIdx, jawOpen: bestJaw });
  }

  if (windowResults.length === 0) return [];

  // Convert per-frame decisions to intervals (merge consecutive same-speaker)
  const intervals = [];
  let currentSpeaker = windowResults[0].speakerIdx;
  let intervalStart = windowResults[0].time;

  for (let i = 1; i < windowResults.length; i++) {
    if (windowResults[i].speakerIdx !== currentSpeaker) {
      intervals.push({
        start: intervalStart,
        end: windowResults[i].time,
        speakerIdx: currentSpeaker,
      });
      currentSpeaker = windowResults[i].speakerIdx;
      intervalStart = windowResults[i].time;
    }
  }
  // Close final interval
  intervals.push({
    start: intervalStart,
    end: windowResults[windowResults.length - 1].time + 1.5,
    speakerIdx: currentSpeaker,
  });

  // Merge very short intervals (<1s) into neighbors
  const merged = [];
  for (const iv of intervals) {
    if (iv.end - iv.start < AUDIO_MIN_INTERVAL && merged.length > 0) {
      merged[merged.length - 1].end = iv.end;
    } else {
      merged.push({ ...iv });
    }
  }

  console.log(`[Face] Mouth-based speaker detection: ${merged.length} intervals`);
  merged.forEach((iv, i) => {
    console.log(`  Turn ${i + 1}: speaker ${iv.speakerIdx} ${iv.start.toFixed(1)}s-${iv.end.toFixed(1)}s`);
  });

  return merged;
}

// ── Crop target computation ──────────────────────────────────

/**
 * Determine the crop center-X for each sampled frame.
 *
 * Strategy:
 *  - If all speakers fit inside the 9:16 crop -> center between them (stable)
 *  - Single speaker -> follow their actual per-frame position
 *  - Multiple speakers that don't fit -> pick the more active one per frame
 *    (activity = bbox area variance over a sliding window, proxy for speaking)
 */
function buildCropTargets(frames, speakers, srcWidth, srcHeight, speakerIntervals) {
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
      // Both fit — center between them, with subtle bias toward active speaker
      const midX = (leftmost + rightmost) / 2;

      if (speakerIntervals.length > 1 && speakers.length >= 2) {
        // Weighted: 70% midpoint + 30% toward active speaker
        console.log(`[Face] Both speakers fit — weighted tracking (${speakerIntervals.length} intervals)`);
        return frames
          .filter(f => f.faces.length > 0)
          .map(f => {
            const activeIdx = getActiveSpeakerAt(f.time, speakerIntervals);
            // Map speaker interval idx (0/1) to closest spatial speaker track
            const spatialIdx = (activeIdx >= 0 && activeIdx < speakers.length) ? activeIdx : 0;
            const activeCenterX = speakers[spatialIdx].avgCenterX;
            const weightedX = midX * 0.7 + activeCenterX * 0.3;
            return { time: f.time, centerX: weightedX };
          });
      }

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
  if (speakers.length >= 2 && (!speakerIntervals || speakerIntervals.length <= 1)) {
    console.warn('[Face] WARNING: 2 speakers detected but transcript has only 1 interval — falling back to area-variance');
  }
  console.log(`[Face] ${speakers.length} speakers don't fit in crop — using speaker targeting`);
  return buildMultiSpeakerTargets(frames, speakers, srcWidth, speakerIntervals);
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

function buildMultiSpeakerTargets(frames, speakers, srcWidth, speakerIntervals) {
  const matchThreshold = srcWidth * CLUSTER_THRESHOLD_RATIO;
  const keyframes = [];

  // When transcript intervals are available, use them to pick the target speaker.
  // Otherwise fall back to the area-variance heuristic.
  const useTranscript = speakerIntervals && speakerIntervals.length > 1;

  // Per-speaker sliding window of recent face areas (area-variance fallback)
  const recentAreas = useTranscript ? null : speakers.map(() => []);

  for (const frame of frames) {
    let bestIdx = 0;

    if (useTranscript) {
      // Transcript-informed: look up which speaker interval covers this frame time
      const activeIdx = getActiveSpeakerAt(frame.time, speakerIntervals);
      // Map interval speakerIdx to spatial speaker track (clamped to track count)
      bestIdx = (activeIdx >= 0 && activeIdx < speakers.length) ? activeIdx : 0;

      _lastDebugData.perFrameSelection.push({
        time: frame.time,
        method: 'transcript',
        speakerIdx: bestIdx,
        activeSpeakerFromTranscript: activeIdx,
        areaVariances: null,
      });
    } else {
      // Fallback: area-variance heuristic (original behaviour)
      for (let s = 0; s < speakers.length; s++) {
        const matchedFace = frame.faces.find(f =>
          Math.abs(f.centerX - speakers[s].avgCenterX) < matchThreshold
        );
        if (matchedFace) {
          recentAreas[s].push(matchedFace.area);
          if (recentAreas[s].length > ACTIVITY_WINDOW) recentAreas[s].shift();
        }
      }

      let bestActivity = -1;
      for (let s = 0; s < speakers.length; s++) {
        if (recentAreas[s].length < 2) continue;
        const activity = arrayVariance(recentAreas[s]);
        if (activity > bestActivity) {
          bestActivity = activity;
          bestIdx = s;
        }
      }

      _lastDebugData.perFrameSelection.push({
        time: frame.time,
        method: 'area-variance',
        speakerIdx: bestIdx,
        activeSpeakerFromTranscript: -1,
        areaVariances: recentAreas.map(a => a.length >= 2 ? arrayVariance(a) : 0),
      });
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

  // Fix: detect when area-variance heuristic gets stuck on one speaker
  if (speakers.length >= 2) {
    const speakerCounts = new Map();
    for (const kf of keyframes) {
      let closestIdx = 0;
      let closestDist = Infinity;
      for (let s = 0; s < speakers.length; s++) {
        const dist = Math.abs(kf.centerX - speakers[s].avgCenterX);
        if (dist < closestDist) { closestDist = dist; closestIdx = s; }
      }
      speakerCounts.set(closestIdx, (speakerCounts.get(closestIdx) || 0) + 1);
    }

    const maxCount = Math.max(...speakerCounts.values());
    const dominantRatio = maxCount / keyframes.length;

    if (dominantRatio > 0.8) {
      console.warn(`[Face] Speaker selection stuck: ${(dominantRatio * 100).toFixed(0)}% on one speaker — using transcript-aware alternation`);

      if (speakerIntervals && speakerIntervals.length > 1) {
        // Use transcript intervals to drive speaker switching
        for (let i = 0; i < keyframes.length; i++) {
          const activeIdx = getActiveSpeakerAt(keyframes[i].time, speakerIntervals);
          const targetSpeaker = (activeIdx >= 0 && activeIdx < speakers.length) ? activeIdx : 0;
          keyframes[i].centerX = speakers[targetSpeaker].avgCenterX;
        }
      } else {
        // No useful transcript — alternate every 5 seconds
        const ALTERNATE_INTERVAL = 5.0;
        for (let i = 0; i < keyframes.length; i++) {
          const cyclePos = Math.floor(keyframes[i].time / ALTERNATE_INTERVAL);
          const targetSpeaker = cyclePos % speakers.length;
          keyframes[i].centerX = speakers[targetSpeaker].avgCenterX;
        }
      }

      console.log(`[Face] After alternation fix, centerX values: [${keyframes.map(k => Math.round(k.centerX)).join(', ')}]`);
    }
  }

  return keyframes;
}

// ── Public: face keyframe detection ──────────────────────────

/**
 * Sample frames across a video segment and detect face positions.
 *
 * @param {File|Blob} videoFile
 * @param {number}    startTime - segment start (seconds)
 * @param {number}    duration  - segment length (seconds)
 * @param {Array<{word: string, start: number, end: number}>} [words]
 *   Optional word-level timing from transcript (absolute seconds).
 * @returns {Promise<Array<{time: number, centerX: number}>>}
 *   Keyframes with face center-X in source-pixel coords.
 *   `time` is relative to segment start (0 ... duration).
 *   Empty array if detection is unavailable or finds nothing.
 */
export async function detectFaceKeyframes(videoFile, startTime, duration, words) {
  // Reset debug data for this run
  _lastDebugData = {
    detectionMethod: null,
    frames: [],
    speakers: [],
    speakerIntervals: [],
    perFrameSelection: [],
    rawKeyframes: [],
    flatDetection: false,
    transcriptOverrideApplied: false,
    smoothingStages: null,
    cropFilter: null,
    audioEnergyCount: 0,
    audioVisualIntervals: [],
    speakerDetectionMethod: 'none',
    mouthIntervals: [],
    hasJawOpenData: false,
  };

  // Infer speaker intervals from transcript (used in both face + canvas paths)
  const speakerIntervals = inferActiveSpeakerFromTranscript(words, startTime, duration);
  _lastDebugData.speakerIntervals = speakerIntervals;

  let frames, srcWidth, srcHeight;

  // Detection cascade: MediaPipe → BlazeFace → Shape Detection API → Canvas zones
  let result = null;

  // 1. Try MediaPipe Face Landmarker (best — has jawOpen blendshape)
  result = await sampleWithMediaPipe(videoFile, startTime, duration);
  if (result && result.frames.length > 0) {
    _lastDebugData.detectionMethod = 'mediapipe';
  }

  // 2. Try BlazeFace (TensorFlow.js ML fallback)
  if (!result || result.frames.length === 0) {
    console.log('[Face] MediaPipe unavailable — trying BlazeFace');
    result = await sampleWithBlazeFace(videoFile, startTime, duration);
    if (result && result.frames.length > 0) {
      _lastDebugData.detectionMethod = 'blazeface';
    }
  }

  // 3. Try Shape Detection API
  if (!result || result.frames.length === 0) {
    console.log('[Face] BlazeFace unavailable — trying Shape Detection API');
    result = await sampleWithShapeDetection(videoFile, startTime, duration);
    if (result && result.frames.length > 0) {
      _lastDebugData.detectionMethod = 'shape-detection';
    }
  }

  // 4. Fall back to canvas zone analysis
  if (!result || result.frames.length === 0) {
    console.log('[Face] Falling back to canvas zone analysis');
    result = await sampleFrameZones(videoFile, startTime, duration);
    _lastDebugData.detectionMethod = 'canvas-zones';
  }

  ({ frames, srcWidth, srcHeight } = result);

  const hasJawOpenData = _lastDebugData.detectionMethod === 'mediapipe';
  _lastDebugData.hasJawOpenData = hasJawOpenData;

  // Record per-frame detection data
  _lastDebugData.frames = frames.map(f => ({
    time: f.time,
    faceCount: f.faces.length,
    faces: f.faces.map(face => ({
      centerX: Math.round(face.centerX),
      width: Math.round(face.width),
      area: Math.round(face.area),
      jawOpen: face.jawOpen ?? null,
      isTalking: face.isTalking ?? null,
    })),
  }));

  if (!frames.length || srcWidth === 0) return { keyframes: [], effectiveIntervals: speakerIntervals };

  const framesWithFaces = frames.filter(f => f.faces.length > 0);
  if (framesWithFaces.length === 0) {
    console.log('[Face] No faces/zones detected in any sampled frame');

    // Transcript-only fallback: if we have speaker intervals and know the source
    // dimensions, create synthetic keyframes that pan between speaker positions.
    // This is better than static center crop when speakers alternate.
    if (speakerIntervals.length > 1 && srcWidth > 0) {
      const cropW = Math.round((srcHeight || 1080) * 9 / 16);
      const maxX = srcWidth - cropW;
      if (maxX > 0) {
        // Place speaker 0 at ~33% of frame, speaker 1 at ~66%
        const positions = [
          Math.round(srcWidth * 0.33),
          Math.round(srcWidth * 0.66),
        ];
        const transcriptKeyframes = buildDenseTranscriptKeyframes(speakerIntervals, positions, duration);
        console.log(`[Face] Transcript-only fallback: ${transcriptKeyframes.length} keyframes from ${speakerIntervals.length} speaker intervals, positions=[${positions.join(',')}]`);
        return { keyframes: transcriptKeyframes, effectiveIntervals: speakerIntervals };
      }
    }

    return { keyframes: [], effectiveIntervals: speakerIntervals };
  }

  // Cluster faces into speaker tracks
  const speakers = clusterSpeakers(frames, srcWidth);
  if (speakers.length === 0) {
    console.log('[Face] No consistent speaker tracks found');
    // Don't give up yet — audio may still indicate multiple speakers (handled below)
  }

  // ── Extract audio energy and detect speaking turns ──
  // Run on EVERY clip — audio turn detection is the most reliable multi-speaker signal
  let audioEnergy = [];
  let audioTurns = [];
  try {
    audioEnergy = await extractAudioEnergy(videoFile, startTime, duration);
    _lastDebugData.audioEnergyCount = audioEnergy.length;

    if (audioEnergy.length > 0) {
      audioTurns = detectSpeakingTurns(audioEnergy);
      _lastDebugData.audioTurns = audioTurns;
    }
  } catch (err) {
    console.warn('[Audio] Energy extraction failed:', err.message);
    _lastDebugData.audioEnergyCount = 0;
    _lastDebugData.audioTurns = [];
  }

  // ── MediaPipe mouth-based speaker detection (preferred when available) ──
  let mouthIntervals = [];
  if (hasJawOpenData && speakers.length >= 2) {
    mouthIntervals = detectSpeakerFromMouth(frames, speakers, srcWidth);
    _lastDebugData.mouthIntervals = mouthIntervals;
    if (mouthIntervals.length >= 2) {
      console.log(`[Face] MediaPipe jawOpen detected ${mouthIntervals.length} speaker intervals`);
    }
  }

  // ── Determine speaker count from all available signals ──
  const likelySpeakerCount = Math.max(
    speakers.length,
    mouthIntervals.length >= 2 ? 2 : 0,
    audioTurns.length >= 2 ? 2 : 0,
    speakerIntervals.length >= 2 ? 2 : 0
  );

  // ── Determine speaker positions and intervals using best available data ──
  let speakerPositions = []; // [{centerX, speakerIdx}]
  let effectiveIntervals = speakerIntervals;
  let speakerDetectionMethod = speakerIntervals.length > 1 ? 'transcript' : 'none';

  if (likelySpeakerCount >= 2) {
    // We believe there are 2 speakers based on SOME signal

    if (speakers.length >= 2) {
      // Best case: face detection found both faces
      speakerPositions = speakers.map((s, i) => ({ centerX: s.avgCenterX, speakerIdx: i }));
      console.log(`[Face] Using ${speakers.length} detected face positions`);
    } else if (speakers.length === 1) {
      // One face detected — synthesize the other
      const detected = speakers[0];
      const isRight = detected.avgCenterX > srcWidth / 2;
      const syntheticX = isRight ? srcWidth * 0.33 : srcWidth * 0.67;

      speakerPositions = isRight
        ? [{ centerX: syntheticX, speakerIdx: 0 }, { centerX: detected.avgCenterX, speakerIdx: 1 }]
        : [{ centerX: detected.avgCenterX, speakerIdx: 0 }, { centerX: syntheticX, speakerIdx: 1 }];

      // Add synthesized speaker to speakers array for downstream buildCropTargets
      speakers.push({
        avgCenterX: syntheticX,
        centerXs: [syntheticX],
        areas: detected.areas,
        frameTimes: detected.frameTimes,
        activityScore: 0,
      });
      speakers.sort((a, b) => a.avgCenterX - b.avgCenterX);

      console.log(`[Face] 1 face at ${Math.round(detected.avgCenterX)}, synthesized 2nd at ${Math.round(syntheticX)}`);
    } else {
      // No faces detected — place speakers at standard positions
      speakerPositions = [
        { centerX: srcWidth * 0.33, speakerIdx: 0 },
        { centerX: srcWidth * 0.67, speakerIdx: 1 },
      ];
      console.log(`[Face] No faces detected, using default positions [${Math.round(srcWidth * 0.33)}, ${Math.round(srcWidth * 0.67)}]`);
    }

    // Choose best available intervals for timing (mouth > audio > transcript)
    if (mouthIntervals.length >= 2) {
      effectiveIntervals = mouthIntervals;
      speakerDetectionMethod = 'mediapipe-mouth';
      console.log(`[Face] Using MediaPipe jawOpen speaker detection (${mouthIntervals.length} intervals)`);
    } else if (audioTurns.length >= 2) {
      effectiveIntervals = audioTurns;
      speakerDetectionMethod = 'audio-turns';
      console.log(`[Face] Using audio-detected speaking turns (${audioTurns.length} intervals)`);
    } else if (speakerIntervals.length >= 2) {
      effectiveIntervals = speakerIntervals;
      speakerDetectionMethod = 'transcript';
      console.log(`[Face] Using transcript intervals (${speakerIntervals.length} intervals)`);
    }

    // Build keyframes from positions + intervals when we have both
    if (effectiveIntervals.length >= 2 && speakerPositions.length >= 2) {
      const positions = speakerPositions
        .sort((a, b) => a.speakerIdx - b.speakerIdx)
        .map(sp => sp.centerX);
      const keyframes = buildDenseTranscriptKeyframes(effectiveIntervals, positions, duration);
      console.log(`[Face] Built ${keyframes.length} keyframes from ${effectiveIntervals.length} intervals`);

      // Record debug data
      _lastDebugData.speakerDetectionMethod = speakerDetectionMethod;
      _lastDebugData.audioTurns = audioTurns;
      _lastDebugData.speakerPositions = speakerPositions;
      _lastDebugData.speakers = speakers.map(s => ({
        avgCenterX: Math.round(s.avgCenterX),
        frameCount: s.frameTimes.length,
        activityScore: s.activityScore,
      }));
      _lastDebugData.rawKeyframes = keyframes.map(t => ({
        time: t.time,
        centerX: Math.round(t.centerX),
      }));

      // Diagnostic
      console.log(`[Face] Speaker positions: [${positions.map(p => Math.round(p)).join(', ')}]`);
      console.log(`[Face] Crop target centerX range: ${Math.round(Math.min(...keyframes.map(k => k.centerX)))}-${Math.round(Math.max(...keyframes.map(k => k.centerX)))} (srcWidth=${srcWidth})`);

      return { keyframes, effectiveIntervals };
    }
  }

  // ── Fall through: single speaker or no speaker changes detected ──
  // Use existing face-tracking logic (buildCropTargets etc.)

  if (speakers.length === 0) {
    console.log('[Face] No consistent speaker tracks and no multi-speaker signal');
    return { keyframes: [], effectiveIntervals: speakerIntervals };
  }

  // Record speaker data
  _lastDebugData.speakers = speakers.map(s => ({
    avgCenterX: Math.round(s.avgCenterX),
    frameCount: s.frameTimes.length,
    activityScore: s.activityScore,
  }));

  // Speaker correlation (when we have 2+ face clusters)
  if (speakers.length >= 2) {
    // Prefer mouth-based detection if MediaPipe data available
    if (hasJawOpenData && mouthIntervals.length >= 2) {
      _lastDebugData.audioVisualIntervals = mouthIntervals;
      effectiveIntervals = mouthIntervals;
      speakerDetectionMethod = 'mediapipe-mouth';
      console.log(`[Face] Using mouth-based speaker detection (${mouthIntervals.length} intervals)`);
    } else if (audioEnergy.length > 0) {
      const avIntervals = correlateAudioWithFaces(audioEnergy, frames, speakers, srcWidth);
      _lastDebugData.audioVisualIntervals = avIntervals;

      if (avIntervals.length >= 2) {
        effectiveIntervals = avIntervals;
        speakerDetectionMethod = 'audio-visual';
        console.log(`[Face] Using audio-visual speaker detection (${avIntervals.length} intervals)`);
      } else {
        console.log('[Face] Audio-visual correlation produced < 2 intervals, using fallback');
      }
    }
  }

  _lastDebugData.speakerDetectionMethod = speakerDetectionMethod;

  // Build per-frame crop targets (with best available speaker intervals)
  let targets = buildCropTargets(frames, speakers, srcWidth, srcHeight, effectiveIntervals);
  if (targets.length === 0) return { keyframes: [], effectiveIntervals };

  // Record raw keyframes before any override
  _lastDebugData.rawKeyframes = targets.map(t => ({
    time: t.time,
    centerX: Math.round(t.centerX),
  }));

  // Check flat detection before override
  const cropW = Math.round(srcHeight * 9 / 16);
  _lastDebugData.flatDetection = isDetectionFlat(targets, cropW);

  // Override flat detection with transcript-driven keyframes
  const preOverrideLen = targets.length;
  targets = mergeTranscriptOverride(targets, effectiveIntervals, srcWidth, srcHeight, duration);
  _lastDebugData.transcriptOverrideApplied = targets.length !== preOverrideLen || _lastDebugData.flatDetection;

  // Diagnostic: show speaker positions and crop target range
  const centerXs = targets.map(t => t.centerX);
  const minCX = Math.round(Math.min(...centerXs));
  const maxCX = Math.round(Math.max(...centerXs));
  console.log(`[Face] ${speakers.length} speaker(s), ${targets.length} keyframes from ${frames.length} samples`);
  console.log(`[Face] Speaker avgX positions: [${speakers.map(s => Math.round(s.avgCenterX)).join(', ')}]`);
  console.log(`[Face] Crop target centerX range: ${minCX}-${maxCX} (srcWidth=${srcWidth})`);
  return { keyframes: targets, effectiveIntervals };
}

// ── Flat detection override ───────────────────────────────────

/**
 * Check whether face/zone detection produced "flat" data — most keyframes
 * land at the same horizontal position.  This happens in static talking-head
 * interviews where the canvas zone analysis can't distinguish speakers.
 */
function isDetectionFlat(keyframes, cropW) {
  if (keyframes.length < 3) return false;
  const tolerance = Math.max(cropW * DEAD_ZONE_RATIO, 15);
  const buckets = new Map();
  for (const kf of keyframes) {
    const rounded = Math.round(kf.centerX / tolerance) * tolerance;
    buckets.set(rounded, (buckets.get(rounded) || 0) + 1);
  }
  const maxCount = Math.max(...buckets.values());
  const ratio = maxCount / keyframes.length;
  const flat = ratio >= FLAT_DETECTION_RATIO;
  if (flat) {
    console.log(`[Face] Detection is FLAT: ${maxCount}/${keyframes.length} keyframes (${(ratio * 100).toFixed(0)}%) share the same position — transcript override will be used`);
  }
  return flat;
}

/**
 * When face/zone detection is spatially flat (same position for most frames)
 * but transcript has multiple speaker intervals, replace the detection
 * keyframes entirely with transcript-driven positions at 33% and 66% of
 * the source width.
 */
function mergeTranscriptOverride(detectionKeyframes, speakerIntervals, srcWidth, srcHeight, duration) {
  const cropW = Math.round(srcHeight * 9 / 16);
  if (!speakerIntervals || speakerIntervals.length < 2) return detectionKeyframes;

  if (!isDetectionFlat(detectionKeyframes, cropW)) {
    console.log('[Face] Detection has spatial diversity — using detection keyframes');
    return detectionKeyframes;
  }

  const positions = [Math.round(srcWidth * 0.33), Math.round(srcWidth * 0.66)];
  const transcriptKeyframes = buildDenseTranscriptKeyframes(speakerIntervals, positions, duration);
  console.log(`[Face] Transcript override: replaced ${detectionKeyframes.length} flat keyframes with ${transcriptKeyframes.length} transcript-driven keyframes`);
  console.log(`[Face] Speaker positions: [${positions.join(', ')}], intervals: ${speakerIntervals.length}`);
  return transcriptKeyframes;
}

// ── Dense transcript fallback keyframe generation ────────────

/**
 * Build dense keyframes around speaker-change boundaries for the
 * transcript-only fallback path (no face/zone data available).
 *
 * Instead of 3 sparse keyframes per interval, generates:
 *  - A "hold" keyframe at the end of the previous speaker's turn
 *  - A dense ramp of 4-6 keyframes across a short transition window
 *  - A "settle" keyframe shortly after the ramp completes
 *
 * This gives FFmpeg enough interpolation points for a smooth ease
 * instead of a single linear jump.
 *
 * @param {Array<{start: number, end: number, speakerIdx: number}>} intervals
 * @param {number[]} positions - centerX for each speaker index
 * @param {number} duration - total segment duration
 * @returns {Array<{time: number, centerX: number}>}
 */
function buildDenseTranscriptKeyframes(intervals, positions, duration) {
  const keyframes = [];
  /** Transition window duration in seconds */
  const TRANSITION_WINDOW = 0.35;
  /** Number of intermediate keyframes within the transition window */
  const TRANSITION_STEPS = 5;

  for (let i = 0; i < intervals.length; i++) {
    const iv = intervals[i];
    const idx = Math.min(iv.speakerIdx, positions.length - 1);
    const targetX = positions[idx];

    if (i === 0) {
      // First interval: hold from start
      keyframes.push({ time: Math.max(iv.start, 0), centerX: targetX });
    }

    if (i > 0) {
      const prevIdx = Math.min(intervals[i - 1].speakerIdx, positions.length - 1);
      const prevX = positions[prevIdx];

      // Pre-transition hold: lock old position up to boundary
      const boundary = iv.start;
      const holdTime = Math.max(boundary - 0.05, intervals[i - 1].start + 0.05);
      keyframes.push({ time: holdTime, centerX: prevX });

      // Dense ramp across the transition window using eased steps
      const rampEnd = Math.min(boundary + TRANSITION_WINDOW, iv.end - 0.05);
      for (let s = 0; s <= TRANSITION_STEPS; s++) {
        const tNorm = s / TRANSITION_STEPS;
        const eased = easeInOutCubic(tNorm);
        const interpX = prevX + (targetX - prevX) * eased;
        const time = boundary + (rampEnd - boundary) * tNorm;
        keyframes.push({ time, centerX: Math.round(interpX) });
      }
    }

    // Mid-hold and end-hold to stabilize during the interval
    const midTime = (iv.start + iv.end) / 2;
    if (midTime > iv.start + 0.3 && midTime < iv.end - 0.1) {
      keyframes.push({ time: midTime, centerX: targetX });
    }
    keyframes.push({ time: Math.min(iv.end, duration), centerX: targetX });
  }

  // Deduplicate by time (keep last value at each time)
  keyframes.sort((a, b) => a.time - b.time);
  const deduped = [keyframes[0]];
  for (let i = 1; i < keyframes.length; i++) {
    if (Math.abs(keyframes[i].time - deduped[deduped.length - 1].time) < 0.01) {
      deduped[deduped.length - 1] = keyframes[i]; // overwrite with latest
    } else {
      deduped.push(keyframes[i]);
    }
  }

  return deduped;
}

// ── FFmpeg crop filter builder ───────────────────────────────

/**
 * Build an FFmpeg -vf filter string for face-centered vertical crop.
 *
 * When keyframes exist, generates a piecewise-linear expression for the
 * crop X position so the crop window smoothly follows the face across time.
 *
 * Smoothing pipeline:
 *  1. Convert face centerX -> crop X (face centered in crop window)
 *  2. Hysteresis filter (ignore jitter, allow real moves)
 *  3. Adaptive-rate hold filter (short for speaker changes, longer for drift)
 *  4. Adaptive EMA (fast alpha near speaker changes, slow otherwise)
 *  5. Velocity clamping to prevent jumps faster than MAX_PAN_PX_PER_SEC
 *  6. Deduplicate + cap keyframe count
 *  7. Build piecewise-eased FFmpeg expression
 *
 * @param {Array}  keyframes  - from detectFaceKeyframes()
 * @param {number} srcWidth   - source video width in pixels
 * @param {number} srcHeight  - source video height in pixels
 * @param {Array}  [speakerIntervals] - from inferActiveSpeakerFromTranscript()
 * @returns {string|null}
 *   FFmpeg -vf filter string, or null if no face data / not applicable
 *   (caller should fall back to default center crop).
 */
export function buildCropFilter(keyframes, srcWidth, srcHeight, speakerIntervals) {
  const cropW = Math.round(srcHeight * 9 / 16);
  const maxX = srcWidth - cropW;

  // Source is already narrower than or equal to 9:16 — no horizontal crop needed
  if (maxX <= 0) return null;

  // No face keyframes — fall back to center crop
  if (!keyframes.length) return null;

  // Step 1: Convert face centerX -> crop X (face centered in the crop window)
  const rawPositions = keyframes.map(kf => ({
    time: kf.time,
    cropX: clamp(Math.round(kf.centerX - cropW / 2), 0, maxX),
  }));

  rawPositions.sort((a, b) => a.time - b.time);

  console.log(`[Crop] Raw targets: ${rawPositions.length} positions`);
  rawPositions.slice(0, 10).forEach((p, i) => {
    console.log(`  [${i}] t=${p.time.toFixed(2)}s, cropX=${p.cropX}`);
  });

  // ── Step 2: Hysteresis filter ──
  // Instead of hard shot quantization, use hysteresis: a new target must exceed
  // HYSTERESIS_RATIO to *initiate* a move, but once moving, the real target
  // position passes through (no zone snapping).
  const hysteresisThreshold = cropW * HYSTERESIS_RATIO;
  const deadZone = cropW * DEAD_ZONE_RATIO;
  const hysteresisFiltered = [rawPositions[0]];
  let isMoving = false;  // Are we currently in a transition?
  let anchorX = rawPositions[0].cropX;  // The locked position when stationary

  for (let i = 1; i < rawPositions.length; i++) {
    const requested = rawPositions[i].cropX;
    const distFromAnchor = Math.abs(requested - anchorX);
    const movement = classifyMovement(distFromAnchor, cropW);

    if (movement === 'jitter') {
      // Sub-pixel noise: hold the anchor
      hysteresisFiltered.push({ time: rawPositions[i].time, cropX: anchorX });
    } else if (!isMoving && distFromAnchor < hysteresisThreshold) {
      // Not moving yet and below hysteresis threshold: hold
      hysteresisFiltered.push({ time: rawPositions[i].time, cropX: anchorX });
    } else {
      // Either already moving OR exceeded hysteresis threshold — let it through
      isMoving = true;
      hysteresisFiltered.push({ time: rawPositions[i].time, cropX: requested });

      // Check if we've settled: if the last 2 accepted positions are within
      // dead zone of each other, lock a new anchor
      if (hysteresisFiltered.length >= 2) {
        const prev = hysteresisFiltered[hysteresisFiltered.length - 2].cropX;
        if (Math.abs(requested - prev) < deadZone) {
          isMoving = false;
          anchorX = requested;
        }
      }
    }
  }

  // ── Step 3: Adaptive hold-time filter ──
  // Short hold time near speaker changes, longer hold otherwise.
  const holdFiltered = [hysteresisFiltered[0]];
  let lastChangeTime = hysteresisFiltered[0].time;
  let lastChangeCropX = hysteresisFiltered[0].cropX;

  for (let i = 1; i < hysteresisFiltered.length; i++) {
    const current = hysteresisFiltered[i];
    const timeSinceChange = current.time - lastChangeTime;
    const distance = Math.abs(current.cropX - lastChangeCropX);
    const movement = classifyMovement(distance, cropW);

    // Determine effective hold time based on movement type and proximity to
    // a known speaker-change boundary
    let effectiveHoldTime = MIN_HOLD_TIME;
    if (movement === 'switch') {
      // Large movement (likely speaker change) — use shorter hold
      effectiveHoldTime = MIN_HOLD_TIME * 0.4; // ~0.24s
    }
    // If we have transcript data, check proximity to a speaker boundary
    const boundary = nearestSpeakerChange(current.time, speakerIntervals);
    if (boundary && boundary.distance < 0.5) {
      // Near a known speaker change — allow faster response
      effectiveHoldTime = Math.min(effectiveHoldTime, 0.2);
    }

    if (distance > 0 && timeSinceChange >= effectiveHoldTime) {
      holdFiltered.push(current);
      lastChangeTime = current.time;
      lastChangeCropX = current.cropX;
    } else if (distance > 0) {
      holdFiltered.push({ time: current.time, cropX: lastChangeCropX });
    } else {
      holdFiltered.push({ time: current.time, cropX: lastChangeCropX });
    }
  }

  // Diagnostic: log transitions after hold filter
  const transitions = [];
  for (let i = 1; i < holdFiltered.length; i++) {
    if (holdFiltered[i].cropX !== holdFiltered[i - 1].cropX) {
      transitions.push({
        from: holdFiltered[i - 1].cropX,
        to: holdFiltered[i].cropX,
        startTime: holdFiltered[i - 1].time,
        endTime: holdFiltered[i].time,
        duration: holdFiltered[i].time - holdFiltered[i - 1].time,
        distance: Math.abs(holdFiltered[i].cropX - holdFiltered[i - 1].cropX)
      });
    }
  }
  console.log(`[Crop] Stabilized targets: ${holdFiltered.length} positions, ${transitions.length} transitions`);
  transitions.forEach((t, i) => {
    console.log(`  Transition ${i + 1}: ${t.from} -> ${t.to} over ${t.duration.toFixed(2)}s (${Math.round(t.distance)}px)`);
  });

  // Step 4: Merge consecutive targets within 3% of crop width (noise collapse)
  const mergeThreshold = cropW * 0.03;
  const merged = [holdFiltered[0]];
  for (let i = 1; i < holdFiltered.length; i++) {
    if (Math.abs(holdFiltered[i].cropX - merged[merged.length - 1].cropX) < mergeThreshold) {
      merged.push({ time: holdFiltered[i].time, cropX: merged[merged.length - 1].cropX });
    } else {
      merged.push(holdFiltered[i]);
    }
  }

  // Step 5: Adaptive EMA smoothing
  // Near speaker-change boundaries -> fast alpha (responsive)
  // During stable hold -> slow alpha (smooth)
  const emaSmoothed = [merged[0]];
  for (let i = 1; i < merged.length; i++) {
    const prev = emaSmoothed[i - 1];
    const rawX = merged[i].cropX;
    const distance = Math.abs(rawX - prev.cropX);
    const movement = classifyMovement(distance, cropW);

    // Pick alpha based on movement magnitude and speaker-change proximity
    let alpha = SMOOTH_ALPHA_SLOW;
    if (movement === 'switch') {
      alpha = SMOOTH_ALPHA_FAST; // Snap toward new speaker
    } else if (movement === 'drift') {
      // Check if near a speaker boundary
      const boundary = nearestSpeakerChange(merged[i].time, speakerIntervals);
      if (boundary && boundary.distance < 0.8) {
        alpha = SMOOTH_ALPHA_FAST * 0.8; // Moderately fast near boundaries
      } else {
        alpha = (SMOOTH_ALPHA_SLOW + SMOOTH_ALPHA_FAST) / 2; // Medium
      }
    }

    const smoothedX = alpha * rawX + (1 - alpha) * prev.cropX;
    emaSmoothed.push({
      time: merged[i].time,
      cropX: clamp(Math.round(smoothedX), 0, maxX),
    });
  }

  // Step 6: Velocity clamping — limit how fast the crop can pan
  const velocityClamped = [emaSmoothed[0]];
  for (let i = 1; i < emaSmoothed.length; i++) {
    const dt = emaSmoothed[i].time - emaSmoothed[i - 1].time;
    const prev = velocityClamped[i - 1];
    if (dt > 0) {
      const maxDelta = MAX_PAN_PX_PER_SEC * dt;
      const delta = emaSmoothed[i].cropX - prev.cropX;
      const clamped = Math.abs(delta) > maxDelta
        ? prev.cropX + Math.sign(delta) * maxDelta
        : emaSmoothed[i].cropX;
      velocityClamped.push({
        time: emaSmoothed[i].time,
        cropX: clamp(Math.round(clamped), 0, maxX),
      });
    } else {
      velocityClamped.push({ ...emaSmoothed[i] });
    }
  }

  // Step 7: Cap keyframe count — deduplicate then merge closest pairs if over limit
  // First, deduplicate consecutive keyframes with the same cropX
  let smoothed = [velocityClamped[0]];
  for (let i = 1; i < velocityClamped.length; i++) {
    if (velocityClamped[i].cropX !== smoothed[smoothed.length - 1].cropX) {
      smoothed.push(velocityClamped[i]);
    }
  }
  // Keep last keyframe to hold final position
  if (smoothed[smoothed.length - 1].time !== velocityClamped[velocityClamped.length - 1].time) {
    smoothed.push(velocityClamped[velocityClamped.length - 1]);
  }

  // If still over limit, iteratively merge the two closest keyframes
  while (smoothed.length > MAX_EXPRESSION_KEYFRAMES) {
    let minDist = Infinity;
    let minIdx = 1;
    for (let i = 1; i < smoothed.length - 1; i++) {
      const dist = Math.abs(smoothed[i].cropX - smoothed[i - 1].cropX);
      if (dist < minDist) { minDist = dist; minIdx = i; }
    }
    smoothed.splice(minIdx, 1);
  }

  // Record all smoothing stages for debug
  _lastDebugData.smoothingStages = {
    raw: rawPositions.map(p => ({ time: p.time, cropX: p.cropX })),
    afterHysteresis: hysteresisFiltered.map(p => ({ time: p.time, cropX: p.cropX })),
    afterHold: holdFiltered.map(p => ({ time: p.time, cropX: p.cropX })),
    afterEMA: emaSmoothed.map(p => ({ time: p.time, cropX: p.cropX })),
    afterVelocity: velocityClamped.map(p => ({ time: p.time, cropX: p.cropX })),
    final: smoothed.map(p => ({ time: p.time, cropX: p.cropX })),
  };

  // Diagnostic: show smoothing pipeline results
  const rawRange = `${Math.min(...rawPositions.map(p => p.cropX))}-${Math.max(...rawPositions.map(p => p.cropX))}`;
  const smoothedRange = `${Math.min(...smoothed.map(p => p.cropX))}-${Math.max(...smoothed.map(p => p.cropX))}`;
  console.log(`[Face] buildCropFilter: ${rawPositions.length} raw positions (cropX range ${rawRange}), ${smoothed.length} smoothed keyframes (cropX range ${smoothedRange}), maxX=${maxX}, cropW=${cropW}`);

  // Single keyframe -> static face-centered crop
  if (smoothed.length === 1) {
    const filter = `crop=${cropW}:${srcHeight}:${smoothed[0].cropX}:0,scale=1080:1920`;
    _lastDebugData.cropFilter = filter;
    console.log(`[Face] Static crop filter: ${filter}`);
    return filter;
  }

  // Multiple keyframes -> piecewise-eased FFmpeg expression for smooth pan
  //
  // FFmpeg filtergraph escaping: commas inside a filter parameter must be
  // written as \, so they aren't mistaken for filter-chain separators.
  const E = '\\,'; // escaped comma

  /**
   * Generate eased interpolation expression for FFmpeg.
   * Uses cubic ease-in-out approximation: smoothstep-like curve.
   * Speaker switches get a time-warped smoothstep for faster departure.
   * @param {number} fromX - Start position
   * @param {number} toX - End position
   * @param {number} startTime - Start time
   * @param {number} endTime - End time
   * @param {boolean} isSpeakerSwitch - Whether this is a large speaker-change move
   * @returns {string} FFmpeg expression for eased interpolation
   */
  function buildEasedExpression(fromX, toX, startTime, endTime, isSpeakerSwitch) {
    const dt = endTime - startTime;
    if (dt <= 0) return String(toX);

    const delta = toX - fromX;
    // Normalized time: 0 to 1 over the transition duration
    const tNorm = `(t-${startTime.toFixed(3)})/${dt.toFixed(4)}`;

    // Clamp to [0,1]
    const tClamped = `max(0${E}min(1${E}${tNorm}))`;

    if (isSpeakerSwitch) {
      // Speaker switch: time-warp with sqrt for faster departure, gentle arrival
      // ease(t) = sqrt(t)^2 * (3 - 2*sqrt(t)) — front-loaded movement
      const tWarped = `sqrt(${tClamped})`;
      const tSquared = `(${tWarped})*(${tWarped})`;
      const ease = `${tSquared}*(3-2*${tWarped})`;
      return `${fromX}+${delta}*${ease}`;
    } else {
      // Standard smoothstep: t^2 * (3 - 2*t)
      const tSquared = `(${tClamped})*(${tClamped})`;
      const ease = `${tSquared}*(3-2*${tClamped})`;
      return `${fromX}+${delta}*${ease}`;
    }
  }

  // Build nested if() expression from the end backwards
  let expr = String(smoothed[smoothed.length - 1].cropX);

  const filterTransitions = [];
  for (let i = smoothed.length - 2; i >= 0; i--) {
    const curr = smoothed[i];
    const next = smoothed[i + 1];
    const dt = next.time - curr.time;
    if (dt <= 0) continue;

    const distance = Math.abs(next.cropX - curr.cropX);
    const isSpeakerSwitch = classifyMovement(distance, cropW) === 'switch';
    const useEasing = dt >= MIN_TRANSITION_DURATION;

    // Use eased interpolation for transitions >= MIN_TRANSITION_DURATION, linear for very short ones
    let lerp;
    if (useEasing) {
      lerp = buildEasedExpression(curr.cropX, next.cropX, curr.time, next.time, isSpeakerSwitch);
    } else {
      // Very short transitions: use linear to avoid expression complexity
      const slope = (next.cropX - curr.cropX) / dt;
      const absSlope = Math.abs(slope).toFixed(4);
      const sign = slope >= 0 ? '+' : '-';
      lerp = `${curr.cropX}${sign}${absSlope}*(t-${curr.time.toFixed(3)})`;
    }

    expr = `if(lt(t${E}${next.time.toFixed(3)})${E}${lerp}${E}${expr})`;

    filterTransitions.push({
      from: curr.cropX,
      to: next.cropX,
      startTime: curr.time,
      endTime: next.time,
      duration: dt,
      distance: distance,
      easing: useEasing,
      speakerSwitch: isSpeakerSwitch,
    });
  }

  // Hold first keyframe's position for frames before the first sample
  expr = `if(lt(t${E}${smoothed[0].time.toFixed(3)})${E}${smoothed[0].cropX}${E}${expr})`;

  // Clamp to valid pixel range
  expr = `max(0${E}min(${maxX}${E}${expr}))`;

  const filter = `crop=${cropW}:${srcHeight}:${expr}:0,scale=1080:1920`;
  _lastDebugData.cropFilter = filter;

  // Final logging
  console.log(`[Crop] Final crop filter (${smoothed.length} keyframes):`);
  console.log(`  Keyframes: [${smoothed.map(s => `${s.cropX}@${s.time.toFixed(1)}s`).join(', ')}]`);
  console.log(`  Transitions: ${filterTransitions.length}`);
  filterTransitions.forEach((t, i) => {
    const easingStr = t.easing ? (t.speakerSwitch ? 'eased-fast' : 'eased') : 'linear';
    console.log(`    ${i + 1}. ${t.from} -> ${t.to} over ${t.duration.toFixed(2)}s (${Math.round(t.distance)}px, ${easingStr})`);
  });
  console.log(`[Crop] Final filter string (first 400 chars): ${filter.substring(0, 400)}${filter.length > 400 ? '...' : ''}`);

  return filter;
}
