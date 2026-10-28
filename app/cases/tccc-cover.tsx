import './tccc-editorial.css';
export function TCCCCover(){
return <section className="tc-cover" aria-labelledby="tc-cover-title">
<div className="tc-cover-meta"><span>SELECTED WORK / PRODUCT DESIGN</span><span>RESEARCH → STRATEGY → DESIGN → PROTOTYPE</span></div>
<div className="tc-cover-heading"><h1 id="tc-cover-title">TCCC<span>Care, carried forward.</span></h1><span className="tc-red-disc" aria-hidden="true">↗</span></div>
<div className="tc-cover-stage" style={{minHeight:350,display:"flex",flexDirection:"column",justifyContent:"center",gap:35,padding:"clamp(28px,6vw,70px)",position:"relative"}}>
 <div style={{position:"relative",zIndex:2,fontSize:"clamp(30px,5vw,72px)",fontWeight:750,lineHeight:1.05,letterSpacing:"-.045em",maxWidth:830}}>Clarity when<br/>every handoff matters.</div>
 <div style={{display:"flex",flexWrap:"wrap",gap:10,position:"relative",zIndex:2}}>{["01 / PATIENT","02 / INJURIES","03 / SIGNS","04 / TREATMENTS","05 / MEDICATIONS","06 / NOTES","07 / RESPONDER"].map(v=><span key={v} style={{padding:"10px 12px",background:"rgba(19,36,29,.8)",border:"1px solid rgba(188,214,192,.4)",font:"11px monospace",letterSpacing:".04em"}}>{v}</span>)}</div>
 <span className="tc-cover-watermark" aria-hidden="true">TCCC</span>
</div>
<div className="tc-cover-caption"><span>TACTICAL COMBAT CASUALTY CARE</span><span>END-TO-END PRODUCT DESIGN</span><a href="#tccc-live-demo">EXPLORE THE PRODUCT ↗</a></div>
</section>}
