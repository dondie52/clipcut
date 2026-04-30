const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/C65dIe34.js","assets/DwQPoapS.js","assets/D8AsaMNA.js","assets/C_8A2FPv.js","assets/BM6ref50.js","assets/BVb4SCGJ.js","assets/Et-wlZO3.js","assets/B9CjrYEi.js","assets/CntziRaa.js","assets/Cf6dk1K3.js","assets/ZqKg7pge.js","assets/CZM3IKvX.js","assets/CEZq7q6x.js","assets/DccWSldF.js","assets/B_2ha73-.js","assets/DAK9aSbt.js","assets/CBFRehj_.js","assets/K7vDt2qt.js","assets/D0dE00Ad.js","assets/CAVrsK0Z.js","assets/CwPgANad.js","assets/CrFPy8FH.js","assets/DOuFuAYi.js","assets/BOBGO_ZO.js","assets/D1T_bejs.js"])))=>i.map(i=>d[i]);
var fe=Object.defineProperty;var he=(t,e,r)=>e in t?fe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Z=(t,e,r)=>he(t,typeof e!="symbol"?e+"":e,r);import{r as c,j as s,N as se,u as re,B as ge,a as me,R as xe,b as y,c as be,d as ye}from"./DwQPoapS.js";import{c as we}from"./C_8A2FPv.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const ve="modulepreload",Ee=function(t){return"/clipcut/"+t},Q={},g=function(e,r,i){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),d=u?.nonce||u?.getAttribute("nonce");n=Promise.allSettled(r.map(l=>{if(l=Ee(l),l in Q)return;Q[l]=!0;const p=l.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const a=document.createElement("link");if(a.rel=p?"stylesheet":ve,p||(a.as="script"),a.crossOrigin="",a.href=l,d&&a.setAttribute("nonce",d),document.head.appendChild(a),p)return new Promise((j,E)=>{a.addEventListener("load",j),a.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(u){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=u,window.dispatchEvent(d),!d.defaultPrevented)throw u}return n.then(u=>{for(const d of u||[])d.status==="rejected"&&o(d.reason);return e().catch(o)})},ne=`https://xmdwwaxpktwukksmzkwy.supabase.co

`,ie="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZHd3YXhwa3R3dWtrc216a3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTM3NDUsImV4cCI6MjA4NzE2OTc0NX0.OlwyZ91ATRZ_gJG9WkuvC8nWMtYoVqnyrvkYsw0cGrs";function Se(t){try{const e=new URL(t);return e.protocol!=="https:"?!1:e.protocol==="https:"||e.protocol==="http:"}catch{return!1}}function _e(t){const e=t.split(".");if(e.length!==3)return!1;const r=/^[A-Za-z0-9_-]+$/;return e.every(i=>i.length>0&&r.test(i))}const k=[];Se(ne)||k.push("VITE_SUPABASE_URL is not a valid URL");_e(ie)||k.push("VITE_SUPABASE_ANON_KEY is not a valid Supabase key format");if(k.length>0){const t=`Supabase configuration error:
`+k.map(e=>`  - ${e}`).join(`
`)+`

