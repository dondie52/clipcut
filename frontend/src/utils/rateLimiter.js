/**
 * Rate Limiter Utility
 * Client-side rate limiting for security-sensitive operations
 * @module utils/rateLimiter
 */

/**
 * Creates a rate limiter instance
 * @param {number} maxAttempts - Maximum attempts allowed in the time window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} Rate limiter instance
 */
export function createRateLimiter(maxAttempts, windowMs) {
  let attempts = [];
  let lockoutUntil = null;

  return {
    /**
     * Check if an attempt can be made
     * @returns {boolean} True if attempt is allowed
     */
    canAttempt() {
      const now = Date.now();
      
      // Check if in lockout period
      if (lockoutUntil && now < lockoutUntil) {
        return false;
      }
      
      // Clear lockout if expired
      if (lockoutUntil && now >= lockoutUntil) {
        lockoutUntil = null;
        attempts = [];
      }
      
      // Remove attempts outside the window
      attempts = attempts.filter(timestamp => now - timestamp < windowMs);
      
      return attempts.length < maxAttempts;
    },

    /**
     * Record an attempt
     */
    recordAttempt() {
      const now = Date.now();
      attempts.push(now);
      
      // If max attempts reached, start lockout
      if (attempts.length >= maxAttempts) {
        lockoutUntil = now + windowMs;
      }
    },

    /**
     * Get time until the rate limit resets
     * @returns {number} Milliseconds until reset, or 0 if not rate limited
     */
    getTimeUntilReset() {
      if (lockoutUntil) {
        const remaining = lockoutUntil - Date.now();
        return remaining > 0 ? remaining : 0;
      }
      
      if (attempts.length === 0) {
        return 0;
      }
      
      // Time until the oldest attempt expires
      const oldestAttempt = Math.min(...attempts);
      const remaining = (oldestAttempt + windowMs) - Date.now();
      return remaining > 0 ? remaining : 0;
    },

    /**
     * Get remaining attempts
     * @returns {number} Number of attempts remaining
     */
    getRemainingAttempts() {
      const now = Date.now();
      
      if (lockoutUntil && now < lockoutUntil) {
        return 0;
      }
      
      // Remove expired attempts
      attempts = attempts.filter(timestamp => now - timestamp < windowMs);
      
      return Math.max(0, maxAttempts - attempts.length);
    },

    /**
     * Reset the rate limiter
     */
    reset() {
      attempts = [];
      lockoutUntil = null;
    },

    /**
     * Check if currently in lockout
     * @returns {boolean} True if locked out
     */
    isLockedOut() {
      return lockoutUntil !== null && Date.now() < lockoutUntil;
    }
  };
}

/**
 * Persistent rate limiter that uses sessionStorage
 * Survives page refreshes but not browser close
 * @param {string} key - Storage key
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} Rate limiter instance
 */
export function createPersistentRateLimiter(key, maxAttempts, windowMs) {
  const storageKey = `rateLimiter_${key}`;
  
  function loadState() {
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore storage errors
    }
    return { attempts: [], lockoutUntil: null };
  }
  
  function saveState(state) {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }
  
  return {
    canAttempt() {
      const now = Date.now();
      const state = loadState();
      
      if (state.lockoutUntil && now < state.lockoutUntil) {
        return false;
      }
      
      if (state.lockoutUntil && now >= state.lockoutUntil) {
        saveState({ attempts: [], lockoutUntil: null });
        return true;
      }
      
      const validAttempts = state.attempts.filter(t => now - t < windowMs);
      return validAttempts.length < maxAttempts;
    },
    
    recordAttempt() {
      const now = Date.now();
      const state = loadState();
      const validAttempts = state.attempts.filter(t => now - t < windowMs);
      validAttempts.push(now);
      
      const newState = {
        attempts: validAttempts,
        lockoutUntil: validAttempts.length >= maxAttempts ? now + windowMs : null
      };
      
      saveState(newState);
    },
    
    getTimeUntilReset() {
      const state = loadState();
      const now = Date.now();
      
      if (state.lockoutUntil) {
        const remaining = state.lockoutUntil - now;
        return remaining > 0 ? remaining : 0;
      }
      
      if (state.attempts.length === 0) {
        return 0;
      }
      
      const oldestAttempt = Math.min(...state.attempts);
      const remaining = (oldestAttempt + windowMs) - now;
      return remaining > 0 ? remaining : 0;
    },
    
    getRemainingAttempts() {
      const now = Date.now();
      const state = loadState();
      
      if (state.lockoutUntil && now < state.lockoutUntil) {
        return 0;
      }
      
      const validAttempts = state.attempts.filter(t => now - t < windowMs);
      return Math.max(0, maxAttempts - validAttempts.length);
    },
    
    reset() {
      saveState({ attempts: [], lockoutUntil: null });
    },
    
    isLockedOut() {
      const state = loadState();
      return state.lockoutUntil !== null && Date.now() < state.lockoutUntil;
    }
  };
}

export default { createRateLimiter, createPersistentRateLimiter };
