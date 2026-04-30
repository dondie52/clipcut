import { describe, it, expect } from 'vitest';
import { buildClipCssFilter, scalePresetCssByStrength } from '../clipCanvasFilter';

describe('scalePresetCssByStrength', () => {
  it('returns css unchanged at full strength', () => {
    expect(scalePresetCssByStrength('sepia(0.4) saturate(0.6)', 1)).toBe('sepia(0.4) saturate(0.6)');
  });

  it('interpolates toward identity at 50% strength for Vintage preset', () => {
    const css = 'sepia(0.4) saturate(0.6) brightness(1.05)';
    const out = scalePresetCssByStrength(css, 0.5);
    expect(out).toContain('sepia(0.7)');
    expect(out).toContain('saturate(0.8)');
    expect(out).toContain('brightness(1.025)');
  });
});

describe('buildClipCssFilter', () => {
  it('returns none for empty clip', () => {
    expect(buildClipCssFilter(null)).toBe('none');
    expect(buildClipCssFilter({})).toBe('none');
  });

  it('includes named preset at full strength', () => {
    const s = buildClipCssFilter({
      filterName: 'Vintage',
      filterStrength: 100,
    });
    expect(s).not.toBe('none');
    expect(s).toContain('sepia(0.4)');
    expect(s).toContain('saturate(0.6)');
  });

  it('includes scaled preset at 50% strength', () => {
    const s = buildClipCssFilter({
      filterName: 'Vintage',
      filterStrength: 50,
    });
    expect(s).toContain('sepia(0.7)');
  });

  it('combines brightness with preset', () => {
    const s = buildClipCssFilter({
      brightness: 0.1,
      filterName: 'Sepia',
      filterStrength: 100,
    });
    expect(s).toContain('brightness(1.1)');
    expect(s).toContain('sepia(0.8)');
  });

  it('omits effect css when includeEffectsCss is false', () => {
    const s = buildClipCssFilter(
      {
        effects: [{ name: 'Motion Blur', type: 'blur', enabled: true, params: { radius: 5 } }],
      },
      { includeEffectsCss: false }
    );
    expect(s).toBe('none');
  });

  it('includes effect css by default', () => {
    const s = buildClipCssFilter({
      effects: [{ name: 'Motion Blur', type: 'blur', enabled: true, params: { radius: 5 } }],
    });
    expect(s).toContain('blur(2px)');
  });
});
