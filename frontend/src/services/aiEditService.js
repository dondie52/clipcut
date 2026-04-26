/**
 * AI Edit Service — Action Executor
 *
 * Receives natural language prompts, sends them to the AI proxy Worker for
 * intent parsing, then executes the returned actions against the editor state.
 */

import { detectSilence, totalSilenceDuration, intersectSilenceRanges } from './silenceDetector';
import { FILTER_PRESETS } from '../components/VideoEditor/constants';
import { getWorkerUrl, WORKER_URL_NOT_SET_ERROR } from './workerConfig';

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

// Valid transition names match TRANSITION_PRESETS in VideoEditor/constants.js
const VALID_TRANSITIONS = ['fade', 'fadeblack', 'fadewhite', 'dissolve', 'wipeleft', 'wiperight', 'slideup', 'slidedown'];

const TIME_TOKEN = String.raw`(?:\d+:\d+(?:\.\d+)?|\d*\.?\d+)`;
// Matches a unit suffix on a time token: seconds (default), minutes, hours.
// Used by patterns that accept "split at 1 minute", "delete after 30s", etc.
// Order longer-first so "minutes" wins over "min".
const TIME_UNIT = String.raw`(?:milliseconds?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h)`;

// Parse "0.26" → 0.26, "1:45" → 105, "30s" → 30. Returns null if unparseable.
function parseTimeToken(raw) {
  if (typeof raw !== 'string') return null;
  const t = raw.trim().replace(/\s*(?:s|sec|secs|seconds?)$/i, '');
  if (t.includes(':')) {
    const [m, s] = t.split(':');
    const minutes = parseInt(m, 10);
    const seconds = parseFloat(s);
    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null;
    return minutes * 60 + seconds;
  }
  const n = parseFloat(t);
  return Number.isFinite(n) ? n : null;
}

// Convert a base number (assumed seconds when no colon) by its unit token.
// "5", "min" → 300. mm:ss times ignore the unit — already in seconds.
function applyTimeUnit(seconds, unit, raw) {
  if (seconds == null) return null;
  if (typeof raw === 'string' && raw.includes(':')) return seconds; // mm:ss is already seconds
  if (!unit) return seconds;
  const u = unit.toLowerCase();
  if (u === 'ms' || u.startsWith('millisecond')) return seconds / 1000;
  if (u === 'h' || u === 'hr' || u === 'hrs' || u.startsWith('hour')) return seconds * 3600;
  if (u === 'm' || u === 'min' || u === 'mins' || u.startsWith('minute')) return seconds * 60;
  return seconds; // s/sec/seconds/secs — already seconds
}

// English ordinals → 1-based index; "last" maps to -1.
const ORDINAL_INDEX = {
  first: 1, '1st': 1,
  second: 2, '2nd': 2,
  third: 3, '3rd': 3,
  fourth: 4, '4th': 4,
  fifth: 5, '5th': 5,
  sixth: 6, '6th': 6,
  seventh: 7, '7th': 7,
  eighth: 8, '8th': 8,
  ninth: 9, '9th': 9,
  tenth: 10, '10th': 10,
  last: -1, final: -1,
};

// Damerau-Levenshtein distance (allows 1-char transpositions). Used for
// tolerant keyword matching of short, known targets like "split" / "transition".
function editDistance(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[m][n];
}

/**
 * Normalise sloppy typing so the downstream regexes hit.
 * Kept deliberately narrow — only fuzz the exact keywords we command on, and
 * only fix punctuation mistypes that have an unambiguous correct form.
 * For arbitrary rephrasings, let the Worker LLM take over.
 */
