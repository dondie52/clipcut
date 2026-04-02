/**
 * Hook to detect mobile viewport
 * @module hooks/useMobile
 */
import { useState, useEffect } from 'react';
import { TABLET_BREAKPOINT } from '../constants/app';

/**
 * Returns true when viewport width is below the breakpoint (default 768px).
 * Uses a 150ms debounce on resize to avoid layout thrashing.
 */
export function useMobile(breakpoint = TABLET_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    let timeout;
    const handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMobile(window.innerWidth < breakpoint), 150);
    };
    window.addEventListener('resize', handler);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handler);
    };
  }, [breakpoint]);

  return isMobile;
}

/**
 * Returns true when the device is in landscape orientation.
 * Uses matchMedia for efficient orientation change detection.
 */
export function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(orientation: landscape)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(orientation: landscape)');
    const handler = (e) => setIsLandscape(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isLandscape;
}

export default useMobile;
