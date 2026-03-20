/**
 * Cloudflare Workers AI Service for Long Video to Shorts
 * Calls a Cloudflare Worker proxy that runs Workers AI (no CORS issues).
 * 100% free — 10,000 requests/day on Workers free tier.
 *
 * Setup:
 *  1. Deploy the worker: cd workers/ai-proxy && npx wrangler deploy
 *  2. Copy the worker URL (e.g. https://clipcut-ai-proxy.<you>.workers.dev)
 *  3. Add to your .env file:
 *     VITE_AI_WORKER_URL=https://clipcut-ai-proxy.<you>.workers.dev
 */

const MAX_FRAME_WIDTH = 512;
const FRAME_QUALITY = 0.7;

/**
 * Attempt to load video metadata. Returns the video element if successful,
 * or throws with error details if the browser can't decode it.
 */
function loadVideoElement(blobUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const timeout = setTimeout(() => {
      video.remove();
      reject(new Error('TIMEOUT'));
    }, 30000);

    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      if (!video.duration || video.duration <= 0) {
        video.remove();
        reject(new Error('NO_DURATION'));
      } else {
        resolve(video);
      }
    };

    video.onerror = () => {
      clearTimeout(timeout);
      const code = video.error?.code;
      const message = video.error?.message || '';
      video.remove();
      reject(new Error(`DECODE_ERROR:${code}:${message}`));
    };

    video.src = blobUrl;
  });
}

/**
 * Use FFmpeg.wasm to strip audio and re-mux video to a browser-compatible format.
 * This fixes videos with unsupported audio codecs (Opus in MP4, etc).
 */
async function remuxWithFFmpeg(videoFile) {
  console.log('[AI] Attempting FFmpeg re-mux to fix codec issues...');

  const { FFmpeg } = await import('@ffmpeg/ffmpeg');
  const { fetchFile } = await import('@ffmpeg/util');

  const ffmpeg = new FFmpeg();

  try {
    await ffmpeg.load();

    const inputName = 'input' + getExtension(videoFile.name);
    const outputName = 'output.mp4';

    await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

    // Strip audio, copy video stream, fast re-mux (no re-encoding)
    await ffmpeg.exec([
      '-i', inputName,
      '-an',              // Strip audio entirely
      '-c:v', 'copy',     // Copy video stream as-is (fast, no re-encoding)
      '-movflags', '+faststart',  // Optimize for web playback
      outputName
    ]);

    const data = await ffmpeg.readFile(outputName);
    const blob = new Blob([data], { type: 'video/mp4' });

    await ffmpeg.deleteFile(inputName);
    await ffmpeg.deleteFile(outputName);
    ffmpeg.terminate();

    console.log('[AI] FFmpeg re-mux complete, new size:', Math.round(blob.size / (1024 * 1024)), 'MB');
    return blob;
  } catch (err) {
    ffmpeg.terminate();
    throw err;
  }
}

function getExtension(filename) {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(ext)) return '.' + ext;
  return '.mp4';
}

/**
 * Core frame extraction from an already-loaded video element.
 * Returns { frames, decodeError } — decodeError is true if a mid-seek codec error occurred.
 */
