import{r as t,j as e}from"./-P2Ya96f.js";import{t as r,b as n}from"./BwzjLjtb.js";import{f as d}from"./Et-wlZO3.js";import{B as v}from"./BijniYBr.js";import"./DZxFKcQQ.js";const y=`
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

  .ob1-root {
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

  /* Film grain overlay */
  .ob1-root::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  /* Ambient glow */
  .ob1-root::after {
    content: '';
    position: fixed;
    top: -25%;
    right: -15%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.04) 0%, transparent 65%);
    z-index: 0;
    pointer-events: none;
  }

  /* —— Header —— */
  .ob1-header {
    width: 100%;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--cc-border);
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: ob1FadeDown 0.6s ease forwards;
  }

  .ob1-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ob1-logo-mark {
    position: relative;
  }

  .ob1-logo-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: linear-gradient(135deg, var(--cc-accent), #5a8cbf);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ob1-logo-badge {
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

  .ob1-logo-name {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.3px;
  }

  /* Progress dots */
  .ob1-progress {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .ob1-dots {
    display: flex;
    gap: 8px;
  }

  .ob1-dot {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    background: var(--cc-border);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .ob1-dot.active {
    background: var(--cc-accent);
    box-shadow: 0 0 12px rgba(117,170,219,0.35);
  }

  .ob1-dot.active::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    animation: ob1Shimmer 2.5s ease-in-out infinite;
  }

  .ob1-dot.done {
    background: var(--cc-accent);
    opacity: 0.45;
  }

  .ob1-step-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--cc-text-muted);
    letter-spacing: 0.3px;
  }

  /* —— Main —— */
  .ob1-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    position: relative;
    z-index: 1;
    overflow-y: auto;
  }

  .ob1-container {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Heading */
  .ob1-heading {
    text-align: center;
    margin-bottom: 40px;
    opacity: 0;
    animation: ob1FadeUp 0.7s ease 0.1s forwards;
  }

  .ob1-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--cc-accent);
    margin-bottom: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .ob1-eyebrow::before,
  .ob1-eyebrow::after {
    content: '';
    width: 18px;
    height: 1px;
    background: var(--cc-accent);
    opacity: 0.35;
  }

  .ob1-title {
    font-size: 34px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }

  .ob1-subtitle {
    font-size: 15px;
    color: var(--cc-text-secondary);
    line-height: 1.5;
  }

  /* Avatar */
  .ob1-avatar-section {
    margin-bottom: 32px;
    opacity: 0;
    animation: ob1FadeUp 0.7s ease 0.25s forwards;
  }

  .ob1-avatar-btn {
    width: 116px;
    height: 116px;
    border-radius: 50%;
    border: 2px dashed rgba(117,170,219,0.35);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(117,170,219,0.04);
    outline: none;
  }

  .ob1-avatar-btn:hover {
    border-color: var(--cc-accent);
    box-shadow: 0 0 28px rgba(117,170,219,0.1);
  }

  .ob1-avatar-btn:focus-visible {
    outline: 2px solid var(--cc-accent);
    outline-offset: 3px;
  }

  .ob1-avatar-btn.has-image {
    border-style: solid;
    border-color: rgba(117,170,219,0.4);
  }

  .ob1-avatar-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .ob1-avatar-placeholder .material-symbols-outlined {
    font-size: 30px;
    color: var(--cc-accent);
    opacity: 0.7;
  }

  .ob1-avatar-placeholder-text {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(117,170,219,0.5);
  }

  .ob1-avatar-edit {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--cc-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.35);
    transition: transform 0.2s ease;
  }

  .ob1-avatar-btn:hover .ob1-avatar-edit {
    transform: scale(1.1);
  }

  /* Form */
  .ob1-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 22px;
    opacity: 0;
    animation: ob1FadeUp 0.7s ease 0.4s forwards;
  }

  .ob1-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .ob1-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(117,170,219,0.7);
  }

  .ob1-input {
    width: 100%;
    background: rgba(117,170,219,0.04);
    border: 1px solid rgba(117,170,219,0.15);
    border-radius: var(--cc-radius-sm);
    padding: 14px 16px;
    color: var(--cc-text);
    font-size: 14px;
    font-family: var(--cc-font);
    outline: none;
    transition: all 0.25s ease;
  }

  .ob1-input::placeholder {
    color: var(--cc-text-dim);
  }

  .ob1-input:focus {
    border-color: var(--cc-border-focus);
    box-shadow: 0 0 0 3px var(--cc-accent-glow);
  }

  .ob1-textarea {
    resize: none;
    min-height: 84px;
    line-height: 1.5;
  }

  .ob1-char-count {
    font-size: 11px;
    color: var(--cc-text-dim);
    text-align: right;
    margin-top: -3px;
  }

  /* Actions */
  .ob1-actions {
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    opacity: 0;
    animation: ob1FadeUp 0.7s ease 0.55s forwards;
  }

  .ob1-btn-primary {
    width: 100%;
    padding: 16px;
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
    box-shadow: 0 4px 12px rgba(117,170,219,0.15);
  }

  .ob1-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .ob1-btn-primary:hover {
    background: var(--cc-accent-hover);
    box-shadow: 0 6px 24px rgba(117,170,219,0.25);
    transform: translateY(-1px);
  }

  .ob1-btn-primary:hover::before {
    transform: translateX(100%);
  }

  .ob1-btn-primary:active {
    transform: translateY(0);
  }

  .ob1-btn-skip {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--cc-font);
    font-size: 14px;
    font-weight: 500;
    color: rgba(117,170,219,0.55);
    padding: 8px 16px;
    transition: color 0.2s ease;
  }

  .ob1-btn-skip:hover {
    color: var(--cc-accent);
  }

  .ob1-btn-skip-all {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--cc-font);
    font-size: 13px;
    font-weight: 400;
    color: var(--cc-text-dim);
    padding: 4px 8px;
    transition: color 0.2s ease;
  }

  .ob1-btn-skip-all:hover {
    color: var(--cc-text-muted);
  }

  /* —— Animations —— */
  @keyframes ob1FadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ob1FadeDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ob1Shimmer {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(100%); }
  }

  /* —— Responsive —— */
  @media (max-width: 640px) {
    .ob1-header { padding: 16px 20px; }
    .ob1-main { padding: 28px 20px; }
    .ob1-title { font-size: 28px; }
    .ob1-avatar-btn { width: 100px; height: 100px; }
    .ob1-step-label { display: none; }
  }
`,S=({onContinue:b,onSkip:p,onSkipAll:x})=>{const[m,g]=t.useState(""),[c,f]=t.useState(""),[o,h]=t.useState(null),i=t.useRef(null);t.useEffect(()=>{r(n.onboardingStart)},[]);const u=a=>{const l=a.target.files[0];if(l){const s=new FileReader;s.onloadend=()=>h(s.result),s.readAsDataURL(l)}};return e.jsxs("div",{className:"ob1-root",children:[e.jsx("style",{children:y}),e.jsxs("header",{className:"ob1-header",children:[e.jsxs("div",{className:"ob1-brand",children:[e.jsxs("div",{className:"ob1-logo-mark",children:[e.jsx("div",{className:"ob1-logo-icon",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",color:"white",fontVariationSettings:"'FILL' 1"},children:"movie"})}),e.jsx("span",{className:"ob1-logo-badge material-symbols-outlined",children:"content_cut"})]}),e.jsx("span",{className:"ob1-logo-name",children:"ClipCut"})]}),e.jsxs("div",{className:"ob1-progress",children:[e.jsxs("div",{className:"ob1-dots",children:[e.jsx("div",{className:"ob1-dot active"}),e.jsx("div",{className:"ob1-dot"}),e.jsx("div",{className:"ob1-dot"})]}),e.jsx("span",{className:"ob1-step-label",children:"Step 1 of 3"})]})]}),e.jsx("main",{className:"ob1-main",children:e.jsxs("div",{className:"ob1-container",children:[e.jsxs("div",{className:"ob1-heading",children:[e.jsx("div",{className:"ob1-eyebrow",children:"Your Profile"}),e.jsx("h1",{className:"ob1-title",children:"Who's behind the cut?"}),e.jsx("p",{className:"ob1-subtitle",children:"Set up your creator identity — change it anytime in Settings."})]}),e.jsxs("div",{className:"ob1-avatar-section",children:[e.jsxs("div",{className:`ob1-avatar-btn ${o?"has-image":""}`,role:"button",tabIndex:0,"aria-label":"Upload profile photo",onClick:()=>i.current?.click(),onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),i.current?.click())},style:o?{backgroundImage:`url(${o})`}:{},children:[!o&&e.jsxs("div",{className:"ob1-avatar-placeholder",children:[e.jsx("span",{className:"material-symbols-outlined",children:"add_a_photo"}),e.jsx("span",{className:"ob1-avatar-placeholder-text",children:"Upload"})]}),e.jsx("div",{className:"ob1-avatar-edit",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"14px",color:"#0a0a0a"},children:"edit"})})]}),e.jsx("input",{ref:i,type:"file",accept:"image/*",style:{display:"none"},onChange:u})]}),e.jsxs("form",{className:"ob1-form",onSubmit:a=>a.preventDefault(),children:[e.jsxs("div",{className:"ob1-field",children:[e.jsx("label",{htmlFor:"ob1-name",className:"ob1-label",children:"Display Name"}),e.jsx("input",{id:"ob1-name",className:"ob1-input",type:"text",placeholder:"What should we call you?",value:m,onChange:a=>g(d(a.target.value,{maxLength:100})),autoComplete:"name"})]}),e.jsxs("div",{className:"ob1-field",children:[e.jsx("label",{htmlFor:"ob1-bio",className:"ob1-label",children:"Bio"}),e.jsx("textarea",{id:"ob1-bio",className:"ob1-input ob1-textarea",placeholder:"Tell us about your editing style...",value:c,onChange:a=>f(d(a.target.value,{maxLength:500,allowNewlines:!0})),rows:3}),e.jsxs("div",{className:"ob1-char-count",children:[c.length,"/500"]})]}),e.jsxs("div",{className:"ob1-actions",children:[e.jsx("button",{type:"submit",className:"ob1-btn-primary",onClick:()=>{r(n.onboardingContinue,{step:"1"}),b?.()},children:"Continue"}),e.jsx("button",{type:"button",className:"ob1-btn-skip",onClick:()=>{r(n.onboardingSkip,{step:"1"}),p?.()},children:"Skip this step"}),e.jsx("button",{type:"button",className:"ob1-btn-skip-all",onClick:()=>{r(n.onboardingSkip,{step:"1",action:"skip_all"}),x?.()},children:"Skip onboarding entirely"})]})]})]})}),e.jsx(v,{})]})};export{S as default};
