/**
 * Silence Detection Service
 *
 * Uses the Web Audio API to analyze audio amplitude and identify silent sections.
 * Returns an array of { start, end } ranges where silence was detected.
 */

/**
 * Decode an audio/video file into an `AudioBuffer`.
 *
 * Fast path: hand the raw file bytes to `decodeAudioData` — this works for WAV,
 * MP3, and clean AAC streams and is much cheaper than booting FFmpeg.
 *
 * Fallback: if Web Audio rejects the container (typically MP4/MOV on Firefox,
 * Safari, and several Chromium variants), reuse the FFmpeg-backed
 * `extractAudio` helper that the captions pipeline already relies on. It
 * returns a WAV `Uint8Array`, which Web Audio then decodes reliably on every
 * browser.
 */
async function decodeAudioBufferFromFile(file) {
  const { extractAudio, getCachedWav } = await import('./transcriptService');
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  try {
    // If a previous action already extracted this file (auto-edit: captions before
    // silence), skip straight to decoding the cached WAV. Avoids a wasted decode
    // attempt on the raw container that we already know fails on this browser.
    const cached = getCachedWav(file);
    if (cached) {
      const wavCopy = cached.slice().buffer;
      return await audioCtx.decodeAudioData(wavCopy);
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      return await audioCtx.decodeAudioData(arrayBuffer.slice(0));
    } catch (err) {
      console.warn('[silenceDetector] Web Audio failed on raw file — trying FFmpeg fallback:', err?.message || err);
    }

    // Fallback: extract audio via FFmpeg.wasm → WAV → Web Audio decodes that cleanly.
    const wavBytes = await extractAudio(file);
    // `extractAudio` closed its own AudioContext when it took the Web-Audio fast
    // path; to keep decoding independent from its internals, use a fresh context.
    await audioCtx.close();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // Copy into a fresh ArrayBuffer — `decodeAudioData` neuters the input.
    const wavCopy = wavBytes.slice().buffer;
    return await audioCtx.decodeAudioData(wavCopy);
  } finally {
    try { await audioCtx.close(); } catch { /* already closed */ }
  }
}

/**
 * Detect silent sections in an audio/video file.
 *
 * @param {File|Blob} file - The media file to analyze
 * @param {Object} options
 * @param {number} [options.threshold=-40] - RMS amplitude threshold in dB (sections below this are "silent")
 * @param {number} [options.minDuration=0.5] - Minimum silence duration in seconds to count
 * @param {number} [options.windowSize=0.1] - Analysis window size in seconds (100ms default)
 * @returns {Promise<Array<{start: number, end: number}>>} Silent sections
 */
export async function detectSilence(file, options = {}) {
  const {
    threshold = -40,
    minDuration = 0.5,
    windowSize = 0.1,
  } = options;

  const audioBuffer = await decodeAudioBufferFromFile(file);

  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.getChannelData(0); // mono or left channel
  const totalSamples = channelData.length;
  const windowSamples = Math.floor(sampleRate * windowSize);

  // Convert dB threshold to linear amplitude
  // RMS in dB = 20 * log10(rms), so rms = 10^(dB/20)
  const linearThreshold = Math.pow(10, threshold / 20);

  // Calculate RMS for each window
  const silentWindows = [];
  for (let i = 0; i < totalSamples; i += windowSamples) {
    const end = Math.min(i + windowSamples, totalSamples);
    let sumSquares = 0;
    for (let j = i; j < end; j++) {
      sumSquares += channelData[j] * channelData[j];
    }
    const rms = Math.sqrt(sumSquares / (end - i));
    const timeSec = i / sampleRate;

    silentWindows.push({
      time: timeSec,
      isSilent: rms < linearThreshold,
    });
  }

  // Group consecutive silent windows into ranges
  const silentRanges = [];
  let rangeStart = null;

  for (const w of silentWindows) {
    if (w.isSilent) {
      if (rangeStart === null) rangeStart = w.time;
    } else {
      if (rangeStart !== null) {
        const rangeEnd = w.time;
        if (rangeEnd - rangeStart >= minDuration) {
          silentRanges.push({ start: rangeStart, end: rangeEnd });
        }
        rangeStart = null;
      }
    }
  }

  // Handle trailing silence
  if (rangeStart !== null) {
    const rangeEnd = totalSamples / sampleRate;
    if (rangeEnd - rangeStart >= minDuration) {
      silentRanges.push({ start: rangeStart, end: rangeEnd });
    }
  }

  return silentRanges;
}

/**
 * Calculate the total duration of silence.
 * @param {Array<{start: number, end: number}>} ranges
 * @returns {number} Total seconds of silence
 */
export function totalSilenceDuration(ranges) {
  return ranges.reduce((sum, r) => sum + (r.end - r.start), 0);
}

/**
 * Keep only the portion of each silence range that falls inside a source-time window
 * (e.g. the trimmed segment used on the timeline). Drops fragments shorter than minDuration.
 *
 * @param {Array<{start: number, end: number}>} ranges
 * @param {number} windowStart - source seconds (inclusive)
 * @param {number} windowEnd - source seconds (exclusive)
 * @param {number} [minDuration=0.5]
 * @returns {Array<{start: number, end: number}>}
 */
export function intersectSilenceRanges(ranges, windowStart, windowEnd, minDuration = 0.5) {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];
  if (!Number.isFinite(windowStart) || !Number.isFinite(windowEnd) || windowEnd <= windowStart) {
    return ranges;
  }
  const out = [];
  for (const r of ranges) {
    const s = Math.max(r.start, windowStart);
    const e = Math.min(r.end, windowEnd);
    if (e - s >= minDuration) out.push({ start: s, end: e });
  }
  return out;
}
