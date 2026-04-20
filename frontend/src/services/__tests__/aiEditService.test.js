import { describe, it, expect, vi } from 'vitest'
import { parseIntentLocally, executeExtractAudio, executeAiEdit } from '../aiEditService.js'

describe('parseIntentLocally — existing quick actions still work', () => {
  it('maps "add captions" to add_captions', () => {
    expect(parseIntentLocally('add captions')).toEqual([
      { type: 'add_captions', params: { style: 'classic' } },
    ])
  })

  it('maps "remove silence" to remove_silence', () => {
    expect(parseIntentLocally('remove silence')).toEqual([
      { type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } },
    ])
  })

  it('maps "make it vertical" to smart_crop 9:16', () => {
    expect(parseIntentLocally('make it vertical')).toEqual([
      { type: 'smart_crop', params: { aspect: '9:16' } },
    ])
  })

  it('returns null for ambiguous prompts', () => {
    expect(parseIntentLocally('hey, what can you do?')).toBeNull()
  })
})

describe('parseIntentLocally — remove-vs-add precedence', () => {
  it('"remove captions" maps to remove_captions (not add_captions)', () => {
    expect(parseIntentLocally('remove captions')).toEqual([
      { type: 'remove_captions', params: {} },
    ])
  })

  it('"delete the captions" maps to remove_captions', () => {
    expect(parseIntentLocally('delete the captions')).toEqual([
      { type: 'remove_captions', params: {} },
    ])
  })

  it('"no subtitles" maps to remove_captions', () => {
    expect(parseIntentLocally('no subtitles')).toEqual([
      { type: 'remove_captions', params: {} },
    ])
  })

  it('"remove subs" maps to remove_captions', () => {
    expect(parseIntentLocally('remove subs')).toEqual([
      { type: 'remove_captions', params: {} },
    ])
  })
})

describe('parseIntentLocally — broadened silence patterns', () => {
  it('"cut out the silence" maps to remove_silence', () => {
    expect(parseIntentLocally('cut out the silence')).toEqual([
      { type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } },
    ])
  })

  it('"trim the quiet parts" maps to remove_silence', () => {
    expect(parseIntentLocally('trim the quiet parts')).toEqual([
      { type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } },
    ])
  })

  it('"cut the pauses" maps to remove_silence', () => {
    expect(parseIntentLocally('cut the pauses')).toEqual([
      { type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } },
    ])
  })

  it('"make it shorter" maps to remove_silence', () => {
    expect(parseIntentLocally('make it shorter')).toEqual([
      { type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } },
    ])
  })

  it('"shorten this" maps to remove_silence', () => {
    expect(parseIntentLocally('shorten this')).toEqual([
      { type: 'remove_silence', params: { threshold: -40, minDuration: 0.5 } },
    ])
  })
})

describe('parseIntentLocally — broadened caption patterns', () => {
  it('"add subs" maps to add_captions', () => {
    expect(parseIntentLocally('add subs')).toEqual([
      { type: 'add_captions', params: { style: 'classic' } },
    ])
  })

  it('"add subtitles" maps to add_captions', () => {
    expect(parseIntentLocally('add subtitles')).toEqual([
      { type: 'add_captions', params: { style: 'classic' } },
    ])
  })

  it('"turn on subtitles" maps to add_captions', () => {
    expect(parseIntentLocally('turn on subtitles')).toEqual([
      { type: 'add_captions', params: { style: 'classic' } },
    ])
  })

  it('"generate subs" maps to add_captions', () => {
    expect(parseIntentLocally('generate subs')).toEqual([
      { type: 'add_captions', params: { style: 'classic' } },
    ])
  })
})

describe('parseIntentLocally — filler word patterns', () => {
  it('"remove ums" maps to remove_filler_words', () => {
    expect(parseIntentLocally('remove ums')).toEqual([
      { type: 'remove_filler_words', params: {} },
    ])
  })

  it('"cut the uhs" maps to remove_filler_words', () => {
    expect(parseIntentLocally('cut the uhs')).toEqual([
      { type: 'remove_filler_words', params: {} },
    ])
  })

  it('"remove filler words" maps to remove_filler_words', () => {
    expect(parseIntentLocally('remove filler words')).toEqual([
      { type: 'remove_filler_words', params: {} },
    ])
  })
})

describe('parseIntentLocally — horizontal/landscape patterns', () => {
  it('"make it horizontal" maps to smart_crop 16:9', () => {
    expect(parseIntentLocally('make it horizontal')).toEqual([
      { type: 'smart_crop', params: { aspect: '16:9' } },
    ])
  })

  it('"make it landscape" maps to smart_crop 16:9', () => {
    expect(parseIntentLocally('make it landscape')).toEqual([
      { type: 'smart_crop', params: { aspect: '16:9' } },
    ])
  })

  it('"16:9" maps to smart_crop 16:9', () => {
    expect(parseIntentLocally('16:9')).toEqual([
      { type: 'smart_crop', params: { aspect: '16:9' } },
    ])
  })

  it('"widescreen" maps to smart_crop 16:9', () => {
    expect(parseIntentLocally('make it widescreen')).toEqual([
      { type: 'smart_crop', params: { aspect: '16:9' } },
    ])
  })
})

describe('parseIntentLocally — extract audio', () => {
  it('"extract audio" maps to extract_audio with mp3 default', () => {
    expect(parseIntentLocally('extract audio')).toEqual([
      { type: 'extract_audio', params: { format: 'mp3' } },
    ])
  })

  it('"extract the audio" also maps to extract_audio', () => {
    expect(parseIntentLocally('extract the audio')).toEqual([
      { type: 'extract_audio', params: { format: 'mp3' } },
    ])
  })
})

describe('executeAiEdit — error normalization', () => {
  it('renders bare-string rejections as meaningful text, not "undefined"', async () => {
    // Silence the expected console.error from the error-normalizer path.
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      // "remove captions" parses locally → executeRemoveCaptions → calls setClips.
      // Force setClips to throw a bare string (mimics ffmpeg.wasm-style rejections
      // with no .message property) and assert the surfaced summary.
      const editor = {
        clips: [{ id: 'cap1', isCaption: true, type: 'video' }],
        setClips: () => { throw 'boom' },
        mediaItems: [],
      }
      const result = await executeAiEdit('remove captions', {}, editor)
      expect(result.summary).toContain('remove_captions: boom')
      expect(result.summary).not.toContain('undefined')
    } finally {
      errSpy.mockRestore()
    }
  })
})

describe('executeExtractAudio — source clip resolution', () => {
  it('throws a helpful error when there are no video clips on the timeline', async () => {
    const editor = { clips: [], setClips: () => {}, selectedClipId: null, mediaItems: [] }
    await expect(executeExtractAudio({ format: 'mp3' }, editor))
      .rejects.toThrow(/No video clip found/)
  })

  it('throws when the only clips are audio/text/caption (no extractable source)', async () => {
    const clips = [
      { id: 'a1', type: 'audio', startTime: 0, duration: 5 },
      { id: 't1', type: 'text', startTime: 0, duration: 5 },
      { id: 'c1', type: 'video', isCaption: true, startTime: 0, duration: 5 },
    ]
    const editor = { clips, setClips: () => {}, selectedClipId: null, mediaItems: [] }
    await expect(executeExtractAudio({ format: 'mp3' }, editor))
      .rejects.toThrow(/No video clip found/)
  })
})
