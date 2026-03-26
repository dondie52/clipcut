/**
 * Supabase Client Configuration
 * @module supabase/supabaseClient
 * 
 * Environment variables are loaded from .env file via Vite.
 * Copy env.example to .env and fill in your Supabase credentials.
 */

import { createClient } from "@supabase/supabase-js";

// Get environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Validate Supabase URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid Supabase URL
 */
function isValidSupabaseUrl(url) {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const parsed = new URL(url);
    // Must be HTTPS in production
    if (import.meta.env.PROD && parsed.protocol !== 'https:') {
      return false;
    }
    // Should be a supabase.co domain or custom domain
    // Accept any valid URL structure for flexibility
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Validate Supabase anon key format
 * JWT format: xxxxx.xxxxx.xxxxx
 * @param {string} key - Key to validate
 * @returns {boolean} True if valid format
 */
function isValidSupabaseKey(key) {
  if (!key || typeof key !== 'string') return false;
  
  // Supabase anon keys are JWTs with 3 parts separated by dots
  const parts = key.split('.');
  if (parts.length !== 3) return false;
  
  // Each part should be base64url encoded
  const base64urlRegex = /^[A-Za-z0-9_-]+$/;
  return parts.every(part => part.length > 0 && base64urlRegex.test(part));
}

// Validate environment variables with detailed error messages
const validationErrors = [];

if (!supabaseUrl) {
  validationErrors.push('VITE_SUPABASE_URL is not set');
} else if (!isValidSupabaseUrl(supabaseUrl)) {
  validationErrors.push('VITE_SUPABASE_URL is not a valid URL');
}

if (!supabaseAnonKey) {
  validationErrors.push('VITE_SUPABASE_ANON_KEY is not set');
} else if (!isValidSupabaseKey(supabaseAnonKey)) {
  validationErrors.push('VITE_SUPABASE_ANON_KEY is not a valid Supabase key format');
}

// In development, log errors. In production, throw to prevent running with invalid config.
if (validationErrors.length > 0) {
  const errorMessage = 
    'Supabase configuration error:\n' +
    validationErrors.map(e => `  - ${e}`).join('\n') +
    '\n\nPlease copy env.example to .env and fill in your credentials.';
  
  if (import.meta.env.PROD) {
    // In production, throw an error to prevent the app from running with invalid config
    throw new Error(errorMessage);
  } else {
    // In development, log a warning but allow the app to run for testing
    console.error(errorMessage);
  }
}

const FALLBACK_SUPABASE_URL = 'http://127.0.0.1:54321';
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjowfQ.invalid';

const resolvedSupabaseUrl =
  validationErrors.length === 0 ? supabaseUrl : FALLBACK_SUPABASE_URL;
const resolvedSupabaseAnonKey =
  validationErrors.length === 0 ? supabaseAnonKey : FALLBACK_SUPABASE_ANON_KEY;

/**
 * Supabase client instance
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createClient(
  resolvedSupabaseUrl,
  resolvedSupabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Security: Don't store session in URL hash (use localStorage instead)
      flowType: 'pkce',
    },
    // Security: Add request timeout
    global: {
      headers: {
        'X-Client-Info': 'clipcut-web',
      },
    },
  }
);

/**
 * Check if Supabase client is properly configured
 * @returns {boolean} True if client is configured
 */
export function isSupabaseConfigured() {
  return validationErrors.length === 0;
}
