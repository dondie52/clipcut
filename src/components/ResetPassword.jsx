import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../supabase/authService";
import { 
  validatePassword, 
  validatePasswordMatch, 
  sanitizeErrorMessage,
  getPasswordStrengthInfo,
  PASSWORD_REQUIREMENTS 
} from "../utils/validation";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { captureError, addBreadcrumb } from "../utils/errorTracking";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  // Calculate password strength
  const getStrength = (pwd) => {
    if (!pwd) return { segments: 0, color: "#333", label: "" };
    const result = validatePassword(pwd);
    const info = getPasswordStrengthInfo(result.strength);
    return { 
      segments: result.strength, 
      color: info.color, 
      label: info.label,
      isValid: result.valid,
      error: result.error
    };
  };
  const strength = getStrength(password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    trackEvent('password_reset_complete_attempt', {});
    addBreadcrumb({ category: 'auth', message: 'Password reset submission started', level: 'info' });

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
    try {
      await updatePassword(password);
      setSuccess(true);
      trackEvent('password_reset_complete_success', {});
      addBreadcrumb({ category: 'auth', message: 'Password reset successful', level: 'info' });
      setTimeout(() => navigate("/login", { replace: true }), 1400);
    } catch (err) {
      const errorMsg = sanitizeErrorMessage(err, "Unable to reset password. Please request a new reset link.");
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
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Spline Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(26,35,50,0.6)",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(117,170,219,0.15)",
      }}>
        <h1 style={{ color: "white", marginTop: 0, fontSize: "28px", fontWeight: 700 }}>Reset your password</h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", marginBottom: "24px" }}>
          Enter a new password for your ClipCut account.
        </p>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "20px",
            color: "#ef4444",
            fontSize: "14px",
          }} role="alert" aria-live="polite">
            {error}
          </div>
        )}
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
            Password updated successfully. Redirecting to login...
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }} noValidate>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="reset-password" style={labelStyle}>New Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="reset-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter new password"
                required
                minLength={PASSWORD_REQUIREMENTS.minLength}
                disabled={loading}
                aria-invalid={!!error && error.includes('Password')}
                aria-describedby="password-requirements password-strength"
                style={{
                  ...inputStyle,
                  opacity: loading ? 0.6 : 1,
                }}
                autoComplete="new-password"
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
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            <span id="password-requirements" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
              Min {PASSWORD_REQUIREMENTS.minLength} chars, uppercase, lowercase, number, special character
            </span>
            {password && (
              <div id="password-strength" aria-live="polite">
                <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{
                      flex: 1, height: "3px", borderRadius: "2px",
                      background: strength.segments >= i ? strength.color : "rgba(255,255,255,0.06)",
                      transition: "all 0.3s ease",
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: strength.color, marginTop: "4px", display: "block" }}>
                  {strength.label}
                  {strength.error && !strength.isValid && (
                    <span style={{ display: "block", marginTop: "2px" }}>{strength.error}</span>
                  )}
                </span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="reset-confirm-password" style={labelStyle}>Confirm New Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="reset-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                required
                disabled={loading}
                aria-invalid={!!error && error.includes("don't match")}
                style={{
                  ...inputStyle,
                  opacity: loading ? 0.6 : 1,
                }}
                autoComplete="new-password"
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
                style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: showConfirmPassword ? "#75AADB" : "rgba(255,255,255,0.3)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || success} 
            style={{ 
              ...buttonStyle, 
              opacity: loading || success ? 0.7 : 1,
              cursor: loading || success ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Updating..." : success ? "Updated!" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

const labelStyle = { fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)" };
const inputStyle = {
  width: "100%",
  background: "rgba(15,20,30,0.8)",
  border: "1px solid rgba(117,170,219,0.15)",
  borderRadius: "8px",
  padding: "14px 16px",
  color: "white",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
};

const buttonStyle = {
  background: "#75AADB",
  color: "#0a0a0a",
  border: "none",
  borderRadius: "8px",
  padding: "14px",
  fontWeight: 700,
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export default ResetPassword;
