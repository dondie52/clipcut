const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/0L_k1v0w.js","assets/DwQPoapS.js","assets/D8AsaMNA.js","assets/DZxFKcQQ.js","assets/BLQS_nfQ.js","assets/CoPDVyLR.js","assets/Et-wlZO3.js","assets/B9CjrYEi.js","assets/CGouKsG-.js","assets/Cf6dk1K3.js","assets/DS9eCvNR.js","assets/C_3ut67C.js","assets/D6FAtAxt.js","assets/DcERv3aJ.js","assets/DACqMyEv.js","assets/8UtDM6yl.js","assets/BsIXVWUq.js","assets/y7Io9hui.js","assets/BYIDH4d7.js","assets/DCSVEQga.js"])))=>i.map(i=>d[i]);
var ne=Object.defineProperty;var oe=(t,e,r)=>e in t?ne(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var G=(t,e,r)=>oe(t,typeof e!="symbol"?e+"":e,r);import{r as a,j as s,N as q,u as J,B as ie,a as ae,R as le,b as E,c as ce,d as de}from"./DwQPoapS.js";import{c as ue}from"./DZxFKcQQ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const pe="modulepreload",fe=function(t){return"/clipcut/"+t},Y={},w=function(e,r,o){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),d=u?.nonce||u?.getAttribute("nonce");n=Promise.allSettled(r.map(l=>{if(l=fe(l),l in Y)return;Y[l]=!0;const p=l.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const c=document.createElement("link");if(c.rel=p?"stylesheet":pe,p||(c.as="script"),c.crossOrigin="",c.href=l,d&&c.setAttribute("nonce",d),document.head.appendChild(c),p)return new Promise((S,v)=>{c.addEventListener("load",S),c.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(u){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=u,window.dispatchEvent(d),!d.defaultPrevented)throw u}return n.then(u=>{for(const d of u||[])d.status==="rejected"&&i(d.reason);return e().catch(i)})},K="https://xmdwwaxpktwukksmzkwy.supabase.co",X="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZHd3YXhwa3R3dWtrc216a3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTM3NDUsImV4cCI6MjA4NzE2OTc0NX0.OlwyZ91ATRZ_gJG9WkuvC8nWMtYoVqnyrvkYsw0cGrs";function he(t){try{const e=new URL(t);return e.protocol!=="https:"?!1:e.protocol==="https:"||e.protocol==="http:"}catch{return!1}}function ge(t){const e=t.split(".");if(e.length!==3)return!1;const r=/^[A-Za-z0-9_-]+$/;return e.every(o=>o.length>0&&r.test(o))}const A=[];he(K)||A.push("VITE_SUPABASE_URL is not a valid URL");ge(X)||A.push("VITE_SUPABASE_ANON_KEY is not a valid Supabase key format");if(A.length>0){const t=`Supabase configuration error:
`+A.map(e=>`  - ${e}`).join(`
`)+`

Please copy env.example to .env and fill in your credentials.`;throw new Error(t)}const me="http://127.0.0.1:54321",xe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjowfQ.invalid",be=A.length===0?K:me,ye=A.length===0?X:xe,I=ue(be,ye,{auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"pkce"},global:{headers:{"X-Client-Info":"clipcut-web"}}});function yt(){return A.length===0}const F={INACTIVITY_TIMEOUT_MS:30*60*1e3,TOKEN_REFRESH_BUFFER_MS:5*60*1e3,VALIDATION_INTERVAL_MS:60*1e3},Z=a.createContext({user:null,session:null,loading:!0,signOut:async()=>{},refreshSession:async()=>{},isSessionValid:!1});function we({children:t}){const[e,r]=a.useState(null),[o,n]=a.useState(null),[i,u]=a.useState(!0),[d,l]=a.useState(!1),p=a.useRef(Date.now()),h=a.useRef(null),c=a.useRef(null),S=a.useCallback(f=>{if(!f?.expires_at)return!1;const m=f.expires_at*1e3,x=Date.now();return m-x<F.TOKEN_REFRESH_BUFFER_MS},[]),v=a.useCallback(async()=>{try{const{data:{session:f},error:m}=await I.auth.getSession();if(m)return console.warn("Session validation error:",m.message),l(!1),!1;if(!f)return l(!1),!1;if(S(f)){const{data:{session:x},error:j}=await I.auth.refreshSession();if(j)return console.warn("Session refresh failed:",j.message),l(!1),!1;x&&(n(x),r(x.user))}return l(!0),!0}catch(f){return console.warn("Session validation failed:",f),l(!1),!1}},[S]),P=a.useCallback(async()=>{h.current&&clearTimeout(h.current),c.current&&clearInterval(c.current);try{await I.auth.signOut()}catch(f){console.warn("Sign out error:",f)}r(null),n(null),l(!1)},[]),O=a.useRef(o);a.useEffect(()=>{O.current=o},[o]);const T=a.useCallback(()=>{p.current=Date.now(),h.current&&clearTimeout(h.current),O.current&&(h.current=setTimeout(async()=>{console.info("Session expired due to inactivity"),await P()},F.INACTIVITY_TIMEOUT_MS))},[P]),re=a.useCallback(async()=>{try{const{data:{session:f},error:m}=await I.auth.refreshSession();if(m)throw m;return f?(n(f),r(f.user),l(!0),!0):!1}catch(f){return console.warn("Manual session refresh failed:",f),l(!1),!1}},[]);return a.useEffect(()=>{let f=!0;I.auth.getSession().then(({data:{session:x}})=>{f&&(n(x),r(x?.user??null),l(!!x),u(!1),x&&T())});const{data:{subscription:m}}=I.auth.onAuthStateChange((x,j)=>{if(f)switch(n(j),r(j?.user??null),l(!!j),u(!1),x){case"SIGNED_IN":T();break;case"SIGNED_OUT":h.current&&clearTimeout(h.current);break;case"TOKEN_REFRESHED":l(!0);break}});return()=>{f=!1,m.unsubscribe(),h.current&&clearTimeout(h.current),c.current&&clearInterval(c.current)}},[T]),a.useEffect(()=>{if(!o)return;const f=["mousedown","keydown","scroll","touchstart"];return f.forEach(m=>{window.addEventListener(m,T,{passive:!0})}),()=>{f.forEach(m=>{window.removeEventListener(m,T)})}},[o,T]),a.useEffect(()=>{if(o)return c.current=setInterval(()=>{v()},F.VALIDATION_INTERVAL_MS),()=>{c.current&&clearInterval(c.current)}},[o,v]),s.jsx(Z.Provider,{value:{user:e,session:o,loading:i,signOut:P,refreshSession:re,isSessionValid:d},children:t})}function $(){const t=a.useContext(Z);if(!t)throw new Error("useAuth must be used within an AuthProvider");return t}const Q=()=>s.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Spline Sans', sans-serif"},children:[s.jsxs("div",{style:{textAlign:"center"},children:[s.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117,170,219,0.2)",borderTop:"3px solid #75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}),s.jsx("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:"Loading..."})]}),s.jsx("style",{children:`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `})]});function k({children:t}){const{user:e,loading:r}=$();return r?s.jsx(Q,{}):e?t:s.jsx(q,{to:"/login",replace:!0})}function N({children:t}){const{user:e,loading:r}=$();return r?s.jsx(Q,{}):e?s.jsx(q,{to:"/dashboard",replace:!0}):t}const g={LCP:"lcp",FID:"fid",CLS:"cls",FCP:"fcp",TTFB:"ttfb",PAGE_LOAD:"page_load",ROUTE_CHANGE:"route_change",VIDEO_TRIM:"video_trim",VIDEO_SPLIT:"video_split",VIDEO_MERGE:"video_merge",VIDEO_EXPORT:"video_export",VIDEO_THUMBNAIL:"video_thumbnail",VIDEO_PREVIEW:"video_preview",API_REQUEST:"api_request",API_UPLOAD:"api_upload",API_DOWNLOAD:"api_download",USER_INTERACTION:"user_interaction"},ve={LCP:{good:2500,needsImprovement:4e3},FID:{good:100,needsImprovement:300},CLS:{good:.1,needsImprovement:.25},FCP:{good:1800,needsImprovement:3e3},TTFB:{good:800,needsImprovement:1800},PAGE_LOAD:{good:3e3,needsImprovement:5e3},VIDEO_TRIM:{good:3e4,needsImprovement:6e4},VIDEO_EXPORT:{good:12e4,needsImprovement:24e4}};function Ee(t,e){const r=ve[t];return r?e<=r.good?"good":e<=r.needsImprovement?"needs-improvement":"poor":"unknown"}class _e{constructor(){this.metrics=[],this.observers=new Map,this.isEnabled=typeof window<"u"&&"PerformanceObserver"in window,this.isEnabled&&this.initCoreWebVitals()}initCoreWebVitals(){try{const e=new PerformanceObserver(r=>{const o=r.getEntries(),n=o[o.length-1];this.recordMetric(g.LCP,n.renderTime||n.loadTime,{element:n.element?.tagName||"unknown",url:n.url||""})});e.observe({entryTypes:["largest-contentful-paint"]}),this.observers.set("lcp",e)}catch(e){console.warn("[Performance] LCP observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{this.recordMetric(g.FID,n.processingStart-n.startTime,{eventType:n.name,target:n.target?.tagName||"unknown"})})});e.observe({entryTypes:["first-input"]}),this.observers.set("fid",e)}catch(e){console.warn("[Performance] FID observer not supported:",e)}try{let e=0;const r=new PerformanceObserver(o=>{const n=o.getEntries();n.forEach(i=>{i.hadRecentInput||(e+=i.value)}),this.recordMetric(g.CLS,e,{sources:n.length})});r.observe({entryTypes:["layout-shift"]}),this.observers.set("cls",r)}catch(e){console.warn("[Performance] CLS observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{n.name==="first-contentful-paint"&&this.recordMetric(g.FCP,n.startTime,{})})});e.observe({entryTypes:["paint"]}),this.observers.set("fcp",e)}catch(e){console.warn("[Performance] FCP observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{if(n.entryType==="navigation"){const i=n.responseStart-n.requestStart;this.recordMetric(g.TTFB,i,{url:n.name})}})});e.observe({entryTypes:["navigation"]}),this.observers.set("ttfb",e)}catch(e){console.warn("[Performance] TTFB observer not supported:",e)}}recordMetric(e,r,o={}){if(!this.isEnabled)return;const n={type:e,value:r,rating:Ee(e,r),timestamp:Date.now(),url:typeof window<"u"?window.location.pathname:"",userAgent:typeof navigator<"u"?navigator.userAgent:"",...o};this.metrics.push(n),this.metrics.length>100&&this.metrics.shift(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("performance-metric",{detail:n}))}startTiming(e,r,o={}){const n=performance.now(),i=`perf_${e}_start`;return this.isEnabled&&performance.mark(i),(u={})=>{const l=performance.now()-n,p=`perf_${e}_end`;return this.isEnabled&&(performance.mark(p),performance.measure(`perf_${e}`,i,p)),this.recordMetric(r,l,{...o,...u,operationId:e}),l}}measurePageLoad(e){!this.isEnabled||typeof window>"u"||window.addEventListener("load",()=>{const r=performance.getEntriesByType("navigation")[0];if(r){const o=r.loadEventEnd-r.fetchStart;this.recordMetric(g.PAGE_LOAD,o,{route:e,domContentLoaded:r.domContentLoadedEventEnd-r.fetchStart,domInteractive:r.domInteractive-r.fetchStart})}},{once:!0})}measureRouteChange(e,r,o){this.recordMetric(g.ROUTE_CHANGE,o,{fromRoute:e,toRoute:r})}getMetrics(e=null){return e?this.metrics.filter(r=>r.type===e):[...this.metrics]}getSummary(){const e={};return Object.values(g).forEach(r=>{const o=this.metrics.filter(n=>n.type===r);if(o.length>0){const n=o.map(i=>i.value);e[r]={count:o.length,avg:n.reduce((i,u)=>i+u,0)/n.length,min:Math.min(...n),max:Math.max(...n),latest:o[o.length-1]}}}),e}clear(){this.metrics=[]}cleanup(){this.observers.forEach(e=>{try{e.disconnect()}catch{}}),this.observers.clear()}}const R=new _e;async function wt(t,e,r={}){const o=`${t}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=R.startTiming(o,t,{...r,operation:t});try{const i=await e();return n({success:!0}),i}catch(i){throw n({success:!1,error:i.message}),i}}async function vt(t,e,r={}){const o=`api_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=R.startTiming(o,g.API_REQUEST,{endpoint:t,...r});try{const i=await e();return n({success:!0}),i}catch(i){throw n({success:!1,error:i.message,statusCode:i.status}),i}}async function Et(t,e,r,o={}){const n=`upload_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,i=R.startTiming(n,g.API_UPLOAD,{filename:t,fileSize:e,...o});try{const u=await r(),d=i({success:!0}),l=e/(d/1e3);return R.recordMetric(g.API_UPLOAD,d,{filename:t,fileSize:e,speed:l,...o}),u}catch(u){throw i({success:!1,error:u.message}),u}}typeof window<"u"&&R.measurePageLoad(window.location.pathname);const z={debug:10,info:20,warn:30,error:40},Se="info",H="info".toLowerCase(),ee=z[H]?H:Se,je=t=>t?{name:t.name,message:t.message,stack:t.stack}:null,D=(t,e,r={})=>({timestamp:new Date().toISOString(),level:t,message:e,app:"clipcut",env:"production",metadata:{...r,error:r.error instanceof Error?je(r.error):r.error}}),M=t=>z[t]>=z[ee],V=t=>{const e=JSON.stringify(t);if(t.level==="error"){console.error(e);return}if(t.level==="warn"){console.warn(e);return}if(t.level==="debug"){console.debug(e);return}console.log(e)},C={level:ee,debug(t,e){M("debug")&&V(D("debug",t,e))},info(t,e){M("info")&&V(D("info",t,e))},warn(t,e){M("warn")&&V(D("warn",t,e))},error(t,e){M("error")&&V(D("error",t,e))}},_=()=>{},ke={setTag:_,setExtra:_,setLevel:_,setFingerprint:_};let Ae={init:_,withScope:t=>t(ke),captureException:_,captureMessage:_,setUser:_,addBreadcrumb:_};async function Te(){{console.warn("[ErrorTracking] Sentry DSN not configured. Error tracking disabled.");return}}function U(t,e={}){{console.error("[ErrorTracking] Error captured but Sentry not configured:",t);return}}function Ie(t){Ae.addBreadcrumb({timestamp:Date.now()/1e3,...t})}function Re(){window.onerror=(t,e,r,o,n)=>(U(n||new Error(t),{}),!1),window.addEventListener("unhandledrejection",t=>{const e=t.reason instanceof Error?t.reason:new Error(String(t.reason));U(e,{extra:{reason:t.reason}})}),console.log("[ErrorTracking] Global error handlers set up")}async function Pe(){{console.warn("[Analytics] GA Measurement ID not configured. Analytics disabled.");return}}function Le(t,e){W(te.pageView,{})}function Ce(t,e,r,o){typeof e=="object"&&e!==null&&!Array.isArray(e)?W(t,e):typeof e=="string"||W(t,{})}async function W(t,e={}){}const te={pageView:"page_view",coreWebVital:"core_web_vital",loginAttempt:"login_attempt",loginSuccess:"login_success",loginFailure:"login_failure",passwordResetRequested:"password_reset_requested",registerAttempt:"register_attempt",registerSuccess:"register_success",registerFailure:"register_failure",googleSignInAttempt:"google_sign_in_attempt",onboardingStart:"onboarding_start",onboardingContinue:"onboarding_continue",onboardingSkip:"onboarding_skip",onboardingComplete:"onboarding_complete",dashboardNewProjectClick:"dashboard_new_project_click",dashboardFileImport:"dashboard_file_import",dashboardProjectOpen:"dashboard_project_open",dashboardProjectDelete:"dashboard_project_delete",dashboardAIFeatureSelect:"dashboard_ai_feature_select",dashboardToolSelect:"dashboard_tool_select"},Oe=new Set([g.LCP,g.FID,g.CLS]);let L=null;async function Ne(t){}function De(){if(typeof window>"u")return()=>{};if(L)return L;const t=e=>{const r=e.detail;!r||!Oe.has(r.type)||(r.type,Number(r.value),r.rating,r.timestamp||Date.now(),Ne())};return window.addEventListener("performance-metric",t),L=()=>{window.removeEventListener("performance-metric",t),L=null},L}function se(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("failed to fetch")||e.includes("network request failed")||e.includes("networkerror")||e.includes("net::err_")||e.includes("load failed")||e.includes("network error")||e.includes("econnrefused")||e.includes("econnreset")||e.includes("etimedout")||t.name==="TypeError"&&e.includes("fetch")||!navigator.onLine}function Me(t){if(!t)return!1;const e=(t.message||"").toLowerCase(),r=t.status||t.statusCode;return r===401||r===403||e.includes("jwt expired")||e.includes("invalid token")||e.includes("token expired")||e.includes("refresh_token")||e.includes("not authenticated")||e.includes("invalid credentials")||e.includes("invalid login")||e.includes("email not confirmed")||e.includes("session expired")||e.includes("unauthorized")}function Ve(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("ffmpeg")||e.includes("wasm")||e.includes("sharedarraybuffer")||e.includes("out of memory")||e.includes("oom")||e.includes("memory access out of bounds")||e.includes("cross-origin isolation")}function Fe(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("upload")||e.includes("file too large")||e.includes("file type not allowed")||e.includes("storage")||e.includes("bucket")||e.includes("quota exceeded")||t.name==="AbortError"}function Be(t){if(!t)return!1;if(se(t))return!0;const e=t.status||t.statusCode;if(e>=500&&e<600||e===429)return!0;const r=(t.message||"").toLowerCase();return!!(r.includes("timeout")||r.includes("timed out"))}const ze={"invalid login credentials":"Incorrect email or password. Please try again.","email not confirmed":"Please verify your email address before signing in. Check your inbox.","user already registered":"An account with this email already exists. Try signing in instead.","signup disabled":"Registration is currently unavailable. Please try again later.","email rate limit exceeded":"Too many attempts. Please wait a few minutes before trying again.","invalid email":"Please enter a valid email address.","weak password":"Your password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.","jwt expired":"Your session has expired. Please sign in again.",refresh_token_not_found:"Your session has expired. Please sign in again.","invalid token":"Your session is no longer valid. Please sign in again.","user not found":"No account found with this email address.",popup_closed_by_user:"Sign-in was cancelled. Please try again.",oauth_error:"Authentication service error. Please try again."},Ue={sharedarraybuffer:"Your browser does not support video processing. Try using Chrome or Edge.","cross-origin isolation":"Video processing requires special browser settings. Try refreshing the page.","out of memory":"The video is too large to process in your browser. Try a shorter clip or lower resolution.","memory access out of bounds":"Video processing ran out of memory. Try closing other tabs and retry.",wasm:"Failed to load the video engine. Please refresh the page.",ffmpeg:"Video processing failed. Please try again with a different file."},We={"file too large":"This file exceeds the maximum upload size (500 MB). Try compressing or trimming it first.","file type not allowed":"This file format is not supported. Accepted formats: MP4, WebM, MOV, AVI, MP3, WAV, JPEG, PNG.","quota exceeded":"Storage is full. Delete some old projects to free up space.","bucket not found":"Cloud storage is temporarily unavailable. Please try again later."};function _t(t,e){if(!t)return"An unexpected error occurred. Please try again.";const r=typeof t=="string"?t:t.message||"",o=r.toLowerCase();if(se(typeof t=="string"?new Error(t):t)||!navigator.onLine)return"Unable to connect. Please check your internet connection and try again.";if(e==="auth"||Me(typeof t=="string"?new Error(t):t)){for(const[n,i]of Object.entries(ze))if(o.includes(n))return i;return o.includes("locked")||o.includes("lockout")?r:"Authentication failed. Please try again."}if(e==="ffmpeg"||Ve(typeof t=="string"?new Error(t):t)){for(const[n,i]of Object.entries(Ue))if(o.includes(n))return i;return"Video processing failed. Please try a different file or refresh the page."}if(e==="upload"||Fe(typeof t=="string"?new Error(t):t)){if(typeof t!="string"&&t.name==="AbortError")return"Upload was cancelled.";for(const[n,i]of Object.entries(We))if(o.includes(n))return i;return"Upload failed. Please check your connection and try again."}return e==="project"?o.includes("access denied")?"You do not have permission to access this project.":o.includes("not found")?"This project could not be found. It may have been deleted.":"Failed to save or load your project. Please try again.":o.includes("timeout")||o.includes("timed out")?"The request took too long. Please try again.":r.length<150&&!r.includes(`
`)&&!r.includes("  at ")?r:"Something went wrong. Please try again."}async function St(t,e={}){const{maxRetries:r=3,baseDelay:o=1e3,maxDelay:n=1e4,shouldRetry:i=Be,onRetry:u,signal:d}=e;let l;for(let p=0;p<=r;p++){if(d?.aborted)throw new DOMException("Operation aborted","AbortError");try{return await t(p)}catch(h){if(l=h,h.name==="AbortError")throw h;if(p>=r||!i(h))break;const c=Math.min(o*Math.pow(2,p)+Math.random()*500,n);u&&u({error:h,attempt:p+1,delay:c}),await new Promise((S,v)=>{const P=setTimeout(S,c);if(d){const O=()=>{clearTimeout(P),v(new DOMException("Operation aborted","AbortError"))};d.addEventListener("abort",O,{once:!0})}})}}throw l}let B=[];function $e(t){const e=()=>t({online:!0}),r=()=>t({online:!1});return window.addEventListener("online",e),window.addEventListener("offline",r),B.push({handleOnline:e,handleOffline:r}),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",r),B=B.filter(o=>o.handleOnline!==e)}}class y extends a.Component{constructor(r){super(r);G(this,"handleReset",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null,eventId:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,o){C.error("ErrorBoundary caught an error",{error:r,errorInfo:o}),this.setState({errorInfo:o}),Ie({category:"error_boundary",message:`Error caught in "${this.props.name||"root"}": ${r.message}`,level:"error"}),U(r,{tags:{boundary:this.props.name||"root"},extra:{componentStack:o?.componentStack}})}render(){return this.state.hasError?this.props.fallback?this.props.fallback:this.props.renderFallback?this.props.renderFallback(this.state.error,this.handleReset):this.props.inline?s.jsx("div",{style:b.inlineContainer,children:s.jsxs("div",{style:b.inlineCard,children:[s.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"28px",color:"#ef4444"},children:"error_outline"}),s.jsxs("div",{style:{flex:1},children:[s.jsx("p",{style:{color:"#ffffff",fontSize:"14px",fontWeight:600,margin:"0 0 4px"},children:this.props.message||"This section encountered an error"}),s.jsx("p",{style:{color:"#94a3b8",fontSize:"12px",margin:0},children:"Try again or reload the page."})]}),s.jsx("button",{onClick:this.handleReset,style:b.inlineButton,children:"Retry"})]})}):s.jsx("div",{style:b.container,children:s.jsxs("div",{style:b.card,children:[s.jsx("div",{style:b.iconWrapper,children:s.jsx("span",{className:"material-symbols-outlined",style:b.icon,children:"error_outline"})}),s.jsx("h1",{style:b.title,children:this.props.message||"Something went wrong"}),s.jsx("p",{style:b.message,children:"We're sorry, but something unexpected happened. Please try refreshing the page or go back to the dashboard."}),!1,s.jsxs("div",{style:b.buttonGroup,children:[s.jsx("button",{onClick:this.handleReset,style:b.primaryButton,children:"Try Again"}),s.jsx("button",{onClick:()=>window.location.href="/dashboard",style:b.secondaryButton,children:"Go to Dashboard"})]})]})}):this.props.children}}const b={container:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",fontFamily:"'Spline Sans', sans-serif",padding:"20px"},card:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"48px",maxWidth:"480px",width:"100%",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},iconWrapper:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(239, 68, 68, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"},icon:{fontSize:"36px",color:"#ef4444"},title:{color:"#ffffff",fontSize:"24px",fontWeight:600,margin:"0 0 12px"},message:{color:"#94a3b8",fontSize:"14px",lineHeight:1.6,margin:"0 0 24px"},buttonGroup:{display:"flex",gap:"12px",justifyContent:"center"},primaryButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"transform 0.15s ease, box-shadow 0.15s ease"},secondaryButton:{background:"rgba(255,255,255,0.05)",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:500,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},inlineContainer:{display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",width:"100%",height:"100%",minHeight:"120px",background:"#0e1820"},inlineCard:{display:"flex",alignItems:"center",gap:"14px",background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:"12px",padding:"16px 20px",maxWidth:"420px",width:"100%"},inlineButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"8px 18px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",whiteSpace:"nowrap"}},Ge=`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');

  :root {
    --sp-bg: #0a0a0a;
    --sp-bg-alt: #0d1117;
    --sp-surface: #111820;
    --sp-accent: #75AADB;
    --sp-accent-light: #a8d0f0;
    --sp-text: #ffffff;
    --sp-text-muted: rgba(255,255,255,0.35);
    --sp-text-dim: rgba(255,255,255,0.2);
    --sp-font: 'Outfit', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .splash-root {
    width: 100vw;
    height: 100vh;
    background: var(--sp-bg);
    overflow: hidden;
    position: relative;
    font-family: var(--sp-font);
  }

  /* Film grain */
  .splash-root::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
  }

  /* Grid pattern */
  .splash-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(117,170,219,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(117,170,219,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
  }

  /* —— Curtains —— */
  .splash-curtain {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    z-index: 20;
    transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .splash-curtain--top {
    top: 0;
    background: linear-gradient(180deg, var(--sp-bg-alt) 0%, var(--sp-surface) 100%);
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .splash-curtain--bottom {
    bottom: 0;
    background: linear-gradient(0deg, var(--sp-bg-alt) 0%, var(--sp-surface) 100%);
  }

  .splash-curtain.split { transform: translateY(-105%); }
  .splash-curtain--bottom.split { transform: translateY(105%); }

  .splash-cut-edge {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    transition: all 0.5s ease;
  }

  .splash-curtain--top .splash-cut-edge { bottom: 0; }
  .splash-curtain--bottom .splash-cut-edge { top: 0; }

  .splash-cut-edge.glow {
    background: linear-gradient(90deg, transparent, var(--sp-accent), white, var(--sp-accent), transparent);
    box-shadow: 0 0 20px var(--sp-accent), 0 0 40px rgba(117,170,219,0.3);
  }

  /* —— Scissors —— */
  .splash-scissors {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 30;
    transition: opacity 0.5s ease;
    filter: drop-shadow(0 0 15px rgba(117,170,219,0.6));
  }

  .splash-scissors.entering {
    left: 50%;
    transition: left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease;
  }

  .splash-scissors.hidden { opacity: 0; }
  .splash-scissors.offscreen { left: -10%; }

  /* —— Sparks —— */
  .splash-sparks {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 25;
    overflow: hidden;
  }

  .splash-spark {
    position: absolute;
    top: 50%;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--sp-accent);
    box-shadow: 0 0 6px var(--sp-accent);
    animation: splashSparkle 0.6s ease-in-out infinite;
  }

  /* —— Main content —— */
  .splash-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .splash-content.hidden {
    opacity: 0;
    transform: scale(0.9);
  }

  .splash-content.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* Glow orb */
  .splash-glow-orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(117,170,219,0.12) 0%, transparent 70%);
    filter: blur(40px);
    animation: splashPulse 3s ease-in-out infinite;
  }

  /* Logo */
  .splash-logo {
    position: relative;
    margin-bottom: 24px;
  }

  .splash-film-frame {
    width: 88px;
    height: 72px;
    border-radius: 16px;
    background: linear-gradient(135deg, #1a2332 0%, var(--sp-bg-alt) 100%);
    border: 2px solid rgba(117,170,219,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(117,170,219,0.1);
  }

  .splash-perf {
    position: absolute;
    width: 6px;
    height: 10px;
    background: rgba(117,170,219,0.12);
    border: 1px solid rgba(117,170,219,0.18);
  }

  .splash-perf--left {
    left: -1px;
    border-radius: 0 3px 3px 0;
    border-left: none;
  }

  .splash-perf--right {
    right: -1px;
    border-radius: 3px 0 0 3px;
    border-right: none;
  }

  .splash-scissors-badge {
    position: absolute;
    bottom: -8px;
    right: -12px;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--sp-accent) 0%, #5a8ab5 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(117,170,219,0.4);
  }

  /* Title */
  .splash-title {
    font-size: 52px;
    font-weight: 800;
    color: var(--sp-text);
    margin: 0 0 4px;
    letter-spacing: -1px;
    text-shadow: 0 0 40px rgba(117,170,219,0.3);
  }

  .splash-tagline {
    font-size: 13px;
    font-weight: 400;
    color: rgba(117,170,219,0.7);
    margin: 0 0 40px;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  /* Loading bar */
  .splash-loader {
    width: 240px;
    transition: opacity 0.5s ease;
  }

  .splash-loader.hidden { opacity: 0; }
  .splash-loader.visible { opacity: 1; }

  .splash-loader-track {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    overflow: hidden;
  }

  .splash-loader-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--sp-accent), var(--sp-accent-light));
    border-radius: 4px;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(117,170,219,0.5);
  }

  .splash-loader-row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .splash-loader-status {
    font-size: 11px;
    color: var(--sp-text-muted);
    letter-spacing: 0.5px;
  }

  .splash-loader-pct {
    font-size: 11px;
    color: var(--sp-accent);
    font-weight: 600;
  }

  /* Footer */
  .splash-footer {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
    transition: opacity 0.5s ease;
  }

  .splash-footer-text {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* Botswana flag stripe */
  .splash-bw-stripe {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 35;
    display: flex;
    transition: opacity 1s ease;
  }

  /* —— Animations —— */
  @keyframes splashSparkle {
    0%, 100% { opacity: 0; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-8px); }
  }

  @keyframes splashPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }
