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
import { SPLASH_DURATION } from './constants'
import { performanceMonitor } from './utils/performance'
import { initAnalytics, trackPageView, trackEvent, analyticsEvents, initCoreWebVitalsTracking } from './utils/analytics'
import { onNetworkStatusChange } from './utils/errorHandling'
import UpdateToast from './components/UpdateToast'

// Lazy load route components for code splitting
const Landing = lazy(() => import('./components/Landing.jsx'))
const DesktopLogin = lazy(() => import('./components/DesktopLogin.jsx'))
const DesktopRegister = lazy(() => import('./components/DesktopRegister.jsx'))
const ResetPassword = lazy(() => import('./components/ResetPassword.jsx'))
const VerifyEmail = lazy(() => import('./components/VerifyEmail.jsx'))
const OnboardingStep1 = lazy(() => import('./components/OnboardingStep1.jsx'))
const OnboardingStep2 = lazy(() => import('./components/OnboardingStep2.jsx'))
const OnboardingStep3 = lazy(() => import('./components/OnboardingStep3.jsx'))
const Dashboard = lazy(() => import('./components/Dashboard.jsx'))
const VideoEditor = lazy(() => import('./components/VideoEditor/VideoEditor.jsx'))
const LongToShorts = lazy(() => import('./components/LongToShorts/LongToShorts.jsx'))
const TemplateLibrary = lazy(() => import('./components/TemplateLibrary.jsx'))
const Settings = lazy(() => import('./components/Settings.jsx'))
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

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    return onNetworkStatusChange(({ online }) => setIsOffline(!online))
  }, [])

  if (!isOffline) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: "'Spline Sans', sans-serif",
      fontSize: '13px',
      fontWeight: 600,
      color: 'white',
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>cloud_off</span>
      You're offline. Some features may be unavailable.
    </div>
  )
}

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
    // Splash hands off to whatever route is at `/` (Landing for public
    // visitors, /dashboard redirect for authenticated users via PublicRoute).
    // No forced navigate('/login') — we want unauthenticated visitors to
    // land on the marketing page, not bypass straight to the login form.
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, SPLASH_DURATION)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <ClipCutSplash />
  }

  return (
    <>
      <OfflineBanner />
      <SessionTimeoutBanner />
      <UpdateToast />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Public routes — redirect to dashboard if already logged in */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <ErrorBoundary name="landing" message="Landing page failed to load" onReset={() => navigate('/')}>
                  <Landing />
                </ErrorBoundary>
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <ErrorBoundary name="login" message="Login failed to load" onReset={() => navigate('/login')}>
                  <DesktopLogin
                    onNavigateToRegister={() => navigate('/register')}
                  />
                </ErrorBoundary>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <ErrorBoundary name="register" message="Registration failed to load" onReset={() => navigate('/register')}>
                  <DesktopRegister
                    onNavigateToLogin={() => navigate('/login')}
                  />
                </ErrorBoundary>
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ErrorBoundary name="reset-password" message="Password reset failed to load" onReset={() => navigate('/reset-password')}>
                  <ResetPassword />
                </ErrorBoundary>
              </PublicRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="verify-email" message="Email verification failed to load" onReset={() => navigate('/verify-email')}>
                  <VerifyEmail />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />

          <Route
            path="/onboarding/1"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="onboarding" onReset={() => navigate('/onboarding/1')}>
                  <OnboardingStep1
                    onContinue={() => navigate('/onboarding/2')}
                    onSkip={() => navigate('/onboarding/2')}
                    onSkipAll={() => navigate('/dashboard')}
                  />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/2"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="onboarding" onReset={() => navigate('/onboarding/2')}>
                  <OnboardingStep2
                    onContinue={() => navigate('/onboarding/3')}
                    onSkip={() => navigate('/onboarding/3')}
                    onSkipAll={() => navigate('/dashboard')}
                  />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/3"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="onboarding" onReset={() => navigate('/onboarding/3')}>
                  <OnboardingStep3
                    onComplete={() => navigate('/dashboard')}
                    onSkip={() => navigate('/dashboard')}
                  />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="dashboard" message="Dashboard failed to load" onReset={() => navigate('/dashboard')}>
                  <Dashboard />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="editor" message="Video editor encountered an error" onReset={() => navigate('/editor')}>
                  <VideoEditor />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/long-to-shorts"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="long-to-shorts" message="AI Shorts feature encountered an error" onReset={() => navigate('/long-to-shorts')}>
                  <LongToShorts />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="templates" message="Template library failed to load" onReset={() => navigate('/templates')}>
                  <TemplateLibrary />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <ErrorBoundary name="settings" message="Settings failed to load" onReset={() => navigate('/settings')}>
                  <Settings />
                </ErrorBoundary>
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

const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter basename={routerBasename}>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
