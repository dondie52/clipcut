import{r as i,j as e}from"./-P2Ya96f.js";import{I as b,s as C,S as X,F as H,E as G,T as Y,a as J,b as Z,A as q,D as A}from"./QhlpZlzK.js";import{u as Q}from"./DJ1_-8uU.js";import"./CvFNCHZB.js";import"./DZxFKcQQ.js";import"./DuArS60f.js";import"./CEyUb1j3.js";import"./B9CjrYEi.js";const U=`
  .section-collapsible {
    transition: all 0.2s ease;
  }
  
  .section-header {
    transition: all 0.15s ease;
    cursor: pointer;
    border-radius: 4px;
    margin: -4px -8px;
    padding: 4px 8px;
  }
  
  .section-header:hover {
    background: rgba(117, 170, 219, 0.08);
  }
  
  .section-toggle-icon {
    transition: transform 0.2s ease;
  }
  
  .section-toggle-icon.collapsed {
    transform: rotate(-90deg);
  }
  
  .section-content {
    overflow: hidden;
    transition: all 0.2s ease;
  }
  
  .section-content.collapsed {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
  }
  
  .section-content.expanded {
    max-height: 500px;
    opacity: 1;
    margin-top: 8px;
  }
  
  .inspector-slider {
    transition: all 0.1s ease;
  }
  
  .inspector-slider:hover {
    transform: scaleY(1.2);
  }
  
  .inspector-slider:focus {
    outline: none;
  }
  
  .inspector-input {
    transition: all 0.15s ease;
  }
  
  .inspector-input:hover {
    border-color: rgba(117, 170, 219, 0.3) !important;
  }
  
  .inspector-input:focus {
    border-color: #75aadb !important;
    box-shadow: 0 0 0 2px rgba(117, 170, 219, 0.2);
  }
  
  .effect-card {
    transition: all 0.15s ease;
  }
  
  .effect-card:hover {
    background: rgba(26, 35, 50, 0.8) !important;
    border-color: rgba(117, 170, 219, 0.3) !important;
  }
  
  .effect-action-btn {
    transition: all 0.1s ease;
    opacity: 0.6;
  }
  
  .effect-action-btn:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  .color-swatch {
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: pointer;
  }
  
  .color-swatch:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
  
  .reset-btn {
    transition: all 0.15s ease;
    opacity: 0;
  }
  
  .slider-row:hover .reset-btn {
    opacity: 1;
  }
  
  .reset-btn:hover {
    color: #75aadb !important;
  }
`,h=i.memo(({t,children:r,defaultExpanded:s=!1,onToggle:p})=>{const[n,c]=i.useState(s),d=i.useCallback(()=>{c(g=>!g),p?.(!n)},[n,p]),u=i.useCallback(g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),d())},[d]);return e.jsxs("div",{className:"section-collapsible",children:[e.jsx("style",{children:U}),e.jsx("div",{className:"section-header",onClick:d,onKeyDown:u,role:"button",tabIndex:0,"aria-expanded":n,"aria-controls":`section-${t.toLowerCase().replace(/\s+/g,"-")}`,children:e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:e.jsxs("h3",{style:{fontSize:"10px",fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"1.2px",margin:0,display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{className:`section-toggle-icon ${n?"":"collapsed"}`,style:{display:"flex"},children:e.jsx(b,{i:"expand_more",s:14,c:"#475569"})}),t]})})}),e.jsx("div",{id:`section-${t.toLowerCase().replace(/\s+/g,"-")}`,className:`section-content ${n?"expanded":"collapsed"}`,style:{display:"flex",flexDirection:"column",gap:"8px"},children:r})]})});h.displayName="Section";const z=i.memo(({l:t,v:r,vc:s="#cbd5e1",editable:p=!1,onChange:n})=>{const[c,d]=i.useState(!1),[u,g]=i.useState(r),I=i.useCallback(()=>{p&&(d(!0),g(r))},[p,r]),f=i.useCallback(()=>{d(!1),u!==r&&n&&n(u)},[u,r,n]),m=i.useCallback(v=>{v.key==="Enter"?f():v.key==="Escape"&&(d(!1),g(r))},[f,r]);return e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},role:"group","aria-label":`${t}: ${r}`,children:[e.jsx("span",{style:{fontSize:"12px",color:"#cbd5e1"},children:t}),c?e.jsx("input",{type:"text",value:u,onChange:v=>g(v.target.value),onBlur:f,onKeyDown:m,autoFocus:!0,className:"inspector-input",style:{background:"#1e293b",border:"1px solid #75aadb",borderRadius:"4px",padding:"2px 6px",fontSize:"12px",fontWeight:500,color:s,width:"80px",textAlign:"right",outline:"none"}}):e.jsx("span",{style:{fontSize:"12px",fontWeight:500,color:s,cursor:p?"pointer":"default"},onDoubleClick:I,title:p?"Double-click to edit":void 0,children:r})]})});z.displayName="Row";const y=i.memo(({l:t,v:r,min:s=0,max:p=100,step:n=1,unit:c="%",value:d,onChange:u,onChangeCommit:g,onReset:I,defaultValue:f=50,disabled:m=!1})=>{const[v,l]=i.useState(d!==void 0?d:f),j=d!==void 0?d:v,F=r!==void 0?r:`${j}${c}`,L=i.useCallback(E=>{const D=Number(E.target.value);l(D),u?.(D)},[u]),W=i.useCallback(()=>{g?.(d!==void 0?d:v)},[g,d,v]),$=i.useCallback(E=>{E.stopPropagation(),l(f),u?.(f),g?.(f),I?.()},[f,u,g,I]);return e.jsxs("div",{className:"slider-row",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#4a5568",marginBottom:"3px"},children:[e.jsx("span",{style:{fontWeight:500},children:t}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{style:{color:j!==f?"#75aadb":"#4a5568",fontWeight:j!==f?600:400,fontFamily:"'JetBrains Mono', monospace",fontSize:"9px",background:j!==f?"rgba(117,170,219,0.08)":"transparent",padding:"1px 5px",borderRadius:"3px"},children:F}),j!==f&&e.jsx("button",{onClick:$,className:"reset-btn",style:{background:"none",border:"none",padding:0,cursor:"pointer",color:"#4a5568",display:"flex",alignItems:"center"},"aria-label":`Reset ${t} to default`,title:"Reset to default",children:e.jsx(b,{i:"refresh",s:11})})]})]}),e.jsx("input",{type:"range",min:s,max:p,step:n,value:j,onChange:L,onPointerUp:W,onKeyUp:W,disabled:m,className:"inspector-slider",style:{width:"100%",accentColor:"#75aadb",cursor:m?"not-allowed":"pointer",opacity:m?.4:1},"aria-label":`${t}: ${F}`,"aria-valuemin":s,"aria-valuemax":p,"aria-valuenow":j})]})});y.displayName="Slider";const M=i.memo(({l:t,v:r,type:s="text",onChange:p,min:n,max:c,step:d})=>{const[u,g]=i.useState(r),[I,f]=i.useState(!1),m=i.useCallback(j=>{g(j.target.value)},[]),v=i.useCallback(()=>{f(!1),u!==r&&p&&p(u)},[u,r,p]),l=i.useCallback(j=>{j.key==="Enter"&&j.target.blur()},[]);return e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"9px",fontWeight:500,color:I?"#75aadb":"#4a5568",display:"block",marginBottom:"2px",transition:"color 0.15s ease",letterSpacing:"0.3px"},children:t}),e.jsx("input",{type:s,value:u,onChange:m,onFocus:()=>f(!0),onBlur:v,onKeyDown:l,min:n,max:c,step:d,className:"inspector-input",style:{width:"100%",background:"rgba(30,41,59,0.6)",border:"1px solid rgba(117,170,219,0.08)",borderRadius:"5px",fontSize:"11px",padding:"6px 8px",color:"#75aadb",textAlign:"center",outline:"none",boxSizing:"border-box",fontFamily:"'JetBrains Mono', monospace"},"aria-label":t})]})});M.displayName="SmallInput";const K=i.memo(({number:t,name:r,enabled:s=!0,onEdit:p,onDelete:n,onToggle:c})=>e.jsxs("div",{className:"effect-card",style:{background:"rgba(26,35,50,0.4)",borderRadius:"6px",padding:"6px 8px",display:"flex",alignItems:"center",justifyContent:"space-between",border:s?"1px solid rgba(117,170,219,0.1)":"1px solid rgba(255,255,255,0.03)",opacity:s?1:.45,transition:"all 0.15s ease"},role:"listitem","aria-label":`${r} effect${s?"":" (disabled)"}`,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("button",{onClick:c,style:{background:s?"rgba(117,170,219,0.1)":"rgba(255,255,255,0.03)",border:"none",padding:"4px",cursor:"pointer",display:"flex",borderRadius:"4px"},"aria-label":s?"Disable effect":"Enable effect",title:s?"Disable":"Enable",children:e.jsx(b,{i:s?"visibility":"visibility_off",s:13,c:s?"#75aadb":"#4a5568"})}),e.jsxs("div",{children:[e.jsxs("span",{style:{fontSize:"8px",color:"#4a5568",display:"block",fontWeight:600,letterSpacing:"0.5px"},children:["FX ",t]}),e.jsx("span",{style:{fontSize:"11px",fontWeight:500,color:s?"#e2e8f0":"#64748b"},children:r})]})]}),e.jsxs("div",{style:{display:"flex",gap:"6px"},children:[e.jsx("button",{onClick:p,className:"effect-action-btn",style:{background:"none",border:"none",padding:"4px",cursor:"pointer",borderRadius:"4px"},"aria-label":`Edit ${r}`,title:"Edit",children:e.jsx(b,{i:"edit",s:16,c:"#64748b"})}),e.jsx("button",{onClick:n,className:"effect-action-btn",style:{background:"none",border:"none",padding:"4px",cursor:"pointer",borderRadius:"4px"},"aria-label":`Delete ${r}`,title:"Delete",children:e.jsx(b,{i:"delete",s:16,c:"#64748b"})})]})]}));K.displayName="EffectCard";const B=i.memo(({label:t,value:r="#ffffff",onChange:s,presets:p=["#ffffff","#000000","#75aadb","#ef4444","#22c55e","#eab308","#5a8cbf","#3b82f6"]})=>{const[n,c]=i.useState(!1);return e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"10px",color:"#64748b",display:"block",marginBottom:"3px"},children:t}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("button",{onClick:()=>c(!n),className:"color-swatch",style:{width:"28px",height:"28px",borderRadius:"4px",background:r,border:"2px solid rgba(255, 255, 255, 0.2)"},"aria-label":`Selected color: ${r}`,title:"Click to change color"}),e.jsx("input",{type:"text",value:r,onChange:d=>s?.(d.target.value),className:"inspector-input",style:{flex:1,background:"#1e293b",border:"1px solid transparent",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",color:"#94a3b8",fontFamily:"monospace",outline:"none"},"aria-label":`${t} color value`})]}),n&&e.jsx("div",{style:{display:"flex",gap:"4px",marginTop:"8px",flexWrap:"wrap"},children:p.map(d=>e.jsx("button",{onClick:()=>{s?.(d),c(!1)},className:"color-swatch",style:{width:"24px",height:"24px",borderRadius:"4px",background:d,border:r===d?"2px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)"},"aria-label":`Select color ${d}`},d))})]})});B.displayName="ColorPicker";const S=i.memo(()=>e.jsx("div",{style:{height:"1px",background:"linear-gradient(90deg, transparent 0%, rgba(117,170,219,0.08) 50%, transparent 100%)",margin:"1px 0"},role:"separator"}));S.displayName="Hr";const ee=`
  ${X}

  .inspector-tab {
    position: relative;
    transition: all 0.15s ease;
  }

  .inspector-tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #75aadb;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .inspector-tab.active::after {
    transform: scaleX(1);
  }

  .inspector-tab:hover:not(.active) {
    color: #94a3b8 !important;
    background: rgba(255, 255, 255, 0.03);
  }

  .inspector-subtab {
    transition: all 0.15s ease;
    border-radius: 10px;
  }

  .inspector-subtab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.06) !important;
  }

  .add-effect-btn {
    transition: all 0.15s ease;
  }

  .add-effect-btn:hover {
    background: rgba(117, 170, 219, 0.15) !important;
    border-color: #75aadb !important;
  }

  .coming-soon-badge {
    display: inline-block;
    background: rgba(117, 170, 219, 0.15);
    color: #75aadb;
    font-size: 9px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`,o=(t,r)=>t?.[r]??A[r],O=i.memo(({icon:t,title:r,description:s})=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",textAlign:"center",color:"#475569",gap:"12px"},children:[e.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"16px",background:"rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(b,{i:t,s:28,c:"#334155"})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"13px",fontWeight:600,margin:"0 0 4px 0",color:"#94a3b8"},children:r}),e.jsx("p",{style:{fontSize:"11px",color:"#475569",margin:"0 0 8px 0",lineHeight:1.4},children:s}),e.jsx("span",{className:"coming-soon-badge",children:"Coming Soon"})]})]}));O.displayName="ComingSoonPlaceholder";const ae=({rightTab:t,onRightTabChange:r,rightSubTab:s,onRightSubTabChange:p,selectedClip:n,onClipUpdate:c,bgMusic:d,onImportBgMusic:u,onUpdateBgMusicVolume:g,onRemoveBgMusic:I,style:f})=>{const m=Q(),v=i.useRef(null),l=i.useCallback((a,x)=>{n&&c(n.id,{[a]:x})},[n,c]),j=i.useCallback(a=>{if(!n)return;const x=(n.effects||[]).map(w=>w.id===a?{...w,enabled:!w.enabled}:w);c(n.id,{effects:x})},[n,c]),F=i.useCallback(a=>{if(!n)return;const x=(n.effects||[]).filter(w=>w.id!==a);c(n.id,{effects:x})},[n,c]),L=i.useCallback(()=>{if(!n)return;const a={id:Date.now(),name:"New Effect",enabled:!0,type:"blur",params:{radius:5}};c(n.id,{effects:[...n.effects||[],a]})},[n,c]),W=i.useCallback(a=>{if(!n)return;const x={id:Date.now(),name:a.name,enabled:!0,type:a.type,params:{...a.params}};c(n.id,{effects:[...n.effects||[],x]})},[n,c]),$=i.useCallback((a,x,w,N)=>{const P=x.findIndex(k=>k.toLowerCase()===w);if(a.key==="ArrowRight"){a.preventDefault();const k=(P+1)%x.length;N(x[k].toLowerCase())}else if(a.key==="ArrowLeft"){a.preventDefault();const k=P===0?x.length-1:P-1;N(x[k].toLowerCase())}},[]),E=["Video","Audio","Speed","Animate","Adjust"],D=["Basic","Cutout","Mask","Canvas"],R=!!n,_=n?.effects||[],T=Math.round(o(n,"speed")*100),V={video:"movie",audio:"music_note",speed:"speed",animate:"animation",adjust:"tune"};return e.jsxs("aside",{className:"editor-right-panel",style:{...C.rightPanel,...f,...m?{width:"100%",minWidth:0,maxWidth:"100%",borderLeft:"none"}:{}},role:"complementary","aria-label":"Inspector panel",children:[e.jsx("style",{children:ee}),!m&&e.jsxs("div",{style:{height:"32px",display:"flex",alignItems:"center",padding:"0 14px",borderBottom:"1px solid rgba(117,170,219,0.04)",background:"rgba(15,23,42,0.3)"},children:[e.jsx("span",{style:{fontSize:"10px",fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"1.5px"},children:"Inspector"}),R&&e.jsx("span",{style:{marginLeft:"auto",fontSize:"9px",fontWeight:500,color:"#75aadb",background:"rgba(117,170,219,0.1)",padding:"2px 8px",borderRadius:"10px"},children:n?.name||"Clip"})]}),e.jsx("nav",{style:{display:"flex",borderBottom:"1px solid rgba(117,170,219,0.06)",height:m?"44px":"38px",flexShrink:0,background:"rgba(15,23,42,0.2)",...m?{overflowX:"auto",WebkitOverflowScrolling:"touch",gap:"0",scrollbarWidth:"none"}:{}},role:"tablist","aria-label":"Inspector categories",onKeyDown:a=>$(a,E,t,r),children:E.map(a=>e.jsxs("button",{onClick:()=>r(a.toLowerCase()),className:`inspector-tab ${t===a.toLowerCase()?"active":""}`,style:{...C.ghost,flex:m?"none":1,fontSize:m?"10px":"9px",fontWeight:700,color:t===a.toLowerCase()?"#75aadb":"#4a5568",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1px",...m?{padding:"0 14px",minWidth:"60px",minHeight:"44px",whiteSpace:"nowrap"}:{}},role:"tab","aria-selected":t===a.toLowerCase(),"aria-controls":`panel-${a.toLowerCase()}`,tabIndex:t===a.toLowerCase()?0:-1,children:[e.jsx(b,{i:V[a.toLowerCase()],s:m?16:14,c:t===a.toLowerCase()?"#75aadb":"#4a5568"}),e.jsx("span",{style:{letterSpacing:"0.5px"},children:a})]},a))}),e.jsx("nav",{style:{display:"flex",gap:"4px",padding:"4px 8px",background:"rgba(8,10,14,0.5)",flexShrink:0,borderBottom:"1px solid rgba(255,255,255,0.03)"},role:"tablist","aria-label":"Inspector sub-categories",onKeyDown:a=>$(a,D,s,p),children:D.map(a=>e.jsx("button",{onClick:()=>p(a.toLowerCase()),className:`inspector-subtab ${s===a.toLowerCase()?"active":""}`,style:{...C.ghost,fontSize:"8px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",padding:"3px 10px",borderRadius:"10px",color:s===a.toLowerCase()?"#e2e8f0":"#4a5568",background:s===a.toLowerCase()?"rgba(117,170,219,0.15)":"transparent"},role:"tab","aria-selected":s===a.toLowerCase(),tabIndex:s===a.toLowerCase()?0:-1,children:a},a))}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"10px",display:"flex",flexDirection:"column",gap:"8px"},className:"cs",id:`panel-${t}`,role:"tabpanel","aria-label":`${t} settings`,children:[!R&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,color:"#475569",textAlign:"center",padding:"24px 16px"},children:[e.jsx("div",{style:{width:"64px",height:"64px",borderRadius:"16px",background:"linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.02) 100%)",border:"1px solid rgba(117,170,219,0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"},children:e.jsx(b,{i:"touch_app",s:28,c:"#3d4a5c"})}),e.jsx("p",{style:{fontSize:"13px",fontWeight:600,color:"#64748b",margin:"0 0 6px 0"},children:"No clip selected"}),e.jsx("p",{style:{fontSize:"11px",color:"#3d4a5c",margin:"0 0 20px 0",lineHeight:1.5},children:"Select a clip on the timeline to edit its properties"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px",width:"100%",padding:"12px",borderRadius:"8px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.03)"},children:[{icon:"tune",label:"Transform & Position"},{icon:"palette",label:"Filters & Color"},{icon:"speed",label:"Speed & Time"},{icon:"animation",label:"Keyframes & Animation"}].map(a=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"4px 0"},children:[e.jsx(b,{i:a.icon,s:14,c:"#2d3748"}),e.jsx("span",{style:{fontSize:"10px",color:"#334155"},children:a.label})]},a.label))})]}),R&&s==="basic"&&e.jsxs(e.Fragment,{children:[t==="video"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Filters",children:[e.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"8px"},children:H.map(a=>e.jsx("button",{onClick:()=>l("filterName",a.name==="None"?null:a.name),style:{background:o(n,"filterName")===a.name||!o(n,"filterName")&&a.name==="None"?"rgba(117, 170, 219, 0.2)":"rgba(30, 41, 59, 0.5)",border:o(n,"filterName")===a.name||!o(n,"filterName")&&a.name==="None"?"1px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"4px 10px",color:o(n,"filterName")===a.name||!o(n,"filterName")&&a.name==="None"?"#75aadb":"#94a3b8",fontSize:"10px",fontWeight:500,cursor:"pointer"},children:a.name},a.name))}),e.jsx(y,{l:"Strength",value:o(n,"filterStrength"),onChange:a=>l("filterStrength",a),defaultValue:50,disabled:!o(n,"filterName")})]}),e.jsx(S,{}),e.jsxs(h,{t:"Effects",children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},role:"list","aria-label":"Applied effects",children:_.map((a,x)=>e.jsx(K,{number:x+1,name:a.name,enabled:a.enabled,onToggle:()=>j(a.id),onEdit:()=>{if(G.find(N=>N.name===a.name)){const N=(a.params?.radius||5)===5?10:5,P=_.map(k=>k.id===a.id?{...k,params:{...k.params,radius:N}}:k);c(n.id,{effects:P})}},onDelete:()=>F(a.id)},a.id))}),e.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"4px"},children:G.map(a=>e.jsxs("button",{onClick:()=>W(a),style:{background:"rgba(30, 41, 59, 0.5)",border:"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"4px",padding:"4px 8px",color:"#64748b",fontSize:"10px",cursor:"pointer"},children:["+ ",a.name]},a.name))}),e.jsxs("button",{onClick:L,className:"add-effect-btn",style:{width:"100%",padding:"10px",background:"transparent",border:"1px dashed rgba(255, 255, 255, 0.1)",borderRadius:"4px",color:"#64748b",fontSize:"11px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"},"aria-label":"Add new effect",children:[e.jsx(b,{i:"add",s:16,c:"#64748b"}),"Add Effect"]})]}),e.jsx(S,{}),e.jsxs(h,{t:"Position & Size",defaultExpanded:!0,children:[e.jsx(y,{l:"Zoom",value:Math.round(o(n,"scale")*100),onChange:a=>l("scale",a/100),defaultValue:100,min:10,max:300}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"4px"},children:[e.jsx(M,{l:"Position X",v:String(o(n,"positionX")),type:"number",onChange:a=>l("positionX",Number(a)||0)}),e.jsx(M,{l:"Position Y",v:String(o(n,"positionY")),type:"number",onChange:a=>l("positionY",Number(a)||0)})]}),e.jsx(y,{l:"Rotation",value:o(n,"rotation"),onChange:a=>l("rotation",a),min:-180,max:180,defaultValue:0,unit:"°"}),e.jsx(y,{l:"Opacity",value:Math.round(o(n,"opacity")*100),onChange:a=>l("opacity",a/100),defaultValue:100})]}),e.jsx(S,{}),e.jsxs(h,{t:"Text Overlay",children:[e.jsx(M,{l:"Text",v:o(n,"text")||"",onChange:a=>l("text",a),placeholder:"Enter text..."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"4px"},children:[e.jsx(M,{l:"Font Size",v:String(o(n,"textSize")),type:"number",onChange:a=>l("textSize",Math.max(8,Math.min(200,Number(a)||48)))}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"10px",color:"#64748b",marginBottom:"4px",fontWeight:500},children:"Color"}),e.jsx("input",{type:"color",value:o(n,"textColor")||"#ffffff",onChange:a=>l("textColor",a.target.value),style:{width:"100%",height:"28px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",background:"rgba(30,41,59,0.5)",cursor:"pointer",padding:"2px"}})]})]}),e.jsxs("div",{style:{marginTop:"8px"},children:[e.jsx("div",{style:{fontSize:"10px",color:"#64748b",marginBottom:"6px",fontWeight:500},children:"Position"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"4px"},children:Y.map(a=>e.jsx("button",{onClick:()=>l("textPosition",a.value),title:a.label,style:{background:o(n,"textPosition")===a.value?"rgba(117,170,219,0.2)":"rgba(30,41,59,0.5)",border:o(n,"textPosition")===a.value?"1px solid #75aadb":"1px solid rgba(255,255,255,0.08)",borderRadius:"4px",padding:"6px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(b,{i:a.icon,s:14,c:o(n,"textPosition")===a.value?"#75aadb":"#64748b"})},a.value))})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"6px"},children:e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"10px",color:"#64748b",marginBottom:"4px",fontWeight:500},children:"Bg Color"}),e.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:[e.jsx("input",{type:"color",value:o(n,"textBgColor")||"#000000",onChange:a=>l("textBgColor",a.target.value),disabled:!o(n,"textBgColor"),style:{width:"28px",height:"28px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",background:"rgba(30,41,59,0.5)",cursor:"pointer",padding:"2px",opacity:o(n,"textBgColor")?1:.4}}),e.jsx("button",{onClick:()=>l("textBgColor",o(n,"textBgColor")?"":"#000000"),style:{background:o(n,"textBgColor")?"rgba(117,170,219,0.15)":"rgba(30,41,59,0.5)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"4px",padding:"4px 8px",color:"#94a3b8",fontSize:"9px",cursor:"pointer"},children:o(n,"textBgColor")?"On":"Off"})]})]})}),o(n,"text")&&e.jsxs("div",{style:{marginTop:"8px",padding:"8px 10px",borderRadius:"6px",background:"rgba(117,170,219,0.06)",border:"1px solid rgba(117,170,219,0.1)",fontSize:"10px",color:"#75aadb",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx(b,{i:"info",s:12,c:"#75aadb"}),"Text rendered during export via FFmpeg"]})]}),e.jsx(S,{}),e.jsxs(h,{t:"Transition (to next clip)",children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"4px"},children:J.map(a=>e.jsxs("button",{onClick:()=>l("transition",a.value),title:a.label,style:{background:o(n,"transition")===a.value?"rgba(117,170,219,0.2)":"rgba(30,41,59,0.5)",border:o(n,"transition")===a.value?"1px solid #75aadb":"1px solid rgba(255,255,255,0.08)",borderRadius:"4px",padding:"6px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",fontSize:"9px",color:o(n,"transition")===a.value?"#75aadb":"#64748b"},children:[e.jsx(b,{i:a.icon,s:14,c:o(n,"transition")===a.value?"#75aadb":"#64748b"}),a.label]},a.label))}),o(n,"transition")&&e.jsx(y,{l:"Duration",value:Math.round((o(n,"transitionDuration")||1)*10),onChange:a=>l("transitionDuration",a/10),min:2,max:30,defaultValue:10,unit:"s",v:`${(o(n,"transitionDuration")||1).toFixed(1)}s`})]})]}),t==="audio"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Volume",defaultExpanded:!0,children:[e.jsx(y,{l:"Volume",value:Math.round(o(n,"volume")*100),onChange:a=>l("volume",a/100),defaultValue:100,min:0,max:200}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"12px",color:"#cbd5e1"},children:"Mute"}),e.jsxs("button",{onClick:()=>l("isMuted",!o(n,"isMuted")),style:{background:o(n,"isMuted")?"rgba(239, 68, 68, 0.2)":"rgba(30, 41, 59, 0.5)",border:o(n,"isMuted")?"1px solid #ef4444":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"4px 12px",color:o(n,"isMuted")?"#ef4444":"#94a3b8",fontSize:"11px",fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(b,{i:o(n,"isMuted")?"volume_off":"volume_up",s:14,c:o(n,"isMuted")?"#ef4444":"#94a3b8"}),o(n,"isMuted")?"Muted":"On"]})]})]}),e.jsx(S,{}),e.jsxs(h,{t:"Background Music",children:[e.jsx("input",{ref:v,type:"file",accept:"audio/*",style:{display:"none"},onChange:a=>{a.target.files?.[0]&&u?.(a.target.files[0]),a.target.value=""}}),d?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",borderRadius:"6px",background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.15)"},children:[e.jsx(b,{i:"music_note",s:16,c:"#34d399"}),e.jsx("span",{style:{flex:1,fontSize:"11px",color:"#cbd5e1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:d.name}),e.jsx("button",{onClick:I,style:{background:"rgba(239,68,68,0.15)",border:"none",borderRadius:"4px",padding:"2px 6px",cursor:"pointer",color:"#ef4444",fontSize:"10px"},"aria-label":"Remove background music",children:e.jsx(b,{i:"close",s:12,c:"#ef4444"})})]}),e.jsx(y,{l:"Music Volume",value:Math.round((d.volume??.3)*100),onChange:a=>g?.(a/100),min:0,max:100,defaultValue:30})]}):e.jsxs("button",{onClick:()=>v.current?.click(),style:{width:"100%",padding:"14px",background:"transparent",border:"1px dashed rgba(52,211,153,0.3)",borderRadius:"6px",color:"#34d399",fontSize:"11px",fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.15s ease"},children:[e.jsx(b,{i:"add",s:16,c:"#34d399"}),"Add Background Music"]})]})]}),t==="speed"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Playback Speed",defaultExpanded:!0,children:[e.jsx(y,{l:"Speed",value:T,onChange:a=>l("speed",a/100),min:25,max:400,defaultValue:100}),e.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"8px"},children:Z.map(a=>{const x=Math.round(a.value*100);return e.jsx("button",{onClick:()=>l("speed",a.value),style:{background:T===x?"rgba(117, 170, 219, 0.2)":"rgba(30, 41, 59, 0.5)",border:T===x?"1px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"4px 12px",color:T===x?"#75aadb":"#94a3b8",fontSize:"11px",fontWeight:500,cursor:"pointer"},children:a.label},a.label)})})]}),e.jsx(S,{}),e.jsxs(h,{t:"Time Remapping",children:[e.jsx(z,{l:"Duration",v:n.duration?`${n.duration.toFixed(2)}s`:"--"}),e.jsx(z,{l:"Frames",v:n.duration?String(Math.round(n.duration*30)):"--"})]})]}),t==="animate"&&e.jsxs(e.Fragment,{children:[e.jsx(h,{t:"Keyframes",children:e.jsxs("div",{style:{padding:"20px",textAlign:"center",color:"#475569",fontSize:"12px"},children:[e.jsx(b,{i:"animation",s:32,c:"#334155"}),e.jsx("p",{style:{margin:"12px 0 4px 0"},children:"No keyframes added"}),e.jsx("p",{style:{fontSize:"11px",color:"#334155",margin:0},children:"Select a property and click the diamond icon to add keyframes"})]})}),e.jsx(S,{}),e.jsxs(h,{t:"Presets",defaultExpanded:!0,children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"},children:q.map(a=>{const x=a.key==="fadeIn"?o(n,"fadeIn")>0:a.key==="fadeOut"?o(n,"fadeOut")>0:!!n[a.key];return e.jsx("button",{onClick:()=>{a.key==="fadeIn"||a.key==="fadeOut"?l(a.key,x?0:a.value):l(a.key,!x)},style:{background:x?"rgba(117, 170, 219, 0.2)":"rgba(30, 41, 59, 0.5)",border:x?"1px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"8px",color:x?"#75aadb":"#94a3b8",fontSize:"10px",fontWeight:x?600:400,cursor:"pointer"},children:a.name},a.name)})}),(o(n,"fadeIn")>0||o(n,"fadeOut")>0)&&e.jsxs("div",{style:{marginTop:"8px"},children:[o(n,"fadeIn")>0&&e.jsx(y,{l:"Fade In Duration",value:o(n,"fadeIn")*10,onChange:a=>l("fadeIn",a/10),min:1,max:50,defaultValue:10,unit:"s",v:`${o(n,"fadeIn").toFixed(1)}s`}),o(n,"fadeOut")>0&&e.jsx(y,{l:"Fade Out Duration",value:o(n,"fadeOut")*10,onChange:a=>l("fadeOut",a/10),min:1,max:50,defaultValue:10,unit:"s",v:`${o(n,"fadeOut").toFixed(1)}s`})]})]})]}),t==="adjust"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Color Correction",defaultExpanded:!0,children:[e.jsx(y,{l:"Brightness",value:Math.round(o(n,"brightness")*50+50),onChange:a=>l("brightness",(a-50)/50),defaultValue:50}),e.jsx(y,{l:"Contrast",value:Math.round(o(n,"contrast")*50+50),onChange:a=>l("contrast",(a-50)/50),defaultValue:50}),e.jsx(y,{l:"Saturation",value:Math.round(o(n,"saturation")*50),onChange:a=>l("saturation",a/50),defaultValue:50}),e.jsx(y,{l:"Temperature",value:Math.round(o(n,"temperature")*50+50),onChange:a=>l("temperature",(a-50)/50),defaultValue:50})]}),e.jsx(S,{}),e.jsxs(h,{t:"Color Grading",children:[e.jsx(B,{label:"Shadows",value:n.colorGrading?.shadows??"#1a1a2e",onChange:a=>c(n.id,{colorGrading:{...n.colorGrading||A.colorGrading,shadows:a}})}),e.jsx(B,{label:"Midtones",value:n.colorGrading?.midtones??"#4a4a5e",onChange:a=>c(n.id,{colorGrading:{...n.colorGrading||A.colorGrading,midtones:a}})}),e.jsx(B,{label:"Highlights",value:n.colorGrading?.highlights??"#ffffff",onChange:a=>c(n.id,{colorGrading:{...n.colorGrading||A.colorGrading,highlights:a}})})]})]})]}),R&&s==="cutout"&&e.jsx(O,{icon:"content_cut",title:"Background Removal",description:"Automatically remove or replace video backgrounds with AI-powered cutout tools"}),R&&s==="mask"&&e.jsx(O,{icon:"gradient",title:"Masking Tools",description:"Create custom shapes, feathered edges, and animated masks to reveal or hide parts of your video"}),R&&s==="canvas"&&e.jsxs(h,{t:"Canvas Settings",defaultExpanded:!0,children:[e.jsx(z,{l:"Resolution",v:"1920 x 1080"}),e.jsx(z,{l:"Frame Rate",v:"30 fps"}),e.jsx(z,{l:"Aspect Ratio",v:"16:9"}),e.jsx(S,{}),e.jsx(B,{label:"Background Color",value:"#000000",presets:["#000000","#ffffff","#0a0a0a","#1a2332","#75aadb","#1e293b"]})]})]})]})},ce=i.memo(ae);export{ce as default};
