/**
 * Silence Detection Service
 *
 * Uses the Web Audio API to analyze audio amplitude and identify silent sections.
 * Returns an array of { start, end } ranges where silence was detected.
 */

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

  // Decode audio from the file
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  let audioBuffer;
  try {
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } finally {
    await audioCtx.close();
  }

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
