import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../supabase/AuthContext';

const DEFAULT_WARNING_MS = 60_000;

export function useSessionTimeout(warningWindowMs = DEFAULT_WARNING_MS) {
  const { session, refreshSession, signOut } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemainingMs, setTimeRemainingMs] = useState(0);
  const hasExpiredRef = useRef(false);

  const expiresAtMs = useMemo(() => {
    if (!session?.expires_at) return null;
    hasExpiredRef.current = false;
    return session.expires_at * 1000;
  }, [session?.expires_at]);

  useEffect(() => {
    if (!expiresAtMs) {
      setShowWarning(false);
      setTimeRemainingMs(0);
      return;
    }

    const tick = () => {
      const remaining = expiresAtMs - Date.now();
      setTimeRemainingMs(Math.max(0, remaining));

      if (remaining <= warningWindowMs && remaining > 0) {
        setShowWarning(true);
      }

      if (remaining <= 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        setShowWarning(false);
        signOut();
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, [expiresAtMs, warningWindowMs, signOut]);

  const extendSession = async () => {
    const refreshed = await refreshSession();
    if (refreshed) {
      setShowWarning(false);
    }
    return refreshed;
  };

  return {
    showWarning,
    timeRemainingMs,
    extendSession,
    logoutNow: signOut,
  };
}

export default useSessionTimeout;
