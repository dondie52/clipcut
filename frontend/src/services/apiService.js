/**
 * API Service — communicates with the FastAPI backend for video processing.
 * Replaces client-side FFmpeg.wasm + Cloudflare Workers AI calls.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://185.215.166.46:8090';

/**
 * Upload a video file to the backend (single request, no chunking).
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

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const MAX_CHUNK_RETRIES = 3;

/**
 * Upload a video in chunks with resume support.
 * Falls back to single-request upload for small files (<10MB).
 * Server receives chunks at /api/upload-chunk and /api/upload-complete.
 * If the server doesn't support chunked upload, falls back to single upload.
 */
export async function uploadVideoChunked(file, onProgress) {
  // Small files: use regular upload
  if (file.size < CHUNK_SIZE * 2) {
    return uploadVideo(file, onProgress);
  }

  // Try chunked upload — fall back to single if server doesn't support it
  try {
    // 1. Initialize chunked upload
    const initRes = await fetch(`${API_BASE}/api/upload-init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, fileSize: file.size, mimeType: file.type }),
    });

    if (!initRes.ok) {
      // Server doesn't support chunked upload — fall back
      return uploadVideo(file, onProgress);
    }

    const { uploadId } = await initRes.json();
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedChunks = 0;

    // 2. Upload chunks sequentially with retry
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      let success = false;
      for (let attempt = 0; attempt < MAX_CHUNK_RETRIES && !success; attempt++) {
        try {
          const form = new FormData();
          form.append('chunk', chunk);
          form.append('uploadId', uploadId);
          form.append('chunkIndex', String(i));
          form.append('totalChunks', String(totalChunks));

          const res = await fetch(`${API_BASE}/api/upload-chunk`, { method: 'POST', body: form });
          if (res.ok) {
            success = true;
            uploadedChunks++;
            if (onProgress) onProgress(Math.round((uploadedChunks / totalChunks) * 95)); // Reserve 5% for finalize
          } else if (attempt === MAX_CHUNK_RETRIES - 1) {
            throw new Error(`Chunk ${i} upload failed after ${MAX_CHUNK_RETRIES} retries`);
          }
        } catch (err) {
          if (attempt === MAX_CHUNK_RETRIES - 1) throw err;
          // Wait before retry with exponential backoff
          await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        }
      }
    }

    // 3. Finalize — server assembles chunks and returns metadata
    if (onProgress) onProgress(97);
    const completeRes = await fetch(`${API_BASE}/api/upload-complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uploadId, filename: file.name }),
    });

    if (!completeRes.ok) {
      const err = await completeRes.json().catch(() => ({}));
      throw new Error(err.detail || 'Upload finalization failed');
    }

    if (onProgress) onProgress(100);
    return completeRes.json();
  } catch (err) {
    // If chunked upload fails at init, fall back to single upload
    if (err.message?.includes('upload-init')) {
      return uploadVideo(file, onProgress);
    }
    throw err;
  }
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

/**
 * Check if the server-side export endpoint is available.
 * @returns {Promise<boolean>}
 */
export async function isServerExportAvailable() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE}/api/editor/health`, { signal: controller.signal });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Export a video via the server (native FFmpeg — much faster than WASM).
 * @param {Blob} videoBlob - The merged video blob
 * @param {string} resolution - Target resolution (480p, 720p, 1080p)
 * @param {Object} [options] - Additional export options
 * @param {File} [options.audioFile] - Background music file
 * @param {number} [options.audioVolume] - Background music volume (0-1)
 * @param {string} [options.text] - Text overlay content
 * @param {string} [options.textPosition] - Text position preset
 * @param {number} [options.textSize] - Text font size
 * @param {string} [options.textColor] - Text color
 * @param {string} [options.textBgColor] - Text background color
 * @param {(pct: number) => void} [onProgress] - Upload progress callback
 * @param {AbortSignal} [abortSignal] - Optional cancellation signal
 * @returns {Promise<Blob>} Exported video as a Blob
 */
export function serverExport(videoBlob, resolution, options = {}, onProgress, abortSignal) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('video', videoBlob, 'input.mp4');
    formData.append('resolution', resolution);

    if (options.audioFile) {
      formData.append('audio', options.audioFile);
      formData.append('audio_volume', String(options.audioVolume ?? 0.3));
    }
    if (options.text) {
      formData.append('text', options.text);
      formData.append('text_position', options.textPosition || 'bottom-center');
      formData.append('text_size', String(options.textSize || 48));
      formData.append('text_color', options.textColor || 'white');
      formData.append('text_bg_color', options.textBgColor || '');
    }

    // Track upload progress (upload is typically the slow part)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        // Upload is ~50% of total time, processing is the other ~50%
        onProgress(Math.round((e.loaded / e.total) * 50));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        let detail = `Server export failed: ${xhr.status}`;
        try {
          // Response might be JSON error if not binary
          const text = new TextDecoder().decode(xhr.response);
          const err = JSON.parse(text);
          if (err.detail) detail = err.detail;
        } catch { /* use default */ }
        reject(new Error(detail));
      }
    };

    xhr.onerror = () => reject(new Error('Server export failed — check connection'));
    xhr.ontimeout = () => reject(new Error('Server export timed out'));
    xhr.responseType = 'blob';
    xhr.timeout = 300000; // 5 minutes

    xhr.open('POST', `${API_BASE}/api/editor/export`);

    if (abortSignal) {
      const onAbort = () => {
        try { xhr.abort(); } catch { /* noop */ }
        reject(new Error('Export cancelled.'));
      };
      if (abortSignal.aborted) {
        onAbort();
        return;
      }
      abortSignal.addEventListener('abort', onAbort, { once: true });
      xhr.addEventListener('loadend', () => {
        abortSignal.removeEventListener('abort', onAbort);
      }, { once: true });
    }

    xhr.send(formData);
  });
}
