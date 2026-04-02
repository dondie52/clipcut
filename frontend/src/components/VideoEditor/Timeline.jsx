import { useState, useRef, useEffect, useCallback, useMemo, useLayoutEffect, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { SCROLLBAR_CSS, DEFAULT_CLIP_PROPERTIES } from './constants';
import { useMobile } from '../../hooks/useMobile';
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
// Global cache for decoded waveform peaks (keyed by file identity)
const waveformCache = new Map();

const WaveformCanvas = memo(({ width, height, color = "#75aadb", opacity = 0.4, audioFile = null }) => {
  const canvasRef = useRef(null);
  const [peaks, setPeaks] = useState(null);

  // Decode audio and extract peaks (runs once per file)
  useEffect(() => {
    if (!audioFile) return;
    const cacheKey = `${audioFile.name}_${audioFile.size}`;
    if (waveformCache.has(cacheKey)) {
      setPeaks(waveformCache.get(cacheKey));
      return;
    }
    let cancelled = false;
    const decode = async () => {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const buf = await audioFile.arrayBuffer();
        const audio = await ctx.decodeAudioData(buf);
        const raw = audio.getChannelData(0);
        // Downsample to ~500 peak values
        const numPeaks = 500;
        const step = Math.max(1, Math.floor(raw.length / numPeaks));
        const result = new Float32Array(numPeaks);
        for (let i = 0; i < numPeaks; i++) {
          let max = 0;
          const start = i * step;
          const end = Math.min(start + step, raw.length);
          for (let j = start; j < end; j++) {
            const abs = Math.abs(raw[j]);
            if (abs > max) max = abs;
          }
          result[i] = max;
        }
        ctx.close();
        if (!cancelled) {
          waveformCache.set(cacheKey, result);
          setPeaks(result);
        }
      } catch {
        // Decode failed — fallback to procedural
      }
    };
    decode();
    return () => { cancelled = true; };
  }, [audioFile]);

  // Draw waveform
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

    if (peaks && peaks.length > 0) {
      // Real waveform from decoded audio
      for (let i = 0; i < bars; i++) {
        const peakIdx = Math.floor((i / bars) * peaks.length);
        const amp = peaks[peakIdx] * mid;
        const barH = Math.max(2, amp);
        ctx.fillRect(i * 3, mid - barH, 2, barH * 2);
      }
    } else {
      // Fallback: procedural waveform
      for (let i = 0; i < bars; i++) {
        const amp = (Math.sin(i * 0.3) * 0.3 + Math.sin(i * 0.7) * 0.25 + Math.random() * 0.35) * mid;
        const barH = Math.max(2, amp);
        ctx.fillRect(i * 3, mid - barH, 2, barH * 2);
      }
    }
  }, [width, height, color, opacity, peaks]);

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
  trackType = "video", height = 72,
}) => {
  const accentColor = trackType === "audio" ? "#34d399" : "#75aadb";
  return (
    <div
      style={{
        height: `${height}px`, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "4px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.15) 100%)",
        position: "relative",
        padding: "4px 0",
      }}
      role="group" aria-label={`${trackType} track controls`}
    >
      <div style={{
        fontSize: "9px", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "1px", color: accentColor,
        background: `${accentColor}15`,
        padding: "1px 6px", borderRadius: "3px",
        lineHeight: "16px",
      }}>{label}</div>
      <div style={{ display: "flex", gap: "2px" }}>
        <button
          onClick={onToggleMute} className="track-control-btn"
          style={{ background: "none", border: "none", padding: "3px", cursor: "pointer", opacity: isMuted ? 0.5 : 1 }}
          aria-label={isMuted ? `Show ${trackType}` : `Hide ${trackType}`}
          title={isMuted ? `Show ${trackType}` : `Hide ${trackType}`}
        >
          <Icon i={isMuted ? (trackType === "video" ? "visibility_off" : "volume_off") : icon} s={14} c={isMuted ? "#ef4444" : "#64748b"} />
        </button>
        <button
          onClick={onToggleLock} className="track-control-btn"
          style={{ background: "none", border: "none", padding: "3px", cursor: "pointer" }}
          aria-label={isLocked ? `Unlock ${trackType}` : `Lock ${trackType}`}
          title={isLocked ? `Unlock ${trackType}` : `Lock ${trackType}`}
        >
          <Icon i={isLocked ? "lock" : lockIcon} s={14} c={isLocked ? "#f59e0b" : "#64748b"} />
        </button>
      </div>
    </div>
  );
});
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
  const isText = clip.type === "text";
  const accent = isText ? "#f59e0b" : isAudio ? "#34d399" : "#75aadb";
  const accentRgba = isText ? "245,158,11" : isAudio ? "52,211,153" : "117,170,219";

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
        height: isAudio ? "52px" : isText ? "52px" : "60px", top: "4px",
        background: isSelected
          ? `linear-gradient(180deg, rgba(${accentRgba},0.3) 0%, rgba(${accentRgba},0.15) 100%)`
          : `linear-gradient(180deg, rgba(${accentRgba},0.1) 0%, rgba(${accentRgba},0.04) 100%)`,
        borderRadius: "5px",
        border: isSelected ? `2px solid ${accent}` : `1px solid rgba(${accentRgba},0.25)`,
        overflow: "hidden", outline: "none",
        cursor: cutMode ? "crosshair" : "grab",
      }}
    >
      {/* Filmstrip, waveform, or text pattern background */}
      {isAudio ? (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 4px" }}>
          <WaveformCanvas width={Math.max(width - 8, 20)} height={44} color="#34d399" opacity={isSelected ? 0.5 : 0.3} audioFile={clip.file} />
        </div>
      ) : isText ? (
        <div style={{
          position: "absolute", inset: 0,
          background: isSelected
            ? `repeating-linear-gradient(90deg, rgba(${accentRgba},0.08) 0px, rgba(${accentRgba},0.08) 4px, transparent 4px, transparent 8px)`
            : `repeating-linear-gradient(90deg, rgba(${accentRgba},0.04) 0px, rgba(${accentRgba},0.04) 4px, transparent 4px, transparent 8px)`,
        }} />
      ) : (
        <FilmstripThumbnails width={width} height={60} thumbnail={clip.thumbnail} opacity={isSelected ? 0.35 : 0.2} />
      )}

      {/* Top color strip — visual track type indicator */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: isSelected
          ? `linear-gradient(90deg, ${accent} 0%, rgba(${accentRgba},0.5) 100%)`
          : `linear-gradient(90deg, rgba(${accentRgba},0.5) 0%, rgba(${accentRgba},0.2) 100%)`,
        pointerEvents: "none",
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "4px",
        background: isSelected
          ? `linear-gradient(180deg, rgba(${accentRgba},0.05) 0%, rgba(${accentRgba},0.2) 100%)`
          : "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)",
      }} />

      {/* Clip info overlay */}
      <div style={{
        position: "relative", padding: "4px 10px 0", display: "flex", alignItems: "center",
        gap: "6px", width: "100%", overflow: "hidden", pointerEvents: "none", zIndex: 2,
        height: "100%",
      }}>
        <div style={{
          width: "20px", height: "20px", borderRadius: "4px", flexShrink: 0,
          background: isSelected ? `rgba(${accentRgba},0.3)` : "rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid rgba(${accentRgba},${isSelected ? "0.4" : "0.15"})`,
        }}>
          <Icon i={isText ? "text_fields" : isAudio ? "music_note" : "movie"} s={12} c={isSelected ? "white" : "#cbd5e1"} />
        </div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px" }}>
          <span style={{
            fontSize: "10px", fontWeight: isSelected ? 600 : 500,
            color: isSelected ? "white" : "#e2e8f0",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            textShadow: "0 1px 3px rgba(0,0,0,0.6)", letterSpacing: "0.01em",
          }}>{isText ? (clip.text || clip.name) : clip.name}</span>
          {width > 100 && (
            <span style={{
              fontSize: "8px", fontWeight: 500,
              color: isSelected ? `rgba(${accentRgba},0.9)` : "#64748b",
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}>{formatDuration(clip.duration)}</span>
          )}
        </div>
        {width > 80 && width <= 100 && (
          <span style={{
            fontSize: "8px", fontWeight: 600, marginLeft: "auto", flexShrink: 0,
            color: isSelected ? "rgba(255,255,255,0.8)" : "#94a3b8",
            background: "rgba(0,0,0,0.3)", padding: "2px 5px", borderRadius: "3px",
          }}>{formatDuration(clip.duration)}</span>
        )}
      </div>

      {/* Resize handles — visible grip indicators */}
      <div className="clip-resize-handle" style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "7px", cursor: "ew-resize",
        background: `linear-gradient(90deg, rgba(${accentRgba},0.8) 0%, transparent 100%)`,
        borderRadius: "5px 0 0 5px", pointerEvents: "auto",
        display: "flex", alignItems: "center", justifyContent: "center",
      }} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onResizeStart(clip.id, 'left', e); }}>
        <div style={{ width: "2px", height: "16px", background: `rgba(255,255,255,0.3)`, borderRadius: "1px" }} />
      </div>
      <div className="clip-resize-handle" style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "7px", cursor: "ew-resize",
        background: `linear-gradient(90deg, transparent 0%, rgba(${accentRgba},0.8) 100%)`,
        borderRadius: "0 5px 5px 0", pointerEvents: "auto",
        display: "flex", alignItems: "center", justifyContent: "center",
      }} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onResizeStart(clip.id, 'right', e); }}>
        <div style={{ width: "2px", height: "16px", background: `rgba(255,255,255,0.3)`, borderRadius: "1px" }} />
      </div>
    </div>
  );
});
TimelineClip.displayName = "TimelineClip";

