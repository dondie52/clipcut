import { useState, useEffect, useCallback, useMemo, useReducer, useRef, memo, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from './TopBar';
import Toolbar from './Toolbar';
import { styles, RESPONSIVE_CSS } from './styles';
import { SCROLLBAR_CSS } from './constants';
import { useFFmpeg } from '../../hooks/useFFmpeg';
import { useMobile, useOrientation } from '../../hooks/useMobile';
import { useAuth } from '../../supabase/AuthContext';
import { saveProject, loadProject, getProjectMediaUrl, uploadProjectMedia } from '../../services/projectService';
import { isSupabaseConfigured } from '../../supabase/supabaseClient';
import { getCachedThumbnail, cacheThumbnail } from '../../utils/thumbnailCache';
import { getVideoInfoFast, generateThumbnailFast } from '../../utils/fastMediaProbe';
import { storeMedia, loadMedia, rekeyProjectMedia, listAllMedia } from '../../utils/mediaStore';
import { sanitizeTextInput } from '../../utils/validation';
import { validateFile } from '../../utils/fileValidation';
import { getUserFriendlyMessage, retryWithBackoff } from '../../utils/errorHandling';
import { isServerExportAvailable, serverExport } from '../../services/apiService';
import { canvasExport } from '../../services/canvasExport';
import { RESOLUTIONS, EXPORT_PRESETS } from '../../services/videoOperations';
import ErrorBoundary from '../ErrorBoundary';
import {
  MAX_UNDO_HISTORY,
  AUTO_SAVE_INTERVAL,
  DEFAULT_CLIP_DURATION,
  TOAST_AUTO_CLOSE_DELAY,
  TOAST_ANIMATION_DURATION
} from '../../constants';
import { DEFAULT_CLIP_PROPERTIES, FILTER_PRESETS } from './constants';

// Lazy load heavy sub-components for better code splitting
const MediaPanel = lazy(() => import('./MediaPanel'));
const Player = lazy(() => import('./Player'));
const InspectorPanel = lazy(() => import('./InspectorPanel'));
const Timeline = lazy(() => import('./Timeline'));
const MobileTextPanel = lazy(() => import('./MobileTextPanel'));
const MobileAudioPanel = lazy(() => import('./MobileAudioPanel'));
const MobileStickerPanel = lazy(() => import('./MobileStickerPanel'));
const MobileEffectsPanel = lazy(() => import('./MobileEffectsPanel'));
const MobileFiltersPanel = lazy(() => import('./MobileFiltersPanel'));
const CaptionsPanel = lazy(() => import('./CaptionsPanel'));
const AIChatPanel = lazy(() => import('./AIChatPanel'));
import BottomSheet from './BottomSheet';
import Icon from './Icon';
import { formatTimecode } from './timelineEngine';
import { buildRestoredProjectState, hasUnavailableMediaClips } from './restoreState';
import { shouldSkipAutoSave } from './autoSaveGuard';
import { warmupWorker } from '../../services/workerWarmup';

/* ========== CSS ========== */
const VIDEO_EDITOR_CSS = `
  /* Ensure Material Symbols font renders immediately with swap fallback */
  .material-symbols-outlined {
    font-display: swap;
    width: 1em;
    height: 1em;
    overflow: hidden;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideOutRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(24px); } }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .loading-overlay { animation: fadeIn 0.2s ease; }
  .loading-card { animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .toast-enter { animation: slideInRight 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .toast-exit { animation: slideOutRight 0.25s ease forwards; }
  @keyframes inspectorSlideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  .inspector-enter { animation: inspectorSlideIn 0.2s ease-out; }
  .shimmer-bar {
    background: linear-gradient(90deg, rgba(117,170,219,0.3) 25%, rgba(117,170,219,0.6) 50%, rgba(117,170,219,0.3) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  .resize-handle {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;
    user-select: none;
    z-index: 10;
    background: rgba(117,170,219,0.04);
  }
  .resize-handle:hover, .resize-handle.dragging {
    background: rgba(117,170,219,0.15);
  }
  .resize-handle-h {
    height: 8px;
    cursor: row-resize;
  }
  .resize-handle-v {
    width: 8px;
    cursor: col-resize;
  }
  .resize-handle-dot {
    width: 32px;
    height: 3px;
    border-radius: 2px;
    background: rgba(117,170,219,0.25);
    transition: background 0.15s ease;
  }
  .resize-handle:hover .resize-handle-dot, .resize-handle.dragging .resize-handle-dot {
    background: rgba(117,170,219,0.6);
  }
  .resize-handle-dot-v {
    width: 3px;
    height: 32px;
  }
  ${SCROLLBAR_CSS}
  ${RESPONSIVE_CSS}
`;

/* ========== RESIZE HANDLE ========== */
function useResizeDrag(axis, onResize, onEnd, invert = false) {
  const dragging = useRef(false);
  const startPos = useRef(0);
  const startSize = useRef(0);

  const onMouseDown = useCallback((e, currentSize) => {
    e.preventDefault();
    dragging.current = true;
    startPos.current = axis === 'y' ? e.clientY : e.clientX;
    startSize.current = currentSize;
    const handle = e.currentTarget;
    handle.classList.add('dragging');

    const onMouseMove = (ev) => {
      if (!dragging.current) return;
      const raw = axis === 'y'
        ? startPos.current - ev.clientY  // dragging up = bigger timeline
        : ev.clientX - startPos.current;
      const delta = invert ? -raw : raw;
      onResize(startSize.current + delta);
    };
    const onMouseUp = () => {
      dragging.current = false;
      handle.classList.remove('dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      onEnd?.();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = axis === 'y' ? 'row-resize' : 'col-resize';
    document.body.style.userSelect = 'none';
  }, [axis, onResize, onEnd, invert]);

  return onMouseDown;
}

const DEFAULT_TIMELINE_H = 280;
const DEFAULT_MEDIA_W = 280;
const DEFAULT_INSPECTOR_W = 320;

/** Caps for resizable side panels — combined panels must never exceed 55% of viewport
 *  so the preview always keeps at least 45% (minus resize handles). */
const MIN_PREVIEW_W = 360; // absolute minimum preview width in px
function maxMediaPanelCap(vw) {
  return Math.max(200, Math.min(400, Math.floor(vw * 0.25)));
}
function maxInspectorPanelCap(vw) {
  return Math.max(220, Math.min(400, Math.floor(vw * 0.25)));
}

const LEFT_COLUMN_FILL_STYLE = { width: '100%', minWidth: 0, minHeight: 0, alignSelf: 'stretch' };

/* ========== LAZY LOADING FALLBACKS ========== */
const PanelLoadingFallback = memo(({ width, height = "100%" }) => (
  <div style={{
    width, height, background: "linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRight: "1px solid rgba(117,170,219,0.06)",
  }}>
    <div style={{
      width: "20px", height: "20px",
      border: "2px solid rgba(117,170,219,0.15)", borderTopColor: "#75aadb",
      borderRadius: "50%", animation: "spin 0.8s linear infinite",
    }} />
  </div>
));
PanelLoadingFallback.displayName = "PanelLoadingFallback";

const TimelineLoadingFallback = memo(() => (
  <div style={{
    height: "220px", background: "linear-gradient(180deg, #0c1018 0%, #08090c 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderTop: "2px solid rgba(117,170,219,0.08)",
  }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: "20px", height: "20px",
        border: "2px solid rgba(117,170,219,0.15)", borderTopColor: "#75aadb",
        borderRadius: "50%", animation: "spin 0.8s linear infinite",
      }} />
      <span style={{ color: "#3d4a5c", fontSize: "11px", fontWeight: 500 }}>Loading timeline...</span>
    </div>
  </div>
));
TimelineLoadingFallback.displayName = "TimelineLoadingFallback";

/* ========== ONBOARDING WALKTHROUGH ========== */
const WALKTHROUGH_STEPS = [
  { target: 'media-panel', title: 'Media Library', desc: 'Import videos and audio files here. Drag them to the timeline to start editing.', position: 'right' },
  { target: 'player', title: 'Preview', desc: 'Watch your edit in real-time. Effects and text overlays preview live without rendering.', position: 'bottom' },
  { target: 'inspector', title: 'Inspector', desc: 'Adjust clip properties \u2014 filters, speed, volume, text overlays, and transforms.', position: 'left' },
  { target: 'timeline', title: 'Timeline', desc: 'Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.', position: 'top' },
];

const WalkthroughOverlay = memo(({ onComplete }) => {
  const [step, setStep] = useState(0);
  const current = WALKTHROUGH_STEPS[step];
  const isLast = step === WALKTHROUGH_STEPS.length - 1;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={(e) => { if (e.target === e.currentTarget) onComplete(); }}>
      <div style={{
        background: '#1a2332', borderRadius: '12px', padding: '24px', maxWidth: '380px', width: '90%',
        border: '1px solid rgba(117,170,219,0.2)', boxShadow: '0 16px 64px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(117,170,219,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#75aadb' }}>
            {step + 1}
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9' }}>{current.title}</span>
        </div>
        <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 16px' }}>{current.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {WALKTHROUGH_STEPS.map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === step ? '#75aadb' : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onComplete} style={{
              padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
              background: 'transparent', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif",
            }}>Skip</button>
            <button onClick={() => isLast ? onComplete() : setStep(s => s + 1)} style={{
              padding: '8px 20px', border: 'none', borderRadius: '6px',
              background: 'linear-gradient(135deg, #75aadb, #5a8cbf)', color: '#0a0a0a',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Spline Sans', sans-serif",
            }}>{isLast ? 'Get Started' : 'Next'}</button>
          </div>
        </div>
      </div>
    </div>
  );
});
WalkthroughOverlay.displayName = "WalkthroughOverlay";

/* ========== UNDO/REDO SYSTEM ========== */
const timelineReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLIPS':
      return {
        ...state,
        clips: action.clips,
        past: [...state.past.slice(-(MAX_UNDO_HISTORY - 1)), state.clips],
        future: [],
      };
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const prev = state.past[state.past.length - 1];
      return { clips: prev, past: state.past.slice(0, -1), future: [state.clips, ...state.future] };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return { clips: next, past: [...state.past, state.clips], future: state.future.slice(1) };
    }
    case 'RESET':
      return { clips: [], past: [], future: [] };
    default:
      return state;
  }
};

/* ========== ID GENERATOR ========== */
let _idN = 0;
const genId = () => `clip-${Date.now()}-${(++_idN).toString(36)}`;

/* ========== LOADING OVERLAY ========== */
const LoadingOverlay = memo(({ message, progress, subMessage, operationLabel, onCancel }) => (
  <div className="loading-overlay" style={{
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
    backdropFilter: "blur(6px)",
  }} role="dialog" aria-modal="true" aria-label="Processing">
    <div className="loading-card" style={{
      background: "linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",
      borderRadius: "16px", padding: "36px 52px", textAlign: "center",
      border: "1px solid rgba(117,170,219,0.15)",
      boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",
      minWidth: "280px",
    }}>
      <div style={{ width: "56px", height: "56px", margin: "0 auto 20px", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          border: "3px solid rgba(117,170,219,0.15)", borderTopColor: "#75aadb",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: "6px",
          border: "2px solid rgba(117,170,219,0.1)", borderBottomColor: "rgba(117,170,219,0.5)",
          borderRadius: "50%", animation: "spin 1.2s linear infinite reverse",
        }} />
      </div>
      <p style={{ color: "white", fontSize: "15px", margin: "0 0 6px", fontWeight: 600 }}>{message}</p>
      {operationLabel && <p style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px", margin: "0 0 8px" }}>{operationLabel}</p>}
      {subMessage && <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 16px" }}>{subMessage}</p>}
      {progress > 0 && (
        <>
          <div style={{
            width: "220px", height: "6px", background: "rgba(255,255,255,0.06)",
            borderRadius: "3px", overflow: "hidden", margin: "16px auto 10px",
          }}>
            <div className={progress < 100 ? "shimmer-bar" : ""} style={{
              height: "100%", width: `${progress}%`,
              background: progress >= 100 ? "linear-gradient(90deg, #22c55e, #16a34a)" : "linear-gradient(90deg, #75aadb, #5a8cbf)",
              transition: "width 0.3s ease", borderRadius: "3px",
            }} />
          </div>
          <p style={{ color: "#75aadb", fontSize: "13px", fontWeight: 700, margin: "0 0 16px" }}>{Math.round(progress)}%</p>
        </>
      )}
      {onCancel && (
        <button
          onClick={onCancel}
          style={{
            marginTop: progress > 0 ? "0" : "16px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "8px",
            padding: "8px 24px",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "'Spline Sans', sans-serif",
            transition: "background 0.15s ease",
          }}
          aria-label="Cancel operation"
        >
          Cancel
        </button>
      )}
    </div>
  </div>
));
LoadingOverlay.displayName = "LoadingOverlay";

/* ========== NON-BLOCKING FFMPEG INIT BAR ========== */
const FFmpegInitBar = memo(({ progress }) => {
  if (progress >= 100) return null;
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "3px",
      background: "rgba(0,0,0,0.3)", zIndex: 100, overflow: "hidden",
    }}>
      <div style={{
        height: "100%", width: `${Math.max(progress, 2)}%`,
        background: "linear-gradient(90deg, #5a8cbf, #75aadb)",
        transition: "width 0.3s ease", borderRadius: "0 2px 2px 0",
        boxShadow: "0 0 8px rgba(117,170,219,0.4)",
      }} />
    </div>
  );
});
FFmpegInitBar.displayName = "FFmpegInitBar";

/* ========== TOAST SYSTEM ========== */
const Toast = memo(({ type = "error", message, onClose, autoClose = false }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!autoClose) return;
    const t1 = setTimeout(() => setExiting(true), TOAST_AUTO_CLOSE_DELAY);
    const t2 = setTimeout(onClose, TOAST_AUTO_CLOSE_DELAY + TOAST_ANIMATION_DURATION);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [autoClose, onClose]);

  const close = useCallback(() => { setExiting(true); setTimeout(onClose, TOAST_ANIMATION_DURATION); }, [onClose]);

  const cfg = {
    error:   { bg: "linear-gradient(135deg, #ef4444, #dc2626)", shadow: "rgba(239,68,68,0.25)", icon: "error" },
    success: { bg: "linear-gradient(135deg, #22c55e, #16a34a)", shadow: "rgba(34,197,94,0.25)", icon: "check_circle" },
    warning: { bg: "linear-gradient(135deg, #f59e0b, #d97706)", shadow: "rgba(245,158,11,0.25)", icon: "warning" },
    info:    { bg: "linear-gradient(135deg, #3b82f6, #2563eb)", shadow: "rgba(59,130,246,0.25)", icon: "info" },
  }[type] || { bg: "#ef4444", shadow: "rgba(0,0,0,0.2)", icon: "error" };

  return (
    <div className={exiting ? "toast-exit" : "toast-enter"} style={{
      position: "fixed", bottom: "24px", right: "24px",
      background: cfg.bg, color: "white", padding: "12px 18px",
      borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px",
      boxShadow: `0 8px 28px ${cfg.shadow}`, zIndex: 3000, maxWidth: "380px",
      fontSize: "13px", backdropFilter: "blur(4px)",
    }} role={type === "error" ? "alert" : "status"}>
      <span className="material-symbols-outlined" style={{ fontSize: "18px", opacity: 0.9 }}>{cfg.icon}</span>
      <span style={{ flex: 1, lineHeight: 1.4 }}>{message}</span>
      <button onClick={close} style={{
        background: "rgba(255,255,255,0.15)", border: "none", color: "white", cursor: "pointer",
        padding: "4px", borderRadius: "50%", display: "flex", width: "22px", height: "22px",
        alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0,
      }}>✕</button>
    </div>
  );
});
Toast.displayName = "Toast";

