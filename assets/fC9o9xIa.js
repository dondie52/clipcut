import{r as t,j as e}from"./DwQPoapS.js";import{t as r,b as n}from"./C3Bsv9n5.js";import{f as p}from"./Et-wlZO3.js";import{B as v}from"./D8AsaMNA.js";import"./DZxFKcQQ.js";const y=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --cc-bg: #0c1220;
    --cc-bg-alt: #0e1624;
    --cc-card: #121a2a;
    --cc-card-raised: #18212f;
    --cc-border: rgba(255,255,255,0.07);
    --cc-border-hover: rgba(255,255,255,0.14);
    --cc-border-focus: rgba(117,170,219,0.55);
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

  .ob1-root {
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

  /* Film grain */
  .ob1-root::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Warm ambient glow — softer than previous version */
  .ob1-root::after {
    content: ''; position: fixed; z-index: 0; pointer-events: none;
    top: -20%; left: -10%; width: 720px; height: 720px; border-radius: 50%;
    background: radial-gradient(circle,
      rgba(117,170,219,0.09) 0%,
      rgba(117,170,219,0.02) 40%,
      transparent 70%);
    filter: blur(24px);
  }

  /* Huge background numeral — serif italic, very low opacity */
  .ob1-bg-num {
    position: absolute; z-index: 0; pointer-events: none; user-select: none;
    top: 50%; right: -6%; transform: translateY(-50%);
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-size: clamp(240px, 36vw, 520px);
    line-height: 0.9;
    color: var(--cc-accent);
    opacity: 0.05;
    letter-spacing: -0.04em;
  }

  /* —— Header —— */
  .ob1-header {
    width: 100%;
    padding: 22px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--cc-border);
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: ob1-fade-down 0.6s ease forwards;
  }

  .ob1-brand {
    display: flex; align-items: baseline; gap: 10px;
    font-family: var(--cc-font-display);
  }
  .ob1-brand-mono {
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-size: 26px;
    color: var(--cc-accent);
    line-height: 1;
  }
  .ob1-brand-name {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--cc-text);
  }

  /* Paint-stroke progress — three pills filling with a soft brush gradient */
  .ob1-progress {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .ob1-progress-strokes {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ob1-stroke {
    width: 40px;
    height: 5px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
  }
  .ob1-stroke.is-filled {
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 50%, #8bbae3 100%);
    box-shadow: 0 0 12px rgba(117,170,219,0.35);
  }
  .ob1-stroke.is-active {
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 100%);
    box-shadow: 0 0 14px rgba(117,170,219,0.45);
  }
  .ob1-stroke.is-active::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: ob1-shimmer 2.6s ease-in-out infinite;
  }
  .ob1-step-label {
    font-family: var(--cc-font-mono);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.14em;
    color: var(--cc-text-muted);
    text-transform: uppercase;
  }

  /* —— Main —— */
  .ob1-main {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 64px 32px 80px;
    position: relative;
    z-index: 1;
  }

  .ob1-container {
    width: 100%;
    max-width: 560px;
    position: relative;
    z-index: 1;
  }

  .ob1-heading {
    text-align: center;
    margin-bottom: 44px;
    opacity: 0;
    animation: ob1-fade-up 0.7s ease 0.12s forwards;
  }

  .ob1-eyebrow {
    font-family: var(--cc-font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cc-accent);
    margin-bottom: 18px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .ob1-eyebrow::before, .ob1-eyebrow::after {
    content: '';
    width: 22px;
    height: 1px;
    background: var(--cc-accent);
    opacity: 0.5;
  }

  .ob1-title {
    font-family: var(--cc-font-display);
    font-size: clamp(32px, 4.6vw, 44px);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.035em;
    margin-bottom: 14px;
    color: var(--cc-text);
  }
  .ob1-title-em {
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-weight: 400;
    color: var(--cc-accent);
  }
  .ob1-subtitle {
    font-size: 15px;
    color: var(--cc-text-secondary);
    line-height: 1.55;
    max-width: 42ch;
    margin: 0 auto;
  }

  /* Avatar card — tactile circular button */
  .ob1-avatar-section {
    display: flex;
    justify-content: center;
    margin-bottom: 36px;
    opacity: 0;
    animation: ob1-fade-up 0.7s ease 0.22s forwards;
  }

  .ob1-avatar-btn {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    background: var(--cc-card);
    border: 1.5px dashed rgba(117,170,219,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1), border-color 220ms ease, box-shadow 260ms ease;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }
  .ob1-avatar-btn:hover {
    transform: translateY(-2px);
    border-color: var(--cc-accent);
    box-shadow: 0 12px 36px rgba(117,170,219,0.18);
  }
  .ob1-avatar-btn:focus-visible {
    outline: 2px solid var(--cc-accent);
    outline-offset: 4px;
  }
  .ob1-avatar-btn.has-image {
    border-style: solid;
    border-color: var(--cc-accent);
  }

  .ob1-avatar-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: var(--cc-text-muted);
  }
  .ob1-avatar-placeholder .material-symbols-outlined {
    font-size: 32px;
    color: var(--cc-accent);
  }
  .ob1-avatar-placeholder-text {
    font-family: var(--cc-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .ob1-avatar-edit {
    position: absolute;
    right: 4px;
    bottom: 4px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--cc-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  /* Form card */
  .ob1-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    opacity: 0;
    animation: ob1-fade-up 0.7s ease 0.32s forwards;
  }

  .ob1-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  .ob1-label {
    font-family: var(--cc-font-mono);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cc-text-muted);
  }

  .ob1-input {
    width: 100%;
    padding: 14px 18px;
    background: var(--cc-card);
    border: 1px solid var(--cc-border);
    border-radius: 10px;
    color: var(--cc-text);
    font-family: var(--cc-font-sans);
    font-size: 15px;
    outline: none;
    transition: border-color 200ms ease, background 200ms ease, box-shadow 220ms ease;
  }
  .ob1-input::placeholder { color: var(--cc-text-whisper); }
  .ob1-input:hover { border-color: var(--cc-border-hover); }
  .ob1-input:focus {
    border-color: var(--cc-accent);
    background: var(--cc-card-raised);
    box-shadow: 0 0 0 3px rgba(117,170,219,0.1);
  }

  .ob1-textarea {
    resize: vertical;
    min-height: 92px;
    font-family: var(--cc-font-sans);
    line-height: 1.5;
  }

  .ob1-char-count {
    position: absolute;
    right: 4px;
    bottom: -22px;
    font-family: var(--cc-font-mono);
    font-size: 10px;
    letter-spacing: 0.06em;
    color: var(--cc-text-whisper);
  }

  /* Actions */
  .ob1-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-top: 24px;
    opacity: 0;
    animation: ob1-fade-up 0.7s ease 0.46s forwards;
  }

  .ob1-btn-primary {
    width: 100%;
    padding: 16px 28px;
    border: none;
    border-radius: 10px;
    font-family: var(--cc-font-display);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: background 200ms ease, box-shadow 260ms ease, transform 140ms ease;
    background: var(--cc-accent);
    color: #0a0a0a;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 10px 28px rgba(117,170,219,0.22), inset 0 -2px 0 rgba(0,0,0,0.15);
  }
  .ob1-btn-primary:hover {
    background: var(--cc-accent-hover);
    box-shadow: 0 14px 40px rgba(117,170,219,0.32), inset 0 -2px 0 rgba(0,0,0,0.15);
    transform: translateY(-2px);
  }
  .ob1-btn-primary:active { transform: translateY(0); }
  .ob1-btn-primary .arrow {
    font-family: var(--cc-font-serif);
    font-style: italic;
    font-size: 20px;
    transition: transform 220ms ease;
  }
  .ob1-btn-primary:hover .arrow { transform: translateX(4px); }

  .ob1-btn-skip {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font-sans);
    font-size: 13px;
    font-weight: 500;
    color: var(--cc-text-muted);
    padding: 6px 14px;
    transition: color 160ms ease;
    border-radius: 4px;
  }
  .ob1-btn-skip:hover { color: var(--cc-accent); }

  .ob1-btn-skip-all {
    background: none; border: none; cursor: pointer;
    font-family: var(--cc-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cc-text-whisper);
    padding: 4px 10px;
    transition: color 160ms ease;
  }
  .ob1-btn-skip-all:hover { color: var(--cc-text-muted); }

  /* Animations */
  @keyframes ob1-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ob1-fade-down {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ob1-shimmer {
    0%   { transform: translateX(-100%); }
    60%  { transform: translateX(100%); }
    100% { transform: translateX(100%); }
  }

  @media (max-width: 640px) {
    .ob1-header { padding: 16px 20px; }
    .ob1-main { padding: 40px 20px 64px; }
    .ob1-title { font-size: 28px; }
    .ob1-avatar-btn { width: 108px; height: 108px; }
    .ob1-step-label { display: none; }
    .ob1-bg-num { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ob1-header, .ob1-heading, .ob1-avatar-section, .ob1-form, .ob1-actions {
      opacity: 1 !important;
      animation: none !important;
    }
    .ob1-stroke.is-active::after { animation: none; }
    .ob1-btn-primary:hover { transform: none; }
  }
`,S=({onContinue:d,onSkip:b,onSkipAll:m})=>{const[f,x]=t.useState(""),[c,h]=t.useState(""),[o,g]=t.useState(null),i=t.useRef(null);t.useEffect(()=>{r(n.onboardingStart)},[]);const u=a=>{const l=a.target.files[0];if(l){const s=new FileReader;s.onloadend=()=>g(s.result),s.readAsDataURL(l)}};return e.jsxs("div",{className:"ob1-root",children:[e.jsx("style",{children:y}),e.jsx("span",{className:"ob1-bg-num","aria-hidden":"true",children:"01"}),e.jsxs("header",{className:"ob1-header",children:[e.jsxs("div",{className:"ob1-brand",children:[e.jsx("span",{className:"ob1-brand-mono","aria-hidden":"true",children:"CC"}),e.jsx("span",{className:"ob1-brand-name",children:"ClipCut"})]}),e.jsxs("div",{className:"ob1-progress",children:[e.jsxs("div",{className:"ob1-progress-strokes","aria-hidden":"true",children:[e.jsx("div",{className:"ob1-stroke is-active"}),e.jsx("div",{className:"ob1-stroke"}),e.jsx("div",{className:"ob1-stroke"})]}),e.jsx("span",{className:"ob1-step-label",children:"Step 1 · of 3"})]})]}),e.jsx("main",{className:"ob1-main",children:e.jsxs("div",{className:"ob1-container",children:[e.jsxs("div",{className:"ob1-heading",children:[e.jsx("div",{className:"ob1-eyebrow",children:"Your profile"}),e.jsxs("h1",{className:"ob1-title",children:["Who's behind",e.jsx("br",{}),"the ",e.jsx("span",{className:"ob1-title-em",children:"cut?"})]}),e.jsx("p",{className:"ob1-subtitle",children:"Set up your creator identity. You can change any of this later in Settings."})]}),e.jsxs("div",{className:"ob1-avatar-section",children:[e.jsxs("div",{className:`ob1-avatar-btn ${o?"has-image":""}`,role:"button",tabIndex:0,"aria-label":"Upload profile photo",onClick:()=>i.current?.click(),onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),i.current?.click())},style:o?{backgroundImage:`url(${o})`}:{},children:[!o&&e.jsxs("div",{className:"ob1-avatar-placeholder",children:[e.jsx("span",{className:"material-symbols-outlined",children:"add_a_photo"}),e.jsx("span",{className:"ob1-avatar-placeholder-text",children:"Upload"})]}),e.jsx("div",{className:"ob1-avatar-edit","aria-hidden":"true",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"14px",color:"#0a0a0a"},children:"edit"})})]}),e.jsx("input",{ref:i,type:"file",accept:"image/*",style:{display:"none"},onChange:u})]}),e.jsxs("form",{className:"ob1-form",onSubmit:a=>a.preventDefault(),children:[e.jsxs("div",{className:"ob1-field",children:[e.jsx("label",{htmlFor:"ob1-name",className:"ob1-label",children:"Display Name"}),e.jsx("input",{id:"ob1-name",className:"ob1-input",type:"text",placeholder:"What should we call you?",value:f,onChange:a=>x(p(a.target.value,{maxLength:100})),autoComplete:"name"})]}),e.jsxs("div",{className:"ob1-field",children:[e.jsx("label",{htmlFor:"ob1-bio",className:"ob1-label",children:"Bio"}),e.jsx("textarea",{id:"ob1-bio",className:"ob1-input ob1-textarea",placeholder:"Tell us about your editing style…",value:c,onChange:a=>h(p(a.target.value,{maxLength:500,allowNewlines:!0})),rows:3}),e.jsxs("div",{className:"ob1-char-count",children:[c.length,"/500"]})]}),e.jsxs("div",{className:"ob1-actions",children:[e.jsxs("button",{type:"submit",className:"ob1-btn-primary",onClick:()=>{r(n.onboardingContinue,{step:"1"}),d?.()},children:["Continue",e.jsx("span",{className:"arrow","aria-hidden":"true",children:"→"})]}),e.jsx("button",{type:"button",className:"ob1-btn-skip",onClick:()=>{r(n.onboardingSkip,{step:"1"}),b?.()},children:"Skip this step"}),e.jsx("button",{type:"button",className:"ob1-btn-skip-all",onClick:()=>{r(n.onboardingSkip,{step:"1",action:"skip_all"}),m?.()},children:"Skip onboarding entirely"})]})]})]})}),e.jsx(v,{})]})};export{S as default};
