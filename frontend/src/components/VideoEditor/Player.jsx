import { useRef, useEffect, useState, useCallback, useMemo, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { buildClipCssFilter } from '../../utils/clipCanvasFilter';
import { useMobile } from '../../hooks/useMobile';
import { getPlayerRestoreState } from './restoreState';

/* ========== CSS ========== */
const PLAYER_CSS = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  /* Video-effect live previews. These mirror the behaviour of the FFmpeg
     pipeline at export — approximate, but gives the user visual feedback. */
  @keyframes clipcut-shake {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-2px, 1px); }
    25% { transform: translate(3px, -1px); }
    40% { transform: translate(-3px, 2px); }
    55% { transform: translate(2px, -2px); }
    70% { transform: translate(-1px, 3px); }
    85% { transform: translate(1px, -1px); }
  }
  @keyframes clipcut-flash {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(2.2) contrast(1.1); }
  }
  @keyframes clipcut-glitch {
    0%, 100% { transform: translate(0); filter: none; }
    20% { transform: translate(-2px, 0); filter: hue-rotate(20deg); }
    40% { transform: translate(2px, 1px); filter: hue-rotate(-30deg) saturate(1.5); }
    60% { transform: translate(-1px, -1px); filter: hue-rotate(15deg); }
    80% { transform: translate(1px, 0); filter: hue-rotate(-10deg); }
  }
  .clipcut-effect-shake { animation: clipcut-shake 0.4s linear infinite; }
  .clipcut-effect-flash { animation: clipcut-flash 1.2s ease-in-out infinite; }
  .clipcut-effect-glitch { animation: clipcut-glitch 0.3s steps(3) infinite; }
  .clipcut-vignette-overlay {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%);
  }

  .player-root { position: relative; }
  .player-root:fullscreen { background: #000; }
  .player-root:fullscreen .player-header { display: none; }
  .player-root:fullscreen .player-viewport { padding: 0; }
  .player-root:fullscreen .player-viewport > div { max-width: 100%; border-radius: 0; border: none; }

  .player-container { position: relative; cursor: pointer; container-type: inline-size; }
  @container (max-width: 420px) {
    .player-preview-badge { display: none !important; }
  }
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

  @media (max-width: 767px) {
    .seekbar-thumb {
      width: 20px; height: 20px;
      transform: translate(-50%, -50%) scale(1);
    }
    .seekbar-track { height: 6px; }
    .seekbar:hover .seekbar-thumb, .seekbar.dragging .seekbar-thumb {
      transform: translate(-50%, -50%) scale(1);
    }
    .seekbar.dragging .seekbar-thumb {
      transform: translate(-50%, -50%) scale(1.1);
    }
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

/* ========== TEXT OVERLAY POSITION MAP ========== */
const TEXT_POS_MAP = {
  'top-left':      { left: '5%',  top: '8%',  transform: 'none',              textAlign: 'left' },
  'top-center':    { left: '50%', top: '8%',  transform: 'translateX(-50%)',  textAlign: 'center' },
  'top-right':     { right: '5%', top: '8%',  transform: 'none',             textAlign: 'right' },
  'center-left':   { left: '5%',  top: '50%', transform: 'translateY(-50%)',  textAlign: 'left' },
  'center':        { left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' },
  'center-right':  { right: '5%', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' },
  'bottom-left':   { left: '5%',  bottom: '8%', transform: 'none',            textAlign: 'left' },
  'bottom-center': { left: '50%', bottom: '8%', transform: 'translateX(-50%)', textAlign: 'center' },
  'bottom-right':  { right: '5%', bottom: '8%', transform: 'none',            textAlign: 'right' },
};

/* ========== SINGLE DRAGGABLE TEXT OVERLAY ========== */
const SNAP_THRESHOLD = 2; // percent
const RESIZE_CORNERS = ['nw', 'ne', 'sw', 'se'];

const DraggableTextOverlay = memo(({ clip, isSelected, onSelect, onUpdate, containerRef, onSnapChange }) => {
  const elRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const activePointerRef = useRef({ id: null, target: null });

  const pos = clip.textPosition || 'center';
  const hasCustomPos = clip.textX != null && clip.textY != null;
  const scaleFactor = containerRef?.current ? containerRef.current.clientHeight / 1080 : 0.4;
  const scaledSize = Math.max(10, Math.round((clip.textSize || 48) * scaleFactor));

  // Build style for text position
  const positionStyle = hasCustomPos
    ? { left: `${clip.textX}%`, top: `${clip.textY}%`, transform: 'translate(-50%, -50%)' }
    : (() => {
        const p = TEXT_POS_MAP[pos] || TEXT_POS_MAP['center'];
        const s = {};
        if (p.left) s.left = p.left;
        if (p.right) s.right = p.right;
        if (p.top) s.top = p.top;
        if (p.bottom) s.bottom = p.bottom;
        s.transform = p.transform;
        return s;
      })();

  // Cleanup any captured pointer on unmount (handles clip-deleted-mid-drag).
  useEffect(() => () => {
    const { id, target } = activePointerRef.current;
    if (target && id != null) {
      try { target.releasePointerCapture(id); } catch { /* noop */ }
    }
    onSnapChange?.({ v: false, h: false });
  }, [onSnapChange]);

  const handlePointerDown = useCallback((e) => {
    if (isEditing) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    onSelect(clip.id);
    setIsDragging(true);

    const container = containerRef?.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const el = elRef.current;
    const elRect = el.getBoundingClientRect();
    const centerX = ((elRect.left + elRect.width / 2 - rect.left) / rect.width) * 100;
    const centerY = ((elRect.top + elRect.height / 2 - rect.top) / rect.height) * 100;

    dragStart.current = { x: e.clientX, y: e.clientY, startX: centerX, startY: centerY };

    const captureTarget = e.currentTarget;
    const pointerId = e.pointerId;
    try { captureTarget.setPointerCapture(pointerId); } catch { /* noop */ }
    activePointerRef.current = { id: pointerId, target: captureTarget };

    const onMove = (ev) => {
      if (ev.pointerId !== pointerId) return;
      const dx = ((ev.clientX - dragStart.current.x) / rect.width) * 100;
      const dy = ((ev.clientY - dragStart.current.y) / rect.height) * 100;
      let newX = Math.max(2, Math.min(98, dragStart.current.startX + dx));
      let newY = Math.max(2, Math.min(98, dragStart.current.startY + dy));

      // Centre snap
      const snapV = Math.abs(newX - 50) < SNAP_THRESHOLD;
      const snapH = Math.abs(newY - 50) < SNAP_THRESHOLD;
      if (snapV) newX = 50;
      if (snapH) newY = 50;
      onSnapChange?.({ v: snapV, h: snapH });

      onUpdate(clip.id, { textX: newX, textY: newY });
    };
    const onUp = (ev) => {
      if (ev.pointerId !== pointerId) return;
      setIsDragging(false);
      captureTarget.removeEventListener('pointermove', onMove);
      captureTarget.removeEventListener('pointerup', onUp);
      captureTarget.removeEventListener('pointercancel', onUp);
      try { captureTarget.releasePointerCapture(pointerId); } catch { /* noop */ }
      activePointerRef.current = { id: null, target: null };
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      onSnapChange?.({ v: false, h: false });
    };
    captureTarget.addEventListener('pointermove', onMove);
    captureTarget.addEventListener('pointerup', onUp);
    captureTarget.addEventListener('pointercancel', onUp);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, [clip.id, isEditing, onSelect, onUpdate, containerRef, onSnapChange]);

  // Corner-handle resize: scale textSize proportional to diagonal distance from centre.
  const handleResizePointerDown = useCallback((e) => {
    if (isEditing) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();

    const el = elRef.current;
    if (!el) return;
    const elRect = el.getBoundingClientRect();
    const centreX = elRect.left + elRect.width / 2;
    const centreY = elRect.top + elRect.height / 2;
    const startDiag = Math.max(1, Math.hypot(e.clientX - centreX, e.clientY - centreY));
    const startSize = clip.textSize || 48;

    const captureTarget = e.currentTarget;
    const pointerId = e.pointerId;
    try { captureTarget.setPointerCapture(pointerId); } catch { /* noop */ }

    const onMove = (ev) => {
      if (ev.pointerId !== pointerId) return;
      const diag = Math.max(1, Math.hypot(ev.clientX - centreX, ev.clientY - centreY));
      const scale = diag / startDiag;
      const newSize = Math.max(12, Math.min(200, Math.round(startSize * scale)));
      onUpdate(clip.id, { textSize: newSize });
    };
    const onUp = (ev) => {
      if (ev.pointerId !== pointerId) return;
      captureTarget.removeEventListener('pointermove', onMove);
      captureTarget.removeEventListener('pointerup', onUp);
      captureTarget.removeEventListener('pointercancel', onUp);
      try { captureTarget.releasePointerCapture(pointerId); } catch { /* noop */ }
    };
    captureTarget.addEventListener('pointermove', onMove);
    captureTarget.addEventListener('pointerup', onUp);
    captureTarget.addEventListener('pointercancel', onUp);
  }, [clip.id, clip.textSize, isEditing, onUpdate]);

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation();
    onSelect(clip.id);
    setIsEditing(true);
  }, [clip.id, onSelect]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const el = elRef.current;
    if (el) {
      const newText = el.innerText.trim();
      if (newText !== clip.text) {
        onUpdate(clip.id, { text: newText || 'Your Text' });
      }
    }
  }, [clip.id, clip.text, onUpdate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      elRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      elRef.current?.blur();
    }
    e.stopPropagation();
  }, []);

  const fontWeight = clip.textBold ? 'bold' : 'normal';
  const fontStyle = clip.textItalic ? 'italic' : 'normal';
  const textDecoration = clip.textUnderline ? 'underline' : 'none';
  const fontFamily = `'${clip.textFontFamily || 'Spline Sans'}', sans-serif`;
  const textAlign = clip.textAlign || (TEXT_POS_MAP[pos]?.textAlign) || 'center';

  const cornerStyle = (corner) => {
    const base = {
      position: 'absolute', width: '14px', height: '14px',
      background: '#75aadb', border: '2px solid #fff',
      borderRadius: '3px', zIndex: 20,
      touchAction: 'none', pointerEvents: 'auto',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
    };
    const offset = '-7px';
    if (corner === 'nw') return { ...base, top: offset, left: offset, cursor: 'nwse-resize' };
    if (corner === 'ne') return { ...base, top: offset, right: offset, cursor: 'nesw-resize' };
    if (corner === 'sw') return { ...base, bottom: offset, left: offset, cursor: 'nesw-resize' };
    return { ...base, bottom: offset, right: offset, cursor: 'nwse-resize' };
  };

  return (
    <div
      ref={elRef}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onKeyDown={isEditing ? handleKeyDown : undefined}
      style={{
        position: 'absolute',
        ...positionStyle,
        fontSize: `${scaledSize}px`,
        fontWeight,
        fontStyle,
        textDecoration,
        fontFamily,
        textAlign,
        color: clip.textColor || '#ffffff',
        textShadow: '0 1px 4px rgba(0,0,0,0.7), 0 0 2px rgba(0,0,0,0.5)',
        padding: `${scaledSize * 0.15}px ${scaledSize * 0.3}px`,
        background: clip.textBgColor || 'transparent',
        borderRadius: clip.textBgColor ? '4px' : '0',
        cursor: isEditing ? 'text' : isDragging ? 'grabbing' : 'grab',
        outline: isSelected ? '2px solid #75aadb' : 'none',
        outlineOffset: '3px',
        boxShadow: isSelected ? '0 0 0 1px rgba(117,170,219,0.3)' : 'none',
        zIndex: isSelected ? 12 : 10,
        minWidth: '20px',
        maxWidth: '90%',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        lineHeight: 1.2,
        userSelect: isEditing ? 'text' : 'none',
        pointerEvents: 'auto',
        touchAction: isEditing ? 'auto' : 'none',
      }}
    >
      {clip.text || 'Your Text'}
      {isSelected && !isEditing && RESIZE_CORNERS.map(corner => (
        <div
          key={corner}
          aria-label={`Resize ${corner}`}
          onPointerDown={handleResizePointerDown}
          style={cornerStyle(corner)}
        />
      ))}
    </div>
  );
});
DraggableTextOverlay.displayName = 'DraggableTextOverlay';

/* ========== TEXT OVERLAYS LAYER ========== */
const TextOverlaysLayer = memo(({ textOverlays, selectedClipId, onSelect, onUpdate, containerRef }) => {
  const [snap, setSnap] = useState({ v: false, h: false });
  const handleSnapChange = useCallback((next) => {
    setSnap(prev => (prev.v === next.v && prev.h === next.h ? prev : next));
  }, []);

  if (!textOverlays || textOverlays.length === 0) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
      {textOverlays.map(clip => (
        <DraggableTextOverlay
          key={clip.id}
          clip={clip}
          isSelected={selectedClipId === clip.id}
          onSelect={onSelect}
          onUpdate={onUpdate}
          containerRef={containerRef}
          onSnapChange={handleSnapChange}
        />
      ))}
      {/* Centre snap guides */}
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px',
        background: 'rgba(117,170,219,0.9)', boxShadow: '0 0 6px rgba(117,170,219,0.7)',
        transform: 'translateX(-0.5px)', opacity: snap.v ? 1 : 0,
        transition: 'opacity 0.12s ease-out', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0, height: '1px',
        background: 'rgba(117,170,219,0.9)', boxShadow: '0 0 6px rgba(117,170,219,0.7)',
        transform: 'translateY(-0.5px)', opacity: snap.h ? 1 : 0,
        transition: 'opacity 0.12s ease-out', pointerEvents: 'none',
      }} />
    </div>
  );
});
TextOverlaysLayer.displayName = 'TextOverlaysLayer';

