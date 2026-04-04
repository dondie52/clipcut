import{u as te,r as s,j as e}from"./-P2Ya96f.js";import{u as ie,l as S,g as $,t as j,b as y}from"./D_BVSNiM.js";import{u as ae,l as re,d as se,a as oe,b as ne,s as le}from"./pwcjvWVS.js";import{h as ce}from"./Et-wlZO3.js";import"./DZxFKcQQ.js";import"./B9CjrYEi.js";const T="clipcut-dashboard-advisor-dismissed",de=`
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
    border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px;
  }
  .sidebar-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, #75AADB, #4a7fb5);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 12px; font-weight: 700; color: white;
  }
  .sidebar-nav { flex: 1; padding: 4px 8px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 14px;
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
    font-size: 10px; color: rgba(255,255,255,0.15);
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
    font-size: 18px; font-weight: 700; margin: 0; letter-spacing: -0.3px;
    line-height: 1.3;
  }
  .top-bar-sub {
    font-size: 11px; color: rgba(255,255,255,0.3); margin: 2px 0 0;
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
    background: rgba(117,170,219,0.07); display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
  }
  .stat-value {
    font-size: 15px; font-weight: 700; display: block; line-height: 1.2;
  }
  .stat-label {
    font-size: 10px; color: rgba(255,255,255,0.3); display: block;
    margin-top: 1px; letter-spacing: 0.2px;
  }

  /* ---- Section Labels ---- */
  .section-label {
    font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.25);
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
  .project-info .meta { font-size: 11px; color: rgba(255,255,255,0.25); margin: 0; }
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
    width: 52px; height: 52px; border-radius: 14px; margin: 0 auto 16px;
    background: rgba(117,170,219,0.06); display: flex;
    align-items: center; justify-content: center;
  }
  .empty-state h3 {
    font-size: 15px; font-weight: 700; margin: 0 0 6px; color: rgba(255,255,255,0.9);
  }
  .empty-state p {
    font-size: 12px; color: rgba(255,255,255,0.35); margin: 0 auto 20px;
    line-height: 1.6; max-width: 300px;
  }
  .empty-actions { display: flex; gap: 8px; justify-content: center; }
  .empty-btn {
    display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px;
    border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;
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
    margin-top: 18px; font-size: 11px; color: rgba(255,255,255,0.15);
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
    font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.25);
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
    .top-bar h1 { font-size: 16px; }
    .dash-body { padding: 16px 16px 80px; }
    .projects-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
    .projects-header { flex-direction: column; align-items: stretch; gap: 8px; }
    .proj-search { width: 100%; }
    .empty-state { padding: 32px 16px; }
    .bw-stripe { bottom: 56px; }
  }

  @media (max-width: 400px) {
    .projects-grid { grid-template-columns: 1fr; }
    .stats-row { gap: 8px; }
    .top-bar h1 { font-size: 14px; }
  }
`,a=({i:r,s:n=20,c:l,fill:x=!1,style:c})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:n,color:l,fontVariationSettings:x?"'FILL' 1":"'FILL' 0",...c},children:r}),pe=[{id:"home",icon:"home",label:"Home",fill:!0},{id:"templates",icon:"dashboard",label:"Templates"},{id:"shorts",icon:"content_cut",label:"Long to Shorts"},{id:"divider"},{id:"settings",icon:"settings",label:"Settings"}];function E(r){if(!r)return"Never";const n=Date.now()-new Date(r).getTime(),l=Math.floor(n/6e4);if(l<1)return"Just now";if(l<60)return`${l}m ago`;const x=Math.floor(l/60);if(x<24)return`${x}h ago`;const c=Math.floor(x/24);return c<7?`${c}d ago`:c<30?`${Math.floor(c/7)}w ago`:new Date(r).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function xe(r){return r?`${new Date(r).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1})} · ${E(r)}`:"Never"}function ge(){const r=new Date().getHours();return r<12?"Good morning":r<18?"Good afternoon":"Good evening"}function be(r){return r?new Date(r).toLocaleDateString("en-US",{month:"short",year:"numeric"}):"—"}const Y=s.memo(({user:r,activeNav:n,onNav:l,onNavigate:x,isOpen:c,onClose:u})=>{const f=r?.user_metadata?.full_name||r?.email?.split("@")[0]||"Creator",h=f.charAt(0).toUpperCase();return e.jsxs("aside",{className:`sidebar ${c?"sidebar-open":""}`,children:[u&&e.jsx("button",{className:"sidebar-close-btn",onClick:u,"aria-label":"Close menu",children:e.jsx(a,{i:"close",s:18})}),e.jsxs("div",{className:"sidebar-logo",children:[e.jsx("div",{className:"sidebar-logo-icon",children:e.jsx(a,{i:"content_cut",s:16,c:"white"})}),e.jsx("span",{style:{fontSize:"16px",fontWeight:700},children:"ClipCut"})]}),e.jsxs("div",{className:"sidebar-user",children:[e.jsx("div",{className:"sidebar-avatar",children:h}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("p",{style:{fontSize:"12px",fontWeight:600,margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:f}),e.jsx("p",{style:{fontSize:"10px",color:"rgba(255,255,255,0.25)",margin:0},children:"Free Plan"})]})]}),e.jsx("nav",{className:"sidebar-nav",children:pe.map(d=>d.id==="divider"?e.jsx("div",{className:"nav-divider"},"div"):e.jsxs("button",{className:`nav-item ${n===d.id?"active":""}`,onClick:()=>{l(d.id),d.id==="shorts"?x("/long-to-shorts"):d.id==="settings"&&x("/settings")},children:[e.jsx(a,{i:d.icon,s:20,fill:d.fill&&n===d.id}),e.jsx("span",{style:{flex:1},children:d.label})]},d.id))}),e.jsx("div",{className:"sidebar-footer",children:"v0.1.0 beta"})]})});Y.displayName="Sidebar";const ye=()=>{const r=te(),{user:n}=ie(),l=ae(),x=s.useRef(null),[c,u]=s.useState("home"),[f,h]=s.useState(!1),[d,O]=s.useState(""),[p,w]=s.useState([]),[m,P]=s.useState(!0),[k,L]=s.useState(null),[W,N]=s.useState(null),[A,M]=s.useState(""),[B,G]=s.useState(()=>{try{return typeof window<"u"&&localStorage.getItem(T)==="1"}catch{return!1}}),Q=s.useCallback(()=>{try{localStorage.setItem(T,"1")}catch{}G(!0)},[]),V=n?.user_metadata?.full_name||n?.email?.split("@")[0]||"Creator",I=s.useMemo(()=>p.length===0?null:[...p].sort((i,o)=>new Date(o.savedAt||0)-new Date(i.savedAt||0))[0]?.savedAt,[p]),g=s.useCallback(async()=>{P(!0),L(null);try{const i=(await re(n?.id)).map(o=>({id:o.id,name:o.name,thumbnail:o.thumbnail_url,duration:o.duration_seconds>0?`${Math.floor(o.duration_seconds/60)}:${String(Math.floor(o.duration_seconds%60)).padStart(2,"0")}`:"0:00",resolution:o.resolution||"1080p",savedAt:o.updated_at||o.created_at,isCloud:!o._source||o._source!=="localStorage"}));w(i)}catch(t){S.error("Failed to load projects",{error:t}),L($(t,"project")),w([])}finally{P(!1)}},[n?.id]);s.useEffect(()=>{g();const t=()=>g();window.addEventListener("focus",t);const i=()=>g();return window.addEventListener("storage",i),()=>{window.removeEventListener("focus",t),window.removeEventListener("storage",i)}},[g]);const z=s.useCallback(()=>{j(y.dashboardNewProjectClick),x.current?.click()},[]),H=s.useCallback(t=>{const i=Array.from(t.target.files);i.length>0&&(j(y.dashboardFileImport,{fileCount:i.length}),r("/editor",{state:{filesToImport:i}})),t.target.value=""},[r]),U=s.useCallback(t=>{j(y.dashboardProjectOpen,{projectId:t.id}),r("/editor",{state:{projectId:t.id,projectName:t.name}})},[r]),F=s.useCallback(async(t,i)=>{if(t.stopPropagation(),window.confirm("Are you sure you want to delete this project?"))try{await se(i,n?.id),j(y.dashboardProjectDelete,{projectId:i}),w(o=>o.filter(v=>v.id!==i))}catch(o){S.error("Failed to delete project",{error:o,projectId:i}),alert($(o,"project"))}},[n?.id]),q=s.useCallback((t,i)=>{t.stopPropagation(),N(i.id),M(i.name)},[]),R=s.useCallback(async t=>{const i=A.trim();if(!i||i===p.find(o=>o.id===t)?.name){N(null);return}try{await oe(t,n?.id,{name:i}),w(o=>o.map(v=>v.id===t?{...v,name:i}:v))}catch(o){S.error("Failed to rename project",{error:o})}N(null)},[A,p,n?.id]),[b,D]=s.useState(null),J=s.useCallback((t,i)=>{t.preventDefault(),t.stopPropagation(),D({x:t.clientX,y:t.clientY,project:i})},[]),C=s.useCallback(()=>D(null),[]);s.useEffect(()=>{if(!b)return;const t=()=>D(null);return window.addEventListener("click",t),window.addEventListener("contextmenu",t),()=>{window.removeEventListener("click",t),window.removeEventListener("contextmenu",t)}},[b]);const K=s.useCallback(async t=>{C();try{const i=await ne(t.id,n?.id);if(!i)return;await le(n?.id,{name:`${t.name} (copy)`,clips:i.project_data?.clips||[],duration:i.duration_seconds||0,resolution:i.resolution||"1080p"})&&g()}catch(i){S.error("Failed to duplicate project",{error:i})}},[n?.id,C,g]),X=ce(d),_=p.filter(t=>t.name.toLowerCase().includes(X.toLowerCase())),Z=!m&&_.length>0,ee=!m&&!k&&_.length===0;return e.jsxs("div",{className:"dash-root",children:[e.jsx("style",{children:de}),e.jsx("input",{ref:x,type:"file",accept:"video/*,audio/*,image/*",multiple:!0,style:{display:"none"},onChange:H}),e.jsx("div",{className:`sidebar-overlay ${f?"visible":""}`,onClick:()=>h(!1)}),e.jsx(Y,{user:n,activeNav:c,onNav:t=>{u(t),l&&h(!1)},onNavigate:r,isOpen:f,onClose:l?()=>h(!1):void 0}),e.jsxs("div",{className:"dash-content",children:[e.jsxs("header",{className:"top-bar",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx("button",{className:"hamburger-btn",onClick:()=>h(t=>!t),"aria-label":"Open menu",children:e.jsx(a,{i:"menu",s:20})}),e.jsxs("div",{children:[e.jsxs("h1",{children:[ge(),", ",V]}),e.jsx("p",{className:"top-bar-sub",children:"Workspace overview"})]})]}),e.jsxs("div",{className:"top-bar-actions",children:[e.jsx("button",{className:"icon-btn",onClick:g,title:"Refresh projects",children:e.jsx(a,{i:"refresh",s:18})}),e.jsx("button",{className:"icon-btn",onClick:()=>r("/settings"),title:"Settings",children:e.jsx(a,{i:"settings",s:18})})]})]}),e.jsx("div",{className:"dash-body",children:e.jsxs("div",{className:`dash-layout ${!l&&B?"dash-layout--single":""}`,children:[e.jsxs("div",{className:"dash-main",children:[e.jsxs("div",{className:"stats-row",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(a,{i:"folder",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:m?"—":p.length}),e.jsx("span",{className:"stat-label",children:"Projects"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(a,{i:"schedule",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:m?"—":E(I)}),e.jsx("span",{className:"stat-label",children:"Last edited"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(a,{i:"calendar_month",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:be(n?.created_at)}),e.jsx("span",{className:"stat-label",children:"Member since"})]})]})]}),e.jsx("div",{className:"section-label",children:"Quick Actions"}),e.jsxs("div",{className:"quick-actions",children:[e.jsxs("button",{className:"quick-action quick-action--primary",onClick:z,children:[e.jsx("div",{className:"qa-icon",children:e.jsx(a,{i:"add",s:20,c:"white"})}),e.jsx("span",{children:"New Project"})]}),e.jsxs("button",{className:"quick-action",onClick:()=>{j(y.dashboardToolSelect,{tool:"long_to_shorts"}),r("/long-to-shorts")},children:[e.jsx("div",{className:"qa-icon",children:e.jsx(a,{i:"content_cut",s:18,c:"#75AADB"})}),e.jsx("span",{children:"Long to Shorts"}),e.jsx("span",{className:"qa-badge",children:"AI"})]})]}),e.jsxs("div",{className:"projects-header",children:[e.jsx("div",{className:"section-label",style:{margin:0},children:"Your Projects"}),p.length>0&&e.jsxs("div",{className:"proj-search",children:[e.jsx(a,{i:"search"}),e.jsx("input",{type:"text",placeholder:"Search...","aria-label":"Search projects",value:d,onChange:t=>O(t.target.value)})]})]}),k&&e.jsxs("div",{className:"error-banner",children:[e.jsx(a,{i:"cloud_off",s:18,c:"#ef4444"}),e.jsx("span",{children:k}),e.jsx("button",{className:"error-retry",onClick:g,children:"Retry"})]}),m&&!k&&e.jsx("div",{className:"projects-grid",children:[1,2,3,4,5,6].map(t=>e.jsxs("div",{className:"project-card",style:{pointerEvents:"none"},children:[e.jsx("div",{className:"project-thumb skel"}),e.jsxs("div",{className:"project-info",children:[e.jsx("div",{style:{width:"65%",height:"12px",borderRadius:"4px",background:"#1a2332",marginBottom:"5px"}}),e.jsx("div",{style:{width:"35%",height:"10px",borderRadius:"4px",background:"#151b24"}})]})]},t))}),Z&&e.jsx("div",{className:"projects-grid",children:_.map(t=>e.jsxs("div",{className:"project-card",onClick:()=>U(t),onContextMenu:i=>J(i,t),children:[e.jsxs("div",{className:"project-thumb",children:[t.thumbnail?e.jsx("img",{src:t.thumbnail,alt:t.name,style:{width:"100%",height:"100%",objectFit:"cover"},onError:i=>{i.target.style.display="none",i.target.nextSibling&&(i.target.nextSibling.style.display="flex")}}):null,e.jsx("div",{style:{display:t.thumbnail?"none":"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:"absolute",inset:0,background:"linear-gradient(135deg, #111820, #0e1218)"},children:e.jsx(a,{i:"movie",s:32,c:"rgba(117,170,219,0.2)"})}),e.jsx("button",{className:"del-btn",onClick:i=>F(i,t.id),"aria-label":`Delete project ${t.name}`,title:"Delete project",children:e.jsx(a,{i:"delete",s:14,c:"white"})})]}),e.jsxs("div",{className:"project-info",children:[W===t.id?e.jsx("input",{autoFocus:!0,value:A,onChange:i=>M(i.target.value),onBlur:()=>R(t.id),onKeyDown:i=>{i.key==="Enter"&&R(t.id),i.key==="Escape"&&N(null)},onClick:i=>i.stopPropagation(),style:{background:"rgba(117,170,219,0.1)",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"4px",padding:"2px 6px",color:"white",fontSize:"13px",fontWeight:600,fontFamily:"inherit",width:"100%",outline:"none"}}):e.jsx("p",{className:"name",onDoubleClick:i=>q(i,t),title:"Double-click to rename",children:t.name}),e.jsxs("p",{className:"meta",children:[t.resolution," · ",xe(t.savedAt)]})]})]},t.id))}),b&&e.jsxs("div",{className:"ctx-menu",style:{left:b.x,top:b.y},children:[e.jsxs("button",{className:"ctx-menu-item",onClick:()=>{q({stopPropagation:()=>{}},b.project),C()},children:[e.jsx(a,{i:"edit",s:14})," Rename"]}),e.jsxs("button",{className:"ctx-menu-item",onClick:()=>K(b.project),children:[e.jsx(a,{i:"content_copy",s:14})," Duplicate"]}),e.jsx("div",{className:"ctx-menu-sep"}),e.jsxs("button",{className:"ctx-menu-item ctx-menu-item--danger",onClick:t=>{F(t,b.project.id),C()},children:[e.jsx(a,{i:"delete",s:14})," Delete"]})]}),ee&&e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(a,{i:"movie_edit",s:26,c:"rgba(117,170,219,0.5)"})}),e.jsx("h3",{children:"Your workspace is ready"}),e.jsx("p",{children:"Import a video, image, or audio file to create your first project and start editing."}),e.jsxs("div",{className:"empty-actions",children:[e.jsxs("button",{className:"empty-btn empty-btn--primary",onClick:z,children:[e.jsx(a,{i:"add",s:16,c:"#0a0a0a"}),"Import Media"]}),e.jsxs("button",{className:"empty-btn empty-btn--ghost",onClick:()=>r("/long-to-shorts"),children:[e.jsx(a,{i:"content_cut",s:14}),"Long to Shorts"]})]}),e.jsx("p",{className:"empty-hint",children:"Supports MP4, WebM, MP3, WAV, PNG, JPG and more"})]})]}),!l&&!B&&e.jsxs("aside",{className:"advisor-panel",children:[e.jsxs("div",{className:"advisor-label-row",children:[e.jsxs("div",{className:"advisor-label",children:[e.jsx(a,{i:"assistant",s:14,c:"rgba(255,255,255,0.25)"}),"Advisor"]}),e.jsx("button",{type:"button",className:"advisor-dismiss",onClick:Q,"aria-label":"Dismiss advisor panel",title:"Hide advisor",children:e.jsx(a,{i:"close",s:18})})]}),e.jsxs("div",{className:"advisor-item advisor-item--warning",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(a,{i:"shield",s:16,c:"#f59e0b"}),e.jsx("h4",{children:"Account Security"})]}),e.jsx("p",{children:"Strengthen your account by reviewing your security settings."}),e.jsxs("button",{className:"advisor-action advisor-action--warning",onClick:()=>r("/settings"),children:[e.jsx(a,{i:"arrow_forward",s:12,c:"#f59e0b"}),"Review Settings"]})]}),p.length===0&&!m?e.jsxs("div",{className:"advisor-item advisor-item--info",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(a,{i:"rocket_launch",s:16,c:"#75AADB"}),e.jsx("h4",{children:"Getting Started"})]}),e.jsxs("ul",{className:"advisor-checklist",children:[e.jsxs("li",{className:"done",children:[e.jsx(a,{i:"check_circle",s:14,fill:!0}),e.jsx("span",{children:"Create account"})]}),e.jsxs("li",{children:[e.jsx(a,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Import your first media file"})]}),e.jsxs("li",{children:[e.jsx(a,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Edit and export a project"})]})]})]}):p.length>0?e.jsxs("div",{className:"advisor-item advisor-item--success",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(a,{i:"check_circle",s:16,c:"#22c55e"}),e.jsx("h4",{children:"Workspace Active"})]}),e.jsxs("p",{children:[p.length," project",p.length!==1?"s":""," in your workspace. Last edited ",E(I),"."]})]}):null,e.jsxs("div",{className:"advisor-item advisor-item--info",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(a,{i:"auto_awesome",s:16,c:"#75AADB"}),e.jsx("h4",{children:"Long to Shorts"})]}),e.jsx("p",{children:"Convert landscape videos to vertical format with AI-powered speaker tracking and smart reframing."}),e.jsxs("button",{className:"advisor-action advisor-action--info",onClick:()=>r("/long-to-shorts"),children:[e.jsx(a,{i:"arrow_forward",s:12,c:"#75AADB"}),"Try it"]})]})]})]})})]}),l&&e.jsxs("nav",{className:"mobile-bottom-nav",children:[e.jsxs("button",{className:c==="home"?"active":"",onClick:()=>u("home"),children:[e.jsx(a,{i:"home",s:22,fill:c==="home"}),e.jsx("span",{children:"Home"})]}),e.jsxs("button",{onClick:z,children:[e.jsx(a,{i:"add_circle",s:22,c:"#75AADB"}),e.jsx("span",{children:"New"})]}),e.jsxs("button",{className:c==="shorts"?"active":"",onClick:()=>r("/long-to-shorts"),children:[e.jsx(a,{i:"content_cut",s:22}),e.jsx("span",{children:"Shorts"})]}),e.jsxs("button",{className:c==="settings"?"active":"",onClick:()=>r("/settings"),children:[e.jsx(a,{i:"settings",s:22}),e.jsx("span",{children:"Settings"})]})]}),e.jsxs("div",{className:"bw-stripe",role:"presentation",children:[e.jsx("div",{style:{background:"#75AADB"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#000"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#75AADB"}})]})]})};export{ye as default};
