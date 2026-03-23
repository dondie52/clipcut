import { useState, useEffect, useCallback, useMemo, useReducer, useRef, memo, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from './TopBar';
import Toolbar from './Toolbar';
import { styles } from './styles';
import { SCROLLBAR_CSS } from './constants';
import { useFFmpeg } from '../../hooks/useFFmpeg';
import { useAuth } from '../../supabase/AuthContext';
import { saveProject, loadProject } from '../../services/projectService';
import { getCachedThumbnail, cacheThumbnail } from '../../utils/thumbnailCache';
import { sanitizeTextInput } from '../../utils/validation';
import { getUserFriendlyMessage } from '../../utils/errorHandling';
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
  ${SCROLLBAR_CSS}
`;

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

  // Update ref when projectId changes
  useEffect(() => {
    projectIdRef.current = projectId;
  }, [projectId]);

  useEffect(() => {
    if (clips.length === 0) return;

    const doSave = async () => {
      if (isSavingRef.current) return;
      isSavingRef.current = true;

      try {
        const projectData = {
          id: projectIdRef.current,
          name: projectName,
          clips: clips.map(c => ({
            id: c.id,
            mediaId: c.mediaId,
            name: c.name,
            type: c.type,
            startTime: c.startTime,
            duration: c.duration,
            storagePath: c.storagePath || null,
          })),
          duration: totalDuration,
          resolution: resolution || '1080p',
        };

        // Save to cloud if user is authenticated, otherwise localStorage
        if (userId) {
          const saved = await saveProject(userId, projectData);
          // Update projectId ref if this was a new project
          if (!projectIdRef.current && saved.id) {
            projectIdRef.current = saved.id;
          }
        } else {
          // Fallback to localStorage for unauthenticated users
          const data = {
            projectName,
            clips: projectData.clips,
            savedAt: new Date().toISOString(),
          };
          localStorage.setItem(`clipcut_autosave_${projectName}`, JSON.stringify(data));
        }

        setLastSaved(new Date());
      } catch (e) {
        console.warn("Auto-save failed:", e);
      } finally {
        isSavingRef.current = false;
      }
    };

    const timer = setInterval(doSave, interval);
    return () => clearInterval(timer);
  }, [projectName, clips, userId, totalDuration, resolution, interval]);

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

  // Media library
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  // Timeline (with undo/redo)
  const [tlState, tlDispatch] = useReducer(timelineReducer, { clips: [], past: [], future: [] });
  const clips = tlState.clips;
  const canUndo = tlState.past.length > 0;
  const canRedo = tlState.future.length > 0;
  const [selectedClipId, setSelectedClipId] = useState(null);

  const totalDuration = useMemo(() => {
    if (clips.length === 0) return 30;
    return Math.max(30, Math.max(...clips.map(c => c.startTime + c.duration)) + 10);
  }, [clips]);

  // Playback
  const pb = usePlaybackEngine(clips, totalDuration);

  // Processing
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
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
  const setClips = useCallback((fn) => {
    const next = typeof fn === "function" ? fn(tlState.clips) : fn;
    tlDispatch({ type: "SET_CLIPS", clips: next });
  }, [tlState.clips]);

  const undo = useCallback(() => tlDispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => tlDispatch({ type: "REDO" }), []);

  const updateClip = useCallback((id, u) => setClips(p => p.map(c => c.id === id ? { ...c, ...u } : c)), [setClips]);
  const deleteClip = useCallback((id) => { setClips(p => p.filter(c => c.id !== id)); if (selectedClipId === id) setSelectedClipId(null); }, [setClips, selectedClipId]);

  const addToTimeline = useCallback((mi, startTime = null) => {
    let start = startTime;
    if (start === null) {
      const same = clips.filter(c => c.type === mi.type);
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
  }, [clips, setClips]);

  // ---- Import ----
  const importMedia = useCallback(async (files) => {
    setIsImporting(true);
    try {
      if (!ffmpeg.isReady) { setLoadMsg("Initializing FFmpeg..."); await ffmpeg.initialize(); }
      let n = 0;
      for (const file of files) {
        setLoadMsg(`Importing ${file.name}...`);
        setLoadSub(`${++n} of ${files.length}`);
        const id = genId();
        const blobUrl = URL.createObjectURL(file);
        const isAudio = file.type.startsWith("audio/");
        setMediaItems(p => [...p, { id, name: file.name, file, blobUrl, thumbnail: null, duration: 0, width: 0, height: 0, type: isAudio ? "audio" : "video", isProcessing: true }]);
        try {
          const info = await ffmpeg.getVideoInfo(file);
          setMediaItems(p => p.map(m => m.id === id ? { ...m, duration: info.duration, width: info.width, height: info.height, isProcessing: false } : m));
          if (!isAudio) {
            const videoId = `${file.name}_${file.size}_${file.lastModified}`;
            getCachedThumbnail(videoId, 0).then(async (cached) => {
              const blob = cached || await ffmpeg.generateThumbnail(file, 0);
              if (!cached) cacheThumbnail(videoId, 0, blob).catch(() => {});
              const u = URL.createObjectURL(blob);
              setMediaItems(p => p.map(m => m.id === id ? { ...m, thumbnail: u } : m));
            }).catch(() => {});
          }
        } catch (e) {
          console.error("Error processing:", e);
          setMediaItems(p => p.map(m => m.id === id ? { ...m, isProcessing: false } : m));
        }
      }
      notify("success", `Imported ${files.length} file${files.length > 1 ? "s" : ""}`);
    } catch (e) { notify("error", getUserFriendlyMessage(e, 'ffmpeg')); }
    finally { setIsImporting(false); setLoadMsg(""); setLoadSub(""); }
  }, [ffmpeg, notify]);

  // ---- Remove media ----
  const removeMedia = useCallback((id) => {
    setMediaItems(p => { const item = p.find(m => m.id === id); if (item) requestAnimationFrame(() => { if (item.blobUrl) URL.revokeObjectURL(item.blobUrl); if (item.thumbnail) URL.revokeObjectURL(item.thumbnail); }); return p.filter(m => m.id !== id); });
    setClips(p => p.filter(c => c.mediaId !== id));
    if (selectedMediaId === id) setSelectedMediaId(null);
  }, [selectedMediaId, setClips]);

  // ---- Split (non-destructive — instant, no FFmpeg) ----
  const splitClip = useCallback((clipId, splitTime) => {
    const clip = clips.find(c => c.id === clipId);
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
  }, [clips, setClips, notify]);

  // ---- Trim ----
  const trimClip = useCallback(async (clipId, start, dur) => {
    const clip = clips.find(c => c.id === clipId);
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
  }, [clips, ffmpeg, setClips, notify]);

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

    const noEffects = !hasSpeedChange && !hasBrightnessContrast && !hasSaturation && !hasRotation && !hasVolume && !hasFade && !hasFilter && !hasTrim && !hasEffects;
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

  // ---- Export ----
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

    if (pb.isPlaying) pb.setIsPlaying(false);

    setIsExporting(true);
    setLoadMsg("Preparing export...");

    try {
      if (!ffmpeg.isReady) {
        setLoadMsg("Initializing FFmpeg...");
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

      let blob;
      if (processedFiles.length === 1) {
        setLoadMsg(`Exporting at ${res}...`);
        blob = await ffmpeg.exportVideo(processedFiles[0], res);
      } else {
        setLoadMsg(`Merging ${processedFiles.length} clips...`);
        const m = await ffmpeg.mergeClips(processedFiles);
        setLoadMsg(`Exporting at ${res}...`);
        blob = await ffmpeg.exportVideo(m, res);
      }

      if (!blob || blob.size === 0) throw new Error("Export produced an empty file. Please try again.");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${projectName.replace(/[^a-z0-9]/gi, "_")}_${res}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      notify("success", `Exported at ${res}`);
    } catch (e) {
      console.error("Export error:", e);
      notify("error", getUserFriendlyMessage(e, 'ffmpeg'));
    } finally {
      setIsExporting(false);
      setLoadMsg("");
      setLoadSub("");
      ffmpeg.resetProgress();
    }
  }, [clips, projectName, ffmpeg, pb, notify, applyClipEffects]);

  // ---- Player callbacks ----
  const onSeek = useCallback((t) => {
    pb.currentClip && t < pb.currentClip.duration ? pb.seek(pb.currentClip.startTime + t) : pb.seek(t);
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
    
    if (projectId && projectData) {
      window.history.replaceState({ ...location.state, projectId: null, projectData: null, projectName: null }, "");
      // Sanitize and set project name (max 100 chars, remove HTML, trim)
      if (projectName) {
        const sanitizedName = sanitizeTextInput(projectName, { maxLength: 100 });
        setProjectName(sanitizedName || "Untitled Project");
      }
      // Load project data would require loading media items first
      // For now, just set the project name
      console.log("Loading project:", projectId);
    }
  }, []); // eslint-disable-line

  // ---- Warm FFmpeg cache + init in background (first visit still pays WASM compile cost) ----
  useEffect(() => {
    void ffmpeg.preload();
    if (!ffmpeg.isReady) {
      ffmpeg.initialize().catch(() => {});
    }
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
    <div style={styles.root}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{VIDEO_EDITOR_CSS}</style>

      <TopBar
        projectName={projectName} onProjectNameChange={setProjectName}
        onExport={handleExport} isExporting={isExporting} exportProgress={ffmpeg.progress} currentOperation={ffmpeg.currentOperation}
        hasMediaToExport={clips.filter(c => c.type !== "audio" && c.file).length > 0} resolutions={ffmpeg.resolutions}
        lastSaved={lastSaved} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
        onCancelExport={ffmpeg.cancelOperation}
        onNewProject={handleNewProject} onSave={handleSave} onSettings={handleSettings}
        editorLayout={editorLayout} onLayoutChange={setEditorLayout}
      />
      <Toolbar activeToolbar={activeToolbar} onToolbarChange={setActiveToolbar} />

      <main style={{ flex: editorLayout === 'wide-timeline' ? '0 0 55%' : 1, display: "flex", overflow: "hidden" }}>
        {editorLayout !== 'compact' && (
          <ErrorBoundary name="media-panel" inline message="Media panel encountered an error">
            <Suspense fallback={<PanelLoadingFallback width="280px" />}>
              <MediaPanel
                mediaTab={mediaTab} onMediaTabChange={setMediaTab}
                mediaItems={mediaItems} onImportMedia={importMedia} onRemoveMedia={removeMedia}
                onAddToTimeline={addToTimeline} selectedMediaId={selectedMediaId} onSelectMedia={setSelectedMediaId}
                isImporting={isImporting}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        <ErrorBoundary name="player" inline message="Video player encountered an error">
          <Suspense fallback={<PanelLoadingFallback width="auto" height="100%" />}>
            <Player
              isPlaying={pb.isPlaying} onPlayPause={pb.togglePlay}
              videoSrc={previewSrc} currentTime={pb.clipOffset}
              onTimeUpdate={onTimeUpdate} onSeek={onSeek} onEnded={onEnded}
              onVideoError={handleVideoFormatError}
              clipProperties={pb.currentClip || selectedClip}
              nextClipSrc={pb.nextClip?.blobUrl || null}
              nextClipSeekTo={pb.nextClip?.trimStart || 0}
            />
          </Suspense>
        </ErrorBoundary>
        {editorLayout !== 'compact' && (
          <ErrorBoundary name="inspector" inline message="Inspector panel encountered an error">
            <Suspense fallback={<PanelLoadingFallback width="300px" />}>
              <InspectorPanel
                rightTab={rightTab} onRightTabChange={setRightTab}
                rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
                selectedClip={selectedClip} onClipUpdate={updateClip}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      <ErrorBoundary name="timeline" inline message="Timeline encountered an error">
        <Suspense fallback={<TimelineLoadingFallback />}>
          <Timeline
            clips={clips} selectedClipId={selectedClipId} onSelectClip={setSelectedClipId}
            onUpdateClip={updateClip} onDeleteClip={deleteClip} onSplitClip={splitClip}
            currentTime={pb.currentTime} onSeek={pb.seek} totalDuration={totalDuration}
            isProcessing={isProcessing} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
            mediaItems={mediaItems} onAddToTimeline={addToTimeline}
          />
        </Suspense>
      </ErrorBoundary>

      {/* Non-blocking thin bar during initial FFmpeg WASM load */}
      {ffmpeg.isLoading && !ffmpeg.currentOperation && !loadMsg && <FFmpegInitBar progress={ffmpeg.loadProgress} />}
      {/* Full-screen overlay only during active operations (import, export, trim, etc.) */}
      {(loadMsg || ffmpeg.currentOperation) && <LoadingOverlay message={loadMsg || "Processing..."} progress={ffmpeg.currentOperation != null ? ffmpeg.progress : ffmpeg.loadProgress} operationLabel={ffmpeg.currentOperation ? `${ffmpeg.currentOperation}...` : ''} subMessage={loadSub} onCancel={ffmpeg.currentOperation ? ffmpeg.cancelOperation : undefined} />}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} autoClose={toast.type !== "error"} />}
    </div>
  );
};

export default memo(VideoEditor);