`,Ye=()=>{const t=J(),[e,r]=a.useState(0);a.useEffect(()=>{const d=[setTimeout(()=>r(1),500),setTimeout(()=>r(2),1500),setTimeout(()=>r(3),2200),setTimeout(()=>r(4),3e3),setTimeout(()=>r(5),5500),setTimeout(()=>t("/login"),6500)];return()=>d.forEach(clearTimeout)},[t]);const[o,n]=a.useState(0);a.useEffect(()=>{if(e>=4){const d=setInterval(()=>{n(l=>l>=100?(clearInterval(d),100):l+2)},40);return()=>clearInterval(d)}},[e]);const i=o<30?"Loading workspace...":o<70?"Preparing editor...":o<100?"Almost ready...":"Welcome!",u=[15,37,59];return s.jsxs("div",{className:"splash-root",children:[s.jsx("style",{children:Ge}),s.jsx("div",{className:"splash-grid"}),s.jsx("div",{className:`splash-curtain splash-curtain--top ${e>=2?"split":""}`,children:s.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),s.jsx("div",{className:`splash-curtain splash-curtain--bottom ${e>=2?"split":""}`,children:s.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),s.jsx("div",{className:`splash-scissors ${e>=1?"entering":"offscreen"} ${e>=3?"hidden":""}`,children:s.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),s.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),s.jsxs("line",{x1:"8.2",y1:"7.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[s.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),s.jsx("animate",{attributeName:"y2",values:"18;14;18",dur:"1.2s",repeatCount:"indefinite"})]}),s.jsxs("line",{x1:"8.2",y1:"16.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[s.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),s.jsx("animate",{attributeName:"y2",values:"6;10;6",dur:"1.2s",repeatCount:"indefinite"})]}),s.jsxs("circle",{cx:"13",cy:"12",r:"1",fill:"#75AADB",opacity:e>=1?"1":"0",children:[s.jsx("animate",{attributeName:"r",values:"0.5;2;0.5",dur:"0.8s",repeatCount:"indefinite"}),s.jsx("animate",{attributeName:"opacity",values:"1;0.3;1",dur:"0.8s",repeatCount:"indefinite"})]})]})}),e>=1&&e<3&&s.jsx("div",{className:"splash-sparks",children:[...Array(20)].map((d,l)=>s.jsx("div",{className:"splash-spark",style:{left:`${l*5}%`,animationDelay:`${l*.05}s`}},l))}),s.jsxs("div",{className:`splash-content ${e>=3?"visible":"hidden"}`,children:[s.jsx("div",{className:"splash-glow-orb"}),s.jsxs("div",{className:"splash-logo",children:[s.jsxs("div",{className:"splash-film-frame",children:[s.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",children:s.jsx("path",{d:"M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z",fill:"#75AADB"})}),u.map((d,l)=>s.jsx("div",{className:"splash-perf splash-perf--left",style:{top:`${d}px`}},`l${l}`)),u.map((d,l)=>s.jsx("div",{className:"splash-perf splash-perf--right",style:{top:`${d}px`}},`r${l}`))]}),s.jsx("div",{className:"splash-scissors-badge",children:s.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",children:[s.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),s.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),s.jsx("line",{x1:"8.5",y1:"7.5",x2:"20",y2:"18",stroke:"white",strokeWidth:"2",strokeLinecap:"round"}),s.jsx("line",{x1:"8.5",y1:"16.5",x2:"20",y2:"6",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})})]}),s.jsx("h1",{className:"splash-title",children:"ClipCut"}),s.jsx("p",{className:"splash-tagline",children:"Professional Video Suite"}),s.jsxs("div",{className:`splash-loader ${e>=4?"visible":"hidden"}`,children:[s.jsx("div",{className:"splash-loader-track",children:s.jsx("div",{className:"splash-loader-fill",style:{width:`${o}%`}})}),s.jsxs("div",{className:"splash-loader-row",children:[s.jsx("span",{className:"splash-loader-status",children:i}),s.jsxs("span",{className:"splash-loader-pct",children:[o,"%"]})]})]})]}),s.jsx("div",{className:"splash-footer",style:{opacity:e>=4?.4:0},children:s.jsx("span",{className:"splash-footer-text",children:"© 2026 ClipCut • Bokas Technologies (Pty) Ltd"})}),s.jsxs("div",{className:"splash-bw-stripe",style:{opacity:e>=4?1:0},children:[s.jsx("div",{style:{flex:1,background:"#75AADB"}}),s.jsx("div",{style:{flex:.3,background:"white"}}),s.jsx("div",{style:{flex:1,background:"#0d0d0d"}}),s.jsx("div",{style:{flex:.3,background:"white"}}),s.jsx("div",{style:{flex:1,background:"#75AADB"}})]})]})},He=6e4;function qe(t=He){const{session:e,refreshSession:r,signOut:o}=$(),[n,i]=a.useState(!1),[u,d]=a.useState(0),l=a.useRef(!1),p=a.useMemo(()=>e?.expires_at?(l.current=!1,e.expires_at*1e3):null,[e?.expires_at]);return a.useEffect(()=>{if(!p){i(!1),d(0);return}const c=()=>{const v=p-Date.now();d(Math.max(0,v)),v<=t&&v>0&&i(!0),v<=0&&!l.current&&(l.current=!0,i(!1),o())};c();const S=window.setInterval(c,1e3);return()=>window.clearInterval(S)},[p,t,o]),{showWarning:n,timeRemainingMs:u,extendSession:async()=>{const c=await r();return c&&i(!1),c},logoutNow:o}}const jt=3e4,Je=3e3,kt=640,At=768,Tt=2700,It=300,Rt=5,Ke=a.lazy(()=>w(()=>import("./0L_k1v0w.js"),__vite__mapDeps([0,1,2,3]))),Xe=a.lazy(()=>w(()=>import("./BLQS_nfQ.js"),__vite__mapDeps([4,1,5,6,7,2,3]))),Ze=a.lazy(()=>w(()=>import("./CGouKsG-.js"),__vite__mapDeps([8,1,5,6,7,2,9,3]))),Qe=a.lazy(()=>w(()=>import("./DS9eCvNR.js"),__vite__mapDeps([10,1,5,6,7,2,9,3]))),et=a.lazy(()=>w(()=>import("./C_3ut67C.js"),__vite__mapDeps([11,1,5,7,3]))),tt=a.lazy(()=>w(()=>import("./D6FAtAxt.js"),__vite__mapDeps([12,1,6,2,3]))),st=a.lazy(()=>w(()=>import("./DcERv3aJ.js"),__vite__mapDeps([13,1,2,3]))),rt=a.lazy(()=>w(()=>import("./DACqMyEv.js"),__vite__mapDeps([14,1,2,3]))),nt=a.lazy(()=>w(()=>import("./8UtDM6yl.js"),__vite__mapDeps([15,1,16,6,7,3]))),ot=a.lazy(()=>w(()=>import("./y7Io9hui.js").then(t=>t.V),__vite__mapDeps([17,1,6,16,7,18]))),it=a.lazy(()=>w(()=>import("./DCSVEQga.js"),__vite__mapDeps([19,1,18,3]))),at=()=>s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",backgroundColor:"#0a0a0a",color:"#75AADB",fontFamily:"Spline Sans, sans-serif"},children:s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[s.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117, 170, 219, 0.2)",borderTopColor:"#75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),s.jsx("span",{style:{fontSize:"14px",opacity:.8},children:"Loading..."}),s.jsx("style",{children:`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}),lt=()=>{const[t,e]=a.useState(!navigator.onLine);return a.useEffect(()=>$e(({online:r})=>e(!r)),[]),t?s.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e4,background:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",fontWeight:600,color:"white"},children:[s.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"cloud_off"}),"You're offline. Some features may be unavailable."]}):null},ct=()=>{const{showWarning:t,timeRemainingMs:e,extendSession:r,logoutNow:o}=qe();if(!t)return null;const n=Math.max(1,Math.ceil(e/1e3));return s.jsxs("div",{style:{position:"fixed",top:"12px",right:"12px",zIndex:9999,background:"rgba(15,20,30,0.95)",border:"1px solid rgba(245, 158, 11, 0.6)",borderRadius:"10px",padding:"12px",width:"min(380px, calc(100vw - 24px))",boxShadow:"0 8px 24px rgba(0,0,0,0.35)"},children:[s.jsxs("p",{style:{color:"#f59e0b",margin:"0 0 10px",fontSize:"13px",fontWeight:700},children:["Your session is about to expire (",n,"s)"]}),s.jsxs("div",{style:{display:"flex",gap:"8px"},children:[s.jsx("button",{onClick:r,style:ut,children:"Stay signed in"}),s.jsx("button",{onClick:o,style:pt,children:"Sign out"})]})]})},dt=()=>{const[t,e]=a.useState(!0),r=J(),o=ae(),n=a.useRef(!1);return a.useEffect(()=>{n.current||(Pe(),n.current=!0)},[]),a.useEffect(()=>De(),[]),a.useEffect(()=>{t||(R.measurePageLoad(o.pathname),Le(o.pathname),Ce(te.pageView,{path:o.pathname}))},[o.pathname,t]),a.useEffect(()=>{const i=setTimeout(()=>{e(!1)},Je);return()=>clearTimeout(i)},[]),t?s.jsx(Ye,{}):s.jsxs(s.Fragment,{children:[s.jsx(lt,{}),s.jsx(ct,{}),s.jsx(a.Suspense,{fallback:s.jsx(at,{}),children:s.jsxs(le,{children:[s.jsx(E,{path:"/",element:s.jsx(N,{children:s.jsx(y,{name:"landing",message:"Landing page failed to load",onReset:()=>r("/"),children:s.jsx(Ke,{})})})}),s.jsx(E,{path:"/login",element:s.jsx(N,{children:s.jsx(y,{name:"login",message:"Login failed to load",onReset:()=>r("/login"),children:s.jsx(Xe,{onNavigateToRegister:()=>r("/register")})})})}),s.jsx(E,{path:"/register",element:s.jsx(N,{children:s.jsx(y,{name:"register",message:"Registration failed to load",onReset:()=>r("/register"),children:s.jsx(Ze,{onNavigateToLogin:()=>r("/login")})})})}),s.jsx(E,{path:"/reset-password",element:s.jsx(N,{children:s.jsx(y,{name:"reset-password",message:"Password reset failed to load",onReset:()=>r("/reset-password"),children:s.jsx(Qe,{})})})}),s.jsx(E,{path:"/verify-email",element:s.jsx(k,{children:s.jsx(y,{name:"verify-email",message:"Email verification failed to load",onReset:()=>r("/verify-email"),children:s.jsx(et,{})})})}),s.jsx(E,{path:"/onboarding/1",element:s.jsx(k,{children:s.jsx(y,{name:"onboarding",onReset:()=>r("/onboarding/1"),children:s.jsx(tt,{onContinue:()=>r("/onboarding/2"),onSkip:()=>r("/onboarding/2"),onSkipAll:()=>r("/dashboard")})})})}),s.jsx(E,{path:"/onboarding/2",element:s.jsx(k,{children:s.jsx(y,{name:"onboarding",onReset:()=>r("/onboarding/2"),children:s.jsx(st,{onContinue:()=>r("/onboarding/3"),onSkip:()=>r("/onboarding/3"),onSkipAll:()=>r("/dashboard")})})})}),s.jsx(E,{path:"/onboarding/3",element:s.jsx(k,{children:s.jsx(y,{name:"onboarding",onReset:()=>r("/onboarding/3"),children:s.jsx(rt,{onComplete:()=>r("/dashboard"),onSkip:()=>r("/dashboard")})})})}),s.jsx(E,{path:"/dashboard",element:s.jsx(k,{children:s.jsx(y,{name:"dashboard",message:"Dashboard failed to load",onReset:()=>r("/dashboard"),children:s.jsx(nt,{})})})}),s.jsx(E,{path:"/editor",element:s.jsx(k,{children:s.jsx(y,{name:"editor",message:"Video editor encountered an error",onReset:()=>r("/editor"),children:s.jsx(ot,{})})})}),s.jsx(E,{path:"/long-to-shorts",element:s.jsx(k,{children:s.jsx(y,{name:"long-to-shorts",message:"AI Shorts feature encountered an error",onReset:()=>r("/long-to-shorts"),children:s.jsx(it,{})})})})]})})]})},ut={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"8px 10px",fontWeight:700,cursor:"pointer"},pt={background:"transparent",color:"rgba(255,255,255,0.75)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"6px",padding:"8px 10px",fontWeight:600,cursor:"pointer"},ft="/clipcut/".replace(/\/$/,"")||void 0,ht=()=>s.jsx(y,{children:s.jsx(we,{children:s.jsx(ie,{basename:ft,children:s.jsx(dt,{})})})});function gt(t={}){const{immediate:e=!1,onNeedRefresh:r,onOfflineReady:o,onRegistered:n,onRegisteredSW:i,onRegisterError:u}=t;let d,l;const p=async(c=!0)=>{await l};async function h(){if("serviceWorker"in navigator){if(d=await w(async()=>{const{Workbox:c}=await import("./vqzQaGvo.js");return{Workbox:c}},[]).then(({Workbox:c})=>new c("/clipcut/sw.js",{scope:"/clipcut/",type:"classic"})).catch(c=>{u?.(c)}),!d)return;d.addEventListener("activated",c=>{(c.isUpdate||c.isExternal)&&window.location.reload()}),d.addEventListener("installed",c=>{c.isUpdate||o?.()}),d.register({immediate:e}).then(c=>{i?i("/clipcut/sw.js",c):n?.(c)}).catch(c=>{u?.(c)})}}return l=h(),p}Te();Re();gt({onNeedRefresh(){C.info("[PWA] New content available, refresh to update")},onOfflineReady(){C.info("[PWA] App ready to work offline")},onRegistered(t){C.info("[PWA] Service worker registered"),t&&setInterval(()=>{t.update()},60*60*1e3)},onRegisterError(t){C.error("[PWA] Service worker registration failed",{error:t})}});ce.createRoot(document.getElementById("root")).render(s.jsx(de.StrictMode,{children:s.jsx(ht,{})}));export{jt as A,Rt as D,y as E,kt as M,Tt as T,w as _,Ie as a,te as b,U as c,yt as d,It as e,At as f,_t as g,vt as h,se as i,Et as j,wt as k,C as l,g as m,St as r,I as s,Ce as t,$ as u};
