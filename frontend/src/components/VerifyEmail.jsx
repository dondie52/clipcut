/**
 * Email Verification Page
 * Shown when user needs to verify their email address
 * @module components/VerifyEmail
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../supabase/AuthContext";
import { resendVerificationEmail, getUser } from "../supabase/authService";
import { createRateLimiter } from "../utils/rateLimiter";

// Rate limiter: 3 resend attempts per 5 minutes
const resendRateLimiter = createRateLimiter(3, 300000);

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // Check if user is already verified
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const currentUser = await getUser();
        if (currentUser?.email_confirmed_at) {
          // Already verified, redirect to dashboard
          navigate("/dashboard");
        } else {
          setEmail(currentUser?.email || "");
          setChecking(false);
        }
      } catch (err) {
        setChecking(false);
      }
    };

    if (user) {
      checkVerification();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleResend = async () => {
    setError("");
    setSuccess(false);

    // Rate limiting check
    if (!resendRateLimiter.canAttempt()) {
      const waitTime = Math.ceil(resendRateLimiter.getTimeUntilReset() / 60);
      setError(`Too many resend attempts. Please wait ${waitTime} minutes.`);
      return;
    }

    setLoading(true);
    resendRateLimiter.recordAttempt();

    try {
      await resendVerificationEmail(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to resend verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAgain = async () => {
    setChecking(true);
    try {
      const currentUser = await getUser();
      if (currentUser?.email_confirmed_at) {
        navigate("/dashboard");
      } else {
        setError("Email not yet verified. Please check your inbox and click the verification link.");
      }
    } catch (err) {
      setError("Failed to check verification status.");
    } finally {
      setChecking(false);
    }
  };

  if (checking) {
    return (
      <div style={{
        width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Spline Sans', sans-serif", background: "#0a0a0a",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px", height: "40px", border: "3px solid rgba(117,170,219,0.2)",
            borderTop: "3px solid #75AADB", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
          }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Checking verification status...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

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
              <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#75AADB", fontVariationSettings: "'FILL' 1" }}>mail</span>
            </div>
          </div>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>Verify Email</span>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", margin: "0 0 6px 0" }}>
          Check your email
        </h2>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 32px 0" }}>
          We've sent a verification link to <strong style={{ color: "#75AADB" }}>{email}</strong>
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
            Verification email sent! Please check your inbox.
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

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button 
            type="button"
            onClick={handleCheckAgain}
            style={{
              width: "100%", background: "#75AADB", color: "#0a0a0a", fontWeight: 700, fontSize: "16px",
              padding: "15px", borderRadius: "10px", border: "none", cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => e.target.style.background = "#8bbae3"}
            onMouseLeave={(e) => e.target.style.background = "#75AADB"}
          >
            I've verified my email
          </button>

          <button 
            type="button"
            onClick={handleResend}
            disabled={loading}
            style={{
              width: "100%", background: "rgba(117,170,219,0.1)", color: "#75AADB", fontWeight: 600, fontSize: "14px",
              padding: "12px", borderRadius: "10px", border: "1px solid rgba(117,170,219,0.3)", cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease", opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = "rgba(117,170,219,0.2)")}
            onMouseLeave={(e) => !loading && (e.target.style.background = "rgba(117,170,219,0.1)")}
          >
            {loading ? "Sending..." : "Resend verification email"}
          </button>
        </div>

        {/* Help text */}
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: "24px 0 0 0", textAlign: "center" }}>
          Didn't receive the email? Check your spam folder or try resending.
        </p>
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

export default VerifyEmail;
