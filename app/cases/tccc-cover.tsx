import './tccc-editorial.css';

export function TCCCCover() {
  return <section className="tc-cover tc-cover-v3" aria-labelledby="tc-cover-title">
    <div className="tc-cover-meta"><span>SELECTED WORK / PRODUCT DESIGN</span><span>RESEARCH → STRATEGY → DESIGN → PROTOTYPE</span></div>
    <div className="tc-cover-heading"><h1 id="tc-cover-title">TCCC<span>Care, carried forward.</span></h1><span className="tc-red-disc" aria-hidden="true">↗</span></div>
    <div className="tc-cover-stage tc-cover-product-stage">
      <div className="tc-v3-copy">
        <span className="tc-v3-kicker">DIGITAL CASUALTY CARD / 2026</span>
        <h2>Clarity when<br/>every handoff<br/>matters.</h2>
        <p>Seven connected chapters. One clear field documentation workflow.</p>
        <div className="tc-v3-section-list"><span>01 / PATIENT</span><span>02 / INJURIES</span><span>03 / SIGNS</span><span>04 / TREATMENTS</span><span>05 / MEDICATIONS</span><span>06 / NOTES</span><span>07 / RESPONDER</span></div>
      </div>
      <div className="tc-v3-preview" aria-label="Current TCCC interface preview showing signs and symptoms, vital signs and a selected AVPU state">
        <div className="tc-v3-preview-top"><span>☰</span><strong>TCCC / CASUALTY CARD</strong><span>03 / 07</span></div>
        <div className="tc-v3-progress"><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="tc-v3-preview-body">
          <div className="tc-v3-micro">FIELD RECORD / SIGNS & SYMPTOMS</div>
          <h3>Ознаки та симптоми</h3>
          <div className="tc-v3-panel">
            <strong>Pulse (Rate & Location)</strong>
            <div className="tc-v3-field">82 / Radial</div>
            <strong>Blood Pressure</strong>
            <div className="tc-v3-field">120 / 80</div>
            <strong>AVPU (Consciousness)</strong>
            <div className="tc-v3-choices"><span>A</span><span>V</span><span className="selected">P</span><span>U</span></div>
            <strong>Pain Scale</strong>
            <div className="tc-v3-slider"><i/></div>
            <div className="tc-v3-scale"><span>0 · No pain</span><span>10 · Worst pain</span></div>
          </div>
        </div>
        <div className="tc-v3-preview-bottom"><span>← Назад</span><small>03 / 07</small><b>Далі →</b></div>
      </div>
      <div className="tc-v3-edge">INTERACTIVE PRODUCT DESIGN <span>✳</span> MATERIAL-INSPIRED DARK UI</div>
    </div>
    <div className="tc-cover-caption"><span>TACTICAL COMBAT CASUALTY CARE</span><span>PRODUCT STRATEGY · UX/UI · INTERACTION</span><a href="#tccc-live-demo">EXPLORE THE LIVE INTERACTION ↗</a></div>
  </section>;
}
