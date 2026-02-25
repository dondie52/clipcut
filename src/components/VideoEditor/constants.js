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

/* ========== MEDIA THUMBS (deprecated) ========== */
export const MEDIA_THUMBS = [];

/* ========== TIME MARKERS ========== */
export const TIME_MARKERS = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50"];

/* ========== WAVEFORM HEIGHTS ========== */
export const WAVE_HEIGHTS = [2,4,6,3,5,8,4,6,2,4,7,3,5,2,6,4,8,3,5,7,3,6,4,8,2,5,7,3,4,6];

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
