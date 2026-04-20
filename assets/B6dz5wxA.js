const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CRs9M7YQ.js","assets/DwQPoapS.js","assets/D8AsaMNA.js","assets/DZxFKcQQ.js","assets/Dim4Yn7Y.js","assets/C1jPDOPn.js","assets/Et-wlZO3.js","assets/B9CjrYEi.js","assets/BbjuDlpP.js","assets/Cf6dk1K3.js","assets/CcJoaJbO.js","assets/B4D0vkJl.js","assets/CYGA8FHy.js","assets/D-MosdpJ.js","assets/D2WCvqlq.js","assets/DQ5kcJPv.js","assets/DUfwuLOS.js","assets/BM_Ew0Tp.js","assets/t1UI_N9K.js","assets/CtQ41oYt.js"])))=>i.map(i=>d[i]);
var oe=Object.defineProperty;var ae=(t,e,s)=>e in t?oe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var H=(t,e,s)=>ae(t,typeof e!="symbol"?e+"":e,s);import{r as c,j as r,N as K,u as X,B as le,a as ce,R as de,b as E,c as ue,d as pe}from"./DwQPoapS.js";import{c as fe}from"./DZxFKcQQ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const he="modulepreload",ge=function(t){return"/clipcut/"+t},q={},x=function(e,s,i){let n=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),d=u?.nonce||u?.getAttribute("nonce");n=Promise.allSettled(s.map(l=>{if(l=ge(l),l in q)return;q[l]=!0;const p=l.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const a=document.createElement("link");if(a.rel=p?"stylesheet":he,p||(a.as="script"),a.crossOrigin="",a.href=l,d&&a.setAttribute("nonce",d),document.head.appendChild(a),p)return new Promise((_,v)=>{a.addEventListener("load",_),a.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(u){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=u,window.dispatchEvent(d),!d.defaultPrevented)throw u}return n.then(u=>{for(const d of u||[])d.status==="rejected"&&o(d.reason);return e().catch(o)})},Z=`https://xmdwwaxpktwukksmzkwy.supabase.co

`,Q="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZHd3YXhwa3R3dWtrc216a3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTM3NDUsImV4cCI6MjA4NzE2OTc0NX0.OlwyZ91ATRZ_gJG9WkuvC8nWMtYoVqnyrvkYsw0cGrs";function me(t){try{const e=new URL(t);return e.protocol!=="https:"?!1:e.protocol==="https:"||e.protocol==="http:"}catch{return!1}}function xe(t){const e=t.split(".");if(e.length!==3)return!1;const s=/^[A-Za-z0-9_-]+$/;return e.every(i=>i.length>0&&s.test(i))}const k=[];me(Z)||k.push("VITE_SUPABASE_URL is not a valid URL");xe(Q)||k.push("VITE_SUPABASE_ANON_KEY is not a valid Supabase key format");if(k.length>0){const t=`Supabase configuration error:
`+k.map(e=>`  - ${e}`).join(`
`)+`

