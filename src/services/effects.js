/**
 * Effects Service
 * Text overlays, transitions, and filters using FFmpeg.wasm
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
  clearProgressCallback
} from './ffmpeg';

/**
 * Text position presets
 */
export const TEXT_POSITIONS = {
  'top-left': { x: '10', y: '10' },
  'top-center': { x: '(w-text_w)/2', y: '10' },
  'top-right': { x: 'w-text_w-10', y: '10' },
  'center-left': { x: '10', y: '(h-text_h)/2' },
  'center': { x: '(w-text_w)/2', y: '(h-text_h)/2' },
  'center-right': { x: 'w-text_w-10', y: '(h-text_h)/2' },
  'bottom-left': { x: '10', y: 'h-text_h-10' },
  'bottom-center': { x: '(w-text_w)/2', y: 'h-text_h-10' },
  'bottom-right': { x: 'w-text_w-10', y: 'h-text_h-10' }
};

/**
 * Transition types available
 */
export const TRANSITION_TYPES = [
  'fade',
  'fadeblack',
  'fadewhite',
  'dissolve',
  'pixelize',
  'wipeleft',
  'wiperight',
  'wipeup',
  'wipedown',
  'slideleft',
  'slideright',
  'slideup',
  'slidedown'
];

/**
 * Add text overlay to video
 * @param {File|Blob} videoFile - Input video file
 * @param {string} text - Text to display
 * @param {Object} options - Text styling options
 * @param {string} options.position - Position preset or custom {x, y}
 * @param {number} options.fontSize - Font size in pixels
 * @param {string} options.fontColor - Font color (hex or name)
 * @param {string} options.backgroundColor - Background box color (optional)
 * @param {number} options.startTime - When to show text (seconds)
 * @param {number} options.duration - How long to show text (seconds, 0 = entire video)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with text overlay as Blob
 */
export async function addTextOverlay(videoFile, text, options = {}, onProgress = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const {
    position = 'bottom-center',
    fontSize = 48,
    fontColor = 'white',
    backgroundColor = null,
    startTime = 0,
    duration = 0
  } = options;
  
  const inputName = 'input_text.mp4';
  const outputName = 'output_text.mp4';
  
  try {
    await writeFile(inputName, videoFile);
    
    // Get position coordinates
    const pos = typeof position === 'string' 
      ? TEXT_POSITIONS[position] || TEXT_POSITIONS['bottom-center']
      : position;
    
    // Escape special characters in text
    const escapedText = text
      .replace(/'/g, "'\\''")
      .replace(/:/g, '\\:')
      .replace(/\\/g, '\\\\');
    
    // Build drawtext filter
    let drawTextFilter = `drawtext=text='${escapedText}':fontsize=${fontSize}:fontcolor=${fontColor}:x=${pos.x}:y=${pos.y}`;
    
    // Add background box if specified
    if (backgroundColor) {
      drawTextFilter += `:box=1:boxcolor=${backgroundColor}:boxborderw=5`;
    }
    
    // Add timing constraints
    if (startTime > 0 || duration > 0) {
      const enableExpr = duration > 0
        ? `between(t,${startTime},${startTime + duration})`
        : `gte(t,${startTime})`;
      drawTextFilter += `:enable='${enableExpr}'`;
    }
    
    await exec([
      '-i', inputName,
      '-vf', drawTextFilter,
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '23',
      '-c:a', 'copy',
      outputName
    ]);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } finally {
    clearProgressCallback();
    await cleanup([inputName, outputName]);
  }
}

/**
 * Add transition between two video clips
 * @param {File|Blob} clip1 - First video clip
 * @param {File|Blob} clip2 - Second video clip
 * @param {string} transitionType - Type of transition (from TRANSITION_TYPES)
 * @param {number} duration - Transition duration in seconds
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with transition as Blob
 */
export async function addTransition(clip1, clip2, transitionType = 'fade', duration = 1, onProgress = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  // Validate transition type
  const transition = TRANSITION_TYPES.includes(transitionType) ? transitionType : 'fade';
  
  const input1Name = 'input_trans_1.mp4';
  const input2Name = 'input_trans_2.mp4';
  const outputName = 'output_transition.mp4';
  
  try {
    await writeFile(input1Name, clip1);
    await writeFile(input2Name, clip2);
    
    // Get clip1 duration to calculate transition offset
    // We'll use a simple probe approach
    const clip1Duration = await getVideoDuration(clip1);
    const offset = Math.max(0, clip1Duration - duration);
    
    await exec([
      '-i', input1Name,
      '-i', input2Name,
      '-filter_complex', `[0:v][1:v]xfade=transition=${transition}:duration=${duration}:offset=${offset}[v];[0:a][1:a]acrossfade=d=${duration}[a]`,
      '-map', '[v]',
      '-map', '[a]',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '23',
      '-c:a', 'aac',
      '-b:a', '192k',
      outputName
    ]);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } finally {
    clearProgressCallback();
    await cleanup([input1Name, input2Name, outputName]);
  }
}

/**
 * Helper function to get video duration
 * @param {File|Blob} videoFile - Video file
 * @returns {Promise<number>} Duration in seconds
 */
async function getVideoDuration(videoFile) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video'));
    };
    
    video.src = URL.createObjectURL(videoFile);
  });
}

