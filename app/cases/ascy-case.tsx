'use client';

import {useEffect, useState} from 'react';
import {CaseHeader, CaseFooter} from './components';
import './ascy-case.css';

const prototype = 'https://www.figma.com/proto/5j3BUylTPv84ih27wujnc4/Ascy-TaskSetting?node-id=110-2565&starting-point-node-id=110%3A2565';
const design = 'https://www.figma.com/design/5j3BUylTPv84ih27wujnc4/Ascy-TaskSetting?node-id=15-2023';
const steps = [
  {title:'Make the first move obvious.', label:'Start', image:'welcome', detail:'One luminous voice control gives the empty screen a clear purpose. Capture the thought before asking someone to organise it.'},
  {title:'Make listening visible.', label:'Speak', image:'listening', detail:'A dedicated recording state pairs the orb with a plain-language status. Pause, stop, and cancel keep the interaction under the user’s control.'},
  {title:'Turn speech into something useful.', label:'Review', image:'detail', detail:'The sample recording becomes a titled grocery checklist. Individual checkboxes make the result actionable, while the content stays easy to scan.'},
  {title:'Leave room to change your mind.', label:'Refine', image:'edit', detail:'Voice is the starting point, not a restriction. Manual editing offers precision; Done returns the user to the saved note.'},
];

function Screen({name, alt, eager=false}:{name:string;alt:string;eager?:boolean}) {
  return <img className="as-screen" src={`/images/ascy/${name}.png`} width="375" height="812" alt={alt} loading={eager?'eager':'lazy'}/>;
}

function VoiceStory() {
  const [step,setStep]=useState(0);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>{
    if(!playing)return;
    const timer=setTimeout(()=>{
      if(step===steps.length-1)setPlaying(false);
      else setStep(step+1);
    },2400);
    return ()=>clearTimeout(timer);
  },[playing,step]);
  const current=steps[step];
  return <div className="as-walkthrough">
    <div className="as-story-controls">
      <span className="as-kicker">02 / THE CORE INTERACTION</span>
      <h2>A little less typing.<br/><i>A little more flow.</i></h2>
      <div className="as-step-buttons" aria-label="Explore the voice flow">{steps.map((s,i)=><button key={s.label} type="button" aria-pressed={step===i} onClick={()=>{setStep(i);setPlaying(false);}}><span>0{i+1}</span>{s.label}</button>)}</div>
      <div className="as-step-copy" aria-live="polite"><h3>{current.title}</h3><p>{current.detail}</p></div>
      <button className="as-play" type="button" onClick={()=>{if(!playing&&step===3)setStep(0);setPlaying(!playing);}}>{playing?'Pause walkthrough  Ⅱ':'Play the sequence  →'}</button>
      <span className="as-demo-note">A guided preview using sample content.</span>
    </div>
    <div className="as-demo-stage"><span className="as-stage-index">0{step+1} / 04</span><Screen name={current.image} alt={`Ascy ${current.label.toLowerCase()} screen: ${current.title}`}/><span className="as-stage-caption">{current.label.toUpperCase()} / ASCY</span></div>
  </div>;
}