/** First video source for dashboard thumbnail — clip may only reference media via mediaId. */
function getVideoFileForThumbnail(clips, mediaItems) {
  const vid = clips.find((c) => c.type === "video");
  if (!vid) return null;
  if (vid.file) return { file: vid.file, mediaId: vid.mediaId };
  const mi = mediaItems.find((m) => m.id === vid.mediaId);
  if (mi?.file) return { file: mi.file, mediaId: vid.mediaId };
  return null;
}

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

/** Upload local media files to project storage; updates clips with storagePath for reload. */
async function uploadPendingMediaForProject(userId, projectId, mediaItems, clips, setMediaItems, setClips) {
  const uploaded = new Map();
  for (const m of mediaItems) {
    if (!m.file || m.storagePath) continue;
    try {
      const path = await uploadProjectMedia(userId, projectId, m.file);
      uploaded.set(m.id, path);
    } catch (e) {
      console.warn("[autosave] Media upload failed:", m.name, e);
    }
  }
  if (uploaded.size === 0) return { changed: false, clips, mediaItems };
  const newMedia = mediaItems.map((m) => (uploaded.has(m.id) ? { ...m, storagePath: uploaded.get(m.id) } : m));
  const newClips = clips.map((c) => {
    const p = c.mediaId && uploaded.get(c.mediaId);
    return p ? { ...c, storagePath: p } : c;
  });
  setMediaItems(newMedia);
  setClips(newClips);
  return { changed: true, clips: newClips, mediaItems: newMedia };
}

/* ========== AUTO-SAVE HOOK ========== */
const useAutoSave = (
  projectId,
  projectName,
  clips,
  mediaItems,
  userId,
  totalDuration,
  resolution,
  setMediaItems,
  setClips,
  bgMusic,
  setBgMusic,
  timelineMarkers,
  isRestoreCompleteRef,
  interval = AUTO_SAVE_INTERVAL
) => {
  const [lastSaved, setLastSaved] = useState(null);
  const isSavingRef = useRef(false);
  const projectIdRef = useRef(projectId);
  const lastThumbnailClipIdRef = useRef(null);
  const lastThumbnailDataUrlRef = useRef(null);
  const doSaveRef = useRef(null);
  const consecutiveFailuresRef = useRef(0);
  const backoffTicksRef = useRef(0);
  // Flips true the first time we observe non-empty clips or mediaItems this
  // session. Lets the guard distinguish "user intentionally cleared the
  // timeline" (save) from "restore hasn't populated state yet" (skip).
  const hasBeenNonEmptyRef = useRef(false);

  const clipsRef = useRef(clips);
  clipsRef.current = clips;
  const mediaItemsRef = useRef(mediaItems);
  mediaItemsRef.current = mediaItems;
  const projectNameRef = useRef(projectName);
  projectNameRef.current = projectName;
  const totalDurationRef = useRef(totalDuration);
  totalDurationRef.current = totalDuration;
  const resolutionRef = useRef(resolution);
  resolutionRef.current = resolution;
  const bgMusicRef = useRef(bgMusic);
  bgMusicRef.current = bgMusic;
  const timelineMarkersRef = useRef(timelineMarkers);
  timelineMarkersRef.current = timelineMarkers;

  useEffect(() => {
    projectIdRef.current = projectId;
  }, [projectId]);

  // Pre-warm Worker isolate + face-detection models on editor mount so the
  // first AI action doesn't pay the cold-start tax mid-demo. Idle-scheduled so
  // it doesn't fight the initial render. faceDetection is dynamically imported
  // to keep TFJS/MediaPipe out of the eager VideoEditor chunk.
  useEffect(() => {
    const run = () => {
      warmupWorker();
      import('../../services/faceDetection')
        .then((m) => m.warmupFaceModels?.())
        .catch(() => { /* warmup is best-effort */ });
    };
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(run, { timeout: 1500 });
      return () => cancelIdleCallback?.(id);
    }
    const t = setTimeout(run, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const SKIP_KEYS = new Set(["file", "blobUrl", "thumbnail", "isProcessing"]);
    const serializeClip = (c) => {
      const o = {};
      for (const [k, v] of Object.entries(c)) {
        if (!SKIP_KEYS.has(k)) o[k] = v;
      }
      // Always write an idbKey so restore can find media in IndexedDB
      if (c.mediaId && projectIdRef.current) {
        o.idbKey = `idb://${projectIdRef.current}:${c.mediaId}`;
      }
      // Never persist blob: URLs as storagePath — they expire on page close
      if (o.storagePath && o.storagePath.startsWith('blob:')) {
        delete o.storagePath;
      }
      return o;
    };

    /** Serialize a media panel item for persistence (strip runtime-only fields). */
    const serializeMediaItem = (m) => {
      const o = {};
      for (const [k, v] of Object.entries(m)) {
        if (!SKIP_KEYS.has(k)) o[k] = v;
      }
      if (m.id && projectIdRef.current) {
        o.idbKey = `idb://${projectIdRef.current}:${m.id}`;
      }
      if (o.blobUrl) delete o.blobUrl;
      return o;
    };

    const doSave = async () => {
      if (isSavingRef.current) return { saved: false, skipReason: 'in-progress' };

      // Latch "session has touched this project" before consulting the guard —
      // once true, stays true, so clearing the timeline on purpose is still saved.
      const pendingClipsCount = clipsRef.current?.length || 0;
      const pendingMediaCount = mediaItemsRef.current?.length || 0;
      if (pendingClipsCount > 0 || pendingMediaCount > 0) {
        hasBeenNonEmptyRef.current = true;
      }

      const guard = shouldSkipAutoSave({
        projectId: projectIdRef.current,
        isRestored: isRestoreCompleteRef ? isRestoreCompleteRef.current : true,
        hasBeenNonEmpty: hasBeenNonEmptyRef.current,
        clipsCount: pendingClipsCount,
        mediaItemsCount: pendingMediaCount,
      });
      if (guard.skip) return { saved: false, skipReason: guard.reason };

      // Exponential backoff: after consecutive failures, skip ticks to avoid spamming
      if (consecutiveFailuresRef.current >= 3) {
        if (backoffTicksRef.current > 0) {
          backoffTicksRef.current--;
          return { saved: false, skipReason: 'backoff' };
        }
        // Next backoff: skip 2^(failures-3) ticks (e.g. 1, 2, 4, 8...)
        backoffTicksRef.current = Math.min(
          Math.pow(2, consecutiveFailuresRef.current - 3),
          20 // cap at ~10 min with 30s interval
        );
      }
      isSavingRef.current = true;

      try {
        const currentClips = clipsRef.current;
        const currentMedia = mediaItemsRef.current;
        const currentName = projectNameRef.current;
        const currentBg = bgMusicRef.current;

        const projectData = {
          id: projectIdRef.current,
          name: currentName,
          clips: currentClips.map(serializeClip),
          mediaItems: currentMedia.map(serializeMediaItem),
          duration: totalDurationRef.current,
          resolution: resolutionRef.current || "1080p",
          timelineMarkers: timelineMarkersRef.current || [],
        };

        if (currentBg?.storagePath || currentBg?.mediaId) {
          projectData.bgMusic = {
            name: currentBg.name,
            volume: currentBg.volume ?? 0.3,
          };
          if (currentBg.storagePath) projectData.bgMusic.storagePath = currentBg.storagePath;
          if (currentBg.mediaId) projectData.bgMusic.mediaId = currentBg.mediaId;
        }

        // Generate thumbnail for both Supabase and localStorage saves.
        // We always generate a base64 data URL and embed it in project_data
        // so the Dashboard can show it even if Supabase Storage URLs break.
        const videoSource = getVideoFileForThumbnail(currentClips, currentMedia);
        const firstClipMediaId = videoSource?.mediaId || null;
        const needsNewThumb = videoSource && firstClipMediaId !== lastThumbnailClipIdRef.current;
        if (needsNewThumb) {
          try {
            const thumbBlob = await generateThumbnailFast(videoSource.file, 1);
            // Validate that the blob is a real image, not a tiny fallback
            if (thumbBlob && thumbBlob.size > 500) {
              lastThumbnailClipIdRef.current = firstClipMediaId;
              if (userId) {
                projectData.thumbnail = thumbBlob;
              }
              // Produce a base64 data URL — stored in project_data JSONB as fallback
              const dataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(thumbBlob);
              });
              projectData.thumbnailDataUrl = dataUrl;
              lastThumbnailDataUrlRef.current = dataUrl;
            }
          } catch (e) {
            console.warn("Auto-save thumbnail generation failed:", e);
          }
        } else if (lastThumbnailDataUrlRef.current) {
          projectData.thumbnailDataUrl = lastThumbnailDataUrlRef.current;
        }

        if (userId) {
          const saved = await retryWithBackoff(() => saveProject(userId, projectData), {
            maxRetries: 2,
            baseDelay: 1000,
            maxDelay: 5000,
          });

          // Once we've committed any state to Supabase, the in-memory project is
          // the source of truth for this row — future empty saves are legitimate
          // user actions, not a pre-restore race.
          if (isRestoreCompleteRef) isRestoreCompleteRef.current = true;

          // After first Supabase save: adopt the server-generated UUID and re-key IndexedDB
          const oldPid = projectIdRef.current;
          let rekeyed = false;
          if (saved?.id && saved.id !== oldPid) {
            projectIdRef.current = saved.id;
            // Re-key IndexedDB entries from draft/local ID to real UUID — await to prevent races
            if (oldPid) {
              try {
                await rekeyProjectMedia(oldPid, saved.id);
                rekeyed = true;
                console.log('[autosave] IndexedDB re-key OK:', oldPid, '→', saved.id);
              } catch (e) {
                console.warn('[autosave] IndexedDB re-key failed:', e);
              }
            }
          }

          const pid = projectIdRef.current;
          if (pid && isSupabaseConfigured()) {
            const uploadResult = await uploadPendingMediaForProject(
              userId,
              pid,
              mediaItemsRef.current,
              clipsRef.current,
              setMediaItems,
              setClips
            );
            if (uploadResult.changed) {
              clipsRef.current = uploadResult.clips;
              mediaItemsRef.current = uploadResult.mediaItems;
            }

            // Always re-save project_data after rekey or upload to ensure idbKeys are current
            if (uploadResult.changed || rekeyed) {
              const projectData2 = {
                id: pid,
                name: projectNameRef.current,
                clips: (uploadResult.changed ? uploadResult.clips : clipsRef.current).map(serializeClip),
                mediaItems: mediaItemsRef.current.map(serializeMediaItem),
                duration: totalDurationRef.current,
                resolution: resolutionRef.current || "1080p",
                timelineMarkers: timelineMarkersRef.current || [],
                ...(lastThumbnailDataUrlRef.current ? { thumbnailDataUrl: lastThumbnailDataUrlRef.current } : {}),
              };
              if (bgMusicRef.current?.storagePath) {
                projectData2.bgMusic = {
                  storagePath: bgMusicRef.current.storagePath,
                  name: bgMusicRef.current.name,
                  volume: bgMusicRef.current.volume ?? 0.3,
                };
              }
              await saveProject(userId, projectData2);
            }

            const bg = bgMusicRef.current;
            if (bg?.file && !bg?.storagePath && pid) {
              try {
                const path = await uploadProjectMedia(userId, pid, bg.file);
                setBgMusic((prev) => (prev ? { ...prev, storagePath: path } : null));
                await saveProject(userId, {
                  id: pid,
                  name: projectNameRef.current,
                  clips: clipsRef.current.map(serializeClip),
                  mediaItems: mediaItemsRef.current.map(serializeMediaItem),
                  duration: totalDurationRef.current,
                  resolution: resolutionRef.current || "1080p",
                  timelineMarkers: timelineMarkersRef.current || [],
                  bgMusic: { storagePath: path, name: bg.name, volume: bg.volume ?? 0.3 },
                  ...(lastThumbnailDataUrlRef.current ? { thumbnailDataUrl: lastThumbnailDataUrlRef.current } : {}),
                });
              } catch (e) {
                console.warn("Background music upload failed:", e);
              }
            }
          }
        } else {
          // localStorage fallback — use saveProject (routes to localStorage) with thumbnail
          const saved = saveProject(null, projectData);
          const pid = saved.id;
          if (!projectIdRef.current) projectIdRef.current = pid;
          if (isRestoreCompleteRef) isRestoreCompleteRef.current = true;

          // Persist media files to IndexedDB so they survive page reloads
          for (const m of mediaItemsRef.current) {
            if (m.file) {
              storeMedia(pid, m.id, m.file, { name: m.name, type: m.file.type }).catch((err) => {
                console.warn("Failed to persist media to IndexedDB", { mediaId: m.id, error: err?.message });
              });
            }
          }
          // Also persist background music
          const bg = bgMusicRef.current;
          if (bg?.file && bg?.mediaId) {
            storeMedia(pid, bg.mediaId, bg.file, { name: bg.name, type: bg.file.type }).catch((err) => {
              console.warn("Failed to persist background music to IndexedDB", { mediaId: bg.mediaId, error: err?.message });
            });
          }
        }

        setLastSaved(new Date());
        consecutiveFailuresRef.current = 0;
        backoffTicksRef.current = 0;
        return { saved: true };
      } catch (e) {
        consecutiveFailuresRef.current++;
        if (consecutiveFailuresRef.current <= 1) {
          console.warn("Auto-save failed:", e?.message || e);
        } else if (consecutiveFailuresRef.current === 3) {
          console.warn(`[autosave] ${consecutiveFailuresRef.current} consecutive failures — backing off. Will retry less frequently.`);
        }
        try {
          const name = projectNameRef.current;
          const pid = projectIdRef.current;
          const fb = {
            id: pid,
            projectName: name,
            clips: clipsRef.current.map(serializeClip),
            mediaItems: mediaItemsRef.current.map(serializeMediaItem),
            savedAt: new Date().toISOString(),
          };
          localStorage.setItem(`clipcut_autosave_${name}`, JSON.stringify(fb));
          // Ensure media is in IndexedDB for the fallback path too
          if (pid) {
            for (const m of mediaItemsRef.current) {
              if (m.file) {
                storeMedia(pid, m.id, m.file, { name: m.name, type: m.file.type }).catch((err) => {
                  console.warn("Fallback media persist failed", { mediaId: m.id, error: err?.message });
                });
              }
            }
          }
        } catch {
          /* localStorage full or unavailable */
        }
        return { saved: false, skipReason: 'error', error: e };
      } finally {
        isSavingRef.current = false;
      }
    };

    doSaveRef.current = doSave;
    const timer = setInterval(doSave, interval);
    return () => clearInterval(timer);
  }, [userId, interval, setMediaItems, setClips, setBgMusic]);

  const triggerSave = useCallback(() => {
    if (doSaveRef.current) return doSaveRef.current();
    return Promise.resolve({ saved: false, skipReason: 'not-ready' });
  }, []);

  return { lastSaved, projectId: projectIdRef.current, triggerSave };
};

