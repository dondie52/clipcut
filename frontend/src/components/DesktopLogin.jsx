/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2026 ClipCut Contributors / Bokas Technologies (Pty) Ltd
 * Licensed under the MIT License
 *
 * @module components/DesktopLogin
 * @description Login page — cinematic dark UI with Botswana blue accent
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, resetPassword } from "../supabase/authService";
import { validateLogin, sanitizeErrorMessage, validateEmail } from "../utils/validation";
import { createRateLimiter } from "../utils/rateLimiter";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { captureError, addBreadcrumb } from "../utils/errorTracking";
import { getUserFriendlyMessage, isNetworkError } from "../utils/errorHandling";
import BotswanaStripe from "./shared/BotswanaStripe";
import { MOBILE_BREAKPOINT } from "../constants";

const loginRateLimiter = createRateLimiter(5, 60000);
const resetRateLimiter = createRateLimiter(3, 60000);

const LOGIN_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');
  :root {
    --cc-bg: #0a0a0a;
    --cc-bg-alt: #0d1117;
    --cc-surface: #1a2332;
    --cc-surface-raised: rgba(26,35,50,0.6);
    --cc-border: rgba(255,255,255,0.06);
    --cc-border-hover: rgba(255,255,255,0.1);
    --cc-border-focus: rgba(117,170,219,0.45);
    --cc-accent: #75AADB;
    --cc-accent-hover: #8bbae3;
    --cc-accent-soft: rgba(117,170,219,0.1);
    --cc-accent-glow: rgba(117,170,219,0.06);
    --cc-text: #ffffff;
    --cc-text-secondary: rgba(255,255,255,0.6);
    --cc-text-muted: rgba(255,255,255,0.35);
    --cc-text-dim: rgba(255,255,255,0.2);
    --cc-error: #ef4444;
    --cc-error-soft: rgba(239,68,68,0.08);
    --cc-success: #22c55e;
    --cc-success-soft: rgba(34,197,94,0.08);
    --cc-font: 'Spline Sans', sans-serif;
    --cc-radius: 12px;
    --cc-radius-sm: 8px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    width: 100vw; height: 100vh; background: var(--cc-bg);
    display: flex; font-family: var(--cc-font); color: var(--cc-text);
    overflow: hidden; position: relative;
  }

  .lg-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  /* ——— LEFT: HERO ——— */
  .lg-hero {
    flex: 1; position: relative; display: flex; flex-direction: column;
    justify-content: flex-end; padding: 56px; overflow: hidden; z-index: 1;
  }

  .lg-hero-bg { position: absolute; inset: 0; z-index: 0; }

  .lg-hero-bg-img {
    position: absolute; inset: 0; z-index: 0; background-size: cover;
    background-position: center; transition: opacity 1.5s ease-in-out;
  }

  .lg-hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background:
      linear-gradient(180deg, rgba(10,10,10,0.28) 0%, rgba(10,10,10,0.32) 38%, rgba(10,10,10,0.88) 100%),
      linear-gradient(135deg, rgba(117,170,219,0.06) 0%, transparent 50%);
  }

  /* Film strip edge */
  .lg-strip {
    position: absolute; right: 0; top: 0; bottom: 0; width: 36px; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: rgba(10,10,10,0.45); border-left: 1px solid rgba(117,170,219,0.06);
  }

  .lg-strip-perf {
    width: 14px; height: 9px; border-radius: 2px;
    background: rgba(117,170,219,0.05); border: 1px solid rgba(117,170,219,0.08);
    margin: 7px 0;
  }

  .lg-hero-content {
    position: relative; z-index: 3; max-width: 460px;
    opacity: 0; animation: lgFadeUp 0.8s ease 0.2s forwards;
  }

  .lg-hero-brand {
    display: flex; align-items: center; gap: 12px; margin-bottom: 36px;
  }

  .lg-logo-mark {
    width: 44px; height: 44px; border-radius: 11px;
    background: linear-gradient(135deg, var(--cc-accent), #5a8cbf);
    display: flex; align-items: center; justify-content: center;
    position: relative; box-shadow: 0 4px 16px rgba(117,170,219,0.2);
  }

  .lg-logo-badge {
    position: absolute; bottom: -3px; right: -3px;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--cc-bg); border: 2px solid var(--cc-accent);
    display: flex; align-items: center; justify-content: center;
  }

  .lg-logo-name { font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }

  .lg-headline {
    font-size: 44px; font-weight: 800; line-height: 1.08;
    letter-spacing: -1.5px; margin-bottom: 20px;
  }

  .lg-headline em {
    font-style: normal; color: var(--cc-accent); position: relative;
  }

  .lg-headline em::after {
    content: ''; position: absolute; bottom: 2px; left: 0; right: 0;
    height: 3px; background: var(--cc-accent); opacity: 0.3; border-radius: 2px;
  }

  .lg-hero-desc {
    font-size: 16px; color: var(--cc-text-secondary); line-height: 1.6; max-width: 380px;
  }

  /* ——— RIGHT: FORM ——— */
  .lg-form-panel {
    width: 460px; min-width: 460px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; padding: 40px 44px;
    position: relative; z-index: 2; border-left: 1px solid var(--cc-border);
    background: rgba(10,10,10,0.95);
  }

  .lg-form-glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.03) 0%, transparent 65%);
    pointer-events: none;
  }

  .lg-form-wrap {
    width: 100%; max-width: 370px; position: relative; z-index: 1;
    opacity: 0; animation: lgFadeUp 0.7s ease 0.35s forwards;
  }

  .lg-form-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 6px; }
  .lg-form-sub { font-size: 14px; color: var(--cc-text-secondary); margin-bottom: 30px; }

  /* Alerts */
  .lg-alert {
    padding: 12px 16px; border-radius: var(--cc-radius-sm); font-size: 13px;
    margin-bottom: 20px; display: flex; align-items: center; gap: 10px; line-height: 1.5;
  }
  .lg-alert--error { background: var(--cc-error-soft); border: 1px solid rgba(239,68,68,0.15); color: var(--cc-error); }
  .lg-alert--success { background: var(--cc-success-soft); border: 1px solid rgba(34,197,94,0.15); color: var(--cc-success); }

  /* Form */
  .lg-form { display: flex; flex-direction: column; gap: 20px; }

  .lg-field { display: flex; flex-direction: column; gap: 7px; }
  .lg-label { font-size: 13px; font-weight: 600; color: var(--cc-text-secondary); }

  .lg-input-wrap { position: relative; }

  .lg-input {
    width: 100%; background: rgba(15,20,30,0.8); border: 1px solid rgba(117,170,219,0.12);
    border-radius: var(--cc-radius-sm); padding: 14px 16px; color: var(--cc-text);
    font-size: 14px; font-family: var(--cc-font); outline: none; transition: all 0.25s ease;
  }
  .lg-input::placeholder { color: var(--cc-text-dim); }
  .lg-input:focus { border-color: var(--cc-border-focus); box-shadow: 0 0 0 3px var(--cc-accent-glow); }
  .lg-input--error { border-color: rgba(239,68,68,0.4) !important; }
  .lg-input--has-toggle { padding-right: 48px; }
  .lg-input:disabled { opacity: 0.5; }

  .lg-field-error { font-size: 12px; color: var(--cc-error); }

  .lg-eye-btn {
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
    background: none; border: none; cursor: pointer; color: var(--cc-text-dim);
    border-radius: 6px; transition: color 0.2s ease;
  }
  .lg-eye-btn:hover { color: var(--cc-accent); }

  .lg-forgot-row { display: flex; justify-content: flex-end; margin-top: -2px; }

  .lg-forgot-btn {
    background: none; border: none; cursor: pointer; font-family: var(--cc-font);
    font-size: 12px; font-weight: 500; color: var(--cc-accent); padding: 2px 0;
    transition: opacity 0.2s ease; opacity: 0.8;
  }
  .lg-forgot-btn:hover { opacity: 1; }
  .lg-forgot-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .lg-submit {
    width: 100%; padding: 15px; border: none; border-radius: var(--cc-radius-sm);
    font-family: var(--cc-font); font-size: 16px; font-weight: 700; cursor: pointer;
    transition: all 0.25s ease; position: relative; overflow: hidden;
    background: var(--cc-accent); color: var(--cc-bg); margin-top: 4px;
  }
  .lg-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%); transition: transform 0.5s ease;
  }
  .lg-submit:hover:not(:disabled) { background: var(--cc-accent-hover); box-shadow: 0 6px 24px rgba(117,170,219,0.2); transform: translateY(-1px); }
  .lg-submit:hover:not(:disabled)::before { transform: translateX(100%); }
  .lg-submit:active:not(:disabled) { transform: translateY(0); }
  .lg-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .lg-spinner {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid rgba(10,10,10,0.2); border-top-color: #0a0a0a;
    border-radius: 50%; animation: lgSpin 0.6s linear infinite;
    margin-right: 8px; vertical-align: middle;
  }

  .lg-signup-row {
    text-align: center; margin-top: 26px; font-size: 14px; color: var(--cc-text-secondary);
  }

  .lg-signup-link {
    color: var(--cc-accent); font-weight: 700; text-decoration: none; margin-left: 6px;
    transition: opacity 0.2s ease;
  }
  .lg-signup-link:hover { opacity: 0.8; }

  /* ——— MOBILE ——— */
  .lg-mobile-brand {
    display: none; align-items: center; gap: 10px; margin-bottom: 28px;
    width: 100%; max-width: 370px;
  }

  .lg-mobile-logo {
    width: 36px; height: 36px; border-radius: 9px;
    background: linear-gradient(135deg, var(--cc-accent), #5a8cbf);
    display: flex; align-items: center; justify-content: center;
  }

  .lg-mobile-name { font-size: 18px; font-weight: 700; }

  /* Animations */
  @keyframes lgFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes lgSpin { to { transform: rotate(360deg); } }

  /* Responsive */
  @media (max-width: 1024px) {
    .lg-form-panel { width: 420px; min-width: 420px; padding: 40px 32px; }
    .lg-hero { padding: 44px; }
    .lg-headline { font-size: 38px; }
  }

  @media (max-width: 768px) {
    .lg-root { flex-direction: column; overflow-y: auto; }
    .lg-hero { display: none; }
    .lg-form-panel { width: 100%; min-width: unset; border-left: none; padding: 32px 24px; flex: 1; justify-content: flex-start; padding-top: 44px; }
    .lg-mobile-brand { display: flex; }
  }
`;

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundImages = [
    { webp: "/images/download.webp", fallback: "/images/download.jpeg" },
    { webp: "/images/download (1).webp", fallback: "/images/download (1).jpeg" },
    { webp: "/images/download (2).webp", fallback: "/images/download (2).jpeg" },
    { webp: "/images/download (3).webp", fallback: "/images/download (3).jpeg" },
  ];

  const [supportsWebP, setSupportsWebP] = useState(true);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setSupportsWebP(true);
    img.onerror = () => setSupportsWebP(false);
    img.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  }, []);

  const getImageSrc = (image) => (supportsWebP ? image.webp : image.fallback);

  useEffect(() => {
    const interval = setInterval(() => setCurrentImageIndex((p) => (p + 1) % backgroundImages.length), 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setFieldErrors({}); setResetSuccess(false);
    trackEvent(analyticsEvents.loginAttempt, { method: "email" });
    addBreadcrumb({ category: "auth", message: "Login attempt started", level: "info" });

    if (!loginRateLimiter.canAttempt()) {
      const wait = Math.ceil(loginRateLimiter.getTimeUntilReset() / 1000);
      setError(`Too many login attempts. Please wait ${wait} seconds.`);
      trackEvent(analyticsEvents.loginFailure, { reason: "rate_limit" });
      return;
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const validation = validateLogin({ email: sanitizedEmail, password });
    if (!validation.valid) { setFieldErrors(validation.errors); trackEvent(analyticsEvents.loginFailure, { reason: "validation_error" }); return; }

    setLoading(true);
    loginRateLimiter.recordAttempt();
    try {
      await signIn({ email: sanitizedEmail, password });
      trackEvent(analyticsEvents.loginSuccess, { method: "email" });
      addBreadcrumb({ category: "auth", message: "Login successful", level: "info" });
      navigate("/dashboard");
    } catch (err) {
      setError(getUserFriendlyMessage(err, "auth"));
      trackEvent(analyticsEvents.loginFailure, { reason: isNetworkError(err) ? "network_error" : "auth_error" });
      captureError(err, { tags: { type: "login_error" }, extra: { email: sanitizedEmail } });
    } finally { setLoading(false); }
  };

  const handleForgotPassword = async () => {
    setError(""); setFieldErrors({}); setResetSuccess(false);
    const sanitizedEmail = email.trim().toLowerCase();
    const emailValidation = validateEmail(sanitizedEmail);
    if (!emailValidation.valid) { setFieldErrors({ email: emailValidation.error }); return; }
    if (!resetRateLimiter.canAttempt()) {
      const wait = Math.ceil(resetRateLimiter.getTimeUntilReset() / 1000);
      setError(`Too many reset attempts. Please wait ${wait} seconds.`);
      return;
    }
    resetRateLimiter.recordAttempt();
    setResetLoading(true);
    try { await resetPassword(sanitizedEmail); } catch (err) { captureError(err, { tags: { type: "password_reset_error" }, extra: { email: sanitizedEmail } }); }
    finally { setResetLoading(false); setResetSuccess(true); }
  };

  const perfs = Array.from({ length: 25 }, (_, i) => i);

  return (
    <main className="lg-root">
      <style>{LOGIN_CSS}</style>

      {/* Hero */}
      {!isMobile && (
        <div className="lg-hero">
          <div className="lg-hero-bg">
            {backgroundImages.map((img, i) => (
              <div key={i} className="lg-hero-bg-img" style={{ backgroundImage: `url('${getImageSrc(img)}')`, opacity: currentImageIndex === i ? 0.6 : 0 }} />
            ))}
            <div className="lg-hero-overlay" />
          </div>
          <div className="lg-strip">{perfs.map((i) => <div key={i} className="lg-strip-perf" />)}</div>

          <div className="lg-hero-content">
            <div className="lg-hero-brand">
              <div className="lg-logo-mark">
                <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "white", fontVariationSettings: "'FILL' 1" }}>movie</span>
                <div className="lg-logo-badge"><span className="material-symbols-outlined" style={{ fontSize: "9px", color: "var(--cc-accent)" }}>content_cut</span></div>
              </div>
              <span className="lg-logo-name">ClipCut</span>
            </div>
            <h1 className="lg-headline">Tools for the Next Generation of <em>Botswana Creators</em></h1>
            <p className="lg-hero-desc">Professional video editing with cloud collaboration, available across web, desktop, and mobile.</p>
          </div>
        </div>
      )}

      {/* Form panel */}
      <div className="lg-form-panel">
        <div className="lg-form-glow" />

        <div className="lg-mobile-brand">
          <div className="lg-mobile-logo"><span className="material-symbols-outlined" style={{ fontSize: "18px", color: "white", fontVariationSettings: "'FILL' 1" }}>content_cut</span></div>
          <span className="lg-mobile-name">ClipCut</span>
        </div>

        <div className="lg-form-wrap">
          <h2 className="lg-form-title">Welcome back</h2>
          <p className="lg-form-sub">Sign in to continue editing</p>

          {resetSuccess && (
            <div className="lg-alert lg-alert--success" role="status">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>
              If an account exists with this email, you'll receive a password reset link.
            </div>
          )}
          {error && (
            <div className="lg-alert lg-alert--error" role="alert" aria-live="polite">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>error</span>
              {error}
            </div>
          )}

          <form ref={formRef} className="lg-form" onSubmit={handleSubmit} noValidate>
            <div className="lg-field">
              <label htmlFor="login-email" className="lg-label">Email</label>
              <div className="lg-input-wrap">
                <input ref={emailInputRef} id="login-email" className={`lg-input ${fieldErrors.email ? "lg-input--error" : ""}`}
                  type="email" placeholder="you@example.com" value={email}
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
                  autoComplete="email" required disabled={loading}
                  aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  onKeyDown={(e) => { if (e.key === "Enter" && !loading) formRef.current?.requestSubmit(); }} />
              </div>
              {fieldErrors.email && <span id="email-error" className="lg-field-error" role="alert">{fieldErrors.email}</span>}
            </div>

            <div className="lg-field">
              <label htmlFor="login-password" className="lg-label">Password</label>
              <div className="lg-input-wrap">
                <input id="login-password" className={`lg-input lg-input--has-toggle ${fieldErrors.password ? "lg-input--error" : ""}`}
                  type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
                  autoComplete="current-password" required disabled={loading}
                  aria-invalid={!!fieldErrors.password} aria-describedby={fieldErrors.password ? "password-error" : undefined}
                  onKeyDown={(e) => { if (e.key === "Enter" && !loading) formRef.current?.requestSubmit(); }} />
                <button type="button" className="lg-eye-btn" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {fieldErrors.password && <span id="password-error" className="lg-field-error" role="alert">{fieldErrors.password}</span>}
              <div className="lg-forgot-row">
                <button type="button" className="lg-forgot-btn" onClick={handleForgotPassword} disabled={resetLoading || loading}>
                  {resetLoading ? "Sending..." : "Forgot password?"}
                </button>
              </div>
            </div>

            <button type="submit" className="lg-submit" disabled={loading}>
              {loading && <span className="lg-spinner" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="lg-signup-row">
            Don&apos;t have an account?
            <a href="#" className="lg-signup-link" onClick={(e) => { e.preventDefault(); onNavigateToRegister?.(); }}>Sign up</a>
          </p>
        </div>
      </div>

      <BotswanaStripe />
    </main>
  );
};

export default DesktopLogin;
