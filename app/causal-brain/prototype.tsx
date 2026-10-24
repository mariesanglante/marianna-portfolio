'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowLeftRight,
  Plane,
  Play,
  Pause,
  Plus,
  Minus,
  RotateCcw,
  ChevronDown,
  X,
  Activity,
  Info,
  ListFilter,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import './prototype.css';
import './motion.css';

const hubs = [
  {
    code: 'ORD',
    name: "Chicago O'Hare Airport",
    city: 'Chicago',
    x: 61,
    y: 36,
    delayed: 847,
    cancelled: 203,
  },
  {
    code: 'JFK',
    name: 'John F. Kennedy Airport',
    city: 'New York',
    x: 84,
    y: 33,
    delayed: 625,
    cancelled: 142,
  },
  {
    code: 'EWR',
    name: 'Newark Liberty Airport',
    city: 'Newark',
    x: 80,
    y: 39,
    delayed: 482,
    cancelled: 96,
  },
  {
    code: 'LGA',
    name: 'LaGuardia Airport',
    city: 'New York',
    x: 86,
    y: 27,
    delayed: 310,
    cancelled: 54,
  },
  {
    code: 'ATL',
    name: 'Hartsfield-Jackson Atlanta Airport',
    city: 'Atlanta',
    x: 69,
    y: 64,
    delayed: 217,
    cancelled: 29,
  },
  {
    code: 'DFW',
    name: 'Dallas Fort Worth Airport',
    city: 'Dallas',
    x: 47,
    y: 70,
    delayed: 386,
    cancelled: 71,
  },
];
const events = [
  'Northeast Blizzard',
  'Midwest Winter Storm',
  'Southern Heatwave',
];
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
const heatDescriptions = [
  'High pressure builds across the South.',
  'Temperatures rise above seasonal averages.',
  'Extreme heat advisory issued for affected airports.',
  'Runway temperatures climb. Aircraft weight restrictions begin.',
  'Peak heat reduces takeoff performance and delays departures.',
  'Heat persists. Ground crews rotate for cooling breaks.',
  'Evening cooling allows flight restrictions to ease.',
  'Temperatures normalize. Scheduled operations resume.',
];
const relative = (h: number) => `T${h < 0 ? '−' : '+'}${Math.abs(h)}h`;
function Picker({
  value,
  values,
  label,
  onChange,
}: {
  value: string;
  values: string[];
  label: string;
  onChange: (s: string) => void;
}) {
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (v) onChange(v);
      }}
    >
      <SelectTrigger className="cb-picker" aria-label={label}>
        <SelectValue>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="cb-menu">
        {values.map((v) => (
          <SelectItem key={v} value={v}>
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
function Fold({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <section className={`cb-fold ${className} ${open ? 'is-open' : ''}`}>
      <button
        className="cb-fold-toggle"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown size={14} />
      </button>
      <div className="cb-fold-grid" inert={!open}>
        <div>{children}</div>
      </div>
    </section>
  );
}
export default function Prototype({ tour = false }: { tour?: boolean }) {
  const [screen, setScreen] = useState<
    'operations' | 'models' | 'guide' | null
  >(null);
  const [flightFilter, setFlightFilter] = useState('All flights');
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (screen) dialog.current?.showModal();
    else dialog.current?.close();
  }, [screen]);
  const [event, setEvent] = useState(events[0]);
  const [selected, setSelected] = useState<number | null>(null);
  const [compare, setCompare] = useState(false);
  const [model, setModel] = useState('HRRR');
  const [layer, setLayer] = useState('Precipitation');
  const [hour, setHour] = useState(-3);
  const [playing, setPlaying] = useState(false);
  const [more, setMore] = useState(false);
  useEffect(() => {
    if (!tour && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setPlaying(true);
  }, []);
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
      setSelected(frame.hub);
      setCompare(frame.compare);
      setHour(frame.hour);
      setZoom(frame.zoom);
    };
    advance();
    const timer = window.setInterval(advance, 3800);
    return () => window.clearInterval(timer);
  }, [tour]);
  const heat = event === events[2];
  const activeHubs =
    event === events[0]
      ? [0, 1, 2, 3, 4]
      : event === events[1]
        ? [0, 5, 4]
        : [5, 4];
  const hub = selected === null ? null : hubs[selected];
  const stage = Math.max(
    0,
    hours.findLastIndex((h) => h <= hour),
  );
  const narrative = (heat ? heatDescriptions : descriptions)[stage];
  const factor =
    (heat ? 0.6 : event === events[1] ? 0.8 : 1) *
    Math.max(0.05, Math.min(1, (hour + 19) / 19)) *
    (hour > 6 ? 1 - (hour - 6) * 0.055 : 1);
  const count = (n: number) => Math.round(n * factor).toLocaleString();
  const delay = model === 'HRRR' ? 3 : model === 'GFS' ? 6 : 4;
  const clock = (h: number) =>
    `${String((h + 14 + 24) % 24).padStart(2, '0')}:00`;
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () =>
        setHour((h) => {
          if (h >= 18) {
            if (loop) return -18;
            setPlaying(false);
            return h;
          }
          return h + 1;
        }),
      1000 / speed,
    );
    return () => clearInterval(id);
  }, [playing, speed, loop]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (screen) {
          setScreen(null);
          return;
        }
        if (compare) setCompare(false);
        else setSelected(null);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [compare, screen]);
  function chooseEvent(v: string) {
    setEvent(v);
    setSelected(null);
    setHour(-3);
    setPlaying(false);
    setZoom(1);
    setMore(false);
  }
  function openHub(i: number) {
    setSelected(i);
    setZoom(1);
  }
  const imageStyle = {
    filter:
      layer === 'Wind speed'
        ? 'hue-rotate(35deg) saturate(.7)'
        : layer === 'Precipitation'
          ? 'hue-rotate(155deg) saturate(.7)'
          : heat
            ? 'sepia(.5) saturate(1.4)'
            : undefined,
    transform: `scale(${zoom})`,
    opacity: 0.82 + stage * 0.025,
  };
  return (
    <div
      className={`causal-app ${tour ? 'cb-touring' : ''} ${playing ? 'cb-running' : ''}`}
      role="region"
      aria-label="Causal Brain interactive prototype"
    >
      <header className="cb-nav">
        {compare ? (
          <>
            <button className="cb-button" onClick={() => setCompare(false)}>
              <ArrowLeft size={15} /> Exit comparison
            </button>
            <strong>{event}</strong>
            <span className="cb-muted">Comparison Mode</span>
          </>
        ) : (
          <>
            <button
              className="cb-brand"
              onClick={() => setSelected(null)}
              aria-label="Causal Brain overview"
            >
              <span>CB</span>
              <strong>Causal Brain</strong>
            </button>
            <div className="cb-event">
              <small>EVENT</small>
              <Picker
                value={event}
                values={events}
                label="Weather event"
                onChange={chooseEvent}
              />
            </div>
            <button className="cb-button" onClick={() => setCompare(true)}>
              <ArrowLeftRight size={14} /> Compare Models
            </button>
          </>
        )}
        <button
          className="cb-button cb-help"
          onClick={() => setScreen('guide')}
        >
          <Info size={14} /> Guide
        </button>
        <span className="cb-status">
          <i /> {playing ? 'Simulation running' : 'Demo models'}
        </span>
      </header>
      <div className={`cb-workspace ${hub && !compare ? 'cb-local' : ''}`}>
        {hub && !compare && (
          <Fold title="Airport history" className="cb-history">
            <button className="cb-back" onClick={() => setSelected(null)}>
              <ArrowLeft size={14} /> All air hubs
            </button>
            <h1>{hub.name}</h1>
            <p className="cb-muted">Jan 13–14, 2025 · {hub.code}</p>
            <h2>WEATHER DESCRIPTIONS</h2>
            <div className="cb-stages">
              {hours.map((h, i) => (
                <button
                  key={h}
                  className={stage === i ? 'active' : ''}
                  onClick={() => {
                    setHour(h);
                    setPlaying(false);
                  }}
                >
                  <span>{relative(h)}</span>
                  <p>{(heat ? heatDescriptions : descriptions)[i]}</p>
                </button>
              ))}
            </div>
          </Fold>
        )}
        <section
          className={`cb-map ${compare ? 'cb-comparing' : ''}`}
          aria-label="Weather forecast map"
        >
          {compare ? (
            <div className="cb-comparison">
              {['Causal Brain', model].map((name, i) => (
                <div className="cb-model-map" key={i}>
                  <img
                    src="/images/causal/temperature.png"
                    alt={`${name} illustrative weather forecast`}
                    style={{
                      ...imageStyle,
                      filter: i ? 'sepia(.5) saturate(1.3)' : imageStyle.filter,
                      transform: `scale(${zoom * 1.45})`,
                    }}
                  />
                  <div className="cb-model-label">
                    {i ? (
                      <Picker
                        value={model}
                        values={['HRRR', 'GFS', 'ECMWF']}
                        label="Comparison model"
                        onChange={setModel}
                      />
                    ) : (
                      <>MODEL: CAUSAL BRAIN</>
                    )}
                  </div>
                  <span className={`cb-detection ${i ? 'late' : 'early'}`}>
                    Detected at {clock(-3 + (i ? delay : 0))}
                  </span>
                  <span className="cb-model-caption">
                    {hour < -3 + (i ? delay : 0)
                      ? 'Event not yet detected'
                      : narrative}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className={`cb-map-art ${hub ? 'cb-zoomed' : ''}`}>
                <img
                  src="/images/causal/temperature.png"
                  alt="United States weather map from the Causal Labs design"
                  style={imageStyle}
                />
                <svg
                  className={`cb-weather-overlay ${heat ? 'show-heat' : layer === 'Precipitation' ? 'show-precipitation' : layer === 'Wind speed' ? 'show-wind' : layer === 'Temperature' ? 'show-temperature' : 'show-pressure'}`}
                  viewBox="0 0 1000 650"
                  preserveAspectRatio="none"
                  aria-label={`${layer} conditions for the ${event.toLowerCase()}`}
                  role="img"
                  style={{ opacity: 0.35 + factor * 0.65 }}
                >
                  {heat ? (
                    <g className="cb-weather-heat">
                      <ellipse cx="650" cy="410" rx="190" ry="120" />
                      <ellipse cx="730" cy="475" rx="135" ry="88" />
                      <path d="M420 430 C520 340 600 510 705 405 S865 380 930 450" />
                      <text x="620" y="425">EXCESSIVE HEAT</text>
                    </g>
                  ) : (
                    <>
                      <g className="cb-weather-isobars">
                        <path d="M410 115 C525 30 695 40 810 125 S920 290 824 365 C720 447 574 370 505 290 S335 185 410 115Z" />
                        <path d="M475 150 C560 88 683 90 760 155 S835 267 772 315 C700 370 600 325 548 268 S412 205 475 150Z" />
                        <path d="M540 185 C600 145 671 148 716 185 S760 246 720 273 C677 302 623 278 589 242 S508 210 540 185Z" />
                      </g>
                      <g className="cb-weather-snow">
                        <path d="M625 70 C590 120 670 160 628 207 S660 294 715 325 S765 405 840 454" />
                        <path d="M690 52 C650 110 735 145 690 198 S724 280 774 313 S830 380 885 426" />
                        <path d="M560 105 C530 150 597 183 570 225 S602 302 655 335 S697 401 770 445" />
                        {[ [624,150],[658,204],[693,260],[730,318],[772,370],[822,420],[682,123],[738,177],[786,235],[832,290],[866,350],[588,245],[638,300],[688,355],[735,410] ].map(([x, y], i) => (
                          <g key={`snow-${i}`} className="cb-snowflake" transform={`translate(${x} ${y})`}>
                            <path d="M-6 0H6M0-6V6M-4-4L4 4M4-4L-4 4" />
                          </g>
                        ))}
                        <text x="730" y="475">SNOW BAND · UP TO 1 IN/HR</text>
                      </g>
                      <g className="cb-weather-wind">
                        <path d="M475 365 C570 300 640 355 710 290 S835 275 902 220" />
                        <path d="M500 420 C585 360 657 412 736 345 S850 326 920 278" />
                        <path d="M530 470 C612 414 690 465 768 398 S866 378 930 335" />
                        {[ [675,319, -37],[706,374,-38],[738,427,-38] ].map(([x,y,rotation], i) => (
                          <path key={`wind-${i}`} className="cb-wind-arrow" d="M-9 0H9M3-6L9 0 3 6" transform={`translate(${x} ${y}) rotate(${rotation})`} />
                        ))}
                        <text x="760" y="505">NW WIND · 30 MPH</text>
                      </g>
                    </>
                  )}
                </svg>
                <div
                  className="cb-markers"
                  style={{ transform: `scale(${zoom})` }}
                >
                  {activeHubs.map((i) => (
                    <button
                      key={i}
                      className={`cb-marker ${selected === i ? 'selected' : ''}`}
                      style={{ left: `${hubs[i].x}%`, top: `${hubs[i].y}%` }}
                      onClick={() => openHub(i)}
                      aria-label={`Open ${hubs[i].name}`}
                    >
                      <span className="cb-marker-label">
                        <Plane size={12} />
                        {hubs[i].code}
                      </span>
                      <span className="cb-hub-tooltip">
                        <strong>{hubs[i].name}</strong>
                        <span>
                          {count(hubs[i].delayed)} delayed ·{' '}
                          {count(hubs[i].cancelled)} cancelled
                        </span>
                        <span>View airport details →</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {hub && (
                <Fold title="Weather insight" className="cb-narrative">
                  <small>
                    {relative(hour)} · {hub.code}
                  </small>
                  <p>{narrative}</p>
                </Fold>
              )}
              <Fold
                title={hub ? `${hub.code} impact` : 'Network impact'}
                className="cb-impact"
              >
                {hub ? (
                  <>
                    <div className="cb-impact-heading">
                      <small>SELECTED HUB</small>
                      <h2>{hub.name}</h2>
                    </div>
                    <div className="cb-metrics">
                      <button
                        className="cb-metric"
                        onClick={() => {
                          setFlightFilter('Delayed');
                          setScreen('operations');
                        }}
                      >
                        <small>FLIGHTS DELAYED ↗</small>
                        <strong>{count(hub.delayed)}</strong>
                      </button>
                      <button
                        className="cb-metric"
                        onClick={() => {
                          setFlightFilter('Cancelled');
                          setScreen('operations');
                        }}
                      >
                        <small>FLIGHTS CANCELLED ↗</small>
                        <strong>{count(hub.cancelled)}</strong>
                      </button>
                      <div>
                        <small>GATE HOLDS</small>
                        <strong>{count(14)}</strong>
                        <span>Active now</span>
                      </div>
                      <div>
                        <small>GROUND STOPS</small>
                        <strong>{count(3)}</strong>
                        <span>Active now</span>
                      </div>
                    </div>
                    <button
                      className="cb-more"
                      onClick={() => setSelected(null)}
                    >
                      BACK TO ALL HUBS <ArrowLeft size={13} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="cb-impact-heading">
                      <small>PASSENGERS DISRUPTED</small>
                      <strong>{count(62400)}</strong>
                    </div>
                    <div className="cb-metrics">
                      <button
                        className="cb-metric"
                        onClick={() => {
                          setFlightFilter('Delayed');
                          setScreen('operations');
                        }}
                      >
                        <small>FLIGHTS DELAYED ↗</small>
                        <strong>
                          {count(
                            activeHubs.reduce((s, i) => s + hubs[i].delayed, 0),
                          )}
                        </strong>
                      </button>
                      <button
                        className="cb-metric"
                        onClick={() => {
                          setFlightFilter('Cancelled');
                          setScreen('operations');
                        }}
                      >
                        <small>FLIGHTS CANCELLED ↗</small>
                        <strong>
                          {count(
                            activeHubs.reduce(
                              (s, i) => s + hubs[i].cancelled,
                              0,
                            ),
                          )}
                        </strong>
                      </button>
                    </div>
                    <h2 className="cb-impact-title">AIR HUBS IMPACTED</h2>
                    {activeHubs.slice(0, more ? 6 : 3).map((i, n) => (
                      <button
                        className="cb-hub-row"
                        key={i}
                        onClick={() => openHub(i)}
                      >
                        <span>{n + 1}</span>
                        <span>
                          <strong>{hubs[i].code}</strong>
                          <small>{hubs[i].city}</small>
                        </span>
                        <span>
                          {count(hubs[i].delayed + hubs[i].cancelled)}
                        </span>
                      </button>
                    ))}
                    {activeHubs.length > 3 && (
                      <button
                        className="cb-more"
                        onClick={() => setMore(!more)}
                      >
                        {more ? 'SHOW LESS' : 'MORE'}
                        <span>{more ? '−' : '+'}</span>
                      </button>
                    )}
                  </>
                )}
                <button
                  className="cb-action"
                  onClick={() => {
                    setFlightFilter('All flights');
                    setScreen('operations');
                  }}
                >
                  <Activity size={14} /> Explore flight operations →
                </button>
              </Fold>
            </>
          )}
          <div className="cb-map-controls">
            <button
              title="Zoom in"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
              disabled={zoom >= 2}
            >
              <Plus size={16} />
            </button>
            <button
              title="Zoom out"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
              disabled={zoom <= 1}
            >
              <Minus size={16} />
            </button>
            <button
              title="Reset map"
              aria-label="Reset map"
              onClick={() => setZoom(1)}
            >
              <RotateCcw size={14} />
            </button>
          </div>
          <div className="cb-bottom">
            <Fold title="Forecast milestones" className="cb-forecast-fold">
              <div className="cb-forecast">
                <div>
                  <small>
                    <i className="green" />
                    CAUSAL BRAIN PREDICTION
                  </small>
                  <strong className="green-text">
                    {delay} hours before {model}
                  </strong>
                </div>
                <div>
                  <small>
                    <i className="red" />
                    {model} PREDICTION
                  </small>
                  <strong className="red-text">
                    {delay} hours after Causal Brain
                  </strong>
                </div>
                <div>
                  <small>
                    <i />
                    EVENT START
                  </small>
                  <strong>Jan 13, 14:00</strong>
                </div>
              </div>
              <button className="cb-action" onClick={() => setScreen('models')}>
                Explore model signals →
              </button>
            </Fold>
            {!compare && (
              <Fold title="Map layers" className="cb-layer">
                <div>
                  <small>LAYER</small>
                  <Picker
                    value={layer}
                    values={['Temperature', 'Precipitation', 'Wind speed']}
                    label="Map layer"
                    onChange={setLayer}
                  />
                </div>
                <div
                  className={`cb-scale ${layer !== 'Temperature' ? 'alternate' : ''}`}
                />
                <div className="cb-scale-labels">
                  {(layer === 'Temperature'
                    ? ['10°', '65°', '105°']
                    : layer === 'Precipitation'
                      ? ['0', '0.5', '1 in/h']
                      : ['0', '30', '60 mph']
                  ).map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </div>
              </Fold>
            )}
          </div>
        </section>
      </div>
      <Fold
        title={`Timeline · ${relative(hour)}${playing ? ' · Playing' : ''}`}
        className="cb-timeline-fold"
      >
        <footer className="cb-timeline">
          <button
            className="cb-play"
            onClick={() => {
              if (hour === 18) setHour(-18);
              setPlaying(!playing);
            }}
            aria-label={playing ? 'Pause timeline' : 'Play timeline'}
            title={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <div className="cb-timeline-track">
            <Slider
              aria-label="Forecast time"
              min={-18}
              max={18}
              step={1}
              value={[hour]}
              onValueChange={(v) => {
                setHour(Array.isArray(v) ? v[0] : v);
                setPlaying(false);
              }}
            />
            <div className="cb-timestamps">
              {[
                { h: -3, label: 'CB Prediction', color: 'green' },
                { h: -3 + delay, label: `${model} Prediction`, color: 'red' },
                { h: 0, label: 'Event Start', color: '' },
              ].map((m, i) => (
                <button
                  key={m.label}
                  style={{
                    left: `${((m.h + 18) / 36) * 100}%`,
                    top: `${i === 1 ? 30 : 4}px`,
                  }}
                  onClick={() => {
                    setHour(m.h);
                    setPlaying(false);
                  }}
                >
                  <i className={m.color} />
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <time>
            Jan {hour < -14 ? '12' : hour >= 10 ? '14' : '13'}, {clock(hour)}
          </time>
        </footer>
        <div className="cb-playback">
          <button
            className="cb-button"
            onClick={() => {
              setHour(-18);
              setPlaying(false);
            }}
          >
            <RotateCcw size={12} /> Restart
          </button>
          <button
            className="cb-button"
            onClick={() => setSpeed((v) => (v === 4 ? 1 : v * 2))}
          >
            Speed {speed}×
          </button>
          <button
            className="cb-button"
            aria-pressed={loop}
            onClick={() => setLoop(!loop)}
          >
            Loop {loop ? 'on' : 'off'}
          </button>
          <span>Illustrative simulation · Drag the timeline to explore</span>
        </div>
      </Fold>
      <dialog
        ref={dialog}
        aria-labelledby="cb-dialog-title"
        className="cb-dialog"
        onCancel={() => setScreen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setScreen(null);
        }}
      >
        <header>
          <div>
            <small>CAUSAL BRAIN · DEMO WORKSPACE</small>
            <h2 id="cb-dialog-title">
              {screen === 'operations'
                ? `${hub?.code ?? 'Network'} flight operations`
                : screen === 'models'
                  ? 'Understand the prediction'
                  : 'Explore Causal Brain'}
            </h2>
          </div>
          <button
            className="cb-button"
            aria-label="Close details"
            onClick={() => setScreen(null)}
          >
            <X size={18} />
          </button>
        </header>
        {screen === 'operations' ? (
          <>
            <p>
              {event} · {relative(hour)} · Illustrative flight records, not live
              aviation data.
            </p>
            <div className="cb-filter">
              <ListFilter size={16} />
              <select aria-label="Flight status" value={flightFilter} onChange={e=>setFlightFilter(e.target.value)}>{['All flights', 'Delayed', 'Cancelled', 'Recovering'].map(status=><option key={status}>{status}</option>)}</select>
            </div>
            <div className="cb-flight-list">
              {(hub ? [hubs.indexOf(hub)] : activeHubs)
                .flatMap((i) =>
                  ['Delayed', 'Cancelled', 'Recovering'].map((status, j) => ({
                    i,
                    j,
                    status,
                  })),
                )
                .filter(
                  (f) =>
                    flightFilter === 'All flights' || f.status === flightFilter,
                )
                .map(({ i, j, status }) => {
                  const id = `${event}-${i}-${j}`;
                  return (
                    <details key={id} className="cb-flight">
                      <summary>
                        <span>
                          <Plane size={14} /> CB {120 + i * 30 + j} ·{' '}
                          {hubs[i].code} → {['LAX', 'SFO', 'BOS'][j]}
                        </span>
                        <em className={status.toLowerCase()}>{status}</em>
                        <ChevronDown size={14} />
                      </summary>
                      <div>
                        <p>
                          {status === 'Cancelled'
                            ? 'Flight removed from the simulation schedule. Passenger rebooking is required.'
                            : status === 'Delayed'
                              ? `Departure shifted by ${Math.round(35 + factor * 95)} minutes. Ground teams are monitoring the weather window.`
                              : 'Runway clearance is underway. Departure slots are gradually reopening.'}
                        </p>
                        <dl>
                          <div>
                            <dt>Airport</dt>
                            <dd>{hubs[i].name}</dd>
                          </div>
                          <div>
                            <dt>Weather signal</dt>
                            <dd>{narrative}</dd>
                          </div>
                        </dl>
                        <button
                          className="cb-button"
                          aria-pressed={reviewed.includes(id)}
                          onClick={() =>
                            setReviewed((v) =>
                              v.includes(id)
                                ? v.filter((x) => x !== id)
                                : [...v, id],
                            )
                          }
                        >
                          {reviewed.includes(id)
                            ? 'Reviewed ✓ · Undo'
                            : 'Mark as reviewed'}
                        </button>
                        <button
                          className="cb-action"
                          onClick={() => {
                            openHub(i);
                            setCompare(false);
                            setScreen(null);
                          }}
                        >
                          Locate airport on map →
                        </button>
                      </div>
                    </details>
                  );
                })}
            </div>
          </>
        ) : screen === 'models' ? (
          <>
            <p>
              Compare when each model first identifies the event. These are
              illustrative timings for this portfolio prototype.
            </p>
            {['Causal Brain', 'HRRR', 'GFS', 'ECMWF'].map((name, i) => (
              <details className="cb-flight" key={name} open={i === 0}>
                <summary>
                  <span>{name}</span>
                  <em>
                    {i === 0 ? 'First signal' : `${[0, 3, 6, 4][i]}h later`}
                  </em>
                  <ChevronDown size={14} />
                </summary>
                <div>
                  <p>
                    {i === 0
                      ? 'Connects weather changes with potential downstream disruption across the airport network.'
                      : 'A reference forecast shown alongside the earlier Causal Brain signal for this scenario.'}
                  </p>
                  <button
                    className="cb-button"
                    onClick={() => {
                      if (i) setModel(name);
                      setCompare(true);
                      setScreen(null);
                    }}
                  >
                    Open side-by-side comparison
                  </button>
                </div>
              </details>
            ))}
          </>
        ) : (
          <>
            <p>
              Follow a weather event from its first signal through airport
              disruption and recovery.
            </p>
            {[
              [
                'Choose a scenario',
                'Switch between three weather events from the event menu. Each scenario has its own affected airport network.',
              ],
              [
                'Explore the map',
                'Select an airport marker or a hub in Network impact. Expand flight operations to inspect flights and mark them as reviewed.',
              ],
              [
                'Play the forecast',
                'Press Play, choose a speed, or drag the timeline. Loop replays the full event, including recovery.',
              ],
              [
                'Make room',
                'Every information panel has a collapsible heading. Click it again to restore the panel. Escape closes details or returns from comparison.',
              ],
            ].map(([title, body]) => (
              <details className="cb-flight" key={title}>
                <summary>
                  {title}
                  <ChevronDown size={14} />
                </summary>
                <div>
                  <p>{body}</p>
                </div>
              </details>
            ))}
            <button
              className="cb-action"
              onClick={() => {
                setScreen(null);
                setHour(-18);
                setPlaying(true);
              }}
            >
              Start the simulation <Play size={14} />
            </button>
            <a className="cb-action" href="/cases/causal-labs">
              Read the portfolio case study →
            </a>
          </>
        )}
        <footer>
          <button className="cb-button" onClick={() => setScreen(null)}>
            <ArrowLeft size={14} /> Back to {compare ? 'comparison' : 'map'}
          </button>
          <span role="status">
            {screen === 'operations'
              ? `${reviewed.length} flights reviewed this session`
              : 'Illustrative forecast data'}
          </span>
        </footer>
      </dialog>
    </div>
  );
}
