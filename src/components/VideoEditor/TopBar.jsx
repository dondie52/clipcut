import { useState, useCallback, useEffect, memo } from 'react';
import Icon from './Icon';
import GhostBtn from './GhostBtn';
import { styles } from './styles';

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
`;

/* ========== EXPORT MODAL COMPONENT ========== */
const ExportModal = memo(({ 
  isOpen, 
  onClose, 
  onExport, 
  onCancel,
  isExporting, 
  isCancelling = false,
  progress, 
  resolutions 
}) => {
  const [selectedResolution, setSelectedResolution] = useState('1080p');
  
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
              <label 
                id="resolution-label"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 600
                }}
              >
                Select Resolution
              </label>
              <div 
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                role="radiogroup"
                aria-labelledby="resolution-label"
              >
                {Object.entries(resolutions).map(([key, { label }]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedResolution(key)}
                    className="resolution-option"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: selectedResolution === key ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
                      border: selectedResolution === key ? '2px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: "'Spline Sans', sans-serif"
                    }}
                    role="radio"
                    aria-checked={selectedResolution === key}
                    tabIndex={selectedResolution === key ? 0 : -1}
                  >
                    <span style={{
                      fontSize: '14px',
                      color: selectedResolution === key ? '#75aadb' : 'white',
                      fontWeight: selectedResolution === key ? 600 : 400
                    }}>
                      {label}
                    </span>
                    {selectedResolution === key && (
                      <Icon i="check_circle" s={20} c="#75aadb" />
                    )}
                  </button>
                ))}
              </div>
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
              onClick={() => onExport(selectedResolution)}
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
              aria-label={`Export video at ${selectedResolution}`}
            >
              <Icon i="download" s={18} c="#0a0a0a" />
              Export at {selectedResolution}
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
              Exporting Video...
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
              margin: 0,
              fontFamily: 'monospace'
            }}>
              {progress}%
            </p>

            <button
              onClick={onCancel}
              disabled={isCancelling}
              style={{
                marginTop: '18px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: isCancelling ? 'rgba(100,116,139,0.2)' : 'rgba(239,68,68,0.12)',
                color: isCancelling ? '#94a3b8' : '#fca5a5',
                cursor: isCancelling ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontFamily: "'Spline Sans', sans-serif"
              }}
              aria-label={isCancelling ? 'Cancelling export' : 'Cancel export'}
            >
              {isCancelling ? 'Cancelling…' : 'Cancel Export'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

ExportModal.displayName = 'ExportModal';

/* ========== TOP BAR COMPONENT ========== */
const TopBar = ({ 
  projectName, 
  onProjectNameChange,
  onExport,
  isExporting = false,
  isCancelling = false,
  exportProgress = 0,
  hasMediaToExport = false,
  resolutions = {},
  lastSaved = null,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onCancelExport
}) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  
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
    onProjectNameChange(e.target.value);
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
        style={styles.topBar}
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
            <span style={{
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "-0.3px",
              color: "white"
            }}>
              ClipCut
            </span>
          </div>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginLeft: "8px",
            fontSize: "11px"
          }}>
            <button 
              className="menu-btn"
              style={{
                ...styles.ghost,
                display: "flex",
                alignItems: "center",
                gap: "2px",
                color: "#94a3b8"
              }}
              aria-haspopup="menu"
              aria-label="Open menu"
            >
              Menu <Icon i="arrow_drop_down" s={16} />
            </button>
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
            {lastSaved && (
              <span 
                style={{ color: "#475569", display: 'flex', alignItems: 'center', gap: '4px' }}
                aria-label={`Last saved at ${lastSaved.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
                title={`Last saved: ${lastSaved.toLocaleString()}`}
              >
                <Icon i="cloud_done" s={12} c="#475569" />
                Saved {lastSaved.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
            )}
            {!lastSaved && (
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
              width: '220px'
            }}
            aria-label="Project name"
            title="Click to edit project name"
          />
        </div>
        
        {/* Right section - Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <GhostBtn 
            i="keyboard" 
            title="Keyboard shortcuts"
            aria-label="Show keyboard shortcuts"
          />
          <GhostBtn 
            i="grid_view" 
            title="Layout options"
            aria-label="Layout options"
          />
          <button 
            onClick={handleExportClick}
            className="export-btn"
            style={{
              ...styles.exportBtn,
              opacity: (hasMediaToExport && !isExporting) ? 1 : 0.5,
              cursor: (hasMediaToExport && !isExporting) ? 'pointer' : 'not-allowed'
            }}
            disabled={!hasMediaToExport || isExporting}
            aria-label={isExporting ? 'Exporting...' : (hasMediaToExport ? 'Export video' : 'Add media to timeline to export')}
            title={isExporting ? 'Export in progress...' : (hasMediaToExport ? 'Export video (Ctrl+E)' : 'Add media to timeline first')}
          >
            <Icon i="download" s={14} c="#0a0a0a" />
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </header>
      
      <ExportModal
        isOpen={showExportModal}
        onClose={handleCloseModal}
        onExport={handleExport}
        onCancel={onCancelExport}
        isExporting={isExporting}
        isCancelling={isCancelling}
        progress={exportProgress}
        resolutions={resolutions}
      />
    </>
  );
};

export default memo(TopBar);
