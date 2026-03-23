/**
 * API Service — communicates with the FastAPI backend for video processing.
 * Replaces client-side FFmpeg.wasm + Cloudflare Workers AI calls.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://185.215.166.46:8090';

/**
 * Upload a video file to the backend.
 * @param {File} file - Video file to upload
 * @param {(pct: number) => void} [onProgress] - Upload progress callback (0-100)
 * @returns {Promise<{ jobId: string, duration: number, width: number, height: number, fps: number, codec: string, fileSize: number }>}
 */
export function uploadVideo(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('video', file);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error('Invalid response from server'));
        }
      } else {
        let detail = `Upload failed: ${xhr.status}`;
        try {
          const err = JSON.parse(xhr.responseText);
          if (err.detail) detail = err.detail;
        } catch { /* use default */ }
        reject(new Error(detail));
      }
    };

    xhr.onerror = () => reject(new Error('Upload failed — check your connection'));
    xhr.ontimeout = () => reject(new Error('Upload timed out'));

    xhr.open('POST', `${API_BASE}/api/upload`);
    xhr.send(formData);
  });
}

/**
 * Import a YouTube video by URL — the server downloads it with yt-dlp.
 * Faster than uploading from the browser; server downloads at datacenter speed.
 * @param {string} url - YouTube URL (watch, shorts, or youtu.be)
 * @returns {Promise<{ jobId: string, duration: number, width: number, height: number, fps: number, codec: string, fileSize: number }>}
 */
export async function importUrl(url) {
  const res = await fetch(`${API_BASE}/api/import-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Import failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Analyze a previously uploaded video to detect interesting segments.
 * @param {string} jobId - Job ID from upload
 * @param {number} [clipDuration=30] - Target clip length in seconds
 * @returns {Promise<{ jobId: string, segments: Array<{ startSeconds: number, endSeconds: number, label: string, reason: string, hookTitle?: string, score?: number, transcriptSnippet?: string, words?: Array }> }>}
 */
export async function analyzeVideo(jobId, clipDuration = 30) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, clipDuration }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Analysis failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Export clips from analyzed segments.
 * @param {string} jobId - Job ID from upload
 * @param {Array} segments - Segments to export (with startSeconds, endSeconds)
 * @param {boolean} [vertical=false] - If true, center-crop to 9:16 for TikTok/Reels
 * @returns {Promise<{ jobId: string, clips: Array<{ segmentId: string, downloadUrl: string, thumbnailUrl?: string }> }>}
 */
export async function exportClips(jobId, segments, vertical = false) {
  const res = await fetch(`${API_BASE}/api/export`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, segments, vertical }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Export failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Get the status of a processing job.
 * @param {string} jobId
 * @returns {Promise<{ status: string, progress?: number }>}
 */
export async function getJobStatus(jobId) {
  const res = await fetch(`${API_BASE}/api/status/${jobId}`);
  if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
  return res.json();
}

/** Resolve a URL from the API response — prefix with API_BASE if relative. */
export function resolveApiUrl(url) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** Build a full download URL for a finished clip. */
export function getDownloadUrl(jobId, segmentId) {
  return `${API_BASE}/api/download/${jobId}/${segmentId}`;
}

/** Build a thumbnail URL for a segment. */
export function getThumbnailUrl(jobId, segmentId) {
  return `${API_BASE}/api/thumbnail/${jobId}/${segmentId}`;
}
