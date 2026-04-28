/**
 * Canvas + MediaRecorder Export Service
 * Replaces FFmpeg WASM export with browser-native APIs.
 * Draws video frames + text overlays onto a <canvas>, captures the stream
 * with MediaRecorder, and produces a downloadable WebM blob.
 */

import { addBreadcrumb } from '../utils/errorTracking';

// ── Resolution map (mirrors videoOperations.js RESOLUTIONS) ──
const RESOLUTION_MAP = {
  '480p':  { width: 854,  height: 480 },
  '720p':  { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
};

// ── Bitrate lookup: (resolution, crf) → videoBitsPerSecond ──
const BITRATE_TABLE = {
  '480p':  { 28: 1_000_000, 23: 2_000_000, 18: 4_000_000, 15: 6_000_000 },
  '720p':  { 28: 2_500_000, 23: 5_000_000, 18: 8_000_000, 15: 12_000_000 },
  '1080p': { 28: 4_000_000, 23: 8_000_000, 18: 16_000_000, 15: 24_000_000 },
};

function getBitrate(resolution, crf) {
  const table = BITRATE_TABLE[resolution] || BITRATE_TABLE['1080p'];
  return table[crf] || table[18];
}

// ── Text position map (duplicated from Player.jsx TEXT_POS_MAP) ──
// Converted to fractional x/y + alignment for canvas drawing
const TEXT_POS_MAP = {
  'top-left':      { x: 0.05,  y: 0.08,  align: 'left',   baseline: 'top' },
  'top-center':    { x: 0.50,  y: 0.08,  align: 'center', baseline: 'top' },
  'top-right':     { x: 0.95,  y: 0.08,  align: 'right',  baseline: 'top' },
  'center-left':   { x: 0.05,  y: 0.50,  align: 'left',   baseline: 'middle' },
  'center':        { x: 0.50,  y: 0.50,  align: 'center', baseline: 'middle' },
  'center-right':  { x: 0.95,  y: 0.50,  align: 'right',  baseline: 'middle' },
  'bottom-left':   { x: 0.05,  y: 0.92,  align: 'left',   baseline: 'bottom' },
  'bottom-center': { x: 0.50,  y: 0.92,  align: 'center', baseline: 'bottom' },
  'bottom-right':  { x: 0.95,  y: 0.92,  align: 'right',  baseline: 'bottom' },
};

// ── Draw a single text overlay onto canvas ──
function drawTextOverlay(ctx, clip, W, H) {
  const text = clip.text || '';
  if (!text.trim()) return;

  const fontSize = Math.max(12, Math.round((clip.textSize || 48) * (H / 1080)));
  const fontWeight = clip.textBold ? 'bold' : 'normal';
  const fontStyle = clip.textItalic ? 'italic' : 'normal';
  const fontFamily = clip.textFontFamily || 'Spline Sans';
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px '${fontFamily}', Arial, sans-serif`;

  // Position: custom (textX/textY %) or named position
  let x, y, align, baseline;
  if (clip.textX != null && clip.textY != null) {
    x = (clip.textX / 100) * W;
    y = (clip.textY / 100) * H;
    align = 'center';
    baseline = 'middle';
  } else {
    const pos = TEXT_POS_MAP[clip.textPosition || 'center'] || TEXT_POS_MAP['center'];
    x = pos.x * W;
    y = pos.y * H;
    align = pos.align;
    baseline = pos.baseline;
  }

  ctx.textAlign = align;
  ctx.textBaseline = baseline;

  // Background rectangle
  if (clip.textBgColor && clip.textBgColor !== 'transparent') {
    const metrics = ctx.measureText(text);
    const pad = fontSize * 0.25;
    const tw = metrics.width;
    const th = fontSize * 1.2;
    let rx = x - pad;
    if (align === 'center') rx = x - tw / 2 - pad;
    else if (align === 'right') rx = x - tw - pad;
    let ry = y - pad;
    if (baseline === 'middle') ry = y - th / 2 - pad;
    else if (baseline === 'bottom') ry = y - th - pad;

    ctx.fillStyle = clip.textBgColor;
    ctx.fillRect(rx, ry, tw + pad * 2, th + pad * 2);
  }

  // Text shadow (matches DraggableTextOverlay: "0 1px 4px rgba(0,0,0,0.7)")
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 1;

  ctx.fillStyle = clip.textColor || '#ffffff';
  ctx.fillText(text, x, y);

  // Underline
  if (clip.textUnderline) {
    const metrics = ctx.measureText(text);
    let ux = x;
    if (align === 'center') ux = x - metrics.width / 2;
    else if (align === 'right') ux = x - metrics.width;
    const uy = baseline === 'top' ? y + fontSize : baseline === 'middle' ? y + fontSize / 2 : y;
    ctx.strokeStyle = clip.textColor || '#ffffff';
    ctx.lineWidth = Math.max(1, fontSize / 20);
    ctx.beginPath();
    ctx.moveTo(ux, uy + 2);
    ctx.lineTo(ux + metrics.width, uy + 2);
    ctx.stroke();
  }

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

// ── Load a video file into a hidden <video> element ──
function loadVideo(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.playsInline = true;
    video.muted = false;
    video.style.position = 'fixed';
    video.style.top = '-9999px';
    video.style.left = '-9999px';
    video.style.width = '1px';
    video.style.height = '1px';
    document.body.appendChild(video);

    const url = file instanceof Blob ? URL.createObjectURL(file) : file;
    video.src = url;

    const cleanup = () => {
      video.removeEventListener('error', onError);
    };

    const onError = () => {
      cleanup();
      reject(new Error(`Failed to load video: ${video.error?.message || 'unknown error'}`));
    };

    video.addEventListener('error', onError);
    video.addEventListener('loadeddata', () => {
      cleanup();
      resolve({ video, url });
    }, { once: true });

    video.load();
  });
}

// ── Load an audio file into a hidden <audio> element ──
function loadAudio(file) {
  return new Promise((resolve, reject) => {
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    audio.style.display = 'none';
    document.body.appendChild(audio);

    const url = file instanceof Blob ? URL.createObjectURL(file) : file;
    audio.src = url;

    audio.addEventListener('error', () => {
      reject(new Error('Failed to load audio'));
    });
    audio.addEventListener('canplaythrough', () => {
      resolve({ audio, url });
    }, { once: true });

    audio.load();
  });
}

// ── Pick the best supported MediaRecorder MIME type ──
function pickMimeType() {
  const candidates = [
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp8',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp9',
    'video/webm',
  ];
  for (const mime of candidates) {
    if (MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return '';
}

// ── Build canvas filter string from clip effects ──
function buildCanvasFilter(clip) {
  const parts = [];
  if (clip.brightness != null && clip.brightness !== 0) {
    parts.push(`brightness(${1 + clip.brightness / 100})`);
  }
  if (clip.contrast != null && clip.contrast !== 0) {
    parts.push(`contrast(${1 + clip.contrast / 100})`);
  }
  if (clip.saturation != null && clip.saturation !== 0) {
    parts.push(`saturate(${1 + clip.saturation / 100})`);
  }
  if (clip.blur != null && clip.blur > 0) {
    parts.push(`blur(${clip.blur}px)`);
  }
  return parts.length > 0 ? parts.join(' ') : 'none';
}

// ── Format seconds as m:ss ──
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/**
 * Main export function.
 *
 * @param {Object} config
 * @param {Array}  config.clips        - All timeline clips (video, audio, text)
 * @param {Object} config.bgMusic      - { file, volume } or null
 * @param {number} config.totalDuration - Total timeline duration in seconds
 * @param {string} config.resolution    - '480p' | '720p' | '1080p'
 * @param {Object} config.settings      - { format, quality (CRF number), fps, filename }
 * @param {Function} config.onProgress  - ({ percent, elapsed, eta, label }) => void
 * @param {AbortSignal} config.abortSignal
 * @returns {Promise<{ blob: Blob, duration: number, size: number }>}
 */
export async function canvasExport({
  clips,
  bgMusic = null,
  totalDuration,
  resolution = '1080p',
  settings = {},
  onProgress,
  abortSignal,
}) {
  const { quality = 23, fps = 30 } = settings;
  const res = RESOLUTION_MAP[resolution] || RESOLUTION_MAP['1080p'];
  const { width: W, height: H } = res;
  const bitrate = getBitrate(resolution, quality);
  const mimeType = pickMimeType();

  addBreadcrumb({
    category: 'export',
    message: 'canvasExport.start',
    level: 'info',
    data: { resolution, fps, quality, totalDuration, clipCount: clips?.length ?? 0 },
  });

  if (!mimeType) {
    addBreadcrumb({ category: 'export', message: 'canvasExport.no_mime_support', level: 'error' });
    throw new Error('Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.');
  }

  // Separate clips by type
  const videoClips = clips
    .filter(c => c.type !== 'audio' && c.type !== 'text' && c.type !== 'sticker' && c.file)
    .sort((a, b) => a.startTime - b.startTime);
  const textClips = clips.filter(c => c.type === 'text' || c.type === 'sticker' || c.text?.trim());
  const timedTextClips = textClips.map((tc) => {
    const start = tc.startTime || 0;
    return {
      ...tc,
      _start: start,
      _end: start + (tc.duration || totalDuration),
    };
  });

  if (videoClips.length === 0) {
    addBreadcrumb({ category: 'export', message: 'canvasExport.no_video_clips', level: 'error' });
    throw new Error('No video clips to export.');
  }

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Audio context for mixing
  const audioCtx = new AudioContext();
  const audioDest = audioCtx.createMediaStreamDestination();

  // Background music setup
  let bgAudioEl = null;
  let bgAudioUrl = null;
  let bgGainNode = null;
  if (bgMusic?.file) {
    try {
      const loaded = await loadAudio(bgMusic.file);
      bgAudioEl = loaded.audio;
      bgAudioUrl = loaded.url;
      bgAudioEl.loop = true;
      const bgSource = audioCtx.createMediaElementSource(bgAudioEl);
      bgGainNode = audioCtx.createGain();
      bgGainNode.gain.value = bgMusic.volume ?? 0.3;
      bgSource.connect(bgGainNode);
      bgGainNode.connect(audioDest);
    } catch (e) {
      console.warn('Could not load background music, continuing without it:', e);
      bgAudioEl = null;
    }
  }

  // Combine canvas video stream + audio destination stream
  const canvasStream = canvas.captureStream(fps);
  const audioTracks = audioDest.stream.getAudioTracks();
  for (const track of audioTracks) {
    canvasStream.addTrack(track);
  }

  // MediaRecorder
  const chunks = [];
  const recorder = new MediaRecorder(canvasStream, {
    mimeType,
    videoBitsPerSecond: bitrate,
    audioBitsPerSecond: 128_000,
  });
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  // Start recording with 1-second timeslice to keep memory usage bounded
  recorder.start(1000);

  // Start background music
  if (bgAudioEl) {
    bgAudioEl.currentTime = 0;
    bgAudioEl.play().catch(() => {});
  }

  const startWall = Date.now();
  let timelineElapsed = 0; // how much timeline time has been rendered

  // ── Process each video clip sequentially ──
  for (let i = 0; i < videoClips.length; i++) {
    if (abortSignal?.aborted) break;

    const clip = videoClips[i];
    const trimStart = clip.trimStart || 0;
    const clipDuration = clip.duration || 0;
    const clipSpeed = clip.speed || 1.0;

    const { video, url: videoUrl } = await loadVideo(clip.file);

    // Connect this clip's audio to the mixer
    let clipAudioSource = null;
    try {
      clipAudioSource = audioCtx.createMediaElementSource(video);
      const clipGain = audioCtx.createGain();
      clipGain.gain.value = clip.isMuted ? 0 : (clip.volume ?? 1.0);
      clipAudioSource.connect(clipGain);
      clipGain.connect(audioDest);
    } catch (e) {
      // Audio routing failed — video may not have an audio track
      console.warn('Could not route clip audio:', e);
    }

    // Seek to trim start
    video.currentTime = trimStart;
    video.playbackRate = clipSpeed;

    // Apply CSS filter for effects (brightness, contrast, etc.)
    const filterStr = buildCanvasFilter(clip);

    // Wait for seek to complete
    await new Promise(resolve => {
      video.addEventListener('seeked', resolve, { once: true });
    });

    // Play the clip
    await video.play();

    // Render frames until clip duration is reached
    await new Promise((resolve, reject) => {
      let animId;
      const clipEndTime = trimStart + clipDuration;
      const fadeInDur = clip.fadeIn || 0;
      const fadeOutDur = clip.fadeOut || 0;

      const renderFrame = () => {
        if (abortSignal?.aborted) {
          cancelAnimationFrame(animId);
          video.pause();
          resolve();
          return;
        }

        const vt = video.currentTime;
        const clipElapsed = vt - trimStart;

        // Check if clip is done
        if (clipDuration > 0 && vt >= clipEndTime - 0.05) {
          video.pause();
          // Draw one final frame
          drawFrame(ctx, video, W, H, filterStr, clip, clipElapsed, clipDuration, fadeInDur, fadeOutDur, timedTextClips, clip.startTime + clipElapsed);
          resolve();
          return;
        }

        // Draw current frame
        drawFrame(ctx, video, W, H, filterStr, clip, clipElapsed, clipDuration, fadeInDur, fadeOutDur, timedTextClips, clip.startTime + clipElapsed);

        // Progress reporting
        const currentTimeline = clip.startTime + clipElapsed;
        const percent = totalDuration > 0 ? Math.min(99, (currentTimeline / totalDuration) * 100) : 0;
        const wallElapsed = (Date.now() - startWall) / 1000;
        const eta = percent > 1 ? (wallElapsed / percent) * (100 - percent) : 0;

        onProgress?.({
          percent: Math.round(percent),
          elapsed: fmtTime(wallElapsed),
          eta: fmtTime(eta),
          label: videoClips.length > 1 ? `Exporting clip ${i + 1}/${videoClips.length}` : 'Exporting video...',
        });

        animId = requestAnimationFrame(renderFrame);
      };

      // Also handle natural video end (for untrimmed clips)
      video.addEventListener('ended', () => {
        cancelAnimationFrame(animId);
        video.pause();
        resolve();
      }, { once: true });

      video.addEventListener('error', () => {
        cancelAnimationFrame(animId);
        reject(new Error(`Video playback error during export of clip ${i + 1}`));
      }, { once: true });

      animId = requestAnimationFrame(renderFrame);
    });

    // Cleanup this clip
    video.pause();
    video.src = '';
    video.load();
    document.body.removeChild(video);
    URL.revokeObjectURL(videoUrl);

    timelineElapsed = clip.startTime + clipDuration;
  }

  // Stop background music
  if (bgAudioEl) {
    bgAudioEl.pause();
    bgAudioEl.src = '';
    document.body.removeChild(bgAudioEl);
    if (bgAudioUrl) URL.revokeObjectURL(bgAudioUrl);
  }

  // Stop recording and collect result
  const blob = await new Promise((resolve) => {
    recorder.onstop = () => {
      const result = new Blob(chunks, { type: mimeType });
      resolve(result);
    };
    recorder.stop();
  });

  // Cleanup
  canvasStream.getTracks().forEach(t => t.stop());
  audioDest.stream.getTracks().forEach(t => t.stop());
  await audioCtx.close().catch(() => {});

  onProgress?.({ percent: 100, elapsed: fmtTime((Date.now() - startWall) / 1000), eta: '0:00', label: 'Complete' });

  if (abortSignal?.aborted) {
    addBreadcrumb({ category: 'export', message: 'canvasExport.cancelled', level: 'warning' });
    throw new Error('Export cancelled.');
  }

  addBreadcrumb({
    category: 'export',
    message: 'canvasExport.complete',
    level: 'info',
    data: { sizeBytes: blob.size, duration: totalDuration, elapsedMs: Date.now() - startWall },
  });

  return { blob, duration: totalDuration, size: blob.size };
}

// ── Draw a single composited frame ──
function drawFrame(ctx, video, W, H, filterStr, clip, clipElapsed, clipDuration, fadeInDur, fadeOutDur, timedTextClips, timelineTime) {
  ctx.save();

  // Fade in/out via globalAlpha
  let alpha = 1;
  if (fadeInDur > 0 && clipElapsed < fadeInDur) {
    alpha = clipElapsed / fadeInDur;
  }
  if (fadeOutDur > 0 && clipDuration > 0 && (clipDuration - clipElapsed) < fadeOutDur) {
    alpha = Math.min(alpha, (clipDuration - clipElapsed) / fadeOutDur);
  }
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  // Apply effects filter
  if (filterStr && filterStr !== 'none') {
    ctx.filter = filterStr;
  }

  // Handle rotation
  if (clip.rotation) {
    ctx.translate(W / 2, H / 2);
    ctx.rotate((clip.rotation * Math.PI) / 180);
    ctx.translate(-W / 2, -H / 2);
  }

  // Draw video frame scaled to fill canvas (letterboxed)
  const vw = video.videoWidth || W;
  const vh = video.videoHeight || H;
  const scale = Math.min(W / vw, H / vh);
  const dw = vw * scale;
  const dh = vh * scale;
  const dx = (W - dw) / 2;
  const dy = (H - dh) / 2;

  // Black background for letterboxing
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(video, dx, dy, dw, dh);

  // Reset filter and alpha for text overlays
  ctx.filter = 'none';
  ctx.globalAlpha = 1;

  // Draw text overlays visible at this timeline time
  for (const tc of timedTextClips) {
    if (timelineTime >= tc._start && timelineTime <= tc._end) {
      drawTextOverlay(ctx, tc, W, H);
    }
  }

  // Also draw text that's directly on the video clip (clip.text)
  if (clip.text?.trim() && clip.type !== 'text') {
    drawTextOverlay(ctx, clip, W, H);
  }

  ctx.restore();
}

export default canvasExport;
