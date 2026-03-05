import { useState } from "react";
import { sanitizeUsername } from "../utils/validation";
import PasswordStrengthBar from "./shared/PasswordStrengthBar";

const MobileAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div style={{
      width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#080808", fontFamily: "'Spline Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Phone Frame */}
      <div style={{
        width: "390px", height: "844px", background: "#0a0a0a", borderRadius: "48px",
        overflow: "hidden", position: "relative", border: "3px solid #1a1a1a",
        boxShadow: "0 0 0 1px #333, 0 20px 60px rgba(0,0,0,0.8)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Notch */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "126px", height: "34px", background: "#000", borderRadius: "0 0 20px 20px", zIndex: 45,
        }} />

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", paddingTop: "60px" }}>
          {/* Logo Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 32px 0" }}>
            {/* Film icon with scissors */}
            <div style={{ position: "relative", marginBottom: "16px" }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "16px",
                background: "rgba(117,170,219,0.1)", border: "3px solid rgba(117,170,219,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: "44px", color: "#75AADB", fontVariationSettings: "'FILL' 1",
                }}>movie</span>
              </div>
              <div style={{
                position: "absolute", bottom: "-4px", right: "-4px",
                width: "28px", height: "28px", borderRadius: "50%",
                background: "#75AADB", display: "flex", alignItems: "center", justifyContent: "center",
                border: "3px solid #0a0a0a",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#0a0a0a", fontWeight: 700 }}>content_cut</span>
              </div>
            </div>

            <h1 style={{ fontSize: "36px", fontWeight: 800, color: "white", margin: "0 0 4px 0", letterSpacing: "-0.5px" }}>ClipCut</h1>
            <p style={{
              fontSize: "13px", color: "#75AADB", fontWeight: 600,
              letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 28px 0",
            }}>
              EDIT. CREATE. SHARE.
            </p>
          </div>

          {/* Form Section */}
          <div style={{ flex: 1, padding: "0 32px", display: "flex", flexDirection: "column" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "white", margin: "0 0 4px 0" }}>
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: "0 0 24px 0" }}>
              {isLogin ? "Please enter your details to sign in." : "Start editing videos for free."}
            </p>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {!isLogin && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="mobile-username" style={mLabelStyle}>USERNAME</label>
                  <input id="mobile-username" type="text" placeholder="Choose a username" value={username} onChange={(e) => {
                    const sanitized = sanitizeUsername(e.target.value);
                    setUsername(sanitized);
                  }} autoComplete="username" style={mInputStyle}
                    onFocus={(e) => e.target.style.borderColor = "rgba(117,170,219,0.4)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(117,170,219,0.15)"}
                  />
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="mobile-email" style={mLabelStyle}>EMAIL</label>
                <input id="mobile-email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" style={mInputStyle}
                  onFocus={(e) => e.target.style.borderColor = "rgba(117,170,219,0.4)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(117,170,219,0.15)"}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="mobile-password" style={mLabelStyle}>PASSWORD</label>
                <div style={{ position: "relative" }}>
                  <input id="mobile-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isLogin ? "current-password" : "new-password"} style={mInputStyle}
                    onFocus={(e) => e.target.style.borderColor = "rgba(117,170,219,0.4)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(117,170,219,0.15)"}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: showPassword ? "#75AADB" : "rgba(255,255,255,0.3)",
                    padding: "8px", minWidth: "36px", minHeight: "36px",
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>

                {!isLogin && <PasswordStrengthBar password={password} />}

                {isLogin && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2px" }}>
                    <a href="#" style={{ fontSize: "13px", color: "#75AADB", textDecoration: "none" }}>Forgot password?</a>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="mobile-confirm-password" style={mLabelStyle}>CONFIRM PASSWORD</label>
                  <div style={{ position: "relative" }}>
                    <input id="mobile-confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" style={mInputStyle}
                      onFocus={(e) => e.target.style.borderColor = "rgba(117,170,219,0.4)"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(117,170,219,0.15)"}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? "Hide password" : "Show password"} style={{
                      position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", color: showConfirmPassword ? "#75AADB" : "rgba(255,255,255,0.3)",
                      padding: "8px", minWidth: "36px", minHeight: "36px",
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" style={{
                width: "100%", background: "#75AADB", color: "#0a0a0a", fontWeight: 700,
                fontSize: "16px", padding: "16px", borderRadius: "12px", border: "none",
                cursor: "pointer", marginTop: "4px",
              }}>
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px" }}>
                or continue with
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Google */}
            <button style={{
              width: "100%", background: "transparent", border: "1px solid rgba(117,170,219,0.2)",
              color: "white", fontWeight: 600, padding: "14px", borderRadius: "12px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px", fontSize: "15px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
          </div>

          {/* Footer */}
          <div style={{ padding: "20px 0 48px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setPassword(""); setConfirmPassword(""); }}
                style={{ color: "#75AADB", fontWeight: 700, textDecoration: "none", marginLeft: "6px" }}>
                {isLogin ? "Sign up" : "Sign in"}
              </a>
            </p>
          </div>
        </div>

        {/* Botswana Flag Stripe */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "6px",
          display: "flex", zIndex: 50, borderRadius: "0 0 48px 48px", overflow: "hidden",
        }}>
          <div style={{ flex: 1.5, background: "#75AADB" }} />
          <div style={{ flex: 0.2, background: "white" }} />
          <div style={{ flex: 1, background: "#000" }} />
          <div style={{ flex: 0.2, background: "white" }} />
          <div style={{ flex: 1.5, background: "#75AADB" }} />
        </div>

        {/* Home Indicator */}
        <div style={{
          position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
          width: "134px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.2)", zIndex: 55,
        }} />
      </div>
    </div>
  );
};

const mLabelStyle = {
  fontSize: "12px", fontWeight: 700, color: "rgba(117,170,219,0.8)",
  textTransform: "uppercase", letterSpacing: "1.5px",
};

const mInputStyle = {
  width: "100%", background: "rgba(26,35,50,0.6)",
  border: "1px solid rgba(117,170,219,0.15)", borderRadius: "10px",
  padding: "14px 16px", color: "white", fontSize: "14px",
  outline: "none", transition: "all 0.2s ease", boxSizing: "border-box",
};

export default MobileAuth;
