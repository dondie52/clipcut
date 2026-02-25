/**
 * Video Editor Constants
 * @module constants/editor
 */

/**
 * Timeline configuration
 */
export const TIMELINE = {
  /** Default timeline duration in seconds */
  DEFAULT_DURATION: 30,
  /** Extra padding after last clip in seconds */
  END_PADDING: 10,
  /** Minimum timeline width in pixels */
  MIN_WIDTH: 900,
  /** Default zoom level (0-100) */
  DEFAULT_ZOOM: 50,
  /** Snap threshold in pixels */
  SNAP_THRESHOLD_PX: 8,
  /** Track heights */
  VIDEO_TRACK_HEIGHT: 60,
  AUDIO_TRACK_HEIGHT: 52,
  /** Time ruler height */
  RULER_HEIGHT: 28,
  /** Track label width */
  LABEL_WIDTH: 48,
};

/**
 * Playback configuration
 */
export const PLAYBACK = {
  /** Default playback speed */
  DEFAULT_SPEED: 1,
  /** Available playback speeds */
  SPEEDS: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
};

/**
 * Clip configuration
 */
export const CLIP = {
  /** Minimum clip width in pixels */
  MIN_WIDTH: 40,
  /** Video clip height in pixels */
  VIDEO_HEIGHT: 52,
  /** Audio clip height in pixels */
  AUDIO_HEIGHT: 44,
  /** Resize handle width in pixels */
  RESIZE_HANDLE_WIDTH: 6,
  /** Filmstrip thumbnail width */
  THUMBNAIL_WIDTH: 60,
};

/**
 * Zoom configuration
 */
export const ZOOM = {
  MIN: 0,
  MAX: 100,
  STEP: 10,
  /** Base pixels per second at zoom 0 */
  BASE_PX_PER_SEC: 4,
  /** Additional pixels per second per zoom unit */
  PX_PER_SEC_MULTIPLIER: 0.125, // zoom / 8
};

/**
 * Time marker intervals based on zoom level
 */
export const TIME_MARKER_INTERVALS = {
  HIGH_ZOOM: { threshold: 70, interval: 1 },
  MEDIUM_ZOOM: { threshold: 40, interval: 2 },
  LOW_ZOOM: { threshold: 20, interval: 5 },
  DEFAULT_INTERVAL: 10,
};

/**
 * Video export quality settings (CRF values - lower is better quality)
 */
export const EXPORT_QUALITY = {
  HIGH: 20,
  MEDIUM: 23,
  LOW: 28,
};

/**
 * FFmpeg encoding presets
 */
export const ENCODING_PRESETS = {
  ULTRAFAST: 'ultrafast',
  VERYFAST: 'veryfast',
  FAST: 'fast',
  MEDIUM: 'medium',
};

/**
 * Maximum thumbnail width for preview generation
 */
export const MAX_THUMBNAIL_WIDTH = 320;

/**
 * Waveform visualization settings
 */
export const WAVEFORM = {
  BAR_WIDTH: 2,
  BAR_GAP: 1,
  OPACITY: 0.4,
  SELECTED_OPACITY: 0.5,
};

/**
 * Minimap configuration
 */
export const MINIMAP = {
  WIDTH: 140,
  HEIGHT: 20,
};