function extractFramesFromVideo(video, blobUrl, fileSizeMB, maxFrames, onProgress) {
  const duration = video.duration;

  return new Promise((resolve) => {
    const frames = [];
    let currentIndex = 0;
    let times = [];
    let resolved = false;
    let seeking = false;

    const finish = (result, decodeError = false) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeout);
      clearTimeout(seekTimer);
      URL.revokeObjectURL(blobUrl);
      video.remove();
      resolve({ frames: result instanceof Error ? [] : result, decodeError, error: result instanceof Error ? result : null });
    };

    // Scale timeout based on file size: 30s base + 10s per 10MB, max 3 min
    const timeoutMs = Math.min(180000, 30000 + Math.ceil(fileSizeMB / 10) * 10000);

    const timeout = setTimeout(() => {
      console.warn('[AI] Frame extraction timed out after', timeoutMs / 1000, 's, returning', frames.length, 'frames');
      finish(frames.length > 0 ? frames : new Error('Frame extraction timed out'));
    }, timeoutMs);

    // Per-seek timeout — skip stuck frames
    let seekTimer = null;
    const startSeekTimer = () => {
      clearTimeout(seekTimer);
      seekTimer = setTimeout(() => {
        if (resolved) return;
        console.warn('[AI] Seek stuck at frame', currentIndex, '- skipping');
        currentIndex++;
        seekToNext();
      }, 15000);
    };

    const seekToNext = () => {
      if (resolved) return;
      if (currentIndex >= times.length) {
        clearTimeout(seekTimer);
        finish(frames);
        return;
      }
      seeking = true;
      video.currentTime = times[currentIndex];
      startSeekTimer();
    };

    // Scale frame count with duration: ~1 frame per 30s, respect caller's maxFrames
    let frameCount;
    if (duration <= 60) {
      frameCount = Math.min(maxFrames, Math.max(4, Math.ceil(duration / 15)));
    } else {
      // For longer videos, sample more frames for better coverage
      frameCount = Math.min(maxFrames, Math.max(6, Math.ceil(duration / 30)));
    }

    const interval = duration / (frameCount + 1);
    for (let i = 1; i <= frameCount; i++) times.push(interval * i);

    console.log(`[AI] Extracting ${frameCount} frames from ${Math.round(duration)}s video (${Math.round(fileSizeMB)}MB, timeout: ${timeoutMs / 1000}s)`);

    if (onProgress) onProgress(0, times.length);

    video.onseeked = () => {
      if (resolved || !seeking) return;
      seeking = false;
      clearTimeout(seekTimer);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = fileSizeMB > 50 ? 384 : MAX_FRAME_WIDTH;
        const scale = Math.min(1, maxWidth / video.videoWidth);
        canvas.width = Math.round(video.videoWidth * scale);
        canvas.height = Math.round(video.videoHeight * scale);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', fileSizeMB > 50 ? 0.5 : FRAME_QUALITY);
        const base64 = dataUrl.split(',')[1];
        frames.push({ timeSeconds: times[currentIndex], base64 });
        canvas.remove();
        currentIndex++;
        if (onProgress) onProgress(frames.length, times.length);
        seekToNext();
      } catch (err) {
        console.warn('[AI] Frame capture error at index', currentIndex, err);
        currentIndex++;
        seekToNext();
      }
    };

    video.onerror = () => {
      const code = video.error?.code;
      const msg = video.error?.message || 'Unknown error';
      console.error(`[AI] Video error during extraction: code=${code}, message=${msg}`);
      // Signal decode error so the caller can retry with FFmpeg re-mux
      finish(frames.length > 0 ? frames : new Error(`Video decode error (code ${code}): ${msg}`), code === 3);
    };

    // Start seeking
    seekToNext();
  });
}

/**
 * Extract frames from a video file for AI analysis.
 * Handles large files, unsupported codecs, and mid-extraction decode errors.
 * If a decode error occurs during seeking (e.g. bad audio packets), automatically
 * re-muxes with FFmpeg to strip audio and retries extraction.
 */
