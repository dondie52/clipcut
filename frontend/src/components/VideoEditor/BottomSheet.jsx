import { memo, useRef, useState, useEffect, useCallback } from 'react';

const TRANSITION = 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease';
const DISMISS_THRESHOLD_PX = 80; // drag past this downward from lowest snap to dismiss
// Snap points, expressed as a fraction of the viewport height.
// Portrait: single height. Landscape: three snaps so the user can
// expand the sheet to almost full-screen to reach panel content.
const PORTRAIT_SNAPS = [0.7, 0.95];
const LANDSCAPE_SNAPS = [0.4, 0.7, 0.9];

const BottomSheet = memo(function BottomSheet({ isOpen, onClose, title, zIndex = 2900, children }) {
  const sheetRef = useRef(null);
  const dragRef = useRef({ startY: 0, isDragging: false, startSnap: 0 });
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [snapIdx, setSnapIdx] = useState(0); // index into active snap points

  // Detect landscape orientation (only on phone-sized viewports).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(orientation: landscape) and (max-width: 900px)');
    const update = () => setIsLandscape(mql.matches);
    update();
    // Safari <14 uses addListener/removeListener
    if (mql.addEventListener) mql.addEventListener('change', update);
    else mql.addListener(update);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', update);
      else mql.removeListener(update);
    };
  }, []);

  const snapPoints = isLandscape ? LANDSCAPE_SNAPS : PORTRAIT_SNAPS;
  const activeSnap = snapPoints[Math.min(snapIdx, snapPoints.length - 1)] ?? snapPoints[0];

  // Reset snap to default when the sheet opens or orientation changes mid-use.
  useEffect(() => {
    if (isOpen) setSnapIdx(0);
    setTranslateY(0);
  }, [isOpen, isLandscape]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  const onTouchStart = useCallback((e) => {
    dragRef.current.startY = e.touches[0].clientY;
    dragRef.current.isDragging = true;
    dragRef.current.startSnap = snapIdx;
    setIsDragging(true);
  }, [snapIdx]);

  const onTouchMove = useCallback((e) => {
    if (!dragRef.current.isDragging) return;
    const deltaY = e.touches[0].clientY - dragRef.current.startY;
    setTranslateY(deltaY);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    setIsDragging(false);

    const dragPx = translateY;
    const viewportH = window.innerHeight || 800;

    // Drag past the bottom snap downward → dismiss.
    if (dragPx > DISMISS_THRESHOLD_PX && dragRef.current.startSnap === 0) {
      setTranslateY(0);
      onClose();
      return;
    }

    if (snapPoints.length > 1) {
      // Convert drag distance into a snap index change.
      const direction = dragPx < 0 ? -1 : dragPx > 0 ? 1 : 0;
      const threshold = viewportH * 0.08; // 8vh to shift one snap
      const steps = Math.round(Math.abs(dragPx) / threshold);
      if (steps > 0) {
        let next = dragRef.current.startSnap - direction * steps; // drag up (neg) → higher snap
        next = Math.max(0, Math.min(snapPoints.length - 1, next));
        setSnapIdx(next);
      }
    }
    setTranslateY(0);
  }, [translateY, onClose, snapPoints]);

  const backdropStyle = {
    position: 'fixed', inset: 0, bottom: '56px',
    background: 'rgba(0,0,0,0.4)', zIndex: zIndex - 100,
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'opacity 0.3s ease',
  };

  const sheetStyle = {
    position: 'fixed', bottom: '56px', left: 0, right: 0,
    height: `${Math.round(activeSnap * 100)}vh`,
    zIndex,
    background: '#0e1218',
    borderTop: '2px solid rgba(117, 170, 219, 0.15)',
    borderRadius: '12px 12px 0 0',
    display: 'flex', flexDirection: 'column',
    transform: isOpen ? `translateY(${Math.max(0, translateY)}px)` : 'translateY(100%)',
    transition: isDragging ? 'none' : TRANSITION,
  };

  const headerStyle = {
    flexShrink: 0,
    cursor: 'grab',
    touchAction: 'none',
  };

  const handleStyle = {
    width: '36px', height: '4px',
    background: 'rgba(255,255,255,0.25)',
    borderRadius: '2px', margin: '8px auto 6px',
  };

  const titleStyle = {
    fontSize: '12px', fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center', padding: '0 16px 8px',
    textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  const contentStyle = {
    flex: 1, minHeight: 0, overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    overscrollBehavior: 'contain',
  };

  return (
    <>
      <div style={backdropStyle} onClick={onClose} />
      <div ref={sheetRef} style={sheetStyle} aria-hidden={!isOpen}>
        <div
          style={headerStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div style={handleStyle} />
          {title && <div style={titleStyle}>{title}</div>}
        </div>
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </>
  );
});

export default BottomSheet;
