import { CaseHeader, CaseFooter } from './components';
import { CausalDemo } from './causal-demo';
import './causal-case.css';

const chapters = [
  { title: 'Start with the event.', label: '01 / INFORMATION ARCHITECTURE', paragraphs: [
    'I organized the experience around a weather event. The continental overview brings the forecast, affected airports, and operational impact into one view. The event selector gives users a way to change context without learning a different interface.',
    'I kept the map as the primary surface. Supporting information sits around it: impact in the upper corner, forecast detection along the bottom, and a shared timeline beneath the map. This creates a path from understanding the situation to investigating a specific location.',
  ] },
  { title: 'Connect weather to consequences.', label: '02 / VISUAL HIERARCHY', paragraphs: [
    'I paired the weather visualization with passenger disruption, delayed flights, and cancellations. The impact panel makes the operational consequences visible alongside the forecast, while a ranked airport list provides direct entry points into local detail.',
    'Airport markers have a compact default state and reveal more information on hover. Clicking a marker moves into that airport’s view. This progressive disclosure keeps the overview readable while making deeper information available where the user is already looking.',
  ] },
  { title: 'Move closer without losing time.', label: '03 / LOCAL EXPLORATION', paragraphs: [
    'I designed the airport view to preserve the selected event and its timeline. Moving from the national map into a local view changes the level of detail, not the temporal context.',
    'The side panel collects weather descriptions across the event, while a map callout highlights the current narrative. The selected-hub panel narrows the impact summary to that airport, including gate holds and ground stops. A clear route back to all hubs keeps this investigation reversible.',
  ] },
  { title: 'Make the sequence understandable.', label: '04 / TIME & NARRATIVE', paragraphs: [
    'I used time-based weather descriptions to explain how conditions develop: pressure changes, snow formation, increasing wind, and disruption at the airport. Relative timestamps connect those descriptions to the event rather than leaving them as disconnected alerts.',
    'The timeline brings Causal Brain’s prediction, the traditional model’s prediction, and the event start into one frame of reference. In the portfolio prototype, scrubbing and playback connect that timeline to the narrative and illustrative impact figures.',
  ] },
  { title: 'Compare models in the same context.', label: '05 / FORECAST COMPARISON', paragraphs: [
    'I defined a side-by-side comparison with Causal Brain on the left and HRRR on the right by default. Both forecasts share the event and timeline, so users can inspect the difference without switching between separate screens.',
    'Persistent detection labels keep timing visible. The comparison model selector supports another point of reference, and an explicit exit returns users to their previous context. Green and coral distinguish the prediction signals while neutral surfaces keep the maps prominent.',
  ] },
  { title: 'Specify how the screens connect.', label: '06 / INTERACTION DESIGN', paragraphs: [
    'I documented the prototype flow directly in Figma: landing on the dashboard, selecting another event, hovering over an impacted hub, opening local detail, and entering comparison mode. The notes also specify that the timeline should remain unchanged when users open an airport.',
    'I brought these views together through recurring navigation, impact panels, map-layer controls, and timeline components. Their repeated structure helps each view feel like part of the same product while allowing its information to change with the user’s focus.',
  ] },
];
export function CausalCase() {
  return <><CaseHeader/><main id="main" className="causal-case">
    <section className="wrap causal-intro"><a className="case-back" href="/cases">← All cases</a><div className="eyebrow">CAUSAL LABS / PRODUCT DESIGN</div><h1>Causal Brain</h1><p className="causal-deck">Making weather forecasts actionable for aviation operations.</p><p className="causal-summary">I designed a map-based experience that connects a developing weather event with the airports it affects, its operational impact, and the moment different models detect it.</p><dl className="case-details"><div><dt>My contribution</dt><dd>Interface design · Interaction flows · Prototype specification</dd></div><div><dt>Domain</dt><dd>Weather intelligence · Aviation operations</dd></div><div><dt>Deliverable</dt><dd>Figma design & interactive portfolio prototype</dd></div></dl><div className="causal-links"><a className="pill-link" href="#prototype">Explore the prototype ↓</a></div></section>
    <section id="prototype" className="causal-prototype-band"><div className="wrap"><CausalDemo/><p className="causal-demo-caption">Interactive reconstruction of my Figma design. Forecasts, map-layer variations, model differences, and impact figures are illustrative demo data, not live weather or measured product results. Portfolio implementation created with AI assistance.</p></div></section>
    <div className="wrap causal-story"><section className="causal-challenge"><div><span className="eyebrow">THE DESIGN CHALLENGE</span><h2>From a forecast<br/>to an <i className="serif">operational picture.</i></h2></div><div><p>A weather map shows conditions. An aviation team also needs to understand which airports are affected, how the situation develops, and how early a forecast identifies the event.</p><p>My design connects those questions through three views: continental overview, airport detail, and model comparison. The same event and timeline hold the experience together.</p></div></section>
    <div className="causal-flow" aria-label="Three connected views"><div><span>01</span><h3>Continental overview</h3><p>What is happening, and where?</p></div><div><span>02</span><h3>Airport detail</h3><p>What does it mean for this hub?</p></div><div><span>03</span><h3>Model comparison</h3><p>When did each model detect it?</p></div></div>
    {chapters.map(c=><section className="causal-chapter" key={c.label}><div><span className="eyebrow">{c.label}</span><h2>{c.title}</h2></div><div>{c.paragraphs.map(p=><p key={p}>{p}</p>)}</div></section>)}
    <section className="causal-result"><span className="eyebrow">THE DESIGN OUTCOME</span><h2>A connected experience.<br/>A testable <i className="serif">design direction.</i></h2><p>The design brings geographic context, local consequences, and prediction timing into a continuous flow. The animated prototype makes those transitions tangible, from the initial overview through an airport investigation to model comparison.</p><p>This case presents the interface and interaction work. The detection advantage and disruption figures shown in the demo are scenario values, not validated performance claims.</p><div className="causal-links"><a className="pill-link" href="/causal-brain" target="_blank" rel="noreferrer">Open interactive prototype ↗</a></div></section>
    <a className="next-case" href="/cases/cloudbilling"><div><span className="eyebrow">NEXT / CLOUDBILLING</span><h2>Complex billing, clearly explained.</h2></div><span aria-hidden="true">↗</span></a></div>
  </main><CaseFooter/></>;
}
