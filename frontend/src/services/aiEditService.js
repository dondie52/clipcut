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
 * Local intent parser — matches common editing commands to structured actions
 * without requiring a network call. Returns null if the prompt is ambiguous
 * and should be forwarded to the Worker.
 */
function parseIntentLocally(prompt) {
  const p = prompt.toLowerCase().trim();

  // Pattern table: [regex, action builder]
  const patterns = [
    [/\badd\s+(auto[- ]?)?captions?\b/, () => [{ type: 'add_captions', params: { style: 'classic' } }]],
    [/\bcaptions?\b(?!.*remove)/, () => [{ type: 'add_captions', params: { style: 'classic' } }]],
    [/\bremove\s+silence\b/, () => [{ type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } }]],
    [/\bremove\s+filler\b/, () => [{ type: 'remove_filler_words', params: {} }]],
    [/\bmake\s+(?:it\s+)?vertical\b|tiktok|9[:\s]16|reels?\b|shorts?\b/, () => [{ type: 'smart_crop', params: { aspect: '9:16' } }]],
    [/\bmake\s+(?:it\s+)?square\b|1[:\s]1/, () => [{ type: 'smart_crop', params: { aspect: '1:1' } }]],
    [/\bhighlight|best\s+(\d+)\s*(?:sec|s\b|seconds?)/, (m) => [{ type: 'auto_highlight', params: { duration: parseInt(m[1]) || 60 } }]],
    [/\bfind\s+(?:the\s+)?best\b/, () => [{ type: 'auto_highlight', params: { duration: 60 } }]],
    [/\bdetect\s+scenes?\b|scene\s+split/, () => [{ type: 'detect_scenes', params: { sensitivity: 'medium' } }]],
    [/\bbeat\s+sync\b|sync\s+(?:to\s+)?beats?\b/, () => [{ type: 'beat_sync', params: { sensitivity: 1.5 } }]],
    [/\bzoom\s+(?:to\s+|in\s+(?:on\s+)?)?speaker\b/, () => [{ type: 'zoom_to_speaker', params: { zoomFactor: 1.3 } }]],
    [/\bremove\s+boring\b/, () => [{ type: 'remove_boring', params: { threshold: 4 } }]],
    [/\bspeed\s+(?:up\s+)?(\d+(?:\.\d+)?)x?\b|(\d+(?:\.\d+)?)x\s+speed/, (m) => {
      const speed = parseFloat(m[1] || m[2]);
      return [{ type: 'change_speed', params: { speed } }];
    }],
    [/\bsplit\s+(?:at\s+)?(\d+)\b/, (m) => [{ type: 'split_clip', params: { at: parseFloat(m[1]) } }]],
    [/\bcut\s+(?:from\s+)?(\d+)\s*(?:to|-)\s*(\d+)/, (m) => [{ type: 'cut_clip', params: { from: parseFloat(m[1]), to: parseFloat(m[2]) } }]],
    [/\b(?:apply\s+)?(?:a\s+)?(cinematic|vintage|bw|b&w|black\s+and\s+white|warm|cool|90s|sepia)\s*filter\b/, (m) => {
      return [{ type: 'apply_filter', params: { name: m[1].replace(/\s+/g, ' ') } }];
    }],
    [/\bapply\s+(cinematic|vintage|bw|b&w|warm|cool|90s|sepia)\b/, (m) => {
      return [{ type: 'apply_filter', params: { name: m[1] } }];
    }],
  ];

  // Compound: "add captions, remove silence, and apply cinematic filter" (auto-edit)
  if (/\bcaptions?\b/.test(p) && /\bremove\s+silence\b/.test(p) && /\bcinematic|filter\b/.test(p)) {
    return [
      { type: 'add_captions', params: { style: 'classic' } },
      { type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } },
      { type: 'apply_filter', params: { name: 'cinematic' } },
    ];
  }

  for (const [regex, builder] of patterns) {
    const match = p.match(regex);
    if (match) return builder(match);
  }

  return null; // ambiguous — fall through to Worker
}

/**
 * Main entry point — parse prompt via Worker, then execute actions.
 *
 * @param {string} prompt - User's natural language prompt
 * @param {Object} context - Video context { duration, hasAudio, clipCount, currentTime, ... }
 * @param {Object} editor - Editor state & functions
 * @param {Object} [options]
 * @param {Array} [options.history] - Conversation history for multi-turn context
 * @returns {Promise<{summary: string, actionLabels: string[]}>}
 */
