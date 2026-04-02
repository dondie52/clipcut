/* ========== CSS CUSTOM PROPERTIES ========== */
export const CSS_VARIABLES = `
  :root {
    /* Colors - Botswana Theme */
    --color-primary: #75aadb;
    --color-primary-hover: #5a8cbf;
    --color-primary-muted: rgba(117, 170, 219, 0.7);
    --color-primary-subtle: rgba(117, 170, 219, 0.15);
    --color-primary-glow: rgba(117, 170, 219, 0.08);

    --color-bg-dark: #08090c;
    --color-bg-panel: #0e1218;
    --color-bg-panel-alt: #111720;
    --color-bg-card: #1a2332;
    --color-bg-elevated: #1e293b;
    --color-bg-inset: #060810;
    --color-bg-surface: #131a24;

    --color-border: rgba(255, 255, 255, 0.06);
    --color-border-hover: rgba(255, 255, 255, 0.12);
    --color-border-active: rgba(117, 170, 219, 0.5);
    --color-border-panel: rgba(117, 170, 219, 0.08);

    --color-text-primary: #f1f5f9;
    --color-text-secondary: #cbd5e1;
    --color-text-muted: #94a3b8;
    --color-text-dimmed: #64748b;
    --color-text-subtle: #475569;

    --color-success: #22c55e;
    --color-error: #ef4444;
    --color-warning: #eab308;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;
    --spacing-2xl: 32px;

    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;
    --radius-xl: 12px;
    --radius-full: 9999px;

    /* Transitions */
    --transition-fast: 0.1s ease;
    --transition-normal: 0.15s ease;
    --transition-slow: 0.2s ease;
    --transition-slower: 0.3s ease;

    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.15);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.25);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.35);
    --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.45);
    --shadow-inset: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    --shadow-glow: 0 0 20px rgba(117, 170, 219, 0.15);

    /* Font Sizes */
    --font-xs: 9px;
    --font-sm: 10px;
    --font-md: 12px;
    --font-lg: 14px;
    --font-xl: 16px;

    /* Z-Index Layers */
    --z-base: 1;
    --z-dropdown: 10;
    --z-sticky: 20;
    --z-overlay: 50;
    --z-modal: 100;
    --z-toast: 200;
  }
`;

/* ========== GLOBAL FOCUS STYLES ========== */
export const FOCUS_STYLES = `
  /* Visible focus for keyboard users */
  *:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  /* Remove focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Custom focus ring for buttons */
  button:focus-visible,
  [role="button"]:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(117, 170, 219, 0.2);
  }
  
  /* Custom focus for inputs */
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: none;
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 3px rgba(117, 170, 219, 0.2);
  }
  
  /* Skip to content link (screen readers) */
  .skip-link {
    position: absolute;
    top: -100px;
    left: 0;
    background: var(--color-primary);
    color: var(--color-bg-dark);
    padding: 8px 16px;
    z-index: 9999;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0 0 var(--radius-md) 0;
  }
  
  .skip-link:focus {
    top: 0;
  }
`;

/* ========== STYLES ========== */
export const styles = {
  root: {
    width: "100%",
    maxWidth: "100vw",
    minWidth: 0,
    minHeight: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "var(--color-bg-dark, #08090c)",
    color: "var(--color-text-primary, #f1f5f9)",
    overflow: "hidden",
    fontFamily: "'Spline Sans', sans-serif"
  },
  ghost: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontFamily: "'Spline Sans', sans-serif",
    color: "inherit",
    transition: "all var(--transition-normal, 0.15s ease)"
  },
  topBar: {
    height: "42px",
    background: "linear-gradient(180deg, #111720 0%, #0e1218 100%)",
    borderBottom: "1px solid rgba(117, 170, 219, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
    flexShrink: 0,
    position: "relative",
    zIndex: 3000
  },
  titleInput: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    background: "transparent",
    border: "1px solid transparent",
    outline: "none",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 500,
    color: "#cbd5e1",
    width: "220px",
    padding: "5px 14px",
    borderRadius: "4px",
    fontFamily: "'Spline Sans', sans-serif",
    transition: "all 0.15s ease"
  },
  exportBtn: {
    marginLeft: "6px",
    background: "linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",
    color: "#0a0a0a",
    padding: "7px 22px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Spline Sans', sans-serif",
    transition: "all 0.15s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 2px 8px rgba(117, 170, 219, 0.25)",
    letterSpacing: "0.3px",
    textTransform: "uppercase"
  },
  toolbar: {
    height: "46px",
    background: "#0e1218",
    borderBottom: "1px solid rgba(117, 170, 219, 0.06)",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    gap: 0,
    flexShrink: 0
  },
  leftPanel: {
    width: "280px",
    minWidth: 0,
    maxWidth: "100%",
    borderRight: "1px solid rgba(117, 170, 219, 0.08)",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",
    flexShrink: 0,
    overflow: "hidden"
  },
  importBtn: {
    width: "100%",
    background: "rgba(117, 170, 219, 0.03)",
    border: "1.5px dashed rgba(117, 170, 219, 0.15)",
    borderRadius: "8px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    position: "relative",
    fontFamily: "'Spline Sans', sans-serif",
    color: "inherit",
    transition: "all 0.15s ease"
  },
  rightPanel: {
    width: "320px",
    minWidth: 0,
    maxWidth: "100%",
    borderLeft: "1px solid rgba(117, 170, 219, 0.08)",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",
    flexShrink: 0,
    overflow: "hidden"
  },
  controls: {
    height: "52px",
    background: "linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",
    borderTop: "1px solid rgba(117, 170, 219, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    position: "relative"
  },
  timeline: {
    height: "38%",
    background: "#08090c",
    borderTop: "2px solid rgba(117, 170, 219, 0.1)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    minHeight: 0,
    overflow: "hidden",
    position: "relative"
  },
  tlToolbar: {
    height: "38px",
    background: "linear-gradient(180deg, #111720 0%, #0e1218 100%)",
    borderBottom: "1px solid rgba(117, 170, 219, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px"
  }
};

