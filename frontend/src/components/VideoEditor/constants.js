/* ========== IMAGE URLS FROM STITCH ========== */
export const IMAGES = {
  thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuArh_z4vUG0aQLLKKjJTmzywm3TRl_nRE5sxp2UeDl71Nk7ZRkPeuWr7yw5jMoMRyhTDzFZfVgdiIQYWuXbyJZMjUa2j3-gN4F6RisdHBNdm7A-sn1j5Op72i3j9Mj9SFa0JF_iqBeoxpXZu4RQtyKKCYgFrAGtUUHV6jYiFDHpZpam3K8scjU1_dxRF1H45qQrGM0eWxc0l9DqW2U6iAIl4AF5TNoYz4GEZkTuJFEru1QcYnQITHLKbaztKyankS3AXEOwASf5cMhe",
  thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYfZnAoWckHRvvu-C-_Ds0l9IgjGU0H_opJbZUUfkECti8EMcvC-21DGmYy7zNXQq-2EsCyPtt3cLFfkhapawCXJz0AWIPXWxCbVKUhYxyCY8oClhYnSkKtlLKO8wt9znUPZzy_4rFRmVXSXusYSbfokH8Nkfysrefp4qXB06y-c1sawheYj6xDCz5zDoGFSUCYnGxXU8zOEOrtLXAd7UN9IAYSKHNLr-41QsBpFnglOtMgYCgxXZ-5CbZlglF2Yf7lbqtl0eIbbwo",
  thumb3: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY1ynpqH8MZhCYfqxMGLt-96n4DV8W9j3VM72f_lO_hd692qdsW50rvth2h_-S1ddvKFKbAbo_4L8E_O7o5pHfl8cOKkJiefe-VoDF2LqeEcVAnjrESWG6C3EHs2g-iLEsN8vFlGoeqCbBoHvlVUhpjoiKDUN0t4e1VOxo_wjsz5RPqEoSGOKRXl1n-Qz-DN45ineTwvKrefCMXfZpbx9izU0eAR7_jOaEzZYnDHzoh59vkuTvgjDIzrFE43tC9wpBocoy5xc0tUsw",
  thumb4: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIvdPrJib70quVo_QFeCy6JeJlDOsPxdH2JcuzYMPzK8ar12fjPFFK8N2r3Y7xsqmrwj8qOpjpe8m6s0hcPiMSyGu1KKSLJW5TnpCDXeDj4uzuUJrf-fIyK1K7LMPzLYkeBf8krT5aWvzZ5hrYRqSFsyqikaOfYOeZA7yDJaqSGiNgviOmP_ySTCKkH2E4DcZCof6jIwIF1JPa0UWNROYumvLM9lNkY0_IQ1a12XhUsXnj0n65uMC0ZkCvQ6PRrTCSDUCBBolmExy9",
  preview: "https://lh3.googleusercontent.com/aida-public/AB6AXuApkdGn6QIyJmY5WfNiR20aBGIXKTWVkrQBQv6dvGhy8UAppQwxcDdRLvnezNMw4b2emCNntIN1Jw4sm4YxLKqCVe0Je-fojK9U3W3DbODT2lhv25mQbiRUOJixh0GN6j5Ft1Eml_UC1f-F4vxp7ibVMJ5SJga18c-DQg98fKu8ywOpRAuJw8L5o9Md15aa7IauYcXsMwPqWoM4z2MexHK99YNVRs_OqzxR_VVbO5D-suBbzmvaCynpq2kFWW9R8Wcll0Ox4M3EjGAG",
};

/* ========== TOOLBAR ITEMS ========== */
export const TOOLBAR_ITEMS = [
  { id: "media", icon: "folder_open", label: "Media" },
  { id: "audio", icon: "music_note", label: "Audio" },
  { id: "text", icon: "text_fields", label: "Text" },
  { id: "captions", icon: "closed_caption", label: "Captions" },
  { id: "stickers", icon: "mood", label: "Stickers" },
  { id: "effects", icon: "auto_fix_high", label: "Effects" },
  { id: "transition", icon: "layers", label: "Transition" },
  { id: "filters", icon: "filter_list", label: "Filters" },
];