export async function executeAiEdit(prompt, context, editor, options = {}) {
  const { history } = options;

  // Step 1: Parse intent via Cloudflare Worker (with conversation history)
  const parsed = await parseIntent(prompt, context, history);

  // If the Worker returned a conversational reply, pass it through without executing
  if (parsed && parsed.chat === true) {
    return { summary: parsed.message, actionLabels: [], isChat: true };
  }

  const actions = parsed;

  // Step 2: Execute each action sequentially; collect successes and failures
  const labels = [];
  const errors = [];
  for (const action of actions) {
    try {
      const label = await executeAction(action, editor);
      if (label) labels.push(label);
    } catch (err) {
      errors.push(`${action.type}: ${err.message}`);
    }
  }

  // Step 3: Build summary
  let summary;
  if (labels.length > 0 && errors.length === 0) {
    summary = `Done! ${labels.join(', ')}.`;
  } else if (labels.length > 0 && errors.length > 0) {
    summary = `Partially done: ${labels.join(', ')}. Failed: ${errors.join('; ')}`;
  } else if (errors.length > 0) {
    summary = `Failed: ${errors.join('; ')}`;
  } else {
    summary = 'No actions were applied.';
  }

  return { summary, actionLabels: labels };
}

/**
 * Parse intent — tries local pattern matching first (instant, offline),
 * falls back to the Worker /edit endpoint for ambiguous prompts.
 */
async function parseIntent(prompt, context, history) {
  // Try local parser first — handles all quick-action prompts instantly
  const localActions = parseIntentLocally(prompt);
  if (localActions) return localActions;

  // Fall back to Worker for complex / conversational prompts
  if (!WORKER_URL) {
    throw new Error('AI proxy not configured. Set VITE_TRANSCRIPT_WORKER_URL in your .env file.');
  }

  const baseUrl = WORKER_URL.replace(/\/transcribe\/?$/, '');
  const editUrl = `${baseUrl}/edit`;

  const payload = { prompt, context };
  if (Array.isArray(history) && history.length > 0) {
    payload.history = history;
  }

  // Try up to 2 times (retry once on invalid JSON)
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    let res;
    try {
      res = await fetch(editUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('AI service took too long to respond. Try a simpler command like "add captions" or "remove silence".');
      }
      throw err;
    }
    clearTimeout(timeoutId);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      if (res.status === 422 && attempt === 0) continue;
      throw new Error(err.error || `AI proxy returned ${res.status}`);
    }

    const data = await res.json();

    // Handle conversational response — not an edit command
    if (data.type === 'chat' && typeof data.message === 'string') {
      return { chat: true, message: data.message };
    }

    // Handle structured actions (expected format)
    if (data.type === 'actions' && Array.isArray(data.actions) && data.actions.length > 0) {
      return data.actions;
    }

    // Legacy format: bare actions array
    if (Array.isArray(data.actions) && data.actions.length > 0) {
      return data.actions;
    }

    // Handle Worker returning a text response instead of structured actions
    // Re-parse the text response through local intent parser
    const workerText = data.result?.response || data.response || data.message;
    if (workerText && attempt === 0) {
      const reparsed = parseIntentLocally(workerText);
      if (reparsed) return reparsed;
      continue; // retry once
    }

    if (attempt === 0) continue;
    throw new Error(data.error || "I didn't understand that. Try rephrasing your request.");
  }

  throw new Error("I didn't understand that. Try rephrasing your request.");
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

    // Phase 2 — ML-powered actions
    case 'remove_filler_words':
      return await executeRemoveFillerWords(action.params, editor);

    case 'detect_scenes':
      return await executeDetectScenes(action.params, editor);

    case 'auto_highlight':
      return await executeAutoHighlight(action.params, editor);

    case 'smart_crop':
      return await executeSmartCrop(action.params, editor);

    case 'beat_sync':
      return await executeBeatSync(action.params, editor);

    case 'zoom_to_speaker':
      return await executeZoomToSpeaker(action.params, editor);

    case 'remove_boring':
      return await executeRemoveBoring(action.params, editor);

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

  const validSpeeds = [0.5, 1, 1.5, 2, 4];
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

/* ═══════════════════════════════════════════════════════════════
   Phase 2 — ML-Powered Actions
   ═══════════════════════════════════════════════════════════════ */

/** Find the first video clip with a playable file. Throws if none found. */
function findVideoClip(clips) {
  const clip = clips.find(c =>
    c.type !== 'audio' && c.type !== 'text' && c.type !== 'sticker' && !c.isCaption && (c.file || c.blobUrl)
  );
  if (!clip) throw new Error('No video clip found. Import a video first.');
  return clip;
}

