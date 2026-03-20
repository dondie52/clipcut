import { useRef, useEffect, useState, useCallback, useMemo, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { FILTER_PRESETS } from './constants';

/* ========== CSS ========== */
const PLAYER_CSS = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .player-root { position: relative; }
  .player-root:fullscreen { background: #000; }
  .player-root:fullscreen .player-header { display: none; }
  .player-root:fullscreen .player-viewport { padding: 0; }
  .player-root:fullscreen .player-viewport > div { max-width: 100%; border-radius: 0; border: none; }

  .player-container { position: relative; cursor: pointer; }
  .player-container:hover .overlay-controls { opacity: 1; pointer-events: auto; }
  .overlay-controls { opacity: 0; transition: opacity 0.25s ease; pointer-events: none; }
  .overlay-controls.paused { opacity: 1; pointer-events: auto; }

  .big-play {
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.15s ease;
    animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .big-play:hover { transform: scale(1.1); background: rgba(117,170,219,0.25) !important; }
  .big-play:active { transform: scale(0.92); }

  .ctrl-btn {
    transition: all 0.12s ease; border-radius: 6px; padding: 6px;
    display: flex; align-items: center; justify-content: center;
  }
  .ctrl-btn:hover { background: rgba(255,255,255,0.08); transform: scale(1.08); }
  .ctrl-btn:active { transform: scale(0.94); }

  .play-glow {
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.12s ease;
  }
  .play-glow:hover { transform: scale(1.08); background: rgba(117,170,219,0.25) !important; }
  .play-glow:active { transform: scale(0.92); }

  /* Seekbar */
  .seekbar { position: relative; cursor: pointer; height: 28px; display: flex; align-items: center; }
  .seekbar-track {
    width: 100%; height: 4px; background: rgba(255,255,255,0.08);
    border-radius: 2px; overflow: visible; position: relative;
    transition: height 0.15s ease;
  }
  .seekbar:hover .seekbar-track { height: 6px; }
  .seekbar-buffer { position: absolute; top: 0; left: 0; height: 100%; background: rgba(255,255,255,0.12); border-radius: 2px; transition: width 0.1s; }
  .seekbar-fill {
    position: absolute; top: 0; left: 0; height: 100%;
    background: linear-gradient(90deg, #5a8cbf, #75aadb);
    border-radius: 2px; transition: width 0.05s linear;
  }
  .seekbar-thumb {
    position: absolute; width: 14px; height: 14px; background: white;
    border-radius: 50%; top: 50%; transform: translate(-50%, -50%) scale(0);
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 1px 6px rgba(0,0,0,0.4), 0 0 0 2px rgba(117,170,219,0.3);
    z-index: 2;
  }
  .seekbar:hover .seekbar-thumb, .seekbar.dragging .seekbar-thumb {
    transform: translate(-50%, -50%) scale(1);
  }
  .seekbar.dragging .seekbar-thumb {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 0 0 3px rgba(117,170,219,0.4);
  }
  .seekbar-hover-time {
    position: absolute; bottom: calc(100% + 8px); transform: translateX(-50%);
    background: rgba(14,18,24,0.95); border: 1px solid rgba(117,170,219,0.2);
    padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;
    color: #75aadb; font-family: monospace; white-space: nowrap;
    opacity: 0; transition: opacity 0.12s ease; pointer-events: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .seekbar:hover .seekbar-hover-time { opacity: 1; }

  /* Volume */
  .vol-group { display: flex; align-items: center; }
  .vol-slider-wrap {
    width: 0; overflow: hidden;
    transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1), margin 0.2s ease;
  }
  .vol-group:hover .vol-slider-wrap { width: 80px; margin-left: 6px; }
  .vol-slider {
    -webkit-appearance: none; appearance: none;
    width: 80px; height: 3px; background: rgba(255,255,255,0.1);
    border-radius: 2px; outline: none; cursor: pointer;
  }
  .vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 12px; height: 12px;
    border-radius: 50%; background: #75aadb;
    border: 2px solid rgba(255,255,255,0.2);
    transition: transform 0.1s ease;
  }
  .vol-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }

  /* Speed menu */
  .speed-menu { animation: slideUp 0.15s ease; }
  .speed-opt { transition: all 0.1s ease; }
  .speed-opt:hover { background: rgba(117,170,219,0.12); }
  .speed-opt.active { color: #75aadb; font-weight: 600; }

  /* Chip buttons */
  .chip-btn {
    display: flex; align-items: center; gap: 4px;
    background: rgba(30,41,59,0.8); padding: 4px 10px; border-radius: 5px;
    font-size: 10px; color: #cbd5e1; cursor: pointer; border: none;
    font-family: 'Spline Sans', sans-serif;
    transition: background 0.12s ease;
  }
  .chip-btn:hover { background: rgba(117,170,219,0.15); }

  /* PiP indicator */
  .pip-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(117,170,219,0.9);
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    animation: fadeIn 0.2s ease;
  }
`;

/* ========== HELPER ========== */
const fmtTC = (s) => {
  if (!s || !isFinite(s)) return "00:00:00:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const fr = Math.floor((s % 1) * 30);
  return `${p2(h)}:${p2(m)}:${p2(sec)}:${p2(fr)}`;
};
const fmtShort = (s) => {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};
const p2 = (n) => n.toString().padStart(2, "0");

/* ========== SEEKBAR ========== */
const Seekbar = memo(({ currentTime, duration, onSeek, buffered = 0 }) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [hoverT, setHoverT] = useState(null);
  const [hoverX, setHoverX] = useState(0);

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufPct = duration > 0 ? (buffered / duration) * 100 : 0;

  const timeFromEvent = useCallback((e) => {
    if (!ref.current || !duration) return 0;
    const r = ref.current.getBoundingClientRect();
    return Math.max(0, Math.min(duration, ((e.clientX - r.left) / r.width) * duration));
  }, [duration]);

  const onDown = useCallback((e) => {
    e.preventDefault(); setDragging(true);
    onSeek?.(timeFromEvent(e));
  }, [timeFromEvent, onSeek]);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setHoverX(Math.max(0, Math.min(e.clientX - r.left, r.width)));
    setHoverT(timeFromEvent(e));
    if (dragging) onSeek?.(timeFromEvent(e));
  }, [dragging, timeFromEvent, onSeek]);

  const onUp = useCallback(() => setDragging(false), []);
  const onLeave = useCallback(() => { setHoverT(null); if (!dragging) setDragging(false); }, [dragging]);

  useEffect(() => {
    if (!dragging) return;
    const up = () => setDragging(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, [dragging]);

  return (
    <div ref={ref} className={`seekbar ${dragging ? "dragging" : ""}`}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onLeave}
      role="slider" aria-label="Video progress" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime}
    >
      {hoverT !== null && <div className="seekbar-hover-time" style={{ left: `${hoverX}px` }}>{fmtShort(hoverT)}</div>}
      <div className="seekbar-track">
        <div className="seekbar-buffer" style={{ width: `${bufPct}%` }} />
        <div className="seekbar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="seekbar-thumb" style={{ left: `${pct}%` }} />
    </div>
  );
});
Seekbar.displayName = "Seekbar";

/* ========== VOLUME ========== */
const VolumeControl = memo(({ volume, onChange, muted, onToggleMute }) => {
  const icon = muted || volume === 0 ? "volume_off" : volume < 0.3 ? "volume_mute" : volume < 0.7 ? "volume_down" : "volume_up";
  return (
    <div className="vol-group">
      <button onClick={onToggleMute} className="ctrl-btn" style={styles.ghost} title={muted ? "Unmute (M)" : "Mute (M)"}>
        <Icon i={icon} s={19} c="#94a3b8" />
      </button>
      <div className="vol-slider-wrap">
        <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
          onChange={(e) => onChange(Number(e.target.value))} className="vol-slider"
          aria-label={`Volume ${Math.round((muted ? 0 : volume) * 100)}%`}
        />
      </div>
    </div>
  );
});
VolumeControl.displayName = "VolumeControl";

/* ========== SPEED CONTROL ========== */
const SpeedControl = memo(({ speed, onChange }) => {
  const [open, setOpen] = useState(false);
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} className="chip-btn" aria-expanded={open}>
        {speed}x <Icon i="expand_more" s={14} />
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div className="speed-menu" style={{
            position: "absolute", bottom: "100%", right: 0, marginBottom: "8px",
            background: "rgba(26,35,50,0.98)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px", overflow: "hidden", zIndex: 100,
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            minWidth: "80px",
          }} role="listbox">
            {speeds.map(s => (
              <button key={s} onClick={() => { onChange(s); setOpen(false); }}
                className={`speed-opt ${speed === s ? "active" : ""}`}
                style={{ display: "block", width: "100%", padding: "8px 16px", background: "none", border: "none", color: speed === s ? "#75aadb" : "#94a3b8", fontSize: "12px", textAlign: "center", cursor: "pointer", fontFamily: "inherit" }}
                role="option" aria-selected={speed === s}
              >{s}x</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
SpeedControl.displayName = "SpeedControl";

/* ========== MAIN PLAYER COMPONENT ========== */
const Player = ({
  isPlaying, onPlayPause, videoSrc = null,
  currentTime = 0, duration = 0,
  onTimeUpdate, onDurationChange, onEnded, onSeek,
  onVideoError = null,
  clipProperties = null,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [dTime, setDTime] = useState(currentTime);
  const [dDur, setDDur] = useState(duration);
  const [fitMode, setFitMode] = useState("fit");
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [buffered, setBuffered] = useState(0);
  const [isPiP, setIsPiP] = useState(false);
  const [videoError, setVideoError] = useState(null);

  // ---- Sync video element ----
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) {
      setVideoError(null);
      return;
    }
    
    // Clear previous error when source changes
    setVideoError(null);
    
    const onReady = () => {
      if (v && currentTime >= 0) { 
        v.currentTime = currentTime; 
        setDTime(currentTime); 
      }
      if (isPlaying && v.paused) {
        v.play().catch((err) => {
          // Ignore AbortError - it's expected when pause() interrupts play()
          if (err.name !== 'AbortError') {
            console.warn("Video play failed:", err);
          }
        });
      } else if (!isPlaying && !v.paused) {
        v.pause();
      }
    };
    
    const onError = (e) => {
      console.error("Video error:", e);
      const error = v.error;
      if (error) {
        let errorMsg = "Video failed to load";
        let shouldConvert = false;
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            errorMsg = "Video loading aborted";
            break;
          case error.MEDIA_ERR_NETWORK:
            errorMsg = "Network error while loading video";
            break;
          case error.MEDIA_ERR_DECODE:
            errorMsg = "Video decoding error";
            shouldConvert = true;
            break;
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMsg = "Video format not supported";
            shouldConvert = true;
            break;
        }
        setVideoError(errorMsg);
        
        // If format is not supported, try to convert it
        if (shouldConvert && onVideoError && videoSrc) {
          onVideoError(videoSrc);
        }
      }
    };
    
    v.addEventListener("loadedmetadata", onReady);
    v.addEventListener("canplay", onReady);
    v.addEventListener("canplaythrough", onReady);
    v.addEventListener("error", onError);
    
    // If video is already loaded, trigger ready
    if (v.readyState >= 2) {
      if (currentTime >= 0) { 
        v.currentTime = currentTime; 
        setDTime(currentTime); 
      }
      if (isPlaying && v.paused) {
        v.play().catch((err) => {
          // Ignore AbortError - it's expected when pause() interrupts play()
          if (err.name !== 'AbortError') {
            console.warn("Video play failed:", err);
          }
        });
      } else if (!isPlaying && !v.paused) {
        v.pause();
      }
    }
    
    return () => { 
      if (v) { 
        v.removeEventListener("loadedmetadata", onReady); 
        v.removeEventListener("canplay", onReady);
        v.removeEventListener("canplaythrough", onReady);
        v.removeEventListener("error", onError);
      } 
    };
  }, [isPlaying, videoSrc, currentTime]);

  // Handle play/pause state changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;
    
    // Use a flag to prevent rapid play/pause calls
    let isHandling = false;
    
    if (isPlaying) {
      // Only play if not already playing
      if (v.paused) {
        isHandling = true;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            // Ignore AbortError - it's expected when pause() interrupts play()
            if (err.name !== 'AbortError') {
              console.warn("Video play failed:", err);
            }
            // If autoplay is blocked, sync state back to paused
            if (onPlayPause && err.name !== 'AbortError') {
              onPlayPause();
            }
          }).finally(() => {
            isHandling = false;
          });
        }
      }
    } else {
      // Only pause if currently playing
      if (!v.paused && !isHandling) {
        v.pause();
      }
    }
  }, [isPlaying, videoSrc, onPlayPause]);
  
  // Sync state with actual video playback state
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;
    
    const handlePlay = () => {
      // Video started playing - if state says paused, sync it
      // But only if it wasn't paused by user action (check if paused was called)
      if (!isPlaying && onPlayPause) {
        // Small delay to avoid race conditions
        requestAnimationFrame(() => {
          if (videoRef.current && !videoRef.current.paused && !isPlaying) {
            onPlayPause();
          }
        });
      }
    };
    
    const handlePause = () => {
      // Video paused - if state says playing, sync it
      // But only if it wasn't paused intentionally
      if (isPlaying && onPlayPause) {
        // Small delay to avoid race conditions
        requestAnimationFrame(() => {
          if (videoRef.current && videoRef.current.paused && isPlaying) {
            onPlayPause();
          }
        });
      }
    };
    
    v.addEventListener("play", handlePlay);
    v.addEventListener("pause", handlePause);
    
    return () => {
      v.removeEventListener("play", handlePlay);
      v.removeEventListener("pause", handlePause);
    };
  }, [isPlaying, videoSrc, onPlayPause]);
  
  useEffect(() => { if (videoRef.current) { videoRef.current.volume = volume; videoRef.current.muted = muted; } }, [volume, muted]);
  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = speed; }, [speed]);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current; if (!v) return;
    setDTime(v.currentTime);
    onTimeUpdate?.(v.currentTime);
    const b = v.buffered;
    if (b.length > 0) setBuffered(b.end(b.length - 1));
  }, [onTimeUpdate]);

  const handleMeta = useCallback(() => {
    const v = videoRef.current; if (!v) return;
    setDDur(v.duration); onDurationChange?.(v.duration);
  }, [onDurationChange]);

  const handleEnded = useCallback(() => onEnded?.(), [onEnded]);

  const seekTo = useCallback((t) => {
    if (videoRef.current) { videoRef.current.currentTime = t; setDTime(t); onSeek?.(t); }
  }, [onSeek]);

  const skip = useCallback((s) => {
    if (videoRef.current) seekTo(Math.max(0, Math.min(videoRef.current.duration || dDur, videoRef.current.currentTime + s)));
  }, [dDur, seekTo]);

  const stepFrame = useCallback((fwd = true) => skip(fwd ? 1 / 30 : -1 / 30), [skip]);

  // ---- Fullscreen ----
  const toggleFS = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen().catch(() => {});
  }, []);

  // ---- Picture in Picture ----
  const togglePiP = useCallback(async () => {
    const v = videoRef.current; if (!v) return;
    try {
      if (document.pictureInPictureElement) { await document.exitPictureInPicture(); setIsPiP(false); }
      else { await v.requestPictureInPicture(); setIsPiP(true); }
    } catch (e) { console.warn("PiP not supported:", e); }
  }, []);

  // PiP exit listener
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const h = () => setIsPiP(false);
    v.addEventListener("leavepictureinpicture", h);
    return () => v.removeEventListener("leavepictureinpicture", h);
  }, [videoSrc]);

  // ---- CSS live preview from clip properties ----
  const videoPreviewStyle = useMemo(() => {
    if (!clipProperties) return {};
    const transforms = [];
    const filters = [];
    const style = {};

    // Transform properties
    if (clipProperties.rotation) transforms.push(`rotate(${clipProperties.rotation}deg)`);
    if (clipProperties.scale && clipProperties.scale !== 1.0) transforms.push(`scale(${clipProperties.scale})`);
    if (clipProperties.positionX || clipProperties.positionY) {
      transforms.push(`translate(${clipProperties.positionX || 0}px, ${clipProperties.positionY || 0}px)`);
    }

    // Filter properties
    if (clipProperties.brightness) filters.push(`brightness(${1 + clipProperties.brightness})`);
    if (clipProperties.contrast) filters.push(`contrast(${1 + clipProperties.contrast})`);
    if (clipProperties.saturation !== undefined && clipProperties.saturation !== 1.0) {
      filters.push(`saturate(${clipProperties.saturation})`);
    }

    // Named filter preset CSS
    if (clipProperties.filterName) {
      const preset = FILTER_PRESETS.find(f => f.name === clipProperties.filterName);
      if (preset?.css) {
        const strength = (clipProperties.filterStrength ?? 50) / 100;
        // Scale the CSS filter by strength
        if (strength < 1) {
          filters.push(preset.css.replace(/\(([^)]+)\)/g, (match, val) => {
            const num = parseFloat(val);
            if (isNaN(num)) return match;
            // Interpolate toward identity (1.0 for most filters, 0 for effects like sepia/grayscale)
            const isIdentity = val.includes('deg') ? 0 : 1;
            return `(${isIdentity + (num - isIdentity) * strength}${val.replace(/[\d.]+/, '')})`;
          }));
        } else {
          filters.push(preset.css);
        }
      }
    }

    // Opacity
    if (clipProperties.opacity !== undefined && clipProperties.opacity !== 1.0) {
      style.opacity = clipProperties.opacity;
    }

    if (transforms.length) style.transform = transforms.join(' ');
    if (filters.length) style.filter = filters.join(' ');
    style.transition = 'transform 0.1s ease, filter 0.1s ease, opacity 0.1s ease';

    return style;
  }, [clipProperties]);

  // Apply clip speed to video element
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !clipProperties) return;
    const clipSpeed = clipProperties.speed || 1.0;
    if (v.playbackRate !== clipSpeed * speed) {
      v.playbackRate = clipSpeed * speed;
    }
  }, [clipProperties?.speed, speed]);

  // Apply clip volume/mute to video element
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !clipProperties) return;
    const clipVol = clipProperties.isMuted ? 0 : (clipProperties.volume ?? 1.0);
    v.volume = Math.min(1, clipVol * volume);
    v.muted = muted || clipProperties.isMuted;
  }, [clipProperties?.volume, clipProperties?.isMuted, volume, muted]);

  // ---- Fit mode ----
  const fitStyles = { fit: "contain", fill: "cover", original: "none" };
  const fitLabels = { fit: "Fit", fill: "Fill", original: "Original" };
  const cycleFit = useCallback(() => {
    const modes = ["fit", "fill", "original"];
    setFitMode(modes[(modes.indexOf(fitMode) + 1) % modes.length]);
  }, [fitMode]);

  // ---- Keyboard ----
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      switch (e.key) {
        case " ": e.preventDefault(); onPlayPause?.(); break;
        case "ArrowLeft": e.preventDefault(); skip(e.shiftKey ? -10 : e.altKey ? -1 / 30 : -5); break;
        case "ArrowRight": e.preventDefault(); skip(e.shiftKey ? 10 : e.altKey ? 1 / 30 : 5); break;
        case "ArrowUp": e.preventDefault(); setVolume(v => Math.min(1, v + 0.1)); break;
        case "ArrowDown": e.preventDefault(); setVolume(v => Math.max(0, v - 0.1)); break;
        case "m": case "M": e.preventDefault(); setMuted(m => !m); break;
        case "f": case "F": if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); toggleFS(); } break;
        case "p": case "P": if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); togglePiP(); } break;
        case ",": e.preventDefault(); stepFrame(false); break;
        case ".": e.preventDefault(); stepFrame(true); break;
        case "Home": e.preventDefault(); seekTo(0); break;
        case "End": e.preventDefault(); seekTo(dDur); break;
        default: break;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onPlayPause, skip, stepFrame, toggleFS, togglePiP, seekTo, dDur]);

  return (
    <section ref={containerRef} className="player-root" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#08090c", minWidth: 0 }} role="region" aria-label="Video player">
      <style>{PLAYER_CSS}</style>

      {/* Viewport — the visual heart of the editor */}
      <div className="player-viewport" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px 20px 8px",
        background: "radial-gradient(ellipse at center, rgba(117,170,219,0.02) 0%, transparent 70%)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "960px", gap: "0" }}>
          {/* Preview label bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 2px 6px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: videoSrc ? (isPlaying ? "#22c55e" : "#75aadb") : "#334155",
                boxShadow: videoSrc && isPlaying ? "0 0 6px rgba(34,197,94,0.5)" : "none",
                transition: "all 0.3s ease",
              }} />
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Preview
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {isPiP && (
                <div className="pip-indicator">
                  <Icon i="picture_in_picture_alt" s={11} c="white" />
                  <span style={{ marginLeft: "3px" }}>PiP</span>
                </div>
              )}
              {videoSrc && (
                <span style={{ fontSize: "9px", color: "#475569", fontFamily: "monospace" }}>
                  {fitLabels[fitMode]}
                </span>
              )}
            </div>
          </div>

          {/* Video canvas with premium framing */}
          <div className="player-container" onClick={onPlayPause} style={{
            width: "100%", aspectRatio: "16/9", background: "#000",
            borderRadius: "6px", border: "1px solid rgba(117,170,219,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.3)",
            overflow: "hidden", position: "relative",
          }}>
            {videoSrc ? (
              <>
                {videoError ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", color: "#ef4444", width: "100%", height: "100%", justifyContent: "center", padding: "20px", background: "radial-gradient(circle at center, rgba(239,68,68,0.05) 0%, transparent 70%)" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon i="error" s={28} c="#ef4444" />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 500 }}>{videoError}</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={(e) => { e.stopPropagation(); setVideoError(null); if (videoRef.current) videoRef.current.load(); }} style={{
                        background: "linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)", border: "none", borderRadius: "6px", padding: "7px 16px",
                        fontSize: "11px", fontWeight: 600, color: "#0a0a0a", cursor: "pointer", boxShadow: "0 2px 8px rgba(117,170,219,0.3)"
                      }}>
                        Retry
                      </button>
                      {videoError === "Video format not supported" && onVideoError && (
                        <button onClick={(e) => { e.stopPropagation(); setVideoError("Converting video..."); onVideoError(videoSrc); }} style={{
                          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", border: "none", borderRadius: "6px", padding: "7px 16px",
                          fontSize: "11px", fontWeight: 600, color: "#0a0a0a", cursor: "pointer", boxShadow: "0 2px 8px rgba(34,197,94,0.3)"
                        }}>
                          Convert Format
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      preload="metadata"
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleMeta}
                      onEnded={handleEnded}
                      style={{ width: "100%", height: "100%", objectFit: fitStyles[fitMode], ...videoPreviewStyle }}
                    />
                    {/* Center play/pause overlay */}
                    <div className={`overlay-controls ${!isPlaying ? "paused" : ""}`} style={{
                      position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 70%)",
                      pointerEvents: isPlaying ? "none" : "auto",
                    }}>
                      <button className="big-play" onClick={(e) => { e.stopPropagation(); onPlayPause?.(); }} style={{
                        width: "64px", height: "64px", borderRadius: "50%",
                        background: "rgba(117,170,219,0.15)", border: "2px solid rgba(255,255,255,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}>
                        <Icon i={isPlaying ? "pause" : "play_arrow"} s={32} c="white" />
                      </button>
                    </div>
                    {/* Safe area / letterbox corners */}
                    <div style={{ position: "absolute", top: "8px", left: "8px", width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "8px", right: "8px", width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: "8px", left: "8px", width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: "8px", right: "8px", width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
                  </>
                )}
              </>
            ) : (
              /* Premium empty state */
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
                color: "#475569", width: "100%", height: "100%", justifyContent: "center",
                background: "radial-gradient(ellipse at center, rgba(117,170,219,0.04) 0%, transparent 60%)",
              }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.03) 100%)",
                  border: "1px solid rgba(117,170,219,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}>
                  <Icon i="play_circle" s={36} c="#475569" />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#64748b", margin: "0 0 4px" }}>No media loaded</p>
                  <p style={{ fontSize: "11px", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                    Import media and add clips to the timeline to preview
                  </p>
                </div>
                <div style={{
                  display: "flex", gap: "16px", marginTop: "4px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Icon i="upload_file" s={13} c="#334155" />
                    <span style={{ fontSize: "10px", color: "#334155" }}>Ctrl+I to import</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Icon i="space_bar" s={13} c="#334155" />
                    <span style={{ fontSize: "10px", color: "#334155" }}>Space to play</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Seekbar */}
      {videoSrc && (
        <div style={{ padding: "0 20px" }}>
          <Seekbar currentTime={dTime} duration={dDur} onSeek={seekTo} buffered={buffered} />
        </div>
      )}

      {/* Controls bar — professional transport controls */}
      <div style={{ ...styles.controls, height: "48px", gap: "8px" }} className="player-controls">
        {/* Timecode display */}
        <div style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "12px", letterSpacing: "1px",
          display: "flex", gap: "2px", minWidth: "160px",
          background: "rgba(0,0,0,0.3)", padding: "4px 10px", borderRadius: "4px",
          border: "1px solid rgba(117,170,219,0.06)",
        }}>
          <span style={{ color: "#75aadb", fontWeight: 600 }}>{fmtTC(dTime).slice(0, 8)}</span>
          <span style={{ color: "rgba(117,170,219,0.4)" }}>:{fmtTC(dTime).slice(9)}</span>
          <span style={{ color: "#1e293b", margin: "0 4px" }}>/</span>
          <span style={{ color: "#475569" }}>{fmtTC(dDur)}</span>
        </div>

        {/* Center transport */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "6px" }}>
          <button onClick={() => stepFrame(false)} className="ctrl-btn" style={styles.ghost} title="Prev frame (,)">
            <Icon i="first_page" s={16} c="#475569" />
          </button>
          <button onClick={() => skip(-5)} className="ctrl-btn" style={styles.ghost} title="Skip -5s (←)">
            <Icon i="skip_previous" s={20} c="#94a3b8" />
          </button>
          <button onClick={onPlayPause} className="play-glow" style={{
            ...styles.ghost, width: "40px", height: "40px", borderRadius: "50%",
            background: isPlaying ? "rgba(117,170,219,0.2)" : "rgba(117,170,219,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(117,170,219,0.15)",
            boxShadow: isPlaying ? "0 0 12px rgba(117,170,219,0.2)" : "none",
          }} title={`${isPlaying ? "Pause" : "Play"} (Space)`}>
            <Icon i={isPlaying ? "pause" : "play_arrow"} s={28} c="white" />
          </button>
          <button onClick={() => skip(5)} className="ctrl-btn" style={styles.ghost} title="Skip +5s (→)">
            <Icon i="skip_next" s={20} c="#94a3b8" />
          </button>
          <button onClick={() => stepFrame(true)} className="ctrl-btn" style={styles.ghost} title="Next frame (.)">
            <Icon i="last_page" s={16} c="#475569" />
          </button>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <VolumeControl volume={volume} onChange={setVolume} muted={muted} onToggleMute={() => setMuted(m => !m)} />
          <SpeedControl speed={speed} onChange={setSpeed} />
          <button onClick={cycleFit} className="chip-btn" title="Fit mode">{fitLabels[fitMode]}</button>
          <button onClick={togglePiP} className="ctrl-btn" style={styles.ghost} title="Picture-in-Picture (P)">
            <Icon i="picture_in_picture_alt" s={16} c="#475569" />
          </button>
          <button onClick={toggleFS} className="ctrl-btn" style={styles.ghost} title="Fullscreen (F)">
            <Icon i="fullscreen" s={17} c="#94a3b8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(Player);