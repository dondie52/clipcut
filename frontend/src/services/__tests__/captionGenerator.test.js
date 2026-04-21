import { describe, it, expect } from 'vitest';
import {
  remapPhrasesToTimeline,
  phrasesToClips,
} from '../captionGenerator';

// Helper: run the remap → phrasesToClips pipeline the same way
// generateCaptionClips does internally, and return the emitted caption
// timeline clips. Lets tests exercise the real end-to-end behavior rather
// than each function in isolation.
function pipeline(sourcePhrases, videoClips) {
  const remapped = remapPhrasesToTimeline(sourcePhrases, videoClips);
  return phrasesToClips(remapped, 'classic');
}

describe('remapPhrasesToTimeline + phrasesToClips — pipeline behaviour', () => {
  it('caption at the very end of a clip never extends past the clip end', () => {
    // Clip on the timeline: [0, 30], nothing trimmed.
    const videoClips = [{ startTime: 0, duration: 30, trimStart: 0 }];
    // A short utterance at 29.5–29.8 in source time. Without the maxEnd cap,
    // MIN_CAPTION_DURATION (0.8) would stretch the caption to end at 30.3 —
    // 0.3s past the clip. With the cap, it must stop at 30.0.
    const phrases = [{ text: 'end of video', start: 29.5, end: 29.8 }];

    const clips = pipeline(phrases, videoClips);

    expect(clips).toHaveLength(1);
    const cap = clips[0];
    expect(cap.startTime).toBeCloseTo(29.5, 5);
    // Hard invariant: caption must not end after the clip ends.
    expect(cap.startTime + cap.duration).toBeLessThanOrEqual(30.0 + 1e-9);
    // But it also shouldn't be so short it collapses — should use whatever
    // room is left (0.5s here).
    expect(cap.duration).toBeGreaterThan(0.1);
  });

  it('phrase spanning a deleted middle gap produces one caption, not two duplicates', () => {
    // User split a 60s source at 27s and 30s, deleted the 27–30s middle.
    // Two timeline clips remain, referencing the same source:
    //   Clip A: timeline [0, 27]  → source [0, 27]
    //   Clip B: timeline [27, 57] → source [30, 60] (shifted: startTime=27, trimStart=30)
    const videoClips = [
      { startTime: 0,  duration: 27, trimStart: 0 },
      { startTime: 27, duration: 30, trimStart: 30 },
    ];
    // A phrase that in source time spans the deleted middle: 26.5s → 30.5s.
    // Naive implementation: two captions — one on each surviving side — both
    // displaying the same text. Correct: one caption, attached to the first
    // matching clip (A), clipped to A's end.
    const phrases = [{ text: 'straddles the cut', start: 26.5, end: 30.5 }];

    const clips = pipeline(phrases, videoClips);

    expect(clips).toHaveLength(1);
    const cap = clips[0];
    // Must be attached to clip A (starts inside 0–27).
    expect(cap.startTime).toBeGreaterThanOrEqual(0);
    expect(cap.startTime).toBeLessThan(27);
    // And must not extend past A's end (27s on the timeline).
    expect(cap.startTime + cap.duration).toBeLessThanOrEqual(27.0 + 1e-9);
  });

  // Regression: confirms the "no trimming" fast path still uses source time
  // directly, so callers without a clip context (media-library-only) keep
  // working.
  it('returns source-time phrases unchanged when no videoClips are supplied', () => {
    const phrases = [{ text: 'hi', start: 1, end: 2 }];
    expect(remapPhrasesToTimeline(phrases, undefined)).toBe(phrases);
    expect(remapPhrasesToTimeline(phrases, [])).toBe(phrases);
  });

  it('drops fragments shorter than 0.15s (unreadable edge-straddles)', () => {
    // Phrase mostly in the trimmed-away region; only 50ms of overlap remains.
    const videoClips = [{ startTime: 0, duration: 10, trimStart: 0 }];
    const phrases = [{ text: 'barely there', start: 9.95, end: 11.0 }];

    const clips = pipeline(phrases, videoClips);

    expect(clips).toHaveLength(0);
  });

  it('fully-contained phrases are remapped with correct timeline offset', () => {
    // Clip trimmed from source [10, 40] and placed at timeline startTime=5.
    // A source phrase at [15, 17] should land at timeline [10, 12].
    const videoClips = [{ startTime: 5, duration: 30, trimStart: 10 }];
    const phrases = [{ text: 'middle phrase', start: 15, end: 17 }];

    const clips = pipeline(phrases, videoClips);

    expect(clips).toHaveLength(1);
    expect(clips[0].startTime).toBeCloseTo(10, 5);
    // Natural duration 2s > MIN_CAPTION_DURATION, so no stretch.
    expect(clips[0].duration).toBeCloseTo(2, 5);
  });
});