/** Get a File/Blob from a clip (resolves blobUrl if needed). */
async function getClipFile(clip) {
  if (clip.file) return clip.file;
  if (clip.blobUrl) return fetch(clip.blobUrl).then(r => r.blob());
  throw new Error('Cannot access clip file.');
}

/** Merge overlapping ranges (sorted by start). */
function mergeRanges(ranges) {
  if (ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    if (sorted[i].start <= prev.end) {
      prev.end = Math.max(prev.end, sorted[i].end);
    } else {
      merged.push({ ...sorted[i] });
    }
  }
  return merged;
}

/**
 * Rebuild the clips array by removing time ranges and closing gaps.
 * Reusable for filler removal, silence removal, boring removal, etc.
 */
function removeTimeRanges(clips, cutRanges, setClips) {
  const videoClips = clips.filter(c =>
    c.type !== 'text' && c.type !== 'sticker' && !c.isCaption
  );
  const nonVideoClips = clips.filter(c =>
    c.type === 'text' || c.type === 'sticker' || c.isCaption
  );

  const newClips = [];
  for (const clip of videoClips) {
    // Map cut ranges to this clip's local time
    const clipEnd = clip.startTime + clip.duration;
    const localCuts = cutRanges
      .filter(r => r.end > clip.startTime && r.start < clipEnd)
      .map(r => ({
        start: Math.max(r.start, clip.startTime),
        end: Math.min(r.end, clipEnd),
      }));

    if (localCuts.length === 0) {
      newClips.push(clip);
      continue;
    }

    const keepSegs = getKeepSegments(clip.startTime, clipEnd, localCuts);
    let offset = clip.startTime;
    for (const seg of keepSegs) {
      const segDur = seg.end - seg.start;
      if (segDur < 0.1) continue;
      newClips.push({
        ...clip,
        id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        startTime: offset,
        duration: segDur,
        trimStart: (clip.trimStart || 0) + (seg.start - clip.startTime),
        trimEnd: 0,
      });
      offset += segDur;
    }
  }

  setClips([...newClips, ...nonVideoClips]);
}

/* ─── Action: Remove Filler Words ───────────────────────────── */
const DEFAULT_FILLERS = ['um', 'uh', 'uh-huh', 'hmm', 'like', 'you know', 'basically', 'actually', 'literally', 'right', 'so', 'i mean'];

async function executeRemoveFillerWords(params, editor) {
  const { clips, setClips } = editor;
  const clip = findVideoClip(clips);
  const file = await getClipFile(clip);
  const fillers = (params.fillers || DEFAULT_FILLERS).map(f => f.toLowerCase());
  const padding = Math.max(0, Math.min(0.2, params.padding ?? 0.05));

  if (!WORKER_URL) throw new Error('Filler word removal requires VITE_TRANSCRIPT_WORKER_URL.');

  const { transcribeVideo } = await import('./transcriptService');
  const baseUrl = WORKER_URL.replace(/\/transcribe\/?$/, '');
  const { words } = await transcribeVideo(file, baseUrl, () => {});

  if (words.length === 0) throw new Error('No speech detected in video.');

  // Single-word fillers
  const singleFillers = fillers.filter(f => !f.includes(' '));
  // Multi-word fillers (e.g., "you know", "i mean")
  const multiFillers = fillers.filter(f => f.includes(' '));

  const cutRanges = [];

  // Match single-word fillers
  for (const w of words) {
    if (singleFillers.includes(w.word.toLowerCase().replace(/[.,!?]/g, ''))) {
      cutRanges.push({
        start: Math.max(0, w.start - padding) + clip.startTime,
        end: w.end + padding + clip.startTime,
      });
    }
  }

  // Match multi-word fillers (consecutive word pairs/triples)
  for (const filler of multiFillers) {
    const parts = filler.split(' ');
    for (let i = 0; i <= words.length - parts.length; i++) {
      const matches = parts.every((p, j) =>
        words[i + j].word.toLowerCase().replace(/[.,!?]/g, '') === p
      );
      if (matches) {
        cutRanges.push({
          start: Math.max(0, words[i].start - padding) + clip.startTime,
          end: words[i + parts.length - 1].end + padding + clip.startTime,
        });
      }
    }
  }

  if (cutRanges.length === 0) return 'No filler words found in transcript';

  const merged = mergeRanges(cutRanges);
  const totalCut = merged.reduce((s, r) => s + (r.end - r.start), 0);

  removeTimeRanges(clips, merged, setClips);

  return `Removed ${cutRanges.length} filler word${cutRanges.length !== 1 ? 's' : ''} (saved ${totalCut.toFixed(1)}s)`;
}

