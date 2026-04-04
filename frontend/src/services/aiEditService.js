/**
 * AI Edit Service — Action Executor
 *
 * Receives natural language prompts, sends them to the AI proxy Worker for
 * intent parsing, then executes the returned actions against the editor state.
 */

import { detectSilence, totalSilenceDuration } from './silenceDetector';
import { FILTER_PRESETS } from '../components/VideoEditor/constants';

const WORKER_URL = typeof import.meta !== 'undefined'
  ? import.meta.env?.VITE_TRANSCRIPT_WORKER_URL || ''
  : '';

// Map friendly filter names to FILTER_PRESETS entries
const FILTER_NAME_MAP = {
  cinematic: 'Cinema',
  cinema: 'Cinema',
  vintage: 'Vintage',
  bw: 'B&W',
  'b&w': 'B&W',
  'black and white': 'B&W',
  warm: 'Warm',
  cool: 'Cool',
  '90s': '90s',
  sepia: 'Sepia',
};

/**
 * Main entry point — parse prompt via Worker, then execute actions.
 *
 * @param {string} prompt - User's natural language prompt
 * @param {Object} context - Video context { duration, hasAudio, clipCount, currentTime }
 * @param {Object} editor - Editor state & functions
 * @returns {Promise<{summary: string, actionLabels: string[]}>}
 */
export async function executeAiEdit(prompt, context, editor) {
  // Step 1: Parse intent via Cloudflare Worker
  const actions = await parseIntent(prompt, context);

  // Step 2: Execute each action sequentially
  const labels = [];
  for (const action of actions) {
    const label = await executeAction(action, editor);
    if (label) labels.push(label);
  }

  // Step 3: Build summary
  const summary = labels.length > 0
    ? `Done! ${labels.join(', ')}.`
    : 'No actions were applied.';

  return { summary, actionLabels: labels };
}

/**
 * Send prompt to the /edit Worker endpoint and get structured actions back.
 */
async function parseIntent(prompt, context) {
  if (!WORKER_URL) {
    throw new Error('AI proxy not configured. Set VITE_TRANSCRIPT_WORKER_URL in your .env file.');
  }

  // The Worker base URL is the transcript worker URL minus the /transcribe path
  const baseUrl = WORKER_URL.replace(/\/transcribe\/?$/, '');
  const editUrl = `${baseUrl}/edit`;

  const res = await fetch(editUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, context }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || `AI proxy returned ${res.status}`);
  }

  const data = await res.json();

  if (!data.actions || !Array.isArray(data.actions) || data.actions.length === 0) {
    throw new Error(data.error || "I couldn't understand that request. Try something like 'add captions' or 'remove silence'.");
  }

  return data.actions;
}

/**
 * Execute a single parsed action against the editor.
 * Returns a human-readable label describing what was done.
 */
async function executeAction(action, editor) {
  const { clips, setClips, updateClip, addClip, splitClip, selectedClipId, mediaItems } = editor;

  switch (action.type) {
    case 'add_captions':
      return await executeAddCaptions(action.params, editor);

    case 'remove_silence':
      return await executeRemoveSilence(action.params, editor);

    case 'cut_clip':
      return executeCutClip(action.params, editor);

    case 'split_clip':
      return executeSplitClip(action.params, editor);

    case 'add_text':
      return executeAddText(action.params, editor);

    case 'apply_filter':
      return executeApplyFilter(action.params, editor);

    case 'change_speed':
      return executeChangeSpeed(action.params, editor);

    case 'add_music':
      return 'Background music (coming soon)';

    default:
      return null;
  }
}

/* ─── Action: Add Captions ──────────────────────────────────── */
async function executeAddCaptions(params, editor) {
  const { clips, setClips, mediaItems } = editor;
  const style = params.style || 'classic';

  // Find the first video clip with a file we can transcribe
  const videoClip = clips.find(c =>
    c.type !== 'audio' && c.type !== 'text' && c.type !== 'sticker' && !c.isCaption && (c.file || c.blobUrl)
  );

  if (!videoClip) {
    throw new Error('No video clip found to generate captions from. Import a video first.');
  }

  if (!WORKER_URL) {
    throw new Error('Caption generation requires VITE_TRANSCRIPT_WORKER_URL to be configured.');
  }

  // Dynamic import to keep bundle small
  const { generateCaptionClips } = await import('./captionGenerator');

  const file = videoClip.file || (videoClip.blobUrl ? await fetch(videoClip.blobUrl).then(r => r.blob()) : null);
  if (!file) throw new Error('Cannot access video file for transcription.');

  const captionClips = await generateCaptionClips(file, WORKER_URL, style, () => {});

  if (captionClips.length === 0) {
    return 'No speech detected for captions';
  }

  // Remove existing captions first, then add new ones
  setClips(prev => [
    ...prev.filter(c => !c.isCaption),
    ...captionClips,
  ]);

  return `Added ${captionClips.length} caption${captionClips.length !== 1 ? 's' : ''}`;
}

