/**
 * Builds the same CSS filter string used for live preview (Player) and canvas export.
 * Keeps preview and export visually aligned for adjustments, named presets, and effect CSS.
 */

import { FILTER_PRESETS, EFFECT_PRESETS } from '../components/VideoEditor/constants';

/**
 * Scale parenthetical values in a preset CSS filter by strength (0..1).
 * Mirrors Player.jsx videoPreviewStyle behaviour.
 * @param {string} css
 * @param {number} strength 0..1
 */
export function scalePresetCssByStrength(css, strength) {
  if (strength >= 1) return css;
  return css.replace(/\(([^)]+)\)/g, (match, val) => {
    const num = parseFloat(val);
    if (Number.isNaN(num)) return match;
    const isIdentity = val.includes('deg') ? 0 : 1;
    return `(${isIdentity + (num - isIdentity) * strength}${val.replace(/[\d.]+/, '')})`;
  });
}

/**
 * @param {object} clip - Timeline clip / clipProperties shape
 * @param {{ includeEffectsCss?: boolean }} [options]
 * @returns {string} CSS filter chain or `'none'`
 */
export function buildClipCssFilter(clip, options = {}) {
  const { includeEffectsCss = true } = options;
  if (!clip) return 'none';

  const parts = [];

  if (clip.brightness) {
    parts.push(`brightness(${1 + clip.brightness})`);
  }
  if (clip.contrast) {
    parts.push(`contrast(${1 + clip.contrast})`);
  }
  if (clip.saturation !== undefined && clip.saturation !== 1.0) {
    parts.push(`saturate(${clip.saturation})`);
  }

  if (clip.filterName) {
    const preset = FILTER_PRESETS.find((f) => f.name === clip.filterName);
    if (preset?.css) {
      const strength = (clip.filterStrength ?? 50) / 100;
      parts.push(scalePresetCssByStrength(preset.css, strength));
    }
  }

  if (includeEffectsCss && Array.isArray(clip.effects)) {
    for (const effect of clip.effects) {
      if (effect.enabled === false) continue;
      const preset = EFFECT_PRESETS.find((p) => p.name === effect.name) || effect;
      if (preset.css) {
        parts.push(preset.css);
      }
    }
  }

  if (clip.blur != null && clip.blur > 0) {
    parts.push(`blur(${clip.blur}px)`);
  }

  return parts.length > 0 ? parts.join(' ') : 'none';
}