export async function extractFrames(videoFile, maxFrames = 8, onProgress = null) {
  const fileSizeMB = videoFile.size / (1024 * 1024);
  let blobUrl = URL.createObjectURL(videoFile);

  // Try loading the video directly first
  let video;
  try {
    video = await loadVideoElement(blobUrl);
  } catch (err) {
    console.warn('[AI] Direct load failed:', err.message);
    URL.revokeObjectURL(blobUrl);

    // If decode error, try FFmpeg re-mux
    if (err.message.startsWith('DECODE_ERROR')) {
      try {
        const remuxedBlob = await remuxWithFFmpeg(videoFile);
        blobUrl = URL.createObjectURL(remuxedBlob);
        video = await loadVideoElement(blobUrl);
      } catch (ffErr) {
        URL.revokeObjectURL(blobUrl);
        console.error('[AI] FFmpeg re-mux also failed:', ffErr);
        throw new Error('Video codec not supported and re-encoding failed. Try converting the video to H.264 MP4 before uploading.');
      }
    } else {
      throw new Error('Failed to load video for frame extraction');
    }
  }

  // First attempt — extract from original (or already-remuxed) video
  const result = await extractFramesFromVideo(video, blobUrl, fileSizeMB, maxFrames, onProgress);

  // If decode error happened mid-extraction, re-mux and retry once
  if (result.decodeError) {
    console.log('[AI] Decode error during frame extraction — re-muxing with FFmpeg and retrying...');
    try {
      const remuxedBlob = await remuxWithFFmpeg(videoFile);
      const newUrl = URL.createObjectURL(remuxedBlob);
      const newVideo = await loadVideoElement(newUrl);
      const retryResult = await extractFramesFromVideo(newVideo, newUrl, fileSizeMB, maxFrames, onProgress);

      if (retryResult.frames.length > 0) return retryResult.frames;
      if (retryResult.error) throw retryResult.error;
    } catch (ffErr) {
      console.error('[AI] FFmpeg re-mux retry failed:', ffErr);
      // Fall through to return whatever we got from the first attempt
    }

    // If re-mux failed but we got some frames from the first attempt, use them
    if (result.frames.length > 0) {
      console.warn('[AI] Using', result.frames.length, 'frames from first attempt');
      return result.frames;
    }
    throw new Error('Video codec not supported and re-encoding failed. Try converting the video to H.264 MP4 before uploading.');
  }

  if (result.error) throw result.error;
  return result.frames;
}

const FALLBACK_RETRY_DELAYS = [15000, 30000, 60000];
const MAX_RETRIES = 3;

async function analyzeFrame(frame, frameIndex, totalFrames, videoDuration, workerUrl) {
  const prompt = `This is frame ${frameIndex + 1} of ${totalFrames} from a ${Math.round(videoDuration)}-second video, captured at ${Math.round(frame.timeSeconds)} seconds.
Describe what is happening in 1-2 sentences. Rate how engaging this moment would be for a short-form video (TikTok/Reels) on a scale of 1-10.
Respond in this exact JSON format only, no extra text:
{"description":"what is happening","engagementScore":7}`;

  const binaryStr = atob(frame.base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

  const response = await fetch(workerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, image: Array.from(bytes) }),
  });

  if (!response.ok) {
    const status = response.status;
    const body = await response.text().catch(() => '');
    throw { status, body };
  }

  const data = await response.json();
  const text = data?.result?.response || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return { timeSeconds: frame.timeSeconds, description: 'Interesting moment', engagementScore: 5 };

  try {
    const parsed = JSON.parse(match[0]);
    return {
      timeSeconds: frame.timeSeconds,
      description: parsed.description || 'Interesting moment',
      engagementScore: typeof parsed.engagementScore === 'number' ? parsed.engagementScore : 5,
    };
  } catch {
    return { timeSeconds: frame.timeSeconds, description: 'Interesting moment', engagementScore: 5 };
  }
}

/**
 * Build segments from AI frame analysis results.
 *
 * @param {Array} frameResults - Analyzed frames with timeSeconds, description, engagementScore
 * @param {number} videoDuration - Total video duration in seconds
 * @param {number} clipDuration - Target clip duration in seconds (15, 30, or 60). Default 30.
 * @returns {Array} Sorted array of segment objects
 */
function buildSegmentsFromAnalysis(frameResults, videoDuration, clipDuration = 30) {
  const sorted = [...frameResults].sort((a, b) => b.engagementScore - a.engagementScore);
  const segments = [];

  // Place the interesting moment about 1/3 into the clip (more context after the hook)
  const beforeTime = Math.round(clipDuration * 0.33);
  const afterTime = clipDuration - beforeTime;

  const minDuration = Math.max(10, Math.round(clipDuration * 0.5));
  const maxSegments = Math.min(10, Math.max(2, Math.floor(videoDuration / clipDuration)));

  for (const frame of sorted) {
    if (segments.length >= maxSegments) break;

    let start = Math.max(0, frame.timeSeconds - beforeTime);
    let end = Math.min(videoDuration, frame.timeSeconds + afterTime);

    // If we hit the start/end of the video, extend the other direction to maintain full duration
    if (start === 0) {
      end = Math.min(videoDuration, clipDuration);
    }
    if (end === videoDuration) {
      start = Math.max(0, videoDuration - clipDuration);
    }

    const overlaps = segments.some(s => start < s.endSeconds && end > s.startSeconds);
    if (overlaps || (end - start) < minDuration) continue;

    segments.push({
      startSeconds: Math.round(start),
      endSeconds: Math.round(end),
      label: frame.description.slice(0, 80),
      reason: `Engagement score: ${frame.engagementScore}/10`,
    });
  }

  return segments.sort((a, b) => a.startSeconds - b.startSeconds);
}

