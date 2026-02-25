import { memo, useState, useCallback } from 'react';
import Icon from './Icon';

/* ========== CSS STYLES ========== */
const GHOST_BTN_STYLES = `
  .ghost-btn {
    transition: all 0.15s ease;
  }
  
  .ghost-btn:hover {
    background: rgba(255, 255, 255, 0.08) !important;
  }
  
  .ghost-btn:active {
    transform: scale(0.95);
  }
  
  .ghost-btn:focus-visible {
    outline: 2px solid #75aadb;
    outline-offset: 2px;
  }
`;

/* ========== GHOST BUTTON COMPONENT ========== */
const GhostBtn = memo(({ 
  i, 
  onClick, 
  style = {},
  title,
  disabled = false,
  size = 18,
  color = "#64748b",
  hoverColor = "#94a3b8",
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }, [onClick]);
  
  return (
    <>
      <style>{GHOST_BTN_STYLES}</style>
      <button 
        className="ghost-btn"
        style={{
          background: "none",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          padding: "6px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.5 : 1,
          ...style
        }}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        title={title}
        aria-label={props['aria-label'] || title}
        {...props}
      >
        <Icon 
          i={i} 
          s={size} 
          c={isHovered && !disabled ? hoverColor : color} 
        />
      </button>
    </>
  );
});

GhostBtn.displayName = 'GhostBtn';

export default GhostBtn;
