/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2026 ClipCut Contributors / Bokas Technologies (Pty) Ltd
 * Licensed under the MIT License
 *
 * @module components/Dashboard
 * @description Main dashboard — "Studio Desk" aesthetic. Projects live on a
 *   refined workbench: index-card tiles, linen texture, JetBrains Mono for
 *   all metadata, Botswana blue reserved exclusively for active states and
 *   primary actions. Right rail is a vertical timeline (advisor), not a
 *   boxed panel. All business logic preserved.
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
import { toast } from "./Toast";

const ADVISOR_DISMISSED_KEY = "clipcut-dashboard-advisor-dismissed";

/* ========== CSS ========== */
const DASH_CSS = `
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
  { id: "home",      icon: "home",            label: "Home",      fill: true,  route: null },
  { id: "templates", icon: "collections",     label: "Templates", fill: false, route: "/templates" },
  { id: "divider" },
  { id: "settings",  icon: "settings",        label: "Settings",  fill: false, route: "/settings" },
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

function formatTodayStamp() {
  const d = new Date();
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase();
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
        <span className="sidebar-logo-monogram" aria-hidden="true">CC</span>
        <span className="sidebar-logo-mark">ClipCut</span>
        <span className="sidebar-logo-version">v0.1</span>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{initial}</div>
        <div className="sidebar-user-meta">
          <p className="sidebar-user-name">{displayName}</p>
          <span className="sidebar-user-plan">Free · Open Source</span>
        </div>
      </div>

      <div className="sidebar-section-label">Workspace</div>

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
                if (item.route) onNavigate(item.route);
              }}
            >
              <I i={item.icon} s={18} fill={item.fill && activeNav === item.id} />
              <span style={{ flex: 1 }}>{item.label}</span>
            </button>
          )
        )}
      </nav>

      <button className="sidebar-logout" onClick={onLogout}>
        <I i="logout" s={18} />
        <span style={{ flex: 1 }}>Log out</span>
      </button>

      <div className="sidebar-footer">
        <span>v0.1.0 · BETA</span>
        <span>GBE</span>
      </div>
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

      let localOnly = [];
      try {
        const localProjects = listProjectsFromLocalStorage();
        const cloudIds = new Set(cloudProjects.map(p => p.id));
        localOnly = localProjects.filter(p => !cloudIds.has(p.id));
      } catch { /* localStorage unavailable */ }

      const allProjects = [...cloudProjects, ...localOnly];

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

      const renamePromises = [];
      for (const p of allProjects) {
        const derived = deriveProjectName(p);
        if (derived !== p.name) {
          p.name = derived;
          if (p._source !== "localStorage") {
            renamePromises.push(
              updateCloudProject(p.id, user?.id, { name: derived }).catch((err) => {
                logger.warn("Failed to backfill project name", { error: err, projectId: p.id });
              })
            );
          }
        }
      }
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
        try {
          localStorage.removeItem(`clipcut_project_${projectId}`);
          localStorage.removeItem(`clipcut_autosave_${projectId}`);
          localStorage.removeItem(`clipcut_migrated_${projectId}`);
        } catch { /* localStorage unavailable */ }
        trackEvent(analyticsEvents.dashboardProjectDelete, { projectId });
        setProjects(prev => prev.filter(p => p.id !== projectId));
      } catch (err) {
        logger.error("Failed to delete project", { error: err, projectId });
        toast.error(getUserFriendlyMessage(err, "project"));
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

  const [ctxMenu, setCtxMenu] = useState(null);

  const handleContextMenu = useCallback((e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu({ x: e.clientX, y: e.clientY, project });
  }, []);

  const closeCtxMenu = useCallback(() => setCtxMenu(null), []);

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

  const todayStamp = formatTodayStamp();

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
        {/* ===== TOP RIBBON ===== */}
        <header className="dash-ribbon">
          <div className="dash-ribbon-left">
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Open menu"
            >
              <I i="menu" s={20} />
            </button>
            <div className="dash-ribbon-block">
              <h1 className="dash-greeting">
                {getGreeting()},
                <span className="dash-greeting-name">{displayName}.</span>
              </h1>
              <p className="dash-ribbon-sub">
                <span>{todayStamp}</span>
                <span className="dot" />
                <span>Workspace</span>
                <span className="dot" />
                <span>{isLoading ? "Syncing…" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}</span>
              </p>
            </div>
          </div>
          <div className="dash-ribbon-actions">
            {!isMobile && (
              <span className="ribbon-pill" title="Cloud sync status">
                <span className="ribbon-pill-dot" aria-hidden="true" />
                Cloud · Live
              </span>
            )}
            <button
              className="icon-btn"
              onClick={loadProjects}
              title="Refresh projects"
              aria-label="Refresh"
            >
              <I i="refresh" s={18} />
            </button>
            <button
              className="icon-btn"
              onClick={() => navigate("/settings")}
              title="Settings"
              aria-label="Settings"
            >
              <I i="settings" s={18} />
            </button>
          </div>
        </header>

        {/* ===== SCROLLABLE BODY ===== */}
        <div className="dash-body">
          <div className={`dash-layout ${!isMobile && advisorDismissed ? "dash-layout--single" : ""}`}>

            {/* ===== LEFT: MAIN ===== */}
            <div className="dash-main">

              {/* Stats tape */}
              <div className="stats-rail" aria-label="Workspace statistics">
                <div className="stat-cell">
                  <span className="stat-label">Projects</span>
                  <span className="stat-value stat-value-mono">
                    {isLoading ? "—" : String(projects.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="stat-cell">
                  <span className="stat-label">Last edited</span>
                  <span className="stat-value stat-value-mono">{isLoading ? "—" : relativeTime(lastEdited)}</span>
                </div>
                <div className="stat-cell">
                  <span className="stat-label">Member since</span>
                  <span className="stat-value stat-value-mono">{formatJoinDate(user?.created_at)}</span>
                </div>
                <div className="stat-cell">
                  <span className="stat-label">Plan</span>
                  <span className="stat-value stat-value-mono">FREE · ∞</span>
                </div>
              </div>

              {/* Toolbelt */}
              <div className="section-head">
                <h2 className="section-title">
                  <span className="section-title-mono">§ 01 —</span>
                  Quick actions
                </h2>
              </div>
              <div className="toolbelt">
                <button className="tool tool--primary" onClick={handleNewProject}>
                  <div className="tool-icon">
                    <I i="add" s={22} c="#0a0a0a" />
                  </div>
                  <div className="tool-body">
                    <span className="tool-title">New project</span>
                    <span className="tool-subtitle">Import media and start editing</span>
                  </div>
                </button>
                <button
                  className="tool"
                  onClick={() => {
                    setActiveNav("templates");
                    navigate("/templates");
                  }}
                >
                  <div className="tool-icon">
                    <I i="collections" s={20} c="#75AADB" />
                  </div>
                  <div className="tool-body">
                    <span className="tool-title">Browse templates</span>
                    <span className="tool-subtitle">Community works — fork and remix</span>
                  </div>
                </button>
                <button className="tool" onClick={() => navigate("/long-to-shorts")}>
                  <div className="tool-icon">
                    <I i="crop_portrait" s={20} c="#75AADB" />
                  </div>
                  <div className="tool-body">
                    <span className="tool-title">Long → Shorts</span>
                    <span className="tool-subtitle">Auto-crop a long video for TikTok</span>
                  </div>
                </button>
              </div>

              {/* Projects */}
              <div className="section-head">
                <h2 className="section-title">
                  <span className="section-title-mono">§ 02 —</span>
                  Your projects
                  {!isLoading && projects.length > 0 && (
                    <span className="section-title-count">
                      {filteredProjects.length} of {projects.length}
                    </span>
                  )}
                </h2>
                {projects.length > 0 && (
                  <div className="proj-search">
                    <I i="search" />
                    <input
                      type="text"
                      placeholder="Search projects…"
                      aria-label="Search projects"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {loadError && (
                <div className="error-banner">
                  <I i="cloud_off" s={18} c="#ef4444" />
                  <span>{loadError}</span>
                  <button className="error-retry" onClick={loadProjects}>RETRY</button>
                </div>
              )}

              {isLoading && !loadError && (
                <div className="projects-grid">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="project-card" style={{ pointerEvents: "none" }}>
                      <div className="project-thumb skel" />
                      <div className="project-info">
                        <div style={{ width: "65%", height: "14px", borderRadius: "2px", background: "#1a2332", marginTop: "10px", marginBottom: "6px" }} />
                        <div style={{ width: "40%", height: "10px", borderRadius: "2px", background: "#151b24" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
                            loading="lazy"
                            decoding="async"
                            onError={() => setFailedThumbs(prev => new Set(prev).add(project.id))}
                          />
                        ) : (
                          <div className="project-thumb-fallback">
                            <I i="movie" s={34} c="rgba(117,170,219,0.35)" />
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
                            className="project-rename-input"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onBlur={() => handleFinishRename(project.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleFinishRename(project.id);
                              if (e.key === 'Escape') setRenamingId(null);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <div className="project-rename-row">
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
                          <span className="res">{project.resolution}</span>
                          <span className="sep" aria-hidden="true" />
                          <span>{formatEditTime(project.savedAt)}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

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

              {showEmpty && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <I i="movie_edit" s={26} c="rgba(117,170,219,0.75)" />
                  </div>
                  <h3>
                    A clean <span className="em">canvas.</span>
                  </h3>
                  <p>
                    Import a video, image, or audio file to start your first project —
                    or begin from a community template.
                  </p>
                  <div className="empty-actions">
                    <button className="empty-btn empty-btn--primary" onClick={handleNewProject}>
                      <I i="add" s={16} c="#0a0a0a" />
                      Import media
                    </button>
                    <button className="empty-btn empty-btn--ghost" onClick={() => navigate("/templates")}>
                      <I i="collections" s={16} />
                      Browse templates
                    </button>
                  </div>
                  <p className="empty-hint">
                    SUPPORTS · MP4 · WEBM · MP3 · WAV · PNG · JPG
                  </p>
                </div>
              )}
            </div>

            {/* ===== RIGHT: ADVISOR TIMELINE ===== */}
            {!isMobile && !advisorDismissed && (
              <aside className="advisor-rail" aria-label="Workspace advisor">
                <div className="advisor-rail-head">
                  <span className="advisor-rail-title">Advisor</span>
                  <button
                    type="button"
                    className="advisor-dismiss"
                    onClick={dismissAdvisor}
                    aria-label="Dismiss advisor panel"
                    title="Hide advisor"
                  >
                    <I i="close" s={16} />
                  </button>
                </div>

                <div className="advisor-timeline">
                  <div className="advisor-entry advisor-entry--warning">
                    <span className="advisor-entry-time">Security · Pending</span>
                    <h4 className="advisor-entry-title">
                      <I i="shield" s={14} c="#f5b84e" />
                      Review account security
                    </h4>
                    <p className="advisor-entry-body">
                      Strengthen your account by enabling 2-factor authentication and a
                      recovery email.
                    </p>
                    <button
                      className="advisor-entry-action advisor-entry-action--warning"
                      onClick={() => navigate("/settings")}
                    >
                      Open settings
                      <I i="arrow_forward" s={12} c="#f5b84e" />
                    </button>
                  </div>

                  {projects.length === 0 && !isLoading ? (
                    <div className="advisor-entry advisor-entry--info">
                      <span className="advisor-entry-time">Getting started</span>
                      <h4 className="advisor-entry-title">
                        <I i="rocket_launch" s={14} c="#75AADB" />
                        First steps
                      </h4>
                      <ul className="advisor-checklist">
                        <li className="done">
                          <I i="check_circle" s={14} fill />
                          <span>Create account</span>
                        </li>
                        <li>
                          <I i="radio_button_unchecked" s={14} c="rgba(255,255,255,0.22)" />
                          <span>Import your first media file</span>
                        </li>
                        <li>
                          <I i="radio_button_unchecked" s={14} c="rgba(255,255,255,0.22)" />
                          <span>Edit and export a project</span>
                        </li>
                      </ul>
                    </div>
                  ) : projects.length > 0 ? (
                    <div className="advisor-entry advisor-entry--success">
                      <span className="advisor-entry-time">Workspace · Active</span>
                      <h4 className="advisor-entry-title">
                        <I i="check_circle" s={14} c="#6ec07a" />
                        Everything in sync
                      </h4>
                      <p className="advisor-entry-body">
                        {projects.length} project{projects.length !== 1 ? "s" : ""} · last edit {relativeTime(lastEdited)}.
                      </p>
                    </div>
                  ) : null}

                  <div className="advisor-entry advisor-entry--info">
                    <span className="advisor-entry-time">Community</span>
                    <h4 className="advisor-entry-title">
                      <I i="collections" s={14} c="#75AADB" />
                      Explore templates
                    </h4>
                    <p className="advisor-entry-body">
                      Browse works from creators across Botswana. Fork, remix, and
                      publish back to the catalog when you're ready.
                    </p>
                    <button
                      className="advisor-entry-action advisor-entry-action--info"
                      onClick={() => navigate("/templates")}
                    >
                      Open catalog
                      <I i="arrow_forward" s={12} c="#75AADB" />
                    </button>
                  </div>
                </div>
              </aside>
            )}

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
          <button className={activeNav === 'templates' ? 'active' : ''} onClick={() => { setActiveNav('templates'); navigate('/templates'); }}>
            <I i="collections" s={22} />
            <span>Templates</span>
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
