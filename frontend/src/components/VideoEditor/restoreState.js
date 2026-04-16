const isVisualTimelineClip = (clip) => clip?.type !== 'audio' && clip?.type !== 'text'

const clipNeedsMediaRestore = (clip) =>
  isVisualTimelineClip(clip) && !clip?.blobUrl && Boolean(clip?._mediaError)

const mediaItemNeedsRestore = (item) =>
  item?.type !== 'audio' && !item?.blobUrl && Boolean(item?._mediaError)

export function buildRestoredProjectState({
  restoredClips = [],
  mediaItems = [],
  projectName = 'Untitled Project',
}) {
  const unresolvedClipCount = restoredClips.filter(clipNeedsMediaRestore).length
  const unresolvedMediaCount = mediaItems.filter(mediaItemNeedsRestore).length
  const hasUnavailableMedia = unresolvedClipCount > 0 || unresolvedMediaCount > 0

  return {
    clips: restoredClips,
    mediaItems,
    unresolvedClipCount,
    unresolvedMediaCount,
    hasUnavailableMedia,
    notification: hasUnavailableMedia
      ? {
          level: 'warning',
          message: `Loaded "${projectName}" — ${unresolvedClipCount} clip(s) need media re-import`,
        }
      : {
          level: 'success',
          message: `Loaded "${projectName}" (${restoredClips.length} clips)`,
        },
  }
}

export function getPlayerRestoreState({
  videoSrc = null,
  hasTimelineClips = false,
  hasUnavailableMediaClips = false,
  isRestoringMedia = false,
}) {
  if (isRestoringMedia) {
    return {
      title: 'Restoring media...',
      description: 'Loading media files from storage',
      showImportHint: false,
    }
  }

  if (videoSrc) {
    return {
      title: null,
      description: null,
      showImportHint: false,
    }
  }

  if (hasUnavailableMediaClips) {
    return {
      title: 'Media missing',
      description: 'This project still has clips, but one or more source files need to be re-imported.',
      showImportHint: true,
    }
  }

  if (hasTimelineClips) {
    return {
      title: 'No clip at playhead',
      description: 'Move the playhead over a clip on the timeline to preview',
      showImportHint: false,
    }
  }

  return {
    title: 'No media loaded',
    description: 'Import media and add clips to the timeline to preview',
    showImportHint: true,
  }
}

export function hasUnavailableMediaClips(clips = []) {
  return clips.some(clipNeedsMediaRestore)
}