/* ========== PLAYBACK ENGINE ========== */
// During playback the <video> element is the single time authority.
// A lightweight RAF poll only checks for clip-boundary crossings.
// React state is updated at a throttled rate (~60 ms) so the timeline
// playhead moves smoothly without causing per-frame re-renders / seeks.
const UI_THROTTLE_MS = 60;

const usePlaybackEngine = (clips, totalDuration) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const rafRef = useRef(null);
  const speedRef = useRef(1);

  // Hot-path ref — updated every timeupdate, no React re-render
  const currentTimeRef = useRef(0);
  const lastUiFlushRef = useRef(0);
  const clipsRef = useRef(clips);
  clipsRef.current = clips;

  const getClipAtTime = useCallback((t) => {
    const vClips = clipsRef.current.filter(c => c.type !== "audio" && c.type !== "text").sort((a, b) => a.startTime - b.startTime);
    for (const c of vClips) { if (t >= c.startTime && t < c.startTime + c.duration) return c; }
    // Edge case: playhead exactly at end of last clip (floating-point tolerance)
    const last = vClips[vClips.length - 1];
    if (last && Math.abs(t - (last.startTime + last.duration)) < 0.05) return last;
    return null;
  }, []);

  const currentClip = useMemo(() => getClipAtTime(currentTime), [getClipAtTime, currentTime]);
  // clipOffset includes trimStart so the Player seeks to the correct position in the source file
  const clipOffset = useMemo(() => {
    if (!currentClip) return 0;
    const relativeOffset = Math.max(0, currentTime - currentClip.startTime);
    return relativeOffset + (currentClip.trimStart || 0);
  }, [currentClip, currentTime]);

  // Compute the next clip for preloading during playback
  const nextClip = useMemo(() => {
    if (!currentClip) return null;
    const sorted = clips.filter(c => c.type !== "audio").sort((a, b) => a.startTime - b.startTime);
    const idx = sorted.findIndex(c => c.id === currentClip.id);
    return idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;
  }, [currentClip, clips]);

  // Flush currentTimeRef to React state at a throttled rate
  const flushTimeToState = useCallback(() => {
    const now = performance.now();
    if (now - lastUiFlushRef.current >= UI_THROTTLE_MS) {
      lastUiFlushRef.current = now;
      setCurrentTime(currentTimeRef.current);
    }
  }, []);

  // Called by the Player's onTimeUpdate — video element is the clock during playback
  const onVideoTime = useCallback((timelineTime) => {
    if (timelineTime >= totalDuration) {
      currentTimeRef.current = totalDuration;
      setCurrentTime(totalDuration);
      setIsPlaying(false);
      return;
    }
    currentTimeRef.current = timelineTime;
    flushTimeToState();
  }, [totalDuration, flushTimeToState]);

  // RAF poll: only checks clip boundaries during playback (no time incrementing)
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Flush final time when playback stops
      setCurrentTime(currentTimeRef.current);
      return;
    }
    const poll = () => {
      // Check if we've crossed the end of the timeline
      if (currentTimeRef.current >= totalDuration) {
        setIsPlaying(false);
        setCurrentTime(totalDuration);
        return;
      }
      rafRef.current = requestAnimationFrame(poll);
    };
    rafRef.current = requestAnimationFrame(poll);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying, totalDuration]);

  const seek = useCallback((t) => {
    const clamped = Math.max(0, Math.min(totalDuration, t));
    currentTimeRef.current = clamped;
    setCurrentTime(clamped);
  }, [totalDuration]);
  const togglePlay = useCallback(() => setIsPlaying(p => !p), []);
  const stop = useCallback(() => { setIsPlaying(false); currentTimeRef.current = 0; setCurrentTime(0); }, []);
  const setSpeed = useCallback((s) => { speedRef.current = s; }, []);

  return {
    currentTime, currentClip, clipOffset, nextClip,
    isPlaying, seek, togglePlay, stop, setIsPlaying, setSpeed, setCurrentTime,
    currentTimeRef, speedRef, onVideoTime,
  };
};

