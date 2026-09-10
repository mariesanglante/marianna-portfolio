'use client';

import {AscyPrototype} from './ascy-prototype';
import {CaseHeader, CaseFooter} from './components';
import './ascy-case.css';

function EditorialImage({name, alt, eager=false}:{name:string;alt:string;eager?:boolean}) {
  return <figure className="as-new-editorial"><img src={`/images/ascy/editorial/${name}.jpg`} width="1600" height="1000" alt={alt} loading={eager?'eager':'lazy'}/></figure>;
}

export function AscyCase(){return <><CaseHeader/><main id="main" className="as-case">
  <section className="as-intro wrap">
    <a className="case-back" href="/cases">← All cases</a>
    <div className="as-topline"><span>ASCY / MOBILE PRODUCT DESIGN</span><span>VOICE → NOTES → ACTION</span></div>
    <h1>A thought.<br/><i>Already a note.</i></h1>
    <div className="as-intro-bottom"><p>A voice-first space for the things you don’t want to forget. Designing the path from a passing thought to a note you can actually use.</p><a className="as-button" href="#voice-walkthrough">Try the live demo <span>↓</span></a></div>
  </section>
  <EditorialImage name="01-cover" alt="Ascy: A thought. Already a note. Voice capture and notes overview presented on graphite phones." eager/>
  <div className="wrap">
    <dl className="as-metadata"><div><dt>Discipline</dt><dd>Mobile UX & UI</dd></div><div><dt>Design focus</dt><dd>Voice capture · Notes · Lists</dd></div><div><dt>Deliverable</dt><dd>Interface & clickable prototype</dd></div><div><dt>Project stage</dt><dd>Design exploration</dd></div></dl>
    <section className="as-chapter" id="challenge"><div><span className="as-kicker">01 / THE DESIGN CHALLENGE</span><h2>Don’t lose the thought<br/><i>to the interface.</i></h2></div><div className="as-prose"><p className="as-lead">A shopping list. A reminder to call someone. One small thing to remember later.</p><p>The design challenge is to capture these moments without turning them into a setup task. Ascy starts with voice, then gives the result a familiar home: a note or a checklist.</p><p>The key tension is speed versus control. Capturing an idea should feel immediate, but the user still needs to understand what is happening, review the result, and correct it.</p></div></section>
    <div className="as-principles"><article><span>01</span><h3>Capture first.</h3><p>Put a single, obvious action at the centre of the first experience.</p></article><article><span>02</span><h3>Show the state.</h3><p>Distinguish connecting, listening, and processing so the system is never silent about its progress.</p></article><article><span>03</span><h3>Keep an exit.</h3><p>Let people pause, cancel, review, and edit. Voice should add convenience without taking away control.</p></article></div>
    <section className="as-process" aria-labelledby="as-process-title">
      <span className="as-kicker">DESIGN EXPLORATION / JOURNEY & WIREFRAMES</span>
      <h2 id="as-process-title">Make the path clear.<br/><i>Then test the assumptions.</i></h2>
      <p>These concept boards map the proposed journey and explore three interaction priorities: an obvious entry point, visible recording status, and an editable result. They describe design hypotheses to validate, rather than completed research findings.</p>
      <EditorialImage name="05-journey" alt="Proposed Ascy journey: capture, listen, review, refine, and return. Questions to test: is voice input obvious, is recording status clear, and can errors be corrected easily?"/>
      <EditorialImage name="06-wireframes" alt="Concept wireframes explore a single voice action, a listening state with pause and cancel, and an editable grocery checklist. Validation priorities are discoverability, status comprehension, and error recovery."/>
    </section>
    <AscyPrototype/>
  </div>
  <section className="as-type-break"><div className="wrap"><span className="as-kicker">FROM SPOKEN THOUGHT TO USEFUL STRUCTURE</span><div className="as-translation"><blockquote>“Buy milk, bread,<br/>broccoli and bananas.”</blockquote><span className="as-transform-arrow" aria-hidden="true">↗</span><div className="as-output"><span>BUY GROCERIES</span>{['Milk','Bread','Broccoli','Bananas'].map(item=><div key={item}><span aria-hidden="true">□</span>{item}</div>)}</div></div><p>One thought becomes a title and four independently actionable items.</p></div></section>
  <div className="wrap">
    <section className="as-chapter"><div><span className="as-kicker">03 / RETURNING TO YOUR NOTES</span><h2>Easy to capture.<br/><i>Easy to find again.</i></h2></div><div className="as-prose"><p>Capture is only half the experience. The notes overview groups recent content, distinguishes notes from lists, and keeps search and voice input within reach.</p><p>A detail view puts the content first. Secondary actions—pin, edit, share, and delete—stay available without competing with the note itself.</p></div></section>
    <EditorialImage name="03-refine" alt="A little structure. A little headspace. Review a grocery checklist, edit its contents, and save."/>
    <EditorialImage name="04-everyday" alt="Back to your day. Nothing forgotten. Search and organise notes from the My Notes overview."/>
    <section className="as-craft"><div><span className="as-kicker">04 / VISUAL LANGUAGE</span><h2>A calm surface.<br/><i>A living signal.</i></h2><p>Deep charcoal surfaces give everyday content a quiet setting. The luminous orb carries the expressive part of the identity—and signals where voice interaction begins.</p><p>Clear type, restrained borders, and consistent spacing keep that distinctive gesture from overwhelming the work.</p><div className="as-palette" aria-label="Ascy interface palette"><span>Charcoal</span><span>Slate</span><span>Periwinkle</span><span>Light</span></div></div><EditorialImage name="02-voice" alt="Speak freely. Stay in control. The Ascy listening interface with visible pause and finish controls."/></section>
    <EditorialImage name="07-design-system" alt="Ascy visual system study: charcoal, slate, periwinkle and light colors; typography hierarchy; note cards, search and checklist controls; ready, listening, paused and processing voice states."/>
    <section className="as-delivery"><span className="as-kicker">05 / CONNECTING THE EXPERIENCE</span><h2>From screens<br/><i>to a complete journey.</i></h2><div className="as-delivery-bottom"><p>The on-site prototype connects creation, editing, completion, and organisation. It also includes the less visible moments: a paused recording, a delete confirmation, a search result, and a route back.</p><div className="as-counts"><div><strong>26</strong><span>Prototype screens & states</span></div><div><strong>102</strong><span>Configured interactions</span></div></div></div><div className="as-flow-map" aria-label="Main prototype journeys"><div><span>CAPTURE</span><p>Start → Speak → Process → Review</p></div><div><span>REFINE</span><p>Open → Edit → Save → Complete</p></div><div><span>ORGANISE</span><p>Search → Open → Pin or delete</p></div></div><p className="as-evidence">These figures describe the original design prototype, not product performance. The on-site demo supports real editing, checklist completion, and copying. Voice capture uses sample content; notes are kept for this page session.</p></section>
    <section className="as-reflection"><span className="as-kicker">WHAT I’D VALIDATE NEXT</span><h2>Does the first note<br/><i>feel effortless?</i></h2><p>The next step is to observe first-time use: whether people recognise the voice control, understand when recording begins and ends, and can correct a result without guidance. Those observations would test the design’s central promise.</p></section>
  </div>
  <section className="as-finale"><div className="wrap"><span className="as-kicker">TAKE IT FOR A SPIN</span><h2>Less between<br/>you and <i>your thought.</i></h2><a className="as-button" href="#voice-walkthrough">Back to the demo <span>↑</span></a></div></section>
  <div className="wrap"><a className="next-case" href="/cases/causal-labs"><div><span className="eyebrow">NEXT / CAUSAL LABS</span><h2>Weather signals.<br/>Operational context.</h2></div><span aria-hidden="true">↗</span></a></div>
</main><CaseFooter disclaimer /></>}
