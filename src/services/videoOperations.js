/**
 * Video Operations Service
 * Core video processing functions using FFmpeg.wasm
 */

import {
  loadFFmpeg,
  writeFile,
  readFile,
  exec,
  toBlob,
  cleanup,
  formatTime,
  setProgressCallback,
  clearProgressCallback,
  createAbortController,
  createAbortError,
  isAbortError
} from './ffmpeg';
import { trackVideoOperation, METRIC_TYPES } from '../utils/performance';

/**
 * Resolution presets for video export
 */
export const RESOLUTIONS = {
  '480p': { width: 854, height: 480, label: '480p (SD)' },
  '720p': { width: 1280, height: 720, label: '720p (HD)' },
  '1080p': { width: 1920, height: 1080, label: '1080p (Full HD)' }
};

/**
 * Trim a video clip
 * @param {File|Blob} inputFile - Input video file
 * @param {number} startTime - Start time in seconds
 * @param {number} duration - Duration in seconds
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Trimmed video as Blob
 */
export async function trimVideo(inputFile, startTime, duration, onProgress = null, signal = null) {
  return trackVideoOperation(
    METRIC_TYPES.VIDEO_TRIM,
    async () => {
      await loadFFmpeg();
      
      if (onProgress) setProgressCallback(onProgress);
      
      const inputName = 'input_trim.mp4';
      const outputName = 'output_trim.mp4';
      const operationSignal = signal || createAbortController().signal;
      
      try {
        await writeFile(inputName, inputFile);
        
        await exec([
          '-i', inputName,
          '-ss', formatTime(startTime),
          '-t', formatTime(duration),
          '-c', 'copy',
          '-avoid_negative_ts', 'make_zero',
          outputName
        ], operationSignal);
        
        const data = await readFile(outputName);
        return toBlob(data, 'video/mp4');
      } catch (error) {
        if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
        throw error;
      } finally {
        clearProgressCallback();
        await cleanup([inputName, outputName]);
      }
    },
    {
      startTime,
      duration,
      fileSize: inputFile.size,
    }
  );
}

/**
 * Split a video at a specific point
 * @param {File|Blob} inputFile - Input video file
 * @param {number} splitTime - Time in seconds where to split
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<{part1: Blob, part2: Blob}>} Two video parts as Blobs
 */
export async function splitVideo(inputFile, splitTime, onProgress = null, signal = null) {
  return trackVideoOperation(
    METRIC_TYPES.VIDEO_SPLIT,
    async () => {
      await loadFFmpeg();
      
      if (onProgress) setProgressCallback(onProgress);
      
      const inputName = 'input_split.mp4';
      const output1Name = 'output_split_1.mp4';
      const output2Name = 'output_split_2.mp4';
      const operationSignal = signal || createAbortController().signal;
      
      try {
        await writeFile(inputName, inputFile);
        
        // First part: from start to split point
        await exec([
          '-i', inputName,
          '-t', formatTime(splitTime),
          '-c', 'copy',
          output1Name
        ], operationSignal);
        
        // Second part: from split point to end
        await exec([
          '-i', inputName,
          '-ss', formatTime(splitTime),
          '-c', 'copy',
          output2Name
        ], operationSignal);
        
        const data1 = await readFile(output1Name);
        const data2 = await readFile(output2Name);
        
        return {
          part1: toBlob(data1, 'video/mp4'),
          part2: toBlob(data2, 'video/mp4')
        };
      } catch (error) {
        if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
        throw error;
      } finally {
        clearProgressCallback();
        await cleanup([inputName, output1Name, output2Name]);
      }
    },
    {
      splitTime,
      fileSize: inputFile.size,
    }
  );
}

/**
 * Merge multiple video clips into one
 * @param {Array<File|Blob>} clipFiles - Array of video files to merge
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Merged video as Blob
 */
