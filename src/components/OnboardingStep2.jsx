import { useState } from "react";
import { trackEvent, analyticsEvents } from "../utils/analytics";

const OnboardingStep2 = ({ onContinue, onSkip }) => {
  const [skillLevel, setSkillLevel] = useState("intermediate");
  const [purposes, setPurposes] = useState(["youtube", "business"]);

  const togglePurpose = (p) => {
    setPurposes((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const skills = [
    { id: "beginner", label: "Beginner", icon: "potted_plant" },
    { id: "intermediate", label: "Intermediate", icon: "local_fire_department" },
    { id: "pro", label: "Pro", icon: "rocket_launch" },
  ];

  const purposeOptions = [
    { id: "youtube", label: "YouTube" },
    { id: "tiktok", label: "TikTok" },
    { id: "school", label: "School / Education" },
    { id: "business", label: "Business" },
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
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Step 2 of 3</span>
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
              How will you use ClipCut?
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
              This helps us personalize your experience
            </p>
          </div>

          {/* Skill Level */}
          <section style={{ marginBottom: "48px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "0 0 20px 0" }}>
              Your skill level
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {skills.map((s) => {
                const selected = skillLevel === s.id;
                return (
                  <div key={s.id} onClick={() => setSkillLevel(s.id)} style={{
                    border: selected ? "2px solid #75AADB" : "1px solid rgba(255,255,255,0.1)",
                    background: selected ? "rgba(117,170,219,0.1)" : "#1a2332",
                    boxShadow: selected ? "0 0 20px rgba(117,170,219,0.15)" : "none",
                    borderRadius: "12px", padding: "32px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
                    transition: "all 0.2s ease",
                  }}>
                    <div style={{
                      width: "56px", height: "56px", borderRadius: "50%",
                      background: selected ? "#75AADB" : "rgba(117,170,219,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span className="material-symbols-outlined" style={{
                        fontSize: "28px", color: selected ? "white" : "#75AADB",
                      }}>{s.icon}</span>
                    </div>
                    <span style={{ fontSize: "18px", fontWeight: 600, color: "white" }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Purpose */}
          <section style={{ marginBottom: "48px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "0 0 20px 0" }}>
              What are you creating for?
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {purposeOptions.map((p) => {
                const selected = purposes.includes(p.id);
                return (
                  <button key={p.id} onClick={() => togglePurpose(p.id)} style={{
                    padding: "16px 24px", borderRadius: "8px", cursor: "pointer",
                    fontSize: "16px", fontWeight: 600, transition: "all 0.2s ease",
                    border: selected ? "1px solid #75AADB" : "1px solid rgba(255,255,255,0.1)",
                    background: selected ? "#75AADB" : "#1a2332",
                    color: selected ? "white" : "rgba(255,255,255,0.8)",
                  }}>
                    {p.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", paddingTop: "16px" }}>
            <button onClick={() => { trackEvent(analyticsEvents.onboardingContinue, { step: "2" }); onContinue?.(); }} style={{
              width: "100%", maxWidth: "360px", background: "#75AADB", color: "#0a0a0a",
              fontWeight: 700, fontSize: "18px", padding: "16px", borderRadius: "8px",
              border: "none", cursor: "pointer", transition: "all 0.2s ease",
            }}
              onMouseEnter={(e) => e.target.style.background = "#8bbae3"}
              onMouseLeave={(e) => e.target.style.background = "#75AADB"}>
              Complete Setup
            </button>
            <a href="#" onClick={(e) => { e.preventDefault(); trackEvent(analyticsEvents.onboardingSkip, { step: "2" }); onSkip?.(); }} style={{
              color: "rgba(255,255,255,0.4)", fontSize: "14px", fontWeight: 500, textDecoration: "none",
            }}>Skip for now</a>
          </div>
        </div>
      </main>

      {/* Botswana Flag Stripe */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", display: "flex", zIndex: 50 }}>
        <div style={{ flex: 1, background: "#75AADB" }} />
        <div style={{ flex: 1, background: "white" }} />
        <div style={{ flex: 1, background: "#000" }} />
        <div style={{ flex: 1, background: "white" }} />
        <div style={{ flex: 1, background: "#75AADB" }} />
      </div>
    </div>
  );
};

export default OnboardingStep2;
