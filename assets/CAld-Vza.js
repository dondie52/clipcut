import{r as o,j as e}from"./-P2Ya96f.js";import{s as w,S as X,I as x}from"./DaDLBkl2.js";import"./fr5aj7dF.js";import"./DZxFKcQQ.js";import"./Et-wlZO3.js";import"./TQlpFJ0r.js";import"./B9CjrYEi.js";import"./z5OAa6an.js";const k={video:{mimeTypes:["video/mp4","video/webm","video/quicktime","video/x-msvideo","video/x-matroska"],extensions:[".mp4",".webm",".mov",".avi",".mkv"],label:"Video"},audio:{mimeTypes:["audio/mpeg","audio/wav","audio/ogg","audio/mp4","audio/webm","audio/aac","audio/flac"],extensions:[".mp3",".wav",".ogg",".m4a",".webm",".aac",".flac"],label:"Audio"},image:{mimeTypes:["image/jpeg","image/png","image/webp","image/gif"],extensions:[".jpg",".jpeg",".png",".webp",".gif"],label:"Image"}},F={video:500*1024*1024,audio:100*1024*1024,image:25*1024*1024,avatar:5*1024*1024,thumbnail:5*1024*1024,default:500*1024*1024};function q(t){if(!t||typeof t!="string")return"";const s=t.lastIndexOf(".");return s===-1?"":t.slice(s).toLowerCase()}function $(t){if(!t)return null;for(const[s,i]of Object.entries(k))if(i.mimeTypes.includes(t))return s;return null}function N(t){if(t===0)return"0 B";const s=["B","KB","MB","GB"],i=1024,r=Math.floor(Math.log(t)/Math.log(i));return`${parseFloat((t/Math.pow(i,r)).toFixed(1))} ${s[r]}`}function Q(t,s){if(!t||!t.name)return{valid:!1,error:"No file provided"};const i=s||Object.keys(k),r=i.flatMap(p=>k[p]?.mimeTypes||[]),c=i.flatMap(p=>k[p]?.extensions||[]),l=r.includes(t.type),g=q(t.name),u=c.includes(g);return!l&&!u?{valid:!1,error:`Unsupported file format. Allowed types: ${i.map(m=>k[m]?.label).filter(Boolean).join(", ")} (${c.join(", ")})`}:l&&!u?{valid:!0,category:$(t.type)}:!l&&u?{valid:!0,category:null}:{valid:!0,category:$(t.type)}}function U(t,s,i){if(!t)return{valid:!1,error:"No file provided"};const r=i||F[s]||F.default;return t.size>r?{valid:!1,error:`File is too large (${N(t.size)}). Maximum size: ${N(r)}`}:t.size===0?{valid:!1,error:"File is empty"}:{valid:!0}}function Z(t,s={}){const{allowedCategories:i,category:r,maxSize:c}=s,l=Q(t,i);if(!l.valid)return l;const g=r||l.category||"default",u=U(t,g,c);return u.valid?{valid:!0,category:l.category}:u}function A(t,s={}){const i=[],r=[],c=Array.from(t);for(const l of c){const g=Z(l,s);g.valid?r.push(l):i.push({file:l.name,error:g.error})}return{valid:i.length===0,errors:i,validFiles:r}}function J(t){return(t||Object.keys(k)).flatMap(i=>k[i]?.mimeTypes||[]).join(",")}const ee=`
  ${X}
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(117, 170, 219, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(117, 170, 219, 0); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .media-item {
    animation: fadeIn 0.3s ease forwards;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  
  .media-item:hover {
    transform: translateY(-2px);
  }
  
  .media-item:active {
    transform: translateY(0) scale(0.98);
  }
  
  .media-item-thumbnail {
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  
  .media-item:hover .media-item-thumbnail {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
  
  .media-item-overlay {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .media-item:hover .media-item-overlay {
    opacity: 1;
  }
  
  .import-btn {
    transition: all 0.2s ease;
  }
  
  .import-btn:hover:not(:disabled) {
    border-color: #75aadb !important;
    background: rgba(117, 170, 219, 0.08) !important;
    transform: translateY(-1px);
  }
  
  .import-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.99);
  }
  
  .import-btn-dragover {
    animation: pulse-glow 1.5s ease-in-out infinite;
    border-color: #75aadb !important;
    background: rgba(117, 170, 219, 0.15) !important;
  }
  
  .tab-btn {
    transition: all 0.15s ease;
    position: relative;
  }
  
  .tab-btn::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #75aadb;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }
  
  .tab-btn.active::after {
    transform: scaleX(1);
  }
  
  .view-toggle-btn {
    transition: all 0.15s ease;
    padding: 4px;
    border-radius: 4px;
  }
  
  .view-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .remove-btn {
    transition: all 0.15s ease;
  }
  
  .remove-btn:hover {
    transform: scale(1.1);
    background: #dc2626 !important;
  }
  
  .thumbnail-loading {
    background: linear-gradient(90deg, #1a2332 25%, #2a3a4d 50%, #1a2332 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  .add-to-timeline-btn {
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.2s ease;
  }
  
  .media-item:hover .add-to-timeline-btn {
    opacity: 1;
    transform: translateY(0);
  }
  
  .empty-state-icon {
    animation: fadeIn 0.5s ease;
  }
`,W=o.memo(({item:t,isSelected:s,onSelect:i,onAddToTimeline:r,onRemove:c,onContextMenu:l,index:g})=>{const[u,d]=o.useState(!1),[p,m]=o.useState(!1),y=o.useCallback(n=>{if(!n||!isFinite(n))return"0:00";const v=Math.floor(n/60),b=Math.floor(n%60);return`${v}:${b.toString().padStart(2,"0")}`},[]),C=o.useCallback(n=>{m(!0),n.dataTransfer.setData("mediaItemId",t.id),n.dataTransfer.setData("mediaType",t.type||"video"),n.dataTransfer.effectAllowed="copy";const v=document.createElement("div");v.style.cssText=`
      background: #1a2332;
      border: 1px solid #75aadb;
      border-radius: 6px;
      padding: 8px 12px;
      color: white;
      font-size: 12px;
      font-family: 'Spline Sans', sans-serif;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    `;const b=document.createElement("span");b.style.color="#75aadb",b.textContent="▶";const I=document.createElement("span");I.textContent=t.name,v.appendChild(b),v.appendChild(I),document.body.appendChild(v),n.dataTransfer.setDragImage(v,20,20),setTimeout(()=>{document.body.removeChild(v)},0)},[t.id,t.type,t.name]),h=o.useCallback(()=>{m(!1)},[]),z=o.useCallback(n=>{n.key==="Enter"?(n.preventDefault(),r(t)):(n.key==="Delete"||n.key==="Backspace")&&(n.preventDefault(),c(t.id))},[t,r,c]);return e.jsxs("div",{onClick:()=>i(t.id),onDoubleClick:()=>r(t),onContextMenu:n=>{n.preventDefault(),l?.(n,t)},onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),onKeyDown:z,draggable:!0,onDragStart:C,onDragEnd:h,className:"media-item",role:"button",tabIndex:0,"aria-label":`${t.name}, ${y(t.duration)}, ${t.width}x${t.height}. Double-click or press Enter to add to timeline.`,"aria-selected":s,style:{display:"flex",flexDirection:"column",gap:"4px",cursor:"pointer",position:"relative",animationDelay:`${g*50}ms`,opacity:p?.5:1},children:[e.jsxs("div",{className:"media-item-thumbnail",style:{aspectRatio:"16/9",borderRadius:"6px",overflow:"hidden",border:s?"2px solid #75aadb":u?"1px solid rgba(117, 170, 219, 0.5)":"1px solid rgba(255,255,255,0.06)",position:"relative",background:"#0a0a0a"},children:[t.thumbnail?e.jsx("img",{src:t.thumbnail,alt:t.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}}):t.isProcessing?e.jsx("div",{className:"thumbnail-loading",style:{width:"100%",height:"100%"}}):e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #1a2332 0%, #0a0a0a 100%)"},children:e.jsx(x,{i:t.type==="audio"?"music_note":"movie",s:24,c:"#475569"})}),e.jsx("span",{style:{position:"absolute",top:"4px",right:"4px",background:"rgba(0,0,0,0.8)",fontSize:"9px",padding:"2px 6px",borderRadius:"3px",color:"white",fontWeight:500,letterSpacing:"0.5px",backdropFilter:"blur(4px)"},children:y(t.duration)}),e.jsx("div",{className:"media-item-overlay",style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"8px"},children:e.jsxs("button",{onClick:n=>{n.stopPropagation(),r(t)},className:"add-to-timeline-btn",style:{background:"#75aadb",border:"none",borderRadius:"4px",padding:"4px 10px",fontSize:"10px",fontWeight:600,color:"#0a0a0a",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Add ${t.name} to timeline`,children:[e.jsx(x,{i:"add",s:12,c:"#0a0a0a"}),"Add to Timeline"]})}),t.isProcessing&&e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)"},children:e.jsx("div",{style:{width:"24px",height:"24px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),(s||u)&&!t.isProcessing&&e.jsx("button",{onClick:n=>{n.stopPropagation(),c(t.id)},className:"remove-btn",style:{position:"absolute",top:"4px",left:"4px",width:"22px",height:"22px",borderRadius:"50%",background:"rgba(239,68,68,0.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,boxShadow:"0 2px 8px rgba(0, 0, 0, 0.3)"},"aria-label":`Remove ${t.name}`,title:"Remove from media library",children:e.jsx(x,{i:"close",s:12,c:"white"})}),t.type==="audio"&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",background:"rgba(117, 170, 219, 0.9)",borderRadius:"4px",padding:"2px 6px",display:"flex",alignItems:"center",gap:"3px"},children:[e.jsx(x,{i:"music_note",s:10,c:"white"}),e.jsx("span",{style:{fontSize:"8px",fontWeight:600,color:"white"},children:"AUDIO"})]})]}),e.jsx("p",{style:{fontSize:"10px",color:s?"#75aadb":u?"#cbd5e1":"#94a3b8",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:s?500:400,transition:"color 0.15s ease"},children:t.name}),t.width&&t.height&&e.jsxs("p",{style:{fontSize:"9px",color:"#475569",margin:0},children:[t.width,"x",t.height]})]})});W.displayName="MediaItem";const T=o.memo(()=>e.jsxs("div",{className:"empty-state-icon",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"220px",color:"#475569",textAlign:"center",padding:"24px"},role:"status","aria-label":"No media imported",children:[e.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"18px",background:"linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.02) 100%)",border:"1px solid rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"},children:e.jsx(x,{i:"video_library",s:32,c:"#3d4a5c"})}),e.jsx("p",{style:{fontSize:"13px",margin:"0 0 6px 0",fontWeight:600,color:"#64748b"},children:"No media yet"}),e.jsx("p",{style:{fontSize:"11px",color:"#3d4a5c",margin:"0 0 16px 0",lineHeight:1.5},children:"Import video and audio to start editing"}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(x,{i:"keyboard",s:12,c:"#2d3748"}),e.jsx("span",{style:{fontSize:"9px",color:"#334155"},children:"Ctrl+I"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(x,{i:"mouse",s:12,c:"#2d3748"}),e.jsx("span",{style:{fontSize:"9px",color:"#334155"},children:"Drag & Drop"})]})]})]}));T.displayName="EmptyState";const B=o.memo(({x:t,y:s,item:i,onClose:r,onAddToTimeline:c,onRemove:l})=>{const g=o.useRef(null);o.useEffect(()=>{const d=m=>{g.current&&!g.current.contains(m.target)&&r()},p=m=>{m.key==="Escape"&&r()};return document.addEventListener("mousedown",d),document.addEventListener("keydown",p),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",p)}},[r]);const u=[{label:"Add to timeline",icon:"add",action:()=>{c(i),r()}},{label:"Delete from project",icon:"delete",action:()=>{l(i.id),r()},color:"#ef4444"}];return e.jsx("div",{ref:g,style:{position:"fixed",left:t,top:s,zIndex:9999,background:"#1a2332",border:"1px solid rgba(117,170,219,0.15)",borderRadius:"8px",padding:"4px 0",minWidth:"160px",boxShadow:"0 8px 24px rgba(0,0,0,0.5)"},children:u.map(d=>e.jsxs("button",{onClick:d.action,style:{...w.ghost,width:"100%",display:"flex",alignItems:"center",gap:"8px",padding:"6px 12px",fontSize:"11px",fontWeight:500,color:d.color||"#cbd5e1",textAlign:"left"},onMouseEnter:p=>p.currentTarget.style.background="rgba(117,170,219,0.1)",onMouseLeave:p=>p.currentTarget.style.background="transparent",children:[e.jsx(x,{i:d.icon,s:14,c:d.color||"#64748b"}),d.label]},d.label))})});B.displayName="ContextMenu";const te=({mediaTab:t,onMediaTabChange:s,mediaItems:i=[],onImportMedia:r,onRemoveMedia:c,onAddToTimeline:l,selectedMediaId:g,onSelectMedia:u,isImporting:d=!1,style:p})=>{const m=o.useRef(null),[y,C]=o.useState(!1),[h,z]=o.useState("grid"),[n,v]=o.useState(""),[b,I]=o.useState("all"),[M,E]=o.useState(null),R=o.useMemo(()=>{let a=i;if(b!=="all"&&(a=a.filter(f=>f.type===b)),n.trim()){const f=n.toLowerCase();a=a.filter(j=>j.name?.toLowerCase().includes(f))}return a},[i,b,n]),P=o.useMemo(()=>({all:i.length,video:i.filter(a=>a.type==="video").length,audio:i.filter(a=>a.type==="audio").length}),[i]),L=o.useCallback(()=>{m.current?.click()},[]),Y=o.useCallback(a=>{const f=Array.from(a.target.files||[]);if(f.length>0&&r){const{validFiles:j,errors:S}=A(f,{allowedCategories:["video","audio"]});S.length>0&&alert(`Some files were rejected:
${S.map(D=>`${D.file}: ${D.error}`).join(`
`)}`),j.length>0&&r(j)}a.target.value=""},[r]),_=o.useCallback(a=>{a.preventDefault(),a.stopPropagation(),C(!0)},[]),O=o.useCallback(a=>{a.preventDefault(),a.stopPropagation(),a.currentTarget.contains(a.relatedTarget)||C(!1)},[]),V=o.useCallback(a=>{a.preventDefault(),a.stopPropagation(),C(!1);const f=Array.from(a.dataTransfer.files),{validFiles:j,errors:S}=A(f,{allowedCategories:["video","audio"]});S.length>0&&alert(`Some files were rejected:
${S.map(D=>`${D.file}: ${D.error}`).join(`
`)}`),j.length>0&&r&&r(j)},[r]),K=o.useCallback(a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),L())},[L]),H=o.useCallback((a,f)=>{E({x:a.clientX,y:a.clientY,item:f})},[]),G=o.useCallback(()=>E(null),[]);return e.jsxs("aside",{className:"editor-left-panel",style:{...w.leftPanel,...p},role:"complementary","aria-label":"Media panel",children:[e.jsx("style",{children:ee}),e.jsxs("div",{style:{height:"32px",display:"flex",alignItems:"center",padding:"0 14px",borderBottom:"1px solid rgba(117,170,219,0.04)",background:"rgba(15,23,42,0.3)"},children:[e.jsx("span",{style:{fontSize:"10px",fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"1.5px"},children:"Media"}),i.length>0&&e.jsxs("span",{style:{marginLeft:"auto",fontSize:"9px",fontWeight:600,color:"#75aadb",background:"rgba(117,170,219,0.1)",padding:"2px 8px",borderRadius:"10px"},children:[i.length," ",i.length===1?"file":"files"]})]}),e.jsxs("div",{style:{padding:"10px 12px",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"0"},role:"tablist","aria-label":"Media sources",children:["Local","Library"].map(a=>e.jsx("button",{onClick:()=>s(a.toLowerCase()),role:"tab","aria-selected":t===a.toLowerCase(),"aria-controls":`${a.toLowerCase()}-panel`,className:`tab-btn ${t===a.toLowerCase()?"active":""}`,style:{...w.ghost,fontSize:"11px",fontWeight:600,padding:"4px 12px 6px",color:t===a.toLowerCase()?"#75aadb":"#4a5568"},children:a},a))}),t==="local"&&e.jsxs("div",{style:{display:"flex",gap:"2px"},role:"group","aria-label":"View mode",children:[e.jsx("button",{onClick:()=>z("list"),className:"view-toggle-btn",style:{...w.ghost,background:h==="list"?"rgba(117,170,219,0.12)":"transparent",borderRadius:"4px",padding:"4px"},"aria-label":"List view","aria-pressed":h==="list",title:"List view",children:e.jsx(x,{i:"list",s:16,c:h==="list"?"#75aadb":"#475569"})}),e.jsx("button",{onClick:()=>z("grid"),className:"view-toggle-btn",style:{...w.ghost,background:h==="grid"?"rgba(117,170,219,0.12)":"transparent",borderRadius:"4px",padding:"4px"},"aria-label":"Grid view","aria-pressed":h==="grid",title:"Grid view",children:e.jsx(x,{i:"grid_view",s:16,c:h==="grid"?"#75aadb":"#475569"})})]})]}),t==="local"&&i.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx(x,{i:"search",s:14,c:"#4a5568",style:{position:"absolute",left:"8px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}),e.jsx("input",{type:"text",placeholder:"Search media...",value:n,onChange:a=>v(a.target.value),style:{width:"100%",background:"rgba(26,35,50,0.4)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"6px",padding:"5px 8px 5px 28px",color:"white",fontSize:"11px",outline:"none",fontFamily:"inherit",boxSizing:"border-box"},"aria-label":"Search imported media"})]}),e.jsx("div",{style:{display:"flex",gap:"4px",flexWrap:"wrap"},children:[{key:"all",label:"All"},{key:"video",label:"Video"},{key:"audio",label:"Audio"}].map(a=>e.jsxs("button",{onClick:()=>I(a.key),style:{...w.ghost,fontSize:"9px",fontWeight:600,padding:"2px 8px",borderRadius:"10px",color:b===a.key?"#e2e8f0":"#4a5568",background:b===a.key?"rgba(117,170,219,0.15)":"rgba(255,255,255,0.03)",border:b===a.key?"1px solid rgba(117,170,219,0.25)":"1px solid transparent"},"aria-pressed":b===a.key,children:[a.label," (",P[a.key],")"]},a.key))})]}),t==="local"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{ref:m,type:"file",accept:J(["video","audio"]),multiple:!0,onChange:Y,style:{display:"none"},"aria-hidden":"true"}),e.jsx("button",{onClick:L,onKeyDown:K,onDragOver:_,onDragLeave:O,onDrop:V,disabled:d,className:`import-btn ${y?"import-btn-dragover":""}`,style:{...w.importBtn,padding:"12px",borderColor:y?"#75aadb":"rgba(117,170,219,0.12)",background:y?"rgba(117,170,219,0.08)":"rgba(117,170,219,0.02)",opacity:d?.6:1,cursor:d?"wait":"pointer",flexDirection:"row",gap:"10px",justifyContent:"center"},"aria-label":d?"Importing media...":"Import media files",title:"Click to browse or drag & drop files",children:d?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsx("span",{style:{fontSize:"11px",color:"#75aadb",fontWeight:600},children:"Importing..."})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:y?"rgba(117,170,219,0.2)":"rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(117,170,219,0.12)",transition:"all 0.2s ease"},children:e.jsx(x,{i:y?"file_download":"add",s:16,c:y?"#75aadb":"#64748b"})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"1px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:600,color:y?"#75aadb":"#94a3b8",transition:"all 0.2s ease"},children:y?"Release to import":"Import Media"}),e.jsx("span",{style:{fontSize:"9px",color:"#3d4a5c"},children:"Video, audio — drag & drop or click"})]})]})})]})]}),t==="local"?e.jsx("div",{style:{flex:1,overflowY:"auto",padding:"0 16px 16px"},className:"cs",role:"tabpanel",id:"local-panel","aria-label":"Local media",children:i.length===0?e.jsx(T,{}):R.length===0?e.jsxs("div",{style:{padding:"24px 16px",textAlign:"center"},children:[e.jsx(x,{i:"search_off",s:28,c:"#3d4a5c"}),e.jsx("p",{style:{fontSize:"11px",color:"#4a5568",margin:"8px 0 0"},children:"No matching media"})]}):e.jsx("div",{style:{display:h==="grid"?"grid":"flex",gridTemplateColumns:h==="grid"?"1fr 1fr":void 0,flexDirection:h==="list"?"column":void 0,gap:"10px"},role:"list","aria-label":"Imported media items",children:R.map((a,f)=>e.jsx(W,{item:a,isSelected:g===a.id,onSelect:u,onAddToTimeline:l,onRemove:c,onContextMenu:H,index:f},a.id))})}):e.jsxs("div",{role:"tabpanel",id:"library-panel","aria-label":"Community library",style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",textAlign:"center"},children:[e.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"},children:e.jsx(x,{i:"public",s:32,c:"#475569"})}),e.jsx("p",{style:{fontSize:"14px",fontWeight:600,color:"#cbd5e1",margin:"0 0 6px"},children:"Community Templates"}),e.jsxs("p",{style:{fontSize:"12px",color:"#64748b",margin:"0 0 16px",lineHeight:1.5},children:["Browse and use templates shared by",e.jsx("br",{}),"other ClipCut creators"]}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",background:"rgba(117, 170, 219, 0.08)",border:"1px solid rgba(117, 170, 219, 0.15)",fontSize:"11px",fontWeight:600,color:"#75aadb"},children:[e.jsx(x,{i:"schedule",s:14,c:"#75aadb"}),"Coming Soon"]})]}),M&&e.jsx(B,{x:M.x,y:M.y,item:M.item,onClose:G,onAddToTimeline:l,onRemove:c})]})},pe=o.memo(te);export{pe as default};
