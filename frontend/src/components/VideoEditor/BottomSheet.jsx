import { memo, useRef, useState, useEffect, useCallback } from 'react';

const TRANSITION = 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)';
const DISMISS_THRESHOLD = 0.4; // drag past 40% to dismiss

const BottomSheet = memo(function BottomSheet({ isOpen, onClose, title, maxHeight = '60vh', zIndex = 2900, children }) {
  const sheetRef = useRef(null);
  const dragRef = useRef({ startY: 0, currentY: 0, isDragging: false });
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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
    setIsDragging(true);
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!dragRef.current.isDragging) return;
    const deltaY = e.touches[0].clientY - dragRef.current.startY;
    // Only allow downward drag
    if (deltaY > 0) {
      setTranslateY(deltaY);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    setIsDragging(false);
    const sheetHeight = sheetRef.current?.offsetHeight || 300;
    if (translateY > sheetHeight * DISMISS_THRESHOLD) {
      onClose();
    }
    setTranslateY(0);
  }, [translateY, onClose]);

  const backdropStyle = {
    position: 'fixed', inset: 0, bottom: '56px',
    background: 'rgba(0,0,0,0.4)', zIndex: zIndex - 100,
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'opacity 0.3s ease',
  };

  const sheetStyle = {
    position: 'fixed', bottom: '56px', left: 0, right: 0,
    maxHeight, zIndex,
    background: '#0e1218',
    borderTop: '2px solid rgba(117, 170, 219, 0.15)',
    borderRadius: '12px 12px 0 0',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    overscrollBehavior: 'contain',
    transform: isOpen ? `translateY(${translateY}px)` : 'translateY(100%)',
    transition: isDragging ? 'none' : TRANSITION,
  };

  const handleStyle = {
    width: '36px', height: '4px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '2px', margin: '8px auto',
    cursor: 'grab',
  };

  const titleStyle = {
    fontSize: '12px', fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center', padding: '0 16px 8px',
    textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  return (
    <>
      <div style={backdropStyle} onClick={onClose} />
      <div ref={sheetRef} style={sheetStyle}>
        <div
          style={handleStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
        {title && <div style={titleStyle}>{title}</div>}
        {children}
      </div>
    </>
  );
});

export default BottomSheet;
