import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, resetPassword } from "../supabase/authService";
import { validateLogin, sanitizeErrorMessage, validateEmail } from "../utils/validation";
import { createRateLimiter } from "../utils/rateLimiter";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { captureError, addBreadcrumb } from "../utils/errorTracking";

// Rate limiter: 5 attempts per minute for login
const loginRateLimiter = createRateLimiter(5, 60000);
const resetRateLimiter = createRateLimiter(3, 60000);

const DesktopLogin = ({ onNavigateToRegister }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const formRef = useRef(null);
  const emailInputRef = useRef(null);

  // Use WebP with JPEG fallback for background images
  const backgroundImages = [
    { webp: "/images/download.webp", fallback: "/images/download.jpeg" },
    { webp: "/images/download (1).webp", fallback: "/images/download (1).jpeg" },
    { webp: "/images/download (2).webp", fallback: "/images/download (2).jpeg" },
    { webp: "/images/download (3).webp", fallback: "/images/download (3).jpeg" },
  ];

  // Check WebP support once
  const [supportsWebP, setSupportsWebP] = useState(true);
  useEffect(() => {
    const checkWebP = async () => {
      const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      const img = new Image();
      img.onload = () => setSupportsWebP(true);
      img.onerror = () => setSupportsWebP(false);
      img.src = webpData;
    };
    checkWebP();
  }, []);

  // Get the appropriate image source
  const getImageSrc = (image) => supportsWebP ? image.webp : image.fallback;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setResetSuccess(false);

    // Track login attempt
    trackEvent(analyticsEvents.loginAttempt, { method: 'email' });
    addBreadcrumb({ category: 'auth', message: 'Login attempt started', level: 'info' });

    // Rate limiting check
    if (!loginRateLimiter.canAttempt()) {
      const waitTime = Math.ceil(loginRateLimiter.getTimeUntilReset() / 1000);
      const errorMsg = `Too many login attempts. Please wait ${waitTime} seconds.`;
      setError(errorMsg);
      trackEvent(analyticsEvents.loginFailure, { reason: 'rate_limit' });
      addBreadcrumb({ category: 'auth', message: 'Login rate limited', level: 'warning' });
      return;
    }

    // Client-side validation
    const validation = validateLogin({ email: email.trim(), password });
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      trackEvent(analyticsEvents.loginFailure, { reason: 'validation_error' });
      return;
    }

    setLoading(true);
    loginRateLimiter.recordAttempt();
    
    try {
      await signIn({ email: email.trim().toLowerCase(), password });
      trackEvent(analyticsEvents.loginSuccess, { method: 'email' });
      addBreadcrumb({ category: 'auth', message: 'Login successful', level: 'info' });
      navigate("/dashboard");
    } catch (err) {
      // Use sanitized error message to prevent information leakage
      const errorMsg = sanitizeErrorMessage(err, "Invalid email or password");
      setError(errorMsg);
      trackEvent(analyticsEvents.loginFailure, { reason: 'auth_error' });
      captureError(err, { 
        tags: { type: 'login_error' },
        extra: { email: email.trim().toLowerCase() }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setFieldErrors({});
    setResetSuccess(false);

    // Validate email
    const emailValidation = validateEmail(email.trim());
    if (!emailValidation.valid) {
      setFieldErrors({ email: emailValidation.error });
      return;
    }

    // Rate limiting for password reset
    if (!resetRateLimiter.canAttempt()) {
      const waitTime = Math.ceil(resetRateLimiter.getTimeUntilReset() / 1000);
      setError(`Too many reset attempts. Please wait ${waitTime} seconds.`);
      trackEvent(analyticsEvents.passwordResetRequested, { success: false, reason: 'rate_limit' });
      return;
    }

    resetRateLimiter.recordAttempt();
    setResetLoading(true);
    trackEvent(analyticsEvents.passwordResetRequested, { success: true });

    try {
      await resetPassword(email.trim().toLowerCase());
      setResetSuccess(true);
      addBreadcrumb({ category: 'auth', message: 'Password reset email sent', level: 'info' });
    } catch (err) {
      // Don't reveal if email exists or not - always show success to prevent email enumeration
      setResetSuccess(true);
      // Log error for debugging but don't expose to user
      captureError(err, { 
        tags: { type: 'password_reset_error' },
        extra: { email: email.trim().toLowerCase() }
      });
    } finally {
      setResetLoading(false);
    }
  };


  return (
    <div style={{
      width: "100vw", height: "100vh", display: "flex",
      fontFamily: "'Spline Sans', sans-serif", overflow: "hidden", position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* LEFT HALF */}
      <div style={{
        flex: 1, position: "relative", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px", overflow: "hidden", background: "#0a0a0a",
      }}>
        {/* Background slideshow with lazy loading and WebP support */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${getImageSrc(image)}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: currentImageIndex === index ? 0.6 : 0,
                transition: "opacity 1.5s ease-in-out",
              }}
            />
          ))}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.9) 100%)",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "480px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ position: "relative", width: "44px", height: "44px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "10px",
                background: "rgba(117,170,219,0.2)", border: "2px solid rgba(117,170,219,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#75AADB", fontVariationSettings: "'FILL' 1" }}>movie</span>
              </div>
              <div style={{
                position: "absolute", bottom: "-3px", right: "-3px", width: "18px", height: "18px",
                borderRadius: "50%", background: "#75AADB", display: "flex", alignItems: "center",
                justifyContent: "center", border: "2px solid #0a0a0a",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "10px", color: "#0a0a0a" }}>content_cut</span>
              </div>
            </div>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>ClipCut</span>
          </div>

          <h1 style={{ fontSize: "44px", fontWeight: 800, color: "white", lineHeight: 1.15, margin: "0 0 20px 0", letterSpacing: "-1px" }}>
            Tools for the Next Generation of{" "}<span style={{ color: "#75AADB" }}>Botswana Creators</span>
          </h1>

          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0, maxWidth: "380px" }}>
            Professional video editing tools with cloud collaboration, available across web, desktop, and mobile platforms.
          </p>
        </div>
      </div>

      {/* RIGHT HALF */}
      <div style={{
        flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px", overflow: "hidden", background: "#0a0a0a",
      }}>
        {/* Background slideshow with lazy loading and WebP support */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${getImageSrc(image)}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: currentImageIndex === index ? 0.6 : 0,
                transition: "opacity 1.5s ease-in-out",
              }}
            />
          ))}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.9) 100%)",
          }} />
        </div>

        <div style={{
          width: "100%", maxWidth: "420px", background: "rgba(26,35,50,0.6)",
          borderRadius: "16px", padding: "40px", border: "1px solid rgba(117,170,219,0.1)",
          backdropFilter: "blur(10px)", position: "relative", zIndex: 10,
        }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", margin: "0 0 6px 0" }}>
            Welcome back
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 32px 0" }}>
            Sign in to continue editing
          </p>

          {/* Success message for password reset */}
          {resetSuccess && (
            <div style={{
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "20px",
              color: "#22c55e",
              fontSize: "14px",
            }}>
              If an account exists with this email, you will receive a password reset link.
            </div>
          )}

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
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="login-email" style={labelStyle}>Email</label>
              <input 
                ref={emailInputRef}
                id="login-email"
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                autoComplete="email"
                required
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                disabled={loading}
                style={{
                  ...inputStyle,
                  borderColor: fieldErrors.email ? "rgba(239, 68, 68, 0.5)" : inputStyle.border.split(" ")[2],
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={(e) => { e.target.style.borderColor = fieldErrors.email ? "rgba(239, 68, 68, 0.7)" : "rgba(117,170,219,0.4)"; e.target.style.boxShadow = "0 0 0 2px rgba(117,170,219,0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = fieldErrors.email ? "rgba(239, 68, 68, 0.5)" : "rgba(117,170,219,0.15)"; e.target.style.boxShadow = "none"; }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
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

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="login-password" style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input 
                  id="login-password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: undefined })); }}
                  autoComplete="current-password"
                  required
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={fieldErrors.password ? "password-error" : undefined}
                  disabled={loading}
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.password ? "rgba(239, 68, 68, 0.5)" : inputStyle.border.split(" ")[2],
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={(e) => { e.target.style.borderColor = fieldErrors.password ? "rgba(239, 68, 68, 0.7)" : "rgba(117,170,219,0.4)"; e.target.style.boxShadow = "0 0 0 2px rgba(117,170,219,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = fieldErrors.password ? "rgba(239, 68, 68, 0.5)" : "rgba(117,170,219,0.15)"; e.target.style.boxShadow = "none"; }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !loading) {
                      formRef.current?.requestSubmit();
                    }
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: showPassword ? "#75AADB" : "rgba(255,255,255,0.3)",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {fieldErrors.password && (
                <span id="password-error" style={{ fontSize: "12px", color: "#ef4444" }} role="alert">
                  {fieldErrors.password}
                </span>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button 
                  type="button" 
                  onClick={(e) => { e.preventDefault(); handleForgotPassword(); }} 
                  disabled={resetLoading || loading}
                  style={{ 
                    fontSize: "12px", 
                    color: resetLoading || loading ? "rgba(117,170,219,0.5)" : "#75AADB", 
                    textDecoration: "none", 
                    cursor: resetLoading || loading ? "not-allowed" : "pointer", 
                    background: "none", 
                    border: "none", 
                    padding: 0 
                  }}
                >
                  {resetLoading ? "Sending..." : "Forgot password?"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", background: loading ? "rgba(117,170,219,0.5)" : "#75AADB", color: "#0a0a0a", fontWeight: 700, fontSize: "16px",
              padding: "14px", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s ease", marginTop: "4px",
            }}
              onMouseEnter={(e) => !loading && (e.target.style.background = "#8bbae3")}
              onMouseLeave={(e) => !loading && (e.target.style.background = "#75AADB")}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>


          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: "24px 0 0 0" }}>
            Don't have an account?
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToRegister?.(); }}
              style={{ color: "#75AADB", fontWeight: 700, textDecoration: "none", marginLeft: "6px" }}>
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Botswana Flag Stripe */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", display: "flex", zIndex: 50 }}>
        <div style={{ flex: 2, background: "#75AADB" }} />
        <div style={{ flex: 0.4, background: "white" }} />
        <div style={{ flex: 1, background: "#000" }} />
        <div style={{ flex: 0.4, background: "white" }} />
        <div style={{ flex: 2, background: "#75AADB" }} />
      </div>
    </div>
  );
};

const labelStyle = { fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)" };
const inputStyle = {
  width: "100%", background: "rgba(15,20,30,0.8)", border: "1px solid rgba(117,170,219,0.15)",
  borderRadius: "8px", padding: "14px 16px", color: "white", fontSize: "14px",
  outline: "none", transition: "all 0.2s ease", boxSizing: "border-box",
};

export default DesktopLogin;
