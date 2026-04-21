import{r as c,j as e}from"./DwQPoapS.js";import{t as r,b as i}from"./i0YWhXY0.js";import{B as h}from"./D8AsaMNA.js";import"./DZxFKcQQ.js";const u=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --cc-bg: #0c1220;
    --cc-bg-alt: #0e1624;
    --cc-card: #121a2a;
    --cc-card-raised: #18212f;
    --cc-border: rgba(255,255,255,0.07);
    --cc-border-hover: rgba(255,255,255,0.14);
    --cc-accent: #75AADB;
    --cc-accent-hover: #8bbae3;
    --cc-accent-soft: rgba(117,170,219,0.12);
    --cc-text: #ffffff;
    --cc-text-secondary: rgba(255,255,255,0.74);
    --cc-text-muted: rgba(255,255,255,0.46);
    --cc-text-whisper: rgba(255,255,255,0.22);
    --cc-font-sans: 'Spline Sans', sans-serif;
    --cc-font-display: 'Outfit', 'Spline Sans', sans-serif;
    --cc-font-serif: 'Instrument Serif', Georgia, serif;
    --cc-font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ob2-root {
    width: 100vw;
    min-height: 100vh;
    min-height: 100dvh;
    background: var(--cc-bg);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: hidden;
    font-family: var(--cc-font-sans);
    color: var(--cc-text);
  }
  .ob2-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .ob2-root::after {
    content: ''; position: fixed; z-index: 0; pointer-events: none;
    top: -15%; right: -12%; width: 720px; height: 720px; border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.09) 0%, rgba(117,170,219,0.02) 40%, transparent 70%);
    filter: blur(24px);
  }

  .ob2-bg-num {
    position: absolute; z-index: 0; pointer-events: none; user-select: none;
    top: 50%; left: -8%; transform: translateY(-50%);
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-size: clamp(240px, 36vw, 520px);
    line-height: 0.9;
    color: var(--cc-accent);
    opacity: 0.05;
    letter-spacing: -0.04em;
  }

  /* Header — shared vocabulary with Step 1 */
  .ob2-header {
    width: 100%; padding: 22px 36px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--cc-border);
    position: relative; z-index: 2;
    opacity: 0; animation: ob2-fade-down 0.6s ease forwards;
  }
  .ob2-brand { display: flex; align-items: baseline; gap: 10px; }
  .ob2-brand-mono {
    font-family: var(--cc-font-serif);
    font-style: italic; font-size: 26px;
    color: var(--cc-accent); line-height: 1;
  }
  .ob2-brand-name {
    font-family: var(--cc-font-display);
    font-size: 16px; font-weight: 700; letter-spacing: -0.02em; color: var(--cc-text);
  }
  .ob2-progress { display: flex; align-items: center; gap: 16px; }
  .ob2-progress-strokes { display: flex; align-items: center; gap: 6px; }
  .ob2-stroke {
    width: 40px; height: 5px; border-radius: 999px;
    background: rgba(255,255,255,0.06); position: relative; overflow: hidden;
  }
  .ob2-stroke.is-filled {
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 50%, #8bbae3 100%);
    box-shadow: 0 0 12px rgba(117,170,219,0.35);
  }
  .ob2-stroke.is-active {
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 100%);
    box-shadow: 0 0 14px rgba(117,170,219,0.45);
  }
  .ob2-stroke.is-active::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: ob2-shimmer 2.6s ease-in-out infinite;
  }
  .ob2-step-label {
    font-family: var(--cc-font-mono);
    font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em;
    color: var(--cc-text-muted); text-transform: uppercase;
  }

  /* Main */
  .ob2-main {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 56px 32px 80px;
    position: relative;
    z-index: 1;
  }
  .ob2-container { width: 100%; max-width: 780px; }

  .ob2-heading {
    text-align: center;
    margin-bottom: 48px;
    opacity: 0; animation: ob2-fade-up 0.7s ease 0.12s forwards;
  }
  .ob2-eyebrow {
    font-family: var(--cc-font-mono);
    font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--cc-accent);
    margin-bottom: 18px; display: inline-flex; align-items: center; gap: 10px;
  }
  .ob2-eyebrow::before, .ob2-eyebrow::after {
    content: ''; width: 22px; height: 1px; background: var(--cc-accent); opacity: 0.5;
  }
  .ob2-title {
    font-family: var(--cc-font-display);
    font-size: clamp(32px, 4.6vw, 44px);
    font-weight: 600; line-height: 1.05; letter-spacing: -0.035em;
    margin-bottom: 14px; color: var(--cc-text);
  }
  .ob2-title-em {
    font-family: var(--cc-font-serif);
    font-style: italic; font-weight: 400; color: var(--cc-accent);
  }
  .ob2-subtitle {
    font-size: 15px; color: var(--cc-text-secondary);
    line-height: 1.55; max-width: 48ch; margin: 0 auto;
  }

  /* Sections */
  .ob2-section {
    margin-bottom: 40px;
    opacity: 0; animation: ob2-fade-up 0.7s ease forwards;
  }
  .ob2-section:nth-child(1) { animation-delay: 0.22s; }
  .ob2-section:nth-child(2) { animation-delay: 0.32s; }

  .ob2-section-title {
    font-family: var(--cc-font-mono);
    font-size: 10.5px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--cc-text-muted); margin-bottom: 14px;
    display: inline-flex; align-items: center; gap: 10px;
  }
  .ob2-section-title::before {
    content: ''; width: 18px; height: 1px; background: var(--cc-text-muted); opacity: 0.5;
  }

  /* Skill cards — large, tactile, softly rounded */
  .ob2-skills-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
  }
  .ob2-skill-card {
    display: flex; flex-direction: column; align-items: center;
    gap: 14px; padding: 24px 16px;
    border-radius: 14px;
    border: 1px solid var(--cc-border);
    background: var(--cc-card);
    cursor: pointer; outline: none;
    position: relative;
    transition: transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1), border-color 220ms ease, background 220ms ease, box-shadow 260ms ease;
  }
  .ob2-skill-card:hover {
    transform: translateY(-3px);
    border-color: var(--cc-border-hover);
    background: var(--cc-card-raised);
    box-shadow: 0 12px 32px rgba(0,0,0,0.35);
  }
  .ob2-skill-card:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 3px; }
  .ob2-skill-card.selected {
    border-color: var(--cc-accent);
    background: linear-gradient(145deg, rgba(117,170,219,0.14), rgba(117,170,219,0.04));
    box-shadow: 0 14px 36px rgba(117,170,219,0.18);
  }

  .ob2-skill-check {
    position: absolute; top: 10px; right: 10px;
    width: 22px; height: 22px; border-radius: 50%;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.16);
    display: flex; align-items: center; justify-content: center;
    transition: background 200ms ease, border-color 200ms ease;
  }
  .ob2-skill-card.selected .ob2-skill-check {
    background: var(--cc-accent);
    border-color: var(--cc-accent);
  }

  .ob2-skill-icon {
    width: 54px; height: 54px; border-radius: 16px;
    background: var(--cc-accent-soft);
    display: flex; align-items: center; justify-content: center;
    transition: background 200ms ease;
  }
  .ob2-skill-card.selected .ob2-skill-icon {
    background: rgba(255,255,255,0.12);
  }

  .ob2-skill-label {
    font-family: var(--cc-font-display);
    font-size: 16px; font-weight: 600; letter-spacing: -0.005em;
    color: var(--cc-text);
  }

  /* Purpose chips — soft, pill-shaped */
  .ob2-chips {
    display: flex; flex-wrap: wrap; gap: 8px;
  }
  .ob2-chip {
    padding: 11px 18px;
    background: var(--cc-card);
    border: 1px solid var(--cc-border);
    color: var(--cc-text-secondary);
    font-family: var(--cc-font-sans);
    font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
    border-radius: 999px;
    cursor: pointer;
    transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 160ms ease;
  }
  .ob2-chip:hover {
    border-color: var(--cc-border-hover);
    color: var(--cc-text);
    transform: translateY(-1px);
  }
  .ob2-chip.selected {
    background: var(--cc-accent);
    border-color: var(--cc-accent);
    color: #0a0a0a;
    font-weight: 600;
    box-shadow: 0 4px 14px rgba(117,170,219,0.25);
  }

  /* Actions */
  .ob2-actions {
    display: flex; flex-direction: column; align-items: center;
    gap: 14px; margin-top: 16px;
    opacity: 0; animation: ob2-fade-up 0.7s ease 0.46s forwards;
  }

  .ob2-btn-primary {
    padding: 16px 36px;
    border: none;
    border-radius: 10px;
    font-family: var(--cc-font-display);
    font-size: 16px; font-weight: 600; letter-spacing: -0.01em;
    cursor: pointer;
    background: var(--cc-accent); color: #0a0a0a;
    display: inline-flex; align-items: center; gap: 10px;
    transition: background 200ms ease, box-shadow 260ms ease, transform 140ms ease;
    box-shadow: 0 10px 28px rgba(117,170,219,0.22), inset 0 -2px 0 rgba(0,0,0,0.15);
    min-width: 220px;
    justify-content: center;
  }
  .ob2-btn-primary:hover {
    background: var(--cc-accent-hover);
    box-shadow: 0 14px 40px rgba(117,170,219,0.32), inset 0 -2px 0 rgba(0,0,0,0.15);
    transform: translateY(-2px);
  }
  .ob2-btn-primary:active { transform: translateY(0); }
  .ob2-btn-primary .arrow {
    font-family: var(--cc-font-serif);
    font-style: italic; font-size: 20px;
    transition: transform 220ms ease;
  }
  .ob2-btn-primary:hover .arrow { transform: translateX(4px); }

  .ob2-skip-row { display: flex; align-items: center; gap: 12px; }
  .ob2-btn-ghost {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font-sans);
    font-size: 13px; font-weight: 500; color: var(--cc-text-muted);
    padding: 6px 12px; transition: color 160ms ease;
    text-decoration: none;
  }
  .ob2-btn-ghost:hover { color: var(--cc-accent); }

  .ob2-btn-skip-all {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font-mono);
    font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--cc-text-whisper); padding: 4px 8px;
    transition: color 160ms ease; text-decoration: none;
  }
  .ob2-btn-skip-all:hover { color: var(--cc-text-muted); }
  .ob2-skip-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--cc-text-whisper); }

  /* Animations */
  @keyframes ob2-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob2-fade-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob2-shimmer { 0% { transform: translateX(-100%); } 60% { transform: translateX(100%); } 100% { transform: translateX(100%); } }

  @media (max-width: 768px) {
    .ob2-skills-grid { grid-template-columns: 1fr; gap: 10px; }
    .ob2-skill-card { flex-direction: row; padding: 16px 18px; gap: 16px; }
    .ob2-skill-icon { width: 44px; height: 44px; border-radius: 12px; }
    .ob2-skill-check { top: 50%; transform: translateY(-50%); right: 14px; }
    .ob2-bg-num { display: none; }
  }

  @media (max-width: 640px) {
    .ob2-header { padding: 16px 20px; }
    .ob2-main { padding: 36px 20px 60px; }
    .ob2-title { font-size: 28px; }
    .ob2-btn-primary { width: 100%; max-width: 320px; }
    .ob2-step-label { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ob2-header, .ob2-heading, .ob2-section, .ob2-actions {
      opacity: 1 !important; animation: none !important;
    }
    .ob2-stroke.is-active::after { animation: none; }
  }
`,j=({onContinue:l,onSkip:d,onSkipAll:p})=>{const[b,n]=c.useState("intermediate"),[s,x]=c.useState([]),m=a=>x(o=>o.includes(a)?o.filter(t=>t!==a):[...o,a]),f=[{id:"beginner",label:"Beginner",icon:"potted_plant"},{id:"intermediate",label:"Intermediate",icon:"local_fire_department"},{id:"pro",label:"Pro",icon:"rocket_launch"}],g=[{id:"youtube",label:"YouTube"},{id:"tiktok",label:"TikTok / Reels"},{id:"school",label:"School & Education"},{id:"business",label:"Business"},{id:"personal",label:"Personal"},{id:"freelance",label:"Freelance / Client Work"}];return e.jsxs("div",{className:"ob2-root",children:[e.jsx("style",{children:u}),e.jsx("span",{className:"ob2-bg-num","aria-hidden":"true",children:"02"}),e.jsxs("header",{className:"ob2-header",children:[e.jsxs("div",{className:"ob2-brand",children:[e.jsx("span",{className:"ob2-brand-mono","aria-hidden":"true",children:"CC"}),e.jsx("span",{className:"ob2-brand-name",children:"ClipCut"})]}),e.jsxs("div",{className:"ob2-progress",children:[e.jsxs("div",{className:"ob2-progress-strokes","aria-hidden":"true",children:[e.jsx("div",{className:"ob2-stroke is-filled"}),e.jsx("div",{className:"ob2-stroke is-active"}),e.jsx("div",{className:"ob2-stroke"})]}),e.jsx("span",{className:"ob2-step-label",children:"Step 2 · of 3"})]})]}),e.jsx("main",{className:"ob2-main",children:e.jsxs("div",{className:"ob2-container",children:[e.jsxs("div",{className:"ob2-heading",children:[e.jsx("div",{className:"ob2-eyebrow",children:"Your craft"}),e.jsxs("h1",{className:"ob2-title",children:["How will you use ",e.jsx("span",{className:"ob2-title-em",children:"ClipCut?"})]}),e.jsx("p",{className:"ob2-subtitle",children:"This helps us tailor the interface and surface the right tools at the right time."})]}),e.jsxs("section",{className:"ob2-section",children:[e.jsx("h3",{className:"ob2-section-title",children:"Experience level"}),e.jsx("div",{className:"ob2-skills-grid",role:"radiogroup","aria-label":"Your skill level",children:f.map(a=>{const o=b===a.id;return e.jsxs("div",{className:`ob2-skill-card ${o?"selected":""}`,role:"radio","aria-checked":o,tabIndex:0,onClick:()=>n(a.id),onKeyDown:t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n(a.id))},children:[e.jsx("div",{className:"ob2-skill-check","aria-hidden":"true",children:o&&e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"13px",color:"#0a0a0a",fontVariationSettings:"'FILL' 1"},children:"check"})}),e.jsx("div",{className:"ob2-skill-icon",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"26px",color:o?"#ffffff":"var(--cc-accent)"},children:a.icon})}),e.jsx("span",{className:"ob2-skill-label",children:a.label})]},a.id)})})]}),e.jsxs("section",{className:"ob2-section",children:[e.jsx("h3",{className:"ob2-section-title",children:"What are you creating for?"}),e.jsx("div",{className:"ob2-chips",children:g.map(a=>e.jsx("button",{className:`ob2-chip ${s.includes(a.id)?"selected":""}`,"aria-pressed":s.includes(a.id),onClick:()=>m(a.id),children:a.label},a.id))})]}),e.jsxs("div",{className:"ob2-actions",children:[e.jsxs("button",{className:"ob2-btn-primary",onClick:()=>{r(i.onboardingContinue,{step:"2"}),l?.()},children:["Continue",e.jsx("span",{className:"arrow","aria-hidden":"true",children:"→"})]}),e.jsxs("div",{className:"ob2-skip-row",children:[e.jsx("a",{href:"#",className:"ob2-btn-ghost",onClick:a=>{a.preventDefault(),r(i.onboardingSkip,{step:"2"}),d?.()},children:"Skip this step"}),e.jsx("div",{className:"ob2-skip-dot","aria-hidden":"true"}),e.jsx("a",{href:"#",className:"ob2-btn-skip-all",onClick:a=>{a.preventDefault(),r(i.onboardingSkip,{step:"2",action:"skip_all"}),p?.()},children:"Skip onboarding"})]})]})]})}),e.jsx(h,{height:"4px"})]})};export{j as default};
