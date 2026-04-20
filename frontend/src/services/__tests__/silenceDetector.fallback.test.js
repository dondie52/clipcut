import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// The fallback path dynamically imports transcriptService — mock it at the
// module level so we can assert `extractAudio` is called when Web Audio fails.
vi.mock('../transcriptService', () => ({
  extractAudio: vi.fn(),
}));

describe('silenceDetector — FFmpeg fallback', () => {
  let originalAudioContext;

  beforeEach(() => {
    originalAudioContext = window.AudioContext;
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.AudioContext = originalAudioContext;
  });

  // Build a stub AudioBuffer with a known number of "silent" samples.
  const makeSilentBuffer = (seconds = 2, sampleRate = 16000) => {
    const channelData = new Float32Array(seconds * sampleRate); // all zeros == silent
    return {
      sampleRate,
      numberOfChannels: 1,
      duration: seconds,
      getChannelData: () => channelData,
    };
  };

  it('falls back to extractAudio when decodeAudioData rejects the container', async () => {
    const silentBuffer = makeSilentBuffer(2);
    let decodeCallCount = 0;
    // `new window.AudioContext()` means AudioContext must be a constructor — a
    // plain vi.fn().mockImplementation returns the object but isn't callable
    // with `new` reliably across runtimes. Use a real class.
    window.AudioContext = class MockAudioContext {
      async decodeAudioData() {
        decodeCallCount++;
        if (decodeCallCount === 1) {
          throw new DOMException('cannot decode MP4', 'EncodingError');
        }
        return silentBuffer;
      }
      async close() { /* noop */ }
    };

    const { extractAudio } = await import('../transcriptService');
    extractAudio.mockResolvedValue(new Uint8Array(64));

    const { detectSilence } = await import('../silenceDetector');
    const fakeFile = new Blob([new Uint8Array(8)], { type: 'video/mp4' });
    fakeFile.arrayBuffer = () => Promise.resolve(new ArrayBuffer(8));

    const ranges = await detectSilence(fakeFile, { minDuration: 0.5 });

    expect(extractAudio).toHaveBeenCalledOnce();
    expect(decodeCallCount).toBe(2);
    expect(ranges.length).toBe(1);
    expect(ranges[0].start).toBe(0);
    expect(ranges[0].end).toBeCloseTo(2, 1);
  });

  it('does not invoke the FFmpeg fallback when Web Audio succeeds on the raw buffer', async () => {
    window.AudioContext = class MockAudioContext {
      async decodeAudioData() { return makeSilentBuffer(1); }
      async close() { /* noop */ }
    };

    const { extractAudio } = await import('../transcriptService');
    const { detectSilence } = await import('../silenceDetector');

    const fakeFile = new Blob([new Uint8Array(8)], { type: 'audio/wav' });
    fakeFile.arrayBuffer = () => Promise.resolve(new ArrayBuffer(8));

    await detectSilence(fakeFile);

    expect(extractAudio).not.toHaveBeenCalled();
  });
});
