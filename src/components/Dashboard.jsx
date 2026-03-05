import { useState, useRef, useCallback, useEffect, memo } from "react";
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

  /* Sidebar */
  .sidebar {
    width: 200px; min-width: 200px; background: #0e1218;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column; padding: 0;
  }
  .sidebar-logo {
    padding: 20px 20px 24px; display: flex; align-items: center; gap: 10px;
  }
  .sidebar-logo-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: linear-gradient(135deg, #75AADB, #5a8cbf);
    display: flex; align-items: center; justify-content: center;
  }
  .sidebar-user {
    padding: 0 16px 20px; display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px;
  }
  .sidebar-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #75AADB, #4a7fb5);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .sidebar-nav { flex: 1; padding: 8px 8px; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 10px 14px;
    border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,0.55); transition: all 0.15s ease;
    border: none; background: none; width: 100%; text-align: left;
    min-height: 44px;
  }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
  .nav-item.active {
    background: rgba(117,170,219,0.1); color: white; font-weight: 600;
  }
  .nav-item .material-symbols-outlined { font-size: 22px; }
  .nav-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 8px 14px; }

  /* Main area */
  main.dash-main {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    scrollbar-width: thin; scrollbar-color: #1e293b transparent;
  }
  main.dash-main::-webkit-scrollbar { width: 6px; }
  main.dash-main::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }

  /* Hero banner */
  .hero-banner {
    margin: 20px 24px 0; border-radius: 14px; padding: 40px;
    background: linear-gradient(135deg, #1a3a5c 0%, #2a6a9e 40%, #75AADB 100%);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative; overflow: hidden;
  }
  .hero-banner::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%);
  }
  .hero-banner:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(117,170,219,0.3); }
  .hero-banner:active { transform: translateY(0); }
  .hero-inner {
    display: flex; align-items: center; gap: 14px; z-index: 1; position: relative;
  }
  .hero-plus {
    width: 44px; height: 44px; border-radius: 10px;
    background: rgba(255,255,255,0.2); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    border: 1.5px solid rgba(255,255,255,0.3);
  }

  /* AI Feature cards row */
  .ai-cards {
    display: flex; gap: 16px; padding: 20px 24px 0; overflow-x: auto;
  }
  .ai-card {
    flex: 1; min-width: 200px; max-width: 320px;
    background: rgba(26,35,50,0.5); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px; padding: 20px; cursor: pointer;
    transition: all 0.2s ease; position: relative; overflow: hidden;
  }
  .ai-card:hover {
    background: rgba(26,35,50,0.8); border-color: rgba(117,170,219,0.25);
    transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .ai-card-badge {
    position: absolute; top: 12px; right: 12px;
    background: #75AADB; color: #0a0a0a; font-size: 10px;
    font-weight: 700; padding: 2px 8px; border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .ai-card-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(117,170,219,0.1); display: flex;
    align-items: center; justify-content: center; margin-bottom: 14px;
  }
  .ai-card h3 { font-size: 15px; font-weight: 600; margin: 0 0 6px; }
  .ai-card p { font-size: 12px; color: rgba(255,255,255,0.45); margin: 0; line-height: 1.4; }

  /* More tools section */
  .more-tools-grid {
    display: flex; gap: 8px; flex-wrap: wrap; padding: 0 24px;
  }
  .tool-chip {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    padding: 16px 20px; border-radius: 10px; cursor: pointer;
    background: rgba(26,35,50,0.35); border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.15s ease; min-width: 100px; position: relative;
  }
  .tool-chip:hover {
    background: rgba(26,35,50,0.6); border-color: rgba(255,255,255,0.08);
  }
  .tool-chip-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(117,170,219,0.08); display: flex;
    align-items: center; justify-content: center;
  }
  .tool-chip span.label { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 500; text-align: center; }
  .tool-chip .ai-dot {
    position: absolute; top: 8px; right: 8px;
    background: #75AADB; color: #0a0a0a; font-size: 8px;
    font-weight: 800; padding: 1px 5px; border-radius: 3px;
  }

  /* Section headers */
  .section-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 24px 16px;
  }
  .section-header h2 { font-size: 18px; font-weight: 700; margin: 0; }
  .section-header-right { display: flex; align-items: center; gap: 10px; }

  /* Projects */
  .projects-toolbar {
    display: flex; align-items: center; gap: 10px; padding: 0 24px 16px;
  }
  .proj-search {
    position: relative; width: 200px;
  }
  .proj-search input {
    width: 100%; background: rgba(26,35,50,0.5); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 7px; padding: 7px 12px 7px 32px; color: white; font-size: 13px;
    outline: none; font-family: inherit;
  }
  .proj-search input::placeholder { color: rgba(255,255,255,0.3); }
  .proj-search input:focus { border-color: rgba(117,170,219,0.4); }
  .proj-search .material-symbols-outlined {
    position: absolute; left: 9px; top: 50%; transform: translateY(-50%);
    font-size: 16px; color: rgba(255,255,255,0.3);
  }
  .toolbar-btn {
    display: flex; align-items: center; gap: 6px; padding: 7px 14px;
    border-radius: 7px; background: rgba(26,35,50,0.5); border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 500; cursor: pointer;
    font-family: inherit; transition: all 0.12s ease;
    min-height: 36px;
  }
  .toolbar-btn:hover { background: rgba(26,35,50,0.8); color: rgba(255,255,255,0.85); }
  .toolbar-btn .material-symbols-outlined { font-size: 16px; }

  /* Project cards grid */
  .projects-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px; padding: 0 24px 32px;
  }
  .project-card {
    cursor: pointer; transition: all 0.2s ease; border-radius: 10px;
  }
  .project-card:hover { transform: translateY(-3px); }
  .project-card:hover .project-thumb { border-color: rgba(117,170,219,0.4); box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
  .project-thumb {
    width: 100%; aspect-ratio: 1/1; border-radius: 10px; overflow: hidden;
    background: #151b24; border: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease; position: relative;
  }
  .project-card:hover .project-thumb button {
    opacity: 1 !important;
  }
  .project-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .project-thumb .empty-icon { color: rgba(255,255,255,0.15); }
  .project-info { padding: 10px 2px 0; }
  .project-info .name { font-size: 13px; font-weight: 600; margin: 0 0 3px; color: white; }
  .project-info .meta { font-size: 11px; color: rgba(255,255,255,0.35); margin: 0; }

  /* Empty state */
  .empty-state {
    text-align: center; padding: 60px 24px; color: rgba(255,255,255,0.3);
  }
  .empty-state .material-symbols-outlined { font-size: 56px; margin-bottom: 16px; opacity: 0.4; }
  .empty-state p { font-size: 14px; margin: 0; }

  /* Botswana stripe */
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
  { id: "spaces", icon: "cloud", label: "Spaces", arrow: true },
  { id: "divider" },
  { id: "ai", icon: "auto_awesome", label: "AI Design" },
];

