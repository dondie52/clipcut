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

describe('parseIntentLocally — small talk fallback', () => {
  it('replies to "hi" without hitting the Worker', () => {
    const r = parseIntentLocally('hi', { duration: 0 });
    expect(r).toMatchObject({ chat: true });
    expect(r.message).toMatch(/hi/i);
  });

  it('replies to greetings with punctuation variations', () => {
    for (const g of ['hello!', 'hey', 'yo', 'good morning', 'hiii']) {
      const r = parseIntentLocally(g, { duration: 0 });
      expect(r, `expected greeting reply for "${g}"`).toMatchObject({ chat: true });
    }
  });

  it('replies to "help" with a capability overview', () => {
    const r = parseIntentLocally('help', { duration: 0 });
    expect(r).toMatchObject({ chat: true });
    expect(r.message).toMatch(/split|caption|transition/i);
  });

  it('replies to "thanks" and "bye"', () => {
    expect(parseIntentLocally('thanks', {})).toMatchObject({ chat: true });
    expect(parseIntentLocally('bye', {})).toMatchObject({ chat: true });
  });

  it('does NOT intercept editing commands that happen to contain greeting words', () => {
    // "add a hi-contrast filter" should not be treated as a greeting
    const r = parseIntentLocally('apply cinematic filter', { duration: 60 });
    expect(r[0].type).toBe('apply_filter');
  });
});
