import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClipCutSplash = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  // Phase 0: Dark screen
  // Phase 1: Scissors slide in
  // Phase 2: Cut happens, screen splits
  // Phase 3: Logo reveals
  // Phase 4: Loading bar
  // Phase 5: Fade out (ready)

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setPhase(1);
      }, 500),
      setTimeout(() => {
        setPhase(2);
      }, 1500),
      setTimeout(() => {
        setPhase(3);
      }, 2200),
      setTimeout(() => {
        setPhase(4);
      }, 3000),
      setTimeout(() => {
        setPhase(5);
      }, 5500),
      setTimeout(() => {
        navigate('/login');
      }, 6500), // Navigate 1 second after phase 5 starts
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (phase >= 4) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#0a0a0a",
      overflow: "hidden",
      position: "relative",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet" />

      {/* Subtle grid pattern background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(117, 170, 219, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(117, 170, 219, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        zIndex: 0,
      }} />

      {/* Top curtain */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        background: "linear-gradient(180deg, #0d1117 0%, #111820 100%)",
        transform: phase >= 2 ? "translateY(-105%)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        zIndex: 20,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}>
        {/* Bottom edge glow when cutting */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: phase >= 1 ? "linear-gradient(90deg, transparent, #75AADB, #fff, #75AADB, transparent)" : "transparent",
          boxShadow: phase >= 1 ? "0 0 20px #75AADB, 0 0 40px rgba(117,170,219,0.3)" : "none",
          transition: "all 0.5s ease",
        }} />
      </div>

      {/* Bottom curtain */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
        background: "linear-gradient(0deg, #0d1117 0%, #111820 100%)",
        transform: phase >= 2 ? "translateY(105%)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        zIndex: 20,
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: phase >= 1 ? "linear-gradient(90deg, transparent, #75AADB, #fff, #75AADB, transparent)" : "transparent",
          boxShadow: phase >= 1 ? "0 0 20px #75AADB, 0 0 40px rgba(117,170,219,0.3)" : "none",
          transition: "all 0.5s ease",
        }} />
      </div>

      {/* Scissors */}
      <div style={{
        position: "absolute",
        left: phase >= 1 ? "50%" : "-10%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 30,
        opacity: phase >= 3 ? 0 : 1,
        transition: phase >= 1
          ? "left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease"
          : "none",
        filter: "drop-shadow(0 0 15px rgba(117,170,219,0.6))",
      }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="2.5" stroke="#75AADB" strokeWidth="1.5" fill="none" />
          <circle cx="6" cy="18" r="2.5" stroke="#75AADB" strokeWidth="1.5" fill="none" />
          {/* Top blade */}
          <line x1="8.2" y1="7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="x2" values="20;16;20" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="18;14;18" dur="1.2s" repeatCount="indefinite" />
          </line>
          {/* Bottom blade */}
          <line x1="8.2" y1="16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="x2" values="20;16;20" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
          </line>
          {/* Spark at crossing */}
          <circle cx="13" cy="12" r="1" fill="#75AADB" opacity={phase >= 1 ? "1" : "0"}>
            <animate attributeName="r" values="0.5;2;0.5" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Cut line sparks */}
      {phase >= 1 && phase < 3 && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "4px",
          zIndex: 25,
          overflow: "hidden",
        }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${i * 5}%`,
              top: "50%",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#75AADB",
              boxShadow: "0 0 6px #75AADB",
              animation: `sparkle 0.6s ease-in-out ${i * 0.05}s infinite`,
            }} />
          ))}
        </div>
      )}

      {/* Main content behind curtains */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? "scale(1)" : "scale(0.9)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {/* Glow orb behind logo */}
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(117,170,219,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse 3s ease-in-out infinite",
        }} />

        {/* Logo icon */}
        <div style={{
          position: "relative",
          marginBottom: "24px",
        }}>
          {/* Film frame */}
          <div style={{
            width: "88px",
            height: "72px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #1a2332 0%, #0d1117 100%)",
            border: "2px solid rgba(117,170,219,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(117,170,219,0.1)",
          }}>
            {/* Play triangle */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="#75AADB" />
            </svg>

            {/* Film perforations */}
            {[0, 1, 2].map((i) => (
              <div key={`l${i}`} style={{
                position: "absolute",
                left: "-1px",
                top: `${15 + i * 22}px`,
                width: "6px",
                height: "10px",
                borderRadius: "0 3px 3px 0",
                background: "rgba(117,170,219,0.15)",
                border: "1px solid rgba(117,170,219,0.2)",
                borderLeft: "none",
              }} />
            ))}
            {[0, 1, 2].map((i) => (
              <div key={`r${i}`} style={{
                position: "absolute",
                right: "-1px",
                top: `${15 + i * 22}px`,
                width: "6px",
                height: "10px",
                borderRadius: "3px 0 0 3px",
                background: "rgba(117,170,219,0.15)",
                border: "1px solid rgba(117,170,219,0.2)",
                borderRight: "none",
              }} />
            ))}
          </div>

          {/* Scissors badge */}
          <div style={{
            position: "absolute",
            bottom: "-8px",
            right: "-12px",
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #75AADB 0%, #5a8ab5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(117,170,219,0.4)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="6" r="2.5" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="6" cy="18" r="2.5" stroke="white" strokeWidth="2" fill="none" />
              <line x1="8.5" y1="7.5" x2="20" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8.5" y1="16.5" x2="20" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* App name */}
        <h1 style={{
          fontSize: "52px",
          fontWeight: 800,
          color: "white",
          margin: "0 0 4px 0",
          letterSpacing: "-1px",
          textShadow: "0 0 40px rgba(117,170,219,0.3)",
        }}>
          ClipCut
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: "13px",
          fontWeight: 400,
          color: "rgba(117,170,219,0.7)",
          margin: "0 0 40px 0",
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}>
          Professional Video Suite
        </p>

        {/* Loading bar */}
        <div style={{
          width: "240px",
          opacity: phase >= 4 ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <div style={{
            width: "100%",
            height: "3px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "4px",
            overflow: "hidden",
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #75AADB, #a8d0f0)",
              borderRadius: "4px",
              transition: "width 0.1s linear",
              boxShadow: "0 0 10px rgba(117,170,219,0.5)",
            }} />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}>
            <span style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.5px",
            }}>
              {progress < 30 ? "Loading workspace..." : progress < 70 ? "Preparing editor..." : progress < 100 ? "Almost ready..." : "Welcome!"}
            </span>
            <span style={{
              fontSize: "11px",
              color: "#75AADB",
              fontWeight: 600,
            }}>
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute",
        bottom: "24px",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
        opacity: phase >= 4 ? 0.4 : 0,
        transition: "opacity 0.5s ease",
      }}>
        <span style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          © 2026 ClipCut • bokas techologies <pty />
          <ltd></ltd>
        </span>
      </div>

      {/* Botswana flag stripe accents at very bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "4px",
        zIndex: 35,
        display: "flex",
        opacity: phase >= 4 ? 1 : 0,
        transition: "opacity 1s ease",
      }}>
        <div style={{ flex: 1, background: "#75AADB" }} />
        <div style={{ flex: 0.3, background: "white" }} />
        <div style={{ flex: 1, background: "#0d0d0d" }} />
        <div style={{ flex: 0.3, background: "white" }} />
        <div style={{ flex: 1, background: "#75AADB" }} />
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ClipCutSplash;
