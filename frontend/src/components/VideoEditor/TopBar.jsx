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
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes hud-led-pulse {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 1; }
  }

  @keyframes hud-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes hud-tick {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.72); }
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

  /* ========== BROADCAST HUD EXPORT MODAL ========== */
  .hud-backdrop {
    position: fixed; inset: 0;
    background: rgba(3, 6, 12, 0.88);
    display: flex; align-items: center; justify-content: center;
    z-index: 3500;
    backdrop-filter: blur(6px) saturate(0.9);
    -webkit-backdrop-filter: blur(6px) saturate(0.9);
    animation: fadeIn 0.2s ease;
  }

  .hud-console {
    background: #080b11;
    border: 1px solid rgba(117,170,219,0.25);
    border-radius: 3px;
    width: 480px;
    max-width: 92vw;
    max-height: 88vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: #e4e8ef;
    font-family: 'Spline Sans', sans-serif;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.03) inset,
      0 32px 80px rgba(0,0,0,0.72),
      0 0 60px rgba(117,170,219,0.08);
    animation: slideUp 0.32s cubic-bezier(0.2, 0.7, 0.2, 1);
    position: relative;
  }

  /* subtle horizontal scan-line sheen on the console */
  .hud-console::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(117,170,219,0.6), transparent);
    animation: hud-scan 4s linear infinite;
    pointer-events: none;
    z-index: 2;
  }

  .hud-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: linear-gradient(180deg, #0b1018 0%, #080b11 100%);
    border-bottom: 1px solid rgba(117,170,219,0.18);
    flex-shrink: 0;
  }

  .hud-head-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .hud-head-led {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #75AADB;
    box-shadow: 0 0 10px rgba(117,170,219,0.8), inset 0 0 3px rgba(255,255,255,0.4);
    animation: hud-led-pulse 1.8s ease-in-out infinite;
    flex-shrink: 0;
  }
  .hud-head-led--amber { background: #f5b84e; box-shadow: 0 0 10px rgba(245,184,78,0.8), inset 0 0 3px rgba(255,255,255,0.4); }
  .hud-head-led--green { background: #6ec07a; box-shadow: 0 0 10px rgba(110,192,122,0.8), inset 0 0 3px rgba(255,255,255,0.4); animation: none; }

  .hud-head-title {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #cbd5e1;
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hud-head-title .sep { color: rgba(255,255,255,0.2); }
  .hud-head-title .ch-id { color: #75AADB; }

  .hud-head-close {
    width: 28px; height: 28px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
  }
  .hud-head-close:hover {
    background: rgba(239,68,68,0.1);
    color: #ef4444;
    border-color: rgba(239,68,68,0.3);
  }

  .hud-body {
    padding: 18px;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* ---- Section rows (label + content) ---- */
  .hud-row { display: flex; flex-direction: column; gap: 8px; }
  .hud-row-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .hud-label {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(117,170,219,0.65);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .hud-label::before {
    content: '';
    width: 14px;
    height: 1px;
    background: rgba(117,170,219,0.45);
    display: inline-block;
  }

  /* ---- Segmented control (format, tab, fps) ---- */
  .hud-segment {
    display: flex;
    gap: 0;
    background: #04060b;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
  }
  .hud-segment button {
    flex: 1;
    background: transparent;
    border: none;
    padding: 8px 10px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.42);
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;
    border-right: 1px solid rgba(255,255,255,0.06);
    text-transform: uppercase;
  }
  .hud-segment button:last-child { border-right: none; }
  .hud-segment button:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.03); }
  .hud-segment button.is-active {
    background: rgba(117,170,219,0.16);
    color: #75AADB;
    box-shadow: inset 0 -2px 0 #75AADB;
  }

  /* ---- Signal table (resolution / preset rows) ---- */
  .hud-table {
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
    background: #04060b;
  }
  .hud-row-item {
    display: grid;
    grid-template-columns: 18px 1fr auto auto;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: background 140ms ease;
    color: rgba(255,255,255,0.75);
  }
  .hud-row-item:last-child { border-bottom: none; }
  .hud-row-item:hover { background: rgba(117,170,219,0.05); }
  .hud-row-item.is-active {
    background: rgba(117,170,219,0.12);
    color: #ffffff;
  }

  .hud-row-led {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.2);
    box-sizing: border-box;
  }
  .hud-row-item.is-active .hud-row-led {
    background: #75AADB;
    border-color: #75AADB;
    box-shadow: 0 0 8px rgba(117,170,219,0.7);
  }

  .hud-row-name {
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: -0.005em;
  }
  .hud-row-item.is-active .hud-row-name { font-weight: 600; color: #fff; }

  .hud-row-spec {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.4);
    white-space: nowrap;
  }

  .hud-row-sub {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10px;
    color: rgba(255,255,255,0.34);
    letter-spacing: 0.04em;
    grid-column: 2 / 4;
    margin-top: 2px;
  }

  /* ---- Filename input ---- */
  .hud-input {
    width: 100%;
    background: #04060b;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    padding: 10px 12px;
    color: #ffffff;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 12px;
    letter-spacing: 0.02em;
    outline: none;
    transition: border-color 160ms ease, background 160ms ease;
    box-sizing: border-box;
  }
  .hud-input::placeholder { color: rgba(255,255,255,0.22); }
  .hud-input:focus {
    border-color: #75AADB;
    background: #060a12;
    box-shadow: 0 0 0 2px rgba(117,170,219,0.12);
  }

  /* ---- Summary / status strip ---- */
  .hud-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    background: rgba(117,170,219,0.06);
    border: 1px solid rgba(117,170,219,0.22);
    border-radius: 2px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  }
  .hud-summary-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #75AADB;
    box-shadow: 0 0 8px rgba(117,170,219,0.6);
    flex-shrink: 0;
  }
  .hud-summary-text {
    font-size: 11px;
    color: #75AADB;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .hud-summary-note {
    font-size: 10.5px;
    color: rgba(255,255,255,0.42);
    margin-top: 3px;
    letter-spacing: 0.02em;
    line-height: 1.45;
    font-family: 'Spline Sans', sans-serif;
    text-transform: none;
    font-weight: 400;
  }
  .hud-summary-note--warn { color: #f5b84e; }

  /* ---- Footer button row ---- */
  .hud-actions {
    display: flex;
    gap: 10px;
    padding: 14px 18px;
    border-top: 1px solid rgba(255,255,255,0.06);
    background: #04060b;
    flex-shrink: 0;
  }

  .hud-btn {
    padding: 11px 18px;
    border-radius: 2px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid transparent;
    transition: background 160ms ease, box-shadow 220ms ease, transform 120ms ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .hud-btn--primary {
    background: #75AADB;
    color: #04060b;
    flex: 1;
    box-shadow: inset 0 -2px 0 rgba(0,0,0,0.25), 0 0 0 1px rgba(117,170,219,0.5);
  }
  .hud-btn--primary:hover {
    background: #8bbae3;
    box-shadow: inset 0 -2px 0 rgba(0,0,0,0.25), 0 0 0 1px #8bbae3, 0 10px 28px rgba(117,170,219,0.35);
  }
  .hud-btn--primary:active { transform: translateY(1px); }

  .hud-btn--ghost {
    background: transparent;
    color: rgba(255,255,255,0.55);
    border-color: rgba(255,255,255,0.1);
  }
  .hud-btn--ghost:hover {
    background: rgba(255,255,255,0.04);
    color: #fff;
    border-color: rgba(255,255,255,0.2);
  }

  .hud-btn--danger {
    background: transparent;
    color: #ef4444;
    border-color: rgba(239,68,68,0.3);
  }
  .hud-btn--danger:hover {
    background: rgba(239,68,68,0.1);
    border-color: #ef4444;
  }

  /* ---- Progress state ---- */
  .hud-progress {
    padding: 8px 4px 12px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .hud-big-readout {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 64px;
    font-weight: 500;
    line-height: 1;
    color: #75AADB;
    text-align: center;
    letter-spacing: -0.03em;
    text-shadow: 0 0 24px rgba(117,170,219,0.35);
    font-variant-numeric: tabular-nums;
  }
  .hud-big-readout .pct {
    font-size: 28px;
    color: rgba(117,170,219,0.55);
    margin-left: 4px;
  }

  .hud-op-label {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.72);
    text-align: center;
  }
  .hud-op-sub {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10.5px;
    color: rgba(255,255,255,0.42);
    text-align: center;
    letter-spacing: 0.04em;
    margin-top: 4px;
  }

  /* Film-strip progress bar with sprocket holes */
  .hud-filmstrip {
    position: relative;
    height: 26px;
    background: #02040a;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
  }
  .hud-filmstrip-fill {
    position: absolute;
    inset: 0;
    width: 0;
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 60%, #8bbae3 100%);
    transition: width 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 0 24px rgba(117,170,219,0.35);
  }
  .hud-filmstrip-fill::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; width: 2px;
    background: #ffffff;
    opacity: 0.5;
    box-shadow: 0 0 12px rgba(255,255,255,0.7);
  }
  .hud-filmstrip-perf {
    position: absolute;
    left: 0; right: 0;
    height: 5px;
    display: flex;
    pointer-events: none;
    z-index: 2;
  }
  .hud-filmstrip-perf--top    { top: 0;    background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent); }
  .hud-filmstrip-perf--bottom { bottom: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); }
  .hud-filmstrip-perf > span {
    flex: 1;
    margin: 1px 3px;
    background: rgba(255,255,255,0.4);
    border-radius: 1px;
    animation: hud-tick 1.6s ease-in-out infinite;
    transform-origin: center;
  }

  .hud-telemetry {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    background: #04060b;
  }
  .hud-telemetry-cell {
    padding: 10px 12px;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .hud-telemetry-cell:last-child { border-right: none; }
  .hud-telemetry-label {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }
  .hud-telemetry-value {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 13px;
    color: #e4e8ef;
    font-weight: 500;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }

  /* ---- Complete state ---- */
  .hud-complete {
    padding: 24px 8px 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  .hud-complete-stamp {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    border: 1px solid rgba(110, 192, 122, 0.4);
    background: rgba(110, 192, 122, 0.08);
    border-radius: 2px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6ec07a;
  }
  .hud-complete-stamp .led {
    width: 8px; height: 8px; border-radius: 50%;
    background: #6ec07a;
    box-shadow: 0 0 10px rgba(110,192,122,0.75);
  }
  .hud-complete-title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin: 6px 0 0;
  }
  .hud-complete-file {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.04em;
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

  // Settings form — Broadcast HUD layout
  const renderSettings = () => (
    <>
      <div className="hud-body">
        {/* Format */}
        <div className="hud-row">
          <span className="hud-label">Container · Codec</span>
          <div className="hud-segment" role="radiogroup" aria-label="Output format">
            {FORMAT_OPTIONS.map(f => (
              <button
                key={f.key}
                className={exportFormat === f.key ? 'is-active' : ''}
                onClick={() => setExportFormat(f.key)}
                role="radio"
                aria-checked={exportFormat === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target (resolution vs platform) */}
        <div className="hud-row">
          <span className="hud-label">Target</span>
          <div className="hud-segment" role="radiogroup" aria-label="Target mode">
            <button
              className={exportTab === 'resolution' ? 'is-active' : ''}
              onClick={() => setExportTab('resolution')}
              role="radio"
              aria-checked={exportTab === 'resolution'}
            >
              By Resolution
            </button>
            <button
              className={exportTab === 'platform' ? 'is-active' : ''}
              onClick={() => setExportTab('platform')}
              role="radio"
              aria-checked={exportTab === 'platform'}
            >
              By Platform
            </button>
          </div>
        </div>

        {/* Signal table */}
        <div className="hud-row">
          <span className="hud-label">Signal</span>
          {exportTab === 'resolution' ? (
            <div className="hud-table" role="radiogroup" aria-label="Resolution">
              {Object.entries(resolutions).map(([key, { label, width, height }]) => {
                const active = selectedResolution === key;
                return (
                  <button
                    key={key}
                    className={`hud-row-item ${active ? 'is-active' : ''}`}
                    onClick={() => setSelectedResolution(key)}
                    role="radio"
                    aria-checked={active}
                  >
                    <span className="hud-row-led" aria-hidden="true" />
                    <span className="hud-row-name">{label}</span>
                    <span className="hud-row-spec">{width}×{height}</span>
                    <span className="hud-row-spec" style={{ color: active ? '#75AADB' : 'rgba(255,255,255,0.34)' }}>
                      {Math.round((width * height) / 10000) / 100}MP
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="hud-table" role="radiogroup" aria-label="Platform">
              {Object.entries(exportPresets).map(([key, p]) => {
                const active = selectedPreset === key;
                return (
                  <button
                    key={key}
                    className={`hud-row-item ${active ? 'is-active' : ''}`}
                    onClick={() => setSelectedPreset(key)}
                    role="radio"
                    aria-checked={active}
                    style={{ gridTemplateColumns: '18px 1fr auto' }}
                  >
                    <span className="hud-row-led" aria-hidden="true" />
                    <span className="hud-row-name">
                      {p.label}
                      <span className="hud-row-sub" style={{ gridColumn: 'unset', display: 'block', marginTop: 3 }}>
                        {p.description}
                      </span>
                    </span>
                    <span className="hud-row-spec">{p.width}×{p.height}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quality + FPS */}
        <div className="hud-row-split">
          <div className="hud-row">
            <span className="hud-label">Quality (CRF)</span>
            <div className="hud-segment" role="radiogroup" aria-label="Quality">
              {QUALITY_PRESETS.map(q => (
                <button
                  key={q.key}
                  className={exportQuality === q.key ? 'is-active' : ''}
                  onClick={() => setExportQuality(q.key)}
                  role="radio"
                  aria-checked={exportQuality === q.key}
                  title={`CRF ${q.crf}`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hud-row">
            <span className="hud-label">Frame Rate</span>
            <div className="hud-segment" role="radiogroup" aria-label="Frame rate">
              {FPS_OPTIONS.map(f => (
                <button
                  key={f}
                  className={exportFps === f ? 'is-active' : ''}
                  onClick={() => setExportFps(f)}
                  role="radio"
                  aria-checked={exportFps === f}
                >
                  {f}fps
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filename */}
        <div className="hud-row">
          <span className="hud-label">Filename</span>
          <input
            type="text"
            className="hud-input"
            value={exportFilename}
            onChange={(e) => setExportFilename(e.target.value)}
            aria-label="Export filename"
            placeholder="clipcut-export"
          />
        </div>

        {/* Summary strip */}
        <div className="hud-summary" role="status">
          <span className="hud-summary-dot" aria-hidden="true" />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="hud-summary-text">
              Ready · {summaryLine}
            </div>
            {exportFormat === 'webm' && !isIOS && (
              <div className="hud-summary-note">
                WebM plays on most devices. For iPhone Photos compatibility, choose MP4.
              </div>
            )}
            {exportFormat === 'webm' && isIOS && (
              <div className="hud-summary-note hud-summary-note--warn">
                WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead.
              </div>
            )}
            {exportFormat === 'mp4' && (
              <div className="hud-summary-note hud-summary-note--warn">
                MP4 export routes through our encoding server, which is offline right now — falling back to WebM. Switch back once the server is available.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hud-actions">
        <button type="button" className="hud-btn hud-btn--ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="hud-btn hud-btn--primary export-btn" onClick={handleExport}>
          <Icon i="download" s={14} c="#04060b" />
          Render · Export
        </button>
      </div>
    </>
  );

  // Progress view — render-farm HUD
  const renderProgress = () => {
    const pct = Math.max(0, Math.min(100, Math.round(progress)));
    return (
      <div className="hud-body">
        <div className="hud-progress">
          <div className="hud-big-readout" aria-live="polite" aria-atomic="true">
            {String(pct).padStart(2, '0')}<span className="pct">%</span>
          </div>
          <div>
            <div className="hud-op-label">{operationLabel || 'Rendering'}</div>
            {subMessage && <div className="hud-op-sub">{subMessage}</div>}
          </div>

          <div className="hud-filmstrip" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct}>
            <div className="hud-filmstrip-perf hud-filmstrip-perf--top" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, i) => <span key={i} style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }} />)}
            </div>
            <div className="hud-filmstrip-fill" style={{ width: `${pct}%` }} />
            <div className="hud-filmstrip-perf hud-filmstrip-perf--bottom" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, i) => <span key={i} style={{ animationDelay: `${(i * 0.05 + 0.1).toFixed(2)}s` }} />)}
            </div>
          </div>

          <div className="hud-telemetry" aria-label="Telemetry">
            <div className="hud-telemetry-cell">
              <span className="hud-telemetry-label">Format</span>
              <span className="hud-telemetry-value">{exportFormat.toUpperCase()}</span>
            </div>
            <div className="hud-telemetry-cell">
              <span className="hud-telemetry-label">Signal</span>
              <span className="hud-telemetry-value">
                {exportTab === 'platform'
                  ? (exportPresets[selectedPreset]?.label || '—')
                  : selectedResolution.toUpperCase()}
              </span>
            </div>
            <div className="hud-telemetry-cell">
              <span className="hud-telemetry-label">Frame Rate</span>
              <span className="hud-telemetry-value">{exportFps}fps</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProgressActions = () => (
    onCancel ? (
      <div className="hud-actions" style={{ justifyContent: 'center' }}>
        <button type="button" className="hud-btn hud-btn--danger" onClick={onCancel}>
          Abort render
        </button>
      </div>
    ) : null
  );

  // Completion view
  const renderComplete = () => (
    <div className="hud-body">
      <div className="hud-complete">
        <div className="hud-complete-stamp">
          <span className="led" aria-hidden="true" />
          Export complete · Signal locked
        </div>
        <h3 className="hud-complete-title">Your file is ready.</h3>
        {exportResult?.size && (
          <span className="hud-complete-file">
            {(exportResult.size / (1024 * 1024)).toFixed(1)} MB · {exportFormat.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );

  const renderCompleteActions = () => (
    <div className="hud-actions">
      <button type="button" className="hud-btn hud-btn--ghost" onClick={onClose}>
        Close
      </button>
      {onExportAnother && (
        <button type="button" className="hud-btn hud-btn--ghost" onClick={onExportAnother}>
          Export another
        </button>
      )}
      {onDownload && (
        <button type="button" className="hud-btn hud-btn--primary export-btn" onClick={onDownload}>
          <Icon i="download" s={14} c="#04060b" />
          Download
        </button>
      )}
    </div>
  );

  const headLedClass = exportResult
    ? 'hud-head-led hud-head-led--green'
    : isExporting
      ? 'hud-head-led hud-head-led--amber'
      : 'hud-head-led';

  const headStatus = exportResult
    ? 'Complete'
    : isExporting
      ? 'Rendering'
      : 'Standby';

  return (
    <div
      className="hud-backdrop"
      onClick={handleBackdropClick}
      role="dialog" aria-modal="true" aria-labelledby="export-modal-title"
    >
      <style>{TOP_BAR_CSS}</style>
      <div id="export-modal" className="hud-console">
        <div className="hud-head">
          <div className="hud-head-left">
            <span className={headLedClass} aria-hidden="true" />
            <h2 id="export-modal-title" className="hud-head-title">
              <span>CC · EXPORT</span>
              <span className="sep">//</span>
              <span className="ch-id">{headStatus.toUpperCase()}</span>
            </h2>
          </div>
          {!isExporting && !exportResult && (
            <button
              onClick={onClose}
              className="hud-head-close"
              aria-label="Close export dialog"
              title="Close (Escape)"
            >
              <Icon i="close" s={16} c="currentColor" />
            </button>
          )}
        </div>

        {exportResult ? renderComplete() : isExporting ? renderProgress() : renderSettings()}

        {!isExporting && !exportResult && null /* settings renders its own actions */}
        {isExporting && renderProgressActions()}
        {exportResult && renderCompleteActions()}
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
