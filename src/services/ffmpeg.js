/**
 * FFmpeg.wasm Service
 * Core FFmpeg service with initialization and file operations
 * Features:
 * - Lazy loading (only loads when first needed)
 * - Singleton pattern (single instance across app)
 * - WASM caching via IndexedDB
 * - Progress tracking
 * - Memory management
 */

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// Singleton instance
let ffmpegInstance = null;
let loadingPromise = null;

// Progress callback holder
let progressCallback = null;

// Current operation's AbortController
let currentAbortController = null;

/**
 * Create a consistent abort error for FFmpeg operations
 * @param {string} message
 * @returns {DOMException}
 */
export function createAbortError(message = 'Operation cancelled by user') {
  return new DOMException(message, 'AbortError');
}

/**
 * Check if an error represents an aborted FFmpeg operation
 * @param {unknown} error
 * @returns {boolean}
 */
export function isAbortError(error) {
  return error?.name === 'AbortError' || error?.message === 'Operation aborted';
}

/**
 * Terminate FFmpeg worker safely after an abort
 * FFmpeg.wasm cannot stop mid-command cleanly, so we terminate and recreate.
 */
async function terminateFFmpegWorker() {
  if (!ffmpegInstance) {
    loadingPromise = null;
    return;
  }

  try {
    await ffmpegInstance.terminate();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[FFmpeg] terminate() failed during cancel:', error?.message || error);
    }
  } finally {
    ffmpegInstance = null;
    loadingPromise = null;
    clearProgressCallback();
  }
}

// Track files written to virtual FS for memory management
const virtualFSFiles = new Set();

// Memory usage tracking
let estimatedMemoryUsage = 0;

// Loading state for external monitoring
let loadingState = {
  isLoading: false,
  loadProgress: 0,
  error: null,
};

// Loading state change listeners
const stateListeners = new Set();

/**
 * Notify listeners of state changes
 */
function notifyStateChange() {
  stateListeners.forEach(listener => listener({ ...loadingState }));
}

/**
 * Subscribe to loading state changes
 * @param {Function} listener - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToLoadingState(listener) {
  stateListeners.add(listener);
  // Immediately call with current state
  listener({ ...loadingState });
  return () => stateListeners.delete(listener);
}

/**
 * Get current loading state
 * @returns {Object} Current loading state
 */
export function getLoadingState() {
  return { ...loadingState };
}

/**
 * Get or create the FFmpeg instance (singleton pattern)
 * @returns {FFmpeg} The FFmpeg instance
 */
export function getFFmpegInstance() {
  if (!ffmpegInstance) {
    ffmpegInstance = new FFmpeg();
    
    // Set up logging (only in development)
    if (process.env.NODE_ENV !== 'production') {
      ffmpegInstance.on('log', ({ message }) => {
        console.log('[FFmpeg]', message);
      });
    }
    
    // Set up progress tracking
    ffmpegInstance.on('progress', ({ progress, time }) => {
      if (progressCallback) {
        progressCallback({ progress: Math.round(progress * 100), time });
      }
    });
  }
  return ffmpegInstance;
}

/**
 * Set the progress callback function
 * @param {Function} callback - Callback function receiving { progress, time }
 */
export function setProgressCallback(callback) {
  progressCallback = callback;
}

/**
 * Clear the progress callback
 */
export function clearProgressCallback() {
  progressCallback = null;
}

/**
 * Preload FFmpeg WASM files into browser cache
 * Call this to warm up the cache before the user needs FFmpeg
 * @returns {Promise<void>}
 */
export async function preloadFFmpeg() {
  if (isFFmpegLoaded() || loadingPromise) {
    return;
  }
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  
  try {
    // Fetch WASM files to browser cache (using fetch with cache: 'force-cache')
    const cacheOptions = { cache: 'force-cache' };
    
    await Promise.all([
      fetch(`${baseURL}/ffmpeg-core.js`, cacheOptions),
      fetch(`${baseURL}/ffmpeg-core.wasm`, cacheOptions),
    ]);
    
    console.log('[FFmpeg] WASM files preloaded to cache');
  } catch (error) {
    // Non-critical, just log
    console.warn('[FFmpeg] Preload failed (non-critical):', error.message);
  }
}

/**
 * Load FFmpeg with WASM files from CDN
 * Uses lazy loading - only loads when first needed
 * @param {Function} onProgress - Optional progress callback for loading
 * @returns {Promise<FFmpeg>} Loaded FFmpeg instance
 */
