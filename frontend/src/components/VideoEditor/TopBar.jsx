import { useState, useCallback, useEffect, useRef, memo } from 'react';
import Icon from './Icon';
import GhostBtn from './GhostBtn';
import { styles } from './styles';
import { sanitizeTextInput } from '../../utils/validation';
import { KEYBOARD_SHORTCUTS } from './constants';
import { useMobile } from '../../hooks/useMobile';

/** Slugify a project/filename for safe use as a download attribute. Falls back to a dated name. */
function slugifyFilename(raw) {
  const slug = String(raw || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  if (slug) return slug;
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `clipcut-export-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Detect iOS (iPhone/iPad/iPod), including iPadOS 13+ which reports as desktop Safari. */
function isIOSDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  // iPadOS 13+ reports as MacIntel with touch support
  return navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1;
}

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
const QUALITY_PRESETS = [
  { key: 'low', label: 'Low', crf: 28 },
  { key: 'medium', label: 'Medium', crf: 23 },
  { key: 'high', label: 'High', crf: 18 },
  { key: 'ultra', label: 'Ultra', crf: 15 },
];

const FORMAT_OPTIONS = [
  { key: 'webm', label: 'WebM' },
  { key: 'mp4', label: 'MP4 (via server)' },
];

const FPS_OPTIONS = [24, 30, 60];

const PillGroup = memo(({ items, selected, onSelect, style: groupStyle }) => (
  <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '3px', ...groupStyle }}>
    {items.map(item => (
      <button key={item.key || item} onClick={() => onSelect(item.key || item)} style={{
        flex: 1, padding: '6px 8px', border: 'none', borderRadius: '6px', cursor: 'pointer',
        fontSize: '10px', fontWeight: 600, fontFamily: "'Spline Sans', sans-serif",
        background: (item.key || item) === selected ? 'rgba(117,170,219,0.15)' : 'transparent',
        color: (item.key || item) === selected ? '#75aadb' : '#64748b',
      }}>{item.label || item}</button>
    ))}
  </div>
));
PillGroup.displayName = 'PillGroup';

const ExportModal = memo(({
  isOpen,
  onClose,
  onExport,
  isExporting,
  progress,
  operationLabel = 'Processing',
  subMessage = '',
  resolutions,
  exportPresets = {},
  onCancel,
  projectName = 'Untitled',
  exportResult,
  onDownload,
  onExportAnother,
}) => {
  const [selectedResolution, setSelectedResolution] = useState('1080p');
  const [exportTab, setExportTab] = useState('resolution'); // 'resolution' | 'platform'
  const [selectedPreset, setSelectedPreset] = useState('youtube-1080p');
  const [exportFormat, setExportFormat] = useState('webm');
  const [exportQuality, setExportQuality] = useState('high');
  const [exportFps, setExportFps] = useState(30);
  const [exportFilename, setExportFilename] = useState('');

  // Sync filename with project name (slugified; dated fallback when empty)
  useEffect(() => {
    if (isOpen && !exportFilename) {
      setExportFilename(slugifyFilename(projectName));
    }
  }, [isOpen, projectName]); // eslint-disable-line react-hooks/exhaustive-deps

  const isIOS = isIOSDevice();

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape' && !isExporting) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExporting, onClose]);

  // Trap focus within modal
  useEffect(() => {
    if (!isOpen) return;
    const modal = document.getElementById('export-modal');
    const focusable = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable?.length) focusable[0].focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => { if (e.target === e.currentTarget && !isExporting && !exportResult) onClose(); };

  const res = resolutions?.[selectedResolution];
  const qualityPreset = QUALITY_PRESETS.find(q => q.key === exportQuality);
  const summaryParts = [exportFormat.toUpperCase(), selectedResolution, `${exportFps}fps`];
  const summaryLine = exportTab === 'platform'
    ? exportPresets[selectedPreset]?.label
    : summaryParts.join(' · ');

  const handleExport = () => {
    const settings = exportTab === 'platform'
      ? `preset:${selectedPreset}`
      : selectedResolution;
    onExport(settings, { format: exportFormat, quality: qualityPreset?.crf, fps: exportFps, filename: exportFilename || projectName });
  };

  // Settings form
  const renderSettings = () => (
    <>
      {/* Format */}
      <div style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', fontSize: '9px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Format</label>
        <PillGroup items={FORMAT_OPTIONS} selected={exportFormat} onSelect={setExportFormat} />
      </div>

      {/* Tab switcher: Resolution vs Platform */}
      <div style={{ marginBottom: '14px' }}>
        <PillGroup items={[{ key: 'resolution', label: 'Resolution' }, { key: 'platform', label: 'Platform' }]} selected={exportTab} onSelect={setExportTab} />
      </div>

      {exportTab === 'resolution' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }} role="radiogroup">
          {Object.entries(resolutions).map(([key, { label, width, height }]) => (
            <button key={key} onClick={() => setSelectedResolution(key)} className="resolution-option" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif",
              background: selectedResolution === key ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
              border: selectedResolution === key ? '1.5px solid #75aadb' : '1px solid rgba(255,255,255,0.06)',
            }} role="radio" aria-checked={selectedResolution === key}>
              <div>
                <span style={{ fontSize: '12px', color: selectedResolution === key ? '#75aadb' : 'white', fontWeight: selectedResolution === key ? 600 : 400 }}>{label}</span>
                <span style={{ fontSize: '10px', color: '#4a5568', marginLeft: '6px' }}>{width}&times;{height}</span>
              </div>
              {selectedResolution === key && <Icon i="check_circle" s={16} c="#75aadb" />}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }} role="radiogroup">
          {Object.entries(exportPresets).map(([key, p]) => (
            <button key={key} onClick={() => setSelectedPreset(key)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif",
              background: selectedPreset === key ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
              border: selectedPreset === key ? '1.5px solid #75aadb' : '1px solid rgba(255,255,255,0.06)',
            }} role="radio" aria-checked={selectedPreset === key}>
              <div>
                <div style={{ fontSize: '12px', color: selectedPreset === key ? '#75aadb' : 'white', fontWeight: selectedPreset === key ? 600 : 400 }}>{p.label}</div>
                <div style={{ fontSize: '9px', color: '#4a5568', marginTop: '1px' }}>{p.description} · {p.width}&times;{p.height}</div>
              </div>
              {selectedPreset === key && <Icon i="check_circle" s={16} c="#75aadb" />}
            </button>
          ))}
        </div>
      )}

      {/* Quality + FPS row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '9px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Quality</label>
          <PillGroup items={QUALITY_PRESETS} selected={exportQuality} onSelect={setExportQuality} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '9px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Frame Rate</label>
          <PillGroup items={FPS_OPTIONS.map(f => ({ key: f, label: `${f}fps` }))} selected={exportFps} onSelect={setExportFps} />
        </div>
      </div>

      {/* Filename */}
      <div style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', fontSize: '9px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Filename</label>
        <input
          type="text"
          value={exportFilename}
          onChange={(e) => setExportFilename(e.target.value)}
          style={{
            width: '100%', background: 'rgba(26,35,50,0.6)', border: '1px solid rgba(117,170,219,0.08)',
            borderRadius: '6px', padding: '8px 10px', color: 'white', fontSize: '12px',
            outline: 'none', fontFamily: "'Spline Sans', sans-serif", boxSizing: 'border-box',
          }}
          aria-label="Export filename"
        />
      </div>

      {/* Summary */}
      <div style={{
        padding: '10px 14px', background: 'rgba(117,170,219,0.06)', borderRadius: '6px',
        marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px',
        border: '1px solid rgba(117,170,219,0.1)',
      }}>
        <Icon i="info" s={14} c="#5a8cbf" />
        <div>
          <span style={{ fontSize: '11px', color: '#75aadb', fontWeight: 500 }}>{summaryLine}</span>
          {exportFormat === 'webm' && !isIOS && (
            <div style={{ fontSize: '9px', color: '#4a5568', marginTop: '2px' }}>WebM plays on most devices. For iPhone Photos app compatibility, use MP4.</div>
          )}
          {exportFormat === 'webm' && isIOS && (
            <div style={{ fontSize: '9px', color: '#f59e0b', marginTop: '2px' }}>
              ⚠️ WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead.
            </div>
          )}
          {exportFormat === 'mp4' && (
            <div style={{ fontSize: '9px', color: '#f59e0b', marginTop: '2px' }}>
              MP4 export requires a connection to our encoding server. That server isn't available right now — exporting as WebM instead. Plays on most devices; for iPhone Photos use MP4 when the server is back online.
            </div>
          )}
        </div>
      </div>

      {/* Export + Cancel buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onClose} style={{
          flex: '0 0 auto', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px', color: '#94a3b8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif",
        }}>Cancel</button>
        <button onClick={handleExport} className="export-btn" style={{
          flex: 1, padding: '10px', background: '#75aadb', border: 'none', borderRadius: '8px',
          color: '#0a0a0a', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: "'Spline Sans', sans-serif",
        }}>
          <Icon i="download" s={16} c="#0a0a0a" />
          Export
        </button>
      </div>
    </>
  );

  // Progress view
  const renderProgress = () => (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ width: '70px', height: '70px', margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(117,170,219,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Icon i="movie_edit" s={32} c="#75aadb" />
        <div style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: '#75aadb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
      <p style={{ color: 'white', fontSize: '16px', fontWeight: 500, margin: '0 0 6px' }}>{operationLabel}</p>
      <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 24px' }}>Please wait while your video is being processed</p>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #75aadb, #5a8cbf)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
      </div>
      <p style={{ color: '#75aadb', fontSize: '18px', fontWeight: 700, margin: '0 0 6px', fontFamily: 'monospace' }}>{Math.round(progress)}%</p>
      {subMessage && <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 20px', fontFamily: 'monospace' }}>{subMessage}</p>}
      {onCancel && (
        <button onClick={onCancel} style={{
          background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px',
          padding: '9px 28px', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: "'Spline Sans', sans-serif",
        }}>Cancel Export</button>
      )}
    </div>
  );

  // Completion view
  const renderComplete = () => (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ width: '70px', height: '70px', margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon i="check_circle" s={40} c="#22c55e" />
      </div>
      <p style={{ color: 'white', fontSize: '16px', fontWeight: 600, margin: '0 0 6px' }}>Export Complete</p>
      {exportResult?.size && (
        <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 20px' }}>
          File size: {(exportResult.size / (1024 * 1024)).toFixed(1)} MB
        </p>
      )}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button onClick={onClose} style={{
          padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px', color: '#94a3b8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif",
        }}>Close</button>
        {onExportAnother && (
          <button onClick={onExportAnother} style={{
            padding: '10px 20px', background: 'rgba(117,170,219,0.1)', border: '1px solid rgba(117,170,219,0.2)',
            borderRadius: '8px', color: '#75aadb', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif",
          }}>Export Another</button>
        )}
        {onDownload && (
          <button onClick={onDownload} className="export-btn" style={{
            padding: '10px 24px', background: '#75aadb', border: 'none', borderRadius: '8px',
            color: '#0a0a0a', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Spline Sans', sans-serif",
          }}>
            <Icon i="download" s={16} c="#0a0a0a" />
            Download
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="export-modal-backdrop"
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3500, backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
      role="dialog" aria-modal="true" aria-labelledby="export-modal-title"
    >
      <style>{TOP_BAR_CSS}</style>
      <div id="export-modal" className="export-modal-content" style={{
        background: '#1a2332', borderRadius: '12px', padding: '24px', width: '440px', maxWidth: '90vw',
        maxHeight: '85vh', overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 id="export-modal-title" style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon i="download" s={20} c="#75aadb" />
            Export Video
          </h2>
          {!isExporting && !exportResult && (
            <button onClick={onClose} style={{ ...styles.ghost, padding: '6px', borderRadius: '6px', display: 'flex' }} aria-label="Close export dialog" title="Close (Escape)">
              <Icon i="close" s={18} c="#94a3b8" />
            </button>
          )}
        </div>

        {exportResult ? renderComplete() : isExporting ? renderProgress() : renderSettings()}
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
  exportSubMessage = '',
  onNewProject,
  onSave,
  onSettings,
  editorLayout = 'default',
  onLayoutChange,
  forceOpenExport = false,
  onExportModalClosed,
  onAiToggle,
  aiPanelOpen = false,
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
  
  const handleExport = useCallback((resolution, settings) => {
    onExport?.(resolution, settings);
  }, [onExport]);
  
  const handleCloseModal = useCallback(() => {
    if (!isExporting) {
      setShowExportModal(false);
      setExportResult(null);
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
  
  // Track export completion for the modal's completion view
  const [exportResult, setExportResult] = useState(null);
  useEffect(() => {
    if (!isExporting && exportProgress >= 100 && showExportModal && !exportResult) {
      setExportResult({ size: null }); // size populated by parent if available
    }
    if (!showExportModal) {
      setExportResult(null);
    }
  }, [isExporting, exportProgress, showExportModal, exportResult]);
  
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
        style={{ ...styles.topBar, ...(isMobile ? { height: '44px', padding: '0 10px' } : {}) }}
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
            {/* Undo/Redo buttons — hidden on mobile (moved to time bar below preview) */}
            {!isMobile && (
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
            )}
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
        
        {/* Center section - Project title (wrapper ignores pointer events so a
            wide invisible hit-box cannot block header controls on narrow widths) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
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
              width: isMobile ? '120px' : '220px',
              pointerEvents: 'auto',
            }}
            aria-label="Project name"
            title="Click to edit project name"
          />
        </div>
        
        {/* Right section - Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px" }}>
          {onAiToggle && (
            <GhostBtn
              i="auto_awesome"
              title="AI Editor"
              aria-label={aiPanelOpen ? "Close AI editor" : "Open AI editor"}
              onClick={onAiToggle}
              style={aiPanelOpen ? { color: '#75aadb', background: 'rgba(117,170,219,0.12)' } : undefined}
            />
          )}
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
            className={isMobile ? '' : 'export-btn'}
            style={{
              ...(isMobile ? {
                background: (hasMediaToExport && !isExporting) ? '#22c55e' : 'rgba(34,197,94,0.5)',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: "'Spline Sans', sans-serif",
                cursor: (hasMediaToExport && !isExporting) ? 'pointer' : 'not-allowed',
                minHeight: '32px',
                minWidth: 'auto',
                transition: 'all 0.2s ease',
              } : {
                ...styles.exportBtn,
                opacity: (hasMediaToExport && !isExporting) ? 1 : 0.5,
                cursor: (hasMediaToExport && !isExporting) ? 'pointer' : 'not-allowed',
              }),
            }}
            disabled={!hasMediaToExport || isExporting}
            aria-label={isExporting ? 'Exporting...' : (hasMediaToExport ? 'Export video' : 'Add media to timeline to export')}
            title={isExporting ? 'Export in progress...' : (hasMediaToExport ? 'Export video (Ctrl+E)' : 'Add media to timeline first')}
          >
            <Icon i="download" s={14} c={isMobile ? '#fff' : '#0a0a0a'} />
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </header>
      
      <ExportModal
        isOpen={showExportModal}
        onClose={handleCloseModal}
        onExport={handleExport}
        isExporting={isExporting}
        progress={exportProgress}
        operationLabel={currentOperation || 'Exporting video...'}
        subMessage={exportSubMessage}
        resolutions={resolutions}
        exportPresets={exportPresets}
        onCancel={isExporting ? onCancelExport : undefined}
        projectName={projectName}
        exportResult={exportResult}
        onDownload={exportResult ? handleCloseModal : undefined}
        onExportAnother={exportResult ? () => setExportResult(null) : undefined}
      />

      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </>
  );
};

export default memo(TopBar);
