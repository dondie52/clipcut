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
const MAX_PAN_PX_PER_SEC = 400; // Reduced for smoother, more intentional movement

/** EMA smoothing factor (lower = smoother but laggier, higher = more responsive) */
const SMOOTH_ALPHA = 0.35; // Reduced for smoother motion

/** Minimum time (seconds) to hold a crop target before allowing another switch */
const MIN_HOLD_TIME = 1.2; // Increased for shot stabilization - prevents rapid oscillation

/** Dead zone: ignore crop movements smaller than this fraction of crop width */
const DEAD_ZONE_RATIO = 0.08; // Increased to ignore tiny target changes

/** Minimum transition duration (seconds) for smooth easing */
const MIN_TRANSITION_DURATION = 0.4;

/** Maximum number of keyframes in the FFmpeg expression */
const MAX_EXPRESSION_KEYFRAMES = 20;

/** Faces within this fraction of frame width are considered the same speaker */
const CLUSTER_THRESHOLD_RATIO = 0.15;

/** A speaker track must appear in at least this fraction of face-containing frames */
const MIN_TRACK_PRESENCE = 0.20;

/** Activity sliding window size (frames) for speaker activity estimation */
const ACTIVITY_WINDOW = 4;

/** Minimum pause between words (seconds) to infer a speaker change */
const SPEAKER_CHANGE_PAUSE = 0.7;

/** Minimum ratio between best and median zone scores to consider detection confident.
 *  1.4 was too strict — rejected almost all real talking-head footage.
 *  1.15 allows zones that are clearly above average without requiring huge contrast. */
const ZONE_CONFIDENCE_RATIO = 1.15;

/** Penalty multiplier for edge zones (0 and last) to counter frame-border artifacts.
 *  0.35 was too harsh — when the subject IS near the edge, it completely suppressed
 *  the correct zone.  0.6 still penalizes but doesn't obliterate. */
const EDGE_ZONE_PENALTY = 0.6;

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

/**
 * Quantize crop position into stable shot zones.
 * Zones: left (0-33%), center (33-67%), right (67-100%), two-shot (center between speakers)
 * @param {number} cropX - Current crop X position
 * @param {number} maxX - Maximum crop X (srcWidth - cropW)
 * @param {Array<{time: number, cropX: number}>} allPositions - All positions for two-shot detection
 * @returns {number} Quantized crop X position
 */
