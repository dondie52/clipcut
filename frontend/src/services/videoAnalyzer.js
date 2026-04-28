/**
 * Video Analyzer Service
 *
 * Runs background analysis on imported videos and generates AI suggestions.
 * Called after a video is added to the timeline.
 */

import { detectSilence, totalSilenceDuration, intersectSilenceRanges } from './silenceDetector';

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
      confidence: 'high',
      reason: 'No captions detected on timeline.',
    });
  }

  // Silence detection (fast — runs in < 2s for most videos)
  try {
    const silentRangesFull = await detectSilence(file, { threshold: -40, minDuration: 0.5 });
    const trimStart = clip.trimStart || 0;
    const dur = typeof clip.duration === 'number' && clip.duration > 0 ? clip.duration : 0;
    const windowEnd = trimStart + dur;
    const silentRanges = dur > 0 && windowEnd > trimStart
      ? intersectSilenceRanges(silentRangesFull, trimStart, windowEnd, 0.5)
      : silentRangesFull;
    if (silentRanges.length > 0) {
      const totalSilence = totalSilenceDuration(silentRanges);
      suggestions.push({
        id: 'remove-silence',
        icon: 'volume_off',
        title: `Remove silence (${totalSilence.toFixed(0)}s)`,
        description: `${silentRanges.length} silent section${silentRanges.length !== 1 ? 's' : ''} detected in this clip.`,
        action: 'remove_silence',
        params: { threshold: -40, minDuration: 0.5 },
        confidence: totalSilence >= 5 ? 'high' : 'medium',
        reason: `${silentRanges.length} silent section${silentRanges.length !== 1 ? 's were' : ' was'} detected.`,
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
      confidence: 'medium',
      reason: 'Long-form clip can benefit from highlight extraction.',
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
      confidence: 'medium',
      reason: 'Vertical outputs are ideal for social short-form.',
    });
  }

  return suggestions;
}