export async function mergeClips(clipFiles, onProgress = null, signal = null) {
  if (clipFiles.length === 0) {
    throw new Error('No clips to merge');
  }
  
  if (clipFiles.length === 1) {
    // Just return the single clip as-is
    const arrayBuffer = await clipFiles[0].arrayBuffer();
    return new Blob([arrayBuffer], { type: 'video/mp4' });
  }
  
  return trackVideoOperation(
    METRIC_TYPES.VIDEO_MERGE,
    async () => {
      await loadFFmpeg();
      
      if (onProgress) setProgressCallback(onProgress);
      
      const inputNames = [];
      const concatListName = 'concat_list.txt';
      const outputName = 'output_merged.mp4';
      const operationSignal = signal || createAbortController().signal;
      
      try {
        // Write all input files and create concat list
        let concatList = '';
        
        for (let i = 0; i < clipFiles.length; i++) {
          const inputName = `input_merge_${i}.mp4`;
          inputNames.push(inputName);
          await writeFile(inputName, clipFiles[i]);
          concatList += `file '${inputName}'\n`;
        }
        
        // Write concat list file
        const encoder = new TextEncoder();
        await writeFile(concatListName, encoder.encode(concatList));
        
        // Merge using concat demuxer with copy codec (fast, no re-encoding)
        // If copy fails due to codec mismatch, fall back to re-encoding
        try {
          await exec([
            '-f', 'concat',
            '-safe', '0',
            '-i', concatListName,
            '-c', 'copy',  // Fast copy without re-encoding
            '-avoid_negative_ts', 'make_zero',  // Handle timestamp issues
            outputName
          ], operationSignal);
        } catch (copyError) {
          if (isAbortError(copyError) || operationSignal.aborted) throw createAbortError();
          // If copy fails (codec mismatch), re-encode with fast settings
          console.warn('[FFmpeg] Copy failed, re-encoding with fast preset:', copyError);
          await exec([
            '-f', 'concat',
            '-safe', '0',
            '-i', concatListName,
            '-c:v', 'libx264',
            '-preset', 'veryfast',   // Fast encoding with good quality
            '-crf', '23',
            '-c:a', 'aac',
            '-b:a', '128k',
            outputName
          ], operationSignal);
        }
        
        const data = await readFile(outputName);
        return toBlob(data, 'video/mp4');
      } catch (error) {
        if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
        throw error;
      } finally {
        clearProgressCallback();
        await cleanup([...inputNames, concatListName, outputName]);
      }
    },
    {
      clipCount: clipFiles.length,
      totalSize: clipFiles.reduce((sum, file) => sum + file.size, 0),
    }
  );
}

/**
 * Export video at a specific resolution
 * @param {File|Blob} inputFile - Input video file
 * @param {string} resolution - Resolution key ('480p', '720p', '1080p')
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Exported video as Blob
 */
export async function exportVideo(inputFile, resolution = '1080p', onProgress = null, signal = null) {
  return trackVideoOperation(
    METRIC_TYPES.VIDEO_EXPORT,
    async () => {
      await loadFFmpeg();
      
      if (onProgress) setProgressCallback(onProgress);
      
      const { width, height } = RESOLUTIONS[resolution] || RESOLUTIONS['1080p'];
      const inputName = 'input_export.mp4';
      const outputName = 'output_export.mp4';
      const operationSignal = signal || createAbortController().signal;
      
      try {
        await writeFile(inputName, inputFile);
        
        // Optimized for faster encoding in browser environment
        // Using 'veryfast' preset - good balance between speed and quality
        // 'ultrafast' is fastest but lower quality, 'fast' is slower but better quality
        // CRF 23 is good quality, can be increased to 25-28 for faster encoding (lower quality)
        await exec([
          '-i', inputName,
          '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`,
          '-c:v', 'libx264',
          '-preset', 'veryfast',     // Changed from 'medium' to 'veryfast' for faster encoding (good speed/quality balance)
          '-crf', '23',               // Good quality, can increase to 25-28 for faster encoding
          '-tune', 'fastdecode',      // Optimize for fast decoding
          '-c:a', 'aac',
          '-b:a', '128k',
          '-movflags', '+faststart',  // Enable fast start for web playback
          '-threads', '0',            // Use all available threads
          outputName
        ], operationSignal);
        
        const data = await readFile(outputName);
        return toBlob(data, 'video/mp4');
      } catch (error) {
        if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
        throw error;
      } finally {
        clearProgressCallback();
        await cleanup([inputName, outputName]);
      }
    },
    {
      resolution,
      fileSize: inputFile.size,
    }
  );
}

