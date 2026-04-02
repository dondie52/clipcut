import{u as Y,r,j as e}from"./-P2Ya96f.js";import{s as $,r as G}from"./BRgNa3L0.js";import{v as H,a as K}from"./DuArS60f.js";import{c as A}from"./B9CjrYEi.js";import{M as S,t as d,a as z,b as g,g as X,i as Q,c as E}from"./CvFNCHZB.js";import{B as J}from"./BijniYBr.js";import"./DZxFKcQQ.js";const h=A(5,6e4),w=A(3,6e4),Z=`
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
    --cc-error: #ef4444;
    --cc-error-soft: rgba(239,68,68,0.08);
    --cc-success: #22c55e;
    --cc-success-soft: rgba(34,197,94,0.08);
    --cc-font: 'Spline Sans', sans-serif;
    --cc-radius: 12px;
    --cc-radius-sm: 8px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    width: 100vw; height: 100vh; background: var(--cc-bg);
    display: flex; font-family: var(--cc-font); color: var(--cc-text);
    overflow: hidden; position: relative;
  }

  .lg-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  /* ——— LEFT: HERO ——— */
  .lg-hero {
    flex: 1; position: relative; display: flex; flex-direction: column;
    justify-content: flex-end; padding: 56px; overflow: hidden; z-index: 1;
  }

  .lg-hero-bg { position: absolute; inset: 0; z-index: 0; }

  .lg-hero-bg-img {
    position: absolute; inset: 0; background-size: cover;
    background-position: center; transition: opacity 1.5s ease-in-out;
  }

  .lg-hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background:
      linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.85) 100%),
      linear-gradient(135deg, rgba(117,170,219,0.05) 0%, transparent 50%);
  }

  /* Film strip edge */
  .lg-strip {
    position: absolute; right: 0; top: 0; bottom: 0; width: 36px; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: rgba(10,10,10,0.45); border-left: 1px solid rgba(117,170,219,0.06);
  }

  .lg-strip-perf {
    width: 14px; height: 9px; border-radius: 2px;
    background: rgba(117,170,219,0.05); border: 1px solid rgba(117,170,219,0.08);
    margin: 7px 0;
  }

  .lg-hero-content {
    position: relative; z-index: 3; max-width: 460px;
    opacity: 0; animation: lgFadeUp 0.8s ease 0.2s forwards;
  }

  .lg-hero-brand {
    display: flex; align-items: center; gap: 12px; margin-bottom: 36px;
  }

  .lg-logo-mark {
    width: 44px; height: 44px; border-radius: 11px;
    background: linear-gradient(135deg, var(--cc-accent), #5a8cbf);
    display: flex; align-items: center; justify-content: center;
    position: relative; box-shadow: 0 4px 16px rgba(117,170,219,0.2);
  }

  .lg-logo-badge {
    position: absolute; bottom: -3px; right: -3px;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--cc-bg); border: 2px solid var(--cc-accent);
    display: flex; align-items: center; justify-content: center;
  }

  .lg-logo-name { font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }

  .lg-headline {
    font-size: 44px; font-weight: 800; line-height: 1.08;
    letter-spacing: -1.5px; margin-bottom: 20px;
  }

  .lg-headline em {
    font-style: normal; color: var(--cc-accent); position: relative;
  }

  .lg-headline em::after {
    content: ''; position: absolute; bottom: 2px; left: 0; right: 0;
    height: 3px; background: var(--cc-accent); opacity: 0.3; border-radius: 2px;
  }

  .lg-hero-desc {
    font-size: 16px; color: var(--cc-text-secondary); line-height: 1.6; max-width: 380px;
  }

  /* ——— RIGHT: FORM ——— */
  .lg-form-panel {
    width: 460px; min-width: 460px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; padding: 40px 44px;
    position: relative; z-index: 2; border-left: 1px solid var(--cc-border);
    background: rgba(10,10,10,0.95);
  }

  .lg-form-glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.03) 0%, transparent 65%);
    pointer-events: none;
  }

  .lg-form-wrap {
    width: 100%; max-width: 370px; position: relative; z-index: 1;
    opacity: 0; animation: lgFadeUp 0.7s ease 0.35s forwards;
  }

  .lg-form-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 6px; }
  .lg-form-sub { font-size: 14px; color: var(--cc-text-secondary); margin-bottom: 30px; }

  /* Alerts */
  .lg-alert {
    padding: 12px 16px; border-radius: var(--cc-radius-sm); font-size: 13px;
    margin-bottom: 20px; display: flex; align-items: center; gap: 10px; line-height: 1.5;
  }
  .lg-alert--error { background: var(--cc-error-soft); border: 1px solid rgba(239,68,68,0.15); color: var(--cc-error); }
  .lg-alert--success { background: var(--cc-success-soft); border: 1px solid rgba(34,197,94,0.15); color: var(--cc-success); }

  /* Form */
  .lg-form { display: flex; flex-direction: column; gap: 20px; }

  .lg-field { display: flex; flex-direction: column; gap: 7px; }
  .lg-label { font-size: 13px; font-weight: 600; color: var(--cc-text-secondary); }

  .lg-input-wrap { position: relative; }

  .lg-input {
    width: 100%; background: rgba(15,20,30,0.8); border: 1px solid rgba(117,170,219,0.12);
    border-radius: var(--cc-radius-sm); padding: 14px 16px; color: var(--cc-text);
    font-size: 14px; font-family: var(--cc-font); outline: none; transition: all 0.25s ease;
  }
  .lg-input::placeholder { color: var(--cc-text-dim); }
  .lg-input:focus { border-color: var(--cc-border-focus); box-shadow: 0 0 0 3px var(--cc-accent-glow); }
  .lg-input--error { border-color: rgba(239,68,68,0.4) !important; }
  .lg-input--has-toggle { padding-right: 48px; }
  .lg-input:disabled { opacity: 0.5; }

  .lg-field-error { font-size: 12px; color: var(--cc-error); }

  .lg-eye-btn {
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
    background: none; border: none; cursor: pointer; color: var(--cc-text-dim);
    border-radius: 6px; transition: color 0.2s ease;
  }
  .lg-eye-btn:hover { color: var(--cc-accent); }

  .lg-forgot-row { display: flex; justify-content: flex-end; margin-top: -2px; }

  .lg-forgot-btn {
    background: none; border: none; cursor: pointer; font-family: var(--cc-font);
    font-size: 12px; font-weight: 500; color: var(--cc-accent); padding: 2px 0;
    transition: opacity 0.2s ease; opacity: 0.8;
  }
  .lg-forgot-btn:hover { opacity: 1; }
  .lg-forgot-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .lg-submit {
    width: 100%; padding: 15px; border: none; border-radius: var(--cc-radius-sm);
    font-family: var(--cc-font); font-size: 16px; font-weight: 700; cursor: pointer;
    transition: all 0.25s ease; position: relative; overflow: hidden;
    background: var(--cc-accent); color: var(--cc-bg); margin-top: 4px;
  }
  .lg-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%); transition: transform 0.5s ease;
  }
  .lg-submit:hover:not(:disabled) { background: var(--cc-accent-hover); box-shadow: 0 6px 24px rgba(117,170,219,0.2); transform: translateY(-1px); }
  .lg-submit:hover:not(:disabled)::before { transform: translateX(100%); }
  .lg-submit:active:not(:disabled) { transform: translateY(0); }
  .lg-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .lg-spinner {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid rgba(10,10,10,0.2); border-top-color: #0a0a0a;
    border-radius: 50%; animation: lgSpin 0.6s linear infinite;
    margin-right: 8px; vertical-align: middle;
  }

  .lg-signup-row {
    text-align: center; margin-top: 26px; font-size: 14px; color: var(--cc-text-secondary);
  }

  .lg-signup-link {
    color: var(--cc-accent); font-weight: 700; text-decoration: none; margin-left: 6px;
    transition: opacity 0.2s ease;
  }
  .lg-signup-link:hover { opacity: 0.8; }

  /* ——— MOBILE ——— */
  .lg-mobile-brand {
    display: none; align-items: center; gap: 10px; margin-bottom: 28px;
    width: 100%; max-width: 370px;
  }

  .lg-mobile-logo {
    width: 36px; height: 36px; border-radius: 9px;
    background: linear-gradient(135deg, var(--cc-accent), #5a8cbf);
    display: flex; align-items: center; justify-content: center;
  }

  .lg-mobile-name { font-size: 18px; font-weight: 700; }

  /* Animations */
  @keyframes lgFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes lgSpin { to { transform: rotate(360deg); } }

  /* Responsive */
  @media (max-width: 1024px) {
    .lg-form-panel { width: 420px; min-width: 420px; padding: 40px 32px; }
    .lg-hero { padding: 44px; }
    .lg-headline { font-size: 38px; }
  }

  @media (max-width: 768px) {
    .lg-root { flex-direction: column; overflow-y: auto; }
    .lg-hero { display: none; }
    .lg-form-panel { width: 100%; min-width: unset; border-left: none; padding: 32px 24px; flex: 1; justify-content: flex-start; padding-top: 44px; }
    .lg-mobile-brand { display: flex; }
  }
`,ne=({onNavigateToRegister:C})=>{const I=Y(),[p,L]=r.useState(!1),[m,R]=r.useState(""),[x,F]=r.useState(""),[B,P]=r.useState(0),[v,l]=r.useState(""),[o,s]=r.useState({}),[i,y]=r.useState(!1),[j,N]=r.useState(!1),[T,b]=r.useState(!1),f=r.useRef(null),_=r.useRef(null),[M,O]=r.useState(window.innerWidth<=S);r.useEffect(()=>{const a=()=>O(window.innerWidth<=S);return window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]);const u=[{webp:"/images/download.webp",fallback:"/images/download.jpeg"},{webp:"/images/download (1).webp",fallback:"/images/download (1).jpeg"},{webp:"/images/download (2).webp",fallback:"/images/download (2).jpeg"},{webp:"/images/download (3).webp",fallback:"/images/download (3).jpeg"}],[U,k]=r.useState(!0);r.useEffect(()=>{const a=new Image;a.onload=()=>k(!0),a.onerror=()=>k(!1),a.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="},[]);const D=a=>U?a.webp:a.fallback;r.useEffect(()=>{const a=setInterval(()=>P(t=>(t+1)%u.length),5e3);return()=>clearInterval(a)},[u.length]);const q=async a=>{if(a.preventDefault(),l(""),s({}),b(!1),d(g.loginAttempt,{method:"email"}),z({category:"auth",message:"Login attempt started",level:"info"}),!h.canAttempt()){const c=Math.ceil(h.getTimeUntilReset()/1e3);l(`Too many login attempts. Please wait ${c} seconds.`),d(g.loginFailure,{reason:"rate_limit"});return}const t=m.trim().toLowerCase(),n=H({email:t,password:x});if(!n.valid){s(n.errors),d(g.loginFailure,{reason:"validation_error"});return}y(!0),h.recordAttempt();try{await $({email:t,password:x}),d(g.loginSuccess,{method:"email"}),z({category:"auth",message:"Login successful",level:"info"}),I("/dashboard")}catch(c){l(X(c,"auth")),d(g.loginFailure,{reason:Q(c)?"network_error":"auth_error"}),E(c,{})}finally{y(!1)}},V=async()=>{l(""),s({}),b(!1);const a=m.trim().toLowerCase(),t=K(a);if(!t.valid){s({email:t.error});return}if(!w.canAttempt()){const n=Math.ceil(w.getTimeUntilReset()/1e3);l(`Too many reset attempts. Please wait ${n} seconds.`);return}w.recordAttempt(),N(!0);try{await G(a)}catch(n){E(n,{})}finally{N(!1),b(!0)}},W=Array.from({length:25},(a,t)=>t);return e.jsxs("main",{className:"lg-root",children:[e.jsx("style",{children:Z}),!M&&e.jsxs("div",{className:"lg-hero",children:[e.jsxs("div",{className:"lg-hero-bg",children:[u.map((a,t)=>e.jsx("div",{className:"lg-hero-bg-img",style:{backgroundImage:`url('${D(a)}')`,opacity:B===t?.6:0}},t)),e.jsx("div",{className:"lg-hero-overlay"})]}),e.jsx("div",{className:"lg-strip",children:W.map(a=>e.jsx("div",{className:"lg-strip-perf"},a))}),e.jsxs("div",{className:"lg-hero-content",children:[e.jsxs("div",{className:"lg-hero-brand",children:[e.jsxs("div",{className:"lg-logo-mark",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"22px",color:"white",fontVariationSettings:"'FILL' 1"},children:"movie"}),e.jsx("div",{className:"lg-logo-badge",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"9px",color:"var(--cc-accent)"},children:"content_cut"})})]}),e.jsx("span",{className:"lg-logo-name",children:"ClipCut"})]}),e.jsxs("h1",{className:"lg-headline",children:["Tools for the Next Generation of ",e.jsx("em",{children:"Botswana Creators"})]}),e.jsx("p",{className:"lg-hero-desc",children:"Professional video editing with cloud collaboration, available across web, desktop, and mobile."})]})]}),e.jsxs("div",{className:"lg-form-panel",children:[e.jsx("div",{className:"lg-form-glow"}),e.jsxs("div",{className:"lg-mobile-brand",children:[e.jsx("div",{className:"lg-mobile-logo",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",color:"white",fontVariationSettings:"'FILL' 1"},children:"content_cut"})}),e.jsx("span",{className:"lg-mobile-name",children:"ClipCut"})]}),e.jsxs("div",{className:"lg-form-wrap",children:[e.jsx("h2",{className:"lg-form-title",children:"Welcome back"}),e.jsx("p",{className:"lg-form-sub",children:"Sign in to continue editing"}),T&&e.jsxs("div",{className:"lg-alert lg-alert--success",role:"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"check_circle"}),"If an account exists with this email, you'll receive a password reset link."]}),v&&e.jsxs("div",{className:"lg-alert lg-alert--error",role:"alert","aria-live":"polite",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"error"}),v]}),e.jsxs("form",{ref:f,className:"lg-form",onSubmit:q,noValidate:!0,children:[e.jsxs("div",{className:"lg-field",children:[e.jsx("label",{htmlFor:"login-email",className:"lg-label",children:"Email"}),e.jsx("div",{className:"lg-input-wrap",children:e.jsx("input",{ref:_,id:"login-email",className:`lg-input ${o.email?"lg-input--error":""}`,type:"email",placeholder:"you@example.com",value:m,onChange:a=>{R(a.target.value),s(t=>({...t,email:void 0}))},autoComplete:"email",required:!0,disabled:i,"aria-invalid":!!o.email,"aria-describedby":o.email?"email-error":void 0,onKeyDown:a=>{a.key==="Enter"&&!i&&f.current?.requestSubmit()}})}),o.email&&e.jsx("span",{id:"email-error",className:"lg-field-error",role:"alert",children:o.email})]}),e.jsxs("div",{className:"lg-field",children:[e.jsx("label",{htmlFor:"login-password",className:"lg-label",children:"Password"}),e.jsxs("div",{className:"lg-input-wrap",children:[e.jsx("input",{id:"login-password",className:`lg-input lg-input--has-toggle ${o.password?"lg-input--error":""}`,type:p?"text":"password",placeholder:"Enter your password",value:x,onChange:a=>{F(a.target.value),s(t=>({...t,password:void 0}))},autoComplete:"current-password",required:!0,disabled:i,"aria-invalid":!!o.password,"aria-describedby":o.password?"password-error":void 0,onKeyDown:a=>{a.key==="Enter"&&!i&&f.current?.requestSubmit()}}),e.jsx("button",{type:"button",className:"lg-eye-btn",onClick:()=>L(!p),"aria-label":p?"Hide password":"Show password",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"20px"},children:p?"visibility_off":"visibility"})})]}),o.password&&e.jsx("span",{id:"password-error",className:"lg-field-error",role:"alert",children:o.password}),e.jsx("div",{className:"lg-forgot-row",children:e.jsx("button",{type:"button",className:"lg-forgot-btn",onClick:V,disabled:j||i,children:j?"Sending...":"Forgot password?"})})]}),e.jsxs("button",{type:"submit",className:"lg-submit",disabled:i,children:[i&&e.jsx("span",{className:"lg-spinner"}),i?"Signing in...":"Sign In"]})]}),e.jsxs("p",{className:"lg-signup-row",children:["Don't have an account?",e.jsx("a",{href:"#",className:"lg-signup-link",onClick:a=>{a.preventDefault(),C?.()},children:"Sign up"})]})]})]}),e.jsx(J,{})]})};export{ne as default};
