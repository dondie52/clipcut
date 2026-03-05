import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signInWithGoogle } from "../supabase/authService";
import { getUserFriendlyMessage } from "../utils/errorHandling";
import {
  validateRegistration,
  sanitizeUsername,
  PASSWORD_REQUIREMENTS
} from "../utils/validation";
import { createRateLimiter } from "../utils/rateLimiter";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { captureError, addBreadcrumb } from "../utils/errorTracking";
import BotswanaStripe from "./shared/BotswanaStripe";
import PasswordStrengthBar, { getStrength } from "./shared/PasswordStrengthBar";

// Rate limiter: 3 registration attempts per 2 minutes
const registerRateLimiter = createRateLimiter(3, 120000);

const DesktopRegister = ({ onNavigateToLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const formRef = useRef(null);
  const usernameInputRef = useRef(null);

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Track registration attempt
    trackEvent(analyticsEvents.registerAttempt, { method: 'email' });
    addBreadcrumb({ category: 'auth', message: 'Registration attempt started', level: 'info' });

    // Rate limiting check
    if (!registerRateLimiter.canAttempt()) {
      const waitTime = Math.ceil(registerRateLimiter.getTimeUntilReset() / 1000);
      const errorMsg = `Too many registration attempts. Please wait ${waitTime} seconds.`;
      setError(errorMsg);
      trackEvent(analyticsEvents.registerFailure, { reason: 'rate_limit' });
      addBreadcrumb({ category: 'auth', message: 'Registration rate limited', level: 'warning' });
      return;
    }

    // Sanitize username before validation
    const sanitizedUsername = sanitizeUsername(username);

    // Client-side validation with enhanced requirements
    const validation = validateRegistration({
      email: email.trim(),
      password,
      confirmPassword,
      username: sanitizedUsername,
    });

    if (!validation.valid) {
      setFieldErrors(validation.errors);
      trackEvent(analyticsEvents.registerFailure, { reason: 'validation_error' });
      return;
    }

    setLoading(true);
    registerRateLimiter.recordAttempt();

    try {
      await signUp({ 
        email: email.trim().toLowerCase(), 
        password, 
        username: sanitizedUsername 
      });
      trackEvent(analyticsEvents.registerSuccess, { method: 'email' });
      addBreadcrumb({ category: 'auth', message: 'Registration successful', level: 'info' });
      navigate("/onboarding/1");
    } catch (err) {
      const errorMsg = getUserFriendlyMessage(err, 'auth');
      setError(errorMsg);
      trackEvent(analyticsEvents.registerFailure, { reason: 'auth_error' });
      captureError(err, {
        tags: { type: 'registration_error' },
        extra: { email: email.trim().toLowerCase(), username: username.trim() }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setFieldErrors({});
    setGoogleLoading(true);
    
    trackEvent(analyticsEvents.googleSignInAttempt, {});
    addBreadcrumb({ category: 'auth', message: 'Google sign-in attempt', level: 'info' });
    
    try {
      await signInWithGoogle();
      trackEvent(analyticsEvents.registerSuccess, { method: 'google' });
      addBreadcrumb({ category: 'auth', message: 'Google sign-in successful', level: 'info' });
    } catch (err) {
      const errorMsg = getUserFriendlyMessage(err, 'auth');
      setError(errorMsg);
      trackEvent(analyticsEvents.registerFailure, { reason: 'google_auth_error' });
      captureError(err, {
        tags: { type: 'google_auth_error' }
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  // Clear field error when user starts typing
  const clearFieldError = (field) => {
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <main style={{
      width: "100vw", height: "100vh", display: "flex",
      fontFamily: "'Spline Sans', sans-serif", overflow: "hidden", position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* LEFT HALF */}
      <div style={{
        flex: 1, position: "relative", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px", overflow: "hidden",
        background: "linear-gradient(160deg, #0a0e15 0%, #0d1520 50%, #0a0e15 100%)",
      }}>
        <div style={{ maxWidth: "480px" }}>
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ position: "relative", width: "44px", height: "44px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "10px",
                background: "rgba(117,170,219,0.2)", border: "2px solid rgba(117,170,219,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: "24px", color: "#75AADB", fontVariationSettings: "'FILL' 1",
                }}>movie</span>
              </div>
              <div style={{
                position: "absolute", bottom: "-3px", right: "-3px", width: "18px", height: "18px",
                borderRadius: "50%", background: "#75AADB", display: "flex", alignItems: "center",
                justifyContent: "center", border: "2px solid #0a0e15",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "10px", color: "#0a0e15" }}>content_cut</span>
              </div>
            </div>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>ClipCut</span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "44px", fontWeight: 800, color: "white",
            lineHeight: 1.15, margin: "0 0 20px 0", letterSpacing: "-1px",
          }}>
            The next generation of{" "}
            <span style={{ color: "#75AADB" }}>video editing</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "17px", color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6, margin: 0, maxWidth: "380px",
          }}>
            Professional tools, cloud collaboration, and AI-powered workflows in a single browser tab.
          </p>
        </div>
      </div>

      {/* RIGHT HALF */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px", background: "linear-gradient(180deg, #0e1520 0%, #0a0f18 100%)",
      }}>
        {/* Form card */}
        <div style={{
          width: "100%", maxWidth: "420px", background: "rgba(26,35,50,0.6)",
          borderRadius: "16px", padding: "40px", border: "1px solid rgba(117,170,219,0.1)",
        }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", margin: "0 0 6px 0" }}>
            Create your account
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0" }}>
            Start editing for free
          </p>

          {/* Error message */}
          {error && (
            <div style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "20px",
              color: "#ef4444",
              fontSize: "14px",
            }}
            role="alert"
            aria-live="polite"
            >
              {error}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }} noValidate>
            {/* Username */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="register-username" style={labelStyle}>Username</label>
              <input 
                ref={usernameInputRef}
                id="register-username"
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => { 
                  const sanitized = sanitizeUsername(e.target.value);
                  setUsername(sanitized);
                  clearFieldError('username');
                }}
                autoComplete="username"
                required
                minLength={3}
                maxLength={30}
                aria-invalid={!!fieldErrors.username}
                aria-describedby={fieldErrors.username ? "username-error" : "username-hint"}
                disabled={loading || googleLoading}
                style={{
                  ...inputStyle,
                  borderColor: fieldErrors.username ? "rgba(239, 68, 68, 0.5)" : undefined,
                  opacity: loading || googleLoading ? 0.6 : 1,
                }}
                onFocus={(e) => focusHandler(e, !!fieldErrors.username)} 
                onBlur={(e) => blurHandler(e, !!fieldErrors.username)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading && !googleLoading) {
                    formRef.current?.requestSubmit();
                  }
                }}
              />
              <span id="username-hint" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                3-30 characters, letters, numbers, and underscores only
              </span>
              {fieldErrors.username && (
                <span id="username-error" style={{ fontSize: "12px", color: "#ef4444" }} role="alert">
                  {fieldErrors.username}
                </span>
              )}
            </div>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="register-email" style={labelStyle}>Email address</label>
              <input 
                id="register-email"
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
                autoComplete="email"
                required
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                disabled={loading || googleLoading}
                style={{
                  ...inputStyle,
                  borderColor: fieldErrors.email ? "rgba(239, 68, 68, 0.5)" : undefined,
                  opacity: loading || googleLoading ? 0.6 : 1,
                }}
                onFocus={(e) => focusHandler(e, !!fieldErrors.email)} 
                onBlur={(e) => blurHandler(e, !!fieldErrors.email)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading && !googleLoading) {
                    formRef.current?.requestSubmit();
                  }
                }}
              />
              {fieldErrors.email && (
                <span id="email-error" style={{ fontSize: "12px", color: "#ef4444" }} role="alert">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="register-password" style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input 
                  id="register-password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  value={password} 
                  onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }}
                  autoComplete="new-password"
                  required
                  minLength={PASSWORD_REQUIREMENTS.minLength}
                  aria-invalid={!!fieldErrors.password || (password && !strength.isValid)}
                  aria-describedby="password-requirements password-strength"
                  disabled={loading || googleLoading}
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.password ? "rgba(239, 68, 68, 0.5)" : undefined,
                    opacity: loading || googleLoading ? 0.6 : 1,
                  }}
                  onFocus={(e) => focusHandler(e, !!fieldErrors.password)} 
                  onBlur={(e) => blurHandler(e, !!fieldErrors.password)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !loading && !googleLoading) {
                      formRef.current?.requestSubmit();
                    }
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={eyeBtnStyle}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {/* Password requirements hint */}
              <span id="password-requirements" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                Min {PASSWORD_REQUIREMENTS.minLength} chars, uppercase, lowercase, number, special character
              </span>
              <div id="password-strength">
                <PasswordStrengthBar password={password} />
              </div>
              {fieldErrors.password && (
                <span style={{ fontSize: "12px", color: "#ef4444" }} role="alert">
                  {fieldErrors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="register-confirm-password" style={labelStyle}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input 
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm your password"
                  value={confirmPassword} 
                  onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }}
                  autoComplete="new-password"
                  required
                  aria-invalid={!!fieldErrors.confirmPassword}
                  aria-describedby={fieldErrors.confirmPassword ? "confirm-password-error" : undefined}
                  disabled={loading || googleLoading}
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.confirmPassword ? "rgba(239, 68, 68, 0.5)" : undefined,
                    opacity: loading || googleLoading ? 0.6 : 1,
                  }}
                  onFocus={(e) => focusHandler(e, !!fieldErrors.confirmPassword)} 
                  onBlur={(e) => blurHandler(e, !!fieldErrors.confirmPassword)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !loading && !googleLoading) {
                      formRef.current?.requestSubmit();
                    }
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  style={eyeBtnStyle}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <span id="confirm-password-error" style={{ fontSize: "12px", color: "#ef4444" }} role="alert">
                  {fieldErrors.confirmPassword}
                </span>
              )}
            </div>

            {/* Create Account */}
            <button type="submit" disabled={loading} style={{
              ...btnPrimary,
              background: loading ? "rgba(117,170,219,0.5)" : btnPrimary.background,
              cursor: loading ? "not-allowed" : "pointer",
            }}
              onMouseEnter={(e) => !loading && (e.target.style.background = "#8bbae3")}
              onMouseLeave={(e) => !loading && (e.target.style.background = "#75AADB")}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "28px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Google */}
          <button 
            type="button" 
            onClick={handleGoogleSignIn} 
            disabled={loading || googleLoading}
            style={{
              ...btnGoogle,
              opacity: loading || googleLoading ? 0.6 : 1,
              cursor: loading || googleLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => !loading && !googleLoading && (e.currentTarget.style.background = "rgba(255,255,255,0.95)")}
            onMouseLeave={(e) => !loading && !googleLoading && (e.currentTarget.style.background = "white")}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>{googleLoading ? "Connecting..." : "Continue with Google"}</span>
          </button>

          {/* Footer */}
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "24px 0 0 0" }}>
            Already have an account?
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin?.(); }} style={{ color: "#75AADB", fontWeight: 700, textDecoration: "none", marginLeft: "6px" }}>
              Sign in
            </a>
          </p>
        </div>
      </div>

      <BotswanaStripe />
    </main>
  );
};

