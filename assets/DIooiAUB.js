import{u as s,r as l,j as e}from"./DwQPoapS.js";import{B as p}from"./D8AsaMNA.js";import{M as n}from"./C-uCTZoe.js";import"./DZxFKcQQ.js";const d=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

  /* The app's global CSS sets html/body to viewport height with
     overflow: hidden (fine for the editor, but it clips this longer
     landing page). Override for just this route — the style tag is
     removed when Landing unmounts so other routes aren't affected. */
  html, body, #root {
    height: auto !important;
    min-height: 100% !important;
    overflow: auto !important;
  }

  :root {
    --lp-bg: #0a0a0a;
    --lp-bg-alt: #0d1117;
    --lp-paper: #f5f1e8;
    --lp-ink: #0a0a0a;
    --lp-surface: #1a2332;
    --lp-border: rgba(255,255,255,0.08);
    --lp-border-strong: rgba(255,255,255,0.22);
    --lp-accent: #75AADB;
    --lp-accent-hover: #8bbae3;
    --lp-accent-soft: rgba(117,170,219,0.12);
    --lp-text: #ffffff;
    --lp-text-secondary: rgba(255,255,255,0.72);
    --lp-text-muted: rgba(255,255,255,0.45);
    --lp-text-whisper: rgba(255,255,255,0.28);
    --lp-font-sans: 'Spline Sans', sans-serif;
    --lp-font-serif: 'Instrument Serif', Georgia, serif;
    --lp-font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  }

  .lp-root {
    background: var(--lp-bg);
    color: var(--lp-text);
    font-family: var(--lp-font-sans);
    position: relative;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 6px; /* reserve space for BotswanaStripe so it sits flush */
    /* Faint horizontal rules — evokes a newspaper/manifesto grid. Very
       low contrast so it only registers subliminally. */
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent 0,
        transparent 47px,
        rgba(255,255,255,0.018) 47px,
        rgba(255,255,255,0.018) 48px
      );
  }

  /* Grainy overlay on top of everything — film-texture atmosphere. */
  .lp-root::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 40;
    opacity: 0.035;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Top-right ambient glow — Botswana blue, masked to the corner so it
     doesn't dominate. Feels like a spotlight raking across the page. */
  .lp-root::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -15%;
    width: 780px;
    height: 780px;
    background: radial-gradient(
      circle at center,
      rgba(117,170,219,0.18) 0%,
      rgba(117,170,219,0.06) 35%,
      transparent 65%
    );
    pointer-events: none;
    z-index: 0;
    filter: blur(20px);
  }

  /* --- Nav --- */
  .lp-nav {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 40px;
    background: rgba(10,10,10,0.74);
    backdrop-filter: blur(16px) saturate(1.2);
    -webkit-backdrop-filter: blur(16px) saturate(1.2);
    border-bottom: 1px solid var(--lp-border);
  }

  .lp-wordmark {
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.035em;
    color: var(--lp-text);
    text-decoration: none;
    cursor: default;
    user-select: none;
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
  }

  .lp-wordmark-accent { color: var(--lp-accent); }
  .lp-wordmark-mark {
    font-family: var(--lp-font-mono);
    font-size: 10px;
    font-weight: 500;
    color: var(--lp-text-whisper);
    margin-left: 10px;
    letter-spacing: 0.04em;
    padding-left: 10px;
    border-left: 1px solid var(--lp-border-strong);
  }

  .lp-nav-right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .lp-link-btn {
    background: transparent;
    border: none;
    color: var(--lp-text-secondary);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.005em;
    cursor: pointer;
    padding: 10px 14px;
    transition: color 180ms ease;
    border-radius: 2px;
  }
  .lp-link-btn:hover,
  .lp-link-btn:focus-visible { color: var(--lp-text); outline: none; }
  .lp-link-btn:focus-visible { box-shadow: inset 0 0 0 1px var(--lp-accent); }

  .lp-cta-primary {
    background: var(--lp-accent);
    color: #0a0a0a;
    border: none;
    border-radius: 2px;
    padding: 11px 20px;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.005em;
    cursor: pointer;
    transition: background 180ms ease, transform 120ms ease, box-shadow 220ms ease;
    min-height: 42px;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .lp-cta-primary:hover {
    background: var(--lp-accent-hover);
    box-shadow: 0 0 0 4px var(--lp-accent-soft);
  }
  .lp-cta-primary:active { transform: translateY(1px); }
  .lp-cta-primary:focus-visible { outline: 2px solid var(--lp-accent); outline-offset: 3px; }
  .lp-cta-primary .lp-arrow {
    font-family: var(--lp-font-serif);
    font-style: italic;
    font-size: 18px;
    line-height: 1;
    transform: translateY(-1px);
  }

  /* --- Hero container --- */
  .lp-hero {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 64px 40px 40px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  /* Two-column asymmetric layout kicks in only at truly wide desktops
     where there's room for both the big headline and the metadata rail
     without cramping. Below ~1120px we use a single column with the rail
     as a horizontal strip above the headline. */
  @media (min-width: 1120px) {
    .lp-hero {
      grid-template-columns: minmax(0, 1fr) 260px;
      gap: 64px;
      padding: 80px 56px 56px;
      align-items: start;
    }
  }

  /* ---------- Metadata rail (right column on desktop, top on mobile) ---------- */
  /* Metadata rail — stacks ABOVE the headline as a tidy horizontal row
     on anything under 1120px; becomes a right-column sidebar only on
     wide desktops where it won't crowd the big italic headline. */
  .lp-rail {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 24px;
    order: -1;
    padding-top: 8px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--lp-border);
  }

  @media (min-width: 720px) {
    .lp-rail {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 1120px) {
    .lp-rail {
      display: flex;
      flex-direction: column;
      gap: 20px;
      order: 2;
      position: sticky;
      top: 100px;
      padding: 4px 0 0 28px;
      border-left: 1px solid var(--lp-border);
      border-bottom: none;
    }
  }

  .lp-rail-label {
    font-family: var(--lp-font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--lp-text-whisper);
  }

  .lp-rail-value {
    font-size: 13px;
    font-weight: 400;
    color: var(--lp-text-secondary);
    line-height: 1.5;
  }

  .lp-rail-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lp-rail-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--lp-font-mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--lp-accent);
    letter-spacing: 0.06em;
  }

  .lp-rail-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--lp-accent);
    box-shadow: 0 0 0 0 rgba(117,170,219,0.6);
    animation: lp-pulse 2.4s ease-in-out infinite;
  }

  @keyframes lp-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(117,170,219,0.6); }
    50%      { box-shadow: 0 0 0 6px rgba(117,170,219,0); }
  }

  /* ---------- Headline block (main column) ---------- */
  .lp-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    order: 1;
    max-width: 900px;
  }

  .lp-section-mark {
    font-family: var(--lp-font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--lp-accent);
    margin-bottom: 28px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    animation: lp-rise 620ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms forwards;
  }
  .lp-section-mark::before {
    content: '';
    width: 28px;
    height: 1px;
    background: var(--lp-accent);
    display: inline-block;
  }

  .lp-headline {
    /* The whole reason this design works: enormous weight contrast. */
    font-family: var(--lp-font-sans);
    font-weight: 800;
    font-size: clamp(44px, 9vw, 112px);
    line-height: 0.94;
    letter-spacing: -0.045em;
    margin: 0 0 28px;
    color: var(--lp-text);
    max-width: 14ch;
  }

  .lp-headline-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(14px);
    animation: lp-rise 720ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  }
  .lp-headline-word:nth-child(1) { animation-delay: 180ms; }
  .lp-headline-word:nth-child(2) { animation-delay: 260ms; }
  .lp-headline-word:nth-child(3) { animation-delay: 340ms; }
  .lp-headline-word:nth-child(4) { animation-delay: 420ms; }
  .lp-headline-word:nth-child(5) { animation-delay: 500ms; }
  .lp-headline-word:nth-child(6) { animation-delay: 580ms; }

  /* The italic serif accent — this is the single most distinctive
     move in the design. Don't change without good reason. */
  .lp-serif {
    font-family: var(--lp-font-serif);
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--lp-accent);
  }

  .lp-headline-light {
    display: inline-block;
    font-weight: 300;
    color: var(--lp-text-secondary);
    letter-spacing: -0.03em;
  }

  .lp-subhead {
    font-size: clamp(16px, 1.6vw, 19px);
    line-height: 1.55;
    color: var(--lp-text-secondary);
    max-width: 52ch;
    margin: 0 0 40px;
    font-weight: 400;
    opacity: 0;
    animation: lp-rise 680ms cubic-bezier(0.2, 0.7, 0.2, 1) 700ms forwards;
  }

  .lp-subhead-em {
    color: var(--lp-text);
    font-weight: 500;
  }

  /* CTA cluster */
  .lp-cta-row {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    opacity: 0;
    animation: lp-rise 680ms cubic-bezier(0.2, 0.7, 0.2, 1) 820ms forwards;
  }

  .lp-cta-hero {
    background: var(--lp-accent);
    color: #0a0a0a;
    border: none;
    border-radius: 2px;
    padding: 18px 28px;
    font: inherit;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.005em;
    cursor: pointer;
    min-height: 56px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: background 180ms ease, transform 120ms ease, box-shadow 240ms ease;
    box-shadow: 0 0 0 1px rgba(117,170,219,0.3), 0 12px 32px rgba(117,170,219,0.22);
  }
  .lp-cta-hero:hover {
    background: var(--lp-accent-hover);
    box-shadow: 0 0 0 1px rgba(117,170,219,0.4), 0 16px 42px rgba(117,170,219,0.32);
  }
  .lp-cta-hero:active { transform: translateY(1px); }
  .lp-cta-hero:focus-visible { outline: 2px solid var(--lp-text); outline-offset: 3px; }
  .lp-cta-hero .lp-arrow {
    font-family: var(--lp-font-serif);
    font-style: italic;
    font-size: 22px;
    line-height: 1;
    transform: translate(2px, -1px);
    transition: transform 220ms ease;
  }
  .lp-cta-hero:hover .lp-arrow { transform: translate(6px, -1px); }

  .lp-cta-microcopy {
    font-size: 13px;
    color: var(--lp-text-muted);
    font-weight: 400;
    line-height: 1.4;
    max-width: 28ch;
  }

  /* ---------- Manifesto blocks ---------- */
  .lp-manifesto {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 24px auto 0;
    padding: 0 40px 56px;
  }

  @media (min-width: 960px) {
    .lp-manifesto { padding: 0 56px 64px; }
  }

  .lp-manifesto-stripe {
    /* A thin Botswana-flag-colored band promoted from footer decoration
       to section divider — signals: "new chapter starts here". */
    height: 4px;
    display: flex;
    margin: 0 0 56px;
    border-radius: 1px;
    overflow: hidden;
    opacity: 0;
    animation: lp-fade 900ms ease 900ms forwards;
  }
  .lp-manifesto-stripe > span { display: block; height: 100%; }
  .lp-manifesto-stripe > span:nth-child(1) { flex: 2; background: var(--lp-accent); }
  .lp-manifesto-stripe > span:nth-child(2) { flex: 0.3; background: #ffffff; }
  .lp-manifesto-stripe > span:nth-child(3) { flex: 1; background: #000000; }
  .lp-manifesto-stripe > span:nth-child(4) { flex: 0.3; background: #ffffff; }
  .lp-manifesto-stripe > span:nth-child(5) { flex: 2; background: var(--lp-accent); }

  .lp-blocks {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
  }

  @media (min-width: 880px) {
    .lp-blocks { grid-template-columns: repeat(3, 1fr); gap: 0; }
  }

  .lp-block {
    padding: 32px 0;
    border-top: 1px solid var(--lp-border);
    opacity: 0;
    transform: translateY(8px);
    animation: lp-rise 680ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  }
  .lp-block:nth-of-type(1) { animation-delay: 960ms; }
  .lp-block:nth-of-type(2) { animation-delay: 1060ms; }
  .lp-block:nth-of-type(3) { animation-delay: 1160ms; }

  @media (min-width: 880px) {
    .lp-block {
      padding: 36px 28px;
      border-top: none;
      border-left: 1px solid var(--lp-border);
    }
    .lp-block:first-child { border-left: none; padding-left: 0; }
    .lp-block:last-child { padding-right: 0; }
  }

  .lp-block-index {
    font-family: var(--lp-font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--lp-text-whisper);
    margin-bottom: 14px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .lp-block-index-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--lp-accent);
  }

  .lp-block-title {
    font-family: var(--lp-font-sans);
    font-weight: 800;
    font-size: clamp(22px, 2.4vw, 28px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: var(--lp-text);
    margin: 0 0 12px;
  }

  .lp-block-title-em {
    font-family: var(--lp-font-serif);
    font-style: italic;
    font-weight: 400;
    color: var(--lp-accent);
    letter-spacing: -0.005em;
  }

  .lp-block-body {
    font-size: 14px;
    line-height: 1.6;
    color: var(--lp-text-secondary);
    margin: 0;
    font-weight: 400;
    max-width: 34ch;
  }

  /* ---------- Footer signature ---------- */
  .lp-sig {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 40px 28px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;
    border-top: 1px solid var(--lp-border);
  }
  @media (min-width: 960px) {
    .lp-sig { padding: 24px 56px 32px; }
  }

  .lp-sig-mark {
    font-family: var(--lp-font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: var(--lp-text-muted);
    text-transform: uppercase;
  }

  .lp-sig-stamp {
    font-family: var(--lp-font-serif);
    font-style: italic;
    font-size: 42px;
    line-height: 0.9;
    color: var(--lp-accent);
    opacity: 0.82;
    letter-spacing: -0.02em;
  }

  /* ---------- Animations ---------- */
  @keyframes lp-rise {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lp-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ---------- Mobile (≤${n}px) ---------- */
  @media (max-width: ${n}px) {
    .lp-nav { padding: 14px 18px; }
    .lp-nav-right { gap: 0; }
    .lp-wordmark { font-size: 18px; }
    .lp-wordmark-mark { display: none; }
    .lp-cta-primary { padding: 9px 14px; font-size: 13px; min-height: 38px; }
    .lp-link-btn { font-size: 13px; padding: 8px 10px; }
    .lp-hero {
      padding: 44px 20px 28px;
      gap: 22px;
    }
    .lp-rail {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px 20px;
      padding-top: 4px;
      padding-bottom: 16px;
    }
    .lp-rail-row { min-width: 0; }
    .lp-head { max-width: none; }
    .lp-headline { max-width: none; }
    .lp-manifesto { padding: 0 20px 56px; margin-top: 20px; }
    .lp-manifesto-stripe { margin-bottom: 32px; }
    .lp-cta-row { gap: 14px; }
    .lp-cta-hero { width: 100%; max-width: 100%; justify-content: center; }
    .lp-cta-microcopy { max-width: none; }
    .lp-sig { padding: 24px 20px 40px; }
    .lp-sig-stamp { font-size: 32px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .lp-cta-primary,
    .lp-cta-hero,
    .lp-link-btn,
    .lp-cta-hero .lp-arrow,
    .lp-rail-status-dot {
      transition: none;
      animation: none !important;
    }
    .lp-section-mark,
    .lp-headline-word,
    .lp-subhead,
    .lp-cta-row,
    .lp-manifesto-stripe,
    .lp-block {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
  }
`,f=()=>{const t=s(),[r,o]=l.useState(!1);return l.useEffect(()=>{const i="lp-landing-styles";if(!document.getElementById(i)){const a=document.createElement("style");a.id=i,a.textContent=d,document.head.appendChild(a)}return o(!0),()=>{const a=document.getElementById(i);a&&a.remove()}},[]),r?e.jsxs("div",{className:"lp-root",children:[e.jsxs("nav",{className:"lp-nav","aria-label":"Primary",children:[e.jsxs("span",{className:"lp-wordmark","aria-label":"ClipCut",children:["Clip",e.jsx("span",{className:"lp-wordmark-accent",children:"Cut"}),e.jsx("span",{className:"lp-wordmark-mark",children:"v0.1 · BW"})]}),e.jsxs("div",{className:"lp-nav-right",children:[e.jsx("button",{type:"button",className:"lp-link-btn",onClick:()=>t("/login"),children:"Sign in"}),e.jsxs("button",{type:"button",className:"lp-cta-primary",onClick:()=>t("/register"),children:["Get started",e.jsx("span",{className:"lp-arrow","aria-hidden":"true",children:"→"})]})]})]}),e.jsxs("main",{className:"lp-hero",children:[e.jsxs("section",{className:"lp-head","aria-labelledby":"lp-headline",children:[e.jsx("span",{className:"lp-section-mark",children:"§ 01 · A public declaration"}),e.jsxs("h1",{id:"lp-headline",className:"lp-headline",children:[e.jsx("span",{className:"lp-headline-word",children:"Make"})," ",e.jsx("span",{className:"lp-headline-word",children:"video."})," ",e.jsx("span",{className:"lp-headline-word lp-serif",children:"In your"})," ",e.jsx("span",{className:"lp-headline-word lp-serif",children:"browser."})," ",e.jsx("span",{className:"lp-headline-word lp-headline-light",children:"No tax."})," ",e.jsx("span",{className:"lp-headline-word lp-headline-light",children:"No excuses."})]}),e.jsxs("p",{className:"lp-subhead",children:["ClipCut is an"," ",e.jsx("span",{className:"lp-subhead-em",children:"open-source video editor"})," ","built in Gaborone for creators across Botswana and the wider African diaspora. Cut, caption, and export — without paying a subscription, watermarking your work, or needing a MacBook."]}),e.jsxs("div",{className:"lp-cta-row",children:[e.jsxs("button",{type:"button",className:"lp-cta-hero",onClick:()=>t("/register"),children:["Start editing",e.jsx("span",{className:"lp-arrow","aria-hidden":"true",children:"→"})]}),e.jsx("span",{className:"lp-cta-microcopy",children:"Two minutes. No card. Works in any modern browser."})]})]}),e.jsxs("aside",{className:"lp-rail","aria-label":"Project metadata",children:[e.jsxs("span",{className:"lp-rail-status",children:[e.jsx("span",{className:"lp-rail-status-dot","aria-hidden":"true"}),"Live · 0.1.0"]}),e.jsxs("div",{className:"lp-rail-row",children:[e.jsx("span",{className:"lp-rail-label",children:"Origin"}),e.jsxs("span",{className:"lp-rail-value",children:["Gaborone, Botswana",e.jsx("br",{}),"24.6282° S · 25.9231° E"]})]}),e.jsxs("div",{className:"lp-rail-row",children:[e.jsx("span",{className:"lp-rail-label",children:"License"}),e.jsx("span",{className:"lp-rail-value",children:"MIT — free forever"})]}),e.jsxs("div",{className:"lp-rail-row",children:[e.jsx("span",{className:"lp-rail-label",children:"Runtime"}),e.jsx("span",{className:"lp-rail-value",children:"Browser · Linux · Windows"})]}),e.jsxs("div",{className:"lp-rail-row",children:[e.jsx("span",{className:"lp-rail-label",children:"Price"}),e.jsx("span",{className:"lp-rail-value",style:{fontFamily:"'JetBrains Mono', monospace",fontSize:14},children:"P 0.00 / forever"})]})]})]}),e.jsxs("section",{className:"lp-manifesto","aria-label":"Principles",children:[e.jsxs("div",{className:"lp-manifesto-stripe",role:"presentation","aria-hidden":"true",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]}),e.jsxs("div",{className:"lp-blocks",children:[e.jsxs("article",{className:"lp-block",children:[e.jsxs("span",{className:"lp-block-index",children:[e.jsx("span",{className:"lp-block-index-dot","aria-hidden":"true"}),"§ 01 — Zero cost"]}),e.jsxs("h2",{className:"lp-block-title",children:["Not a trial."," ",e.jsx("span",{className:"lp-block-title-em",children:"Not freemium."})]}),e.jsx("p",{className:"lp-block-body",children:"P0 forever. Run it in your browser, clone the source, or fork it — your choice. No paywalls, no upgrade prompts, no feature gates."})]}),e.jsxs("article",{className:"lp-block",children:[e.jsxs("span",{className:"lp-block-index",children:[e.jsx("span",{className:"lp-block-index-dot","aria-hidden":"true"}),"§ 02 — Zero watermark"]}),e.jsxs("h2",{className:"lp-block-title",children:["Your video is"," ",e.jsx("span",{className:"lp-block-title-em",children:"your video."})]}),e.jsx("p",{className:"lp-block-body",children:"Nothing embedded. Nothing branded. Nothing to remove. Export at 1080p and ship to TikTok, YouTube, or a WhatsApp group unchanged."})]}),e.jsxs("article",{className:"lp-block",children:[e.jsxs("span",{className:"lp-block-index",children:[e.jsx("span",{className:"lp-block-index-dot","aria-hidden":"true"}),"§ 03 — Locally made"]}),e.jsxs("h2",{className:"lp-block-title",children:["Built for"," ",e.jsx("span",{className:"lp-block-title-em",children:"low-bandwidth"})," reality."]}),e.jsx("p",{className:"lp-block-body",children:"Designed in Gaborone for creators on 4G, coffee-shop WiFi, and everything in between. Works offline after first load. No macOS required."})]})]})]}),e.jsxs("footer",{className:"lp-sig",children:[e.jsx("span",{className:"lp-sig-mark",children:"ClipCut · 2026 · MIT License · Made in Gaborone"}),e.jsx("span",{className:"lp-sig-stamp","aria-hidden":"true",children:"ClipCut."})]}),e.jsx(p,{})]}):null};export{f as default};