/* ========== KEYBOARD SHORTCUTS ========== */
export const KEYBOARD_SHORTCUTS = {
  // Playback
  PLAY_PAUSE: { key: 'Space', description: 'Play/Pause' },
  SKIP_FORWARD: { key: 'ArrowRight', description: 'Skip forward 5s' },
  SKIP_BACKWARD: { key: 'ArrowLeft', description: 'Skip backward 5s' },
  SKIP_FORWARD_LARGE: { key: 'Shift+ArrowRight', description: 'Skip forward 10s' },
  SKIP_BACKWARD_LARGE: { key: 'Shift+ArrowLeft', description: 'Skip backward 10s' },
  FRAME_FORWARD: { key: '.', description: 'Next frame' },
  FRAME_BACKWARD: { key: ',', description: 'Previous frame' },
  GO_TO_START: { key: 'Home', description: 'Go to start' },
  GO_TO_END: { key: 'End', description: 'Go to end' },
  
  // Editing
  SPLIT: { key: 'S', description: 'Split at playhead' },
  DELETE: { key: 'Delete', description: 'Delete selected' },
  DESELECT: { key: 'Escape', description: 'Deselect' },
  
  // Audio
  MUTE: { key: 'M', description: 'Mute/Unmute' },
  VOLUME_UP: { key: 'ArrowUp', description: 'Volume up' },
  VOLUME_DOWN: { key: 'ArrowDown', description: 'Volume down' },
  
  // View
  FULLSCREEN: { key: 'F', description: 'Toggle fullscreen' },
  
  // File
  SAVE: { key: 'Ctrl+S', description: 'Save project' },
  EXPORT: { key: 'Ctrl+E', description: 'Export video' },
  IMPORT: { key: 'Ctrl+I', description: 'Import media' },
  
  // Toolbar
  TOOLBAR_1: { key: '1', description: 'Media panel' },
  TOOLBAR_2: { key: '2', description: 'Audio panel' },
  TOOLBAR_3: { key: '3', description: 'Text panel' },
  TOOLBAR_4: { key: '4', description: 'Stickers panel' },
  TOOLBAR_5: { key: '5', description: 'Effects panel' },
  TOOLBAR_6: { key: '6', description: 'Transitions panel' },
  TOOLBAR_7: { key: '7', description: 'Filters panel' },
};

/* ========== MEDIA TYPES ========== */
export const MEDIA_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  IMAGE: 'image'
};

/* ========== SUPPORTED FORMATS ========== */
export const SUPPORTED_FORMATS = {
  video: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv', 'wmv'],
  audio: ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac'],
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
};

/* ========== DEFAULT VALUES ========== */
export const DEFAULTS = {
  PROJECT_NAME: 'Untitled Project',
  ZOOM_LEVEL: 50,
  VOLUME: 100,
  PLAYBACK_SPEED: 1,
  TIMELINE_DURATION: 30,
  FPS: 30
};

