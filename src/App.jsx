/**
 * ClipCut Main Application
 * @module App
 */

import { useState, useEffect, Suspense, lazy, useRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './supabase/AuthContext'
import { ProtectedRoute, PublicRoute } from './supabase/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import ClipCutSplash from './components/ClipCutSplash.jsx'
import { useSessionTimeout } from './hooks/useSessionTimeout'
import { SPLASH_DURATION, MOBILE_BREAKPOINT } from './constants'
import { performanceMonitor } from './utils/performance'
import { initAnalytics, trackPageView, trackEvent, analyticsEvents, initCoreWebVitalsTracking } from './utils/analytics'

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

const SessionTimeoutBanner = () => {
  const { showWarning, timeRemainingMs, extendSession, logoutNow } = useSessionTimeout()

  if (!showWarning) return null

  const remainingSeconds = Math.max(1, Math.ceil(timeRemainingMs / 1000))

  return (
    <div style={{
      position: 'fixed',
      top: '12px',
      right: '12px',
      zIndex: 9999,
      background: 'rgba(15,20,30,0.95)',
      border: '1px solid rgba(245, 158, 11, 0.6)',
      borderRadius: '10px',
      padding: '12px',
      width: 'min(380px, calc(100vw - 24px))',
      boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
    }}>
      <p style={{ color: '#f59e0b', margin: '0 0 10px', fontSize: '13px', fontWeight: 700 }}>
        Your session is about to expire ({remainingSeconds}s)
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={extendSession} style={bannerPrimaryButtonStyle}>Stay signed in</button>
        <button onClick={logoutNow} style={bannerSecondaryButtonStyle}>Sign out</button>
      </div>
    </div>
  )
}

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const analyticsInitialized = useRef(false)

  useEffect(() => {
    if (!analyticsInitialized.current) {
      initAnalytics()
      analyticsInitialized.current = true
    }
  }, [])

  useEffect(() => {
    const cleanup = initCoreWebVitalsTracking()
    return cleanup
  }, [])

  useEffect(() => {
    if (!showSplash) {
      performanceMonitor.measurePageLoad(location.pathname)
      trackPageView(location.pathname)
      trackEvent(analyticsEvents.pageView, { path: location.pathname })
    }
  }, [location.pathname, showSplash])

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < MOBILE_BREAKPOINT)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
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
    return <div style={{ padding: '20px', color: 'white' }}>Mobile version coming soon</div>
  }

  return (
    <>
      <SessionTimeoutBanner />
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
    </>
  )
}

const bannerPrimaryButtonStyle = {
  background: '#75AADB',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 10px',
  fontWeight: 700,
  cursor: 'pointer',
}

const bannerSecondaryButtonStyle = {
  background: 'transparent',
  color: 'rgba(255,255,255,0.75)',
  border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: '6px',
  padding: '8px 10px',
  fontWeight: 600,
  cursor: 'pointer',
}

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
