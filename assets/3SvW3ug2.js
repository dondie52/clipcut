import{r as a,j as t}from"./-P2Ya96f.js";import{F as me,I as m,s as w}from"./Dytwh71r.js";import{u as ye}from"./B2ooi-rz.js";import"./FgVWUtmG.js";import"./DZxFKcQQ.js";import"./DuArS60f.js";import"./CbpQLdGF.js";import"./B9CjrYEi.js";const ve=`
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

  @media (max-width: 767px) {
    .seekbar-thumb {
      width: 20px; height: 20px;
      transform: translate(-50%, -50%) scale(1);
    }
    .seekbar-track { height: 6px; }
    .seekbar:hover .seekbar-thumb, .seekbar.dragging .seekbar-thumb {
      transform: translate(-50%, -50%) scale(1);
    }
    .seekbar.dragging .seekbar-thumb {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`,P=s=>{if(!s||!isFinite(s))return"00:00:00:00";const l=Math.floor(s/3600),i=Math.floor(s%3600/60),p=Math.floor(s%60),x=Math.floor(s%1*30);return`${U(l)}:${U(i)}:${U(p)}:${U(x)}`},ke=s=>{if(!s||!isFinite(s))return"0:00";const l=Math.floor(s/60),i=Math.floor(s%60);return`${l}:${i.toString().padStart(2,"0")}`},U=s=>s.toString().padStart(2,"0"),se=a.memo(({currentTime:s,duration:l,onSeek:i,buffered:p=0})=>{const x=a.useRef(null),[d,h]=a.useState(!1),[u,j]=a.useState(null),[C,n]=a.useState(0),o=l>0?s/l*100:0,c=l>0?p/l*100:0,y=a.useCallback(f=>{if(!x.current||!l)return 0;const F=x.current.getBoundingClientRect();return Math.max(0,Math.min(l,(f.clientX-F.left)/F.width*l))},[l]),E=a.useCallback(f=>{f.preventDefault(),h(!0),i?.(y(f))},[y,i]),k=a.useCallback(f=>{if(!x.current)return;const F=x.current.getBoundingClientRect();n(Math.max(0,Math.min(f.clientX-F.left,F.width))),j(y(f)),d&&i?.(y(f))},[d,y,i]),g=a.useCallback(()=>h(!1),[]),$=a.useCallback(()=>{j(null),d||h(!1)},[d]);return a.useEffect(()=>{if(!d)return;const f=()=>h(!1);return window.addEventListener("mouseup",f),()=>window.removeEventListener("mouseup",f)},[d]),t.jsxs("div",{ref:x,className:`seekbar ${d?"dragging":""}`,onMouseDown:E,onMouseMove:k,onMouseUp:g,onMouseLeave:$,role:"slider","aria-label":"Video progress","aria-valuemin":0,"aria-valuemax":l,"aria-valuenow":s,children:[u!==null&&t.jsx("div",{className:"seekbar-hover-time",style:{left:`${C}px`},children:ke(u)}),t.jsxs("div",{className:"seekbar-track",children:[t.jsx("div",{className:"seekbar-buffer",style:{width:`${c}%`}}),t.jsx("div",{className:"seekbar-fill",style:{width:`${o}%`}})]}),t.jsx("div",{className:"seekbar-thumb",style:{left:`${o}%`}})]})});se.displayName="Seekbar";const oe=a.memo(({volume:s,onChange:l,muted:i,onToggleMute:p})=>{const x=i||s===0?"volume_off":s<.3?"volume_mute":s<.7?"volume_down":"volume_up";return t.jsxs("div",{className:"vol-group",children:[t.jsx("button",{onClick:p,className:"ctrl-btn",style:w.ghost,title:i?"Unmute (M)":"Mute (M)",children:t.jsx(m,{i:x,s:19,c:"#94a3b8"})}),t.jsx("div",{className:"vol-slider-wrap",children:t.jsx("input",{type:"range",min:0,max:1,step:.05,value:i?0:s,onChange:d=>l(Number(d.target.value)),className:"vol-slider","aria-label":`Volume ${Math.round((i?0:s)*100)}%`})})]})});oe.displayName="VolumeControl";const ie=a.memo(({speed:s,onChange:l})=>{const[i,p]=a.useState(!1),x=[.25,.5,.75,1,1.25,1.5,1.75,2];return t.jsxs("div",{style:{position:"relative"},children:[t.jsxs("button",{onClick:()=>p(!i),className:"chip-btn","aria-expanded":i,children:[s,"x ",t.jsx(m,{i:"expand_more",s:14})]}),i&&t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{position:"fixed",inset:0,zIndex:99},onClick:()=>p(!1)}),t.jsx("div",{className:"speed-menu",style:{position:"absolute",bottom:"100%",right:0,marginBottom:"8px",background:"rgba(26,35,50,0.98)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px",overflow:"hidden",zIndex:100,boxShadow:"0 12px 32px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",minWidth:"80px"},role:"listbox",children:x.map(d=>t.jsxs("button",{onClick:()=>{l(d),p(!1)},className:`speed-opt ${s===d?"active":""}`,style:{display:"block",width:"100%",padding:"8px 16px",background:"none",border:"none",color:s===d?"#75aadb":"#94a3b8",fontSize:"12px",textAlign:"center",cursor:"pointer",fontFamily:"inherit"},role:"option","aria-selected":s===d,children:[d,"x"]},d))})]})]})});ie.displayName="SpeedControl";const ne={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}},le=a.memo(({text:s,color:l,size:i,position:p,bgColor:x})=>{const d=a.useRef(null);return a.useEffect(()=>{const h=d.current;if(!h)return;const u=h.getContext("2d"),j=window.devicePixelRatio||1,C=h.clientWidth,n=h.clientHeight;h.width=C*j,h.height=n*j,u.scale(j,j),u.clearRect(0,0,C,n);const o=ne[p]||ne["bottom-center"],c=Math.max(12,Math.round(i*(n/1080)));u.font=`bold ${c}px 'Spline Sans', Arial, sans-serif`,u.textAlign=o.align,u.textBaseline=o.baseline;const y=o.x*C,E=o.y*n;if(x){const k=u.measureText(s),g=c*.25,$=o.align==="center"?y-k.width/2-g:o.align==="right"?y-k.width-g:y-g,f=o.baseline==="middle"?E-c/2-g:o.baseline==="bottom"?E-c-g:E-g;u.fillStyle=x,u.globalAlpha=.7,u.fillRect($,f,k.width+g*2,c+g*2),u.globalAlpha=1}u.shadowColor="rgba(0,0,0,0.6)",u.shadowBlur=4,u.shadowOffsetX=1,u.shadowOffsetY=1,u.fillStyle=l,u.fillText(s,y,E)},[s,l,i,p,x]),t.jsx("canvas",{ref:d,style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:5}})});le.displayName="TextOverlayCanvas";const we=({isPlaying:s,onPlayPause:l,videoSrc:i=null,currentTime:p=0,duration:x=0,onTimeUpdate:d,onDurationChange:h,onEnded:u,onSeek:j,onVideoError:C=null,clipProperties:n=null})=>{const o=ye(),c=a.useRef(null),y=a.useRef(null),[E,k]=a.useState(p),[g,$]=a.useState(x),[f,F]=a.useState("fit"),[V,Y]=a.useState(1),[A,ee]=a.useState(!1),[D,ce]=a.useState(1),[de,te]=a.useState(0),[je,q]=a.useState(!1),[J,W]=a.useState(null),[Ce,Ee]=a.useState(!0);a.useRef(null);const R=a.useRef("idle"),O=a.useRef(s);O.current=s;const B=a.useRef(null),G=a.useRef(!1),re=a.useRef(null),X=a.useCallback(e=>{if(e){G.current=!0;try{e.pause()}finally{G.current=!1}}},[]),T=a.useCallback(()=>{const e=c.current;if(!i){l?.();return}if(s){X(e),l?.();return}const r=e?.play();l?.(),r!==void 0&&r.catch(b=>{b.name!=="AbortError"&&l&&l()})},[i,s,l,X]);a.useEffect(()=>{const e=c.current;if(!e||!i){W(null),R.current="idle";return}const r=i!==re.current;if(re.current=i,r){W(null),R.current="loading";let b=!1;const v=()=>{b||(b=!0,R.current="ready",e&&p>=0&&(e.currentTime=p,k(p)),O.current&&e.paused?(R.current="playing",e.play().catch(M=>{M.name!=="AbortError"&&console.warn("Video play failed:",M)})):O.current||(R.current="paused",e.paused||X(e)))},S=M=>{console.error("Video error:",M),R.current="idle";const N=e.error;if(N){let I="Video failed to load",L=!1;switch(N.code){case N.MEDIA_ERR_ABORTED:I="Video loading aborted";break;case N.MEDIA_ERR_NETWORK:I="Network error while loading video";break;case N.MEDIA_ERR_DECODE:I="Video decoding error",L=!0;break;case N.MEDIA_ERR_SRC_NOT_SUPPORTED:I="Video format not supported",L=!0;break}W(I),L&&C&&i&&C(i)}};return e.addEventListener("loadedmetadata",v),e.addEventListener("canplay",v),e.addEventListener("error",S),e.readyState>=2&&v(),()=>{e&&(e.removeEventListener("loadedmetadata",v),e.removeEventListener("canplay",v),e.removeEventListener("error",S))}}if(s){if(e.paused&&R.current!=="loading"){R.current="playing";const b=e.play();b!==void 0&&b.catch(v=>{v.name!=="AbortError"&&(console.warn("Video play failed:",v),l&&l())})}}else e.paused?R.current="paused":(R.current="paused",X(e))},[i,s,X]),a.useEffect(()=>{const e=c.current;if(!e||!i||s)return;e.currentTime=p,k(p),B.current=p;const r=p;setTimeout(()=>{B.current===r&&(B.current=null)},100)},[p,s,i]),a.useEffect(()=>{const e=c.current;if(!e||!i)return;const r=()=>{G.current||O.current&&e.paused&&l&&l()};return e.addEventListener("pause",r),()=>e.removeEventListener("pause",r)},[i,l]),a.useEffect(()=>{c.current&&(c.current.volume=V,c.current.muted=A)},[V,A]),a.useEffect(()=>{c.current&&(c.current.playbackRate=D)},[D]);const K=typeof HTMLVideoElement<"u"&&"requestVideoFrameCallback"in HTMLVideoElement.prototype;a.useEffect(()=>{const e=c.current;if(!e||!s||!K||!i)return;let r;const b=(v,S)=>{k(S.mediaTime),B.current===null&&d?.(S.mediaTime);const M=e.buffered;M.length>0&&te(M.end(M.length-1)),r=e.requestVideoFrameCallback(b)};return r=e.requestVideoFrameCallback(b),()=>{r&&e.cancelVideoFrameCallback(r)}},[s,K,i,d]);const pe=a.useCallback(()=>{if(K&&O.current)return;const e=c.current;if(!e||(k(e.currentTime),B.current!==null))return;d?.(e.currentTime);const r=e.buffered;r.length>0&&te(r.end(r.length-1))},[d,K]),ue=a.useCallback(()=>{const e=c.current;e&&($(e.duration),h?.(e.duration))},[h]),be=a.useCallback(()=>u?.(),[u]),z=a.useCallback(e=>{c.current&&(c.current.currentTime=e,k(e),j?.(e))},[j]),_=a.useCallback(e=>{c.current&&z(Math.max(0,Math.min(c.current.duration||g,c.current.currentTime+e)))},[g,z]),H=a.useCallback((e=!0)=>_(e?1/30:-1/30),[_]),Q=a.useCallback(()=>{document.fullscreenElement?document.exitFullscreen():y.current?.requestFullscreen().catch(()=>{})},[]),Z=a.useCallback(async()=>{const e=c.current;if(e)try{document.pictureInPictureElement?(await document.exitPictureInPicture(),q(!1)):(await e.requestPictureInPicture(),q(!0))}catch(r){console.warn("PiP not supported:",r)}},[]);a.useEffect(()=>{const e=c.current;if(!e)return;const r=()=>q(!1);return e.addEventListener("leavepictureinpicture",r),()=>e.removeEventListener("leavepictureinpicture",r)},[i]);const fe=a.useMemo(()=>n?!!(n.brightness||n.contrast||n.saturation!==void 0&&n.saturation!==1||n.filterName||n.rotation||n.scale&&n.scale!==1||n.opacity!==void 0&&n.opacity!==1):!1,[n]),xe=a.useMemo(()=>{if(!n)return{};const e=[],r=[],b={};if(n.rotation&&e.push(`rotate(${n.rotation}deg)`),n.scale&&n.scale!==1&&e.push(`scale(${n.scale})`),(n.positionX||n.positionY)&&e.push(`translate(${n.positionX||0}px, ${n.positionY||0}px)`),n.brightness&&r.push(`brightness(${1+n.brightness})`),n.contrast&&r.push(`contrast(${1+n.contrast})`),n.saturation!==void 0&&n.saturation!==1&&r.push(`saturate(${n.saturation})`),n.filterName){const v=me.find(S=>S.name===n.filterName);if(v?.css){const S=(n.filterStrength??50)/100;S<1?r.push(v.css.replace(/\(([^)]+)\)/g,(M,N)=>{const I=parseFloat(N);if(isNaN(I))return M;const L=N.includes("deg")?0:1;return`(${L+(I-L)*S}${N.replace(/[\d.]+/,"")})`})):r.push(v.css)}}return n.opacity!==void 0&&n.opacity!==1&&(b.opacity=n.opacity),e.length&&(b.transform=e.join(" ")),r.length&&(b.filter=r.join(" ")),b.transition="transform 0.1s ease, filter 0.1s ease, opacity 0.1s ease",b},[n]);a.useEffect(()=>{const e=c.current;if(!e||!n)return;const r=n.speed||1;e.playbackRate!==r*D&&(e.playbackRate=r*D)},[n?.speed,D]),a.useEffect(()=>{const e=c.current;if(!e||!n)return;const r=n.isMuted?0:n.volume??1;e.volume=Math.min(1,r*V),e.muted=A||n.isMuted},[n?.volume,n?.isMuted,V,A]);const ge={fit:"contain",fill:"cover",original:"none"},ae={fit:"Fit",fill:"Fill",original:"Original"},he=a.useCallback(()=>{const e=["fit","fill","original"];F(e[(e.indexOf(f)+1)%e.length])},[f]);return a.useEffect(()=>{const e=r=>{if(!(r.target.tagName==="INPUT"||r.target.tagName==="TEXTAREA"))switch(r.key){case" ":r.preventDefault(),T();break;case"ArrowLeft":r.preventDefault(),_(r.shiftKey?-10:r.altKey?-.03333333333333333:-5);break;case"ArrowRight":r.preventDefault(),_(r.shiftKey?10:r.altKey?.03333333333333333:5);break;case"ArrowUp":r.preventDefault(),Y(b=>Math.min(1,b+.1));break;case"ArrowDown":r.preventDefault(),Y(b=>Math.max(0,b-.1));break;case"m":case"M":r.preventDefault(),ee(b=>!b);break;case"f":case"F":!r.ctrlKey&&!r.metaKey&&(r.preventDefault(),Q());break;case"p":case"P":!r.ctrlKey&&!r.metaKey&&(r.preventDefault(),Z());break;case",":r.preventDefault(),H(!1);break;case".":r.preventDefault(),H(!0);break;case"Home":r.preventDefault(),z(0);break;case"End":r.preventDefault(),z(g);break}};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[T,_,H,Q,Z,z,g]),t.jsxs("section",{ref:y,className:"player-root",style:{flex:1,display:"flex",flexDirection:"column",background:"#08090c",minWidth:0},role:"region","aria-label":"Video player",children:[t.jsx("style",{children:ve}),t.jsx("div",{className:"player-viewport",style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",...o?{padding:0}:{padding:"12px 20px 8px"},background:o?"none":"radial-gradient(ellipse at center, rgba(117,170,219,0.02) 0%, transparent 70%)"},children:t.jsx("div",{style:{position:"relative",width:"100%",...o?{}:{maxWidth:"960px"}},children:t.jsx("div",{className:"player-container",onClick:e=>{T(e)},style:{width:"100%",aspectRatio:"16/9",background:"#000",...o?{borderRadius:0,border:"none",boxShadow:"none"}:{borderRadius:"6px",border:"1px solid rgba(117,170,219,0.1)",boxShadow:"0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.3)"},overflow:"hidden",position:"relative"},children:i?t.jsx(t.Fragment,{children:J?t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",color:"#ef4444",width:"100%",height:"100%",justifyContent:"center",padding:"20px",background:"radial-gradient(circle at center, rgba(239,68,68,0.05) 0%, transparent 70%)"},children:[t.jsx("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(m,{i:"error",s:28,c:"#ef4444"})}),t.jsx("span",{style:{fontSize:"13px",fontWeight:500},children:J}),t.jsxs("div",{style:{display:"flex",gap:"8px"},children:[t.jsx("button",{onClick:e=>{e.stopPropagation(),W(null),c.current&&c.current.load()},style:{background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",border:"none",borderRadius:"6px",padding:"7px 16px",fontSize:"11px",fontWeight:600,color:"#0a0a0a",cursor:"pointer",boxShadow:"0 2px 8px rgba(117,170,219,0.3)"},children:"Retry"}),J==="Video format not supported"&&C&&t.jsx("button",{onClick:e=>{e.stopPropagation(),W("Converting video..."),C(i)},style:{background:"linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",border:"none",borderRadius:"6px",padding:"7px 16px",fontSize:"11px",fontWeight:600,color:"#0a0a0a",cursor:"pointer",boxShadow:"0 2px 8px rgba(34,197,94,0.3)"},children:"Convert Format"})]})]}):t.jsxs(t.Fragment,{children:[t.jsx("video",{ref:c,src:i,preload:"auto",playsInline:!0,onTimeUpdate:pe,onLoadedMetadata:ue,onEnded:be,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:ge[f],...xe}}),n?.text?.trim()&&t.jsx(le,{text:n.text,color:n.textColor||"#ffffff",size:n.textSize||48,position:n.textPosition||"bottom-center",bgColor:n.textBgColor||""}),t.jsx("div",{className:`overlay-controls ${s?"":"paused"}`,style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:o?s?"none":"rgba(0,0,0,0.3)":"radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 70%)",pointerEvents:o?"auto":s?"none":"auto",transition:"background 0.2s ease"},children:t.jsx("button",{className:"big-play",onClick:e=>{e.stopPropagation(),T()},style:{width:o?"56px":"64px",height:o?"56px":"64px",borderRadius:"50%",background:o?"rgba(0,0,0,0.45)":"rgba(117,170,219,0.15)",border:o?"none":"2px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(12px)",boxShadow:o?"none":"0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",opacity:o&&s?0:1,transition:"opacity 0.2s ease",minWidth:"auto",minHeight:"auto"},children:t.jsx(m,{i:s?"pause":"play_arrow",s:o?28:32,c:"white"})})}),!o&&t.jsx("div",{style:{position:"absolute",top:"8px",left:"8px",width:"16px",height:"16px",borderTop:"1px solid rgba(255,255,255,0.08)",borderLeft:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none"}}),!o&&t.jsx("div",{style:{position:"absolute",top:"8px",right:"8px",width:"16px",height:"16px",borderTop:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none"}}),!o&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",width:"16px",height:"16px",borderBottom:"1px solid rgba(255,255,255,0.08)",borderLeft:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none"}}),!o&&t.jsx("div",{style:{position:"absolute",bottom:"8px",right:"8px",width:"16px",height:"16px",borderBottom:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none"}}),!o&&t.jsxs("div",{style:{position:"absolute",top:"10px",left:"10px",pointerEvents:"none",display:"flex",alignItems:"center",gap:"5px",opacity:.4},children:[t.jsx("div",{style:{width:"5px",height:"5px",borderRadius:"50%",background:s?"#22c55e":"#75aadb",boxShadow:s?"0 0 6px rgba(34,197,94,0.5)":"none",transition:"all 0.3s ease"}}),t.jsx("span",{style:{fontSize:"9px",fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"1.2px"},children:"Preview"}),fe&&t.jsx("span",{style:{fontSize:"7px",fontWeight:700,color:"#75aadb",background:"rgba(117,170,219,0.15)",padding:"1px 4px",borderRadius:"2px",letterSpacing:"0.3px",textTransform:"uppercase"},children:"FX"})]}),t.jsx("div",{style:{position:"absolute",top:"10px",right:"10px",pointerEvents:"none",opacity:.35},children:t.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",fontFamily:"monospace",letterSpacing:"0.5px"},children:ae[f]})})]})}):t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px",color:"#475569",width:"100%",height:"100%",justifyContent:"center",background:"radial-gradient(ellipse at center, rgba(117,170,219,0.04) 0%, transparent 60%)"},children:[t.jsx("div",{style:{width:"80px",height:"80px",borderRadius:"50%",background:"linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.03) 100%)",border:"1px solid rgba(117,170,219,0.1)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"},children:t.jsx(m,{i:"play_circle",s:36,c:"#475569"})}),t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx("p",{style:{fontSize:"14px",fontWeight:600,color:"#64748b",margin:"0 0 4px"},children:"No media loaded"}),t.jsx("p",{style:{fontSize:"11px",color:"#334155",margin:0,lineHeight:1.5},children:"Import media and add clips to the timeline to preview"})]}),t.jsxs("div",{style:{display:"flex",gap:"16px",marginTop:"4px"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[t.jsx(m,{i:"upload_file",s:13,c:"#334155"}),t.jsx("span",{style:{fontSize:"10px",color:"#334155"},children:"Ctrl+I to import"})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[t.jsx(m,{i:"space_bar",s:13,c:"#334155"}),t.jsx("span",{style:{fontSize:"10px",color:"#334155"},children:"Space to play"})]})]})]})})})}),o?null:t.jsxs(t.Fragment,{children:[i&&t.jsx("div",{style:{padding:"0 20px"},children:t.jsx(se,{currentTime:E,duration:g,onSeek:z,buffered:de})}),t.jsxs("div",{style:{...w.controls,height:o?"auto":"48px",gap:"8px",flexDirection:"row",flexWrap:o?"wrap":"nowrap",justifyContent:o?"center":w.controls.justifyContent,padding:o?"6px 12px 8px":w.controls.padding},className:"player-controls",children:[t.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:o?"10px":"12px",letterSpacing:"1px",display:"flex",gap:"2px",minWidth:o?"auto":"160px",background:"rgba(0,0,0,0.3)",padding:o?"3px 8px":"4px 10px",borderRadius:"4px",border:"1px solid rgba(117,170,219,0.06)",...o?{alignSelf:"center"}:{}},children:[t.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:P(E).slice(0,8)}),t.jsxs("span",{style:{color:"rgba(117,170,219,0.4)"},children:[":",P(E).slice(9)]}),t.jsx("span",{style:{color:"#1e293b",margin:"0 4px"},children:"/"}),t.jsx("span",{style:{color:"#475569"},children:P(g)})]}),t.jsxs("div",{style:{...o?{display:"flex",alignItems:"center",gap:"8px",justifyContent:"center"}:{position:"absolute",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"6px"}},children:[!o&&t.jsx("button",{onClick:()=>H(!1),className:"ctrl-btn",style:w.ghost,title:"Prev frame (,)",children:t.jsx(m,{i:"first_page",s:16,c:"#475569"})}),t.jsx("button",{onClick:()=>_(-5),className:"ctrl-btn",style:{...w.ghost,minWidth:"44px",minHeight:"44px"},title:"Skip -5s (←)",children:t.jsx(m,{i:"skip_previous",s:20,c:"#94a3b8"})}),t.jsx("button",{onClick:T,className:"play-glow",style:{...w.ghost,width:o?"48px":"40px",height:o?"48px":"40px",borderRadius:"50%",background:s?"rgba(117,170,219,0.2)":"rgba(117,170,219,0.12)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:s?"0 0 12px rgba(117,170,219,0.2)":"none"},title:`${s?"Pause":"Play"} (Space)`,children:t.jsx(m,{i:s?"pause":"play_arrow",s:28,c:"white"})}),t.jsx("button",{onClick:()=>_(5),className:"ctrl-btn",style:{...w.ghost,minWidth:"44px",minHeight:"44px"},title:"Skip +5s (→)",children:t.jsx(m,{i:"skip_next",s:20,c:"#94a3b8"})}),!o&&t.jsx("button",{onClick:()=>H(!0),className:"ctrl-btn",style:w.ghost,title:"Next frame (.)",children:t.jsx(m,{i:"last_page",s:16,c:"#475569"})})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",...o?{display:"none"}:{}},children:[t.jsx(oe,{volume:V,onChange:Y,muted:A,onToggleMute:()=>ee(e=>!e)}),t.jsx(ie,{speed:D,onChange:ce}),!o&&t.jsx("button",{onClick:he,className:"chip-btn",title:"Fit mode",children:ae[f]}),!o&&t.jsx("button",{onClick:Z,className:"ctrl-btn",style:w.ghost,title:"Picture-in-Picture (P)",children:t.jsx(m,{i:"picture_in_picture_alt",s:16,c:"#475569"})}),!o&&t.jsx("button",{onClick:Q,className:"ctrl-btn",style:w.ghost,title:"Fullscreen (F)",children:t.jsx(m,{i:"fullscreen",s:17,c:"#94a3b8"})})]})]})]})]})},Te=a.memo(we);export{Te as default};
