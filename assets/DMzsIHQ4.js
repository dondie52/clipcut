import{r as i,j as e}from"./DwQPoapS.js";import{I as j,s as A,S as _,F as W,E as L,a as B,A as G,D as $}from"./B2_iSSIw.js";import"./Ctnj6hAA.js";import"./DZxFKcQQ.js";import"./DuArS60f.js";import"./DHYYMJP5.js";import"./BwFxlYGV.js";import"./B9CjrYEi.js";const C=`
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
    margin-top: 12px;
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
`,h=i.memo(({t:r,children:t,defaultExpanded:l=!0,onToggle:x})=>{const[n,c]=i.useState(l),o=i.useCallback(()=>{c(u=>!u),x?.(!n)},[n,x]),p=i.useCallback(u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),o())},[o]);return e.jsxs("div",{className:"section-collapsible",children:[e.jsx("style",{children:C}),e.jsx("div",{className:"section-header",onClick:o,onKeyDown:p,role:"button",tabIndex:0,"aria-expanded":n,"aria-controls":`section-${r.toLowerCase().replace(/\s+/g,"-")}`,children:e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:e.jsxs("h3",{style:{fontSize:"11px",fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"1.5px",margin:0,display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{className:`section-toggle-icon ${n?"":"collapsed"}`,style:{display:"flex"},children:e.jsx(j,{i:"expand_more",s:16,c:"#64748b"})}),r]})})}),e.jsx("div",{id:`section-${r.toLowerCase().replace(/\s+/g,"-")}`,className:`section-content ${n?"expanded":"collapsed"}`,style:{display:"flex",flexDirection:"column",gap:"12px"},children:t})]})});h.displayName="Section";const R=i.memo(({l:r,v:t,vc:l="#cbd5e1",editable:x=!1,onChange:n})=>{const[c,o]=i.useState(!1),[p,u]=i.useState(t),w=i.useCallback(()=>{x&&(o(!0),u(t))},[x,t]),f=i.useCallback(()=>{o(!1),p!==t&&n&&n(p)},[p,t,n]),v=i.useCallback(g=>{g.key==="Enter"?f():g.key==="Escape"&&(o(!1),u(t))},[f,t]);return e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},role:"group","aria-label":`${r}: ${t}`,children:[e.jsx("span",{style:{fontSize:"12px",color:"#cbd5e1"},children:r}),c?e.jsx("input",{type:"text",value:p,onChange:g=>u(g.target.value),onBlur:f,onKeyDown:v,autoFocus:!0,className:"inspector-input",style:{background:"#1e293b",border:"1px solid #75aadb",borderRadius:"4px",padding:"2px 6px",fontSize:"12px",fontWeight:500,color:l,width:"80px",textAlign:"right",outline:"none"}}):e.jsx("span",{style:{fontSize:"12px",fontWeight:500,color:l,cursor:x?"pointer":"default"},onDoubleClick:w,title:x?"Double-click to edit":void 0,children:t})]})});R.displayName="Row";const y=i.memo(({l:r,v:t,min:l=0,max:x=100,step:n=1,unit:c="%",value:o,onChange:p,onChangeCommit:u,onReset:w,defaultValue:f=50,disabled:v=!1})=>{const[g,N]=i.useState(o!==void 0?o:f),b=o!==void 0?o:g,D=t!==void 0?t:`${b}${c}`,E=i.useCallback(m=>{const S=Number(m.target.value);N(S),p?.(S)},[p]),a=i.useCallback(()=>{u?.(o!==void 0?o:g)},[u,o,g]),d=i.useCallback(m=>{m.stopPropagation(),N(f),p?.(f),u?.(f),w?.()},[f,p,u,w]);return e.jsxs("div",{className:"slider-row",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#64748b",marginBottom:"6px"},children:[e.jsx("span",{children:r}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("span",{style:{color:b!==f?"#75aadb":"#64748b",fontWeight:b!==f?500:400},children:D}),b!==f&&e.jsx("button",{onClick:d,className:"reset-btn",style:{background:"none",border:"none",padding:0,cursor:"pointer",color:"#64748b",display:"flex",alignItems:"center"},"aria-label":`Reset ${r} to default`,title:"Reset to default",children:e.jsx(j,{i:"refresh",s:12})})]})]}),e.jsx("input",{type:"range",min:l,max:x,step:n,value:b,onChange:E,onPointerUp:a,onKeyUp:a,disabled:v,className:"inspector-slider",style:{width:"100%",accentColor:"#75aadb",cursor:v?"not-allowed":"pointer",opacity:v?.5:1},"aria-label":`${r}: ${D}`,"aria-valuemin":l,"aria-valuemax":x,"aria-valuenow":b})]})});y.displayName="Slider";const F=i.memo(({l:r,v:t,type:l="text",onChange:x,min:n,max:c,step:o})=>{const[p,u]=i.useState(t),[w,f]=i.useState(!1),v=i.useCallback(b=>{u(b.target.value)},[]),g=i.useCallback(()=>{f(!1),p!==t&&x&&x(p)},[p,t,x]),N=i.useCallback(b=>{b.key==="Enter"&&b.target.blur()},[]);return e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"10px",color:w?"#75aadb":"#64748b",display:"block",marginBottom:"4px",transition:"color 0.15s ease"},children:r}),e.jsx("input",{type:l,value:p,onChange:v,onFocus:()=>f(!0),onBlur:g,onKeyDown:N,min:n,max:c,step:o,className:"inspector-input",style:{width:"100%",background:"#1e293b",border:"1px solid transparent",borderRadius:"4px",fontSize:"12px",padding:"6px 8px",color:"#75aadb",textAlign:"center",outline:"none",boxSizing:"border-box",fontFamily:"'Spline Sans',sans-serif"},"aria-label":r})]})});F.displayName="SmallInput";const O=i.memo(({number:r,name:t,enabled:l=!0,onEdit:x,onDelete:n,onToggle:c})=>e.jsxs("div",{className:"effect-card",style:{background:"rgba(26,35,50,0.5)",borderRadius:"4px",padding:"10px",display:"flex",alignItems:"center",justifyContent:"space-between",border:"1px solid rgba(255,255,255,0.05)",opacity:l?1:.5},role:"listitem","aria-label":`${t} effect${l?"":" (disabled)"}`,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("button",{onClick:c,style:{background:"none",border:"none",padding:0,cursor:"pointer",display:"flex"},"aria-label":l?"Disable effect":"Enable effect",title:l?"Disable":"Enable",children:e.jsx(j,{i:l?"visibility":"visibility_off",s:14,c:l?"#75aadb":"#64748b"})}),e.jsxs("div",{children:[e.jsxs("span",{style:{fontSize:"10px",color:"#94a3b8",display:"block"},children:["NO ",r]}),e.jsx("span",{style:{fontSize:"12px",fontWeight:500,color:"#e2e8f0"},children:t})]})]}),e.jsxs("div",{style:{display:"flex",gap:"6px"},children:[e.jsx("button",{onClick:x,className:"effect-action-btn",style:{background:"none",border:"none",padding:"4px",cursor:"pointer",borderRadius:"4px"},"aria-label":`Edit ${t}`,title:"Edit",children:e.jsx(j,{i:"edit",s:16,c:"#64748b"})}),e.jsx("button",{onClick:n,className:"effect-action-btn",style:{background:"none",border:"none",padding:"4px",cursor:"pointer",borderRadius:"4px"},"aria-label":`Delete ${t}`,title:"Delete",children:e.jsx(j,{i:"delete",s:16,c:"#64748b"})})]})]}));O.displayName="EffectCard";const P=i.memo(({label:r,value:t="#ffffff",onChange:l,presets:x=["#ffffff","#000000","#75aadb","#ef4444","#22c55e","#eab308","#5a8cbf","#3b82f6"]})=>{const[n,c]=i.useState(!1);return e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"10px",color:"#64748b",display:"block",marginBottom:"6px"},children:r}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("button",{onClick:()=>c(!n),className:"color-swatch",style:{width:"28px",height:"28px",borderRadius:"4px",background:t,border:"2px solid rgba(255, 255, 255, 0.2)"},"aria-label":`Selected color: ${t}`,title:"Click to change color"}),e.jsx("input",{type:"text",value:t,onChange:o=>l?.(o.target.value),className:"inspector-input",style:{flex:1,background:"#1e293b",border:"1px solid transparent",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",color:"#94a3b8",fontFamily:"monospace",outline:"none"},"aria-label":`${r} color value`})]}),n&&e.jsx("div",{style:{display:"flex",gap:"4px",marginTop:"8px",flexWrap:"wrap"},children:x.map(o=>e.jsx("button",{onClick:()=>{l?.(o),c(!1)},className:"color-swatch",style:{width:"24px",height:"24px",borderRadius:"4px",background:o,border:t===o?"2px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)"},"aria-label":`Select color ${o}`},o))})]})});P.displayName="ColorPicker";const I=i.memo(()=>e.jsx("div",{style:{height:"1px",background:"rgba(255,255,255,0.05)",margin:"4px 0"},role:"separator"}));I.displayName="Hr";const K=`
  ${_}

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
  }

  .inspector-subtab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05) !important;
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
`,s=(r,t)=>r?.[t]??$[t],M=i.memo(({icon:r,title:t,description:l})=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",textAlign:"center",color:"#475569",gap:"12px"},children:[e.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"16px",background:"rgba(117, 170, 219, 0.08)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(j,{i:r,s:28,c:"#334155"})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"13px",fontWeight:600,margin:"0 0 4px 0",color:"#94a3b8"},children:t}),e.jsx("p",{style:{fontSize:"11px",color:"#475569",margin:"0 0 8px 0",lineHeight:1.4},children:l}),e.jsx("span",{className:"coming-soon-badge",children:"Coming Soon"})]})]}));M.displayName="ComingSoonPlaceholder";const V=({rightTab:r,onRightTabChange:t,rightSubTab:l,onRightSubTabChange:x,selectedClip:n,onClipUpdate:c})=>{const o=i.useCallback((a,d)=>{n&&c(n.id,{[a]:d})},[n,c]),p=i.useCallback(a=>{if(!n)return;const d=(n.effects||[]).map(m=>m.id===a?{...m,enabled:!m.enabled}:m);c(n.id,{effects:d})},[n,c]),u=i.useCallback(a=>{if(!n)return;const d=(n.effects||[]).filter(m=>m.id!==a);c(n.id,{effects:d})},[n,c]),w=i.useCallback(()=>{if(!n)return;const a={id:Date.now(),name:"New Effect",enabled:!0,type:"blur",params:{radius:5}};c(n.id,{effects:[...n.effects||[],a]})},[n,c]),f=i.useCallback(a=>{if(!n)return;const d={id:Date.now(),name:a.name,enabled:!0,type:a.type,params:{...a.params}};c(n.id,{effects:[...n.effects||[],d]})},[n,c]),v=i.useCallback((a,d,m,S)=>{const z=d.findIndex(k=>k.toLowerCase()===m);if(a.key==="ArrowRight"){a.preventDefault();const k=(z+1)%d.length;S(d[k].toLowerCase())}else if(a.key==="ArrowLeft"){a.preventDefault();const k=z===0?d.length-1:z-1;S(d[k].toLowerCase())}},[]),g=["Video","Audio","Speed","Animate","Adjust"],N=["Basic","Cutout","Mask","Canvas"],b=!!n,D=n?.effects||[],E=Math.round(s(n,"speed")*100);return e.jsxs("aside",{style:A.rightPanel,role:"complementary","aria-label":"Inspector panel",children:[e.jsx("style",{children:K}),e.jsx("nav",{style:{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.06)",height:"40px",flexShrink:0},role:"tablist","aria-label":"Inspector categories",onKeyDown:a=>v(a,g,r,t),children:g.map(a=>e.jsx("button",{onClick:()=>t(a.toLowerCase()),className:`inspector-tab ${r===a.toLowerCase()?"active":""}`,style:{...A.ghost,flex:1,fontSize:"10px",fontWeight:700,color:r===a.toLowerCase()?"#75aadb":"#64748b"},role:"tab","aria-selected":r===a.toLowerCase(),"aria-controls":`panel-${a.toLowerCase()}`,tabIndex:r===a.toLowerCase()?0:-1,children:a},a))}),e.jsx("nav",{style:{display:"flex",height:"32px",background:"rgba(15,23,42,0.5)",flexShrink:0},role:"tablist","aria-label":"Inspector sub-categories",onKeyDown:a=>v(a,N,l,x),children:N.map(a=>e.jsx("button",{onClick:()=>x(a.toLowerCase()),className:`inspector-subtab ${l===a.toLowerCase()?"active":""}`,style:{...A.ghost,flex:1,fontSize:"9px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",color:l===a.toLowerCase()?"white":"#64748b",background:l===a.toLowerCase()?"rgba(30,41,59,0.8)":"transparent"},role:"tab","aria-selected":l===a.toLowerCase(),tabIndex:l===a.toLowerCase()?0:-1,children:a},a))}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"20px"},className:"cs",id:`panel-${r}`,role:"tabpanel","aria-label":`${r} settings`,children:[!b&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,color:"#475569",textAlign:"center",padding:"20px"},children:[e.jsx(j,{i:"select_all",s:36,c:"#334155"}),e.jsx("p",{style:{fontSize:"12px",margin:"12px 0 4px 0"},children:"Select a clip to edit"}),e.jsx("p",{style:{fontSize:"11px",color:"#334155",margin:0},children:"Properties will appear here"})]}),b&&l==="basic"&&e.jsxs(e.Fragment,{children:[r==="video"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Filters",children:[e.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"8px"},children:W.map(a=>e.jsx("button",{onClick:()=>o("filterName",a.name==="None"?null:a.name),style:{background:s(n,"filterName")===a.name||!s(n,"filterName")&&a.name==="None"?"rgba(117, 170, 219, 0.2)":"rgba(30, 41, 59, 0.5)",border:s(n,"filterName")===a.name||!s(n,"filterName")&&a.name==="None"?"1px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"4px 10px",color:s(n,"filterName")===a.name||!s(n,"filterName")&&a.name==="None"?"#75aadb":"#94a3b8",fontSize:"10px",fontWeight:500,cursor:"pointer"},children:a.name},a.name))}),e.jsx(y,{l:"Strength",value:s(n,"filterStrength"),onChange:a=>o("filterStrength",a),defaultValue:50,disabled:!s(n,"filterName")})]}),e.jsx(I,{}),e.jsxs(h,{t:"Effects",children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},role:"list","aria-label":"Applied effects",children:D.map((a,d)=>e.jsx(O,{number:d+1,name:a.name,enabled:a.enabled,onToggle:()=>p(a.id),onEdit:()=>{if(L.find(S=>S.name===a.name)){const S=(a.params?.radius||5)===5?10:5,z=D.map(k=>k.id===a.id?{...k,params:{...k.params,radius:S}}:k);c(n.id,{effects:z})}},onDelete:()=>u(a.id)},a.id))}),e.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"4px"},children:L.map(a=>e.jsxs("button",{onClick:()=>f(a),style:{background:"rgba(30, 41, 59, 0.5)",border:"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"4px",padding:"4px 8px",color:"#64748b",fontSize:"10px",cursor:"pointer"},children:["+ ",a.name]},a.name))}),e.jsxs("button",{onClick:w,className:"add-effect-btn",style:{width:"100%",padding:"10px",background:"transparent",border:"1px dashed rgba(255, 255, 255, 0.1)",borderRadius:"4px",color:"#64748b",fontSize:"11px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"},"aria-label":"Add new effect",children:[e.jsx(j,{i:"add",s:16,c:"#64748b"}),"Add Effect"]})]}),e.jsx(I,{}),e.jsxs(h,{t:"Position & Size",children:[e.jsx(y,{l:"Zoom",value:Math.round(s(n,"scale")*100),onChange:a=>o("scale",a/100),defaultValue:100,min:10,max:300}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"4px"},children:[e.jsx(F,{l:"Position X",v:String(s(n,"positionX")),type:"number",onChange:a=>o("positionX",Number(a)||0)}),e.jsx(F,{l:"Position Y",v:String(s(n,"positionY")),type:"number",onChange:a=>o("positionY",Number(a)||0)})]}),e.jsx(y,{l:"Rotation",value:s(n,"rotation"),onChange:a=>o("rotation",a),min:-180,max:180,defaultValue:0,unit:"°"}),e.jsx(y,{l:"Opacity",value:Math.round(s(n,"opacity")*100),onChange:a=>o("opacity",a/100),defaultValue:100})]})]}),r==="audio"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Volume",children:[e.jsx(y,{l:"Volume",value:Math.round(s(n,"volume")*100),onChange:a=>o("volume",a/100),defaultValue:100,min:0,max:200}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"12px",color:"#cbd5e1"},children:"Mute"}),e.jsxs("button",{onClick:()=>o("isMuted",!s(n,"isMuted")),style:{background:s(n,"isMuted")?"rgba(239, 68, 68, 0.2)":"rgba(30, 41, 59, 0.5)",border:s(n,"isMuted")?"1px solid #ef4444":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"4px 12px",color:s(n,"isMuted")?"#ef4444":"#94a3b8",fontSize:"11px",fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(j,{i:s(n,"isMuted")?"volume_off":"volume_up",s:14,c:s(n,"isMuted")?"#ef4444":"#94a3b8"}),s(n,"isMuted")?"Muted":"On"]})]})]}),e.jsx(I,{}),e.jsx(h,{t:"Audio Effects",children:e.jsxs("div",{style:{padding:"20px",textAlign:"center",color:"#475569",fontSize:"12px"},children:[e.jsx(j,{i:"music_note",s:32,c:"#334155"}),e.jsx("p",{style:{margin:"12px 0 0 0"},children:"No audio effects applied"})]})})]}),r==="speed"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Playback Speed",children:[e.jsx(y,{l:"Speed",value:E,onChange:a=>o("speed",a/100),min:25,max:400,defaultValue:100}),e.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"8px"},children:B.map(a=>{const d=Math.round(a.value*100);return e.jsx("button",{onClick:()=>o("speed",a.value),style:{background:E===d?"rgba(117, 170, 219, 0.2)":"rgba(30, 41, 59, 0.5)",border:E===d?"1px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"4px 12px",color:E===d?"#75aadb":"#94a3b8",fontSize:"11px",fontWeight:500,cursor:"pointer"},children:a.label},a.label)})})]}),e.jsx(I,{}),e.jsxs(h,{t:"Time Remapping",children:[e.jsx(R,{l:"Duration",v:n.duration?`${n.duration.toFixed(2)}s`:"--"}),e.jsx(R,{l:"Frames",v:n.duration?String(Math.round(n.duration*30)):"--"})]})]}),r==="animate"&&e.jsxs(e.Fragment,{children:[e.jsx(h,{t:"Keyframes",children:e.jsxs("div",{style:{padding:"20px",textAlign:"center",color:"#475569",fontSize:"12px"},children:[e.jsx(j,{i:"animation",s:32,c:"#334155"}),e.jsx("p",{style:{margin:"12px 0 4px 0"},children:"No keyframes added"}),e.jsx("p",{style:{fontSize:"11px",color:"#334155",margin:0},children:"Select a property and click the diamond icon to add keyframes"})]})}),e.jsx(I,{}),e.jsxs(h,{t:"Presets",children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"},children:G.map(a=>{const d=a.key==="fadeIn"?s(n,"fadeIn")>0:a.key==="fadeOut"?s(n,"fadeOut")>0:!!n[a.key];return e.jsx("button",{onClick:()=>{a.key==="fadeIn"||a.key==="fadeOut"?o(a.key,d?0:a.value):o(a.key,!d)},style:{background:d?"rgba(117, 170, 219, 0.2)":"rgba(30, 41, 59, 0.5)",border:d?"1px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"4px",padding:"8px",color:d?"#75aadb":"#94a3b8",fontSize:"10px",fontWeight:d?600:400,cursor:"pointer"},children:a.name},a.name)})}),(s(n,"fadeIn")>0||s(n,"fadeOut")>0)&&e.jsxs("div",{style:{marginTop:"8px"},children:[s(n,"fadeIn")>0&&e.jsx(y,{l:"Fade In Duration",value:s(n,"fadeIn")*10,onChange:a=>o("fadeIn",a/10),min:1,max:50,defaultValue:10,unit:"s",v:`${s(n,"fadeIn").toFixed(1)}s`}),s(n,"fadeOut")>0&&e.jsx(y,{l:"Fade Out Duration",value:s(n,"fadeOut")*10,onChange:a=>o("fadeOut",a/10),min:1,max:50,defaultValue:10,unit:"s",v:`${s(n,"fadeOut").toFixed(1)}s`})]})]})]}),r==="adjust"&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{t:"Color Correction",children:[e.jsx(y,{l:"Brightness",value:Math.round(s(n,"brightness")*50+50),onChange:a=>o("brightness",(a-50)/50),defaultValue:50}),e.jsx(y,{l:"Contrast",value:Math.round(s(n,"contrast")*50+50),onChange:a=>o("contrast",(a-50)/50),defaultValue:50}),e.jsx(y,{l:"Saturation",value:Math.round(s(n,"saturation")*50),onChange:a=>o("saturation",a/50),defaultValue:50}),e.jsx(y,{l:"Temperature",value:Math.round(s(n,"temperature")*50+50),onChange:a=>o("temperature",(a-50)/50),defaultValue:50})]}),e.jsx(I,{}),e.jsxs(h,{t:"Color Grading",children:[e.jsx(P,{label:"Shadows",value:n.colorGrading?.shadows??"#1a1a2e",onChange:a=>c(n.id,{colorGrading:{...n.colorGrading||$.colorGrading,shadows:a}})}),e.jsx(P,{label:"Midtones",value:n.colorGrading?.midtones??"#4a4a5e",onChange:a=>c(n.id,{colorGrading:{...n.colorGrading||$.colorGrading,midtones:a}})}),e.jsx(P,{label:"Highlights",value:n.colorGrading?.highlights??"#ffffff",onChange:a=>c(n.id,{colorGrading:{...n.colorGrading||$.colorGrading,highlights:a}})})]})]})]}),b&&l==="cutout"&&e.jsx(M,{icon:"content_cut",title:"Background Removal",description:"Automatically remove or replace video backgrounds with AI-powered cutout tools"}),b&&l==="mask"&&e.jsx(M,{icon:"gradient",title:"Masking Tools",description:"Create custom shapes, feathered edges, and animated masks to reveal or hide parts of your video"}),b&&l==="canvas"&&e.jsxs(h,{t:"Canvas Settings",children:[e.jsx(R,{l:"Resolution",v:"1920 x 1080"}),e.jsx(R,{l:"Frame Rate",v:"30 fps"}),e.jsx(R,{l:"Aspect Ratio",v:"16:9"}),e.jsx(I,{}),e.jsx(P,{label:"Background Color",value:"#000000",presets:["#000000","#ffffff","#0a0a0a","#1a2332","#75aadb","#1e293b"]})]})]})]})},U=i.memo(V);export{U as default};
