import { describe, it, expect } from 'vitest'

import { shouldSkipAutoSave } from '../autoSaveGuard.js'

describe('shouldSkipAutoSave', () => {
  it('allows saves for brand-new projects that do not yet have a projectId', () => {
    expect(
      shouldSkipAutoSave({
        projectId: null,
        isRestored: false,
        hasBeenNonEmpty: false,
        clipsCount: 0,
        mediaItemsCount: 0,
      }),
    ).toEqual({ skip: false, reason: null })
  })

  it('skips when restore has not completed for the current projectId', () => {
    const result = shouldSkipAutoSave({
      projectId: 'uuid-1',
      isRestored: false,
      hasBeenNonEmpty: false,
      clipsCount: 0,
      mediaItemsCount: 0,
    })

    expect(result.skip).toBe(true)
    expect(result.reason).toBe('restore-in-progress')
  })

  it('skips empty saves when the session has never observed non-empty state', () => {
    const result = shouldSkipAutoSave({
      projectId: 'uuid-1',
      isRestored: true,
      hasBeenNonEmpty: false,
      clipsCount: 0,
      mediaItemsCount: 0,
    })

    expect(result.skip).toBe(true)
    expect(result.reason).toBe('empty-without-session-edit')
  })

  it('allows empty saves once the user has cleared a previously populated timeline', () => {
    expect(
      shouldSkipAutoSave({
        projectId: 'uuid-1',
        isRestored: true,
        hasBeenNonEmpty: true,
        clipsCount: 0,
        mediaItemsCount: 0,
      }),
    ).toEqual({ skip: false, reason: null })
  })

  it('allows saves whenever clips are present', () => {
    expect(
      shouldSkipAutoSave({
        projectId: 'uuid-1',
        isRestored: true,
        hasBeenNonEmpty: true,
        clipsCount: 3,
        mediaItemsCount: 2,
      }),
    ).toEqual({ skip: false, reason: null })
  })

  it('allows saves with only media items populated (no timeline clips yet)', () => {
    expect(
      shouldSkipAutoSave({
        projectId: 'uuid-1',
        isRestored: true,
        hasBeenNonEmpty: true,
        clipsCount: 0,
        mediaItemsCount: 1,
      }),
    ).toEqual({ skip: false, reason: null })
  })

  it('treats null/undefined counts as zero', () => {
    const result = shouldSkipAutoSave({
      projectId: 'uuid-1',
      isRestored: true,
      hasBeenNonEmpty: false,
      clipsCount: null,
      mediaItemsCount: undefined,
    })

    expect(result.skip).toBe(true)
    expect(result.reason).toBe('empty-without-session-edit')
  })
})