/**
 * Apply video filter/effect
 * @param {File|Blob} videoFile - Input video file
 * @param {string} filter - FFmpeg filter string
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Filtered video as Blob
 */
export async function applyFilter(videoFile, filter, onProgress = null) {
  // Validate filter string — only allow alphanumerics, common filter chars, and no shell metacharacters
  if (typeof filter !== 'string' || !/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(filter)) {
    throw new Error('Invalid FFmpeg filter string');
  }

  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_filter.mp4';
  const outputName = 'output_filter.mp4';
  
  try {
    await writeFile(inputName, videoFile);
    
    await exec([
      '-i', inputName,
      '-vf', filter,
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '23',
      '-c:a', 'copy',
      outputName
    ]);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } finally {
    clearProgressCallback();
    await cleanup([inputName, outputName]);
  }
}

/**
 * Apply brightness/contrast adjustment
 * @param {File|Blob} videoFile - Input video file
 * @param {number} brightness - Brightness adjustment (-1.0 to 1.0)
 * @param {number} contrast - Contrast adjustment (-1.0 to 1.0)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Adjusted video as Blob
 */
export async function adjustBrightnessContrast(videoFile, brightness = 0, contrast = 0, onProgress = null) {
  // Convert -1 to 1 range to FFmpeg's eq filter range
  // brightness: -1.0 to 1.0 (FFmpeg default is 0)
  // contrast: 0.0 to 2.0 (FFmpeg default is 1, so we add 1)
  const filter = `eq=brightness=${brightness}:contrast=${1 + contrast}`;
  return applyFilter(videoFile, filter, onProgress);
}

/**
 * Apply saturation adjustment
 * @param {File|Blob} videoFile - Input video file
 * @param {number} saturation - Saturation level (0 = grayscale, 1 = original, 2 = double)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Adjusted video as Blob
 */
export async function adjustSaturation(videoFile, saturation = 1, onProgress = null) {
  const filter = `eq=saturation=${saturation}`;
  return applyFilter(videoFile, filter, onProgress);
}

/**
 * Apply blur effect
 * @param {File|Blob} videoFile - Input video file
 * @param {number} radius - Blur radius (1-20)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Blurred video as Blob
 */
export async function applyBlur(videoFile, radius = 5, onProgress = null) {
  const filter = `boxblur=${radius}:${radius}`;
  return applyFilter(videoFile, filter, onProgress);
}

/**
 * Apply sharpen effect
 * @param {File|Blob} videoFile - Input video file
 * @param {number} strength - Sharpen strength (0.0 to 2.0)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Sharpened video as Blob
 */
export async function applySharpen(videoFile, strength = 1, onProgress = null) {
  const filter = `unsharp=5:5:${strength}:5:5:0`;
  return applyFilter(videoFile, filter, onProgress);
}

/**
 * Apply speed change to video
 * @param {File|Blob} videoFile - Input video file
 * @param {number} speed - Speed multiplier (0.5 = half speed, 2.0 = double speed)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Speed-adjusted video as Blob
 */