/* ─── Action: Auto Highlight ────────────────────────────────── */
async function executeAutoHighlight(params, editor) {
  const { clips, setClips } = editor;
  const clip = findVideoClip(clips);
  const file = await getClipFile(clip);
  const targetDuration = params.duration || 30;

  if (!WORKER_URL) throw new Error('Auto highlight requires VITE_TRANSCRIPT_WORKER_URL.');

  const { analyzeTranscript } = await import('./transcriptService');
  const baseUrl = WORKER_URL.replace(/\/transcribe\/?$/, '');

  const segments = await analyzeTranscript(file, clip.duration, baseUrl, targetDuration, () => {});

  if (!segments || segments.length === 0) {
    throw new Error('Could not identify highlight segments. The video may not have enough speech.');
  }

  // Take the top segment (highest score — analyzeTranscript returns sorted chronologically,
  // but we need to re-sort by score)
  const byScore = [...segments].sort((a, b) => (b.score || 0) - (a.score || 0));
  const best = byScore[0];

  // Create a new clip from the highlight segment
  const highlightClip = {
    ...clip,
    id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    startTime: 0,
    duration: best.endSeconds - best.startSeconds,
    trimStart: (clip.trimStart || 0) + best.startSeconds,
    trimEnd: 0,
  };

  // Replace timeline with just the highlight (preserve non-video clips like captions)
  const nonVideoClips = clips.filter(c => c.type === 'text' || c.type === 'sticker' || c.isCaption);
  setClips([highlightClip, ...nonVideoClips]);

  return `Extracted best ${Math.round(best.endSeconds - best.startSeconds)}s highlight`;
}

/* ─── Action: Remove Boring ─────────────────────────────────── */
async function executeRemoveBoring(params, editor) {
  const { clips, setClips } = editor;
  const clip = findVideoClip(clips);
  const file = await getClipFile(clip);
  const threshold = Math.max(1, Math.min(10, params.threshold ?? 4));

  if (!WORKER_URL) throw new Error('Remove boring requires VITE_TRANSCRIPT_WORKER_URL.');

  const { analyzeTranscript } = await import('./transcriptService');
  const baseUrl = WORKER_URL.replace(/\/transcribe\/?$/, '');

  // Use 15s windows for granular scoring
  const segments = await analyzeTranscript(file, clip.duration, baseUrl, 15, () => {});

  if (!segments || segments.length === 0) {
    throw new Error('Could not analyze video engagement. The video may not have enough speech.');
  }

  // Normalize scores to 1-10 scale
  const maxScore = Math.max(...segments.map(s => s.score || 0), 1);
  const normalizedThreshold = (threshold / 10) * maxScore;

  // Build "interesting" time ranges from segments scoring above threshold
  const interestingRanges = segments
    .filter(s => (s.score || 0) >= normalizedThreshold)
    .map(s => ({ start: s.startSeconds + clip.startTime, end: s.endSeconds + clip.startTime }));

  if (interestingRanges.length === 0) {
    throw new Error('All content scored below threshold. Try lowering the threshold.');
  }

  // Invert: "boring" = everything NOT in interesting ranges
  const merged = mergeRanges(interestingRanges);
  const boringRanges = getKeepSegments(clip.startTime, clip.startTime + clip.duration, merged)
    .map(seg => seg); // these are the gaps — which are the boring parts

  // Actually we need the inverse: getKeepSegments returns what's between the "interesting" ranges
  // which IS the boring part. So boringRanges = gaps between interesting ranges.
  // But we want to CUT the boring parts and KEEP the interesting parts.
  // So we should removeTimeRanges with the boring parts.

  if (boringRanges.length === 0) return 'No boring sections found — all content is engaging!';

  const totalCut = boringRanges.reduce((s, r) => s + (r.end - r.start), 0);
  removeTimeRanges(clips, boringRanges, setClips);

  return `Removed ${totalCut.toFixed(1)}s of low-engagement content`;
}

/* ─── Action: Detect Scenes ─────────────────────────────────── */
async function executeDetectScenes(params, editor) {
  const { clips, splitClip } = editor;
  const clip = findVideoClip(clips);
  const file = await getClipFile(clip);

  // Map sensitivity name to threshold (higher threshold = fewer splits)
  const sensitivityMap = { low: 0.5, medium: 0.35, high: 0.2 };
  const threshold = sensitivityMap[params.sensitivity] || 0.35;

  const { detectSceneChanges } = await import('./sceneDetector');
  const timestamps = await detectSceneChanges(file, { threshold });

  if (timestamps.length === 0) return 'No scene changes detected';

  // Map to absolute timeline positions and split
  let splitCount = 0;
  for (const t of timestamps) {
    const absTime = clip.startTime + t;
    // Find the clip that contains this time (may have been split already)
    const current = editor.clips.find(c =>
      c.startTime <= absTime && (c.startTime + c.duration) > absTime
    );
    if (current) {
      splitClip(current.id, absTime);
      splitCount++;
    }
  }

  return `Split into ${splitCount + 1} scene${splitCount > 0 ? 's' : ''}`;
}

