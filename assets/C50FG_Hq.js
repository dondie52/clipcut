const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/QcUKHxoV.js","assets/DwQPoapS.js","assets/DccWSldF.js","assets/DIp2X_oE.js","assets/C_8A2FPv.js","assets/Et-wlZO3.js","assets/D4NBonJH.js","assets/3ghgip0a.js","assets/DtdS7tRU.js","assets/B9CjrYEi.js","assets/CrFPy8FH.js","assets/B2lHJhs_.js","assets/CHI90SDF.js","assets/D2wBrI-b.js","assets/BbWHuruS.js","assets/ChXTAwCo.js","assets/C--gB11h.js","assets/Bsctfrlc.js","assets/BcDlcVU4.js","assets/CQib_iS_.js","assets/DhfgVgbe.js","assets/BsIS8Af0.js","assets/B2EROxef.js","assets/BEUlQjCE.js","assets/Dh0lx4MY.js","assets/D8eACPMb.js","assets/v45RemYN.js","assets/C8ktvZ5m.js"])))=>i.map(i=>d[i]);
import{g as ra,a as Lt,u as ln,D as cn,_ as Be,e as Nt,E as ht,A as dn,T as Ya,f as Xa,r as un}from"./DIp2X_oE.js";import{r as a,j as e,a as pn,u as mn}from"./DwQPoapS.js";import{f as So}from"./Et-wlZO3.js";import{u as Ia,a as fn}from"./D4NBonJH.js";import{i as jo,l as Ye,w as De,e as Ge,r as Ke,t as He,c as qe,s as Je,a as Xe,b as ga,d as hn,f as bn,g as gn,h as xn,m as yn,j as wn,E as ia,k as vn,n as kn,o as Sn,p as jn,q as Cn,u as Tn,v as In,R as Co,x as Mn,y as Rn,z as En,A as _n}from"./3ghgip0a.js";import{c as Ot,b as Ga,e as An,f as jt,s as Zt,r as Pn,g as To,h as qa}from"./DtdS7tRU.js";import{i as Ja,b as Un,v as Ln}from"./DccWSldF.js";import{getWorkerUrl as Nn}from"./CrFPy8FH.js";const Te=a.memo(({i:t,s:n=18,c:i="currentColor",style:r={},filled:s=!1,weight:l=400,...d})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:`${n}px`,color:i,fontVariationSettings:`'FILL' ${s?1:0}, 'wght' ${l}`,transition:"color 0.15s ease",userSelect:"none",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center",...r},"aria-hidden":"true",...d,children:t}));Te.displayName="Icon";const $n=`
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
`,na=a.memo(({i:t,onClick:n,style:i={},title:r,disabled:s=!1,size:l=18,color:d="#64748b",hoverColor:p="#94a3b8",...b})=>{const[h,v]=a.useState(!1),g=a.useCallback(w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),n?.())},[n]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:$n}),e.jsx("button",{className:"ghost-btn",style:{background:"none",border:"none",cursor:s?"not-allowed":"pointer",padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",opacity:s?.5:1,...i},onClick:s?void 0:n,onKeyDown:g,onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1),disabled:s,title:r,"aria-label":b["aria-label"]||r,...b,children:e.jsx(Te,{i:t,s:l,c:h&&!s?p:d})})]})});na.displayName="GhostBtn";const et={root:{width:"100%",maxWidth:"100vw",minWidth:0,minHeight:0,height:"100vh",display:"flex",flexDirection:"column",background:"var(--color-bg-dark, #08090c)",color:"var(--color-text-primary, #f1f5f9)",overflow:"hidden",fontFamily:"'Spline Sans', sans-serif"},ghost:{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all var(--transition-normal, 0.15s ease)"},topBar:{height:"42px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",flexShrink:0,position:"relative",zIndex:3e3},titleInput:{position:"absolute",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid transparent",outline:"none",textAlign:"center",fontSize:"12px",fontWeight:500,color:"#cbd5e1",width:"220px",padding:"5px 14px",borderRadius:"4px",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease"},exportBtn:{marginLeft:"6px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"#0a0a0a",padding:"7px 22px",borderRadius:"6px",fontSize:"11px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.25)",letterSpacing:"0.3px",textTransform:"uppercase"},toolbar:{height:"46px",background:"#0e1218",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",padding:"0 8px",gap:0,flexShrink:0},leftPanel:{width:"280px",minWidth:0,maxWidth:"100%",borderRight:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},importBtn:{width:"100%",background:"rgba(117, 170, 219, 0.03)",border:"1.5px dashed rgba(117, 170, 219, 0.15)",borderRadius:"8px",padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",cursor:"pointer",position:"relative",fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all 0.15s ease"},rightPanel:{width:"320px",minWidth:0,maxWidth:"100%",borderLeft:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},controls:{height:"52px",background:"linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",borderTop:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"relative"},timeline:{flex:"0 0 auto",height:"280px",background:"#08090c",borderTop:"2px solid rgba(117, 170, 219, 0.1)",display:"flex",flexDirection:"column",minHeight:"120px",overflow:"hidden",position:"relative",zIndex:10},tlToolbar:{height:"38px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}},On=`
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
`,it=[{id:"media",icon:"folder_open",label:"Media"},{id:"audio",icon:"music_note",label:"Audio"},{id:"text",icon:"text_fields",label:"Text"},{id:"captions",icon:"closed_caption",label:"Captions"},{id:"stickers",icon:"mood",label:"Stickers"},{id:"effects",icon:"auto_fix_high",label:"Effects"},{id:"transition",icon:"layers",label:"Transition"},{id:"filters",icon:"filter_list",label:"Filters"}],Fn={PLAY_PAUSE:{key:"Space",description:"Play/Pause"},SKIP_FORWARD:{key:"ArrowRight",description:"Skip forward 5s"},SKIP_BACKWARD:{key:"ArrowLeft",description:"Skip backward 5s"},SKIP_FORWARD_LARGE:{key:"Shift+ArrowRight",description:"Skip forward 10s"},SKIP_BACKWARD_LARGE:{key:"Shift+ArrowLeft",description:"Skip backward 10s"},FRAME_FORWARD:{key:".",description:"Next frame"},FRAME_BACKWARD:{key:",",description:"Previous frame"},GO_TO_START:{key:"Home",description:"Go to start"},GO_TO_END:{key:"End",description:"Go to end"},SPLIT:{key:"S",description:"Split at playhead"},DELETE:{key:"Delete",description:"Delete selected"},DESELECT:{key:"Escape",description:"Deselect"},MUTE:{key:"M",description:"Mute/Unmute"},VOLUME_UP:{key:"ArrowUp",description:"Volume up"},VOLUME_DOWN:{key:"ArrowDown",description:"Volume down"},FULLSCREEN:{key:"F",description:"Toggle fullscreen"},SAVE:{key:"Ctrl+S",description:"Save project"},EXPORT:{key:"Ctrl+E",description:"Export video"},IMPORT:{key:"Ctrl+I",description:"Import media"},TOOLBAR_1:{key:"1",description:"Media panel"},TOOLBAR_2:{key:"2",description:"Audio panel"},TOOLBAR_3:{key:"3",description:"Text panel"},TOOLBAR_4:{key:"4",description:"Stickers panel"},TOOLBAR_5:{key:"5",description:"Effects panel"},TOOLBAR_6:{key:"6",description:"Transitions panel"},TOOLBAR_7:{key:"7",description:"Filters panel"}},Bn=`
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
`,xa={volume:1,isMuted:!1,speed:1,rotation:0,opacity:1,positionX:0,positionY:0,scale:1,brightness:0,contrast:0,saturation:1,temperature:0,filterName:null,filterStrength:50,effects:[],fadeIn:0,fadeOut:0,track:0,trimStart:0,trimEnd:0,colorGrading:{shadows:"#1a1a2e",midtones:"#4a4a5e",highlights:"#ffffff"},transition:null,transitionDuration:1,text:"",textColor:"#ffffff",textSize:48,textPosition:"bottom-center",textBgColor:"",textBold:!1,textItalic:!1,textUnderline:!1,textAlign:"center",textFontFamily:"Spline Sans",textStartTime:0,textDuration:0,textX:null,textY:null},Dn=[{name:"None",filter:null,css:null},{name:"90s",filter:"colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8",css:"sepia(0.3) saturate(0.8)"},{name:"Vintage",filter:"eq=saturation=0.6:brightness=0.05",css:"sepia(0.4) saturate(0.6) brightness(1.05)"},{name:"Cinema",filter:"eq=contrast=1.2:brightness=-0.05:saturation=1.1",css:"contrast(1.2) brightness(0.95) saturate(1.1)"},{name:"B&W",filter:"eq=saturation=0",css:"grayscale(1)"},{name:"Warm",filter:"colortemperature=6500",css:"sepia(0.15) saturate(1.2)"},{name:"Cool",filter:"colortemperature=3500",css:"saturate(0.9) hue-rotate(10deg)"},{name:"Sepia",filter:"colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",css:"sepia(0.8)"}],li=[{name:"Motion Blur",type:"blur",params:{radius:5},css:"blur(2px)",icon:"blur_on"},{name:"Sharpen",type:"sharpen",params:{strength:1},css:"contrast(1.1)",icon:"deblur"},{name:"Vignette",type:"vignette",params:{},css:null,icon:"vignette"},{name:"Gaussian Blur",type:"blur",params:{radius:10},css:"blur(4px)",icon:"lens_blur"},{name:"Glitch",type:"glitch",params:{intensity:3},css:null,icon:"broken_image"},{name:"Zoom",type:"zoom",params:{factor:1.5},css:null,icon:"zoom_in"},{name:"Shake",type:"shake",params:{intensity:5},css:null,icon:"vibration"},{name:"Flash",type:"flash",params:{duration:.5},css:null,icon:"flash_on"}],ci=[{name:"Fade In",key:"fadeIn",value:1},{name:"Fade Out",key:"fadeOut",value:1},{name:"Scale Up",key:"scaleUp",value:!0},{name:"Slide Left",key:"slideLeft",value:!0}],di=[{value:null,label:"None",icon:"block"},{value:"fade",label:"Fade",icon:"gradient"},{value:"fadeblack",label:"Fade Black",icon:"brightness_1"},{value:"fadewhite",label:"Fade White",icon:"brightness_7"},{value:"dissolve",label:"Dissolve",icon:"blur_on"},{value:"wipeleft",label:"Wipe Left",icon:"arrow_back"},{value:"wiperight",label:"Wipe Right",icon:"arrow_forward"},{value:"slideup",label:"Slide Up",icon:"arrow_upward"},{value:"slidedown",label:"Slide Down",icon:"arrow_downward"}],ui=[{value:"top-left",label:"Top Left",icon:"north_west"},{value:"top-center",label:"Top",icon:"north"},{value:"top-right",label:"Top Right",icon:"north_east"},{value:"center-left",label:"Left",icon:"west"},{value:"center",label:"Center",icon:"center_focus_strong"},{value:"center-right",label:"Right",icon:"east"},{value:"bottom-left",label:"Bottom Left",icon:"south_west"},{value:"bottom-center",label:"Bottom",icon:"south"},{value:"bottom-right",label:"Bottom Right",icon:"south_east"}],pi=[{emoji:"😀",label:"Grinning",category:"smileys"},{emoji:"😂",label:"Laughing",category:"smileys"},{emoji:"🥹",label:"Touched",category:"smileys"},{emoji:"😍",label:"Heart Eyes",category:"smileys"},{emoji:"🤩",label:"Star Struck",category:"smileys"},{emoji:"😎",label:"Cool",category:"smileys"},{emoji:"🥳",label:"Party",category:"smileys"},{emoji:"😱",label:"Shocked",category:"smileys"},{emoji:"🤔",label:"Thinking",category:"smileys"},{emoji:"😴",label:"Sleeping",category:"smileys"},{emoji:"👍",label:"Thumbs Up",category:"hands"},{emoji:"👎",label:"Thumbs Down",category:"hands"},{emoji:"👏",label:"Clap",category:"hands"},{emoji:"🙌",label:"Raised Hands",category:"hands"},{emoji:"🤝",label:"Handshake",category:"hands"},{emoji:"✌️",label:"Peace",category:"hands"},{emoji:"🤞",label:"Fingers Crossed",category:"hands"},{emoji:"💪",label:"Strong",category:"hands"},{emoji:"❤️",label:"Heart",category:"symbols"},{emoji:"🔥",label:"Fire",category:"symbols"},{emoji:"⭐",label:"Star",category:"symbols"},{emoji:"💯",label:"100",category:"symbols"},{emoji:"✨",label:"Sparkles",category:"symbols"},{emoji:"💥",label:"Boom",category:"symbols"},{emoji:"🎯",label:"Target",category:"symbols"},{emoji:"⚡",label:"Lightning",category:"symbols"},{emoji:"🚀",label:"Rocket",category:"symbols"},{emoji:"💎",label:"Diamond",category:"symbols"},{emoji:"🎬",label:"Clapper",category:"objects"},{emoji:"🎵",label:"Music",category:"objects"},{emoji:"🎤",label:"Mic",category:"objects"},{emoji:"📸",label:"Camera",category:"objects"},{emoji:"🎮",label:"Gaming",category:"objects"},{emoji:"🏆",label:"Trophy",category:"objects"},{emoji:"🎁",label:"Gift",category:"objects"},{emoji:"💡",label:"Idea",category:"objects"},{emoji:"👆",label:"Point Up",category:"arrows"},{emoji:"👇",label:"Point Down",category:"arrows"},{emoji:"👈",label:"Point Left",category:"arrows"},{emoji:"👉",label:"Point Right",category:"arrows"},{emoji:"⬆️",label:"Arrow Up",category:"arrows"},{emoji:"⬇️",label:"Arrow Down",category:"arrows"},{emoji:"🔔",label:"Bell",category:"objects"},{emoji:"💬",label:"Speech",category:"objects"},{emoji:"🏷️",label:"Tag",category:"objects"},{emoji:"📌",label:"Pin",category:"objects"}],mi=[{name:"Title",textSize:64,textColor:"#ffffff",textPosition:"center",textBgColor:"",textBold:!0,textAlign:"center",icon:"title"},{name:"Subtitle",textSize:36,textColor:"#e2e8f0",textPosition:"bottom-center",textBgColor:"",textBold:!1,textAlign:"center",icon:"subtitles"},{name:"Caption",textSize:24,textColor:"#ffffff",textPosition:"bottom-center",textBgColor:"#000000",textBold:!1,textAlign:"center",icon:"closed_caption"},{name:"Lower Third",textSize:28,textColor:"#ffffff",textPosition:"bottom-left",textBgColor:"rgba(0,0,0,0.7)",textBold:!0,textAlign:"left",icon:"video_label"}],fi=["Spline Sans","Arial","Georgia","Courier New","Impact","Comic Sans MS","Trebuchet MS","Verdana","Times New Roman"],hi=[{label:"0.25x",value:.25},{label:"0.5x",value:.5},{label:"1x",value:1},{label:"1.5x",value:1.5},{label:"2x",value:2}];function zn(t){const n=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(n)return n;const i=new Date,r=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${r(i.getMonth()+1)}-${r(i.getDate())}`}function Wn(){if(typeof navigator>"u")return!1;const t=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(t)?!0:navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1}const Ma=`
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
`,Qa=[{key:"low",label:"Low",crf:28},{key:"medium",label:"Medium",crf:23},{key:"high",label:"High",crf:18},{key:"ultra",label:"Ultra",crf:15}],Vn=[{key:"webm",label:"WebM"},{key:"mp4",label:"MP4 (via server)"}],Kn=[24,30,60],Hn=a.memo(({items:t,selected:n,onSelect:i,style:r})=>e.jsx("div",{style:{display:"flex",gap:"4px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"3px",...r},children:t.map(s=>e.jsx("button",{onClick:()=>i(s.key||s),style:{flex:1,padding:"6px 8px",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",background:(s.key||s)===n?"rgba(117,170,219,0.15)":"transparent",color:(s.key||s)===n?"#75aadb":"#64748b"},children:s.label||s},s.key||s))}));Hn.displayName="PillGroup";const Io=a.memo(({isOpen:t,onClose:n,onExport:i,isExporting:r,progress:s,operationLabel:l="Processing",subMessage:d="",resolutions:p,exportPresets:b={},onCancel:h,projectName:v="Untitled",exportResult:g,onDownload:w,onExportAnother:G})=>{const[P,k]=a.useState("480p"),[Y,W]=a.useState("resolution"),[fe,Q]=a.useState("youtube-1080p"),[se,S]=a.useState("webm"),[te,le]=a.useState("medium"),[L,V]=a.useState(30),[ke,K]=a.useState(""),[ae,ye]=a.useState(null);a.useEffect(()=>{t&&!ke&&K(zn(v))},[t,v]);const E=Wn();if(a.useEffect(()=>{if(!t)return;const C=M=>{M.key==="Escape"&&!r&&n()};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[t,r,n]),a.useEffect(()=>{if(!t)return;const M=document.getElementById("export-modal")?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');M?.length&&M[0].focus()},[t]),a.useEffect(()=>{if(!t)return;let C=!0;return ye(null),jo().then(M=>{C&&ye(!!M)}).catch(()=>{C&&ye(!1)}),()=>{C=!1}},[t]),!t)return null;const q=C=>{C.target===C.currentTarget&&!r&&!g&&n()};p?.[P];const Se=Qa.find(C=>C.key===te),je=[se.toUpperCase(),P,`${L}fps`],Ie=Y==="platform"?b[fe]?.label:je.join(" · "),pe=()=>{const C=Y==="platform"?`preset:${fe}`:P;i(C,{format:se,quality:Se?.crf,fps:L,filename:ke||v})},ze=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hud-body",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Container · Codec"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Output format",children:Vn.map(C=>e.jsx("button",{className:se===C.key?"is-active":"",onClick:()=>S(C.key),role:"radio","aria-checked":se===C.key,children:C.label},C.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Target"}),e.jsxs("div",{className:"hud-segment",role:"radiogroup","aria-label":"Target mode",children:[e.jsx("button",{className:Y==="resolution"?"is-active":"",onClick:()=>W("resolution"),role:"radio","aria-checked":Y==="resolution",children:"By Resolution"}),e.jsx("button",{className:Y==="platform"?"is-active":"",onClick:()=>W("platform"),role:"radio","aria-checked":Y==="platform",children:"By Platform"})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Signal"}),Y==="resolution"?e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Resolution",children:Object.entries(p).map(([C,{label:M,width:H,height:j}])=>{const T=P===C;return e.jsxs("button",{className:`hud-row-item ${T?"is-active":""}`,onClick:()=>k(C),role:"radio","aria-checked":T,children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsx("span",{className:"hud-row-name",children:M}),e.jsxs("span",{className:"hud-row-spec",children:[H,"×",j]}),e.jsxs("span",{className:"hud-row-spec",style:{color:T?"#75AADB":"rgba(255,255,255,0.34)"},children:[Math.round(H*j/1e4)/100,"MP"]})]},C)})}):e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Platform",children:Object.entries(b).map(([C,M])=>{const H=fe===C;return e.jsxs("button",{className:`hud-row-item ${H?"is-active":""}`,onClick:()=>Q(C),role:"radio","aria-checked":H,style:{gridTemplateColumns:"18px 1fr auto"},children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsxs("span",{className:"hud-row-name",children:[M.label,e.jsx("span",{className:"hud-row-sub",style:{gridColumn:"unset",display:"block",marginTop:3},children:M.description})]}),e.jsxs("span",{className:"hud-row-spec",children:[M.width,"×",M.height]})]},C)})})]}),e.jsxs("div",{className:"hud-row-split",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Quality (CRF)"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Quality",children:Qa.map(C=>e.jsx("button",{className:te===C.key?"is-active":"",onClick:()=>le(C.key),role:"radio","aria-checked":te===C.key,title:`CRF ${C.crf}`,children:C.label},C.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Frame Rate"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Frame rate",children:Kn.map(C=>e.jsxs("button",{className:L===C?"is-active":"",onClick:()=>V(C),role:"radio","aria-checked":L===C,children:[C,"fps"]},C))})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Filename"}),e.jsx("input",{type:"text",className:"hud-input",value:ke,onChange:C=>K(C.target.value),"aria-label":"Export filename",placeholder:"clipcut-export"})]}),e.jsxs("div",{className:"hud-summary",role:"status",children:[e.jsx("span",{className:"hud-summary-dot","aria-hidden":"true"}),e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsxs("div",{className:"hud-summary-text",children:["Ready · ",Ie]}),se==="webm"&&!E&&e.jsx("div",{className:"hud-summary-note",children:"WebM plays on most devices. For iPhone Photos compatibility, choose MP4."}),se==="webm"&&E&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead."}),se==="mp4"&&e.jsxs("div",{className:"hud-summary-note hud-summary-note--warn",children:[ae==null&&"Checking MP4 server availability...",ae===!0&&"MP4 server is online. Export will render locally, then transcode to MP4 on server.",ae===!1&&"MP4 server is currently unavailable. Export will fall back to local WebM."]})]})]})]}),e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:n,children:"Cancel"}),e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:pe,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Render · Export"]})]})]}),we=()=>{const C=Math.max(0,Math.min(100,Math.round(s)));return e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-progress",children:[e.jsxs("div",{className:"hud-big-readout","aria-live":"polite","aria-atomic":"true",children:[String(C).padStart(2,"0"),e.jsx("span",{className:"pct",children:"%"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hud-op-label",children:l||"Rendering"}),d&&e.jsx("div",{className:"hud-op-sub",children:d})]}),e.jsxs("div",{className:"hud-filmstrip",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":C,children:[e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--top","aria-hidden":"true",children:Array.from({length:24}).map((M,H)=>e.jsx("span",{style:{animationDelay:`${(H*.05).toFixed(2)}s`}},H))}),e.jsx("div",{className:"hud-filmstrip-fill",style:{width:`${C}%`}}),e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--bottom","aria-hidden":"true",children:Array.from({length:24}).map((M,H)=>e.jsx("span",{style:{animationDelay:`${(H*.05+.1).toFixed(2)}s`}},H))})]}),e.jsxs("div",{className:"hud-telemetry","aria-label":"Telemetry",children:[e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Format"}),e.jsx("span",{className:"hud-telemetry-value",children:se.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Signal"}),e.jsx("span",{className:"hud-telemetry-value",children:Y==="platform"?b[fe]?.label||"—":P.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Frame Rate"}),e.jsxs("span",{className:"hud-telemetry-value",children:[L,"fps"]})]})]})]})})},me=()=>h?e.jsx("div",{className:"hud-actions",style:{justifyContent:"center"},children:e.jsx("button",{type:"button",className:"hud-btn hud-btn--danger",onClick:h,children:"Abort render"})}):null,ce=()=>e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-complete",children:[e.jsxs("div",{className:"hud-complete-stamp",children:[e.jsx("span",{className:"led","aria-hidden":"true"}),"Export complete · Signal locked"]}),e.jsx("h3",{className:"hud-complete-title",children:"Your file is ready."}),g?.size&&e.jsxs("span",{className:"hud-complete-file",children:[(g.size/(1024*1024)).toFixed(1)," MB · ",se.toUpperCase()]})]})}),he=()=>e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:n,children:"Close"}),G&&e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:G,children:"Export another"}),w&&e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:w,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Download"]})]}),ve=g?"hud-head-led hud-head-led--green":r?"hud-head-led hud-head-led--amber":"hud-head-led",Le=g?"Complete":r?"Rendering":"Standby";return e.jsxs("div",{className:"hud-backdrop",onClick:q,role:"dialog","aria-modal":"true","aria-labelledby":"export-modal-title",children:[e.jsx("style",{children:Ma}),e.jsxs("div",{id:"export-modal",className:"hud-console",children:[e.jsxs("div",{className:"hud-head",children:[e.jsxs("div",{className:"hud-head-left",children:[e.jsx("span",{className:ve,"aria-hidden":"true"}),e.jsxs("h2",{id:"export-modal-title",className:"hud-head-title",children:[e.jsx("span",{children:"CC · EXPORT"}),e.jsx("span",{className:"sep",children:"//"}),e.jsx("span",{className:"ch-id",children:Le.toUpperCase()})]})]}),!r&&!g&&e.jsx("button",{onClick:n,className:"hud-head-close","aria-label":"Close export dialog",title:"Close (Escape)",children:e.jsx(Te,{i:"close",s:16,c:"currentColor"})})]}),g?ce():r?we():ze(),!r&&!g&&null,r&&me(),g&&he()]})]})});Io.displayName="ExportModal";const Yn={Playback:["PLAY_PAUSE","SKIP_FORWARD","SKIP_BACKWARD","SKIP_FORWARD_LARGE","SKIP_BACKWARD_LARGE","FRAME_FORWARD","FRAME_BACKWARD","GO_TO_START","GO_TO_END"],Editing:["SPLIT","DELETE","DESELECT"],Audio:["MUTE","VOLUME_UP","VOLUME_DOWN"],View:["FULLSCREEN"],File:["SAVE","EXPORT","IMPORT"]},Mo=a.memo(({isOpen:t,onClose:n})=>(a.useEffect(()=>{if(!t)return;const i=r=>{r.key==="Escape"&&n()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[t,n]),t?e.jsxs("div",{className:"shortcuts-modal-backdrop",onClick:i=>i.target===i.currentTarget&&n(),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3500,backdropFilter:"blur(4px)"},role:"dialog","aria-modal":"true","aria-labelledby":"shortcuts-modal-title",children:[e.jsx("style",{children:Ma}),e.jsxs("div",{className:"shortcuts-modal-content",style:{background:"#1a2332",borderRadius:"12px",padding:"24px",width:"520px",maxWidth:"90vw",maxHeight:"80vh",overflow:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[e.jsxs("h2",{id:"shortcuts-modal-title",style:{margin:0,fontSize:"18px",fontWeight:600,color:"white",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Te,{i:"keyboard",s:22,c:"#75aadb"}),"Keyboard Shortcuts"]}),e.jsx("button",{onClick:n,style:{...et.ghost,padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":"Close shortcuts dialog",children:e.jsx(Te,{i:"close",s:20,c:"#94a3b8"})})]}),Object.entries(Yn).map(([i,r])=>e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{fontSize:"11px",color:"#75aadb",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,margin:"0 0 10px 0"},children:i}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:r.map(s=>{const l=Fn[s];return l?e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:"6px",background:"rgba(255,255,255,0.02)"},children:[e.jsx("span",{style:{fontSize:"13px",color:"#cbd5e1"},children:l.description}),e.jsx("span",{className:"shortcut-key",children:l.key})]},s):null})})]},i))]})]}):null));Mo.displayName="KeyboardShortcutsModal";const Xn=[{id:"new",icon:"add",label:"New Project",shortcut:null},{id:"save",icon:"save",label:"Save",shortcut:"Ctrl+S"},{id:"divider1"},{id:"export",icon:"download",label:"Export",shortcut:"Ctrl+E"},{id:"divider2"},{id:"settings",icon:"settings",label:"Settings",shortcut:null}],Ro=a.memo(({isOpen:t,onClose:n,onNewProject:i,onSave:r,onExport:s,onSettings:l,hasMediaToExport:d})=>{const p=a.useRef(null);if(a.useEffect(()=>{if(!t)return;const h=g=>{p.current&&!p.current.contains(g.target)&&n()},v=g=>{g.key==="Escape"&&n()};return requestAnimationFrame(()=>{document.addEventListener("mousedown",h),document.addEventListener("keydown",v)}),()=>{document.removeEventListener("mousedown",h),document.removeEventListener("keydown",v)}},[t,n]),!t)return null;const b=h=>{switch(n(),h){case"new":i?.();break;case"save":r?.();break;case"export":d&&s?.();break;case"settings":l?.();break}};return e.jsx("div",{ref:p,className:"menu-dropdown",role:"menu",style:{position:"absolute",top:"100%",left:0,marginTop:"4px",background:"#1a2332",borderRadius:"8px",padding:"4px",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",minWidth:"200px",zIndex:100},children:Xn.map(h=>{if(h.id.startsWith("divider"))return e.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0"}},h.id);const v=h.id==="export"&&!d;return e.jsxs("button",{className:"menu-dropdown-item",role:"menuitem",onClick:()=>!v&&b(h.id),style:{...et.ghost,display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"6px",width:"100%",textAlign:"left",color:v?"#475569":"#cbd5e1",cursor:v?"not-allowed":"pointer",opacity:v?.5:1,fontSize:"13px",fontFamily:"'Spline Sans', sans-serif"},disabled:v,children:[e.jsx(Te,{i:h.icon,s:16,c:v?"#475569":"#94a3b8"}),e.jsx("span",{style:{flex:1},children:h.label}),h.shortcut&&e.jsx("span",{style:{fontSize:"11px",color:"#475569",fontFamily:"'SF Mono', Monaco, monospace"},children:h.shortcut})]},h.id)})})});Ro.displayName="MenuDropdown";const Gn=({projectName:t,onProjectNameChange:n,onExport:i,isExporting:r=!1,exportProgress:s=0,currentOperation:l="",hasMediaToExport:d=!1,resolutions:p={},exportPresets:b={},lastSaved:h=null,canUndo:v=!1,canRedo:g=!1,onUndo:w,onRedo:G,onCancelExport:P,exportSubMessage:k="",onNewProject:Y,onSave:W,onSettings:fe,editorLayout:Q="default",onLayoutChange:se,forceOpenExport:S=!1,onExportModalClosed:te,onAiToggle:le,aiPanelOpen:L=!1})=>{const V=Ia(),[ke,K]=a.useState(!1),[ae,ye]=a.useState(!1),[E,q]=a.useState(!1),[Se,je]=a.useState(!1),Ie=a.useRef(null);a.useEffect(()=>{const M=H=>{H.target.tagName==="INPUT"||H.target.tagName==="TEXTAREA"||(H.key==="?"||H.shiftKey&&H.key==="/")&&(H.preventDefault(),je(j=>!j))};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[]),a.useEffect(()=>{S&&d&&!r&&(K(!0),te?.())},[S,d,r,te]);const pe=a.useCallback(()=>{r||(d?K(!0):console.warn("Export not available:",{hasMediaToExport:d,isExporting:r}))},[d,r]),ze=a.useCallback((M,H)=>{i?.(M,H)},[i]),we=a.useCallback(()=>{r||(K(!1),ve(null))},[r]),me=a.useCallback(M=>{const H=So(M.target.value,{maxLength:100});n(H)},[n]),ce=a.useCallback(M=>{(M.key==="Enter"||M.key==="Escape")&&M.target.blur()},[]),[he,ve]=a.useState(null);a.useEffect(()=>{!r&&s>=100&&ke&&!he&&ve({size:null}),ke||ve(null)},[r,s,ke,he]);const[Le,C]=a.useState("");return a.useEffect(()=>{const M=()=>{C(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}))};M();const H=setInterval(M,6e4);return()=>clearInterval(H)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ma}),e.jsxs("header",{style:{...et.topBar,...V?{height:"44px",padding:"0 10px"}:{}},role:"banner","aria-label":"ClipCut editor header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsxs("div",{className:"logo-container",style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},role:"img","aria-label":"ClipCut logo",children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(117, 170, 219, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Te,{i:"movie_edit",s:18,c:"#75aadb"})}),!V&&e.jsx("span",{style:{fontWeight:700,fontSize:"15px",letterSpacing:"-0.3px",color:"white"},children:"ClipCut"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginLeft:"8px",fontSize:"11px"},children:[e.jsxs("div",{ref:Ie,style:{position:"relative"},children:[e.jsx("button",{className:"menu-btn",onClick:()=>q(M=>!M),style:{...et.ghost,display:"flex",alignItems:"center",gap:"2px",color:E?"#75aadb":"#94a3b8"},"aria-haspopup":"menu","aria-expanded":E,"aria-label":"Open menu",children:V?e.jsx(Te,{i:"menu",s:18}):e.jsxs(e.Fragment,{children:["Menu ",e.jsx(Te,{i:"arrow_drop_down",s:16})]})}),e.jsx(Ro,{isOpen:E,onClose:()=>q(!1),onNewProject:Y,onSave:W,onExport:pe,onSettings:fe,hasMediaToExport:d})]}),!V&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("button",{onClick:w,disabled:!v,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:v?1:.4,cursor:v?"pointer":"not-allowed"},title:"Undo (Ctrl+Z)","aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:14,c:v?"#94a3b8":"#475569"})}),e.jsx("button",{onClick:G,disabled:!g,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:g?1:.4,cursor:g?"pointer":"not-allowed"},title:"Redo (Ctrl+Shift+Z or Ctrl+Y)","aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:14,c:g?"#94a3b8":"#475569"})})]}),!V&&h&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Last saved at ${h.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}`,title:`Last saved: ${h.toLocaleString()}`,children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Saved ",h.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]}),!V&&!h&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":"Auto save at current time",children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Auto save at ",Le]})]})]}),e.jsx("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:e.jsx("input",{type:"text",value:t,onChange:me,onFocus:()=>ye(!0),onBlur:()=>ye(!1),onKeyDown:ce,className:"title-input",style:{...et.titleInput,position:"relative",left:"auto",transform:"none",border:"1px solid transparent",width:V?"120px":"220px",pointerEvents:"auto"},"aria-label":"Project name",title:"Click to edit project name"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:V?"4px":"8px"},children:[le&&e.jsx(na,{i:"auto_awesome",title:"AI Editor","aria-label":L?"Close AI editor":"Open AI editor",onClick:le,style:L?{color:"#75aadb",background:"rgba(117,170,219,0.12)"}:void 0}),!V&&e.jsx(na,{i:"keyboard",title:"Keyboard shortcuts","aria-label":"Show keyboard shortcuts",onClick:()=>je(!0)}),!V&&e.jsx(na,{i:Q==="default"?"grid_view":Q==="wide-timeline"?"view_agenda":"view_compact",title:`Layout: ${Q}`,"aria-label":"Cycle layout",onClick:()=>{const M=["default","wide-timeline","compact"],H=M.indexOf(Q);se?.(M[(H+1)%M.length])}}),e.jsxs("button",{onClick:pe,className:V?"":"export-btn",style:{...V?{background:d&&!r?"#22c55e":"rgba(34,197,94,0.5)",border:"none",borderRadius:"20px",padding:"6px 14px",fontSize:"12px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Spline Sans', sans-serif",cursor:d&&!r?"pointer":"not-allowed",minHeight:"32px",minWidth:"auto",transition:"all 0.2s ease"}:{...et.exportBtn,opacity:d&&!r?1:.5,cursor:d&&!r?"pointer":"not-allowed"}},disabled:!d||r,"aria-label":r?"Exporting...":d?"Export video":"Add media to timeline to export",title:r?"Export in progress...":d?"Export video (Ctrl+E)":"Add media to timeline first",children:[e.jsx(Te,{i:"download",s:14,c:V?"#fff":"#0a0a0a"}),r?"Exporting...":"Export"]})]})]}),e.jsx(Io,{isOpen:ke,onClose:we,onExport:ze,isExporting:r,progress:s,operationLabel:l||"Exporting video...",subMessage:k,resolutions:p,exportPresets:b,onCancel:r?P:void 0,projectName:t,exportResult:he,onDownload:he?we:void 0,onExportAnother:he?()=>ve(null):void 0}),e.jsx(Mo,{isOpen:Se,onClose:()=>je(!1)})]})},qn=a.memo(Gn),Jn=`
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
`,Eo=a.memo(({item:t,isActive:n,onClick:i,shortcut:r,compact:s})=>{const[l,d]=a.useState(!1),p=a.useCallback(b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i(t.id))},[t.id,i]);return e.jsxs("button",{onClick:()=>i(t.id),onKeyDown:p,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),className:`toolbar-btn ${n?"active":""}`,style:{...et.ghost,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:s?"6px 10px":"6px 14px",flexShrink:0,color:n?"#75aadb":l?"#94a3b8":"#4a5568"},role:"tab","aria-selected":n,"aria-label":`${t.label} panel`,tabIndex:n?0:-1,children:[e.jsx("span",{className:"toolbar-icon",children:e.jsx(Te,{i:t.icon,s:20,c:n?"#75aadb":l?"#94a3b8":"#4a5568"})}),e.jsx("span",{style:{fontSize:"8px",fontWeight:n?700:600,textTransform:"uppercase",letterSpacing:"1px",transition:"color 0.15s ease"},children:t.label}),e.jsxs("div",{className:"toolbar-tooltip",children:[t.label,r&&e.jsx("span",{className:"toolbar-shortcut",children:r})]})]})});Eo.displayName="ToolbarButton";const Qn={media:"1",audio:"2",text:"3",stickers:"4",effects:"5",transition:"6",filters:"7"},Zn=({activeToolbar:t,onToolbarChange:n})=>{const i=Ia(),r=a.useCallback(s=>{const l=it.findIndex(d=>d.id===t);if(s.key==="ArrowRight"){s.preventDefault();const d=(l+1)%it.length;n(it[d].id)}else if(s.key==="ArrowLeft"){s.preventDefault();const d=l===0?it.length-1:l-1;n(it[d].id)}else if(s.key>="1"&&s.key<="7"){s.preventDefault();const d=parseInt(s.key)-1;it[d]&&n(it[d].id)}},[t,n]);return e.jsxs("nav",{style:{...et.toolbar,...i?{overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Editor tools",onKeyDown:r,children:[e.jsx("style",{children:Jn}),it.map(s=>e.jsx(Eo,{item:s,isActive:t===s.id,onClick:n,shortcut:Qn[s.id],compact:i},s.id))]})},er=a.memo(Zn);async function _o(t,n,i=.3,r=null){await Ye(),r&&Je(r);const s="input_video.mp4",l="input_audio.mp3",d="output_mixed.mp4";try{await De(s,t),await De(l,n),await Ge(["-i",s,"-i",l,"-filter_complex",`[1:a]volume=${i}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k",d]);const p=await Ke(d);return He(p,"video/mp4")}finally{Xe(),await qe([s,l,d])}}async function tr(t,n,i=null){await Ye(),i&&Je(i);const r="input_video.mp4",s="input_audio.mp3",l="output_replaced.mp4";try{await De(r,t),await De(s,n),await Ge(["-i",r,"-i",s,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",l]);const d=await Ke(l);return He(d,"video/mp4")}finally{Xe(),await qe([r,s,l])}}async function Ao(t,n=1,i=null){await Ye(),i&&Je(i);const r="input_volume.mp4",s="output_volume.mp4";try{await De(r,t),await Ge(["-i",r,"-af",`volume=${n}`,"-c:v","copy","-c:a","aac","-b:a","192k",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([r,s])}}async function Po(t,n=null){await Ye(),n&&Je(n);const i="input_mute.mp4",r="output_mute.mp4";try{await De(i,t),await Ge(["-i",i,"-c:v","copy","-an",r]);const s=await Ke(r);return He(s,"video/mp4")}finally{Xe(),await qe([i,r])}}async function Uo(t,n="mp3",i=null){await Ye(),i&&Je(i);const r="input_extract.mp4",s=`output_extract.${n}`,l={mp3:"audio/mpeg",aac:"audio/aac",wav:"audio/wav"},d={mp3:["-c:a","libmp3lame","-b:a","192k"],aac:["-c:a","aac","-b:a","192k"],wav:["-c:a","pcm_s16le"]};try{await De(r,t),await Ge(["-i",r,"-vn",...d[n]||d.mp3,s]);const p=await Ke(s);return He(p,l[n]||"audio/mpeg")}finally{Xe(),await qe([r,s])}}async function ar(t,n=null){await Ye(),n&&Je(n);const i="input_normalize.mp4",r="output_normalize.mp4";try{await De(i,t),await Ge(["-i",i,"-af","loudnorm=I=-16:LRA=11:TP=-1.5","-c:v","copy","-c:a","aac","-b:a","192k",r]);const s=await Ke(r);return He(s,"video/mp4")}finally{Xe(),await qe([i,r])}}async function or(t,n=0,i=0,r=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",d="output_fade.mp4";try{await De(l,t);const p=[];if(n>0&&p.push(`afade=t=in:st=0:d=${n}`),i>0&&r){const g=r-i;p.push(`afade=t=out:st=${g}:d=${i}`)}const b=p.join(","),h=["-i",l,"-c:v","copy"];b?(h.push("-af",b),h.push("-c:a","aac","-b:a","192k")):h.push("-c:a","copy"),h.push(d),await Ge(h);const v=await Ke(d);return He(v,"video/mp4")}finally{Xe(),await qe([l,d])}}const bi=Object.freeze(Object.defineProperty({__proto__:null,adjustVolume:Ao,extractAudio:Uo,fadeAudio:or,mixAudio:_o,muteAudio:Po,normalizeAudio:ar,replaceAudio:tr},Symbol.toStringTag,{value:"Module"})),Ca={"top-left":{x:"10",y:"10"},"top-center":{x:"(w-text_w)/2",y:"10"},"top-right":{x:"w-text_w-10",y:"10"},"center-left":{x:"10",y:"(h-text_h)/2"},center:{x:"(w-text_w)/2",y:"(h-text_h)/2"},"center-right":{x:"w-text_w-10",y:"(h-text_h)/2"},"bottom-left":{x:"10",y:"h-text_h-10"},"bottom-center":{x:"(w-text_w)/2",y:"h-text_h-10"},"bottom-right":{x:"w-text_w-10",y:"h-text_h-10"}},Lo=["fade","fadeblack","fadewhite","dissolve","pixelize","wipeleft","wiperight","wipeup","wipedown","slideleft","slideright","slideup","slidedown"];async function nr(t,n,i={},r=null){await Ye(),r&&Je(r);const{position:s="bottom-center",fontSize:l=48,fontColor:d="white",backgroundColor:p=null,startTime:b=0,duration:h=0}=i,v="input_text.mp4",g="output_text.mp4";try{await De(v,t);const w=typeof s=="string"?Ca[s]||Ca["bottom-center"]:s;let P=`drawtext=text='${n.replace(/'/g,"'\\''").replace(/:/g,"\\:").replace(/\\/g,"\\\\")}':fontsize=${l}:fontcolor=${d}:x=${w.x}:y=${w.y}`;if(p&&(P+=`:box=1:boxcolor=${p}:boxborderw=5`),b>0||h>0){const Y=h>0?`between(t,${b},${b+h})`:`gte(t,${b})`;P+=`:enable='${Y}'`}await Ge(["-i",v,"-vf",P,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",g]);const k=await Ke(g);return He(k,"video/mp4")}finally{Xe(),await qe([v,g])}}async function rr(t,n,i="fade",r=1,s=null){await Ye(),s&&Je(s);const l=Lo.includes(i)?i:"fade",d="input_trans_1.mp4",p="input_trans_2.mp4",b="output_transition.mp4";try{await De(d,t),await De(p,n);const h=await ir(t),v=Math.max(0,h-r);await Ge(["-i",d,"-i",p,"-filter_complex",`[0:v][1:v]xfade=transition=${l}:duration=${r}:offset=${v}[v];[0:a][1:a]acrossfade=d=${r}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",b]);const g=await Ke(b);return He(g,"video/mp4")}finally{Xe(),await qe([d,p,b])}}async function ir(t){return new Promise((n,i)=>{const r=document.createElement("video");r.preload="metadata",r.onloadedmetadata=()=>{URL.revokeObjectURL(r.src),n(r.duration)},r.onerror=()=>{URL.revokeObjectURL(r.src),i(new Error("Failed to load video"))},r.src=URL.createObjectURL(t)})}async function st(t,n,i=null){if(typeof n!="string"||!/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(n))throw new Error("Invalid FFmpeg filter string");await Ye(),i&&Je(i);const r="input_filter.mp4",s="output_filter.mp4";try{await De(r,t),await Ge(["-i",r,"-vf",n,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await qe([r,s])}}async function sr(t,n=0,i=0,r=null){const s=`eq=brightness=${n}:contrast=${1+i}`;return st(t,s,r)}async function lr(t,n=1,i=null){const r=`eq=saturation=${n}`;return st(t,r,i)}async function cr(t,n=5,i=null){const r=`boxblur=${n}:${n}`;return st(t,r,i)}async function dr(t,n=1,i=null){const r=`unsharp=5:5:${n}:5:5:0`;return st(t,r,i)}async function ur(t,n=1,i=null){await Ye(),i&&Je(i);const r="input_speed.mp4",s="output_speed.mp4",l=Math.max(.25,Math.min(4,n));try{await De(r,t);const d=`setpts=${1/l}*PTS`;let p="";if(l<=2&&l>=.5)p=`atempo=${l}`;else if(l>2){const h=Math.ceil(Math.log(l)/Math.log(2)),v=Math.pow(l,1/h);p=Array(h).fill(`atempo=${v}`).join(",")}else{const h=Math.ceil(Math.log(1/l)/Math.log(2)),v=Math.pow(l,1/h);p=Array(h).fill(`atempo=${v}`).join(",")}await Ge(["-i",r,"-filter_complex",`[0:v]${d}[v];[0:a]${p}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",s]);const b=await Ke(s);return He(b,"video/mp4")}finally{Xe(),await qe([r,s])}}async function pr(t,n=0,i=0,r=null,s=null){await Ye(),s&&Je(s);const l="input_fade.mp4",d="output_fade.mp4";try{await De(l,t);const p=[];if(n>0&&p.push(`fade=t=in:st=0:d=${n}`),i>0&&r){const h=r-i;p.push(`fade=t=out:st=${h}:d=${i}`)}if(p.length===0){const h=await Ke(l);return He(h,"video/mp4")}await Ge(["-i",l,"-vf",p.join(","),"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",d]);const b=await Ke(d);return He(b,"video/mp4")}finally{Xe(),await qe([l,d])}}async function mr(t,n=90,i=null){const r={90:"transpose=1",180:"transpose=1,transpose=1",270:"transpose=2","-90":"transpose=2"},s=r[n]||r[90];return st(t,s,i)}async function fr(t,n="horizontal",i=null){return st(t,n==="vertical"?"vflip":"hflip",i)}async function hr(t,n,i=null){const{width:r,height:s,x:l=0,y:d=0}=n,p=`crop=${r}:${s}:${l}:${d}`;return st(t,p,i)}const ya=15,br=85;function gr(){const[t,n]=a.useState(!1),[i,r]=a.useState(ga()),[s,l]=a.useState(0),[d,p]=a.useState(0),[b,h]=a.useState(null),[v,g]=a.useState(null),w=a.useRef(!0);a.useEffect(()=>{w.current=!0;const j=hn(T=>{w.current&&(p(T.loadProgress),T.error&&h(T.error))});return()=>{w.current=!1,Xe(),j()}},[]);const G=a.useCallback(async()=>{if(ga())return r(!0),!0;n(!0),h(null);try{return await Ye(),w.current&&(r(!0),n(!1)),!0}catch(j){return w.current&&(h(ra(j,"ffmpeg")),n(!1)),!1}},[]),P=a.useCallback(({progress:j})=>{w.current&&l(j)},[]),k=a.useCallback(async(j,T)=>{if(!ga()&&!await G())throw new Error("FFmpeg not loaded");g(j),l(0),h(null);const R=({progress:F=0,time:ue=0})=>{const be=ya+Math.round(F/100*br),We=Math.max(ya,Math.min(99,be));P({progress:We,time:ue})};try{P({progress:ya});const F=await T(R);return w.current&&(l(100),g(null),setTimeout(()=>{w.current&&l(0)},350)),F}catch(F){if(w.current){const be=F?.name==="AbortError"||/abort|cancel/i.test(F?.message||"");h(be?"Operation cancelled":ra(F,"ffmpeg")),l(0),g(null)}const ue=(F?.message||"").toLowerCase();if(ue.includes("wasm")||ue.includes("memory")||ue.includes("abort")||ue.includes("sharedarraybuffer"))try{await bn(),w.current&&r(!1)}catch{}throw F}},[G,P]),Y=a.useCallback(async(j,T,R)=>k("trim video",F=>gn(j,T,R,F)),[k]),W=a.useCallback(async(j,T)=>k("split video",R=>xn(j,T,R)),[k]),fe=a.useCallback(async j=>k("merge clips",T=>yn(j,T)),[k]),Q=a.useCallback(async(j,T)=>k("export video",R=>wn(j,T,R)),[k]),se=a.useCallback(async(j,T)=>{const R=ia[T];return k(`export for ${R?.label||T}`,F=>vn(j,T,F))},[k]),S=a.useCallback(async j=>kn(j),[]),te=a.useCallback(async(j,T=0)=>Sn(j,T),[]),le=a.useCallback(async j=>k("convert to web format",T=>jn(j,"mp4",T)),[k]),L=a.useCallback(async(j,T,R=.3)=>k("mix audio",F=>_o(j,T,R,F)),[k]),V=a.useCallback(async(j,T)=>k("adjust volume",R=>Ao(j,T,R)),[k]),ke=a.useCallback(async j=>k("mute audio",T=>Po(j,T)),[k]),K=a.useCallback(async(j,T="mp3")=>k("extract audio",R=>Uo(j,T,R)),[k]),ae=a.useCallback(async(j,T,R={})=>k("add text",F=>nr(j,T,R,F)),[k]),ye=a.useCallback(async(j,T,R="fade",F=1)=>k("add transition",ue=>rr(j,T,R,F,ue)),[k]),E=a.useCallback(async(j,T)=>k("change speed",R=>ur(j,T,R)),[k]),q=a.useCallback(async(j,T,R,F)=>k("add fade",ue=>pr(j,T,R,F,ue)),[k]),Se=a.useCallback(async(j,T)=>k("rotate video",R=>mr(j,T,R)),[k]),je=a.useCallback(async(j,T)=>k("flip video",R=>fr(j,T,R)),[k]),Ie=a.useCallback(async(j,T)=>k("crop video",R=>hr(j,T,R)),[k]),pe=a.useCallback(async(j,T,R)=>k("adjust colors",F=>sr(j,T,R,F)),[k]),ze=a.useCallback(async(j,T)=>k("adjust saturation",R=>lr(j,T,R)),[k]),we=a.useCallback(async(j,T)=>k("apply filter",R=>st(j,T,R)),[k]),me=a.useCallback(async(j,T)=>k("apply blur",R=>cr(j,T,R)),[k]),ce=a.useCallback(async(j,T)=>k("apply sharpen",R=>dr(j,T,R)),[k]),he=a.useCallback(()=>{h(null)},[]),ve=a.useCallback(()=>{l(0),g(null)},[]),Le=a.useCallback(async()=>{await Cn()},[]),C=a.useCallback(()=>{En(),w.current&&(g(null),l(0),h("Operation cancelled"))},[]),M=a.useCallback(async()=>{await Tn()},[]),H=a.useCallback(()=>{const j=Rn(),T=Mn();return{usage:j,usageFormatted:In(j),limitExceeded:T}},[]);return{isLoading:t,isReady:i,progress:s,loadProgress:d,error:b,currentOperation:v,initialize:G,preload:Le,clearError:he,resetProgress:ve,cancelOperation:C,clearMemory:M,getMemoryInfo:H,trimVideo:Y,splitVideo:W,mergeClips:fe,exportVideo:Q,exportWithPreset:se,getVideoInfo:S,generateThumbnail:te,convertToWebFormat:le,mixAudio:L,adjustVolume:V,muteAudio:ke,extractAudio:K,addTextOverlay:ae,addTransition:ye,changeSpeed:E,addFade:q,rotateVideo:Se,flipVideo:je,cropVideo:Ie,adjustBrightnessContrast:pe,adjustSaturation:ze,applyFilter:we,applyBlur:me,applySharpen:ce,resolutions:Co,exportPresets:ia,textPositions:Ca,transitionTypes:Lo}}const xr="clipcut-thumbnails",yr=1,Mt="thumbnails";let ea=null;function No(){return ea||(ea=new Promise((t,n)=>{const i=indexedDB.open(xr,yr);i.onerror=()=>{console.warn("[ThumbnailCache] Failed to open database"),n(i.error)},i.onsuccess=()=>{t(i.result)},i.onupgradeneeded=r=>{const s=r.target.result;if(!s.objectStoreNames.contains(Mt)){const l=s.createObjectStore(Mt,{keyPath:"id"});l.createIndex("videoId","videoId",{unique:!1}),l.createIndex("timestamp","timestamp",{unique:!1})}}}),ea)}function $o(t,n){return`${t}_t${Math.floor(n*10)}`}async function wr(t,n){try{const i=await No(),r=$o(t,n);return new Promise(s=>{const p=i.transaction(Mt,"readonly").objectStore(Mt).get(r);p.onsuccess=()=>{const b=p.result;b&&b.data?s(new Blob([b.data],{type:"image/jpeg"})):s(null)},p.onerror=()=>s(null)})}catch(i){return console.warn("[ThumbnailCache] Error getting cached thumbnail:",i),null}}async function vr(t,n,i){try{const r=await No(),s=$o(t,n),l=await i.arrayBuffer();return new Promise(d=>{const p=r.transaction(Mt,"readwrite");p.objectStore(Mt).put({id:s,videoId:t,time:n,data:l,timestamp:Date.now()}),p.oncomplete=()=>d(!0),p.onerror=()=>d(!1)})}catch(r){console.warn("[ThumbnailCache] Error caching thumbnail:",r)}}function ta(t){return new Promise((n,i)=>{const r=URL.createObjectURL(t);if(t.type?.startsWith("audio/")){const p=new Audio;p.preload="metadata",p.onloadedmetadata=()=>{URL.revokeObjectURL(r),n({duration:p.duration||0,width:0,height:0})},p.onerror=()=>{URL.revokeObjectURL(r),n({duration:0,width:0,height:0})},p.src=r;return}const l=document.createElement("video");l.preload="metadata",l.muted=!0;const d=setTimeout(()=>{URL.revokeObjectURL(r),n({duration:0,width:0,height:0})},5e3);l.onloadedmetadata=()=>{clearTimeout(d),URL.revokeObjectURL(r),n({duration:isFinite(l.duration)?l.duration:0,width:l.videoWidth||0,height:l.videoHeight||0})},l.onerror=()=>{clearTimeout(d),URL.revokeObjectURL(r),n({duration:0,width:0,height:0})},l.src=r})}function $t(t,n=0){return new Promise((i,r)=>{const s=URL.createObjectURL(t),l=document.createElement("video");l.preload="auto",l.muted=!0;const d=setTimeout(()=>{p(),i(aa())},8e3);function p(){clearTimeout(d),URL.revokeObjectURL(s)}l.onloadeddata=()=>{const b=Math.min(n,l.duration-.1);l.currentTime=Math.max(0,b)},l.onseeked=()=>{try{const b=document.createElement("canvas"),v=Math.min(1,320/(l.videoWidth||320));b.width=Math.round((l.videoWidth||320)*v),b.height=Math.round((l.videoHeight||180)*v),b.getContext("2d").drawImage(l,0,0,b.width,b.height),b.toBlob(w=>{p(),i(w||aa())},"image/jpeg",.7)}catch{p(),i(aa())}},l.onerror=()=>{p(),i(aa())},l.src=s})}function aa(){const t=document.createElement("canvas");t.width=160,t.height=90;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,160,90);return i.addColorStop(0,"#1a2332"),i.addColorStop(1,"#0a0a0a"),n.fillStyle=i,n.fillRect(0,0,160,90),n.fillStyle="rgba(117, 170, 219, 0.3)",n.beginPath(),n.moveTo(65,30),n.lineTo(65,60),n.lineTo(100,45),n.closePath(),n.fill(),new Promise(r=>{t.toBlob(s=>r(s||new Blob),"image/jpeg",.7)})}const Za={"480p":{width:854,height:480},"720p":{width:1280,height:720},"1080p":{width:1920,height:1080}},eo={"480p":{28:1e6,23:2e6,18:4e6,15:6e6},"720p":{28:25e5,23:5e6,18:8e6,15:12e6},"1080p":{28:4e6,23:8e6,18:16e6,15:24e6}};function kr(t,n){const i=eo[t]||eo["1080p"];return i[n]||i[18]}const to={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}};function ao(t,n,i,r){const s=n.text||"";if(!s.trim())return;const l=Math.max(12,Math.round((n.textSize||48)*(r/1080))),d=n.textBold?"bold":"normal",p=n.textItalic?"italic":"normal",b=n.textFontFamily||"Spline Sans";t.font=`${p} ${d} ${l}px '${b}', Arial, sans-serif`;let h,v,g,w;if(n.textX!=null&&n.textY!=null)h=n.textX/100*i,v=n.textY/100*r,g="center",w="middle";else{const G=to[n.textPosition||"center"]||to.center;h=G.x*i,v=G.y*r,g=G.align,w=G.baseline}if(t.textAlign=g,t.textBaseline=w,n.textBgColor&&n.textBgColor!=="transparent"){const G=t.measureText(s),P=l*.25,k=G.width,Y=l*1.2;let W=h-P;g==="center"?W=h-k/2-P:g==="right"&&(W=h-k-P);let fe=v-P;w==="middle"?fe=v-Y/2-P:w==="bottom"&&(fe=v-Y-P),t.fillStyle=n.textBgColor,t.fillRect(W,fe,k+P*2,Y+P*2)}if(t.shadowColor="rgba(0,0,0,0.7)",t.shadowBlur=4,t.shadowOffsetX=0,t.shadowOffsetY=1,t.fillStyle=n.textColor||"#ffffff",t.fillText(s,h,v),n.textUnderline){const G=t.measureText(s);let P=h;g==="center"?P=h-G.width/2:g==="right"&&(P=h-G.width);const k=w==="top"?v+l:w==="middle"?v+l/2:v;t.strokeStyle=n.textColor||"#ffffff",t.lineWidth=Math.max(1,l/20),t.beginPath(),t.moveTo(P,k+2),t.lineTo(P+G.width,k+2),t.stroke()}t.shadowColor="transparent",t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0}function Sr(t){return new Promise((n,i)=>{const r=document.createElement("video");r.preload="auto",r.playsInline=!0,r.muted=!1,r.style.position="fixed",r.style.top="-9999px",r.style.left="-9999px",r.style.width="1px",r.style.height="1px",document.body.appendChild(r);const s=t instanceof Blob?URL.createObjectURL(t):t;r.src=s;const l=()=>{r.removeEventListener("error",d)},d=()=>{l(),i(new Error(`Failed to load video: ${r.error?.message||"unknown error"}`))};r.addEventListener("error",d),r.addEventListener("loadeddata",()=>{l(),n({video:r,url:s})},{once:!0}),r.load()})}function jr(t){return new Promise((n,i)=>{const r=document.createElement("audio");r.preload="auto",r.style.display="none",document.body.appendChild(r);const s=t instanceof Blob?URL.createObjectURL(t):t;r.src=s,r.addEventListener("error",()=>{i(new Error("Failed to load audio"))}),r.addEventListener("canplaythrough",()=>{n({audio:r,url:s})},{once:!0}),r.load()})}function Cr(){const t=["video/webm;codecs=vp8,opus","video/webm;codecs=vp8","video/webm;codecs=vp9,opus","video/webm;codecs=vp9","video/webm"];for(const n of t)if(MediaRecorder.isTypeSupported(n))return n;return""}function Tr(t){const n=[];return t.brightness!=null&&t.brightness!==0&&n.push(`brightness(${1+t.brightness/100})`),t.contrast!=null&&t.contrast!==0&&n.push(`contrast(${1+t.contrast/100})`),t.saturation!=null&&t.saturation!==0&&n.push(`saturate(${1+t.saturation/100})`),t.blur!=null&&t.blur>0&&n.push(`blur(${t.blur}px)`),n.length>0?n.join(" "):"none"}function wa(t){const n=Math.floor(t/60),i=Math.floor(t%60);return`${n}:${i.toString().padStart(2,"0")}`}async function Ir({clips:t,bgMusic:n=null,totalDuration:i,resolution:r="1080p",settings:s={},onProgress:l,abortSignal:d}){const{quality:p=23,fps:b=30}=s,h=Za[r]||Za["1080p"],{width:v,height:g}=h,w=kr(r,p),G=Cr();if(Lt({category:"export",message:"canvasExport.start",level:"info",data:{resolution:r,fps:b,quality:p,totalDuration:i,clipCount:t?.length??0}}),!G)throw Lt({category:"export",message:"canvasExport.no_mime_support",level:"error"}),new Error("Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.");const P=t.filter(E=>E.type!=="audio"&&E.type!=="text"&&E.type!=="sticker"&&E.file).sort((E,q)=>E.startTime-q.startTime),Y=t.filter(E=>E.type==="text"||E.type==="sticker"||E.text?.trim()).map(E=>{const q=E.startTime||0;return{...E,_start:q,_end:q+(E.duration||i)}});if(P.length===0)throw Lt({category:"export",message:"canvasExport.no_video_clips",level:"error"}),new Error("No video clips to export.");const W=document.createElement("canvas");W.width=v,W.height=g;const fe=W.getContext("2d"),Q=new AudioContext,se=Q.createMediaStreamDestination();let S=null,te=null,le=null;if(n?.file)try{const E=await jr(n.file);S=E.audio,te=E.url,S.loop=!0;const q=Q.createMediaElementSource(S);le=Q.createGain(),le.gain.value=n.volume??.3,q.connect(le),le.connect(se)}catch(E){console.warn("Could not load background music, continuing without it:",E),S=null}const L=W.captureStream(b),V=se.stream.getAudioTracks();for(const E of V)L.addTrack(E);const ke=[],K=new MediaRecorder(L,{mimeType:G,videoBitsPerSecond:w,audioBitsPerSecond:128e3});K.ondataavailable=E=>{E.data.size>0&&ke.push(E.data)},K.start(1e3),S&&(S.currentTime=0,S.play().catch(()=>{}));const ae=Date.now();for(let E=0;E<P.length&&!d?.aborted;E++){const q=P[E],Se=q.trimStart||0,je=q.duration||0,Ie=q.speed||1,{video:pe,url:ze}=await Sr(q.file);let we=null;try{we=Q.createMediaElementSource(pe);const ce=Q.createGain();ce.gain.value=q.isMuted?0:q.volume??1,we.connect(ce),ce.connect(se)}catch(ce){console.warn("Could not route clip audio:",ce)}pe.currentTime=Se,pe.playbackRate=Ie;const me=Tr(q);await new Promise(ce=>{pe.addEventListener("seeked",ce,{once:!0})}),await pe.play(),await new Promise((ce,he)=>{let ve;const Le=Se+je,C=q.fadeIn||0,M=q.fadeOut||0,H=()=>{if(d?.aborted){cancelAnimationFrame(ve),pe.pause(),ce();return}const j=pe.currentTime,T=j-Se;if(je>0&&j>=Le-.05){pe.pause(),oo(fe,pe,v,g,me,q,T,je,C,M,Y,q.startTime+T),ce();return}oo(fe,pe,v,g,me,q,T,je,C,M,Y,q.startTime+T);const R=q.startTime+T,F=i>0?Math.min(99,R/i*100):0,ue=(Date.now()-ae)/1e3,be=F>1?ue/F*(100-F):0;l?.({percent:Math.round(F),elapsed:wa(ue),eta:wa(be),label:P.length>1?`Exporting clip ${E+1}/${P.length}`:"Exporting video..."}),ve=requestAnimationFrame(H)};pe.addEventListener("ended",()=>{cancelAnimationFrame(ve),pe.pause(),ce()},{once:!0}),pe.addEventListener("error",()=>{cancelAnimationFrame(ve),he(new Error(`Video playback error during export of clip ${E+1}`))},{once:!0}),ve=requestAnimationFrame(H)}),pe.pause(),pe.src="",pe.load(),document.body.removeChild(pe),URL.revokeObjectURL(ze),q.startTime+je}S&&(S.pause(),S.src="",document.body.removeChild(S),te&&URL.revokeObjectURL(te));const ye=await new Promise(E=>{K.onstop=()=>{const q=new Blob(ke,{type:G});E(q)},K.stop()});if(L.getTracks().forEach(E=>E.stop()),se.stream.getTracks().forEach(E=>E.stop()),await Q.close().catch(()=>{}),l?.({percent:100,elapsed:wa((Date.now()-ae)/1e3),eta:"0:00",label:"Complete"}),d?.aborted)throw Lt({category:"export",message:"canvasExport.cancelled",level:"warning"}),new Error("Export cancelled.");return Lt({category:"export",message:"canvasExport.complete",level:"info",data:{sizeBytes:ye.size,duration:i,elapsedMs:Date.now()-ae}}),{blob:ye,duration:i,size:ye.size}}function oo(t,n,i,r,s,l,d,p,b,h,v,g){t.save();let w=1;b>0&&d<b&&(w=d/b),h>0&&p>0&&p-d<h&&(w=Math.min(w,(p-d)/h)),t.globalAlpha=Math.max(0,Math.min(1,w)),s&&s!=="none"&&(t.filter=s),l.rotation&&(t.translate(i/2,r/2),t.rotate(l.rotation*Math.PI/180),t.translate(-i/2,-r/2));const G=n.videoWidth||i,P=n.videoHeight||r,k=Math.min(i/G,r/P),Y=G*k,W=P*k,fe=(i-Y)/2,Q=(r-W)/2;t.fillStyle="#000000",t.fillRect(0,0,i,r),t.drawImage(n,fe,Q,Y,W),t.filter="none",t.globalAlpha=1;for(const se of v)g>=se._start&&g<=se._end&&ao(t,se,i,r);l.text?.trim()&&l.type!=="text"&&ao(t,l,i,r),t.restore()}const Mr="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease",Rr=80,Er=[.7,.95],_r=[.4,.7,.9],Ar=a.memo(function({isOpen:n,onClose:i,title:r,zIndex:s=2900,children:l}){const d=a.useRef(null),p=a.useRef({startY:0,isDragging:!1,startSnap:0}),[b,h]=a.useState(0),[v,g]=a.useState(!1),[w,G]=a.useState(!1),[P,k]=a.useState(0);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const K=window.matchMedia("(orientation: landscape) and (max-width: 900px)"),ae=()=>G(K.matches);return ae(),K.addEventListener?K.addEventListener("change",ae):K.addListener(ae),()=>{K.removeEventListener?K.removeEventListener("change",ae):K.removeListener(ae)}},[]);const Y=w?_r:Er,W=Y[Math.min(P,Y.length-1)]??Y[0];a.useEffect(()=>{n&&k(0),h(0)},[n,w]),a.useEffect(()=>{if(n){const K=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=K}}},[n]);const fe=a.useCallback(K=>{p.current.startY=K.touches[0].clientY,p.current.isDragging=!0,p.current.startSnap=P,g(!0)},[P]),Q=a.useCallback(K=>{if(!p.current.isDragging)return;const ae=K.touches[0].clientY-p.current.startY;h(ae)},[]),se=a.useCallback(()=>{if(!p.current.isDragging)return;p.current.isDragging=!1,g(!1);const K=b,ae=window.innerHeight||800;if(K>Rr&&p.current.startSnap===0){h(0),i();return}if(Y.length>1){const ye=K<0?-1:K>0?1:0,E=ae*.08,q=Math.round(Math.abs(K)/E);if(q>0){let Se=p.current.startSnap-ye*q;Se=Math.max(0,Math.min(Y.length-1,Se)),k(Se)}}h(0)},[b,i,Y]),S={position:"fixed",inset:0,bottom:"56px",background:"rgba(0,0,0,0.4)",zIndex:s-100,opacity:n?1:0,pointerEvents:n?"auto":"none",transition:"opacity 0.3s ease"},te={position:"fixed",bottom:"56px",left:0,right:0,height:`${Math.round(W*100)}vh`,zIndex:s,background:"#0e1218",borderTop:"2px solid rgba(117, 170, 219, 0.15)",borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",transform:n?`translateY(${Math.max(0,b)}px)`:"translateY(100%)",transition:v?"none":Mr},le={flexShrink:0,cursor:"grab",touchAction:"none"},L={width:"36px",height:"4px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"8px auto 6px"},V={fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"center",padding:"0 16px 8px",textTransform:"uppercase",letterSpacing:"0.5px"},ke={flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:S,onClick:i}),e.jsxs("div",{ref:d,style:te,"aria-hidden":!n,children:[e.jsxs("div",{style:le,onTouchStart:fe,onTouchMove:Q,onTouchEnd:se,children:[e.jsx("div",{style:L}),r&&e.jsx("div",{style:V,children:r})]}),e.jsx("div",{style:ke,children:l})]})]})}),gi=.1,Oo=8,xi=3,yi=t=>5*Math.pow(250/5,t/100),wi=(t,n)=>t*n,vi=(t,n)=>t/n,ki=(t,n,i)=>{const r=new Set([0,i]);for(const s of t)s.id!==n&&(r.add(s.startTime),r.add(s.startTime+s.duration));return[...r].sort((s,l)=>s-l)},no=(t,n,i,r=Oo)=>{const s=r/i;let l=t,d=null,p=s;for(const b of n){const h=Math.abs(t-b);h<p&&(p=h,l=b,d=b)}return{time:l,snappedTo:d}},Si=(t,n,i,r,s=Oo)=>{const l=no(t,i,r,s),d=no(t+n,i,r,s),p=l.snappedTo!==null?Math.abs(t-l.time):1/0,b=d.snappedTo!==null?Math.abs(t+n-d.time):1/0;return p<=b&&l.snappedTo!==null?{startTime:l.time,snappedTo:l.snappedTo}:d.snappedTo!==null?{startTime:d.time-n,snappedTo:d.snappedTo}:{startTime:t,snappedTo:null}},Pr=t=>{const i=80/t,r=[.1,.25,.5,1,2,5,10,15,30,60,120,300];for(const s of r)if(s>=i*.6)return s;return 300},ji=(t,n)=>{const i=Pr(n),r=i<=1?4:i<=5?5:4,s=i/r,l=[],d=t+i;for(let p=0;p<=d;p+=s){const b=p%i;if(b<.001||Math.abs(b-i)<.001){const v=Math.floor(p/60),g=p%60,w=g===Math.floor(g)?Math.floor(g).toString().padStart(2,"0"):g.toFixed(1).padStart(4,"0");l.push({time:p,label:`${v}:${w}`,major:!0})}else l.push({time:p,label:"",major:!1})}return l},ro=t=>{t<0&&(t=0);const n=Math.floor(t/60),i=t%60;return`${n}:${i.toFixed(1).padStart(4,"0")}`},Ci=t=>{if(t<60)return`${t.toFixed(1)}s`;const n=Math.floor(t/60),i=(t%60).toFixed(0);return`${n}:${i.padStart(2,"0")}`},Ur=t=>t?.type!=="audio"&&t?.type!=="text",Fo=t=>Ur(t)&&!t?.blobUrl&&!!t?._mediaError,Lr=t=>t?.type!=="audio"&&!t?.blobUrl&&!!t?._mediaError;function Nr({restoredClips:t=[],mediaItems:n=[],projectName:i="Untitled Project"}){const r=t.filter(Fo).length,s=n.filter(Lr).length,l=r>0||s>0;return{clips:t,mediaItems:n,unresolvedClipCount:r,unresolvedMediaCount:s,hasUnavailableMedia:l,notification:l?{level:"warning",message:`Loaded "${i}" — ${r} clip(s) need media re-import`}:{level:"success",message:`Loaded "${i}" (${t.length} clips)`}}}function Ti({videoSrc:t=null,hasTimelineClips:n=!1,hasUnavailableMediaClips:i=!1,isRestoringMedia:r=!1}){return r?{title:"Restoring media...",description:"Loading media files from storage",showImportHint:!1}:t?{title:null,description:null,showImportHint:!1}:i?{title:"Media missing",description:"This project still has clips, but one or more source files need to be re-imported.",showImportHint:!0}:n?{title:"No clip at playhead",description:"Move the playhead over a clip on the timeline to preview",showImportHint:!1}:{title:"No media loaded",description:"Import media and add clips to the timeline to preview",showImportHint:!0}}function $r(t=[]){return t.some(Fo)}function Or({projectId:t,isRestored:n,hasBeenNonEmpty:i,clipsCount:r,mediaItemsCount:s}){return t?n?(r||0)===0&&(s||0)===0&&!i?{skip:!0,reason:"empty-without-session-edit"}:{skip:!1,reason:null}:{skip:!0,reason:"restore-in-progress"}:{skip:!1,reason:null}}let io=!1;function Fr(){if(io)return;const t=Nn();if(!t)return;io=!0;const n=typeof AbortSignal<"u"&&AbortSignal.timeout?{signal:AbortSignal.timeout(5e3)}:{};fetch(`${t}/health`,{method:"GET",mode:"cors",cache:"no-store",...n}).catch(i=>{i?.message})}const so=a.lazy(()=>Be(()=>import("./QcUKHxoV.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Br=a.lazy(()=>Be(()=>import("./B2lHJhs_.js"),__vite__mapDeps([11,1,6,3,4,5,7,8,9,2,10]))),lo=a.lazy(()=>Be(()=>import("./CHI90SDF.js"),__vite__mapDeps([12,1,13,6,3,4,5,7,8,9,2,10]))),co=a.lazy(()=>Be(()=>import("./BbWHuruS.js"),__vite__mapDeps([14,1,6,3,4,5,7,8,9,2,10]))),uo=a.lazy(()=>Be(()=>import("./ChXTAwCo.js"),__vite__mapDeps([15,1,13,3,4,5,6,7,8,9,2,10]))),po=a.lazy(()=>Be(()=>import("./C--gB11h.js"),__vite__mapDeps([16,1,13,3,4,5,6,7,8,9,2,10]))),mo=a.lazy(()=>Be(()=>import("./Bsctfrlc.js"),__vite__mapDeps([17,1,3,4,5,6,7,8,9,2,10]))),fo=a.lazy(()=>Be(()=>import("./BcDlcVU4.js"),__vite__mapDeps([18,1,3,4,5,6,7,8,9,2,10]))),ho=a.lazy(()=>Be(()=>import("./CQib_iS_.js"),__vite__mapDeps([19,1,13,3,4,5,6,7,8,9,2,10]))),bo=a.lazy(()=>Be(()=>import("./DhfgVgbe.js"),__vite__mapDeps([20,1,6,3,4,21,5,7,8,9,2,10]))),go=a.lazy(()=>Be(()=>import("./B2EROxef.js"),__vite__mapDeps([22,1,3,4,5,6,7,8,9,2,10]))),Dr="http://127.0.0.1:7548/ingest/6a46b320-d8b5-43ce-8840-a981f4bbeaac",xo="199465";function Tt(t=[]){const n=Array.isArray(t)?t:[],r=[...n].sort((l,d)=>(l.startTime||0)-(d.startTime||0)).map(l=>`${l.id||"no-id"}:${l.type||"unknown"}:${Number(l.startTime||0).toFixed(2)}:${Number(l.duration||0).toFixed(2)}`).slice(0,12).join("|"),s=n.reduce((l,d)=>Math.max(l,Number(d.startTime||0)+Number(d.duration||0)),0);return{count:n.length,lastEnd:Number(s.toFixed(3)),signature:r}}function It({hypothesisId:t,location:n,message:i,data:r={},runId:s="pre-fix"}){fetch(Dr,{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":xo},body:JSON.stringify({sessionId:xo,runId:s,hypothesisId:t,location:n,message:i,data:r,timestamp:Date.now()})}).catch(()=>{})}const zr=`
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
  ${Bn}
  ${On}
`;function va(t,n,i,r=!1){const s=a.useRef(!1),l=a.useRef(0),d=a.useRef(0);return a.useCallback((b,h)=>{b.preventDefault(),s.current=!0,l.current=t==="y"?b.clientY:b.clientX,d.current=h;const v=b.currentTarget;v.classList.add("dragging");const g=G=>{if(!s.current)return;const P=t==="y"?l.current-G.clientY:G.clientX-l.current,k=r?-P:P;n(d.current+k)},w=()=>{s.current=!1,v.classList.remove("dragging"),document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",w),document.body.style.cursor="",document.body.style.userSelect=""};document.addEventListener("mousemove",g),document.addEventListener("mouseup",w),document.body.style.cursor=t==="y"?"row-resize":"col-resize",document.body.style.userSelect="none"},[t,n,i,r])}const Wr=280,yo=280,wo=320,vo=360;function ka(t){return Math.max(200,Math.min(400,Math.floor(t*.25)))}function Sa(t){return Math.max(220,Math.min(400,Math.floor(t*.25)))}const ko={width:"100%",minWidth:0,minHeight:0,alignSelf:"stretch"},Ct=a.memo(({width:t,height:n="100%"})=>e.jsx("div",{style:{width:t,height:n,background:"linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderRight:"1px solid rgba(117,170,219,0.06)"},children:e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}})}));Ct.displayName="PanelLoadingFallback";const Ta=a.memo(()=>e.jsx("div",{style:{height:"220px",background:"linear-gradient(180deg, #0c1018 0%, #08090c 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderTop:"2px solid rgba(117,170,219,0.08)"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("span",{style:{color:"#3d4a5c",fontSize:"11px",fontWeight:500},children:"Loading timeline..."})]})}));Ta.displayName="TimelineLoadingFallback";const ja=[{target:"media-panel",title:"Media Library",desc:"Import videos and audio files here. Drag them to the timeline to start editing.",position:"right"},{target:"player",title:"Preview",desc:"Watch your edit in real-time. Effects and text overlays preview live without rendering.",position:"bottom"},{target:"inspector",title:"Inspector",desc:"Adjust clip properties — filters, speed, volume, text overlays, and transforms.",position:"left"},{target:"timeline",title:"Timeline",desc:"Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.",position:"top"}],Bo=a.memo(({onComplete:t})=>{const[n,i]=a.useState(0),r=ja[n],s=n===ja.length-1;return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9e3,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:l=>{l.target===l.currentTarget&&t()},children:e.jsxs("div",{style:{background:"#1a2332",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"90%",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 16px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(117,170,219,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#75aadb"},children:n+1}),e.jsx("span",{style:{fontSize:"15px",fontWeight:600,color:"#f1f5f9"},children:r.title})]}),e.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",lineHeight:1.6,margin:"0 0 16px"},children:r.desc}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"4px"},children:ja.map((l,d)=>e.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:d===n?"#75aadb":"rgba(255,255,255,0.1)"}},d))}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:t,style:{padding:"8px 16px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",background:"transparent",color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:"Skip"}),e.jsx("button",{onClick:()=>s?t():i(l=>l+1),style:{padding:"8px 20px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #75aadb, #5a8cbf)",color:"#0a0a0a",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:s?"Get Started":"Next"})]})]})]})})});Bo.displayName="WalkthroughOverlay";const Vr=(t,n)=>{switch(n.type){case"SET_CLIPS":return{...t,clips:n.clips,past:[...t.past.slice(-49),t.clips],future:[]};case"UNDO":return t.past.length===0?t:{clips:t.past[t.past.length-1],past:t.past.slice(0,-1),future:[t.clips,...t.future]};case"REDO":return t.future.length===0?t:{clips:t.future[0],past:[...t.past,t.clips],future:t.future.slice(1)};case"RESET":return{clips:[],past:[],future:[]};default:return t}};let Kr=0;const oa=()=>`clip-${Date.now()}-${(++Kr).toString(36)}`,Do=a.memo(({message:t,progress:n,subMessage:i,operationLabel:r,onCancel:s})=>e.jsx("div",{className:"loading-overlay",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2e3,backdropFilter:"blur(6px)"},role:"dialog","aria-modal":"true","aria-label":"Processing",children:e.jsxs("div",{className:"loading-card",style:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"36px 52px",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",minWidth:"280px"},children:[e.jsxs("div",{style:{width:"56px",height:"56px",margin:"0 auto 20px",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("div",{style:{position:"absolute",inset:"6px",border:"2px solid rgba(117,170,219,0.1)",borderBottomColor:"rgba(117,170,219,0.5)",borderRadius:"50%",animation:"spin 1.2s linear infinite reverse"}})]}),e.jsx("p",{style:{color:"white",fontSize:"15px",margin:"0 0 6px",fontWeight:600},children:t}),r&&e.jsx("p",{style:{color:"rgba(255, 255, 255, 0.65)",fontSize:"12px",margin:"0 0 8px"},children:r}),i&&e.jsx("p",{style:{color:"#64748b",fontSize:"12px",margin:"0 0 16px"},children:i}),n>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"220px",height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden",margin:"16px auto 10px"},children:e.jsx("div",{className:n<100?"shimmer-bar":"",style:{height:"100%",width:`${n}%`,background:n>=100?"linear-gradient(90deg, #22c55e, #16a34a)":"linear-gradient(90deg, #75aadb, #5a8cbf)",transition:"width 0.3s ease",borderRadius:"3px"}})}),e.jsxs("p",{style:{color:"#75aadb",fontSize:"13px",fontWeight:700,margin:"0 0 16px"},children:[Math.round(n),"%"]})]}),s&&e.jsx("button",{onClick:s,style:{marginTop:n>0?"0":"16px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",padding:"8px 24px",color:"#ef4444",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},"aria-label":"Cancel operation",children:"Cancel"})]})}));Do.displayName="LoadingOverlay";const zo=a.memo(({progress:t})=>t>=100?null:e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"3px",background:"rgba(0,0,0,0.3)",zIndex:100,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.max(t,2)}%`,background:"linear-gradient(90deg, #5a8cbf, #75aadb)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0",boxShadow:"0 0 8px rgba(117,170,219,0.4)"}})}));zo.displayName="FFmpegInitBar";const Wo=a.memo(({type:t="error",message:n,onClose:i,autoClose:r=!1})=>{const[s,l]=a.useState(!1);a.useEffect(()=>{if(!r)return;const b=setTimeout(()=>l(!0),Ya),h=setTimeout(i,Ya+Xa);return()=>{clearTimeout(b),clearTimeout(h)}},[r,i]);const d=a.useCallback(()=>{l(!0),setTimeout(i,Xa)},[i]),p={error:{bg:"linear-gradient(135deg, #ef4444, #dc2626)",shadow:"rgba(239,68,68,0.25)",icon:"error"},success:{bg:"linear-gradient(135deg, #22c55e, #16a34a)",shadow:"rgba(34,197,94,0.25)",icon:"check_circle"},warning:{bg:"linear-gradient(135deg, #f59e0b, #d97706)",shadow:"rgba(245,158,11,0.25)",icon:"warning"},info:{bg:"linear-gradient(135deg, #3b82f6, #2563eb)",shadow:"rgba(59,130,246,0.25)",icon:"info"}}[t]||{bg:"#ef4444",shadow:"rgba(0,0,0,0.2)",icon:"error"};return e.jsxs("div",{className:s?"toast-exit":"toast-enter",style:{position:"fixed",bottom:"24px",right:"24px",background:p.bg,color:"white",padding:"12px 18px",borderRadius:"10px",display:"flex",alignItems:"center",gap:"10px",boxShadow:`0 8px 28px ${p.shadow}`,zIndex:3e3,maxWidth:"380px",fontSize:"13px",backdropFilter:"blur(4px)"},role:t==="error"?"alert":"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",opacity:.9},children:p.icon}),e.jsx("span",{style:{flex:1,lineHeight:1.4},children:n}),e.jsx("button",{onClick:d,style:{background:"rgba(255,255,255,0.15)",border:"none",color:"white",cursor:"pointer",padding:"4px",borderRadius:"50%",display:"flex",width:"22px",height:"22px",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0},children:"✕"})]})});Wo.displayName="Toast";function Hr(t,n){const i=t.find(s=>s.type==="video");if(!i)return null;if(i.file)return{file:i.file,mediaId:i.mediaId};const r=n.find(s=>s.id===i.mediaId);return r?.file?{file:r.file,mediaId:i.mediaId}:null}function Yr(t){const n=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(n)return n;const i=new Date,r=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${r(i.getMonth()+1)}-${r(i.getDate())}`}async function Xr(t,n,i,r,s,l,d){const p=new Map;for(const g of i)if(!(!g.file||g.storagePath))try{const w=await To(t,n,g.file);p.set(g.id,w)}catch(w){console.warn("[autosave] Media upload failed:",g.name,w)}if(p.size===0)return{changed:!1,clips:r,mediaItems:i};const b=i.map(g=>p.has(g.id)?{...g,storagePath:p.get(g.id)}:g),h=r.map(g=>{const w=g.mediaId&&p.get(g.mediaId);return w?{...g,storagePath:w}:g}),v=typeof d=="function"?d():r;return It({hypothesisId:"H1",location:"VideoEditor.jsx:uploadPendingMediaForProject",message:"media upload finished; checking stale timeline overwrite risk",data:{projectId:n,uploadedCount:p.size,saveSnapshot:Tt(r),latestBeforeApply:Tt(v),replacementState:Tt(h)}}),s(b),l(h),{changed:!0,clips:h,mediaItems:b}}const Gr=(t,n,i,r,s,l,d,p,b,h,v,g,w,G=dn)=>{const[P,k]=a.useState(null),Y=a.useRef(!1),W=a.useRef(t),fe=a.useRef(null),Q=a.useRef(null),se=a.useRef(null),S=a.useRef(0),te=a.useRef(0),le=a.useRef(!1),L=a.useRef(i);L.current=i;const V=a.useRef(r);V.current=r;const ke=a.useRef(n);ke.current=n;const K=a.useRef(l);K.current=l;const ae=a.useRef(d);ae.current=d;const ye=a.useRef(h);ye.current=h;const E=a.useRef(g);E.current=g,a.useEffect(()=>{W.current=t},[t]),a.useEffect(()=>{const Se=()=>{Fr(),Be(()=>import("./BEUlQjCE.js"),__vite__mapDeps([23,1,24])).then(Ie=>Ie.warmupFaceModels?.()).catch(()=>{})};if(typeof requestIdleCallback=="function"){const Ie=requestIdleCallback(Se,{timeout:1500});return()=>cancelIdleCallback?.(Ie)}const je=setTimeout(Se,500);return()=>clearTimeout(je)},[]),a.useEffect(()=>{const Se=new Set(["file","blobUrl","thumbnail","isProcessing"]),je=we=>{const me={};for(const[ce,he]of Object.entries(we))Se.has(ce)||(me[ce]=he);return we.mediaId&&W.current&&(me.idbKey=`idb://${W.current}:${we.mediaId}`),me.storagePath&&me.storagePath.startsWith("blob:")&&delete me.storagePath,me},Ie=we=>{const me={};for(const[ce,he]of Object.entries(we))Se.has(ce)||(me[ce]=he);return we.id&&W.current&&(me.idbKey=`idb://${W.current}:${we.id}`),me.blobUrl&&delete me.blobUrl,me},pe=async()=>{if(Y.current)return{saved:!1,skipReason:"in-progress"};const we=L.current?.length||0,me=V.current?.length||0;(we>0||me>0)&&(le.current=!0);const ce=Or({projectId:W.current,isRestored:w?w.current:!0,hasBeenNonEmpty:le.current,clipsCount:we,mediaItemsCount:me});if(It({hypothesisId:"H4",location:"VideoEditor.jsx:useAutoSave.doSave.guard",message:"autosave guard evaluated",data:{projectId:W.current,guardSkip:ce.skip,guardReason:ce.reason,isRestored:w?w.current:!0,hasBeenNonEmpty:le.current,clipsCount:we,mediaItemsCount:me}}),ce.skip)return{saved:!1,skipReason:ce.reason};if(S.current>=3){if(te.current>0)return te.current--,{saved:!1,skipReason:"backoff"};te.current=Math.min(Math.pow(2,S.current-3),20)}Y.current=!0;try{const he=L.current,ve=V.current,Le=ke.current,C=ye.current,M={id:W.current,name:Le,clips:he.map(je),mediaItems:ve.map(Ie),duration:K.current,resolution:ae.current||"1080p",timelineMarkers:E.current||[]};It({hypothesisId:"H2",location:"VideoEditor.jsx:useAutoSave.doSave.snapshot",message:"autosave snapshot captured",data:{projectId:W.current,clips:Tt(he),mediaItemsCount:ve.length}}),(C?.storagePath||C?.mediaId)&&(M.bgMusic={name:C.name,volume:C.volume??.3},C.storagePath&&(M.bgMusic.storagePath=C.storagePath),C.mediaId&&(M.bgMusic.mediaId=C.mediaId));const H=Hr(he,ve),j=H?.mediaId||null;if(H&&j!==fe.current)try{const R=await $t(H.file,1);if(R&&R.size>500){fe.current=j,s&&(M.thumbnail=R);const F=await new Promise(ue=>{const be=new FileReader;be.onloadend=()=>ue(be.result),be.readAsDataURL(R)});M.thumbnailDataUrl=F,Q.current=F}}catch(R){console.warn("Auto-save thumbnail generation failed:",R)}else Q.current&&(M.thumbnailDataUrl=Q.current);if(s){const R=await un(()=>Zt(s,M),{maxRetries:2,baseDelay:1e3,maxDelay:5e3});w&&(w.current=!0);const F=W.current;let ue=!1;if(R?.id&&R.id!==F&&(W.current=R.id,F))try{await Pn(F,R.id),ue=!0,R.id}catch(We){console.warn("[autosave] IndexedDB re-key failed:",We)}const be=W.current;if(be&&Nt()){const We=await Xr(s,be,V.current,L.current,p,b,()=>L.current);if(We.changed&&(L.current=We.clips,V.current=We.mediaItems),We.changed||ue){const at={id:be,name:ke.current,clips:(We.changed?We.clips:L.current).map(je),mediaItems:V.current.map(Ie),duration:K.current,resolution:ae.current||"1080p",timelineMarkers:E.current||[],...Q.current?{thumbnailDataUrl:Q.current}:{}};ye.current?.storagePath&&(at.bgMusic={storagePath:ye.current.storagePath,name:ye.current.name,volume:ye.current.volume??.3}),await Zt(s,at)}const lt=ye.current;if(lt?.file&&!lt?.storagePath&&be)try{const at=await To(s,be,lt.file);v(Ft=>Ft?{...Ft,storagePath:at}:null),await Zt(s,{id:be,name:ke.current,clips:L.current.map(je),mediaItems:V.current.map(Ie),duration:K.current,resolution:ae.current||"1080p",timelineMarkers:E.current||[],bgMusic:{storagePath:at,name:lt.name,volume:lt.volume??.3},...Q.current?{thumbnailDataUrl:Q.current}:{}})}catch(at){console.warn("Background music upload failed:",at)}}}else{const F=Zt(null,M).id;W.current||(W.current=F),w&&(w.current=!0);for(const be of V.current)be.file&&Ot(F,be.id,be.file,{name:be.name,type:be.file.type}).catch(We=>{console.warn("Failed to persist media to IndexedDB",{mediaId:be.id,error:We?.message})});const ue=ye.current;ue?.file&&ue?.mediaId&&Ot(F,ue.mediaId,ue.file,{name:ue.name,type:ue.file.type}).catch(be=>{console.warn("Failed to persist background music to IndexedDB",{mediaId:ue.mediaId,error:be?.message})})}return k(new Date),S.current=0,te.current=0,{saved:!0}}catch(he){S.current++,S.current<=1?console.warn("Auto-save failed:",he?.message||he):S.current===3&&console.warn(`[autosave] ${S.current} consecutive failures — backing off. Will retry less frequently.`);try{const ve=ke.current,Le=W.current,C={id:Le,projectName:ve,clips:L.current.map(je),mediaItems:V.current.map(Ie),savedAt:new Date().toISOString()};if(localStorage.setItem(`clipcut_autosave_${ve}`,JSON.stringify(C)),Le)for(const M of V.current)M.file&&Ot(Le,M.id,M.file,{name:M.name,type:M.file.type}).catch(H=>{console.warn("Fallback media persist failed",{mediaId:M.id,error:H?.message})})}catch{}return{saved:!1,skipReason:"error",error:he}}finally{Y.current=!1}};se.current=pe;const ze=setInterval(pe,G);return()=>clearInterval(ze)},[s,G,p,b,v]);const q=a.useCallback(()=>se.current?se.current():Promise.resolve({saved:!1,skipReason:"not-ready"}),[]);return{lastSaved:P,projectId:W.current,triggerSave:q}},qr=60,Jr=(t,n)=>{const[i,r]=a.useState(0),[s,l]=a.useState(!1),d=a.useRef(null),p=a.useRef(1),b=a.useRef(0),h=a.useRef(0),v=a.useRef(t);v.current=t;const g=a.useCallback(S=>{const te=v.current.filter(L=>L.type!=="audio"&&L.type!=="text").sort((L,V)=>L.startTime-V.startTime);for(const L of te)if(S>=L.startTime&&S<L.startTime+L.duration)return L;const le=te[te.length-1];return le&&Math.abs(S-(le.startTime+le.duration))<.05?le:null},[]),w=a.useMemo(()=>g(i),[g,i]),G=a.useMemo(()=>w?Math.max(0,i-w.startTime)+(w.trimStart||0):0,[w,i]),P=a.useMemo(()=>{if(!w)return null;const S=t.filter(le=>le.type!=="audio").sort((le,L)=>le.startTime-L.startTime),te=S.findIndex(le=>le.id===w.id);return te>=0&&te<S.length-1?S[te+1]:null},[w,t]),k=a.useCallback(()=>{const S=performance.now();S-h.current>=qr&&(h.current=S,r(b.current))},[]),Y=a.useCallback(S=>{if(S>=n){b.current=n,r(n),l(!1);return}b.current=S,k()},[n,k]);a.useEffect(()=>{if(!s){d.current&&cancelAnimationFrame(d.current),r(b.current);return}const S=()=>{if(b.current>=n){l(!1),r(n);return}d.current=requestAnimationFrame(S)};return d.current=requestAnimationFrame(S),()=>{d.current&&cancelAnimationFrame(d.current)}},[s,n]);const W=a.useCallback(S=>{const te=Math.max(0,Math.min(n,S));b.current=te,r(te)},[n]),fe=a.useCallback(()=>l(S=>!S),[]),Q=a.useCallback(()=>{l(!1),b.current=0,r(0)},[]),se=a.useCallback(S=>{p.current=S},[]);return{currentTime:i,currentClip:w,clipOffset:G,nextClip:P,isPlaying:s,seek:W,togglePlay:fe,stop:Q,setIsPlaying:l,setSpeed:se,setCurrentTime:r,currentTimeRef:b,speedRef:p,onVideoTime:Y}},Qr=()=>{const t=pn(),n=mn(),{user:i}=ln(),[r,s]=a.useState(()=>new URLSearchParams(window.location.search).get("project")||null),[l,d]=a.useState("Untitled Project"),[p,b]=a.useState("1080p"),h=a.useRef(!1),v=a.useRef(!1);a.useEffect(()=>{const o=new URL(window.location);r?o.searchParams.set("project",r):o.searchParams.delete("project"),o.toString()!==window.location.href&&window.history.replaceState(window.history.state,"",o)},[r]);const[g,w]=a.useState("media"),[G,P]=a.useState("video"),[k,Y]=a.useState("basic"),[W,fe]=a.useState("local"),[Q,se]=a.useState("default"),S=Ia(),te=fn(),[le,L]=a.useState(!1),[V,ke]=a.useState(!1),[K,ae]=a.useState([]),[ye,E]=a.useState(!1),[q,Se]=a.useState("parse"),[je,Ie]=a.useState(!1),[pe,ze]=a.useState([]),we=a.useRef([]),me=a.useRef([]),[ce,he]=a.useState(null),[ve,Le]=a.useState(null),[C,M]=a.useState(null),[H,j]=a.useState(()=>typeof window<"u"?window.innerWidth:1200);a.useEffect(()=>{if(Q==="wide-timeline"){const o=window.innerHeight-296,c=Math.max(320,Math.floor(window.innerHeight*.46));he(Math.max(120,Math.min(c,o)))}else(Q==="default"||Q==="compact")&&he(null)},[Q]);const T=a.useMemo(()=>ka(H),[H]),R=a.useMemo(()=>Sa(H),[H]),F=a.useMemo(()=>Math.min(ve??yo,T),[ve,T]),ue=a.useMemo(()=>Math.min(C??wo,R),[C,R]),be=a.useCallback(o=>{const c=window.innerHeight-296,m=Math.max(120,Math.min(o,c));he(m)},[]),We=a.useCallback(o=>{const c=window.innerWidth,m=ka(c),u=C??wo,x=c-vo-u-24;Le(Math.max(200,Math.min(o,m,x)))},[C]),lt=a.useCallback(o=>{const c=window.innerWidth,m=Sa(c),u=ve??yo,x=c-vo-u-24;M(Math.max(220,Math.min(o,m,x)))},[ve]);a.useEffect(()=>{let o;const c=()=>{clearTimeout(o),o=setTimeout(()=>{const m=window.innerWidth;j(m);const u=ka(m),x=Sa(m);Le(y=>y!=null?Math.min(y,u):null),M(y=>y!=null?Math.min(y,x):null)},150)};return window.addEventListener("resize",c),c(),()=>{clearTimeout(o),window.removeEventListener("resize",c)}},[]);const at=va("y",be),Ft=va("x",We),Vo=va("x",lt,void 0,!0),[Qe,bt]=a.useState(null),[Ko,Ho]=a.useState(0),[Yo,Xo]=a.useState(()=>!localStorage.getItem("clipcut_onboarded")),[Ae,Ne]=a.useState([]),[ct,Bt]=a.useState(null),[Rt,sa]=a.useReducer(Vr,{clips:[],past:[],future:[]}),_=Rt.clips,gt=Rt.past.length>0,xt=Rt.future.length>0,[Pe,Ze]=a.useState(null),[la,Dt]=a.useState([]);a.useEffect(()=>{S&&Pe&&(bt("inspector"),L(!0))},[S,Pe]);const ot=a.useMemo(()=>{if(_.length===0)return 30;const o=_.filter(m=>m.type!=="text"&&m.type!=="sticker"&&!m.isCaption),c=o.length>0?o:_;return Math.max(...c.map(m=>m.startTime+m.duration))},[_]),U=Jr(_,ot),[Ve,yt]=a.useState(null),[Ra,Ea]=a.useState(!1),[wt,_a]=a.useState(!1),[Aa,zt]=a.useState(0),[Et,Pa]=a.useState([]),_t=a.useRef(null),[ca,vt]=a.useState(!1),[kt,ge]=a.useState(""),[Ua,tt]=a.useState(""),da=a.useRef(new Set),[Wt,La]=a.useState(null),N=a.useCallback((o,c)=>La({type:o,message:c}),[]),oe=gr(),Oe=a.useMemo(()=>_.find(o=>o.id===Pe),[_,Pe]),Go=a.useMemo(()=>{if(U.currentClip?.blobUrl)return U.currentClip.blobUrl;if(ct){const c=Ae.find(m=>m.id===ct)?.blobUrl;if(c)return c}return _.find(c=>c.type!=="audio"&&c.type!=="text"&&c.blobUrl)?.blobUrl||null},[U.currentClip,ct,Ae,_]),qo=a.useMemo(()=>$r(_),[_]),Jo=a.useMemo(()=>{const o=_.filter(u=>u.isCaption),c=_.filter(u=>u.type==="text"&&!u.isCaption),m=_.filter(u=>(u.type==="text"||u.type==="sticker"||u.isCaption)&&u.type!=="audio"&&U.currentTime>=u.startTime&&U.currentTime<u.startTime+u.duration);if(o.length>0&&m.filter(u=>u.isCaption).length===0){const u=o.slice(0,3);U.currentTime.toFixed(3),_.length,o.length,c.length,m.length,u.map(x=>({id:x.id,type:x.type,isCaption:x.isCaption,text:(x.text||"").slice(0,30),startTime:x.startTime,duration:x.duration,track:x.track,range:`${x.startTime?.toFixed(2)}-${(x.startTime+x.duration).toFixed(2)}`}))}return m},[_,U.currentTime]),Qo=a.useMemo(()=>{const o=U.currentClip;if(!o||!o.transition||o.type==="audio"||o.type==="text"||o.type==="sticker"||o.isCaption||!o.blobUrl)return null;const c=Math.max(.2,Math.min(3,o.transitionDuration??1)),m=o.trimStart||0,u=Math.max(0,U.clipOffset-m),x=Math.max(0,o.duration-c);if(u<x)return null;const y=o.startTime+o.duration,J=_.filter(X=>X.id!==o.id&&!X.isCaption&&X.type!=="audio"&&X.type!=="text"&&X.type!=="sticker"&&(X.track||0)===(o.track||0)&&X.startTime>=y-.08&&X.startTime<=y+.08).sort((X,Ce)=>X.startTime-Ce.startTime)[0];if(!J?.blobUrl)return null;const O=Math.max(0,Math.min(1,(u-x)/c)),$=(J.trimStart||0)+Math.max(0,u-x);return{type:o.transition,duration:c,progress:O,nextVideoSrc:J.blobUrl,nextTime:$,leftClipId:o.id,rightClipId:J.id}},[U.currentClip,U.clipOffset,_]),dt=a.useRef(Rt.clips);dt.current=Rt.clips;const de=a.useCallback(o=>{const c=dt.current,m=typeof o=="function"?o(c):o;sa({type:"SET_CLIPS",clips:m})},[]),{lastSaved:Zo,projectId:Vt,triggerSave:Kt}=Gr(r,l,_,Ae,i?.id,ot,p,Ne,de,Ve,yt,la,v);a.useEffect(()=>{Vt&&Vt!==r&&s(Vt)},[Vt,r]);const St=a.useCallback(()=>sa({type:"UNDO"}),[]),ut=a.useCallback(()=>sa({type:"REDO"}),[]),Ue=a.useCallback((o,c)=>de(m=>m.map(u=>u.id===o?{...u,...c}:u)),[de]),Na=a.useCallback(o=>de(c=>c.map(m=>m.isCaption?{...m,...o}:m)),[de]),Ht=a.useCallback(o=>{de(c=>c.filter(m=>m.id!==o)),Pe===o&&Ze(null)},[de,Pe]),$a=a.useCallback(o=>o?.type==="audio"||o?.type==="video"||o?.type==="image"?o.type:Ja(o?.file||o)||"video",[]),Yt=a.useCallback((o,c=null)=>{const m=$a(o);let u=c;if(u===null){const y=dt.current.filter(O=>O.type===m),J=y.length>0?y.reduce((O,$)=>O.startTime+O.duration>$.startTime+$.duration?O:$):null;u=J?J.startTime+J.duration:0}const x={...xa,id:oa(),mediaId:o.id,name:o.name,type:m,startTime:u,duration:o.duration||cn,file:o.file,blobUrl:o.blobUrl,thumbnail:o.thumbnail};de(y=>[...y,x]),Ze(x.id),setTimeout(()=>Kt(),100)},[$a,de,Kt]),Xt=a.useCallback(async o=>{Ea(!0);try{let c=r;if(c||(c=`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s(c)),o.length>0&&l==="Untitled Project"){const x=(o.find(y=>y.type.startsWith("video/"))||o[0]).name.replace(/\.[^.]+$/,"").trim();x&&d(x)}let m=0;for(const u of o){ge(`Importing ${u.name}...`),tt(`${++m} of ${o.length}`);const x=oa(),y=URL.createObjectURL(u);Ot(c,x,u,{name:u.name,type:u.type}).catch(X=>console.warn("[import] IndexedDB store failed:",u.name,X));const J=Un(u,["video","audio"]).category,O=Ja(u),$=J==="audio"||O==="audio"||u.type.startsWith("audio/");Ne(X=>[...X,{id:x,name:u.name,file:u,blobUrl:y,thumbnail:null,duration:0,width:0,height:0,type:$?"audio":"video",isProcessing:!0}]);try{const X=await ta(u);if(Ne(Ce=>Ce.map(B=>B.id===x?{...B,duration:X.duration,width:X.width,height:X.height,isProcessing:!1}:B)),!$)try{const Ce=`${u.name}_${u.size}_${u.lastModified}`,B=await wr(Ce,0),ne=B||await $t(u,0);B||vr(Ce,0,ne).catch(()=>{});const xe=URL.createObjectURL(ne);Ne(f=>f.map(A=>A.id===x?{...A,thumbnail:xe}:A))}catch(Ce){console.warn("Thumbnail generation failed:",Ce)}}catch(X){if(!$&&/\.(mov|avi|mkv|flv|wmv)$/i.test(u.name))try{ge(`Converting ${u.name} to MP4...`),oe.isReady||await oe.initialize();const B=await oe.convertFormat(u,"mp4"),ne=new File([B],u.name.replace(/\.\w+$/,".mp4"),{type:"video/mp4"}),xe=URL.createObjectURL(ne);URL.revokeObjectURL(y);const f=await ta(ne);Ne(D=>D.map(ee=>ee.id===x?{...ee,file:ne,blobUrl:xe,duration:f.duration,width:f.width,height:f.height,isProcessing:!1}:ee));const A=await $t(ne,0).catch(()=>null);if(A){const D=URL.createObjectURL(A);Ne(ee=>ee.map(Z=>Z.id===x?{...Z,thumbnail:D}:Z))}N("info",`Converted ${u.name} to MP4`)}catch(B){console.error("Auto-convert failed:",B),Ne(ne=>ne.map(xe=>xe.id===x?{...xe,isProcessing:!1}:xe))}else console.error("Error processing:",X),Ne(B=>B.map(ne=>ne.id===x?{...ne,isProcessing:!1}:ne))}}N("success",`Imported ${o.length} file${o.length>1?"s":""}`)}catch(c){N("error",`Import failed: ${c.message}`)}finally{Ea(!1),ge(""),tt("")}},[N,r,l]),ua=a.useRef(null);a.useEffect(()=>{const o=_.find(B=>B.type!=="audio"&&B.type!=="text"&&B.type!=="sticker"&&!B.isCaption&&(B.file||B.blobUrl||B.mediaId));if(!o){ze([]),ua.current=null;return}const c=o.mediaId?Ae.find(B=>B.id===o.mediaId):null,m=o.file||c?.file||null,u=o.blobUrl||c?.blobUrl||null;if(!m&&!u){ze([]);return}const x=o.trimStart||0,y=o.trimEnd||0,J=o.duration||0,O=_.some(B=>B.isCaption),$=m?`${m.size}:${m.lastModified}`:String(u||""),X=`${o.id}|${o.mediaId||""}|${x}|${y}|${J}|${O}|${$}`;if(X===ua.current)return;ua.current=X;const Ce={...o,file:m||void 0,blobUrl:u||void 0};Be(async()=>{const{analyzeVideo:B}=await import("./D8eACPMb.js");return{analyzeVideo:B}},__vite__mapDeps([25,26,3,1,4])).then(({analyzeVideo:B})=>{B(Ce,{hasCaptions:O}).then(ne=>{ze(ne.length>0?ne:[])}).catch(()=>{ze([])})})},[_,Ae]);const Gt=a.useCallback(o=>{const c=Ln(o,{allowedCategories:["audio"],category:"audio"});if(!c.valid){N("warning",c.error||"Please select an audio file");return}Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl);const m=URL.createObjectURL(o),u=`bgm-${Date.now()}`;yt({file:o,name:o.name,blobUrl:m,volume:.3,mediaId:u});const x=r||`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Ot(x,u,o,{name:o.name,type:o.type}).catch(y=>console.warn("[bgMusic] IndexedDB store failed:",y)),N("success",`Background music: ${o.name}`)},[Ve,N,r]),qt=a.useCallback(o=>{yt(c=>c?{...c,volume:o}:null)},[]),Jt=a.useCallback(()=>{Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl),yt(null),N("info","Background music removed")},[Ve,N]),Oa=a.useCallback(o=>{Ne(c=>{const m=c.find(u=>u.id===o);return m&&requestAnimationFrame(()=>{m.blobUrl&&URL.revokeObjectURL(m.blobUrl),m.thumbnail&&URL.revokeObjectURL(m.thumbnail)}),c.filter(u=>u.id!==o)}),de(c=>(c.filter(m=>m.mediaId===o).forEach(m=>{m.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(m.blobUrl))}),c.filter(m=>m.mediaId!==o))),ct===o&&Bt(null)},[ct,de]),Qt=a.useCallback((o,c)=>{const m=dt.current.find(y=>y.id===o);if(!m||!Number.isFinite(c)||c<=.1||c>=m.duration-.1)return!1;const u={...m,id:oa(),name:`${m.name} (1)`,duration:c},x={...m,id:oa(),name:`${m.name} (2)`,startTime:m.startTime+c,duration:m.duration-c,trimStart:(m.trimStart||0)+c};return de(y=>{const J=y.findIndex($=>$.id===o),O=[...y];return O.splice(J,1,u,x),O}),Ze(u.id),N("success","Clip split"),!0},[de,N]),nt=a.useCallback(o=>{de(c=>[...c,o]),Ze(o.id)},[de]),Fa=a.useCallback(o=>{de(()=>o),Ze(null),N("success","Clip deleted (ripple)")},[de,N]);a.useCallback(async(o,c,m)=>{const u=dt.current.find(x=>x.id===o);if(u?.file){vt(!0),ge("Trimming...");try{const x=await oe.trimVideo(u.file,c,m),y=URL.createObjectURL(x);de(J=>J.map(O=>O.id===o?{...O,file:x,blobUrl:y,duration:m}:O)),u.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(u.blobUrl)),N("success","Clip trimmed")}catch(x){N("error",ra(x,"ffmpeg"))}finally{vt(!1),ge(""),oe.resetProgress()}}},[oe,de,N]),a.useCallback(async(o,c,m)=>{let u=o.file;const x=o.speed&&o.speed!==1,y=o.brightness||o.contrast,J=o.saturation!==void 0&&o.saturation!==1,O=o.rotation&&[90,180,270,-90].includes(o.rotation),$=o.volume!==void 0&&o.volume!==1||o.isMuted,X=o.fadeIn&&o.fadeIn>0||o.fadeOut&&o.fadeOut>0,Ce=o.filterName,B=o.trimStart>0||o.trimEnd>0,ne=o.effects?.some(D=>D.enabled),xe=o.text&&o.text.trim().length>0;if(!x&&!y&&!J&&!O&&!$&&!X&&!Ce&&!B&&!ne&&!xe)return u;const A=`clip ${c+1}/${m}`;if(B&&(ge(`Trimming ${A}...`),u=await oe.trimVideo(u,o.trimStart,o.duration)),x&&(ge(`Adjusting speed for ${A}...`),u=await oe.changeSpeed(u,o.speed)),y&&(ge(`Adjusting colors for ${A}...`),u=await oe.adjustBrightnessContrast(u,o.brightness||0,o.contrast||0)),J&&(ge(`Adjusting saturation for ${A}...`),u=await oe.adjustSaturation(u,o.saturation)),O&&(ge(`Rotating ${A}...`),u=await oe.rotateVideo(u,o.rotation)),$&&(ge(`Adjusting audio for ${A}...`),u=await oe.adjustVolume(u,o.isMuted?0:o.volume)),X&&(ge(`Adding fade to ${A}...`),u=await oe.addFade(u,o.fadeIn||0,o.fadeOut||0,o.duration)),Ce){const D=Dn.find(ee=>ee.name===o.filterName);D?.filter&&(ge(`Applying ${o.filterName} filter to ${A}...`),u=await oe.applyFilter(u,D.filter))}if(ne)for(const D of o.effects.filter(ee=>ee.enabled))D.type==="blur"&&D.params?.radius?(ge(`Applying ${D.name} to ${A}...`),u=await oe.applyBlur(u,D.params.radius)):D.type==="sharpen"&&D.params?.strength&&(ge(`Applying ${D.name} to ${A}...`),u=await oe.applySharpen(u,D.params.strength));return xe&&(ge(`Adding text overlay to ${A}...`),u=await oe.addTextOverlay(u,o.text,{position:o.textPosition||"bottom-center",fontSize:o.textSize||48,fontColor:o.textColor||"white",backgroundColor:o.textBgColor||null,startTime:o.textStartTime||0,duration:o.textDuration||0})),u},[oe]);const en=a.useCallback(()=>{_.length>0&&!window.confirm("Start a new project? Unsaved changes will be lost.")||(de([]),d("Untitled Project"),s(null),h.current=!1,v.current=!1,Ne([]),Ze(null),Bt(null),Dt([]),N("info","New project created"))},[_.length,N,de]),tn=a.useCallback(async()=>{const o=await Kt();if(o?.saved){N("success","Project saved");return}switch(o?.skipReason){case"restore-in-progress":N("info","Project still loading — try again in a moment");break;case"empty-without-session-edit":N("info","Nothing to save yet — add media or clips first");break;case"in-progress":N("info","Save already in progress");break;case"backoff":N("warning","Previous saves failed — retrying shortly");break;case"error":N("error",`Save failed${o?.error?.message?": "+o.error.message:""}`);break;default:N("info","Save skipped")}},[Kt,N]),an=a.useCallback(()=>{n("/settings")},[n]),Ba=a.useCallback(o=>{const c=String(o?.message||o||"").toLowerCase();return c.includes("too long to respond")||c.includes("timeout")?'AI is taking too long right now. Try again or use a shorter command like "add captions".':c.includes("worker")||c.includes("network")||c.includes("fetch")?"I could not reach the AI service. Check your internet and retry.":c.includes("import a video first")||c.includes("no video clip found")?"Please import a video first, then try the AI edit again.":c.includes("didn't understand")||c.includes("rephrasing")?'I did not understand that request. Try a clearer command like "split at 00:26".':"I could not complete that AI edit. Please try again."},[]),At=a.useCallback(async(o,c={})=>{const m=Date.now();if(me.current=me.current.filter(y=>m-y<6e4),me.current.length>=10){ae(y=>[...y,{id:`e-${m}`,role:"assistant",text:"Rate limit reached. Please wait a moment before sending more prompts."}]);return}me.current.push(m);const u={id:`u-${m}`,role:"user",text:o};if(ae(y=>[...y,u]),!_.some(y=>y.type==="video"||y.type==="audio"||y.type==="image")){const{parseIntentLocally:y}=await Be(async()=>{const{parseIntentLocally:O}=await import("./C8ktvZ5m.js");return{parseIntentLocally:O}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2]));if(y(o)){const O=()=>{S?(bt("media"),L(!0)):(w("media"),fe("local"))};ae($=>[...$,{id:`g-${m}`,role:"assistant",text:"Please import a video first to use AI editing.",openMedia:O}]);return}}E(!0),Se("parse"),Ie(!1);try{const{executeAiEdit:y,executeStructuredAiActions:J}=await Be(async()=>{const{executeAiEdit:f,executeStructuredAiActions:A}=await import("./C8ktvZ5m.js");return{executeAiEdit:f,executeStructuredAiActions:A}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2])),O={duration:ot,hasAudio:_.some(f=>f.type==="audio"||f.type==="video"&&f.file),clipCount:_.length,currentTime:U.currentTime,hasCaptions:_.some(f=>f.isCaption),filters:[...new Set(_.filter(f=>f.filterName).map(f=>f.filterName))].join(",")||void 0,tracks:_.reduce((f,A)=>Math.max(f,(A.track||0)+1),0)},$=K.slice(-10).map(f=>({role:f.role,content:f.role==="assistant"&&f.actions?.length?`[Actions: ${f.actions.join(", ")}] ${f.text}`:f.text})),X=JSON.parse(JSON.stringify(_.map(f=>{const{file:A,...D}=f;return D}))),Ce=new Map(_.filter(f=>f.file).map(f=>[f.id,f.file])),B={history:$,onSlowResponse:()=>Ie(!0),onProgress:Se},ne={clips:_,setClips:de,updateClip:Ue,addClip:f=>{de(A=>[...A,{...xa,id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...f}])},getClips:()=>dt.current,splitClip:Qt,selectedClipId:Pe,mediaItems:Ae},xe=c.structuredActions?await J(c.structuredActions,ne,{onProgress:Se}):await y(o,O,ne,B);if(xe.isChat)ae(f=>[...f,{id:`a-${Date.now()}`,role:"assistant",text:xe.summary}]);else{It({hypothesisId:"H2",location:"VideoEditor.jsx:handleAiSendMessage",message:"ai edit applied to timeline",data:{projectId:r,actionLabels:xe.actionLabels||[],appliedCount:(xe.applied||[]).length,clipsAfterAi:Tt(dt.current)}});const f=`ai-${Date.now()}`;we.current.push({id:f,snapshot:X,filesMap:Ce});const A={id:`a-${Date.now()}`,role:"assistant",text:xe.summary||"Done!",actions:xe.actionLabels||[],applied:xe.applied||[],failed:xe.failed||[],skipped:xe.skipped||[],undoScope:`Undoes all changes from this AI command (${(xe.applied||[]).length} action${(xe.applied||[]).length===1?"":"s"}).`,canUndo:!0,onUndo:()=>{const D=we.current.find(ee=>ee.id===f);if(D){const ee=D.snapshot.map(Z=>{const Me=D.filesMap.get(Z.id);return Me?{...Z,file:Me}:Z});de(ee),we.current=we.current.filter(Z=>Z.id!==f),ae(Z=>Z.map(Me=>Me.id===A.id?{...Me,canUndo:!1}:Me)),ae(Z=>[...Z,{id:`a-${Date.now()}`,role:"assistant",text:"Restored timeline to pre-AI state for that command."}]),N("info","AI edit undone")}}};ae(D=>[...D,A])}}catch(y){const J={id:`e-${Date.now()}`,role:"assistant",text:Ba(y)};ae(O=>[...O,J])}finally{E(!1),Se("parse"),Ie(!1)}},[_,de,Ue,Qt,Pe,Ae,ot,U.currentTime,K,Ba]),Da=a.useCallback(o=>{if(o?.action){const c=`Apply suggestion: ${o.title}`,m=[{type:o.action,params:o.params||{}}];At(c,{structuredActions:m});return}At(o.title)},[At]),pa=a.useCallback(()=>{ke(o=>!o),S&&(bt("ai"),L(o=>!o))},[S]),za=a.useCallback((o,c,m)=>{const u=m==="mp4"?"mp4":"webm",x=URL.createObjectURL(o),y=document.createElement("a");y.href=x,y.download=`${Yr(c||l)}.${u}`,document.body.appendChild(y),y.click(),document.body.removeChild(y),setTimeout(()=>URL.revokeObjectURL(x),2e3)},[l]),on=a.useCallback(()=>{_t.current&&(_t.current.abort(),_t.current=null)},[]),Pt=a.useCallback(async(o,c={})=>{if(_.length===0){N("warning","No clips to export. Add media to the timeline first.");return}const m=_.filter(y=>y.type!=="audio"&&y.file).sort((y,J)=>y.startTime-J.startTime);if(m.length===0){N("warning","No video clips with valid files. Make sure your clips are properly loaded.");return}if(wt){Pa(y=>[...y,o]),N("info",`Queued export at ${o} (${Et.length+1} in queue)`);return}U.isPlaying&&U.setIsPlaying(!1),_a(!0),zt(0),ge("Preparing export..."),tt("");let u=o;if(o.startsWith("preset:")){const y=o.slice(7),J=ia[y];J&&(J.width<=854?u="480p":J.width<=1280?u="720p":u="1080p")}const x=new AbortController;_t.current=x;try{const y=String(c.format||"webm").toLowerCase()==="mp4"?"mp4":"webm",J=[...m,..._.filter(B=>B.type==="text"||B.type==="sticker")],O=Math.max(...m.map(B=>B.startTime+B.duration)),$=await Ir({clips:J,bgMusic:Ve,totalDuration:O,resolution:u,settings:{...c,format:"webm"},onProgress:({percent:B,elapsed:ne,eta:xe,label:f})=>{const A=y==="mp4"?Math.min(70,Math.round(B*.7)):B;zt(A),ge(y==="mp4"?"Rendering local preview stream...":f||"Exporting..."),tt(`${A}%  ·  Elapsed ${ne}  ·  ETA ${xe}`)},abortSignal:x.signal});if(!$.blob||$.blob.size===0)throw new Error("Export produced an empty file.");let X=$.blob,Ce="webm";if(y==="mp4")if(ge("Checking server encoder..."),tt("Validating MP4 export service availability..."),!await jo())N("warning","MP4 server is unavailable right now. Exported WebM locally instead.");else try{ge("Uploading to MP4 encoder..."),tt("Uploading render to server for fast MP4 transcode...");const ne=await _n($.blob,u,{},xe=>{const f=Math.min(98,70+Math.round(xe/100*28));zt(f),ge("Server encoding MP4..."),tt(`${f}%  ·  Upload + transcode in progress`)},x.signal);ne&&ne.size>0?(X=ne,Ce="mp4"):N("warning","MP4 conversion returned empty output. Downloaded WebM fallback.")}catch(ne){console.warn("Server MP4 export failed, using local WebM fallback:",ne),N("warning","MP4 export failed on server. Downloaded WebM fallback instead.")}za(X,c.filename||l,Ce),N("success",`Exported ${Ce.toUpperCase()} at ${u} (${(X.size/(1024*1024)).toFixed(1)} MB)`)}catch(y){y.message==="Export cancelled."?N("info","Export cancelled."):(console.error("Export error:",y),N("error",y.message||"Export failed. Please try again."))}finally{_a(!1),zt(0),ge(""),tt(""),_t.current=null}},[_,l,U,N,Ve,za,wt,Et,ot]);a.useEffect(()=>{if(!wt&&Et.length>0){const[o,...c]=Et;Pa(c),Pt(o)}},[wt,Et,Pt]);const nn=a.useCallback(o=>{U.seek(o)},[U]),ma=a.useCallback(()=>{if(!U.currentClip){U.setIsPlaying(!1);return}const c=_.filter(m=>m.type!=="audio").sort((m,u)=>m.startTime-u.startTime).find(m=>m.startTime>U.currentClip.startTime);c&&U.isPlaying?U.seek(c.startTime):U.setIsPlaying(!1)},[U,_]),rn=a.useCallback(o=>{if(U.currentClip){const c=U.currentClip.trimStart||0,m=c+U.currentClip.duration;if(U.isPlaying&&o>=m-.01){ma();return}const u=U.currentClip.startTime+(o-c);U.isPlaying?U.onVideoTime(u):U.setCurrentTime(u)}else U.isPlaying||U.setCurrentTime(o)},[U,ma]),sn=a.useCallback(async o=>{if(!(!o||!oe.isReady)&&!da.current.has(o)){da.current.add(o),vt(!0),ge("Converting video to web-compatible format...");try{let c=null,m=null,u=!1;const x=Ae.find(O=>O.blobUrl===o);if(x&&x.file)c=x.file,m=x.id,u=!1;else{const O=_.find($=>$.blobUrl===o);O&&O.file&&(c=O.file,m=O.id,u=!0)}if(!c){N("error","Could not find source file for conversion");return}const y=await oe.convertToWebFormat(c),J=URL.createObjectURL(y);u?de(O=>O.map($=>$.id===m?($.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL($.blobUrl)),{...$,file:y,blobUrl:J}):$)):(Ne(O=>O.map($=>$.id===m?($.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL($.blobUrl)),{...$,file:y,blobUrl:J}):$)),de(O=>O.map($=>$.mediaId===m?($.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL($.blobUrl)),{...$,file:y,blobUrl:J}):$))),N("success","Video converted successfully")}catch(c){N("error",ra(c,"ffmpeg"))}finally{da.current.delete(o),vt(!1),ge(""),oe.resetProgress()}}},[oe,Ae,_,de,N]),Wa=a.useRef(null);a.useEffect(()=>{const o=t.state?.filesToImport;o?.length&&Wa.current!==o&&(Wa.current=o,window.history.replaceState({...t.state,filesToImport:null},""),Xt(o))},[t.state?.filesToImport,Xt]),a.useEffect(()=>{const o=t.state?.projectId,c=t.state?.projectData,m=t.state?.projectName,u=new URLSearchParams(window.location.search).get("project"),x=o||u||null;if(!x||h.current===x||(h.current=x,Nt()&&!i?.id))return;let y=!1;const J=async f=>{const A=f.project_data?.bgMusic;if(!A)return;let D=null,ee=null;if(A.mediaId)try{const Z=await jt(x,A.mediaId);Z&&(D=Z.file,ee=Z.blobUrl)}catch(Z){console.warn("[restoreBgMusic] IndexedDB load failed:",Z)}if(!ee&&A.storagePath&&Nt())try{const Z=await qa(A.storagePath),Me=await fetch(Z);if(Me.ok){const re=await Me.blob();D=new File([re],A.name||"bgm",{type:re.type}),ee=URL.createObjectURL(re)}}catch(Z){console.warn("[restoreBgMusic] Supabase download failed:",Z)}ee&&yt({file:D,name:A.name||"Background",blobUrl:ee,volume:A.volume??.3,storagePath:A.storagePath,mediaId:A.mediaId})},O=f=>{if(!f||!f.startsWith("idb://"))return null;const A=f.slice(6),D=A.lastIndexOf(":");return D<0?null:{idbProjectId:A.slice(0,D),idbMediaId:A.slice(D+1)}},$=f=>f?.startsWith("audio/")?"audio":f?.startsWith("image/")?"image":"video",X=(f,A,D=null)=>Promise.race([f,new Promise(ee=>setTimeout(()=>ee(D),A))]),Ce=async(f,A=[])=>{let D=null,ee=null;const Z=f.mediaId||f.id||null;f.name,f.type,f.idbKey,f.storagePath;const Me=O(f.idbKey);if(Me)try{Me.idbProjectId,Me.idbMediaId;const re=await X(jt(Me.idbProjectId,Me.idbMediaId),2e3);re?(D=re.file,ee=re.blobUrl,f.name,re.file?.size):console.warn("[restore] IndexedDB MISS (null):",f.idbKey)}catch(re){console.warn("[restore] IndexedDB load failed:",f.idbKey,re)}else f.name,f.type;if(!ee&&Z)try{const re=await X(jt(x,Z),2e3);re?(D=re.file,ee=re.blobUrl,f.name):console.warn("[restore] Fallback IndexedDB MISS:",x,Z)}catch(re){console.warn("[restore] IndexedDB fallback load failed:",Z,re)}if(!ee&&Z)try{const re=A.find(Fe=>Fe.mediaId===Z);if(re){re.key;const Fe=await X(jt(re.projectId,re.mediaId),2e3);Fe&&(D=Fe.file,ee=Fe.blobUrl)}}catch(re){console.warn("[restore] IndexedDB scan failed:",re)}if(!ee&&f.storagePath&&Nt()&&!f.storagePath.startsWith("blob:"))try{f.storagePath;const re=await X(qa(f.storagePath),5e3);if(!re)throw new Error("Supabase URL timed out");const Fe=new AbortController,fa=setTimeout(()=>Fe.abort(),8e3),Ut=await fetch(re,{signal:Fe.signal});if(clearTimeout(fa),Ut.ok){const pt=await Ut.blob();D=new File([pt],f.name||"media",{type:pt.type}),ee=URL.createObjectURL(pt),f.name}}catch(re){console.warn("[restore] Supabase download failed:",f.storagePath,re)}return!ee&&f.type!=="text"&&console.error("[restore] FAILED to resolve media for:",f.name,f.type,"— all sources exhausted"),{file:D,blobUrl:ee}},B=/^(draft-|local_)/.test(x),ne=()=>({name:m||"Untitled Project",project_data:{clips:[],mediaItems:[]}});return(async()=>{vt(!0),ge("Restoring media..."),It({hypothesisId:"H3",location:"VideoEditor.jsx:restoreProject.start",message:"restore project effect started",data:{projectId:x,stateProjectId:o,urlProjectId:u,hasRestoredFor:h.current}});try{let f=c;if(!f){if(B)f=ne();else if(!Nt())f=await Ga(x,null);else if(i?.id)try{f=await Ga(x,i.id)}catch(I){if(I?.code==="PGRST116")console.warn("[restore] Supabase has no row for",x,"— attempting IndexedDB-only recovery"),f=ne();else throw I}}if(f||(console.warn("[restore] No project data found for",x,"— attempting IndexedDB-only recovery"),f=ne()),y)return;window.history.replaceState({...t.state,projectId:null,projectData:null,projectName:null},"");const A=m||f.name||"Untitled Project";d(So(A,{maxLength:100})||"Untitled Project"),s(x),f.resolution&&b(f.resolution);const D=f.project_data?.timelineMarkers??f.timelineMarkers;Dt(Array.isArray(D)?D.filter(I=>I&&typeof I.time=="number"&&Number.isFinite(I.time)&&I.time>=0).map((I,z)=>({id:typeof I.id=="string"&&I.id?I.id:`mk-${z}-${Math.round(I.time*1e3)}`,time:I.time})):[]);const ee=f.project_data?.clips||f.clips||[],Z=f.project_data?.mediaItems||[],Me=await X(An(),3e3,[]);if(ee.length,Z.length,ee.map(I=>({name:I.name,type:I.type,mediaId:I.mediaId,idbKey:I.idbKey,storagePath:I.storagePath})),Z.map(I=>({id:I.id,name:I.name,idbKey:I.idbKey})),ee.length===0&&Z.length===0){const I=Me.filter(Re=>Re.projectId===x),z=[];for(const Re of I)try{const Ee=await X(jt(x,Re.mediaId),3e3);if(!Ee)continue;z.push({id:Re.mediaId,name:Re.name||"media",file:Ee.file,blobUrl:Ee.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:$(Re.mime),isProcessing:!1,idbKey:`idb://${x}:${Re.mediaId}`,_mediaError:null})}catch(Ee){console.warn("[recover] load failed for",Re.mediaId,Ee)}if(y)return;await J(f);let ie=0;if(z.length===0){const Re=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,Ee=Me.filter($e=>$e.projectId&&$e.projectId!==x&&!Re.test($e.projectId)),_e=new Set;for(const $e of Ee)if(!_e.has($e.mediaId)){_e.add($e.mediaId);try{const ft=await X(jt($e.projectId,$e.mediaId),3e3);if(!ft)continue;z.push({id:$e.mediaId,name:$e.name||"media",file:ft.file,blobUrl:ft.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:$($e.mime),isProcessing:!1,idbKey:`idb://${$e.projectId}:${$e.mediaId}`,_mediaError:null}),ie++}catch(ft){console.warn("[recover-orphan] load failed for",$e.mediaId,ft)}}ie>0&&console.warn(`[recover-orphan] Surfacing ${ie} orphan media file(s) from stale projectIds`)}if(z.length>0){Ne(z);for(const Ee of z)Ee.type!=="audio"&&(async()=>{try{const _e=await ta(Ee.file);Ne(ba=>ba.map(rt=>rt.id===Ee.id?{...rt,duration:_e.duration||rt.duration,width:_e.width,height:_e.height}:rt));const $e=await $t(Ee.file,0),ft=URL.createObjectURL($e);Ne(ba=>ba.map(rt=>rt.id===Ee.id?{...rt,thumbnail:ft}:rt))}catch(_e){console.warn("[recover] metadata regen failed:",Ee.name,_e)}})();v.current=!0;const Re=ie>0?`Surfaced ${ie} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`:`Recovered ${z.length} media file(s) from local cache — re-add them to the timeline, then save`;N("warning",Re);return}v.current=!0,N("info",`Loaded project "${A}" (no clips)`);return}ge("Restoring media...");const re=new Map,Fe=new Map;for(const I of Z){const z=I.id||I.mediaId;z&&!Fe.has(z)&&Fe.set(z,I)}for(const I of ee){const z=I.mediaId||I.id;I.type!=="text"&&z&&!Fe.has(z)&&Fe.set(z,I)}tt(`Resolving ${Fe.size} media files...`);const fa=await Promise.all([...Fe.entries()].map(async([I,z])=>{if(y)return null;const ie=await Ce(z,Me);return{mediaId:I,resolved:ie,meta:z}}));for(const I of fa){if(!I||y)continue;const{mediaId:z,resolved:ie,meta:Re}=I;ie.blobUrl&&re.set(z,{blobUrl:ie.blobUrl,file:ie.file,meta:Re})}const Ut=[];for(const I of ee){let z=null,ie=null;const Re=I.mediaId||I.id;if(Re&&re.has(Re)){const _e=re.get(Re);z=_e.blobUrl,ie=_e.file}const Ee=!z&&I.type!=="text";Ut.push({...xa,...I,file:ie||null,blobUrl:z||null,thumbnail:null,_mediaError:Ee?"Media not found — re-import":null})}const pt=new Map;for(const[I,z]of re){const ie=z.meta||{};pt.set(I,{id:I,name:ie.name||"media",file:z.file,blobUrl:z.blobUrl,thumbnail:null,duration:ie.duration||0,width:ie.width||0,height:ie.height||0,type:ie.type||"video",isProcessing:!1,storagePath:ie.storagePath,_mediaError:null})}const ha=[],Ha=new Set;for(const I of Z){const z=I.id||I.mediaId,ie=z?pt.get(z):null;ha.push({id:z,name:I.name||ie?.name||"media",file:ie?.file||null,blobUrl:ie?.blobUrl||null,thumbnail:null,duration:ie?.duration??I.duration??0,width:ie?.width??I.width??0,height:ie?.height??I.height??0,type:I.type||ie?.type||"video",isProcessing:!1,storagePath:I.storagePath||ie?.storagePath,idbKey:I.idbKey,_mediaError:ie?.blobUrl||I.type==="audio"?null:"Media not found — re-import"}),z&&Ha.add(z)}for(const[I,z]of pt)Ha.has(I)||ha.push(z);const mt=Nr({restoredClips:Ut,mediaItems:ha,projectName:A});Ne(mt.mediaItems),de(mt.clips),It({hypothesisId:"H3",location:"VideoEditor.jsx:restoreProject.applyState",message:"restore applied timeline state",data:{projectId:x,restoredClips:Tt(mt.clips),restoredMediaItems:mt.mediaItems.length}}),await J(f);for(const I of mt.mediaItems)!I.file||I.type==="audio"||(async()=>{try{const z=await ta(I.file);Ne(Ee=>Ee.map(_e=>_e.id===I.id?{..._e,duration:z.duration||_e.duration,width:z.width,height:z.height}:_e));const ie=await $t(I.file,0),Re=URL.createObjectURL(ie);Ne(Ee=>Ee.map(_e=>_e.id===I.id?{..._e,thumbnail:Re}:_e))}catch(z){console.warn("[restore] Thumbnail regen failed:",I.name,z)}})();v.current=!0,N(mt.notification.level,mt.notification.message)}catch(f){console.error("Project load error:",f),N("error","Failed to load project")}finally{y||(vt(!1),ge(""),tt(""))}})(),()=>{y=!0}},[i?.id,t.state?.projectId,N,yt,de]),a.useEffect(()=>{oe.preload()},[]),a.useEffect(()=>{const o=c=>{const m=c.ctrlKey||c.metaKey;if(m&&c.shiftKey&&c.key==="E"){c.preventDefault(),pa();return}if(c.key==="Escape"&&V){ke(!1);return}const u=document.activeElement;if(!(c.target.tagName==="INPUT"||c.target.tagName==="TEXTAREA"||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA"||u?.isContentEditable)){if(c.key==="/"&&V){c.preventDefault(),document.querySelector(".ai-input-box")?.focus();return}if((c.key==="Delete"||c.key==="Backspace")&&Pe){c.preventDefault(),Ht(Pe);return}m&&c.key==="s"&&c.preventDefault(),m&&c.key==="e"&&(c.preventDefault(),_.length>0&&Pt("1080p")),m&&c.key==="z"&&(c.preventDefault(),c.shiftKey?ut():St()),m&&c.key==="y"&&(c.preventDefault(),ut())}};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[Pt,St,ut,_.length,U,V,pa,Pe,Ht]);const Va=a.useRef(Ae),Ka=a.useRef(_);return a.useEffect(()=>{Va.current=Ae},[Ae]),a.useEffect(()=>{Ka.current=_},[_]),a.useEffect(()=>()=>{Va.current.forEach(o=>{o.blobUrl&&URL.revokeObjectURL(o.blobUrl),o.thumbnail&&URL.revokeObjectURL(o.thumbnail)}),Ka.current.forEach(o=>{o.blobUrl&&URL.revokeObjectURL(o.blobUrl)})},[]),e.jsxs("div",{style:{...et.root,...S?{height:"100dvh",...te?{paddingBottom:0,paddingRight:"44px"}:{paddingBottom:"56px"}}:{}},role:"application","aria-label":"ClipCut Video Editor",children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("style",{children:zr}),!S&&e.jsx("a",{href:"#editor-timeline",className:"skip-link",children:"Skip to timeline"}),e.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"},children:wt?`Exporting video... ${Aa}%`:kt||""}),e.jsx(qn,{projectName:l,onProjectNameChange:d,onExport:Pt,isExporting:wt,exportProgress:Aa,currentOperation:kt,hasMediaToExport:_.filter(o=>o.type!=="audio"&&o.file).length>0,resolutions:Co,exportPresets:ia,exportSubMessage:Ua,lastSaved:Zo,canUndo:gt,canRedo:xt,onUndo:St,onRedo:ut,onCancelExport:on,onNewProject:en,onSave:tn,onSettings:an,editorLayout:Q,onLayoutChange:se,forceOpenExport:Ko>0,onExportModalClosed:()=>Ho(0),onAiToggle:pa,aiPanelOpen:V}),!S&&e.jsx(er,{activeToolbar:g,onToolbarChange:w}),e.jsxs("main",{"aria-label":"Editor workspace",style:{flex:S?1:Q==="wide-timeline"?"0 1 48%":"1 1 0%",display:"flex",flexDirection:S&&te?"row":S?"column":"row",minWidth:0,minHeight:S?0:"200px",overflow:"hidden",zIndex:0},children:[Q!=="compact"&&!S&&e.jsxs(e.Fragment,{children:[e.jsx(ht,{name:"left-panel",inline:!0,message:"Panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Ct,{width:`${F}px`}),children:e.jsx("div",{style:{width:`${F}px`,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0e1218"},children:e.jsxs("div",{style:{flex:"1 1 0%",overflow:"hidden auto",minHeight:0},className:"cs",children:[g==="media"&&e.jsx(so,{mediaTab:W,onMediaTabChange:fe,mediaItems:Ae,onImportMedia:Xt,onRemoveMedia:Oa,onAddToTimeline:Yt,selectedMediaId:ct,onSelectMedia:Bt,isImporting:Ra,style:ko}),g==="text"&&e.jsx(uo,{selectedClip:Oe,onClipUpdate:Ue,onAddClip:nt,currentTime:U.currentTime}),g==="audio"&&e.jsx(po,{selectedClip:Oe,onClipUpdate:Ue,bgMusic:Ve,onImportBgMusic:Gt,onUpdateBgMusicVolume:qt,onRemoveBgMusic:Jt}),g==="captions"&&e.jsx(bo,{clips:_,onAddClip:nt,onSetClips:de,currentTime:U.currentTime,mediaItems:Ae,selectedClip:Oe,selectedClipId:Pe,onSelectClip:Ze,onClipUpdate:Ue}),g==="stickers"&&e.jsx(mo,{onAddClip:nt,currentTime:U.currentTime}),g==="effects"&&e.jsx(fo,{selectedClip:Oe,onClipUpdate:Ue}),g==="transition"&&e.jsx(lo,{rightTab:"video",onRightTabChange:P,rightSubTab:"basic",onRightSubTabChange:Y,selectedClip:Oe,onClipUpdate:Ue,onAllCaptionsUpdate:Na,clips:_,bgMusic:Ve,onImportBgMusic:Gt,onUpdateBgMusicVolume:qt,onRemoveBgMusic:Jt,style:ko}),g==="filters"&&e.jsx(ho,{selectedClip:Oe,onClipUpdate:Ue})]})})})}),e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:o=>Ft(o,F),onDoubleClick:()=>Le(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})})]}),e.jsx("div",{style:S&&te?{flex:"0 0 60%",display:"flex",flexDirection:"column",minWidth:0}:{flex:"1 1 0%",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},children:e.jsx(ht,{name:"player",inline:!0,message:"Video player encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Ct,{width:"auto",height:"100%"}),children:e.jsx(Br,{isPlaying:U.isPlaying,onPlayPause:U.togglePlay,videoSrc:Go,currentTime:U.clipOffset,duration:ot,onTimeUpdate:rn,onSeek:nn,onEnded:ma,onVideoError:sn,clipProperties:U.currentClip||Oe,textOverlays:Jo,selectedClipId:Pe,onClipUpdate:Ue,onSelectClip:Ze,transitionPreview:Qo,hasTimelineClips:_.some(o=>o.type!=="audio"&&o.type!=="text"),hasUnavailableMediaClips:qo,isRestoringMedia:ca&&kt.includes("Restoring")})})})}),Q!=="compact"&&!S&&Oe&&!V&&e.jsxs("div",{className:"inspector-enter",style:{display:"flex",flexDirection:"row",flexShrink:0,width:`${ue+8}px`,overflow:"hidden"},children:[e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:o=>Vo(o,ue),onDoubleClick:()=>M(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})}),e.jsx(ht,{name:"inspector",inline:!0,message:"Inspector panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Ct,{width:`${ue}px`}),children:e.jsx(lo,{rightTab:G,onRightTabChange:P,rightSubTab:k,onRightSubTabChange:Y,selectedClip:Oe,onClipUpdate:Ue,onAllCaptionsUpdate:Na,clips:_,bgMusic:Ve,onImportBgMusic:Gt,onUpdateBgMusicVolume:qt,onRemoveBgMusic:Jt,style:{width:`${ue}px`}})})})]}),!S&&V&&e.jsx(ht,{name:"ai-chat",inline:!0,message:"AI panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Ct,{width:"360px"}),children:e.jsx(go,{isOpen:V,onClose:()=>ke(!1),messages:K,isThinking:ye,thinkingStage:q,slowHint:je,onSendMessage:At,suggestions:pe,onApplySuggestion:Da})})}),S&&e.jsxs("div",{style:te?{flex:"0 0 40%",display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden",borderLeft:"1px solid rgba(117,170,219,0.08)"}:{display:"contents"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"44px",padding:"0 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",flexShrink:0},children:[e.jsx("button",{onClick:()=>{const o=document.querySelector(".player-container");o&&(o.requestFullscreen?.()||o.webkitRequestFullscreen?.())},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Fullscreen",children:e.jsx(Te,{i:"fullscreen",s:20,c:"#94a3b8"})}),e.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:"12px",letterSpacing:"0.5px",color:"#e2e8f0",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:ro(U.currentTime)}),e.jsx("span",{style:{color:"#475569"},children:"/"}),e.jsx("span",{style:{color:"#94a3b8"},children:ro(ot)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2px"},children:[e.jsx("button",{onClick:St,disabled:!gt,style:{background:"none",border:"none",cursor:gt?"pointer":"not-allowed",opacity:gt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:18,c:"#94a3b8"})}),e.jsx("button",{onClick:ut,disabled:!xt,style:{background:"none",border:"none",cursor:xt?"pointer":"not-allowed",opacity:xt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:18,c:"#94a3b8"})})]})]}),Pe&&e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"4px",height:"64px",padding:"4px 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",flexShrink:0,transition:"height 0.2s ease, opacity 0.2s ease"},children:[{icon:"volume_off",label:"Mute clip audio",action:()=>Ue(Pe,{volume:Oe?.volume===0?1:0})},{icon:"image",label:"Cover",action:()=>{}},{icon:"music_note",label:"+ Add audio",action:()=>{bt("audio"),L(!0)}},{icon:"title",label:"+ Add text",action:()=>{bt("text"),L(!0)}}].map((o,c)=>e.jsxs("button",{onClick:o.action,style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",padding:"6px 8px",cursor:"pointer",minWidth:"64px",flex:"0 0 auto",minHeight:"44px"},children:[e.jsx(Te,{i:o.icon,s:20,c:"#e2e8f0"}),e.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",whiteSpace:"nowrap",fontFamily:"'Spline Sans', sans-serif"},children:o.label})]},c))}),e.jsx(ht,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Ta,{}),children:e.jsx(co,{id:"editor-timeline",clips:_,selectedClipId:Pe,onSelectClip:Ze,onUpdateClip:Ue,onDeleteClip:Ht,onSplitClip:Qt,onAddClip:nt,onRippleDelete:Fa,currentTime:U.currentTime,onSeek:U.seek,totalDuration:ot,isProcessing:ca,canUndo:gt,canRedo:xt,onUndo:St,onRedo:ut,mediaItems:Ae,onAddToTimeline:Yt,onDropRejected:o=>N("warning",o),timelineHeight:ce,timelineMarkers:la,onTimelineMarkersChange:Dt})})})]})]}),S&&e.jsxs(e.Fragment,{children:[e.jsx(Ar,{isOpen:le,onClose:()=>L(!1),children:e.jsx(ht,{name:"mobile-panel",inline:!0,message:"Panel error",children:e.jsxs(a.Suspense,{fallback:e.jsx(Ct,{width:"100%",height:"200px"}),children:[Qe==="media"&&e.jsx(so,{mediaTab:W,onMediaTabChange:fe,mediaItems:Ae,onImportMedia:Xt,onRemoveMedia:Oa,onAddToTimeline:Yt,selectedMediaId:ct,onSelectMedia:Bt,isImporting:Ra}),Qe==="text"&&e.jsx(uo,{selectedClip:Oe,onClipUpdate:Ue,onAddClip:nt,currentTime:U.currentTime}),Qe==="audio"&&e.jsx(po,{selectedClip:Oe,onClipUpdate:Ue,bgMusic:Ve,onImportBgMusic:Gt,onUpdateBgMusicVolume:qt,onRemoveBgMusic:Jt}),Qe==="captions"&&e.jsx(bo,{clips:_,onAddClip:nt,onSetClips:de,currentTime:U.currentTime,mediaItems:Ae,selectedClip:Oe,selectedClipId:Pe,onSelectClip:Ze,onClipUpdate:Ue}),Qe==="stickers"&&e.jsx(mo,{onAddClip:nt,currentTime:U.currentTime}),Qe==="effects"&&e.jsx(fo,{selectedClip:Oe,onClipUpdate:Ue}),Qe==="filters"&&e.jsx(ho,{selectedClip:Oe,onClipUpdate:Ue}),Qe==="ai"&&e.jsx(go,{isOpen:!0,onClose:()=>L(!1),messages:K,isThinking:ye,thinkingStage:q,slowHint:je,onSendMessage:At,suggestions:pe,onApplySuggestion:Da,isMobile:!0})]})})}),e.jsx("nav",{className:"mobile-tab-bar","aria-label":"Editor tools",children:[{id:"media",icon:"perm_media",label:"Media",tip:"Import and browse media"},{id:"text",icon:"title",label:"Text",tip:"Add manual text overlays"},{id:"captions",icon:"closed_caption",label:"Captions",tip:"Auto-generate subtitles from speech"},{id:"audio",icon:"music_note",label:"Audio",tip:"Background music and clip audio"},{id:"stickers",icon:"emoji_emotions",label:"Stickers",tip:"Drop emoji stickers on the preview"},{id:"effects",icon:"auto_fix_high",label:"Effects",tip:"Apply video effects"},{id:"filters",icon:"filter_vintage",label:"Filters",tip:"Apply colour filters"},{id:"ai",icon:"auto_awesome",label:"AI",tip:"AI editing assistant"}].map(o=>e.jsxs("button",{className:Qe===o.id&&le?"active":"",title:o.tip,"aria-label":o.tip,onClick:()=>{Qe===o.id?L(c=>!c):(bt(o.id),L(!0))},children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:22,color:Qe===o.id&&le?"#75AADB":void 0},children:o.icon}),e.jsx("span",{children:o.label})]},o.id))})]}),!S&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"resize-handle resize-handle-h",onMouseDown:o=>at(o,ce||Wr),onDoubleClick:()=>he(null),children:e.jsx("div",{className:"resize-handle-dot"})}),e.jsx(ht,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Ta,{}),children:e.jsx(co,{id:"editor-timeline",clips:_,selectedClipId:Pe,onSelectClip:Ze,onUpdateClip:Ue,onDeleteClip:Ht,onSplitClip:Qt,onAddClip:nt,onRippleDelete:Fa,currentTime:U.currentTime,onSeek:U.seek,totalDuration:ot,isProcessing:ca,canUndo:gt,canRedo:xt,onUndo:St,onRedo:ut,mediaItems:Ae,onAddToTimeline:Yt,onDropRejected:o=>N("warning",o),timelineHeight:ce,timelineMarkers:la,onTimelineMarkersChange:Dt})})})]}),oe.isLoading&&!oe.currentOperation&&!kt&&e.jsx(zo,{progress:oe.loadProgress}),(kt||oe.currentOperation)&&e.jsx(Do,{message:kt||"Processing...",progress:oe.currentOperation!=null?oe.progress:oe.loadProgress,operationLabel:oe.currentOperation?`${oe.currentOperation}...`:"",subMessage:Ua,onCancel:oe.currentOperation?oe.cancelOperation:void 0}),Yo&&e.jsx(Bo,{onComplete:()=>{Xo(!1),localStorage.setItem("clipcut_onboarded","1")}}),Wt&&e.jsx(Wo,{type:Wt.type,message:Wt.message,onClose:()=>La(null),autoClose:Wt.type!=="error"})]})},Zr=a.memo(Qr),Ii=Object.freeze(Object.defineProperty({__proto__:null,default:Zr},Symbol.toStringTag,{value:"Module"}));export{ci as A,xa as D,li as E,Dn as F,Te as I,gi as M,Bn as S,fi as T,Ii as V,ui as a,di as b,hi as c,ji as d,ki as e,Si as f,Ti as g,ro as h,xi as i,no as j,Ci as k,mi as l,pi as m,bi as n,et as s,wi as t,vi as x,yi as z};
