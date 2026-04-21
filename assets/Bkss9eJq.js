import{u as me,r as i,j as e}from"./DwQPoapS.js";import{u as xe,l as y,g as Y,t as E,b as P}from"./DC1ghPj-.js";import{u as be}from"./D3gP8wkb.js";import{l as ge,a as he,m as ue,u as H,d as fe,b as ve,s as ye}from"./CgjRGNC3.js";import{h as je}from"./Et-wlZO3.js";import"./DZxFKcQQ.js";import"./B9CjrYEi.js";const J="clipcut-dashboard-advisor-dismissed",we=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&display=swap');

  :root {
    --cc-bg: #0a0a0a;
    --cc-bg-alt: #0d1117;
    --cc-felt: #0b0f16;
    --cc-surface: #11161f;
    --cc-surface-raised: #141a24;
    --cc-card: #10151d;
    --cc-border: rgba(255,255,255,0.06);
    --cc-border-strong: rgba(255,255,255,0.14);
    --cc-hairline: rgba(255,255,255,0.08);
    --cc-accent: #75AADB;
    --cc-accent-hover: #8bbae3;
    --cc-accent-soft: rgba(117,170,219,0.1);
    --cc-accent-glow: rgba(117,170,219,0.06);
    --cc-danger: #ef4444;
    --cc-danger-soft: rgba(239,68,68,0.1);
    --cc-warn: #f5b84e;
    --cc-success: #6ec07a;
    --cc-text: #ffffff;
    --cc-text-secondary: rgba(255,255,255,0.72);
    --cc-text-muted: rgba(255,255,255,0.44);
    --cc-text-whisper: rgba(255,255,255,0.24);
    --cc-font: 'Spline Sans', sans-serif;
    --cc-font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    --cc-font-serif: 'Fraunces', Georgia, serif;
  }

  *, *::before, *::after { box-sizing: border-box; }

  .dash-root {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    background: var(--cc-bg);
    font-family: var(--cc-font);
    display: flex;
    overflow: hidden;
    color: var(--cc-text);
    position: relative;
  }

  /* Grain overlay — film-studio atmosphere. */
  .dash-root::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  /* ---- Sidebar ---- */
  .sidebar {
    width: 216px;
    min-width: 216px;
    background: var(--cc-felt);
    border-right: 1px solid var(--cc-border);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 5;
  }

  .sidebar-logo {
    padding: 22px 22px 18px;
    display: flex;
    align-items: baseline;
    gap: 10px;
    border-bottom: 1px solid var(--cc-border);
  }
  .sidebar-logo-monogram {
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: 28px;
    line-height: 1;
    color: var(--cc-accent);
    font-variation-settings: "opsz" 144;
  }
  .sidebar-logo-mark {
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: var(--cc-text);
  }
  .sidebar-logo-version {
    margin-left: auto;
    font-family: var(--cc-font-mono);
    font-size: 10px;
    color: var(--cc-text-whisper);
    letter-spacing: 0.04em;
  }

  .sidebar-user {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--cc-border);
  }
  .sidebar-avatar {
    width: 34px;
    height: 34px;
    border-radius: 3px;
    background: linear-gradient(135deg, var(--cc-accent) 0%, #4a7fb5 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 13px;
    font-weight: 700;
    color: #0a0a0a;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15);
  }

  .sidebar-user-meta {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .sidebar-user-name {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.005em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--cc-text);
  }
  .sidebar-user-plan {
    font-family: var(--cc-font-mono);
    font-size: 10px;
    letter-spacing: 0.06em;
    color: var(--cc-text-muted);
    text-transform: uppercase;
  }

  .sidebar-section-label {
    font-family: var(--cc-font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    color: var(--cc-text-whisper);
    text-transform: uppercase;
    padding: 18px 22px 10px;
  }

  .sidebar-nav { flex: 1; padding: 0 12px; display: flex; flex-direction: column; gap: 1px; }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: var(--cc-text-muted);
    transition: color 140ms ease, background 140ms ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    min-height: 36px;
    font-family: inherit;
    position: relative;
  }
  .nav-item:hover { background: rgba(255,255,255,0.03); color: var(--cc-text-secondary); }
  .nav-item.active {
    color: var(--cc-text);
    background: rgba(117,170,219,0.08);
    font-weight: 600;
  }
  .nav-item.active::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: var(--cc-accent);
  }
  .nav-item .material-symbols-outlined { font-size: 18px; }

  .nav-divider {
    height: 1px;
    background: var(--cc-border);
    margin: 10px 12px;
  }

  .sidebar-logout {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 10px;
    margin: 6px 12px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: var(--cc-text-muted);
    border: none;
    background: none;
    text-align: left;
    min-height: 36px;
    transition: color 140ms ease, background 140ms ease;
    font-family: inherit;
  }
  .sidebar-logout:hover { background: rgba(239,68,68,0.08); color: var(--cc-danger); }
  .sidebar-logout .material-symbols-outlined { font-size: 18px; }

  .sidebar-footer {
    padding: 14px 22px 18px;
    border-top: 1px solid var(--cc-border);
    font-family: var(--cc-font-mono);
    font-size: 10px;
    letter-spacing: 0.04em;
    color: var(--cc-text-whisper);
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  /* ---- Content wrapper ---- */
  .dash-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
    position: relative;
    z-index: 1;
    background: var(--cc-bg);
  }

  /* Linen / felt pattern — layered horizontal pinstripes behind content.
     Subliminal only; provides the "workbench" feel without being obvious. */
  .dash-content::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent 0,
        transparent 39px,
        rgba(255,255,255,0.015) 39px,
        rgba(255,255,255,0.015) 40px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0,
        transparent 39px,
        rgba(255,255,255,0.008) 39px,
        rgba(255,255,255,0.008) 40px
      );
  }

  .dash-content > * { position: relative; z-index: 1; }

  /* ---- Top ribbon ---- */
  .dash-ribbon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 36px 20px;
    border-bottom: 1px solid var(--cc-border);
    background: rgba(10,10,10,0.6);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .dash-ribbon-left { display: flex; align-items: center; gap: 16px; min-width: 0; }
  .dash-ribbon-block { min-width: 0; }

  .dash-greeting {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
    color: var(--cc-text);
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
  }
  .dash-greeting-name {
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-weight: 400;
    color: var(--cc-accent);
    font-variation-settings: "opsz" 72;
  }

  .dash-ribbon-sub {
    font-family: var(--cc-font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--cc-text-muted);
    margin: 4px 0 0;
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
  }
  .dash-ribbon-sub > span { display: inline-flex; align-items: center; gap: 6px; }
  .dash-ribbon-sub .dot {
    width: 4px;
    height: 4px;
    background: var(--cc-text-whisper);
    border-radius: 50%;
  }

  .dash-ribbon-actions { display: flex; align-items: center; gap: 6px; }

  .ribbon-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 2px;
    background: transparent;
    border: 1px solid var(--cc-border);
    color: var(--cc-text-secondary);
    font-family: var(--cc-font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    cursor: default;
  }
  .ribbon-pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cc-success);
    box-shadow: 0 0 6px rgba(110, 192, 122, 0.5);
  }

  .icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 3px;
    border: 1px solid var(--cc-border);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 140ms ease, background 140ms ease, border-color 140ms ease;
    color: var(--cc-text-muted);
  }
  .icon-btn:hover {
    background: var(--cc-surface);
    color: var(--cc-text);
    border-color: var(--cc-border-strong);
  }

  /* ---- Scrollable body ---- */
  .dash-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 28px 36px 48px;
    scrollbar-width: thin;
    scrollbar-color: #1e293b transparent;
  }
  .dash-body::-webkit-scrollbar { width: 8px; }
  .dash-body::-webkit-scrollbar-thumb { background: var(--cc-surface); border-radius: 4px; }
  .dash-body::-webkit-scrollbar-thumb:hover { background: var(--cc-border-strong); }

  /* ---- Two-column layout ---- */
  .dash-layout {
    display: grid;
    grid-template-columns: 1fr 288px;
    gap: 48px;
    align-items: start;
    max-width: 1440px;
    margin: 0 auto;
  }
  .dash-layout--single { grid-template-columns: 1fr; }
  .dash-main { min-width: 0; }

  /* ---- Stats rail (horizontal tape) ---- */
  .stats-rail {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    margin-bottom: 32px;
    border: 1px solid var(--cc-border);
    border-radius: 3px;
    overflow: hidden;
    background: var(--cc-surface);
  }
  .stat-cell {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-right: 1px solid var(--cc-border);
  }
  .stat-cell:last-child { border-right: none; }

  .stat-label {
    font-family: var(--cc-font-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cc-text-whisper);
  }
  .stat-value {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--cc-text);
    line-height: 1.1;
  }
  .stat-value-mono {
    font-family: var(--cc-font-mono);
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  /* ---- Section heading ---- */
  .section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--cc-border);
    gap: 16px;
    flex-wrap: wrap;
  }
  .section-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.005em;
    margin: 0;
    color: var(--cc-text);
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
  }
  .section-title-mono {
    font-family: var(--cc-font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: var(--cc-text-whisper);
    text-transform: uppercase;
  }
  .section-title-count {
    font-family: var(--cc-font-mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--cc-text-whisper);
    letter-spacing: 0.06em;
  }

  /* ---- Toolbelt (quick actions as a row of tool tiles) ---- */
  .toolbelt {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 36px;
  }
  @media (min-width: 640px) { .toolbelt { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .toolbelt { grid-template-columns: repeat(3, 1fr); } }

  .tool {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid var(--cc-border);
    background: var(--cc-card);
    color: var(--cc-text-secondary);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
    position: relative;
    overflow: hidden;
  }
  .tool:hover {
    transform: translateY(-2px);
    border-color: var(--cc-border-strong);
    background: var(--cc-surface);
    color: var(--cc-text);
  }
  .tool--primary {
    background: linear-gradient(135deg, rgba(117,170,219,0.14), rgba(117,170,219,0.04));
    border-color: rgba(117,170,219,0.3);
    color: var(--cc-text);
  }
  .tool--primary:hover {
    background: linear-gradient(135deg, rgba(117,170,219,0.2), rgba(117,170,219,0.08));
    border-color: var(--cc-accent);
    box-shadow: 0 12px 36px rgba(117,170,219,0.12);
  }
  .tool-icon {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    background: rgba(117,170,219,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .tool--primary .tool-icon {
    background: var(--cc-accent);
    color: #0a0a0a;
  }
  .tool-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .tool-title { font-size: 13px; font-weight: 600; letter-spacing: -0.005em; color: inherit; }
  .tool-subtitle { font-size: 11px; color: var(--cc-text-muted); line-height: 1.4; }
  .tool--primary .tool-subtitle { color: rgba(255,255,255,0.65); }

  /* ---- Projects header / search ---- */
  .proj-search {
    position: relative;
    width: 240px;
  }
  .proj-search input {
    width: 100%;
    background: var(--cc-surface);
    border: 1px solid var(--cc-border);
    border-radius: 3px;
    padding: 8px 12px 8px 32px;
    color: var(--cc-text);
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 180ms ease, background 180ms ease;
  }
  .proj-search input::placeholder { color: var(--cc-text-whisper); }
  .proj-search input:focus {
    border-color: var(--cc-accent);
    background: var(--cc-surface-raised);
  }
  .proj-search .material-symbols-outlined {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: var(--cc-text-whisper);
    pointer-events: none;
  }

  /* ---- Projects grid (index cards) ---- */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(228px, 1fr));
    gap: 20px;
  }

  .project-card {
    cursor: pointer;
    transition: transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1);
    border-radius: 3px;
    position: relative;
  }
  .project-card:hover { transform: translateY(-3px); }
  .project-card:hover .del-btn { opacity: 1 !important; }

  .project-thumb {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 3px;
    overflow: hidden;
    background: var(--cc-card);
    border: 1px solid var(--cc-border);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 220ms ease, box-shadow 220ms ease;
    position: relative;
  }
  .project-card:hover .project-thumb {
    border-color: var(--cc-accent);
    box-shadow:
      0 12px 32px rgba(0,0,0,0.45),
      0 0 0 3px rgba(117,170,219,0.08);
  }

  /* Index-card pinhole in top-left corner */
  .project-thumb::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(0,0,0,0.55);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
    z-index: 3;
  }

  .project-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-thumb-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #111820, #0d1319);
  }

  /* Dashed tear-off stripe at the top of the card info, like a note pad */
  .project-info {
    padding: 10px 2px 0;
    position: relative;
  }
  .project-info::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 6px;
    right: 6px;
    height: 1px;
    background-image: repeating-linear-gradient(
      to right,
      var(--cc-hairline) 0,
      var(--cc-hairline) 4px,
      transparent 4px,
      transparent 8px
    );
  }
  .project-info .name {
    font-family: var(--cc-font-serif);
    font-weight: 400;
    font-optical-sizing: auto;
    font-variation-settings: "opsz" 36;
    font-size: 16px;
    letter-spacing: -0.01em;
    margin: 6px 0 4px;
    color: var(--cc-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }
  .project-info .meta {
    font-family: var(--cc-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.04em;
    color: var(--cc-text-muted);
    margin: 0;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .project-info .meta .sep {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--cc-text-whisper);
  }
  .project-info .meta .res {
    color: var(--cc-accent);
    font-weight: 500;
  }

  .del-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    border-radius: 3px;
    background: rgba(239,68,68,0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 180ms ease;
    z-index: 3;
  }
  .del-btn:hover { background: #ef4444; }

  .project-rename-input {
    background: var(--cc-accent-soft);
    border: 1px solid var(--cc-accent);
    border-radius: 3px;
    padding: 4px 8px;
    color: var(--cc-text);
    font-size: 14px;
    font-weight: 500;
    font-family: var(--cc-font-serif);
    width: 100%;
    outline: none;
    margin: 6px 0 4px;
  }

  .project-rename-row {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  /* ---- Context menu ---- */
  .ctx-menu {
    position: fixed;
    z-index: 5000;
    background: var(--cc-surface);
    border: 1px solid var(--cc-border-strong);
    border-radius: 3px;
    padding: 4px 0;
    min-width: 180px;
    box-shadow: 0 14px 40px rgba(0,0,0,0.6);
  }
  .ctx-menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    font-size: 12px;
    color: var(--cc-text-secondary);
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    font-family: inherit;
    text-align: left;
  }
  .ctx-menu-item:hover { background: var(--cc-accent-soft); color: var(--cc-text); }
  .ctx-menu-item--danger { color: var(--cc-danger); }
  .ctx-menu-item--danger:hover { background: var(--cc-danger-soft); color: var(--cc-danger); }
  .ctx-menu-sep { height: 1px; background: var(--cc-border); margin: 4px 0; }

  /* ---- Empty state ---- */
  .empty-state {
    padding: 56px 28px;
    border-radius: 3px;
    background: var(--cc-card);
    border: 1px dashed var(--cc-border-strong);
    text-align: center;
    position: relative;
  }
  .empty-state::before {
    content: '§';
    position: absolute;
    top: 18px;
    left: 22px;
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-size: 28px;
    color: var(--cc-accent);
    opacity: 0.6;
  }
  .empty-icon {
    width: 58px;
    height: 58px;
    border-radius: 3px;
    margin: 0 auto 18px;
    background: var(--cc-accent-soft);
    border: 1px solid rgba(117,170,219,0.22);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .empty-state h3 {
    font-family: var(--cc-font-serif);
    font-weight: 400;
    font-size: 26px;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
    color: var(--cc-text);
  }
  .empty-state h3 .em {
    font-style: italic;
    color: var(--cc-accent);
  }
  .empty-state p {
    font-size: 13px;
    color: var(--cc-text-muted);
    margin: 0 auto 20px;
    line-height: 1.6;
    max-width: 360px;
  }
  .empty-actions { display: flex; gap: 10px; justify-content: center; }
  .empty-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, box-shadow 220ms ease;
    border: 1px solid transparent;
    letter-spacing: -0.005em;
  }
  .empty-btn--primary { background: var(--cc-accent); color: #0a0a0a; }
  .empty-btn--primary:hover {
    background: var(--cc-accent-hover);
    box-shadow: 0 8px 24px rgba(117,170,219,0.22);
  }
  .empty-btn--ghost {
    background: transparent;
    color: var(--cc-text-secondary);
    border-color: var(--cc-border-strong);
  }
  .empty-btn--ghost:hover {
    background: var(--cc-surface);
    color: var(--cc-text);
  }
  .empty-hint {
    margin-top: 20px !important;
    font-family: var(--cc-font-mono);
    font-size: 10.5px !important;
    color: var(--cc-text-whisper) !important;
    letter-spacing: 0.04em;
    line-height: 1.5;
  }

  /* ---- Advisor rail (vertical timeline) ---- */
  .advisor-rail {
    position: sticky;
    top: 0;
    padding: 4px 0;
    position: relative;
  }

  .advisor-rail-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--cc-border);
    margin-bottom: 22px;
  }
  .advisor-rail-title {
    font-family: var(--cc-font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: var(--cc-text-whisper);
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .advisor-rail-title::before {
    content: '';
    width: 20px;
    height: 1px;
    background: var(--cc-text-whisper);
    display: inline-block;
  }
  .advisor-dismiss {
    width: 26px;
    height: 26px;
    border-radius: 3px;
    border: 1px solid var(--cc-border);
    background: transparent;
    color: var(--cc-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
  }
  .advisor-dismiss:hover {
    background: var(--cc-surface);
    color: var(--cc-text);
    border-color: var(--cc-border-strong);
  }

  /* Vertical spine connecting the timeline entries */
  .advisor-timeline {
    position: relative;
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .advisor-timeline::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: repeating-linear-gradient(
      to bottom,
      var(--cc-border) 0,
      var(--cc-border) 4px,
      transparent 4px,
      transparent 8px
    );
  }

  .advisor-entry {
    position: relative;
    padding-left: 6px;
  }
  .advisor-entry::before {
    content: '';
    position: absolute;
    left: -22px;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--cc-bg);
    border: 1.5px solid var(--cc-text-whisper);
    box-sizing: border-box;
  }
  .advisor-entry--warning::before { border-color: var(--cc-warn); }
  .advisor-entry--info::before    { border-color: var(--cc-accent); }
  .advisor-entry--success::before { border-color: var(--cc-success); background: var(--cc-success); }

  .advisor-entry-time {
    font-family: var(--cc-font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--cc-text-whisper);
    margin-bottom: 6px;
    display: block;
  }

  .advisor-entry-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.005em;
    margin: 0 0 6px;
    color: var(--cc-text);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .advisor-entry-body {
    font-size: 12px;
    color: var(--cc-text-muted);
    line-height: 1.55;
    margin: 0;
  }

  .advisor-entry-action {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    margin-top: 10px;
    border-radius: 2px;
    font-size: 11px;
    font-family: var(--cc-font-mono);
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    border: 1px solid transparent;
    transition: background 160ms ease;
  }
  .advisor-entry-action--warning {
    background: rgba(245, 184, 78, 0.1);
    color: var(--cc-warn);
    border-color: rgba(245, 184, 78, 0.22);
  }
  .advisor-entry-action--warning:hover { background: rgba(245, 184, 78, 0.18); }
  .advisor-entry-action--info {
    background: var(--cc-accent-soft);
    color: var(--cc-accent);
    border-color: rgba(117,170,219,0.22);
  }
  .advisor-entry-action--info:hover { background: rgba(117,170,219,0.18); }

  .advisor-checklist {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .advisor-checklist li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--cc-text-muted);
  }
  .advisor-checklist li.done { color: rgba(110, 192, 122, 0.78); text-decoration: line-through; text-decoration-color: rgba(110, 192, 122, 0.3); }
  .advisor-checklist li.done .material-symbols-outlined { color: var(--cc-success); }
  .advisor-checklist li .material-symbols-outlined { font-size: 14px; }

  /* ---- Error banner ---- */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 3px;
    margin-bottom: 20px;
    background: rgba(239, 68, 68, 0.06);
    border: 1px solid rgba(239, 68, 68, 0.18);
    border-left: 3px solid var(--cc-danger);
  }
  .error-banner > span { flex: 1; font-size: 12px; color: var(--cc-text-secondary); }
  .error-retry {
    background: var(--cc-accent-soft);
    border: 1px solid rgba(117,170,219,0.25);
    border-radius: 2px;
    padding: 6px 14px;
    color: var(--cc-accent);
    font-size: 11px;
    font-weight: 600;
    font-family: var(--cc-font-mono);
    letter-spacing: 0.04em;
    cursor: pointer;
  }
  .error-retry:hover { background: rgba(117,170,219,0.18); }

  /* ---- Skeleton ---- */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skel {
    background: linear-gradient(90deg, #111820 25%, #1a2332 50%, #111820 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s ease-in-out infinite;
  }

  /* ---- Bottom Botswana stripe ---- */
  .bw-stripe {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    display: flex;
    z-index: 50;
  }
  .bw-stripe div { flex: 1; }

  /* ---- Mobile ---- */
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 499;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .sidebar-overlay.visible { opacity: 1; pointer-events: auto; }

  .mobile-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 58px;
    background: var(--cc-felt);
    border-top: 1px solid var(--cc-border);
    display: none;
    align-items: center;
    justify-content: space-around;
    z-index: 400;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .mobile-bottom-nav button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    background: none;
    border: none;
    color: var(--cc-text-muted);
    font-size: 10px;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 16px;
    min-height: 44px;
    min-width: 44px;
    transition: color 0.15s ease;
  }
  .mobile-bottom-nav button.active { color: var(--cc-accent); }
  .mobile-bottom-nav button .material-symbols-outlined { font-size: 22px; }

  .hamburger-btn {
    width: 38px;
    height: 38px;
    border-radius: 3px;
    border: 1px solid var(--cc-border);
    background: transparent;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--cc-text-secondary);
    margin-right: 12px;
    flex-shrink: 0;
  }

  .sidebar-close-btn {
    position: absolute;
    top: 16px;
    right: 12px;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid var(--cc-border);
    background: transparent;
    color: var(--cc-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 767px) {
    .sidebar {
      position: fixed;
      left: -260px;
      top: 0;
      bottom: 0;
      z-index: 500;
      width: 240px;
      min-width: 240px;
      transition: left 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .sidebar.sidebar-open { left: 0; }
    .hamburger-btn { display: flex; }
    .mobile-bottom-nav { display: flex; }
    .dash-layout { grid-template-columns: 1fr; gap: 28px; }
    .advisor-rail { display: none; }
    .stats-rail { grid-template-columns: 1fr 1fr; }
    .stat-cell:nth-child(2n) { border-right: none; }
    .stat-cell:nth-child(-n+2) { border-bottom: 1px solid var(--cc-border); }
    .toolbelt { grid-template-columns: 1fr; }
    .dash-ribbon { padding: 16px 18px; }
    .dash-greeting { font-size: 16px; gap: 8px; }
    .dash-body { padding: 20px 18px 90px; }
    .projects-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
    .proj-search { width: 100%; }
    .section-head { flex-direction: column; align-items: stretch; gap: 10px; }
    .empty-state { padding: 40px 18px; }
    .bw-stripe { bottom: 58px; }
  }

  @media (max-width: 400px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .stats-rail { grid-template-columns: 1fr; }
    .stat-cell { border-right: none !important; border-bottom: 1px solid var(--cc-border); }
    .stat-cell:last-child { border-bottom: none; }
    .dash-greeting { font-size: 15px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-card, .tool, .skel { transition: none; animation: none; }
  }
`,o=({i:r,s:n=20,c:x,fill:p=!1,style:b})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:n,color:x,fontVariationSettings:p?"'FILL' 1":"'FILL' 0",...b},children:r}),ke=[{id:"home",icon:"home",label:"Home",fill:!0,route:null},{id:"templates",icon:"collections",label:"Templates",fill:!1,route:"/templates"},{id:"divider"},{id:"settings",icon:"settings",label:"Settings",fill:!1,route:"/settings"}];function B(r){if(!r)return"Never";const n=Date.now()-new Date(r).getTime(),x=Math.floor(n/6e4);if(x<1)return"Just now";if(x<60)return`${x}m ago`;const p=Math.floor(x/60);if(p<24)return`${p}h ago`;const b=Math.floor(p/24);return b<7?`${b}d ago`:b<30?`${Math.floor(b/7)}w ago`:new Date(r).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function Ne(r){return r?`${new Date(r).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1})} · ${B(r)}`:"Never"}function Ce(){const r=new Date().getHours();return r<12?"Good morning":r<18?"Good afternoon":"Good evening"}function ze(r){return r?new Date(r).toLocaleDateString("en-US",{month:"short",year:"numeric"}):"—"}function Se(){return new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase()}const Q=i.memo(({user:r,activeNav:n,onNav:x,onNavigate:p,onLogout:b,isOpen:w,onClose:h})=>{const v=r?.user_metadata?.full_name||r?.email?.split("@")[0]||"Creator",k=v.charAt(0).toUpperCase();return e.jsxs("aside",{className:`sidebar ${w?"sidebar-open":""}`,children:[h&&e.jsx("button",{className:"sidebar-close-btn",onClick:h,"aria-label":"Close menu",children:e.jsx(o,{i:"close",s:18})}),e.jsxs("div",{className:"sidebar-logo",children:[e.jsx("span",{className:"sidebar-logo-monogram","aria-hidden":"true",children:"CC"}),e.jsx("span",{className:"sidebar-logo-mark",children:"ClipCut"}),e.jsx("span",{className:"sidebar-logo-version",children:"v0.1"})]}),e.jsxs("div",{className:"sidebar-user",children:[e.jsx("div",{className:"sidebar-avatar",children:k}),e.jsxs("div",{className:"sidebar-user-meta",children:[e.jsx("p",{className:"sidebar-user-name",children:v}),e.jsx("span",{className:"sidebar-user-plan",children:"Free · Open Source"})]})]}),e.jsx("div",{className:"sidebar-section-label",children:"Workspace"}),e.jsx("nav",{className:"sidebar-nav",children:ke.map(d=>d.id==="divider"?e.jsx("div",{className:"nav-divider"},"div"):e.jsxs("button",{className:`nav-item ${n===d.id?"active":""}`,onClick:()=>{x(d.id),d.route&&p(d.route)},children:[e.jsx(o,{i:d.icon,s:18,fill:d.fill&&n===d.id}),e.jsx("span",{style:{flex:1},children:d.label})]},d.id))}),e.jsxs("button",{className:"sidebar-logout",onClick:b,children:[e.jsx(o,{i:"logout",s:18}),e.jsx("span",{style:{flex:1},children:"Log out"})]}),e.jsxs("div",{className:"sidebar-footer",children:[e.jsx("span",{children:"v0.1.0 · BETA"}),e.jsx("span",{children:"GBE"})]})]})});Q.displayName="Sidebar";const Te=()=>{const r=me(),{user:n,signOut:x}=xe(),p=be(),b=i.useRef(null),w=i.useRef(!1),[h,v]=i.useState("home"),[k,d]=i.useState(!1),[R,q]=i.useState(""),[l,N]=i.useState([]),[u,$]=i.useState(!0),[C,F]=i.useState(null),[K,z]=i.useState(null),[_,I]=i.useState(""),[X,Z]=i.useState(new Set),[O,ee]=i.useState(()=>{try{return typeof window<"u"&&localStorage.getItem(J)==="1"}catch{return!1}}),te=i.useCallback(()=>{try{localStorage.setItem(J,"1")}catch{}ee(!0)},[]),ae=n?.user_metadata?.full_name||n?.email?.split("@")[0]||"Creator",G=i.useMemo(()=>l.length===0?null:[...l].sort((a,c)=>new Date(c.savedAt||0)-new Date(a.savedAt||0))[0]?.savedAt,[l]),U=i.useCallback(t=>{if(t.name&&t.name!=="Untitled Project")return t.name;const c=(t.project_data?.clips||[]).find(m=>m.type==="video"&&m.name);return c?.name&&c.name.replace(/\.[^.]+$/,"").trim()||t.name},[]),g=i.useCallback(async()=>{$(!0),F(null);try{const t=await ge(n?.id);let a=[];try{const s=he(),j=new Set(t.map(T=>T.id));a=s.filter(T=>!j.has(T.id))}catch{}const c=[...t,...a];n?.id&&a.length>0&&!w.current&&(w.current=!0,ue(n.id).then(s=>{s>0&&(y.info(`Migrated ${s} local project(s) to cloud`),g())}).catch(s=>y.warn("Local project migration failed",{error:s})));const m=[];for(const s of c){const j=U(s);j!==s.name&&(s.name=j,s._source!=="localStorage"&&m.push(H(s.id,n?.id,{name:j}).catch(()=>{})))}m.length>0&&Promise.all(m);const pe=c.map(s=>({id:s.id,name:s.name,thumbnail:s.thumbnail_url||s.project_data?.thumbnailDataUrl||null,duration:s.duration_seconds>0?`${Math.floor(s.duration_seconds/60)}:${String(Math.floor(s.duration_seconds%60)).padStart(2,"0")}`:"0:00",resolution:s.resolution||"1080p",savedAt:s.updated_at||s.created_at,isCloud:!s._source||s._source!=="localStorage"}));N(pe)}catch(t){y.error("Failed to load projects",{error:t}),F(Y(t,"project")),N([])}finally{$(!1)}},[n?.id,U]);i.useEffect(()=>{g();let t=Date.now();const a=()=>{Date.now()-t<3e4||(t=Date.now(),g())};window.addEventListener("focus",a);const c=()=>{t=Date.now(),g()};return window.addEventListener("storage",c),()=>{window.removeEventListener("focus",a),window.removeEventListener("storage",c)}},[g]);const A=i.useCallback(()=>{E(P.dashboardNewProjectClick),b.current?.click()},[]),re=i.useCallback(t=>{const a=Array.from(t.target.files);a.length>0&&(E(P.dashboardFileImport,{fileCount:a.length}),r("/editor",{state:{filesToImport:a}})),t.target.value=""},[r]),oe=i.useCallback(t=>{E(P.dashboardProjectOpen,{projectId:t.id}),r("/editor",{state:{projectId:t.id,projectName:t.name}})},[r]),V=i.useCallback(async(t,a)=>{if(t.stopPropagation(),window.confirm("Are you sure you want to delete this project?"))try{await fe(a,n?.id);try{localStorage.removeItem(`clipcut_project_${a}`),localStorage.removeItem(`clipcut_autosave_${a}`),localStorage.removeItem(`clipcut_migrated_${a}`)}catch{}E(P.dashboardProjectDelete,{projectId:a}),N(c=>c.filter(m=>m.id!==a))}catch(c){y.error("Failed to delete project",{error:c,projectId:a}),alert(Y(c,"project"))}},[n?.id]),L=i.useCallback((t,a)=>{t.stopPropagation(),z(a.id),I(a.name)},[]),W=i.useCallback(async t=>{const a=_.trim();if(!a||a===l.find(c=>c.id===t)?.name){z(null);return}try{await H(t,n?.id,{name:a}),N(c=>c.map(m=>m.id===t?{...m,name:a}:m))}catch(c){y.error("Failed to rename project",{error:c})}z(null)},[_,l,n?.id]),[f,M]=i.useState(null),ie=i.useCallback((t,a)=>{t.preventDefault(),t.stopPropagation(),M({x:t.clientX,y:t.clientY,project:a})},[]),S=i.useCallback(()=>M(null),[]);i.useEffect(()=>{if(!f)return;const t=()=>M(null);return window.addEventListener("click",t),window.addEventListener("contextmenu",t),()=>{window.removeEventListener("click",t),window.removeEventListener("contextmenu",t)}},[f]);const se=i.useCallback(async t=>{S();try{const a=await ve(t.id,n?.id);if(!a)return;await ye(n?.id,{name:`${t.name} (copy)`,clips:a.project_data?.clips||[],duration:a.duration_seconds||0,resolution:a.resolution||"1080p"})&&g()}catch(a){y.error("Failed to duplicate project",{error:a})}},[n?.id,S,g]),ne=je(R),D=l.filter(t=>t.name.toLowerCase().includes(ne.toLowerCase())),ce=!u&&D.length>0,le=!u&&!C&&D.length===0,de=Se();return e.jsxs("div",{className:"dash-root",children:[e.jsx("style",{children:we}),e.jsx("input",{ref:b,type:"file",accept:"video/*,audio/*,image/*",multiple:!0,style:{display:"none"},onChange:re}),e.jsx("div",{className:`sidebar-overlay ${k?"visible":""}`,onClick:()=>d(!1)}),e.jsx(Q,{user:n,activeNav:h,onNav:t=>{v(t),p&&d(!1)},onNavigate:r,onLogout:async()=>{await x(),r("/login")},isOpen:k,onClose:p?()=>d(!1):void 0}),e.jsxs("div",{className:"dash-content",children:[e.jsxs("header",{className:"dash-ribbon",children:[e.jsxs("div",{className:"dash-ribbon-left",children:[e.jsx("button",{className:"hamburger-btn",onClick:()=>d(t=>!t),"aria-label":"Open menu",children:e.jsx(o,{i:"menu",s:20})}),e.jsxs("div",{className:"dash-ribbon-block",children:[e.jsxs("h1",{className:"dash-greeting",children:[Ce(),",",e.jsxs("span",{className:"dash-greeting-name",children:[ae,"."]})]}),e.jsxs("p",{className:"dash-ribbon-sub",children:[e.jsx("span",{children:de}),e.jsx("span",{className:"dot"}),e.jsx("span",{children:"Workspace"}),e.jsx("span",{className:"dot"}),e.jsx("span",{children:u?"Syncing…":`${l.length} project${l.length!==1?"s":""}`})]})]})]}),e.jsxs("div",{className:"dash-ribbon-actions",children:[!p&&e.jsxs("span",{className:"ribbon-pill",title:"Cloud sync status",children:[e.jsx("span",{className:"ribbon-pill-dot","aria-hidden":"true"}),"Cloud · Live"]}),e.jsx("button",{className:"icon-btn",onClick:g,title:"Refresh projects","aria-label":"Refresh",children:e.jsx(o,{i:"refresh",s:18})}),e.jsx("button",{className:"icon-btn",onClick:()=>r("/settings"),title:"Settings","aria-label":"Settings",children:e.jsx(o,{i:"settings",s:18})})]})]}),e.jsx("div",{className:"dash-body",children:e.jsxs("div",{className:`dash-layout ${!p&&O?"dash-layout--single":""}`,children:[e.jsxs("div",{className:"dash-main",children:[e.jsxs("div",{className:"stats-rail","aria-label":"Workspace statistics",children:[e.jsxs("div",{className:"stat-cell",children:[e.jsx("span",{className:"stat-label",children:"Projects"}),e.jsx("span",{className:"stat-value stat-value-mono",children:u?"—":String(l.length).padStart(2,"0")})]}),e.jsxs("div",{className:"stat-cell",children:[e.jsx("span",{className:"stat-label",children:"Last edited"}),e.jsx("span",{className:"stat-value stat-value-mono",children:u?"—":B(G)})]}),e.jsxs("div",{className:"stat-cell",children:[e.jsx("span",{className:"stat-label",children:"Member since"}),e.jsx("span",{className:"stat-value stat-value-mono",children:ze(n?.created_at)})]}),e.jsxs("div",{className:"stat-cell",children:[e.jsx("span",{className:"stat-label",children:"Plan"}),e.jsx("span",{className:"stat-value stat-value-mono",children:"FREE · ∞"})]})]}),e.jsx("div",{className:"section-head",children:e.jsxs("h2",{className:"section-title",children:[e.jsx("span",{className:"section-title-mono",children:"§ 01 —"}),"Quick actions"]})}),e.jsxs("div",{className:"toolbelt",children:[e.jsxs("button",{className:"tool tool--primary",onClick:A,children:[e.jsx("div",{className:"tool-icon",children:e.jsx(o,{i:"add",s:22,c:"#0a0a0a"})}),e.jsxs("div",{className:"tool-body",children:[e.jsx("span",{className:"tool-title",children:"New project"}),e.jsx("span",{className:"tool-subtitle",children:"Import media and start editing"})]})]}),e.jsxs("button",{className:"tool",onClick:()=>{v("templates"),r("/templates")},children:[e.jsx("div",{className:"tool-icon",children:e.jsx(o,{i:"collections",s:20,c:"#75AADB"})}),e.jsxs("div",{className:"tool-body",children:[e.jsx("span",{className:"tool-title",children:"Browse templates"}),e.jsx("span",{className:"tool-subtitle",children:"Community works — fork and remix"})]})]}),e.jsxs("button",{className:"tool",onClick:()=>r("/long-to-shorts"),children:[e.jsx("div",{className:"tool-icon",children:e.jsx(o,{i:"crop_portrait",s:20,c:"#75AADB"})}),e.jsxs("div",{className:"tool-body",children:[e.jsx("span",{className:"tool-title",children:"Long → Shorts"}),e.jsx("span",{className:"tool-subtitle",children:"Auto-crop a long video for TikTok"})]})]})]}),e.jsxs("div",{className:"section-head",children:[e.jsxs("h2",{className:"section-title",children:[e.jsx("span",{className:"section-title-mono",children:"§ 02 —"}),"Your projects",!u&&l.length>0&&e.jsxs("span",{className:"section-title-count",children:[D.length," of ",l.length]})]}),l.length>0&&e.jsxs("div",{className:"proj-search",children:[e.jsx(o,{i:"search"}),e.jsx("input",{type:"text",placeholder:"Search projects…","aria-label":"Search projects",value:R,onChange:t=>q(t.target.value)})]})]}),C&&e.jsxs("div",{className:"error-banner",children:[e.jsx(o,{i:"cloud_off",s:18,c:"#ef4444"}),e.jsx("span",{children:C}),e.jsx("button",{className:"error-retry",onClick:g,children:"RETRY"})]}),u&&!C&&e.jsx("div",{className:"projects-grid",children:[1,2,3,4,5,6].map(t=>e.jsxs("div",{className:"project-card",style:{pointerEvents:"none"},children:[e.jsx("div",{className:"project-thumb skel"}),e.jsxs("div",{className:"project-info",children:[e.jsx("div",{style:{width:"65%",height:"14px",borderRadius:"2px",background:"#1a2332",marginTop:"10px",marginBottom:"6px"}}),e.jsx("div",{style:{width:"40%",height:"10px",borderRadius:"2px",background:"#151b24"}})]})]},t))}),ce&&e.jsx("div",{className:"projects-grid",children:D.map(t=>e.jsxs("div",{className:"project-card",onClick:()=>oe(t),onContextMenu:a=>ie(a,t),children:[e.jsxs("div",{className:"project-thumb",children:[t.thumbnail&&!X.has(t.id)?e.jsx("img",{src:t.thumbnail,alt:t.name,onError:()=>Z(a=>new Set(a).add(t.id))}):e.jsx("div",{className:"project-thumb-fallback",children:e.jsx(o,{i:"movie",s:34,c:"rgba(117,170,219,0.35)"})}),e.jsx("button",{className:"del-btn",onClick:a=>V(a,t.id),"aria-label":`Delete project ${t.name}`,title:"Delete project",children:e.jsx(o,{i:"delete",s:14,c:"white"})})]}),e.jsxs("div",{className:"project-info",children:[K===t.id?e.jsx("input",{autoFocus:!0,className:"project-rename-input",value:_,onChange:a=>I(a.target.value),onBlur:()=>W(t.id),onKeyDown:a=>{a.key==="Enter"&&W(t.id),a.key==="Escape"&&z(null)},onClick:a=>a.stopPropagation()}):e.jsxs("div",{className:"project-rename-row",children:[e.jsx("p",{className:"name",onClick:a=>L(a,t),title:"Click to rename",style:{cursor:"text",flex:1,minWidth:0},children:t.name}),e.jsx("button",{onClick:a=>L(a,t),style:{background:"none",border:"none",cursor:"pointer",padding:"2px",opacity:.4,flexShrink:0,display:"flex",alignItems:"center"},title:"Rename","aria-label":`Rename ${t.name}`,children:e.jsx(o,{i:"edit",s:12,c:"rgba(255,255,255,0.5)"})})]}),e.jsxs("p",{className:"meta",children:[e.jsx("span",{className:"res",children:t.resolution}),e.jsx("span",{className:"sep","aria-hidden":"true"}),e.jsx("span",{children:Ne(t.savedAt)})]})]})]},t.id))}),f&&e.jsxs("div",{className:"ctx-menu",style:{left:f.x,top:f.y},children:[e.jsxs("button",{className:"ctx-menu-item",onClick:()=>{L({stopPropagation:()=>{}},f.project),S()},children:[e.jsx(o,{i:"edit",s:14})," Rename"]}),e.jsxs("button",{className:"ctx-menu-item",onClick:()=>se(f.project),children:[e.jsx(o,{i:"content_copy",s:14})," Duplicate"]}),e.jsx("div",{className:"ctx-menu-sep"}),e.jsxs("button",{className:"ctx-menu-item ctx-menu-item--danger",onClick:t=>{V(t,f.project.id),S()},children:[e.jsx(o,{i:"delete",s:14})," Delete"]})]}),le&&e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(o,{i:"movie_edit",s:26,c:"rgba(117,170,219,0.75)"})}),e.jsxs("h3",{children:["A clean ",e.jsx("span",{className:"em",children:"canvas."})]}),e.jsx("p",{children:"Import a video, image, or audio file to start your first project — or begin from a community template."}),e.jsxs("div",{className:"empty-actions",children:[e.jsxs("button",{className:"empty-btn empty-btn--primary",onClick:A,children:[e.jsx(o,{i:"add",s:16,c:"#0a0a0a"}),"Import media"]}),e.jsxs("button",{className:"empty-btn empty-btn--ghost",onClick:()=>r("/templates"),children:[e.jsx(o,{i:"collections",s:16}),"Browse templates"]})]}),e.jsx("p",{className:"empty-hint",children:"SUPPORTS · MP4 · WEBM · MP3 · WAV · PNG · JPG"})]})]}),!p&&!O&&e.jsxs("aside",{className:"advisor-rail","aria-label":"Workspace advisor",children:[e.jsxs("div",{className:"advisor-rail-head",children:[e.jsx("span",{className:"advisor-rail-title",children:"Advisor"}),e.jsx("button",{type:"button",className:"advisor-dismiss",onClick:te,"aria-label":"Dismiss advisor panel",title:"Hide advisor",children:e.jsx(o,{i:"close",s:16})})]}),e.jsxs("div",{className:"advisor-timeline",children:[e.jsxs("div",{className:"advisor-entry advisor-entry--warning",children:[e.jsx("span",{className:"advisor-entry-time",children:"Security · Pending"}),e.jsxs("h4",{className:"advisor-entry-title",children:[e.jsx(o,{i:"shield",s:14,c:"#f5b84e"}),"Review account security"]}),e.jsx("p",{className:"advisor-entry-body",children:"Strengthen your account by enabling 2-factor authentication and a recovery email."}),e.jsxs("button",{className:"advisor-entry-action advisor-entry-action--warning",onClick:()=>r("/settings"),children:["Open settings",e.jsx(o,{i:"arrow_forward",s:12,c:"#f5b84e"})]})]}),l.length===0&&!u?e.jsxs("div",{className:"advisor-entry advisor-entry--info",children:[e.jsx("span",{className:"advisor-entry-time",children:"Getting started"}),e.jsxs("h4",{className:"advisor-entry-title",children:[e.jsx(o,{i:"rocket_launch",s:14,c:"#75AADB"}),"First steps"]}),e.jsxs("ul",{className:"advisor-checklist",children:[e.jsxs("li",{className:"done",children:[e.jsx(o,{i:"check_circle",s:14,fill:!0}),e.jsx("span",{children:"Create account"})]}),e.jsxs("li",{children:[e.jsx(o,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.22)"}),e.jsx("span",{children:"Import your first media file"})]}),e.jsxs("li",{children:[e.jsx(o,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.22)"}),e.jsx("span",{children:"Edit and export a project"})]})]})]}):l.length>0?e.jsxs("div",{className:"advisor-entry advisor-entry--success",children:[e.jsx("span",{className:"advisor-entry-time",children:"Workspace · Active"}),e.jsxs("h4",{className:"advisor-entry-title",children:[e.jsx(o,{i:"check_circle",s:14,c:"#6ec07a"}),"Everything in sync"]}),e.jsxs("p",{className:"advisor-entry-body",children:[l.length," project",l.length!==1?"s":""," · last edit ",B(G),"."]})]}):null,e.jsxs("div",{className:"advisor-entry advisor-entry--info",children:[e.jsx("span",{className:"advisor-entry-time",children:"Community"}),e.jsxs("h4",{className:"advisor-entry-title",children:[e.jsx(o,{i:"collections",s:14,c:"#75AADB"}),"Explore templates"]}),e.jsx("p",{className:"advisor-entry-body",children:"Browse works from creators across Botswana. Fork, remix, and publish back to the catalog when you're ready."}),e.jsxs("button",{className:"advisor-entry-action advisor-entry-action--info",onClick:()=>r("/templates"),children:["Open catalog",e.jsx(o,{i:"arrow_forward",s:12,c:"#75AADB"})]})]})]})]})]})})]}),p&&e.jsxs("nav",{className:"mobile-bottom-nav",children:[e.jsxs("button",{className:h==="home"?"active":"",onClick:()=>v("home"),children:[e.jsx(o,{i:"home",s:22,fill:h==="home"}),e.jsx("span",{children:"Home"})]}),e.jsxs("button",{onClick:A,children:[e.jsx(o,{i:"add_circle",s:22,c:"#75AADB"}),e.jsx("span",{children:"New"})]}),e.jsxs("button",{className:h==="templates"?"active":"",onClick:()=>{v("templates"),r("/templates")},children:[e.jsx(o,{i:"collections",s:22}),e.jsx("span",{children:"Templates"})]}),e.jsxs("button",{className:h==="settings"?"active":"",onClick:()=>r("/settings"),children:[e.jsx(o,{i:"settings",s:22}),e.jsx("span",{children:"Settings"})]})]}),e.jsxs("div",{className:"bw-stripe",role:"presentation",children:[e.jsx("div",{style:{background:"#75AADB"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#000"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#75AADB"}})]})]})};export{Te as default};
