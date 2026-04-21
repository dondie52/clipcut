/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2026 ClipCut Contributors / Bokas Technologies (Pty) Ltd
 * Licensed under the MIT License
 *
 * @module components/OnboardingStep3
 * @description Onboarding Step 3 — Preferences & launch. "Warm Storybook"
 *   aesthetic. State (notifications, defaultResolution, autoSave) and all
 *   analytics events preserved.
 */

import { useState } from "react";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import BotswanaStripe from "./shared/BotswanaStripe";

const STEP3_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --cc-bg: #0c1220;
    --cc-bg-alt: #0e1624;
    --cc-card: #121a2a;
    --cc-card-raised: #18212f;
    --cc-border: rgba(255,255,255,0.07);
    --cc-border-hover: rgba(255,255,255,0.14);
    --cc-accent: #75AADB;
    --cc-accent-hover: #8bbae3;
    --cc-accent-soft: rgba(117,170,219,0.12);
    --cc-text: #ffffff;
    --cc-text-secondary: rgba(255,255,255,0.74);
    --cc-text-muted: rgba(255,255,255,0.46);
    --cc-text-whisper: rgba(255,255,255,0.22);
    --cc-font-sans: 'Spline Sans', sans-serif;
    --cc-font-display: 'Outfit', 'Spline Sans', sans-serif;
    --cc-font-serif: 'Instrument Serif', Georgia, serif;
    --cc-font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ob3-root {
    width: 100vw; min-height: 100vh; min-height: 100dvh;
    background: var(--cc-bg);
    display: flex; flex-direction: column;
    position: relative; overflow-x: hidden;
    font-family: var(--cc-font-sans);
    color: var(--cc-text);
  }
  .ob3-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .ob3-root::after {
    content: ''; position: fixed; z-index: 0; pointer-events: none;
    top: -10%; left: 50%; transform: translateX(-50%);
    width: 880px; height: 420px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(117,170,219,0.12) 0%, rgba(117,170,219,0.03) 40%, transparent 70%);
    filter: blur(24px);
  }

  .ob3-bg-num {
    position: absolute; z-index: 0; pointer-events: none; user-select: none;
    top: 46%; right: -6%; transform: translateY(-50%);
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-size: clamp(240px, 36vw, 520px);
    line-height: 0.9;
    color: var(--cc-accent);
    opacity: 0.05;
    letter-spacing: -0.04em;
  }

  /* Header */
  .ob3-header {
    width: 100%; padding: 22px 36px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--cc-border);
    position: relative; z-index: 2;
    opacity: 0; animation: ob3-fade-down 0.6s ease forwards;
  }
  .ob3-brand { display: flex; align-items: baseline; gap: 10px; }
  .ob3-brand-mono {
    font-family: var(--cc-font-serif);
    font-style: italic; font-size: 26px;
    color: var(--cc-accent); line-height: 1;
  }
  .ob3-brand-name {
    font-family: var(--cc-font-display);
    font-size: 16px; font-weight: 700; letter-spacing: -0.02em; color: var(--cc-text);
  }

  .ob3-progress { display: flex; align-items: center; gap: 16px; }
  .ob3-progress-strokes { display: flex; align-items: center; gap: 6px; }
  .ob3-stroke {
    width: 40px; height: 5px; border-radius: 999px;
    background: rgba(255,255,255,0.06); position: relative; overflow: hidden;
  }
  .ob3-stroke.is-filled {
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 50%, #8bbae3 100%);
    box-shadow: 0 0 12px rgba(117,170,219,0.35);
  }
  .ob3-stroke.is-active {
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 100%);
    box-shadow: 0 0 14px rgba(117,170,219,0.45);
  }
  .ob3-stroke.is-active::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: ob3-shimmer 2.6s ease-in-out infinite;
  }
  .ob3-step-label {
    font-family: var(--cc-font-mono);
    font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em;
    color: var(--cc-text-muted); text-transform: uppercase;
  }

  /* Main */
  .ob3-main {
    flex: 1;
    display: flex; justify-content: center;
    padding: 56px 32px 80px;
    position: relative; z-index: 1;
  }
  .ob3-container { width: 100%; max-width: 780px; }

  .ob3-heading {
    text-align: center; margin-bottom: 48px;
    opacity: 0; animation: ob3-fade-up 0.7s ease 0.12s forwards;
  }
  .ob3-eyebrow {
    font-family: var(--cc-font-mono);
    font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--cc-accent);
    margin-bottom: 18px; display: inline-flex; align-items: center; gap: 10px;
  }
  .ob3-eyebrow::before, .ob3-eyebrow::after {
    content: ''; width: 22px; height: 1px; background: var(--cc-accent); opacity: 0.5;
  }
  .ob3-title {
    font-family: var(--cc-font-display);
    font-size: clamp(32px, 4.6vw, 44px);
    font-weight: 600; line-height: 1.05; letter-spacing: -0.035em;
    margin-bottom: 14px; color: var(--cc-text);
  }
  .ob3-title-em {
    font-family: var(--cc-font-serif);
    font-style: italic; font-weight: 400; color: var(--cc-accent);
  }
  .ob3-subtitle {
    font-size: 15px; color: var(--cc-text-secondary);
    line-height: 1.55; max-width: 48ch; margin: 0 auto;
  }

  /* Settings grid */
  .ob3-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
    margin-bottom: 28px;
  }
  .ob3-section {
    opacity: 0; animation: ob3-fade-up 0.7s ease forwards;
  }
  .ob3-section:nth-child(1) { animation-delay: 0.22s; }
  .ob3-section:nth-child(2) { animation-delay: 0.32s; }

  .ob3-section-title {
    font-family: var(--cc-font-mono);
    font-size: 10.5px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--cc-text-muted); margin-bottom: 14px;
    display: inline-flex; align-items: center; gap: 10px;
  }
  .ob3-section-title::before {
    content: ''; width: 18px; height: 1px; background: var(--cc-text-muted); opacity: 0.5;
  }

  /* Resolution cards — tactile */
  .ob3-res-stack { display: flex; flex-direction: column; gap: 10px; }

  .ob3-res-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 18px;
    border-radius: 12px;
    border: 1px solid var(--cc-border);
    background: var(--cc-card);
    cursor: pointer; outline: none;
    transition: transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1), border-color 200ms ease, background 200ms ease, box-shadow 240ms ease;
  }
  .ob3-res-card:hover {
    transform: translateY(-1px);
    border-color: var(--cc-border-hover);
    background: var(--cc-card-raised);
  }
  .ob3-res-card:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 3px; }
  .ob3-res-card.selected {
    border-color: var(--cc-accent);
    background: linear-gradient(145deg, rgba(117,170,219,0.12), rgba(117,170,219,0.04));
    box-shadow: 0 8px 22px rgba(117,170,219,0.14);
  }

  .ob3-res-left { display: flex; align-items: baseline; gap: 12px; }
  .ob3-res-value {
    font-family: var(--cc-font-display);
    font-size: 18px; font-weight: 700; letter-spacing: -0.02em;
    color: var(--cc-text);
  }
  .ob3-res-desc {
    font-family: var(--cc-font-mono);
    font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--cc-text-whisper);
  }

  .ob3-radio {
    width: 20px; height: 20px; border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    transition: border-color 200ms ease;
    flex-shrink: 0;
  }
  .ob3-res-card.selected .ob3-radio {
    border-color: var(--cc-accent);
    background: var(--cc-accent);
    box-shadow: 0 0 0 4px rgba(117,170,219,0.14);
  }
  .ob3-radio-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #0a0a0a;
    opacity: 0; transform: scale(0);
    transition: opacity 200ms ease, transform 200ms ease;
  }
  .ob3-res-card.selected .ob3-radio-dot { opacity: 1; transform: scale(1); }

  /* Toggle rows */
  .ob3-toggles { display: flex; flex-direction: column; gap: 10px; }
  .ob3-toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid var(--cc-border);
    background: var(--cc-card);
    transition: border-color 200ms ease, background 200ms ease;
  }
  .ob3-toggle-row:hover {
    border-color: var(--cc-border-hover);
    background: var(--cc-card-raised);
  }
  .ob3-toggle-info { flex: 1; min-width: 0; }
  .ob3-toggle-label {
    font-family: var(--cc-font-display);
    font-size: 14px; font-weight: 600; letter-spacing: -0.005em;
    margin-bottom: 2px; color: var(--cc-text);
  }
  .ob3-toggle-desc {
    font-size: 12px; color: var(--cc-text-muted); line-height: 1.4;
  }

  .ob3-switch {
    width: 44px; height: 24px; border-radius: 999px;
    background: rgba(255,255,255,0.1);
    border: none; padding: 0;
    cursor: pointer; position: relative;
    transition: background 220ms ease;
    flex-shrink: 0; margin-left: 14px;
  }
  .ob3-switch.on { background: var(--cc-accent); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18); }
  .ob3-switch:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 2px; }
  .ob3-switch-knob {
    position: absolute; top: 2px; left: 2px;
    width: 20px; height: 20px; border-radius: 50%;
    background: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    transition: left 220ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ob3-switch.on .ob3-switch-knob { left: 22px; }

  /* Auto-save card — slightly raised, feature-y */
  .ob3-autosave {
    opacity: 0; animation: ob3-fade-up 0.7s ease 0.42s forwards;
    margin-bottom: 40px;
  }
  .ob3-autosave-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px;
    border-radius: 16px;
    border: 1px solid rgba(117,170,219,0.22);
    background: linear-gradient(145deg, rgba(117,170,219,0.1) 0%, rgba(117,170,219,0.02) 100%);
    position: relative;
    overflow: hidden;
  }
  .ob3-autosave-card::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.12), transparent 60%);
    pointer-events: none;
  }
  .ob3-autosave-left {
    display: flex; align-items: center; gap: 16px; flex: 1;
    position: relative; z-index: 1;
  }
  .ob3-autosave-icon {
    width: 48px; height: 48px; border-radius: 14px;
    background: rgba(117,170,219,0.18);
    border: 1px solid rgba(117,170,219,0.3);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* Actions */
  .ob3-actions {
    display: flex; flex-direction: column; align-items: center;
    gap: 14px;
    opacity: 0; animation: ob3-fade-up 0.7s ease 0.54s forwards;
  }

  .ob3-btn-launch {
    width: 100%;
    max-width: 360px;
    padding: 18px 28px;
    border: none;
    border-radius: 12px;
    font-family: var(--cc-font-display);
    font-size: 17px; font-weight: 700; letter-spacing: -0.01em;
    cursor: pointer;
    background: var(--cc-accent); color: #0a0a0a;
    display: inline-flex; align-items: center; justify-content: center; gap: 12px;
    transition: background 200ms ease, box-shadow 280ms ease, transform 140ms ease;
    box-shadow: 0 14px 36px rgba(117,170,219,0.3), inset 0 -2px 0 rgba(0,0,0,0.18);
  }
  .ob3-btn-launch:hover {
    background: var(--cc-accent-hover);
    box-shadow: 0 18px 48px rgba(117,170,219,0.4), inset 0 -2px 0 rgba(0,0,0,0.18);
    transform: translateY(-2px);
  }
  .ob3-btn-launch:active { transform: translateY(0); }

  .ob3-btn-ghost {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font-sans);
    font-size: 13px; font-weight: 500;
    color: var(--cc-text-muted);
    padding: 6px 12px;
    transition: color 160ms ease;
    text-decoration: none;
  }
  .ob3-btn-ghost:hover { color: var(--cc-accent); }

  @keyframes ob3-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob3-fade-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob3-shimmer { 0% { transform: translateX(-100%); } 60% { transform: translateX(100%); } 100% { transform: translateX(100%); } }

  @media (max-width: 768px) {
    .ob3-grid { grid-template-columns: 1fr; gap: 28px; }
    .ob3-bg-num { display: none; }
  }

  @media (max-width: 640px) {
    .ob3-header { padding: 16px 20px; }
    .ob3-main { padding: 36px 20px 60px; }
    .ob3-title { font-size: 28px; }
    .ob3-step-label { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ob3-header, .ob3-heading, .ob3-section, .ob3-autosave, .ob3-actions {
      opacity: 1 !important; animation: none !important;
    }
    .ob3-stroke.is-active::after { animation: none; }
    .ob3-btn-launch:hover { transform: none; }
  }
`;

const OnboardingStep3 = ({ onComplete, onSkip }) => {
  const [notifications, setNotifications] = useState({ email: true, push: false, projectUpdates: true });
  const [defaultResolution, setDefaultResolution] = useState("1080p");
  const [autoSave, setAutoSave] = useState(true);

  const toggleNotif = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    trackEvent(analyticsEvents.onboardingContinue, { step: "3", action: "toggle_notification", key });
  };

  const resolutions = [
    { id: "480p",  label: "480p",  desc: "SD" },
    { id: "720p",  label: "720p",  desc: "HD" },
    { id: "1080p", label: "1080p", desc: "Full HD" },
  ];

  const notifOptions = [
    { key: "email",          label: "Email updates",  desc: "Project & feature news" },
    { key: "push",           label: "Push alerts",    desc: "Real-time browser alerts" },
    { key: "projectUpdates", label: "Export alerts",  desc: "When exports finish" },
  ];

  return (
    <div className="ob3-root">
      <style>{STEP3_CSS}</style>

      <span className="ob3-bg-num" aria-hidden="true">03</span>

      <header className="ob3-header">
        <div className="ob3-brand">
          <span className="ob3-brand-mono" aria-hidden="true">CC</span>
          <span className="ob3-brand-name">ClipCut</span>
        </div>
        <div className="ob3-progress">
          <div className="ob3-progress-strokes" aria-hidden="true">
            <div className="ob3-stroke is-filled" />
            <div className="ob3-stroke is-filled" />
            <div className="ob3-stroke is-active" />
          </div>
          <span className="ob3-step-label">Final step</span>
        </div>
      </header>

      <main className="ob3-main">
        <div className="ob3-container">
          <div className="ob3-heading">
            <div className="ob3-eyebrow">Almost there</div>
            <h1 className="ob3-title">
              Fine-tune your <span className="ob3-title-em">workspace.</span>
            </h1>
            <p className="ob3-subtitle">
              Set your defaults. You can change any of this from Settings whenever you like.
            </p>
          </div>

          <div className="ob3-grid">
            <div className="ob3-section">
              <h3 className="ob3-section-title">Export resolution</h3>
              <div className="ob3-res-stack" role="radiogroup" aria-label="Default export resolution">
                {resolutions.map((r) => {
                  const sel = defaultResolution === r.id;
                  return (
                    <div
                      key={r.id}
                      className={`ob3-res-card ${sel ? "selected" : ""}`}
                      role="radio"
                      aria-checked={sel}
                      tabIndex={0}
                      onClick={() => { setDefaultResolution(r.id); trackEvent(analyticsEvents.onboardingContinue, { step: "3", action: "set_resolution", resolution: r.id }); }}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDefaultResolution(r.id); } }}
                    >
                      <div className="ob3-res-left">
                        <span className="ob3-res-value">{r.label}</span>
                        <span className="ob3-res-desc">{r.desc}</span>
                      </div>
                      <div className="ob3-radio" aria-hidden="true">
                        <div className="ob3-radio-dot" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="ob3-section">
              <h3 className="ob3-section-title">Notifications</h3>
              <div className="ob3-toggles">
                {notifOptions.map((n) => (
                  <div key={n.key} className="ob3-toggle-row">
                    <div className="ob3-toggle-info">
                      <div className="ob3-toggle-label">{n.label}</div>
                      <div className="ob3-toggle-desc">{n.desc}</div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={notifications[n.key]}
                      aria-label={n.label}
                      className={`ob3-switch ${notifications[n.key] ? "on" : ""}`}
                      onClick={() => toggleNotif(n.key)}
                    >
                      <div className="ob3-switch-knob" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ob3-autosave">
            <div className="ob3-autosave-card">
              <div className="ob3-autosave-left">
                <div className="ob3-autosave-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "var(--cc-accent)" }}>cloud_sync</span>
                </div>
                <div className="ob3-toggle-info">
                  <div className="ob3-toggle-label">Auto-save to cloud</div>
                  <div className="ob3-toggle-desc">Your work gets backed up automatically as you edit.</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={autoSave}
                aria-label="Auto-save projects"
                className={`ob3-switch ${autoSave ? "on" : ""}`}
                onClick={() => { setAutoSave(!autoSave); trackEvent(analyticsEvents.onboardingContinue, { step: "3", action: "toggle_autosave", enabled: !autoSave }); }}
                style={{ position: "relative", zIndex: 1 }}
              >
                <div className="ob3-switch-knob" />
              </button>
            </div>
          </div>

          <div className="ob3-actions">
            <button
              className="ob3-btn-launch"
              onClick={() => { trackEvent(analyticsEvents.onboardingComplete, { step: "3" }); onComplete?.(); }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#0a0a0a", fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              Launch ClipCut
            </button>
            <a
              href="#"
              className="ob3-btn-ghost"
              onClick={(e) => { e.preventDefault(); trackEvent(analyticsEvents.onboardingSkip, { step: "3" }); onSkip?.(); }}
            >
              Skip for now
            </a>
          </div>
        </div>
      </main>

      <BotswanaStripe height="4px" />
    </div>
  );
};

export default OnboardingStep3;
