/**
 * File Upload Utility
 * Handles file uploads to Supabase Storage with real progress tracking and retry.
 *
 * Uses XHR directly against the Supabase Storage REST API instead of the
 * supabase-js client, because fetch (used internally by supabase-js) has no
 * upload progress events. XHR fires xhr.upload.onprogress with real byte counts.
 */

import { supabase, isSupabaseConfigured } from "../supabase/supabaseClient";

const UPLOAD_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // ms, doubled on each retry (exponential backoff)
};

/**
 * Upload a file to Supabase Storage via XHR.
 * Fires real upload progress events and supports AbortSignal cancellation.
 *
 * @param {File|Blob} file
 * @param {string} bucket - Supabase storage bucket name
 * @param {string} path - Storage path (e.g. "userId/projectId/video.mp4")
 * @param {Function} onProgress - Called with 0-100
 * @param {AbortSignal|null} signal
 * @returns {Promise<{path: string, url: string}>}
 */
async function uploadWithXHR(file, bucket, path, onProgress, signal) {
  // Prefer session token for authenticated uploads, fall back to anon key
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  // Preserve path slashes; encode each segment individually
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  const url = `${supabaseUrl}/storage/v1/object/${bucket}/${encodedPath}`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Wire AbortSignal → xhr.abort()
    const onAbort = () => xhr.abort();
    signal?.addEventListener('abort', onAbort);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      signal?.removeEventListener('abort', onAbort);
      if (xhr.status === 200 || xhr.status === 201) {
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
        onProgress(100);
        resolve({ path, url: urlData?.publicUrl ?? '' });
      } else {
        let message = `Upload failed: HTTP ${xhr.status}`;
        try {
          const body = JSON.parse(xhr.responseText);
          if (body.message) message = body.message;
          else if (body.error) message = body.error;
        } catch { /* use default */ }
        reject(new Error(message));
      }
    };

    xhr.onerror = () => {
      signal?.removeEventListener('abort', onAbort);
      reject(new Error('Upload failed — check your connection'));
    };

    xhr.onabort = () => {
      signal?.removeEventListener('abort', onAbort);
      reject(new DOMException('Upload aborted', 'AbortError'));
    };

    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('x-upsert', 'true');
    if (file.type) {
      xhr.setRequestHeader('Content-Type', file.type);
    }
    xhr.send(file);
  });
}

/**
 * Upload a file with progress tracking, retry, and cancellation support.
 *
 * @param {File} file - File to upload
 * @param {string} bucket - Supabase storage bucket
 * @param {string} path - Storage path for the file
 * @param {Object} options - Upload options
 * @param {Function} options.onProgress - Progress callback (0-100)
 * @param {AbortSignal} options.signal - AbortSignal for cancellation
 * @returns {Promise<{path: string, url: string}>} Upload result
 */
export async function uploadFile(file, bucket, path, options = {}) {
  const {
    onProgress = () => {},
    signal = null,
  } = options;

  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured');
  }

  onProgress(0);

  let lastError;
  for (let attempt = 0; attempt < UPLOAD_CONFIG.MAX_RETRIES; attempt++) {
    if (signal?.aborted) {
      throw new DOMException('Upload aborted', 'AbortError');
    }

    try {
      return await uploadWithXHR(file, bucket, path, onProgress, signal);
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      lastError = error;
      if (attempt < UPLOAD_CONFIG.MAX_RETRIES - 1) {
        const delay = UPLOAD_CONFIG.RETRY_DELAY * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        onProgress(0); // reset progress bar for retry
      }
    }
  }

  throw lastError;
}

/**
 * Upload multiple files with overall progress tracking.
 *
 * @param {Array<{file: File, bucket: string, path: string}>} files - Files to upload
 * @param {Object} options - Upload options
 * @param {Function} options.onProgress - Progress callback (0-100) for total
 * @param {Function} options.onFileComplete - Called with (index, result) per file
 * @param {AbortSignal} options.signal - AbortSignal for cancellation
 * @returns {Promise<Array<{path: string, url: string}>>} Upload results
 */
export async function uploadFiles(files, options = {}) {
  const {
    onProgress = () => {},
    onFileComplete = () => {},
    signal = null,
  } = options;

  const results = [];
  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0);
  let uploadedSize = 0;

  for (let i = 0; i < files.length; i++) {
    const { file, bucket, path } = files[i];

    if (signal?.aborted) {
      throw new DOMException('Upload aborted', 'AbortError');
    }

    const fileStartSize = uploadedSize;

    const result = await uploadFile(file, bucket, path, {
      onProgress: (fileProgress) => {
        const fileSizeProgress = (fileProgress / 100) * file.size;
        const totalProgress = Math.round(((fileStartSize + fileSizeProgress) / totalSize) * 100);
        onProgress(totalProgress);
      },
      signal,
    });

    results.push(result);
    uploadedSize += file.size;
    onFileComplete(i, result);
  }

  return results;
}

/**
 * Compress an image before upload using canvas.
 *
 * @param {File} imageFile - Image file to compress
 * @param {Object} options - Compression options
 * @param {number} options.maxWidth - Maximum width (default: 1920)
 * @param {number} options.maxHeight - Maximum height (default: 1080)
 * @param {number} options.quality - JPEG quality 0-1 (default: 0.8)
 * @returns {Promise<Blob>} Compressed image blob
 */
export async function compressImage(imageFile, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(img.src);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image for compression'));
    };

    img.src = URL.createObjectURL(imageFile);
  });
}