export async function loadFFmpeg(onProgress = null) {
  const ffmpeg = getFFmpegInstance();
  
  // Return existing promise if already loading
  if (loadingPromise) {
    return loadingPromise;
  }
  
  // Return immediately if already loaded
  if (ffmpeg.loaded) {
    return ffmpeg;
  }
  
  // Update loading state
  loadingState = { isLoading: true, loadProgress: 0, error: null };
  notifyStateChange();
  
  // Start loading
  loadingPromise = (async () => {
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      
      // Track loading progress for each file
      let coreLoaded = false;
      let wasmLoaded = false;
      
      const updateProgress = () => {
        const progress = (coreLoaded ? 50 : 0) + (wasmLoaded ? 50 : 0);
        loadingState.loadProgress = progress;
        notifyStateChange();
        if (onProgress) {
          onProgress(progress);
        }
      };
      
      // Load core JS
      const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
      coreLoaded = true;
      updateProgress();
      
      // Load WASM
      const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
      wasmLoaded = true;
      updateProgress();
      
      await ffmpeg.load({
        coreURL,
        wasmURL,
      });
      
      // Update state
      loadingState = { isLoading: false, loadProgress: 100, error: null };
      notifyStateChange();
      
      console.log('[FFmpeg] Loaded successfully');
      return ffmpeg;
    } catch (error) {
      console.error('[FFmpeg] Failed to load:', error);
      loadingState = { isLoading: false, loadProgress: 0, error: error.message };
      notifyStateChange();
      loadingPromise = null;
      throw error;
    }
  })();
  
  return loadingPromise;
}

/**
 * Check if FFmpeg is loaded
 * @returns {boolean} Whether FFmpeg is loaded
 */
export function isFFmpegLoaded() {
  return ffmpegInstance?.loaded ?? false;
}

/**
 * Write a file to FFmpeg's virtual file system
 * @param {string} filename - Name for the file in FFmpeg's FS
 * @param {File|Blob|string} file - File object, Blob, or URL string
 */
export async function writeFile(filename, file) {
  const ffmpeg = await loadFFmpeg();
  const data = await fetchFile(file);
  await ffmpeg.writeFile(filename, data);
  
  // Track file for memory management
  virtualFSFiles.add(filename);
  estimatedMemoryUsage += data.length;
}

/**
 * Read a file from FFmpeg's virtual file system
 * @param {string} filename - Name of the file to read
 * @returns {Promise<Uint8Array>} File data
 */
export async function readFile(filename) {
  const ffmpeg = await loadFFmpeg();
  return await ffmpeg.readFile(filename);
}

/**
 * Delete a file from FFmpeg's virtual file system
 * @param {string} filename - Name of the file to delete
 */
