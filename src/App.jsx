/**
 * ClipCut Main Application
 * @module App
 */

import { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './supabase/AuthContext'
import { ProtectedRoute, PublicRoute } from './supabase/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import ClipCutSplash from './components/ClipCutSplash.jsx'
import { SPLASH_DURATION, MOBILE_BREAKPOINT } from './constants'
import { performanceMonitor, METRIC_TYPES } from './utils/performance'

// Lazy load route components for code splitting
const DesktopLogin = lazy(() => import('./components/DesktopLogin.jsx'))
const DesktopRegister = lazy(() => import('./components/DesktopRegister.jsx'))
const ResetPassword = lazy(() => import('./components/ResetPassword.jsx'))
const VerifyEmail = lazy(() => import('./components/VerifyEmail.jsx'))
const OnboardingStep1 = lazy(() => import('./components/OnboardingStep1.jsx'))
const OnboardingStep2 = lazy(() => import('./components/OnboardingStep2.jsx'))
const OnboardingStep3 = lazy(() => import('./components/OnboardingStep3.jsx'))
const Dashboard = lazy(() => import('./components/Dashboard.jsx'))
const VideoEditor = lazy(() => import('./components/VideoEditor/VideoEditor.jsx'))

/**
 * Loading fallback component for lazy-loaded routes
 */
const RouteLoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#75AADB',
    fontFamily: 'Spline Sans, sans-serif',
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(117, 170, 219, 0.2)',
        borderTopColor: '#75AADB',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{ fontSize: '14px', opacity: 0.8 }}>Loading...</span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
)

/**
 * Main application content with routing
 */
const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Track route changes for performance monitoring
  useEffect(() => {
    if (!showSplash) {
      performanceMonitor.measurePageLoad(location.pathname)
    }
  }, [location.pathname, showSplash])

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show splash screen on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      // Navigate to /login when initial splash completes
      if (window.location.pathname === '/') {
        navigate('/login')
      }
    }, SPLASH_DURATION)
    return () => clearTimeout(timer)
  }, [navigate])


  if (showSplash) {
    return <ClipCutSplash />
  }

  if (isMobile) {
    // TODO: Add mobile routes when mobile components are ready
    return <div style={{ padding: '20px', color: 'white' }}>Mobile version coming soon</div>
  }

  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* Public routes — redirect to dashboard if already logged in */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <ClipCutSplash />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <DesktopLogin 
                onNavigateToRegister={() => navigate('/register')}
              />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <DesktopRegister 
                onNavigateToLogin={() => navigate('/login')}
              />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <ProtectedRoute>
              <VerifyEmail />
            </ProtectedRoute>
          }
        />

        {/* Protected routes — redirect to login if not authenticated */}
        <Route
          path="/onboarding/1"
          element={
            <ProtectedRoute>
              <OnboardingStep1 
                onContinue={() => navigate('/onboarding/2')}
                onSkip={() => navigate('/onboarding/2')}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/2"
          element={
            <ProtectedRoute>
              <OnboardingStep2 
                onContinue={() => navigate('/onboarding/3')}
                onSkip={() => navigate('/onboarding/3')}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/3"
          element={
            <ProtectedRoute>
              <OnboardingStep3 
                onComplete={() => navigate('/dashboard')}
                onSkip={() => navigate('/dashboard')}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <VideoEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  )
}

/**
 * Root App component with providers and error boundary
 */
const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