/* ─── Action: Remove Silence ────────────────────────────────── */
async function executeRemoveSilence(params, editor) {
  const { clips, setClips } = editor;
  const threshold = Math.max(-60, Math.min(-20, params.threshold ?? -40));
  const minDuration = Math.max(0.1, Math.min(2.0, params.minDuration ?? 0.5));

  // Find video clips with audio we can analyze
  const videoClips = clips.filter(c =>
    c.type !== 'text' && c.type !== 'sticker' && !c.isCaption && (c.file || c.blobUrl)
  );

  if (videoClips.length === 0) {
    throw new Error('No clips with audio found to analyze for silence.');
  }

  let totalRemoved = 0;
  let sectionsRemoved = 0;

  // Process each clip independently
  const newClips = [];
  const nonVideoClips = clips.filter(c =>
    c.type === 'text' || c.type === 'sticker' || c.isCaption
  );

  for (const clip of videoClips) {
    const file = clip.file || (clip.blobUrl ? await fetch(clip.blobUrl).then(r => r.blob()) : null);
    if (!file) {
      newClips.push(clip);
      continue;
    }

    const silentRanges = await detectSilence(file, { threshold, minDuration });

    if (silentRanges.length === 0) {
      newClips.push(clip);
      continue;
    }

    // Calculate non-silent segments (the parts we keep)
    const keepSegments = getKeepSegments(clip.startTime, clip.startTime + clip.duration, silentRanges.map(r => ({
      start: clip.startTime + r.start,
      end: clip.startTime + Math.min(r.end, clip.duration),
    })));

    // Create new clips for each non-silent segment
    let offset = clip.startTime;
    for (const seg of keepSegments) {
      const segDuration = seg.end - seg.start;
      if (segDuration < 0.1) continue; // skip tiny remnants

      newClips.push({
        ...clip,
        id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        startTime: offset,
        duration: segDuration,
        trimStart: (clip.trimStart || 0) + (seg.start - clip.startTime),
        trimEnd: 0,
      });
      offset += segDuration;
    }

    const silenceDuration = totalSilenceDuration(silentRanges.map(r => ({
      start: r.start,
      end: Math.min(r.end, clip.duration),
    })));
    totalRemoved += silenceDuration;
    sectionsRemoved += silentRanges.length;
  }

  // Combine kept video clips + preserved non-video clips
  setClips([...newClips, ...nonVideoClips]);

  return `Removed ${sectionsRemoved} silent section${sectionsRemoved !== 1 ? 's' : ''} (saved ${totalRemoved.toFixed(1)}s)`;
}

/**
 * Given an overall range and silent sub-ranges, return the non-silent segments.
 */
function getKeepSegments(start, end, silentRanges) {
  const sorted = [...silentRanges].sort((a, b) => a.start - b.start);
  const segments = [];
  let cursor = start;

  for (const s of sorted) {
    if (s.start > cursor) {
      segments.push({ start: cursor, end: s.start });
    }
    cursor = Math.max(cursor, s.end);
  }

  if (cursor < end) {
    segments.push({ start: cursor, end });
  }

  return segments;
}

/* ─── Action: Cut Clip ──────────────────────────────────────── */
function executeCutClip(params, editor) {
  const { clips, setClips } = editor;
  const from = params.from ?? 0;
  const to = params.to ?? 0;

  if (to <= from) throw new Error(`Invalid cut range: ${from}s to ${to}s`);

  const cutDuration = to - from;

  // Remove or trim clips that overlap with the cut range, then close the gap
  const newClips = [];
  for (const clip of clips) {
    const clipEnd = clip.startTime + clip.duration;

    // Clip is entirely before the cut — keep as-is
    if (clipEnd <= from) {
      newClips.push(clip);
      continue;
    }

    // Clip is entirely after the cut — shift left
    if (clip.startTime >= to) {
      newClips.push({ ...clip, startTime: clip.startTime - cutDuration });
      continue;
    }

    // Clip overlaps the cut range — split into before/after parts
    if (clip.startTime < from) {
      // Part before cut
      newClips.push({
        ...clip,
        id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        duration: from - clip.startTime,
      });
    }

    if (clipEnd > to) {
      // Part after cut (shifted left)
      const afterStart = clip.startTime < from ? from - cutDuration + (from - clip.startTime) : clip.startTime;
      newClips.push({
        ...clip,
        id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        startTime: clip.startTime < from ? from : clip.startTime - cutDuration,
        duration: clipEnd - to,
        trimStart: (clip.trimStart || 0) + (to - clip.startTime),
      });
    }

    // If clip is entirely inside cut range, it's simply removed
  }

  setClips(newClips);
  return `Cut ${from}s to ${to}s (removed ${cutDuration.toFixed(1)}s)`;
}

