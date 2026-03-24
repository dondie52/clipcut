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

export default useMobile;
