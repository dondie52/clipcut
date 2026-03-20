import{r as n,j as t}from"./DwQPoapS.js";import{F as ie,I as h,s as v}from"./BEU0hBGZ.js";import"./N_1C3EEk.js";import"./DZxFKcQQ.js";import"./DuArS60f.js";import"./DWGeIRwN.js";import"./CnUvhfVk.js";import"./B9CjrYEi.js";const le=`
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .player-root { position: relative; }
  .player-root:fullscreen { background: #000; }
  .player-root:fullscreen .player-header { display: none; }
  .player-root:fullscreen .player-viewport { padding: 0; }
  .player-root:fullscreen .player-viewport > div { max-width: 100%; border-radius: 0; border: none; }

  .player-container { position: relative; cursor: pointer; }
  .player-container:hover .overlay-controls { opacity: 1; pointer-events: auto; }
  .overlay-controls { opacity: 0; transition: opacity 0.25s ease; pointer-events: none; }
  .overlay-controls.paused { opacity: 1; pointer-events: auto; }

  .big-play {
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.15s ease;
    animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .big-play:hover { transform: scale(1.1); background: rgba(117,170,219,0.25) !important; }
  .big-play:active { transform: scale(0.92); }

  .ctrl-btn {
    transition: all 0.12s ease; border-radius: 6px; padding: 6px;
    display: flex; align-items: center; justify-content: center;
  }
  .ctrl-btn:hover { background: rgba(255,255,255,0.08); transform: scale(1.08); }
  .ctrl-btn:active { transform: scale(0.94); }

  .play-glow {
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.12s ease;
  }
  .play-glow:hover { transform: scale(1.08); background: rgba(117,170,219,0.25) !important; }
  .play-glow:active { transform: scale(0.92); }

  /* Seekbar */
  .seekbar { position: relative; cursor: pointer; height: 28px; display: flex; align-items: center; }
  .seekbar-track {
    width: 100%; height: 4px; background: rgba(255,255,255,0.08);
    border-radius: 2px; overflow: visible; position: relative;
    transition: height 0.15s ease;
  }
  .seekbar:hover .seekbar-track { height: 6px; }
  .seekbar-buffer { position: absolute; top: 0; left: 0; height: 100%; background: rgba(255,255,255,0.12); border-radius: 2px; transition: width 0.1s; }
  .seekbar-fill {
    position: absolute; top: 0; left: 0; height: 100%;
    background: linear-gradient(90deg, #5a8cbf, #75aadb);
    border-radius: 2px; transition: width 0.05s linear;
  }
  .seekbar-thumb {
    position: absolute; width: 14px; height: 14px; background: white;
    border-radius: 50%; top: 50%; transform: translate(-50%, -50%) scale(0);
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 1px 6px rgba(0,0,0,0.4), 0 0 0 2px rgba(117,170,219,0.3);
    z-index: 2;
  }
  .seekbar:hover .seekbar-thumb, .seekbar.dragging .seekbar-thumb {
    transform: translate(-50%, -50%) scale(1);
  }
  .seekbar.dragging .seekbar-thumb {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 0 0 3px rgba(117,170,219,0.4);
  }
  .seekbar-hover-time {
    position: absolute; bottom: calc(100% + 8px); transform: translateX(-50%);
    background: rgba(14,18,24,0.95); border: 1px solid rgba(117,170,219,0.2);
    padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;
    color: #75aadb; font-family: monospace; white-space: nowrap;
    opacity: 0; transition: opacity 0.12s ease; pointer-events: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .seekbar:hover .seekbar-hover-time { opacity: 1; }

  /* Volume */
  .vol-group { display: flex; align-items: center; }
  .vol-slider-wrap {
    width: 0; overflow: hidden;
    transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1), margin 0.2s ease;
  }
  .vol-group:hover .vol-slider-wrap { width: 80px; margin-left: 6px; }
  .vol-slider {
    -webkit-appearance: none; appearance: none;
    width: 80px; height: 3px; background: rgba(255,255,255,0.1);
    border-radius: 2px; outline: none; cursor: pointer;
  }
  .vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 12px; height: 12px;
    border-radius: 50%; background: #75aadb;
    border: 2px solid rgba(255,255,255,0.2);
    transition: transform 0.1s ease;
  }
  .vol-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }

  /* Speed menu */
  .speed-menu { animation: slideUp 0.15s ease; }
  .speed-opt { transition: all 0.1s ease; }
  .speed-opt:hover { background: rgba(117,170,219,0.12); }
  .speed-opt.active { color: #75aadb; font-weight: 600; }

  /* Chip buttons */
  .chip-btn {
    display: flex; align-items: center; gap: 4px;
    background: rgba(30,41,59,0.8); padding: 4px 10px; border-radius: 5px;
    font-size: 10px; color: #cbd5e1; cursor: pointer; border: none;
    font-family: 'Spline Sans', sans-serif;
    transition: background 0.12s ease;
  }
  .chip-btn:hover { background: rgba(117,170,219,0.15); }

  /* PiP indicator */
  .pip-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(117,170,219,0.9);
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    animation: fadeIn 0.2s ease;
  }
`,X=a=>{if(!a||!isFinite(a))return"00:00:00:00";const o=Math.floor(a/3600),i=Math.floor(a%3600/60),u=Math.floor(a%60),f=Math.floor(a%1*30);return`${z(o)}:${z(i)}:${z(u)}:${z(f)}`},ce=a=>{if(!a||!isFinite(a))return"0:00";const o=Math.floor(a/60),i=Math.floor(a%60);return`${o}:${i.toString().padStart(2,"0")}`},z=a=>a.toString().padStart(2,"0"),q=n.memo(({currentTime:a,duration:o,onSeek:i,buffered:u=0})=>{const f=n.useRef(null),[d,k]=n.useState(!1),[D,I]=n.useState(null),[C,s]=n.useState(0),l=o>0?a/o*100:0,$=o>0?u/o*100:0,g=n.useCallback(b=>{if(!f.current||!o)return 0;const x=f.current.getBoundingClientRect();return Math.max(0,Math.min(o,(b.clientX-x.left)/x.width*o))},[o]),N=n.useCallback(b=>{b.preventDefault(),k(!0),i?.(g(b))},[g,i]),y=n.useCallback(b=>{if(!f.current)return;const x=f.current.getBoundingClientRect();s(Math.max(0,Math.min(b.clientX-x.left,x.width))),I(g(b)),d&&i?.(g(b))},[d,g,i]),A=n.useCallback(()=>k(!1),[]),M=n.useCallback(()=>{I(null),d||k(!1)},[d]);return n.useEffect(()=>{if(!d)return;const b=()=>k(!1);return window.addEventListener("mouseup",b),()=>window.removeEventListener("mouseup",b)},[d]),t.jsxs("div",{ref:f,className:`seekbar ${d?"dragging":""}`,onMouseDown:N,onMouseMove:y,onMouseUp:A,onMouseLeave:M,role:"slider","aria-label":"Video progress","aria-valuemin":0,"aria-valuemax":o,"aria-valuenow":a,children:[D!==null&&t.jsx("div",{className:"seekbar-hover-time",style:{left:`${C}px`},children:ce(D)}),t.jsxs("div",{className:"seekbar-track",children:[t.jsx("div",{className:"seekbar-buffer",style:{width:`${$}%`}}),t.jsx("div",{className:"seekbar-fill",style:{width:`${l}%`}})]}),t.jsx("div",{className:"seekbar-thumb",style:{left:`${l}%`}})]})});q.displayName="Seekbar";const H=n.memo(({volume:a,onChange:o,muted:i,onToggleMute:u})=>{const f=i||a===0?"volume_off":a<.3?"volume_mute":a<.7?"volume_down":"volume_up";return t.jsxs("div",{className:"vol-group",children:[t.jsx("button",{onClick:u,className:"ctrl-btn",style:v.ghost,title:i?"Unmute (M)":"Mute (M)",children:t.jsx(h,{i:f,s:19,c:"#94a3b8"})}),t.jsx("div",{className:"vol-slider-wrap",children:t.jsx("input",{type:"range",min:0,max:1,step:.05,value:i?0:a,onChange:d=>o(Number(d.target.value)),className:"vol-slider","aria-label":`Volume ${Math.round((i?0:a)*100)}%`})})]})});H.displayName="VolumeControl";const G=n.memo(({speed:a,onChange:o})=>{const[i,u]=n.useState(!1),f=[.25,.5,.75,1,1.25,1.5,1.75,2];return t.jsxs("div",{style:{position:"relative"},children:[t.jsxs("button",{onClick:()=>u(!i),className:"chip-btn","aria-expanded":i,children:[a,"x ",t.jsx(h,{i:"expand_more",s:14})]}),i&&t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{position:"fixed",inset:0,zIndex:99},onClick:()=>u(!1)}),t.jsx("div",{className:"speed-menu",style:{position:"absolute",bottom:"100%",right:0,marginBottom:"8px",background:"rgba(26,35,50,0.98)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px",overflow:"hidden",zIndex:100,boxShadow:"0 12px 32px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",minWidth:"80px"},role:"listbox",children:f.map(d=>t.jsxs("button",{onClick:()=>{o(d),u(!1)},className:`speed-opt ${a===d?"active":""}`,style:{display:"block",width:"100%",padding:"8px 16px",background:"none",border:"none",color:a===d?"#75aadb":"#94a3b8",fontSize:"12px",textAlign:"center",cursor:"pointer",fontFamily:"inherit"},role:"option","aria-selected":a===d,children:[d,"x"]},d))})]})]})});G.displayName="SpeedControl";const de=({isPlaying:a,onPlayPause:o,videoSrc:i=null,currentTime:u=0,duration:f=0,onTimeUpdate:d,onDurationChange:k,onEnded:D,onSeek:I,onVideoError:C=null,clipProperties:s=null})=>{const l=n.useRef(null),$=n.useRef(null),[g,N]=n.useState(u),[y,A]=n.useState(f),[M,b]=n.useState("fit"),[x,T]=n.useState(1),[_,O]=n.useState(!1),[R,J]=n.useState(1),[Q,Z]=n.useState(0),[P,V]=n.useState(!1),[W,F]=n.useState(null);n.useEffect(()=>{const e=l.current;if(!e||!i){F(null);return}F(null);const r=()=>{e&&u>=0&&(e.currentTime=u,N(u)),a&&e.paused?e.play().catch(p=>{p.name!=="AbortError"&&console.warn("Video play failed:",p)}):!a&&!e.paused&&e.pause()},c=p=>{console.error("Video error:",p);const m=e.error;if(m){let j="Video failed to load",E=!1;switch(m.code){case m.MEDIA_ERR_ABORTED:j="Video loading aborted";break;case m.MEDIA_ERR_NETWORK:j="Network error while loading video";break;case m.MEDIA_ERR_DECODE:j="Video decoding error",E=!0;break;case m.MEDIA_ERR_SRC_NOT_SUPPORTED:j="Video format not supported",E=!0;break}F(j),E&&C&&i&&C(i)}};return e.addEventListener("loadedmetadata",r),e.addEventListener("canplay",r),e.addEventListener("canplaythrough",r),e.addEventListener("error",c),e.readyState>=2&&(u>=0&&(e.currentTime=u,N(u)),a&&e.paused?e.play().catch(p=>{p.name!=="AbortError"&&console.warn("Video play failed:",p)}):!a&&!e.paused&&e.pause()),()=>{e&&(e.removeEventListener("loadedmetadata",r),e.removeEventListener("canplay",r),e.removeEventListener("canplaythrough",r),e.removeEventListener("error",c))}},[a,i,u]),n.useEffect(()=>{const e=l.current;if(!e||!i)return;let r=!1;if(a){if(e.paused){r=!0;const c=e.play();c!==void 0&&c.catch(p=>{p.name!=="AbortError"&&console.warn("Video play failed:",p),o&&p.name!=="AbortError"&&o()}).finally(()=>{r=!1})}}else!e.paused&&!r&&e.pause()},[a,i,o]),n.useEffect(()=>{const e=l.current;if(!e||!i)return;const r=()=>{!a&&o&&requestAnimationFrame(()=>{l.current&&!l.current.paused&&!a&&o()})},c=()=>{a&&o&&requestAnimationFrame(()=>{l.current&&l.current.paused&&a&&o()})};return e.addEventListener("play",r),e.addEventListener("pause",c),()=>{e.removeEventListener("play",r),e.removeEventListener("pause",c)}},[a,i,o]),n.useEffect(()=>{l.current&&(l.current.volume=x,l.current.muted=_)},[x,_]),n.useEffect(()=>{l.current&&(l.current.playbackRate=R)},[R]);const ee=n.useCallback(()=>{const e=l.current;if(!e)return;N(e.currentTime),d?.(e.currentTime);const r=e.buffered;r.length>0&&Z(r.end(r.length-1))},[d]),te=n.useCallback(()=>{const e=l.current;e&&(A(e.duration),k?.(e.duration))},[k]),re=n.useCallback(()=>D?.(),[D]),S=n.useCallback(e=>{l.current&&(l.current.currentTime=e,N(e),I?.(e))},[I]),w=n.useCallback(e=>{l.current&&S(Math.max(0,Math.min(l.current.duration||y,l.current.currentTime+e)))},[y,S]),L=n.useCallback((e=!0)=>w(e?1/30:-1/30),[w]),K=n.useCallback(()=>{document.fullscreenElement?document.exitFullscreen():$.current?.requestFullscreen().catch(()=>{})},[]),U=n.useCallback(async()=>{const e=l.current;if(e)try{document.pictureInPictureElement?(await document.exitPictureInPicture(),V(!1)):(await e.requestPictureInPicture(),V(!0))}catch(r){console.warn("PiP not supported:",r)}},[]);n.useEffect(()=>{const e=l.current;if(!e)return;const r=()=>V(!1);return e.addEventListener("leavepictureinpicture",r),()=>e.removeEventListener("leavepictureinpicture",r)},[i]);const ae=n.useMemo(()=>{if(!s)return{};const e=[],r=[],c={};if(s.rotation&&e.push(`rotate(${s.rotation}deg)`),s.scale&&s.scale!==1&&e.push(`scale(${s.scale})`),(s.positionX||s.positionY)&&e.push(`translate(${s.positionX||0}px, ${s.positionY||0}px)`),s.brightness&&r.push(`brightness(${1+s.brightness})`),s.contrast&&r.push(`contrast(${1+s.contrast})`),s.saturation!==void 0&&s.saturation!==1&&r.push(`saturate(${s.saturation})`),s.filterName){const p=ie.find(m=>m.name===s.filterName);if(p?.css){const m=(s.filterStrength??50)/100;m<1?r.push(p.css.replace(/\(([^)]+)\)/g,(j,E)=>{const B=parseFloat(E);if(isNaN(B))return j;const Y=E.includes("deg")?0:1;return`(${Y+(B-Y)*m}${E.replace(/[\d.]+/,"")})`})):r.push(p.css)}}return s.opacity!==void 0&&s.opacity!==1&&(c.opacity=s.opacity),e.length&&(c.transform=e.join(" ")),r.length&&(c.filter=r.join(" ")),c.transition="transform 0.1s ease, filter 0.1s ease, opacity 0.1s ease",c},[s]);n.useEffect(()=>{const e=l.current;if(!e||!s)return;const r=s.speed||1;e.playbackRate!==r*R&&(e.playbackRate=r*R)},[s?.speed,R]),n.useEffect(()=>{const e=l.current;if(!e||!s)return;const r=s.isMuted?0:s.volume??1;e.volume=Math.min(1,r*x),e.muted=_||s.isMuted},[s?.volume,s?.isMuted,x,_]);const ne={fit:"contain",fill:"cover",original:"none"},se={fit:"Fit",fill:"Fill",original:"Original"},oe=n.useCallback(()=>{const e=["fit","fill","original"];b(e[(e.indexOf(M)+1)%e.length])},[M]);return n.useEffect(()=>{const e=r=>{if(!(r.target.tagName==="INPUT"||r.target.tagName==="TEXTAREA"))switch(r.key){case" ":r.preventDefault(),o?.();break;case"ArrowLeft":r.preventDefault(),w(r.shiftKey?-10:r.altKey?-.03333333333333333:-5);break;case"ArrowRight":r.preventDefault(),w(r.shiftKey?10:r.altKey?.03333333333333333:5);break;case"ArrowUp":r.preventDefault(),T(c=>Math.min(1,c+.1));break;case"ArrowDown":r.preventDefault(),T(c=>Math.max(0,c-.1));break;case"m":case"M":r.preventDefault(),O(c=>!c);break;case"f":case"F":!r.ctrlKey&&!r.metaKey&&(r.preventDefault(),K());break;case"p":case"P":!r.ctrlKey&&!r.metaKey&&(r.preventDefault(),U());break;case",":r.preventDefault(),L(!1);break;case".":r.preventDefault(),L(!0);break;case"Home":r.preventDefault(),S(0);break;case"End":r.preventDefault(),S(y);break}};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[o,w,L,K,U,S,y]),t.jsxs("section",{ref:$,className:"player-root",style:{flex:1,display:"flex",flexDirection:"column",background:"#0a0a0a",minWidth:0},role:"region","aria-label":"Video player",children:[t.jsx("style",{children:le}),t.jsxs("div",{className:"player-header",style:{height:"32px",display:"flex",alignItems:"center",padding:"0 16px"},children:[t.jsx("span",{style:{fontSize:"10px",fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"1.5px"},children:"Player"}),P&&t.jsxs("div",{className:"pip-indicator",style:{marginLeft:"auto"},children:[t.jsx(h,{i:"picture_in_picture_alt",s:12,c:"white"}),t.jsx("span",{style:{marginLeft:"4px"},children:"PiP"})]})]}),t.jsx("div",{className:"player-viewport",style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"8px 24px"},children:t.jsx("div",{className:"player-container",onClick:o,style:{width:"100%",maxWidth:"900px",aspectRatio:"16/9",background:"#000",borderRadius:"3px",border:"1px solid rgba(255,255,255,0.04)",boxShadow:"0 16px 48px rgba(0,0,0,0.5)",overflow:"hidden",position:"relative"},children:i?t.jsx(t.Fragment,{children:W?t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",color:"#ef4444",width:"100%",height:"100%",justifyContent:"center",padding:"20px"},children:[t.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(h,{i:"error",s:32,c:"#ef4444"})}),t.jsx("span",{style:{fontSize:"13px",fontWeight:500},children:W}),t.jsxs("div",{style:{display:"flex",gap:"8px"},children:[t.jsx("button",{onClick:()=>{F(null),l.current&&l.current.load()},style:{background:"#75aadb",border:"none",borderRadius:"4px",padding:"6px 12px",fontSize:"11px",fontWeight:600,color:"#0a0a0a",cursor:"pointer"},children:"Retry"}),W==="Video format not supported"&&C&&t.jsx("button",{onClick:()=>{F("Converting video..."),C(i)},style:{background:"#22c55e",border:"none",borderRadius:"4px",padding:"6px 12px",fontSize:"11px",fontWeight:600,color:"#0a0a0a",cursor:"pointer"},children:"Convert Format"})]})]}):t.jsxs(t.Fragment,{children:[t.jsx("video",{ref:l,src:i,preload:"metadata",playsInline:!0,onTimeUpdate:ee,onLoadedMetadata:te,onEnded:re,style:{width:"100%",height:"100%",objectFit:ne[M],...ae}}),t.jsx("div",{className:`overlay-controls ${a?"":"paused"}`,style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(circle at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 70%)",pointerEvents:a?"none":"auto"},children:t.jsx("button",{className:"big-play",onClick:e=>{e.stopPropagation(),o?.()},style:{width:"60px",height:"60px",borderRadius:"50%",background:"rgba(0,0,0,0.5)",border:"2px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(6px)"},children:t.jsx(h,{i:a?"pause":"play_arrow",s:30,c:"white"})})})]})}):t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",color:"#475569",width:"100%",height:"100%",justifyContent:"center"},children:[t.jsx("div",{style:{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(h,{i:"movie",s:32,c:"#475569"})}),t.jsx("span",{style:{fontSize:"13px",fontWeight:500},children:"Import media to preview"}),t.jsx("span",{style:{fontSize:"10px",color:"#334155"},children:"Double-click a clip or drag to timeline"})]})})}),i&&t.jsx("div",{style:{padding:"0 16px"},children:t.jsx(q,{currentTime:g,duration:y,onSeek:S,buffered:Q})}),t.jsxs("div",{style:{...v.controls,height:"52px",gap:"8px"},className:"player-controls",children:[t.jsxs("div",{style:{fontFamily:"monospace",fontSize:"13px",letterSpacing:"1.5px",display:"flex",gap:"2px",minWidth:"170px"},children:[t.jsx("span",{style:{color:"#75aadb"},children:X(g).slice(0,8)}),t.jsxs("span",{style:{color:"rgba(117,170,219,0.5)"},children:[":",X(g).slice(9)]}),t.jsx("span",{style:{color:"#334155",margin:"0 5px"},children:"/"}),t.jsx("span",{style:{color:"#64748b"},children:X(y)})]}),t.jsxs("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("button",{onClick:()=>L(!1),className:"ctrl-btn",style:v.ghost,title:"Prev frame (,)",children:t.jsx(h,{i:"first_page",s:17,c:"#64748b"})}),t.jsx("button",{onClick:()=>w(-5),className:"ctrl-btn",style:v.ghost,title:"Skip -5s (←)",children:t.jsx(h,{i:"skip_previous",s:21,c:"#94a3b8"})}),t.jsx("button",{onClick:o,className:"play-glow",style:{...v.ghost,width:"42px",height:"42px",borderRadius:"50%",background:"rgba(117,170,219,0.12)",display:"flex",alignItems:"center",justifyContent:"center"},title:`${a?"Pause":"Play"} (Space)`,children:t.jsx(h,{i:a?"pause":"play_arrow",s:32,c:"white"})}),t.jsx("button",{onClick:()=>w(5),className:"ctrl-btn",style:v.ghost,title:"Skip +5s (→)",children:t.jsx(h,{i:"skip_next",s:21,c:"#94a3b8"})}),t.jsx("button",{onClick:()=>L(!0),className:"ctrl-btn",style:v.ghost,title:"Next frame (.)",children:t.jsx(h,{i:"last_page",s:17,c:"#64748b"})})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx(H,{volume:x,onChange:T,muted:_,onToggleMute:()=>O(e=>!e)}),t.jsx(G,{speed:R,onChange:J}),t.jsx("button",{onClick:oe,className:"chip-btn",title:"Fit mode",children:se[M]}),t.jsx("button",{onClick:U,className:"ctrl-btn",style:v.ghost,title:"Picture-in-Picture (P)",children:t.jsx(h,{i:"picture_in_picture_alt",s:17,c:"#64748b"})}),t.jsx("button",{onClick:K,className:"ctrl-btn",style:v.ghost,title:"Fullscreen (F)",children:t.jsx(h,{i:"fullscreen",s:18,c:"#94a3b8"})})]})]})]})},ve=n.memo(de);export{ve as default};
