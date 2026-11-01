import './tccc-editorial.css';
import './generated-scenes.css';

export function TCCCCover() {
  return <section className="tc-cover tc-cover-scene" aria-labelledby="tc-cover-title">
    <div className="tc-cover-meta"><span>SELECTED WORK / PRODUCT DESIGN</span><span>RESEARCH → STRATEGY → DESIGN → PROTOTYPE</span></div>
    <div className="tc-cover-heading"><h1 id="tc-cover-title">TCCC<span>Care, carried forward.</span></h1><span className="tc-red-disc" aria-hidden="true">↗</span></div>
    <figure className="generated-hero-scene">
      <img src="/images/covers/generated/tccc-casualty-card.webp" alt="Illustrative TCCC dark casualty-card interface on a rugged phone, staged on olive canvas and stone with a red circular accent" width="1536" height="1024" fetchPriority="high" decoding="async"/>
      <div className="generated-hero-copy"><span>DIGITAL CASUALTY CARD / 2026</span><h2>Clarity<br/>under pressure.</h2><p>Seven chapters.<br/>One continuous record.</p></div>
    </figure>
    <div className="tc-cover-caption"><span>ART-DIRECTED PRODUCT MOCKUP · ILLUSTRATIVE UI</span><span>PRODUCT STRATEGY · UX/UI · INTERACTION</span><a href="#tccc-live-demo">EXPLORE THE LIVE INTERACTION ↗</a></div>
  </section>;
}
