'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Maximize2 } from 'lucide-react';
import Prototype from '../causal-brain/prototype';

export function CausalDemo() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [running, setRunning] = useState(true);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) setRunning(false);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (container.current) observer.observe(container.current);
    const onVisibility = () => { if (document.hidden) setRunning(false); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  return <div ref={container} className="causal-demo">
    <div className="causal-demo-toolbar"><span>{running ? 'Guided walkthrough' : 'Interactive prototype'}</span><div><button onClick={() => setRunning(!running)} aria-label={running?'Pause walkthrough':'Play walkthrough'} title={running?'Pause walkthrough':'Play walkthrough'}>{running?<Pause size={16}/>:<Play size={16}/>}</button><button onClick={()=>{setRevision(v=>v+1);setRunning(true);}} aria-label="Restart walkthrough" title="Restart walkthrough"><RotateCcw size={16}/></button><a href="/causal-brain" target="_blank" rel="noreferrer" aria-label="Open full-size prototype" title="Open full-size prototype"><Maximize2 size={16}/></a></div></div>
    <div className="causal-demo-surface" onPointerDownCapture={()=>setRunning(false)} onKeyDownCapture={()=>setRunning(false)}><Prototype key={revision} tour={running && visible}/></div>
  </div>;
}
