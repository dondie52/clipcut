import{u as N,r as p,j as e}from"./DwQPoapS.js";import{d as k,s as g,u as T}from"./i0YWhXY0.js";import{l as S}from"./C7YLj5Lf.js";import{getWorkerUrl as v,getWorkerUrlSource as w,setWorkerUrl as D,clearWorkerUrl as E}from"./CrFPy8FH.js";import"./DZxFKcQQ.js";import"./Et-wlZO3.js";import"./B9CjrYEi.js";async function C(a){if(!k())return L();const s={exportDate:new Date().toISOString(),userId:a,account:null,profile:null,projects:[],templates:[],analytics:{note:"Analytics data is aggregated and not tied to individual users"}};try{const{data:{user:r},error:t}=await g.auth.getUser();!t&&r&&(s.account={id:r.id,email:r.email,emailConfirmed:!!r.email_confirmed_at,createdAt:r.created_at,lastSignIn:r.last_sign_in_at,providers:r.app_metadata?.providers||[]});const{data:o,error:i}=await g.from("profiles").select("*").eq("id",a).single();!i&&o&&(s.profile={username:o.username,avatarUrl:o.avatar_url,createdAt:o.created_at});const c=await S(a,{limit:1e3});s.projects=c.map(n=>({id:n.id,name:n.name,thumbnailUrl:n.thumbnail_url,duration:n.duration_seconds,resolution:n.resolution,createdAt:n.created_at,updatedAt:n.updated_at}));try{const{data:n,error:u}=await g.from("templates").select("id, name, category, downloads, created_at").eq("creator_id",a);!u&&n&&(s.templates=n)}catch(n){console.warn("Templates export skipped:",n)}return s}catch(r){throw console.error("GDPR export error:",r),new Error(`Failed to export user data: ${r.message}`)}}async function _(a){if(!k())return R();try{const s=await S(a,{limit:1e3});for(const t of s)try{const{error:o}=await g.storage.from("projects").remove([`${a}/${t.id}`]);o&&console.warn(`Failed to delete storage for project ${t.id}:`,o);const{error:i}=await g.from("projects").delete().eq("id",t.id).eq("user_id",a);i&&console.warn(`Failed to delete project ${t.id}:`,i)}catch(o){console.warn(`Error deleting project ${t.id}:`,o)}try{const{error:t}=await g.from("templates").delete().eq("creator_id",a);t&&console.warn("Failed to delete templates:",t)}catch(t){console.warn("Templates deletion skipped:",t)}try{const{error:t}=await g.from("template_ratings").delete().eq("user_id",a);t&&console.warn("Failed to delete template ratings:",t)}catch(t){console.warn("Template ratings deletion skipped:",t)}const{error:r}=await g.from("profiles").delete().eq("id",a);r&&console.warn("Failed to delete profile:",r),console.warn("Auth user deletion requires admin privileges. Please contact support to complete account deletion, or use Supabase dashboard."),P(a);return}catch(s){throw console.error("GDPR deletion error:",s),new Error(`Failed to delete user data: ${s.message}`)}}async function A(a){try{const s=await C(a),r=JSON.stringify(s,null,2),t=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(t),i=document.createElement("a");i.href=o,i.download=`clipcut-data-export-${a}-${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}catch(s){throw console.error("Failed to download data export:",s),s}}function L(){const a={exportDate:new Date().toISOString(),source:"localStorage",projects:[]};for(let s=0;s<localStorage.length;s++){const r=localStorage.key(s);if(r&&(r.startsWith("clipcut_project_")||r.startsWith("clipcut_autosave_")))try{const t=JSON.parse(localStorage.getItem(r));a.projects.push({id:t.id||r,name:t.name||t.projectName,data:t})}catch(t){console.warn("Failed to parse project:",r,t)}}return a}function R(){const a=[];for(let s=0;s<localStorage.length;s++){const r=localStorage.key(s);r&&(r.startsWith("clipcut_")||r.startsWith("supabase."))&&a.push(r)}a.forEach(s=>localStorage.removeItem(s))}function P(a){const s=[];for(let r=0;r<localStorage.length;r++){const t=localStorage.key(r);t&&(t.startsWith("clipcut_")||t.startsWith("supabase.")||t.includes(a))&&s.push(t)}s.forEach(r=>localStorage.removeItem(r))}const U=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .settings-root {
    width: 100vw; height: 100vh; background: #0a0a0a;
    font-family: 'Spline Sans', sans-serif; display: flex;
    overflow: hidden; color: white;
  }

  .settings-sidebar {
    width: 200px; min-width: 200px; background: #0e1218;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column; padding: 20px 0;
  }

  .settings-sidebar-header {
    padding: 0 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 20px;
  }

  .settings-sidebar-header h2 {
    font-size: 18px; font-weight: 700; margin: 0;
    color: #75AADB;
  }

  .settings-nav {
    padding: 0 8px;
  }

  .settings-nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 8px;
    cursor: pointer; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,0.55); transition: all 0.15s ease;
    border: none; background: none; width: 100%; text-align: left;
    margin-bottom: 4px;
  }

  .settings-nav-item:hover {
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.8);
  }

  .settings-nav-item.active {
    background: rgba(117,170,219,0.1);
    color: white; font-weight: 600;
  }

  .settings-nav-item .material-symbols-outlined {
    font-size: 22px;
  }

  .settings-main {
    flex: 1; overflow-y: auto; padding: 40px;
    scrollbar-width: thin; scrollbar-color: #1e293b transparent;
  }

  .settings-main::-webkit-scrollbar { width: 6px; }
  .settings-main::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }

  .settings-section {
    max-width: 700px; margin-bottom: 40px;
  }

  .settings-section h1 {
    font-size: 28px; font-weight: 700; margin: 0 0 8px;
    color: #75AADB;
  }

  .settings-section p {
    color: rgba(255,255,255,0.6); font-size: 14px;
    margin: 0 0 24px; line-height: 1.6;
  }

  .settings-card {
    background: #1a2332; border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px; padding: 24px; margin-bottom: 16px;
  }

  .settings-card h3 {
    font-size: 18px; font-weight: 600; margin: 0 0 12px;
    color: white;
  }

  .settings-card p {
    color: rgba(255,255,255,0.6); font-size: 14px;
    margin: 0 0 16px; line-height: 1.6;
  }

  .settings-button {
    padding: 10px 20px; border-radius: 8px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all 0.2s ease;
    border: none;
  }

  .settings-button-primary {
    background: #75AADB; color: #0a0a0a;
  }

  .settings-button-primary:hover {
    background: #5a8cbf;
  }

  .settings-button-danger {
    background: #ef4444; color: white;
  }

  .settings-button-danger:hover {
    background: #dc2626;
  }

  .settings-button-secondary {
    background: rgba(26,35,50,0.5);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.8);
  }

  .settings-button-secondary:hover {
    background: rgba(26,35,50,0.8);
    border-color: rgba(255,255,255,0.2);
  }

  .settings-input {
    width: 100%; padding: 10px 14px;
    background: rgba(26,35,50,0.5);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px; color: white; font-size: 14px;
    font-family: inherit; outline: none;
  }

  .settings-input:focus {
    border-color: rgba(117,170,219,0.4);
  }

  .settings-loading {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid rgba(117,170,219,0.2);
    border-top-color: #75AADB; border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-left: 8px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .settings-warning {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px; padding: 16px;
    margin: 16px 0; color: rgba(255,255,255,0.9);
    font-size: 14px;
  }

  .settings-warning strong {
    color: #ef4444;
  }
`,d=({i:a,s=20,c:r,fill:t=!1,style:o})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:s,color:r,fontVariationSettings:t?"'FILL' 1":"'FILL' 0",...o},children:a});function F(){const[a,s]=p.useState(()=>v()),[r,t]=p.useState(()=>w()),[o,i]=p.useState(!1),[c,n]=p.useState(null),u=()=>{s(v()),t(w())},m=()=>{D(a),n(null),u()},x=()=>{E(),n(null),u()},b=async()=>{const h=(a||v()).replace(/\/+$/,"");if(!h){n({ok:!1,message:"Enter a URL first."});return}i(!0),n(null);try{const l=new AbortController,y=setTimeout(()=>l.abort(),1e4),j=await fetch(`${h}/edit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:"hi"}),signal:l.signal});clearTimeout(y),j.ok?n({ok:!0,message:`Connected (HTTP ${j.status}).`}):n({ok:!1,message:`Reached server but got HTTP ${j.status}.`})}catch(l){const y=l?.name==="AbortError"?"Timed out after 10s.":l?.message||"Network error.";n({ok:!1,message:y})}finally{i(!1)}},f=r==="runtime"?"Set in Settings (overrides .env)":r==="env"?"Set via VITE_TRANSCRIPT_WORKER_URL at build time":"Not configured";return e.jsxs("div",{className:"settings-section",children:[e.jsx("h1",{children:"Integrations"}),e.jsx("p",{children:"External services ClipCut can talk to."}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"AI Proxy / Transcription Worker"}),e.jsxs("p",{children:["Powers auto-captions, AI chat editing, silence analysis, and highlight detection. Deploy the Cloudflare Worker under ",e.jsx("code",{children:"backend/workers/ai-proxy"}),"and paste its URL here. This override is stored in your browser only (localStorage) and takes effect on the next AI action — no rebuild needed."]}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("input",{type:"url",placeholder:"https://clipcut-ai-proxy.your-account.workers.dev",value:a,onChange:h=>s(h.target.value),style:{flex:"1 1 320px",minWidth:260,padding:"10px 12px",borderRadius:6,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"white",fontSize:13,fontFamily:"inherit"}}),e.jsx("button",{className:"settings-button settings-button-primary",onClick:m,children:"Save"}),e.jsx("button",{className:"settings-button settings-button-secondary",onClick:b,disabled:o,children:o?"Testing…":"Test connection"}),e.jsx("button",{className:"settings-button settings-button-secondary",onClick:x,children:"Clear"})]}),e.jsxs("p",{style:{marginTop:12,fontSize:12,color:"rgba(255,255,255,0.55)"},children:["Currently: ",e.jsx("strong",{style:{color:r==="none"?"#ef4444":"#75AADB"},children:f})]}),c&&e.jsx("p",{role:"status",style:{marginTop:8,padding:"8px 12px",borderRadius:6,fontSize:13,background:c.ok?"rgba(34,197,94,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${c.ok?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"}`,color:c.ok?"#22c55e":"#ef4444"},children:c.message})]})]})}const M=()=>{const a=N(),{user:s,signOut:r}=T(),[t,o]=p.useState("account"),[i,c]=p.useState(!1),[n,u]=p.useState(!1),[m,x]=p.useState(""),b=async()=>{c(!0);try{await A(s?.id),alert("Data export downloaded successfully!")}catch(l){console.error("Export failed:",l),alert("Failed to export data. Please try again.")}finally{c(!1)}},f=async()=>{if(m!=="DELETE"){alert('Please type "DELETE" to confirm account deletion.');return}if(window.confirm("Are you absolutely sure? This will permanently delete your account and all your data. This action cannot be undone.")){u(!0);try{await _(s?.id),await r(),a("/login"),alert("Your account and all data have been deleted.")}catch(l){console.error("Deletion failed:",l),alert("Failed to delete account. Some data may require manual deletion. Please contact support.")}finally{u(!1)}}},h=async()=>{await r(),a("/login")};return e.jsxs("div",{className:"settings-root",children:[e.jsx("style",{children:U}),e.jsxs("aside",{className:"settings-sidebar",children:[e.jsx("div",{className:"settings-sidebar-header",children:e.jsx("h2",{children:"Settings"})}),e.jsxs("nav",{className:"settings-nav",children:[e.jsxs("button",{className:`settings-nav-item ${t==="account"?"active":""}`,onClick:()=>o("account"),children:[e.jsx(d,{i:"person",s:22}),e.jsx("span",{children:"Account"})]}),e.jsxs("button",{className:`settings-nav-item ${t==="privacy"?"active":""}`,onClick:()=>o("privacy"),children:[e.jsx(d,{i:"privacy_tip",s:22}),e.jsx("span",{children:"Privacy & Data"})]}),e.jsxs("button",{className:`settings-nav-item ${t==="integrations"?"active":""}`,onClick:()=>o("integrations"),children:[e.jsx(d,{i:"extension",s:22}),e.jsx("span",{children:"Integrations"})]}),e.jsxs("button",{className:`settings-nav-item ${t==="legal"?"active":""}`,onClick:()=>o("legal"),children:[e.jsx(d,{i:"gavel",s:22}),e.jsx("span",{children:"Legal"})]})]})]}),e.jsxs("main",{className:"settings-main",children:[t==="account"&&e.jsxs("div",{className:"settings-section",children:[e.jsx("h1",{children:"Account Settings"}),e.jsx("p",{children:"Manage your account information and preferences."}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Account Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",s?.email||"Not available"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"User ID:"})," ",s?.id||"Not available"]}),e.jsx("p",{style:{marginTop:"16px",color:"rgba(255,255,255,0.5)"},children:"To change your email or password, please use the authentication provider's settings or contact support."})]}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Sign Out"}),e.jsx("p",{children:"Sign out of your ClipCut account on this device."}),e.jsx("button",{className:"settings-button settings-button-secondary",onClick:h,children:"Sign Out"})]})]}),t==="privacy"&&e.jsxs("div",{className:"settings-section",children:[e.jsx("h1",{children:"Privacy & Data"}),e.jsx("p",{children:"Manage your privacy settings and exercise your data rights under GDPR and other privacy regulations."}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Export Your Data"}),e.jsx("p",{children:"Download a copy of all your data stored in ClipCut, including your account information, projects, and templates. The data will be provided in JSON format."}),e.jsx("button",{className:"settings-button settings-button-primary",onClick:b,disabled:i,children:i?e.jsxs(e.Fragment,{children:["Exporting...",e.jsx("span",{className:"settings-loading"})]}):e.jsxs(e.Fragment,{children:[e.jsx(d,{i:"download",s:18,c:"#0a0a0a",style:{marginRight:"8px"}}),"Export My Data"]})})]}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Delete Your Account"}),e.jsx("p",{children:"Permanently delete your ClipCut account and all associated data. This action cannot be undone."}),e.jsxs("div",{className:"settings-warning",children:[e.jsx("strong",{children:"Warning:"})," This will permanently delete:",e.jsxs("ul",{style:{marginTop:"8px",marginLeft:"20px"},children:[e.jsx("li",{children:"Your account and profile"}),e.jsx("li",{children:"All your projects and media files"}),e.jsx("li",{children:"All your templates"}),e.jsx("li",{children:"All your preferences and settings"})]})]}),e.jsxs("p",{style:{marginTop:"16px"},children:["Type ",e.jsx("strong",{children:"DELETE"})," to confirm:"]}),e.jsx("input",{type:"text",className:"settings-input",value:m,onChange:l=>x(l.target.value),placeholder:"Type DELETE to confirm",style:{marginBottom:"16px"}}),e.jsx("button",{className:"settings-button settings-button-danger",onClick:f,disabled:n||m!=="DELETE",children:n?e.jsxs(e.Fragment,{children:["Deleting...",e.jsx("span",{className:"settings-loading"})]}):e.jsxs(e.Fragment,{children:[e.jsx(d,{i:"delete_forever",s:18,c:"white",style:{marginRight:"8px"}}),"Delete My Account"]})})]}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Cookie Preferences"}),e.jsx("p",{children:"Manage your cookie preferences. You can change these settings at any time."}),e.jsx("button",{className:"settings-button settings-button-secondary",onClick:()=>{localStorage.removeItem("clipcut_cookie_consent"),window.location.reload()},children:"Reset Cookie Consent"})]})]}),t==="integrations"&&e.jsx(F,{}),t==="legal"&&e.jsxs("div",{className:"settings-section",children:[e.jsx("h1",{children:"Legal"}),e.jsx("p",{children:"Review our legal documents and policies."}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Privacy Policy"}),e.jsx("p",{children:"Learn how we collect, use, and protect your personal information."}),e.jsx("a",{href:"/privacy-policy.html",target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:e.jsxs("button",{className:"settings-button settings-button-secondary",children:[e.jsx(d,{i:"privacy_tip",s:18,c:"rgba(255,255,255,0.8)",style:{marginRight:"8px"}}),"View Privacy Policy"]})})]}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Terms of Service"}),e.jsx("p",{children:"Read our terms of service and user responsibilities."}),e.jsx("a",{href:"/terms-of-service.html",target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:e.jsxs("button",{className:"settings-button settings-button-secondary",children:[e.jsx(d,{i:"description",s:18,c:"rgba(255,255,255,0.8)",style:{marginRight:"8px"}}),"View Terms of Service"]})})]}),e.jsxs("div",{className:"settings-card",children:[e.jsx("h3",{children:"Open Source License"}),e.jsx("p",{children:"ClipCut is released under the MIT License. View the full license text."}),e.jsx("a",{href:"https://github.com/dondie52/clipcut/blob/main/LICENSE",target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:e.jsxs("button",{className:"settings-button settings-button-secondary",children:[e.jsx(d,{i:"code",s:18,c:"rgba(255,255,255,0.8)",style:{marginRight:"8px"}}),"View License"]})})]})]})]})]})};export{M as default};
