/**
 * Component exports for easier imports
 * @module components
 */

// Error handling
export { default as ErrorBoundary } from './ErrorBoundary.jsx'

// Splash screen
export { default as ClipCutSplash } from './ClipCutSplash.jsx'

// Authentication components
export { default as DesktopLogin } from './DesktopLogin.jsx'
export { default as DesktopRegister } from './DesktopRegister.jsx'
// TODO: MobileAuth for future mobile implementation
// export { default as MobileAuth } from './MobileAuth.jsx'

// Onboarding flow
export { default as OnboardingStep1 } from './OnboardingStep1.jsx'
export { default as OnboardingStep2 } from './OnboardingStep2.jsx'
export { default as OnboardingStep3 } from './OnboardingStep3.jsx'

// Main application
export { default as Dashboard } from './Dashboard.jsx'
export { default as VideoEditor } from './VideoEditor/VideoEditor.jsx'
