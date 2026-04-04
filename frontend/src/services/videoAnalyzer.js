/**
 * Video Analyzer Service
 *
 * Runs background analysis on imported videos and generates AI suggestions.
 * Called after a video is added to the timeline.
 */

import { detectSilence, totalSilenceDuration } from './silenceDetector';

/**
 * Analyze a video clip and return suggestions for the AI panel.
 *
 * Runs silence detection and basic metadata analysis. Scene detection
 * and face detection are skipped here to keep analysis fast (< 5s).
 *
 * @param {Object} clip - The timeline clip to analyze
 * @param {Object} options
 * @param {boolean} [options.hasCaptions=false] - Whether captions already exist on timeline
 * @returns {Promise<Array<{id: string, icon: string, title: string, description: string, action: string, params: Object}>>}
 */
export async function analyzeVideo(clip, options = {}) {
  const { hasCaptions = false } = options;
  const suggestions = [];

  const file = clip.file || (clip.blobUrl ? await fetch(clip.blobUrl).then(r => r.blob()) : null);
  if (!file) return suggestions;

  // Always suggest captions if not present
  if (!hasCaptions) {
    suggestions.push({
      id: 'add-captions',
      icon: 'closed_caption',
      title: 'Add auto-captions',
      description: 'No captions found. Generate captions from speech.',
      action: 'add_captions',
      params: { style: 'classic' },
    });
  }

  // Silence detection (fast — runs in < 2s for most videos)
  try {
    const silentRanges = await detectSilence(file, { threshold: -40, minDuration: 0.5 });
    if (silentRanges.length > 0) {
      const totalSilence = totalSilenceDuration(silentRanges);
      suggestions.push({
        id: 'remove-silence',
        icon: 'volume_off',
        title: `Remove silence (${totalSilence.toFixed(0)}s)`,
        description: `${silentRanges.length} silent section${silentRanges.length !== 1 ? 's' : ''} detected.`,
        action: 'remove_silence',
        params: { threshold: -40, minDuration: 0.5 },
      });
    }
  } catch { /* silence detection failed — skip suggestion */ }

  // Duration-based suggestions
  if (clip.duration > 180) {
    suggestions.push({
      id: 'auto-highlight',
      icon: 'auto_awesome',
      title: 'Create a highlight reel',
      description: `Video is ${Math.round(clip.duration / 60)} min. Extract the best 60 seconds.`,
      action: 'auto_highlight',
      params: { duration: 60 },
    });
  }

  // Always suggest making vertical for social
  if (clip.duration > 5) {
    suggestions.push({
      id: 'smart-crop',
      icon: 'crop_portrait',
      title: 'Make it vertical for TikTok',
      description: 'Auto-crop to 9:16 following the speaker.',
      action: 'smart_crop',
      params: { aspect: '9:16' },
    });
  }

  return suggestions;
}
