import { describe, expect, it } from 'vitest'

import {
  buildRestoredProjectState,
  getPlayerRestoreState,
} from '../restoreState.js'

describe('buildRestoredProjectState', () => {
  it('keeps unresolved video clips instead of dropping them from the timeline', () => {
    const restoredClips = [
      {
        id: 'clip-video-1',
        type: 'video',
        name: 'intro.mp4',
        startTime: 0,
        duration: 12,
        blobUrl: null,
        _mediaError: 'Media not found — re-import',
      },
      {
        id: 'clip-text-1',
        type: 'text',
        name: 'Title',
        startTime: 0,
        duration: 4,
      },
    ]

    const mediaItems = [
      {
        id: 'media-video-1',
        type: 'video',
        name: 'intro.mp4',
        blobUrl: null,
        _mediaError: 'Media not found — re-import',
      },
    ]

    const result = buildRestoredProjectState({
      restoredClips,
      mediaItems,
      projectName: 'Demo Project',
    })

    expect(result.clips).toHaveLength(2)
    expect(result.clips[0].id).toBe('clip-video-1')
    expect(result.unresolvedClipCount).toBe(1)
    expect(result.hasUnavailableMedia).toBe(true)
    expect(result.notification).toEqual({
      level: 'warning',
      message: 'Loaded "Demo Project" — 1 clip(s) need media re-import',
    })
  })

  it('keeps success notifications for fully playable restores', () => {
    const result = buildRestoredProjectState({
      restoredClips: [
        {
          id: 'clip-video-1',
          type: 'video',
          name: 'intro.mp4',
          startTime: 0,
          duration: 12,
          blobUrl: 'blob:video',
        },
      ],
      mediaItems: [
        {
          id: 'media-video-1',
          type: 'video',
          name: 'intro.mp4',
          blobUrl: 'blob:video',
        },
      ],
      projectName: 'Demo Project',
    })

    expect(result.unresolvedClipCount).toBe(0)
    expect(result.hasUnavailableMedia).toBe(false)
    expect(result.notification).toEqual({
      level: 'success',
      message: 'Loaded "Demo Project" (1 clips)',
    })
  })
})

describe('getPlayerRestoreState', () => {
  it('reports missing media when timeline clips exist but none are playable', () => {
    const result = getPlayerRestoreState({
      videoSrc: null,
      hasTimelineClips: true,
      hasUnavailableMediaClips: true,
      isRestoringMedia: false,
    })

    expect(result).toEqual({
      title: 'Media missing',
      description: 'This project still has clips, but one or more source files need to be re-imported.',
      showImportHint: true,
    })
  })
})