Please copy env.example to .env and fill in your credentials.`;throw new Error(t)}const be="http://127.0.0.1:54321",ye="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjowfQ.invalid",we=k.length===0?Z:be,ve=k.length===0?Q:ye,T=fe(we,ve,{auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"pkce"},global:{headers:{"X-Client-Info":"clipcut-web"}}});function N(){return k.length===0}const B={INACTIVITY_TIMEOUT_MS:30*60*1e3,TOKEN_REFRESH_BUFFER_MS:5*60*1e3,VALIDATION_INTERVAL_MS:60*1e3},ee=c.createContext({user:null,session:null,loading:!0,signOut:async()=>{},refreshSession:async()=>{},isSessionValid:!1});function Ee({children:t}){const[e,s]=c.useState(null),[i,n]=c.useState(null),[o,u]=c.useState(!0),[d,l]=c.useState(!1),p=c.useRef(Date.now()),f=c.useRef(null),a=c.useRef(null),_=c.useCallback(h=>{if(!h?.expires_at)return!1;const g=h.expires_at*1e3,R=Date.now();return g-R<B.TOKEN_REFRESH_BUFFER_MS},[]),v=c.useCallback(async()=>{if(!N())return l(!1),!1;try{const{data:{session:h},error:g}=await T.auth.getSession();if(g)return console.warn("Session validation error:",g.message),l(!1),!1;if(!h)return l(!1),!1;if(_(h)){const{data:{session:R},error:b}=await T.auth.refreshSession();if(b)return console.warn("Session refresh failed:",b.message),l(!1),!1;R&&(n(R),s(R.user))}return l(!0),!0}catch(h){return console.warn("Session validation failed:",h),l(!1),!1}},[_]),L=c.useCallback(async()=>{f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current);try{N()&&await T.auth.signOut()}catch(h){console.warn("Sign out error:",h)}s(null),n(null),l(!1)},[]),C=c.useRef(i);c.useEffect(()=>{C.current=i},[i]);const A=c.useCallback(()=>{p.current=Date.now(),f.current&&clearTimeout(f.current),C.current&&(f.current=setTimeout(async()=>{console.info("Session expired due to inactivity"),await L()},B.INACTIVITY_TIMEOUT_MS))},[L]),ie=c.useCallback(async()=>{if(!N())return l(!1),!1;try{const{data:{session:h},error:g}=await T.auth.refreshSession();if(g)throw g;return h?(n(h),s(h.user),l(!0),!0):!1}catch(h){return console.warn("Manual session refresh failed:",h),l(!1),!1}},[]);return c.useEffect(()=>{let h=!0;if(!N())return u(!1),l(!1),()=>{h=!1};let g;return(async()=>{try{const{data:{session:b}}=await T.auth.getSession();if(!h)return;n(b),s(b?.user??null),l(!!b),b&&A()}catch(b){if(!h)return;console.warn("Initial session lookup failed:",b),n(null),s(null),l(!1)}finally{h&&u(!1)}})(),{data:{subscription:g}}=T.auth.onAuthStateChange((b,F)=>{if(h)switch(n(F),s(F?.user??null),l(!!F),u(!1),b){case"SIGNED_IN":A();break;case"SIGNED_OUT":f.current&&clearTimeout(f.current);break;case"TOKEN_REFRESHED":l(!0);break}}),()=>{h=!1,g?.unsubscribe(),f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current)}},[A]),c.useEffect(()=>{if(!i)return;const h=["mousedown","keydown","scroll","touchstart"];return h.forEach(g=>{window.addEventListener(g,A,{passive:!0})}),()=>{h.forEach(g=>{window.removeEventListener(g,A)})}},[i,A]),c.useEffect(()=>{if(i)return a.current=setInterval(()=>{v()},B.VALIDATION_INTERVAL_MS),()=>{a.current&&clearInterval(a.current)}},[i,v]),r.jsx(ee.Provider,{value:{user:e,session:i,loading:o,signOut:L,refreshSession:ie,isSessionValid:d},children:t})}function G(){const t=c.useContext(ee);if(!t)throw new Error("useAuth must be used within an AuthProvider");return t}const te=()=>r.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Spline Sans', sans-serif"},children:[r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117,170,219,0.2)",borderTop:"3px solid #75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}),r.jsx("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:"Loading..."})]}),r.jsx("style",{children:`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `})]});function j({children:t}){const{user:e,loading:s}=G();return s?r.jsx(te,{}):e?t:r.jsx(K,{to:"/login",replace:!0})}function D({children:t}){const{user:e,loading:s}=G();return s?r.jsx(te,{}):e?r.jsx(K,{to:"/dashboard",replace:!0}):t}const m={LCP:"lcp",FID:"fid",CLS:"cls",FCP:"fcp",TTFB:"ttfb",PAGE_LOAD:"page_load",ROUTE_CHANGE:"route_change",VIDEO_TRIM:"video_trim",VIDEO_SPLIT:"video_split",VIDEO_MERGE:"video_merge",VIDEO_EXPORT:"video_export",VIDEO_THUMBNAIL:"video_thumbnail",VIDEO_PREVIEW:"video_preview",API_REQUEST:"api_request",API_UPLOAD:"api_upload",API_DOWNLOAD:"api_download",USER_INTERACTION:"user_interaction"},Se={LCP:{good:2500,needsImprovement:4e3},FID:{good:100,needsImprovement:300},CLS:{good:.1,needsImprovement:.25},FCP:{good:1800,needsImprovement:3e3},TTFB:{good:800,needsImprovement:1800},PAGE_LOAD:{good:3e3,needsImprovement:5e3},VIDEO_TRIM:{good:3e4,needsImprovement:6e4},VIDEO_EXPORT:{good:12e4,needsImprovement:24e4}};function _e(t,e){const s=Se[t];return s?e<=s.good?"good":e<=s.needsImprovement?"needs-improvement":"poor":"unknown"}class je{constructor(){this.metrics=[],this.observers=new Map,this.isEnabled=typeof window<"u"&&"PerformanceObserver"in window,this.isEnabled&&this.initCoreWebVitals()}initCoreWebVitals(){try{const e=new PerformanceObserver(s=>{const i=s.getEntries(),n=i[i.length-1];this.recordMetric(m.LCP,n.renderTime||n.loadTime,{element:n.element?.tagName||"unknown",url:n.url||""})});e.observe({entryTypes:["largest-contentful-paint"]}),this.observers.set("lcp",e)}catch(e){console.warn("[Performance] LCP observer not supported:",e)}try{const e=new PerformanceObserver(s=>{s.getEntries().forEach(n=>{this.recordMetric(m.FID,n.processingStart-n.startTime,{eventType:n.name,target:n.target?.tagName||"unknown"})})});e.observe({entryTypes:["first-input"]}),this.observers.set("fid",e)}catch(e){console.warn("[Performance] FID observer not supported:",e)}try{let e=0;const s=new PerformanceObserver(i=>{const n=i.getEntries();n.forEach(o=>{o.hadRecentInput||(e+=o.value)}),this.recordMetric(m.CLS,e,{sources:n.length})});s.observe({entryTypes:["layout-shift"]}),this.observers.set("cls",s)}catch(e){console.warn("[Performance] CLS observer not supported:",e)}try{const e=new PerformanceObserver(s=>{s.getEntries().forEach(n=>{n.name==="first-contentful-paint"&&this.recordMetric(m.FCP,n.startTime,{})})});e.observe({entryTypes:["paint"]}),this.observers.set("fcp",e)}catch(e){console.warn("[Performance] FCP observer not supported:",e)}try{const e=new PerformanceObserver(s=>{s.getEntries().forEach(n=>{if(n.entryType==="navigation"){const o=n.responseStart-n.requestStart;this.recordMetric(m.TTFB,o,{url:n.name})}})});e.observe({entryTypes:["navigation"]}),this.observers.set("ttfb",e)}catch(e){console.warn("[Performance] TTFB observer not supported:",e)}}recordMetric(e,s,i={}){if(!this.isEnabled)return;const n={type:e,value:s,rating:_e(e,s),timestamp:Date.now(),url:typeof window<"u"?window.location.pathname:"",userAgent:typeof navigator<"u"?navigator.userAgent:"",...i};this.metrics.push(n),this.metrics.length>100&&this.metrics.shift(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("performance-metric",{detail:n}))}startTiming(e,s,i={}){const n=performance.now(),o=`perf_${e}_start`;return this.isEnabled&&performance.mark(o),(u={})=>{const l=performance.now()-n,p=`perf_${e}_end`;return this.isEnabled&&(performance.mark(p),performance.measure(`perf_${e}`,o,p)),this.recordMetric(s,l,{...i,...u,operationId:e}),l}}measurePageLoad(e){!this.isEnabled||typeof window>"u"||window.addEventListener("load",()=>{const s=performance.getEntriesByType("navigation")[0];if(s){const i=s.loadEventEnd-s.fetchStart;this.recordMetric(m.PAGE_LOAD,i,{route:e,domContentLoaded:s.domContentLoadedEventEnd-s.fetchStart,domInteractive:s.domInteractive-s.fetchStart})}},{once:!0})}measureRouteChange(e,s,i){this.recordMetric(m.ROUTE_CHANGE,i,{fromRoute:e,toRoute:s})}getMetrics(e=null){return e?this.metrics.filter(s=>s.type===e):[...this.metrics]}getSummary(){const e={};return Object.values(m).forEach(s=>{const i=this.metrics.filter(n=>n.type===s);if(i.length>0){const n=i.map(o=>o.value);e[s]={count:i.length,avg:n.reduce((o,u)=>o+u,0)/n.length,min:Math.min(...n),max:Math.max(...n),latest:i[i.length-1]}}}),e}clear(){this.metrics=[]}cleanup(){this.observers.forEach(e=>{try{e.disconnect()}catch{}}),this.observers.clear()}}const I=new je;async function At(t,e,s={}){const i=`${t}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=I.startTiming(i,t,{...s,operation:t});try{const o=await e();return n({success:!0}),o}catch(o){throw n({success:!1,error:o.message}),o}}async function Rt(t,e,s={}){const i=`api_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=I.startTiming(i,m.API_REQUEST,{endpoint:t,...s});try{const o=await e();return n({success:!0}),o}catch(o){throw n({success:!1,error:o.message,statusCode:o.status}),o}}async function Tt(t,e,s,i={}){const n=`upload_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,o=I.startTiming(n,m.API_UPLOAD,{filename:t,fileSize:e,...i});try{const u=await s(),d=o({success:!0}),l=e/(d/1e3);return I.recordMetric(m.API_UPLOAD,d,{filename:t,fileSize:e,speed:l,...i}),u}catch(u){throw o({success:!1,error:u.message}),u}}typeof window<"u"&&I.measurePageLoad(window.location.pathname);const U={debug:10,info:20,warn:30,error:40},ke="info",J=void 0,re=U[J]?J:ke,Ae=t=>t?{name:t.name,message:t.message,stack:t.stack}:null,M=(t,e,s={})=>({timestamp:new Date().toISOString(),level:t,message:e,app:"clipcut",env:"production",metadata:{...s,error:s.error instanceof Error?Ae(s.error):s.error}}),V=t=>U[t]>=U[re],z=t=>{const e=JSON.stringify(t);if(t.level==="error"){console.error(e);return}if(t.level==="warn"){console.warn(e);return}if(t.level==="debug"){console.debug(e);return}console.log(e)},O={level:re,debug(t,e){V("debug")&&z(M("debug",t,e))},info(t,e){V("info")&&z(M("info",t,e))},warn(t,e){V("warn")&&z(M("warn",t,e))},error(t,e){V("error")&&z(M("error",t,e))}},S=()=>{},Re={setTag:S,setExtra:S,setLevel:S,setFingerprint:S};let Te={init:S,withScope:t=>t(Re),captureException:S,captureMessage:S,setUser:S,addBreadcrumb:S};async function Ie(){{console.warn("[ErrorTracking] Sentry DSN not configured. Error tracking disabled.");return}}function $(t,e={}){{console.error("[ErrorTracking] Error captured but Sentry not configured:",t);return}}function Le(t){Te.addBreadcrumb({timestamp:Date.now()/1e3,...t})}function Pe(){window.onerror=(t,e,s,i,n)=>($(n||new Error(t),{}),!1),window.addEventListener("unhandledrejection",t=>{const e=t.reason instanceof Error?t.reason:new Error(String(t.reason));$(e,{extra:{reason:t.reason}})}),console.log("[ErrorTracking] Global error handlers set up")}async function Oe(){{console.warn("[Analytics] GA Measurement ID not configured. Analytics disabled.");return}}function Ce(t,e){Y(se.pageView,{})}function Ne(t,e,s,i){typeof e=="object"&&e!==null&&!Array.isArray(e)?Y(t,e):typeof e=="string"||Y(t,{})}async function Y(t,e={}){}const se={pageView:"page_view",coreWebVital:"core_web_vital",loginAttempt:"login_attempt",loginSuccess:"login_success",loginFailure:"login_failure",passwordResetRequested:"password_reset_requested",registerAttempt:"register_attempt",registerSuccess:"register_success",registerFailure:"register_failure",googleSignInAttempt:"google_sign_in_attempt",onboardingStart:"onboarding_start",onboardingContinue:"onboarding_continue",onboardingSkip:"onboarding_skip",onboardingComplete:"onboarding_complete",dashboardNewProjectClick:"dashboard_new_project_click",dashboardFileImport:"dashboard_file_import",dashboardProjectOpen:"dashboard_project_open",dashboardProjectDelete:"dashboard_project_delete",dashboardAIFeatureSelect:"dashboard_ai_feature_select",dashboardToolSelect:"dashboard_tool_select"},De=new Set([m.LCP,m.FID,m.CLS]);let P=null;async function Me(t){}function Ve(){if(typeof window>"u")return()=>{};if(P)return P;const t=e=>{const s=e.detail;!s||!De.has(s.type)||(s.type,Number(s.value),s.rating,s.timestamp||Date.now(),Me())};return window.addEventListener("performance-metric",t),P=()=>{window.removeEventListener("performance-metric",t),P=null},P}function ne(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("failed to fetch")||e.includes("network request failed")||e.includes("networkerror")||e.includes("net::err_")||e.includes("load failed")||e.includes("network error")||e.includes("econnrefused")||e.includes("econnreset")||e.includes("etimedout")||t.name==="TypeError"&&e.includes("fetch")||!navigator.onLine}function ze(t){if(!t)return!1;const e=(t.message||"").toLowerCase(),s=t.status||t.statusCode;return s===401||s===403||e.includes("jwt expired")||e.includes("invalid token")||e.includes("token expired")||e.includes("refresh_token")||e.includes("not authenticated")||e.includes("invalid credentials")||e.includes("invalid login")||e.includes("email not confirmed")||e.includes("session expired")||e.includes("unauthorized")}function Fe(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("ffmpeg")||e.includes("wasm")||e.includes("sharedarraybuffer")||e.includes("out of memory")||e.includes("oom")||e.includes("memory access out of bounds")||e.includes("cross-origin isolation")}function Be(t){if(!t)return!1;const e=(t.message||"").toLowerCase();return e.includes("upload")||e.includes("file too large")||e.includes("file type not allowed")||e.includes("storage")||e.includes("bucket")||e.includes("quota exceeded")||t.name==="AbortError"}function We(t){if(!t)return!1;if(ne(t))return!0;const e=t.status||t.statusCode;if(e>=500&&e<600||e===429)return!0;const s=(t.message||"").toLowerCase();return!!(s.includes("timeout")||s.includes("timed out"))}const Ue={"invalid login credentials":"Incorrect email or password. Please try again.","email not confirmed":"Please verify your email address before signing in. Check your inbox.","user already registered":"An account with this email already exists. Try signing in instead.","signup disabled":"Registration is currently unavailable. Please try again later.","email rate limit exceeded":"Too many attempts. Please wait a few minutes before trying again.","invalid email":"Please enter a valid email address.","weak password":"Your password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.","jwt expired":"Your session has expired. Please sign in again.",refresh_token_not_found:"Your session has expired. Please sign in again.","invalid token":"Your session is no longer valid. Please sign in again.","user not found":"No account found with this email address.",popup_closed_by_user:"Sign-in was cancelled. Please try again.",oauth_error:"Authentication service error. Please try again."},$e={sharedarraybuffer:"Your browser does not support video processing. Try using Chrome or Edge.","cross-origin isolation":"Video processing requires special browser settings. Try refreshing the page.","out of memory":"The video is too large to process in your browser. Try a shorter clip or lower resolution.","memory access out of bounds":"Video processing ran out of memory. Try closing other tabs and retry.",wasm:"Failed to load the video engine. Please refresh the page.",ffmpeg:"Video processing failed. Please try again with a different file."},Ye={"file too large":"This file exceeds the maximum upload size (500 MB). Try compressing or trimming it first.","file type not allowed":"This file format is not supported. Accepted formats: MP4, WebM, MOV, AVI, MP3, WAV, JPEG, PNG.","quota exceeded":"Storage is full. Delete some old projects to free up space.","bucket not found":"Cloud storage is temporarily unavailable. Please try again later."};function It(t,e){if(!t)return"An unexpected error occurred. Please try again.";const s=typeof t=="string"?t:t.message||"",i=s.toLowerCase();if(ne(typeof t=="string"?new Error(t):t)||!navigator.onLine)return"Unable to connect. Please check your internet connection and try again.";if(e==="auth"||ze(typeof t=="string"?new Error(t):t)){for(const[n,o]of Object.entries(Ue))if(i.includes(n))return o;return i.includes("locked")||i.includes("lockout")?s:"Authentication failed. Please try again."}if(e==="ffmpeg"||Fe(typeof t=="string"?new Error(t):t)){for(const[n,o]of Object.entries($e))if(i.includes(n))return o;return"Video processing failed. Please try a different file or refresh the page."}if(e==="upload"||Be(typeof t=="string"?new Error(t):t)){if(typeof t!="string"&&t.name==="AbortError")return"Upload was cancelled.";for(const[n,o]of Object.entries(Ye))if(i.includes(n))return o;return"Upload failed. Please check your connection and try again."}return e==="project"?i.includes("access denied")?"You do not have permission to access this project.":i.includes("not found")?"This project could not be found. It may have been deleted.":"Failed to save or load your project. Please try again.":i.includes("timeout")||i.includes("timed out")?"The request took too long. Please try again.":s.length<150&&!s.includes(`
`)&&!s.includes("  at ")?s:"Something went wrong. Please try again."}async function Lt(t,e={}){const{maxRetries:s=3,baseDelay:i=1e3,maxDelay:n=1e4,shouldRetry:o=We,onRetry:u,signal:d}=e;let l;for(let p=0;p<=s;p++){if(d?.aborted)throw new DOMException("Operation aborted","AbortError");try{return await t(p)}catch(f){if(l=f,f.name==="AbortError")throw f;if(p>=s||!o(f))break;const a=Math.min(i*Math.pow(2,p)+Math.random()*500,n);u&&u({error:f,attempt:p+1,delay:a}),await new Promise((_,v)=>{const L=setTimeout(_,a);if(d){const C=()=>{clearTimeout(L),v(new DOMException("Operation aborted","AbortError"))};d.addEventListener("abort",C,{once:!0})}})}}throw l}let W=[];function Ge(t){const e=()=>t({online:!0}),s=()=>t({online:!1});return window.addEventListener("online",e),window.addEventListener("offline",s),W.push({handleOnline:e,handleOffline:s}),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",s),W=W.filter(i=>i.handleOnline!==e)}}class w extends c.Component{constructor(s){super(s);H(this,"handleReset",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null,eventId:null}}static getDerivedStateFromError(s){return{hasError:!0,error:s}}componentDidCatch(s,i){O.error("ErrorBoundary caught an error",{error:s,errorInfo:i}),this.setState({errorInfo:i}),Le({category:"error_boundary",message:`Error caught in "${this.props.name||"root"}": ${s.message}`,level:"error"}),$(s,{tags:{boundary:this.props.name||"root"},extra:{componentStack:i?.componentStack}})}render(){return this.state.hasError?this.props.fallback?this.props.fallback:this.props.renderFallback?this.props.renderFallback(this.state.error,this.handleReset):this.props.inline?r.jsx("div",{style:y.inlineContainer,children:r.jsxs("div",{style:y.inlineCard,children:[r.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"28px",color:"#ef4444"},children:"error_outline"}),r.jsxs("div",{style:{flex:1},children:[r.jsx("p",{style:{color:"#ffffff",fontSize:"14px",fontWeight:600,margin:"0 0 4px"},children:this.props.message||"This section encountered an error"}),r.jsx("p",{style:{color:"#94a3b8",fontSize:"12px",margin:0},children:"Try again or reload the page."})]}),r.jsx("button",{onClick:this.handleReset,style:y.inlineButton,children:"Retry"})]})}):r.jsx("div",{style:y.container,children:r.jsxs("div",{style:y.card,children:[r.jsx("div",{style:y.iconWrapper,children:r.jsx("span",{className:"material-symbols-outlined",style:y.icon,children:"error_outline"})}),r.jsx("h1",{style:y.title,children:this.props.message||"Something went wrong"}),r.jsx("p",{style:y.message,children:"We're sorry, but something unexpected happened. Please try refreshing the page or go back to the dashboard."}),!1,r.jsxs("div",{style:y.buttonGroup,children:[r.jsx("button",{onClick:this.handleReset,style:y.primaryButton,children:"Try Again"}),r.jsx("button",{onClick:()=>window.location.href="/dashboard",style:y.secondaryButton,children:"Go to Dashboard"})]})]})}):this.props.children}}const y={container:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",fontFamily:"'Spline Sans', sans-serif",padding:"20px"},card:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"48px",maxWidth:"480px",width:"100%",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},iconWrapper:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(239, 68, 68, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"},icon:{fontSize:"36px",color:"#ef4444"},title:{color:"#ffffff",fontSize:"24px",fontWeight:600,margin:"0 0 12px"},message:{color:"#94a3b8",fontSize:"14px",lineHeight:1.6,margin:"0 0 24px"},buttonGroup:{display:"flex",gap:"12px",justifyContent:"center"},primaryButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"transform 0.15s ease, box-shadow 0.15s ease"},secondaryButton:{background:"rgba(255,255,255,0.05)",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:500,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},inlineContainer:{display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",width:"100%",height:"100%",minHeight:"120px",background:"#0e1820"},inlineCard:{display:"flex",alignItems:"center",gap:"14px",background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:"12px",padding:"16px 20px",maxWidth:"420px",width:"100%"},inlineButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"8px 18px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",whiteSpace:"nowrap"}},He=`
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
`,qe=()=>{const t=X(),[e,s]=c.useState(0);c.useEffect(()=>{const d=[setTimeout(()=>s(1),500),setTimeout(()=>s(2),1500),setTimeout(()=>s(3),2200),setTimeout(()=>s(4),3e3),setTimeout(()=>s(5),5500),setTimeout(()=>t("/login"),6500)];return()=>d.forEach(clearTimeout)},[t]);const[i,n]=c.useState(0);c.useEffect(()=>{if(e>=4){const d=setInterval(()=>{n(l=>l>=100?(clearInterval(d),100):l+2)},40);return()=>clearInterval(d)}},[e]);const o=i<30?"Loading workspace...":i<70?"Preparing editor...":i<100?"Almost ready...":"Welcome!",u=[15,37,59];return r.jsxs("div",{className:"splash-root",children:[r.jsx("style",{children:He}),r.jsx("div",{className:"splash-grid"}),r.jsx("div",{className:`splash-curtain splash-curtain--top ${e>=2?"split":""}`,children:r.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),r.jsx("div",{className:`splash-curtain splash-curtain--bottom ${e>=2?"split":""}`,children:r.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),r.jsx("div",{className:`splash-scissors ${e>=1?"entering":"offscreen"} ${e>=3?"hidden":""}`,children:r.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),r.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),r.jsxs("line",{x1:"8.2",y1:"7.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[r.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),r.jsx("animate",{attributeName:"y2",values:"18;14;18",dur:"1.2s",repeatCount:"indefinite"})]}),r.jsxs("line",{x1:"8.2",y1:"16.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[r.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),r.jsx("animate",{attributeName:"y2",values:"6;10;6",dur:"1.2s",repeatCount:"indefinite"})]}),r.jsxs("circle",{cx:"13",cy:"12",r:"1",fill:"#75AADB",opacity:e>=1?"1":"0",children:[r.jsx("animate",{attributeName:"r",values:"0.5;2;0.5",dur:"0.8s",repeatCount:"indefinite"}),r.jsx("animate",{attributeName:"opacity",values:"1;0.3;1",dur:"0.8s",repeatCount:"indefinite"})]})]})}),e>=1&&e<3&&r.jsx("div",{className:"splash-sparks",children:[...Array(20)].map((d,l)=>r.jsx("div",{className:"splash-spark",style:{left:`${l*5}%`,animationDelay:`${l*.05}s`}},l))}),r.jsxs("div",{className:`splash-content ${e>=3?"visible":"hidden"}`,children:[r.jsx("div",{className:"splash-glow-orb"}),r.jsxs("div",{className:"splash-logo",children:[r.jsxs("div",{className:"splash-film-frame",children:[r.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",children:r.jsx("path",{d:"M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z",fill:"#75AADB"})}),u.map((d,l)=>r.jsx("div",{className:"splash-perf splash-perf--left",style:{top:`${d}px`}},`l${l}`)),u.map((d,l)=>r.jsx("div",{className:"splash-perf splash-perf--right",style:{top:`${d}px`}},`r${l}`))]}),r.jsx("div",{className:"splash-scissors-badge",children:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",children:[r.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),r.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),r.jsx("line",{x1:"8.5",y1:"7.5",x2:"20",y2:"18",stroke:"white",strokeWidth:"2",strokeLinecap:"round"}),r.jsx("line",{x1:"8.5",y1:"16.5",x2:"20",y2:"6",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})})]}),r.jsx("h1",{className:"splash-title",children:"ClipCut"}),r.jsx("p",{className:"splash-tagline",children:"Professional Video Suite"}),r.jsxs("div",{className:`splash-loader ${e>=4?"visible":"hidden"}`,children:[r.jsx("div",{className:"splash-loader-track",children:r.jsx("div",{className:"splash-loader-fill",style:{width:`${i}%`}})}),r.jsxs("div",{className:"splash-loader-row",children:[r.jsx("span",{className:"splash-loader-status",children:o}),r.jsxs("span",{className:"splash-loader-pct",children:[i,"%"]})]})]})]}),r.jsx("div",{className:"splash-footer",style:{opacity:e>=4?.4:0},children:r.jsx("span",{className:"splash-footer-text",children:"© 2026 ClipCut • Bokas Technologies (Pty) Ltd"})}),r.jsxs("div",{className:"splash-bw-stripe",style:{opacity:e>=4?1:0},children:[r.jsx("div",{style:{flex:1,background:"#75AADB"}}),r.jsx("div",{style:{flex:.3,background:"white"}}),r.jsx("div",{style:{flex:1,background:"#0d0d0d"}}),r.jsx("div",{style:{flex:.3,background:"white"}}),r.jsx("div",{style:{flex:1,background:"#75AADB"}})]})]})},Je=6e4;function Ke(t=Je){const{session:e,refreshSession:s,signOut:i}=G(),[n,o]=c.useState(!1),[u,d]=c.useState(0),l=c.useRef(!1),p=c.useMemo(()=>e?.expires_at?(l.current=!1,e.expires_at*1e3):null,[e?.expires_at]);return c.useEffect(()=>{if(!p){o(!1),d(0);return}const a=()=>{const v=p-Date.now();d(Math.max(0,v)),v<=t&&v>0&&o(!0),v<=0&&!l.current&&(l.current=!0,o(!1),i())};a();const _=window.setInterval(a,1e3);return()=>window.clearInterval(_)},[p,t,i]),{showWarning:n,timeRemainingMs:u,extendSession:async()=>{const a=await s();return a&&o(!1),a},logoutNow:i}}const Pt=3e4,Xe=3e3,Ot=640,Ct=768,Nt=2700,Dt=300,Mt=5;function Ze(t={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=t;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await x(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/clipcut/sw.js",{scope:"/clipcut/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||i?.()}),d.register({immediate:e}).then(a=>{o?o("/clipcut/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}function Qe(t={}){const{immediate:e=!0,onNeedRefresh:s,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=t,[d,l]=c.useState(!1),[p,f]=c.useState(!1),[a]=c.useState(()=>Ze({immediate:e,onOfflineReady(){f(!0),i?.()},onNeedRefresh(){l(!0),s?.()},onRegistered:n,onRegisteredSW:o,onRegisterError:u}));return{needRefresh:[d,l],offlineReady:[p,f],updateServiceWorker:a}}const et={position:"fixed",bottom:"72px",left:"50%",transform:"translateX(-50%)",zIndex:10001,background:"#1a2332",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"10px",padding:"10px 16px",display:"flex",alignItems:"center",gap:"12px",boxShadow:"0 8px 24px rgba(0,0,0,0.4)",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.85)",maxWidth:"calc(100vw - 32px)"},tt={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"6px 14px",fontWeight:700,fontSize:"12px",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"},rt={background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",padding:"4px",lineHeight:1,fontSize:"18px",fontFamily:"Material Symbols Outlined"},st=()=>{const{needRefresh:[t,e],updateServiceWorker:s}=Qe();return t?r.jsxs("div",{style:et,role:"alert",children:[r.jsx("span",{children:"New version available"}),r.jsx("button",{style:tt,onClick:()=>s(!0),children:"Reload"}),r.jsx("button",{style:rt,onClick:()=>e(!1),"aria-label":"Dismiss update notification",children:"close"})]}):null},nt=c.lazy(()=>x(()=>import("./CRs9M7YQ.js"),__vite__mapDeps([0,1,2,3]))),it=c.lazy(()=>x(()=>import("./Dim4Yn7Y.js"),__vite__mapDeps([4,1,5,6,7,2,3]))),ot=c.lazy(()=>x(()=>import("./BbjuDlpP.js"),__vite__mapDeps([8,1,5,6,7,2,9,3]))),at=c.lazy(()=>x(()=>import("./CcJoaJbO.js"),__vite__mapDeps([10,1,5,6,7,2,9,3]))),lt=c.lazy(()=>x(()=>import("./B4D0vkJl.js"),__vite__mapDeps([11,1,5,7,3]))),ct=c.lazy(()=>x(()=>import("./CYGA8FHy.js"),__vite__mapDeps([12,1,6,2,3]))),dt=c.lazy(()=>x(()=>import("./D-MosdpJ.js"),__vite__mapDeps([13,1,2,3]))),ut=c.lazy(()=>x(()=>import("./D2WCvqlq.js"),__vite__mapDeps([14,1,2,3]))),pt=c.lazy(()=>x(()=>import("./DQ5kcJPv.js"),__vite__mapDeps([15,1,16,6,7,3]))),ft=c.lazy(()=>x(()=>import("./BM_Ew0Tp.js").then(t=>t.V),__vite__mapDeps([17,1,6,16,7,18]))),ht=c.lazy(()=>x(()=>import("./CtQ41oYt.js"),__vite__mapDeps([19,1,18,3]))),gt=()=>r.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",backgroundColor:"#0a0a0a",color:"#75AADB",fontFamily:"Spline Sans, sans-serif"},children:r.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[r.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117, 170, 219, 0.2)",borderTopColor:"#75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),r.jsx("span",{style:{fontSize:"14px",opacity:.8},children:"Loading..."}),r.jsx("style",{children:`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}),mt=()=>{const[t,e]=c.useState(!navigator.onLine);return c.useEffect(()=>Ge(({online:s})=>e(!s)),[]),t?r.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e4,background:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",fontWeight:600,color:"white"},children:[r.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"cloud_off"}),"You're offline. Some features may be unavailable."]}):null},xt=()=>{const{showWarning:t,timeRemainingMs:e,extendSession:s,logoutNow:i}=Ke();if(!t)return null;const n=Math.max(1,Math.ceil(e/1e3));return r.jsxs("div",{style:{position:"fixed",top:"12px",right:"12px",zIndex:9999,background:"rgba(15,20,30,0.95)",border:"1px solid rgba(245, 158, 11, 0.6)",borderRadius:"10px",padding:"12px",width:"min(380px, calc(100vw - 24px))",boxShadow:"0 8px 24px rgba(0,0,0,0.35)"},children:[r.jsxs("p",{style:{color:"#f59e0b",margin:"0 0 10px",fontSize:"13px",fontWeight:700},children:["Your session is about to expire (",n,"s)"]}),r.jsxs("div",{style:{display:"flex",gap:"8px"},children:[r.jsx("button",{onClick:s,style:yt,children:"Stay signed in"}),r.jsx("button",{onClick:i,style:wt,children:"Sign out"})]})]})},bt=()=>{const[t,e]=c.useState(!0),s=X(),i=ce(),n=c.useRef(!1);return c.useEffect(()=>{n.current||(Oe(),n.current=!0)},[]),c.useEffect(()=>Ve(),[]),c.useEffect(()=>{t||(I.measurePageLoad(i.pathname),Ce(i.pathname),Ne(se.pageView,{path:i.pathname}))},[i.pathname,t]),c.useEffect(()=>{const o=setTimeout(()=>{e(!1)},Xe);return()=>clearTimeout(o)},[]),t?r.jsx(qe,{}):r.jsxs(r.Fragment,{children:[r.jsx(mt,{}),r.jsx(xt,{}),r.jsx(st,{}),r.jsx(c.Suspense,{fallback:r.jsx(gt,{}),children:r.jsxs(de,{children:[r.jsx(E,{path:"/",element:r.jsx(D,{children:r.jsx(w,{name:"landing",message:"Landing page failed to load",onReset:()=>s("/"),children:r.jsx(nt,{})})})}),r.jsx(E,{path:"/login",element:r.jsx(D,{children:r.jsx(w,{name:"login",message:"Login failed to load",onReset:()=>s("/login"),children:r.jsx(it,{onNavigateToRegister:()=>s("/register")})})})}),r.jsx(E,{path:"/register",element:r.jsx(D,{children:r.jsx(w,{name:"register",message:"Registration failed to load",onReset:()=>s("/register"),children:r.jsx(ot,{onNavigateToLogin:()=>s("/login")})})})}),r.jsx(E,{path:"/reset-password",element:r.jsx(D,{children:r.jsx(w,{name:"reset-password",message:"Password reset failed to load",onReset:()=>s("/reset-password"),children:r.jsx(at,{})})})}),r.jsx(E,{path:"/verify-email",element:r.jsx(j,{children:r.jsx(w,{name:"verify-email",message:"Email verification failed to load",onReset:()=>s("/verify-email"),children:r.jsx(lt,{})})})}),r.jsx(E,{path:"/onboarding/1",element:r.jsx(j,{children:r.jsx(w,{name:"onboarding",onReset:()=>s("/onboarding/1"),children:r.jsx(ct,{onContinue:()=>s("/onboarding/2"),onSkip:()=>s("/onboarding/2"),onSkipAll:()=>s("/dashboard")})})})}),r.jsx(E,{path:"/onboarding/2",element:r.jsx(j,{children:r.jsx(w,{name:"onboarding",onReset:()=>s("/onboarding/2"),children:r.jsx(dt,{onContinue:()=>s("/onboarding/3"),onSkip:()=>s("/onboarding/3"),onSkipAll:()=>s("/dashboard")})})})}),r.jsx(E,{path:"/onboarding/3",element:r.jsx(j,{children:r.jsx(w,{name:"onboarding",onReset:()=>s("/onboarding/3"),children:r.jsx(ut,{onComplete:()=>s("/dashboard"),onSkip:()=>s("/dashboard")})})})}),r.jsx(E,{path:"/dashboard",element:r.jsx(j,{children:r.jsx(w,{name:"dashboard",message:"Dashboard failed to load",onReset:()=>s("/dashboard"),children:r.jsx(pt,{})})})}),r.jsx(E,{path:"/editor",element:r.jsx(j,{children:r.jsx(w,{name:"editor",message:"Video editor encountered an error",onReset:()=>s("/editor"),children:r.jsx(ft,{})})})}),r.jsx(E,{path:"/long-to-shorts",element:r.jsx(j,{children:r.jsx(w,{name:"long-to-shorts",message:"AI Shorts feature encountered an error",onReset:()=>s("/long-to-shorts"),children:r.jsx(ht,{})})})})]})})]})},yt={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"8px 10px",fontWeight:700,cursor:"pointer"},wt={background:"transparent",color:"rgba(255,255,255,0.75)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"6px",padding:"8px 10px",fontWeight:600,cursor:"pointer"},vt="/clipcut/".replace(/\/$/,"")||void 0,Et=()=>r.jsx(w,{children:r.jsx(Ee,{children:r.jsx(le,{basename:vt,children:r.jsx(bt,{})})})});function St(t={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:i,onRegistered:n,onRegisteredSW:o,onRegisterError:u}=t;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await x(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/clipcut/sw.js",{scope:"/clipcut/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||i?.()}),d.register({immediate:e}).then(a=>{o?o("/clipcut/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}Ie();Pe();St({onNeedRefresh(){O.info("[PWA] New content available, refresh to update")},onOfflineReady(){O.info("[PWA] App ready to work offline")},onRegistered(t){O.info("[PWA] Service worker registered"),t&&setInterval(()=>{t.update()},60*60*1e3)},onRegisterError(t){O.error("[PWA] Service worker registration failed",{error:t})}});ue.createRoot(document.getElementById("root")).render(r.jsx(pe.StrictMode,{children:r.jsx(Et,{})}));export{Pt as A,Mt as D,w as E,Ot as M,Nt as T,x as _,Le as a,se as b,$ as c,N as d,Dt as e,Ct as f,It as g,Rt as h,ne as i,Tt as j,At as k,O as l,m,Lt as r,T as s,Ne as t,G as u};
