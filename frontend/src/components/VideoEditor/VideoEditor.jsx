import { useState, useEffect, useCallback, useMemo, useReducer, useRef, memo, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from './TopBar';
import Toolbar from './Toolbar';
import { styles, RESPONSIVE_CSS } from './styles';
import { SCROLLBAR_CSS } from './constants';
import { useFFmpeg } from '../../hooks/useFFmpeg';
import { useMobile } from '../../hooks/useMobile';
import { useAuth } from '../../supabase/AuthContext';
import { saveProject, loadProject, getProjectMediaUrl } from '../../services/projectService';
import { getCachedThumbnail, cacheThumbnail } from '../../utils/thumbnailCache';
import { getVideoInfoFast, generateThumbnailFast } from '../../utils/fastMediaProbe';
import { sanitizeTextInput } from '../../utils/validation';
import { getUserFriendlyMessage, retryWithBackoff } from '../../utils/errorHandling';
import { isServerExportAvailable, serverExport } from '../../services/apiService';
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
import BottomSheet from './BottomSheet';

/* ========== CSS ========== */
const VIDEO_EDITOR_CSS = `
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
  const moveLogCount = useRef(0);

  const onMouseDown = useCallback((e, currentSize) => {
    e.preventDefault();
    dragging.current = true;
    startPos.current = axis === 'y' ? e.clientY : e.clientX;
    startSize.current = currentSize;
    moveLogCount.current = 0;
    const handle = e.currentTarget;
    handle.classList.add('dragging');
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/7eca2665-ebe2-44fa-9a22-24d2bcafa132',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1519fb'},body:JSON.stringify({sessionId:'1519fb',runId:'pre-fix',hypothesisId:axis === 'y' ? 'H1' : invert ? 'H3' : 'H1',location:'VideoEditor.jsx:104',message:'Resize handle mouse down',data:{axis,invert,currentSize,targetClassName:handle.className,pointer:{x:e.clientX,y:e.clientY}},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const onMouseMove = (ev) => {
      if (!dragging.current) return;
      const raw = axis === 'y'
        ? startPos.current - ev.clientY  // dragging up = bigger timeline
        : ev.clientX - startPos.current;
      const delta = invert ? -raw : raw;
      if (moveLogCount.current < 3) {
        moveLogCount.current += 1;
        // #region agent log
        fetch('http://127.0.0.1:7249/ingest/7eca2665-ebe2-44fa-9a22-24d2bcafa132',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1519fb'},body:JSON.stringify({sessionId:'1519fb',runId:'pre-fix',hypothesisId:axis === 'y' ? 'H2' : invert ? 'H3' : 'H2',location:'VideoEditor.jsx:115',message:'Resize handle mouse move',data:{axis,invert,startSize:startSize.current,raw,delta,nextSize:startSize.current + delta,pointer:{x:ev.clientX,y:ev.clientY}},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
      }
      onResize(startSize.current + delta);
    };
    const onMouseUp = () => {
      dragging.current = false;
      handle.classList.remove('dragging');
      // #region agent log
      fetch('http://127.0.0.1:7249/ingest/7eca2665-ebe2-44fa-9a22-24d2bcafa132',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1519fb'},body:JSON.stringify({sessionId:'1519fb',runId:'pre-fix',hypothesisId:axis === 'y' ? 'H2' : invert ? 'H3' : 'H2',location:'VideoEditor.jsx:123',message:'Resize handle mouse up',data:{axis,invert,startSize:startSize.current,moveLogsCaptured:moveLogCount.current},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
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

/* ========== AUTO-SAVE HOOK ========== */
const useAutoSave = (projectId, projectName, clips, userId, totalDuration, resolution, interval = AUTO_SAVE_INTERVAL) => {
  const [lastSaved, setLastSaved] = useState(null);
  const isSavingRef = useRef(false);
  const projectIdRef = useRef(projectId);
  const lastThumbnailClipIdRef = useRef(null);

  // Refs so the interval callback always reads current values
  // without restarting the timer on every edit.
  const clipsRef = useRef(clips);
  clipsRef.current = clips;
  const projectNameRef = useRef(projectName);
  projectNameRef.current = projectName;
  const totalDurationRef = useRef(totalDuration);
  totalDurationRef.current = totalDuration;
  const resolutionRef = useRef(resolution);
  resolutionRef.current = resolution;

  // Update ref when projectId changes
  useEffect(() => {
    projectIdRef.current = projectId;
  }, [projectId]);

  useEffect(() => {
    const doSave = async () => {
      if (clipsRef.current.length === 0) return;
      if (isSavingRef.current) return;
      isSavingRef.current = true;

      try {
        const currentClips = clipsRef.current;
        const currentName = projectNameRef.current;
        // Serialize full clip properties (exclude binary data: file, blobUrl, thumbnail)
        const SKIP_KEYS = new Set(['file', 'blobUrl', 'thumbnail', 'isProcessing']);
        const projectData = {
          id: projectIdRef.current,
          name: currentName,
          clips: currentClips.map(c => {
            const serialized = {};
            for (const [k, v] of Object.entries(c)) {
              if (!SKIP_KEYS.has(k)) serialized[k] = v;
            }
            return serialized;
          }),
          duration: totalDurationRef.current,
          resolution: resolutionRef.current || '1080p',
        };

        // Generate thumbnail from first video clip when it changes
        if (userId) {
          const firstVideoClip = currentClips.find(c => c.type === 'video' && c.file);
          const firstClipMediaId = firstVideoClip?.mediaId || null;
          if (firstVideoClip && firstClipMediaId !== lastThumbnailClipIdRef.current) {
            try {
              projectData.thumbnail = await generateThumbnailFast(firstVideoClip.file, 1);
              lastThumbnailClipIdRef.current = firstClipMediaId;
            } catch (e) {
              console.warn('Auto-save thumbnail generation failed:', e);
            }
          }
        }

        // Save to cloud if user is authenticated, otherwise localStorage
        if (userId) {
          const saved = await retryWithBackoff(
            () => saveProject(userId, projectData),
            { maxRetries: 2, baseDelay: 1000, maxDelay: 5000 }
          );
          // Update projectId ref if this was a new project
          if (!projectIdRef.current && saved?.id) {
            projectIdRef.current = saved.id;
          }
        } else {
          // Fallback to localStorage for unauthenticated users
          const data = {
            projectName: currentName,
            clips: projectData.clips,
            savedAt: new Date().toISOString(),
          };
          localStorage.setItem(`clipcut_autosave_${currentName}`, JSON.stringify(data));
        }

        setLastSaved(new Date());
      } catch (e) {
        console.warn("Auto-save failed after retries:", e);
        // Fall back to localStorage on persistent cloud failure
        try {
          const name = projectNameRef.current;
          const SKIP_KEYS_FB = new Set(['file', 'blobUrl', 'thumbnail', 'isProcessing']);
          const fbClips = clipsRef.current.map(c => {
            const s = {};
            for (const [k, v] of Object.entries(c)) { if (!SKIP_KEYS_FB.has(k)) s[k] = v; }
            return s;
          });
          localStorage.setItem(`clipcut_autosave_${name}`, JSON.stringify({
            projectName: name, clips: fbClips, savedAt: new Date().toISOString(),
          }));
        } catch { /* localStorage full or unavailable */ }
      } finally {
        isSavingRef.current = false;
      }
    };

    const timer = setInterval(doSave, interval);
    return () => clearInterval(timer);
  }, [userId, interval]); // eslint-disable-line react-hooks/exhaustive-deps

  // Return both lastSaved and the current projectId
  return { lastSaved, projectId: projectIdRef.current };
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
    const vClips = clipsRef.current.filter(c => c.type !== "audio").sort((a, b) => a.startTime - b.startTime);
    for (const c of vClips) { if (t >= c.startTime && t < c.startTime + c.duration) return c; }
    return vClips.find(c => c.startTime > t) || vClips[vClips.length - 1] || null;
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

  // Project state
  const [projectId, setProjectId] = useState(null);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [projectResolution, setProjectResolution] = useState("1080p");
  
  // UI state
  const [activeToolbar, setActiveToolbar] = useState("media");
  const [rightTab, setRightTab] = useState("video");
  const [rightSubTab, setRightSubTab] = useState("basic");
  const [mediaTab, setMediaTab] = useState("local");
  const [editorLayout, setEditorLayout] = useState("default");
  const isMobile = useMobile();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Resizable panel sizes
  const [timelineHeight, setTimelineHeight] = useState(null); // null = use default
  const [mediaPanelWidth, setMediaPanelWidth] = useState(null);
  const [inspectorWidth, setInspectorWidth] = useState(null);

  const clampTlH = useCallback((h) => {
    const clamped = Math.max(120, Math.min(h, window.innerHeight * 0.6));
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/7eca2665-ebe2-44fa-9a22-24d2bcafa132',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1519fb'},body:JSON.stringify({sessionId:'1519fb',runId:'pre-fix',hypothesisId:'H4',location:'VideoEditor.jsx:620',message:'Timeline height clamp',data:{requested:h,clamped,innerHeight:window.innerHeight},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setTimelineHeight(clamped);
  }, []);
  const clampMpW = useCallback((w) => {
    const clamped = Math.max(200, Math.min(w, 400));
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/7eca2665-ebe2-44fa-9a22-24d2bcafa132',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1519fb'},body:JSON.stringify({sessionId:'1519fb',runId:'pre-fix',hypothesisId:'H2',location:'VideoEditor.jsx:624',message:'Media panel width clamp',data:{requested:w,clamped},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setMediaPanelWidth(clamped);
  }, []);
  const clampIpW = useCallback((w) => {
    const clamped = Math.max(220, Math.min(w, 450));
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/7eca2665-ebe2-44fa-9a22-24d2bcafa132',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1519fb'},body:JSON.stringify({sessionId:'1519fb',runId:'pre-fix',hypothesisId:'H3',location:'VideoEditor.jsx:630',message:'Inspector width clamp',data:{requested:w,clamped},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setInspectorWidth(clamped);
  }, []);

  const onTimelineDrag = useResizeDrag('y', clampTlH);
  const onMediaDrag = useResizeDrag('x', clampMpW);
  const onInspectorDrag = useResizeDrag('x', clampIpW, undefined, true);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [forceExport, setForceExport] = useState(0);
  const [showWalkthrough, setShowWalkthrough] = useState(() => !localStorage.getItem('clipcut_onboarded'));
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7249/ingest/7eca2665-ebe2-44fa-9a22-24d2bcafa132',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1519fb'},body:JSON.stringify({sessionId:'1519fb',runId:'pre-fix',hypothesisId:'H5',location:'VideoEditor.jsx:642',message:'Editor resize configuration',data:{isMobile,editorLayout,mediaPanelWidth,inspectorWidth,timelineHeight},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [editorLayout, inspectorWidth, isMobile, mediaPanelWidth, timelineHeight]);

  // Media library
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  // Timeline (with undo/redo)
  const [tlState, tlDispatch] = useReducer(timelineReducer, { clips: [], past: [], future: [] });
  const clips = tlState.clips;
  const canUndo = tlState.past.length > 0;
  const canRedo = tlState.future.length > 0;
  const [selectedClipId, setSelectedClipId] = useState(null);

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
  const [exportQueue, setExportQueue] = useState([]); // [{resolution, id}]
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [loadSub, setLoadSub] = useState("");
  const convertingBlobUrls = useRef(new Set());

  // Toasts
  const [toast, setToast] = useState(null);
  const notify = useCallback((type, message) => setToast({ type, message }), []);

  // FFmpeg
  const ffmpeg = useFFmpeg();

  // Auto-save with cloud storage
  const { lastSaved, projectId: savedProjectId } = useAutoSave(
    projectId, 
    projectName, 
    clips, 
    user?.id, 
    totalDuration, 
    projectResolution
  );
  
  // Update projectId when saved for the first time
  useEffect(() => {
    if (savedProjectId && !projectId) {
      setProjectId(savedProjectId);
    }
  }, [savedProjectId, projectId]);

  // Derived
  const selectedClip = useMemo(() => clips.find(c => c.id === selectedClipId), [clips, selectedClipId]);
  const previewSrc = useMemo(() => {
    if (pb.currentClip) return pb.currentClip.blobUrl;
    if (selectedMediaId) return mediaItems.find(m => m.id === selectedMediaId)?.blobUrl || null;
    return null;
  }, [pb.currentClip, selectedMediaId, mediaItems]);

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

  const undo = useCallback(() => tlDispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => tlDispatch({ type: "REDO" }), []);

  const updateClip = useCallback((id, u) => setClips(p => p.map(c => c.id === id ? { ...c, ...u } : c)), [setClips]);
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
  }, [setClips]);

  // ---- Import ----
  const importMedia = useCallback(async (files) => {
    setIsImporting(true);
    try {
      // No FFmpeg init needed — browser-native APIs handle import
      let n = 0;
      for (const file of files) {
        setLoadMsg(`Importing ${file.name}...`);
        setLoadSub(`${++n} of ${files.length}`);
        const id = genId();
        const blobUrl = URL.createObjectURL(file);
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
  }, [notify]);

  // ---- Background music ----
  const importBgMusic = useCallback((file) => {
    if (!file || !file.type.startsWith('audio/')) {
      notify('warning', 'Please select an audio file');
      return;
    }
    // Revoke previous bg music blob
    if (bgMusic?.blobUrl) URL.revokeObjectURL(bgMusic.blobUrl);
    const blobUrl = URL.createObjectURL(file);
    setBgMusic({ file, name: file.name, blobUrl, volume: 0.3 });
    notify('success', `Background music: ${file.name}`);
  }, [bgMusic, notify]);

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
    setMediaItems([]);
    setSelectedClipId(null);
    setSelectedMediaId(null);
    notify('info', 'New project created');
  }, [clips.length, notify, setClips]);

  const handleSave = useCallback(() => {
    // Auto-save is already wired — trigger a manual nudge via notify
    notify('info', 'Project saved');
  }, [notify]);

  const handleSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  // ---- Download helper ----
  const downloadBlob = useCallback((blob, res) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName.replace(/[^a-z0-9]/gi, "_")}_${res}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, [projectName]);

  // ---- WASM export pipeline (client-side fallback) ----
  const wasmExport = useCallback(async (vClips, res) => {
    if (!ffmpeg.isReady) {
      const initialized = await ffmpeg.initialize();
      if (!initialized) throw new Error("Failed to initialize FFmpeg. Please refresh the page and try again.");
    }

    // Apply effects to each clip
    const processedFiles = [];
    for (let i = 0; i < vClips.length; i++) {
      setLoadSub(`Processing clip ${i + 1} of ${vClips.length}`);
      const processed = await applyClipEffects(vClips[i], i, vClips.length);
      processedFiles.push(processed);
    }
    setLoadSub("");

    let videoFile;
    if (processedFiles.length === 1) {
      videoFile = processedFiles[0];
    } else {
      // Merge clips, applying transitions between adjacent clips that have them
      setLoadMsg(`Merging ${processedFiles.length} clips...`);
      videoFile = processedFiles[0];
      for (let i = 1; i < processedFiles.length; i++) {
        const prevClip = vClips[i - 1];
        if (prevClip.transition) {
          setLoadSub(`Adding ${prevClip.transition} transition...`);
          videoFile = await ffmpeg.addTransition(
            videoFile, processedFiles[i],
            prevClip.transition,
            prevClip.transitionDuration || 1
          );
        } else {
          // No transition — simple merge of the two
          videoFile = await ffmpeg.mergeClips([videoFile, processedFiles[i]]);
        }
      }
      setLoadSub("");
    }

    // Mix background music if set
    if (bgMusic?.file) {
      setLoadMsg("Mixing background music...");
      videoFile = await ffmpeg.mixAudio(videoFile, bgMusic.file, bgMusic.volume ?? 0.3);
    }

    // Export: use platform preset or resolution
    if (res.startsWith('preset:')) {
      const presetKey = res.slice(7);
      const preset = ffmpeg.exportPresets?.[presetKey];
      setLoadMsg(`Exporting for ${preset?.label || presetKey}...`);
      const blob = await ffmpeg.exportWithPreset(videoFile, presetKey);
      if (!blob || blob.size === 0) throw new Error("Export produced an empty file.");
      return blob;
    }
    setLoadMsg(`Exporting at ${res}...`);
    const blob = await ffmpeg.exportVideo(videoFile, res);
    if (!blob || blob.size === 0) throw new Error("Export produced an empty file.");
    return blob;
  }, [ffmpeg, applyClipEffects, bgMusic]);

  // ---- Export (tries server first, falls back to WASM) ----
  // Supports queue: if already exporting, queue the resolution for later
  const handleExport = useCallback(async (res) => {
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
    setLoadMsg("Preparing export...");

    try {
      // Check memory and warn/clear if near limit
      const memInfo = ffmpeg.getMemoryInfo();
      if (memInfo.limitExceeded) {
        setLoadMsg("Clearing memory...");
        await ffmpeg.clearMemory();
      }

      // Check if server-side export is available (fast path)
      const serverAvailable = await isServerExportAvailable();

      if (serverAvailable) {
        // Server export: process clips locally first, then send merged video to server
        // for final resolution scaling (server's native FFmpeg is much faster)
        setLoadMsg("Processing clips...");
        setLoadSub("Server export (fast)");

        if (!ffmpeg.isReady) {
          const initialized = await ffmpeg.initialize();
          if (!initialized) throw new Error("Failed to initialize FFmpeg. Please refresh the page and try again.");
        }

        // Apply effects and merge locally (still needed — effects are clip-specific)
        const processedFiles = [];
        for (let i = 0; i < vClips.length; i++) {
          setLoadSub(`Processing clip ${i + 1} of ${vClips.length}`);
          const processed = await applyClipEffects(vClips[i], i, vClips.length);
          processedFiles.push(processed);
        }
        setLoadSub("");

        let mergedBlob;
        if (processedFiles.length === 1) {
          mergedBlob = processedFiles[0] instanceof Blob ? processedFiles[0] : new Blob([processedFiles[0]], { type: 'video/mp4' });
        } else {
          setLoadMsg("Merging clips...");
          mergedBlob = await ffmpeg.mergeClips(processedFiles);
        }

        // Ensure we have a Blob
        if (!(mergedBlob instanceof Blob)) {
          mergedBlob = new Blob([mergedBlob], { type: 'video/mp4' });
        }

        setLoadMsg("Uploading to server for fast export...");

        // Collect text overlay info from first clip that has text (for server-side rendering)
        const textClip = vClips.find(c => c.text?.trim());
        const options = {};
        if (bgMusic?.file) {
          options.audioFile = bgMusic.file;
          options.audioVolume = bgMusic.volume ?? 0.3;
        }
        if (textClip) {
          options.text = textClip.text;
          options.textPosition = textClip.textPosition;
          options.textSize = textClip.textSize;
          options.textColor = textClip.textColor;
          options.textBgColor = textClip.textBgColor;
        }

        try {
          const blob = await serverExport(mergedBlob, res, options, (pct) => {
            setLoadMsg(pct < 50 ? "Uploading to server..." : "Server processing...");
            setLoadSub(`${pct}%`);
          });
          setLoadSub("");

          if (!blob || blob.size === 0) throw new Error("Server export returned empty file.");
          downloadBlob(blob, res);
          notify("success", `Exported at ${res} (server)`);
        } catch (serverErr) {
          // Server failed — fall back to WASM
          console.warn("Server export failed, falling back to WASM:", serverErr);
          setLoadMsg("Server unavailable, exporting locally...");
          setLoadSub("WASM fallback");
          const blob = await wasmExport(vClips, res);
          downloadBlob(blob, res);
          notify("success", `Exported at ${res} (local)`);
        }
      } else {
        // WASM-only export (server unreachable)
        setLoadSub("Local export");
        const blob = await wasmExport(vClips, res);
        downloadBlob(blob, res);
        notify("success", `Exported at ${res}`);
      }
    } catch (e) {
      console.error("Export error:", e);
      notify("error", getUserFriendlyMessage(e, 'ffmpeg'));
    } finally {
      setIsExporting(false);
      setLoadMsg("");
      setLoadSub("");
      ffmpeg.resetProgress();
      // Auto-clear FFmpeg virtual FS to free memory after export
      try { await ffmpeg.clearMemory(); } catch { /* ignore */ }
    }
  }, [clips, projectName, ffmpeg, pb, notify, applyClipEffects, bgMusic, wasmExport, downloadBlob, isExporting, exportQueue]);

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

  const onTimeUpdate = useCallback((t) => {
    if (pb.currentClip) {
      const trimStart = pb.currentClip.trimStart || 0;
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
  }, [pb]);

  const onEnded = useCallback(() => {
    if (!pb.currentClip) { pb.setIsPlaying(false); return; }
    const vc = clips.filter(c => c.type !== "audio").sort((a, b) => a.startTime - b.startTime);
    const next = vc.find(c => c.startTime > pb.currentClip.startTime);
    next && pb.isPlaying ? pb.seek(next.startTime) : pb.setIsPlaying(false);
  }, [pb, clips]);

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
  useEffect(() => {
    const f = location.state?.filesToImport;
    if (f?.length > 0) { 
      window.history.replaceState({ ...location.state, filesToImport: null }, ""); 
      importMedia(f); 
    }
    
    // Load project if projectId is provided
    const projectId = location.state?.projectId;
    const projectData = location.state?.projectData;
    const projectName = location.state?.projectName;
    
    if (projectId) {
      window.history.replaceState({ ...location.state, projectId: null, projectData: null, projectName: null }, "");
      // Restore project from saved data
      const restoreProject = async () => {
        setIsProcessing(true);
        setLoadMsg("Loading project...");
        try {
          // Load full project data from Supabase if not provided
          let pData = projectData;
          if (!pData && user?.id) {
            pData = await loadProject(projectId, user.id);
          }
          if (!pData) { notify("error", "Could not load project data"); return; }

          const pName = projectName || pData.name || "Untitled Project";
          setProjectName(sanitizeTextInput(pName, { maxLength: 100 }) || "Untitled Project");
          setProjectId(projectId);
          if (pData.resolution) setProjectResolution(pData.resolution);

          // Restore clips from project_data
          const savedClips = pData.project_data?.clips || pData.clips || [];
          if (savedClips.length === 0) {
            notify("info", `Loaded project "${pName}" (no clips)`);
            return;
          }

          // Group clips by mediaId to avoid re-downloading the same media
          const mediaMap = new Map(); // mediaId → { blobUrl, file }
          const restoredClips = [];
          let loadedCount = 0;

          for (const clipData of savedClips) {
            setLoadSub(`Restoring clip ${++loadedCount} of ${savedClips.length}`);

            // Try to get media for this clip
            let blobUrl = null;
            let file = null;

            if (clipData.mediaId && mediaMap.has(clipData.mediaId)) {
              // Already loaded this media
              const cached = mediaMap.get(clipData.mediaId);
              blobUrl = cached.blobUrl;
              file = cached.file;
            } else if (clipData.storagePath && user?.id) {
              // Download from Supabase storage
              try {
                const url = await getProjectMediaUrl(clipData.storagePath);
                const response = await fetch(url);
                if (response.ok) {
                  const blob = await response.blob();
                  file = new File([blob], clipData.name || 'media', { type: blob.type });
                  blobUrl = URL.createObjectURL(blob);
                }
              } catch (e) {
                console.warn("Failed to download media:", clipData.storagePath, e);
              }
            }

            if (blobUrl && clipData.mediaId) {
              mediaMap.set(clipData.mediaId, { blobUrl, file });
            }

            // Reconstruct clip with all saved properties + restored media
            restoredClips.push({
              ...DEFAULT_CLIP_PROPERTIES,
              ...clipData,
              file: file || null,
              blobUrl: blobUrl || null,
              thumbnail: null,
            });
          }

          // Reconstruct media items from unique media references
          const newMediaItems = [];
          const seenMedia = new Set();
          for (const clip of restoredClips) {
            if (clip.mediaId && !seenMedia.has(clip.mediaId) && clip.blobUrl) {
              seenMedia.add(clip.mediaId);
              newMediaItems.push({
                id: clip.mediaId,
                name: clip.name,
                file: clip.file,
                blobUrl: clip.blobUrl,
                thumbnail: null,
                duration: clip.duration,
                width: 0,
                height: 0,
                type: clip.type || 'video',
                isProcessing: false,
              });
            }
          }

          setMediaItems(newMediaItems);
          setClips(restoredClips);
          notify("success", `Loaded "${pName}" (${restoredClips.length} clips)`);
        } catch (e) {
          console.error("Project load error:", e);
          notify("error", "Failed to load project");
        } finally {
          setIsProcessing(false);
          setLoadMsg("");
          setLoadSub("");
        }
      };
      restoreProject();
    }
  }, []); // eslint-disable-line

  // ---- Preload WASM files to browser cache (full init deferred to first export/trim) ----
  useEffect(() => {
    void ffmpeg.preload();
  }, []); // eslint-disable-line

  // ---- Global shortcuts ----
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "s") { e.preventDefault(); }
      if (mod && e.key === "e") { e.preventDefault(); clips.length > 0 && handleExport("1080p"); }
      if (mod && e.key === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      if (mod && e.key === "y") { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [handleExport, undo, redo, clips.length, pb]);

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
    <div style={{ ...styles.root, ...(isMobile ? { height: '100dvh', paddingBottom: '56px' } : {}) }} role="application" aria-label="ClipCut Video Editor">
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{VIDEO_EDITOR_CSS}</style>

      {/* Skip link for keyboard/screen reader users */}
      <a href="#editor-timeline" className="skip-link">Skip to timeline</a>

      {/* ARIA live region for status announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        {isExporting ? `Exporting video... ${ffmpeg.progress}%` : loadMsg || ''}
      </div>

      <TopBar
        projectName={projectName} onProjectNameChange={setProjectName}
        onExport={handleExport} isExporting={isExporting} exportProgress={ffmpeg.progress} currentOperation={ffmpeg.currentOperation}
        hasMediaToExport={clips.filter(c => c.type !== "audio" && c.file).length > 0} resolutions={ffmpeg.resolutions} exportPresets={ffmpeg.exportPresets}
        lastSaved={lastSaved} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
        onCancelExport={ffmpeg.cancelOperation}
        onNewProject={handleNewProject} onSave={handleSave} onSettings={handleSettings}
        editorLayout={editorLayout} onLayoutChange={setEditorLayout}
        forceOpenExport={forceExport > 0} onExportModalClosed={() => setForceExport(0)}
      />
      {!isMobile && <Toolbar activeToolbar={activeToolbar} onToolbarChange={setActiveToolbar} />}

      <main aria-label="Editor workspace" style={{ flex: isMobile ? 1 : (editorLayout === 'wide-timeline' ? '0 0 55%' : 1), display: "flex", flexDirection: isMobile ? "column" : "row", minWidth: 0, minHeight: 0, overflow: "hidden" }}>
        {editorLayout !== 'compact' && !isMobile && (
          <>
            <ErrorBoundary name="media-panel" inline message="Media panel encountered an error">
              <Suspense fallback={<PanelLoadingFallback width={`${mediaPanelWidth || DEFAULT_MEDIA_W}px`} />}>
                <MediaPanel
                  mediaTab={mediaTab} onMediaTabChange={setMediaTab}
                  mediaItems={mediaItems} onImportMedia={importMedia} onRemoveMedia={removeMedia}
                  onAddToTimeline={addToTimeline} selectedMediaId={selectedMediaId} onSelectMedia={setSelectedMediaId}
                  isImporting={isImporting}
                  style={{ width: `${mediaPanelWidth || DEFAULT_MEDIA_W}px` }}
                />
              </Suspense>
            </ErrorBoundary>
            <div className="resize-handle resize-handle-v" onMouseDown={(e) => onMediaDrag(e, mediaPanelWidth || DEFAULT_MEDIA_W)} onDoubleClick={() => setMediaPanelWidth(null)}>
              <div className="resize-handle-dot resize-handle-dot-v" />
            </div>
          </>
        )}
        <ErrorBoundary name="player" inline message="Video player encountered an error">
          <Suspense fallback={<PanelLoadingFallback width="auto" height="100%" />}>
            <Player
              isPlaying={pb.isPlaying} onPlayPause={pb.togglePlay}
              videoSrc={previewSrc} currentTime={pb.clipOffset}
              onTimeUpdate={onTimeUpdate} onSeek={onSeek} onEnded={onEnded}
              onVideoError={handleVideoFormatError}
              clipProperties={pb.currentClip || selectedClip}
            />
          </Suspense>
        </ErrorBoundary>
        {editorLayout !== 'compact' && !isMobile && (
          <>
            <div className="resize-handle resize-handle-v" onMouseDown={(e) => onInspectorDrag(e, inspectorWidth || DEFAULT_INSPECTOR_W)} onDoubleClick={() => setInspectorWidth(null)}>
              <div className="resize-handle-dot resize-handle-dot-v" />
            </div>
            <ErrorBoundary name="inspector" inline message="Inspector panel encountered an error">
              <Suspense fallback={<PanelLoadingFallback width={`${inspectorWidth || DEFAULT_INSPECTOR_W}px`} />}>
                <InspectorPanel
                  rightTab={rightTab} onRightTabChange={setRightTab}
                  rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                  selectedClip={selectedClip} onClipUpdate={updateClip}
                  bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                  onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  style={{ width: `${inspectorWidth || DEFAULT_INSPECTOR_W}px` }}
                />
              </Suspense>
            </ErrorBoundary>
          </>
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
                  <InspectorPanel
                    rightTab="text" onRightTabChange={setRightTab}
                    rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                    onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  />
                )}
                {mobileActiveTab === 'audio' && (
                  <InspectorPanel
                    rightTab="audio" onRightTabChange={setRightTab}
                    rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                    onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  />
                )}
                {mobileActiveTab === 'stickers' && (
                  <InspectorPanel
                    rightTab="stickers" onRightTabChange={setRightTab}
                    rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                    onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  />
                )}
                {mobileActiveTab === 'effects' && (
                  <InspectorPanel
                    rightTab="effects" onRightTabChange={setRightTab}
                    rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                    onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  />
                )}
                {mobileActiveTab === 'filters' && (
                  <InspectorPanel
                    rightTab="effects" onRightTabChange={setRightTab}
                    rightSubTab="filters" onRightSubTabChange={setRightSubTab}
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                    onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  />
                )}
                {mobileActiveTab === 'inspector' && (
                  <InspectorPanel
                    rightTab={rightTab} onRightTabChange={setRightTab}
                    rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                    selectedClip={selectedClip} onClipUpdate={updateClip}
                    bgMusic={bgMusic} onImportBgMusic={importBgMusic}
                    onUpdateBgMusicVolume={updateBgMusicVolume} onRemoveBgMusic={removeBgMusic}
                  />
                )}
              </Suspense>
            </ErrorBoundary>
          </BottomSheet>
          <nav className="mobile-tab-bar" aria-label="Editor tools">
            {[
              { id: 'media', icon: 'perm_media', label: 'Media' },
              { id: 'text', icon: 'title', label: 'Text' },
              { id: 'audio', icon: 'music_note', label: 'Audio' },
              { id: 'stickers', icon: 'emoji_emotions', label: 'Stickers' },
              { id: 'effects', icon: 'auto_fix_high', label: 'Effects' },
              { id: 'filters', icon: 'filter_vintage', label: 'Filters' },
            ].map(tab => (
              <button
                key={tab.id}
                className={mobileActiveTab === tab.id ? 'active' : ''}
                onClick={() => {
                  if (mobileActiveTab === tab.id) {
                    setMobileDrawerOpen(v => !v);
                  } else {
                    setMobileActiveTab(tab.id);
                    setMobileDrawerOpen(true);
                  }
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: mobileActiveTab === tab.id ? '#75AADB' : undefined }}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </>
      )}

      {!isMobile && (
        <div className="resize-handle resize-handle-h" onMouseDown={(e) => onTimelineDrag(e, timelineHeight || DEFAULT_TIMELINE_H)} onDoubleClick={() => setTimelineHeight(null)}>
          <div className="resize-handle-dot" />
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
          />
        </Suspense>
      </ErrorBoundary>

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