/**
 * Get video information (duration, resolution, codec)
 * @param {File|Blob} videoFile - Video file to analyze
 * @returns {Promise<{duration: number, width: number, height: number, filename: string}>}
 */
export async function getVideoInfo(videoFile) {
  // Create a video element to get metadata
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        filename: videoFile.name || 'video.mp4'
      });
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video metadata'));
    };
    
    video.src = URL.createObjectURL(videoFile);
  });
}

/**
 * Generate a thumbnail from a video at a specific time (FAST - uses browser video element)
 * @param {File|Blob} videoFile - Video file
 * @param {number} time - Time in seconds for the thumbnail (default: 0)
 * @returns {Promise<Blob>} Thumbnail image as Blob (JPEG)
 */
export async function generateThumbnail(videoFile, time = 0) {
  return trackVideoOperation(
    METRIC_TYPES.VIDEO_THUMBNAIL,
    async () => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        
        let timeout;
        
        const cleanup = () => {
          if (timeout) clearTimeout(timeout);
          if (video.src) {
            URL.revokeObjectURL(video.src);
          }
          video.remove();
          canvas.remove();
        };
        
        // Set a timeout to prevent hanging
        timeout = setTimeout(() => {
          cleanup();
          reject(new Error('Thumbnail generation timeout'));
        }, 10000); // 10 second timeout
        
        video.onloadedmetadata = () => {
          // Seek to the desired time
          video.currentTime = Math.min(time, video.duration || 0);
        };
        
        video.onseeked = () => {
          try {
            // Set canvas dimensions (max 320px width, maintain aspect ratio)
            const maxWidth = 320;
            const aspectRatio = video.videoWidth / video.videoHeight;
            const width = Math.min(maxWidth, video.videoWidth);
            const height = width / aspectRatio;
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw the video frame to canvas
            ctx.drawImage(video, 0, 0, width, height);
            
            // Convert canvas to blob
            canvas.toBlob((blob) => {
              if (blob) {
                cleanup();
                resolve(blob);
              } else {
                cleanup();
                reject(new Error('Failed to generate thumbnail'));
              }
            }, 'image/jpeg', 0.85);
          } catch (error) {
            cleanup();
            reject(error);
          }
        };
        
        video.onerror = () => {
          cleanup();
          reject(new Error('Failed to load video for thumbnail'));
        };
        
        video.src = URL.createObjectURL(videoFile);
      });
    },
    {
      time,
      fileSize: videoFile.size,
    }
  );
}

/**
 * Generate multiple thumbnails from a video at evenly spaced intervals
 * @param {File|Blob} videoFile - Video file
 * @param {number} count - Number of thumbnails to generate (default: 5)
 * @returns {Promise<Array<{time: number, blob: Blob}>>} Array of thumbnails with timestamps
 */
export async function generateThumbnails(videoFile, count = 5) {
  const info = await getVideoInfo(videoFile);
  const duration = info.duration || 0;
  
  if (duration === 0) {
    // For very short videos, just generate one thumbnail
    const blob = await generateThumbnail(videoFile, 0);
    return [{ time: 0, blob }];
  }
  
  const interval = duration / (count + 1);
  const thumbnails = [];
  
  for (let i = 1; i <= count; i++) {
    const time = interval * i;
    try {
      const blob = await generateThumbnail(videoFile, time);
      thumbnails.push({ time, blob });
    } catch (error) {
      console.warn(`[VideoOps] Failed to generate thumbnail at ${time}s:`, error);
    }
  }
  
  return thumbnails;
}

/**
 * Generate a low-resolution preview version of a video
 * Useful for faster preview playback during editing
 * @param {File|Blob} inputFile - Input video file
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Low-res preview video as Blob
 */
