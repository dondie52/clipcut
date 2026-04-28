import{u as T,r as i,j as t}from"./DwQPoapS.js";import{M as F}from"./BiOOe6d0.js";import{B as _}from"./D8AsaMNA.js";import"./C_8A2FPv.js";const v=[{id:"all",label:"All works"},{id:"tiktok",label:"TikTok Vertical"},{id:"youtube",label:"YouTube Intro"},{id:"wedding",label:"Wedding"},{id:"music",label:"Music Video"},{id:"vlog",label:"News / Vlog"}],M=[{id:"t01",name:"Gaborone Nights",creator:"mpho.k",category:"tiktok",duration_seconds:22,downloads:1284,rating:4.7,featured:!0,hue:210,accent:38},{id:"t02",name:"Sunrise at Tsodilo",creator:"kefilwe.m",category:"vlog",duration_seconds:58,downloads:842,rating:4.6,featured:!0,hue:26,accent:210},{id:"t03",name:"Bojale Promo",creator:"tshepo.b",category:"youtube",duration_seconds:12,downloads:612,rating:4.5,featured:!1,hue:340,accent:48},{id:"t04",name:"Kalahari Motion",creator:"itumeleng",category:"music",duration_seconds:180,downloads:2410,rating:4.9,featured:!1,hue:32,accent:196},{id:"t05",name:"Tlotlo & Lesego",creator:"studio.mogae",category:"wedding",duration_seconds:240,downloads:398,rating:4.8,featured:!1,hue:20,accent:120},{id:"t06",name:"Orange River Cut",creator:"neo.framework",category:"music",duration_seconds:142,downloads:1102,rating:4.6,featured:!1,hue:12,accent:48},{id:"t07",name:"Maun Morning Report",creator:"thuso.n",category:"vlog",duration_seconds:96,downloads:233,rating:4.3,featured:!1,hue:196,accent:20},{id:"t08",name:"Dance Floor / 90bpm",creator:"boago",category:"tiktok",duration_seconds:15,downloads:3401,rating:4.8,featured:!1,hue:290,accent:48},{id:"t09",name:"Channel Identity № 04",creator:"dineo.dev",category:"youtube",duration_seconds:8,downloads:521,rating:4.4,featured:!1,hue:210,accent:340},{id:"t10",name:"Limpopo at Dusk",creator:"setshwano",category:"vlog",duration_seconds:210,downloads:159,rating:4.2,featured:!1,hue:260,accent:32},{id:"t11",name:"Brides of Gaborone",creator:"marang.studio",category:"wedding",duration_seconds:320,downloads:188,rating:4.9,featured:!1,hue:352,accent:40},{id:"t12",name:"After-Party Edit",creator:"onkagetse",category:"tiktok",duration_seconds:19,downloads:980,rating:4.5,featured:!1,hue:296,accent:196}],A=()=>{const[o,r]=i.useState(!0),[n,c]=i.useState([]);return i.useEffect(()=>{const m=setTimeout(()=>{c(M),r(!1)},280);return()=>clearTimeout(m)},[]),{templates:n,loading:o}},u=o=>{const r=Math.floor(o/60),n=o%60;return r>0?`${r}:${String(n).padStart(2,"0")}`:`0:${String(n).padStart(2,"0")}`},h=o=>o>=1e3?`${(o/1e3).toFixed(o>=1e4?0:1)}k`:String(o),b=o=>v.find(r=>r.id===o)?.label??"—",L=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --tl-bg: #0a0a0a;
    --tl-bg-alt: #0d1117;
    --tl-surface: #12161f;
    --tl-surface-raised: #161b26;
    --tl-border: rgba(255,255,255,0.07);
    --tl-border-strong: rgba(255,255,255,0.16);
    --tl-accent: #75AADB;
    --tl-accent-hover: #8bbae3;
    --tl-accent-soft: rgba(117,170,219,0.12);
    --tl-text: #ffffff;
    --tl-text-secondary: rgba(255,255,255,0.7);
    --tl-text-muted: rgba(255,255,255,0.42);
    --tl-text-whisper: rgba(255,255,255,0.26);
    --tl-font-sans: 'Spline Sans', sans-serif;
    --tl-font-serif: 'Fraunces', Georgia, serif;
    --tl-font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  }

  .tl-root {
    min-height: 100vh;
    min-height: 100dvh;
    background: var(--tl-bg);
    color: var(--tl-text);
    font-family: var(--tl-font-sans);
    position: relative;
    overflow-x: hidden;
  }

  .tl-root::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 60;
    opacity: 0.03;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* --- Top bar --- */
  .tl-topbar {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 40px;
    background: rgba(10,10,10,0.82);
    backdrop-filter: blur(14px) saturate(1.2);
    -webkit-backdrop-filter: blur(14px) saturate(1.2);
    border-bottom: 1px solid var(--tl-border);
  }

  .tl-topbar-left {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .tl-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid var(--tl-border);
    color: var(--tl-text-secondary);
    padding: 8px 12px 8px 10px;
    border-radius: 2px;
    font: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
  }
  .tl-back:hover { color: var(--tl-text); border-color: var(--tl-border-strong); background: var(--tl-surface); }
  .tl-back-arrow {
    font-family: var(--tl-font-serif);
    font-style: italic;
    font-size: 14px;
    transform: translateY(-1px);
  }

  .tl-wordmark {
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.035em;
    color: var(--tl-text);
  }
  .tl-wordmark-accent { color: var(--tl-accent); }

  .tl-search {
    position: relative;
    width: 320px;
  }

  @media (max-width: 820px) { .tl-search { display: none; } }

  .tl-search input {
    width: 100%;
    background: var(--tl-surface);
    border: 1px solid var(--tl-border);
    color: var(--tl-text);
    font: inherit;
    font-size: 13px;
    padding: 10px 12px 10px 34px;
    border-radius: 2px;
    outline: none;
    transition: border-color 180ms ease, background 180ms ease;
  }
  .tl-search input::placeholder { color: var(--tl-text-muted); }
  .tl-search input:focus { border-color: var(--tl-accent); background: var(--tl-surface-raised); }
  .tl-search svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
    pointer-events: none;
  }

  /* --- Page header --- */
  .tl-header {
    max-width: 1440px;
    margin: 0 auto;
    padding: 56px 40px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    flex-wrap: wrap;
  }

  .tl-header-inner {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .tl-overline {
    font-family: var(--tl-font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--tl-accent);
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .tl-overline::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--tl-accent);
  }

  .tl-title {
    font-family: var(--tl-font-serif);
    font-optical-sizing: auto;
    font-weight: 400;
    font-variation-settings: "opsz" 144;
    font-size: clamp(48px, 7.5vw, 96px);
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin: 0;
    color: var(--tl-text);
  }
  .tl-title-em {
    font-style: italic;
    font-weight: 400;
    color: var(--tl-accent);
  }

  .tl-subtitle {
    font-size: 14px;
    color: var(--tl-text-secondary);
    max-width: 56ch;
    line-height: 1.55;
    margin: 0;
  }

  .tl-stats {
    display: flex;
    gap: 32px;
    font-family: var(--tl-font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
  }
  .tl-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .tl-stat-value {
    font-size: 22px;
    font-weight: 500;
    color: var(--tl-text);
    line-height: 1;
  }
  .tl-stat-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--tl-text-whisper);
  }

  /* --- Filter rail --- */
  .tl-filters {
    max-width: 1440px;
    margin: 0 auto;
    padding: 32px 40px 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    border-top: 1px solid var(--tl-border);
  }

  .tl-filter {
    background: transparent;
    border: 1px solid var(--tl-border);
    color: var(--tl-text-secondary);
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
  }
  .tl-filter:hover { color: var(--tl-text); border-color: var(--tl-border-strong); }
  .tl-filter.is-active {
    background: var(--tl-accent);
    border-color: var(--tl-accent);
    color: #0a0a0a;
  }

  .tl-filter-count {
    font-family: var(--tl-font-mono);
    font-size: 10px;
    margin-left: 6px;
    opacity: 0.55;
  }
  .tl-filter.is-active .tl-filter-count { opacity: 0.72; }

  .tl-filter-sort {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--tl-font-mono);
    font-size: 11px;
    letter-spacing: 0.06em;
    color: var(--tl-text-muted);
  }
  .tl-filter-sort select {
    background: var(--tl-surface);
    color: var(--tl-text);
    border: 1px solid var(--tl-border);
    font: inherit;
    font-family: var(--tl-font-mono);
    font-size: 11px;
    padding: 6px 10px;
    border-radius: 2px;
    cursor: pointer;
  }

  /* --- Catalog column headers --- */
  .tl-column-rule {
    max-width: 1440px;
    margin: 28px auto 0;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 140px 80px 80px 90px;
    gap: 24px;
    align-items: end;
    font-family: var(--tl-font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--tl-text-whisper);
    padding-bottom: 12px;
    border-bottom: 1px solid var(--tl-border);
  }
  @media (max-width: 820px) { .tl-column-rule { display: none; } }

  /* --- Featured band --- */
  .tl-featured {
    max-width: 1440px;
    margin: 40px auto 0;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  @media (min-width: 880px) {
    .tl-featured { grid-template-columns: 1fr 1fr; gap: 28px; }
  }

  .tl-featured-card {
    position: relative;
    display: block;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    color: inherit;
    font: inherit;
  }

  .tl-featured-poster {
    position: relative;
    aspect-ratio: 16 / 10;
    border: 1px solid var(--tl-border);
    overflow: hidden;
    transition: border-color 220ms ease, transform 320ms ease;
  }
  .tl-featured-card:hover .tl-featured-poster {
    border-color: var(--tl-accent);
    transform: translateY(-2px);
  }

  .tl-featured-meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 14px;
    gap: 18px;
  }
  .tl-featured-title {
    font-family: var(--tl-font-serif);
    font-weight: 400;
    font-variation-settings: "opsz" 72;
    font-size: clamp(22px, 2.6vw, 32px);
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0;
    color: var(--tl-text);
  }
  .tl-featured-title-em { font-style: italic; color: var(--tl-accent); }
  .tl-featured-byline {
    font-family: var(--tl-font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    color: var(--tl-text-muted);
    margin-top: 6px;
  }
  .tl-featured-side {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
    font-family: var(--tl-font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    color: var(--tl-text-muted);
    white-space: nowrap;
  }

  .tl-featured-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    font-family: var(--tl-font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--tl-text);
    background: rgba(10,10,10,0.6);
    backdrop-filter: blur(6px);
    padding: 5px 9px;
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 2px;
    z-index: 3;
  }
  .tl-featured-tag--accent {
    background: var(--tl-accent);
    color: #0a0a0a;
    border-color: var(--tl-accent);
  }

  /* --- Section heading --- */
  .tl-section {
    max-width: 1440px;
    margin: 72px auto 0;
    padding: 0 40px;
  }
  .tl-section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--tl-border);
    margin-bottom: 32px;
  }
  .tl-section-title {
    font-family: var(--tl-font-serif);
    font-weight: 400;
    font-variation-settings: "opsz" 72;
    font-size: clamp(28px, 3vw, 38px);
    line-height: 1;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .tl-section-title-em {
    font-style: italic;
    color: var(--tl-accent);
  }
  .tl-section-count {
    font-family: var(--tl-font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--tl-text-whisper);
  }

  /* --- Standard grid --- */
  .tl-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px 28px;
  }
  @media (min-width: 560px) { .tl-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 960px) { .tl-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1280px){ .tl-grid { grid-template-columns: repeat(4, 1fr); } }

  .tl-card {
    display: block;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
    position: relative;
  }

  .tl-card-poster {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border: 1px solid var(--tl-border);
    transition: border-color 220ms ease, transform 320ms ease;
  }
  .tl-card:hover .tl-card-poster {
    border-color: var(--tl-accent);
    transform: translateY(-2px);
  }

  .tl-card-index {
    position: absolute;
    top: 10px;
    left: 10px;
    font-family: var(--tl-font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--tl-text);
    background: rgba(10,10,10,0.55);
    padding: 4px 8px;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 2px;
    z-index: 2;
    backdrop-filter: blur(6px);
  }

  .tl-card-duration {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-family: var(--tl-font-mono);
    font-size: 11px;
    color: var(--tl-text);
    background: rgba(10,10,10,0.6);
    padding: 4px 8px;
    border-radius: 2px;
    z-index: 2;
    backdrop-filter: blur(6px);
  }

  .tl-card-hover {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 18px;
    background: linear-gradient(
      0deg,
      rgba(10,10,10,0.78) 0%,
      rgba(10,10,10,0.35) 55%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 240ms ease;
    z-index: 2;
  }
  .tl-card:hover .tl-card-hover,
  .tl-card:focus-visible .tl-card-hover { opacity: 1; }
  .tl-card-hover-actions {
    display: flex;
    gap: 10px;
  }
  .tl-card-action {
    background: rgba(255,255,255,0.92);
    color: #0a0a0a;
    border: none;
    padding: 8px 14px;
    border-radius: 2px;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.005em;
    cursor: pointer;
  }
  .tl-card-action--primary {
    background: var(--tl-accent);
    color: #0a0a0a;
  }

  .tl-card-info {
    display: grid;
    grid-template-columns: 1fr 140px 80px 80px 90px;
    gap: 24px;
    align-items: baseline;
    padding: 14px 0 0;
    border-bottom: 1px solid var(--tl-border);
    padding-bottom: 14px;
    transition: border-color 220ms ease;
  }
  .tl-card:hover .tl-card-info { border-color: var(--tl-border-strong); }

  @media (max-width: 820px) {
    .tl-card-info {
      grid-template-columns: 1fr auto;
      gap: 8px 16px;
    }
    .tl-card-info > .tl-card-col--hide-mobile { display: none; }
  }

  .tl-card-col { display: flex; flex-direction: column; gap: 4px; min-width: 0; }

  .tl-card-title {
    font-family: var(--tl-font-serif);
    font-weight: 400;
    font-variation-settings: "opsz" 36;
    font-size: 18px;
    line-height: 1.15;
    letter-spacing: -0.015em;
    color: var(--tl-text);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tl-card-creator {
    font-family: var(--tl-font-mono);
    font-size: 11px;
    color: var(--tl-text-muted);
    letter-spacing: 0.04em;
  }
  .tl-card-cat, .tl-card-mono, .tl-card-rating {
    font-family: var(--tl-font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--tl-text-secondary);
  }
  .tl-card-rating-star { color: var(--tl-accent); margin-right: 4px; }

  /* --- Poster artwork --- */
  .tl-poster-art {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 520ms ease;
  }
  .tl-card:hover .tl-poster-art,
  .tl-featured-card:hover .tl-poster-art { transform: scale(1.04); }

  .tl-poster-art::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.07;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  /* Film-perforation overlay — decorative top/bottom sprocket holes. */
  .tl-poster-perf {
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    display: flex;
    pointer-events: none;
    z-index: 1;
  }
  .tl-poster-perf--top    { top: 0;    background: linear-gradient(to bottom, rgba(10,10,10,0.7), transparent); }
  .tl-poster-perf--bottom { bottom: 0; background: linear-gradient(to top, rgba(10,10,10,0.7), transparent); }
  .tl-poster-perf > span {
    flex: 1;
    margin: 3px 4px;
    background: rgba(255,255,255,0.42);
    border-radius: 1px;
    mix-blend-mode: overlay;
  }

  .tl-poster-caption {
    position: relative;
    z-index: 1;
    font-family: var(--tl-font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(34px, 5.5vw, 72px);
    line-height: 1;
    color: rgba(255,255,255,0.88);
    letter-spacing: -0.02em;
    text-align: center;
    padding: 0 20px;
    text-shadow: 0 2px 20px rgba(0,0,0,0.5);
    max-width: 90%;
  }
  .tl-poster-caption--sm {
    font-size: clamp(22px, 3.5vw, 36px);
  }

  /* --- Load more --- */
  .tl-footer-row {
    max-width: 1440px;
    margin: 48px auto 0;
    padding: 0 40px 96px;
    display: flex;
    justify-content: center;
  }
  .tl-load-more {
    background: transparent;
    border: 1px solid var(--tl-border-strong);
    color: var(--tl-text);
    padding: 14px 28px;
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.005em;
    cursor: pointer;
    border-radius: 2px;
    transition: background 180ms ease, border-color 180ms ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .tl-load-more:hover { background: var(--tl-surface); border-color: var(--tl-accent); }
  .tl-load-more-arrow {
    font-family: var(--tl-font-serif);
    font-style: italic;
    font-size: 16px;
  }

  /* --- Loading / empty states --- */
  .tl-state {
    max-width: 1440px;
    margin: 72px auto 0;
    padding: 64px 40px;
    text-align: center;
    border: 1px dashed var(--tl-border);
  }
  .tl-state-title {
    font-family: var(--tl-font-serif);
    font-style: italic;
    font-size: 28px;
    color: var(--tl-text);
    margin: 0 0 8px;
  }
  .tl-state-body {
    color: var(--tl-text-muted);
    font-size: 13px;
  }

  /* --- Mobile --- */
  @media (max-width: ${F}px) {
    .tl-topbar { padding: 14px 18px; flex-wrap: wrap; gap: 12px; }
    .tl-header { padding: 32px 18px 12px; }
    .tl-filters { padding: 20px 18px 8px; gap: 8px; }
    .tl-filter { padding: 7px 12px; font-size: 12px; }
    .tl-filter-sort { width: 100%; justify-content: flex-end; margin-top: 6px; }
    .tl-featured { padding: 0 18px; margin-top: 24px; gap: 28px; }
    .tl-section { padding: 0 18px; margin-top: 56px; }
    .tl-grid { gap: 36px 18px; }
    .tl-stats { gap: 20px; }
    .tl-footer-row { padding: 0 18px 72px; margin-top: 32px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tl-card-poster,
    .tl-featured-poster,
    .tl-poster-art,
    .tl-card-hover { transition: none; }
  }
`,k=({template:o,size:r="md"})=>{const{hue:n,accent:c}=o,m=`radial-gradient(ellipse at 30% 20%, hsl(${n} 70% 45% / 0.9), transparent 55%),
                    radial-gradient(ellipse at 75% 80%, hsl(${c} 80% 40% / 0.75), transparent 60%),
                    linear-gradient(135deg, hsl(${n} 40% 14%) 0%, hsl(${c} 35% 10%) 100%)`;return t.jsxs("div",{className:"tl-poster-art",style:{background:m},children:[t.jsx("div",{className:"tl-poster-perf tl-poster-perf--top","aria-hidden":"true",children:Array.from({length:14}).map((d,x)=>t.jsx("span",{},x))}),t.jsx("div",{className:"tl-poster-perf tl-poster-perf--bottom","aria-hidden":"true",children:Array.from({length:14}).map((d,x)=>t.jsx("span",{},x))}),t.jsx("span",{className:`tl-poster-caption ${r==="sm"?"tl-poster-caption--sm":""}`,children:o.name})]})},$=()=>t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 20 20",fill:"none","aria-hidden":"true",children:[t.jsx("circle",{cx:"9",cy:"9",r:"6",stroke:"currentColor",strokeWidth:"1.6"}),t.jsx("path",{d:"m14 14 4 4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),P=()=>{const o=T(),{templates:r,loading:n}=A(),[c,m]=i.useState(!1),[d,x]=i.useState("all"),[f,N]=i.useState(""),[p,z]=i.useState("downloads");i.useEffect(()=>{const e="tl-templates-styles";if(!document.getElementById(e)){const a=document.createElement("style");a.id=e,a.textContent=L,document.head.appendChild(a)}return m(!0),()=>{const a=document.getElementById(e);a&&a.remove()}},[]);const C=i.useMemo(()=>{const e={all:r.length};for(const a of v)a.id!=="all"&&(e[a.id]=0);for(const a of r)e[a.category]=(e[a.category]??0)+1;return e},[r]),g=i.useMemo(()=>{let e=r;if(d!=="all"&&(e=e.filter(l=>l.category===d)),f.trim()){const l=f.trim().toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(l)||s.creator.toLowerCase().includes(l))}const a=[...e];return p==="downloads"?a.sort((l,s)=>s.downloads-l.downloads):p==="rating"?a.sort((l,s)=>s.rating-l.rating):p==="newest"?a.sort((l,s)=>s.id.localeCompare(l.id)):p==="shortest"&&a.sort((l,s)=>l.duration_seconds-s.duration_seconds),a},[r,d,f,p]),y=i.useMemo(()=>r.filter(e=>e.featured).slice(0,2),[r]),w=i.useCallback(e=>{o(`/editor?template=${encodeURIComponent(e.id)}`)},[o]);if(!c)return null;const S=d==="all"&&!f.trim()&&y.length>0,E=r.reduce((e,a)=>e+a.downloads,0);return t.jsxs("div",{className:"tl-root",children:[t.jsxs("header",{className:"tl-topbar","aria-label":"Template library navigation",children:[t.jsxs("div",{className:"tl-topbar-left",children:[t.jsxs("button",{type:"button",className:"tl-back",onClick:()=>o("/dashboard"),children:[t.jsx("span",{className:"tl-back-arrow","aria-hidden":"true",children:"←"}),"Dashboard"]}),t.jsxs("span",{className:"tl-wordmark","aria-label":"ClipCut",children:["Clip",t.jsx("span",{className:"tl-wordmark-accent",children:"Cut"})]})]}),t.jsxs("div",{className:"tl-search",children:[t.jsx($,{}),t.jsx("input",{type:"search",placeholder:"Search titles or creators…",value:f,onChange:e=>N(e.target.value),"aria-label":"Search templates"})]})]}),t.jsxs("section",{className:"tl-header",children:[t.jsxs("div",{className:"tl-header-inner",children:[t.jsx("span",{className:"tl-overline",children:"The Catalog · № 01"}),t.jsxs("h1",{className:"tl-title",children:["Community ",t.jsx("span",{className:"tl-title-em",children:"templates"}),"."]}),t.jsx("p",{className:"tl-subtitle",children:"A growing archive of edits, intros, and motion pieces — contributed by creators from Gaborone, Francistown, Maun, and beyond. Fork any of them into your own project. Rate the ones you love."})]}),t.jsxs("div",{className:"tl-stats","aria-label":"Catalog statistics",children:[t.jsxs("div",{className:"tl-stat",children:[t.jsx("span",{className:"tl-stat-value",children:n?"—":r.length}),t.jsx("span",{className:"tl-stat-label",children:"Works"})]}),t.jsxs("div",{className:"tl-stat",children:[t.jsx("span",{className:"tl-stat-value",children:n?"—":h(E)}),t.jsx("span",{className:"tl-stat-label",children:"Forks"})]}),t.jsxs("div",{className:"tl-stat",children:[t.jsx("span",{className:"tl-stat-value",children:n?"—":new Set(r.map(e=>e.creator)).size}),t.jsx("span",{className:"tl-stat-label",children:"Creators"})]})]})]}),t.jsxs("nav",{className:"tl-filters","aria-label":"Filter by category",children:[v.map(e=>t.jsxs("button",{type:"button",className:`tl-filter ${d===e.id?"is-active":""}`,onClick:()=>x(e.id),"aria-pressed":d===e.id,children:[e.label,t.jsx("span",{className:"tl-filter-count",children:C[e.id]??0})]},e.id)),t.jsxs("div",{className:"tl-filter-sort",children:[t.jsx("span",{children:"Sort"}),t.jsxs("select",{value:p,onChange:e=>z(e.target.value),"aria-label":"Sort templates",children:[t.jsx("option",{value:"downloads",children:"Most forked"}),t.jsx("option",{value:"rating",children:"Highest rated"}),t.jsx("option",{value:"newest",children:"Newest"}),t.jsx("option",{value:"shortest",children:"Shortest duration"})]})]})]}),S&&t.jsx("section",{className:"tl-featured","aria-label":"Featured this week",children:y.map((e,a)=>t.jsxs("button",{type:"button",className:"tl-featured-card",onClick:()=>w(e),children:[t.jsxs("div",{className:"tl-featured-poster",children:[t.jsx("span",{className:`tl-featured-tag ${a===0?"tl-featured-tag--accent":""}`,children:a===0?"Editor's pick":"Featured"}),t.jsx(k,{template:e})]}),t.jsxs("div",{className:"tl-featured-meta",children:[t.jsxs("div",{children:[t.jsx("h2",{className:"tl-featured-title",children:e.name.split(" ").map((l,s,j)=>t.jsxs("span",{children:[s===j.length-1?t.jsx("span",{className:"tl-featured-title-em",children:l}):l,s<j.length-1?" ":""]},s))}),t.jsxs("div",{className:"tl-featured-byline",children:["By @",e.creator," · ",b(e.category)]})]}),t.jsxs("div",{className:"tl-featured-side",children:[t.jsx("span",{children:u(e.duration_seconds)}),t.jsxs("span",{children:["★ ",e.rating.toFixed(1)," · ",h(e.downloads)," forks"]})]})]})]},e.id))}),n?t.jsxs("div",{className:"tl-state",children:[t.jsx("p",{className:"tl-state-title",children:"Loading the archive…"}),t.jsx("p",{className:"tl-state-body",children:"Fetching community works from the catalog."})]}):g.length===0?t.jsxs("div",{className:"tl-state",children:[t.jsx("p",{className:"tl-state-title",children:"No works found."}),t.jsx("p",{className:"tl-state-body",children:"Try a different category, or be the first to contribute one — upload from the editor."})]}):t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"tl-column-rule","aria-hidden":"true",children:[t.jsx("span",{children:"Title"}),t.jsx("span",{children:"Creator"}),t.jsx("span",{children:"Category"}),t.jsx("span",{children:"Duration"}),t.jsx("span",{style:{textAlign:"right"},children:"Forks · Rating"})]}),t.jsxs("section",{className:"tl-section","aria-label":"All works",children:[t.jsxs("div",{className:"tl-section-head",children:[t.jsxs("h2",{className:"tl-section-title",children:["The ",t.jsx("span",{className:"tl-section-title-em",children:"archive"})]}),t.jsxs("span",{className:"tl-section-count",children:[g.length," ",g.length===1?"work":"works",d!=="all"?` · ${b(d)}`:""]})]}),t.jsx("div",{className:"tl-grid",children:g.map((e,a)=>t.jsxs("button",{type:"button",className:"tl-card",onClick:()=>w(e),"aria-label":`${e.name} by ${e.creator}`,children:[t.jsxs("div",{className:"tl-card-poster",children:[t.jsxs("span",{className:"tl-card-index",children:["№ ",String(a+1).padStart(2,"0")]}),t.jsx("span",{className:"tl-card-duration",children:u(e.duration_seconds)}),t.jsx(k,{template:e,size:"sm"}),t.jsx("div",{className:"tl-card-hover",children:t.jsxs("div",{className:"tl-card-hover-actions",children:[t.jsx("span",{className:"tl-card-action tl-card-action--primary",children:"Open in editor"}),t.jsx("span",{className:"tl-card-action",children:"Fork"})]})})]}),t.jsxs("div",{className:"tl-card-info",children:[t.jsx("div",{className:"tl-card-col",children:t.jsx("h3",{className:"tl-card-title",children:e.name})}),t.jsx("div",{className:"tl-card-col tl-card-col--hide-mobile",children:t.jsxs("span",{className:"tl-card-creator",children:["@",e.creator]})}),t.jsx("div",{className:"tl-card-col tl-card-col--hide-mobile",children:t.jsx("span",{className:"tl-card-cat",children:b(e.category)})}),t.jsx("div",{className:"tl-card-col tl-card-col--hide-mobile",children:t.jsx("span",{className:"tl-card-mono",children:u(e.duration_seconds)})}),t.jsx("div",{className:"tl-card-col",style:{textAlign:"right"},children:t.jsxs("span",{className:"tl-card-rating",children:[t.jsx("span",{className:"tl-card-rating-star","aria-hidden":"true",children:"★"}),e.rating.toFixed(1)," · ",h(e.downloads)]})})]})]},e.id))})]}),t.jsx("div",{className:"tl-footer-row",children:t.jsxs("button",{type:"button",className:"tl-load-more",children:["Load more works",t.jsx("span",{className:"tl-load-more-arrow","aria-hidden":"true",children:"→"})]})})]}),t.jsx(_,{})]})};export{P as default};
