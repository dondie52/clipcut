import { useState, useRef, useCallback } from "react";
import { sanitizeTextInput } from "../utils/validation";
import { trackEvent } from "../utils/analytics";
import { logger } from "../utils/logger";

const BugReport = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [screenshot, setScreenshot] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const overlayRef = useRef(null);
  const fileRef = useRef(null);

  const severityOptions = [
    { id: "low", label: "Low", color: "#22c55e", desc: "Minor issue" },
    { id: "medium", label: "Medium", color: "#f59e0b", desc: "Affects workflow" },
    { id: "high", label: "High", color: "#ef4444", desc: "Blocks usage" },
  ];

  const captureScreenshot = useCallback(async () => {
    try {
      // Use browser screenshot API if available
      if (navigator.mediaDevices?.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "browser" } });
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        const bitmap = await imageCapture.grabFrame();
        track.stop();

        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        canvas.getContext("2d").drawImage(bitmap, 0, 0);
        const dataUrl = canvas.toDataURL("image/png", 0.8);
        setScreenshot(dataUrl);
      }
    } catch (err) {
      // User cancelled or API not available — silently ignore
      logger.debug("Screenshot capture cancelled or unavailable", { error: err });
    }
  }, []);

  const handleFileScreenshot = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setScreenshot(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || submitting) return;

    setSubmitting(true);
    try {
      const bugData = {
        title: sanitizeTextInput(title, { maxLength: 200 }),
        description: sanitizeTextInput(description, { maxLength: 5000, allowNewlines: true }),
        severity,
        hasScreenshot: !!screenshot,
        screenshot: screenshot || undefined,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        path: window.location.pathname,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      };

      // Store bug report locally (can be sent to Supabase when backend is ready)
      const stored = JSON.parse(localStorage.getItem("clipcut_bug_reports") || "[]");
      stored.push(bugData);
      localStorage.setItem("clipcut_bug_reports", JSON.stringify(stored));

      trackEvent("bug_report_submitted", { severity });
      logger.info("Bug report submitted", { severity, title: bugData.title });
      setSubmitted(true);
    } catch (err) {
      logger.error("Failed to submit bug report", { error: err });
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
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#22c55e", marginBottom: "16px", display: "block" }}>bug_report</span>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "white", margin: "0 0 8px" }}>Report Received</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>Thank you for helping us fix this issue.</p>
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#ef4444" }}>bug_report</span>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", margin: 0 }}>Report a Bug</h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "24px", maxHeight: "70vh", overflowY: "auto" }}>
          {/* Title */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="bug-title" style={labelStyle}>Bug Title</label>
            <input
              id="bug-title"
              type="text"
              placeholder="Brief description of the issue"
              value={title}
              onChange={(e) => setTitle(sanitizeTextInput(e.target.value, { maxLength: 200 }))}
              required
              style={inputStyle}
            />
          </div>

          {/* Severity */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Severity</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {severityOptions.map((s) => (
                <button key={s.id} type="button" onClick={() => setSeverity(s.id)} style={{
                  flex: 1, padding: "10px 8px", borderRadius: "8px", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                  border: severity === s.id ? `1px solid ${s.color}` : "1px solid rgba(255,255,255,0.08)",
                  background: severity === s.id ? `${s.color}15` : "rgba(26,35,50,0.5)",
                  transition: "all 0.15s ease",
                }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: severity === s.id ? "white" : "rgba(255,255,255,0.5)" }}>{s.label}</span>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="bug-description" style={labelStyle}>Steps to Reproduce</label>
            <textarea
              id="bug-description"
              placeholder={"1. Go to...\n2. Click on...\n3. See error..."}
              value={description}
              onChange={(e) => setDescription(sanitizeTextInput(e.target.value, { maxLength: 5000, allowNewlines: true }))}
              rows={5}
              required
              style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
            />
          </div>

          {/* Screenshot */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Screenshot (optional)</label>
            {screenshot ? (
              <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img src={screenshot} alt="Bug screenshot" style={{ width: "100%", display: "block", maxHeight: "200px", objectFit: "contain", background: "#0a0a0a" }} />
                <button type="button" onClick={() => setScreenshot(null)} style={{
                  position: "absolute", top: "8px", right: "8px", width: "28px", height: "28px",
                  borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "white" }}>close</span>
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={captureScreenshot} style={{
                  flex: 1, padding: "14px", borderRadius: "8px", cursor: "pointer",
                  border: "1px dashed rgba(255,255,255,0.15)", background: "rgba(26,35,50,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  color: "rgba(255,255,255,0.5)", fontSize: "13px", fontFamily: "'Spline Sans', sans-serif",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>screenshot_monitor</span>
                  Capture Screen
                </button>
                <button type="button" onClick={() => fileRef.current?.click()} style={{
                  flex: 1, padding: "14px", borderRadius: "8px", cursor: "pointer",
                  border: "1px dashed rgba(255,255,255,0.15)", background: "rgba(26,35,50,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  color: "rgba(255,255,255,0.5)", fontSize: "13px", fontFamily: "'Spline Sans', sans-serif",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>upload_file</span>
                  Upload Image
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileScreenshot} />
              </div>
            )}
          </div>

          <button type="submit" disabled={!title.trim() || !description.trim() || submitting} style={{
            ...btnPrimary,
            opacity: !title.trim() || !description.trim() || submitting ? 0.5 : 1,
            cursor: !title.trim() || !description.trim() || submitting ? "not-allowed" : "pointer",
          }}>
            {submitting ? "Submitting..." : "Submit Bug Report"}
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
  width: "min(480px, calc(100vw - 32px))",
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

export default BugReport;
