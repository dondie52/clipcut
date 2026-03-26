import { useState, useCallback, useEffect, useRef, memo } from 'react';
import Icon from './Icon';
import GhostBtn from './GhostBtn';
import { styles } from './styles';
import { sanitizeTextInput } from '../../utils/validation';
import { KEYBOARD_SHORTCUTS } from './constants';
import { useMobile } from '../../hooks/useMobile';

/* ========== CSS ANIMATIONS ========== */
const TOP_BAR_CSS = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .export-modal-backdrop {
    animation: fadeIn 0.2s ease;
  }
  
  .export-modal-content {
    animation: slideUp 0.3s ease;
  }
  
  .export-btn {
    transition: all 0.15s ease;
  }
  
  .export-btn:hover:not(:disabled) {
    background: #5a8cbf !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(117, 170, 219, 0.3);
  }
  
  .export-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  
  .resolution-option {
    transition: all 0.15s ease;
  }
  
  .resolution-option:hover {
    background: rgba(117, 170, 219, 0.1) !important;
    border-color: rgba(117, 170, 219, 0.3) !important;
  }
  
  .title-input {
    transition: all 0.15s ease;
  }
  
  .title-input:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .title-input:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(117, 170, 219, 0.5);
  }
  
  .menu-btn {
    transition: all 0.15s ease;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .menu-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white !important;
  }
  
  .logo-container {
    transition: transform 0.15s ease;
  }

  .logo-container:hover {
    transform: scale(1.02);
  }

  .menu-dropdown {
    animation: fadeIn 0.12s ease;
  }

  .menu-dropdown-item {
    transition: background 0.1s ease;
  }

  .menu-dropdown-item:hover {
    background: rgba(117, 170, 219, 0.12) !important;
  }

  .shortcuts-modal-backdrop {
    animation: fadeIn 0.2s ease;
  }

  .shortcuts-modal-content {
    animation: slideUp 0.3s ease;
  }

  .shortcut-key {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 11px;
    color: #cbd5e1;
    min-width: 24px;
    text-align: center;
  }