const focusHandler = (e, hasError = false) => { 
  e.target.style.borderColor = hasError ? "rgba(239, 68, 68, 0.7)" : "rgba(117,170,219,0.4)"; 
  e.target.style.boxShadow = "0 0 0 2px rgba(117,170,219,0.08)"; 
};
const blurHandler = (e, hasError = false) => { 
  e.target.style.borderColor = hasError ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.08)"; 
  e.target.style.boxShadow = "none"; 
};

const labelStyle = { fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.7)" };
const inputStyle = {
  width: "100%", background: "rgba(15,20,30,0.8)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px", padding: "14px 16px", color: "white", fontSize: "14px",
  outline: "none", transition: "all 0.2s ease", boxSizing: "border-box",
};
const eyeBtnStyle = {
  position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
  background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)",
  padding: "8px", minWidth: "44px", minHeight: "44px",
  display: "flex", alignItems: "center", justifyContent: "center",
};
const btnPrimary = {
  width: "100%", background: "#75AADB", color: "#0a0a0a", fontWeight: 700, fontSize: "16px",
  padding: "15px", borderRadius: "10px", border: "none", cursor: "pointer",
  transition: "all 0.2s ease", marginTop: "4px",
};
const btnGoogle = {
  width: "100%", background: "white", color: "#0a0a0a", fontWeight: 600, padding: "15px",
  borderRadius: "10px", border: "none", cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "15px",
  transition: "all 0.2s ease",
};

export default DesktopRegister;
