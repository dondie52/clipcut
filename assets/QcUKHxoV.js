import{r as i,j as e}from"./DwQPoapS.js";import{s as j,S as T,I as l}from"./C50FG_Hq.js";import{a as W,g as V}from"./DccWSldF.js";import{d as M}from"./DIp2X_oE.js";import"./Et-wlZO3.js";import"./D4NBonJH.js";import"./3ghgip0a.js";import"./DtdS7tRU.js";import"./B9CjrYEi.js";import"./CrFPy8FH.js";import"./C_8A2FPv.js";const X=`
  ${T}
  
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
`,N=i.memo(({item:a,isSelected:u,onSelect:s,onAddToTimeline:o,onRemove:f,onContextMenu:k,index:m})=>{const[y,n]=i.useState(!1),[g,h]=i.useState(!1),c=i.useCallback(r=>{if(!r||!isFinite(r))return"0:00";const b=Math.floor(r/60),d=Math.floor(r%60);return`${b}:${d.toString().padStart(2,"0")}`},[]),w=i.useCallback(r=>{h(!0),r.dataTransfer.setData("mediaItemId",a.id),r.dataTransfer.setData("mediaType",a.type||"video"),r.dataTransfer.effectAllowed="copy";const b=document.createElement("div");b.style.cssText=`
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
    `;const d=document.createElement("span");d.style.color="#75aadb",d.textContent="▶";const z=document.createElement("span");z.textContent=a.name,b.appendChild(d),b.appendChild(z),document.body.appendChild(b),r.dataTransfer.setDragImage(b,20,20),setTimeout(()=>{document.body.removeChild(b)},0)},[a.id,a.type,a.name]),x=i.useCallback(()=>{h(!1)},[]),D=i.useCallback(r=>{r.key==="Enter"?(r.preventDefault(),o(a)):(r.key==="Delete"||r.key==="Backspace")&&(r.preventDefault(),f(a.id))},[a,o,f]);return e.jsxs("div",{onClick:()=>s(a.id),onDoubleClick:()=>o(a),onContextMenu:r=>{r.preventDefault(),k?.(r,a)},onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onKeyDown:D,draggable:!0,onDragStart:w,onDragEnd:x,className:"media-item",role:"button",tabIndex:0,"aria-label":`${a.name}, ${c(a.duration)}, ${a.width}x${a.height}. Double-click or press Enter to add to timeline.`,"aria-selected":u,style:{display:"flex",flexDirection:"column",gap:"4px",cursor:"pointer",position:"relative",animationDelay:`${m*50}ms`,opacity:g?.5:1,minWidth:0,width:"100%",maxWidth:"100%",boxSizing:"border-box"},children:[e.jsxs("div",{className:"media-item-thumbnail",style:{width:"100%",maxWidth:"100%",minWidth:0,aspectRatio:"16/9",borderRadius:"6px",overflow:"hidden",border:u?"2px solid #75aadb":y?"1px solid rgba(117, 170, 219, 0.5)":"1px solid rgba(255,255,255,0.06)",position:"relative",background:"#0a0a0a",boxSizing:"border-box",flexShrink:0},children:[a.thumbnail?e.jsx("img",{src:a.thumbnail,alt:a.name,loading:"lazy",draggable:!1,style:{position:"absolute",inset:0,width:"100%",height:"100%",maxWidth:"100%",objectFit:"cover",display:"block",pointerEvents:"none"}}):a.isProcessing?e.jsx("div",{className:"thumbnail-loading",style:{position:"absolute",inset:0,width:"100%",height:"100%"}}):e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #1a2332 0%, #0a0a0a 100%)"},children:e.jsx(l,{i:a.type==="audio"?"music_note":"movie",s:24,c:"#475569"})}),e.jsx("span",{style:{position:"absolute",top:"4px",right:"4px",zIndex:2,background:"rgba(0,0,0,0.8)",fontSize:"9px",padding:"2px 6px",borderRadius:"3px",color:"white",fontWeight:500,letterSpacing:"0.5px",backdropFilter:"blur(4px)"},children:c(a.duration)}),a._mediaError&&e.jsx("span",{style:{position:"absolute",bottom:"4px",right:"4px",zIndex:2,background:"rgba(239,68,68,0.9)",fontSize:"8px",padding:"2px 6px",borderRadius:"999px",color:"white",fontWeight:600,letterSpacing:"0.4px"},children:"MISSING"}),e.jsx("div",{className:"media-item-overlay",style:{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"8px"},children:e.jsxs("button",{onClick:r=>{r.stopPropagation(),o(a)},className:"add-to-timeline-btn",style:{background:"#75aadb",border:"none",borderRadius:"4px",padding:"4px 10px",fontSize:"10px",fontWeight:600,color:"#0a0a0a",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Add ${a.name} to timeline`,children:[e.jsx(l,{i:"add",s:12,c:"#0a0a0a"}),"Add to Timeline"]})}),a.isProcessing&&e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)"},children:e.jsx("div",{style:{width:"24px",height:"24px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),(u||y)&&!a.isProcessing&&e.jsx("button",{onClick:r=>{r.stopPropagation(),f(a.id)},className:"remove-btn",style:{position:"absolute",top:"4px",left:"4px",width:"22px",height:"22px",borderRadius:"50%",background:"rgba(239,68,68,0.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,boxShadow:"0 2px 8px rgba(0, 0, 0, 0.3)"},"aria-label":`Remove ${a.name}`,title:"Remove from media library",children:e.jsx(l,{i:"close",s:12,c:"white"})}),a.type==="audio"&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",background:"rgba(117, 170, 219, 0.9)",borderRadius:"4px",padding:"2px 6px",display:"flex",alignItems:"center",gap:"3px"},children:[e.jsx(l,{i:"music_note",s:10,c:"white"}),e.jsx("span",{style:{fontSize:"8px",fontWeight:600,color:"white"},children:"AUDIO"})]})]}),e.jsx("p",{style:{fontSize:"10px",color:u?"#75aadb":y?"#cbd5e1":"#94a3b8",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:u?500:400,transition:"color 0.15s ease"},children:a.name}),a._mediaError&&e.jsx("p",{style:{fontSize:"9px",color:"#ef4444",margin:"2px 0 0",lineHeight:1.4},children:"Re-import source media to restore preview"}),a.width&&a.height&&!a._mediaError&&e.jsxs("p",{style:{fontSize:"9px",color:"#475569",margin:0},children:[a.width,"x",a.height]})]})});N.displayName="MediaItem";const $=i.memo(()=>e.jsxs("div",{className:"empty-state-icon",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"220px",color:"#475569",textAlign:"center",padding:"24px"},role:"status","aria-label":"No media imported",children:[e.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"18px",background:"linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.02) 100%)",border:"1px solid rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"},children:e.jsx(l,{i:"video_library",s:32,c:"#3d4a5c"})}),e.jsx("p",{style:{fontSize:"13px",margin:"0 0 6px 0",fontWeight:600,color:"#64748b"},children:"No media yet"}),e.jsx("p",{style:{fontSize:"11px",color:"#3d4a5c",margin:"0 0 16px 0",lineHeight:1.5},children:"Import video and audio to start editing"}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(l,{i:"keyboard",s:12,c:"#2d3748"}),e.jsx("span",{style:{fontSize:"9px",color:"#334155"},children:"Ctrl+I"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(l,{i:"mouse",s:12,c:"#2d3748"}),e.jsx("span",{style:{fontSize:"9px",color:"#334155"},children:"Drag & Drop"})]})]})]}));$.displayName="EmptyState";const F=i.memo(({x:a,y:u,item:s,onClose:o,onAddToTimeline:f,onRemove:k})=>{const m=i.useRef(null);i.useEffect(()=>{const n=h=>{m.current&&!m.current.contains(h.target)&&o()},g=h=>{h.key==="Escape"&&o()};return document.addEventListener("mousedown",n),document.addEventListener("keydown",g),()=>{document.removeEventListener("mousedown",n),document.removeEventListener("keydown",g)}},[o]);const y=[{label:"Add to timeline",icon:"add",action:()=>{f(s),o()}},{label:"Delete from project",icon:"delete",action:()=>{k(s.id),o()},color:"#ef4444"}];return e.jsx("div",{ref:m,style:{position:"fixed",left:a,top:u,zIndex:9999,background:"#1a2332",border:"1px solid rgba(117,170,219,0.15)",borderRadius:"8px",padding:"4px 0",minWidth:"160px",boxShadow:"0 8px 24px rgba(0,0,0,0.5)"},children:y.map(n=>e.jsxs("button",{onClick:n.action,style:{...j.ghost,width:"100%",display:"flex",alignItems:"center",gap:"8px",padding:"6px 12px",fontSize:"11px",fontWeight:500,color:n.color||"#cbd5e1",textAlign:"left"},onMouseEnter:g=>g.currentTarget.style.background="rgba(117,170,219,0.1)",onMouseLeave:g=>g.currentTarget.style.background="transparent",children:[e.jsx(l,{i:n.icon,s:14,c:n.color||"#64748b"}),n.label]},n.label))})});F.displayName="ContextMenu";const G=({mediaTab:a,onMediaTabChange:u,mediaItems:s=[],onImportMedia:o,onRemoveMedia:f,onAddToTimeline:k,selectedMediaId:m,onSelectMedia:y,isImporting:n=!1,style:g})=>{const h=i.useRef(null),[c,w]=i.useState(!1),[x,D]=i.useState("grid"),[r,b]=i.useState(""),[d,z]=i.useState("all"),[I,E]=i.useState(null),L=i.useMemo(()=>{let t=s;if(d!=="all"&&(t=t.filter(p=>p.type===d)),r.trim()){const p=r.toLowerCase();t=t.filter(v=>v.name?.toLowerCase().includes(p))}return t},[s,d,r]),A=i.useMemo(()=>({all:s.length,video:s.filter(t=>t.type==="video").length,audio:s.filter(t=>t.type==="audio").length}),[s]),R=i.useCallback(()=>{h.current?.click()},[]),_=i.useCallback(t=>{const p=Array.from(t.target.files||[]);if(p.length>0&&o){const{validFiles:v,errors:C}=W(p,{allowedCategories:["video","audio"]});C.length>0&&M.error(`Some files were rejected:
${C.map(S=>`${S.file}: ${S.error}`).join(`
`)}`),v.length>0&&o(v)}t.target.value=""},[o]),P=i.useCallback(t=>{t.preventDefault(),t.stopPropagation(),w(!0)},[]),Y=i.useCallback(t=>{t.preventDefault(),t.stopPropagation(),t.currentTarget.contains(t.relatedTarget)||w(!1)},[]),B=i.useCallback(t=>{t.preventDefault(),t.stopPropagation(),w(!1);const p=Array.from(t.dataTransfer.files),{validFiles:v,errors:C}=W(p,{allowedCategories:["video","audio"]});C.length>0&&M.error(`Some files were rejected:
${C.map(S=>`${S.file}: ${S.error}`).join(`
`)}`),v.length>0&&o&&o(v)},[o]),O=i.useCallback(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),R())},[R]),H=i.useCallback((t,p)=>{E({x:t.clientX,y:t.clientY,item:p})},[]),K=i.useCallback(()=>E(null),[]);return e.jsxs("aside",{className:"editor-left-panel",style:{...j.leftPanel,...g},role:"complementary","aria-label":"Media panel",children:[e.jsx("style",{children:X}),e.jsxs("div",{style:{height:"32px",display:"flex",alignItems:"center",padding:"0 14px",borderBottom:"1px solid rgba(117,170,219,0.04)",background:"rgba(15,23,42,0.3)"},children:[e.jsx("span",{style:{fontSize:"10px",fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"1.5px"},children:"Media"}),s.length>0&&e.jsxs("span",{style:{marginLeft:"auto",fontSize:"9px",fontWeight:600,color:"#75aadb",background:"rgba(117,170,219,0.1)",padding:"2px 8px",borderRadius:"10px"},children:[s.length," ",s.length===1?"file":"files"]})]}),e.jsxs("div",{style:{padding:"10px 12px",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"0"},role:"tablist","aria-label":"Media sources",children:["Local","Library"].map(t=>e.jsx("button",{onClick:()=>u(t.toLowerCase()),role:"tab","aria-selected":a===t.toLowerCase(),"aria-controls":`${t.toLowerCase()}-panel`,className:`tab-btn ${a===t.toLowerCase()?"active":""}`,style:{...j.ghost,fontSize:"11px",fontWeight:600,padding:"4px 12px 6px",color:a===t.toLowerCase()?"#75aadb":"#4a5568"},children:t},t))}),a==="local"&&e.jsxs("div",{style:{display:"flex",gap:"2px"},role:"group","aria-label":"View mode",children:[e.jsx("button",{onClick:()=>D("list"),className:"view-toggle-btn",style:{...j.ghost,background:x==="list"?"rgba(117,170,219,0.12)":"transparent",borderRadius:"4px",padding:"4px"},"aria-label":"List view","aria-pressed":x==="list",title:"List view",children:e.jsx(l,{i:"list",s:16,c:x==="list"?"#75aadb":"#475569"})}),e.jsx("button",{onClick:()=>D("grid"),className:"view-toggle-btn",style:{...j.ghost,background:x==="grid"?"rgba(117,170,219,0.12)":"transparent",borderRadius:"4px",padding:"4px"},"aria-label":"Grid view","aria-pressed":x==="grid",title:"Grid view",children:e.jsx(l,{i:"grid_view",s:16,c:x==="grid"?"#75aadb":"#475569"})})]})]}),a==="local"&&s.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx(l,{i:"search",s:14,c:"#4a5568",style:{position:"absolute",left:"8px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}),e.jsx("input",{type:"text",placeholder:"Search media...",value:r,onChange:t=>b(t.target.value),style:{width:"100%",background:"rgba(26,35,50,0.4)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"6px",padding:"5px 8px 5px 28px",color:"white",fontSize:"11px",outline:"none",fontFamily:"inherit",boxSizing:"border-box"},"aria-label":"Search imported media"})]}),e.jsx("div",{style:{display:"flex",gap:"4px",flexWrap:"wrap"},children:[{key:"all",label:"All"},{key:"video",label:"Video"},{key:"audio",label:"Audio"}].map(t=>e.jsxs("button",{onClick:()=>z(t.key),style:{...j.ghost,fontSize:"9px",fontWeight:600,padding:"2px 8px",borderRadius:"10px",color:d===t.key?"#e2e8f0":"#4a5568",background:d===t.key?"rgba(117,170,219,0.15)":"rgba(255,255,255,0.03)",border:d===t.key?"1px solid rgba(117,170,219,0.25)":"1px solid transparent"},"aria-pressed":d===t.key,children:[t.label," (",A[t.key],")"]},t.key))})]}),a==="local"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{ref:h,type:"file",accept:V(["video","audio"]),multiple:!0,onChange:_,style:{display:"none"},"aria-hidden":"true"}),e.jsx("button",{onClick:R,onKeyDown:O,onDragOver:P,onDragLeave:Y,onDrop:B,disabled:n,className:`import-btn ${c?"import-btn-dragover":""}`,style:{...j.importBtn,padding:"12px",borderColor:c?"#75aadb":"rgba(117,170,219,0.12)",background:c?"rgba(117,170,219,0.08)":"rgba(117,170,219,0.02)",opacity:n?.6:1,cursor:n?"wait":"pointer",flexDirection:"row",gap:"10px",justifyContent:"center"},"aria-label":n?"Importing media...":"Import media files",title:"Click to browse or drag & drop files",children:n?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsx("span",{style:{fontSize:"11px",color:"#75aadb",fontWeight:600},children:"Importing..."})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:c?"rgba(117,170,219,0.2)":"rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(117,170,219,0.12)",transition:"all 0.2s ease"},children:e.jsx(l,{i:c?"file_download":"add",s:16,c:c?"#75aadb":"#64748b"})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"1px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:600,color:c?"#75aadb":"#94a3b8",transition:"all 0.2s ease"},children:c?"Release to import":"Import Media"}),e.jsx("span",{style:{fontSize:"9px",color:"#3d4a5c"},children:"Video, audio — drag & drop or click"})]})]})})]})]}),a==="local"?e.jsx("div",{style:{flex:1,overflowY:"auto",overflowX:"hidden",minWidth:0,padding:"0 16px 16px"},className:"cs",role:"tabpanel",id:"local-panel","aria-label":"Local media",children:s.length===0?e.jsx($,{}):L.length===0?e.jsxs("div",{style:{padding:"24px 16px",textAlign:"center"},children:[e.jsx(l,{i:"search_off",s:28,c:"#3d4a5c"}),e.jsx("p",{style:{fontSize:"11px",color:"#4a5568",margin:"8px 0 0"},children:"No matching media"})]}):e.jsx("div",{style:{display:x==="grid"?"grid":"flex",gridTemplateColumns:x==="grid"?"1fr 1fr":void 0,flexDirection:x==="list"?"column":void 0,gap:"10px",minWidth:0,width:"100%"},role:"list","aria-label":"Imported media items",children:L.map((t,p)=>e.jsx(N,{item:t,isSelected:m===t.id,onSelect:y,onAddToTimeline:k,onRemove:f,onContextMenu:H,index:p},t.id))})}):e.jsxs("div",{role:"tabpanel",id:"library-panel","aria-label":"Community library",style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",textAlign:"center"},children:[e.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"},children:e.jsx(l,{i:"public",s:32,c:"#475569"})}),e.jsx("p",{style:{fontSize:"14px",fontWeight:600,color:"#cbd5e1",margin:"0 0 6px"},children:"Community Templates"}),e.jsxs("p",{style:{fontSize:"12px",color:"#64748b",margin:"0 0 16px",lineHeight:1.5},children:["Browse and use templates shared by",e.jsx("br",{}),"other ClipCut creators"]}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",background:"rgba(117, 170, 219, 0.08)",border:"1px solid rgba(117, 170, 219, 0.15)",fontSize:"11px",fontWeight:600,color:"#75aadb"},children:[e.jsx(l,{i:"schedule",s:14,c:"#75aadb"}),"Coming Soon"]})]}),I&&e.jsx(F,{x:I.x,y:I.y,item:I.item,onClose:K,onAddToTimeline:k,onRemove:f})]})},oe=i.memo(G);export{oe as default};
