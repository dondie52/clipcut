import{u as E,e as R,r as s,j as e}from"./-P2Ya96f.js";import{u as F}from"./rg7ClRmG.js";import{t as n,a as j,g as L,c as q}from"./D_BVSNiM.js";import{c as k,P as S,d as U,e as V}from"./Et-wlZO3.js";import{c as T}from"./B9CjrYEi.js";import{B as A}from"./BijniYBr.js";import{g as B,P as D}from"./PRDiLaMv.js";import"./DZxFKcQQ.js";const x=T(3,6e5),M=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');
  :root {
    --cc-bg: #0a0a0a;
    --cc-bg-alt: #0d1117;
    --cc-surface: #1a2332;
    --cc-surface-raised: rgba(26,35,50,0.6);
    --cc-border: rgba(255,255,255,0.06);
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
    --cc-radius: 14px;
    --cc-radius-sm: 8px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rp-root {
    width: 100vw; height: 100vh; background: var(--cc-bg);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--cc-font); color: var(--cc-text);
    position: relative; overflow: hidden;
  }

  .rp-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  .rp-glow {
    position: fixed; top: 30%; left: 50%; transform: translate(-50%, -50%);
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.04) 0%, transparent 60%);
    z-index: 0; pointer-events: none;
  }

  .rp-card {
    width: 100%; max-width: 450px; position: relative; z-index: 1; padding: 0 24px;
    opacity: 0; animation: rpFadeUp 0.7s ease 0.1s forwards;
  }

  .rp-card-inner {
    background: var(--cc-surface-raised); border: 1px solid var(--cc-border);
    border-radius: var(--cc-radius); padding: 40px 34px 36px;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }

  /* Header */
  .rp-header {
    display: flex; align-items: center; gap: 14px; margin-bottom: 28px;
    opacity: 0; animation: rpFadeUp 0.6s ease 0.2s forwards;
  }

  .rp-icon-wrap {
    width: 46px; height: 46px; border-radius: 12px;
    background: var(--cc-accent-soft); border: 1px solid rgba(117,170,219,0.12);
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }

  .rp-icon-wrap::before {
    content: ''; position: absolute; inset: -4px; border-radius: 16px;
    border: 1px solid rgba(117,170,219,0.06);
    animation: rpPulse 3s ease-in-out infinite;
  }

  .rp-header-text h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.3px; margin-bottom: 2px; }
  .rp-header-text p { font-size: 13px; color: var(--cc-text-muted); }

  /* Alerts */
  .rp-alert {
    padding: 12px 16px; border-radius: var(--cc-radius-sm); font-size: 13px;
    margin-bottom: 18px; display: flex; align-items: center; gap: 10px; line-height: 1.5;
  }
  .rp-alert--error { background: var(--cc-error-soft); border: 1px solid rgba(239,68,68,0.15); color: var(--cc-error); }
  .rp-alert--success { background: var(--cc-success-soft); border: 1px solid rgba(34,197,94,0.15); color: var(--cc-success); }

  /* Form */
  .rp-form {
    display: flex; flex-direction: column; gap: 20px;
    opacity: 0; animation: rpFadeUp 0.7s ease 0.3s forwards;
  }

  .rp-field { display: flex; flex-direction: column; gap: 7px; }
  .rp-label { font-size: 13px; font-weight: 600; color: var(--cc-text-secondary); }
  .rp-input-wrap { position: relative; }

  .rp-input {
    width: 100%; background: rgba(15,20,30,0.8); border: 1px solid rgba(117,170,219,0.12);
    border-radius: var(--cc-radius-sm); padding: 14px 48px 14px 16px;
    color: var(--cc-text); font-size: 14px; font-family: var(--cc-font);
    outline: none; transition: all 0.25s ease;
  }
  .rp-input::placeholder { color: var(--cc-text-dim); }
  .rp-input:focus { border-color: var(--cc-border-focus); box-shadow: 0 0 0 3px var(--cc-accent-glow); }
  .rp-input--error { border-color: rgba(239,68,68,0.4) !important; }
  .rp-input:disabled { opacity: 0.5; }

  .rp-eye-btn {
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
    background: none; border: none; cursor: pointer; color: var(--cc-text-dim);
    border-radius: 6px; transition: color 0.2s ease;
  }
  .rp-eye-btn:hover { color: var(--cc-accent); }

  .rp-hint { font-size: 11px; color: var(--cc-text-dim); line-height: 1.5; }
  .rp-strength { margin-top: -2px; }

  .rp-submit {
    width: 100%; padding: 15px; border: none; border-radius: var(--cc-radius-sm);
    font-family: var(--cc-font); font-size: 16px; font-weight: 700; cursor: pointer;
    transition: all 0.25s ease; position: relative; overflow: hidden;
    background: var(--cc-accent); color: var(--cc-bg); margin-top: 4px;
  }
  .rp-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%); transition: transform 0.5s ease;
  }
  .rp-submit:hover:not(:disabled) { background: var(--cc-accent-hover); box-shadow: 0 6px 24px rgba(117,170,219,0.2); transform: translateY(-1px); }
  .rp-submit:hover:not(:disabled)::before { transform: translateX(100%); }
  .rp-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .rp-spinner {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid rgba(10,10,10,0.2); border-top-color: #0a0a0a;
    border-radius: 50%; animation: rpSpin 0.6s linear infinite;
    margin-right: 8px; vertical-align: middle;
  }

  .rp-back-row {
    text-align: center; margin-top: 22px; font-size: 14px; color: var(--cc-text-muted);
    opacity: 0; animation: rpFadeUp 0.6s ease 0.45s forwards;
  }
  .rp-back-link { color: var(--cc-accent); font-weight: 700; text-decoration: none; margin-left: 6px; transition: opacity 0.2s ease; }
  .rp-back-link:hover { opacity: 0.8; }

  @keyframes rpFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes rpSpin { to { transform: rotate(360deg); } }
  @keyframes rpPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.06); } }

  @media (max-width: 520px) {
    .rp-card-inner { padding: 32px 22px; }
    .rp-header-text h2 { font-size: 20px; }
  }
