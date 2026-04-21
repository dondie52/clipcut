import{r as a,j as e}from"./DwQPoapS.js";import{I as g}from"./C-gvJqYT.js";const v=`
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
`,C=a.memo(({t:n,children:t,defaultExpanded:o=!1,onToggle:i})=>{const[r,d]=a.useState(o),s=a.useCallback(()=>{d(c=>!c),i?.(!r)},[r,i]),l=a.useCallback(c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),s())},[s]);return e.jsxs("div",{className:"section-collapsible",children:[e.jsx("style",{children:v}),e.jsx("div",{className:"section-header",onClick:s,onKeyDown:l,role:"button",tabIndex:0,"aria-expanded":r,"aria-controls":`section-${n.toLowerCase().replace(/\s+/g,"-")}`,children:e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:e.jsxs("h3",{style:{fontSize:"10px",fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"1.2px",margin:0,display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{className:`section-toggle-icon ${r?"":"collapsed"}`,style:{display:"flex"},children:e.jsx(g,{i:"expand_more",s:14,c:"#475569"})}),n]})})}),e.jsx("div",{id:`section-${n.toLowerCase().replace(/\s+/g,"-")}`,className:`section-content ${r?"expanded":"collapsed"}`,style:{display:"flex",flexDirection:"column",gap:"8px"},children:t})]})});C.displayName="Section";const N=a.memo(({l:n,v:t,vc:o="#cbd5e1",editable:i=!1,onChange:r})=>{const[d,s]=a.useState(!1),[l,c]=a.useState(t),u=a.useCallback(()=>{i&&(s(!0),c(t))},[i,t]),p=a.useCallback(()=>{s(!1),l!==t&&r&&r(l)},[l,t,r]),f=a.useCallback(b=>{b.key==="Enter"?p():b.key==="Escape"&&(s(!1),c(t))},[p,t]);return e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},role:"group","aria-label":`${n}: ${t}`,children:[e.jsx("span",{style:{fontSize:"12px",color:"#cbd5e1"},children:n}),d?e.jsx("input",{type:"text",value:l,onChange:b=>c(b.target.value),onBlur:p,onKeyDown:f,autoFocus:!0,className:"inspector-input",style:{background:"#1e293b",border:"1px solid #75aadb",borderRadius:"4px",padding:"2px 6px",fontSize:"12px",fontWeight:500,color:o,width:"80px",textAlign:"right",outline:"none"}}):e.jsx("span",{style:{fontSize:"12px",fontWeight:500,color:o,cursor:i?"pointer":"default"},onDoubleClick:u,title:i?"Double-click to edit":void 0,children:t})]})});N.displayName="Row";const E=a.memo(({l:n,v:t,min:o=0,max:i=100,step:r=1,unit:d="%",value:s,onChange:l,onChangeCommit:c,onReset:u,defaultValue:p=50,disabled:f=!1})=>{const[b,y]=a.useState(s!==void 0?s:p),x=s!==void 0?s:b,m=t!==void 0?t:`${x}${d}`,S=a.useCallback(h=>{const k=Number(h.target.value);y(k),l?.(k)},[l]),j=a.useCallback(()=>{c?.(s!==void 0?s:b)},[c,s,b]),w=a.useCallback(h=>{h.stopPropagation(),y(p),l?.(p),c?.(p),u?.()},[p,l,c,u]);return e.jsxs("div",{className:"slider-row",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#4a5568",marginBottom:"3px"},children:[e.jsx("span",{style:{fontWeight:500},children:n}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{style:{color:x!==p?"#75aadb":"#4a5568",fontWeight:x!==p?600:400,fontFamily:"'JetBrains Mono', monospace",fontSize:"9px",background:x!==p?"rgba(117,170,219,0.08)":"transparent",padding:"1px 5px",borderRadius:"3px"},children:m}),x!==p&&e.jsx("button",{onClick:w,className:"reset-btn",style:{background:"none",border:"none",padding:0,cursor:"pointer",color:"#4a5568",display:"flex",alignItems:"center"},"aria-label":`Reset ${n} to default`,title:"Reset to default",children:e.jsx(g,{i:"refresh",s:11})})]})]}),e.jsx("input",{type:"range",min:o,max:i,step:r,value:x,onChange:S,onPointerUp:j,onKeyUp:j,disabled:f,className:"inspector-slider",style:{width:"100%",accentColor:"#75aadb",cursor:f?"not-allowed":"pointer",opacity:f?.4:1},"aria-label":`${n}: ${m}`,"aria-valuemin":o,"aria-valuemax":i,"aria-valuenow":x})]})});E.displayName="Slider";const I=a.memo(({l:n,v:t,type:o="text",onChange:i,min:r,max:d,step:s})=>{const[l,c]=a.useState(t),[u,p]=a.useState(!1),f=a.useCallback(x=>{c(x.target.value)},[]),b=a.useCallback(()=>{p(!1),l!==t&&i&&i(l)},[l,t,i]),y=a.useCallback(x=>{x.key==="Enter"&&x.target.blur()},[]);return e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"9px",fontWeight:500,color:u?"#75aadb":"#4a5568",display:"block",marginBottom:"2px",transition:"color 0.15s ease",letterSpacing:"0.3px"},children:n}),e.jsx("input",{type:o,value:l,onChange:f,onFocus:()=>p(!0),onBlur:b,onKeyDown:y,min:r,max:d,step:s,className:"inspector-input",style:{width:"100%",background:"rgba(30,41,59,0.6)",border:"1px solid rgba(117,170,219,0.08)",borderRadius:"5px",fontSize:"11px",padding:"6px 8px",color:"#75aadb",textAlign:"center",outline:"none",boxSizing:"border-box",fontFamily:"'JetBrains Mono', monospace"},"aria-label":n})]})});I.displayName="SmallInput";const $=a.memo(({number:n,name:t,enabled:o=!0,onEdit:i,onDelete:r,onToggle:d})=>e.jsxs("div",{className:"effect-card",style:{background:"rgba(26,35,50,0.4)",borderRadius:"6px",padding:"6px 8px",display:"flex",alignItems:"center",justifyContent:"space-between",border:o?"1px solid rgba(117,170,219,0.1)":"1px solid rgba(255,255,255,0.03)",opacity:o?1:.45,transition:"all 0.15s ease"},role:"listitem","aria-label":`${t} effect${o?"":" (disabled)"}`,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("button",{onClick:d,style:{background:o?"rgba(117,170,219,0.1)":"rgba(255,255,255,0.03)",border:"none",padding:"4px",cursor:"pointer",display:"flex",borderRadius:"4px"},"aria-label":o?"Disable effect":"Enable effect",title:o?"Disable":"Enable",children:e.jsx(g,{i:o?"visibility":"visibility_off",s:13,c:o?"#75aadb":"#4a5568"})}),e.jsxs("div",{children:[e.jsxs("span",{style:{fontSize:"8px",color:"#4a5568",display:"block",fontWeight:600,letterSpacing:"0.5px"},children:["FX ",n]}),e.jsx("span",{style:{fontSize:"11px",fontWeight:500,color:o?"#e2e8f0":"#64748b"},children:t})]})]}),e.jsxs("div",{style:{display:"flex",gap:"6px"},children:[e.jsx("button",{onClick:i,className:"effect-action-btn",style:{background:"none",border:"none",padding:"4px",cursor:"pointer",borderRadius:"4px"},"aria-label":`Edit ${t}`,title:"Edit",children:e.jsx(g,{i:"edit",s:16,c:"#64748b"})}),e.jsx("button",{onClick:r,className:"effect-action-btn",style:{background:"none",border:"none",padding:"4px",cursor:"pointer",borderRadius:"4px"},"aria-label":`Delete ${t}`,title:"Delete",children:e.jsx(g,{i:"delete",s:16,c:"#64748b"})})]})]}));$.displayName="EffectCard";const R=a.memo(({label:n,value:t="#ffffff",onChange:o,presets:i=["#ffffff","#000000","#75aadb","#ef4444","#22c55e","#eab308","#5a8cbf","#3b82f6"]})=>{const[r,d]=a.useState(!1);return e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"10px",color:"#64748b",display:"block",marginBottom:"3px"},children:n}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("button",{onClick:()=>d(!r),className:"color-swatch",style:{width:"28px",height:"28px",borderRadius:"4px",background:t,border:"2px solid rgba(255, 255, 255, 0.2)"},"aria-label":`Selected color: ${t}`,title:"Click to change color"}),e.jsx("input",{type:"text",value:t,onChange:s=>o?.(s.target.value),className:"inspector-input",style:{flex:1,background:"#1e293b",border:"1px solid transparent",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",color:"#94a3b8",fontFamily:"monospace",outline:"none"},"aria-label":`${n} color value`})]}),r&&e.jsx("div",{style:{display:"flex",gap:"4px",marginTop:"8px",flexWrap:"wrap"},children:i.map(s=>e.jsx("button",{onClick:()=>{o?.(s),d(!1)},className:"color-swatch",style:{width:"24px",height:"24px",borderRadius:"4px",background:s,border:t===s?"2px solid #75aadb":"1px solid rgba(255, 255, 255, 0.1)"},"aria-label":`Select color ${s}`},s))})]})});R.displayName="ColorPicker";const D=a.memo(()=>e.jsx("div",{style:{height:"1px",background:"linear-gradient(90deg, transparent 0%, rgba(117,170,219,0.08) 50%, transparent 100%)",margin:"1px 0"},role:"separator"}));D.displayName="Hr";export{R as C,$ as E,D as H,N as R,C as S,I as a,E as b};