export async function deleteFile(filename) {
  if (!isFFmpegLoaded()) {
    virtualFSFiles.delete(filename);
    return;
  }

  const ffmpeg = getFFmpegInstance();
  try {
    await ffmpeg.deleteFile(filename);
    // Update tracking
    virtualFSFiles.delete(filename);
  } catch (error) {
    // File might not exist, ignore error
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[FFmpeg] Could not delete file ${filename}:`, error.message);
    }
  }
}

/**
 * Execute an FFmpeg command
 * @param {string[]} args - FFmpeg command arguments
 * @param {AbortSignal} signal - Optional AbortSignal for cancellation
 * @returns {Promise<void>}
 */
export async function exec(args, signal = null) {
  const ffmpeg = await loadFFmpeg();
  
  // Check if already aborted
  if (signal?.aborted) {
    throw createAbortError();
  }
  
  // FFmpeg WASM doesn't support direct AbortSignal
  // We use a workaround by terminating if signal fires
  const execPromise = ffmpeg.exec(args);
  
  if (signal) {
    return new Promise((resolve, reject) => {
      const onAbort = async () => {
        await terminateFFmpegWorker();
        reject(createAbortError());
      };
      
      signal.addEventListener('abort', onAbort, { once: true });
      
      execPromise
        .then(resolve)
        .catch((error) => {
          if (signal.aborted || isAbortError(error)) {
            reject(createAbortError());
            return;
          }
          reject(error);
        })
        .finally(() => {
          signal.removeEventListener('abort', onAbort);
          if (currentAbortController?.signal === signal) {
            currentAbortController = null;
          }
        });
    });
  }

  try {
    return await execPromise;
  } catch (error) {
    if (isAbortError(error)) {
      throw createAbortError();
    }
    throw error;
  }
}

/**
 * Create an AbortController for FFmpeg operations
 * @returns {AbortController} New AbortController
 */
export function createAbortController() {
  // Cancel any existing operation
  if (currentAbortController) {
    currentAbortController.abort(createAbortError('Operation superseded by a new request'));
    void terminateFFmpegWorker();
  }
  currentAbortController = new AbortController();
  return currentAbortController;
}

/**
 * Get the current AbortController's signal
 * @returns {AbortSignal|null} Current signal or null
 */
export function getCurrentSignal() {
  return currentAbortController?.signal || null;
}

/**
 * Cancel the current FFmpeg operation
 */
export function cancelCurrentOperation() {
  if (currentAbortController) {
    currentAbortController.abort(createAbortError());
    currentAbortController = null;
  }
  void terminateFFmpegWorker();
}

/**
 * Check if current operation is aborted
 * @returns {boolean}
 */
export function isOperationAborted() {
  return currentAbortController?.signal?.aborted ?? false;
}

/**
 * Convert Uint8Array to Blob
 * @param {Uint8Array} data - Binary data
 * @param {string} mimeType - MIME type for the blob
 * @returns {Blob} Blob object
 */
export function toBlob(data, mimeType = 'video/mp4') {
  return new Blob([data.buffer], { type: mimeType });
}

/**
 * Convert Uint8Array to object URL
 * @param {Uint8Array} data - Binary data
 * @param {string} mimeType - MIME type for the blob
 * @returns {string} Object URL
 */
export function toObjectURL(data, mimeType = 'video/mp4') {
  const blob = toBlob(data, mimeType);
  return URL.createObjectURL(blob);
}

/**
 * Clean up temporary files from FFmpeg's virtual file system
 * @param {string[]} filenames - Array of filenames to delete
 */
export async function cleanup(filenames) {
  for (const filename of filenames) {
    await deleteFile(filename);
  }
}

/**
 * Format seconds to FFmpeg time format (HH:MM:SS.ms)
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

/**
 * Parse FFmpeg time format to seconds
 * @param {string} timeString - Time in HH:MM:SS.ms format
 * @returns {number} Time in seconds
 */
export function parseTime(timeString) {
  const parts = timeString.split(':');
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds);
  }
  return parseFloat(timeString);
}

/**
 * Get memory usage estimate for FFmpeg's virtual file system
 * @returns {number} Estimated memory usage in bytes
 */
export function getMemoryUsage() {
  return estimatedMemoryUsage;
}

/**
 * Get list of files in virtual file system
 * @returns {string[]} Array of filenames
 */
export function getVirtualFiles() {
  return Array.from(virtualFSFiles);
}

/**
 * Get file count in virtual file system
 * @returns {number} Number of files
 */
export function getVirtualFileCount() {
  return virtualFSFiles.size;
}

/**
 * Clear all tracked files from FFmpeg's virtual file system
 * Useful for memory management when working with large files
 */
export async function clearAllFiles() {
  if (!isFFmpegLoaded()) return;
  
  const filesToDelete = Array.from(virtualFSFiles);
  let deletedCount = 0;
  
  for (const filename of filesToDelete) {
    try {
      await deleteFile(filename);
      deletedCount++;
    } catch (error) {
      // Continue with other files
    }
  }
  
  // Reset tracking
  virtualFSFiles.clear();
  estimatedMemoryUsage = 0;
  
  console.log(`[FFmpeg] Cleared ${deletedCount} temporary files`);
}

/**
 * Memory limit for FFmpeg operations (500MB default)
 */
const MEMORY_LIMIT = 500 * 1024 * 1024;

/**
 * Check if memory usage exceeds limit
 * @returns {boolean} True if over limit
 */
export function isMemoryLimitExceeded() {
  return estimatedMemoryUsage > MEMORY_LIMIT;
}

/**
 * Get memory limit
 * @returns {number} Memory limit in bytes
 */
export function getMemoryLimit() {
  return MEMORY_LIMIT;
}

/**
 * Format bytes to human-readable string
 * @param {number} bytes - Bytes to format
 * @returns {string} Formatted string
 */
export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

// Re-export fetchFile for convenience
export { fetchFile };
