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

const MAX_FRAME_WIDTH = 480;
const FRAME_QUALITY = 0.6;

export async function extractFrames(videoFile, maxFrames = 8, onProgress = null) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    const blobUrl = URL.createObjectURL(videoFile);
    const frames = [];
    let currentIndex = 0;
    let times = [];
    let resolved = false;
    let seeking = false;

    const finish = (result) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeout);
      URL.revokeObjectURL(blobUrl);
      video.remove();
      if (result instanceof Error) reject(result);
      else resolve(result);
    };

    const timeout = setTimeout(() => {
      console.warn('[AI] Frame extraction timed out, returning', frames.length, 'frames');
      if (frames.length > 0) finish(frames);
      else finish(new Error('Frame extraction timed out'));
    }, 30000);

    const seekToNext = () => {
      if (resolved) return;
      if (currentIndex >= times.length) { finish(frames); return; }
      seeking = true;
      video.currentTime = times[currentIndex];
    };

    video.onloadedmetadata = () => {
      const duration = video.duration;
      if (!duration || duration <= 0) { finish(new Error('Could not determine video duration')); return; }
      const frameCount = Math.min(maxFrames, Math.max(4, Math.ceil(duration / 15)));
      const interval = duration / (frameCount + 1);
      for (let i = 1; i <= frameCount; i++) times.push(interval * i);
      if (onProgress) onProgress(0, times.length);
      seekToNext();
    };

    video.onseeked = () => {
      if (resolved || !seeking) return;
      seeking = false;
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = Math.min(1, MAX_FRAME_WIDTH / video.videoWidth);
        canvas.width = Math.round(video.videoWidth * scale);
        canvas.height = Math.round(video.videoHeight * scale);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', FRAME_QUALITY);
        const base64 = dataUrl.split(',')[1];
        frames.push({ timeSeconds: times[currentIndex], base64 });
        canvas.remove();
        currentIndex++;
        if (onProgress) onProgress(frames.length, times.length);
        seekToNext();
      } catch (err) { finish(err); }
    };

    video.onerror = () => finish(new Error('Failed to load video for frame extraction'));
    video.src = blobUrl;
  });
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

function buildSegmentsFromAnalysis(frameResults, videoDuration) {
  const sorted = [...frameResults].sort((a, b) => b.engagementScore - a.engagementScore);
  const segments = [];

  for (const frame of sorted) {
    if (segments.length >= 5) break;
    const start = Math.max(0, frame.timeSeconds - 10);
    const end = Math.min(videoDuration, frame.timeSeconds + 20);
    const overlaps = segments.some(s => start < s.endSeconds && end > s.startSeconds);
    if (overlaps || end - start < 10) continue;
    segments.push({
      startSeconds: Math.round(start),
      endSeconds: Math.round(end),
      label: frame.description.slice(0, 80),
      reason: `Engagement score: ${frame.engagementScore}/10`,
    });
  }

  return segments.sort((a, b) => a.startSeconds - b.startSeconds);
}

export async function analyzeWithGemini(frames, videoDuration, onRetry = null) {
  const workerUrl = import.meta.env.VITE_AI_WORKER_URL;

  if (!workerUrl) throw new Error('GEMINI_API_KEY_MISSING');

  console.log('[AI] Sending', frames.length, 'frames to Cloudflare Workers AI...');

  const framesToAnalyze = frames.slice(0, Math.min(5, frames.length));

  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const results = await Promise.all(
        framesToAnalyze.map((frame, i) =>
          analyzeFrame(frame, i, framesToAnalyze.length, videoDuration, workerUrl)
        )
      );

      console.log('[AI] All frames analyzed:', results);

      const segments = buildSegmentsFromAnalysis(results, videoDuration);
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
