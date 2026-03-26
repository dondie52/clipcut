/**
 * Supabase Module
 * @module supabase
 * 
 * Authentication and database services using Supabase.
 */

// Supabase client instance
export { supabase } from './supabaseClient';

// Authentication context and hook
export { AuthProvider, useAuth } from './AuthContext';

// Route protection components
export { ProtectedRoute, PublicRoute } from './ProtectedRoute';

// Authentication service functions
export * from './authService';
