/**
 * Caption / subtitle service for Long-to-Shorts vertical exports.
 *
 * Takes word-level timing data (from transcriptService) and builds
 * an FFmpeg drawtext filter chain that renders phrase-based captions
 * into the bottom third of a 1080x1920 vertical frame.
 *
 * Design decisions:
 *  - Words are grouped into short phrases (max ~5 words) for readability
 *  - Each phrase is shown/hidden based on its time window
 *  - Times are relative to segment start (0-based), matching input-seeking
 *  - Uses FFmpeg's enable='between(t,start,end)' for timing
 *  - Falls back gracefully: returns null when no words available
 *  - MAX 8 drawtext filters to prevent ffmpeg.wasm OOM
 *  - Font file must be loaded into FFmpeg FS via loadCaptionFont() before export
 */

import { loadFFmpeg } from './ffmpeg';

/** Filename used inside FFmpeg's virtual filesystem */
export const CAPTION_FONT_FILE = 'caption-bold.ttf';

let fontLoaded = false;

/**
 * Load the caption font into FFmpeg's virtual filesystem.
 * Must be called once before any export that uses drawtext captions.
 * Safe to call multiple times — only loads on the first call.
 */
export async function loadCaptionFont() {
  if (fontLoaded) return;
  await loadFFmpeg();
  const resp = await fetch('/fonts/caption-bold.ttf');
  if (!resp.ok) throw new Error(`Failed to fetch caption font: ${resp.status}`);
  const buf = await resp.arrayBuffer();
  const ffmpeg = (await import('./ffmpeg')).getFFmpegInstance;
  const instance = await ffmpeg();
  await instance.writeFile(CAPTION_FONT_FILE, new Uint8Array(buf));
  fontLoaded = true;
  console.log('[Captions] Font loaded into FFmpeg FS');
}

/**
 * Reset the font-loaded flag (call after terminateFFmpeg so the
 * font gets re-loaded into the new instance).
 */
export function resetCaptionFontState() {
  fontLoaded = false;
}

const MAX_WORDS_PER_PHRASE = 5;
const MAX_CHARS_PER_PHRASE = 35;

/**
 * Maximum number of drawtext filters per clip.
 * Each drawtext allocates font rendering memory inside ffmpeg.wasm.
 * More than ~10 filters on a single clip causes "memory access out of bounds".
 */
const MAX_DRAWTEXT_FILTERS = 8;

// ─── Phrase grouping ──────────────────────────────────────────

/**
 * Group words into readable phrases.
 *
 * @param {Array<{word: string, start: number, end: number}>} words
 * @param {number} segmentStart — absolute start time of the segment (seconds)
 * @returns {Array<{text: string, start: number, end: number}>}
 *   start/end are relative to segment start (0-based).
 */
export function buildPhrases(words, segmentStart) {
  if (!words || !words.length) return [];

  const phrases = [];
  let buf = [];
  let charCount = 0;

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const clean = w.word.trim();
    if (!clean) continue;

    buf.push({ ...w, word: clean });
    charCount += clean.length + 1; // +1 for space

    const atLimit = buf.length >= MAX_WORDS_PER_PHRASE || charCount >= MAX_CHARS_PER_PHRASE;
    const isLast = i === words.length - 1;
    // Break at sentence-ending punctuation too
    const atPunctuation = /[.!?]$/.test(clean);

    if ((atLimit || atPunctuation || isLast) && buf.length > 0) {
      phrases.push({
        text: buf.map(b => b.word).join(' '),
        start: Math.max(0, buf[0].start - segmentStart),
        end: Math.max(0, buf[buf.length - 1].end - segmentStart),
      });
      buf = [];
      charCount = 0;
    }
  }

  return phrases;
}

/**
 * Merge phrases down to at most `maxCount` by combining adjacent phrases.
 * Preserves the first phrase's start and last phrase's end.
 */