/* ─── Action: Split Clip ────────────────────────────────────── */
function executeSplitClip(params, editor) {
  const { clips, splitClip, selectedClipId } = editor;
  const splitTime = params.at;

  if (splitTime == null) throw new Error('Split requires a time position (e.g., "split at 30").');

  // Find the clip at the split time
  const targetClip = clips.find(c =>
    c.startTime <= splitTime && (c.startTime + c.duration) > splitTime
  );

  if (!targetClip) throw new Error(`No clip found at ${splitTime}s to split.`);

  splitClip(targetClip.id, splitTime);
  return `Split clip at ${splitTime}s`;
}

/* ─── Action: Add Text ──────────────────────────────────────── */
function executeAddText(params, editor) {
  const { clips, addClip } = editor;
  const text = params.text || 'Text';
  const position = params.position || 'center';
  const duration = params.duration || 5;

  // Find the current playhead position from context or default to 0
  const startTime = editor.currentTime || 0;

  const positionMap = {
    top: 'top-center',
    center: 'center-center',
    bottom: 'bottom-center',
  };

  addClip({
    type: 'text',
    text,
    startTime,
    duration,
    track: 1, // V2
    textPosition: positionMap[position] || 'bottom-center',
    textColor: '#ffffff',
    textSize: 48,
    textBgColor: 'rgba(0,0,0,0.5)',
    textFontFamily: 'Spline Sans',
  });

  return `Added text "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`;
}

/* ─── Action: Apply Filter ──────────────────────────────────── */
function executeApplyFilter(params, editor) {
  const { clips, setClips, selectedClipId } = editor;
  const filterInput = (params.name || '').toLowerCase();
  const presetName = FILTER_NAME_MAP[filterInput];

  if (!presetName) {
    throw new Error(`Unknown filter "${params.name}". Available: cinematic, vintage, bw, warm, cool, 90s, sepia.`);
  }

  const preset = FILTER_PRESETS.find(f => f.name === presetName);
  if (!preset) throw new Error(`Filter preset "${presetName}" not found.`);

  // Apply to selected clip, or all video clips if none selected
  const targetClips = selectedClipId
    ? clips.filter(c => c.id === selectedClipId)
    : clips.filter(c => c.type !== 'audio' && c.type !== 'text' && c.type !== 'sticker' && !c.isCaption);

  if (targetClips.length === 0) {
    throw new Error('No clips to apply filter to.');
  }

  const targetIds = new Set(targetClips.map(c => c.id));
  setClips(prev => prev.map(c =>
    targetIds.has(c.id)
      ? { ...c, filterName: presetName, filterCss: preset.css }
      : c
  ));

  return `Applied ${presetName} filter to ${targetClips.length} clip${targetClips.length !== 1 ? 's' : ''}`;
}

/* ─── Action: Change Speed ──────────────────────────────────── */
function executeChangeSpeed(params, editor) {
  const { clips, setClips, selectedClipId } = editor;
  const speed = params.speed;

  const validSpeeds = [0.25, 0.5, 1, 1.5, 2, 4];
  if (!validSpeeds.includes(speed)) {
    throw new Error(`Invalid speed ${speed}. Use: ${validSpeeds.join(', ')}`);
  }

  // Apply to selected clip, or all video clips if none selected
  const targetClips = selectedClipId
    ? clips.filter(c => c.id === selectedClipId)
    : clips.filter(c => c.type !== 'text' && c.type !== 'sticker' && !c.isCaption);

  if (targetClips.length === 0) {
    throw new Error('No clips to change speed on.');
  }

  const targetIds = new Set(targetClips.map(c => c.id));
  setClips(prev => prev.map(c =>
    targetIds.has(c.id) ? { ...c, speed } : c
  ));

  return `Set ${targetClips.length} clip${targetClips.length !== 1 ? 's' : ''} to ${speed}x speed`;
}