`;

/* ========== EXPORT MODAL COMPONENT ========== */
const ExportModal = memo(({
  isOpen,
  onClose,
  onExport,
  isExporting,
  progress,
  operationLabel = 'Processing',
  resolutions,
  exportPresets = {},
  onCancel
}) => {
  const [selectedResolution, setSelectedResolution] = useState('1080p');
  const [exportTab, setExportTab] = useState('resolution'); // 'resolution' | 'platform'
  const [selectedPreset, setSelectedPreset] = useState('youtube-1080p');
  
  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isExporting) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExporting, onClose]);
  
  // Trap focus within modal
  useEffect(() => {
    if (!isOpen) return;
    
    const modal = document.getElementById('export-modal');
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements?.length) {
      focusableElements[0].focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isExporting) {
      onClose();
    }
  };
  
  return (
      <div 
        className="export-modal-backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3500,
          backdropFilter: 'blur(4px)'
        }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <style>{TOP_BAR_CSS}</style>
      
      <div 
        id="export-modal"
        className="export-modal-content"
        style={{
          background: '#1a2332',
          borderRadius: '12px',
          padding: '24px',
          width: '420px',
          maxWidth: '90vw',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 
            id="export-modal-title"
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 600,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Icon i="download" s={22} c="#75aadb" />
            Export Video
          </h2>
          {!isExporting && (
            <button
              onClick={onClose}
              style={{
                ...styles.ghost,
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close export dialog"
              title="Close (Escape)"
            >
              <Icon i="close" s={20} c="#94a3b8" />
            </button>
          )}
        </div>
        
        {!isExporting ? (
          <>
            <div style={{ marginBottom: '20px' }}>
              {/* Tab switcher: Resolution vs Platform presets */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '3px' }}>
                {[['resolution', 'Resolution'], ['platform', 'Platform']].map(([id, lbl]) => (
                  <button key={id} onClick={() => setExportTab(id)} style={{
                    flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                    fontSize: '11px', fontWeight: 600, fontFamily: "'Spline Sans', sans-serif",
                    background: exportTab === id ? 'rgba(117,170,219,0.15)' : 'transparent',
                    color: exportTab === id ? '#75aadb' : '#94a3b8',
                  }}>{lbl}</button>
                ))}
              </div>

              {exportTab === 'resolution' ? (
                <>
                  <label id="resolution-label" style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                    Select Resolution
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} role="radiogroup" aria-labelledby="resolution-label">
                    {Object.entries(resolutions).map(([key, { label }]) => (
                      <button key={key} onClick={() => setSelectedResolution(key)} className="resolution-option" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 16px',
                        background: selectedResolution === key ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
                        border: selectedResolution === key ? '2px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px', cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif"
                      }} role="radio" aria-checked={selectedResolution === key} tabIndex={selectedResolution === key ? 0 : -1}>
                        <span style={{ fontSize: '14px', color: selectedResolution === key ? '#75aadb' : 'white', fontWeight: selectedResolution === key ? 600 : 400 }}>
                          {label}
                        </span>
                        {selectedResolution === key && <Icon i="check_circle" s={20} c="#75aadb" />}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                    Platform Presets
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} role="radiogroup">
                    {Object.entries(exportPresets).map(([key, p]) => (
                      <button key={key} onClick={() => setSelectedPreset(key)} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                        fontFamily: "'Spline Sans', sans-serif",
                        background: selectedPreset === key ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
                        border: selectedPreset === key ? '2px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                      }} role="radio" aria-checked={selectedPreset === key}>
                        <div>
                          <div style={{ fontSize: '13px', color: selectedPreset === key ? '#75aadb' : 'white', fontWeight: selectedPreset === key ? 600 : 400 }}>{p.label}</div>
                          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{p.description} &middot; {p.width}&times;{p.height}</div>
                        </div>
                        {selectedPreset === key && <Icon i="check_circle" s={20} c="#75aadb" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div style={{
              padding: '14px',
              background: 'rgba(117,170,219,0.08)',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid rgba(117, 170, 219, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                color: '#75aadb',
                fontSize: '12px',
                lineHeight: 1.5
              }}>
                <Icon i="info" s={16} c="#75aadb" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>
                  Export uses H.264 codec for maximum compatibility. 
                  Higher resolutions may take longer to process.
                </span>
              </div>
            </div>
            
            <button
              onClick={() => onExport(exportTab === 'platform' ? `preset:${selectedPreset}` : selectedResolution)}
              className="export-btn"
              style={{
                width: '100%',
                padding: '14px',
                background: '#75aadb',
                border: 'none',
                borderRadius: '8px',
                color: '#0a0a0a',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: "'Spline Sans', sans-serif"
              }}
              aria-label={`Export video${exportTab === 'platform' ? ` for ${exportPresets[selectedPreset]?.label}` : ` at ${selectedResolution}`}`}
            >
              <Icon i="download" s={18} c="#0a0a0a" />
              {exportTab === 'platform' ? `Export for ${exportPresets[selectedPreset]?.label}` : `Export at ${selectedResolution}`}
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '70px',
              height: '70px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              background: 'rgba(117,170,219,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Icon i="movie_edit" s={32} c="#75aadb" />
              {/* Animated ring */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '3px solid transparent',
                borderTopColor: '#75aadb',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
            
            <p style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: 500,
              margin: '0 0 6px 0'
            }}>
              {operationLabel}
            </p>
            <p style={{
              color: '#64748b',
              fontSize: '12px',
              margin: '0 0 24px 0'
            }}>
              Please wait while your video is being processed
            </p>
            
            <div style={{
              height: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #75aadb, #5a8cbf)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
            
            <p style={{
              color: '#75aadb',
              fontSize: '18px',
              fontWeight: 700,
              margin: '0 0 20px',
              fontFamily: 'monospace'
            }}>
              {Math.round(progress)}%
            </p>
            {onCancel && (
              <button
                onClick={onCancel}
                style={{
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '8px',
                  padding: '9px 28px',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: "'Spline Sans', sans-serif",
                }}
                aria-label="Cancel export"
              >
                Cancel Export
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ExportModal.displayName = 'ExportModal';

/* ========== KEYBOARD SHORTCUTS MODAL ========== */
const SHORTCUT_CATEGORIES = {
  Playback: ['PLAY_PAUSE', 'SKIP_FORWARD', 'SKIP_BACKWARD', 'SKIP_FORWARD_LARGE', 'SKIP_BACKWARD_LARGE', 'FRAME_FORWARD', 'FRAME_BACKWARD', 'GO_TO_START', 'GO_TO_END'],
  Editing: ['SPLIT', 'DELETE', 'DESELECT'],
  Audio: ['MUTE', 'VOLUME_UP', 'VOLUME_DOWN'],
  View: ['FULLSCREEN'],
  File: ['SAVE', 'EXPORT', 'IMPORT'],
};

const KeyboardShortcutsModal = memo(({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="shortcuts-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 3500, backdropFilter: 'blur(4px)'
      }}
      role="dialog" aria-modal="true" aria-labelledby="shortcuts-modal-title"
    >
      <style>{TOP_BAR_CSS}</style>
      <div
        className="shortcuts-modal-content"
        style={{
          background: '#1a2332', borderRadius: '12px', padding: '24px',
          width: '520px', maxWidth: '90vw', maxHeight: '80vh', overflow: 'auto',
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 id="shortcuts-modal-title" style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon i="keyboard" s={22} c="#75aadb" />
            Keyboard Shortcuts
          </h2>
          <button onClick={onClose} style={{ ...styles.ghost, padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close shortcuts dialog">
            <Icon i="close" s={20} c="#94a3b8" />
          </button>
        </div>

        {Object.entries(SHORTCUT_CATEGORIES).map(([category, keys]) => (
          <div key={category} style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '11px', color: '#75aadb', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: '0 0 10px 0' }}>
              {category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {keys.map((k) => {
                const shortcut = KEYBOARD_SHORTCUTS[k];
                if (!shortcut) return null;
                return (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.02)' }}>
                    <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{shortcut.description}</span>
                    <span className="shortcut-key">{shortcut.key}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

KeyboardShortcutsModal.displayName = 'KeyboardShortcutsModal';

/* ========== MENU DROPDOWN ========== */
const MENU_ITEMS = [
  { id: 'new', icon: 'add', label: 'New Project', shortcut: null },
  { id: 'save', icon: 'save', label: 'Save', shortcut: 'Ctrl+S' },
  { id: 'divider1' },
  { id: 'export', icon: 'download', label: 'Export', shortcut: 'Ctrl+E' },
  { id: 'divider2' },
  { id: 'settings', icon: 'settings', label: 'Settings', shortcut: null },
];

const MenuDropdown = memo(({ isOpen, onClose, onNewProject, onSave, onExport, onSettings, hasMediaToExport }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    // Delay listener so the click that opens the menu doesn't immediately close it
    requestAnimationFrame(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (id) => {
    onClose();
    switch (id) {
      case 'new': onNewProject?.(); break;
      case 'save': onSave?.(); break;
      case 'export': if (hasMediaToExport) onExport?.(); break;
      case 'settings': onSettings?.(); break;
    }
  };

  return (
    <div
      ref={menuRef}
      className="menu-dropdown"
      role="menu"
      style={{
        position: 'absolute', top: '100%', left: 0, marginTop: '4px',
        background: '#1a2332', borderRadius: '8px', padding: '4px',
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        minWidth: '200px', zIndex: 100
      }}
    >
      {MENU_ITEMS.map((item) => {
        if (item.id.startsWith('divider')) {
          return <div key={item.id} style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />;
        }
        const disabled = item.id === 'export' && !hasMediaToExport;
        return (
          <button
            key={item.id}
            className="menu-dropdown-item"
            role="menuitem"
            onClick={() => !disabled && handleItemClick(item.id)}
            style={{
              ...styles.ghost, display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 12px', borderRadius: '6px', width: '100%', textAlign: 'left',
              color: disabled ? '#475569' : '#cbd5e1', cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1, fontSize: '13px',
              fontFamily: "'Spline Sans', sans-serif"
            }}
            disabled={disabled}
          >
            <Icon i={item.icon} s={16} c={disabled ? '#475569' : '#94a3b8'} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.shortcut && (
              <span style={{ fontSize: '11px', color: '#475569', fontFamily: "'SF Mono', Monaco, monospace" }}>{item.shortcut}</span>
            )}
          </button>
        );
      })}
    </div>
  );
});

MenuDropdown.displayName = 'MenuDropdown';

/* ========== TOP BAR COMPONENT ========== */
const TopBar = ({
  projectName,
  onProjectNameChange,
  onExport,
  isExporting = false,
  exportProgress = 0,
  currentOperation = '',
  hasMediaToExport = false,
  resolutions = {},
  exportPresets = {},
  lastSaved = null,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onCancelExport,
  onNewProject,
  onSave,
  onSettings,
  editorLayout = 'default',
  onLayoutChange,
  forceOpenExport = false,
  onExportModalClosed,
}) => {
  const isMobile = useMobile();
  const [showExportModal, setShowExportModal] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const menuAnchorRef = useRef(null);

  // ? key opens keyboard shortcuts
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcuts(v => !v);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
  
  // Allow parent to trigger export modal (for mobile tab bar)
  useEffect(() => {
    if (forceOpenExport && hasMediaToExport && !isExporting) {
      setShowExportModal(true);
      onExportModalClosed?.();
    }
  }, [forceOpenExport, hasMediaToExport, isExporting, onExportModalClosed]);

  const handleExportClick = useCallback(() => {
    if (isExporting) {
      // Don't allow opening export modal while export is in progress
      return;
    }
    if (hasMediaToExport) {
      setShowExportModal(true);
    } else {
      // Show helpful message if export is not available
      console.warn('Export not available:', {
        hasMediaToExport,
        isExporting
      });
    }
  }, [hasMediaToExport, isExporting]);
  
  const handleExport = useCallback((resolution) => {
    onExport?.(resolution);
  }, [onExport]);
  
  const handleCloseModal = useCallback(() => {
    if (!isExporting) {
      setShowExportModal(false);
    }
  }, [isExporting]);
  
  const handleTitleChange = useCallback((e) => {
    // Sanitize project name before updating: max 100 chars, remove HTML, trim
    const sanitized = sanitizeTextInput(e.target.value, { maxLength: 100 });
    onProjectNameChange(sanitized);
  }, [onProjectNameChange]);
  
  const handleTitleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    } else if (e.key === 'Escape') {
      e.target.blur();
    }
  }, []);
  
  // Close modal when export completes
  useEffect(() => {
    if (!isExporting && exportProgress === 100 && showExportModal) {
      const timer = setTimeout(() => setShowExportModal(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isExporting, exportProgress, showExportModal]);
  
  // Get current time for auto-save display
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <style>{TOP_BAR_CSS}</style>
      
      <header
        style={{ ...styles.topBar, ...(isMobile ? { height: '38px', padding: '0 8px' } : {}) }}
        role="banner"
        aria-label="ClipCut editor header"
      >
        {/* Left section - Logo and menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div 
            className="logo-container"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              cursor: 'pointer'
            }}
            role="img"
            aria-label="ClipCut logo"
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(117, 170, 219, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon i="movie_edit" s={18} c="#75aadb" />
            </div>
            {!isMobile && <span style={{
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "-0.3px",
              color: "white"
            }}>
              ClipCut
            </span>}
          </div>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginLeft: "8px",
            fontSize: "11px"
          }}>
            <div ref={menuAnchorRef} style={{ position: 'relative' }}>
              <button
                className="menu-btn"
                onClick={() => setShowMenu(v => !v)}
                style={{
                  ...styles.ghost,
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  color: showMenu ? "#75aadb" : "#94a3b8"
                }}
                aria-haspopup="menu"
                aria-expanded={showMenu}
                aria-label="Open menu"
              >
                {isMobile ? <Icon i="menu" s={18} /> : <>Menu <Icon i="arrow_drop_down" s={16} /></>}
              </button>
              <MenuDropdown
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
                onNewProject={onNewProject}
                onSave={onSave}
                onExport={handleExportClick}
                onSettings={onSettings}
                hasMediaToExport={hasMediaToExport}
              />
            </div>
            {/* Undo/Redo buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="menu-btn"
                style={{
                  ...styles.ghost,
                  padding: "4px 6px",
                  opacity: canUndo ? 1 : 0.4,
                  cursor: canUndo ? "pointer" : "not-allowed"
                }}
                title="Undo (Ctrl+Z)"
                aria-label="Undo"
              >
                <Icon i="undo" s={14} c={canUndo ? "#94a3b8" : "#475569"} />
              </button>
              <button
                onClick={onRedo}
                disabled={!canRedo}
                className="menu-btn"
                style={{
                  ...styles.ghost,
                  padding: "4px 6px",
                  opacity: canRedo ? 1 : 0.4,
                  cursor: canRedo ? "pointer" : "not-allowed"
                }}
                title="Redo (Ctrl+Shift+Z or Ctrl+Y)"
                aria-label="Redo"
              >
                <Icon i="redo" s={14} c={canRedo ? "#94a3b8" : "#475569"} />
              </button>
            </div>
            {/* Auto-save indicator */}
            {!isMobile && lastSaved && (
              <span
                style={{ color: "#475569", display: 'flex', alignItems: 'center', gap: '4px' }}
                aria-label={`Last saved at ${lastSaved.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
                title={`Last saved: ${lastSaved.toLocaleString()}`}
              >
                <Icon i="cloud_done" s={12} c="#475569" />
                Saved {lastSaved.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
            )}
            {!isMobile && !lastSaved && (
              <span
                style={{ color: "#475569", display: 'flex', alignItems: 'center', gap: '4px' }}
                aria-label="Auto save at current time"
              >
                <Icon i="cloud_done" s={12} c="#475569" />
                Auto save at {currentTime}
              </span>
            )}
          </div>
        </div>
        
        {/* Center section - Project title */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <input
            type="text"
            value={projectName}
            onChange={handleTitleChange}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
            onKeyDown={handleTitleKeyDown}
            className="title-input"
            style={{
              ...styles.titleInput,
              position: 'relative',
              left: 'auto',
              transform: 'none',
              border: '1px solid transparent',
              width: isMobile ? '120px' : '220px'
            }}
            aria-label="Project name"
            title="Click to edit project name"
          />
        </div>
        
        {/* Right section - Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px" }}>
          {!isMobile && (
            <GhostBtn
              i="keyboard"
              title="Keyboard shortcuts"
              aria-label="Show keyboard shortcuts"
              onClick={() => setShowShortcuts(true)}
            />
          )}
          {!isMobile && (
            <GhostBtn
              i={editorLayout === 'default' ? 'grid_view' : editorLayout === 'wide-timeline' ? 'view_agenda' : 'view_compact'}
              title={`Layout: ${editorLayout}`}
              aria-label="Cycle layout"
              onClick={() => {
                const layouts = ['default', 'wide-timeline', 'compact'];
                const idx = layouts.indexOf(editorLayout);
                onLayoutChange?.(layouts[(idx + 1) % layouts.length]);
              }}
            />
          )}
          <button
            onClick={handleExportClick}
            className="export-btn"
            style={{
              ...styles.exportBtn,
              ...(isMobile ? { padding: '5px 10px', fontSize: '11px' } : {}),
              opacity: (hasMediaToExport && !isExporting) ? 1 : 0.5,
              cursor: (hasMediaToExport && !isExporting) ? 'pointer' : 'not-allowed'
            }}
            disabled={!hasMediaToExport || isExporting}
            aria-label={isExporting ? 'Exporting...' : (hasMediaToExport ? 'Export video' : 'Add media to timeline to export')}
            title={isExporting ? 'Export in progress...' : (hasMediaToExport ? 'Export video (Ctrl+E)' : 'Add media to timeline first')}
          >
            <Icon i="download" s={14} c="#0a0a0a" />
            {!isMobile && (isExporting ? 'Exporting...' : 'Export')}
          </button>
        </div>
      </header>
      
      <ExportModal
        isOpen={showExportModal}
        onClose={handleCloseModal}
        onExport={handleExport}
        isExporting={isExporting}
        progress={exportProgress}
        operationLabel={currentOperation ? `${currentOperation}...` : 'Exporting video...'}
        resolutions={resolutions}
        exportPresets={exportPresets}
        onCancel={isExporting ? onCancelExport : undefined}
      />

      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </>
  );
};

export default memo(TopBar);
