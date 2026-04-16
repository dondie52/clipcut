import{u as oe,r as s,j as e}from"./DwQPoapS.js";import{u as ne,l as S,g as W,t as j,b as y}from"./CW3CImKh.js";import{u as le,l as de,a as O,d as ce,b as pe,s as xe}from"./D00s1COn.js";import{h as ge}from"./Et-wlZO3.js";import"./DZxFKcQQ.js";import"./B9CjrYEi.js";const Y="clipcut-dashboard-advisor-dismissed",me=`
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
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
    margin-bottom: 24px;
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
  .qa-badge {
    position: absolute; top: 8px; right: 8px;
    background: rgba(117,170,219,0.9); color: #0a0a0a; font-size: 9px;
    font-weight: 800; padding: 2px 6px; border-radius: 3px;
    letter-spacing: 0.4px;
  }

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
`,i=({i:r,s:n=20,c:d,fill:g=!1,style:c})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:n,color:d,fontVariationSettings:g?"'FILL' 1":"'FILL' 0",...c},children:r}),be=[{id:"home",icon:"home",label:"Home",fill:!0},{id:"templates",icon:"dashboard",label:"Templates"},{id:"shorts",icon:"content_cut",label:"Long to Shorts"},{id:"divider"},{id:"settings",icon:"settings",label:"Settings"}];function L(r){if(!r)return"Never";const n=Date.now()-new Date(r).getTime(),d=Math.floor(n/6e4);if(d<1)return"Just now";if(d<60)return`${d}m ago`;const g=Math.floor(d/60);if(g<24)return`${g}h ago`;const c=Math.floor(g/24);return c<7?`${c}d ago`:c<30?`${Math.floor(c/7)}w ago`:new Date(r).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function he(r){return r?`${new Date(r).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1})} · ${L(r)}`:"Never"}function ue(){const r=new Date().getHours();return r<12?"Good morning":r<18?"Good afternoon":"Good evening"}function fe(r){return r?new Date(r).toLocaleDateString("en-US",{month:"short",year:"numeric"}):"—"}const G=s.memo(({user:r,activeNav:n,onNav:d,onNavigate:g,isOpen:c,onClose:f})=>{const v=r?.user_metadata?.full_name||r?.email?.split("@")[0]||"Creator",h=v.charAt(0).toUpperCase();return e.jsxs("aside",{className:`sidebar ${c?"sidebar-open":""}`,children:[f&&e.jsx("button",{className:"sidebar-close-btn",onClick:f,"aria-label":"Close menu",children:e.jsx(i,{i:"close",s:18})}),e.jsxs("div",{className:"sidebar-logo",children:[e.jsx("div",{className:"sidebar-logo-icon",children:e.jsx(i,{i:"content_cut",s:16,c:"white"})}),e.jsx("span",{style:{fontSize:"16px",fontWeight:700},children:"ClipCut"})]}),e.jsxs("div",{className:"sidebar-user",children:[e.jsx("div",{className:"sidebar-avatar",children:h}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("p",{style:{fontSize:"12px",fontWeight:600,margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:v}),e.jsx("p",{style:{fontSize:"10px",color:"rgba(255,255,255,0.25)",margin:0},children:"Free Plan"})]})]}),e.jsx("nav",{className:"sidebar-nav",children:be.map(p=>p.id==="divider"?e.jsx("div",{className:"nav-divider"},"div"):e.jsxs("button",{className:`nav-item ${n===p.id?"active":""}`,onClick:()=>{d(p.id),p.id==="shorts"?g("/long-to-shorts"):p.id==="settings"&&g("/settings")},children:[e.jsx(i,{i:p.icon,s:20,fill:p.fill&&n===p.id}),e.jsx("span",{style:{flex:1},children:p.label})]},p.id))}),e.jsx("div",{className:"sidebar-footer",children:"v0.1.0 beta"})]})});G.displayName="Sidebar";const Ce=()=>{const r=oe(),{user:n}=ne(),d=le(),g=s.useRef(null),[c,f]=s.useState("home"),[v,h]=s.useState(!1),[p,V]=s.useState(""),[x,w]=s.useState([]),[u,M]=s.useState(!0),[k,B]=s.useState(null),[Q,N]=s.useState(null),[A,I]=s.useState(""),[U,H]=s.useState(new Set),[F,J]=s.useState(()=>{try{return typeof window<"u"&&localStorage.getItem(Y)==="1"}catch{return!1}}),K=s.useCallback(()=>{try{localStorage.setItem(Y,"1")}catch{}J(!0)},[]),X=n?.user_metadata?.full_name||n?.email?.split("@")[0]||"Creator",R=s.useMemo(()=>x.length===0?null:[...x].sort((a,l)=>new Date(l.savedAt||0)-new Date(a.savedAt||0))[0]?.savedAt,[x]),q=s.useCallback(t=>{if(t.name&&t.name!=="Untitled Project")return t.name;const l=(t.project_data?.clips||[]).find(o=>o.type==="video"&&o.name);return l?.name&&l.name.replace(/\.[^.]+$/,"").trim()||t.name},[]),m=s.useCallback(async()=>{M(!0),B(null);try{const t=await de(n?.id),a=[];for(const o of t){const E=q(o);E!==o.name&&(o.name=E,a.push(O(o.id,n?.id,{name:E}).catch(()=>{})))}a.length>0&&Promise.all(a);const l=t.map(o=>({id:o.id,name:o.name,thumbnail:o.thumbnail_url||o.project_data?.thumbnailDataUrl||null,duration:o.duration_seconds>0?`${Math.floor(o.duration_seconds/60)}:${String(Math.floor(o.duration_seconds%60)).padStart(2,"0")}`:"0:00",resolution:o.resolution||"1080p",savedAt:o.updated_at||o.created_at,isCloud:!o._source||o._source!=="localStorage"}));w(l)}catch(t){S.error("Failed to load projects",{error:t}),B(W(t,"project")),w([])}finally{M(!1)}},[n?.id,q]);s.useEffect(()=>{m();let t=Date.now();const a=()=>{Date.now()-t<3e4||(t=Date.now(),m())};window.addEventListener("focus",a);const l=()=>{t=Date.now(),m()};return window.addEventListener("storage",l),()=>{window.removeEventListener("focus",a),window.removeEventListener("storage",l)}},[m]);const D=s.useCallback(()=>{j(y.dashboardNewProjectClick),g.current?.click()},[]),Z=s.useCallback(t=>{const a=Array.from(t.target.files);a.length>0&&(j(y.dashboardFileImport,{fileCount:a.length}),r("/editor",{state:{filesToImport:a}})),t.target.value=""},[r]),ee=s.useCallback(t=>{j(y.dashboardProjectOpen,{projectId:t.id}),r("/editor",{state:{projectId:t.id,projectName:t.name}})},[r]),T=s.useCallback(async(t,a)=>{if(t.stopPropagation(),window.confirm("Are you sure you want to delete this project?"))try{await ce(a,n?.id),j(y.dashboardProjectDelete,{projectId:a}),w(l=>l.filter(o=>o.id!==a))}catch(l){S.error("Failed to delete project",{error:l,projectId:a}),alert(W(l,"project"))}},[n?.id]),z=s.useCallback((t,a)=>{t.stopPropagation(),N(a.id),I(a.name)},[]),$=s.useCallback(async t=>{const a=A.trim();if(!a||a===x.find(l=>l.id===t)?.name){N(null);return}try{await O(t,n?.id,{name:a}),w(l=>l.map(o=>o.id===t?{...o,name:a}:o))}catch(l){S.error("Failed to rename project",{error:l})}N(null)},[A,x,n?.id]),[b,_]=s.useState(null),te=s.useCallback((t,a)=>{t.preventDefault(),t.stopPropagation(),_({x:t.clientX,y:t.clientY,project:a})},[]),C=s.useCallback(()=>_(null),[]);s.useEffect(()=>{if(!b)return;const t=()=>_(null);return window.addEventListener("click",t),window.addEventListener("contextmenu",t),()=>{window.removeEventListener("click",t),window.removeEventListener("contextmenu",t)}},[b]);const ae=s.useCallback(async t=>{C();try{const a=await pe(t.id,n?.id);if(!a)return;await xe(n?.id,{name:`${t.name} (copy)`,clips:a.project_data?.clips||[],duration:a.duration_seconds||0,resolution:a.resolution||"1080p"})&&m()}catch(a){S.error("Failed to duplicate project",{error:a})}},[n?.id,C,m]),ie=ge(p),P=x.filter(t=>t.name.toLowerCase().includes(ie.toLowerCase())),re=!u&&P.length>0,se=!u&&!k&&P.length===0;return e.jsxs("div",{className:"dash-root",children:[e.jsx("style",{children:me}),e.jsx("input",{ref:g,type:"file",accept:"video/*,audio/*,image/*",multiple:!0,style:{display:"none"},onChange:Z}),e.jsx("div",{className:`sidebar-overlay ${v?"visible":""}`,onClick:()=>h(!1)}),e.jsx(G,{user:n,activeNav:c,onNav:t=>{f(t),d&&h(!1)},onNavigate:r,isOpen:v,onClose:d?()=>h(!1):void 0}),e.jsxs("div",{className:"dash-content",children:[e.jsxs("header",{className:"top-bar",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx("button",{className:"hamburger-btn",onClick:()=>h(t=>!t),"aria-label":"Open menu",children:e.jsx(i,{i:"menu",s:20})}),e.jsxs("div",{children:[e.jsxs("h1",{children:[ue(),", ",X]}),e.jsx("p",{className:"top-bar-sub",children:"Workspace overview"})]})]}),e.jsxs("div",{className:"top-bar-actions",children:[e.jsx("button",{className:"icon-btn",onClick:m,title:"Refresh projects",children:e.jsx(i,{i:"refresh",s:18})}),e.jsx("button",{className:"icon-btn",onClick:()=>r("/settings"),title:"Settings",children:e.jsx(i,{i:"settings",s:18})})]})]}),e.jsx("div",{className:"dash-body",children:e.jsxs("div",{className:`dash-layout ${!d&&F?"dash-layout--single":""}`,children:[e.jsxs("div",{className:"dash-main",children:[e.jsxs("div",{className:"stats-row",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"folder",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:u?"—":x.length}),e.jsx("span",{className:"stat-label",children:"Projects"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"schedule",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:u?"—":L(R)}),e.jsx("span",{className:"stat-label",children:"Last edited"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"calendar_month",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:fe(n?.created_at)}),e.jsx("span",{className:"stat-label",children:"Member since"})]})]})]}),e.jsx("div",{className:"section-label",children:"Quick Actions"}),e.jsxs("div",{className:"quick-actions",children:[e.jsxs("button",{className:"quick-action quick-action--primary",onClick:D,children:[e.jsx("div",{className:"qa-icon",children:e.jsx(i,{i:"add",s:20,c:"white"})}),e.jsx("span",{children:"New Project"})]}),e.jsxs("button",{className:"quick-action",onClick:()=>{j(y.dashboardToolSelect,{tool:"long_to_shorts"}),r("/long-to-shorts")},children:[e.jsx("div",{className:"qa-icon",children:e.jsx(i,{i:"content_cut",s:18,c:"#75AADB"})}),e.jsx("span",{children:"Long to Shorts"}),e.jsx("span",{className:"qa-badge",children:"AI"})]})]}),e.jsxs("div",{className:"projects-header",children:[e.jsx("div",{className:"section-label",style:{margin:0},children:"Your Projects"}),x.length>0&&e.jsxs("div",{className:"proj-search",children:[e.jsx(i,{i:"search"}),e.jsx("input",{type:"text",placeholder:"Search...","aria-label":"Search projects",value:p,onChange:t=>V(t.target.value)})]})]}),k&&e.jsxs("div",{className:"error-banner",children:[e.jsx(i,{i:"cloud_off",s:18,c:"#ef4444"}),e.jsx("span",{children:k}),e.jsx("button",{className:"error-retry",onClick:m,children:"Retry"})]}),u&&!k&&e.jsx("div",{className:"projects-grid",children:[1,2,3,4,5,6].map(t=>e.jsxs("div",{className:"project-card",style:{pointerEvents:"none"},children:[e.jsx("div",{className:"project-thumb skel"}),e.jsxs("div",{className:"project-info",children:[e.jsx("div",{style:{width:"65%",height:"12px",borderRadius:"4px",background:"#1a2332",marginBottom:"5px"}}),e.jsx("div",{style:{width:"35%",height:"10px",borderRadius:"4px",background:"#151b24"}})]})]},t))}),re&&e.jsx("div",{className:"projects-grid",children:P.map(t=>e.jsxs("div",{className:"project-card",onClick:()=>ee(t),onContextMenu:a=>te(a,t),children:[e.jsxs("div",{className:"project-thumb",children:[t.thumbnail&&!U.has(t.id)?e.jsx("img",{src:t.thumbnail,alt:t.name,style:{width:"100%",height:"100%",objectFit:"cover"},onError:()=>H(a=>new Set(a).add(t.id))}):e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:"absolute",inset:0,background:"linear-gradient(135deg, #111820, #0e1218)"},children:e.jsx(i,{i:"movie",s:32,c:"rgba(117,170,219,0.35)"})}),e.jsx("button",{className:"del-btn",onClick:a=>T(a,t.id),"aria-label":`Delete project ${t.name}`,title:"Delete project",children:e.jsx(i,{i:"delete",s:14,c:"white"})})]}),e.jsxs("div",{className:"project-info",children:[Q===t.id?e.jsx("input",{autoFocus:!0,value:A,onChange:a=>I(a.target.value),onBlur:()=>$(t.id),onKeyDown:a=>{a.key==="Enter"&&$(t.id),a.key==="Escape"&&N(null)},onClick:a=>a.stopPropagation(),style:{background:"rgba(117,170,219,0.1)",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"4px",padding:"2px 6px",color:"white",fontSize:"13px",fontWeight:600,fontFamily:"inherit",width:"100%",outline:"none"}}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",minWidth:0},children:[e.jsx("p",{className:"name",onClick:a=>z(a,t),title:"Click to rename",style:{cursor:"text",flex:1,minWidth:0},children:t.name}),e.jsx("button",{onClick:a=>z(a,t),style:{background:"none",border:"none",cursor:"pointer",padding:"2px",opacity:.4,flexShrink:0,display:"flex",alignItems:"center"},title:"Rename","aria-label":`Rename ${t.name}`,children:e.jsx(i,{i:"edit",s:12,c:"rgba(255,255,255,0.5)"})})]}),e.jsxs("p",{className:"meta",children:[t.resolution," · ",he(t.savedAt)]})]})]},t.id))}),b&&e.jsxs("div",{className:"ctx-menu",style:{left:b.x,top:b.y},children:[e.jsxs("button",{className:"ctx-menu-item",onClick:()=>{z({stopPropagation:()=>{}},b.project),C()},children:[e.jsx(i,{i:"edit",s:14})," Rename"]}),e.jsxs("button",{className:"ctx-menu-item",onClick:()=>ae(b.project),children:[e.jsx(i,{i:"content_copy",s:14})," Duplicate"]}),e.jsx("div",{className:"ctx-menu-sep"}),e.jsxs("button",{className:"ctx-menu-item ctx-menu-item--danger",onClick:t=>{T(t,b.project.id),C()},children:[e.jsx(i,{i:"delete",s:14})," Delete"]})]}),se&&e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(i,{i:"movie_edit",s:26,c:"rgba(117,170,219,0.5)"})}),e.jsx("h3",{children:"Start your first project"}),e.jsx("p",{children:"Import a video, image, or audio file to create your first project and start editing."}),e.jsxs("div",{className:"empty-actions",children:[e.jsxs("button",{className:"empty-btn empty-btn--primary",onClick:D,children:[e.jsx(i,{i:"add",s:16,c:"#0a0a0a"}),"Import Media"]}),e.jsxs("button",{className:"empty-btn empty-btn--ghost",onClick:()=>r("/long-to-shorts"),children:[e.jsx(i,{i:"content_cut",s:14}),"Long to Shorts"]})]}),e.jsx("p",{className:"empty-hint",children:"Supports MP4, WebM, MP3, WAV, PNG, JPG and more"})]})]}),!d&&!F&&e.jsxs("aside",{className:"advisor-panel",children:[e.jsxs("div",{className:"advisor-label-row",children:[e.jsxs("div",{className:"advisor-label",children:[e.jsx(i,{i:"assistant",s:14,c:"rgba(255,255,255,0.25)"}),"Advisor"]}),e.jsx("button",{type:"button",className:"advisor-dismiss",onClick:K,"aria-label":"Dismiss advisor panel",title:"Hide advisor",children:e.jsx(i,{i:"close",s:18})})]}),e.jsxs("div",{className:"advisor-item advisor-item--warning",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"shield",s:16,c:"#f59e0b"}),e.jsx("h4",{children:"Account Security"})]}),e.jsx("p",{children:"Strengthen your account by reviewing your security settings."}),e.jsxs("button",{className:"advisor-action advisor-action--warning",onClick:()=>r("/settings"),children:[e.jsx(i,{i:"arrow_forward",s:12,c:"#f59e0b"}),"Review Settings"]})]}),x.length===0&&!u?e.jsxs("div",{className:"advisor-item advisor-item--info",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"rocket_launch",s:16,c:"#75AADB"}),e.jsx("h4",{children:"Getting Started"})]}),e.jsxs("ul",{className:"advisor-checklist",children:[e.jsxs("li",{className:"done",children:[e.jsx(i,{i:"check_circle",s:14,fill:!0}),e.jsx("span",{children:"Create account"})]}),e.jsxs("li",{children:[e.jsx(i,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Import your first media file"})]}),e.jsxs("li",{children:[e.jsx(i,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Edit and export a project"})]})]})]}):x.length>0?e.jsxs("div",{className:"advisor-item advisor-item--success",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"check_circle",s:16,c:"#22c55e"}),e.jsx("h4",{children:"Workspace Active"})]}),e.jsxs("p",{children:[x.length," project",x.length!==1?"s":""," in your workspace. Last edited ",L(R),"."]})]}):null,e.jsxs("div",{className:"advisor-item advisor-item--info",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"auto_awesome",s:16,c:"#75AADB"}),e.jsx("h4",{children:"Long to Shorts"})]}),e.jsx("p",{children:"Convert landscape videos to vertical format with AI-powered speaker tracking and smart reframing."}),e.jsxs("button",{className:"advisor-action advisor-action--info",onClick:()=>r("/long-to-shorts"),children:[e.jsx(i,{i:"arrow_forward",s:12,c:"#75AADB"}),"Try it"]})]})]})]})})]}),d&&e.jsxs("nav",{className:"mobile-bottom-nav",children:[e.jsxs("button",{className:c==="home"?"active":"",onClick:()=>f("home"),children:[e.jsx(i,{i:"home",s:22,fill:c==="home"}),e.jsx("span",{children:"Home"})]}),e.jsxs("button",{onClick:D,children:[e.jsx(i,{i:"add_circle",s:22,c:"#75AADB"}),e.jsx("span",{children:"New"})]}),e.jsxs("button",{className:c==="shorts"?"active":"",onClick:()=>r("/long-to-shorts"),children:[e.jsx(i,{i:"content_cut",s:22}),e.jsx("span",{children:"Reframe"})]}),e.jsxs("button",{className:c==="settings"?"active":"",onClick:()=>r("/settings"),children:[e.jsx(i,{i:"settings",s:22}),e.jsx("span",{children:"Settings"})]})]}),e.jsxs("div",{className:"bw-stripe",role:"presentation",children:[e.jsx("div",{style:{background:"#75AADB"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#000"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#75AADB"}})]})]})};export{Ce as default};
