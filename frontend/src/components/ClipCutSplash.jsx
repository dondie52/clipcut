/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2026 ClipCut Contributors / Bokas Technologies (Pty) Ltd
 * Licensed under the MIT License
 *
 * @module components/ClipCutSplash
 * @description Splash screen with cinematic scissor-cut reveal animation
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════
   CSS
   ═══════════════════════════════════════════ */
const SPLASH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');

  :root {
    --sp-bg: #0a0a0a;
    --sp-bg-alt: #0d1117;
    --sp-surface: #111820;
    --sp-accent: #75AADB;
    --sp-accent-light: #a8d0f0;
    --sp-text: #ffffff;
    --sp-text-muted: rgba(255,255,255,0.35);
    --sp-text-dim: rgba(255,255,255,0.2);
    --sp-font: 'Outfit', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .splash-root {
    width: 100vw;
    height: 100vh;
    background: var(--sp-bg);
    overflow: hidden;
    position: relative;
    font-family: var(--sp-font);
  }

  /* Film grain */
  .splash-root::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  /* Grid pattern */
  .splash-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(117,170,219,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(117,170,219,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
  }

  /* —— Curtains —— */
  .splash-curtain {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    z-index: 20;
    transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .splash-curtain--top {
    top: 0;
    background: linear-gradient(180deg, var(--sp-bg-alt) 0%, var(--sp-surface) 100%);
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .splash-curtain--bottom {
    bottom: 0;
    background: linear-gradient(0deg, var(--sp-bg-alt) 0%, var(--sp-surface) 100%);
  }

  .splash-curtain.split { transform: translateY(-105%); }
  .splash-curtain--bottom.split { transform: translateY(105%); }

  .splash-cut-edge {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    transition: all 0.5s ease;
  }

  .splash-curtain--top .splash-cut-edge { bottom: 0; }
  .splash-curtain--bottom .splash-cut-edge { top: 0; }

  .splash-cut-edge.glow {
    background: linear-gradient(90deg, transparent, var(--sp-accent), white, var(--sp-accent), transparent);
    box-shadow: 0 0 20px var(--sp-accent), 0 0 40px rgba(117,170,219,0.3);
  }

  /* —— Scissors —— */
  .splash-scissors {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 30;
    transition: opacity 0.5s ease;
    filter: drop-shadow(0 0 15px rgba(117,170,219,0.6));
  }

  .splash-scissors.entering {
    left: 50%;
    transition: left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease;
  }

  .splash-scissors.hidden { opacity: 0; }
  .splash-scissors.offscreen { left: -10%; }

  /* —— Sparks —— */
  .splash-sparks {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 25;
    overflow: hidden;
  }

  .splash-spark {
    position: absolute;
    top: 50%;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--sp-accent);
    box-shadow: 0 0 6px var(--sp-accent);
    animation: splashSparkle 0.6s ease-in-out infinite;
  }

  /* —— Main content —— */
  .splash-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .splash-content.hidden {
    opacity: 0;
    transform: scale(0.9);
  }

  .splash-content.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* Glow orb */
  .splash-glow-orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.12) 0%, transparent 70%);
    filter: blur(40px);
    animation: splashPulse 3s ease-in-out infinite;
  }

  /* Logo */
  .splash-logo {
    position: relative;
    margin-bottom: 24px;
  }

  .splash-film-frame {
    width: 88px;
    height: 72px;
    border-radius: 16px;
    background: linear-gradient(135deg, #1a2332 0%, var(--sp-bg-alt) 100%);
    border: 2px solid rgba(117,170,219,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(117,170,219,0.1);
  }

  .splash-perf {
    position: absolute;
    width: 6px;
    height: 10px;
    background: rgba(117,170,219,0.12);
    border: 1px solid rgba(117,170,219,0.18);
  }

  .splash-perf--left {
    left: -1px;
    border-radius: 0 3px 3px 0;
    border-left: none;
  }

  .splash-perf--right {
    right: -1px;
    border-radius: 3px 0 0 3px;
    border-right: none;
  }

  .splash-scissors-badge {
    position: absolute;
    bottom: -8px;
    right: -12px;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--sp-accent) 0%, #5a8ab5 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(117,170,219,0.4);
  }

  /* Title */
  .splash-title {
    font-size: 52px;
    font-weight: 800;
    color: var(--sp-text);
    margin: 0 0 4px;
    letter-spacing: -1px;
    text-shadow: 0 0 40px rgba(117,170,219,0.3);
  }

  .splash-tagline {
    font-size: 13px;
    font-weight: 400;
    color: rgba(117,170,219,0.7);
    margin: 0 0 40px;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  /* Loading bar */
  .splash-loader {
    width: 240px;
    transition: opacity 0.5s ease;
  }

  .splash-loader.hidden { opacity: 0; }
  .splash-loader.visible { opacity: 1; }

  .splash-loader-track {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    overflow: hidden;
  }

  .splash-loader-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--sp-accent), var(--sp-accent-light));
    border-radius: 4px;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(117,170,219,0.5);
  }

  .splash-loader-row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .splash-loader-status {
    font-size: 11px;
    color: var(--sp-text-muted);
    letter-spacing: 0.5px;
  }

  .splash-loader-pct {
    font-size: 11px;
    color: var(--sp-accent);
    font-weight: 600;
  }

  /* Footer */
  .splash-footer {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
    transition: opacity 0.5s ease;
  }

  .splash-footer-text {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* Botswana flag stripe */
  .splash-bw-stripe {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 35;
    display: flex;
    transition: opacity 1s ease;
  }

  /* —— Animations —— */
  @keyframes splashSparkle {
    0%, 100% { opacity: 0; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-8px); }
  }

  @keyframes splashPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }
