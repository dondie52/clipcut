import{r as o,j as e,u as O}from"./DwQPoapS.js";import{n as U}from"./Dehj3twr.js";import"./C4OJ9V64.js";import"./DZxFKcQQ.js";const j="http://185.215.166.46:8090";function C(t,s){return new Promise((r,c)=>{const d=new XMLHttpRequest,f=new FormData;f.append("video",t),d.upload.onprogress=g=>{g.lengthComputable&&s&&s(Math.round(g.loaded/g.total*100))},d.onload=()=>{if(d.status===200)try{r(JSON.parse(d.responseText))}catch{c(new Error("Invalid response from server"))}else{let g=`Upload failed: ${d.status}`;try{const a=JSON.parse(d.responseText);a.detail&&(g=a.detail)}catch{}c(new Error(g))}},d.onerror=()=>c(new Error("Upload failed — check your connection")),d.ontimeout=()=>c(new Error("Upload timed out")),d.open("POST",`${j}/api/upload`),d.send(f)})}const E=5*1024*1024,A=3;async function _(t,s){if(t.size<E*2)return C(t,s);try{const r=await fetch(`${j}/api/upload-init`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:t.name,fileSize:t.size,mimeType:t.type})});if(!r.ok)return C(t,s);const{uploadId:c}=await r.json(),d=Math.ceil(t.size/E);let f=0;for(let a=0;a<d;a++){const b=a*E,p=Math.min(b+E,t.size),h=t.slice(b,p);let m=!1;for(let x=0;x<A&&!m;x++)try{const v=new FormData;if(v.append("chunk",h),v.append("uploadId",c),v.append("chunkIndex",String(a)),v.append("totalChunks",String(d)),(await fetch(`${j}/api/upload-chunk`,{method:"POST",body:v})).ok)m=!0,f++,s&&s(Math.round(f/d*95));else if(x===A-1)throw new Error(`Chunk ${a} upload failed after ${A} retries`)}catch(v){if(x===A-1)throw v;await new Promise(S=>setTimeout(S,1e3*Math.pow(2,x)))}}s&&s(97);const g=await fetch(`${j}/api/upload-complete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uploadId:c,filename:t.name})});if(!g.ok){const a=await g.json().catch(()=>({}));throw new Error(a.detail||"Upload finalization failed")}return s&&s(100),g.json()}catch(r){if(r.message?.includes("upload-init"))return C(t,s);throw r}}async function $(t,s=30){const r=await fetch(`${j}/api/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jobId:t,clipDuration:s})});if(!r.ok){const c=await r.json().catch(()=>({}));throw new Error(c.detail||`Analysis failed: ${r.status}`)}return r.json()}async function M(t,s,r=!1){const c=await fetch(`${j}/api/export`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jobId:t,segments:s,vertical:r})});if(!c.ok){const d=await c.json().catch(()=>({}));throw new Error(d.detail||`Export failed: ${c.status}`)}return c.json()}function T(t){return!t||t.startsWith("http://")||t.startsWith("https://")?t:`${j}${t.startsWith("/")?"":"/"}${t}`}function P(t,s){return`${j}/api/download/${t}/${s}`}function B(t,s){return`${j}/api/thumbnail/${t}/${s}`}const F=500*1024*1024,W=200*1024*1024,G=["video/mp4","video/webm","video/quicktime","video/x-msvideo"];function V(t){return t>=1e9?(t/1e9).toFixed(1)+" GB":t>=1e6?(t/1e6).toFixed(1)+" MB":(t/1e3).toFixed(0)+" KB"}function Y(t){const s=Math.floor(t/60),r=Math.floor(t%60);return`${s}:${r.toString().padStart(2,"0")}`}function H({state:t,dispatch:s}){const[r,c]=o.useState(!1),[d,f]=o.useState("idle"),[g,a]=o.useState(0),[b,p]=o.useState(null),h=o.useRef(null),m=o.useCallback(async u=>{if(p(null),!u)return;if(!G.includes(u.type)&&!u.name.match(/\.(mp4|webm|mov|avi|mkv)$/i)){p("Unsupported format. Use MP4, WebM, MOV, or AVI.");return}if(u.size>F){p("File too large. Maximum size is 500MB.");return}const N=URL.createObjectURL(u);f("uploading"),a(0);try{const k=await _(u,L=>a(L));s({type:"SET_VIDEO",file:u,url:N,duration:k.duration,width:k.width,height:k.height}),s({type:"SET_JOB_ID",jobId:k.jobId})}catch(k){URL.revokeObjectURL(N),p(k.message||"Upload failed. Please try again.")}finally{f("idle")}},[s]),x=o.useCallback(u=>{u.preventDefault(),c(!1);const N=u.dataTransfer.files?.[0];N&&m(N)},[m]),v=o.useCallback(u=>{u.preventDefault(),c(!0)},[]),S=o.useCallback(()=>c(!1),[]),n=o.useCallback(()=>h.current?.click(),[]),l=o.useCallback(u=>{const N=u.target.files?.[0];N&&m(N)},[m]),i=o.useCallback(()=>{t.jobId&&s({type:"START_ANALYSIS"})},[t.jobId,s]),y=d!=="idle",w=t.jobId&&t.videoFile;return e.jsxs("div",{style:{width:"100%",maxWidth:600,display:"flex",flexDirection:"column",alignItems:"center"},children:[b&&e.jsxs("div",{className:"lts-error",style:{width:"100%",marginBottom:16},children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"error"}),b]}),e.jsxs("div",{className:`lts-upload-zone ${r?"dragover":""}`,style:{width:"100%",...w||y?{cursor:"default"}:{}},onDrop:x,onDragOver:v,onDragLeave:S,onClick:!t.videoFile&&!y?n:void 0,children:[e.jsx("input",{ref:h,type:"file",accept:"video/*",style:{display:"none"},onChange:l}),d==="uploading"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lts-analysis-spinner"}),e.jsx("p",{className:"lts-upload-title",children:"Uploading video..."}),e.jsxs("p",{className:"lts-upload-desc",children:[g,"% — uploading raw video (server handles processing)"]}),e.jsx("div",{className:"lts-analysis-progress",style:{marginTop:16,maxWidth:300,margin:"16px auto 0"},children:e.jsx("div",{className:"lts-analysis-bar",style:{width:`${g}%`}})}),e.jsx("p",{style:{fontSize:10,color:"#64748b",marginTop:8},children:"Chunked upload with auto-resume"})]}):t.videoFile?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"lts-upload-preview",children:[e.jsx("video",{src:t.videoUrl,muted:!0}),e.jsxs("div",{className:"lts-upload-meta",children:[e.jsx("p",{className:"name",children:t.videoFile.name}),e.jsxs("p",{className:"info",children:[V(t.videoFile.size)," · ",Y(t.videoDuration),"· ",t.videoWidth,"x",t.videoHeight]})]}),e.jsx("button",{className:"lts-btn-secondary",onClick:u=>{u.stopPropagation(),t.videoUrl&&URL.revokeObjectURL(t.videoUrl),s({type:"RESET"})},style:{flexShrink:0},children:e.jsx("span",{className:"mi",style:{fontSize:16},children:"close"})})]}),t.videoFile.size>W&&e.jsxs("div",{className:"lts-upload-warning",children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"warning"}),"Large file — upload may take a moment"]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lts-upload-icon",children:e.jsx("span",{className:"mi",style:{fontSize:32,color:"#75AADB"},children:"upload_file"})}),e.jsx("p",{className:"lts-upload-title",children:"Drop your video here"}),e.jsx("p",{className:"lts-upload-desc",children:"or click to browse — MP4, WebM, MOV (max 500MB)"})]})]}),!w&&!y&&e.jsxs("p",{style:{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:10,textAlign:"center",lineHeight:1.5},children:["Tip: Download YouTube videos from"," ",e.jsx("a",{href:"https://cobalt.tools",target:"_blank",rel:"noopener noreferrer",style:{color:"#75AADB",textDecoration:"none"},children:"cobalt.tools"}),", then upload here."]}),w&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginTop:20},children:[e.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.5)",fontWeight:500},children:"Clip length:"}),[15,30,60].map(u=>e.jsxs("button",{onClick:()=>s({type:"SET_CLIP_DURATION",clipDuration:u}),style:{padding:"6px 14px",borderRadius:8,border:t.clipDuration===u?"1px solid #75AADB":"1px solid rgba(255,255,255,0.1)",background:t.clipDuration===u?"rgba(117,170,219,0.15)":"rgba(255,255,255,0.04)",color:t.clipDuration===u?"#75AADB":"rgba(255,255,255,0.6)",fontSize:13,fontWeight:600,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s"},children:[u,"s"]},u))]}),e.jsxs("button",{className:"lts-btn-primary",onClick:i,disabled:!t.jobId,style:{marginTop:12},children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"auto_awesome"}),"Analyze with AI"]})]})]})}function J({state:t,dispatch:s}){const[r,c]=o.useState("analyzing"),[d,f]=o.useState(0),g=o.useRef(!1),a=o.useRef(null);o.useEffect(()=>{if(g.current)return;g.current=!0;const p=Date.now();return a.current=setInterval(()=>{f(Math.floor((Date.now()-p)/1e3))},1e3),(async()=>{try{console.log("[Analysis] Calling backend API",{jobId:t.jobId,clipDuration:t.clipDuration}),c("analyzing");const m=((await $(t.jobId,t.clipDuration||30)).segments||[]).map((x,v)=>({...x,id:x.id||`seg-${Date.now()}-${v}`}));console.log(`[Analysis] Backend returned ${m.length} segments`),s({type:"ANALYSIS_DONE",segments:m})}catch(h){console.error("[Analysis] Backend error:",h.message),s({type:"ANALYSIS_ERROR",error:h.message})}finally{clearInterval(a.current)}})(),()=>clearInterval(a.current)},[]);const b=p=>p<60?`${p}s`:`${Math.floor(p/60)}m ${p%60}s`;return e.jsxs("div",{className:"lts-analysis",children:[e.jsx("div",{className:"lts-analysis-spinner"}),e.jsx("p",{className:"lts-analysis-phase",children:"Analyzing video..."}),e.jsx("p",{className:"lts-analysis-detail",children:r==="analyzing"?`Server is extracting frames, transcribing, and finding the best moments (${b(d)})`:"Processing..."}),e.jsx("div",{className:"lts-analysis-progress",children:e.jsx("div",{className:"lts-analysis-bar",style:{width:`${Math.min(20+d*2,90)}%`,transition:"width 1s ease"}})})]})}function D(t){const s=Math.floor(t/60),r=Math.floor(t%60);return`${s}:${r.toString().padStart(2,"0")}`}function I(t){const s=t.split(":");return s.length===2?(parseInt(s[0],10)||0)*60+(parseInt(s[1],10)||0):parseFloat(t)||0}function Z(t){return t>=70?"score-viral":t>=40?"score-good":"score-low"}function q(t){return t>=70?"Viral":t>=40?"Good":"Low"}const K=[{id:"bold-center",label:"Bold Center",icon:"format_bold",desc:"Large centered text"},{id:"lower-third",label:"Lower Third",icon:"subtitles",desc:"Bottom bar overlay"},{id:"word-highlight",label:"Word Highlight",icon:"highlight",desc:"Highlight word-by-word"},{id:"none",label:"No Captions",icon:"closed_caption_disabled",desc:"Export without captions"}];function X({state:t,dispatch:s,videoRef:r}){const[c,d]=o.useState({}),[f,g]=o.useState("bold-center"),a=o.useRef(new Set);o.useEffect(()=>()=>{const n=r.current;n&&(x.current&&n.removeEventListener("seeked",x.current),m.current&&n.removeEventListener("timeupdate",m.current))},[r]),o.useEffect(()=>{for(const n of t.segments)a.current.has(n.id)||(a.current.add(n.id),U(t.videoFile,n.startSeconds).then(l=>{const i=URL.createObjectURL(l);d(y=>({...y,[n.id]:i}))}).catch(()=>{}))},[t.segments,t.videoFile]);const b=o.useCallback((n,l)=>{s({type:"SET_SEGMENTS",segments:t.segments.map(i=>i.id===n?{...i,...l}:i)})},[t.segments,s]),p=o.useCallback(n=>{s({type:"SET_SEGMENTS",segments:t.segments.filter(l=>l.id!==n)})},[t.segments,s]),h=o.useCallback(()=>{const n={id:`seg-${Date.now()}-manual`,startSeconds:0,endSeconds:Math.min(30,t.videoDuration),label:"Custom segment",reason:"Manually added"};s({type:"SET_SEGMENTS",segments:[...t.segments,n]})},[t.segments,t.videoDuration,s]),m=o.useRef(null),x=o.useRef(null),v=o.useCallback(n=>{const l=r.current;if(!l||!t.videoUrl)return;x.current&&(l.removeEventListener("seeked",x.current),x.current=null),m.current&&(l.removeEventListener("timeupdate",m.current),m.current=null),l.pause();const i=()=>{l.removeEventListener("seeked",i),x.current=null;const y=()=>{l.currentTime>=n.endSeconds&&(l.pause(),l.removeEventListener("timeupdate",y),m.current=null)};m.current=y,l.addEventListener("timeupdate",y),l.play()};x.current=i,l.addEventListener("seeked",i),l.currentTime=n.startSeconds},[r]),S=o.useCallback(()=>{t.segments.length>0&&s({type:"START_PROCESSING"})},[t.segments,s]);return e.jsxs("div",{className:"lts-review",children:[e.jsxs("div",{className:"lts-review-player",children:[t.videoUrl?e.jsx("video",{ref:r,src:t.videoUrl,controls:!0,playsInline:!0,preload:"metadata",style:{marginBottom:12}}):e.jsxs("div",{style:{width:"100%",aspectRatio:"16/9",background:"#111",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,marginBottom:12,border:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx("span",{className:"mi",style:{fontSize:36,color:"rgba(255,255,255,0.15)"},children:"videocam_off"}),e.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.3)"},children:"Preview not available"}),e.jsx("span",{style:{fontSize:11,color:"rgba(255,255,255,0.2)"},children:"Video is stored on the server"})]}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:e.jsxs("button",{className:"lts-btn-primary",onClick:S,disabled:t.segments.length===0,children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"movie_creation"}),"Create ",t.segments.length," Short",t.segments.length!==1?"s":""]})})]}),e.jsxs("div",{className:"lts-review-sidebar",children:[e.jsxs("div",{className:"lts-review-header",children:[e.jsx("h3",{children:"Detected Segments"}),e.jsxs("span",{children:[t.segments.length," segment",t.segments.length!==1?"s":""]})]}),t.segments.some(n=>n.words?.length>0)&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10,textTransform:"uppercase",letterSpacing:"0.5px",color:"#64748b",fontWeight:600,marginBottom:8},children:"Caption Style"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},children:K.map(n=>e.jsxs("button",{onClick:()=>{g(n.id),s({type:"SET_CAPTIONS",enabled:n.id!=="none"})},style:{padding:"8px 10px",borderRadius:8,border:f===n.id?"1.5px solid #75AADB":"1px solid rgba(255,255,255,0.08)",background:f===n.id?"rgba(117,170,219,0.12)":"rgba(255,255,255,0.02)",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Spline Sans', sans-serif",color:f===n.id?"#75AADB":"#94a3b8",fontSize:11,fontWeight:f===n.id?600:400},children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:n.icon}),n.label]},n.id))})]}),t.segments.map(n=>{const l=Math.round(n.endSeconds-n.startSeconds);return e.jsxs("div",{className:"lts-segment",children:[e.jsxs("div",{className:"lts-segment-top",children:[c[n.id]?e.jsx("img",{className:"lts-segment-thumb",src:c[n.id],alt:""}):e.jsx("div",{className:"lts-segment-thumb"}),e.jsxs("div",{className:"lts-segment-info",children:[n.hookTitle&&e.jsx("p",{className:"lts-segment-hook",children:n.hookTitle}),e.jsxs("p",{className:"lts-segment-label",children:[n.label,typeof n.score=="number"&&e.jsxs("span",{className:`lts-score-badge ${Z(n.score)}`,title:`Viral score: ${n.score}/100`,children:[n.score,e.jsx("span",{style:{fontWeight:500,opacity:.85},children:q(n.score)})]})]}),e.jsx("p",{className:"lts-segment-reason",children:n.reason})]})]}),n.transcriptSnippet&&e.jsxs("p",{className:"lts-segment-transcript",children:[e.jsx("span",{className:"mi",style:{fontSize:12,verticalAlign:"middle",marginRight:4},children:"format_quote"}),n.transcriptSnippet.length>120?n.transcriptSnippet.slice(0,120)+"…":n.transcriptSnippet]}),e.jsxs("div",{style:{padding:"4px 0 2px",position:"relative"},children:[e.jsx("input",{type:"range",min:0,max:t.videoDuration,step:.5,value:n.startSeconds,onChange:i=>b(n.id,{startSeconds:Math.min(Number(i.target.value),n.endSeconds-1)}),style:{width:"100%",accentColor:"#75AADB",height:4},title:"Start point"}),e.jsx("input",{type:"range",min:0,max:t.videoDuration,step:.5,value:n.endSeconds,onChange:i=>b(n.id,{endSeconds:Math.max(Number(i.target.value),n.startSeconds+1)}),style:{width:"100%",accentColor:"#4ade80",height:4,marginTop:-4},title:"End point"})]}),e.jsxs("div",{className:"lts-segment-time",children:[e.jsx("input",{value:D(n.startSeconds),onChange:i=>b(n.id,{startSeconds:I(i.target.value)}),title:"Start time","aria-label":"Start time"}),e.jsx("span",{children:"—"}),e.jsx("input",{value:D(n.endSeconds),onChange:i=>b(n.id,{endSeconds:I(i.target.value)}),title:"End time","aria-label":"End time"}),e.jsxs("span",{className:"lts-segment-dur",children:[l,"s"]})]}),e.jsxs("div",{className:"lts-segment-actions",children:[e.jsxs("button",{onClick:()=>v(n),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"play_arrow"}),"Preview"]}),e.jsxs("button",{className:"delete",onClick:()=>p(n.id),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"delete"}),"Remove"]})]})]},n.id)}),e.jsxs("button",{className:"lts-add-segment",onClick:h,children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"add"}),"Add segment manually"]})]})]})}function Q({state:t,dispatch:s}){const[r,c]=o.useState(0),d=o.useRef(!1),f=o.useRef(null);o.useEffect(()=>{if(d.current)return;d.current=!0;const a=Date.now();return f.current=setInterval(()=>{c(Math.floor((Date.now()-a)/1e3))},1e3),(async()=>{try{console.log("[Processing] Calling backend export API",{jobId:t.jobId,segments:t.segments.length});const b=await M(t.jobId,t.segments,!0);console.log("[Processing] Raw clips from server:",b.clips);const p=(b.clips||[]).map(h=>{const m=h.id||h.segmentId,x=t.segments.find(n=>n.id===m)||{},v=T(h.downloadUrl)||P(t.jobId,m),S=T(h.thumbnailUrl)||B(t.jobId,m);return console.log(`[Processing] clip ${m}: downloadUrl=${v}`),{id:m,label:x.label||"Clip",hookTitle:x.hookTitle,score:x.score,downloadUrl:v,thumbnailUrl:S}});console.log(`[Processing] Backend returned ${p.length} clips`),s({type:"PROCESSING_DONE",results:p})}catch(b){console.error("[Processing] Backend error:",b.message),s({type:"PROCESSING_ERROR",error:b.message})}finally{clearInterval(f.current)}})(),()=>clearInterval(f.current)},[]);const g=a=>a<60?`${a}s`:`${Math.floor(a/60)}m ${a%60}s`;return e.jsxs("div",{className:"lts-processing",children:[e.jsxs("p",{className:"lts-processing-title",children:["Creating your shorts (",t.segments.length," clip",t.segments.length!==1?"s":"",")"]}),e.jsx("div",{className:"lts-analysis-progress",style:{marginBottom:20},children:e.jsx("div",{className:"lts-analysis-bar",style:{width:`${Math.min(15+r*3,90)}%`,transition:"width 1s ease"}})}),e.jsxs("p",{style:{textAlign:"center",fontSize:13,color:"rgba(255,255,255,0.45)"},children:["Server is cutting, cropping to 9:16, and preserving audio (",g(r),")"]}),t.segments.map(a=>e.jsxs("div",{className:"lts-processing-item",children:[e.jsx("div",{className:"lts-analysis-spinner",style:{width:20,height:20,margin:0,borderWidth:2}}),e.jsx("span",{className:"label",children:a.hookTitle||a.label})]},a.id))]})}function ee(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"").slice(0,40)||"short"}function z(t,s){const r=String(s+1).padStart(2,"0"),c=ee(t.hookTitle||t.label);return`clip_${r}_${c}.mp4`}function te(t){const s=Math.floor(t/60),r=Math.floor(t%60);return`${s}:${r.toString().padStart(2,"0")}`}function ne({state:t,dispatch:s,navigate:r}){const[c,d]=o.useState(!1),[f,g]=o.useState(0),[a,b]=o.useState(null),p=o.useMemo(()=>t.results.filter(n=>n.downloadUrl),[t.results]),h=o.useMemo(()=>{const n=p.filter(i=>typeof i.score=="number").map(i=>i.score),l=t.segments.map(i=>(i.endSeconds||0)-(i.startSeconds||0));return{totalClips:p.length,avgScore:n.length>0?Math.round(n.reduce((i,y)=>i+y,0)/n.length):null,bestScore:n.length>0?Math.max(...n):null,totalDuration:l.reduce((i,y)=>i+y,0),avgDuration:l.length>0?Math.round(l.reduce((i,y)=>i+y,0)/l.length):0,viralCount:n.filter(i=>i>=70).length}},[p,t.segments]),m=o.useCallback(async()=>{d(!0),g(0);for(let n=0;n<p.length;n++){try{const i=await(await fetch(p[n].downloadUrl)).blob(),y=URL.createObjectURL(i),w=document.createElement("a");w.href=y,w.download=z(p[n],n),document.body.appendChild(w),w.click(),document.body.removeChild(w),URL.revokeObjectURL(y)}catch(l){console.error(`Failed to download clip ${n+1}:`,l)}g(n+1)}setTimeout(()=>d(!1),800)},[p]),x=o.useCallback(async(n,l)=>{const i=z(n,l);try{const w=await(await fetch(n.downloadUrl)).blob(),u=new File([w],i,{type:"video/mp4"});if(navigator.share&&navigator.canShare?.({files:[u]})){await navigator.share({title:n.hookTitle||n.label,files:[u]});return}}catch{}try{await navigator.clipboard.writeText(n.downloadUrl),b(n.id),setTimeout(()=>b(null),2e3)}catch{}},[]),v=o.useCallback(async(n,l)=>{try{const y=await(await fetch(n.downloadUrl)).blob(),w=new File([y],z(n,l),{type:"video/mp4"});r("/editor",{state:{filesToImport:[w]}})}catch(i){console.error("Failed to fetch clip for editor:",i)}},[r]),S=o.useCallback(()=>{s({type:"RESET"})},[s]);return p.length===0?e.jsxs("div",{className:"lts-done",children:[e.jsx("p",{className:"lts-done-title",children:"No valid clips were produced"}),e.jsx("p",{className:"lts-done-sub",children:"Export failed on the server. Try again with different segments."}),e.jsx("div",{className:"lts-done-actions",children:e.jsxs("button",{className:"lts-btn-primary",onClick:S,children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"refresh"}),"Start over"]})})]}):e.jsxs("div",{className:"lts-done",children:[e.jsx("p",{className:"lts-done-title",children:"Your shorts are ready!"}),e.jsxs("p",{className:"lts-done-sub",children:[p.length," vertical short",p.length!==1?"s":""," created"]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:10,margin:"16px 0",padding:14,borderRadius:10,background:"rgba(117,170,219,0.06)",border:"1px solid rgba(117,170,219,0.12)"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:"#f1f5f9"},children:h.totalClips}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Clips"})]}),h.avgScore!==null&&e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:h.avgScore>=70?"#4ade80":h.avgScore>=40?"#fbbf24":"#f87171"},children:h.avgScore}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Avg Score"})]}),h.viralCount>0&&e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:"#4ade80"},children:h.viralCount}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Viral"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:"#f1f5f9"},children:te(h.totalDuration)}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Total"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:20,fontWeight:700,color:"#f1f5f9"},children:[h.avgDuration,"s"]}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Avg Clip"})]})]}),e.jsx("div",{className:"lts-done-grid",children:p.map((n,l)=>e.jsxs("div",{className:"lts-done-card",children:[e.jsx("video",{src:n.downloadUrl,controls:!0,muted:!0,playsInline:!0,crossOrigin:"anonymous"}),e.jsxs("div",{className:"lts-done-card-body",children:[e.jsx("p",{className:"lts-done-card-label",children:n.hookTitle||n.label}),typeof n.score=="number"&&e.jsxs("span",{className:`lts-score-badge ${n.score>=70?"score-viral":n.score>=40?"score-good":"score-low"}`,style:{marginLeft:0,marginBottom:8},children:[n.score," ",n.score>=70?"Viral":n.score>=40?"Good":"Low"]}),e.jsxs("div",{className:"lts-done-card-btns",children:[e.jsxs("a",{className:"lts-btn-secondary",href:n.downloadUrl,download:z(n,l),style:{textDecoration:"none"},children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"download"}),"Download"]}),e.jsxs("button",{className:"lts-btn-secondary",onClick:()=>x(n,l),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:a===n.id?"check":"share"}),a===n.id?"Copied!":"Share"]}),e.jsxs("button",{className:"lts-btn-secondary",onClick:()=>v(n,l),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"movie_edit"}),"Edit"]})]})]})]},n.id))}),e.jsxs("div",{className:"lts-done-actions",children:[e.jsxs("button",{className:"lts-btn-secondary",onClick:S,children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"refresh"}),"Start over"]}),e.jsxs("button",{className:"lts-btn-primary",onClick:m,disabled:c,children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"download"}),c?`Downloading ${f}/${p.length}...`:"Download All"]})]})]})}const se=["Upload","Analyze","Review","Export"],R={step:"UPLOAD",jobId:null,videoFile:null,videoUrl:null,videoDuration:0,videoWidth:0,videoHeight:0,clipDuration:30,captionsEnabled:!0,segments:[],results:[],error:null};function re(t,s){switch(s.type){case"SET_VIDEO":return{...t,step:"UPLOAD",videoFile:s.file,videoUrl:s.url,videoDuration:s.duration,videoWidth:s.width,videoHeight:s.height,error:null};case"SET_JOB_ID":return{...t,jobId:s.jobId};case"SET_CLIP_DURATION":return{...t,clipDuration:s.clipDuration};case"SET_CAPTIONS":return{...t,captionsEnabled:s.enabled};case"START_ANALYSIS":return{...t,step:"ANALYZING",error:null};case"ANALYSIS_DONE":return{...t,step:"REVIEW",segments:s.segments,error:null};case"ANALYSIS_ERROR":return{...t,step:"UPLOAD",error:s.error};case"SET_SEGMENTS":return{...t,segments:s.segments};case"START_PROCESSING":return{...t,step:"PROCESSING",error:null};case"PROCESSING_DONE":return{...t,step:"DONE",results:s.results,error:null};case"PROCESSING_ERROR":return{...t,step:"REVIEW",error:s.error};case"RESET":return t.videoUrl&&URL.revokeObjectURL(t.videoUrl),{...R};default:return t}}const oe=`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .lts-root {
    width: 100vw; height: 100vh; background: #0a0a0a;
    font-family: 'Spline Sans', sans-serif;
    display: flex; flex-direction: column;
    overflow: hidden; color: white;
  }

  /* Top bar */
  .lts-topbar {
    height: 56px; min-height: 56px;
    background: #0e1218; border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; padding: 0 20px; gap: 16px;
  }
  .lts-back {
    display: flex; align-items: center; gap: 8px;
    background: none; border: none; color: rgba(255,255,255,0.7);
    cursor: pointer; font-size: 14px; font-family: inherit; padding: 6px 10px;
    border-radius: 8px; transition: all 0.15s;
  }
  .lts-back:hover { background: rgba(255,255,255,0.05); color: white; }
  .lts-title {
    font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px;
  }
  .lts-title-icon {
    width: 28px; height: 28px; border-radius: 6px;
    background: linear-gradient(135deg, #75AADB, #5a8cbf);
    display: flex; align-items: center; justify-content: center;
  }

  /* Steps breadcrumb */
  .lts-steps {
    display: flex; align-items: center; gap: 4px; margin-left: auto;
  }
  .lts-step {
    font-size: 12px; font-weight: 500; padding: 4px 12px;
    border-radius: 16px; color: rgba(255,255,255,0.35);
    transition: all 0.2s;
  }
  .lts-step.active {
    background: rgba(117,170,219,0.15); color: #75AADB; font-weight: 600;
  }
  .lts-step.done { color: rgba(117,170,219,0.5); }
  .lts-step-arrow {
    color: rgba(255,255,255,0.15); font-size: 14px;
    display: flex; align-items: center;
  }

  /* Content area */
  .lts-content {
    flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden;
    display: flex; align-items: flex-start; justify-content: center;
    padding: 24px;
  }

  /* Shared button styles */
  .lts-btn-primary {
    background: linear-gradient(135deg, #75AADB, #5a8cbf);
    border: none; color: white; font-family: inherit;
    font-size: 14px; font-weight: 600; padding: 12px 28px;
    border-radius: 10px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .lts-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(117,170,219,0.3); }
  .lts-btn-primary:active { transform: translateY(0); }
  .lts-btn-primary:disabled {
    opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none;
  }

  .lts-btn-secondary {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    color: white; font-family: inherit; font-size: 13px; font-weight: 500;
    padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }
  .lts-btn-secondary:hover { background: rgba(255,255,255,0.1); }

  /* Error banner */
  .lts-error {
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);
    border-radius: 10px; padding: 12px 16px; margin-bottom: 16px;
    font-size: 13px; color: #fca5a5; display: flex; align-items: center; gap: 8px;
  }

  /* Upload zone */
  .lts-upload-zone {
    width: 100%; max-width: 600px;
    border: 2px dashed rgba(117,170,219,0.3); border-radius: 16px;
    padding: 48px 32px; text-align: center; cursor: pointer;
    transition: all 0.2s; background: rgba(117,170,219,0.03);
  }
  .lts-upload-zone:hover, .lts-upload-zone.dragover {
    border-color: #75AADB; background: rgba(117,170,219,0.08);
  }
  .lts-upload-icon {
    width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 16px;
    background: rgba(117,170,219,0.1);
    display: flex; align-items: center; justify-content: center;
  }
  .lts-upload-title { font-size: 18px; font-weight: 600; margin: 0 0 8px; }
  .lts-upload-desc { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0; }
  .lts-upload-preview {
    margin-top: 20px; border-radius: 10px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    background: #111; display: flex; align-items: center; gap: 14px;
    padding: 12px 16px;
  }
  .lts-upload-preview video {
    width: 120px; height: 68px; object-fit: cover; border-radius: 6px; background: #000;
  }
  .lts-upload-meta { flex: 1; text-align: left; }
  .lts-upload-meta p { margin: 0; }
  .lts-upload-meta .name { font-size: 14px; font-weight: 500; }
  .lts-upload-meta .info { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; }
  .lts-upload-warning {
    margin-top: 12px; font-size: 12px; color: #fbbf24;
    display: flex; align-items: center; gap: 6px;
  }

  /* Analysis step */
  .lts-analysis {
    text-align: center; max-width: 400px;
  }
  .lts-analysis-spinner {
    width: 48px; height: 48px; border: 3px solid rgba(117,170,219,0.2);
    border-top-color: #75AADB; border-radius: 50%;
    animation: lts-spin 0.8s linear infinite; margin: 0 auto 20px;
  }
  @keyframes lts-spin { to { transform: rotate(360deg); } }
  .lts-analysis-phase { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
  .lts-analysis-detail { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0; }
  .lts-analysis-progress {
    margin-top: 16px; height: 4px; background: rgba(255,255,255,0.06);
    border-radius: 2px; overflow: hidden;
  }
  .lts-analysis-bar {
    height: 100%; background: #75AADB; border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* Review step */
  .lts-review {
    width: 100%; max-width: 1100px; height: 100%;
    display: flex; gap: 20px;
  }
  .lts-review-player {
    flex: 1; min-width: 0; display: flex; flex-direction: column;
  }
  .lts-review-player video {
    width: 100%; border-radius: 10px; background: #000;
    aspect-ratio: 16/9; object-fit: contain;
  }
  .lts-review-sidebar {
    width: 340px; min-width: 340px; display: flex; flex-direction: column;
    gap: 12px; overflow-y: auto; padding-right: 4px;
  }
  .lts-review-sidebar::-webkit-scrollbar { width: 4px; }
  .lts-review-sidebar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
  .lts-review-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 4px;
  }
  .lts-review-header h3 { font-size: 14px; font-weight: 600; margin: 0; }
  .lts-review-header span { font-size: 12px; color: rgba(255,255,255,0.4); }

  /* Segment card */
  .lts-segment {
    background: rgba(26,35,50,0.5); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px; padding: 12px; transition: all 0.15s;
  }
  .lts-segment:hover { border-color: rgba(117,170,219,0.2); }
  .lts-segment-top { display: flex; gap: 10px; }
  .lts-segment-thumb {
    width: 80px; height: 45px; border-radius: 6px; background: #000;
    object-fit: cover; flex-shrink: 0;
  }
  .lts-segment-info { flex: 1; min-width: 0; }
  .lts-segment-label {
    font-size: 13px; font-weight: 600; margin: 0 0 4px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .lts-segment-reason {
    font-size: 11px; color: rgba(255,255,255,0.4); margin: 0;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .lts-segment-time {
    display: flex; align-items: center; gap: 8px; margin-top: 8px;
    font-size: 12px; color: rgba(255,255,255,0.6);
  }
  .lts-segment-time input {
    width: 60px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px; color: white; font-family: inherit; font-size: 12px;
    padding: 3px 6px; text-align: center;
  }
  .lts-segment-time input:focus { outline: none; border-color: #75AADB; }
  .lts-segment-dur {
    margin-left: auto; background: rgba(117,170,219,0.1);
    color: #75AADB; font-size: 11px; font-weight: 600;
    padding: 2px 8px; border-radius: 10px;
  }
  .lts-segment-actions {
    display: flex; gap: 6px; margin-top: 8px;
  }
  .lts-segment-actions button {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.6); border-radius: 6px; padding: 4px 10px;
    font-size: 11px; font-family: inherit; cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 4px;
  }
  .lts-segment-actions button:hover { background: rgba(255,255,255,0.08); color: white; }
  .lts-segment-actions .delete:hover { background: rgba(239,68,68,0.1); color: #fca5a5; }

  /* Score badge — color-coded by viral potential */
  .lts-score-badge {
    display: inline-flex; align-items: center; gap: 4px;
    margin-left: 6px; padding: 2px 8px;
    font-size: 10px; font-weight: 700; border-radius: 8px;
    vertical-align: middle; white-space: nowrap;
  }
  .lts-score-badge.score-low {
    background: rgba(239,68,68,0.15); color: #f87171;
  }
  .lts-score-badge.score-good {
    background: rgba(250,204,21,0.15); color: #fbbf24;
  }
  .lts-score-badge.score-viral {
    background: rgba(74,222,128,0.15); color: #4ade80;
  }

  /* Hook title */
  .lts-segment-hook {
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.85);
    margin: 0 0 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* Transcript snippet */
  .lts-segment-transcript {
    margin: 6px 0 0; font-size: 11px; color: rgba(255,255,255,0.35);
    font-style: italic; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Captions toggle */
  .lts-captions-toggle {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.7);
    padding: 8px 12px; border-radius: 8px; cursor: pointer;
    background: rgba(117,170,219,0.06); border: 1px solid rgba(117,170,219,0.15);
    transition: all 0.15s;
  }
  .lts-captions-toggle:hover { border-color: rgba(117,170,219,0.3); }
  .lts-captions-toggle input[type="checkbox"] {
    accent-color: #75AADB; width: 16px; height: 16px; cursor: pointer;
  }

  /* Add segment button */
  .lts-add-segment {
    border: 1px dashed rgba(255,255,255,0.1); border-radius: 10px;
    padding: 12px; text-align: center; cursor: pointer;
    color: rgba(255,255,255,0.4); font-size: 13px; font-family: inherit;
    background: none; width: 100%; transition: all 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .lts-add-segment:hover { border-color: rgba(117,170,219,0.3); color: #75AADB; }

  /* Processing step */
  .lts-processing {
    width: 100%; max-width: 600px;
  }
  .lts-processing-title { font-size: 18px; font-weight: 600; margin: 0 0 20px; text-align: center; }
  .lts-processing-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px; background: rgba(26,35,50,0.5);
    border: 1px solid rgba(255,255,255,0.06); border-radius: 10px;
    margin-bottom: 10px;
  }
  .lts-processing-item .label { flex: 1; font-size: 13px; font-weight: 500; }
  .lts-processing-bar {
    width: 120px; height: 4px; background: rgba(255,255,255,0.06);
    border-radius: 2px; overflow: hidden;
  }
  .lts-processing-bar-fill {
    height: 100%; background: #75AADB; border-radius: 2px;
    transition: width 0.3s ease;
  }
  .lts-processing-pct { font-size: 12px; color: rgba(255,255,255,0.4); width: 36px; text-align: right; }
  .lts-processing-check { color: #4ade80; }

  /* Done step */
  .lts-done {
    width: 100%; max-width: 900px; padding-bottom: 32px;
  }
  .lts-done-title { font-size: 18px; font-weight: 600; margin: 0 0 4px; text-align: center; }
  .lts-done-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin: 0 0 24px; text-align: center; }
  .lts-done-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  .lts-done-card {
    background: rgba(26,35,50,0.5); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px; overflow: hidden; transition: all 0.15s;
  }
  .lts-done-card:hover { border-color: rgba(117,170,219,0.2); }
  .lts-done-card video {
    width: 100%; aspect-ratio: 9/16; object-fit: cover; background: #000;
    display: block;
  }
  .lts-done-card-body { padding: 12px; }
  .lts-done-card-label { font-size: 13px; font-weight: 500; margin: 0 0 8px; }
  .lts-done-card-btns { display: flex; gap: 6px; }
  .lts-done-card-btns button { flex: 1; }
  .lts-done-actions { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }

  /* Material icon helper */
  .lts-root .mi {
    font-family: 'Material Symbols Outlined';
    font-size: 20px; font-weight: 400;
    font-style: normal; line-height: 1; display: inline-block;
    text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;
  }
`;function ce(){const t=O(),[s,r]=o.useReducer(re,R),c=o.useRef(null),d={UPLOAD:0,ANALYZING:1,REVIEW:2,PROCESSING:3,DONE:3}[s.step]??0,f=o.useCallback(()=>{r({type:"RESET"}),t("/dashboard")},[t]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:oe}),e.jsxs("div",{className:"lts-root",children:[e.jsxs("header",{className:"lts-topbar",children:[e.jsxs("button",{className:"lts-back",onClick:f,children:[e.jsx("span",{className:"mi",children:"arrow_back"}),"Back"]}),e.jsxs("div",{className:"lts-title",children:[e.jsx("div",{className:"lts-title-icon",children:e.jsx("span",{className:"mi",style:{fontSize:16,color:"white"},children:"content_cut"})}),"Long to Shorts"]}),e.jsx("div",{className:"lts-steps",children:se.map((g,a)=>e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[a>0&&e.jsx("span",{className:"lts-step-arrow",children:e.jsx("span",{className:"mi",style:{fontSize:14},children:"chevron_right"})}),e.jsx("span",{className:`lts-step ${a===d?"active":a<d?"done":""}`,children:g})]},g))})]}),e.jsxs("div",{className:"lts-content",children:[s.error&&e.jsxs("div",{className:"lts-error",style:{position:"absolute",top:72,left:24,right:24,zIndex:10},children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"error"}),e.jsx("span",{style:{flex:1},children:s.error}),s.videoFile&&e.jsxs("button",{className:"lts-btn-secondary",style:{marginLeft:"auto",flexShrink:0},onClick:()=>r({type:"START_ANALYSIS"}),children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"refresh"}),"Retry"]})]}),s.step==="UPLOAD"&&e.jsx(H,{state:s,dispatch:r}),s.step==="ANALYZING"&&e.jsx(J,{state:s,dispatch:r}),s.step==="REVIEW"&&e.jsx(X,{state:s,dispatch:r,videoRef:c}),s.step==="PROCESSING"&&e.jsx(Q,{state:s,dispatch:r}),s.step==="DONE"&&e.jsx(ne,{state:s,dispatch:r,navigate:t})]})]})]})}export{ce as default};