export async function analyzeWithGemini(frames, videoDuration, { clipDuration = 30, onRetry = null } = {}) {
  const workerUrl = import.meta.env.VITE_AI_WORKER_URL;

  if (!workerUrl) throw new Error('GEMINI_API_KEY_MISSING');

  console.log('[AI] Sending', frames.length, 'frames to Cloudflare Workers AI...');

  // Use all frames the caller extracted — frame count is already scaled by extractFrames
  const framesToAnalyze = frames;

  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const results = await Promise.all(
        framesToAnalyze.map((frame, i) =>
          analyzeFrame(frame, i, framesToAnalyze.length, videoDuration, workerUrl)
        )
      );

      console.log('[AI] All frames analyzed:', results);

      const segments = buildSegmentsFromAnalysis(results, videoDuration, clipDuration);
      if (segments.length === 0) throw new Error('NO_SEGMENTS');

      return validateSegments(segments, videoDuration);

    } catch (err) {
      const status = err?.status;
      const body = err?.body || '';
      console.error('[AI] Error:', status || err.message);

      if (err.message === 'NO_SEGMENTS' || err.message === 'PARSE_FAILED') throw err;
      if (status === 401 || status === 403) throw new Error('INVALID_API_KEY');
      if (status !== 429 && status !== undefined) throw new Error(`AI proxy error: ${status}`);
      if (!status) throw err;

      // 429 — check if daily limit
      if (body.includes('daily') || body.includes('limit')) {
        throw new Error('DAILY_QUOTA_EXHAUSTED');
      }

      lastError = new Error('RATE_LIMITED');
      if (attempt < MAX_RETRIES) {
        const delayMs = FALLBACK_RETRY_DELAYS[attempt];
        const delaySec = Math.round(delayMs / 1000);
        console.log(`[AI] Rate limited. Retrying in ${delaySec}s (attempt ${attempt + 1}/${MAX_RETRIES})...`);
        if (onRetry) onRetry(attempt + 1, delaySec);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}

export function validateSegments(segments, videoDuration) {
  return segments
    .filter(s => typeof s.startSeconds === 'number' && typeof s.endSeconds === 'number' && s.endSeconds > s.startSeconds)
    .map(s => ({
      startSeconds: Math.max(0, Math.min(s.startSeconds, videoDuration)),
      endSeconds: Math.max(0, Math.min(s.endSeconds, videoDuration)),
      label: String(s.label || 'Untitled segment').slice(0, 100),
      reason: String(s.reason || '').slice(0, 200),
    }))
    .filter(s => { const dur = s.endSeconds - s.startSeconds; return dur >= 10 && dur <= 90; })
    .sort((a, b) => a.startSeconds - b.startSeconds);
}

export function getGeminiErrorMessage(error) {
  const messages = {
    GEMINI_API_KEY_MISSING: 'AI Worker URL not configured. Add VITE_AI_WORKER_URL to your .env file. See workers/ai-proxy/README.',
    DAILY_QUOTA_EXHAUSTED: 'Daily request limit reached. Try again tomorrow.',
    RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
    INVALID_API_KEY: 'Worker authentication failed. Redeploy your worker.',
    EMPTY_RESPONSE: 'AI returned an empty response. Try again.',
    PARSE_FAILED: 'Could not parse AI response. You can add segments manually.',
    NO_SEGMENTS: 'AI did not find any suitable segments. You can add segments manually.',
  };
  return messages[error.message] || `AI analysis failed: ${error.message}`;
}
