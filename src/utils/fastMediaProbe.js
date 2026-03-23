/**
 * Fast Media Probe — Browser-native replacements for FFmpeg import operations
 *
 * Drop-in replacements for videoOperations.getVideoInfo() and
 * videoOperations.generateThumbnail() that use native browser APIs
 * instead of FFmpeg WASM. Makes import INSTANT instead of waiting
 * for WASM initialization + file processing.
 *
 * Usage in useFFmpeg.js or VideoEditor.jsx:
 *   import { getVideoInfoFast, generateThumbnailFast } from '../utils/fastMediaProbe';
 */

/**
 * Get video metadata using native <video> element
 * Returns duration, width, height — no FFmpeg needed
 *
 * @param {File|Blob} file - Video or audio file
 * @returns {Promise<{duration: number, width: number, height: number}>}
 */
export function getVideoInfoFast(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const isAudio = file.type?.startsWith('audio/');

    if (isAudio) {
      const audio = new Audio();
      audio.preload = 'metadata';

      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve({
          duration: audio.duration || 0,
          width: 0,
          height: 0,
        });
      };

      audio.onerror = () => {
        URL.revokeObjectURL(url);
        // Fallback: return reasonable defaults rather than failing
        resolve({ duration: 0, width: 0, height: 0 });
      };

      audio.src = url;
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata';
    // Mute to avoid autoplay policy issues
    video.muted = true;

    // Timeout fallback — some formats may not fire loadedmetadata
    const timeout = setTimeout(() => {
      URL.revokeObjectURL(url);
      resolve({ duration: 0, width: 0, height: 0 });
    }, 5000);

    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
      resolve({
        duration: isFinite(video.duration) ? video.duration : 0,
        width: video.videoWidth || 0,
        height: video.videoHeight || 0,
      });
    };

    video.onerror = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
      // Don't reject — return defaults so import continues
      resolve({ duration: 0, width: 0, height: 0 });
    };

    video.src = url;
  });
}

/**
 * Generate a thumbnail using native <video> + <canvas>
 * Returns a Blob (image/jpeg) — no FFmpeg needed
 *
 * Seeks the video to the requested time, draws a frame to canvas,
 * and returns the JPEG blob. Takes ~50-200ms vs 2-5s for FFmpeg.
 *
 * @param {File|Blob} file - Video file
 * @param {number} time - Time in seconds to capture (default 0)
 * @returns {Promise<Blob>} JPEG thumbnail blob
 */
export function generateThumbnailFast(file, time = 0) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    // crossOrigin not needed for blob URLs

    const timeout = setTimeout(() => {
      cleanup();
      // Return a tiny transparent PNG as fallback
      resolve(createFallbackThumbnail());
    }, 8000);

    function cleanup() {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
    }

    video.onloadeddata = () => {
      // Seek to requested time (clamped to duration)
      const seekTime = Math.min(time, video.duration - 0.1);
      video.currentTime = Math.max(0, seekTime);
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        // Use a reasonable thumbnail size (not full res)
        const maxWidth = 320;
        const scale = Math.min(1, maxWidth / (video.videoWidth || 320));
        canvas.width = Math.round((video.videoWidth || 320) * scale);
        canvas.height = Math.round((video.videoHeight || 180) * scale);

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            cleanup();
            if (blob) {
              resolve(blob);
            } else {
              resolve(createFallbackThumbnail());
            }
          },
          'image/jpeg',
          0.7 // quality — 0.7 is fine for thumbnails
        );
      } catch (e) {
        cleanup();
        resolve(createFallbackThumbnail());
      }
    };

    video.onerror = () => {
      cleanup();
      resolve(createFallbackThumbnail());
    };

    video.src = url;
  });
}

/**
 * Create a tiny fallback thumbnail (1x1 dark pixel)
 * Used when video thumbnail generation fails
 * @returns {Blob}
 */
function createFallbackThumbnail() {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 90;
  const ctx = canvas.getContext('2d');
  // Dark gradient matching ClipCut's theme
  const grad = ctx.createLinearGradient(0, 0, 160, 90);
  grad.addColorStop(0, '#1a2332');
  grad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 160, 90);
  // Play icon hint
  ctx.fillStyle = 'rgba(117, 170, 219, 0.3)';
  ctx.beginPath();
  ctx.moveTo(65, 30);
  ctx.lineTo(65, 60);
  ctx.lineTo(100, 45);
  ctx.closePath();
  ctx.fill();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob || new Blob()), 'image/jpeg', 0.7);
  });
}