/* ========== HOVER STYLES HELPER ========== */
export const hoverStyles = {
  button: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
  },
  card: {
    borderColor: 'rgba(117, 170, 219, 0.3)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
  },
  input: {
    borderColor: 'rgba(117, 170, 219, 0.5)'
  }
};

/* ========== ACTIVE STYLES HELPER ========== */
export const activeStyles = {
  button: {
    transform: 'translateY(0) scale(0.98)'
  },
  tab: {
    color: '#75aadb',
    borderColor: '#75aadb'
  }
};

/* ========== DISABLED STYLES HELPER ========== */
export const disabledStyles = {
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none'
};

/* ========== RESPONSIVE CSS ========== */
export const RESPONSIVE_CSS = `
  /* Mobile: stack layout vertically, hide side panels */
  @media (max-width: 768px) {
    /* Prevent horizontal scroll */
    body, #root { overflow-x: hidden; max-width: 100vw; }

    /* Touch-friendly minimum targets */
    button, a, [role="button"] { min-height: 44px; min-width: 44px; }

    /* Prevent iOS zoom on input focus */
    input, select, textarea { font-size: 16px !important; }

    /* Timeline: larger clip height for fat fingers */
    .timeline-clip { min-height: 56px !important; }

    /* Resize handles: wider on touch */
    .resize-handle { min-width: 18px !important; }

    /* Inspector as bottom sheet overlay */
    .inspector-mobile-drawer {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      max-height: 60vh;
      z-index: 3100;
      background: #0e1218;
      border-top: 2px solid rgba(117, 170, 219, 0.15);
      border-radius: 12px 12px 0 0;
      overflow-y: auto;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      -webkit-overflow-scrolling: touch;
    }
    .inspector-mobile-drawer.open {
      transform: translateY(0);
    }
    .inspector-mobile-drawer .drawer-handle {
      width: 36px; height: 4px;
      background: rgba(255,255,255,0.2);
      border-radius: 2px;
      margin: 8px auto;
    }

    /* Mobile tab bar (editor bottom) */
    .mobile-tab-bar {
      position: fixed; bottom: 0; left: 0; right: 0;
      height: 56px; background: #0e1218;
      border-top: 1px solid rgba(117,170,219,0.1);
      display: flex; align-items: center; justify-content: space-around;
      z-index: 3000;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }
    .mobile-tab-bar button {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      background: none; border: none; color: rgba(255,255,255,0.4);
      font-size: 9px; font-weight: 600; font-family: 'Spline Sans', sans-serif;
      cursor: pointer; padding: 6px 8px; min-height: 44px; min-width: 44px;
      transition: color 0.15s ease; flex: 1;
    }
    .mobile-tab-bar button.active { color: #75AADB; }
    .mobile-tab-bar button .material-symbols-outlined { font-size: 22px; }

    /* Mobile bottom sheet (slides up above tab bar) */
    .mobile-bottom-sheet {
      position: fixed; bottom: 56px; left: 0; right: 0;
      max-height: 55vh; z-index: 2900;
      background: #0e1218;
      border-top: 2px solid rgba(117,170,219,0.15);
      border-radius: 12px 12px 0 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .mobile-bottom-sheet.open { transform: translateY(0); }
    .mobile-bottom-sheet .sheet-handle {
      width: 36px; height: 4px;
      background: rgba(255,255,255,0.2);
      border-radius: 2px; margin: 8px auto;
    }

    /* Backdrop behind bottom sheet */
    .mobile-sheet-backdrop {
      position: fixed; inset: 0; bottom: 56px;
      background: rgba(0,0,0,0.4); z-index: 2800;
    }

    /* Toolbar scrollable on mobile */
    nav[role="tablist"]::-webkit-scrollbar { display: none; }

    /* Timeline touch support */
    .timeline-track-area { touch-action: pan-x pan-y; }
  }

  /* Tablet: narrower panels */
  @media (min-width: 769px) and (max-width: 1024px) {
    .editor-left-panel { width: 220px !important; }
    .editor-right-panel { width: 240px !important; }
  }
`;
