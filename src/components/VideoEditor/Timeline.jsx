import { useState, useRef, useEffect, useCallback, useMemo, useLayoutEffect, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { SCROLLBAR_CSS } from './constants';
import {
  zoomToPxPerSec, timeToX, xToTime,
  collectSnapTargets, snapToNearest, snapClipEdges,
  generateMarkers, formatTimecode, formatDuration,
  MIN_CLIP_DURATION, DRAG_THRESHOLD_PX,
} from './timelineEngine';

/* ========== CSS ANIMATIONS ========== */
const TIMELINE_CSS = `
  ${SCROLLBAR_CSS}

  @keyframes pulse-border {
    0%, 100% { border-color: rgba(117, 170, 219, 0.3); }
    50% { border-color: rgba(117, 170, 219, 0.8); }
  }

  @keyframes drop-zone-glow {
    0%, 100% { box-shadow: inset 0 0 20px rgba(117, 170, 219, 0.1); }
    50% { box-shadow: inset 0 0 30px rgba(117, 170, 219, 0.25); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes playhead-pulse {
    0%, 100% { box-shadow: 0 0 8px rgba(117, 170, 219, 0.6); }
    50% { box-shadow: 0 0 16px rgba(117, 170, 219, 0.9), 0 0 4px rgba(117, 170, 219, 0.4); }
  }

  .timeline-track-empty {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .timeline-track-empty:hover {
    border-color: rgba(117, 170, 219, 0.4) !important;
    background: rgba(117, 170, 219, 0.05) !important;
  }
  .timeline-track-dragover {
    border-color: #75aadb !important;
    background: rgba(117, 170, 219, 0.15) !important;
    animation: drop-zone-glow 1.5s ease-in-out infinite;
  }

  .timeline-clip {
    transition: box-shadow 0.15s ease, border-color 0.12s ease, opacity 0.12s ease;
    will-change: left, width;
  }
  .timeline-clip:hover:not(.tl-dragging):not(.tl-resizing) {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(117, 170, 219, 0.25);
    z-index: 10;
  }
  .timeline-clip.tl-dragging {
    opacity: 0.8;
    box-shadow: 0 8px 24px rgba(117, 170, 219, 0.35);
    z-index: 100 !important;
    pointer-events: none;
  }
  .timeline-clip.tl-resizing {
    z-index: 100 !important;
  }
  .timeline-clip.tl-selected {
    z-index: 5;
    box-shadow: 0 0 0 1.5px rgba(117, 170, 219, 0.7), 0 2px 12px rgba(117, 170, 219, 0.2);
  }

  .clip-resize-handle {
    opacity: 0;
    transition: opacity 0.15s ease, width 0.1s ease;
  }
  .timeline-clip:hover .clip-resize-handle,
  .timeline-clip.tl-selected .clip-resize-handle {
    opacity: 1;
  }
  .clip-resize-handle:hover {
    width: 10px !important;
    background: rgba(117, 170, 219, 0.9) !important;
  }
  .clip-resize-handle:active {
    width: 12px !important;
    background: #75aadb !important;
  }

  .track-control-btn {
    transition: all 0.12s ease;
    border-radius: 3px;
  }
  .track-control-btn:hover {
    transform: scale(1.15);
    background: rgba(117, 170, 219, 0.1);
  }

  .tl-playhead {
    transition: left 0.05s linear;
  }
  .tl-playhead.scrubbing {
    transition: none;
  }

  .timeline-toolbar-btn {
    transition: all 0.12s ease;
    border-radius: 4px;
    padding: 5px;
  }
  .timeline-toolbar-btn:hover:not(:disabled) {
    background: rgba(117, 170, 219, 0.12);
    color: #75aadb;
  }
  .timeline-toolbar-btn:active:not(:disabled) {
    transform: scale(0.93);
  }
  .timeline-toolbar-btn:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
  .timeline-toolbar-btn.active-tool {
    background: rgba(117, 170, 219, 0.15);
  }

  .tl-snap-line {
    pointer-events: none;
    box-shadow: 0 0 6px rgba(245, 158, 11, 0.6);
  }

  .zoom-slider {
    -webkit-appearance: none;
    appearance: none;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    height: 3px;
    outline: none;
  }
  .zoom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #75aadb;
    border: 2px solid rgba(255,255,255,0.2);
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .zoom-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(117, 170, 219, 0.5);
  }

  .minimap { transition: opacity 0.2s ease; }
  .minimap:hover { opacity: 1 !important; }
`;

/* ========== WAVEFORM CANVAS ========== */
const WaveformCanvas = memo(({ width, height, color = "#75aadb", opacity = 0.4 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const bars = Math.floor(width / 3);
    const mid = height / 2;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;

    for (let i = 0; i < bars; i++) {
      const amp = (Math.sin(i * 0.3) * 0.3 + Math.sin(i * 0.7) * 0.25 + Math.random() * 0.35) * mid;
      const barH = Math.max(2, amp);
      ctx.fillRect(i * 3, mid - barH, 2, barH * 2);
    }
  }, [width, height, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px`, display: "block", borderRadius: "2px" }}
    />
  );
});
WaveformCanvas.displayName = "WaveformCanvas";

/* ========== FILMSTRIP THUMBNAILS ========== */
const FilmstripThumbnails = memo(({ width, height, thumbnail, opacity = 0.2 }) => {
  const frameCount = Math.max(1, Math.floor(width / 60));
  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", opacity,
      pointerEvents: "none", borderRadius: "3px", overflow: "hidden",
    }}>
      {Array.from({ length: frameCount }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: "100%",
          backgroundImage: thumbnail ? `url(${thumbnail})` : "none",
          backgroundSize: "cover",
          backgroundPosition: `${(i / frameCount) * 100}% center`,
          borderRight: i < frameCount - 1 ? "1px solid rgba(0,0,0,0.4)" : "none",
        }} />
      ))}
    </div>
  );
});
FilmstripThumbnails.displayName = "FilmstripThumbnails";

/* ========== TRACK LABEL COMPONENT ========== */
const TrackLabel = memo(({
  icon, lockIcon = "lock", label,
  isMuted = false, isLocked = false,
  onToggleMute, onToggleLock,
  trackType = "video", height = 60,
}) => (
  <div
    style={{
      height: `${height}px`, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "6px",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      background: "linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.15) 100%)",
      position: "relative",
    }}
    role="group" aria-label={`${trackType} track controls`}
  >
    <span style={{
      position: "absolute", top: "3px", left: "50%", transform: "translateX(-50%)",
      fontSize: "7px", fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.5px", color: "rgba(117,170,219,0.4)",
    }}>{label}</span>
    <button
      onClick={onToggleMute} className="track-control-btn"
      style={{ background: "none", border: "none", padding: "3px", cursor: "pointer", opacity: isMuted ? 0.5 : 1 }}
      aria-label={isMuted ? `Show ${trackType}` : `Hide ${trackType}`}
      title={isMuted ? `Show ${trackType}` : `Hide ${trackType}`}
    >
      <Icon i={isMuted ? (trackType === "video" ? "visibility_off" : "volume_off") : icon} s={13} c={isMuted ? "#ef4444" : "#64748b"} />
    </button>
    <button
      onClick={onToggleLock} className="track-control-btn"
      style={{ background: "none", border: "none", padding: "3px", cursor: "pointer" }}
      aria-label={isLocked ? `Unlock ${trackType}` : `Lock ${trackType}`}
      title={isLocked ? `Unlock ${trackType}` : `Lock ${trackType}`}
    >
      <Icon i={isLocked ? "lock" : lockIcon} s={13} c={isLocked ? "#f59e0b" : "#64748b"} />
    </button>
  </div>
));
TrackLabel.displayName = "TrackLabel";

/* ========== CLIP COMPONENT ========== */
const TimelineClip = memo(({
  clip, isSelected, pixelsPerSecond,
  onPointerDown, onResizeStart,
  cutMode = false,
}) => {
  const width = Math.max(clip.duration * pixelsPerSecond, 40);
  const left = clip.startTime * pixelsPerSecond;
  const isAudio = clip.type === "audio";
  const baseColor = isAudio ? "rgba(52,211,153," : "rgba(117,170,219,";
  const borderColor = isSelected
    ? (isAudio ? "#34d399" : "#75aadb")
    : `${baseColor}0.35)`;

  return (
    <div
      data-clip-id={clip.id}
      onMouseDown={(e) => { e.stopPropagation(); onPointerDown(e, clip); }}
      className={`timeline-clip ${isSelected ? "tl-selected" : ""}`}
      role="button" tabIndex={0}
      aria-label={`${clip.name}, ${formatDuration(clip.duration)}`}
      aria-selected={isSelected}
      style={{
        position: "absolute", left: `${left}px`, width: `${width}px`,
        height: isAudio ? "44px" : "52px", top: "4px",
        background: isSelected
          ? `linear-gradient(135deg, ${baseColor}0.35) 0%, ${baseColor}0.2) 100%)`
          : `linear-gradient(135deg, ${baseColor}0.12) 0%, ${baseColor}0.06) 100%)`,
        borderRadius: "4px",
        border: isSelected ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
        overflow: "hidden", outline: "none",
        cursor: cutMode ? "crosshair" : "grab",
      }}
    >
      {/* Filmstrip or waveform background */}
      {isAudio ? (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 4px" }}>
          <WaveformCanvas width={Math.max(width - 8, 20)} height={36} color="#34d399" opacity={isSelected ? 0.5 : 0.3} />
        </div>
      ) : (
        <FilmstripThumbnails width={width} height={52} thumbnail={clip.thumbnail} opacity={isSelected ? 0.35 : 0.2} />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "3px",
        background: isSelected
          ? `linear-gradient(180deg, ${baseColor}0.1) 0%, ${baseColor}0.25) 100%)`
          : "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)",
      }} />

      {/* Clip info overlay */}
      <div style={{
        position: "relative", padding: "0 8px", display: "flex", alignItems: "center",
        gap: "6px", width: "100%", overflow: "hidden", pointerEvents: "none", zIndex: 2,
        height: "100%",
      }}>
        <div style={{
          width: "18px", height: "18px", borderRadius: "3px", flexShrink: 0,
          background: isSelected ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon i={isAudio ? "music_note" : "movie"} s={11} c={isSelected ? "white" : "#cbd5e1"} />
        </div>
        <span style={{
          fontSize: "10px", fontWeight: isSelected ? 600 : 500,
          color: isSelected ? "white" : "#e2e8f0",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)", letterSpacing: "0.01em",
        }}>{clip.name}</span>
        {width > 80 && (
          <span style={{
            fontSize: "8px", fontWeight: 600, marginLeft: "auto", flexShrink: 0,
            color: isSelected ? "rgba(255,255,255,0.8)" : "#94a3b8",
            background: "rgba(0,0,0,0.25)", padding: "1px 4px", borderRadius: "2px",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}>{formatDuration(clip.duration)}</span>
        )}
      </div>

      {/* Resize handles */}
      <div className="clip-resize-handle" style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "6px", cursor: "ew-resize",
        background: `linear-gradient(90deg, ${isAudio ? "rgba(52,211,153,0.7)" : "rgba(117,170,219,0.7)"} 0%, transparent 100%)`,
        borderRadius: "4px 0 0 4px", pointerEvents: "auto",
      }} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onResizeStart(clip.id, 'left', e); }} />
      <div className="clip-resize-handle" style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "6px", cursor: "ew-resize",
        background: `linear-gradient(90deg, transparent 0%, ${isAudio ? "rgba(52,211,153,0.7)" : "rgba(117,170,219,0.7)"} 100%)`,
        borderRadius: "0 4px 4px 0", pointerEvents: "auto",
      }} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onResizeStart(clip.id, 'right', e); }} />
    </div>
  );
});
TimelineClip.displayName = "TimelineClip";

/* ========== EMPTY TRACK PLACEHOLDER ========== */
const EmptyTrackPlaceholder = memo(({ type, isDragOver }) => (
  <div
    className={`timeline-track-empty ${isDragOver ? "timeline-track-dragover" : ""}`}
    style={{
      position: "absolute", inset: "4px 16px 4px 4px",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
      color: isDragOver ? "#75aadb" : "#475569", fontSize: "12px",
      border: `1.5px dashed ${isDragOver ? "#75aadb" : "rgba(100,116,139,0.2)"}`,
      borderRadius: "6px",
      background: isDragOver
        ? "linear-gradient(135deg, rgba(117,170,219,0.1) 0%, rgba(117,170,219,0.04) 100%)"
        : "transparent",
      pointerEvents: "none",
    }}
    role="region" aria-label={`Empty ${type} track`}
  >
    <Icon i={type === "video" ? "movie" : "music_note"} s={18} c={isDragOver ? "#75aadb" : "#475569"} />
    <span style={{ fontWeight: 500, fontSize: "11px", color: isDragOver ? "#75aadb" : "#64748b" }}>
      {isDragOver ? `Drop ${type} here` : `Drag ${type} clips here`}
    </span>
  </div>
));
EmptyTrackPlaceholder.displayName = "EmptyTrackPlaceholder";

/* ========== MINIMAP ========== */
const Minimap = memo(({ clips, totalDuration, viewportStart, viewportEnd, width = 200 }) => {
  const scale = width / Math.max(totalDuration, 1);
  return (
    <div className="minimap" style={{
      width: `${width}px`, height: "20px", background: "rgba(15,23,42,0.8)",
      borderRadius: "4px", border: "1px solid rgba(255,255,255,0.06)",
      position: "relative", overflow: "hidden", opacity: 0.7, flexShrink: 0,
    }}>
      {clips.map((c) => (
        <div key={c.id} style={{
          position: "absolute", left: `${c.startTime * scale}px`,
          width: `${Math.max(c.duration * scale, 2)}px`, height: "10px",
          background: c.type === "audio" ? "rgba(52,211,153,0.4)" : "rgba(117,170,219,0.4)",
          borderRadius: "2px", top: c.type === "audio" ? "10px" : "0",
        }} />
      ))}
      <div style={{
        position: "absolute", left: `${viewportStart * scale}px`,
        width: `${Math.max((viewportEnd - viewportStart) * scale, 10)}px`,
        height: "100%", border: "1px solid rgba(117,170,219,0.5)",
        borderRadius: "2px", background: "rgba(117,170,219,0.08)",
      }} />
    </div>
  );
});
Minimap.displayName = "Minimap";

/* ========== TOOLBAR BUTTON ========== */
const TlBtn = memo(({ icon, onClick, disabled, active, label, shortcut, color = "#94a3b8" }) => (
  <button
    onClick={onClick} disabled={disabled}
    className={`timeline-toolbar-btn ${active ? "active-tool" : ""}`}
    style={{ background: "none", border: "none", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex" }}
    aria-label={label} title={`${label}${shortcut ? ` (${shortcut})` : ""}`}
  >
    <Icon i={icon} s={17} c={active ? "#75aadb" : disabled ? "#334155" : color} />
  </button>
));
TlBtn.displayName = "TlBtn";

/* ========== MAIN TIMELINE COMPONENT ========== */
const Timeline = ({
  clips = [], selectedClipId, onSelectClip, onUpdateClip,
  onDeleteClip, onSplitClip,
  currentTime = 0, onSeek, totalDuration = 30, isProcessing = false,
  canUndo = false, canRedo = false, onUndo, onRedo,
  mediaItems = [], onAddToTimeline,
}) => {
  // ── State ────────────────────────────────────────────────────
  const [zoom, setZoom] = useState(50);
  const [playheadPos, setPlayheadPos] = useState(currentTime);
  const [trackMutes, setTrackMutes] = useState({ video: false, audio: false });
  const [trackLocks, setTrackLocks] = useState({ video: false, audio: false });
  const [dragOverTrack, setDragOverTrack] = useState(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [activeTool, setActiveTool] = useState("select");
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [showVolumePopover, setShowVolumePopover] = useState(false);
  const [showSpeedPopover, setShowSpeedPopover] = useState(false);
  const [viewport, setViewport] = useState({ start: 0, end: 30 });

  // ── Refs ─────────────────────────────────────────────────────
  const timelineRef = useRef(null);
  const snapLineRef = useRef(null);
  const scrubRef = useRef(false);
  const zoomAnchorRef = useRef(null);

  // Live-value refs for use inside pointer handlers (avoids stale closures)
  const clipsRef = useRef(clips);
  clipsRef.current = clips;
  const playheadPosRef = useRef(playheadPos);
  playheadPosRef.current = playheadPos;
  const snapEnabledRef = useRef(snapEnabled);
  snapEnabledRef.current = snapEnabled;
  const trackLocksRef = useRef(trackLocks);
  trackLocksRef.current = trackLocks;
  const activeToolRef = useRef(activeTool);
  activeToolRef.current = activeTool;

  // Interaction state (never triggers re-renders)
  const interactionRef = useRef({
    dragging: false,
    resizing: false,
    scrubbing: false,
    // Drag
    dragClipId: null,
    dragInitialMouseX: 0,
    dragInitialStartTime: 0,
    dragCurrentStartTime: 0,
    // Resize
    resizeClipId: null,
    resizeSide: null,
    resizeInitialMouseX: 0,
    resizeOrigStart: 0,
    resizeOrigDur: 0,
    resizeOrigTrimStart: 0,
    resizeCurStart: 0,
    resizeCurDur: 0,
    resizeCurTrimStart: 0,
  });

  // ── Derived values ───────────────────────────────────────────
  const pxPerSec = useMemo(() => zoomToPxPerSec(zoom), [zoom]);
  const pxPerSecRef = useRef(pxPerSec);
  pxPerSecRef.current = pxPerSec;

  const tlWidth = useMemo(() => Math.max(totalDuration * pxPerSec + 200, 900), [totalDuration, pxPerSec]);
  const videoClips = useMemo(() => clips.filter((c) => c.type !== "audio"), [clips]);
  const audioClips = useMemo(() => clips.filter((c) => c.type === "audio"), [clips]);
  const timeMarkers = useMemo(() => generateMarkers(totalDuration, pxPerSec), [totalDuration, pxPerSec]);

  // ── Sync playhead from currentTime prop ──────────────────────
  useEffect(() => {
    if (!isScrubbing) setPlayheadPos(currentTime);
  }, [currentTime, isScrubbing]);

  // ── Viewport tracking for minimap ────────────────────────────
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const onScroll = () => {
      const start = el.scrollLeft / pxPerSec;
      const end = start + el.clientWidth / pxPerSec;
      setViewport({ start, end });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [pxPerSec]);

  // ── Cursor-centered zoom scroll adjustment ───────────────────
  useLayoutEffect(() => {
    const anchor = zoomAnchorRef.current;
    if (!anchor || !timelineRef.current) return;
    zoomAnchorRef.current = null;
    timelineRef.current.scrollLeft = anchor.cursorTime * pxPerSec - anchor.mouseX;
  }, [pxPerSec]);

  // ── Auto-scroll to keep playhead visible during playback ─────
  useEffect(() => {
    const el = timelineRef.current;
    const ir = interactionRef.current;
    if (!el || ir.scrubbing || ir.dragging || ir.resizing) return;
    const phX = currentTime * pxPerSec;
    const rightEdge = el.scrollLeft + el.clientWidth - 60;
    if (phX > rightEdge) {
      el.scrollLeft = phX - 100;
    }
  }, [currentTime, pxPerSec]);

  // ── Snap line helpers ────────────────────────────────────────
  const showSnapLine = useCallback((time) => {
    if (!snapLineRef.current) return;
    snapLineRef.current.style.left = `${timeToX(time, pxPerSecRef.current)}px`;
    snapLineRef.current.style.display = 'block';
  }, []);

  const hideSnapLine = useCallback(() => {
    if (!snapLineRef.current) return;
    snapLineRef.current.style.display = 'none';
  }, []);

  // ────────────────────────────────────────────────────────────
  //  INTERACTION: CLIP POINTER DOWN (select + drag + cut-mode)
  // ────────────────────────────────────────────────────────────
  const handleClipPointerDown = useCallback((e, clip) => {
    // Cut mode: split clip at click position
    if (activeToolRef.current === "cut") {
      const clipEl = timelineRef.current?.querySelector(`[data-clip-id="${clip.id}"]`);
      if (!clipEl) return;
      const rect = clipEl.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const splitTime = xToTime(clickX, pxPerSecRef.current);
      if (splitTime > 0.1 && splitTime < clip.duration - 0.1) {
        onSplitClip?.(clip.id, splitTime);
      }
      return;
    }

    // Select immediately
    onSelectClip?.(clip.id);

    // Prepare for potential drag
    const startX = e.clientX;
    let didDrag = false;
    const origStartTime = clip.startTime;
    const clipDuration = clip.duration;
    const snapTargets = snapEnabledRef.current
      ? collectSnapTargets(clipsRef.current, clip.id, playheadPosRef.current)
      : [];
    const clipEl = timelineRef.current?.querySelector(`[data-clip-id="${clip.id}"]`);

    const ir = interactionRef.current;
    ir.dragClipId = clip.id;
    ir.dragInitialMouseX = startX;
    ir.dragInitialStartTime = origStartTime;
    ir.dragCurrentStartTime = origStartTime;

    const onMove = (ev) => {
      const dx = ev.clientX - startX;

      // Movement threshold — distinguish click from drag
      if (!didDrag && Math.abs(dx) > DRAG_THRESHOLD_PX) {
        didDrag = true;
        ir.dragging = true;
        if (clipEl) clipEl.classList.add('tl-dragging');
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
      }

      if (!didDrag) return;

      const dt = xToTime(dx, pxPerSecRef.current);
      let newStart = Math.max(0, origStartTime + dt);

      // Snap both edges
      if (snapEnabledRef.current) {
        const snap = snapClipEdges(newStart, clipDuration, snapTargets, pxPerSecRef.current);
        newStart = Math.max(0, snap.startTime);
        if (snap.snappedTo !== null) showSnapLine(snap.snappedTo);
        else hideSnapLine();
      }

      ir.dragCurrentStartTime = newStart;

      // Direct DOM update — no React re-render
      if (clipEl) {
        clipEl.style.left = `${timeToX(newStart, pxPerSecRef.current)}px`;
      }
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);

      if (didDrag) {
        if (clipEl) clipEl.classList.remove('tl-dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        hideSnapLine();
        // Commit final position (single undo entry)
        onUpdateClip?.(clip.id, { startTime: ir.dragCurrentStartTime });
      }

      ir.dragging = false;
      ir.dragClipId = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [onSelectClip, onSplitClip, onUpdateClip, showSnapLine, hideSnapLine]);

  // ────────────────────────────────────────────────────────────
  //  INTERACTION: RESIZE HANDLE POINTER DOWN
  // ────────────────────────────────────────────────────────────
  const handleResizeStart = useCallback((clipId, side, e) => {
    const clip = clipsRef.current.find(c => c.id === clipId);
    if (!clip) return;
    const trackType = clip.type === 'audio' ? 'audio' : 'video';
    if (trackLocksRef.current[trackType]) return;

    const startX = e.clientX;
    const origStart = clip.startTime;
    const origDur = clip.duration;
    const origTrimStart = clip.trimStart || 0;
    const snapTargets = snapEnabledRef.current
      ? collectSnapTargets(clipsRef.current, clipId, playheadPosRef.current)
      : [];
    const clipEl = timelineRef.current?.querySelector(`[data-clip-id="${clipId}"]`);

    const ir = interactionRef.current;
    ir.resizing = true;
    ir.resizeClipId = clipId;
    ir.resizeSide = side;
    ir.resizeInitialMouseX = startX;
    ir.resizeOrigStart = origStart;
    ir.resizeOrigDur = origDur;
    ir.resizeOrigTrimStart = origTrimStart;
    ir.resizeCurStart = origStart;
    ir.resizeCurDur = origDur;
    ir.resizeCurTrimStart = origTrimStart;

    if (clipEl) clipEl.classList.add('tl-resizing');
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const dt = xToTime(dx, pxPerSecRef.current);

      let newStart = origStart;
      let newDur = origDur;
      let newTrimStart = origTrimStart;

      if (side === 'left') {
        newStart = Math.max(0, origStart + dt);
        const delta = newStart - origStart;
        newDur = origDur - delta;
        newTrimStart = origTrimStart + delta;

        // Enforce minimum duration
        if (newDur < MIN_CLIP_DURATION) {
          newDur = MIN_CLIP_DURATION;
          newStart = origStart + origDur - MIN_CLIP_DURATION;
          newTrimStart = origTrimStart + (newStart - origStart);
        }

        // Snap left edge
        if (snapEnabledRef.current) {
          const snap = snapToNearest(newStart, snapTargets, pxPerSecRef.current);
          if (snap.snappedTo !== null) {
            const snappedDelta = snap.time - origStart;
            newStart = snap.time;
            newDur = origDur - snappedDelta;
            newTrimStart = origTrimStart + snappedDelta;
            if (newDur < MIN_CLIP_DURATION) return; // skip this frame
            showSnapLine(snap.snappedTo);
          } else {
            hideSnapLine();
          }
        }
      } else {
        // Right edge
        newDur = Math.max(MIN_CLIP_DURATION, origDur + dt);

        // Snap right edge
        if (snapEnabledRef.current) {
          const endTime = origStart + newDur;
          const snap = snapToNearest(endTime, snapTargets, pxPerSecRef.current);
          if (snap.snappedTo !== null) {
            newDur = Math.max(MIN_CLIP_DURATION, snap.time - origStart);
            showSnapLine(snap.snappedTo);
          } else {
            hideSnapLine();
          }
        }
      }

      ir.resizeCurStart = newStart;
      ir.resizeCurDur = newDur;
      ir.resizeCurTrimStart = newTrimStart;

      // Direct DOM update
      if (clipEl) {
        clipEl.style.left = `${timeToX(newStart, pxPerSecRef.current)}px`;
        clipEl.style.width = `${Math.max(40, newDur * pxPerSecRef.current)}px`;
      }
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);

      if (clipEl) clipEl.classList.remove('tl-resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      hideSnapLine();

      // Commit (single undo entry)
      const updates = { duration: ir.resizeCurDur };
      if (side === 'left') {
        updates.startTime = ir.resizeCurStart;
        updates.trimStart = ir.resizeCurTrimStart;
      }
      onUpdateClip?.(clipId, updates);

      ir.resizing = false;
      ir.resizeClipId = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [onUpdateClip, showSnapLine, hideSnapLine]);

  // ────────────────────────────────────────────────────────────
  //  INTERACTION: SCRUBBING (click ruler / empty timeline area)
  // ────────────────────────────────────────────────────────────
  const startScrub = useCallback((e) => {
    if (!timelineRef.current) return;
    scrubRef.current = true;
    setIsScrubbing(true);
    interactionRef.current.scrubbing = true;

    // Deselect any clip when clicking empty space
    onSelectClip?.(null);

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
    const t = Math.max(0, Math.min(totalDuration, xToTime(x, pxPerSec)));
    setPlayheadPos(t);
    onSeek?.(t);

    document.body.style.cursor = 'text';
    document.body.style.userSelect = 'none';

    const onMove = (ev) => {
      if (!scrubRef.current) return;
      const xx = ev.clientX - rect.left + timelineRef.current.scrollLeft;
      const tt = Math.max(0, Math.min(totalDuration, xToTime(xx, pxPerSec)));
      setPlayheadPos(tt);
      onSeek?.(tt);
    };

    const onUp = () => {
      scrubRef.current = false;
      setIsScrubbing(false);
      interactionRef.current.scrubbing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [pxPerSec, totalDuration, onSeek, onSelectClip]);

  // ────────────────────────────────────────────────────────────
  //  INTERACTION: WHEEL ZOOM + SCROLL
  // ────────────────────────────────────────────────────────────
  const handleWheel = useCallback((e) => {
    const el = timelineRef.current;
    if (!el) return;

    if (e.ctrlKey || e.metaKey) {
      // Ctrl+wheel → zoom centered on cursor
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const cursorTime = xToTime(el.scrollLeft + mouseX, pxPerSecRef.current);

      const delta = e.deltaY > 0 ? -5 : 5;
      const newZoom = Math.max(0, Math.min(100, zoom + delta));
      if (newZoom === zoom) return;

      // Store anchor for post-render scroll adjustment
      zoomAnchorRef.current = { cursorTime, mouseX };
      setZoom(newZoom);
    }
    // Default wheel behavior handles horizontal scroll via shift+wheel or trackpad
  }, [zoom]);

  // ────────────────────────────────────────────────────────────
  //  MEDIA LIBRARY DROP (HTML5 DnD — only for cross-component drops)
  // ────────────────────────────────────────────────────────────
  const handleDragOver = useCallback((e, trackType) => {
    e.preventDefault();
    const types = Array.from(e.dataTransfer.types || []);
    e.dataTransfer.dropEffect = types.includes("mediaItemId") ? "copy" : "move";
    setDragOverTrack(trackType);
  }, []);

  const handleDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOverTrack(null);
  }, []);

  const handleDrop = useCallback((e, trackType) => {
    e.preventDefault();
    setDragOverTrack(null);

    const mediaItemId = e.dataTransfer.getData("mediaItemId");
    if (!mediaItemId || !onAddToTimeline) return;

    const mediaItem = mediaItems.find((m) => m.id === mediaItemId);
    if (!mediaItem) return;

    const isAudio = mediaItem.type === "audio";
    if (trackType === "audio" && !isAudio) return;
    if (trackType === "video" && isAudio) return;
    if (trackLocks[trackType]) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newStart = Math.max(0, xToTime(x, pxPerSec));

    // Snap
    if (snapEnabled) {
      const targets = collectSnapTargets(clips, null, playheadPos);
      const snap = snapClipEdges(newStart, mediaItem.duration || 5, targets, pxPerSec);
      newStart = Math.max(0, snap.startTime);
    }

    onAddToTimeline(mediaItem, newStart);
  }, [clips, trackLocks, pxPerSec, playheadPos, onAddToTimeline, mediaItems, snapEnabled]);

  // ────────────────────────────────────────────────────────────
  //  SPLIT + DELETE HANDLERS
  // ────────────────────────────────────────────────────────────
  const handleSplit = useCallback(() => {
    if (!selectedClipId || isProcessing) return;
    const clip = clips.find((c) => c.id === selectedClipId);
    if (!clip) return;
    const st = playheadPos - clip.startTime;
    if (st > 0.1 && st < clip.duration - 0.1) onSplitClip?.(selectedClipId, st);
  }, [selectedClipId, isProcessing, clips, playheadPos, onSplitClip]);

  const handleDelete = useCallback(() => {
    if (selectedClipId && !isProcessing) onDeleteClip?.(selectedClipId);
  }, [selectedClipId, isProcessing, onDeleteClip]);

  // ────────────────────────────────────────────────────────────
  //  KEYBOARD SHORTCUTS
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      // Only respond when timeline or body is focused (not text inputs)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (!timelineRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;

      switch (e.key) {
        case "Delete": case "Backspace":
          if (selectedClipId && !isProcessing) { e.preventDefault(); onDeleteClip?.(selectedClipId); } break;
        case "s": case "S":
          if (selectedClipId && !isProcessing && !e.ctrlKey && !e.metaKey) { e.preventDefault(); handleSplit(); } break;
        case "b": case "B":
          if ((e.ctrlKey || e.metaKey) && selectedClipId && !isProcessing) { e.preventDefault(); handleSplit(); } break;
        case "ArrowLeft":
          e.preventDefault();
          { const dt = e.shiftKey ? 1 : 1 / 30; const t = Math.max(0, playheadPos - dt); setPlayheadPos(t); onSeek?.(t); } break;
        case "ArrowRight":
          e.preventDefault();
          { const dt = e.shiftKey ? 1 : 1 / 30; const t = Math.min(totalDuration, playheadPos + dt); setPlayheadPos(t); onSeek?.(t); } break;
        case "Home": e.preventDefault(); setPlayheadPos(0); onSeek?.(0); break;
        case "End": e.preventDefault(); setPlayheadPos(totalDuration); onSeek?.(totalDuration); break;
        case "Escape": onSelectClip?.(null); break;
        case "v": case "V": if (!e.ctrlKey && !e.metaKey) setActiveTool("select"); break;
        case "c": case "C": if (!e.ctrlKey && !e.metaKey) setActiveTool("cut"); break;
        case "=": case "+": e.preventDefault(); setZoom(z => Math.min(100, z + 5)); break;
        case "-": case "_": e.preventDefault(); setZoom(z => Math.max(0, z - 5)); break;
        default: break;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selectedClipId, isProcessing, playheadPos, totalDuration, onDeleteClip, onSeek, onSelectClip, handleSplit]);

  // ── Cleanup on unmount ───────────────────────────────────────
  useEffect(() => () => {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // ── Derived flags ────────────────────────────────────────────
  const canSplit = selectedClipId && !isProcessing;
  const canDelete = selectedClipId && !isProcessing;

  // ────────────────────────────────────────────────────────────
  //  RENDER
  // ────────────────────────────────────────────────────────────
  return (
    <footer style={styles.timeline} role="region" aria-label="Timeline editor">
      <style>{TIMELINE_CSS}</style>

      {/* ── Toolbar ─────────────────────────────────────── */}
      <div style={styles.tlToolbar} role="toolbar" aria-label="Timeline tools">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Tool group */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: "10px" }}>
            <TlBtn icon="near_me" onClick={() => setActiveTool("select")} active={activeTool === "select"} label="Select tool" shortcut="V" />
            <TlBtn icon="content_cut" onClick={() => setActiveTool("cut")} active={activeTool === "cut"} label="Cut tool — click clip to split" shortcut="C" />
          </div>
          {/* Edit group */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: "10px" }}>
            <TlBtn icon="undo" onClick={onUndo} disabled={!canUndo} label="Undo" shortcut="Ctrl+Z" />
            <TlBtn icon="redo" onClick={onRedo} disabled={!canRedo} label="Redo" shortcut="Ctrl+Y" />
          </div>
          {/* Clip actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <TlBtn icon="carpenter" onClick={handleSplit} disabled={!canSplit} label="Split at playhead" shortcut="S" />
            <TlBtn icon="delete" onClick={handleDelete} disabled={!canDelete} label="Delete selected" shortcut="Del" />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Current time display */}
          <span style={{
            fontSize: "11px", fontFamily: "monospace", color: "#75aadb", fontWeight: 600,
            background: "rgba(117,170,219,0.08)", padding: "3px 8px", borderRadius: "4px",
            minWidth: "60px", textAlign: "center", letterSpacing: "0.5px",
          }}>
            {formatTimecode(playheadPos)}
          </span>

          {/* Minimap */}
          <Minimap clips={clips} totalDuration={totalDuration} viewportStart={viewport.start} viewportEnd={viewport.end} width={140} />

          <TlBtn icon="align_horizontal_center" onClick={() => setSnapEnabled(s => !s)} active={snapEnabled} label={`Snap (${snapEnabled ? 'on' : 'off'})`} />

          {/* Zoom */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "0 10px" }}>
            <TlBtn icon="zoom_out" onClick={() => setZoom(Math.max(0, zoom - 10))} label="Zoom out" shortcut="-" />
            <input type="range" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} min={0} max={100} className="zoom-slider" style={{ width: "70px" }} aria-label={`Zoom ${zoom}%`} />
            <TlBtn icon="zoom_in" onClick={() => setZoom(Math.min(100, zoom + 10))} label="Zoom in" shortcut="+" />
            <span style={{ fontSize: "9px", color: "#64748b", fontWeight: 600, minWidth: "28px", textAlign: "center" }}>{zoom}%</span>
          </div>

          {/* Volume/Speed popovers */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", position: "relative" }}>
            <div style={{ position: 'relative' }}>
              <TlBtn icon="volume_up" onClick={() => { if (selectedClipId) setShowVolumePopover(v => !v); }} disabled={!selectedClipId} label="Volume" active={showVolumePopover} />
              {showVolumePopover && selectedClipId && (() => {
                const clip = clips.find(c => c.id === selectedClipId);
                if (!clip) return null;
                return (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowVolumePopover(false)} />
                    <div style={{
                      position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                      marginBottom: '8px', background: 'rgba(26,35,50,0.98)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px', padding: '12px', zIndex: 100, minWidth: '140px',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    }}>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>Clip Volume</div>
                      <input type="range" min={0} max={200} value={Math.round((clip.volume ?? 1) * 100)}
                        onChange={(e) => onUpdateClip?.(selectedClipId, { volume: Number(e.target.value) / 100 })}
                        style={{ width: '100%', accentColor: '#75aadb' }}
                      />
                      <div style={{ fontSize: '10px', color: '#75aadb', textAlign: 'center', marginTop: '4px' }}>
                        {Math.round((clip.volume ?? 1) * 100)}%
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
            <div style={{ position: 'relative' }}>
              <TlBtn icon="speed" onClick={() => { if (selectedClipId) setShowSpeedPopover(v => !v); }} disabled={!selectedClipId} label="Speed" active={showSpeedPopover} />
              {showSpeedPopover && selectedClipId && (() => {
                const clip = clips.find(c => c.id === selectedClipId);
                if (!clip) return null;
                return (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowSpeedPopover(false)} />
                    <div style={{
                      position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                      marginBottom: '8px', background: 'rgba(26,35,50,0.98)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px', padding: '8px', zIndex: 100,
                      boxShadow: '0 12px 32px rgba(0,0,0,0.5)', display: 'flex', gap: '4px',
                    }}>
                      {[0.25, 0.5, 1, 1.5, 2].map(s => (
                        <button key={s} onClick={() => { onUpdateClip?.(selectedClipId, { speed: s }); setShowSpeedPopover(false); }}
                          style={{
                            background: (clip.speed ?? 1) === s ? 'rgba(117,170,219,0.2)' : 'rgba(30,41,59,0.5)',
                            border: (clip.speed ?? 1) === s ? '1px solid #75aadb' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '4px', padding: '4px 8px', fontSize: '10px', fontWeight: 500,
                            color: (clip.speed ?? 1) === s ? '#75aadb' : '#94a3b8', cursor: 'pointer',
                            fontFamily: 'inherit',
                          }}
                        >{s}x</button>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tracks area ─────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Track labels */}
        <div style={{ width: "48px", background: "#0e1218", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", paddingTop: "28px", zIndex: 10, flexShrink: 0 }}>
          <TrackLabel icon="visibility" lockIcon="lock_open" label="V1" trackType="video" height={68}
            isMuted={trackMutes.video} isLocked={trackLocks.video}
            onToggleMute={() => setTrackMutes((p) => ({ ...p, video: !p.video }))}
            onToggleLock={() => setTrackLocks((p) => ({ ...p, video: !p.video }))}
          />
          <TrackLabel icon="volume_up" lockIcon="lock_open" label="A1" trackType="audio" height={60}
            isMuted={trackMutes.audio} isLocked={trackLocks.audio}
            onToggleMute={() => setTrackMutes((p) => ({ ...p, audio: !p.audio }))}
            onToggleLock={() => setTrackLocks((p) => ({ ...p, audio: !p.audio }))}
          />
        </div>

        {/* Timeline content (scrollable) */}
        <div
          ref={timelineRef}
          onMouseDown={startScrub}
          onWheel={handleWheel}
          tabIndex={0}
          role="application"
          aria-label="Timeline — arrow keys to scrub, S to split, Del to delete, Ctrl+wheel to zoom"
          style={{ flex: 1, position: "relative", overflowX: "auto", overflowY: "hidden", background: "rgba(8,10,14,0.6)", outline: "none" }}
          className="cs"
        >
          {/* Time ruler */}
          <div style={{
            height: "28px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative",
            width: `${tlWidth}px`, background: "linear-gradient(180deg, rgba(14,18,24,0.9) 0%, rgba(10,10,10,0.7) 100%)", zIndex: 20, cursor: "text",
          }}>
            {timeMarkers.map((mk, i) => (
              <div key={i} style={{
                position: "absolute", left: `${timeToX(mk.time, pxPerSec)}px`, height: "100%",
                borderLeft: `1px solid ${mk.major ? "rgba(117,170,219,0.25)" : "rgba(100,116,139,0.1)"}`,
                paddingLeft: "5px", display: "flex", alignItems: mk.major ? "flex-end" : "flex-end",
                paddingBottom: mk.major ? "4px" : "0",
                fontSize: mk.major ? "9px" : "8px",
                color: mk.major ? "#94a3b8" : "transparent",
                fontFamily: "monospace", fontWeight: 500, userSelect: "none",
              }}>{mk.label}</div>
            ))}
            {/* Sub-ticks for minor markers at high zoom */}
            {timeMarkers.filter(mk => !mk.major).map((mk, i) => (
              <div key={`sub-${i}`} style={{
                position: "absolute", left: `${timeToX(mk.time, pxPerSec)}px`,
                bottom: 0, width: "1px", height: "6px",
                background: "rgba(100,116,139,0.15)",
              }} />
            ))}
          </div>

          {/* Tracks container */}
          <div style={{ position: "relative", width: `${tlWidth}px`, paddingTop: "6px", paddingBottom: "8px" }}>
            {/* Snap line (always rendered, hidden by default) */}
            <div
              ref={snapLineRef}
              className="tl-snap-line"
              style={{
                position: "absolute", top: 0, width: "1px", height: "100%",
                background: "#f59e0b", zIndex: 60,
                display: "none", pointerEvents: "none",
              }}
            />

            {/* Playhead */}
            <div
              className={`tl-playhead ${isScrubbing ? "scrubbing" : ""}`}
              style={{
                position: "absolute", left: `${timeToX(playheadPos, pxPerSec)}px`, top: 0,
                width: "2px", height: "100%",
                background: "linear-gradient(180deg, #75aadb 0%, rgba(117,170,219,0.5) 100%)",
                zIndex: 50, pointerEvents: "none",
                boxShadow: "0 0 10px rgba(117,170,219,0.6), -1px 0 0 rgba(117,170,219,0.2), 1px 0 0 rgba(117,170,219,0.2)",
                animation: isScrubbing ? "none" : "playhead-pulse 2s ease-in-out infinite",
              }}
            >
              {/* Playhead triangle */}
              <div style={{
                width: "14px", height: "14px",
                background: "linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",
                position: "absolute", top: "-7px", left: "-6px",
                clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
              }} />
              {/* Time tooltip while scrubbing */}
              {isScrubbing && (
                <div style={{
                  position: "absolute", top: "-26px", left: "-22px",
                  background: "rgba(10,14,20,0.95)", border: "1px solid rgba(117,170,219,0.4)",
                  borderRadius: "4px", padding: "2px 6px", fontSize: "9px",
                  color: "#75aadb", fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)", pointerEvents: "none",
                }}>
                  {formatTimecode(playheadPos)}
                </div>
              )}
            </div>

            {/* Video track */}
            <div
              onDragOver={(e) => handleDragOver(e, "video")}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "video")}
              style={{
                height: "60px", position: "relative", marginLeft: "12px", marginBottom: "8px",
                borderRadius: "6px",
                background: trackMutes.video ? "rgba(117,170,219,0.02)" : "linear-gradient(180deg, rgba(117,170,219,0.04) 0%, rgba(117,170,219,0.01) 100%)",
                border: `1px solid ${trackLocks.video ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.03)"}`,
                opacity: trackMutes.video ? 0.35 : 1,
                transition: "opacity 0.2s ease, border-color 0.2s ease",
              }}
              role="list" aria-label="Video track"
            >
              {videoClips.map((c) => (
                <TimelineClip key={c.id} clip={c} isSelected={selectedClipId === c.id}
                  pixelsPerSecond={pxPerSec}
                  onPointerDown={handleClipPointerDown}
                  onResizeStart={handleResizeStart}
                  cutMode={activeTool === "cut"}
                />
              ))}
              {videoClips.length === 0 && <EmptyTrackPlaceholder type="video" isDragOver={dragOverTrack === "video"} />}
            </div>

            {/* Audio track */}
            <div
              onDragOver={(e) => handleDragOver(e, "audio")}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "audio")}
              style={{
                height: "52px", position: "relative", marginLeft: "12px",
                borderRadius: "6px",
                background: trackMutes.audio ? "rgba(52,211,153,0.02)" : "linear-gradient(180deg, rgba(52,211,153,0.04) 0%, rgba(52,211,153,0.01) 100%)",
                border: `1px solid ${trackLocks.audio ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.03)"}`,
                opacity: trackMutes.audio ? 0.35 : 1,
                transition: "opacity 0.2s ease, border-color 0.2s ease",
              }}
              role="list" aria-label="Audio track"
            >
              {audioClips.map((c) => (
                <TimelineClip key={c.id} clip={c} isSelected={selectedClipId === c.id}
                  pixelsPerSecond={pxPerSec}
                  onPointerDown={handleClipPointerDown}
                  onResizeStart={handleResizeStart}
                  cutMode={activeTool === "cut"}
                />
              ))}
              {audioClips.length === 0 && <EmptyTrackPlaceholder type="audio" isDragOver={dragOverTrack === "audio"} />}
            </div>
          </div>
        </div>
      </div>

      {/* Processing overlay */}
      {isProcessing && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
          backdropFilter: "blur(3px)",
        }} role="alert" aria-live="polite">
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: "rgba(26,35,50,0.95)", padding: "14px 24px", borderRadius: "10px",
            border: "1px solid rgba(117,170,219,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}>
            <div style={{
              width: "20px", height: "20px", border: "2.5px solid #75aadb",
              borderTopColor: "transparent", borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <span style={{ color: "white", fontSize: "13px", fontWeight: 500 }}>Processing...</span>
          </div>
        </div>
      )}
    </footer>
  );
};

export default memo(Timeline);
