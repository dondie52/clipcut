import { useState, useRef } from "react";
import { trackEvent, analyticsEvents } from "../utils/analytics";

const OnboardingStep1 = ({ onContinue, onSkip }) => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileRef = useRef(null);

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

      {/* Header */}
      <header style={{
        padding: "24px 32px", display: "flex", alignItems: "center", gap: "8px",
        position: "absolute", top: 0, left: 0, zIndex: 10,
      }}>
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
      </header>

      {/* Main content */}
      <main style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "80px 16px 60px",
      }}>
        <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Progress */}
          <div style={{ width: "100%", marginBottom: "48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#75AADB" }}>
                Step 1 of 3
              </span>
              <span style={{ fontSize: "11px", color: "rgba(117,170,219,0.6)" }}>33% Complete</span>
            </div>
            <div style={{ height: "6px", width: "100%", background: "rgba(117,170,219,0.1)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "33.33%", background: "#75AADB", borderRadius: "99px", transition: "width 0.5s ease" }} />
            </div>
          </div>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: 700, color: "white", margin: "0 0 8px 0" }}>Set up your profile</h1>
            <p style={{ fontSize: "16px", color: "rgba(117,170,219,0.6)", margin: 0 }}>Tell us a bit about yourself</p>
          </div>

          {/* Avatar upload */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
            <div
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
              <label style={labelStyle}>Display Name</label>
              <input type="text" placeholder="Enter your display name" value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} style={inputStyle}
                onFocus={focusHandler} onBlur={blurHandler} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={labelStyle}>Bio</label>
              <textarea placeholder="Tell us about your editing style..." value={bio}
                onChange={(e) => setBio(e.target.value)} rows={3}
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
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </main>

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
