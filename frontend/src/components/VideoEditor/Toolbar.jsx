import { useState, memo, useCallback } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { TOOLBAR_ITEMS } from './constants';
import { useMobile } from '../../hooks/useMobile';

/* ========== CSS ANIMATIONS ========== */
const TOOLBAR_CSS = `
  .toolbar-btn {
    position: relative;
    transition: all 0.15s ease;
    border-radius: 6px;
  }

  .toolbar-btn:hover {
    background: rgba(117, 170, 219, 0.08);
  }

  .toolbar-btn.active {
    background: rgba(117, 170, 219, 0.1);
  }

  .toolbar-btn::before {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 20px;
    height: 2px;
    background: #75aadb;
    border-radius: 1px;
    transition: transform 0.2s ease;
  }

  .toolbar-btn.active::before {
    transform: translateX(-50%) scaleX(1);
  }
  
  .toolbar-icon {
    transition: transform 0.15s ease;
  }
  
  .toolbar-btn:hover .toolbar-icon {
    transform: scale(1.1);
  }
  
  .toolbar-btn:active .toolbar-icon {
    transform: scale(0.95);
  }
  
  .toolbar-tooltip {
    position: absolute;
    bottom: -36px;
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: #1a2332;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 11px;
    color: white;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.15s ease;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .toolbar-tooltip::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #1a2332;
  }
  
  .toolbar-btn:hover .toolbar-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  
  .toolbar-shortcut {
    display: inline-block;
    background: rgba(117, 170, 219, 0.2);
    color: #75aadb;
    padding: 1px 4px;
    border-radius: 2px;
    margin-left: 6px;
    font-size: 9px;
    font-weight: 600;
  }
`;

/* ========== TOOLBAR BUTTON WITH TOOLTIP ========== */
const ToolbarButton = memo(({
  item,
  isActive,
  onClick,
  shortcut,
  compact
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(item.id);
    }
  }, [item.id, onClick]);
  
  return (
    <button
      onClick={() => onClick(item.id)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`toolbar-btn ${isActive ? 'active' : ''}`}
      style={{
        ...styles.ghost,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
        padding: compact ? "6px 10px" : "6px 14px",
        flexShrink: 0,
        color: isActive ? "#75aadb" : isHovered ? "#94a3b8" : "#4a5568",
      }}
      role="tab"
      aria-selected={isActive}
      aria-label={`${item.label} panel`}
      tabIndex={isActive ? 0 : -1}
    >
      <span className="toolbar-icon">
        <Icon
          i={item.icon}
          s={20}
          c={isActive ? "#75aadb" : isHovered ? "#94a3b8" : "#4a5568"}
        />
      </span>
      <span style={{
        fontSize: "8px",
        fontWeight: isActive ? 700 : 600,
        textTransform: "uppercase",
        letterSpacing: "1px",
        transition: 'color 0.15s ease'
      }}>
        {item.label}
      </span>

      {/* Tooltip */}
      <div className="toolbar-tooltip">
        {item.label}
        {shortcut && <span className="toolbar-shortcut">{shortcut}</span>}
      </div>
    </button>
  );
});

ToolbarButton.displayName = 'ToolbarButton';

/* ========== TOOLBAR ITEMS WITH SHORTCUTS ========== */
const TOOLBAR_SHORTCUTS = {
  media: '1',
  audio: '2',
  text: '3',
  stickers: '4',
  effects: '5',
  transition: '6',
  filters: '7'
};

/* ========== TOOLBAR COMPONENT ========== */
const Toolbar = ({ activeToolbar, onToolbarChange }) => {
  const isMobile = useMobile();

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    const currentIndex = TOOLBAR_ITEMS.findIndex(t => t.id === activeToolbar);
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % TOOLBAR_ITEMS.length;
      onToolbarChange(TOOLBAR_ITEMS[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = currentIndex === 0 ? TOOLBAR_ITEMS.length - 1 : currentIndex - 1;
      onToolbarChange(TOOLBAR_ITEMS[prevIndex].id);
    } else if (e.key >= '1' && e.key <= '7') {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      if (TOOLBAR_ITEMS[index]) {
        onToolbarChange(TOOLBAR_ITEMS[index].id);
      }
    }
  }, [activeToolbar, onToolbarChange]);
  
  return (
    <nav
      style={{
        ...styles.toolbar,
        ...(isMobile ? { overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' } : {})
      }}
      role="tablist"
      aria-label="Editor tools"
      onKeyDown={handleKeyDown}
    >
      <style>{TOOLBAR_CSS}</style>
      
      {TOOLBAR_ITEMS.map(t => (
        <ToolbarButton
          key={t.id}
          item={t}
          isActive={activeToolbar === t.id}
          onClick={onToolbarChange}
          shortcut={TOOLBAR_SHORTCUTS[t.id]}
          compact={isMobile}
        />
      ))}
    </nav>
  );
};

export default memo(Toolbar);