/* ========== AI FEATURE CARDS ========== */
const AI_FEATURES = [
  {
    id: "ai-video",
    icon: "smart_display",
    title: "AI video maker",
    desc: "Generate videos from text prompts using AI",
  },
  {
    id: "script-video",
    icon: "description",
    title: "Script to video",
    desc: "Turn your script into a polished video automatically",
  },
  {
    id: "record",
    icon: "radio_button_checked",
    title: "Record screen",
    desc: "Capture your screen with webcam overlay",
    noAi: true,
  },
];

/* ========== MORE TOOLS ========== */
const MORE_TOOLS = [
  { icon: "content_cut", label: "Long video\nto shorts", ai: true },
  { icon: "smart_display", label: "AI video", ai: true },
  { icon: "image", label: "AI image", ai: true },
  { icon: "translate", label: "Video\ntranslator", ai: true },
  { icon: "group", label: "AI dialogue\nscene", ai: true },
  { icon: "style", label: "AI fashion\nmodel", ai: true },
  { icon: "record_voice_over", label: "Text to\nspeech", ai: true },
];

/* ========== SIDEBAR ========== */
const Sidebar = memo(({ activeNav, onNavChange }) => (
  <aside className="sidebar">
    {/* Logo */}
    <div className="sidebar-logo">
      <div className="sidebar-logo-icon">
        <I i="content_cut" s={18} c="white" />
      </div>
      <span style={{ fontSize: "17px", fontWeight: 700 }}>ClipCut</span>
    </div>

    {/* User */}
    <div className="sidebar-user">
      <div className="sidebar-avatar">
        <I i="person" s={18} c="white" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "13px", fontWeight: 600, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Creator</p>
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", margin: 0 }}>Free Plan</p>
      </div>
    </div>

    {/* Nav */}
    <nav className="sidebar-nav">
      {NAV_ITEMS.map((item) =>
        item.id === "divider" ? (
          <div key="div" className="nav-divider" />
        ) : (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => {
              onNavChange(item.id);
              // Navigate based on nav item
              if (item.id === "home") {
                // Already on dashboard
              } else if (item.id === "templates") {
                // Could navigate to templates page when implemented
                console.log("Templates coming soon");
              } else if (item.id === "spaces") {
                // Could navigate to spaces page when implemented
                console.log("Spaces coming soon");
              } else if (item.id === "ai") {
                // Could navigate to AI design page when implemented
                console.log("AI Design coming soon");
              }
            }}
          >
            <I i={item.icon} s={22} fill={item.fill && activeNav === item.id} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.arrow && <I i="expand_more" s={16} c="rgba(255,255,255,0.3)" />}
          </button>
        )
      )}
    </nav>
  </aside>
));
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

  // Load projects from cloud or localStorage
  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      // Try to load from cloud if user is authenticated
      const cloudProjects = await listCloudProjects(user?.id);

      // Format cloud projects
      const formattedProjects = cloudProjects.map(p => ({
        id: p.id,
        name: p.name,
        thumbnail: p.thumbnail_url,
        duration: p.duration_seconds > 0
          ? `${Math.floor(p.duration_seconds / 60)}:${String(Math.floor(p.duration_seconds % 60)).padStart(2, '0')}`
          : '0:00',
        resolution: p.resolution || '1080p',
        savedAt: p.updated_at || p.created_at,
        isCloud: !p._source || p._source !== 'localStorage',
      }));

      setProjects(formattedProjects);
    } catch (e) {
      logger.error('Failed to load projects', { error: e });
      setLoadError(getUserFriendlyMessage(e, 'project'));
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Load projects on mount and when returning to dashboard
  useEffect(() => {
    loadProjects();
    // Reload projects when returning from editor (check on focus)
    const handleFocus = () => loadProjects();
    window.addEventListener('focus', handleFocus);
    // Also listen for storage events (if opened in another tab)
    const handleStorageChange = () => loadProjects();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
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

  const handleAIFeature = useCallback((featureId) => {
    trackEvent(analyticsEvents.dashboardAIFeatureSelect, { featureId });
    // Navigate to editor with AI feature flag
    navigate("/editor", { 
      state: { 
        aiFeature: featureId,
      } 
    });
  }, [navigate]);

  const handleToolClick = useCallback((tool) => {
    trackEvent(analyticsEvents.dashboardToolSelect, { tool: tool.icon });
    // Long to Shorts has its own dedicated page
    if (tool.label && tool.label.includes('shorts')) {
      navigate("/long-to-shorts");
      return;
    }
    // Navigate to editor with tool flag
    navigate("/editor", {
      state: {
        tool: tool.icon,
      }
    });
  }, [navigate]);

  const handleDeleteProject = useCallback(async (e, projectId) => {
    e.stopPropagation(); // Prevent loading the project
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteCloudProject(projectId, user?.id);
        trackEvent(analyticsEvents.dashboardProjectDelete, { projectId });
        setProjects(prev => prev.filter(p => p.id !== projectId));
      } catch (err) {
        logger.error('Failed to delete project', { error: err, projectId });
        alert(getUserFriendlyMessage(err, 'project'));
      }
    }
  }, [user?.id]);

  // Sanitize search query before filtering
  const sanitizedQuery = sanitizeSearchQuery(searchQuery);
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(sanitizedQuery.toLowerCase())
  );

  return (
    <div className="dash-root">
      <style>{DASH_CSS}</style>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,audio/*,image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main content */}
      <main className="dash-main">
        {/* ===== HERO BANNER ===== */}
        <div className="hero-banner" onClick={handleNewProject}>
          <div className="hero-inner">
            <div className="hero-plus">
              <I i="add" s={26} c="white" />
            </div>
            <span style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.3px" }}>
              Create project
            </span>
          </div>
        </div>

        {/* ===== AI FEATURE CARDS ===== */}
        <div className="ai-cards">
          {AI_FEATURES.map((f) => (
            <div 
              key={f.id} 
              className="ai-card"
              onClick={() => handleAIFeature(f.id)}
            >
              {!f.noAi && <div className="ai-card-badge">AI</div>}
              <div className="ai-card-icon">
                <I i={f.icon} s={22} c="#75AADB" />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ===== MORE TOOLS ===== */}
        <div className="section-header">
          <h2>More tools</h2>
        </div>
        <div className="more-tools-grid">
          {MORE_TOOLS.map((t, i) => (
            <div 
              key={i} 
              className="tool-chip"
              onClick={() => handleToolClick(t)}
            >
              {t.ai && <div className="ai-dot">AI</div>}
              <div className="tool-chip-icon">
                <I i={t.icon} s={22} c="rgba(255,255,255,0.6)" />
              </div>
              <span className="label" style={{ whiteSpace: "pre-line" }}>{t.label}</span>
            </div>
          ))}
        </div>

        {/* ===== PROJECTS ===== */}
        <div className="section-header">
          <h2>Projects</h2>
          <div className="section-header-right">
            {/* These are toolbar actions like in CapCut */}
          </div>
        </div>

        {/* Projects toolbar */}
        <div className="projects-toolbar">
          <div className="proj-search">
            <I i="search" />
            <input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="toolbar-btn">
            <I i="grid_view" s={16} />
          </button>
          <button className="toolbar-btn">
            <I i="delete" s={15} /> Trash
          </button>
          <button className="toolbar-btn">
            <I i="cloud_sync" s={15} /> Project sync
          </button>
        </div>

        {/* Loading skeleton */}
        {isLoading && !loadError && (
          <div className="projects-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="project-card" style={{ pointerEvents: 'none' }}>
                <div className="project-thumb" style={{
                  background: 'linear-gradient(90deg, #151b24 25%, #1a2332 50%, #151b24 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s ease-in-out infinite',
                }} />
                <div className="project-info">
                  <div style={{ width: '70%', height: '13px', borderRadius: '4px', background: '#1a2332', marginBottom: '6px' }} />
                  <div style={{ width: '40%', height: '11px', borderRadius: '4px', background: '#151b24' }} />
                </div>
              </div>
            ))}
            <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
          </div>
        )}

        {/* Load error banner */}
        {loadError && (
          <div style={{
            margin: '0 24px 16px', padding: '14px 18px', borderRadius: '10px',
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <I i="cloud_off" s={22} c="#ef4444" />
            <span style={{ flex: 1, fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{loadError}</span>
            <button
              onClick={loadProjects}
              style={{
                background: 'rgba(117,170,219,0.15)', border: '1px solid rgba(117,170,219,0.3)',
                borderRadius: '7px', padding: '6px 14px', color: '#75AADB', fontSize: '12px',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && filteredProjects.length > 0 ? (
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
                    <I i="movie" s={40} c="rgba(255,255,255,0.15)" />
                  )}
                  <button
                    onClick={(e) => handleDeleteProject(e, project.id)}
                    aria-label={`Delete project ${project.name}`}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(239,68,68,0.9)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: 0,
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "1"}
                    onMouseLeave={(e) => e.target.style.opacity = "0"}
                    title="Delete project"
                  >
                    <I i="delete" s={16} c="white" />
                  </button>
                </div>
                <div className="project-info">
                  <p className="name">{project.name}</p>
                  <p className="meta">
                    {project.size} | {project.duration || "00:00"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoading && !loadError ? (
          <div className="empty-state">
            <I i="movie_edit" s={56} />
            <p>No projects yet. Click <strong>Create project</strong> to get started!</p>
          </div>
        ) : null}
      </main>

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