/* ========== MAIN VIDEO EDITOR ========== */
const VideoEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Project state — initialise from URL query param so reloads can restore
  const [projectId, setProjectId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('project') || null;
  });
  const [projectName, setProjectName] = useState("Untitled Project");
  const [projectResolution, setProjectResolution] = useState("1080p");
  const hasRestoredRef = useRef(false);
  // Flips to true only after restoreProject() confirms what Supabase holds for
  // this projectId. Guards autosave from clobbering a populated row with the
  // still-empty initial React state during the restore window.
  const isRestoreCompleteRef = useRef(false);

  // Keep URL in sync with projectId so page reloads can restore the project
  useEffect(() => {
    const url = new URL(window.location);
    if (projectId) {
      url.searchParams.set('project', projectId);
    } else {
      url.searchParams.delete('project');
    }
    if (url.toString() !== window.location.href) {
      window.history.replaceState(window.history.state, '', url);
    }
  }, [projectId]);

  // UI state
  const [activeToolbar, setActiveToolbar] = useState("media");
  const [rightTab, setRightTab] = useState("video");
  const [rightSubTab, setRightSubTab] = useState("basic");
  const [mediaTab, setMediaTab] = useState("local");
  const [editorLayout, setEditorLayout] = useState("default");
  const isMobile = useMobile();
  const isLandscape = useOrientation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // AI chat panel state
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiSlowHint, setAiSlowHint] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const aiUndoStackRef = useRef([]);
  const aiRateLimitRef = useRef([]); // timestamps of recent prompts for rate limiting

  // Resizable panel sizes
  const [timelineHeight, setTimelineHeight] = useState(null); // null = use default
  const [mediaPanelWidth, setMediaPanelWidth] = useState(null);
  const [inspectorWidth, setInspectorWidth] = useState(null);
  const [viewportW, setViewportW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));

  // Layout presets: 'wide-timeline' was previously a no-op (same as default).
  useEffect(() => {
    if (editorLayout === 'wide-timeline') {
      const maxTl = window.innerHeight - 296;
      const target = Math.max(320, Math.floor(window.innerHeight * 0.46));
      setTimelineHeight(Math.max(120, Math.min(target, maxTl)));
    } else if (editorLayout === 'default' || editorLayout === 'compact') {
      setTimelineHeight(null);
    }
  }, [editorLayout]);

  const maxMediaCap = useMemo(() => maxMediaPanelCap(viewportW), [viewportW]);
  const maxInspectorCap = useMemo(() => maxInspectorPanelCap(viewportW), [viewportW]);
  const effectiveMediaW = useMemo(
    () => Math.min(mediaPanelWidth ?? DEFAULT_MEDIA_W, maxMediaCap),
    [mediaPanelWidth, maxMediaCap]
  );
  const effectiveInspectorW = useMemo(
    () => Math.min(inspectorWidth ?? DEFAULT_INSPECTOR_W, maxInspectorCap),
    [inspectorWidth, maxInspectorCap]
  );

  const clampTlH = useCallback((h) => {
    // Reserve space: 42 TopBar + 46 Toolbar + 8 resize handle + 200 min player
    const maxTl = window.innerHeight - 296;
    const clamped = Math.max(120, Math.min(h, maxTl));
    setTimelineHeight(clamped);
  }, []);
  const clampMpW = useCallback((w) => {
    const vw = window.innerWidth;
    const cap = maxMediaPanelCap(vw);
    // Ensure preview keeps at least MIN_PREVIEW_W (account for inspector + resize handles)
    const otherPanel = inspectorWidth ?? DEFAULT_INSPECTOR_W;
    const maxForPreview = vw - MIN_PREVIEW_W - otherPanel - 24; // 24 = resize handles + buffer
    setMediaPanelWidth(Math.max(200, Math.min(w, cap, maxForPreview)));
  }, [inspectorWidth]);
  const clampIpW = useCallback((w) => {
    const vw = window.innerWidth;
    const cap = maxInspectorPanelCap(vw);
    const otherPanel = mediaPanelWidth ?? DEFAULT_MEDIA_W;
    const maxForPreview = vw - MIN_PREVIEW_W - otherPanel - 24;
    setInspectorWidth(Math.max(220, Math.min(w, cap, maxForPreview)));
  }, [mediaPanelWidth]);

  useEffect(() => {
    let timeout;
    const handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const vw = window.innerWidth;
        setViewportW(vw);
        const mCap = maxMediaPanelCap(vw);
        const iCap = maxInspectorPanelCap(vw);
        setMediaPanelWidth((prev) => (prev != null ? Math.min(prev, mCap) : null));
        setInspectorWidth((prev) => (prev != null ? Math.min(prev, iCap) : null));
      }, 150);
    };
    window.addEventListener('resize', handler);
    handler();
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handler);
    };
  }, []);

  const onTimelineDrag = useResizeDrag('y', clampTlH);
  const onMediaDrag = useResizeDrag('x', clampMpW);
  const onInspectorDrag = useResizeDrag('x', clampIpW, undefined, true);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [forceExport, setForceExport] = useState(0);
  const [showWalkthrough, setShowWalkthrough] = useState(() => !localStorage.getItem('clipcut_onboarded'));

  // Media library
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  // Timeline (with undo/redo)
  const [tlState, tlDispatch] = useReducer(timelineReducer, { clips: [], past: [], future: [] });
  const clips = tlState.clips;
  const canUndo = tlState.past.length > 0;
  const canRedo = tlState.future.length > 0;
  const [selectedClipId, setSelectedClipId] = useState(null);
  /** CapCut-style timeline markers (bookmarks) — persisted in project_data.timelineMarkers */
  const [timelineMarkers, setTimelineMarkers] = useState([]);

  // Auto-open inspector bottom sheet when a clip is selected on mobile
  useEffect(() => {
    if (isMobile && selectedClipId) {
      setMobileActiveTab('inspector');
      setMobileDrawerOpen(true);
    }
  }, [isMobile, selectedClipId]);

  const totalDuration = useMemo(() => {
    if (clips.length === 0) return 30;
    return Math.max(30, Math.max(...clips.map(c => c.startTime + c.duration)) + 10);
  }, [clips]);

  // Playback
  const pb = usePlaybackEngine(clips, totalDuration);

  // Background music
  const [bgMusic, setBgMusic] = useState(null); // { file, name, blobUrl, volume }

  // Processing
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportQueue, setExportQueue] = useState([]); // [{resolution, id}]
  const exportAbortRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [loadSub, setLoadSub] = useState("");
  const convertingBlobUrls = useRef(new Set());

  // Toasts
  const [toast, setToast] = useState(null);
  const notify = useCallback((type, message) => setToast({ type, message }), []);

  // FFmpeg
  const ffmpeg = useFFmpeg();

  // Derived (before setClips — clips from timeline state only)
  const selectedClip = useMemo(() => clips.find(c => c.id === selectedClipId), [clips, selectedClipId]);
  const previewSrc = useMemo(() => {
    if (pb.currentClip?.blobUrl) return pb.currentClip.blobUrl;
    if (selectedMediaId) {
      const found = mediaItems.find(m => m.id === selectedMediaId)?.blobUrl;
      if (found) return found;
    }
    // Fallback: show first video clip that has a playable blobUrl
    const first = clips.find(c => c.type !== 'audio' && c.type !== 'text' && c.blobUrl);
    return first?.blobUrl || null;
  }, [pb.currentClip, selectedMediaId, mediaItems, clips]);
  const hasMissingPlayableMedia = useMemo(() => hasUnavailableMediaClips(clips), [clips]);

  // Text overlays visible at current playhead time (manual text + auto captions: both use type "text"; captions also set isCaption; stickers use type "sticker" with the emoji in clip.text)
  const textOverlays = useMemo(() => {
    const allCaptions = clips.filter(c => c.isCaption);
    const allText = clips.filter(c => c.type === 'text' && !c.isCaption);
    const result = clips.filter(c =>
      (c.type === 'text' || c.type === 'sticker' || c.isCaption) &&
      c.type !== 'audio' &&
      pb.currentTime >= c.startTime &&
      pb.currentTime < c.startTime + c.duration
    );
    // DEBUG: full diagnostic for caption rendering
    if (allCaptions.length > 0 && result.filter(c => c.isCaption).length === 0) {
      const sample = allCaptions.slice(0, 3);
      console.log(
        '[DEBUG TextOverlays] currentTime:', pb.currentTime.toFixed(3),
        '\n  total clips:', clips.length,
        '| captions:', allCaptions.length,
        '| manual text:', allText.length,
        '| visible now:', result.length,
        '\n  first 3 captions:',
        sample.map(c => ({
          id: c.id, type: c.type, isCaption: c.isCaption,
          text: (c.text || '').slice(0, 30),
          startTime: c.startTime, duration: c.duration,
          track: c.track,
          range: `${c.startTime?.toFixed(2)}-${(c.startTime + c.duration)?.toFixed(2)}`,
        }))
      );
    }
    return result;
  }, [clips, pb.currentTime]);

  // ---- Clip mutations (push to undo stack) ----
  // Use a ref to always read the latest clips inside the callback,
  // so the callback identity is stable and doesn't cascade re-renders.
  const clipsSnapshotRef = useRef(tlState.clips);
  clipsSnapshotRef.current = tlState.clips;
  const setClips = useCallback((fn) => {
    const current = clipsSnapshotRef.current;
    const next = typeof fn === "function" ? fn(current) : fn;
    tlDispatch({ type: "SET_CLIPS", clips: next });
  }, []);

  // Auto-save with cloud storage (after setClips — uploads need setters)
  const { lastSaved, projectId: savedProjectId, triggerSave } = useAutoSave(
    projectId,
    projectName,
    clips,
    mediaItems,
    user?.id,
    totalDuration,
    projectResolution,
    setMediaItems,
    setClips,
    bgMusic,
    setBgMusic,
    timelineMarkers,
    isRestoreCompleteRef
  );

  // Sync the server-generated project ID back to React state.
  // This fires when the autosave hook creates a new Supabase row (draft → UUID).
  useEffect(() => {
    if (savedProjectId && savedProjectId !== projectId) {
      setProjectId(savedProjectId);
    }
  }, [savedProjectId, projectId]);

  const undo = useCallback(() => tlDispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => tlDispatch({ type: "REDO" }), []);

  const updateClip = useCallback((id, u) => setClips(p => p.map(c => c.id === id ? { ...c, ...u } : c)), [setClips]);
  const updateAllCaptions = useCallback((updates) => setClips(p => p.map(c => c.isCaption ? { ...c, ...updates } : c)), [setClips]);
  const deleteClip = useCallback((id) => { setClips(p => p.filter(c => c.id !== id)); if (selectedClipId === id) setSelectedClipId(null); }, [setClips, selectedClipId]);

  const addToTimeline = useCallback((mi, startTime = null) => {
    let start = startTime;
    if (start === null) {
      const same = clipsSnapshotRef.current.filter(c => c.type === mi.type);
      const last = same.length > 0 ? same.reduce((a, b) => a.startTime + a.duration > b.startTime + b.duration ? a : b) : null;
      start = last ? last.startTime + last.duration : 0;
    }
    const clip = {
      ...DEFAULT_CLIP_PROPERTIES,
      id: genId(), mediaId: mi.id, name: mi.name, type: mi.type,
      startTime: start, duration: mi.duration || DEFAULT_CLIP_DURATION,
      file: mi.file, blobUrl: mi.blobUrl, thumbnail: mi.thumbnail,
    };
    setClips(p => [...p, clip]);
    setSelectedClipId(clip.id);
    // Persist dashboard thumbnail soon after the first clip exists (autosave interval is 30s).
    setTimeout(() => triggerSave(), 100);
  }, [setClips, triggerSave]);

  // ---- Import ----
  const importMedia = useCallback(async (files) => {
    setIsImporting(true);
    try {
      // Ensure a projectId exists for IndexedDB keying
      let pid = projectId;
      if (!pid) {
        pid = `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setProjectId(pid);
      }

      // Auto-name the project from the first imported video filename
      if (files.length > 0 && projectName === 'Untitled Project') {
        const firstVideo = files.find(f => f.type.startsWith('video/')) || files[0];
        const baseName = firstVideo.name.replace(/\.[^.]+$/, '').trim();
        if (baseName) setProjectName(baseName);
      }

      // No FFmpeg init needed — browser-native APIs handle import
      let n = 0;
      for (const file of files) {
        setLoadMsg(`Importing ${file.name}...`);
        setLoadSub(`${++n} of ${files.length}`);
        const id = genId();
        const blobUrl = URL.createObjectURL(file);

        // Persist raw file bytes to IndexedDB immediately so they survive page reloads
        storeMedia(pid, id, file, { name: file.name, type: file.type }).catch((e) =>
          console.warn('[import] IndexedDB store failed:', file.name, e)
        );
        const isAudio = file.type.startsWith("audio/");

        setMediaItems(p => [...p, {
          id, name: file.name, file, blobUrl,
          thumbnail: null, duration: 0, width: 0, height: 0,
          type: isAudio ? "audio" : "video",
          isProcessing: true,
        }]);

        try {
          // FAST: Browser-native metadata extraction (~10ms vs ~3s)
          const info = await getVideoInfoFast(file);
          setMediaItems(p => p.map(m =>
            m.id === id
              ? { ...m, duration: info.duration, width: info.width, height: info.height, isProcessing: false }
              : m
          ));

          // FAST: Browser-native thumbnail generation (~100ms vs ~3s)
          if (!isAudio) {
            try {
              const videoId = `${file.name}_${file.size}_${file.lastModified}`;
              const cached = await getCachedThumbnail(videoId, 0);
              const blob = cached || await generateThumbnailFast(file, 0);
              if (!cached) cacheThumbnail(videoId, 0, blob).catch(() => {});
              const thumbUrl = URL.createObjectURL(blob);
              setMediaItems(p => p.map(m =>
                m.id === id ? { ...m, thumbnail: thumbUrl } : m
              ));
            } catch (e) {
              console.warn("Thumbnail generation failed:", e);
            }
          }
        } catch (e) {
          // Browser can't play this format — try auto-converting to MP4 via FFmpeg
          const canConvert = !isAudio && /\.(mov|avi|mkv|flv|wmv)$/i.test(file.name);
          if (canConvert) {
            try {
              setLoadMsg(`Converting ${file.name} to MP4...`);
              if (!ffmpeg.isReady) await ffmpeg.initialize();
              const converted = await ffmpeg.convertFormat(file, 'mp4');
              const convertedFile = new File([converted], file.name.replace(/\.\w+$/, '.mp4'), { type: 'video/mp4' });
              const newBlobUrl = URL.createObjectURL(convertedFile);
              URL.revokeObjectURL(blobUrl);
              const info = await getVideoInfoFast(convertedFile);
              setMediaItems(p => p.map(m =>
                m.id === id ? { ...m, file: convertedFile, blobUrl: newBlobUrl, duration: info.duration, width: info.width, height: info.height, isProcessing: false } : m
              ));
              const thumbBlob = await generateThumbnailFast(convertedFile, 0).catch(() => null);
              if (thumbBlob) {
                const thumbUrl = URL.createObjectURL(thumbBlob);
                setMediaItems(p => p.map(m => m.id === id ? { ...m, thumbnail: thumbUrl } : m));
              }
              notify("info", `Converted ${file.name} to MP4`);
            } catch (convErr) {
              console.error("Auto-convert failed:", convErr);
              setMediaItems(p => p.map(m => m.id === id ? { ...m, isProcessing: false } : m));
            }
          } else {
            console.error("Error processing:", e);
            setMediaItems(p => p.map(m =>
              m.id === id ? { ...m, isProcessing: false } : m
            ));
          }
        }
      }
      notify("success", `Imported ${files.length} file${files.length > 1 ? "s" : ""}`);
    } catch (e) { notify("error", `Import failed: ${e.message}`); }
    finally { setIsImporting(false); setLoadMsg(""); setLoadSub(""); }
  }, [notify, projectId, projectName]);

  // ---- Auto-analyze imported video for AI suggestions ----
  const lastAnalyzedKeyRef = useRef(null);
  useEffect(() => {
    const videoClip = clips.find(c =>
      c.type !== 'audio' && c.type !== 'text' && c.type !== 'sticker' && !c.isCaption && (c.file || c.blobUrl || c.mediaId)
    );
    if (!videoClip) {
      setAiSuggestions([]);
      lastAnalyzedKeyRef.current = null;
      return;
    }

    const media = videoClip.mediaId ? mediaItems.find(m => m.id === videoClip.mediaId) : null;
    const file = videoClip.file || media?.file || null;
    const blobUrl = videoClip.blobUrl || media?.blobUrl || null;
    if (!file && !blobUrl) {
      setAiSuggestions([]);
      return;
    }

    const trimStart = videoClip.trimStart || 0;
    const trimEnd = videoClip.trimEnd || 0;
    const duration = videoClip.duration || 0;
    const hasCaptions = clips.some(c => c.isCaption);
    const fileSig = file ? `${file.size}:${file.lastModified}` : String(blobUrl || '');
    const analysisKey = `${videoClip.id}|${videoClip.mediaId || ''}|${trimStart}|${trimEnd}|${duration}|${hasCaptions}|${fileSig}`;

    if (analysisKey === lastAnalyzedKeyRef.current) return;
    lastAnalyzedKeyRef.current = analysisKey;

    const clipForAnalysis = { ...videoClip, file: file || undefined, blobUrl: blobUrl || undefined };

    import('../../services/videoAnalyzer').then(({ analyzeVideo }) => {
      analyzeVideo(clipForAnalysis, { hasCaptions }).then(suggestions => {
        setAiSuggestions(suggestions.length > 0 ? suggestions : []);
      }).catch(() => {
        setAiSuggestions([]);
      });
    });
  }, [clips, mediaItems]);

  // ---- Background music ----
  const importBgMusic = useCallback((file) => {
    const result = validateFile(file, { allowedCategories: ['audio'], category: 'audio' });
    if (!result.valid) {
      notify('warning', result.error || 'Please select an audio file');
      return;
    }
    // Revoke previous bg music blob
    if (bgMusic?.blobUrl) URL.revokeObjectURL(bgMusic.blobUrl);
    const blobUrl = URL.createObjectURL(file);
    const bgMediaId = `bgm-${Date.now()}`;
    setBgMusic({ file, name: file.name, blobUrl, volume: 0.3, mediaId: bgMediaId });
    // Persist bgMusic to IndexedDB so it survives page reloads
    const pid = projectId || `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    storeMedia(pid, bgMediaId, file, { name: file.name, type: file.type }).catch((e) =>
      console.warn('[bgMusic] IndexedDB store failed:', e)
    );
    notify('success', `Background music: ${file.name}`);
  }, [bgMusic, notify, projectId]);

  const updateBgMusicVolume = useCallback((volume) => {
    setBgMusic(prev => prev ? { ...prev, volume } : null);
  }, []);

  const removeBgMusic = useCallback(() => {
    if (bgMusic?.blobUrl) URL.revokeObjectURL(bgMusic.blobUrl);
    setBgMusic(null);
    notify('info', 'Background music removed');
  }, [bgMusic, notify]);

  // ---- Remove media ----
  const removeMedia = useCallback((id) => {
    setMediaItems(p => { const item = p.find(m => m.id === id); if (item) requestAnimationFrame(() => { if (item.blobUrl) URL.revokeObjectURL(item.blobUrl); if (item.thumbnail) URL.revokeObjectURL(item.thumbnail); }); return p.filter(m => m.id !== id); });
    // Revoke blob URLs from clips that reference this media before removing them
    setClips(p => {
      p.filter(c => c.mediaId === id).forEach(c => {
        if (c.blobUrl) requestAnimationFrame(() => URL.revokeObjectURL(c.blobUrl));
      });
      return p.filter(c => c.mediaId !== id);
    });
    if (selectedMediaId === id) setSelectedMediaId(null);
  }, [selectedMediaId, setClips]);

  // ---- Split (non-destructive — instant, no FFmpeg) ----
  const splitClip = useCallback((clipId, splitTime) => {
    const clip = clipsSnapshotRef.current.find(c => c.id === clipId);
    if (!clip) return;

    // Create two clips referencing the same source file.
    // trimStart tracks where each clip starts within the source.
    const c1 = {
      ...clip,
      id: genId(),
      name: `${clip.name} (1)`,
      duration: splitTime,
    };
    const c2 = {
      ...clip,
      id: genId(),
      name: `${clip.name} (2)`,
      startTime: clip.startTime + splitTime,
      duration: clip.duration - splitTime,
      trimStart: (clip.trimStart || 0) + splitTime,
    };

    setClips(p => {
      const i = p.findIndex(c => c.id === clipId);
      const n = [...p];
      n.splice(i, 1, c1, c2);
      return n;
    });
    setSelectedClipId(c1.id);
    notify("success", "Clip split");
  }, [setClips, notify]);

  // ---- Add clip directly (used by paste/duplicate) ----
  const addClip = useCallback((clipData) => {
    setClips(p => [...p, clipData]);
    setSelectedClipId(clipData.id);
  }, [setClips]);

  // ---- Ripple delete (delete clip + shift later clips left) ----
  const rippleDelete = useCallback((newClips) => {
    setClips(() => newClips);
    setSelectedClipId(null);
    notify("success", "Clip deleted (ripple)");
  }, [setClips, notify]);

  // ---- Trim ----
  const trimClip = useCallback(async (clipId, start, dur) => {
    const clip = clipsSnapshotRef.current.find(c => c.id === clipId);
    if (!clip?.file) return;
    setIsProcessing(true); setLoadMsg("Trimming...");
    try {
      const trimmed = await ffmpeg.trimVideo(clip.file, start, dur);
      const url = URL.createObjectURL(trimmed);
      setClips(p => p.map(c => c.id === clipId ? { ...c, file: trimmed, blobUrl: url, duration: dur } : c));
      if (clip.blobUrl) requestAnimationFrame(() => URL.revokeObjectURL(clip.blobUrl));
      notify("success", "Clip trimmed");
    } catch (e) { notify("error", getUserFriendlyMessage(e, 'ffmpeg')); }
    finally { setIsProcessing(false); setLoadMsg(""); ffmpeg.resetProgress(); }
  }, [ffmpeg, setClips, notify]);

  // ---- Apply non-destructive clip effects via FFmpeg ----
  const applyClipEffects = useCallback(async (clip, index, total) => {
    let file = clip.file;
    const hasSpeedChange = clip.speed && clip.speed !== 1.0;
    const hasBrightnessContrast = clip.brightness || clip.contrast;
    const hasSaturation = clip.saturation !== undefined && clip.saturation !== 1.0;
    const hasRotation = clip.rotation && [90, 180, 270, -90].includes(clip.rotation);
    const hasVolume = (clip.volume !== undefined && clip.volume !== 1.0) || clip.isMuted;
    const hasFade = (clip.fadeIn && clip.fadeIn > 0) || (clip.fadeOut && clip.fadeOut > 0);
    const hasFilter = clip.filterName;
    const hasTrim = clip.trimStart > 0 || clip.trimEnd > 0;
    const hasEffects = clip.effects?.some(e => e.enabled);
    const hasText = clip.text && clip.text.trim().length > 0;

    const noEffects = !hasSpeedChange && !hasBrightnessContrast && !hasSaturation && !hasRotation && !hasVolume && !hasFade && !hasFilter && !hasTrim && !hasEffects && !hasText;
    if (noEffects) return file;

    const label = `clip ${index + 1}/${total}`;

    if (hasTrim) {
      setLoadMsg(`Trimming ${label}...`);
      file = await ffmpeg.trimVideo(file, clip.trimStart, clip.duration);
    }
    if (hasSpeedChange) {
      setLoadMsg(`Adjusting speed for ${label}...`);
      file = await ffmpeg.changeSpeed(file, clip.speed);
    }
    if (hasBrightnessContrast) {
      setLoadMsg(`Adjusting colors for ${label}...`);
      file = await ffmpeg.adjustBrightnessContrast(file, clip.brightness || 0, clip.contrast || 0);
    }
    if (hasSaturation) {
      setLoadMsg(`Adjusting saturation for ${label}...`);
      file = await ffmpeg.adjustSaturation(file, clip.saturation);
    }
    if (hasRotation) {
      setLoadMsg(`Rotating ${label}...`);
      file = await ffmpeg.rotateVideo(file, clip.rotation);
    }
    if (hasVolume) {
      setLoadMsg(`Adjusting audio for ${label}...`);
      file = await ffmpeg.adjustVolume(file, clip.isMuted ? 0 : clip.volume);
    }
    if (hasFade) {
      setLoadMsg(`Adding fade to ${label}...`);
      file = await ffmpeg.addFade(file, clip.fadeIn || 0, clip.fadeOut || 0, clip.duration);
    }
    if (hasFilter) {
      const preset = FILTER_PRESETS.find(f => f.name === clip.filterName);
      if (preset?.filter) {
        setLoadMsg(`Applying ${clip.filterName} filter to ${label}...`);
        file = await ffmpeg.applyFilter(file, preset.filter);
      }
    }
    if (hasEffects) {
      for (const effect of clip.effects.filter(e => e.enabled)) {
        if (effect.type === 'blur' && effect.params?.radius) {
          setLoadMsg(`Applying ${effect.name} to ${label}...`);
          file = await ffmpeg.applyBlur(file, effect.params.radius);
        } else if (effect.type === 'sharpen' && effect.params?.strength) {
          setLoadMsg(`Applying ${effect.name} to ${label}...`);
          file = await ffmpeg.applySharpen(file, effect.params.strength);
        }
      }
    }
    if (hasText) {
      setLoadMsg(`Adding text overlay to ${label}...`);
      file = await ffmpeg.addTextOverlay(file, clip.text, {
        position: clip.textPosition || 'bottom-center',
        fontSize: clip.textSize || 48,
        fontColor: clip.textColor || 'white',
        backgroundColor: clip.textBgColor || null,
        startTime: clip.textStartTime || 0,
        duration: clip.textDuration || 0,
      });
    }

    return file;
  }, [ffmpeg]);

  // ---- TopBar menu actions ----
  const handleNewProject = useCallback(() => {
    if (clips.length > 0 && !window.confirm('Start a new project? Unsaved changes will be lost.')) return;
    setClips([]);
    setProjectName('Untitled Project');
    setProjectId(null);
    hasRestoredRef.current = false;
    isRestoreCompleteRef.current = false;
    setMediaItems([]);
    setSelectedClipId(null);
    setSelectedMediaId(null);
    setTimelineMarkers([]);
    notify('info', 'New project created');
  }, [clips.length, notify, setClips]);

  const handleSave = useCallback(async () => {
    const result = await triggerSave();
    if (result?.saved) {
      notify('success', 'Project saved');
      return;
    }
    switch (result?.skipReason) {
      case 'restore-in-progress':
        notify('info', 'Project still loading — try again in a moment');
        break;
      case 'empty-without-session-edit':
        notify('info', 'Nothing to save yet — add media or clips first');
        break;
      case 'in-progress':
        notify('info', 'Save already in progress');
        break;
      case 'backoff':
        notify('warning', 'Previous saves failed — retrying shortly');
        break;
      case 'error':
        notify('error', `Save failed${result?.error?.message ? ': ' + result.error.message : ''}`);
        break;
      default:
        notify('info', 'Save skipped');
    }
  }, [triggerSave, notify]);

  const handleSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  // ---- AI Edit handlers ----
  const handleAiSendMessage = useCallback(async (text) => {
    // Rate limit: max 10 prompts per minute
    const now = Date.now();
    aiRateLimitRef.current = aiRateLimitRef.current.filter(t => now - t < 60000);
    if (aiRateLimitRef.current.length >= 10) {
      setAiMessages(prev => [...prev, { id: `e-${now}`, role: 'assistant', text: 'Rate limit reached. Please wait a moment before sending more prompts.' }]);
      return;
    }
    aiRateLimitRef.current.push(now);

    const userMsg = { id: `u-${now}`, role: 'user', text };
    setAiMessages(prev => [...prev, userMsg]);

    // Guard: block edit commands when no media is on the timeline
    const hasMediaClips = clips.some(c => c.type === 'video' || c.type === 'audio' || c.type === 'image');
    if (!hasMediaClips) {
      const { parseIntentLocally } = await import('../../services/aiEditService');
      const localActions = parseIntentLocally(text);
      if (localActions) {
        // Recognised edit command but nothing to edit — show helpful message with action
        const openMedia = () => {
          if (isMobile) { setMobileActiveTab('media'); setMobileDrawerOpen(true); }
        };
        setAiMessages(prev => [...prev, {
          id: `g-${now}`, role: 'assistant',
          text: 'Please import a video first to use AI editing.',
          openMedia: isMobile ? openMedia : undefined,
        }]);
        return;
      }
    }

    setAiThinking(true);
    setAiSlowHint(false);

    try {
      const { executeAiEdit } = await import('../../services/aiEditService');

      // Build richer context from current editor state
      const context = {
        duration: totalDuration,
        hasAudio: clips.some(c => c.type === 'audio' || (c.type === 'video' && c.file)),
        clipCount: clips.length,
        currentTime: pb.currentTime,
        hasCaptions: clips.some(c => c.isCaption),
        filters: [...new Set(clips.filter(c => c.filterName).map(c => c.filterName))].join(',') || undefined,
        tracks: clips.reduce((max, c) => Math.max(max, (c.track || 0) + 1), 0),
      };

      // Build conversation history for multi-turn context (last 10 messages)
      const history = aiMessages.slice(-10).map(m => ({
        role: m.role,
        content: m.role === 'assistant'
          ? (m.actions?.length ? `[Actions: ${m.actions.join(', ')}] ${m.text}` : m.text)
          : m.text,
      }));

      // Snapshot clips for undo before AI modifies anything
      const snapshot = JSON.parse(JSON.stringify(clips.map(c => {
        const { file, ...rest } = c;
        return rest;
      })));
      const filesMap = new Map(clips.filter(c => c.file).map(c => [c.id, c.file]));

      const result = await executeAiEdit(text, context, {
        clips, setClips, updateClip, addClip: (clip) => {
          setClips(prev => [...prev, { ...DEFAULT_CLIP_PROPERTIES, id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...clip }]);
        },
        // Live getter — chained actions (e.g. auto-edit) need to read post-setClips state
        // so a later step doesn't clobber clips added by an earlier one. clipsSnapshotRef
        // is the convention in this file (synchronously assigned during render — see
        // splitClip, addToTimeline, trimClip). executeAiEdit also wraps setClips with
        // an in-tick mirror so reads between an action's setClips and the next render
        // don't lag behind React's commit.
        getClips: () => clipsSnapshotRef.current,
        splitClip, selectedClipId, mediaItems,
      }, { history, onSlowResponse: () => setAiSlowHint(true) });

      // Conversational reply — no actions executed, no undo needed
      if (result.isChat) {
        setAiMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: result.summary }]);
      } else {
        // Store undo snapshot
        const undoId = `ai-${Date.now()}`;
        aiUndoStackRef.current.push({ id: undoId, snapshot, filesMap });

        const assistantMsg = {
          id: `a-${Date.now()}`, role: 'assistant',
          text: result.summary || 'Done!',
          actions: result.actionLabels || [],
          canUndo: true,
          onUndo: () => {
            const entry = aiUndoStackRef.current.find(e => e.id === undoId);
            if (entry) {
              const restored = entry.snapshot.map(c => {
                const file = entry.filesMap.get(c.id);
                return file ? { ...c, file } : c;
              });
              setClips(restored);
              aiUndoStackRef.current = aiUndoStackRef.current.filter(e => e.id !== undoId);
              setAiMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, canUndo: false } : m));
              notify('info', 'AI edit undone');
            }
          },
        };
        setAiMessages(prev => [...prev, assistantMsg]);
      }
    } catch (err) {
      const errMsg = { id: `e-${Date.now()}`, role: 'assistant', text: `Error: ${err.message || 'Something went wrong. Please try again.'}` };
      setAiMessages(prev => [...prev, errMsg]);
    } finally {
      setAiThinking(false);
      setAiSlowHint(false);
    }
  }, [clips, setClips, updateClip, splitClip, selectedClipId, mediaItems, totalDuration, pb.currentTime, aiMessages]);

  // Apply a suggestion card (same as sending a prompt but with known action)
  const handleAiSuggestion = useCallback((suggestion) => {
    handleAiSendMessage(suggestion.title);
  }, [handleAiSendMessage]);

  const toggleAiPanel = useCallback(() => {
    setAiPanelOpen(prev => !prev);
    if (isMobile) {
      setMobileActiveTab('ai');
      setMobileDrawerOpen(prev => !prev);
    }
  }, [isMobile]);

  // ---- Download helper ----
  const downloadBlob = useCallback((blob, filename, format) => {
    const ext = format === 'mp4' ? 'mp4' : 'webm';
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Slugify + fallback: empty `download` attribute makes browsers use the blob
    // URL's UUID as the filename, which is the exact UUID-filename bug we hit.
    a.download = `${slugifyFilename(filename || projectName)}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, [projectName]);

  // ---- Cancel export ----
  const cancelExport = useCallback(() => {
    if (exportAbortRef.current) {
      exportAbortRef.current.abort();
      exportAbortRef.current = null;
    }
  }, []);

  // ---- Export via local canvas render + optional server MP4 transcode ----
  const handleExport = useCallback(async (res, settings = {}) => {
    if (clips.length === 0) {
      notify("warning", "No clips to export. Add media to the timeline first.");
      return;
    }

    const vClips = clips.filter(c => c.type !== "audio" && c.file).sort((a, b) => a.startTime - b.startTime);
    if (vClips.length === 0) {
      notify("warning", "No video clips with valid files. Make sure your clips are properly loaded.");
      return;
    }

    // Queue if already exporting
    if (isExporting) {
      setExportQueue(q => [...q, res]);
      notify("info", `Queued export at ${res} (${exportQueue.length + 1} in queue)`);
      return;
    }

    if (pb.isPlaying) pb.setIsPlaying(false);

    setIsExporting(true);
    setExportProgress(0);
    setLoadMsg("Preparing export...");
    setLoadSub("");

    // Resolve resolution for platform presets
    let exportResolution = res;
    if (res.startsWith('preset:')) {
      const presetKey = res.slice(7);
      const preset = EXPORT_PRESETS[presetKey];
      if (preset) {
        // Find matching resolution or default to 1080p
        if (preset.width <= 854) exportResolution = '480p';
        else if (preset.width <= 1280) exportResolution = '720p';
        else exportResolution = '1080p';
      }
    }

    const abort = new AbortController();
    exportAbortRef.current = abort;

    try {
      const requestedFormat = String(settings.format || 'webm').toLowerCase() === 'mp4' ? 'mp4' : 'webm';
      const exportClipsWithText = [...vClips, ...clips.filter(c => c.type === 'text' || c.type === 'sticker')];
      const computedDuration = Math.max(...vClips.map(c => c.startTime + c.duration));

      const localRender = await canvasExport({
        clips: exportClipsWithText,
        bgMusic,
        totalDuration: computedDuration,
        resolution: exportResolution,
        settings: { ...settings, format: 'webm' },
        onProgress: ({ percent, elapsed, eta, label }) => {
          // For MP4 exports, reserve progress headroom for upload/transcode.
          const mappedPercent = requestedFormat === 'mp4'
            ? Math.min(70, Math.round(percent * 0.7))
            : percent;
          setExportProgress(mappedPercent);
          setLoadMsg(requestedFormat === 'mp4' ? 'Rendering local preview stream...' : (label || 'Exporting...'));
          setLoadSub(`${mappedPercent}%  ·  Elapsed ${elapsed}  ·  ETA ${eta}`);
        },
        abortSignal: abort.signal,
      });

      if (!localRender.blob || localRender.blob.size === 0) {
        throw new Error("Export produced an empty file.");
      }

      let finalBlob = localRender.blob;
      let finalFormat = 'webm';

      if (requestedFormat === 'mp4') {
        setLoadMsg('Checking server encoder...');
        setLoadSub('Validating MP4 export service availability...');
        const serverAvailable = await isServerExportAvailable();

        if (!serverAvailable) {
          notify("warning", "MP4 server is unavailable right now. Exported WebM locally instead.");
        } else {
          try {
            setLoadMsg('Uploading to MP4 encoder...');
            setLoadSub('Uploading render to server for fast MP4 transcode...');
            const mp4Blob = await serverExport(
              localRender.blob,
              exportResolution,
              {},
              (uploadPct) => {
                const mappedPct = Math.min(98, 70 + Math.round((uploadPct / 100) * 28));
                setExportProgress(mappedPct);
                setLoadMsg('Server encoding MP4...');
                setLoadSub(`${mappedPct}%  ·  Upload + transcode in progress`);
              },
              abort.signal
            );

            if (mp4Blob && mp4Blob.size > 0) {
              finalBlob = mp4Blob;
              finalFormat = 'mp4';
            } else {
              notify("warning", "MP4 conversion returned empty output. Downloaded WebM fallback.");
            }
          } catch (serverErr) {
            console.warn("Server MP4 export failed, using local WebM fallback:", serverErr);
            notify("warning", "MP4 export failed on server. Downloaded WebM fallback instead.");
          }
        }
      }

      downloadBlob(finalBlob, settings.filename || projectName, finalFormat);
      notify(
        "success",
        `Exported ${finalFormat.toUpperCase()} at ${exportResolution} (${(finalBlob.size / (1024 * 1024)).toFixed(1)} MB)`
      );
    } catch (e) {
      if (e.message === 'Export cancelled.') {
        notify("info", "Export cancelled.");
      } else {
        console.error("Export error:", e);
        notify("error", e.message || "Export failed. Please try again.");
      }
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setLoadMsg("");
      setLoadSub("");
      exportAbortRef.current = null;
    }
  }, [clips, projectName, pb, notify, bgMusic, downloadBlob, isExporting, exportQueue, totalDuration]);

  // ---- Process export queue ----
  useEffect(() => {
    if (!isExporting && exportQueue.length > 0) {
      const [next, ...rest] = exportQueue;
      setExportQueue(rest);
      handleExport(next);
    }
  }, [isExporting, exportQueue, handleExport]);

  // ---- Player callbacks ----
  const onSeek = useCallback((t) => {
    pb.seek(t);
  }, [pb]);

  // Declared above onTimeUpdate so the latter can call it when the video
  // element crosses the current clip's trimmed end.
  const onEnded = useCallback(() => {
    if (!pb.currentClip) { pb.setIsPlaying(false); return; }
    const vc = clips.filter(c => c.type !== "audio").sort((a, b) => a.startTime - b.startTime);
    const next = vc.find(c => c.startTime > pb.currentClip.startTime);
    next && pb.isPlaying ? pb.seek(next.startTime) : pb.setIsPlaying(false);
  }, [pb, clips]);

  const onTimeUpdate = useCallback((t) => {
    if (pb.currentClip) {
      const trimStart = pb.currentClip.trimStart || 0;
      // The video element holds the full source file. A clip says "play
      // from trimStart for `duration`", but nothing in the <video> enforces
      // that — without this check, playback runs past the clip's trimmed
      // end into source frames that aren't on the timeline. When we cross
      // the boundary, hand off to onEnded (seeks next clip or stops).
      const clipSourceEnd = trimStart + pb.currentClip.duration;
      if (pb.isPlaying && t >= clipSourceEnd - 0.01) {
        onEnded();
        return;
      }
      const timelineTime = pb.currentClip.startTime + (t - trimStart);
      if (pb.isPlaying) {
        // Video element is authoritative during playback — always accept its time
        pb.onVideoTime(timelineTime);
      } else {
        pb.setCurrentTime(timelineTime);
      }
    } else if (!pb.isPlaying) {
      pb.setCurrentTime(t);
    }
  }, [pb, onEnded]);

  // ---- Handle video format errors ----
  const handleVideoFormatError = useCallback(async (blobUrl) => {
    if (!blobUrl || !ffmpeg.isReady) return;
    
    // Prevent multiple simultaneous conversions of the same video
    if (convertingBlobUrls.current.has(blobUrl)) return;
    convertingBlobUrls.current.add(blobUrl);
    
    setIsProcessing(true);
    setLoadMsg("Converting video to web-compatible format...");
    
    try {
      // Find the media item or clip with this blobUrl
      let sourceFile = null;
      let itemId = null;
      let isClip = false;
      
      // Check media items first
      const mediaItem = mediaItems.find(m => m.blobUrl === blobUrl);
      if (mediaItem && mediaItem.file) {
        sourceFile = mediaItem.file;
        itemId = mediaItem.id;
        isClip = false;
      } else {
        // Check clips
        const clip = clips.find(c => c.blobUrl === blobUrl);
        if (clip && clip.file) {
          sourceFile = clip.file;
          itemId = clip.id;
          isClip = true;
        }
      }
      
      if (!sourceFile) {
        notify("error", "Could not find source file for conversion");
        return;
      }
      
      // Convert to web-compatible format
      const convertedBlob = await ffmpeg.convertToWebFormat(sourceFile);
      const newBlobUrl = URL.createObjectURL(convertedBlob);
      
      // Update the media item or clip
      if (isClip) {
        // Update clip
        setClips(p => p.map(c => {
          if (c.id === itemId) {
            // Revoke old blobUrl
            if (c.blobUrl) requestAnimationFrame(() => URL.revokeObjectURL(c.blobUrl));
            return { ...c, file: convertedBlob, blobUrl: newBlobUrl };
          }
          return c;
        }));
      } else {
        // Update media item
        setMediaItems(p => p.map(m => {
          if (m.id === itemId) {
            // Revoke old blobUrl
            if (m.blobUrl) requestAnimationFrame(() => URL.revokeObjectURL(m.blobUrl));
            return { ...m, file: convertedBlob, blobUrl: newBlobUrl };
          }
          return m;
        }));
        
        // Also update any clips that reference this media item
        setClips(p => p.map(c => {
          if (c.mediaId === itemId) {
            if (c.blobUrl) requestAnimationFrame(() => URL.revokeObjectURL(c.blobUrl));
            return { ...c, file: convertedBlob, blobUrl: newBlobUrl };
          }
          return c;
        }));
      }
      
      notify("success", "Video converted successfully");
    } catch (e) {
      notify("error", getUserFriendlyMessage(e, 'ffmpeg'));
    } finally {
      convertingBlobUrls.current.delete(blobUrl);
      setIsProcessing(false);
      setLoadMsg("");
      ffmpeg.resetProgress();
    }
  }, [ffmpeg, mediaItems, clips, setClips, notify]);

  // ---- Import from dashboard ----
  // Guard against StrictMode's double-mount: consume each filesToImport array
  // at most once. window.history.replaceState below doesn't invalidate
  // useLocation()'s cached state, so without this ref the second mount would
  // re-import the same files and produce duplicate media items.
  const consumedFilesToImportRef = useRef(null);
  useEffect(() => {
    const f = location.state?.filesToImport;
    if (!f?.length) return;
    if (consumedFilesToImportRef.current === f) return;
    consumedFilesToImportRef.current = f;
    window.history.replaceState({ ...location.state, filesToImport: null }, "");
    importMedia(f);
  }, [location.state?.filesToImport, importMedia]);

  // ---- Load project from dashboard OR URL query param (page reload) ----
  useEffect(() => {
    const stateProjectId = location.state?.projectId;
    const projectData = location.state?.projectData;
    const projectName = location.state?.projectName;
    // Use location.state projectId (from dashboard nav) or fall back to URL query param (page reload)
    const urlProjectId = new URLSearchParams(window.location.search).get('project');
    const projectId = stateProjectId || urlProjectId || null;
    if (!projectId) return;
    // Prevent double-restore (dashboard nav sets state, URL param persists)
    if (hasRestoredRef.current === projectId) return;
    hasRestoredRef.current = projectId;

    if (isSupabaseConfigured() && !user?.id) {
      return;
    }

    let cancelled = false;

    const restoreBgMusic = async (pData) => {
      const savedBg = pData.project_data?.bgMusic;
      if (!savedBg) return;

      let file = null, blobUrl = null;

      // Try IndexedDB first (works for all users)
      if (savedBg.mediaId) {
        try {
          const stored = await loadMedia(projectId, savedBg.mediaId);
          if (stored) { file = stored.file; blobUrl = stored.blobUrl; }
        } catch (e) {
          console.warn('[restoreBgMusic] IndexedDB load failed:', e);
        }
      }

      // Fallback to Supabase Storage
      if (!blobUrl && savedBg.storagePath && isSupabaseConfigured()) {
        try {
          const url = await getProjectMediaUrl(savedBg.storagePath);
          const response = await fetch(url);
          if (response.ok) {
            const blob = await response.blob();
            file = new File([blob], savedBg.name || "bgm", { type: blob.type });
            blobUrl = URL.createObjectURL(blob);
          }
        } catch (e) {
          console.warn('[restoreBgMusic] Supabase download failed:', e);
        }
      }

      if (blobUrl) {
        setBgMusic({
          file,
          name: savedBg.name || "Background",
          blobUrl,
          volume: savedBg.volume ?? 0.3,
          storagePath: savedBg.storagePath,
          mediaId: savedBg.mediaId,
        });
      }
    };

    /** Parse an idb:// key into { idbProjectId, idbMediaId }. */
    const parseIdbKey = (key) => {
      if (!key || !key.startsWith('idb://')) return null;
      const payload = key.slice(6); // strip "idb://"
      const colonIdx = payload.lastIndexOf(':');
      if (colonIdx < 0) return null;
      return { idbProjectId: payload.slice(0, colonIdx), idbMediaId: payload.slice(colonIdx + 1) };
    };

    /** Map a MIME type to ClipCut's coarse media type taxonomy. */
    const typeFromMime = (mime) => {
      if (mime?.startsWith('audio/')) return 'audio';
      if (mime?.startsWith('image/')) return 'image';
      return 'video';
    };

    /** Race a promise against a timeout (ms). Returns fallback on timeout. */
    const withTimeout = (promise, ms, fallback = null) =>
      Promise.race([promise, new Promise(resolve => setTimeout(() => resolve(fallback), ms))]);

    /** Try loading media from IndexedDB, then Supabase, returning { file, blobUrl } or nulls. */
    const resolveMedia = async (clipData, cachedIdbEntries = []) => {
      let file = null, blobUrl = null;
      const mediaKey = clipData.mediaId || clipData.id || null;

      console.log('[restore] resolveMedia called for:', {
        name: clipData.name, type: clipData.type, mediaId: mediaKey,
        idbKey: clipData.idbKey, storagePath: clipData.storagePath,
      });

      // 1. Try IndexedDB first (fast, local — works for all users)
      const parsed = parseIdbKey(clipData.idbKey);
      if (parsed) {
        try {
          console.log('[restore] Trying IndexedDB:', parsed.idbProjectId, parsed.idbMediaId);
          const stored = await withTimeout(loadMedia(parsed.idbProjectId, parsed.idbMediaId), 2000);
          if (stored) {
            file = stored.file; blobUrl = stored.blobUrl;
            console.log('[restore] IndexedDB HIT:', clipData.name, 'size:', stored.file?.size);
          } else {
            console.warn('[restore] IndexedDB MISS (null):', clipData.idbKey);
          }
        } catch (e) {
          console.warn('[restore] IndexedDB load failed:', clipData.idbKey, e);
        }
      } else {
        console.log('[restore] No idbKey for clip:', clipData.name, clipData.type);
      }

      // Also try with the current projectId as key (for older saves without idbKey)
      if (!blobUrl && mediaKey) {
        try {
          console.log('[restore] Trying fallback IndexedDB with projectId:', projectId, 'mediaId:', mediaKey);
          const stored = await withTimeout(loadMedia(projectId, mediaKey), 2000);
          if (stored) {
            file = stored.file; blobUrl = stored.blobUrl;
            console.log('[restore] Fallback IndexedDB HIT:', clipData.name);
          } else {
            console.warn('[restore] Fallback IndexedDB MISS:', projectId, mediaKey);
          }
        } catch (e) {
          console.warn('[restore] IndexedDB fallback load failed:', mediaKey, e);
        }
      }

      // 2b. Broad scan: use pre-cached IndexedDB entries instead of fetching again
      if (!blobUrl && mediaKey) {
        try {
          const match = cachedIdbEntries.find(e => e.mediaId === mediaKey);
          if (match) {
            console.log('[restore] IndexedDB SCAN HIT:', match.key);
            const stored = await withTimeout(loadMedia(match.projectId, match.mediaId), 2000);
            if (stored) { file = stored.file; blobUrl = stored.blobUrl; }
          }
        } catch (e) {
          console.warn('[restore] IndexedDB scan failed:', e);
        }
      }

      // 3. If IndexedDB miss and user is authenticated, fetch from Supabase Storage
      if (!blobUrl && clipData.storagePath && isSupabaseConfigured() && !clipData.storagePath.startsWith('blob:')) {
        try {
          console.log('[restore] Trying Supabase Storage:', clipData.storagePath);
          const url = await withTimeout(getProjectMediaUrl(clipData.storagePath), 5000);
          if (!url) throw new Error('Supabase URL timed out');
          const fetchCtrl = new AbortController();
          const fetchTimer = setTimeout(() => fetchCtrl.abort(), 8000);
          const response = await fetch(url, { signal: fetchCtrl.signal });
          clearTimeout(fetchTimer);
          if (response.ok) {
            const blob = await response.blob();
            file = new File([blob], clipData.name || 'media', { type: blob.type });
            blobUrl = URL.createObjectURL(blob);
            console.log('[restore] Supabase Storage HIT:', clipData.name);
          }
        } catch (e) {
          console.warn('[restore] Supabase download failed:', clipData.storagePath, e);
        }
      }

      if (!blobUrl && clipData.type !== 'text') {
        console.error('[restore] FAILED to resolve media for:', clipData.name, clipData.type, '— all sources exhausted');
      }

      return { file, blobUrl };
    };

    // Drafts (draft-*) and pre-migration local saves (local_*) never exist in
    // Supabase — asking for them always yields PGRST116. Short-circuit the
    // cloud call so the IndexedDB recovery path below is the first thing
    // that runs for these IDs.
    const isNonCloudId = /^(draft-|local_)/.test(projectId);
    const emptyPData = () => ({
      name: projectName || "Untitled Project",
      project_data: { clips: [], mediaItems: [] },
    });

    const restoreProject = async () => {
      setIsProcessing(true);
      setLoadMsg("Restoring media...");
      try {
        let pData = projectData;
        if (!pData) {
          if (isNonCloudId) {
            console.log('[restore] Non-cloud projectId — skipping Supabase, going straight to IndexedDB recovery:', projectId);
            pData = emptyPData();
          } else if (!isSupabaseConfigured()) {
            pData = await loadProject(projectId, null);
          } else if (user?.id) {
            try {
              pData = await loadProject(projectId, user.id);
            } catch (e) {
              // PGRST116 = "0 rows" from .single(). The row never existed (draft
              // that failed to rekey, deleted project still in URL). Fall
              // through to IndexedDB recovery instead of losing the user's
              // local media. Other errors (network, auth) still bubble up.
              if (e?.code === 'PGRST116') {
                console.warn('[restore] Supabase has no row for', projectId, '— attempting IndexedDB-only recovery');
                pData = emptyPData();
              } else {
                throw e;
              }
            }
          }
        }
        if (!pData) {
          // localStorage also returned nothing — treat as empty project and
          // let the IndexedDB scan below surface any orphaned media.
          console.warn('[restore] No project data found for', projectId, '— attempting IndexedDB-only recovery');
          pData = emptyPData();
        }
        if (cancelled) return;

        window.history.replaceState({ ...location.state, projectId: null, projectData: null, projectName: null }, "");

        const pName = projectName || pData.name || "Untitled Project";
        setProjectName(sanitizeTextInput(pName, { maxLength: 100 }) || "Untitled Project");
        setProjectId(projectId);
        if (pData.resolution) setProjectResolution(pData.resolution);

        const rawMarkers = pData.project_data?.timelineMarkers ?? pData.timelineMarkers;
        setTimelineMarkers(
          Array.isArray(rawMarkers)
            ? rawMarkers
              .filter((m) => m && typeof m.time === 'number' && Number.isFinite(m.time) && m.time >= 0)
              .map((m, i) => ({
                id: typeof m.id === 'string' && m.id ? m.id : `mk-${i}-${Math.round(m.time * 1000)}`,
                time: m.time,
              }))
            : []
        );

        const savedClips = pData.project_data?.clips || pData.clips || [];
        const savedMediaItems = pData.project_data?.mediaItems || [];

        // Single scan — reused by the debug log, the empty-project recovery
        // path, and the full-resolution path below.
        const cachedIdbEntries = await withTimeout(listAllMedia(), 3000, []);
        console.log('[restore] IndexedDB entries:', cachedIdbEntries);

        console.log('[restore] Project data:', {
          projectId,
          clipsCount: savedClips.length,
          mediaItemsCount: savedMediaItems.length,
          clipTypes: savedClips.map(c => ({ name: c.name, type: c.type, mediaId: c.mediaId, idbKey: c.idbKey, storagePath: c.storagePath })),
          mediaItemIds: savedMediaItems.map(m => ({ id: m.id, name: m.name, idbKey: m.idbKey })),
        });

        if (savedClips.length === 0 && savedMediaItems.length === 0) {
          // Recovery attempt: Supabase JSONB may have been clobbered by a
          // pre-fix autosave-during-restore race, but the user's media blobs
          // are still in IndexedDB. Rebuild the media panel from the cache so
          // the user can reassemble their timeline without re-importing.
          const recoveryCandidates = cachedIdbEntries.filter(e => e.projectId === projectId);
          const recovered = [];
          for (const entry of recoveryCandidates) {
            try {
              const loaded = await withTimeout(loadMedia(projectId, entry.mediaId), 3000);
              if (!loaded) continue;
              recovered.push({
                id: entry.mediaId,
                name: entry.name || 'media',
                file: loaded.file,
                blobUrl: loaded.blobUrl,
                thumbnail: null,
                duration: 0,
                width: 0,
                height: 0,
                type: typeFromMime(entry.mime),
                isProcessing: false,
                idbKey: `idb://${projectId}:${entry.mediaId}`,
                _mediaError: null,
              });
            } catch (e) {
              console.warn('[recover] load failed for', entry.mediaId, e);
            }
          }
          if (cancelled) return;
          await restoreBgMusic(pData);

          // Fallback: if nothing under the current projectId, scan IndexedDB
          // for ORPHAN media — entries keyed to stale draft-*/local_* IDs
          // from sessions that never successfully rekeyed to a UUID. These
          // are stranded files with no other route back to the user.
          // Dedupe by mediaId (same file may exist under multiple stale
          // projectIds from repeated rekey failures).
          let orphanCount = 0;
          if (recovered.length === 0) {
            const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            const orphanEntries = cachedIdbEntries.filter(e =>
              e.projectId && e.projectId !== projectId && !UUID_RE.test(e.projectId)
            );
            const seenMediaIds = new Set();
            for (const entry of orphanEntries) {
              if (seenMediaIds.has(entry.mediaId)) continue;
              seenMediaIds.add(entry.mediaId);
              try {
                const loaded = await withTimeout(loadMedia(entry.projectId, entry.mediaId), 3000);
                if (!loaded) continue;
                recovered.push({
                  id: entry.mediaId,
                  name: entry.name || 'media',
                  file: loaded.file,
                  blobUrl: loaded.blobUrl,
                  thumbnail: null,
                  duration: 0,
                  width: 0,
                  height: 0,
                  type: typeFromMime(entry.mime),
                  isProcessing: false,
                  idbKey: `idb://${entry.projectId}:${entry.mediaId}`,
                  _mediaError: null,
                });
                orphanCount++;
              } catch (e) {
                console.warn('[recover-orphan] load failed for', entry.mediaId, e);
              }
            }
            if (orphanCount > 0) {
              console.warn(`[recover-orphan] Surfacing ${orphanCount} orphan media file(s) from stale projectIds`);
            }
          }

          if (recovered.length > 0) {
            setMediaItems(recovered);
            // Kick off metadata/thumbnail regen in the background so the
            // media panel becomes usable immediately.
            for (const mi of recovered) {
              if (mi.type === 'audio') continue;
              (async () => {
                try {
                  const info = await getVideoInfoFast(mi.file);
                  setMediaItems(prev => prev.map(m =>
                    m.id === mi.id ? { ...m, duration: info.duration || m.duration, width: info.width, height: info.height } : m
                  ));
                  const thumbBlob = await generateThumbnailFast(mi.file, 0);
                  const thumbUrl = URL.createObjectURL(thumbBlob);
                  setMediaItems(prev => prev.map(m =>
                    m.id === mi.id ? { ...m, thumbnail: thumbUrl } : m
                  ));
                } catch (e) {
                  console.warn('[recover] metadata regen failed:', mi.name, e);
                }
              })();
            }
            isRestoreCompleteRef.current = true;
            const message = orphanCount > 0
              ? `Surfaced ${orphanCount} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`
              : `Recovered ${recovered.length} media file(s) from local cache — re-add them to the timeline, then save`;
            notify('warning', message);
            return;
          }

          isRestoreCompleteRef.current = true;
          notify("info", `Loaded project "${pName}" (no clips)`);
          return;
        }

        setLoadMsg("Restoring media...");

        // 1. Collect all unique media that needs resolution
        const mediaMap = new Map(); // mediaId → { blobUrl, file, meta }
        const uniqueMedia = new Map(); // mediaId → clipData (deduplicated)

        for (const mi of savedMediaItems) {
          const mediaKey = mi.id || mi.mediaId;
          if (mediaKey && !uniqueMedia.has(mediaKey)) {
            uniqueMedia.set(mediaKey, mi);
          }
        }
        for (const clipData of savedClips) {
          const mediaKey = clipData.mediaId || clipData.id;
          if (clipData.type !== 'text' && mediaKey && !uniqueMedia.has(mediaKey)) {
            uniqueMedia.set(mediaKey, clipData);
          }
        }

        // 2. Resolve all unique media in parallel.
        // NB: do NOT wrap resolveMedia() in an outer timeout here. Each internal
        // stage already has its own timeout (IndexedDB 2s × 2, Supabase URL 5s,
        // fetch 8s), so the inner worst case is ~17s — and Promise.race's
        // fire-and-forget semantics mean a premature outer timeout lets the
        // Supabase fetch complete in the background while the merge below runs
        // with an empty mediaMap. The user then sees a "Supabase Storage HIT"
        // log AFTER the clip has already been stamped "Media not found — re-import".
        setLoadSub(`Resolving ${uniqueMedia.size} media files...`);
        const resolveResults = await Promise.all(
          [...uniqueMedia.entries()].map(async ([mediaId, item]) => {
            if (cancelled) return null;
            const resolved = await resolveMedia(item, cachedIdbEntries);
            return { mediaId, resolved, meta: item };
          })
        );

        // Build mediaMap from parallel results
        for (const result of resolveResults) {
          if (!result || cancelled) continue;
          const { mediaId, resolved, meta } = result;
          if (resolved.blobUrl) {
            mediaMap.set(mediaId, { blobUrl: resolved.blobUrl, file: resolved.file, meta });
          }
        }

        // 3. Assemble restored clips using the resolved mediaMap
        const restoredClips = [];
        for (const clipData of savedClips) {
          let blobUrl = null;
          let file = null;
          const mediaKey = clipData.mediaId || clipData.id;

          if (mediaKey && mediaMap.has(mediaKey)) {
            const cached = mediaMap.get(mediaKey);
            blobUrl = cached.blobUrl;
            file = cached.file;
          }

          const mediaUnavailable = !blobUrl && clipData.type !== 'text';
          restoredClips.push({
            ...DEFAULT_CLIP_PROPERTIES,
            ...clipData,
            file: file || null,
            blobUrl: blobUrl || null,
            thumbnail: null,
            _mediaError: mediaUnavailable ? "Media not found — re-import" : null,
          });
        }

        // 3. Build media panel from mediaMap (includes both timeline clips and standalone imports)
        const resolvedMediaItemsById = new Map();
        for (const [id, entry] of mediaMap) {
          const meta = entry.meta || {};
          resolvedMediaItemsById.set(id, {
            id,
            name: meta.name || 'media',
            file: entry.file,
            blobUrl: entry.blobUrl,
            thumbnail: null,
            duration: meta.duration || 0,
            width: meta.width || 0,
            height: meta.height || 0,
            type: meta.type || 'video',
            isProcessing: false,
            storagePath: meta.storagePath,
            _mediaError: null,
          });
        }

        const mergedMediaItems = [];
        const mergedIds = new Set();
        for (const savedItem of savedMediaItems) {
          const mediaKey = savedItem.id || savedItem.mediaId;
          const resolvedItem = mediaKey ? resolvedMediaItemsById.get(mediaKey) : null;
          mergedMediaItems.push({
            id: mediaKey,
            name: savedItem.name || resolvedItem?.name || 'media',
            file: resolvedItem?.file || null,
            blobUrl: resolvedItem?.blobUrl || null,
            thumbnail: null,
            duration: resolvedItem?.duration ?? savedItem.duration ?? 0,
            width: resolvedItem?.width ?? savedItem.width ?? 0,
            height: resolvedItem?.height ?? savedItem.height ?? 0,
            type: savedItem.type || resolvedItem?.type || 'video',
            isProcessing: false,
            storagePath: savedItem.storagePath || resolvedItem?.storagePath,
            idbKey: savedItem.idbKey,
            _mediaError: resolvedItem?.blobUrl || savedItem.type === 'audio' ? null : 'Media not found — re-import',
          });
          if (mediaKey) mergedIds.add(mediaKey);
        }
        for (const [mediaKey, resolvedItem] of resolvedMediaItemsById) {
          if (mergedIds.has(mediaKey)) continue;
          mergedMediaItems.push(resolvedItem);
        }

        const restoredState = buildRestoredProjectState({
          restoredClips,
          mediaItems: mergedMediaItems,
          projectName: pName,
        });

        setMediaItems(restoredState.mediaItems);
        setClips(restoredState.clips);
        await restoreBgMusic(pData);

        // Asynchronously regenerate metadata and thumbnails for restored media items
        for (const mi of restoredState.mediaItems) {
          if (!mi.file || mi.type === 'audio') continue;
          (async () => {
            try {
              const info = await getVideoInfoFast(mi.file);
              setMediaItems(prev => prev.map(m =>
                m.id === mi.id ? { ...m, duration: info.duration || m.duration, width: info.width, height: info.height } : m
              ));
              const thumbBlob = await generateThumbnailFast(mi.file, 0);
              const thumbUrl = URL.createObjectURL(thumbBlob);
              setMediaItems(prev => prev.map(m =>
                m.id === mi.id ? { ...m, thumbnail: thumbUrl } : m
              ));
            } catch (e) {
              console.warn('[restore] Thumbnail regen failed:', mi.name, e);
            }
          })();
        }

        isRestoreCompleteRef.current = true;
        notify(restoredState.notification.level, restoredState.notification.message);
      } catch (e) {
        console.error("Project load error:", e);
        notify("error", "Failed to load project");
      } finally {
        if (!cancelled) {
          setIsProcessing(false);
          setLoadMsg("");
          setLoadSub("");
        }
      }
    };

    restoreProject();
    return () => {
      cancelled = true;
    };
  }, [user?.id, location.state?.projectId, notify, setBgMusic, setClips]);

  // ---- Preload WASM files to browser cache (full init deferred to first export/trim) ----
  useEffect(() => {
    void ffmpeg.preload();
  }, []); // eslint-disable-line

  // ---- Global shortcuts ----
  useEffect(() => {
    const h = (e) => {
      const mod = e.ctrlKey || e.metaKey;

      // Ctrl+Shift+E — toggle AI panel (works even from inputs)
      if (mod && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        toggleAiPanel();
        return;
      }

      // Escape — close AI panel if open
      if (e.key === 'Escape' && aiPanelOpen) {
        setAiPanelOpen(false);
        return;
      }

      // Don't intercept keys while the user is typing in a text field
      const ae = document.activeElement;
      const inEditable = e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA"
        || ae?.tagName === "INPUT" || ae?.tagName === "TEXTAREA" || ae?.isContentEditable;
      if (inEditable) return;

      // / key — focus AI input when panel is open
      if (e.key === '/' && aiPanelOpen) {
        e.preventDefault();
        document.querySelector('.ai-input-box')?.focus();
        return;
      }

      // Delete / Backspace — remove selected clip (works for all clip types
      // on any track, regardless of where focus currently sits — Timeline's
      // own handler is scoped to timeline-focused elements and misses cases
      // where the user clicked the preview or toolbar after selecting).
      if ((e.key === "Delete" || e.key === "Backspace") && selectedClipId) {
        e.preventDefault();
        deleteClip(selectedClipId);
        return;
      }

      if (mod && e.key === "s") { e.preventDefault(); }
      if (mod && e.key === "e") { e.preventDefault(); clips.length > 0 && handleExport("1080p"); }
      if (mod && e.key === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      if (mod && e.key === "y") { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [handleExport, undo, redo, clips.length, pb, aiPanelOpen, toggleAiPanel, selectedClipId, deleteClip]);

  // ---- Keep refs current for cleanup ----
  const mediaItemsRef = useRef(mediaItems);
  const clipsRef = useRef(clips);
  useEffect(() => { mediaItemsRef.current = mediaItems; }, [mediaItems]);
  useEffect(() => { clipsRef.current = clips; }, [clips]);

  // ---- Cleanup ----
  useEffect(() => () => {
    mediaItemsRef.current.forEach(m => { if (m.blobUrl) URL.revokeObjectURL(m.blobUrl); if (m.thumbnail) URL.revokeObjectURL(m.thumbnail); });
    clipsRef.current.forEach(c => { if (c.blobUrl) URL.revokeObjectURL(c.blobUrl); });
  }, []);

  return (
    <div style={{
      ...styles.root,
      ...(isMobile ? {
        height: '100dvh',
        ...(isLandscape ? { paddingBottom: 0, paddingRight: '44px' } : { paddingBottom: '56px' }),
      } : {}),
    }} role="application" aria-label="ClipCut Video Editor">
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{VIDEO_EDITOR_CSS}</style>

      {/* Skip link for keyboard/screen reader users (hidden on mobile) */}
      {!isMobile && <a href="#editor-timeline" className="skip-link">Skip to timeline</a>}

      {/* ARIA live region for status announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        {isExporting ? `Exporting video... ${exportProgress}%` : loadMsg || ''}
      </div>

      <TopBar
        projectName={projectName} onProjectNameChange={setProjectName}
        onExport={handleExport} isExporting={isExporting} exportProgress={exportProgress} currentOperation={loadMsg}
        hasMediaToExport={clips.filter(c => c.type !== "audio" && c.file).length > 0} resolutions={RESOLUTIONS} exportPresets={EXPORT_PRESETS} exportSubMessage={loadSub}
        lastSaved={lastSaved} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
        onCancelExport={cancelExport}
        onNewProject={handleNewProject} onSave={handleSave} onSettings={handleSettings}
        editorLayout={editorLayout} onLayoutChange={setEditorLayout}
        forceOpenExport={forceExport > 0} onExportModalClosed={() => setForceExport(0)}
        onAiToggle={toggleAiPanel} aiPanelOpen={aiPanelOpen}
      />
      {!isMobile && <Toolbar activeToolbar={activeToolbar} onToolbarChange={setActiveToolbar} />}

      <main aria-label="Editor workspace" style={{
        flex: isMobile ? 1 : (editorLayout === 'wide-timeline' ? '0 1 48%' : '1 1 0%'),
        display: "flex",
        flexDirection: (isMobile && isLandscape) ? "row" : (isMobile ? "column" : "row"),
        minWidth: 0, minHeight: isMobile ? 0 : '200px', overflow: "hidden",
        zIndex: 0,
      }}>
        {editorLayout !== 'compact' && !isMobile && (
          <>
            <ErrorBoundary name="left-panel" inline message="Panel encountered an error">
              <Suspense fallback={<PanelLoadingFallback width={`${effectiveMediaW}px`} />}>
                <div style={{ width: `${effectiveMediaW}px`, flexShrink: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0e1218' }}>
                  <div style={{ flex: '1 1 0%', overflow: 'hidden auto', minHeight: 0 }} className="cs">
                  {activeToolbar === 'media' && (
                    <MediaPanel
                      mediaTab={mediaTab} onMediaTabChange={setMediaTab}
                      mediaItems={mediaItems} onImportMedia={importMedia} onRemoveMedia={removeMedia}
                      onAddToTimeline={addToTimeline} selectedMediaId={selectedMediaId} onSelectMedia={setSelectedMediaId}
                      isImporting={isImporting}
                      style={LEFT_COLUMN_FILL_STYLE}
                    />
                  )}
                  {activeToolbar === 'text' && (
                    <MobileTextPanel
                      selectedClip={selectedClip} onClipUpdate={updateClip}
                      onAddClip={addClip} currentTime={pb.currentTime}
                    />
                  )}
                  {activeToolbar === 'audio' && (
                    <MobileAudioPanel
                      selectedClip={selectedClip} onClipUpdate={updateClip}
                      bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                      onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                    />
                  )}
                  {activeToolbar === 'captions' && (
                    <CaptionsPanel
                      clips={clips}
                      onAddClip={addClip}
                      onSetClips={setClips}
                      currentTime={pb.currentTime}
                      mediaItems={mediaItems}
                      selectedClip={selectedClip}
                      selectedClipId={selectedClipId}
                      onSelectClip={setSelectedClipId}
                      onClipUpdate={updateClip}
                    />
                  )}
                  {activeToolbar === 'stickers' && (
                    <MobileStickerPanel onAddClip={addClip} currentTime={pb.currentTime} />
                  )}
                  {activeToolbar === 'effects' && (
                    <MobileEffectsPanel selectedClip={selectedClip} onClipUpdate={updateClip} />
                  )}
                  {activeToolbar === 'transition' && (
                    <InspectorPanel
                      rightTab="video" onRightTabChange={setRightTab}
                      rightSubTab="basic" onRightSubTabChange={setRightSubTab}
                      selectedClip={selectedClip} onClipUpdate={updateClip}
                      onAllCaptionsUpdate={updateAllCaptions} clips={clips}
                      bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                      onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                      style={LEFT_COLUMN_FILL_STYLE}
                    />
                  )}
                  {activeToolbar === 'filters' && (
                    <MobileFiltersPanel selectedClip={selectedClip} onClipUpdate={updateClip} />
                  )}
                  </div>
                </div>
              </Suspense>
            </ErrorBoundary>
            <div className="resize-handle resize-handle-v" onMouseDown={(e) => onMediaDrag(e, effectiveMediaW)} onDoubleClick={() => setMediaPanelWidth(null)}>
              <div className="resize-handle-dot resize-handle-dot-v" />
            </div>
          </>
        )}
        <div style={isMobile && isLandscape ? { flex: '0 0 60%', display: 'flex', flexDirection: 'column', minWidth: 0 } : { flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ErrorBoundary name="player" inline message="Video player encountered an error">
            <Suspense fallback={<PanelLoadingFallback width="auto" height="100%" />}>
              <Player
                isPlaying={pb.isPlaying} onPlayPause={pb.togglePlay}
                videoSrc={previewSrc} currentTime={pb.clipOffset}
                duration={totalDuration}
                onTimeUpdate={onTimeUpdate} onSeek={onSeek} onEnded={onEnded}
                onVideoError={handleVideoFormatError}
                clipProperties={pb.currentClip || selectedClip}
                textOverlays={textOverlays}
                selectedClipId={selectedClipId}
                onClipUpdate={updateClip}
                onSelectClip={setSelectedClipId}
                hasTimelineClips={clips.some(c => c.type !== 'audio' && c.type !== 'text')}
                hasUnavailableMediaClips={hasMissingPlayableMedia}
                isRestoringMedia={isProcessing && loadMsg.includes('Restoring')}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
        {editorLayout !== 'compact' && !isMobile && selectedClip && !aiPanelOpen && (
          <div className="inspector-enter" style={{ display: 'flex', flexDirection: 'row', flexShrink: 0, width: `${effectiveInspectorW + 8}px`, overflow: 'hidden' }}>
            <div className="resize-handle resize-handle-v" onMouseDown={(e) => onInspectorDrag(e, effectiveInspectorW)} onDoubleClick={() => setInspectorWidth(null)}>
              <div className="resize-handle-dot resize-handle-dot-v" />
            </div>
            <ErrorBoundary name="inspector" inline message="Inspector panel encountered an error">
              <Suspense fallback={<PanelLoadingFallback width={`${effectiveInspectorW}px`} />}>
                <InspectorPanel
                  rightTab={rightTab} onRightTabChange={setRightTab}
                  rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                  selectedClip={selectedClip} onClipUpdate={updateClip}
                  onAllCaptionsUpdate={updateAllCaptions} clips={clips}
                  bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                  onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  style={{ width: `${effectiveInspectorW}px` }}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        )}
        {/* AI Chat Panel — desktop sidebar (replaces inspector when open) */}
        {!isMobile && aiPanelOpen && (
          <ErrorBoundary name="ai-chat" inline message="AI panel encountered an error">
            <Suspense fallback={<PanelLoadingFallback width="360px" />}>
              <AIChatPanel
                isOpen={aiPanelOpen}
                onClose={() => setAiPanelOpen(false)}
                messages={aiMessages}
                isThinking={aiThinking}
                slowHint={aiSlowHint}
                onSendMessage={handleAiSendMessage}
                suggestions={aiSuggestions}
                onApplySuggestion={handleAiSuggestion}
              />
            </Suspense>
          </ErrorBoundary>
        )}

        {/* Right side: time bar + context actions + timeline — inside main for landscape layout */}
        {isMobile && (
          <div style={isLandscape ? { flex: '0 0 40%', display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden', borderLeft: '1px solid rgba(117,170,219,0.08)' } : { display: 'contents' }}>
            {/* Mobile compact time bar: fullscreen | timecode | undo/redo */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: '44px', padding: '0 12px',
              background: '#0e1218', borderTop: '1px solid rgba(117,170,219,0.06)',
              flexShrink: 0,
            }}>
              <button
                onClick={() => {
                  const el = document.querySelector('.player-container');
                  if (el) { el.requestFullscreen?.() || el.webkitRequestFullscreen?.(); }
                }}
                style={{
                  background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '44px', height: '44px', minWidth: 'auto', minHeight: 'auto',
                }}
                aria-label="Fullscreen"
              >
                <Icon i="fullscreen" s={20} c="#94a3b8" />
              </button>
              <div style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: '12px', letterSpacing: '0.5px', color: '#e2e8f0',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <span style={{ color: '#75aadb', fontWeight: 600 }}>
                  {formatTimecode(pb.currentTime)}
                </span>
                <span style={{ color: '#475569' }}>/</span>
                <span style={{ color: '#94a3b8' }}>
                  {formatTimecode(totalDuration)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <button
                  onClick={undo} disabled={!canUndo}
                  style={{
                    background: 'none', border: 'none', cursor: canUndo ? 'pointer' : 'not-allowed',
                    opacity: canUndo ? 1 : 0.35, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '44px', height: '44px', minWidth: 'auto', minHeight: 'auto',
                  }}
                  aria-label="Undo"
                >
                  <Icon i="undo" s={18} c="#94a3b8" />
                </button>
                <button
                  onClick={redo} disabled={!canRedo}
                  style={{
                    background: 'none', border: 'none', cursor: canRedo ? 'pointer' : 'not-allowed',
                    opacity: canRedo ? 1 : 0.35, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '44px', height: '44px', minWidth: 'auto', minHeight: 'auto',
                  }}
                  aria-label="Redo"
                >
                  <Icon i="redo" s={18} c="#94a3b8" />
                </button>
              </div>
            </div>

            {/* Mobile clip context actions — shown when a clip is selected */}
            {selectedClipId && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                height: '64px', padding: '4px 12px',
                background: '#0e1218', borderTop: '1px solid rgba(117,170,219,0.06)',
                overflowX: 'auto', overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                flexShrink: 0,
                transition: 'height 0.2s ease, opacity 0.2s ease',
              }}>
                {[
                  { icon: 'volume_off', label: 'Mute clip audio', action: () => updateClip(selectedClipId, { volume: selectedClip?.volume === 0 ? 1 : 0 }) },
                  { icon: 'image', label: 'Cover', action: () => {} },
                  { icon: 'music_note', label: '+ Add audio', action: () => { setMobileActiveTab('audio'); setMobileDrawerOpen(true); } },
                  { icon: 'title', label: '+ Add text', action: () => { setMobileActiveTab('text'); setMobileDrawerOpen(true); } },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.action}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '8px', padding: '6px 8px', cursor: 'pointer',
                      minWidth: '64px', flex: '0 0 auto', minHeight: '44px',
                    }}
                  >
                    <Icon i={item.icon} s={20} c="#e2e8f0" />
                    <span style={{ fontSize: '9px', color: '#94a3b8', whiteSpace: 'nowrap', fontFamily: "'Spline Sans', sans-serif" }}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <ErrorBoundary name="timeline" inline message="Timeline encountered an error">
              <Suspense fallback={<TimelineLoadingFallback />}>
                <Timeline id="editor-timeline"
                  clips={clips} selectedClipId={selectedClipId} onSelectClip={setSelectedClipId}
                  onUpdateClip={updateClip} onDeleteClip={deleteClip} onSplitClip={splitClip}
                  onAddClip={addClip} onRippleDelete={rippleDelete}
                  currentTime={pb.currentTime} onSeek={pb.seek} totalDuration={totalDuration}
                  isProcessing={isProcessing} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
                  mediaItems={mediaItems} onAddToTimeline={addToTimeline}
                  timelineHeight={timelineHeight}
                  timelineMarkers={timelineMarkers}
                  onTimelineMarkersChange={setTimelineMarkers}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        )}
      </main>

      {/* Mobile bottom sheet + tab bar */}
      {isMobile && (
        <>
          <BottomSheet isOpen={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)}>
            <ErrorBoundary name="mobile-panel" inline message="Panel error">
              <Suspense fallback={<PanelLoadingFallback width="100%" height="200px" />}>
                {mobileActiveTab === 'media' && (
                  <MediaPanel
                    mediaTab={mediaTab} onMediaTabChange={setMediaTab}
                    mediaItems={mediaItems} onImportMedia={importMedia} onRemoveMedia={removeMedia}
                    onAddToTimeline={addToTimeline} selectedMediaId={selectedMediaId} onSelectMedia={setSelectedMediaId}
                    isImporting={isImporting}
                  />
                )}
                {mobileActiveTab === 'text' && (
                  <MobileTextPanel
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    onAddClip={addClip} currentTime={pb.currentTime}
                  />
                )}
                {mobileActiveTab === 'audio' && (
                  <MobileAudioPanel
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                    onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  />
                )}
                {mobileActiveTab === 'captions' && (
                  <CaptionsPanel
                    clips={clips} onAddClip={addClip} onSetClips={setClips}
                    currentTime={pb.currentTime} mediaItems={mediaItems}
                    selectedClip={selectedClip}
                    selectedClipId={selectedClipId}
                    onSelectClip={setSelectedClipId}
                    onClipUpdate={updateClip}
                  />
                )}
                {mobileActiveTab === 'stickers' && (
                  <MobileStickerPanel onAddClip={addClip} currentTime={pb.currentTime} />
                )}
                {mobileActiveTab === 'effects' && (
                  <MobileEffectsPanel selectedClip={selectedClip} onClipUpdate={updateClip} />
                )}
                {mobileActiveTab === 'filters' && (
                  <MobileFiltersPanel selectedClip={selectedClip} onClipUpdate={updateClip} />
                )}
                {mobileActiveTab === 'ai' && (
                  <AIChatPanel
                    isOpen={true}
                    onClose={() => setMobileDrawerOpen(false)}
                    messages={aiMessages}
                    isThinking={aiThinking}
                    slowHint={aiSlowHint}
                    onSendMessage={handleAiSendMessage}
                    suggestions={aiSuggestions}
                    onApplySuggestion={handleAiSuggestion}
                    isMobile={true}
                  />
                )}
              </Suspense>
            </ErrorBoundary>
          </BottomSheet>
          <nav className="mobile-tab-bar" aria-label="Editor tools">
            {[
              { id: 'media', icon: 'perm_media', label: 'Media', tip: 'Import and browse media' },
              { id: 'text', icon: 'title', label: 'Text', tip: 'Add manual text overlays' },
              { id: 'captions', icon: 'closed_caption', label: 'Captions', tip: 'Auto-generate subtitles from speech' },
              { id: 'audio', icon: 'music_note', label: 'Audio', tip: 'Background music and clip audio' },
              { id: 'stickers', icon: 'emoji_emotions', label: 'Stickers', tip: 'Drop emoji stickers on the preview' },
              { id: 'effects', icon: 'auto_fix_high', label: 'Effects', tip: 'Apply video effects' },
              { id: 'filters', icon: 'filter_vintage', label: 'Filters', tip: 'Apply colour filters' },
              { id: 'ai', icon: 'auto_awesome', label: 'AI', tip: 'AI editing assistant' },
            ].map(tab => (
              <button
                key={tab.id}
                className={mobileActiveTab === tab.id && mobileDrawerOpen ? 'active' : ''}
                title={tab.tip}
                aria-label={tab.tip}
                onClick={() => {
                  if (mobileActiveTab === tab.id) {
                    setMobileDrawerOpen(v => !v);
                  } else {
                    setMobileActiveTab(tab.id);
                    setMobileDrawerOpen(true);
                  }
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: mobileActiveTab === tab.id && mobileDrawerOpen ? '#75AADB' : undefined }}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </>
      )}

      {/* Desktop timeline — mobile timeline is inside <main> */}
      {!isMobile && (
        <>
          <div className="resize-handle resize-handle-h" onMouseDown={(e) => onTimelineDrag(e, timelineHeight || DEFAULT_TIMELINE_H)} onDoubleClick={() => setTimelineHeight(null)}>
            <div className="resize-handle-dot" />
          </div>
          <ErrorBoundary name="timeline" inline message="Timeline encountered an error">
            <Suspense fallback={<TimelineLoadingFallback />}>
              <Timeline id="editor-timeline"
                clips={clips} selectedClipId={selectedClipId} onSelectClip={setSelectedClipId}
                onUpdateClip={updateClip} onDeleteClip={deleteClip} onSplitClip={splitClip}
                onAddClip={addClip} onRippleDelete={rippleDelete}
                currentTime={pb.currentTime} onSeek={pb.seek} totalDuration={totalDuration}
                isProcessing={isProcessing} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
                mediaItems={mediaItems} onAddToTimeline={addToTimeline}
                timelineHeight={timelineHeight}
                timelineMarkers={timelineMarkers}
                onTimelineMarkersChange={setTimelineMarkers}
              />
            </Suspense>
          </ErrorBoundary>
        </>
      )}

      {/* Non-blocking thin bar during initial FFmpeg WASM load */}
      {ffmpeg.isLoading && !ffmpeg.currentOperation && !loadMsg && <FFmpegInitBar progress={ffmpeg.loadProgress} />}
      {/* Full-screen overlay only during active operations (import, export, trim, etc.) */}
      {(loadMsg || ffmpeg.currentOperation) && <LoadingOverlay message={loadMsg || "Processing..."} progress={ffmpeg.currentOperation != null ? ffmpeg.progress : ffmpeg.loadProgress} operationLabel={ffmpeg.currentOperation ? `${ffmpeg.currentOperation}...` : ''} subMessage={loadSub} onCancel={ffmpeg.currentOperation ? ffmpeg.cancelOperation : undefined} />}
      {showWalkthrough && <WalkthroughOverlay onComplete={() => { setShowWalkthrough(false); localStorage.setItem('clipcut_onboarded', '1'); }} />}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} autoClose={toast.type !== "error"} />}
    </div>
  );
};

export default memo(VideoEditor);