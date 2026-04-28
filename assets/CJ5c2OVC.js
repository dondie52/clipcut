const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HJze1rIC.js","assets/DwQPoapS.js","assets/Bs4D8IiQ.js","assets/Dq9N7q_z.js","assets/C_8A2FPv.js","assets/Et-wlZO3.js","assets/CFdpP9Q-.js","assets/CIAqrFig.js","assets/CCFYaEgy.js","assets/B9CjrYEi.js","assets/CrFPy8FH.js","assets/DcrXmAJC.js","assets/DwC3YSvU.js","assets/fO6SKoYC.js","assets/CFIyAQ4J.js","assets/DXdDEaR_.js","assets/Dgb3-pQw.js","assets/CUzl-lre.js","assets/05yNc_dt.js","assets/CxyQEmj_.js","assets/CG9hRsl_.js","assets/W3q2xmA3.js","assets/CmIeVNDl.js","assets/BEUlQjCE.js","assets/Dh0lx4MY.js","assets/BDu3YrEZ.js","assets/C_NPxlS8.js","assets/D2lZ3orl.js"])))=>i.map(i=>d[i]);
import{g as na,a as Pt,u as ao,D as no,_ as Be,e as Ut,E as mt,A as oo,T as Va,f as Ka,r as ro}from"./Dq9N7q_z.js";import{r as a,j as e,a as io,u as so}from"./DwQPoapS.js";import{f as xn}from"./Et-wlZO3.js";import{u as Ca,a as lo}from"./CFdpP9Q-.js";import{i as yn,l as Ye,w as De,e as Ge,r as Ke,t as He,c as qe,s as Je,a as Xe,b as ha,d as co,f as uo,g as po,h as mo,m as fo,j as ho,E as oa,k as bo,n as go,o as xo,p as yo,q as wo,u as vo,v as ko,R as wn,x as So,y as jo,z as Co,A as To}from"./CIAqrFig.js";import{c as Nt,b as Ha,e as Io,f as St,s as Jt,r as Mo,g as vn,h as Ya}from"./CCFYaEgy.js";import{v as Ro}from"./Bs4D8IiQ.js";import{getWorkerUrl as Eo}from"./CrFPy8FH.js";const Te=a.memo(({i:t,s:o=18,c:i="currentColor",style:r={},filled:s=!1,weight:l=400,...d})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:`${o}px`,color:i,fontVariationSettings:`'FILL' ${s?1:0}, 'wght' ${l}`,transition:"color 0.15s ease",userSelect:"none",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center",...r},"aria-hidden":"true",...d,children:t}));Te.displayName="Icon";const _o=`
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
`,aa=a.memo(({i:t,onClick:o,style:i={},title:r,disabled:s=!1,size:l=18,color:d="#64748b",hoverColor:f="#94a3b8",...b})=>{const[m,y]=a.useState(!1),w=a.useCallback(T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),o?.())},[o]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:_o}),e.jsx("button",{className:"ghost-btn",style:{background:"none",border:"none",cursor:s?"not-allowed":"pointer",padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",opacity:s?.5:1,...i},onClick:s?void 0:o,onKeyDown:w,onMouseEnter:()=>y(!0),onMouseLeave:()=>y(!1),disabled:s,title:r,"aria-label":b["aria-label"]||r,...b,children:e.jsx(Te,{i:t,s:l,c:m&&!s?f:d})})]})});aa.displayName="GhostBtn";const et={root:{width:"100%",maxWidth:"100vw",minWidth:0,minHeight:0,height:"100vh",display:"flex",flexDirection:"column",background:"var(--color-bg-dark, #08090c)",color:"var(--color-text-primary, #f1f5f9)",overflow:"hidden",fontFamily:"'Spline Sans', sans-serif"},ghost:{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all var(--transition-normal, 0.15s ease)"},topBar:{height:"42px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",flexShrink:0,position:"relative",zIndex:3e3},titleInput:{position:"absolute",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid transparent",outline:"none",textAlign:"center",fontSize:"12px",fontWeight:500,color:"#cbd5e1",width:"220px",padding:"5px 14px",borderRadius:"4px",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease"},exportBtn:{marginLeft:"6px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"#0a0a0a",padding:"7px 22px",borderRadius:"6px",fontSize:"11px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.25)",letterSpacing:"0.3px",textTransform:"uppercase"},toolbar:{height:"46px",background:"#0e1218",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",padding:"0 8px",gap:0,flexShrink:0},leftPanel:{width:"280px",minWidth:0,maxWidth:"100%",borderRight:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},importBtn:{width:"100%",background:"rgba(117, 170, 219, 0.03)",border:"1.5px dashed rgba(117, 170, 219, 0.15)",borderRadius:"8px",padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",cursor:"pointer",position:"relative",fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all 0.15s ease"},rightPanel:{width:"320px",minWidth:0,maxWidth:"100%",borderLeft:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},controls:{height:"52px",background:"linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",borderTop:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"relative"},timeline:{flex:"0 0 auto",height:"280px",background:"#08090c",borderTop:"2px solid rgba(117, 170, 219, 0.1)",display:"flex",flexDirection:"column",minHeight:"120px",overflow:"hidden",position:"relative",zIndex:10},tlToolbar:{height:"38px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}},Ao=`
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
`,it=[{id:"media",icon:"folder_open",label:"Media"},{id:"audio",icon:"music_note",label:"Audio"},{id:"text",icon:"text_fields",label:"Text"},{id:"captions",icon:"closed_caption",label:"Captions"},{id:"stickers",icon:"mood",label:"Stickers"},{id:"effects",icon:"auto_fix_high",label:"Effects"},{id:"transition",icon:"layers",label:"Transition"},{id:"filters",icon:"filter_list",label:"Filters"}],Po={PLAY_PAUSE:{key:"Space",description:"Play/Pause"},SKIP_FORWARD:{key:"ArrowRight",description:"Skip forward 5s"},SKIP_BACKWARD:{key:"ArrowLeft",description:"Skip backward 5s"},SKIP_FORWARD_LARGE:{key:"Shift+ArrowRight",description:"Skip forward 10s"},SKIP_BACKWARD_LARGE:{key:"Shift+ArrowLeft",description:"Skip backward 10s"},FRAME_FORWARD:{key:".",description:"Next frame"},FRAME_BACKWARD:{key:",",description:"Previous frame"},GO_TO_START:{key:"Home",description:"Go to start"},GO_TO_END:{key:"End",description:"Go to end"},SPLIT:{key:"S",description:"Split at playhead"},DELETE:{key:"Delete",description:"Delete selected"},DESELECT:{key:"Escape",description:"Deselect"},MUTE:{key:"M",description:"Mute/Unmute"},VOLUME_UP:{key:"ArrowUp",description:"Volume up"},VOLUME_DOWN:{key:"ArrowDown",description:"Volume down"},FULLSCREEN:{key:"F",description:"Toggle fullscreen"},SAVE:{key:"Ctrl+S",description:"Save project"},EXPORT:{key:"Ctrl+E",description:"Export video"},IMPORT:{key:"Ctrl+I",description:"Import media"},TOOLBAR_1:{key:"1",description:"Media panel"},TOOLBAR_2:{key:"2",description:"Audio panel"},TOOLBAR_3:{key:"3",description:"Text panel"},TOOLBAR_4:{key:"4",description:"Stickers panel"},TOOLBAR_5:{key:"5",description:"Effects panel"},TOOLBAR_6:{key:"6",description:"Transitions panel"},TOOLBAR_7:{key:"7",description:"Filters panel"}},Uo=`
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
`,ba={volume:1,isMuted:!1,speed:1,rotation:0,opacity:1,positionX:0,positionY:0,scale:1,brightness:0,contrast:0,saturation:1,temperature:0,filterName:null,filterStrength:50,effects:[],fadeIn:0,fadeOut:0,track:0,trimStart:0,trimEnd:0,colorGrading:{shadows:"#1a1a2e",midtones:"#4a4a5e",highlights:"#ffffff"},transition:null,transitionDuration:1,text:"",textColor:"#ffffff",textSize:48,textPosition:"bottom-center",textBgColor:"",textBold:!1,textItalic:!1,textUnderline:!1,textAlign:"center",textFontFamily:"Spline Sans",textStartTime:0,textDuration:0,textX:null,textY:null},Lo=[{name:"None",filter:null,css:null},{name:"90s",filter:"colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8",css:"sepia(0.3) saturate(0.8)"},{name:"Vintage",filter:"eq=saturation=0.6:brightness=0.05",css:"sepia(0.4) saturate(0.6) brightness(1.05)"},{name:"Cinema",filter:"eq=contrast=1.2:brightness=-0.05:saturation=1.1",css:"contrast(1.2) brightness(0.95) saturate(1.1)"},{name:"B&W",filter:"eq=saturation=0",css:"grayscale(1)"},{name:"Warm",filter:"colortemperature=6500",css:"sepia(0.15) saturate(1.2)"},{name:"Cool",filter:"colortemperature=3500",css:"saturate(0.9) hue-rotate(10deg)"},{name:"Sepia",filter:"colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",css:"sepia(0.8)"}],ti=[{name:"Motion Blur",type:"blur",params:{radius:5},css:"blur(2px)",icon:"blur_on"},{name:"Sharpen",type:"sharpen",params:{strength:1},css:"contrast(1.1)",icon:"deblur"},{name:"Vignette",type:"vignette",params:{},css:null,icon:"vignette"},{name:"Gaussian Blur",type:"blur",params:{radius:10},css:"blur(4px)",icon:"lens_blur"},{name:"Glitch",type:"glitch",params:{intensity:3},css:null,icon:"broken_image"},{name:"Zoom",type:"zoom",params:{factor:1.5},css:null,icon:"zoom_in"},{name:"Shake",type:"shake",params:{intensity:5},css:null,icon:"vibration"},{name:"Flash",type:"flash",params:{duration:.5},css:null,icon:"flash_on"}],ai=[{name:"Fade In",key:"fadeIn",value:1},{name:"Fade Out",key:"fadeOut",value:1},{name:"Scale Up",key:"scaleUp",value:!0},{name:"Slide Left",key:"slideLeft",value:!0}],ni=[{value:null,label:"None",icon:"block"},{value:"fade",label:"Fade",icon:"gradient"},{value:"fadeblack",label:"Fade Black",icon:"brightness_1"},{value:"fadewhite",label:"Fade White",icon:"brightness_7"},{value:"dissolve",label:"Dissolve",icon:"blur_on"},{value:"wipeleft",label:"Wipe Left",icon:"arrow_back"},{value:"wiperight",label:"Wipe Right",icon:"arrow_forward"},{value:"slideup",label:"Slide Up",icon:"arrow_upward"},{value:"slidedown",label:"Slide Down",icon:"arrow_downward"}],oi=[{value:"top-left",label:"Top Left",icon:"north_west"},{value:"top-center",label:"Top",icon:"north"},{value:"top-right",label:"Top Right",icon:"north_east"},{value:"center-left",label:"Left",icon:"west"},{value:"center",label:"Center",icon:"center_focus_strong"},{value:"center-right",label:"Right",icon:"east"},{value:"bottom-left",label:"Bottom Left",icon:"south_west"},{value:"bottom-center",label:"Bottom",icon:"south"},{value:"bottom-right",label:"Bottom Right",icon:"south_east"}],ri=[{emoji:"😀",label:"Grinning",category:"smileys"},{emoji:"😂",label:"Laughing",category:"smileys"},{emoji:"🥹",label:"Touched",category:"smileys"},{emoji:"😍",label:"Heart Eyes",category:"smileys"},{emoji:"🤩",label:"Star Struck",category:"smileys"},{emoji:"😎",label:"Cool",category:"smileys"},{emoji:"🥳",label:"Party",category:"smileys"},{emoji:"😱",label:"Shocked",category:"smileys"},{emoji:"🤔",label:"Thinking",category:"smileys"},{emoji:"😴",label:"Sleeping",category:"smileys"},{emoji:"👍",label:"Thumbs Up",category:"hands"},{emoji:"👎",label:"Thumbs Down",category:"hands"},{emoji:"👏",label:"Clap",category:"hands"},{emoji:"🙌",label:"Raised Hands",category:"hands"},{emoji:"🤝",label:"Handshake",category:"hands"},{emoji:"✌️",label:"Peace",category:"hands"},{emoji:"🤞",label:"Fingers Crossed",category:"hands"},{emoji:"💪",label:"Strong",category:"hands"},{emoji:"❤️",label:"Heart",category:"symbols"},{emoji:"🔥",label:"Fire",category:"symbols"},{emoji:"⭐",label:"Star",category:"symbols"},{emoji:"💯",label:"100",category:"symbols"},{emoji:"✨",label:"Sparkles",category:"symbols"},{emoji:"💥",label:"Boom",category:"symbols"},{emoji:"🎯",label:"Target",category:"symbols"},{emoji:"⚡",label:"Lightning",category:"symbols"},{emoji:"🚀",label:"Rocket",category:"symbols"},{emoji:"💎",label:"Diamond",category:"symbols"},{emoji:"🎬",label:"Clapper",category:"objects"},{emoji:"🎵",label:"Music",category:"objects"},{emoji:"🎤",label:"Mic",category:"objects"},{emoji:"📸",label:"Camera",category:"objects"},{emoji:"🎮",label:"Gaming",category:"objects"},{emoji:"🏆",label:"Trophy",category:"objects"},{emoji:"🎁",label:"Gift",category:"objects"},{emoji:"💡",label:"Idea",category:"objects"},{emoji:"👆",label:"Point Up",category:"arrows"},{emoji:"👇",label:"Point Down",category:"arrows"},{emoji:"👈",label:"Point Left",category:"arrows"},{emoji:"👉",label:"Point Right",category:"arrows"},{emoji:"⬆️",label:"Arrow Up",category:"arrows"},{emoji:"⬇️",label:"Arrow Down",category:"arrows"},{emoji:"🔔",label:"Bell",category:"objects"},{emoji:"💬",label:"Speech",category:"objects"},{emoji:"🏷️",label:"Tag",category:"objects"},{emoji:"📌",label:"Pin",category:"objects"}],ii=[{name:"Title",textSize:64,textColor:"#ffffff",textPosition:"center",textBgColor:"",textBold:!0,textAlign:"center",icon:"title"},{name:"Subtitle",textSize:36,textColor:"#e2e8f0",textPosition:"bottom-center",textBgColor:"",textBold:!1,textAlign:"center",icon:"subtitles"},{name:"Caption",textSize:24,textColor:"#ffffff",textPosition:"bottom-center",textBgColor:"#000000",textBold:!1,textAlign:"center",icon:"closed_caption"},{name:"Lower Third",textSize:28,textColor:"#ffffff",textPosition:"bottom-left",textBgColor:"rgba(0,0,0,0.7)",textBold:!0,textAlign:"left",icon:"video_label"}],si=["Spline Sans","Arial","Georgia","Courier New","Impact","Comic Sans MS","Trebuchet MS","Verdana","Times New Roman"],li=[{label:"0.25x",value:.25},{label:"0.5x",value:.5},{label:"1x",value:1},{label:"1.5x",value:1.5},{label:"2x",value:2}];function No(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,r=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${r(i.getMonth()+1)}-${r(i.getDate())}`}function $o(){if(typeof navigator>"u")return!1;const t=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(t)?!0:navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1}const Ta=`
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
`,Xa=[{key:"low",label:"Low",crf:28},{key:"medium",label:"Medium",crf:23},{key:"high",label:"High",crf:18},{key:"ultra",label:"Ultra",crf:15}],Oo=[{key:"webm",label:"WebM"},{key:"mp4",label:"MP4 (via server)"}],Fo=[24,30,60],Bo=a.memo(({items:t,selected:o,onSelect:i,style:r})=>e.jsx("div",{style:{display:"flex",gap:"4px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"3px",...r},children:t.map(s=>e.jsx("button",{onClick:()=>i(s.key||s),style:{flex:1,padding:"6px 8px",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",background:(s.key||s)===o?"rgba(117,170,219,0.15)":"transparent",color:(s.key||s)===o?"#75aadb":"#64748b"},children:s.label||s},s.key||s))}));Bo.displayName="PillGroup";const kn=a.memo(({isOpen:t,onClose:o,onExport:i,isExporting:r,progress:s,operationLabel:l="Processing",subMessage:d="",resolutions:f,exportPresets:b={},onCancel:m,projectName:y="Untitled",exportResult:w,onDownload:T,onExportAnother:q})=>{const[U,v]=a.useState("480p"),[Y,X]=a.useState("resolution"),[me,Q]=a.useState("youtube-1080p"),[re,k]=a.useState("webm"),[Z,se]=a.useState("medium"),[$,V]=a.useState(30),[we,K]=a.useState(""),[ee,xe]=a.useState(null);a.useEffect(()=>{t&&!we&&K(No(y))},[t,y]);const E=$o();if(a.useEffect(()=>{if(!t)return;const j=M=>{M.key==="Escape"&&!r&&o()};return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)},[t,r,o]),a.useEffect(()=>{if(!t)return;const M=document.getElementById("export-modal")?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');M?.length&&M[0].focus()},[t]),a.useEffect(()=>{if(!t)return;let j=!0;return xe(null),yn().then(M=>{j&&xe(!!M)}).catch(()=>{j&&xe(!1)}),()=>{j=!1}},[t]),!t)return null;const J=j=>{j.target===j.currentTarget&&!r&&!w&&o()};f?.[U];const Se=Xa.find(j=>j.key===Z),Ce=[re.toUpperCase(),U,`${$}fps`],Ie=Y==="platform"?b[me]?.label:Ce.join(" · "),de=()=>{const j=Y==="platform"?`preset:${me}`:U;i(j,{format:re,quality:Se?.crf,fps:$,filename:we||y})},ze=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hud-body",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Container · Codec"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Output format",children:Oo.map(j=>e.jsx("button",{className:re===j.key?"is-active":"",onClick:()=>k(j.key),role:"radio","aria-checked":re===j.key,children:j.label},j.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Target"}),e.jsxs("div",{className:"hud-segment",role:"radiogroup","aria-label":"Target mode",children:[e.jsx("button",{className:Y==="resolution"?"is-active":"",onClick:()=>X("resolution"),role:"radio","aria-checked":Y==="resolution",children:"By Resolution"}),e.jsx("button",{className:Y==="platform"?"is-active":"",onClick:()=>X("platform"),role:"radio","aria-checked":Y==="platform",children:"By Platform"})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Signal"}),Y==="resolution"?e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Resolution",children:Object.entries(f).map(([j,{label:M,width:H,height:S}])=>{const C=U===j;return e.jsxs("button",{className:`hud-row-item ${C?"is-active":""}`,onClick:()=>v(j),role:"radio","aria-checked":C,children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsx("span",{className:"hud-row-name",children:M}),e.jsxs("span",{className:"hud-row-spec",children:[H,"×",S]}),e.jsxs("span",{className:"hud-row-spec",style:{color:C?"#75AADB":"rgba(255,255,255,0.34)"},children:[Math.round(H*S/1e4)/100,"MP"]})]},j)})}):e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Platform",children:Object.entries(b).map(([j,M])=>{const H=me===j;return e.jsxs("button",{className:`hud-row-item ${H?"is-active":""}`,onClick:()=>Q(j),role:"radio","aria-checked":H,style:{gridTemplateColumns:"18px 1fr auto"},children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsxs("span",{className:"hud-row-name",children:[M.label,e.jsx("span",{className:"hud-row-sub",style:{gridColumn:"unset",display:"block",marginTop:3},children:M.description})]}),e.jsxs("span",{className:"hud-row-spec",children:[M.width,"×",M.height]})]},j)})})]}),e.jsxs("div",{className:"hud-row-split",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Quality (CRF)"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Quality",children:Xa.map(j=>e.jsx("button",{className:Z===j.key?"is-active":"",onClick:()=>se(j.key),role:"radio","aria-checked":Z===j.key,title:`CRF ${j.crf}`,children:j.label},j.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Frame Rate"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Frame rate",children:Fo.map(j=>e.jsxs("button",{className:$===j?"is-active":"",onClick:()=>V(j),role:"radio","aria-checked":$===j,children:[j,"fps"]},j))})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Filename"}),e.jsx("input",{type:"text",className:"hud-input",value:we,onChange:j=>K(j.target.value),"aria-label":"Export filename",placeholder:"clipcut-export"})]}),e.jsxs("div",{className:"hud-summary",role:"status",children:[e.jsx("span",{className:"hud-summary-dot","aria-hidden":"true"}),e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsxs("div",{className:"hud-summary-text",children:["Ready · ",Ie]}),re==="webm"&&!E&&e.jsx("div",{className:"hud-summary-note",children:"WebM plays on most devices. For iPhone Photos compatibility, choose MP4."}),re==="webm"&&E&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead."}),re==="mp4"&&e.jsxs("div",{className:"hud-summary-note hud-summary-note--warn",children:[ee==null&&"Checking MP4 server availability...",ee===!0&&"MP4 server is online. Export will render locally, then transcode to MP4 on server.",ee===!1&&"MP4 server is currently unavailable. Export will fall back to local WebM."]})]})]})]}),e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Cancel"}),e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:de,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Render · Export"]})]})]}),ve=()=>{const j=Math.max(0,Math.min(100,Math.round(s)));return e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-progress",children:[e.jsxs("div",{className:"hud-big-readout","aria-live":"polite","aria-atomic":"true",children:[String(j).padStart(2,"0"),e.jsx("span",{className:"pct",children:"%"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hud-op-label",children:l||"Rendering"}),d&&e.jsx("div",{className:"hud-op-sub",children:d})]}),e.jsxs("div",{className:"hud-filmstrip",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":j,children:[e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--top","aria-hidden":"true",children:Array.from({length:24}).map((M,H)=>e.jsx("span",{style:{animationDelay:`${(H*.05).toFixed(2)}s`}},H))}),e.jsx("div",{className:"hud-filmstrip-fill",style:{width:`${j}%`}}),e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--bottom","aria-hidden":"true",children:Array.from({length:24}).map((M,H)=>e.jsx("span",{style:{animationDelay:`${(H*.05+.1).toFixed(2)}s`}},H))})]}),e.jsxs("div",{className:"hud-telemetry","aria-label":"Telemetry",children:[e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Format"}),e.jsx("span",{className:"hud-telemetry-value",children:re.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Signal"}),e.jsx("span",{className:"hud-telemetry-value",children:Y==="platform"?b[me]?.label||"—":U.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Frame Rate"}),e.jsxs("span",{className:"hud-telemetry-value",children:[$,"fps"]})]})]})]})})},pe=()=>m?e.jsx("div",{className:"hud-actions",style:{justifyContent:"center"},children:e.jsx("button",{type:"button",className:"hud-btn hud-btn--danger",onClick:m,children:"Abort render"})}):null,ue=()=>e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-complete",children:[e.jsxs("div",{className:"hud-complete-stamp",children:[e.jsx("span",{className:"led","aria-hidden":"true"}),"Export complete · Signal locked"]}),e.jsx("h3",{className:"hud-complete-title",children:"Your file is ready."}),w?.size&&e.jsxs("span",{className:"hud-complete-file",children:[(w.size/(1024*1024)).toFixed(1)," MB · ",re.toUpperCase()]})]})}),he=()=>e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Close"}),q&&e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:q,children:"Export another"}),T&&e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:T,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Download"]})]}),ke=w?"hud-head-led hud-head-led--green":r?"hud-head-led hud-head-led--amber":"hud-head-led",Le=w?"Complete":r?"Rendering":"Standby";return e.jsxs("div",{className:"hud-backdrop",onClick:J,role:"dialog","aria-modal":"true","aria-labelledby":"export-modal-title",children:[e.jsx("style",{children:Ta}),e.jsxs("div",{id:"export-modal",className:"hud-console",children:[e.jsxs("div",{className:"hud-head",children:[e.jsxs("div",{className:"hud-head-left",children:[e.jsx("span",{className:ke,"aria-hidden":"true"}),e.jsxs("h2",{id:"export-modal-title",className:"hud-head-title",children:[e.jsx("span",{children:"CC · EXPORT"}),e.jsx("span",{className:"sep",children:"//"}),e.jsx("span",{className:"ch-id",children:Le.toUpperCase()})]})]}),!r&&!w&&e.jsx("button",{onClick:o,className:"hud-head-close","aria-label":"Close export dialog",title:"Close (Escape)",children:e.jsx(Te,{i:"close",s:16,c:"currentColor"})})]}),w?ue():r?ve():ze(),!r&&!w&&null,r&&pe(),w&&he()]})]})});kn.displayName="ExportModal";const Do={Playback:["PLAY_PAUSE","SKIP_FORWARD","SKIP_BACKWARD","SKIP_FORWARD_LARGE","SKIP_BACKWARD_LARGE","FRAME_FORWARD","FRAME_BACKWARD","GO_TO_START","GO_TO_END"],Editing:["SPLIT","DELETE","DESELECT"],Audio:["MUTE","VOLUME_UP","VOLUME_DOWN"],View:["FULLSCREEN"],File:["SAVE","EXPORT","IMPORT"]},Sn=a.memo(({isOpen:t,onClose:o})=>(a.useEffect(()=>{if(!t)return;const i=r=>{r.key==="Escape"&&o()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[t,o]),t?e.jsxs("div",{className:"shortcuts-modal-backdrop",onClick:i=>i.target===i.currentTarget&&o(),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3500,backdropFilter:"blur(4px)"},role:"dialog","aria-modal":"true","aria-labelledby":"shortcuts-modal-title",children:[e.jsx("style",{children:Ta}),e.jsxs("div",{className:"shortcuts-modal-content",style:{background:"#1a2332",borderRadius:"12px",padding:"24px",width:"520px",maxWidth:"90vw",maxHeight:"80vh",overflow:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[e.jsxs("h2",{id:"shortcuts-modal-title",style:{margin:0,fontSize:"18px",fontWeight:600,color:"white",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Te,{i:"keyboard",s:22,c:"#75aadb"}),"Keyboard Shortcuts"]}),e.jsx("button",{onClick:o,style:{...et.ghost,padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":"Close shortcuts dialog",children:e.jsx(Te,{i:"close",s:20,c:"#94a3b8"})})]}),Object.entries(Do).map(([i,r])=>e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{fontSize:"11px",color:"#75aadb",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,margin:"0 0 10px 0"},children:i}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:r.map(s=>{const l=Po[s];return l?e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:"6px",background:"rgba(255,255,255,0.02)"},children:[e.jsx("span",{style:{fontSize:"13px",color:"#cbd5e1"},children:l.description}),e.jsx("span",{className:"shortcut-key",children:l.key})]},s):null})})]},i))]})]}):null));Sn.displayName="KeyboardShortcutsModal";const zo=[{id:"new",icon:"add",label:"New Project",shortcut:null},{id:"save",icon:"save",label:"Save",shortcut:"Ctrl+S"},{id:"divider1"},{id:"export",icon:"download",label:"Export",shortcut:"Ctrl+E"},{id:"divider2"},{id:"settings",icon:"settings",label:"Settings",shortcut:null}],jn=a.memo(({isOpen:t,onClose:o,onNewProject:i,onSave:r,onExport:s,onSettings:l,hasMediaToExport:d})=>{const f=a.useRef(null);if(a.useEffect(()=>{if(!t)return;const m=w=>{f.current&&!f.current.contains(w.target)&&o()},y=w=>{w.key==="Escape"&&o()};return requestAnimationFrame(()=>{document.addEventListener("mousedown",m),document.addEventListener("keydown",y)}),()=>{document.removeEventListener("mousedown",m),document.removeEventListener("keydown",y)}},[t,o]),!t)return null;const b=m=>{switch(o(),m){case"new":i?.();break;case"save":r?.();break;case"export":d&&s?.();break;case"settings":l?.();break}};return e.jsx("div",{ref:f,className:"menu-dropdown",role:"menu",style:{position:"absolute",top:"100%",left:0,marginTop:"4px",background:"#1a2332",borderRadius:"8px",padding:"4px",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",minWidth:"200px",zIndex:100},children:zo.map(m=>{if(m.id.startsWith("divider"))return e.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0"}},m.id);const y=m.id==="export"&&!d;return e.jsxs("button",{className:"menu-dropdown-item",role:"menuitem",onClick:()=>!y&&b(m.id),style:{...et.ghost,display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"6px",width:"100%",textAlign:"left",color:y?"#475569":"#cbd5e1",cursor:y?"not-allowed":"pointer",opacity:y?.5:1,fontSize:"13px",fontFamily:"'Spline Sans', sans-serif"},disabled:y,children:[e.jsx(Te,{i:m.icon,s:16,c:y?"#475569":"#94a3b8"}),e.jsx("span",{style:{flex:1},children:m.label}),m.shortcut&&e.jsx("span",{style:{fontSize:"11px",color:"#475569",fontFamily:"'SF Mono', Monaco, monospace"},children:m.shortcut})]},m.id)})})});jn.displayName="MenuDropdown";const Wo=({projectName:t,onProjectNameChange:o,onExport:i,isExporting:r=!1,exportProgress:s=0,currentOperation:l="",hasMediaToExport:d=!1,resolutions:f={},exportPresets:b={},lastSaved:m=null,canUndo:y=!1,canRedo:w=!1,onUndo:T,onRedo:q,onCancelExport:U,exportSubMessage:v="",onNewProject:Y,onSave:X,onSettings:me,editorLayout:Q="default",onLayoutChange:re,forceOpenExport:k=!1,onExportModalClosed:Z,onAiToggle:se,aiPanelOpen:$=!1})=>{const V=Ca(),[we,K]=a.useState(!1),[ee,xe]=a.useState(!1),[E,J]=a.useState(!1),[Se,Ce]=a.useState(!1),Ie=a.useRef(null);a.useEffect(()=>{const M=H=>{H.target.tagName==="INPUT"||H.target.tagName==="TEXTAREA"||(H.key==="?"||H.shiftKey&&H.key==="/")&&(H.preventDefault(),Ce(S=>!S))};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[]),a.useEffect(()=>{k&&d&&!r&&(K(!0),Z?.())},[k,d,r,Z]);const de=a.useCallback(()=>{r||(d?K(!0):console.warn("Export not available:",{hasMediaToExport:d,isExporting:r}))},[d,r]),ze=a.useCallback((M,H)=>{i?.(M,H)},[i]),ve=a.useCallback(()=>{r||(K(!1),ke(null))},[r]),pe=a.useCallback(M=>{const H=xn(M.target.value,{maxLength:100});o(H)},[o]),ue=a.useCallback(M=>{(M.key==="Enter"||M.key==="Escape")&&M.target.blur()},[]),[he,ke]=a.useState(null);a.useEffect(()=>{!r&&s>=100&&we&&!he&&ke({size:null}),we||ke(null)},[r,s,we,he]);const[Le,j]=a.useState("");return a.useEffect(()=>{const M=()=>{j(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}))};M();const H=setInterval(M,6e4);return()=>clearInterval(H)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ta}),e.jsxs("header",{style:{...et.topBar,...V?{height:"44px",padding:"0 10px"}:{}},role:"banner","aria-label":"ClipCut editor header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsxs("div",{className:"logo-container",style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},role:"img","aria-label":"ClipCut logo",children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(117, 170, 219, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Te,{i:"movie_edit",s:18,c:"#75aadb"})}),!V&&e.jsx("span",{style:{fontWeight:700,fontSize:"15px",letterSpacing:"-0.3px",color:"white"},children:"ClipCut"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginLeft:"8px",fontSize:"11px"},children:[e.jsxs("div",{ref:Ie,style:{position:"relative"},children:[e.jsx("button",{className:"menu-btn",onClick:()=>J(M=>!M),style:{...et.ghost,display:"flex",alignItems:"center",gap:"2px",color:E?"#75aadb":"#94a3b8"},"aria-haspopup":"menu","aria-expanded":E,"aria-label":"Open menu",children:V?e.jsx(Te,{i:"menu",s:18}):e.jsxs(e.Fragment,{children:["Menu ",e.jsx(Te,{i:"arrow_drop_down",s:16})]})}),e.jsx(jn,{isOpen:E,onClose:()=>J(!1),onNewProject:Y,onSave:X,onExport:de,onSettings:me,hasMediaToExport:d})]}),!V&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("button",{onClick:T,disabled:!y,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:y?1:.4,cursor:y?"pointer":"not-allowed"},title:"Undo (Ctrl+Z)","aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:14,c:y?"#94a3b8":"#475569"})}),e.jsx("button",{onClick:q,disabled:!w,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:w?1:.4,cursor:w?"pointer":"not-allowed"},title:"Redo (Ctrl+Shift+Z or Ctrl+Y)","aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:14,c:w?"#94a3b8":"#475569"})})]}),!V&&m&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Last saved at ${m.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}`,title:`Last saved: ${m.toLocaleString()}`,children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Saved ",m.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]}),!V&&!m&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":"Auto save at current time",children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Auto save at ",Le]})]})]}),e.jsx("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:e.jsx("input",{type:"text",value:t,onChange:pe,onFocus:()=>xe(!0),onBlur:()=>xe(!1),onKeyDown:ue,className:"title-input",style:{...et.titleInput,position:"relative",left:"auto",transform:"none",border:"1px solid transparent",width:V?"120px":"220px",pointerEvents:"auto"},"aria-label":"Project name",title:"Click to edit project name"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:V?"4px":"8px"},children:[se&&e.jsx(aa,{i:"auto_awesome",title:"AI Editor","aria-label":$?"Close AI editor":"Open AI editor",onClick:se,style:$?{color:"#75aadb",background:"rgba(117,170,219,0.12)"}:void 0}),!V&&e.jsx(aa,{i:"keyboard",title:"Keyboard shortcuts","aria-label":"Show keyboard shortcuts",onClick:()=>Ce(!0)}),!V&&e.jsx(aa,{i:Q==="default"?"grid_view":Q==="wide-timeline"?"view_agenda":"view_compact",title:`Layout: ${Q}`,"aria-label":"Cycle layout",onClick:()=>{const M=["default","wide-timeline","compact"],H=M.indexOf(Q);re?.(M[(H+1)%M.length])}}),e.jsxs("button",{onClick:de,className:V?"":"export-btn",style:{...V?{background:d&&!r?"#22c55e":"rgba(34,197,94,0.5)",border:"none",borderRadius:"20px",padding:"6px 14px",fontSize:"12px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Spline Sans', sans-serif",cursor:d&&!r?"pointer":"not-allowed",minHeight:"32px",minWidth:"auto",transition:"all 0.2s ease"}:{...et.exportBtn,opacity:d&&!r?1:.5,cursor:d&&!r?"pointer":"not-allowed"}},disabled:!d||r,"aria-label":r?"Exporting...":d?"Export video":"Add media to timeline to export",title:r?"Export in progress...":d?"Export video (Ctrl+E)":"Add media to timeline first",children:[e.jsx(Te,{i:"download",s:14,c:V?"#fff":"#0a0a0a"}),r?"Exporting...":"Export"]})]})]}),e.jsx(kn,{isOpen:we,onClose:ve,onExport:ze,isExporting:r,progress:s,operationLabel:l||"Exporting video...",subMessage:v,resolutions:f,exportPresets:b,onCancel:r?U:void 0,projectName:t,exportResult:he,onDownload:he?ve:void 0,onExportAnother:he?()=>ke(null):void 0}),e.jsx(Sn,{isOpen:Se,onClose:()=>Ce(!1)})]})},Vo=a.memo(Wo),Ko=`
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
`,Cn=a.memo(({item:t,isActive:o,onClick:i,shortcut:r,compact:s})=>{const[l,d]=a.useState(!1),f=a.useCallback(b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i(t.id))},[t.id,i]);return e.jsxs("button",{onClick:()=>i(t.id),onKeyDown:f,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),className:`toolbar-btn ${o?"active":""}`,style:{...et.ghost,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:s?"6px 10px":"6px 14px",flexShrink:0,color:o?"#75aadb":l?"#94a3b8":"#4a5568"},role:"tab","aria-selected":o,"aria-label":`${t.label} panel`,tabIndex:o?0:-1,children:[e.jsx("span",{className:"toolbar-icon",children:e.jsx(Te,{i:t.icon,s:20,c:o?"#75aadb":l?"#94a3b8":"#4a5568"})}),e.jsx("span",{style:{fontSize:"8px",fontWeight:o?700:600,textTransform:"uppercase",letterSpacing:"1px",transition:"color 0.15s ease"},children:t.label}),e.jsxs("div",{className:"toolbar-tooltip",children:[t.label,r&&e.jsx("span",{className:"toolbar-shortcut",children:r})]})]})});Cn.displayName="ToolbarButton";const Ho={media:"1",audio:"2",text:"3",stickers:"4",effects:"5",transition:"6",filters:"7"},Yo=({activeToolbar:t,onToolbarChange:o})=>{const i=Ca(),r=a.useCallback(s=>{const l=it.findIndex(d=>d.id===t);if(s.key==="ArrowRight"){s.preventDefault();const d=(l+1)%it.length;o(it[d].id)}else if(s.key==="ArrowLeft"){s.preventDefault();const d=l===0?it.length-1:l-1;o(it[d].id)}else if(s.key>="1"&&s.key<="7"){s.preventDefault();const d=parseInt(s.key)-1;it[d]&&o(it[d].id)}},[t,o]);return e.jsxs("nav",{style:{...et.toolbar,...i?{overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Editor tools",onKeyDown:r,children:[e.jsx("style",{children:Ko}),it.map(s=>e.jsx(Cn,{item:s,isActive:t===s.id,onClick:o,shortcut:Ho[s.id],compact:i},s.id))]})},Xo=a.memo(Yo);async function Tn(t,o,i=.3,r=null){await Ye(),r&&Je(r);const s="input_video.mp4",l="input_audio.mp3",d="output_mixed.mp4";try{await De(s,t),await De(l,o),await Ge(["-i",s,"-i",l,"-filter_complex",`[1:a]volume=${i}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k",d]);const f=await Ke(d);return He(f,"video/mp4")}finally{Xe(),await qe([s,l,d])}}async function Go(t,o,i=null){await Ye(),i&&Je(i);const r="input_video.mp4",s="input_audio.mp3",l="output_replaced.mp4";try{await De(r,t),await De(s,o),await Ge(["-i",r,"-i",s,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",l]);const d=await Ke(l);return He(d,"video/mp4")}finally{Xe(),await qe([r,s,l])}}async function In(t,o=1,i=null){await Ye(),i&&Je(i);const r="input_volume.mp4",s="output_volume.mp4";try{await De(r,t),await Ge(["-i",r,"-af",`volume=${o}`,"-c:v","copy","-c:a","aac","-b:a","192k",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([r,s])}}async function Mn(t,o=null){await Ye(),o&&Je(o);const i="input_mute.mp4",r="output_mute.mp4";try{await De(i,t),await Ge(["-i",i,"-c:v","copy","-an",r]);const s=await Ke(r);return He(s,"video/mp4")}finally{Xe(),await qe([i,r])}}async function Rn(t,o="mp3",i=null){await Ye(),i&&Je(i);const r="input_extract.mp4",s=`output_extract.${o}`,l={mp3:"audio/mpeg",aac:"audio/aac",wav:"audio/wav"},d={mp3:["-c:a","libmp3lame","-b:a","192k"],aac:["-c:a","aac","-b:a","192k"],wav:["-c:a","pcm_s16le"]};try{await De(r,t),await Ge(["-i",r,"-vn",...d[o]||d.mp3,s]);const f=await Ke(s);return He(f,l[o]||"audio/mpeg")}finally{Xe(),await qe([r,s])}}async function qo(t,o=null){await Ye(),o&&Je(o);const i="input_normalize.mp4",r="output_normalize.mp4";try{await De(i,t),await Ge(["-i",i,"-af","loudnorm=I=-16:LRA=11:TP=-1.5","-c:v","copy","-c:a","aac","-b:a","192k",r]);const s=await Ke(r);return He(s,"video/mp4")}finally{Xe(),await qe([i,r])}}async function Jo(t,o=0,i=0,r=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",d="output_fade.mp4";try{await De(l,t);const f=[];if(o>0&&f.push(`afade=t=in:st=0:d=${o}`),i>0&&r){const w=r-i;f.push(`afade=t=out:st=${w}:d=${i}`)}const b=f.join(","),m=["-i",l,"-c:v","copy"];b?(m.push("-af",b),m.push("-c:a","aac","-b:a","192k")):m.push("-c:a","copy"),m.push(d),await Ge(m);const y=await Ke(d);return He(y,"video/mp4")}finally{Xe(),await qe([l,d])}}const ci=Object.freeze(Object.defineProperty({__proto__:null,adjustVolume:In,extractAudio:Rn,fadeAudio:Jo,mixAudio:Tn,muteAudio:Mn,normalizeAudio:qo,replaceAudio:Go},Symbol.toStringTag,{value:"Module"})),Sa={"top-left":{x:"10",y:"10"},"top-center":{x:"(w-text_w)/2",y:"10"},"top-right":{x:"w-text_w-10",y:"10"},"center-left":{x:"10",y:"(h-text_h)/2"},center:{x:"(w-text_w)/2",y:"(h-text_h)/2"},"center-right":{x:"w-text_w-10",y:"(h-text_h)/2"},"bottom-left":{x:"10",y:"h-text_h-10"},"bottom-center":{x:"(w-text_w)/2",y:"h-text_h-10"},"bottom-right":{x:"w-text_w-10",y:"h-text_h-10"}},En=["fade","fadeblack","fadewhite","dissolve","pixelize","wipeleft","wiperight","wipeup","wipedown","slideleft","slideright","slideup","slidedown"];async function Qo(t,o,i={},r=null){await Ye(),r&&Je(r);const{position:s="bottom-center",fontSize:l=48,fontColor:d="white",backgroundColor:f=null,startTime:b=0,duration:m=0}=i,y="input_text.mp4",w="output_text.mp4";try{await De(y,t);const T=typeof s=="string"?Sa[s]||Sa["bottom-center"]:s;let U=`drawtext=text='${o.replace(/'/g,"'\\''").replace(/:/g,"\\:").replace(/\\/g,"\\\\")}':fontsize=${l}:fontcolor=${d}:x=${T.x}:y=${T.y}`;if(f&&(U+=`:box=1:boxcolor=${f}:boxborderw=5`),b>0||m>0){const Y=m>0?`between(t,${b},${b+m})`:`gte(t,${b})`;U+=`:enable='${Y}'`}await Ge(["-i",y,"-vf",U,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",w]);const v=await Ke(w);return He(v,"video/mp4")}finally{Xe(),await qe([y,w])}}async function Zo(t,o,i="fade",r=1,s=null){await Ye(),s&&Je(s);const l=En.includes(i)?i:"fade",d="input_trans_1.mp4",f="input_trans_2.mp4",b="output_transition.mp4";try{await De(d,t),await De(f,o);const m=await er(t),y=Math.max(0,m-r);await Ge(["-i",d,"-i",f,"-filter_complex",`[0:v][1:v]xfade=transition=${l}:duration=${r}:offset=${y}[v];[0:a][1:a]acrossfade=d=${r}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",b]);const w=await Ke(b);return He(w,"video/mp4")}finally{Xe(),await qe([d,f,b])}}async function er(t){return new Promise((o,i)=>{const r=document.createElement("video");r.preload="metadata",r.onloadedmetadata=()=>{URL.revokeObjectURL(r.src),o(r.duration)},r.onerror=()=>{URL.revokeObjectURL(r.src),i(new Error("Failed to load video"))},r.src=URL.createObjectURL(t)})}async function st(t,o,i=null){if(typeof o!="string"||!/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(o))throw new Error("Invalid FFmpeg filter string");await Ye(),i&&Je(i);const r="input_filter.mp4",s="output_filter.mp4";try{await De(r,t),await Ge(["-i",r,"-vf",o,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([r,s])}}async function tr(t,o=0,i=0,r=null){const s=`eq=brightness=${o}:contrast=${1+i}`;return st(t,s,r)}async function ar(t,o=1,i=null){const r=`eq=saturation=${o}`;return st(t,r,i)}async function nr(t,o=5,i=null){const r=`boxblur=${o}:${o}`;return st(t,r,i)}async function or(t,o=1,i=null){const r=`unsharp=5:5:${o}:5:5:0`;return st(t,r,i)}async function rr(t,o=1,i=null){await Ye(),i&&Je(i);const r="input_speed.mp4",s="output_speed.mp4",l=Math.max(.25,Math.min(4,o));try{await De(r,t);const d=`setpts=${1/l}*PTS`;let f="";if(l<=2&&l>=.5)f=`atempo=${l}`;else if(l>2){const m=Math.ceil(Math.log(l)/Math.log(2)),y=Math.pow(l,1/m);f=Array(m).fill(`atempo=${y}`).join(",")}else{const m=Math.ceil(Math.log(1/l)/Math.log(2)),y=Math.pow(l,1/m);f=Array(m).fill(`atempo=${y}`).join(",")}await Ge(["-i",r,"-filter_complex",`[0:v]${d}[v];[0:a]${f}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",s]);const b=await Ke(s);return He(b,"video/mp4")}finally{Xe(),await qe([r,s])}}async function ir(t,o=0,i=0,r=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",d="output_fade.mp4";try{await De(l,t);const f=[];if(o>0&&f.push(`fade=t=in:st=0:d=${o}`),i>0&&r){const m=r-i;f.push(`fade=t=out:st=${m}:d=${i}`)}if(f.length===0){const m=await Ke(l);return He(m,"video/mp4")}await Ge(["-i",l,"-vf",f.join(","),"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",d]);const b=await Ke(d);return He(b,"video/mp4")}finally{Xe(),await qe([l,d])}}async function sr(t,o=90,i=null){const r={90:"transpose=1",180:"transpose=1,transpose=1",270:"transpose=2","-90":"transpose=2"},s=r[o]||r[90];return st(t,s,i)}async function lr(t,o="horizontal",i=null){return st(t,o==="vertical"?"vflip":"hflip",i)}async function cr(t,o,i=null){const{width:r,height:s,x:l=0,y:d=0}=o,f=`crop=${r}:${s}:${l}:${d}`;return st(t,f,i)}const ga=15,dr=85;function ur(){const[t,o]=a.useState(!1),[i,r]=a.useState(ha()),[s,l]=a.useState(0),[d,f]=a.useState(0),[b,m]=a.useState(null),[y,w]=a.useState(null),T=a.useRef(!0);a.useEffect(()=>{T.current=!0;const S=co(C=>{T.current&&(f(C.loadProgress),C.error&&m(C.error))});return()=>{T.current=!1,Xe(),S()}},[]);const q=a.useCallback(async()=>{if(ha())return r(!0),!0;o(!0),m(null);try{return await Ye(),T.current&&(r(!0),o(!1)),!0}catch(S){return T.current&&(m(na(S,"ffmpeg")),o(!1)),!1}},[]),U=a.useCallback(({progress:S})=>{T.current&&l(S)},[]),v=a.useCallback(async(S,C)=>{if(!ha()&&!await q())throw new Error("FFmpeg not loaded");w(S),l(0),m(null);const R=({progress:F=0,time:le=0})=>{const be=ga+Math.round(F/100*dr),We=Math.max(ga,Math.min(99,be));U({progress:We,time:le})};try{U({progress:ga});const F=await C(R);return T.current&&(l(100),w(null),setTimeout(()=>{T.current&&l(0)},350)),F}catch(F){if(T.current){const be=F?.name==="AbortError"||/abort|cancel/i.test(F?.message||"");m(be?"Operation cancelled":na(F,"ffmpeg")),l(0),w(null)}const le=(F?.message||"").toLowerCase();if(le.includes("wasm")||le.includes("memory")||le.includes("abort")||le.includes("sharedarraybuffer"))try{await uo(),T.current&&r(!1)}catch{}throw F}},[q,U]),Y=a.useCallback(async(S,C,R)=>v("trim video",F=>po(S,C,R,F)),[v]),X=a.useCallback(async(S,C)=>v("split video",R=>mo(S,C,R)),[v]),me=a.useCallback(async S=>v("merge clips",C=>fo(S,C)),[v]),Q=a.useCallback(async(S,C)=>v("export video",R=>ho(S,C,R)),[v]),re=a.useCallback(async(S,C)=>{const R=oa[C];return v(`export for ${R?.label||C}`,F=>bo(S,C,F))},[v]),k=a.useCallback(async S=>go(S),[]),Z=a.useCallback(async(S,C=0)=>xo(S,C),[]),se=a.useCallback(async S=>v("convert to web format",C=>yo(S,"mp4",C)),[v]),$=a.useCallback(async(S,C,R=.3)=>v("mix audio",F=>Tn(S,C,R,F)),[v]),V=a.useCallback(async(S,C)=>v("adjust volume",R=>In(S,C,R)),[v]),we=a.useCallback(async S=>v("mute audio",C=>Mn(S,C)),[v]),K=a.useCallback(async(S,C="mp3")=>v("extract audio",R=>Rn(S,C,R)),[v]),ee=a.useCallback(async(S,C,R={})=>v("add text",F=>Qo(S,C,R,F)),[v]),xe=a.useCallback(async(S,C,R="fade",F=1)=>v("add transition",le=>Zo(S,C,R,F,le)),[v]),E=a.useCallback(async(S,C)=>v("change speed",R=>rr(S,C,R)),[v]),J=a.useCallback(async(S,C,R,F)=>v("add fade",le=>ir(S,C,R,F,le)),[v]),Se=a.useCallback(async(S,C)=>v("rotate video",R=>sr(S,C,R)),[v]),Ce=a.useCallback(async(S,C)=>v("flip video",R=>lr(S,C,R)),[v]),Ie=a.useCallback(async(S,C)=>v("crop video",R=>cr(S,C,R)),[v]),de=a.useCallback(async(S,C,R)=>v("adjust colors",F=>tr(S,C,R,F)),[v]),ze=a.useCallback(async(S,C)=>v("adjust saturation",R=>ar(S,C,R)),[v]),ve=a.useCallback(async(S,C)=>v("apply filter",R=>st(S,C,R)),[v]),pe=a.useCallback(async(S,C)=>v("apply blur",R=>nr(S,C,R)),[v]),ue=a.useCallback(async(S,C)=>v("apply sharpen",R=>or(S,C,R)),[v]),he=a.useCallback(()=>{m(null)},[]),ke=a.useCallback(()=>{l(0),w(null)},[]),Le=a.useCallback(async()=>{await wo()},[]),j=a.useCallback(()=>{Co(),T.current&&(w(null),l(0),m("Operation cancelled"))},[]),M=a.useCallback(async()=>{await vo()},[]),H=a.useCallback(()=>{const S=jo(),C=So();return{usage:S,usageFormatted:ko(S),limitExceeded:C}},[]);return{isLoading:t,isReady:i,progress:s,loadProgress:d,error:b,currentOperation:y,initialize:q,preload:Le,clearError:he,resetProgress:ke,cancelOperation:j,clearMemory:M,getMemoryInfo:H,trimVideo:Y,splitVideo:X,mergeClips:me,exportVideo:Q,exportWithPreset:re,getVideoInfo:k,generateThumbnail:Z,convertToWebFormat:se,mixAudio:$,adjustVolume:V,muteAudio:we,extractAudio:K,addTextOverlay:ee,addTransition:xe,changeSpeed:E,addFade:J,rotateVideo:Se,flipVideo:Ce,cropVideo:Ie,adjustBrightnessContrast:de,adjustSaturation:ze,applyFilter:ve,applyBlur:pe,applySharpen:ue,resolutions:wn,exportPresets:oa,textPositions:Sa,transitionTypes:En}}const pr="clipcut-thumbnails",mr=1,Ct="thumbnails";let Qt=null;function _n(){return Qt||(Qt=new Promise((t,o)=>{const i=indexedDB.open(pr,mr);i.onerror=()=>{console.warn("[ThumbnailCache] Failed to open database"),o(i.error)},i.onsuccess=()=>{t(i.result)},i.onupgradeneeded=r=>{const s=r.target.result;if(!s.objectStoreNames.contains(Ct)){const l=s.createObjectStore(Ct,{keyPath:"id"});l.createIndex("videoId","videoId",{unique:!1}),l.createIndex("timestamp","timestamp",{unique:!1})}}}),Qt)}function An(t,o){return`${t}_t${Math.floor(o*10)}`}async function fr(t,o){try{const i=await _n(),r=An(t,o);return new Promise(s=>{const f=i.transaction(Ct,"readonly").objectStore(Ct).get(r);f.onsuccess=()=>{const b=f.result;b&&b.data?s(new Blob([b.data],{type:"image/jpeg"})):s(null)},f.onerror=()=>s(null)})}catch(i){return console.warn("[ThumbnailCache] Error getting cached thumbnail:",i),null}}async function hr(t,o,i){try{const r=await _n(),s=An(t,o),l=await i.arrayBuffer();return new Promise(d=>{const f=r.transaction(Ct,"readwrite");f.objectStore(Ct).put({id:s,videoId:t,time:o,data:l,timestamp:Date.now()}),f.oncomplete=()=>d(!0),f.onerror=()=>d(!1)})}catch(r){console.warn("[ThumbnailCache] Error caching thumbnail:",r)}}function Zt(t){return new Promise((o,i)=>{const r=URL.createObjectURL(t);if(t.type?.startsWith("audio/")){const f=new Audio;f.preload="metadata",f.onloadedmetadata=()=>{URL.revokeObjectURL(r),o({duration:f.duration||0,width:0,height:0})},f.onerror=()=>{URL.revokeObjectURL(r),o({duration:0,width:0,height:0})},f.src=r;return}const l=document.createElement("video");l.preload="metadata",l.muted=!0;const d=setTimeout(()=>{URL.revokeObjectURL(r),o({duration:0,width:0,height:0})},5e3);l.onloadedmetadata=()=>{clearTimeout(d),URL.revokeObjectURL(r),o({duration:isFinite(l.duration)?l.duration:0,width:l.videoWidth||0,height:l.videoHeight||0})},l.onerror=()=>{clearTimeout(d),URL.revokeObjectURL(r),o({duration:0,width:0,height:0})},l.src=r})}function Lt(t,o=0){return new Promise((i,r)=>{const s=URL.createObjectURL(t),l=document.createElement("video");l.preload="auto",l.muted=!0;const d=setTimeout(()=>{f(),i(ea())},8e3);function f(){clearTimeout(d),URL.revokeObjectURL(s)}l.onloadeddata=()=>{const b=Math.min(o,l.duration-.1);l.currentTime=Math.max(0,b)},l.onseeked=()=>{try{const b=document.createElement("canvas"),y=Math.min(1,320/(l.videoWidth||320));b.width=Math.round((l.videoWidth||320)*y),b.height=Math.round((l.videoHeight||180)*y),b.getContext("2d").drawImage(l,0,0,b.width,b.height),b.toBlob(T=>{f(),i(T||ea())},"image/jpeg",.7)}catch{f(),i(ea())}},l.onerror=()=>{f(),i(ea())},l.src=s})}function ea(){const t=document.createElement("canvas");t.width=160,t.height=90;const o=t.getContext("2d"),i=o.createLinearGradient(0,0,160,90);return i.addColorStop(0,"#1a2332"),i.addColorStop(1,"#0a0a0a"),o.fillStyle=i,o.fillRect(0,0,160,90),o.fillStyle="rgba(117, 170, 219, 0.3)",o.beginPath(),o.moveTo(65,30),o.lineTo(65,60),o.lineTo(100,45),o.closePath(),o.fill(),new Promise(r=>{t.toBlob(s=>r(s||new Blob),"image/jpeg",.7)})}const Ga={"480p":{width:854,height:480},"720p":{width:1280,height:720},"1080p":{width:1920,height:1080}},qa={"480p":{28:1e6,23:2e6,18:4e6,15:6e6},"720p":{28:25e5,23:5e6,18:8e6,15:12e6},"1080p":{28:4e6,23:8e6,18:16e6,15:24e6}};function br(t,o){const i=qa[t]||qa["1080p"];return i[o]||i[18]}const Ja={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}};function Qa(t,o,i,r){const s=o.text||"";if(!s.trim())return;const l=Math.max(12,Math.round((o.textSize||48)*(r/1080))),d=o.textBold?"bold":"normal",f=o.textItalic?"italic":"normal",b=o.textFontFamily||"Spline Sans";t.font=`${f} ${d} ${l}px '${b}', Arial, sans-serif`;let m,y,w,T;if(o.textX!=null&&o.textY!=null)m=o.textX/100*i,y=o.textY/100*r,w="center",T="middle";else{const q=Ja[o.textPosition||"center"]||Ja.center;m=q.x*i,y=q.y*r,w=q.align,T=q.baseline}if(t.textAlign=w,t.textBaseline=T,o.textBgColor&&o.textBgColor!=="transparent"){const q=t.measureText(s),U=l*.25,v=q.width,Y=l*1.2;let X=m-U;w==="center"?X=m-v/2-U:w==="right"&&(X=m-v-U);let me=y-U;T==="middle"?me=y-Y/2-U:T==="bottom"&&(me=y-Y-U),t.fillStyle=o.textBgColor,t.fillRect(X,me,v+U*2,Y+U*2)}if(t.shadowColor="rgba(0,0,0,0.7)",t.shadowBlur=4,t.shadowOffsetX=0,t.shadowOffsetY=1,t.fillStyle=o.textColor||"#ffffff",t.fillText(s,m,y),o.textUnderline){const q=t.measureText(s);let U=m;w==="center"?U=m-q.width/2:w==="right"&&(U=m-q.width);const v=T==="top"?y+l:T==="middle"?y+l/2:y;t.strokeStyle=o.textColor||"#ffffff",t.lineWidth=Math.max(1,l/20),t.beginPath(),t.moveTo(U,v+2),t.lineTo(U+q.width,v+2),t.stroke()}t.shadowColor="transparent",t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0}function gr(t){return new Promise((o,i)=>{const r=document.createElement("video");r.preload="auto",r.playsInline=!0,r.muted=!1,r.style.position="fixed",r.style.top="-9999px",r.style.left="-9999px",r.style.width="1px",r.style.height="1px",document.body.appendChild(r);const s=t instanceof Blob?URL.createObjectURL(t):t;r.src=s;const l=()=>{r.removeEventListener("error",d)},d=()=>{l(),i(new Error(`Failed to load video: ${r.error?.message||"unknown error"}`))};r.addEventListener("error",d),r.addEventListener("loadeddata",()=>{l(),o({video:r,url:s})},{once:!0}),r.load()})}function xr(t){return new Promise((o,i)=>{const r=document.createElement("audio");r.preload="auto",r.style.display="none",document.body.appendChild(r);const s=t instanceof Blob?URL.createObjectURL(t):t;r.src=s,r.addEventListener("error",()=>{i(new Error("Failed to load audio"))}),r.addEventListener("canplaythrough",()=>{o({audio:r,url:s})},{once:!0}),r.load()})}function yr(){const t=["video/webm;codecs=vp8,opus","video/webm;codecs=vp8","video/webm;codecs=vp9,opus","video/webm;codecs=vp9","video/webm"];for(const o of t)if(MediaRecorder.isTypeSupported(o))return o;return""}function wr(t){const o=[];return t.brightness!=null&&t.brightness!==0&&o.push(`brightness(${1+t.brightness/100})`),t.contrast!=null&&t.contrast!==0&&o.push(`contrast(${1+t.contrast/100})`),t.saturation!=null&&t.saturation!==0&&o.push(`saturate(${1+t.saturation/100})`),t.blur!=null&&t.blur>0&&o.push(`blur(${t.blur}px)`),o.length>0?o.join(" "):"none"}function xa(t){const o=Math.floor(t/60),i=Math.floor(t%60);return`${o}:${i.toString().padStart(2,"0")}`}async function vr({clips:t,bgMusic:o=null,totalDuration:i,resolution:r="1080p",settings:s={},onProgress:l,abortSignal:d}){const{quality:f=23,fps:b=30}=s,m=Ga[r]||Ga["1080p"],{width:y,height:w}=m,T=br(r,f),q=yr();if(Pt({category:"export",message:"canvasExport.start",level:"info",data:{resolution:r,fps:b,quality:f,totalDuration:i,clipCount:t?.length??0}}),!q)throw Pt({category:"export",message:"canvasExport.no_mime_support",level:"error"}),new Error("Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.");const U=t.filter(E=>E.type!=="audio"&&E.type!=="text"&&E.type!=="sticker"&&E.file).sort((E,J)=>E.startTime-J.startTime),Y=t.filter(E=>E.type==="text"||E.type==="sticker"||E.text?.trim()).map(E=>{const J=E.startTime||0;return{...E,_start:J,_end:J+(E.duration||i)}});if(U.length===0)throw Pt({category:"export",message:"canvasExport.no_video_clips",level:"error"}),new Error("No video clips to export.");const X=document.createElement("canvas");X.width=y,X.height=w;const me=X.getContext("2d"),Q=new AudioContext,re=Q.createMediaStreamDestination();let k=null,Z=null,se=null;if(o?.file)try{const E=await xr(o.file);k=E.audio,Z=E.url,k.loop=!0;const J=Q.createMediaElementSource(k);se=Q.createGain(),se.gain.value=o.volume??.3,J.connect(se),se.connect(re)}catch(E){console.warn("Could not load background music, continuing without it:",E),k=null}const $=X.captureStream(b),V=re.stream.getAudioTracks();for(const E of V)$.addTrack(E);const we=[],K=new MediaRecorder($,{mimeType:q,videoBitsPerSecond:T,audioBitsPerSecond:128e3});K.ondataavailable=E=>{E.data.size>0&&we.push(E.data)},K.start(1e3),k&&(k.currentTime=0,k.play().catch(()=>{}));const ee=Date.now();for(let E=0;E<U.length&&!d?.aborted;E++){const J=U[E],Se=J.trimStart||0,Ce=J.duration||0,Ie=J.speed||1,{video:de,url:ze}=await gr(J.file);let ve=null;try{ve=Q.createMediaElementSource(de);const ue=Q.createGain();ue.gain.value=J.isMuted?0:J.volume??1,ve.connect(ue),ue.connect(re)}catch(ue){console.warn("Could not route clip audio:",ue)}de.currentTime=Se,de.playbackRate=Ie;const pe=wr(J);await new Promise(ue=>{de.addEventListener("seeked",ue,{once:!0})}),await de.play(),await new Promise((ue,he)=>{let ke;const Le=Se+Ce,j=J.fadeIn||0,M=J.fadeOut||0,H=()=>{if(d?.aborted){cancelAnimationFrame(ke),de.pause(),ue();return}const S=de.currentTime,C=S-Se;if(Ce>0&&S>=Le-.05){de.pause(),Za(me,de,y,w,pe,J,C,Ce,j,M,Y,J.startTime+C),ue();return}Za(me,de,y,w,pe,J,C,Ce,j,M,Y,J.startTime+C);const R=J.startTime+C,F=i>0?Math.min(99,R/i*100):0,le=(Date.now()-ee)/1e3,be=F>1?le/F*(100-F):0;l?.({percent:Math.round(F),elapsed:xa(le),eta:xa(be),label:U.length>1?`Exporting clip ${E+1}/${U.length}`:"Exporting video..."}),ke=requestAnimationFrame(H)};de.addEventListener("ended",()=>{cancelAnimationFrame(ke),de.pause(),ue()},{once:!0}),de.addEventListener("error",()=>{cancelAnimationFrame(ke),he(new Error(`Video playback error during export of clip ${E+1}`))},{once:!0}),ke=requestAnimationFrame(H)}),de.pause(),de.src="",de.load(),document.body.removeChild(de),URL.revokeObjectURL(ze),J.startTime+Ce}k&&(k.pause(),k.src="",document.body.removeChild(k),Z&&URL.revokeObjectURL(Z));const xe=await new Promise(E=>{K.onstop=()=>{const J=new Blob(we,{type:q});E(J)},K.stop()});if($.getTracks().forEach(E=>E.stop()),re.stream.getTracks().forEach(E=>E.stop()),await Q.close().catch(()=>{}),l?.({percent:100,elapsed:xa((Date.now()-ee)/1e3),eta:"0:00",label:"Complete"}),d?.aborted)throw Pt({category:"export",message:"canvasExport.cancelled",level:"warning"}),new Error("Export cancelled.");return Pt({category:"export",message:"canvasExport.complete",level:"info",data:{sizeBytes:xe.size,duration:i,elapsedMs:Date.now()-ee}}),{blob:xe,duration:i,size:xe.size}}function Za(t,o,i,r,s,l,d,f,b,m,y,w){t.save();let T=1;b>0&&d<b&&(T=d/b),m>0&&f>0&&f-d<m&&(T=Math.min(T,(f-d)/m)),t.globalAlpha=Math.max(0,Math.min(1,T)),s&&s!=="none"&&(t.filter=s),l.rotation&&(t.translate(i/2,r/2),t.rotate(l.rotation*Math.PI/180),t.translate(-i/2,-r/2));const q=o.videoWidth||i,U=o.videoHeight||r,v=Math.min(i/q,r/U),Y=q*v,X=U*v,me=(i-Y)/2,Q=(r-X)/2;t.fillStyle="#000000",t.fillRect(0,0,i,r),t.drawImage(o,me,Q,Y,X),t.filter="none",t.globalAlpha=1;for(const re of y)w>=re._start&&w<=re._end&&Qa(t,re,i,r);l.text?.trim()&&l.type!=="text"&&Qa(t,l,i,r),t.restore()}const kr="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease",Sr=80,jr=[.7,.95],Cr=[.4,.7,.9],Tr=a.memo(function({isOpen:o,onClose:i,title:r,zIndex:s=2900,children:l}){const d=a.useRef(null),f=a.useRef({startY:0,isDragging:!1,startSnap:0}),[b,m]=a.useState(0),[y,w]=a.useState(!1),[T,q]=a.useState(!1),[U,v]=a.useState(0);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const K=window.matchMedia("(orientation: landscape) and (max-width: 900px)"),ee=()=>q(K.matches);return ee(),K.addEventListener?K.addEventListener("change",ee):K.addListener(ee),()=>{K.removeEventListener?K.removeEventListener("change",ee):K.removeListener(ee)}},[]);const Y=T?Cr:jr,X=Y[Math.min(U,Y.length-1)]??Y[0];a.useEffect(()=>{o&&v(0),m(0)},[o,T]),a.useEffect(()=>{if(o){const K=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=K}}},[o]);const me=a.useCallback(K=>{f.current.startY=K.touches[0].clientY,f.current.isDragging=!0,f.current.startSnap=U,w(!0)},[U]),Q=a.useCallback(K=>{if(!f.current.isDragging)return;const ee=K.touches[0].clientY-f.current.startY;m(ee)},[]),re=a.useCallback(()=>{if(!f.current.isDragging)return;f.current.isDragging=!1,w(!1);const K=b,ee=window.innerHeight||800;if(K>Sr&&f.current.startSnap===0){m(0),i();return}if(Y.length>1){const xe=K<0?-1:K>0?1:0,E=ee*.08,J=Math.round(Math.abs(K)/E);if(J>0){let Se=f.current.startSnap-xe*J;Se=Math.max(0,Math.min(Y.length-1,Se)),v(Se)}}m(0)},[b,i,Y]),k={position:"fixed",inset:0,bottom:"56px",background:"rgba(0,0,0,0.4)",zIndex:s-100,opacity:o?1:0,pointerEvents:o?"auto":"none",transition:"opacity 0.3s ease"},Z={position:"fixed",bottom:"56px",left:0,right:0,height:`${Math.round(X*100)}vh`,zIndex:s,background:"#0e1218",borderTop:"2px solid rgba(117, 170, 219, 0.15)",borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",transform:o?`translateY(${Math.max(0,b)}px)`:"translateY(100%)",transition:y?"none":kr},se={flexShrink:0,cursor:"grab",touchAction:"none"},$={width:"36px",height:"4px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"8px auto 6px"},V={fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"center",padding:"0 16px 8px",textTransform:"uppercase",letterSpacing:"0.5px"},we={flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:k,onClick:i}),e.jsxs("div",{ref:d,style:Z,"aria-hidden":!o,children:[e.jsxs("div",{style:se,onTouchStart:me,onTouchMove:Q,onTouchEnd:re,children:[e.jsx("div",{style:$}),r&&e.jsx("div",{style:V,children:r})]}),e.jsx("div",{style:we,children:l})]})]})}),di=.1,Pn=8,ui=3,pi=t=>5*Math.pow(250/5,t/100),mi=(t,o)=>t*o,fi=(t,o)=>t/o,hi=(t,o,i)=>{const r=new Set([0,i]);for(const s of t)s.id!==o&&(r.add(s.startTime),r.add(s.startTime+s.duration));return[...r].sort((s,l)=>s-l)},en=(t,o,i,r=Pn)=>{const s=r/i;let l=t,d=null,f=s;for(const b of o){const m=Math.abs(t-b);m<f&&(f=m,l=b,d=b)}return{time:l,snappedTo:d}},bi=(t,o,i,r,s=Pn)=>{const l=en(t,i,r,s),d=en(t+o,i,r,s),f=l.snappedTo!==null?Math.abs(t-l.time):1/0,b=d.snappedTo!==null?Math.abs(t+o-d.time):1/0;return f<=b&&l.snappedTo!==null?{startTime:l.time,snappedTo:l.snappedTo}:d.snappedTo!==null?{startTime:d.time-o,snappedTo:d.snappedTo}:{startTime:t,snappedTo:null}},Ir=t=>{const i=80/t,r=[.1,.25,.5,1,2,5,10,15,30,60,120,300];for(const s of r)if(s>=i*.6)return s;return 300},gi=(t,o)=>{const i=Ir(o),r=i<=1?4:i<=5?5:4,s=i/r,l=[],d=t+i;for(let f=0;f<=d;f+=s){const b=f%i;if(b<.001||Math.abs(b-i)<.001){const y=Math.floor(f/60),w=f%60,T=w===Math.floor(w)?Math.floor(w).toString().padStart(2,"0"):w.toFixed(1).padStart(4,"0");l.push({time:f,label:`${y}:${T}`,major:!0})}else l.push({time:f,label:"",major:!1})}return l},tn=t=>{t<0&&(t=0);const o=Math.floor(t/60),i=t%60;return`${o}:${i.toFixed(1).padStart(4,"0")}`},xi=t=>{if(t<60)return`${t.toFixed(1)}s`;const o=Math.floor(t/60),i=(t%60).toFixed(0);return`${o}:${i.padStart(2,"0")}`},Mr=t=>t?.type!=="audio"&&t?.type!=="text",Un=t=>Mr(t)&&!t?.blobUrl&&!!t?._mediaError,Rr=t=>t?.type!=="audio"&&!t?.blobUrl&&!!t?._mediaError;function Er({restoredClips:t=[],mediaItems:o=[],projectName:i="Untitled Project"}){const r=t.filter(Un).length,s=o.filter(Rr).length,l=r>0||s>0;return{clips:t,mediaItems:o,unresolvedClipCount:r,unresolvedMediaCount:s,hasUnavailableMedia:l,notification:l?{level:"warning",message:`Loaded "${i}" — ${r} clip(s) need media re-import`}:{level:"success",message:`Loaded "${i}" (${t.length} clips)`}}}function yi({videoSrc:t=null,hasTimelineClips:o=!1,hasUnavailableMediaClips:i=!1,isRestoringMedia:r=!1}){return r?{title:"Restoring media...",description:"Loading media files from storage",showImportHint:!1}:t?{title:null,description:null,showImportHint:!1}:i?{title:"Media missing",description:"This project still has clips, but one or more source files need to be re-imported.",showImportHint:!0}:o?{title:"No clip at playhead",description:"Move the playhead over a clip on the timeline to preview",showImportHint:!1}:{title:"No media loaded",description:"Import media and add clips to the timeline to preview",showImportHint:!0}}function _r(t=[]){return t.some(Un)}function Ar({projectId:t,isRestored:o,hasBeenNonEmpty:i,clipsCount:r,mediaItemsCount:s}){return t?o?(r||0)===0&&(s||0)===0&&!i?{skip:!0,reason:"empty-without-session-edit"}:{skip:!1,reason:null}:{skip:!0,reason:"restore-in-progress"}:{skip:!1,reason:null}}let an=!1;function Pr(){if(an)return;const t=Eo();if(!t)return;an=!0;const o=typeof AbortSignal<"u"&&AbortSignal.timeout?{signal:AbortSignal.timeout(5e3)}:{};fetch(`${t}/health`,{method:"GET",mode:"cors",cache:"no-store",...o}).catch(i=>{i?.message})}const nn=a.lazy(()=>Be(()=>import("./HJze1rIC.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Ur=a.lazy(()=>Be(()=>import("./DcrXmAJC.js"),__vite__mapDeps([11,1,6,3,4,5,7,8,9,2,10]))),on=a.lazy(()=>Be(()=>import("./DwC3YSvU.js"),__vite__mapDeps([12,1,13,6,3,4,5,7,8,9,2,10]))),rn=a.lazy(()=>Be(()=>import("./CFIyAQ4J.js"),__vite__mapDeps([14,1,6,3,4,5,7,8,9,2,10]))),sn=a.lazy(()=>Be(()=>import("./DXdDEaR_.js"),__vite__mapDeps([15,1,13,3,4,5,6,7,8,9,2,10]))),ln=a.lazy(()=>Be(()=>import("./Dgb3-pQw.js"),__vite__mapDeps([16,1,13,3,4,5,6,7,8,9,2,10]))),cn=a.lazy(()=>Be(()=>import("./CUzl-lre.js"),__vite__mapDeps([17,1,3,4,5,6,7,8,9,2,10]))),dn=a.lazy(()=>Be(()=>import("./05yNc_dt.js"),__vite__mapDeps([18,1,3,4,5,6,7,8,9,2,10]))),un=a.lazy(()=>Be(()=>import("./CxyQEmj_.js"),__vite__mapDeps([19,1,13,3,4,5,6,7,8,9,2,10]))),pn=a.lazy(()=>Be(()=>import("./CG9hRsl_.js"),__vite__mapDeps([20,1,6,3,4,21,5,7,8,9,2,10]))),mn=a.lazy(()=>Be(()=>import("./CmIeVNDl.js"),__vite__mapDeps([22,1,3,4,5,6,7,8,9,2,10]))),Lr=`
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
  ${Uo}
  ${Ao}
`;function ya(t,o,i,r=!1){const s=a.useRef(!1),l=a.useRef(0),d=a.useRef(0);return a.useCallback((b,m)=>{b.preventDefault(),s.current=!0,l.current=t==="y"?b.clientY:b.clientX,d.current=m;const y=b.currentTarget;y.classList.add("dragging");const w=q=>{if(!s.current)return;const U=t==="y"?l.current-q.clientY:q.clientX-l.current,v=r?-U:U;o(d.current+v)},T=()=>{s.current=!1,y.classList.remove("dragging"),document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",T),document.body.style.cursor="",document.body.style.userSelect=""};document.addEventListener("mousemove",w),document.addEventListener("mouseup",T),document.body.style.cursor=t==="y"?"row-resize":"col-resize",document.body.style.userSelect="none"},[t,o,i,r])}const Nr=280,fn=280,hn=320,bn=360;function wa(t){return Math.max(200,Math.min(400,Math.floor(t*.25)))}function va(t){return Math.max(220,Math.min(400,Math.floor(t*.25)))}const gn={width:"100%",minWidth:0,minHeight:0,alignSelf:"stretch"},jt=a.memo(({width:t,height:o="100%"})=>e.jsx("div",{style:{width:t,height:o,background:"linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderRight:"1px solid rgba(117,170,219,0.06)"},children:e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}})}));jt.displayName="PanelLoadingFallback";const ja=a.memo(()=>e.jsx("div",{style:{height:"220px",background:"linear-gradient(180deg, #0c1018 0%, #08090c 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderTop:"2px solid rgba(117,170,219,0.08)"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("span",{style:{color:"#3d4a5c",fontSize:"11px",fontWeight:500},children:"Loading timeline..."})]})}));ja.displayName="TimelineLoadingFallback";const ka=[{target:"media-panel",title:"Media Library",desc:"Import videos and audio files here. Drag them to the timeline to start editing.",position:"right"},{target:"player",title:"Preview",desc:"Watch your edit in real-time. Effects and text overlays preview live without rendering.",position:"bottom"},{target:"inspector",title:"Inspector",desc:"Adjust clip properties — filters, speed, volume, text overlays, and transforms.",position:"left"},{target:"timeline",title:"Timeline",desc:"Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.",position:"top"}],Ln=a.memo(({onComplete:t})=>{const[o,i]=a.useState(0),r=ka[o],s=o===ka.length-1;return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9e3,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:l=>{l.target===l.currentTarget&&t()},children:e.jsxs("div",{style:{background:"#1a2332",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"90%",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 16px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(117,170,219,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#75aadb"},children:o+1}),e.jsx("span",{style:{fontSize:"15px",fontWeight:600,color:"#f1f5f9"},children:r.title})]}),e.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",lineHeight:1.6,margin:"0 0 16px"},children:r.desc}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"4px"},children:ka.map((l,d)=>e.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:d===o?"#75aadb":"rgba(255,255,255,0.1)"}},d))}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:t,style:{padding:"8px 16px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",background:"transparent",color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:"Skip"}),e.jsx("button",{onClick:()=>s?t():i(l=>l+1),style:{padding:"8px 20px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #75aadb, #5a8cbf)",color:"#0a0a0a",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:s?"Get Started":"Next"})]})]})]})})});Ln.displayName="WalkthroughOverlay";const $r=(t,o)=>{switch(o.type){case"SET_CLIPS":return{...t,clips:o.clips,past:[...t.past.slice(-49),t.clips],future:[]};case"UNDO":return t.past.length===0?t:{clips:t.past[t.past.length-1],past:t.past.slice(0,-1),future:[t.clips,...t.future]};case"REDO":return t.future.length===0?t:{clips:t.future[0],past:[...t.past,t.clips],future:t.future.slice(1)};case"RESET":return{clips:[],past:[],future:[]};default:return t}};let Or=0;const ta=()=>`clip-${Date.now()}-${(++Or).toString(36)}`,Nn=a.memo(({message:t,progress:o,subMessage:i,operationLabel:r,onCancel:s})=>e.jsx("div",{className:"loading-overlay",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2e3,backdropFilter:"blur(6px)"},role:"dialog","aria-modal":"true","aria-label":"Processing",children:e.jsxs("div",{className:"loading-card",style:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"36px 52px",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",minWidth:"280px"},children:[e.jsxs("div",{style:{width:"56px",height:"56px",margin:"0 auto 20px",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("div",{style:{position:"absolute",inset:"6px",border:"2px solid rgba(117,170,219,0.1)",borderBottomColor:"rgba(117,170,219,0.5)",borderRadius:"50%",animation:"spin 1.2s linear infinite reverse"}})]}),e.jsx("p",{style:{color:"white",fontSize:"15px",margin:"0 0 6px",fontWeight:600},children:t}),r&&e.jsx("p",{style:{color:"rgba(255, 255, 255, 0.65)",fontSize:"12px",margin:"0 0 8px"},children:r}),i&&e.jsx("p",{style:{color:"#64748b",fontSize:"12px",margin:"0 0 16px"},children:i}),o>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"220px",height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden",margin:"16px auto 10px"},children:e.jsx("div",{className:o<100?"shimmer-bar":"",style:{height:"100%",width:`${o}%`,background:o>=100?"linear-gradient(90deg, #22c55e, #16a34a)":"linear-gradient(90deg, #75aadb, #5a8cbf)",transition:"width 0.3s ease",borderRadius:"3px"}})}),e.jsxs("p",{style:{color:"#75aadb",fontSize:"13px",fontWeight:700,margin:"0 0 16px"},children:[Math.round(o),"%"]})]}),s&&e.jsx("button",{onClick:s,style:{marginTop:o>0?"0":"16px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",padding:"8px 24px",color:"#ef4444",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},"aria-label":"Cancel operation",children:"Cancel"})]})}));Nn.displayName="LoadingOverlay";const $n=a.memo(({progress:t})=>t>=100?null:e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"3px",background:"rgba(0,0,0,0.3)",zIndex:100,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.max(t,2)}%`,background:"linear-gradient(90deg, #5a8cbf, #75aadb)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0",boxShadow:"0 0 8px rgba(117,170,219,0.4)"}})}));$n.displayName="FFmpegInitBar";const On=a.memo(({type:t="error",message:o,onClose:i,autoClose:r=!1})=>{const[s,l]=a.useState(!1);a.useEffect(()=>{if(!r)return;const b=setTimeout(()=>l(!0),Va),m=setTimeout(i,Va+Ka);return()=>{clearTimeout(b),clearTimeout(m)}},[r,i]);const d=a.useCallback(()=>{l(!0),setTimeout(i,Ka)},[i]),f={error:{bg:"linear-gradient(135deg, #ef4444, #dc2626)",shadow:"rgba(239,68,68,0.25)",icon:"error"},success:{bg:"linear-gradient(135deg, #22c55e, #16a34a)",shadow:"rgba(34,197,94,0.25)",icon:"check_circle"},warning:{bg:"linear-gradient(135deg, #f59e0b, #d97706)",shadow:"rgba(245,158,11,0.25)",icon:"warning"},info:{bg:"linear-gradient(135deg, #3b82f6, #2563eb)",shadow:"rgba(59,130,246,0.25)",icon:"info"}}[t]||{bg:"#ef4444",shadow:"rgba(0,0,0,0.2)",icon:"error"};return e.jsxs("div",{className:s?"toast-exit":"toast-enter",style:{position:"fixed",bottom:"24px",right:"24px",background:f.bg,color:"white",padding:"12px 18px",borderRadius:"10px",display:"flex",alignItems:"center",gap:"10px",boxShadow:`0 8px 28px ${f.shadow}`,zIndex:3e3,maxWidth:"380px",fontSize:"13px",backdropFilter:"blur(4px)"},role:t==="error"?"alert":"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",opacity:.9},children:f.icon}),e.jsx("span",{style:{flex:1,lineHeight:1.4},children:o}),e.jsx("button",{onClick:d,style:{background:"rgba(255,255,255,0.15)",border:"none",color:"white",cursor:"pointer",padding:"4px",borderRadius:"50%",display:"flex",width:"22px",height:"22px",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0},children:"✕"})]})});On.displayName="Toast";function Fr(t,o){const i=t.find(s=>s.type==="video");if(!i)return null;if(i.file)return{file:i.file,mediaId:i.mediaId};const r=o.find(s=>s.id===i.mediaId);return r?.file?{file:r.file,mediaId:i.mediaId}:null}function Br(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,r=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${r(i.getMonth()+1)}-${r(i.getDate())}`}async function Dr(t,o,i,r,s,l){const d=new Map;for(const m of i)if(!(!m.file||m.storagePath))try{const y=await vn(t,o,m.file);d.set(m.id,y)}catch(y){console.warn("[autosave] Media upload failed:",m.name,y)}if(d.size===0)return{changed:!1,clips:r,mediaItems:i};const f=i.map(m=>d.has(m.id)?{...m,storagePath:d.get(m.id)}:m),b=r.map(m=>{const y=m.mediaId&&d.get(m.mediaId);return y?{...m,storagePath:y}:m});return s(f),l(b),{changed:!0,clips:b,mediaItems:f}}const zr=(t,o,i,r,s,l,d,f,b,m,y,w,T,q=oo)=>{const[U,v]=a.useState(null),Y=a.useRef(!1),X=a.useRef(t),me=a.useRef(null),Q=a.useRef(null),re=a.useRef(null),k=a.useRef(0),Z=a.useRef(0),se=a.useRef(!1),$=a.useRef(i);$.current=i;const V=a.useRef(r);V.current=r;const we=a.useRef(o);we.current=o;const K=a.useRef(l);K.current=l;const ee=a.useRef(d);ee.current=d;const xe=a.useRef(m);xe.current=m;const E=a.useRef(w);E.current=w,a.useEffect(()=>{X.current=t},[t]),a.useEffect(()=>{const Se=()=>{Pr(),Be(()=>import("./BEUlQjCE.js"),__vite__mapDeps([23,1,24])).then(Ie=>Ie.warmupFaceModels?.()).catch(()=>{})};if(typeof requestIdleCallback=="function"){const Ie=requestIdleCallback(Se,{timeout:1500});return()=>cancelIdleCallback?.(Ie)}const Ce=setTimeout(Se,500);return()=>clearTimeout(Ce)},[]),a.useEffect(()=>{const Se=new Set(["file","blobUrl","thumbnail","isProcessing"]),Ce=ve=>{const pe={};for(const[ue,he]of Object.entries(ve))Se.has(ue)||(pe[ue]=he);return ve.mediaId&&X.current&&(pe.idbKey=`idb://${X.current}:${ve.mediaId}`),pe.storagePath&&pe.storagePath.startsWith("blob:")&&delete pe.storagePath,pe},Ie=ve=>{const pe={};for(const[ue,he]of Object.entries(ve))Se.has(ue)||(pe[ue]=he);return ve.id&&X.current&&(pe.idbKey=`idb://${X.current}:${ve.id}`),pe.blobUrl&&delete pe.blobUrl,pe},de=async()=>{if(Y.current)return{saved:!1,skipReason:"in-progress"};const ve=$.current?.length||0,pe=V.current?.length||0;(ve>0||pe>0)&&(se.current=!0);const ue=Ar({projectId:X.current,isRestored:T?T.current:!0,hasBeenNonEmpty:se.current,clipsCount:ve,mediaItemsCount:pe});if(ue.skip)return{saved:!1,skipReason:ue.reason};if(k.current>=3){if(Z.current>0)return Z.current--,{saved:!1,skipReason:"backoff"};Z.current=Math.min(Math.pow(2,k.current-3),20)}Y.current=!0;try{const he=$.current,ke=V.current,Le=we.current,j=xe.current,M={id:X.current,name:Le,clips:he.map(Ce),mediaItems:ke.map(Ie),duration:K.current,resolution:ee.current||"1080p",timelineMarkers:E.current||[]};(j?.storagePath||j?.mediaId)&&(M.bgMusic={name:j.name,volume:j.volume??.3},j.storagePath&&(M.bgMusic.storagePath=j.storagePath),j.mediaId&&(M.bgMusic.mediaId=j.mediaId));const H=Fr(he,ke),S=H?.mediaId||null;if(H&&S!==me.current)try{const R=await Lt(H.file,1);if(R&&R.size>500){me.current=S,s&&(M.thumbnail=R);const F=await new Promise(le=>{const be=new FileReader;be.onloadend=()=>le(be.result),be.readAsDataURL(R)});M.thumbnailDataUrl=F,Q.current=F}}catch(R){console.warn("Auto-save thumbnail generation failed:",R)}else Q.current&&(M.thumbnailDataUrl=Q.current);if(s){const R=await ro(()=>Jt(s,M),{maxRetries:2,baseDelay:1e3,maxDelay:5e3});T&&(T.current=!0);const F=X.current;let le=!1;if(R?.id&&R.id!==F&&(X.current=R.id,F))try{await Mo(F,R.id),le=!0,R.id}catch(We){console.warn("[autosave] IndexedDB re-key failed:",We)}const be=X.current;if(be&&Ut()){const We=await Dr(s,be,V.current,$.current,f,b);if(We.changed&&($.current=We.clips,V.current=We.mediaItems),We.changed||le){const at={id:be,name:we.current,clips:(We.changed?We.clips:$.current).map(Ce),mediaItems:V.current.map(Ie),duration:K.current,resolution:ee.current||"1080p",timelineMarkers:E.current||[],...Q.current?{thumbnailDataUrl:Q.current}:{}};xe.current?.storagePath&&(at.bgMusic={storagePath:xe.current.storagePath,name:xe.current.name,volume:xe.current.volume??.3}),await Jt(s,at)}const lt=xe.current;if(lt?.file&&!lt?.storagePath&&be)try{const at=await vn(s,be,lt.file);y($t=>$t?{...$t,storagePath:at}:null),await Jt(s,{id:be,name:we.current,clips:$.current.map(Ce),mediaItems:V.current.map(Ie),duration:K.current,resolution:ee.current||"1080p",timelineMarkers:E.current||[],bgMusic:{storagePath:at,name:lt.name,volume:lt.volume??.3},...Q.current?{thumbnailDataUrl:Q.current}:{}})}catch(at){console.warn("Background music upload failed:",at)}}}else{const F=Jt(null,M).id;X.current||(X.current=F),T&&(T.current=!0);for(const be of V.current)be.file&&Nt(F,be.id,be.file,{name:be.name,type:be.file.type}).catch(We=>{console.warn("Failed to persist media to IndexedDB",{mediaId:be.id,error:We?.message})});const le=xe.current;le?.file&&le?.mediaId&&Nt(F,le.mediaId,le.file,{name:le.name,type:le.file.type}).catch(be=>{console.warn("Failed to persist background music to IndexedDB",{mediaId:le.mediaId,error:be?.message})})}return v(new Date),k.current=0,Z.current=0,{saved:!0}}catch(he){k.current++,k.current<=1?console.warn("Auto-save failed:",he?.message||he):k.current===3&&console.warn(`[autosave] ${k.current} consecutive failures — backing off. Will retry less frequently.`);try{const ke=we.current,Le=X.current,j={id:Le,projectName:ke,clips:$.current.map(Ce),mediaItems:V.current.map(Ie),savedAt:new Date().toISOString()};if(localStorage.setItem(`clipcut_autosave_${ke}`,JSON.stringify(j)),Le)for(const M of V.current)M.file&&Nt(Le,M.id,M.file,{name:M.name,type:M.file.type}).catch(H=>{console.warn("Fallback media persist failed",{mediaId:M.id,error:H?.message})})}catch{}return{saved:!1,skipReason:"error",error:he}}finally{Y.current=!1}};re.current=de;const ze=setInterval(de,q);return()=>clearInterval(ze)},[s,q,f,b,y]);const J=a.useCallback(()=>re.current?re.current():Promise.resolve({saved:!1,skipReason:"not-ready"}),[]);return{lastSaved:U,projectId:X.current,triggerSave:J}},Wr=60,Vr=(t,o)=>{const[i,r]=a.useState(0),[s,l]=a.useState(!1),d=a.useRef(null),f=a.useRef(1),b=a.useRef(0),m=a.useRef(0),y=a.useRef(t);y.current=t;const w=a.useCallback(k=>{const Z=y.current.filter($=>$.type!=="audio"&&$.type!=="text").sort(($,V)=>$.startTime-V.startTime);for(const $ of Z)if(k>=$.startTime&&k<$.startTime+$.duration)return $;const se=Z[Z.length-1];return se&&Math.abs(k-(se.startTime+se.duration))<.05?se:null},[]),T=a.useMemo(()=>w(i),[w,i]),q=a.useMemo(()=>T?Math.max(0,i-T.startTime)+(T.trimStart||0):0,[T,i]),U=a.useMemo(()=>{if(!T)return null;const k=t.filter(se=>se.type!=="audio").sort((se,$)=>se.startTime-$.startTime),Z=k.findIndex(se=>se.id===T.id);return Z>=0&&Z<k.length-1?k[Z+1]:null},[T,t]),v=a.useCallback(()=>{const k=performance.now();k-m.current>=Wr&&(m.current=k,r(b.current))},[]),Y=a.useCallback(k=>{if(k>=o){b.current=o,r(o),l(!1);return}b.current=k,v()},[o,v]);a.useEffect(()=>{if(!s){d.current&&cancelAnimationFrame(d.current),r(b.current);return}const k=()=>{if(b.current>=o){l(!1),r(o);return}d.current=requestAnimationFrame(k)};return d.current=requestAnimationFrame(k),()=>{d.current&&cancelAnimationFrame(d.current)}},[s,o]);const X=a.useCallback(k=>{const Z=Math.max(0,Math.min(o,k));b.current=Z,r(Z)},[o]),me=a.useCallback(()=>l(k=>!k),[]),Q=a.useCallback(()=>{l(!1),b.current=0,r(0)},[]),re=a.useCallback(k=>{f.current=k},[]);return{currentTime:i,currentClip:T,clipOffset:q,nextClip:U,isPlaying:s,seek:X,togglePlay:me,stop:Q,setIsPlaying:l,setSpeed:re,setCurrentTime:r,currentTimeRef:b,speedRef:f,onVideoTime:Y}},Kr=()=>{const t=io(),o=so(),{user:i}=ao(),[r,s]=a.useState(()=>new URLSearchParams(window.location.search).get("project")||null),[l,d]=a.useState("Untitled Project"),[f,b]=a.useState("1080p"),m=a.useRef(!1),y=a.useRef(!1);a.useEffect(()=>{const n=new URL(window.location);r?n.searchParams.set("project",r):n.searchParams.delete("project"),n.toString()!==window.location.href&&window.history.replaceState(window.history.state,"",n)},[r]);const[w,T]=a.useState("media"),[q,U]=a.useState("video"),[v,Y]=a.useState("basic"),[X,me]=a.useState("local"),[Q,re]=a.useState("default"),k=Ca(),Z=lo(),[se,$]=a.useState(!1),[V,we]=a.useState(!1),[K,ee]=a.useState([]),[xe,E]=a.useState(!1),[J,Se]=a.useState("parse"),[Ce,Ie]=a.useState(!1),[de,ze]=a.useState([]),ve=a.useRef([]),pe=a.useRef([]),[ue,he]=a.useState(null),[ke,Le]=a.useState(null),[j,M]=a.useState(null),[H,S]=a.useState(()=>typeof window<"u"?window.innerWidth:1200);a.useEffect(()=>{if(Q==="wide-timeline"){const n=window.innerHeight-296,c=Math.max(320,Math.floor(window.innerHeight*.46));he(Math.max(120,Math.min(c,n)))}else(Q==="default"||Q==="compact")&&he(null)},[Q]);const C=a.useMemo(()=>wa(H),[H]),R=a.useMemo(()=>va(H),[H]),F=a.useMemo(()=>Math.min(ke??fn,C),[ke,C]),le=a.useMemo(()=>Math.min(j??hn,R),[j,R]),be=a.useCallback(n=>{const c=window.innerHeight-296,p=Math.max(120,Math.min(n,c));he(p)},[]),We=a.useCallback(n=>{const c=window.innerWidth,p=wa(c),u=j??hn,g=c-bn-u-24;Le(Math.max(200,Math.min(n,p,g)))},[j]),lt=a.useCallback(n=>{const c=window.innerWidth,p=va(c),u=ke??fn,g=c-bn-u-24;M(Math.max(220,Math.min(n,p,g)))},[ke]);a.useEffect(()=>{let n;const c=()=>{clearTimeout(n),n=setTimeout(()=>{const p=window.innerWidth;S(p);const u=wa(p),g=va(p);Le(x=>x!=null?Math.min(x,u):null),M(x=>x!=null?Math.min(x,g):null)},150)};return window.addEventListener("resize",c),c(),()=>{clearTimeout(n),window.removeEventListener("resize",c)}},[]);const at=ya("y",be),$t=ya("x",We),Fn=ya("x",lt,void 0,!0),[Qe,ft]=a.useState(null),[Bn,Dn]=a.useState(0),[zn,Wn]=a.useState(()=>!localStorage.getItem("clipcut_onboarded")),[Ae,Ne]=a.useState([]),[ct,Ot]=a.useState(null),[Tt,ra]=a.useReducer($r,{clips:[],past:[],future:[]}),_=Tt.clips,ht=Tt.past.length>0,bt=Tt.future.length>0,[Pe,Ze]=a.useState(null),[ia,Ft]=a.useState([]);a.useEffect(()=>{k&&Pe&&(ft("inspector"),$(!0))},[k,Pe]);const nt=a.useMemo(()=>{if(_.length===0)return 30;const n=_.filter(p=>p.type!=="text"&&p.type!=="sticker"&&!p.isCaption),c=n.length>0?n:_;return Math.max(...c.map(p=>p.startTime+p.duration))},[_]),L=Vr(_,nt),[Ve,gt]=a.useState(null),[Ia,Ma]=a.useState(!1),[xt,Ra]=a.useState(!1),[Ea,Bt]=a.useState(0),[It,_a]=a.useState([]),Mt=a.useRef(null),[sa,yt]=a.useState(!1),[wt,ge]=a.useState(""),[Aa,tt]=a.useState(""),la=a.useRef(new Set),[Dt,Pa]=a.useState(null),O=a.useCallback((n,c)=>Pa({type:n,message:c}),[]),te=ur(),Oe=a.useMemo(()=>_.find(n=>n.id===Pe),[_,Pe]),Vn=a.useMemo(()=>{if(L.currentClip?.blobUrl)return L.currentClip.blobUrl;if(ct){const c=Ae.find(p=>p.id===ct)?.blobUrl;if(c)return c}return _.find(c=>c.type!=="audio"&&c.type!=="text"&&c.blobUrl)?.blobUrl||null},[L.currentClip,ct,Ae,_]),Kn=a.useMemo(()=>_r(_),[_]),Hn=a.useMemo(()=>{const n=_.filter(u=>u.isCaption),c=_.filter(u=>u.type==="text"&&!u.isCaption),p=_.filter(u=>(u.type==="text"||u.type==="sticker"||u.isCaption)&&u.type!=="audio"&&L.currentTime>=u.startTime&&L.currentTime<u.startTime+u.duration);if(n.length>0&&p.filter(u=>u.isCaption).length===0){const u=n.slice(0,3);L.currentTime.toFixed(3),_.length,n.length,c.length,p.length,u.map(g=>({id:g.id,type:g.type,isCaption:g.isCaption,text:(g.text||"").slice(0,30),startTime:g.startTime,duration:g.duration,track:g.track,range:`${g.startTime?.toFixed(2)}-${(g.startTime+g.duration).toFixed(2)}`}))}return p},[_,L.currentTime]),Yn=a.useMemo(()=>{const n=L.currentClip;if(!n||!n.transition||n.type==="audio"||n.type==="text"||n.type==="sticker"||n.isCaption||!n.blobUrl)return null;const c=Math.max(.2,Math.min(3,n.transitionDuration??1)),p=n.trimStart||0,u=Math.max(0,L.clipOffset-p),g=Math.max(0,n.duration-c);if(u<g)return null;const x=n.startTime+n.duration,z=_.filter(W=>W.id!==n.id&&!W.isCaption&&W.type!=="audio"&&W.type!=="text"&&W.type!=="sticker"&&(W.track||0)===(n.track||0)&&W.startTime>=x-.08&&W.startTime<=x+.08).sort((W,fe)=>W.startTime-fe.startTime)[0];if(!z?.blobUrl)return null;const A=Math.max(0,Math.min(1,(u-g)/c)),N=(z.trimStart||0)+Math.max(0,u-g);return{type:n.transition,duration:c,progress:A,nextVideoSrc:z.blobUrl,nextTime:N,leftClipId:n.id,rightClipId:z.id}},[L.currentClip,L.clipOffset,_]),vt=a.useRef(Tt.clips);vt.current=Tt.clips;const ie=a.useCallback(n=>{const c=vt.current,p=typeof n=="function"?n(c):n;ra({type:"SET_CLIPS",clips:p})},[]),{lastSaved:Xn,projectId:zt,triggerSave:Wt}=zr(r,l,_,Ae,i?.id,nt,f,Ne,ie,Ve,gt,ia,y);a.useEffect(()=>{zt&&zt!==r&&s(zt)},[zt,r]);const kt=a.useCallback(()=>ra({type:"UNDO"}),[]),dt=a.useCallback(()=>ra({type:"REDO"}),[]),Ue=a.useCallback((n,c)=>ie(p=>p.map(u=>u.id===n?{...u,...c}:u)),[ie]),Ua=a.useCallback(n=>ie(c=>c.map(p=>p.isCaption?{...p,...n}:p)),[ie]),Vt=a.useCallback(n=>{ie(c=>c.filter(p=>p.id!==n)),Pe===n&&Ze(null)},[ie,Pe]),Kt=a.useCallback((n,c=null)=>{let p=c;if(p===null){const g=vt.current.filter(z=>z.type===n.type),x=g.length>0?g.reduce((z,A)=>z.startTime+z.duration>A.startTime+A.duration?z:A):null;p=x?x.startTime+x.duration:0}const u={...ba,id:ta(),mediaId:n.id,name:n.name,type:n.type,startTime:p,duration:n.duration||no,file:n.file,blobUrl:n.blobUrl,thumbnail:n.thumbnail};ie(g=>[...g,u]),Ze(u.id),setTimeout(()=>Wt(),100)},[ie,Wt]),Ht=a.useCallback(async n=>{Ma(!0);try{let c=r;if(c||(c=`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s(c)),n.length>0&&l==="Untitled Project"){const g=(n.find(x=>x.type.startsWith("video/"))||n[0]).name.replace(/\.[^.]+$/,"").trim();g&&d(g)}let p=0;for(const u of n){ge(`Importing ${u.name}...`),tt(`${++p} of ${n.length}`);const g=ta(),x=URL.createObjectURL(u);Nt(c,g,u,{name:u.name,type:u.type}).catch(A=>console.warn("[import] IndexedDB store failed:",u.name,A));const z=u.type.startsWith("audio/");Ne(A=>[...A,{id:g,name:u.name,file:u,blobUrl:x,thumbnail:null,duration:0,width:0,height:0,type:z?"audio":"video",isProcessing:!0}]);try{const A=await Zt(u);if(Ne(N=>N.map(W=>W.id===g?{...W,duration:A.duration,width:A.width,height:A.height,isProcessing:!1}:W)),!z)try{const N=`${u.name}_${u.size}_${u.lastModified}`,W=await fr(N,0),fe=W||await Lt(u,0);W||hr(N,0,fe).catch(()=>{});const G=URL.createObjectURL(fe);Ne(ye=>ye.map(je=>je.id===g?{...je,thumbnail:G}:je))}catch(N){console.warn("Thumbnail generation failed:",N)}}catch(A){if(!z&&/\.(mov|avi|mkv|flv|wmv)$/i.test(u.name))try{ge(`Converting ${u.name} to MP4...`),te.isReady||await te.initialize();const W=await te.convertFormat(u,"mp4"),fe=new File([W],u.name.replace(/\.\w+$/,".mp4"),{type:"video/mp4"}),G=URL.createObjectURL(fe);URL.revokeObjectURL(x);const ye=await Zt(fe);Ne(h=>h.map(P=>P.id===g?{...P,file:fe,blobUrl:G,duration:ye.duration,width:ye.width,height:ye.height,isProcessing:!1}:P));const je=await Lt(fe,0).catch(()=>null);if(je){const h=URL.createObjectURL(je);Ne(P=>P.map(B=>B.id===g?{...B,thumbnail:h}:B))}O("info",`Converted ${u.name} to MP4`)}catch(W){console.error("Auto-convert failed:",W),Ne(fe=>fe.map(G=>G.id===g?{...G,isProcessing:!1}:G))}else console.error("Error processing:",A),Ne(W=>W.map(fe=>fe.id===g?{...fe,isProcessing:!1}:fe))}}O("success",`Imported ${n.length} file${n.length>1?"s":""}`)}catch(c){O("error",`Import failed: ${c.message}`)}finally{Ma(!1),ge(""),tt("")}},[O,r,l]),ca=a.useRef(null);a.useEffect(()=>{const n=_.find(G=>G.type!=="audio"&&G.type!=="text"&&G.type!=="sticker"&&!G.isCaption&&(G.file||G.blobUrl||G.mediaId));if(!n){ze([]),ca.current=null;return}const c=n.mediaId?Ae.find(G=>G.id===n.mediaId):null,p=n.file||c?.file||null,u=n.blobUrl||c?.blobUrl||null;if(!p&&!u){ze([]);return}const g=n.trimStart||0,x=n.trimEnd||0,z=n.duration||0,A=_.some(G=>G.isCaption),N=p?`${p.size}:${p.lastModified}`:String(u||""),W=`${n.id}|${n.mediaId||""}|${g}|${x}|${z}|${A}|${N}`;if(W===ca.current)return;ca.current=W;const fe={...n,file:p||void 0,blobUrl:u||void 0};Be(async()=>{const{analyzeVideo:G}=await import("./BDu3YrEZ.js");return{analyzeVideo:G}},__vite__mapDeps([25,26,3,1,4])).then(({analyzeVideo:G})=>{G(fe,{hasCaptions:A}).then(ye=>{ze(ye.length>0?ye:[])}).catch(()=>{ze([])})})},[_,Ae]);const Yt=a.useCallback(n=>{const c=Ro(n,{allowedCategories:["audio"],category:"audio"});if(!c.valid){O("warning",c.error||"Please select an audio file");return}Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl);const p=URL.createObjectURL(n),u=`bgm-${Date.now()}`;gt({file:n,name:n.name,blobUrl:p,volume:.3,mediaId:u});const g=r||`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Nt(g,u,n,{name:n.name,type:n.type}).catch(x=>console.warn("[bgMusic] IndexedDB store failed:",x)),O("success",`Background music: ${n.name}`)},[Ve,O,r]),Xt=a.useCallback(n=>{gt(c=>c?{...c,volume:n}:null)},[]),Gt=a.useCallback(()=>{Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl),gt(null),O("info","Background music removed")},[Ve,O]),La=a.useCallback(n=>{Ne(c=>{const p=c.find(u=>u.id===n);return p&&requestAnimationFrame(()=>{p.blobUrl&&URL.revokeObjectURL(p.blobUrl),p.thumbnail&&URL.revokeObjectURL(p.thumbnail)}),c.filter(u=>u.id!==n)}),ie(c=>(c.filter(p=>p.mediaId===n).forEach(p=>{p.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(p.blobUrl))}),c.filter(p=>p.mediaId!==n))),ct===n&&Ot(null)},[ct,ie]),qt=a.useCallback((n,c)=>{const p=vt.current.find(x=>x.id===n);if(!p||!Number.isFinite(c)||c<=.1||c>=p.duration-.1)return!1;const u={...p,id:ta(),name:`${p.name} (1)`,duration:c},g={...p,id:ta(),name:`${p.name} (2)`,startTime:p.startTime+c,duration:p.duration-c,trimStart:(p.trimStart||0)+c};return ie(x=>{const z=x.findIndex(N=>N.id===n),A=[...x];return A.splice(z,1,u,g),A}),Ze(u.id),O("success","Clip split"),!0},[ie,O]),ot=a.useCallback(n=>{ie(c=>[...c,n]),Ze(n.id)},[ie]),Na=a.useCallback(n=>{ie(()=>n),Ze(null),O("success","Clip deleted (ripple)")},[ie,O]);a.useCallback(async(n,c,p)=>{const u=vt.current.find(g=>g.id===n);if(u?.file){yt(!0),ge("Trimming...");try{const g=await te.trimVideo(u.file,c,p),x=URL.createObjectURL(g);ie(z=>z.map(A=>A.id===n?{...A,file:g,blobUrl:x,duration:p}:A)),u.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(u.blobUrl)),O("success","Clip trimmed")}catch(g){O("error",na(g,"ffmpeg"))}finally{yt(!1),ge(""),te.resetProgress()}}},[te,ie,O]),a.useCallback(async(n,c,p)=>{let u=n.file;const g=n.speed&&n.speed!==1,x=n.brightness||n.contrast,z=n.saturation!==void 0&&n.saturation!==1,A=n.rotation&&[90,180,270,-90].includes(n.rotation),N=n.volume!==void 0&&n.volume!==1||n.isMuted,W=n.fadeIn&&n.fadeIn>0||n.fadeOut&&n.fadeOut>0,fe=n.filterName,G=n.trimStart>0||n.trimEnd>0,ye=n.effects?.some(B=>B.enabled),je=n.text&&n.text.trim().length>0;if(!g&&!x&&!z&&!A&&!N&&!W&&!fe&&!G&&!ye&&!je)return u;const P=`clip ${c+1}/${p}`;if(G&&(ge(`Trimming ${P}...`),u=await te.trimVideo(u,n.trimStart,n.duration)),g&&(ge(`Adjusting speed for ${P}...`),u=await te.changeSpeed(u,n.speed)),x&&(ge(`Adjusting colors for ${P}...`),u=await te.adjustBrightnessContrast(u,n.brightness||0,n.contrast||0)),z&&(ge(`Adjusting saturation for ${P}...`),u=await te.adjustSaturation(u,n.saturation)),A&&(ge(`Rotating ${P}...`),u=await te.rotateVideo(u,n.rotation)),N&&(ge(`Adjusting audio for ${P}...`),u=await te.adjustVolume(u,n.isMuted?0:n.volume)),W&&(ge(`Adding fade to ${P}...`),u=await te.addFade(u,n.fadeIn||0,n.fadeOut||0,n.duration)),fe){const B=Lo.find(ce=>ce.name===n.filterName);B?.filter&&(ge(`Applying ${n.filterName} filter to ${P}...`),u=await te.applyFilter(u,B.filter))}if(ye)for(const B of n.effects.filter(ce=>ce.enabled))B.type==="blur"&&B.params?.radius?(ge(`Applying ${B.name} to ${P}...`),u=await te.applyBlur(u,B.params.radius)):B.type==="sharpen"&&B.params?.strength&&(ge(`Applying ${B.name} to ${P}...`),u=await te.applySharpen(u,B.params.strength));return je&&(ge(`Adding text overlay to ${P}...`),u=await te.addTextOverlay(u,n.text,{position:n.textPosition||"bottom-center",fontSize:n.textSize||48,fontColor:n.textColor||"white",backgroundColor:n.textBgColor||null,startTime:n.textStartTime||0,duration:n.textDuration||0})),u},[te]);const Gn=a.useCallback(()=>{_.length>0&&!window.confirm("Start a new project? Unsaved changes will be lost.")||(ie([]),d("Untitled Project"),s(null),m.current=!1,y.current=!1,Ne([]),Ze(null),Ot(null),Ft([]),O("info","New project created"))},[_.length,O,ie]),qn=a.useCallback(async()=>{const n=await Wt();if(n?.saved){O("success","Project saved");return}switch(n?.skipReason){case"restore-in-progress":O("info","Project still loading — try again in a moment");break;case"empty-without-session-edit":O("info","Nothing to save yet — add media or clips first");break;case"in-progress":O("info","Save already in progress");break;case"backoff":O("warning","Previous saves failed — retrying shortly");break;case"error":O("error",`Save failed${n?.error?.message?": "+n.error.message:""}`);break;default:O("info","Save skipped")}},[Wt,O]),Jn=a.useCallback(()=>{o("/settings")},[o]),$a=a.useCallback(n=>{const c=String(n?.message||n||"").toLowerCase();return c.includes("too long to respond")||c.includes("timeout")?'AI is taking too long right now. Try again or use a shorter command like "add captions".':c.includes("worker")||c.includes("network")||c.includes("fetch")?"I could not reach the AI service. Check your internet and retry.":c.includes("import a video first")||c.includes("no video clip found")?"Please import a video first, then try the AI edit again.":c.includes("didn't understand")||c.includes("rephrasing")?'I did not understand that request. Try a clearer command like "split at 00:26".':"I could not complete that AI edit. Please try again."},[]),Rt=a.useCallback(async(n,c={})=>{const p=Date.now();if(pe.current=pe.current.filter(x=>p-x<6e4),pe.current.length>=10){ee(x=>[...x,{id:`e-${p}`,role:"assistant",text:"Rate limit reached. Please wait a moment before sending more prompts."}]);return}pe.current.push(p);const u={id:`u-${p}`,role:"user",text:n};if(ee(x=>[...x,u]),!_.some(x=>x.type==="video"||x.type==="audio"||x.type==="image")){const{parseIntentLocally:x}=await Be(async()=>{const{parseIntentLocally:A}=await import("./D2lZ3orl.js");return{parseIntentLocally:A}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2]));if(x(n)){const A=()=>{k?(ft("media"),$(!0)):(T("media"),me("local"))};ee(N=>[...N,{id:`g-${p}`,role:"assistant",text:"Please import a video first to use AI editing.",openMedia:A}]);return}}E(!0),Se("parse"),Ie(!1);try{const{executeAiEdit:x,executeStructuredAiActions:z}=await Be(async()=>{const{executeAiEdit:h,executeStructuredAiActions:P}=await import("./D2lZ3orl.js");return{executeAiEdit:h,executeStructuredAiActions:P}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2])),A={duration:nt,hasAudio:_.some(h=>h.type==="audio"||h.type==="video"&&h.file),clipCount:_.length,currentTime:L.currentTime,hasCaptions:_.some(h=>h.isCaption),filters:[...new Set(_.filter(h=>h.filterName).map(h=>h.filterName))].join(",")||void 0,tracks:_.reduce((h,P)=>Math.max(h,(P.track||0)+1),0)},N=K.slice(-10).map(h=>({role:h.role,content:h.role==="assistant"&&h.actions?.length?`[Actions: ${h.actions.join(", ")}] ${h.text}`:h.text})),W=JSON.parse(JSON.stringify(_.map(h=>{const{file:P,...B}=h;return B}))),fe=new Map(_.filter(h=>h.file).map(h=>[h.id,h.file])),G={history:N,onSlowResponse:()=>Ie(!0),onProgress:Se},ye={clips:_,setClips:ie,updateClip:Ue,addClip:h=>{ie(P=>[...P,{...ba,id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...h}])},getClips:()=>vt.current,splitClip:qt,selectedClipId:Pe,mediaItems:Ae},je=c.structuredActions?await z(c.structuredActions,ye,{onProgress:Se}):await x(n,A,ye,G);if(je.isChat)ee(h=>[...h,{id:`a-${Date.now()}`,role:"assistant",text:je.summary}]);else{const h=`ai-${Date.now()}`;ve.current.push({id:h,snapshot:W,filesMap:fe});const P={id:`a-${Date.now()}`,role:"assistant",text:je.summary||"Done!",actions:je.actionLabels||[],applied:je.applied||[],failed:je.failed||[],skipped:je.skipped||[],undoScope:`Undoes all changes from this AI command (${(je.applied||[]).length} action${(je.applied||[]).length===1?"":"s"}).`,canUndo:!0,onUndo:()=>{const B=ve.current.find(ce=>ce.id===h);if(B){const ce=B.snapshot.map(ae=>{const Me=B.filesMap.get(ae.id);return Me?{...ae,file:Me}:ae});ie(ce),ve.current=ve.current.filter(ae=>ae.id!==h),ee(ae=>ae.map(Me=>Me.id===P.id?{...Me,canUndo:!1}:Me)),ee(ae=>[...ae,{id:`a-${Date.now()}`,role:"assistant",text:"Restored timeline to pre-AI state for that command."}]),O("info","AI edit undone")}}};ee(B=>[...B,P])}}catch(x){const z={id:`e-${Date.now()}`,role:"assistant",text:$a(x)};ee(A=>[...A,z])}finally{E(!1),Se("parse"),Ie(!1)}},[_,ie,Ue,qt,Pe,Ae,nt,L.currentTime,K,$a]),Oa=a.useCallback(n=>{if(n?.action){const c=`Apply suggestion: ${n.title}`,p=[{type:n.action,params:n.params||{}}];Rt(c,{structuredActions:p});return}Rt(n.title)},[Rt]),da=a.useCallback(()=>{we(n=>!n),k&&(ft("ai"),$(n=>!n))},[k]),Fa=a.useCallback((n,c,p)=>{const u=p==="mp4"?"mp4":"webm",g=URL.createObjectURL(n),x=document.createElement("a");x.href=g,x.download=`${Br(c||l)}.${u}`,document.body.appendChild(x),x.click(),document.body.removeChild(x),setTimeout(()=>URL.revokeObjectURL(g),2e3)},[l]),Qn=a.useCallback(()=>{Mt.current&&(Mt.current.abort(),Mt.current=null)},[]),Et=a.useCallback(async(n,c={})=>{if(_.length===0){O("warning","No clips to export. Add media to the timeline first.");return}const p=_.filter(x=>x.type!=="audio"&&x.file).sort((x,z)=>x.startTime-z.startTime);if(p.length===0){O("warning","No video clips with valid files. Make sure your clips are properly loaded.");return}if(xt){_a(x=>[...x,n]),O("info",`Queued export at ${n} (${It.length+1} in queue)`);return}L.isPlaying&&L.setIsPlaying(!1),Ra(!0),Bt(0),ge("Preparing export..."),tt("");let u=n;if(n.startsWith("preset:")){const x=n.slice(7),z=oa[x];z&&(z.width<=854?u="480p":z.width<=1280?u="720p":u="1080p")}const g=new AbortController;Mt.current=g;try{const x=String(c.format||"webm").toLowerCase()==="mp4"?"mp4":"webm",z=[...p,..._.filter(G=>G.type==="text"||G.type==="sticker")],A=Math.max(...p.map(G=>G.startTime+G.duration)),N=await vr({clips:z,bgMusic:Ve,totalDuration:A,resolution:u,settings:{...c,format:"webm"},onProgress:({percent:G,elapsed:ye,eta:je,label:h})=>{const P=x==="mp4"?Math.min(70,Math.round(G*.7)):G;Bt(P),ge(x==="mp4"?"Rendering local preview stream...":h||"Exporting..."),tt(`${P}%  ·  Elapsed ${ye}  ·  ETA ${je}`)},abortSignal:g.signal});if(!N.blob||N.blob.size===0)throw new Error("Export produced an empty file.");let W=N.blob,fe="webm";if(x==="mp4")if(ge("Checking server encoder..."),tt("Validating MP4 export service availability..."),!await yn())O("warning","MP4 server is unavailable right now. Exported WebM locally instead.");else try{ge("Uploading to MP4 encoder..."),tt("Uploading render to server for fast MP4 transcode...");const ye=await To(N.blob,u,{},je=>{const h=Math.min(98,70+Math.round(je/100*28));Bt(h),ge("Server encoding MP4..."),tt(`${h}%  ·  Upload + transcode in progress`)},g.signal);ye&&ye.size>0?(W=ye,fe="mp4"):O("warning","MP4 conversion returned empty output. Downloaded WebM fallback.")}catch(ye){console.warn("Server MP4 export failed, using local WebM fallback:",ye),O("warning","MP4 export failed on server. Downloaded WebM fallback instead.")}Fa(W,c.filename||l,fe),O("success",`Exported ${fe.toUpperCase()} at ${u} (${(W.size/(1024*1024)).toFixed(1)} MB)`)}catch(x){x.message==="Export cancelled."?O("info","Export cancelled."):(console.error("Export error:",x),O("error",x.message||"Export failed. Please try again."))}finally{Ra(!1),Bt(0),ge(""),tt(""),Mt.current=null}},[_,l,L,O,Ve,Fa,xt,It,nt]);a.useEffect(()=>{if(!xt&&It.length>0){const[n,...c]=It;_a(c),Et(n)}},[xt,It,Et]);const Zn=a.useCallback(n=>{L.seek(n)},[L]),ua=a.useCallback(()=>{if(!L.currentClip){L.setIsPlaying(!1);return}const c=_.filter(p=>p.type!=="audio").sort((p,u)=>p.startTime-u.startTime).find(p=>p.startTime>L.currentClip.startTime);c&&L.isPlaying?L.seek(c.startTime):L.setIsPlaying(!1)},[L,_]),eo=a.useCallback(n=>{if(L.currentClip){const c=L.currentClip.trimStart||0,p=c+L.currentClip.duration;if(L.isPlaying&&n>=p-.01){ua();return}const u=L.currentClip.startTime+(n-c);L.isPlaying?L.onVideoTime(u):L.setCurrentTime(u)}else L.isPlaying||L.setCurrentTime(n)},[L,ua]),to=a.useCallback(async n=>{if(!(!n||!te.isReady)&&!la.current.has(n)){la.current.add(n),yt(!0),ge("Converting video to web-compatible format...");try{let c=null,p=null,u=!1;const g=Ae.find(A=>A.blobUrl===n);if(g&&g.file)c=g.file,p=g.id,u=!1;else{const A=_.find(N=>N.blobUrl===n);A&&A.file&&(c=A.file,p=A.id,u=!0)}if(!c){O("error","Could not find source file for conversion");return}const x=await te.convertToWebFormat(c),z=URL.createObjectURL(x);u?ie(A=>A.map(N=>N.id===p?(N.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(N.blobUrl)),{...N,file:x,blobUrl:z}):N)):(Ne(A=>A.map(N=>N.id===p?(N.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(N.blobUrl)),{...N,file:x,blobUrl:z}):N)),ie(A=>A.map(N=>N.mediaId===p?(N.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(N.blobUrl)),{...N,file:x,blobUrl:z}):N))),O("success","Video converted successfully")}catch(c){O("error",na(c,"ffmpeg"))}finally{la.current.delete(n),yt(!1),ge(""),te.resetProgress()}}},[te,Ae,_,ie,O]),Ba=a.useRef(null);a.useEffect(()=>{const n=t.state?.filesToImport;n?.length&&Ba.current!==n&&(Ba.current=n,window.history.replaceState({...t.state,filesToImport:null},""),Ht(n))},[t.state?.filesToImport,Ht]),a.useEffect(()=>{const n=t.state?.projectId,c=t.state?.projectData,p=t.state?.projectName,u=new URLSearchParams(window.location.search).get("project"),g=n||u||null;if(!g||m.current===g||(m.current=g,Ut()&&!i?.id))return;let x=!1;const z=async h=>{const P=h.project_data?.bgMusic;if(!P)return;let B=null,ce=null;if(P.mediaId)try{const ae=await St(g,P.mediaId);ae&&(B=ae.file,ce=ae.blobUrl)}catch(ae){console.warn("[restoreBgMusic] IndexedDB load failed:",ae)}if(!ce&&P.storagePath&&Ut())try{const ae=await Ya(P.storagePath),Me=await fetch(ae);if(Me.ok){const ne=await Me.blob();B=new File([ne],P.name||"bgm",{type:ne.type}),ce=URL.createObjectURL(ne)}}catch(ae){console.warn("[restoreBgMusic] Supabase download failed:",ae)}ce&&gt({file:B,name:P.name||"Background",blobUrl:ce,volume:P.volume??.3,storagePath:P.storagePath,mediaId:P.mediaId})},A=h=>{if(!h||!h.startsWith("idb://"))return null;const P=h.slice(6),B=P.lastIndexOf(":");return B<0?null:{idbProjectId:P.slice(0,B),idbMediaId:P.slice(B+1)}},N=h=>h?.startsWith("audio/")?"audio":h?.startsWith("image/")?"image":"video",W=(h,P,B=null)=>Promise.race([h,new Promise(ce=>setTimeout(()=>ce(B),P))]),fe=async(h,P=[])=>{let B=null,ce=null;const ae=h.mediaId||h.id||null;h.name,h.type,h.idbKey,h.storagePath;const Me=A(h.idbKey);if(Me)try{Me.idbProjectId,Me.idbMediaId;const ne=await W(St(Me.idbProjectId,Me.idbMediaId),2e3);ne?(B=ne.file,ce=ne.blobUrl,h.name,ne.file?.size):console.warn("[restore] IndexedDB MISS (null):",h.idbKey)}catch(ne){console.warn("[restore] IndexedDB load failed:",h.idbKey,ne)}else h.name,h.type;if(!ce&&ae)try{const ne=await W(St(g,ae),2e3);ne?(B=ne.file,ce=ne.blobUrl,h.name):console.warn("[restore] Fallback IndexedDB MISS:",g,ae)}catch(ne){console.warn("[restore] IndexedDB fallback load failed:",ae,ne)}if(!ce&&ae)try{const ne=P.find(Fe=>Fe.mediaId===ae);if(ne){ne.key;const Fe=await W(St(ne.projectId,ne.mediaId),2e3);Fe&&(B=Fe.file,ce=Fe.blobUrl)}}catch(ne){console.warn("[restore] IndexedDB scan failed:",ne)}if(!ce&&h.storagePath&&Ut()&&!h.storagePath.startsWith("blob:"))try{h.storagePath;const ne=await W(Ya(h.storagePath),5e3);if(!ne)throw new Error("Supabase URL timed out");const Fe=new AbortController,pa=setTimeout(()=>Fe.abort(),8e3),_t=await fetch(ne,{signal:Fe.signal});if(clearTimeout(pa),_t.ok){const ut=await _t.blob();B=new File([ut],h.name||"media",{type:ut.type}),ce=URL.createObjectURL(ut),h.name}}catch(ne){console.warn("[restore] Supabase download failed:",h.storagePath,ne)}return!ce&&h.type!=="text"&&console.error("[restore] FAILED to resolve media for:",h.name,h.type,"— all sources exhausted"),{file:B,blobUrl:ce}},G=/^(draft-|local_)/.test(g),ye=()=>({name:p||"Untitled Project",project_data:{clips:[],mediaItems:[]}});return(async()=>{yt(!0),ge("Restoring media...");try{let h=c;if(!h){if(G)h=ye();else if(!Ut())h=await Ha(g,null);else if(i?.id)try{h=await Ha(g,i.id)}catch(I){if(I?.code==="PGRST116")console.warn("[restore] Supabase has no row for",g,"— attempting IndexedDB-only recovery"),h=ye();else throw I}}if(h||(console.warn("[restore] No project data found for",g,"— attempting IndexedDB-only recovery"),h=ye()),x)return;window.history.replaceState({...t.state,projectId:null,projectData:null,projectName:null},"");const P=p||h.name||"Untitled Project";d(xn(P,{maxLength:100})||"Untitled Project"),s(g),h.resolution&&b(h.resolution);const B=h.project_data?.timelineMarkers??h.timelineMarkers;Ft(Array.isArray(B)?B.filter(I=>I&&typeof I.time=="number"&&Number.isFinite(I.time)&&I.time>=0).map((I,D)=>({id:typeof I.id=="string"&&I.id?I.id:`mk-${D}-${Math.round(I.time*1e3)}`,time:I.time})):[]);const ce=h.project_data?.clips||h.clips||[],ae=h.project_data?.mediaItems||[],Me=await W(Io(),3e3,[]);if(ce.length,ae.length,ce.map(I=>({name:I.name,type:I.type,mediaId:I.mediaId,idbKey:I.idbKey,storagePath:I.storagePath})),ae.map(I=>({id:I.id,name:I.name,idbKey:I.idbKey})),ce.length===0&&ae.length===0){const I=Me.filter(Re=>Re.projectId===g),D=[];for(const Re of I)try{const Ee=await W(St(g,Re.mediaId),3e3);if(!Ee)continue;D.push({id:Re.mediaId,name:Re.name||"media",file:Ee.file,blobUrl:Ee.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:N(Re.mime),isProcessing:!1,idbKey:`idb://${g}:${Re.mediaId}`,_mediaError:null})}catch(Ee){console.warn("[recover] load failed for",Re.mediaId,Ee)}if(x)return;await z(h);let oe=0;if(D.length===0){const Re=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,Ee=Me.filter($e=>$e.projectId&&$e.projectId!==g&&!Re.test($e.projectId)),_e=new Set;for(const $e of Ee)if(!_e.has($e.mediaId)){_e.add($e.mediaId);try{const pt=await W(St($e.projectId,$e.mediaId),3e3);if(!pt)continue;D.push({id:$e.mediaId,name:$e.name||"media",file:pt.file,blobUrl:pt.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:N($e.mime),isProcessing:!1,idbKey:`idb://${$e.projectId}:${$e.mediaId}`,_mediaError:null}),oe++}catch(pt){console.warn("[recover-orphan] load failed for",$e.mediaId,pt)}}oe>0&&console.warn(`[recover-orphan] Surfacing ${oe} orphan media file(s) from stale projectIds`)}if(D.length>0){Ne(D);for(const Ee of D)Ee.type!=="audio"&&(async()=>{try{const _e=await Zt(Ee.file);Ne(fa=>fa.map(rt=>rt.id===Ee.id?{...rt,duration:_e.duration||rt.duration,width:_e.width,height:_e.height}:rt));const $e=await Lt(Ee.file,0),pt=URL.createObjectURL($e);Ne(fa=>fa.map(rt=>rt.id===Ee.id?{...rt,thumbnail:pt}:rt))}catch(_e){console.warn("[recover] metadata regen failed:",Ee.name,_e)}})();y.current=!0;const Re=oe>0?`Surfaced ${oe} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`:`Recovered ${D.length} media file(s) from local cache — re-add them to the timeline, then save`;O("warning",Re);return}y.current=!0,O("info",`Loaded project "${P}" (no clips)`);return}ge("Restoring media...");const ne=new Map,Fe=new Map;for(const I of ae){const D=I.id||I.mediaId;D&&!Fe.has(D)&&Fe.set(D,I)}for(const I of ce){const D=I.mediaId||I.id;I.type!=="text"&&D&&!Fe.has(D)&&Fe.set(D,I)}tt(`Resolving ${Fe.size} media files...`);const pa=await Promise.all([...Fe.entries()].map(async([I,D])=>{if(x)return null;const oe=await fe(D,Me);return{mediaId:I,resolved:oe,meta:D}}));for(const I of pa){if(!I||x)continue;const{mediaId:D,resolved:oe,meta:Re}=I;oe.blobUrl&&ne.set(D,{blobUrl:oe.blobUrl,file:oe.file,meta:Re})}const _t=[];for(const I of ce){let D=null,oe=null;const Re=I.mediaId||I.id;if(Re&&ne.has(Re)){const _e=ne.get(Re);D=_e.blobUrl,oe=_e.file}const Ee=!D&&I.type!=="text";_t.push({...ba,...I,file:oe||null,blobUrl:D||null,thumbnail:null,_mediaError:Ee?"Media not found — re-import":null})}const ut=new Map;for(const[I,D]of ne){const oe=D.meta||{};ut.set(I,{id:I,name:oe.name||"media",file:D.file,blobUrl:D.blobUrl,thumbnail:null,duration:oe.duration||0,width:oe.width||0,height:oe.height||0,type:oe.type||"video",isProcessing:!1,storagePath:oe.storagePath,_mediaError:null})}const ma=[],Wa=new Set;for(const I of ae){const D=I.id||I.mediaId,oe=D?ut.get(D):null;ma.push({id:D,name:I.name||oe?.name||"media",file:oe?.file||null,blobUrl:oe?.blobUrl||null,thumbnail:null,duration:oe?.duration??I.duration??0,width:oe?.width??I.width??0,height:oe?.height??I.height??0,type:I.type||oe?.type||"video",isProcessing:!1,storagePath:I.storagePath||oe?.storagePath,idbKey:I.idbKey,_mediaError:oe?.blobUrl||I.type==="audio"?null:"Media not found — re-import"}),D&&Wa.add(D)}for(const[I,D]of ut)Wa.has(I)||ma.push(D);const At=Er({restoredClips:_t,mediaItems:ma,projectName:P});Ne(At.mediaItems),ie(At.clips),await z(h);for(const I of At.mediaItems)!I.file||I.type==="audio"||(async()=>{try{const D=await Zt(I.file);Ne(Ee=>Ee.map(_e=>_e.id===I.id?{..._e,duration:D.duration||_e.duration,width:D.width,height:D.height}:_e));const oe=await Lt(I.file,0),Re=URL.createObjectURL(oe);Ne(Ee=>Ee.map(_e=>_e.id===I.id?{..._e,thumbnail:Re}:_e))}catch(D){console.warn("[restore] Thumbnail regen failed:",I.name,D)}})();y.current=!0,O(At.notification.level,At.notification.message)}catch(h){console.error("Project load error:",h),O("error","Failed to load project")}finally{x||(yt(!1),ge(""),tt(""))}})(),()=>{x=!0}},[i?.id,t.state?.projectId,O,gt,ie]),a.useEffect(()=>{te.preload()},[]),a.useEffect(()=>{const n=c=>{const p=c.ctrlKey||c.metaKey;if(p&&c.shiftKey&&c.key==="E"){c.preventDefault(),da();return}if(c.key==="Escape"&&V){we(!1);return}const u=document.activeElement;if(!(c.target.tagName==="INPUT"||c.target.tagName==="TEXTAREA"||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA"||u?.isContentEditable)){if(c.key==="/"&&V){c.preventDefault(),document.querySelector(".ai-input-box")?.focus();return}if((c.key==="Delete"||c.key==="Backspace")&&Pe){c.preventDefault(),Vt(Pe);return}p&&c.key==="s"&&c.preventDefault(),p&&c.key==="e"&&(c.preventDefault(),_.length>0&&Et("1080p")),p&&c.key==="z"&&(c.preventDefault(),c.shiftKey?dt():kt()),p&&c.key==="y"&&(c.preventDefault(),dt())}};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[Et,kt,dt,_.length,L,V,da,Pe,Vt]);const Da=a.useRef(Ae),za=a.useRef(_);return a.useEffect(()=>{Da.current=Ae},[Ae]),a.useEffect(()=>{za.current=_},[_]),a.useEffect(()=>()=>{Da.current.forEach(n=>{n.blobUrl&&URL.revokeObjectURL(n.blobUrl),n.thumbnail&&URL.revokeObjectURL(n.thumbnail)}),za.current.forEach(n=>{n.blobUrl&&URL.revokeObjectURL(n.blobUrl)})},[]),e.jsxs("div",{style:{...et.root,...k?{height:"100dvh",...Z?{paddingBottom:0,paddingRight:"44px"}:{paddingBottom:"56px"}}:{}},role:"application","aria-label":"ClipCut Video Editor",children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("style",{children:Lr}),!k&&e.jsx("a",{href:"#editor-timeline",className:"skip-link",children:"Skip to timeline"}),e.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"},children:xt?`Exporting video... ${Ea}%`:wt||""}),e.jsx(Vo,{projectName:l,onProjectNameChange:d,onExport:Et,isExporting:xt,exportProgress:Ea,currentOperation:wt,hasMediaToExport:_.filter(n=>n.type!=="audio"&&n.file).length>0,resolutions:wn,exportPresets:oa,exportSubMessage:Aa,lastSaved:Xn,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,onCancelExport:Qn,onNewProject:Gn,onSave:qn,onSettings:Jn,editorLayout:Q,onLayoutChange:re,forceOpenExport:Bn>0,onExportModalClosed:()=>Dn(0),onAiToggle:da,aiPanelOpen:V}),!k&&e.jsx(Xo,{activeToolbar:w,onToolbarChange:T}),e.jsxs("main",{"aria-label":"Editor workspace",style:{flex:k?1:Q==="wide-timeline"?"0 1 48%":"1 1 0%",display:"flex",flexDirection:k&&Z?"row":k?"column":"row",minWidth:0,minHeight:k?0:"200px",overflow:"hidden",zIndex:0},children:[Q!=="compact"&&!k&&e.jsxs(e.Fragment,{children:[e.jsx(mt,{name:"left-panel",inline:!0,message:"Panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${F}px`}),children:e.jsx("div",{style:{width:`${F}px`,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0e1218"},children:e.jsxs("div",{style:{flex:"1 1 0%",overflow:"hidden auto",minHeight:0},className:"cs",children:[w==="media"&&e.jsx(nn,{mediaTab:X,onMediaTabChange:me,mediaItems:Ae,onImportMedia:Ht,onRemoveMedia:La,onAddToTimeline:Kt,selectedMediaId:ct,onSelectMedia:Ot,isImporting:Ia,style:gn}),w==="text"&&e.jsx(sn,{selectedClip:Oe,onClipUpdate:Ue,onAddClip:ot,currentTime:L.currentTime}),w==="audio"&&e.jsx(ln,{selectedClip:Oe,onClipUpdate:Ue,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt}),w==="captions"&&e.jsx(pn,{clips:_,onAddClip:ot,onSetClips:ie,currentTime:L.currentTime,mediaItems:Ae,selectedClip:Oe,selectedClipId:Pe,onSelectClip:Ze,onClipUpdate:Ue}),w==="stickers"&&e.jsx(cn,{onAddClip:ot,currentTime:L.currentTime}),w==="effects"&&e.jsx(dn,{selectedClip:Oe,onClipUpdate:Ue}),w==="transition"&&e.jsx(on,{rightTab:"video",onRightTabChange:U,rightSubTab:"basic",onRightSubTabChange:Y,selectedClip:Oe,onClipUpdate:Ue,onAllCaptionsUpdate:Ua,clips:_,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt,style:gn}),w==="filters"&&e.jsx(un,{selectedClip:Oe,onClipUpdate:Ue})]})})})}),e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:n=>$t(n,F),onDoubleClick:()=>Le(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})})]}),e.jsx("div",{style:k&&Z?{flex:"0 0 60%",display:"flex",flexDirection:"column",minWidth:0}:{flex:"1 1 0%",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},children:e.jsx(mt,{name:"player",inline:!0,message:"Video player encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"auto",height:"100%"}),children:e.jsx(Ur,{isPlaying:L.isPlaying,onPlayPause:L.togglePlay,videoSrc:Vn,currentTime:L.clipOffset,duration:nt,onTimeUpdate:eo,onSeek:Zn,onEnded:ua,onVideoError:to,clipProperties:L.currentClip||Oe,textOverlays:Hn,selectedClipId:Pe,onClipUpdate:Ue,onSelectClip:Ze,transitionPreview:Yn,hasTimelineClips:_.some(n=>n.type!=="audio"&&n.type!=="text"),hasUnavailableMediaClips:Kn,isRestoringMedia:sa&&wt.includes("Restoring")})})})}),Q!=="compact"&&!k&&Oe&&!V&&e.jsxs("div",{className:"inspector-enter",style:{display:"flex",flexDirection:"row",flexShrink:0,width:`${le+8}px`,overflow:"hidden"},children:[e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:n=>Fn(n,le),onDoubleClick:()=>M(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})}),e.jsx(mt,{name:"inspector",inline:!0,message:"Inspector panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${le}px`}),children:e.jsx(on,{rightTab:q,onRightTabChange:U,rightSubTab:v,onRightSubTabChange:Y,selectedClip:Oe,onClipUpdate:Ue,onAllCaptionsUpdate:Ua,clips:_,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt,style:{width:`${le}px`}})})})]}),!k&&V&&e.jsx(mt,{name:"ai-chat",inline:!0,message:"AI panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"360px"}),children:e.jsx(mn,{isOpen:V,onClose:()=>we(!1),messages:K,isThinking:xe,thinkingStage:J,slowHint:Ce,onSendMessage:Rt,suggestions:de,onApplySuggestion:Oa})})}),k&&e.jsxs("div",{style:Z?{flex:"0 0 40%",display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden",borderLeft:"1px solid rgba(117,170,219,0.08)"}:{display:"contents"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"44px",padding:"0 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",flexShrink:0},children:[e.jsx("button",{onClick:()=>{const n=document.querySelector(".player-container");n&&(n.requestFullscreen?.()||n.webkitRequestFullscreen?.())},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Fullscreen",children:e.jsx(Te,{i:"fullscreen",s:20,c:"#94a3b8"})}),e.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:"12px",letterSpacing:"0.5px",color:"#e2e8f0",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:tn(L.currentTime)}),e.jsx("span",{style:{color:"#475569"},children:"/"}),e.jsx("span",{style:{color:"#94a3b8"},children:tn(nt)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2px"},children:[e.jsx("button",{onClick:kt,disabled:!ht,style:{background:"none",border:"none",cursor:ht?"pointer":"not-allowed",opacity:ht?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:18,c:"#94a3b8"})}),e.jsx("button",{onClick:dt,disabled:!bt,style:{background:"none",border:"none",cursor:bt?"pointer":"not-allowed",opacity:bt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:18,c:"#94a3b8"})})]})]}),Pe&&e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"4px",height:"64px",padding:"4px 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",flexShrink:0,transition:"height 0.2s ease, opacity 0.2s ease"},children:[{icon:"volume_off",label:"Mute clip audio",action:()=>Ue(Pe,{volume:Oe?.volume===0?1:0})},{icon:"image",label:"Cover",action:()=>{}},{icon:"music_note",label:"+ Add audio",action:()=>{ft("audio"),$(!0)}},{icon:"title",label:"+ Add text",action:()=>{ft("text"),$(!0)}}].map((n,c)=>e.jsxs("button",{onClick:n.action,style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",padding:"6px 8px",cursor:"pointer",minWidth:"64px",flex:"0 0 auto",minHeight:"44px"},children:[e.jsx(Te,{i:n.icon,s:20,c:"#e2e8f0"}),e.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",whiteSpace:"nowrap",fontFamily:"'Spline Sans', sans-serif"},children:n.label})]},c))}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(ja,{}),children:e.jsx(rn,{id:"editor-timeline",clips:_,selectedClipId:Pe,onSelectClip:Ze,onUpdateClip:Ue,onDeleteClip:Vt,onSplitClip:qt,onAddClip:ot,onRippleDelete:Na,currentTime:L.currentTime,onSeek:L.seek,totalDuration:nt,isProcessing:sa,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ae,onAddToTimeline:Kt,timelineHeight:ue,timelineMarkers:ia,onTimelineMarkersChange:Ft})})})]})]}),k&&e.jsxs(e.Fragment,{children:[e.jsx(Tr,{isOpen:se,onClose:()=>$(!1),children:e.jsx(mt,{name:"mobile-panel",inline:!0,message:"Panel error",children:e.jsxs(a.Suspense,{fallback:e.jsx(jt,{width:"100%",height:"200px"}),children:[Qe==="media"&&e.jsx(nn,{mediaTab:X,onMediaTabChange:me,mediaItems:Ae,onImportMedia:Ht,onRemoveMedia:La,onAddToTimeline:Kt,selectedMediaId:ct,onSelectMedia:Ot,isImporting:Ia}),Qe==="text"&&e.jsx(sn,{selectedClip:Oe,onClipUpdate:Ue,onAddClip:ot,currentTime:L.currentTime}),Qe==="audio"&&e.jsx(ln,{selectedClip:Oe,onClipUpdate:Ue,bgMusic:Ve,onImportBgMusic:Yt,onUpdateBgMusicVolume:Xt,onRemoveBgMusic:Gt}),Qe==="captions"&&e.jsx(pn,{clips:_,onAddClip:ot,onSetClips:ie,currentTime:L.currentTime,mediaItems:Ae,selectedClip:Oe,selectedClipId:Pe,onSelectClip:Ze,onClipUpdate:Ue}),Qe==="stickers"&&e.jsx(cn,{onAddClip:ot,currentTime:L.currentTime}),Qe==="effects"&&e.jsx(dn,{selectedClip:Oe,onClipUpdate:Ue}),Qe==="filters"&&e.jsx(un,{selectedClip:Oe,onClipUpdate:Ue}),Qe==="ai"&&e.jsx(mn,{isOpen:!0,onClose:()=>$(!1),messages:K,isThinking:xe,thinkingStage:J,slowHint:Ce,onSendMessage:Rt,suggestions:de,onApplySuggestion:Oa,isMobile:!0})]})})}),e.jsx("nav",{className:"mobile-tab-bar","aria-label":"Editor tools",children:[{id:"media",icon:"perm_media",label:"Media",tip:"Import and browse media"},{id:"text",icon:"title",label:"Text",tip:"Add manual text overlays"},{id:"captions",icon:"closed_caption",label:"Captions",tip:"Auto-generate subtitles from speech"},{id:"audio",icon:"music_note",label:"Audio",tip:"Background music and clip audio"},{id:"stickers",icon:"emoji_emotions",label:"Stickers",tip:"Drop emoji stickers on the preview"},{id:"effects",icon:"auto_fix_high",label:"Effects",tip:"Apply video effects"},{id:"filters",icon:"filter_vintage",label:"Filters",tip:"Apply colour filters"},{id:"ai",icon:"auto_awesome",label:"AI",tip:"AI editing assistant"}].map(n=>e.jsxs("button",{className:Qe===n.id&&se?"active":"",title:n.tip,"aria-label":n.tip,onClick:()=>{Qe===n.id?$(c=>!c):(ft(n.id),$(!0))},children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:22,color:Qe===n.id&&se?"#75AADB":void 0},children:n.icon}),e.jsx("span",{children:n.label})]},n.id))})]}),!k&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"resize-handle resize-handle-h",onMouseDown:n=>at(n,ue||Nr),onDoubleClick:()=>he(null),children:e.jsx("div",{className:"resize-handle-dot"})}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(ja,{}),children:e.jsx(rn,{id:"editor-timeline",clips:_,selectedClipId:Pe,onSelectClip:Ze,onUpdateClip:Ue,onDeleteClip:Vt,onSplitClip:qt,onAddClip:ot,onRippleDelete:Na,currentTime:L.currentTime,onSeek:L.seek,totalDuration:nt,isProcessing:sa,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ae,onAddToTimeline:Kt,timelineHeight:ue,timelineMarkers:ia,onTimelineMarkersChange:Ft})})})]}),te.isLoading&&!te.currentOperation&&!wt&&e.jsx($n,{progress:te.loadProgress}),(wt||te.currentOperation)&&e.jsx(Nn,{message:wt||"Processing...",progress:te.currentOperation!=null?te.progress:te.loadProgress,operationLabel:te.currentOperation?`${te.currentOperation}...`:"",subMessage:Aa,onCancel:te.currentOperation?te.cancelOperation:void 0}),zn&&e.jsx(Ln,{onComplete:()=>{Wn(!1),localStorage.setItem("clipcut_onboarded","1")}}),Dt&&e.jsx(On,{type:Dt.type,message:Dt.message,onClose:()=>Pa(null),autoClose:Dt.type!=="error"})]})},Hr=a.memo(Kr),wi=Object.freeze(Object.defineProperty({__proto__:null,default:Hr},Symbol.toStringTag,{value:"Module"}));export{ai as A,ba as D,ti as E,Lo as F,Te as I,di as M,Uo as S,si as T,wi as V,oi as a,ni as b,li as c,gi as d,hi as e,bi as f,yi as g,tn as h,ui as i,en as j,xi as k,ii as l,ri as m,ci as n,et as s,mi as t,fi as x,pi as z};
