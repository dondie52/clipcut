import{r as n,j as t}from"./DwQPoapS.js";import{s as Se,S as Ie,I as P}from"./BEU0hBGZ.js";import"./N_1C3EEk.js";import"./DZxFKcQQ.js";import"./DuArS60f.js";import"./DWGeIRwN.js";import"./CnUvhfVk.js";import"./B9CjrYEi.js";const _e=`
  ${Ie}
  
  @keyframes pulse-border {
    0%, 100% { border-color: rgba(117, 170, 219, 0.3); }
    50% { border-color: rgba(117, 170, 219, 0.8); }
  }
  
  @keyframes drop-zone-glow {
    0%, 100% { box-shadow: inset 0 0 20px rgba(117, 170, 219, 0.1); }
    50% { box-shadow: inset 0 0 30px rgba(117, 170, 219, 0.25); }
  }
  
  @keyframes snap-flash {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes playhead-pulse {
    0%, 100% { box-shadow: 0 0 8px rgba(117, 170, 219, 0.6); }
    50% { box-shadow: 0 0 16px rgba(117, 170, 219, 0.9), 0 0 4px rgba(117, 170, 219, 0.4); }
  }
  
  .timeline-track-empty {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .timeline-track-empty:hover {
    border-color: rgba(117, 170, 219, 0.4) !important;
    background: rgba(117, 170, 219, 0.05) !important;
  }
  
  .timeline-track-dragover {
    border-color: #75aadb !important;
    background: rgba(117, 170, 219, 0.15) !important;
    animation: drop-zone-glow 1.5s ease-in-out infinite;
  }
  
  .timeline-clip {
    transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.15s ease,
                border-color 0.12s ease,
                opacity 0.12s ease;
    cursor: grab;
    will-change: transform;
  }
  
  .timeline-clip:active { cursor: grabbing; }
  
  .timeline-clip:hover:not(.dragging) {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(117, 170, 219, 0.25);
    z-index: 10;
  }
  
  .timeline-clip.dragging {
    opacity: 0.75;
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0 8px 24px rgba(117, 170, 219, 0.35);
    z-index: 100;
  }
  
  .timeline-clip.selected {
    z-index: 5;
    box-shadow: 0 0 0 1px rgba(117, 170, 219, 0.6), 0 2px 12px rgba(117, 170, 219, 0.2);
  }
  
  .clip-resize-handle {
    opacity: 0;
    transition: opacity 0.15s ease, width 0.1s ease;
  }
  
  .timeline-clip:hover .clip-resize-handle,
  .timeline-clip.selected .clip-resize-handle {
    opacity: 1;
  }
  
  .clip-resize-handle:hover {
    width: 10px !important;
    background: rgba(117, 170, 219, 0.9) !important;
  }
  
  .clip-resize-handle:active {
    width: 12px !important;
    background: #75aadb !important;
  }
  
  .track-control-btn {
    transition: all 0.12s ease;
    border-radius: 3px;
  }
  
  .track-control-btn:hover {
    transform: scale(1.15);
    background: rgba(117, 170, 219, 0.1);
  }
  
  .playhead-line {
    transition: left 0.05s linear;
  }
  
  .playhead-line.scrubbing {
    transition: none;
  }
  
  .timeline-toolbar-btn {
    transition: all 0.12s ease;
    border-radius: 4px;
    padding: 5px;
  }
  
  .timeline-toolbar-btn:hover:not(:disabled) {
    background: rgba(117, 170, 219, 0.12);
    color: #75aadb;
  }
  
  .timeline-toolbar-btn:active:not(:disabled) {
    transform: scale(0.93);
  }
  
  .timeline-toolbar-btn:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
  
  .timeline-toolbar-btn.active-tool {
    background: rgba(117, 170, 219, 0.15);
  }
  
  .snap-line {
    animation: snap-flash 0.4s ease-out forwards;
  }
  
  .zoom-slider {
    -webkit-appearance: none;
    appearance: none;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    height: 3px;
    outline: none;
  }
  .zoom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #75aadb;
    border: 2px solid rgba(255,255,255,0.2);
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .zoom-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(117, 170, 219, 0.5);
  }
  
  .minimap { transition: opacity 0.2s ease; }
  .minimap:hover { opacity: 1 !important; }
`,$e=n.memo(({width:r,height:a,color:c="#75aadb",opacity:i=.4})=>{const l=n.useRef(null);return n.useEffect(()=>{const g=l.current;if(!g)return;const b=g.getContext("2d"),x=window.devicePixelRatio||1;g.width=r*x,g.height=a*x,b.scale(x,x),b.clearRect(0,0,r,a);const h=Math.floor(r/3),f=a/2;b.fillStyle=c,b.globalAlpha=i;for(let s=0;s<h;s++){const z=(Math.sin(s*.3)*.3+Math.sin(s*.7)*.25+Math.random()*.35)*f,D=Math.max(2,z);b.fillRect(s*3,f-D,2,D*2)}},[r,a,c,i]),t.jsx("canvas",{ref:l,style:{width:`${r}px`,height:`${a}px`,display:"block",borderRadius:"2px"}})});$e.displayName="WaveformCanvas";const Me=n.memo(({width:r,height:a,thumbnail:c,opacity:i=.2})=>{const l=Math.max(1,Math.floor(r/60));return t.jsx("div",{style:{position:"absolute",inset:0,display:"flex",opacity:i,pointerEvents:"none",borderRadius:"3px",overflow:"hidden"},children:Array.from({length:l}).map((g,b)=>t.jsx("div",{style:{flex:1,height:"100%",backgroundImage:c?`url(${c})`:"none",backgroundSize:"cover",backgroundPosition:`${b/l*100}% center`,borderRight:b<l-1?"1px solid rgba(0,0,0,0.4)":"none"}},b))})});Me.displayName="FilmstripThumbnails";const te=n.memo(({icon:r,lockIcon:a="lock",label:c,isMuted:i=!1,isLocked:l=!1,onToggleMute:g,onToggleLock:b,trackType:x="video",height:h=60})=>t.jsxs("div",{style:{height:`${h}px`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"6px",borderBottom:"1px solid rgba(255,255,255,0.04)",background:"linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.15) 100%)",position:"relative"},role:"group","aria-label":`${x} track controls`,children:[t.jsx("span",{style:{position:"absolute",top:"3px",left:"50%",transform:"translateX(-50%)",fontSize:"7px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",color:"rgba(117,170,219,0.4)"},children:c}),t.jsx("button",{onClick:g,className:"track-control-btn",style:{background:"none",border:"none",padding:"3px",cursor:"pointer",opacity:i?.5:1},"aria-label":i?`Show ${x}`:`Hide ${x}`,title:i?`Show ${x}`:`Hide ${x}`,children:t.jsx(P,{i:i?x==="video"?"visibility_off":"volume_off":r,s:13,c:i?"#ef4444":"#64748b"})}),t.jsx("button",{onClick:b,className:"track-control-btn",style:{background:"none",border:"none",padding:"3px",cursor:"pointer"},"aria-label":l?`Unlock ${x}`:`Lock ${x}`,title:l?`Unlock ${x}`:`Lock ${x}`,children:t.jsx(P,{i:l?"lock":a,s:13,c:l?"#f59e0b":"#64748b"})})]}));te.displayName="TrackLabel";const ae=n.memo(({clip:r,isSelected:a,onSelect:c,pixelsPerSecond:i,onDragStart:l,onDragEnd:g,isDragging:b=!1,onResizeStart:x})=>{const h=Math.max(r.duration*i,40),f=r.startTime*i,s=r.type==="audio",z=s?"rgba(52,211,153,":"rgba(117,170,219,",D=a?s?"#34d399":"#75aadb":`${z}0.35)`,Y=n.useCallback(p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),c(r.id))},[r.id,c]),V=p=>{if(p<60)return`${p.toFixed(1)}s`;const F=Math.floor(p/60),k=(p%60).toFixed(0);return`${F}:${k.padStart(2,"0")}`};return t.jsxs("div",{onClick:p=>{p.stopPropagation(),c(r.id)},onKeyDown:Y,draggable:!0,onDragStart:p=>l(p,r),onDragEnd:g,className:`timeline-clip ${b?"dragging":""} ${a?"selected":""}`,role:"button",tabIndex:0,"aria-label":`${r.name}, ${V(r.duration)}`,"aria-selected":a,style:{position:"absolute",left:`${f}px`,width:`${h}px`,height:s?"44px":"52px",top:"4px",background:a?`linear-gradient(135deg, ${z}0.35) 0%, ${z}0.2) 100%)`:`linear-gradient(135deg, ${z}0.12) 0%, ${z}0.06) 100%)`,borderRadius:"4px",border:a?`2px solid ${D}`:`1px solid ${D}`,overflow:"hidden",outline:"none"},children:[s?t.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 4px"},children:t.jsx($e,{width:Math.max(h-8,20),height:s?36:44,color:"#34d399",opacity:a?.5:.3})}):t.jsx(Me,{width:h,height:52,thumbnail:r.thumbnail,opacity:a?.35:.2}),t.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",borderRadius:"3px",background:a?`linear-gradient(180deg, ${z}0.1) 0%, ${z}0.25) 100%)`:"linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)"}}),t.jsxs("div",{style:{position:"relative",padding:"0 8px",display:"flex",alignItems:"center",gap:"6px",width:"100%",overflow:"hidden",pointerEvents:"none",zIndex:2,height:"100%"},children:[t.jsx("div",{style:{width:"18px",height:"18px",borderRadius:"3px",flexShrink:0,background:a?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(P,{i:s?"music_note":"movie",s:11,c:a?"white":"#cbd5e1"})}),t.jsx("span",{style:{fontSize:"10px",fontWeight:a?600:500,color:a?"white":"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textShadow:"0 1px 3px rgba(0,0,0,0.5)",letterSpacing:"0.01em"},children:r.name}),h>80&&t.jsx("span",{style:{fontSize:"8px",fontWeight:600,marginLeft:"auto",flexShrink:0,color:a?"rgba(255,255,255,0.8)":"#94a3b8",background:"rgba(0,0,0,0.25)",padding:"1px 4px",borderRadius:"2px",textShadow:"0 1px 2px rgba(0,0,0,0.4)"},children:V(r.duration)})]}),t.jsx("div",{className:"clip-resize-handle",style:{position:"absolute",left:0,top:0,bottom:0,width:"6px",cursor:"ew-resize",background:`linear-gradient(90deg, ${s?"rgba(52,211,153,0.7)":"rgba(117,170,219,0.7)"} 0%, transparent 100%)`,borderRadius:"4px 0 0 4px"},onMouseDown:p=>{p.stopPropagation(),p.preventDefault(),x?.(r.id,"left",p)}}),t.jsx("div",{className:"clip-resize-handle",style:{position:"absolute",right:0,top:0,bottom:0,width:"6px",cursor:"ew-resize",background:`linear-gradient(90deg, transparent 0%, ${s?"rgba(52,211,153,0.7)":"rgba(117,170,219,0.7)"} 100%)`,borderRadius:"0 4px 4px 0"},onMouseDown:p=>{p.stopPropagation(),p.preventDefault(),x?.(r.id,"right",p)}})]})});ae.displayName="TimelineClip";const oe=n.memo(({type:r,isDragOver:a})=>t.jsxs("div",{className:`timeline-track-empty ${a?"timeline-track-dragover":""}`,style:{position:"absolute",inset:"4px 16px 4px 4px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",color:a?"#75aadb":"#475569",fontSize:"12px",border:`1.5px dashed ${a?"#75aadb":"rgba(100,116,139,0.2)"}`,borderRadius:"6px",background:a?"linear-gradient(135deg, rgba(117,170,219,0.1) 0%, rgba(117,170,219,0.04) 100%)":"transparent",pointerEvents:"none"},role:"region","aria-label":`Empty ${r} track`,children:[t.jsx(P,{i:r==="video"?"movie":"music_note",s:18,c:a?"#75aadb":"#475569"}),t.jsx("span",{style:{fontWeight:500,fontSize:"11px",color:a?"#75aadb":"#64748b"},children:a?`Drop ${r} here`:`Drag ${r} clips here`})]}));oe.displayName="EmptyTrackPlaceholder";const ze=n.memo(({clips:r,totalDuration:a,viewportStart:c,viewportEnd:i,width:l=200})=>{const g=l/Math.max(a,1);return t.jsxs("div",{className:"minimap",style:{width:`${l}px`,height:"20px",background:"rgba(15,23,42,0.8)",borderRadius:"4px",border:"1px solid rgba(255,255,255,0.06)",position:"relative",overflow:"hidden",opacity:.7,flexShrink:0},children:[r.map(b=>t.jsx("div",{style:{position:"absolute",left:`${b.startTime*g}px`,width:`${Math.max(b.duration*g,2)}px`,height:"10px",background:b.type==="audio"?"rgba(52,211,153,0.4)":"rgba(117,170,219,0.4)",borderRadius:"2px",top:b.type==="audio"?"10px":"0"}},b.id)),t.jsx("div",{style:{position:"absolute",left:`${c*g}px`,width:`${Math.max((i-c)*g,10)}px`,height:"100%",border:"1px solid rgba(117,170,219,0.5)",borderRadius:"2px",background:"rgba(117,170,219,0.08)"}})]})});ze.displayName="Minimap";const M=n.memo(({icon:r,onClick:a,disabled:c,active:i,label:l,shortcut:g,color:b="#94a3b8"})=>t.jsx("button",{onClick:a,disabled:c,className:`timeline-toolbar-btn ${i?"active-tool":""}`,style:{background:"none",border:"none",cursor:c?"not-allowed":"pointer",fontFamily:"inherit",display:"flex"},"aria-label":l,title:`${l}${g?` (${g})`:""}`,children:t.jsx(P,{i:r,s:17,c:i?"#75aadb":c?"#334155":b})}));M.displayName="TlBtn";const We=({clips:r=[],selectedClipId:a,onSelectClip:c,onUpdateClip:i,onDeleteClip:l,onSplitClip:g,onTrimClip:b,currentTime:x=0,onSeek:h,totalDuration:f=30,isProcessing:s=!1,canUndo:z=!1,canRedo:D=!1,onUndo:Y,onRedo:V,mediaItems:p=[],onAddToTimeline:F})=>{const[k,O]=n.useState(50),[y,N]=n.useState(x),[_,re]=n.useState({video:!1,audio:!1}),[E,ne]=n.useState({video:!1,audio:!1}),[ie,Z]=n.useState(null),[se,q]=n.useState(null),[X,le]=n.useState(!1),[de,S]=n.useState(null),[ce,G]=n.useState("select"),[K,Te]=n.useState(!0),[pe,be]=n.useState(!1),[xe,J]=n.useState(!1),C=n.useRef(null),Q=n.useRef(!1),m=n.useMemo(()=>4+k/8,[k]),ue=n.useMemo(()=>Math.max(f*m+100,900),[f,m]);n.useEffect(()=>{X||N(x)},[x,X]);const ge=n.useMemo(()=>r.filter(e=>e.type!=="audio"),[r]),me=n.useMemo(()=>r.filter(e=>e.type==="audio"),[r]),[he,Ee]=n.useState({start:0,end:30});n.useEffect(()=>{const e=C.current;if(!e)return;const o=()=>{const d=e.scrollLeft/m,u=d+e.clientWidth/m;Ee({start:d,end:u})};return e.addEventListener("scroll",o),o(),()=>e.removeEventListener("scroll",o)},[m]);const Re=n.useMemo(()=>{const e=k>70?1:k>40?2:k>20?5:10,o=[];for(let d=0;d<=f;d+=e){const u=Math.floor(d/60),T=d%60;o.push({time:d,label:`${u.toString().padStart(2,"0")}:${T.toString().padStart(2,"0")}`,major:d%(e*2)===0||e<=2})}return o},[f,k]),Le=n.useCallback(e=>{if(!C.current)return;Q.current=!0,le(!0);const o=C.current.getBoundingClientRect(),d=e.clientX-o.left+C.current.scrollLeft,u=Math.max(0,Math.min(f,d/m));N(u),h?.(u);const T=W=>{if(!Q.current)return;const B=W.clientX-o.left+C.current.scrollLeft,w=Math.max(0,Math.min(f,B/m));N(w),h?.(w)},I=()=>{Q.current=!1,le(!1),window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",I)};window.addEventListener("mousemove",T),window.addEventListener("mouseup",I)},[m,f,h]),U=n.useCallback(()=>{if(!a||s)return;const e=r.find(d=>d.id===a);if(!e)return;const o=y-e.startTime;o>.1&&o<e.duration-.1&&g?.(a,o)},[a,s,r,y,g]);n.useEffect(()=>{const e=o=>{if(!(!C.current?.contains(document.activeElement)&&document.activeElement!==document.body))switch(o.key){case"Delete":case"Backspace":a&&!s&&(o.preventDefault(),l?.(a));break;case"s":case"S":a&&!s&&!o.ctrlKey&&!o.metaKey&&(o.preventDefault(),U());break;case"ArrowLeft":o.preventDefault();{const d=o.shiftKey?1:.1,u=Math.max(0,y-d);N(u),h?.(u)}break;case"ArrowRight":o.preventDefault();{const d=o.shiftKey?1:.1,u=Math.min(f,y+d);N(u),h?.(u)}break;case"Home":o.preventDefault(),N(0),h?.(0);break;case"End":o.preventDefault(),N(f),h?.(f);break;case"Escape":c?.(null);break;case"v":case"V":!o.ctrlKey&&!o.metaKey&&G("select");break;case"c":case"C":!o.ctrlKey&&!o.metaKey&&G("cut");break}};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[a,s,y,f,l,h,c,U]);const De=n.useCallback(()=>{a&&!s&&l?.(a)},[a,s,l]),fe=n.useCallback((e,o,d)=>{const u=r.find(v=>v.id===e);if(!u)return;const T=u.type==="audio"?"audio":"video";if(E[T])return;const I=d.clientX,W=u.startTime,B=u.duration,w=v=>{const H=(v.clientX-I)/m;if(o==="left"){const $=Math.max(0,W+H),R=$-W,L=B-R;L>.1&&i?.(e,{startTime:$,duration:L,trimStart:(u.trimStart||0)+R})}else{const $=Math.max(.1,B+H);i?.(e,{duration:$})}},j=()=>{window.removeEventListener("mousemove",w),window.removeEventListener("mouseup",j)};window.addEventListener("mousemove",w),window.addEventListener("mouseup",j)},[r,m,E,i]),ve=n.useCallback((e,o)=>{q(o.id),e.dataTransfer.setData("clipId",o.id),e.dataTransfer.effectAllowed="move"},[]),ye=n.useCallback(()=>{q(null),Z(null),S(null)},[]),we=n.useCallback((e,o)=>{e.preventDefault();const d=Array.from(e.dataTransfer.types||[]);e.dataTransfer.dropEffect=d.includes("mediaItemId")?"copy":"move",Z(o)},[]),ke=n.useCallback(e=>{e.currentTarget.contains(e.relatedTarget)||(Z(null),S(null))},[]),je=n.useCallback((e,o)=>{e.preventDefault(),Z(null),q(null),S(null);const d=e.dataTransfer.getData("mediaItemId");if(e.dataTransfer.getData("mediaType"),d&&F){const j=p.find(R=>R.id===d);if(!j)return;const v=j.type==="audio";if(o==="audio"&&!v||o==="video"&&v||E[o])return;const A=e.currentTarget.getBoundingClientRect(),H=e.clientX-A.left;let $=Math.max(0,H/m);if(K){const R=8/m;r.forEach(L=>{const ee=L.startTime+L.duration;Math.abs($-L.startTime)<R&&($=L.startTime,S(L.startTime)),Math.abs($-ee)<R&&($=ee,S(ee))}),Math.abs($-y)<R&&($=y,S(y))}F(j,$),setTimeout(()=>S(null),400);return}const u=e.dataTransfer.getData("clipId"),T=r.find(j=>j.id===u);if(!T||E[o])return;const I=T.type==="audio";if(o==="audio"&&!I||o==="video"&&I)return;const W=e.currentTarget.getBoundingClientRect(),B=e.clientX-W.left;let w=Math.max(0,B/m);if(K){const j=8/m;r.forEach(v=>{if(v.id===u)return;const A=v.startTime+v.duration;Math.abs(w-v.startTime)<j&&(w=v.startTime,S(v.startTime)),Math.abs(w-A)<j&&(w=A,S(A)),Math.abs(w+T.duration-v.startTime)<j&&(w=v.startTime-T.duration,S(v.startTime))}),Math.abs(w-y)<j&&(w=y,S(y))}i?.(u,{startTime:w}),setTimeout(()=>S(null),400)},[r,E,m,y,i,p,F,K]),Ne=a&&!s,Ce=a&&!s;return t.jsxs("footer",{style:Se.timeline,role:"region","aria-label":"Timeline editor",children:[t.jsx("style",{children:_e}),t.jsxs("div",{style:Se.tlToolbar,role:"toolbar","aria-label":"Timeline tools",children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",borderRight:"1px solid rgba(255,255,255,0.06)",paddingRight:"10px"},children:[t.jsx(M,{icon:"near_me",onClick:()=>G("select"),active:ce==="select",label:"Select",shortcut:"V"}),t.jsx(M,{icon:"undo",onClick:Y,disabled:!z,label:"Undo",shortcut:"Ctrl+Z"}),t.jsx(M,{icon:"redo",onClick:V,disabled:!D,label:"Redo",shortcut:"Ctrl+Y"})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[t.jsx(M,{icon:"content_cut",onClick:U,disabled:!Ne,active:ce==="cut",label:"Split",shortcut:"S"}),t.jsx(M,{icon:"delete",onClick:De,disabled:!Ce,label:"Delete",shortcut:"Del"})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx(ze,{clips:r,totalDuration:f,viewportStart:he.start,viewportEnd:he.end,width:140}),t.jsx(M,{icon:"align_horizontal_center",onClick:()=>Te(e=>!e),active:K,label:`Snap to grid (${K?"on":"off"})`}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",borderLeft:"1px solid rgba(255,255,255,0.06)",borderRight:"1px solid rgba(255,255,255,0.06)",padding:"0 10px"},children:[t.jsx(M,{icon:"zoom_out",onClick:()=>O(Math.max(0,k-10)),label:"Zoom out"}),t.jsx("input",{type:"range",value:k,onChange:e=>O(Number(e.target.value)),min:0,max:100,className:"zoom-slider",style:{width:"70px"},"aria-label":`Zoom ${k}%`}),t.jsx(M,{icon:"zoom_in",onClick:()=>O(Math.min(100,k+10)),label:"Zoom in"}),t.jsxs("span",{style:{fontSize:"9px",color:"#64748b",fontWeight:600,minWidth:"28px",textAlign:"center"},children:[k,"%"]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",position:"relative"},children:[t.jsx(M,{icon:"dynamic_feed",label:"Clip grouping (coming soon)",disabled:!0}),t.jsxs("div",{style:{position:"relative"},children:[t.jsx(M,{icon:"volume_up",onClick:()=>{a&&be(e=>!e)},disabled:!a,label:"Volume",active:pe}),pe&&a&&(()=>{const e=r.find(o=>o.id===a);return e?t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{position:"fixed",inset:0,zIndex:99},onClick:()=>be(!1)}),t.jsxs("div",{style:{position:"absolute",bottom:"100%",left:"50%",transform:"translateX(-50%)",marginBottom:"8px",background:"rgba(26,35,50,0.98)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px",padding:"12px",zIndex:100,minWidth:"140px",boxShadow:"0 12px 32px rgba(0,0,0,0.5)"},children:[t.jsx("div",{style:{fontSize:"10px",color:"#64748b",marginBottom:"8px",fontWeight:600},children:"Clip Volume"}),t.jsx("input",{type:"range",min:0,max:200,value:Math.round((e.volume??1)*100),onChange:o=>i?.(a,{volume:Number(o.target.value)/100}),style:{width:"100%",accentColor:"#75aadb"}}),t.jsxs("div",{style:{fontSize:"10px",color:"#75aadb",textAlign:"center",marginTop:"4px"},children:[Math.round((e.volume??1)*100),"%"]})]})]}):null})()]}),t.jsxs("div",{style:{position:"relative"},children:[t.jsx(M,{icon:"speed",onClick:()=>{a&&J(e=>!e)},disabled:!a,label:"Speed",active:xe}),xe&&a&&(()=>{const e=r.find(o=>o.id===a);return e?t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{position:"fixed",inset:0,zIndex:99},onClick:()=>J(!1)}),t.jsx("div",{style:{position:"absolute",bottom:"100%",left:"50%",transform:"translateX(-50%)",marginBottom:"8px",background:"rgba(26,35,50,0.98)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px",padding:"8px",zIndex:100,boxShadow:"0 12px 32px rgba(0,0,0,0.5)",display:"flex",gap:"4px"},children:[.25,.5,1,1.5,2].map(o=>t.jsxs("button",{onClick:()=>{i?.(a,{speed:o}),J(!1)},style:{background:(e.speed??1)===o?"rgba(117,170,219,0.2)":"rgba(30,41,59,0.5)",border:(e.speed??1)===o?"1px solid #75aadb":"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",padding:"4px 8px",fontSize:"10px",fontWeight:500,color:(e.speed??1)===o?"#75aadb":"#94a3b8",cursor:"pointer"},children:[o,"x"]},o))})]}):null})()]})]})]})]}),t.jsxs("div",{style:{flex:1,display:"flex",overflow:"hidden"},children:[t.jsxs("div",{style:{width:"48px",background:"#0e1218",borderRight:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",paddingTop:"28px",zIndex:10,flexShrink:0},children:[t.jsx(te,{icon:"visibility",lockIcon:"lock_open",label:"V1",trackType:"video",height:68,isMuted:_.video,isLocked:E.video,onToggleMute:()=>re(e=>({...e,video:!e.video})),onToggleLock:()=>ne(e=>({...e,video:!e.video}))}),t.jsx(te,{icon:"volume_up",lockIcon:"lock_open",label:"A1",trackType:"audio",height:60,isMuted:_.audio,isLocked:E.audio,onToggleMute:()=>re(e=>({...e,audio:!e.audio})),onToggleLock:()=>ne(e=>({...e,audio:!e.audio}))})]}),t.jsxs("div",{ref:C,onMouseDown:Le,tabIndex:0,role:"application","aria-label":"Timeline — arrow keys to scrub, S to split, Del to delete",style:{flex:1,position:"relative",overflowX:"auto",overflowY:"hidden",background:"rgba(8,10,14,0.6)",outline:"none"},className:"cs",children:[t.jsx("div",{style:{height:"28px",borderBottom:"1px solid rgba(255,255,255,0.06)",position:"relative",width:`${ue}px`,background:"linear-gradient(180deg, rgba(14,18,24,0.9) 0%, rgba(10,10,10,0.7) 100%)",zIndex:20,cursor:"pointer"},children:Re.map((e,o)=>t.jsx("div",{style:{position:"absolute",left:`${e.time*m}px`,height:"100%",borderLeft:`1px solid ${e.major?"rgba(117,170,219,0.25)":"rgba(100,116,139,0.12)"}`,paddingLeft:"5px",display:"flex",alignItems:"center",fontSize:e.major?"9px":"8px",color:e.major?"#94a3b8":"transparent",fontFamily:"monospace",fontWeight:500,userSelect:"none"},children:e.label},o))}),t.jsxs("div",{style:{position:"relative",width:`${ue}px`,paddingTop:"6px",paddingBottom:"8px"},children:[de!==null&&t.jsx("div",{className:"snap-line",style:{position:"absolute",left:`${de*m}px`,top:0,width:"1px",height:"100%",background:"#f59e0b",zIndex:60,boxShadow:"0 0 6px rgba(245,158,11,0.6)"}}),t.jsxs("div",{className:`playhead-line ${X?"scrubbing":""}`,style:{position:"absolute",left:`${y*m}px`,top:0,width:"2px",height:"100%",background:"linear-gradient(180deg, #75aadb 0%, rgba(117,170,219,0.5) 100%)",zIndex:50,pointerEvents:"none",boxShadow:"0 0 10px rgba(117,170,219,0.6), -1px 0 0 rgba(117,170,219,0.2), 1px 0 0 rgba(117,170,219,0.2)",animation:X?"none":"playhead-pulse 2s ease-in-out infinite"},children:[t.jsx("div",{style:{width:"14px",height:"14px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",position:"absolute",top:"-7px",left:"-6px",clipPath:"polygon(50% 100%, 0% 0%, 100% 0%)",filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.4))"}}),X&&t.jsxs("div",{style:{position:"absolute",top:"-26px",left:"-22px",background:"rgba(10,14,20,0.95)",border:"1px solid rgba(117,170,219,0.4)",borderRadius:"4px",padding:"2px 6px",fontSize:"9px",color:"#75aadb",fontFamily:"monospace",fontWeight:600,whiteSpace:"nowrap",boxShadow:"0 2px 8px rgba(0,0,0,0.4)",pointerEvents:"none"},children:[Math.floor(y/60),":",(y%60).toFixed(1).padStart(4,"0")]})]}),t.jsxs("div",{onDragOver:e=>we(e,"video"),onDragLeave:ke,onDrop:e=>je(e,"video"),style:{height:"60px",position:"relative",marginLeft:"12px",marginBottom:"8px",borderRadius:"6px",background:_.video?"rgba(117,170,219,0.02)":"linear-gradient(180deg, rgba(117,170,219,0.04) 0%, rgba(117,170,219,0.01) 100%)",border:`1px solid ${E.video?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.03)"}`,opacity:_.video?.35:1,transition:"opacity 0.2s ease, border-color 0.2s ease"},role:"list","aria-label":"Video track",children:[ge.map(e=>t.jsx(ae,{clip:e,isSelected:a===e.id,onSelect:c,pixelsPerSecond:m,onDragStart:ve,onDragEnd:ye,isDragging:se===e.id,onResizeStart:fe},e.id)),ge.length===0&&t.jsx(oe,{type:"video",isDragOver:ie==="video"})]}),t.jsxs("div",{onDragOver:e=>we(e,"audio"),onDragLeave:ke,onDrop:e=>je(e,"audio"),style:{height:"52px",position:"relative",marginLeft:"12px",borderRadius:"6px",background:_.audio?"rgba(52,211,153,0.02)":"linear-gradient(180deg, rgba(52,211,153,0.04) 0%, rgba(52,211,153,0.01) 100%)",border:`1px solid ${E.audio?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.03)"}`,opacity:_.audio?.35:1,transition:"opacity 0.2s ease, border-color 0.2s ease"},role:"list","aria-label":"Audio track",children:[me.map(e=>t.jsx(ae,{clip:e,isSelected:a===e.id,onSelect:c,pixelsPerSecond:m,onDragStart:ve,onDragEnd:ye,isDragging:se===e.id,onResizeStart:fe},e.id)),me.length===0&&t.jsx(oe,{type:"audio",isDragOver:ie==="audio"})]})]})]})]}),s&&t.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,backdropFilter:"blur(3px)"},role:"alert","aria-live":"polite",children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",background:"rgba(26,35,50,0.95)",padding:"14px 24px",borderRadius:"10px",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"},children:[t.jsx("div",{style:{width:"20px",height:"20px",border:"2.5px solid #75aadb",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),t.jsx("span",{style:{color:"white",fontSize:"13px",fontWeight:500},children:"Processing..."})]})})]})},He=n.memo(We);export{He as default};
