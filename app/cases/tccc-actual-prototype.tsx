"use client";

const PROTOTYPE_URL = "https://v0-warrior.vercel.app/?_vercel_share=vajilrKyNWawbtHbSfa9YTs4Qnj2RctA";

export function TCCCActualPrototype() {
  return (
    <section aria-label="Interactive TCCC prototype" style={{padding:"clamp(18px,4vw,48px) 0",background:"#090c0e",color:"#f5f5f5"}}>
      <div style={{maxWidth:1250,margin:"0 auto",padding:"0 20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:24}}>
          <div>
            <div style={{fontFamily:"monospace",fontSize:11,letterSpacing:2,color:"#adb8b7"}}>LIVE PRODUCT PROTOTYPE / TCCC</div>
            <h2 style={{fontSize:"clamp(24px,3vw,36px)",fontWeight:700,margin:"8px 0"}}>Digital Casualty Card</h2>
            <p style={{fontSize:14,color:"#b7c0c1",maxWidth:600,margin:0}}>Explore the original interactive application. This is a demonstration, not a clinical tool. Do not enter real patient data.</p>
          </div>
          <a href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",padding:"13px 18px",background:"#d9b877",color:"#121516",fontWeight:700,textDecoration:"none",borderRadius:6}}>Open full-screen prototype ↗</a>
        </div>
        <div style={{border:"1px solid #394148",borderRadius:12,overflow:"hidden",background:"#11171b"}}>
          <div style={{display:"flex",gap:7,padding:"12px 16px",borderBottom:"1px solid #394148",background:"#1b2227"}}><span style={{width:9,height:9,borderRadius:"50%",background:"#626c73"}}/><span style={{width:9,height:9,borderRadius:"50%",background:"#626c73"}}/><span style={{width:9,height:9,borderRadius:"50%",background:"#626c73"}}/><span style={{marginLeft:12,font:"11px monospace",color:"#a8b6be"}}>v0-warrior.vercel.app</span></div>
          <iframe title="Actual interactive TCCC casualty card prototype" src={PROTOTYPE_URL} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" style={{display:"block",width:"100%",height:"min(78vh,920px)",minHeight:570,border:0,background:"#080a0c"}} allow="clipboard-write"/>
        </div>
        <p style={{color:"#a8b5bc",fontSize:12,marginTop:14}}>If the embedded application is blocked by Vercel Authentication or browser security, use the full-screen link above.</p>
      </div>
    </section>
  );
}
