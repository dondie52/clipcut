import{u as pe,r,j as e}from"./DwQPoapS.js";import{u as xe,l as v,g as V,t as z,b as D}from"./Dquh55-i.js";import{u as ge,l as me,a as be,m as he,b as Q,d as ue,c as fe,s as ve}from"./CA5zbgJd.js";import{h as je}from"./Et-wlZO3.js";import"./DZxFKcQQ.js";import"./B9CjrYEi.js";const U="clipcut-dashboard-advisor-dismissed",ye=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');
  :root {
    --cc-bg: #0a0a0a;
    --cc-bg-alt: #0d1117;
    --cc-surface: #1a2332;
    --cc-surface-raised: rgba(26,35,50,0.35);
    --cc-border: rgba(255,255,255,0.06);
    --cc-border-hover: rgba(255,255,255,0.1);
    --cc-accent: #75AADB;
    --cc-accent-hover: #8bbae3;
    --cc-accent-soft: rgba(117,170,219,0.1);
    --cc-accent-glow: rgba(117,170,219,0.06);
    --cc-text: #ffffff;
    --cc-text-secondary: rgba(255,255,255,0.6);
    --cc-text-muted: rgba(255,255,255,0.35);
    --cc-text-dim: rgba(255,255,255,0.2);
    --cc-font: 'Spline Sans', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }

  .dash-root {
    width: 100%; height: 100vh; background: var(--cc-bg);
    font-family: var(--cc-font); display: flex;
    overflow: hidden; color: var(--cc-text);
    position: relative;
  }

  /* Film grain overlay */
  .dash-root::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  /* Entrance animation for main content */
  .dash-content {
    animation: dashFadeIn 0.5s ease forwards;
  }

  @keyframes dashFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ---- Sidebar ---- */
  .sidebar {
    width: 200px; min-width: 200px; background: #0e1218;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column;
  }
  .sidebar-logo {
    padding: 20px 20px 20px; display: flex; align-items: center; gap: 10px;
  }
  .sidebar-logo-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: linear-gradient(135deg, #75AADB, #5a8cbf);
    display: flex; align-items: center; justify-content: center;
  }
  .sidebar-user {
    padding: 0 16px 16px; display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 12px;
  }
  .sidebar-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, #75AADB, #4a7fb5);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 12px; font-weight: 700; color: white;
  }
  .sidebar-nav { flex: 1; padding: 8px 8px; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 9px 14px;
    border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.45); transition: all 0.15s ease;
    border: none; background: none; width: 100%; text-align: left;
    min-height: 38px;
  }
  .nav-item:hover { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.75); }
  .nav-item.active { background: rgba(117,170,219,0.1); color: white; font-weight: 600; }
  .nav-item .material-symbols-outlined { font-size: 20px; }
  .nav-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 6px 14px; }
  .sidebar-logout {
    display: flex; align-items: center; gap: 12px; padding: 9px 14px;
    margin: 0 8px 8px; border-radius: 8px; cursor: pointer;
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.45);
    border: none; background: none; width: calc(100% - 16px); text-align: left;
    min-height: 38px; transition: all 0.15s ease;
  }
  .sidebar-logout:hover { background: rgba(239,68,68,0.08); color: #f87171; }
  .sidebar-logout .material-symbols-outlined { font-size: 20px; }
  .sidebar-footer {
    padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 10px; color: rgba(255,255,255,0.25);
  }

  /* ---- Content wrapper ---- */
  .dash-content {
    flex: 1; display: flex; flex-direction: column; overflow: hidden;
    min-width: 0;
  }

  /* ---- Top Bar ---- */
  .top-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 28px 0; flex-shrink: 0;
  }
  .top-bar h1 {
    font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.3px;
    line-height: 1.3;
  }
  .top-bar-sub {
    font-size: 12px; color: rgba(255,255,255,0.45); margin: 2px 0 0;
  }
  .top-bar-actions { display: flex; align-items: center; gap: 6px; }
  .icon-btn {
    width: 34px; height: 34px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(26,35,50,0.3); display: flex;
    align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s ease;
    color: rgba(255,255,255,0.4);
  }
  .icon-btn:hover {
    background: rgba(26,35,50,0.6); color: rgba(255,255,255,0.8);
    border-color: rgba(255,255,255,0.1);
  }

  /* ---- Scrollable body ---- */
  .dash-body {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: 20px 28px 40px;
    scrollbar-width: thin; scrollbar-color: #1e293b transparent;
  }
  .dash-body::-webkit-scrollbar { width: 6px; }
  .dash-body::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }

  /* ---- Two-column layout ---- */
  .dash-layout {
    display: grid; grid-template-columns: 1fr 256px; gap: 28px;
    align-items: start;
  }
  .dash-layout--single {
    grid-template-columns: 1fr;
  }
  .dash-main { min-width: 0; }

  /* ---- Stats Row ---- */
  .stats-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    margin-bottom: 20px;
  }
  .stat-card {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px; border-radius: 10px;
    background: rgba(26,35,50,0.35); border: 1px solid rgba(255,255,255,0.05);
    transition: border-color 0.15s ease;
  }
  .stat-card:hover { border-color: rgba(255,255,255,0.08); }
  .stat-icon {
    width: 34px; height: 34px; border-radius: 8px;
    background: rgba(117,170,219,0.12); display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
  }
  .stat-value {
    font-size: 17px; font-weight: 700; display: block; line-height: 1.2;
  }
  .stat-label {
    font-size: 10px; color: rgba(255,255,255,0.45); display: block;
    margin-top: 1px; letter-spacing: 0.2px;
  }

  /* ---- Section Labels ---- */
  .section-label {
    font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4);
    text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;
  }

  /* ---- Quick Actions ---- */
  .quick-actions {
    display: grid; grid-template-columns: 1fr; gap: 10px;
    margin-bottom: 24px; max-width: 400px;
  }
  .quick-action {
    display: flex; align-items: center; gap: 12px; padding: 14px 16px;
    border-radius: 10px; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(26,35,50,0.35); color: rgba(255,255,255,0.8);
    font-family: inherit; font-size: 13px; font-weight: 600;
    transition: all 0.2s ease; position: relative;
  }
  .quick-action:hover {
    background: rgba(26,35,50,0.6); border-color: rgba(255,255,255,0.1);
    transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .quick-action--primary {
    background: linear-gradient(135deg, rgba(117,170,219,0.15) 0%, rgba(117,170,219,0.08) 100%);
    border-color: rgba(117,170,219,0.2); color: white;
  }
  .quick-action--primary:hover {
    background: linear-gradient(135deg, rgba(117,170,219,0.22) 0%, rgba(117,170,219,0.12) 100%);
    border-color: rgba(117,170,219,0.35);
    box-shadow: 0 4px 20px rgba(117,170,219,0.1);
  }
  .qa-icon {
    width: 34px; height: 34px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    background: rgba(117,170,219,0.08);
  }
  .quick-action--primary .qa-icon { background: rgba(255,255,255,0.1); }

  /* ---- Projects Section ---- */
  .projects-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
  }
  .proj-search {
    position: relative; width: 180px;
  }
  .proj-search input {
    width: 100%; background: rgba(26,35,50,0.4);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 7px; padding: 6px 10px 6px 30px; color: white;
    font-size: 12px; outline: none; font-family: inherit;
  }
  .proj-search input::placeholder { color: rgba(255,255,255,0.2); }
  .proj-search input:focus { border-color: rgba(117,170,219,0.35); }
  .proj-search .material-symbols-outlined {
    position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
    font-size: 15px; color: rgba(255,255,255,0.2);
  }

  .projects-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 14px;
  }
  .project-card {
    cursor: pointer; transition: all 0.2s ease; border-radius: 10px;
  }
  .project-card:hover { transform: translateY(-2px); }
  .project-card:hover .project-thumb {
    border-color: rgba(117,170,219,0.25);
    box-shadow: 0 4px 16px rgba(0,0,0,0.35);
  }
  .project-card:hover .del-btn { opacity: 1 !important; }
  .project-thumb {
    width: 100%; aspect-ratio: 16/10; border-radius: 10px; overflow: hidden;
    background: #111820; border: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease; position: relative;
  }
  .project-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .project-info { padding: 8px 2px 0; }
  .project-info .name {
    font-size: 13px; font-weight: 600; margin: 0 0 2px; color: white;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .project-info .meta { font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; }
  .del-btn {
    position: absolute; top: 6px; right: 6px;
    width: 28px; height: 28px; border-radius: 6px;
    background: rgba(239,68,68,0.85); border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; opacity: 0; transition: opacity 0.15s ease;
  }
  .del-btn:hover { background: #ef4444; }

  /* ---- Context Menu ---- */
  .ctx-menu {
    position: fixed; z-index: 5000;
    background: #1a2332; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; padding: 4px 0; min-width: 160px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    animation: dashFadeIn 0.12s ease;
  }
  .ctx-menu-item {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 14px; font-size: 12px; color: rgba(255,255,255,0.8);
    cursor: pointer; background: none; border: none; width: 100%;
    font-family: inherit; text-align: left;
  }
  .ctx-menu-item:hover { background: rgba(117,170,219,0.1); color: white; }
  .ctx-menu-item--danger { color: #ef4444; }
  .ctx-menu-item--danger:hover { background: rgba(239,68,68,0.1); color: #ef4444; }
  .ctx-menu-sep { height: 1px; background: rgba(255,255,255,0.06); margin: 4px 0; }

  /* ---- Empty State ---- */
  .empty-state {
    padding: 48px 24px; border-radius: 12px;
    background: rgba(26,35,50,0.2);
    border: 1px dashed rgba(255,255,255,0.06);
    text-align: center;
  }
  .empty-icon {
    width: 60px; height: 60px; border-radius: 14px; margin: 0 auto 16px;
    background: rgba(117,170,219,0.1); display: flex;
    align-items: center; justify-content: center;
  }
  .empty-state h3 {
    font-size: 17px; font-weight: 700; margin: 0 0 6px; color: rgba(255,255,255,0.9);
  }
  .empty-state p {
    font-size: 12px; color: rgba(255,255,255,0.5); margin: 0 auto 20px;
    line-height: 1.6; max-width: 300px;
  }
  .empty-actions { display: flex; gap: 8px; justify-content: center; }
  .empty-btn {
    display: inline-flex; align-items: center; gap: 7px; padding: 10px 22px;
    border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all 0.15s ease; border: none;
  }
  .empty-btn--primary { background: #75AADB; color: #0a0a0a; }
  .empty-btn--primary:hover { background: #8bb9e4; }
  .empty-btn--ghost {
    background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .empty-btn--ghost:hover { background: rgba(255,255,255,0.08); color: white; }
  .empty-hint {
    margin-top: 18px; font-size: 11px; color: rgba(255,255,255,0.25);
    line-height: 1.5;
  }

  /* ---- Advisor Panel ---- */
  .advisor-panel { position: sticky; top: 0; }
  .advisor-label-row {
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: 12px;
  }
  .advisor-label {
    display: flex; align-items: center; gap: 6px; margin-bottom: 0;
    font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4);
    text-transform: uppercase; letter-spacing: 0.8px;
  }
  .advisor-dismiss {
    flex-shrink: 0; width: 28px; height: 28px; border-radius: 6px;
    border: none; background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.4); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .advisor-dismiss:hover {
    background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8);
  }
  .advisor-item {
    padding: 14px; border-radius: 10px; margin-bottom: 10px;
    background: rgba(26,35,50,0.35); border: 1px solid rgba(255,255,255,0.05);
    border-left: 3px solid transparent;
  }
  .advisor-item--warning {
    border-left-color: #f59e0b;
    background: rgba(26,35,50,0.4);
  }
  .advisor-item--info { border-left-color: #75AADB; }
  .advisor-item--success { border-left-color: #22c55e; }
  .advisor-item-header {
    display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
  }
  .advisor-item h4 {
    font-size: 12px; font-weight: 600; margin: 0; color: rgba(255,255,255,0.9);
  }
  .advisor-item p {
    font-size: 11px; color: rgba(255,255,255,0.4); margin: 0;
    line-height: 1.5;
  }
  .advisor-item p + .advisor-action { margin-top: 10px; }
  .advisor-action {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 10px; border-radius: 5px; font-size: 11px;
    font-weight: 600; cursor: pointer; font-family: inherit;
    transition: all 0.15s ease; border: none;
  }
  .advisor-action--warning {
    background: rgba(245,158,11,0.1); color: #f59e0b;
  }
  .advisor-action--warning:hover { background: rgba(245,158,11,0.18); }
  .advisor-action--info {
    background: rgba(117,170,219,0.1); color: #75AADB;
  }
  .advisor-action--info:hover { background: rgba(117,170,219,0.18); }

  .advisor-checklist { list-style: none; padding: 0; margin: 8px 0 0; }
  .advisor-checklist li {
    display: flex; align-items: center; gap: 7px;
    font-size: 11px; color: rgba(255,255,255,0.4);
    padding: 3px 0;
  }
  .advisor-checklist li.done { color: rgba(34,197,94,0.7); }
  .advisor-checklist li.done .material-symbols-outlined { color: #22c55e; }
  .advisor-checklist li .material-symbols-outlined { font-size: 14px; }

  /* ---- Error Banner ---- */
  .error-banner {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px; border-radius: 8px; margin-bottom: 14px;
    background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.12);
  }
  .error-banner > span { flex: 1; font-size: 12px; color: rgba(255,255,255,0.6); }
  .error-retry {
    background: rgba(117,170,219,0.1); border: 1px solid rgba(117,170,219,0.2);
    border-radius: 6px; padding: 5px 12px; color: #75AADB; font-size: 11px;
    font-weight: 600; cursor: pointer; font-family: inherit; white-space: nowrap;
  }
  .error-retry:hover { background: rgba(117,170,219,0.18); }

  /* ---- Loading shimmer ---- */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skel {
    background: linear-gradient(90deg, #111820 25%, #1a2332 50%, #111820 75%);
    background-size: 200% 100%; animation: shimmer 1.5s ease-in-out infinite;
  }

  /* ---- Botswana stripe ---- */
  .bw-stripe {
    position: fixed; bottom: 0; left: 0; right: 0; height: 3px;
    display: flex; z-index: 50;
  }
  .bw-stripe div { flex: 1; }

  /* ---- Mobile sidebar overlay ---- */
  .sidebar-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    z-index: 499; opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .sidebar-overlay.visible { opacity: 1; pointer-events: auto; }

  /* ---- Mobile bottom nav ---- */
  .mobile-bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0;
    height: 56px; background: #0e1218;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: none; align-items: center; justify-content: space-around;
    z-index: 400; padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .mobile-bottom-nav button {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    background: none; border: none; color: rgba(255,255,255,0.45);
    font-size: 10px; font-family: inherit; font-weight: 500;
    cursor: pointer; padding: 8px 16px; min-height: 44px; min-width: 44px;
    transition: color 0.15s ease;
  }
  .mobile-bottom-nav button.active { color: #75AADB; }
  .mobile-bottom-nav button .material-symbols-outlined { font-size: 22px; }

  /* ---- Mobile hamburger ---- */
  .hamburger-btn {
    width: 38px; height: 38px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(26,35,50,0.3); display: none;
    align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,0.6);
    margin-right: 12px; flex-shrink: 0;
  }

  @media (max-width: 767px) {
    .dash-root { height: 100dvh; height: 100vh; }
    .sidebar {
      position: fixed; left: -260px; top: 0; bottom: 0; z-index: 500;
      width: 240px; min-width: 240px;
      transition: left 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .sidebar.sidebar-open { left: 0; }
    .sidebar-close-btn {
      position: absolute; top: 16px; right: 12px;
      width: 30px; height: 30px; border-radius: 6px;
      border: none; background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.5); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
    .hamburger-btn { display: flex; }
    .mobile-bottom-nav { display: flex; }
    .dash-layout { grid-template-columns: 1fr; gap: 16px; }
    .advisor-panel { display: none; }
    .stats-row { grid-template-columns: 1fr; }
    .quick-actions { grid-template-columns: 1fr; }
    .top-bar { padding: 14px 16px 0; }
    .top-bar h1 { font-size: 18px; }
    .dash-body { padding: 16px 16px 80px; }
    .projects-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
    .project-thumb { aspect-ratio: 4/3; }
    .projects-header { flex-direction: column; align-items: stretch; gap: 8px; }
    .proj-search { width: 100%; }
    .empty-state { padding: 32px 16px; }
    .bw-stripe { bottom: 56px; }
  }

  @media (max-width: 400px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
    .stats-row { gap: 8px; }
    .top-bar h1 { font-size: 14px; }
  }
`,i=({i:s,s:n=20,c:g,fill:d=!1,style:m})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:n,color:g,fontVariationSettings:d?"'FILL' 1":"'FILL' 0",...m},children:s}),we=[{id:"home",icon:"home",label:"Home",fill:!0},{id:"divider"},{id:"settings",icon:"settings",label:"Settings"}];function F(s){if(!s)return"Never";const n=Date.now()-new Date(s).getTime(),g=Math.floor(n/6e4);if(g<1)return"Just now";if(g<60)return`${g}m ago`;const d=Math.floor(g/60);if(d<24)return`${d}h ago`;const m=Math.floor(d/24);return m<7?`${m}d ago`:m<30?`${Math.floor(m/7)}w ago`:new Date(s).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function ke(s){return s?`${new Date(s).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1})} · ${F(s)}`:"Never"}function Ne(){const s=new Date().getHours();return s<12?"Good morning":s<18?"Good afternoon":"Good evening"}function Se(s){return s?new Date(s).toLocaleDateString("en-US",{month:"short",year:"numeric"}):"—"}const H=r.memo(({user:s,activeNav:n,onNav:g,onNavigate:d,onLogout:m,isOpen:w,onClose:u})=>{const j=s?.user_metadata?.full_name||s?.email?.split("@")[0]||"Creator",k=j.charAt(0).toUpperCase();return e.jsxs("aside",{className:`sidebar ${w?"sidebar-open":""}`,children:[u&&e.jsx("button",{className:"sidebar-close-btn",onClick:u,"aria-label":"Close menu",children:e.jsx(i,{i:"close",s:18})}),e.jsxs("div",{className:"sidebar-logo",children:[e.jsx("div",{className:"sidebar-logo-icon",children:e.jsx(i,{i:"content_cut",s:16,c:"white"})}),e.jsx("span",{style:{fontSize:"16px",fontWeight:700},children:"ClipCut"})]}),e.jsxs("div",{className:"sidebar-user",children:[e.jsx("div",{className:"sidebar-avatar",children:k}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("p",{style:{fontSize:"12px",fontWeight:600,margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:j}),e.jsx("p",{style:{fontSize:"10px",color:"rgba(255,255,255,0.25)",margin:0},children:"Free Plan"})]})]}),e.jsx("nav",{className:"sidebar-nav",children:we.map(c=>c.id==="divider"?e.jsx("div",{className:"nav-divider"},"div"):e.jsxs("button",{className:`nav-item ${n===c.id?"active":""}`,onClick:()=>{g(c.id),c.id==="settings"&&d("/settings")},children:[e.jsx(i,{i:c.icon,s:20,fill:c.fill&&n===c.id}),e.jsx("span",{style:{flex:1},children:c.label})]},c.id))}),e.jsxs("button",{className:"sidebar-logout",onClick:m,children:[e.jsx(i,{i:"logout",s:20}),e.jsx("span",{style:{flex:1},children:"Log out"})]}),e.jsx("div",{className:"sidebar-footer",children:"v0.1.0 beta"})]})});H.displayName="Sidebar";const Ee=()=>{const s=pe(),{user:n,signOut:g}=xe(),d=ge(),m=r.useRef(null),w=r.useRef(!1),[u,j]=r.useState("home"),[k,c]=r.useState(!1),[B,J]=r.useState(""),[p,N]=r.useState([]),[f,R]=r.useState(!0),[S,$]=r.useState(null),[K,C]=r.useState(null),[_,T]=r.useState(""),[X,Z]=r.useState(new Set),[q,ee]=r.useState(()=>{try{return typeof window<"u"&&localStorage.getItem(U)==="1"}catch{return!1}}),te=r.useCallback(()=>{try{localStorage.setItem(U,"1")}catch{}ee(!0)},[]),ae=n?.user_metadata?.full_name||n?.email?.split("@")[0]||"Creator",O=r.useMemo(()=>p.length===0?null:[...p].sort((a,l)=>new Date(l.savedAt||0)-new Date(a.savedAt||0))[0]?.savedAt,[p]),W=r.useCallback(t=>{if(t.name&&t.name!=="Untitled Project")return t.name;const l=(t.project_data?.clips||[]).find(x=>x.type==="video"&&x.name);return l?.name&&l.name.replace(/\.[^.]+$/,"").trim()||t.name},[]),b=r.useCallback(async()=>{R(!0),$(null);try{const t=await me(n?.id);let a=[];try{const o=be(),y=new Set(t.map(I=>I.id));a=o.filter(I=>!y.has(I.id))}catch{}const l=[...t,...a];n?.id&&a.length>0&&!w.current&&(w.current=!0,he(n.id).then(o=>{o>0&&(v.info(`Migrated ${o} local project(s) to cloud`),b())}).catch(o=>v.warn("Local project migration failed",{error:o})));const x=[];for(const o of l){const y=W(o);y!==o.name&&(o.name=y,o._source!=="localStorage"&&x.push(Q(o.id,n?.id,{name:y}).catch(()=>{})))}x.length>0&&Promise.all(x);const de=l.map(o=>({id:o.id,name:o.name,thumbnail:o.thumbnail_url||o.project_data?.thumbnailDataUrl||null,duration:o.duration_seconds>0?`${Math.floor(o.duration_seconds/60)}:${String(Math.floor(o.duration_seconds%60)).padStart(2,"0")}`:"0:00",resolution:o.resolution||"1080p",savedAt:o.updated_at||o.created_at,isCloud:!o._source||o._source!=="localStorage"}));N(de)}catch(t){v.error("Failed to load projects",{error:t}),$(V(t,"project")),N([])}finally{R(!1)}},[n?.id,W]);r.useEffect(()=>{b();let t=Date.now();const a=()=>{Date.now()-t<3e4||(t=Date.now(),b())};window.addEventListener("focus",a);const l=()=>{t=Date.now(),b()};return window.addEventListener("storage",l),()=>{window.removeEventListener("focus",a),window.removeEventListener("storage",l)}},[b]);const P=r.useCallback(()=>{z(D.dashboardNewProjectClick),m.current?.click()},[]),ie=r.useCallback(t=>{const a=Array.from(t.target.files);a.length>0&&(z(D.dashboardFileImport,{fileCount:a.length}),s("/editor",{state:{filesToImport:a}})),t.target.value=""},[s]),re=r.useCallback(t=>{z(D.dashboardProjectOpen,{projectId:t.id}),s("/editor",{state:{projectId:t.id,projectName:t.name}})},[s]),Y=r.useCallback(async(t,a)=>{if(t.stopPropagation(),window.confirm("Are you sure you want to delete this project?"))try{await ue(a,n?.id);try{localStorage.removeItem(`clipcut_project_${a}`),localStorage.removeItem(`clipcut_autosave_${a}`),localStorage.removeItem(`clipcut_migrated_${a}`)}catch{}z(D.dashboardProjectDelete,{projectId:a}),N(l=>l.filter(x=>x.id!==a))}catch(l){v.error("Failed to delete project",{error:l,projectId:a}),alert(V(l,"project"))}},[n?.id]),E=r.useCallback((t,a)=>{t.stopPropagation(),C(a.id),T(a.name)},[]),G=r.useCallback(async t=>{const a=_.trim();if(!a||a===p.find(l=>l.id===t)?.name){C(null);return}try{await Q(t,n?.id,{name:a}),N(l=>l.map(x=>x.id===t?{...x,name:a}:x))}catch(l){v.error("Failed to rename project",{error:l})}C(null)},[_,p,n?.id]),[h,L]=r.useState(null),se=r.useCallback((t,a)=>{t.preventDefault(),t.stopPropagation(),L({x:t.clientX,y:t.clientY,project:a})},[]),A=r.useCallback(()=>L(null),[]);r.useEffect(()=>{if(!h)return;const t=()=>L(null);return window.addEventListener("click",t),window.addEventListener("contextmenu",t),()=>{window.removeEventListener("click",t),window.removeEventListener("contextmenu",t)}},[h]);const oe=r.useCallback(async t=>{A();try{const a=await fe(t.id,n?.id);if(!a)return;await ve(n?.id,{name:`${t.name} (copy)`,clips:a.project_data?.clips||[],duration:a.duration_seconds||0,resolution:a.resolution||"1080p"})&&b()}catch(a){v.error("Failed to duplicate project",{error:a})}},[n?.id,A,b]),ne=je(B),M=p.filter(t=>t.name.toLowerCase().includes(ne.toLowerCase())),le=!f&&M.length>0,ce=!f&&!S&&M.length===0;return e.jsxs("div",{className:"dash-root",children:[e.jsx("style",{children:ye}),e.jsx("input",{ref:m,type:"file",accept:"video/*,audio/*,image/*",multiple:!0,style:{display:"none"},onChange:ie}),e.jsx("div",{className:`sidebar-overlay ${k?"visible":""}`,onClick:()=>c(!1)}),e.jsx(H,{user:n,activeNav:u,onNav:t=>{j(t),d&&c(!1)},onNavigate:s,onLogout:async()=>{await g(),s("/login")},isOpen:k,onClose:d?()=>c(!1):void 0}),e.jsxs("div",{className:"dash-content",children:[e.jsxs("header",{className:"top-bar",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx("button",{className:"hamburger-btn",onClick:()=>c(t=>!t),"aria-label":"Open menu",children:e.jsx(i,{i:"menu",s:20})}),e.jsxs("div",{children:[e.jsxs("h1",{children:[Ne(),", ",ae]}),e.jsx("p",{className:"top-bar-sub",children:"Workspace overview"})]})]}),e.jsxs("div",{className:"top-bar-actions",children:[e.jsx("button",{className:"icon-btn",onClick:b,title:"Refresh projects",children:e.jsx(i,{i:"refresh",s:18})}),e.jsx("button",{className:"icon-btn",onClick:()=>s("/settings"),title:"Settings",children:e.jsx(i,{i:"settings",s:18})})]})]}),e.jsx("div",{className:"dash-body",children:e.jsxs("div",{className:`dash-layout ${!d&&q?"dash-layout--single":""}`,children:[e.jsxs("div",{className:"dash-main",children:[e.jsxs("div",{className:"stats-row",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"folder",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:f?"—":p.length}),e.jsx("span",{className:"stat-label",children:"Projects"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"schedule",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:f?"—":F(O)}),e.jsx("span",{className:"stat-label",children:"Last edited"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"calendar_month",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:Se(n?.created_at)}),e.jsx("span",{className:"stat-label",children:"Member since"})]})]})]}),e.jsx("div",{className:"section-label",children:"Quick Actions"}),e.jsx("div",{className:"quick-actions",children:e.jsxs("button",{className:"quick-action quick-action--primary",onClick:P,children:[e.jsx("div",{className:"qa-icon",children:e.jsx(i,{i:"add",s:20,c:"white"})}),e.jsx("span",{children:"New Project"})]})}),e.jsxs("div",{className:"projects-header",children:[e.jsx("div",{className:"section-label",style:{margin:0},children:"Your Projects"}),p.length>0&&e.jsxs("div",{className:"proj-search",children:[e.jsx(i,{i:"search"}),e.jsx("input",{type:"text",placeholder:"Search...","aria-label":"Search projects",value:B,onChange:t=>J(t.target.value)})]})]}),S&&e.jsxs("div",{className:"error-banner",children:[e.jsx(i,{i:"cloud_off",s:18,c:"#ef4444"}),e.jsx("span",{children:S}),e.jsx("button",{className:"error-retry",onClick:b,children:"Retry"})]}),f&&!S&&e.jsx("div",{className:"projects-grid",children:[1,2,3,4,5,6].map(t=>e.jsxs("div",{className:"project-card",style:{pointerEvents:"none"},children:[e.jsx("div",{className:"project-thumb skel"}),e.jsxs("div",{className:"project-info",children:[e.jsx("div",{style:{width:"65%",height:"12px",borderRadius:"4px",background:"#1a2332",marginBottom:"5px"}}),e.jsx("div",{style:{width:"35%",height:"10px",borderRadius:"4px",background:"#151b24"}})]})]},t))}),le&&e.jsx("div",{className:"projects-grid",children:M.map(t=>e.jsxs("div",{className:"project-card",onClick:()=>re(t),onContextMenu:a=>se(a,t),children:[e.jsxs("div",{className:"project-thumb",children:[t.thumbnail&&!X.has(t.id)?e.jsx("img",{src:t.thumbnail,alt:t.name,style:{width:"100%",height:"100%",objectFit:"cover"},onError:()=>Z(a=>new Set(a).add(t.id))}):e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:"absolute",inset:0,background:"linear-gradient(135deg, #111820, #0e1218)"},children:e.jsx(i,{i:"movie",s:32,c:"rgba(117,170,219,0.35)"})}),e.jsx("button",{className:"del-btn",onClick:a=>Y(a,t.id),"aria-label":`Delete project ${t.name}`,title:"Delete project",children:e.jsx(i,{i:"delete",s:14,c:"white"})})]}),e.jsxs("div",{className:"project-info",children:[K===t.id?e.jsx("input",{autoFocus:!0,value:_,onChange:a=>T(a.target.value),onBlur:()=>G(t.id),onKeyDown:a=>{a.key==="Enter"&&G(t.id),a.key==="Escape"&&C(null)},onClick:a=>a.stopPropagation(),style:{background:"rgba(117,170,219,0.1)",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"4px",padding:"2px 6px",color:"white",fontSize:"13px",fontWeight:600,fontFamily:"inherit",width:"100%",outline:"none"}}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",minWidth:0},children:[e.jsx("p",{className:"name",onClick:a=>E(a,t),title:"Click to rename",style:{cursor:"text",flex:1,minWidth:0},children:t.name}),e.jsx("button",{onClick:a=>E(a,t),style:{background:"none",border:"none",cursor:"pointer",padding:"2px",opacity:.4,flexShrink:0,display:"flex",alignItems:"center"},title:"Rename","aria-label":`Rename ${t.name}`,children:e.jsx(i,{i:"edit",s:12,c:"rgba(255,255,255,0.5)"})})]}),e.jsxs("p",{className:"meta",children:[t.resolution," · ",ke(t.savedAt)]})]})]},t.id))}),h&&e.jsxs("div",{className:"ctx-menu",style:{left:h.x,top:h.y},children:[e.jsxs("button",{className:"ctx-menu-item",onClick:()=>{E({stopPropagation:()=>{}},h.project),A()},children:[e.jsx(i,{i:"edit",s:14})," Rename"]}),e.jsxs("button",{className:"ctx-menu-item",onClick:()=>oe(h.project),children:[e.jsx(i,{i:"content_copy",s:14})," Duplicate"]}),e.jsx("div",{className:"ctx-menu-sep"}),e.jsxs("button",{className:"ctx-menu-item ctx-menu-item--danger",onClick:t=>{Y(t,h.project.id),A()},children:[e.jsx(i,{i:"delete",s:14})," Delete"]})]}),ce&&e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(i,{i:"movie_edit",s:26,c:"rgba(117,170,219,0.5)"})}),e.jsx("h3",{children:"Start your first project"}),e.jsx("p",{children:"Import a video, image, or audio file to create your first project and start editing."}),e.jsx("div",{className:"empty-actions",children:e.jsxs("button",{className:"empty-btn empty-btn--primary",onClick:P,children:[e.jsx(i,{i:"add",s:16,c:"#0a0a0a"}),"Import Media"]})}),e.jsx("p",{className:"empty-hint",children:"Supports MP4, WebM, MP3, WAV, PNG, JPG and more"})]})]}),!d&&!q&&e.jsxs("aside",{className:"advisor-panel",children:[e.jsxs("div",{className:"advisor-label-row",children:[e.jsxs("div",{className:"advisor-label",children:[e.jsx(i,{i:"assistant",s:14,c:"rgba(255,255,255,0.25)"}),"Advisor"]}),e.jsx("button",{type:"button",className:"advisor-dismiss",onClick:te,"aria-label":"Dismiss advisor panel",title:"Hide advisor",children:e.jsx(i,{i:"close",s:18})})]}),e.jsxs("div",{className:"advisor-item advisor-item--warning",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"shield",s:16,c:"#f59e0b"}),e.jsx("h4",{children:"Account Security"})]}),e.jsx("p",{children:"Strengthen your account by reviewing your security settings."}),e.jsxs("button",{className:"advisor-action advisor-action--warning",onClick:()=>s("/settings"),children:[e.jsx(i,{i:"arrow_forward",s:12,c:"#f59e0b"}),"Review Settings"]})]}),p.length===0&&!f?e.jsxs("div",{className:"advisor-item advisor-item--info",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"rocket_launch",s:16,c:"#75AADB"}),e.jsx("h4",{children:"Getting Started"})]}),e.jsxs("ul",{className:"advisor-checklist",children:[e.jsxs("li",{className:"done",children:[e.jsx(i,{i:"check_circle",s:14,fill:!0}),e.jsx("span",{children:"Create account"})]}),e.jsxs("li",{children:[e.jsx(i,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Import your first media file"})]}),e.jsxs("li",{children:[e.jsx(i,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Edit and export a project"})]})]})]}):p.length>0?e.jsxs("div",{className:"advisor-item advisor-item--success",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"check_circle",s:16,c:"#22c55e"}),e.jsx("h4",{children:"Workspace Active"})]}),e.jsxs("p",{children:[p.length," project",p.length!==1?"s":""," in your workspace. Last edited ",F(O),"."]})]}):null]})]})})]}),d&&e.jsxs("nav",{className:"mobile-bottom-nav",children:[e.jsxs("button",{className:u==="home"?"active":"",onClick:()=>j("home"),children:[e.jsx(i,{i:"home",s:22,fill:u==="home"}),e.jsx("span",{children:"Home"})]}),e.jsxs("button",{onClick:P,children:[e.jsx(i,{i:"add_circle",s:22,c:"#75AADB"}),e.jsx("span",{children:"New"})]}),e.jsxs("button",{className:u==="settings"?"active":"",onClick:()=>s("/settings"),children:[e.jsx(i,{i:"settings",s:22}),e.jsx("span",{children:"Settings"})]})]}),e.jsxs("div",{className:"bw-stripe",role:"presentation",children:[e.jsx("div",{style:{background:"#75AADB"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#000"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#75AADB"}})]})]})};export{Ee as default};
