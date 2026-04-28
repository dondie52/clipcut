const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BlTcfLWv.js","assets/DwQPoapS.js","assets/Bs4D8IiQ.js","assets/BF5pfO9l.js","assets/C_8A2FPv.js","assets/Et-wlZO3.js","assets/D6pyVaaw.js","assets/CQOLuCu5.js","assets/JXVdZgiq.js","assets/B9CjrYEi.js","assets/CrFPy8FH.js","assets/DnkO4jUD.js","assets/DClj_HD6.js","assets/D7K6beRm.js","assets/BwkyYyae.js","assets/C_fyOyVy.js","assets/eGzGB8ND.js","assets/DYfEiMiQ.js","assets/w_LyuqDI.js","assets/DbW17T9F.js","assets/Cpjqc8X5.js","assets/DmIGoxCG.js","assets/C-nCNX8c.js","assets/BEUlQjCE.js","assets/Dh0lx4MY.js","assets/BJ8-Vlbw.js","assets/CXVCwJT7.js","assets/CDbkDtvg.js"])))=>i.map(i=>d[i]);
import{g as aa,a as Pt,u as Qo,D as Zo,_ as Fe,e as At,E as mt,A as en,T as za,f as Wa,r as tn}from"./BF5pfO9l.js";import{r as a,j as e,a as an,u as on}from"./DwQPoapS.js";import{f as bo}from"./Et-wlZO3.js";import{u as ja,a as nn}from"./D6pyVaaw.js";import{i as go,l as Xe,w as Be,e as qe,r as He,t as Ye,c as Je,s as Qe,a as Ge,b as fa,d as rn,f as sn,g as ln,h as cn,m as dn,j as un,E as oa,k as pn,n as mn,o as fn,p as hn,q as bn,u as gn,v as xn,R as xo,x as yn,y as wn,z as vn,A as kn}from"./CQOLuCu5.js";import{c as Lt,b as Va,e as Sn,f as St,s as qt,r as jn,g as yo,h as Ka}from"./JXVdZgiq.js";import{v as Cn}from"./Bs4D8IiQ.js";import{getWorkerUrl as Tn}from"./CrFPy8FH.js";const Te=a.memo(({i:t,s:o=18,c:i="currentColor",style:n={},filled:s=!1,weight:l=400,...c})=>e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:`${o}px`,color:i,fontVariationSettings:`'FILL' ${s?1:0}, 'wght' ${l}`,transition:"color 0.15s ease",userSelect:"none",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center",...n},"aria-hidden":"true",...c,children:t}));Te.displayName="Icon";const In=`
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
`,ta=a.memo(({i:t,onClick:o,style:i={},title:n,disabled:s=!1,size:l=18,color:c="#64748b",hoverColor:m="#94a3b8",...b})=>{const[p,g]=a.useState(!1),x=a.useCallback(I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),o?.())},[o]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:In}),e.jsx("button",{className:"ghost-btn",style:{background:"none",border:"none",cursor:s?"not-allowed":"pointer",padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",opacity:s?.5:1,...i},onClick:s?void 0:o,onKeyDown:x,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),disabled:s,title:n,"aria-label":b["aria-label"]||n,...b,children:e.jsx(Te,{i:t,s:l,c:p&&!s?m:c})})]})});ta.displayName="GhostBtn";const et={root:{width:"100%",maxWidth:"100vw",minWidth:0,minHeight:0,height:"100vh",display:"flex",flexDirection:"column",background:"var(--color-bg-dark, #08090c)",color:"var(--color-text-primary, #f1f5f9)",overflow:"hidden",fontFamily:"'Spline Sans', sans-serif"},ghost:{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all var(--transition-normal, 0.15s ease)"},topBar:{height:"42px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",flexShrink:0,position:"relative",zIndex:3e3},titleInput:{position:"absolute",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid transparent",outline:"none",textAlign:"center",fontSize:"12px",fontWeight:500,color:"#cbd5e1",width:"220px",padding:"5px 14px",borderRadius:"4px",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease"},exportBtn:{marginLeft:"6px",background:"linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)",color:"#0a0a0a",padding:"7px 22px",borderRadius:"6px",fontSize:"11px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif",transition:"all 0.15s ease",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 2px 8px rgba(117, 170, 219, 0.25)",letterSpacing:"0.3px",textTransform:"uppercase"},toolbar:{height:"46px",background:"#0e1218",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",padding:"0 8px",gap:0,flexShrink:0},leftPanel:{width:"280px",minWidth:0,maxWidth:"100%",borderRight:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},importBtn:{width:"100%",background:"rgba(117, 170, 219, 0.03)",border:"1.5px dashed rgba(117, 170, 219, 0.15)",borderRadius:"8px",padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",cursor:"pointer",position:"relative",fontFamily:"'Spline Sans', sans-serif",color:"inherit",transition:"all 0.15s ease"},rightPanel:{width:"320px",minWidth:0,maxWidth:"100%",borderLeft:"1px solid rgba(117, 170, 219, 0.08)",display:"flex",flexDirection:"column",background:"linear-gradient(180deg, #0f1620 0%, #0e1218 100%)",flexShrink:0,overflow:"hidden"},controls:{height:"52px",background:"linear-gradient(180deg, #0e1218 0%, #0b0f15 100%)",borderTop:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"relative"},timeline:{flex:"0 0 auto",height:"280px",background:"#08090c",borderTop:"2px solid rgba(117, 170, 219, 0.1)",display:"flex",flexDirection:"column",minHeight:"120px",overflow:"hidden",position:"relative",zIndex:10},tlToolbar:{height:"38px",background:"linear-gradient(180deg, #111720 0%, #0e1218 100%)",borderBottom:"1px solid rgba(117, 170, 219, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}},Rn=`
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
`,it=[{id:"media",icon:"folder_open",label:"Media"},{id:"audio",icon:"music_note",label:"Audio"},{id:"text",icon:"text_fields",label:"Text"},{id:"captions",icon:"closed_caption",label:"Captions"},{id:"stickers",icon:"mood",label:"Stickers"},{id:"effects",icon:"auto_fix_high",label:"Effects"},{id:"transition",icon:"layers",label:"Transition"},{id:"filters",icon:"filter_list",label:"Filters"}],Mn={PLAY_PAUSE:{key:"Space",description:"Play/Pause"},SKIP_FORWARD:{key:"ArrowRight",description:"Skip forward 5s"},SKIP_BACKWARD:{key:"ArrowLeft",description:"Skip backward 5s"},SKIP_FORWARD_LARGE:{key:"Shift+ArrowRight",description:"Skip forward 10s"},SKIP_BACKWARD_LARGE:{key:"Shift+ArrowLeft",description:"Skip backward 10s"},FRAME_FORWARD:{key:".",description:"Next frame"},FRAME_BACKWARD:{key:",",description:"Previous frame"},GO_TO_START:{key:"Home",description:"Go to start"},GO_TO_END:{key:"End",description:"Go to end"},SPLIT:{key:"S",description:"Split at playhead"},DELETE:{key:"Delete",description:"Delete selected"},DESELECT:{key:"Escape",description:"Deselect"},MUTE:{key:"M",description:"Mute/Unmute"},VOLUME_UP:{key:"ArrowUp",description:"Volume up"},VOLUME_DOWN:{key:"ArrowDown",description:"Volume down"},FULLSCREEN:{key:"F",description:"Toggle fullscreen"},SAVE:{key:"Ctrl+S",description:"Save project"},EXPORT:{key:"Ctrl+E",description:"Export video"},IMPORT:{key:"Ctrl+I",description:"Import media"},TOOLBAR_1:{key:"1",description:"Media panel"},TOOLBAR_2:{key:"2",description:"Audio panel"},TOOLBAR_3:{key:"3",description:"Text panel"},TOOLBAR_4:{key:"4",description:"Stickers panel"},TOOLBAR_5:{key:"5",description:"Effects panel"},TOOLBAR_6:{key:"6",description:"Transitions panel"},TOOLBAR_7:{key:"7",description:"Filters panel"}},En=`
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
`,ha={volume:1,isMuted:!1,speed:1,rotation:0,opacity:1,positionX:0,positionY:0,scale:1,brightness:0,contrast:0,saturation:1,temperature:0,filterName:null,filterStrength:50,effects:[],fadeIn:0,fadeOut:0,track:0,trimStart:0,trimEnd:0,colorGrading:{shadows:"#1a1a2e",midtones:"#4a4a5e",highlights:"#ffffff"},transition:null,transitionDuration:1,text:"",textColor:"#ffffff",textSize:48,textPosition:"bottom-center",textBgColor:"",textBold:!1,textItalic:!1,textUnderline:!1,textAlign:"center",textFontFamily:"Spline Sans",textStartTime:0,textDuration:0,textX:null,textY:null},_n=[{name:"None",filter:null,css:null},{name:"90s",filter:"colorbalance=rs=.3:gs=-.1:bs=-.3,eq=saturation=0.8",css:"sepia(0.3) saturate(0.8)"},{name:"Vintage",filter:"eq=saturation=0.6:brightness=0.05",css:"sepia(0.4) saturate(0.6) brightness(1.05)"},{name:"Cinema",filter:"eq=contrast=1.2:brightness=-0.05:saturation=1.1",css:"contrast(1.2) brightness(0.95) saturate(1.1)"},{name:"B&W",filter:"eq=saturation=0",css:"grayscale(1)"},{name:"Warm",filter:"colortemperature=6500",css:"sepia(0.15) saturate(1.2)"},{name:"Cool",filter:"colortemperature=3500",css:"saturate(0.9) hue-rotate(10deg)"},{name:"Sepia",filter:"colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",css:"sepia(0.8)"}],Jr=[{name:"Motion Blur",type:"blur",params:{radius:5},css:"blur(2px)",icon:"blur_on"},{name:"Sharpen",type:"sharpen",params:{strength:1},css:"contrast(1.1)",icon:"deblur"},{name:"Vignette",type:"vignette",params:{},css:null,icon:"vignette"},{name:"Gaussian Blur",type:"blur",params:{radius:10},css:"blur(4px)",icon:"lens_blur"},{name:"Glitch",type:"glitch",params:{intensity:3},css:null,icon:"broken_image"},{name:"Zoom",type:"zoom",params:{factor:1.5},css:null,icon:"zoom_in"},{name:"Shake",type:"shake",params:{intensity:5},css:null,icon:"vibration"},{name:"Flash",type:"flash",params:{duration:.5},css:null,icon:"flash_on"}],Qr=[{name:"Fade In",key:"fadeIn",value:1},{name:"Fade Out",key:"fadeOut",value:1},{name:"Scale Up",key:"scaleUp",value:!0},{name:"Slide Left",key:"slideLeft",value:!0}],Zr=[{value:null,label:"None",icon:"block"},{value:"fade",label:"Fade",icon:"gradient"},{value:"fadeblack",label:"Fade Black",icon:"brightness_1"},{value:"fadewhite",label:"Fade White",icon:"brightness_7"},{value:"dissolve",label:"Dissolve",icon:"blur_on"},{value:"wipeleft",label:"Wipe Left",icon:"arrow_back"},{value:"wiperight",label:"Wipe Right",icon:"arrow_forward"},{value:"slideup",label:"Slide Up",icon:"arrow_upward"},{value:"slidedown",label:"Slide Down",icon:"arrow_downward"}],ei=[{value:"top-left",label:"Top Left",icon:"north_west"},{value:"top-center",label:"Top",icon:"north"},{value:"top-right",label:"Top Right",icon:"north_east"},{value:"center-left",label:"Left",icon:"west"},{value:"center",label:"Center",icon:"center_focus_strong"},{value:"center-right",label:"Right",icon:"east"},{value:"bottom-left",label:"Bottom Left",icon:"south_west"},{value:"bottom-center",label:"Bottom",icon:"south"},{value:"bottom-right",label:"Bottom Right",icon:"south_east"}],ti=[{emoji:"😀",label:"Grinning",category:"smileys"},{emoji:"😂",label:"Laughing",category:"smileys"},{emoji:"🥹",label:"Touched",category:"smileys"},{emoji:"😍",label:"Heart Eyes",category:"smileys"},{emoji:"🤩",label:"Star Struck",category:"smileys"},{emoji:"😎",label:"Cool",category:"smileys"},{emoji:"🥳",label:"Party",category:"smileys"},{emoji:"😱",label:"Shocked",category:"smileys"},{emoji:"🤔",label:"Thinking",category:"smileys"},{emoji:"😴",label:"Sleeping",category:"smileys"},{emoji:"👍",label:"Thumbs Up",category:"hands"},{emoji:"👎",label:"Thumbs Down",category:"hands"},{emoji:"👏",label:"Clap",category:"hands"},{emoji:"🙌",label:"Raised Hands",category:"hands"},{emoji:"🤝",label:"Handshake",category:"hands"},{emoji:"✌️",label:"Peace",category:"hands"},{emoji:"🤞",label:"Fingers Crossed",category:"hands"},{emoji:"💪",label:"Strong",category:"hands"},{emoji:"❤️",label:"Heart",category:"symbols"},{emoji:"🔥",label:"Fire",category:"symbols"},{emoji:"⭐",label:"Star",category:"symbols"},{emoji:"💯",label:"100",category:"symbols"},{emoji:"✨",label:"Sparkles",category:"symbols"},{emoji:"💥",label:"Boom",category:"symbols"},{emoji:"🎯",label:"Target",category:"symbols"},{emoji:"⚡",label:"Lightning",category:"symbols"},{emoji:"🚀",label:"Rocket",category:"symbols"},{emoji:"💎",label:"Diamond",category:"symbols"},{emoji:"🎬",label:"Clapper",category:"objects"},{emoji:"🎵",label:"Music",category:"objects"},{emoji:"🎤",label:"Mic",category:"objects"},{emoji:"📸",label:"Camera",category:"objects"},{emoji:"🎮",label:"Gaming",category:"objects"},{emoji:"🏆",label:"Trophy",category:"objects"},{emoji:"🎁",label:"Gift",category:"objects"},{emoji:"💡",label:"Idea",category:"objects"},{emoji:"👆",label:"Point Up",category:"arrows"},{emoji:"👇",label:"Point Down",category:"arrows"},{emoji:"👈",label:"Point Left",category:"arrows"},{emoji:"👉",label:"Point Right",category:"arrows"},{emoji:"⬆️",label:"Arrow Up",category:"arrows"},{emoji:"⬇️",label:"Arrow Down",category:"arrows"},{emoji:"🔔",label:"Bell",category:"objects"},{emoji:"💬",label:"Speech",category:"objects"},{emoji:"🏷️",label:"Tag",category:"objects"},{emoji:"📌",label:"Pin",category:"objects"}],ai=[{name:"Title",textSize:64,textColor:"#ffffff",textPosition:"center",textBgColor:"",textBold:!0,textAlign:"center",icon:"title"},{name:"Subtitle",textSize:36,textColor:"#e2e8f0",textPosition:"bottom-center",textBgColor:"",textBold:!1,textAlign:"center",icon:"subtitles"},{name:"Caption",textSize:24,textColor:"#ffffff",textPosition:"bottom-center",textBgColor:"#000000",textBold:!1,textAlign:"center",icon:"closed_caption"},{name:"Lower Third",textSize:28,textColor:"#ffffff",textPosition:"bottom-left",textBgColor:"rgba(0,0,0,0.7)",textBold:!0,textAlign:"left",icon:"video_label"}],oi=["Spline Sans","Arial","Georgia","Courier New","Impact","Comic Sans MS","Trebuchet MS","Verdana","Times New Roman"],ni=[{label:"0.25x",value:.25},{label:"0.5x",value:.5},{label:"1x",value:1},{label:"1.5x",value:1.5},{label:"2x",value:2}];function Pn(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}function An(){if(typeof navigator>"u")return!1;const t=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(t)?!0:navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1}const Ca=`
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
`,Ha=[{key:"low",label:"Low",crf:28},{key:"medium",label:"Medium",crf:23},{key:"high",label:"High",crf:18},{key:"ultra",label:"Ultra",crf:15}],Un=[{key:"webm",label:"WebM"},{key:"mp4",label:"MP4 (via server)"}],Ln=[24,30,60],Nn=a.memo(({items:t,selected:o,onSelect:i,style:n})=>e.jsx("div",{style:{display:"flex",gap:"4px",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"3px",...n},children:t.map(s=>e.jsx("button",{onClick:()=>i(s.key||s),style:{flex:1,padding:"6px 8px",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",background:(s.key||s)===o?"rgba(117,170,219,0.15)":"transparent",color:(s.key||s)===o?"#75aadb":"#64748b"},children:s.label||s},s.key||s))}));Nn.displayName="PillGroup";const wo=a.memo(({isOpen:t,onClose:o,onExport:i,isExporting:n,progress:s,operationLabel:l="Processing",subMessage:c="",resolutions:m,exportPresets:b={},onCancel:p,projectName:g="Untitled",exportResult:x,onDownload:I,onExportAnother:G})=>{const[P,y]=a.useState("480p"),[H,Y]=a.useState("resolution"),[me,J]=a.useState("youtube-1080p"),[re,w]=a.useState("webm"),[Z,le]=a.useState("medium"),[N,W]=a.useState(30),[ye,V]=a.useState(""),[ae,ge]=a.useState(null);a.useEffect(()=>{t&&!ye&&V(Pn(g))},[t,g]);const _=An();if(a.useEffect(()=>{if(!t)return;const S=E=>{E.key==="Escape"&&!n&&o()};return window.addEventListener("keydown",S),()=>window.removeEventListener("keydown",S)},[t,n,o]),a.useEffect(()=>{if(!t)return;const E=document.getElementById("export-modal")?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');E?.length&&E[0].focus()},[t]),a.useEffect(()=>{if(!t)return;let S=!0;return ge(null),go().then(E=>{S&&ge(!!E)}).catch(()=>{S&&ge(!1)}),()=>{S=!1}},[t]),!t)return null;const q=S=>{S.target===S.currentTarget&&!n&&!x&&o()};m?.[P];const Se=Ha.find(S=>S.key===Z),je=[re.toUpperCase(),P,`${N}fps`],Ce=H==="platform"?b[me]?.label:je.join(" · "),ie=()=>{const S=H==="platform"?`preset:${me}`:P;i(S,{format:re,quality:Se?.crf,fps:N,filename:ye||g})},De=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hud-body",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Container · Codec"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Output format",children:Un.map(S=>e.jsx("button",{className:re===S.key?"is-active":"",onClick:()=>w(S.key),role:"radio","aria-checked":re===S.key,children:S.label},S.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Target"}),e.jsxs("div",{className:"hud-segment",role:"radiogroup","aria-label":"Target mode",children:[e.jsx("button",{className:H==="resolution"?"is-active":"",onClick:()=>Y("resolution"),role:"radio","aria-checked":H==="resolution",children:"By Resolution"}),e.jsx("button",{className:H==="platform"?"is-active":"",onClick:()=>Y("platform"),role:"radio","aria-checked":H==="platform",children:"By Platform"})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Signal"}),H==="resolution"?e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Resolution",children:Object.entries(m).map(([S,{label:E,width:X,height:v}])=>{const j=P===S;return e.jsxs("button",{className:`hud-row-item ${j?"is-active":""}`,onClick:()=>y(S),role:"radio","aria-checked":j,children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsx("span",{className:"hud-row-name",children:E}),e.jsxs("span",{className:"hud-row-spec",children:[X,"×",v]}),e.jsxs("span",{className:"hud-row-spec",style:{color:j?"#75AADB":"rgba(255,255,255,0.34)"},children:[Math.round(X*v/1e4)/100,"MP"]})]},S)})}):e.jsx("div",{className:"hud-table",role:"radiogroup","aria-label":"Platform",children:Object.entries(b).map(([S,E])=>{const X=me===S;return e.jsxs("button",{className:`hud-row-item ${X?"is-active":""}`,onClick:()=>J(S),role:"radio","aria-checked":X,style:{gridTemplateColumns:"18px 1fr auto"},children:[e.jsx("span",{className:"hud-row-led","aria-hidden":"true"}),e.jsxs("span",{className:"hud-row-name",children:[E.label,e.jsx("span",{className:"hud-row-sub",style:{gridColumn:"unset",display:"block",marginTop:3},children:E.description})]}),e.jsxs("span",{className:"hud-row-spec",children:[E.width,"×",E.height]})]},S)})})]}),e.jsxs("div",{className:"hud-row-split",children:[e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Quality (CRF)"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Quality",children:Ha.map(S=>e.jsx("button",{className:Z===S.key?"is-active":"",onClick:()=>le(S.key),role:"radio","aria-checked":Z===S.key,title:`CRF ${S.crf}`,children:S.label},S.key))})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Frame Rate"}),e.jsx("div",{className:"hud-segment",role:"radiogroup","aria-label":"Frame rate",children:Ln.map(S=>e.jsxs("button",{className:N===S?"is-active":"",onClick:()=>W(S),role:"radio","aria-checked":N===S,children:[S,"fps"]},S))})]})]}),e.jsxs("div",{className:"hud-row",children:[e.jsx("span",{className:"hud-label",children:"Filename"}),e.jsx("input",{type:"text",className:"hud-input",value:ye,onChange:S=>V(S.target.value),"aria-label":"Export filename",placeholder:"clipcut-export"})]}),e.jsxs("div",{className:"hud-summary",role:"status",children:[e.jsx("span",{className:"hud-summary-dot","aria-hidden":"true"}),e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsxs("div",{className:"hud-summary-text",children:["Ready · ",Ce]}),re==="webm"&&!_&&e.jsx("div",{className:"hud-summary-note",children:"WebM plays on most devices. For iPhone Photos compatibility, choose MP4."}),re==="webm"&&_&&e.jsx("div",{className:"hud-summary-note hud-summary-note--warn",children:"WebM may not play in iPhone Photos. Open the saved file in VLC or CapCut, or choose MP4 instead."}),re==="mp4"&&e.jsxs("div",{className:"hud-summary-note hud-summary-note--warn",children:[ae==null&&"Checking MP4 server availability...",ae===!0&&"MP4 server is online. Export will render locally, then transcode to MP4 on server.",ae===!1&&"MP4 server is currently unavailable. Export will fall back to local WebM."]})]})]})]}),e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Cancel"}),e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:ie,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Render · Export"]})]})]}),ve=()=>{const S=Math.max(0,Math.min(100,Math.round(s)));return e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-progress",children:[e.jsxs("div",{className:"hud-big-readout","aria-live":"polite","aria-atomic":"true",children:[String(S).padStart(2,"0"),e.jsx("span",{className:"pct",children:"%"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hud-op-label",children:l||"Rendering"}),c&&e.jsx("div",{className:"hud-op-sub",children:c})]}),e.jsxs("div",{className:"hud-filmstrip",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":S,children:[e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--top","aria-hidden":"true",children:Array.from({length:24}).map((E,X)=>e.jsx("span",{style:{animationDelay:`${(X*.05).toFixed(2)}s`}},X))}),e.jsx("div",{className:"hud-filmstrip-fill",style:{width:`${S}%`}}),e.jsx("div",{className:"hud-filmstrip-perf hud-filmstrip-perf--bottom","aria-hidden":"true",children:Array.from({length:24}).map((E,X)=>e.jsx("span",{style:{animationDelay:`${(X*.05+.1).toFixed(2)}s`}},X))})]}),e.jsxs("div",{className:"hud-telemetry","aria-label":"Telemetry",children:[e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Format"}),e.jsx("span",{className:"hud-telemetry-value",children:re.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Signal"}),e.jsx("span",{className:"hud-telemetry-value",children:H==="platform"?b[me]?.label||"—":P.toUpperCase()})]}),e.jsxs("div",{className:"hud-telemetry-cell",children:[e.jsx("span",{className:"hud-telemetry-label",children:"Frame Rate"}),e.jsxs("span",{className:"hud-telemetry-value",children:[N,"fps"]})]})]})]})})},ue=()=>p?e.jsx("div",{className:"hud-actions",style:{justifyContent:"center"},children:e.jsx("button",{type:"button",className:"hud-btn hud-btn--danger",onClick:p,children:"Abort render"})}):null,ce=()=>e.jsx("div",{className:"hud-body",children:e.jsxs("div",{className:"hud-complete",children:[e.jsxs("div",{className:"hud-complete-stamp",children:[e.jsx("span",{className:"led","aria-hidden":"true"}),"Export complete · Signal locked"]}),e.jsx("h3",{className:"hud-complete-title",children:"Your file is ready."}),x?.size&&e.jsxs("span",{className:"hud-complete-file",children:[(x.size/(1024*1024)).toFixed(1)," MB · ",re.toUpperCase()]})]})}),xe=()=>e.jsxs("div",{className:"hud-actions",children:[e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:o,children:"Close"}),G&&e.jsx("button",{type:"button",className:"hud-btn hud-btn--ghost",onClick:G,children:"Export another"}),I&&e.jsxs("button",{type:"button",className:"hud-btn hud-btn--primary export-btn",onClick:I,children:[e.jsx(Te,{i:"download",s:14,c:"#04060b"}),"Download"]})]}),we=x?"hud-head-led hud-head-led--green":n?"hud-head-led hud-head-led--amber":"hud-head-led",Ue=x?"Complete":n?"Rendering":"Standby";return e.jsxs("div",{className:"hud-backdrop",onClick:q,role:"dialog","aria-modal":"true","aria-labelledby":"export-modal-title",children:[e.jsx("style",{children:Ca}),e.jsxs("div",{id:"export-modal",className:"hud-console",children:[e.jsxs("div",{className:"hud-head",children:[e.jsxs("div",{className:"hud-head-left",children:[e.jsx("span",{className:we,"aria-hidden":"true"}),e.jsxs("h2",{id:"export-modal-title",className:"hud-head-title",children:[e.jsx("span",{children:"CC · EXPORT"}),e.jsx("span",{className:"sep",children:"//"}),e.jsx("span",{className:"ch-id",children:Ue.toUpperCase()})]})]}),!n&&!x&&e.jsx("button",{onClick:o,className:"hud-head-close","aria-label":"Close export dialog",title:"Close (Escape)",children:e.jsx(Te,{i:"close",s:16,c:"currentColor"})})]}),x?ce():n?ve():De(),!n&&!x&&null,n&&ue(),x&&xe()]})]})});wo.displayName="ExportModal";const $n={Playback:["PLAY_PAUSE","SKIP_FORWARD","SKIP_BACKWARD","SKIP_FORWARD_LARGE","SKIP_BACKWARD_LARGE","FRAME_FORWARD","FRAME_BACKWARD","GO_TO_START","GO_TO_END"],Editing:["SPLIT","DELETE","DESELECT"],Audio:["MUTE","VOLUME_UP","VOLUME_DOWN"],View:["FULLSCREEN"],File:["SAVE","EXPORT","IMPORT"]},vo=a.memo(({isOpen:t,onClose:o})=>(a.useEffect(()=>{if(!t)return;const i=n=>{n.key==="Escape"&&o()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[t,o]),t?e.jsxs("div",{className:"shortcuts-modal-backdrop",onClick:i=>i.target===i.currentTarget&&o(),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3500,backdropFilter:"blur(4px)"},role:"dialog","aria-modal":"true","aria-labelledby":"shortcuts-modal-title",children:[e.jsx("style",{children:Ca}),e.jsxs("div",{className:"shortcuts-modal-content",style:{background:"#1a2332",borderRadius:"12px",padding:"24px",width:"520px",maxWidth:"90vw",maxHeight:"80vh",overflow:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[e.jsxs("h2",{id:"shortcuts-modal-title",style:{margin:0,fontSize:"18px",fontWeight:600,color:"white",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Te,{i:"keyboard",s:22,c:"#75aadb"}),"Keyboard Shortcuts"]}),e.jsx("button",{onClick:o,style:{...et.ghost,padding:"6px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":"Close shortcuts dialog",children:e.jsx(Te,{i:"close",s:20,c:"#94a3b8"})})]}),Object.entries($n).map(([i,n])=>e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{fontSize:"11px",color:"#75aadb",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,margin:"0 0 10px 0"},children:i}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:n.map(s=>{const l=Mn[s];return l?e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:"6px",background:"rgba(255,255,255,0.02)"},children:[e.jsx("span",{style:{fontSize:"13px",color:"#cbd5e1"},children:l.description}),e.jsx("span",{className:"shortcut-key",children:l.key})]},s):null})})]},i))]})]}):null));vo.displayName="KeyboardShortcutsModal";const On=[{id:"new",icon:"add",label:"New Project",shortcut:null},{id:"save",icon:"save",label:"Save",shortcut:"Ctrl+S"},{id:"divider1"},{id:"export",icon:"download",label:"Export",shortcut:"Ctrl+E"},{id:"divider2"},{id:"settings",icon:"settings",label:"Settings",shortcut:null}],ko=a.memo(({isOpen:t,onClose:o,onNewProject:i,onSave:n,onExport:s,onSettings:l,hasMediaToExport:c})=>{const m=a.useRef(null);if(a.useEffect(()=>{if(!t)return;const p=x=>{m.current&&!m.current.contains(x.target)&&o()},g=x=>{x.key==="Escape"&&o()};return requestAnimationFrame(()=>{document.addEventListener("mousedown",p),document.addEventListener("keydown",g)}),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",g)}},[t,o]),!t)return null;const b=p=>{switch(o(),p){case"new":i?.();break;case"save":n?.();break;case"export":c&&s?.();break;case"settings":l?.();break}};return e.jsx("div",{ref:m,className:"menu-dropdown",role:"menu",style:{position:"absolute",top:"100%",left:0,marginTop:"4px",background:"#1a2332",borderRadius:"8px",padding:"4px",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",minWidth:"200px",zIndex:100},children:On.map(p=>{if(p.id.startsWith("divider"))return e.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0"}},p.id);const g=p.id==="export"&&!c;return e.jsxs("button",{className:"menu-dropdown-item",role:"menuitem",onClick:()=>!g&&b(p.id),style:{...et.ghost,display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"6px",width:"100%",textAlign:"left",color:g?"#475569":"#cbd5e1",cursor:g?"not-allowed":"pointer",opacity:g?.5:1,fontSize:"13px",fontFamily:"'Spline Sans', sans-serif"},disabled:g,children:[e.jsx(Te,{i:p.icon,s:16,c:g?"#475569":"#94a3b8"}),e.jsx("span",{style:{flex:1},children:p.label}),p.shortcut&&e.jsx("span",{style:{fontSize:"11px",color:"#475569",fontFamily:"'SF Mono', Monaco, monospace"},children:p.shortcut})]},p.id)})})});ko.displayName="MenuDropdown";const Fn=({projectName:t,onProjectNameChange:o,onExport:i,isExporting:n=!1,exportProgress:s=0,currentOperation:l="",hasMediaToExport:c=!1,resolutions:m={},exportPresets:b={},lastSaved:p=null,canUndo:g=!1,canRedo:x=!1,onUndo:I,onRedo:G,onCancelExport:P,exportSubMessage:y="",onNewProject:H,onSave:Y,onSettings:me,editorLayout:J="default",onLayoutChange:re,forceOpenExport:w=!1,onExportModalClosed:Z,onAiToggle:le,aiPanelOpen:N=!1})=>{const W=ja(),[ye,V]=a.useState(!1),[ae,ge]=a.useState(!1),[_,q]=a.useState(!1),[Se,je]=a.useState(!1),Ce=a.useRef(null);a.useEffect(()=>{const E=X=>{X.target.tagName==="INPUT"||X.target.tagName==="TEXTAREA"||(X.key==="?"||X.shiftKey&&X.key==="/")&&(X.preventDefault(),je(v=>!v))};return window.addEventListener("keydown",E),()=>window.removeEventListener("keydown",E)},[]),a.useEffect(()=>{w&&c&&!n&&(V(!0),Z?.())},[w,c,n,Z]);const ie=a.useCallback(()=>{n||(c?V(!0):console.warn("Export not available:",{hasMediaToExport:c,isExporting:n}))},[c,n]),De=a.useCallback((E,X)=>{i?.(E,X)},[i]),ve=a.useCallback(()=>{n||(V(!1),we(null))},[n]),ue=a.useCallback(E=>{const X=bo(E.target.value,{maxLength:100});o(X)},[o]),ce=a.useCallback(E=>{(E.key==="Enter"||E.key==="Escape")&&E.target.blur()},[]),[xe,we]=a.useState(null);a.useEffect(()=>{!n&&s>=100&&ye&&!xe&&we({size:null}),ye||we(null)},[n,s,ye,xe]);const[Ue,S]=a.useState("");return a.useEffect(()=>{const E=()=>{S(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}))};E();const X=setInterval(E,6e4);return()=>clearInterval(X)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ca}),e.jsxs("header",{style:{...et.topBar,...W?{height:"44px",padding:"0 10px"}:{}},role:"banner","aria-label":"ClipCut editor header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsxs("div",{className:"logo-container",style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},role:"img","aria-label":"ClipCut logo",children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(117, 170, 219, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Te,{i:"movie_edit",s:18,c:"#75aadb"})}),!W&&e.jsx("span",{style:{fontWeight:700,fontSize:"15px",letterSpacing:"-0.3px",color:"white"},children:"ClipCut"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginLeft:"8px",fontSize:"11px"},children:[e.jsxs("div",{ref:Ce,style:{position:"relative"},children:[e.jsx("button",{className:"menu-btn",onClick:()=>q(E=>!E),style:{...et.ghost,display:"flex",alignItems:"center",gap:"2px",color:_?"#75aadb":"#94a3b8"},"aria-haspopup":"menu","aria-expanded":_,"aria-label":"Open menu",children:W?e.jsx(Te,{i:"menu",s:18}):e.jsxs(e.Fragment,{children:["Menu ",e.jsx(Te,{i:"arrow_drop_down",s:16})]})}),e.jsx(ko,{isOpen:_,onClose:()=>q(!1),onNewProject:H,onSave:Y,onExport:ie,onSettings:me,hasMediaToExport:c})]}),!W&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("button",{onClick:I,disabled:!g,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:g?1:.4,cursor:g?"pointer":"not-allowed"},title:"Undo (Ctrl+Z)","aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:14,c:g?"#94a3b8":"#475569"})}),e.jsx("button",{onClick:G,disabled:!x,className:"menu-btn",style:{...et.ghost,padding:"4px 6px",opacity:x?1:.4,cursor:x?"pointer":"not-allowed"},title:"Redo (Ctrl+Shift+Z or Ctrl+Y)","aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:14,c:x?"#94a3b8":"#475569"})})]}),!W&&p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":`Last saved at ${p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}`,title:`Last saved: ${p.toLocaleString()}`,children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Saved ",p.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]}),!W&&!p&&e.jsxs("span",{style:{color:"#475569",display:"flex",alignItems:"center",gap:"4px"},"aria-label":"Auto save at current time",children:[e.jsx(Te,{i:"cloud_done",s:12,c:"#475569"}),"Auto save at ",Ue]})]})]}),e.jsx("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:e.jsx("input",{type:"text",value:t,onChange:ue,onFocus:()=>ge(!0),onBlur:()=>ge(!1),onKeyDown:ce,className:"title-input",style:{...et.titleInput,position:"relative",left:"auto",transform:"none",border:"1px solid transparent",width:W?"120px":"220px",pointerEvents:"auto"},"aria-label":"Project name",title:"Click to edit project name"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:W?"4px":"8px"},children:[le&&e.jsx(ta,{i:"auto_awesome",title:"AI Editor","aria-label":N?"Close AI editor":"Open AI editor",onClick:le,style:N?{color:"#75aadb",background:"rgba(117,170,219,0.12)"}:void 0}),!W&&e.jsx(ta,{i:"keyboard",title:"Keyboard shortcuts","aria-label":"Show keyboard shortcuts",onClick:()=>je(!0)}),!W&&e.jsx(ta,{i:J==="default"?"grid_view":J==="wide-timeline"?"view_agenda":"view_compact",title:`Layout: ${J}`,"aria-label":"Cycle layout",onClick:()=>{const E=["default","wide-timeline","compact"],X=E.indexOf(J);re?.(E[(X+1)%E.length])}}),e.jsxs("button",{onClick:ie,className:W?"":"export-btn",style:{...W?{background:c&&!n?"#22c55e":"rgba(34,197,94,0.5)",border:"none",borderRadius:"20px",padding:"6px 14px",fontSize:"12px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Spline Sans', sans-serif",cursor:c&&!n?"pointer":"not-allowed",minHeight:"32px",minWidth:"auto",transition:"all 0.2s ease"}:{...et.exportBtn,opacity:c&&!n?1:.5,cursor:c&&!n?"pointer":"not-allowed"}},disabled:!c||n,"aria-label":n?"Exporting...":c?"Export video":"Add media to timeline to export",title:n?"Export in progress...":c?"Export video (Ctrl+E)":"Add media to timeline first",children:[e.jsx(Te,{i:"download",s:14,c:W?"#fff":"#0a0a0a"}),n?"Exporting...":"Export"]})]})]}),e.jsx(wo,{isOpen:ye,onClose:ve,onExport:De,isExporting:n,progress:s,operationLabel:l||"Exporting video...",subMessage:y,resolutions:m,exportPresets:b,onCancel:n?P:void 0,projectName:t,exportResult:xe,onDownload:xe?ve:void 0,onExportAnother:xe?()=>we(null):void 0}),e.jsx(vo,{isOpen:Se,onClose:()=>je(!1)})]})},Bn=a.memo(Fn),Dn=`
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
`,So=a.memo(({item:t,isActive:o,onClick:i,shortcut:n,compact:s})=>{const[l,c]=a.useState(!1),m=a.useCallback(b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i(t.id))},[t.id,i]);return e.jsxs("button",{onClick:()=>i(t.id),onKeyDown:m,onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),className:`toolbar-btn ${o?"active":""}`,style:{...et.ghost,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:s?"6px 10px":"6px 14px",flexShrink:0,color:o?"#75aadb":l?"#94a3b8":"#4a5568"},role:"tab","aria-selected":o,"aria-label":`${t.label} panel`,tabIndex:o?0:-1,children:[e.jsx("span",{className:"toolbar-icon",children:e.jsx(Te,{i:t.icon,s:20,c:o?"#75aadb":l?"#94a3b8":"#4a5568"})}),e.jsx("span",{style:{fontSize:"8px",fontWeight:o?700:600,textTransform:"uppercase",letterSpacing:"1px",transition:"color 0.15s ease"},children:t.label}),e.jsxs("div",{className:"toolbar-tooltip",children:[t.label,n&&e.jsx("span",{className:"toolbar-shortcut",children:n})]})]})});So.displayName="ToolbarButton";const zn={media:"1",audio:"2",text:"3",stickers:"4",effects:"5",transition:"6",filters:"7"},Wn=({activeToolbar:t,onToolbarChange:o})=>{const i=ja(),n=a.useCallback(s=>{const l=it.findIndex(c=>c.id===t);if(s.key==="ArrowRight"){s.preventDefault();const c=(l+1)%it.length;o(it[c].id)}else if(s.key==="ArrowLeft"){s.preventDefault();const c=l===0?it.length-1:l-1;o(it[c].id)}else if(s.key>="1"&&s.key<="7"){s.preventDefault();const c=parseInt(s.key)-1;it[c]&&o(it[c].id)}},[t,o]);return e.jsxs("nav",{style:{...et.toolbar,...i?{overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Editor tools",onKeyDown:n,children:[e.jsx("style",{children:Dn}),it.map(s=>e.jsx(So,{item:s,isActive:t===s.id,onClick:o,shortcut:zn[s.id],compact:i},s.id))]})},Vn=a.memo(Wn);async function jo(t,o,i=.3,n=null){await Xe(),n&&Qe(n);const s="input_video.mp4",l="input_audio.mp3",c="output_mixed.mp4";try{await Be(s,t),await Be(l,o),await qe(["-i",s,"-i",l,"-filter_complex",`[1:a]volume=${i}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]`,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k",c]);const m=await He(c);return Ye(m,"video/mp4")}finally{Ge(),await Je([s,l,c])}}async function Kn(t,o,i=null){await Xe(),i&&Qe(i);const n="input_video.mp4",s="input_audio.mp3",l="output_replaced.mp4";try{await Be(n,t),await Be(s,o),await qe(["-i",n,"-i",s,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",l]);const c=await He(l);return Ye(c,"video/mp4")}finally{Ge(),await Je([n,s,l])}}async function Co(t,o=1,i=null){await Xe(),i&&Qe(i);const n="input_volume.mp4",s="output_volume.mp4";try{await Be(n,t),await qe(["-i",n,"-af",`volume=${o}`,"-c:v","copy","-c:a","aac","-b:a","192k",s]);const l=await He(s);return Ye(l,"video/mp4")}finally{Ge(),await Je([n,s])}}async function To(t,o=null){await Xe(),o&&Qe(o);const i="input_mute.mp4",n="output_mute.mp4";try{await Be(i,t),await qe(["-i",i,"-c:v","copy","-an",n]);const s=await He(n);return Ye(s,"video/mp4")}finally{Ge(),await Je([i,n])}}async function Io(t,o="mp3",i=null){await Xe(),i&&Qe(i);const n="input_extract.mp4",s=`output_extract.${o}`,l={mp3:"audio/mpeg",aac:"audio/aac",wav:"audio/wav"},c={mp3:["-c:a","libmp3lame","-b:a","192k"],aac:["-c:a","aac","-b:a","192k"],wav:["-c:a","pcm_s16le"]};try{await Be(n,t),await qe(["-i",n,"-vn",...c[o]||c.mp3,s]);const m=await He(s);return Ye(m,l[o]||"audio/mpeg")}finally{Ge(),await Je([n,s])}}async function Hn(t,o=null){await Xe(),o&&Qe(o);const i="input_normalize.mp4",n="output_normalize.mp4";try{await Be(i,t),await qe(["-i",i,"-af","loudnorm=I=-16:LRA=11:TP=-1.5","-c:v","copy","-c:a","aac","-b:a","192k",n]);const s=await He(n);return Ye(s,"video/mp4")}finally{Ge(),await Je([i,n])}}async function Yn(t,o=0,i=0,n=null,s=null){await Xe(),s&&Qe(s);const l="input_fade.mp4",c="output_fade.mp4";try{await Be(l,t);const m=[];if(o>0&&m.push(`afade=t=in:st=0:d=${o}`),i>0&&n){const x=n-i;m.push(`afade=t=out:st=${x}:d=${i}`)}const b=m.join(","),p=["-i",l,"-c:v","copy"];b?(p.push("-af",b),p.push("-c:a","aac","-b:a","192k")):p.push("-c:a","copy"),p.push(c),await qe(p);const g=await He(c);return Ye(g,"video/mp4")}finally{Ge(),await Je([l,c])}}const ri=Object.freeze(Object.defineProperty({__proto__:null,adjustVolume:Co,extractAudio:Io,fadeAudio:Yn,mixAudio:jo,muteAudio:To,normalizeAudio:Hn,replaceAudio:Kn},Symbol.toStringTag,{value:"Module"})),ka={"top-left":{x:"10",y:"10"},"top-center":{x:"(w-text_w)/2",y:"10"},"top-right":{x:"w-text_w-10",y:"10"},"center-left":{x:"10",y:"(h-text_h)/2"},center:{x:"(w-text_w)/2",y:"(h-text_h)/2"},"center-right":{x:"w-text_w-10",y:"(h-text_h)/2"},"bottom-left":{x:"10",y:"h-text_h-10"},"bottom-center":{x:"(w-text_w)/2",y:"h-text_h-10"},"bottom-right":{x:"w-text_w-10",y:"h-text_h-10"}},Ro=["fade","fadeblack","fadewhite","dissolve","pixelize","wipeleft","wiperight","wipeup","wipedown","slideleft","slideright","slideup","slidedown"];async function Xn(t,o,i={},n=null){await Xe(),n&&Qe(n);const{position:s="bottom-center",fontSize:l=48,fontColor:c="white",backgroundColor:m=null,startTime:b=0,duration:p=0}=i,g="input_text.mp4",x="output_text.mp4";try{await Be(g,t);const I=typeof s=="string"?ka[s]||ka["bottom-center"]:s;let P=`drawtext=text='${o.replace(/'/g,"'\\''").replace(/:/g,"\\:").replace(/\\/g,"\\\\")}':fontsize=${l}:fontcolor=${c}:x=${I.x}:y=${I.y}`;if(m&&(P+=`:box=1:boxcolor=${m}:boxborderw=5`),b>0||p>0){const H=p>0?`between(t,${b},${b+p})`:`gte(t,${b})`;P+=`:enable='${H}'`}await qe(["-i",g,"-vf",P,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",x]);const y=await He(x);return Ye(y,"video/mp4")}finally{Ge(),await Je([g,x])}}async function Gn(t,o,i="fade",n=1,s=null){await Xe(),s&&Qe(s);const l=Ro.includes(i)?i:"fade",c="input_trans_1.mp4",m="input_trans_2.mp4",b="output_transition.mp4";try{await Be(c,t),await Be(m,o);const p=await qn(t),g=Math.max(0,p-n);await qe(["-i",c,"-i",m,"-filter_complex",`[0:v][1:v]xfade=transition=${l}:duration=${n}:offset=${g}[v];[0:a][1:a]acrossfade=d=${n}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",b]);const x=await He(b);return Ye(x,"video/mp4")}finally{Ge(),await Je([c,m,b])}}async function qn(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="metadata",n.onloadedmetadata=()=>{URL.revokeObjectURL(n.src),o(n.duration)},n.onerror=()=>{URL.revokeObjectURL(n.src),i(new Error("Failed to load video"))},n.src=URL.createObjectURL(t)})}async function st(t,o,i=null){if(typeof o!="string"||!/^[a-zA-Z0-9_=:.,\-\s\[\]\/\(\)']+$/.test(o))throw new Error("Invalid FFmpeg filter string");await Xe(),i&&Qe(i);const n="input_filter.mp4",s="output_filter.mp4";try{await Be(n,t),await qe(["-i",n,"-vf",o,"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",s]);const l=await He(s);return Ye(l,"video/mp4")}finally{Ge(),await Je([n,s])}}async function Jn(t,o=0,i=0,n=null){const s=`eq=brightness=${o}:contrast=${1+i}`;return st(t,s,n)}async function Qn(t,o=1,i=null){const n=`eq=saturation=${o}`;return st(t,n,i)}async function Zn(t,o=5,i=null){const n=`boxblur=${o}:${o}`;return st(t,n,i)}async function er(t,o=1,i=null){const n=`unsharp=5:5:${o}:5:5:0`;return st(t,n,i)}async function tr(t,o=1,i=null){await Xe(),i&&Qe(i);const n="input_speed.mp4",s="output_speed.mp4",l=Math.max(.25,Math.min(4,o));try{await Be(n,t);const c=`setpts=${1/l}*PTS`;let m="";if(l<=2&&l>=.5)m=`atempo=${l}`;else if(l>2){const p=Math.ceil(Math.log(l)/Math.log(2)),g=Math.pow(l,1/p);m=Array(p).fill(`atempo=${g}`).join(",")}else{const p=Math.ceil(Math.log(1/l)/Math.log(2)),g=Math.pow(l,1/p);m=Array(p).fill(`atempo=${g}`).join(",")}await qe(["-i",n,"-filter_complex",`[0:v]${c}[v];[0:a]${m}[a]`,"-map","[v]","-map","[a]","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","192k",s]);const b=await He(s);return Ye(b,"video/mp4")}finally{Ge(),await Je([n,s])}}async function ar(t,o=0,i=0,n=null,s=null){await Xe(),s&&Qe(s);const l="input_fade.mp4",c="output_fade.mp4";try{await Be(l,t);const m=[];if(o>0&&m.push(`fade=t=in:st=0:d=${o}`),i>0&&n){const p=n-i;m.push(`fade=t=out:st=${p}:d=${i}`)}if(m.length===0){const p=await He(l);return Ye(p,"video/mp4")}await qe(["-i",l,"-vf",m.join(","),"-c:v","libx264","-preset","fast","-crf","23","-c:a","copy",c]);const b=await He(c);return Ye(b,"video/mp4")}finally{Ge(),await Je([l,c])}}async function or(t,o=90,i=null){const n={90:"transpose=1",180:"transpose=1,transpose=1",270:"transpose=2","-90":"transpose=2"},s=n[o]||n[90];return st(t,s,i)}async function nr(t,o="horizontal",i=null){return st(t,o==="vertical"?"vflip":"hflip",i)}async function rr(t,o,i=null){const{width:n,height:s,x:l=0,y:c=0}=o,m=`crop=${n}:${s}:${l}:${c}`;return st(t,m,i)}const ba=15,ir=85;function sr(){const[t,o]=a.useState(!1),[i,n]=a.useState(fa()),[s,l]=a.useState(0),[c,m]=a.useState(0),[b,p]=a.useState(null),[g,x]=a.useState(null),I=a.useRef(!0);a.useEffect(()=>{I.current=!0;const v=rn(j=>{I.current&&(m(j.loadProgress),j.error&&p(j.error))});return()=>{I.current=!1,Ge(),v()}},[]);const G=a.useCallback(async()=>{if(fa())return n(!0),!0;o(!0),p(null);try{return await Xe(),I.current&&(n(!0),o(!1)),!0}catch(v){return I.current&&(p(aa(v,"ffmpeg")),o(!1)),!1}},[]),P=a.useCallback(({progress:v})=>{I.current&&l(v)},[]),y=a.useCallback(async(v,j)=>{if(!fa()&&!await G())throw new Error("FFmpeg not loaded");x(v),l(0),p(null);const M=({progress:z=0,time:pe=0})=>{const fe=ba+Math.round(z/100*ir),ze=Math.max(ba,Math.min(99,fe));P({progress:ze,time:pe})};try{P({progress:ba});const z=await j(M);return I.current&&(l(100),x(null),setTimeout(()=>{I.current&&l(0)},350)),z}catch(z){if(I.current){const fe=z?.name==="AbortError"||/abort|cancel/i.test(z?.message||"");p(fe?"Operation cancelled":aa(z,"ffmpeg")),l(0),x(null)}const pe=(z?.message||"").toLowerCase();if(pe.includes("wasm")||pe.includes("memory")||pe.includes("abort")||pe.includes("sharedarraybuffer"))try{await sn(),I.current&&n(!1)}catch{}throw z}},[G,P]),H=a.useCallback(async(v,j,M)=>y("trim video",z=>ln(v,j,M,z)),[y]),Y=a.useCallback(async(v,j)=>y("split video",M=>cn(v,j,M)),[y]),me=a.useCallback(async v=>y("merge clips",j=>dn(v,j)),[y]),J=a.useCallback(async(v,j)=>y("export video",M=>un(v,j,M)),[y]),re=a.useCallback(async(v,j)=>{const M=oa[j];return y(`export for ${M?.label||j}`,z=>pn(v,j,z))},[y]),w=a.useCallback(async v=>mn(v),[]),Z=a.useCallback(async(v,j=0)=>fn(v,j),[]),le=a.useCallback(async v=>y("convert to web format",j=>hn(v,"mp4",j)),[y]),N=a.useCallback(async(v,j,M=.3)=>y("mix audio",z=>jo(v,j,M,z)),[y]),W=a.useCallback(async(v,j)=>y("adjust volume",M=>Co(v,j,M)),[y]),ye=a.useCallback(async v=>y("mute audio",j=>To(v,j)),[y]),V=a.useCallback(async(v,j="mp3")=>y("extract audio",M=>Io(v,j,M)),[y]),ae=a.useCallback(async(v,j,M={})=>y("add text",z=>Xn(v,j,M,z)),[y]),ge=a.useCallback(async(v,j,M="fade",z=1)=>y("add transition",pe=>Gn(v,j,M,z,pe)),[y]),_=a.useCallback(async(v,j)=>y("change speed",M=>tr(v,j,M)),[y]),q=a.useCallback(async(v,j,M,z)=>y("add fade",pe=>ar(v,j,M,z,pe)),[y]),Se=a.useCallback(async(v,j)=>y("rotate video",M=>or(v,j,M)),[y]),je=a.useCallback(async(v,j)=>y("flip video",M=>nr(v,j,M)),[y]),Ce=a.useCallback(async(v,j)=>y("crop video",M=>rr(v,j,M)),[y]),ie=a.useCallback(async(v,j,M)=>y("adjust colors",z=>Jn(v,j,M,z)),[y]),De=a.useCallback(async(v,j)=>y("adjust saturation",M=>Qn(v,j,M)),[y]),ve=a.useCallback(async(v,j)=>y("apply filter",M=>st(v,j,M)),[y]),ue=a.useCallback(async(v,j)=>y("apply blur",M=>Zn(v,j,M)),[y]),ce=a.useCallback(async(v,j)=>y("apply sharpen",M=>er(v,j,M)),[y]),xe=a.useCallback(()=>{p(null)},[]),we=a.useCallback(()=>{l(0),x(null)},[]),Ue=a.useCallback(async()=>{await bn()},[]),S=a.useCallback(()=>{vn(),I.current&&(x(null),l(0),p("Operation cancelled"))},[]),E=a.useCallback(async()=>{await gn()},[]),X=a.useCallback(()=>{const v=wn(),j=yn();return{usage:v,usageFormatted:xn(v),limitExceeded:j}},[]);return{isLoading:t,isReady:i,progress:s,loadProgress:c,error:b,currentOperation:g,initialize:G,preload:Ue,clearError:xe,resetProgress:we,cancelOperation:S,clearMemory:E,getMemoryInfo:X,trimVideo:H,splitVideo:Y,mergeClips:me,exportVideo:J,exportWithPreset:re,getVideoInfo:w,generateThumbnail:Z,convertToWebFormat:le,mixAudio:N,adjustVolume:W,muteAudio:ye,extractAudio:V,addTextOverlay:ae,addTransition:ge,changeSpeed:_,addFade:q,rotateVideo:Se,flipVideo:je,cropVideo:Ce,adjustBrightnessContrast:ie,adjustSaturation:De,applyFilter:ve,applyBlur:ue,applySharpen:ce,resolutions:xo,exportPresets:oa,textPositions:ka,transitionTypes:Ro}}const lr="clipcut-thumbnails",cr=1,Ct="thumbnails";let Jt=null;function Mo(){return Jt||(Jt=new Promise((t,o)=>{const i=indexedDB.open(lr,cr);i.onerror=()=>{console.warn("[ThumbnailCache] Failed to open database"),o(i.error)},i.onsuccess=()=>{t(i.result)},i.onupgradeneeded=n=>{const s=n.target.result;if(!s.objectStoreNames.contains(Ct)){const l=s.createObjectStore(Ct,{keyPath:"id"});l.createIndex("videoId","videoId",{unique:!1}),l.createIndex("timestamp","timestamp",{unique:!1})}}}),Jt)}function Eo(t,o){return`${t}_t${Math.floor(o*10)}`}async function dr(t,o){try{const i=await Mo(),n=Eo(t,o);return new Promise(s=>{const m=i.transaction(Ct,"readonly").objectStore(Ct).get(n);m.onsuccess=()=>{const b=m.result;b&&b.data?s(new Blob([b.data],{type:"image/jpeg"})):s(null)},m.onerror=()=>s(null)})}catch(i){return console.warn("[ThumbnailCache] Error getting cached thumbnail:",i),null}}async function ur(t,o,i){try{const n=await Mo(),s=Eo(t,o),l=await i.arrayBuffer();return new Promise(c=>{const m=n.transaction(Ct,"readwrite");m.objectStore(Ct).put({id:s,videoId:t,time:o,data:l,timestamp:Date.now()}),m.oncomplete=()=>c(!0),m.onerror=()=>c(!1)})}catch(n){console.warn("[ThumbnailCache] Error caching thumbnail:",n)}}function Qt(t){return new Promise((o,i)=>{const n=URL.createObjectURL(t);if(t.type?.startsWith("audio/")){const m=new Audio;m.preload="metadata",m.onloadedmetadata=()=>{URL.revokeObjectURL(n),o({duration:m.duration||0,width:0,height:0})},m.onerror=()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},m.src=n;return}const l=document.createElement("video");l.preload="metadata",l.muted=!0;const c=setTimeout(()=>{URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},5e3);l.onloadedmetadata=()=>{clearTimeout(c),URL.revokeObjectURL(n),o({duration:isFinite(l.duration)?l.duration:0,width:l.videoWidth||0,height:l.videoHeight||0})},l.onerror=()=>{clearTimeout(c),URL.revokeObjectURL(n),o({duration:0,width:0,height:0})},l.src=n})}function Ut(t,o=0){return new Promise((i,n)=>{const s=URL.createObjectURL(t),l=document.createElement("video");l.preload="auto",l.muted=!0;const c=setTimeout(()=>{m(),i(Zt())},8e3);function m(){clearTimeout(c),URL.revokeObjectURL(s)}l.onloadeddata=()=>{const b=Math.min(o,l.duration-.1);l.currentTime=Math.max(0,b)},l.onseeked=()=>{try{const b=document.createElement("canvas"),g=Math.min(1,320/(l.videoWidth||320));b.width=Math.round((l.videoWidth||320)*g),b.height=Math.round((l.videoHeight||180)*g),b.getContext("2d").drawImage(l,0,0,b.width,b.height),b.toBlob(I=>{m(),i(I||Zt())},"image/jpeg",.7)}catch{m(),i(Zt())}},l.onerror=()=>{m(),i(Zt())},l.src=s})}function Zt(){const t=document.createElement("canvas");t.width=160,t.height=90;const o=t.getContext("2d"),i=o.createLinearGradient(0,0,160,90);return i.addColorStop(0,"#1a2332"),i.addColorStop(1,"#0a0a0a"),o.fillStyle=i,o.fillRect(0,0,160,90),o.fillStyle="rgba(117, 170, 219, 0.3)",o.beginPath(),o.moveTo(65,30),o.lineTo(65,60),o.lineTo(100,45),o.closePath(),o.fill(),new Promise(n=>{t.toBlob(s=>n(s||new Blob),"image/jpeg",.7)})}const Ya={"480p":{width:854,height:480},"720p":{width:1280,height:720},"1080p":{width:1920,height:1080}},Xa={"480p":{28:1e6,23:2e6,18:4e6,15:6e6},"720p":{28:25e5,23:5e6,18:8e6,15:12e6},"1080p":{28:4e6,23:8e6,18:16e6,15:24e6}};function pr(t,o){const i=Xa[t]||Xa["1080p"];return i[o]||i[18]}const Ga={"top-left":{x:.05,y:.08,align:"left",baseline:"top"},"top-center":{x:.5,y:.08,align:"center",baseline:"top"},"top-right":{x:.95,y:.08,align:"right",baseline:"top"},"center-left":{x:.05,y:.5,align:"left",baseline:"middle"},center:{x:.5,y:.5,align:"center",baseline:"middle"},"center-right":{x:.95,y:.5,align:"right",baseline:"middle"},"bottom-left":{x:.05,y:.92,align:"left",baseline:"bottom"},"bottom-center":{x:.5,y:.92,align:"center",baseline:"bottom"},"bottom-right":{x:.95,y:.92,align:"right",baseline:"bottom"}};function qa(t,o,i,n){const s=o.text||"";if(!s.trim())return;const l=Math.max(12,Math.round((o.textSize||48)*(n/1080))),c=o.textBold?"bold":"normal",m=o.textItalic?"italic":"normal",b=o.textFontFamily||"Spline Sans";t.font=`${m} ${c} ${l}px '${b}', Arial, sans-serif`;let p,g,x,I;if(o.textX!=null&&o.textY!=null)p=o.textX/100*i,g=o.textY/100*n,x="center",I="middle";else{const G=Ga[o.textPosition||"center"]||Ga.center;p=G.x*i,g=G.y*n,x=G.align,I=G.baseline}if(t.textAlign=x,t.textBaseline=I,o.textBgColor&&o.textBgColor!=="transparent"){const G=t.measureText(s),P=l*.25,y=G.width,H=l*1.2;let Y=p-P;x==="center"?Y=p-y/2-P:x==="right"&&(Y=p-y-P);let me=g-P;I==="middle"?me=g-H/2-P:I==="bottom"&&(me=g-H-P),t.fillStyle=o.textBgColor,t.fillRect(Y,me,y+P*2,H+P*2)}if(t.shadowColor="rgba(0,0,0,0.7)",t.shadowBlur=4,t.shadowOffsetX=0,t.shadowOffsetY=1,t.fillStyle=o.textColor||"#ffffff",t.fillText(s,p,g),o.textUnderline){const G=t.measureText(s);let P=p;x==="center"?P=p-G.width/2:x==="right"&&(P=p-G.width);const y=I==="top"?g+l:I==="middle"?g+l/2:g;t.strokeStyle=o.textColor||"#ffffff",t.lineWidth=Math.max(1,l/20),t.beginPath(),t.moveTo(P,y+2),t.lineTo(P+G.width,y+2),t.stroke()}t.shadowColor="transparent",t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0}function mr(t){return new Promise((o,i)=>{const n=document.createElement("video");n.preload="auto",n.playsInline=!0,n.muted=!1,n.style.position="fixed",n.style.top="-9999px",n.style.left="-9999px",n.style.width="1px",n.style.height="1px",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s;const l=()=>{n.removeEventListener("error",c)},c=()=>{l(),i(new Error(`Failed to load video: ${n.error?.message||"unknown error"}`))};n.addEventListener("error",c),n.addEventListener("loadeddata",()=>{l(),o({video:n,url:s})},{once:!0}),n.load()})}function fr(t){return new Promise((o,i)=>{const n=document.createElement("audio");n.preload="auto",n.style.display="none",document.body.appendChild(n);const s=t instanceof Blob?URL.createObjectURL(t):t;n.src=s,n.addEventListener("error",()=>{i(new Error("Failed to load audio"))}),n.addEventListener("canplaythrough",()=>{o({audio:n,url:s})},{once:!0}),n.load()})}function hr(){const t=["video/webm;codecs=vp8,opus","video/webm;codecs=vp8","video/webm;codecs=vp9,opus","video/webm;codecs=vp9","video/webm"];for(const o of t)if(MediaRecorder.isTypeSupported(o))return o;return""}function br(t){const o=[];return t.brightness!=null&&t.brightness!==0&&o.push(`brightness(${1+t.brightness/100})`),t.contrast!=null&&t.contrast!==0&&o.push(`contrast(${1+t.contrast/100})`),t.saturation!=null&&t.saturation!==0&&o.push(`saturate(${1+t.saturation/100})`),t.blur!=null&&t.blur>0&&o.push(`blur(${t.blur}px)`),o.length>0?o.join(" "):"none"}function ga(t){const o=Math.floor(t/60),i=Math.floor(t%60);return`${o}:${i.toString().padStart(2,"0")}`}async function gr({clips:t,bgMusic:o=null,totalDuration:i,resolution:n="1080p",settings:s={},onProgress:l,abortSignal:c}){const{quality:m=23,fps:b=30}=s,p=Ya[n]||Ya["1080p"],{width:g,height:x}=p,I=pr(n,m),G=hr();if(Pt({category:"export",message:"canvasExport.start",level:"info",data:{resolution:n,fps:b,quality:m,totalDuration:i,clipCount:t?.length??0}}),!G)throw Pt({category:"export",message:"canvasExport.no_mime_support",level:"error"}),new Error("Your browser does not support MediaRecorder for WebM. Please use Chrome or Firefox.");const P=t.filter(_=>_.type!=="audio"&&_.type!=="text"&&_.type!=="sticker"&&_.file).sort((_,q)=>_.startTime-q.startTime),H=t.filter(_=>_.type==="text"||_.type==="sticker"||_.text?.trim()).map(_=>{const q=_.startTime||0;return{..._,_start:q,_end:q+(_.duration||i)}});if(P.length===0)throw Pt({category:"export",message:"canvasExport.no_video_clips",level:"error"}),new Error("No video clips to export.");const Y=document.createElement("canvas");Y.width=g,Y.height=x;const me=Y.getContext("2d"),J=new AudioContext,re=J.createMediaStreamDestination();let w=null,Z=null,le=null;if(o?.file)try{const _=await fr(o.file);w=_.audio,Z=_.url,w.loop=!0;const q=J.createMediaElementSource(w);le=J.createGain(),le.gain.value=o.volume??.3,q.connect(le),le.connect(re)}catch(_){console.warn("Could not load background music, continuing without it:",_),w=null}const N=Y.captureStream(b),W=re.stream.getAudioTracks();for(const _ of W)N.addTrack(_);const ye=[],V=new MediaRecorder(N,{mimeType:G,videoBitsPerSecond:I,audioBitsPerSecond:128e3});V.ondataavailable=_=>{_.data.size>0&&ye.push(_.data)},V.start(1e3),w&&(w.currentTime=0,w.play().catch(()=>{}));const ae=Date.now();for(let _=0;_<P.length&&!c?.aborted;_++){const q=P[_],Se=q.trimStart||0,je=q.duration||0,Ce=q.speed||1,{video:ie,url:De}=await mr(q.file);let ve=null;try{ve=J.createMediaElementSource(ie);const ce=J.createGain();ce.gain.value=q.isMuted?0:q.volume??1,ve.connect(ce),ce.connect(re)}catch(ce){console.warn("Could not route clip audio:",ce)}ie.currentTime=Se,ie.playbackRate=Ce;const ue=br(q);await new Promise(ce=>{ie.addEventListener("seeked",ce,{once:!0})}),await ie.play(),await new Promise((ce,xe)=>{let we;const Ue=Se+je,S=q.fadeIn||0,E=q.fadeOut||0,X=()=>{if(c?.aborted){cancelAnimationFrame(we),ie.pause(),ce();return}const v=ie.currentTime,j=v-Se;if(je>0&&v>=Ue-.05){ie.pause(),Ja(me,ie,g,x,ue,q,j,je,S,E,H,q.startTime+j),ce();return}Ja(me,ie,g,x,ue,q,j,je,S,E,H,q.startTime+j);const M=q.startTime+j,z=i>0?Math.min(99,M/i*100):0,pe=(Date.now()-ae)/1e3,fe=z>1?pe/z*(100-z):0;l?.({percent:Math.round(z),elapsed:ga(pe),eta:ga(fe),label:P.length>1?`Exporting clip ${_+1}/${P.length}`:"Exporting video..."}),we=requestAnimationFrame(X)};ie.addEventListener("ended",()=>{cancelAnimationFrame(we),ie.pause(),ce()},{once:!0}),ie.addEventListener("error",()=>{cancelAnimationFrame(we),xe(new Error(`Video playback error during export of clip ${_+1}`))},{once:!0}),we=requestAnimationFrame(X)}),ie.pause(),ie.src="",ie.load(),document.body.removeChild(ie),URL.revokeObjectURL(De),q.startTime+je}w&&(w.pause(),w.src="",document.body.removeChild(w),Z&&URL.revokeObjectURL(Z));const ge=await new Promise(_=>{V.onstop=()=>{const q=new Blob(ye,{type:G});_(q)},V.stop()});if(N.getTracks().forEach(_=>_.stop()),re.stream.getTracks().forEach(_=>_.stop()),await J.close().catch(()=>{}),l?.({percent:100,elapsed:ga((Date.now()-ae)/1e3),eta:"0:00",label:"Complete"}),c?.aborted)throw Pt({category:"export",message:"canvasExport.cancelled",level:"warning"}),new Error("Export cancelled.");return Pt({category:"export",message:"canvasExport.complete",level:"info",data:{sizeBytes:ge.size,duration:i,elapsedMs:Date.now()-ae}}),{blob:ge,duration:i,size:ge.size}}function Ja(t,o,i,n,s,l,c,m,b,p,g,x){t.save();let I=1;b>0&&c<b&&(I=c/b),p>0&&m>0&&m-c<p&&(I=Math.min(I,(m-c)/p)),t.globalAlpha=Math.max(0,Math.min(1,I)),s&&s!=="none"&&(t.filter=s),l.rotation&&(t.translate(i/2,n/2),t.rotate(l.rotation*Math.PI/180),t.translate(-i/2,-n/2));const G=o.videoWidth||i,P=o.videoHeight||n,y=Math.min(i/G,n/P),H=G*y,Y=P*y,me=(i-H)/2,J=(n-Y)/2;t.fillStyle="#000000",t.fillRect(0,0,i,n),t.drawImage(o,me,J,H,Y),t.filter="none",t.globalAlpha=1;for(const re of g)x>=re._start&&x<=re._end&&qa(t,re,i,n);l.text?.trim()&&l.type!=="text"&&qa(t,l,i,n),t.restore()}const xr="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.25s ease",yr=80,wr=[.7,.95],vr=[.4,.7,.9],kr=a.memo(function({isOpen:o,onClose:i,title:n,zIndex:s=2900,children:l}){const c=a.useRef(null),m=a.useRef({startY:0,isDragging:!1,startSnap:0}),[b,p]=a.useState(0),[g,x]=a.useState(!1),[I,G]=a.useState(!1),[P,y]=a.useState(0);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const V=window.matchMedia("(orientation: landscape) and (max-width: 900px)"),ae=()=>G(V.matches);return ae(),V.addEventListener?V.addEventListener("change",ae):V.addListener(ae),()=>{V.removeEventListener?V.removeEventListener("change",ae):V.removeListener(ae)}},[]);const H=I?vr:wr,Y=H[Math.min(P,H.length-1)]??H[0];a.useEffect(()=>{o&&y(0),p(0)},[o,I]),a.useEffect(()=>{if(o){const V=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=V}}},[o]);const me=a.useCallback(V=>{m.current.startY=V.touches[0].clientY,m.current.isDragging=!0,m.current.startSnap=P,x(!0)},[P]),J=a.useCallback(V=>{if(!m.current.isDragging)return;const ae=V.touches[0].clientY-m.current.startY;p(ae)},[]),re=a.useCallback(()=>{if(!m.current.isDragging)return;m.current.isDragging=!1,x(!1);const V=b,ae=window.innerHeight||800;if(V>yr&&m.current.startSnap===0){p(0),i();return}if(H.length>1){const ge=V<0?-1:V>0?1:0,_=ae*.08,q=Math.round(Math.abs(V)/_);if(q>0){let Se=m.current.startSnap-ge*q;Se=Math.max(0,Math.min(H.length-1,Se)),y(Se)}}p(0)},[b,i,H]),w={position:"fixed",inset:0,bottom:"56px",background:"rgba(0,0,0,0.4)",zIndex:s-100,opacity:o?1:0,pointerEvents:o?"auto":"none",transition:"opacity 0.3s ease"},Z={position:"fixed",bottom:"56px",left:0,right:0,height:`${Math.round(Y*100)}vh`,zIndex:s,background:"#0e1218",borderTop:"2px solid rgba(117, 170, 219, 0.15)",borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",transform:o?`translateY(${Math.max(0,b)}px)`:"translateY(100%)",transition:g?"none":xr},le={flexShrink:0,cursor:"grab",touchAction:"none"},N={width:"36px",height:"4px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"8px auto 6px"},W={fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"center",padding:"0 16px 8px",textTransform:"uppercase",letterSpacing:"0.5px"},ye={flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:w,onClick:i}),e.jsxs("div",{ref:c,style:Z,"aria-hidden":!o,children:[e.jsxs("div",{style:le,onTouchStart:me,onTouchMove:J,onTouchEnd:re,children:[e.jsx("div",{style:N}),n&&e.jsx("div",{style:W,children:n})]}),e.jsx("div",{style:ye,children:l})]})]})}),ii=.1,_o=8,si=3,li=t=>5*Math.pow(250/5,t/100),ci=(t,o)=>t*o,di=(t,o)=>t/o,ui=(t,o,i)=>{const n=new Set([0,i]);for(const s of t)s.id!==o&&(n.add(s.startTime),n.add(s.startTime+s.duration));return[...n].sort((s,l)=>s-l)},Qa=(t,o,i,n=_o)=>{const s=n/i;let l=t,c=null,m=s;for(const b of o){const p=Math.abs(t-b);p<m&&(m=p,l=b,c=b)}return{time:l,snappedTo:c}},pi=(t,o,i,n,s=_o)=>{const l=Qa(t,i,n,s),c=Qa(t+o,i,n,s),m=l.snappedTo!==null?Math.abs(t-l.time):1/0,b=c.snappedTo!==null?Math.abs(t+o-c.time):1/0;return m<=b&&l.snappedTo!==null?{startTime:l.time,snappedTo:l.snappedTo}:c.snappedTo!==null?{startTime:c.time-o,snappedTo:c.snappedTo}:{startTime:t,snappedTo:null}},Sr=t=>{const i=80/t,n=[.1,.25,.5,1,2,5,10,15,30,60,120,300];for(const s of n)if(s>=i*.6)return s;return 300},mi=(t,o)=>{const i=Sr(o),n=i<=1?4:i<=5?5:4,s=i/n,l=[],c=t+i;for(let m=0;m<=c;m+=s){const b=m%i;if(b<.001||Math.abs(b-i)<.001){const g=Math.floor(m/60),x=m%60,I=x===Math.floor(x)?Math.floor(x).toString().padStart(2,"0"):x.toFixed(1).padStart(4,"0");l.push({time:m,label:`${g}:${I}`,major:!0})}else l.push({time:m,label:"",major:!1})}return l},Za=t=>{t<0&&(t=0);const o=Math.floor(t/60),i=t%60;return`${o}:${i.toFixed(1).padStart(4,"0")}`},fi=t=>{if(t<60)return`${t.toFixed(1)}s`;const o=Math.floor(t/60),i=(t%60).toFixed(0);return`${o}:${i.padStart(2,"0")}`},jr=t=>t?.type!=="audio"&&t?.type!=="text",Po=t=>jr(t)&&!t?.blobUrl&&!!t?._mediaError,Cr=t=>t?.type!=="audio"&&!t?.blobUrl&&!!t?._mediaError;function Tr({restoredClips:t=[],mediaItems:o=[],projectName:i="Untitled Project"}){const n=t.filter(Po).length,s=o.filter(Cr).length,l=n>0||s>0;return{clips:t,mediaItems:o,unresolvedClipCount:n,unresolvedMediaCount:s,hasUnavailableMedia:l,notification:l?{level:"warning",message:`Loaded "${i}" — ${n} clip(s) need media re-import`}:{level:"success",message:`Loaded "${i}" (${t.length} clips)`}}}function hi({videoSrc:t=null,hasTimelineClips:o=!1,hasUnavailableMediaClips:i=!1,isRestoringMedia:n=!1}){return n?{title:"Restoring media...",description:"Loading media files from storage",showImportHint:!1}:t?{title:null,description:null,showImportHint:!1}:i?{title:"Media missing",description:"This project still has clips, but one or more source files need to be re-imported.",showImportHint:!0}:o?{title:"No clip at playhead",description:"Move the playhead over a clip on the timeline to preview",showImportHint:!1}:{title:"No media loaded",description:"Import media and add clips to the timeline to preview",showImportHint:!0}}function Ir(t=[]){return t.some(Po)}function Rr({projectId:t,isRestored:o,hasBeenNonEmpty:i,clipsCount:n,mediaItemsCount:s}){return t?o?(n||0)===0&&(s||0)===0&&!i?{skip:!0,reason:"empty-without-session-edit"}:{skip:!1,reason:null}:{skip:!0,reason:"restore-in-progress"}:{skip:!1,reason:null}}let eo=!1;function Mr(){if(eo)return;const t=Tn();if(!t)return;eo=!0;const o=typeof AbortSignal<"u"&&AbortSignal.timeout?{signal:AbortSignal.timeout(5e3)}:{};fetch(`${t}/health`,{method:"GET",mode:"cors",cache:"no-store",...o}).catch(i=>{i?.message})}const to=a.lazy(()=>Fe(()=>import("./BlTcfLWv.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Er=a.lazy(()=>Fe(()=>import("./DnkO4jUD.js"),__vite__mapDeps([11,1,6,3,4,5,7,8,9,2,10]))),ao=a.lazy(()=>Fe(()=>import("./DClj_HD6.js"),__vite__mapDeps([12,1,13,6,3,4,5,7,8,9,2,10]))),oo=a.lazy(()=>Fe(()=>import("./BwkyYyae.js"),__vite__mapDeps([14,1,6,3,4,5,7,8,9,2,10]))),no=a.lazy(()=>Fe(()=>import("./C_fyOyVy.js"),__vite__mapDeps([15,1,13,3,4,5,6,7,8,9,2,10]))),ro=a.lazy(()=>Fe(()=>import("./eGzGB8ND.js"),__vite__mapDeps([16,1,13,3,4,5,6,7,8,9,2,10]))),io=a.lazy(()=>Fe(()=>import("./DYfEiMiQ.js"),__vite__mapDeps([17,1,3,4,5,6,7,8,9,2,10]))),so=a.lazy(()=>Fe(()=>import("./w_LyuqDI.js"),__vite__mapDeps([18,1,3,4,5,6,7,8,9,2,10]))),lo=a.lazy(()=>Fe(()=>import("./DbW17T9F.js"),__vite__mapDeps([19,1,13,3,4,5,6,7,8,9,2,10]))),co=a.lazy(()=>Fe(()=>import("./Cpjqc8X5.js"),__vite__mapDeps([20,1,6,3,4,21,5,7,8,9,2,10]))),uo=a.lazy(()=>Fe(()=>import("./C-nCNX8c.js"),__vite__mapDeps([22,1,3,4,5,6,7,8,9,2,10]))),_r=`
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
  ${En}
  ${Rn}
`;function xa(t,o,i,n=!1){const s=a.useRef(!1),l=a.useRef(0),c=a.useRef(0);return a.useCallback((b,p)=>{b.preventDefault(),s.current=!0,l.current=t==="y"?b.clientY:b.clientX,c.current=p;const g=b.currentTarget;g.classList.add("dragging");const x=G=>{if(!s.current)return;const P=t==="y"?l.current-G.clientY:G.clientX-l.current,y=n?-P:P;o(c.current+y)},I=()=>{s.current=!1,g.classList.remove("dragging"),document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",I),document.body.style.cursor="",document.body.style.userSelect=""};document.addEventListener("mousemove",x),document.addEventListener("mouseup",I),document.body.style.cursor=t==="y"?"row-resize":"col-resize",document.body.style.userSelect="none"},[t,o,i,n])}const Pr=280,po=280,mo=320,fo=360;function ya(t){return Math.max(200,Math.min(400,Math.floor(t*.25)))}function wa(t){return Math.max(220,Math.min(400,Math.floor(t*.25)))}const ho={width:"100%",minWidth:0,minHeight:0,alignSelf:"stretch"},jt=a.memo(({width:t,height:o="100%"})=>e.jsx("div",{style:{width:t,height:o,background:"linear-gradient(180deg, #0f1620 0%, #0c1018 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderRight:"1px solid rgba(117,170,219,0.06)"},children:e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}})}));jt.displayName="PanelLoadingFallback";const Sa=a.memo(()=>e.jsx("div",{style:{height:"220px",background:"linear-gradient(180deg, #0c1018 0%, #08090c 100%)",display:"flex",alignItems:"center",justifyContent:"center",borderTop:"2px solid rgba(117,170,219,0.08)"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"20px",height:"20px",border:"2px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("span",{style:{color:"#3d4a5c",fontSize:"11px",fontWeight:500},children:"Loading timeline..."})]})}));Sa.displayName="TimelineLoadingFallback";const va=[{target:"media-panel",title:"Media Library",desc:"Import videos and audio files here. Drag them to the timeline to start editing.",position:"right"},{target:"player",title:"Preview",desc:"Watch your edit in real-time. Effects and text overlays preview live without rendering.",position:"bottom"},{target:"inspector",title:"Inspector",desc:"Adjust clip properties — filters, speed, volume, text overlays, and transforms.",position:"left"},{target:"timeline",title:"Timeline",desc:"Arrange, trim, split, and reorder clips. Use Ctrl+C/V to copy/paste.",position:"top"}],Ao=a.memo(({onComplete:t})=>{const[o,i]=a.useState(0),n=va[o],s=o===va.length-1;return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9e3,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:l=>{l.target===l.currentTarget&&t()},children:e.jsxs("div",{style:{background:"#1a2332",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"90%",border:"1px solid rgba(117,170,219,0.2)",boxShadow:"0 16px 64px rgba(0,0,0,0.5)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(117,170,219,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"#75aadb"},children:o+1}),e.jsx("span",{style:{fontSize:"15px",fontWeight:600,color:"#f1f5f9"},children:n.title})]}),e.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",lineHeight:1.6,margin:"0 0 16px"},children:n.desc}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{display:"flex",gap:"4px"},children:va.map((l,c)=>e.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:c===o?"#75aadb":"rgba(255,255,255,0.1)"}},c))}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:t,style:{padding:"8px 16px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",background:"transparent",color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:"Skip"}),e.jsx("button",{onClick:()=>s?t():i(l=>l+1),style:{padding:"8px 20px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #75aadb, #5a8cbf)",color:"#0a0a0a",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"'Spline Sans', sans-serif"},children:s?"Get Started":"Next"})]})]})]})})});Ao.displayName="WalkthroughOverlay";const Ar=(t,o)=>{switch(o.type){case"SET_CLIPS":return{...t,clips:o.clips,past:[...t.past.slice(-49),t.clips],future:[]};case"UNDO":return t.past.length===0?t:{clips:t.past[t.past.length-1],past:t.past.slice(0,-1),future:[t.clips,...t.future]};case"REDO":return t.future.length===0?t:{clips:t.future[0],past:[...t.past,t.clips],future:t.future.slice(1)};case"RESET":return{clips:[],past:[],future:[]};default:return t}};let Ur=0;const ea=()=>`clip-${Date.now()}-${(++Ur).toString(36)}`,Uo=a.memo(({message:t,progress:o,subMessage:i,operationLabel:n,onCancel:s})=>e.jsx("div",{className:"loading-overlay",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2e3,backdropFilter:"blur(6px)"},role:"dialog","aria-modal":"true","aria-label":"Processing",children:e.jsxs("div",{className:"loading-card",style:{background:"linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",borderRadius:"16px",padding:"36px 52px",textAlign:"center",border:"1px solid rgba(117,170,219,0.15)",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(117,170,219,0.1)",minWidth:"280px"},children:[e.jsxs("div",{style:{width:"56px",height:"56px",margin:"0 auto 20px",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",inset:0,border:"3px solid rgba(117,170,219,0.15)",borderTopColor:"#75aadb",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("div",{style:{position:"absolute",inset:"6px",border:"2px solid rgba(117,170,219,0.1)",borderBottomColor:"rgba(117,170,219,0.5)",borderRadius:"50%",animation:"spin 1.2s linear infinite reverse"}})]}),e.jsx("p",{style:{color:"white",fontSize:"15px",margin:"0 0 6px",fontWeight:600},children:t}),n&&e.jsx("p",{style:{color:"rgba(255, 255, 255, 0.65)",fontSize:"12px",margin:"0 0 8px"},children:n}),i&&e.jsx("p",{style:{color:"#64748b",fontSize:"12px",margin:"0 0 16px"},children:i}),o>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"220px",height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden",margin:"16px auto 10px"},children:e.jsx("div",{className:o<100?"shimmer-bar":"",style:{height:"100%",width:`${o}%`,background:o>=100?"linear-gradient(90deg, #22c55e, #16a34a)":"linear-gradient(90deg, #75aadb, #5a8cbf)",transition:"width 0.3s ease",borderRadius:"3px"}})}),e.jsxs("p",{style:{color:"#75aadb",fontSize:"13px",fontWeight:700,margin:"0 0 16px"},children:[Math.round(o),"%"]})]}),s&&e.jsx("button",{onClick:s,style:{marginTop:o>0?"0":"16px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",padding:"8px 24px",color:"#ef4444",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Spline Sans', sans-serif",transition:"background 0.15s ease"},"aria-label":"Cancel operation",children:"Cancel"})]})}));Uo.displayName="LoadingOverlay";const Lo=a.memo(({progress:t})=>t>=100?null:e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"3px",background:"rgba(0,0,0,0.3)",zIndex:100,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.max(t,2)}%`,background:"linear-gradient(90deg, #5a8cbf, #75aadb)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0",boxShadow:"0 0 8px rgba(117,170,219,0.4)"}})}));Lo.displayName="FFmpegInitBar";const No=a.memo(({type:t="error",message:o,onClose:i,autoClose:n=!1})=>{const[s,l]=a.useState(!1);a.useEffect(()=>{if(!n)return;const b=setTimeout(()=>l(!0),za),p=setTimeout(i,za+Wa);return()=>{clearTimeout(b),clearTimeout(p)}},[n,i]);const c=a.useCallback(()=>{l(!0),setTimeout(i,Wa)},[i]),m={error:{bg:"linear-gradient(135deg, #ef4444, #dc2626)",shadow:"rgba(239,68,68,0.25)",icon:"error"},success:{bg:"linear-gradient(135deg, #22c55e, #16a34a)",shadow:"rgba(34,197,94,0.25)",icon:"check_circle"},warning:{bg:"linear-gradient(135deg, #f59e0b, #d97706)",shadow:"rgba(245,158,11,0.25)",icon:"warning"},info:{bg:"linear-gradient(135deg, #3b82f6, #2563eb)",shadow:"rgba(59,130,246,0.25)",icon:"info"}}[t]||{bg:"#ef4444",shadow:"rgba(0,0,0,0.2)",icon:"error"};return e.jsxs("div",{className:s?"toast-exit":"toast-enter",style:{position:"fixed",bottom:"24px",right:"24px",background:m.bg,color:"white",padding:"12px 18px",borderRadius:"10px",display:"flex",alignItems:"center",gap:"10px",boxShadow:`0 8px 28px ${m.shadow}`,zIndex:3e3,maxWidth:"380px",fontSize:"13px",backdropFilter:"blur(4px)"},role:t==="error"?"alert":"status",children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px",opacity:.9},children:m.icon}),e.jsx("span",{style:{flex:1,lineHeight:1.4},children:o}),e.jsx("button",{onClick:c,style:{background:"rgba(255,255,255,0.15)",border:"none",color:"white",cursor:"pointer",padding:"4px",borderRadius:"50%",display:"flex",width:"22px",height:"22px",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0},children:"✕"})]})});No.displayName="Toast";function Lr(t,o){const i=t.find(s=>s.type==="video");if(!i)return null;if(i.file)return{file:i.file,mediaId:i.mediaId};const n=o.find(s=>s.id===i.mediaId);return n?.file?{file:n.file,mediaId:i.mediaId}:null}function Nr(t){const o=String(t||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);if(o)return o;const i=new Date,n=s=>String(s).padStart(2,"0");return`clipcut-export-${i.getFullYear()}-${n(i.getMonth()+1)}-${n(i.getDate())}`}async function $r(t,o,i,n,s,l){const c=new Map;for(const p of i)if(!(!p.file||p.storagePath))try{const g=await yo(t,o,p.file);c.set(p.id,g)}catch(g){console.warn("[autosave] Media upload failed:",p.name,g)}if(c.size===0)return{changed:!1,clips:n,mediaItems:i};const m=i.map(p=>c.has(p.id)?{...p,storagePath:c.get(p.id)}:p),b=n.map(p=>{const g=p.mediaId&&c.get(p.mediaId);return g?{...p,storagePath:g}:p});return s(m),l(b),{changed:!0,clips:b,mediaItems:m}}const Or=(t,o,i,n,s,l,c,m,b,p,g,x,I,G=en)=>{const[P,y]=a.useState(null),H=a.useRef(!1),Y=a.useRef(t),me=a.useRef(null),J=a.useRef(null),re=a.useRef(null),w=a.useRef(0),Z=a.useRef(0),le=a.useRef(!1),N=a.useRef(i);N.current=i;const W=a.useRef(n);W.current=n;const ye=a.useRef(o);ye.current=o;const V=a.useRef(l);V.current=l;const ae=a.useRef(c);ae.current=c;const ge=a.useRef(p);ge.current=p;const _=a.useRef(x);_.current=x,a.useEffect(()=>{Y.current=t},[t]),a.useEffect(()=>{const Se=()=>{Mr(),Fe(()=>import("./BEUlQjCE.js"),__vite__mapDeps([23,1,24])).then(Ce=>Ce.warmupFaceModels?.()).catch(()=>{})};if(typeof requestIdleCallback=="function"){const Ce=requestIdleCallback(Se,{timeout:1500});return()=>cancelIdleCallback?.(Ce)}const je=setTimeout(Se,500);return()=>clearTimeout(je)},[]),a.useEffect(()=>{const Se=new Set(["file","blobUrl","thumbnail","isProcessing"]),je=ve=>{const ue={};for(const[ce,xe]of Object.entries(ve))Se.has(ce)||(ue[ce]=xe);return ve.mediaId&&Y.current&&(ue.idbKey=`idb://${Y.current}:${ve.mediaId}`),ue.storagePath&&ue.storagePath.startsWith("blob:")&&delete ue.storagePath,ue},Ce=ve=>{const ue={};for(const[ce,xe]of Object.entries(ve))Se.has(ce)||(ue[ce]=xe);return ve.id&&Y.current&&(ue.idbKey=`idb://${Y.current}:${ve.id}`),ue.blobUrl&&delete ue.blobUrl,ue},ie=async()=>{if(H.current)return{saved:!1,skipReason:"in-progress"};const ve=N.current?.length||0,ue=W.current?.length||0;(ve>0||ue>0)&&(le.current=!0);const ce=Rr({projectId:Y.current,isRestored:I?I.current:!0,hasBeenNonEmpty:le.current,clipsCount:ve,mediaItemsCount:ue});if(ce.skip)return{saved:!1,skipReason:ce.reason};if(w.current>=3){if(Z.current>0)return Z.current--,{saved:!1,skipReason:"backoff"};Z.current=Math.min(Math.pow(2,w.current-3),20)}H.current=!0;try{const xe=N.current,we=W.current,Ue=ye.current,S=ge.current,E={id:Y.current,name:Ue,clips:xe.map(je),mediaItems:we.map(Ce),duration:V.current,resolution:ae.current||"1080p",timelineMarkers:_.current||[]};(S?.storagePath||S?.mediaId)&&(E.bgMusic={name:S.name,volume:S.volume??.3},S.storagePath&&(E.bgMusic.storagePath=S.storagePath),S.mediaId&&(E.bgMusic.mediaId=S.mediaId));const X=Lr(xe,we),v=X?.mediaId||null;if(X&&v!==me.current)try{const M=await Ut(X.file,1);if(M&&M.size>500){me.current=v,s&&(E.thumbnail=M);const z=await new Promise(pe=>{const fe=new FileReader;fe.onloadend=()=>pe(fe.result),fe.readAsDataURL(M)});E.thumbnailDataUrl=z,J.current=z}}catch(M){console.warn("Auto-save thumbnail generation failed:",M)}else J.current&&(E.thumbnailDataUrl=J.current);if(s){const M=await tn(()=>qt(s,E),{maxRetries:2,baseDelay:1e3,maxDelay:5e3});I&&(I.current=!0);const z=Y.current;let pe=!1;if(M?.id&&M.id!==z&&(Y.current=M.id,z))try{await jn(z,M.id),pe=!0,M.id}catch(ze){console.warn("[autosave] IndexedDB re-key failed:",ze)}const fe=Y.current;if(fe&&At()){const ze=await $r(s,fe,W.current,N.current,m,b);if(ze.changed&&(N.current=ze.clips,W.current=ze.mediaItems),ze.changed||pe){const at={id:fe,name:ye.current,clips:(ze.changed?ze.clips:N.current).map(je),mediaItems:W.current.map(Ce),duration:V.current,resolution:ae.current||"1080p",timelineMarkers:_.current||[],...J.current?{thumbnailDataUrl:J.current}:{}};ge.current?.storagePath&&(at.bgMusic={storagePath:ge.current.storagePath,name:ge.current.name,volume:ge.current.volume??.3}),await qt(s,at)}const lt=ge.current;if(lt?.file&&!lt?.storagePath&&fe)try{const at=await yo(s,fe,lt.file);g(We=>We?{...We,storagePath:at}:null),await qt(s,{id:fe,name:ye.current,clips:N.current.map(je),mediaItems:W.current.map(Ce),duration:V.current,resolution:ae.current||"1080p",timelineMarkers:_.current||[],bgMusic:{storagePath:at,name:lt.name,volume:lt.volume??.3},...J.current?{thumbnailDataUrl:J.current}:{}})}catch(at){console.warn("Background music upload failed:",at)}}}else{const z=qt(null,E).id;Y.current||(Y.current=z),I&&(I.current=!0);for(const fe of W.current)fe.file&&Lt(z,fe.id,fe.file,{name:fe.name,type:fe.file.type}).catch(ze=>{console.warn("Failed to persist media to IndexedDB",{mediaId:fe.id,error:ze?.message})});const pe=ge.current;pe?.file&&pe?.mediaId&&Lt(z,pe.mediaId,pe.file,{name:pe.name,type:pe.file.type}).catch(fe=>{console.warn("Failed to persist background music to IndexedDB",{mediaId:pe.mediaId,error:fe?.message})})}return y(new Date),w.current=0,Z.current=0,{saved:!0}}catch(xe){w.current++,w.current<=1?console.warn("Auto-save failed:",xe?.message||xe):w.current===3&&console.warn(`[autosave] ${w.current} consecutive failures — backing off. Will retry less frequently.`);try{const we=ye.current,Ue=Y.current,S={id:Ue,projectName:we,clips:N.current.map(je),mediaItems:W.current.map(Ce),savedAt:new Date().toISOString()};if(localStorage.setItem(`clipcut_autosave_${we}`,JSON.stringify(S)),Ue)for(const E of W.current)E.file&&Lt(Ue,E.id,E.file,{name:E.name,type:E.file.type}).catch(X=>{console.warn("Fallback media persist failed",{mediaId:E.id,error:X?.message})})}catch{}return{saved:!1,skipReason:"error",error:xe}}finally{H.current=!1}};re.current=ie;const De=setInterval(ie,G);return()=>clearInterval(De)},[s,G,m,b,g]);const q=a.useCallback(()=>re.current?re.current():Promise.resolve({saved:!1,skipReason:"not-ready"}),[]);return{lastSaved:P,projectId:Y.current,triggerSave:q}},Fr=60,Br=(t,o)=>{const[i,n]=a.useState(0),[s,l]=a.useState(!1),c=a.useRef(null),m=a.useRef(1),b=a.useRef(0),p=a.useRef(0),g=a.useRef(t);g.current=t;const x=a.useCallback(w=>{const Z=g.current.filter(N=>N.type!=="audio"&&N.type!=="text").sort((N,W)=>N.startTime-W.startTime);for(const N of Z)if(w>=N.startTime&&w<N.startTime+N.duration)return N;const le=Z[Z.length-1];return le&&Math.abs(w-(le.startTime+le.duration))<.05?le:null},[]),I=a.useMemo(()=>x(i),[x,i]),G=a.useMemo(()=>I?Math.max(0,i-I.startTime)+(I.trimStart||0):0,[I,i]),P=a.useMemo(()=>{if(!I)return null;const w=t.filter(le=>le.type!=="audio").sort((le,N)=>le.startTime-N.startTime),Z=w.findIndex(le=>le.id===I.id);return Z>=0&&Z<w.length-1?w[Z+1]:null},[I,t]),y=a.useCallback(()=>{const w=performance.now();w-p.current>=Fr&&(p.current=w,n(b.current))},[]),H=a.useCallback(w=>{if(w>=o){b.current=o,n(o),l(!1);return}b.current=w,y()},[o,y]);a.useEffect(()=>{if(!s){c.current&&cancelAnimationFrame(c.current),n(b.current);return}const w=()=>{if(b.current>=o){l(!1),n(o);return}c.current=requestAnimationFrame(w)};return c.current=requestAnimationFrame(w),()=>{c.current&&cancelAnimationFrame(c.current)}},[s,o]);const Y=a.useCallback(w=>{const Z=Math.max(0,Math.min(o,w));b.current=Z,n(Z)},[o]),me=a.useCallback(()=>l(w=>!w),[]),J=a.useCallback(()=>{l(!1),b.current=0,n(0)},[]),re=a.useCallback(w=>{m.current=w},[]);return{currentTime:i,currentClip:I,clipOffset:G,nextClip:P,isPlaying:s,seek:Y,togglePlay:me,stop:J,setIsPlaying:l,setSpeed:re,setCurrentTime:n,currentTimeRef:b,speedRef:m,onVideoTime:H}},Dr=()=>{const t=an(),o=on(),{user:i}=Qo(),[n,s]=a.useState(()=>new URLSearchParams(window.location.search).get("project")||null),[l,c]=a.useState("Untitled Project"),[m,b]=a.useState("1080p"),p=a.useRef(!1),g=a.useRef(!1);a.useEffect(()=>{const r=new URL(window.location);n?r.searchParams.set("project",n):r.searchParams.delete("project"),r.toString()!==window.location.href&&window.history.replaceState(window.history.state,"",r)},[n]);const[x,I]=a.useState("media"),[G,P]=a.useState("video"),[y,H]=a.useState("basic"),[Y,me]=a.useState("local"),[J,re]=a.useState("default"),w=ja(),Z=nn(),[le,N]=a.useState(!1),[W,ye]=a.useState(!1),[V,ae]=a.useState([]),[ge,_]=a.useState(!1),[q,Se]=a.useState(!1),[je,Ce]=a.useState([]),ie=a.useRef([]),De=a.useRef([]),[ve,ue]=a.useState(null),[ce,xe]=a.useState(null),[we,Ue]=a.useState(null),[S,E]=a.useState(()=>typeof window<"u"?window.innerWidth:1200);a.useEffect(()=>{if(J==="wide-timeline"){const r=window.innerHeight-296,d=Math.max(320,Math.floor(window.innerHeight*.46));ue(Math.max(120,Math.min(d,r)))}else(J==="default"||J==="compact")&&ue(null)},[J]);const X=a.useMemo(()=>ya(S),[S]),v=a.useMemo(()=>wa(S),[S]),j=a.useMemo(()=>Math.min(ce??po,X),[ce,X]),M=a.useMemo(()=>Math.min(we??mo,v),[we,v]),z=a.useCallback(r=>{const d=window.innerHeight-296,h=Math.max(120,Math.min(r,d));ue(h)},[]),pe=a.useCallback(r=>{const d=window.innerWidth,h=ya(d),u=we??mo,f=d-fo-u-24;xe(Math.max(200,Math.min(r,h,f)))},[we]),fe=a.useCallback(r=>{const d=window.innerWidth,h=wa(d),u=ce??po,f=d-fo-u-24;Ue(Math.max(220,Math.min(r,h,f)))},[ce]);a.useEffect(()=>{let r;const d=()=>{clearTimeout(r),r=setTimeout(()=>{const h=window.innerWidth;E(h);const u=ya(h),f=wa(h);xe(C=>C!=null?Math.min(C,u):null),Ue(C=>C!=null?Math.min(C,f):null)},150)};return window.addEventListener("resize",d),d(),()=>{clearTimeout(r),window.removeEventListener("resize",d)}},[]);const ze=xa("y",z),lt=xa("x",pe),at=xa("x",fe,void 0,!0),[We,ft]=a.useState(null),[$o,Oo]=a.useState(0),[Fo,Bo]=a.useState(()=>!localStorage.getItem("clipcut_onboarded")),[Ee,Le]=a.useState([]),[ct,Nt]=a.useState(null),[Tt,na]=a.useReducer(Ar,{clips:[],past:[],future:[]}),A=Tt.clips,ht=Tt.past.length>0,bt=Tt.future.length>0,[_e,Ze]=a.useState(null),[ra,$t]=a.useState([]);a.useEffect(()=>{w&&_e&&(ft("inspector"),N(!0))},[w,_e]);const ot=a.useMemo(()=>A.length===0?30:Math.max(30,Math.max(...A.map(r=>r.startTime+r.duration))+10),[A]),L=Br(A,ot),[Ve,gt]=a.useState(null),[Ta,Ia]=a.useState(!1),[xt,Ra]=a.useState(!1),[Ma,Ot]=a.useState(0),[It,Ea]=a.useState([]),Rt=a.useRef(null),[ia,yt]=a.useState(!1),[wt,he]=a.useState(""),[_a,tt]=a.useState(""),sa=a.useRef(new Set),[Ft,Pa]=a.useState(null),O=a.useCallback((r,d)=>Pa({type:r,message:d}),[]),te=sr(),$e=a.useMemo(()=>A.find(r=>r.id===_e),[A,_e]),Do=a.useMemo(()=>{if(L.currentClip?.blobUrl)return L.currentClip.blobUrl;if(ct){const d=Ee.find(h=>h.id===ct)?.blobUrl;if(d)return d}return A.find(d=>d.type!=="audio"&&d.type!=="text"&&d.blobUrl)?.blobUrl||null},[L.currentClip,ct,Ee,A]),zo=a.useMemo(()=>Ir(A),[A]),Wo=a.useMemo(()=>{const r=A.filter(u=>u.isCaption),d=A.filter(u=>u.type==="text"&&!u.isCaption),h=A.filter(u=>(u.type==="text"||u.type==="sticker"||u.isCaption)&&u.type!=="audio"&&L.currentTime>=u.startTime&&L.currentTime<u.startTime+u.duration);if(r.length>0&&h.filter(u=>u.isCaption).length===0){const u=r.slice(0,3);L.currentTime.toFixed(3),A.length,r.length,d.length,h.length,u.map(f=>({id:f.id,type:f.type,isCaption:f.isCaption,text:(f.text||"").slice(0,30),startTime:f.startTime,duration:f.duration,track:f.track,range:`${f.startTime?.toFixed(2)}-${(f.startTime+f.duration).toFixed(2)}`}))}return h},[A,L.currentTime]),vt=a.useRef(Tt.clips);vt.current=Tt.clips;const se=a.useCallback(r=>{const d=vt.current,h=typeof r=="function"?r(d):r;na({type:"SET_CLIPS",clips:h})},[]),{lastSaved:Vo,projectId:Bt,triggerSave:Dt}=Or(n,l,A,Ee,i?.id,ot,m,Le,se,Ve,gt,ra,g);a.useEffect(()=>{Bt&&Bt!==n&&s(Bt)},[Bt,n]);const kt=a.useCallback(()=>na({type:"UNDO"}),[]),dt=a.useCallback(()=>na({type:"REDO"}),[]),Pe=a.useCallback((r,d)=>se(h=>h.map(u=>u.id===r?{...u,...d}:u)),[se]),Aa=a.useCallback(r=>se(d=>d.map(h=>h.isCaption?{...h,...r}:h)),[se]),zt=a.useCallback(r=>{se(d=>d.filter(h=>h.id!==r)),_e===r&&Ze(null)},[se,_e]),Wt=a.useCallback((r,d=null)=>{let h=d;if(h===null){const f=vt.current.filter(K=>K.type===r.type),C=f.length>0?f.reduce((K,$)=>K.startTime+K.duration>$.startTime+$.duration?K:$):null;h=C?C.startTime+C.duration:0}const u={...ha,id:ea(),mediaId:r.id,name:r.name,type:r.type,startTime:h,duration:r.duration||Zo,file:r.file,blobUrl:r.blobUrl,thumbnail:r.thumbnail};se(f=>[...f,u]),Ze(u.id),setTimeout(()=>Dt(),100)},[se,Dt]),Vt=a.useCallback(async r=>{Ia(!0);try{let d=n;if(d||(d=`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s(d)),r.length>0&&l==="Untitled Project"){const f=(r.find(C=>C.type.startsWith("video/"))||r[0]).name.replace(/\.[^.]+$/,"").trim();f&&c(f)}let h=0;for(const u of r){he(`Importing ${u.name}...`),tt(`${++h} of ${r.length}`);const f=ea(),C=URL.createObjectURL(u);Lt(d,f,u,{name:u.name,type:u.type}).catch($=>console.warn("[import] IndexedDB store failed:",u.name,$));const K=u.type.startsWith("audio/");Le($=>[...$,{id:f,name:u.name,file:u,blobUrl:C,thumbnail:null,duration:0,width:0,height:0,type:K?"audio":"video",isProcessing:!0}]);try{const $=await Qt(u);if(Le(B=>B.map(ee=>ee.id===f?{...ee,duration:$.duration,width:$.width,height:$.height,isProcessing:!1}:ee)),!K)try{const B=`${u.name}_${u.size}_${u.lastModified}`,ee=await dr(B,0),R=ee||await Ut(u,0);ee||ur(B,0,R).catch(()=>{});const F=URL.createObjectURL(R);Le(de=>de.map(Ae=>Ae.id===f?{...Ae,thumbnail:F}:Ae))}catch(B){console.warn("Thumbnail generation failed:",B)}}catch($){if(!K&&/\.(mov|avi|mkv|flv|wmv)$/i.test(u.name))try{he(`Converting ${u.name} to MP4...`),te.isReady||await te.initialize();const ee=await te.convertFormat(u,"mp4"),R=new File([ee],u.name.replace(/\.\w+$/,".mp4"),{type:"video/mp4"}),F=URL.createObjectURL(R);URL.revokeObjectURL(C);const de=await Qt(R);Le(k=>k.map(U=>U.id===f?{...U,file:R,blobUrl:F,duration:de.duration,width:de.width,height:de.height,isProcessing:!1}:U));const Ae=await Ut(R,0).catch(()=>null);if(Ae){const k=URL.createObjectURL(Ae);Le(U=>U.map(Q=>Q.id===f?{...Q,thumbnail:k}:Q))}O("info",`Converted ${u.name} to MP4`)}catch(ee){console.error("Auto-convert failed:",ee),Le(R=>R.map(F=>F.id===f?{...F,isProcessing:!1}:F))}else console.error("Error processing:",$),Le(ee=>ee.map(R=>R.id===f?{...R,isProcessing:!1}:R))}}O("success",`Imported ${r.length} file${r.length>1?"s":""}`)}catch(d){O("error",`Import failed: ${d.message}`)}finally{Ia(!1),he(""),tt("")}},[O,n,l]),la=a.useRef(null);a.useEffect(()=>{const r=A.find(F=>F.type!=="audio"&&F.type!=="text"&&F.type!=="sticker"&&!F.isCaption&&(F.file||F.blobUrl||F.mediaId));if(!r){Ce([]),la.current=null;return}const d=r.mediaId?Ee.find(F=>F.id===r.mediaId):null,h=r.file||d?.file||null,u=r.blobUrl||d?.blobUrl||null;if(!h&&!u){Ce([]);return}const f=r.trimStart||0,C=r.trimEnd||0,K=r.duration||0,$=A.some(F=>F.isCaption),B=h?`${h.size}:${h.lastModified}`:String(u||""),ee=`${r.id}|${r.mediaId||""}|${f}|${C}|${K}|${$}|${B}`;if(ee===la.current)return;la.current=ee;const R={...r,file:h||void 0,blobUrl:u||void 0};Fe(async()=>{const{analyzeVideo:F}=await import("./BJ8-Vlbw.js");return{analyzeVideo:F}},__vite__mapDeps([25,26,3,1,4])).then(({analyzeVideo:F})=>{F(R,{hasCaptions:$}).then(de=>{Ce(de.length>0?de:[])}).catch(()=>{Ce([])})})},[A,Ee]);const Kt=a.useCallback(r=>{const d=Cn(r,{allowedCategories:["audio"],category:"audio"});if(!d.valid){O("warning",d.error||"Please select an audio file");return}Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl);const h=URL.createObjectURL(r),u=`bgm-${Date.now()}`;gt({file:r,name:r.name,blobUrl:h,volume:.3,mediaId:u});const f=n||`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Lt(f,u,r,{name:r.name,type:r.type}).catch(C=>console.warn("[bgMusic] IndexedDB store failed:",C)),O("success",`Background music: ${r.name}`)},[Ve,O,n]),Ht=a.useCallback(r=>{gt(d=>d?{...d,volume:r}:null)},[]),Yt=a.useCallback(()=>{Ve?.blobUrl&&URL.revokeObjectURL(Ve.blobUrl),gt(null),O("info","Background music removed")},[Ve,O]),Ua=a.useCallback(r=>{Le(d=>{const h=d.find(u=>u.id===r);return h&&requestAnimationFrame(()=>{h.blobUrl&&URL.revokeObjectURL(h.blobUrl),h.thumbnail&&URL.revokeObjectURL(h.thumbnail)}),d.filter(u=>u.id!==r)}),se(d=>(d.filter(h=>h.mediaId===r).forEach(h=>{h.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(h.blobUrl))}),d.filter(h=>h.mediaId!==r))),ct===r&&Nt(null)},[ct,se]),Xt=a.useCallback((r,d)=>{const h=vt.current.find(C=>C.id===r);if(!h)return;const u={...h,id:ea(),name:`${h.name} (1)`,duration:d},f={...h,id:ea(),name:`${h.name} (2)`,startTime:h.startTime+d,duration:h.duration-d,trimStart:(h.trimStart||0)+d};se(C=>{const K=C.findIndex(B=>B.id===r),$=[...C];return $.splice(K,1,u,f),$}),Ze(u.id),O("success","Clip split")},[se,O]),nt=a.useCallback(r=>{se(d=>[...d,r]),Ze(r.id)},[se]),La=a.useCallback(r=>{se(()=>r),Ze(null),O("success","Clip deleted (ripple)")},[se,O]);a.useCallback(async(r,d,h)=>{const u=vt.current.find(f=>f.id===r);if(u?.file){yt(!0),he("Trimming...");try{const f=await te.trimVideo(u.file,d,h),C=URL.createObjectURL(f);se(K=>K.map($=>$.id===r?{...$,file:f,blobUrl:C,duration:h}:$)),u.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(u.blobUrl)),O("success","Clip trimmed")}catch(f){O("error",aa(f,"ffmpeg"))}finally{yt(!1),he(""),te.resetProgress()}}},[te,se,O]),a.useCallback(async(r,d,h)=>{let u=r.file;const f=r.speed&&r.speed!==1,C=r.brightness||r.contrast,K=r.saturation!==void 0&&r.saturation!==1,$=r.rotation&&[90,180,270,-90].includes(r.rotation),B=r.volume!==void 0&&r.volume!==1||r.isMuted,ee=r.fadeIn&&r.fadeIn>0||r.fadeOut&&r.fadeOut>0,R=r.filterName,F=r.trimStart>0||r.trimEnd>0,de=r.effects?.some(Q=>Q.enabled),Ae=r.text&&r.text.trim().length>0;if(!f&&!C&&!K&&!$&&!B&&!ee&&!R&&!F&&!de&&!Ae)return u;const U=`clip ${d+1}/${h}`;if(F&&(he(`Trimming ${U}...`),u=await te.trimVideo(u,r.trimStart,r.duration)),f&&(he(`Adjusting speed for ${U}...`),u=await te.changeSpeed(u,r.speed)),C&&(he(`Adjusting colors for ${U}...`),u=await te.adjustBrightnessContrast(u,r.brightness||0,r.contrast||0)),K&&(he(`Adjusting saturation for ${U}...`),u=await te.adjustSaturation(u,r.saturation)),$&&(he(`Rotating ${U}...`),u=await te.rotateVideo(u,r.rotation)),B&&(he(`Adjusting audio for ${U}...`),u=await te.adjustVolume(u,r.isMuted?0:r.volume)),ee&&(he(`Adding fade to ${U}...`),u=await te.addFade(u,r.fadeIn||0,r.fadeOut||0,r.duration)),R){const Q=_n.find(be=>be.name===r.filterName);Q?.filter&&(he(`Applying ${r.filterName} filter to ${U}...`),u=await te.applyFilter(u,Q.filter))}if(de)for(const Q of r.effects.filter(be=>be.enabled))Q.type==="blur"&&Q.params?.radius?(he(`Applying ${Q.name} to ${U}...`),u=await te.applyBlur(u,Q.params.radius)):Q.type==="sharpen"&&Q.params?.strength&&(he(`Applying ${Q.name} to ${U}...`),u=await te.applySharpen(u,Q.params.strength));return Ae&&(he(`Adding text overlay to ${U}...`),u=await te.addTextOverlay(u,r.text,{position:r.textPosition||"bottom-center",fontSize:r.textSize||48,fontColor:r.textColor||"white",backgroundColor:r.textBgColor||null,startTime:r.textStartTime||0,duration:r.textDuration||0})),u},[te]);const Ko=a.useCallback(()=>{A.length>0&&!window.confirm("Start a new project? Unsaved changes will be lost.")||(se([]),c("Untitled Project"),s(null),p.current=!1,g.current=!1,Le([]),Ze(null),Nt(null),$t([]),O("info","New project created"))},[A.length,O,se]),Ho=a.useCallback(async()=>{const r=await Dt();if(r?.saved){O("success","Project saved");return}switch(r?.skipReason){case"restore-in-progress":O("info","Project still loading — try again in a moment");break;case"empty-without-session-edit":O("info","Nothing to save yet — add media or clips first");break;case"in-progress":O("info","Save already in progress");break;case"backoff":O("warning","Previous saves failed — retrying shortly");break;case"error":O("error",`Save failed${r?.error?.message?": "+r.error.message:""}`);break;default:O("info","Save skipped")}},[Dt,O]),Yo=a.useCallback(()=>{o("/settings")},[o]),Gt=a.useCallback(async r=>{const d=Date.now();if(De.current=De.current.filter(f=>d-f<6e4),De.current.length>=10){ae(f=>[...f,{id:`e-${d}`,role:"assistant",text:"Rate limit reached. Please wait a moment before sending more prompts."}]);return}De.current.push(d);const h={id:`u-${d}`,role:"user",text:r};if(ae(f=>[...f,h]),!A.some(f=>f.type==="video"||f.type==="audio"||f.type==="image")){const{parseIntentLocally:f}=await Fe(async()=>{const{parseIntentLocally:K}=await import("./CDbkDtvg.js");return{parseIntentLocally:K}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2]));if(f(r)){const K=()=>{w&&(ft("media"),N(!0))};ae($=>[...$,{id:`g-${d}`,role:"assistant",text:"Please import a video first to use AI editing.",openMedia:w?K:void 0}]);return}}_(!0),Se(!1);try{const{executeAiEdit:f}=await Fe(async()=>{const{executeAiEdit:R}=await import("./CDbkDtvg.js");return{executeAiEdit:R}},__vite__mapDeps([27,3,1,4,26,10,5,6,7,8,9,2])),C={duration:ot,hasAudio:A.some(R=>R.type==="audio"||R.type==="video"&&R.file),clipCount:A.length,currentTime:L.currentTime,hasCaptions:A.some(R=>R.isCaption),filters:[...new Set(A.filter(R=>R.filterName).map(R=>R.filterName))].join(",")||void 0,tracks:A.reduce((R,F)=>Math.max(R,(F.track||0)+1),0)},K=V.slice(-10).map(R=>({role:R.role,content:R.role==="assistant"&&R.actions?.length?`[Actions: ${R.actions.join(", ")}] ${R.text}`:R.text})),$=JSON.parse(JSON.stringify(A.map(R=>{const{file:F,...de}=R;return de}))),B=new Map(A.filter(R=>R.file).map(R=>[R.id,R.file])),ee=await f(r,C,{clips:A,setClips:se,updateClip:Pe,addClip:R=>{se(F=>[...F,{...ha,id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...R}])},getClips:()=>vt.current,splitClip:Xt,selectedClipId:_e,mediaItems:Ee},{history:K,onSlowResponse:()=>Se(!0)});if(ee.isChat)ae(R=>[...R,{id:`a-${Date.now()}`,role:"assistant",text:ee.summary}]);else{const R=`ai-${Date.now()}`;ie.current.push({id:R,snapshot:$,filesMap:B});const F={id:`a-${Date.now()}`,role:"assistant",text:ee.summary||"Done!",actions:ee.actionLabels||[],canUndo:!0,onUndo:()=>{const de=ie.current.find(Ae=>Ae.id===R);if(de){const Ae=de.snapshot.map(k=>{const U=de.filesMap.get(k.id);return U?{...k,file:U}:k});se(Ae),ie.current=ie.current.filter(k=>k.id!==R),ae(k=>k.map(U=>U.id===F.id?{...U,canUndo:!1}:U)),O("info","AI edit undone")}}};ae(de=>[...de,F])}}catch(f){const C={id:`e-${Date.now()}`,role:"assistant",text:`Error: ${f.message||"Something went wrong. Please try again."}`};ae(K=>[...K,C])}finally{_(!1),Se(!1)}},[A,se,Pe,Xt,_e,Ee,ot,L.currentTime,V]),Na=a.useCallback(r=>{Gt(r.title)},[Gt]),ca=a.useCallback(()=>{ye(r=>!r),w&&(ft("ai"),N(r=>!r))},[w]),$a=a.useCallback((r,d,h)=>{const u=h==="mp4"?"mp4":"webm",f=URL.createObjectURL(r),C=document.createElement("a");C.href=f,C.download=`${Nr(d||l)}.${u}`,document.body.appendChild(C),C.click(),document.body.removeChild(C),setTimeout(()=>URL.revokeObjectURL(f),2e3)},[l]),Xo=a.useCallback(()=>{Rt.current&&(Rt.current.abort(),Rt.current=null)},[]),Mt=a.useCallback(async(r,d={})=>{if(A.length===0){O("warning","No clips to export. Add media to the timeline first.");return}const h=A.filter(C=>C.type!=="audio"&&C.file).sort((C,K)=>C.startTime-K.startTime);if(h.length===0){O("warning","No video clips with valid files. Make sure your clips are properly loaded.");return}if(xt){Ea(C=>[...C,r]),O("info",`Queued export at ${r} (${It.length+1} in queue)`);return}L.isPlaying&&L.setIsPlaying(!1),Ra(!0),Ot(0),he("Preparing export..."),tt("");let u=r;if(r.startsWith("preset:")){const C=r.slice(7),K=oa[C];K&&(K.width<=854?u="480p":K.width<=1280?u="720p":u="1080p")}const f=new AbortController;Rt.current=f;try{const C=String(d.format||"webm").toLowerCase()==="mp4"?"mp4":"webm",K=[...h,...A.filter(F=>F.type==="text"||F.type==="sticker")],$=Math.max(...h.map(F=>F.startTime+F.duration)),B=await gr({clips:K,bgMusic:Ve,totalDuration:$,resolution:u,settings:{...d,format:"webm"},onProgress:({percent:F,elapsed:de,eta:Ae,label:k})=>{const U=C==="mp4"?Math.min(70,Math.round(F*.7)):F;Ot(U),he(C==="mp4"?"Rendering local preview stream...":k||"Exporting..."),tt(`${U}%  ·  Elapsed ${de}  ·  ETA ${Ae}`)},abortSignal:f.signal});if(!B.blob||B.blob.size===0)throw new Error("Export produced an empty file.");let ee=B.blob,R="webm";if(C==="mp4")if(he("Checking server encoder..."),tt("Validating MP4 export service availability..."),!await go())O("warning","MP4 server is unavailable right now. Exported WebM locally instead.");else try{he("Uploading to MP4 encoder..."),tt("Uploading render to server for fast MP4 transcode...");const de=await kn(B.blob,u,{},Ae=>{const k=Math.min(98,70+Math.round(Ae/100*28));Ot(k),he("Server encoding MP4..."),tt(`${k}%  ·  Upload + transcode in progress`)},f.signal);de&&de.size>0?(ee=de,R="mp4"):O("warning","MP4 conversion returned empty output. Downloaded WebM fallback.")}catch(de){console.warn("Server MP4 export failed, using local WebM fallback:",de),O("warning","MP4 export failed on server. Downloaded WebM fallback instead.")}$a(ee,d.filename||l,R),O("success",`Exported ${R.toUpperCase()} at ${u} (${(ee.size/(1024*1024)).toFixed(1)} MB)`)}catch(C){C.message==="Export cancelled."?O("info","Export cancelled."):(console.error("Export error:",C),O("error",C.message||"Export failed. Please try again."))}finally{Ra(!1),Ot(0),he(""),tt(""),Rt.current=null}},[A,l,L,O,Ve,$a,xt,It,ot]);a.useEffect(()=>{if(!xt&&It.length>0){const[r,...d]=It;Ea(d),Mt(r)}},[xt,It,Mt]);const Go=a.useCallback(r=>{L.seek(r)},[L]),da=a.useCallback(()=>{if(!L.currentClip){L.setIsPlaying(!1);return}const d=A.filter(h=>h.type!=="audio").sort((h,u)=>h.startTime-u.startTime).find(h=>h.startTime>L.currentClip.startTime);d&&L.isPlaying?L.seek(d.startTime):L.setIsPlaying(!1)},[L,A]),qo=a.useCallback(r=>{if(L.currentClip){const d=L.currentClip.trimStart||0,h=d+L.currentClip.duration;if(L.isPlaying&&r>=h-.01){da();return}const u=L.currentClip.startTime+(r-d);L.isPlaying?L.onVideoTime(u):L.setCurrentTime(u)}else L.isPlaying||L.setCurrentTime(r)},[L,da]),Jo=a.useCallback(async r=>{if(!(!r||!te.isReady)&&!sa.current.has(r)){sa.current.add(r),yt(!0),he("Converting video to web-compatible format...");try{let d=null,h=null,u=!1;const f=Ee.find($=>$.blobUrl===r);if(f&&f.file)d=f.file,h=f.id,u=!1;else{const $=A.find(B=>B.blobUrl===r);$&&$.file&&(d=$.file,h=$.id,u=!0)}if(!d){O("error","Could not find source file for conversion");return}const C=await te.convertToWebFormat(d),K=URL.createObjectURL(C);u?se($=>$.map(B=>B.id===h?(B.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(B.blobUrl)),{...B,file:C,blobUrl:K}):B)):(Le($=>$.map(B=>B.id===h?(B.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(B.blobUrl)),{...B,file:C,blobUrl:K}):B)),se($=>$.map(B=>B.mediaId===h?(B.blobUrl&&requestAnimationFrame(()=>URL.revokeObjectURL(B.blobUrl)),{...B,file:C,blobUrl:K}):B))),O("success","Video converted successfully")}catch(d){O("error",aa(d,"ffmpeg"))}finally{sa.current.delete(r),yt(!1),he(""),te.resetProgress()}}},[te,Ee,A,se,O]),Oa=a.useRef(null);a.useEffect(()=>{const r=t.state?.filesToImport;r?.length&&Oa.current!==r&&(Oa.current=r,window.history.replaceState({...t.state,filesToImport:null},""),Vt(r))},[t.state?.filesToImport,Vt]),a.useEffect(()=>{const r=t.state?.projectId,d=t.state?.projectData,h=t.state?.projectName,u=new URLSearchParams(window.location.search).get("project"),f=r||u||null;if(!f||p.current===f||(p.current=f,At()&&!i?.id))return;let C=!1;const K=async k=>{const U=k.project_data?.bgMusic;if(!U)return;let Q=null,be=null;if(U.mediaId)try{const ke=await St(f,U.mediaId);ke&&(Q=ke.file,be=ke.blobUrl)}catch(ke){console.warn("[restoreBgMusic] IndexedDB load failed:",ke)}if(!be&&U.storagePath&&At())try{const ke=await Ka(U.storagePath),Ke=await fetch(ke);if(Ke.ok){const oe=await Ke.blob();Q=new File([oe],U.name||"bgm",{type:oe.type}),be=URL.createObjectURL(oe)}}catch(ke){console.warn("[restoreBgMusic] Supabase download failed:",ke)}be&&gt({file:Q,name:U.name||"Background",blobUrl:be,volume:U.volume??.3,storagePath:U.storagePath,mediaId:U.mediaId})},$=k=>{if(!k||!k.startsWith("idb://"))return null;const U=k.slice(6),Q=U.lastIndexOf(":");return Q<0?null:{idbProjectId:U.slice(0,Q),idbMediaId:U.slice(Q+1)}},B=k=>k?.startsWith("audio/")?"audio":k?.startsWith("image/")?"image":"video",ee=(k,U,Q=null)=>Promise.race([k,new Promise(be=>setTimeout(()=>be(Q),U))]),R=async(k,U=[])=>{let Q=null,be=null;const ke=k.mediaId||k.id||null;k.name,k.type,k.idbKey,k.storagePath;const Ke=$(k.idbKey);if(Ke)try{Ke.idbProjectId,Ke.idbMediaId;const oe=await ee(St(Ke.idbProjectId,Ke.idbMediaId),2e3);oe?(Q=oe.file,be=oe.blobUrl,k.name,oe.file?.size):console.warn("[restore] IndexedDB MISS (null):",k.idbKey)}catch(oe){console.warn("[restore] IndexedDB load failed:",k.idbKey,oe)}else k.name,k.type;if(!be&&ke)try{const oe=await ee(St(f,ke),2e3);oe?(Q=oe.file,be=oe.blobUrl,k.name):console.warn("[restore] Fallback IndexedDB MISS:",f,ke)}catch(oe){console.warn("[restore] IndexedDB fallback load failed:",ke,oe)}if(!be&&ke)try{const oe=U.find(Oe=>Oe.mediaId===ke);if(oe){oe.key;const Oe=await ee(St(oe.projectId,oe.mediaId),2e3);Oe&&(Q=Oe.file,be=Oe.blobUrl)}}catch(oe){console.warn("[restore] IndexedDB scan failed:",oe)}if(!be&&k.storagePath&&At()&&!k.storagePath.startsWith("blob:"))try{k.storagePath;const oe=await ee(Ka(k.storagePath),5e3);if(!oe)throw new Error("Supabase URL timed out");const Oe=new AbortController,ua=setTimeout(()=>Oe.abort(),8e3),Et=await fetch(oe,{signal:Oe.signal});if(clearTimeout(ua),Et.ok){const ut=await Et.blob();Q=new File([ut],k.name||"media",{type:ut.type}),be=URL.createObjectURL(ut),k.name}}catch(oe){console.warn("[restore] Supabase download failed:",k.storagePath,oe)}return!be&&k.type!=="text"&&console.error("[restore] FAILED to resolve media for:",k.name,k.type,"— all sources exhausted"),{file:Q,blobUrl:be}},F=/^(draft-|local_)/.test(f),de=()=>({name:h||"Untitled Project",project_data:{clips:[],mediaItems:[]}});return(async()=>{yt(!0),he("Restoring media...");try{let k=d;if(!k){if(F)k=de();else if(!At())k=await Va(f,null);else if(i?.id)try{k=await Va(f,i.id)}catch(T){if(T?.code==="PGRST116")console.warn("[restore] Supabase has no row for",f,"— attempting IndexedDB-only recovery"),k=de();else throw T}}if(k||(console.warn("[restore] No project data found for",f,"— attempting IndexedDB-only recovery"),k=de()),C)return;window.history.replaceState({...t.state,projectId:null,projectData:null,projectName:null},"");const U=h||k.name||"Untitled Project";c(bo(U,{maxLength:100})||"Untitled Project"),s(f),k.resolution&&b(k.resolution);const Q=k.project_data?.timelineMarkers??k.timelineMarkers;$t(Array.isArray(Q)?Q.filter(T=>T&&typeof T.time=="number"&&Number.isFinite(T.time)&&T.time>=0).map((T,D)=>({id:typeof T.id=="string"&&T.id?T.id:`mk-${D}-${Math.round(T.time*1e3)}`,time:T.time})):[]);const be=k.project_data?.clips||k.clips||[],ke=k.project_data?.mediaItems||[],Ke=await ee(Sn(),3e3,[]);if(be.length,ke.length,be.map(T=>({name:T.name,type:T.type,mediaId:T.mediaId,idbKey:T.idbKey,storagePath:T.storagePath})),ke.map(T=>({id:T.id,name:T.name,idbKey:T.idbKey})),be.length===0&&ke.length===0){const T=Ke.filter(Ie=>Ie.projectId===f),D=[];for(const Ie of T)try{const Re=await ee(St(f,Ie.mediaId),3e3);if(!Re)continue;D.push({id:Ie.mediaId,name:Ie.name||"media",file:Re.file,blobUrl:Re.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:B(Ie.mime),isProcessing:!1,idbKey:`idb://${f}:${Ie.mediaId}`,_mediaError:null})}catch(Re){console.warn("[recover] load failed for",Ie.mediaId,Re)}if(C)return;await K(k);let ne=0;if(D.length===0){const Ie=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,Re=Ke.filter(Ne=>Ne.projectId&&Ne.projectId!==f&&!Ie.test(Ne.projectId)),Me=new Set;for(const Ne of Re)if(!Me.has(Ne.mediaId)){Me.add(Ne.mediaId);try{const pt=await ee(St(Ne.projectId,Ne.mediaId),3e3);if(!pt)continue;D.push({id:Ne.mediaId,name:Ne.name||"media",file:pt.file,blobUrl:pt.blobUrl,thumbnail:null,duration:0,width:0,height:0,type:B(Ne.mime),isProcessing:!1,idbKey:`idb://${Ne.projectId}:${Ne.mediaId}`,_mediaError:null}),ne++}catch(pt){console.warn("[recover-orphan] load failed for",Ne.mediaId,pt)}}ne>0&&console.warn(`[recover-orphan] Surfacing ${ne} orphan media file(s) from stale projectIds`)}if(D.length>0){Le(D);for(const Re of D)Re.type!=="audio"&&(async()=>{try{const Me=await Qt(Re.file);Le(ma=>ma.map(rt=>rt.id===Re.id?{...rt,duration:Me.duration||rt.duration,width:Me.width,height:Me.height}:rt));const Ne=await Ut(Re.file,0),pt=URL.createObjectURL(Ne);Le(ma=>ma.map(rt=>rt.id===Re.id?{...rt,thumbnail:pt}:rt))}catch(Me){console.warn("[recover] metadata regen failed:",Re.name,Me)}})();g.current=!0;const Ie=ne>0?`Surfaced ${ne} orphan media file(s) from old sessions — drag any that belong here onto the timeline, then save`:`Recovered ${D.length} media file(s) from local cache — re-add them to the timeline, then save`;O("warning",Ie);return}g.current=!0,O("info",`Loaded project "${U}" (no clips)`);return}he("Restoring media...");const oe=new Map,Oe=new Map;for(const T of ke){const D=T.id||T.mediaId;D&&!Oe.has(D)&&Oe.set(D,T)}for(const T of be){const D=T.mediaId||T.id;T.type!=="text"&&D&&!Oe.has(D)&&Oe.set(D,T)}tt(`Resolving ${Oe.size} media files...`);const ua=await Promise.all([...Oe.entries()].map(async([T,D])=>{if(C)return null;const ne=await R(D,Ke);return{mediaId:T,resolved:ne,meta:D}}));for(const T of ua){if(!T||C)continue;const{mediaId:D,resolved:ne,meta:Ie}=T;ne.blobUrl&&oe.set(D,{blobUrl:ne.blobUrl,file:ne.file,meta:Ie})}const Et=[];for(const T of be){let D=null,ne=null;const Ie=T.mediaId||T.id;if(Ie&&oe.has(Ie)){const Me=oe.get(Ie);D=Me.blobUrl,ne=Me.file}const Re=!D&&T.type!=="text";Et.push({...ha,...T,file:ne||null,blobUrl:D||null,thumbnail:null,_mediaError:Re?"Media not found — re-import":null})}const ut=new Map;for(const[T,D]of oe){const ne=D.meta||{};ut.set(T,{id:T,name:ne.name||"media",file:D.file,blobUrl:D.blobUrl,thumbnail:null,duration:ne.duration||0,width:ne.width||0,height:ne.height||0,type:ne.type||"video",isProcessing:!1,storagePath:ne.storagePath,_mediaError:null})}const pa=[],Da=new Set;for(const T of ke){const D=T.id||T.mediaId,ne=D?ut.get(D):null;pa.push({id:D,name:T.name||ne?.name||"media",file:ne?.file||null,blobUrl:ne?.blobUrl||null,thumbnail:null,duration:ne?.duration??T.duration??0,width:ne?.width??T.width??0,height:ne?.height??T.height??0,type:T.type||ne?.type||"video",isProcessing:!1,storagePath:T.storagePath||ne?.storagePath,idbKey:T.idbKey,_mediaError:ne?.blobUrl||T.type==="audio"?null:"Media not found — re-import"}),D&&Da.add(D)}for(const[T,D]of ut)Da.has(T)||pa.push(D);const _t=Tr({restoredClips:Et,mediaItems:pa,projectName:U});Le(_t.mediaItems),se(_t.clips),await K(k);for(const T of _t.mediaItems)!T.file||T.type==="audio"||(async()=>{try{const D=await Qt(T.file);Le(Re=>Re.map(Me=>Me.id===T.id?{...Me,duration:D.duration||Me.duration,width:D.width,height:D.height}:Me));const ne=await Ut(T.file,0),Ie=URL.createObjectURL(ne);Le(Re=>Re.map(Me=>Me.id===T.id?{...Me,thumbnail:Ie}:Me))}catch(D){console.warn("[restore] Thumbnail regen failed:",T.name,D)}})();g.current=!0,O(_t.notification.level,_t.notification.message)}catch(k){console.error("Project load error:",k),O("error","Failed to load project")}finally{C||(yt(!1),he(""),tt(""))}})(),()=>{C=!0}},[i?.id,t.state?.projectId,O,gt,se]),a.useEffect(()=>{te.preload()},[]),a.useEffect(()=>{const r=d=>{const h=d.ctrlKey||d.metaKey;if(h&&d.shiftKey&&d.key==="E"){d.preventDefault(),ca();return}if(d.key==="Escape"&&W){ye(!1);return}const u=document.activeElement;if(!(d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA"||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA"||u?.isContentEditable)){if(d.key==="/"&&W){d.preventDefault(),document.querySelector(".ai-input-box")?.focus();return}if((d.key==="Delete"||d.key==="Backspace")&&_e){d.preventDefault(),zt(_e);return}h&&d.key==="s"&&d.preventDefault(),h&&d.key==="e"&&(d.preventDefault(),A.length>0&&Mt("1080p")),h&&d.key==="z"&&(d.preventDefault(),d.shiftKey?dt():kt()),h&&d.key==="y"&&(d.preventDefault(),dt())}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[Mt,kt,dt,A.length,L,W,ca,_e,zt]);const Fa=a.useRef(Ee),Ba=a.useRef(A);return a.useEffect(()=>{Fa.current=Ee},[Ee]),a.useEffect(()=>{Ba.current=A},[A]),a.useEffect(()=>()=>{Fa.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl),r.thumbnail&&URL.revokeObjectURL(r.thumbnail)}),Ba.current.forEach(r=>{r.blobUrl&&URL.revokeObjectURL(r.blobUrl)})},[]),e.jsxs("div",{style:{...et.root,...w?{height:"100dvh",...Z?{paddingBottom:0,paddingRight:"44px"}:{paddingBottom:"56px"}}:{}},role:"application","aria-label":"ClipCut Video Editor",children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("style",{children:_r}),!w&&e.jsx("a",{href:"#editor-timeline",className:"skip-link",children:"Skip to timeline"}),e.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"},children:xt?`Exporting video... ${Ma}%`:wt||""}),e.jsx(Bn,{projectName:l,onProjectNameChange:c,onExport:Mt,isExporting:xt,exportProgress:Ma,currentOperation:wt,hasMediaToExport:A.filter(r=>r.type!=="audio"&&r.file).length>0,resolutions:xo,exportPresets:oa,exportSubMessage:_a,lastSaved:Vo,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,onCancelExport:Xo,onNewProject:Ko,onSave:Ho,onSettings:Yo,editorLayout:J,onLayoutChange:re,forceOpenExport:$o>0,onExportModalClosed:()=>Oo(0),onAiToggle:ca,aiPanelOpen:W}),!w&&e.jsx(Vn,{activeToolbar:x,onToolbarChange:I}),e.jsxs("main",{"aria-label":"Editor workspace",style:{flex:w?1:J==="wide-timeline"?"0 1 48%":"1 1 0%",display:"flex",flexDirection:w&&Z?"row":w?"column":"row",minWidth:0,minHeight:w?0:"200px",overflow:"hidden",zIndex:0},children:[J!=="compact"&&!w&&e.jsxs(e.Fragment,{children:[e.jsx(mt,{name:"left-panel",inline:!0,message:"Panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${j}px`}),children:e.jsx("div",{style:{width:`${j}px`,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0e1218"},children:e.jsxs("div",{style:{flex:"1 1 0%",overflow:"hidden auto",minHeight:0},className:"cs",children:[x==="media"&&e.jsx(to,{mediaTab:Y,onMediaTabChange:me,mediaItems:Ee,onImportMedia:Vt,onRemoveMedia:Ua,onAddToTimeline:Wt,selectedMediaId:ct,onSelectMedia:Nt,isImporting:Ta,style:ho}),x==="text"&&e.jsx(no,{selectedClip:$e,onClipUpdate:Pe,onAddClip:nt,currentTime:L.currentTime}),x==="audio"&&e.jsx(ro,{selectedClip:$e,onClipUpdate:Pe,bgMusic:Ve,onImportBgMusic:Kt,onUpdateBgMusicVolume:Ht,onRemoveBgMusic:Yt}),x==="captions"&&e.jsx(co,{clips:A,onAddClip:nt,onSetClips:se,currentTime:L.currentTime,mediaItems:Ee,selectedClip:$e,selectedClipId:_e,onSelectClip:Ze,onClipUpdate:Pe}),x==="stickers"&&e.jsx(io,{onAddClip:nt,currentTime:L.currentTime}),x==="effects"&&e.jsx(so,{selectedClip:$e,onClipUpdate:Pe}),x==="transition"&&e.jsx(ao,{rightTab:"video",onRightTabChange:P,rightSubTab:"basic",onRightSubTabChange:H,selectedClip:$e,onClipUpdate:Pe,onAllCaptionsUpdate:Aa,clips:A,bgMusic:Ve,onImportBgMusic:Kt,onUpdateBgMusicVolume:Ht,onRemoveBgMusic:Yt,style:ho}),x==="filters"&&e.jsx(lo,{selectedClip:$e,onClipUpdate:Pe})]})})})}),e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>lt(r,j),onDoubleClick:()=>xe(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})})]}),e.jsx("div",{style:w&&Z?{flex:"0 0 60%",display:"flex",flexDirection:"column",minWidth:0}:{flex:"1 1 0%",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},children:e.jsx(mt,{name:"player",inline:!0,message:"Video player encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"auto",height:"100%"}),children:e.jsx(Er,{isPlaying:L.isPlaying,onPlayPause:L.togglePlay,videoSrc:Do,currentTime:L.clipOffset,duration:ot,onTimeUpdate:qo,onSeek:Go,onEnded:da,onVideoError:Jo,clipProperties:L.currentClip||$e,textOverlays:Wo,selectedClipId:_e,onClipUpdate:Pe,onSelectClip:Ze,hasTimelineClips:A.some(r=>r.type!=="audio"&&r.type!=="text"),hasUnavailableMediaClips:zo,isRestoringMedia:ia&&wt.includes("Restoring")})})})}),J!=="compact"&&!w&&$e&&!W&&e.jsxs("div",{className:"inspector-enter",style:{display:"flex",flexDirection:"row",flexShrink:0,width:`${M+8}px`,overflow:"hidden"},children:[e.jsx("div",{className:"resize-handle resize-handle-v",onMouseDown:r=>at(r,M),onDoubleClick:()=>Ue(null),children:e.jsx("div",{className:"resize-handle-dot resize-handle-dot-v"})}),e.jsx(mt,{name:"inspector",inline:!0,message:"Inspector panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:`${M}px`}),children:e.jsx(ao,{rightTab:G,onRightTabChange:P,rightSubTab:y,onRightSubTabChange:H,selectedClip:$e,onClipUpdate:Pe,onAllCaptionsUpdate:Aa,clips:A,bgMusic:Ve,onImportBgMusic:Kt,onUpdateBgMusicVolume:Ht,onRemoveBgMusic:Yt,style:{width:`${M}px`}})})})]}),!w&&W&&e.jsx(mt,{name:"ai-chat",inline:!0,message:"AI panel encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(jt,{width:"360px"}),children:e.jsx(uo,{isOpen:W,onClose:()=>ye(!1),messages:V,isThinking:ge,slowHint:q,onSendMessage:Gt,suggestions:je,onApplySuggestion:Na})})}),w&&e.jsxs("div",{style:Z?{flex:"0 0 40%",display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden",borderLeft:"1px solid rgba(117,170,219,0.08)"}:{display:"contents"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"44px",padding:"0 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",flexShrink:0},children:[e.jsx("button",{onClick:()=>{const r=document.querySelector(".player-container");r&&(r.requestFullscreen?.()||r.webkitRequestFullscreen?.())},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Fullscreen",children:e.jsx(Te,{i:"fullscreen",s:20,c:"#94a3b8"})}),e.jsxs("div",{style:{fontFamily:"'JetBrains Mono', 'Fira Code', monospace",fontSize:"12px",letterSpacing:"0.5px",color:"#e2e8f0",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx("span",{style:{color:"#75aadb",fontWeight:600},children:Za(L.currentTime)}),e.jsx("span",{style:{color:"#475569"},children:"/"}),e.jsx("span",{style:{color:"#94a3b8"},children:Za(ot)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2px"},children:[e.jsx("button",{onClick:kt,disabled:!ht,style:{background:"none",border:"none",cursor:ht?"pointer":"not-allowed",opacity:ht?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Undo",children:e.jsx(Te,{i:"undo",s:18,c:"#94a3b8"})}),e.jsx("button",{onClick:dt,disabled:!bt,style:{background:"none",border:"none",cursor:bt?"pointer":"not-allowed",opacity:bt?1:.35,display:"flex",alignItems:"center",justifyContent:"center",width:"44px",height:"44px",minWidth:"auto",minHeight:"auto"},"aria-label":"Redo",children:e.jsx(Te,{i:"redo",s:18,c:"#94a3b8"})})]})]}),_e&&e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"4px",height:"64px",padding:"4px 12px",background:"#0e1218",borderTop:"1px solid rgba(117,170,219,0.06)",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",flexShrink:0,transition:"height 0.2s ease, opacity 0.2s ease"},children:[{icon:"volume_off",label:"Mute clip audio",action:()=>Pe(_e,{volume:$e?.volume===0?1:0})},{icon:"image",label:"Cover",action:()=>{}},{icon:"music_note",label:"+ Add audio",action:()=>{ft("audio"),N(!0)}},{icon:"title",label:"+ Add text",action:()=>{ft("text"),N(!0)}}].map((r,d)=>e.jsxs("button",{onClick:r.action,style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",padding:"6px 8px",cursor:"pointer",minWidth:"64px",flex:"0 0 auto",minHeight:"44px"},children:[e.jsx(Te,{i:r.icon,s:20,c:"#e2e8f0"}),e.jsx("span",{style:{fontSize:"9px",color:"#94a3b8",whiteSpace:"nowrap",fontFamily:"'Spline Sans', sans-serif"},children:r.label})]},d))}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Sa,{}),children:e.jsx(oo,{id:"editor-timeline",clips:A,selectedClipId:_e,onSelectClip:Ze,onUpdateClip:Pe,onDeleteClip:zt,onSplitClip:Xt,onAddClip:nt,onRippleDelete:La,currentTime:L.currentTime,onSeek:L.seek,totalDuration:ot,isProcessing:ia,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ee,onAddToTimeline:Wt,timelineHeight:ve,timelineMarkers:ra,onTimelineMarkersChange:$t})})})]})]}),w&&e.jsxs(e.Fragment,{children:[e.jsx(kr,{isOpen:le,onClose:()=>N(!1),children:e.jsx(mt,{name:"mobile-panel",inline:!0,message:"Panel error",children:e.jsxs(a.Suspense,{fallback:e.jsx(jt,{width:"100%",height:"200px"}),children:[We==="media"&&e.jsx(to,{mediaTab:Y,onMediaTabChange:me,mediaItems:Ee,onImportMedia:Vt,onRemoveMedia:Ua,onAddToTimeline:Wt,selectedMediaId:ct,onSelectMedia:Nt,isImporting:Ta}),We==="text"&&e.jsx(no,{selectedClip:$e,onClipUpdate:Pe,onAddClip:nt,currentTime:L.currentTime}),We==="audio"&&e.jsx(ro,{selectedClip:$e,onClipUpdate:Pe,bgMusic:Ve,onImportBgMusic:Kt,onUpdateBgMusicVolume:Ht,onRemoveBgMusic:Yt}),We==="captions"&&e.jsx(co,{clips:A,onAddClip:nt,onSetClips:se,currentTime:L.currentTime,mediaItems:Ee,selectedClip:$e,selectedClipId:_e,onSelectClip:Ze,onClipUpdate:Pe}),We==="stickers"&&e.jsx(io,{onAddClip:nt,currentTime:L.currentTime}),We==="effects"&&e.jsx(so,{selectedClip:$e,onClipUpdate:Pe}),We==="filters"&&e.jsx(lo,{selectedClip:$e,onClipUpdate:Pe}),We==="ai"&&e.jsx(uo,{isOpen:!0,onClose:()=>N(!1),messages:V,isThinking:ge,slowHint:q,onSendMessage:Gt,suggestions:je,onApplySuggestion:Na,isMobile:!0})]})})}),e.jsx("nav",{className:"mobile-tab-bar","aria-label":"Editor tools",children:[{id:"media",icon:"perm_media",label:"Media",tip:"Import and browse media"},{id:"text",icon:"title",label:"Text",tip:"Add manual text overlays"},{id:"captions",icon:"closed_caption",label:"Captions",tip:"Auto-generate subtitles from speech"},{id:"audio",icon:"music_note",label:"Audio",tip:"Background music and clip audio"},{id:"stickers",icon:"emoji_emotions",label:"Stickers",tip:"Drop emoji stickers on the preview"},{id:"effects",icon:"auto_fix_high",label:"Effects",tip:"Apply video effects"},{id:"filters",icon:"filter_vintage",label:"Filters",tip:"Apply colour filters"},{id:"ai",icon:"auto_awesome",label:"AI",tip:"AI editing assistant"}].map(r=>e.jsxs("button",{className:We===r.id&&le?"active":"",title:r.tip,"aria-label":r.tip,onClick:()=>{We===r.id?N(d=>!d):(ft(r.id),N(!0))},children:[e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:22,color:We===r.id&&le?"#75AADB":void 0},children:r.icon}),e.jsx("span",{children:r.label})]},r.id))})]}),!w&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"resize-handle resize-handle-h",onMouseDown:r=>ze(r,ve||Pr),onDoubleClick:()=>ue(null),children:e.jsx("div",{className:"resize-handle-dot"})}),e.jsx(mt,{name:"timeline",inline:!0,message:"Timeline encountered an error",children:e.jsx(a.Suspense,{fallback:e.jsx(Sa,{}),children:e.jsx(oo,{id:"editor-timeline",clips:A,selectedClipId:_e,onSelectClip:Ze,onUpdateClip:Pe,onDeleteClip:zt,onSplitClip:Xt,onAddClip:nt,onRippleDelete:La,currentTime:L.currentTime,onSeek:L.seek,totalDuration:ot,isProcessing:ia,canUndo:ht,canRedo:bt,onUndo:kt,onRedo:dt,mediaItems:Ee,onAddToTimeline:Wt,timelineHeight:ve,timelineMarkers:ra,onTimelineMarkersChange:$t})})})]}),te.isLoading&&!te.currentOperation&&!wt&&e.jsx(Lo,{progress:te.loadProgress}),(wt||te.currentOperation)&&e.jsx(Uo,{message:wt||"Processing...",progress:te.currentOperation!=null?te.progress:te.loadProgress,operationLabel:te.currentOperation?`${te.currentOperation}...`:"",subMessage:_a,onCancel:te.currentOperation?te.cancelOperation:void 0}),Fo&&e.jsx(Ao,{onComplete:()=>{Bo(!1),localStorage.setItem("clipcut_onboarded","1")}}),Ft&&e.jsx(No,{type:Ft.type,message:Ft.message,onClose:()=>Pa(null),autoClose:Ft.type!=="error"})]})},zr=a.memo(Dr),bi=Object.freeze(Object.defineProperty({__proto__:null,default:zr},Symbol.toStringTag,{value:"Module"}));export{Qr as A,ha as D,Jr as E,_n as F,Te as I,ii as M,En as S,oi as T,bi as V,ei as a,Zr as b,ni as c,mi as d,ui as e,pi as f,hi as g,Za as h,si as i,Qa as j,fi as k,ai as l,ti as m,ri as n,et as s,ci as t,di as x,li as z};
