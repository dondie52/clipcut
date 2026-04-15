const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/0iOtmmVZ.js","assets/DwQPoapS.js","assets/D8AsaMNA.js","assets/DZxFKcQQ.js","assets/OSJL0nUA.js","assets/CYKVCrVo.js","assets/Et-wlZO3.js","assets/B9CjrYEi.js","assets/Bjy11rLs.js","assets/Cf6dk1K3.js","assets/Du2T0qh6.js","assets/CIBvp6Tu.js","assets/CIXluiu1.js","assets/CKcEtug2.js","assets/CNm7saxt.js","assets/DUsLMcDf.js","assets/DJ9BIwgN.js","assets/DDR49Yqv.js","assets/BapYfaw2.js","assets/DieoeE0E.js"])))=>i.map(i=>d[i]);
var re=Object.defineProperty;var se=(r,e,s)=>e in r?re(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s;var G=(r,e,s)=>se(r,typeof e!="symbol"?e+"":e,s);import{r as c,j as t,N as q,u as K,B as ne,a as oe,R as ie,b as E,c as ae,d as le}from"./DwQPoapS.js";import{c as ce}from"./DZxFKcQQ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const de="modulepreload",ue=function(r){return"/"+r},Y={},x=function(e,s,o){let n=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),d=u?.nonce||u?.getAttribute("nonce");n=Promise.allSettled(s.map(l=>{if(l=ue(l),l in Y)return;Y[l]=!0;const p=l.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const a=document.createElement("link");if(a.rel=p?"stylesheet":de,p||(a.as="script"),a.crossOrigin="",a.href=l,d&&a.setAttribute("nonce",d),document.head.appendChild(a),p)return new Promise((S,v)=>{a.addEventListener("load",S),a.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(u){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=u,window.dispatchEvent(d),!d.defaultPrevented)throw u}return n.then(u=>{for(const d of u||[])d.status==="rejected"&&i(d.reason);return e().catch(i)})},pe=void 0,fe=void 0,A=[];A.push("VITE_SUPABASE_URL is not set");A.push("VITE_SUPABASE_ANON_KEY is not set");if(A.length>0){const r=`Supabase configuration error:
`+A.map(e=>`  - ${e}`).join(`
`)+`

Please copy env.example to .env and fill in your credentials.`;throw new Error(r)}const he="http://127.0.0.1:54321",ge="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjowfQ.invalid",me=A.length===0?pe:he,xe=A.length===0?fe:ge,T=ce(me,xe,{auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"pkce"},global:{headers:{"X-Client-Info":"clipcut-web"}}});function _t(){return A.length===0}const F={INACTIVITY_TIMEOUT_MS:30*60*1e3,TOKEN_REFRESH_BUFFER_MS:5*60*1e3,VALIDATION_INTERVAL_MS:60*1e3},J=c.createContext({user:null,session:null,loading:!0,signOut:async()=>{},refreshSession:async()=>{},isSessionValid:!1});function be({children:r}){const[e,s]=c.useState(null),[o,n]=c.useState(null),[i,u]=c.useState(!0),[d,l]=c.useState(!1),p=c.useRef(Date.now()),f=c.useRef(null),a=c.useRef(null),S=c.useCallback(h=>{if(!h?.expires_at)return!1;const m=h.expires_at*1e3,b=Date.now();return m-b<F.TOKEN_REFRESH_BUFFER_MS},[]),v=c.useCallback(async()=>{try{const{data:{session:h},error:m}=await T.auth.getSession();if(m)return console.warn("Session validation error:",m.message),l(!1),!1;if(!h)return l(!1),!1;if(S(h)){const{data:{session:b},error:j}=await T.auth.refreshSession();if(j)return console.warn("Session refresh failed:",j.message),l(!1),!1;b&&(n(b),s(b.user))}return l(!0),!0}catch(h){return console.warn("Session validation failed:",h),l(!1),!1}},[S]),P=c.useCallback(async()=>{f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current);try{await T.auth.signOut()}catch(h){console.warn("Sign out error:",h)}s(null),n(null),l(!1)},[]),C=c.useRef(o);c.useEffect(()=>{C.current=o},[o]);const R=c.useCallback(()=>{p.current=Date.now(),f.current&&clearTimeout(f.current),C.current&&(f.current=setTimeout(async()=>{console.info("Session expired due to inactivity"),await P()},F.INACTIVITY_TIMEOUT_MS))},[P]),te=c.useCallback(async()=>{try{const{data:{session:h},error:m}=await T.auth.refreshSession();if(m)throw m;return h?(n(h),s(h.user),l(!0),!0):!1}catch(h){return console.warn("Manual session refresh failed:",h),l(!1),!1}},[]);return c.useEffect(()=>{let h=!0;T.auth.getSession().then(({data:{session:b}})=>{h&&(n(b),s(b?.user??null),l(!!b),u(!1),b&&R())});const{data:{subscription:m}}=T.auth.onAuthStateChange((b,j)=>{if(h)switch(n(j),s(j?.user??null),l(!!j),u(!1),b){case"SIGNED_IN":R();break;case"SIGNED_OUT":f.current&&clearTimeout(f.current);break;case"TOKEN_REFRESHED":l(!0);break}});return()=>{h=!1,m.unsubscribe(),f.current&&clearTimeout(f.current),a.current&&clearInterval(a.current)}},[R]),c.useEffect(()=>{if(!o)return;const h=["mousedown","keydown","scroll","touchstart"];return h.forEach(m=>{window.addEventListener(m,R,{passive:!0})}),()=>{h.forEach(m=>{window.removeEventListener(m,R)})}},[o,R]),c.useEffect(()=>{if(o)return a.current=setInterval(()=>{v()},F.VALIDATION_INTERVAL_MS),()=>{a.current&&clearInterval(a.current)}},[o,v]),t.jsx(J.Provider,{value:{user:e,session:o,loading:i,signOut:P,refreshSession:te,isSessionValid:d},children:r})}function $(){const r=c.useContext(J);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r}const X=()=>t.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Spline Sans', sans-serif"},children:[t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117,170,219,0.2)",borderTop:"3px solid #75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}),t.jsx("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:"Loading..."})]}),t.jsx("style",{children:`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `})]});function k({children:r}){const{user:e,loading:s}=$();return s?t.jsx(X,{}):e?r:t.jsx(q,{to:"/login",replace:!0})}function N({children:r}){const{user:e,loading:s}=$();return s?t.jsx(X,{}):e?t.jsx(q,{to:"/dashboard",replace:!0}):r}const g={LCP:"lcp",FID:"fid",CLS:"cls",FCP:"fcp",TTFB:"ttfb",PAGE_LOAD:"page_load",ROUTE_CHANGE:"route_change",VIDEO_TRIM:"video_trim",VIDEO_SPLIT:"video_split",VIDEO_MERGE:"video_merge",VIDEO_EXPORT:"video_export",VIDEO_THUMBNAIL:"video_thumbnail",VIDEO_PREVIEW:"video_preview",API_REQUEST:"api_request",API_UPLOAD:"api_upload",API_DOWNLOAD:"api_download",USER_INTERACTION:"user_interaction"},ye={LCP:{good:2500,needsImprovement:4e3},FID:{good:100,needsImprovement:300},CLS:{good:.1,needsImprovement:.25},FCP:{good:1800,needsImprovement:3e3},TTFB:{good:800,needsImprovement:1800},PAGE_LOAD:{good:3e3,needsImprovement:5e3},VIDEO_TRIM:{good:3e4,needsImprovement:6e4},VIDEO_EXPORT:{good:12e4,needsImprovement:24e4}};function we(r,e){const s=ye[r];return s?e<=s.good?"good":e<=s.needsImprovement?"needs-improvement":"poor":"unknown"}class ve{constructor(){this.metrics=[],this.observers=new Map,this.isEnabled=typeof window<"u"&&"PerformanceObserver"in window,this.isEnabled&&this.initCoreWebVitals()}initCoreWebVitals(){try{const e=new PerformanceObserver(s=>{const o=s.getEntries(),n=o[o.length-1];this.recordMetric(g.LCP,n.renderTime||n.loadTime,{element:n.element?.tagName||"unknown",url:n.url||""})});e.observe({entryTypes:["largest-contentful-paint"]}),this.observers.set("lcp",e)}catch(e){console.warn("[Performance] LCP observer not supported:",e)}try{const e=new PerformanceObserver(s=>{s.getEntries().forEach(n=>{this.recordMetric(g.FID,n.processingStart-n.startTime,{eventType:n.name,target:n.target?.tagName||"unknown"})})});e.observe({entryTypes:["first-input"]}),this.observers.set("fid",e)}catch(e){console.warn("[Performance] FID observer not supported:",e)}try{let e=0;const s=new PerformanceObserver(o=>{const n=o.getEntries();n.forEach(i=>{i.hadRecentInput||(e+=i.value)}),this.recordMetric(g.CLS,e,{sources:n.length})});s.observe({entryTypes:["layout-shift"]}),this.observers.set("cls",s)}catch(e){console.warn("[Performance] CLS observer not supported:",e)}try{const e=new PerformanceObserver(s=>{s.getEntries().forEach(n=>{n.name==="first-contentful-paint"&&this.recordMetric(g.FCP,n.startTime,{})})});e.observe({entryTypes:["paint"]}),this.observers.set("fcp",e)}catch(e){console.warn("[Performance] FCP observer not supported:",e)}try{const e=new PerformanceObserver(s=>{s.getEntries().forEach(n=>{if(n.entryType==="navigation"){const i=n.responseStart-n.requestStart;this.recordMetric(g.TTFB,i,{url:n.name})}})});e.observe({entryTypes:["navigation"]}),this.observers.set("ttfb",e)}catch(e){console.warn("[Performance] TTFB observer not supported:",e)}}recordMetric(e,s,o={}){if(!this.isEnabled)return;const n={type:e,value:s,rating:we(e,s),timestamp:Date.now(),url:typeof window<"u"?window.location.pathname:"",userAgent:typeof navigator<"u"?navigator.userAgent:"",...o};this.metrics.push(n),this.metrics.length>100&&this.metrics.shift(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("performance-metric",{detail:n}))}startTiming(e,s,o={}){const n=performance.now(),i=`perf_${e}_start`;return this.isEnabled&&performance.mark(i),(u={})=>{const l=performance.now()-n,p=`perf_${e}_end`;return this.isEnabled&&(performance.mark(p),performance.measure(`perf_${e}`,i,p)),this.recordMetric(s,l,{...o,...u,operationId:e}),l}}measurePageLoad(e){!this.isEnabled||typeof window>"u"||window.addEventListener("load",()=>{const s=performance.getEntriesByType("navigation")[0];if(s){const o=s.loadEventEnd-s.fetchStart;this.recordMetric(g.PAGE_LOAD,o,{route:e,domContentLoaded:s.domContentLoadedEventEnd-s.fetchStart,domInteractive:s.domInteractive-s.fetchStart})}},{once:!0})}measureRouteChange(e,s,o){this.recordMetric(g.ROUTE_CHANGE,o,{fromRoute:e,toRoute:s})}getMetrics(e=null){return e?this.metrics.filter(s=>s.type===e):[...this.metrics]}getSummary(){const e={};return Object.values(g).forEach(s=>{const o=this.metrics.filter(n=>n.type===s);if(o.length>0){const n=o.map(i=>i.value);e[s]={count:o.length,avg:n.reduce((i,u)=>i+u,0)/n.length,min:Math.min(...n),max:Math.max(...n),latest:o[o.length-1]}}}),e}clear(){this.metrics=[]}cleanup(){this.observers.forEach(e=>{try{e.disconnect()}catch{}}),this.observers.clear()}}const I=new ve;async function St(r,e,s={}){const o=`${r}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=I.startTiming(o,r,{...s,operation:r});try{const i=await e();return n({success:!0}),i}catch(i){throw n({success:!1,error:i.message}),i}}async function jt(r,e,s={}){const o=`api_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=I.startTiming(o,g.API_REQUEST,{endpoint:r,...s});try{const i=await e();return n({success:!0}),i}catch(i){throw n({success:!1,error:i.message,statusCode:i.status}),i}}async function kt(r,e,s,o={}){const n=`upload_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,i=I.startTiming(n,g.API_UPLOAD,{filename:r,fileSize:e,...o});try{const u=await s(),d=i({success:!0}),l=e/(d/1e3);return I.recordMetric(g.API_UPLOAD,d,{filename:r,fileSize:e,speed:l,...o}),u}catch(u){throw i({success:!1,error:u.message}),u}}typeof window<"u"&&I.measurePageLoad(window.location.pathname);const W={debug:10,info:20,warn:30,error:40},Ee="info",H=void 0,Q=W[H]?H:Ee,_e=r=>r?{name:r.name,message:r.message,stack:r.stack}:null,D=(r,e,s={})=>({timestamp:new Date().toISOString(),level:r,message:e,app:"clipcut",env:"production",metadata:{...s,error:s.error instanceof Error?_e(s.error):s.error}}),M=r=>W[r]>=W[Q],B=r=>{const e=JSON.stringify(r);if(r.level==="error"){console.error(e);return}if(r.level==="warn"){console.warn(e);return}if(r.level==="debug"){console.debug(e);return}console.log(e)},O={level:Q,debug(r,e){M("debug")&&B(D("debug",r,e))},info(r,e){M("info")&&B(D("info",r,e))},warn(r,e){M("warn")&&B(D("warn",r,e))},error(r,e){M("error")&&B(D("error",r,e))}},_=()=>{},Se={setTag:_,setExtra:_,setLevel:_,setFingerprint:_};let je={init:_,withScope:r=>r(Se),captureException:_,captureMessage:_,setUser:_,addBreadcrumb:_};async function ke(){{console.warn("[ErrorTracking] Sentry DSN not configured. Error tracking disabled.");return}}function z(r,e={}){{console.error("[ErrorTracking] Error captured but Sentry not configured:",r);return}}function Ae(r){je.addBreadcrumb({timestamp:Date.now()/1e3,...r})}function Re(){window.onerror=(r,e,s,o,n)=>(z(n||new Error(r),{}),!1),window.addEventListener("unhandledrejection",r=>{const e=r.reason instanceof Error?r.reason:new Error(String(r.reason));z(e,{extra:{reason:r.reason}})}),console.log("[ErrorTracking] Global error handlers set up")}async function Te(){{console.warn("[Analytics] GA Measurement ID not configured. Analytics disabled.");return}}function Ie(r,e){U(Z.pageView,{})}function Pe(r,e,s,o){typeof e=="object"&&e!==null&&!Array.isArray(e)?U(r,e):typeof e=="string"||U(r,{})}async function U(r,e={}){}const Z={pageView:"page_view",coreWebVital:"core_web_vital",loginAttempt:"login_attempt",loginSuccess:"login_success",loginFailure:"login_failure",passwordResetRequested:"password_reset_requested",registerAttempt:"register_attempt",registerSuccess:"register_success",registerFailure:"register_failure",googleSignInAttempt:"google_sign_in_attempt",onboardingStart:"onboarding_start",onboardingContinue:"onboarding_continue",onboardingSkip:"onboarding_skip",onboardingComplete:"onboarding_complete",dashboardNewProjectClick:"dashboard_new_project_click",dashboardFileImport:"dashboard_file_import",dashboardProjectOpen:"dashboard_project_open",dashboardProjectDelete:"dashboard_project_delete",dashboardAIFeatureSelect:"dashboard_ai_feature_select",dashboardToolSelect:"dashboard_tool_select"},Le=new Set([g.LCP,g.FID,g.CLS]);let L=null;async function Oe(r){}function Ce(){if(typeof window>"u")return()=>{};if(L)return L;const r=e=>{const s=e.detail;!s||!Le.has(s.type)||(s.type,Number(s.value),s.rating,s.timestamp||Date.now(),Oe())};return window.addEventListener("performance-metric",r),L=()=>{window.removeEventListener("performance-metric",r),L=null},L}function ee(r){if(!r)return!1;const e=(r.message||"").toLowerCase();return e.includes("failed to fetch")||e.includes("network request failed")||e.includes("networkerror")||e.includes("net::err_")||e.includes("load failed")||e.includes("network error")||e.includes("econnrefused")||e.includes("econnreset")||e.includes("etimedout")||r.name==="TypeError"&&e.includes("fetch")||!navigator.onLine}function Ne(r){if(!r)return!1;const e=(r.message||"").toLowerCase(),s=r.status||r.statusCode;return s===401||s===403||e.includes("jwt expired")||e.includes("invalid token")||e.includes("token expired")||e.includes("refresh_token")||e.includes("not authenticated")||e.includes("invalid credentials")||e.includes("invalid login")||e.includes("email not confirmed")||e.includes("session expired")||e.includes("unauthorized")}function De(r){if(!r)return!1;const e=(r.message||"").toLowerCase();return e.includes("ffmpeg")||e.includes("wasm")||e.includes("sharedarraybuffer")||e.includes("out of memory")||e.includes("oom")||e.includes("memory access out of bounds")||e.includes("cross-origin isolation")}function Me(r){if(!r)return!1;const e=(r.message||"").toLowerCase();return e.includes("upload")||e.includes("file too large")||e.includes("file type not allowed")||e.includes("storage")||e.includes("bucket")||e.includes("quota exceeded")||r.name==="AbortError"}function Be(r){if(!r)return!1;if(ee(r))return!0;const e=r.status||r.statusCode;if(e>=500&&e<600||e===429)return!0;const s=(r.message||"").toLowerCase();return!!(s.includes("timeout")||s.includes("timed out"))}const Fe={"invalid login credentials":"Incorrect email or password. Please try again.","email not confirmed":"Please verify your email address before signing in. Check your inbox.","user already registered":"An account with this email already exists. Try signing in instead.","signup disabled":"Registration is currently unavailable. Please try again later.","email rate limit exceeded":"Too many attempts. Please wait a few minutes before trying again.","invalid email":"Please enter a valid email address.","weak password":"Your password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.","jwt expired":"Your session has expired. Please sign in again.",refresh_token_not_found:"Your session has expired. Please sign in again.","invalid token":"Your session is no longer valid. Please sign in again.","user not found":"No account found with this email address.",popup_closed_by_user:"Sign-in was cancelled. Please try again.",oauth_error:"Authentication service error. Please try again."},Ve={sharedarraybuffer:"Your browser does not support video processing. Try using Chrome or Edge.","cross-origin isolation":"Video processing requires special browser settings. Try refreshing the page.","out of memory":"The video is too large to process in your browser. Try a shorter clip or lower resolution.","memory access out of bounds":"Video processing ran out of memory. Try closing other tabs and retry.",wasm:"Failed to load the video engine. Please refresh the page.",ffmpeg:"Video processing failed. Please try again with a different file."},We={"file too large":"This file exceeds the maximum upload size (500 MB). Try compressing or trimming it first.","file type not allowed":"This file format is not supported. Accepted formats: MP4, WebM, MOV, AVI, MP3, WAV, JPEG, PNG.","quota exceeded":"Storage is full. Delete some old projects to free up space.","bucket not found":"Cloud storage is temporarily unavailable. Please try again later."};function At(r,e){if(!r)return"An unexpected error occurred. Please try again.";const s=typeof r=="string"?r:r.message||"",o=s.toLowerCase();if(ee(typeof r=="string"?new Error(r):r)||!navigator.onLine)return"Unable to connect. Please check your internet connection and try again.";if(e==="auth"||Ne(typeof r=="string"?new Error(r):r)){for(const[n,i]of Object.entries(Fe))if(o.includes(n))return i;return o.includes("locked")||o.includes("lockout")?s:"Authentication failed. Please try again."}if(e==="ffmpeg"||De(typeof r=="string"?new Error(r):r)){for(const[n,i]of Object.entries(Ve))if(o.includes(n))return i;return"Video processing failed. Please try a different file or refresh the page."}if(e==="upload"||Me(typeof r=="string"?new Error(r):r)){if(typeof r!="string"&&r.name==="AbortError")return"Upload was cancelled.";for(const[n,i]of Object.entries(We))if(o.includes(n))return i;return"Upload failed. Please check your connection and try again."}return e==="project"?o.includes("access denied")?"You do not have permission to access this project.":o.includes("not found")?"This project could not be found. It may have been deleted.":"Failed to save or load your project. Please try again.":o.includes("timeout")||o.includes("timed out")?"The request took too long. Please try again.":s.length<150&&!s.includes(`
`)&&!s.includes("  at ")?s:"Something went wrong. Please try again."}async function Rt(r,e={}){const{maxRetries:s=3,baseDelay:o=1e3,maxDelay:n=1e4,shouldRetry:i=Be,onRetry:u,signal:d}=e;let l;for(let p=0;p<=s;p++){if(d?.aborted)throw new DOMException("Operation aborted","AbortError");try{return await r(p)}catch(f){if(l=f,f.name==="AbortError")throw f;if(p>=s||!i(f))break;const a=Math.min(o*Math.pow(2,p)+Math.random()*500,n);u&&u({error:f,attempt:p+1,delay:a}),await new Promise((S,v)=>{const P=setTimeout(S,a);if(d){const C=()=>{clearTimeout(P),v(new DOMException("Operation aborted","AbortError"))};d.addEventListener("abort",C,{once:!0})}})}}throw l}let V=[];function ze(r){const e=()=>r({online:!0}),s=()=>r({online:!1});return window.addEventListener("online",e),window.addEventListener("offline",s),V.push({handleOnline:e,handleOffline:s}),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",s),V=V.filter(o=>o.handleOnline!==e)}}class w extends c.Component{constructor(s){super(s);G(this,"handleReset",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null,eventId:null}}static getDerivedStateFromError(s){return{hasError:!0,error:s}}componentDidCatch(s,o){O.error("ErrorBoundary caught an error",{error:s,errorInfo:o}),this.setState({errorInfo:o}),Ae({category:"error_boundary",message:`Error caught in "${this.props.name||"root"}": ${s.message}`,level:"error"}),z(s,{tags:{boundary:this.props.name||"root"},extra:{componentStack:o?.componentStack}})}render(){return this.state.hasError?this.props.fallback?this.props.fallback:this.props.renderFallback?this.props.renderFallback(this.state.error,this.handleReset):this.props.inline?t.jsx("div",{style:y.inlineContainer,children:t.jsxs("div",{style:y.inlineCard,children:[t.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"28px",color:"#ef4444"},children:"error_outline"}),t.jsxs("div",{style:{flex:1},children:[t.jsx("p",{style:{color:"#ffffff",fontSize:"14px",fontWeight:600,margin:"0 0 4px"},children:this.props.message||"This section encountered an error"}),t.jsx("p",{style:{color:"#94a3b8",fontSize:"12px",margin:0},children:"Try again or reload the page."})]}),t.jsx("button",{onClick:this.handleReset,style:y.inlineButton,children:"Retry"})]})}):t.jsx("div",{style:y.container,children:t.jsxs("div",{style:y.card,children:[t.jsx("div",{style:y.iconWrapper,children:t.jsx("span",{className:"material-symbols-outlined",style:y.icon,children:"error_outline"})}),t.jsx("h1",{style:y.title,children:this.props.message||"Something went wrong"}),t.jsx("p",{style:y.message,children:"We're sorry, but something unexpected happened. Please try refreshing the page or go back to the dashboard."}),!1,t.jsxs("div",{style:y.buttonGroup,children:[t.jsx("button",{onClick:this.handleReset,style:y.primaryButton,children:"Try Again"}),t.jsx("button",{onClick:()=>window.location.href="/dashboard",style:y.secondaryButton,children:"Go to Dashboard"})]})]})}):this.props.children}}const y={container:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",fontFamily:"'Spline Sans', sans-serif",padding:"20px"},card:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"48px",maxWidth:"480px",width:"100%",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},iconWrapper:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(239, 68, 68, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"},icon:{fontSize:"36px",color:"#ef4444"},title:{color:"#ffffff",fontSize:"24px",fontWeight:600,margin:"0 0 12px"},message:{color:"#94a3b8",fontSize:"14px",lineHeight:1.6,margin:"0 0 24px"},buttonGroup:{display:"flex",gap:"12px",justifyContent:"center"},primaryButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"transform 0.15s ease, box-shadow 0.15s ease"},secondaryButton:{background:"rgba(255,255,255,0.05)",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:500,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},inlineContainer:{display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",width:"100%",height:"100%",minHeight:"120px",background:"#0e1820"},inlineCard:{display:"flex",alignItems:"center",gap:"14px",background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:"12px",padding:"16px 20px",maxWidth:"420px",width:"100%"},inlineButton:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"white",border:"none",borderRadius:"8px",padding:"8px 18px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",whiteSpace:"nowrap"}},Ue=`
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
`,$e=()=>{const r=K(),[e,s]=c.useState(0);c.useEffect(()=>{const d=[setTimeout(()=>s(1),500),setTimeout(()=>s(2),1500),setTimeout(()=>s(3),2200),setTimeout(()=>s(4),3e3),setTimeout(()=>s(5),5500),setTimeout(()=>r("/login"),6500)];return()=>d.forEach(clearTimeout)},[r]);const[o,n]=c.useState(0);c.useEffect(()=>{if(e>=4){const d=setInterval(()=>{n(l=>l>=100?(clearInterval(d),100):l+2)},40);return()=>clearInterval(d)}},[e]);const i=o<30?"Loading workspace...":o<70?"Preparing editor...":o<100?"Almost ready...":"Welcome!",u=[15,37,59];return t.jsxs("div",{className:"splash-root",children:[t.jsx("style",{children:Ue}),t.jsx("div",{className:"splash-grid"}),t.jsx("div",{className:`splash-curtain splash-curtain--top ${e>=2?"split":""}`,children:t.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),t.jsx("div",{className:`splash-curtain splash-curtain--bottom ${e>=2?"split":""}`,children:t.jsx("div",{className:`splash-cut-edge ${e>=1?"glow":""}`})}),t.jsx("div",{className:`splash-scissors ${e>=1?"entering":"offscreen"} ${e>=3?"hidden":""}`,children:t.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),t.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"#75AADB",strokeWidth:"1.5",fill:"none"}),t.jsxs("line",{x1:"8.2",y1:"7.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[t.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"y2",values:"18;14;18",dur:"1.2s",repeatCount:"indefinite"})]}),t.jsxs("line",{x1:"8.2",y1:"16.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",children:[t.jsx("animate",{attributeName:"x2",values:"20;16;20",dur:"1.2s",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"y2",values:"6;10;6",dur:"1.2s",repeatCount:"indefinite"})]}),t.jsxs("circle",{cx:"13",cy:"12",r:"1",fill:"#75AADB",opacity:e>=1?"1":"0",children:[t.jsx("animate",{attributeName:"r",values:"0.5;2;0.5",dur:"0.8s",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"opacity",values:"1;0.3;1",dur:"0.8s",repeatCount:"indefinite"})]})]})}),e>=1&&e<3&&t.jsx("div",{className:"splash-sparks",children:[...Array(20)].map((d,l)=>t.jsx("div",{className:"splash-spark",style:{left:`${l*5}%`,animationDelay:`${l*.05}s`}},l))}),t.jsxs("div",{className:`splash-content ${e>=3?"visible":"hidden"}`,children:[t.jsx("div",{className:"splash-glow-orb"}),t.jsxs("div",{className:"splash-logo",children:[t.jsxs("div",{className:"splash-film-frame",children:[t.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",children:t.jsx("path",{d:"M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z",fill:"#75AADB"})}),u.map((d,l)=>t.jsx("div",{className:"splash-perf splash-perf--left",style:{top:`${d}px`}},`l${l}`)),u.map((d,l)=>t.jsx("div",{className:"splash-perf splash-perf--right",style:{top:`${d}px`}},`r${l}`))]}),t.jsx("div",{className:"splash-scissors-badge",children:t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",children:[t.jsx("circle",{cx:"6",cy:"6",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),t.jsx("circle",{cx:"6",cy:"18",r:"2.5",stroke:"white",strokeWidth:"2",fill:"none"}),t.jsx("line",{x1:"8.5",y1:"7.5",x2:"20",y2:"18",stroke:"white",strokeWidth:"2",strokeLinecap:"round"}),t.jsx("line",{x1:"8.5",y1:"16.5",x2:"20",y2:"6",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})})]}),t.jsx("h1",{className:"splash-title",children:"ClipCut"}),t.jsx("p",{className:"splash-tagline",children:"Professional Video Suite"}),t.jsxs("div",{className:`splash-loader ${e>=4?"visible":"hidden"}`,children:[t.jsx("div",{className:"splash-loader-track",children:t.jsx("div",{className:"splash-loader-fill",style:{width:`${o}%`}})}),t.jsxs("div",{className:"splash-loader-row",children:[t.jsx("span",{className:"splash-loader-status",children:i}),t.jsxs("span",{className:"splash-loader-pct",children:[o,"%"]})]})]})]}),t.jsx("div",{className:"splash-footer",style:{opacity:e>=4?.4:0},children:t.jsx("span",{className:"splash-footer-text",children:"© 2026 ClipCut • Bokas Technologies (Pty) Ltd"})}),t.jsxs("div",{className:"splash-bw-stripe",style:{opacity:e>=4?1:0},children:[t.jsx("div",{style:{flex:1,background:"#75AADB"}}),t.jsx("div",{style:{flex:.3,background:"white"}}),t.jsx("div",{style:{flex:1,background:"#0d0d0d"}}),t.jsx("div",{style:{flex:.3,background:"white"}}),t.jsx("div",{style:{flex:1,background:"#75AADB"}})]})]})},Ge=6e4;function Ye(r=Ge){const{session:e,refreshSession:s,signOut:o}=$(),[n,i]=c.useState(!1),[u,d]=c.useState(0),l=c.useRef(!1),p=c.useMemo(()=>e?.expires_at?(l.current=!1,e.expires_at*1e3):null,[e?.expires_at]);return c.useEffect(()=>{if(!p){i(!1),d(0);return}const a=()=>{const v=p-Date.now();d(Math.max(0,v)),v<=r&&v>0&&i(!0),v<=0&&!l.current&&(l.current=!0,i(!1),o())};a();const S=window.setInterval(a,1e3);return()=>window.clearInterval(S)},[p,r,o]),{showWarning:n,timeRemainingMs:u,extendSession:async()=>{const a=await s();return a&&i(!1),a},logoutNow:o}}const Tt=3e4,He=3e3,It=640,Pt=768,Lt=2700,Ot=300,Ct=5;function qe(r={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:o,onRegistered:n,onRegisteredSW:i,onRegisterError:u}=r;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await x(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/sw.js",{scope:"/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||o?.()}),d.register({immediate:e}).then(a=>{i?i("/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}function Ke(r={}){const{immediate:e=!0,onNeedRefresh:s,onOfflineReady:o,onRegistered:n,onRegisteredSW:i,onRegisterError:u}=r,[d,l]=c.useState(!1),[p,f]=c.useState(!1),[a]=c.useState(()=>qe({immediate:e,onOfflineReady(){f(!0),o?.()},onNeedRefresh(){l(!0),s?.()},onRegistered:n,onRegisteredSW:i,onRegisterError:u}));return{needRefresh:[d,l],offlineReady:[p,f],updateServiceWorker:a}}const Je={position:"fixed",bottom:"72px",left:"50%",transform:"translateX(-50%)",zIndex:10001,background:"#1a2332",border:"1px solid rgba(117,170,219,0.3)",borderRadius:"10px",padding:"10px 16px",display:"flex",alignItems:"center",gap:"12px",boxShadow:"0 8px 24px rgba(0,0,0,0.4)",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.85)",maxWidth:"calc(100vw - 32px)"},Xe={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"6px 14px",fontWeight:700,fontSize:"12px",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"},Qe={background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",padding:"4px",lineHeight:1,fontSize:"18px",fontFamily:"Material Symbols Outlined"},Ze=()=>{const{needRefresh:[r,e],updateServiceWorker:s}=Ke();return r?t.jsxs("div",{style:Je,role:"alert",children:[t.jsx("span",{children:"New version available"}),t.jsx("button",{style:Xe,onClick:()=>s(!0),children:"Reload"}),t.jsx("button",{style:Qe,onClick:()=>e(!1),"aria-label":"Dismiss update notification",children:"close"})]}):null},et=c.lazy(()=>x(()=>import("./0iOtmmVZ.js"),__vite__mapDeps([0,1,2,3]))),tt=c.lazy(()=>x(()=>import("./OSJL0nUA.js"),__vite__mapDeps([4,1,5,6,7,2,3]))),rt=c.lazy(()=>x(()=>import("./Bjy11rLs.js"),__vite__mapDeps([8,1,5,6,7,2,9,3]))),st=c.lazy(()=>x(()=>import("./Du2T0qh6.js"),__vite__mapDeps([10,1,5,6,7,2,9,3]))),nt=c.lazy(()=>x(()=>import("./CIBvp6Tu.js"),__vite__mapDeps([11,1,5,7,3]))),ot=c.lazy(()=>x(()=>import("./CIXluiu1.js"),__vite__mapDeps([12,1,6,2,3]))),it=c.lazy(()=>x(()=>import("./CKcEtug2.js"),__vite__mapDeps([13,1,2,3]))),at=c.lazy(()=>x(()=>import("./CNm7saxt.js"),__vite__mapDeps([14,1,2,3]))),lt=c.lazy(()=>x(()=>import("./DUsLMcDf.js"),__vite__mapDeps([15,1,16,6,7,3]))),ct=c.lazy(()=>x(()=>import("./DDR49Yqv.js").then(r=>r.V),__vite__mapDeps([17,1,6,16,7,18]))),dt=c.lazy(()=>x(()=>import("./DieoeE0E.js"),__vite__mapDeps([19,1,18,3]))),ut=()=>t.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",backgroundColor:"#0a0a0a",color:"#75AADB",fontFamily:"Spline Sans, sans-serif"},children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[t.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(117, 170, 219, 0.2)",borderTopColor:"#75AADB",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),t.jsx("span",{style:{fontSize:"14px",opacity:.8},children:"Loading..."}),t.jsx("style",{children:`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}),pt=()=>{const[r,e]=c.useState(!navigator.onLine);return c.useEffect(()=>ze(({online:s})=>e(!s)),[]),r?t.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e4,background:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontFamily:"'Spline Sans', sans-serif",fontSize:"13px",fontWeight:600,color:"white"},children:[t.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"cloud_off"}),"You're offline. Some features may be unavailable."]}):null},ft=()=>{const{showWarning:r,timeRemainingMs:e,extendSession:s,logoutNow:o}=Ye();if(!r)return null;const n=Math.max(1,Math.ceil(e/1e3));return t.jsxs("div",{style:{position:"fixed",top:"12px",right:"12px",zIndex:9999,background:"rgba(15,20,30,0.95)",border:"1px solid rgba(245, 158, 11, 0.6)",borderRadius:"10px",padding:"12px",width:"min(380px, calc(100vw - 24px))",boxShadow:"0 8px 24px rgba(0,0,0,0.35)"},children:[t.jsxs("p",{style:{color:"#f59e0b",margin:"0 0 10px",fontSize:"13px",fontWeight:700},children:["Your session is about to expire (",n,"s)"]}),t.jsxs("div",{style:{display:"flex",gap:"8px"},children:[t.jsx("button",{onClick:s,style:gt,children:"Stay signed in"}),t.jsx("button",{onClick:o,style:mt,children:"Sign out"})]})]})},ht=()=>{const[r,e]=c.useState(!0),s=K(),o=oe(),n=c.useRef(!1);return c.useEffect(()=>{n.current||(Te(),n.current=!0)},[]),c.useEffect(()=>Ce(),[]),c.useEffect(()=>{r||(I.measurePageLoad(o.pathname),Ie(o.pathname),Pe(Z.pageView,{path:o.pathname}))},[o.pathname,r]),c.useEffect(()=>{const i=setTimeout(()=>{e(!1)},He);return()=>clearTimeout(i)},[]),r?t.jsx($e,{}):t.jsxs(t.Fragment,{children:[t.jsx(pt,{}),t.jsx(ft,{}),t.jsx(Ze,{}),t.jsx(c.Suspense,{fallback:t.jsx(ut,{}),children:t.jsxs(ie,{children:[t.jsx(E,{path:"/",element:t.jsx(N,{children:t.jsx(w,{name:"landing",message:"Landing page failed to load",onReset:()=>s("/"),children:t.jsx(et,{})})})}),t.jsx(E,{path:"/login",element:t.jsx(N,{children:t.jsx(w,{name:"login",message:"Login failed to load",onReset:()=>s("/login"),children:t.jsx(tt,{onNavigateToRegister:()=>s("/register")})})})}),t.jsx(E,{path:"/register",element:t.jsx(N,{children:t.jsx(w,{name:"register",message:"Registration failed to load",onReset:()=>s("/register"),children:t.jsx(rt,{onNavigateToLogin:()=>s("/login")})})})}),t.jsx(E,{path:"/reset-password",element:t.jsx(N,{children:t.jsx(w,{name:"reset-password",message:"Password reset failed to load",onReset:()=>s("/reset-password"),children:t.jsx(st,{})})})}),t.jsx(E,{path:"/verify-email",element:t.jsx(k,{children:t.jsx(w,{name:"verify-email",message:"Email verification failed to load",onReset:()=>s("/verify-email"),children:t.jsx(nt,{})})})}),t.jsx(E,{path:"/onboarding/1",element:t.jsx(k,{children:t.jsx(w,{name:"onboarding",onReset:()=>s("/onboarding/1"),children:t.jsx(ot,{onContinue:()=>s("/onboarding/2"),onSkip:()=>s("/onboarding/2"),onSkipAll:()=>s("/dashboard")})})})}),t.jsx(E,{path:"/onboarding/2",element:t.jsx(k,{children:t.jsx(w,{name:"onboarding",onReset:()=>s("/onboarding/2"),children:t.jsx(it,{onContinue:()=>s("/onboarding/3"),onSkip:()=>s("/onboarding/3"),onSkipAll:()=>s("/dashboard")})})})}),t.jsx(E,{path:"/onboarding/3",element:t.jsx(k,{children:t.jsx(w,{name:"onboarding",onReset:()=>s("/onboarding/3"),children:t.jsx(at,{onComplete:()=>s("/dashboard"),onSkip:()=>s("/dashboard")})})})}),t.jsx(E,{path:"/dashboard",element:t.jsx(k,{children:t.jsx(w,{name:"dashboard",message:"Dashboard failed to load",onReset:()=>s("/dashboard"),children:t.jsx(lt,{})})})}),t.jsx(E,{path:"/editor",element:t.jsx(k,{children:t.jsx(w,{name:"editor",message:"Video editor encountered an error",onReset:()=>s("/editor"),children:t.jsx(ct,{})})})}),t.jsx(E,{path:"/long-to-shorts",element:t.jsx(k,{children:t.jsx(w,{name:"long-to-shorts",message:"AI Shorts feature encountered an error",onReset:()=>s("/long-to-shorts"),children:t.jsx(dt,{})})})})]})})]})},gt={background:"#75AADB",color:"#0a0a0a",border:"none",borderRadius:"6px",padding:"8px 10px",fontWeight:700,cursor:"pointer"},mt={background:"transparent",color:"rgba(255,255,255,0.75)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"6px",padding:"8px 10px",fontWeight:600,cursor:"pointer"},xt="/".replace(/\/$/,"")||void 0,bt=()=>t.jsx(w,{children:t.jsx(be,{children:t.jsx(ne,{basename:xt,children:t.jsx(ht,{})})})});function yt(r={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:o,onRegistered:n,onRegisteredSW:i,onRegisterError:u}=r;let d,l;const p=async(a=!0)=>{await l};async function f(){if("serviceWorker"in navigator){if(d=await x(async()=>{const{Workbox:a}=await import("./vqzQaGvo.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/sw.js",{scope:"/",type:"classic"})).catch(a=>{u?.(a)}),!d)return;d.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),d.addEventListener("installed",a=>{a.isUpdate||o?.()}),d.register({immediate:e}).then(a=>{i?i("/sw.js",a):n?.(a)}).catch(a=>{u?.(a)})}}return l=f(),p}ke();Re();yt({onNeedRefresh(){O.info("[PWA] New content available, refresh to update")},onOfflineReady(){O.info("[PWA] App ready to work offline")},onRegistered(r){O.info("[PWA] Service worker registered"),r&&setInterval(()=>{r.update()},60*60*1e3)},onRegisterError(r){O.error("[PWA] Service worker registration failed",{error:r})}});ae.createRoot(document.getElementById("root")).render(t.jsx(le.StrictMode,{children:t.jsx(bt,{})}));export{Tt as A,Ct as D,w as E,It as M,Lt as T,x as _,Ae as a,Z as b,z as c,_t as d,Ot as e,Pt as f,At as g,jt as h,ee as i,kt as j,St as k,O as l,g as m,Rt as r,T as s,Pe as t,$ as u};
