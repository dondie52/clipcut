import{r,j as e}from"./DwQPoapS.js";import{I as u}from"./Cl0-LtCU.js";import"./BrP3k5jD.js";import"./DZxFKcQQ.js";import"./Et-wlZO3.js";import"./BGjQlUBL.js";import"./DUiPUEDF.js";import"./CXAbQs7h.js";import"./B9CjrYEi.js";import"./CrFPy8FH.js";const n={PRIMARY_BLUE:"#75AADB",PRIMARY_BLUE_DARK:"#5a8cbf",BG_SECONDARY:"#0d1117",BG_CARD:"#1a2332",BG_PANEL:"#0e1218",TEXT_PRIMARY:"#FFFFFF",TEXT_SECONDARY:"#e2e8f0",TEXT_MUTED:"#94a3b8",ERROR:"#ef4444",BORDER_LIGHT:"rgba(255,255,255,0.06)",BORDER_MEDIUM:"rgba(255,255,255,0.1)"},s={PRIMARY:"'Spline Sans', sans-serif"},k={MD:"6px"},N=`
  @keyframes aiPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  @keyframes aiSlideIn {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  @keyframes aiSlideOut {
    from { transform: translateX(0); }
    to   { transform: translateX(100%); }
  }
  @keyframes micPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
  }
  .ai-chat-panel { animation: aiSlideIn 0.25s cubic-bezier(0.32, 0.72, 0, 1); }
  .ai-chat-panel.closing { animation: aiSlideOut 0.2s ease forwards; }
  .ai-thinking-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${n.PRIMARY_BLUE};
    animation: aiPulse 1.2s ease-in-out infinite;
  }
  .ai-thinking-dot:nth-child(2) { animation-delay: 0.2s; }
  .ai-thinking-dot:nth-child(3) { animation-delay: 0.4s; }
  .ai-msg-bubble {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 1.5;
    word-break: break-word;
  }
  .ai-msg-user {
    background: ${n.PRIMARY_BLUE};
    color: #fff;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
  .ai-msg-assistant {
    background: ${n.BG_CARD};
    color: ${n.TEXT_SECONDARY};
    border-bottom-left-radius: 4px;
    align-self: flex-start;
  }
  .ai-input-box:focus {
    outline: none;
    border-color: ${n.PRIMARY_BLUE} !important;
  }
  .ai-send-btn:hover:not(:disabled) {
    background: ${n.PRIMARY_BLUE_DARK} !important;
  }
  .ai-undo-btn:hover {
    background: rgba(239,68,68,0.15) !important;
    border-color: ${n.ERROR} !important;
  }
  .ai-mic-btn.listening {
    animation: micPulse 1.5s ease-in-out infinite;
    background: rgba(239,68,68,0.15) !important;
  }
  .ai-quick-chip:hover {
    background: rgba(117,170,219,0.18) !important;
    border-color: rgba(117,170,219,0.4) !important;
  }
  .ai-suggestion-card:hover {
    background: rgba(117,170,219,0.08) !important;
    border-color: rgba(117,170,219,0.25) !important;
  }
`,X=[{label:"Auto-edit",prompt:"add captions, remove silence, and apply cinematic filter"},{label:"Captions",prompt:"add captions"},{label:"Remove silence",prompt:"remove silence"},{label:"Make vertical",prompt:"make it vertical for TikTok"},{label:"Highlights",prompt:"find the best 60 seconds"},{label:"Extract audio",prompt:"extract audio"},{label:"Cinematic",prompt:"apply cinematic filter"},{label:"Remove fillers",prompt:"remove filler words"},{label:"Zoom to speaker",prompt:"zoom to speaker"},{label:"Add fades",prompt:"add fade transitions"}],O=r.memo(function({msg:i}){const m=i.role==="user";return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:m?"flex-end":"flex-start",gap:4},children:[e.jsx("div",{className:`ai-msg-bubble ${m?"ai-msg-user":"ai-msg-assistant"}`,children:i.text}),i.actions&&i.actions.length>0&&e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:4,padding:"0 4px"},children:i.actions.map((c,a)=>e.jsx("span",{style:{fontSize:11,padding:"2px 8px",borderRadius:10,background:"rgba(117,170,219,0.12)",color:n.PRIMARY_BLUE,fontFamily:s.PRIMARY},children:c},a))}),i.openMedia&&e.jsxs("button",{onClick:i.openMedia,style:{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",marginTop:4,background:"rgba(117,170,219,0.1)",border:`1px solid ${n.PRIMARY_BLUE}`,borderRadius:8,cursor:"pointer",color:n.PRIMARY_BLUE,fontSize:12,fontFamily:s.PRIMARY,transition:"all 0.15s ease"},children:[e.jsx(u,{i:"perm_media",s:14,c:n.PRIMARY_BLUE}),"Open Media"]}),i.canUndo&&i.onUndo&&e.jsxs("button",{className:"ai-undo-btn",onClick:i.onUndo,style:{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",marginTop:2,background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,cursor:"pointer",color:n.ERROR,fontSize:11,fontFamily:s.PRIMARY,transition:"all 0.15s ease"},children:[e.jsx(u,{i:"undo",s:13,c:n.ERROR}),"Undo AI Edit"]})]})}),F=r.memo(function({slowHint:i=!1}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:4},children:[e.jsxs("div",{className:"ai-msg-bubble ai-msg-assistant",style:{display:"flex",alignItems:"center",gap:6,padding:"12px 18px"},children:[e.jsx("div",{className:"ai-thinking-dot"}),e.jsx("div",{className:"ai-thinking-dot"}),e.jsx("div",{className:"ai-thinking-dot"}),e.jsx("span",{style:{marginLeft:6,fontSize:12,color:n.TEXT_MUTED},children:"Thinking..."})]}),i&&e.jsx("div",{style:{padding:"0 4px",fontSize:11,color:n.TEXT_SECONDARY,fontFamily:s.PRIMARY,fontStyle:"italic"},children:"This can take up to 30 seconds on a cold start…"})]})}),z=r.memo(function({suggestion:i,onApply:m}){return e.jsxs("button",{className:"ai-suggestion-card",onClick:()=>m(i),style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",textAlign:"left",background:"rgba(117,170,219,0.04)",border:"1px solid rgba(117,170,219,0.12)",borderRadius:10,cursor:"pointer",transition:"all 0.15s ease"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:8,flexShrink:0,background:"rgba(117,170,219,0.1)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(u,{i:i.icon,s:16,c:n.PRIMARY_BLUE})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontSize:12,fontWeight:600,color:n.TEXT_PRIMARY,fontFamily:s.PRIMARY},children:i.title}),e.jsx("div",{style:{fontSize:11,color:n.TEXT_MUTED,fontFamily:s.PRIMARY,marginTop:1},children:i.description})]}),e.jsx(u,{i:"arrow_forward",s:14,c:n.TEXT_MUTED})]})}),H=r.memo(function({isOpen:i,onClose:m,messages:c,isThinking:a,slowHint:w=!1,onSendMessage:x,suggestions:y=[],onApplySuggestion:I,isMobile:o=!1}){const[f,h]=r.useState(""),[d,b]=r.useState(!1),E=r.useRef(null),g=r.useRef(null),p=r.useRef(null),j=r.useRef(!1),[S,T]=r.useState(!1);r.useEffect(()=>{i&&o&&!j.current&&c.length===0&&(j.current=!0,T(!0))},[i,o,c.length]),r.useEffect(()=>{c.length>0&&T(!1)},[c.length]),r.useEffect(()=>{E.current&&E.current.scrollIntoView({behavior:"smooth"})},[c,a]),r.useEffect(()=>{if(i&&g.current){const t=setTimeout(()=>g.current?.focus(),300);return()=>clearTimeout(t)}},[i]),r.useEffect(()=>()=>{p.current&&(p.current.abort(),p.current=null)},[]);const A=r.useCallback(()=>{const t=f.trim();!t||a||(x(t),h(""),g.current&&(g.current.style.height="auto"))},[f,a,x]),_=r.useCallback(t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),A())},[A]),D=r.useCallback(()=>{if(d){p.current?.stop(),b(!1);return}const t=window.SpeechRecognition||window.webkitSpeechRecognition;if(!t)return;const l=new t;l.continuous=!1,l.interimResults=!0,l.lang="en-US",l.onresult=U=>{const B=Array.from(U.results).map(L=>L[0].transcript).join("");h(B)},l.onend=()=>{b(!1),p.current=null},l.onerror=()=>{b(!1),p.current=null},p.current=l,l.start(),b(!0),setTimeout(()=>{p.current&&p.current.stop()},8e3)},[d]),C=r.useCallback(t=>{a||x(t)},[a,x]),M=r.useCallback(t=>{I?I(t):x(t.title)},[I,x]);if(!i)return null;const P=typeof window<"u"&&(window.SpeechRecognition||window.webkitSpeechRecognition),Y=o?"100%":"360px",v=e.jsxs(e.Fragment,{children:[e.jsx("style",{children:N}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:`1px solid ${n.BORDER_LIGHT}`,flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(u,{i:"auto_awesome",s:18,c:n.PRIMARY_BLUE}),e.jsx("span",{style:{fontSize:14,fontWeight:600,color:n.TEXT_PRIMARY,fontFamily:s.PRIMARY},children:"AI Editor"})]}),e.jsx("button",{onClick:m,style:{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:32,height:32,borderRadius:k.MD,transition:"background 0.15s ease"},"aria-label":"Close AI panel",onMouseEnter:t=>t.currentTarget.style.background="rgba(255,255,255,0.06)",onMouseLeave:t=>t.currentTarget.style.background="none",children:e.jsx(u,{i:"close",s:18,c:n.TEXT_MUTED})})]}),e.jsxs("div",{style:{flex:"1 1 0%",overflowY:"auto",overflowX:"hidden",padding:"16px 12px",display:"flex",flexDirection:"column",gap:12,minHeight:0},className:"cs",children:[y.length>0&&c.length<2&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:8},children:[e.jsx("span",{style:{fontSize:11,fontWeight:600,color:n.TEXT_MUTED,fontFamily:s.PRIMARY,textTransform:"uppercase",letterSpacing:"0.5px",padding:"0 4px"},children:"Suggestions"}),y.map(t=>e.jsx(z,{suggestion:t,onApply:M},t.id))]}),S&&c.length===0&&e.jsx("div",{className:"ai-msg-bubble ai-msg-assistant",style:{alignSelf:"flex-start"},children:"Hi! I'm your AI video editor. Try 'add captions' or 'remove silence'. What would you like to do?"}),c.length===0&&!a&&y.length===0&&!S&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,gap:12,padding:"40px 16px",textAlign:"center"},children:[e.jsx(u,{i:"auto_awesome",s:40,c:"rgba(117,170,219,0.25)"}),e.jsx("span",{style:{fontSize:14,color:n.TEXT_MUTED,fontFamily:s.PRIMARY,lineHeight:1.6},children:"Tell me what to do with your video."}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginTop:8},children:["Add captions","Remove silence","Make it cinematic","Speed up 2x"].map(t=>e.jsx("button",{onClick:()=>{h(t),g.current?.focus()},style:{background:"rgba(117,170,219,0.08)",border:"1px solid rgba(117,170,219,0.15)",borderRadius:20,padding:"6px 14px",cursor:"pointer",color:n.PRIMARY_BLUE,fontSize:12,fontFamily:s.PRIMARY,transition:"all 0.15s ease"},onMouseEnter:l=>{l.currentTarget.style.background="rgba(117,170,219,0.15)"},onMouseLeave:l=>{l.currentTarget.style.background="rgba(117,170,219,0.08)"},children:t},t))})]}),c.map((t,l)=>e.jsx(O,{msg:t},t.id||l)),a&&e.jsx(F,{slowHint:w}),e.jsx("div",{ref:E})]}),e.jsx("div",{style:{padding:o?"6px 16px 0":"6px 12px 0",flexShrink:0,display:"flex",flexWrap:"nowrap",gap:6,overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none",WebkitOverflowScrolling:"touch"},children:X.map(t=>e.jsx("button",{className:"ai-quick-chip",onClick:()=>C(t.prompt),disabled:a,style:{whiteSpace:"nowrap",flexShrink:0,padding:"4px 10px",borderRadius:14,background:"rgba(117,170,219,0.06)",border:"1px solid rgba(117,170,219,0.15)",color:n.PRIMARY_BLUE,fontSize:11,fontFamily:s.PRIMARY,cursor:a?"not-allowed":"pointer",opacity:a?.5:1,transition:"all 0.15s ease"},children:t.label},t.label))}),e.jsxs("div",{style:{padding:"8px 12px 12px",borderTop:`1px solid ${n.BORDER_LIGHT}`,flexShrink:0,display:"flex",gap:6,alignItems:"flex-end",marginTop:4},children:[P&&e.jsx("button",{className:`ai-mic-btn${d?" listening":""}`,onClick:D,style:{width:o?44:32,height:o?44:32,minWidth:o?44:32,minHeight:o?44:32,borderRadius:k.MD,border:"none",cursor:"pointer",background:d?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",flexShrink:0},"aria-label":d?"Stop listening":"Voice input",title:d?"Stop listening":"Voice input",children:e.jsx(u,{i:d?"mic":"mic_none",s:o?22:16,c:d?n.ERROR:n.TEXT_MUTED})}),e.jsx("textarea",{ref:g,className:"ai-input-box",value:f,onChange:t=>h(t.target.value),onKeyDown:_,placeholder:d?"Listening...":"Ask AI to edit your video...",rows:1,style:{flex:1,resize:"none",background:n.BG_PANEL,border:`1px solid ${d?n.ERROR:n.BORDER_MEDIUM}`,borderRadius:12,padding:"10px 14px",color:n.TEXT_PRIMARY,fontSize:13,fontFamily:s.PRIMARY,lineHeight:1.4,maxHeight:100,overflowY:"auto",transition:"border-color 0.15s ease"},onInput:t=>{t.target.style.height="auto",t.target.style.height=Math.min(t.target.scrollHeight,100)+"px"}}),e.jsx("button",{className:"ai-send-btn",onClick:A,disabled:!f.trim()||a,style:{width:o?48:36,height:o?48:36,minWidth:o?48:36,minHeight:o?48:36,borderRadius:k.MD,border:"none",cursor:"pointer",background:f.trim()&&!a?n.PRIMARY_BLUE:n.BG_CARD,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.15s ease",opacity:!f.trim()||a?.5:1,flexShrink:0},"aria-label":"Send message",children:e.jsx(u,{i:"send",s:o?22:18,c:f.trim()&&!a?"#fff":n.TEXT_MUTED})})]})]});return o?e.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0},role:"complementary","aria-label":"AI editing assistant",children:v}):e.jsx("div",{className:"ai-chat-panel",style:{width:Y,flexShrink:0,display:"flex",flexDirection:"column",background:n.BG_SECONDARY,height:"100%",borderLeft:`1px solid ${n.BORDER_LIGHT}`,overflow:"hidden"},role:"complementary","aria-label":"AI editing assistant",children:v})});H.displayName="AIChatPanel";export{H as default};
