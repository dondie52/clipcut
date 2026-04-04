/**
 * Beat Detection Service
 *
 * Detects audio beats/onsets using spectral flux analysis via the Web Audio API.
 * Runs entirely in the browser — no ML model or external service needed.
 */

/**
 * Detect beat/onset timestamps from a media file.
 *
 * @param {File|Blob} file - Audio or video file
 * @param {Object} options
 * @param {number} [options.sensitivity=1.5] - Peak detection multiplier over local average
 * @param {number} [options.minInterval=0.15] - Minimum seconds between beats
 * @returns {Promise<{ beats: number[], bpm: number }>}
 */
export async function detectBeats(file, options = {}) {
  const {
    sensitivity = 1.5,
    minInterval = 0.15,
  } = options;

  // Decode audio
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  let audioBuffer;
  try {
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } finally {
    await audioCtx.close();
  }

  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.getChannelData(0);
  const totalSamples = channelData.length;

  // FFT parameters
  const fftSize = 2048;
  const hopSize = fftSize / 2; // 50% overlap
  const numBins = fftSize / 2;

  // Compute spectral flux for each frame
  const fluxValues = [];
  let prevSpectrum = null;

  for (let offset = 0; offset + fftSize <= totalSamples; offset += hopSize) {
    // Extract windowed frame
    const frame = new Float32Array(fftSize);
    for (let i = 0; i < fftSize; i++) {
      // Apply Hann window
      const windowVal = 0.5 * (1 - Math.cos(2 * Math.PI * i / (fftSize - 1)));
      frame[i] = channelData[offset + i] * windowVal;
    }

    // Compute magnitude spectrum via DFT (simplified — real FFT)
    const spectrum = computeMagnitudeSpectrum(frame, numBins);

    if (prevSpectrum) {
      // Spectral flux: sum of positive differences (half-wave rectification)
      let flux = 0;
      for (let i = 0; i < numBins; i++) {
        const diff = spectrum[i] - prevSpectrum[i];
        if (diff > 0) flux += diff;
      }
      fluxValues.push(flux);
    }

    prevSpectrum = spectrum;
  }

  if (fluxValues.length === 0) return { beats: [], bpm: 0 };

  // Adaptive thresholding: compare each flux value against local median
  const windowRadius = 5;
  const beats = [];
  let lastBeatIdx = -Infinity;
  const minSamples = Math.floor(minInterval * sampleRate / hopSize);

  for (let i = 0; i < fluxValues.length; i++) {
    // Local window for median
    const start = Math.max(0, i - windowRadius);
    const end = Math.min(fluxValues.length, i + windowRadius + 1);
    const localWindow = fluxValues.slice(start, end);
    localWindow.sort((a, b) => a - b);
    const localMedian = localWindow[Math.floor(localWindow.length / 2)];

    if (fluxValues[i] > sensitivity * localMedian && (i - lastBeatIdx) >= minSamples) {
      const timeSec = (i * hopSize) / sampleRate;
      beats.push(timeSec);
      lastBeatIdx = i;
    }
  }

  // Estimate BPM from median inter-beat interval
  let bpm = 0;
  if (beats.length >= 2) {
    const intervals = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }
    intervals.sort((a, b) => a - b);
    const medianInterval = intervals[Math.floor(intervals.length / 2)];
    if (medianInterval > 0) {
      bpm = 60 / medianInterval;
      // Clamp to reasonable range
      while (bpm < 60) bpm *= 2;
      while (bpm > 200) bpm /= 2;
    }
  }

  return { beats, bpm: Math.round(bpm) };
}

/**
 * Compute magnitude spectrum from a windowed time-domain frame.
 * Uses a simplified DFT for the required frequency bins.
 */
function computeMagnitudeSpectrum(frame, numBins) {
  const N = frame.length;
  const spectrum = new Float32Array(numBins);

  for (let k = 0; k < numBins; k++) {
    let real = 0;
    let imag = 0;
    const freq = (2 * Math.PI * k) / N;

    for (let n = 0; n < N; n++) {
      real += frame[n] * Math.cos(freq * n);
      imag -= frame[n] * Math.sin(freq * n);
    }

    spectrum[k] = Math.sqrt(real * real + imag * imag);
  }

  return spectrum;
}
