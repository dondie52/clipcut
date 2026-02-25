import { useState, useEffect, useCallback, useMemo, useReducer, useRef, memo } from "react";
import { useLocation } from "react-router-dom";
import TopBar from './TopBar';
import Toolbar from './Toolbar';
import MediaPanel from './MediaPanel';
import Player from './Player';
import InspectorPanel from './InspectorPanel';
import Timeline from './Timeline';
import { styles } from './styles';
import { SCROLLBAR_CSS } from './constants';
import { useFFmpeg } from '../../hooks/useFFmpeg';
import { useAuth } from '../../supabase/AuthContext';
import { saveProject, loadProject } from '../../services/projectService';
import { 
  MAX_UNDO_HISTORY, 
  AUTO_SAVE_INTERVAL, 
  DEFAULT_CLIP_DURATION,
  TOAST_AUTO_CLOSE_DELAY,
  TOAST_ANIMATION_DURATION 
} from '../../constants';

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
const LoadingOverlay = memo(({ message, progress, subMessage }) => (
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
          <p style={{ color: "#75aadb", fontSize: "13px", fontWeight: 700, margin: 0 }}>{progress}%</p>
        </>
      )}
    </div>
  </div>
));
LoadingOverlay.displayName = "LoadingOverlay";

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
  const [isSaving, setIsSaving] = useState(false);
  const projectIdRef = useRef(projectId);

  // Update ref when projectId changes
  useEffect(() => {
    projectIdRef.current = projectId;
  }, [projectId]);

  useEffect(() => {
    if (clips.length === 0) return;
    
    const doSave = async () => {
      if (isSaving) return;
      setIsSaving(true);
      
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
        setIsSaving(false);
      }
    };
    
    const timer = setInterval(doSave, interval);
    return () => clearInterval(timer);
  }, [projectName, clips, userId, totalDuration, resolution, interval, isSaving]);

  // Return both lastSaved and the current projectId
  return { lastSaved, projectId: projectIdRef.current, isSaving };
};

