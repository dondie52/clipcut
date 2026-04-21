const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CP9tR0t4.js","assets/DwQPoapS.js","assets/C-uCTZoe.js","assets/DZxFKcQQ.js","assets/Et-wlZO3.js","assets/CHmidp_i.js","assets/B9CjrYEi.js","assets/eP0BgH-0.js","assets/J0YttQSL.js","assets/LYms3NbU.js","assets/C_anwfOM.js","assets/YmkVhmWw.js","assets/DvZfuG1Q.js","assets/DTPUJV_G.js","assets/CmBt0L7P.js","assets/DFgbO_Yr.js","assets/i6qUu1Ed.js","assets/DZS93GkI.js","assets/Bt5yRQqW.js","assets/BxKHFN2a.js","assets/DOCI-l41.js","assets/_YhCEu-M.js","assets/3u3NcAGO.js","assets/VH3KiNwT.js"])))=>i.map(i=>d[i]);
import{g as ea,u as Go,D as qo,_ as ze,d as Pt,E as mt,A as Jo,T as Ba,e as Da,r as Qo}from"./C-uCTZoe.js";import{r as a,j as e,a as Zo,u as en}from"./DwQPoapS.js";import{f as mo}from"./Et-wlZO3.js";import{u as ka,e as tn,f as Ut,c as za,g as an,h as kt,s as Xt,r as on,i as fo,j as Wa}from"./CHmidp_i.js";import{l as Ye,w as Fe,e as qe,r as Ke,t as He,c as Je,s as Qe,a as Xe,i as pa,b as nn,d as rn,f as sn,g as ln,m as cn,h as dn,E as ta,j as un,k as pn,n as mn,o as fn,p as hn,q as bn,u as gn,R as ho,v as xn,x as yn,y as wn}from"./eP0BgH-0.js";const je=a.memo(({i:t,s:o=18,c:i="currentColor",style:n={},filled:s=!1,weight:l=400,...c})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:`${o}px`,color:i,fontVariationSettings:`'FILL' ${s?1:0}, 'wght' ${l}`,transition:"color 0.15s ease",userSelect:"none",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center",...n},"aria-hidden":"true",...c,children:t}));je.displayName="Icon";const vn=`
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
`,Zt=a.memo(({i:t,onClick:o,style:i={},title:n,disabled:s=!1,size:l=18,color:c="#64748b",hoverColor:m="#94a3b8",...b})=>{const[p,g]=a.useState(!1),x=a.useCallback(T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),o?.())},[o]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:vn}),e.jsx("button",{className:"ghost-btn",style:{background:"none",border:"none",cursor:s?"not-allowed":"pointer",padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",opacity:s?.5:1,...i},onClick:s?void 0:o,onKeyDown:x,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),disabled:s,title:n,"aria-label":b["aria-label"]||n,...b,children:e.jsx(je,{i:t,s:l,c:p&&!s?m:c})})]})});Zt.displayName="GhostBtn";const et={root:{width:"100%",maxWidth:"100vw",minWidth:0,minHeight:0,height:"100vh",display:"flex",flexDirection:"column",background:"var(--color-bg-dark, #08090c)",color:"var(--color-text-primary, #f1f5f9)",overflow:"hidden",fontFamily:"'Spline Sans', sans-serif"},ghost:{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all var(--transition-normal, 0.15s ease)"},topBar:{height:"42px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",flexShrink:0,position:"relative",zIndex:3e3},titleInput:{position:"absolute",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid transparent",outline:"none",textAlign:"center",fontSize:"12px",fontWeight:500,color:"#cbd5e1",width:"220px",padding:"5px 14px",borderRadius:"4px",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease"},exportBtn:{marginLeft:"6px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"#0a0a0a",padding:"7px 22px",borderRadius:"6px",fontSize:"11px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.25)",letterSpacing:"0.3px",textTransform:"uppercase"},toolbar:{height:"46px",background:"#0e1218",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",padding:"0 8px",gap:0,flexShrink:0},leftPanel:{width:"280px",minWidth:0,maxWidth:"100%",borderRight:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},importBtn:{width:"100%",background:"rgba(117, 170, 219, 0.03)",border:"1.5px dashed rgba(117, 170, 219, 0.15)",borderRadius:"8px",padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",cursor:"pointer",position:"relative",fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all 0.15s ease"},rightPanel:{width:"320px",minWidth:0,maxWidth:"100%",borderLeft:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},controls:{height:"52px",background:"linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",borderTop:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"relative"},timeline:{flex:"0 0 auto",height:"280px",background:"#08090c",borderTop:"2px solid rgba(117, 170, 219, 0.1)",display:"flex",flexDirection:"column",minHeight:"120px",overflow:"hidden",position:"relative",zIndex:10},tlToolbar:{height:"38px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}},kn=`
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
`,rt=[{id:"media",icon:"folder_open",label:"Media"},{id:"audio",icon:"music_note",label:"Audio"},{id:"text",icon:"text_fields",label:"Text"},{id:"captions",icon:"closed_caption",label:"Captions"},{id:"stickers",icon:"mood",label:"Stickers"},{id:"effects",icon:"auto_fix_high",label:"Effects"},{id:"transition",icon:"layers",label:"Transition"},{id:"filters",icon:"filter_list",label:"Filters"}],Sn={PLAY_PAUSE:{key:"Space",description:"Play/Pause"},SKIP_FORWARD:{key:"ArrowRight",description:"Skip forward 5s"},SKIP_BACKWARD:{key:"ArrowLeft",description:"Skip backward 5s"},SKIP_FORWARD_LARGE:{key:"Shift+ArrowRight",description:"Skip forward 10s"},SKIP_BACKWARD_LARGE:{key:"Shift+ArrowLeft",description:"Skip backward 10s"},FRAME_FORWARD:{key:".",description:"Next frame"},FRAME_BACKWARD:{key:",",description:"Previous frame"},GO_TO_START:{key:"Home",description:"Go to start"},GO_TO_END:{key:"End",description:"Go to end"},SPLIT:{key:"S",description:"Split at playhead"},DELETE:{key:"Delete",description:"Delete selected"},DESELECT:{key:"Escape",description:"Deselect"},MUTE:{key:"M",description:"Mute/Unmute"},VOLUME_UP:{key:"ArrowUp",description:"Volume up"},VOLUME_DOWN:{key:"ArrowDown",description:"Volume down"},FULLSCREEN:{key:"F",description:"Toggle fullscreen"},SAVE:{key:"Ctrl+S",description:"Save project"},EXPORT:{key:"Ctrl+E",description:"Export video"},IMPORT:{key:"Ctrl+I",description:"Import media"},TOOLBAR_1:{key:"1",description:"Media panel"},TOOLBAR_2:{key:"2",description:"Audio panel"},TOOLBAR_3:{key:"3",description:"Text panel"},TOOLBAR_4:{key:"4",description:"Stickers panel"},TOOLBAR_5:{key:"5",description:"Effects panel"},TOOLBAR_6:{key:"6",description:"Transitions panel"},TOOLBAR_7:{key:"7",description:"Filters panel"}},jn=`
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
`,ma={volume:1,isMuted:!1,speed:1,rotation:0,opacity:1,positionX:0,positionY:0,scale:1,brightness:0,contrast:0,saturation:1,temperature:0,filterName:null,filterStrength:50,effects:[],fadeIn:0,fadeOut:0,track:0,trimStart:0,trimEnd:0,colorGrading:{shadows:"#1a1a2e",midtones:"#4a4a5e",highlights:"#ffffff"},transition:null,transitionDuration:1,text:"",textColor:"#ffffff",textSize:48,textPosition:"bottom-center",textBgColor:"",textBold:!1,textItalic:!1,textUnderline:!1,textAlign:"center",textFontFamily:"Spline Sans",textStartTime:0,textDuration:0,textX:null,textY:null},Tn=[{name:"None",filter:null,css:null},{name:"90s",filter:"colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8",css:"sepia(0.3) saturate(0.8)"},{name:"Vintage",filter:"eq=saturation=0.6:brightness=0.05",css:"sepia(0.4) saturate(0.6) brightness(1.05)"},{name:"Cinema",filter:"eq=contrast=1.2:brightness=-0.05:saturation=1.1",css:"contrast(1.2) brightness(0.95) saturate(1.1)"},{name:"B&W",filter:"eq=saturation=0",css:"grayscale(1)"},{name:"Warm",filter:"colortemperature=6500",css:"sepia(0.15) saturate(1.2)"},{name:"Cool",filter:"colortemperature=3500",css:"saturate(0.9) hue-rotate(10deg)"},{name:"Sepia",filter:"colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",css:"sepia(0.8)"}],Dr=[{name:"Motion Blur",type:"blur",params:{radius:5},css:"blur(2px)",icon:"blur_on"},{name:"Sharpen",type:"sharpen",params:{strength:1},css:"contrast(1.1)",icon:"deblur"},{name:"Vignette",type:"vignette",params:{},css:null,icon:"vignette"},{name:"Gaussian Blur",type:"blur",params:{radius:10},css:"blur(4px)",icon:"lens_blur"},{name:"Glitch",type:"glitch",params:{intensity:3},css:null,icon:"broken_image"},{name:"Zoom",type:"zoom",params:{factor:1.5},css:null,icon:"zoom_in"},{name:"Shake",type:"shake",params:{intensity:5},css:null,icon:"vibration"},{name:"Flash",type:"flash",params:{duration:.5},css:null,icon:"flash_on"}],zr=[{name:"Fade In",key:"fadeIn",value:1},{name:"Fade Out",key:"fadeOut",value:1},{name:"Scale Up",key:"scaleUp",value:!0},{name:"Slide Left",key:"slideLeft",value:!0}],Wr=[{value:null,label:"None",icon:"block"},{value:"fade",label:"Fade",icon:"gradient"},{value:"fadeblack",label:"Fade Black",icon:"brightness_1"},{value:"fadewhite",label:"Fade White",icon:"brightness_7"},{value:"dissolve",label:"Dissolve",icon:"blur_on"},{value:"wipeleft",label:"Wipe Left",icon:"arrow_back"},{value:"wiperight",label:"Wipe Right",icon:"arrow_forward"},{value:"slideup",label:"Slide Up",icon:"arrow_upward"},{value:"slidedown",label:"Slide Down",icon:"arrow_downward"}],Vr=[{value:"top-left",label:"Top Left",icon:"north_west"},{value:"top-center",label:"Top",icon:"north"},{value:"top-right",label:"Top Right",icon:"north_east"},{value:"center-left",label:"Left",icon:"west"},{value:"center",label:"Center",icon:"center_focus_strong"},{value:"center-right",label:"Right",icon:"east"},{value:"bottom-left",label:"Bottom Left",icon:"south_west"},{value:"bottom-center",label:"Bottom",icon:"south"},{value:"bottom-right",label:"Bottom Right",icon:"south_east"}],Kr=[{emoji:"😀",label:"Grinning",category:"smileys"},{emoji:"😂",label:"Laughing",category:"smileys"},{emoji:"🥹",label:"Touched",category:"smileys"},{emoji:"😍",label:"Heart Eyes",category:"smileys"},{emoji:"🤩",label:"Star Struck",category:"smileys"},{emoji:"😎",label:"Cool",category:"smileys"},{emoji:"🥳",label:"Party",category:"smileys"},{emoji:"😱",label:"Shocked",category:"smileys"},{emoji:"🤔",label:"Thinking",category:"smileys"},{emoji:"😴",label:"Sleeping",category:"smileys"},{emoji:"👍",label:"Thumbs Up",category:"hands"},{emoji:"👎",label:"Thumbs Down",category:"hands"},{emoji:"👏",label:"Clap",category:"hands"},{emoji:"🙌",label:"Raised Hands",category:"hands"},{emoji:"🤝",label:"Handshake",category:"hands"},{emoji:"✌️",label:"Peace",category:"hands"},{emoji:"🤞",label:"Fingers Crossed",category:"hands"},{emoji:"💪",label:"Strong",category:"hands"},{emoji:"❤️",label:"Heart",category:"symbols"},{emoji:"🔥",label:"Fire",category:"symbols"},{emoji:"⭐",label:"Star",category:"symbols"},{emoji:"💯",label:"100",category:"symbols"},{emoji:"✨",label:"Sparkles",category:"symbols"},{emoji:"💥",label:"Boom",category:"symbols"},{emoji:"🎯",label:"Target",category:"symbols"},{emoji:"⚡",label:"Lightning",category:"symbols"},{emoji:"🚀",label:"Rocket",category:"symbols"},{emoji:"💎",label:"Diamond",category:"symbols"},{emoji:"🎬",label:"Clapper",category:"objects"},{emoji:"🎵",label:"Music",category:"objects"},{emoji:"🎤",label:"Mic",category:"objects"},{emoji:"📸",label:"Camera",category:"objects"},{emoji:"🎮",label:"Gaming",category:"objects"},{emoji:"🏆",label:"Trophy",category:"objects"},{emoji:"🎁",label:"Gift",category:"objects"},{emoji:"💡",label:"Idea",category:"objects"},{emoji:"👆",label:"Point Up",category:"arrows"},{emoji:"👇",label:"Point Down",category:"arrows"},{emoji:"👈",label:"Point Left",category:"arrows"},{emoji:"👉",label:"Point Right",category:"arrows"},{emoji:"⬆️",label:"Arrow Up",category:"arrows"},{emoji:"⬇️",label:"Arrow Down",category:"arrows"},{emoji:"🔔",label:"Bell",category:"objects"},{emoji:"💬",label:"Speech",category:"objects"},{emoji:"🏷️",label:"Tag",category:"objects"},{emoji:"📌",label:"Pin",category:"objects"}],Hr=[{name:"Title",textSize:64,textColor:"#ffffff",textPosition:"center",textBgColor:"",textBold:!0,textAlign:"center",icon:"title"},{name:"Subtitle",textSize:36,textColor:"#e2e8f0",textPosition:"bottom-center",textBgColor:"",textBold:!1,textAlign:"center",icon:"subtitles"},{name:"Caption",textSize:24,textColor:"#ffffff",textPosition:"bottom-center",textBgColor:"#000000",textBold:!1,textAlign:"center",icon:"closed_caption"},{name:"Lower Third",textSize:28,textColor:"#ffffff",textPosition:"bottom-left",textBgColor:"rgba(0,0,0,0.7)",textBold:!0,textAlign:"left",icon:"video_label"}],Yr=["Spline Sans","Arial","Georgia","Courier New","Impact","Comic Sans MS","Trebuchet MS","Verdana","Times New Roman"],Xr=[{label:"0.25x",value:.25},{label:"0.5x",value:.5},{label:"1x",value:1},{label:"1.5x",value:1.5},{label:"2x",value:2}];function Cn(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}function In(){if(typeof navigator>"u")return!1;const t=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(t)?!0:navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1}const Sa=`
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
`,Va=[{key:"low",label:"Low",crf:28},{key:"medium",label:"Medium",crf:23},{key:"high",label:"High",crf:18},{key:"ultra",label:"Ultra",crf:15}],Rn=[{key:"webm",label:"WebM"},{key:"mp4",label:"MP4 (via server)"}],Mn=[24,30,60],En=a.memo(({items:t,selected:o,onSelect:i,style:n})=>e.jsx("div",{style:{display:"flex",gap:"4px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"3px",...n},children:t.map(s=>e.jsx("button",{onClick:()=>i(s.key||s),style:{flex:1,padding:"6px 8px",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",background:(s.key||s)===o?"rgba(117,170,219,0.15)":"transparent",color:(s.key||s)===o?"#75aadb":"#64748b"},children:s.label||s},s.key||s))}));En.displayName="PillGroup";const bo=a.memo(({isOpen:t,onClose:o,onExport:i,isExporting:n,progress:s,operationLabel:l="Processing",subMessage:c="",resolutions:m,exportPresets:b={},onCancel:p,projectName:g="Untitled",exportResult:x,onDownload:T,onExportAnother:W})=>{const[_,y]=a.useState("1080p"),[z,G]=a.useState("resolution"),[se,Q]=a.useState("youtube-1080p"),[J,v]=a.useState("webm"),[Y,le]=a.useState("high"),[O,B]=a.useState(30),[fe,H]=a.useState("");a.useEffect(()=>{t&&!fe&&H(Cn(g))},[t,g]);const de=In();if(a.useEffect(()=>{if(!t)return;const C=pe=>{pe.key==="Escape"&&!n&&o()};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[t,n,o]),a.useEffect(()=>{if(!t)return;const pe=document.getElementById("export-modal")?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');pe?.length&&pe[0].focus()},[t]),!t)return null;const E=C=>{C.target===C.currentTarget&&!n&&!x&&o()};m?.[_];const X=Va.find(C=>C.key===Y),Re=[J.toUpperCase(),_,`${O}fps`],ve=z==="platform"?b[se]?.label:Re.join(" · "),Pe=()=>{const C=z==="platform"?`preset:${se}`:_;i(C,{format:J,quality:X?.crf,fps:O,filename:fe||g})},oe=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hud-body",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Container · Codec"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Output format",children:Rn.map(C=>e.jsx("button",{className:J===C.key?"is-active":"",onClick:()=>v(C.key),role:"radio","aria-checked":J===C.key,children:C.label},C.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Target"}),e.jsxs("div",{className:"hud-segment",role:"radiogroup","aria-label":"Target mode",children:[e.jsx("button",{className:z==="resolution"?"is-active":"",onClick:()=>G("resolution"),role:"radio","aria-checked":z==="resolution",children:"By Resolution"}),e.jsx("button",{className:z==="platform"?"is-active":"",onClick:()=>G("platform"),role:"radio","aria-checked":z==="platform",children:"By Platform"})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Signal"}),z==="resolution"?e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Resolution",children:Object.entries(m).map(([C,{label:pe,width:te,height:$}])=>{const me=_===C;return e.jsxs("button",{className:`hud-row-item ${me?"is-active":""}`,onClick:()=>y(C),role:"radio","aria-checked":me,children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsx("span",{className:"hud-row-name",children:pe}),e.jsxs("span",{className:"hud-row-spec",children:[te,"×",$]}),e.jsxs("span",{className:"hud-row-spec",style:{color:me?"#75AADB":"rgba(255,255,255,0.34)"},children:[Math.round(te*$/1e4)/100,"MP"]})]},C)})}):e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Platform",children:Object.entries(b).map(([C,pe])=>{const te=se===C;return e.jsxs("button",{className:`hud-row-item ${te?"is-active":""}`,onClick:()=>Q(C),role:"radio","aria-checked":te,style:{gridTemplateColumns:"18px 1fr auto"},children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsxs("span",{className:"hud-row-name",children:[pe.label,e.jsx("span",{className:"hud-row-sub",style:{gridColumn:"unset",display:"block",marginTop:3},children:pe.description})]}),e.jsxs("span",{className:"hud-row-spec",children:[pe.width,"×",pe.height]})]},C)})})]}),e.jsxs("div",{className:"hud-row-split",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Quality (CRF)"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Quality",children:Va.map(C=>e.jsx("button",{className:Y===C.key?"is-active":"",onClick:()=>le(C.key),role:"radio","aria-checked":Y===C.key,title:`CRF ${C.crf}`,children:C.label},C.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Frame Rate"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Frame rate",children:Mn.map(C=>e.jsxs("button",{className:O===C?"is-active":"",onClick:()=>B(C),role:"radio","aria-checked":O===C,children:[C,"fps"]},C))})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Filename"}),e.jsx("input",{type:"text",className:"hud-input",value:fe,onChange:C=>H(C.target.value),"aria-label":"Export filename",placeholder:"clipcut-export"})]}),e.jsxs("div",{className:"hud-summary",role:"status",children:[e.jsx("span",{className:"hud-summary-dot","aria-hidden":"true"}),e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsxs("div",{className:"hud-summary-text",children:["Ready · ",ve]}),J==="webm"&&!de&&e.jsx("div",{className:"hud-summary-note",children:"WebM plays on most devices. For iPhone Photos compatibility, choose MP4."}),J==="webm"&&de&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead."}),J==="mp4"&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"MP4 export routes through our encoding server, which is offline right now — falling back to WebM. Switch back once the server is available."})]})]})]}),e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Cancel"}),e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:Pe,children:[e.jsx(je,{i:"download",s:14,c:"#04060b"}),"Render · Export"]})]})]}),Ue=()=>{const C=Math.max(0,Math.min(100,Math.round(s)));return e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-progress",children:[e.jsxs("div",{className:"hud-big-readout","aria-live":"polite","aria-atomic":"true",children:[String(C).padStart(2,"0"),e.jsx("span",{className:"pct",children:"%"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hud-op-label",children:l||"Rendering"}),c&&e.jsx("div",{className:"hud-op-sub",children:c})]}),e.jsxs("div",{className:"hud-filmstrip",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":C,children:[e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--top","aria-hidden":"true",children:Array.from({length:24}).map((pe,te)=>e.jsx("span",{style:{animationDelay:`${(te*.05).toFixed(2)}s`}},te))}),e.jsx("div",{className:"hud-filmstrip-fill",style:{width:`${C}%`}}),e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--bottom","aria-hidden":"true",children:Array.from({length:24}).map((pe,te)=>e.jsx("span",{style:{animationDelay:`${(te*.05+.1).toFixed(2)}s`}},te))})]}),e.jsxs("div",{className:"hud-telemetry","aria-label":"Telemetry",children:[e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Format"}),e.jsx("span",{className:"hud-telemetry-value",children:J.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Signal"}),e.jsx("span",{className:"hud-telemetry-value",children:z==="platform"?b[se]?.label||"—":_.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Frame Rate"}),e.jsxs("span",{className:"hud-telemetry-value",children:[O,"fps"]})]})]})]})})},Ne=()=>p?e.jsx("div",{className:"hud-actions",style:{justifyContent:"center"},children:e.jsx("button",{type:"button",className:"hud-btn hud-btn--danger",onClick:p,children:"Abort render"})}):null,ge=()=>e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-complete",children:[e.jsxs("div",{className:"hud-complete-stamp",children:[e.jsx("span",{className:"led","aria-hidden":"true"}),"Export complete · Signal locked"]}),e.jsx("h3",{className:"hud-complete-title",children:"Your file is ready."}),x?.size&&e.jsxs("span",{className:"hud-complete-file",children:[(x.size/(1024*1024)).toFixed(1)," MB · ",J.toUpperCase()]})]})}),q=()=>e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Close"}),W&&e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:W,children:"Export another"}),T&&e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:T,children:[e.jsx(je,{i:"download",s:14,c:"#04060b"}),"Download"]})]}),Se=x?"hud-head-led hud-head-led--green":n?"hud-head-led hud-head-led--amber":"hud-head-led",ue=x?"Complete":n?"Rendering":"Standby";return e.jsxs("div",{className:"hud-backdrop",onClick:E,role:"dialog","aria-modal":"true","aria-labelledby":"export-modal-title",children:[e.jsx("style",{children:Sa}),e.jsxs("div",{id:"export-modal",className:"hud-console",children:[e.jsxs("div",{className:"hud-head",children:[e.jsxs("div",{className:"hud-head-left",children:[e.jsx("span",{className:Se,"aria-hidden":"true"}),e.jsxs("h2",{id:"export-modal-title",className:"hud-head-title",children:[e.jsx("span",{children:"CC · EXPORT"}),e.jsx("span",{className:"sep",children:"//"}),e.jsx("span",{className:"ch-id",children:ue.toUpperCase()})]})]}),!n&&!x&&e.jsx("button",{onClick:o,className:"hud-head-close","aria-label":"Close export dialog",title:"Close (Escape)",children:e.jsx(je,{i:"close",s:16,c:"currentColor"})})]}),x?ge():n?Ue():oe(),!n&&!x&&null,n&&Ne(),x&&q()]})]})});bo.displayName="ExportModal";const _n={Playback:["PLAY_PAUSE","SKIP_FORWARD","SKIP_BACKWARD","SKIP_FORWARD_LARGE","SKIP_BACKWARD_LARGE","FRAME_FORWARD","FRAME_BACKWARD","GO_TO_START","GO_TO_END"],Editing:["SPLIT","DELETE","DESELECT"],Audio:["MUTE","VOLUME_UP","VOLUME_DOWN"],View:["FULLSCREEN"],File:["SAVE","EXPORT","IMPORT"]},go=a.memo(({isOpen:t,onClose:o})=>(a.useEffect(()=>{if(!t)return;const i=n=>{n.key==="Escape"&&o()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[t,o]),t?e.jsxs("div",{className:"shortcuts-modal-backdrop",onClick:i=>i.target===i.currentTarget&&o(),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3500,backdropFilter:"blur(4px)"},role:"dialog","aria-modal":"true","aria-labelledby":"shortcuts-modal-title",children:[e.jsx("style",{children:Sa}),e.jsxs("div",{className:"shortcuts-modal-content",style:{background:"#1a2332",borderRadius:"12px",padding:"24px",width:"520px",maxWidth:"90vw",maxHeight:"80vh",overflow:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[e.jsxs("h2",{id:"shortcuts-modal-title",style:{margin:0,fontSize:"18px",fontWeight:600,color:"white",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(je,{i:"keyboard",s:22,c:"#75aadb"}),"Keyboard Shortcuts"]}),e.jsx("button",{onClick:o,style:{...et.ghost,padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":"Close shortcuts dialog",children:e.jsx(je,{i:"close",s:20,c:"#94a3b8"})})]}),Object.entries(_n).map(([i,n])=>e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{fontSize:"11px",color:"#75aadb",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,margin:"0 0 10px 0"},children:i}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:n.map(s=>{const l=Sn[s];return l?e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:"6px",background:"rgba(255,255,255,0.02)"},children:[e.jsx("span",{style:{fontSize:"13px",color:"#cbd5e1"},children:l.description}),e.jsx("span",{className:"shortcut-key",children:l.key})]},s):null})})]},i))]})]}):null));go.displayName="KeyboardShortcutsModal";const Pn=[{id:"new",icon:"add",label:"New Project",shortcut:null},{id:"save",icon:"save",label:"Save",shortcut:"Ctrl+S"},{id:"divider1"},{id:"export",icon:"download",label:"Export",shortcut:"Ctrl+E"},{id:"divider2"},{id:"settings",icon:"settings",label:"Settings",shortcut:null}],xo=a.memo(({isOpen:t,onClose:o,onNewProject:i,onSave:n,onExport:s,onSettings:l,hasMediaToExport:c})=>{const m=a.useRef(null);if(a.useEffect(()=>{if(!t)return;const p=x=>{m.current&&!m.current.contains(x.target)&&o()},g=x=>{x.key==="Escape"&&o()};return requestAnimationFrame(()=>{document.addEventListener("mousedown",p),document.addEventListener("keydown",g)}),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",g)}},[t,o]),!t)return null;const b=p=>{switch(o(),p){case"new":i?.();break;case"save":n?.();break;case"export":c&&s?.();break;case"settings":l?.();break}};return e.jsx("div",{ref:m,className:"menu-dropdown",role:"menu",style:{position:"absolute",top:"100%",left:0,marginTop:"4px",background:"#1a2332",borderRadius:"8px",padding:"4px",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",minWidth:"200px",zIndex:100},children:Pn.map(p=>{if(p.id.startsWith("divider"))return e.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0"}},p.id);const g=p.id==="export"&&!c;return e.jsxs("button",{className:"menu-dropdown-item",role:"menuitem",onClick:()=>!g&&b(p.id),style:{...et.ghost,display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"6px",width:"100%",textAlign:"left",color:g?"#475569":"#cbd5e1",cursor:g?"not-allowed":"pointer",opacity:g?.5:1,fontSize:"13px",fontFamily:"'Spline Sans', sans-serif"},disabled:g,children:[e.jsx(je,{i:p.icon,s:16,c:g?"#475569":"#94a3b8"}),e.jsx("span",{style:{flex:1},children:p.label}),p.shortcut&&e.jsx("span",{style:{fontSize:"11px",color:"#475569",fontFamily:"'SF Mono', Monaco, monospace"},children:p.shortcut})]},p.id)})})});xo.displayName="MenuDropdown";const An=({projectName:t,onProjectNameChange:o,onExport:i,isExporting:n=!1,exportProgress:s=0,currentOperation:l="",hasMediaToExport:c=!1,resolutions:m={},exportPresets:b={},lastSaved:p=null,canUndo:g=!1,canRedo:x=!1,onUndo:T,onRedo:W,onCancelExport:_,exportSubMessage:y="",onNewProject:z,onSave:G,onSettings:se,editorLayout:Q="default",onLayoutChange:J,forceOpenExport:v=!1,onExportModalClosed:Y,onAiToggle:le,aiPanelOpen:O=!1})=>{const B=ka(),[fe,H]=a.useState(!1),[de,E]=a.useState(!1),[X,Re]=a.useState(!1),[ve,Pe]=a.useState(!1),oe=a.useRef(null);a.useEffect(()=>{const $=me=>{me.target.tagName==="INPUT"||me.target.tagName==="TEXTAREA"||(me.key==="?"||me.shiftKey&&me.key==="/")&&(me.preventDefault(),Pe(w=>!w))};return window.addEventListener("keydown",$),()=>window.removeEventListener("keydown",$)},[]),a.useEffect(()=>{v&&c&&!n&&(H(!0),Y?.())},[v,c,n,Y]);const Ue=a.useCallback(()=>{n||(c?H(!0):console.warn("Export not available:",{hasMediaToExport:c,isExporting:n}))},[c,n]),Ne=a.useCallback(($,me)=>{i?.($,me)},[i]),ge=a.useCallback(()=>{n||(H(!1),C(null))},[n]),q=a.useCallback($=>{const me=mo($.target.value,{maxLength:100});o(me)},[o]),Se=a.useCallback($=>{($.key==="Enter"||$.key==="Escape")&&$.target.blur()},[]),[ue,C]=a.useState(null);a.useEffect(()=>{!n&&s>=100&&fe&&!ue&&C({size:null}),fe||C(null)},[n,s,fe,ue]);const[pe,te]=a.useState("");return a.useEffect(()=>{const $=()=>{te(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}))};$();const me=setInterval($,6e4);return()=>clearInterval(me)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Sa}),e.jsxs("header",{style:{...et.topBar,...B?{height:"44px",padding:"0 10px"}:{}},role:"banner","aria-label":"ClipCut editor header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsxs("div",{className:"logo-container",style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},role:"img","aria-label":"ClipCut logo",children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(117, 170, 219, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(je,{i:"movie_edit",s:18,c:"#75aadb"})}),!B&&e.jsx("span",{style:{fontWeight:700,fontSize:"15px",letterSpacing:"-0.3px",color:"white"},children:"ClipCut"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginLeft:"8px",fontSize:"11px"},children:[e.jsxs("div",{ref:oe,style:{position:"relative"},children:[e.jsx("button",{className:"menu-btn",onClick:()=>Re($=>!$),style:{...et.ghost,display:"flex",alignItems:"center",gap:"2px",color:X?"#75aadb":"#94a3b8"},"aria-haspopup":"menu","aria-expanded":X,"aria-label":"Open menu",children:B?e.jsx(je,{i:"menu",s:18}):e.jsxs(e.Fragment,{children:["Menu ",e.jsx(je,{i:"arrow_drop_down",s:16})]})}),e.jsx(xo,{isOpen:X,onClose:()=>Re(!1),onNewProject:z,onSave:G,onExport:Ue,onSettings:se,hasMediaToExport:c})]}),!B&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("button",{onClick:T,disabled:!g,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:g?1:.4,cursor:g?"pointer":"not-allowed"},title:"Undo (Ctrl+Z)","aria-label":"Undo",children:e.jsx(je,{i:"undo",s:14,c:g?"#94a3b8":"#475569"})}),e.jsx("button",{onClick:W,disabled:!x,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:x?1:.4,cursor:x?"pointer":"not-allowed"},title:"Redo (Ctrl+Shift+Z or Ctrl+Y)","aria-label":"Redo",children:e.jsx(je,{i:"redo",s:14,c:x?"#94a3b8":"#475569"})})]}),!B&&p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Last saved at ${p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}`,title:`Last saved: ${p.toLocaleString()}`,children:[e.jsx(je,{i:"cloud_done",s:12,c:"#475569"}),"Saved ",p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]}),!B&&!p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":"Auto save at current time",children:[e.jsx(je,{i:"cloud_done",s:12,c:"#475569"}),"Auto save at ",pe]})]})]}),e.jsx("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:e.jsx("input",{type:"text",value:t,onChange:q,onFocus:()=>E(!0),onBlur:()=>E(!1),onKeyDown:Se,className:"title-input",style:{...et.titleInput,position:"relative",left:"auto",transform:"none",border:"1px solid transparent",width:B?"120px":"220px",pointerEvents:"auto"},"aria-label":"Project name",title:"Click to edit project name"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:B?"4px":"8px"},children:[le&&e.jsx(Zt,{i:"auto_awesome",title:"AI Editor","aria-label":O?"Close AI editor":"Open AI editor",onClick:le,style:O?{color:"#75aadb",background:"rgba(117,170,219,0.12)"}:void 0}),!B&&e.jsx(Zt,{i:"keyboard",title:"Keyboard shortcuts","aria-label":"Show keyboard shortcuts",onClick:()=>Pe(!0)}),!B&&e.jsx(Zt,{i:Q==="default"?"grid_view":Q==="wide-timeline"?"view_agenda":"view_compact",title:`Layout: ${Q}`,"aria-label":"Cycle layout",onClick:()=>{const $=["default","wide-timeline","compact"],me=$.indexOf(Q);J?.($[(me+1)%$.length])}}),e.jsxs("button",{onClick:Ue,className:B?"":"export-btn",style:{...B?{background:c&&!n?"#22c55e":"rgba(34,197,94,0.5)",border:"none",borderRadius:"20px",padding:"6px 14px",fontSize:"12px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Spline Sans', sans-serif",cursor:c&&!n?"pointer":"not-allowed",minHeight:"32px",minWidth:"auto",transition:"all 0.2s ease"}:{...et.exportBtn,opacity:c&&!n?1:.5,cursor:c&&!n?"pointer":"not-allowed"}},disabled:!c||n,"aria-label":n?"Exporting...":c?"Export video":"Add media to timeline to export",title:n?"Export in progress...":c?"Export video (Ctrl+E)":"Add media to timeline first",children:[e.jsx(je,{i:"download",s:14,c:B?"#fff":"#0a0a0a"}),n?"Exporting...":"Export"]})]})]}),e.jsx(bo,{isOpen:fe,onClose:ge,onExport:Ne,isExporting:n,progress:s,operationLabel:l||"Exporting video...",subMessage:y,resolutions:m,exportPresets:b,onCancel:n?_:void 0,projectName:t,exportResult:ue,onDownload:ue?ge:void 0,onExportAnother:ue?()=>C(null):void 0}),e.jsx(go,{isOpen:ve,onClose:()=>Pe(!1)})]})},Un=a.memo(An),Ln=`
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
`,yo=a.memo(({item:t,isActive:o,onClick:i,shortcut:n,compact:s})=>{const[l,c]=a.useState(!1),m=a.useCallback(b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i(t.id))},[t.id,i]);return e.jsxs("button",{onClick:()=>i(t.id),onKeyDown:m,onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),className:`toolbar-btn ${o?"active":""}`,style:{...et.ghost,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:s?"6px 10px":"6px 14px",flexShrink:0,color:o?"#75aadb":l?"#94a3b8":"#4a5568"},role:"tab","aria-selected":o,"aria-label":`${t.label} panel`,tabIndex:o?0:-1,children:[e.jsx("span",{className:"toolbar-icon",children:e.jsx(je,{i:t.icon,s:20,c:o?"#75aadb":l?"#94a3b8":"#4a5568"})}),e.jsx("span",{style:{fontSize:"8px",fontWeight:o?700:600,textTransform:"uppercase",letterSpacing:"1px",transition:"color 0.15s ease"},children:t.label}),e.jsxs("div",{className:"toolbar-tooltip",children:[t.label,n&&e.jsx("span",{className:"toolbar-shortcut",children:n})]})]})});yo.displayName="ToolbarButton";const Nn={media:"1",audio:"2",text:"3",stickers:"4",effects:"5",transition:"6",filters:"7"},On=({activeToolbar:t,onToolbarChange:o})=>{const i=ka(),n=a.useCallback(s=>{const l=rt.findIndex(c=>c.id===t);if(s.key==="ArrowRight"){s.preventDefault();const c=(l+1)%rt.length;o(rt[c].id)}else if(s.key==="ArrowLeft"){s.preventDefault();const c=l===0?rt.length-1:l-1;o(rt[c].id)}else if(s.key>="1"&&s.key<="7"){s.preventDefault();const c=parseInt(s.key)-1;rt[c]&&o(rt[c].id)}},[t,o]);return e.jsxs("nav",{style:{...et.toolbar,...i?{overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Editor tools",onKeyDown:n,children:[e.jsx("style",{children:Ln}),rt.map(s=>e.jsx(yo,{item:s,isActive:t===s.id,onClick:o,shortcut:Nn[s.id],compact:i},s.id))]})},$n=a.memo(On);async function wo(t,o,i=.3,n=null){await Ye(),n&&Qe(n);const s="input_video.mp4",l="input_audio.mp3",c="output_mixed.mp4";try{await Fe(s,t),await Fe(l,o),await qe(["-i",s,"-i",l,"-filter_complex",`[1:a]volume=${i}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k",c]);const m=await Ke(c);return He(m,"video/mp4")}finally{Xe(),await Je([s,l,c])}}async function Fn(t,o,i=null){await Ye(),i&&Qe(i);const n="input_video.mp4",s="input_audio.mp3",l="output_replaced.mp4";try{await Fe(n,t),await Fe(s,o),await qe(["-i",n,"-i",s,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",l]);const c=await Ke(l);return He(c,"video/mp4")}finally{Xe(),await Je([n,s,l])}}async function vo(t,o=1,i=null){await Ye(),i&&Qe(i);const n="input_volume.mp4",s="output_volume.mp4";try{await Fe(n,t),await qe(["-i",n,"-af",`volume=${o}`,"-c:v","copy","-c:a","aac","-b:a","192k",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await Je([n,s])}}async function ko(t,o=null){await Ye(),o&&Qe(o);const i="input_mute.mp4",n="output_mute.mp4";try{await Fe(i,t),await qe(["-i",i,"-c:v","copy","-an",n]);const s=await Ke(n);return He(s,"video/mp4")}finally{Xe(),await Je([i,n])}}async function So(t,o="mp3",i=null){await Ye(),i&&Qe(i);const n="input_extract.mp4",s=`output_extract.${o}`,l={mp3:"audio/mpeg",aac:"audio/aac",wav:"audio/wav"},c={mp3:["-c:a","libmp3lame","-b:a","192k"],aac:["-c:a","aac","-b:a","192k"],wav:["-c:a","pcm_s16le"]};try{await Fe(n,t),await qe(["-i",n,"-vn",...c[o]||c.mp3,s]);const m=await Ke(s);return He(m,l[o]||"audio/mpeg")}finally{Xe(),await Je([n,s])}}async function Bn(t,o=null){await Ye(),o&&Qe(o);const i="input_normalize.mp4",n="output_normalize.mp4";try{await Fe(i,t),await qe(["-i",i,"-af","loudnorm=I=-16:LRA=11:TP=-1.5","-c:v","copy","-c:a","aac","-b:a","192k",n]);const s=await Ke(n);return He(s,"video/mp4")}finally{Xe(),await Je([i,n])}}async function Dn(t,o=0,i=0,n=null,s=null){await Ye(),s&&Qe(s);const l="input_fade.mp4",c="output_fade.mp4";try{await Fe(l,t);const m=[];if(o>0&&m.push(`afade=t=in:st=0:d=${o}`),i>0&&n){const x=n-i;m.push(`afade=t=out:st=${x}:d=${i}`)}const b=m.join(","),p=["-i",l,"-c:v","copy"];b?(p.push("-af",b),p.push("-c:a","aac","-b:a","192k")):p.push("-c:a","copy"),p.push(c),await qe(p);const g=await Ke(c);return He(g,"video/mp4")}finally{Xe(),await Je([l,c])}}const Gr=Object.freeze(Object.defineProperty({__proto__:null,adjustVolume:vo,extractAudio:So,fadeAudio:Dn,mixAudio:wo,muteAudio:ko,normalizeAudio:Bn,replaceAudio:Fn},Symbol.toStringTag,{value:"Module"})),wa={"top-left":{x:"10",y:"10"},"top-center":{x:"(w-text_w)/2",y:"10"},"top-right":{x:"w-text_w-10",y:"10"},"center-left":{x:"10",y:"(h-text_h)/2"},center:{x:"(w-text_w)/2",y:"(h-text_h)/2"},"center-right":{x:"w-text_w-10",y:"(h-text_h)/2"},"bottom-left":{x:"10",y:"h-text_h-10"},"bottom-center":{x:"(w-text_w)/2",y:"h-text_h-10"},"bottom-right":{x:"w-text_w-10",y:"h-text_h-10"}},jo=["fade","fadeblack","fadewhite","dissolve","pixelize","wipeleft","wiperight","wipeup","wipedown","slideleft","slideright","slideup","slidedown"];async function zn(t,o,i={},n=null){await Ye(),n&&Qe(n);const{position:s="bottom-center",fontSize:l=48,fontColor:c="white",backgroundColor:m=null,startTime:b=0,duration:p=0}=i,g="input_text.mp4",x="output_text.mp4";try{await Fe(g,t);const T=typeof s=="string"?wa[s]||wa["bottom-center"]:s;let _=`drawtext=text='${o.replace(/'/g,"'\\''").replace(/:/g,"\\:").replace(/\\/g,"\\\\")}':fontsize=${l}:fontcolor=${c}:x=${T.x}:y=${T.y}`;if(m&&(_+=`:box=1:boxcolor=${m}:boxborderw=5`),b>0||p>0){const z=p>0?`between(t,${b},${b+p})`:`gte(t,${b})`;_+=`:enable='${z}'`}await qe(["-i",g,"-vf",_,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",x]);const y=await Ke(x);return He(y,"video/mp4")}finally{Xe(),await Je([g,x])}}async function Wn(t,o,i="fade",n=1,s=null){await Ye(),s&&Qe(s);const l=jo.includes(i)?i:"fade",c="input_trans_1.mp4",m="input_trans_2.mp4",b="output_transition.mp4";try{await Fe(c,t),await Fe(m,o);const p=await Vn(t),g=Math.max(0,p-n);await qe(["-i",c,"-i",m,"-filter_complex",`[0:v][1:v]xfade=transition=${l}:duration=${n}:offset=${g}[v];[0:a][1:a]acrossfade=d=${n}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",b]);const x=await Ke(b);return He(x,"video/mp4")}finally{Xe(),await Je([c,m,b])}}async function Vn(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="metadata",n.onloadedmetadata=()=>{URL.revokeObjectURL(n.src),o(n.duration)},n.onerror=()=>{URL.revokeObjectURL(n.src),i(new Error("Failed to load video"))},n.src=URL.createObjectURL(t)})}async function it(t,o,i=null){if(typeof o!="string"||!/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(o))throw new Error("Invalid FFmpeg filter string");await Ye(),i&&Qe(i);const n="input_filter.mp4",s="output_filter.mp4";try{await Fe(n,t),await qe(["-i",n,"-vf",o,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",s]);const l=await Ke(s);return He(l,"video/mp4")}finally{Xe(),await Je([n,s])}}async function Kn(t,o=0,i=0,n=null){const s=`eq=brightness=${o}:contrast=${1+i}`;return it(t,s,n)}async function Hn(t,o=1,i=null){const n=`eq=saturation=${o}`;return it(t,n,i)}async function Yn(t,o=5,i=null){const n=`boxblur=${o}:${o}`;return it(t,n,i)}async function Xn(t,o=1,i=null){const n=`unsharp=5:5:${o}:5:5:0`;return it(t,n,i)}async function Gn(t,o=1,i=null){await Ye(),i&&Qe(i);const n="input_speed.mp4",s="output_speed.mp4",l=Math.max(.25,Math.min(4,o));try{await Fe(n,t);const c=`setpts=${1/l}*PTS`;let m="";if(l<=2&&l>=.5)m=`atempo=${l}`;else if(l>2){const p=Math.ceil(Math.log(l)/Math.log(2)),g=Math.pow(l,1/p);m=Array(p).fill(`atempo=${g}`).join(",")}else{const p=Math.ceil(Math.log(1/l)/Math.log(2)),g=Math.pow(l,1/p);m=Array(p).fill(`atempo=${g}`).join(",")}await qe(["-i",n,"-filter_complex",`[0:v]${c}[v];[0:a]${m}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",s]);const b=await Ke(s);return He(b,"video/mp4")}finally{Xe(),await Je([n,s])}}async function qn(t,o=0,i=0,n=null,s=null){await Ye(),s&&Qe(s);const l="input_fade.mp4",c="output_fade.mp4";try{await Fe(l,t);const m=[];if(o>0&&m.push(`fade=t=in:st=0:d=${o}`),i>0&&n){const p=n-i;m.push(`fade=t=out:st=${p}:d=${i}`)}if(m.length===0){const p=await Ke(l);return He(p,"video/mp4")}await qe(["-i",l,"-vf",m.join(","),"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",c]);const b=await Ke(c);return He(b,"video/mp4")}finally{Xe(),await Je([l,c])}}async function Jn(t,o=90,i=null){const n={90:"transpose=1",180:"transpose=1,transpose=1",270:"transpose=2","-90":"transpose=2"},s=n[o]||n[90];return it(t,s,i)}async function Qn(t,o="horizontal",i=null){return it(t,o==="vertical"?"vflip":"hflip",i)}async function Zn(t,o,i=null){const{width:n,height:s,x:l=0,y:c=0}=o,m=`crop=${n}:${s}:${l}:${c}`;return it(t,m,i)}const fa=15,er=85;function tr(){const[t,o]=a.useState(!1),[i,n]=a.useState(pa()),[s,l]=a.useState(0),[c,m]=a.useState(0),[b,p]=a.useState(null),[g,x]=a.useState(null),T=a.useRef(!0);a.useEffect(()=>{T.current=!0;const w=nn(R=>{T.current&&(m(R.loadProgress),R.error&&p(R.error))});return()=>{T.current=!1,Xe(),w()}},[]);const W=a.useCallback(async()=>{if(pa())return n(!0),!0;o(!0),p(null);try{return await Ye(),T.current&&(n(!0),o(!1)),!0}catch(w){return T.current&&(p(ea(w,"ffmpeg")),o(!1)),!1}},[]),_=a.useCallback(({progress:w})=>{T.current&&l(w)},[]),y=a.useCallback(async(w,R)=>{if(!pa()&&!await W())throw new Error("FFmpeg not loaded");x(w),l(0),p(null);const I=({progress:V=0,time:be=0})=>{const ke=fa+Math.round(V/100*er),Ge=Math.max(fa,Math.min(99,ke));_({progress:Ge,time:be})};try{_({progress:fa});const V=await R(I);return T.current&&(l(100),x(null),setTimeout(()=>{T.current&&l(0)},350)),V}catch(V){if(T.current){const ke=V?.name==="AbortError"||/abort|cancel/i.test(V?.message||"");p(ke?"Operation cancelled":ea(V,"ffmpeg")),l(0),x(null)}const be=(V?.message||"").toLowerCase();if(be.includes("wasm")||be.includes("memory")||be.includes("abort")||be.includes("sharedarraybuffer"))try{await rn(),T.current&&n(!1)}catch{}throw V}},[W,_]),z=a.useCallback(async(w,R,I)=>y("trim video",V=>sn(w,R,I,V)),[y]),G=a.useCallback(async(w,R)=>y("split video",I=>ln(w,R,I)),[y]),se=a.useCallback(async w=>y("merge clips",R=>cn(w,R)),[y]),Q=a.useCallback(async(w,R)=>y("export video",I=>dn(w,R,I)),[y]),J=a.useCallback(async(w,R)=>{const I=ta[R];return y(`export for ${I?.label||R}`,V=>un(w,R,V))},[y]),v=a.useCallback(async w=>pn(w),[]),Y=a.useCallback(async(w,R=0)=>mn(w,R),[]),le=a.useCallback(async w=>y("convert to web format",R=>fn(w,"mp4",R)),[y]),O=a.useCallback(async(w,R,I=.3)=>y("mix audio",V=>wo(w,R,I,V)),[y]),B=a.useCallback(async(w,R)=>y("adjust volume",I=>vo(w,R,I)),[y]),fe=a.useCallback(async w=>y("mute audio",R=>ko(w,R)),[y]),H=a.useCallback(async(w,R="mp3")=>y("extract audio",I=>So(w,R,I)),[y]),de=a.useCallback(async(w,R,I={})=>y("add text",V=>zn(w,R,I,V)),[y]),E=a.useCallback(async(w,R,I="fade",V=1)=>y("add transition",be=>Wn(w,R,I,V,be)),[y]),X=a.useCallback(async(w,R)=>y("change speed",I=>Gn(w,R,I)),[y]),Re=a.useCallback(async(w,R,I,V)=>y("add fade",be=>qn(w,R,I,V,be)),[y]),ve=a.useCallback(async(w,R)=>y("rotate video",I=>Jn(w,R,I)),[y]),Pe=a.useCallback(async(w,R)=>y("flip video",I=>Qn(w,R,I)),[y]),oe=a.useCallback(async(w,R)=>y("crop video",I=>Zn(w,R,I)),[y]),Ue=a.useCallback(async(w,R,I)=>y("adjust colors",V=>Kn(w,R,I,V)),[y]),Ne=a.useCallback(async(w,R)=>y("adjust saturation",I=>Hn(w,R,I)),[y]),ge=a.useCallback(async(w,R)=>y("apply filter",I=>it(w,R,I)),[y]),q=a.useCallback(async(w,R)=>y("apply blur",I=>Yn(w,R,I)),[y]),Se=a.useCallback(async(w,R)=>y("apply sharpen",I=>Xn(w,R,I)),[y]),ue=a.useCallback(()=>{p(null)},[]),C=a.useCallback(()=>{l(0),x(null)},[]),pe=a.useCallback(async()=>{await hn()},[]),te=a.useCallback(()=>{wn(),T.current&&(x(null),l(0),p("Operation cancelled"))},[]),$=a.useCallback(async()=>{await bn()},[]),me=a.useCallback(()=>{const w=yn(),R=xn();return{usage:w,usageFormatted:gn(w),limitExceeded:R}},[]);return{isLoading:t,isReady:i,progress:s,loadProgress:c,error:b,currentOperation:g,initialize:W,preload:pe,clearError:ue,resetProgress:C,cancelOperation:te,clearMemory:$,getMemoryInfo:me,trimVideo:z,splitVideo:G,mergeClips:se,exportVideo:Q,exportWithPreset:J,getVideoInfo:v,generateThumbnail:Y,convertToWebFormat:le,mixAudio:O,adjustVolume:B,muteAudio:fe,extractAudio:H,addTextOverlay:de,addTransition:E,changeSpeed:X,addFade:Re,rotateVideo:ve,flipVideo:Pe,cropVideo:oe,adjustBrightnessContrast:Ue,adjustSaturation:Ne,applyFilter:ge,applyBlur:q,applySharpen:Se,resolutions:ho,exportPresets:ta,textPositions:wa,transitionTypes:jo}}const ar="clipcut-thumbnails",or=1,jt="thumbnails";let Gt=null;function To(){return Gt||(Gt=new Promise((t,o)=>{const i=indexedDB.open(ar,or);i.onerror=()=>{console.warn("[ThumbnailCache] Failed to open database"),o(i.error)},i.onsuccess=()=>{t(i.result)},i.onupgradeneeded=n=>{const s=n.target.result;if(!s.objectStoreNames.contains(jt)){const l=s.createObjectStore(jt,{keyPath:"id"});l.createIndex("videoId","videoId",{unique:!1}),l.createIndex("timestamp","timestamp",{unique:!1})}}}),Gt)}function Co(t,o){return`${t}_t${Math.floor(o*10)}`}async function nr(t,o){try{const i=await To(),n=Co(t,o);return new Promise(s=>{const m=i.transaction(jt,"readonly").objectStore(jt).get(n);m.onsuccess=()=>{const b=m.result;b&&b.data?s(new Blob([b.data],{type:"image/jpeg"})):s(null)},m.onerror=()=>s(null)})}catch(i){return console.warn("[ThumbnailCache] Error getting cached thumbnail:",i),null}}async function rr(t,o,i){try{const n=await To(),s=Co(t,o),l=await i.arrayBuffer();return new Promise(c=>{const m=n.transaction(jt,"readwrite");m.objectStore(jt).put({id:s,videoId:t,time:o,data:l,timestamp:Date.now()}),m.oncomplete=()=>c(!0),m.onerror=()=>c(!1)})}catch(n){console.warn("[ThumbnailCache] Error caching thumbnail:",n)}}function qt(t){return new Promise((o,i)=>{const n=URL.createObjectURL(t);if(t.type?.startsWith("audio/")){const m=new Audio;m.preload="metadata",m.onloadedmetadata=()=>{URL.revokeObjectURL(n),o({duration:m.duration||0,width:0,height:0})},m.onerror=()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},m.src=n;return}const l=document.createElement("video");l.preload="metadata",l.muted=!0;const c=setTimeout(()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},5e3);l.onloadedmetadata=()=>{clearTimeout(c),URL.revokeObjectURL(n),o({duration:isFinite(l.duration)?l.duration:0,width:l.videoWidth||0,height:l.videoHeight||0})},l.onerror=()=>{clearTimeout(c),URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},l.src=n})}function At(t,o=0){return new Promise((i,n)=>{const s=URL.createObjectURL(t),l=document.createElement("video");l.preload="auto",l.muted=!0;const c=setTimeout(()=>{m(),i(Jt())},8e3);function m(){clearTimeout(c),URL.revokeObjectURL(s)}l.onloadeddata=()=>{const b=Math.min(o,l.duration-.1);l.currentTime=Math.max(0,b)},l.onseeked=()=>{try{const b=document.createElement("canvas"),g=Math.min(1,320/(l.videoWidth||320));b.width=Math.round((l.videoWidth||320)*g),b.height=Math.round((l.videoHeight||180)*g),b.getContext("2d").drawImage(l,0,0,b.width,b.height),b.toBlob(T=>{m(),i(T||Jt())},"image/jpeg",.7)}catch{m(),i(Jt())}},l.onerror=()=>{m(),i(Jt())},l.src=s})}function Jt(){const t=document.createElement("canvas");t.width=160,t.height=90;const o=t.getContext("2d"),i=o.createLinearGradient(0,0,160,90);return i.addColorStop(0,"#1a2332"),i.addColorStop(1,"#0a0a0a"),o.fillStyle=i,o.fillRect(0,0,160,90),o.fillStyle="rgba(117, 170, 219, 0.3)",o.beginPath(),o.moveTo(65,30),o.lineTo(65,60),o.lineTo(100,45),o.closePath(),o.fill(),new Promise(n=>{t.toBlob(s=>n(s||new Blob),"image/jpeg",.7)})}const Ka={"480p":{width:854,height:480},"720p":{width:1280,height:720},"1080p":{width:1920,height:1080}},Ha={"480p":{28:1e6,23:2e6,18:4e6,15:6e6},"720p":{28:25e5,23:5e6,18:8e6,15:12e6},"1080p":{28:4e6,23:8e6,18:16e6,15:24e6}};function ir(t,o){const i=Ha[t]||Ha["1080p"];return i[o]||i[18]}const Ya={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}};function Xa(t,o,i,n){const s=o.text||"";if(!s.trim())return;const l=Math.max(12,Math.round((o.textSize||48)*(n/1080))),c=o.textBold?"bold":"normal",m=o.textItalic?"italic":"normal",b=o.textFontFamily||"Spline Sans";t.font=`${m} ${c} ${l}px '${b}', Arial, sans-serif`;let p,g,x,T;if(o.textX!=null&&o.textY!=null)p=o.textX/100*i,g=o.textY/100*n,x="center",T="middle";else{const W=Ya[o.textPosition||"center"]||Ya.center;p=W.x*i,g=W.y*n,x=W.align,T=W.baseline}if(t.textAlign=x,t.textBaseline=T,o.textBgColor&&o.textBgColor!=="transparent"){const W=t.measureText(s),_=l*.25,y=W.width,z=l*1.2;let G=p-_;x==="center"?G=p-y/2-_:x==="right"&&(G=p-y-_);let se=g-_;T==="middle"?se=g-z/2-_:T==="bottom"&&(se=g-z-_),t.fillStyle=o.textBgColor,t.fillRect(G,se,y+_*2,z+_*2)}if(t.shadowColor="rgba(0,0,0,0.7)",t.shadowBlur=4,t.shadowOffsetX=0,t.shadowOffsetY=1,t.fillStyle=o.textColor||"#ffffff",t.fillText(s,p,g),o.textUnderline){const W=t.measureText(s);let _=p;x==="center"?_=p-W.width/2:x==="right"&&(_=p-W.width);const y=T==="top"?g+l:T==="middle"?g+l/2:g;t.strokeStyle=o.textColor||"#ffffff",t.lineWidth=Math.max(1,l/20),t.beginPath(),t.moveTo(_,y+2),t.lineTo(_+W.width,y+2),t.stroke()}t.shadowColor="transparent",t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0}function sr(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="auto",n.playsInline=!0,n.muted=!1,n.style.position="fixed",n.style.top="-9999px",n.style.left="-9999px",n.style.width="1px",n.style.height="1px",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s;const l=()=>{n.removeEventListener("error",c)},c=()=>{l(),i(new Error(`Failed to load video: ${n.error?.message||"unknown error"}`))};n.addEventListener("error",c),n.addEventListener("loadeddata",()=>{l(),o({video:n,url:s})},{once:!0}),n.load()})}function lr(t){return new Promise((o,i)=>{const n=document.createElement("audio");n.preload="auto",n.style.display="none",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s,n.addEventListener("error",()=>{i(new Error("Failed to load audio"))}),n.addEventListener("canplaythrough",()=>{o({audio:n,url:s})},{once:!0}),n.load()})}function cr(){const t=["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];for(const o of t)if(MediaRecorder.isTypeSupported(o))return o;return""}function dr(t){const o=[];return t.brightness!=null&&t.brightness!==0&&o.push(`brightness(${1+t.brightness/100})`),t.contrast!=null&&t.contrast!==0&&o.push(`contrast(${1+t.contrast/100})`),t.saturation!=null&&t.saturation!==0&&o.push(`saturate(${1+t.saturation/100})`),t.blur!=null&&t.blur>0&&o.push(`blur(${t.blur}px)`),o.length>0?o.join(" "):"none"}function ha(t){const o=Math.floor(t/60),i=Math.floor(t%60);return`${o}:${i.toString().padStart(2,"0")}`}async function ur({clips:t,bgMusic:o=null,totalDuration:i,resolution:n="1080p",settings:s={},onProgress:l,abortSignal:c}){const{quality:m=18,fps:b=30}=s,p=Ka[n]||Ka["1080p"],{width:g,height:x}=p,T=ir(n,m),W=cr();if(!W)throw new Error("Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.");const _=t.filter(E=>E.type!=="audio"&&E.type!=="text"&&E.type!=="sticker"&&E.file).sort((E,X)=>E.startTime-X.startTime),y=t.filter(E=>E.type==="text"||E.type==="sticker"||E.text?.trim());if(_.length===0)throw new Error("No video clips to export.");const z=document.createElement("canvas");z.width=g,z.height=x;const G=z.getContext("2d"),se=new AudioContext,Q=se.createMediaStreamDestination();let J=null,v=null,Y=null;if(o?.file)try{const E=await lr(o.file);J=E.audio,v=E.url,J.loop=!0;const X=se.createMediaElementSource(J);Y=se.createGain(),Y.gain.value=o.volume??.3,X.connect(Y),Y.connect(Q)}catch(E){console.warn("Could not load background music, continuing without it:",E),J=null}const le=z.captureStream(b),O=Q.stream.getAudioTracks();for(const E of O)le.addTrack(E);const B=[],fe=new MediaRecorder(le,{mimeType:W,videoBitsPerSecond:T,audioBitsPerSecond:128e3});fe.ondataavailable=E=>{E.data.size>0&&B.push(E.data)},fe.start(1e3),J&&(J.currentTime=0,J.play().catch(()=>{}));const H=Date.now();for(let E=0;E<_.length&&!c?.aborted;E++){const X=_[E],Re=X.trimStart||0,ve=X.duration||0,Pe=X.speed||1,{video:oe,url:Ue}=await sr(X.file);let Ne=null;try{Ne=se.createMediaElementSource(oe);const q=se.createGain();q.gain.value=X.isMuted?0:X.volume??1,Ne.connect(q),q.connect(Q)}catch(q){console.warn("Could not route clip audio:",q)}oe.currentTime=Re,oe.playbackRate=Pe;const ge=dr(X);await new Promise(q=>{oe.addEventListener("seeked",q,{once:!0})}),await oe.play(),await new Promise((q,Se)=>{let ue;const C=Re+ve,pe=X.fadeIn||0,te=X.fadeOut||0,$=()=>{if(c?.aborted){cancelAnimationFrame(ue),oe.pause(),q();return}const me=oe.currentTime,w=me-Re;if(ve>0&&me>=C-.05){oe.pause(),Ga(G,oe,g,x,ge,X,w,ve,pe,te,y,X.startTime+w,i),q();return}Ga(G,oe,g,x,ge,X,w,ve,pe,te,y,X.startTime+w,i);const R=X.startTime+w,I=i>0?Math.min(99,R/i*100):0,V=(Date.now()-H)/1e3,be=I>1?V/I*(100-I):0;l?.({percent:Math.round(I),elapsed:ha(V),eta:ha(be),label:_.length>1?`Exporting clip ${E+1}/${_.length}`:"Exporting video..."}),ue=requestAnimationFrame($)};oe.addEventListener("ended",()=>{cancelAnimationFrame(ue),oe.pause(),q()},{once:!0}),oe.addEventListener("error",()=>{cancelAnimationFrame(ue),Se(new Error(`Video playback error during export of clip ${E+1}`))},{once:!0}),ue=requestAnimationFrame($)}),oe.pause(),oe.src="",oe.load(),document.body.removeChild(oe),URL.revokeObjectURL(Ue),X.startTime+ve}J&&(J.pause(),J.src="",document.body.removeChild(J),v&&URL.revokeObjectURL(v));const de=await new Promise(E=>{fe.onstop=()=>{const X=new Blob(B,{type:W});E(X)},fe.stop()});if(le.getTracks().forEach(E=>E.stop()),Q.stream.getTracks().forEach(E=>E.stop()),await se.close().catch(()=>{}),l?.({percent:100,elapsed:ha((Date.now()-H)/1e3),eta:"0:00",label:"Complete"}),c?.aborted)throw new Error("Export cancelled.");return{blob:de,duration:i,size:de.size}}function Ga(t,o,i,n,s,l,c,m,b,p,g,x,T){t.save();let W=1;b>0&&c<b&&(W=c/b),p>0&&m>0&&m-c<p&&(W=Math.min(W,(m-c)/p)),t.globalAlpha=Math.max(0,Math.min(1,W)),s&&s!=="none"&&(t.filter=s),l.rotation&&(t.translate(i/2,n/2),t.rotate(l.rotation*Math.PI/180),t.translate(-i/2,-n/2));const _=o.videoWidth||i,y=o.videoHeight||n,z=Math.min(i/_,n/y),G=_*z,se=y*z,Q=(i-G)/2,J=(n-se)/2;t.fillStyle="#000000",t.fillRect(0,0,i,n),t.drawImage(o,Q,J,G,se),t.filter="none",t.globalAlpha=1;for(const v of g){const Y=v.startTime||0,le=Y+(v.duration||T);x>=Y&&x<=le&&Xa(t,v,i,n)}l.text?.trim()&&l.type!=="text"&&Xa(t,l,i,n),t.restore()}const pr="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease",mr=80,fr=[.7,.95],hr=[.4,.7,.9],br=a.memo(function({isOpen:o,onClose:i,title:n,zIndex:s=2900,children:l}){const c=a.useRef(null),m=a.useRef({startY:0,isDragging:!1,startSnap:0}),[b,p]=a.useState(0),[g,x]=a.useState(!1),[T,W]=a.useState(!1),[_,y]=a.useState(0);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const H=window.matchMedia("(orientation: landscape) and (max-width: 900px)"),de=()=>W(H.matches);return de(),H.addEventListener?H.addEventListener("change",de):H.addListener(de),()=>{H.removeEventListener?H.removeEventListener("change",de):H.removeListener(de)}},[]);const z=T?hr:fr,G=z[Math.min(_,z.length-1)]??z[0];a.useEffect(()=>{o&&y(0),p(0)},[o,T]),a.useEffect(()=>{if(o){const H=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=H}}},[o]);const se=a.useCallback(H=>{m.current.startY=H.touches[0].clientY,m.current.isDragging=!0,m.current.startSnap=_,x(!0)},[_]),Q=a.useCallback(H=>{if(!m.current.isDragging)return;const de=H.touches[0].clientY-m.current.startY;p(de)},[]),J=a.useCallback(()=>{if(!m.current.isDragging)return;m.current.isDragging=!1,x(!1);const H=b,de=window.innerHeight||800;if(H>mr&&m.current.startSnap===0){p(0),i();return}if(z.length>1){const E=H<0?-1:H>0?1:0,X=de*.08,Re=Math.round(Math.abs(H)/X);if(Re>0){let ve=m.current.startSnap-E*Re;ve=Math.max(0,Math.min(z.length-1,ve)),y(ve)}}p(0)},[b,i,z]),v={position:"fixed",inset:0,bottom:"56px",background:"rgba(0,0,0,0.4)",zIndex:s-100,opacity:o?1:0,pointerEvents:o?"auto":"none",transition:"opacity 0.3s ease"},Y={position:"fixed",bottom:"56px",left:0,right:0,height:`${Math.round(G*100)}vh`,zIndex:s,background:"#0e1218",borderTop:"2px solid rgba(117, 170, 219, 0.15)",borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",transform:o?`translateY(${Math.max(0,b)}px)`:"translateY(100%)",transition:g?"none":pr},le={flexShrink:0,cursor:"grab",touchAction:"none"},O={width:"36px",height:"4px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"8px auto 6px"},B={fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"center",padding:"0 16px 8px",textTransform:"uppercase",letterSpacing:"0.5px"},fe={flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:v,onClick:i}),e.jsxs("div",{ref:c,style:Y,"aria-hidden":!o,children:[e.jsxs("div",{style:le,onTouchStart:se,onTouchMove:Q,onTouchEnd:J,children:[e.jsx("div",{style:O}),n&&e.jsx("div",{style:B,children:n})]}),e.jsx("div",{style:fe,children:l})]})]})}),qr=.1,Io=8,Jr=3,Qr=t=>5*Math.pow(250/5,t/100),Zr=(t,o)=>t*o,ei=(t,o)=>t/o,ti=(t,o,i)=>{const n=new Set([0,i]);for(const s of t)s.id!==o&&(n.add(s.startTime),n.add(s.startTime+s.duration));return[...n].sort((s,l)=>s-l)},qa=(t,o,i,n=Io)=>{const s=n/i;let l=t,c=null,m=s;for(const b of o){const p=Math.abs(t-b);p<m&&(m=p,l=b,c=b)}return{time:l,snappedTo:c}},ai=(t,o,i,n,s=Io)=>{const l=qa(t,i,n,s),c=qa(t+o,i,n,s),m=l.snappedTo!==null?Math.abs(t-l.time):1/0,b=c.snappedTo!==null?Math.abs(t+o-c.time):1/0;return m<=b&&l.snappedTo!==null?{startTime:l.time,snappedTo:l.snappedTo}:c.snappedTo!==null?{startTime:c.time-o,snappedTo:c.snappedTo}:{startTime:t,snappedTo:null}},gr=t=>{const i=80/t,n=[.1,.25,.5,1,2,5,10,15,30,60,120,300];for(const s of n)if(s>=i*.6)return s;return 300},oi=(t,o)=>{const i=gr(o),n=i<=1?4:i<=5?5:4,s=i/n,l=[],c=t+i;for(let m=0;m<=c;m+=s){const b=m%i;if(b<.001||Math.abs(b-i)<.001){const g=Math.floor(m/60),x=m%60,T=x===Math.floor(x)?Math.floor(x).toString().padStart(2,"0"):x.toFixed(1).padStart(4,"0");l.push({time:m,label:`${g}:${T}`,major:!0})}else l.push({time:m,label:"",major:!1})}return l},Ja=t=>{t<0&&(t=0);const o=Math.floor(t/60),i=t%60;return`${o}:${i.toFixed(1).padStart(4,"0")}`},ni=t=>{if(t<60)return`${t.toFixed(1)}s`;const o=Math.floor(t/60),i=(t%60).toFixed(0);return`${o}:${i.padStart(2,"0")}`},xr=t=>t?.type!=="audio"&&t?.type!=="text",Ro=t=>xr(t)&&!t?.blobUrl&&!!t?._mediaError,yr=t=>t?.type!=="audio"&&!t?.blobUrl&&!!t?._mediaError;function wr({restoredClips:t=[],mediaItems:o=[],projectName:i="Untitled Project"}){const n=t.filter(Ro).length,s=o.filter(yr).length,l=n>0||s>0;return{clips:t,mediaItems:o,unresolvedClipCount:n,unresolvedMediaCount:s,hasUnavailableMedia:l,notification:l?{level:"warning",message:`Loaded "${i}" — ${n} clip(s) need media re-import`}:{level:"success",message:`Loaded "${i}" (${t.length} clips)`}}}function ri({videoSrc:t=null,hasTimelineClips:o=!1,hasUnavailableMediaClips:i=!1,isRestoringMedia:n=!1}){return n?{title:"Restoring media...",description:"Loading media files from storage",showImportHint:!1}:t?{title:null,description:null,showImportHint:!1}:i?{title:"Media missing",description:"This project still has clips, but one or more source files need to be re-imported.",showImportHint:!0}:o?{title:"No clip at playhead",description:"Move the playhead over a clip on the timeline to preview",showImportHint:!1}:{title:"No media loaded",description:"Import media and add clips to the timeline to preview",showImportHint:!0}}function vr(t=[]){return t.some(Ro)}function kr({projectId:t,isRestored:o,hasBeenNonEmpty:i,clipsCount:n,mediaItemsCount:s}){return t?o?(n||0)===0&&(s||0)===0&&!i?{skip:!0,reason:"empty-without-session-edit"}:{skip:!1,reason:null}:{skip:!0,reason:"restore-in-progress"}:{skip:!1,reason:null}}const Qa=a.lazy(()=>ze(()=>import("./CP9tR0t4.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),Sr=a.lazy(()=>ze(()=>import("./J0YttQSL.js"),__vite__mapDeps([8,1,5,2,3,4,6,7]))),Za=a.lazy(()=>ze(()=>import("./LYms3NbU.js"),__vite__mapDeps([9,1,10,5,2,3,4,6,7]))),eo=a.lazy(()=>ze(()=>import("./YmkVhmWw.js"),__vite__mapDeps([11,1,5,2,3,4,6,7]))),to=a.lazy(()=>ze(()=>import("./DvZfuG1Q.js"),__vite__mapDeps([12,1,10,2,3,4,5,6,7]))),ao=a.lazy(()=>ze(()=>import("./DTPUJV_G.js"),__vite__mapDeps([13,1,10,2,3,4,5,6,7]))),oo=a.lazy(()=>ze(()=>import("./CmBt0L7P.js"),__vite__mapDeps([14,1,2,3,4,5,6,7]))),no=a.lazy(()=>ze(()=>import("./DFgbO_Yr.js"),__vite__mapDeps([15,1,2,3,4,5,6,7]))),ro=a.lazy(()=>ze(()=>import("./i6qUu1Ed.js"),__vite__mapDeps([16,1,10,2,3,4,5,6,7]))),io=a.lazy(()=>ze(()=>import("./DZS93GkI.js"),__vite__mapDeps([17,1,5,2,3,4,6,18,7]))),so=a.lazy(()=>ze(()=>import("./BxKHFN2a.js"),__vite__mapDeps([19,1,2,3,4,5,6,7]))),jr=`
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
  ${jn}
  ${kn}
`;function ba(t,o,i,n=!1){const s=a.useRef(!1),l=a.useRef(0),c=a.useRef(0);return a.useCallback((b,p)=>{b.preventDefault(),s.current=!0,l.current=t==="y"?b.clientY:b.clientX,c.current=p;const g=b.currentTarget;g.classList.add("dragging");const x=W=>{if(!s.current)return;const _=t==="y"?l.current-W.clientY:W.clientX-l.current,y=n?-_:_;o(c.current+y)},T=()=>{s.current=!1,g.classList.remove("dragging"),document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",T),document.body.style.cursor="",document.body.style.userSelect=""};document.addEventListener("mousemove",x),document.addEventListener("mouseup",T),document.body.style.cursor=t==="y"?"row-resize":"col-resize",document.body.style.userSelect="none"},[t,o,i,n])}const Tr=280,lo=280,co=320,uo=360;function ga(t){return Math.max(200,Math.min(400,Math.floor(t*.25)))}function xa(t){return Math.max(220,Math.min(400,Math.floor(t*.25)))}const po={width:"100%",minWidth:0,minHeight:0,alignSelf:"stretch"},St=a.memo(({width:t,height:o="100%"})=>e.jsx("div",{style:{width:t,height:o,background:"linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderRight:"1px solid rgba(117,170,219,0.06)"},children:e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}})}));St.displayName="PanelLoadingFallback";const va=a.memo(()=>e.jsx("div",{style:{height:"220px",background:"linear-gradient(180deg, #0c1018 0%, #08090c 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderTop:"2px solid rgba(117,170,219,0.08)"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("span",{style:{color:"#3d4a5c",fontSize:"11px",fontWeight:500},children:"Loading timeline..."})]})}));va.displayName="TimelineLoadingFallback";const ya=[{target:"media-panel",title:"Media Library",desc:"Import videos and audio files here. Drag them to the timeline to start editing.",position:"right"},{target:"player",title:"Preview",desc:"Watch your edit in real-time. Effects and text overlays preview live without rendering.",position:"bottom"},{target:"inspector",title:"Inspector",desc:"Adjust clip properties — filters, speed, volume, text overlays, and transforms.",position:"left"},{target:"timeline",title:"Timeline",desc:"Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.",position:"top"}],Mo=a.memo(({onComplete:t})=>{const[o,i]=a.useState(0),n=ya[o],s=o===ya.length-1;return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9e3,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:l=>{l.target===l.currentTarget&&t()},children:e.jsxs("div",{style:{background:"#1a2332",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"90%",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 16px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(117,170,219,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#75aadb"},children:o+1}),e.jsx("span",{style:{fontSize:"15px",fontWeight:600,color:"#f1f5f9"},children:n.title})]}),e.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",lineHeight:1.6,margin:"0 0 16px"},children:n.desc}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"4px"},children:ya.map((l,c)=>e.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:c===o?"#75aadb":"rgba(255,255,255,0.1)"}},c))}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:t,style:{padding:"8px 16px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",background:"transparent",color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:"Skip"}),e.jsx("button",{onClick:()=>s?t():i(l=>l+1),style:{padding:"8px 20px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #75aadb, #5a8cbf)",color:"#0a0a0a",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:s?"Get Started":"Next"})]})]})]})})});Mo.displayName="WalkthroughOverlay";const Cr=(t,o)=>{switch(o.type){case"SET_CLIPS":return{...t,clips:o.clips,past:[...t.past.slice(-49),t.clips],future:[]};case"UNDO":return t.past.length===0?t:{clips:t.past[t.past.length-1],past:t.past.slice(0,-1),future:[t.clips,...t.future]};case"REDO":return t.future.length===0?t:{clips:t.future[0],past:[...t.past,t.clips],future:t.future.slice(1)};case"RESET":return{clips:[],past:[],future:[]};default:return t}};let Ir=0;const Qt=()=>`clip-${Date.now()}-${(++Ir).toString(36)}`,Eo=a.memo(({message:t,progress:o,subMessage:i,operationLabel:n,onCancel:s})=>e.jsx("div",{className:"loading-overlay",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2e3,backdropFilter:"blur(6px)"},role:"dialog","aria-modal":"true","aria-label":"Processing",children:e.jsxs("div",{className:"loading-card",style:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"36px 52px",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",minWidth:"280px"},children:[e.jsxs("div",{style:{width:"56px",height:"56px",margin:"0 auto 20px",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("div",{style:{position:"absolute",inset:"6px",border:"2px solid rgba(117,170,219,0.1)",borderBottomColor:"rgba(117,170,219,0.5)",borderRadius:"50%",animation:"spin 1.2s linear infinite reverse"}})]}),e.jsx("p",{style:{color:"white",fontSize:"15px",margin:"0 0 6px",fontWeight:600},children:t}),n&&e.jsx("p",{style:{color:"rgba(255, 255, 255, 0.65)",fontSize:"12px",margin:"0 0 8px"},children:n}),i&&e.jsx("p",{style:{color:"#64748b",fontSize:"12px",margin:"0 0 16px"},children:i}),o>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"220px",height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden",margin:"16px auto 10px"},children:e.jsx("div",{className:o<100?"shimmer-bar":"",style:{height:"100%",width:`${o}%`,background:o>=100?"linear-gradient(90deg, #22c55e, #16a34a)":"linear-gradient(90deg, #75aadb, #5a8cbf)",transition:"width 0.3s ease",borderRadius:"3px"}})}),e.jsxs("p",{style:{color:"#75aadb",fontSize:"13px",fontWeight:700,margin:"0 0 16px"},children:[Math.round(o),"%"]})]}),s&&e.jsx("button",{onClick:s,style:{marginTop:o>0?"0":"16px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",padding:"8px 24px",color:"#ef4444",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},"aria-label":"Cancel operation",children:"Cancel"})]})}));Eo.displayName="LoadingOverlay";const _o=a.memo(({progress:t})=>t>=100?null:e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"3px",background:"rgba(0,0,0,0.3)",zIndex:100,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.max(t,2)}%`,background:"linear-gradient(90deg, #5a8cbf, #75aadb)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0",boxShadow:"0 0 8px rgba(117,170,219,0.4)"}})}));_o.displayName="FFmpegInitBar";const Po=a.memo(({type:t="error",message:o,onClose:i,autoClose:n=!1})=>{const[s,l]=a.useState(!1);a.useEffect(()=>{if(!n)return;const b=setTimeout(()=>l(!0),Ba),p=setTimeout(i,Ba+Da);return()=>{clearTimeout(b),clearTimeout(p)}},[n,i]);const c=a.useCallback(()=>{l(!0),setTimeout(i,Da)},[i]),m={error:{bg:"linear-gradient(135deg, #ef4444, #dc2626)",shadow:"rgba(239,68,68,0.25)",icon:"error"},success:{bg:"linear-gradient(135deg, #22c55e, #16a34a)",shadow:"rgba(34,197,94,0.25)",icon:"check_circle"},warning:{bg:"linear-gradient(135deg, #f59e0b, #d97706)",shadow:"rgba(245,158,11,0.25)",icon:"warning"},info:{bg:"linear-gradient(135deg, #3b82f6, #2563eb)",shadow:"rgba(59,130,246,0.25)",icon:"info"}}[t]||{bg:"#ef4444",shadow:"rgba(0,0,0,0.2)",icon:"error"};return e.jsxs("div",{className:s?"toast-exit":"toast-enter",style:{position:"fixed",bottom:"24px",right:"24px",background:m.bg,color:"white",padding:"12px 18px",borderRadius:"10px",display:"flex",alignItems:"center",gap:"10px",boxShadow:`0 8px 28px ${m.shadow}`,zIndex:3e3,maxWidth:"380px",fontSize:"13px",backdropFilter:"blur(4px)"},role:t==="error"?"alert":"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",opacity:.9},children:m.icon}),e.jsx("span",{style:{flex:1,lineHeight:1.4},children:o}),e.jsx("button",{onClick:c,style:{background:"rgba(255,255,255,0.15)",border:"none",color:"white",cursor:"pointer",padding:"4px",borderRadius:"50%",display:"flex",width:"22px",height:"22px",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0},children:"✕"})]})});Po.displayName="Toast";function Rr(t,o){const i=t.find(s=>s.type==="video");if(!i)return null;if(i.file)return{file:i.file,mediaId:i.mediaId};const n=o.find(s=>s.id===i.mediaId);return n?.file?{file:n.file,mediaId:i.mediaId}:null}function Mr(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}async function Er(t,o,i,n,s,l){const c=new Map;for(const p of i)if(!(!p.file||p.storagePath))try{const g=await fo(t,o,p.file);c.set(p.id,g)}catch(g){console.warn("[autosave] Media upload failed:",p.name,g)}if(c.size===0)return{changed:!1,clips:n,mediaItems:i};const m=i.map(p=>c.has(p.id)?{...p,storagePath:c.get(p.id)}:p),b=n.map(p=>{const g=p.mediaId&&c.get(p.mediaId);return g?{...p,storagePath:g}:p});return s(m),l(b),{changed:!0,clips:b,mediaItems:m}}const _r=(t,o,i,n,s,l,c,m,b,p,g,x,T,W=Jo)=>{const[_,y]=a.useState(null),z=a.useRef(!1),G=a.useRef(t),se=a.useRef(null),Q=a.useRef(null),J=a.useRef(null),v=a.useRef(0),Y=a.useRef(0),le=a.useRef(!1),O=a.useRef(i);O.current=i;const B=a.useRef(n);B.current=n;const fe=a.useRef(o);fe.current=o;const H=a.useRef(l);H.current=l;const de=a.useRef(c);de.current=c;const E=a.useRef(p);E.current=p;const X=a.useRef(x);X.current=x,a.useEffect(()=>{G.current=t},[t]),a.useEffect(()=>{const ve=new Set(["file","blobUrl","thumbnail","isProcessing"]),Pe=ge=>{const q={};for(const[Se,ue]of Object.entries(ge))ve.has(Se)||(q[Se]=ue);return ge.mediaId&&G.current&&(q.idbKey=`idb://${G.current}:${ge.mediaId}`),q.storagePath&&q.storagePath.startsWith("blob:")&&delete q.storagePath,q},oe=ge=>{const q={};for(const[Se,ue]of Object.entries(ge))ve.has(Se)||(q[Se]=ue);return ge.id&&G.current&&(q.idbKey=`idb://${G.current}:${ge.id}`),q.blobUrl&&delete q.blobUrl,q},Ue=async()=>{if(z.current)return{saved:!1,skipReason:"in-progress"};const ge=O.current?.length||0,q=B.current?.length||0;(ge>0||q>0)&&(le.current=!0);const Se=kr({projectId:G.current,isRestored:T?T.current:!0,hasBeenNonEmpty:le.current,clipsCount:ge,mediaItemsCount:q});if(Se.skip)return{saved:!1,skipReason:Se.reason};if(v.current>=3){if(Y.current>0)return Y.current--,{saved:!1,skipReason:"backoff"};Y.current=Math.min(Math.pow(2,v.current-3),20)}z.current=!0;try{const ue=O.current,C=B.current,pe=fe.current,te=E.current,$={id:G.current,name:pe,clips:ue.map(Pe),mediaItems:C.map(oe),duration:H.current,resolution:de.current||"1080p",timelineMarkers:X.current||[]};(te?.storagePath||te?.mediaId)&&($.bgMusic={name:te.name,volume:te.volume??.3},te.storagePath&&($.bgMusic.storagePath=te.storagePath),te.mediaId&&($.bgMusic.mediaId=te.mediaId));const me=Rr(ue,C),w=me?.mediaId||null;if(me&&w!==se.current)try{const I=await At(me.file,1);if(I&&I.size>500){se.current=w,s&&($.thumbnail=I);const V=await new Promise(be=>{const ke=new FileReader;ke.onloadend=()=>be(ke.result),ke.readAsDataURL(I)});$.thumbnailDataUrl=V,Q.current=V}}catch(I){console.warn("Auto-save thumbnail generation failed:",I)}else Q.current&&($.thumbnailDataUrl=Q.current);if(s){const I=await Qo(()=>Xt(s,$),{maxRetries:2,baseDelay:1e3,maxDelay:5e3});T&&(T.current=!0);const V=G.current;let be=!1;if(I?.id&&I.id!==V&&(G.current=I.id,V))try{await on(V,I.id),be=!0,console.log("[autosave] IndexedDB re-key OK:",V,"→",I.id)}catch(Ge){console.warn("[autosave] IndexedDB re-key failed:",Ge)}const ke=G.current;if(ke&&Pt()){const Ge=await Er(s,ke,B.current,O.current,m,b);if(Ge.changed&&(O.current=Ge.clips,B.current=Ge.mediaItems),Ge.changed||be){const tt={id:ke,name:fe.current,clips:(Ge.changed?Ge.clips:O.current).map(Pe),mediaItems:B.current.map(oe),duration:H.current,resolution:de.current||"1080p",timelineMarkers:X.current||[],...Q.current?{thumbnailDataUrl:Q.current}:{}};E.current?.storagePath&&(tt.bgMusic={storagePath:E.current.storagePath,name:E.current.name,volume:E.current.volume??.3}),await Xt(s,tt)}const st=E.current;if(st?.file&&!st?.storagePath&&ke)try{const tt=await fo(s,ke,st.file);g(Be=>Be?{...Be,storagePath:tt}:null),await Xt(s,{id:ke,name:fe.current,clips:O.current.map(Pe),mediaItems:B.current.map(oe),duration:H.current,resolution:de.current||"1080p",timelineMarkers:X.current||[],bgMusic:{storagePath:tt,name:st.name,volume:st.volume??.3},...Q.current?{thumbnailDataUrl:Q.current}:{}})}catch(tt){console.warn("Background music upload failed:",tt)}}}else{const V=Xt(null,$).id;G.current||(G.current=V),T&&(T.current=!0);for(const ke of B.current)ke.file&&Ut(V,ke.id,ke.file,{name:ke.name,type:ke.file.type}).catch(()=>{});const be=E.current;be?.file&&be?.mediaId&&Ut(V,be.mediaId,be.file,{name:be.name,type:be.file.type}).catch(()=>{})}return y(new Date),v.current=0,Y.current=0,{saved:!0}}catch(ue){v.current++,v.current<=1?console.warn("Auto-save failed:",ue?.message||ue):v.current===3&&console.warn(`[autosave] ${v.current} consecutive failures — backing off. Will retry less frequently.`);try{const C=fe.current,pe=G.current,te={id:pe,projectName:C,clips:O.current.map(Pe),mediaItems:B.current.map(oe),savedAt:new Date().toISOString()};if(localStorage.setItem(`clipcut_autosave_${C}`,JSON.stringify(te)),pe)for(const $ of B.current)$.file&&Ut(pe,$.id,$.file,{name:$.name,type:$.file.type}).catch(()=>{})}catch{}return{saved:!1,skipReason:"error",error:ue}}finally{z.current=!1}};J.current=Ue;const Ne=setInterval(Ue,W);return()=>clearInterval(Ne)},[s,W,m,b,g]);const Re=a.useCallback(()=>J.current?J.current():Promise.resolve({saved:!1,skipReason:"not-ready"}),[]);return{lastSaved:_,projectId:G.current,triggerSave:Re}},Pr=60,Ar=(t,o)=>{const[i,n]=a.useState(0),[s,l]=a.useState(!1),c=a.useRef(null),m=a.useRef(1),b=a.useRef(0),p=a.useRef(0),g=a.useRef(t);g.current=t;const x=a.useCallback(v=>{const Y=g.current.filter(O=>O.type!=="audio"&&O.type!=="text").sort((O,B)=>O.startTime-B.startTime);for(const O of Y)if(v>=O.startTime&&v<O.startTime+O.duration)return O;const le=Y[Y.length-1];return le&&Math.abs(v-(le.startTime+le.duration))<.05?le:null},[]),T=a.useMemo(()=>x(i),[x,i]),W=a.useMemo(()=>T?Math.max(0,i-T.startTime)+(T.trimStart||0):0,[T,i]),_=a.useMemo(()=>{if(!T)return null;const v=t.filter(le=>le.type!=="audio").sort((le,O)=>le.startTime-O.startTime),Y=v.findIndex(le=>le.id===T.id);return Y>=0&&Y<v.length-1?v[Y+1]:null},[T,t]),y=a.useCallback(()=>{const v=performance.now();v-p.current>=Pr&&(p.current=v,n(b.current))},[]),z=a.useCallback(v=>{if(v>=o){b.current=o,n(o),l(!1);return}b.current=v,y()},[o,y]);a.useEffect(()=>{if(!s){c.current&&cancelAnimationFrame(c.current),n(b.current);return}const v=()=>{if(b.current>=o){l(!1),n(o);return}c.current=requestAnimationFrame(v)};return c.current=requestAnimationFrame(v),()=>{c.current&&cancelAnimationFrame(c.current)}},[s,o]);const G=a.useCallback(v=>{const Y=Math.max(0,Math.min(o,v));b.current=Y,n(Y)},[o]),se=a.useCallback(()=>l(v=>!v),[]),Q=a.useCallback(()=>{l(!1),b.current=0,n(0)},[]),J=a.useCallback(v=>{m.current=v},[]);return{currentTime:i,currentClip:T,clipOffset:W,nextClip:_,isPlaying:s,seek:G,togglePlay:se,stop:Q,setIsPlaying:l,setSpeed:J,setCurrentTime:n,currentTimeRef:b,speedRef:m,onVideoTime:z}},Ur=()=>{const t=Zo(),o=en(),{user:i}=Go(),[n,s]=a.useState(()=>new URLSearchParams(window.location.search).get("project")||null),[l,c]=a.useState("Untitled Project"),[m,b]=a.useState("1080p"),p=a.useRef(!1),g=a.useRef(!1);a.useEffect(()=>{const r=new URL(window.location);n?r.searchParams.set("project",n):r.searchParams.delete("project"),r.toString()!==window.location.href&&window.history.replaceState(window.history.state,"",r)},[n]);const[x,T]=a.useState("media"),[W,_]=a.useState("video"),[y,z]=a.useState("basic"),[G,se]=a.useState("local"),[Q,J]=a.useState("default"),v=ka(),Y=tn(),[le,O]=a.useState(!1),[B,fe]=a.useState(!1),[H,de]=a.useState([]),[E,X]=a.useState(!1),[Re,ve]=a.useState(!1),[Pe,oe]=a.useState([]),Ue=a.useRef([]),Ne=a.useRef([]),[ge,q]=a.useState(null),[Se,ue]=a.useState(null),[C,pe]=a.useState(null),[te,$]=a.useState(()=>typeof window<"u"?window.innerWidth:1200);a.useEffect(()=>{if(Q==="wide-timeline"){const r=window.innerHeight-296,d=Math.max(320,Math.floor(window.innerHeight*.46));q(Math.max(120,Math.min(d,r)))}else(Q==="default"||Q==="compact")&&q(null)},[Q]);const me=a.useMemo(()=>ga(te),[te]),w=a.useMemo(()=>xa(te),[te]),R=a.useMemo(()=>Math.min(Se??lo,me),[Se,me]),I=a.useMemo(()=>Math.min(C??co,w),[C,w]),V=a.useCallback(r=>{const d=window.innerHeight-296,f=Math.max(120,Math.min(r,d));q(f)},[]),be=a.useCallback(r=>{const d=window.innerWidth,f=ga(d),u=C??co,h=d-uo-u-24;ue(Math.max(200,Math.min(r,f,h)))},[C]),ke=a.useCallback(r=>{const d=window.innerWidth,f=xa(d),u=Se??lo,h=d-uo-u-24;pe(Math.max(220,Math.min(r,f,h)))},[Se]);a.useEffect(()=>{let r;const d=()=>{clearTimeout(r),r=setTimeout(()=>{const f=window.innerWidth;$(f);const u=ga(f),h=xa(f);ue(S=>S!=null?Math.min(S,u):null),pe(S=>S!=null?Math.min(S,h):null)},150)};return window.addEventListener("resize",d),d(),()=>{clearTimeout(r),window.removeEventListener("resize",d)}},[]);const Ge=ba("y",V),st=ba("x",be),tt=ba("x",ke,void 0,!0),[Be,ft]=a.useState(null),[Ao,Uo]=a.useState(0),[Lo,No]=a.useState(()=>!localStorage.getItem("clipcut_onboarded")),[Me,Ae]=a.useState([]),[lt,Lt]=a.useState(null),[Tt,aa]=a.useReducer(Cr,{clips:[],past:[],future:[]}),P=Tt.clips,ht=Tt.past.length>0,bt=Tt.future.length>0,[Ee,Ze]=a.useState(null),[oa,Nt]=a.useState([]);a.useEffect(()=>{v&&Ee&&(ft("inspector"),O(!0))},[v,Ee]);const at=a.useMemo(()=>P.length===0?30:Math.max(30,Math.max(...P.map(r=>r.startTime+r.duration))+10),[P]),N=Ar(P,at),[We,gt]=a.useState(null),[ja,Ta]=a.useState(!1),[xt,Ca]=a.useState(!1),[Ia,na]=a.useState(0),[Ct,Ra]=a.useState([]),It=a.useRef(null),[ra,yt]=a.useState(!1),[wt,xe]=a.useState(""),[Ma,ct]=a.useState(""),ia=a.useRef(new Set),[Ot,Ea]=a.useState(null),D=a.useCallback((r,d)=>Ea({type:r,message:d}),[]),ae=tr(),Oe=a.useMemo(()=>P.find(r=>r.id===Ee),[P,Ee]),Oo=a.useMemo(()=>{if(N.currentClip?.blobUrl)return N.currentClip.blobUrl;if(lt){const d=Me.find(f=>f.id===lt)?.blobUrl;if(d)return d}return P.find(d=>d.type!=="audio"&&d.type!=="text"&&d.blobUrl)?.blobUrl||null},[N.currentClip,lt,Me,P]),$o=a.useMemo(()=>vr(P),[P]),Fo=a.useMemo(()=>{const r=P.filter(u=>u.isCaption),d=P.filter(u=>u.type==="text"&&!u.isCaption),f=P.filter(u=>(u.type==="text"||u.type==="sticker"||u.isCaption)&&u.type!=="audio"&&N.currentTime>=u.startTime&&N.currentTime<u.startTime+u.duration);if(r.length>0&&f.filter(u=>u.isCaption).length===0){const u=r.slice(0,3);console.log("[DEBUG TextOverlays] currentTime:",N.currentTime.toFixed(3),`
  total clips:`,P.length,"| captions:",r.length,"| manual text:",d.length,"| visible now:",f.length,`
  first 3 captions:`,u.map(h=>({id:h.id,type:h.type,isCaption:h.isCaption,text:(h.text||"").slice(0,30),startTime:h.startTime,duration:h.duration,track:h.track,range:`${h.startTime?.toFixed(2)}-${(h.startTime+h.duration).toFixed(2)}`})))}return f},[P,N.currentTime]),Rt=a.useRef(Tt.clips);Rt.current=Tt.clips;const ce=a.useCallback(r=>{const d=Rt.current,f=typeof r=="function"?r(d):r;aa({type:"SET_CLIPS",clips:f})},[]),{lastSaved:Bo,projectId:$t,triggerSave:Ft}=_r(n,l,P,Me,i?.id,at,m,Ae,ce,We,gt,oa,g);a.useEffect(()=>{$t&&$t!==n&&s($t)},[$t,n]);const vt=a.useCallback(()=>aa({type:"UNDO"}),[]),dt=a.useCallback(()=>aa({type:"REDO"}),[]),_e=a.useCallback((r,d)=>ce(f=>f.map(u=>u.id===r?{...u,...d}:u)),[ce]),_a=a.useCallback(r=>ce(d=>d.map(f=>f.isCaption?{...f,...r}:f)),[ce]),Bt=a.useCallback(r=>{ce(d=>d.filter(f=>f.id!==r)),Ee===r&&Ze(null)},[ce,Ee]),Dt=a.useCallback((r,d=null)=>{let f=d;if(f===null){const h=Rt.current.filter(A=>A.type===r.type),S=h.length>0?h.reduce((A,U)=>A.startTime+A.duration>U.startTime+U.duration?A:U):null;f=S?S.startTime+S.duration:0}const u={...ma,id:Qt(),mediaId:r.id,name:r.name,type:r.type,startTime:f,duration:r.duration||qo,file:r.file,blobUrl:r.blobUrl,thumbnail:r.thumbnail};ce(h=>[...h,u]),Ze(u.id),setTimeout(()=>Ft(),100)},[ce,Ft]),zt=a.useCallback(async r=>{Ta(!0);try{let d=n;if(d||(d=`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s(d)),r.length>0&&l==="Untitled Project"){const h=(r.find(S=>S.type.startsWith("video/"))||r[0]).name.replace(/\.[^.]+$/,"").trim();h&&c(h)}let f=0;for(const u of r){xe(`Importing ${u.name}...`),ct(`${++f} of ${r.length}`);const h=Qt(),S=URL.createObjectURL(u);Ut(d,h,u,{name:u.name,type:u.type}).catch(U=>console.warn("[import] IndexedDB store failed:",u.name,U));const A=u.type.startsWith("audio/");Ae(U=>[...U,{id:h,name:u.name,file:u,blobUrl:S,thumbnail:null,duration:0,width:0,height:0,type:A?"audio":"video",isProcessing:!0}]);try{const U=await qt(u);if(Ae(K=>K.map(ne=>ne.id===h?{...ne,duration:U.duration,width:U.width,height:U.height,isProcessing:!1}:ne)),!A)try{const K=`${u.name}_${u.size}_${u.lastModified}`,ne=await nr(K,0),M=ne||await At(u,0);ne||rr(K,0,M).catch(()=>{});const Z=URL.createObjectURL(M);Ae(we=>we.map(De=>De.id===h?{...De,thumbnail:Z}:De))}catch(K){console.warn("Thumbnail generation failed:",K)}}catch(U){if(!A&&/\.(mov|avi|mkv|flv|wmv)$/i.test(u.name))try{xe(`Converting ${u.name} to MP4...`),ae.isReady||await ae.initialize();const ne=await ae.convertFormat(u,"mp4"),M=new File([ne],u.name.replace(/\.\w+$/,".mp4"),{type:"video/mp4"}),Z=URL.createObjectURL(M);URL.revokeObjectURL(S);const we=await qt(M);Ae(j=>j.map(L=>L.id===h?{...L,file:M,blobUrl:Z,duration:we.duration,width:we.width,height:we.height,isProcessing:!1}:L));const De=await At(M,0).catch(()=>null);if(De){const j=URL.createObjectURL(De);Ae(L=>L.map(ee=>ee.id===h?{...ee,thumbnail:j}:ee))}D("info",`Converted ${u.name} to MP4`)}catch(ne){console.error("Auto-convert failed:",ne),Ae(M=>M.map(Z=>Z.id===h?{...Z,isProcessing:!1}:Z))}else console.error("Error processing:",U),Ae(ne=>ne.map(M=>M.id===h?{...M,isProcessing:!1}:M))}}D("success",`Imported ${r.length} file${r.length>1?"s":""}`)}catch(d){D("error",`Import failed: ${d.message}`)}finally{Ta(!1),xe(""),ct("")}},[D,n,l]),sa=a.useRef(null);a.useEffect(()=>{const r=P.find(Z=>Z.type!=="audio"&&Z.type!=="text"&&Z.type!=="sticker"&&!Z.isCaption&&(Z.file||Z.blobUrl||Z.mediaId));if(!r){oe([]),sa.current=null;return}const d=r.mediaId?Me.find(Z=>Z.id===r.mediaId):null,f=r.file||d?.file||null,u=r.blobUrl||d?.blobUrl||null;if(!f&&!u){oe([]);return}const h=r.trimStart||0,S=r.trimEnd||0,A=r.duration||0,U=P.some(Z=>Z.isCaption),K=f?`${f.size}:${f.lastModified}`:String(u||""),ne=`${r.id}|${r.mediaId||""}|${h}|${S}|${A}|${U}|${K}`;if(ne===sa.current)return;sa.current=ne;const M={...r,file:f||void 0,blobUrl:u||void 0};ze(async()=>{const{analyzeVideo:Z}=await import("./DOCI-l41.js");return{analyzeVideo:Z}},__vite__mapDeps([20,21,2,1,3])).then(({analyzeVideo:Z})=>{Z(M,{hasCaptions:U}).then(we=>{oe(we.length>0?we:[])}).catch(()=>{oe([])})})},[P,Me]);const Wt=a.useCallback(r=>{if(!r||!r.type.startsWith("audio/")){D("warning","Please select an audio file");return}We?.blobUrl&&URL.revokeObjectURL(We.blobUrl);const d=URL.createObjectURL(r),f=`bgm-${Date.now()}`;gt({file:r,name:r.name,blobUrl:d,volume:.3,mediaId:f});const u=n||`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Ut(u,f,r,{name:r.name,type:r.type}).catch(h=>console.warn("[bgMusic] IndexedDB store failed:",h)),D("success",`Background music: ${r.name}`)},[We,D,n]),Vt=a.useCallback(r=>{gt(d=>d?{...d,volume:r}:null)},[]),Kt=a.useCallback(()=>{We?.blobUrl&&URL.revokeObjectURL(We.blobUrl),gt(null),D("info","Background music removed")},[We,D]),Pa=a.useCallback(r=>{Ae(d=>{const f=d.find(u=>u.id===r);return f&&requestAnimationFrame(()=>{f.blobUrl&&URL.revokeObjectURL(f.blobUrl),f.thumbnail&&URL.revokeObjectURL(f.thumbnail)}),d.filter(u=>u.id!==r)}),ce(d=>(d.filter(f=>f.mediaId===r).forEach(f=>{f.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(f.blobUrl))}),d.filter(f=>f.mediaId!==r))),lt===r&&Lt(null)},[lt,ce]),Ht=a.useCallback((r,d)=>{const f=Rt.current.find(S=>S.id===r);if(!f)return;const u={...f,id:Qt(),name:`${f.name} (1)`,duration:d},h={...f,id:Qt(),name:`${f.name} (2)`,startTime:f.startTime+d,duration:f.duration-d,trimStart:(f.trimStart||0)+d};ce(S=>{const A=S.findIndex(K=>K.id===r),U=[...S];return U.splice(A,1,u,h),U}),Ze(u.id),D("success","Clip split")},[ce,D]),ot=a.useCallback(r=>{ce(d=>[...d,r]),Ze(r.id)},[ce]),Aa=a.useCallback(r=>{ce(()=>r),Ze(null),D("success","Clip deleted (ripple)")},[ce,D]);a.useCallback(async(r,d,f)=>{const u=Rt.current.find(h=>h.id===r);if(u?.file){yt(!0),xe("Trimming...");try{const h=await ae.trimVideo(u.file,d,f),S=URL.createObjectURL(h);ce(A=>A.map(U=>U.id===r?{...U,file:h,blobUrl:S,duration:f}:U)),u.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(u.blobUrl)),D("success","Clip trimmed")}catch(h){D("error",ea(h,"ffmpeg"))}finally{yt(!1),xe(""),ae.resetProgress()}}},[ae,ce,D]),a.useCallback(async(r,d,f)=>{let u=r.file;const h=r.speed&&r.speed!==1,S=r.brightness||r.contrast,A=r.saturation!==void 0&&r.saturation!==1,U=r.rotation&&[90,180,270,-90].includes(r.rotation),K=r.volume!==void 0&&r.volume!==1||r.isMuted,ne=r.fadeIn&&r.fadeIn>0||r.fadeOut&&r.fadeOut>0,M=r.filterName,Z=r.trimStart>0||r.trimEnd>0,we=r.effects?.some(ee=>ee.enabled),De=r.text&&r.text.trim().length>0;if(!h&&!S&&!A&&!U&&!K&&!ne&&!M&&!Z&&!we&&!De)return u;const L=`clip ${d+1}/${f}`;if(Z&&(xe(`Trimming ${L}...`),u=await ae.trimVideo(u,r.trimStart,r.duration)),h&&(xe(`Adjusting speed for ${L}...`),u=await ae.changeSpeed(u,r.speed)),S&&(xe(`Adjusting colors for ${L}...`),u=await ae.adjustBrightnessContrast(u,r.brightness||0,r.contrast||0)),A&&(xe(`Adjusting saturation for ${L}...`),u=await ae.adjustSaturation(u,r.saturation)),U&&(xe(`Rotating ${L}...`),u=await ae.rotateVideo(u,r.rotation)),K&&(xe(`Adjusting audio for ${L}...`),u=await ae.adjustVolume(u,r.isMuted?0:r.volume)),ne&&(xe(`Adding fade to ${L}...`),u=await ae.addFade(u,r.fadeIn||0,r.fadeOut||0,r.duration)),M){const ee=Tn.find(he=>he.name===r.filterName);ee?.filter&&(xe(`Applying ${r.filterName} filter to ${L}...`),u=await ae.applyFilter(u,ee.filter))}if(we)for(const ee of r.effects.filter(he=>he.enabled))ee.type==="blur"&&ee.params?.radius?(xe(`Applying ${ee.name} to ${L}...`),u=await ae.applyBlur(u,ee.params.radius)):ee.type==="sharpen"&&ee.params?.strength&&(xe(`Applying ${ee.name} to ${L}...`),u=await ae.applySharpen(u,ee.params.strength));return De&&(xe(`Adding text overlay to ${L}...`),u=await ae.addTextOverlay(u,r.text,{position:r.textPosition||"bottom-center",fontSize:r.textSize||48,fontColor:r.textColor||"white",backgroundColor:r.textBgColor||null,startTime:r.textStartTime||0,duration:r.textDuration||0})),u},[ae]);const Do=a.useCallback(()=>{P.length>0&&!window.confirm("Start a new project? Unsaved changes will be lost.")||(ce([]),c("Untitled Project"),s(null),p.current=!1,g.current=!1,Ae([]),Ze(null),Lt(null),Nt([]),D("info","New project created"))},[P.length,D,ce]),zo=a.useCallback(async()=>{const r=await Ft();if(r?.saved){D("success","Project saved");return}switch(r?.skipReason){case"restore-in-progress":D("info","Project still loading — try again in a moment");break;case"empty-without-session-edit":D("info","Nothing to save yet — add media or clips first");break;case"in-progress":D("info","Save already in progress");break;case"backoff":D("warning","Previous saves failed — retrying shortly");break;case"error":D("error",`Save failed${r?.error?.message?": "+r.error.message:""}`);break;default:D("info","Save skipped")}},[Ft,D]),Wo=a.useCallback(()=>{o("/settings")},[o]),Yt=a.useCallback(async r=>{const d=Date.now();if(Ne.current=Ne.current.filter(h=>d-h<6e4),Ne.current.length>=10){de(h=>[...h,{id:`e-${d}`,role:"assistant",text:"Rate limit reached. Please wait a moment before sending more prompts."}]);return}Ne.current.push(d);const f={id:`u-${d}`,role:"user",text:r};if(de(h=>[...h,f]),!P.some(h=>h.type==="video"||h.type==="audio"||h.type==="image")){const{parseIntentLocally:h}=await ze(async()=>{const{parseIntentLocally:A}=await import("./3u3NcAGO.js");return{parseIntentLocally:A}},__vite__mapDeps([22,2,1,3,21,23,4,5,6,7]));if(h(r)){const A=()=>{v&&(ft("media"),O(!0))};de(U=>[...U,{id:`g-${d}`,role:"assistant",text:"Please import a video first to use AI editing.",openMedia:v?A:void 0}]);return}}X(!0),ve(!1);try{const{executeAiEdit:h}=await ze(async()=>{const{executeAiEdit:M}=await import("./3u3NcAGO.js");return{executeAiEdit:M}},__vite__mapDeps([22,2,1,3,21,23,4,5,6,7])),S={duration:at,hasAudio:P.some(M=>M.type==="audio"||M.type==="video"&&M.file),clipCount:P.length,currentTime:N.currentTime,hasCaptions:P.some(M=>M.isCaption),filters:[...new Set(P.filter(M=>M.filterName).map(M=>M.filterName))].join(",")||void 0,tracks:P.reduce((M,Z)=>Math.max(M,(Z.track||0)+1),0)},A=H.slice(-10).map(M=>({role:M.role,content:M.role==="assistant"&&M.actions?.length?`[Actions: ${M.actions.join(", ")}] ${M.text}`:M.text})),U=JSON.parse(JSON.stringify(P.map(M=>{const{file:Z,...we}=M;return we}))),K=new Map(P.filter(M=>M.file).map(M=>[M.id,M.file])),ne=await h(r,S,{clips:P,setClips:ce,updateClip:_e,addClip:M=>{ce(Z=>[...Z,{...ma,id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...M}])},splitClip:Ht,selectedClipId:Ee,mediaItems:Me},{history:A,onSlowResponse:()=>ve(!0)});if(ne.isChat)de(M=>[...M,{id:`a-${Date.now()}`,role:"assistant",text:ne.summary}]);else{const M=`ai-${Date.now()}`;Ue.current.push({id:M,snapshot:U,filesMap:K});const Z={id:`a-${Date.now()}`,role:"assistant",text:ne.summary||"Done!",actions:ne.actionLabels||[],canUndo:!0,onUndo:()=>{const we=Ue.current.find(De=>De.id===M);if(we){const De=we.snapshot.map(j=>{const L=we.filesMap.get(j.id);return L?{...j,file:L}:j});ce(De),Ue.current=Ue.current.filter(j=>j.id!==M),de(j=>j.map(L=>L.id===Z.id?{...L,canUndo:!1}:L)),D("info","AI edit undone")}}};de(we=>[...we,Z])}}catch(h){const S={id:`e-${Date.now()}`,role:"assistant",text:`Error: ${h.message||"Something went wrong. Please try again."}`};de(A=>[...A,S])}finally{X(!1),ve(!1)}},[P,ce,_e,Ht,Ee,Me,at,N.currentTime,H]),Ua=a.useCallback(r=>{Yt(r.title)},[Yt]),la=a.useCallback(()=>{fe(r=>!r),v&&(ft("ai"),O(r=>!r))},[v]),La=a.useCallback((r,d,f)=>{const u=f==="mp4"?"mp4":"webm",h=URL.createObjectURL(r),S=document.createElement("a");S.href=h,S.download=`${Mr(d||l)}.${u}`,document.body.appendChild(S),S.click(),document.body.removeChild(S),setTimeout(()=>URL.revokeObjectURL(h),2e3)},[l]),Vo=a.useCallback(()=>{It.current&&(It.current.abort(),It.current=null)},[]),Mt=a.useCallback(async(r,d={})=>{if(P.length===0){D("warning","No clips to export. Add media to the timeline first.");return}const f=P.filter(S=>S.type!=="audio"&&S.file).sort((S,A)=>S.startTime-A.startTime);if(f.length===0){D("warning","No video clips with valid files. Make sure your clips are properly loaded.");return}if(xt){Ra(S=>[...S,r]),D("info",`Queued export at ${r} (${Ct.length+1} in queue)`);return}N.isPlaying&&N.setIsPlaying(!1),Ca(!0),na(0),xe("Preparing export..."),ct("");let u=r;if(r.startsWith("preset:")){const S=r.slice(7),A=ta[S];A&&(A.width<=854?u="480p":A.width<=1280?u="720p":u="1080p")}const h=new AbortController;It.current=h;try{const S=await ur({clips:[...f,...P.filter(A=>A.type==="text"||A.type==="sticker")],bgMusic:We,totalDuration:Math.max(...f.map(A=>A.startTime+A.duration)),resolution:u,settings:d,onProgress:({percent:A,elapsed:U,eta:K,label:ne})=>{na(A),xe(ne||"Exporting..."),ct(`${A}%  ·  Elapsed ${U}  ·  ETA ${K}`)},abortSignal:h.signal});if(!S.blob||S.blob.size===0)throw new Error("Export produced an empty file.");La(S.blob,d.filename||l,d.format||"webm"),D("success",`Exported at ${u} (${(S.size/(1024*1024)).toFixed(1)} MB)`)}catch(S){S.message==="Export cancelled."?D("info","Export cancelled."):(console.error("Export error:",S),D("error",S.message||"Export failed. Please try again."))}finally{Ca(!1),na(0),xe(""),ct(""),It.current=null}},[P,l,N,D,We,La,xt,Ct,at]);a.useEffect(()=>{if(!xt&&Ct.length>0){const[r,...d]=Ct;Ra(d),Mt(r)}},[xt,Ct,Mt]);const Ko=a.useCallback(r=>{N.seek(r)},[N]),Ho=a.useCallback(r=>{if(N.currentClip){const d=N.currentClip.trimStart||0,f=N.currentClip.startTime+(r-d);N.isPlaying?N.onVideoTime(f):N.setCurrentTime(f)}else N.isPlaying||N.setCurrentTime(r)},[N]),Yo=a.useCallback(()=>{if(!N.currentClip){N.setIsPlaying(!1);return}const d=P.filter(f=>f.type!=="audio").sort((f,u)=>f.startTime-u.startTime).find(f=>f.startTime>N.currentClip.startTime);d&&N.isPlaying?N.seek(d.startTime):N.setIsPlaying(!1)},[N,P]),Xo=a.useCallback(async r=>{if(!(!r||!ae.isReady)&&!ia.current.has(r)){ia.current.add(r),yt(!0),xe("Converting video to web-compatible format...");try{let d=null,f=null,u=!1;const h=Me.find(U=>U.blobUrl===r);if(h&&h.file)d=h.file,f=h.id,u=!1;else{const U=P.find(K=>K.blobUrl===r);U&&U.file&&(d=U.file,f=U.id,u=!0)}if(!d){D("error","Could not find source file for conversion");return}const S=await ae.convertToWebFormat(d),A=URL.createObjectURL(S);u?ce(U=>U.map(K=>K.id===f?(K.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(K.blobUrl)),{...K,file:S,blobUrl:A}):K)):(Ae(U=>U.map(K=>K.id===f?(K.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(K.blobUrl)),{...K,file:S,blobUrl:A}):K)),ce(U=>U.map(K=>K.mediaId===f?(K.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(K.blobUrl)),{...K,file:S,blobUrl:A}):K))),D("success","Video converted successfully")}catch(d){D("error",ea(d,"ffmpeg"))}finally{ia.current.delete(r),yt(!1),xe(""),ae.resetProgress()}}},[ae,Me,P,ce,D]),Na=a.useRef(null);a.useEffect(()=>{const r=t.state?.filesToImport;r?.length&&Na.current!==r&&(Na.current=r,window.history.replaceState({...t.state,filesToImport:null},""),zt(r))},[t.state?.filesToImport,zt]),a.useEffect(()=>{const r=t.state?.projectId,d=t.state?.projectData,f=t.state?.projectName,u=new URLSearchParams(window.location.search).get("project"),h=r||u||null;if(!h||p.current===h||(p.current=h,Pt()&&!i?.id))return;let S=!1;const A=async j=>{const L=j.project_data?.bgMusic;if(!L)return;let ee=null,he=null;if(L.mediaId)try{const ye=await kt(h,L.mediaId);ye&&(ee=ye.file,he=ye.blobUrl)}catch(ye){console.warn("[restoreBgMusic] IndexedDB load failed:",ye)}if(!he&&L.storagePath&&Pt())try{const ye=await Wa(L.storagePath),Ve=await fetch(ye);if(Ve.ok){const re=await Ve.blob();ee=new File([re],L.name||"bgm",{type:re.type}),he=URL.createObjectURL(re)}}catch(ye){console.warn("[restoreBgMusic] Supabase download failed:",ye)}he&&gt({file:ee,name:L.name||"Background",blobUrl:he,volume:L.volume??.3,storagePath:L.storagePath,mediaId:L.mediaId})},U=j=>{if(!j||!j.startsWith("idb://"))return null;const L=j.slice(6),ee=L.lastIndexOf(":");return ee<0?null:{idbProjectId:L.slice(0,ee),idbMediaId:L.slice(ee+1)}},K=j=>j?.startsWith("audio/")?"audio":j?.startsWith("image/")?"image":"video",ne=(j,L,ee=null)=>Promise.race([j,new Promise(he=>setTimeout(()=>he(ee),L))]),M=async(j,L=[])=>{let ee=null,he=null;const ye=j.mediaId||j.id||null;console.log("[restore] resolveMedia called for:",{name:j.name,type:j.type,mediaId:ye,idbKey:j.idbKey,storagePath:j.storagePath});const Ve=U(j.idbKey);if(Ve)try{console.log("[restore] Trying IndexedDB:",Ve.idbProjectId,Ve.idbMediaId);const re=await ne(kt(Ve.idbProjectId,Ve.idbMediaId),2e3);re?(ee=re.file,he=re.blobUrl,console.log("[restore] IndexedDB HIT:",j.name,"size:",re.file?.size)):console.warn("[restore] IndexedDB MISS (null):",j.idbKey)}catch(re){console.warn("[restore] IndexedDB load failed:",j.idbKey,re)}else console.log("[restore] No idbKey for clip:",j.name,j.type);if(!he&&ye)try{console.log("[restore] Trying fallback IndexedDB with projectId:",h,"mediaId:",ye);const re=await ne(kt(h,ye),2e3);re?(ee=re.file,he=re.blobUrl,console.log("[restore] Fallback IndexedDB HIT:",j.name)):console.warn("[restore] Fallback IndexedDB MISS:",h,ye)}catch(re){console.warn("[restore] IndexedDB fallback load failed:",ye,re)}if(!he&&ye)try{const re=L.find($e=>$e.mediaId===ye);if(re){console.log("[restore] IndexedDB SCAN HIT:",re.key);const $e=await ne(kt(re.projectId,re.mediaId),2e3);$e&&(ee=$e.file,he=$e.blobUrl)}}catch(re){console.warn("[restore] IndexedDB scan failed:",re)}if(!he&&j.storagePath&&Pt()&&!j.storagePath.startsWith("blob:"))try{console.log("[restore] Trying Supabase Storage:",j.storagePath);const re=await ne(Wa(j.storagePath),5e3);if(!re)throw new Error("Supabase URL timed out");const $e=new AbortController,ca=setTimeout(()=>$e.abort(),8e3),Et=await fetch(re,{signal:$e.signal});if(clearTimeout(ca),Et.ok){const ut=await Et.blob();ee=new File([ut],j.name||"media",{type:ut.type}),he=URL.createObjectURL(ut),console.log("[restore] Supabase Storage HIT:",j.name)}}catch(re){console.warn("[restore] Supabase download failed:",j.storagePath,re)}return!he&&j.type!=="text"&&console.error("[restore] FAILED to resolve media for:",j.name,j.type,"— all sources exhausted"),{file:ee,blobUrl:he}},Z=/^(draft-|local_)/.test(h),we=()=>({name:f||"Untitled Project",project_data:{clips:[],mediaItems:[]}});return(async()=>{yt(!0),xe("Restoring media...");try{let j=d;if(!j){if(Z)console.log("[restore] Non-cloud projectId — skipping Supabase, going straight to IndexedDB recovery:",h),j=we();else if(!Pt())j=await za(h,null);else if(i?.id)try{j=await za(h,i.id)}catch(k){if(k?.code==="PGRST116")console.warn("[restore] Supabase has no row for",h,"— attempting IndexedDB-only recovery"),j=we();else throw k}}if(j||(console.warn("[restore] No project data found for",h,"— attempting IndexedDB-only recovery"),j=we()),S)return;window.history.replaceState({...t.state,projectId:null,projectData:null,projectName:null},"");const L=f||j.name||"Untitled Project";c(mo(L,{maxLength:100})||"Untitled Project"),s(h),j.resolution&&b(j.resolution);const ee=j.project_data?.timelineMarkers??j.timelineMarkers;Nt(Array.isArray(ee)?ee.filter(k=>k&&typeof k.time=="number"&&Number.isFinite(k.time)&&k.time>=0).map((k,F)=>({id:typeof k.id=="string"&&k.id?k.id:`mk-${F}-${Math.round(k.time*1e3)}`,time:k.time})):[]);const he=j.project_data?.clips||j.clips||[],ye=j.project_data?.mediaItems||[],Ve=await ne(an(),3e3,[]);if(console.log("[restore] IndexedDB entries:",Ve),console.log("[restore] Project data:",{projectId:h,clipsCount:he.length,mediaItemsCount:ye.length,clipTypes:he.map(k=>({name:k.name,type:k.type,mediaId:k.mediaId,idbKey:k.idbKey,storagePath:k.storagePath})),mediaItemIds:ye.map(k=>({id:k.id,name:k.name,idbKey:k.idbKey}))}),he.length===0&&ye.length===0){const k=Ve.filter(Te=>Te.projectId===h),F=[];for(const Te of k)try{const Ce=await ne(kt(h,Te.mediaId),3e3);if(!Ce)continue;F.push({id:Te.mediaId,name:Te.name||"media",file:Ce.file,blobUrl:Ce.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:K(Te.mime),isProcessing:!1,idbKey:`idb://${h}:${Te.mediaId}`,_mediaError:null})}catch(Ce){console.warn("[recover] load failed for",Te.mediaId,Ce)}if(S)return;await A(j);let ie=0;if(F.length===0){const Te=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,Ce=Ve.filter(Le=>Le.projectId&&Le.projectId!==h&&!Te.test(Le.projectId)),Ie=new Set;for(const Le of Ce)if(!Ie.has(Le.mediaId)){Ie.add(Le.mediaId);try{const pt=await ne(kt(Le.projectId,Le.mediaId),3e3);if(!pt)continue;F.push({id:Le.mediaId,name:Le.name||"media",file:pt.file,blobUrl:pt.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:K(Le.mime),isProcessing:!1,idbKey:`idb://${Le.projectId}:${Le.mediaId}`,_mediaError:null}),ie++}catch(pt){console.warn("[recover-orphan] load failed for",Le.mediaId,pt)}}ie>0&&console.warn(`[recover-orphan] Surfacing ${ie} orphan media file(s) from stale projectIds`)}if(F.length>0){Ae(F);for(const Ce of F)Ce.type!=="audio"&&(async()=>{try{const Ie=await qt(Ce.file);Ae(ua=>ua.map(nt=>nt.id===Ce.id?{...nt,duration:Ie.duration||nt.duration,width:Ie.width,height:Ie.height}:nt));const Le=await At(Ce.file,0),pt=URL.createObjectURL(Le);Ae(ua=>ua.map(nt=>nt.id===Ce.id?{...nt,thumbnail:pt}:nt))}catch(Ie){console.warn("[recover] metadata regen failed:",Ce.name,Ie)}})();g.current=!0;const Te=ie>0?`Surfaced ${ie} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`:`Recovered ${F.length} media file(s) from local cache — re-add them to the timeline, then save`;D("warning",Te);return}g.current=!0,D("info",`Loaded project "${L}" (no clips)`);return}xe("Restoring media...");const re=new Map,$e=new Map;for(const k of ye){const F=k.id||k.mediaId;F&&!$e.has(F)&&$e.set(F,k)}for(const k of he){const F=k.mediaId||k.id;k.type!=="text"&&F&&!$e.has(F)&&$e.set(F,k)}ct(`Resolving ${$e.size} media files...`);const ca=await Promise.all([...$e.entries()].map(async([k,F])=>{if(S)return null;const ie=await M(F,Ve);return{mediaId:k,resolved:ie,meta:F}}));for(const k of ca){if(!k||S)continue;const{mediaId:F,resolved:ie,meta:Te}=k;ie.blobUrl&&re.set(F,{blobUrl:ie.blobUrl,file:ie.file,meta:Te})}const Et=[];for(const k of he){let F=null,ie=null;const Te=k.mediaId||k.id;if(Te&&re.has(Te)){const Ie=re.get(Te);F=Ie.blobUrl,ie=Ie.file}const Ce=!F&&k.type!=="text";Et.push({...ma,...k,file:ie||null,blobUrl:F||null,thumbnail:null,_mediaError:Ce?"Media not found — re-import":null})}const ut=new Map;for(const[k,F]of re){const ie=F.meta||{};ut.set(k,{id:k,name:ie.name||"media",file:F.file,blobUrl:F.blobUrl,thumbnail:null,duration:ie.duration||0,width:ie.width||0,height:ie.height||0,type:ie.type||"video",isProcessing:!1,storagePath:ie.storagePath,_mediaError:null})}const da=[],Fa=new Set;for(const k of ye){const F=k.id||k.mediaId,ie=F?ut.get(F):null;da.push({id:F,name:k.name||ie?.name||"media",file:ie?.file||null,blobUrl:ie?.blobUrl||null,thumbnail:null,duration:ie?.duration??k.duration??0,width:ie?.width??k.width??0,height:ie?.height??k.height??0,type:k.type||ie?.type||"video",isProcessing:!1,storagePath:k.storagePath||ie?.storagePath,idbKey:k.idbKey,_mediaError:ie?.blobUrl||k.type==="audio"?null:"Media not found — re-import"}),F&&Fa.add(F)}for(const[k,F]of ut)Fa.has(k)||da.push(F);const _t=wr({restoredClips:Et,mediaItems:da,projectName:L});Ae(_t.mediaItems),ce(_t.clips),await A(j);for(const k of _t.mediaItems)!k.file||k.type==="audio"||(async()=>{try{const F=await qt(k.file);Ae(Ce=>Ce.map(Ie=>Ie.id===k.id?{...Ie,duration:F.duration||Ie.duration,width:F.width,height:F.height}:Ie));const ie=await At(k.file,0),Te=URL.createObjectURL(ie);Ae(Ce=>Ce.map(Ie=>Ie.id===k.id?{...Ie,thumbnail:Te}:Ie))}catch(F){console.warn("[restore] Thumbnail regen failed:",k.name,F)}})();g.current=!0,D(_t.notification.level,_t.notification.message)}catch(j){console.error("Project load error:",j),D("error","Failed to load project")}finally{S||(yt(!1),xe(""),ct(""))}})(),()=>{S=!0}},[i?.id,t.state?.projectId,D,gt,ce]),a.useEffect(()=>{ae.preload()},[]),a.useEffect(()=>{const r=d=>{const f=d.ctrlKey||d.metaKey;if(f&&d.shiftKey&&d.key==="E"){d.preventDefault(),la();return}if(d.key==="Escape"&&B){fe(!1);return}const u=document.activeElement;if(!(d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA"||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA"||u?.isContentEditable)){if(d.key==="/"&&B){d.preventDefault(),document.querySelector(".ai-input-box")?.focus();return}if((d.key==="Delete"||d.key==="Backspace")&&Ee){d.preventDefault(),Bt(Ee);return}f&&d.key==="s"&&d.preventDefault(),f&&d.key==="e"&&(d.preventDefault(),P.length>0&&Mt("1080p")),f&&d.key==="z"&&(d.preventDefault(),d.shiftKey?dt():vt()),f&&d.key==="y"&&(d.preventDefault(),dt())}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[Mt,vt,dt,P.length,N,B,la,Ee,Bt]);const Oa=a.useRef(Me),$a=a.useRef(P);return a.useEffect(()=>{Oa.current=Me},[Me]),a.useEffect(()=>{$a.current=P},[P]),a.useEffect(()=>()=>{Oa.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl),r.thumbnail&&URL.revokeObjectURL(r.thumbnail)}),$a.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl)})},[]),e.jsxs("div",{style:{...et.root,...v?{height:"100dvh",...Y?{paddingBottom:0,paddingRight:"44px"}:{paddingBottom:"56px"}}:{}},role:"application","aria-label":"ClipCut Video Editor",children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("style",{children:jr}),!v&&e.jsx("a",{href:"#editor-timeline",className:"skip-link",children:"Skip to timeline"}),e.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"},children:xt?`Exporting video... ${Ia}%`:wt||""}),e.jsx(Un,{projectName:l,onProjectNameChange:c,onExport:Mt,isExporting:xt,exportProgress:Ia,currentOperation:wt,hasMediaToExport:P.filter(r=>r.type!=="audio"&&r.file).length>0,resolutions:ho,exportPresets:ta,exportSubMessage:Ma,lastSaved:Bo,canUndo:ht,canRedo:bt,onUndo:vt,onRedo:dt,onCancelExport:Vo,onNewProject:Do,onSave:zo,onSettings:Wo,editorLayout:Q,onLayoutChange:J,forceOpenExport:Ao>0,onExportModalClosed:()=>Uo(0),onAiToggle:la,aiPanelOpen:B}),!v&&e.jsx($n,{activeToolbar:x,onToolbarChange:T}),e.jsxs("main",{"aria-label":"Editor workspace",style:{flex:v?1:Q==="wide-timeline"?"0 1 48%":"1 1 0%",display:"flex",flexDirection:v&&Y?"row":v?"column":"row",minWidth:0,minHeight:v?0:"200px",overflow:"hidden",zIndex:0},children:[Q!=="compact"&&!v&&e.jsxs(e.Fragment,{children:[e.jsx(mt,{name:"left-panel",inline:!0,message:"Panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(St,{width:`${R}px`}),children:e.jsx("div",{style:{width:`${R}px`,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0e1218"},children:e.jsxs("div",{style:{flex:"1 1 0%",overflow:"hidden auto",minHeight:0},className:"cs",children:[x==="media"&&e.jsx(Qa,{mediaTab:G,onMediaTabChange:se,mediaItems:Me,onImportMedia:zt,onRemoveMedia:Pa,onAddToTimeline:Dt,selectedMediaId:lt,onSelectMedia:Lt,isImporting:ja,style:po}),x==="text"&&e.jsx(to,{selectedClip:Oe,onClipUpdate:_e,onAddClip:ot,currentTime:N.currentTime}),x==="audio"&&e.jsx(ao,{selectedClip:Oe,onClipUpdate:_e,bgMusic:We,onImportBgMusic:Wt,onUpdateBgMusicVolume:Vt,onRemoveBgMusic:Kt}),x==="captions"&&e.jsx(io,{clips:P,onAddClip:ot,onSetClips:ce,currentTime:N.currentTime,mediaItems:Me,selectedClip:Oe,selectedClipId:Ee,onSelectClip:Ze,onClipUpdate:_e}),x==="stickers"&&e.jsx(oo,{onAddClip:ot,currentTime:N.currentTime}),x==="effects"&&e.jsx(no,{selectedClip:Oe,onClipUpdate:_e}),x==="transition"&&e.jsx(Za,{rightTab:"video",onRightTabChange:_,rightSubTab:"basic",onRightSubTabChange:z,selectedClip:Oe,onClipUpdate:_e,onAllCaptionsUpdate:_a,clips:P,bgMusic:We,onImportBgMusic:Wt,onUpdateBgMusicVolume:Vt,onRemoveBgMusic:Kt,style:po}),x==="filters"&&e.jsx(ro,{selectedClip:Oe,onClipUpdate:_e})]})})})}),e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>st(r,R),onDoubleClick:()=>ue(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})})]}),e.jsx("div",{style:v&&Y?{flex:"0 0 60%",display:"flex",flexDirection:"column",minWidth:0}:{flex:"1 1 0%",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},children:e.jsx(mt,{name:"player",inline:!0,message:"Video player encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(St,{width:"auto",height:"100%"}),children:e.jsx(Sr,{isPlaying:N.isPlaying,onPlayPause:N.togglePlay,videoSrc:Oo,currentTime:N.clipOffset,duration:at,onTimeUpdate:Ho,onSeek:Ko,onEnded:Yo,onVideoError:Xo,clipProperties:N.currentClip||Oe,textOverlays:Fo,selectedClipId:Ee,onClipUpdate:_e,onSelectClip:Ze,hasTimelineClips:P.some(r=>r.type!=="audio"&&r.type!=="text"),hasUnavailableMediaClips:$o,isRestoringMedia:ra&&wt.includes("Restoring")})})})}),Q!=="compact"&&!v&&Oe&&!B&&e.jsxs("div",{className:"inspector-enter",style:{display:"flex",flexDirection:"row",flexShrink:0,width:`${I+8}px`,overflow:"hidden"},children:[e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>tt(r,I),onDoubleClick:()=>pe(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})}),e.jsx(mt,{name:"inspector",inline:!0,message:"Inspector panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(St,{width:`${I}px`}),children:e.jsx(Za,{rightTab:W,onRightTabChange:_,rightSubTab:y,onRightSubTabChange:z,selectedClip:Oe,onClipUpdate:_e,onAllCaptionsUpdate:_a,clips:P,bgMusic:We,onImportBgMusic:Wt,onUpdateBgMusicVolume:Vt,onRemoveBgMusic:Kt,style:{width:`${I}px`}})})})]}),!v&&B&&e.jsx(mt,{name:"ai-chat",inline:!0,message:"AI panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(St,{width:"360px"}),children:e.jsx(so,{isOpen:B,onClose:()=>fe(!1),messages:H,isThinking:E,slowHint:Re,onSendMessage:Yt,suggestions:Pe,onApplySuggestion:Ua})})}),v&&e.jsxs("div",{style:Y?{flex:"0 0 40%",display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden",borderLeft:"1px solid rgba(117,170,219,0.08)"}:{display:"contents"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"44px",padding:"0 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",flexShrink:0},children:[e.jsx("button",{onClick:()=>{const r=document.querySelector(".player-container");r&&(r.requestFullscreen?.()||r.webkitRequestFullscreen?.())},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Fullscreen",children:e.jsx(je,{i:"fullscreen",s:20,c:"#94a3b8"})}),e.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:"12px",letterSpacing:"0.5px",color:"#e2e8f0",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:Ja(N.currentTime)}),e.jsx("span",{style:{color:"#475569"},children:"/"}),e.jsx("span",{style:{color:"#94a3b8"},children:Ja(at)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2px"},children:[e.jsx("button",{onClick:vt,disabled:!ht,style:{background:"none",border:"none",cursor:ht?"pointer":"not-allowed",opacity:ht?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Undo",children:e.jsx(je,{i:"undo",s:18,c:"#94a3b8"})}),e.jsx("button",{onClick:dt,disabled:!bt,style:{background:"none",border:"none",cursor:bt?"pointer":"not-allowed",opacity:bt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Redo",children:e.jsx(je,{i:"redo",s:18,c:"#94a3b8"})})]})]}),Ee&&e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"4px",height:"64px",padding:"4px 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",flexShrink:0,transition:"height 0.2s ease, opacity 0.2s ease"},children:[{icon:"volume_off",label:"Mute clip audio",action:()=>_e(Ee,{volume:Oe?.volume===0?1:0})},{icon:"image",label:"Cover",action:()=>{}},{icon:"music_note",label:"+ Add audio",action:()=>{ft("audio"),O(!0)}},{icon:"title",label:"+ Add text",action:()=>{ft("text"),O(!0)}}].map((r,d)=>e.jsxs("button",{onClick:r.action,style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",padding:"6px 8px",cursor:"pointer",minWidth:"64px",flex:"0 0 auto",minHeight:"44px"},children:[e.jsx(je,{i:r.icon,s:20,c:"#e2e8f0"}),e.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",whiteSpace:"nowrap",fontFamily:"'Spline Sans', sans-serif"},children:r.label})]},d))}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(va,{}),children:e.jsx(eo,{id:"editor-timeline",clips:P,selectedClipId:Ee,onSelectClip:Ze,onUpdateClip:_e,onDeleteClip:Bt,onSplitClip:Ht,onAddClip:ot,onRippleDelete:Aa,currentTime:N.currentTime,onSeek:N.seek,totalDuration:at,isProcessing:ra,canUndo:ht,canRedo:bt,onUndo:vt,onRedo:dt,mediaItems:Me,onAddToTimeline:Dt,timelineHeight:ge,timelineMarkers:oa,onTimelineMarkersChange:Nt})})})]})]}),v&&e.jsxs(e.Fragment,{children:[e.jsx(br,{isOpen:le,onClose:()=>O(!1),children:e.jsx(mt,{name:"mobile-panel",inline:!0,message:"Panel error",children:e.jsxs(a.Suspense,{fallback:e.jsx(St,{width:"100%",height:"200px"}),children:[Be==="media"&&e.jsx(Qa,{mediaTab:G,onMediaTabChange:se,mediaItems:Me,onImportMedia:zt,onRemoveMedia:Pa,onAddToTimeline:Dt,selectedMediaId:lt,onSelectMedia:Lt,isImporting:ja}),Be==="text"&&e.jsx(to,{selectedClip:Oe,onClipUpdate:_e,onAddClip:ot,currentTime:N.currentTime}),Be==="audio"&&e.jsx(ao,{selectedClip:Oe,onClipUpdate:_e,bgMusic:We,onImportBgMusic:Wt,onUpdateBgMusicVolume:Vt,onRemoveBgMusic:Kt}),Be==="captions"&&e.jsx(io,{clips:P,onAddClip:ot,onSetClips:ce,currentTime:N.currentTime,mediaItems:Me,selectedClip:Oe,selectedClipId:Ee,onSelectClip:Ze,onClipUpdate:_e}),Be==="stickers"&&e.jsx(oo,{onAddClip:ot,currentTime:N.currentTime}),Be==="effects"&&e.jsx(no,{selectedClip:Oe,onClipUpdate:_e}),Be==="filters"&&e.jsx(ro,{selectedClip:Oe,onClipUpdate:_e}),Be==="ai"&&e.jsx(so,{isOpen:!0,onClose:()=>O(!1),messages:H,isThinking:E,slowHint:Re,onSendMessage:Yt,suggestions:Pe,onApplySuggestion:Ua,isMobile:!0})]})})}),e.jsx("nav",{className:"mobile-tab-bar","aria-label":"Editor tools",children:[{id:"media",icon:"perm_media",label:"Media",tip:"Import and browse media"},{id:"text",icon:"title",label:"Text",tip:"Add manual text overlays"},{id:"captions",icon:"closed_caption",label:"Captions",tip:"Auto-generate subtitles from speech"},{id:"audio",icon:"music_note",label:"Audio",tip:"Background music and clip audio"},{id:"stickers",icon:"emoji_emotions",label:"Stickers",tip:"Drop emoji stickers on the preview"},{id:"effects",icon:"auto_fix_high",label:"Effects",tip:"Apply video effects"},{id:"filters",icon:"filter_vintage",label:"Filters",tip:"Apply colour filters"},{id:"ai",icon:"auto_awesome",label:"AI",tip:"AI editing assistant"}].map(r=>e.jsxs("button",{className:Be===r.id&&le?"active":"",title:r.tip,"aria-label":r.tip,onClick:()=>{Be===r.id?O(d=>!d):(ft(r.id),O(!0))},children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:22,color:Be===r.id&&le?"#75AADB":void 0},children:r.icon}),e.jsx("span",{children:r.label})]},r.id))})]}),!v&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"resize-handle resize-handle-h",onMouseDown:r=>Ge(r,ge||Tr),onDoubleClick:()=>q(null),children:e.jsx("div",{className:"resize-handle-dot"})}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(va,{}),children:e.jsx(eo,{id:"editor-timeline",clips:P,selectedClipId:Ee,onSelectClip:Ze,onUpdateClip:_e,onDeleteClip:Bt,onSplitClip:Ht,onAddClip:ot,onRippleDelete:Aa,currentTime:N.currentTime,onSeek:N.seek,totalDuration:at,isProcessing:ra,canUndo:ht,canRedo:bt,onUndo:vt,onRedo:dt,mediaItems:Me,onAddToTimeline:Dt,timelineHeight:ge,timelineMarkers:oa,onTimelineMarkersChange:Nt})})})]}),ae.isLoading&&!ae.currentOperation&&!wt&&e.jsx(_o,{progress:ae.loadProgress}),(wt||ae.currentOperation)&&e.jsx(Eo,{message:wt||"Processing...",progress:ae.currentOperation!=null?ae.progress:ae.loadProgress,operationLabel:ae.currentOperation?`${ae.currentOperation}...`:"",subMessage:Ma,onCancel:ae.currentOperation?ae.cancelOperation:void 0}),Lo&&e.jsx(Mo,{onComplete:()=>{No(!1),localStorage.setItem("clipcut_onboarded","1")}}),Ot&&e.jsx(Po,{type:Ot.type,message:Ot.message,onClose:()=>Ea(null),autoClose:Ot.type!=="error"})]})},Lr=a.memo(Ur),ii=Object.freeze(Object.defineProperty({__proto__:null,default:Lr},Symbol.toStringTag,{value:"Module"}));export{zr as A,ma as D,Dr as E,Tn as F,je as I,qr as M,jn as S,Yr as T,ii as V,Vr as a,Wr as b,Xr as c,oi as d,ti as e,ai as f,ri as g,Ja as h,Jr as i,qa as j,ni as k,Hr as l,Kr as m,Gr as n,et as s,Zr as t,ei as x,Qr as z};
