/**
 * Reset Password Page
 * Allows users to set a new password after clicking the reset link in their email
 * @module components/ResetPassword
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePassword } from "../supabase/authService";
import { getUserFriendlyMessage } from "../utils/errorHandling";
import {
  validatePassword,
  validatePasswordMatch,
  PASSWORD_REQUIREMENTS,
  sanitizeUrlParam
} from "../utils/validation";
import { createRateLimiter } from "../utils/rateLimiter";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { captureError, addBreadcrumb } from "../utils/errorTracking";
import BotswanaStripe from "./shared/BotswanaStripe";
import PasswordStrengthBar, { getStrength } from "./shared/PasswordStrengthBar";

// Rate limiter: 3 password reset attempts per 10 minutes
const resetRateLimiter = createRateLimiter(3, 600000);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  // Check if we have the required token/hash from the URL
  useEffect(() => {
    const accessTokenParam = searchParams.get("access_token");
    const typeParam = searchParams.get("type");
    
    // Validate and sanitize access_token (should be JWT format)
    const accessTokenValidation = sanitizeUrlParam(accessTokenParam || '', { 
      type: 'jwt',
      maxLength: 1000 
    });
    
    // Validate and sanitize type parameter (should be enum: "recovery")
    const typeValidation = sanitizeUrlParam(typeParam || '', { 
      type: 'enum',
      allowedValues: ['recovery'],
      maxLength: 50 
    });
    
    if (!accessTokenValidation.valid || !typeValidation.valid) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [searchParams]);

  const strength = getStrength(password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    trackEvent('password_reset_complete_attempt', {});
    addBreadcrumb({ category: 'auth', message: 'Password reset submission started', level: 'info' });

    // Rate limiting check
    if (!resetRateLimiter.canAttempt()) {
      const waitTime = Math.ceil(resetRateLimiter.getTimeUntilReset() / 60);
      const errorMsg = `Too many attempts. Please wait ${waitTime} minutes.`;
      setError(errorMsg);
      trackEvent('password_reset_complete_failure', { reason: 'rate_limit' });
      return;
    }

    // Validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.error);
      trackEvent('password_reset_complete_failure', { reason: 'validation_error' });
      return;
    }

    const matchValidation = validatePasswordMatch(password, confirmPassword);
    if (!matchValidation.valid) {
      setError(matchValidation.error);
      trackEvent('password_reset_complete_failure', { reason: 'password_mismatch' });
      return;
    }

    setLoading(true);
    resetRateLimiter.recordAttempt();

    try {
      await updatePassword(password);
      setSuccess(true);
      trackEvent('password_reset_complete_success', {});
      addBreadcrumb({ category: 'auth', message: 'Password reset successful', level: 'info' });
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      const errorMsg = getUserFriendlyMessage(err, 'auth');
      setError(errorMsg);
      trackEvent('password_reset_complete_failure', { reason: 'auth_error' });
      captureError(err, { 
        tags: { type: 'password_reset_error' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100vw", height: "100vh", display: "flex",
      fontFamily: "'Spline Sans', sans-serif", overflow: "hidden", position: "relative",
      background: "#0a0a0a",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* CENTER CARD */}
      <div style={{
        width: "100%", maxWidth: "480px", margin: "auto",
        background: "rgba(26,35,50,0.6)", borderRadius: "16px", padding: "40px",
        border: "1px solid rgba(117,170,219,0.1)", backdropFilter: "blur(10px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <div style={{ position: "relative", width: "44px", height: "44px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "10px",
              background: "rgba(117,170,219,0.2)", border: "2px solid rgba(117,170,219,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#75AADB", fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
            </div>
          </div>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>Reset Password</span>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", margin: "0 0 6px 0" }}>
          Set new password
        </h2>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 32px 0" }}>
          Enter your new password below
        </p>

        {/* Success message */}
        {success && (
          <div style={{
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "20px",
            color: "#22c55e",
            fontSize: "14px",
          }}>
            Password reset successfully! Redirecting to login...
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
          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="reset-password" style={labelStyle}>New Password</label>
            <div style={{ position: "relative" }}>
              <input 
                id="reset-password"
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your new password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                minLength={PASSWORD_REQUIREMENTS.minLength}
                disabled={loading}
                aria-invalid={!!error && (error.includes('Password') || !strength.isValid)}
                aria-describedby="password-requirements password-strength"
                style={{
                  ...inputStyle,
                  opacity: loading ? 0.6 : 1,
                }}
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
                style={eyeBtnStyle}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            <span id="password-requirements" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
              Min {PASSWORD_REQUIREMENTS.minLength} chars, uppercase, lowercase, number, special character
            </span>
            <div id="password-strength">
              <PasswordStrengthBar password={password} />
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="reset-confirm-password" style={labelStyle}>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input 
                id="reset-confirm-password"
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm your new password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                disabled={loading}
                aria-invalid={!!error && error.includes("don't match")}
                style={{
                  ...inputStyle,
                  opacity: loading ? 0.6 : 1,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
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
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading || success} style={{
            ...btnPrimary,
            background: loading || success ? "rgba(117,170,219,0.5)" : btnPrimary.background,
            cursor: loading || success ? "not-allowed" : "pointer",
          }}
            onMouseEnter={(e) => !loading && !success && (e.target.style.background = "#8bbae3")}
            onMouseLeave={(e) => !loading && !success && (e.target.style.background = "#75AADB")}>
            {loading ? "Resetting..." : success ? "Password Reset!" : "Reset Password"}
          </button>
        </form>

        {/* Back to Login */}
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: "24px 0 0 0" }}>
          Remember your password?
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}
            style={{ color: "#75AADB", fontWeight: 700, textDecoration: "none", marginLeft: "6px" }}>
            Sign in
          </a>
        </p>
      </div>

      <BotswanaStripe />
    </div>
  );
};

const labelStyle = { fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.7)" };
const inputStyle = {
  width: "100%", background: "rgba(15,20,30,0.8)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px", padding: "14px 16px", color: "white", fontSize: "14px",
  outline: "none", transition: "all 0.2s ease", boxSizing: "border-box",
};
const eyeBtnStyle = {
  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
  background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)",
};
const btnPrimary = {
  width: "100%", background: "#75AADB", color: "#0a0a0a", fontWeight: 700, fontSize: "16px",
  padding: "15px", borderRadius: "10px", border: "none", cursor: "pointer",
  transition: "all 0.2s ease", marginTop: "4px",
};

export default ResetPassword;