function quantizeShotZone(cropX, maxX, allPositions = []) {
  if (maxX <= 0) return 0;
  
  // Define zone boundaries (as fractions of maxX)
  const leftBound = maxX * 0.33;
  const rightBound = maxX * 0.67;
  
  // Check if we should use two-shot (center between speakers)
  // If positions span a wide range, use center zone
  if (allPositions.length > 1) {
    const positions = allPositions.map(p => p.cropX);
    const minPos = Math.min(...positions);
    const maxPos = Math.max(...positions);
    const span = maxPos - minPos;
    // If positions span more than 40% of available space, use center
    if (span > maxX * 0.4) {
      return Math.round(maxX / 2);
    }
  }
  
  // Quantize to nearest zone
  if (cropX < leftBound) {
    // Left zone: quantize to 20% of maxX
    return Math.round(maxX * 0.2);
  } else if (cropX < rightBound) {
    // Center zone: quantize to 50% of maxX
    return Math.round(maxX / 2);
  } else {
    // Right zone: quantize to 80% of maxX
    return Math.round(maxX * 0.8);
  }
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

// ─── Transcript-based speaker inference ──────────────────────

/**
 * Infer speaker change points from word-level timing.
 *
 * Pauses longer than SPEAKER_CHANGE_PAUSE between consecutive words are
 * treated as speaker switches.  Returns alternating intervals (0, 1, 0, …).
 *
 * @param {Array<{word: string, start: number, end: number}>} words
 *   Word-level timing (absolute seconds).
 * @param {number} segmentStart — absolute start time of the segment
 * @param {number} duration     — segment length in seconds
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
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:145',message:'[Face] speaker intervals',data:{intervalsCount:intervals.length,intervals:intervals.map(iv=>({start:iv.start,end:iv.end,speaker:iv.speakerIdx,duration:iv.end-iv.start}))},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion
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

// ─── Canvas-based zone analysis (fallback when FaceDetector unavailable) ──

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
 * @param {number}    startTime — segment start (seconds)
 * @param {number}    duration  — segment length (seconds)
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
        // If all zones score similarly, the scene has no clear subject and we
        // should fall back to center crop rather than picking an arbitrary zone.
        const medianScore = [...zoneScores].sort((a, b) => a.totalScore - b.totalScore)[Math.floor(ZONE_COUNT / 2)].totalScore;
        const isConfident = medianScore > 0 ? (sorted[0].totalScore / medianScore) >= ZONE_CONFIDENCE_RATIO : sorted[0].totalScore >= ZONE_MIN_SCORE;

        // Diagnostic: log zone scores for every frame so we can see why gates pass/fail
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
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:405',message:'[Face] zones detected',data:{framesCount:frames.length,withFaces,noFaces,srcWidth,srcHeight},timestamp:Date.now(),runId:'debug1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return { frames, srcWidth, srcHeight };
  } catch (err) {
    console.warn('[Face] Canvas zone analysis failed:', err.message);
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
  const useTranscript = speakerIntervals && speakerIntervals.length > 0;

  // Per-speaker sliding window of recent face areas (area-variance fallback)
  const recentAreas = useTranscript ? null : speakers.map(() => []);

  for (const frame of frames) {
    let bestIdx = 0;

    if (useTranscript) {
      // Transcript-informed: look up which speaker interval covers this frame time
      const activeIdx = getActiveSpeakerAt(frame.time, speakerIntervals);
      // Map interval speakerIdx to spatial speaker track (clamped to track count)
      bestIdx = (activeIdx >= 0 && activeIdx < speakers.length) ? activeIdx : 0;
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
 * @param {Array<{word: string, start: number, end: number}>} [words]
 *   Optional word-level timing from transcript (absolute seconds).
 * @returns {Promise<Array<{time: number, centerX: number}>>}
 *   Keyframes with face center-X in source-pixel coords.
 *   `time` is relative to segment start (0 … duration).
 *   Empty array if detection is unavailable or finds nothing.
 */
export async function detectFaceKeyframes(videoFile, startTime, duration, words) {
  // Infer speaker intervals from transcript (used in both face + canvas paths)
  const speakerIntervals = inferActiveSpeakerFromTranscript(words, startTime, duration);

  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:618',message:'[Face] detectFaceKeyframes entry',data:{startTime,duration,wordsCount:words?.length||0,speakerIntervalsCount:speakerIntervals.length,faceDetectorSupported:isFaceDetectionSupported()},timestamp:Date.now(),runId:'debug1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  let frames, srcWidth, srcHeight;

  if (isFaceDetectionSupported()) {
    ({ frames, srcWidth, srcHeight } = await sampleAllFaces(videoFile, startTime, duration));
  } else {
    // Fallback: canvas-based zone analysis
    console.log('[Face] FaceDetector API not available — using canvas zone analysis');
    ({ frames, srcWidth, srcHeight } = await sampleFrameZones(videoFile, startTime, duration));
  }

  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:632',message:'[Face] zones detected',data:{framesCount:frames.length,srcWidth,srcHeight,framesWithFacesCount:frames.filter(f=>f.faces.length>0).length},timestamp:Date.now(),runId:'debug1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  if (!frames.length || srcWidth === 0) return [];

  const framesWithFaces = frames.filter(f => f.faces.length > 0);
  if (framesWithFaces.length === 0) {
    console.log('[Face] No faces/zones detected in any sampled frame');

    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:635',message:'[Face] transcript fallback check',data:{speakerIntervalsCount:speakerIntervals.length,srcWidth,srcHeight:srcHeight||1080},timestamp:Date.now(),runId:'debug1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    // Transcript-only fallback: if we have speaker intervals and know the source
    // dimensions, create synthetic keyframes that pan between speaker positions.
    // This is better than static center crop when speakers alternate.
    if (speakerIntervals.length > 1 && srcWidth > 0) {
      const cropW = Math.round((srcHeight || 1080) * 9 / 16);
      const maxX = srcWidth - cropW;
      // #region agent log
      fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:641',message:'[Face] transcript fallback conditions',data:{cropW,maxX,willCreateKeyframes:maxX>0},timestamp:Date.now(),runId:'debug1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (maxX > 0) {
        // Place speaker 0 at ~33% of frame, speaker 1 at ~66%
        const positions = [
          Math.round(srcWidth * 0.33),
          Math.round(srcWidth * 0.66),
        ];
        const transcriptKeyframes = [];
        for (const iv of speakerIntervals) {
          const idx = Math.min(iv.speakerIdx, positions.length - 1);
          const targetX = positions[idx];
          // Add start keyframe
          transcriptKeyframes.push({ time: iv.start, centerX: targetX });
          // Add intermediate keyframe at 0.3s after start for faster transition
          // This ensures the crop starts moving immediately and reaches target sooner
          const intermediateTime = Math.min(iv.start + 0.3, iv.end - 0.1);
          if (intermediateTime > iv.start + 0.1) {
            transcriptKeyframes.push({ time: intermediateTime, centerX: targetX });
          }
          // Add end keyframe to hold position
          transcriptKeyframes.push({ time: iv.end, centerX: targetX });
        }
        console.log(`[Face] Transcript-only fallback: ${transcriptKeyframes.length} keyframes from ${speakerIntervals.length} speaker intervals, positions=[${positions.join(',')}]`);
        // #region agent log
        fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:670',message:'[Face] keyframes generated',data:{keyframesCount:transcriptKeyframes.length,keyframes:transcriptKeyframes.map(k=>({t:k.time.toFixed(2),x:Math.round(k.centerX)})),positions},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
        // #endregion
        return transcriptKeyframes;
      }
    }

    return [];
  }

  // Cluster faces into speaker tracks
  const speakers = clusterSpeakers(frames, srcWidth);
  if (speakers.length === 0) {
    console.log('[Face] No consistent speaker tracks found');
    return [];
  }

  // Build per-frame crop targets (with transcript-informed speaker selection)
  const targets = buildCropTargets(frames, speakers, srcWidth, srcHeight, speakerIntervals);
  if (targets.length === 0) return [];

  // Diagnostic: show speaker positions and crop target range
  const centerXs = targets.map(t => t.centerX);
  const minCX = Math.round(Math.min(...centerXs));
  const maxCX = Math.round(Math.max(...centerXs));
  console.log(`[Face] ${speakers.length} speaker(s), ${targets.length} keyframes from ${frames.length} samples`);
  console.log(`[Face] Speaker avgX positions: [${speakers.map(s => Math.round(s.avgCenterX)).join(', ')}]`);
  console.log(`[Face] Crop target centerX range: ${minCX}–${maxCX} (srcWidth=${srcWidth})`);
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:683',message:'[Face] keyframes generated',data:{keyframesCount:targets.length,keyframes:targets.slice(0,10).map(k=>({t:k.time,x:Math.round(k.centerX)}))},timestamp:Date.now(),runId:'debug1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
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
 *  2. Dead zone filter (discard micro-movements)
 *  3. Minimum hold time (prevent rapid oscillation)
 *  4. Merge close targets
 *  5. Exponential moving average (EMA) to remove jitter
 *  6. Velocity clamping to prevent jumps faster than MAX_PAN_PX_PER_SEC
 *  7. Cap keyframe count for FFmpeg expression safety
 *
 * @param {Array}  keyframes  — from detectFaceKeyframes()
 * @param {number} srcWidth   — source video width in pixels
 * @param {number} srcHeight  — source video height in pixels
 * @returns {string|null}
 *   FFmpeg -vf filter string, or null if no face data / not applicable
 *   (caller should fall back to default center crop).
 */
export function buildCropFilter(keyframes, srcWidth, srcHeight) {
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:710',message:'[Crop] buildCropFilter entry',data:{keyframesCount:keyframes.length,srcWidth,srcHeight,keyframes:keyframes.slice(0,5).map(k=>({t:k.time,x:Math.round(k.centerX)}))},timestamp:Date.now(),runId:'debug1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  const cropW = Math.round(srcHeight * 9 / 16);
  const maxX = srcWidth - cropW;

  // Source is already narrower than or equal to 9:16 — no horizontal crop needed
  if (maxX <= 0) {
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:715',message:'[Crop] filter built',data:{result:'null',reason:'maxX<=0',maxX,cropW},timestamp:Date.now(),runId:'debug1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    return null;
  }

  // No face keyframes — fall back to center crop
  if (!keyframes.length) {
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:718',message:'[Crop] filter built',data:{result:'null',reason:'no keyframes'},timestamp:Date.now(),runId:'debug1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    return null;
  }

  // Step 1: Convert face centerX → crop X (face centered in the crop window)
  const rawPositions = keyframes.map(kf => ({
    time: kf.time,
    cropX: clamp(Math.round(kf.centerX - cropW / 2), 0, maxX),
  }));

  rawPositions.sort((a, b) => a.time - b.time);
  
  // #region agent log
  console.log(`[Crop] Raw targets: ${rawPositions.length} positions`);
  rawPositions.slice(0, 10).forEach((p, i) => {
    console.log(`  [${i}] t=${p.time.toFixed(2)}s, cropX=${p.cropX}`);
  });
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:764',message:'[Crop] raw positions',data:{count:rawPositions.length,positions:rawPositions.map(p=>({t:p.time.toFixed(2),x:p.cropX})),cropW,maxX},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion

  // Step 1.5: Shot quantization — quantize positions into stable zones (left, center, right, two-shot)
  const quantizedPositions = rawPositions.map(p => ({
    time: p.time,
    cropX: quantizeShotZone(p.cropX, maxX, rawPositions),
    originalCropX: p.cropX, // Keep original for logging
  }));
  
  // Log quantization changes
  const quantizationChanges = [];
  for (let i = 0; i < rawPositions.length; i++) {
    if (Math.abs(quantizedPositions[i].cropX - rawPositions[i].cropX) > 1) {
      quantizationChanges.push({
        time: rawPositions[i].time,
        from: rawPositions[i].cropX,
        to: quantizedPositions[i].cropX,
        zone: quantizedPositions[i].cropX < maxX * 0.33 ? 'left' : 
              quantizedPositions[i].cropX < maxX * 0.67 ? 'center' : 'right'
      });
    }
  }
  console.log(`[Crop] Shot quantization: ${quantizationChanges.length} positions quantized into zones`);
  if (quantizationChanges.length > 0) {
    quantizationChanges.slice(0, 5).forEach(change => {
      console.log(`  t=${change.time.toFixed(2)}s: ${change.from} → ${change.to} (${change.zone})`);
    });
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:777',message:'[Crop] after quantization',data:{count:quantizedPositions.length,positions:quantizedPositions.map(p=>({t:p.time.toFixed(2),x:p.cropX,original:p.originalCropX})),quantizationChanges:quantizationChanges.slice(0,10)},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion

  // Step 2: Dead zone filter — discard movements smaller than threshold
  const deadZone = cropW * DEAD_ZONE_RATIO;
  const deadFiltered = [quantizedPositions[0]];
  const ignoredChanges = [];
  for (let i = 1; i < quantizedPositions.length; i++) {
    const lastAccepted = deadFiltered[deadFiltered.length - 1];
    const change = Math.abs(quantizedPositions[i].cropX - lastAccepted.cropX);
    if (change >= deadZone) {
      deadFiltered.push(quantizedPositions[i]);
    } else {
      // Keep the time but use the last accepted position
      deadFiltered.push({ time: quantizedPositions[i].time, cropX: lastAccepted.cropX });
      ignoredChanges.push({
        time: quantizedPositions[i].time,
        requested: quantizedPositions[i].cropX,
        kept: lastAccepted.cropX,
        change: change
      });
    }
  }
  
  console.log(`[Crop] Dead zone filter: ${ignoredChanges.length} tiny changes ignored (threshold=${Math.round(deadZone)}px)`);
  if (ignoredChanges.length > 0 && ignoredChanges.length <= 10) {
    ignoredChanges.forEach(change => {
      console.log(`  t=${change.time.toFixed(2)}s: ignored change of ${Math.round(change.change)}px`);
    });
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:777',message:'[Crop] after dead zone',data:{count:deadFiltered.length,positions:deadFiltered.map(p=>({t:p.time.toFixed(2),x:p.cropX})),deadZone:Math.round(deadZone),ignoredCount:ignoredChanges.length,ignoredSamples:ignoredChanges.slice(0,5)},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion

  // Step 3: Minimum hold time — suppress direction changes within MIN_HOLD_TIME
  const holdFiltered = [deadFiltered[0]];
  let lastChangeTime = deadFiltered[0].time;
  let lastChangeCropX = deadFiltered[0].cropX;
  const suppressedChanges = [];
  for (let i = 1; i < deadFiltered.length; i++) {
    const timeSinceChange = deadFiltered[i].time - lastChangeTime;
    if (deadFiltered[i].cropX !== lastChangeCropX &&
        timeSinceChange >= MIN_HOLD_TIME) {
      holdFiltered.push(deadFiltered[i]);
      lastChangeTime = deadFiltered[i].time;
      lastChangeCropX = deadFiltered[i].cropX;
    } else {
      if (deadFiltered[i].cropX !== lastChangeCropX) {
        suppressedChanges.push({
          time: deadFiltered[i].time,
          requested: deadFiltered[i].cropX,
          kept: lastChangeCropX,
          timeSinceChange: timeSinceChange
        });
      }
      holdFiltered.push({ time: deadFiltered[i].time, cropX: lastChangeCropX });
    }
  }
  
  console.log(`[Crop] Hold time filter: ${suppressedChanges.length} changes suppressed (min hold=${MIN_HOLD_TIME}s)`);
  if (suppressedChanges.length > 0 && suppressedChanges.length <= 10) {
    suppressedChanges.forEach(change => {
      console.log(`  t=${change.time.toFixed(2)}s: suppressed change (only ${change.timeSinceChange.toFixed(2)}s since last)`);
    });
  }
  
  // #region agent log
  const transitions = [];
  for (let i = 1; i < holdFiltered.length; i++) {
    if (holdFiltered[i].cropX !== holdFiltered[i-1].cropX) {
      transitions.push({
        from: holdFiltered[i-1].cropX,
        to: holdFiltered[i].cropX,
        startTime: holdFiltered[i-1].time,
        endTime: holdFiltered[i].time,
        duration: holdFiltered[i].time - holdFiltered[i-1].time,
        distance: Math.abs(holdFiltered[i].cropX - holdFiltered[i-1].cropX)
      });
    }
  }
  console.log(`[Crop] Stabilized targets: ${holdFiltered.length} positions, ${transitions.length} transitions`);
  transitions.forEach((t, i) => {
    console.log(`  Transition ${i+1}: ${t.from} → ${t.to} over ${t.duration.toFixed(2)}s (${Math.round(t.distance)}px)`);
  });
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:792',message:'[Crop] after hold time',data:{count:holdFiltered.length,positions:holdFiltered.map(p=>({t:p.time.toFixed(2),x:p.cropX})),transitions,minHoldTime:MIN_HOLD_TIME,suppressedCount:suppressedChanges.length},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion

  // Step 4: Merge consecutive targets within 5% of crop width
  const mergeThreshold = cropW * 0.05;
  const merged = [holdFiltered[0]];
  for (let i = 1; i < holdFiltered.length; i++) {
    if (Math.abs(holdFiltered[i].cropX - merged[merged.length - 1].cropX) < mergeThreshold) {
      // Keep last value (merge into previous)
      merged.push({ time: holdFiltered[i].time, cropX: merged[merged.length - 1].cropX });
    } else {
      merged.push(holdFiltered[i]);
    }
  }

  // Step 5: Exponential moving average smoothing
  const emaSmoothed = [merged[0]];
  for (let i = 1; i < merged.length; i++) {
    const prev = emaSmoothed[i - 1];
    const rawX = merged[i].cropX;
    const smoothedX = SMOOTH_ALPHA * rawX + (1 - SMOOTH_ALPHA) * prev.cropX;
    emaSmoothed.push({
      time: merged[i].time,
      cropX: clamp(Math.round(smoothedX), 0, maxX),
    });
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:817',message:'[Crop] after EMA',data:{count:emaSmoothed.length,positions:emaSmoothed.map(p=>({t:p.time.toFixed(2),x:p.cropX})),smoothAlpha:SMOOTH_ALPHA},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion

  // Step 6: Velocity clamping — limit how fast the crop can pan
  const velocityClamped = [emaSmoothed[0]];
  const velocityLog = [];
  for (let i = 1; i < emaSmoothed.length; i++) {
    const dt = emaSmoothed[i].time - emaSmoothed[i - 1].time;
    const prev = velocityClamped[i - 1];
    if (dt > 0) {
      const maxDelta = MAX_PAN_PX_PER_SEC * dt;
      const delta = emaSmoothed[i].cropX - prev.cropX;
      const wasClamped = Math.abs(delta) > maxDelta;
      const clamped = wasClamped
        ? prev.cropX + Math.sign(delta) * maxDelta
        : emaSmoothed[i].cropX;
      velocityClamped.push({
        time: emaSmoothed[i].time,
        cropX: clamp(Math.round(clamped), 0, maxX),
      });
      if (wasClamped) {
        velocityLog.push({
          time: emaSmoothed[i].time,
          requested: emaSmoothed[i].cropX,
          clamped: clamped,
          maxDelta: maxDelta,
          actualSpeed: Math.abs(clamped - prev.cropX) / dt
        });
      }
    } else {
      velocityClamped.push({ ...emaSmoothed[i] });
    }
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:837',message:'[Crop] after velocity clamp',data:{count:velocityClamped.length,positions:velocityClamped.map(p=>({t:p.time.toFixed(2),x:p.cropX})),maxPanSpeed:MAX_PAN_PX_PER_SEC,clampedCount:velocityLog.length,clampedSamples:velocityLog.slice(0,5)},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion

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

  // Diagnostic: show smoothing pipeline results
  const rawRange = `${Math.min(...rawPositions.map(p => p.cropX))}–${Math.max(...rawPositions.map(p => p.cropX))}`;
  const smoothedRange = `${Math.min(...smoothed.map(p => p.cropX))}–${Math.max(...smoothed.map(p => p.cropX))}`;
  console.log(`[Face] buildCropFilter: ${rawPositions.length} raw positions (cropX range ${rawRange}), ${smoothed.length} smoothed keyframes (cropX range ${smoothedRange}), maxX=${maxX}, cropW=${cropW}`);

  // Single keyframe → static face-centered crop
  if (smoothed.length === 1) {
    const filter = `crop=${cropW}:${srcHeight}:${smoothed[0].cropX}:0,scale=1080:1920`;
    console.log(`[Face] Static crop filter: ${filter}`);
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:833',message:'[Crop] filter built',data:{result:'static',cropX:smoothed[0].cropX,filter},timestamp:Date.now(),runId:'debug1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    return filter;
  }

  // Multiple keyframes → piecewise-eased FFmpeg expression for smooth pan
  //
  // FFmpeg filtergraph escaping: commas inside a filter parameter must be
  // written as \, so they aren't mistaken for filter-chain separators.
  const E = '\\,'; // escaped comma

  /**
   * Generate eased interpolation expression for FFmpeg.
   * Uses cubic ease-in-out approximation: smoothstep-like curve
   * @param {number} fromX - Start position
   * @param {number} toX - End position
   * @param {number} startTime - Start time
   * @param {number} endTime - End time
   * @returns {string} FFmpeg expression for eased interpolation
   */
  function buildEasedExpression(fromX, toX, startTime, endTime) {
    const dt = endTime - startTime;
    if (dt <= 0) return String(toX);
    
    const delta = toX - fromX;
    // Normalized time: 0 to 1 over the transition duration
    // t_norm = (t - startTime) / dt
    const tNorm = `(t-${startTime.toFixed(2)})/${dt.toFixed(4)}`;
    
    // Cubic ease-in-out approximation using smoothstep-like function
    // ease(t) = t^2 * (3 - 2*t) for t in [0,1] (smoothstep)
    // This gives smooth acceleration and deceleration
    // We clamp t_norm to [0,1] first
    const tClamped = `max(0${E}min(1${E}${tNorm}))`;
    const tSquared = `(${tClamped})*(${tClamped})`;
    const ease = `${tSquared}*(3-2*${tClamped})`;
    
    // Interpolate: fromX + delta * ease(t)
    return `${fromX}+${delta}*${ease}`;
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
    const speed = distance / dt;
    const useEasing = dt >= MIN_TRANSITION_DURATION;

    // Use eased interpolation for transitions >= MIN_TRANSITION_DURATION, linear for very short ones
    let lerp;
    if (useEasing) {
      lerp = buildEasedExpression(curr.cropX, next.cropX, curr.time, next.time);
    } else {
      // Very short transitions: use linear to avoid expression complexity
      const slope = (next.cropX - curr.cropX) / dt;
      const absSlope = Math.abs(slope).toFixed(4);
      const sign = slope >= 0 ? '+' : '-';
      lerp = `${curr.cropX}${sign}${absSlope}*(t-${curr.time.toFixed(2)})`;
    }
    
    expr = `if(lt(t${E}${next.time.toFixed(2)})${E}${lerp}${E}${expr})`;
    
    filterTransitions.push({
      from: curr.cropX,
      to: next.cropX,
      startTime: curr.time,
      endTime: next.time,
      duration: dt,
      distance: distance,
      speed: speed,
      easing: useEasing
    });
  }

  // Hold first keyframe's position for frames before the first sample
  expr = `if(lt(t${E}${smoothed[0].time.toFixed(2)})${E}${smoothed[0].cropX}${E}${expr})`;

  // Clamp to valid pixel range
  expr = `max(0${E}min(${maxX}${E}${expr}))`;

  const filter = `crop=${cropW}:${srcHeight}:${expr}:0,scale=1080:1920`;
  
  // Final logging
  console.log(`[Crop] Final crop filter (${smoothed.length} keyframes):`);
  console.log(`  Keyframes: [${smoothed.map(s => `${s.cropX}@${s.time.toFixed(1)}s`).join(', ')}]`);
  console.log(`  Transitions: ${filterTransitions.length}`);
  filterTransitions.forEach((t, i) => {
    const easingStr = t.easing ? 'eased' : 'linear';
    console.log(`    ${i+1}. ${t.from} → ${t.to} over ${t.duration.toFixed(2)}s (${Math.round(t.distance)}px, ${easingStr})`);
  });
  console.log(`[Crop] Final filter string (first 400 chars): ${filter.substring(0, 400)}${filter.length > 400 ? '...' : ''}`);
  
  // #region agent log
  fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'faceDetection.js:915',message:'[Crop] filter built',data:{result:'dynamic',keyframesCount:smoothed.length,keyframes:smoothed.map(s=>({t:s.time.toFixed(2),x:s.cropX})),transitions:filterTransitions,filterPreview:filter.substring(0,400),fullFilter:filter},timestamp:Date.now(),runId:'debug2',hypothesisId:'motion'})}).catch(()=>{});
  // #endregion
  return filter;
}
