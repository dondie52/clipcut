const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CrfglaGM.js","assets/DwQPoapS.js","assets/Bs4D8IiQ.js","assets/BiOOe6d0.js","assets/C_8A2FPv.js","assets/Et-wlZO3.js","assets/Dk4fqct5.js","assets/DC8NrX4F.js","assets/BNd_FQTt.js","assets/B9CjrYEi.js","assets/CrFPy8FH.js","assets/GKAQJs9V.js","assets/BILFwcap.js","assets/DdaVbrfR.js","assets/CSuI3zoG.js","assets/BgHjUAIe.js","assets/aaj-9r0D.js","assets/BO0ukjiE.js","assets/6xOTzy-T.js","assets/BdtSec7t.js","assets/NmJ0LkB4.js","assets/nC6F-R4N.js","assets/ChSpSz5O.js","assets/BEUlQjCE.js","assets/Dh0lx4MY.js","assets/DPwd7N4p.js","assets/BJfvJ-n2.js","assets/B2nv5XjD.js"])))=>i.map(i=>d[i]);
import{g as oa,a as Pt,u as tn,D as an,_ as Be,e as Ut,E as mt,A as on,T as Va,f as Ka,r as nn}from"./BiOOe6d0.js";import{r as a,j as e,a as rn,u as sn}from"./DwQPoapS.js";import{f as xo}from"./Et-wlZO3.js";import{u as Ca,a as ln}from"./Dk4fqct5.js";import{i as yo,l as Ye,w as De,e as Ge,r as Ke,t as He,c as qe,s as Je,a as Xe,b as ha,d as cn,f as dn,g as un,h as pn,m as mn,j as fn,E as na,k as hn,n as bn,o as gn,p as xn,q as yn,u as wn,v as vn,R as wo,x as kn,y as Sn,z as jn,A as Cn}from"./DC8NrX4F.js";import{c as Nt,b as Ha,e as Tn,f as St,s as Jt,r as In,g as vo,h as Ya}from"./BNd_FQTt.js";import{v as Rn}from"./Bs4D8IiQ.js";import{getWorkerUrl as Mn}from"./CrFPy8FH.js";const Te=a.memo(({i:t,s:o=18,c:i="currentColor",style:n={},filled:s=!1,weight:l=400,...d})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:`${o}px`,color:i,fontVariationSettings:`'FILL' ${s?1:0}, 'wght' ${l}`,transition:"color 0.15s ease",userSelect:"none",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center",...n},"aria-hidden":"true",...d,children:t}));Te.displayName="Icon";const En=`
  .ghost-btn {
    transition: all 0.15s ease;
  }
  
  .ghost-btn:hover {
    background: rgba(255, 255, 255, 0.08) !important;
  }
  
  .ghost-btn:active {
    transform: scale(0.95);
  }
  
  .ghost-btn:focus-visible {
    outline: 2px solid #75aadb;
    outline-offset: 2px;
  }
`,aa=a.memo(({i:t,onClick:o,style:i={},title:n,disabled:s=!1,size:l=18,color:d="#64748b",hoverColor:f="#94a3b8",...b})=>{const[p,x]=a.useState(!1),w=a.useCallback(T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),o?.())},[o]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:En}),e.jsx("button",{className:"ghost-btn",style:{background:"none",border:"none",cursor:s?"not-allowed":"pointer",padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",opacity:s?.5:1,...i},onClick:s?void 0:o,onKeyDown:w,onMouseEnter:()=>x(!0),onMouseLeave:()=>x(!1),disabled:s,title:n,"aria-label":b["aria-label"]||n,...b,children:e.jsx(Te,{i:t,s:l,c:p&&!s?f:d})})]})});aa.displayName="GhostBtn";const et={root:{width:"100%",maxWidth:"100vw",minWidth:0,minHeight:0,height:"100vh",display:"flex",flexDirection:"column",background:"var(--color-bg-dark, #08090c)",color:"var(--color-text-primary, #f1f5f9)",overflow:"hidden",fontFamily:"'Spline Sans', sans-serif"},ghost:{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all var(--transition-normal, 0.15s ease)"},topBar:{height:"42px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",flexShrink:0,position:"relative",zIndex:3e3},titleInput:{position:"absolute",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid transparent",outline:"none",textAlign:"center",fontSize:"12px",fontWeight:500,color:"#cbd5e1",width:"220px",padding:"5px 14px",borderRadius:"4px",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease"},exportBtn:{marginLeft:"6px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"#0a0a0a",padding:"7px 22px",borderRadius:"6px",fontSize:"11px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.25)",letterSpacing:"0.3px",textTransform:"uppercase"},toolbar:{height:"46px",background:"#0e1218",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",padding:"0 8px",gap:0,flexShrink:0},leftPanel:{width:"280px",minWidth:0,maxWidth:"100%",borderRight:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},importBtn:{width:"100%",background:"rgba(117, 170, 219, 0.03)",border:"1.5px dashed rgba(117, 170, 219, 0.15)",borderRadius:"8px",padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",cursor:"pointer",position:"relative",fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all 0.15s ease"},rightPanel:{width:"320px",minWidth:0,maxWidth:"100%",borderLeft:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},controls:{height:"52px",background:"linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",borderTop:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"relative"},timeline:{flex:"0 0 auto",height:"280px",background:"#08090c",borderTop:"2px solid rgba(117, 170, 219, 0.1)",display:"flex",flexDirection:"column",minHeight:"120px",overflow:"hidden",position:"relative",zIndex:10},tlToolbar:{height:"38px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}},_n=`
  /* Mobile: stack layout vertically, hide side panels */
  @media (max-width: 768px) {
    /* Prevent horizontal scroll */
    body, #root { overflow-x: hidden; max-width: 100vw; }

    /* Touch-friendly minimum targets */
    button, a, [role="button"] { min-height: 44px; min-width: 44px; }

    /* Prevent iOS zoom on input focus */
    input, select, textarea { font-size: 16px !important; }

    /* Timeline: clip height fits mobile track containers */
    .timeline-clip { min-height: 40px !important; height: 40px !important; top: 4px !important; }

    /* Resize handles: wider on touch */
    .resize-handle { min-width: 18px !important; }

    /* Inspector as bottom sheet overlay */
    .inspector-mobile-drawer {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      max-height: 60vh;
      z-index: 3100;
      background: #0e1218;
      border-top: 2px solid rgba(117, 170, 219, 0.15);
      border-radius: 12px 12px 0 0;
      overflow-y: auto;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      -webkit-overflow-scrolling: touch;
    }
    .inspector-mobile-drawer.open {
      transform: translateY(0);
    }
    .inspector-mobile-drawer .drawer-handle {
      width: 36px; height: 4px;
      background: rgba(255,255,255,0.2);
      border-radius: 2px;
      margin: 8px auto;
    }

    /* Mobile tab bar (editor bottom) — scrollable for 8 tabs */
    .mobile-tab-bar {
      position: fixed; bottom: 0; left: 0; right: 0;
      height: 56px; background: #0e1218;
      border-top: 1px solid rgba(117,170,219,0.1);
      display: flex; align-items: center;
      z-index: 3000;
      padding-bottom: env(safe-area-inset-bottom, 0);
      overflow-x: auto; overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .mobile-tab-bar::-webkit-scrollbar { display: none; }
    .mobile-tab-bar button {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      background: none; border: none; color: rgba(255,255,255,0.4);
      font-size: 9px; font-weight: 600; font-family: 'Spline Sans', sans-serif;
      cursor: pointer; padding: 6px 8px; min-height: 44px; min-width: 56px;
      transition: color 0.15s ease; flex: 0 0 auto;
    }
    .mobile-tab-bar button.active { color: #75AADB; }
    .mobile-tab-bar button .material-symbols-outlined { font-size: 22px; }

    /* Mobile bottom sheet (slides up above tab bar) */
    .mobile-bottom-sheet {
      position: fixed; bottom: 56px; left: 0; right: 0;
      max-height: 55vh; z-index: 2900;
      background: #0e1218;
      border-top: 2px solid rgba(117,170,219,0.15);
      border-radius: 12px 12px 0 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .mobile-bottom-sheet.open { transform: translateY(0); }
    .mobile-bottom-sheet .sheet-handle {
      width: 36px; height: 4px;
      background: rgba(255,255,255,0.2);
      border-radius: 2px; margin: 8px auto;
    }

    /* Backdrop behind bottom sheet */
    .mobile-sheet-backdrop {
      position: fixed; inset: 0; bottom: 56px;
      background: rgba(0,0,0,0.4); z-index: 2800;
    }

    /* Toolbar scrollable on mobile */
    nav[role="tablist"]::-webkit-scrollbar { display: none; }

    /* Timeline touch support */
    .timeline-track-area { touch-action: pan-x pan-y; }

    /* Hide any floating help / "?" button on mobile so it cannot cover the
       Filters / AI tabs in the bottom or right toolbar. Matches common
       help-button patterns; harmless if no such element exists. */
    [aria-label*="help" i]:not(a):not(input),
    [aria-label*="keyboard shortcut" i],
    [data-testid*="help" i],
    .help-button,
    .help-fab,
    button[title="Help" i],
    button[title*="Keyboard shortcut" i] {
      display: none !important;
    }
  }

  /* Mobile landscape: side-by-side layout. Tab bar lives as a vertical
     44px right-edge sidebar. With 8 tools we need every button to fit
     without scrolling so Filters / AI never slide off-screen. Using
     top: 44px to clear the top bar (instead of padding-top) + 36px
     min-height per button + icon-only labels = 332px total, fits on
     all common landscape viewports down to 360px tall. */
  @media (max-width: 768px) and (orientation: landscape) {
    .mobile-tab-bar {
      position: fixed; right: 0; top: 44px; bottom: 0;
      left: auto;
      width: 44px; height: auto;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 0;
      padding-bottom: env(safe-area-inset-bottom, 0);
      border-top: none;
      border-left: 1px solid rgba(117,170,219,0.1);
      overflow-y: auto; overflow-x: hidden;
    }
    .mobile-tab-bar button {
      min-width: 44px; min-height: 36px;
      padding: 4px 2px;
    }
    .mobile-tab-bar button span:last-child {
      display: none; /* icon-only in landscape; aria-label keeps a11y */
    }
  }

  /* Tablet / narrow desktop: panel widths are driven in VideoEditor (viewport-aware caps + inline wrapper width). */
`,it=[{id:"media",icon:"folder_open",label:"Media"},{id:"audio",icon:"music_note",label:"Audio"},{id:"text",icon:"text_fields",label:"Text"},{id:"captions",icon:"closed_caption",label:"Captions"},{id:"stickers",icon:"mood",label:"Stickers"},{id:"effects",icon:"auto_fix_high",label:"Effects"},{id:"transition",icon:"layers",label:"Transition"},{id:"filters",icon:"filter_list",label:"Filters"}],An={PLAY_PAUSE:{key:"Space",description:"Play/Pause"},SKIP_FORWARD:{key:"ArrowRight",description:"Skip forward 5s"},SKIP_BACKWARD:{key:"ArrowLeft",description:"Skip backward 5s"},SKIP_FORWARD_LARGE:{key:"Shift+ArrowRight",description:"Skip forward 10s"},SKIP_BACKWARD_LARGE:{key:"Shift+ArrowLeft",description:"Skip backward 10s"},FRAME_FORWARD:{key:".",description:"Next frame"},FRAME_BACKWARD:{key:",",description:"Previous frame"},GO_TO_START:{key:"Home",description:"Go to start"},GO_TO_END:{key:"End",description:"Go to end"},SPLIT:{key:"S",description:"Split at playhead"},DELETE:{key:"Delete",description:"Delete selected"},DESELECT:{key:"Escape",description:"Deselect"},MUTE:{key:"M",description:"Mute/Unmute"},VOLUME_UP:{key:"ArrowUp",description:"Volume up"},VOLUME_DOWN:{key:"ArrowDown",description:"Volume down"},FULLSCREEN:{key:"F",description:"Toggle fullscreen"},SAVE:{key:"Ctrl+S",description:"Save project"},EXPORT:{key:"Ctrl+E",description:"Export video"},IMPORT:{key:"Ctrl+I",description:"Import media"},TOOLBAR_1:{key:"1",description:"Media panel"},TOOLBAR_2:{key:"2",description:"Audio panel"},TOOLBAR_3:{key:"3",description:"Text panel"},TOOLBAR_4:{key:"4",description:"Stickers panel"},TOOLBAR_5:{key:"5",description:"Effects panel"},TOOLBAR_6:{key:"6",description:"Transitions panel"},TOOLBAR_7:{key:"7",description:"Filters panel"}},Pn=`
  .cs::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .cs::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .cs::-webkit-scrollbar-thumb {
    background: #2b3136;
    border-radius: 10px;
    transition: background 0.15s ease;
  }
  
  .cs::-webkit-scrollbar-thumb:hover {
    background: #75aadb;
  }
  
  .cs::-webkit-scrollbar-corner {
    background: transparent;
  }
`,ba={volume:1,isMuted:!1,speed:1,rotation:0,opacity:1,positionX:0,positionY:0,scale:1,brightness:0,contrast:0,saturation:1,temperature:0,filterName:null,filterStrength:50,effects:[],fadeIn:0,fadeOut:0,track:0,trimStart:0,trimEnd:0,colorGrading:{shadows:"#1a1a2e",midtones:"#4a4a5e",highlights:"#ffffff"},transition:null,transitionDuration:1,text:"",textColor:"#ffffff",textSize:48,textPosition:"bottom-center",textBgColor:"",textBold:!1,textItalic:!1,textUnderline:!1,textAlign:"center",textFontFamily:"Spline Sans",textStartTime:0,textDuration:0,textX:null,textY:null},Un=[{name:"None",filter:null,css:null},{name:"90s",filter:"colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8",css:"sepia(0.3) saturate(0.8)"},{name:"Vintage",filter:"eq=saturation=0.6:brightness=0.05",css:"sepia(0.4) saturate(0.6) brightness(1.05)"},{name:"Cinema",filter:"eq=contrast=1.2:brightness=-0.05:saturation=1.1",css:"contrast(1.2) brightness(0.95) saturate(1.1)"},{name:"B&W",filter:"eq=saturation=0",css:"grayscale(1)"},{name:"Warm",filter:"colortemperature=6500",css:"sepia(0.15) saturate(1.2)"},{name:"Cool",filter:"colortemperature=3500",css:"saturate(0.9) hue-rotate(10deg)"},{name:"Sepia",filter:"colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",css:"sepia(0.8)"}],ei=[{name:"Motion Blur",type:"blur",params:{radius:5},css:"blur(2px)",icon:"blur_on"},{name:"Sharpen",type:"sharpen",params:{strength:1},css:"contrast(1.1)",icon:"deblur"},{name:"Vignette",type:"vignette",params:{},css:null,icon:"vignette"},{name:"Gaussian Blur",type:"blur",params:{radius:10},css:"blur(4px)",icon:"lens_blur"},{name:"Glitch",type:"glitch",params:{intensity:3},css:null,icon:"broken_image"},{name:"Zoom",type:"zoom",params:{factor:1.5},css:null,icon:"zoom_in"},{name:"Shake",type:"shake",params:{intensity:5},css:null,icon:"vibration"},{name:"Flash",type:"flash",params:{duration:.5},css:null,icon:"flash_on"}],ti=[{name:"Fade In",key:"fadeIn",value:1},{name:"Fade Out",key:"fadeOut",value:1},{name:"Scale Up",key:"scaleUp",value:!0},{name:"Slide Left",key:"slideLeft",value:!0}],ai=[{value:null,label:"None",icon:"block"},{value:"fade",label:"Fade",icon:"gradient"},{value:"fadeblack",label:"Fade Black",icon:"brightness_1"},{value:"fadewhite",label:"Fade White",icon:"brightness_7"},{value:"dissolve",label:"Dissolve",icon:"blur_on"},{value:"wipeleft",label:"Wipe Left",icon:"arrow_back"},{value:"wiperight",label:"Wipe Right",icon:"arrow_forward"},{value:"slideup",label:"Slide Up",icon:"arrow_upward"},{value:"slidedown",label:"Slide Down",icon:"arrow_downward"}],oi=[{value:"top-left",label:"Top Left",icon:"north_west"},{value:"top-center",label:"Top",icon:"north"},{value:"top-right",label:"Top Right",icon:"north_east"},{value:"center-left",label:"Left",icon:"west"},{value:"center",label:"Center",icon:"center_focus_strong"},{value:"center-right",label:"Right",icon:"east"},{value:"bottom-left",label:"Bottom Left",icon:"south_west"},{value:"bottom-center",label:"Bottom",icon:"south"},{value:"bottom-right",label:"Bottom Right",icon:"south_east"}],ni=[{emoji:"😀",label:"Grinning",category:"smileys"},{emoji:"😂",label:"Laughing",category:"smileys"},{emoji:"🥹",label:"Touched",category:"smileys"},{emoji:"😍",label:"Heart Eyes",category:"smileys"},{emoji:"🤩",label:"Star Struck",category:"smileys"},{emoji:"😎",label:"Cool",category:"smileys"},{emoji:"🥳",label:"Party",category:"smileys"},{emoji:"😱",label:"Shocked",category:"smileys"},{emoji:"🤔",label:"Thinking",category:"smileys"},{emoji:"😴",label:"Sleeping",category:"smileys"},{emoji:"👍",label:"Thumbs Up",category:"hands"},{emoji:"👎",label:"Thumbs Down",category:"hands"},{emoji:"👏",label:"Clap",category:"hands"},{emoji:"🙌",label:"Raised Hands",category:"hands"},{emoji:"🤝",label:"Handshake",category:"hands"},{emoji:"✌️",label:"Peace",category:"hands"},{emoji:"🤞",label:"Fingers Crossed",category:"hands"},{emoji:"💪",label:"Strong",category:"hands"},{emoji:"❤️",label:"Heart",category:"symbols"},{emoji:"🔥",label:"Fire",category:"symbols"},{emoji:"⭐",label:"Star",category:"symbols"},{emoji:"💯",label:"100",category:"symbols"},{emoji:"✨",label:"Sparkles",category:"symbols"},{emoji:"💥",label:"Boom",category:"symbols"},{emoji:"🎯",label:"Target",category:"symbols"},{emoji:"⚡",label:"Lightning",category:"symbols"},{emoji:"🚀",label:"Rocket",category:"symbols"},{emoji:"💎",label:"Diamond",category:"symbols"},{emoji:"🎬",label:"Clapper",category:"objects"},{emoji:"🎵",label:"Music",category:"objects"},{emoji:"🎤",label:"Mic",category:"objects"},{emoji:"📸",label:"Camera",category:"objects"},{emoji:"🎮",label:"Gaming",category:"objects"},{emoji:"🏆",label:"Trophy",category:"objects"},{emoji:"🎁",label:"Gift",category:"objects"},{emoji:"💡",label:"Idea",category:"objects"},{emoji:"👆",label:"Point Up",category:"arrows"},{emoji:"👇",label:"Point Down",category:"arrows"},{emoji:"👈",label:"Point Left",category:"arrows"},{emoji:"👉",label:"Point Right",category:"arrows"},{emoji:"⬆️",label:"Arrow Up",category:"arrows"},{emoji:"⬇️",label:"Arrow Down",category:"arrows"},{emoji:"🔔",label:"Bell",category:"objects"},{emoji:"💬",label:"Speech",category:"objects"},{emoji:"🏷️",label:"Tag",category:"objects"},{emoji:"📌",label:"Pin",category:"objects"}],ri=[{name:"Title",textSize:64,textColor:"#ffffff",textPosition:"center",textBgColor:"",textBold:!0,textAlign:"center",icon:"title"},{name:"Subtitle",textSize:36,textColor:"#e2e8f0",textPosition:"bottom-center",textBgColor:"",textBold:!1,textAlign:"center",icon:"subtitles"},{name:"Caption",textSize:24,textColor:"#ffffff",textPosition:"bottom-center",textBgColor:"#000000",textBold:!1,textAlign:"center",icon:"closed_caption"},{name:"Lower Third",textSize:28,textColor:"#ffffff",textPosition:"bottom-left",textBgColor:"rgba(0,0,0,0.7)",textBold:!0,textAlign:"left",icon:"video_label"}],ii=["Spline Sans","Arial","Georgia","Courier New","Impact","Comic Sans MS","Trebuchet MS","Verdana","Times New Roman"],si=[{label:"0.25x",value:.25},{label:"0.5x",value:.5},{label:"1x",value:1},{label:"1.5x",value:1.5},{label:"2x",value:2}];function Ln(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}function Nn(){if(typeof navigator>"u")return!1;const t=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(t)?!0:navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1}const Ta=`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes hud-led-pulse {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 1; }
  }

  @keyframes hud-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes hud-tick {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.72); }
  }

  .export-modal-backdrop {
    animation: fadeIn 0.2s ease;
  }

  .export-modal-content {
    animation: slideUp 0.3s ease;
  }

  .export-btn {
    transition: all 0.15s ease;
  }

  .export-btn:hover:not(:disabled) {
    background: #5a8cbf !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(117, 170, 219, 0.3);
  }

  .export-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  .resolution-option {
    transition: all 0.15s ease;
  }

  .resolution-option:hover {
    background: rgba(117, 170, 219, 0.1) !important;
    border-color: rgba(117, 170, 219, 0.3) !important;
  }

  .title-input {
    transition: all 0.15s ease;
  }

  .title-input:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .title-input:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(117, 170, 219, 0.5);
  }

  /* ========== BROADCAST HUD EXPORT MODAL ========== */
  .hud-backdrop {
    position: fixed; inset: 0;
    background: rgba(3, 6, 12, 0.88);
    display: flex; align-items: center; justify-content: center;
    z-index: 3500;
    backdrop-filter: blur(6px) saturate(0.9);
    -webkit-backdrop-filter: blur(6px) saturate(0.9);
    animation: fadeIn 0.2s ease;
  }

  .hud-console {
    background: #080b11;
    border: 1px solid rgba(117,170,219,0.25);
    border-radius: 3px;
    width: 480px;
    max-width: 92vw;
    max-height: 88vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: #e4e8ef;
    font-family: 'Spline Sans', sans-serif;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.03) inset,
      0 32px 80px rgba(0,0,0,0.72),
      0 0 60px rgba(117,170,219,0.08);
    animation: slideUp 0.32s cubic-bezier(0.2, 0.7, 0.2, 1);
    position: relative;
  }

  /* subtle horizontal scan-line sheen on the console */
  .hud-console::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(117,170,219,0.6), transparent);
    animation: hud-scan 4s linear infinite;
    pointer-events: none;
    z-index: 2;
  }

  .hud-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: linear-gradient(180deg, #0b1018 0%, #080b11 100%);
    border-bottom: 1px solid rgba(117,170,219,0.18);
    flex-shrink: 0;
  }

  .hud-head-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .hud-head-led {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #75AADB;
    box-shadow: 0 0 10px rgba(117,170,219,0.8), inset 0 0 3px rgba(255,255,255,0.4);
    animation: hud-led-pulse 1.8s ease-in-out infinite;
    flex-shrink: 0;
  }
  .hud-head-led--amber { background: #f5b84e; box-shadow: 0 0 10px rgba(245,184,78,0.8), inset 0 0 3px rgba(255,255,255,0.4); }
  .hud-head-led--green { background: #6ec07a; box-shadow: 0 0 10px rgba(110,192,122,0.8), inset 0 0 3px rgba(255,255,255,0.4); animation: none; }

  .hud-head-title {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #cbd5e1;
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hud-head-title .sep { color: rgba(255,255,255,0.2); }
  .hud-head-title .ch-id { color: #75AADB; }

  .hud-head-close {
    width: 28px; height: 28px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
  }
  .hud-head-close:hover {
    background: rgba(239,68,68,0.1);
    color: #ef4444;
    border-color: rgba(239,68,68,0.3);
  }

  .hud-body {
    padding: 18px;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* ---- Section rows (label + content) ---- */
  .hud-row { display: flex; flex-direction: column; gap: 8px; }
  .hud-row-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .hud-label {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(117,170,219,0.65);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .hud-label::before {
    content: '';
    width: 14px;
    height: 1px;
    background: rgba(117,170,219,0.45);
    display: inline-block;
  }

  /* ---- Segmented control (format, tab, fps) ---- */
  .hud-segment {
    display: flex;
    gap: 0;
    background: #04060b;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
  }
  .hud-segment button {
    flex: 1;
    background: transparent;
    border: none;
    padding: 8px 10px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.42);
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;
    border-right: 1px solid rgba(255,255,255,0.06);
    text-transform: uppercase;
  }
  .hud-segment button:last-child { border-right: none; }
  .hud-segment button:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.03); }
  .hud-segment button.is-active {
    background: rgba(117,170,219,0.16);
    color: #75AADB;
    box-shadow: inset 0 -2px 0 #75AADB;
  }

  /* ---- Signal table (resolution / preset rows) ---- */
  .hud-table {
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
    background: #04060b;
  }
  .hud-row-item {
    display: grid;
    grid-template-columns: 18px 1fr auto auto;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: background 140ms ease;
    color: rgba(255,255,255,0.75);
  }
  .hud-row-item:last-child { border-bottom: none; }
  .hud-row-item:hover { background: rgba(117,170,219,0.05); }
  .hud-row-item.is-active {
    background: rgba(117,170,219,0.12);
    color: #ffffff;
  }

  .hud-row-led {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.2);
    box-sizing: border-box;
  }
  .hud-row-item.is-active .hud-row-led {
    background: #75AADB;
    border-color: #75AADB;
    box-shadow: 0 0 8px rgba(117,170,219,0.7);
  }

  .hud-row-name {
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: -0.005em;
  }
  .hud-row-item.is-active .hud-row-name { font-weight: 600; color: #fff; }

  .hud-row-spec {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.4);
    white-space: nowrap;
  }

  .hud-row-sub {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10px;
    color: rgba(255,255,255,0.34);
    letter-spacing: 0.04em;
    grid-column: 2 / 4;
    margin-top: 2px;
  }

  /* ---- Filename input ---- */
  .hud-input {
    width: 100%;
    background: #04060b;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    padding: 10px 12px;
    color: #ffffff;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 12px;
    letter-spacing: 0.02em;
    outline: none;
    transition: border-color 160ms ease, background 160ms ease;
    box-sizing: border-box;
  }
  .hud-input::placeholder { color: rgba(255,255,255,0.22); }
  .hud-input:focus {
    border-color: #75AADB;
    background: #060a12;
    box-shadow: 0 0 0 2px rgba(117,170,219,0.12);
  }

  /* ---- Summary / status strip ---- */
  .hud-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    background: rgba(117,170,219,0.06);
    border: 1px solid rgba(117,170,219,0.22);
    border-radius: 2px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  }
  .hud-summary-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #75AADB;
    box-shadow: 0 0 8px rgba(117,170,219,0.6);
    flex-shrink: 0;
  }
  .hud-summary-text {
    font-size: 11px;
    color: #75AADB;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .hud-summary-note {
    font-size: 10.5px;
    color: rgba(255,255,255,0.42);
    margin-top: 3px;
    letter-spacing: 0.02em;
    line-height: 1.45;
    font-family: 'Spline Sans', sans-serif;
    text-transform: none;
    font-weight: 400;
  }
  .hud-summary-note--warn { color: #f5b84e; }

  /* ---- Footer button row ---- */
  .hud-actions {
    display: flex;
    gap: 10px;
    padding: 14px 18px;
    border-top: 1px solid rgba(255,255,255,0.06);
    background: #04060b;
    flex-shrink: 0;
  }

  .hud-btn {
    padding: 11px 18px;
    border-radius: 2px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid transparent;
    transition: background 160ms ease, box-shadow 220ms ease, transform 120ms ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .hud-btn--primary {
    background: #75AADB;
    color: #04060b;
    flex: 1;
    box-shadow: inset 0 -2px 0 rgba(0,0,0,0.25), 0 0 0 1px rgba(117,170,219,0.5);
  }
  .hud-btn--primary:hover {
    background: #8bbae3;
    box-shadow: inset 0 -2px 0 rgba(0,0,0,0.25), 0 0 0 1px #8bbae3, 0 10px 28px rgba(117,170,219,0.35);
  }
  .hud-btn--primary:active { transform: translateY(1px); }

  .hud-btn--ghost {
    background: transparent;
    color: rgba(255,255,255,0.55);
    border-color: rgba(255,255,255,0.1);
  }
  .hud-btn--ghost:hover {
    background: rgba(255,255,255,0.04);
    color: #fff;
    border-color: rgba(255,255,255,0.2);
  }

  .hud-btn--danger {
    background: transparent;
    color: #ef4444;
    border-color: rgba(239,68,68,0.3);
  }
  .hud-btn--danger:hover {
    background: rgba(239,68,68,0.1);
    border-color: #ef4444;
  }

  /* ---- Progress state ---- */
  .hud-progress {
    padding: 8px 4px 12px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .hud-big-readout {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 64px;
    font-weight: 500;
    line-height: 1;
    color: #75AADB;
    text-align: center;
    letter-spacing: -0.03em;
    text-shadow: 0 0 24px rgba(117,170,219,0.35);
    font-variant-numeric: tabular-nums;
  }
  .hud-big-readout .pct {
    font-size: 28px;
    color: rgba(117,170,219,0.55);
    margin-left: 4px;
  }

  .hud-op-label {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.72);
    text-align: center;
  }
  .hud-op-sub {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 10.5px;
    color: rgba(255,255,255,0.42);
    text-align: center;
    letter-spacing: 0.04em;
    margin-top: 4px;
  }

  /* Film-strip progress bar with sprocket holes */
  .hud-filmstrip {
    position: relative;
    height: 26px;
    background: #02040a;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
  }
  .hud-filmstrip-fill {
    position: absolute;
    inset: 0;
    width: 0;
    background: linear-gradient(90deg, #4a7fb5 0%, #75AADB 60%, #8bbae3 100%);
    transition: width 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 0 24px rgba(117,170,219,0.35);
  }
  .hud-filmstrip-fill::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; width: 2px;
    background: #ffffff;
    opacity: 0.5;
    box-shadow: 0 0 12px rgba(255,255,255,0.7);
  }
  .hud-filmstrip-perf {
    position: absolute;
    left: 0; right: 0;
    height: 5px;
    display: flex;
    pointer-events: none;
    z-index: 2;
  }
  .hud-filmstrip-perf--top    { top: 0;    background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent); }
  .hud-filmstrip-perf--bottom { bottom: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); }
  .hud-filmstrip-perf > span {
    flex: 1;
    margin: 1px 3px;
    background: rgba(255,255,255,0.4);
    border-radius: 1px;
    animation: hud-tick 1.6s ease-in-out infinite;
    transform-origin: center;
  }

  .hud-telemetry {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    background: #04060b;
  }
  .hud-telemetry-cell {
    padding: 10px 12px;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .hud-telemetry-cell:last-child { border-right: none; }
  .hud-telemetry-label {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }
  .hud-telemetry-value {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 13px;
    color: #e4e8ef;
    font-weight: 500;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }

  /* ---- Complete state ---- */
  .hud-complete {
    padding: 24px 8px 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  .hud-complete-stamp {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    border: 1px solid rgba(110, 192, 122, 0.4);
    background: rgba(110, 192, 122, 0.08);
    border-radius: 2px;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6ec07a;
  }
  .hud-complete-stamp .led {
    width: 8px; height: 8px; border-radius: 50%;
    background: #6ec07a;
    box-shadow: 0 0 10px rgba(110,192,122,0.75);
  }
  .hud-complete-title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin: 6px 0 0;
  }
  .hud-complete-file {
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.04em;
  }
  
  .menu-btn {
    transition: all 0.15s ease;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .menu-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white !important;
  }
  
  .logo-container {
    transition: transform 0.15s ease;
  }

  .logo-container:hover {
    transform: scale(1.02);
  }

  .menu-dropdown {
    animation: fadeIn 0.12s ease;
  }

  .menu-dropdown-item {
    transition: background 0.1s ease;
  }

  .menu-dropdown-item:hover {
    background: rgba(117, 170, 219, 0.12) !important;
  }

  .shortcuts-modal-backdrop {
    animation: fadeIn 0.2s ease;
  }

  .shortcuts-modal-content {
    animation: slideUp 0.3s ease;
  }

  .shortcut-key {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 11px;
    color: #cbd5e1;
    min-width: 24px;
    text-align: center;
  }
`,Xa=[{key:"low",label:"Low",crf:28},{key:"medium",label:"Medium",crf:23},{key:"high",label:"High",crf:18},{key:"ultra",label:"Ultra",crf:15}],$n=[{key:"webm",label:"WebM"},{key:"mp4",label:"MP4 (via server)"}],On=[24,30,60],Fn=a.memo(({items:t,selected:o,onSelect:i,style:n})=>e.jsx("div",{style:{display:"flex",gap:"4px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"3px",...n},children:t.map(s=>e.jsx("button",{onClick:()=>i(s.key||s),style:{flex:1,padding:"6px 8px",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",background:(s.key||s)===o?"rgba(117,170,219,0.15)":"transparent",color:(s.key||s)===o?"#75aadb":"#64748b"},children:s.label||s},s.key||s))}));Fn.displayName="PillGroup";const ko=a.memo(({isOpen:t,onClose:o,onExport:i,isExporting:n,progress:s,operationLabel:l="Processing",subMessage:d="",resolutions:f,exportPresets:b={},onCancel:p,projectName:x="Untitled",exportResult:w,onDownload:T,onExportAnother:X})=>{const[P,v]=a.useState("480p"),[K,H]=a.useState("resolution"),[me,q]=a.useState("youtube-1080p"),[ne,k]=a.useState("webm"),[Q,se]=a.useState("medium"),[N,z]=a.useState(30),[we,W]=a.useState(""),[Z,ge]=a.useState(null);a.useEffect(()=>{t&&!we&&W(Ln(x))},[t,x]);const E=Nn();if(a.useEffect(()=>{if(!t)return;const j=R=>{R.key==="Escape"&&!n&&o()};return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)},[t,n,o]),a.useEffect(()=>{if(!t)return;const R=document.getElementById("export-modal")?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');R?.length&&R[0].focus()},[t]),a.useEffect(()=>{if(!t)return;let j=!0;return ge(null),yo().then(R=>{j&&ge(!!R)}).catch(()=>{j&&ge(!1)}),()=>{j=!1}},[t]),!t)return null;const G=j=>{j.target===j.currentTarget&&!n&&!w&&o()};f?.[P];const Se=Xa.find(j=>j.key===Q),Ce=[ne.toUpperCase(),P,`${N}fps`],Ie=K==="platform"?b[me]?.label:Ce.join(" · "),de=()=>{const j=K==="platform"?`preset:${me}`:P;i(j,{format:ne,quality:Se?.crf,fps:N,filename:we||x})},ze=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hud-body",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Container · Codec"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Output format",children:$n.map(j=>e.jsx("button",{className:ne===j.key?"is-active":"",onClick:()=>k(j.key),role:"radio","aria-checked":ne===j.key,children:j.label},j.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Target"}),e.jsxs("div",{className:"hud-segment",role:"radiogroup","aria-label":"Target mode",children:[e.jsx("button",{className:K==="resolution"?"is-active":"",onClick:()=>H("resolution"),role:"radio","aria-checked":K==="resolution",children:"By Resolution"}),e.jsx("button",{className:K==="platform"?"is-active":"",onClick:()=>H("platform"),role:"radio","aria-checked":K==="platform",children:"By Platform"})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Signal"}),K==="resolution"?e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Resolution",children:Object.entries(f).map(([j,{label:R,width:V,height:S}])=>{const C=P===j;return e.jsxs("button",{className:`hud-row-item ${C?"is-active":""}`,onClick:()=>v(j),role:"radio","aria-checked":C,children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsx("span",{className:"hud-row-name",children:R}),e.jsxs("span",{className:"hud-row-spec",children:[V,"×",S]}),e.jsxs("span",{className:"hud-row-spec",style:{color:C?"#75AADB":"rgba(255,255,255,0.34)"},children:[Math.round(V*S/1e4)/100,"MP"]})]},j)})}):e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Platform",children:Object.entries(b).map(([j,R])=>{const V=me===j;return e.jsxs("button",{className:`hud-row-item ${V?"is-active":""}`,onClick:()=>q(j),role:"radio","aria-checked":V,style:{gridTemplateColumns:"18px 1fr auto"},children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsxs("span",{className:"hud-row-name",children:[R.label,e.jsx("span",{className:"hud-row-sub",style:{gridColumn:"unset",display:"block",marginTop:3},children:R.description})]}),e.jsxs("span",{className:"hud-row-spec",children:[R.width,"×",R.height]})]},j)})})]}),e.jsxs("div",{className:"hud-row-split",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Quality (CRF)"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Quality",children:Xa.map(j=>e.jsx("button",{className:Q===j.key?"is-active":"",onClick:()=>se(j.key),role:"radio","aria-checked":Q===j.key,title:`CRF ${j.crf}`,children:j.label},j.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Frame Rate"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Frame rate",children:On.map(j=>e.jsxs("button",{className:N===j?"is-active":"",onClick:()=>z(j),role:"radio","aria-checked":N===j,children:[j,"fps"]},j))})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Filename"}),e.jsx("input",{type:"text",className:"hud-input",value:we,onChange:j=>W(j.target.value),"aria-label":"Export filename",placeholder:"clipcut-export"})]}),e.jsxs("div",{className:"hud-summary",role:"status",children:[e.jsx("span",{className:"hud-summary-dot","aria-hidden":"true"}),e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsxs("div",{className:"hud-summary-text",children:["Ready · ",Ie]}),ne==="webm"&&!E&&e.jsx("div",{className:"hud-summary-note",children:"WebM plays on most devices. For iPhone Photos compatibility, choose MP4."}),ne==="webm"&&E&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead."}),ne==="mp4"&&e.jsxs("div",{className:"hud-summary-note hud-summary-note--warn",children:[Z==null&&"Checking MP4 server availability...",Z===!0&&"MP4 server is online. Export will render locally, then transcode to MP4 on server.",Z===!1&&"MP4 server is currently unavailable. Export will fall back to local WebM."]})]})]})]}),e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Cancel"}),e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:de,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Render · Export"]})]})]}),ve=()=>{const j=Math.max(0,Math.min(100,Math.round(s)));return e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-progress",children:[e.jsxs("div",{className:"hud-big-readout","aria-live":"polite","aria-atomic":"true",children:[String(j).padStart(2,"0"),e.jsx("span",{className:"pct",children:"%"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hud-op-label",children:l||"Rendering"}),d&&e.jsx("div",{className:"hud-op-sub",children:d})]}),e.jsxs("div",{className:"hud-filmstrip",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":j,children:[e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--top","aria-hidden":"true",children:Array.from({length:24}).map((R,V)=>e.jsx("span",{style:{animationDelay:`${(V*.05).toFixed(2)}s`}},V))}),e.jsx("div",{className:"hud-filmstrip-fill",style:{width:`${j}%`}}),e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--bottom","aria-hidden":"true",children:Array.from({length:24}).map((R,V)=>e.jsx("span",{style:{animationDelay:`${(V*.05+.1).toFixed(2)}s`}},V))})]}),e.jsxs("div",{className:"hud-telemetry","aria-label":"Telemetry",children:[e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Format"}),e.jsx("span",{className:"hud-telemetry-value",children:ne.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Signal"}),e.jsx("span",{className:"hud-telemetry-value",children:K==="platform"?b[me]?.label||"—":P.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Frame Rate"}),e.jsxs("span",{className:"hud-telemetry-value",children:[N,"fps"]})]})]})]})})},pe=()=>p?e.jsx("div",{className:"hud-actions",style:{justifyContent:"center"},children:e.jsx("button",{type:"button",className:"hud-btn hud-btn--danger",onClick:p,children:"Abort render"})}):null,ue=()=>e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-complete",children:[e.jsxs("div",{className:"hud-complete-stamp",children:[e.jsx("span",{className:"led","aria-hidden":"true"}),"Export complete · Signal locked"]}),e.jsx("h3",{className:"hud-complete-title",children:"Your file is ready."}),w?.size&&e.jsxs("span",{className:"hud-complete-file",children:[(w.size/(1024*1024)).toFixed(1)," MB · ",ne.toUpperCase()]})]})}),fe=()=>e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Close"}),X&&e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:X,children:"Export another"}),T&&e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:T,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Download"]})]}),ke=w?"hud-head-led hud-head-led--green":n?"hud-head-led hud-head-led--amber":"hud-head-led",Le=w?"Complete":n?"Rendering":"Standby";return e.jsxs("div",{className:"hud-backdrop",onClick:G,role:"dialog","aria-modal":"true","aria-labelledby":"export-modal-title",children:[e.jsx("style",{children:Ta}),e.jsxs("div",{id:"export-modal",className:"hud-console",children:[e.jsxs("div",{className:"hud-head",children:[e.jsxs("div",{className:"hud-head-left",children:[e.jsx("span",{className:ke,"aria-hidden":"true"}),e.jsxs("h2",{id:"export-modal-title",className:"hud-head-title",children:[e.jsx("span",{children:"CC · EXPORT"}),e.jsx("span",{className:"sep",children:"//"}),e.jsx("span",{className:"ch-id",children:Le.toUpperCase()})]})]}),!n&&!w&&e.jsx("button",{onClick:o,className:"hud-head-close","aria-label":"Close export dialog",title:"Close (Escape)",children:e.jsx(Te,{i:"close",s:16,c:"currentColor"})})]}),w?ue():n?ve():ze(),!n&&!w&&null,n&&pe(),w&&fe()]})]})});ko.displayName="ExportModal";const Bn={Playback:["PLAY_PAUSE","SKIP_FORWARD","SKIP_BACKWARD","SKIP_FORWARD_LARGE","SKIP_BACKWARD_LARGE","FRAME_FORWARD","FRAME_BACKWARD","GO_TO_START","GO_TO_END"],Editing:["SPLIT","DELETE","DESELECT"],Audio:["MUTE","VOLUME_UP","VOLUME_DOWN"],View:["FULLSCREEN"],File:["SAVE","EXPORT","IMPORT"]},So=a.memo(({isOpen:t,onClose:o})=>(a.useEffect(()=>{if(!t)return;const i=n=>{n.key==="Escape"&&o()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[t,o]),t?e.jsxs("div",{className:"shortcuts-modal-backdrop",onClick:i=>i.target===i.currentTarget&&o(),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3500,backdropFilter:"blur(4px)"},role:"dialog","aria-modal":"true","aria-labelledby":"shortcuts-modal-title",children:[e.jsx("style",{children:Ta}),e.jsxs("div",{className:"shortcuts-modal-content",style:{background:"#1a2332",borderRadius:"12px",padding:"24px",width:"520px",maxWidth:"90vw",maxHeight:"80vh",overflow:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[e.jsxs("h2",{id:"shortcuts-modal-title",style:{margin:0,fontSize:"18px",fontWeight:600,color:"white",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Te,{i:"keyboard",s:22,c:"#75aadb"}),"Keyboard Shortcuts"]}),e.jsx("button",{onClick:o,style:{...et.ghost,padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":"Close shortcuts dialog",children:e.jsx(Te,{i:"close",s:20,c:"#94a3b8"})})]}),Object.entries(Bn).map(([i,n])=>e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{fontSize:"11px",color:"#75aadb",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,margin:"0 0 10px 0"},children:i}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:n.map(s=>{const l=An[s];return l?e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:"6px",background:"rgba(255,255,255,0.02)"},children:[e.jsx("span",{style:{fontSize:"13px",color:"#cbd5e1"},children:l.description}),e.jsx("span",{className:"shortcut-key",children:l.key})]},s):null})})]},i))]})]}):null));So.displayName="KeyboardShortcutsModal";const Dn=[{id:"new",icon:"add",label:"New Project",shortcut:null},{id:"save",icon:"save",label:"Save",shortcut:"Ctrl+S"},{id:"divider1"},{id:"export",icon:"download",label:"Export",shortcut:"Ctrl+E"},{id:"divider2"},{id:"settings",icon:"settings",label:"Settings",shortcut:null}],jo=a.memo(({isOpen:t,onClose:o,onNewProject:i,onSave:n,onExport:s,onSettings:l,hasMediaToExport:d})=>{const f=a.useRef(null);if(a.useEffect(()=>{if(!t)return;const p=w=>{f.current&&!f.current.contains(w.target)&&o()},x=w=>{w.key==="Escape"&&o()};return requestAnimationFrame(()=>{document.addEventListener("mousedown",p),document.addEventListener("keydown",x)}),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",x)}},[t,o]),!t)return null;const b=p=>{switch(o(),p){case"new":i?.();break;case"save":n?.();break;case"export":d&&s?.();break;case"settings":l?.();break}};return e.jsx("div",{ref:f,className:"menu-dropdown",role:"menu",style:{position:"absolute",top:"100%",left:0,marginTop:"4px",background:"#1a2332",borderRadius:"8px",padding:"4px",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",minWidth:"200px",zIndex:100},children:Dn.map(p=>{if(p.id.startsWith("divider"))return e.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0"}},p.id);const x=p.id==="export"&&!d;return e.jsxs("button",{className:"menu-dropdown-item",role:"menuitem",onClick:()=>!x&&b(p.id),style:{...et.ghost,display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"6px",width:"100%",textAlign:"left",color:x?"#475569":"#cbd5e1",cursor:x?"not-allowed":"pointer",opacity:x?.5:1,fontSize:"13px",fontFamily:"'Spline Sans', sans-serif"},disabled:x,children:[e.jsx(Te,{i:p.icon,s:16,c:x?"#475569":"#94a3b8"}),e.jsx("span",{style:{flex:1},children:p.label}),p.shortcut&&e.jsx("span",{style:{fontSize:"11px",color:"#475569",fontFamily:"'SF Mono', Monaco, monospace"},children:p.shortcut})]},p.id)})})});jo.displayName="MenuDropdown";const zn=({projectName:t,onProjectNameChange:o,onExport:i,isExporting:n=!1,exportProgress:s=0,currentOperation:l="",hasMediaToExport:d=!1,resolutions:f={},exportPresets:b={},lastSaved:p=null,canUndo:x=!1,canRedo:w=!1,onUndo:T,onRedo:X,onCancelExport:P,exportSubMessage:v="",onNewProject:K,onSave:H,onSettings:me,editorLayout:q="default",onLayoutChange:ne,forceOpenExport:k=!1,onExportModalClosed:Q,onAiToggle:se,aiPanelOpen:N=!1})=>{const z=Ca(),[we,W]=a.useState(!1),[Z,ge]=a.useState(!1),[E,G]=a.useState(!1),[Se,Ce]=a.useState(!1),Ie=a.useRef(null);a.useEffect(()=>{const R=V=>{V.target.tagName==="INPUT"||V.target.tagName==="TEXTAREA"||(V.key==="?"||V.shiftKey&&V.key==="/")&&(V.preventDefault(),Ce(S=>!S))};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[]),a.useEffect(()=>{k&&d&&!n&&(W(!0),Q?.())},[k,d,n,Q]);const de=a.useCallback(()=>{n||(d?W(!0):console.warn("Export not available:",{hasMediaToExport:d,isExporting:n}))},[d,n]),ze=a.useCallback((R,V)=>{i?.(R,V)},[i]),ve=a.useCallback(()=>{n||(W(!1),ke(null))},[n]),pe=a.useCallback(R=>{const V=xo(R.target.value,{maxLength:100});o(V)},[o]),ue=a.useCallback(R=>{(R.key==="Enter"||R.key==="Escape")&&R.target.blur()},[]),[fe,ke]=a.useState(null);a.useEffect(()=>{!n&&s>=100&&we&&!fe&&ke({size:null}),we||ke(null)},[n,s,we,fe]);const[Le,j]=a.useState("");return a.useEffect(()=>{const R=()=>{j(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}))};R();const V=setInterval(R,6e4);return()=>clearInterval(V)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ta}),e.jsxs("header",{style:{...et.topBar,...z?{height:"44px",padding:"0 10px"}:{}},role:"banner","aria-label":"ClipCut editor header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsxs("div",{className:"logo-container",style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},role:"img","aria-label":"ClipCut logo",children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(117, 170, 219, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Te,{i:"movie_edit",s:18,c:"#75aadb"})}),!z&&e.jsx("span",{style:{fontWeight:700,fontSize:"15px",letterSpacing:"-0.3px",color:"white"},children:"ClipCut"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginLeft:"8px",fontSize:"11px"},children:[e.jsxs("div",{ref:Ie,style:{position:"relative"},children:[e.jsx("button",{className:"menu-btn",onClick:()=>G(R=>!R),style:{...et.ghost,display:"flex",alignItems:"center",gap:"2px",color:E?"#75aadb":"#94a3b8"},"aria-haspopup":"menu","aria-expanded":E,"aria-label":"Open menu",children:z?e.jsx(Te,{i:"menu",s:18}):e.jsxs(e.Fragment,{children:["Menu ",e.jsx(Te,{i:"arrow_drop_down",s:16})]})}),e.jsx(jo,{isOpen:E,onClose:()=>G(!1),onNewProject:K,onSave:H,onExport:de,onSettings:me,hasMediaToExport:d})]}),!z&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("button",{onClick:T,disabled:!x,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:x?1:.4,cursor:x?"pointer":"not-allowed"},title:"Undo (Ctrl+Z)","aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:14,c:x?"#94a3b8":"#475569"})}),e.jsx("button",{onClick:X,disabled:!w,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:w?1:.4,cursor:w?"pointer":"not-allowed"},title:"Redo (Ctrl+Shift+Z or Ctrl+Y)","aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:14,c:w?"#94a3b8":"#475569"})})]}),!z&&p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Last saved at ${p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}`,title:`Last saved: ${p.toLocaleString()}`,children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Saved ",p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]}),!z&&!p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":"Auto save at current time",children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Auto save at ",Le]})]})]}),e.jsx("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:e.jsx("input",{type:"text",value:t,onChange:pe,onFocus:()=>ge(!0),onBlur:()=>ge(!1),onKeyDown:ue,className:"title-input",style:{...et.titleInput,position:"relative",left:"auto",transform:"none",border:"1px solid transparent",width:z?"120px":"220px",pointerEvents:"auto"},"aria-label":"Project name",title:"Click to edit project name"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:z?"4px":"8px"},children:[se&&e.jsx(aa,{i:"auto_awesome",title:"AI Editor","aria-label":N?"Close AI editor":"Open AI editor",onClick:se,style:N?{color:"#75aadb",background:"rgba(117,170,219,0.12)"}:void 0}),!z&&e.jsx(aa,{i:"keyboard",title:"Keyboard shortcuts","aria-label":"Show keyboard shortcuts",onClick:()=>Ce(!0)}),!z&&e.jsx(aa,{i:q==="default"?"grid_view":q==="wide-timeline"?"view_agenda":"view_compact",title:`Layout: ${q}`,"aria-label":"Cycle layout",onClick:()=>{const R=["default","wide-timeline","compact"],V=R.indexOf(q);ne?.(R[(V+1)%R.length])}}),e.jsxs("button",{onClick:de,className:z?"":"export-btn",style:{...z?{background:d&&!n?"#22c55e":"rgba(34,197,94,0.5)",border:"none",borderRadius:"20px",padding:"6px 14px",fontSize:"12px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Spline Sans', sans-serif",cursor:d&&!n?"pointer":"not-allowed",minHeight:"32px",minWidth:"auto",transition:"all 0.2s ease"}:{...et.exportBtn,opacity:d&&!n?1:.5,cursor:d&&!n?"pointer":"not-allowed"}},disabled:!d||n,"aria-label":n?"Exporting...":d?"Export video":"Add media to timeline to export",title:n?"Export in progress...":d?"Export video (Ctrl+E)":"Add media to timeline first",children:[e.jsx(Te,{i:"download",s:14,c:z?"#fff":"#0a0a0a"}),n?"Exporting...":"Export"]})]})]}),e.jsx(ko,{isOpen:we,onClose:ve,onExport:ze,isExporting:n,progress:s,operationLabel:l||"Exporting video...",subMessage:v,resolutions:f,exportPresets:b,onCancel:n?P:void 0,projectName:t,exportResult:fe,onDownload:fe?ve:void 0,onExportAnother:fe?()=>ke(null):void 0}),e.jsx(So,{isOpen:Se,onClose:()=>Ce(!1)})]})},Wn=a.memo(zn),Vn=`
  .toolbar-btn {
    position: relative;
    transition: all 0.15s ease;
    border-radius: 6px;
  }

  .toolbar-btn:hover {
    background: rgba(117, 170, 219, 0.08);
  }

  .toolbar-btn.active {
    background: rgba(117, 170, 219, 0.1);
  }

  .toolbar-btn::before {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 20px;
    height: 2px;
    background: #75aadb;
    border-radius: 1px;
    transition: transform 0.2s ease;
  }

  .toolbar-btn.active::before {
    transform: translateX(-50%) scaleX(1);
  }
  
  .toolbar-icon {
    transition: transform 0.15s ease;
  }
  
  .toolbar-btn:hover .toolbar-icon {
    transform: scale(1.1);
  }
  
  .toolbar-btn:active .toolbar-icon {
    transform: scale(0.95);
  }
  
  .toolbar-tooltip {
    position: absolute;
    bottom: -36px;
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: #1a2332;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 11px;
    color: white;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.15s ease;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .toolbar-tooltip::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #1a2332;
  }
  
  .toolbar-btn:hover .toolbar-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  
  .toolbar-shortcut {
    display: inline-block;
    background: rgba(117, 170, 219, 0.2);
    color: #75aadb;
    padding: 1px 4px;
    border-radius: 2px;
    margin-left: 6px;
    font-size: 9px;
    font-weight: 600;
  }
`,Co=a.memo(({item:t,isActive:o,onClick:i,shortcut:n,compact:s})=>{const[l,d]=a.useState(!1),f=a.useCallback(b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i(t.id))},[t.id,i]);return e.jsxs("button",{onClick:()=>i(t.id),onKeyDown:f,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),className:`toolbar-btn ${o?"active":""}`,style:{...et.ghost,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:s?"6px 10px":"6px 14px",flexShrink:0,color:o?"#75aadb":l?"#94a3b8":"#4a5568"},role:"tab","aria-selected":o,"aria-label":`${t.label} panel`,tabIndex:o?0:-1,children:[e.jsx("span",{className:"toolbar-icon",children:e.jsx(Te,{i:t.icon,s:20,c:o?"#75aadb":l?"#94a3b8":"#4a5568"})}),e.jsx("span",{style:{fontSize:"8px",fontWeight:o?700:600,textTransform:"uppercase",letterSpacing:"1px",transition:"color 0.15s ease"},children:t.label}),e.jsxs("div",{className:"toolbar-tooltip",children:[t.label,n&&e.jsx("span",{className:"toolbar-shortcut",children:n})]})]})});Co.displayName="ToolbarButton";const Kn={media:"1",audio:"2",text:"3",stickers:"4",effects:"5",transition:"6",filters:"7"},Hn=({activeToolbar:t,onToolbarChange:o})=>{const i=Ca(),n=a.useCallback(s=>{const l=it.findIndex(d=>d.id===t);if(s.key==="ArrowRight"){s.preventDefault();const d=(l+1)%it.length;o(it[d].id)}else if(s.key==="ArrowLeft"){s.preventDefault();const d=l===0?it.length-1:l-1;o(it[d].id)}else if(s.key>="1"&&s.key<="7"){s.preventDefault();const d=parseInt(s.key)-1;it[d]&&o(it[d].id)}},[t,o]);return e.jsxs("nav",{style:{...et.toolbar,...i?{overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Editor tools",onKeyDown:n,children:[e.jsx("style",{children:Vn}),it.map(s=>e.jsx(Co,{item:s,isActive:t===s.id,onClick:o,shortcut:Kn[s.id],compact:i},s.id))]})},Yn=a.memo(Hn);async function To(t,o,i=.3,n=null){await Ye(),n&&Je(n);const s="input_video.mp4",l="input_audio.mp3",d="output_mixed.mp4";try{await De(s,t),await De(l,o),await Ge(["-i",s,"-i",l,"-filter_complex",`[1:a]volume=${i}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k",d]);const f=await Ke(d);return He(f,"video/mp4")}finally{Xe(),await qe([s,l,d])}}async function Xn(t,o,i=null){await Ye(),i&&Je(i);const n="input_video.mp4",s="input_audio.mp3",l="output_replaced.mp4";try{await De(n,t),await De(s,o),await Ge(["-i",n,"-i",s,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",l]);const d=await Ke(l);return He(d,"video/mp4")}finally{Xe(),await qe([n,s,l])}}async function Io(t,o=1,i=null){await Ye(),i&&Je(i);const n="input_volume.mp4",s="output_volume.mp4";try{await De(n,t),await Ge(["-i",n,"-af",`volume=${o}`,"-c:v","copy","-c:a","aac","-b:a","192k",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([n,s])}}async function Ro(t,o=null){await Ye(),o&&Je(o);const i="input_mute.mp4",n="output_mute.mp4";try{await De(i,t),await Ge(["-i",i,"-c:v","copy","-an",n]);const s=await Ke(n);return He(s,"video/mp4")}finally{Xe(),await qe([i,n])}}async function Mo(t,o="mp3",i=null){await Ye(),i&&Je(i);const n="input_extract.mp4",s=`output_extract.${o}`,l={mp3:"audio/mpeg",aac:"audio/aac",wav:"audio/wav"},d={mp3:["-c:a","libmp3lame","-b:a","192k"],aac:["-c:a","aac","-b:a","192k"],wav:["-c:a","pcm_s16le"]};try{await De(n,t),await Ge(["-i",n,"-vn",...d[o]||d.mp3,s]);const f=await Ke(s);return He(f,l[o]||"audio/mpeg")}finally{Xe(),await qe([n,s])}}async function Gn(t,o=null){await Ye(),o&&Je(o);const i="input_normalize.mp4",n="output_normalize.mp4";try{await De(i,t),await Ge(["-i",i,"-af","loudnorm=I=-16:LRA=11:TP=-1.5","-c:v","copy","-c:a","aac","-b:a","192k",n]);const s=await Ke(n);return He(s,"video/mp4")}finally{Xe(),await qe([i,n])}}async function qn(t,o=0,i=0,n=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",d="output_fade.mp4";try{await De(l,t);const f=[];if(o>0&&f.push(`afade=t=in:st=0:d=${o}`),i>0&&n){const w=n-i;f.push(`afade=t=out:st=${w}:d=${i}`)}const b=f.join(","),p=["-i",l,"-c:v","copy"];b?(p.push("-af",b),p.push("-c:a","aac","-b:a","192k")):p.push("-c:a","copy"),p.push(d),await Ge(p);const x=await Ke(d);return He(x,"video/mp4")}finally{Xe(),await qe([l,d])}}const li=Object.freeze(Object.defineProperty({__proto__:null,adjustVolume:Io,extractAudio:Mo,fadeAudio:qn,mixAudio:To,muteAudio:Ro,normalizeAudio:Gn,replaceAudio:Xn},Symbol.toStringTag,{value:"Module"})),Sa={"top-left":{x:"10",y:"10"},"top-center":{x:"(w-text_w)/2",y:"10"},"top-right":{x:"w-text_w-10",y:"10"},"center-left":{x:"10",y:"(h-text_h)/2"},center:{x:"(w-text_w)/2",y:"(h-text_h)/2"},"center-right":{x:"w-text_w-10",y:"(h-text_h)/2"},"bottom-left":{x:"10",y:"h-text_h-10"},"bottom-center":{x:"(w-text_w)/2",y:"h-text_h-10"},"bottom-right":{x:"w-text_w-10",y:"h-text_h-10"}},Eo=["fade","fadeblack","fadewhite","dissolve","pixelize","wipeleft","wiperight","wipeup","wipedown","slideleft","slideright","slideup","slidedown"];async function Jn(t,o,i={},n=null){await Ye(),n&&Je(n);const{position:s="bottom-center",fontSize:l=48,fontColor:d="white",backgroundColor:f=null,startTime:b=0,duration:p=0}=i,x="input_text.mp4",w="output_text.mp4";try{await De(x,t);const T=typeof s=="string"?Sa[s]||Sa["bottom-center"]:s;let P=`drawtext=text='${o.replace(/'/g,"'\\''").replace(/:/g,"\\:").replace(/\\/g,"\\\\")}':fontsize=${l}:fontcolor=${d}:x=${T.x}:y=${T.y}`;if(f&&(P+=`:box=1:boxcolor=${f}:boxborderw=5`),b>0||p>0){const K=p>0?`between(t,${b},${b+p})`:`gte(t,${b})`;P+=`:enable='${K}'`}await Ge(["-i",x,"-vf",P,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",w]);const v=await Ke(w);return He(v,"video/mp4")}finally{Xe(),await qe([x,w])}}async function Qn(t,o,i="fade",n=1,s=null){await Ye(),s&&Je(s);const l=Eo.includes(i)?i:"fade",d="input_trans_1.mp4",f="input_trans_2.mp4",b="output_transition.mp4";try{await De(d,t),await De(f,o);const p=await Zn(t),x=Math.max(0,p-n);await Ge(["-i",d,"-i",f,"-filter_complex",`[0:v][1:v]xfade=transition=${l}:duration=${n}:offset=${x}[v];[0:a][1:a]acrossfade=d=${n}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",b]);const w=await Ke(b);return He(w,"video/mp4")}finally{Xe(),await qe([d,f,b])}}async function Zn(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="metadata",n.onloadedmetadata=()=>{URL.revokeObjectURL(n.src),o(n.duration)},n.onerror=()=>{URL.revokeObjectURL(n.src),i(new Error("Failed to load video"))},n.src=URL.createObjectURL(t)})}async function st(t,o,i=null){if(typeof o!="string"||!/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(o))throw new Error("Invalid FFmpeg filter string");await Ye(),i&&Je(i);const n="input_filter.mp4",s="output_filter.mp4";try{await De(n,t),await Ge(["-i",n,"-vf",o,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([n,s])}}async function er(t,o=0,i=0,n=null){const s=`eq=brightness=${o}:contrast=${1+i}`;return st(t,s,n)}async function tr(t,o=1,i=null){const n=`eq=saturation=${o}`;return st(t,n,i)}async function ar(t,o=5,i=null){const n=`boxblur=${o}:${o}`;return st(t,n,i)}async function or(t,o=1,i=null){const n=`unsharp=5:5:${o}:5:5:0`;return st(t,n,i)}async function nr(t,o=1,i=null){await Ye(),i&&Je(i);const n="input_speed.mp4",s="output_speed.mp4",l=Math.max(.25,Math.min(4,o));try{await De(n,t);const d=`setpts=${1/l}*PTS`;let f="";if(l<=2&&l>=.5)f=`atempo=${l}`;else if(l>2){const p=Math.ceil(Math.log(l)/Math.log(2)),x=Math.pow(l,1/p);f=Array(p).fill(`atempo=${x}`).join(",")}else{const p=Math.ceil(Math.log(1/l)/Math.log(2)),x=Math.pow(l,1/p);f=Array(p).fill(`atempo=${x}`).join(",")}await Ge(["-i",n,"-filter_complex",`[0:v]${d}[v];[0:a]${f}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",s]);const b=await Ke(s);return He(b,"video/mp4")}finally{Xe(),await qe([n,s])}}async function rr(t,o=0,i=0,n=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",d="output_fade.mp4";try{await De(l,t);const f=[];if(o>0&&f.push(`fade=t=in:st=0:d=${o}`),i>0&&n){const p=n-i;f.push(`fade=t=out:st=${p}:d=${i}`)}if(f.length===0){const p=await Ke(l);return He(p,"video/mp4")}await Ge(["-i",l,"-vf",f.join(","),"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",d]);const b=await Ke(d);return He(b,"video/mp4")}finally{Xe(),await qe([l,d])}}async function ir(t,o=90,i=null){const n={90:"transpose=1",180:"transpose=1,transpose=1",270:"transpose=2","-90":"transpose=2"},s=n[o]||n[90];return st(t,s,i)}async function sr(t,o="horizontal",i=null){return st(t,o==="vertical"?"vflip":"hflip",i)}async function lr(t,o,i=null){const{width:n,height:s,x:l=0,y:d=0}=o,f=`crop=${n}:${s}:${l}:${d}`;return st(t,f,i)}const ga=15,cr=85;function dr(){const[t,o]=a.useState(!1),[i,n]=a.useState(ha()),[s,l]=a.useState(0),[d,f]=a.useState(0),[b,p]=a.useState(null),[x,w]=a.useState(null),T=a.useRef(!0);a.useEffect(()=>{T.current=!0;const S=cn(C=>{T.current&&(f(C.loadProgress),C.error&&p(C.error))});return()=>{T.current=!1,Xe(),S()}},[]);const X=a.useCallback(async()=>{if(ha())return n(!0),!0;o(!0),p(null);try{return await Ye(),T.current&&(n(!0),o(!1)),!0}catch(S){return T.current&&(p(oa(S,"ffmpeg")),o(!1)),!1}},[]),P=a.useCallback(({progress:S})=>{T.current&&l(S)},[]),v=a.useCallback(async(S,C)=>{if(!ha()&&!await X())throw new Error("FFmpeg not loaded");w(S),l(0),p(null);const M=({progress:F=0,time:le=0})=>{const he=ga+Math.round(F/100*cr),We=Math.max(ga,Math.min(99,he));P({progress:We,time:le})};try{P({progress:ga});const F=await C(M);return T.current&&(l(100),w(null),setTimeout(()=>{T.current&&l(0)},350)),F}catch(F){if(T.current){const he=F?.name==="AbortError"||/abort|cancel/i.test(F?.message||"");p(he?"Operation cancelled":oa(F,"ffmpeg")),l(0),w(null)}const le=(F?.message||"").toLowerCase();if(le.includes("wasm")||le.includes("memory")||le.includes("abort")||le.includes("sharedarraybuffer"))try{await dn(),T.current&&n(!1)}catch{}throw F}},[X,P]),K=a.useCallback(async(S,C,M)=>v("trim video",F=>un(S,C,M,F)),[v]),H=a.useCallback(async(S,C)=>v("split video",M=>pn(S,C,M)),[v]),me=a.useCallback(async S=>v("merge clips",C=>mn(S,C)),[v]),q=a.useCallback(async(S,C)=>v("export video",M=>fn(S,C,M)),[v]),ne=a.useCallback(async(S,C)=>{const M=na[C];return v(`export for ${M?.label||C}`,F=>hn(S,C,F))},[v]),k=a.useCallback(async S=>bn(S),[]),Q=a.useCallback(async(S,C=0)=>gn(S,C),[]),se=a.useCallback(async S=>v("convert to web format",C=>xn(S,"mp4",C)),[v]),N=a.useCallback(async(S,C,M=.3)=>v("mix audio",F=>To(S,C,M,F)),[v]),z=a.useCallback(async(S,C)=>v("adjust volume",M=>Io(S,C,M)),[v]),we=a.useCallback(async S=>v("mute audio",C=>Ro(S,C)),[v]),W=a.useCallback(async(S,C="mp3")=>v("extract audio",M=>Mo(S,C,M)),[v]),Z=a.useCallback(async(S,C,M={})=>v("add text",F=>Jn(S,C,M,F)),[v]),ge=a.useCallback(async(S,C,M="fade",F=1)=>v("add transition",le=>Qn(S,C,M,F,le)),[v]),E=a.useCallback(async(S,C)=>v("change speed",M=>nr(S,C,M)),[v]),G=a.useCallback(async(S,C,M,F)=>v("add fade",le=>rr(S,C,M,F,le)),[v]),Se=a.useCallback(async(S,C)=>v("rotate video",M=>ir(S,C,M)),[v]),Ce=a.useCallback(async(S,C)=>v("flip video",M=>sr(S,C,M)),[v]),Ie=a.useCallback(async(S,C)=>v("crop video",M=>lr(S,C,M)),[v]),de=a.useCallback(async(S,C,M)=>v("adjust colors",F=>er(S,C,M,F)),[v]),ze=a.useCallback(async(S,C)=>v("adjust saturation",M=>tr(S,C,M)),[v]),ve=a.useCallback(async(S,C)=>v("apply filter",M=>st(S,C,M)),[v]),pe=a.useCallback(async(S,C)=>v("apply blur",M=>ar(S,C,M)),[v]),ue=a.useCallback(async(S,C)=>v("apply sharpen",M=>or(S,C,M)),[v]),fe=a.useCallback(()=>{p(null)},[]),ke=a.useCallback(()=>{l(0),w(null)},[]),Le=a.useCallback(async()=>{await yn()},[]),j=a.useCallback(()=>{jn(),T.current&&(w(null),l(0),p("Operation cancelled"))},[]),R=a.useCallback(async()=>{await wn()},[]),V=a.useCallback(()=>{const S=Sn(),C=kn();return{usage:S,usageFormatted:vn(S),limitExceeded:C}},[]);return{isLoading:t,isReady:i,progress:s,loadProgress:d,error:b,currentOperation:x,initialize:X,preload:Le,clearError:fe,resetProgress:ke,cancelOperation:j,clearMemory:R,getMemoryInfo:V,trimVideo:K,splitVideo:H,mergeClips:me,exportVideo:q,exportWithPreset:ne,getVideoInfo:k,generateThumbnail:Q,convertToWebFormat:se,mixAudio:N,adjustVolume:z,muteAudio:we,extractAudio:W,addTextOverlay:Z,addTransition:ge,changeSpeed:E,addFade:G,rotateVideo:Se,flipVideo:Ce,cropVideo:Ie,adjustBrightnessContrast:de,adjustSaturation:ze,applyFilter:ve,applyBlur:pe,applySharpen:ue,resolutions:wo,exportPresets:na,textPositions:Sa,transitionTypes:Eo}}const ur="clipcut-thumbnails",pr=1,Ct="thumbnails";let Qt=null;function _o(){return Qt||(Qt=new Promise((t,o)=>{const i=indexedDB.open(ur,pr);i.onerror=()=>{console.warn("[ThumbnailCache] Failed to open database"),o(i.error)},i.onsuccess=()=>{t(i.result)},i.onupgradeneeded=n=>{const s=n.target.result;if(!s.objectStoreNames.contains(Ct)){const l=s.createObjectStore(Ct,{keyPath:"id"});l.createIndex("videoId","videoId",{unique:!1}),l.createIndex("timestamp","timestamp",{unique:!1})}}}),Qt)}function Ao(t,o){return`${t}_t${Math.floor(o*10)}`}async function mr(t,o){try{const i=await _o(),n=Ao(t,o);return new Promise(s=>{const f=i.transaction(Ct,"readonly").objectStore(Ct).get(n);f.onsuccess=()=>{const b=f.result;b&&b.data?s(new Blob([b.data],{type:"image/jpeg"})):s(null)},f.onerror=()=>s(null)})}catch(i){return console.warn("[ThumbnailCache] Error getting cached thumbnail:",i),null}}async function fr(t,o,i){try{const n=await _o(),s=Ao(t,o),l=await i.arrayBuffer();return new Promise(d=>{const f=n.transaction(Ct,"readwrite");f.objectStore(Ct).put({id:s,videoId:t,time:o,data:l,timestamp:Date.now()}),f.oncomplete=()=>d(!0),f.onerror=()=>d(!1)})}catch(n){console.warn("[ThumbnailCache] Error caching thumbnail:",n)}}function Zt(t){return new Promise((o,i)=>{const n=URL.createObjectURL(t);if(t.type?.startsWith("audio/")){const f=new Audio;f.preload="metadata",f.onloadedmetadata=()=>{URL.revokeObjectURL(n),o({duration:f.duration||0,width:0,height:0})},f.onerror=()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},f.src=n;return}const l=document.createElement("video");l.preload="metadata",l.muted=!0;const d=setTimeout(()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},5e3);l.onloadedmetadata=()=>{clearTimeout(d),URL.revokeObjectURL(n),o({duration:isFinite(l.duration)?l.duration:0,width:l.videoWidth||0,height:l.videoHeight||0})},l.onerror=()=>{clearTimeout(d),URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},l.src=n})}function Lt(t,o=0){return new Promise((i,n)=>{const s=URL.createObjectURL(t),l=document.createElement("video");l.preload="auto",l.muted=!0;const d=setTimeout(()=>{f(),i(ea())},8e3);function f(){clearTimeout(d),URL.revokeObjectURL(s)}l.onloadeddata=()=>{const b=Math.min(o,l.duration-.1);l.currentTime=Math.max(0,b)},l.onseeked=()=>{try{const b=document.createElement("canvas"),x=Math.min(1,320/(l.videoWidth||320));b.width=Math.round((l.videoWidth||320)*x),b.height=Math.round((l.videoHeight||180)*x),b.getContext("2d").drawImage(l,0,0,b.width,b.height),b.toBlob(T=>{f(),i(T||ea())},"image/jpeg",.7)}catch{f(),i(ea())}},l.onerror=()=>{f(),i(ea())},l.src=s})}function ea(){const t=document.createElement("canvas");t.width=160,t.height=90;const o=t.getContext("2d"),i=o.createLinearGradient(0,0,160,90);return i.addColorStop(0,"#1a2332"),i.addColorStop(1,"#0a0a0a"),o.fillStyle=i,o.fillRect(0,0,160,90),o.fillStyle="rgba(117, 170, 219, 0.3)",o.beginPath(),o.moveTo(65,30),o.lineTo(65,60),o.lineTo(100,45),o.closePath(),o.fill(),new Promise(n=>{t.toBlob(s=>n(s||new Blob),"image/jpeg",.7)})}const Ga={"480p":{width:854,height:480},"720p":{width:1280,height:720},"1080p":{width:1920,height:1080}},qa={"480p":{28:1e6,23:2e6,18:4e6,15:6e6},"720p":{28:25e5,23:5e6,18:8e6,15:12e6},"1080p":{28:4e6,23:8e6,18:16e6,15:24e6}};function hr(t,o){const i=qa[t]||qa["1080p"];return i[o]||i[18]}const Ja={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}};function Qa(t,o,i,n){const s=o.text||"";if(!s.trim())return;const l=Math.max(12,Math.round((o.textSize||48)*(n/1080))),d=o.textBold?"bold":"normal",f=o.textItalic?"italic":"normal",b=o.textFontFamily||"Spline Sans";t.font=`${f} ${d} ${l}px '${b}', Arial, sans-serif`;let p,x,w,T;if(o.textX!=null&&o.textY!=null)p=o.textX/100*i,x=o.textY/100*n,w="center",T="middle";else{const X=Ja[o.textPosition||"center"]||Ja.center;p=X.x*i,x=X.y*n,w=X.align,T=X.baseline}if(t.textAlign=w,t.textBaseline=T,o.textBgColor&&o.textBgColor!=="transparent"){const X=t.measureText(s),P=l*.25,v=X.width,K=l*1.2;let H=p-P;w==="center"?H=p-v/2-P:w==="right"&&(H=p-v-P);let me=x-P;T==="middle"?me=x-K/2-P:T==="bottom"&&(me=x-K-P),t.fillStyle=o.textBgColor,t.fillRect(H,me,v+P*2,K+P*2)}if(t.shadowColor="rgba(0,0,0,0.7)",t.shadowBlur=4,t.shadowOffsetX=0,t.shadowOffsetY=1,t.fillStyle=o.textColor||"#ffffff",t.fillText(s,p,x),o.textUnderline){const X=t.measureText(s);let P=p;w==="center"?P=p-X.width/2:w==="right"&&(P=p-X.width);const v=T==="top"?x+l:T==="middle"?x+l/2:x;t.strokeStyle=o.textColor||"#ffffff",t.lineWidth=Math.max(1,l/20),t.beginPath(),t.moveTo(P,v+2),t.lineTo(P+X.width,v+2),t.stroke()}t.shadowColor="transparent",t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0}function br(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="auto",n.playsInline=!0,n.muted=!1,n.style.position="fixed",n.style.top="-9999px",n.style.left="-9999px",n.style.width="1px",n.style.height="1px",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s;const l=()=>{n.removeEventListener("error",d)},d=()=>{l(),i(new Error(`Failed to load video: ${n.error?.message||"unknown error"}`))};n.addEventListener("error",d),n.addEventListener("loadeddata",()=>{l(),o({video:n,url:s})},{once:!0}),n.load()})}function gr(t){return new Promise((o,i)=>{const n=document.createElement("audio");n.preload="auto",n.style.display="none",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s,n.addEventListener("error",()=>{i(new Error("Failed to load audio"))}),n.addEventListener("canplaythrough",()=>{o({audio:n,url:s})},{once:!0}),n.load()})}function xr(){const t=["video/webm;codecs=vp8,opus","video/webm;codecs=vp8","video/webm;codecs=vp9,opus","video/webm;codecs=vp9","video/webm"];for(const o of t)if(MediaRecorder.isTypeSupported(o))return o;return""}function yr(t){const o=[];return t.brightness!=null&&t.brightness!==0&&o.push(`brightness(${1+t.brightness/100})`),t.contrast!=null&&t.contrast!==0&&o.push(`contrast(${1+t.contrast/100})`),t.saturation!=null&&t.saturation!==0&&o.push(`saturate(${1+t.saturation/100})`),t.blur!=null&&t.blur>0&&o.push(`blur(${t.blur}px)`),o.length>0?o.join(" "):"none"}function xa(t){const o=Math.floor(t/60),i=Math.floor(t%60);return`${o}:${i.toString().padStart(2,"0")}`}async function wr({clips:t,bgMusic:o=null,totalDuration:i,resolution:n="1080p",settings:s={},onProgress:l,abortSignal:d}){const{quality:f=23,fps:b=30}=s,p=Ga[n]||Ga["1080p"],{width:x,height:w}=p,T=hr(n,f),X=xr();if(Pt({category:"export",message:"canvasExport.start",level:"info",data:{resolution:n,fps:b,quality:f,totalDuration:i,clipCount:t?.length??0}}),!X)throw Pt({category:"export",message:"canvasExport.no_mime_support",level:"error"}),new Error("Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.");const P=t.filter(E=>E.type!=="audio"&&E.type!=="text"&&E.type!=="sticker"&&E.file).sort((E,G)=>E.startTime-G.startTime),K=t.filter(E=>E.type==="text"||E.type==="sticker"||E.text?.trim()).map(E=>{const G=E.startTime||0;return{...E,_start:G,_end:G+(E.duration||i)}});if(P.length===0)throw Pt({category:"export",message:"canvasExport.no_video_clips",level:"error"}),new Error("No video clips to export.");const H=document.createElement("canvas");H.width=x,H.height=w;const me=H.getContext("2d"),q=new AudioContext,ne=q.createMediaStreamDestination();let k=null,Q=null,se=null;if(o?.file)try{const E=await gr(o.file);k=E.audio,Q=E.url,k.loop=!0;const G=q.createMediaElementSource(k);se=q.createGain(),se.gain.value=o.volume??.3,G.connect(se),se.connect(ne)}catch(E){console.warn("Could not load background music, continuing without it:",E),k=null}const N=H.captureStream(b),z=ne.stream.getAudioTracks();for(const E of z)N.addTrack(E);const we=[],W=new MediaRecorder(N,{mimeType:X,videoBitsPerSecond:T,audioBitsPerSecond:128e3});W.ondataavailable=E=>{E.data.size>0&&we.push(E.data)},W.start(1e3),k&&(k.currentTime=0,k.play().catch(()=>{}));const Z=Date.now();for(let E=0;E<P.length&&!d?.aborted;E++){const G=P[E],Se=G.trimStart||0,Ce=G.duration||0,Ie=G.speed||1,{video:de,url:ze}=await br(G.file);let ve=null;try{ve=q.createMediaElementSource(de);const ue=q.createGain();ue.gain.value=G.isMuted?0:G.volume??1,ve.connect(ue),ue.connect(ne)}catch(ue){console.warn("Could not route clip audio:",ue)}de.currentTime=Se,de.playbackRate=Ie;const pe=yr(G);await new Promise(ue=>{de.addEventListener("seeked",ue,{once:!0})}),await de.play(),await new Promise((ue,fe)=>{let ke;const Le=Se+Ce,j=G.fadeIn||0,R=G.fadeOut||0,V=()=>{if(d?.aborted){cancelAnimationFrame(ke),de.pause(),ue();return}const S=de.currentTime,C=S-Se;if(Ce>0&&S>=Le-.05){de.pause(),Za(me,de,x,w,pe,G,C,Ce,j,R,K,G.startTime+C),ue();return}Za(me,de,x,w,pe,G,C,Ce,j,R,K,G.startTime+C);const M=G.startTime+C,F=i>0?Math.min(99,M/i*100):0,le=(Date.now()-Z)/1e3,he=F>1?le/F*(100-F):0;l?.({percent:Math.round(F),elapsed:xa(le),eta:xa(he),label:P.length>1?`Exporting clip ${E+1}/${P.length}`:"Exporting video..."}),ke=requestAnimationFrame(V)};de.addEventListener("ended",()=>{cancelAnimationFrame(ke),de.pause(),ue()},{once:!0}),de.addEventListener("error",()=>{cancelAnimationFrame(ke),fe(new Error(`Video playback error during export of clip ${E+1}`))},{once:!0}),ke=requestAnimationFrame(V)}),de.pause(),de.src="",de.load(),document.body.removeChild(de),URL.revokeObjectURL(ze),G.startTime+Ce}k&&(k.pause(),k.src="",document.body.removeChild(k),Q&&URL.revokeObjectURL(Q));const ge=await new Promise(E=>{W.onstop=()=>{const G=new Blob(we,{type:X});E(G)},W.stop()});if(N.getTracks().forEach(E=>E.stop()),ne.stream.getTracks().forEach(E=>E.stop()),await q.close().catch(()=>{}),l?.({percent:100,elapsed:xa((Date.now()-Z)/1e3),eta:"0:00",label:"Complete"}),d?.aborted)throw Pt({category:"export",message:"canvasExport.cancelled",level:"warning"}),new Error("Export cancelled.");return Pt({category:"export",message:"canvasExport.complete",level:"info",data:{sizeBytes:ge.size,duration:i,elapsedMs:Date.now()-Z}}),{blob:ge,duration:i,size:ge.size}}function Za(t,o,i,n,s,l,d,f,b,p,x,w){t.save();let T=1;b>0&&d<b&&(T=d/b),p>0&&f>0&&f-d<p&&(T=Math.min(T,(f-d)/p)),t.globalAlpha=Math.max(0,Math.min(1,T)),s&&s!=="none"&&(t.filter=s),l.rotation&&(t.translate(i/2,n/2),t.rotate(l.rotation*Math.PI/180),t.translate(-i/2,-n/2));const X=o.videoWidth||i,P=o.videoHeight||n,v=Math.min(i/X,n/P),K=X*v,H=P*v,me=(i-K)/2,q=(n-H)/2;t.fillStyle="#000000",t.fillRect(0,0,i,n),t.drawImage(o,me,q,K,H),t.filter="none",t.globalAlpha=1;for(const ne of x)w>=ne._start&&w<=ne._end&&Qa(t,ne,i,n);l.text?.trim()&&l.type!=="text"&&Qa(t,l,i,n),t.restore()}const vr="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease",kr=80,Sr=[.7,.95],jr=[.4,.7,.9],Cr=a.memo(function({isOpen:o,onClose:i,title:n,zIndex:s=2900,children:l}){const d=a.useRef(null),f=a.useRef({startY:0,isDragging:!1,startSnap:0}),[b,p]=a.useState(0),[x,w]=a.useState(!1),[T,X]=a.useState(!1),[P,v]=a.useState(0);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const W=window.matchMedia("(orientation: landscape) and (max-width: 900px)"),Z=()=>X(W.matches);return Z(),W.addEventListener?W.addEventListener("change",Z):W.addListener(Z),()=>{W.removeEventListener?W.removeEventListener("change",Z):W.removeListener(Z)}},[]);const K=T?jr:Sr,H=K[Math.min(P,K.length-1)]??K[0];a.useEffect(()=>{o&&v(0),p(0)},[o,T]),a.useEffect(()=>{if(o){const W=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=W}}},[o]);const me=a.useCallback(W=>{f.current.startY=W.touches[0].clientY,f.current.isDragging=!0,f.current.startSnap=P,w(!0)},[P]),q=a.useCallback(W=>{if(!f.current.isDragging)return;const Z=W.touches[0].clientY-f.current.startY;p(Z)},[]),ne=a.useCallback(()=>{if(!f.current.isDragging)return;f.current.isDragging=!1,w(!1);const W=b,Z=window.innerHeight||800;if(W>kr&&f.current.startSnap===0){p(0),i();return}if(K.length>1){const ge=W<0?-1:W>0?1:0,E=Z*.08,G=Math.round(Math.abs(W)/E);if(G>0){let Se=f.current.startSnap-ge*G;Se=Math.max(0,Math.min(K.length-1,Se)),v(Se)}}p(0)},[b,i,K]),k={position:"fixed",inset:0,bottom:"56px",background:"rgba(0,0,0,0.4)",zIndex:s-100,opacity:o?1:0,pointerEvents:o?"auto":"none",transition:"opacity 0.3s ease"},Q={position:"fixed",bottom:"56px",left:0,right:0,height:`${Math.round(H*100)}vh`,zIndex:s,background:"#0e1218",borderTop:"2px solid rgba(117, 170, 219, 0.15)",borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",transform:o?`translateY(${Math.max(0,b)}px)`:"translateY(100%)",transition:x?"none":vr},se={flexShrink:0,cursor:"grab",touchAction:"none"},N={width:"36px",height:"4px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"8px auto 6px"},z={fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"center",padding:"0 16px 8px",textTransform:"uppercase",letterSpacing:"0.5px"},we={flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:k,onClick:i}),e.jsxs("div",{ref:d,style:Q,"aria-hidden":!o,children:[e.jsxs("div",{style:se,onTouchStart:me,onTouchMove:q,onTouchEnd:ne,children:[e.jsx("div",{style:N}),n&&e.jsx("div",{style:z,children:n})]}),e.jsx("div",{style:we,children:l})]})]})}),ci=.1,Po=8,di=3,ui=t=>5*Math.pow(250/5,t/100),pi=(t,o)=>t*o,mi=(t,o)=>t/o,fi=(t,o,i)=>{const n=new Set([0,i]);for(const s of t)s.id!==o&&(n.add(s.startTime),n.add(s.startTime+s.duration));return[...n].sort((s,l)=>s-l)},eo=(t,o,i,n=Po)=>{const s=n/i;let l=t,d=null,f=s;for(const b of o){const p=Math.abs(t-b);p<f&&(f=p,l=b,d=b)}return{time:l,snappedTo:d}},hi=(t,o,i,n,s=Po)=>{const l=eo(t,i,n,s),d=eo(t+o,i,n,s),f=l.snappedTo!==null?Math.abs(t-l.time):1/0,b=d.snappedTo!==null?Math.abs(t+o-d.time):1/0;return f<=b&&l.snappedTo!==null?{startTime:l.time,snappedTo:l.snappedTo}:d.snappedTo!==null?{startTime:d.time-o,snappedTo:d.snappedTo}:{startTime:t,snappedTo:null}},Tr=t=>{const i=80/t,n=[.1,.25,.5,1,2,5,10,15,30,60,120,300];for(const s of n)if(s>=i*.6)return s;return 300},bi=(t,o)=>{const i=Tr(o),n=i<=1?4:i<=5?5:4,s=i/n,l=[],d=t+i;for(let f=0;f<=d;f+=s){const b=f%i;if(b<.001||Math.abs(b-i)<.001){const x=Math.floor(f/60),w=f%60,T=w===Math.floor(w)?Math.floor(w).toString().padStart(2,"0"):w.toFixed(1).padStart(4,"0");l.push({time:f,label:`${x}:${T}`,major:!0})}else l.push({time:f,label:"",major:!1})}return l},to=t=>{t<0&&(t=0);const o=Math.floor(t/60),i=t%60;return`${o}:${i.toFixed(1).padStart(4,"0")}`},gi=t=>{if(t<60)return`${t.toFixed(1)}s`;const o=Math.floor(t/60),i=(t%60).toFixed(0);return`${o}:${i.padStart(2,"0")}`},Ir=t=>t?.type!=="audio"&&t?.type!=="text",Uo=t=>Ir(t)&&!t?.blobUrl&&!!t?._mediaError,Rr=t=>t?.type!=="audio"&&!t?.blobUrl&&!!t?._mediaError;function Mr({restoredClips:t=[],mediaItems:o=[],projectName:i="Untitled Project"}){const n=t.filter(Uo).length,s=o.filter(Rr).length,l=n>0||s>0;return{clips:t,mediaItems:o,unresolvedClipCount:n,unresolvedMediaCount:s,hasUnavailableMedia:l,notification:l?{level:"warning",message:`Loaded "${i}" — ${n} clip(s) need media re-import`}:{level:"success",message:`Loaded "${i}" (${t.length} clips)`}}}function xi({videoSrc:t=null,hasTimelineClips:o=!1,hasUnavailableMediaClips:i=!1,isRestoringMedia:n=!1}){return n?{title:"Restoring media...",description:"Loading media files from storage",showImportHint:!1}:t?{title:null,description:null,showImportHint:!1}:i?{title:"Media missing",description:"This project still has clips, but one or more source files need to be re-imported.",showImportHint:!0}:o?{title:"No clip at playhead",description:"Move the playhead over a clip on the timeline to preview",showImportHint:!1}:{title:"No media loaded",description:"Import media and add clips to the timeline to preview",showImportHint:!0}}function Er(t=[]){return t.some(Uo)}function _r({projectId:t,isRestored:o,hasBeenNonEmpty:i,clipsCount:n,mediaItemsCount:s}){return t?o?(n||0)===0&&(s||0)===0&&!i?{skip:!0,reason:"empty-without-session-edit"}:{skip:!1,reason:null}:{skip:!0,reason:"restore-in-progress"}:{skip:!1,reason:null}}let ao=!1;function Ar(){if(ao)return;const t=Mn();if(!t)return;ao=!0;const o=typeof AbortSignal<"u"&&AbortSignal.timeout?{signal:AbortSignal.timeout(5e3)}:{};fetch(`${t}/health`,{method:"GET",mode:"cors",cache:"no-store",...o}).catch(i=>{i?.message})}const oo=a.lazy(()=>Be(()=>import("./CrfglaGM.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Pr=a.lazy(()=>Be(()=>import("./GKAQJs9V.js"),__vite__mapDeps([11,1,6,3,4,5,7,8,9,2,10]))),no=a.lazy(()=>Be(()=>import("./BILFwcap.js"),__vite__mapDeps([12,1,13,6,3,4,5,7,8,9,2,10]))),ro=a.lazy(()=>Be(()=>import("./CSuI3zoG.js"),__vite__mapDeps([14,1,6,3,4,5,7,8,9,2,10]))),io=a.lazy(()=>Be(()=>import("./BgHjUAIe.js"),__vite__mapDeps([15,1,13,3,4,5,6,7,8,9,2,10]))),so=a.lazy(()=>Be(()=>import("./aaj-9r0D.js"),__vite__mapDeps([16,1,13,3,4,5,6,7,8,9,2,10]))),lo=a.lazy(()=>Be(()=>import("./BO0ukjiE.js"),__vite__mapDeps([17,1,3,4,5,6,7,8,9,2,10]))),co=a.lazy(()=>Be(()=>import("./6xOTzy-T.js"),__vite__mapDeps([18,1,3,4,5,6,7,8,9,2,10]))),uo=a.lazy(()=>Be(()=>import("./BdtSec7t.js"),__vite__mapDeps([19,1,13,3,4,5,6,7,8,9,2,10]))),po=a.lazy(()=>Be(()=>import("./NmJ0LkB4.js"),__vite__mapDeps([20,1,6,3,4,21,5,7,8,9,2,10]))),mo=a.lazy(()=>Be(()=>import("./ChSpSz5O.js"),__vite__mapDeps([22,1,3,4,5,6,7,8,9,2,10]))),Ur=`
  /* Ensure Material Symbols font renders immediately with swap fallback */
  .material-symbols-outlined {
    font-display: swap;
    width: 1em;
    height: 1em;
    overflow: hidden;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideOutRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(24px); } }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .loading-overlay { animation: fadeIn 0.2s ease; }
  .loading-card { animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .toast-enter { animation: slideInRight 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .toast-exit { animation: slideOutRight 0.25s ease forwards; }
  @keyframes inspectorSlideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  .inspector-enter { animation: inspectorSlideIn 0.2s ease-out; }
  .shimmer-bar {
    background: linear-gradient(90deg, rgba(117,170,219,0.3) 25%, rgba(117,170,219,0.6) 50%, rgba(117,170,219,0.3) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  .resize-handle {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;
    user-select: none;
    z-index: 10;
    background: rgba(117,170,219,0.04);
  }
  .resize-handle:hover, .resize-handle.dragging {
    background: rgba(117,170,219,0.15);
  }
  .resize-handle-h {
    height: 8px;
    cursor: row-resize;
  }
  .resize-handle-v {
    width: 8px;
    cursor: col-resize;
  }
  .resize-handle-dot {
    width: 32px;
    height: 3px;
    border-radius: 2px;
    background: rgba(117,170,219,0.25);
    transition: background 0.15s ease;
  }
  .resize-handle:hover .resize-handle-dot, .resize-handle.dragging .resize-handle-dot {
    background: rgba(117,170,219,0.6);
  }
  .resize-handle-dot-v {
    width: 3px;
    height: 32px;
  }
  ${Pn}
  ${_n}
`;function ya(t,o,i,n=!1){const s=a.useRef(!1),l=a.useRef(0),d=a.useRef(0);return a.useCallback((b,p)=>{b.preventDefault(),s.current=!0,l.current=t==="y"?b.clientY:b.clientX,d.current=p;const x=b.currentTarget;x.classList.add("dragging");const w=X=>{if(!s.current)return;const P=t==="y"?l.current-X.clientY:X.clientX-l.current,v=n?-P:P;o(d.current+v)},T=()=>{s.current=!1,x.classList.remove("dragging"),document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",T),document.body.style.cursor="",document.body.style.userSelect=""};document.addEventListener("mousemove",w),document.addEventListener("mouseup",T),document.body.style.cursor=t==="y"?"row-resize":"col-resize",document.body.style.userSelect="none"},[t,o,i,n])}const Lr=280,fo=280,ho=320,bo=360;function wa(t){return Math.max(200,Math.min(400,Math.floor(t*.25)))}function va(t){return Math.max(220,Math.min(400,Math.floor(t*.25)))}const go={width:"100%",minWidth:0,minHeight:0,alignSelf:"stretch"},jt=a.memo(({width:t,height:o="100%"})=>e.jsx("div",{style:{width:t,height:o,background:"linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderRight:"1px solid rgba(117,170,219,0.06)"},children:e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}})}));jt.displayName="PanelLoadingFallback";const ja=a.memo(()=>e.jsx("div",{style:{height:"220px",background:"linear-gradient(180deg, #0c1018 0%, #08090c 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderTop:"2px solid rgba(117,170,219,0.08)"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("span",{style:{color:"#3d4a5c",fontSize:"11px",fontWeight:500},children:"Loading timeline..."})]})}));ja.displayName="TimelineLoadingFallback";const ka=[{target:"media-panel",title:"Media Library",desc:"Import videos and audio files here. Drag them to the timeline to start editing.",position:"right"},{target:"player",title:"Preview",desc:"Watch your edit in real-time. Effects and text overlays preview live without rendering.",position:"bottom"},{target:"inspector",title:"Inspector",desc:"Adjust clip properties — filters, speed, volume, text overlays, and transforms.",position:"left"},{target:"timeline",title:"Timeline",desc:"Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.",position:"top"}],Lo=a.memo(({onComplete:t})=>{const[o,i]=a.useState(0),n=ka[o],s=o===ka.length-1;return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9e3,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:l=>{l.target===l.currentTarget&&t()},children:e.jsxs("div",{style:{background:"#1a2332",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"90%",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 16px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(117,170,219,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#75aadb"},children:o+1}),e.jsx("span",{style:{fontSize:"15px",fontWeight:600,color:"#f1f5f9"},children:n.title})]}),e.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",lineHeight:1.6,margin:"0 0 16px"},children:n.desc}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"4px"},children:ka.map((l,d)=>e.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:d===o?"#75aadb":"rgba(255,255,255,0.1)"}},d))}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:t,style:{padding:"8px 16px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",background:"transparent",color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:"Skip"}),e.jsx("button",{onClick:()=>s?t():i(l=>l+1),style:{padding:"8px 20px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #75aadb, #5a8cbf)",color:"#0a0a0a",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:s?"Get Started":"Next"})]})]})]})})});Lo.displayName="WalkthroughOverlay";const Nr=(t,o)=>{switch(o.type){case"SET_CLIPS":return{...t,clips:o.clips,past:[...t.past.slice(-49),t.clips],future:[]};case"UNDO":return t.past.length===0?t:{clips:t.past[t.past.length-1],past:t.past.slice(0,-1),future:[t.clips,...t.future]};case"REDO":return t.future.length===0?t:{clips:t.future[0],past:[...t.past,t.clips],future:t.future.slice(1)};case"RESET":return{clips:[],past:[],future:[]};default:return t}};let $r=0;const ta=()=>`clip-${Date.now()}-${(++$r).toString(36)}`,No=a.memo(({message:t,progress:o,subMessage:i,operationLabel:n,onCancel:s})=>e.jsx("div",{className:"loading-overlay",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2e3,backdropFilter:"blur(6px)"},role:"dialog","aria-modal":"true","aria-label":"Processing",children:e.jsxs("div",{className:"loading-card",style:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"36px 52px",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",minWidth:"280px"},children:[e.jsxs("div",{style:{width:"56px",height:"56px",margin:"0 auto 20px",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("div",{style:{position:"absolute",inset:"6px",border:"2px solid rgba(117,170,219,0.1)",borderBottomColor:"rgba(117,170,219,0.5)",borderRadius:"50%",animation:"spin 1.2s linear infinite reverse"}})]}),e.jsx("p",{style:{color:"white",fontSize:"15px",margin:"0 0 6px",fontWeight:600},children:t}),n&&e.jsx("p",{style:{color:"rgba(255, 255, 255, 0.65)",fontSize:"12px",margin:"0 0 8px"},children:n}),i&&e.jsx("p",{style:{color:"#64748b",fontSize:"12px",margin:"0 0 16px"},children:i}),o>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"220px",height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden",margin:"16px auto 10px"},children:e.jsx("div",{className:o<100?"shimmer-bar":"",style:{height:"100%",width:`${o}%`,background:o>=100?"linear-gradient(90deg, #22c55e, #16a34a)":"linear-gradient(90deg, #75aadb, #5a8cbf)",transition:"width 0.3s ease",borderRadius:"3px"}})}),e.jsxs("p",{style:{color:"#75aadb",fontSize:"13px",fontWeight:700,margin:"0 0 16px"},children:[Math.round(o),"%"]})]}),s&&e.jsx("button",{onClick:s,style:{marginTop:o>0?"0":"16px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",padding:"8px 24px",color:"#ef4444",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},"aria-label":"Cancel operation",children:"Cancel"})]})}));No.displayName="LoadingOverlay";const $o=a.memo(({progress:t})=>t>=100?null:e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"3px",background:"rgba(0,0,0,0.3)",zIndex:100,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.max(t,2)}%`,background:"linear-gradient(90deg, #5a8cbf, #75aadb)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0",boxShadow:"0 0 8px rgba(117,170,219,0.4)"}})}));$o.displayName="FFmpegInitBar";const Oo=a.memo(({type:t="error",message:o,onClose:i,autoClose:n=!1})=>{const[s,l]=a.useState(!1);a.useEffect(()=>{if(!n)return;const b=setTimeout(()=>l(!0),Va),p=setTimeout(i,Va+Ka);return()=>{clearTimeout(b),clearTimeout(p)}},[n,i]);const d=a.useCallback(()=>{l(!0),setTimeout(i,Ka)},[i]),f={error:{bg:"linear-gradient(135deg, #ef4444, #dc2626)",shadow:"rgba(239,68,68,0.25)",icon:"error"},success:{bg:"linear-gradient(135deg, #22c55e, #16a34a)",shadow:"rgba(34,197,94,0.25)",icon:"check_circle"},warning:{bg:"linear-gradient(135deg, #f59e0b, #d97706)",shadow:"rgba(245,158,11,0.25)",icon:"warning"},info:{bg:"linear-gradient(135deg, #3b82f6, #2563eb)",shadow:"rgba(59,130,246,0.25)",icon:"info"}}[t]||{bg:"#ef4444",shadow:"rgba(0,0,0,0.2)",icon:"error"};return e.jsxs("div",{className:s?"toast-exit":"toast-enter",style:{position:"fixed",bottom:"24px",right:"24px",background:f.bg,color:"white",padding:"12px 18px",borderRadius:"10px",display:"flex",alignItems:"center",gap:"10px",boxShadow:`0 8px 28px ${f.shadow}`,zIndex:3e3,maxWidth:"380px",fontSize:"13px",backdropFilter:"blur(4px)"},role:t==="error"?"alert":"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",opacity:.9},children:f.icon}),e.jsx("span",{style:{flex:1,lineHeight:1.4},children:o}),e.jsx("button",{onClick:d,style:{background:"rgba(255,255,255,0.15)",border:"none",color:"white",cursor:"pointer",padding:"4px",borderRadius:"50%",display:"flex",width:"22px",height:"22px",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0},children:"✕"})]})});Oo.displayName="Toast";function Or(t,o){const i=t.find(s=>s.type==="video");if(!i)return null;if(i.file)return{file:i.file,mediaId:i.mediaId};const n=o.find(s=>s.id===i.mediaId);return n?.file?{file:n.file,mediaId:i.mediaId}:null}function Fr(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}async function Br(t,o,i,n,s,l){const d=new Map;for(const p of i)if(!(!p.file||p.storagePath))try{const x=await vo(t,o,p.file);d.set(p.id,x)}catch(x){console.warn("[autosave] Media upload failed:",p.name,x)}if(d.size===0)return{changed:!1,clips:n,mediaItems:i};const f=i.map(p=>d.has(p.id)?{...p,storagePath:d.get(p.id)}:p),b=n.map(p=>{const x=p.mediaId&&d.get(p.mediaId);return x?{...p,storagePath:x}:p});return s(f),l(b),{changed:!0,clips:b,mediaItems:f}}const Dr=(t,o,i,n,s,l,d,f,b,p,x,w,T,X=on)=>{const[P,v]=a.useState(null),K=a.useRef(!1),H=a.useRef(t),me=a.useRef(null),q=a.useRef(null),ne=a.useRef(null),k=a.useRef(0),Q=a.useRef(0),se=a.useRef(!1),N=a.useRef(i);N.current=i;const z=a.useRef(n);z.current=n;const we=a.useRef(o);we.current=o;const W=a.useRef(l);W.current=l;const Z=a.useRef(d);Z.current=d;const ge=a.useRef(p);ge.current=p;const E=a.useRef(w);E.current=w,a.useEffect(()=>{H.current=t},[t]),a.useEffect(()=>{const Se=()=>{Ar(),Be(()=>import("./BEUlQjCE.js"),__vite__mapDeps([23,1,24])).then(Ie=>Ie.warmupFaceModels?.()).catch(()=>{})};if(typeof requestIdleCallback=="function"){const Ie=requestIdleCallback(Se,{timeout:1500});return()=>cancelIdleCallback?.(Ie)}const Ce=setTimeout(Se,500);return()=>clearTimeout(Ce)},[]),a.useEffect(()=>{const Se=new Set(["file","blobUrl","thumbnail","isProcessing"]),Ce=ve=>{const pe={};for(const[ue,fe]of Object.entries(ve))Se.has(ue)||(pe[ue]=fe);return ve.mediaId&&H.current&&(pe.idbKey=`idb://${H.current}:${ve.mediaId}`),pe.storagePath&&pe.storagePath.startsWith("blob:")&&delete pe.storagePath,pe},Ie=ve=>{const pe={};for(const[ue,fe]of Object.entries(ve))Se.has(ue)||(pe[ue]=fe);return ve.id&&H.current&&(pe.idbKey=`idb://${H.current}:${ve.id}`),pe.blobUrl&&delete pe.blobUrl,pe},de=async()=>{if(K.current)return{saved:!1,skipReason:"in-progress"};const ve=N.current?.length||0,pe=z.current?.length||0;(ve>0||pe>0)&&(se.current=!0);const ue=_r({projectId:H.current,isRestored:T?T.current:!0,hasBeenNonEmpty:se.current,clipsCount:ve,mediaItemsCount:pe});if(ue.skip)return{saved:!1,skipReason:ue.reason};if(k.current>=3){if(Q.current>0)return Q.current--,{saved:!1,skipReason:"backoff"};Q.current=Math.min(Math.pow(2,k.current-3),20)}K.current=!0;try{const fe=N.current,ke=z.current,Le=we.current,j=ge.current,R={id:H.current,name:Le,clips:fe.map(Ce),mediaItems:ke.map(Ie),duration:W.current,resolution:Z.current||"1080p",timelineMarkers:E.current||[]};(j?.storagePath||j?.mediaId)&&(R.bgMusic={name:j.name,volume:j.volume??.3},j.storagePath&&(R.bgMusic.storagePath=j.storagePath),j.mediaId&&(R.bgMusic.mediaId=j.mediaId));const V=Or(fe,ke),S=V?.mediaId||null;if(V&&S!==me.current)try{const M=await Lt(V.file,1);if(M&&M.size>500){me.current=S,s&&(R.thumbnail=M);const F=await new Promise(le=>{const he=new FileReader;he.onloadend=()=>le(he.result),he.readAsDataURL(M)});R.thumbnailDataUrl=F,q.current=F}}catch(M){console.warn("Auto-save thumbnail generation failed:",M)}else q.current&&(R.thumbnailDataUrl=q.current);if(s){const M=await nn(()=>Jt(s,R),{maxRetries:2,baseDelay:1e3,maxDelay:5e3});T&&(T.current=!0);const F=H.current;let le=!1;if(M?.id&&M.id!==F&&(H.current=M.id,F))try{await In(F,M.id),le=!0,M.id}catch(We){console.warn("[autosave] IndexedDB re-key failed:",We)}const he=H.current;if(he&&Ut()){const We=await Br(s,he,z.current,N.current,f,b);if(We.changed&&(N.current=We.clips,z.current=We.mediaItems),We.changed||le){const at={id:he,name:we.current,clips:(We.changed?We.clips:N.current).map(Ce),mediaItems:z.current.map(Ie),duration:W.current,resolution:Z.current||"1080p",timelineMarkers:E.current||[],...q.current?{thumbnailDataUrl:q.current}:{}};ge.current?.storagePath&&(at.bgMusic={storagePath:ge.current.storagePath,name:ge.current.name,volume:ge.current.volume??.3}),await Jt(s,at)}const lt=ge.current;if(lt?.file&&!lt?.storagePath&&he)try{const at=await vo(s,he,lt.file);x($t=>$t?{...$t,storagePath:at}:null),await Jt(s,{id:he,name:we.current,clips:N.current.map(Ce),mediaItems:z.current.map(Ie),duration:W.current,resolution:Z.current||"1080p",timelineMarkers:E.current||[],bgMusic:{storagePath:at,name:lt.name,volume:lt.volume??.3},...q.current?{thumbnailDataUrl:q.current}:{}})}catch(at){console.warn("Background music upload failed:",at)}}}else{const F=Jt(null,R).id;H.current||(H.current=F),T&&(T.current=!0);for(const he of z.current)he.file&&Nt(F,he.id,he.file,{name:he.name,type:he.file.type}).catch(We=>{console.warn("Failed to persist media to IndexedDB",{mediaId:he.id,error:We?.message})});const le=ge.current;le?.file&&le?.mediaId&&Nt(F,le.mediaId,le.file,{name:le.name,type:le.file.type}).catch(he=>{console.warn("Failed to persist background music to IndexedDB",{mediaId:le.mediaId,error:he?.message})})}return v(new Date),k.current=0,Q.current=0,{saved:!0}}catch(fe){k.current++,k.current<=1?console.warn("Auto-save failed:",fe?.message||fe):k.current===3&&console.warn(`[autosave] ${k.current} consecutive failures — backing off. Will retry less frequently.`);try{const ke=we.current,Le=H.current,j={id:Le,projectName:ke,clips:N.current.map(Ce),mediaItems:z.current.map(Ie),savedAt:new Date().toISOString()};if(localStorage.setItem(`clipcut_autosave_${ke}`,JSON.stringify(j)),Le)for(const R of z.current)R.file&&Nt(Le,R.id,R.file,{name:R.name,type:R.file.type}).catch(V=>{console.warn("Fallback media persist failed",{mediaId:R.id,error:V?.message})})}catch{}return{saved:!1,skipReason:"error",error:fe}}finally{K.current=!1}};ne.current=de;const ze=setInterval(de,X);return()=>clearInterval(ze)},[s,X,f,b,x]);const G=a.useCallback(()=>ne.current?ne.current():Promise.resolve({saved:!1,skipReason:"not-ready"}),[]);return{lastSaved:P,projectId:H.current,triggerSave:G}},zr=60,Wr=(t,o)=>{const[i,n]=a.useState(0),[s,l]=a.useState(!1),d=a.useRef(null),f=a.useRef(1),b=a.useRef(0),p=a.useRef(0),x=a.useRef(t);x.current=t;const w=a.useCallback(k=>{const Q=x.current.filter(N=>N.type!=="audio"&&N.type!=="text").sort((N,z)=>N.startTime-z.startTime);for(const N of Q)if(k>=N.startTime&&k<N.startTime+N.duration)return N;const se=Q[Q.length-1];return se&&Math.abs(k-(se.startTime+se.duration))<.05?se:null},[]),T=a.useMemo(()=>w(i),[w,i]),X=a.useMemo(()=>T?Math.max(0,i-T.startTime)+(T.trimStart||0):0,[T,i]),P=a.useMemo(()=>{if(!T)return null;const k=t.filter(se=>se.type!=="audio").sort((se,N)=>se.startTime-N.startTime),Q=k.findIndex(se=>se.id===T.id);return Q>=0&&Q<k.length-1?k[Q+1]:null},[T,t]),v=a.useCallback(()=>{const k=performance.now();k-p.current>=zr&&(p.current=k,n(b.current))},[]),K=a.useCallback(k=>{if(k>=o){b.current=o,n(o),l(!1);return}b.current=k,v()},[o,v]);a.useEffect(()=>{if(!s){d.current&&cancelAnimationFrame(d.current),n(b.current);return}const k=()=>{if(b.current>=o){l(!1),n(o);return}d.current=requestAnimationFrame(k)};return d.current=requestAnimationFrame(k),()=>{d.current&&cancelAnimationFrame(d.current)}},[s,o]);const H=a.useCallback(k=>{const Q=Math.max(0,Math.min(o,k));b.current=Q,n(Q)},[o]),me=a.useCallback(()=>l(k=>!k),[]),q=a.useCallback(()=>{l(!1),b.current=0,n(0)},[]),ne=a.useCallback(k=>{f.current=k},[]);return{currentTime:i,currentClip:T,clipOffset:X,nextClip:P,isPlaying:s,seek:H,togglePlay:me,stop:q,setIsPlaying:l,setSpeed:ne,setCurrentTime:n,currentTimeRef:b,speedRef:f,onVideoTime:K}},Vr=()=>{const t=rn(),o=sn(),{user:i}=tn(),[n,s]=a.useState(()=>new URLSearchParams(window.location.search).get("project")||null),[l,d]=a.useState("Untitled Project"),[f,b]=a.useState("1080p"),p=a.useRef(!1),x=a.useRef(!1);a.useEffect(()=>{const r=new URL(window.location);n?r.searchParams.set("project",n):r.searchParams.delete("project"),r.toString()!==window.location.href&&window.history.replaceState(window.history.state,"",r)},[n]);const[w,T]=a.useState("media"),[X,P]=a.useState("video"),[v,K]=a.useState("basic"),[H,me]=a.useState("local"),[q,ne]=a.useState("default"),k=Ca(),Q=ln(),[se,N]=a.useState(!1),[z,we]=a.useState(!1),[W,Z]=a.useState([]),[ge,E]=a.useState(!1),[G,Se]=a.useState("parse"),[Ce,Ie]=a.useState(!1),[de,ze]=a.useState([]),ve=a.useRef([]),pe=a.useRef([]),[ue,fe]=a.useState(null),[ke,Le]=a.useState(null),[j,R]=a.useState(null),[V,S]=a.useState(()=>typeof window<"u"?window.innerWidth:1200);a.useEffect(()=>{if(q==="wide-timeline"){const r=window.innerHeight-296,c=Math.max(320,Math.floor(window.innerHeight*.46));fe(Math.max(120,Math.min(c,r)))}else(q==="default"||q==="compact")&&fe(null)},[q]);const C=a.useMemo(()=>wa(V),[V]),M=a.useMemo(()=>va(V),[V]),F=a.useMemo(()=>Math.min(ke??fo,C),[ke,C]),le=a.useMemo(()=>Math.min(j??ho,M),[j,M]),he=a.useCallback(r=>{const c=window.innerHeight-296,m=Math.max(120,Math.min(r,c));fe(m)},[]),We=a.useCallback(r=>{const c=window.innerWidth,m=wa(c),u=j??ho,g=c-bo-u-24;Le(Math.max(200,Math.min(r,m,g)))},[j]),lt=a.useCallback(r=>{const c=window.innerWidth,m=va(c),u=ke??fo,g=c-bo-u-24;R(Math.max(220,Math.min(r,m,g)))},[ke]);a.useEffect(()=>{let r;const c=()=>{clearTimeout(r),r=setTimeout(()=>{const m=window.innerWidth;S(m);const u=wa(m),g=va(m);Le(y=>y!=null?Math.min(y,u):null),R(y=>y!=null?Math.min(y,g):null)},150)};return window.addEventListener("resize",c),c(),()=>{clearTimeout(r),window.removeEventListener("resize",c)}},[]);const at=ya("y",he),$t=ya("x",We),Fo=ya("x",lt,void 0,!0),[Qe,ft]=a.useState(null),[Bo,Do]=a.useState(0),[zo,Wo]=a.useState(()=>!localStorage.getItem("clipcut_onboarded")),[Ae,Ne]=a.useState([]),[ct,Ot]=a.useState(null),[Tt,ra]=a.useReducer(Nr,{clips:[],past:[],future:[]}),_=Tt.clips,ht=Tt.past.length>0,bt=Tt.future.length>0,[Pe,Ze]=a.useState(null),[ia,Ft]=a.useState([]);a.useEffect(()=>{k&&Pe&&(ft("inspector"),N(!0))},[k,Pe]);const ot=a.useMemo(()=>{if(_.length===0)return 30;const r=_.filter(m=>m.type!=="text"&&m.type!=="sticker"&&!m.isCaption),c=r.length>0?r:_;return Math.max(...c.map(m=>m.startTime+m.duration))},[_]),L=Wr(_,ot),[Ve,gt]=a.useState(null),[Ia,Ra]=a.useState(!1),[xt,Ma]=a.useState(!1),[Ea,Bt]=a.useState(0),[It,_a]=a.useState([]),Rt=a.useRef(null),[sa,yt]=a.useState(!1),[wt,be]=a.useState(""),[Aa,tt]=a.useState(""),la=a.useRef(new Set),[Dt,Pa]=a.useState(null),$=a.useCallback((r,c)=>Pa({type:r,message:c}),[]),ee=dr(),Oe=a.useMemo(()=>_.find(r=>r.id===Pe),[_,Pe]),Vo=a.useMemo(()=>{if(L.currentClip?.blobUrl)return L.currentClip.blobUrl;if(ct){const c=Ae.find(m=>m.id===ct)?.blobUrl;if(c)return c}return _.find(c=>c.type!=="audio"&&c.type!=="text"&&c.blobUrl)?.blobUrl||null},[L.currentClip,ct,Ae,_]),Ko=a.useMemo(()=>Er(_),[_]),Ho=a.useMemo(()=>{const r=_.filter(u=>u.isCaption),c=_.filter(u=>u.type==="text"&&!u.isCaption),m=_.filter(u=>(u.type==="text"||u.type==="sticker"||u.isCaption)&&u.type!=="audio"&&L.currentTime>=u.startTime&&L.currentTime<u.startTime+u.duration);if(r.length>0&&m.filter(u=>u.isCaption).length===0){const u=r.slice(0,3);L.currentTime.toFixed(3),_.length,r.length,c.length,m.length,u.map(g=>({id:g.id,type:g.type,isCaption:g.isCaption,text:(g.text||"").slice(0,30),startTime:g.startTime,duration:g.duration,track:g.track,range:`${g.startTime?.toFixed(2)}-${(g.startTime+g.duration).toFixed(2)}`}))}return m},[_,L.currentTime]),vt=a.useRef(Tt.clips);vt.current=Tt.clips;const re=a.useCallback(r=>{const c=vt.current,m=typeof r=="function"?r(c):r;ra({type:"SET_CLIPS",clips:m})},[]),{lastSaved:Yo,projectId:zt,triggerSave:Wt}=Dr(n,l,_,Ae,i?.id,ot,f,Ne,re,Ve,gt,ia,x);a.useEffect(()=>{zt&&zt!==n&&s(zt)},[zt,n]);const kt=a.useCallback(()=>ra({type:"UNDO"}),[]),dt=a.useCallback(()=>ra({type:"REDO"}),[]),Ue=a.useCallback((r,c)=>re(m=>m.map(u=>u.id===r?{...u,...c}:u)),[re]),Ua=a.useCallback(r=>re(c=>c.map(m=>m.isCaption?{...m,...r}:m)),[re]),Vt=a.useCallback(r=>{re(c=>c.filter(m=>m.id!==r)),Pe===r&&Ze(null)},[re,Pe]),Kt=a.useCallback((r,c=null)=>{let m=c;if(m===null){const g=vt.current.filter(J=>J.type===r.type),y=g.length>0?g.reduce((J,U)=>J.startTime+J.duration>U.startTime+U.duration?J:U):null;m=y?y.startTime+y.duration:0}const u={...ba,id:ta(),mediaId:r.id,name:r.name,type:r.type,startTime:m,duration:r.duration||an,file:r.file,blobUrl:r.blobUrl,thumbnail:r.thumbnail};re(g=>[...g,u]),Ze(u.id),setTimeout(()=>Wt(),100)},[re,Wt]),Ht=a.useCallback(async r=>{Ra(!0);try{let c=n;if(c||(c=`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s(c)),r.length>0&&l==="Untitled Project"){const g=(r.find(y=>y.type.startsWith("video/"))||r[0]).name.replace(/\.[^.]+$/,"").trim();g&&d(g)}let m=0;for(const u of r){be(`Importing ${u.name}...`),tt(`${++m} of ${r.length}`);const g=ta(),y=URL.createObjectURL(u);Nt(c,g,u,{name:u.name,type:u.type}).catch(U=>console.warn("[import] IndexedDB store failed:",u.name,U));const J=u.type.startsWith("audio/");Ne(U=>[...U,{id:g,name:u.name,file:u,blobUrl:y,thumbnail:null,duration:0,width:0,height:0,type:J?"audio":"video",isProcessing:!0}]);try{const U=await Zt(u);if(Ne(O=>O.map(ie=>ie.id===g?{...ie,duration:U.duration,width:U.width,height:U.height,isProcessing:!1}:ie)),!J)try{const O=`${u.name}_${u.size}_${u.lastModified}`,ie=await mr(O,0),xe=ie||await Lt(u,0);ie||fr(O,0,xe).catch(()=>{});const Y=URL.createObjectURL(xe);Ne(ye=>ye.map(je=>je.id===g?{...je,thumbnail:Y}:je))}catch(O){console.warn("Thumbnail generation failed:",O)}}catch(U){if(!J&&/\.(mov|avi|mkv|flv|wmv)$/i.test(u.name))try{be(`Converting ${u.name} to MP4...`),ee.isReady||await ee.initialize();const ie=await ee.convertFormat(u,"mp4"),xe=new File([ie],u.name.replace(/\.\w+$/,".mp4"),{type:"video/mp4"}),Y=URL.createObjectURL(xe);URL.revokeObjectURL(y);const ye=await Zt(xe);Ne(h=>h.map(A=>A.id===g?{...A,file:xe,blobUrl:Y,duration:ye.duration,width:ye.width,height:ye.height,isProcessing:!1}:A));const je=await Lt(xe,0).catch(()=>null);if(je){const h=URL.createObjectURL(je);Ne(A=>A.map(B=>B.id===g?{...B,thumbnail:h}:B))}$("info",`Converted ${u.name} to MP4`)}catch(ie){console.error("Auto-convert failed:",ie),Ne(xe=>xe.map(Y=>Y.id===g?{...Y,isProcessing:!1}:Y))}else console.error("Error processing:",U),Ne(ie=>ie.map(xe=>xe.id===g?{...xe,isProcessing:!1}:xe))}}$("success",`Imported ${r.length} file${r.length>1?"s":""}`)}catch(c){$("error",`Import failed: ${c.message}`)}finally{Ra(!1),be(""),tt("")}},[$,n,l]),ca=a.useRef(null);a.useEffect(()=>{const r=_.find(Y=>Y.type!=="audio"&&Y.type!=="text"&&Y.type!=="sticker"&&!Y.isCaption&&(Y.file||Y.blobUrl||Y.mediaId));if(!r){ze([]),ca.current=null;return}const c=r.mediaId?Ae.find(Y=>Y.id===r.mediaId):null,m=r.file||c?.file||null,u=r.blobUrl||c?.blobUrl||null;if(!m&&!u){ze([]);return}const g=r.trimStart||0,y=r.trimEnd||0,J=r.duration||0,U=_.some(Y=>Y.isCaption),O=m?`${m.size}:${m.lastModified}`:String(u||""),ie=`${r.id}|${r.mediaId||""}|${g}|${y}|${J}|${U}|${O}`;if(ie===ca.current)return;ca.current=ie;const xe={...r,file:m||void 0,blobUrl:u||void 0};Be(async()=>{const{analyzeVideo:Y}=await import("./DPwd7N4p.js");return{analyzeVideo:Y}},__vite__mapDeps([25,26,3,1,4])).then(({analyzeVideo:Y})=>{Y(xe,{hasCaptions:U}).then(ye=>{ze(ye.length>0?ye:[])}).catch(()=>{ze([])})})},[_,Ae]);const Yt=a.useCallback(r=>{const c=Rn(r,{allowedCategories:["audio"],category:"audio"});if(!c.valid){$("warning",c.error||"Please select an audio file");return}Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl);const m=URL.createObjectURL(r),u=`bgm-${Date.now()}`;gt({file:r,name:r.name,blobUrl:m,volume:.3,mediaId:u});const g=n||`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Nt(g,u,r,{name:r.name,type:r.type}).catch(y=>console.warn("[bgMusic] IndexedDB store failed:",y)),$("success",`Background music: ${r.name}`)},[Ve,$,n]),Xt=a.useCallback(r=>{gt(c=>c?{...c,volume:r}:null)},[]),Gt=a.useCallback(()=>{Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl),gt(null),$("info","Background music removed")},[Ve,$]),La=a.useCallback(r=>{Ne(c=>{const m=c.find(u=>u.id===r);return m&&requestAnimationFrame(()=>{m.blobUrl&&URL.revokeObjectURL(m.blobUrl),m.thumbnail&&URL.revokeObjectURL(m.thumbnail)}),c.filter(u=>u.id!==r)}),re(c=>(c.filter(m=>m.mediaId===r).forEach(m=>{m.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(m.blobUrl))}),c.filter(m=>m.mediaId!==r))),ct===r&&Ot(null)},[ct,re]),qt=a.useCallback((r,c)=>{const m=vt.current.find(y=>y.id===r);if(!m||!Number.isFinite(c)||c<=.1||c>=m.duration-.1)return!1;const u={...m,id:ta(),name:`${m.name} (1)`,duration:c},g={...m,id:ta(),name:`${m.name} (2)`,startTime:m.startTime+c,duration:m.duration-c,trimStart:(m.trimStart||0)+c};return re(y=>{const J=y.findIndex(O=>O.id===r),U=[...y];return U.splice(J,1,u,g),U}),Ze(u.id),$("success","Clip split"),!0},[re,$]),nt=a.useCallback(r=>{re(c=>[...c,r]),Ze(r.id)},[re]),Na=a.useCallback(r=>{re(()=>r),Ze(null),$("success","Clip deleted (ripple)")},[re,$]);a.useCallback(async(r,c,m)=>{const u=vt.current.find(g=>g.id===r);if(u?.file){yt(!0),be("Trimming...");try{const g=await ee.trimVideo(u.file,c,m),y=URL.createObjectURL(g);re(J=>J.map(U=>U.id===r?{...U,file:g,blobUrl:y,duration:m}:U)),u.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(u.blobUrl)),$("success","Clip trimmed")}catch(g){$("error",oa(g,"ffmpeg"))}finally{yt(!1),be(""),ee.resetProgress()}}},[ee,re,$]),a.useCallback(async(r,c,m)=>{let u=r.file;const g=r.speed&&r.speed!==1,y=r.brightness||r.contrast,J=r.saturation!==void 0&&r.saturation!==1,U=r.rotation&&[90,180,270,-90].includes(r.rotation),O=r.volume!==void 0&&r.volume!==1||r.isMuted,ie=r.fadeIn&&r.fadeIn>0||r.fadeOut&&r.fadeOut>0,xe=r.filterName,Y=r.trimStart>0||r.trimEnd>0,ye=r.effects?.some(B=>B.enabled),je=r.text&&r.text.trim().length>0;if(!g&&!y&&!J&&!U&&!O&&!ie&&!xe&&!Y&&!ye&&!je)return u;const A=`clip ${c+1}/${m}`;if(Y&&(be(`Trimming ${A}...`),u=await ee.trimVideo(u,r.trimStart,r.duration)),g&&(be(`Adjusting speed for ${A}...`),u=await ee.changeSpeed(u,r.speed)),y&&(be(`Adjusting colors for ${A}...`),u=await ee.adjustBrightnessContrast(u,r.brightness||0,r.contrast||0)),J&&(be(`Adjusting saturation for ${A}...`),u=await ee.adjustSaturation(u,r.saturation)),U&&(be(`Rotating ${A}...`),u=await ee.rotateVideo(u,r.rotation)),O&&(be(`Adjusting audio for ${A}...`),u=await ee.adjustVolume(u,r.isMuted?0:r.volume)),ie&&(be(`Adding fade to ${A}...`),u=await ee.addFade(u,r.fadeIn||0,r.fadeOut||0,r.duration)),xe){const B=Un.find(ce=>ce.name===r.filterName);B?.filter&&(be(`Applying ${r.filterName} filter to ${A}...`),u=await ee.applyFilter(u,B.filter))}if(ye)for(const B of r.effects.filter(ce=>ce.enabled))B.type==="blur"&&B.params?.radius?(be(`Applying ${B.name} to ${A}...`),u=await ee.applyBlur(u,B.params.radius)):B.type==="sharpen"&&B.params?.strength&&(be(`Applying ${B.name} to ${A}...`),u=await ee.applySharpen(u,B.params.strength));return je&&(be(`Adding text overlay to ${A}...`),u=await ee.addTextOverlay(u,r.text,{position:r.textPosition||"bottom-center",fontSize:r.textSize||48,fontColor:r.textColor||"white",backgroundColor:r.textBgColor||null,startTime:r.textStartTime||0,duration:r.textDuration||0})),u},[ee]);const Xo=a.useCallback(()=>{_.length>0&&!window.confirm("Start a new project? Unsaved changes will be lost.")||(re([]),d("Untitled Project"),s(null),p.current=!1,x.current=!1,Ne([]),Ze(null),Ot(null),Ft([]),$("info","New project created"))},[_.length,$,re]),Go=a.useCallback(async()=>{const r=await Wt();if(r?.saved){$("success","Project saved");return}switch(r?.skipReason){case"restore-in-progress":$("info","Project still loading — try again in a moment");break;case"empty-without-session-edit":$("info","Nothing to save yet — add media or clips first");break;case"in-progress":$("info","Save already in progress");break;case"backoff":$("warning","Previous saves failed — retrying shortly");break;case"error":$("error",`Save failed${r?.error?.message?": "+r.error.message:""}`);break;default:$("info","Save skipped")}},[Wt,$]),qo=a.useCallback(()=>{o("/settings")},[o]),$a=a.useCallback(r=>{const c=String(r?.message||r||"").toLowerCase();return c.includes("too long to respond")||c.includes("timeout")?'AI is taking too long right now. Try again or use a shorter command like "add captions".':c.includes("worker")||c.includes("network")||c.includes("fetch")?"I could not reach the AI service. Check your internet and retry.":c.includes("import a video first")||c.includes("no video clip found")?"Please import a video first, then try the AI edit again.":c.includes("didn't understand")||c.includes("rephrasing")?'I did not understand that request. Try a clearer command like "split at 00:26".':"I could not complete that AI edit. Please try again."},[]),Mt=a.useCallback(async(r,c={})=>{const m=Date.now();if(pe.current=pe.current.filter(y=>m-y<6e4),pe.current.length>=10){Z(y=>[...y,{id:`e-${m}`,role:"assistant",text:"Rate limit reached. Please wait a moment before sending more prompts."}]);return}pe.current.push(m);const u={id:`u-${m}`,role:"user",text:r};if(Z(y=>[...y,u]),!_.some(y=>y.type==="video"||y.type==="audio"||y.type==="image")){const{parseIntentLocally:y}=await Be(async()=>{const{parseIntentLocally:U}=await import("./B2nv5XjD.js");return{parseIntentLocally:U}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2]));if(y(r)){const U=()=>{k?(ft("media"),N(!0)):(T("media"),me("local"))};Z(O=>[...O,{id:`g-${m}`,role:"assistant",text:"Please import a video first to use AI editing.",openMedia:U}]);return}}E(!0),Se("parse"),Ie(!1);try{const{executeAiEdit:y,executeStructuredAiActions:J}=await Be(async()=>{const{executeAiEdit:h,executeStructuredAiActions:A}=await import("./B2nv5XjD.js");return{executeAiEdit:h,executeStructuredAiActions:A}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2])),U={duration:ot,hasAudio:_.some(h=>h.type==="audio"||h.type==="video"&&h.file),clipCount:_.length,currentTime:L.currentTime,hasCaptions:_.some(h=>h.isCaption),filters:[...new Set(_.filter(h=>h.filterName).map(h=>h.filterName))].join(",")||void 0,tracks:_.reduce((h,A)=>Math.max(h,(A.track||0)+1),0)},O=W.slice(-10).map(h=>({role:h.role,content:h.role==="assistant"&&h.actions?.length?`[Actions: ${h.actions.join(", ")}] ${h.text}`:h.text})),ie=JSON.parse(JSON.stringify(_.map(h=>{const{file:A,...B}=h;return B}))),xe=new Map(_.filter(h=>h.file).map(h=>[h.id,h.file])),Y={history:O,onSlowResponse:()=>Ie(!0),onProgress:Se},ye={clips:_,setClips:re,updateClip:Ue,addClip:h=>{re(A=>[...A,{...ba,id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...h}])},getClips:()=>vt.current,splitClip:qt,selectedClipId:Pe,mediaItems:Ae},je=c.structuredActions?await J(c.structuredActions,ye,{onProgress:Se}):await y(r,U,ye,Y);if(je.isChat)Z(h=>[...h,{id:`a-${Date.now()}`,role:"assistant",text:je.summary}]);else{const h=`ai-${Date.now()}`;ve.current.push({id:h,snapshot:ie,filesMap:xe});const A={id:`a-${Date.now()}`,role:"assistant",text:je.summary||"Done!",actions:je.actionLabels||[],applied:je.applied||[],failed:je.failed||[],skipped:je.skipped||[],undoScope:`Undoes all changes from this AI command (${(je.applied||[]).length} action${(je.applied||[]).length===1?"":"s"}).`,canUndo:!0,onUndo:()=>{const B=ve.current.find(ce=>ce.id===h);if(B){const ce=B.snapshot.map(te=>{const Re=B.filesMap.get(te.id);return Re?{...te,file:Re}:te});re(ce),ve.current=ve.current.filter(te=>te.id!==h),Z(te=>te.map(Re=>Re.id===A.id?{...Re,canUndo:!1}:Re)),Z(te=>[...te,{id:`a-${Date.now()}`,role:"assistant",text:"Restored timeline to pre-AI state for that command."}]),$("info","AI edit undone")}}};Z(B=>[...B,A])}}catch(y){const J={id:`e-${Date.now()}`,role:"assistant",text:$a(y)};Z(U=>[...U,J])}finally{E(!1),Se("parse"),Ie(!1)}},[_,re,Ue,qt,Pe,Ae,ot,L.currentTime,W,$a]),Oa=a.useCallback(r=>{if(r?.action){const c=`Apply suggestion: ${r.title}`,m=[{type:r.action,params:r.params||{}}];Mt(c,{structuredActions:m});return}Mt(r.title)},[Mt]),da=a.useCallback(()=>{we(r=>!r),k&&(ft("ai"),N(r=>!r))},[k]),Fa=a.useCallback((r,c,m)=>{const u=m==="mp4"?"mp4":"webm",g=URL.createObjectURL(r),y=document.createElement("a");y.href=g,y.download=`${Fr(c||l)}.${u}`,document.body.appendChild(y),y.click(),document.body.removeChild(y),setTimeout(()=>URL.revokeObjectURL(g),2e3)},[l]),Jo=a.useCallback(()=>{Rt.current&&(Rt.current.abort(),Rt.current=null)},[]),Et=a.useCallback(async(r,c={})=>{if(_.length===0){$("warning","No clips to export. Add media to the timeline first.");return}const m=_.filter(y=>y.type!=="audio"&&y.file).sort((y,J)=>y.startTime-J.startTime);if(m.length===0){$("warning","No video clips with valid files. Make sure your clips are properly loaded.");return}if(xt){_a(y=>[...y,r]),$("info",`Queued export at ${r} (${It.length+1} in queue)`);return}L.isPlaying&&L.setIsPlaying(!1),Ma(!0),Bt(0),be("Preparing export..."),tt("");let u=r;if(r.startsWith("preset:")){const y=r.slice(7),J=na[y];J&&(J.width<=854?u="480p":J.width<=1280?u="720p":u="1080p")}const g=new AbortController;Rt.current=g;try{const y=String(c.format||"webm").toLowerCase()==="mp4"?"mp4":"webm",J=[...m,..._.filter(Y=>Y.type==="text"||Y.type==="sticker")],U=Math.max(...m.map(Y=>Y.startTime+Y.duration)),O=await wr({clips:J,bgMusic:Ve,totalDuration:U,resolution:u,settings:{...c,format:"webm"},onProgress:({percent:Y,elapsed:ye,eta:je,label:h})=>{const A=y==="mp4"?Math.min(70,Math.round(Y*.7)):Y;Bt(A),be(y==="mp4"?"Rendering local preview stream...":h||"Exporting..."),tt(`${A}%  ·  Elapsed ${ye}  ·  ETA ${je}`)},abortSignal:g.signal});if(!O.blob||O.blob.size===0)throw new Error("Export produced an empty file.");let ie=O.blob,xe="webm";if(y==="mp4")if(be("Checking server encoder..."),tt("Validating MP4 export service availability..."),!await yo())$("warning","MP4 server is unavailable right now. Exported WebM locally instead.");else try{be("Uploading to MP4 encoder..."),tt("Uploading render to server for fast MP4 transcode...");const ye=await Cn(O.blob,u,{},je=>{const h=Math.min(98,70+Math.round(je/100*28));Bt(h),be("Server encoding MP4..."),tt(`${h}%  ·  Upload + transcode in progress`)},g.signal);ye&&ye.size>0?(ie=ye,xe="mp4"):$("warning","MP4 conversion returned empty output. Downloaded WebM fallback.")}catch(ye){console.warn("Server MP4 export failed, using local WebM fallback:",ye),$("warning","MP4 export failed on server. Downloaded WebM fallback instead.")}Fa(ie,c.filename||l,xe),$("success",`Exported ${xe.toUpperCase()} at ${u} (${(ie.size/(1024*1024)).toFixed(1)} MB)`)}catch(y){y.message==="Export cancelled."?$("info","Export cancelled."):(console.error("Export error:",y),$("error",y.message||"Export failed. Please try again."))}finally{Ma(!1),Bt(0),be(""),tt(""),Rt.current=null}},[_,l,L,$,Ve,Fa,xt,It,ot]);a.useEffect(()=>{if(!xt&&It.length>0){const[r,...c]=It;_a(c),Et(r)}},[xt,It,Et]);const Qo=a.useCallback(r=>{L.seek(r)},[L]),ua=a.useCallback(()=>{if(!L.currentClip){L.setIsPlaying(!1);return}const c=_.filter(m=>m.type!=="audio").sort((m,u)=>m.startTime-u.startTime).find(m=>m.startTime>L.currentClip.startTime);c&&L.isPlaying?L.seek(c.startTime):L.setIsPlaying(!1)},[L,_]),Zo=a.useCallback(r=>{if(L.currentClip){const c=L.currentClip.trimStart||0,m=c+L.currentClip.duration;if(L.isPlaying&&r>=m-.01){ua();return}const u=L.currentClip.startTime+(r-c);L.isPlaying?L.onVideoTime(u):L.setCurrentTime(u)}else L.isPlaying||L.setCurrentTime(r)},[L,ua]),en=a.useCallback(async r=>{if(!(!r||!ee.isReady)&&!la.current.has(r)){la.current.add(r),yt(!0),be("Converting video to web-compatible format...");try{let c=null,m=null,u=!1;const g=Ae.find(U=>U.blobUrl===r);if(g&&g.file)c=g.file,m=g.id,u=!1;else{const U=_.find(O=>O.blobUrl===r);U&&U.file&&(c=U.file,m=U.id,u=!0)}if(!c){$("error","Could not find source file for conversion");return}const y=await ee.convertToWebFormat(c),J=URL.createObjectURL(y);u?re(U=>U.map(O=>O.id===m?(O.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(O.blobUrl)),{...O,file:y,blobUrl:J}):O)):(Ne(U=>U.map(O=>O.id===m?(O.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(O.blobUrl)),{...O,file:y,blobUrl:J}):O)),re(U=>U.map(O=>O.mediaId===m?(O.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(O.blobUrl)),{...O,file:y,blobUrl:J}):O))),$("success","Video converted successfully")}catch(c){$("error",oa(c,"ffmpeg"))}finally{la.current.delete(r),yt(!1),be(""),ee.resetProgress()}}},[ee,Ae,_,re,$]),Ba=a.useRef(null);a.useEffect(()=>{const r=t.state?.filesToImport;r?.length&&Ba.current!==r&&(Ba.current=r,window.history.replaceState({...t.state,filesToImport:null},""),Ht(r))},[t.state?.filesToImport,Ht]),a.useEffect(()=>{const r=t.state?.projectId,c=t.state?.projectData,m=t.state?.projectName,u=new URLSearchParams(window.location.search).get("project"),g=r||u||null;if(!g||p.current===g||(p.current=g,Ut()&&!i?.id))return;let y=!1;const J=async h=>{const A=h.project_data?.bgMusic;if(!A)return;let B=null,ce=null;if(A.mediaId)try{const te=await St(g,A.mediaId);te&&(B=te.file,ce=te.blobUrl)}catch(te){console.warn("[restoreBgMusic] IndexedDB load failed:",te)}if(!ce&&A.storagePath&&Ut())try{const te=await Ya(A.storagePath),Re=await fetch(te);if(Re.ok){const ae=await Re.blob();B=new File([ae],A.name||"bgm",{type:ae.type}),ce=URL.createObjectURL(ae)}}catch(te){console.warn("[restoreBgMusic] Supabase download failed:",te)}ce&&gt({file:B,name:A.name||"Background",blobUrl:ce,volume:A.volume??.3,storagePath:A.storagePath,mediaId:A.mediaId})},U=h=>{if(!h||!h.startsWith("idb://"))return null;const A=h.slice(6),B=A.lastIndexOf(":");return B<0?null:{idbProjectId:A.slice(0,B),idbMediaId:A.slice(B+1)}},O=h=>h?.startsWith("audio/")?"audio":h?.startsWith("image/")?"image":"video",ie=(h,A,B=null)=>Promise.race([h,new Promise(ce=>setTimeout(()=>ce(B),A))]),xe=async(h,A=[])=>{let B=null,ce=null;const te=h.mediaId||h.id||null;h.name,h.type,h.idbKey,h.storagePath;const Re=U(h.idbKey);if(Re)try{Re.idbProjectId,Re.idbMediaId;const ae=await ie(St(Re.idbProjectId,Re.idbMediaId),2e3);ae?(B=ae.file,ce=ae.blobUrl,h.name,ae.file?.size):console.warn("[restore] IndexedDB MISS (null):",h.idbKey)}catch(ae){console.warn("[restore] IndexedDB load failed:",h.idbKey,ae)}else h.name,h.type;if(!ce&&te)try{const ae=await ie(St(g,te),2e3);ae?(B=ae.file,ce=ae.blobUrl,h.name):console.warn("[restore] Fallback IndexedDB MISS:",g,te)}catch(ae){console.warn("[restore] IndexedDB fallback load failed:",te,ae)}if(!ce&&te)try{const ae=A.find(Fe=>Fe.mediaId===te);if(ae){ae.key;const Fe=await ie(St(ae.projectId,ae.mediaId),2e3);Fe&&(B=Fe.file,ce=Fe.blobUrl)}}catch(ae){console.warn("[restore] IndexedDB scan failed:",ae)}if(!ce&&h.storagePath&&Ut()&&!h.storagePath.startsWith("blob:"))try{h.storagePath;const ae=await ie(Ya(h.storagePath),5e3);if(!ae)throw new Error("Supabase URL timed out");const Fe=new AbortController,pa=setTimeout(()=>Fe.abort(),8e3),_t=await fetch(ae,{signal:Fe.signal});if(clearTimeout(pa),_t.ok){const ut=await _t.blob();B=new File([ut],h.name||"media",{type:ut.type}),ce=URL.createObjectURL(ut),h.name}}catch(ae){console.warn("[restore] Supabase download failed:",h.storagePath,ae)}return!ce&&h.type!=="text"&&console.error("[restore] FAILED to resolve media for:",h.name,h.type,"— all sources exhausted"),{file:B,blobUrl:ce}},Y=/^(draft-|local_)/.test(g),ye=()=>({name:m||"Untitled Project",project_data:{clips:[],mediaItems:[]}});return(async()=>{yt(!0),be("Restoring media...");try{let h=c;if(!h){if(Y)h=ye();else if(!Ut())h=await Ha(g,null);else if(i?.id)try{h=await Ha(g,i.id)}catch(I){if(I?.code==="PGRST116")console.warn("[restore] Supabase has no row for",g,"— attempting IndexedDB-only recovery"),h=ye();else throw I}}if(h||(console.warn("[restore] No project data found for",g,"— attempting IndexedDB-only recovery"),h=ye()),y)return;window.history.replaceState({...t.state,projectId:null,projectData:null,projectName:null},"");const A=m||h.name||"Untitled Project";d(xo(A,{maxLength:100})||"Untitled Project"),s(g),h.resolution&&b(h.resolution);const B=h.project_data?.timelineMarkers??h.timelineMarkers;Ft(Array.isArray(B)?B.filter(I=>I&&typeof I.time=="number"&&Number.isFinite(I.time)&&I.time>=0).map((I,D)=>({id:typeof I.id=="string"&&I.id?I.id:`mk-${D}-${Math.round(I.time*1e3)}`,time:I.time})):[]);const ce=h.project_data?.clips||h.clips||[],te=h.project_data?.mediaItems||[],Re=await ie(Tn(),3e3,[]);if(ce.length,te.length,ce.map(I=>({name:I.name,type:I.type,mediaId:I.mediaId,idbKey:I.idbKey,storagePath:I.storagePath})),te.map(I=>({id:I.id,name:I.name,idbKey:I.idbKey})),ce.length===0&&te.length===0){const I=Re.filter(Me=>Me.projectId===g),D=[];for(const Me of I)try{const Ee=await ie(St(g,Me.mediaId),3e3);if(!Ee)continue;D.push({id:Me.mediaId,name:Me.name||"media",file:Ee.file,blobUrl:Ee.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:O(Me.mime),isProcessing:!1,idbKey:`idb://${g}:${Me.mediaId}`,_mediaError:null})}catch(Ee){console.warn("[recover] load failed for",Me.mediaId,Ee)}if(y)return;await J(h);let oe=0;if(D.length===0){const Me=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,Ee=Re.filter($e=>$e.projectId&&$e.projectId!==g&&!Me.test($e.projectId)),_e=new Set;for(const $e of Ee)if(!_e.has($e.mediaId)){_e.add($e.mediaId);try{const pt=await ie(St($e.projectId,$e.mediaId),3e3);if(!pt)continue;D.push({id:$e.mediaId,name:$e.name||"media",file:pt.file,blobUrl:pt.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:O($e.mime),isProcessing:!1,idbKey:`idb://${$e.projectId}:${$e.mediaId}`,_mediaError:null}),oe++}catch(pt){console.warn("[recover-orphan] load failed for",$e.mediaId,pt)}}oe>0&&console.warn(`[recover-orphan] Surfacing ${oe} orphan media file(s) from stale projectIds`)}if(D.length>0){Ne(D);for(const Ee of D)Ee.type!=="audio"&&(async()=>{try{const _e=await Zt(Ee.file);Ne(fa=>fa.map(rt=>rt.id===Ee.id?{...rt,duration:_e.duration||rt.duration,width:_e.width,height:_e.height}:rt));const $e=await Lt(Ee.file,0),pt=URL.createObjectURL($e);Ne(fa=>fa.map(rt=>rt.id===Ee.id?{...rt,thumbnail:pt}:rt))}catch(_e){console.warn("[recover] metadata regen failed:",Ee.name,_e)}})();x.current=!0;const Me=oe>0?`Surfaced ${oe} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`:`Recovered ${D.length} media file(s) from local cache — re-add them to the timeline, then save`;$("warning",Me);return}x.current=!0,$("info",`Loaded project "${A}" (no clips)`);return}be("Restoring media...");const ae=new Map,Fe=new Map;for(const I of te){const D=I.id||I.mediaId;D&&!Fe.has(D)&&Fe.set(D,I)}for(const I of ce){const D=I.mediaId||I.id;I.type!=="text"&&D&&!Fe.has(D)&&Fe.set(D,I)}tt(`Resolving ${Fe.size} media files...`);const pa=await Promise.all([...Fe.entries()].map(async([I,D])=>{if(y)return null;const oe=await xe(D,Re);return{mediaId:I,resolved:oe,meta:D}}));for(const I of pa){if(!I||y)continue;const{mediaId:D,resolved:oe,meta:Me}=I;oe.blobUrl&&ae.set(D,{blobUrl:oe.blobUrl,file:oe.file,meta:Me})}const _t=[];for(const I of ce){let D=null,oe=null;const Me=I.mediaId||I.id;if(Me&&ae.has(Me)){const _e=ae.get(Me);D=_e.blobUrl,oe=_e.file}const Ee=!D&&I.type!=="text";_t.push({...ba,...I,file:oe||null,blobUrl:D||null,thumbnail:null,_mediaError:Ee?"Media not found — re-import":null})}const ut=new Map;for(const[I,D]of ae){const oe=D.meta||{};ut.set(I,{id:I,name:oe.name||"media",file:D.file,blobUrl:D.blobUrl,thumbnail:null,duration:oe.duration||0,width:oe.width||0,height:oe.height||0,type:oe.type||"video",isProcessing:!1,storagePath:oe.storagePath,_mediaError:null})}const ma=[],Wa=new Set;for(const I of te){const D=I.id||I.mediaId,oe=D?ut.get(D):null;ma.push({id:D,name:I.name||oe?.name||"media",file:oe?.file||null,blobUrl:oe?.blobUrl||null,thumbnail:null,duration:oe?.duration??I.duration??0,width:oe?.width??I.width??0,height:oe?.height??I.height??0,type:I.type||oe?.type||"video",isProcessing:!1,storagePath:I.storagePath||oe?.storagePath,idbKey:I.idbKey,_mediaError:oe?.blobUrl||I.type==="audio"?null:"Media not found — re-import"}),D&&Wa.add(D)}for(const[I,D]of ut)Wa.has(I)||ma.push(D);const At=Mr({restoredClips:_t,mediaItems:ma,projectName:A});Ne(At.mediaItems),re(At.clips),await J(h);for(const I of At.mediaItems)!I.file||I.type==="audio"||(async()=>{try{const D=await Zt(I.file);Ne(Ee=>Ee.map(_e=>_e.id===I.id?{..._e,duration:D.duration||_e.duration,width:D.width,height:D.height}:_e));const oe=await Lt(I.file,0),Me=URL.createObjectURL(oe);Ne(Ee=>Ee.map(_e=>_e.id===I.id?{..._e,thumbnail:Me}:_e))}catch(D){console.warn("[restore] Thumbnail regen failed:",I.name,D)}})();x.current=!0,$(At.notification.level,At.notification.message)}catch(h){console.error("Project load error:",h),$("error","Failed to load project")}finally{y||(yt(!1),be(""),tt(""))}})(),()=>{y=!0}},[i?.id,t.state?.projectId,$,gt,re]),a.useEffect(()=>{ee.preload()},[]),a.useEffect(()=>{const r=c=>{const m=c.ctrlKey||c.metaKey;if(m&&c.shiftKey&&c.key==="E"){c.preventDefault(),da();return}if(c.key==="Escape"&&z){we(!1);return}const u=document.activeElement;if(!(c.target.tagName==="INPUT"||c.target.tagName==="TEXTAREA"||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA"||u?.isContentEditable)){if(c.key==="/"&&z){c.preventDefault(),document.querySelector(".ai-input-box")?.focus();return}if((c.key==="Delete"||c.key==="Backspace")&&Pe){c.preventDefault(),Vt(Pe);return}m&&c.key==="s"&&c.preventDefault(),m&&c.key==="e"&&(c.preventDefault(),_.length>0&&Et("1080p")),m&&c.key==="z"&&(c.preventDefault(),c.shiftKey?dt():kt()),m&&c.key==="y"&&(c.preventDefault(),dt())}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[Et,kt,dt,_.length,L,z,da,Pe,Vt]);const Da=a.useRef(Ae),za=a.useRef(_);return a.useEffect(()=>{Da.current=Ae},[Ae]),a.useEffect(()=>{za.current=_},[_]),a.useEffect(()=>()=>{Da.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl),r.thumbnail&&URL.revokeObjectURL(r.thumbnail)}),za.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl)})},[]),e.jsxs("div",{style:{...et.root,...k?{height:"100dvh",...Q?{paddingBottom:0,paddingRight:"44px"}:{paddingBottom:"56px"}}:{}},role:"application","aria-label":"ClipCut Video Editor",children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("style",{children:Ur}),!k&&e.jsx("a",{href:"#editor-timeline",className:"skip-link",children:"Skip to timeline"}),e.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"},children:xt?`Exporting video... ${Ea}%`:wt||""}),e.jsx(Wn,{projectName:l,onProjectNameChange:d,onExport:Et,isExporting:xt,exportProgress:Ea,currentOperation:wt,hasMediaToExport:_.filter(r=>r.type!=="audio"&&r.file).length>0,resolutions:wo,exportPresets:na,exportSubMessage:Aa,lastSaved:Yo,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,onCancelExport:Jo,onNewProject:Xo,onSave:Go,onSettings:qo,editorLayout:q,onLayoutChange:ne,forceOpenExport:Bo>0,onExportModalClosed:()=>Do(0),onAiToggle:da,aiPanelOpen:z}),!k&&e.jsx(Yn,{activeToolbar:w,onToolbarChange:T}),e.jsxs("main",{"aria-label":"Editor workspace",style:{flex:k?1:q==="wide-timeline"?"0 1 48%":"1 1 0%",display:"flex",flexDirection:k&&Q?"row":k?"column":"row",minWidth:0,minHeight:k?0:"200px",overflow:"hidden",zIndex:0},children:[q!=="compact"&&!k&&e.jsxs(e.Fragment,{children:[e.jsx(mt,{name:"left-panel",inline:!0,message:"Panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${F}px`}),children:e.jsx("div",{style:{width:`${F}px`,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0e1218"},children:e.jsxs("div",{style:{flex:"1 1 0%",overflow:"hidden auto",minHeight:0},className:"cs",children:[w==="media"&&e.jsx(oo,{mediaTab:H,onMediaTabChange:me,mediaItems:Ae,onImportMedia:Ht,onRemoveMedia:La,onAddToTimeline:Kt,selectedMediaId:ct,onSelectMedia:Ot,isImporting:Ia,style:go}),w==="text"&&e.jsx(io,{selectedClip:Oe,onClipUpdate:Ue,onAddClip:nt,currentTime:L.currentTime}),w==="audio"&&e.jsx(so,{selectedClip:Oe,onClipUpdate:Ue,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt}),w==="captions"&&e.jsx(po,{clips:_,onAddClip:nt,onSetClips:re,currentTime:L.currentTime,mediaItems:Ae,selectedClip:Oe,selectedClipId:Pe,onSelectClip:Ze,onClipUpdate:Ue}),w==="stickers"&&e.jsx(lo,{onAddClip:nt,currentTime:L.currentTime}),w==="effects"&&e.jsx(co,{selectedClip:Oe,onClipUpdate:Ue}),w==="transition"&&e.jsx(no,{rightTab:"video",onRightTabChange:P,rightSubTab:"basic",onRightSubTabChange:K,selectedClip:Oe,onClipUpdate:Ue,onAllCaptionsUpdate:Ua,clips:_,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt,style:go}),w==="filters"&&e.jsx(uo,{selectedClip:Oe,onClipUpdate:Ue})]})})})}),e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>$t(r,F),onDoubleClick:()=>Le(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})})]}),e.jsx("div",{style:k&&Q?{flex:"0 0 60%",display:"flex",flexDirection:"column",minWidth:0}:{flex:"1 1 0%",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},children:e.jsx(mt,{name:"player",inline:!0,message:"Video player encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"auto",height:"100%"}),children:e.jsx(Pr,{isPlaying:L.isPlaying,onPlayPause:L.togglePlay,videoSrc:Vo,currentTime:L.clipOffset,duration:ot,onTimeUpdate:Zo,onSeek:Qo,onEnded:ua,onVideoError:en,clipProperties:L.currentClip||Oe,textOverlays:Ho,selectedClipId:Pe,onClipUpdate:Ue,onSelectClip:Ze,hasTimelineClips:_.some(r=>r.type!=="audio"&&r.type!=="text"),hasUnavailableMediaClips:Ko,isRestoringMedia:sa&&wt.includes("Restoring")})})})}),q!=="compact"&&!k&&Oe&&!z&&e.jsxs("div",{className:"inspector-enter",style:{display:"flex",flexDirection:"row",flexShrink:0,width:`${le+8}px`,overflow:"hidden"},children:[e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>Fo(r,le),onDoubleClick:()=>R(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})}),e.jsx(mt,{name:"inspector",inline:!0,message:"Inspector panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${le}px`}),children:e.jsx(no,{rightTab:X,onRightTabChange:P,rightSubTab:v,onRightSubTabChange:K,selectedClip:Oe,onClipUpdate:Ue,onAllCaptionsUpdate:Ua,clips:_,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt,style:{width:`${le}px`}})})})]}),!k&&z&&e.jsx(mt,{name:"ai-chat",inline:!0,message:"AI panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"360px"}),children:e.jsx(mo,{isOpen:z,onClose:()=>we(!1),messages:W,isThinking:ge,thinkingStage:G,slowHint:Ce,onSendMessage:Mt,suggestions:de,onApplySuggestion:Oa})})}),k&&e.jsxs("div",{style:Q?{flex:"0 0 40%",display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden",borderLeft:"1px solid rgba(117,170,219,0.08)"}:{display:"contents"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"44px",padding:"0 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",flexShrink:0},children:[e.jsx("button",{onClick:()=>{const r=document.querySelector(".player-container");r&&(r.requestFullscreen?.()||r.webkitRequestFullscreen?.())},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Fullscreen",children:e.jsx(Te,{i:"fullscreen",s:20,c:"#94a3b8"})}),e.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:"12px",letterSpacing:"0.5px",color:"#e2e8f0",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:to(L.currentTime)}),e.jsx("span",{style:{color:"#475569"},children:"/"}),e.jsx("span",{style:{color:"#94a3b8"},children:to(ot)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2px"},children:[e.jsx("button",{onClick:kt,disabled:!ht,style:{background:"none",border:"none",cursor:ht?"pointer":"not-allowed",opacity:ht?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:18,c:"#94a3b8"})}),e.jsx("button",{onClick:dt,disabled:!bt,style:{background:"none",border:"none",cursor:bt?"pointer":"not-allowed",opacity:bt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:18,c:"#94a3b8"})})]})]}),Pe&&e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"4px",height:"64px",padding:"4px 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",flexShrink:0,transition:"height 0.2s ease, opacity 0.2s ease"},children:[{icon:"volume_off",label:"Mute clip audio",action:()=>Ue(Pe,{volume:Oe?.volume===0?1:0})},{icon:"image",label:"Cover",action:()=>{}},{icon:"music_note",label:"+ Add audio",action:()=>{ft("audio"),N(!0)}},{icon:"title",label:"+ Add text",action:()=>{ft("text"),N(!0)}}].map((r,c)=>e.jsxs("button",{onClick:r.action,style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",padding:"6px 8px",cursor:"pointer",minWidth:"64px",flex:"0 0 auto",minHeight:"44px"},children:[e.jsx(Te,{i:r.icon,s:20,c:"#e2e8f0"}),e.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",whiteSpace:"nowrap",fontFamily:"'Spline Sans', sans-serif"},children:r.label})]},c))}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(ja,{}),children:e.jsx(ro,{id:"editor-timeline",clips:_,selectedClipId:Pe,onSelectClip:Ze,onUpdateClip:Ue,onDeleteClip:Vt,onSplitClip:qt,onAddClip:nt,onRippleDelete:Na,currentTime:L.currentTime,onSeek:L.seek,totalDuration:ot,isProcessing:sa,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ae,onAddToTimeline:Kt,timelineHeight:ue,timelineMarkers:ia,onTimelineMarkersChange:Ft})})})]})]}),k&&e.jsxs(e.Fragment,{children:[e.jsx(Cr,{isOpen:se,onClose:()=>N(!1),children:e.jsx(mt,{name:"mobile-panel",inline:!0,message:"Panel error",children:e.jsxs(a.Suspense,{fallback:e.jsx(jt,{width:"100%",height:"200px"}),children:[Qe==="media"&&e.jsx(oo,{mediaTab:H,onMediaTabChange:me,mediaItems:Ae,onImportMedia:Ht,onRemoveMedia:La,onAddToTimeline:Kt,selectedMediaId:ct,onSelectMedia:Ot,isImporting:Ia}),Qe==="text"&&e.jsx(io,{selectedClip:Oe,onClipUpdate:Ue,onAddClip:nt,currentTime:L.currentTime}),Qe==="audio"&&e.jsx(so,{selectedClip:Oe,onClipUpdate:Ue,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt}),Qe==="captions"&&e.jsx(po,{clips:_,onAddClip:nt,onSetClips:re,currentTime:L.currentTime,mediaItems:Ae,selectedClip:Oe,selectedClipId:Pe,onSelectClip:Ze,onClipUpdate:Ue}),Qe==="stickers"&&e.jsx(lo,{onAddClip:nt,currentTime:L.currentTime}),Qe==="effects"&&e.jsx(co,{selectedClip:Oe,onClipUpdate:Ue}),Qe==="filters"&&e.jsx(uo,{selectedClip:Oe,onClipUpdate:Ue}),Qe==="ai"&&e.jsx(mo,{isOpen:!0,onClose:()=>N(!1),messages:W,isThinking:ge,thinkingStage:G,slowHint:Ce,onSendMessage:Mt,suggestions:de,onApplySuggestion:Oa,isMobile:!0})]})})}),e.jsx("nav",{className:"mobile-tab-bar","aria-label":"Editor tools",children:[{id:"media",icon:"perm_media",label:"Media",tip:"Import and browse media"},{id:"text",icon:"title",label:"Text",tip:"Add manual text overlays"},{id:"captions",icon:"closed_caption",label:"Captions",tip:"Auto-generate subtitles from speech"},{id:"audio",icon:"music_note",label:"Audio",tip:"Background music and clip audio"},{id:"stickers",icon:"emoji_emotions",label:"Stickers",tip:"Drop emoji stickers on the preview"},{id:"effects",icon:"auto_fix_high",label:"Effects",tip:"Apply video effects"},{id:"filters",icon:"filter_vintage",label:"Filters",tip:"Apply colour filters"},{id:"ai",icon:"auto_awesome",label:"AI",tip:"AI editing assistant"}].map(r=>e.jsxs("button",{className:Qe===r.id&&se?"active":"",title:r.tip,"aria-label":r.tip,onClick:()=>{Qe===r.id?N(c=>!c):(ft(r.id),N(!0))},children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:22,color:Qe===r.id&&se?"#75AADB":void 0},children:r.icon}),e.jsx("span",{children:r.label})]},r.id))})]}),!k&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"resize-handle resize-handle-h",onMouseDown:r=>at(r,ue||Lr),onDoubleClick:()=>fe(null),children:e.jsx("div",{className:"resize-handle-dot"})}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(ja,{}),children:e.jsx(ro,{id:"editor-timeline",clips:_,selectedClipId:Pe,onSelectClip:Ze,onUpdateClip:Ue,onDeleteClip:Vt,onSplitClip:qt,onAddClip:nt,onRippleDelete:Na,currentTime:L.currentTime,onSeek:L.seek,totalDuration:ot,isProcessing:sa,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ae,onAddToTimeline:Kt,timelineHeight:ue,timelineMarkers:ia,onTimelineMarkersChange:Ft})})})]}),ee.isLoading&&!ee.currentOperation&&!wt&&e.jsx($o,{progress:ee.loadProgress}),(wt||ee.currentOperation)&&e.jsx(No,{message:wt||"Processing...",progress:ee.currentOperation!=null?ee.progress:ee.loadProgress,operationLabel:ee.currentOperation?`${ee.currentOperation}...`:"",subMessage:Aa,onCancel:ee.currentOperation?ee.cancelOperation:void 0}),zo&&e.jsx(Lo,{onComplete:()=>{Wo(!1),localStorage.setItem("clipcut_onboarded","1")}}),Dt&&e.jsx(Oo,{type:Dt.type,message:Dt.message,onClose:()=>Pa(null),autoClose:Dt.type!=="error"})]})},Kr=a.memo(Vr),yi=Object.freeze(Object.defineProperty({__proto__:null,default:Kr},Symbol.toStringTag,{value:"Module"}));export{ti as A,ba as D,ei as E,Un as F,Te as I,ci as M,Pn as S,ii as T,yi as V,oi as a,ai as b,si as c,bi as d,fi as e,hi as f,xi as g,to as h,di as i,eo as j,gi as k,ri as l,ni as m,li as n,et as s,pi as t,mi as x,ui as z};
