/* ========== CSS CUSTOM PROPERTIES ========== */
export const CSS_VARIABLES = `
  :root {
    /* Colors - Botswana Theme */
    --color-primary: #75aadb;
    --color-primary-hover: #5a8cbf;
    --color-primary-muted: rgba(117, 170, 219, 0.7);
    --color-primary-subtle: rgba(117, 170, 219, 0.15);
    
    --color-bg-dark: #0a0a0a;
    --color-bg-panel: #0e1218;
    --color-bg-card: #1a2332;
    --color-bg-elevated: #1e293b;
    
    --color-border: rgba(255, 255, 255, 0.06);
    --color-border-hover: rgba(255, 255, 255, 0.12);
    --color-border-active: rgba(117, 170, 219, 0.5);
    
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
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
    --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.3);
    
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
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "var(--color-bg-dark, #0a0a0a)",
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
    height: "40px",
    background: "var(--color-bg-panel, #0e1218)",
    borderBottom: "1px solid var(--color-border, rgba(255,255,255,0.06))",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
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
    fontSize: "var(--font-md, 12px)",
    fontWeight: 500,
    color: "var(--color-text-secondary, #cbd5e1)",
    width: "200px",
    padding: "4px 12px",
    borderRadius: "var(--radius-sm, 4px)",
    fontFamily: "'Spline Sans', sans-serif",
    transition: "all var(--transition-normal, 0.15s ease)"
  },
  exportBtn: {
    marginLeft: "6px",
    background: "var(--color-primary, #75aadb)",
    color: "var(--color-bg-dark, #0a0a0a)",
    padding: "6px 20px",
    borderRadius: "var(--radius-sm, 4px)",
    fontSize: "var(--font-md, 12px)",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Spline Sans', sans-serif",
    transition: "all var(--transition-normal, 0.15s ease)",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  toolbar: {
    height: "54px",
    background: "var(--color-bg-panel, #0e1218)",
    borderBottom: "1px solid var(--color-border, rgba(255,255,255,0.06))",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    gap: 0,
    flexShrink: 0
  },
  leftPanel: {
    width: "300px",
    borderRight: "1px solid var(--color-border, rgba(255,255,255,0.06))",
    display: "flex",
    flexDirection: "column",
    background: "var(--color-bg-panel, #0e1218)",
    flexShrink: 0
  },
  importBtn: {
    width: "100%",
    background: "rgba(255,255,255,0.02)",
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: "var(--radius-lg, 8px)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    position: "relative",
    fontFamily: "'Spline Sans', sans-serif",
    color: "inherit",
    transition: "all var(--transition-normal, 0.15s ease)"
  },
  rightPanel: {
    width: "280px",
    borderLeft: "1px solid var(--color-border, rgba(255,255,255,0.06))",
    display: "flex",
    flexDirection: "column",
    background: "var(--color-bg-panel, #0e1218)",
    flexShrink: 0
  },
  controls: {
    height: "56px",
    background: "var(--color-bg-panel, #0e1218)",
    borderTop: "1px solid var(--color-border, rgba(255,255,255,0.06))",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    position: "relative"
  },
  timeline: {
    height: "35%",
    background: "var(--color-bg-dark, #0a0a0a)",
    borderTop: "1px solid var(--color-border, rgba(255,255,255,0.06))",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    position: "relative"
  },
  tlToolbar: {
    height: "40px",
    background: "var(--color-bg-panel, #0e1218)",
    borderBottom: "1px solid var(--color-border, rgba(255,255,255,0.06))",
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
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  card: {
    borderColor: 'rgba(117, 170, 219, 0.3)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
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
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none'
};
