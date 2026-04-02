import{r as n,j as e,u as T}from"./-P2Ya96f.js";import{B as R,C as I,n as L,D as U,F as A,G as _,H as O}from"./CEyUb1j3.js";import"./CvFNCHZB.js";import"./DZxFKcQQ.js";const P=500*1024*1024,B=200*1024*1024,M=["video/mp4","video/webm","video/quicktime","video/x-msvideo"];function F(t){return t>=1e9?(t/1e9).toFixed(1)+" GB":t>=1e6?(t/1e6).toFixed(1)+" MB":(t/1e3).toFixed(0)+" KB"}function $(t){const r=Math.floor(t/60),l=Math.floor(t%60);return`${r}:${l.toString().padStart(2,"0")}`}function W({state:t,dispatch:r}){const[l,h]=n.useState(!1),[f,b]=n.useState("idle"),[y,d]=n.useState(0),[x,a]=n.useState(null),p=n.useRef(null),g=n.useCallback(async c=>{if(a(null),!c)return;if(!M.includes(c.type)&&!c.name.match(/\.(mp4|webm|mov|avi|mkv)$/i)){a("Unsupported format. Use MP4, WebM, MOV, or AVI.");return}if(c.size>P){a("File too large. Maximum size is 500MB.");return}const j=URL.createObjectURL(c);b("uploading"),d(0);try{const N=await R(c,D=>d(D));r({type:"SET_VIDEO",file:c,url:j,duration:N.duration,width:N.width,height:N.height}),r({type:"SET_JOB_ID",jobId:N.jobId})}catch(N){URL.revokeObjectURL(j),a(N.message||"Upload failed. Please try again.")}finally{b("idle")}},[r]),u=n.useCallback(c=>{c.preventDefault(),h(!1);const j=c.dataTransfer.files?.[0];j&&g(j)},[g]),S=n.useCallback(c=>{c.preventDefault(),h(!0)},[]),w=n.useCallback(()=>h(!1),[]),s=n.useCallback(()=>p.current?.click(),[]),o=n.useCallback(c=>{const j=c.target.files?.[0];j&&g(j)},[g]),i=n.useCallback(()=>{t.jobId&&r({type:"START_ANALYSIS"})},[t.jobId,r]),m=f!=="idle",v=t.jobId&&t.videoFile;return e.jsxs("div",{style:{width:"100%",maxWidth:600,display:"flex",flexDirection:"column",alignItems:"center"},children:[x&&e.jsxs("div",{className:"lts-error",style:{width:"100%",marginBottom:16},children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"error"}),x]}),e.jsxs("div",{className:`lts-upload-zone ${l?"dragover":""}`,style:{width:"100%",...v||m?{cursor:"default"}:{}},onDrop:u,onDragOver:S,onDragLeave:w,onClick:!t.videoFile&&!m?s:void 0,children:[e.jsx("input",{ref:p,type:"file",accept:"video/*",style:{display:"none"},onChange:o}),f==="uploading"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lts-analysis-spinner"}),e.jsx("p",{className:"lts-upload-title",children:"Uploading video..."}),e.jsxs("p",{className:"lts-upload-desc",children:[y,"% — uploading raw video (server handles processing)"]}),e.jsx("div",{className:"lts-analysis-progress",style:{marginTop:16,maxWidth:300,margin:"16px auto 0"},children:e.jsx("div",{className:"lts-analysis-bar",style:{width:`${y}%`}})}),e.jsx("p",{style:{fontSize:10,color:"#64748b",marginTop:8},children:"Chunked upload with auto-resume"})]}):t.videoFile?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"lts-upload-preview",children:[e.jsx("video",{src:t.videoUrl,muted:!0}),e.jsxs("div",{className:"lts-upload-meta",children:[e.jsx("p",{className:"name",children:t.videoFile.name}),e.jsxs("p",{className:"info",children:[F(t.videoFile.size)," · ",$(t.videoDuration),"· ",t.videoWidth,"x",t.videoHeight]})]}),e.jsx("button",{className:"lts-btn-secondary",onClick:c=>{c.stopPropagation(),t.videoUrl&&URL.revokeObjectURL(t.videoUrl),r({type:"RESET"})},style:{flexShrink:0},children:e.jsx("span",{className:"mi",style:{fontSize:16},children:"close"})})]}),t.videoFile.size>B&&e.jsxs("div",{className:"lts-upload-warning",children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"warning"}),"Large file — upload may take a moment"]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lts-upload-icon",children:e.jsx("span",{className:"mi",style:{fontSize:32,color:"#75AADB"},children:"upload_file"})}),e.jsx("p",{className:"lts-upload-title",children:"Drop your video here"}),e.jsx("p",{className:"lts-upload-desc",children:"or click to browse — MP4, WebM, MOV (max 500MB)"})]})]}),!v&&!m&&e.jsxs("p",{style:{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:10,textAlign:"center",lineHeight:1.5},children:["Tip: Download YouTube videos from"," ",e.jsx("a",{href:"https://cobalt.tools",target:"_blank",rel:"noopener noreferrer",style:{color:"#75AADB",textDecoration:"none"},children:"cobalt.tools"}),", then upload here."]}),v&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginTop:20},children:[e.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.5)",fontWeight:500},children:"Clip length:"}),[15,30,60].map(c=>e.jsxs("button",{onClick:()=>r({type:"SET_CLIP_DURATION",clipDuration:c}),style:{padding:"6px 14px",borderRadius:8,border:t.clipDuration===c?"1px solid #75AADB":"1px solid rgba(255,255,255,0.1)",background:t.clipDuration===c?"rgba(117,170,219,0.15)":"rgba(255,255,255,0.04)",color:t.clipDuration===c?"#75AADB":"rgba(255,255,255,0.6)",fontSize:13,fontWeight:600,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s"},children:[c,"s"]},c))]}),e.jsxs("button",{className:"lts-btn-primary",onClick:i,disabled:!t.jobId,style:{marginTop:12},children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"auto_awesome"}),"Analyze with AI"]})]})]})}function G({state:t,dispatch:r}){const[l,h]=n.useState("analyzing"),[f,b]=n.useState(0),y=n.useRef(!1),d=n.useRef(null);n.useEffect(()=>{if(y.current)return;y.current=!0;const a=Date.now();return d.current=setInterval(()=>{b(Math.floor((Date.now()-a)/1e3))},1e3),(async()=>{try{console.log("[Analysis] Calling backend API",{jobId:t.jobId,clipDuration:t.clipDuration}),h("analyzing");const g=((await I(t.jobId,t.clipDuration||30)).segments||[]).map((u,S)=>({...u,id:u.id||`seg-${Date.now()}-${S}`}));console.log(`[Analysis] Backend returned ${g.length} segments`),r({type:"ANALYSIS_DONE",segments:g})}catch(p){console.error("[Analysis] Backend error:",p.message),r({type:"ANALYSIS_ERROR",error:p.message})}finally{clearInterval(d.current)}})(),()=>clearInterval(d.current)},[]);const x=a=>a<60?`${a}s`:`${Math.floor(a/60)}m ${a%60}s`;return e.jsxs("div",{className:"lts-analysis",children:[e.jsx("div",{className:"lts-analysis-spinner"}),e.jsx("p",{className:"lts-analysis-phase",children:"Analyzing video..."}),e.jsx("p",{className:"lts-analysis-detail",children:l==="analyzing"?`Server is extracting frames, transcribing, and finding the best moments (${x(f)})`:"Processing..."}),e.jsx("div",{className:"lts-analysis-progress",children:e.jsx("div",{className:"lts-analysis-bar",style:{width:`${Math.min(20+f*2,90)}%`,transition:"width 1s ease"}})})]})}function z(t){const r=Math.floor(t/60),l=Math.floor(t%60);return`${r}:${l.toString().padStart(2,"0")}`}function E(t){const r=t.split(":");return r.length===2?(parseInt(r[0],10)||0)*60+(parseInt(r[1],10)||0):parseFloat(t)||0}function V(t){return t>=70?"score-viral":t>=40?"score-good":"score-low"}function Y(t){return t>=70?"Viral":t>=40?"Good":"Low"}const H=[{id:"bold-center",label:"Bold Center",icon:"format_bold",desc:"Large centered text"},{id:"lower-third",label:"Lower Third",icon:"subtitles",desc:"Bottom bar overlay"},{id:"word-highlight",label:"Word Highlight",icon:"highlight",desc:"Highlight word-by-word"},{id:"none",label:"No Captions",icon:"closed_caption_disabled",desc:"Export without captions"}];function Z({state:t,dispatch:r,videoRef:l}){const[h,f]=n.useState({}),[b,y]=n.useState("bold-center"),d=n.useRef(new Set);n.useEffect(()=>()=>{const s=l.current;s&&(u.current&&s.removeEventListener("seeked",u.current),g.current&&s.removeEventListener("timeupdate",g.current))},[l]),n.useEffect(()=>{for(const s of t.segments)d.current.has(s.id)||(d.current.add(s.id),L(t.videoFile,s.startSeconds).then(o=>{const i=URL.createObjectURL(o);f(m=>({...m,[s.id]:i}))}).catch(()=>{}))},[t.segments,t.videoFile]);const x=n.useCallback((s,o)=>{r({type:"SET_SEGMENTS",segments:t.segments.map(i=>i.id===s?{...i,...o}:i)})},[t.segments,r]),a=n.useCallback(s=>{r({type:"SET_SEGMENTS",segments:t.segments.filter(o=>o.id!==s)})},[t.segments,r]),p=n.useCallback(()=>{const s={id:`seg-${Date.now()}-manual`,startSeconds:0,endSeconds:Math.min(30,t.videoDuration),label:"Custom segment",reason:"Manually added"};r({type:"SET_SEGMENTS",segments:[...t.segments,s]})},[t.segments,t.videoDuration,r]),g=n.useRef(null),u=n.useRef(null),S=n.useCallback(s=>{const o=l.current;if(!o||!t.videoUrl)return;u.current&&(o.removeEventListener("seeked",u.current),u.current=null),g.current&&(o.removeEventListener("timeupdate",g.current),g.current=null),o.pause();const i=()=>{o.removeEventListener("seeked",i),u.current=null;const m=()=>{o.currentTime>=s.endSeconds&&(o.pause(),o.removeEventListener("timeupdate",m),g.current=null)};g.current=m,o.addEventListener("timeupdate",m),o.play()};u.current=i,o.addEventListener("seeked",i),o.currentTime=s.startSeconds},[l]),w=n.useCallback(()=>{t.segments.length>0&&r({type:"START_PROCESSING"})},[t.segments,r]);return e.jsxs("div",{className:"lts-review",children:[e.jsxs("div",{className:"lts-review-player",children:[t.videoUrl?e.jsx("video",{ref:l,src:t.videoUrl,controls:!0,playsInline:!0,preload:"metadata",style:{marginBottom:12}}):e.jsxs("div",{style:{width:"100%",aspectRatio:"16/9",background:"#111",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,marginBottom:12,border:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx("span",{className:"mi",style:{fontSize:36,color:"rgba(255,255,255,0.15)"},children:"videocam_off"}),e.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.3)"},children:"Preview not available"}),e.jsx("span",{style:{fontSize:11,color:"rgba(255,255,255,0.2)"},children:"Video is stored on the server"})]}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:e.jsxs("button",{className:"lts-btn-primary",onClick:w,disabled:t.segments.length===0,children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"movie_creation"}),"Create ",t.segments.length," Short",t.segments.length!==1?"s":""]})})]}),e.jsxs("div",{className:"lts-review-sidebar",children:[e.jsxs("div",{className:"lts-review-header",children:[e.jsx("h3",{children:"Detected Segments"}),e.jsxs("span",{children:[t.segments.length," segment",t.segments.length!==1?"s":""]})]}),t.segments.some(s=>s.words?.length>0)&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10,textTransform:"uppercase",letterSpacing:"0.5px",color:"#64748b",fontWeight:600,marginBottom:8},children:"Caption Style"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},children:H.map(s=>e.jsxs("button",{onClick:()=>{y(s.id),r({type:"SET_CAPTIONS",enabled:s.id!=="none"})},style:{padding:"8px 10px",borderRadius:8,border:b===s.id?"1.5px solid #75AADB":"1px solid rgba(255,255,255,0.08)",background:b===s.id?"rgba(117,170,219,0.12)":"rgba(255,255,255,0.02)",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Spline Sans', sans-serif",color:b===s.id?"#75AADB":"#94a3b8",fontSize:11,fontWeight:b===s.id?600:400},children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:s.icon}),s.label]},s.id))})]}),t.segments.map(s=>{const o=Math.round(s.endSeconds-s.startSeconds);return e.jsxs("div",{className:"lts-segment",children:[e.jsxs("div",{className:"lts-segment-top",children:[h[s.id]?e.jsx("img",{className:"lts-segment-thumb",src:h[s.id],alt:""}):e.jsx("div",{className:"lts-segment-thumb"}),e.jsxs("div",{className:"lts-segment-info",children:[s.hookTitle&&e.jsx("p",{className:"lts-segment-hook",children:s.hookTitle}),e.jsxs("p",{className:"lts-segment-label",children:[s.label,typeof s.score=="number"&&e.jsxs("span",{className:`lts-score-badge ${V(s.score)}`,title:`Viral score: ${s.score}/100`,children:[s.score,e.jsx("span",{style:{fontWeight:500,opacity:.85},children:Y(s.score)})]})]}),e.jsx("p",{className:"lts-segment-reason",children:s.reason})]})]}),s.transcriptSnippet&&e.jsxs("p",{className:"lts-segment-transcript",children:[e.jsx("span",{className:"mi",style:{fontSize:12,verticalAlign:"middle",marginRight:4},children:"format_quote"}),s.transcriptSnippet.length>120?s.transcriptSnippet.slice(0,120)+"…":s.transcriptSnippet]}),e.jsxs("div",{style:{padding:"4px 0 2px",position:"relative"},children:[e.jsx("input",{type:"range",min:0,max:t.videoDuration,step:.5,value:s.startSeconds,onChange:i=>x(s.id,{startSeconds:Math.min(Number(i.target.value),s.endSeconds-1)}),style:{width:"100%",accentColor:"#75AADB",height:4},title:"Start point"}),e.jsx("input",{type:"range",min:0,max:t.videoDuration,step:.5,value:s.endSeconds,onChange:i=>x(s.id,{endSeconds:Math.max(Number(i.target.value),s.startSeconds+1)}),style:{width:"100%",accentColor:"#4ade80",height:4,marginTop:-4},title:"End point"})]}),e.jsxs("div",{className:"lts-segment-time",children:[e.jsx("input",{value:z(s.startSeconds),onChange:i=>x(s.id,{startSeconds:E(i.target.value)}),title:"Start time","aria-label":"Start time"}),e.jsx("span",{children:"—"}),e.jsx("input",{value:z(s.endSeconds),onChange:i=>x(s.id,{endSeconds:E(i.target.value)}),title:"End time","aria-label":"End time"}),e.jsxs("span",{className:"lts-segment-dur",children:[o,"s"]})]}),e.jsxs("div",{className:"lts-segment-actions",children:[e.jsxs("button",{onClick:()=>S(s),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"play_arrow"}),"Preview"]}),e.jsxs("button",{className:"delete",onClick:()=>a(s.id),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"delete"}),"Remove"]})]})]},s.id)}),e.jsxs("button",{className:"lts-add-segment",onClick:p,children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"add"}),"Add segment manually"]})]})]})}function q({state:t,dispatch:r}){const[l,h]=n.useState(0),f=n.useRef(!1),b=n.useRef(null);n.useEffect(()=>{if(f.current)return;f.current=!0;const d=Date.now();return b.current=setInterval(()=>{h(Math.floor((Date.now()-d)/1e3))},1e3),(async()=>{try{console.log("[Processing] Calling backend export API",{jobId:t.jobId,segments:t.segments.length});const x=await U(t.jobId,t.segments,!0);console.log("[Processing] Raw clips from server:",x.clips);const a=(x.clips||[]).map(p=>{const g=p.id||p.segmentId,u=t.segments.find(s=>s.id===g)||{},S=A(p.downloadUrl)||_(t.jobId,g),w=A(p.thumbnailUrl)||O(t.jobId,g);return console.log(`[Processing] clip ${g}: downloadUrl=${S}`),{id:g,label:u.label||"Clip",hookTitle:u.hookTitle,score:u.score,downloadUrl:S,thumbnailUrl:w}});console.log(`[Processing] Backend returned ${a.length} clips`),r({type:"PROCESSING_DONE",results:a})}catch(x){console.error("[Processing] Backend error:",x.message),r({type:"PROCESSING_ERROR",error:x.message})}finally{clearInterval(b.current)}})(),()=>clearInterval(b.current)},[]);const y=d=>d<60?`${d}s`:`${Math.floor(d/60)}m ${d%60}s`;return e.jsxs("div",{className:"lts-processing",children:[e.jsxs("p",{className:"lts-processing-title",children:["Creating your shorts (",t.segments.length," clip",t.segments.length!==1?"s":"",")"]}),e.jsx("div",{className:"lts-analysis-progress",style:{marginBottom:20},children:e.jsx("div",{className:"lts-analysis-bar",style:{width:`${Math.min(15+l*3,90)}%`,transition:"width 1s ease"}})}),e.jsxs("p",{style:{textAlign:"center",fontSize:13,color:"rgba(255,255,255,0.45)"},children:["Server is cutting, cropping to 9:16, and preserving audio (",y(l),")"]}),t.segments.map(d=>e.jsxs("div",{className:"lts-processing-item",children:[e.jsx("div",{className:"lts-analysis-spinner",style:{width:20,height:20,margin:0,borderWidth:2}}),e.jsx("span",{className:"label",children:d.hookTitle||d.label})]},d.id))]})}function J(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"").slice(0,40)||"short"}function k(t,r){const l=String(r+1).padStart(2,"0"),h=J(t.hookTitle||t.label);return`clip_${l}_${h}.mp4`}function K(t){const r=Math.floor(t/60),l=Math.floor(t%60);return`${r}:${l.toString().padStart(2,"0")}`}function X({state:t,dispatch:r,navigate:l}){const[h,f]=n.useState(!1),[b,y]=n.useState(0),[d,x]=n.useState(null),a=n.useMemo(()=>t.results.filter(s=>s.downloadUrl),[t.results]),p=n.useMemo(()=>{const s=a.filter(i=>typeof i.score=="number").map(i=>i.score),o=t.segments.map(i=>(i.endSeconds||0)-(i.startSeconds||0));return{totalClips:a.length,avgScore:s.length>0?Math.round(s.reduce((i,m)=>i+m,0)/s.length):null,bestScore:s.length>0?Math.max(...s):null,totalDuration:o.reduce((i,m)=>i+m,0),avgDuration:o.length>0?Math.round(o.reduce((i,m)=>i+m,0)/o.length):0,viralCount:s.filter(i=>i>=70).length}},[a,t.segments]),g=n.useCallback(async()=>{f(!0),y(0);for(let s=0;s<a.length;s++){try{const i=await(await fetch(a[s].downloadUrl)).blob(),m=URL.createObjectURL(i),v=document.createElement("a");v.href=m,v.download=k(a[s],s),document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(m)}catch(o){console.error(`Failed to download clip ${s+1}:`,o)}y(s+1)}setTimeout(()=>f(!1),800)},[a]),u=n.useCallback(async(s,o)=>{const i=k(s,o);try{const v=await(await fetch(s.downloadUrl)).blob(),c=new File([v],i,{type:"video/mp4"});if(navigator.share&&navigator.canShare?.({files:[c]})){await navigator.share({title:s.hookTitle||s.label,files:[c]});return}}catch{}try{await navigator.clipboard.writeText(s.downloadUrl),x(s.id),setTimeout(()=>x(null),2e3)}catch{}},[]),S=n.useCallback(async(s,o)=>{try{const m=await(await fetch(s.downloadUrl)).blob(),v=new File([m],k(s,o),{type:"video/mp4"});l("/editor",{state:{filesToImport:[v]}})}catch(i){console.error("Failed to fetch clip for editor:",i)}},[l]),w=n.useCallback(()=>{r({type:"RESET"})},[r]);return a.length===0?e.jsxs("div",{className:"lts-done",children:[e.jsx("p",{className:"lts-done-title",children:"No valid clips were produced"}),e.jsx("p",{className:"lts-done-sub",children:"Export failed on the server. Try again with different segments."}),e.jsx("div",{className:"lts-done-actions",children:e.jsxs("button",{className:"lts-btn-primary",onClick:w,children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"refresh"}),"Start over"]})})]}):e.jsxs("div",{className:"lts-done",children:[e.jsx("p",{className:"lts-done-title",children:"Your shorts are ready!"}),e.jsxs("p",{className:"lts-done-sub",children:[a.length," vertical short",a.length!==1?"s":""," created"]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:10,margin:"16px 0",padding:14,borderRadius:10,background:"rgba(117,170,219,0.06)",border:"1px solid rgba(117,170,219,0.12)"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:"#f1f5f9"},children:p.totalClips}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Clips"})]}),p.avgScore!==null&&e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:p.avgScore>=70?"#4ade80":p.avgScore>=40?"#fbbf24":"#f87171"},children:p.avgScore}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Avg Score"})]}),p.viralCount>0&&e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:"#4ade80"},children:p.viralCount}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Viral"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:"#f1f5f9"},children:K(p.totalDuration)}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Total"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:20,fontWeight:700,color:"#f1f5f9"},children:[p.avgDuration,"s"]}),e.jsx("div",{style:{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Avg Clip"})]})]}),e.jsx("div",{className:"lts-done-grid",children:a.map((s,o)=>e.jsxs("div",{className:"lts-done-card",children:[e.jsx("video",{src:s.downloadUrl,controls:!0,muted:!0,playsInline:!0,crossOrigin:"anonymous"}),e.jsxs("div",{className:"lts-done-card-body",children:[e.jsx("p",{className:"lts-done-card-label",children:s.hookTitle||s.label}),typeof s.score=="number"&&e.jsxs("span",{className:`lts-score-badge ${s.score>=70?"score-viral":s.score>=40?"score-good":"score-low"}`,style:{marginLeft:0,marginBottom:8},children:[s.score," ",s.score>=70?"Viral":s.score>=40?"Good":"Low"]}),e.jsxs("div",{className:"lts-done-card-btns",children:[e.jsxs("a",{className:"lts-btn-secondary",href:s.downloadUrl,download:k(s,o),style:{textDecoration:"none"},children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"download"}),"Download"]}),e.jsxs("button",{className:"lts-btn-secondary",onClick:()=>u(s,o),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:d===s.id?"check":"share"}),d===s.id?"Copied!":"Share"]}),e.jsxs("button",{className:"lts-btn-secondary",onClick:()=>S(s,o),children:[e.jsx("span",{className:"mi",style:{fontSize:14},children:"movie_edit"}),"Edit"]})]})]})]},s.id))}),e.jsxs("div",{className:"lts-done-actions",children:[e.jsxs("button",{className:"lts-btn-secondary",onClick:w,children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"refresh"}),"Start over"]}),e.jsxs("button",{className:"lts-btn-primary",onClick:g,disabled:h,children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"download"}),h?`Downloading ${b}/${a.length}...`:"Download All"]})]})]})}const Q=["Upload","Analyze","Review","Export"],C={step:"UPLOAD",jobId:null,videoFile:null,videoUrl:null,videoDuration:0,videoWidth:0,videoHeight:0,clipDuration:30,captionsEnabled:!0,segments:[],results:[],error:null};function ee(t,r){switch(r.type){case"SET_VIDEO":return{...t,step:"UPLOAD",videoFile:r.file,videoUrl:r.url,videoDuration:r.duration,videoWidth:r.width,videoHeight:r.height,error:null};case"SET_JOB_ID":return{...t,jobId:r.jobId};case"SET_CLIP_DURATION":return{...t,clipDuration:r.clipDuration};case"SET_CAPTIONS":return{...t,captionsEnabled:r.enabled};case"START_ANALYSIS":return{...t,step:"ANALYZING",error:null};case"ANALYSIS_DONE":return{...t,step:"REVIEW",segments:r.segments,error:null};case"ANALYSIS_ERROR":return{...t,step:"UPLOAD",error:r.error};case"SET_SEGMENTS":return{...t,segments:r.segments};case"START_PROCESSING":return{...t,step:"PROCESSING",error:null};case"PROCESSING_DONE":return{...t,step:"DONE",results:r.results,error:null};case"PROCESSING_ERROR":return{...t,step:"REVIEW",error:r.error};case"RESET":return t.videoUrl&&URL.revokeObjectURL(t.videoUrl),{...C};default:return t}}const te=`
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
`;function oe(){const t=T(),[r,l]=n.useReducer(ee,C),h=n.useRef(null),f={UPLOAD:0,ANALYZING:1,REVIEW:2,PROCESSING:3,DONE:3}[r.step]??0,b=n.useCallback(()=>{l({type:"RESET"}),t("/dashboard")},[t]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:te}),e.jsxs("div",{className:"lts-root",children:[e.jsxs("header",{className:"lts-topbar",children:[e.jsxs("button",{className:"lts-back",onClick:b,children:[e.jsx("span",{className:"mi",children:"arrow_back"}),"Back"]}),e.jsxs("div",{className:"lts-title",children:[e.jsx("div",{className:"lts-title-icon",children:e.jsx("span",{className:"mi",style:{fontSize:16,color:"white"},children:"content_cut"})}),"Long to Shorts"]}),e.jsx("div",{className:"lts-steps",children:Q.map((y,d)=>e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[d>0&&e.jsx("span",{className:"lts-step-arrow",children:e.jsx("span",{className:"mi",style:{fontSize:14},children:"chevron_right"})}),e.jsx("span",{className:`lts-step ${d===f?"active":d<f?"done":""}`,children:y})]},y))})]}),e.jsxs("div",{className:"lts-content",children:[r.error&&e.jsxs("div",{className:"lts-error",style:{position:"absolute",top:72,left:24,right:24,zIndex:10},children:[e.jsx("span",{className:"mi",style:{fontSize:18},children:"error"}),e.jsx("span",{style:{flex:1},children:r.error}),r.videoFile&&e.jsxs("button",{className:"lts-btn-secondary",style:{marginLeft:"auto",flexShrink:0},onClick:()=>l({type:"START_ANALYSIS"}),children:[e.jsx("span",{className:"mi",style:{fontSize:16},children:"refresh"}),"Retry"]})]}),r.step==="UPLOAD"&&e.jsx(W,{state:r,dispatch:l}),r.step==="ANALYZING"&&e.jsx(G,{state:r,dispatch:l}),r.step==="REVIEW"&&e.jsx(Z,{state:r,dispatch:l,videoRef:h}),r.step==="PROCESSING"&&e.jsx(q,{state:r,dispatch:l}),r.step==="DONE"&&e.jsx(X,{state:r,dispatch:l,navigate:t})]})]})]})}export{oe as default};
