import { useState, useRef, useEffect } from "react";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { sanitizeTextInput } from "../utils/validation";
import BotswanaStripe from "./shared/BotswanaStripe";

const OnboardingStep1 = ({ onContinue, onSkip, onSkipAll }) => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    trackEvent(analyticsEvents.onboardingStart);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

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
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Step 1 of 3</span>
          </div>
          <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.1)", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "33.33%", background: "#75AADB", borderRadius: "99px", transition: "width 0.5s ease" }} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "48px 24px 60px",
      }}>
        <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: 700, color: "white", margin: "0 0 8px 0" }}>Set up your profile</h1>
            <p style={{ fontSize: "16px", color: "rgba(117,170,219,0.6)", margin: 0 }}>Tell us a bit about yourself</p>
          </div>

          {/* Avatar upload */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload profile photo"
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileRef.current?.click(); } }}
              onClick={() => fileRef.current?.click()}
              style={{
                width: "128px", height: "128px", borderRadius: "50%",
                border: "2px dashed rgba(117,170,219,0.4)", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: avatarPreview ? `url(${avatarPreview}) center/cover no-repeat` : "rgba(117,170,219,0.05)",
                position: "relative", transition: "all 0.3s ease",
              }}
            >
              {!avatarPreview && (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#75AADB", marginBottom: "4px" }}>add_a_photo</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "rgba(117,170,219,0.7)" }}>Upload photo</span>
                </>
              )}
              {/* Edit badge */}
              <div style={{
                position: "absolute", bottom: "0", right: "0",
                width: "28px", height: "28px", borderRadius: "50%",
                background: "#75AADB", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#0a0a0a" }}>edit</span>
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
          </div>

          {/* Form fields */}
          <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="onboarding-display-name" style={labelStyle}>Display Name</label>
              <input id="onboarding-display-name" type="text" placeholder="Enter your display name" value={displayName}
                onChange={(e) => {
                  const sanitized = sanitizeTextInput(e.target.value, { maxLength: 100 });
                  setDisplayName(sanitized);
                }} autoComplete="name" style={inputStyle}
                onFocus={focusHandler} onBlur={blurHandler} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="onboarding-bio" style={labelStyle}>Bio</label>
              <textarea id="onboarding-bio" placeholder="Tell us about your editing style..." value={bio}
                onChange={(e) => {
                  const sanitized = sanitizeTextInput(e.target.value, { maxLength: 500, allowNewlines: true });
                  setBio(sanitized);
                }} rows={3}
                style={{ ...inputStyle, resize: "none", minHeight: "80px" }}
                onFocus={focusHandler} onBlur={blurHandler} />
            </div>

            {/* Actions */}
            <div style={{ paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <button type="submit" onClick={() => { trackEvent(analyticsEvents.onboardingContinue, { step: "1" }); onContinue?.(); }} style={btnPrimary}
                onMouseEnter={(e) => e.target.style.background = "#8bbae3"}
                onMouseLeave={(e) => e.target.style.background = "#75AADB"}>
                Continue
              </button>
              <button type="button" onClick={() => { trackEvent(analyticsEvents.onboardingSkip, { step: "1" }); onSkip?.(); }} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                color: "rgba(117,170,219,0.6)", fontSize: "14px", fontWeight: 500, padding: "8px",
              }}>
                Skip this step
              </button>
              <button type="button" onClick={() => { trackEvent(analyticsEvents.onboardingSkip, { step: "1", action: "skip_all" }); onSkipAll?.(); }} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.35)", fontSize: "13px", fontWeight: 400, padding: "4px",
              }}>
                Skip onboarding
              </button>
            </div>
          </form>
        </div>
      </main>

      <BotswanaStripe />
    </div>
  );
};

const focusHandler = (e) => { e.target.style.borderColor = "rgba(117,170,219,0.5)"; e.target.style.boxShadow = "0 0 0 2px rgba(117,170,219,0.1)"; };
const blurHandler = (e) => { e.target.style.borderColor = "rgba(117,170,219,0.2)"; e.target.style.boxShadow = "none"; };

const labelStyle = { fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(117,170,219,0.8)", marginLeft: "4px" };
const inputStyle = {
  width: "100%", background: "rgba(117,170,219,0.05)", border: "1px solid rgba(117,170,219,0.2)",
  borderRadius: "8px", padding: "14px 16px", color: "white", fontSize: "14px",
  outline: "none", transition: "all 0.2s ease", boxSizing: "border-box",
  fontFamily: "'Spline Sans', sans-serif",
};
const btnPrimary = {
  width: "100%", background: "#75AADB", color: "#0a0a0a", fontWeight: 700, fontSize: "16px",
  padding: "16px", borderRadius: "8px", border: "none", cursor: "pointer",
  transition: "all 0.2s ease", boxShadow: "0 4px 12px rgba(117,170,219,0.15)",
};

export default OnboardingStep1;
