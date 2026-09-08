'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowLeftRight, Plane, Play, Pause, Plus, Minus, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import './prototype.css';
import './motion.css';

const hubs = [
  { code: 'ORD', name: "Chicago O'Hare Airport", city: 'Chicago', x: 61, y: 36, delayed: 847, cancelled: 203 },
  { code: 'JFK', name: 'John F. Kennedy Airport', city: 'New York', x: 84, y: 33, delayed: 625, cancelled: 142 },
  { code: 'EWR', name: 'Newark Liberty Airport', city: 'Newark', x: 80, y: 39, delayed: 482, cancelled: 96 },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', x: 86, y: 27, delayed: 310, cancelled: 54 },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta Airport', city: 'Atlanta', x: 69, y: 64, delayed: 217, cancelled: 29 },
  { code: 'DFW', name: 'Dallas Fort Worth Airport', city: 'Dallas', x: 47, y: 70, delayed: 386, cancelled: 71 },
];
const events = ['Northeast Blizzard', 'Midwest Winter Storm', 'Southern Heatwave'];
const hours = [-18, -12, -6, -3, 0, 6, 12, 18];
const descriptions = [
  'Pressure collapse detected across the Northeast corridor.',
  'Snow bands begin forming. Moisture convergence accelerates.',
  'Wind speeds exceed operational thresholds. Ground crews prepare.',
  'Snow thickens to an inch per hour and winds hit 30 mph.',
  'Blizzard conditions impact airport operations. Ground stops in effect.',
  'Heavy snowfall continues. Deicing queues extend across terminals.',
  'Snow bands move east. Runway clearance begins as winds ease.',
  'Conditions improve. Flight operations gradually resume.',
];
const heatDescriptions = ['High pressure builds across the South.', 'Temperatures rise above seasonal averages.', 'Extreme heat advisory issued for affected airports.', 'Runway temperatures climb. Aircraft weight restrictions begin.', 'Peak heat reduces takeoff performance and delays departures.', 'Heat persists. Ground crews rotate for cooling breaks.', 'Evening cooling allows flight restrictions to ease.', 'Temperatures normalize. Scheduled operations resume.'];
const relative = (h: number) => `T${h < 0 ? '−' : '+'}${Math.abs(h)}h`;
function Picker({ value, values, label, onChange }: {value:string;values:string[];label:string;onChange:(s:string)=>void}) {
  return <Select value={value} onValueChange={v => {if(v) onChange(v);}}><SelectTrigger className="cb-picker" aria-label={label}><SelectValue>{value}</SelectValue></SelectTrigger><SelectContent className="cb-menu">{values.map(v=><SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select>;
}
export default function Prototype({ tour = false }: { tour?: boolean }) {
  const [event, setEvent] = useState(events[0]);
  const [selected, setSelected] = useState<number|null>(null);
  const [compare, setCompare] = useState(false);
  const [model, setModel] = useState('HRRR');
  const [layer, setLayer] = useState('Temperature');
  const [hour, setHour] = useState(-3);
  const [playing, setPlaying] = useState(false);
  const [more, setMore] = useState(false);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (!tour) return;
    setPlaying(false);
    let step = 0;
    const advance = () => {
      const frames = [
        { hub: null, compare: false, hour: -18, zoom: 1 },
        { hub: null, compare: false, hour: -6, zoom: 1 },
        { hub: 0, compare: false, hour: -3, zoom: 1.15 },
        { hub: 0, compare: false, hour: 0, zoom: 1.15 },
        { hub: 0, compare: true, hour: -3, zoom: 1 },
        { hub: 0, compare: true, hour: 0, zoom: 1 },
        { hub: null, compare: false, hour: 12, zoom: 1 },
      ];
      const frame = frames[step++ % frames.length];
      setSelected(frame.hub); setCompare(frame.compare); setHour(frame.hour); setZoom(frame.zoom);
    };
    advance();
    const timer = window.setInterval(advance, 3800);
    return () => window.clearInterval(timer);
  }, [tour]);
  const heat = event === events[2];
  const activeHubs = event === events[0] ? [0,1,2,3,4] : event === events[1] ? [0,5,4] : [5,4];
  const hub = selected === null ? null : hubs[selected];
  const stage = Math.max(0, hours.findLastIndex(h=>h<=hour));
  const narrative = (heat ? heatDescriptions : descriptions)[stage];
  const factor = (heat ? .6 : event === events[1] ? .8 : 1) * Math.max(.05, Math.min(1, (hour + 19) / 19));
  const count = (n:number) => Math.round(n*factor).toLocaleString();
  const delay = model === 'HRRR' ? 3 : model === 'GFS' ? 6 : 4;
  const clock = (h:number) => `${String((h + 14 + 24) % 24).padStart(2,'0')}:00`;
  useEffect(()=>{if(!playing) return; const id=setInterval(()=>setHour(h=>{if(h>=18){setPlaying(false);return h;}return h+1;}),900);return()=>clearInterval(id);},[playing]);
  useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape'){if(compare)setCompare(false);else setSelected(null);}};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[compare]);
  function chooseEvent(v:string){setEvent(v);setSelected(null);setHour(-3);setPlaying(false);setZoom(1);}
  function openHub(i:number){setSelected(i);setZoom(1);}
  const imageStyle = { filter: layer === 'Wind speed' ? 'hue-rotate(35deg) saturate(.7)' : layer === 'Precipitation' ? 'hue-rotate(155deg) saturate(.7)' : heat ? 'sepia(.5) saturate(1.4)' : undefined, transform: `scale(${zoom})`, opacity: .82 + stage*.025 };
  return <div className={`causal-app ${tour ? 'cb-touring' : ''}`} role="region" aria-label="Causal Brain interactive prototype">
    <header className="cb-nav">
      {compare ? <><button className="cb-button" onClick={()=>setCompare(false)}><ArrowLeft size={15}/> Exit comparison</button><strong>{event}</strong><span className="cb-muted">Comparison Mode</span></> : <><button className="cb-brand" onClick={()=>setSelected(null)} aria-label="Causal Brain overview"><span>CB</span><strong>Causal Brain</strong></button><div className="cb-event"><small>EVENT</small><Picker value={event} values={events} label="Weather event" onChange={chooseEvent}/></div><button className="cb-button" onClick={()=>setCompare(true)}><ArrowLeftRight size={14}/> Compare Models</button></>}
      <span className="cb-status"><i/> Demo models</span>
    </header>
    <div className={`cb-workspace ${hub&&!compare?'cb-local':''}`}>
      {hub&&!compare&&<aside className="cb-history"><button className="cb-back" onClick={()=>setSelected(null)}><ArrowLeft size={14}/> All air hubs</button><h1>{hub.name}</h1><p className="cb-muted">Jan 13–14, 2025 · {hub.code}</p><h2>WEATHER DESCRIPTIONS</h2><div className="cb-stages">{hours.map((h,i)=><button key={h} className={stage===i?'active':''} onClick={()=>{setHour(h);setPlaying(false);}}><span>{relative(h)}</span><p>{(heat?heatDescriptions:descriptions)[i]}</p></button>)}</div></aside>}
      <section className={`cb-map ${compare?'cb-comparing':''}`} aria-label="Weather forecast map">
        {compare ? <div className="cb-comparison">{['Causal Brain',model].map((name,i)=><div className="cb-model-map" key={i}><img src="/images/causal/temperature.png" alt={`${name} illustrative weather forecast`} style={{...imageStyle, filter:i?'sepia(.5) saturate(1.3)':imageStyle.filter, transform:`scale(${zoom*1.45})`}}/><div className="cb-model-label">{i?<Picker value={model} values={['HRRR','GFS','ECMWF']} label="Comparison model" onChange={setModel}/>:<>MODEL: CAUSAL BRAIN</>}</div><span className={`cb-detection ${i?'late':'early'}`}>Detected at {clock(-3+(i?delay:0))}</span><span className="cb-model-caption">{hour < -3+(i?delay:0) ? 'Event not yet detected' : narrative}</span></div>)}</div> : <><div className={`cb-map-art ${hub?'cb-zoomed':''}`}><img src="/images/causal/temperature.png" alt="United States weather map from the Causal Labs design" style={imageStyle}/><div className="cb-markers" style={{transform:`scale(${zoom})`}}>{activeHubs.map(i=><button key={i} className={`cb-marker ${selected===i?'selected':''}`} style={{left:`${hubs[i].x}%`,top:`${hubs[i].y}%`}} onClick={()=>openHub(i)} aria-label={`Open ${hubs[i].name}`}><span className="cb-marker-label"><Plane size={12}/>{hubs[i].code}</span><span className="cb-hub-tooltip"><strong>{hubs[i].name}</strong><span>{count(hubs[i].delayed)} delayed · {count(hubs[i].cancelled)} cancelled</span><span>View airport details →</span></span></button>)}</div></div>{hub&&<div className="cb-narrative"><small>{relative(hour)} · {hub.code}</small><p>{narrative}</p></div>}
        <aside className="cb-impact">{hub?<><div className="cb-impact-heading"><small>SELECTED HUB</small><h2>{hub.name}</h2></div><div className="cb-metrics"><div><small>FLIGHTS DELAYED</small><strong>{count(hub.delayed)}</strong></div><div><small>FLIGHTS CANCELLED</small><strong>{count(hub.cancelled)}</strong></div><div><small>GATE HOLDS</small><strong>{count(14)}</strong><span>Active now</span></div><div><small>GROUND STOPS</small><strong>{count(3)}</strong><span>Active now</span></div></div><button className="cb-more" onClick={()=>setSelected(null)}>BACK TO ALL HUBS <ArrowLeft size={13}/></button></>:<><div className="cb-impact-heading"><small>PASSENGERS DISRUPTED</small><strong>{count(62400)}</strong></div><div className="cb-metrics"><div><small>FLIGHTS DELAYED</small><strong>{count(activeHubs.reduce((s,i)=>s+hubs[i].delayed,0))}</strong></div><div><small>FLIGHTS CANCELLED</small><strong>{count(activeHubs.reduce((s,i)=>s+hubs[i].cancelled,0))}</strong></div></div><h2 className="cb-impact-title">AIR HUBS IMPACTED</h2>{activeHubs.slice(0,more?6:3).map((i,n)=><button className="cb-hub-row" key={i} onClick={()=>openHub(i)}><span>{n+1}</span><span><strong>{hubs[i].code}</strong><small>{hubs[i].city}</small></span><span>{count(hubs[i].delayed+hubs[i].cancelled)}</span></button>)}{activeHubs.length>3&&<button className="cb-more" onClick={()=>setMore(!more)}>{more?'SHOW LESS':'MORE'}<span>{more?'−':'+'}</span></button>}</>}</aside></>}
        <div className="cb-map-controls"><button title="Zoom in" aria-label="Zoom in" onClick={()=>setZoom(z=>Math.min(2,z+.2))} disabled={zoom>=2}><Plus size={16}/></button><button title="Zoom out" aria-label="Zoom out" onClick={()=>setZoom(z=>Math.max(1,z-.2))} disabled={zoom<=1}><Minus size={16}/></button><button title="Reset map" aria-label="Reset map" onClick={()=>setZoom(1)}><RotateCcw size={14}/></button></div>
        <div className="cb-bottom"><div className="cb-forecast"><div><small><i className="green"/>CAUSAL BRAIN PREDICTION</small><strong className="green-text">{delay} hours before {model}</strong></div><div><small><i className="red"/>{model} PREDICTION</small><strong className="red-text">{delay} hours after Causal Brain</strong></div><div><small><i/>EVENT START</small><strong>Jan 13, 14:00</strong></div></div>{!compare&&<div className="cb-layer"><div><small>LAYER</small><Picker value={layer} values={['Temperature','Precipitation','Wind speed']} label="Map layer" onChange={setLayer}/></div><div className={`cb-scale ${layer!=='Temperature'?'alternate':''}`}/><div className="cb-scale-labels">{(layer==='Temperature'?['10°','65°','105°']:layer==='Precipitation'?['0','0.5','1 in/h']:['0','30','60 mph']).map(v=><span key={v}>{v}</span>)}</div></div>}</div>
      </section>
    </div>
    <footer className="cb-timeline"><button className="cb-play" onClick={()=>{if(hour===18)setHour(-18);setPlaying(!playing);}} aria-label={playing?'Pause timeline':'Play timeline'} title={playing?'Pause':'Play'}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><div className="cb-timeline-track"><Slider aria-label="Forecast time" min={-18} max={18} step={1} value={[hour]} onValueChange={v=>{setHour(Array.isArray(v)?v[0]:v);setPlaying(false);}}/><div className="cb-timestamps">{[{h:-3,label:'CB Prediction',color:'green'},{h:-3+delay,label:`${model} Prediction`,color:'red'},{h:0,label:'Event Start',color:''}].map((m,i)=><button key={m.label} style={{left:`${(m.h+18)/36*100}%`,top:`${i===1?30:4}px`}} onClick={()=>{setHour(m.h);setPlaying(false);}}><i className={m.color}/>{m.label}</button>)}</div></div><time>Jan {hour < -14 ? '12' : hour >=10?'14':'13'}, {clock(hour)}</time></footer>
  </div>;
}
