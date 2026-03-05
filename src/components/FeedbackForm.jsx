import { useState, useRef } from "react";
import { sanitizeTextInput } from "../utils/validation";
import { trackEvent } from "../utils/analytics";
import { logger } from "../utils/logger";

const FeedbackForm = ({ onClose }) => {
  const [type, setType] = useState("suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const overlayRef = useRef(null);

  const feedbackTypes = [
    { id: "suggestion", label: "Suggestion", icon: "lightbulb" },
    { id: "compliment", label: "Compliment", icon: "thumb_up" },
    { id: "issue", label: "Issue", icon: "report_problem" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || submitting) return;

    setSubmitting(true);
    try {
      const feedbackData = {
        type,
        message: sanitizeTextInput(message, { maxLength: 2000 }),
        email: email.trim() || undefined,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        path: window.location.pathname,
      };

      // Store feedback locally (can be sent to Supabase when backend is ready)
      const stored = JSON.parse(localStorage.getItem("clipcut_feedback") || "[]");
      stored.push(feedbackData);
      localStorage.setItem("clipcut_feedback", JSON.stringify(stored));

      trackEvent("feedback_submitted", { type });
      logger.info("Feedback submitted", { type });
      setSubmitted(true);
    } catch (err) {
      logger.error("Failed to submit feedback", { error: err });
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  if (submitted) {
    return (
      <div ref={overlayRef} onClick={handleOverlayClick} style={overlayStyle}>
        <div style={modalStyle}>
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#22c55e", marginBottom: "16px", display: "block" }}>check_circle</span>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "white", margin: "0 0 8px" }}>Thank you!</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>Your feedback helps us improve ClipCut.</p>
            <button onClick={onClose} style={btnPrimary}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={overlayRef} onClick={handleOverlayClick} style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", margin: 0 }}>Send Feedback</h2>
          <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
          {/* Feedback type */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {feedbackTypes.map((t) => (
              <button key={t.id} type="button" onClick={() => setType(t.id)} style={{
                flex: 1, padding: "12px 8px", borderRadius: "8px", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                border: type === t.id ? "1px solid #75AADB" : "1px solid rgba(255,255,255,0.08)",
                background: type === t.id ? "rgba(117,170,219,0.1)" : "rgba(26,35,50,0.5)",
                transition: "all 0.15s ease",
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: "20px", color: type === t.id ? "#75AADB" : "rgba(255,255,255,0.5)",
                }}>{t.icon}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: type === t.id ? "white" : "rgba(255,255,255,0.5)" }}>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Message */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="feedback-message" style={labelStyle}>Message</label>
            <textarea
              id="feedback-message"
              placeholder="Tell us what you think..."
              value={message}
              onChange={(e) => setMessage(sanitizeTextInput(e.target.value, { maxLength: 2000, allowNewlines: true }))}
              rows={5}
              required
              style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
            />
          </div>

          {/* Optional email */}
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="feedback-email" style={labelStyle}>Email (optional)</label>
            <input
              id="feedback-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: "6px 0 0 4px" }}>
              Only if you'd like us to follow up
            </p>
          </div>

          <button type="submit" disabled={!message.trim() || submitting} style={{
            ...btnPrimary,
            opacity: !message.trim() || submitting ? 0.5 : 1,
            cursor: !message.trim() || submitting ? "not-allowed" : "pointer",
          }}>
            {submitting ? "Sending..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed", inset: 0, zIndex: 9999,
  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "'Spline Sans', sans-serif",
};

const modalStyle = {
  width: "min(440px, calc(100vw - 32px))",
  background: "#1a2332", borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
  overflow: "hidden",
};

const labelStyle = {
  display: "block", fontSize: "12px", fontWeight: 600,
  color: "rgba(255,255,255,0.6)", marginBottom: "8px",
  textTransform: "uppercase", letterSpacing: "0.5px",
};

const inputStyle = {
  width: "100%", background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
  padding: "12px 14px", color: "white", fontSize: "14px",
  outline: "none", fontFamily: "'Spline Sans', sans-serif",
  boxSizing: "border-box",
};

const btnPrimary = {
  width: "100%", background: "#75AADB", color: "#0a0a0a",
  fontWeight: 700, fontSize: "15px", padding: "14px",
  borderRadius: "8px", border: "none", cursor: "pointer",
  transition: "all 0.2s ease", fontFamily: "'Spline Sans', sans-serif",
};

export default FeedbackForm;
