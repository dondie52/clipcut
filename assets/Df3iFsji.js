const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/C4vhJDm_.js","assets/DwQPoapS.js","assets/Bs4D8IiQ.js","assets/Da6YYexO.js","assets/C_8A2FPv.js","assets/Et-wlZO3.js","assets/jLZtnoKW.js","assets/CxS0XiCM.js","assets/DH88DMT5.js","assets/B9CjrYEi.js","assets/CrFPy8FH.js","assets/EXdvKlqf.js","assets/DiLyAH0f.js","assets/C9ozxp-h.js","assets/DlltwpMJ.js","assets/OBU4bDB4.js","assets/ChdW871-.js","assets/ZsbvufQv.js","assets/D239LqC0.js","assets/rKqKw3aW.js","assets/64Nc4_i0.js","assets/BqtdS_sL.js","assets/IpWn67So.js","assets/BEUlQjCE.js","assets/Dh0lx4MY.js","assets/69h2CKib.js","assets/CuBsPPMA.js","assets/DHOgBFtu.js"])))=>i.map(i=>d[i]);
import{g as ta,a as Pt,u as Jo,D as Qo,_ as Fe,e as At,E as mt,A as Zo,T as za,f as Wa,r as en}from"./Da6YYexO.js";import{r as a,j as e,a as tn,u as an}from"./DwQPoapS.js";import{f as bo}from"./Et-wlZO3.js";import{u as ja,a as on}from"./jLZtnoKW.js";import{l as Xe,w as Be,e as qe,r as He,t as Ye,c as Je,s as Qe,a as Ge,i as fa,b as nn,d as rn,f as sn,g as ln,m as cn,h as dn,E as aa,j as un,k as pn,n as mn,o as fn,p as hn,q as bn,u as gn,R as go,v as xn,x as yn,y as wn}from"./CxS0XiCM.js";import{c as Lt,b as Va,e as vn,f as St,s as Gt,r as kn,g as xo,h as Ka}from"./DH88DMT5.js";import{v as Sn}from"./Bs4D8IiQ.js";import{getWorkerUrl as jn}from"./CrFPy8FH.js";const je=a.memo(({i:t,s:o=18,c:i="currentColor",style:n={},filled:s=!1,weight:l=400,...c})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:`${o}px`,color:i,fontVariationSettings:`'FILL' ${s?1:0}, 'wght' ${l}`,transition:"color 0.15s ease",userSelect:"none",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center",...n},"aria-hidden":"true",...c,children:t}));je.displayName="Icon";const Tn=`
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
`,ea=a.memo(({i:t,onClick:o,style:i={},title:n,disabled:s=!1,size:l=18,color:c="#64748b",hoverColor:m="#94a3b8",...b})=>{const[p,g]=a.useState(!1),x=a.useCallback(T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),o?.())},[o]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Tn}),e.jsx("button",{className:"ghost-btn",style:{background:"none",border:"none",cursor:s?"not-allowed":"pointer",padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",opacity:s?.5:1,...i},onClick:s?void 0:o,onKeyDown:x,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),disabled:s,title:n,"aria-label":b["aria-label"]||n,...b,children:e.jsx(je,{i:t,s:l,c:p&&!s?m:c})})]})});ea.displayName="GhostBtn";const et={root:{width:"100%",maxWidth:"100vw",minWidth:0,minHeight:0,height:"100vh",display:"flex",flexDirection:"column",background:"var(--color-bg-dark, #08090c)",color:"var(--color-text-primary, #f1f5f9)",overflow:"hidden",fontFamily:"'Spline Sans', sans-serif"},ghost:{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all var(--transition-normal, 0.15s ease)"},topBar:{height:"42px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",flexShrink:0,position:"relative",zIndex:3e3},titleInput:{position:"absolute",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid transparent",outline:"none",textAlign:"center",fontSize:"12px",fontWeight:500,color:"#cbd5e1",width:"220px",padding:"5px 14px",borderRadius:"4px",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease"},exportBtn:{marginLeft:"6px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"#0a0a0a",padding:"7px 22px",borderRadius:"6px",fontSize:"11px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.25)",letterSpacing:"0.3px",textTransform:"uppercase"},toolbar:{height:"46px",background:"#0e1218",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",padding:"0 8px",gap:0,flexShrink:0},leftPanel:{width:"280px",minWidth:0,maxWidth:"100%",borderRight:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},importBtn:{width:"100%",background:"rgba(117, 170, 219, 0.03)",border:"1.5px dashed rgba(117, 170, 219, 0.15)",borderRadius:"8px",padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",cursor:"pointer",position:"relative",fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all 0.15s ease"},rightPanel:{width:"320px",minWidth:0,maxWidth:"100%",borderLeft:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},controls:{height:"52px",background:"linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",borderTop:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"relative"},timeline:{flex:"0 0 auto",height:"280px",background:"#08090c",borderTop:"2px solid rgba(117, 170, 219, 0.1)",display:"flex",flexDirection:"column",minHeight:"120px",overflow:"hidden",position:"relative",zIndex:10},tlToolbar:{height:"38px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}},Cn=`
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
`,rt=[{id:"media",icon:"folder_open",label:"Media"},{id:"audio",icon:"music_note",label:"Audio"},{id:"text",icon:"text_fields",label:"Text"},{id:"captions",icon:"closed_caption",label:"Captions"},{id:"stickers",icon:"mood",label:"Stickers"},{id:"effects",icon:"auto_fix_high",label:"Effects"},{id:"transition",icon:"layers",label:"Transition"},{id:"filters",icon:"filter_list",label:"Filters"}],In={PLAY_PAUSE:{key:"Space",description:"Play/Pause"},SKIP_FORWARD:{key:"ArrowRight",description:"Skip forward 5s"},SKIP_BACKWARD:{key:"ArrowLeft",description:"Skip backward 5s"},SKIP_FORWARD_LARGE:{key:"Shift+ArrowRight",description:"Skip forward 10s"},SKIP_BACKWARD_LARGE:{key:"Shift+ArrowLeft",description:"Skip backward 10s"},FRAME_FORWARD:{key:".",description:"Next frame"},FRAME_BACKWARD:{key:",",description:"Previous frame"},GO_TO_START:{key:"Home",description:"Go to start"},GO_TO_END:{key:"End",description:"Go to end"},SPLIT:{key:"S",description:"Split at playhead"},DELETE:{key:"Delete",description:"Delete selected"},DESELECT:{key:"Escape",description:"Deselect"},MUTE:{key:"M",description:"Mute/Unmute"},VOLUME_UP:{key:"ArrowUp",description:"Volume up"},VOLUME_DOWN:{key:"ArrowDown",description:"Volume down"},FULLSCREEN:{key:"F",description:"Toggle fullscreen"},SAVE:{key:"Ctrl+S",description:"Save project"},EXPORT:{key:"Ctrl+E",description:"Export video"},IMPORT:{key:"Ctrl+I",description:"Import media"},TOOLBAR_1:{key:"1",description:"Media panel"},TOOLBAR_2:{key:"2",description:"Audio panel"},TOOLBAR_3:{key:"3",description:"Text panel"},TOOLBAR_4:{key:"4",description:"Stickers panel"},TOOLBAR_5:{key:"5",description:"Effects panel"},TOOLBAR_6:{key:"6",description:"Transitions panel"},TOOLBAR_7:{key:"7",description:"Filters panel"}},Rn=`
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
`,ha={volume:1,isMuted:!1,speed:1,rotation:0,opacity:1,positionX:0,positionY:0,scale:1,brightness:0,contrast:0,saturation:1,temperature:0,filterName:null,filterStrength:50,effects:[],fadeIn:0,fadeOut:0,track:0,trimStart:0,trimEnd:0,colorGrading:{shadows:"#1a1a2e",midtones:"#4a4a5e",highlights:"#ffffff"},transition:null,transitionDuration:1,text:"",textColor:"#ffffff",textSize:48,textPosition:"bottom-center",textBgColor:"",textBold:!1,textItalic:!1,textUnderline:!1,textAlign:"center",textFontFamily:"Spline Sans",textStartTime:0,textDuration:0,textX:null,textY:null},Mn=[{name:"None",filter:null,css:null},{name:"90s",filter:"colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8",css:"sepia(0.3) saturate(0.8)"},{name:"Vintage",filter:"eq=saturation=0.6:brightness=0.05",css:"sepia(0.4) saturate(0.6) brightness(1.05)"},{name:"Cinema",filter:"eq=contrast=1.2:brightness=-0.05:saturation=1.1",css:"contrast(1.2) brightness(0.95) saturate(1.1)"},{name:"B&W",filter:"eq=saturation=0",css:"grayscale(1)"},{name:"Warm",filter:"colortemperature=6500",css:"sepia(0.15) saturate(1.2)"},{name:"Cool",filter:"colortemperature=3500",css:"saturate(0.9) hue-rotate(10deg)"},{name:"Sepia",filter:"colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",css:"sepia(0.8)"}],Gr=[{name:"Motion Blur",type:"blur",params:{radius:5},css:"blur(2px)",icon:"blur_on"},{name:"Sharpen",type:"sharpen",params:{strength:1},css:"contrast(1.1)",icon:"deblur"},{name:"Vignette",type:"vignette",params:{},css:null,icon:"vignette"},{name:"Gaussian Blur",type:"blur",params:{radius:10},css:"blur(4px)",icon:"lens_blur"},{name:"Glitch",type:"glitch",params:{intensity:3},css:null,icon:"broken_image"},{name:"Zoom",type:"zoom",params:{factor:1.5},css:null,icon:"zoom_in"},{name:"Shake",type:"shake",params:{intensity:5},css:null,icon:"vibration"},{name:"Flash",type:"flash",params:{duration:.5},css:null,icon:"flash_on"}],qr=[{name:"Fade In",key:"fadeIn",value:1},{name:"Fade Out",key:"fadeOut",value:1},{name:"Scale Up",key:"scaleUp",value:!0},{name:"Slide Left",key:"slideLeft",value:!0}],Jr=[{value:null,label:"None",icon:"block"},{value:"fade",label:"Fade",icon:"gradient"},{value:"fadeblack",label:"Fade Black",icon:"brightness_1"},{value:"fadewhite",label:"Fade White",icon:"brightness_7"},{value:"dissolve",label:"Dissolve",icon:"blur_on"},{value:"wipeleft",label:"Wipe Left",icon:"arrow_back"},{value:"wiperight",label:"Wipe Right",icon:"arrow_forward"},{value:"slideup",label:"Slide Up",icon:"arrow_upward"},{value:"slidedown",label:"Slide Down",icon:"arrow_downward"}],Qr=[{value:"top-left",label:"Top Left",icon:"north_west"},{value:"top-center",label:"Top",icon:"north"},{value:"top-right",label:"Top Right",icon:"north_east"},{value:"center-left",label:"Left",icon:"west"},{value:"center",label:"Center",icon:"center_focus_strong"},{value:"center-right",label:"Right",icon:"east"},{value:"bottom-left",label:"Bottom Left",icon:"south_west"},{value:"bottom-center",label:"Bottom",icon:"south"},{value:"bottom-right",label:"Bottom Right",icon:"south_east"}],Zr=[{emoji:"😀",label:"Grinning",category:"smileys"},{emoji:"😂",label:"Laughing",category:"smileys"},{emoji:"🥹",label:"Touched",category:"smileys"},{emoji:"😍",label:"Heart Eyes",category:"smileys"},{emoji:"🤩",label:"Star Struck",category:"smileys"},{emoji:"😎",label:"Cool",category:"smileys"},{emoji:"🥳",label:"Party",category:"smileys"},{emoji:"😱",label:"Shocked",category:"smileys"},{emoji:"🤔",label:"Thinking",category:"smileys"},{emoji:"😴",label:"Sleeping",category:"smileys"},{emoji:"👍",label:"Thumbs Up",category:"hands"},{emoji:"👎",label:"Thumbs Down",category:"hands"},{emoji:"👏",label:"Clap",category:"hands"},{emoji:"🙌",label:"Raised Hands",category:"hands"},{emoji:"🤝",label:"Handshake",category:"hands"},{emoji:"✌️",label:"Peace",category:"hands"},{emoji:"🤞",label:"Fingers Crossed",category:"hands"},{emoji:"💪",label:"Strong",category:"hands"},{emoji:"❤️",label:"Heart",category:"symbols"},{emoji:"🔥",label:"Fire",category:"symbols"},{emoji:"⭐",label:"Star",category:"symbols"},{emoji:"💯",label:"100",category:"symbols"},{emoji:"✨",label:"Sparkles",category:"symbols"},{emoji:"💥",label:"Boom",category:"symbols"},{emoji:"🎯",label:"Target",category:"symbols"},{emoji:"⚡",label:"Lightning",category:"symbols"},{emoji:"🚀",label:"Rocket",category:"symbols"},{emoji:"💎",label:"Diamond",category:"symbols"},{emoji:"🎬",label:"Clapper",category:"objects"},{emoji:"🎵",label:"Music",category:"objects"},{emoji:"🎤",label:"Mic",category:"objects"},{emoji:"📸",label:"Camera",category:"objects"},{emoji:"🎮",label:"Gaming",category:"objects"},{emoji:"🏆",label:"Trophy",category:"objects"},{emoji:"🎁",label:"Gift",category:"objects"},{emoji:"💡",label:"Idea",category:"objects"},{emoji:"👆",label:"Point Up",category:"arrows"},{emoji:"👇",label:"Point Down",category:"arrows"},{emoji:"👈",label:"Point Left",category:"arrows"},{emoji:"👉",label:"Point Right",category:"arrows"},{emoji:"⬆️",label:"Arrow Up",category:"arrows"},{emoji:"⬇️",label:"Arrow Down",category:"arrows"},{emoji:"🔔",label:"Bell",category:"objects"},{emoji:"💬",label:"Speech",category:"objects"},{emoji:"🏷️",label:"Tag",category:"objects"},{emoji:"📌",label:"Pin",category:"objects"}],ei=[{name:"Title",textSize:64,textColor:"#ffffff",textPosition:"center",textBgColor:"",textBold:!0,textAlign:"center",icon:"title"},{name:"Subtitle",textSize:36,textColor:"#e2e8f0",textPosition:"bottom-center",textBgColor:"",textBold:!1,textAlign:"center",icon:"subtitles"},{name:"Caption",textSize:24,textColor:"#ffffff",textPosition:"bottom-center",textBgColor:"#000000",textBold:!1,textAlign:"center",icon:"closed_caption"},{name:"Lower Third",textSize:28,textColor:"#ffffff",textPosition:"bottom-left",textBgColor:"rgba(0,0,0,0.7)",textBold:!0,textAlign:"left",icon:"video_label"}],ti=["Spline Sans","Arial","Georgia","Courier New","Impact","Comic Sans MS","Trebuchet MS","Verdana","Times New Roman"],ai=[{label:"0.25x",value:.25},{label:"0.5x",value:.5},{label:"1x",value:1},{label:"1.5x",value:1.5},{label:"2x",value:2}];function En(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}function _n(){if(typeof navigator>"u")return!1;const t=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(t)?!0:navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1}const Ta=`
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
`,Ha=[{key:"low",label:"Low",crf:28},{key:"medium",label:"Medium",crf:23},{key:"high",label:"High",crf:18},{key:"ultra",label:"Ultra",crf:15}],Pn=[{key:"webm",label:"WebM"},{key:"mp4",label:"MP4 (via server)"}],An=[24,30,60],Un=a.memo(({items:t,selected:o,onSelect:i,style:n})=>e.jsx("div",{style:{display:"flex",gap:"4px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"3px",...n},children:t.map(s=>e.jsx("button",{onClick:()=>i(s.key||s),style:{flex:1,padding:"6px 8px",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",background:(s.key||s)===o?"rgba(117,170,219,0.15)":"transparent",color:(s.key||s)===o?"#75aadb":"#64748b"},children:s.label||s},s.key||s))}));Un.displayName="PillGroup";const yo=a.memo(({isOpen:t,onClose:o,onExport:i,isExporting:n,progress:s,operationLabel:l="Processing",subMessage:c="",resolutions:m,exportPresets:b={},onCancel:p,projectName:g="Untitled",exportResult:x,onDownload:T,onExportAnother:W})=>{const[_,y]=a.useState("1080p"),[z,G]=a.useState("resolution"),[se,Z]=a.useState("youtube-1080p"),[J,v]=a.useState("webm"),[Y,le]=a.useState("high"),[$,B]=a.useState(30),[fe,V]=a.useState("");a.useEffect(()=>{t&&!fe&&V(En(g))},[t,g]);const ce=_n();if(a.useEffect(()=>{if(!t)return;const C=me=>{me.key==="Escape"&&!n&&o()};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[t,n,o]),a.useEffect(()=>{if(!t)return;const me=document.getElementById("export-modal")?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');me?.length&&me[0].focus()},[t]),!t)return null;const E=C=>{C.target===C.currentTarget&&!n&&!x&&o()};m?.[_];const X=Ha.find(C=>C.key===Y),Me=[J.toUpperCase(),_,`${$}fps`],ge=z==="platform"?b[se]?.label:Me.join(" · "),Re=()=>{const C=z==="platform"?`preset:${se}`:_;i(C,{format:J,quality:X?.crf,fps:$,filename:fe||g})},Q=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hud-body",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Container · Codec"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Output format",children:Pn.map(C=>e.jsx("button",{className:J===C.key?"is-active":"",onClick:()=>v(C.key),role:"radio","aria-checked":J===C.key,children:C.label},C.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Target"}),e.jsxs("div",{className:"hud-segment",role:"radiogroup","aria-label":"Target mode",children:[e.jsx("button",{className:z==="resolution"?"is-active":"",onClick:()=>G("resolution"),role:"radio","aria-checked":z==="resolution",children:"By Resolution"}),e.jsx("button",{className:z==="platform"?"is-active":"",onClick:()=>G("platform"),role:"radio","aria-checked":z==="platform",children:"By Platform"})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Signal"}),z==="resolution"?e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Resolution",children:Object.entries(m).map(([C,{label:me,width:ae,height:O}])=>{const de=_===C;return e.jsxs("button",{className:`hud-row-item ${de?"is-active":""}`,onClick:()=>y(C),role:"radio","aria-checked":de,children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsx("span",{className:"hud-row-name",children:me}),e.jsxs("span",{className:"hud-row-spec",children:[ae,"×",O]}),e.jsxs("span",{className:"hud-row-spec",style:{color:de?"#75AADB":"rgba(255,255,255,0.34)"},children:[Math.round(ae*O/1e4)/100,"MP"]})]},C)})}):e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Platform",children:Object.entries(b).map(([C,me])=>{const ae=se===C;return e.jsxs("button",{className:`hud-row-item ${ae?"is-active":""}`,onClick:()=>Z(C),role:"radio","aria-checked":ae,style:{gridTemplateColumns:"18px 1fr auto"},children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsxs("span",{className:"hud-row-name",children:[me.label,e.jsx("span",{className:"hud-row-sub",style:{gridColumn:"unset",display:"block",marginTop:3},children:me.description})]}),e.jsxs("span",{className:"hud-row-spec",children:[me.width,"×",me.height]})]},C)})})]}),e.jsxs("div",{className:"hud-row-split",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Quality (CRF)"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Quality",children:Ha.map(C=>e.jsx("button",{className:Y===C.key?"is-active":"",onClick:()=>le(C.key),role:"radio","aria-checked":Y===C.key,title:`CRF ${C.crf}`,children:C.label},C.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Frame Rate"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Frame rate",children:An.map(C=>e.jsxs("button",{className:$===C?"is-active":"",onClick:()=>B(C),role:"radio","aria-checked":$===C,children:[C,"fps"]},C))})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Filename"}),e.jsx("input",{type:"text",className:"hud-input",value:fe,onChange:C=>V(C.target.value),"aria-label":"Export filename",placeholder:"clipcut-export"})]}),e.jsxs("div",{className:"hud-summary",role:"status",children:[e.jsx("span",{className:"hud-summary-dot","aria-hidden":"true"}),e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsxs("div",{className:"hud-summary-text",children:["Ready · ",ge]}),J==="webm"&&!ce&&e.jsx("div",{className:"hud-summary-note",children:"WebM plays on most devices. For iPhone Photos compatibility, choose MP4."}),J==="webm"&&ce&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead."}),J==="mp4"&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"MP4 export routes through our encoding server, which is offline right now — falling back to WebM. Switch back once the server is available."})]})]})]}),e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Cancel"}),e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:Re,children:[e.jsx(je,{i:"download",s:14,c:"#04060b"}),"Render · Export"]})]})]}),Ue=()=>{const C=Math.max(0,Math.min(100,Math.round(s)));return e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-progress",children:[e.jsxs("div",{className:"hud-big-readout","aria-live":"polite","aria-atomic":"true",children:[String(C).padStart(2,"0"),e.jsx("span",{className:"pct",children:"%"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hud-op-label",children:l||"Rendering"}),c&&e.jsx("div",{className:"hud-op-sub",children:c})]}),e.jsxs("div",{className:"hud-filmstrip",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":C,children:[e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--top","aria-hidden":"true",children:Array.from({length:24}).map((me,ae)=>e.jsx("span",{style:{animationDelay:`${(ae*.05).toFixed(2)}s`}},ae))}),e.jsx("div",{className:"hud-filmstrip-fill",style:{width:`${C}%`}}),e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--bottom","aria-hidden":"true",children:Array.from({length:24}).map((me,ae)=>e.jsx("span",{style:{animationDelay:`${(ae*.05+.1).toFixed(2)}s`}},ae))})]}),e.jsxs("div",{className:"hud-telemetry","aria-label":"Telemetry",children:[e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Format"}),e.jsx("span",{className:"hud-telemetry-value",children:J.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Signal"}),e.jsx("span",{className:"hud-telemetry-value",children:z==="platform"?b[se]?.label||"—":_.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Frame Rate"}),e.jsxs("span",{className:"hud-telemetry-value",children:[$,"fps"]})]})]})]})})},Ne=()=>p?e.jsx("div",{className:"hud-actions",style:{justifyContent:"center"},children:e.jsx("button",{type:"button",className:"hud-btn hud-btn--danger",onClick:p,children:"Abort render"})}):null,ye=()=>e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-complete",children:[e.jsxs("div",{className:"hud-complete-stamp",children:[e.jsx("span",{className:"led","aria-hidden":"true"}),"Export complete · Signal locked"]}),e.jsx("h3",{className:"hud-complete-title",children:"Your file is ready."}),x?.size&&e.jsxs("span",{className:"hud-complete-file",children:[(x.size/(1024*1024)).toFixed(1)," MB · ",J.toUpperCase()]})]})}),q=()=>e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Close"}),W&&e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:W,children:"Export another"}),T&&e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:T,children:[e.jsx(je,{i:"download",s:14,c:"#04060b"}),"Download"]})]}),Se=x?"hud-head-led hud-head-led--green":n?"hud-head-led hud-head-led--amber":"hud-head-led",pe=x?"Complete":n?"Rendering":"Standby";return e.jsxs("div",{className:"hud-backdrop",onClick:E,role:"dialog","aria-modal":"true","aria-labelledby":"export-modal-title",children:[e.jsx("style",{children:Ta}),e.jsxs("div",{id:"export-modal",className:"hud-console",children:[e.jsxs("div",{className:"hud-head",children:[e.jsxs("div",{className:"hud-head-left",children:[e.jsx("span",{className:Se,"aria-hidden":"true"}),e.jsxs("h2",{id:"export-modal-title",className:"hud-head-title",children:[e.jsx("span",{children:"CC · EXPORT"}),e.jsx("span",{className:"sep",children:"//"}),e.jsx("span",{className:"ch-id",children:pe.toUpperCase()})]})]}),!n&&!x&&e.jsx("button",{onClick:o,className:"hud-head-close","aria-label":"Close export dialog",title:"Close (Escape)",children:e.jsx(je,{i:"close",s:16,c:"currentColor"})})]}),x?ye():n?Ue():Q(),!n&&!x&&null,n&&Ne(),x&&q()]})]})});yo.displayName="ExportModal";const Ln={Playback:["PLAY_PAUSE","SKIP_FORWARD","SKIP_BACKWARD","SKIP_FORWARD_LARGE","SKIP_BACKWARD_LARGE","FRAME_FORWARD","FRAME_BACKWARD","GO_TO_START","GO_TO_END"],Editing:["SPLIT","DELETE","DESELECT"],Audio:["MUTE","VOLUME_UP","VOLUME_DOWN"],View:["FULLSCREEN"],File:["SAVE","EXPORT","IMPORT"]},wo=a.memo(({isOpen:t,onClose:o})=>(a.useEffect(()=>{if(!t)return;const i=n=>{n.key==="Escape"&&o()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[t,o]),t?e.jsxs("div",{className:"shortcuts-modal-backdrop",onClick:i=>i.target===i.currentTarget&&o(),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3500,backdropFilter:"blur(4px)"},role:"dialog","aria-modal":"true","aria-labelledby":"shortcuts-modal-title",children:[e.jsx("style",{children:Ta}),e.jsxs("div",{className:"shortcuts-modal-content",style:{background:"#1a2332",borderRadius:"12px",padding:"24px",width:"520px",maxWidth:"90vw",maxHeight:"80vh",overflow:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[e.jsxs("h2",{id:"shortcuts-modal-title",style:{margin:0,fontSize:"18px",fontWeight:600,color:"white",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(je,{i:"keyboard",s:22,c:"#75aadb"}),"Keyboard Shortcuts"]}),e.jsx("button",{onClick:o,style:{...et.ghost,padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":"Close shortcuts dialog",children:e.jsx(je,{i:"close",s:20,c:"#94a3b8"})})]}),Object.entries(Ln).map(([i,n])=>e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{fontSize:"11px",color:"#75aadb",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,margin:"0 0 10px 0"},children:i}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:n.map(s=>{const l=In[s];return l?e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:"6px",background:"rgba(255,255,255,0.02)"},children:[e.jsx("span",{style:{fontSize:"13px",color:"#cbd5e1"},children:l.description}),e.jsx("span",{className:"shortcut-key",children:l.key})]},s):null})})]},i))]})]}):null));wo.displayName="KeyboardShortcutsModal";const Nn=[{id:"new",icon:"add",label:"New Project",shortcut:null},{id:"save",icon:"save",label:"Save",shortcut:"Ctrl+S"},{id:"divider1"},{id:"export",icon:"download",label:"Export",shortcut:"Ctrl+E"},{id:"divider2"},{id:"settings",icon:"settings",label:"Settings",shortcut:null}],vo=a.memo(({isOpen:t,onClose:o,onNewProject:i,onSave:n,onExport:s,onSettings:l,hasMediaToExport:c})=>{const m=a.useRef(null);if(a.useEffect(()=>{if(!t)return;const p=x=>{m.current&&!m.current.contains(x.target)&&o()},g=x=>{x.key==="Escape"&&o()};return requestAnimationFrame(()=>{document.addEventListener("mousedown",p),document.addEventListener("keydown",g)}),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",g)}},[t,o]),!t)return null;const b=p=>{switch(o(),p){case"new":i?.();break;case"save":n?.();break;case"export":c&&s?.();break;case"settings":l?.();break}};return e.jsx("div",{ref:m,className:"menu-dropdown",role:"menu",style:{position:"absolute",top:"100%",left:0,marginTop:"4px",background:"#1a2332",borderRadius:"8px",padding:"4px",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",minWidth:"200px",zIndex:100},children:Nn.map(p=>{if(p.id.startsWith("divider"))return e.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0"}},p.id);const g=p.id==="export"&&!c;return e.jsxs("button",{className:"menu-dropdown-item",role:"menuitem",onClick:()=>!g&&b(p.id),style:{...et.ghost,display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"6px",width:"100%",textAlign:"left",color:g?"#475569":"#cbd5e1",cursor:g?"not-allowed":"pointer",opacity:g?.5:1,fontSize:"13px",fontFamily:"'Spline Sans', sans-serif"},disabled:g,children:[e.jsx(je,{i:p.icon,s:16,c:g?"#475569":"#94a3b8"}),e.jsx("span",{style:{flex:1},children:p.label}),p.shortcut&&e.jsx("span",{style:{fontSize:"11px",color:"#475569",fontFamily:"'SF Mono', Monaco, monospace"},children:p.shortcut})]},p.id)})})});vo.displayName="MenuDropdown";const On=({projectName:t,onProjectNameChange:o,onExport:i,isExporting:n=!1,exportProgress:s=0,currentOperation:l="",hasMediaToExport:c=!1,resolutions:m={},exportPresets:b={},lastSaved:p=null,canUndo:g=!1,canRedo:x=!1,onUndo:T,onRedo:W,onCancelExport:_,exportSubMessage:y="",onNewProject:z,onSave:G,onSettings:se,editorLayout:Z="default",onLayoutChange:J,forceOpenExport:v=!1,onExportModalClosed:Y,onAiToggle:le,aiPanelOpen:$=!1})=>{const B=ja(),[fe,V]=a.useState(!1),[ce,E]=a.useState(!1),[X,Me]=a.useState(!1),[ge,Re]=a.useState(!1),Q=a.useRef(null);a.useEffect(()=>{const O=de=>{de.target.tagName==="INPUT"||de.target.tagName==="TEXTAREA"||(de.key==="?"||de.shiftKey&&de.key==="/")&&(de.preventDefault(),Re(w=>!w))};return window.addEventListener("keydown",O),()=>window.removeEventListener("keydown",O)},[]),a.useEffect(()=>{v&&c&&!n&&(V(!0),Y?.())},[v,c,n,Y]);const Ue=a.useCallback(()=>{n||(c?V(!0):console.warn("Export not available:",{hasMediaToExport:c,isExporting:n}))},[c,n]),Ne=a.useCallback((O,de)=>{i?.(O,de)},[i]),ye=a.useCallback(()=>{n||(V(!1),C(null))},[n]),q=a.useCallback(O=>{const de=bo(O.target.value,{maxLength:100});o(de)},[o]),Se=a.useCallback(O=>{(O.key==="Enter"||O.key==="Escape")&&O.target.blur()},[]),[pe,C]=a.useState(null);a.useEffect(()=>{!n&&s>=100&&fe&&!pe&&C({size:null}),fe||C(null)},[n,s,fe,pe]);const[me,ae]=a.useState("");return a.useEffect(()=>{const O=()=>{ae(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}))};O();const de=setInterval(O,6e4);return()=>clearInterval(de)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ta}),e.jsxs("header",{style:{...et.topBar,...B?{height:"44px",padding:"0 10px"}:{}},role:"banner","aria-label":"ClipCut editor header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsxs("div",{className:"logo-container",style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},role:"img","aria-label":"ClipCut logo",children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(117, 170, 219, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(je,{i:"movie_edit",s:18,c:"#75aadb"})}),!B&&e.jsx("span",{style:{fontWeight:700,fontSize:"15px",letterSpacing:"-0.3px",color:"white"},children:"ClipCut"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginLeft:"8px",fontSize:"11px"},children:[e.jsxs("div",{ref:Q,style:{position:"relative"},children:[e.jsx("button",{className:"menu-btn",onClick:()=>Me(O=>!O),style:{...et.ghost,display:"flex",alignItems:"center",gap:"2px",color:X?"#75aadb":"#94a3b8"},"aria-haspopup":"menu","aria-expanded":X,"aria-label":"Open menu",children:B?e.jsx(je,{i:"menu",s:18}):e.jsxs(e.Fragment,{children:["Menu ",e.jsx(je,{i:"arrow_drop_down",s:16})]})}),e.jsx(vo,{isOpen:X,onClose:()=>Me(!1),onNewProject:z,onSave:G,onExport:Ue,onSettings:se,hasMediaToExport:c})]}),!B&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("button",{onClick:T,disabled:!g,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:g?1:.4,cursor:g?"pointer":"not-allowed"},title:"Undo (Ctrl+Z)","aria-label":"Undo",children:e.jsx(je,{i:"undo",s:14,c:g?"#94a3b8":"#475569"})}),e.jsx("button",{onClick:W,disabled:!x,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:x?1:.4,cursor:x?"pointer":"not-allowed"},title:"Redo (Ctrl+Shift+Z or Ctrl+Y)","aria-label":"Redo",children:e.jsx(je,{i:"redo",s:14,c:x?"#94a3b8":"#475569"})})]}),!B&&p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Last saved at ${p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}`,title:`Last saved: ${p.toLocaleString()}`,children:[e.jsx(je,{i:"cloud_done",s:12,c:"#475569"}),"Saved ",p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]}),!B&&!p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":"Auto save at current time",children:[e.jsx(je,{i:"cloud_done",s:12,c:"#475569"}),"Auto save at ",me]})]})]}),e.jsx("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:e.jsx("input",{type:"text",value:t,onChange:q,onFocus:()=>E(!0),onBlur:()=>E(!1),onKeyDown:Se,className:"title-input",style:{...et.titleInput,position:"relative",left:"auto",transform:"none",border:"1px solid transparent",width:B?"120px":"220px",pointerEvents:"auto"},"aria-label":"Project name",title:"Click to edit project name"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:B?"4px":"8px"},children:[le&&e.jsx(ea,{i:"auto_awesome",title:"AI Editor","aria-label":$?"Close AI editor":"Open AI editor",onClick:le,style:$?{color:"#75aadb",background:"rgba(117,170,219,0.12)"}:void 0}),!B&&e.jsx(ea,{i:"keyboard",title:"Keyboard shortcuts","aria-label":"Show keyboard shortcuts",onClick:()=>Re(!0)}),!B&&e.jsx(ea,{i:Z==="default"?"grid_view":Z==="wide-timeline"?"view_agenda":"view_compact",title:`Layout: ${Z}`,"aria-label":"Cycle layout",onClick:()=>{const O=["default","wide-timeline","compact"],de=O.indexOf(Z);J?.(O[(de+1)%O.length])}}),e.jsxs("button",{onClick:Ue,className:B?"":"export-btn",style:{...B?{background:c&&!n?"#22c55e":"rgba(34,197,94,0.5)",border:"none",borderRadius:"20px",padding:"6px 14px",fontSize:"12px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Spline Sans', sans-serif",cursor:c&&!n?"pointer":"not-allowed",minHeight:"32px",minWidth:"auto",transition:"all 0.2s ease"}:{...et.exportBtn,opacity:c&&!n?1:.5,cursor:c&&!n?"pointer":"not-allowed"}},disabled:!c||n,"aria-label":n?"Exporting...":c?"Export video":"Add media to timeline to export",title:n?"Export in progress...":c?"Export video (Ctrl+E)":"Add media to timeline first",children:[e.jsx(je,{i:"download",s:14,c:B?"#fff":"#0a0a0a"}),n?"Exporting...":"Export"]})]})]}),e.jsx(yo,{isOpen:fe,onClose:ye,onExport:Ne,isExporting:n,progress:s,operationLabel:l||"Exporting video...",subMessage:y,resolutions:m,exportPresets:b,onCancel:n?_:void 0,projectName:t,exportResult:pe,onDownload:pe?ye:void 0,onExportAnother:pe?()=>C(null):void 0}),e.jsx(wo,{isOpen:ge,onClose:()=>Re(!1)})]})},$n=a.memo(On),Fn=`
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
`,ko=a.memo(({item:t,isActive:o,onClick:i,shortcut:n,compact:s})=>{const[l,c]=a.useState(!1),m=a.useCallback(b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i(t.id))},[t.id,i]);return e.jsxs("button",{onClick:()=>i(t.id),onKeyDown:m,onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),className:`toolbar-btn ${o?"active":""}`,style:{...et.ghost,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:s?"6px 10px":"6px 14px",flexShrink:0,color:o?"#75aadb":l?"#94a3b8":"#4a5568"},role:"tab","aria-selected":o,"aria-label":`${t.label} panel`,tabIndex:o?0:-1,children:[e.jsx("span",{className:"toolbar-icon",children:e.jsx(je,{i:t.icon,s:20,c:o?"#75aadb":l?"#94a3b8":"#4a5568"})}),e.jsx("span",{style:{fontSize:"8px",fontWeight:o?700:600,textTransform:"uppercase",letterSpacing:"1px",transition:"color 0.15s ease"},children:t.label}),e.jsxs("div",{className:"toolbar-tooltip",children:[t.label,n&&e.jsx("span",{className:"toolbar-shortcut",children:n})]})]})});ko.displayName="ToolbarButton";const Bn={media:"1",audio:"2",text:"3",stickers:"4",effects:"5",transition:"6",filters:"7"},Dn=({activeToolbar:t,onToolbarChange:o})=>{const i=ja(),n=a.useCallback(s=>{const l=rt.findIndex(c=>c.id===t);if(s.key==="ArrowRight"){s.preventDefault();const c=(l+1)%rt.length;o(rt[c].id)}else if(s.key==="ArrowLeft"){s.preventDefault();const c=l===0?rt.length-1:l-1;o(rt[c].id)}else if(s.key>="1"&&s.key<="7"){s.preventDefault();const c=parseInt(s.key)-1;rt[c]&&o(rt[c].id)}},[t,o]);return e.jsxs("nav",{style:{...et.toolbar,...i?{overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Editor tools",onKeyDown:n,children:[e.jsx("style",{children:Fn}),rt.map(s=>e.jsx(ko,{item:s,isActive:t===s.id,onClick:o,shortcut:Bn[s.id],compact:i},s.id))]})},zn=a.memo(Dn);async function So(t,o,i=.3,n=null){await Xe(),n&&Qe(n);const s="input_video.mp4",l="input_audio.mp3",c="output_mixed.mp4";try{await Be(s,t),await Be(l,o),await qe(["-i",s,"-i",l,"-filter_complex",`[1:a]volume=${i}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k",c]);const m=await He(c);return Ye(m,"video/mp4")}finally{Ge(),await Je([s,l,c])}}async function Wn(t,o,i=null){await Xe(),i&&Qe(i);const n="input_video.mp4",s="input_audio.mp3",l="output_replaced.mp4";try{await Be(n,t),await Be(s,o),await qe(["-i",n,"-i",s,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",l]);const c=await He(l);return Ye(c,"video/mp4")}finally{Ge(),await Je([n,s,l])}}async function jo(t,o=1,i=null){await Xe(),i&&Qe(i);const n="input_volume.mp4",s="output_volume.mp4";try{await Be(n,t),await qe(["-i",n,"-af",`volume=${o}`,"-c:v","copy","-c:a","aac","-b:a","192k",s]);const l=await He(s);return Ye(l,"video/mp4")}finally{Ge(),await Je([n,s])}}async function To(t,o=null){await Xe(),o&&Qe(o);const i="input_mute.mp4",n="output_mute.mp4";try{await Be(i,t),await qe(["-i",i,"-c:v","copy","-an",n]);const s=await He(n);return Ye(s,"video/mp4")}finally{Ge(),await Je([i,n])}}async function Co(t,o="mp3",i=null){await Xe(),i&&Qe(i);const n="input_extract.mp4",s=`output_extract.${o}`,l={mp3:"audio/mpeg",aac:"audio/aac",wav:"audio/wav"},c={mp3:["-c:a","libmp3lame","-b:a","192k"],aac:["-c:a","aac","-b:a","192k"],wav:["-c:a","pcm_s16le"]};try{await Be(n,t),await qe(["-i",n,"-vn",...c[o]||c.mp3,s]);const m=await He(s);return Ye(m,l[o]||"audio/mpeg")}finally{Ge(),await Je([n,s])}}async function Vn(t,o=null){await Xe(),o&&Qe(o);const i="input_normalize.mp4",n="output_normalize.mp4";try{await Be(i,t),await qe(["-i",i,"-af","loudnorm=I=-16:LRA=11:TP=-1.5","-c:v","copy","-c:a","aac","-b:a","192k",n]);const s=await He(n);return Ye(s,"video/mp4")}finally{Ge(),await Je([i,n])}}async function Kn(t,o=0,i=0,n=null,s=null){await Xe(),s&&Qe(s);const l="input_fade.mp4",c="output_fade.mp4";try{await Be(l,t);const m=[];if(o>0&&m.push(`afade=t=in:st=0:d=${o}`),i>0&&n){const x=n-i;m.push(`afade=t=out:st=${x}:d=${i}`)}const b=m.join(","),p=["-i",l,"-c:v","copy"];b?(p.push("-af",b),p.push("-c:a","aac","-b:a","192k")):p.push("-c:a","copy"),p.push(c),await qe(p);const g=await He(c);return Ye(g,"video/mp4")}finally{Ge(),await Je([l,c])}}const oi=Object.freeze(Object.defineProperty({__proto__:null,adjustVolume:jo,extractAudio:Co,fadeAudio:Kn,mixAudio:So,muteAudio:To,normalizeAudio:Vn,replaceAudio:Wn},Symbol.toStringTag,{value:"Module"})),ka={"top-left":{x:"10",y:"10"},"top-center":{x:"(w-text_w)/2",y:"10"},"top-right":{x:"w-text_w-10",y:"10"},"center-left":{x:"10",y:"(h-text_h)/2"},center:{x:"(w-text_w)/2",y:"(h-text_h)/2"},"center-right":{x:"w-text_w-10",y:"(h-text_h)/2"},"bottom-left":{x:"10",y:"h-text_h-10"},"bottom-center":{x:"(w-text_w)/2",y:"h-text_h-10"},"bottom-right":{x:"w-text_w-10",y:"h-text_h-10"}},Io=["fade","fadeblack","fadewhite","dissolve","pixelize","wipeleft","wiperight","wipeup","wipedown","slideleft","slideright","slideup","slidedown"];async function Hn(t,o,i={},n=null){await Xe(),n&&Qe(n);const{position:s="bottom-center",fontSize:l=48,fontColor:c="white",backgroundColor:m=null,startTime:b=0,duration:p=0}=i,g="input_text.mp4",x="output_text.mp4";try{await Be(g,t);const T=typeof s=="string"?ka[s]||ka["bottom-center"]:s;let _=`drawtext=text='${o.replace(/'/g,"'\\''").replace(/:/g,"\\:").replace(/\\/g,"\\\\")}':fontsize=${l}:fontcolor=${c}:x=${T.x}:y=${T.y}`;if(m&&(_+=`:box=1:boxcolor=${m}:boxborderw=5`),b>0||p>0){const z=p>0?`between(t,${b},${b+p})`:`gte(t,${b})`;_+=`:enable='${z}'`}await qe(["-i",g,"-vf",_,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",x]);const y=await He(x);return Ye(y,"video/mp4")}finally{Ge(),await Je([g,x])}}async function Yn(t,o,i="fade",n=1,s=null){await Xe(),s&&Qe(s);const l=Io.includes(i)?i:"fade",c="input_trans_1.mp4",m="input_trans_2.mp4",b="output_transition.mp4";try{await Be(c,t),await Be(m,o);const p=await Xn(t),g=Math.max(0,p-n);await qe(["-i",c,"-i",m,"-filter_complex",`[0:v][1:v]xfade=transition=${l}:duration=${n}:offset=${g}[v];[0:a][1:a]acrossfade=d=${n}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",b]);const x=await He(b);return Ye(x,"video/mp4")}finally{Ge(),await Je([c,m,b])}}async function Xn(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="metadata",n.onloadedmetadata=()=>{URL.revokeObjectURL(n.src),o(n.duration)},n.onerror=()=>{URL.revokeObjectURL(n.src),i(new Error("Failed to load video"))},n.src=URL.createObjectURL(t)})}async function it(t,o,i=null){if(typeof o!="string"||!/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(o))throw new Error("Invalid FFmpeg filter string");await Xe(),i&&Qe(i);const n="input_filter.mp4",s="output_filter.mp4";try{await Be(n,t),await qe(["-i",n,"-vf",o,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",s]);const l=await He(s);return Ye(l,"video/mp4")}finally{Ge(),await Je([n,s])}}async function Gn(t,o=0,i=0,n=null){const s=`eq=brightness=${o}:contrast=${1+i}`;return it(t,s,n)}async function qn(t,o=1,i=null){const n=`eq=saturation=${o}`;return it(t,n,i)}async function Jn(t,o=5,i=null){const n=`boxblur=${o}:${o}`;return it(t,n,i)}async function Qn(t,o=1,i=null){const n=`unsharp=5:5:${o}:5:5:0`;return it(t,n,i)}async function Zn(t,o=1,i=null){await Xe(),i&&Qe(i);const n="input_speed.mp4",s="output_speed.mp4",l=Math.max(.25,Math.min(4,o));try{await Be(n,t);const c=`setpts=${1/l}*PTS`;let m="";if(l<=2&&l>=.5)m=`atempo=${l}`;else if(l>2){const p=Math.ceil(Math.log(l)/Math.log(2)),g=Math.pow(l,1/p);m=Array(p).fill(`atempo=${g}`).join(",")}else{const p=Math.ceil(Math.log(1/l)/Math.log(2)),g=Math.pow(l,1/p);m=Array(p).fill(`atempo=${g}`).join(",")}await qe(["-i",n,"-filter_complex",`[0:v]${c}[v];[0:a]${m}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",s]);const b=await He(s);return Ye(b,"video/mp4")}finally{Ge(),await Je([n,s])}}async function er(t,o=0,i=0,n=null,s=null){await Xe(),s&&Qe(s);const l="input_fade.mp4",c="output_fade.mp4";try{await Be(l,t);const m=[];if(o>0&&m.push(`fade=t=in:st=0:d=${o}`),i>0&&n){const p=n-i;m.push(`fade=t=out:st=${p}:d=${i}`)}if(m.length===0){const p=await He(l);return Ye(p,"video/mp4")}await qe(["-i",l,"-vf",m.join(","),"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",c]);const b=await He(c);return Ye(b,"video/mp4")}finally{Ge(),await Je([l,c])}}async function tr(t,o=90,i=null){const n={90:"transpose=1",180:"transpose=1,transpose=1",270:"transpose=2","-90":"transpose=2"},s=n[o]||n[90];return it(t,s,i)}async function ar(t,o="horizontal",i=null){return it(t,o==="vertical"?"vflip":"hflip",i)}async function or(t,o,i=null){const{width:n,height:s,x:l=0,y:c=0}=o,m=`crop=${n}:${s}:${l}:${c}`;return it(t,m,i)}const ba=15,nr=85;function rr(){const[t,o]=a.useState(!1),[i,n]=a.useState(fa()),[s,l]=a.useState(0),[c,m]=a.useState(0),[b,p]=a.useState(null),[g,x]=a.useState(null),T=a.useRef(!0);a.useEffect(()=>{T.current=!0;const w=nn(R=>{T.current&&(m(R.loadProgress),R.error&&p(R.error))});return()=>{T.current=!1,Ge(),w()}},[]);const W=a.useCallback(async()=>{if(fa())return n(!0),!0;o(!0),p(null);try{return await Xe(),T.current&&(n(!0),o(!1)),!0}catch(w){return T.current&&(p(ta(w,"ffmpeg")),o(!1)),!1}},[]),_=a.useCallback(({progress:w})=>{T.current&&l(w)},[]),y=a.useCallback(async(w,R)=>{if(!fa()&&!await W())throw new Error("FFmpeg not loaded");x(w),l(0),p(null);const I=({progress:K=0,time:he=0})=>{const xe=ba+Math.round(K/100*nr),De=Math.max(ba,Math.min(99,xe));_({progress:De,time:he})};try{_({progress:ba});const K=await R(I);return T.current&&(l(100),x(null),setTimeout(()=>{T.current&&l(0)},350)),K}catch(K){if(T.current){const xe=K?.name==="AbortError"||/abort|cancel/i.test(K?.message||"");p(xe?"Operation cancelled":ta(K,"ffmpeg")),l(0),x(null)}const he=(K?.message||"").toLowerCase();if(he.includes("wasm")||he.includes("memory")||he.includes("abort")||he.includes("sharedarraybuffer"))try{await rn(),T.current&&n(!1)}catch{}throw K}},[W,_]),z=a.useCallback(async(w,R,I)=>y("trim video",K=>sn(w,R,I,K)),[y]),G=a.useCallback(async(w,R)=>y("split video",I=>ln(w,R,I)),[y]),se=a.useCallback(async w=>y("merge clips",R=>cn(w,R)),[y]),Z=a.useCallback(async(w,R)=>y("export video",I=>dn(w,R,I)),[y]),J=a.useCallback(async(w,R)=>{const I=aa[R];return y(`export for ${I?.label||R}`,K=>un(w,R,K))},[y]),v=a.useCallback(async w=>pn(w),[]),Y=a.useCallback(async(w,R=0)=>mn(w,R),[]),le=a.useCallback(async w=>y("convert to web format",R=>fn(w,"mp4",R)),[y]),$=a.useCallback(async(w,R,I=.3)=>y("mix audio",K=>So(w,R,I,K)),[y]),B=a.useCallback(async(w,R)=>y("adjust volume",I=>jo(w,R,I)),[y]),fe=a.useCallback(async w=>y("mute audio",R=>To(w,R)),[y]),V=a.useCallback(async(w,R="mp3")=>y("extract audio",I=>Co(w,R,I)),[y]),ce=a.useCallback(async(w,R,I={})=>y("add text",K=>Hn(w,R,I,K)),[y]),E=a.useCallback(async(w,R,I="fade",K=1)=>y("add transition",he=>Yn(w,R,I,K,he)),[y]),X=a.useCallback(async(w,R)=>y("change speed",I=>Zn(w,R,I)),[y]),Me=a.useCallback(async(w,R,I,K)=>y("add fade",he=>er(w,R,I,K,he)),[y]),ge=a.useCallback(async(w,R)=>y("rotate video",I=>tr(w,R,I)),[y]),Re=a.useCallback(async(w,R)=>y("flip video",I=>ar(w,R,I)),[y]),Q=a.useCallback(async(w,R)=>y("crop video",I=>or(w,R,I)),[y]),Ue=a.useCallback(async(w,R,I)=>y("adjust colors",K=>Gn(w,R,I,K)),[y]),Ne=a.useCallback(async(w,R)=>y("adjust saturation",I=>qn(w,R,I)),[y]),ye=a.useCallback(async(w,R)=>y("apply filter",I=>it(w,R,I)),[y]),q=a.useCallback(async(w,R)=>y("apply blur",I=>Jn(w,R,I)),[y]),Se=a.useCallback(async(w,R)=>y("apply sharpen",I=>Qn(w,R,I)),[y]),pe=a.useCallback(()=>{p(null)},[]),C=a.useCallback(()=>{l(0),x(null)},[]),me=a.useCallback(async()=>{await hn()},[]),ae=a.useCallback(()=>{wn(),T.current&&(x(null),l(0),p("Operation cancelled"))},[]),O=a.useCallback(async()=>{await bn()},[]),de=a.useCallback(()=>{const w=yn(),R=xn();return{usage:w,usageFormatted:gn(w),limitExceeded:R}},[]);return{isLoading:t,isReady:i,progress:s,loadProgress:c,error:b,currentOperation:g,initialize:W,preload:me,clearError:pe,resetProgress:C,cancelOperation:ae,clearMemory:O,getMemoryInfo:de,trimVideo:z,splitVideo:G,mergeClips:se,exportVideo:Z,exportWithPreset:J,getVideoInfo:v,generateThumbnail:Y,convertToWebFormat:le,mixAudio:$,adjustVolume:B,muteAudio:fe,extractAudio:V,addTextOverlay:ce,addTransition:E,changeSpeed:X,addFade:Me,rotateVideo:ge,flipVideo:Re,cropVideo:Q,adjustBrightnessContrast:Ue,adjustSaturation:Ne,applyFilter:ye,applyBlur:q,applySharpen:Se,resolutions:go,exportPresets:aa,textPositions:ka,transitionTypes:Io}}const ir="clipcut-thumbnails",sr=1,Tt="thumbnails";let qt=null;function Ro(){return qt||(qt=new Promise((t,o)=>{const i=indexedDB.open(ir,sr);i.onerror=()=>{console.warn("[ThumbnailCache] Failed to open database"),o(i.error)},i.onsuccess=()=>{t(i.result)},i.onupgradeneeded=n=>{const s=n.target.result;if(!s.objectStoreNames.contains(Tt)){const l=s.createObjectStore(Tt,{keyPath:"id"});l.createIndex("videoId","videoId",{unique:!1}),l.createIndex("timestamp","timestamp",{unique:!1})}}}),qt)}function Mo(t,o){return`${t}_t${Math.floor(o*10)}`}async function lr(t,o){try{const i=await Ro(),n=Mo(t,o);return new Promise(s=>{const m=i.transaction(Tt,"readonly").objectStore(Tt).get(n);m.onsuccess=()=>{const b=m.result;b&&b.data?s(new Blob([b.data],{type:"image/jpeg"})):s(null)},m.onerror=()=>s(null)})}catch(i){return console.warn("[ThumbnailCache] Error getting cached thumbnail:",i),null}}async function cr(t,o,i){try{const n=await Ro(),s=Mo(t,o),l=await i.arrayBuffer();return new Promise(c=>{const m=n.transaction(Tt,"readwrite");m.objectStore(Tt).put({id:s,videoId:t,time:o,data:l,timestamp:Date.now()}),m.oncomplete=()=>c(!0),m.onerror=()=>c(!1)})}catch(n){console.warn("[ThumbnailCache] Error caching thumbnail:",n)}}function Jt(t){return new Promise((o,i)=>{const n=URL.createObjectURL(t);if(t.type?.startsWith("audio/")){const m=new Audio;m.preload="metadata",m.onloadedmetadata=()=>{URL.revokeObjectURL(n),o({duration:m.duration||0,width:0,height:0})},m.onerror=()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},m.src=n;return}const l=document.createElement("video");l.preload="metadata",l.muted=!0;const c=setTimeout(()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},5e3);l.onloadedmetadata=()=>{clearTimeout(c),URL.revokeObjectURL(n),o({duration:isFinite(l.duration)?l.duration:0,width:l.videoWidth||0,height:l.videoHeight||0})},l.onerror=()=>{clearTimeout(c),URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},l.src=n})}function Ut(t,o=0){return new Promise((i,n)=>{const s=URL.createObjectURL(t),l=document.createElement("video");l.preload="auto",l.muted=!0;const c=setTimeout(()=>{m(),i(Qt())},8e3);function m(){clearTimeout(c),URL.revokeObjectURL(s)}l.onloadeddata=()=>{const b=Math.min(o,l.duration-.1);l.currentTime=Math.max(0,b)},l.onseeked=()=>{try{const b=document.createElement("canvas"),g=Math.min(1,320/(l.videoWidth||320));b.width=Math.round((l.videoWidth||320)*g),b.height=Math.round((l.videoHeight||180)*g),b.getContext("2d").drawImage(l,0,0,b.width,b.height),b.toBlob(T=>{m(),i(T||Qt())},"image/jpeg",.7)}catch{m(),i(Qt())}},l.onerror=()=>{m(),i(Qt())},l.src=s})}function Qt(){const t=document.createElement("canvas");t.width=160,t.height=90;const o=t.getContext("2d"),i=o.createLinearGradient(0,0,160,90);return i.addColorStop(0,"#1a2332"),i.addColorStop(1,"#0a0a0a"),o.fillStyle=i,o.fillRect(0,0,160,90),o.fillStyle="rgba(117, 170, 219, 0.3)",o.beginPath(),o.moveTo(65,30),o.lineTo(65,60),o.lineTo(100,45),o.closePath(),o.fill(),new Promise(n=>{t.toBlob(s=>n(s||new Blob),"image/jpeg",.7)})}const Ya={"480p":{width:854,height:480},"720p":{width:1280,height:720},"1080p":{width:1920,height:1080}},Xa={"480p":{28:1e6,23:2e6,18:4e6,15:6e6},"720p":{28:25e5,23:5e6,18:8e6,15:12e6},"1080p":{28:4e6,23:8e6,18:16e6,15:24e6}};function dr(t,o){const i=Xa[t]||Xa["1080p"];return i[o]||i[18]}const Ga={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}};function qa(t,o,i,n){const s=o.text||"";if(!s.trim())return;const l=Math.max(12,Math.round((o.textSize||48)*(n/1080))),c=o.textBold?"bold":"normal",m=o.textItalic?"italic":"normal",b=o.textFontFamily||"Spline Sans";t.font=`${m} ${c} ${l}px '${b}', Arial, sans-serif`;let p,g,x,T;if(o.textX!=null&&o.textY!=null)p=o.textX/100*i,g=o.textY/100*n,x="center",T="middle";else{const W=Ga[o.textPosition||"center"]||Ga.center;p=W.x*i,g=W.y*n,x=W.align,T=W.baseline}if(t.textAlign=x,t.textBaseline=T,o.textBgColor&&o.textBgColor!=="transparent"){const W=t.measureText(s),_=l*.25,y=W.width,z=l*1.2;let G=p-_;x==="center"?G=p-y/2-_:x==="right"&&(G=p-y-_);let se=g-_;T==="middle"?se=g-z/2-_:T==="bottom"&&(se=g-z-_),t.fillStyle=o.textBgColor,t.fillRect(G,se,y+_*2,z+_*2)}if(t.shadowColor="rgba(0,0,0,0.7)",t.shadowBlur=4,t.shadowOffsetX=0,t.shadowOffsetY=1,t.fillStyle=o.textColor||"#ffffff",t.fillText(s,p,g),o.textUnderline){const W=t.measureText(s);let _=p;x==="center"?_=p-W.width/2:x==="right"&&(_=p-W.width);const y=T==="top"?g+l:T==="middle"?g+l/2:g;t.strokeStyle=o.textColor||"#ffffff",t.lineWidth=Math.max(1,l/20),t.beginPath(),t.moveTo(_,y+2),t.lineTo(_+W.width,y+2),t.stroke()}t.shadowColor="transparent",t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0}function ur(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="auto",n.playsInline=!0,n.muted=!1,n.style.position="fixed",n.style.top="-9999px",n.style.left="-9999px",n.style.width="1px",n.style.height="1px",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s;const l=()=>{n.removeEventListener("error",c)},c=()=>{l(),i(new Error(`Failed to load video: ${n.error?.message||"unknown error"}`))};n.addEventListener("error",c),n.addEventListener("loadeddata",()=>{l(),o({video:n,url:s})},{once:!0}),n.load()})}function pr(t){return new Promise((o,i)=>{const n=document.createElement("audio");n.preload="auto",n.style.display="none",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s,n.addEventListener("error",()=>{i(new Error("Failed to load audio"))}),n.addEventListener("canplaythrough",()=>{o({audio:n,url:s})},{once:!0}),n.load()})}function mr(){const t=["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];for(const o of t)if(MediaRecorder.isTypeSupported(o))return o;return""}function fr(t){const o=[];return t.brightness!=null&&t.brightness!==0&&o.push(`brightness(${1+t.brightness/100})`),t.contrast!=null&&t.contrast!==0&&o.push(`contrast(${1+t.contrast/100})`),t.saturation!=null&&t.saturation!==0&&o.push(`saturate(${1+t.saturation/100})`),t.blur!=null&&t.blur>0&&o.push(`blur(${t.blur}px)`),o.length>0?o.join(" "):"none"}function ga(t){const o=Math.floor(t/60),i=Math.floor(t%60);return`${o}:${i.toString().padStart(2,"0")}`}async function hr({clips:t,bgMusic:o=null,totalDuration:i,resolution:n="1080p",settings:s={},onProgress:l,abortSignal:c}){const{quality:m=18,fps:b=30}=s,p=Ya[n]||Ya["1080p"],{width:g,height:x}=p,T=dr(n,m),W=mr();if(Pt({category:"export",message:"canvasExport.start",level:"info",data:{resolution:n,fps:b,quality:m,totalDuration:i,clipCount:t?.length??0}}),!W)throw Pt({category:"export",message:"canvasExport.no_mime_support",level:"error"}),new Error("Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.");const _=t.filter(E=>E.type!=="audio"&&E.type!=="text"&&E.type!=="sticker"&&E.file).sort((E,X)=>E.startTime-X.startTime),y=t.filter(E=>E.type==="text"||E.type==="sticker"||E.text?.trim());if(_.length===0)throw Pt({category:"export",message:"canvasExport.no_video_clips",level:"error"}),new Error("No video clips to export.");const z=document.createElement("canvas");z.width=g,z.height=x;const G=z.getContext("2d"),se=new AudioContext,Z=se.createMediaStreamDestination();let J=null,v=null,Y=null;if(o?.file)try{const E=await pr(o.file);J=E.audio,v=E.url,J.loop=!0;const X=se.createMediaElementSource(J);Y=se.createGain(),Y.gain.value=o.volume??.3,X.connect(Y),Y.connect(Z)}catch(E){console.warn("Could not load background music, continuing without it:",E),J=null}const le=z.captureStream(b),$=Z.stream.getAudioTracks();for(const E of $)le.addTrack(E);const B=[],fe=new MediaRecorder(le,{mimeType:W,videoBitsPerSecond:T,audioBitsPerSecond:128e3});fe.ondataavailable=E=>{E.data.size>0&&B.push(E.data)},fe.start(1e3),J&&(J.currentTime=0,J.play().catch(()=>{}));const V=Date.now();for(let E=0;E<_.length&&!c?.aborted;E++){const X=_[E],Me=X.trimStart||0,ge=X.duration||0,Re=X.speed||1,{video:Q,url:Ue}=await ur(X.file);let Ne=null;try{Ne=se.createMediaElementSource(Q);const q=se.createGain();q.gain.value=X.isMuted?0:X.volume??1,Ne.connect(q),q.connect(Z)}catch(q){console.warn("Could not route clip audio:",q)}Q.currentTime=Me,Q.playbackRate=Re;const ye=fr(X);await new Promise(q=>{Q.addEventListener("seeked",q,{once:!0})}),await Q.play(),await new Promise((q,Se)=>{let pe;const C=Me+ge,me=X.fadeIn||0,ae=X.fadeOut||0,O=()=>{if(c?.aborted){cancelAnimationFrame(pe),Q.pause(),q();return}const de=Q.currentTime,w=de-Me;if(ge>0&&de>=C-.05){Q.pause(),Ja(G,Q,g,x,ye,X,w,ge,me,ae,y,X.startTime+w,i),q();return}Ja(G,Q,g,x,ye,X,w,ge,me,ae,y,X.startTime+w,i);const R=X.startTime+w,I=i>0?Math.min(99,R/i*100):0,K=(Date.now()-V)/1e3,he=I>1?K/I*(100-I):0;l?.({percent:Math.round(I),elapsed:ga(K),eta:ga(he),label:_.length>1?`Exporting clip ${E+1}/${_.length}`:"Exporting video..."}),pe=requestAnimationFrame(O)};Q.addEventListener("ended",()=>{cancelAnimationFrame(pe),Q.pause(),q()},{once:!0}),Q.addEventListener("error",()=>{cancelAnimationFrame(pe),Se(new Error(`Video playback error during export of clip ${E+1}`))},{once:!0}),pe=requestAnimationFrame(O)}),Q.pause(),Q.src="",Q.load(),document.body.removeChild(Q),URL.revokeObjectURL(Ue),X.startTime+ge}J&&(J.pause(),J.src="",document.body.removeChild(J),v&&URL.revokeObjectURL(v));const ce=await new Promise(E=>{fe.onstop=()=>{const X=new Blob(B,{type:W});E(X)},fe.stop()});if(le.getTracks().forEach(E=>E.stop()),Z.stream.getTracks().forEach(E=>E.stop()),await se.close().catch(()=>{}),l?.({percent:100,elapsed:ga((Date.now()-V)/1e3),eta:"0:00",label:"Complete"}),c?.aborted)throw Pt({category:"export",message:"canvasExport.cancelled",level:"warning"}),new Error("Export cancelled.");return Pt({category:"export",message:"canvasExport.complete",level:"info",data:{sizeBytes:ce.size,duration:i,elapsedMs:Date.now()-V}}),{blob:ce,duration:i,size:ce.size}}function Ja(t,o,i,n,s,l,c,m,b,p,g,x,T){t.save();let W=1;b>0&&c<b&&(W=c/b),p>0&&m>0&&m-c<p&&(W=Math.min(W,(m-c)/p)),t.globalAlpha=Math.max(0,Math.min(1,W)),s&&s!=="none"&&(t.filter=s),l.rotation&&(t.translate(i/2,n/2),t.rotate(l.rotation*Math.PI/180),t.translate(-i/2,-n/2));const _=o.videoWidth||i,y=o.videoHeight||n,z=Math.min(i/_,n/y),G=_*z,se=y*z,Z=(i-G)/2,J=(n-se)/2;t.fillStyle="#000000",t.fillRect(0,0,i,n),t.drawImage(o,Z,J,G,se),t.filter="none",t.globalAlpha=1;for(const v of g){const Y=v.startTime||0,le=Y+(v.duration||T);x>=Y&&x<=le&&qa(t,v,i,n)}l.text?.trim()&&l.type!=="text"&&qa(t,l,i,n),t.restore()}const br="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease",gr=80,xr=[.7,.95],yr=[.4,.7,.9],wr=a.memo(function({isOpen:o,onClose:i,title:n,zIndex:s=2900,children:l}){const c=a.useRef(null),m=a.useRef({startY:0,isDragging:!1,startSnap:0}),[b,p]=a.useState(0),[g,x]=a.useState(!1),[T,W]=a.useState(!1),[_,y]=a.useState(0);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const V=window.matchMedia("(orientation: landscape) and (max-width: 900px)"),ce=()=>W(V.matches);return ce(),V.addEventListener?V.addEventListener("change",ce):V.addListener(ce),()=>{V.removeEventListener?V.removeEventListener("change",ce):V.removeListener(ce)}},[]);const z=T?yr:xr,G=z[Math.min(_,z.length-1)]??z[0];a.useEffect(()=>{o&&y(0),p(0)},[o,T]),a.useEffect(()=>{if(o){const V=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=V}}},[o]);const se=a.useCallback(V=>{m.current.startY=V.touches[0].clientY,m.current.isDragging=!0,m.current.startSnap=_,x(!0)},[_]),Z=a.useCallback(V=>{if(!m.current.isDragging)return;const ce=V.touches[0].clientY-m.current.startY;p(ce)},[]),J=a.useCallback(()=>{if(!m.current.isDragging)return;m.current.isDragging=!1,x(!1);const V=b,ce=window.innerHeight||800;if(V>gr&&m.current.startSnap===0){p(0),i();return}if(z.length>1){const E=V<0?-1:V>0?1:0,X=ce*.08,Me=Math.round(Math.abs(V)/X);if(Me>0){let ge=m.current.startSnap-E*Me;ge=Math.max(0,Math.min(z.length-1,ge)),y(ge)}}p(0)},[b,i,z]),v={position:"fixed",inset:0,bottom:"56px",background:"rgba(0,0,0,0.4)",zIndex:s-100,opacity:o?1:0,pointerEvents:o?"auto":"none",transition:"opacity 0.3s ease"},Y={position:"fixed",bottom:"56px",left:0,right:0,height:`${Math.round(G*100)}vh`,zIndex:s,background:"#0e1218",borderTop:"2px solid rgba(117, 170, 219, 0.15)",borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",transform:o?`translateY(${Math.max(0,b)}px)`:"translateY(100%)",transition:g?"none":br},le={flexShrink:0,cursor:"grab",touchAction:"none"},$={width:"36px",height:"4px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"8px auto 6px"},B={fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"center",padding:"0 16px 8px",textTransform:"uppercase",letterSpacing:"0.5px"},fe={flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:v,onClick:i}),e.jsxs("div",{ref:c,style:Y,"aria-hidden":!o,children:[e.jsxs("div",{style:le,onTouchStart:se,onTouchMove:Z,onTouchEnd:J,children:[e.jsx("div",{style:$}),n&&e.jsx("div",{style:B,children:n})]}),e.jsx("div",{style:fe,children:l})]})]})}),ni=.1,Eo=8,ri=3,ii=t=>5*Math.pow(250/5,t/100),si=(t,o)=>t*o,li=(t,o)=>t/o,ci=(t,o,i)=>{const n=new Set([0,i]);for(const s of t)s.id!==o&&(n.add(s.startTime),n.add(s.startTime+s.duration));return[...n].sort((s,l)=>s-l)},Qa=(t,o,i,n=Eo)=>{const s=n/i;let l=t,c=null,m=s;for(const b of o){const p=Math.abs(t-b);p<m&&(m=p,l=b,c=b)}return{time:l,snappedTo:c}},di=(t,o,i,n,s=Eo)=>{const l=Qa(t,i,n,s),c=Qa(t+o,i,n,s),m=l.snappedTo!==null?Math.abs(t-l.time):1/0,b=c.snappedTo!==null?Math.abs(t+o-c.time):1/0;return m<=b&&l.snappedTo!==null?{startTime:l.time,snappedTo:l.snappedTo}:c.snappedTo!==null?{startTime:c.time-o,snappedTo:c.snappedTo}:{startTime:t,snappedTo:null}},vr=t=>{const i=80/t,n=[.1,.25,.5,1,2,5,10,15,30,60,120,300];for(const s of n)if(s>=i*.6)return s;return 300},ui=(t,o)=>{const i=vr(o),n=i<=1?4:i<=5?5:4,s=i/n,l=[],c=t+i;for(let m=0;m<=c;m+=s){const b=m%i;if(b<.001||Math.abs(b-i)<.001){const g=Math.floor(m/60),x=m%60,T=x===Math.floor(x)?Math.floor(x).toString().padStart(2,"0"):x.toFixed(1).padStart(4,"0");l.push({time:m,label:`${g}:${T}`,major:!0})}else l.push({time:m,label:"",major:!1})}return l},Za=t=>{t<0&&(t=0);const o=Math.floor(t/60),i=t%60;return`${o}:${i.toFixed(1).padStart(4,"0")}`},pi=t=>{if(t<60)return`${t.toFixed(1)}s`;const o=Math.floor(t/60),i=(t%60).toFixed(0);return`${o}:${i.padStart(2,"0")}`},kr=t=>t?.type!=="audio"&&t?.type!=="text",_o=t=>kr(t)&&!t?.blobUrl&&!!t?._mediaError,Sr=t=>t?.type!=="audio"&&!t?.blobUrl&&!!t?._mediaError;function jr({restoredClips:t=[],mediaItems:o=[],projectName:i="Untitled Project"}){const n=t.filter(_o).length,s=o.filter(Sr).length,l=n>0||s>0;return{clips:t,mediaItems:o,unresolvedClipCount:n,unresolvedMediaCount:s,hasUnavailableMedia:l,notification:l?{level:"warning",message:`Loaded "${i}" — ${n} clip(s) need media re-import`}:{level:"success",message:`Loaded "${i}" (${t.length} clips)`}}}function mi({videoSrc:t=null,hasTimelineClips:o=!1,hasUnavailableMediaClips:i=!1,isRestoringMedia:n=!1}){return n?{title:"Restoring media...",description:"Loading media files from storage",showImportHint:!1}:t?{title:null,description:null,showImportHint:!1}:i?{title:"Media missing",description:"This project still has clips, but one or more source files need to be re-imported.",showImportHint:!0}:o?{title:"No clip at playhead",description:"Move the playhead over a clip on the timeline to preview",showImportHint:!1}:{title:"No media loaded",description:"Import media and add clips to the timeline to preview",showImportHint:!0}}function Tr(t=[]){return t.some(_o)}function Cr({projectId:t,isRestored:o,hasBeenNonEmpty:i,clipsCount:n,mediaItemsCount:s}){return t?o?(n||0)===0&&(s||0)===0&&!i?{skip:!0,reason:"empty-without-session-edit"}:{skip:!1,reason:null}:{skip:!0,reason:"restore-in-progress"}:{skip:!1,reason:null}}let eo=!1;function Ir(){if(eo)return;const t=jn();if(!t)return;eo=!0;const o=typeof AbortSignal<"u"&&AbortSignal.timeout?{signal:AbortSignal.timeout(5e3)}:{};fetch(`${t}/health`,{method:"GET",mode:"cors",cache:"no-store",...o}).catch(i=>{i?.message})}const to=a.lazy(()=>Fe(()=>import("./C4vhJDm_.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Rr=a.lazy(()=>Fe(()=>import("./EXdvKlqf.js"),__vite__mapDeps([11,1,6,3,4,5,7,8,9,2,10]))),ao=a.lazy(()=>Fe(()=>import("./DiLyAH0f.js"),__vite__mapDeps([12,1,13,6,3,4,5,7,8,9,2,10]))),oo=a.lazy(()=>Fe(()=>import("./DlltwpMJ.js"),__vite__mapDeps([14,1,6,3,4,5,7,8,9,2,10]))),no=a.lazy(()=>Fe(()=>import("./OBU4bDB4.js"),__vite__mapDeps([15,1,13,3,4,5,6,7,8,9,2,10]))),ro=a.lazy(()=>Fe(()=>import("./ChdW871-.js"),__vite__mapDeps([16,1,13,3,4,5,6,7,8,9,2,10]))),io=a.lazy(()=>Fe(()=>import("./ZsbvufQv.js"),__vite__mapDeps([17,1,3,4,5,6,7,8,9,2,10]))),so=a.lazy(()=>Fe(()=>import("./D239LqC0.js"),__vite__mapDeps([18,1,3,4,5,6,7,8,9,2,10]))),lo=a.lazy(()=>Fe(()=>import("./rKqKw3aW.js"),__vite__mapDeps([19,1,13,3,4,5,6,7,8,9,2,10]))),co=a.lazy(()=>Fe(()=>import("./64Nc4_i0.js"),__vite__mapDeps([20,1,6,3,4,21,5,7,8,9,2,10]))),uo=a.lazy(()=>Fe(()=>import("./IpWn67So.js"),__vite__mapDeps([22,1,3,4,5,6,7,8,9,2,10]))),Mr=`
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
  ${Rn}
  ${Cn}
`;function xa(t,o,i,n=!1){const s=a.useRef(!1),l=a.useRef(0),c=a.useRef(0);return a.useCallback((b,p)=>{b.preventDefault(),s.current=!0,l.current=t==="y"?b.clientY:b.clientX,c.current=p;const g=b.currentTarget;g.classList.add("dragging");const x=W=>{if(!s.current)return;const _=t==="y"?l.current-W.clientY:W.clientX-l.current,y=n?-_:_;o(c.current+y)},T=()=>{s.current=!1,g.classList.remove("dragging"),document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",T),document.body.style.cursor="",document.body.style.userSelect=""};document.addEventListener("mousemove",x),document.addEventListener("mouseup",T),document.body.style.cursor=t==="y"?"row-resize":"col-resize",document.body.style.userSelect="none"},[t,o,i,n])}const Er=280,po=280,mo=320,fo=360;function ya(t){return Math.max(200,Math.min(400,Math.floor(t*.25)))}function wa(t){return Math.max(220,Math.min(400,Math.floor(t*.25)))}const ho={width:"100%",minWidth:0,minHeight:0,alignSelf:"stretch"},jt=a.memo(({width:t,height:o="100%"})=>e.jsx("div",{style:{width:t,height:o,background:"linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderRight:"1px solid rgba(117,170,219,0.06)"},children:e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}})}));jt.displayName="PanelLoadingFallback";const Sa=a.memo(()=>e.jsx("div",{style:{height:"220px",background:"linear-gradient(180deg, #0c1018 0%, #08090c 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderTop:"2px solid rgba(117,170,219,0.08)"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("span",{style:{color:"#3d4a5c",fontSize:"11px",fontWeight:500},children:"Loading timeline..."})]})}));Sa.displayName="TimelineLoadingFallback";const va=[{target:"media-panel",title:"Media Library",desc:"Import videos and audio files here. Drag them to the timeline to start editing.",position:"right"},{target:"player",title:"Preview",desc:"Watch your edit in real-time. Effects and text overlays preview live without rendering.",position:"bottom"},{target:"inspector",title:"Inspector",desc:"Adjust clip properties — filters, speed, volume, text overlays, and transforms.",position:"left"},{target:"timeline",title:"Timeline",desc:"Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.",position:"top"}],Po=a.memo(({onComplete:t})=>{const[o,i]=a.useState(0),n=va[o],s=o===va.length-1;return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9e3,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:l=>{l.target===l.currentTarget&&t()},children:e.jsxs("div",{style:{background:"#1a2332",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"90%",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 16px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(117,170,219,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#75aadb"},children:o+1}),e.jsx("span",{style:{fontSize:"15px",fontWeight:600,color:"#f1f5f9"},children:n.title})]}),e.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",lineHeight:1.6,margin:"0 0 16px"},children:n.desc}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"4px"},children:va.map((l,c)=>e.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:c===o?"#75aadb":"rgba(255,255,255,0.1)"}},c))}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:t,style:{padding:"8px 16px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",background:"transparent",color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:"Skip"}),e.jsx("button",{onClick:()=>s?t():i(l=>l+1),style:{padding:"8px 20px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #75aadb, #5a8cbf)",color:"#0a0a0a",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:s?"Get Started":"Next"})]})]})]})})});Po.displayName="WalkthroughOverlay";const _r=(t,o)=>{switch(o.type){case"SET_CLIPS":return{...t,clips:o.clips,past:[...t.past.slice(-49),t.clips],future:[]};case"UNDO":return t.past.length===0?t:{clips:t.past[t.past.length-1],past:t.past.slice(0,-1),future:[t.clips,...t.future]};case"REDO":return t.future.length===0?t:{clips:t.future[0],past:[...t.past,t.clips],future:t.future.slice(1)};case"RESET":return{clips:[],past:[],future:[]};default:return t}};let Pr=0;const Zt=()=>`clip-${Date.now()}-${(++Pr).toString(36)}`,Ao=a.memo(({message:t,progress:o,subMessage:i,operationLabel:n,onCancel:s})=>e.jsx("div",{className:"loading-overlay",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2e3,backdropFilter:"blur(6px)"},role:"dialog","aria-modal":"true","aria-label":"Processing",children:e.jsxs("div",{className:"loading-card",style:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"36px 52px",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",minWidth:"280px"},children:[e.jsxs("div",{style:{width:"56px",height:"56px",margin:"0 auto 20px",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("div",{style:{position:"absolute",inset:"6px",border:"2px solid rgba(117,170,219,0.1)",borderBottomColor:"rgba(117,170,219,0.5)",borderRadius:"50%",animation:"spin 1.2s linear infinite reverse"}})]}),e.jsx("p",{style:{color:"white",fontSize:"15px",margin:"0 0 6px",fontWeight:600},children:t}),n&&e.jsx("p",{style:{color:"rgba(255, 255, 255, 0.65)",fontSize:"12px",margin:"0 0 8px"},children:n}),i&&e.jsx("p",{style:{color:"#64748b",fontSize:"12px",margin:"0 0 16px"},children:i}),o>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"220px",height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden",margin:"16px auto 10px"},children:e.jsx("div",{className:o<100?"shimmer-bar":"",style:{height:"100%",width:`${o}%`,background:o>=100?"linear-gradient(90deg, #22c55e, #16a34a)":"linear-gradient(90deg, #75aadb, #5a8cbf)",transition:"width 0.3s ease",borderRadius:"3px"}})}),e.jsxs("p",{style:{color:"#75aadb",fontSize:"13px",fontWeight:700,margin:"0 0 16px"},children:[Math.round(o),"%"]})]}),s&&e.jsx("button",{onClick:s,style:{marginTop:o>0?"0":"16px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",padding:"8px 24px",color:"#ef4444",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},"aria-label":"Cancel operation",children:"Cancel"})]})}));Ao.displayName="LoadingOverlay";const Uo=a.memo(({progress:t})=>t>=100?null:e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"3px",background:"rgba(0,0,0,0.3)",zIndex:100,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.max(t,2)}%`,background:"linear-gradient(90deg, #5a8cbf, #75aadb)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0",boxShadow:"0 0 8px rgba(117,170,219,0.4)"}})}));Uo.displayName="FFmpegInitBar";const Lo=a.memo(({type:t="error",message:o,onClose:i,autoClose:n=!1})=>{const[s,l]=a.useState(!1);a.useEffect(()=>{if(!n)return;const b=setTimeout(()=>l(!0),za),p=setTimeout(i,za+Wa);return()=>{clearTimeout(b),clearTimeout(p)}},[n,i]);const c=a.useCallback(()=>{l(!0),setTimeout(i,Wa)},[i]),m={error:{bg:"linear-gradient(135deg, #ef4444, #dc2626)",shadow:"rgba(239,68,68,0.25)",icon:"error"},success:{bg:"linear-gradient(135deg, #22c55e, #16a34a)",shadow:"rgba(34,197,94,0.25)",icon:"check_circle"},warning:{bg:"linear-gradient(135deg, #f59e0b, #d97706)",shadow:"rgba(245,158,11,0.25)",icon:"warning"},info:{bg:"linear-gradient(135deg, #3b82f6, #2563eb)",shadow:"rgba(59,130,246,0.25)",icon:"info"}}[t]||{bg:"#ef4444",shadow:"rgba(0,0,0,0.2)",icon:"error"};return e.jsxs("div",{className:s?"toast-exit":"toast-enter",style:{position:"fixed",bottom:"24px",right:"24px",background:m.bg,color:"white",padding:"12px 18px",borderRadius:"10px",display:"flex",alignItems:"center",gap:"10px",boxShadow:`0 8px 28px ${m.shadow}`,zIndex:3e3,maxWidth:"380px",fontSize:"13px",backdropFilter:"blur(4px)"},role:t==="error"?"alert":"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",opacity:.9},children:m.icon}),e.jsx("span",{style:{flex:1,lineHeight:1.4},children:o}),e.jsx("button",{onClick:c,style:{background:"rgba(255,255,255,0.15)",border:"none",color:"white",cursor:"pointer",padding:"4px",borderRadius:"50%",display:"flex",width:"22px",height:"22px",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0},children:"✕"})]})});Lo.displayName="Toast";function Ar(t,o){const i=t.find(s=>s.type==="video");if(!i)return null;if(i.file)return{file:i.file,mediaId:i.mediaId};const n=o.find(s=>s.id===i.mediaId);return n?.file?{file:n.file,mediaId:i.mediaId}:null}function Ur(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}async function Lr(t,o,i,n,s,l){const c=new Map;for(const p of i)if(!(!p.file||p.storagePath))try{const g=await xo(t,o,p.file);c.set(p.id,g)}catch(g){console.warn("[autosave] Media upload failed:",p.name,g)}if(c.size===0)return{changed:!1,clips:n,mediaItems:i};const m=i.map(p=>c.has(p.id)?{...p,storagePath:c.get(p.id)}:p),b=n.map(p=>{const g=p.mediaId&&c.get(p.mediaId);return g?{...p,storagePath:g}:p});return s(m),l(b),{changed:!0,clips:b,mediaItems:m}}const Nr=(t,o,i,n,s,l,c,m,b,p,g,x,T,W=Zo)=>{const[_,y]=a.useState(null),z=a.useRef(!1),G=a.useRef(t),se=a.useRef(null),Z=a.useRef(null),J=a.useRef(null),v=a.useRef(0),Y=a.useRef(0),le=a.useRef(!1),$=a.useRef(i);$.current=i;const B=a.useRef(n);B.current=n;const fe=a.useRef(o);fe.current=o;const V=a.useRef(l);V.current=l;const ce=a.useRef(c);ce.current=c;const E=a.useRef(p);E.current=p;const X=a.useRef(x);X.current=x,a.useEffect(()=>{G.current=t},[t]),a.useEffect(()=>{const ge=()=>{Ir(),Fe(()=>import("./BEUlQjCE.js"),__vite__mapDeps([23,1,24])).then(Q=>Q.warmupFaceModels?.()).catch(()=>{})};if(typeof requestIdleCallback=="function"){const Q=requestIdleCallback(ge,{timeout:1500});return()=>cancelIdleCallback?.(Q)}const Re=setTimeout(ge,500);return()=>clearTimeout(Re)},[]),a.useEffect(()=>{const ge=new Set(["file","blobUrl","thumbnail","isProcessing"]),Re=ye=>{const q={};for(const[Se,pe]of Object.entries(ye))ge.has(Se)||(q[Se]=pe);return ye.mediaId&&G.current&&(q.idbKey=`idb://${G.current}:${ye.mediaId}`),q.storagePath&&q.storagePath.startsWith("blob:")&&delete q.storagePath,q},Q=ye=>{const q={};for(const[Se,pe]of Object.entries(ye))ge.has(Se)||(q[Se]=pe);return ye.id&&G.current&&(q.idbKey=`idb://${G.current}:${ye.id}`),q.blobUrl&&delete q.blobUrl,q},Ue=async()=>{if(z.current)return{saved:!1,skipReason:"in-progress"};const ye=$.current?.length||0,q=B.current?.length||0;(ye>0||q>0)&&(le.current=!0);const Se=Cr({projectId:G.current,isRestored:T?T.current:!0,hasBeenNonEmpty:le.current,clipsCount:ye,mediaItemsCount:q});if(Se.skip)return{saved:!1,skipReason:Se.reason};if(v.current>=3){if(Y.current>0)return Y.current--,{saved:!1,skipReason:"backoff"};Y.current=Math.min(Math.pow(2,v.current-3),20)}z.current=!0;try{const pe=$.current,C=B.current,me=fe.current,ae=E.current,O={id:G.current,name:me,clips:pe.map(Re),mediaItems:C.map(Q),duration:V.current,resolution:ce.current||"1080p",timelineMarkers:X.current||[]};(ae?.storagePath||ae?.mediaId)&&(O.bgMusic={name:ae.name,volume:ae.volume??.3},ae.storagePath&&(O.bgMusic.storagePath=ae.storagePath),ae.mediaId&&(O.bgMusic.mediaId=ae.mediaId));const de=Ar(pe,C),w=de?.mediaId||null;if(de&&w!==se.current)try{const I=await Ut(de.file,1);if(I&&I.size>500){se.current=w,s&&(O.thumbnail=I);const K=await new Promise(he=>{const xe=new FileReader;xe.onloadend=()=>he(xe.result),xe.readAsDataURL(I)});O.thumbnailDataUrl=K,Z.current=K}}catch(I){console.warn("Auto-save thumbnail generation failed:",I)}else Z.current&&(O.thumbnailDataUrl=Z.current);if(s){const I=await en(()=>Gt(s,O),{maxRetries:2,baseDelay:1e3,maxDelay:5e3});T&&(T.current=!0);const K=G.current;let he=!1;if(I?.id&&I.id!==K&&(G.current=I.id,K))try{await kn(K,I.id),he=!0,I.id}catch(De){console.warn("[autosave] IndexedDB re-key failed:",De)}const xe=G.current;if(xe&&At()){const De=await Lr(s,xe,B.current,$.current,m,b);if(De.changed&&($.current=De.clips,B.current=De.mediaItems),De.changed||he){const tt={id:xe,name:fe.current,clips:(De.changed?De.clips:$.current).map(Re),mediaItems:B.current.map(Q),duration:V.current,resolution:ce.current||"1080p",timelineMarkers:X.current||[],...Z.current?{thumbnailDataUrl:Z.current}:{}};E.current?.storagePath&&(tt.bgMusic={storagePath:E.current.storagePath,name:E.current.name,volume:E.current.volume??.3}),await Gt(s,tt)}const st=E.current;if(st?.file&&!st?.storagePath&&xe)try{const tt=await xo(s,xe,st.file);g(ze=>ze?{...ze,storagePath:tt}:null),await Gt(s,{id:xe,name:fe.current,clips:$.current.map(Re),mediaItems:B.current.map(Q),duration:V.current,resolution:ce.current||"1080p",timelineMarkers:X.current||[],bgMusic:{storagePath:tt,name:st.name,volume:st.volume??.3},...Z.current?{thumbnailDataUrl:Z.current}:{}})}catch(tt){console.warn("Background music upload failed:",tt)}}}else{const K=Gt(null,O).id;G.current||(G.current=K),T&&(T.current=!0);for(const xe of B.current)xe.file&&Lt(K,xe.id,xe.file,{name:xe.name,type:xe.file.type}).catch(De=>{console.warn("Failed to persist media to IndexedDB",{mediaId:xe.id,error:De?.message})});const he=E.current;he?.file&&he?.mediaId&&Lt(K,he.mediaId,he.file,{name:he.name,type:he.file.type}).catch(xe=>{console.warn("Failed to persist background music to IndexedDB",{mediaId:he.mediaId,error:xe?.message})})}return y(new Date),v.current=0,Y.current=0,{saved:!0}}catch(pe){v.current++,v.current<=1?console.warn("Auto-save failed:",pe?.message||pe):v.current===3&&console.warn(`[autosave] ${v.current} consecutive failures — backing off. Will retry less frequently.`);try{const C=fe.current,me=G.current,ae={id:me,projectName:C,clips:$.current.map(Re),mediaItems:B.current.map(Q),savedAt:new Date().toISOString()};if(localStorage.setItem(`clipcut_autosave_${C}`,JSON.stringify(ae)),me)for(const O of B.current)O.file&&Lt(me,O.id,O.file,{name:O.name,type:O.file.type}).catch(de=>{console.warn("Fallback media persist failed",{mediaId:O.id,error:de?.message})})}catch{}return{saved:!1,skipReason:"error",error:pe}}finally{z.current=!1}};J.current=Ue;const Ne=setInterval(Ue,W);return()=>clearInterval(Ne)},[s,W,m,b,g]);const Me=a.useCallback(()=>J.current?J.current():Promise.resolve({saved:!1,skipReason:"not-ready"}),[]);return{lastSaved:_,projectId:G.current,triggerSave:Me}},Or=60,$r=(t,o)=>{const[i,n]=a.useState(0),[s,l]=a.useState(!1),c=a.useRef(null),m=a.useRef(1),b=a.useRef(0),p=a.useRef(0),g=a.useRef(t);g.current=t;const x=a.useCallback(v=>{const Y=g.current.filter($=>$.type!=="audio"&&$.type!=="text").sort(($,B)=>$.startTime-B.startTime);for(const $ of Y)if(v>=$.startTime&&v<$.startTime+$.duration)return $;const le=Y[Y.length-1];return le&&Math.abs(v-(le.startTime+le.duration))<.05?le:null},[]),T=a.useMemo(()=>x(i),[x,i]),W=a.useMemo(()=>T?Math.max(0,i-T.startTime)+(T.trimStart||0):0,[T,i]),_=a.useMemo(()=>{if(!T)return null;const v=t.filter(le=>le.type!=="audio").sort((le,$)=>le.startTime-$.startTime),Y=v.findIndex(le=>le.id===T.id);return Y>=0&&Y<v.length-1?v[Y+1]:null},[T,t]),y=a.useCallback(()=>{const v=performance.now();v-p.current>=Or&&(p.current=v,n(b.current))},[]),z=a.useCallback(v=>{if(v>=o){b.current=o,n(o),l(!1);return}b.current=v,y()},[o,y]);a.useEffect(()=>{if(!s){c.current&&cancelAnimationFrame(c.current),n(b.current);return}const v=()=>{if(b.current>=o){l(!1),n(o);return}c.current=requestAnimationFrame(v)};return c.current=requestAnimationFrame(v),()=>{c.current&&cancelAnimationFrame(c.current)}},[s,o]);const G=a.useCallback(v=>{const Y=Math.max(0,Math.min(o,v));b.current=Y,n(Y)},[o]),se=a.useCallback(()=>l(v=>!v),[]),Z=a.useCallback(()=>{l(!1),b.current=0,n(0)},[]),J=a.useCallback(v=>{m.current=v},[]);return{currentTime:i,currentClip:T,clipOffset:W,nextClip:_,isPlaying:s,seek:G,togglePlay:se,stop:Z,setIsPlaying:l,setSpeed:J,setCurrentTime:n,currentTimeRef:b,speedRef:m,onVideoTime:z}},Fr=()=>{const t=tn(),o=an(),{user:i}=Jo(),[n,s]=a.useState(()=>new URLSearchParams(window.location.search).get("project")||null),[l,c]=a.useState("Untitled Project"),[m,b]=a.useState("1080p"),p=a.useRef(!1),g=a.useRef(!1);a.useEffect(()=>{const r=new URL(window.location);n?r.searchParams.set("project",n):r.searchParams.delete("project"),r.toString()!==window.location.href&&window.history.replaceState(window.history.state,"",r)},[n]);const[x,T]=a.useState("media"),[W,_]=a.useState("video"),[y,z]=a.useState("basic"),[G,se]=a.useState("local"),[Z,J]=a.useState("default"),v=ja(),Y=on(),[le,$]=a.useState(!1),[B,fe]=a.useState(!1),[V,ce]=a.useState([]),[E,X]=a.useState(!1),[Me,ge]=a.useState(!1),[Re,Q]=a.useState([]),Ue=a.useRef([]),Ne=a.useRef([]),[ye,q]=a.useState(null),[Se,pe]=a.useState(null),[C,me]=a.useState(null),[ae,O]=a.useState(()=>typeof window<"u"?window.innerWidth:1200);a.useEffect(()=>{if(Z==="wide-timeline"){const r=window.innerHeight-296,d=Math.max(320,Math.floor(window.innerHeight*.46));q(Math.max(120,Math.min(d,r)))}else(Z==="default"||Z==="compact")&&q(null)},[Z]);const de=a.useMemo(()=>ya(ae),[ae]),w=a.useMemo(()=>wa(ae),[ae]),R=a.useMemo(()=>Math.min(Se??po,de),[Se,de]),I=a.useMemo(()=>Math.min(C??mo,w),[C,w]),K=a.useCallback(r=>{const d=window.innerHeight-296,f=Math.max(120,Math.min(r,d));q(f)},[]),he=a.useCallback(r=>{const d=window.innerWidth,f=ya(d),u=C??mo,h=d-fo-u-24;pe(Math.max(200,Math.min(r,f,h)))},[C]),xe=a.useCallback(r=>{const d=window.innerWidth,f=wa(d),u=Se??po,h=d-fo-u-24;me(Math.max(220,Math.min(r,f,h)))},[Se]);a.useEffect(()=>{let r;const d=()=>{clearTimeout(r),r=setTimeout(()=>{const f=window.innerWidth;O(f);const u=ya(f),h=wa(f);pe(k=>k!=null?Math.min(k,u):null),me(k=>k!=null?Math.min(k,h):null)},150)};return window.addEventListener("resize",d),d(),()=>{clearTimeout(r),window.removeEventListener("resize",d)}},[]);const De=xa("y",K),st=xa("x",he),tt=xa("x",xe,void 0,!0),[ze,ft]=a.useState(null),[No,Oo]=a.useState(0),[$o,Fo]=a.useState(()=>!localStorage.getItem("clipcut_onboarded")),[Ee,Ae]=a.useState([]),[lt,Nt]=a.useState(null),[Ct,oa]=a.useReducer(_r,{clips:[],past:[],future:[]}),P=Ct.clips,ht=Ct.past.length>0,bt=Ct.future.length>0,[_e,Ze]=a.useState(null),[na,Ot]=a.useState([]);a.useEffect(()=>{v&&_e&&(ft("inspector"),$(!0))},[v,_e]);const at=a.useMemo(()=>P.length===0?30:Math.max(30,Math.max(...P.map(r=>r.startTime+r.duration))+10),[P]),A=$r(P,at),[Ve,gt]=a.useState(null),[Ca,Ia]=a.useState(!1),[xt,Ra]=a.useState(!1),[Ma,ra]=a.useState(0),[It,Ea]=a.useState([]),Rt=a.useRef(null),[ia,yt]=a.useState(!1),[wt,we]=a.useState(""),[_a,ct]=a.useState(""),sa=a.useRef(new Set),[$t,Pa]=a.useState(null),D=a.useCallback((r,d)=>Pa({type:r,message:d}),[]),oe=rr(),Oe=a.useMemo(()=>P.find(r=>r.id===_e),[P,_e]),Bo=a.useMemo(()=>{if(A.currentClip?.blobUrl)return A.currentClip.blobUrl;if(lt){const d=Ee.find(f=>f.id===lt)?.blobUrl;if(d)return d}return P.find(d=>d.type!=="audio"&&d.type!=="text"&&d.blobUrl)?.blobUrl||null},[A.currentClip,lt,Ee,P]),Do=a.useMemo(()=>Tr(P),[P]),zo=a.useMemo(()=>{const r=P.filter(u=>u.isCaption),d=P.filter(u=>u.type==="text"&&!u.isCaption),f=P.filter(u=>(u.type==="text"||u.type==="sticker"||u.isCaption)&&u.type!=="audio"&&A.currentTime>=u.startTime&&A.currentTime<u.startTime+u.duration);if(r.length>0&&f.filter(u=>u.isCaption).length===0){const u=r.slice(0,3);A.currentTime.toFixed(3),P.length,r.length,d.length,f.length,u.map(h=>({id:h.id,type:h.type,isCaption:h.isCaption,text:(h.text||"").slice(0,30),startTime:h.startTime,duration:h.duration,track:h.track,range:`${h.startTime?.toFixed(2)}-${(h.startTime+h.duration).toFixed(2)}`}))}return f},[P,A.currentTime]),vt=a.useRef(Ct.clips);vt.current=Ct.clips;const ue=a.useCallback(r=>{const d=vt.current,f=typeof r=="function"?r(d):r;oa({type:"SET_CLIPS",clips:f})},[]),{lastSaved:Wo,projectId:Ft,triggerSave:Bt}=Nr(n,l,P,Ee,i?.id,at,m,Ae,ue,Ve,gt,na,g);a.useEffect(()=>{Ft&&Ft!==n&&s(Ft)},[Ft,n]);const kt=a.useCallback(()=>oa({type:"UNDO"}),[]),dt=a.useCallback(()=>oa({type:"REDO"}),[]),Pe=a.useCallback((r,d)=>ue(f=>f.map(u=>u.id===r?{...u,...d}:u)),[ue]),Aa=a.useCallback(r=>ue(d=>d.map(f=>f.isCaption?{...f,...r}:f)),[ue]),Dt=a.useCallback(r=>{ue(d=>d.filter(f=>f.id!==r)),_e===r&&Ze(null)},[ue,_e]),zt=a.useCallback((r,d=null)=>{let f=d;if(f===null){const h=vt.current.filter(U=>U.type===r.type),k=h.length>0?h.reduce((U,L)=>U.startTime+U.duration>L.startTime+L.duration?U:L):null;f=k?k.startTime+k.duration:0}const u={...ha,id:Zt(),mediaId:r.id,name:r.name,type:r.type,startTime:f,duration:r.duration||Qo,file:r.file,blobUrl:r.blobUrl,thumbnail:r.thumbnail};ue(h=>[...h,u]),Ze(u.id),setTimeout(()=>Bt(),100)},[ue,Bt]),Wt=a.useCallback(async r=>{Ia(!0);try{let d=n;if(d||(d=`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s(d)),r.length>0&&l==="Untitled Project"){const h=(r.find(k=>k.type.startsWith("video/"))||r[0]).name.replace(/\.[^.]+$/,"").trim();h&&c(h)}let f=0;for(const u of r){we(`Importing ${u.name}...`),ct(`${++f} of ${r.length}`);const h=Zt(),k=URL.createObjectURL(u);Lt(d,h,u,{name:u.name,type:u.type}).catch(L=>console.warn("[import] IndexedDB store failed:",u.name,L));const U=u.type.startsWith("audio/");Ae(L=>[...L,{id:h,name:u.name,file:u,blobUrl:k,thumbnail:null,duration:0,width:0,height:0,type:U?"audio":"video",isProcessing:!0}]);try{const L=await Jt(u);if(Ae(H=>H.map(ne=>ne.id===h?{...ne,duration:L.duration,width:L.width,height:L.height,isProcessing:!1}:ne)),!U)try{const H=`${u.name}_${u.size}_${u.lastModified}`,ne=await lr(H,0),M=ne||await Ut(u,0);ne||cr(H,0,M).catch(()=>{});const ee=URL.createObjectURL(M);Ae(ke=>ke.map(We=>We.id===h?{...We,thumbnail:ee}:We))}catch(H){console.warn("Thumbnail generation failed:",H)}}catch(L){if(!U&&/\.(mov|avi|mkv|flv|wmv)$/i.test(u.name))try{we(`Converting ${u.name} to MP4...`),oe.isReady||await oe.initialize();const ne=await oe.convertFormat(u,"mp4"),M=new File([ne],u.name.replace(/\.\w+$/,".mp4"),{type:"video/mp4"}),ee=URL.createObjectURL(M);URL.revokeObjectURL(k);const ke=await Jt(M);Ae(j=>j.map(N=>N.id===h?{...N,file:M,blobUrl:ee,duration:ke.duration,width:ke.width,height:ke.height,isProcessing:!1}:N));const We=await Ut(M,0).catch(()=>null);if(We){const j=URL.createObjectURL(We);Ae(N=>N.map(te=>te.id===h?{...te,thumbnail:j}:te))}D("info",`Converted ${u.name} to MP4`)}catch(ne){console.error("Auto-convert failed:",ne),Ae(M=>M.map(ee=>ee.id===h?{...ee,isProcessing:!1}:ee))}else console.error("Error processing:",L),Ae(ne=>ne.map(M=>M.id===h?{...M,isProcessing:!1}:M))}}D("success",`Imported ${r.length} file${r.length>1?"s":""}`)}catch(d){D("error",`Import failed: ${d.message}`)}finally{Ia(!1),we(""),ct("")}},[D,n,l]),la=a.useRef(null);a.useEffect(()=>{const r=P.find(ee=>ee.type!=="audio"&&ee.type!=="text"&&ee.type!=="sticker"&&!ee.isCaption&&(ee.file||ee.blobUrl||ee.mediaId));if(!r){Q([]),la.current=null;return}const d=r.mediaId?Ee.find(ee=>ee.id===r.mediaId):null,f=r.file||d?.file||null,u=r.blobUrl||d?.blobUrl||null;if(!f&&!u){Q([]);return}const h=r.trimStart||0,k=r.trimEnd||0,U=r.duration||0,L=P.some(ee=>ee.isCaption),H=f?`${f.size}:${f.lastModified}`:String(u||""),ne=`${r.id}|${r.mediaId||""}|${h}|${k}|${U}|${L}|${H}`;if(ne===la.current)return;la.current=ne;const M={...r,file:f||void 0,blobUrl:u||void 0};Fe(async()=>{const{analyzeVideo:ee}=await import("./69h2CKib.js");return{analyzeVideo:ee}},__vite__mapDeps([25,26,3,1,4])).then(({analyzeVideo:ee})=>{ee(M,{hasCaptions:L}).then(ke=>{Q(ke.length>0?ke:[])}).catch(()=>{Q([])})})},[P,Ee]);const Vt=a.useCallback(r=>{const d=Sn(r,{allowedCategories:["audio"],category:"audio"});if(!d.valid){D("warning",d.error||"Please select an audio file");return}Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl);const f=URL.createObjectURL(r),u=`bgm-${Date.now()}`;gt({file:r,name:r.name,blobUrl:f,volume:.3,mediaId:u});const h=n||`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Lt(h,u,r,{name:r.name,type:r.type}).catch(k=>console.warn("[bgMusic] IndexedDB store failed:",k)),D("success",`Background music: ${r.name}`)},[Ve,D,n]),Kt=a.useCallback(r=>{gt(d=>d?{...d,volume:r}:null)},[]),Ht=a.useCallback(()=>{Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl),gt(null),D("info","Background music removed")},[Ve,D]),Ua=a.useCallback(r=>{Ae(d=>{const f=d.find(u=>u.id===r);return f&&requestAnimationFrame(()=>{f.blobUrl&&URL.revokeObjectURL(f.blobUrl),f.thumbnail&&URL.revokeObjectURL(f.thumbnail)}),d.filter(u=>u.id!==r)}),ue(d=>(d.filter(f=>f.mediaId===r).forEach(f=>{f.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(f.blobUrl))}),d.filter(f=>f.mediaId!==r))),lt===r&&Nt(null)},[lt,ue]),Yt=a.useCallback((r,d)=>{const f=vt.current.find(k=>k.id===r);if(!f)return;const u={...f,id:Zt(),name:`${f.name} (1)`,duration:d},h={...f,id:Zt(),name:`${f.name} (2)`,startTime:f.startTime+d,duration:f.duration-d,trimStart:(f.trimStart||0)+d};ue(k=>{const U=k.findIndex(H=>H.id===r),L=[...k];return L.splice(U,1,u,h),L}),Ze(u.id),D("success","Clip split")},[ue,D]),ot=a.useCallback(r=>{ue(d=>[...d,r]),Ze(r.id)},[ue]),La=a.useCallback(r=>{ue(()=>r),Ze(null),D("success","Clip deleted (ripple)")},[ue,D]);a.useCallback(async(r,d,f)=>{const u=vt.current.find(h=>h.id===r);if(u?.file){yt(!0),we("Trimming...");try{const h=await oe.trimVideo(u.file,d,f),k=URL.createObjectURL(h);ue(U=>U.map(L=>L.id===r?{...L,file:h,blobUrl:k,duration:f}:L)),u.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(u.blobUrl)),D("success","Clip trimmed")}catch(h){D("error",ta(h,"ffmpeg"))}finally{yt(!1),we(""),oe.resetProgress()}}},[oe,ue,D]),a.useCallback(async(r,d,f)=>{let u=r.file;const h=r.speed&&r.speed!==1,k=r.brightness||r.contrast,U=r.saturation!==void 0&&r.saturation!==1,L=r.rotation&&[90,180,270,-90].includes(r.rotation),H=r.volume!==void 0&&r.volume!==1||r.isMuted,ne=r.fadeIn&&r.fadeIn>0||r.fadeOut&&r.fadeOut>0,M=r.filterName,ee=r.trimStart>0||r.trimEnd>0,ke=r.effects?.some(te=>te.enabled),We=r.text&&r.text.trim().length>0;if(!h&&!k&&!U&&!L&&!H&&!ne&&!M&&!ee&&!ke&&!We)return u;const N=`clip ${d+1}/${f}`;if(ee&&(we(`Trimming ${N}...`),u=await oe.trimVideo(u,r.trimStart,r.duration)),h&&(we(`Adjusting speed for ${N}...`),u=await oe.changeSpeed(u,r.speed)),k&&(we(`Adjusting colors for ${N}...`),u=await oe.adjustBrightnessContrast(u,r.brightness||0,r.contrast||0)),U&&(we(`Adjusting saturation for ${N}...`),u=await oe.adjustSaturation(u,r.saturation)),L&&(we(`Rotating ${N}...`),u=await oe.rotateVideo(u,r.rotation)),H&&(we(`Adjusting audio for ${N}...`),u=await oe.adjustVolume(u,r.isMuted?0:r.volume)),ne&&(we(`Adding fade to ${N}...`),u=await oe.addFade(u,r.fadeIn||0,r.fadeOut||0,r.duration)),M){const te=Mn.find(be=>be.name===r.filterName);te?.filter&&(we(`Applying ${r.filterName} filter to ${N}...`),u=await oe.applyFilter(u,te.filter))}if(ke)for(const te of r.effects.filter(be=>be.enabled))te.type==="blur"&&te.params?.radius?(we(`Applying ${te.name} to ${N}...`),u=await oe.applyBlur(u,te.params.radius)):te.type==="sharpen"&&te.params?.strength&&(we(`Applying ${te.name} to ${N}...`),u=await oe.applySharpen(u,te.params.strength));return We&&(we(`Adding text overlay to ${N}...`),u=await oe.addTextOverlay(u,r.text,{position:r.textPosition||"bottom-center",fontSize:r.textSize||48,fontColor:r.textColor||"white",backgroundColor:r.textBgColor||null,startTime:r.textStartTime||0,duration:r.textDuration||0})),u},[oe]);const Vo=a.useCallback(()=>{P.length>0&&!window.confirm("Start a new project? Unsaved changes will be lost.")||(ue([]),c("Untitled Project"),s(null),p.current=!1,g.current=!1,Ae([]),Ze(null),Nt(null),Ot([]),D("info","New project created"))},[P.length,D,ue]),Ko=a.useCallback(async()=>{const r=await Bt();if(r?.saved){D("success","Project saved");return}switch(r?.skipReason){case"restore-in-progress":D("info","Project still loading — try again in a moment");break;case"empty-without-session-edit":D("info","Nothing to save yet — add media or clips first");break;case"in-progress":D("info","Save already in progress");break;case"backoff":D("warning","Previous saves failed — retrying shortly");break;case"error":D("error",`Save failed${r?.error?.message?": "+r.error.message:""}`);break;default:D("info","Save skipped")}},[Bt,D]),Ho=a.useCallback(()=>{o("/settings")},[o]),Xt=a.useCallback(async r=>{const d=Date.now();if(Ne.current=Ne.current.filter(h=>d-h<6e4),Ne.current.length>=10){ce(h=>[...h,{id:`e-${d}`,role:"assistant",text:"Rate limit reached. Please wait a moment before sending more prompts."}]);return}Ne.current.push(d);const f={id:`u-${d}`,role:"user",text:r};if(ce(h=>[...h,f]),!P.some(h=>h.type==="video"||h.type==="audio"||h.type==="image")){const{parseIntentLocally:h}=await Fe(async()=>{const{parseIntentLocally:U}=await import("./DHOgBFtu.js");return{parseIntentLocally:U}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2]));if(h(r)){const U=()=>{v&&(ft("media"),$(!0))};ce(L=>[...L,{id:`g-${d}`,role:"assistant",text:"Please import a video first to use AI editing.",openMedia:v?U:void 0}]);return}}X(!0),ge(!1);try{const{executeAiEdit:h}=await Fe(async()=>{const{executeAiEdit:M}=await import("./DHOgBFtu.js");return{executeAiEdit:M}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2])),k={duration:at,hasAudio:P.some(M=>M.type==="audio"||M.type==="video"&&M.file),clipCount:P.length,currentTime:A.currentTime,hasCaptions:P.some(M=>M.isCaption),filters:[...new Set(P.filter(M=>M.filterName).map(M=>M.filterName))].join(",")||void 0,tracks:P.reduce((M,ee)=>Math.max(M,(ee.track||0)+1),0)},U=V.slice(-10).map(M=>({role:M.role,content:M.role==="assistant"&&M.actions?.length?`[Actions: ${M.actions.join(", ")}] ${M.text}`:M.text})),L=JSON.parse(JSON.stringify(P.map(M=>{const{file:ee,...ke}=M;return ke}))),H=new Map(P.filter(M=>M.file).map(M=>[M.id,M.file])),ne=await h(r,k,{clips:P,setClips:ue,updateClip:Pe,addClip:M=>{ue(ee=>[...ee,{...ha,id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...M}])},getClips:()=>vt.current,splitClip:Yt,selectedClipId:_e,mediaItems:Ee},{history:U,onSlowResponse:()=>ge(!0)});if(ne.isChat)ce(M=>[...M,{id:`a-${Date.now()}`,role:"assistant",text:ne.summary}]);else{const M=`ai-${Date.now()}`;Ue.current.push({id:M,snapshot:L,filesMap:H});const ee={id:`a-${Date.now()}`,role:"assistant",text:ne.summary||"Done!",actions:ne.actionLabels||[],canUndo:!0,onUndo:()=>{const ke=Ue.current.find(We=>We.id===M);if(ke){const We=ke.snapshot.map(j=>{const N=ke.filesMap.get(j.id);return N?{...j,file:N}:j});ue(We),Ue.current=Ue.current.filter(j=>j.id!==M),ce(j=>j.map(N=>N.id===ee.id?{...N,canUndo:!1}:N)),D("info","AI edit undone")}}};ce(ke=>[...ke,ee])}}catch(h){const k={id:`e-${Date.now()}`,role:"assistant",text:`Error: ${h.message||"Something went wrong. Please try again."}`};ce(U=>[...U,k])}finally{X(!1),ge(!1)}},[P,ue,Pe,Yt,_e,Ee,at,A.currentTime,V]),Na=a.useCallback(r=>{Xt(r.title)},[Xt]),ca=a.useCallback(()=>{fe(r=>!r),v&&(ft("ai"),$(r=>!r))},[v]),Oa=a.useCallback((r,d,f)=>{const u=f==="mp4"?"mp4":"webm",h=URL.createObjectURL(r),k=document.createElement("a");k.href=h,k.download=`${Ur(d||l)}.${u}`,document.body.appendChild(k),k.click(),document.body.removeChild(k),setTimeout(()=>URL.revokeObjectURL(h),2e3)},[l]),Yo=a.useCallback(()=>{Rt.current&&(Rt.current.abort(),Rt.current=null)},[]),Mt=a.useCallback(async(r,d={})=>{if(P.length===0){D("warning","No clips to export. Add media to the timeline first.");return}const f=P.filter(k=>k.type!=="audio"&&k.file).sort((k,U)=>k.startTime-U.startTime);if(f.length===0){D("warning","No video clips with valid files. Make sure your clips are properly loaded.");return}if(xt){Ea(k=>[...k,r]),D("info",`Queued export at ${r} (${It.length+1} in queue)`);return}A.isPlaying&&A.setIsPlaying(!1),Ra(!0),ra(0),we("Preparing export..."),ct("");let u=r;if(r.startsWith("preset:")){const k=r.slice(7),U=aa[k];U&&(U.width<=854?u="480p":U.width<=1280?u="720p":u="1080p")}const h=new AbortController;Rt.current=h;try{const k=await hr({clips:[...f,...P.filter(U=>U.type==="text"||U.type==="sticker")],bgMusic:Ve,totalDuration:Math.max(...f.map(U=>U.startTime+U.duration)),resolution:u,settings:d,onProgress:({percent:U,elapsed:L,eta:H,label:ne})=>{ra(U),we(ne||"Exporting..."),ct(`${U}%  ·  Elapsed ${L}  ·  ETA ${H}`)},abortSignal:h.signal});if(!k.blob||k.blob.size===0)throw new Error("Export produced an empty file.");Oa(k.blob,d.filename||l,d.format||"webm"),D("success",`Exported at ${u} (${(k.size/(1024*1024)).toFixed(1)} MB)`)}catch(k){k.message==="Export cancelled."?D("info","Export cancelled."):(console.error("Export error:",k),D("error",k.message||"Export failed. Please try again."))}finally{Ra(!1),ra(0),we(""),ct(""),Rt.current=null}},[P,l,A,D,Ve,Oa,xt,It,at]);a.useEffect(()=>{if(!xt&&It.length>0){const[r,...d]=It;Ea(d),Mt(r)}},[xt,It,Mt]);const Xo=a.useCallback(r=>{A.seek(r)},[A]),da=a.useCallback(()=>{if(!A.currentClip){A.setIsPlaying(!1);return}const d=P.filter(f=>f.type!=="audio").sort((f,u)=>f.startTime-u.startTime).find(f=>f.startTime>A.currentClip.startTime);d&&A.isPlaying?A.seek(d.startTime):A.setIsPlaying(!1)},[A,P]),Go=a.useCallback(r=>{if(A.currentClip){const d=A.currentClip.trimStart||0,f=d+A.currentClip.duration;if(A.isPlaying&&r>=f-.01){da();return}const u=A.currentClip.startTime+(r-d);A.isPlaying?A.onVideoTime(u):A.setCurrentTime(u)}else A.isPlaying||A.setCurrentTime(r)},[A,da]),qo=a.useCallback(async r=>{if(!(!r||!oe.isReady)&&!sa.current.has(r)){sa.current.add(r),yt(!0),we("Converting video to web-compatible format...");try{let d=null,f=null,u=!1;const h=Ee.find(L=>L.blobUrl===r);if(h&&h.file)d=h.file,f=h.id,u=!1;else{const L=P.find(H=>H.blobUrl===r);L&&L.file&&(d=L.file,f=L.id,u=!0)}if(!d){D("error","Could not find source file for conversion");return}const k=await oe.convertToWebFormat(d),U=URL.createObjectURL(k);u?ue(L=>L.map(H=>H.id===f?(H.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(H.blobUrl)),{...H,file:k,blobUrl:U}):H)):(Ae(L=>L.map(H=>H.id===f?(H.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(H.blobUrl)),{...H,file:k,blobUrl:U}):H)),ue(L=>L.map(H=>H.mediaId===f?(H.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(H.blobUrl)),{...H,file:k,blobUrl:U}):H))),D("success","Video converted successfully")}catch(d){D("error",ta(d,"ffmpeg"))}finally{sa.current.delete(r),yt(!1),we(""),oe.resetProgress()}}},[oe,Ee,P,ue,D]),$a=a.useRef(null);a.useEffect(()=>{const r=t.state?.filesToImport;r?.length&&$a.current!==r&&($a.current=r,window.history.replaceState({...t.state,filesToImport:null},""),Wt(r))},[t.state?.filesToImport,Wt]),a.useEffect(()=>{const r=t.state?.projectId,d=t.state?.projectData,f=t.state?.projectName,u=new URLSearchParams(window.location.search).get("project"),h=r||u||null;if(!h||p.current===h||(p.current=h,At()&&!i?.id))return;let k=!1;const U=async j=>{const N=j.project_data?.bgMusic;if(!N)return;let te=null,be=null;if(N.mediaId)try{const ve=await St(h,N.mediaId);ve&&(te=ve.file,be=ve.blobUrl)}catch(ve){console.warn("[restoreBgMusic] IndexedDB load failed:",ve)}if(!be&&N.storagePath&&At())try{const ve=await Ka(N.storagePath),Ke=await fetch(ve);if(Ke.ok){const re=await Ke.blob();te=new File([re],N.name||"bgm",{type:re.type}),be=URL.createObjectURL(re)}}catch(ve){console.warn("[restoreBgMusic] Supabase download failed:",ve)}be&&gt({file:te,name:N.name||"Background",blobUrl:be,volume:N.volume??.3,storagePath:N.storagePath,mediaId:N.mediaId})},L=j=>{if(!j||!j.startsWith("idb://"))return null;const N=j.slice(6),te=N.lastIndexOf(":");return te<0?null:{idbProjectId:N.slice(0,te),idbMediaId:N.slice(te+1)}},H=j=>j?.startsWith("audio/")?"audio":j?.startsWith("image/")?"image":"video",ne=(j,N,te=null)=>Promise.race([j,new Promise(be=>setTimeout(()=>be(te),N))]),M=async(j,N=[])=>{let te=null,be=null;const ve=j.mediaId||j.id||null;j.name,j.type,j.idbKey,j.storagePath;const Ke=L(j.idbKey);if(Ke)try{Ke.idbProjectId,Ke.idbMediaId;const re=await ne(St(Ke.idbProjectId,Ke.idbMediaId),2e3);re?(te=re.file,be=re.blobUrl,j.name,re.file?.size):console.warn("[restore] IndexedDB MISS (null):",j.idbKey)}catch(re){console.warn("[restore] IndexedDB load failed:",j.idbKey,re)}else j.name,j.type;if(!be&&ve)try{const re=await ne(St(h,ve),2e3);re?(te=re.file,be=re.blobUrl,j.name):console.warn("[restore] Fallback IndexedDB MISS:",h,ve)}catch(re){console.warn("[restore] IndexedDB fallback load failed:",ve,re)}if(!be&&ve)try{const re=N.find($e=>$e.mediaId===ve);if(re){re.key;const $e=await ne(St(re.projectId,re.mediaId),2e3);$e&&(te=$e.file,be=$e.blobUrl)}}catch(re){console.warn("[restore] IndexedDB scan failed:",re)}if(!be&&j.storagePath&&At()&&!j.storagePath.startsWith("blob:"))try{j.storagePath;const re=await ne(Ka(j.storagePath),5e3);if(!re)throw new Error("Supabase URL timed out");const $e=new AbortController,ua=setTimeout(()=>$e.abort(),8e3),Et=await fetch(re,{signal:$e.signal});if(clearTimeout(ua),Et.ok){const ut=await Et.blob();te=new File([ut],j.name||"media",{type:ut.type}),be=URL.createObjectURL(ut),j.name}}catch(re){console.warn("[restore] Supabase download failed:",j.storagePath,re)}return!be&&j.type!=="text"&&console.error("[restore] FAILED to resolve media for:",j.name,j.type,"— all sources exhausted"),{file:te,blobUrl:be}},ee=/^(draft-|local_)/.test(h),ke=()=>({name:f||"Untitled Project",project_data:{clips:[],mediaItems:[]}});return(async()=>{yt(!0),we("Restoring media...");try{let j=d;if(!j){if(ee)j=ke();else if(!At())j=await Va(h,null);else if(i?.id)try{j=await Va(h,i.id)}catch(S){if(S?.code==="PGRST116")console.warn("[restore] Supabase has no row for",h,"— attempting IndexedDB-only recovery"),j=ke();else throw S}}if(j||(console.warn("[restore] No project data found for",h,"— attempting IndexedDB-only recovery"),j=ke()),k)return;window.history.replaceState({...t.state,projectId:null,projectData:null,projectName:null},"");const N=f||j.name||"Untitled Project";c(bo(N,{maxLength:100})||"Untitled Project"),s(h),j.resolution&&b(j.resolution);const te=j.project_data?.timelineMarkers??j.timelineMarkers;Ot(Array.isArray(te)?te.filter(S=>S&&typeof S.time=="number"&&Number.isFinite(S.time)&&S.time>=0).map((S,F)=>({id:typeof S.id=="string"&&S.id?S.id:`mk-${F}-${Math.round(S.time*1e3)}`,time:S.time})):[]);const be=j.project_data?.clips||j.clips||[],ve=j.project_data?.mediaItems||[],Ke=await ne(vn(),3e3,[]);if(be.length,ve.length,be.map(S=>({name:S.name,type:S.type,mediaId:S.mediaId,idbKey:S.idbKey,storagePath:S.storagePath})),ve.map(S=>({id:S.id,name:S.name,idbKey:S.idbKey})),be.length===0&&ve.length===0){const S=Ke.filter(Te=>Te.projectId===h),F=[];for(const Te of S)try{const Ce=await ne(St(h,Te.mediaId),3e3);if(!Ce)continue;F.push({id:Te.mediaId,name:Te.name||"media",file:Ce.file,blobUrl:Ce.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:H(Te.mime),isProcessing:!1,idbKey:`idb://${h}:${Te.mediaId}`,_mediaError:null})}catch(Ce){console.warn("[recover] load failed for",Te.mediaId,Ce)}if(k)return;await U(j);let ie=0;if(F.length===0){const Te=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,Ce=Ke.filter(Le=>Le.projectId&&Le.projectId!==h&&!Te.test(Le.projectId)),Ie=new Set;for(const Le of Ce)if(!Ie.has(Le.mediaId)){Ie.add(Le.mediaId);try{const pt=await ne(St(Le.projectId,Le.mediaId),3e3);if(!pt)continue;F.push({id:Le.mediaId,name:Le.name||"media",file:pt.file,blobUrl:pt.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:H(Le.mime),isProcessing:!1,idbKey:`idb://${Le.projectId}:${Le.mediaId}`,_mediaError:null}),ie++}catch(pt){console.warn("[recover-orphan] load failed for",Le.mediaId,pt)}}ie>0&&console.warn(`[recover-orphan] Surfacing ${ie} orphan media file(s) from stale projectIds`)}if(F.length>0){Ae(F);for(const Ce of F)Ce.type!=="audio"&&(async()=>{try{const Ie=await Jt(Ce.file);Ae(ma=>ma.map(nt=>nt.id===Ce.id?{...nt,duration:Ie.duration||nt.duration,width:Ie.width,height:Ie.height}:nt));const Le=await Ut(Ce.file,0),pt=URL.createObjectURL(Le);Ae(ma=>ma.map(nt=>nt.id===Ce.id?{...nt,thumbnail:pt}:nt))}catch(Ie){console.warn("[recover] metadata regen failed:",Ce.name,Ie)}})();g.current=!0;const Te=ie>0?`Surfaced ${ie} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`:`Recovered ${F.length} media file(s) from local cache — re-add them to the timeline, then save`;D("warning",Te);return}g.current=!0,D("info",`Loaded project "${N}" (no clips)`);return}we("Restoring media...");const re=new Map,$e=new Map;for(const S of ve){const F=S.id||S.mediaId;F&&!$e.has(F)&&$e.set(F,S)}for(const S of be){const F=S.mediaId||S.id;S.type!=="text"&&F&&!$e.has(F)&&$e.set(F,S)}ct(`Resolving ${$e.size} media files...`);const ua=await Promise.all([...$e.entries()].map(async([S,F])=>{if(k)return null;const ie=await M(F,Ke);return{mediaId:S,resolved:ie,meta:F}}));for(const S of ua){if(!S||k)continue;const{mediaId:F,resolved:ie,meta:Te}=S;ie.blobUrl&&re.set(F,{blobUrl:ie.blobUrl,file:ie.file,meta:Te})}const Et=[];for(const S of be){let F=null,ie=null;const Te=S.mediaId||S.id;if(Te&&re.has(Te)){const Ie=re.get(Te);F=Ie.blobUrl,ie=Ie.file}const Ce=!F&&S.type!=="text";Et.push({...ha,...S,file:ie||null,blobUrl:F||null,thumbnail:null,_mediaError:Ce?"Media not found — re-import":null})}const ut=new Map;for(const[S,F]of re){const ie=F.meta||{};ut.set(S,{id:S,name:ie.name||"media",file:F.file,blobUrl:F.blobUrl,thumbnail:null,duration:ie.duration||0,width:ie.width||0,height:ie.height||0,type:ie.type||"video",isProcessing:!1,storagePath:ie.storagePath,_mediaError:null})}const pa=[],Da=new Set;for(const S of ve){const F=S.id||S.mediaId,ie=F?ut.get(F):null;pa.push({id:F,name:S.name||ie?.name||"media",file:ie?.file||null,blobUrl:ie?.blobUrl||null,thumbnail:null,duration:ie?.duration??S.duration??0,width:ie?.width??S.width??0,height:ie?.height??S.height??0,type:S.type||ie?.type||"video",isProcessing:!1,storagePath:S.storagePath||ie?.storagePath,idbKey:S.idbKey,_mediaError:ie?.blobUrl||S.type==="audio"?null:"Media not found — re-import"}),F&&Da.add(F)}for(const[S,F]of ut)Da.has(S)||pa.push(F);const _t=jr({restoredClips:Et,mediaItems:pa,projectName:N});Ae(_t.mediaItems),ue(_t.clips),await U(j);for(const S of _t.mediaItems)!S.file||S.type==="audio"||(async()=>{try{const F=await Jt(S.file);Ae(Ce=>Ce.map(Ie=>Ie.id===S.id?{...Ie,duration:F.duration||Ie.duration,width:F.width,height:F.height}:Ie));const ie=await Ut(S.file,0),Te=URL.createObjectURL(ie);Ae(Ce=>Ce.map(Ie=>Ie.id===S.id?{...Ie,thumbnail:Te}:Ie))}catch(F){console.warn("[restore] Thumbnail regen failed:",S.name,F)}})();g.current=!0,D(_t.notification.level,_t.notification.message)}catch(j){console.error("Project load error:",j),D("error","Failed to load project")}finally{k||(yt(!1),we(""),ct(""))}})(),()=>{k=!0}},[i?.id,t.state?.projectId,D,gt,ue]),a.useEffect(()=>{oe.preload()},[]),a.useEffect(()=>{const r=d=>{const f=d.ctrlKey||d.metaKey;if(f&&d.shiftKey&&d.key==="E"){d.preventDefault(),ca();return}if(d.key==="Escape"&&B){fe(!1);return}const u=document.activeElement;if(!(d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA"||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA"||u?.isContentEditable)){if(d.key==="/"&&B){d.preventDefault(),document.querySelector(".ai-input-box")?.focus();return}if((d.key==="Delete"||d.key==="Backspace")&&_e){d.preventDefault(),Dt(_e);return}f&&d.key==="s"&&d.preventDefault(),f&&d.key==="e"&&(d.preventDefault(),P.length>0&&Mt("1080p")),f&&d.key==="z"&&(d.preventDefault(),d.shiftKey?dt():kt()),f&&d.key==="y"&&(d.preventDefault(),dt())}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[Mt,kt,dt,P.length,A,B,ca,_e,Dt]);const Fa=a.useRef(Ee),Ba=a.useRef(P);return a.useEffect(()=>{Fa.current=Ee},[Ee]),a.useEffect(()=>{Ba.current=P},[P]),a.useEffect(()=>()=>{Fa.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl),r.thumbnail&&URL.revokeObjectURL(r.thumbnail)}),Ba.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl)})},[]),e.jsxs("div",{style:{...et.root,...v?{height:"100dvh",...Y?{paddingBottom:0,paddingRight:"44px"}:{paddingBottom:"56px"}}:{}},role:"application","aria-label":"ClipCut Video Editor",children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("style",{children:Mr}),!v&&e.jsx("a",{href:"#editor-timeline",className:"skip-link",children:"Skip to timeline"}),e.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"},children:xt?`Exporting video... ${Ma}%`:wt||""}),e.jsx($n,{projectName:l,onProjectNameChange:c,onExport:Mt,isExporting:xt,exportProgress:Ma,currentOperation:wt,hasMediaToExport:P.filter(r=>r.type!=="audio"&&r.file).length>0,resolutions:go,exportPresets:aa,exportSubMessage:_a,lastSaved:Wo,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,onCancelExport:Yo,onNewProject:Vo,onSave:Ko,onSettings:Ho,editorLayout:Z,onLayoutChange:J,forceOpenExport:No>0,onExportModalClosed:()=>Oo(0),onAiToggle:ca,aiPanelOpen:B}),!v&&e.jsx(zn,{activeToolbar:x,onToolbarChange:T}),e.jsxs("main",{"aria-label":"Editor workspace",style:{flex:v?1:Z==="wide-timeline"?"0 1 48%":"1 1 0%",display:"flex",flexDirection:v&&Y?"row":v?"column":"row",minWidth:0,minHeight:v?0:"200px",overflow:"hidden",zIndex:0},children:[Z!=="compact"&&!v&&e.jsxs(e.Fragment,{children:[e.jsx(mt,{name:"left-panel",inline:!0,message:"Panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${R}px`}),children:e.jsx("div",{style:{width:`${R}px`,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0e1218"},children:e.jsxs("div",{style:{flex:"1 1 0%",overflow:"hidden auto",minHeight:0},className:"cs",children:[x==="media"&&e.jsx(to,{mediaTab:G,onMediaTabChange:se,mediaItems:Ee,onImportMedia:Wt,onRemoveMedia:Ua,onAddToTimeline:zt,selectedMediaId:lt,onSelectMedia:Nt,isImporting:Ca,style:ho}),x==="text"&&e.jsx(no,{selectedClip:Oe,onClipUpdate:Pe,onAddClip:ot,currentTime:A.currentTime}),x==="audio"&&e.jsx(ro,{selectedClip:Oe,onClipUpdate:Pe,bgMusic:Ve,onImportBgMusic:Vt,onUpdateBgMusicVolume:Kt,onRemoveBgMusic:Ht}),x==="captions"&&e.jsx(co,{clips:P,onAddClip:ot,onSetClips:ue,currentTime:A.currentTime,mediaItems:Ee,selectedClip:Oe,selectedClipId:_e,onSelectClip:Ze,onClipUpdate:Pe}),x==="stickers"&&e.jsx(io,{onAddClip:ot,currentTime:A.currentTime}),x==="effects"&&e.jsx(so,{selectedClip:Oe,onClipUpdate:Pe}),x==="transition"&&e.jsx(ao,{rightTab:"video",onRightTabChange:_,rightSubTab:"basic",onRightSubTabChange:z,selectedClip:Oe,onClipUpdate:Pe,onAllCaptionsUpdate:Aa,clips:P,bgMusic:Ve,onImportBgMusic:Vt,onUpdateBgMusicVolume:Kt,onRemoveBgMusic:Ht,style:ho}),x==="filters"&&e.jsx(lo,{selectedClip:Oe,onClipUpdate:Pe})]})})})}),e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>st(r,R),onDoubleClick:()=>pe(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})})]}),e.jsx("div",{style:v&&Y?{flex:"0 0 60%",display:"flex",flexDirection:"column",minWidth:0}:{flex:"1 1 0%",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},children:e.jsx(mt,{name:"player",inline:!0,message:"Video player encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"auto",height:"100%"}),children:e.jsx(Rr,{isPlaying:A.isPlaying,onPlayPause:A.togglePlay,videoSrc:Bo,currentTime:A.clipOffset,duration:at,onTimeUpdate:Go,onSeek:Xo,onEnded:da,onVideoError:qo,clipProperties:A.currentClip||Oe,textOverlays:zo,selectedClipId:_e,onClipUpdate:Pe,onSelectClip:Ze,hasTimelineClips:P.some(r=>r.type!=="audio"&&r.type!=="text"),hasUnavailableMediaClips:Do,isRestoringMedia:ia&&wt.includes("Restoring")})})})}),Z!=="compact"&&!v&&Oe&&!B&&e.jsxs("div",{className:"inspector-enter",style:{display:"flex",flexDirection:"row",flexShrink:0,width:`${I+8}px`,overflow:"hidden"},children:[e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>tt(r,I),onDoubleClick:()=>me(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})}),e.jsx(mt,{name:"inspector",inline:!0,message:"Inspector panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${I}px`}),children:e.jsx(ao,{rightTab:W,onRightTabChange:_,rightSubTab:y,onRightSubTabChange:z,selectedClip:Oe,onClipUpdate:Pe,onAllCaptionsUpdate:Aa,clips:P,bgMusic:Ve,onImportBgMusic:Vt,onUpdateBgMusicVolume:Kt,onRemoveBgMusic:Ht,style:{width:`${I}px`}})})})]}),!v&&B&&e.jsx(mt,{name:"ai-chat",inline:!0,message:"AI panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"360px"}),children:e.jsx(uo,{isOpen:B,onClose:()=>fe(!1),messages:V,isThinking:E,slowHint:Me,onSendMessage:Xt,suggestions:Re,onApplySuggestion:Na})})}),v&&e.jsxs("div",{style:Y?{flex:"0 0 40%",display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden",borderLeft:"1px solid rgba(117,170,219,0.08)"}:{display:"contents"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"44px",padding:"0 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",flexShrink:0},children:[e.jsx("button",{onClick:()=>{const r=document.querySelector(".player-container");r&&(r.requestFullscreen?.()||r.webkitRequestFullscreen?.())},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Fullscreen",children:e.jsx(je,{i:"fullscreen",s:20,c:"#94a3b8"})}),e.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:"12px",letterSpacing:"0.5px",color:"#e2e8f0",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:Za(A.currentTime)}),e.jsx("span",{style:{color:"#475569"},children:"/"}),e.jsx("span",{style:{color:"#94a3b8"},children:Za(at)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2px"},children:[e.jsx("button",{onClick:kt,disabled:!ht,style:{background:"none",border:"none",cursor:ht?"pointer":"not-allowed",opacity:ht?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Undo",children:e.jsx(je,{i:"undo",s:18,c:"#94a3b8"})}),e.jsx("button",{onClick:dt,disabled:!bt,style:{background:"none",border:"none",cursor:bt?"pointer":"not-allowed",opacity:bt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Redo",children:e.jsx(je,{i:"redo",s:18,c:"#94a3b8"})})]})]}),_e&&e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"4px",height:"64px",padding:"4px 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",flexShrink:0,transition:"height 0.2s ease, opacity 0.2s ease"},children:[{icon:"volume_off",label:"Mute clip audio",action:()=>Pe(_e,{volume:Oe?.volume===0?1:0})},{icon:"image",label:"Cover",action:()=>{}},{icon:"music_note",label:"+ Add audio",action:()=>{ft("audio"),$(!0)}},{icon:"title",label:"+ Add text",action:()=>{ft("text"),$(!0)}}].map((r,d)=>e.jsxs("button",{onClick:r.action,style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",padding:"6px 8px",cursor:"pointer",minWidth:"64px",flex:"0 0 auto",minHeight:"44px"},children:[e.jsx(je,{i:r.icon,s:20,c:"#e2e8f0"}),e.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",whiteSpace:"nowrap",fontFamily:"'Spline Sans', sans-serif"},children:r.label})]},d))}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Sa,{}),children:e.jsx(oo,{id:"editor-timeline",clips:P,selectedClipId:_e,onSelectClip:Ze,onUpdateClip:Pe,onDeleteClip:Dt,onSplitClip:Yt,onAddClip:ot,onRippleDelete:La,currentTime:A.currentTime,onSeek:A.seek,totalDuration:at,isProcessing:ia,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ee,onAddToTimeline:zt,timelineHeight:ye,timelineMarkers:na,onTimelineMarkersChange:Ot})})})]})]}),v&&e.jsxs(e.Fragment,{children:[e.jsx(wr,{isOpen:le,onClose:()=>$(!1),children:e.jsx(mt,{name:"mobile-panel",inline:!0,message:"Panel error",children:e.jsxs(a.Suspense,{fallback:e.jsx(jt,{width:"100%",height:"200px"}),children:[ze==="media"&&e.jsx(to,{mediaTab:G,onMediaTabChange:se,mediaItems:Ee,onImportMedia:Wt,onRemoveMedia:Ua,onAddToTimeline:zt,selectedMediaId:lt,onSelectMedia:Nt,isImporting:Ca}),ze==="text"&&e.jsx(no,{selectedClip:Oe,onClipUpdate:Pe,onAddClip:ot,currentTime:A.currentTime}),ze==="audio"&&e.jsx(ro,{selectedClip:Oe,onClipUpdate:Pe,bgMusic:Ve,onImportBgMusic:Vt,onUpdateBgMusicVolume:Kt,onRemoveBgMusic:Ht}),ze==="captions"&&e.jsx(co,{clips:P,onAddClip:ot,onSetClips:ue,currentTime:A.currentTime,mediaItems:Ee,selectedClip:Oe,selectedClipId:_e,onSelectClip:Ze,onClipUpdate:Pe}),ze==="stickers"&&e.jsx(io,{onAddClip:ot,currentTime:A.currentTime}),ze==="effects"&&e.jsx(so,{selectedClip:Oe,onClipUpdate:Pe}),ze==="filters"&&e.jsx(lo,{selectedClip:Oe,onClipUpdate:Pe}),ze==="ai"&&e.jsx(uo,{isOpen:!0,onClose:()=>$(!1),messages:V,isThinking:E,slowHint:Me,onSendMessage:Xt,suggestions:Re,onApplySuggestion:Na,isMobile:!0})]})})}),e.jsx("nav",{className:"mobile-tab-bar","aria-label":"Editor tools",children:[{id:"media",icon:"perm_media",label:"Media",tip:"Import and browse media"},{id:"text",icon:"title",label:"Text",tip:"Add manual text overlays"},{id:"captions",icon:"closed_caption",label:"Captions",tip:"Auto-generate subtitles from speech"},{id:"audio",icon:"music_note",label:"Audio",tip:"Background music and clip audio"},{id:"stickers",icon:"emoji_emotions",label:"Stickers",tip:"Drop emoji stickers on the preview"},{id:"effects",icon:"auto_fix_high",label:"Effects",tip:"Apply video effects"},{id:"filters",icon:"filter_vintage",label:"Filters",tip:"Apply colour filters"},{id:"ai",icon:"auto_awesome",label:"AI",tip:"AI editing assistant"}].map(r=>e.jsxs("button",{className:ze===r.id&&le?"active":"",title:r.tip,"aria-label":r.tip,onClick:()=>{ze===r.id?$(d=>!d):(ft(r.id),$(!0))},children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:22,color:ze===r.id&&le?"#75AADB":void 0},children:r.icon}),e.jsx("span",{children:r.label})]},r.id))})]}),!v&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"resize-handle resize-handle-h",onMouseDown:r=>De(r,ye||Er),onDoubleClick:()=>q(null),children:e.jsx("div",{className:"resize-handle-dot"})}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Sa,{}),children:e.jsx(oo,{id:"editor-timeline",clips:P,selectedClipId:_e,onSelectClip:Ze,onUpdateClip:Pe,onDeleteClip:Dt,onSplitClip:Yt,onAddClip:ot,onRippleDelete:La,currentTime:A.currentTime,onSeek:A.seek,totalDuration:at,isProcessing:ia,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ee,onAddToTimeline:zt,timelineHeight:ye,timelineMarkers:na,onTimelineMarkersChange:Ot})})})]}),oe.isLoading&&!oe.currentOperation&&!wt&&e.jsx(Uo,{progress:oe.loadProgress}),(wt||oe.currentOperation)&&e.jsx(Ao,{message:wt||"Processing...",progress:oe.currentOperation!=null?oe.progress:oe.loadProgress,operationLabel:oe.currentOperation?`${oe.currentOperation}...`:"",subMessage:_a,onCancel:oe.currentOperation?oe.cancelOperation:void 0}),$o&&e.jsx(Po,{onComplete:()=>{Fo(!1),localStorage.setItem("clipcut_onboarded","1")}}),$t&&e.jsx(Lo,{type:$t.type,message:$t.message,onClose:()=>Pa(null),autoClose:$t.type!=="error"})]})},Br=a.memo(Fr),fi=Object.freeze(Object.defineProperty({__proto__:null,default:Br},Symbol.toStringTag,{value:"Module"}));export{qr as A,ha as D,Gr as E,Mn as F,je as I,ni as M,Rn as S,ti as T,fi as V,Qr as a,Jr as b,ai as c,ui as d,ci as e,di as f,mi as g,Za as h,ri as i,Qa as j,pi as k,ei as l,Zr as m,oi as n,et as s,si as t,li as x,ii as z};