`,W=()=>{const b=E(),[m]=R(),[c,N]=s.useState(!1),[l,P]=s.useState(!1),[o,_]=s.useState(""),[g,z]=s.useState(""),[a,i]=s.useState(""),[t,h]=s.useState(!1),[u,w]=s.useState(!1),f=s.useRef(null);s.useEffect(()=>{const r=k(m.get("access_token")||"",{type:"jwt",maxLength:1e3}),p=k(m.get("type")||"",{type:"enum",allowedValues:["recovery"],maxLength:50});(!r.valid||!p.valid)&&i("Invalid or missing reset token. Please request a new password reset link.")},[m]);const v=B(o),C=async r=>{if(r.preventDefault(),i(""),w(!1),n("password_reset_complete_attempt",{}),j({category:"auth",message:"Password reset submission started",level:"info"}),!x.canAttempt()){const d=Math.ceil(x.getTimeUntilReset()/60);i(`Too many attempts. Please wait ${d} minutes.`),n("password_reset_complete_failure",{reason:"rate_limit"});return}const p=U(o);if(!p.valid){i(p.error),n("password_reset_complete_failure",{reason:"validation_error"});return}const y=V(o,g);if(!y.valid){i(y.error),n("password_reset_complete_failure",{reason:"password_mismatch"});return}h(!0),x.recordAttempt();try{await F(o),w(!0),n("password_reset_complete_success",{}),j({category:"auth",message:"Password reset successful",level:"info"}),setTimeout(()=>b("/login",{replace:!0}),2e3)}catch(d){i(L(d,"auth")),n("password_reset_complete_failure",{reason:"auth_error"}),q(d,{})}finally{h(!1)}};return e.jsxs("div",{className:"rp-root",children:[e.jsx("style",{children:M}),e.jsx("div",{className:"rp-glow"}),e.jsx("div",{className:"rp-card",children:e.jsxs("div",{className:"rp-card-inner",children:[e.jsxs("div",{className:"rp-header",children:[e.jsx("div",{className:"rp-icon-wrap",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"24px",color:"var(--cc-accent)",fontVariationSettings:"'FILL' 1"},children:"lock_reset"})}),e.jsxs("div",{className:"rp-header-text",children:[e.jsx("h2",{children:"Set new password"}),e.jsx("p",{children:"Choose a strong, unique password"})]})]}),u&&e.jsxs("div",{className:"rp-alert rp-alert--success",role:"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"check_circle"}),"Password reset successfully! Redirecting to login..."]}),a&&e.jsxs("div",{className:"rp-alert rp-alert--error",role:"alert","aria-live":"polite",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"error"}),a]}),e.jsxs("form",{ref:f,className:"rp-form",onSubmit:C,noValidate:!0,children:[e.jsxs("div",{className:"rp-field",children:[e.jsx("label",{htmlFor:"reset-password",className:"rp-label",children:"New Password"}),e.jsxs("div",{className:"rp-input-wrap",children:[e.jsx("input",{id:"reset-password",className:`rp-input ${a&&(a.includes("Password")||!v.isValid)?"rp-input--error":""}`,type:c?"text":"password",placeholder:"Enter your new password",value:o,onChange:r=>_(r.target.value),autoComplete:"new-password",required:!0,minLength:S.minLength,disabled:t,"aria-invalid":!!a&&(a.includes("Password")||!v.isValid),"aria-describedby":"password-requirements password-strength",onKeyDown:r=>{r.key==="Enter"&&!t&&f.current?.requestSubmit()}}),e.jsx("button",{type:"button",className:"rp-eye-btn",onClick:()=>N(!c),"aria-label":c?"Hide password":"Show password",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"20px"},children:c?"visibility_off":"visibility"})})]}),e.jsxs("span",{id:"password-requirements",className:"rp-hint",children:["Min ",S.minLength," chars, uppercase, lowercase, number, special character"]}),e.jsx("div",{id:"password-strength",className:"rp-strength",children:e.jsx(D,{password:o})})]}),e.jsxs("div",{className:"rp-field",children:[e.jsx("label",{htmlFor:"reset-confirm-password",className:"rp-label",children:"Confirm Password"}),e.jsxs("div",{className:"rp-input-wrap",children:[e.jsx("input",{id:"reset-confirm-password",className:`rp-input ${a&&a.includes("match")?"rp-input--error":""}`,type:l?"text":"password",placeholder:"Confirm your new password",value:g,onChange:r=>z(r.target.value),autoComplete:"new-password",required:!0,disabled:t,"aria-invalid":!!a&&a.includes("match"),onKeyDown:r=>{r.key==="Enter"&&!t&&f.current?.requestSubmit()}}),e.jsx("button",{type:"button",className:"rp-eye-btn",onClick:()=>P(!l),"aria-label":l?"Hide password":"Show password",children:e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"20px"},children:l?"visibility_off":"visibility"})})]})]}),e.jsxs("button",{type:"submit",className:"rp-submit",disabled:t||u,children:[t&&e.jsx("span",{className:"rp-spinner"}),t?"Resetting...":u?"Password Reset!":"Reset Password"]})]}),e.jsxs("p",{className:"rp-back-row",children:["Remember your password?",e.jsx("a",{href:"#",className:"rp-back-link",onClick:r=>{r.preventDefault(),b("/login")},children:"Sign in"})]})]})}),e.jsx(A,{})]})};export{W as default};
