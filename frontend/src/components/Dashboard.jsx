/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2026 ClipCut Contributors / Bokas Technologies (Pty) Ltd
 * Licensed under the MIT License
 *
 * @module components/Dashboard
 * @description Main dashboard — project management, quick actions, advisor panel
 */

import { useState, useRef, useCallback, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../supabase/AuthContext";
import { useMobile } from "../hooks/useMobile";
import { listProjects as listCloudProjects, deleteProject as deleteCloudProject, updateProject as updateCloudProject, loadProject as loadCloudProject, saveProject as saveCloudProject, listProjectsFromLocalStorage, migrateLocalProjectsToCloud } from "../services/projectService";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { logger } from "../utils/logger";
import { sanitizeSearchQuery } from "../utils/validation";
import { getUserFriendlyMessage } from "../utils/errorHandling";

const ADVISOR_DISMISSED_KEY = "clipcut-dashboard-advisor-dismissed";

/* ========== CSS ========== */
const DASH_CSS = `
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
`;

/* ========== ICON HELPER ========== */
const I = ({ i, s = 20, c, fill = false, style: sx }) => (
  <span className="material-symbols-outlined" style={{
    fontSize: s, color: c,
    fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
    ...sx,
  }}>{i}</span>
);

/* ========== NAV ITEMS ========== */
const NAV_ITEMS = [
  { id: "home", icon: "home", label: "Home", fill: true },
  { id: "divider" },
  { id: "settings", icon: "settings", label: "Settings" },
];

/* ========== HELPERS ========== */
function relativeTime(dateStr) {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatEditTime(dateStr) {
  if (!dateStr) return "Never";
  const d = new Date(dateStr);
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${time} · ${relativeTime(dateStr)}`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatJoinDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* ========== SIDEBAR ========== */
const Sidebar = memo(({ user, activeNav, onNav, onNavigate, onLogout, isOpen, onClose }) => {
  const displayName = user?.user_metadata?.full_name
    || user?.email?.split("@")[0]
    || "Creator";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      {onClose && (
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
          <I i="close" s={18} />
        </button>
      )}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <I i="content_cut" s={16} c="white" />
        </div>
        <span style={{ fontSize: "16px", fontWeight: 700 }}>ClipCut</span>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{initial}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "12px", fontWeight: 600, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {displayName}
          </p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            Free Plan
          </p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) =>
          item.id === "divider" ? (
            <div key="div" className="nav-divider" />
          ) : (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => {
                onNav(item.id);
                if (item.id === "settings") onNavigate("/settings");
              }}
            >
              <I i={item.icon} s={20} fill={item.fill && activeNav === item.id} />
              <span style={{ flex: 1 }}>{item.label}</span>
            </button>
          )
        )}
      </nav>

      <button className="sidebar-logout" onClick={onLogout}>
        <I i="logout" s={20} />
        <span style={{ flex: 1 }}>Log out</span>
      </button>

      <div className="sidebar-footer">v0.1.0 beta</div>
    </aside>
  );
});
Sidebar.displayName = "Sidebar";

/* ========== MAIN DASHBOARD ========== */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isMobile = useMobile();
  const fileInputRef = useRef(null);
  const migrationTriggeredRef = useRef(false);
  const [activeNav, setActiveNav] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [failedThumbs, setFailedThumbs] = useState(new Set());
  const [advisorDismissed, setAdvisorDismissed] = useState(() => {
    try {
      return typeof window !== "undefined" && localStorage.getItem(ADVISOR_DISMISSED_KEY) === "1";
    } catch {
      return false;
    }
  });

  const dismissAdvisor = useCallback(() => {
    try {
      localStorage.setItem(ADVISOR_DISMISSED_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
    setAdvisorDismissed(true);
  }, []);

  // Derived state
  const displayName = user?.user_metadata?.full_name
    || user?.email?.split("@")[0]
    || "Creator";

  const lastEdited = useMemo(() => {
    if (projects.length === 0) return null;
    const sorted = [...projects].sort((a, b) =>
      new Date(b.savedAt || 0) - new Date(a.savedAt || 0)
    );
    return sorted[0]?.savedAt;
  }, [projects]);

  // Load projects from cloud or localStorage
  /** Derive a project name from clip data when the project is still "Untitled Project". */
  const deriveProjectName = useCallback((p) => {
    if (p.name && p.name !== "Untitled Project") return p.name;
    const clips = p.project_data?.clips || [];
    const firstVideo = clips.find(c => c.type === "video" && c.name);
    if (firstVideo?.name) {
      return firstVideo.name.replace(/\.[^.]+$/, "").trim() || p.name;
    }
    return p.name;
  }, []);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const cloudProjects = await listCloudProjects(user?.id);

      // Check for localStorage projects stranded by failed saves or expired sessions
      let localOnly = [];
      try {
        const localProjects = listProjectsFromLocalStorage();
        const cloudIds = new Set(cloudProjects.map(p => p.id));
        localOnly = localProjects.filter(p => !cloudIds.has(p.id));
      } catch { /* localStorage unavailable */ }

      const allProjects = [...cloudProjects, ...localOnly];

      // Background migration: push stranded local projects to Supabase
      if (user?.id && localOnly.length > 0 && !migrationTriggeredRef.current) {
        migrationTriggeredRef.current = true;
        migrateLocalProjectsToCloud(user.id)
          .then(count => {
            if (count > 0) {
              logger.info(`Migrated ${count} local project(s) to cloud`);
              loadProjects();
            }
          })
          .catch(err => logger.warn("Local project migration failed", { error: err }));
      }

      // Auto-fix "Untitled Project" names from clip data and persist to DB
      const renamePromises = [];
      for (const p of allProjects) {
        const derived = deriveProjectName(p);
        if (derived !== p.name) {
          p.name = derived;
          if (p._source !== "localStorage") {
            renamePromises.push(
              updateCloudProject(p.id, user?.id, { name: derived }).catch(() => {})
            );
          }
        }
      }
      // Fire-and-forget: update names in background
      if (renamePromises.length > 0) Promise.all(renamePromises);

      const formattedProjects = allProjects.map(p => ({
        id: p.id,
        name: p.name,
        thumbnail: p.thumbnail_url || p.project_data?.thumbnailDataUrl || null,
        duration: p.duration_seconds > 0
          ? `${Math.floor(p.duration_seconds / 60)}:${String(Math.floor(p.duration_seconds % 60)).padStart(2, "0")}`
          : "0:00",
        resolution: p.resolution || "1080p",
        savedAt: p.updated_at || p.created_at,
        isCloud: !p._source || p._source !== "localStorage",
      }));
      setProjects(formattedProjects);
    } catch (e) {
      logger.error("Failed to load projects", { error: e });
      setLoadError(getUserFriendlyMessage(e, "project"));
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, deriveProjectName]);

  useEffect(() => {
    loadProjects();
    // Debounce focus-triggered reloads: ignore if last load was < 30s ago
    let lastLoadTime = Date.now();
    const handleFocus = () => {
      if (Date.now() - lastLoadTime < 30000) return;
      lastLoadTime = Date.now();
      loadProjects();
    };
    window.addEventListener("focus", handleFocus);
    const handleStorageChange = () => {
      lastLoadTime = Date.now();
      loadProjects();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadProjects]);

  const handleNewProject = useCallback(() => {
    trackEvent(analyticsEvents.dashboardNewProjectClick);
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      trackEvent(analyticsEvents.dashboardFileImport, { fileCount: files.length });
      navigate("/editor", { state: { filesToImport: files } });
    }
    e.target.value = "";
  }, [navigate]);

  const handleLoadProject = useCallback((project) => {
    trackEvent(analyticsEvents.dashboardProjectOpen, { projectId: project.id });
    navigate("/editor", {
      state: {
        projectId: project.id,
        projectName: project.name,
      },
    });
  }, [navigate]);

  const handleDeleteProject = useCallback(async (e, projectId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteCloudProject(projectId, user?.id);
        // Also clean up any localStorage entries (no-op if not present)
        try {
          localStorage.removeItem(`clipcut_project_${projectId}`);
          localStorage.removeItem(`clipcut_autosave_${projectId}`);
          localStorage.removeItem(`clipcut_migrated_${projectId}`);
        } catch { /* localStorage unavailable */ }
        trackEvent(analyticsEvents.dashboardProjectDelete, { projectId });
        setProjects(prev => prev.filter(p => p.id !== projectId));
      } catch (err) {
        logger.error("Failed to delete project", { error: err, projectId });
        alert(getUserFriendlyMessage(err, "project"));
      }
    }
  }, [user?.id]);

  const handleStartRename = useCallback((e, project) => {
    e.stopPropagation();
    setRenamingId(project.id);
    setRenameValue(project.name);
  }, []);

  const handleFinishRename = useCallback(async (projectId) => {
    const trimmed = renameValue.trim();
    if (!trimmed || trimmed === projects.find(p => p.id === projectId)?.name) {
      setRenamingId(null);
      return;
    }
    try {
      await updateCloudProject(projectId, user?.id, { name: trimmed });
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, name: trimmed } : p));
    } catch (err) {
      logger.error("Failed to rename project", { error: err });
    }
    setRenamingId(null);
  }, [renameValue, projects, user?.id]);

  // Context menu state
  const [ctxMenu, setCtxMenu] = useState(null); // { x, y, project }

  const handleContextMenu = useCallback((e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu({ x: e.clientX, y: e.clientY, project });
  }, []);

  const closeCtxMenu = useCallback(() => setCtxMenu(null), []);

  // Close context menu when clicking anywhere
  useEffect(() => {
    if (!ctxMenu) return;
    const handler = () => setCtxMenu(null);
    window.addEventListener("click", handler);
    window.addEventListener("contextmenu", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("contextmenu", handler);
    };
  }, [ctxMenu]);

  const handleDuplicateProject = useCallback(async (project) => {
    closeCtxMenu();
    try {
      const full = await loadCloudProject(project.id, user?.id);
      if (!full) return;
      const saved = await saveCloudProject(user?.id, {
        name: `${project.name} (copy)`,
        clips: full.project_data?.clips || [],
        duration: full.duration_seconds || 0,
        resolution: full.resolution || "1080p",
      });
      if (saved) loadProjects();
    } catch (err) {
      logger.error("Failed to duplicate project", { error: err });
    }
  }, [user?.id, closeCtxMenu, loadProjects]);

  const sanitizedQuery = sanitizeSearchQuery(searchQuery);
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(sanitizedQuery.toLowerCase())
  );

  const hasProjects = !isLoading && filteredProjects.length > 0;
  const showEmpty = !isLoading && !loadError && filteredProjects.length === 0;

  return (
    <div className="dash-root">
      <style>{DASH_CSS}</style>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,audio/*,image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Mobile sidebar overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        user={user}
        activeNav={activeNav}
        onNav={(id) => { setActiveNav(id); if (isMobile) setSidebarOpen(false); }}
        onNavigate={navigate}
        onLogout={async () => { await signOut(); navigate("/login"); }}
        isOpen={sidebarOpen}
        onClose={isMobile ? () => setSidebarOpen(false) : undefined}
      />

      <div className="dash-content">
        {/* ===== TOP BAR ===== */}
        <header className="top-bar">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Open menu"
            >
              <I i="menu" s={20} />
            </button>
            <div>
              <h1>{getGreeting()}, {displayName}</h1>
              <p className="top-bar-sub">Workspace overview</p>
            </div>
          </div>
          <div className="top-bar-actions">
            <button
              className="icon-btn"
              onClick={loadProjects}
              title="Refresh projects"
            >
              <I i="refresh" s={18} />
            </button>
            <button
              className="icon-btn"
              onClick={() => navigate("/settings")}
              title="Settings"
            >
              <I i="settings" s={18} />
            </button>
          </div>
        </header>

        {/* ===== SCROLLABLE BODY ===== */}
        <div className="dash-body">
          <div className={`dash-layout ${!isMobile && advisorDismissed ? "dash-layout--single" : ""}`}>

            {/* ===== LEFT: MAIN CONTENT ===== */}
            <div className="dash-main">

              {/* Stats Row */}
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon">
                    <I i="folder" s={18} c="#75AADB" />
                  </div>
                  <div>
                    <span className="stat-value">{isLoading ? "—" : projects.length}</span>
                    <span className="stat-label">Projects</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <I i="schedule" s={18} c="#75AADB" />
                  </div>
                  <div>
                    <span className="stat-value">{isLoading ? "—" : relativeTime(lastEdited)}</span>
                    <span className="stat-label">Last edited</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <I i="calendar_month" s={18} c="#75AADB" />
                  </div>
                  <div>
                    <span className="stat-value">{formatJoinDate(user?.created_at)}</span>
                    <span className="stat-label">Member since</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="section-label">Quick Actions</div>
              <div className="quick-actions">
                <button className="quick-action quick-action--primary" onClick={handleNewProject}>
                  <div className="qa-icon">
                    <I i="add" s={20} c="white" />
                  </div>
                  <span>New Project</span>
                </button>
              </div>

              {/* Projects */}
              <div className="projects-header">
                <div className="section-label" style={{ margin: 0 }}>Your Projects</div>
                {projects.length > 0 && (
                  <div className="proj-search">
                    <I i="search" />
                    <input
                      type="text"
                      placeholder="Search..."
                      aria-label="Search projects"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Error banner */}
              {loadError && (
                <div className="error-banner">
                  <I i="cloud_off" s={18} c="#ef4444" />
                  <span>{loadError}</span>
                  <button className="error-retry" onClick={loadProjects}>Retry</button>
                </div>
              )}

              {/* Loading skeleton */}
              {isLoading && !loadError && (
                <div className="projects-grid">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="project-card" style={{ pointerEvents: "none" }}>
                      <div className="project-thumb skel" />
                      <div className="project-info">
                        <div style={{ width: "65%", height: "12px", borderRadius: "4px", background: "#1a2332", marginBottom: "5px" }} />
                        <div style={{ width: "35%", height: "10px", borderRadius: "4px", background: "#151b24" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects grid */}
              {hasProjects && (
                <div className="projects-grid">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="project-card"
                      onClick={() => handleLoadProject(project)}
                      onContextMenu={(e) => handleContextMenu(e, project)}
                    >
                      <div className="project-thumb">
                        {project.thumbnail && !failedThumbs.has(project.id) ? (
                          <img
                            src={project.thumbnail}
                            alt={project.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={() => setFailedThumbs(prev => new Set(prev).add(project.id))}
                          />
                        ) : (
                          <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', height: '100%', position: 'absolute', inset: 0,
                            background: 'linear-gradient(135deg, #111820, #0e1218)',
                          }}>
                            <I i="movie" s={32} c="rgba(117,170,219,0.35)" />
                          </div>
                        )}
                        <button
                          className="del-btn"
                          onClick={(e) => handleDeleteProject(e, project.id)}
                          aria-label={`Delete project ${project.name}`}
                          title="Delete project"
                        >
                          <I i="delete" s={14} c="white" />
                        </button>
                      </div>
                      <div className="project-info">
                        {renamingId === project.id ? (
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onBlur={() => handleFinishRename(project.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleFinishRename(project.id);
                              if (e.key === 'Escape') setRenamingId(null);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              background: 'rgba(117,170,219,0.1)', border: '1px solid rgba(117,170,219,0.3)',
                              borderRadius: '4px', padding: '2px 6px', color: 'white',
                              fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
                              width: '100%', outline: 'none',
                            }}
                          />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                            <p
                              className="name"
                              onClick={(e) => handleStartRename(e, project)}
                              title="Click to rename"
                              style={{ cursor: 'text', flex: 1, minWidth: 0 }}
                            >
                              {project.name}
                            </p>
                            <button
                              onClick={(e) => handleStartRename(e, project)}
                              style={{
                                background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                                opacity: 0.4, flexShrink: 0, display: 'flex', alignItems: 'center',
                              }}
                              title="Rename"
                              aria-label={`Rename ${project.name}`}
                            >
                              <I i="edit" s={12} c="rgba(255,255,255,0.5)" />
                            </button>
                          </div>
                        )}
                        <p className="meta">
                          {project.resolution} · {formatEditTime(project.savedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Right-click context menu */}
              {ctxMenu && (
                <div className="ctx-menu" style={{ left: ctxMenu.x, top: ctxMenu.y }}>
                  <button className="ctx-menu-item" onClick={() => { handleStartRename({ stopPropagation: () => {} }, ctxMenu.project); closeCtxMenu(); }}>
                    <I i="edit" s={14} /> Rename
                  </button>
                  <button className="ctx-menu-item" onClick={() => handleDuplicateProject(ctxMenu.project)}>
                    <I i="content_copy" s={14} /> Duplicate
                  </button>
                  <div className="ctx-menu-sep" />
                  <button className="ctx-menu-item ctx-menu-item--danger" onClick={(e) => { handleDeleteProject(e, ctxMenu.project.id); closeCtxMenu(); }}>
                    <I i="delete" s={14} /> Delete
                  </button>
                </div>
              )}

              {/* Empty state */}
              {showEmpty && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <I i="movie_edit" s={26} c="rgba(117,170,219,0.5)" />
                  </div>
                  <h3>Start your first project</h3>
                  <p>
                    Import a video, image, or audio file to create your first project
                    and start editing.
                  </p>
                  <div className="empty-actions">
                    <button className="empty-btn empty-btn--primary" onClick={handleNewProject}>
                      <I i="add" s={16} c="#0a0a0a" />
                      Import Media
                    </button>
                  </div>
                  <p className="empty-hint">
                    Supports MP4, WebM, MP3, WAV, PNG, JPG and more
                  </p>
                </div>
              )}
            </div>

            {/* ===== RIGHT: ADVISOR PANEL ===== */}
            {!isMobile && !advisorDismissed && <aside className="advisor-panel">
              <div className="advisor-label-row">
                <div className="advisor-label">
                  <I i="assistant" s={14} c="rgba(255,255,255,0.25)" />
                  Advisor
                </div>
                <button
                  type="button"
                  className="advisor-dismiss"
                  onClick={dismissAdvisor}
                  aria-label="Dismiss advisor panel"
                  title="Hide advisor"
                >
                  <I i="close" s={18} />
                </button>
              </div>

              {/* Security */}
              <div className="advisor-item advisor-item--warning">
                <div className="advisor-item-header">
                  <I i="shield" s={16} c="#f59e0b" />
                  <h4>Account Security</h4>
                </div>
                <p>
                  Strengthen your account by reviewing your security settings.
                </p>
                <button
                  className="advisor-action advisor-action--warning"
                  onClick={() => navigate("/settings")}
                >
                  <I i="arrow_forward" s={12} c="#f59e0b" />
                  Review Settings
                </button>
              </div>

              {/* Getting started / Activity */}
              {projects.length === 0 && !isLoading ? (
                <div className="advisor-item advisor-item--info">
                  <div className="advisor-item-header">
                    <I i="rocket_launch" s={16} c="#75AADB" />
                    <h4>Getting Started</h4>
                  </div>
                  <ul className="advisor-checklist">
                    <li className="done">
                      <I i="check_circle" s={14} fill />
                      <span>Create account</span>
                    </li>
                    <li>
                      <I i="radio_button_unchecked" s={14} c="rgba(255,255,255,0.2)" />
                      <span>Import your first media file</span>
                    </li>
                    <li>
                      <I i="radio_button_unchecked" s={14} c="rgba(255,255,255,0.2)" />
                      <span>Edit and export a project</span>
                    </li>
                  </ul>
                </div>
              ) : projects.length > 0 ? (
                <div className="advisor-item advisor-item--success">
                  <div className="advisor-item-header">
                    <I i="check_circle" s={16} c="#22c55e" />
                    <h4>Workspace Active</h4>
                  </div>
                  <p>
                    {projects.length} project{projects.length !== 1 ? "s" : ""} in your workspace.
                    Last edited {relativeTime(lastEdited)}.
                  </p>
                </div>
              ) : null}
            </aside>}

          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav className="mobile-bottom-nav">
          <button className={activeNav === 'home' ? 'active' : ''} onClick={() => setActiveNav('home')}>
            <I i="home" s={22} fill={activeNav === 'home'} />
            <span>Home</span>
          </button>
          <button onClick={handleNewProject}>
            <I i="add_circle" s={22} c="#75AADB" />
            <span>New</span>
          </button>
          <button className={activeNav === 'settings' ? 'active' : ''} onClick={() => navigate('/settings')}>
            <I i="settings" s={22} />
            <span>Settings</span>
          </button>
        </nav>
      )}

      {/* Botswana flag stripe */}
      <div className="bw-stripe" role="presentation">
        <div style={{ background: "#75AADB" }} />
        <div style={{ background: "white" }} />
        <div style={{ background: "#000" }} />
        <div style={{ background: "white" }} />
        <div style={{ background: "#75AADB" }} />
      </div>
    </div>
  );
};

export default Dashboard;
