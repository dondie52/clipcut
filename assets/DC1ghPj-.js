const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DZDZVY5q.js","assets/DwQPoapS.js","assets/D8AsaMNA.js","assets/DZxFKcQQ.js","assets/DBS4q8gQ.js","assets/mogqgWn5.js","assets/Et-wlZO3.js","assets/B9CjrYEi.js","assets/Cy5fBrdR.js","assets/Cf6dk1K3.js","assets/DB7FMbsc.js","assets/C5fDje6g.js","assets/C-xr2qAH.js","assets/BROpGFVb.js","assets/CUSkrBOK.js","assets/Bkss9eJq.js","assets/D3gP8wkb.js","assets/CgjRGNC3.js","assets/D6pDGRYJ.js","assets/2OOlEvpx.js","assets/Bz2nI5Pb.js","assets/C2IN7YFz.js","assets/7hRhs4cM.js","assets/CrFPy8FH.js"])))=>i.map(i=>d[i]);
var oe=Object.defineProperty;var ae=(s,e,r)=>e in s?oe(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var H=(s,e,r)=>ae(s,typeof e!="symbol"?e+"":e,r);import{r as c,j as t,N as K,u as X,B as le,a as ce,R as de,b as y,c as ue,d as pe}from"./DwQPoapS.js";import{c as fe}from"./DZxFKcQQ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const he="modulepreload",ge=function(s){return"/clipcut/"+s},q={},g=function(e,r,i){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),d=u?.nonce||u?.getAttribute("nonce");n=Promise.allSettled(r.map(l=>{if(l=ge(l),l in q)return;q[l]=!0;const p=l.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const a=document.createElement("link");if(a.rel=p?"stylesheet":he,p||(a.as="script"),a.crossOrigin="",a.href=l,d&&a.setAttribute("nonce",d),document.head.appendChild(a),p)return new Promise((j,E)=>{a.addEventListener("load",j),a.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(u){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=u,window.dispatchEvent(d),!d.defaultPrevented)throw u}return n.then(u=>{for(const d of u||[])d.status==="rejected"&&o(d.reason);return e().catch(o)})},Z=`https://xmdwwaxpktwukksmzkwy.supabase.co

`,Q="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZHd3YXhwa3R3dWtrc216a3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTM3NDUsImV4cCI6MjA4NzE2OTc0NX0.OlwyZ91ATRZ_gJG9WkuvC8nWMtYoVqnyrvkYsw0cGrs";function me(s){try{const e=new URL(s);return e.protocol!=="https:"?!1:e.protocol==="https:"||e.protocol==="http:"}catch{return!1}}function xe(s){const e=s.split(".");if(e.length!==3)return!1;const r=/^[A-Za-z0-9_-]+$/;return e.every(i=>i.length>0&&r.test(i))}const k=[];me(Z)||k.push("VITE_SUPABASE_URL is not a valid URL");xe(Q)||k.push("VITE_SUPABASE_ANON_KEY is not a valid Supabase key format");if(k.length>0){const s=`Supabase configuration error:
`+k.map(e=>`  - ${e}`).join(`
`)+`

Please copy env.example to .env and fill in your credentials.`;throw new Error(s)}const be="http://127.0.0.1:54321",ye="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjowfQ.invalid",we=k.length===0?Z:be,ve=k.length===0?Q:ye,T=fe(we,ve,{auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"pkce"},global:{headers:{"X-Client-Info":"clipcut-web"}}});function N(){return k.length===0}const B={INACTIVITY_TIMEOUT_MS:30*60*1e3,TOKEN_REFRESH_BUFFER_MS:5*60*1e3,VALIDATION_INTERVAL_MS:60*1e3},ee=c.createContext({user:null,session:null,loading:!0,signOut:async()=>{},refreshSession:async()=>{},isSessionValid:!1});function Ee({children:s}){const[e,r]=c.useState(null),[i,n]=c.useState(null),[o,u]=c.useState(!0),[d,l]=c.useState(!1),p=c.useRef(Date.now()),f=c.useRef(null),a=c.useRef(null),j=c.useCallback(h=>{if(!h?.expires_at)return!1;const m=h.expires_at*1e3,R=Date.now();return m-R<B.TOKEN_REFRESH_BUFFER_MS},[]),E=c.useCallback(async()=>{if(!N())return l(!1),!1;try{const{data:{session:h},error:m}=await T.auth.getSession();if(m)return console.warn("Session validation error:",m.message),l(!1),!1;if(!h)return l(!1),!1;if(j(h)){const{data:{session:R},error:w}=await T.auth.refreshSession();if(w)return console.warn("Session refresh failed:",w.message),l(!1),!1;R&&(n(R),r(R.user))}return l(!0),!0}catch(h){return console.warn("Session validation failed:",h),l(!1),!1}},[j]),L=c.useCallback(async()=>{f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current);try{N()&&await T.auth.signOut()}catch(h){console.warn("Sign out error:",h)}r(null),n(null),l(!1)},[]),C=c.useRef(i);c.useEffect(()=>{C.current=i},[i]);const A=c.useCallback(()=>{p.current=Date.now(),f.current&&clearTimeout(f.current),C.current&&(f.current=setTimeout(async()=>{console.info("Session expired due to inactivity"),await L()},B.INACTIVITY_TIMEOUT_MS))},[L]),ie=c.useCallback(async()=>{if(!N())return l(!1),!1;try{const{data:{session:h},error:m}=await T.auth.refreshSession();if(m)throw m;return h?(n(h),r(h.user),l(!0),!0):!1}catch(h){return console.warn("Manual session refresh failed:",h),l(!1),!1}},[]);return c.useEffect(()=>{let h=!0;if(!N())return u(!1),l(!1),()=>{h=!1};let m;return(async()=>{try{const{data:{session:w}}=await T.auth.getSession();if(!h)return;n(w),r(w?.user??null),l(!!w),w&&A()}catch(w){if(!h)return;console.warn("Initial session lookup failed:",w),n(null),r(null),l(!1)}finally{h&&u(!1)}})(),{data:{subscription:m}}=T.auth.onAuthStateChange((w,F)=>{if(h)switch(n(F),r(F?.user??null),l(!!F),u(!1),w){case"SIGNED_IN":A();break;case"SIGNED_OUT":f.current&&clearTimeout(f.current);break;case"TOKEN_REFRESHED":l(!0);break}}),()=>{h=!1,m?.unsubscribe(),f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current)}},[A]),c.useEffect(()=>{if(!i)return;const h=["mousedown","keydown","scroll","touchstart"];return h.forEach(m=>{window.addEventListener(m,A,{passive:!0})}),()=>{h.forEach(m=>{window.removeEventListener(m,A)})}},[i,A]),c.useEffect(()=>{if(i)return a.current=setInterval(()=>{E()},B.VALIDATION_INTERVAL_MS),()=>{a.current&&clearInterval(a.current)}},[i,E]),t.jsx(ee.Provider,{value:{user:e,session:i,loading:o,signOut:L,refreshSession:ie,isSessionValid:d},children:s})}function G(){const s=c.useContext(ee);if(!s)throw new Error("useAuth must be used within an AuthProvider");return s}const te=()=>t.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Spline Sans', sans-serif"},children:[t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117,170,219,0.2)",borderTop:"3px solid #75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}),t.jsx("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:"Loading..."})]}),t.jsx("style",{children:`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `})]});function _({children:s}){const{user:e,loading:r}=G();return r?t.jsx(te,{}):e?s:t.jsx(K,{to:"/login",replace:!0})}function D({children:s}){const{user:e,loading:r}=G();return r?t.jsx(te,{}):e?t.jsx(K,{to:"/dashboard",replace:!0}):s}const b={LCP:"lcp",FID:"fid",CLS:"cls",FCP:"fcp",TTFB:"ttfb",PAGE_LOAD:"page_load",ROUTE_CHANGE:"route_change",VIDEO_TRIM:"video_trim",VIDEO_SPLIT:"video_split",VIDEO_MERGE:"video_merge",VIDEO_EXPORT:"video_export",VIDEO_THUMBNAIL:"video_thumbnail",VIDEO_PREVIEW:"video_preview",API_REQUEST:"api_request",API_UPLOAD:"api_upload",API_DOWNLOAD:"api_download",USER_INTERACTION:"user_interaction"},_e={LCP:{good:2500,needsImprovement:4e3},FID:{good:100,needsImprovement:300},CLS:{good:.1,needsImprovement:.25},FCP:{good:1800,needsImprovement:3e3},TTFB:{good:800,needsImprovement:1800},PAGE_LOAD:{good:3e3,needsImprovement:5e3},VIDEO_TRIM:{good:3e4,needsImprovement:6e4},VIDEO_EXPORT:{good:12e4,needsImprovement:24e4}};function Se(s,e){const r=_e[s];return r?e<=r.good?"good":e<=r.needsImprovement?"needs-improvement":"poor":"unknown"}class je{constructor(){this.metrics=[],this.observers=new Map,this.isEnabled=typeof window<"u"&&"PerformanceObserver"in window,this.isEnabled&&this.initCoreWebVitals()}initCoreWebVitals(){try{const e=new PerformanceObserver(r=>{const i=r.getEntries(),n=i[i.length-1];this.recordMetric(b.LCP,n.renderTime||n.loadTime,{element:n.element?.tagName||"unknown",url:n.url||""})});e.observe({entryTypes:["largest-contentful-paint"]}),this.observers.set("lcp",e)}catch(e){console.warn("[Performance] LCP observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{this.recordMetric(b.FID,n.processingStart-n.startTime,{eventType:n.name,target:n.target?.tagName||"unknown"})})});e.observe({entryTypes:["first-input"]}),this.observers.set("fid",e)}catch(e){console.warn("[Performance] FID observer not supported:",e)}try{let e=0;const r=new PerformanceObserver(i=>{const n=i.getEntries();n.forEach(o=>{o.hadRecentInput||(e+=o.value)}),this.recordMetric(b.CLS,e,{sources:n.length})});r.observe({entryTypes:["layout-shift"]}),this.observers.set("cls",r)}catch(e){console.warn("[Performance] CLS observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{n.name==="first-contentful-paint"&&this.recordMetric(b.FCP,n.startTime,{})})});e.observe({entryTypes:["paint"]}),this.observers.set("fcp",e)}catch(e){console.warn("[Performance] FCP observer not supported:",e)}try{const e=new PerformanceObserver(r=>{r.getEntries().forEach(n=>{if(n.entryType==="navigation"){const o=n.responseStart-n.requestStart;this.recordMetric(b.TTFB,o,{url:n.name})}})});e.observe({entryTypes:["navigation"]}),this.observers.set("ttfb",e)}catch(e){console.warn("[Performance] TTFB observer not supported:",e)}}recordMetric(e,r,i={}){if(!this.isEnabled)return;const n={type:e,value:r,rating:Se(e,r),timestamp:Date.now(),url:typeof window<"u"?window.location.pathname:"",userAgent:typeof navigator<"u"?navigator.userAgent:"",...i};this.metrics.push(n),this.metrics.length>100&&this.metrics.shift(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("performance-metric",{detail:n}))}startTiming(e,r,i={}){const n=performance.now(),o=`perf_${e}_start`;return this.isEnabled&&performance.mark(o),(u={})=>{const l=performance.now()-n,p=`perf_${e}_end`;return this.isEnabled&&(performance.mark(p),performance.measure(`perf_${e}`,o,p)),this.recordMetric(r,l,{...i,...u,operationId:e}),l}}measurePageLoad(e){!this.isEnabled||typeof window>"u"||window.addEventListener("load",()=>{const r=performance.getEntriesByType("navigation")[0];if(r){const i=r.loadEventEnd-r.fetchStart;this.recordMetric(b.PAGE_LOAD,i,{route:e,domContentLoaded:r.domContentLoadedEventEnd-r.fetchStart,domInteractive:r.domInteractive-r.fetchStart})}},{once:!0})}measureRouteChange(e,r,i){this.recordMetric(b.ROUTE_CHANGE,i,{fromRoute:e,toRoute:r})}getMetrics(e=null){return e?this.metrics.filter(r=>r.type===e):[...this.metrics]}getSummary(){const e={};return Object.values(b).forEach(r=>{const i=this.metrics.filter(n=>n.type===r);if(i.length>0){const n=i.map(o=>o.value);e[r]={count:i.length,avg:n.reduce((o,u)=>o+u,0)/n.length,min:Math.min(...n),max:Math.max(...n),latest:i[i.length-1]}}}),e}clear(){this.metrics=[]}cleanup(){this.observers.forEach(e=>{try{e.disconnect()}catch{}}),this.observers.clear()}}const I=new je;async function Tt(s,e,r={}){const i=`${s}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=I.startTiming(i,s,{...r,operation:s});try{const o=await e();return n({success:!0}),o}catch(o){throw n({success:!1,error:o.message}),o}}async function It(s,e,r={}){const i=`api_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=I.startTiming(i,b.API_REQUEST,{endpoint:s,...r});try{const o=await e();return n({success:!0}),o}catch(o){throw n({success:!1,error:o.message,statusCode:o.status}),o}}async function Lt(s,e,r,i={}){const n=`upload_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,o=I.startTiming(n,b.API_UPLOAD,{filename:s,fileSize:e,...i});try{const u=await r(),d=o({success:!0}),l=e/(d/1e3);return I.recordMetric(b.API_UPLOAD,d,{filename:s,fileSize:e,speed:l,...i}),u}catch(u){throw o({success:!1,error:u.message}),u}}typeof window<"u"&&I.measurePageLoad(window.location.pathname);const U={debug:10,info:20,warn:30,error:40},ke="info",J=void 0,se=U[J]?J:ke,Ae=s=>s?{name:s.name,message:s.message,stack:s.stack}:null,M=(s,e,r={})=>({timestamp:new Date().toISOString(),level:s,message:e,app:"clipcut",env:"production",metadata:{...r,error:r.error instanceof Error?Ae(r.error):r.error}}),V=s=>U[s]>=U[se],z=s=>{const e=JSON.stringify(s);if(s.level==="error"){console.error(e);return}if(s.level==="warn"){console.warn(e);return}if(s.level==="debug"){console.debug(e);return}console.log(e)},O={level:se,debug(s,e){V("debug")&&z(M("debug",s,e))},info(s,e){V("info")&&z(M("info",s,e))},warn(s,e){V("warn")&&z(M("warn",s,e))},error(s,e){V("error")&&z(M("error",s,e))}},S=()=>{},Re={setTag:S,setExtra:S,setLevel:S,setFingerprint:S};let Te={init:S,withScope:s=>s(Re),captureException:S,captureMessage:S,setUser:S,addBreadcrumb:S};async function Ie(){{console.warn("[ErrorTracking] Sentry DSN not configured. Error tracking disabled.");return}}function $(s,e={}){{console.error("[ErrorTracking] Error captured but Sentry not configured:",s);return}}function Le(s){Te.addBreadcrumb({timestamp:Date.now()/1e3,...s})}function Pe(){window.onerror=(s,e,r,i,n)=>($(n||new Error(s),{}),!1),window.addEventListener("unhandledrejection",s=>{const e=s.reason instanceof Error?s.reason:new Error(String(s.reason));$(e,{extra:{reason:s.reason}})}),console.log("[ErrorTracking] Global error handlers set up")}async function Oe(){{console.warn("[Analytics] GA Measurement ID not configured. Analytics disabled.");return}}function Ce(s,e){Y(re.pageView,{})}function Ne(s,e,r,i){typeof e=="object"&&e!==null&&!Array.isArray(e)?Y(s,e):typeof e=="string"||Y(s,{})}async function Y(s,e={}){}const re={pageView:"page_view",coreWebVital:"core_web_vital",loginAttempt:"login_attempt",loginSuccess:"login_success",loginFailure:"login_failure",passwordResetRequested:"password_reset_requested",registerAttempt:"register_attempt",registerSuccess:"register_success",registerFailure:"register_failure",googleSignInAttempt:"google_sign_in_attempt",onboardingStart:"onboarding_start",onboardingContinue:"onboarding_continue",onboardingSkip:"onboarding_skip",onboardingComplete:"onboarding_complete",dashboardNewProjectClick:"dashboard_new_project_click",dashboardFileImport:"dashboard_file_import",dashboardProjectOpen:"dashboard_project_open",dashboardProjectDelete:"dashboard_project_delete",dashboardAIFeatureSelect:"dashboard_ai_feature_select",dashboardToolSelect:"dashboard_tool_select"},De=new Set([b.LCP,b.FID,b.CLS]);let P=null;async function Me(s){}function Ve(){if(typeof window>"u")return()=>{};if(P)return P;const s=e=>{const r=e.detail;!r||!De.has(r.type)||(r.type,Number(r.value),r.rating,r.timestamp||Date.now(),Me())};return window.addEventListener("performance-metric",s),P=()=>{window.removeEventListener("performance-metric",s),P=null},P}function ne(s){if(!s)return!1;const e=(s.message||"").toLowerCase();return e.includes("failed to fetch")||e.includes("network request failed")||e.includes("networkerror")||e.includes("net::err_")||e.includes("load failed")||e.includes("network error")||e.includes("econnrefused")||e.includes("econnreset")||e.includes("etimedout")||s.name==="TypeError"&&e.includes("fetch")||!navigator.onLine}function ze(s){if(!s)return!1;const e=(s.message||"").toLowerCase(),r=s.status||s.statusCode;return r===401||r===403||e.includes("jwt expired")||e.includes("invalid token")||e.includes("token expired")||e.includes("refresh_token")||e.includes("not authenticated")||e.includes("invalid credentials")||e.includes("invalid login")||e.includes("email not confirmed")||e.includes("session expired")||e.includes("unauthorized")}function Fe(s){if(!s)return!1;const e=(s.message||"").toLowerCase();return e.includes("ffmpeg")||e.includes("wasm")||e.includes("sharedarraybuffer")||e.includes("out of memory")||e.includes("oom")||e.includes("memory access out of bounds")||e.includes("cross-origin isolation")}function Be(s){if(!s)return!1;const e=(s.message||"").toLowerCase();return e.includes("upload")||e.includes("file too large")||e.includes("file type not allowed")||e.includes("storage")||e.includes("bucket")||e.includes("quota exceeded")||s.name==="AbortError"}function We(s){if(!s)return!1;if(ne(s))return!0;const e=s.status||s.statusCode;if(e>=500&&e<600||e===429)return!0;const r=(s.message||"").toLowerCase();return!!(r.includes("timeout")||r.includes("timed out"))}const Ue={"invalid login credentials":"Incorrect email or password. Please try again.","email not confirmed":"Please verify your email address before signing in. Check your inbox.","user already registered":"An account with this email already exists. Try signing in instead.","signup disabled":"Registration is currently unavailable. Please try again later.","email rate limit exceeded":"Too many attempts. Please wait a few minutes before trying again.","invalid email":"Please enter a valid email address.","weak password":"Your password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.","jwt expired":"Your session has expired. Please sign in again.",refresh_token_not_found:"Your session has expired. Please sign in again.","invalid token":"Your session is no longer valid. Please sign in again.","user not found":"No account found with this email address.",popup_closed_by_user:"Sign-in was cancelled. Please try again.",oauth_error:"Authentication service error. Please try again."},$e={sharedarraybuffer:"Your browser does not support video processing. Try using Chrome or Edge.","cross-origin isolation":"Video processing requires special browser settings. Try refreshing the page.","out of memory":"The video is too large to process in your browser. Try a shorter clip or lower resolution.","memory access out of bounds":"Video processing ran out of memory. Try closing other tabs and retry.",wasm:"Failed to load the video engine. Please refresh the page.",ffmpeg:"Video processing failed. Please try again with a different file."},Ye={"file too large":"This file exceeds the maximum upload size (500 MB). Try compressing or trimming it first.","file type not allowed":"This file format is not supported. Accepted formats: MP4, WebM, MOV, AVI, MP3, WAV, JPEG, PNG.","quota exceeded":"Storage is full. Delete some old projects to free up space.","bucket not found":"Cloud storage is temporarily unavailable. Please try again later."};function Pt(s,e){if(!s)return"An unexpected error occurred. Please try again.";const r=typeof s=="string"?s:s.message||"",i=r.toLowerCase();if(ne(typeof s=="string"?new Error(s):s)||!navigator.onLine)return"Unable to connect. Please check your internet connection and try again.";if(e==="auth"||ze(typeof s=="string"?new Error(s):s)){for(const[n,o]of Object.entries(Ue))if(i.includes(n))return o;return i.includes("locked")||i.includes("lockout")?r:"Authentication failed. Please try again."}if(e==="ffmpeg"||Fe(typeof s=="string"?new Error(s):s)){for(const[n,o]of Object.entries($e))if(i.includes(n))return o;return"Video processing failed. Please try a different file or refresh the page."}if(e==="upload"||Be(typeof s=="string"?new Error(s):s)){if(typeof s!="string"&&s.name==="AbortError")return"Upload was cancelled.";for(const[n,o]of Object.entries(Ye))if(i.includes(n))return o;return"Upload failed. Please check your connection and try again."}return e==="project"?i.includes("access denied")?"You do not have permission to access this project.":i.includes("not found")?"This project could not be found. It may have been deleted.":"Failed to save or load your project. Please try again.":i.includes("timeout")||i.includes("timed out")?"The request took too long. Please try again.":r.length<150&&!r.includes(`
`)&&!r.includes("  at ")?r:"Something went wrong. Please try again."}async function Ot(s,e={}){const{maxRetries:r=3,baseDelay:i=1e3,maxDelay:n=1e4,shouldRetry:o=We,onRetry:u,signal:d}=e;let l;for(let p=0;p<=r;p++){if(d?.aborted)throw new DOMException("Operation aborted","AbortError");try{return await s(p)}catch(f){if(l=f,f.name==="AbortError")throw f;if(p>=r||!o(f))break;const a=Math.min(i*Math.pow(2,p)+Math.random()*500,n);u&&u({error:f,attempt:p+1,delay:a}),await new Promise((j,E)=>{const L=setTimeout(j,a);if(d){const C=()=>{clearTimeout(L),E(new DOMException("Operation aborted","AbortError"))};d.addEventListener("abort",C,{once:!0})}})}}throw l}let W=[];function Ge(s){const e=()=>s({online:!0}),r=()=>s({online:!1});return window.addEventListener("online",e),window.addEventListener("offline",r),W.push({handleOnline:e,handleOffline:r}),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",r),W=W.filter(i=>i.handleOnline!==e)}}class x extends c.Component{constructor(r){super(r);H(this,"handleReset",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null,eventId:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,i){O.error("ErrorBoundary caught an error",{error:r,errorInfo:i}),this.setState({errorInfo:i}),Le({category:"error_boundary",message:`Error caught in "${this.props.name||"root"}": ${r.message}`,level:"error"}),$(r,{tags:{boundary:this.props.name||"root"},extra:{componentStack:i?.componentStack}})}render(){return this.state.hasError?this.props.fallback?this.props.fallback:this.props.renderFallback?this.props.renderFallback(this.state.error,this.handleReset):this.props.inline?t.jsx("div",{style:v.inlineContainer,children:t.jsxs("div",{style:v.inlineCard,children:[t.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"28px",color:"#ef4444"},children:"error_outline"}),t.jsxs("div",{style:{flex:1},children:[t.jsx("p",{style:{color:"#ffffff",fontSize:"14px",fontWeight:600,margin:"0 0 4px"},children:this.props.message||"This section encountered an error"}),t.jsx("p",{style:{color:"#94a3b8",fontSize:"12px",margin:0},children:"Try again or reload the page."})]}),t.jsx("button",{onClick:this.handleReset,style:v.inlineButton,children:"Retry"})]})}):t.jsx("div",{style:v.container,children:t.jsxs("div",{style:v.card,children:[t.jsx("div",{style:v.iconWrapper,children:t.jsx("span",{className:"material-symbols-outlined",style:v.icon,children:"error_outline"})}),t.jsx("h1",{style:v.title,children:this.props.message||"Something went wrong"}),t.jsx("p",{style:v.message,children:"We're sorry, but something unexpected happened. Please try refreshing the page or go back to the dashboard."}),!1,t.jsxs("div",{style:v.buttonGroup,children:[t.jsx("button",{onClick:this.handleReset,style:v.primaryButton,children:"Try Again"}),t.jsx("button",{onClick:()=>window.location.href="/dashboard",style:v.secondaryButton,children:"Go to Dashboard"})]})]})}):this.props.children}}const v={container:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",fontFamily:"'Spline Sans', sans-serif",padding:"20px"},card:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"48px",maxWidth:"480px",width:"100%",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},iconWrapper:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(239, 68, 68, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"},icon:{fontSize:"36px",color:"#ef4444"},title:{color:"#ffffff",fontSize:"24px",fontWeight:600,margin:"0 0 12px"},message:{color:"#94a3b8",fontSize:"14px",lineHeight:1.6,margin:"0 0 24px"},buttonGroup:{display:"flex",gap:"12px",justifyContent:"center"},primaryButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"transform 0.15s ease, box-shadow 0.15s ease"},secondaryButton:{background:"rgba(255,255,255,0.05)",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:500,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},inlineContainer:{display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",width:"100%",height:"100%",minHeight:"120px",background:"#0e1820"},inlineCard:{display:"flex",alignItems:"center",gap:"14px",background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:"12px",padding:"16px 20px",maxWidth:"420px",width:"100%"},inlineButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"8px 18px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",whiteSpace:"nowrap"}},He=`
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
`,qe=()=>{const s=X(),[e,r]=c.useState(0);c.useEffect(()=>{const d=[setTimeout(()=>r(1),500),setTimeout(()=>r(2),1500),setTimeout(()=>r(3),2200),setTimeout(()=>r(4),3e3),setTimeout(()=>r(5),5500),setTimeout(()=>s("/login"),6500)];return()=>d.forEach(clearTimeout)},[s]);const[i,n]=c.useState(0);c.useEffect(()=>{if(e>=4){const d=setInterval(()=>{n(l=>l>=100?(clearInterval(d),100):l+2)},40);return()=>clearInterval(d)}},[e]);const o=i<30?"Loading workspace...":i<70?"Preparing editor...":i<100?"Almost ready...":"Welcome!",u=[15,37,59];return t.jsxs("div",{className:"splash-root",children:[t.jsx("style",{children:He}),t.jsx("div",{className:"splash-grid"}),t.jsx("div",{className:`splash-curtain splash-curtain--top ${e>=2?"split":""}`,children:t.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),t.jsx("div",{className:`splash-curtain splash-curtain--bottom ${e>=2?"split":""}`,children:t.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),t.jsx("div",{className:`splash-scissors ${e>=1?"entering":"offscreen"} ${e>=3?"hidden":""}`,children:t.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),t.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),t.jsxs("line",{x1:"8.2",y1:"7.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[t.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"y2",values:"18;14;18",dur:"1.2s",repeatCount:"indefinite"})]}),t.jsxs("line",{x1:"8.2",y1:"16.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[t.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"y2",values:"6;10;6",dur:"1.2s",repeatCount:"indefinite"})]}),t.jsxs("circle",{cx:"13",cy:"12",r:"1",fill:"#75AADB",opacity:e>=1?"1":"0",children:[t.jsx("animate",{attributeName:"r",values:"0.5;2;0.5",dur:"0.8s",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"opacity",values:"1;0.3;1",dur:"0.8s",repeatCount:"indefinite"})]})]})}),e>=1&&e<3&&t.jsx("div",{className:"splash-sparks",children:[...Array(20)].map((d,l)=>t.jsx("div",{className:"splash-spark",style:{left:`${l*5}%`,animationDelay:`${l*.05}s`}},l))}),t.jsxs("div",{className:`splash-content ${e>=3?"visible":"hidden"}`,children:[t.jsx("div",{className:"splash-glow-orb"}),t.jsxs("div",{className:"splash-logo",children:[t.jsxs("div",{className:"splash-film-frame",children:[t.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",children:t.jsx("path",{d:"M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z",fill:"#75AADB"})}),u.map((d,l)=>t.jsx("div",{className:"splash-perf splash-perf--left",style:{top:`${d}px`}},`l${l}`)),u.map((d,l)=>t.jsx("div",{className:"splash-perf splash-perf--right",style:{top:`${d}px`}},`r${l}`))]}),t.jsx("div",{className:"splash-scissors-badge",children:t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",children:[t.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),t.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),t.jsx("line",{x1:"8.5",y1:"7.5",x2:"20",y2:"18",stroke:"white",strokeWidth:"2",strokeLinecap:"round"}),t.jsx("line",{x1:"8.5",y1:"16.5",x2:"20",y2:"6",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})})]}),t.jsx("h1",{className:"splash-title",children:"ClipCut"}),t.jsx("p",{className:"splash-tagline",children:"Professional Video Suite"}),t.jsxs("div",{className:`splash-loader ${e>=4?"visible":"hidden"}`,children:[t.jsx("div",{className:"splash-loader-track",children:t.jsx("div",{className:"splash-loader-fill",style:{width:`${i}%`}})}),t.jsxs("div",{className:"splash-loader-row",children:[t.jsx("span",{className:"splash-loader-status",children:o}),t.jsxs("span",{className:"splash-loader-pct",children:[i,"%"]})]})]})]}),t.jsx("div",{className:"splash-footer",style:{opacity:e>=4?.4:0},children:t.jsx("span",{className:"splash-footer-text",children:"© 2026 ClipCut • Bokas Technologies (Pty) Ltd"})}),t.jsxs("div",{className:"splash-bw-stripe",style:{opacity:e>=4?1:0},children:[t.jsx("div",{style:{flex:1,background:"#75AADB"}}),t.jsx("div",{style:{flex:.3,background:"white"}}),t.jsx("div",{style:{flex:1,background:"#0d0d0d"}}),t.jsx("div",{style:{flex:.3,background:"white"}}),t.jsx("div",{style:{flex:1,background:"#75AADB"}})]})]})},Je=6e4;function Ke(s=Je){const{session:e,refreshSession:r,signOut:i}=G(),[n,o]=c.useState(!1),[u,d]=c.useState(0),l=c.useRef(!1),p=c.useMemo(()=>e?.expires_at?(l.current=!1,e.expires_at*1e3):null,[e?.expires_at]);return c.useEffect(()=>{if(!p){o(!1),d(0);return}const a=()=>{const E=p-Date.now();d(Math.max(0,E)),E<=s&&E>0&&o(!0),E<=0&&!l.current&&(l.current=!0,o(!1),i())};a();const j=window.setInterval(a,1e3);return()=>window.clearInterval(j)},[p,s,i]),{showWarning:n,timeRemainingMs:u,extendSession:async()=>{const a=await r();return a&&o(!1),a},logoutNow:i}}const Ct=3e4,Xe=3e3,Nt=640,Dt=768,Mt=2700,Vt=300,zt=5;function Ze(s={}){const{immediate:e=!1,onNeedRefresh:r,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=s;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await g(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/clipcut/sw.js",{scope:"/clipcut/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||i?.()}),d.register({immediate:e}).then(a=>{o?o("/clipcut/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}function Qe(s={}){const{immediate:e=!0,onNeedRefresh:r,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=s,[d,l]=c.useState(!1),[p,f]=c.useState(!1),[a]=c.useState(()=>Ze({immediate:e,onOfflineReady(){f(!0),i?.()},onNeedRefresh(){l(!0),r?.()},onRegistered:n,onRegisteredSW:o,onRegisterError:u}));return{needRefresh:[d,l],offlineReady:[p,f],updateServiceWorker:a}}const et={position:"fixed",bottom:"72px",left:"50%",transform:"translateX(-50%)",zIndex:10001,background:"#1a2332",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"10px",padding:"10px 16px",display:"flex",alignItems:"center",gap:"12px",boxShadow:"0 8px 24px rgba(0,0,0,0.4)",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.85)",maxWidth:"calc(100vw - 32px)"},tt={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"6px 14px",fontWeight:700,fontSize:"12px",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"},st={background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",padding:"4px",lineHeight:1,fontSize:"18px",fontFamily:"Material Symbols Outlined"},rt=()=>{const{needRefresh:[s,e],updateServiceWorker:r}=Qe();return s?t.jsxs("div",{style:et,role:"alert",children:[t.jsx("span",{children:"New version available"}),t.jsx("button",{style:tt,onClick:()=>r(!0),children:"Reload"}),t.jsx("button",{style:st,onClick:()=>e(!1),"aria-label":"Dismiss update notification",children:"close"})]}):null},nt=c.lazy(()=>g(()=>import("./DZDZVY5q.js"),__vite__mapDeps([0,1,2,3]))),it=c.lazy(()=>g(()=>import("./DBS4q8gQ.js"),__vite__mapDeps([4,1,5,6,7,2,3]))),ot=c.lazy(()=>g(()=>import("./Cy5fBrdR.js"),__vite__mapDeps([8,1,5,6,7,2,9,3]))),at=c.lazy(()=>g(()=>import("./DB7FMbsc.js"),__vite__mapDeps([10,1,5,6,7,2,9,3]))),lt=c.lazy(()=>g(()=>import("./C5fDje6g.js"),__vite__mapDeps([11,1,5,7,3]))),ct=c.lazy(()=>g(()=>import("./C-xr2qAH.js"),__vite__mapDeps([12,1,6,2,3]))),dt=c.lazy(()=>g(()=>import("./BROpGFVb.js"),__vite__mapDeps([13,1,2,3]))),ut=c.lazy(()=>g(()=>import("./CUSkrBOK.js"),__vite__mapDeps([14,1,2,3]))),pt=c.lazy(()=>g(()=>import("./Bkss9eJq.js"),__vite__mapDeps([15,1,16,17,6,7,3]))),ft=c.lazy(()=>g(()=>import("./D6pDGRYJ.js").then(s=>s.V),__vite__mapDeps([18,1,6,16,19,17,7]))),ht=c.lazy(()=>g(()=>import("./Bz2nI5Pb.js"),__vite__mapDeps([20,1,19,3]))),gt=c.lazy(()=>g(()=>import("./C2IN7YFz.js"),__vite__mapDeps([21,1,2,3]))),mt=c.lazy(()=>g(()=>import("./7hRhs4cM.js"),__vite__mapDeps([22,1,17,6,7,23,3]))),xt=()=>t.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",backgroundColor:"#0a0a0a",color:"#75AADB",fontFamily:"Spline Sans, sans-serif"},children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[t.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117, 170, 219, 0.2)",borderTopColor:"#75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),t.jsx("span",{style:{fontSize:"14px",opacity:.8},children:"Loading..."}),t.jsx("style",{children:`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}),bt=()=>{const[s,e]=c.useState(!navigator.onLine);return c.useEffect(()=>Ge(({online:r})=>e(!r)),[]),s?t.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e4,background:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",fontWeight:600,color:"white"},children:[t.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"cloud_off"}),"You're offline. Some features may be unavailable."]}):null},yt=()=>{const{showWarning:s,timeRemainingMs:e,extendSession:r,logoutNow:i}=Ke();if(!s)return null;const n=Math.max(1,Math.ceil(e/1e3));return t.jsxs("div",{style:{position:"fixed",top:"12px",right:"12px",zIndex:9999,background:"rgba(15,20,30,0.95)",border:"1px solid rgba(245, 158, 11, 0.6)",borderRadius:"10px",padding:"12px",width:"min(380px, calc(100vw - 24px))",boxShadow:"0 8px 24px rgba(0,0,0,0.35)"},children:[t.jsxs("p",{style:{color:"#f59e0b",margin:"0 0 10px",fontSize:"13px",fontWeight:700},children:["Your session is about to expire (",n,"s)"]}),t.jsxs("div",{style:{display:"flex",gap:"8px"},children:[t.jsx("button",{onClick:r,style:vt,children:"Stay signed in"}),t.jsx("button",{onClick:i,style:Et,children:"Sign out"})]})]})},wt=()=>{const[s,e]=c.useState(!0),r=X(),i=ce(),n=c.useRef(!1);return c.useEffect(()=>{n.current||(Oe(),n.current=!0)},[]),c.useEffect(()=>Ve(),[]),c.useEffect(()=>{s||(I.measurePageLoad(i.pathname),Ce(i.pathname),Ne(re.pageView,{path:i.pathname}))},[i.pathname,s]),c.useEffect(()=>{const o=setTimeout(()=>{e(!1)},Xe);return()=>clearTimeout(o)},[]),s?t.jsx(qe,{}):t.jsxs(t.Fragment,{children:[t.jsx(bt,{}),t.jsx(yt,{}),t.jsx(rt,{}),t.jsx(c.Suspense,{fallback:t.jsx(xt,{}),children:t.jsxs(de,{children:[t.jsx(y,{path:"/",element:t.jsx(D,{children:t.jsx(x,{name:"landing",message:"Landing page failed to load",onReset:()=>r("/"),children:t.jsx(nt,{})})})}),t.jsx(y,{path:"/login",element:t.jsx(D,{children:t.jsx(x,{name:"login",message:"Login failed to load",onReset:()=>r("/login"),children:t.jsx(it,{onNavigateToRegister:()=>r("/register")})})})}),t.jsx(y,{path:"/register",element:t.jsx(D,{children:t.jsx(x,{name:"register",message:"Registration failed to load",onReset:()=>r("/register"),children:t.jsx(ot,{onNavigateToLogin:()=>r("/login")})})})}),t.jsx(y,{path:"/reset-password",element:t.jsx(D,{children:t.jsx(x,{name:"reset-password",message:"Password reset failed to load",onReset:()=>r("/reset-password"),children:t.jsx(at,{})})})}),t.jsx(y,{path:"/verify-email",element:t.jsx(_,{children:t.jsx(x,{name:"verify-email",message:"Email verification failed to load",onReset:()=>r("/verify-email"),children:t.jsx(lt,{})})})}),t.jsx(y,{path:"/onboarding/1",element:t.jsx(_,{children:t.jsx(x,{name:"onboarding",onReset:()=>r("/onboarding/1"),children:t.jsx(ct,{onContinue:()=>r("/onboarding/2"),onSkip:()=>r("/onboarding/2"),onSkipAll:()=>r("/dashboard")})})})}),t.jsx(y,{path:"/onboarding/2",element:t.jsx(_,{children:t.jsx(x,{name:"onboarding",onReset:()=>r("/onboarding/2"),children:t.jsx(dt,{onContinue:()=>r("/onboarding/3"),onSkip:()=>r("/onboarding/3"),onSkipAll:()=>r("/dashboard")})})})}),t.jsx(y,{path:"/onboarding/3",element:t.jsx(_,{children:t.jsx(x,{name:"onboarding",onReset:()=>r("/onboarding/3"),children:t.jsx(ut,{onComplete:()=>r("/dashboard"),onSkip:()=>r("/dashboard")})})})}),t.jsx(y,{path:"/dashboard",element:t.jsx(_,{children:t.jsx(x,{name:"dashboard",message:"Dashboard failed to load",onReset:()=>r("/dashboard"),children:t.jsx(pt,{})})})}),t.jsx(y,{path:"/editor",element:t.jsx(_,{children:t.jsx(x,{name:"editor",message:"Video editor encountered an error",onReset:()=>r("/editor"),children:t.jsx(ft,{})})})}),t.jsx(y,{path:"/long-to-shorts",element:t.jsx(_,{children:t.jsx(x,{name:"long-to-shorts",message:"AI Shorts feature encountered an error",onReset:()=>r("/long-to-shorts"),children:t.jsx(ht,{})})})}),t.jsx(y,{path:"/templates",element:t.jsx(_,{children:t.jsx(x,{name:"templates",message:"Template library failed to load",onReset:()=>r("/templates"),children:t.jsx(gt,{})})})}),t.jsx(y,{path:"/settings",element:t.jsx(_,{children:t.jsx(x,{name:"settings",message:"Settings failed to load",onReset:()=>r("/settings"),children:t.jsx(mt,{})})})})]})})]})},vt={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"8px 10px",fontWeight:700,cursor:"pointer"},Et={background:"transparent",color:"rgba(255,255,255,0.75)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"6px",padding:"8px 10px",fontWeight:600,cursor:"pointer"},_t="/clipcut/".replace(/\/$/,"")||void 0,St=()=>t.jsx(x,{children:t.jsx(Ee,{children:t.jsx(le,{basename:_t,children:t.jsx(wt,{})})})});function jt(s={}){const{immediate:e=!1,onNeedRefresh:r,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=s;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await g(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/clipcut/sw.js",{scope:"/clipcut/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||i?.()}),d.register({immediate:e}).then(a=>{o?o("/clipcut/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}Ie();Pe();jt({onNeedRefresh(){O.info("[PWA] New content available, refresh to update")},onOfflineReady(){O.info("[PWA] App ready to work offline")},onRegistered(s){O.info("[PWA] Service worker registered"),s&&setInterval(()=>{s.update()},60*60*1e3)},onRegisterError(s){O.error("[PWA] Service worker registration failed",{error:s})}});ue.createRoot(document.getElementById("root")).render(t.jsx(pe.StrictMode,{children:t.jsx(St,{})}));export{Ct as A,zt as D,x as E,Nt as M,Mt as T,g as _,Le as a,re as b,$ as c,N as d,Vt as e,Dt as f,Pt as g,Tt as h,ne as i,b as j,It as k,O as l,Lt as m,Ot as r,T as s,Ne as t,G as u};
