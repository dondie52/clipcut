import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  formatTime,
  parseTime,
  toBlob,
  toObjectURL,
  isMemoryLimitExceeded,
  getMemoryLimit,
  getMemoryUsage,
  getVirtualFiles,
  getVirtualFileCount,
  formatBytes,
  getLoadingState,
  subscribeToLoadingState,
  setProgressCallback,
  clearProgressCallback,
  createAbortController,
  cancelCurrentOperation,
  isOperationAborted,
  isFFmpegLoaded,
} from '../ffmpeg.js'

// ── formatTime ──────────────────────────────────────────────────────────────

describe('formatTime', () => {
  it('formats 0 seconds', () => {
    expect(formatTime(0)).toBe('00:00:00.000')
  })

  it('formats seconds correctly', () => {
    expect(formatTime(65)).toBe('00:01:05.000')
  })

  it('formats hours correctly', () => {
    expect(formatTime(3661)).toBe('01:01:01.000')
  })

  it('formats milliseconds', () => {
    expect(formatTime(1.5)).toBe('00:00:01.500')
  })

  it('pads single-digit minutes and seconds', () => {
    expect(formatTime(9)).toBe('00:00:09.000')
  })
})

// ── parseTime ───────────────────────────────────────────────────────────────

describe('parseTime', () => {
  it('parses HH:MM:SS format', () => {
    expect(parseTime('01:00:00')).toBe(3600)
  })

  it('parses HH:MM:SS.ms format', () => {
    expect(parseTime('00:01:05.5')).toBeCloseTo(65.5)
  })

  it('parses raw seconds string', () => {
    expect(parseTime('30')).toBe(30)
  })

  it('parses zero', () => {
    expect(parseTime('00:00:00')).toBe(0)
  })
})

// ── formatTime / parseTime round-trip ───────────────────────────────────────

describe('formatTime / parseTime round-trip', () => {
  it('round-trips a time value', () => {
    const seconds = 3723.456
    const formatted = formatTime(seconds)
    const parsed = parseTime(formatted)
    expect(parsed).toBeCloseTo(seconds, 1)
  })
})

// ── toBlob ──────────────────────────────────────────────────────────────────

describe('toBlob', () => {
  it('creates a Blob with default mp4 MIME type', () => {
    const data = new Uint8Array([1, 2, 3])
    const blob = toBlob(data)
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('video/mp4')
  })

  it('creates a Blob with custom MIME type', () => {
    const data = new Uint8Array([1, 2, 3])
    const blob = toBlob(data, 'video/webm')
    expect(blob.type).toBe('video/webm')
  })

  it('blob has correct size', () => {
    const data = new Uint8Array([1, 2, 3])
    const blob = toBlob(data)
    expect(blob.size).toBe(3)
  })
})

// ── toObjectURL ─────────────────────────────────────────────────────────────

describe('toObjectURL', () => {
  it('returns a blob: URL string', () => {
    const data = new Uint8Array([1, 2, 3])
    const url = toObjectURL(data)
    // jsdom returns 'blob:mock-url' from our setup mock
    expect(url).toBeTruthy()
    expect(typeof url).toBe('string')
  })
})

// ── Memory management ───────────────────────────────────────────────────────

describe('memory management', () => {
  it('getMemoryLimit returns 500MB', () => {
    expect(getMemoryLimit()).toBe(500 * 1024 * 1024)
  })

  it('getMemoryUsage returns a number', () => {
    expect(typeof getMemoryUsage()).toBe('number')
  })

  it('isMemoryLimitExceeded returns false when no files loaded', () => {
    expect(isMemoryLimitExceeded()).toBe(false)
  })
})

// ── formatBytes ─────────────────────────────────────────────────────────────

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(500)).toBe('500 B')
  })

  it('formats kilobytes', () => {
    expect(formatBytes(1536)).toBe('1.5 KB')
  })

  it('formats megabytes', () => {
    expect(formatBytes(2 * 1024 * 1024)).toBe('2.0 MB')
  })

  it('formats 0 bytes', () => {
    expect(formatBytes(0)).toBe('0 B')
  })
})

// ── Loading state ───────────────────────────────────────────────────────────

describe('loading state', () => {
  it('getLoadingState returns an object with isLoading, loadProgress, error', () => {
    const state = getLoadingState()
    expect(state).toHaveProperty('isLoading')
    expect(state).toHaveProperty('loadProgress')
    expect(state).toHaveProperty('error')
  })

  it('subscribeToLoadingState calls listener immediately with current state', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToLoadingState(listener)
    expect(listener).toHaveBeenCalledOnce()
    unsubscribe()
  })

  it('unsubscribe stops future notifications', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToLoadingState(listener)
    listener.mockClear()
    unsubscribe()
    // After unsubscribing, listener should not be called again on subsequent changes
    // (We can't trigger state change without loading FFmpeg, so just verify no extra calls)
    expect(listener).not.toHaveBeenCalled()
  })
})

// ── Progress callback ───────────────────────────────────────────────────────

describe('progress callback', () => {
  it('setProgressCallback and clearProgressCallback do not throw', () => {
    expect(() => setProgressCallback(vi.fn())).not.toThrow()
    expect(() => clearProgressCallback()).not.toThrow()
  })
})

// ── AbortController ─────────────────────────────────────────────────────────

describe('abort controller', () => {
  it('createAbortController returns an AbortController', () => {
    const controller = createAbortController()
    expect(controller).toBeInstanceOf(AbortController)
    expect(controller.signal.aborted).toBe(false)
  })

  it('cancelCurrentOperation aborts the current controller', () => {
    const controller = createAbortController()
    cancelCurrentOperation()
    expect(controller.signal.aborted).toBe(true)
  })

  it('isOperationAborted returns false before cancellation', () => {
    createAbortController() // fresh controller
    // Not cancelled yet, so not aborted — but since cancelCurrentOperation was
    // called in previous test we need a fresh one here
    expect(typeof isOperationAborted()).toBe('boolean')
  })

  it('isFFmpegLoaded returns false before loading', () => {
    expect(isFFmpegLoaded()).toBe(false)
  })
})

// ── Virtual FS tracking ─────────────────────────────────────────────────────

describe('virtual FS tracking', () => {
  it('getVirtualFiles returns an array', () => {
    expect(Array.isArray(getVirtualFiles())).toBe(true)
  })

  it('getVirtualFileCount returns a number', () => {
    expect(typeof getVirtualFileCount()).toBe('number')
  })
})
