const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/sdQCtR1X.js","assets/DwQPoapS.js","assets/DccWSldF.js","assets/CX5pmBt-.js","assets/C_8A2FPv.js","assets/Et-wlZO3.js","assets/CEig1yUM.js","assets/BKPF4vPC.js","assets/B3ewurLh.js","assets/B9CjrYEi.js","assets/CrFPy8FH.js","assets/DDbRbnWd.js","assets/DKWfDqFl.js","assets/BW-7r8Bm.js","assets/B72jlrJH.js","assets/B2yOG-MG.js","assets/bHasDI2A.js","assets/B_b6FKN_.js","assets/9lBn_yJr.js","assets/D_gLo3ck.js","assets/CouMYEjC.js","assets/CY7aBtS-.js","assets/B9KlXlIX.js","assets/BEUlQjCE.js","assets/Dh0lx4MY.js","assets/D8S6fycm.js","assets/CAxxQNFm.js","assets/DMCcCjOS.js"])))=>i.map(i=>d[i]);
import{g as sa,a as Ft,u as ho,D as ya,_ as De,e as Ot,E as bt,A as bo,T as en,f as tn,r as go}from"./CX5pmBt-.js";import{r as o,j as t,a as xo,u as yo}from"./DwQPoapS.js";import{f as En}from"./Et-wlZO3.js";import{u as La,a as wo}from"./CEig1yUM.js";import{i as _n,l as Ye,w as ze,e as Ge,r as Ke,t as He,c as qe,s as Je,a as Xe,b as wa,d as vo,f as ko,g as So,h as jo,m as To,j as Co,E as la,k as Io,n as Mo,o as Ro,p as Eo,q as _o,u as Ao,v as Po,R as An,x as Lo,y as Uo,z as No,A as Fo}from"./BKPF4vPC.js";import{c as Bt,b as an,e as Oo,f as Ct,s as ta,r as $o,g as Pn,h as nn}from"./B3ewurLh.js";import{i as on,b as Bo,v as Do}from"./DccWSldF.js";import{getWorkerUrl as zo}from"./CrFPy8FH.js";const Me=o.memo(({i:e,s:n=18,c:i="currentColor",style:a={},filled:s=!1,weight:l=400,...c})=>t.jsx("span",{className:"material-symbols-outlined",style:{fontSize:`${n}px`,color:i,fontVariationSettings:`'FILL' ${s?1:0}, 'wght' ${l}`,transition:"color 0.15s ease",userSelect:"none",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center",...a},"aria-hidden":"true",...c,children:e}));Me.displayName="Icon";const Wo=`
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
`,ia=o.memo(({i:e,onClick:n,style:i={},title:a,disabled:s=!1,size:l=18,color:c="#64748b",hoverColor:u="#94a3b8",...g})=>{const[f,y]=o.useState(!1),x=o.useCallback(w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),n?.())},[n]);return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:Wo}),t.jsx("button",{className:"ghost-btn",style:{background:"none",border:"none",cursor:s?"not-allowed":"pointer",padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",opacity:s?.5:1,...i},onClick:s?void 0:n,onKeyDown:x,onMouseEnter:()=>y(!0),onMouseLeave:()=>y(!1),disabled:s,title:a,"aria-label":g["aria-label"]||a,...g,children:t.jsx(Me,{i:e,s:l,c:f&&!s?u:c})})]})});ia.displayName="GhostBtn";const et={root:{width:"100%",maxWidth:"100vw",minWidth:0,minHeight:0,height:"100vh",display:"flex",flexDirection:"column",background:"var(--color-bg-dark, #08090c)",color:"var(--color-text-primary, #f1f5f9)",overflow:"hidden",fontFamily:"'Spline Sans', sans-serif"},ghost:{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all var(--transition-normal, 0.15s ease)"},topBar:{height:"42px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",flexShrink:0,position:"relative",zIndex:3e3},titleInput:{position:"absolute",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid transparent",outline:"none",textAlign:"center",fontSize:"12px",fontWeight:500,color:"#cbd5e1",width:"220px",padding:"5px 14px",borderRadius:"4px",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease"},exportBtn:{marginLeft:"6px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"#0a0a0a",padding:"7px 22px",borderRadius:"6px",fontSize:"11px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.25)",letterSpacing:"0.3px",textTransform:"uppercase"},toolbar:{height:"46px",background:"#0e1218",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",padding:"0 8px",gap:0,flexShrink:0},leftPanel:{width:"280px",minWidth:0,maxWidth:"100%",borderRight:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},importBtn:{width:"100%",background:"rgba(117, 170, 219, 0.03)",border:"1.5px dashed rgba(117, 170, 219, 0.15)",borderRadius:"8px",padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",cursor:"pointer",position:"relative",fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all 0.15s ease"},rightPanel:{width:"320px",minWidth:0,maxWidth:"100%",borderLeft:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},controls:{height:"52px",background:"linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",borderTop:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"relative"},timeline:{flex:"0 0 auto",height:"280px",background:"#08090c",borderTop:"2px solid rgba(117, 170, 219, 0.1)",display:"flex",flexDirection:"column",minHeight:"120px",overflow:"hidden",position:"relative",zIndex:10},tlToolbar:{height:"38px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}},Vo=`
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
`,it=[{id:"media",icon:"folder_open",label:"Media"},{id:"audio",icon:"music_note",label:"Audio"},{id:"text",icon:"text_fields",label:"Text"},{id:"captions",icon:"closed_caption",label:"Captions"},{id:"stickers",icon:"mood",label:"Stickers"},{id:"effects",icon:"auto_fix_high",label:"Effects"},{id:"transition",icon:"layers",label:"Transition"},{id:"filters",icon:"filter_list",label:"Filters"}],Ko={PLAY_PAUSE:{key:"Space",description:"Play/Pause"},SKIP_FORWARD:{key:"ArrowRight",description:"Skip forward 5s"},SKIP_BACKWARD:{key:"ArrowLeft",description:"Skip backward 5s"},SKIP_FORWARD_LARGE:{key:"Shift+ArrowRight",description:"Skip forward 10s"},SKIP_BACKWARD_LARGE:{key:"Shift+ArrowLeft",description:"Skip backward 10s"},FRAME_FORWARD:{key:".",description:"Next frame"},FRAME_BACKWARD:{key:",",description:"Previous frame"},GO_TO_START:{key:"Home",description:"Go to start"},GO_TO_END:{key:"End",description:"Go to end"},SPLIT:{key:"S",description:"Split at playhead"},DELETE:{key:"Delete",description:"Delete selected"},DESELECT:{key:"Escape",description:"Deselect"},MUTE:{key:"M",description:"Mute/Unmute"},VOLUME_UP:{key:"ArrowUp",description:"Volume up"},VOLUME_DOWN:{key:"ArrowDown",description:"Volume down"},FULLSCREEN:{key:"F",description:"Toggle fullscreen"},SAVE:{key:"Ctrl+S",description:"Save project"},EXPORT:{key:"Ctrl+E",description:"Export video"},IMPORT:{key:"Ctrl+I",description:"Import media"},TOOLBAR_1:{key:"1",description:"Media panel"},TOOLBAR_2:{key:"2",description:"Audio panel"},TOOLBAR_3:{key:"3",description:"Text panel"},TOOLBAR_4:{key:"4",description:"Stickers panel"},TOOLBAR_5:{key:"5",description:"Effects panel"},TOOLBAR_6:{key:"6",description:"Transitions panel"},TOOLBAR_7:{key:"7",description:"Filters panel"}},Ho=`
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
`,va={volume:1,isMuted:!1,speed:1,rotation:0,opacity:1,positionX:0,positionY:0,scale:1,brightness:0,contrast:0,saturation:1,temperature:0,filterName:null,filterStrength:50,effects:[],fadeIn:0,fadeOut:0,track:0,trimStart:0,trimEnd:0,colorGrading:{shadows:"#1a1a2e",midtones:"#4a4a5e",highlights:"#ffffff"},transition:null,transitionDuration:1,text:"",textColor:"#ffffff",textSize:48,textPosition:"bottom-center",textBgColor:"",textBold:!1,textItalic:!1,textUnderline:!1,textAlign:"center",textFontFamily:"Spline Sans",textStartTime:0,textDuration:0,textX:null,textY:null},Yo=[{name:"None",filter:null,css:null},{name:"90s",filter:"colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8",css:"sepia(0.3) saturate(0.8)"},{name:"Vintage",filter:"eq=saturation=0.6:brightness=0.05",css:"sepia(0.4) saturate(0.6) brightness(1.05)"},{name:"Cinema",filter:"eq=contrast=1.2:brightness=-0.05:saturation=1.1",css:"contrast(1.2) brightness(0.95) saturate(1.1)"},{name:"B&W",filter:"eq=saturation=0",css:"grayscale(1)"},{name:"Warm",filter:"colortemperature=6500",css:"sepia(0.15) saturate(1.2)"},{name:"Cool",filter:"colortemperature=3500",css:"saturate(0.9) hue-rotate(10deg)"},{name:"Sepia",filter:"colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",css:"sepia(0.8)"}],bi=[{name:"Motion Blur",type:"blur",params:{radius:5},css:"blur(2px)",icon:"blur_on"},{name:"Sharpen",type:"sharpen",params:{strength:1},css:"contrast(1.1)",icon:"deblur"},{name:"Vignette",type:"vignette",params:{},css:null,icon:"vignette"},{name:"Gaussian Blur",type:"blur",params:{radius:10},css:"blur(4px)",icon:"lens_blur"},{name:"Glitch",type:"glitch",params:{intensity:3},css:null,icon:"broken_image"},{name:"Zoom",type:"zoom",params:{factor:1.5},css:null,icon:"zoom_in"},{name:"Shake",type:"shake",params:{intensity:5},css:null,icon:"vibration"},{name:"Flash",type:"flash",params:{duration:.5},css:null,icon:"flash_on"}],gi=[{name:"Fade In",key:"fadeIn",value:1},{name:"Fade Out",key:"fadeOut",value:1},{name:"Scale Up",key:"scaleUp",value:!0},{name:"Slide Left",key:"slideLeft",value:!0}],xi=[{value:null,label:"None",icon:"block"},{value:"fade",label:"Fade",icon:"gradient"},{value:"fadeblack",label:"Fade Black",icon:"brightness_1"},{value:"fadewhite",label:"Fade White",icon:"brightness_7"},{value:"dissolve",label:"Dissolve",icon:"blur_on"},{value:"wipeleft",label:"Wipe Left",icon:"arrow_back"},{value:"wiperight",label:"Wipe Right",icon:"arrow_forward"},{value:"slideup",label:"Slide Up",icon:"arrow_upward"},{value:"slidedown",label:"Slide Down",icon:"arrow_downward"}],yi=[{value:"top-left",label:"Top Left",icon:"north_west"},{value:"top-center",label:"Top",icon:"north"},{value:"top-right",label:"Top Right",icon:"north_east"},{value:"center-left",label:"Left",icon:"west"},{value:"center",label:"Center",icon:"center_focus_strong"},{value:"center-right",label:"Right",icon:"east"},{value:"bottom-left",label:"Bottom Left",icon:"south_west"},{value:"bottom-center",label:"Bottom",icon:"south"},{value:"bottom-right",label:"Bottom Right",icon:"south_east"}],wi=[{emoji:"😀",label:"Grinning",category:"smileys"},{emoji:"😂",label:"Laughing",category:"smileys"},{emoji:"🥹",label:"Touched",category:"smileys"},{emoji:"😍",label:"Heart Eyes",category:"smileys"},{emoji:"🤩",label:"Star Struck",category:"smileys"},{emoji:"😎",label:"Cool",category:"smileys"},{emoji:"🥳",label:"Party",category:"smileys"},{emoji:"😱",label:"Shocked",category:"smileys"},{emoji:"🤔",label:"Thinking",category:"smileys"},{emoji:"😴",label:"Sleeping",category:"smileys"},{emoji:"👍",label:"Thumbs Up",category:"hands"},{emoji:"👎",label:"Thumbs Down",category:"hands"},{emoji:"👏",label:"Clap",category:"hands"},{emoji:"🙌",label:"Raised Hands",category:"hands"},{emoji:"🤝",label:"Handshake",category:"hands"},{emoji:"✌️",label:"Peace",category:"hands"},{emoji:"🤞",label:"Fingers Crossed",category:"hands"},{emoji:"💪",label:"Strong",category:"hands"},{emoji:"❤️",label:"Heart",category:"symbols"},{emoji:"🔥",label:"Fire",category:"symbols"},{emoji:"⭐",label:"Star",category:"symbols"},{emoji:"💯",label:"100",category:"symbols"},{emoji:"✨",label:"Sparkles",category:"symbols"},{emoji:"💥",label:"Boom",category:"symbols"},{emoji:"🎯",label:"Target",category:"symbols"},{emoji:"⚡",label:"Lightning",category:"symbols"},{emoji:"🚀",label:"Rocket",category:"symbols"},{emoji:"💎",label:"Diamond",category:"symbols"},{emoji:"🎬",label:"Clapper",category:"objects"},{emoji:"🎵",label:"Music",category:"objects"},{emoji:"🎤",label:"Mic",category:"objects"},{emoji:"📸",label:"Camera",category:"objects"},{emoji:"🎮",label:"Gaming",category:"objects"},{emoji:"🏆",label:"Trophy",category:"objects"},{emoji:"🎁",label:"Gift",category:"objects"},{emoji:"💡",label:"Idea",category:"objects"},{emoji:"👆",label:"Point Up",category:"arrows"},{emoji:"👇",label:"Point Down",category:"arrows"},{emoji:"👈",label:"Point Left",category:"arrows"},{emoji:"👉",label:"Point Right",category:"arrows"},{emoji:"⬆️",label:"Arrow Up",category:"arrows"},{emoji:"⬇️",label:"Arrow Down",category:"arrows"},{emoji:"🔔",label:"Bell",category:"objects"},{emoji:"💬",label:"Speech",category:"objects"},{emoji:"🏷️",label:"Tag",category:"objects"},{emoji:"📌",label:"Pin",category:"objects"}],vi=[{name:"Title",textSize:64,textColor:"#ffffff",textPosition:"center",textBgColor:"",textBold:!0,textAlign:"center",icon:"title"},{name:"Subtitle",textSize:36,textColor:"#e2e8f0",textPosition:"bottom-center",textBgColor:"",textBold:!1,textAlign:"center",icon:"subtitles"},{name:"Caption",textSize:24,textColor:"#ffffff",textPosition:"bottom-center",textBgColor:"#000000",textBold:!1,textAlign:"center",icon:"closed_caption"},{name:"Lower Third",textSize:28,textColor:"#ffffff",textPosition:"bottom-left",textBgColor:"rgba(0,0,0,0.7)",textBold:!0,textAlign:"left",icon:"video_label"}],ki=["Spline Sans","Arial","Georgia","Courier New","Impact","Comic Sans MS","Trebuchet MS","Verdana","Times New Roman"],Si=[{label:"0.25x",value:.25},{label:"0.5x",value:.5},{label:"1x",value:1},{label:"1.5x",value:1.5},{label:"2x",value:2}];function Xo(e){const n=String(e||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(n)return n;const i=new Date,a=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${a(i.getMonth()+1)}-${a(i.getDate())}`}function Go(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(e)?!0:navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1}const Ua=`
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
`,rn=[{key:"low",label:"Low",crf:28},{key:"medium",label:"Medium",crf:23},{key:"high",label:"High",crf:18},{key:"ultra",label:"Ultra",crf:15}],qo=[{key:"webm",label:"WebM"},{key:"mp4",label:"MP4 (via server)"}],Jo=[24,30,60],Qo=o.memo(({items:e,selected:n,onSelect:i,style:a})=>t.jsx("div",{style:{display:"flex",gap:"4px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"3px",...a},children:e.map(s=>t.jsx("button",{onClick:()=>i(s.key||s),style:{flex:1,padding:"6px 8px",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",background:(s.key||s)===n?"rgba(117,170,219,0.15)":"transparent",color:(s.key||s)===n?"#75aadb":"#64748b"},children:s.label||s},s.key||s))}));Qo.displayName="PillGroup";const Ln=o.memo(({isOpen:e,onClose:n,onExport:i,isExporting:a,progress:s,operationLabel:l="Processing",subMessage:c="",resolutions:u,exportPresets:g={},onCancel:f,projectName:y="Untitled",exportResult:x,onDownload:w,onExportAnother:_})=>{const[R,v]=o.useState("480p"),[q,K]=o.useState("resolution"),[W,Q]=o.useState("youtube-1080p"),[ie,k]=o.useState("webm"),[U,oe]=o.useState("medium"),[I,V]=o.useState(30),[se,A]=o.useState(""),[J,te]=o.useState(null);o.useEffect(()=>{e&&!se&&A(Xo(y))},[e,y]);const ge=Go();if(o.useEffect(()=>{if(!e)return;const j=E=>{E.key==="Escape"&&!a&&n()};return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)},[e,a,n]),o.useEffect(()=>{if(!e)return;const E=document.getElementById("export-modal")?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');E?.length&&E[0].focus()},[e]),o.useEffect(()=>{if(!e)return;let j=!0;return te(null),_n().then(E=>{j&&te(!!E)}).catch(()=>{j&&te(!1)}),()=>{j=!1}},[e]),!e)return null;const P=j=>{j.target===j.currentTarget&&!a&&!x&&n()};u?.[R];const D=rn.find(j=>j.key===U),xe=[ie.toUpperCase(),R,`${I}fps`],le=q==="platform"?g[W]?.label:xe.join(" · "),Ie=()=>{const j=q==="platform"?`preset:${W}`:R;i(j,{format:ie,quality:D?.crf,fps:I,filename:se||y})},ye=()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"hud-body",children:[t.jsxs("div",{className:"hud-row",children:[t.jsx("span",{className:"hud-label",children:"Container · Codec"}),t.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Output format",children:qo.map(j=>t.jsx("button",{className:ie===j.key?"is-active":"",onClick:()=>k(j.key),role:"radio","aria-checked":ie===j.key,children:j.label},j.key))})]}),t.jsxs("div",{className:"hud-row",children:[t.jsx("span",{className:"hud-label",children:"Target"}),t.jsxs("div",{className:"hud-segment",role:"radiogroup","aria-label":"Target mode",children:[t.jsx("button",{className:q==="resolution"?"is-active":"",onClick:()=>K("resolution"),role:"radio","aria-checked":q==="resolution",children:"By Resolution"}),t.jsx("button",{className:q==="platform"?"is-active":"",onClick:()=>K("platform"),role:"radio","aria-checked":q==="platform",children:"By Platform"})]})]}),t.jsxs("div",{className:"hud-row",children:[t.jsx("span",{className:"hud-label",children:"Signal"}),q==="resolution"?t.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Resolution",children:Object.entries(u).map(([j,{label:E,width:ee,height:T}])=>{const M=R===j;return t.jsxs("button",{className:`hud-row-item ${M?"is-active":""}`,onClick:()=>v(j),role:"radio","aria-checked":M,children:[t.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),t.jsx("span",{className:"hud-row-name",children:E}),t.jsxs("span",{className:"hud-row-spec",children:[ee,"×",T]}),t.jsxs("span",{className:"hud-row-spec",style:{color:M?"#75AADB":"rgba(255,255,255,0.34)"},children:[Math.round(ee*T/1e4)/100,"MP"]})]},j)})}):t.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Platform",children:Object.entries(g).map(([j,E])=>{const ee=W===j;return t.jsxs("button",{className:`hud-row-item ${ee?"is-active":""}`,onClick:()=>Q(j),role:"radio","aria-checked":ee,style:{gridTemplateColumns:"18px 1fr auto"},children:[t.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),t.jsxs("span",{className:"hud-row-name",children:[E.label,t.jsx("span",{className:"hud-row-sub",style:{gridColumn:"unset",display:"block",marginTop:3},children:E.description})]}),t.jsxs("span",{className:"hud-row-spec",children:[E.width,"×",E.height]})]},j)})})]}),t.jsxs("div",{className:"hud-row-split",children:[t.jsxs("div",{className:"hud-row",children:[t.jsx("span",{className:"hud-label",children:"Quality (CRF)"}),t.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Quality",children:rn.map(j=>t.jsx("button",{className:U===j.key?"is-active":"",onClick:()=>oe(j.key),role:"radio","aria-checked":U===j.key,title:`CRF ${j.crf}`,children:j.label},j.key))})]}),t.jsxs("div",{className:"hud-row",children:[t.jsx("span",{className:"hud-label",children:"Frame Rate"}),t.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Frame rate",children:Jo.map(j=>t.jsxs("button",{className:I===j?"is-active":"",onClick:()=>V(j),role:"radio","aria-checked":I===j,children:[j,"fps"]},j))})]})]}),t.jsxs("div",{className:"hud-row",children:[t.jsx("span",{className:"hud-label",children:"Filename"}),t.jsx("input",{type:"text",className:"hud-input",value:se,onChange:j=>A(j.target.value),"aria-label":"Export filename",placeholder:"clipcut-export"})]}),t.jsxs("div",{className:"hud-summary",role:"status",children:[t.jsx("span",{className:"hud-summary-dot","aria-hidden":"true"}),t.jsxs("div",{style:{minWidth:0,flex:1},children:[t.jsxs("div",{className:"hud-summary-text",children:["Ready · ",le]}),ie==="webm"&&!ge&&t.jsx("div",{className:"hud-summary-note",children:"WebM plays on most devices. For iPhone Photos compatibility, choose MP4."}),ie==="webm"&&ge&&t.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead."}),ie==="mp4"&&t.jsxs("div",{className:"hud-summary-note hud-summary-note--warn",children:[J==null&&"Checking MP4 server availability...",J===!0&&"MP4 server is online. Export will render locally, then transcode to MP4 on server.",J===!1&&"MP4 server is currently unavailable. Export will fall back to local WebM."]})]})]})]}),t.jsxs("div",{className:"hud-actions",children:[t.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:n,children:"Cancel"}),t.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:Ie,children:[t.jsx(Me,{i:"download",s:14,c:"#04060b"}),"Render · Export"]})]})]}),pe=()=>{const j=Math.max(0,Math.min(100,Math.round(s)));return t.jsx("div",{className:"hud-body",children:t.jsxs("div",{className:"hud-progress",children:[t.jsxs("div",{className:"hud-big-readout","aria-live":"polite","aria-atomic":"true",children:[String(j).padStart(2,"0"),t.jsx("span",{className:"pct",children:"%"})]}),t.jsxs("div",{children:[t.jsx("div",{className:"hud-op-label",children:l||"Rendering"}),c&&t.jsx("div",{className:"hud-op-sub",children:c})]}),t.jsxs("div",{className:"hud-filmstrip",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":j,children:[t.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--top","aria-hidden":"true",children:Array.from({length:24}).map((E,ee)=>t.jsx("span",{style:{animationDelay:`${(ee*.05).toFixed(2)}s`}},ee))}),t.jsx("div",{className:"hud-filmstrip-fill",style:{width:`${j}%`}}),t.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--bottom","aria-hidden":"true",children:Array.from({length:24}).map((E,ee)=>t.jsx("span",{style:{animationDelay:`${(ee*.05+.1).toFixed(2)}s`}},ee))})]}),t.jsxs("div",{className:"hud-telemetry","aria-label":"Telemetry",children:[t.jsxs("div",{className:"hud-telemetry-cell",children:[t.jsx("span",{className:"hud-telemetry-label",children:"Format"}),t.jsx("span",{className:"hud-telemetry-value",children:ie.toUpperCase()})]}),t.jsxs("div",{className:"hud-telemetry-cell",children:[t.jsx("span",{className:"hud-telemetry-label",children:"Signal"}),t.jsx("span",{className:"hud-telemetry-value",children:q==="platform"?g[W]?.label||"—":R.toUpperCase()})]}),t.jsxs("div",{className:"hud-telemetry-cell",children:[t.jsx("span",{className:"hud-telemetry-label",children:"Frame Rate"}),t.jsxs("span",{className:"hud-telemetry-value",children:[I,"fps"]})]})]})]})})},de=()=>f?t.jsx("div",{className:"hud-actions",style:{justifyContent:"center"},children:t.jsx("button",{type:"button",className:"hud-btn hud-btn--danger",onClick:f,children:"Abort render"})}):null,ke=()=>t.jsx("div",{className:"hud-body",children:t.jsxs("div",{className:"hud-complete",children:[t.jsxs("div",{className:"hud-complete-stamp",children:[t.jsx("span",{className:"led","aria-hidden":"true"}),"Export complete · Signal locked"]}),t.jsx("h3",{className:"hud-complete-title",children:"Your file is ready."}),x?.size&&t.jsxs("span",{className:"hud-complete-file",children:[(x.size/(1024*1024)).toFixed(1)," MB · ",ie.toUpperCase()]})]})}),be=()=>t.jsxs("div",{className:"hud-actions",children:[t.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:n,children:"Close"}),_&&t.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:_,children:"Export another"}),w&&t.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:w,children:[t.jsx(Me,{i:"download",s:14,c:"#04060b"}),"Download"]})]}),Te=x?"hud-head-led hud-head-led--green":a?"hud-head-led hud-head-led--amber":"hud-head-led",Pe=x?"Complete":a?"Rendering":"Standby";return t.jsxs("div",{className:"hud-backdrop",onClick:P,role:"dialog","aria-modal":"true","aria-labelledby":"export-modal-title",children:[t.jsx("style",{children:Ua}),t.jsxs("div",{id:"export-modal",className:"hud-console",children:[t.jsxs("div",{className:"hud-head",children:[t.jsxs("div",{className:"hud-head-left",children:[t.jsx("span",{className:Te,"aria-hidden":"true"}),t.jsxs("h2",{id:"export-modal-title",className:"hud-head-title",children:[t.jsx("span",{children:"CC · EXPORT"}),t.jsx("span",{className:"sep",children:"//"}),t.jsx("span",{className:"ch-id",children:Pe.toUpperCase()})]})]}),!a&&!x&&t.jsx("button",{onClick:n,className:"hud-head-close","aria-label":"Close export dialog",title:"Close (Escape)",children:t.jsx(Me,{i:"close",s:16,c:"currentColor"})})]}),x?ke():a?pe():ye(),!a&&!x&&null,a&&de(),x&&be()]})]})});Ln.displayName="ExportModal";const Zo={Playback:["PLAY_PAUSE","SKIP_FORWARD","SKIP_BACKWARD","SKIP_FORWARD_LARGE","SKIP_BACKWARD_LARGE","FRAME_FORWARD","FRAME_BACKWARD","GO_TO_START","GO_TO_END"],Editing:["SPLIT","DELETE","DESELECT"],Audio:["MUTE","VOLUME_UP","VOLUME_DOWN"],View:["FULLSCREEN"],File:["SAVE","EXPORT","IMPORT"]},Un=o.memo(({isOpen:e,onClose:n})=>(o.useEffect(()=>{if(!e)return;const i=a=>{a.key==="Escape"&&n()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e,n]),e?t.jsxs("div",{className:"shortcuts-modal-backdrop",onClick:i=>i.target===i.currentTarget&&n(),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3500,backdropFilter:"blur(4px)"},role:"dialog","aria-modal":"true","aria-labelledby":"shortcuts-modal-title",children:[t.jsx("style",{children:Ua}),t.jsxs("div",{className:"shortcuts-modal-content",style:{background:"#1a2332",borderRadius:"12px",padding:"24px",width:"520px",maxWidth:"90vw",maxHeight:"80vh",overflow:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[t.jsxs("h2",{id:"shortcuts-modal-title",style:{margin:0,fontSize:"18px",fontWeight:600,color:"white",display:"flex",alignItems:"center",gap:"10px"},children:[t.jsx(Me,{i:"keyboard",s:22,c:"#75aadb"}),"Keyboard Shortcuts"]}),t.jsx("button",{onClick:n,style:{...et.ghost,padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":"Close shortcuts dialog",children:t.jsx(Me,{i:"close",s:20,c:"#94a3b8"})})]}),Object.entries(Zo).map(([i,a])=>t.jsxs("div",{style:{marginBottom:"20px"},children:[t.jsx("h3",{style:{fontSize:"11px",color:"#75aadb",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,margin:"0 0 10px 0"},children:i}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:a.map(s=>{const l=Ko[s];return l?t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:"6px",background:"rgba(255,255,255,0.02)"},children:[t.jsx("span",{style:{fontSize:"13px",color:"#cbd5e1"},children:l.description}),t.jsx("span",{className:"shortcut-key",children:l.key})]},s):null})})]},i))]})]}):null));Un.displayName="KeyboardShortcutsModal";const er=[{id:"new",icon:"add",label:"New Project",shortcut:null},{id:"save",icon:"save",label:"Save",shortcut:"Ctrl+S"},{id:"divider1"},{id:"export",icon:"download",label:"Export",shortcut:"Ctrl+E"},{id:"divider2"},{id:"settings",icon:"settings",label:"Settings",shortcut:null}],Nn=o.memo(({isOpen:e,onClose:n,onNewProject:i,onSave:a,onExport:s,onSettings:l,hasMediaToExport:c})=>{const u=o.useRef(null);if(o.useEffect(()=>{if(!e)return;const f=x=>{u.current&&!u.current.contains(x.target)&&n()},y=x=>{x.key==="Escape"&&n()};return requestAnimationFrame(()=>{document.addEventListener("mousedown",f),document.addEventListener("keydown",y)}),()=>{document.removeEventListener("mousedown",f),document.removeEventListener("keydown",y)}},[e,n]),!e)return null;const g=f=>{switch(n(),f){case"new":i?.();break;case"save":a?.();break;case"export":c&&s?.();break;case"settings":l?.();break}};return t.jsx("div",{ref:u,className:"menu-dropdown",role:"menu",style:{position:"absolute",top:"100%",left:0,marginTop:"4px",background:"#1a2332",borderRadius:"8px",padding:"4px",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",minWidth:"200px",zIndex:100},children:er.map(f=>{if(f.id.startsWith("divider"))return t.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0"}},f.id);const y=f.id==="export"&&!c;return t.jsxs("button",{className:"menu-dropdown-item",role:"menuitem",onClick:()=>!y&&g(f.id),style:{...et.ghost,display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"6px",width:"100%",textAlign:"left",color:y?"#475569":"#cbd5e1",cursor:y?"not-allowed":"pointer",opacity:y?.5:1,fontSize:"13px",fontFamily:"'Spline Sans', sans-serif"},disabled:y,children:[t.jsx(Me,{i:f.icon,s:16,c:y?"#475569":"#94a3b8"}),t.jsx("span",{style:{flex:1},children:f.label}),f.shortcut&&t.jsx("span",{style:{fontSize:"11px",color:"#475569",fontFamily:"'SF Mono', Monaco, monospace"},children:f.shortcut})]},f.id)})})});Nn.displayName="MenuDropdown";const tr=({projectName:e,onProjectNameChange:n,onExport:i,isExporting:a=!1,exportProgress:s=0,currentOperation:l="",hasMediaToExport:c=!1,resolutions:u={},exportPresets:g={},lastSaved:f=null,canUndo:y=!1,canRedo:x=!1,onUndo:w,onRedo:_,onCancelExport:R,exportSubMessage:v="",onNewProject:q,onSave:K,onSettings:W,editorLayout:Q="default",onLayoutChange:ie,forceOpenExport:k=!1,onExportModalClosed:U,onAiToggle:oe,aiPanelOpen:I=!1})=>{const V=La(),[se,A]=o.useState(!1),[J,te]=o.useState(!1),[ge,P]=o.useState(!1),[D,xe]=o.useState(!1),le=o.useRef(null);o.useEffect(()=>{const E=ee=>{ee.target.tagName==="INPUT"||ee.target.tagName==="TEXTAREA"||(ee.key==="?"||ee.shiftKey&&ee.key==="/")&&(ee.preventDefault(),xe(T=>!T))};return window.addEventListener("keydown",E),()=>window.removeEventListener("keydown",E)},[]),o.useEffect(()=>{k&&c&&!a&&(A(!0),U?.())},[k,c,a,U]);const Ie=o.useCallback(()=>{a||(c?A(!0):console.warn("Export not available:",{hasMediaToExport:c,isExporting:a}))},[c,a]),ye=o.useCallback((E,ee)=>{i?.(E,ee)},[i]),pe=o.useCallback(()=>{a||(A(!1),Te(null))},[a]),de=o.useCallback(E=>{const ee=En(E.target.value,{maxLength:100});n(ee)},[n]),ke=o.useCallback(E=>{(E.key==="Enter"||E.key==="Escape")&&E.target.blur()},[]),[be,Te]=o.useState(null);o.useEffect(()=>{!a&&s>=100&&se&&!be&&Te({size:null}),se||Te(null)},[a,s,se,be]);const[Pe,j]=o.useState("");return o.useEffect(()=>{const E=()=>{j(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}))};E();const ee=setInterval(E,6e4);return()=>clearInterval(ee)},[]),t.jsxs(t.Fragment,{children:[t.jsx("style",{children:Ua}),t.jsxs("header",{style:{...et.topBar,...V?{height:"44px",padding:"0 10px"}:{}},role:"banner","aria-label":"ClipCut editor header",children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[t.jsxs("div",{className:"logo-container",style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},role:"img","aria-label":"ClipCut logo",children:[t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(117, 170, 219, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(Me,{i:"movie_edit",s:18,c:"#75aadb"})}),!V&&t.jsx("span",{style:{fontWeight:700,fontSize:"15px",letterSpacing:"-0.3px",color:"white"},children:"ClipCut"})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginLeft:"8px",fontSize:"11px"},children:[t.jsxs("div",{ref:le,style:{position:"relative"},children:[t.jsx("button",{className:"menu-btn",onClick:()=>P(E=>!E),style:{...et.ghost,display:"flex",alignItems:"center",gap:"2px",color:ge?"#75aadb":"#94a3b8"},"aria-haspopup":"menu","aria-expanded":ge,"aria-label":"Open menu",children:V?t.jsx(Me,{i:"menu",s:18}):t.jsxs(t.Fragment,{children:["Menu ",t.jsx(Me,{i:"arrow_drop_down",s:16})]})}),t.jsx(Nn,{isOpen:ge,onClose:()=>P(!1),onNewProject:q,onSave:K,onExport:Ie,onSettings:W,hasMediaToExport:c})]}),!V&&t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[t.jsx("button",{onClick:w,disabled:!y,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:y?1:.4,cursor:y?"pointer":"not-allowed"},title:"Undo (Ctrl+Z)","aria-label":"Undo",children:t.jsx(Me,{i:"undo",s:14,c:y?"#94a3b8":"#475569"})}),t.jsx("button",{onClick:_,disabled:!x,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:x?1:.4,cursor:x?"pointer":"not-allowed"},title:"Redo (Ctrl+Shift+Z or Ctrl+Y)","aria-label":"Redo",children:t.jsx(Me,{i:"redo",s:14,c:x?"#94a3b8":"#475569"})})]}),!V&&f&&t.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Last saved at ${f.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}`,title:`Last saved: ${f.toLocaleString()}`,children:[t.jsx(Me,{i:"cloud_done",s:12,c:"#475569"}),"Saved ",f.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]}),!V&&!f&&t.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":"Auto save at current time",children:[t.jsx(Me,{i:"cloud_done",s:12,c:"#475569"}),"Auto save at ",Pe]})]})]}),t.jsx("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:t.jsx("input",{type:"text",value:e,onChange:de,onFocus:()=>te(!0),onBlur:()=>te(!1),onKeyDown:ke,className:"title-input",style:{...et.titleInput,position:"relative",left:"auto",transform:"none",border:"1px solid transparent",width:V?"120px":"220px",pointerEvents:"auto"},"aria-label":"Project name",title:"Click to edit project name"})}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:V?"4px":"8px"},children:[oe&&t.jsx(ia,{i:"auto_awesome",title:"AI Editor","aria-label":I?"Close AI editor":"Open AI editor",onClick:oe,style:I?{color:"#75aadb",background:"rgba(117,170,219,0.12)"}:void 0}),!V&&t.jsx(ia,{i:"keyboard",title:"Keyboard shortcuts","aria-label":"Show keyboard shortcuts",onClick:()=>xe(!0)}),!V&&t.jsx(ia,{i:Q==="default"?"grid_view":Q==="wide-timeline"?"view_agenda":"view_compact",title:`Layout: ${Q}`,"aria-label":"Cycle layout",onClick:()=>{const E=["default","wide-timeline","compact"],ee=E.indexOf(Q);ie?.(E[(ee+1)%E.length])}}),t.jsxs("button",{onClick:Ie,className:V?"":"export-btn",style:{...V?{background:c&&!a?"#22c55e":"rgba(34,197,94,0.5)",border:"none",borderRadius:"20px",padding:"6px 14px",fontSize:"12px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Spline Sans', sans-serif",cursor:c&&!a?"pointer":"not-allowed",minHeight:"32px",minWidth:"auto",transition:"all 0.2s ease"}:{...et.exportBtn,opacity:c&&!a?1:.5,cursor:c&&!a?"pointer":"not-allowed"}},disabled:!c||a,"aria-label":a?"Exporting...":c?"Export video":"Add media to timeline to export",title:a?"Export in progress...":c?"Export video (Ctrl+E)":"Add media to timeline first",children:[t.jsx(Me,{i:"download",s:14,c:V?"#fff":"#0a0a0a"}),a?"Exporting...":"Export"]})]})]}),t.jsx(Ln,{isOpen:se,onClose:pe,onExport:ye,isExporting:a,progress:s,operationLabel:l||"Exporting video...",subMessage:v,resolutions:u,exportPresets:g,onCancel:a?R:void 0,projectName:e,exportResult:be,onDownload:be?pe:void 0,onExportAnother:be?()=>Te(null):void 0}),t.jsx(Un,{isOpen:D,onClose:()=>xe(!1)})]})},ar=o.memo(tr),nr=`
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
`,Fn=o.memo(({item:e,isActive:n,onClick:i,shortcut:a,compact:s})=>{const[l,c]=o.useState(!1),u=o.useCallback(g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),i(e.id))},[e.id,i]);return t.jsxs("button",{onClick:()=>i(e.id),onKeyDown:u,onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),className:`toolbar-btn ${n?"active":""}`,style:{...et.ghost,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:s?"6px 10px":"6px 14px",flexShrink:0,color:n?"#75aadb":l?"#94a3b8":"#4a5568"},role:"tab","aria-selected":n,"aria-label":`${e.label} panel`,tabIndex:n?0:-1,children:[t.jsx("span",{className:"toolbar-icon",children:t.jsx(Me,{i:e.icon,s:20,c:n?"#75aadb":l?"#94a3b8":"#4a5568"})}),t.jsx("span",{style:{fontSize:"8px",fontWeight:n?700:600,textTransform:"uppercase",letterSpacing:"1px",transition:"color 0.15s ease"},children:e.label}),t.jsxs("div",{className:"toolbar-tooltip",children:[e.label,a&&t.jsx("span",{className:"toolbar-shortcut",children:a})]})]})});Fn.displayName="ToolbarButton";const or={media:"1",audio:"2",text:"3",stickers:"4",effects:"5",transition:"6",filters:"7"},rr=({activeToolbar:e,onToolbarChange:n})=>{const i=La(),a=o.useCallback(s=>{const l=it.findIndex(c=>c.id===e);if(s.key==="ArrowRight"){s.preventDefault();const c=(l+1)%it.length;n(it[c].id)}else if(s.key==="ArrowLeft"){s.preventDefault();const c=l===0?it.length-1:l-1;n(it[c].id)}else if(s.key>="1"&&s.key<="7"){s.preventDefault();const c=parseInt(s.key)-1;it[c]&&n(it[c].id)}},[e,n]);return t.jsxs("nav",{style:{...et.toolbar,...i?{overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Editor tools",onKeyDown:a,children:[t.jsx("style",{children:nr}),it.map(s=>t.jsx(Fn,{item:s,isActive:e===s.id,onClick:n,shortcut:or[s.id],compact:i},s.id))]})},ir=o.memo(rr);async function On(e,n,i=.3,a=null){await Ye(),a&&Je(a);const s="input_video.mp4",l="input_audio.mp3",c="output_mixed.mp4";try{await ze(s,e),await ze(l,n),await Ge(["-i",s,"-i",l,"-filter_complex",`[1:a]volume=${i}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k",c]);const u=await Ke(c);return He(u,"video/mp4")}finally{Xe(),await qe([s,l,c])}}async function sr(e,n,i=null){await Ye(),i&&Je(i);const a="input_video.mp4",s="input_audio.mp3",l="output_replaced.mp4";try{await ze(a,e),await ze(s,n),await Ge(["-i",a,"-i",s,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",l]);const c=await Ke(l);return He(c,"video/mp4")}finally{Xe(),await qe([a,s,l])}}async function $n(e,n=1,i=null){await Ye(),i&&Je(i);const a="input_volume.mp4",s="output_volume.mp4";try{await ze(a,e),await Ge(["-i",a,"-af",`volume=${n}`,"-c:v","copy","-c:a","aac","-b:a","192k",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([a,s])}}async function Bn(e,n=null){await Ye(),n&&Je(n);const i="input_mute.mp4",a="output_mute.mp4";try{await ze(i,e),await Ge(["-i",i,"-c:v","copy","-an",a]);const s=await Ke(a);return He(s,"video/mp4")}finally{Xe(),await qe([i,a])}}async function Dn(e,n="mp3",i=null){await Ye(),i&&Je(i);const a="input_extract.mp4",s=`output_extract.${n}`,l={mp3:"audio/mpeg",aac:"audio/aac",wav:"audio/wav"},c={mp3:["-c:a","libmp3lame","-b:a","192k"],aac:["-c:a","aac","-b:a","192k"],wav:["-c:a","pcm_s16le"]};try{await ze(a,e),await Ge(["-i",a,"-vn",...c[n]||c.mp3,s]);const u=await Ke(s);return He(u,l[n]||"audio/mpeg")}finally{Xe(),await qe([a,s])}}async function lr(e,n=null){await Ye(),n&&Je(n);const i="input_normalize.mp4",a="output_normalize.mp4";try{await ze(i,e),await Ge(["-i",i,"-af","loudnorm=I=-16:LRA=11:TP=-1.5","-c:v","copy","-c:a","aac","-b:a","192k",a]);const s=await Ke(a);return He(s,"video/mp4")}finally{Xe(),await qe([i,a])}}async function cr(e,n=0,i=0,a=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",c="output_fade.mp4";try{await ze(l,e);const u=[];if(n>0&&u.push(`afade=t=in:st=0:d=${n}`),i>0&&a){const x=a-i;u.push(`afade=t=out:st=${x}:d=${i}`)}const g=u.join(","),f=["-i",l,"-c:v","copy"];g?(f.push("-af",g),f.push("-c:a","aac","-b:a","192k")):f.push("-c:a","copy"),f.push(c),await Ge(f);const y=await Ke(c);return He(y,"video/mp4")}finally{Xe(),await qe([l,c])}}const ji=Object.freeze(Object.defineProperty({__proto__:null,adjustVolume:$n,extractAudio:Dn,fadeAudio:cr,mixAudio:On,muteAudio:Bn,normalizeAudio:lr,replaceAudio:sr},Symbol.toStringTag,{value:"Module"})),Ia={"top-left":{x:"10",y:"10"},"top-center":{x:"(w-text_w)/2",y:"10"},"top-right":{x:"w-text_w-10",y:"10"},"center-left":{x:"10",y:"(h-text_h)/2"},center:{x:"(w-text_w)/2",y:"(h-text_h)/2"},"center-right":{x:"w-text_w-10",y:"(h-text_h)/2"},"bottom-left":{x:"10",y:"h-text_h-10"},"bottom-center":{x:"(w-text_w)/2",y:"h-text_h-10"},"bottom-right":{x:"w-text_w-10",y:"h-text_h-10"}},zn=["fade","fadeblack","fadewhite","dissolve","pixelize","wipeleft","wiperight","wipeup","wipedown","slideleft","slideright","slideup","slidedown"];async function dr(e,n,i={},a=null){await Ye(),a&&Je(a);const{position:s="bottom-center",fontSize:l=48,fontColor:c="white",backgroundColor:u=null,startTime:g=0,duration:f=0}=i,y="input_text.mp4",x="output_text.mp4";try{await ze(y,e);const w=typeof s=="string"?Ia[s]||Ia["bottom-center"]:s;let R=`drawtext=text='${n.replace(/'/g,"'\\''").replace(/:/g,"\\:").replace(/\\/g,"\\\\")}':fontsize=${l}:fontcolor=${c}:x=${w.x}:y=${w.y}`;if(u&&(R+=`:box=1:boxcolor=${u}:boxborderw=5`),g>0||f>0){const q=f>0?`between(t,${g},${g+f})`:`gte(t,${g})`;R+=`:enable='${q}'`}await Ge(["-i",y,"-vf",R,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",x]);const v=await Ke(x);return He(v,"video/mp4")}finally{Xe(),await qe([y,x])}}async function ur(e,n,i="fade",a=1,s=null){await Ye(),s&&Je(s);const l=zn.includes(i)?i:"fade",c="input_trans_1.mp4",u="input_trans_2.mp4",g="output_transition.mp4";try{await ze(c,e),await ze(u,n);const f=await pr(e),y=Math.max(0,f-a);await Ge(["-i",c,"-i",u,"-filter_complex",`[0:v][1:v]xfade=transition=${l}:duration=${a}:offset=${y}[v];[0:a][1:a]acrossfade=d=${a}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",g]);const x=await Ke(g);return He(x,"video/mp4")}finally{Xe(),await qe([c,u,g])}}async function pr(e){return new Promise((n,i)=>{const a=document.createElement("video");a.preload="metadata",a.onloadedmetadata=()=>{URL.revokeObjectURL(a.src),n(a.duration)},a.onerror=()=>{URL.revokeObjectURL(a.src),i(new Error("Failed to load video"))},a.src=URL.createObjectURL(e)})}async function st(e,n,i=null){if(typeof n!="string"||!/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(n))throw new Error("Invalid FFmpeg filter string");await Ye(),i&&Je(i);const a="input_filter.mp4",s="output_filter.mp4";try{await ze(a,e),await Ge(["-i",a,"-vf",n,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([a,s])}}async function mr(e,n=0,i=0,a=null){const s=`eq=brightness=${n}:contrast=${1+i}`;return st(e,s,a)}async function fr(e,n=1,i=null){const a=`eq=saturation=${n}`;return st(e,a,i)}async function hr(e,n=5,i=null){const a=`boxblur=${n}:${n}`;return st(e,a,i)}async function br(e,n=1,i=null){const a=`unsharp=5:5:${n}:5:5:0`;return st(e,a,i)}async function gr(e,n=1,i=null){await Ye(),i&&Je(i);const a="input_speed.mp4",s="output_speed.mp4",l=Math.max(.25,Math.min(4,n));try{await ze(a,e);const c=`setpts=${1/l}*PTS`;let u="";if(l<=2&&l>=.5)u=`atempo=${l}`;else if(l>2){const f=Math.ceil(Math.log(l)/Math.log(2)),y=Math.pow(l,1/f);u=Array(f).fill(`atempo=${y}`).join(",")}else{const f=Math.ceil(Math.log(1/l)/Math.log(2)),y=Math.pow(l,1/f);u=Array(f).fill(`atempo=${y}`).join(",")}await Ge(["-i",a,"-filter_complex",`[0:v]${c}[v];[0:a]${u}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",s]);const g=await Ke(s);return He(g,"video/mp4")}finally{Xe(),await qe([a,s])}}async function xr(e,n=0,i=0,a=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",c="output_fade.mp4";try{await ze(l,e);const u=[];if(n>0&&u.push(`fade=t=in:st=0:d=${n}`),i>0&&a){const f=a-i;u.push(`fade=t=out:st=${f}:d=${i}`)}if(u.length===0){const f=await Ke(l);return He(f,"video/mp4")}await Ge(["-i",l,"-vf",u.join(","),"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",c]);const g=await Ke(c);return He(g,"video/mp4")}finally{Xe(),await qe([l,c])}}async function yr(e,n=90,i=null){const a={90:"transpose=1",180:"transpose=1,transpose=1",270:"transpose=2","-90":"transpose=2"},s=a[n]||a[90];return st(e,s,i)}async function wr(e,n="horizontal",i=null){return st(e,n==="vertical"?"vflip":"hflip",i)}async function vr(e,n,i=null){const{width:a,height:s,x:l=0,y:c=0}=n,u=`crop=${a}:${s}:${l}:${c}`;return st(e,u,i)}const ka=15,kr=85;function Sr(){const[e,n]=o.useState(!1),[i,a]=o.useState(wa()),[s,l]=o.useState(0),[c,u]=o.useState(0),[g,f]=o.useState(null),[y,x]=o.useState(null),w=o.useRef(!0);o.useEffect(()=>{w.current=!0;const T=vo(M=>{w.current&&(u(M.loadProgress),M.error&&f(M.error))});return()=>{w.current=!1,Xe(),T()}},[]);const _=o.useCallback(async()=>{if(wa())return a(!0),!0;n(!0),f(null);try{return await Ye(),w.current&&(a(!0),n(!1)),!0}catch(T){return w.current&&(f(sa(T,"ffmpeg")),n(!1)),!1}},[]),R=o.useCallback(({progress:T})=>{w.current&&l(T)},[]),v=o.useCallback(async(T,M)=>{if(!wa()&&!await _())throw new Error("FFmpeg not loaded");x(T),l(0),f(null);const L=({progress:Z=0,time:we=0})=>{const Ce=ka+Math.round(Z/100*kr),We=Math.max(ka,Math.min(99,Ce));R({progress:We,time:we})};try{R({progress:ka});const Z=await M(L);return w.current&&(l(100),x(null),setTimeout(()=>{w.current&&l(0)},350)),Z}catch(Z){if(w.current){const Ce=Z?.name==="AbortError"||/abort|cancel/i.test(Z?.message||"");f(Ce?"Operation cancelled":sa(Z,"ffmpeg")),l(0),x(null)}const we=(Z?.message||"").toLowerCase();if(we.includes("wasm")||we.includes("memory")||we.includes("abort")||we.includes("sharedarraybuffer"))try{await ko(),w.current&&a(!1)}catch{}throw Z}},[_,R]),q=o.useCallback(async(T,M,L)=>v("trim video",Z=>So(T,M,L,Z)),[v]),K=o.useCallback(async(T,M)=>v("split video",L=>jo(T,M,L)),[v]),W=o.useCallback(async T=>v("merge clips",M=>To(T,M)),[v]),Q=o.useCallback(async(T,M)=>v("export video",L=>Co(T,M,L)),[v]),ie=o.useCallback(async(T,M)=>{const L=la[M];return v(`export for ${L?.label||M}`,Z=>Io(T,M,Z))},[v]),k=o.useCallback(async T=>Mo(T),[]),U=o.useCallback(async(T,M=0)=>Ro(T,M),[]),oe=o.useCallback(async T=>v("convert to web format",M=>Eo(T,"mp4",M)),[v]),I=o.useCallback(async(T,M,L=.3)=>v("mix audio",Z=>On(T,M,L,Z)),[v]),V=o.useCallback(async(T,M)=>v("adjust volume",L=>$n(T,M,L)),[v]),se=o.useCallback(async T=>v("mute audio",M=>Bn(T,M)),[v]),A=o.useCallback(async(T,M="mp3")=>v("extract audio",L=>Dn(T,M,L)),[v]),J=o.useCallback(async(T,M,L={})=>v("add text",Z=>dr(T,M,L,Z)),[v]),te=o.useCallback(async(T,M,L="fade",Z=1)=>v("add transition",we=>ur(T,M,L,Z,we)),[v]),ge=o.useCallback(async(T,M)=>v("change speed",L=>gr(T,M,L)),[v]),P=o.useCallback(async(T,M,L,Z)=>v("add fade",we=>xr(T,M,L,Z,we)),[v]),D=o.useCallback(async(T,M)=>v("rotate video",L=>yr(T,M,L)),[v]),xe=o.useCallback(async(T,M)=>v("flip video",L=>wr(T,M,L)),[v]),le=o.useCallback(async(T,M)=>v("crop video",L=>vr(T,M,L)),[v]),Ie=o.useCallback(async(T,M,L)=>v("adjust colors",Z=>mr(T,M,L,Z)),[v]),ye=o.useCallback(async(T,M)=>v("adjust saturation",L=>fr(T,M,L)),[v]),pe=o.useCallback(async(T,M)=>v("apply filter",L=>st(T,M,L)),[v]),de=o.useCallback(async(T,M)=>v("apply blur",L=>hr(T,M,L)),[v]),ke=o.useCallback(async(T,M)=>v("apply sharpen",L=>br(T,M,L)),[v]),be=o.useCallback(()=>{f(null)},[]),Te=o.useCallback(()=>{l(0),x(null)},[]),Pe=o.useCallback(async()=>{await _o()},[]),j=o.useCallback(()=>{No(),w.current&&(x(null),l(0),f("Operation cancelled"))},[]),E=o.useCallback(async()=>{await Ao()},[]),ee=o.useCallback(()=>{const T=Uo(),M=Lo();return{usage:T,usageFormatted:Po(T),limitExceeded:M}},[]);return{isLoading:e,isReady:i,progress:s,loadProgress:c,error:g,currentOperation:y,initialize:_,preload:Pe,clearError:be,resetProgress:Te,cancelOperation:j,clearMemory:E,getMemoryInfo:ee,trimVideo:q,splitVideo:K,mergeClips:W,exportVideo:Q,exportWithPreset:ie,getVideoInfo:k,generateThumbnail:U,convertToWebFormat:oe,mixAudio:I,adjustVolume:V,muteAudio:se,extractAudio:A,addTextOverlay:J,addTransition:te,changeSpeed:ge,addFade:P,rotateVideo:D,flipVideo:xe,cropVideo:le,adjustBrightnessContrast:Ie,adjustSaturation:ye,applyFilter:pe,applyBlur:de,applySharpen:ke,resolutions:An,exportPresets:la,textPositions:Ia,transitionTypes:zn}}const jr="clipcut-thumbnails",Tr=1,Et="thumbnails";let aa=null;function Wn(){return aa||(aa=new Promise((e,n)=>{const i=indexedDB.open(jr,Tr);i.onerror=()=>{console.warn("[ThumbnailCache] Failed to open database"),n(i.error)},i.onsuccess=()=>{e(i.result)},i.onupgradeneeded=a=>{const s=a.target.result;if(!s.objectStoreNames.contains(Et)){const l=s.createObjectStore(Et,{keyPath:"id"});l.createIndex("videoId","videoId",{unique:!1}),l.createIndex("timestamp","timestamp",{unique:!1})}}}),aa)}function Vn(e,n){return`${e}_t${Math.floor(n*10)}`}async function Cr(e,n){try{const i=await Wn(),a=Vn(e,n);return new Promise(s=>{const u=i.transaction(Et,"readonly").objectStore(Et).get(a);u.onsuccess=()=>{const g=u.result;g&&g.data?s(new Blob([g.data],{type:"image/jpeg"})):s(null)},u.onerror=()=>s(null)})}catch(i){return console.warn("[ThumbnailCache] Error getting cached thumbnail:",i),null}}async function Ir(e,n,i){try{const a=await Wn(),s=Vn(e,n),l=await i.arrayBuffer();return new Promise(c=>{const u=a.transaction(Et,"readwrite");u.objectStore(Et).put({id:s,videoId:e,time:n,data:l,timestamp:Date.now()}),u.oncomplete=()=>c(!0),u.onerror=()=>c(!1)})}catch(a){console.warn("[ThumbnailCache] Error caching thumbnail:",a)}}function na(e){return new Promise((n,i)=>{const a=URL.createObjectURL(e);if(e.type?.startsWith("audio/")){const u=new Audio;u.preload="metadata",u.onloadedmetadata=()=>{URL.revokeObjectURL(a),n({duration:u.duration||0,width:0,height:0})},u.onerror=()=>{URL.revokeObjectURL(a),n({duration:0,width:0,height:0})},u.src=a;return}const l=document.createElement("video");l.preload="metadata",l.muted=!0;const c=setTimeout(()=>{URL.revokeObjectURL(a),n({duration:0,width:0,height:0})},5e3);l.onloadedmetadata=()=>{clearTimeout(c),URL.revokeObjectURL(a),n({duration:isFinite(l.duration)?l.duration:0,width:l.videoWidth||0,height:l.videoHeight||0})},l.onerror=()=>{clearTimeout(c),URL.revokeObjectURL(a),n({duration:0,width:0,height:0})},l.src=a})}function $t(e,n=0){return new Promise((i,a)=>{const s=URL.createObjectURL(e),l=document.createElement("video");l.preload="auto",l.muted=!0;const c=setTimeout(()=>{u(),i(oa())},8e3);function u(){clearTimeout(c),URL.revokeObjectURL(s)}l.onloadeddata=()=>{const g=Math.min(n,l.duration-.1);l.currentTime=Math.max(0,g)},l.onseeked=()=>{try{const g=document.createElement("canvas"),y=Math.min(1,320/(l.videoWidth||320));g.width=Math.round((l.videoWidth||320)*y),g.height=Math.round((l.videoHeight||180)*y),g.getContext("2d").drawImage(l,0,0,g.width,g.height),g.toBlob(w=>{u(),i(w||oa())},"image/jpeg",.7)}catch{u(),i(oa())}},l.onerror=()=>{u(),i(oa())},l.src=s})}function oa(){const e=document.createElement("canvas");e.width=160,e.height=90;const n=e.getContext("2d"),i=n.createLinearGradient(0,0,160,90);return i.addColorStop(0,"#1a2332"),i.addColorStop(1,"#0a0a0a"),n.fillStyle=i,n.fillRect(0,0,160,90),n.fillStyle="rgba(117, 170, 219, 0.3)",n.beginPath(),n.moveTo(65,30),n.lineTo(65,60),n.lineTo(100,45),n.closePath(),n.fill(),new Promise(a=>{e.toBlob(s=>a(s||new Blob),"image/jpeg",.7)})}const sn={"480p":{width:854,height:480},"720p":{width:1280,height:720},"1080p":{width:1920,height:1080}},ln={"480p":{28:1e6,23:2e6,18:4e6,15:6e6},"720p":{28:25e5,23:5e6,18:8e6,15:12e6},"1080p":{28:4e6,23:8e6,18:16e6,15:24e6}};function Mr(e,n){const i=ln[e]||ln["1080p"];return i[n]||i[18]}const cn={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}};function Dt(e,n,i,a){const s=n.text||"";if(!s.trim())return;const l=Math.max(12,Math.round((n.textSize||48)*(a/1080))),c=n.textBold?"bold":"normal",u=n.textItalic?"italic":"normal",g=n.textFontFamily||"Spline Sans";e.font=`${u} ${c} ${l}px '${g}', Arial, sans-serif`;let f,y,x,w;if(n.textX!=null&&n.textY!=null)f=n.textX/100*i,y=n.textY/100*a,x="center",w="middle";else{const _=cn[n.textPosition||"center"]||cn.center;f=_.x*i,y=_.y*a,x=_.align,w=_.baseline}if(e.textAlign=x,e.textBaseline=w,n.textBgColor&&n.textBgColor!=="transparent"){const _=e.measureText(s),R=l*.25,v=_.width,q=l*1.2;let K=f-R;x==="center"?K=f-v/2-R:x==="right"&&(K=f-v-R);let W=y-R;w==="middle"?W=y-q/2-R:w==="bottom"&&(W=y-q-R),e.fillStyle=n.textBgColor,e.fillRect(K,W,v+R*2,q+R*2)}if(e.shadowColor="rgba(0,0,0,0.7)",e.shadowBlur=4,e.shadowOffsetX=0,e.shadowOffsetY=1,e.fillStyle=n.textColor||"#ffffff",e.fillText(s,f,y),n.textUnderline){const _=e.measureText(s);let R=f;x==="center"?R=f-_.width/2:x==="right"&&(R=f-_.width);const v=w==="top"?y+l:w==="middle"?y+l/2:y;e.strokeStyle=n.textColor||"#ffffff",e.lineWidth=Math.max(1,l/20),e.beginPath(),e.moveTo(R,v+2),e.lineTo(R+_.width,v+2),e.stroke()}e.shadowColor="transparent",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}function Ma(e){return new Promise((n,i)=>{const a=document.createElement("video");a.preload="auto",a.playsInline=!0,a.muted=!1,a.style.position="fixed",a.style.top="-9999px",a.style.left="-9999px",a.style.width="1px",a.style.height="1px",document.body.appendChild(a);const s=e instanceof Blob?URL.createObjectURL(e):e;a.src=s;const l=()=>{a.removeEventListener("error",c)},c=()=>{l(),i(new Error(`Failed to load video: ${a.error?.message||"unknown error"}`))};a.addEventListener("error",c),a.addEventListener("loadeddata",()=>{l(),n({video:a,url:s})},{once:!0}),a.load()})}function Rr(e){return new Promise((n,i)=>{const a=document.createElement("audio");a.preload="auto",a.style.display="none",document.body.appendChild(a);const s=e instanceof Blob?URL.createObjectURL(e):e;a.src=s,a.addEventListener("error",()=>{i(new Error("Failed to load audio"))}),a.addEventListener("canplaythrough",()=>{n({audio:a,url:s})},{once:!0}),a.load()})}function Er(){const e=["video/webm;codecs=vp8,opus","video/webm;codecs=vp8","video/webm;codecs=vp9,opus","video/webm;codecs=vp9","video/webm"];for(const n of e)if(MediaRecorder.isTypeSupported(n))return n;return""}function Ra(e){const n=[];return e.brightness!=null&&e.brightness!==0&&n.push(`brightness(${1+e.brightness/100})`),e.contrast!=null&&e.contrast!==0&&n.push(`contrast(${1+e.contrast/100})`),e.saturation!=null&&e.saturation!==0&&n.push(`saturate(${1+e.saturation/100})`),e.blur!=null&&e.blur>0&&n.push(`blur(${e.blur}px)`),n.length>0?n.join(" "):"none"}function zt(e){const n=Math.floor(e/60),i=Math.floor(e%60);return`${n}:${i.toString().padStart(2,"0")}`}function _r(e,n){const i=n.startTime+(n.duration||0),a=n.track||0;for(let s=0;s<e.length;s++){const l=e[s];if(l.id!==n.id&&!(l.type==="audio"||l.type==="text"||l.type==="sticker")&&(l.track||0)===a&&!(l.startTime<i-.08)){if(l.startTime<=i+.08)return l;if(l.startTime>i+.08)break}}return null}function Ar(e,n){if(!e?.transition||!n)return 0;const i=Math.max(.2,Math.min(3,e.transitionDuration??1)),a=e.duration||0,s=n.duration||0;if(a<.1||s<.1)return 0;const l=Math.min(i,a*.98,s*.98);return l>.05?l:0}function Ea(e,n,i,a,s,l,c){e.save(),e.globalAlpha=Math.max(0,Math.min(1,c)),l&&l!=="none"&&(e.filter=l),s.rotation&&(e.translate(i/2,a/2),e.rotate(s.rotation*Math.PI/180),e.translate(-i/2,-a/2));const u=n.videoWidth||i,g=n.videoHeight||a,f=Math.min(i/u,a/g),y=u*f,x=g*f,w=(i-y)/2,_=(a-x)/2;e.fillStyle="#000000",e.fillRect(0,0,i,a),e.drawImage(n,w,_,y,x),e.filter="none",e.restore()}function dn(e,n,i,a,s,l,c,u,g,f,y,x,w){const _=Math.max(0,Math.min(1,f));e.save(),e.fillStyle="#000000",e.fillRect(0,0,l,c),Ea(e,n,l,c,a,u,1);let R=_;(y==="fadeblack"||y==="fadewhite")&&(R=Math.max(0,(_-.5)*2)),Ea(e,i,l,c,s,g,R),y==="fadeblack"?(e.fillStyle="#000000",e.globalAlpha=_<.5?_*2:(1-_)*2,e.fillRect(0,0,l,c),e.globalAlpha=1):y==="fadewhite"&&(e.fillStyle="#ffffff",e.globalAlpha=_<.5?_*2:(1-_)*2,e.fillRect(0,0,l,c),e.globalAlpha=1);for(const v of x)w>=v._start&&w<=v._end&&Dt(e,v,l,c);a.text?.trim()&&a.type!=="text"&&Dt(e,a,l,c),s.text?.trim()&&s.type!=="text"&&Dt(e,s,l,c),e.restore()}function _a(e){return new Promise(n=>{e.addEventListener("seeked",n,{once:!0})})}function Aa(e,n){try{n?.disconnect(),e?.disconnect()}catch{}}async function Pr({ctx:e,W:n,H:i,clip:a,sourceFrom:s,sourceToExclusive:l,audioCtx:c,audioDest:u,timedTextClips:g,totalDuration:f,videoClips:y,clipIndex:x,onProgress:w,abortSignal:_,startWall:R}){const v=a.trimStart||0,q=a.duration||0,K=a.speed||1,{video:W,url:Q}=await Ma(a.file);let ie=null,k=null;try{ie=c.createMediaElementSource(W),k=c.createGain(),k.gain.value=a.isMuted?0:a.volume??1,ie.connect(k),k.connect(u)}catch(A){console.warn("Could not route clip audio:",A)}const U=Ra(a),oe=a.fadeIn||0,I=a.fadeOut||0;W.currentTime=s,W.playbackRate=K,await _a(W),await W.play();let V=!1;const se=()=>{V||(V=!0,Aa(ie,k),W.pause(),W.src="",W.load(),W.parentNode&&document.body.removeChild(W),URL.revokeObjectURL(Q))};try{await new Promise((A,J)=>{let te;const ge=()=>{if(_?.aborted){cancelAnimationFrame(te),W.pause(),se(),A();return}const P=W.currentTime,D=P-v;if(q>0&&P>=l-.05){W.pause(),un(e,W,n,i,U,a,D,q,oe,I,g,a.startTime+D),se(),A();return}un(e,W,n,i,U,a,D,q,oe,I,g,a.startTime+D);const xe=a.startTime+D,le=f>0?Math.min(99,xe/f*100):0,Ie=(Date.now()-R)/1e3,ye=le>1?Ie/le*(100-le):0;w?.({percent:Math.round(le),elapsed:zt(Ie),eta:zt(ye),label:y.length>1?`Exporting clip ${x+1}/${y.length}`:"Exporting video..."}),te=requestAnimationFrame(ge)};W.addEventListener("ended",()=>{cancelAnimationFrame(te),W.pause(),se(),A()},{once:!0}),W.addEventListener("error",()=>{cancelAnimationFrame(te),se(),J(new Error(`Video playback error during export of clip ${x+1}`))},{once:!0}),te=requestAnimationFrame(ge)})}catch(A){throw se(),A}}async function Lr({ctx:e,W:n,H:i,left:a,right:s,D:l,transType:c,audioCtx:u,audioDest:g,timedTextClips:f,totalDuration:y,videoClips:x,onProgress:w,abortSignal:_,startWall:R}){const v=a.trimStart||0,q=s.trimStart||0,K=a.duration||0,W=a.speed||1,Q=s.speed||1,ie=a.startTime+(K-l),k=v+K,{video:U,url:oe}=await Ma(a.file),{video:I,url:V}=await Ma(s.file);let se=null,A=null,J=null,te=null;try{se=u.createMediaElementSource(U),A=u.createGain(),A.gain.value=a.isMuted?0:a.volume??1,se.connect(A),A.connect(g)}catch(le){console.warn("Could not route left clip audio in transition:",le)}try{J=u.createMediaElementSource(I),te=u.createGain(),te.gain.value=s.isMuted?0:s.volume??1,J.connect(te),te.connect(g)}catch(le){console.warn("Could not route right clip audio in transition:",le)}const ge=Ra(a),P=Ra(s);U.playbackRate=W,I.playbackRate=Q,U.currentTime=v+K-l,I.currentTime=q,await Promise.all([_a(U),_a(I)]),await Promise.all([U.play(),I.play()]);let D=!1;const xe=()=>{D||(D=!0,Aa(se,A),Aa(J,te),U.pause(),I.pause(),U.src="",I.src="",U.load(),I.load(),U.parentNode&&document.body.removeChild(U),I.parentNode&&document.body.removeChild(I),URL.revokeObjectURL(oe),URL.revokeObjectURL(V))};try{await new Promise((le,Ie)=>{let ye;const pe=()=>{if(_?.aborted){cancelAnimationFrame(ye),U.pause(),I.pause(),xe(),le();return}const de=U.currentTime,ke=l>0?Math.max(0,Math.min(1,(de-(v+K-l))/l)):1,be=ie+ke*l;if(dn(e,U,I,a,s,n,i,ge,P,ke,c,f,be),de>=k-.05||ke>=.999){U.pause(),I.pause(),dn(e,U,I,a,s,n,i,ge,P,1,c,f,ie+l),xe(),le();return}const Te=y>0?Math.min(99,be/y*100):0,Pe=(Date.now()-R)/1e3,j=Te>1?Pe/Te*(100-Te):0;w?.({percent:Math.round(Te),elapsed:zt(Pe),eta:zt(j),label:x.length>1?"Exporting transition...":"Exporting video..."}),ye=requestAnimationFrame(pe)};U.addEventListener("error",()=>{cancelAnimationFrame(ye),xe(),Ie(new Error("Video playback error during transition export"))},{once:!0}),I.addEventListener("error",()=>{cancelAnimationFrame(ye),xe(),Ie(new Error("Video playback error during transition export"))},{once:!0}),ye=requestAnimationFrame(pe)})}catch(le){throw xe(),le}}async function Ur({clips:e,bgMusic:n=null,totalDuration:i,resolution:a="1080p",settings:s={},onProgress:l,abortSignal:c}){const{quality:u=23,fps:g=30}=s,f=sn[a]||sn["1080p"],{width:y,height:x}=f,w=Mr(a,u),_=Er();if(Ft({category:"export",message:"canvasExport.start",level:"info",data:{resolution:a,fps:g,quality:u,totalDuration:i,clipCount:e?.length??0}}),!_)throw Ft({category:"export",message:"canvasExport.no_mime_support",level:"error"}),new Error("Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.");const R=e.filter(P=>P.type!=="audio"&&P.type!=="text"&&P.type!=="sticker"&&P.file).sort((P,D)=>P.startTime-D.startTime),q=e.filter(P=>P.type==="text"||P.type==="sticker"||P.text?.trim()).map(P=>{const D=P.startTime||0;return{...P,_start:D,_end:D+(P.duration||i)}});if(R.length===0)throw Ft({category:"export",message:"canvasExport.no_video_clips",level:"error"}),new Error("No video clips to export.");const K=document.createElement("canvas");K.width=y,K.height=x;const W=K.getContext("2d"),Q=new AudioContext,ie=Q.createMediaStreamDestination();let k=null,U=null,oe=null;if(n?.file)try{const P=await Rr(n.file);k=P.audio,U=P.url,k.loop=!0;const D=Q.createMediaElementSource(k);oe=Q.createGain(),oe.gain.value=n.volume??.3,D.connect(oe),oe.connect(ie)}catch(P){console.warn("Could not load background music, continuing without it:",P),k=null}const I=K.captureStream(g),V=ie.stream.getAudioTracks();for(const P of V)I.addTrack(P);const se=[],A=new MediaRecorder(I,{mimeType:_,videoBitsPerSecond:w,audioBitsPerSecond:128e3});A.ondataavailable=P=>{P.data.size>0&&se.push(P.data)},A.start(1e3),k&&(k.currentTime=0,k.play().catch(()=>{}));const J=Date.now(),te=new Map;for(let P=0;P<R.length&&!c?.aborted;P++){const D=R[P],xe=D.trimStart||0,le=D.duration||0,Ie=te.get(D.id)||0;if(Ie>=le-.02)continue;const ye=_r(R,D),pe=ye&&D.transition?Ar(D,ye):0,de=xe+Ie,ke=xe+le-(ye&&D.transition&&pe>0?pe:0);ke-de>.02&&await Pr({ctx:W,W:y,H:x,clip:D,sourceFrom:de,sourceToExclusive:ke,audioCtx:Q,audioDest:ie,timedTextClips:q,totalDuration:i,videoClips:R,clipIndex:P,onProgress:l,abortSignal:c,startWall:J}),ye&&D.transition&&pe>0&&(await Lr({ctx:W,W:y,H:x,left:D,right:ye,D:pe,transType:D.transition,audioCtx:Q,audioDest:ie,timedTextClips:q,totalDuration:i,videoClips:R,onProgress:l,abortSignal:c,startWall:J}),te.set(ye.id,(te.get(ye.id)||0)+pe))}k&&(k.pause(),k.src="",document.body.removeChild(k),U&&URL.revokeObjectURL(U));const ge=await new Promise(P=>{A.onstop=()=>{const D=new Blob(se,{type:_});P(D)},A.stop()});if(I.getTracks().forEach(P=>P.stop()),ie.stream.getTracks().forEach(P=>P.stop()),await Q.close().catch(()=>{}),l?.({percent:100,elapsed:zt((Date.now()-J)/1e3),eta:"0:00",label:"Complete"}),c?.aborted)throw Ft({category:"export",message:"canvasExport.cancelled",level:"warning"}),new Error("Export cancelled.");return Ft({category:"export",message:"canvasExport.complete",level:"info",data:{sizeBytes:ge.size,duration:i,elapsedMs:Date.now()-J}}),{blob:ge,duration:i,size:ge.size}}function un(e,n,i,a,s,l,c,u,g,f,y,x){e.save();let w=1;g>0&&c<g&&(w=c/g),f>0&&u>0&&u-c<f&&(w=Math.min(w,(u-c)/f)),w=Math.max(0,Math.min(1,w)),Ea(e,n,i,a,l,s,w);for(const _ of y)x>=_._start&&x<=_._end&&Dt(e,_,i,a);l.text?.trim()&&l.type!=="text"&&Dt(e,l,i,a),e.restore()}const Nr="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease",Fr=80,Or=[.7,.95],$r=[.4,.7,.9],Br=o.memo(function({isOpen:n,onClose:i,title:a,zIndex:s=2900,children:l}){const c=o.useRef(null),u=o.useRef({startY:0,isDragging:!1,startSnap:0}),[g,f]=o.useState(0),[y,x]=o.useState(!1),[w,_]=o.useState(!1),[R,v]=o.useState(0);o.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const A=window.matchMedia("(orientation: landscape) and (max-width: 900px)"),J=()=>_(A.matches);return J(),A.addEventListener?A.addEventListener("change",J):A.addListener(J),()=>{A.removeEventListener?A.removeEventListener("change",J):A.removeListener(J)}},[]);const q=w?$r:Or,K=q[Math.min(R,q.length-1)]??q[0];o.useEffect(()=>{n&&v(0),f(0)},[n,w]),o.useEffect(()=>{if(n){const A=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=A}}},[n]);const W=o.useCallback(A=>{u.current.startY=A.touches[0].clientY,u.current.isDragging=!0,u.current.startSnap=R,x(!0)},[R]),Q=o.useCallback(A=>{if(!u.current.isDragging)return;const J=A.touches[0].clientY-u.current.startY;f(J)},[]),ie=o.useCallback(()=>{if(!u.current.isDragging)return;u.current.isDragging=!1,x(!1);const A=g,J=window.innerHeight||800;if(A>Fr&&u.current.startSnap===0){f(0),i();return}if(q.length>1){const te=A<0?-1:A>0?1:0,ge=J*.08,P=Math.round(Math.abs(A)/ge);if(P>0){let D=u.current.startSnap-te*P;D=Math.max(0,Math.min(q.length-1,D)),v(D)}}f(0)},[g,i,q]),k={position:"fixed",inset:0,bottom:"56px",background:"rgba(0,0,0,0.4)",zIndex:s-100,opacity:n?1:0,pointerEvents:n?"auto":"none",transition:"opacity 0.3s ease"},U={position:"fixed",bottom:"56px",left:0,right:0,height:`${Math.round(K*100)}vh`,zIndex:s,background:"#0e1218",borderTop:"2px solid rgba(117, 170, 219, 0.15)",borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",transform:n?`translateY(${Math.max(0,g)}px)`:"translateY(100%)",transition:y?"none":Nr},oe={flexShrink:0,cursor:"grab",touchAction:"none"},I={width:"36px",height:"4px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"8px auto 6px"},V={fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"center",padding:"0 16px 8px",textTransform:"uppercase",letterSpacing:"0.5px"},se={flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"};return t.jsxs(t.Fragment,{children:[t.jsx("div",{style:k,onClick:i}),t.jsxs("div",{ref:c,style:U,"aria-hidden":!n,children:[t.jsxs("div",{style:oe,onTouchStart:W,onTouchMove:Q,onTouchEnd:ie,children:[t.jsx("div",{style:I}),a&&t.jsx("div",{style:V,children:a})]}),t.jsx("div",{style:se,children:l})]})]})}),Ti=.1,Kn=8,Ci=3,Ii=e=>5*Math.pow(250/5,e/100),Mi=(e,n)=>e*n,Ri=(e,n)=>e/n,Ei=(e,n,i)=>{const a=new Set([0,i]);for(const s of e)s.id!==n&&(a.add(s.startTime),a.add(s.startTime+s.duration));return[...a].sort((s,l)=>s-l)},pn=(e,n,i,a=Kn)=>{const s=a/i;let l=e,c=null,u=s;for(const g of n){const f=Math.abs(e-g);f<u&&(u=f,l=g,c=g)}return{time:l,snappedTo:c}},_i=(e,n,i,a,s=Kn)=>{const l=pn(e,i,a,s),c=pn(e+n,i,a,s),u=l.snappedTo!==null?Math.abs(e-l.time):1/0,g=c.snappedTo!==null?Math.abs(e+n-c.time):1/0;return u<=g&&l.snappedTo!==null?{startTime:l.time,snappedTo:l.snappedTo}:c.snappedTo!==null?{startTime:c.time-n,snappedTo:c.snappedTo}:{startTime:e,snappedTo:null}},Dr=e=>{const i=80/e,a=[.1,.25,.5,1,2,5,10,15,30,60,120,300];for(const s of a)if(s>=i*.6)return s;return 300},Ai=(e,n)=>{const i=Dr(n),a=i<=1?4:i<=5?5:4,s=i/a,l=[],c=e+i;for(let u=0;u<=c;u+=s){const g=u%i;if(g<.001||Math.abs(g-i)<.001){const y=Math.floor(u/60),x=u%60,w=x===Math.floor(x)?Math.floor(x).toString().padStart(2,"0"):x.toFixed(1).padStart(4,"0");l.push({time:u,label:`${y}:${w}`,major:!0})}else l.push({time:u,label:"",major:!1})}return l},mn=e=>{e<0&&(e=0);const n=Math.floor(e/60),i=e%60;return`${n}:${i.toFixed(1).padStart(4,"0")}`},Pi=e=>{if(e<60)return`${e.toFixed(1)}s`;const n=Math.floor(e/60),i=(e%60).toFixed(0);return`${n}:${i.padStart(2,"0")}`},zr=e=>e?.type!=="audio"&&e?.type!=="text",Hn=e=>zr(e)&&!e?.blobUrl&&!!e?._mediaError,Wr=e=>e?.type!=="audio"&&!e?.blobUrl&&!!e?._mediaError;function Vr({restoredClips:e=[],mediaItems:n=[],projectName:i="Untitled Project"}){const a=e.filter(Hn).length,s=n.filter(Wr).length,l=a>0||s>0;return{clips:e,mediaItems:n,unresolvedClipCount:a,unresolvedMediaCount:s,hasUnavailableMedia:l,notification:l?{level:"warning",message:`Loaded "${i}" — ${a} clip(s) need media re-import`}:{level:"success",message:`Loaded "${i}" (${e.length} clips)`}}}function Li({videoSrc:e=null,hasTimelineClips:n=!1,hasUnavailableMediaClips:i=!1,isRestoringMedia:a=!1}){return a?{title:"Restoring media...",description:"Loading media files from storage",showImportHint:!1}:e?{title:null,description:null,showImportHint:!1}:i?{title:"Media missing",description:"This project still has clips, but one or more source files need to be re-imported.",showImportHint:!0}:n?{title:"No clip at playhead",description:"Move the playhead over a clip on the timeline to preview",showImportHint:!1}:{title:"No media loaded",description:"Import media and add clips to the timeline to preview",showImportHint:!0}}function Kr(e=[]){return e.some(Hn)}function Hr({projectId:e,isRestored:n,hasBeenNonEmpty:i,clipsCount:a,mediaItemsCount:s}){return e?n?(a||0)===0&&(s||0)===0&&!i?{skip:!0,reason:"empty-without-session-edit"}:{skip:!1,reason:null}:{skip:!0,reason:"restore-in-progress"}:{skip:!1,reason:null}}let fn=!1;function Yr(){if(fn)return;const e=zo();if(!e)return;fn=!0;const n=typeof AbortSignal<"u"&&AbortSignal.timeout?{signal:AbortSignal.timeout(5e3)}:{};fetch(`${e}/health`,{method:"GET",mode:"cors",cache:"no-store",...n}).catch(i=>{i?.message})}const hn=o.lazy(()=>De(()=>import("./sdQCtR1X.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Xr=o.lazy(()=>De(()=>import("./DDbRbnWd.js"),__vite__mapDeps([11,1,6,3,4,5,7,8,9,2,10]))),bn=o.lazy(()=>De(()=>import("./DKWfDqFl.js"),__vite__mapDeps([12,1,13,6,3,4,5,7,8,9,2,10]))),gn=o.lazy(()=>De(()=>import("./B72jlrJH.js"),__vite__mapDeps([14,1,6,3,4,5,7,8,9,2,10]))),xn=o.lazy(()=>De(()=>import("./B2yOG-MG.js"),__vite__mapDeps([15,1,13,3,4,5,6,7,8,9,2,10]))),yn=o.lazy(()=>De(()=>import("./bHasDI2A.js"),__vite__mapDeps([16,1,13,2,3,4,5,6,7,8,9,10]))),wn=o.lazy(()=>De(()=>import("./B_b6FKN_.js"),__vite__mapDeps([17,1,3,4,5,6,7,8,9,2,10]))),vn=o.lazy(()=>De(()=>import("./9lBn_yJr.js"),__vite__mapDeps([18,1,3,4,5,6,7,8,9,2,10]))),kn=o.lazy(()=>De(()=>import("./D_gLo3ck.js"),__vite__mapDeps([19,1,13,3,4,5,6,7,8,9,2,10]))),Sn=o.lazy(()=>De(()=>import("./CouMYEjC.js"),__vite__mapDeps([20,1,6,3,4,21,5,7,8,9,2,10]))),jn=o.lazy(()=>De(()=>import("./B9KlXlIX.js"),__vite__mapDeps([22,1,3,4,5,6,7,8,9,2,10]))),Gr="http://127.0.0.1:7548/ingest/6a46b320-d8b5-43ce-8840-a981f4bbeaac",Tn="199465";function Mt(e=[]){const n=Array.isArray(e)?e:[],a=[...n].sort((l,c)=>(l.startTime||0)-(c.startTime||0)).map(l=>`${l.id||"no-id"}:${l.type||"unknown"}:${Number(l.startTime||0).toFixed(2)}:${Number(l.duration||0).toFixed(2)}`).slice(0,12).join("|"),s=n.reduce((l,c)=>Math.max(l,Number(c.startTime||0)+Number(c.duration||0)),0);return{count:n.length,lastEnd:Number(s.toFixed(3)),signature:a}}function Rt({hypothesisId:e,location:n,message:i,data:a={},runId:s="pre-fix"}){fetch(Gr,{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":Tn},body:JSON.stringify({sessionId:Tn,runId:s,hypothesisId:e,location:n,message:i,data:a,timestamp:Date.now()})}).catch(()=>{})}const qr=`
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
  ${Ho}
  ${Vo}
`;function Sa(e,n,i,a=!1){const s=o.useRef(!1),l=o.useRef(0),c=o.useRef(0);return o.useCallback((g,f)=>{g.preventDefault(),s.current=!0,l.current=e==="y"?g.clientY:g.clientX,c.current=f;const y=g.currentTarget;y.classList.add("dragging");const x=_=>{if(!s.current)return;const R=e==="y"?l.current-_.clientY:_.clientX-l.current,v=a?-R:R;n(c.current+v)},w=()=>{s.current=!1,y.classList.remove("dragging"),document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",w),document.body.style.cursor="",document.body.style.userSelect=""};document.addEventListener("mousemove",x),document.addEventListener("mouseup",w),document.body.style.cursor=e==="y"?"row-resize":"col-resize",document.body.style.userSelect="none"},[e,n,i,a])}const Jr=280,Cn=280,In=320,Mn=360;function ja(e){return Math.max(200,Math.min(400,Math.floor(e*.25)))}function Ta(e){return Math.max(220,Math.min(400,Math.floor(e*.25)))}const Rn={width:"100%",minWidth:0,minHeight:0,alignSelf:"stretch"},It=o.memo(({width:e,height:n="100%"})=>t.jsx("div",{style:{width:e,height:n,background:"linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderRight:"1px solid rgba(117,170,219,0.06)"},children:t.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}})}));It.displayName="PanelLoadingFallback";const Pa=o.memo(()=>t.jsx("div",{style:{height:"220px",background:"linear-gradient(180deg, #0c1018 0%, #08090c 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderTop:"2px solid rgba(117,170,219,0.08)"},children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[t.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),t.jsx("span",{style:{color:"#3d4a5c",fontSize:"11px",fontWeight:500},children:"Loading timeline..."})]})}));Pa.displayName="TimelineLoadingFallback";const Ca=[{target:"media-panel",title:"Media Library",desc:"Import videos and audio files here. Drag them to the timeline to start editing.",position:"right"},{target:"player",title:"Preview",desc:"Watch your edit in real-time. Effects and text overlays preview live without rendering.",position:"bottom"},{target:"inspector",title:"Inspector",desc:"Adjust clip properties — filters, speed, volume, text overlays, and transforms.",position:"left"},{target:"timeline",title:"Timeline",desc:"Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.",position:"top"}],Yn=o.memo(({onComplete:e})=>{const[n,i]=o.useState(0),a=Ca[n],s=n===Ca.length-1;return t.jsx("div",{style:{position:"fixed",inset:0,zIndex:9e3,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:l=>{l.target===l.currentTarget&&e()},children:t.jsxs("div",{style:{background:"#1a2332",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"90%",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 16px 64px rgba(0,0,0,0.5)"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(117,170,219,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#75aadb"},children:n+1}),t.jsx("span",{style:{fontSize:"15px",fontWeight:600,color:"#f1f5f9"},children:a.title})]}),t.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",lineHeight:1.6,margin:"0 0 16px"},children:a.desc}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx("div",{style:{display:"flex",gap:"4px"},children:Ca.map((l,c)=>t.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:c===n?"#75aadb":"rgba(255,255,255,0.1)"}},c))}),t.jsxs("div",{style:{display:"flex",gap:"8px"},children:[t.jsx("button",{onClick:e,style:{padding:"8px 16px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",background:"transparent",color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:"Skip"}),t.jsx("button",{onClick:()=>s?e():i(l=>l+1),style:{padding:"8px 20px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #75aadb, #5a8cbf)",color:"#0a0a0a",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:s?"Get Started":"Next"})]})]})]})})});Yn.displayName="WalkthroughOverlay";const Qr=(e,n)=>{switch(n.type){case"SET_CLIPS":return{...e,clips:n.clips,past:[...e.past.slice(-49),e.clips],future:[]};case"UNDO":return e.past.length===0?e:{clips:e.past[e.past.length-1],past:e.past.slice(0,-1),future:[e.clips,...e.future]};case"REDO":return e.future.length===0?e:{clips:e.future[0],past:[...e.past,e.clips],future:e.future.slice(1)};case"RESET":return{clips:[],past:[],future:[]};default:return e}};let Zr=0;const ra=()=>`clip-${Date.now()}-${(++Zr).toString(36)}`,Xn=o.memo(({message:e,progress:n,subMessage:i,operationLabel:a,onCancel:s})=>t.jsx("div",{className:"loading-overlay",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2e3,backdropFilter:"blur(6px)"},role:"dialog","aria-modal":"true","aria-label":"Processing",children:t.jsxs("div",{className:"loading-card",style:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"36px 52px",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",minWidth:"280px"},children:[t.jsxs("div",{style:{width:"56px",height:"56px",margin:"0 auto 20px",position:"relative"},children:[t.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),t.jsx("div",{style:{position:"absolute",inset:"6px",border:"2px solid rgba(117,170,219,0.1)",borderBottomColor:"rgba(117,170,219,0.5)",borderRadius:"50%",animation:"spin 1.2s linear infinite reverse"}})]}),t.jsx("p",{style:{color:"white",fontSize:"15px",margin:"0 0 6px",fontWeight:600},children:e}),a&&t.jsx("p",{style:{color:"rgba(255, 255, 255, 0.65)",fontSize:"12px",margin:"0 0 8px"},children:a}),i&&t.jsx("p",{style:{color:"#64748b",fontSize:"12px",margin:"0 0 16px"},children:i}),n>0&&t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{width:"220px",height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden",margin:"16px auto 10px"},children:t.jsx("div",{className:n<100?"shimmer-bar":"",style:{height:"100%",width:`${n}%`,background:n>=100?"linear-gradient(90deg, #22c55e, #16a34a)":"linear-gradient(90deg, #75aadb, #5a8cbf)",transition:"width 0.3s ease",borderRadius:"3px"}})}),t.jsxs("p",{style:{color:"#75aadb",fontSize:"13px",fontWeight:700,margin:"0 0 16px"},children:[Math.round(n),"%"]})]}),s&&t.jsx("button",{onClick:s,style:{marginTop:n>0?"0":"16px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",padding:"8px 24px",color:"#ef4444",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},"aria-label":"Cancel operation",children:"Cancel"})]})}));Xn.displayName="LoadingOverlay";const Gn=o.memo(({progress:e})=>e>=100?null:t.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"3px",background:"rgba(0,0,0,0.3)",zIndex:100,overflow:"hidden"},children:t.jsx("div",{style:{height:"100%",width:`${Math.max(e,2)}%`,background:"linear-gradient(90deg, #5a8cbf, #75aadb)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0",boxShadow:"0 0 8px rgba(117,170,219,0.4)"}})}));Gn.displayName="FFmpegInitBar";const qn=o.memo(({type:e="error",message:n,onClose:i,autoClose:a=!1})=>{const[s,l]=o.useState(!1);o.useEffect(()=>{if(!a)return;const g=setTimeout(()=>l(!0),en),f=setTimeout(i,en+tn);return()=>{clearTimeout(g),clearTimeout(f)}},[a,i]);const c=o.useCallback(()=>{l(!0),setTimeout(i,tn)},[i]),u={error:{bg:"linear-gradient(135deg, #ef4444, #dc2626)",shadow:"rgba(239,68,68,0.25)",icon:"error"},success:{bg:"linear-gradient(135deg, #22c55e, #16a34a)",shadow:"rgba(34,197,94,0.25)",icon:"check_circle"},warning:{bg:"linear-gradient(135deg, #f59e0b, #d97706)",shadow:"rgba(245,158,11,0.25)",icon:"warning"},info:{bg:"linear-gradient(135deg, #3b82f6, #2563eb)",shadow:"rgba(59,130,246,0.25)",icon:"info"}}[e]||{bg:"#ef4444",shadow:"rgba(0,0,0,0.2)",icon:"error"};return t.jsxs("div",{className:s?"toast-exit":"toast-enter",style:{position:"fixed",bottom:"24px",right:"24px",background:u.bg,color:"white",padding:"12px 18px",borderRadius:"10px",display:"flex",alignItems:"center",gap:"10px",boxShadow:`0 8px 28px ${u.shadow}`,zIndex:3e3,maxWidth:"380px",fontSize:"13px",backdropFilter:"blur(4px)"},role:e==="error"?"alert":"status",children:[t.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",opacity:.9},children:u.icon}),t.jsx("span",{style:{flex:1,lineHeight:1.4},children:n}),t.jsx("button",{onClick:c,style:{background:"rgba(255,255,255,0.15)",border:"none",color:"white",cursor:"pointer",padding:"4px",borderRadius:"50%",display:"flex",width:"22px",height:"22px",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0},children:"✕"})]})});qn.displayName="Toast";function ei(e,n){const i=e.find(s=>s.type==="video");if(!i)return null;if(i.file)return{file:i.file,mediaId:i.mediaId};const a=n.find(s=>s.id===i.mediaId);return a?.file?{file:a.file,mediaId:i.mediaId}:null}function ti(e){const n=String(e||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(n)return n;const i=new Date,a=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${a(i.getMonth()+1)}-${a(i.getDate())}`}async function ai(e,n,i,a,s,l,c){const u=new Map;for(const x of i)if(!(!x.file||x.storagePath))try{const w=await Pn(e,n,x.file);u.set(x.id,w)}catch(w){console.warn("[autosave] Media upload failed:",x.name,w)}if(u.size===0)return{changed:!1,clips:a,mediaItems:i};const g=i.map(x=>u.has(x.id)?{...x,storagePath:u.get(x.id)}:x),f=a.map(x=>{const w=x.mediaId&&u.get(x.mediaId);return w?{...x,storagePath:w}:x}),y=typeof c=="function"?c():a;return Rt({hypothesisId:"H1",location:"VideoEditor.jsx:uploadPendingMediaForProject",message:"media upload finished; checking stale timeline overwrite risk",data:{projectId:n,uploadedCount:u.size,saveSnapshot:Mt(a),latestBeforeApply:Mt(y),replacementState:Mt(f)}}),s(g),l(f),{changed:!0,clips:f,mediaItems:g}}const ni=(e,n,i,a,s,l,c,u,g,f,y,x,w,_=bo)=>{const[R,v]=o.useState(null),q=o.useRef(!1),K=o.useRef(e),W=o.useRef(null),Q=o.useRef(null),ie=o.useRef(null),k=o.useRef(0),U=o.useRef(0),oe=o.useRef(!1),I=o.useRef(i);I.current=i;const V=o.useRef(a);V.current=a;const se=o.useRef(n);se.current=n;const A=o.useRef(l);A.current=l;const J=o.useRef(c);J.current=c;const te=o.useRef(f);te.current=f;const ge=o.useRef(x);ge.current=x,o.useEffect(()=>{K.current=e},[e]),o.useEffect(()=>{const D=()=>{Yr(),De(()=>import("./BEUlQjCE.js"),__vite__mapDeps([23,1,24])).then(le=>le.warmupFaceModels?.()).catch(()=>{})};if(typeof requestIdleCallback=="function"){const le=requestIdleCallback(D,{timeout:1500});return()=>cancelIdleCallback?.(le)}const xe=setTimeout(D,500);return()=>clearTimeout(xe)},[]),o.useEffect(()=>{const D=new Set(["file","blobUrl","thumbnail","isProcessing"]),xe=pe=>{const de={};for(const[ke,be]of Object.entries(pe))D.has(ke)||(de[ke]=be);return pe.mediaId&&K.current&&(de.idbKey=`idb://${K.current}:${pe.mediaId}`),de.storagePath&&de.storagePath.startsWith("blob:")&&delete de.storagePath,de},le=pe=>{const de={};for(const[ke,be]of Object.entries(pe))D.has(ke)||(de[ke]=be);return pe.id&&K.current&&(de.idbKey=`idb://${K.current}:${pe.id}`),de.blobUrl&&delete de.blobUrl,de},Ie=async()=>{if(q.current)return{saved:!1,skipReason:"in-progress"};const pe=I.current?.length||0,de=V.current?.length||0;(pe>0||de>0)&&(oe.current=!0);const ke=Hr({projectId:K.current,isRestored:w?w.current:!0,hasBeenNonEmpty:oe.current,clipsCount:pe,mediaItemsCount:de});if(Rt({hypothesisId:"H4",location:"VideoEditor.jsx:useAutoSave.doSave.guard",message:"autosave guard evaluated",data:{projectId:K.current,guardSkip:ke.skip,guardReason:ke.reason,isRestored:w?w.current:!0,hasBeenNonEmpty:oe.current,clipsCount:pe,mediaItemsCount:de}}),ke.skip)return{saved:!1,skipReason:ke.reason};if(k.current>=3){if(U.current>0)return U.current--,{saved:!1,skipReason:"backoff"};U.current=Math.min(Math.pow(2,k.current-3),20)}q.current=!0;try{const be=I.current,Te=V.current,Pe=se.current,j=te.current,E={id:K.current,name:Pe,clips:be.map(xe),mediaItems:Te.map(le),duration:A.current,resolution:J.current||"1080p",timelineMarkers:ge.current||[]};Rt({hypothesisId:"H2",location:"VideoEditor.jsx:useAutoSave.doSave.snapshot",message:"autosave snapshot captured",data:{projectId:K.current,clips:Mt(be),mediaItemsCount:Te.length}}),(j?.storagePath||j?.mediaId)&&(E.bgMusic={name:j.name,volume:j.volume??.3},j.storagePath&&(E.bgMusic.storagePath=j.storagePath),j.mediaId&&(E.bgMusic.mediaId=j.mediaId));const ee=ei(be,Te),T=ee?.mediaId||null;if(ee&&T!==W.current)try{const L=await $t(ee.file,1);if(L&&L.size>500){W.current=T,s&&(E.thumbnail=L);const Z=await new Promise(we=>{const Ce=new FileReader;Ce.onloadend=()=>we(Ce.result),Ce.readAsDataURL(L)});E.thumbnailDataUrl=Z,Q.current=Z}}catch(L){console.warn("Auto-save thumbnail generation failed:",L)}else Q.current&&(E.thumbnailDataUrl=Q.current);if(s){const L=await go(()=>ta(s,E),{maxRetries:2,baseDelay:1e3,maxDelay:5e3});w&&(w.current=!0);const Z=K.current;let we=!1;if(L?.id&&L.id!==Z&&(K.current=L.id,Z))try{await $o(Z,L.id),we=!0,L.id}catch(We){console.warn("[autosave] IndexedDB re-key failed:",We)}const Ce=K.current;if(Ce&&Ot()){const We=await ai(s,Ce,V.current,I.current,u,g,()=>I.current);if(We.changed&&(I.current=We.clips,V.current=We.mediaItems),We.changed||we){const at={id:Ce,name:se.current,clips:(We.changed?We.clips:I.current).map(xe),mediaItems:V.current.map(le),duration:A.current,resolution:J.current||"1080p",timelineMarkers:ge.current||[],...Q.current?{thumbnailDataUrl:Q.current}:{}};te.current?.storagePath&&(at.bgMusic={storagePath:te.current.storagePath,name:te.current.name,volume:te.current.volume??.3}),await ta(s,at)}const lt=te.current;if(lt?.file&&!lt?.storagePath&&Ce)try{const at=await Pn(s,Ce,lt.file);y(Wt=>Wt?{...Wt,storagePath:at}:null),await ta(s,{id:Ce,name:se.current,clips:I.current.map(xe),mediaItems:V.current.map(le),duration:A.current,resolution:J.current||"1080p",timelineMarkers:ge.current||[],bgMusic:{storagePath:at,name:lt.name,volume:lt.volume??.3},...Q.current?{thumbnailDataUrl:Q.current}:{}})}catch(at){console.warn("Background music upload failed:",at)}}}else{const Z=ta(null,E).id;K.current||(K.current=Z),w&&(w.current=!0);for(const Ce of V.current)Ce.file&&Bt(Z,Ce.id,Ce.file,{name:Ce.name,type:Ce.file.type}).catch(We=>{console.warn("Failed to persist media to IndexedDB",{mediaId:Ce.id,error:We?.message})});const we=te.current;we?.file&&we?.mediaId&&Bt(Z,we.mediaId,we.file,{name:we.name,type:we.file.type}).catch(Ce=>{console.warn("Failed to persist background music to IndexedDB",{mediaId:we.mediaId,error:Ce?.message})})}return v(new Date),k.current=0,U.current=0,{saved:!0}}catch(be){k.current++,k.current<=1?console.warn("Auto-save failed:",be?.message||be):k.current===3&&console.warn(`[autosave] ${k.current} consecutive failures — backing off. Will retry less frequently.`);try{const Te=se.current,Pe=K.current,j={id:Pe,projectName:Te,clips:I.current.map(xe),mediaItems:V.current.map(le),savedAt:new Date().toISOString()};if(localStorage.setItem(`clipcut_autosave_${Te}`,JSON.stringify(j)),Pe)for(const E of V.current)E.file&&Bt(Pe,E.id,E.file,{name:E.name,type:E.file.type}).catch(ee=>{console.warn("Fallback media persist failed",{mediaId:E.id,error:ee?.message})})}catch{}return{saved:!1,skipReason:"error",error:be}}finally{q.current=!1}};ie.current=Ie;const ye=setInterval(Ie,_);return()=>clearInterval(ye)},[s,_,u,g,y]);const P=o.useCallback(()=>ie.current?ie.current():Promise.resolve({saved:!1,skipReason:"not-ready"}),[]);return{lastSaved:R,projectId:K.current,triggerSave:P}},oi=60,ri=(e,n)=>{const[i,a]=o.useState(0),[s,l]=o.useState(!1),c=o.useRef(null),u=o.useRef(1),g=o.useRef(0),f=o.useRef(0),y=o.useRef(e);y.current=e;const x=o.useCallback(k=>{const U=y.current.filter(I=>I.type!=="audio"&&I.type!=="text").sort((I,V)=>I.startTime-V.startTime);for(const I of U)if(k>=I.startTime&&k<I.startTime+I.duration)return I;const oe=U[U.length-1];return oe&&Math.abs(k-(oe.startTime+oe.duration))<.05?oe:null},[]),w=o.useMemo(()=>x(i),[x,i,e]),_=o.useMemo(()=>w?Math.max(0,i-w.startTime)+(w.trimStart||0):0,[w,i]),R=o.useMemo(()=>{if(!w)return null;const k=e.filter(oe=>oe.type!=="audio").sort((oe,I)=>oe.startTime-I.startTime),U=k.findIndex(oe=>oe.id===w.id);return U>=0&&U<k.length-1?k[U+1]:null},[w,e]),v=o.useCallback(()=>{const k=performance.now();k-f.current>=oi&&(f.current=k,a(g.current))},[]),q=o.useCallback(k=>{if(k>=n){g.current=n,a(n),l(!1);return}g.current=k,v()},[n,v]);o.useEffect(()=>{if(!s){c.current&&cancelAnimationFrame(c.current),a(g.current);return}const k=()=>{if(g.current>=n){l(!1),a(n);return}c.current=requestAnimationFrame(k)};return c.current=requestAnimationFrame(k),()=>{c.current&&cancelAnimationFrame(c.current)}},[s,n]);const K=o.useCallback(k=>{const U=Math.max(0,Math.min(n,k));g.current=U,a(U)},[n]),W=o.useCallback(()=>l(k=>!k),[]),Q=o.useCallback(()=>{l(!1),g.current=0,a(0)},[]),ie=o.useCallback(k=>{u.current=k},[]);return{currentTime:i,currentClip:w,clipOffset:_,nextClip:R,isPlaying:s,seek:K,togglePlay:W,stop:Q,setIsPlaying:l,setSpeed:ie,setCurrentTime:a,currentTimeRef:g,speedRef:u,onVideoTime:q}},ii=()=>{const e=xo(),n=yo(),{user:i}=ho(),[a,s]=o.useState(()=>new URLSearchParams(window.location.search).get("project")||null),[l,c]=o.useState("Untitled Project"),[u,g]=o.useState("1080p"),f=o.useRef(!1),y=o.useRef(!1);o.useEffect(()=>{const r=new URL(window.location);a?r.searchParams.set("project",a):r.searchParams.delete("project"),r.toString()!==window.location.href&&window.history.replaceState(window.history.state,"",r)},[a]);const[x,w]=o.useState("media"),[_,R]=o.useState("video"),[v,q]=o.useState("basic"),[K,W]=o.useState("local"),[Q,ie]=o.useState("default"),k=La(),U=wo(),[oe,I]=o.useState(!1),[V,se]=o.useState(!1),[A,J]=o.useState([]),[te,ge]=o.useState(!1),[P,D]=o.useState("parse"),[xe,le]=o.useState(!1),[Ie,ye]=o.useState([]),pe=o.useRef([]),de=o.useRef([]),[ke,be]=o.useState(null),[Te,Pe]=o.useState(null),[j,E]=o.useState(null),[ee,T]=o.useState(()=>typeof window<"u"?window.innerWidth:1200);o.useEffect(()=>{if(Q==="wide-timeline"){const r=window.innerHeight-296,d=Math.max(320,Math.floor(window.innerHeight*.46));be(Math.max(120,Math.min(d,r)))}else(Q==="default"||Q==="compact")&&be(null)},[Q]);const M=o.useMemo(()=>ja(ee),[ee]),L=o.useMemo(()=>Ta(ee),[ee]),Z=o.useMemo(()=>Math.min(Te??Cn,M),[Te,M]),we=o.useMemo(()=>Math.min(j??In,L),[j,L]),Ce=o.useCallback(r=>{const d=window.innerHeight-296,p=Math.max(120,Math.min(r,d));be(p)},[]),We=o.useCallback(r=>{const d=window.innerWidth,p=ja(d),m=j??In,S=d-Mn-m-24;Pe(Math.max(200,Math.min(r,p,S)))},[j]),lt=o.useCallback(r=>{const d=window.innerWidth,p=Ta(d),m=Te??Cn,S=d-Mn-m-24;E(Math.max(220,Math.min(r,p,S)))},[Te]);o.useEffect(()=>{let r;const d=()=>{clearTimeout(r),r=setTimeout(()=>{const p=window.innerWidth;T(p);const m=ja(p),S=Ta(p);Pe(b=>b!=null?Math.min(b,m):null),E(b=>b!=null?Math.min(b,S):null)},150)};return window.addEventListener("resize",d),d(),()=>{clearTimeout(r),window.removeEventListener("resize",d)}},[]);const at=Sa("y",Ce),Wt=Sa("x",We),Jn=Sa("x",lt,void 0,!0),[Qe,gt]=o.useState(null),[Qn,Zn]=o.useState(0),[eo,to]=o.useState(()=>!localStorage.getItem("clipcut_onboarded")),[Le,Fe]=o.useState([]),[ct,Vt]=o.useState(null),[_t,ca]=o.useReducer(Qr,{clips:[],past:[],future:[]}),N=_t.clips,xt=_t.past.length>0,yt=_t.future.length>0,[Ue,Ze]=o.useState(null),[da,Kt]=o.useState([]);o.useEffect(()=>{k&&Ue&&(gt("inspector"),I(!0))},[k,Ue]);const nt=o.useMemo(()=>{if(N.length===0)return 30;const r=N.filter(p=>p.type!=="text"&&p.type!=="sticker"&&!p.isCaption),d=r.length>0?r:N;return Math.max(...d.map(p=>p.startTime+p.duration))},[N]),O=ri(N,nt),[Ve,wt]=o.useState(null),[Na,Fa]=o.useState(!1),[vt,Oa]=o.useState(!1),[$a,Ht]=o.useState(0),[At,Ba]=o.useState([]),Pt=o.useRef(null),[ua,kt]=o.useState(!1),[St,Se]=o.useState(""),[Da,tt]=o.useState(""),pa=o.useRef(new Set),[Yt,za]=o.useState(null),z=o.useCallback((r,d)=>za({type:r,message:d}),[]),ce=Sr(),$e=o.useMemo(()=>N.find(r=>r.id===Ue),[N,Ue]),ao=o.useMemo(()=>{if(O.currentClip?.blobUrl)return O.currentClip.blobUrl;if(ct){const d=Le.find(p=>p.id===ct)?.blobUrl;if(d)return d}return N.find(d=>d.type!=="audio"&&d.type!=="text"&&d.blobUrl)?.blobUrl||null},[O.currentClip,ct,Le,N]),no=o.useMemo(()=>Kr(N),[N]),oo=o.useMemo(()=>{const r=N.filter(m=>m.isCaption),d=N.filter(m=>m.type==="text"&&!m.isCaption),p=N.filter(m=>(m.type==="text"||m.type==="sticker"||m.isCaption)&&m.type!=="audio"&&O.currentTime>=m.startTime&&O.currentTime<m.startTime+m.duration);if(r.length>0&&p.filter(m=>m.isCaption).length===0){const m=r.slice(0,3);O.currentTime.toFixed(3),N.length,r.length,d.length,p.length,m.map(S=>({id:S.id,type:S.type,isCaption:S.isCaption,text:(S.text||"").slice(0,30),startTime:S.startTime,duration:S.duration,track:S.track,range:`${S.startTime?.toFixed(2)}-${(S.startTime+S.duration).toFixed(2)}`}))}return p},[N,O.currentTime]),ro=o.useMemo(()=>{const r=O.currentClip;if(!r||!r.transition||r.type==="audio"||r.type==="text"||r.type==="sticker"||r.isCaption||!r.blobUrl)return null;const d=Math.max(.2,Math.min(3,r.transitionDuration??1)),p=r.trimStart||0,m=Math.max(0,O.clipOffset-p),S=Math.max(0,r.duration-d);if(m<S)return null;const b=r.startTime+r.duration,B=N.filter(fe=>fe.id!==r.id&&!fe.isCaption&&fe.type!=="audio"&&fe.type!=="text"&&fe.type!=="sticker"&&(fe.track||0)===(r.track||0)&&fe.startTime>=b-.08&&fe.startTime<=b+.08).sort((fe,Re)=>fe.startTime-Re.startTime)[0];if(!B?.blobUrl)return null;const $=Math.max(0,Math.min(1,(m-S)/d)),H=(B.trimStart||0)+Math.max(0,m-S);return{type:r.transition,duration:d,progress:$,nextVideoSrc:B.blobUrl,nextTime:H,leftClipId:r.id,rightClipId:B.id}},[O.currentClip,O.clipOffset,N]),dt=o.useRef(_t.clips);dt.current=_t.clips;const me=o.useCallback(r=>{const d=dt.current,p=typeof r=="function"?r(d):r;ca({type:"SET_CLIPS",clips:p})},[]),{lastSaved:io,projectId:Xt,triggerSave:Gt}=ni(a,l,N,Le,i?.id,nt,u,Fe,me,Ve,wt,da,y);o.useEffect(()=>{Xt&&Xt!==a&&s(Xt)},[Xt,a]);const jt=o.useCallback(()=>ca({type:"UNDO"}),[]),ut=o.useCallback(()=>ca({type:"REDO"}),[]),Ne=o.useCallback((r,d)=>me(p=>p.map(m=>m.id===r?{...m,...d}:m)),[me]),Wa=o.useCallback(r=>me(d=>d.map(p=>p.isCaption?{...p,...r}:p)),[me]),qt=o.useCallback(r=>{me(d=>d.filter(p=>p.id!==r)),Ue===r&&Ze(null)},[me,Ue]),Va=o.useCallback(r=>r?.type==="audio"||r?.type==="video"||r?.type==="image"?r.type:on(r?.file||r)||"video",[]),pt=o.useCallback((r,d=null)=>{const p=Va(r);let m=d;if(m===null){const b=dt.current.filter($=>$.type===p),B=b.length>0?b.reduce(($,H)=>$.startTime+$.duration>H.startTime+H.duration?$:H):null;m=B?B.startTime+B.duration:0}const S={...va,id:ra(),mediaId:r.id,name:r.name,type:p,startTime:m,duration:r.duration||ya,file:r.file,blobUrl:r.blobUrl,thumbnail:r.thumbnail};me(b=>[...b,S]),Ze(S.id),setTimeout(()=>Gt(),100)},[Va,me,Gt]),Tt=o.useCallback(async(r,d={})=>{const{placeAudioOnTimeline:p=!1}=d;Fa(!0);try{let m=a;if(m||(m=`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s(m)),r.length>0&&l==="Untitled Project"){const B=(r.find($=>$.type.startsWith("video/"))||r[0]).name.replace(/\.[^.]+$/,"").trim();B&&c(B)}let S=0;for(const b of r){Se(`Importing ${b.name}...`),tt(`${++S} of ${r.length}`);const B=ra(),$=URL.createObjectURL(b);Bt(m,B,b,{name:b.name,type:b.type}).catch(X=>console.warn("[import] IndexedDB store failed:",b.name,X));const H=Bo(b,["video","audio"]).category,fe=on(b),Re=H==="audio"||fe==="audio"||b.type.startsWith("audio/");Fe(X=>[...X,{id:B,name:b.name,file:b,blobUrl:$,thumbnail:null,duration:0,width:0,height:0,type:Re?"audio":"video",isProcessing:!0}]);try{const X=await na(b);if(Fe(ve=>ve.map(he=>he.id===B?{...he,duration:X.duration,width:X.width,height:X.height,isProcessing:!1}:he)),!Re)try{const ve=`${b.name}_${b.size}_${b.lastModified}`,he=await Cr(ve,0),h=he||await $t(b,0);he||Ir(ve,0,h).catch(()=>{});const F=URL.createObjectURL(h);Fe(Y=>Y.map(ae=>ae.id===B?{...ae,thumbnail:F}:ae))}catch(ve){console.warn("Thumbnail generation failed:",ve)}p&&Re&&pt({id:B,name:b.name,file:b,blobUrl:$,thumbnail:null,duration:X.duration||ya,width:X.width||0,height:X.height||0,type:"audio"})}catch(X){if(!Re&&/\.(mov|avi|mkv|flv|wmv)$/i.test(b.name))try{Se(`Converting ${b.name} to MP4...`),ce.isReady||await ce.initialize();const he=await ce.convertFormat(b,"mp4"),h=new File([he],b.name.replace(/\.\w+$/,".mp4"),{type:"video/mp4"}),F=URL.createObjectURL(h);URL.revokeObjectURL($);const Y=await na(h);Fe(ne=>ne.map(je=>je.id===B?{...je,file:h,blobUrl:F,duration:Y.duration,width:Y.width,height:Y.height,isProcessing:!1}:je));const ae=await $t(h,0).catch(()=>null);if(ae){const ne=URL.createObjectURL(ae);Fe(je=>je.map(re=>re.id===B?{...re,thumbnail:ne}:re))}z("info",`Converted ${b.name} to MP4`)}catch(he){console.error("Auto-convert failed:",he),Fe(h=>h.map(F=>F.id===B?{...F,isProcessing:!1}:F))}else console.error("Error processing:",X),Fe(he=>he.map(h=>h.id===B?{...h,isProcessing:!1}:h)),p&&Re&&pt({id:B,name:b.name,file:b,blobUrl:$,thumbnail:null,duration:ya,width:0,height:0,type:"audio"})}}z("success",`Imported ${r.length} file${r.length>1?"s":""}`)}catch(m){z("error",`Import failed: ${m.message}`)}finally{Fa(!1),Se(""),tt("")}},[pt,ce,z,a,l]),ma=o.useRef(null);o.useEffect(()=>{const r=N.find(X=>X.type!=="audio"&&X.type!=="text"&&X.type!=="sticker"&&!X.isCaption&&(X.file||X.blobUrl||X.mediaId));if(!r){ye([]),ma.current=null;return}const d=r.mediaId?Le.find(X=>X.id===r.mediaId):null,p=r.file||d?.file||null,m=r.blobUrl||d?.blobUrl||null;if(!p&&!m){ye([]);return}const S=r.trimStart||0,b=r.trimEnd||0,B=r.duration||0,$=N.some(X=>X.isCaption),H=p?`${p.size}:${p.lastModified}`:String(m||""),fe=`${r.id}|${r.mediaId||""}|${S}|${b}|${B}|${$}|${H}`;if(fe===ma.current)return;ma.current=fe;const Re={...r,file:p||void 0,blobUrl:m||void 0};De(async()=>{const{analyzeVideo:X}=await import("./D8S6fycm.js");return{analyzeVideo:X}},__vite__mapDeps([25,26,3,1,4])).then(({analyzeVideo:X})=>{X(Re,{hasCaptions:$}).then(ve=>{ye(ve.length>0?ve:[])}).catch(()=>{ye([])})})},[N,Le]);const Jt=o.useCallback(r=>{const d=Do(r,{allowedCategories:["audio"],category:"audio"});if(!d.valid){z("warning",d.error||"Please select an audio file");return}Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl);const p=URL.createObjectURL(r),m=`bgm-${Date.now()}`;wt({file:r,name:r.name,blobUrl:p,volume:.3,mediaId:m});const S=a||`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Bt(S,m,r,{name:r.name,type:r.type}).catch(b=>console.warn("[bgMusic] IndexedDB store failed:",b)),z("success",`Background music: ${r.name}`)},[Ve,z,a]),Qt=o.useCallback(r=>{wt(d=>d?{...d,volume:r}:null)},[]),Zt=o.useCallback(()=>{Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl),wt(null),z("info","Background music removed")},[Ve,z]),Ka=o.useCallback(r=>{Fe(d=>{const p=d.find(m=>m.id===r);return p&&requestAnimationFrame(()=>{p.blobUrl&&URL.revokeObjectURL(p.blobUrl),p.thumbnail&&URL.revokeObjectURL(p.thumbnail)}),d.filter(m=>m.id!==r)}),me(d=>(d.filter(p=>p.mediaId===r).forEach(p=>{p.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(p.blobUrl))}),d.filter(p=>p.mediaId!==r))),ct===r&&Vt(null)},[ct,me]),ea=o.useCallback((r,d)=>{const p=dt.current.find(b=>b.id===r);if(!p||!Number.isFinite(d)||d<=.1||d>=p.duration-.1)return!1;const m={...p,id:ra(),name:`${p.name} (1)`,duration:d},S={...p,id:ra(),name:`${p.name} (2)`,startTime:p.startTime+d,duration:p.duration-d,trimStart:(p.trimStart||0)+d};return me(b=>{const B=b.findIndex(H=>H.id===r),$=[...b];return $.splice(B,1,m,S),$}),Ze(m.id),z("success","Clip split"),!0},[me,z]),ot=o.useCallback(r=>{me(d=>[...d,r]),Ze(r.id)},[me]),Ha=o.useCallback(r=>{me(()=>r),Ze(null),z("success","Clip deleted (ripple)")},[me,z]);o.useCallback(async(r,d,p)=>{const m=dt.current.find(S=>S.id===r);if(m?.file){kt(!0),Se("Trimming...");try{const S=await ce.trimVideo(m.file,d,p),b=URL.createObjectURL(S);me(B=>B.map($=>$.id===r?{...$,file:S,blobUrl:b,duration:p}:$)),m.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(m.blobUrl)),z("success","Clip trimmed")}catch(S){z("error",sa(S,"ffmpeg"))}finally{kt(!1),Se(""),ce.resetProgress()}}},[ce,me,z]),o.useCallback(async(r,d,p)=>{let m=r.file;const S=r.speed&&r.speed!==1,b=r.brightness||r.contrast,B=r.saturation!==void 0&&r.saturation!==1,$=r.rotation&&[90,180,270,-90].includes(r.rotation),H=r.volume!==void 0&&r.volume!==1||r.isMuted,fe=r.fadeIn&&r.fadeIn>0||r.fadeOut&&r.fadeOut>0,Re=r.filterName,X=r.trimStart>0||r.trimEnd>0,ve=r.effects?.some(Y=>Y.enabled),he=r.text&&r.text.trim().length>0;if(!S&&!b&&!B&&!$&&!H&&!fe&&!Re&&!X&&!ve&&!he)return m;const F=`clip ${d+1}/${p}`;if(X&&(Se(`Trimming ${F}...`),m=await ce.trimVideo(m,r.trimStart,r.duration)),S&&(Se(`Adjusting speed for ${F}...`),m=await ce.changeSpeed(m,r.speed)),b&&(Se(`Adjusting colors for ${F}...`),m=await ce.adjustBrightnessContrast(m,r.brightness||0,r.contrast||0)),B&&(Se(`Adjusting saturation for ${F}...`),m=await ce.adjustSaturation(m,r.saturation)),$&&(Se(`Rotating ${F}...`),m=await ce.rotateVideo(m,r.rotation)),H&&(Se(`Adjusting audio for ${F}...`),m=await ce.adjustVolume(m,r.isMuted?0:r.volume)),fe&&(Se(`Adding fade to ${F}...`),m=await ce.addFade(m,r.fadeIn||0,r.fadeOut||0,r.duration)),Re){const Y=Yo.find(ae=>ae.name===r.filterName);Y?.filter&&(Se(`Applying ${r.filterName} filter to ${F}...`),m=await ce.applyFilter(m,Y.filter))}if(ve)for(const Y of r.effects.filter(ae=>ae.enabled))Y.type==="blur"&&Y.params?.radius?(Se(`Applying ${Y.name} to ${F}...`),m=await ce.applyBlur(m,Y.params.radius)):Y.type==="sharpen"&&Y.params?.strength&&(Se(`Applying ${Y.name} to ${F}...`),m=await ce.applySharpen(m,Y.params.strength));return he&&(Se(`Adding text overlay to ${F}...`),m=await ce.addTextOverlay(m,r.text,{position:r.textPosition||"bottom-center",fontSize:r.textSize||48,fontColor:r.textColor||"white",backgroundColor:r.textBgColor||null,startTime:r.textStartTime||0,duration:r.textDuration||0})),m},[ce]);const so=o.useCallback(()=>{N.length>0&&!window.confirm("Start a new project? Unsaved changes will be lost.")||(me([]),c("Untitled Project"),s(null),f.current=!1,y.current=!1,Fe([]),Ze(null),Vt(null),Kt([]),z("info","New project created"))},[N.length,z,me]),lo=o.useCallback(async()=>{const r=await Gt();if(r?.saved){z("success","Project saved");return}switch(r?.skipReason){case"restore-in-progress":z("info","Project still loading — try again in a moment");break;case"empty-without-session-edit":z("info","Nothing to save yet — add media or clips first");break;case"in-progress":z("info","Save already in progress");break;case"backoff":z("warning","Previous saves failed — retrying shortly");break;case"error":z("error",`Save failed${r?.error?.message?": "+r.error.message:""}`);break;default:z("info","Save skipped")}},[Gt,z]),co=o.useCallback(()=>{n("/settings")},[n]),Ya=o.useCallback(r=>{const d=String(r?.message||r||"").toLowerCase();return d.includes("too long to respond")||d.includes("timeout")?'AI is taking too long right now. Try again or use a shorter command like "add captions".':d.includes("worker")||d.includes("network")||d.includes("fetch")?"I could not reach the AI service. Check your internet and retry.":d.includes("import a video first")||d.includes("no video clip found")?"Please import a video first, then try the AI edit again.":d.includes("didn't understand")||d.includes("rephrasing")?'I did not understand that request. Try a clearer command like "split at 00:26".':"I could not complete that AI edit. Please try again."},[]),Lt=o.useCallback(async(r,d={})=>{const p=Date.now();if(de.current=de.current.filter(b=>p-b<6e4),de.current.length>=10){J(b=>[...b,{id:`e-${p}`,role:"assistant",text:"Rate limit reached. Please wait a moment before sending more prompts."}]);return}de.current.push(p);const m={id:`u-${p}`,role:"user",text:r};if(J(b=>[...b,m]),!N.some(b=>b.type==="video"||b.type==="audio"||b.type==="image")){const{parseIntentLocally:b}=await De(async()=>{const{parseIntentLocally:$}=await import("./DMCcCjOS.js");return{parseIntentLocally:$}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2]));if(b(r)){const $=()=>{k?(gt("media"),I(!0)):(w("media"),W("local"))};J(H=>[...H,{id:`g-${p}`,role:"assistant",text:"Please import a video first to use AI editing.",openMedia:$}]);return}}ge(!0),D("parse"),le(!1);try{const{executeAiEdit:b,executeStructuredAiActions:B}=await De(async()=>{const{executeAiEdit:h,executeStructuredAiActions:F}=await import("./DMCcCjOS.js");return{executeAiEdit:h,executeStructuredAiActions:F}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2])),$={duration:nt,hasAudio:N.some(h=>h.type==="audio"||h.type==="video"&&h.file),clipCount:N.length,currentTime:O.currentTime,hasCaptions:N.some(h=>h.isCaption),filters:[...new Set(N.filter(h=>h.filterName).map(h=>h.filterName))].join(",")||void 0,tracks:N.reduce((h,F)=>Math.max(h,(F.track||0)+1),0)},H=A.slice(-10).map(h=>({role:h.role,content:h.role==="assistant"&&h.actions?.length?`[Actions: ${h.actions.join(", ")}] ${h.text}`:h.text})),fe=JSON.parse(JSON.stringify(N.map(h=>{const{file:F,...Y}=h;return Y}))),Re=new Map(N.filter(h=>h.file).map(h=>[h.id,h.file])),X={history:H,onSlowResponse:()=>le(!0),onProgress:D},ve={clips:N,setClips:me,updateClip:Ne,addClip:h=>{me(F=>[...F,{...va,id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...h}])},getClips:()=>dt.current,splitClip:ea,selectedClipId:Ue,mediaItems:Le},he=d.structuredActions?await B(d.structuredActions,ve,{onProgress:D}):await b(r,$,ve,X);if(he.isChat)J(h=>[...h,{id:`a-${Date.now()}`,role:"assistant",text:he.summary}]);else{Rt({hypothesisId:"H2",location:"VideoEditor.jsx:handleAiSendMessage",message:"ai edit applied to timeline",data:{projectId:a,actionLabels:he.actionLabels||[],appliedCount:(he.applied||[]).length,clipsAfterAi:Mt(dt.current)}});const h=`ai-${Date.now()}`;pe.current.push({id:h,snapshot:fe,filesMap:Re});const F={id:`a-${Date.now()}`,role:"assistant",text:he.summary||"Done!",actions:he.actionLabels||[],applied:he.applied||[],failed:he.failed||[],skipped:he.skipped||[],undoScope:`Undoes all changes from this AI command (${(he.applied||[]).length} action${(he.applied||[]).length===1?"":"s"}).`,canUndo:!0,onUndo:()=>{const Y=pe.current.find(ae=>ae.id===h);if(Y){const ae=Y.snapshot.map(ne=>{const je=Y.filesMap.get(ne.id);return je?{...ne,file:je}:ne});me(ae),pe.current=pe.current.filter(ne=>ne.id!==h),J(ne=>ne.map(je=>je.id===F.id?{...je,canUndo:!1}:je)),J(ne=>[...ne,{id:`a-${Date.now()}`,role:"assistant",text:"Restored timeline to pre-AI state for that command."}]),z("info","AI edit undone")}}};J(Y=>[...Y,F])}}catch(b){const B={id:`e-${Date.now()}`,role:"assistant",text:Ya(b)};J($=>[...$,B])}finally{ge(!1),D("parse"),le(!1)}},[N,me,Ne,ea,Ue,Le,nt,O.currentTime,A,Ya]),Xa=o.useCallback(r=>{if(r?.action){const d=`Apply suggestion: ${r.title}`,p=[{type:r.action,params:r.params||{}}];Lt(d,{structuredActions:p});return}Lt(r.title)},[Lt]),fa=o.useCallback(()=>{se(r=>!r),k&&(gt("ai"),I(r=>!r))},[k]),Ga=o.useCallback((r,d,p)=>{const m=p==="mp4"?"mp4":"webm",S=URL.createObjectURL(r),b=document.createElement("a");b.href=S,b.download=`${ti(d||l)}.${m}`,document.body.appendChild(b),b.click(),document.body.removeChild(b),setTimeout(()=>URL.revokeObjectURL(S),2e3)},[l]),uo=o.useCallback(()=>{Pt.current&&(Pt.current.abort(),Pt.current=null)},[]),Ut=o.useCallback(async(r,d={})=>{if(N.length===0){z("warning","No clips to export. Add media to the timeline first.");return}const p=N.filter(b=>b.type!=="audio"&&b.file).sort((b,B)=>b.startTime-B.startTime);if(p.length===0){z("warning","No video clips with valid files. Make sure your clips are properly loaded.");return}if(vt){Ba(b=>[...b,r]),z("info",`Queued export at ${r} (${At.length+1} in queue)`);return}O.isPlaying&&O.setIsPlaying(!1),Oa(!0),Ht(0),Se("Preparing export..."),tt("");let m=r;if(r.startsWith("preset:")){const b=r.slice(7),B=la[b];B&&(B.width<=854?m="480p":B.width<=1280?m="720p":m="1080p")}const S=new AbortController;Pt.current=S;try{const b=String(d.format||"webm").toLowerCase()==="mp4"?"mp4":"webm",B=[...p,...N.filter(X=>X.type==="text"||X.type==="sticker")],$=Math.max(...p.map(X=>X.startTime+X.duration)),H=await Ur({clips:B,bgMusic:Ve,totalDuration:$,resolution:m,settings:{...d,format:"webm"},onProgress:({percent:X,elapsed:ve,eta:he,label:h})=>{const F=b==="mp4"?Math.min(70,Math.round(X*.7)):X;Ht(F),Se(b==="mp4"?"Rendering local preview stream...":h||"Exporting..."),tt(`${F}%  ·  Elapsed ${ve}  ·  ETA ${he}`)},abortSignal:S.signal});if(!H.blob||H.blob.size===0)throw new Error("Export produced an empty file.");let fe=H.blob,Re="webm";if(b==="mp4")if(Se("Checking server encoder..."),tt("Validating MP4 export service availability..."),!await _n())z("warning","MP4 server is unavailable right now. Exported WebM locally instead.");else try{Se("Uploading to MP4 encoder..."),tt("Uploading render to server for fast MP4 transcode...");const ve=await Fo(H.blob,m,{},he=>{const h=Math.min(98,70+Math.round(he/100*28));Ht(h),Se("Server encoding MP4..."),tt(`${h}%  ·  Upload + transcode in progress`)},S.signal);ve&&ve.size>0?(fe=ve,Re="mp4"):z("warning","MP4 conversion returned empty output. Downloaded WebM fallback.")}catch(ve){console.warn("Server MP4 export failed, using local WebM fallback:",ve),z("warning","MP4 export failed on server. Downloaded WebM fallback instead.")}Ga(fe,d.filename||l,Re),z("success",`Exported ${Re.toUpperCase()} at ${m} (${(fe.size/(1024*1024)).toFixed(1)} MB)`)}catch(b){b.message==="Export cancelled."?z("info","Export cancelled."):(console.error("Export error:",b),z("error",b.message||"Export failed. Please try again."))}finally{Oa(!1),Ht(0),Se(""),tt(""),Pt.current=null}},[N,l,O,z,Ve,Ga,vt,At,nt]);o.useEffect(()=>{if(!vt&&At.length>0){const[r,...d]=At;Ba(d),Ut(r)}},[vt,At,Ut]);const po=o.useCallback(r=>{O.seek(r)},[O]),ha=o.useCallback(()=>{if(!O.currentClip){O.setIsPlaying(!1);return}const d=N.filter(p=>p.type!=="audio").sort((p,m)=>p.startTime-m.startTime).find(p=>p.startTime>O.currentClip.startTime);d&&O.isPlaying?O.seek(d.startTime):O.setIsPlaying(!1)},[O,N]),mo=o.useCallback(r=>{if(O.currentClip){const d=O.currentClip.trimStart||0,p=d+O.currentClip.duration;if(O.isPlaying&&r>=p-.01){ha();return}const m=O.currentClip.startTime+(r-d);O.isPlaying?O.onVideoTime(m):O.setCurrentTime(m)}else O.isPlaying||O.setCurrentTime(r)},[O,ha]),fo=o.useCallback(async r=>{if(!(!r||!ce.isReady)&&!pa.current.has(r)){pa.current.add(r),kt(!0),Se("Converting video to web-compatible format...");try{let d=null,p=null,m=!1;const S=Le.find($=>$.blobUrl===r);if(S&&S.file)d=S.file,p=S.id,m=!1;else{const $=N.find(H=>H.blobUrl===r);$&&$.file&&(d=$.file,p=$.id,m=!0)}if(!d){z("error","Could not find source file for conversion");return}const b=await ce.convertToWebFormat(d),B=URL.createObjectURL(b);m?me($=>$.map(H=>H.id===p?(H.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(H.blobUrl)),{...H,file:b,blobUrl:B}):H)):(Fe($=>$.map(H=>H.id===p?(H.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(H.blobUrl)),{...H,file:b,blobUrl:B}):H)),me($=>$.map(H=>H.mediaId===p?(H.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(H.blobUrl)),{...H,file:b,blobUrl:B}):H))),z("success","Video converted successfully")}catch(d){z("error",sa(d,"ffmpeg"))}finally{pa.current.delete(r),kt(!1),Se(""),ce.resetProgress()}}},[ce,Le,N,me,z]),qa=o.useRef(null);o.useEffect(()=>{const r=e.state?.filesToImport;r?.length&&qa.current!==r&&(qa.current=r,window.history.replaceState({...e.state,filesToImport:null},""),Tt(r))},[e.state?.filesToImport,Tt]),o.useEffect(()=>{const r=e.state?.projectId,d=e.state?.projectData,p=e.state?.projectName,m=new URLSearchParams(window.location.search).get("project"),S=r||m||null;if(!S||f.current===S||(f.current=S,Ot()&&!i?.id))return;let b=!1;const B=async h=>{const F=h.project_data?.bgMusic;if(!F)return;let Y=null,ae=null;if(F.mediaId)try{const ne=await Ct(S,F.mediaId);ne&&(Y=ne.file,ae=ne.blobUrl)}catch(ne){console.warn("[restoreBgMusic] IndexedDB load failed:",ne)}if(!ae&&F.storagePath&&Ot())try{const ne=await nn(F.storagePath),je=await fetch(ne);if(je.ok){const re=await je.blob();Y=new File([re],F.name||"bgm",{type:re.type}),ae=URL.createObjectURL(re)}}catch(ne){console.warn("[restoreBgMusic] Supabase download failed:",ne)}ae&&wt({file:Y,name:F.name||"Background",blobUrl:ae,volume:F.volume??.3,storagePath:F.storagePath,mediaId:F.mediaId})},$=h=>{if(!h||!h.startsWith("idb://"))return null;const F=h.slice(6),Y=F.lastIndexOf(":");return Y<0?null:{idbProjectId:F.slice(0,Y),idbMediaId:F.slice(Y+1)}},H=h=>h?.startsWith("audio/")?"audio":h?.startsWith("image/")?"image":"video",fe=(h,F,Y=null)=>Promise.race([h,new Promise(ae=>setTimeout(()=>ae(Y),F))]),Re=async(h,F=[])=>{let Y=null,ae=null;const ne=h.mediaId||h.id||null;h.name,h.type,h.idbKey,h.storagePath;const je=$(h.idbKey);if(je)try{je.idbProjectId,je.idbMediaId;const re=await fe(Ct(je.idbProjectId,je.idbMediaId),2e3);re?(Y=re.file,ae=re.blobUrl,h.name,re.file?.size):console.warn("[restore] IndexedDB MISS (null):",h.idbKey)}catch(re){console.warn("[restore] IndexedDB load failed:",h.idbKey,re)}else h.name,h.type;if(!ae&&ne)try{const re=await fe(Ct(S,ne),2e3);re?(Y=re.file,ae=re.blobUrl,h.name):console.warn("[restore] Fallback IndexedDB MISS:",S,ne)}catch(re){console.warn("[restore] IndexedDB fallback load failed:",ne,re)}if(!ae&&ne)try{const re=F.find(Be=>Be.mediaId===ne);if(re){re.key;const Be=await fe(Ct(re.projectId,re.mediaId),2e3);Be&&(Y=Be.file,ae=Be.blobUrl)}}catch(re){console.warn("[restore] IndexedDB scan failed:",re)}if(!ae&&h.storagePath&&Ot()&&!h.storagePath.startsWith("blob:"))try{h.storagePath;const re=await fe(nn(h.storagePath),5e3);if(!re)throw new Error("Supabase URL timed out");const Be=new AbortController,ba=setTimeout(()=>Be.abort(),8e3),Nt=await fetch(re,{signal:Be.signal});if(clearTimeout(ba),Nt.ok){const mt=await Nt.blob();Y=new File([mt],h.name||"media",{type:mt.type}),ae=URL.createObjectURL(mt),h.name}}catch(re){console.warn("[restore] Supabase download failed:",h.storagePath,re)}return!ae&&h.type!=="text"&&console.error("[restore] FAILED to resolve media for:",h.name,h.type,"— all sources exhausted"),{file:Y,blobUrl:ae}},X=/^(draft-|local_)/.test(S),ve=()=>({name:p||"Untitled Project",project_data:{clips:[],mediaItems:[]}});return(async()=>{kt(!0),Se("Restoring media..."),Rt({hypothesisId:"H3",location:"VideoEditor.jsx:restoreProject.start",message:"restore project effect started",data:{projectId:S,stateProjectId:r,urlProjectId:m,hasRestoredFor:f.current}});try{let h=d;if(!h){if(X)h=ve();else if(!Ot())h=await an(S,null);else if(i?.id)try{h=await an(S,i.id)}catch(C){if(C?.code==="PGRST116")console.warn("[restore] Supabase has no row for",S,"— attempting IndexedDB-only recovery"),h=ve();else throw C}}if(h||(console.warn("[restore] No project data found for",S,"— attempting IndexedDB-only recovery"),h=ve()),b)return;window.history.replaceState({...e.state,projectId:null,projectData:null,projectName:null},"");const F=p||h.name||"Untitled Project";c(En(F,{maxLength:100})||"Untitled Project"),s(S),h.resolution&&g(h.resolution);const Y=h.project_data?.timelineMarkers??h.timelineMarkers;Kt(Array.isArray(Y)?Y.filter(C=>C&&typeof C.time=="number"&&Number.isFinite(C.time)&&C.time>=0).map((C,G)=>({id:typeof C.id=="string"&&C.id?C.id:`mk-${G}-${Math.round(C.time*1e3)}`,time:C.time})):[]);const ae=h.project_data?.clips||h.clips||[],ne=h.project_data?.mediaItems||[],je=await fe(Oo(),3e3,[]);if(ae.length,ne.length,ae.map(C=>({name:C.name,type:C.type,mediaId:C.mediaId,idbKey:C.idbKey,storagePath:C.storagePath})),ne.map(C=>({id:C.id,name:C.name,idbKey:C.idbKey})),ae.length===0&&ne.length===0){const C=je.filter(Ee=>Ee.projectId===S),G=[];for(const Ee of C)try{const _e=await fe(Ct(S,Ee.mediaId),3e3);if(!_e)continue;G.push({id:Ee.mediaId,name:Ee.name||"media",file:_e.file,blobUrl:_e.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:H(Ee.mime),isProcessing:!1,idbKey:`idb://${S}:${Ee.mediaId}`,_mediaError:null})}catch(_e){console.warn("[recover] load failed for",Ee.mediaId,_e)}if(b)return;await B(h);let ue=0;if(G.length===0){const Ee=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,_e=je.filter(Oe=>Oe.projectId&&Oe.projectId!==S&&!Ee.test(Oe.projectId)),Ae=new Set;for(const Oe of _e)if(!Ae.has(Oe.mediaId)){Ae.add(Oe.mediaId);try{const ht=await fe(Ct(Oe.projectId,Oe.mediaId),3e3);if(!ht)continue;G.push({id:Oe.mediaId,name:Oe.name||"media",file:ht.file,blobUrl:ht.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:H(Oe.mime),isProcessing:!1,idbKey:`idb://${Oe.projectId}:${Oe.mediaId}`,_mediaError:null}),ue++}catch(ht){console.warn("[recover-orphan] load failed for",Oe.mediaId,ht)}}ue>0&&console.warn(`[recover-orphan] Surfacing ${ue} orphan media file(s) from stale projectIds`)}if(G.length>0){Fe(G);for(const _e of G)_e.type!=="audio"&&(async()=>{try{const Ae=await na(_e.file);Fe(xa=>xa.map(rt=>rt.id===_e.id?{...rt,duration:Ae.duration||rt.duration,width:Ae.width,height:Ae.height}:rt));const Oe=await $t(_e.file,0),ht=URL.createObjectURL(Oe);Fe(xa=>xa.map(rt=>rt.id===_e.id?{...rt,thumbnail:ht}:rt))}catch(Ae){console.warn("[recover] metadata regen failed:",_e.name,Ae)}})();y.current=!0;const Ee=ue>0?`Surfaced ${ue} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`:`Recovered ${G.length} media file(s) from local cache — re-add them to the timeline, then save`;z("warning",Ee);return}y.current=!0,z("info",`Loaded project "${F}" (no clips)`);return}Se("Restoring media...");const re=new Map,Be=new Map;for(const C of ne){const G=C.id||C.mediaId;G&&!Be.has(G)&&Be.set(G,C)}for(const C of ae){const G=C.mediaId||C.id;C.type!=="text"&&G&&!Be.has(G)&&Be.set(G,C)}tt(`Resolving ${Be.size} media files...`);const ba=await Promise.all([...Be.entries()].map(async([C,G])=>{if(b)return null;const ue=await Re(G,je);return{mediaId:C,resolved:ue,meta:G}}));for(const C of ba){if(!C||b)continue;const{mediaId:G,resolved:ue,meta:Ee}=C;ue.blobUrl&&re.set(G,{blobUrl:ue.blobUrl,file:ue.file,meta:Ee})}const Nt=[];for(const C of ae){let G=null,ue=null;const Ee=C.mediaId||C.id;if(Ee&&re.has(Ee)){const Ae=re.get(Ee);G=Ae.blobUrl,ue=Ae.file}const _e=!G&&C.type!=="text";Nt.push({...va,...C,file:ue||null,blobUrl:G||null,thumbnail:null,_mediaError:_e?"Media not found — re-import":null})}const mt=new Map;for(const[C,G]of re){const ue=G.meta||{};mt.set(C,{id:C,name:ue.name||"media",file:G.file,blobUrl:G.blobUrl,thumbnail:null,duration:ue.duration||0,width:ue.width||0,height:ue.height||0,type:ue.type||"video",isProcessing:!1,storagePath:ue.storagePath,_mediaError:null})}const ga=[],Za=new Set;for(const C of ne){const G=C.id||C.mediaId,ue=G?mt.get(G):null;ga.push({id:G,name:C.name||ue?.name||"media",file:ue?.file||null,blobUrl:ue?.blobUrl||null,thumbnail:null,duration:ue?.duration??C.duration??0,width:ue?.width??C.width??0,height:ue?.height??C.height??0,type:C.type||ue?.type||"video",isProcessing:!1,storagePath:C.storagePath||ue?.storagePath,idbKey:C.idbKey,_mediaError:ue?.blobUrl||C.type==="audio"?null:"Media not found — re-import"}),G&&Za.add(G)}for(const[C,G]of mt)Za.has(C)||ga.push(G);const ft=Vr({restoredClips:Nt,mediaItems:ga,projectName:F});Fe(ft.mediaItems),me(ft.clips),Rt({hypothesisId:"H3",location:"VideoEditor.jsx:restoreProject.applyState",message:"restore applied timeline state",data:{projectId:S,restoredClips:Mt(ft.clips),restoredMediaItems:ft.mediaItems.length}}),await B(h);for(const C of ft.mediaItems)!C.file||C.type==="audio"||(async()=>{try{const G=await na(C.file);Fe(_e=>_e.map(Ae=>Ae.id===C.id?{...Ae,duration:G.duration||Ae.duration,width:G.width,height:G.height}:Ae));const ue=await $t(C.file,0),Ee=URL.createObjectURL(ue);Fe(_e=>_e.map(Ae=>Ae.id===C.id?{...Ae,thumbnail:Ee}:Ae))}catch(G){console.warn("[restore] Thumbnail regen failed:",C.name,G)}})();y.current=!0,z(ft.notification.level,ft.notification.message)}catch(h){console.error("Project load error:",h),z("error","Failed to load project")}finally{b||(kt(!1),Se(""),tt(""))}})(),()=>{b=!0}},[i?.id,e.state?.projectId,z,wt,me]),o.useEffect(()=>{ce.preload()},[]),o.useEffect(()=>{const r=d=>{const p=d.ctrlKey||d.metaKey;if(p&&d.shiftKey&&d.key==="E"){d.preventDefault(),fa();return}if(d.key==="Escape"&&V){se(!1);return}const m=document.activeElement;if(!(d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA"||m?.tagName==="INPUT"||m?.tagName==="TEXTAREA"||m?.isContentEditable)){if(d.key==="/"&&V){d.preventDefault(),document.querySelector(".ai-input-box")?.focus();return}if((d.key==="Delete"||d.key==="Backspace")&&Ue){d.preventDefault(),qt(Ue);return}p&&d.key==="s"&&d.preventDefault(),p&&d.key==="e"&&(d.preventDefault(),N.length>0&&Ut("1080p")),p&&d.key==="z"&&(d.preventDefault(),d.shiftKey?ut():jt()),p&&d.key==="y"&&(d.preventDefault(),ut())}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[Ut,jt,ut,N.length,O,V,fa,Ue,qt]);const Ja=o.useRef(Le),Qa=o.useRef(N);return o.useEffect(()=>{Ja.current=Le},[Le]),o.useEffect(()=>{Qa.current=N},[N]),o.useEffect(()=>()=>{Ja.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl),r.thumbnail&&URL.revokeObjectURL(r.thumbnail)}),Qa.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl)})},[]),t.jsxs("div",{style:{...et.root,...k?{height:"100dvh",...U?{paddingBottom:0,paddingRight:"44px"}:{paddingBottom:"56px"}}:{}},role:"application","aria-label":"ClipCut Video Editor",children:[t.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),t.jsx("style",{children:qr}),!k&&t.jsx("a",{href:"#editor-timeline",className:"skip-link",children:"Skip to timeline"}),t.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"},children:vt?`Exporting video... ${$a}%`:St||""}),t.jsx(ar,{projectName:l,onProjectNameChange:c,onExport:Ut,isExporting:vt,exportProgress:$a,currentOperation:St,hasMediaToExport:N.filter(r=>r.type!=="audio"&&r.file).length>0,resolutions:An,exportPresets:la,exportSubMessage:Da,lastSaved:io,canUndo:xt,canRedo:yt,onUndo:jt,onRedo:ut,onCancelExport:uo,onNewProject:so,onSave:lo,onSettings:co,editorLayout:Q,onLayoutChange:ie,forceOpenExport:Qn>0,onExportModalClosed:()=>Zn(0),onAiToggle:fa,aiPanelOpen:V}),!k&&t.jsx(ir,{activeToolbar:x,onToolbarChange:w}),t.jsxs("main",{"aria-label":"Editor workspace",style:{flex:k?1:Q==="wide-timeline"?"0 1 48%":"1 1 0%",display:"flex",flexDirection:k&&U?"row":k?"column":"row",minWidth:0,minHeight:k?0:"200px",overflow:"hidden",zIndex:0},children:[Q!=="compact"&&!k&&t.jsxs(t.Fragment,{children:[t.jsx(bt,{name:"left-panel",inline:!0,message:"Panel encountered an error",children:t.jsx(o.Suspense,{fallback:t.jsx(It,{width:`${Z}px`}),children:t.jsx("div",{style:{width:`${Z}px`,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0e1218"},children:t.jsxs("div",{style:{flex:"1 1 0%",overflow:"hidden auto",minHeight:0},className:"cs",children:[x==="media"&&t.jsx(hn,{mediaTab:K,onMediaTabChange:W,mediaItems:Le,onImportMedia:Tt,onRemoveMedia:Ka,onAddToTimeline:pt,selectedMediaId:ct,onSelectMedia:Vt,isImporting:Na,style:Rn}),x==="text"&&t.jsx(xn,{selectedClip:$e,onClipUpdate:Ne,onAddClip:ot,currentTime:O.currentTime}),x==="audio"&&t.jsx(yn,{selectedClip:$e,onClipUpdate:Ne,bgMusic:Ve,onImportBgMusic:Jt,onImportAudioToTimeline:r=>Tt([r],{placeAudioOnTimeline:!0}),onUpdateBgMusicVolume:Qt,onRemoveBgMusic:Zt}),x==="captions"&&t.jsx(Sn,{clips:N,onAddClip:ot,onSetClips:me,currentTime:O.currentTime,mediaItems:Le,selectedClip:$e,selectedClipId:Ue,onSelectClip:Ze,onClipUpdate:Ne}),x==="stickers"&&t.jsx(wn,{onAddClip:ot,currentTime:O.currentTime}),x==="effects"&&t.jsx(vn,{selectedClip:$e,onClipUpdate:Ne}),x==="transition"&&t.jsx(bn,{rightTab:"video",onRightTabChange:R,rightSubTab:"basic",onRightSubTabChange:q,selectedClip:$e,onClipUpdate:Ne,onAllCaptionsUpdate:Wa,clips:N,bgMusic:Ve,onImportBgMusic:Jt,onUpdateBgMusicVolume:Qt,onRemoveBgMusic:Zt,style:Rn}),x==="filters"&&t.jsx(kn,{selectedClip:$e,onClipUpdate:Ne})]})})})}),t.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>Wt(r,Z),onDoubleClick:()=>Pe(null),children:t.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})})]}),t.jsx("div",{style:k&&U?{flex:"0 0 60%",display:"flex",flexDirection:"column",minWidth:0}:{flex:"1 1 0%",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},children:t.jsx(bt,{name:"player",inline:!0,message:"Video player encountered an error",children:t.jsx(o.Suspense,{fallback:t.jsx(It,{width:"auto",height:"100%"}),children:t.jsx(Xr,{isPlaying:O.isPlaying,onPlayPause:O.togglePlay,videoSrc:ao,currentTime:O.clipOffset,duration:nt,onTimeUpdate:mo,onSeek:po,onEnded:ha,onVideoError:fo,clipProperties:O.currentClip||$e,textOverlays:oo,selectedClipId:Ue,onClipUpdate:Ne,onSelectClip:Ze,transitionPreview:ro,hasTimelineClips:N.some(r=>r.type!=="audio"&&r.type!=="text"),hasUnavailableMediaClips:no,isRestoringMedia:ua&&St.includes("Restoring")})})})}),Q!=="compact"&&!k&&$e&&!V&&t.jsxs("div",{className:"inspector-enter",style:{display:"flex",flexDirection:"row",flexShrink:0,width:`${we+8}px`,overflow:"hidden"},children:[t.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>Jn(r,we),onDoubleClick:()=>E(null),children:t.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})}),t.jsx(bt,{name:"inspector",inline:!0,message:"Inspector panel encountered an error",children:t.jsx(o.Suspense,{fallback:t.jsx(It,{width:`${we}px`}),children:t.jsx(bn,{rightTab:_,onRightTabChange:R,rightSubTab:v,onRightSubTabChange:q,selectedClip:$e,onClipUpdate:Ne,onAllCaptionsUpdate:Wa,clips:N,bgMusic:Ve,onImportBgMusic:Jt,onUpdateBgMusicVolume:Qt,onRemoveBgMusic:Zt,style:{width:`${we}px`}})})})]}),!k&&V&&t.jsx(bt,{name:"ai-chat",inline:!0,message:"AI panel encountered an error",children:t.jsx(o.Suspense,{fallback:t.jsx(It,{width:"360px"}),children:t.jsx(jn,{isOpen:V,onClose:()=>se(!1),messages:A,isThinking:te,thinkingStage:P,slowHint:xe,onSendMessage:Lt,suggestions:Ie,onApplySuggestion:Xa})})}),k&&t.jsxs("div",{style:U?{flex:"0 0 40%",display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden",borderLeft:"1px solid rgba(117,170,219,0.08)"}:{display:"contents"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"44px",padding:"0 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",flexShrink:0},children:[t.jsx("button",{onClick:()=>{const r=document.querySelector(".player-container");r&&(r.requestFullscreen?.()||r.webkitRequestFullscreen?.())},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Fullscreen",children:t.jsx(Me,{i:"fullscreen",s:20,c:"#94a3b8"})}),t.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:"12px",letterSpacing:"0.5px",color:"#e2e8f0",display:"flex",alignItems:"center",gap:"4px"},children:[t.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:mn(O.currentTime)}),t.jsx("span",{style:{color:"#475569"},children:"/"}),t.jsx("span",{style:{color:"#94a3b8"},children:mn(nt)})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2px"},children:[t.jsx("button",{onClick:jt,disabled:!xt,style:{background:"none",border:"none",cursor:xt?"pointer":"not-allowed",opacity:xt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Undo",children:t.jsx(Me,{i:"undo",s:18,c:"#94a3b8"})}),t.jsx("button",{onClick:ut,disabled:!yt,style:{background:"none",border:"none",cursor:yt?"pointer":"not-allowed",opacity:yt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Redo",children:t.jsx(Me,{i:"redo",s:18,c:"#94a3b8"})})]})]}),Ue&&t.jsx("div",{style:{display:"flex",alignItems:"center",gap:"4px",height:"64px",padding:"4px 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",flexShrink:0,transition:"height 0.2s ease, opacity 0.2s ease"},children:[{icon:"volume_off",label:"Mute clip audio",action:()=>Ne(Ue,{volume:$e?.volume===0?1:0})},{icon:"image",label:"Cover",action:()=>{}},{icon:"music_note",label:"+ Add audio",action:()=>{gt("audio"),I(!0)}},{icon:"title",label:"+ Add text",action:()=>{gt("text"),I(!0)}}].map((r,d)=>t.jsxs("button",{onClick:r.action,style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",padding:"6px 8px",cursor:"pointer",minWidth:"64px",flex:"0 0 auto",minHeight:"44px"},children:[t.jsx(Me,{i:r.icon,s:20,c:"#e2e8f0"}),t.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",whiteSpace:"nowrap",fontFamily:"'Spline Sans', sans-serif"},children:r.label})]},d))}),t.jsx(bt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:t.jsx(o.Suspense,{fallback:t.jsx(Pa,{}),children:t.jsx(gn,{id:"editor-timeline",clips:N,selectedClipId:Ue,onSelectClip:Ze,onUpdateClip:Ne,onDeleteClip:qt,onSplitClip:ea,onAddClip:ot,onRippleDelete:Ha,currentTime:O.currentTime,onSeek:O.seek,totalDuration:nt,isProcessing:ua,canUndo:xt,canRedo:yt,onUndo:jt,onRedo:ut,mediaItems:Le,onAddToTimeline:pt,onDropRejected:r=>z("warning",r),timelineHeight:ke,timelineMarkers:da,onTimelineMarkersChange:Kt})})})]})]}),k&&t.jsxs(t.Fragment,{children:[t.jsx(Br,{isOpen:oe,onClose:()=>I(!1),children:t.jsx(bt,{name:"mobile-panel",inline:!0,message:"Panel error",children:t.jsxs(o.Suspense,{fallback:t.jsx(It,{width:"100%",height:"200px"}),children:[Qe==="media"&&t.jsx(hn,{mediaTab:K,onMediaTabChange:W,mediaItems:Le,onImportMedia:Tt,onRemoveMedia:Ka,onAddToTimeline:pt,selectedMediaId:ct,onSelectMedia:Vt,isImporting:Na}),Qe==="text"&&t.jsx(xn,{selectedClip:$e,onClipUpdate:Ne,onAddClip:ot,currentTime:O.currentTime}),Qe==="audio"&&t.jsx(yn,{selectedClip:$e,onClipUpdate:Ne,bgMusic:Ve,onImportBgMusic:Jt,onImportAudioToTimeline:r=>Tt([r],{placeAudioOnTimeline:!0}),onUpdateBgMusicVolume:Qt,onRemoveBgMusic:Zt}),Qe==="captions"&&t.jsx(Sn,{clips:N,onAddClip:ot,onSetClips:me,currentTime:O.currentTime,mediaItems:Le,selectedClip:$e,selectedClipId:Ue,onSelectClip:Ze,onClipUpdate:Ne}),Qe==="stickers"&&t.jsx(wn,{onAddClip:ot,currentTime:O.currentTime}),Qe==="effects"&&t.jsx(vn,{selectedClip:$e,onClipUpdate:Ne}),Qe==="filters"&&t.jsx(kn,{selectedClip:$e,onClipUpdate:Ne}),Qe==="ai"&&t.jsx(jn,{isOpen:!0,onClose:()=>I(!1),messages:A,isThinking:te,thinkingStage:P,slowHint:xe,onSendMessage:Lt,suggestions:Ie,onApplySuggestion:Xa,isMobile:!0})]})})}),t.jsx("nav",{className:"mobile-tab-bar","aria-label":"Editor tools",children:[{id:"media",icon:"perm_media",label:"Media",tip:"Import and browse media"},{id:"text",icon:"title",label:"Text",tip:"Add manual text overlays"},{id:"captions",icon:"closed_caption",label:"Captions",tip:"Auto-generate subtitles from speech"},{id:"audio",icon:"music_note",label:"Audio",tip:"Background music and clip audio"},{id:"stickers",icon:"emoji_emotions",label:"Stickers",tip:"Drop emoji stickers on the preview"},{id:"effects",icon:"auto_fix_high",label:"Effects",tip:"Apply video effects"},{id:"filters",icon:"filter_vintage",label:"Filters",tip:"Apply colour filters"},{id:"ai",icon:"auto_awesome",label:"AI",tip:"AI editing assistant"}].map(r=>t.jsxs("button",{className:Qe===r.id&&oe?"active":"",title:r.tip,"aria-label":r.tip,onClick:()=>{Qe===r.id?I(d=>!d):(gt(r.id),I(!0))},children:[t.jsx("span",{className:"material-symbols-outlined",style:{fontSize:22,color:Qe===r.id&&oe?"#75AADB":void 0},children:r.icon}),t.jsx("span",{children:r.label})]},r.id))})]}),!k&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"resize-handle resize-handle-h",onMouseDown:r=>at(r,ke||Jr),onDoubleClick:()=>be(null),children:t.jsx("div",{className:"resize-handle-dot"})}),t.jsx(bt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:t.jsx(o.Suspense,{fallback:t.jsx(Pa,{}),children:t.jsx(gn,{id:"editor-timeline",clips:N,selectedClipId:Ue,onSelectClip:Ze,onUpdateClip:Ne,onDeleteClip:qt,onSplitClip:ea,onAddClip:ot,onRippleDelete:Ha,currentTime:O.currentTime,onSeek:O.seek,totalDuration:nt,isProcessing:ua,canUndo:xt,canRedo:yt,onUndo:jt,onRedo:ut,mediaItems:Le,onAddToTimeline:pt,onDropRejected:r=>z("warning",r),timelineHeight:ke,timelineMarkers:da,onTimelineMarkersChange:Kt})})})]}),ce.isLoading&&!ce.currentOperation&&!St&&t.jsx(Gn,{progress:ce.loadProgress}),(St||ce.currentOperation)&&t.jsx(Xn,{message:St||"Processing...",progress:ce.currentOperation!=null?ce.progress:ce.loadProgress,operationLabel:ce.currentOperation?`${ce.currentOperation}...`:"",subMessage:Da,onCancel:ce.currentOperation?ce.cancelOperation:void 0}),eo&&t.jsx(Yn,{onComplete:()=>{to(!1),localStorage.setItem("clipcut_onboarded","1")}}),Yt&&t.jsx(qn,{type:Yt.type,message:Yt.message,onClose:()=>za(null),autoClose:Yt.type!=="error"})]})},si=o.memo(ii),Ui=Object.freeze(Object.defineProperty({__proto__:null,default:si},Symbol.toStringTag,{value:"Module"}));export{gi as A,va as D,bi as E,Yo as F,Me as I,Ti as M,Ho as S,ki as T,Ui as V,yi as a,xi as b,Si as c,Ai as d,Ei as e,_i as f,Li as g,mn as h,Ci as i,pn as j,Pi as k,vi as l,wi as m,ji as n,et as s,Mi as t,Ri as x,Ii as z};