function normaliseTypos(prompt) {
  // Semicolon is one key over from colon on QWERTY — "0;26" almost always means "0:26".
  let out = prompt.replace(/(\d)\s*;\s*(\d)/g, '$1:$2');

  // Fuzz-correct "split", "transition(s)", "delete", and time-unit words token-by-token.
  // Thresholds are tuned so common nearby words ("shift" dist 2 to "split",
  // "select"/"delegate" dist >=2 to "delete") are NOT coerced — only genuine near-misses hit.
  const KNOWN = new Set([
    'split', 'transition', 'transitions', 'delete',
    'minute', 'minutes', 'second', 'seconds', 'hour', 'hours',
  ]);
  out = out.replace(/\b[a-z]{3,14}\b/gi, (word) => {
    const lower = word.toLowerCase();
    if (KNOWN.has(lower)) return word;
    // "split" — very short; require distance 1 to avoid grabbing real words.
    if (lower.length >= 4 && lower.length <= 7 && editDistance(lower, 'split') === 1) return 'split';
    // "transition(s)" — allow distance 2 (missing letter + transposition is common).
    if (lower.length >= 7 && editDistance(lower, 'transitions') <= 2) return 'transitions';
    if (lower.length >= 7 && editDistance(lower, 'transition') <= 2) return 'transition';
    // "delete" — require distance 1 ("deleate", "deleted"). Distance 2 would catch
    // "select"/"delegate"/etc. so keep it tight.
    if (lower.length >= 5 && lower.length <= 8 && editDistance(lower, 'delete') === 1) return 'delete';
    // Time units. Anchor on "min"/"sec"/"hou" prefix to keep distance-2 fuzzes safe —
    // "mintune"/"mintue" → "minute", "secound" → "second", "hous" → "hours".
    // When both singular and plural match, pick the closer one ("secound" → "second"
    // not "seconds", since the ordinal "the second clip" must still be recognisable).
    if (lower.startsWith('min') && lower.length >= 5 && lower.length <= 9) {
      const dS = editDistance(lower, 'minute');
      const dP = editDistance(lower, 'minutes');
      if (Math.min(dS, dP) <= 2) return dS <= dP ? 'minute' : 'minutes';
    }
    if (lower.startsWith('sec') && lower.length >= 5 && lower.length <= 9) {
      const dS = editDistance(lower, 'second');
      const dP = editDistance(lower, 'seconds');
      if (Math.min(dS, dP) <= 2) return dS <= dP ? 'second' : 'seconds';
    }
    if (lower.startsWith('hou') && lower.length >= 3 && lower.length <= 6) {
      const dS = editDistance(lower, 'hour');
      const dP = editDistance(lower, 'hours');
      if (Math.min(dS, dP) <= 1) return dS <= dP ? 'hour' : 'hours';
    }
    return word;
  });

  return out;
}

/**
 * Local intent parser — matches common editing commands to structured actions
 * without requiring a network call.
 *
 * Returns one of:
 *   - Array of action objects → execute them
 *   - { chat: true, message: string } → the parser needs clarification from the user
 *   - null → prompt is ambiguous to the local parser; fall through to the Worker
 *
 * The `context` arg is optional but lets the parser catch time-notation ambiguity
 * (e.g. "split at 0.26" on a 5-minute video almost certainly meant 0:26 = 26s).
 */
