/**
 * Mock for src/utils/analytics.js
 */
export const trackEvent = vi.fn()
export const trackPageView = vi.fn()
export const initAnalytics = vi.fn()

export const analyticsEvents = {
  loginAttempt: 'login_attempt',
  loginSuccess: 'login_success',
  loginFailure: 'login_failure',
  registerAttempt: 'register_attempt',
  registerSuccess: 'register_success',
  registerFailure: 'register_failure',
  googleSignInAttempt: 'google_sign_in_attempt',
  passwordResetRequested: 'password_reset_requested',
  signOut: 'sign_out',
}