/* ========== SCROLLBAR CSS ========== */
export const SCROLLBAR_CSS = `
  .cs::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .cs::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .cs::-webkit-scrollbar-thumb {
    background: #2b3136;
    border-radius: 10px;
    transition: background 0.15s ease;
  }
  
  .cs::-webkit-scrollbar-thumb:hover {
    background: #75aadb;
  }
  
  .cs::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

/* ========== ANIMATION KEYFRAMES ========== */
export const ANIMATION_KEYFRAMES = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes slideDown {
    from { 
      opacity: 0; 
      transform: translateY(-20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes slideInRight {
    from { 
      opacity: 0; 
      transform: translateX(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes slideInLeft {
    from { 
      opacity: 0; 
      transform: translateX(-20px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0; 
      transform: scale(0.9); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

/* ========== COLORS (Botswana Theme) ========== */
export const COLORS = {
  // Primary
  primary: '#75aadb',
  primaryHover: '#5a8cbf',
  primaryMuted: 'rgba(117, 170, 219, 0.7)',
  primarySubtle: 'rgba(117, 170, 219, 0.15)',
  
  // Backgrounds
  bgDark: '#0a0a0a',
  bgPanel: '#0e1218',
  bgCard: '#1a2332',
  bgElevated: '#1e293b',
  
  // Borders
  border: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(255, 255, 255, 0.12)',
  borderActive: 'rgba(117, 170, 219, 0.5)',
  
  // Text
  textPrimary: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textDimmed: '#64748b',
  textSubtle: '#475569',
  
  // Status
  success: '#22c55e',
  error: '#ef4444',
  warning: '#eab308',
  info: '#3b82f6'
};

/* ========== TRANSITIONS ========== */
export const TRANSITIONS = {
  fast: '0.1s ease',
  normal: '0.15s ease',
  slow: '0.2s ease',
  slower: '0.3s ease'
};

/* ========== Z-INDEX LAYERS ========== */
export const Z_INDEX = {
  base: 1,
  dropdown: 10,
  sticky: 20,
  playhead: 50,
  overlay: 100,
  modal: 1000,
  toast: 2000
};

/* ========== DEFAULT CLIP PROPERTIES (non-destructive editing) ========== */
export const DEFAULT_CLIP_PROPERTIES = {
  volume: 1.0,
  isMuted: false,
  speed: 1.0,
  rotation: 0,
  opacity: 1.0,
  positionX: 0,
  positionY: 0,
  scale: 1.0,
  brightness: 0,
  contrast: 0,
  saturation: 1.0,
  temperature: 0,
  filterName: null,
  filterStrength: 50,
  effects: [],
  fadeIn: 0,
  fadeOut: 0,
  track: 0,  // 0 = V1/A1 (default), 1 = V2/A2, 2 = V3/A3
  trimStart: 0,
  trimEnd: 0,
  colorGrading: { shadows: '#1a1a2e', midtones: '#4a4a5e', highlights: '#ffffff' },
  // Transition (applied between this clip and the next)
  transition: null,        // null | 'fade' | 'dissolve' | 'wipeleft' etc.
  transitionDuration: 1.0, // seconds
  // Text overlay
  text: '',
  textColor: '#ffffff',
  textSize: 48,
  textPosition: 'bottom-center',
  textBgColor: '',
  textBold: false,
  textItalic: false,
  textUnderline: false,
  textAlign: 'center',
  textFontFamily: 'Spline Sans',
  textStartTime: 0,
  textDuration: 0,
  // Free-position for canvas drag (null = use textPosition preset)
  textX: null,
  textY: null,
};

/* ========== FILTER PRESETS ========== */
export const FILTER_PRESETS = [
  { name: 'None', filter: null, css: null },
  { name: '90s', filter: 'colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8', css: 'sepia(0.3) saturate(0.8)' },
  { name: 'Vintage', filter: 'eq=saturation=0.6:brightness=0.05', css: 'sepia(0.4) saturate(0.6) brightness(1.05)' },
  { name: 'Cinema', filter: 'eq=contrast=1.2:brightness=-0.05:saturation=1.1', css: 'contrast(1.2) brightness(0.95) saturate(1.1)' },
  { name: 'B&W', filter: 'eq=saturation=0', css: 'grayscale(1)' },
  { name: 'Warm', filter: 'colortemperature=6500', css: 'sepia(0.15) saturate(1.2)' },
  { name: 'Cool', filter: 'colortemperature=3500', css: 'saturate(0.9) hue-rotate(10deg)' },
  { name: 'Sepia', filter: 'colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131', css: 'sepia(0.8)' },
];

/* ========== EFFECT PRESETS ========== */
export const EFFECT_PRESETS = [
  { name: 'Motion Blur', type: 'blur', params: { radius: 5 }, css: 'blur(2px)', icon: 'blur_on' },
  { name: 'Sharpen', type: 'sharpen', params: { strength: 1.0 }, css: 'contrast(1.1)', icon: 'deblur' },
  { name: 'Vignette', type: 'vignette', params: {}, css: null, icon: 'vignette' },
  { name: 'Gaussian Blur', type: 'blur', params: { radius: 10 }, css: 'blur(4px)', icon: 'lens_blur' },
  { name: 'Glitch', type: 'glitch', params: { intensity: 3 }, css: null, icon: 'broken_image' },
  { name: 'Zoom', type: 'zoom', params: { factor: 1.5 }, css: null, icon: 'zoom_in' },
  { name: 'Shake', type: 'shake', params: { intensity: 5 }, css: null, icon: 'vibration' },
  { name: 'Flash', type: 'flash', params: { duration: 0.5 }, css: null, icon: 'flash_on' },
];

/* ========== ANIMATION PRESETS ========== */
export const ANIMATION_PRESETS = [
  { name: 'Fade In', key: 'fadeIn', value: 1.0 },
  { name: 'Fade Out', key: 'fadeOut', value: 1.0 },
  { name: 'Scale Up', key: 'scaleUp', value: true },
  { name: 'Slide Left', key: 'slideLeft', value: true },
];

/* ========== TRANSITION PRESETS ========== */
export const TRANSITION_PRESETS = [
  { value: null, label: 'None', icon: 'block' },
  { value: 'fade', label: 'Fade', icon: 'gradient' },
  { value: 'fadeblack', label: 'Fade Black', icon: 'brightness_1' },
  { value: 'fadewhite', label: 'Fade White', icon: 'brightness_7' },
  { value: 'dissolve', label: 'Dissolve', icon: 'blur_on' },
  { value: 'wipeleft', label: 'Wipe Left', icon: 'arrow_back' },
  { value: 'wiperight', label: 'Wipe Right', icon: 'arrow_forward' },
  { value: 'slideup', label: 'Slide Up', icon: 'arrow_upward' },
  { value: 'slidedown', label: 'Slide Down', icon: 'arrow_downward' },
];

/* ========== TEXT POSITION PRESETS ========== */
export const TEXT_POSITION_PRESETS = [
  { value: 'top-left', label: 'Top Left', icon: 'north_west' },
  { value: 'top-center', label: 'Top', icon: 'north' },
  { value: 'top-right', label: 'Top Right', icon: 'north_east' },
  { value: 'center-left', label: 'Left', icon: 'west' },
  { value: 'center', label: 'Center', icon: 'center_focus_strong' },
  { value: 'center-right', label: 'Right', icon: 'east' },
  { value: 'bottom-left', label: 'Bottom Left', icon: 'south_west' },
  { value: 'bottom-center', label: 'Bottom', icon: 'south' },
  { value: 'bottom-right', label: 'Bottom Right', icon: 'south_east' },
];

/* ========== STICKER PRESETS ========== */
export const STICKER_PRESETS = [
  // Smileys
  { emoji: '😀', label: 'Grinning', category: 'smileys' },
  { emoji: '😂', label: 'Laughing', category: 'smileys' },
  { emoji: '🥹', label: 'Touched', category: 'smileys' },
  { emoji: '😍', label: 'Heart Eyes', category: 'smileys' },
  { emoji: '🤩', label: 'Star Struck', category: 'smileys' },
  { emoji: '😎', label: 'Cool', category: 'smileys' },
  { emoji: '🥳', label: 'Party', category: 'smileys' },
  { emoji: '😱', label: 'Shocked', category: 'smileys' },
  { emoji: '🤔', label: 'Thinking', category: 'smileys' },
  { emoji: '😴', label: 'Sleeping', category: 'smileys' },
  // Hands
  { emoji: '👍', label: 'Thumbs Up', category: 'hands' },
  { emoji: '👎', label: 'Thumbs Down', category: 'hands' },
  { emoji: '👏', label: 'Clap', category: 'hands' },
  { emoji: '🙌', label: 'Raised Hands', category: 'hands' },
  { emoji: '🤝', label: 'Handshake', category: 'hands' },
  { emoji: '✌️', label: 'Peace', category: 'hands' },
  { emoji: '🤞', label: 'Fingers Crossed', category: 'hands' },
  { emoji: '💪', label: 'Strong', category: 'hands' },
  // Symbols
  { emoji: '❤️', label: 'Heart', category: 'symbols' },
  { emoji: '🔥', label: 'Fire', category: 'symbols' },
  { emoji: '⭐', label: 'Star', category: 'symbols' },
  { emoji: '💯', label: '100', category: 'symbols' },
  { emoji: '✨', label: 'Sparkles', category: 'symbols' },
  { emoji: '💥', label: 'Boom', category: 'symbols' },
  { emoji: '🎯', label: 'Target', category: 'symbols' },
  { emoji: '⚡', label: 'Lightning', category: 'symbols' },
  { emoji: '🚀', label: 'Rocket', category: 'symbols' },
  { emoji: '💎', label: 'Diamond', category: 'symbols' },
  // Objects
  { emoji: '🎬', label: 'Clapper', category: 'objects' },
  { emoji: '🎵', label: 'Music', category: 'objects' },
  { emoji: '🎤', label: 'Mic', category: 'objects' },
  { emoji: '📸', label: 'Camera', category: 'objects' },
  { emoji: '🎮', label: 'Gaming', category: 'objects' },
  { emoji: '🏆', label: 'Trophy', category: 'objects' },
  { emoji: '🎁', label: 'Gift', category: 'objects' },
  { emoji: '💡', label: 'Idea', category: 'objects' },
  // Arrows & Labels
  { emoji: '👆', label: 'Point Up', category: 'arrows' },
  { emoji: '👇', label: 'Point Down', category: 'arrows' },
  { emoji: '👈', label: 'Point Left', category: 'arrows' },
  { emoji: '👉', label: 'Point Right', category: 'arrows' },
  { emoji: '⬆️', label: 'Arrow Up', category: 'arrows' },
  { emoji: '⬇️', label: 'Arrow Down', category: 'arrows' },
  { emoji: '🔔', label: 'Bell', category: 'objects' },
  { emoji: '💬', label: 'Speech', category: 'objects' },
  { emoji: '🏷️', label: 'Tag', category: 'objects' },
  { emoji: '📌', label: 'Pin', category: 'objects' },
];

/* ========== TEXT STYLE PRESETS ========== */
export const TEXT_STYLE_PRESETS = [
  { name: 'Title', textSize: 64, textColor: '#ffffff', textPosition: 'center', textBgColor: '', textBold: true, textAlign: 'center', icon: 'title' },
  { name: 'Subtitle', textSize: 36, textColor: '#e2e8f0', textPosition: 'bottom-center', textBgColor: '', textBold: false, textAlign: 'center', icon: 'subtitles' },
  { name: 'Caption', textSize: 24, textColor: '#ffffff', textPosition: 'bottom-center', textBgColor: '#000000', textBold: false, textAlign: 'center', icon: 'closed_caption' },
  { name: 'Lower Third', textSize: 28, textColor: '#ffffff', textPosition: 'bottom-left', textBgColor: 'rgba(0,0,0,0.7)', textBold: true, textAlign: 'left', icon: 'video_label' },
];

/* ========== TEXT FONT FAMILIES ========== */
export const TEXT_FONT_FAMILIES = [
  'Spline Sans',
  'Arial',
  'Georgia',
  'Courier New',
  'Impact',
  'Comic Sans MS',
  'Trebuchet MS',
  'Verdana',
  'Times New Roman',
];

/* ========== SPEED PRESETS ========== */
export const SPEED_PRESETS = [
  { label: '0.25x', value: 0.25 },
  { label: '0.5x', value: 0.5 },
  { label: '1x', value: 1.0 },
  { label: '1.5x', value: 1.5 },
  { label: '2x', value: 2.0 },
];