`;

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
const ClipCutSplash = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  // 0: Dark  1: Scissors slide  2: Cut/split  3: Logo  4: Loading  5: Fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3000),
      setTimeout(() => setPhase(5), 5500),
      setTimeout(() => navigate("/login"), 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (phase >= 4) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(interval); return 100; }
          return p + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const statusText = progress < 30
    ? "Loading workspace..."
    : progress < 70
      ? "Preparing editor..."
      : progress < 100
        ? "Almost ready..."
        : "Welcome!";

  const perfPositions = [15, 37, 59];

  return (
    <div className="splash-root">
      <style>{SPLASH_CSS}</style>
      <div className="splash-grid" />

      {/* Top curtain */}
      <div className={`splash-curtain splash-curtain--top ${phase >= 2 ? "split" : ""}`}>
        <div className={`splash-cut-edge ${phase >= 1 ? "glow" : ""}`} />
      </div>

      {/* Bottom curtain */}
      <div className={`splash-curtain splash-curtain--bottom ${phase >= 2 ? "split" : ""}`}>
        <div className={`splash-cut-edge ${phase >= 1 ? "glow" : ""}`} />
      </div>

      {/* Scissors */}
      <div
        className={`splash-scissors ${phase >= 1 ? "entering" : "offscreen"} ${phase >= 3 ? "hidden" : ""}`}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="2.5" stroke="#75AADB" strokeWidth="1.5" fill="none" />
          <circle cx="6" cy="18" r="2.5" stroke="#75AADB" strokeWidth="1.5" fill="none" />
          <line x1="8.2" y1="7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="x2" values="20;16;20" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="18;14;18" dur="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="8.2" y1="16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="x2" values="20;16;20" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
          </line>
          <circle cx="13" cy="12" r="1" fill="#75AADB" opacity={phase >= 1 ? "1" : "0"}>
            <animate attributeName="r" values="0.5;2;0.5" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Sparks */}
      {phase >= 1 && phase < 3 && (
        <div className="splash-sparks">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="splash-spark"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className={`splash-content ${phase >= 3 ? "visible" : "hidden"}`}>
        <div className="splash-glow-orb" />

        {/* Logo */}
        <div className="splash-logo">
          <div className="splash-film-frame">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="#75AADB" />
            </svg>

            {/* Film perforations */}
            {perfPositions.map((top, i) => (
              <div key={`l${i}`} className="splash-perf splash-perf--left" style={{ top: `${top}px` }} />
            ))}
            {perfPositions.map((top, i) => (
              <div key={`r${i}`} className="splash-perf splash-perf--right" style={{ top: `${top}px` }} />
            ))}
          </div>

          <div className="splash-scissors-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="6" r="2.5" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="6" cy="18" r="2.5" stroke="white" strokeWidth="2" fill="none" />
              <line x1="8.5" y1="7.5" x2="20" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8.5" y1="16.5" x2="20" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h1 className="splash-title">ClipCut</h1>
        <p className="splash-tagline">Professional Video Suite</p>

        {/* Loading bar */}
        <div className={`splash-loader ${phase >= 4 ? "visible" : "hidden"}`}>
          <div className="splash-loader-track">
            <div className="splash-loader-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="splash-loader-row">
            <span className="splash-loader-status">{statusText}</span>
            <span className="splash-loader-pct">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="splash-footer" style={{ opacity: phase >= 4 ? 0.4 : 0 }}>
        <span className="splash-footer-text">© 2026 ClipCut • Bokas Technologies (Pty) Ltd</span>
      </div>

      {/* Botswana flag stripe */}
      <div className="splash-bw-stripe" style={{ opacity: phase >= 4 ? 1 : 0 }}>
        <div style={{ flex: 1, background: "#75AADB" }} />
        <div style={{ flex: 0.3, background: "white" }} />
        <div style={{ flex: 1, background: "#0d0d0d" }} />
        <div style={{ flex: 0.3, background: "white" }} />
        <div style={{ flex: 1, background: "#75AADB" }} />
      </div>
    </div>
  );
};

export default ClipCutSplash;
