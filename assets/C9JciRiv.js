import{u as G,r as o,j as e}from"./-P2Ya96f.js";import{u as Q,l as N,g as L,t as m,b as u}from"./Bqm5obMm.js";import{l as V,d as Y,u as U}from"./BWv2yUxG.js";import{h as H}from"./DuArS60f.js";import"./DZxFKcQQ.js";import"./B9CjrYEi.js";const J=`
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
`,i=({i:t,s:n=20,c,fill:x=!1,style:p})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:n,color:c,fontVariationSettings:x?"'FILL' 1":"'FILL' 0",...p},children:t}),O=[{id:"home",icon:"home",label:"Home",fill:!0},{id:"templates",icon:"dashboard",label:"Templates"},{id:"shorts",icon:"content_cut",label:"Long to Shorts"},{id:"divider"},{id:"settings",icon:"settings",label:"Settings"}];function S(t){if(!t)return"Never";const n=Date.now()-new Date(t).getTime(),c=Math.floor(n/6e4);if(c<1)return"Just now";if(c<60)return`${c}m ago`;const x=Math.floor(c/60);if(x<24)return`${x}h ago`;const p=Math.floor(x/24);return p<7?`${p}d ago`:p<30?`${Math.floor(p/7)}w ago`:new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function K(){const t=new Date().getHours();return t<12?"Good morning":t<18?"Good afternoon":"Good evening"}function X(t){return t?new Date(t).toLocaleDateString("en-US",{month:"short",year:"numeric"}):"—"}const B=o.memo(({user:t,activeNav:n,onNav:c,onNavigate:x})=>{const p=t?.user_metadata?.full_name||t?.email?.split("@")[0]||"Creator",f=p.charAt(0).toUpperCase();return e.jsxs("aside",{className:"sidebar",children:[e.jsxs("div",{className:"sidebar-logo",children:[e.jsx("div",{className:"sidebar-logo-icon",children:e.jsx(i,{i:"content_cut",s:16,c:"white"})}),e.jsx("span",{style:{fontSize:"16px",fontWeight:700},children:"ClipCut"})]}),e.jsxs("div",{className:"sidebar-user",children:[e.jsx("div",{className:"sidebar-avatar",children:f}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("p",{style:{fontSize:"12px",fontWeight:600,margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:p}),e.jsx("p",{style:{fontSize:"10px",color:"rgba(255,255,255,0.25)",margin:0},children:"Free Plan"})]})]}),e.jsx("nav",{className:"sidebar-nav",children:O.map(l=>l.id==="divider"?e.jsx("div",{className:"nav-divider"},"div"):e.jsxs("button",{className:`nav-item ${n===l.id?"active":""}`,onClick:()=>{c(l.id),l.id==="shorts"?x("/long-to-shorts"):l.id==="settings"&&x("/settings")},children:[e.jsx(i,{i:l.icon,s:20,fill:l.fill&&n===l.id}),e.jsx("span",{style:{flex:1},children:l.label})]},l.id))}),e.jsx("div",{className:"sidebar-footer",children:"v0.1.0 beta"})]})});B.displayName="Sidebar";const se=()=>{const t=G(),{user:n}=Q(),c=o.useRef(null),[x,p]=o.useState("home"),[f,l]=o.useState(""),[d,j]=o.useState([]),[g,A]=o.useState(!0),[v,C]=o.useState(null),[E,y]=o.useState(null),[w,z]=o.useState(""),q=n?.user_metadata?.full_name||n?.email?.split("@")[0]||"Creator",D=o.useMemo(()=>d.length===0?null:[...d].sort((r,s)=>new Date(s.savedAt||0)-new Date(r.savedAt||0))[0]?.savedAt,[d]),h=o.useCallback(async()=>{A(!0),C(null);try{const r=(await V(n?.id)).map(s=>({id:s.id,name:s.name,thumbnail:s.thumbnail_url,duration:s.duration_seconds>0?`${Math.floor(s.duration_seconds/60)}:${String(Math.floor(s.duration_seconds%60)).padStart(2,"0")}`:"0:00",resolution:s.resolution||"1080p",savedAt:s.updated_at||s.created_at,isCloud:!s._source||s._source!=="localStorage"}));j(r)}catch(a){N.error("Failed to load projects",{error:a}),C(L(a,"project")),j([])}finally{A(!1)}},[n?.id]);o.useEffect(()=>{h();const a=()=>h();window.addEventListener("focus",a);const r=()=>h();return window.addEventListener("storage",r),()=>{window.removeEventListener("focus",a),window.removeEventListener("storage",r)}},[h]);const _=o.useCallback(()=>{m(u.dashboardNewProjectClick),c.current?.click()},[]),M=o.useCallback(a=>{const r=Array.from(a.target.files);r.length>0&&(m(u.dashboardFileImport,{fileCount:r.length}),t("/editor",{state:{filesToImport:r}})),a.target.value=""},[t]),F=o.useCallback(a=>{m(u.dashboardProjectOpen,{projectId:a.id}),t("/editor",{state:{projectId:a.id,projectData:a.data,projectName:a.name}})},[t]),R=o.useCallback(async(a,r)=>{if(a.stopPropagation(),window.confirm("Are you sure you want to delete this project?"))try{await Y(r,n?.id),m(u.dashboardProjectDelete,{projectId:r}),j(s=>s.filter(b=>b.id!==r))}catch(s){N.error("Failed to delete project",{error:s,projectId:r}),alert(L(s,"project"))}},[n?.id]),I=o.useCallback((a,r)=>{a.stopPropagation(),y(r.id),z(r.name)},[]),P=o.useCallback(async a=>{const r=w.trim();if(!r||r===d.find(s=>s.id===a)?.name){y(null);return}try{await U(a,n?.id,{name:r}),j(s=>s.map(b=>b.id===a?{...b,name:r}:b))}catch(s){N.error("Failed to rename project",{error:s})}y(null)},[w,d,n?.id]),T=H(f),k=d.filter(a=>a.name.toLowerCase().includes(T.toLowerCase())),W=!g&&k.length>0,$=!g&&!v&&k.length===0;return e.jsxs("div",{className:"dash-root",children:[e.jsx("style",{children:J}),e.jsx("input",{ref:c,type:"file",accept:"video/*,audio/*,image/*",multiple:!0,style:{display:"none"},onChange:M}),e.jsx(B,{user:n,activeNav:x,onNav:p,onNavigate:t}),e.jsxs("div",{className:"dash-content",children:[e.jsxs("header",{className:"top-bar",children:[e.jsxs("div",{children:[e.jsxs("h1",{children:[K(),", ",q]}),e.jsx("p",{className:"top-bar-sub",children:"Workspace overview"})]}),e.jsxs("div",{className:"top-bar-actions",children:[e.jsx("button",{className:"icon-btn",onClick:h,title:"Refresh projects",children:e.jsx(i,{i:"refresh",s:18})}),e.jsx("button",{className:"icon-btn",onClick:()=>t("/settings"),title:"Settings",children:e.jsx(i,{i:"settings",s:18})})]})]}),e.jsx("div",{className:"dash-body",children:e.jsxs("div",{className:"dash-layout",children:[e.jsxs("div",{className:"dash-main",children:[e.jsxs("div",{className:"stats-row",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"folder",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:g?"—":d.length}),e.jsx("span",{className:"stat-label",children:"Projects"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"schedule",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:g?"—":S(D)}),e.jsx("span",{className:"stat-label",children:"Last edited"})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:e.jsx(i,{i:"calendar_month",s:18,c:"#75AADB"})}),e.jsxs("div",{children:[e.jsx("span",{className:"stat-value",children:X(n?.created_at)}),e.jsx("span",{className:"stat-label",children:"Member since"})]})]})]}),e.jsx("div",{className:"section-label",children:"Quick Actions"}),e.jsxs("div",{className:"quick-actions",children:[e.jsxs("button",{className:"quick-action quick-action--primary",onClick:_,children:[e.jsx("div",{className:"qa-icon",children:e.jsx(i,{i:"add",s:20,c:"white"})}),e.jsx("span",{children:"New Project"})]}),e.jsxs("button",{className:"quick-action",onClick:()=>{m(u.dashboardToolSelect,{tool:"long_to_shorts"}),t("/long-to-shorts")},children:[e.jsx("div",{className:"qa-icon",children:e.jsx(i,{i:"content_cut",s:18,c:"#75AADB"})}),e.jsx("span",{children:"Long to Shorts"}),e.jsx("span",{className:"qa-badge",children:"AI"})]})]}),e.jsxs("div",{className:"projects-header",children:[e.jsx("div",{className:"section-label",style:{margin:0},children:"Your Projects"}),d.length>0&&e.jsxs("div",{className:"proj-search",children:[e.jsx(i,{i:"search"}),e.jsx("input",{type:"text",placeholder:"Search...","aria-label":"Search projects",value:f,onChange:a=>l(a.target.value)})]})]}),v&&e.jsxs("div",{className:"error-banner",children:[e.jsx(i,{i:"cloud_off",s:18,c:"#ef4444"}),e.jsx("span",{children:v}),e.jsx("button",{className:"error-retry",onClick:h,children:"Retry"})]}),g&&!v&&e.jsx("div",{className:"projects-grid",children:[1,2,3,4,5,6].map(a=>e.jsxs("div",{className:"project-card",style:{pointerEvents:"none"},children:[e.jsx("div",{className:"project-thumb skel"}),e.jsxs("div",{className:"project-info",children:[e.jsx("div",{style:{width:"65%",height:"12px",borderRadius:"4px",background:"#1a2332",marginBottom:"5px"}}),e.jsx("div",{style:{width:"35%",height:"10px",borderRadius:"4px",background:"#151b24"}})]})]},a))}),W&&e.jsx("div",{className:"projects-grid",children:k.map(a=>e.jsxs("div",{className:"project-card",onClick:()=>F(a),children:[e.jsxs("div",{className:"project-thumb",children:[a.thumbnail?e.jsx("img",{src:a.thumbnail,alt:a.name}):e.jsx(i,{i:"movie",s:32,c:"rgba(255,255,255,0.1)"}),e.jsx("button",{className:"del-btn",onClick:r=>R(r,a.id),"aria-label":`Delete project ${a.name}`,title:"Delete project",children:e.jsx(i,{i:"delete",s:14,c:"white"})})]}),e.jsxs("div",{className:"project-info",children:[E===a.id?e.jsx("input",{autoFocus:!0,value:w,onChange:r=>z(r.target.value),onBlur:()=>P(a.id),onKeyDown:r=>{r.key==="Enter"&&P(a.id),r.key==="Escape"&&y(null)},onClick:r=>r.stopPropagation(),style:{background:"rgba(117,170,219,0.1)",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"4px",padding:"2px 6px",color:"white",fontSize:"13px",fontWeight:600,fontFamily:"inherit",width:"100%",outline:"none"}}):e.jsx("p",{className:"name",onDoubleClick:r=>I(r,a),title:"Double-click to rename",children:a.name}),e.jsxs("p",{className:"meta",children:[a.resolution," · ",a.duration||"0:00"," · ",S(a.savedAt)]})]})]},a.id))}),$&&e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(i,{i:"movie_edit",s:26,c:"rgba(117,170,219,0.5)"})}),e.jsx("h3",{children:"Your workspace is ready"}),e.jsx("p",{children:"Import a video, image, or audio file to create your first project and start editing."}),e.jsxs("div",{className:"empty-actions",children:[e.jsxs("button",{className:"empty-btn empty-btn--primary",onClick:_,children:[e.jsx(i,{i:"add",s:16,c:"#0a0a0a"}),"Import Media"]}),e.jsxs("button",{className:"empty-btn empty-btn--ghost",onClick:()=>t("/long-to-shorts"),children:[e.jsx(i,{i:"content_cut",s:14}),"Long to Shorts"]})]}),e.jsx("p",{className:"empty-hint",children:"Supports MP4, WebM, MP3, WAV, PNG, JPG and more"})]})]}),e.jsxs("aside",{className:"advisor-panel",children:[e.jsxs("div",{className:"advisor-label",children:[e.jsx(i,{i:"assistant",s:14,c:"rgba(255,255,255,0.25)"}),"Advisor"]}),e.jsxs("div",{className:"advisor-item advisor-item--warning",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"shield",s:16,c:"#f59e0b"}),e.jsx("h4",{children:"Account Security"})]}),e.jsx("p",{children:"Strengthen your account by reviewing your security settings."}),e.jsxs("button",{className:"advisor-action advisor-action--warning",onClick:()=>t("/settings"),children:[e.jsx(i,{i:"arrow_forward",s:12,c:"#f59e0b"}),"Review Settings"]})]}),d.length===0&&!g?e.jsxs("div",{className:"advisor-item advisor-item--info",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"rocket_launch",s:16,c:"#75AADB"}),e.jsx("h4",{children:"Getting Started"})]}),e.jsxs("ul",{className:"advisor-checklist",children:[e.jsxs("li",{className:"done",children:[e.jsx(i,{i:"check_circle",s:14,fill:!0}),e.jsx("span",{children:"Create account"})]}),e.jsxs("li",{children:[e.jsx(i,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Import your first media file"})]}),e.jsxs("li",{children:[e.jsx(i,{i:"radio_button_unchecked",s:14,c:"rgba(255,255,255,0.2)"}),e.jsx("span",{children:"Edit and export a project"})]})]})]}):d.length>0?e.jsxs("div",{className:"advisor-item advisor-item--success",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"check_circle",s:16,c:"#22c55e"}),e.jsx("h4",{children:"Workspace Active"})]}),e.jsxs("p",{children:[d.length," project",d.length!==1?"s":""," in your workspace. Last edited ",S(D),"."]})]}):null,e.jsxs("div",{className:"advisor-item advisor-item--info",children:[e.jsxs("div",{className:"advisor-item-header",children:[e.jsx(i,{i:"auto_awesome",s:16,c:"#75AADB"}),e.jsx("h4",{children:"Long to Shorts"})]}),e.jsx("p",{children:"Convert landscape videos to vertical format with AI-powered speaker tracking and smart reframing."}),e.jsxs("button",{className:"advisor-action advisor-action--info",onClick:()=>t("/long-to-shorts"),children:[e.jsx(i,{i:"arrow_forward",s:12,c:"#75AADB"}),"Try it"]})]})]})]})})]}),e.jsxs("div",{className:"bw-stripe",role:"presentation",children:[e.jsx("div",{style:{background:"#75AADB"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#000"}}),e.jsx("div",{style:{background:"white"}}),e.jsx("div",{style:{background:"#75AADB"}})]})]})};export{se as default};
