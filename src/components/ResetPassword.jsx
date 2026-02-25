import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../supabase/authService";
import { validatePassword, validatePasswordMatch, sanitizeErrorMessage } from "../utils/validation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.error);
      return;
    }

    const matchValidation = validatePasswordMatch(password, confirmPassword);
    if (!matchValidation.valid) {
      setError(matchValidation.error);
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => navigate("/login", { replace: true }), 1400);
    } catch (err) {
      setError(sanitizeErrorMessage(err, "Unable to reset password. Please request a new reset link."));
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
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(26,35,50,0.6)",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(117,170,219,0.15)",
      }}>
        <h1 style={{ color: "white", marginTop: 0 }}>Reset your password</h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>
          Enter a new password for your ClipCut account.
        </p>

        {error && <p role="alert" style={{ color: "#ef4444", fontSize: "14px" }}>{error}</p>}
        {success && <p style={{ color: "#22c55e", fontSize: "14px" }}>Password updated successfully. Redirecting to login...</p>}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px", marginTop: "16px" }}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="New password"
            required
            style={inputStyle}
            autoComplete="new-password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            required
            style={inputStyle}
            autoComplete="new-password"
          />
          <button type="submit" disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  background: "rgba(15,20,30,0.8)",
  border: "1px solid rgba(117,170,219,0.2)",
  borderRadius: "8px",
  padding: "12px 14px",
  color: "white",
  fontSize: "14px",
  boxSizing: "border-box",
};

const buttonStyle = {
  background: "#75AADB",
  color: "#0a0a0a",
  border: "none",
  borderRadius: "8px",
  padding: "12px",
  fontWeight: 700,
  cursor: "pointer",
};

export default ResetPassword;