export async function changeSpeed(videoFile, speed = 1.0, onProgress = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_speed.mp4';
  const outputName = 'output_speed.mp4';
  
  // Clamp speed to reasonable values
  const clampedSpeed = Math.max(0.25, Math.min(4.0, speed));
  
  try {
    await writeFile(inputName, videoFile);
    
    // Video: setpts adjusts presentation timestamps
    // Audio: atempo adjusts audio speed (only supports 0.5-2.0, so chain for extreme values)
    const videoFilter = `setpts=${1 / clampedSpeed}*PTS`;
    
    let audioFilter = '';
    if (clampedSpeed <= 2.0 && clampedSpeed >= 0.5) {
      audioFilter = `atempo=${clampedSpeed}`;
    } else if (clampedSpeed > 2.0) {
      // Chain atempo filters for speeds > 2.0
      const atempoCount = Math.ceil(Math.log(clampedSpeed) / Math.log(2));
      const atempoValue = Math.pow(clampedSpeed, 1 / atempoCount);
      audioFilter = Array(atempoCount).fill(`atempo=${atempoValue}`).join(',');
    } else {
      // Chain atempo filters for speeds < 0.5
      const atempoCount = Math.ceil(Math.log(1 / clampedSpeed) / Math.log(2));
      const atempoValue = Math.pow(clampedSpeed, 1 / atempoCount);
      audioFilter = Array(atempoCount).fill(`atempo=${atempoValue}`).join(',');
    }
    
    await exec([
      '-i', inputName,
      '-filter_complex', `[0:v]${videoFilter}[v];[0:a]${audioFilter}[a]`,
      '-map', '[v]',
      '-map', '[a]',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '23',
      '-c:a', 'aac',
      '-b:a', '192k',
      outputName
    ]);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } finally {
    clearProgressCallback();
    await cleanup([inputName, outputName]);
  }
}

/**
 * Add fade in/out effect to video
 * @param {File|Blob} videoFile - Input video file
 * @param {number} fadeInDuration - Fade in duration in seconds
 * @param {number} fadeOutDuration - Fade out duration in seconds
 * @param {number} totalDuration - Total video duration (needed for fade out calculation)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Video with fade effects as Blob
 */
export async function addFade(videoFile, fadeInDuration = 0, fadeOutDuration = 0, totalDuration = null, onProgress = null) {
  await loadFFmpeg();
  
  if (onProgress) setProgressCallback(onProgress);
  
  const inputName = 'input_fade.mp4';
  const outputName = 'output_fade.mp4';
  
  try {
    await writeFile(inputName, videoFile);
    
    const filters = [];
    
    if (fadeInDuration > 0) {
      filters.push(`fade=t=in:st=0:d=${fadeInDuration}`);
    }
    
    if (fadeOutDuration > 0 && totalDuration) {
      const fadeOutStart = totalDuration - fadeOutDuration;
      filters.push(`fade=t=out:st=${fadeOutStart}:d=${fadeOutDuration}`);
    }
    
    if (filters.length === 0) {
      // No fades, just return the original
      const data = await readFile(inputName);
      return toBlob(data, 'video/mp4');
    }
    
    await exec([
      '-i', inputName,
      '-vf', filters.join(','),
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '23',
      '-c:a', 'copy',
      outputName
    ]);
    
    const data = await readFile(outputName);
    return toBlob(data, 'video/mp4');
  } finally {
    clearProgressCallback();
    await cleanup([inputName, outputName]);
  }
}

/**
 * Rotate video
 * @param {File|Blob} videoFile - Input video file
 * @param {number} degrees - Rotation angle (90, 180, 270)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Rotated video as Blob
 */
export async function rotateVideo(videoFile, degrees = 90, onProgress = null) {
  const transposeMap = {
    90: 'transpose=1',      // 90 clockwise
    180: 'transpose=1,transpose=1', // 180
    270: 'transpose=2',     // 90 counter-clockwise (270 clockwise)
    '-90': 'transpose=2'    // 90 counter-clockwise
  };
  
  const filter = transposeMap[degrees] || transposeMap[90];
  return applyFilter(videoFile, filter, onProgress);
}

/**
 * Flip video horizontally or vertically
 * @param {File|Blob} videoFile - Input video file
 * @param {string} direction - 'horizontal' or 'vertical'
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Flipped video as Blob
 */
export async function flipVideo(videoFile, direction = 'horizontal', onProgress = null) {
  const filter = direction === 'vertical' ? 'vflip' : 'hflip';
  return applyFilter(videoFile, filter, onProgress);
}

/**
 * Crop video
 * @param {File|Blob} videoFile - Input video file
 * @param {Object} cropArea - Crop dimensions
 * @param {number} cropArea.width - Output width
 * @param {number} cropArea.height - Output height
 * @param {number} cropArea.x - X offset from left
 * @param {number} cropArea.y - Y offset from top
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Blob>} Cropped video as Blob
 */
export async function cropVideo(videoFile, cropArea, onProgress = null) {
  const { width, height, x = 0, y = 0 } = cropArea;
  const filter = `crop=${width}:${height}:${x}:${y}`;
  return applyFilter(videoFile, filter, onProgress);
}
