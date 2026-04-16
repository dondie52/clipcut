/**
 * Decide whether the current autosave tick should be skipped.
 *
 * Guards two silent-data-loss scenarios where an autosave would otherwise
 * overwrite a populated project in Supabase with empty clips/mediaItems:
 *
 *  1. Restore hasn't finished yet. The autosave interval starts on mount,
 *     but `restoreProject()` may take longer than one tick to populate
 *     React state from Supabase + IndexedDB. Saving during that window
 *     clobbers the row.
 *
 *  2. An "empty" save arrived without the user ever touching this project.
 *     When the session has never observed non-empty clips or media, an
 *     empty save is indistinguishable from a failed restore — refuse to
 *     persist it. Once the session has observed non-empty state, an empty
 *     save is treated as an intentional clear and allowed through.
 */
export function shouldSkipAutoSave({
  projectId,
  isRestored,
  hasBeenNonEmpty,
  clipsCount,
  mediaItemsCount,
}) {
  if (!projectId) return { skip: false, reason: null }

  if (!isRestored) {
    return { skip: true, reason: 'restore-in-progress' }
  }

  const isEmpty = (clipsCount || 0) === 0 && (mediaItemsCount || 0) === 0
  if (isEmpty && !hasBeenNonEmpty) {
    return { skip: true, reason: 'empty-without-session-edit' }
  }

  return { skip: false, reason: null }
}
