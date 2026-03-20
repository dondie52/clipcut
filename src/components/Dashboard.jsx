import { useState, useRef, useCallback, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../supabase/AuthContext";
import { listProjects as listCloudProjects, deleteProject as deleteCloudProject } from "../services/projectService";
import { trackEvent, analyticsEvents } from "../utils/analytics";
import { logger } from "../utils/logger";
import { sanitizeSearchQuery } from "../utils/validation";
import { getUserFriendlyMessage } from "../utils/errorHandling";

/* ========== CSS ========== */
const DASH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; }

  .dash-root {
    width: 100vw; height: 100vh; background: #0a0a0a;
    font-family: 'Spline Sans', sans-serif; display: flex;
    overflow: hidden; color: white;
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
  .advisor-label {
    display: flex; align-items: center; gap: 6px; margin-bottom: 12px;
    font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.25);
    text-transform: uppercase; letter-spacing: 0.8px;
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
  { id: "templates", icon: "dashboard", label: "Templates" },
  { id: "shorts", icon: "content_cut", label: "Long to Shorts" },
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
const Sidebar = memo(({ user, activeNav, onNav, onNavigate }) => {
  const displayName = user?.user_metadata?.full_name
    || user?.email?.split("@")[0]
    || "Creator";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
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
                if (item.id === "shorts") onNavigate("/long-to-shorts");
                else if (item.id === "settings") onNavigate("/settings");
              }}
            >
              <I i={item.icon} s={20} fill={item.fill && activeNav === item.id} />
              <span style={{ flex: 1 }}>{item.label}</span>
            </button>
          )
        )}
      </nav>

      <div className="sidebar-footer">v0.1.0 beta</div>
    </aside>
  );
});
Sidebar.displayName = "Sidebar";

/* ========== MAIN DASHBOARD ========== */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

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
  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const cloudProjects = await listCloudProjects(user?.id);
      const formattedProjects = cloudProjects.map(p => ({
        id: p.id,
        name: p.name,
        thumbnail: p.thumbnail_url,
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
  }, [user?.id]);

  useEffect(() => {
    loadProjects();
    const handleFocus = () => loadProjects();
    window.addEventListener("focus", handleFocus);
    const handleStorageChange = () => loadProjects();
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
        projectData: project.data,
        projectName: project.name,
      }
    });
  }, [navigate]);

  const handleDeleteProject = useCallback(async (e, projectId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteCloudProject(projectId, user?.id);
        trackEvent(analyticsEvents.dashboardProjectDelete, { projectId });
        setProjects(prev => prev.filter(p => p.id !== projectId));
      } catch (err) {
        logger.error("Failed to delete project", { error: err, projectId });
        alert(getUserFriendlyMessage(err, "project"));
      }
    }
  }, [user?.id]);

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

      <Sidebar
        user={user}
        activeNav={activeNav}
        onNav={setActiveNav}
        onNavigate={navigate}
      />

      <div className="dash-content">
        {/* ===== TOP BAR ===== */}
        <header className="top-bar">
          <div>
            <h1>{getGreeting()}, {displayName}</h1>
            <p className="top-bar-sub">Workspace overview</p>
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
          <div className="dash-layout">

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
                <button
                  className="quick-action"
                  onClick={() => {
                    trackEvent(analyticsEvents.dashboardToolSelect, { tool: "long_to_shorts" });
                    navigate("/long-to-shorts");
                  }}
                >
                  <div className="qa-icon">
                    <I i="content_cut" s={18} c="#75AADB" />
                  </div>
                  <span>Long to Shorts</span>
                  <span className="qa-badge">AI</span>
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
                    >
                      <div className="project-thumb">
                        {project.thumbnail ? (
                          <img src={project.thumbnail} alt={project.name} />
                        ) : (
                          <I i="movie" s={32} c="rgba(255,255,255,0.1)" />
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
                        <p className="name">{project.name}</p>
                        <p className="meta">
                          {project.resolution} · {project.duration || "0:00"} · {relativeTime(project.savedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {showEmpty && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <I i="movie_edit" s={26} c="rgba(117,170,219,0.5)" />
                  </div>
                  <h3>Your workspace is ready</h3>
                  <p>
                    Import a video, image, or audio file to create your first project
                    and start editing.
                  </p>
                  <div className="empty-actions">
                    <button className="empty-btn empty-btn--primary" onClick={handleNewProject}>
                      <I i="add" s={16} c="#0a0a0a" />
                      Import Media
                    </button>
                    <button
                      className="empty-btn empty-btn--ghost"
                      onClick={() => navigate("/long-to-shorts")}
                    >
                      <I i="content_cut" s={14} />
                      Long to Shorts
                    </button>
                  </div>
                  <p className="empty-hint">
                    Supports MP4, WebM, MP3, WAV, PNG, JPG and more
                  </p>
                </div>
              )}
            </div>

            {/* ===== RIGHT: ADVISOR PANEL ===== */}
            <aside className="advisor-panel">
              <div className="advisor-label">
                <I i="assistant" s={14} c="rgba(255,255,255,0.25)" />
                Advisor
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

              {/* Feature tip */}
              <div className="advisor-item advisor-item--info">
                <div className="advisor-item-header">
                  <I i="auto_awesome" s={16} c="#75AADB" />
                  <h4>Long to Shorts</h4>
                </div>
                <p>
                  Convert landscape videos to vertical format with AI-powered speaker tracking and smart reframing.
                </p>
                <button
                  className="advisor-action advisor-action--info"
                  onClick={() => navigate("/long-to-shorts")}
                >
                  <I i="arrow_forward" s={12} c="#75AADB" />
                  Try it
                </button>
              </div>
            </aside>

          </div>
        </div>
      </div>

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
