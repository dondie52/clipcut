/**
 * Theme Constants - Botswana Flag Colors
 * @module constants/theme
 */

/**
 * Primary colors from Botswana flag
 */
export const COLORS = {
  /** Primary blue accent */
  PRIMARY_BLUE: '#75AADB',
  /** Darker blue for hover/active states */
  PRIMARY_BLUE_DARK: '#5a8cbf',
  /** Faded blue for secondary text */
  PRIMARY_BLUE_FADED: 'rgba(117,170,219,0.7)',
  
  /** Background colors */
  BG_PRIMARY: '#0a0a0a',
  BG_SECONDARY: '#0d1117',
  BG_CARD: '#1a2332',
  BG_PANEL: '#0e1218',
  
  /** Text colors */
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#e2e8f0',
  TEXT_MUTED: '#94a3b8',
  TEXT_DISABLED: '#64748b',
  
  /** Semantic colors */
  SUCCESS: '#22c55e',
  SUCCESS_DARK: '#16a34a',
  ERROR: '#ef4444',
  ERROR_DARK: '#dc2626',
  WARNING: '#f59e0b',
  WARNING_DARK: '#d97706',
  INFO: '#3b82f6',
  INFO_DARK: '#2563eb',
  
  /** Audio track color (green) */
  AUDIO_ACCENT: '#34d399',
  AUDIO_ACCENT_FADED: 'rgba(52,211,153,0.4)',
  
  /** Border colors */
  BORDER_LIGHT: 'rgba(255,255,255,0.06)',
  BORDER_MEDIUM: 'rgba(255,255,255,0.1)',
};

/**
 * Opacity values for consistent transparency
 */
export const OPACITY = {
  DISABLED: 0.35,
  MUTED: 0.5,
  SUBTLE: 0.7,
  FULL: 1,
};

/**
 * Animation durations in milliseconds
 */
export const ANIMATION = {
  FAST: 120,
  NORMAL: 200,
  SLOW: 300,
  VERY_SLOW: 500,
};

/**
 * Z-index layers
 */
export const Z_INDEX = {
  BASE: 1,
  DROPDOWN: 10,
  SELECTED_CLIP: 5,
  DRAGGING_CLIP: 100,
  PLAYHEAD: 50,
  SNAP_LINE: 60,
  TOOLBAR: 100,
  MODAL: 1000,
  LOADING: 2000,
  TOAST: 3000,
};

/**
 * Font families
 */
export const FONTS = {
  PRIMARY: "'Spline Sans', sans-serif",
  SPLASH: "'Outfit', sans-serif",
  MONO: "monospace",
};

/**
 * Font weights
 */
export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
};

/**
 * Border radius values
 */
export const RADIUS = {
  SM: '3px',
  MD: '6px',
  LG: '10px',
  XL: '16px',
  ROUND: '50%',
};

/**
 * Common box shadows
 */
export const SHADOWS = {
  CARD: '0 8px 32px rgba(0,0,0,0.4)',
  DROPDOWN: '0 4px 16px rgba(0,0,0,0.3)',
  MODAL: '0 24px 64px rgba(0,0,0,0.6)',
  TOAST: '0 8px 28px rgba(0,0,0,0.25)',
  PLAYHEAD: '0 0 10px rgba(117,170,219,0.6)',
};