/* ========== LEGACY CANVAS TEXT (for text on video clips) ========== */
const TextOverlayCanvas = memo(({ text, color, size, position, bgColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    const rawBw = Math.max(1, Math.floor(w * dpr));
    const rawBh = Math.max(1, Math.floor(h * dpr));
    const MAX_DIM = 8192;
    const over = rawBw > MAX_DIM || rawBh > MAX_DIM;
    let bw = rawBw;
    let bh = rawBh;
    if (over) {
      const s = Math.min(MAX_DIM / rawBw, MAX_DIM / rawBh, 1);
      bw = Math.max(1, Math.floor(rawBw * s));
      bh = Math.max(1, Math.floor(rawBh * s));
    }
    // #region agent log
    fetch('http://127.0.0.1:7548/ingest/6a46b320-d8b5-43ce-8840-a981f4bbeaac', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '07163f' },
      body: JSON.stringify({
        sessionId: '07163f',
        hypothesisId: 'H2',
        location: 'Player.jsx:TextOverlayCanvas',
        message: 'text_overlay_canvas_dims',
        data: { w, h, dpr, rawBw, rawBh, bw, bh, clamped: over },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    if (over) console.warn('[ClipCut:TextOverlayCanvas]', { w, h, rawBw, rawBh, bw, bh });
    // #endregion
    canvas.width = bw;
    canvas.height = bh;
    ctx.setTransform(bw / w, 0, 0, bh / h, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const posData = TEXT_POS_MAP[position] || TEXT_POS_MAP['bottom-center'];
    const pctX = parseFloat(posData.left || posData.right || '50') / 100;
    const pctY = parseFloat(posData.top || posData.bottom || '50') / 100;
    const scaledSize = Math.max(12, Math.round(size * (h / 1080)));
    const align = posData.textAlign || 'center';
    ctx.font = `bold ${scaledSize}px 'Spline Sans', Arial, sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = posData.top ? 'top' : posData.bottom ? 'bottom' : 'middle';

    const x = pctX * w;
    const y = pctY * h;

    if (bgColor) {
      const metrics = ctx.measureText(text);
      const pad = scaledSize * 0.25;
      const bx = align === 'center' ? x - metrics.width / 2 - pad
        : align === 'right' ? x - metrics.width - pad : x - pad;
      const by = ctx.textBaseline === 'middle' ? y - scaledSize / 2 - pad
        : ctx.textBaseline === 'bottom' ? y - scaledSize - pad : y - pad;
      ctx.fillStyle = bgColor;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(bx, by, metrics.width + pad * 2, scaledSize + pad * 2);
      ctx.globalAlpha = 1;
    }

    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }, [text, color, size, position, bgColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 5,
      }}
    />
  );
});
TextOverlayCanvas.displayName = 'TextOverlayCanvas';

/* ========== MAIN PLAYER COMPONENT ========== */
const Player = ({
  isPlaying, onPlayPause, videoSrc = null,
  currentTime = 0, duration = 0,
  onTimeUpdate, onDurationChange, onEnded, onSeek,
  onVideoError = null,
  clipProperties = null,
  textOverlays = [],
  selectedClipId = null,
  onClipUpdate = null,
  onSelectClip = null,
  transitionPreview = null,
  hasTimelineClips = false,
  hasUnavailableMediaClips = false,
  isRestoringMedia = false,
}) => {
  const isMobile = useMobile();
  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const containerRef = useRef(null);
  const videoCanvasRef = useRef(null);
  const [dTime, setDTime] = useState(currentTime);
  const [dDur, setDDur] = useState(duration);

  // Sync display duration with timeline-computed duration prop
  useEffect(() => {
    if (duration > 0) setDDur(duration);
  }, [duration]);
  const [fitMode, setFitMode] = useState("fit");
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [buffered, setBuffered] = useState(0);
  const [isPiP, setIsPiP] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [mobileControlsVisible, setMobileControlsVisible] = useState(true);
  const controlsTimerRef = useRef(null);
  const restoreState = useMemo(() => getPlayerRestoreState({
    videoSrc,
    hasTimelineClips,
    hasUnavailableMediaClips,
    isRestoringMedia,
  }), [videoSrc, hasTimelineClips, hasUnavailableMediaClips, isRestoringMedia]);

  // State machine for video element lifecycle
  const videoStateRef = useRef('idle'); // 'idle' | 'loading' | 'ready' | 'playing' | 'paused'
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  const pendingSeekRef = useRef(null);
  const suppressPauseSyncRef = useRef(false);
  const prevVideoSrcRef = useRef(null);

  const programmaticPause = useCallback((v) => {
    if (!v) return;
    suppressPauseSyncRef.current = true;
    try {
      v.pause();
    } finally {
      suppressPauseSyncRef.current = false;
    }
  }, []);

  const userTogglePlayPause = useCallback(() => {
    const v = videoRef.current;
    if (!videoSrc) {
      return; // Don't toggle play state when there's nothing to play
    }
    if (isPlaying) {
      programmaticPause(v);
      onPlayPause?.();
      return;
    }
    const playP = v?.play();
    onPlayPause?.();
    if (playP !== undefined) {
      playP.catch((err) => {
        if (err.name !== "AbortError" && onPlayPause) onPlayPause();
      });
    }
  }, [videoSrc, isPlaying, onPlayPause, programmaticPause]);

  // ---- Unified source + play/pause effect ----
  // Handles both source changes and play/pause transitions in one place
  // to prevent multiple effects from racing on the same video element.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) {
      setVideoError(null);
      videoStateRef.current = 'idle';
      return;
    }

    const sourceChanged = videoSrc !== prevVideoSrcRef.current;
    prevVideoSrcRef.current = videoSrc;

    if (sourceChanged) {
      // Source changed — need to load new video
      setVideoError(null);
      videoStateRef.current = 'loading';

      let readyCalled = false;
      const onReady = () => {
        if (readyCalled) return;
        readyCalled = true;
        videoStateRef.current = 'ready';
        if (v && currentTime >= 0) {
          v.currentTime = currentTime;
          setDTime(currentTime);
        }
        if (isPlayingRef.current && v.paused) {
          videoStateRef.current = 'playing';
          v.play().catch((err) => {
            if (err.name !== 'AbortError') console.warn("Video play failed:", err);
          });
        } else if (!isPlayingRef.current) {
          videoStateRef.current = 'paused';
          if (!v.paused) programmaticPause(v);
        }
      };

      const onError = (e) => {
        console.error("Video error:", e);
        videoStateRef.current = 'idle';
        const error = v.error;
        if (error) {
          let errorMsg = "Video failed to load";
          let shouldConvert = false;
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              errorMsg = "Video loading aborted"; break;
            case error.MEDIA_ERR_NETWORK:
              errorMsg = "Network error while loading video"; break;
            case error.MEDIA_ERR_DECODE:
              errorMsg = "Video decoding error"; shouldConvert = true; break;
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMsg = "Video format not supported"; shouldConvert = true; break;
          }
          setVideoError(errorMsg);
          if (shouldConvert && onVideoError && videoSrc) onVideoError(videoSrc);
        }
      };

      v.addEventListener("loadedmetadata", onReady);
      v.addEventListener("canplay", onReady);
      v.addEventListener("error", onError);

      if (v.readyState >= 2) onReady();

      return () => {
        if (v) {
          v.removeEventListener("loadedmetadata", onReady);
          v.removeEventListener("canplay", onReady);
          v.removeEventListener("error", onError);
        }
      };
    }

    // Same source — just handle play/pause toggle
    if (isPlaying) {
      if (v.paused && videoStateRef.current !== 'loading') {
        videoStateRef.current = 'playing';
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn("Video play failed:", err);
              if (onPlayPause) onPlayPause();
            }
          });
        }
      }
    } else {
      if (!v.paused) {
        videoStateRef.current = 'paused';
        programmaticPause(v);
      } else {
        videoStateRef.current = 'paused';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc, isPlaying, programmaticPause]);

  // ---- Seek video when paused (scrub, timeline click) ----
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;
    if (isPlaying) return;

    v.currentTime = currentTime;
    setDTime(currentTime);
    pendingSeekRef.current = currentTime;
    const target = currentTime;
    setTimeout(() => {
      if (pendingSeekRef.current === target) pendingSeekRef.current = null;
    }, 100);
  }, [currentTime, isPlaying, videoSrc]);

  // ---- Sync browser-initiated pauses (tab backgrounded, etc.) ----
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;

    const handleBrowserPause = () => {
      if (suppressPauseSyncRef.current) return;
      if (isPlayingRef.current && v.paused && onPlayPause) {
        onPlayPause();
      }
    };

    v.addEventListener("pause", handleBrowserPause);
    return () => v.removeEventListener("pause", handleBrowserPause);
  }, [videoSrc, onPlayPause]);

  // Keep transition overlay video in lockstep with the main player.
  useEffect(() => {
    const v = nextVideoRef.current;
    if (!v || !transitionPreview?.nextVideoSrc) return;
    const target = Number.isFinite(transitionPreview.nextTime) ? transitionPreview.nextTime : 0;
    if (Math.abs((v.currentTime || 0) - target) > 0.08) v.currentTime = target;
    if (isPlaying) {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } else {
      v.pause();
    }
  }, [transitionPreview?.nextVideoSrc, transitionPreview?.nextTime, isPlaying]);

  useEffect(() => { if (videoRef.current) { videoRef.current.volume = volume; videoRef.current.muted = muted; } }, [volume, muted]);
  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = speed; }, [speed]);

  // ---- requestVideoFrameCallback for frame-accurate time sync ----
  const hasRVFC = typeof HTMLVideoElement !== 'undefined' && 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isPlaying || !hasRVFC || !videoSrc) return;
    let callbackId;
    const onFrame = (_now, metadata) => {
      setDTime(metadata.mediaTime);
      if (pendingSeekRef.current === null) {
        onTimeUpdate?.(metadata.mediaTime);
      }
      const b = v.buffered;
      if (b.length > 0) setBuffered(b.end(b.length - 1));
      callbackId = v.requestVideoFrameCallback(onFrame);
    };
    callbackId = v.requestVideoFrameCallback(onFrame);
    return () => { if (callbackId) v.cancelVideoFrameCallback(callbackId); };
  }, [isPlaying, hasRVFC, videoSrc, onTimeUpdate]);

  // Fallback: onTimeUpdate for browsers without requestVideoFrameCallback (Firefox)
  const handleTimeUpdate = useCallback(() => {
    if (hasRVFC && isPlayingRef.current) return; // RVFC handles this during playback
    const v = videoRef.current; if (!v) return;
    setDTime(v.currentTime);
    if (pendingSeekRef.current !== null) return;
    onTimeUpdate?.(v.currentTime);
    const b = v.buffered;
    if (b.length > 0) setBuffered(b.end(b.length - 1));
  }, [onTimeUpdate, hasRVFC]);

  const handleMeta = useCallback(() => {
    const v = videoRef.current; if (!v) return;
    // Only use native video duration if no timeline duration was provided
    if (!duration) setDDur(v.duration);
    onDurationChange?.(v.duration);
  }, [onDurationChange, duration]);

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

  // Detect whether any CSS-based effects are active on the current clip
  const hasActiveEffects = useMemo(() => {
    if (!clipProperties) return false;
    return !!(
      clipProperties.brightness || clipProperties.contrast ||
      (clipProperties.saturation !== undefined && clipProperties.saturation !== 1.0) ||
      clipProperties.filterName || clipProperties.rotation ||
      (clipProperties.scale && clipProperties.scale !== 1.0) ||
      (clipProperties.opacity !== undefined && clipProperties.opacity !== 1.0)
    );
  }, [clipProperties]);

  // ---- Crop aspect ratio from AI smart-crop ----
  const cropAspect = clipProperties?.cropAspect || null;
  const containerAspect = useMemo(() => {
    if (!cropAspect) return '16/9';
    const map = { '9:16': '9/16', '1:1': '1/1', '4:5': '4/5' };
    return map[cropAspect] || '16/9';
  }, [cropAspect]);

  // Compute crop transform: scale video to fill the crop window, then translate based on keyframes
  const cropTransform = useMemo(() => {
    if (!cropAspect || cropAspect === '16:9') return null;
    // Scale factor: how much wider the source (16:9) is compared to the crop window
    const [cw, ch] = cropAspect.split(':').map(Number);
    const cropRatio = cw / ch; // e.g. 9/16 = 0.5625
    const srcRatio = 16 / 9;   // 1.777
    // To fill the crop window height, scale = srcRatio / cropRatio
    const scale = srcRatio / cropRatio;

    // Determine horizontal pan from keyframes at current time
    let panX = 0.5; // default: center
    const keyframes = clipProperties?.cropKeyframes;
    if (keyframes && keyframes.length > 0 && typeof currentTime === 'number') {
      const t = currentTime;
      // Find the two keyframes surrounding current time
      let before = keyframes[0], after = keyframes[keyframes.length - 1];
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (keyframes[i].time <= t && keyframes[i + 1].time >= t) {
          before = keyframes[i];
          after = keyframes[i + 1];
          break;
        }
      }
      // Interpolate x position (0..1 normalized)
      if (before.time === after.time) {
        panX = before.x ?? 0.5;
      } else {
        const progress = (t - before.time) / (after.time - before.time);
        panX = (before.x ?? 0.5) + progress * ((after.x ?? 0.5) - (before.x ?? 0.5));
      }
    }

    // Convert panX (0..1) to translateX percentage
    // At panX=0.5, translateX=0 (centered). Range: -(scale-1)/2 .. +(scale-1)/2
    const maxShift = (scale - 1) / 2;
    const translateXPct = -(panX - 0.5) * 2 * maxShift * 100;

    return { scale, translateX: translateXPct };
  }, [cropAspect, clipProperties?.cropKeyframes, currentTime]);

  // ---- CSS live preview from clip properties ----
  const videoPreviewStyle = useMemo(() => {
    if (!clipProperties) return {};
    const transforms = [];
    const style = {};

    // Crop transform (smart crop — scale + pan)
    if (cropTransform) {
      transforms.push(`scale(${cropTransform.scale})`);
      transforms.push(`translateX(${cropTransform.translateX}%)`);
    }

    // Transform properties
    if (clipProperties.rotation) transforms.push(`rotate(${clipProperties.rotation}deg)`);
    if (clipProperties.scale && clipProperties.scale !== 1.0) transforms.push(`scale(${clipProperties.scale})`);
    if (clipProperties.positionX || clipProperties.positionY) {
      transforms.push(`translate(${clipProperties.positionX || 0}px, ${clipProperties.positionY || 0}px)`);
    }

    const filterChain = buildClipCssFilter(clipProperties);
    if (filterChain && filterChain !== 'none') {
      style.filter = filterChain;
    }

    // Opacity
    if (clipProperties.opacity !== undefined && clipProperties.opacity !== 1.0) {
      style.opacity = clipProperties.opacity;
    }

    // Applied video effects (from the Effects panel — stored on clip.effects[])
    // The export path applies them via FFmpeg (blur/sharpen); the live preview
    // approximates each one in CSS so the user sees immediate feedback.
    const animationClasses = [];
    let zoomScale = 1;
    let hasVignette = false;
    if (Array.isArray(clipProperties.effects)) {
      for (const effect of clipProperties.effects) {
        if (effect.enabled === false) continue;
        switch (effect.type) {
          case 'shake':   animationClasses.push('clipcut-effect-shake'); break;
          case 'flash':   animationClasses.push('clipcut-effect-flash'); break;
          case 'glitch':  animationClasses.push('clipcut-effect-glitch'); break;
          case 'vignette': hasVignette = true; break;
          case 'zoom': {
            const factor = effect.params?.factor ?? 1.5;
            if (Number.isFinite(factor) && factor > zoomScale) zoomScale = factor;
            break;
          }
          default: break;
        }
      }
    }
    if (zoomScale > 1) transforms.push(`scale(${zoomScale})`);

    if (transforms.length) style.transform = transforms.join(' ');
    style.transition = 'transform 0.1s ease, filter 0.1s ease, opacity 0.1s ease';
    if (animationClasses.length) style._effectClassName = animationClasses.join(' ');
    if (hasVignette) style._hasVignette = true;

    return style;
  }, [clipProperties, cropTransform]);

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
        case " ": e.preventDefault(); userTogglePlayPause(); break;
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
  }, [userTogglePlayPause, skip, stepFrame, toggleFS, togglePiP, seekTo, dDur]);

  return (
    <section ref={containerRef} className="player-root" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#08090c", minWidth: 0 }} role="region" aria-label="Video player">
      <style>{PLAYER_CSS}</style>

      {/* Viewport — the visual heart of the editor */}
      <div className="player-viewport" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        ...(isMobile ? { padding: 0 } : { padding: "12px 20px 8px" }),
        background: isMobile ? "none" : "radial-gradient(ellipse at center, rgba(117,170,219,0.02) 0%, transparent 70%)",
      }}>
        <div style={{ position: "relative", width: "100%", ...(isMobile ? {} : { maxWidth: "960px" }) }}>
          {/* Video canvas */}
          <div ref={videoCanvasRef} className="player-container" onClick={(e) => {
            if (isMobile) {
              userTogglePlayPause(e);
            } else {
              userTogglePlayPause(e);
            }
          }} style={{
            width: containerAspect !== '16/9' ? 'auto' : '100%',
            height: containerAspect !== '16/9' ? '100%' : 'auto',
            aspectRatio: containerAspect, background: "#000",
            margin: containerAspect !== '16/9' ? '0 auto' : undefined,
            transition: 'aspect-ratio 0.3s ease, width 0.3s ease',
            ...(isMobile ? {
              borderRadius: 0, border: "none", boxShadow: "none",
            } : {
              borderRadius: "6px", border: "1px solid rgba(117,170,219,0.1)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.3)",
            }),
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
                      preload="auto"
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleMeta}
                      onEnded={handleEnded}
                      className={videoPreviewStyle._effectClassName}
                      style={(() => {
                        const { _effectClassName, _hasVignette, ...rest } = videoPreviewStyle;
                        return {
                          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                          objectFit: fitStyles[fitMode],
                          ...rest,
                        };
                      })()}
                    />
                    {transitionPreview?.nextVideoSrc && (
                      <video
                        ref={nextVideoRef}
                        src={transitionPreview.nextVideoSrc}
                        preload="auto"
                        muted
                        playsInline
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: fitStyles[fitMode],
                          opacity:
                            transitionPreview.type === 'fadeblack'
                              ? Math.max(0, (transitionPreview.progress - 0.5) * 2)
                              : transitionPreview.progress,
                          pointerEvents: "none",
                          zIndex: 2,
                        }}
                      />
                    )}
                    {transitionPreview?.nextVideoSrc && transitionPreview.type === 'fadeblack' && (
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "#000",
                          pointerEvents: "none",
                          zIndex: 3,
                          opacity: transitionPreview.progress < 0.5
                            ? transitionPreview.progress * 2
                            : (1 - transitionPreview.progress) * 2,
                        }}
                      />
                    )}
                    {videoPreviewStyle._hasVignette && (
                      <div className="clipcut-vignette-overlay" aria-hidden="true" />
                    )}
                    {/* Canvas text overlay preview (text on video clips) */}
                    {clipProperties?.text?.trim() && clipProperties?.type !== 'text' && (
                      <TextOverlayCanvas
                        text={clipProperties.text}
                        color={clipProperties.textColor || '#ffffff'}
                        size={clipProperties.textSize || 48}
                        position={clipProperties.textPosition || 'bottom-center'}
                        bgColor={clipProperties.textBgColor || ''}
                      />
                    )}
                    {/* Center play/pause overlay — keep below TextOverlaysLayer (z-50) so caption/text clips stay visible */}
                    <div className={`overlay-controls ${!isPlaying ? "paused" : ""}`} style={{
                      position: "absolute", inset: 0, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center",
                      background: isMobile
                        ? (isPlaying ? "none" : "rgba(0,0,0,0.3)")
                        : "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 70%)",
                      pointerEvents: isMobile ? "auto" : (isPlaying ? "none" : "auto"),
                      transition: "background 0.2s ease",
                    }}>
                      <button className="big-play" onClick={(e) => { e.stopPropagation(); userTogglePlayPause(); }} style={{
                        width: isMobile ? "56px" : "64px", height: isMobile ? "56px" : "64px", borderRadius: "50%",
                        background: isMobile ? "rgba(0,0,0,0.45)" : "rgba(117,170,219,0.15)",
                        border: isMobile ? "none" : "2px solid rgba(255,255,255,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        backdropFilter: "blur(12px)",
                        boxShadow: isMobile ? "none" : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                        opacity: isMobile ? (isPlaying ? 0 : 1) : 1,
                        transition: "opacity 0.2s ease",
                        minWidth: 'auto', minHeight: 'auto',
                      }}>
                        <Icon i={isPlaying ? "pause" : "play_arrow"} s={isMobile ? 28 : 32} c="white" />
                      </button>
                    </div>
                    {/* Safe area / letterbox corners (hidden on mobile for edge-to-edge) */}
                    {!isMobile && <div style={{ position: "absolute", top: "8px", left: "8px", width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />}
                    {!isMobile && <div style={{ position: "absolute", top: "8px", right: "8px", width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />}
                    {!isMobile && <div style={{ position: "absolute", bottom: "8px", left: "8px", width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />}
                    {!isMobile && <div style={{ position: "absolute", bottom: "8px", right: "8px", width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />}
                    {/* Preview label — top-left (hidden on mobile) */}
                    {!isMobile && (
                      <div
                        className="player-preview-badge"
                        style={{
                          position: "absolute", top: "10px", left: "10px", pointerEvents: "none",
                          display: "flex", alignItems: "center", gap: "5px", opacity: 0.4,
                        }}
                      >
                        <div style={{
                          width: "5px", height: "5px", borderRadius: "50%",
                          background: isPlaying ? "#22c55e" : "#75aadb",
                          boxShadow: isPlaying ? "0 0 6px rgba(34,197,94,0.5)" : "none",
                          transition: "all 0.3s ease",
                        }} />
                        <span style={{ fontSize: "9px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.2px" }}>
                          Preview
                        </span>
                        {hasActiveEffects && (
                          <span style={{
                            fontSize: "7px", fontWeight: 700, color: "#75aadb",
                            background: "rgba(117,170,219,0.15)", padding: "1px 4px", borderRadius: "2px",
                            letterSpacing: "0.3px", textTransform: "uppercase",
                          }}>FX</span>
                        )}
                      </div>
                    )}
                    {/* Fit mode label — top-right */}
                    <div style={{
                      position: "absolute", top: "10px", right: "10px", pointerEvents: "none",
                      opacity: 0.35,
                    }}>
                      <span style={{ fontSize: "9px", color: "#94a3b8", fontFamily: "monospace", letterSpacing: "0.5px" }}>
                        {fitLabels[fitMode]}
                      </span>
                    </div>
                    {/* Text overlays from text/caption clips — rendered above all controls */}
                    <TextOverlaysLayer
                      textOverlays={textOverlays}
                      selectedClipId={selectedClipId}
                      onSelect={onSelectClip}
                      onUpdate={onClipUpdate}
                      containerRef={videoCanvasRef}
                    />
                  </>
                )}
              </>
            ) : (
              /* Premium empty state / restoring state */
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
                color: "#475569", width: "100%", height: "100%", justifyContent: "center",
                background: "radial-gradient(ellipse at center, rgba(117,170,219,0.04) 0%, transparent 60%)",
              }}>
                {isRestoringMedia ? (
                  <>
                    <div style={{
                      width: "48px", height: "48px", border: "3px solid rgba(117,170,219,0.15)",
                      borderTop: "3px solid #75aadb", borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }} />
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#75aadb", margin: "0 0 4px" }}>
                        Restoring media...
                      </p>
                      <p style={{ fontSize: "11px", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                        Loading media files from storage
                      </p>
                    </div>
                  </>
                ) : (
                  <>
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
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#64748b", margin: "0 0 4px" }}>
                        {restoreState.title}
                      </p>
                      <p style={{ fontSize: "11px", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                        {restoreState.description}
                      </p>
                    </div>
                    {restoreState.showImportHint && (
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
                    )}
                  </>
                )}
              </div>
            )}
            {/* Text overlays — always rendered on top, even without video */}
            {!videoSrc && textOverlays.length > 0 && (
              <TextOverlaysLayer
                textOverlays={textOverlays}
                selectedClipId={selectedClipId}
                onSelect={onSelectClip}
                onUpdate={onClipUpdate}
                containerRef={videoCanvasRef}
              />
            )}
          </div>
        </div>
      </div>

      {/* Seekbar + Controls — hidden entirely on mobile (compact time bar in VideoEditor instead) */}
      {isMobile ? null : <>
      {videoSrc && (
        <div style={{ padding: "0 20px" }}>
          <Seekbar currentTime={dTime} duration={dDur} onSeek={seekTo} buffered={buffered} />
        </div>
      )}

      {/* Controls bar — professional transport controls */}
      <div style={{
        ...styles.controls,
        height: isMobile ? "auto" : "48px",
        gap: isMobile ? "8px" : "8px",
        flexDirection: "row",
        flexWrap: isMobile ? "wrap" : "nowrap",
        justifyContent: isMobile ? "center" : styles.controls.justifyContent,
        padding: isMobile ? "6px 12px 8px" : styles.controls.padding,
      }} className="player-controls">
        {/* Timecode display */}
        <div style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: isMobile ? "10px" : "12px", letterSpacing: "1px",
          display: "flex", gap: "2px", minWidth: isMobile ? "auto" : "160px",
          background: "rgba(0,0,0,0.3)", padding: isMobile ? "3px 8px" : "4px 10px", borderRadius: "4px",
          border: "1px solid rgba(117,170,219,0.06)",
          ...(isMobile ? { alignSelf: "center" } : {}),
        }}>
          <span style={{ color: "#75aadb", fontWeight: 600 }}>{fmtTC(dTime).slice(0, 8)}</span>
          <span style={{ color: "rgba(117,170,219,0.4)" }}>:{fmtTC(dTime).slice(9)}</span>
          <span style={{ color: "#1e293b", margin: "0 4px" }}>/</span>
          <span style={{ color: "#475569" }}>{fmtTC(dDur)}</span>
        </div>

        {/* Center transport */}
        <div style={{
          ...(isMobile
            ? { display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }
            : { position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "6px" }
          )
        }}>
          {!isMobile && (
            <button onClick={() => stepFrame(false)} className="ctrl-btn" style={styles.ghost} title="Prev frame (,)">
              <Icon i="first_page" s={16} c="#475569" />
            </button>
          )}
          <button onClick={() => skip(-5)} className="ctrl-btn" style={{ ...styles.ghost, minWidth: '44px', minHeight: '44px' }} title="Skip -5s (←)">
            <Icon i="skip_previous" s={20} c="#94a3b8" />
          </button>
          <button onClick={userTogglePlayPause} className="play-glow" style={{
            ...styles.ghost,
            width: isMobile ? "48px" : "40px", height: isMobile ? "48px" : "40px", borderRadius: "50%",
            background: isPlaying ? "rgba(117,170,219,0.2)" : "rgba(117,170,219,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(117,170,219,0.15)",
            boxShadow: isPlaying ? "0 0 12px rgba(117,170,219,0.2)" : "none",
          }} title={`${isPlaying ? "Pause" : "Play"} (Space)`}>
            <Icon i={isPlaying ? "pause" : "play_arrow"} s={28} c="white" />
          </button>
          <button onClick={() => skip(5)} className="ctrl-btn" style={{ ...styles.ghost, minWidth: '44px', minHeight: '44px' }} title="Skip +5s (→)">
            <Icon i="skip_next" s={20} c="#94a3b8" />
          </button>
          {!isMobile && (
            <button onClick={() => stepFrame(true)} className="ctrl-btn" style={styles.ghost} title="Next frame (.)">
              <Icon i="last_page" s={16} c="#475569" />
            </button>
          )}
        </div>

        {/* Right controls — hide volume/speed on mobile (available in inspector) */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", ...(isMobile ? { display: "none" } : {}) }}>
          <VolumeControl volume={volume} onChange={setVolume} muted={muted} onToggleMute={() => setMuted(m => !m)} />
          <SpeedControl speed={speed} onChange={setSpeed} />
          {!isMobile && <button onClick={cycleFit} className="chip-btn" title="Fit mode">{fitLabels[fitMode]}</button>}
          {!isMobile && (
            <button onClick={togglePiP} className="ctrl-btn" style={styles.ghost} title="Picture-in-Picture (P)">
              <Icon i="picture_in_picture_alt" s={16} c="#475569" />
            </button>
          )}
          {!isMobile && (
            <button onClick={toggleFS} className="ctrl-btn" style={styles.ghost} title="Fullscreen (F)">
              <Icon i="fullscreen" s={17} c="#94a3b8" />
            </button>
          )}
        </div>
      </div>
      </>}{/* end desktop controls */}
    </section>
  );
};

export default memo(Player);