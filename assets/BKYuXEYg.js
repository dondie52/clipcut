import{r as s,j as e}from"./-P2Ya96f.js";import{s as S,S as T,I as g}from"./Zc16mmJ8.js";import"./Bqm5obMm.js";import"./DZxFKcQQ.js";import"./DuArS60f.js";import"./3ad05ixW.js";import"./BWv2yUxG.js";import"./B9CjrYEi.js";const y={video:{mimeTypes:["video/mp4","video/webm","video/quicktime","video/x-msvideo","video/x-matroska"],extensions:[".mp4",".webm",".mov",".avi",".mkv"],label:"Video"},audio:{mimeTypes:["audio/mpeg","audio/wav","audio/ogg","audio/mp4","audio/webm","audio/aac","audio/flac"],extensions:[".mp3",".wav",".ogg",".m4a",".webm",".aac",".flac"],label:"Audio"},image:{mimeTypes:["image/jpeg","image/png","image/webp","image/gif"],extensions:[".jpg",".jpeg",".png",".webp",".gif"],label:"Image"}},z={video:500*1024*1024,audio:100*1024*1024,image:25*1024*1024,avatar:5*1024*1024,thumbnail:5*1024*1024,default:500*1024*1024};function A(a){if(!a||typeof a!="string")return"";const o=a.lastIndexOf(".");return o===-1?"":a.slice(o).toLowerCase()}function $(a){if(!a)return null;for(const[o,i]of Object.entries(y))if(i.mimeTypes.includes(a))return o;return null}function R(a){if(a===0)return"0 B";const o=["B","KB","MB","GB"],i=1024,r=Math.floor(Math.log(a)/Math.log(i));return`${parseFloat((a/Math.pow(i,r)).toFixed(1))} ${o[r]}`}function B(a,o){if(!a||!a.name)return{valid:!1,error:"No file provided"};const i=o||Object.keys(y),r=i.flatMap(b=>y[b]?.mimeTypes||[]),p=i.flatMap(b=>y[b]?.extensions||[]),l=r.includes(a.type),c=A(a.name),x=p.includes(c);return!l&&!x?{valid:!1,error:`Unsupported file format. Allowed types: ${i.map(d=>y[d]?.label).filter(Boolean).join(", ")} (${p.join(", ")})`}:l&&!x?{valid:!0,category:$(a.type)}:!l&&x?{valid:!0,category:null}:{valid:!0,category:$(a.type)}}function P(a,o,i){if(!a)return{valid:!1,error:"No file provided"};const r=i||z[o]||z.default;return a.size>r?{valid:!1,error:`File is too large (${R(a.size)}). Maximum size: ${R(r)}`}:a.size===0?{valid:!1,error:"File is empty"}:{valid:!0}}function W(a,o={}){const{allowedCategories:i,category:r,maxSize:p}=o,l=B(a,i);if(!l.valid)return l;const c=r||l.category||"default",x=P(a,c,p);return x.valid?{valid:!0,category:l.category}:x}function F(a,o={}){const i=[],r=[],p=Array.from(a);for(const l of p){const c=W(l,o);c.valid?r.push(l):i.push({file:l.name,error:c.error})}return{valid:i.length===0,errors:i,validFiles:r}}function O(a){return(a||Object.keys(y)).flatMap(i=>y[i]?.mimeTypes||[]).join(",")}const _=`
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
`,L=s.memo(({item:a,isSelected:o,onSelect:i,onAddToTimeline:r,onRemove:p,index:l})=>{const[c,x]=s.useState(!1),[m,b]=s.useState(!1),d=s.useCallback(n=>{if(!n||!isFinite(n))return"0:00";const f=Math.floor(n/60),h=Math.floor(n%60);return`${f}:${h.toString().padStart(2,"0")}`},[]),j=s.useCallback(n=>{b(!0),n.dataTransfer.setData("mediaItemId",a.id),n.dataTransfer.setData("mediaType",a.type||"video"),n.dataTransfer.effectAllowed="copy";const f=document.createElement("div");f.style.cssText=`
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
    `;const h=document.createElement("span");h.style.color="#75aadb",h.textContent="▶";const I=document.createElement("span");I.textContent=a.name,f.appendChild(h),f.appendChild(I),document.body.appendChild(f),n.dataTransfer.setDragImage(f,20,20),setTimeout(()=>{document.body.removeChild(f)},0)},[a.id,a.type,a.name]),u=s.useCallback(()=>{b(!1)},[]),D=s.useCallback(n=>{n.key==="Enter"?(n.preventDefault(),r(a)):(n.key==="Delete"||n.key==="Backspace")&&(n.preventDefault(),p(a.id))},[a,r,p]);return e.jsxs("div",{onClick:()=>i(a.id),onDoubleClick:()=>r(a),onMouseEnter:()=>x(!0),onMouseLeave:()=>x(!1),onKeyDown:D,draggable:!0,onDragStart:j,onDragEnd:u,className:"media-item",role:"button",tabIndex:0,"aria-label":`${a.name}, ${d(a.duration)}, ${a.width}x${a.height}. Double-click or press Enter to add to timeline.`,"aria-selected":o,style:{display:"flex",flexDirection:"column",gap:"4px",cursor:"pointer",position:"relative",animationDelay:`${l*50}ms`,opacity:m?.5:1},children:[e.jsxs("div",{className:"media-item-thumbnail",style:{aspectRatio:"16/9",borderRadius:"6px",overflow:"hidden",border:o?"2px solid #75aadb":c?"1px solid rgba(117, 170, 219, 0.5)":"1px solid rgba(255,255,255,0.06)",position:"relative",background:"#0a0a0a"},children:[a.thumbnail?e.jsx("img",{src:a.thumbnail,alt:a.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}}):a.isProcessing?e.jsx("div",{className:"thumbnail-loading",style:{width:"100%",height:"100%"}}):e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #1a2332 0%, #0a0a0a 100%)"},children:e.jsx(g,{i:a.type==="audio"?"music_note":"movie",s:24,c:"#475569"})}),e.jsx("span",{style:{position:"absolute",top:"4px",right:"4px",background:"rgba(0,0,0,0.8)",fontSize:"9px",padding:"2px 6px",borderRadius:"3px",color:"white",fontWeight:500,letterSpacing:"0.5px",backdropFilter:"blur(4px)"},children:d(a.duration)}),e.jsx("div",{className:"media-item-overlay",style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"8px"},children:e.jsxs("button",{onClick:n=>{n.stopPropagation(),r(a)},className:"add-to-timeline-btn",style:{background:"#75aadb",border:"none",borderRadius:"4px",padding:"4px 10px",fontSize:"10px",fontWeight:600,color:"#0a0a0a",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Add ${a.name} to timeline`,children:[e.jsx(g,{i:"add",s:12,c:"#0a0a0a"}),"Add to Timeline"]})}),a.isProcessing&&e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)"},children:e.jsx("div",{style:{width:"24px",height:"24px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),(o||c)&&!a.isProcessing&&e.jsx("button",{onClick:n=>{n.stopPropagation(),p(a.id)},className:"remove-btn",style:{position:"absolute",top:"4px",left:"4px",width:"22px",height:"22px",borderRadius:"50%",background:"rgba(239,68,68,0.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,boxShadow:"0 2px 8px rgba(0, 0, 0, 0.3)"},"aria-label":`Remove ${a.name}`,title:"Remove from media library",children:e.jsx(g,{i:"close",s:12,c:"white"})}),a.type==="audio"&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",background:"rgba(117, 170, 219, 0.9)",borderRadius:"4px",padding:"2px 6px",display:"flex",alignItems:"center",gap:"3px"},children:[e.jsx(g,{i:"music_note",s:10,c:"white"}),e.jsx("span",{style:{fontSize:"8px",fontWeight:600,color:"white"},children:"AUDIO"})]})]}),e.jsx("p",{style:{fontSize:"10px",color:o?"#75aadb":c?"#cbd5e1":"#94a3b8",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:o?500:400,transition:"color 0.15s ease"},children:a.name}),a.width&&a.height&&e.jsxs("p",{style:{fontSize:"9px",color:"#475569",margin:0},children:[a.width,"x",a.height]})]})});L.displayName="MediaItem";const M=s.memo(()=>e.jsxs("div",{className:"empty-state-icon",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"220px",color:"#475569",textAlign:"center",padding:"24px"},role:"status","aria-label":"No media imported",children:[e.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"18px",background:"linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.02) 100%)",border:"1px solid rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"},children:e.jsx(g,{i:"video_library",s:32,c:"#3d4a5c"})}),e.jsx("p",{style:{fontSize:"13px",margin:"0 0 6px 0",fontWeight:600,color:"#64748b"},children:"No media yet"}),e.jsx("p",{style:{fontSize:"11px",color:"#3d4a5c",margin:"0 0 16px 0",lineHeight:1.5},children:"Import video and audio to start editing"}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(g,{i:"keyboard",s:12,c:"#2d3748"}),e.jsx("span",{style:{fontSize:"9px",color:"#334155"},children:"Ctrl+I"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(g,{i:"mouse",s:12,c:"#2d3748"}),e.jsx("span",{style:{fontSize:"9px",color:"#334155"},children:"Drag & Drop"})]})]})]}));M.displayName="EmptyState";const Y=({mediaTab:a,onMediaTabChange:o,mediaItems:i=[],onImportMedia:r,onRemoveMedia:p,onAddToTimeline:l,selectedMediaId:c,onSelectMedia:x,isImporting:m=!1})=>{const b=s.useRef(null),[d,j]=s.useState(!1),[u,D]=s.useState("grid"),n=s.useCallback(()=>{b.current?.click()},[]),f=s.useCallback(t=>{const v=Array.from(t.target.files||[]);if(v.length>0&&r){const{validFiles:w,errors:k}=F(v,{allowedCategories:["video","audio"]});k.length>0&&alert(`Some files were rejected:
${k.map(C=>`${C.file}: ${C.error}`).join(`
`)}`),w.length>0&&r(w)}t.target.value=""},[r]),h=s.useCallback(t=>{t.preventDefault(),t.stopPropagation(),j(!0)},[]),I=s.useCallback(t=>{t.preventDefault(),t.stopPropagation(),t.currentTarget.contains(t.relatedTarget)||j(!1)},[]),E=s.useCallback(t=>{t.preventDefault(),t.stopPropagation(),j(!1);const v=Array.from(t.dataTransfer.files),{validFiles:w,errors:k}=F(v,{allowedCategories:["video","audio"]});k.length>0&&alert(`Some files were rejected:
${k.map(C=>`${C.file}: ${C.error}`).join(`
`)}`),w.length>0&&r&&r(w)},[r]),N=s.useCallback(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n())},[n]);return e.jsxs("aside",{style:S.leftPanel,role:"complementary","aria-label":"Media panel",children:[e.jsx("style",{children:_}),e.jsxs("div",{style:{height:"32px",display:"flex",alignItems:"center",padding:"0 14px",borderBottom:"1px solid rgba(117,170,219,0.04)",background:"rgba(15,23,42,0.3)"},children:[e.jsx("span",{style:{fontSize:"10px",fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"1.5px"},children:"Media"}),i.length>0&&e.jsxs("span",{style:{marginLeft:"auto",fontSize:"9px",fontWeight:600,color:"#75aadb",background:"rgba(117,170,219,0.1)",padding:"2px 8px",borderRadius:"10px"},children:[i.length," ",i.length===1?"file":"files"]})]}),e.jsxs("div",{style:{padding:"10px 12px",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"0"},role:"tablist","aria-label":"Media sources",children:["Local","Library"].map(t=>e.jsx("button",{onClick:()=>o(t.toLowerCase()),role:"tab","aria-selected":a===t.toLowerCase(),"aria-controls":`${t.toLowerCase()}-panel`,className:`tab-btn ${a===t.toLowerCase()?"active":""}`,style:{...S.ghost,fontSize:"11px",fontWeight:600,padding:"4px 12px 6px",color:a===t.toLowerCase()?"#75aadb":"#4a5568"},children:t},t))}),a==="local"&&e.jsxs("div",{style:{display:"flex",gap:"2px"},role:"group","aria-label":"View mode",children:[e.jsx("button",{onClick:()=>D("list"),className:"view-toggle-btn",style:{...S.ghost,background:u==="list"?"rgba(117,170,219,0.12)":"transparent",borderRadius:"4px",padding:"4px"},"aria-label":"List view","aria-pressed":u==="list",title:"List view",children:e.jsx(g,{i:"list",s:16,c:u==="list"?"#75aadb":"#475569"})}),e.jsx("button",{onClick:()=>D("grid"),className:"view-toggle-btn",style:{...S.ghost,background:u==="grid"?"rgba(117,170,219,0.12)":"transparent",borderRadius:"4px",padding:"4px"},"aria-label":"Grid view","aria-pressed":u==="grid",title:"Grid view",children:e.jsx(g,{i:"grid_view",s:16,c:u==="grid"?"#75aadb":"#475569"})})]})]}),a==="local"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{ref:b,type:"file",accept:O(["video","audio"]),multiple:!0,onChange:f,style:{display:"none"},"aria-hidden":"true"}),e.jsx("button",{onClick:n,onKeyDown:N,onDragOver:h,onDragLeave:I,onDrop:E,disabled:m,className:`import-btn ${d?"import-btn-dragover":""}`,style:{...S.importBtn,padding:"12px",borderColor:d?"#75aadb":"rgba(117,170,219,0.12)",background:d?"rgba(117,170,219,0.08)":"rgba(117,170,219,0.02)",opacity:m?.6:1,cursor:m?"wait":"pointer",flexDirection:"row",gap:"10px",justifyContent:"center"},"aria-label":m?"Importing media...":"Import media files",title:"Click to browse or drag & drop files",children:m?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsx("span",{style:{fontSize:"11px",color:"#75aadb",fontWeight:600},children:"Importing..."})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:d?"rgba(117,170,219,0.2)":"rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(117,170,219,0.12)",transition:"all 0.2s ease"},children:e.jsx(g,{i:d?"file_download":"add",s:16,c:d?"#75aadb":"#64748b"})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"1px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:600,color:d?"#75aadb":"#94a3b8",transition:"all 0.2s ease"},children:d?"Release to import":"Import Media"}),e.jsx("span",{style:{fontSize:"9px",color:"#3d4a5c"},children:"Video, audio — drag & drop or click"})]})]})})]})]}),a==="local"?e.jsx("div",{style:{flex:1,overflowY:"auto",padding:"0 16px 16px"},className:"cs",role:"tabpanel",id:"local-panel","aria-label":"Local media",children:i.length===0?e.jsx(M,{}):e.jsx("div",{style:{display:u==="grid"?"grid":"flex",gridTemplateColumns:u==="grid"?"1fr 1fr":void 0,flexDirection:u==="list"?"column":void 0,gap:"10px"},role:"list","aria-label":"Imported media items",children:i.map((t,v)=>e.jsx(L,{item:t,isSelected:c===t.id,onSelect:x,onAddToTimeline:l,onRemove:p,index:v},t.id))})}):e.jsxs("div",{role:"tabpanel",id:"library-panel","aria-label":"Community library",style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",textAlign:"center"},children:[e.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"},children:e.jsx(g,{i:"public",s:32,c:"#475569"})}),e.jsx("p",{style:{fontSize:"14px",fontWeight:600,color:"#cbd5e1",margin:"0 0 6px"},children:"Community Templates"}),e.jsxs("p",{style:{fontSize:"12px",color:"#64748b",margin:"0 0 16px",lineHeight:1.5},children:["Browse and use templates shared by",e.jsx("br",{}),"other ClipCut creators"]}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",background:"rgba(117, 170, 219, 0.08)",border:"1px solid rgba(117, 170, 219, 0.15)",fontSize:"11px",fontWeight:600,color:"#75aadb"},children:[e.jsx(g,{i:"schedule",s:14,c:"#75aadb"}),"Coming Soon"]})]})]})},J=s.memo(Y);export{J as default};
