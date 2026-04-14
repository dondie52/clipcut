import{r as n,j as e}from"./DwQPoapS.js";import{t,b as s}from"./DNzcy1-B.js";import{B as u}from"./D8AsaMNA.js";import"./DZxFKcQQ.js";const v=`
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

  .ob3-root {
    width: 100vw; height: 100vh; background: var(--cc-bg);
    display: flex; flex-direction: column; position: relative;
    overflow: hidden; font-family: var(--cc-font); color: var(--cc-text);
  }

  .ob3-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  .ob3-glow {
    position: fixed; top: -10%; left: 50%; transform: translateX(-50%);
    width: 700px; height: 350px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(117,170,219,0.04) 0%, transparent 70%);
    z-index: 0; pointer-events: none;
  }

  /* Header */
  .ob3-header {
    width: 100%; padding: 20px 32px; display: flex; align-items: center;
    justify-content: space-between; border-bottom: 1px solid var(--cc-border);
    position: relative; z-index: 2; opacity: 0;
    animation: ob3FadeDown 0.6s ease forwards;
  }

  .ob3-brand { display: flex; align-items: center; gap: 10px; }

  .ob3-logo-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: linear-gradient(135deg, var(--cc-accent), #5a8cbf);
    display: flex; align-items: center; justify-content: center; position: relative;
  }
  .ob3-logo-badge {
    position: absolute; bottom: -2px; right: -4px; font-size: 11px;
    color: var(--cc-text); background: var(--cc-bg); border-radius: 50%; padding: 1px; line-height: 1;
  }
  .ob3-logo-name { font-size: 18px; font-weight: 700; letter-spacing: -0.3px; }

  .ob3-progress { display: flex; align-items: center; gap: 16px; }
  .ob3-dots { display: flex; gap: 8px; }
  .ob3-dot { width: 32px; height: 4px; border-radius: 2px; background: var(--cc-border); transition: all 0.4s ease; position: relative; overflow: hidden; }
  .ob3-dot.done { background: var(--cc-accent); opacity: 0.45; }
  .ob3-dot.active { background: var(--cc-accent); box-shadow: 0 0 12px rgba(117,170,219,0.35); }
  .ob3-dot.active::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); animation: ob3Shimmer 2.5s ease-in-out infinite; }
  .ob3-step-label { font-size: 12px; font-weight: 500; color: var(--cc-text-muted); }

  /* Main */
  .ob3-main {
    flex: 1; display: flex; align-items: flex-start; justify-content: center;
    padding: 44px 32px 60px; position: relative; z-index: 1; overflow-y: auto;
  }

  .ob3-container { width: 100%; max-width: 660px; }

  .ob3-heading {
    text-align: center; margin-bottom: 44px; opacity: 0;
    animation: ob3FadeUp 0.7s ease 0.1s forwards;
  }

  .ob3-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--cc-accent); margin-bottom: 14px;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .ob3-eyebrow::before, .ob3-eyebrow::after { content: ''; width: 18px; height: 1px; background: var(--cc-accent); opacity: 0.35; }

  .ob3-title { font-size: 34px; font-weight: 800; line-height: 1.15; letter-spacing: -0.8px; margin-bottom: 8px; }
  .ob3-subtitle { font-size: 15px; color: var(--cc-text-secondary); line-height: 1.5; }

  /* Settings grid */
  .ob3-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-bottom: 32px;
  }

  .ob3-section {
    opacity: 0; animation: ob3FadeUp 0.7s ease 0.25s forwards;
  }
  .ob3-section:nth-child(2) { animation-delay: 0.35s; }

  .ob3-section-title {
    font-size: 11px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--cc-text-muted); margin-bottom: 12px;
  }

  /* Resolution cards */
  .ob3-res-stack { display: flex; flex-direction: column; gap: 8px; }

  .ob3-res-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border-radius: var(--cc-radius-sm);
    border: 1px solid var(--cc-border); background: var(--cc-bg-alt);
    cursor: pointer; transition: all 0.25s ease; outline: none;
  }
  .ob3-res-card:hover { border-color: var(--cc-border-hover); }
  .ob3-res-card.selected { border-color: var(--cc-accent); background: var(--cc-accent-soft); }
  .ob3-res-card:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 2px; }

  .ob3-res-left { display: flex; align-items: center; gap: 12px; }
  .ob3-res-value { font-size: 16px; font-weight: 700; }
  .ob3-res-desc { font-size: 12px; color: var(--cc-text-dim); }

  .ob3-radio {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid var(--cc-border); display: flex;
    align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0;
  }
  .ob3-res-card.selected .ob3-radio { border-color: var(--cc-accent); }
  .ob3-radio-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--cc-accent);
    opacity: 0; transform: scale(0); transition: all 0.2s ease;
  }
  .ob3-res-card.selected .ob3-radio-dot { opacity: 1; transform: scale(1); }

  /* Toggle rows */
  .ob3-toggles { display: flex; flex-direction: column; gap: 8px; }

  .ob3-toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border-radius: var(--cc-radius-sm);
    border: 1px solid var(--cc-border); background: var(--cc-bg-alt);
  }

  .ob3-toggle-info { flex: 1; min-width: 0; }
  .ob3-toggle-label { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .ob3-toggle-desc { font-size: 12px; color: var(--cc-text-dim); line-height: 1.3; }

  .ob3-switch {
    width: 44px; height: 24px; border-radius: 12px; background: rgba(255,255,255,0.1);
    cursor: pointer; position: relative; transition: all 0.25s ease;
    border: none; padding: 0; flex-shrink: 0; margin-left: 14px;
  }
  .ob3-switch.on { background: var(--cc-accent); }
  .ob3-switch:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 2px; }

  .ob3-switch-knob {
    position: absolute; top: 2px; left: 2px; width: 20px; height: 20px;
    border-radius: 50%; background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ob3-switch.on .ob3-switch-knob { left: 22px; }

  /* Auto-save card */
  .ob3-autosave {
    opacity: 0; animation: ob3FadeUp 0.7s ease 0.45s forwards;
    margin-bottom: 36px;
  }

  .ob3-autosave-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px; border-radius: var(--cc-radius);
    border: 1px solid var(--cc-border);
    background: linear-gradient(135deg, var(--cc-bg-alt) 0%, var(--cc-surface) 100%);
  }

  .ob3-autosave-left { display: flex; align-items: center; gap: 14px; flex: 1; }

  .ob3-autosave-icon {
    width: 42px; height: 42px; border-radius: 10px; background: var(--cc-accent-soft);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  /* Actions */
  .ob3-actions {
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    opacity: 0; animation: ob3FadeUp 0.7s ease 0.6s forwards;
  }

  .ob3-btn-launch {
    width: 100%; max-width: 340px; padding: 17px; border: none;
    border-radius: var(--cc-radius-sm); font-family: var(--cc-font);
    font-size: 16px; font-weight: 700; cursor: pointer;
    transition: all 0.3s ease; position: relative; overflow: hidden;
    background: var(--cc-accent); color: var(--cc-bg);
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 4px 16px rgba(117,170,219,0.2);
  }

  .ob3-btn-launch:hover {
    background: var(--cc-accent-hover);
    box-shadow: 0 8px 32px rgba(117,170,219,0.3);
    transform: translateY(-2px);
  }

  .ob3-btn-launch:active { transform: translateY(0); }

  .ob3-btn-ghost {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font); font-size: 13px; font-weight: 500;
    color: var(--cc-text-muted); padding: 6px 12px;
    transition: color 0.2s ease; text-decoration: none;
  }
  .ob3-btn-ghost:hover { color: var(--cc-accent); }

  /* Animations */
  @keyframes ob3FadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob3FadeDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ob3Shimmer { 0% { transform: translateX(-100%); } 50% { transform: translateX(100%); } 100% { transform: translateX(100%); } }

  @media (max-width: 640px) {
    .ob3-header { padding: 16px 20px; }
    .ob3-main { padding: 28px 20px 60px; }
    .ob3-title { font-size: 28px; }
    .ob3-grid { grid-template-columns: 1fr; gap: 24px; }
    .ob3-step-label { display: none; }
  }
`,N=({onComplete:d,onSkip:b})=>{const[c,p]=n.useState({email:!0,push:!1,projectUpdates:!0}),[x,l]=n.useState("1080p"),[i,g]=n.useState(!0),m=o=>{p(a=>({...a,[o]:!a[o]})),t(s.onboardingContinue,{step:"3",action:"toggle_notification",key:o})},f=[{id:"480p",label:"480p",desc:"SD"},{id:"720p",label:"720p",desc:"HD"},{id:"1080p",label:"1080p",desc:"Full HD"}],h=[{key:"email",label:"Email updates",desc:"Project & feature news"},{key:"push",label:"Push alerts",desc:"Real-time browser alerts"},{key:"projectUpdates",label:"Export alerts",desc:"When exports finish"}];return e.jsxs("div",{className:"ob3-root",children:[e.jsx("style",{children:v}),e.jsx("div",{className:"ob3-glow"}),e.jsxs("header",{className:"ob3-header",children:[e.jsxs("div",{className:"ob3-brand",children:[e.jsxs("div",{className:"ob3-logo-icon",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",color:"white",fontVariationSettings:"'FILL' 1"},children:"movie"}),e.jsx("span",{className:"ob3-logo-badge material-symbols-outlined",children:"content_cut"})]}),e.jsx("span",{className:"ob3-logo-name",children:"ClipCut"})]}),e.jsxs("div",{className:"ob3-progress",children:[e.jsxs("div",{className:"ob3-dots",children:[e.jsx("div",{className:"ob3-dot done"}),e.jsx("div",{className:"ob3-dot done"}),e.jsx("div",{className:"ob3-dot active"})]}),e.jsx("span",{className:"ob3-step-label",children:"Final step"})]})]}),e.jsx("main",{className:"ob3-main",children:e.jsxs("div",{className:"ob3-container",children:[e.jsxs("div",{className:"ob3-heading",children:[e.jsx("div",{className:"ob3-eyebrow",children:"Almost There"}),e.jsx("h1",{className:"ob3-title",children:"Fine-tune your workspace"}),e.jsx("p",{className:"ob3-subtitle",children:"Set your defaults — adjust anytime in Settings."})]}),e.jsxs("div",{className:"ob3-grid",children:[e.jsxs("div",{className:"ob3-section",children:[e.jsx("h3",{className:"ob3-section-title",children:"Export Resolution"}),e.jsx("div",{className:"ob3-res-stack",role:"radiogroup","aria-label":"Default export resolution",children:f.map(o=>{const a=x===o.id;return e.jsxs("div",{className:`ob3-res-card ${a?"selected":""}`,role:"radio","aria-checked":a,tabIndex:0,onClick:()=>{l(o.id),t(s.onboardingContinue,{step:"3",action:"set_resolution",resolution:o.id})},onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),l(o.id))},children:[e.jsxs("div",{className:"ob3-res-left",children:[e.jsx("span",{className:"ob3-res-value",children:o.label}),e.jsx("span",{className:"ob3-res-desc",children:o.desc})]}),e.jsx("div",{className:"ob3-radio",children:e.jsx("div",{className:"ob3-radio-dot"})})]},o.id)})})]}),e.jsxs("div",{className:"ob3-section",children:[e.jsx("h3",{className:"ob3-section-title",children:"Notifications"}),e.jsx("div",{className:"ob3-toggles",children:h.map(o=>e.jsxs("div",{className:"ob3-toggle-row",children:[e.jsxs("div",{className:"ob3-toggle-info",children:[e.jsx("div",{className:"ob3-toggle-label",children:o.label}),e.jsx("div",{className:"ob3-toggle-desc",children:o.desc})]}),e.jsx("button",{type:"button",role:"switch","aria-checked":c[o.key],"aria-label":o.label,className:`ob3-switch ${c[o.key]?"on":""}`,onClick:()=>m(o.key),children:e.jsx("div",{className:"ob3-switch-knob"})})]},o.key))})]})]}),e.jsx("div",{className:"ob3-autosave",children:e.jsxs("div",{className:"ob3-autosave-card",children:[e.jsxs("div",{className:"ob3-autosave-left",children:[e.jsx("div",{className:"ob3-autosave-icon",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"22px",color:"var(--cc-accent)"},children:"cloud_sync"})}),e.jsxs("div",{className:"ob3-toggle-info",children:[e.jsx("div",{className:"ob3-toggle-label",children:"Auto-save to cloud"}),e.jsx("div",{className:"ob3-toggle-desc",children:"Back up your work automatically as you edit"})]})]}),e.jsx("button",{type:"button",role:"switch","aria-checked":i,"aria-label":"Auto-save projects",className:`ob3-switch ${i?"on":""}`,onClick:()=>{g(!i),t(s.onboardingContinue,{step:"3",action:"toggle_autosave",enabled:!i})},children:e.jsx("div",{className:"ob3-switch-knob"})})]})}),e.jsxs("div",{className:"ob3-actions",children:[e.jsxs("button",{className:"ob3-btn-launch",onClick:()=>{t(s.onboardingComplete,{step:"3"}),d?.()},children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"20px",color:"#0a0a0a",fontVariationSettings:"'FILL' 1"},children:"rocket_launch"}),"Launch ClipCut"]}),e.jsx("a",{href:"#",className:"ob3-btn-ghost",onClick:o=>{o.preventDefault(),t(s.onboardingSkip,{step:"3"}),b?.()},children:"Skip for now"})]})]})}),e.jsx(u,{height:"4px"})]})};export{N as default};
