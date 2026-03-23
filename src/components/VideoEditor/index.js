/**
 * Video Editor Module
 * @module components/VideoEditor
 * 
 * Main video editing interface with timeline, media panel,
 * preview player, and inspector panel.
 */

// Main component export
export { default } from './VideoEditor';
export { default as VideoEditor } from './VideoEditor';

// Layout components
export { default as TopBar } from './TopBar';
export { default as Toolbar } from './Toolbar';
export { default as MediaPanel } from './MediaPanel';
export { default as Player } from './Player';
export { default as InspectorPanel } from './InspectorPanel';
export { default as Timeline } from './Timeline';

// UI primitives
export { default as Icon } from './Icon';
export { default as GhostBtn } from './GhostBtn';

// Inspector sub-components
export * from './InspectorComponents';

// Styles and constants
export { styles, CSS_VARIABLES, FOCUS_STYLES } from './styles';
export { 
  TOOLBAR_ITEMS,
  KEYBOARD_SHORTCUTS,
  COLORS,
  TRANSITIONS,
  Z_INDEX,
  SCROLLBAR_CSS,
  ANIMATION_KEYFRAMES,
  DEFAULTS,
  SUPPORTED_FORMATS
} from './constants';
