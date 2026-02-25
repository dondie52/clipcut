/**
 * Audio Operations Service
 * Audio processing functions using FFmpeg.wasm
 */

import {
  loadFFmpeg,
  writeFile,
  readFile,
  exec,
  toBlob,
  cleanup,
  setProgressCallback,
  clearProgressCallback,
  createAbortController,
  createAbortError,
  isAbortError
} from './ffmpeg';

/**
 * Mix background audio with video
 * @param {File|Blob} videoFile - Input video file
 * @param {File|Blob} audioFile - Background audio file
 * @param {number} volume - Volume level for background audio (0.0 to 1.0)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with mixed audio as Blob
 */
export async function mixAudio(videoFile, audioFile, volume = 0.3, onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const videoInput = 'input_video.mp4';
  const audioInput = 'input_audio.mp3';
  const outputName = 'output_mixed.mp4';
  const operationSignal = signal || createAbortController().signal;
  
  try {
    await writeFile(videoInput, videoFile);
    await writeFile(audioInput, audioFile);
    
    // Mix audio: video's original audio + background audio at specified volume
    await exec([
      '-i', videoInput,
      '-i', audioInput,
      '-filter_complex', `[1:a]volume=${volume}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,
      '-map', '0:v',
      '-map', '[aout]',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      outputName
    ], operationSignal);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } catch (error) {
    if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
    throw error;
  } finally {
    clearProgressCallback();
    await cleanup([videoInput, audioInput, outputName]);
  }
}

/**
 * Replace video audio with new audio track
 * @param {File|Blob} videoFile - Input video file
 * @param {File|Blob} audioFile - New audio file
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with replaced audio as Blob
 */
export async function replaceAudio(videoFile, audioFile, onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const videoInput = 'input_video.mp4';
  const audioInput = 'input_audio.mp3';
  const outputName = 'output_replaced.mp4';
  const operationSignal = signal || createAbortController().signal;
  
  try {
    await writeFile(videoInput, videoFile);
    await writeFile(audioInput, audioFile);
    
    await exec([
      '-i', videoInput,
      '-i', audioInput,
      '-map', '0:v',
      '-map', '1:a',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      outputName
    ], operationSignal);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } catch (error) {
    if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
    throw error;
  } finally {
    clearProgressCallback();
    await cleanup([videoInput, audioInput, outputName]);
  }
}

/**
 * Adjust video volume
 * @param {File|Blob} videoFile - Input video file
 * @param {number} volumeLevel - Volume multiplier (0.0 = mute, 1.0 = original, 2.0 = double)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with adjusted volume as Blob
 */
export async function adjustVolume(videoFile, volumeLevel = 1.0, onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_volume.mp4';
  const outputName = 'output_volume.mp4';
  const operationSignal = signal || createAbortController().signal;
  
  try {
    await writeFile(inputName, videoFile);
    
    await exec([
      '-i', inputName,
      '-af', `volume=${volumeLevel}`,
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
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
 * Mute video audio
 * @param {File|Blob} videoFile - Input video file
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with no audio as Blob
 */
export async function muteAudio(videoFile, onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_mute.mp4';
  const outputName = 'output_mute.mp4';
  const operationSignal = signal || createAbortController().signal;
  
  try {
    await writeFile(inputName, videoFile);
    
    await exec([
      '-i', inputName,
      '-c:v', 'copy',
      '-an',
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
 * Extract audio from video
 * @param {File|Blob} videoFile - Input video file
 * @param {string} format - Output format ('mp3', 'aac', 'wav')
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Extracted audio as Blob
 */
export async function extractAudio(videoFile, format = 'mp3', onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_extract.mp4';
  const outputName = `output_extract.${format}`;
  const operationSignal = signal || createAbortController().signal;
  
  const mimeTypes = {
    mp3: 'audio/mpeg',
    aac: 'audio/aac',
    wav: 'audio/wav'
  };
  
  const codecArgs = {
    mp3: ['-c:a', 'libmp3lame', '-b:a', '192k'],
    aac: ['-c:a', 'aac', '-b:a', '192k'],
    wav: ['-c:a', 'pcm_s16le']
  };
  
  try {
    await writeFile(inputName, videoFile);
    
    await exec([
      '-i', inputName,
      '-vn',
      ...(codecArgs[format] || codecArgs.mp3),
      outputName
    ], operationSignal);
    
    const data = await readFile(outputName);
    return toBlob(data, mimeTypes[format] || 'audio/mpeg');
  } catch (error) {
    if (isAbortError(error) || operationSignal.aborted) throw createAbortError();
    throw error;
  } finally {
    clearProgressCallback();
    await cleanup([inputName, outputName]);
  }
}

/**
 * Normalize audio levels
 * @param {File|Blob} videoFile - Input video file
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with normalized audio as Blob
 */
export async function normalizeAudio(videoFile, onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_normalize.mp4';
  const outputName = 'output_normalize.mp4';
  const operationSignal = signal || createAbortController().signal;
  
  try {
    await writeFile(inputName, videoFile);
    
    // Use loudnorm filter for normalization
    await exec([
      '-i', inputName,
      '-af', 'loudnorm=I=-16:LRA=11:TP=-1.5',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
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
 * Fade audio in/out
 * @param {File|Blob} videoFile - Input video file
 * @param {number} fadeInDuration - Fade in duration in seconds
 * @param {number} fadeOutDuration - Fade out duration in seconds
 * @param {number} totalDuration - Total video duration in seconds (needed for fade out)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with faded audio as Blob
 */
export async function fadeAudio(videoFile, fadeInDuration = 0, fadeOutDuration = 0, totalDuration = null, onProgress = null, signal = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_fade.mp4';
  const outputName = 'output_fade.mp4';
  const operationSignal = signal || createAbortController().signal;
  
  try {
    await writeFile(inputName, videoFile);
    
    const filters = [];
    
    if (fadeInDuration > 0) {
      filters.push(`afade=t=in:st=0:d=${fadeInDuration}`);
    }
    
    if (fadeOutDuration > 0 && totalDuration) {
      const fadeOutStart = totalDuration - fadeOutDuration;
      filters.push(`afade=t=out:st=${fadeOutStart}:d=${fadeOutDuration}`);
    }
    
    const filterString = filters.join(',');
    
    const args = [
      '-i', inputName,
      '-c:v', 'copy'
    ];
    
    if (filterString) {
      args.push('-af', filterString);
      args.push('-c:a', 'aac', '-b:a', '192k');
    } else {
      args.push('-c:a', 'copy');
    }
    
    args.push(outputName);
    
    await exec(args, operationSignal);
    
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