/* ========== PLAYBACK ENGINE ========== */
const usePlaybackEngine = (clips, totalDuration) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const rafRef = useRef(null);
  const lastTickRef = useRef(0);
  const speedRef = useRef(1);

  const getClipAtTime = useCallback((t) => {
    const vClips = clips.filter(c => c.type !== "audio").sort((a, b) => a.startTime - b.startTime);
    for (const c of vClips) { if (t >= c.startTime && t < c.startTime + c.duration) return c; }
    return vClips.find(c => c.startTime > t) || vClips[vClips.length - 1] || null;
  }, [clips]);

  const currentClip = useMemo(() => getClipAtTime(currentTime), [getClipAtTime, currentTime]);
  const clipOffset = useMemo(() => currentClip ? Math.max(0, currentTime - currentClip.startTime) : 0, [currentClip, currentTime]);

  // RAF playback loop
  useEffect(() => {
    if (!isPlaying) { if (rafRef.current) cancelAnimationFrame(rafRef.current); return; }
    lastTickRef.current = performance.now();
    const tick = (now) => {
      const dt = (now - lastTickRef.current) / 1000 * speedRef.current;
      lastTickRef.current = now;
      setCurrentTime(prev => {
        const next = prev + dt;
        if (next >= totalDuration) { setIsPlaying(false); return totalDuration; }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying, totalDuration]);

  const seek = useCallback((t) => setCurrentTime(Math.max(0, Math.min(totalDuration, t))), [totalDuration]);
  const togglePlay = useCallback(() => setIsPlaying(p => !p), []);
  const stop = useCallback(() => { setIsPlaying(false); setCurrentTime(0); }, []);
  const setSpeed = useCallback((s) => { speedRef.current = s; }, []);

  return { currentTime, currentClip, clipOffset, isPlaying, seek, togglePlay, stop, setIsPlaying, setSpeed, setCurrentTime };
};

/* ========== MAIN VIDEO EDITOR ========== */
const VideoEditor = () => {
  const location = useLocation();
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
  const { lastSaved, projectId: savedProjectId, isSaving } = useAutoSave(
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
            ffmpeg.generateThumbnail(file, 0).then(b => {
              const u = URL.createObjectURL(b);
              setMediaItems(p => p.map(m => m.id === id ? { ...m, thumbnail: u } : m));
            }).catch(() => {});
          }
        } catch (e) {
          console.error("Error processing:", e);
          setMediaItems(p => p.map(m => m.id === id ? { ...m, isProcessing: false } : m));
        }
      }
      notify("success", `Imported ${files.length} file${files.length > 1 ? "s" : ""}`);
    } catch (e) { notify("error", `Import failed: ${e.message}`); }
    finally { setIsImporting(false); setLoadMsg(""); setLoadSub(""); }
  }, [ffmpeg, notify]);

  // ---- Remove media ----
  const removeMedia = useCallback((id) => {
    setMediaItems(p => { const item = p.find(m => m.id === id); if (item) requestAnimationFrame(() => { if (item.blobUrl) URL.revokeObjectURL(item.blobUrl); if (item.thumbnail) URL.revokeObjectURL(item.thumbnail); }); return p.filter(m => m.id !== id); });
    setClips(p => p.filter(c => c.mediaId !== id));
    if (selectedMediaId === id) setSelectedMediaId(null);
  }, [selectedMediaId, setClips]);

  // ---- Split ----
  const splitClip = useCallback(async (clipId, splitTime) => {
    const clip = clips.find(c => c.id === clipId);
    if (!clip?.file) return;
    setIsProcessing(true); setLoadMsg("Splitting clip...");
    try {
      const { part1, part2 } = await ffmpeg.splitVideo(clip.file, splitTime);
      const c1 = { ...clip, id: genId(), name: `${clip.name} (1)`, duration: splitTime, file: part1, blobUrl: URL.createObjectURL(part1) };
      const c2 = { ...clip, id: genId(), name: `${clip.name} (2)`, startTime: clip.startTime + splitTime, duration: clip.duration - splitTime, file: part2, blobUrl: URL.createObjectURL(part2) };
      setClips(p => { const i = p.findIndex(c => c.id === clipId); const n = [...p]; n.splice(i, 1, c1, c2); return n; });
      if (clip.blobUrl) requestAnimationFrame(() => URL.revokeObjectURL(clip.blobUrl));
      setSelectedClipId(c1.id);
      notify("success", "Clip split");
    } catch (e) { notify("error", `Split failed: ${e.message}`); }
    finally { setIsProcessing(false); setLoadMsg(""); }
  }, [clips, ffmpeg, setClips, notify]);

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
    } catch (e) { notify("error", `Trim failed: ${e.message}`); }
    finally { setIsProcessing(false); setLoadMsg(""); }
  }, [clips, ffmpeg, setClips, notify]);

  // ---- Export ----
  const handleExport = useCallback(async (res) => {
    if (clips.length === 0) { 
      notify("warning", "No clips to export. Add media to the timeline first."); 
      return; 
    }
    
    // Filter for video clips and check they have files
    const vClips = clips.filter(c => c.type !== "audio" && c.file).sort((a, b) => a.startTime - b.startTime);
    if (vClips.length === 0) { 
      notify("warning", "No video clips with valid files. Make sure your clips are properly loaded."); 
      return; 
    }
    
    // Pause video playback before starting export to prevent conflicts
    if (pb.isPlaying) {
      pb.setIsPlaying(false);
    }
    
    setIsExporting(true); 
    setLoadMsg("Preparing export...");
    
    try {
      // Ensure FFmpeg is initialized
      if (!ffmpeg.isReady) {
        setLoadMsg("Initializing FFmpeg...");
        const initialized = await ffmpeg.initialize();
        if (!initialized) {
          throw new Error("Failed to initialize FFmpeg. Please refresh the page and try again.");
        }
      }
      
      let blob;
      if (vClips.length === 1) { 
        setLoadMsg(`Exporting at ${res}...`); 
        if (!vClips[0].file) {
          throw new Error("Clip file is missing. Please re-import the media.");
        }
        blob = await ffmpeg.exportVideo(vClips[0].file, res); 
      } else { 
        setLoadMsg(`Merging ${vClips.length} clips...`); 
        const filesToMerge = vClips.map(c => c.file).filter(f => f);
        if (filesToMerge.length === 0) {
          throw new Error("No valid clip files to merge.");
        }
        const m = await ffmpeg.mergeClips(filesToMerge); 
        setLoadMsg(`Exporting at ${res}...`); 
        blob = await ffmpeg.exportVideo(m, res); 
      }
      
      if (!blob || blob.size === 0) {
        throw new Error("Export produced an empty file. Please try again.");
      }
      
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
      notify("error", `Export failed: ${e.message || "Unknown error. Please check the console for details."}`); 
    } finally { 
      setIsExporting(false); 
      setLoadMsg(""); 
    }
  }, [clips, projectName, ffmpeg, notify]);

  // ---- Player callbacks ----
  const onSeek = useCallback((t) => {
    pb.currentClip && t < pb.currentClip.duration ? pb.seek(pb.currentClip.startTime + t) : pb.seek(t);
  }, [pb]);

  const onTimeUpdate = useCallback((t) => {
    pb.currentClip ? pb.setCurrentTime(pb.currentClip.startTime + t) : pb.setCurrentTime(t);
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
      notify("error", `Conversion failed: ${e.message}`);
    } finally {
      convertingBlobUrls.current.delete(blobUrl);
      setIsProcessing(false);
      setLoadMsg("");
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
      // Set project name
      if (projectName) setProjectName(projectName);
      // Load project data would require loading media items first
      // For now, just set the project name
      console.log("Loading project:", projectId);
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
  }, [handleExport, undo, redo, clips.length]);

  // ---- Cleanup ----
  useEffect(() => () => {
    mediaItems.forEach(m => { if (m.blobUrl) URL.revokeObjectURL(m.blobUrl); if (m.thumbnail) URL.revokeObjectURL(m.thumbnail); });
    clips.forEach(c => { if (c.blobUrl) URL.revokeObjectURL(c.blobUrl); });
  }, []); // eslint-disable-line

  return (
    <div style={styles.root}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />
      <style>{VIDEO_EDITOR_CSS}</style>

      <TopBar
        projectName={projectName} onProjectNameChange={setProjectName}
        onExport={handleExport} isExporting={isExporting} exportProgress={ffmpeg.progress}
        hasMediaToExport={clips.filter(c => c.type !== "audio" && c.file).length > 0} resolutions={ffmpeg.resolutions}
        lastSaved={lastSaved} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
      />
      <Toolbar activeToolbar={activeToolbar} onToolbarChange={setActiveToolbar} />

      <main style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <MediaPanel
          mediaTab={mediaTab} onMediaTabChange={setMediaTab}
          mediaItems={mediaItems} onImportMedia={importMedia} onRemoveMedia={removeMedia}
          onAddToTimeline={addToTimeline} selectedMediaId={selectedMediaId} onSelectMedia={setSelectedMediaId}
          isImporting={isImporting}
        />
        <Player
          isPlaying={pb.isPlaying} onPlayPause={pb.togglePlay}
          videoSrc={previewSrc} currentTime={pb.clipOffset}
          onTimeUpdate={onTimeUpdate} onSeek={onSeek} onEnded={onEnded}
          onVideoError={handleVideoFormatError}
        />
        <InspectorPanel
          rightTab={rightTab} onRightTabChange={setRightTab}
          rightSubTab={rightSubTab} onRightSubTabChange={setRightSubTab}
          selectedClip={selectedClip} onClipUpdate={updateClip}
        />
      </main>

      <Timeline
        clips={clips} selectedClipId={selectedClipId} onSelectClip={setSelectedClipId}
        onUpdateClip={updateClip} onDeleteClip={deleteClip} onSplitClip={splitClip} onTrimClip={trimClip}
        currentTime={pb.currentTime} onSeek={pb.seek} totalDuration={totalDuration}
        isProcessing={isProcessing} canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
        mediaItems={mediaItems} onAddToTimeline={addToTimeline}
      />

      {(ffmpeg.isLoading || loadMsg) && <LoadingOverlay message={loadMsg || "Loading FFmpeg..."} progress={ffmpeg.progress} subMessage={loadSub} />}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} autoClose={toast.type !== "error"} />}
    </div>
  );
};

export default memo(VideoEditor);