export async function generatePreviewVideo(inputFile, onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_preview.mp4';
  const outputName = 'output_preview.mp4';
  const operationSignal = signal || createAbortController().signal;
  
  try {
    await writeFile(inputName, inputFile);
    
    // Generate a 480p preview with lower quality for faster playback
    await exec([
      '-i', inputName,
      '-vf', 'scale=854:480:force_original_aspect_ratio=decrease',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',    // Fastest encoding
      '-crf', '28',              // Lower quality (faster)
      '-tune', 'fastdecode',     // Optimize for fast decoding
      '-c:a', 'aac',
      '-b:a', '96k',             // Lower audio bitrate
      '-movflags', '+faststart', // Enable fast start for web playback
      '-threads', '0',
      outputName
    ], operationSignal);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } catch (error) {
    if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
    throw error;
  } finally {
    clearProgressCallback();
    await cleanup([inputName, outputName]);
  }
}

/**
 * Get video frame at specific time as an image
 * Faster than generateThumbnail for scrubbing preview
 * @param {HTMLVideoElement} videoElement - Video element (already loaded)
 * @param {number} time - Time in seconds
 * @param {number} width - Output width (default: 160)
 * @returns {Promise<string>} Data URL of the frame
 */
export function getVideoFrameAtTime(videoElement, time, width = 160) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    const height = width / aspectRatio;
    
    canvas.width = width;
    canvas.height = height;
    
    const onSeeked = () => {
      try {
        ctx.drawImage(videoElement, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
        videoElement.removeEventListener('seeked', onSeeked);
        resolve(dataUrl);
      } catch (error) {
        videoElement.removeEventListener('seeked', onSeeked);
        reject(error);
      }
    };
    
    videoElement.addEventListener('seeked', onSeeked);
    videoElement.currentTime = time;
  });
}

/**
 * Preload video for faster scrubbing
 * Creates a buffer of frames at regular intervals
 * @param {File|Blob} videoFile - Video file
 * @param {number} frameCount - Number of frames to preload (default: 10)
 * @returns {Promise<{frames: Map<number, string>, duration: number}>} Frame buffer
 */
export async function preloadVideoFrames(videoFile, frameCount = 10) {
  const info = await getVideoInfo(videoFile);
  const duration = info.duration || 0;
  const interval = duration / frameCount;
  
  const video = document.createElement('video');
  video.muted = true;
  video.preload = 'auto';
  video.src = URL.createObjectURL(videoFile);
  
  const frames = new Map();
  
  await new Promise((resolve) => {
    video.onloadeddata = resolve;
    video.onerror = resolve;
  });
  
  for (let i = 0; i < frameCount; i++) {
    const time = interval * i;
    try {
      const dataUrl = await getVideoFrameAtTime(video, time, 160);
      frames.set(Math.round(time * 10) / 10, dataUrl);
    } catch (error) {
      // Continue with other frames
    }
  }
  
  URL.revokeObjectURL(video.src);
  video.remove();
  
  return { frames, duration };
}

/**
 * Convert video to a different format
 * @param {File|Blob} inputFile - Input video file
 * @param {string} format - Output format ('mp4', 'webm')
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Converted video as Blob
 */
export async function convertFormat(inputFile, format = 'mp4', onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_convert.mp4';
  const outputName = `output_convert.${format}`;
  const operationSignal = signal || createAbortController().signal;
  
  const mimeTypes = {
    mp4: 'video/mp4',
    webm: 'video/webm'
  };
  
  const codecArgs = format === 'webm' 
    ? ['-c:v', 'libvpx', '-c:a', 'libvorbis', '-b:v', '1M']
    : ['-c:v', 'libx264', '-c:a', 'aac', '-crf', '23'];
  
  try {
    await writeFile(inputName, inputFile);
    
    await exec([
      '-i', inputName,
      ...codecArgs,
      outputName
    ], operationSignal);
    
    const data = await readFile(outputName);
    return toBlob(data, mimeTypes[format] || 'video/mp4');
  } catch (error) {
    if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
    throw error;
  } finally {
    clearProgressCallback();
    await cleanup([inputName, outputName]);
  }
}