function limitPhrases(phrases, maxCount) {
  if (phrases.length <= maxCount) return phrases;

  // Evenly distribute phrases into maxCount buckets
  const merged = [];
  const bucketSize = phrases.length / maxCount;

  for (let i = 0; i < maxCount; i++) {
    const from = Math.round(i * bucketSize);
    const to = Math.round((i + 1) * bucketSize);
    const group = phrases.slice(from, to);
    if (group.length === 0) continue;

    merged.push({
      text: group.map(p => p.text).join(' '),
      start: group[0].start,
      end: group[group.length - 1].end,
    });
  }

  return merged;
}

// ─── FFmpeg drawtext filter builder ───────────────────────────

/**
 * Escape text for FFmpeg drawtext filter.
 *
 * FFmpeg drawtext `text=` option needs these escaped:
 *  - backslash, single quote, colon, semicolon
 *  - percent (drawtext format specifier)
 *  - brackets (filtergraph syntax)
 *  - newlines / carriage returns
 *
 * We also strip any remaining non-ASCII-printable to be safe
 * (ffmpeg.wasm font rendering can choke on unusual codepoints).
 */
function escapeDrawtext(text) {
  return text
    // Strip non-printable / non-basic-ASCII (keep space through tilde)
    .replace(/[^\x20-\x7E]/g, '')
    // Backslash must be escaped first
    .replace(/\\/g, '\\\\')
    // Remove single quotes entirely — they break text='...' wrapper
    // and replacing with non-ASCII (\u2019) would reintroduce chars we just stripped
    .replace(/'/g, '')
    // Characters with special meaning in FFmpeg filter expressions
    .replace(/:/g, '\\:')
    .replace(/;/g, '\\;')
    .replace(/%/g, '%%')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    // Ensure no empty string (drawtext with empty text crashes)
    || '...';
}

/**
 * Build an FFmpeg drawtext filter chain for captioning.
 *
 * Each phrase becomes a separate drawtext filter with enable='between(t,start,end)'.
 * Filters are chained with commas (within the -vf string).
 *
 * Important: commas inside the enable expression are escaped with backslash
 * so FFmpeg's filter parser doesn't split on them. Single-quoting the
 * enable value also works but using \\, is more robust across FFmpeg builds.
 *
 * The number of drawtext filters is capped at MAX_DRAWTEXT_FILTERS to prevent
 * memory exhaustion in ffmpeg.wasm. When phrases exceed the limit, adjacent
 * phrases are merged into longer display groups.
 *
 * @param {Array<{text: string, start: number, end: number}>} phrases
 * @returns {string|null} FFmpeg filter string fragment, or null if empty.
 *   This should be appended to the existing -vf value with a comma.
 */
export function buildCaptionFilter(phrases) {
  if (!phrases || !phrases.length) return null;

  // Cap the number of drawtext filters to avoid OOM in ffmpeg.wasm
  const limited = limitPhrases(phrases, MAX_DRAWTEXT_FILTERS);

  const filters = limited.map(p => {
    const escaped = escapeDrawtext(p.text);
    const start = p.start.toFixed(2);
    const end = p.end.toFixed(2);

    // Position: centered horizontally, bottom third of 1080x1920
    // y = 1920 * 0.78 = ~1498
    return [
      `drawtext=fontfile=${CAPTION_FONT_FILE}`,
      `text='${escaped}'`,
      `fontsize=48`,
      `fontcolor=white`,
      `borderw=2`,
      `bordercolor=black`,
      `box=1`,
      `boxcolor=black@0.55`,
      `boxborderw=12`,
      `x=(w-text_w)/2`,
      `y=h*0.78`,
      `enable='between(t\\,${start}\\,${end})'`,
    ].join(':');
  });

  return filters.join(',');
}

/**
 * High-level: given segment words and timing, produce a caption filter string.
 *
 * @param {Array<{word: string, start: number, end: number}>} words
 * @param {number} segmentStart — absolute start of the segment
 * @returns {string|null} Filter string to append to -vf, or null.
 */
export function buildCaptionFilterFromWords(words, segmentStart) {
  const phrases = buildPhrases(words, segmentStart);
  return buildCaptionFilter(phrases);
}
