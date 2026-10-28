import './tccc-editorial.css';

export function TCCCCover() {
  return <section className="tc-cover" aria-labelledby="tc-cover-title">
    <div className="tc-cover-meta"><span>SELECTED WORK / PRODUCT DESIGN</span><span>RESEARCH → INTERACTION → PROTOTYPE</span></div>
    <div className="tc-cover-heading"><h1 id="tc-cover-title">TCCC<span>Care, carried forward.</span></h1><span className="tc-red-disc" aria-hidden="true">↗</span></div>
    <div className="tc-cover-stage">
      <div className="tc-cover-note"><span>FIELD DOCUMENTATION</span><p>One record.<br/>Seven chapters.<br/>Every handoff.</p><span>DESIGNED FOR CONTINUITY</span></div>
      <div className="tc-device" aria-label="Illustrative preview of the TCCC patient information interface">
        <div className="tc-device-bar"><span>TCCC / CASUALTY CARD</span><span>01 — 07</span></div>
        <div className="tc-device-progress"><i/><i/><i/><i/><i/><i/><i/></div>
        <span className="tc-device-label">PATIENT INFORMATION</span>
        <h2>Інформація<br/>про пацієнта</h2>
        <div className="tc-preview-field"><span>Battle Roster #</span><strong>TCCC — 001</strong></div>
        <div className="tc-preview-field"><span>Пріоритет евакуації</span><div className="tc-preview-options"><b>URGENT</b><span>PRIORITY</span><span>ROUTINE</span></div></div>
        <div className="tc-preview-pair"><div className="tc-preview-field"><span>Прізвище</span><strong>—</strong></div><div className="tc-preview-field"><span>Ім’я</span><strong>—</strong></div></div>
        <div className="tc-device-bottom"><span>FIELD DOCUMENTATION</span><span>Далі →</span></div>
      </div>
      <div className="tc-cover-index" aria-hidden="true"><span>01 / IDENTIFY</span><span>02 / INJURIES</span><span>03 / SIGNS</span><span>04 / TREATMENTS</span><span>05 / MEDICATIONS</span><span>06 / NOTES</span><span>07 / RESPONDER</span></div>
      <span className="tc-cover-watermark" aria-hidden="true">TCCC</span>
    </div>
    <div className="tc-cover-caption"><span>TACTICAL COMBAT CASUALTY CARE</span><span>PRODUCT DESIGN · INTERACTIVE EXPERIENCE</span><a href="#tccc-live-demo">EXPLORE PROTOTYPE ↗</a></div>
  </section>;
}
