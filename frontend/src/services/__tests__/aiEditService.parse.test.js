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
    const r = parseIntentLocally('add a fade transition', { duration: 60 });
    expect(r[0].type).toBe('add_transition');
    expect(r[0].params.name).toBe('fade');
  });

  it('parses multi-word transition names', () => {
    const r = parseIntentLocally('add wipe left transitions', { duration: 60 });
    expect(r[0].params.name).toBe('wipeleft');
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

describe('parseIntentLocally — bounded range wins over open-ended (Codex P2)', () => {
  it('parses "trim from 1:00 to 2:00" as a bounded cut, not trim-to-end', () => {
    const r = parseIntentLocally('trim from 1:00 to 2:00', { duration: 247 });
    expect(r[0].type).toBe('cut_clip');
    expect(r[0].params.from).toBe(60);
    expect(r[0].params.to).toBe(120);
  });

  it('parses "delete from 30 to 60" with the new verb extension', () => {
    const r = parseIntentLocally('delete from 30 to 60', { duration: 247 });
    expect(r[0].params.from).toBe(30);
    expect(r[0].params.to).toBe(60);
  });

  it('still parses "trim from 1:00 onwards" as trim-to-end (open-ended)', () => {
    const r = parseIntentLocally('trim from 1:00 onwards', { duration: 247 });
    expect(r[0].params.from).toBe(60);
    expect(r[0].params.to).toBe(247);
  });

  it('parses "remove from 1:00 until 2:00" with "until" as separator', () => {
    const r = parseIntentLocally('remove from 1:00 until 2:00', { duration: 247 });
    expect(r[0].params.from).toBe(60);
    expect(r[0].params.to).toBe(120);
  });
});

describe('parseIntentLocally — no infinite recursion on unsplittable prompts (Codex P1)', () => {
  it('handles "split at 1:00 delete the rest" (no separator) without stack overflow', () => {
    // Prior to the clauses.length >= 2 guard, the compound block re-entered
    // itself with the same full prompt and blew the stack. Now: compound is
    // skipped (single clause), pattern walk returns just the split.
    const r = parseIntentLocally('split at 1:00 delete the rest', { duration: 247 });
    expect(r).toEqual([{ type: 'split_clip', params: { at: 60 } }]);
  });

  it('handles "delete the rest split at 30" (no separator, reverse order)', () => {
    // Same shape, opposite verb order — also must not recurse.
    const r = parseIntentLocally('delete the rest split at 30', { duration: 247, currentTime: 0 });
    // Standalone "delete the rest" matches first against the playhead anchor
    // (0 → 247). The split clause is silently dropped without a separator.
    // Either result shape is fine — the test only asserts no stack overflow
    // and a well-formed array.
    expect(Array.isArray(r) || r === null || (r && r.chat)).toBe(true);
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
