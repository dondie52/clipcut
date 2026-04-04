/**
 * Scene Change Detection Service
 *
 * Detects scene changes in a video by comparing consecutive frames using
 * canvas pixel differencing. Runs entirely in the browser — no ML model needed.
 */

/**
 * Detect scene change timestamps in a video file.
 *
 * @param {File|Blob} file - Video file to analyze
 * @param {Object} options
 * @param {number} [options.sampleRate=2] - Frames per second to sample
 * @param {number} [options.threshold=0.35] - Normalized diff threshold (0-1); higher = fewer detections
 * @param {number} [options.minGap=2.0] - Minimum seconds between scene changes
 * @returns {Promise<number[]>} Array of timestamps (seconds) where scene changes occur
 */
export async function detectSceneChanges(file, options = {}) {
  const {
    sampleRate = 2,
    threshold = 0.35,
    minGap = 2.0,
  } = options;

  // Create video element to seek through frames
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  const objUrl = URL.createObjectURL(file);
  video.src = objUrl;

  // Wait for metadata to get duration
  await new Promise((resolve, reject) => {
    video.onloadedmetadata = resolve;
    video.onerror = () => reject(new Error('Failed to load video for scene detection'));
  });

  const duration = video.duration;
  if (!duration || !isFinite(duration)) {
    URL.revokeObjectURL(objUrl);
    throw new Error('Could not determine video duration');
  }

  // Small canvas for fast comparison (320×180)
  const W = 320;
  const H = 180;
  const canvasA = new OffscreenCanvas(W, H);
  const canvasB = new OffscreenCanvas(W, H);
  const ctxA = canvasA.getContext('2d');
  const ctxB = canvasB.getContext('2d');
  const totalPixels = W * H * 3; // RGB channels

  const sceneChanges = [];
  const interval = 1 / sampleRate;
  let prevCtx = null;
  let lastSceneTime = -minGap; // allow first detection

  for (let t = 0; t < duration; t += interval) {
    // Seek to time
    video.currentTime = t;
    await new Promise((resolve) => {
      video.onseeked = resolve;
    });

    // Draw frame to current canvas
    const curCtx = prevCtx === ctxA ? ctxB : ctxA;
    curCtx.drawImage(video, 0, 0, W, H);

    if (prevCtx) {
      // Compare with previous frame
      const prevData = prevCtx.getImageData(0, 0, W, H).data;
      const curData = curCtx.getImageData(0, 0, W, H).data;

      let diffSum = 0;
      for (let i = 0; i < prevData.length; i += 4) {
        diffSum += Math.abs(curData[i] - prevData[i]);       // R
        diffSum += Math.abs(curData[i + 1] - prevData[i + 1]); // G
        diffSum += Math.abs(curData[i + 2] - prevData[i + 2]); // B
      }

      const normalizedDiff = diffSum / (totalPixels * 255);

      if (normalizedDiff > threshold && (t - lastSceneTime) >= minGap) {
        sceneChanges.push(t);
        lastSceneTime = t;
      }
    }

    prevCtx = curCtx;
  }

  // Cleanup
  URL.revokeObjectURL(objUrl);

  return sceneChanges;
}
