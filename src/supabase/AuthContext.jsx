/**
 * Authentication Context
 * Provides authentication state and methods throughout the application
 * @module supabase/AuthContext
 */

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "./supabaseClient";

/**
 * Session security configuration
 */
const SESSION_CONFIG = {
  // Session timeout for inactivity (30 minutes)
  INACTIVITY_TIMEOUT_MS: 30 * 60 * 1000,
  // Token refresh buffer (5 minutes before expiry)
  TOKEN_REFRESH_BUFFER_MS: 5 * 60 * 1000,
  // Session validation interval (1 minute)
  VALIDATION_INTERVAL_MS: 60 * 1000,
};

/**
 * @typedef {Object} AuthContextValue
 * @property {Object|null} user - Current authenticated user
 * @property {Object|null} session - Current session object
 * @property {boolean} loading - Whether auth state is being loaded
 * @property {Function} signOut - Function to sign out the user
 * @property {Function} refreshSession - Function to manually refresh session
 * @property {boolean} isSessionValid - Whether the current session is valid
 */

/** @type {React.Context<AuthContextValue>} */
const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  refreshSession: async () => {},
  isSessionValid: false,
});

/**
 * Auth Provider component
 * Wraps the application to provide authentication context
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);
  
  // Refs for tracking activity and timeouts
  const lastActivityRef = useRef(Date.now());
  const inactivityTimeoutRef = useRef(null);
  const validationIntervalRef = useRef(null);

  /**
   * Check if session token is about to expire
   */
  const isTokenExpiringSoon = useCallback((currentSession) => {
    if (!currentSession?.expires_at) return false;
    
    const expiresAt = currentSession.expires_at * 1000; // Convert to milliseconds
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;
    
    return timeUntilExpiry < SESSION_CONFIG.TOKEN_REFRESH_BUFFER_MS;
  }, []);

  /**
   * Validate session integrity
   */
  const validateSession = useCallback(async () => {
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.warn('Session validation error:', error.message);
        setIsSessionValid(false);
        return false;
      }
      
      if (!currentSession) {
        setIsSessionValid(false);
        return false;
      }
      
      // Check if token needs refresh
      if (isTokenExpiringSoon(currentSession)) {
        const { data: { session: refreshedSession }, error: refreshError } = 
          await supabase.auth.refreshSession();
        
        if (refreshError) {
          console.warn('Session refresh failed:', refreshError.message);
          setIsSessionValid(false);
          return false;
        }
        
        if (refreshedSession) {
          setSession(refreshedSession);
          setUser(refreshedSession.user);
        }
      }
      
      setIsSessionValid(true);
      return true;
    } catch (err) {
      console.warn('Session validation failed:', err);
      setIsSessionValid(false);
      return false;
    }
  }, [isTokenExpiringSoon]);

  /**
   * Handle user activity to reset inactivity timeout
   */
  const handleUserActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    // Reset inactivity timeout
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    
    if (session) {
      inactivityTimeoutRef.current = setTimeout(async () => {
        console.info('Session expired due to inactivity');
        await handleSignOut();
      }, SESSION_CONFIG.INACTIVITY_TIMEOUT_MS);
    }
  }, [session]);

  /**
   * Sign out and clear session
   */
  const handleSignOut = useCallback(async () => {
    // Clear any timeouts
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    if (validationIntervalRef.current) {
      clearInterval(validationIntervalRef.current);
    }
    
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Sign out error:', error);
    }
    
    setUser(null);
    setSession(null);
    setIsSessionValid(false);
  }, []);

  /**
   * Manually refresh session
   */
  const refreshSession = useCallback(async () => {
    try {
      const { data: { session: refreshedSession }, error } = 
        await supabase.auth.refreshSession();
      
      if (error) throw error;
      
      if (refreshedSession) {
        setSession(refreshedSession);
        setUser(refreshedSession.user);
        setIsSessionValid(true);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Manual session refresh failed:', err);
      setIsSessionValid(false);
      return false;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!mounted) return;
      
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setIsSessionValid(!!initialSession);
      setLoading(false);
      
      // Start inactivity timeout if logged in
      if (initialSession) {
        handleUserActivity();
      }
    });

    // Listen for auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsSessionValid(!!currentSession);
      setLoading(false);
      
      // Handle specific auth events
      switch (event) {
        case 'SIGNED_IN':
          handleUserActivity();
          break;
        case 'SIGNED_OUT':
          // Clear timeouts on sign out
          if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
          }
          break;
        case 'TOKEN_REFRESHED':
          // Session was automatically refreshed
          setIsSessionValid(true);
          break;
        case 'USER_UPDATED':
          // User data was updated
          break;
        default:
          break;
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      if (validationIntervalRef.current) {
        clearInterval(validationIntervalRef.current);
      }
    };
  }, [handleUserActivity]);

  // Set up activity listeners
  useEffect(() => {
    if (!session) return;
    
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [session, handleUserActivity]);

  // Periodic session validation
  useEffect(() => {
    if (!session) return;
    
    validationIntervalRef.current = setInterval(() => {
      validateSession();
    }, SESSION_CONFIG.VALIDATION_INTERVAL_MS);
    
    return () => {
      if (validationIntervalRef.current) {
        clearInterval(validationIntervalRef.current);
      }
    };
  }, [session, validateSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signOut: handleSignOut,
        refreshSession,
        isSessionValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 * Must be used within an AuthProvider
 * @returns {AuthContextValue} Authentication state and methods
 * @throws {Error} If used outside of AuthProvider
 * @example
 * const { user, signOut } = useAuth();
 * if (user) {
 *   console.log('Logged in as:', user.email);
 * }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
