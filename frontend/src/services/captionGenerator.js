/**
 * Caption Generator — bridges transcriptService output into text clips
 * for the video editor timeline.
 *
 * Two modes:
 *  1. Auto-generate: uses transcriptService (Whisper) for word-level timing
 *  2. Manual paste: evenly distributes text across video duration
 */

import { DEFAULT_CLIP_PROPERTIES } from '../components/VideoEditor/constants';

// ─── Constants ────────────────────────────────────────────────
const MAX_WORDS_PER_CAPTION = 5;
const MAX_CHARS_PER_CAPTION = 40;
const MIN_CAPTION_DURATION = 0.8;   // seconds
const CAPTION_TRACK = 2;            // V3 — keep separate from user text clips

let _idCounter = 0;
const captionId = () => `caption-${Date.now()}-${_idCounter++}`;

// ─── Caption Style Presets ────────────────────────────────────
export const CAPTION_STYLES = {
  classic: {
    name: 'Classic',
    description: 'White text with drop shadow',
    textColor: '#ffffff',
    textSize: 36,
    textBold: true,
    textPosition: 'bottom-center',
    textBgColor: '',
    textAlign: 'center',
    textFontFamily: 'Spline Sans',
  },
  boxed: {
    name: 'Boxed',
    description: 'White text on dark background',
    textColor: '#ffffff',
    textSize: 34,
    textBold: true,
    textPosition: 'bottom-center',
    textBgColor: 'rgba(0,0,0,0.75)',
    textAlign: 'center',
    textFontFamily: 'Spline Sans',
  },
  modern: {
    name: 'Modern',
    description: 'Bold blue accent text',
    textColor: '#75aadb',
    textSize: 40,
    textBold: true,
    textPosition: 'bottom-center',
    textBgColor: '',
    textAlign: 'center',
    textFontFamily: 'Spline Sans',
  },
  minimal: {
    name: 'Minimal',
    description: 'Light subtle text',
    textColor: '#e2e8f0',
    textSize: 28,
    textBold: false,
    textPosition: 'bottom-center',
    textBgColor: '',
    textAlign: 'center',
    textFontFamily: 'Spline Sans',
  },
};

// ─── Word Grouping ────────────────────────────────────────────

/**
 * Group word-level timing data into caption phrases.
 * Respects sentence boundaries (punctuation), word count, and char limits.
 *
 * @param {Array<{word: string, start: number, end: number}>} words
 * @returns {Array<{text: string, start: number, end: number}>}
 */
export function groupWordsIntoCaptions(words) {
  if (!words || words.length === 0) return [];

  const phrases = [];
  let current = [];
  let charCount = 0;

  const flush = () => {
    if (current.length === 0) return;
    const text = current.map(w => w.word).join(' ');
    phrases.push({
      text,
      start: current[0].start,
      end: current[current.length - 1].end,
    });
    current = [];
    charCount = 0;
  };

  for (const w of words) {
    const wordLen = w.word.length;

    // Flush if adding this word would exceed limits
    if (current.length >= MAX_WORDS_PER_CAPTION ||
        (charCount + wordLen + 1 > MAX_CHARS_PER_CAPTION && current.length > 0)) {
      flush();
    }

    current.push(w);
    charCount += wordLen + (current.length > 1 ? 1 : 0); // +1 for space

    // Flush on sentence-ending punctuation
    if (/[.!?]$/.test(w.word)) {
      flush();
    }
  }

  flush();
  return phrases;
}

// ─── Clip Generation ──────────────────────────────────────────

/**
 * Convert caption phrases into timeline clip objects.
 *
 * @param {Array<{text: string, start: number, end: number}>} phrases
 * @param {string} styleKey — key from CAPTION_STYLES
 * @returns {Array} clip objects ready for addClip()
 */
export function phrasesToClips(phrases, styleKey = 'classic') {
  const style = CAPTION_STYLES[styleKey] || CAPTION_STYLES.classic;

  return phrases.map(phrase => ({
    ...DEFAULT_CLIP_PROPERTIES,
    id: captionId(),
    type: 'text',
    name: 'Caption',
    text: phrase.text,
    startTime: phrase.start,
    duration: Math.max(MIN_CAPTION_DURATION, phrase.end - phrase.start),
    track: CAPTION_TRACK,
    isCaption: true,
    // Apply style
    textColor: style.textColor,
    textSize: style.textSize,
    textBold: style.textBold,
    textPosition: style.textPosition,
    textBgColor: style.textBgColor,
    textAlign: style.textAlign,
    textFontFamily: style.textFontFamily,
  }));
}

// ─── Auto-Generate Pipeline ───────────────────────────────────

/**
 * Full auto-caption pipeline: extract audio -> transcribe -> group -> clips.
 *
 * @param {File|Blob|string} videoFile — video file, blob, or blob URL (FFmpeg writeFile accepts all)
 * @param {string} workerUrl — Cloudflare Workers AI Whisper endpoint
 * @param {string} styleKey — key from CAPTION_STYLES
 * @param {Function} onProgress — (stage: string, pct: number) => void
 * @returns {Promise<Array>} caption clip objects
 */
export async function generateCaptionClips(videoFile, workerUrl, styleKey, onProgress) {
  // Dynamic import to avoid loading transcriptService when not needed
  const { transcribeVideo } = await import('./transcriptService');

  onProgress?.('extracting', 0);
  const { words } = await transcribeVideo(videoFile, workerUrl, (stage, pct, detail) => {
    onProgress?.(stage, pct, detail);
  });

  console.log('[Captions] Transcription returned', words?.length ?? 0, 'words');

  if (!words || words.length === 0) {
    throw new Error('No speech detected in video');
  }

  onProgress?.('grouping', 90);
  const phrases = groupWordsIntoCaptions(words);
  console.log('[Captions] Grouped into', phrases.length, 'caption phrases');
  const clips = phrasesToClips(phrases, styleKey);
  console.log('[Captions] Generated', clips.length, 'caption clips');

  onProgress?.('done', 100);
  return clips;
}

// ─── Manual Transcript Parsing ────────────────────────────────

/**
 * Parse plain text into caption clips with evenly distributed timing.
 * Used when no transcription API is available.
 *
 * @param {string} text — raw transcript text
 * @param {number} videoDuration — total video duration in seconds
 * @param {string} styleKey — key from CAPTION_STYLES
 * @returns {Array} caption clip objects
 */
export function parseManualTranscript(text, videoDuration, styleKey = 'classic') {
  const cleaned = text.trim();
  if (!cleaned || videoDuration <= 0) return [];

  // Split into sentences first, fall back to word groups
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  const segments = sentences.length > 1 ? sentences : [];

  if (segments.length > 0) {
    // Distribute sentences evenly across video duration
    const segDuration = videoDuration / segments.length;
    const phrases = segments.map((seg, i) => ({
      text: seg.trim(),
      start: i * segDuration,
      end: Math.min((i + 1) * segDuration, videoDuration),
    }));
    return phrasesToClips(phrases, styleKey);
  }

  // No sentence boundaries — split into word groups
  const words = cleaned.split(/\s+/);
  if (words.length === 0) return [];

  const avgWordDuration = videoDuration / words.length;
  const fakeWords = words.map((word, i) => ({
    word,
    start: i * avgWordDuration,
    end: (i + 1) * avgWordDuration,
  }));

  const phrases = groupWordsIntoCaptions(fakeWords);
  return phrasesToClips(phrases, styleKey);
}