/* ─── Action: Beat Sync ─────────────────────────────────────── */
async function executeBeatSync(params, editor) {
  const { clips, splitClip } = editor;
  const clip = findVideoClip(clips);
  const file = await getClipFile(clip);
  const sensitivity = Math.max(0.5, Math.min(3.0, params.sensitivity ?? 1.5));

  const { detectBeats } = await import('./beatDetector');
  const { beats, bpm } = await detectBeats(file, { sensitivity });

  if (beats.length === 0) return 'No beats detected in audio';

  let splitCount = 0;
  for (const t of beats) {
    const absTime = clip.startTime + t;
    const current = editor.clips.find(c =>
      c.startTime <= absTime && (c.startTime + c.duration) > absTime
    );
    if (current) {
      splitClip(current.id, absTime);
      splitCount++;
    }
  }

  return `Synced ${splitCount} cut${splitCount !== 1 ? 's' : ''} to beats (${Math.round(bpm)} BPM)`;
}

/* ─── Action: Smart Crop ────────────────────────────────────── */
async function executeSmartCrop(params, editor) {
  const { clips, updateClip } = editor;
  const clip = findVideoClip(clips);
  const file = await getClipFile(clip);
  const aspect = params.aspect || '9:16';

  const validAspects = ['9:16', '1:1', '4:5'];
  if (!validAspects.includes(aspect)) {
    throw new Error(`Invalid aspect ratio "${aspect}". Use: ${validAspects.join(', ')}`);
  }

  const { detectFaceKeyframes, buildCropFilter } = await import('./faceDetection');

  // Try to get transcript for better speaker tracking
  let words = null;
  try {
    if (WORKER_URL) {
      const { transcribeVideo } = await import('./transcriptService');
      const baseUrl = WORKER_URL.replace(/\/transcribe\/?$/, '');
      const result = await transcribeVideo(file, baseUrl, () => {});
      words = result.words;
    }
  } catch { /* proceed without transcript */ }

  const result = await detectFaceKeyframes(file, 0, clip.duration, words);
  const keyframes = result.keyframes || [];

  // Get video dimensions (needed for crop calculation)
  const video = document.createElement('video');
  video.preload = 'metadata';
  const dimensionPromise = new Promise((resolve) => {
    video.onloadedmetadata = () => resolve({ width: video.videoWidth, height: video.videoHeight });
    video.onerror = () => resolve({ width: 1920, height: 1080 }); // fallback
  });
  video.src = URL.createObjectURL(file);
  const { width: srcW, height: srcH } = await dimensionPromise;
  URL.revokeObjectURL(video.src);

  // Build crop filter for 9:16 (existing function), or store metadata for other ratios
  let cropFilter = null;
  if (aspect === '9:16') {
    cropFilter = buildCropFilter(keyframes, srcW, srcH, result.effectiveIntervals || []);
  }

  updateClip(clip.id, {
    cropAspect: aspect,
    cropKeyframes: keyframes,
    cropFilter: cropFilter,
  });

  return `Applied ${aspect} smart crop with face tracking`;
}

/* ─── Action: Zoom to Speaker ───────────────────────────────── */
async function executeZoomToSpeaker(params, editor) {
  const { clips, updateClip } = editor;
  const clip = findVideoClip(clips);
  const file = await getClipFile(clip);
  const zoomFactor = Math.max(1.1, Math.min(2.0, params.zoomFactor ?? 1.3));

  const { detectFaceKeyframes } = await import('./faceDetection');

  // Transcribe for speaker-aware tracking
  let words = null;
  try {
    if (WORKER_URL) {
      const { transcribeVideo } = await import('./transcriptService');
      const baseUrl = WORKER_URL.replace(/\/transcribe\/?$/, '');
      const result = await transcribeVideo(file, baseUrl, () => {});
      words = result.words;
    }
  } catch { /* proceed without transcript */ }

  const result = await detectFaceKeyframes(file, 0, clip.duration, words);
  const keyframes = result.keyframes || [];

  if (keyframes.length === 0) {
    throw new Error('No faces detected in video for speaker zoom.');
  }

  updateClip(clip.id, {
    zoomKeyframes: keyframes,
    zoomFactor,
  });

  return `Added speaker zoom keyframes (${zoomFactor}x)`;
}
