'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './prototype.css';

type Tank = {
  number: string;
  product: string;
  method: string;
  top: string;
  bottom: string;
  barrels: string;
  temperature: string;
  seal: string;
};
const newTank = (): Tank => ({
  number: '',
  product: 'Crude oil',
  method: 'Hand',
  top: '',
  bottom: '',
  barrels: '',
  temperature: '',
  seal: '',
});
type StopRecord = {
  index: number;
  tanks: Tank[];
  contact: { name: string; phone: string };
  attachments: string[];
  delivery: { volume: string; ticket: string; accepted: boolean };
};
type FinishedLoad = { bol: string; records: StopRecord[] };
const firstBol = '04351078301425';
const storageKey = 'welltrax-demo-v2';
const stops = [
  {
    type: 'Pickup',
    name: '411 Well Pad 1',
    id: '123456',
    time: '12:00 AM',
    operator: 'BP Energy',
    volume: '100 bbl',
  },
  {
    type: 'Pickup',
    name: '822 Well Pad 45',
    id: '234567',
    time: 'Night',
    operator: 'BP Energy',
    volume: '80 bbl',
  },
  {
    type: 'Drop',
    name: '411 Drop Pad',
    id: '345678',
    time: '10:30 AM',
    operator: 'North Terminal',
    volume: '100 bbl',
  },
  {
    type: 'Drop',
    name: '822 Drop Pad',
    id: '456789',
    time: '11:30 AM',
    operator: 'South Terminal',
    volume: '80 bbl',
  },
];
const icons = {
  Loads: 'imgProperty1TruckTruckActive',
  Map: 'imgProperty1MapTruckDefault',
  Chat: 'imgProperty1ChatTruckDefault',
  Settings: 'imgProperty1SettingsTruckDefault',
  sync: 'imgProperty1SyncProperty2Default',
  menu: 'imgNavBarIcons1',
  help: 'imgNavBarIcons2',
  clock: 'imgNavBarIcons',
  pickup: 'imgGroup2019',
  drop: 'imgGroup2021',
  print: 'imgIcons1',
  details: 'imgIcons2',
};
function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <Image
      className="wt-icon"
      src={`/images/welltrax/${icons[name]}.svg`}
      width="24"
      height="24"
      alt=""
    />
  );
}
export default function WelltraxPrototype({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [bol, setBol] = useState(firstBol);
  const [queue, setQueue] = useState(['04351078301426', '04351078301427']);
  const [history, setHistory] = useState<FinishedLoad[]>([]);
  const [records, setRecords] = useState<StopRecord[]>([]);
  const [delivery, setDelivery] = useState({
    volume: '100',
    ticket: '',
    accepted: false,
  });
  const [inspected, setInspected] = useState(0);
  const [reviewedLoad, setReviewedLoad] = useState<FinishedLoad | null>(null);
  const [queuedBol, setQueuedBol] = useState('');
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const scroll = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState('Loads');
  const [view, setView] = useState('loads');
  const [filter, setFilter] = useState('Active');
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState('ready');
  const [detailTab, setDetailTab] = useState('Tanks');
  const [tanks, setTanks] = useState<Tank[]>([newTank()]);
  const [tank, setTank] = useState(0);
  const [night, setNight] = useState(false);
  const [offline, setOffline] = useState(false);
  const [notice, setNotice] = useState('');
  const [modal, setModal] = useState('');
  const [contact, setContact] = useState({
    name: 'Alex Morgan',
    phone: '555-0104',
  });
  const [messages, setMessages] = useState([
    'Dispatch: Your load is ready. Review the pickup instructions before starting.',
  ]);
  const [draft, setDraft] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [saved, setSaved] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const complete = step === stops.length;
  const stop = stops[Math.min(step, stops.length - 1)];
  // Browser storage is an external system; hydration restores its saved snapshot once.
  /* oxlint-disable react/react-compiler */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (
          d.version === 2 &&
          Number.isInteger(d.step) &&
          d.step >= 0 &&
          d.step <= 4 &&
          Array.isArray(d.tanks) &&
          d.tanks.length &&
          d.tanks.every(
            (t: Tank) =>
              typeof t.number === 'string' && typeof t.barrels === 'string',
          )
        ) {
          setBol(d.bol || firstBol);
          setQueue(d.queue || []);
          setHistory(d.history || []);
          setRecords(d.records || []);
          setStep(d.step);
          setPhase(d.phase || 'ready');
          setTanks(d.tanks);
          setDelivery(
            d.delivery || { volume: '100', ticket: '', accepted: false },
          );
          setContact(d.contact || { name: 'Alex Morgan', phone: '555-0104' });
          setAttachments(d.attachments || []);
          setNight(Boolean(d.night));
          setOffline(Boolean(d.offline));
          setSaved(d.saved || 0);
          setMessages(d.messages || []);
          setNotice('Welcome back. Your progress has been restored.');
        }
      }
    } catch {
      setStorageAvailable(false);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          version: 2,
          bol,
          queue,
          history,
          records,
          step,
          phase,
          tanks,
          delivery,
          contact,
          attachments,
          night,
          offline,
          saved,
          messages,
        }),
      );
    } catch {
      setStorageAvailable(false);
    }
  }, [
    ready,
    bol,
    queue,
    history,
    records,
    step,
    phase,
    tanks,
    delivery,
    contact,
    attachments,
    night,
    offline,
    saved,
    messages,
  ]);
  /* oxlint-enable react/react-compiler */
  useEffect(() => {
    scroll.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [tab, view, filter, step, detailTab]);
  function resume() {
    setTab('Loads');
    setFilter('Active');
    if (phase === 'arrived' && !complete) openStop();
    else setView('loads');
  }
  function inspectStop(index: number) {
    setInspected(index);
    setReviewedLoad(null);
    setModal('stop-info');
  }
  function syncChanges() {
    setOffline(false);
    setSaved(0);
    setMessages((items) =>
      items.map((m) =>
        m === 'Dispatch simulator: Message queued. Reconnect to continue.'
          ? 'Dispatch simulator: Message delivered. Continue your current stop when ready.'
          : m,
      ),
    );
  }
  function markChange() {
    if (offline) setSaved((n) => n + 1);
  }
  function startNext(next: string) {
    setBol(next);
    setQueue((q) => q.filter((b) => b !== next));
    setRecords([]);
    setStep(0);
    setPhase('ready');
    setView('loads');
    setFilter('Active');
    setTab('Loads');
    setTanks([newTank()]);
    setTank(0);
    setAttachments([]);
    setDelivery({ volume: '100', ticket: '', accepted: false });
    setModal('');
    setNotice('Next load is ready. Review your first pickup.');
  }
  const shownRecord = (reviewedLoad?.records || records).find(
    (r) => r.index === inspected,
  );
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  function update(key: keyof Tank, value: string) {
    setTanks((items) =>
      items.map((item, i) => (i === tank ? { ...item, [key]: value } : item)),
    );
  }
  function reset() {
    setBol(firstBol);
    setQueue(['04351078301426', '04351078301427']);
    setHistory([]);
    setRecords([]);
    setDelivery({ volume: '100', ticket: '', accepted: false });
    setContact({ name: 'Alex Morgan', phone: '555-0104' });
    setMessages([
      'Dispatch: Your load is ready. Review the pickup instructions before starting.',
    ]);
    setDraft('');
    setOffline(false);
    setReviewedLoad(null);
    setStep(0);
    setPhase('ready');
    setView('loads');
    setFilter('Active');
    setTab('Loads');
    setTanks([newTank()]);
    setTank(0);
    setSaved(0);
    setAttachments([]);
    setModal('');
    setNotice('Demo reset. Your first pickup is ready.');
  }
  function finishStop() {
    const record: StopRecord = {
      index: step,
      tanks: stop.type === 'Pickup' ? tanks : [],
      contact: { ...contact },
      attachments: [...attachments],
      delivery: { ...delivery },
    };
    const nextRecords = [...records, record];
    setRecords(nextRecords);
    if (step === 3) setHistory((h) => [...h, { bol, records: nextRecords }]);
    markChange();
    setAttachments([]);
    setDelivery({
      volume: step === 2 ? '80' : '100',
      ticket: '',
      accepted: false,
    });
    setStep((n) => n + 1);
    setPhase('ready');
    setView('loads');
    setTanks([newTank()]);
    setTank(0);
    setNotice(
      offline
        ? 'Stop saved on this device. Sync when you reconnect.'
        : 'Stop completed and synced.',
    );
  }
  const openStop = () => {
    setView('stop');
    setDetailTab(stop.type === 'Pickup' ? 'Tanks' : 'Delivery');
  };
  return (
    <div
      className={`wt-stage ${night ? 'wt-night' : ''} ${embedded ? 'wt-embedded' : ''}`}
    >
      <div className="wt-demo-bar">
        <Link href="/cases/trucking">← Back to case</Link>
        <span>
          WELLTRAX <b>INTERACTIVE PROTOTYPE</b>
        </span>
        <button onClick={() => setModal('reset')}>Reset demo</button>
      </div>
      <div className="wt-workspace">
        <aside className="wt-guide">
          <span className="wt-kicker">DESIGNED FOR THE ROAD</span>
          <h1>
            A load.
            <br />
            Every stop.
            <br />
            <em>Under control.</em>
          </h1>
          <p>
            Step into the driver’s seat. Take a load from the queue through
            pickup, tank measurements, and delivery.
          </p>
          <ol>
            <li className={phase === 'ready' && !complete ? 'current' : ''}>
              Review your load
            </li>
            <li className={phase === 'driving' ? 'current' : ''}>
              Drive to the next stop
            </li>
            <li className={phase === 'arrived' ? 'current' : ''}>
              Record and complete the stop
            </li>
            <li className={complete ? 'current' : ''}>Find it in Completed</li>
          </ol>
          <div className="wt-demo-note">
            Sample data · Progress saved in this browser
          </div>
          <button className="wt-guide-link" onClick={() => setNight(!night)}>
            {night ? 'Switch to day mode' : 'Try night mode'} <span>↗</span>
          </button>
        </aside>
        <section className="wt-device" aria-label="Welltrax driver app">
          <div className="wt-status">
            <span>9:41 &nbsp; Mon Jun 3</span>
            <span>{offline ? 'Offline' : 'Connected'} &nbsp; 100% ▰</span>
          </div>
          <header className="wt-app-header">
            <div className="wt-toolbar">
              <button
                aria-label="Open settings"
                onClick={() => {
                  setTab('Settings');
                  setView('loads');
                }}
              >
                <Icon name="menu" />
              </button>
              <div className="wt-driver">
                <strong>N. Anderson</strong>
                <span>
                  Truck: <b>126L5</b> &nbsp; Trailer: <b>235P2</b>
                </span>
              </div>
              <button
                aria-label="Shift details"
                onClick={() => setModal('shift')}
              >
                <Icon name="clock" />
              </button>
              <button aria-label="Sync status" onClick={() => setModal('sync')}>
                <Icon name="sync" />
              </button>
              <button
                aria-label="Prototype help"
                onClick={() => setModal('help')}
              >
                <Icon name="help" />
              </button>
            </div>
            <h2>
              {tab === 'Loads'
                ? view === 'stop'
                  ? `${stop.type} #${(step % 2) + 1}`
                  : view === 'details'
                    ? 'Load details'
                    : 'My Loads'
                : tab}
            </h2>
          </header>
          <div className="wt-progress">
            <div>
              <span>
                {complete ? 'Load complete' : `Stop ${step + 1} of 4`}
              </span>
              <strong>
                {complete
                  ? 'Ready for your next load'
                  : phase === 'driving'
                    ? `En route · ${stop.name}`
                    : phase === 'arrived'
                      ? `On site · ${stop.name}`
                      : 'Ready to start'}
              </strong>
            </div>
            <progress value={step} max={4} aria-label="Completed stops" />
          </div>
          {!storageAvailable && (
            <div className="wt-storage-note" role="note">
              Browser storage is unavailable. Keep this tab open to retain your
              progress.
            </div>
          )}
          <div className="wt-scroll" ref={scroll}>
            <div className="wt-view" key={`${tab}-${view}-${filter}-${step}`}>
              {tab !== 'Loads' && (
                <button className="wt-resume" onClick={resume}>
                  ←{' '}
                  {complete
                    ? 'Return to loads'
                    : phase === 'arrived'
                      ? 'Resume stop form'
                      : 'Return to current load'}
                </button>
              )}
              {tab === 'Loads' && view === 'loads' && (
                <>
                  <div className="wt-segment" aria-label="Load status">
                    {['Active', 'Completed'].map((item) => (
                      <button
                        key={item}
                        aria-pressed={filter === item}
                        className={filter === item ? 'selected' : ''}
                        onClick={() => setFilter(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  {filter === 'Active' && !complete && (
                    <>
                      <h3>Current Load</h3>
                      <article className="wt-load">
                        <div className="wt-load-heading">
                          <strong>BOL {bol}</strong>
                          <span>BP Energy</span>
                          <span className="wt-badge">Urgent</span>
                        </div>
                        <div className="wt-load-tools">
                          <span>LOADED MILES: {step > 1 ? '48' : '0'}</span>
                          <div>
                            <button
                              className="wt-small"
                              onClick={() => window.print()}
                            >
                              Print <Icon name="print" />
                            </button>
                            <button
                              className="wt-small wt-muted-button"
                              onClick={() => setView('details')}
                            >
                              Load details <Icon name="details" />
                            </button>
                          </div>
                        </div>
                        {stops.map((s, i) => (
                          <div
                            className={`wt-stop ${i === step ? 'wt-current' : ''}`}
                            key={s.id}
                          >
                            <div className="wt-stop-time">
                              <strong>
                                {s.type} #{(i % 2) + 1}{' '}
                                <Icon
                                  name={s.type === 'Pickup' ? 'pickup' : 'drop'}
                                />
                              </strong>
                              <span>{s.time}</span>
                              <small>09-01-2021</small>
                            </div>
                            <div className="wt-stop-name">
                              <strong>
                                {s.name} <span>{s.id}</span>
                              </strong>
                              <div className="wt-tags">
                                <span>{s.volume}</span>
                                <span>Crude oil</span>
                              </div>
                              <small>{s.operator}</small>
                            </div>
                            <button
                              className={`wt-action ${i !== step ? 'wt-secondary-action' : ''}`}
                              aria-label={
                                i < step
                                  ? `Review ${s.type.toLowerCase()} ${(i % 2) + 1}`
                                  : i > step
                                    ? `Preview ${s.type.toLowerCase()} ${(i % 2) + 1}`
                                    : undefined
                              }
                              onClick={() => {
                                if (i !== step) {
                                  inspectStop(i);
                                  return;
                                }
                                if (phase === 'ready') {
                                  setPhase('driving');
                                  setNotice(
                                    'Trip started. Mark your arrival at the next stop.',
                                  );
                                } else if (phase === 'driving') {
                                  setPhase('arrived');
                                  openStop();
                                } else openStop();
                              }}
                            >
                              {i < step
                                ? 'Review'
                                : i > step
                                  ? 'Preview'
                                  : phase === 'ready'
                                    ? 'Start driving'
                                    : phase === 'driving'
                                      ? 'Mark arrived'
                                      : 'Continue'}
                            </button>
                          </div>
                        ))}
                      </article>
                      <div className="wt-queue-title">
                        <h3>Queue</h3>
                        <span>{queue.length} loads</span>
                      </div>
                      {queue.map((bol) => (
                        <article className="wt-queued" key={bol}>
                          <div className="wt-load-heading">
                            <strong>BOL {bol}</strong>
                            <span>BP Energy</span>
                            <span className="wt-badge">Scheduled</span>
                          </div>
                          <div className="wt-queue-route">
                            <span>Pickup · 411 Well Pad 1</span>
                            <span>→</span>
                            <span>Drop · 411 Drop Pad</span>
                          </div>
                          <button
                            className="wt-queue-link"
                            onClick={() => {
                              setQueuedBol(bol);
                              setModal('queue');
                            }}
                          >
                            Review scheduled load <span>→</span>
                          </button>
                        </article>
                      ))}
                    </>
                  )}
                  {filter === 'Active' && complete && (
                    <div className="wt-empty">
                      <span className="wt-success">✓</span>
                      <h3>All stops completed</h3>
                      <p>
                        Your stop records are saved. Review your completed work
                        or pick up the next load.
                      </p>
                      <button
                        className="wt-action"
                        onClick={() => setFilter('Completed')}
                      >
                        View completed load
                      </button>
                      <button
                        className="wt-outline"
                        onClick={() =>
                          queue.length ? startNext(queue[0]) : setModal('reset')
                        }
                      >
                        {queue.length
                          ? 'Start next queued load →'
                          : 'Start a new demo'}
                      </button>
                    </div>
                  )}
                  {filter === 'Completed' &&
                    (history.length ? (
                      history.map((load) => (
                        <article
                          className="wt-panel wt-completed-card"
                          key={load.bol}
                        >
                          <span className="wt-complete-label">✓ Completed</span>
                          <h3>BOL {load.bol}</h3>
                          <p>
                            BP Energy · {load.records.length} stops recorded
                          </p>
                          <div className="wt-record-links">
                            {load.records.map((r) => (
                              <button
                                key={r.index}
                                onClick={() => {
                                  setReviewedLoad(load);
                                  setInspected(r.index);
                                  setModal('stop-info');
                                }}
                              >
                                <span>
                                  {stops[r.index].type} #{(r.index % 2) + 1}
                                </span>
                                <strong>
                                  {r.tanks.length
                                    ? `${r.tanks.reduce((sum, t) => sum + Number(t.barrels), 0).toFixed(2)} bbl`
                                    : `${r.delivery.volume} bbl`}
                                </strong>
                                <span>Review →</span>
                              </button>
                            ))}
                          </div>
                          <button className="wt-outline" onClick={resume}>
                            {complete
                              ? queue.length
                                ? 'Back to loads'
                                : 'Back to loads'
                              : 'Resume active load'}
                          </button>
                          {complete && queue.length > 0 && (
                            <button
                              className="wt-action"
                              onClick={() => startNext(queue[0])}
                            >
                              Start next queued load →
                            </button>
                          )}
                        </article>
                      ))
                    ) : (
                      <div className="wt-empty">
                        <h3>No completed loads yet</h3>
                        <p>Finish the four stops to find your records here.</p>
                        <button className="wt-action" onClick={resume}>
                          Resume active load →
                        </button>
                      </div>
                    ))}
                </>
              )}
              {tab === 'Loads' && view === 'details' && (
                <>
                  <button className="wt-back" onClick={() => setView('loads')}>
                    ← My Loads
                  </button>
                  <article className="wt-panel">
                    <span className="wt-kicker">BILL OF LADING</span>
                    <h3>{bol}</h3>
                    <div className="wt-summary">
                      <div>
                        <b>BP Energy</b>
                        <span>Customer</span>
                      </div>
                      <div>
                        <b>Crude oil</b>
                        <span>Product</span>
                      </div>
                      <div>
                        <b>180 bbl</b>
                        <span>Planned volume</span>
                      </div>
                      <div>
                        <b>{step} / 4</b>
                        <span>Stops completed</span>
                      </div>
                    </div>
                    <h4>Dispatch instructions</h4>
                    <p>
                      Check in with the site operator on arrival. Verify tank
                      numbers and seals before loading. Record measurements for
                      each tank and attach the signed ticket before leaving.
                    </p>
                    <h4>Route</h4>
                    {stops.map((s, i) => (
                      <button
                        className="wt-detail-row wt-route-row"
                        key={s.id}
                        onClick={() => inspectStop(i)}
                      >
                        <span>
                          {i + 1}. {s.type} · {s.name}
                        </span>
                        <b>
                          {i < step
                            ? 'Complete'
                            : i === step
                              ? 'Next stop'
                              : 'Scheduled'}
                        </b>
                      </button>
                    ))}
                    {!complete && (
                      <button className="wt-action" onClick={resume}>
                        Return to current stop
                      </button>
                    )}
                  </article>
                </>
              )}
              {tab === 'Loads' && view === 'stop' && (
                <>
                  <button className="wt-back" onClick={() => setView('loads')}>
                    ← My Loads
                  </button>
                  <div className="wt-duration">
                    <span>
                      Arrived: <b>9:41 AM</b>
                    </span>
                    <span>
                      Load: <b>00:00</b>
                    </span>
                    <span>
                      Wait time: <b>00:00</b>
                    </span>
                  </div>
                  <div className="wt-stop-tabs">
                    {[
                      stop.type === 'Pickup' ? 'Tanks' : 'Delivery',
                      'Contacts',
                      'Attachments',
                    ].map((item) => (
                      <button
                        className={detailTab === item ? 'selected' : ''}
                        key={item}
                        onClick={() => setDetailTab(item)}
                      >
                        {item}
                        {item === 'Attachments' && attachments.length > 0
                          ? ` (${attachments.length})`
                          : ''}
                      </button>
                    ))}
                  </div>
                  {detailTab === 'Tanks' && (
                    <>
                      <div className="wt-tank-tabs">
                        {tanks.map((_, i) => (
                          <button
                            aria-pressed={i === tank}
                            key={i}
                            onClick={() => setTank(i)}
                          >
                            Tank {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setTanks([...tanks, newTank()]);
                            setTank(tanks.length);
                          }}
                        >
                          + Add tank
                        </button>
                      </div>
                      <form
                        className="wt-panel"
                        onSubmit={(e) => {
                          e.preventDefault();
                          setModal('depart');
                        }}
                      >
                        <div className="wt-form-heading">
                          <h3>Tank {tank + 1}</h3>
                          {tanks.length > 1 && (
                            <button
                              type="button"
                              className="wt-delete"
                              onClick={() => setModal('remove-tank')}
                            >
                              Remove tank
                            </button>
                          )}
                        </div>
                        <p className="wt-field-hint">
                          Tank number and volume are required. Everything else
                          is optional.
                        </p>
                        <div className="wt-form-grid">
                          <label>
                            Number
                            <input
                              required
                              placeholder="e.g. ABC123"
                              value={tanks[tank].number}
                              onChange={(e) => update('number', e.target.value)}
                            />
                          </label>
                          <label>
                            Product
                            <select
                              value={tanks[tank].product}
                              onChange={(e) =>
                                update('product', e.target.value)
                              }
                            >
                              <option>Crude oil</option>
                              <option>Condensate</option>
                              <option>Produced water</option>
                            </select>
                          </label>
                        </div>
                        <h4>Gauging</h4>
                        <fieldset className="wt-radios">
                          <legend>Gauge method</legend>
                          {['Hand', 'Trailer', 'LACT'].map((method) => (
                            <label key={method}>
                              <input
                                type="radio"
                                name="method"
                                checked={tanks[tank].method === method}
                                onChange={() => update('method', method)}
                              />
                              {method}
                            </label>
                          ))}
                        </fieldset>
                        <div className="wt-form-grid">
                          {tanks[tank].method === 'Hand' && (
                            <>
                              <label>
                                Top gauge (feet)
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={tanks[tank].top}
                                  onChange={(e) =>
                                    update('top', e.target.value)
                                  }
                                  placeholder="0.00"
                                />
                              </label>
                              <label>
                                Bottom gauge (feet)
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={tanks[tank].bottom}
                                  onChange={(e) =>
                                    update('bottom', e.target.value)
                                  }
                                  placeholder="0.00"
                                />
                              </label>
                            </>
                          )}
                          <label>
                            {tanks[tank].method === 'LACT'
                              ? 'Meter volume (bbl)'
                              : 'Gross barrels (bbl)'}
                            <input
                              required
                              type="number"
                              min="0.01"
                              step="0.01"
                              placeholder="e.g. 99.73"
                              value={tanks[tank].barrels}
                              onChange={(e) =>
                                update('barrels', e.target.value)
                              }
                            />
                          </label>
                          <label>
                            Observed temperature (°F)
                            <input
                              type="number"
                              step="0.1"
                              placeholder="e.g. 72"
                              value={tanks[tank].temperature}
                              onChange={(e) =>
                                update('temperature', e.target.value)
                              }
                            />
                          </label>
                        </div>
                        <h4>Seals</h4>
                        <label>
                          Seal on · Number
                          <input
                            placeholder="e.g. S10428"
                            value={tanks[tank].seal}
                            onChange={(e) => update('seal', e.target.value)}
                          />
                        </label>
                        <div className="wt-form-actions">
                          <button
                            type="button"
                            className="wt-outline"
                            onClick={() => {
                              markChange();
                              setNotice(
                                offline
                                  ? 'Draft saved on this device.'
                                  : 'Tank draft saved.',
                              );
                            }}
                          >
                            Save draft
                          </button>
                          <button type="submit" className="wt-action">
                            Review & complete pickup →
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  {detailTab === 'Delivery' && (
                    <form
                      className="wt-panel"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setModal('depart');
                      }}
                    >
                      <h3>{stop.name}</h3>
                      <p>
                        Confirm the volume and delivery ticket before departing.
                      </p>
                      <div className="wt-form-grid">
                        <label>
                          Delivered volume (bbl)
                          <input
                            required
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={delivery.volume}
                            onChange={(e) =>
                              setDelivery({
                                ...delivery,
                                volume: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Delivery ticket
                          <input
                            required
                            pattern={'.*\\S.*'}
                            placeholder="e.g. DT-1042"
                            value={delivery.ticket}
                            onChange={(e) =>
                              setDelivery({
                                ...delivery,
                                ticket: e.target.value,
                              })
                            }
                          />
                        </label>
                      </div>
                      <label className="wt-check">
                        <input
                          required
                          type="checkbox"
                          checked={delivery.accepted}
                          onChange={(e) =>
                            setDelivery({
                              ...delivery,
                              accepted: e.target.checked,
                            })
                          }
                        />
                        Delivery accepted by the site operator
                      </label>
                      <button className="wt-action" type="submit">
                        Complete delivery →
                      </button>
                    </form>
                  )}
                  {detailTab === 'Contacts' && (
                    <form
                      className="wt-panel"
                      onSubmit={(e) => {
                        e.preventDefault();
                        markChange();
                        setNotice('Contact saved for this stop.');
                      }}
                    >
                      <h3>Site contact</h3>
                      <p>{stop.name}</p>
                      <label>
                        Name
                        <input
                          required
                          value={contact.name}
                          onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        Phone number
                        <input
                          type="tel"
                          required
                          value={contact.phone}
                          onChange={(e) =>
                            setContact({ ...contact, phone: e.target.value })
                          }
                        />
                      </label>
                      <div className="wt-form-actions">
                        <button className="wt-outline">Save contact</button>
                        <button
                          type="button"
                          className="wt-action"
                          onClick={() =>
                            setDetailTab(
                              stop.type === 'Pickup' ? 'Tanks' : 'Delivery',
                            )
                          }
                        >
                          Continue stop →
                        </button>
                      </div>
                    </form>
                  )}
                  {detailTab === 'Attachments' && (
                    <article className="wt-panel">
                      <h3>Photos & documents</h3>
                      <p>
                        Add a receipt or signed ticket to this stop. Files are
                        listed locally in this demo and are not uploaded.
                      </p>
                      <label className="wt-upload">
                        + Add attachment
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          multiple
                          onChange={(e) => {
                            setAttachments([
                              ...attachments,
                              ...Array.from(e.target.files || []).map(
                                (f) => f.name,
                              ),
                            ]);
                            e.target.value = '';
                          }}
                        />
                      </label>
                      <button
                        className="wt-outline"
                        onClick={() =>
                          setAttachments((a) => [
                            ...a,
                            `Sample-ticket-${a.length + 1}.pdf`,
                          ])
                        }
                      >
                        Add sample ticket
                      </button>
                      {attachments.map((file, i) => (
                        <div className="wt-detail-row" key={`${file}-${i}`}>
                          <span>{file}</span>
                          <button
                            onClick={() =>
                              setAttachments(
                                attachments.filter((_, j) => i !== j),
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        className="wt-action"
                        onClick={() =>
                          setDetailTab(
                            stop.type === 'Pickup' ? 'Tanks' : 'Delivery',
                          )
                        }
                      >
                        Continue stop →
                      </button>
                    </article>
                  )}
                </>
              )}
              {tab === 'Map' && (
                <article className="wt-panel">
                  <span className="wt-kicker">LOAD ROUTE</span>
                  <h3>Two pickups. Two deliveries.</h3>
                  <p>Stop sequence for BOL {bol}.</p>
                  <div className="wt-route-diagram">
                    {stops.map((s, i) => (
                      <button key={s.id} onClick={() => inspectStop(i)}>
                        <span className={i < step ? 'done' : ''}>
                          {i < step ? '✓' : i + 1}
                        </span>
                        <div>
                          <small>
                            {s.type} · {s.time}
                          </small>
                          <strong>{s.name}</strong>
                          <small>
                            {i < step
                              ? 'Completed'
                              : i === step
                                ? 'Next stop'
                                : 'Scheduled'}
                          </small>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="wt-caption">
                    Route overview · Live navigation is not connected in this
                    prototype.
                  </p>
                </article>
              )}
              {tab === 'Chat' && (
                <article className="wt-panel">
                  <h3>Dispatch</h3>
                  <p className="wt-caption">
                    Demo conversation · Saved in this browser.
                  </p>
                  <div className="wt-messages" aria-live="polite">
                    {messages.map((m, i) => (
                      <p key={i} className={m.startsWith('You:') ? 'sent' : ''}>
                        {m}
                      </p>
                    ))}
                  </div>
                  <form
                    className="wt-chat-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!draft.trim()) return;
                      setMessages([
                        ...messages,
                        `You: ${draft.trim()}`,
                        offline
                          ? 'Dispatch simulator: Message queued. Reconnect to continue.'
                          : 'Dispatch simulator: Received. Continue your current stop when you’re ready.',
                      ]);
                      markChange();
                      setDraft('');
                    }}
                  >
                    <input
                      aria-label="Message to dispatch"
                      placeholder="Write a message…"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      maxLength={500}
                    />
                    <button className="wt-action" disabled={!draft.trim()}>
                      Send
                    </button>
                  </form>
                </article>
              )}
              {tab === 'Settings' && (
                <article className="wt-panel">
                  <h3>N. Anderson</h3>
                  <p>Truck 126L5 · Trailer 235P2</p>
                  <div className="wt-setting">
                    <div>
                      <strong>Night mode</strong>
                      <p>A darker screen for night shifts.</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={night}
                      aria-label="Night mode"
                      onClick={() => setNight(!night)}
                      className={`wt-switch ${night ? 'on' : ''}`}
                    >
                      <span />
                    </button>
                  </div>
                  <div className="wt-setting">
                    <div>
                      <strong>Simulate offline</strong>
                      <p>Explore saved work and sync status.</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={offline}
                      aria-label="Simulate offline"
                      onClick={() => {
                        setOffline(!offline);
                        if (offline) {
                          syncChanges();
                          setNotice('Reconnected. Demo changes synced.');
                        }
                      }}
                      className={`wt-switch ${offline ? 'on' : ''}`}
                    >
                      <span />
                    </button>
                  </div>
                  <button
                    className="wt-outline"
                    onClick={() => setModal('sync')}
                  >
                    View sync status
                  </button>
                </article>
              )}
            </div>
          </div>
          <nav className="wt-bottom-nav" aria-label="App navigation">
            {(['Loads', 'Map', 'Chat', 'Settings'] as const).map((item) => (
              <button
                aria-current={tab === item ? 'page' : undefined}
                key={item}
                onClick={() => {
                  setTab(item);
                  if (item === 'Loads') {
                    if (phase === 'arrived' && !complete) openStop();
                    else setView('loads');
                  }
                }}
              >
                <Icon name={item} />
                <span>{item}</span>
              </button>
            ))}
          </nav>
          {notice && (
            <output className="wt-toast" aria-live="polite">
              {notice}
            </output>
          )}
        </section>
      </div>
      <dialog
        ref={dialog}
        className="wt-dialog"
        onCancel={() => setModal('')}
        aria-label="Welltrax confirmation and information"
      >
        <div>
          <button
            className="wt-dialog-close"
            aria-label="Close dialog"
            onClick={() => setModal('')}
          >
            ×
          </button>
          {modal === 'remove-tank' && (
            <>
              <h3>Remove Tank {tank + 1}?</h3>
              <p>
                This tank’s entries will be removed. Your other tanks will stay
                unchanged.
              </p>
              <button
                className="wt-action"
                onClick={() => {
                  setTanks((a) => a.filter((_, i) => i !== tank));
                  setTank(0);
                  setModal('');
                  setNotice('Tank removed.');
                }}
              >
                Remove tank
              </button>
              <button className="wt-back" onClick={() => setModal('')}>
                Keep tank
              </button>
            </>
          )}
          {modal === 'queue' && (
            <>
              <span className="wt-kicker">SCHEDULED LOAD</span>
              <h3>BOL {queuedBol}</h3>
              <p>
                BP Energy · 180 bbl of crude oil. Two pickups followed by two
                deliveries.
              </p>
              <div className="wt-next-note">
                {complete
                  ? 'Your current load is complete. This load is ready to begin.'
                  : 'Finish your current load first. Your place in the queue is reserved.'}
              </div>
              <button
                className="wt-action"
                onClick={() => {
                  if (complete) startNext(queuedBol);
                  else {
                    setModal('');
                    resume();
                  }
                }}
              >
                {complete ? 'Start this load →' : 'Resume current load →'}
              </button>
            </>
          )}
          {modal === 'stop-info' && (
            <>
              <span className="wt-kicker">
                {shownRecord ? 'COMPLETED STOP' : 'STOP PREVIEW'}
              </span>
              <h3>{stops[inspected].name}</h3>
              <p>
                {stops[inspected].operator} · {stops[inspected].type} #
                {(inspected % 2) + 1} · {stops[inspected].volume}
              </p>
              {shownRecord ? (
                <>
                  <div className="wt-saved-record">
                    {shownRecord.tanks.map((t, i) => (
                      <p key={i}>
                        <b>Tank {t.number}</b>
                        <br />
                        {t.product} · {t.barrels} bbl · {t.method} gauge
                        {t.seal ? ` · Seal ${t.seal}` : ''}
                        {t.temperature ? ` · ${t.temperature} °F` : ''}
                        {t.method === 'Hand' && t.top
                          ? ` · Top ${t.top} ft`
                          : ''}
                        {t.method === 'Hand' && t.bottom
                          ? ` · Bottom ${t.bottom} ft`
                          : ''}
                      </p>
                    ))}
                    {!shownRecord.tanks.length && (
                      <p>
                        <b>Ticket {shownRecord.delivery.ticket}</b>
                        <br />
                        {shownRecord.delivery.volume} bbl · Accepted by operator
                      </p>
                    )}
                    <p>
                      Contact: {shownRecord.contact.name} ·{' '}
                      {shownRecord.contact.phone}
                    </p>
                    <p>
                      {shownRecord.attachments.length
                        ? shownRecord.attachments.join(', ')
                        : 'No attachments added'}
                    </p>
                  </div>
                  <button className="wt-action" onClick={() => setModal('')}>
                    Back to {reviewedLoad ? 'completed loads' : 'route'}
                  </button>
                </>
              ) : (
                <>
                  <p>
                    {stops[inspected].type === 'Pickup'
                      ? 'Check in with the site operator and verify the tank number before loading.'
                      : 'Confirm the delivered volume and collect the delivery ticket from the site operator.'}
                  </p>
                  <div className="wt-next-note">
                    {inspected === step
                      ? 'This is your next stop.'
                      : `Complete the preceding stops to begin this ${stops[inspected].type.toLowerCase()}.`}
                  </div>
                  <button
                    className="wt-action"
                    onClick={() => {
                      setModal('');
                      resume();
                    }}
                  >
                    Resume current stop →
                  </button>
                </>
              )}
            </>
          )}
          {modal === 'depart' && (
            <>
              <h3>Complete this {stop.type.toLowerCase()}?</h3>
              <p>
                {stop.type === 'Pickup'
                  ? `${tanks.length} tank${tanks.length > 1 ? 's' : ''} recorded at ${stop.name}.`
                  : 'Confirm that the delivery is finished.'}{' '}
                Your progress will be saved before the next stop.
              </p>
              {tanks.some(
                (t) =>
                  !t.number.trim() ||
                  !t.barrels ||
                  !Number.isFinite(Number(t.barrels)) ||
                  Number(t.barrels) <= 0,
              ) && stop.type === 'Pickup' ? (
                <>
                  <p className="wt-error">
                    Enter a tank number and positive volume for every tank
                    before continuing.
                  </p>
                  <button
                    className="wt-action"
                    onClick={() => {
                      setTank(
                        tanks.findIndex(
                          (t) =>
                            !t.number.trim() ||
                            !t.barrels ||
                            !Number.isFinite(Number(t.barrels)) ||
                            Number(t.barrels) <= 0,
                        ),
                      );
                      setModal('');
                    }}
                  >
                    Review tanks
                  </button>
                </>
              ) : (
                <button
                  className="wt-action"
                  onClick={() => {
                    finishStop();
                    setModal('');
                  }}
                >
                  Confirm departure
                </button>
              )}
            </>
          )}
          {modal === 'help' && (
            <>
              <h3>Your next move</h3>
              <p>
                Choose Start driving on the current stop, then Mark arrived.
                Record the pickup’s tank number and volume, and confirm
                departure. Complete all four stops to finish the load.
              </p>
              <p>Use Settings to try night mode or simulate offline work.</p>
              <button className="wt-action" onClick={() => setModal('')}>
                Got it
              </button>
            </>
          )}
          {modal === 'shift' && (
            <>
              <h3>Current shift</h3>
              <p>N. Anderson · Started at 7:00 AM</p>
              <div className="wt-summary">
                <div>
                  <b>{step}</b>
                  <span>Stops completed</span>
                </div>
                <div>
                  <b>{history.length}</b>
                  <span>Loads completed</span>
                </div>
              </div>
            </>
          )}
          {modal === 'sync' && (
            <>
              <h3>
                {offline ? 'Working offline' : 'Everything is up to date'}
              </h3>
              <p>
                {offline
                  ? `${saved} saved changes are waiting to sync. Keep working and reconnect when you’re ready.`
                  : 'Your demo load progress is synced. No external service is connected.'}
              </p>
              <button
                className="wt-action"
                onClick={() => {
                  syncChanges();
                  setModal('');
                  setNotice('All changes synced in the demo.');
                }}
              >
                {offline ? 'Reconnect & sync' : 'Sync now'}
              </button>
            </>
          )}
          {modal === 'reset' && (
            <>
              <h3>Restart the demo?</h3>
              <p>
                This clears all demo loads, stop records, messages, and drafts.
                Your display preference stays the same.
              </p>
              <button className="wt-action" onClick={reset}>
                Restart demo
              </button>
              <button className="wt-back" onClick={() => setModal('')}>
                Keep exploring
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
