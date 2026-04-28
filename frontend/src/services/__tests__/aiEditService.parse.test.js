import { describe, it, expect } from 'vitest';
import { parseIntentLocally } from '../aiEditService';

describe('parseIntentLocally — split time parsing', () => {
  it('accepts decimal seconds on a short video', () => {
    const r = parseIntentLocally('split at 0.26', { duration: 10 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBeCloseTo(0.26, 5);
  });

  it('asks a clarifying question for "0.26" on a long video', () => {
    const r = parseIntentLocally('split at 0.26', { duration: 314 });
    expect(r).toMatchObject({ chat: true });
    expect(r.message).toMatch(/26s/);
    expect(r.message).toMatch(/0\.26/);
  });

  it('accepts mm:ss format', () => {
    const r = parseIntentLocally('split at 0:26', { duration: 314 });
    expect(r[0].params.at).toBe(26);
  });

  it('accepts mm:ss with decimal seconds', () => {
    const r = parseIntentLocally('split at 1:45.5', { duration: 314 });
    expect(r[0].params.at).toBeCloseTo(105.5, 5);
  });

  it('accepts plain integer seconds', () => {
    const r = parseIntentLocally('split at 30', { duration: 314 });
    expect(r[0].params.at).toBe(30);
  });
});

describe('parseIntentLocally — transitions', () => {
  it('parses a named transition', () => {
    const r = parseIntentLocally('add a fade transition', { duration: 60, currentTime: 12 });
    expect(r[0].type).toBe('add_transition');
    expect(r[0].params.name).toBe('fade');
    expect(r[0].params.targetTime).toBe(12);
  });

  it('parses multi-word transition names', () => {
    const r = parseIntentLocally('add wipe left transitions', { duration: 60, currentTime: 8 });
    expect(r[0].params.name).toBe('wipeleft');
    expect(r[0].params.targetTime).toBe(8);
  });

  it('keeps global application when explicitly requested', () => {
    const r = parseIntentLocally('add fade black transition to all clips', { duration: 60, currentTime: 8 });
    expect(r[0].type).toBe('add_transition');
    expect(r[0].params.name).toBe('fadeblack');
    expect(r[0].params.target).toBe('all');
    expect(r[0].params.targetTime).toBeUndefined();
  });

  it('asks which transition when unspecified', () => {
    const r = parseIntentLocally('add a transitions', { duration: 60 });
    expect(r).toMatchObject({ chat: true });
    expect(r.message).toMatch(/fade|dissolve/);
  });
});

describe('parseIntentLocally — compound "split + transition"', () => {
  it('returns both actions when both halves are fully specified', () => {
    const r = parseIntentLocally('split at 0:26 and add a fade transition', { duration: 314 });
    expect(Array.isArray(r)).toBe(true);
    expect(r.map(a => a.type)).toEqual(['split_clip', 'add_transition']);
    expect(r[0].params.at).toBe(26);
    expect(r[1].params.name).toBe('fade');
    expect(r[1].params.targetTime).toBe(26);
  });

  it('surfaces clarification if the split time is ambiguous', () => {
    const r = parseIntentLocally('split at 0.26 and add a fade transition', { duration: 314 });
    expect(r).toMatchObject({ chat: true });
  });

  it('surfaces clarification if the transition is unspecified', () => {
    const r = parseIntentLocally('split at 0:26 and add a transitions', { duration: 314 });
    expect(r).toMatchObject({ chat: true });
    expect(r.message).toMatch(/transition/);
  });
});

describe('parseIntentLocally — cut range', () => {
  it('parses decimal and mm:ss ranges', () => {
    const r = parseIntentLocally('cut from 0:10 to 0:30', { duration: 314 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(10);
    expect(r[0].params.to).toBe(30);
  });
});

describe('parseIntentLocally — typo tolerance', () => {
  it('handles "spilt at 0;26" (transposed i/l + semicolon-for-colon)', () => {
    const r = parseIntentLocally('spilt at 0;26', { duration: 314 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBe(26);
  });

  it('handles the user\'s exact "spilt at 0;26 and add trastions"', () => {
    const r = parseIntentLocally('spilt at 0;26 and add trastions', { duration: 314 });
    expect(r).toMatchObject({ chat: true });
    expect(r.message).toMatch(/transition/i);
  });

  it('handles "transtion" / "trasitions" misspellings', () => {
    const r1 = parseIntentLocally('add a fade transtion', { duration: 60 });
    expect(r1[0].type).toBe('add_transition');
    const r2 = parseIntentLocally('add dissolve trasitions', { duration: 60 });
    expect(r2[0].type).toBe('add_transition');
    expect(r2[0].params.name).toBe('dissolve');
  });

  it('does NOT coerce "shift" to "split" (would be false-positive at dist 2)', () => {
    const r = parseIntentLocally('shift at 30', { duration: 60 });
    expect(r).toBeNull();
  });
});

describe('parseIntentLocally — delete after / before / the rest', () => {
  it('parses "delete after 60s" as a cut from 60 to end', () => {
    const r = parseIntentLocally('delete after 60s', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(60);
    expect(r[0].params.to).toBe(247);
  });

  it('parses "remove everything after 1:00" with mm:ss', () => {
    const r = parseIntentLocally('remove everything after 1:00', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(60);
    expect(r[0].params.to).toBe(247);
  });

  it('parses "trim from 1:00 onwards"', () => {
    const r = parseIntentLocally('trim from 1:00 onwards', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(60);
  });

  it('parses "delete before 30s" as a cut from 0 to 30', () => {
    const r = parseIntentLocally('delete before 30s', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(0);
    expect(r[0].params.to).toBe(30);
  });

  it('standalone "delete the rest" anchors at the playhead', () => {
    const r = parseIntentLocally('delete the rest', { duration: 247, currentTime: 90 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(90);
    expect(r[0].params.to).toBe(247);
  });

  it('standalone "delete the rest" with no playhead falls through to the Worker', () => {
    const r = parseIntentLocally('delete the rest', { duration: 247 });
    expect(r).toBeNull();
  });
});

describe('parseIntentLocally — compound "split + delete the rest"', () => {
  it('handles "split at 1:00 then delete the rest" (the screenshot bug)', () => {
    const r = parseIntentLocally('split at 1:00 then delete the rest', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r.map(a => a.type)).toEqual(['split_clip', 'cut_clip']);
    expect(r[0].params.at).toBe(60);
    expect(r[1].params.from).toBe(60);
    expect(r[1].params.to).toBe(247);
  });

  it('handles the user\'s exact "split at 1:00 then deleate the rest" (typo)', () => {
    const r = parseIntentLocally('split at 1:00 then deleate the rest', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r.map(a => a.type)).toEqual(['split_clip', 'cut_clip']);
    expect(r[1].params.from).toBe(60);
    expect(r[1].params.to).toBe(247);
  });

  it('handles "split at 30 and delete after 60"', () => {
    const r = parseIntentLocally('split at 30 and delete after 60', { duration: 247 });
    expect(r.map(a => a.type)).toEqual(['split_clip', 'cut_clip']);
    expect(r[0].params.at).toBe(30);
    expect(r[1].params.from).toBe(60);
  });
});

describe('parseIntentLocally — first/last N seconds', () => {
  it('parses "remove the first 5 seconds" as cut from 0 to 5', () => {
    const r = parseIntentLocally('remove the first 5 seconds', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(0);
    expect(r[0].params.to).toBe(5);
  });

  it('parses "trim first 10s" without the article', () => {
    const r = parseIntentLocally('trim first 10s', { duration: 247 });
    expect(r[0].params.from).toBe(0);
    expect(r[0].params.to).toBe(10);
  });

  it('parses "remove the last 10 seconds" relative to videoDuration', () => {
    const r = parseIntentLocally('remove the last 10 seconds', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(237);
    expect(r[0].params.to).toBe(247);
  });

  it('refuses "remove the last 500s" when video is shorter than that', () => {
    // Returns null so the Worker can ask the user what they actually meant.
    const r = parseIntentLocally('remove the last 500 seconds', { duration: 247 });
    expect(r).toBeNull();
  });
});

describe('parseIntentLocally — generic compound prompts (no split required)', () => {
  it('handles "remove the first 5 seconds and add captions" (the dispatcher-bug report)', () => {
    const r = parseIntentLocally('remove the first 5 seconds and add captions', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r.map(a => a.type)).toEqual(['cut_clip', 'add_captions']);
    expect(r[0].params.from).toBe(0);
    expect(r[0].params.to).toBe(5);
  });

  it('handles the symmetric inverse "add captions and delete after 60s"', () => {
    const r = parseIntentLocally('add captions and delete after 60s', { duration: 247 });
    expect(r.map(a => a.type)).toEqual(['add_captions', 'cut_clip']);
    expect(r[1].params.from).toBe(60);
    expect(r[1].params.to).toBe(247);
  });

  it('still handles the 3-action auto-edit compound', () => {
    const r = parseIntentLocally(
      'add captions, remove silence, and apply cinematic filter',
      { duration: 247 },
    );
    expect(r.map(a => a.type)).toEqual(['add_captions', 'remove_silence', 'apply_filter']);
    expect(r[2].params.name).toBe('cinematic');
  });

  it('does NOT compound when "and" is inside a single intent ("remove ums and uhs")', () => {
    const r = parseIntentLocally('remove ums and uhs', { duration: 247 });
    expect(r.map(a => a.type)).toEqual(['remove_filler_words']);
  });
});

describe('parseIntentLocally — non-command prompts fall through to the Worker', () => {
  it('returns null for greetings so the Worker LLM can respond naturally', () => {
    for (const g of ['hi', 'hello', 'how are you', 'thanks', 'bye', 'help']) {
      const r = parseIntentLocally(g, { duration: 0 });
      expect(r, `expected null (Worker fallthrough) for "${g}"`).toBeNull();
    }
  });

  it('still recognises editing commands', () => {
    const r = parseIntentLocally('apply cinematic filter', { duration: 60 });
    expect(r[0].type).toBe('apply_filter');
  });
});

describe('parseIntentLocally — minute / hour units', () => {
  it('parses "split at 1 minute" as 60 seconds', () => {
    const r = parseIntentLocally('split at 1 minute', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBe(60);
  });

  it('parses "split at 30 mins"', () => {
    const r = parseIntentLocally('split at 30 mins', { duration: 3600 });
    expect(r[0].params.at).toBe(1800);
  });

  it('parses "split at 1m" (single-letter unit)', () => {
    const r = parseIntentLocally('split at 1m', { duration: 247 });
    expect(r[0].params.at).toBe(60);
  });

  it('parses "split at 1.5 hours"', () => {
    const r = parseIntentLocally('split at 1.5 hours', { duration: 7200 });
    expect(r[0].params.at).toBe(5400);
  });

  it('still parses "split at 30 seconds" as 30s', () => {
    const r = parseIntentLocally('split at 30 seconds', { duration: 247 });
    expect(r[0].params.at).toBe(30);
  });

  it('parses "delete after 1 minute" (the screenshot bug)', () => {
    const r = parseIntentLocally('delete after 1 minute', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(60);
    expect(r[0].params.to).toBe(247);
  });

  it('parses "remove the first 2 minutes"', () => {
    const r = parseIntentLocally('remove the first 2 minutes', { duration: 247 });
    expect(r[0].params.from).toBe(0);
    expect(r[0].params.to).toBe(120);
  });

  it('parses "trim the last 1 minute"', () => {
    const r = parseIntentLocally('trim the last 1 minute', { duration: 247 });
    expect(r[0].params.from).toBe(187);
    expect(r[0].params.to).toBe(247);
  });

  it('parses "cut from 1 min to 2 min"', () => {
    const r = parseIntentLocally('cut from 1 min to 2 min', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(60);
    expect(r[0].params.to).toBe(120);
  });

  it('explicit unit suppresses the "0.26" ambiguity prompt', () => {
    // "0.26 seconds" is unambiguous — don't ask for clarification.
    const r = parseIntentLocally('split at 0.26 seconds', { duration: 314 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].params.at).toBeCloseTo(0.26, 5);
  });
});

describe('parseIntentLocally — minute / second typo tolerance', () => {
  it('handles "1 mintune" (the screenshot typo) as 1 minute', () => {
    const r = parseIntentLocally('split at 1 mintune', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBe(60);
  });

  it('handles "spilt at 1 mintune the delte after the 1 mintune" end-to-end', () => {
    const r = parseIntentLocally('spilt at 1 mintune the delte after the 1 mintune', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    // Single-clause with split + the "delte the rest" anchor wired by the compound handler
    // — but no clause separator is present, so it falls back to the single-clause split.
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBe(60);
  });

  it('compound "split at 1 minute and delete the rest" cuts to end', () => {
    const r = parseIntentLocally('split at 1 minute and delete the rest', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r.map(a => a.type)).toEqual(['split_clip', 'cut_clip']);
    expect(r[0].params.at).toBe(60);
    expect(r[1].params.from).toBe(60);
    expect(r[1].params.to).toBe(247);
  });

  it('handles "minit" / "mintue" / "minet" minute typos', () => {
    for (const t of ['minit', 'mintue', 'minet']) {
      const r = parseIntentLocally(`split at 2 ${t}`, { duration: 247 });
      expect(r?.[0]?.params?.at, `failed for "${t}"`).toBe(120);
    }
  });

  it('handles "secound" → "second"', () => {
    const r = parseIntentLocally('split at 30 secound', { duration: 247 });
    expect(r[0].params.at).toBe(30);
  });

  it('handles "secounds" (common misspelling) as seconds', () => {
    const r = parseIntentLocally('split at 30 secounds', { duration: 247 });
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBe(30);
  });

  it('handles "scounds" (dropped e) as seconds', () => {
    const r = parseIntentLocally('split at 30 scounds', { duration: 247 });
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBe(30);
  });
});

describe('parseIntentLocally — delete the Nth clip', () => {
  it('parses "delete the second clip"', () => {
    const r = parseIntentLocally('delete the second clip', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('delete_clip');
    expect(r[0].params.index).toBe(2);
  });

  it('parses "delete the secound clip" (typo) as the second clip', () => {
    // "secound" is fuzzed to "second" by normaliseTypos; the ordinal still matches.
    const r = parseIntentLocally('delete the secound clip', { duration: 247 });
    expect(r[0].type).toBe('delete_clip');
    expect(r[0].params.index).toBe(2);
  });

  it('parses "delete the first clip"', () => {
    const r = parseIntentLocally('delete the first clip', { duration: 247 });
    expect(r[0].params.index).toBe(1);
  });

  it('parses "remove the last clip" as -1', () => {
    const r = parseIntentLocally('remove the last clip', { duration: 247 });
    expect(r[0].type).toBe('delete_clip');
    expect(r[0].params.index).toBe(-1);
  });

  it('parses "delete clip 3"', () => {
    const r = parseIntentLocally('delete clip 3', { duration: 247 });
    expect(r[0].params.index).toBe(3);
  });

  it('parses "delete the 2nd clip"', () => {
    const r = parseIntentLocally('delete the 2nd clip', { duration: 247 });
    expect(r[0].params.index).toBe(2);
  });

  it('does NOT misinterpret "delete the first 5 seconds" as a clip-index delete', () => {
    const r = parseIntentLocally('delete the first 5 seconds', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(0);
    expect(r[0].params.to).toBe(5);
  });
});

describe('parseIntentLocally — natural command variants', () => {
  it('treats "cut at 30 seconds" as a split request', () => {
    const r = parseIntentLocally('cut at 30 seconds', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('split_clip');
    expect(r[0].params.at).toBe(30);
  });

  it('parses "delete anything after 30 scounds" as cut to end', () => {
    const r = parseIntentLocally('delete anything after 30 scounds', { duration: 247 });
    expect(Array.isArray(r)).toBe(true);
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(30);
    expect(r[0].params.to).toBe(247);
  });
});
