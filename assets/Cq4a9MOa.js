import{r as c,j as e}from"./DwQPoapS.js";import{t as i,b as r}from"./DIBEc7PS.js";import{B as f}from"./D8AsaMNA.js";import"./DZxFKcQQ.js";const u=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');
  :root {
    --cc-bg: #0a0a0a;
    --cc-bg-alt: #0d1117;
    --cc-surface: #1a2332;
    --cc-surface-raised: rgba(26,35,50,0.6);
    --cc-border: rgba(255,255,255,0.06);
    --cc-border-hover: rgba(255,255,255,0.1);
    --cc-border-focus: rgba(117,170,219,0.45);
    --cc-accent: #75AADB;
    --cc-accent-hover: #8bbae3;
    --cc-accent-soft: rgba(117,170,219,0.1);
    --cc-accent-glow: rgba(117,170,219,0.06);
    --cc-text: #ffffff;
    --cc-text-secondary: rgba(255,255,255,0.6);
    --cc-text-muted: rgba(255,255,255,0.35);
    --cc-text-dim: rgba(255,255,255,0.2);
    --cc-font: 'Spline Sans', sans-serif;
    --cc-radius: 12px;
    --cc-radius-sm: 8px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ob2-root {
    width: 100vw;
    height: 100vh;
    background: var(--cc-bg);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    font-family: var(--cc-font);
    color: var(--cc-text);
  }

  .ob2-root::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  .ob2-root::after {
    content: '';
    position: fixed;
    bottom: -20%;
    left: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.035) 0%, transparent 65%);
    z-index: 0;
    pointer-events: none;
  }

  /* —— Header —— */
  .ob2-header {
    width: 100%;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--cc-border);
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: ob2FadeDown 0.6s ease forwards;
  }

  .ob2-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ob2-logo-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: linear-gradient(135deg, var(--cc-accent), #5a8cbf);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .ob2-logo-badge {
    position: absolute;
    bottom: -2px;
    right: -4px;
    font-size: 11px;
    color: var(--cc-text);
    background: var(--cc-bg);
    border-radius: 50%;
    padding: 1px;
    line-height: 1;
  }

  .ob2-logo-name { font-size: 18px; font-weight: 700; letter-spacing: -0.3px; }

  .ob2-progress { display: flex; align-items: center; gap: 16px; }
  .ob2-dots { display: flex; gap: 8px; }

  .ob2-dot {
    width: 32px; height: 4px; border-radius: 2px;
    background: var(--cc-border); transition: all 0.4s ease;
    position: relative; overflow: hidden;
  }
  .ob2-dot.active { background: var(--cc-accent); box-shadow: 0 0 12px rgba(117,170,219,0.35); }
  .ob2-dot.active::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    animation: ob2Shimmer 2.5s ease-in-out infinite;
  }
  .ob2-dot.done { background: var(--cc-accent); opacity: 0.45; }
  .ob2-step-label { font-size: 12px; font-weight: 500; color: var(--cc-text-muted); }

  /* —— Main —— */
  .ob2-main {
    flex: 1;
    display: flex;
    position: relative;
    z-index: 1;
    overflow-y: auto;
  }

  /* Decorative side strip */
  .ob2-side-decor {
    width: 64px;
    min-width: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 72px;
    gap: 12px;
    opacity: 0;
    animation: ob2FadeRight 0.8s ease 0.15s forwards;
  }

  .ob2-side-line {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, var(--cc-accent), transparent);
    opacity: 0.3;
  }

  .ob2-side-num {
    font-size: 48px;
    font-weight: 800;
    color: var(--cc-accent);
    opacity: 0.06;
    line-height: 1;
  }

  .ob2-content {
    flex: 1;
    max-width: 820px;
    padding: 48px 40px 60px 0;
  }

  /* Heading */
  .ob2-heading {
    margin-bottom: 44px;
    opacity: 0;
    animation: ob2FadeUp 0.7s ease 0.1s forwards;
  }

  .ob2-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--cc-accent);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ob2-eyebrow::after {
    content: '';
    flex: 1;
    max-width: 80px;
    height: 1px;
    background: linear-gradient(to right, var(--cc-accent), transparent);
    opacity: 0.3;
  }

  .ob2-title {
    font-size: 38px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 10px;
  }

  .ob2-subtitle {
    font-size: 15px;
    color: var(--cc-text-secondary);
    line-height: 1.5;
  }

  /* Sections */
  .ob2-section {
    margin-bottom: 44px;
    opacity: 0;
    animation: ob2FadeUp 0.7s ease 0.25s forwards;
  }

  .ob2-section:nth-child(3) { animation-delay: 0.4s; }

  .ob2-section-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--cc-text);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ob2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--cc-border);
  }

  /* Skill cards */
  .ob2-skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .ob2-skill-card {
    position: relative;
    padding: 26px 18px;
    border-radius: var(--cc-radius);
    border: 1px solid var(--cc-border);
    background: var(--cc-bg-alt);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    transition: all 0.25s ease;
    outline: none;
  }

  .ob2-skill-card:hover {
    border-color: var(--cc-border-hover);
    background: var(--cc-surface);
  }

  .ob2-skill-card.selected {
    border-color: var(--cc-accent);
    background: var(--cc-accent-soft);
    box-shadow: 0 0 20px rgba(117,170,219,0.08);
  }

  .ob2-skill-card:focus-visible {
    outline: 2px solid var(--cc-accent);
    outline-offset: 2px;
  }

  .ob2-skill-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(117,170,219,0.06);
    transition: all 0.25s ease;
  }

  .ob2-skill-card.selected .ob2-skill-icon {
    background: var(--cc-accent);
  }

  .ob2-skill-card.selected .ob2-skill-icon .material-symbols-outlined {
    color: white !important;
  }

  .ob2-skill-label {
    font-size: 15px;
    font-weight: 600;
    text-align: center;
  }

  .ob2-skill-check {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--cc-border);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .ob2-skill-card.selected .ob2-skill-check {
    border-color: var(--cc-accent);
    background: var(--cc-accent);
  }

  /* Purpose chips */
  .ob2-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .ob2-chip {
    padding: 11px 22px;
    border-radius: 99px;
    border: 1px solid var(--cc-border);
    background: var(--cc-bg-alt);
    color: var(--cc-text-muted);
    font-family: var(--cc-font);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    outline: none;
  }

  .ob2-chip:hover {
    border-color: var(--cc-border-hover);
    color: var(--cc-text);
  }

  .ob2-chip.selected {
    border-color: var(--cc-accent);
    background: var(--cc-accent-soft);
    color: var(--cc-accent);
    font-weight: 600;
  }

  .ob2-chip:focus-visible {
    outline: 2px solid var(--cc-accent);
    outline-offset: 2px;
  }

  /* Actions */
  .ob2-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-top: 8px;
    opacity: 0;
    animation: ob2FadeUp 0.7s ease 0.55s forwards;
  }

  .ob2-btn-primary {
    padding: 16px 48px;
    border: none;
    border-radius: var(--cc-radius-sm);
    font-family: var(--cc-font);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
    background: var(--cc-accent);
    color: var(--cc-bg);
  }

  .ob2-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .ob2-btn-primary:hover {
    background: var(--cc-accent-hover);
    box-shadow: 0 6px 24px rgba(117,170,219,0.2);
    transform: translateY(-1px);
  }

  .ob2-btn-primary:hover::before { transform: translateX(100%); }

  .ob2-skip-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ob2-btn-ghost {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font); font-size: 13px; font-weight: 500;
    color: var(--cc-text-muted); padding: 4px 0;
    transition: color 0.2s ease; text-decoration: none;
  }
  .ob2-btn-ghost:hover { color: var(--cc-accent); }

  .ob2-btn-skip-all {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font); font-size: 12px; font-weight: 400;
    color: var(--cc-text-dim); padding: 4px 0;
    transition: color 0.2s ease; text-decoration: none;
  }
  .ob2-btn-skip-all:hover { color: var(--cc-text-muted); }

  .ob2-skip-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: var(--cc-text-dim);
  }

  /* Animations */
  @keyframes ob2FadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob2FadeDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob2FadeRight { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes ob2Shimmer { 0% { transform: translateX(-100%); } 50% { transform: translateX(100%); } 100% { transform: translateX(100%); } }

  @media (max-width: 768px) {
    .ob2-side-decor { display: none; }
    .ob2-content { padding: 32px 20px 60px; }
    .ob2-title { font-size: 28px; }
    .ob2-skills-grid { grid-template-columns: 1fr; gap: 10px; }
    .ob2-skill-card { flex-direction: row; padding: 16px 18px; gap: 14px; }
    .ob2-skill-icon { width: 42px; height: 42px; }
    .ob2-skill-check { top: 50%; transform: translateY(-50%); right: 14px; }
    .ob2-btn-primary { width: 100%; }
    .ob2-actions { align-items: center; }
    .ob2-step-label { display: none; }
  }
`,j=({onContinue:l,onSkip:d,onSkipAll:p})=>{const[b,n]=c.useState("intermediate"),[s,x]=c.useState([]),g=o=>x(a=>a.includes(o)?a.filter(t=>t!==o):[...a,o]),m=[{id:"beginner",label:"Beginner",icon:"potted_plant"},{id:"intermediate",label:"Intermediate",icon:"local_fire_department"},{id:"pro",label:"Pro",icon:"rocket_launch"}],h=[{id:"youtube",label:"YouTube"},{id:"tiktok",label:"TikTok / Reels"},{id:"school",label:"School & Education"},{id:"business",label:"Business"},{id:"personal",label:"Personal"},{id:"freelance",label:"Freelance / Client Work"}];return e.jsxs("div",{className:"ob2-root",children:[e.jsx("style",{children:u}),e.jsxs("header",{className:"ob2-header",children:[e.jsxs("div",{className:"ob2-brand",children:[e.jsxs("div",{className:"ob2-logo-icon",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",color:"white",fontVariationSettings:"'FILL' 1"},children:"movie"}),e.jsx("span",{className:"ob2-logo-badge material-symbols-outlined",children:"content_cut"})]}),e.jsx("span",{className:"ob2-logo-name",children:"ClipCut"})]}),e.jsxs("div",{className:"ob2-progress",children:[e.jsxs("div",{className:"ob2-dots",children:[e.jsx("div",{className:"ob2-dot done"}),e.jsx("div",{className:"ob2-dot active"}),e.jsx("div",{className:"ob2-dot"})]}),e.jsx("span",{className:"ob2-step-label",children:"Step 2 of 3"})]})]}),e.jsxs("main",{className:"ob2-main",children:[e.jsxs("div",{className:"ob2-side-decor",children:[e.jsx("div",{className:"ob2-side-line"}),e.jsx("div",{className:"ob2-side-num",children:"02"})]}),e.jsxs("div",{className:"ob2-content",children:[e.jsxs("div",{className:"ob2-heading",children:[e.jsx("div",{className:"ob2-eyebrow",children:"Your Craft"}),e.jsx("h1",{className:"ob2-title",children:"How will you use ClipCut?"}),e.jsx("p",{className:"ob2-subtitle",children:"This helps us tailor the interface and surface the right tools for you."})]}),e.jsxs("section",{className:"ob2-section",children:[e.jsx("h3",{className:"ob2-section-title",children:"Experience level"}),e.jsx("div",{className:"ob2-skills-grid",role:"radiogroup","aria-label":"Your skill level",children:m.map(o=>{const a=b===o.id;return e.jsxs("div",{className:`ob2-skill-card ${a?"selected":""}`,role:"radio","aria-checked":a,tabIndex:0,onClick:()=>n(o.id),onKeyDown:t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n(o.id))},children:[e.jsx("div",{className:"ob2-skill-check",children:a&&e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"12px",color:"#0a0a0a",fontVariationSettings:"'FILL' 1"},children:"check"})}),e.jsx("div",{className:"ob2-skill-icon",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"26px",color:a?"white":"var(--cc-accent)"},children:o.icon})}),e.jsx("span",{className:"ob2-skill-label",children:o.label})]},o.id)})})]}),e.jsxs("section",{className:"ob2-section",children:[e.jsx("h3",{className:"ob2-section-title",children:"What are you creating for?"}),e.jsx("div",{className:"ob2-chips",children:h.map(o=>e.jsx("button",{className:`ob2-chip ${s.includes(o.id)?"selected":""}`,"aria-pressed":s.includes(o.id),onClick:()=>g(o.id),children:o.label},o.id))})]}),e.jsxs("div",{className:"ob2-actions",children:[e.jsx("button",{className:"ob2-btn-primary",onClick:()=>{i(r.onboardingContinue,{step:"2"}),l?.()},children:"Continue"}),e.jsxs("div",{className:"ob2-skip-row",children:[e.jsx("a",{href:"#",className:"ob2-btn-ghost",onClick:o=>{o.preventDefault(),i(r.onboardingSkip,{step:"2"}),d?.()},children:"Skip this step"}),e.jsx("div",{className:"ob2-skip-dot"}),e.jsx("a",{href:"#",className:"ob2-btn-skip-all",onClick:o=>{o.preventDefault(),i(r.onboardingSkip,{step:"2",action:"skip_all"}),p?.()},children:"Skip onboarding"})]})]})]})]}),e.jsx(f,{height:"4px"})]})};export{j as default};
