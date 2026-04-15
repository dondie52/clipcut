import{u as p,r,j as e}from"./DwQPoapS.js";import{B as l}from"./D8AsaMNA.js";import{M as s}from"./DO18bw36.js";import"./DZxFKcQQ.js";const c=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --lp-bg: #0a0a0a;
    --lp-bg-alt: #0d1117;
    --lp-surface: #1a2332;
    --lp-border: rgba(255,255,255,0.08);
    --lp-border-hover: rgba(255,255,255,0.16);
    --lp-accent: #75AADB;
    --lp-accent-hover: #8bbae3;
    --lp-text: #ffffff;
    --lp-text-secondary: rgba(255,255,255,0.72);
    --lp-text-muted: rgba(255,255,255,0.45);
  }

  .lp-root {
    min-height: 100vh;
    min-height: 100dvh;
    background: var(--lp-bg);
    color: var(--lp-text);
    font-family: 'Spline Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Soft Botswana-blue glow behind the hero — no purple, no gradient hero
     banner. Subtle ambient lighting only, masked to top-center. */
  .lp-root::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: min(900px, 100%);
    height: 600px;
    background: radial-gradient(
      ellipse at center,
      rgba(117,170,219,0.12) 0%,
      rgba(117,170,219,0.04) 40%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  /* --- Nav --- */
  .lp-nav {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 32px;
    background: rgba(10,10,10,0.72);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--lp-border);
  }

  .lp-wordmark {
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: var(--lp-text);
    text-decoration: none;
    cursor: default;
    user-select: none;
  }

  .lp-wordmark-accent {
    color: var(--lp-accent);
  }

  .lp-nav-right {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .lp-link-btn {
    background: transparent;
    border: none;
    color: var(--lp-text-secondary);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 4px;
    transition: color 160ms ease;
  }
  .lp-link-btn:hover,
  .lp-link-btn:focus-visible { color: var(--lp-accent); outline: none; }
  .lp-link-btn:focus-visible { text-decoration: underline; text-underline-offset: 4px; }

  .lp-cta-primary {
    background: var(--lp-accent);
    color: #0a0a0a;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 160ms ease, transform 160ms ease;
    min-height: 40px;
  }
  .lp-cta-primary:hover { background: var(--lp-accent-hover); }
  .lp-cta-primary:active { transform: translateY(1px); }
  .lp-cta-primary:focus-visible {
    outline: 2px solid var(--lp-accent);
    outline-offset: 3px;
  }

  /* --- Hero --- */
  .lp-hero {
    flex: 1;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 32px 120px;
    max-width: 880px;
    margin: 0 auto;
    width: 100%;
  }

  .lp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(117,170,219,0.08);
    border: 1px solid rgba(117,170,219,0.25);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--lp-accent);
    margin-bottom: 28px;
  }

  .lp-eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--lp-accent);
    box-shadow: 0 0 8px rgba(117,170,219,0.6);
  }

  .lp-headline {
    font-size: clamp(36px, 6vw, 64px);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0 0 12px;
    color: var(--lp-text);
  }

  .lp-headline-secondary {
    display: block;
    font-weight: 300;
    color: var(--lp-text-secondary);
    font-size: clamp(28px, 4.5vw, 48px);
    letter-spacing: -0.02em;
  }

  .lp-subhead {
    font-size: clamp(15px, 2vw, 18px);
    line-height: 1.6;
    color: var(--lp-text-secondary);
    max-width: 560px;
    margin: 24px auto 40px;
    font-weight: 400;
  }

  .lp-cta-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .lp-cta-hero {
    background: var(--lp-accent);
    color: #0a0a0a;
    border: none;
    border-radius: 10px;
    padding: 16px 32px;
    font: inherit;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    min-height: 52px;
    transition: background 160ms ease, transform 160ms ease, box-shadow 240ms ease;
    box-shadow: 0 8px 24px rgba(117,170,219,0.2);
  }
  .lp-cta-hero:hover {
    background: var(--lp-accent-hover);
    box-shadow: 0 12px 32px rgba(117,170,219,0.3);
  }
  .lp-cta-hero:active { transform: translateY(1px); }
  .lp-cta-hero:focus-visible {
    outline: 2px solid var(--lp-accent);
    outline-offset: 4px;
  }

  .lp-cta-microcopy {
    font-size: 13px;
    color: var(--lp-text-muted);
    font-weight: 400;
  }

  /* --- Mobile (≤640px) --- */
  @media (max-width: ${s}px) {
    .lp-nav { padding: 14px 16px; }
    .lp-nav-right { gap: 8px; }
    .lp-wordmark { font-size: 18px; }
    /* Tighten the CTA on narrow screens but keep both Sign in + Get started
       visible — returning users need a direct path to /login.
       No hamburger: nothing sits behind it yet (see NO_SLOP §9). */
    .lp-cta-primary { padding: 9px 14px; font-size: 13px; }
    .lp-link-btn { font-size: 13px; padding: 8px 2px; }
    .lp-hero { padding: 56px 20px 80px; }
    .lp-subhead { margin: 20px auto 32px; }
    .lp-cta-hero { width: 100%; max-width: 320px; }
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .lp-cta-primary,
    .lp-cta-hero,
    .lp-link-btn { transition: none; }
  }
`,g=()=>{const a=p(),[o,i]=r.useState(!1);return r.useEffect(()=>{const n="lp-landing-styles";if(!document.getElementById(n)){const t=document.createElement("style");t.id=n,t.textContent=c,document.head.appendChild(t)}return i(!0),()=>{const t=document.getElementById(n);t&&t.remove()}},[]),o?e.jsxs("div",{className:"lp-root",children:[e.jsxs("nav",{className:"lp-nav","aria-label":"Primary",children:[e.jsxs("span",{className:"lp-wordmark","aria-label":"ClipCut",children:["Clip",e.jsx("span",{className:"lp-wordmark-accent",children:"Cut"})]}),e.jsxs("div",{className:"lp-nav-right",children:[e.jsx("button",{type:"button",className:"lp-link-btn",onClick:()=>a("/login"),children:"Sign in"}),e.jsx("button",{type:"button",className:"lp-cta-primary",onClick:()=>a("/register"),children:"Get started"})]})]}),e.jsxs("main",{className:"lp-hero",children:[e.jsxs("span",{className:"lp-eyebrow",children:[e.jsx("span",{className:"lp-eyebrow-dot","aria-hidden":"true"}),"Open source · Made in Botswana"]}),e.jsxs("h1",{className:"lp-headline",children:["Edit videos in your browser.",e.jsx("span",{className:"lp-headline-secondary",children:"Built for African creators."})]}),e.jsx("p",{className:"lp-subhead",children:"Open-source video editing with auto-captions, smart cuts, and cloud sync. No downloads. No watermarks."}),e.jsxs("div",{className:"lp-cta-row",children:[e.jsx("button",{type:"button",className:"lp-cta-hero",onClick:()=>a("/register"),children:"Get started free"}),e.jsx("span",{className:"lp-cta-microcopy",children:"No credit card. No subscription. Ever."})]})]}),e.jsx(l,{})]}):null};export{g as default};
