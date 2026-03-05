import { useState } from "react";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import BotswanaStripe from "./shared/BotswanaStripe";

const OnboardingStep3 = ({ onComplete, onSkip }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    projectUpdates: true,
  });
  const [defaultResolution, setDefaultResolution] = useState("1080p");
  const [autoSave, setAutoSave] = useState(true);
  const [theme, setTheme] = useState("dark");

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    trackEvent(analyticsEvents.onboardingContinue, { step: "3", action: "toggle_notification", key });
  };

  const resolutions = [
    { id: "480p", label: "480p", desc: "SD Quality" },
    { id: "720p", label: "720p", desc: "HD Quality" },
    { id: "1080p", label: "1080p", desc: "Full HD" },
  ];

  return (
    <div style={{
      width: "100vw", height: "100vh", background: "#0a0a0a",
      fontFamily: "'Spline Sans', sans-serif", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header with progress */}
      <header style={{
        width: "100%", borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <span className="material-symbols-outlined" style={{
              fontSize: "28px", color: "#75AADB", fontVariationSettings: "'FILL' 1",
            }}>movie</span>
            <span className="material-symbols-outlined" style={{
              position: "absolute", bottom: "-2px", right: "-4px", fontSize: "12px",
              color: "white", background: "#0a0a0a", borderRadius: "50%", padding: "1px",
            }}>content_cut</span>
          </div>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>ClipCut</span>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "300px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>Onboarding Progress</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Step 3 of 3</span>
          </div>
            <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.1)", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "100%", background: "#75AADB", borderRadius: "99px", transition: "width 0.5s ease" }} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "flex-start", padding: "48px 24px 60px", overflowY: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "white", margin: "0 0 12px 0", letterSpacing: "-0.5px" }}>
              Customize your preferences
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
              Set up your workspace the way you like it
            </p>
          </div>

          {/* Default Resolution */}
          <section style={{ marginBottom: "48px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "0 0 20px 0" }}>
              Default export resolution
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} role="radiogroup" aria-label="Default export resolution">
              {resolutions.map((r) => {
                const selected = defaultResolution === r.id;
                return (
                  <div key={r.id} role="radio" aria-checked={selected} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDefaultResolution(r.id); trackEvent(analyticsEvents.onboardingContinue, { step: "3", action: "set_resolution", resolution: r.id }); } }} onClick={() => { setDefaultResolution(r.id); trackEvent(analyticsEvents.onboardingContinue, { step: "3", action: "set_resolution", resolution: r.id }); }} style={{
                    border: selected ? "2px solid #75AADB" : "1px solid rgba(255,255,255,0.1)",
                    background: selected ? "rgba(117,170,219,0.1)" : "#1a2332",
                    boxShadow: selected ? "0 0 20px rgba(117,170,219,0.15)" : "none",
                    borderRadius: "12px", padding: "24px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                    transition: "all 0.2s ease",
                  }}>
                    <span style={{ fontSize: "24px", fontWeight: 700, color: selected ? "#75AADB" : "rgba(255,255,255,0.8)" }}>{r.label}</span>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{r.desc}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Notifications */}
          <section style={{ marginBottom: "48px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "0 0 20px 0" }}>
              Notification preferences
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { key: "email", label: "Email notifications", desc: "Get updates about your projects via email" },
                { key: "push", label: "Push notifications", desc: "Receive real-time alerts in your browser" },
                { key: "projectUpdates", label: "Project updates", desc: "Notifications when projects finish exporting" },
              ].map((n) => (
                <div key={n.key} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "20px", background: "#1a2332", borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "white", marginBottom: "4px" }}>{n.label}</div>
                    <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{n.desc}</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications[n.key]}
                    aria-label={n.label}
                    onClick={() => toggleNotification(n.key)}
                    style={{
                      width: "48px", height: "28px", borderRadius: "14px",
                      background: notifications[n.key] ? "#75AADB" : "rgba(255,255,255,0.2)",
                      cursor: "pointer", position: "relative", transition: "all 0.2s ease",
                      border: "none", padding: "8px 0", boxSizing: "content-box",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: "2px", left: notifications[n.key] ? "22px" : "2px",
                      width: "24px", height: "24px", borderRadius: "50%", background: "white",
                      transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Auto-save */}
          <section style={{ marginBottom: "48px" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px", background: "#1a2332", borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "white", marginBottom: "4px" }}>Auto-save projects</div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Automatically save your work to the cloud</div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={autoSave}
                aria-label="Auto-save projects"
                onClick={() => { setAutoSave(!autoSave); trackEvent(analyticsEvents.onboardingContinue, { step: "3", action: "toggle_autosave", enabled: !autoSave }); }}
                style={{
                  width: "48px", height: "28px", borderRadius: "14px",
                  background: autoSave ? "#75AADB" : "rgba(255,255,255,0.2)",
                  cursor: "pointer", position: "relative", transition: "all 0.2s ease",
                  border: "none", padding: "8px 0", boxSizing: "content-box",
                }}
              >
                <div style={{
                  position: "absolute", top: "2px", left: autoSave ? "22px" : "2px",
                  width: "24px", height: "24px", borderRadius: "50%", background: "white",
                  transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }} />
              </button>
            </div>
          </section>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", paddingTop: "16px" }}>
            <button onClick={() => { trackEvent(analyticsEvents.onboardingComplete, { step: "3" }); onComplete?.(); }} style={{
              width: "100%", maxWidth: "360px", background: "#75AADB", color: "#0a0a0a",
              fontWeight: 700, fontSize: "18px", padding: "16px", borderRadius: "8px",
              border: "none", cursor: "pointer", transition: "all 0.2s ease",
            }}
              onMouseEnter={(e) => e.target.style.background = "#8bbae3"}
              onMouseLeave={(e) => e.target.style.background = "#75AADB"}>
              Get Started
            </button>
            <a href="#" onClick={(e) => { e.preventDefault(); trackEvent(analyticsEvents.onboardingSkip, { step: "3" }); onSkip?.(); }} style={{
              color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500, textDecoration: "none",
            }}>Skip for now</a>
          </div>
        </div>
      </main>

      <BotswanaStripe height="4px" />
    </div>
  );
};

export default OnboardingStep3;