export function AscyCase(){return <><CaseHeader/><main id="main" className="as-case">
  <section className="as-intro wrap">
    <a className="case-back" href="/cases">← All cases</a>
    <div className="as-topline"><span>ASCY / MOBILE PRODUCT DESIGN</span><span>VOICE → NOTES → ACTION</span></div>
    <h1>A thought.<br/><i>Already a note.</i></h1>
    <div className="as-intro-bottom"><p>A voice-first space for the things you don’t want to forget. Designing the path from a passing thought to a note you can actually use.</p><a className="as-button" href={prototype} target="_blank" rel="noreferrer">Explore the prototype <span>↗</span></a></div>
  </section>
  <section className="as-hero-stage" aria-label="Ascy product design showcase">
    <div className="as-stage-top"><strong>ascy</strong><span>A QUIETER WAY TO CAPTURE YOUR DAY.</span></div>
    <div className="as-phone-composition"><div className="as-side-phone as-left-phone"><Screen name="welcome" alt="Ascy welcome screen with an iridescent voice input control" eager/></div><div className="as-center-phone"><Screen name="home" alt="Ascy My Notes screen showing recent notes and lists" eager/></div><div className="as-side-phone as-right-phone"><Screen name="detail" alt="Ascy grocery checklist with individual completion controls" eager/></div></div>
    <div className="as-stage-bottom"><span>CAPTURE WHAT’S ON YOUR MIND.</span><span>COME BACK WHEN YOU’RE READY.</span></div>
  </section>
  <div className="wrap">
    <dl className="as-metadata"><div><dt>Discipline</dt><dd>Mobile UX & UI</dd></div><div><dt>Design focus</dt><dd>Voice capture · Notes · Lists</dd></div><div><dt>Deliverable</dt><dd>Interface & clickable prototype</dd></div><div><dt>Project stage</dt><dd>Design exploration</dd></div></dl>
    <section className="as-chapter" id="challenge"><div><span className="as-kicker">01 / THE DESIGN CHALLENGE</span><h2>Don’t lose the thought<br/><i>to the interface.</i></h2></div><div className="as-prose"><p className="as-lead">A shopping list. A reminder to call someone. One small thing to remember later.</p><p>The design challenge is to capture these moments without turning them into a setup task. Ascy starts with voice, then gives the result a familiar home: a note or a checklist.</p><p>The key tension is speed versus control. Capturing an idea should feel immediate, but the user still needs to understand what is happening, review the result, and correct it.</p></div></section>
    <div className="as-principles"><article><span>01</span><h3>Capture first.</h3><p>Put a single, obvious action at the centre of the first experience.</p></article><article><span>02</span><h3>Show the state.</h3><p>Distinguish connecting, listening, and processing so the system is never silent about its progress.</p></article><article><span>03</span><h3>Keep an exit.</h3><p>Let people pause, cancel, review, and edit. Voice should add convenience without taking away control.</p></article></div>
    <VoiceStory/>
  </div>
  <section className="as-type-break"><div className="wrap"><span className="as-kicker">FROM SPOKEN THOUGHT TO USEFUL STRUCTURE</span><div className="as-translation"><blockquote>“Buy milk, bread,<br/>broccoli and bananas.”</blockquote><span className="as-transform-arrow" aria-hidden="true">↗</span><div className="as-output"><span>BUY GROCERIES</span>{['Milk','Bread','Broccoli','Bananas'].map(item=><div key={item}><span aria-hidden="true">□</span>{item}</div>)}</div></div><p>One thought becomes a title and four independently actionable items.</p></div></section>
  <div className="wrap">
    <section className="as-chapter"><div><span className="as-kicker">03 / RETURNING TO YOUR NOTES</span><h2>Easy to capture.<br/><i>Easy to find again.</i></h2></div><div className="as-prose"><p>Capture is only half the experience. The notes overview groups recent content, distinguishes notes from lists, and keeps search and voice input within reach.</p><p>A detail view puts the content first. Secondary actions—pin, edit, share, and delete—stay available without competing with the note itself.</p></div></section>
    <div className="as-editorial-pair"><figure><div className="as-editorial-stage as-lilac"><Screen name="home" alt="My Notes, with date grouping and a persistent search and voice input dock"/></div><figcaption><span>01 / A PLACE FOR EVERYTHING</span>Titles, dates, and content types create a scannable overview.</figcaption></figure><figure><div className="as-editorial-stage as-slate"><Screen name="detail" alt="Buy groceries detail view with a focused checklist"/></div><figcaption><span>02 / ROOM TO FOCUS</span>The same visual language becomes quieter around the content.</figcaption></figure></div>
    <section className="as-craft"><div><span className="as-kicker">04 / VISUAL LANGUAGE</span><h2>A calm surface.<br/><i>A living signal.</i></h2><p>Deep charcoal surfaces give everyday content a quiet setting. The luminous orb carries the expressive part of the identity—and signals where voice interaction begins.</p><p>Clear type, restrained borders, and consistent spacing keep that distinctive gesture from overwhelming the work.</p><div className="as-palette" aria-label="Ascy interface palette"><span>Charcoal</span><span>Slate</span><span>Periwinkle</span><span>Light</span></div></div><div className="as-craft-crop"><Screen name="listening" alt="The luminous Ascy orb and clear Listening status in the recording interface"/><span>THE VOICE CONTROL / DETAIL</span></div></section>
    <section className="as-delivery"><span className="as-kicker">05 / CONNECTING THE EXPERIENCE</span><h2>From screens<br/><i>to a complete journey.</i></h2><div className="as-delivery-bottom"><p>The prototype connects creation, editing, completion, and organisation. It also includes the less visible moments: a paused recording, a delete confirmation, a search result, and a route back.</p><div className="as-counts"><div><strong>26</strong><span>Prototype screens & states</span></div><div><strong>102</strong><span>Configured interactions</span></div></div></div><div className="as-flow-map" aria-label="Main prototype journeys"><div><span>CAPTURE</span><p>Start → Speak → Process → Review</p></div><div><span>REFINE</span><p>Open → Edit → Save → Complete</p></div><div><span>ORGANISE</span><p>Search → Open → Pin or delete</p></div></div><p className="as-evidence">These figures describe prototype coverage, not product performance. Voice, text entry, and sharing use sample states; no live transcription or usage results are claimed.</p></section>
    <section className="as-reflection"><span className="as-kicker">WHAT I’D VALIDATE NEXT</span><h2>Does the first note<br/><i>feel effortless?</i></h2><p>The next step is to observe first-time use: whether people recognise the voice control, understand when recording begins and ends, and can correct a result without guidance. Those observations would test the design’s central promise.</p></section>
  </div>
  <section className="as-finale"><div className="wrap"><span className="as-kicker">TAKE IT FOR A SPIN</span><h2>Less between<br/>you and <i>your thought.</i></h2><a className="as-button" href={prototype} target="_blank" rel="noreferrer">Open the full prototype <span>↗</span></a><a className="as-design-link" href={design} target="_blank" rel="noreferrer">View the design file ↗</a></div></section>
  <div className="wrap"><a className="next-case" href="/cases/causal-labs"><div><span className="eyebrow">NEXT / CAUSAL LABS</span><h2>Weather signals.<br/>Operational context.</h2></div><span aria-hidden="true">↗</span></a></div>
</main><CaseFooter/></>}