Please copy env.example to .env and fill in your credentials.`;throw new Error(t)}const je="http://127.0.0.1:54321",ke="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjowfQ.invalid",Ae=k.length===0?ne:je,Te=k.length===0?ie:ke,I=we(Ae,Te,{auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"pkce"},global:{headers:{"X-Client-Info":"clipcut-web"}}});function D(){return k.length===0}const U={INACTIVITY_TIMEOUT_MS:30*60*1e3,TOKEN_REFRESH_BUFFER_MS:5*60*1e3,VALIDATION_INTERVAL_MS:60*1e3},oe=c.createContext({user:null,session:null,loading:!0,signOut:async()=>{},refreshSession:async()=>{},isSessionValid:!1});function Re({children:t}){const[e,r]=c.useState(null),[i,n]=c.useState(null),[o,u]=c.useState(!0),[d,l]=c.useState(!1),p=c.useRef(Date.now()),f=c.useRef(null),a=c.useRef(null),j=c.useCallback(h=>{if(!h?.expires_at)return!1;const m=h.expires_at*1e3,R=Date.now();return m-R<U.TOKEN_REFRESH_BUFFER_MS},[]),E=c.useCallback(async()=>{if(!D())return l(!1),!1;try{const{data:{session:h},error:m}=await I.auth.getSession();if(m)return console.warn("Session validation error:",m.message),l(!1),!1;if(!h)return l(!1),!1;if(j(h)){const{data:{session:R},error:w}=await I.auth.refreshSession();if(w)return console.warn("Session refresh failed:",w.message),l(!1),!1;R&&(n(R),r(R.user))}return l(!0),!0}catch(h){return console.warn("Session validation failed:",h),l(!1),!1}},[j]),P=c.useCallback(async()=>{f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current);try{D()&&await I.auth.signOut()}catch(h){console.warn("Sign out error:",h)}r(null),n(null),l(!1)},[]),N=c.useRef(i);c.useEffect(()=>{N.current=i},[i]);const T=c.useCallback(()=>{p.current=Date.now(),f.current&&clearTimeout(f.current),N.current&&(f.current=setTimeout(async()=>{await P()},U.INACTIVITY_TIMEOUT_MS))},[P]),pe=c.useCallback(async()=>{if(!D())return l(!1),!1;try{const{data:{session:h},error:m}=await I.auth.refreshSession();if(m)throw m;return h?(n(h),r(h.user),l(!0),!0):!1}catch(h){return console.warn("Manual session refresh failed:",h),l(!1),!1}},[]);return c.useEffect(()=>{let h=!0;if(!D())return u(!1),l(!1),()=>{h=!1};let m;return(async()=>{try{const{data:{session:w}}=await I.auth.getSession();if(!h)return;n(w),r(w?.user??null),l(!!w),w&&T()}catch(w){if(!h)return;console.warn("Initial session lookup failed:",w),n(null),r(null),l(!1)}finally{h&&u(!1)}})(),{data:{subscription:m}}=I.auth.onAuthStateChange((w,W)=>{if(h)switch(n(W),r(W?.user??null),l(!!W),u(!1),w){case"SIGNED_IN":T();break;case"SIGNED_OUT":f.current&&clearTimeout(f.current);break;case"TOKEN_REFRESHED":l(!0);break}}),()=>{h=!1,m?.unsubscribe(),f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current)}},[T]),c.useEffect(()=>{if(!i)return;const h=["mousedown","keydown","scroll","touchstart"];return h.forEach(m=>{window.addEventListener(m,T,{passive:!0})}),()=>{h.forEach(m=>{window.removeEventListener(m,T)})}},[i,T]),c.useEffect(()=>{if(i)return a.current=setInterval(()=>{E()},U.VALIDATION_INTERVAL_MS),()=>{a.current&&clearInterval(a.current)}},[i,E]),s.jsx(oe.Provider,{value:{user:e,session:i,loading:o,signOut:P,refreshSession:pe,isSessionValid:d},children:t})}function K(){const t=c.useContext(oe);if(!t)throw new Error("useAuth must be used within an AuthProvider");return t}const ae=()=>s.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Spline Sans', sans-serif"},children:[s.jsxs("div",{style:{textAlign:"center"},children:[s.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117,170,219,0.2)",borderTop:"3px solid #75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}),s.jsx("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:"Loading..."})]}),s.jsx("style",{children:`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `})]});function S({children:t}){const{user:e,loading:r}=K();return r?s.jsx(ae,{}):e?t:s.jsx(se,{to:"/login",replace:!0})}function M({children:t}){const{user:e,loading:r}=K();return r?s.jsx(ae,{}):e?s.jsx(se,{to:"/dashboard",replace:!0}):t}const b={LCP:"lcp",FID:"fid",CLS:"cls",FCP:"fcp",TTFB:"ttfb",PAGE_LOAD:"page_load",ROUTE_CHANGE:"route_change",VIDEO_TRIM:"video_trim",VIDEO_SPLIT:"video_split",VIDEO_MERGE:"video_merge",VIDEO_EXPORT:"video_export",VIDEO_THUMBNAIL:"video_thumbnail",VIDEO_PREVIEW:"video_preview",API_REQUEST:"api_request",API_UPLOAD:"api_upload",API_DOWNLOAD:"api_download",USER_INTERACTION:"user_interaction"},Ie={LCP:{good:2500,needsImprovement:4e3},FID:{good:100,needsImprovement:300},CLS:{good:.1,needsImprovement:.25},FCP:{good:1800,needsImprovement:3e3},TTFB:{good:800,needsImprovement:1800},PAGE_LOAD:{good:3e3,needsImprovement:5e3},VIDEO_TRIM:{good:3e4,needsImprovement:6e4},VIDEO_EXPORT:{good:12e4,needsImprovement:24e4}};function Le(t,e){const r=Ie[t];return r?e<=r.good?"good":e<=r.needsImprovement?"needs-improvement":"poor":"unknown"}class Pe{constructor(){this.metrics=[],this.observers=new Map,this.isEnabled=typeof window<"u"&&"PerformanceObserver"in window,this.isEnabled&&this.initCoreWebVitals()}initCoreWebVitals(){try{const e=new PerformanceObserver(r=>{const i=r.getEntries(),n=i[i.length-1];this.recordMetric(b.LCP,n.renderTime||n.loadTime,{element:n.element?.tagName||"unknown",url:n.url||""})});e.observe({entryTypes:["largest-contentful-paint"]}),this.observers.set("lcp",e)}catch(e){console.warn("[Performance] LCP observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{this.recordMetric(b.FID,n.processingStart-n.startTime,{eventType:n.name,target:n.target?.tagName||"unknown"})})});e.observe({entryTypes:["first-input"]}),this.observers.set("fid",e)}catch(e){console.warn("[Performance] FID observer not supported:",e)}try{let e=0;const r=new PerformanceObserver(i=>{const n=i.getEntries();n.forEach(o=>{o.hadRecentInput||(e+=o.value)}),this.recordMetric(b.CLS,e,{sources:n.length})});r.observe({entryTypes:["layout-shift"]}),this.observers.set("cls",r)}catch(e){console.warn("[Performance] CLS observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{n.name==="first-contentful-paint"&&this.recordMetric(b.FCP,n.startTime,{})})});e.observe({entryTypes:["paint"]}),this.observers.set("fcp",e)}catch(e){console.warn("[Performance] FCP observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{if(n.entryType==="navigation"){const o=n.responseStart-n.requestStart;this.recordMetric(b.TTFB,o,{url:n.name})}})});e.observe({entryTypes:["navigation"]}),this.observers.set("ttfb",e)}catch(e){console.warn("[Performance] TTFB observer not supported:",e)}}recordMetric(e,r,i={}){if(!this.isEnabled)return;const n={type:e,value:r,rating:Le(e,r),timestamp:Date.now(),url:typeof window<"u"?window.location.pathname:"",userAgent:typeof navigator<"u"?navigator.userAgent:"",...i};this.metrics.push(n),this.metrics.length>100&&this.metrics.shift(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("performance-metric",{detail:n}))}startTiming(e,r,i={}){const n=performance.now(),o=`perf_${e}_start`;return this.isEnabled&&performance.mark(o),(u={})=>{const l=performance.now()-n,p=`perf_${e}_end`;return this.isEnabled&&(performance.mark(p),performance.measure(`perf_${e}`,o,p)),this.recordMetric(r,l,{...i,...u,operationId:e}),l}}measurePageLoad(e){!this.isEnabled||typeof window>"u"||window.addEventListener("load",()=>{const r=performance.getEntriesByType("navigation")[0];if(r){const i=r.loadEventEnd-r.fetchStart;this.recordMetric(b.PAGE_LOAD,i,{route:e,domContentLoaded:r.domContentLoadedEventEnd-r.fetchStart,domInteractive:r.domInteractive-r.fetchStart})}},{once:!0})}measureRouteChange(e,r,i){this.recordMetric(b.ROUTE_CHANGE,i,{fromRoute:e,toRoute:r})}getMetrics(e=null){return e?this.metrics.filter(r=>r.type===e):[...this.metrics]}getSummary(){const e={};return Object.values(b).forEach(r=>{const i=this.metrics.filter(n=>n.type===r);if(i.length>0){const n=i.map(o=>o.value);e[r]={count:i.length,avg:n.reduce((o,u)=>o+u,0)/n.length,min:Math.min(...n),max:Math.max(...n),latest:i[i.length-1]}}}),e}clear(){this.metrics=[]}cleanup(){this.observers.forEach(e=>{try{e.disconnect()}catch{}}),this.observers.clear()}}const L=new Pe;async function Yt(t,e,r={}){const i=`${t}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=L.startTiming(i,t,{...r,operation:t});try{const o=await e();return n({success:!0}),o}catch(o){throw n({success:!1,error:o.message}),o}}async function Gt(t,e,r={}){const i=`api_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=L.startTiming(i,b.API_REQUEST,{endpoint:t,...r});try{const o=await e();return n({success:!0}),o}catch(o){throw n({success:!1,error:o.message,statusCode:o.status}),o}}async function Ht(t,e,r,i={}){const n=`upload_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,o=L.startTiming(n,b.API_UPLOAD,{filename:t,fileSize:e,...i});try{const u=await r(),d=o({success:!0}),l=e/(d/1e3);return L.recordMetric(b.API_UPLOAD,d,{filename:t,fileSize:e,speed:l,...i}),u}catch(u){throw o({success:!1,error:u.message}),u}}typeof window<"u"&&L.measurePageLoad(window.location.pathname);const G={debug:10,info:20,warn:30,error:40},Oe="info",ee=void 0,le=G[ee]?ee:Oe,Ce=t=>t?{name:t.name,message:t.message,stack:t.stack}:null,z=(t,e,r={})=>({timestamp:new Date().toISOString(),level:t,message:e,app:"clipcut",env:"production",metadata:{...r,error:r.error instanceof Error?Ce(r.error):r.error}}),V=t=>G[t]>=G[le],F=t=>{const e=JSON.stringify(t);if(t.level==="error"){console.error(e);return}if(t.level==="warn"){console.warn(e);return}t.level},C={level:le,debug(t,e){V("debug")&&F(z("debug",t,e))},info(t,e){V("info")&&F(z("info",t,e))},warn(t,e){V("warn")&&F(z("warn",t,e))},error(t,e){V("error")&&F(z("error",t,e))}},_=()=>{},Ne={setTag:_,setExtra:_,setLevel:_,setFingerprint:_};let De={init:_,withScope:t=>t(Ne),captureException:_,captureMessage:_,setUser:_,addBreadcrumb:_};async function Me(){{console.warn("[ErrorTracking] Sentry DSN not configured. Error tracking disabled.");return}}function H(t,e={}){{console.error("[ErrorTracking] Error captured but Sentry not configured:",t);return}}function ze(t){De.addBreadcrumb({timestamp:Date.now()/1e3,...t})}function Ve(){window.onerror=(t,e,r,i,n)=>(H(n||new Error(t),{}),!1),window.addEventListener("unhandledrejection",t=>{const e=t.reason instanceof Error?t.reason:new Error(String(t.reason));H(e,{extra:{reason:t.reason}})})}async function Fe(){{console.warn("[Analytics] GA Measurement ID not configured. Analytics disabled.");return}}function Be(t,e){q(ce.pageView,{})}function We(t,e,r,i){typeof e=="object"&&e!==null&&!Array.isArray(e)?q(t,e):typeof e=="string"||q(t,{})}async function q(t,e={}){}const ce={pageView:"page_view",coreWebVital:"core_web_vital",loginAttempt:"login_attempt",loginSuccess:"login_success",loginFailure:"login_failure",passwordResetRequested:"password_reset_requested",registerAttempt:"register_attempt",registerSuccess:"register_success",registerFailure:"register_failure",googleSignInAttempt:"google_sign_in_attempt",onboardingStart:"onboarding_start",onboardingContinue:"onboarding_continue",onboardingSkip:"onboarding_skip",onboardingComplete:"onboarding_complete",dashboardNewProjectClick:"dashboard_new_project_click",dashboardFileImport:"dashboard_file_import",dashboardProjectOpen:"dashboard_project_open",dashboardProjectDelete:"dashboard_project_delete",dashboardAIFeatureSelect:"dashboard_ai_feature_select",dashboardToolSelect:"dashboard_tool_select"},Ue=new Set([b.LCP,b.FID,b.CLS]);let O=null;async function $e(t){}function Ye(){if(typeof window>"u")return()=>{};if(O)return O;const t=e=>{const r=e.detail;!r||!Ue.has(r.type)||(r.type,Number(r.value),r.rating,r.timestamp||Date.now(),$e())};return window.addEventListener("performance-metric",t),O=()=>{window.removeEventListener("performance-metric",t),O=null},O}function de(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("failed to fetch")||e.includes("network request failed")||e.includes("networkerror")||e.includes("net::err_")||e.includes("load failed")||e.includes("network error")||e.includes("econnrefused")||e.includes("econnreset")||e.includes("etimedout")||t.name==="TypeError"&&e.includes("fetch")||!navigator.onLine}function Ge(t){if(!t)return!1;const e=(t.message||"").toLowerCase(),r=t.status||t.statusCode;return r===401||r===403||e.includes("jwt expired")||e.includes("invalid token")||e.includes("token expired")||e.includes("refresh_token")||e.includes("not authenticated")||e.includes("invalid credentials")||e.includes("invalid login")||e.includes("email not confirmed")||e.includes("session expired")||e.includes("unauthorized")}function He(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("ffmpeg")||e.includes("wasm")||e.includes("sharedarraybuffer")||e.includes("out of memory")||e.includes("oom")||e.includes("memory access out of bounds")||e.includes("cross-origin isolation")}function qe(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("upload")||e.includes("file too large")||e.includes("file type not allowed")||e.includes("storage")||e.includes("bucket")||e.includes("quota exceeded")||t.name==="AbortError"}function Je(t){if(!t)return!1;if(de(t))return!0;const e=t.status||t.statusCode;if(e>=500&&e<600||e===429)return!0;const r=(t.message||"").toLowerCase();return!!(r.includes("timeout")||r.includes("timed out"))}const Ke={"invalid login credentials":"Incorrect email or password. Please try again.","email not confirmed":"Please verify your email address before signing in. Check your inbox.","user already registered":"An account with this email already exists. Try signing in instead.","signup disabled":"Registration is currently unavailable. Please try again later.","email rate limit exceeded":"Too many attempts. Please wait a few minutes before trying again.","invalid email":"Please enter a valid email address.","weak password":"Your password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.","jwt expired":"Your session has expired. Please sign in again.",refresh_token_not_found:"Your session has expired. Please sign in again.","invalid token":"Your session is no longer valid. Please sign in again.","user not found":"No account found with this email address.",popup_closed_by_user:"Sign-in was cancelled. Please try again.",oauth_error:"Authentication service error. Please try again."},Xe={sharedarraybuffer:"Your browser does not support video processing. Try using Chrome or Edge.","cross-origin isolation":"Video processing requires special browser settings. Try refreshing the page.","out of memory":"The video is too large to process in your browser. Try a shorter clip or lower resolution.","memory access out of bounds":"Video processing ran out of memory. Try closing other tabs and retry.",wasm:"Failed to load the video engine. Please refresh the page.",ffmpeg:"Video processing failed. Please try again with a different file."},Ze={"file too large":"This file exceeds the maximum upload size (500 MB). Try compressing or trimming it first.","file type not allowed":"This file format is not supported. Accepted formats: MP4, WebM, MOV, AVI, MP3, WAV, JPEG, PNG.","quota exceeded":"Storage is full. Delete some old projects to free up space.","bucket not found":"Cloud storage is temporarily unavailable. Please try again later."};function qt(t,e){if(!t)return"An unexpected error occurred. Please try again.";const r=typeof t=="string"?t:t.message||"",i=r.toLowerCase();if(de(typeof t=="string"?new Error(t):t)||!navigator.onLine)return"Unable to connect. Please check your internet connection and try again.";if(e==="auth"||Ge(typeof t=="string"?new Error(t):t)){for(const[n,o]of Object.entries(Ke))if(i.includes(n))return o;return i.includes("locked")||i.includes("lockout")?r:"Authentication failed. Please try again."}if(e==="ffmpeg"||He(typeof t=="string"?new Error(t):t)){for(const[n,o]of Object.entries(Xe))if(i.includes(n))return o;return"Video processing failed. Please try a different file or refresh the page."}if(e==="upload"||qe(typeof t=="string"?new Error(t):t)){if(typeof t!="string"&&t.name==="AbortError")return"Upload was cancelled.";for(const[n,o]of Object.entries(Ze))if(i.includes(n))return o;return"Upload failed. Please check your connection and try again."}return e==="project"?i.includes("access denied")?"You do not have permission to access this project.":i.includes("not found")?"This project could not be found. It may have been deleted.":"Failed to save or load your project. Please try again.":i.includes("timeout")||i.includes("timed out")?"The request took too long. Please try again.":r.length<150&&!r.includes(`
`)&&!r.includes("  at ")?r:"Something went wrong. Please try again."}async function Jt(t,e={}){const{maxRetries:r=3,baseDelay:i=1e3,maxDelay:n=1e4,shouldRetry:o=Je,onRetry:u,signal:d}=e;let l;for(let p=0;p<=r;p++){if(d?.aborted)throw new DOMException("Operation aborted","AbortError");try{return await t(p)}catch(f){if(l=f,f.name==="AbortError")throw f;if(p>=r||!o(f))break;const a=Math.min(i*Math.pow(2,p)+Math.random()*500,n);u&&u({error:f,attempt:p+1,delay:a}),await new Promise((j,E)=>{const P=setTimeout(j,a);if(d){const N=()=>{clearTimeout(P),E(new DOMException("Operation aborted","AbortError"))};d.addEventListener("abort",N,{once:!0})}})}}throw l}let $=[];function Qe(t){const e=()=>t({online:!0}),r=()=>t({online:!1});return window.addEventListener("online",e),window.addEventListener("offline",r),$.push({handleOnline:e,handleOffline:r}),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",r),$=$.filter(i=>i.handleOnline!==e)}}class x extends c.Component{constructor(r){super(r);Z(this,"handleReset",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null,eventId:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,i){C.error("ErrorBoundary caught an error",{error:r,errorInfo:i}),this.setState({errorInfo:i}),ze({category:"error_boundary",message:`Error caught in "${this.props.name||"root"}": ${r.message}`,level:"error"}),H(r,{tags:{boundary:this.props.name||"root"},extra:{componentStack:i?.componentStack}})}render(){return this.state.hasError?this.props.fallback?this.props.fallback:this.props.renderFallback?this.props.renderFallback(this.state.error,this.handleReset):this.props.inline?s.jsx("div",{style:v.inlineContainer,children:s.jsxs("div",{style:v.inlineCard,children:[s.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"28px",color:"#ef4444"},children:"error_outline"}),s.jsxs("div",{style:{flex:1},children:[s.jsx("p",{style:{color:"#ffffff",fontSize:"14px",fontWeight:600,margin:"0 0 4px"},children:this.props.message||"This section encountered an error"}),s.jsx("p",{style:{color:"#94a3b8",fontSize:"12px",margin:0},children:"Try again or reload the page."})]}),s.jsx("button",{onClick:this.handleReset,style:v.inlineButton,children:"Retry"})]})}):s.jsx("div",{style:v.container,children:s.jsxs("div",{style:v.card,children:[s.jsx("div",{style:v.iconWrapper,children:s.jsx("span",{className:"material-symbols-outlined",style:v.icon,children:"error_outline"})}),s.jsx("h1",{style:v.title,children:this.props.message||"Something went wrong"}),s.jsx("p",{style:v.message,children:"We're sorry, but something unexpected happened. Please try refreshing the page or go back to the dashboard."}),!1,s.jsxs("div",{style:v.buttonGroup,children:[s.jsx("button",{onClick:this.handleReset,style:v.primaryButton,children:"Try Again"}),s.jsx("button",{onClick:()=>window.location.href="/dashboard",style:v.secondaryButton,children:"Go to Dashboard"})]})]})}):this.props.children}}const v={container:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",fontFamily:"'Spline Sans', sans-serif",padding:"20px"},card:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"48px",maxWidth:"480px",width:"100%",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},iconWrapper:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(239, 68, 68, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"},icon:{fontSize:"36px",color:"#ef4444"},title:{color:"#ffffff",fontSize:"24px",fontWeight:600,margin:"0 0 12px"},message:{color:"#94a3b8",fontSize:"14px",lineHeight:1.6,margin:"0 0 24px"},buttonGroup:{display:"flex",gap:"12px",justifyContent:"center"},primaryButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"transform 0.15s ease, box-shadow 0.15s ease"},secondaryButton:{background:"rgba(255,255,255,0.05)",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:500,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},inlineContainer:{display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",width:"100%",height:"100%",minHeight:"120px",background:"#0e1820"},inlineCard:{display:"flex",alignItems:"center",gap:"14px",background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:"12px",padding:"16px 20px",maxWidth:"420px",width:"100%"},inlineButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"8px 18px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",whiteSpace:"nowrap"}},et=`
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

  /* —— Mobile —— */
  @media (max-width: 480px) {
    .splash-title { font-size: 40px; letter-spacing: -0.5px; }
    .splash-tagline { font-size: 11px; letter-spacing: 3px; margin-bottom: 32px; }
    .splash-glow-orb { width: 220px; height: 220px; }
    .splash-loader { width: 200px; }
    .splash-film-frame { width: 76px; height: 62px; }
  }
`,tt=()=>{const t=re(),[e,r]=c.useState(0);c.useEffect(()=>{const d=[setTimeout(()=>r(1),500),setTimeout(()=>r(2),1500),setTimeout(()=>r(3),2200),setTimeout(()=>r(4),3e3),setTimeout(()=>r(5),5500),setTimeout(()=>t("/login"),6500)];return()=>d.forEach(clearTimeout)},[t]);const[i,n]=c.useState(0);c.useEffect(()=>{if(e>=4){const d=setInterval(()=>{n(l=>l>=100?(clearInterval(d),100):l+2)},40);return()=>clearInterval(d)}},[e]);const o=i<30?"Loading workspace...":i<70?"Preparing editor...":i<100?"Almost ready...":"Welcome!",u=[15,37,59];return s.jsxs("div",{className:"splash-root",children:[s.jsx("style",{children:et}),s.jsx("div",{className:"splash-grid"}),s.jsx("div",{className:`splash-curtain splash-curtain--top ${e>=2?"split":""}`,children:s.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),s.jsx("div",{className:`splash-curtain splash-curtain--bottom ${e>=2?"split":""}`,children:s.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),s.jsx("div",{className:`splash-scissors ${e>=1?"entering":"offscreen"} ${e>=3?"hidden":""}`,children:s.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),s.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),s.jsxs("line",{x1:"8.2",y1:"7.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[s.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),s.jsx("animate",{attributeName:"y2",values:"18;14;18",dur:"1.2s",repeatCount:"indefinite"})]}),s.jsxs("line",{x1:"8.2",y1:"16.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[s.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),s.jsx("animate",{attributeName:"y2",values:"6;10;6",dur:"1.2s",repeatCount:"indefinite"})]}),s.jsxs("circle",{cx:"13",cy:"12",r:"1",fill:"#75AADB",opacity:e>=1?"1":"0",children:[s.jsx("animate",{attributeName:"r",values:"0.5;2;0.5",dur:"0.8s",repeatCount:"indefinite"}),s.jsx("animate",{attributeName:"opacity",values:"1;0.3;1",dur:"0.8s",repeatCount:"indefinite"})]})]})}),e>=1&&e<3&&s.jsx("div",{className:"splash-sparks",children:[...Array(20)].map((d,l)=>s.jsx("div",{className:"splash-spark",style:{left:`${l*5}%`,animationDelay:`${l*.05}s`}},l))}),s.jsxs("div",{className:`splash-content ${e>=3?"visible":"hidden"}`,children:[s.jsx("div",{className:"splash-glow-orb"}),s.jsxs("div",{className:"splash-logo",children:[s.jsxs("div",{className:"splash-film-frame",children:[s.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",children:s.jsx("path",{d:"M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z",fill:"#75AADB"})}),u.map((d,l)=>s.jsx("div",{className:"splash-perf splash-perf--left",style:{top:`${d}px`}},`l${l}`)),u.map((d,l)=>s.jsx("div",{className:"splash-perf splash-perf--right",style:{top:`${d}px`}},`r${l}`))]}),s.jsx("div",{className:"splash-scissors-badge",children:s.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",children:[s.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),s.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),s.jsx("line",{x1:"8.5",y1:"7.5",x2:"20",y2:"18",stroke:"white",strokeWidth:"2",strokeLinecap:"round"}),s.jsx("line",{x1:"8.5",y1:"16.5",x2:"20",y2:"6",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})})]}),s.jsx("h1",{className:"splash-title",children:"ClipCut"}),s.jsx("p",{className:"splash-tagline",children:"Professional Video Suite"}),s.jsxs("div",{className:`splash-loader ${e>=4?"visible":"hidden"}`,children:[s.jsx("div",{className:"splash-loader-track",children:s.jsx("div",{className:"splash-loader-fill",style:{width:`${i}%`}})}),s.jsxs("div",{className:"splash-loader-row",children:[s.jsx("span",{className:"splash-loader-status",children:o}),s.jsxs("span",{className:"splash-loader-pct",children:[i,"%"]})]})]})]}),s.jsx("div",{className:"splash-footer",style:{opacity:e>=4?.4:0},children:s.jsx("span",{className:"splash-footer-text",children:"© 2026 ClipCut • Bokas Technologies (Pty) Ltd"})}),s.jsxs("div",{className:"splash-bw-stripe",style:{opacity:e>=4?1:0},children:[s.jsx("div",{style:{flex:1,background:"#75AADB"}}),s.jsx("div",{style:{flex:.3,background:"white"}}),s.jsx("div",{style:{flex:1,background:"#0d0d0d"}}),s.jsx("div",{style:{flex:.3,background:"white"}}),s.jsx("div",{style:{flex:1,background:"#75AADB"}})]})]})},st=6e4;function rt(t=st){const{session:e,refreshSession:r,signOut:i}=K(),[n,o]=c.useState(!1),[u,d]=c.useState(0),l=c.useRef(!1),p=c.useMemo(()=>e?.expires_at?(l.current=!1,e.expires_at*1e3):null,[e?.expires_at]);return c.useEffect(()=>{if(!p){o(!1),d(0);return}const a=()=>{const E=p-Date.now();d(Math.max(0,E)),E<=t&&E>0&&o(!0),E<=0&&!l.current&&(l.current=!0,o(!1),i())};a();const j=window.setInterval(a,1e3);return()=>window.clearInterval(j)},[p,t,i]),{showWarning:n,timeRemainingMs:u,extendSession:async()=>{const a=await r();return a&&o(!1),a},logoutNow:i}}const Kt=3e4,nt=3e3,Xt=640,Zt=768,Qt=2700,es=300,ts=5;function it(t={}){const{immediate:e=!1,onNeedRefresh:r,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=t;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await g(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/clipcut/sw.js",{scope:"/clipcut/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||i?.()}),d.register({immediate:e}).then(a=>{o?o("/clipcut/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}function ot(t={}){const{immediate:e=!0,onNeedRefresh:r,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=t,[d,l]=c.useState(!1),[p,f]=c.useState(!1),[a]=c.useState(()=>it({immediate:e,onOfflineReady(){f(!0),i?.()},onNeedRefresh(){l(!0),r?.()},onRegistered:n,onRegisteredSW:o,onRegisterError:u}));return{needRefresh:[d,l],offlineReady:[p,f],updateServiceWorker:a}}const at={position:"fixed",bottom:"72px",left:"50%",transform:"translateX(-50%)",zIndex:10001,background:"#1a2332",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"10px",padding:"10px 16px",display:"flex",alignItems:"center",gap:"12px",boxShadow:"0 8px 24px rgba(0,0,0,0.4)",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.85)",maxWidth:"calc(100vw - 32px)"},lt={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"6px 14px",fontWeight:700,fontSize:"12px",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"},ct={background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",padding:"4px",lineHeight:1,fontSize:"18px",fontFamily:"Material Symbols Outlined"},dt=()=>{const{needRefresh:[t,e],updateServiceWorker:r}=ot();return t?s.jsxs("div",{style:at,role:"alert",children:[s.jsx("span",{children:"New version available"}),s.jsx("button",{style:lt,onClick:()=>r(!0),children:"Reload"}),s.jsx("button",{style:ct,onClick:()=>e(!1),"aria-label":"Dismiss update notification",children:"close"})]}):null},ut=4500;let pt=1,A=[];const J=new Set,ue=()=>{A=[...A],J.forEach(t=>t())},ft=t=>(J.add(t),()=>J.delete(t)),te=()=>A,X=t=>{A=A.filter(e=>e.id!==t),ue()},Y=(t,e,r={})=>{const i=pt++,n=r.duration??ut;return A=[...A,{id:i,message:String(t),type:e}],ue(),n>0&&setTimeout(()=>X(i),n),i},ss={error:(t,e)=>Y(t,"error",e),success:(t,e)=>Y(t,"success",e),info:(t,e)=>Y(t,"info",e),dismiss:X},B={error:{border:"rgba(229, 99, 99, 0.45)",accent:"#e56363",icon:"error"},success:{border:"rgba(117, 170, 219, 0.45)",accent:"#75AADB",icon:"check_circle"},info:{border:"rgba(117, 170, 219, 0.35)",accent:"#75AADB",icon:"info"}},ht={position:"fixed",top:"16px",right:"16px",zIndex:10002,display:"flex",flexDirection:"column",gap:"10px",pointerEvents:"none",maxWidth:"calc(100vw - 32px)",fontFamily:"'Spline Sans', sans-serif"},gt=t=>({pointerEvents:"auto",background:"#1a2332",border:`1px solid ${B[t].border}`,borderLeft:`3px solid ${B[t].accent}`,borderRadius:"10px",padding:"12px 14px 12px 12px",display:"flex",alignItems:"flex-start",gap:"10px",boxShadow:"0 8px 24px rgba(0,0,0,0.45)",fontSize:"13px",color:"rgba(255,255,255,0.9)",minWidth:"260px",maxWidth:"380px",animation:"clipcutToastIn 180ms ease-out"}),mt=t=>({fontFamily:"Material Symbols Outlined",color:B[t].accent,fontSize:"20px",lineHeight:1,flexShrink:0,marginTop:"1px"}),xt={flex:1,whiteSpace:"pre-wrap",wordBreak:"break-word",lineHeight:1.4},bt={background:"none",border:"none",color:"rgba(255,255,255,0.45)",cursor:"pointer",padding:"0 0 0 4px",lineHeight:1,fontSize:"18px",fontFamily:"Material Symbols Outlined",flexShrink:0},yt=()=>{const t=c.useSyncExternalStore(ft,te,te);return c.useEffect(()=>{if(typeof document>"u"||document.getElementById("clipcut-toast-keyframes"))return;const e=document.createElement("style");e.id="clipcut-toast-keyframes",e.textContent="@keyframes clipcutToastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }",document.head.appendChild(e)},[]),t.length===0?null:s.jsx("div",{style:ht,"aria-live":"polite","aria-atomic":"false",children:t.map(e=>s.jsxs("div",{style:gt(e.type),role:e.type==="error"?"alert":"status",children:[s.jsx("span",{style:mt(e.type),"aria-hidden":"true",children:B[e.type].icon}),s.jsx("span",{style:xt,children:e.message}),s.jsx("button",{type:"button",style:bt,onClick:()=>X(e.id),"aria-label":"Dismiss notification",children:"close"})]},e.id))})},wt=c.lazy(()=>g(()=>import("./C65dIe34.js"),__vite__mapDeps([0,1,2,3]))),vt=c.lazy(()=>g(()=>import("./BM6ref50.js"),__vite__mapDeps([4,1,5,6,7,2,3]))),Et=c.lazy(()=>g(()=>import("./CntziRaa.js"),__vite__mapDeps([8,1,5,6,7,2,9,3]))),St=c.lazy(()=>g(()=>import("./ZqKg7pge.js"),__vite__mapDeps([10,1,5,6,7,2,9,3]))),_t=c.lazy(()=>g(()=>import("./CZM3IKvX.js"),__vite__mapDeps([11,1,5,7,3]))),jt=c.lazy(()=>g(()=>import("./CEZq7q6x.js"),__vite__mapDeps([12,1,6,13,2,3]))),kt=c.lazy(()=>g(()=>import("./B_2ha73-.js"),__vite__mapDeps([14,1,2,3]))),At=c.lazy(()=>g(()=>import("./DAK9aSbt.js"),__vite__mapDeps([15,1,2,3]))),Tt=c.lazy(()=>g(()=>import("./CBFRehj_.js"),__vite__mapDeps([16,1,17,18,6,7,13,3]))),Rt=c.lazy(()=>g(()=>import("./CAVrsK0Z.js").then(t=>t.V),__vite__mapDeps([19,1,6,17,20,18,7,13,21]))),It=c.lazy(()=>g(()=>import("./DOuFuAYi.js"),__vite__mapDeps([22,1,20,3]))),Lt=c.lazy(()=>g(()=>import("./BOBGO_ZO.js"),__vite__mapDeps([23,1,2,3]))),Pt=c.lazy(()=>g(()=>import("./D1T_bejs.js"),__vite__mapDeps([24,1,18,6,7,21,3]))),Ot=()=>s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",backgroundColor:"#0a0a0a",color:"#75AADB",fontFamily:"Spline Sans, sans-serif"},children:s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[s.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117, 170, 219, 0.2)",borderTopColor:"#75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),s.jsx("span",{style:{fontSize:"14px",opacity:.8},children:"Loading..."}),s.jsx("style",{children:`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}),Ct=()=>{const[t,e]=c.useState(!navigator.onLine);return c.useEffect(()=>Qe(({online:r})=>e(!r)),[]),t?s.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e4,background:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",fontWeight:600,color:"white"},children:[s.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"cloud_off"}),"You're offline. Some features may be unavailable."]}):null},Nt=()=>{const{showWarning:t,timeRemainingMs:e,extendSession:r,logoutNow:i}=rt();if(!t)return null;const n=Math.max(1,Math.ceil(e/1e3));return s.jsxs("div",{style:{position:"fixed",top:"12px",right:"12px",zIndex:9999,background:"rgba(15,20,30,0.95)",border:"1px solid rgba(245, 158, 11, 0.6)",borderRadius:"10px",padding:"12px",width:"min(380px, calc(100vw - 24px))",boxShadow:"0 8px 24px rgba(0,0,0,0.35)"},children:[s.jsxs("p",{style:{color:"#f59e0b",margin:"0 0 10px",fontSize:"13px",fontWeight:700},children:["Your session is about to expire (",n,"s)"]}),s.jsxs("div",{style:{display:"flex",gap:"8px"},children:[s.jsx("button",{onClick:r,style:Mt,children:"Stay signed in"}),s.jsx("button",{onClick:i,style:zt,children:"Sign out"})]})]})},Dt=()=>{const[t,e]=c.useState(!0),r=re(),i=me(),n=c.useRef(!1);return c.useEffect(()=>{n.current||(Fe(),n.current=!0)},[]),c.useEffect(()=>Ye(),[]),c.useEffect(()=>{t||(L.measurePageLoad(i.pathname),Be(i.pathname),We(ce.pageView,{path:i.pathname}))},[i.pathname,t]),c.useEffect(()=>{const o=setTimeout(()=>{e(!1)},nt);return()=>clearTimeout(o)},[]),t?s.jsx(tt,{}):s.jsxs(s.Fragment,{children:[s.jsx(Ct,{}),s.jsx(Nt,{}),s.jsx(dt,{}),s.jsx(yt,{}),s.jsx(c.Suspense,{fallback:s.jsx(Ot,{}),children:s.jsxs(xe,{children:[s.jsx(y,{path:"/",element:s.jsx(M,{children:s.jsx(x,{name:"landing",message:"Landing page failed to load",onReset:()=>r("/"),children:s.jsx(wt,{})})})}),s.jsx(y,{path:"/login",element:s.jsx(M,{children:s.jsx(x,{name:"login",message:"Login failed to load",onReset:()=>r("/login"),children:s.jsx(vt,{onNavigateToRegister:()=>r("/register")})})})}),s.jsx(y,{path:"/register",element:s.jsx(M,{children:s.jsx(x,{name:"register",message:"Registration failed to load",onReset:()=>r("/register"),children:s.jsx(Et,{onNavigateToLogin:()=>r("/login")})})})}),s.jsx(y,{path:"/reset-password",element:s.jsx(M,{children:s.jsx(x,{name:"reset-password",message:"Password reset failed to load",onReset:()=>r("/reset-password"),children:s.jsx(St,{})})})}),s.jsx(y,{path:"/verify-email",element:s.jsx(S,{children:s.jsx(x,{name:"verify-email",message:"Email verification failed to load",onReset:()=>r("/verify-email"),children:s.jsx(_t,{})})})}),s.jsx(y,{path:"/onboarding/1",element:s.jsx(S,{children:s.jsx(x,{name:"onboarding",onReset:()=>r("/onboarding/1"),children:s.jsx(jt,{onContinue:()=>r("/onboarding/2"),onSkip:()=>r("/onboarding/2"),onSkipAll:()=>r("/dashboard")})})})}),s.jsx(y,{path:"/onboarding/2",element:s.jsx(S,{children:s.jsx(x,{name:"onboarding",onReset:()=>r("/onboarding/2"),children:s.jsx(kt,{onContinue:()=>r("/onboarding/3"),onSkip:()=>r("/onboarding/3"),onSkipAll:()=>r("/dashboard")})})})}),s.jsx(y,{path:"/onboarding/3",element:s.jsx(S,{children:s.jsx(x,{name:"onboarding",onReset:()=>r("/onboarding/3"),children:s.jsx(At,{onComplete:()=>r("/dashboard"),onSkip:()=>r("/dashboard")})})})}),s.jsx(y,{path:"/dashboard",element:s.jsx(S,{children:s.jsx(x,{name:"dashboard",message:"Dashboard failed to load",onReset:()=>r("/dashboard"),children:s.jsx(Tt,{})})})}),s.jsx(y,{path:"/editor",element:s.jsx(S,{children:s.jsx(x,{name:"editor",message:"Video editor encountered an error",onReset:()=>r("/editor"),children:s.jsx(Rt,{})})})}),s.jsx(y,{path:"/long-to-shorts",element:s.jsx(S,{children:s.jsx(x,{name:"long-to-shorts",message:"AI Shorts feature encountered an error",onReset:()=>r("/long-to-shorts"),children:s.jsx(It,{})})})}),s.jsx(y,{path:"/templates",element:s.jsx(S,{children:s.jsx(x,{name:"templates",message:"Template library failed to load",onReset:()=>r("/templates"),children:s.jsx(Lt,{})})})}),s.jsx(y,{path:"/settings",element:s.jsx(S,{children:s.jsx(x,{name:"settings",message:"Settings failed to load",onReset:()=>r("/settings"),children:s.jsx(Pt,{})})})})]})})]})},Mt={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"8px 10px",fontWeight:700,cursor:"pointer"},zt={background:"transparent",color:"rgba(255,255,255,0.75)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"6px",padding:"8px 10px",fontWeight:600,cursor:"pointer"},Vt="/clipcut/".replace(/\/$/,"")||void 0,Ft=()=>s.jsx(x,{children:s.jsx(Re,{children:s.jsx(ge,{basename:Vt,children:s.jsx(Dt,{})})})});function Bt(t={}){const{immediate:e=!1,onNeedRefresh:r,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=t;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await g(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/clipcut/sw.js",{scope:"/clipcut/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||i?.()}),d.register({immediate:e}).then(a=>{o?o("/clipcut/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}Me();Ve();Bt({onNeedRefresh(){C.info("[PWA] New content available, refresh to update")},onOfflineReady(){C.info("[PWA] App ready to work offline")},onRegistered(t){C.info("[PWA] Service worker registered"),t&&setInterval(()=>{t.update()},60*60*1e3)},onRegisterError(t){C.error("[PWA] Service worker registration failed",{error:t})}});be.createRoot(document.getElementById("root")).render(s.jsx(ye.StrictMode,{children:s.jsx(Ft,{})}));export{Kt as A,ts as D,x as E,Xt as M,Qt as T,g as _,ze as a,ce as b,H as c,ss as d,D as e,es as f,qt as g,Zt as h,de as i,Yt as j,b as k,C as l,Gt as m,Ht as n,Jt as r,I as s,We as t,K as u};