/* ========== EMPTY TRACK PLACEHOLDER ========== */
const EmptyTrackPlaceholder = memo(({ type, isDragOver }) => {
  const accent = type === "audio" ? "#34d399" : "#75aadb";
  const accentRgba = type === "audio" ? "52,211,153" : "117,170,219";
  return (
    <div
      className={`timeline-track-empty ${isDragOver ? "timeline-track-dragover" : ""}`}
      style={{
        position: "absolute", inset: "4px 16px 4px 4px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        color: isDragOver ? accent : "#3d4a5c",
        border: `1.5px dashed ${isDragOver ? accent : "rgba(100,116,139,0.15)"}`,
        borderRadius: "6px",
        background: isDragOver
          ? `linear-gradient(135deg, rgba(${accentRgba},0.08) 0%, rgba(${accentRgba},0.02) 100%)`
          : "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 100%)",
        pointerEvents: "none",
      }}
      role="region" aria-label={`Empty ${type} track`}
    >
      <div style={{
        width: "28px", height: "28px", borderRadius: "6px",
        background: isDragOver ? `rgba(${accentRgba},0.15)` : "rgba(255,255,255,0.03)",
        border: `1px solid ${isDragOver ? `rgba(${accentRgba},0.3)` : "rgba(255,255,255,0.04)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon i={type === "video" ? "movie" : "music_note"} s={14} c={isDragOver ? accent : "#3d4a5c"} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <span style={{ fontWeight: 600, fontSize: "11px", color: isDragOver ? accent : "#4a5568" }}>
          {isDragOver ? `Drop ${type} here` : `${type === "video" ? "Video" : "Audio"} Track`}
        </span>
        {!isDragOver && (
          <span style={{ fontSize: "9px", color: "#334155" }}>
            Drag media from library or use + button
          </span>
        )}
      </div>
    </div>
  );
});
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
    style={{ background: "none", border: "none", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", minWidth: "28px" }}
    aria-label={label} title={`${label}${shortcut ? ` (${shortcut})` : ""}`}
  >
    <Icon i={icon} s={17} c={active ? "#75aadb" : disabled ? "#334155" : color} />
  </button>
));
TlBtn.displayName = "TlBtn";

/* ========== MAIN TIMELINE COMPONENT ========== */
const Timeline = ({
  id,
  clips = [], selectedClipId, onSelectClip, onUpdateClip,
  onDeleteClip, onSplitClip, onAddClip, onRippleDelete,
  currentTime = 0, onSeek, totalDuration = 30, isProcessing = false,
  canUndo = false, canRedo = false, onUndo, onRedo,
  mediaItems = [], onAddToTimeline,
  timelineHeight,
}) => {
  const isMobile = useMobile();

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
  // Viewport-based clip virtualization — only render clips overlapping visible area
  const isVisible = useCallback((c) => {
    const clipEnd = c.startTime + c.duration;
    return clipEnd >= viewport.start && c.startTime <= viewport.end;
  }, [viewport.start, viewport.end]);

  const videoClips = useMemo(() => clips.filter((c) => c.type !== "audio" && (c.track || 0) === 0 && isVisible(c)), [clips, isVisible]);
  const videoClips2 = useMemo(() => clips.filter((c) => c.type !== "audio" && c.track === 1 && isVisible(c)), [clips, isVisible]);
  const audioClips = useMemo(() => clips.filter((c) => c.type === "audio" && (c.track || 0) === 0 && isVisible(c)), [clips, isVisible]);
  const audioClips2 = useMemo(() => clips.filter((c) => c.type === "audio" && c.track === 1 && isVisible(c)), [clips, isVisible]);
  // Unfiltered counts for V2/A2 track visibility (show track even if clips are off-screen)
  const hasV2Clips = useMemo(() => clips.some((c) => c.type !== "audio" && c.track === 1), [clips]);
  const hasA2Clips = useMemo(() => clips.some((c) => c.type === "audio" && c.track === 1), [clips]);
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

  // Touch scrub for mobile playhead
  const startTouchScrub = useCallback((e) => {
    if (!timelineRef.current || e.touches.length > 1) return;
    scrubRef.current = true;
    setIsScrubbing(true);
    interactionRef.current.scrubbing = true;
    onSelectClip?.(null);

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left + timelineRef.current.scrollLeft;
    const t = Math.max(0, Math.min(totalDuration, xToTime(x, pxPerSec)));
    setPlayheadPos(t);
    onSeek?.(t);
  }, [pxPerSec, totalDuration, onSeek, onSelectClip]);

  const moveTouchScrub = useCallback((e) => {
    if (!scrubRef.current || !timelineRef.current || e.touches.length > 1) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left + timelineRef.current.scrollLeft;
    const t = Math.max(0, Math.min(totalDuration, xToTime(x, pxPerSec)));
    setPlayheadPos(t);
    onSeek?.(t);
  }, [pxPerSec, totalDuration, onSeek]);

  const endTouchScrub = useCallback(() => {
    scrubRef.current = false;
    setIsScrubbing(false);
    interactionRef.current.scrubbing = false;
  }, []);

  // Pinch-to-zoom on mobile timeline
  const pinchRef = useRef(null);
  const handleTouchStartZoom = useCallback((e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current = { dist: Math.hypot(dx, dy), zoom };
    }
  }, [zoom]);

  const handleTouchMoveZoom = useCallback((e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      const scale = newDist / pinchRef.current.dist;
      const newZoom = Math.max(0, Math.min(100, Math.round(pinchRef.current.zoom * scale)));
      setZoom(newZoom);
    }
  }, []);

  const handleTouchEndZoom = useCallback(() => {
    pinchRef.current = null;
  }, []);

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
    const scrollLeft = timelineRef.current?.scrollLeft || 0;
    const x = e.clientX - rect.left + scrollLeft;
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

  // ── Clipboard (copy/paste/duplicate) ──────────────────────
  const clipboardRef = useRef(null);

  const handleCopy = useCallback(() => {
    if (!selectedClipId) return;
    const clip = clips.find(c => c.id === selectedClipId);
    if (clip) {
      // Store a copy of the clip properties (excluding binary refs)
      const { file, blobUrl, thumbnail, ...data } = clip;
      clipboardRef.current = { ...data, _sourceFile: file, _sourceBlobUrl: blobUrl };
    }
  }, [selectedClipId, clips]);

  const handlePaste = useCallback(() => {
    const src = clipboardRef.current;
    if (!src || !onUpdateClip) return;
    // Place pasted clip at playhead position
    const newId = `clip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const pasted = {
      ...src,
      id: newId,
      startTime: playheadPos,
      file: src._sourceFile || null,
      blobUrl: src._sourceBlobUrl || null,
      thumbnail: null,
    };
    delete pasted._sourceFile;
    delete pasted._sourceBlobUrl;
    // Use the onAddClip prop or fallback to manual approach via parent
    onAddClip?.(pasted);
  }, [playheadPos, onAddClip]);

  const handleDuplicate = useCallback(() => {
    if (!selectedClipId) return;
    const clip = clips.find(c => c.id === selectedClipId);
    if (!clip) return;
    const newId = `clip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const dup = {
      ...clip,
      id: newId,
      name: `${clip.name} (copy)`,
      startTime: clip.startTime + clip.duration, // Place right after original
    };
    onAddClip?.(dup);
  }, [selectedClipId, clips, onAddClip]);

  const handleRippleDelete = useCallback(() => {
    if (!selectedClipId || isProcessing) return;
    const clip = clips.find(c => c.id === selectedClipId);
    if (!clip) return;
    const gap = clip.duration;
    const clipEnd = clip.startTime + clip.duration;
    // Delete the clip, then shift all later clips left to fill the gap
    const updated = clips
      .filter(c => c.id !== selectedClipId)
      .map(c => c.startTime >= clipEnd ? { ...c, startTime: Math.max(0, c.startTime - gap) } : c);
    onRippleDelete?.(updated);
  }, [selectedClipId, isProcessing, clips, onRippleDelete]);

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
        case "v": case "V":
          if (e.ctrlKey || e.metaKey) { e.preventDefault(); handlePaste(); }
          else setActiveTool("select");
          break;
        case "c": case "C":
          if (e.ctrlKey || e.metaKey) { e.preventDefault(); handleCopy(); }
          else setActiveTool("cut");
          break;
        case "d": case "D":
          if ((e.ctrlKey || e.metaKey) && selectedClipId) { e.preventDefault(); handleDuplicate(); }
          break;
        case "=": case "+": e.preventDefault(); setZoom(z => Math.min(100, z + 5)); break;
        case "-": case "_": e.preventDefault(); setZoom(z => Math.max(0, z - 5)); break;
        default: break;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selectedClipId, isProcessing, playheadPos, totalDuration, onDeleteClip, onSeek, onSelectClip, handleSplit, handleCopy, handlePaste, handleDuplicate]);

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
    <footer id={id} style={{ ...styles.timeline, ...(isMobile ? { flex: 1, minHeight: '120px', height: 'auto' } : timelineHeight ? { height: `${timelineHeight}px` } : {}) }} role="region" aria-label="Timeline editor">
      <style>{TIMELINE_CSS}</style>

      {/* ── Toolbar ─────────────────────────────────────── */}
      <div style={{ ...styles.tlToolbar, ...(isMobile ? { padding: '0 8px', gap: '4px' } : {}) }} role="toolbar" aria-label="Timeline tools">
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "12px" }}>
          {/* Tool group */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: isMobile ? "6px" : "10px" }}>
            <TlBtn icon="near_me" onClick={() => setActiveTool("select")} active={activeTool === "select"} label="Select tool" shortcut="V" />
            <TlBtn icon="content_cut" onClick={() => setActiveTool("cut")} active={activeTool === "cut"} label="Cut tool — click clip to split" shortcut="C" />
          </div>
          {/* Edit group — hide undo/redo on mobile (already in TopBar) */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: "10px" }}>
              <TlBtn icon="undo" onClick={onUndo} disabled={!canUndo} label="Undo" shortcut="Ctrl+Z" />
              <TlBtn icon="redo" onClick={onRedo} disabled={!canRedo} label="Redo" shortcut="Ctrl+Y" />
            </div>
          )}
          {/* Clip actions — hide duplicate on mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <TlBtn icon="carpenter" onClick={handleSplit} disabled={!canSplit} label="Split at playhead" shortcut="S" />
            {!isMobile && <TlBtn icon="content_copy" onClick={handleDuplicate} disabled={!canSplit} label="Duplicate clip" shortcut="Ctrl+D" />}
            <TlBtn icon="delete" onClick={handleRippleDelete} disabled={!canDelete} label="Ripple delete" shortcut="Del" />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "12px" }}>
          {/* Current time display */}
          <span style={{
            fontSize: "11px", fontFamily: "monospace", color: "#75aadb", fontWeight: 600,
            background: "rgba(117,170,219,0.08)", padding: "3px 8px", borderRadius: "4px",
            minWidth: "60px", textAlign: "center", letterSpacing: "0.5px",
          }}>
            {formatTimecode(playheadPos)}
          </span>

          {/* Desktop-only: Minimap, Snap, Zoom, Volume/Speed */}
          {!isMobile && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* ── Tracks area ─────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Track labels */}
        <div style={{
          width: isMobile ? "36px" : "56px", background: "linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",
          borderRight: "1px solid rgba(117,170,219,0.08)",
          display: "flex", flexDirection: "column", paddingTop: "32px", zIndex: 10, flexShrink: 0,
        }}>
          {isMobile ? (
            <>
              <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#75aadb', letterSpacing: '0.5px' }}>V1</span>
              </div>
              {hasV2Clips && (
                <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#75aadb', letterSpacing: '0.5px' }}>V2</span>
                </div>
              )}
              <div style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#34d399', letterSpacing: '0.5px' }}>A1</span>
              </div>
              {hasA2Clips && (
                <div style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#34d399', letterSpacing: '0.5px' }}>A2</span>
                </div>
              )}
              {/* Side action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px 2px', alignItems: 'center' }}>
                <button
                  onClick={() => { /* trigger audio import via parent */ }}
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', minWidth: 'auto', minHeight: 'auto',
                  }}
                  aria-label="Add audio"
                  title="Add audio"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#34d399' }}>music_note</span>
                </button>
                <button
                  onClick={() => {
                    onAddClip?.({
                      ...DEFAULT_CLIP_PROPERTIES,
                      id: `text-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                      type: 'text',
                      name: 'Title',
                      text: 'Your Text',
                      textSize: 64,
                      textBold: true,
                      startTime: currentTime || 0,
                      duration: 5,
                      track: 1,
                    });
                  }}
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', minWidth: 'auto', minHeight: 'auto',
                  }}
                  aria-label="Add text"
                  title="Add text"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#f59e0b' }}>title</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <TrackLabel icon="visibility" lockIcon="lock_open" label="V1" trackType="video" height={76}
                isMuted={trackMutes.video} isLocked={trackLocks.video}
                onToggleMute={() => setTrackMutes((p) => ({ ...p, video: !p.video }))}
                onToggleLock={() => setTrackLocks((p) => ({ ...p, video: !p.video }))}
              />
              {hasV2Clips && (
                <TrackLabel icon="visibility" lockIcon="lock_open" label="V2" trackType="video" height={76}
                  isMuted={trackMutes.video2} isLocked={trackLocks.video2}
                  onToggleMute={() => setTrackMutes((p) => ({ ...p, video2: !p.video2 }))}
                  onToggleLock={() => setTrackLocks((p) => ({ ...p, video2: !p.video2 }))}
                />
              )}
              <TrackLabel icon="volume_up" lockIcon="lock_open" label="A1" trackType="audio" height={68}
                isMuted={trackMutes.audio} isLocked={trackLocks.audio}
                onToggleMute={() => setTrackMutes((p) => ({ ...p, audio: !p.audio }))}
                onToggleLock={() => setTrackLocks((p) => ({ ...p, audio: !p.audio }))}
              />
              {hasA2Clips && (
                <TrackLabel icon="volume_up" lockIcon="lock_open" label="A2" trackType="audio" height={68}
                  isMuted={trackMutes.audio2} isLocked={trackLocks.audio2}
                  onToggleMute={() => setTrackMutes((p) => ({ ...p, audio2: !p.audio2 }))}
                  onToggleLock={() => setTrackLocks((p) => ({ ...p, audio2: !p.audio2 }))}
                />
              )}
            </>
          )}
        </div>

        {/* Timeline content (scrollable) */}
        <div
          ref={timelineRef}
          onMouseDown={startScrub}
          onWheel={handleWheel}
          onTouchStart={(e) => { startTouchScrub(e); handleTouchStartZoom(e); }}
          onTouchMove={(e) => { moveTouchScrub(e); handleTouchMoveZoom(e); }}
          onTouchEnd={() => { endTouchScrub(); handleTouchEndZoom(); }}
          tabIndex={0}
          role="application"
          aria-label="Timeline — arrow keys to scrub, S to split, Del to delete, Ctrl+wheel to zoom"
          style={{
            flex: 1, position: "relative", overflowX: "auto", overflowY: "hidden",
            background: "linear-gradient(180deg, rgba(8,10,14,0.8) 0%, rgba(6,8,12,0.9) 100%)",
            outline: "none",
          }}
          className="cs timeline-track-area"
        >
          {/* Time ruler — taller, more readable */}
          <div style={{
            height: "32px", borderBottom: "1px solid rgba(117,170,219,0.08)", position: "relative",
            width: `${tlWidth}px`,
            background: "linear-gradient(180deg, rgba(17,23,32,0.95) 0%, rgba(12,16,24,0.85) 100%)",
            zIndex: 20, cursor: "text",
          }}>
            {timeMarkers.map((mk, i) => (
              <div key={i} style={{
                position: "absolute", left: `${timeToX(mk.time, pxPerSec)}px`, height: "100%",
                borderLeft: `1px solid ${mk.major ? "rgba(117,170,219,0.2)" : "rgba(100,116,139,0.08)"}`,
                paddingLeft: "6px", display: "flex", alignItems: "flex-end",
                paddingBottom: mk.major ? "5px" : "0",
                fontSize: mk.major ? "9px" : "8px",
                color: mk.major ? "#75aadb" : "transparent",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, userSelect: "none",
                letterSpacing: "0.3px",
              }}>{mk.label}</div>
            ))}
            {/* Sub-ticks for minor markers */}
            {timeMarkers.filter(mk => !mk.major).map((mk, i) => (
              <div key={`sub-${i}`} style={{
                position: "absolute", left: `${timeToX(mk.time, pxPerSec)}px`,
                bottom: 0, width: "1px", height: "8px",
                background: "rgba(100,116,139,0.12)",
              }} />
            ))}
          </div>

          {/* Tracks container */}
          <div style={{ position: "relative", width: `${tlWidth}px`, paddingTop: "8px", paddingBottom: "10px" }}>
            {/* Snap line */}
            <div
              ref={snapLineRef}
              className="tl-snap-line"
              style={{
                position: "absolute", top: 0, width: "1px", height: "100%",
                background: "#f59e0b", zIndex: 60,
                display: "none", pointerEvents: "none",
              }}
            />

            {/* Playhead — premium blue line */}
            <div
              className={`tl-playhead ${isScrubbing ? "scrubbing" : ""}`}
              style={{
                position: "absolute", left: `${timeToX(playheadPos, pxPerSec)}px`, top: 0,
                width: "2px", height: "100%",
                background: "linear-gradient(180deg, #75aadb 0%, rgba(117,170,219,0.4) 100%)",
                zIndex: 50, pointerEvents: "none",
                boxShadow: "0 0 12px rgba(117,170,219,0.5), -1px 0 0 rgba(117,170,219,0.15), 1px 0 0 rgba(117,170,219,0.15)",
                animation: isScrubbing ? "none" : "playhead-pulse 2s ease-in-out infinite",
              }}
            >
              {/* Playhead indicator — rounded diamond shape */}
              <div style={{
                width: "12px", height: "12px",
                background: "linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",
                position: "absolute", top: "-6px", left: "-5px",
                borderRadius: "2px",
                transform: "rotate(45deg)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                border: "1px solid rgba(255,255,255,0.2)",
              }} />
              {/* Time tooltip while scrubbing */}
              {isScrubbing && (
                <div style={{
                  position: "absolute", top: "-28px", left: "-26px",
                  background: "rgba(8,10,14,0.97)", border: "1px solid rgba(117,170,219,0.4)",
                  borderRadius: "4px", padding: "3px 8px", fontSize: "9px",
                  color: "#75aadb", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)", pointerEvents: "none",
                }}>
                  {formatTimecode(playheadPos)}
                </div>
              )}
            </div>

            {/* Video track — taller */}
            <div
              onDragOver={(e) => handleDragOver(e, "video")}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "video")}
              style={{
                height: isMobile ? "48px" : "68px", position: "relative", marginLeft: isMobile ? "4px" : "12px", marginBottom: isMobile ? "2px" : "6px",
                borderRadius: "6px",
                background: trackMutes.video
                  ? "rgba(117,170,219,0.02)"
                  : "linear-gradient(180deg, rgba(117,170,219,0.05) 0%, rgba(117,170,219,0.015) 100%)",
                border: `1px solid ${trackLocks.video ? "rgba(245,158,11,0.2)" : "rgba(117,170,219,0.06)"}`,
                opacity: trackMutes.video ? 0.35 : 1,
                transition: "opacity 0.2s ease, border-color 0.2s ease",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
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

            {/* V2 track — shown when clips exist on track 1 */}
            {hasV2Clips && (
              <div style={{
                height: isMobile ? "48px" : "68px", position: "relative", marginLeft: isMobile ? "4px" : "12px", marginBottom: isMobile ? "2px" : "6px",
                borderRadius: "6px",
                background: trackMutes.video2
                  ? "rgba(117,170,219,0.02)"
                  : "linear-gradient(180deg, rgba(117,170,219,0.04) 0%, rgba(117,170,219,0.01) 100%)",
                border: "1px solid rgba(117,170,219,0.04)",
                opacity: trackMutes.video2 ? 0.35 : 1,
                transition: "opacity 0.2s ease",
              }} role="list" aria-label="Video track 2">
                {videoClips2.map((c) => (
                  <TimelineClip key={c.id} clip={c} isSelected={selectedClipId === c.id}
                    pixelsPerSecond={pxPerSec}
                    onPointerDown={handleClipPointerDown}
                    onResizeStart={handleResizeStart}
                    cutMode={activeTool === "cut"}
                  />
                ))}
              </div>
            )}

            {/* Audio track */}
            <div
              onDragOver={(e) => handleDragOver(e, "audio")}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "audio")}
              style={{
                height: isMobile ? "44px" : "60px", position: "relative", marginLeft: isMobile ? "4px" : "12px",
                borderRadius: "6px",
                background: trackMutes.audio
                  ? "rgba(52,211,153,0.02)"
                  : "linear-gradient(180deg, rgba(52,211,153,0.05) 0%, rgba(52,211,153,0.015) 100%)",
                border: `1px solid ${trackLocks.audio ? "rgba(245,158,11,0.2)" : "rgba(52,211,153,0.06)"}`,
                opacity: trackMutes.audio ? 0.35 : 1,
                transition: "opacity 0.2s ease, border-color 0.2s ease",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
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

            {/* A2 track — shown when clips exist on track 1 */}
            {hasA2Clips && (
              <div style={{
                height: isMobile ? "44px" : "60px", position: "relative", marginLeft: isMobile ? "4px" : "12px", marginTop: isMobile ? "2px" : "6px",
                borderRadius: "6px",
                background: trackMutes.audio2
                  ? "rgba(52,211,153,0.02)"
                  : "linear-gradient(180deg, rgba(52,211,153,0.04) 0%, rgba(52,211,153,0.01) 100%)",
                border: "1px solid rgba(52,211,153,0.04)",
                opacity: trackMutes.audio2 ? 0.35 : 1,
                transition: "opacity 0.2s ease",
              }} role="list" aria-label="Audio track 2">
                {audioClips2.map((c) => (
                  <TimelineClip key={c.id} clip={c} isSelected={selectedClipId === c.id}
                    pixelsPerSecond={pxPerSec}
                    onPointerDown={handleClipPointerDown}
                    onResizeStart={handleResizeStart}
                    cutMode={activeTool === "cut"}
                  />
                ))}
              </div>
            )}
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