export function parseIntentLocally(prompt, context = {}) {
  const p = normaliseTypos(prompt.toLowerCase().trim());
  const videoDuration = Number(context.duration) || 0;

  // Pattern table: [regex, action builder]
  const patterns = [
    // Order matters: match removal intent BEFORE the generic `captions?` fallback.
    // The prior `(?!.*remove)` lookahead only inspected characters AFTER the match,
    // so "remove captions" still hit add_captions.
    [/\b(?:remove|delete|clear|get\s+rid\s+of|strip)\s+(?:the\s+|all\s+)?(?:auto[- ]?)?(?:captions?|subs?(?:titles?)?)\b/, () => [{ type: 'remove_captions', params: {} }]],
    [/\b(?:no|without)\s+(?:captions?|subs?(?:titles?)?)\b/, () => [{ type: 'remove_captions', params: {} }]],
    [/\badd\s+(auto[- ]?)?captions?\b/, () => [{ type: 'add_captions', params: { style: 'classic' } }]],
    [/\b(?:add|generate|put|turn\s+on)\s+(?:the\s+)?subs?(?:titles?)?\b/, () => [{ type: 'add_captions', params: { style: 'classic' } }]],
    [/\bcaptions?\b/, () => [{ type: 'add_captions', params: { style: 'classic' } }]],
    [/\bremove\s+silence\b/, () => [{ type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } }]],
    [/\bextract\s+(?:the\s+)?audio\b/, () => [{ type: 'extract_audio', params: { format: 'mp3' } }]],
    // Filler must match BEFORE the silence-synonym pattern below — "cut the ums" shouldn't become remove_silence.
    [/\b(?:remove|cut|delete|strip)\s+(?:the\s+|all\s+)?(?:ums?|uhs?|umms?|filler\s+words?)\b/, () => [{ type: 'remove_filler_words', params: {} }]],
    [/\bremove\s+filler\b/, () => [{ type: 'remove_filler_words', params: {} }]],
    [/\b(?:cut|trim|delete|take)\s+(?:out\s+)?(?:the\s+|all\s+)?(?:silent|silence|quiet\s+parts?|dead\s+air|pauses?)\b/, () => [{ type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } }]],
    [/\b(?:make\s+(?:it|this)\s+shorter|shorten\s+(?:it|this|the\s+video))\b/, () => [{ type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } }]],
    [/\bmake\s+(?:it\s+)?vertical\b|tiktok|9[:\s]16|reels?\b|shorts?\b/, () => [{ type: 'smart_crop', params: { aspect: '9:16' } }]],
    [/\bmake\s+(?:it\s+)?square\b|1[:\s]1/, () => [{ type: 'smart_crop', params: { aspect: '1:1' } }]],
    [/\bmake\s+(?:it\s+)?(?:horizontal|landscape|widescreen)\b|16[:\s]9/, () => [{ type: 'smart_crop', params: { aspect: '16:9' } }]],
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
    // Delete by clip index — "delete the second clip", "delete the last clip", "remove clip 2".
    // Must come BEFORE the unit-aware time patterns so "second clip" isn't read as "2 seconds clip".
    [new RegExp(String.raw`\b(?:delete|remove|drop|cut)\s+(?:the\s+)?(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|last|final|\d+(?:st|nd|rd|th)?)\s+clip\b`), (m) => {
      const tok = m[1].toLowerCase();
      const idx = ORDINAL_INDEX[tok] ?? parseInt(tok, 10);
      if (!Number.isFinite(idx) || idx === 0) return null;
      return [{ type: 'delete_clip', params: { index: idx } }];
    }],
    [new RegExp(String.raw`\b(?:delete|remove|drop)\s+clip\s+(?:#\s*)?(\d+)\b`), (m) => {
      const idx = parseInt(m[1], 10);
      if (!Number.isFinite(idx) || idx === 0) return null;
      return [{ type: 'delete_clip', params: { index: idx } }];
    }],
    // Split accepts decimals (0.26) AND mm:ss (0:26) AND plain seconds ("30", "30s")
    // AND minute/hour units ("1 minute", "1.5 hours", "30 mins", "1m").
    // `TIME_TOKEN`/`TIME_UNIT` come from the enclosing scope.
    [new RegExp(String.raw`\bsplit\s+(?:at\s+|@\s*)?(${TIME_TOKEN})\s*(${TIME_UNIT})?\b`), (m) => {
      const raw = m[1];
      const unit = m[2];
      const base = parseTimeToken(raw);
      if (base === null) return null;
      const at = applyTimeUnit(base, unit, raw);
      // Ambiguity heuristic: user wrote decimal notation like "0.26" on a video longer than 60s.
      // They probably meant 0:26 (26s), not 0.26s. Ask rather than do the wrong thing.
      // Skip when an explicit unit was given — "0.26 seconds" is unambiguous.
      const usedDotNotation = raw.includes('.') && !raw.includes(':');
      const looksLikeClockStyle = /^\d+\.\d{2}$/.test(raw); // "0.26", "1.45"
      if (!unit && usedDotNotation && looksLikeClockStyle && videoDuration >= 60 && at < 1) {
        const [mm, ss] = raw.split('.');
        const clockSeconds = parseInt(mm, 10) * 60 + parseInt(ss, 10);
        return {
          chat: true,
          message: `Did you mean split at ${clockSeconds}s (${mm}:${ss}) or ${at}s? Reply with "split at 0:${ss}" for ${clockSeconds} seconds, or "split at ${at} seconds" for ${at}s.`,
        };
      }
      return [{ type: 'split_clip', params: { at } }];
    }],
    [new RegExp(String.raw`\bcut\s+(?:from\s+)?(${TIME_TOKEN})\s*(${TIME_UNIT})?\s*(?:to|-)\s*(${TIME_TOKEN})\s*(${TIME_UNIT})?`), (m) => {
      const from = applyTimeUnit(parseTimeToken(m[1]), m[2], m[1]);
      const to = applyTimeUnit(parseTimeToken(m[3]), m[4] || m[2], m[3]);
      if (from === null || to === null) return null;
      return [{ type: 'cut_clip', params: { from, to } }];
    }],
    // "delete after 60s" / "remove everything from 1:00 onwards" / "trim from 1 minute to end"
    // → cut from X to end of video. Needs videoDuration so we know where "end" is.
    [new RegExp(String.raw`\b(?:delete|remove|cut|trim)\s+(?:everything\s+)?(?:after|past|from)\s+(${TIME_TOKEN})\s*(${TIME_UNIT})?(?:\s+(?:onwards?|to\s+(?:the\s+)?end))?\b`), (m) => {
      const from = applyTimeUnit(parseTimeToken(m[1]), m[2], m[1]);
      if (from === null) return null;
      if (!videoDuration || videoDuration <= from) return null;
      return [{ type: 'cut_clip', params: { from, to: videoDuration } }];
    }],
    // "delete before 30s" / "remove everything before 0:30" / "trim before 1 minute" → cut from 0 to X.
    [new RegExp(String.raw`\b(?:delete|remove|cut|trim)\s+(?:everything\s+)?before\s+(${TIME_TOKEN})\s*(${TIME_UNIT})?\b`), (m) => {
      const to = applyTimeUnit(parseTimeToken(m[1]), m[2], m[1]);
      if (to === null || to <= 0) return null;
      return [{ type: 'cut_clip', params: { from: 0, to } }];
    }],
    // "remove the first 5 seconds" / "trim first 1 minute" / "delete the first 30"
    // → cut from 0 to N. Same effect as "delete before N" but more natural phrasing.
    [new RegExp(String.raw`\b(?:delete|remove|cut|trim)\s+(?:the\s+)?first\s+(${TIME_TOKEN})\s*(${TIME_UNIT})?\b`), (m) => {
      const to = applyTimeUnit(parseTimeToken(m[1]), m[2], m[1]);
      if (to === null || to <= 0) return null;
      return [{ type: 'cut_clip', params: { from: 0, to } }];
    }],
    // "remove the last 10 seconds" / "trim last 1 minute" → cut from (duration - N) to end.
    [new RegExp(String.raw`\b(?:delete|remove|cut|trim)\s+(?:the\s+)?last\s+(${TIME_TOKEN})\s*(${TIME_UNIT})?\b`), (m) => {
      const n = applyTimeUnit(parseTimeToken(m[1]), m[2], m[1]);
      if (n === null || n <= 0) return null;
      if (!videoDuration || videoDuration <= n) return null;
      return [{ type: 'cut_clip', params: { from: videoDuration - n, to: videoDuration } }];
    }],
    // Standalone "delete the rest" — anchor at playhead. The compound handler
    // below catches the more common "split at X then delete the rest" case and
    // anchors against the split time instead.
    [/\b(?:delete|remove|trim|cut)\s+(?:the\s+)?rest\b/, () => {
      const anchor = context.currentTime;
      if (anchor == null || !Number.isFinite(anchor) || !videoDuration || videoDuration <= anchor) return null;
      return [{ type: 'cut_clip', params: { from: anchor, to: videoDuration } }];
    }],
    // Transitions — match a named type, or ask which one if user just said "add transitions".
    [/\badd\s+(?:a\s+|an\s+)?(fade\s*black|fade\s*white|fade|dissolve|wipe\s*left|wipe\s*right|slide\s*up|slide\s*down)\s*(?:transitions?)?\b/, (m) => {
      const name = m[1].replace(/\s+/g, '').toLowerCase();
      return [{ type: 'add_transition', params: { name } }];
    }],
    [/\badd\s+(?:a\s+|an\s+|some\s+)?transitions?\b/, () => ({
      chat: true,
      message: "Which transition would you like — fade, fade black, fade white, dissolve, wipe left, wipe right, slide up, or slide down? I'll apply it between every pair of adjacent clips.",
    })],
    [/\b(?:apply\s+)?(?:a\s+)?(cinematic|vintage|bw|b&w|black\s+and\s+white|warm|cool|90s|sepia)\s*filter\b/, (m) => {
      return [{ type: 'apply_filter', params: { name: m[1].replace(/\s+/g, ' ') } }];
    }],
    [/\bapply\s+(cinematic|vintage|bw|b&w|warm|cool|90s|sepia)\b/, (m) => {
      return [{ type: 'apply_filter', params: { name: m[1] } }];
    }],
  ];

  // Compound prompts: anything with a clause separator ("and", "then", ",") gets
  // each clause parsed independently and the actions concatenated. Examples:
  //   "split at 1:00 then delete the rest"        → [split, cut]
  //   "remove the first 5 seconds and add captions" → [cut, add_captions]
  //   "add captions, remove silence, and apply cinematic filter" → 3-action auto-edit
  //
  // Returns the compound result only if it produced ≥2 actions (or any clause
  // asked for clarification). A single-action compound falls through to the
  // single-clause walk on the whole prompt — that way phrases that happen to
  // contain "and" but represent one intent (e.g. "remove ums and uhs") still
  // match their named pattern below.
  //
  // Special case: "delete the rest" needs an anchor for where "the rest" begins.
  // Inside a compound it resolves against the split time (if any clause is a
  // split_clip); otherwise against the playhead. The same anchor logic also
  // lives as a single-clause pattern above for the standalone case.
  const clauses = p.split(/\s+and\s+(?:then\s+)?|\s+then\s+|,\s*/).map(s => s.trim()).filter(Boolean);
  if (clauses.length >= 2) {
    // First pass: locate the split time so "delete the rest" can resolve against it.
    let splitTime = null;
    for (const clause of clauses) {
      const sub = parseIntentLocally(clause, context);
      if (Array.isArray(sub) && sub[0]?.type === 'split_clip' && Number.isFinite(sub[0].params?.at)) {
        splitTime = sub[0].params.at;
        break;
      }
    }

    const collected = [];
    for (const clause of clauses) {
      if (/\b(?:delete|remove|trim|cut)\s+(?:the\s+)?rest\b/.test(clause)) {
        const anchor = splitTime != null ? splitTime : context.currentTime;
        if (anchor != null && Number.isFinite(anchor) && videoDuration > anchor) {
          collected.push({ type: 'cut_clip', params: { from: anchor, to: videoDuration } });
        }
        continue;
      }
      const sub = parseIntentLocally(clause, context);
      if (!sub) continue;
      if (!Array.isArray(sub)) return sub; // chat/clarification — short-circuit
      collected.push(...sub);
    }
    if (collected.length >= 2) return collected;
  }

  for (const [regex, builder] of patterns) {
    const match = p.match(regex);
    if (match) {
      const result = builder(match);
      if (result) return result;
    }
  }

  // Anything that isn't a recognised editing command falls through to the Worker LLM.
  // We deliberately do NOT canned-reply for greetings / small talk — let the model think.
  return null;
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
  const { history, onSlowResponse } = options;

  // Step 1: Parse intent via Cloudflare Worker (with conversation history)
  const parsed = await parseIntent(prompt, context, history, onSlowResponse);

  // If the Worker returned a conversational reply, pass it through without executing
  if (parsed && parsed.chat === true) {
    return { summary: parsed.message, actionLabels: [], isChat: true };
  }

  const actions = parsed;

  // Synchronous mirror of clips so chained actions see each other's writes
  // immediately, without waiting for React to commit and refresh clipsRef.
  // The host's getClips() (clipsSnapshotRef.current) is updated during render
  // — between an action's setClips and the next render, it lags behind.
  // Wrap setClips so the mirror is updated in the same tick the updater runs,
  // and route reads through the mirror.
  let liveClips = editor.getClips ? editor.getClips() : editor.clips;
  const wrappedEditor = {
    ...editor,
    setClips: (updater) => {
      liveClips = typeof updater === 'function' ? updater(liveClips) : updater;
      editor.setClips(updater);
    },
    getClips: () => liveClips,
  };

  // Step 2: Execute each action sequentially; collect successes and failures
  const labels = [];
  const errors = [];
  for (const action of actions) {
    try {
      const label = await executeAction(action, wrappedEditor);
      if (label) labels.push(label);
    } catch (err) {
      // Actions (esp. ones backed by FFmpeg WASM) can reject with non-Error values
      // that have no .message — rendering as the literal string "undefined" is useless.
      // Fall through a chain of accessors so the user sees something meaningful.
      const msg =
        (err && err.message) ||
        (typeof err === 'string' ? err : null) ||
        (err && err.toString && err.toString() !== '[object Object]' ? err.toString() : null) ||
        'unknown error';
      console.error(`[AI] action '${action.type}' failed:`, err);
      errors.push(`${action.type}: ${msg}`);
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
async function parseIntent(prompt, context, history, onSlowResponse) {
  // Try local parser first — handles all quick-action prompts instantly.
  // The local parser can also return { chat: true, message } for clarification —
  // that shape is passed straight through to executeAiEdit, which renders it as chat.
  const localResult = parseIntentLocally(prompt, context);
  if (localResult) return localResult;

  // Fall back to Worker for complex / conversational prompts
  if (!getWorkerUrl()) {
    throw new Error(WORKER_URL_NOT_SET_ERROR);
  }

  const baseUrl = getWorkerUrl().replace(/\/transcribe\/?$/, '');
  const editUrl = `${baseUrl}/edit`;

  const payload = { prompt, context };
  if (Array.isArray(history) && history.length > 0) {
    payload.history = history;
  }

  // Try up to 2 times (retry once on invalid JSON or timeout)
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const slowTimerId = onSlowResponse
      ? setTimeout(() => { try { onSlowResponse(); } catch { /* ignore */ } }, 8000)
      : null;

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
      if (slowTimerId) clearTimeout(slowTimerId);
      if (err.name === 'AbortError') {
        // Retry once on timeout — Workers AI cold starts can exceed 15s
        if (attempt === 0) continue;
        throw new Error('AI service took too long to respond. Try a quick-action phrasing like "add captions", "remove silence", or "make it vertical".');
      }
      throw err;
    }
    clearTimeout(timeoutId);
    if (slowTimerId) clearTimeout(slowTimerId);

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

    case 'remove_captions':
      return executeRemoveCaptions(editor);

    case 'remove_silence':
      return await executeRemoveSilence(action.params, editor);

    case 'cut_clip':
      return executeCutClip(action.params, editor);

    case 'split_clip':
      return executeSplitClip(action.params, editor);

    case 'delete_clip':
      return executeDeleteClip(action.params, editor);

    case 'add_transition':
      return executeAddTransition(action.params, editor);

    case 'add_text':
      return executeAddText(action.params, editor);

    case 'apply_filter':
      return executeApplyFilter(action.params, editor);

    case 'change_speed':
      return executeChangeSpeed(action.params, editor);

    case 'add_music':
      return 'Background music (coming soon)';

    case 'extract_audio':
      return await executeExtractAudio(action.params, editor);

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

/* ─── Action: Remove Captions ───────────────────────────────── */
function executeRemoveCaptions(editor) {
  const { clips, setClips } = editor;
  const captionCount = clips.filter(c => c.isCaption).length;
  if (captionCount === 0) return 'No captions to remove';
  setClips(prev => prev.filter(c => !c.isCaption));
  return `Removed ${captionCount} caption${captionCount === 1 ? '' : 's'}`;
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

  if (!getWorkerUrl()) {
    throw new Error(WORKER_URL_NOT_SET_ERROR);
  }

  // Dynamic import to keep bundle small
  const { generateCaptionClips, findClipsForSource } = await import('./captionGenerator');

  const file = videoClip.file || (videoClip.blobUrl ? await fetch(videoClip.blobUrl).then(r => r.blob()) : null);
  if (!file) throw new Error('Cannot access video file for transcription.');

  // Caption every timeline clip that references this source — handles splits
  // and deletes. `findClipsForSource` matches by mediaId when present (survives
  // splits) and falls back to file/blobUrl identity otherwise.
  const videoClipsForSource = findClipsForSource(videoClip, clips);
  const captionClips = await generateCaptionClips(file, getWorkerUrl(), style, () => {}, videoClipsForSource);

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

/* ─── Action: Extract Audio ─────────────────────────────────── */
// Pulls the audio track out of a video clip and drops it on the timeline as a new
// audio clip, stacked directly under the source so it plays in sync. The source
// video's audio is left untouched — user mutes manually if they want to swap.
export async function executeExtractAudio(params, editor) {
  const { clips, setClips, selectedClipId, mediaItems = [] } = editor;
  const format = params.format || 'mp3';

  const isVideoClip = (c) =>
    c && c.type !== 'audio' && c.type !== 'text' && c.type !== 'sticker' && !c.isCaption;

  const selected = clips.find(c => c.id === selectedClipId);
  const videoClip = (selected && isVideoClip(selected))
    ? selected
    : clips.find(isVideoClip);

  if (!videoClip) {
    throw new Error('No video clip found to extract audio from. Import a video first.');
  }

  const media = videoClip.mediaId ? mediaItems.find(m => m.id === videoClip.mediaId) : null;
  const file =
    videoClip.file ||
    media?.file ||
    (videoClip.blobUrl ? await fetch(videoClip.blobUrl).then(r => r.blob()) : null);

  if (!file) throw new Error('Cannot access the source video file.');

  let audioBlob;
  try {
    const { extractAudio } = await import('./audioOperations');
    audioBlob = await extractAudio(file, format);
  } catch (err) {
    const meta = `file=${file?.name || '(blob)'} size=${file?.size ?? '?'} type=${file?.type || '?'}`;
    console.error('[extract_audio] FFmpeg failed:', err, meta);
    const underlying =
      (err && err.message) ||
      (typeof err === 'string' ? err : '') ||
      'FFmpeg failed (no message — check devtools)';
    throw new Error(`Couldn't extract audio: ${underlying}. (${meta})`);
  }
  const baseName = (videoClip.name || 'clip').replace(/\.[^.]+$/, '');
  const audioFile = new File([audioBlob], `${baseName}.${format}`, { type: audioBlob.type });
  const blobUrl = URL.createObjectURL(audioBlob);

  const newClip = {
    id: `extracted-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: `${baseName} (audio)`,
    type: 'audio',
    startTime: videoClip.startTime,
    duration: videoClip.duration,
    file: audioFile,
    blobUrl,
    volume: 1,
  };

  setClips(prev => [...prev, newClip]);
  return `Extracted audio from "${baseName}"`;
}

/* ─── Action: Remove Silence ────────────────────────────────── */
async function executeRemoveSilence(params, editor) {
  const { setClips, getClips } = editor;
  const threshold = Math.max(-60, Math.min(-20, params.threshold ?? -40));
  const minDuration = Math.max(0.1, Math.min(2.0, params.minDuration ?? 0.5));

  // Read fresh clips. Auto-edit chains add_captions → remove_silence → apply_filter
  // and the editor.clips snapshot captured by executeAiEdit goes stale between actions
  // (React state updates are async). Reading via getClips picks up captions that
  // executeAddCaptions added in the prior step.
  const clips = getClips ? getClips() : editor.clips;

  // Find video clips with audio we can analyze
  const videoClips = clips.filter(c =>
    c.type !== 'text' && c.type !== 'sticker' && !c.isCaption && (c.file || c.blobUrl)
  );

  if (videoClips.length === 0) {
    throw new Error('No clips with audio found to analyze for silence.');
  }

  let totalRemoved = 0;
  let sectionsRemoved = 0;

  // Cache silence ranges per source file. Multiple timeline clips often reference
  // the same media (e.g. a clip that was split in two) — without this we'd extract
  // and analyze the same audio N times.
  const sourceKey = (clip) => clip.mediaId || clip.file || clip.blobUrl;
  const silenceCache = new Map();

  // Process each clip independently
  const newClips = [];

  for (const clip of videoClips) {
    const file = clip.file || (clip.blobUrl ? await fetch(clip.blobUrl).then(r => r.blob()) : null);
    if (!file) {
      newClips.push(clip);
      continue;
    }

    const key = sourceKey(clip);
    let silentRanges = silenceCache.get(key);
    if (!silentRanges) {
      silentRanges = await detectSilence(file, { threshold, minDuration });
      silenceCache.set(key, silentRanges);
    }

    // Silent ranges are in SOURCE time. Keep only the portion that falls inside
    // this clip's trimmed window, then shift from source time to timeline time.
    // Without this intersect step, silences in trimmed-away portions of the
    // source would be treated as if they applied to the visible clip — producing
    // inverted ranges and the notorious "saved -260.4s" bug.
    const trimStart = clip.trimStart || 0;
    const visible = intersectSilenceRanges(silentRanges, trimStart, trimStart + clip.duration, minDuration);

    if (visible.length === 0) {
      newClips.push(clip);
      continue;
    }

    const timelineSilent = visible.map(r => ({
      start: clip.startTime + (r.start - trimStart),
      end:   clip.startTime + (r.end   - trimStart),
    }));

    const keepSegments = getKeepSegments(clip.startTime, clip.startTime + clip.duration, timelineSilent);

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

    totalRemoved += totalSilenceDuration(visible);
    sectionsRemoved += visible.length;
  }

  // Use functional setClips so we preserve any clip the prior action added between
  // closure capture and now (most importantly: caption clips from executeAddCaptions
  // running first in auto-edit). Drop the original video clips we processed and
  // splice the replacements in at the position of the first one, so captions/stickers
  // keep their relative order (most consumers sort by track/startTime, but anything
  // iterating in array order — z-index, debug logs — would otherwise see drift).
  const processedIds = new Set(videoClips.map(c => c.id));
  setClips(prev => {
    const out = [];
    let inserted = false;
    for (const c of prev) {
      if (processedIds.has(c.id)) {
        if (!inserted) { out.push(...newClips); inserted = true; }
        continue;
      }
      out.push(c);
    }
    if (!inserted) out.push(...newClips);
    return out;
  });

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

/* ─── Action: Delete Clip (by 1-based index, or -1 for last) ──── */
function executeDeleteClip(params, editor) {
  const { setClips, getClips } = editor;
  const clips = getClips ? getClips() : editor.clips;

  // Operate on visible media clips (skip captions/text/stickers), ordered as
  // they appear on the timeline — track first, then start time. This matches
  // the user's mental model when they say "the second clip".
  const targets = clips
    .filter(c => !c.isCaption && c.type !== 'text' && c.type !== 'sticker')
    .sort((a, b) => (a.track || 0) - (b.track || 0) || a.startTime - b.startTime);

  if (targets.length === 0) {
    throw new Error('No clips on the timeline to delete.');
  }

  const idx = params.index;
  if (idx == null || !Number.isFinite(idx)) {
    throw new Error('Specify which clip to delete (e.g., "delete the second clip" or "delete clip 2").');
  }

  let target;
  let label;
  if (idx === -1) {
    target = targets[targets.length - 1];
    label = 'last';
  } else if (idx > 0 && idx <= targets.length) {
    target = targets[idx - 1];
    label = `#${idx}`;
  } else {
    const wordFor = targets.length === 1 ? 'clip' : 'clips';
    const verbFor = targets.length === 1 ? 'is' : 'are';
    throw new Error(`Clip ${idx} doesn't exist — there ${verbFor} only ${targets.length} ${wordFor} on the timeline.`);
  }

  setClips(prev => prev.filter(c => c.id !== target.id));
  const name = target.name ? ` ("${target.name}")` : '';
  return `Deleted ${label} clip${name}`;
}

/* ─── Action: Split Clip ────────────────────────────────────── */
function executeSplitClip(params, editor) {
  const { clips, splitClip } = editor;
  const splitTime = params.at;

  if (splitTime == null || !Number.isFinite(splitTime)) {
    throw new Error('Split requires a time position (e.g., "split at 30" or "split at 0:26").');
  }

  // Pick the clip that contains the split point. Prefer the lowest-track video clip
  // so a caption overlay at the same time doesn't win over the actual media clip.
  const candidates = clips
    .filter(c => c.startTime <= splitTime && (c.startTime + c.duration) > splitTime && !c.isCaption)
    .sort((a, b) => (a.track || 0) - (b.track || 0));
  const targetClip = candidates[0];

  if (!targetClip) {
    const maxEnd = clips.reduce((m, c) => Math.max(m, c.startTime + c.duration), 0);
    throw new Error(`No clip at ${splitTime}s — the timeline only reaches ${maxEnd.toFixed(1)}s.`);
  }

  // `splitClip(id, offset)` from VideoEditor.jsx expects an offset LOCAL to the clip,
  // not an absolute timeline time. Previously this code passed the absolute time,
  // which worked only when the clip started at t=0.
  const localOffset = splitTime - targetClip.startTime;
  if (localOffset <= 0.1 || localOffset >= targetClip.duration - 0.1) {
    throw new Error(`Split point too close to the clip edge (${localOffset.toFixed(2)}s into a ${targetClip.duration.toFixed(1)}s clip).`);
  }

  splitClip(targetClip.id, localOffset);
  return `Split clip at ${splitTime}s`;
}

/* ─── Action: Add Transition ────────────────────────────────── */
function executeAddTransition(params, editor) {
  const { clips, setClips } = editor;
  const raw = String(params.name || 'fade').replace(/\s+/g, '').toLowerCase();
  if (!VALID_TRANSITIONS.includes(raw)) {
    throw new Error(`Unknown transition "${params.name}". Try: ${VALID_TRANSITIONS.join(', ')}.`);
  }
  const duration = Math.max(0.2, Math.min(3.0, params.duration ?? 1.0));

  // Transitions live on a clip and apply between it and the NEXT clip, so the final
  // clip on each track has nothing to transition into — exclude those.
  const videoClips = clips
    .filter(c => c.type !== 'text' && c.type !== 'sticker' && !c.isCaption)
    .sort((a, b) => (a.track || 0) - (b.track || 0) || a.startTime - b.startTime);

  if (videoClips.length < 2) {
    throw new Error('Need at least 2 clips on the timeline to add a transition between them.');
  }

  const lastOnTrack = new Map();
  for (const c of videoClips) {
    const t = c.track || 0;
    const prev = lastOnTrack.get(t);
    if (!prev || c.startTime > prev.startTime) lastOnTrack.set(t, c);
  }
  const skipIds = new Set([...lastOnTrack.values()].map(c => c.id));
  const targetIds = new Set(videoClips.filter(c => !skipIds.has(c.id)).map(c => c.id));

  if (targetIds.size === 0) {
    throw new Error('No adjacent clips found to bridge with a transition.');
  }

  setClips(prev => prev.map(c =>
    targetIds.has(c.id) ? { ...c, transition: raw, transitionDuration: duration } : c
  ));

  return `Added ${raw} transition between ${targetIds.size} pair${targetIds.size !== 1 ? 's' : ''} of clips`;
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
  const { setClips, selectedClipId, getClips } = editor;
  const filterInput = (params.name || '').toLowerCase();
  const presetName = FILTER_NAME_MAP[filterInput];

  if (!presetName) {
    throw new Error(`Unknown filter "${params.name}". Available: cinematic, vintage, bw, warm, cool, 90s, sepia.`);
  }

  const preset = FILTER_PRESETS.find(f => f.name === presetName);
  if (!preset) throw new Error(`Filter preset "${presetName}" not found.`);

  // Read latest clips. In auto-edit, remove_silence runs before this and gives
  // every kept video segment a fresh ID — the closure's `clips` snapshot still
  // points at the pre-silence IDs, so building targetIds from there matches
  // nothing in the live state and the filter silently does nothing despite the
  // success message claiming "applied to N clips".
  const clips = getClips ? getClips() : editor.clips;

  // Apply to selected clip, or all video clips if none selected. If the
  // selection was retired by an earlier chained action (e.g. remove_silence
  // replacing the selected clip with new-ID segments), fall through to the
  // all-video-clips branch instead of erroring out.
  const stillSelected = selectedClipId && clips.some(c => c.id === selectedClipId);
  const targetClips = stillSelected
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

  if (!getWorkerUrl()) throw new Error(WORKER_URL_NOT_SET_ERROR);

  const { transcribeVideo } = await import('./transcriptService');
  const baseUrl = getWorkerUrl().replace(/\/transcribe\/?$/, '');
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

  if (!getWorkerUrl()) throw new Error(WORKER_URL_NOT_SET_ERROR);

  const { analyzeTranscript } = await import('./transcriptService');
  const baseUrl = getWorkerUrl().replace(/\/transcribe\/?$/, '');

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

  if (!getWorkerUrl()) throw new Error(WORKER_URL_NOT_SET_ERROR);

  const { analyzeTranscript } = await import('./transcriptService');
  const baseUrl = getWorkerUrl().replace(/\/transcribe\/?$/, '');

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

  const validAspects = ['9:16', '1:1', '4:5', '16:9'];
  if (!validAspects.includes(aspect)) {
    throw new Error(`Invalid aspect ratio "${aspect}". Use: ${validAspects.join(', ')}`);
  }

  const { detectFaceKeyframes, buildCropFilter } = await import('./faceDetection');

  // Try to get transcript for better speaker tracking
  let words = null;
  try {
    if (getWorkerUrl()) {
      const { transcribeVideo } = await import('./transcriptService');
      const baseUrl = getWorkerUrl().replace(/\/transcribe\/?$/, '');
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
    if (getWorkerUrl()) {
      const { transcribeVideo } = await import('./transcriptService');
      const baseUrl = getWorkerUrl().replace(/\/transcribe\/?$/, '');
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
