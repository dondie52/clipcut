import{r as s,j as a}from"./DwQPoapS.js";import{s as S,S as A,I as m}from"./BEU0hBGZ.js";import"./N_1C3EEk.js";import"./DZxFKcQQ.js";import"./DuArS60f.js";import"./DWGeIRwN.js";import"./CnUvhfVk.js";import"./B9CjrYEi.js";const y={video:{mimeTypes:["video/mp4","video/webm","video/quicktime","video/x-msvideo","video/x-matroska"],extensions:[".mp4",".webm",".mov",".avi",".mkv"],label:"Video"},audio:{mimeTypes:["audio/mpeg","audio/wav","audio/ogg","audio/mp4","audio/webm","audio/aac","audio/flac"],extensions:[".mp3",".wav",".ogg",".m4a",".webm",".aac",".flac"],label:"Audio"},image:{mimeTypes:["image/jpeg","image/png","image/webp","image/gif"],extensions:[".jpg",".jpeg",".png",".webp",".gif"],label:"Image"}},z={video:500*1024*1024,audio:100*1024*1024,image:25*1024*1024,avatar:5*1024*1024,thumbnail:5*1024*1024,default:500*1024*1024};function B(e){if(!e||typeof e!="string")return"";const o=e.lastIndexOf(".");return o===-1?"":e.slice(o).toLowerCase()}function $(e){if(!e)return null;for(const[o,i]of Object.entries(y))if(i.mimeTypes.includes(e))return o;return null}function F(e){if(e===0)return"0 B";const o=["B","KB","MB","GB"],i=1024,r=Math.floor(Math.log(e)/Math.log(i));return`${parseFloat((e/Math.pow(i,r)).toFixed(1))} ${o[r]}`}function P(e,o){if(!e||!e.name)return{valid:!1,error:"No file provided"};const i=o||Object.keys(y),r=i.flatMap(x=>y[x]?.mimeTypes||[]),p=i.flatMap(x=>y[x]?.extensions||[]),l=r.includes(e.type),c=B(e.name),g=p.includes(c);return!l&&!g?{valid:!1,error:`Unsupported file format. Allowed types: ${i.map(d=>y[d]?.label).filter(Boolean).join(", ")} (${p.join(", ")})`}:l&&!g?{valid:!0,category:$(e.type)}:!l&&g?{valid:!0,category:null}:{valid:!0,category:$(e.type)}}function T(e,o,i){if(!e)return{valid:!1,error:"No file provided"};const r=i||z[o]||z.default;return e.size>r?{valid:!1,error:`File is too large (${F(e.size)}). Maximum size: ${F(r)}`}:e.size===0?{valid:!1,error:"File is empty"}:{valid:!0}}function W(e,o={}){const{allowedCategories:i,category:r,maxSize:p}=o,l=P(e,i);if(!l.valid)return l;const c=r||l.category||"default",g=T(e,c,p);return g.valid?{valid:!0,category:l.category}:g}function R(e,o={}){const i=[],r=[],p=Array.from(e);for(const l of p){const c=W(l,o);c.valid?r.push(l):i.push({file:l.name,error:c.error})}return{valid:i.length===0,errors:i,validFiles:r}}function _(e){return(e||Object.keys(y)).flatMap(i=>y[i]?.mimeTypes||[]).join(",")}const O=`
  ${A}
  
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
`,L=s.memo(({item:e,isSelected:o,onSelect:i,onAddToTimeline:r,onRemove:p,index:l})=>{const[c,g]=s.useState(!1),[f,x]=s.useState(!1),d=s.useCallback(n=>{if(!n||!isFinite(n))return"0:00";const u=Math.floor(n/60),h=Math.floor(n%60);return`${u}:${h.toString().padStart(2,"0")}`},[]),j=s.useCallback(n=>{x(!0),n.dataTransfer.setData("mediaItemId",e.id),n.dataTransfer.setData("mediaType",e.type||"video"),n.dataTransfer.effectAllowed="copy";const u=document.createElement("div");u.style.cssText=`
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
    `;const h=document.createElement("span");h.style.color="#75aadb",h.textContent="▶";const I=document.createElement("span");I.textContent=e.name,u.appendChild(h),u.appendChild(I),document.body.appendChild(u),n.dataTransfer.setDragImage(u,20,20),setTimeout(()=>{document.body.removeChild(u)},0)},[e.id,e.type,e.name]),b=s.useCallback(()=>{x(!1)},[]),D=s.useCallback(n=>{n.key==="Enter"?(n.preventDefault(),r(e)):(n.key==="Delete"||n.key==="Backspace")&&(n.preventDefault(),p(e.id))},[e,r,p]);return a.jsxs("div",{onClick:()=>i(e.id),onDoubleClick:()=>r(e),onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),onKeyDown:D,draggable:!0,onDragStart:j,onDragEnd:b,className:"media-item",role:"button",tabIndex:0,"aria-label":`${e.name}, ${d(e.duration)}, ${e.width}x${e.height}. Double-click or press Enter to add to timeline.`,"aria-selected":o,style:{display:"flex",flexDirection:"column",gap:"4px",cursor:"pointer",position:"relative",animationDelay:`${l*50}ms`,opacity:f?.5:1},children:[a.jsxs("div",{className:"media-item-thumbnail",style:{aspectRatio:"16/9",borderRadius:"6px",overflow:"hidden",border:o?"2px solid #75aadb":c?"1px solid rgba(117, 170, 219, 0.5)":"1px solid rgba(255,255,255,0.06)",position:"relative",background:"#0a0a0a"},children:[e.thumbnail?a.jsx("img",{src:e.thumbnail,alt:e.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}}):e.isProcessing?a.jsx("div",{className:"thumbnail-loading",style:{width:"100%",height:"100%"}}):a.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #1a2332 0%, #0a0a0a 100%)"},children:a.jsx(m,{i:e.type==="audio"?"music_note":"movie",s:24,c:"#475569"})}),a.jsx("span",{style:{position:"absolute",top:"4px",right:"4px",background:"rgba(0,0,0,0.8)",fontSize:"9px",padding:"2px 6px",borderRadius:"3px",color:"white",fontWeight:500,letterSpacing:"0.5px",backdropFilter:"blur(4px)"},children:d(e.duration)}),a.jsx("div",{className:"media-item-overlay",style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"8px"},children:a.jsxs("button",{onClick:n=>{n.stopPropagation(),r(e)},className:"add-to-timeline-btn",style:{background:"#75aadb",border:"none",borderRadius:"4px",padding:"4px 10px",fontSize:"10px",fontWeight:600,color:"#0a0a0a",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Add ${e.name} to timeline`,children:[a.jsx(m,{i:"add",s:12,c:"#0a0a0a"}),"Add to Timeline"]})}),e.isProcessing&&a.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)"},children:a.jsx("div",{style:{width:"24px",height:"24px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),(o||c)&&!e.isProcessing&&a.jsx("button",{onClick:n=>{n.stopPropagation(),p(e.id)},className:"remove-btn",style:{position:"absolute",top:"4px",left:"4px",width:"22px",height:"22px",borderRadius:"50%",background:"rgba(239,68,68,0.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,boxShadow:"0 2px 8px rgba(0, 0, 0, 0.3)"},"aria-label":`Remove ${e.name}`,title:"Remove from media library",children:a.jsx(m,{i:"close",s:12,c:"white"})}),e.type==="audio"&&a.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",background:"rgba(117, 170, 219, 0.9)",borderRadius:"4px",padding:"2px 6px",display:"flex",alignItems:"center",gap:"3px"},children:[a.jsx(m,{i:"music_note",s:10,c:"white"}),a.jsx("span",{style:{fontSize:"8px",fontWeight:600,color:"white"},children:"AUDIO"})]})]}),a.jsx("p",{style:{fontSize:"10px",color:o?"#75aadb":c?"#cbd5e1":"#94a3b8",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:o?500:400,transition:"color 0.15s ease"},children:e.name}),e.width&&e.height&&a.jsxs("p",{style:{fontSize:"9px",color:"#475569",margin:0},children:[e.width,"x",e.height]})]})});L.displayName="MediaItem";const E=s.memo(()=>a.jsxs("div",{className:"empty-state-icon",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"200px",color:"#475569",textAlign:"center",padding:"20px"},role:"status","aria-label":"No media imported",children:[a.jsx("div",{style:{width:"80px",height:"80px",borderRadius:"50%",background:"rgba(117, 170, 219, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"},children:a.jsx(m,{i:"video_library",s:36,c:"#475569"})}),a.jsx("p",{style:{fontSize:"13px",margin:"0 0 6px 0",fontWeight:500,color:"#64748b"},children:"No media imported"}),a.jsxs("p",{style:{fontSize:"11px",color:"#475569",margin:0,lineHeight:1.5},children:["Click Import or drag & drop",a.jsx("br",{}),"video and audio files here"]})]}));E.displayName="EmptyState";const Y=({mediaTab:e,onMediaTabChange:o,mediaItems:i=[],onImportMedia:r,onRemoveMedia:p,onAddToTimeline:l,selectedMediaId:c,onSelectMedia:g,isImporting:f=!1})=>{const x=s.useRef(null),[d,j]=s.useState(!1),[b,D]=s.useState("grid"),n=s.useCallback(()=>{x.current?.click()},[]),u=s.useCallback(t=>{const v=Array.from(t.target.files||[]);if(v.length>0&&r){const{validFiles:w,errors:k}=R(v,{allowedCategories:["video","audio"]});k.length>0&&alert(`Some files were rejected:
${k.map(C=>`${C.file}: ${C.error}`).join(`
`)}`),w.length>0&&r(w)}t.target.value=""},[r]),h=s.useCallback(t=>{t.preventDefault(),t.stopPropagation(),j(!0)},[]),I=s.useCallback(t=>{t.preventDefault(),t.stopPropagation(),t.currentTarget.contains(t.relatedTarget)||j(!1)},[]),M=s.useCallback(t=>{t.preventDefault(),t.stopPropagation(),j(!1);const v=Array.from(t.dataTransfer.files),{validFiles:w,errors:k}=R(v,{allowedCategories:["video","audio"]});k.length>0&&alert(`Some files were rejected:
${k.map(C=>`${C.file}: ${C.error}`).join(`
`)}`),w.length>0&&r&&r(w)},[r]),N=s.useCallback(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n())},[n]);return a.jsxs("aside",{style:S.leftPanel,role:"complementary","aria-label":"Media panel",children:[a.jsx("style",{children:O}),a.jsxs("div",{style:{padding:"14px 16px",display:"flex",flexDirection:"column",gap:"14px"},children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx("div",{style:{display:"flex",gap:"16px"},role:"tablist","aria-label":"Media sources",children:["Local","Library"].map(t=>a.jsx("button",{onClick:()=>o(t.toLowerCase()),role:"tab","aria-selected":e===t.toLowerCase(),"aria-controls":`${t.toLowerCase()}-panel`,className:`tab-btn ${e===t.toLowerCase()?"active":""}`,style:{...S.ghost,fontSize:"12px",fontWeight:700,paddingBottom:"6px",color:e===t.toLowerCase()?"#75aadb":"#64748b"},children:t},t))}),e==="local"&&a.jsxs("div",{style:{display:"flex",gap:"4px"},role:"group","aria-label":"View mode",children:[a.jsx("button",{onClick:()=>D("list"),className:"view-toggle-btn",style:{...S.ghost,background:b==="list"?"rgba(117, 170, 219, 0.15)":"transparent"},"aria-label":"List view","aria-pressed":b==="list",title:"List view",children:a.jsx(m,{i:"list",s:18,c:b==="list"?"#75aadb":"#475569"})}),a.jsx("button",{onClick:()=>D("grid"),className:"view-toggle-btn",style:{...S.ghost,background:b==="grid"?"rgba(117, 170, 219, 0.15)":"transparent"},"aria-label":"Grid view","aria-pressed":b==="grid",title:"Grid view",children:a.jsx(m,{i:"grid_view",s:18,c:b==="grid"?"#75aadb":"#cbd5e1"})})]})]}),e==="local"&&a.jsxs(a.Fragment,{children:[a.jsx("input",{ref:x,type:"file",accept:_(["video","audio"]),multiple:!0,onChange:u,style:{display:"none"},"aria-hidden":"true"}),a.jsxs("button",{onClick:n,onKeyDown:N,onDragOver:h,onDragLeave:I,onDrop:M,disabled:f,className:`import-btn ${d?"import-btn-dragover":""}`,style:{...S.importBtn,borderColor:d?"#75aadb":"rgba(255,255,255,0.08)",background:d?"rgba(117,170,219,0.1)":"transparent",opacity:f?.6:1,cursor:f?"wait":"pointer"},"aria-label":f?"Importing media...":"Import media files",title:"Click to browse or drag & drop files",children:[f?a.jsxs(a.Fragment,{children:[a.jsx("div",{style:{width:"26px",height:"26px",border:"2px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),a.jsx("span",{style:{fontSize:"12px",color:"#75aadb",fontWeight:500},children:"Importing..."})]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:d?"rgba(117, 170, 219, 0.2)":"rgba(100, 116, 139, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease"},children:a.jsx(m,{i:d?"file_download":"add_circle",s:24,c:d?"#75aadb":"#64748b"})}),a.jsx("span",{style:{fontSize:"12px",color:d?"#75aadb":"#64748b",fontWeight:d?500:400,transition:"all 0.2s ease"},children:d?"Release to import":"Import"}),a.jsx("span",{style:{fontSize:"10px",color:"#475569"},children:"or drag & drop"})]}),i.length>0&&!f&&a.jsx("div",{style:{position:"absolute",top:"8px",right:"8px",minWidth:"20px",height:"20px",background:"#75aadb",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:700,color:"#0a0a0a",padding:"0 6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.3)"},children:i.length})]})]})]}),e==="local"?a.jsx("div",{style:{flex:1,overflowY:"auto",padding:"0 16px 16px"},className:"cs",role:"tabpanel",id:"local-panel","aria-label":"Local media",children:i.length===0?a.jsx(E,{}):a.jsx("div",{style:{display:b==="grid"?"grid":"flex",gridTemplateColumns:b==="grid"?"1fr 1fr":void 0,flexDirection:b==="list"?"column":void 0,gap:"10px"},role:"list","aria-label":"Imported media items",children:i.map((t,v)=>a.jsx(L,{item:t,isSelected:c===t.id,onSelect:g,onAddToTimeline:l,onRemove:p,index:v},t.id))})}):a.jsxs("div",{role:"tabpanel",id:"library-panel","aria-label":"Community library",style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",textAlign:"center"},children:[a.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"},children:a.jsx(m,{i:"public",s:32,c:"#475569"})}),a.jsx("p",{style:{fontSize:"14px",fontWeight:600,color:"#cbd5e1",margin:"0 0 6px"},children:"Community Templates"}),a.jsxs("p",{style:{fontSize:"12px",color:"#64748b",margin:"0 0 16px",lineHeight:1.5},children:["Browse and use templates shared by",a.jsx("br",{}),"other ClipCut creators"]}),a.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",background:"rgba(117, 170, 219, 0.08)",border:"1px solid rgba(117, 170, 219, 0.15)",fontSize:"11px",fontWeight:600,color:"#75aadb"},children:[a.jsx(m,{i:"schedule",s:14,c:"#75aadb"}),"Coming Soon"]})]})]})},J=s.memo(Y);export{J as default};
