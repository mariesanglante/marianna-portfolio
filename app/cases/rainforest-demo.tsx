'use client';
import Link from 'next/link';
import { useState, useReducer, useRef, useEffect, useId } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  House,
  Car,
  UserRound,
  Settings,
  Plus,
  Minus,
  Zap,
  Thermometer,
  Plug,
} from 'lucide-react';
import {
  BatteryCharging,
  ScanLine,
  Wifi,
  X,
  WashingMachine,
  Download,
  RotateCcw,
  Pause,
  Play,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  initialDevices,
  manufacturers,
  periods,
  periodLabels,
  periodUsage,
  sumUsage,
  validateEagle,
  validateLocation,
  nextModel,
  energyCsv,
  navigation,
  journeys,
  type Device,
  type DeviceType,
  type Location,
  type Period,
  type Screen,
} from './rainforest-model';
import './rainforest-prototype.css';

const screenTitles: Record<Screen, string> = {
  home: 'My house',
  devices: 'My devices',
  'eagle-method': 'Connect EAGLE',
  'eagle-scan': 'Scan barcode',
  'eagle-manual': 'Manual entry',
  'eagle-success': 'EAGLE connected',
  'device-add': 'Add a device',
  'device-detail': 'Device details',
  'device-success': 'Device added',
  thermostat: 'Zen Thermostat',
  charging: 'Car charging',
  settings: 'Settings',
  locations: 'My locations',
  'location-edit': 'Location details',
  notifications: 'Notifications',
  support: 'Help & support',
  profile: 'My profile',
  'remove-device': 'Remove device?',
  'remove-location': 'Delete location?',
  disconnect: 'Disconnect EAGLE?',
  analytics: 'Energy dashboard',
  'signed-out': 'You’re signed out',
};
const descriptions: Partial<Record<Screen, [string, string]>> = {
  home: [
    'A reading, with meaning.',
    'Switch periods, compare energy and cost, or inspect the devices behind the demand.',
  ],
  'eagle-method': [
    'Two ways in.',
    'Scan the barcode or enter the device details. Both paths lead to a connected home.',
  ],
  'eagle-manual': [
    'Recovery stays in context.',
    'Try submitting an empty form, use the sample details, or simulate a connection failure. Values remain available when you retry.',
  ],
  devices: [
    'From the house to the device.',
    'Inspect an appliance, change its state, or add a new device. Your changes stay in this demo session.',
  ],
  thermostat: [
    'An explicit state change.',
    'Try Off, Heat, or Cool. The temperature controls only appear when they can do something.',
  ],
  charging: [
    'A pulse while it’s working.',
    'Pause or resume charging. Schedule a later session or read the charging recommendation.',
  ],
  settings: [
    'Preferences that respond.',
    'Change appearance, notification preferences, profile details, or the home’s location.',
  ],
  analytics: [
    'Compare without losing context.',
    'Change periods, add a comparison and cost overlay, inspect a chart point, or download a sample CSV.',
  ],
};
function DeviceIcon({ type }: { type: DeviceType }) {
  return type === 'Thermostat' ? (
    <Thermometer />
  ) : type === 'Wallbox Charger' ? (
    <Car />
  ) : type === 'Smart Plug' ? (
    <Plug />
  ) : (
    <WashingMachine />
  );
}
function Trend({
  period,
  metric = 'energy',
  compare = false,
  cost = false,
  onSelect,
}: {
  period: Period;
  metric?: 'energy' | 'cost';
  compare?: boolean;
  cost?: boolean;
  onSelect?: (i: number) => void;
}) {
  const uid = useId().replaceAll(':', '');
  const data = periodUsage[period],
    max = Math.max(...data) * 1.2;
  return (
    <div className="rp-trend">
      <svg
        viewBox="0 0 600 210"
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="img"
        aria-label={`${period} ${metric} chart${compare ? ', compared with the previous period' : ''}. Illustrative data.`}
      >
        <defs>
          <linearGradient id={uid} x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#bfa6ff" />
            <stop offset="1" stopColor="#6a42d0" />
          </linearGradient>
        </defs>
        {[35, 80, 125, 170].map((y) => (
          <line
            key={y}
            x1="0"
            x2="600"
            y1={y}
            y2={y}
            stroke="currentColor"
            opacity=".1"
          />
        ))}
        {data.map((v, i) => {
          const w = 570 / data.length,
            x = 15 + i * w,
            h = (v / max) * 165;
          return (
            <g key={i}>
              {compare && (
                <rect
                  x={x + w * 0.47}
                  y={175 - h * 0.78}
                  width={w * 0.33}
                  height={h * 0.78}
                  fill="#847c96"
                  opacity=".55"
                />
              )}
              <rect
                x={x}
                y={175 - h}
                width={w * (compare ? 0.38 : 0.63)}
                height={h}
                rx="3"
                fill={`url(#${uid})`}
              />
              <text
                x={x + w * 0.25}
                y="202"
                fill="currentColor"
                fontSize="13"
                textAnchor="middle"
              >
                {periodLabels[period][i]}
              </text>
            </g>
          );
        })}
        {cost && (
          <polyline
            points={data
              .map(
                (v, i) =>
                  `${15 + (i * 570) / data.length + (570 / data.length) * 0.25},${160 - (v / max) * 110}`,
              )
              .join(' ')}
            fill="none"
            stroke="#cfff76"
            strokeWidth="3"
          />
        )}
      </svg>
      {onSelect && (
        <div className="rp-chart-points" aria-label="Inspect chart data">
          {data.map((v, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Inspect ${periodLabels[period][i] || 'point ' + (i + 1)}: ${v} kilowatt hours`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function RainforestDemo({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const [nav, dispatch] = useReducer(navigation, {
    screen: 'home',
    history: [],
  });
  const { screen } = nav;
  const [journey, setJourney] = useState('energy'),
    [motionPaused, setMotionPaused] = useState(false),
    [light, setLight] = useState(false);
  const [devices, setDevices] = useState<Device[]>(initialDevices),
    [selectedId, setSelectedId] = useState('washer');
  const [connected, setConnected] = useState(true),
    [period, setPeriod] = useState<Period>('Live'),
    [metric, setMetric] = useState<'energy' | 'cost'>('energy');
  const [schedule, setSchedule] = useState(false),
    [chargeTime, setChargeTime] = useState('01:00');
  const [cloudId, setCloudId] = useState(''),
    [installCode, setInstallCode] = useState(''),
    [failConnection, setFailConnection] = useState(false),
    [busy, setBusy] = useState(false);
  const [error, setError] = useState(''),
    [notice, setNotice] = useState(''),
    [eventDismissed, setEventDismissed] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('Washing Machine'),
    [manufacturer, setManufacturer] = useState('Samsung'),
    [model, setModel] = useState('WW9800T'),
    [deviceName, setDeviceName] = useState(''),
    [appliance, setAppliance] = useState('Water Heater');
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 'home',
      name: 'Home',
      address: '6108 Cambie Street, Vancouver',
      utility: 'BC Hydro',
    },
    {
      id: 'cottage',
      name: 'Cottage',
      address: '245 Lake View Drive, Whistler',
      utility: 'BC Hydro',
    },
  ]);
  const [activeLocation, setActiveLocation] = useState('home'),
    [editingLocation, setEditingLocation] = useState<string | null>('home'),
    [locName, setLocName] = useState('Home'),
    [address, setAddress] = useState('6108 Cambie Street, Vancouver'),
    [utility, setUtility] = useState('BC Hydro');
  const [push, setPush] = useState(true),
    [emailAlerts, setEmailAlerts] = useState(false),
    [locationAccess, setLocationAccess] = useState(true),
    [profileName, setProfileName] = useState('Alex Morgan'),
    [profileEmail, setProfileEmail] = useState('alex@example.com');
  const [compare, setCompare] = useState(false),
    [overlay, setOverlay] = useState(false),
    [comparison, setComparison] = useState('Previous period'),
    [startDate, setStartDate] = useState('2025-07-23'),
    [endDate, setEndDate] = useState('2025-07-29'),
    [point, setPoint] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null),
    titleRef = useRef<HTMLHeadingElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    firstRender = useRef(true);
  const selected = devices.find((d) => d.id === selectedId) ?? devices[0];
  const location =
    locations.find((l) => l.id === activeLocation) ?? locations[0];
  const thermostatDevice =
    selected?.type === 'Thermostat'
      ? selected
      : devices.find((d) => d.type === 'Thermostat');
  const chargerDevice =
    selected?.type === 'Wallbox Charger'
      ? selected
      : devices.find((d) => d.type === 'Wallbox Charger');
  const mode = thermostatDevice?.mode ?? 'Off',
    temperature = thermostatDevice?.target ?? 70,
    charging = chargerDevice?.on ?? false;
  const setMode = (value: string) =>
    setDevices((ds) =>
      ds.map((d) =>
        d.id === thermostatDevice?.id
          ? { ...d, mode: value, on: value !== 'Off' }
          : d,
      ),
    );
  const setTemperature = (update: (v: number) => number) =>
    setDevices((ds) =>
      ds.map((d) =>
        d.id === thermostatDevice?.id
          ? { ...d, target: update(d.target ?? 70) }
          : d,
      ),
    );
  const setCharging = (update: (v: boolean) => boolean) =>
    setDevices((ds) =>
      ds.map((d) =>
        d.id === chargerDevice?.id ? { ...d, on: update(d.on) } : d,
      ),
    );
  const power =
    0.432 +
    devices.reduce(
      (total, d) =>
        total +
        (d.on
          ? d.type === 'Wallbox Charger'
            ? 6.5
            : d.type === 'Thermostat'
              ? 0.8
              : d.type === 'Smart Plug'
                ? 1.2
                : 1.5
          : 0),
      0,
    );
  const go = (next: Screen) => {
    setError('');
    setNotice('');
    dispatch({ type: 'go', screen: next });
  };
  const back = () => {
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
    setError('');
    setNotice('');
    dispatch({ type: 'back' });
  };
  const root = (next: Screen) => {
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
    setNotice('');
    setError('');
    dispatch({ type: 'root', screen: next });
  };
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    titleRef.current?.focus({ preventScroll: true });
  }, [screen]);
  useEffect(() => {
    if (error) scrollRef.current?.scrollTo(0, 0);
  }, [error]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function begin(key: string, next: Screen) {
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
    setJourney(key);
    setNotice('');
    setError('');
    setPoint(null);
    if (key === 'connect' || key === 'recovery') {
      setConnected(false);
      setCloudId(key === 'recovery' ? '00bb20' : '');
      setInstallCode(key === 'recovery' ? '126627-373839-smck93' : '');
      setFailConnection(key === 'recovery');
    }
    if (key === 'thermostat')
      setSelectedId(
        devices.find((d) => d.type === 'Thermostat')?.id ?? 'thermostat',
      );
    if (key === 'charging')
      setSelectedId(
        devices.find((d) => d.type === 'Wallbox Charger')?.id ?? 'charger',
      );
    if (key === 'analytics') setPeriod('Week');
    root(next);
  }
  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
    setDevices(initialDevices);
    setConnected(true);
    setPeriod('Live');
    setMetric('energy');
    setSchedule(false);
    setLight(false);
    setCloudId('');
    setInstallCode('');
    setFailConnection(false);
    setError('');
    setNotice('Demo reset. You’re back at the live dashboard.');
    setEventDismissed(false);
    setCompare(false);
    setOverlay(false);
    setJourney('energy');
    setSelectedId('washer');
    setChargeTime('01:00');
    setComparison('Previous period');
    setStartDate('2025-07-23');
    setEndDate('2025-07-29');
    setPoint(null);
    setLocations([
      {
        id: 'home',
        name: 'Home',
        address: '6108 Cambie Street, Vancouver',
        utility: 'BC Hydro',
      },
      {
        id: 'cottage',
        name: 'Cottage',
        address: '245 Lake View Drive, Whistler',
        utility: 'BC Hydro',
      },
    ]);
    setActiveLocation('home');
    setPush(true);
    setEmailAlerts(false);
    setLocationAccess(true);
    setProfileName('Alex Morgan');
    setProfileEmail('alex@example.com');
    root('home');
    setNotice('Demo reset. You’re back at the live dashboard.');
  }
  function connect() {
    const validation = validateEagle(cloudId, installCode);
    if (validation) {
      setError(validation);
      return;
    }
    setError('');
    setBusy(true);
    timer.current = setTimeout(() => {
      setBusy(false);
      if (failConnection) {
        setError(
          'We couldn’t reach this EAGLE. Your details are saved. Try again or check the device.',
        );
        setFailConnection(false);
      } else {
        setConnected(true);
        go('eagle-success');
      }
    }, 850);
  }
  function openDevice(d: Device) {
    setSelectedId(d.id);
    setDeviceName(d.name);
    setAppliance(d.appliance ?? 'Water Heater');
    go(
      d.type === 'Thermostat'
        ? 'thermostat'
        : d.type === 'Wallbox Charger'
          ? 'charging'
          : 'device-detail',
    );
  }
  function addDevice() {
    setDeviceType('Washing Machine');
    setManufacturer('Samsung');
    setModel('WW9800T');
    setDeviceName('');
    setAppliance('Water Heater');
    go('device-add');
  }
  function saveDevice() {
    if (!deviceName.trim()) {
      setError('Give this device a name so you can recognize it.');
      return;
    }
    const d: Device = {
      id: crypto.randomUUID(),
      type: deviceType,
      name: deviceName.trim(),
      manufacturer,
      model,
      on: true,
      ...(deviceType === 'Smart Plug' ? { appliance } : {}),
    };
    setDevices((ds) => [...ds, d]);
    setSelectedId(d.id);
    go('device-success');
  }
  function editLocation(l: Location | null) {
    setEditingLocation(l?.id ?? null);
    setLocName(l?.name ?? '');
    setAddress(l?.address ?? '');
    setUtility(l?.utility ?? 'BC Hydro');
    go('location-edit');
  }
  function saveLocation() {
    const validation = validateLocation(locName, address);
    if (validation) {
      setError(validation);
      return;
    }
    const id = editingLocation ?? crypto.randomUUID(),
      next = { id, name: locName.trim(), address: address.trim(), utility };
    setLocations((ls) =>
      editingLocation ? ls.map((l) => (l.id === id ? next : l)) : [...ls, next],
    );
    setActiveLocation(id);
    root('locations');
    setNotice('Location saved.');
  }
  function exportCsv() {
    const blob = new Blob([energyCsv(period, 0.12)], {
        type: 'text/csv;charset=utf-8',
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement('a');
    a.href = url;
    a.download = `rainforest-${period.toLowerCase()}-sample.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(
      'Sample CSV downloaded. This report contains demonstration data.',
    );
  }
  const description = descriptions[screen] ?? [
    'A complete journey.',
    'Every step has a way forward and a way back. Try the controls, cancel a change, or return home.',
  ];
  const field = (
    label: string,
    value: string,
    change: (v: string) => void,
    placeholder = '',
    type = 'text',
  ) => (
    <label className="rp-field">
      {label}
      <Input
        value={value}
        onChange={(e) => change(e.target.value)}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
  const primary = (label: string, onClick: () => void, disabled = false) => (
    <button className="rp-primary" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
  const secondary = (label: string, onClick: () => void) => (
    <button className="rp-secondary" onClick={onClick}>
      {label}
      <ChevronRight size={17} />
    </button>
  );
  const toggle = (
    label: string,
    checked: boolean,
    onCheckedChange: (v: boolean) => void,
  ) => (
    <div className="rp-toggle-row">
      <span>{label}</span>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
    </div>
  );
  const select = (
    label: string,
    value: string,
    options: string[],
    change: (v: string) => void,
  ) => (
    <label className="rp-field">
      {label}
      <select value={value} onChange={(e) => change(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
  const success = (
    title: string,
    text: string,
    actionLabel: string,
    action: () => void,
  ) => (
    <div className="rp-success">
      <CheckCircle2 size={58} />
      <h3>{title}</h3>
      <p>{text}</p>
      {primary(actionLabel, action)}
      {secondary('Return home', () => root('home'))}
    </div>
  );
  function energy() {
    return (
      <>
        <div className="rp-house-tabs">
          <button aria-pressed onClick={() => root('home')}>
            Energy usage
          </button>
          <button aria-pressed={false} onClick={() => root('devices')}>
            My devices
          </button>
        </div>
        {!connected ? (
          <div className="rp-empty">
            <Wifi size={52} />
            <h3>No energy data yet</h3>
            <p>Connect your EAGLE to see what is happening in your home.</p>
            {primary('Connect EAGLE', () => go('eagle-method'))}
            {secondary('Explore my devices', () => go('devices'))}
          </div>
        ) : (
          <>
            {!eventDismissed && (
              <div className="rp-event">
                <Zap size={17} />
                <div>
                  <b>Demand response event</b>
                  <span>Today · 6–9 PM · Target ≤ 3.5 kW</span>
                </div>
                <button
                  aria-label="Dismiss demand response event"
                  onClick={() => setEventDismissed(true)}
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <Tabs
              value={period}
              onValueChange={(v) => {
                setPeriod(v as Period);
                setPoint(null);
              }}
            >
              <TabsList className="rp-period-tabs">
                {periods.map((p) => (
                  <TabsTrigger value={p} key={p}>
                    {p === 'Live' && <span className="rp-live-led" />}
                    {p}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={period}>
                <div
                  className={`rp-demand ${period === 'Live' ? 'rp-is-live' : ''}`}
                >
                  <div className="rp-demand-top">
                    <strong>
                      {period === 'Live'
                        ? power.toFixed(3)
                        : metric === 'cost'
                          ? '$' + (sumUsage(period) * 0.12).toFixed(2)
                          : sumUsage(period).toFixed(1)}
                      <small>
                        {period === 'Live'
                          ? 'kW'
                          : metric === 'energy'
                            ? 'kWh'
                            : ''}
                      </small>
                    </strong>
                    <span>
                      {period === 'Live' ? 'Current usage' : period + ' total'}
                      <b>
                        {period === 'Live'
                          ? `$${(power * 0.12).toFixed(2)} / hour`
                          : 'Sample household data'}
                      </b>
                    </span>
                  </div>
                  {period === 'Live' ? (
                    <>
                      <div className="rp-energy-orb" aria-hidden="true">
                        <Zap fill="currentColor" size={48} />
                        <span />
                        <span />
                      </div>
                      <p>
                        {power > 3.5
                          ? 'Above the 3.5 kW target'
                          : 'Below the 3.5 kW target'}{' '}
                        ·{' '}
                        {power > 3.5
                          ? 'Try pausing a device'
                          : 'Within your current target'}
                      </p>
                    </>
                  ) : (
                    <p>
                      {metric === 'energy'
                        ? 'Energy consumed during the selected period.'
                        : 'Estimated using a sample $0.12/kWh rate.'}
                    </p>
                  )}
                </div>
                <div className="rp-panel">
                  <div className="rp-panel-heading">
                    <h3>
                      {period === 'Live'
                        ? 'kW demand'
                        : metric === 'energy'
                          ? 'Energy consumption'
                          : 'Energy cost'}
                    </h3>
                    {period !== 'Live' && (
                      <div className="rp-metric">
                        <button
                          aria-pressed={metric === 'energy'}
                          onClick={() => setMetric('energy')}
                        >
                          kWh
                        </button>
                        <button
                          aria-pressed={metric === 'cost'}
                          onClick={() => setMetric('cost')}
                        >
                          $
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="rp-muted">
                    {period === 'Live'
                      ? 'Last 15 minutes'
                      : period + ' overview'}
                  </p>
                  <Trend period={period} metric={metric} />
                </div>
              </TabsContent>
            </Tabs>
            {secondary('See what’s using energy', () => go('devices'))}
          </>
        )}
      </>
    );
  }
  function thermostat() {
    if (!thermostatDevice)
      return (
        <div className="rp-empty">
          <Thermometer size={42} />
          <h3>No thermostat connected</h3>
          <p>Add a thermostat to adjust its temperature.</p>
          {primary('Add a device', addDevice)}
          {secondary('All devices', () => root('devices'))}
        </div>
      );
    return (
      <>
        <div className="rp-device-symbol">
          <Thermometer size={42} />
        </div>
        <Tabs
          value={mode}
          onValueChange={(v) => {
            setMode(String(v));
            setNotice(`Thermostat ${String(v).toLowerCase()}.`);
          }}
        >
          <TabsList className="rp-mode-tabs">
            {['Off', 'Heat', 'Cool'].map((m) => (
              <TabsTrigger key={m} value={m}>
                {m}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={mode}>
            <div className={`rp-thermo-dial rp-${mode.toLowerCase()}`}>
              <span>
                {mode === 'Off'
                  ? 'System off'
                  : mode === 'Heat'
                    ? 'Heating to'
                    : 'Cooling to'}
              </span>
              <strong>{mode === 'Off' ? '—' : temperature + '°'}</strong>
              <small>Indoor temperature · 68°F</small>
            </div>
            {mode !== 'Off' && (
              <div className="rp-temperature">
                <button
                  aria-label="Decrease target temperature"
                  disabled={temperature <= 50}
                  onClick={() => setTemperature((t) => t - 1)}
                >
                  <Minus />
                </button>
                <span>Target temperature</span>
                <button
                  aria-label="Increase target temperature"
                  disabled={temperature >= 85}
                  onClick={() => setTemperature((t) => t + 1)}
                >
                  <Plus />
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        <div className="rp-panel">
          <h3>Temperature history</h3>
          <p className="rp-muted">Today · Sample readings</p>
          <dl className="rp-details"><div><dt>8 AM</dt><dd>68°F</dd></div><div><dt>Noon</dt><dd>69°F</dd></div><div><dt>6 PM</dt><dd>68°F</dd></div></dl>
        </div>
        {selected?.type === 'Thermostat' &&
          secondary('Edit device details', () => {
            setDeviceName(selected.name);
            go('device-detail');
          })}
        {secondary('All devices', () => root('devices'))}
      </>
    );
  }
  function car() {
    if (!chargerDevice)
      return (
        <div className="rp-empty">
          <Car size={42} />
          <h3>No charger connected</h3>
          <p>Add a charger to start a sample charging session.</p>
          {primary('Add a device', addDevice)}
          {secondary('All devices', () => root('devices'))}
        </div>
      );
    return (
      <>
        <div className={`rp-car-signal ${charging ? 'is-charging' : ''}`}>
          <BatteryCharging size={66} />
        </div>
        <div className="rp-panel">
          <div className="rp-charging-label">
            <span className={charging ? 'rp-live-led' : ''} />
            {charging ? 'Car is charging' : 'Charging paused'}
          </div>
          <div className="rp-charge-stats">
            <div>
              <small>Charging speed</small>
              <strong>
                {charging ? '6.5' : '0.0'} <span>kW</span>
              </strong>
            </div>
            <div>
              <small>Session use</small>
              <strong>
                2.5 <span>kWh</span>
              </strong>
            </div>
          </div>
          {primary(charging ? 'Pause charging' : 'Resume charging', () => {
            setCharging((v) => !v);
            setNotice(
              charging
                ? 'Charging paused. Resume whenever you’re ready.'
                : 'Charging resumed.',
            );
          })}
        </div>
        <div className="rp-panel">
          <h3>Charge at a better time</h3>
          <p>Plan a later start for this demo session.</p>
          {toggle('Scheduled charging', schedule, (v) => {
            setSchedule(v);
            setNotice(
              v
                ? 'Choose a start time below.'
                : 'Charging schedule turned off.',
            );
          })}
          {schedule && (
            <>
              {field('Start time', chargeTime, setChargeTime, '', 'time')}
              {primary('Save schedule', () => {
                if (!chargeTime) {
                  setError('Choose a start time.');
                  return;
                }
                setError('');
                setNotice(
                  `Charging scheduled for ${chargeTime}. This is a local demonstration.`,
                );
              })}
            </>
          )}
        </div>
        {secondary('Understand this recommendation', () => go('support'))}
        {selected?.type === 'Wallbox Charger' &&
          secondary('Edit device details', () => {
            setDeviceName(selected.name);
            go('device-detail');
          })}
        {secondary('All devices', () => root('devices'))}
      </>
    );
  }
  function analytics() {
    const current = sumUsage(period);
    return (
      <div className="rp-analytics">
        <div className="rp-analytics-heading">
          <div>
            <span className="rp-brand">
              <Zap size={23} /> RAINFOREST
            </span>
            <h3>Energy dashboard</h3>
            <p>Explore the story behind your energy use.</p>
          </div>
          <button className="rp-secondary" onClick={exportCsv}>
            <Download size={18} /> Export CSV
          </button>
        </div>
        <div className="rp-analytics-controls">
          {select(
            'Time period',
            period,
            ['Day', 'Week', 'Month', 'Year'],
            (v) => {
              setPeriod(v as Period);
              setPoint(null);
            },
          )}
          {toggle('Compare periods', compare, setCompare)}
          {toggle('Cost overlay', overlay, setOverlay)}
        </div>
        {compare && (
          <div className="rp-comparison-controls">
            {select(
              'Compare to',
              comparison,
              ['Previous period', 'Custom range'],
              setComparison,
            )}
            {comparison === 'Custom range' && (
              <>
                {field('From', startDate, setStartDate, '', 'date')}
                {field('To', endDate, setEndDate, '', 'date')}
              </>
            )}
            {comparison === 'Custom range' && endDate < startDate && (
              <p className="rp-error">
                The end date must be after the start date.
              </p>
            )}
          </div>
        )}
        <div className="rp-analytics-stats">
          <div>
            <span>Total usage</span>
            <strong>
              {current.toFixed(1)} <small>kWh</small>
            </strong>
            <p>{period} total</p>
          </div>
          <div>
            <span>Average / interval</span>
            <strong>
              {(current / periodUsage[period].length).toFixed(1)}{' '}
              <small>kWh</small>
            </strong>
            <p>{periodUsage[period].length} sample intervals</p>
          </div>
          <div>
            <span>Total cost</span>
            <strong>${(current * 0.12).toFixed(2)}</strong>
            <p>$0.12 / kWh · sample rate</p>
          </div>
        </div>
        <div className="rp-panel">
          <h3>Energy usage over time</h3>
          <p className="rp-muted">
            {compare
              ? `Current period vs ${comparison.toLowerCase()}`
              : period + ' overview'}{' '}
            · Select a point below to inspect
          </p>
          <Trend
            period={period}
            compare={
              compare && !(comparison === 'Custom range' && endDate < startDate)
            }
            cost={overlay}
            onSelect={setPoint}
          />
          <div className="rp-chart-legend">
            <span>● Current energy</span>
            {compare && <span>● Previous energy (sample)</span>}
            {overlay && <span>— Estimated cost</span>}
          </div>
          {point !== null && (
            <output className="rp-inspection">
              <b>{periodLabels[period][point] || 'Interval ' + (point + 1)}</b>
              <span>
                {periodUsage[period][point]} kWh · $
                {(periodUsage[period][point] * 0.12).toFixed(2)}
              </span>
              <button
                aria-label="Close data inspection"
                onClick={() => setPoint(null)}
              >
                <X size={16} />
              </button>
            </output>
          )}
        </div>
        <p className="rp-footnote">
          Illustrative household data. Custom comparisons demonstrate the
          interaction, not a live historical report.
        </p>
      </div>
    );
  }
  function content() {
    switch (screen) {
      case 'home':
        return energy();
      case 'thermostat':
        return thermostat();
      case 'charging':
        return car();
      case 'analytics':
        return analytics();
      case 'devices':
        return (
          <>
            <div className="rp-section-label">
              <span>{devices.length} connected devices</span>
              <button onClick={addDevice}>
                <Plus size={16} /> Add new
              </button>
            </div>
            {devices.length ? (
              devices.map((d) => (
                <button
                  className="rp-device-row"
                  key={d.id}
                  onClick={() => openDevice(d)}
                >
                  <span className="rp-device-icon">
                    <DeviceIcon type={d.type} />
                  </span>
                  <span>
                    <b>{d.name}</b>
                    <small>
                      {d.type === 'Thermostat'
                        ? (d.mode ?? 'Off')
                        : d.type === 'Wallbox Charger'
                          ? d.on
                            ? 'Charging'
                            : 'Paused'
                          : d.on
                            ? 'On'
                            : 'Off'}
                    </small>
                  </span>
                  <ChevronRight size={19} />
                </button>
              ))
            ) : (
              <div className="rp-empty">
                <Plug size={45} />
                <h3>No devices yet</h3>
                <p>
                  Add your first device to bring its controls into your home.
                </p>
                {primary('Add a device', addDevice)}
              </div>
            )}
            {!connected && (
              <div className="rp-panel">
                <p>
                  Your EAGLE is not connected. Device controls are available,
                  but whole-home readings need a monitor.
                </p>
                {secondary('Connect EAGLE', () => go('eagle-method'))}
              </div>
            )}
          </>
        );
      case 'eagle-method':
        return (
          <>
            <div className="rp-empty rp-compact">
              <Wifi size={48} />
              <h3>Connect your EAGLE</h3>
              <p>Find the barcode on the back of the device or on its box.</p>
            </div>
            {primary('Scan barcode', () => go('eagle-scan'))}
            {secondary('Enter details manually', () => go('eagle-manual'))}
            <div className="rp-panel">
              <h3>Before you start</h3>
              <p>
                Have your Cloud ID and install code ready. This portfolio uses
                sample values and does not access your camera or hardware.
              </p>
            </div>
            {secondary('Need help?', () => go('support'))}
          </>
        );
      case 'eagle-scan':
        return (
          <>
            <p className="rp-intro-copy">
              Point the camera at the code on your EAGLE.
            </p>
            <button
              className="rp-scan-area"
              onClick={() => {
                setCloudId('00bb20');
                setInstallCode('126627-373839-smck93');
                setFailConnection(false);
                go('eagle-manual');
                setNotice('Code detected. Review the sample device details.');
              }}
              aria-label="Simulate detection of the EAGLE barcode"
            >
              <ScanLine size={94} />
              <span className="rp-scan-beam" />
              <span>Tap to simulate a scan</span>
            </button>
            {secondary('Can’t scan? Enter manually', () => go('eagle-manual'))}
            <p className="rp-footnote">
              Camera simulation · no camera permission needed
            </p>
          </>
        );
      case 'eagle-manual':
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              connect();
            }}
            noValidate
          >
            <p className="rp-intro-copy">
              Enter the details printed beside the EAGLE barcode.
            </p>
            {field('Cloud ID', cloudId, setCloudId, 'e.g. 00bb20')}
            {field(
              'Install code',
              installCode,
              setInstallCode,
              'Enter install code',
            )}
            <button
              type="button"
              className="rp-inline-link"
              onClick={() => {
                setCloudId('00bb20');
                setInstallCode('126627-373839-smck93');
                setError('');
              }}
            >
              Use sample details
            </button>
            <button type="submit" className="rp-primary" disabled={busy}>
              {busy ? (
                <>
                  <span className="rp-loading" />
                  Connecting…
                </>
              ) : (
                'Connect EAGLE'
              )}
            </button>
            <button type="button" className="rp-secondary" onClick={back}>
              Cancel
            </button>
            {error && (
              <button
                type="button"
                className="rp-inline-link"
                onClick={() => go('support')}
              >
                Help with these details
              </button>
            )}
            <div className="rp-sample-option">
              {toggle(
                'Simulate a failed attempt',
                failConnection,
                setFailConnection,
              )}
            </div>
          </form>
        );
      case 'eagle-success':
        return success(
          'Your home is connected.',
          'You can now explore live energy, historical use, and estimated costs.',
          'See energy usage',
          () => root('home'),
        );
      case 'device-add':
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveDevice();
            }}
            noValidate
          >
            {select(
              'Device type',
              deviceType,
              Object.keys(manufacturers),
              (v) => {
                const t = v as DeviceType,
                  m = Object.keys(manufacturers[t])[0];
                setDeviceType(t);
                setManufacturer(m);
                setModel(nextModel(t, m));
              },
            )}
            {select(
              'Manufacturer',
              manufacturer,
              Object.keys(manufacturers[deviceType]),
              (v) => {
                setManufacturer(v);
                setModel(nextModel(deviceType, v));
              },
            )}
            {select(
              'Model',
              model,
              manufacturers[deviceType][manufacturer] ?? [],
              setModel,
            )}
            {field(
              'Device name',
              deviceName,
              setDeviceName,
              'e.g. Laundry washer',
            )}
            {deviceType === 'Smart Plug' &&
              select(
                'What’s plugged in?',
                appliance,
                [
                  'Water Heater',
                  'Washing Machine',
                  'Air Conditioner',
                  'Coffee Machine',
                  'Fridge',
                  'Other',
                ],
                setAppliance,
              )}
            <p className="rp-footnote">
              Adding to {location?.name ?? 'your home'} · example product list
            </p>
            <button type="submit" className="rp-primary">
              Add device
            </button>
            <button type="button" className="rp-secondary" onClick={back}>
              Cancel
            </button>
          </form>
        );
      case 'device-success':
        return success(
          `${selected?.name ?? 'Device'} is ready.`,
          `Added to ${location?.name ?? 'your home'}. Open its controls or return home.`,
          'Open device',
          () => selected && openDevice(selected),
        );
      case 'device-detail':
        return selected ? (
          <>
            <div className="rp-device-symbol">
              <DeviceIcon type={selected.type} />
            </div>
            <h3 className="rp-center-title">{selected.name}</h3>
            <div className="rp-panel">
              {toggle('Device power', selected.on, (v) => {
                setDevices((ds) =>
                  ds.map((d) =>
                    d.id === selected.id
                      ? {
                          ...d,
                          on: v,
                          ...(d.type === 'Thermostat'
                            ? { mode: v ? 'Heat' : 'Off' }
                            : {}),
                        }
                      : d,
                  ),
                );
                setNotice(`${selected.name} turned ${v ? 'on' : 'off'}.`);
              })}
              <div className="rp-device-demand">
                <strong>
                  {selected.on ? '1.5' : '0.0'} <small>kW</small>
                </strong>
                <span>Current usage</span>
              </div>
            </div>
            {field('Device name', deviceName, setDeviceName)}
            {selected.type === 'Smart Plug' &&
              select(
                'What’s plugged in?',
                appliance,
                [
                  'Water Heater',
                  'Washing Machine',
                  'Air Conditioner',
                  'Coffee Machine',
                  'Fridge',
                  'Other',
                ],
                setAppliance,
              )}
            {primary('Save changes', () => {
              if (!deviceName.trim()) {
                setError('Enter a device name.');
                return;
              }
              setDevices((ds) =>
                ds.map((d) =>
                  d.id === selected.id
                    ? {
                        ...d,
                        name: deviceName.trim(),
                        ...(d.type === 'Smart Plug' ? { appliance } : {}),
                      }
                    : d,
                ),
              );
              setError('');
              setNotice('Device details saved.');
            })}
            <dl className="rp-details">
              <div>
                <dt>Manufacturer</dt>
                <dd>{selected.manufacturer}</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>{selected.model}</dd>
              </div>
            </dl>
            {secondary('Remove device', () => go('remove-device'))}
          </>
        ) : (
          <>{primary('Back to devices', () => root('devices'))}</>
        );
      case 'remove-device':
        return (
          <div className="rp-confirm">
            <AlertCircle size={44} />
            <h3>Remove {selected?.name}?</h3>
            <p>
              This removes it from the demonstration. You can add it again at
              any time.
            </p>
            {primary('Remove device', () => {
              setDevices((ds) => ds.filter((d) => d.id !== selectedId));
              root('devices');
              setNotice('Device removed.');
            })}
            {secondary('Keep device', back)}
          </div>
        );
      case 'settings':
        return (
          <>
            {secondary('My locations', () => go('locations'))}
            {secondary('Notifications', () => go('notifications'))}
            <div className="rp-panel">
              <h3>Appearance</h3>
              {toggle('Light appearance', light, setLight)}
              {toggle('Location access', locationAccess, setLocationAccess)}
            </div>
            {secondary('Edit profile', () => go('profile'))}
            {secondary('Help & support', () => go('support'))}
            {connected && secondary('Disconnect EAGLE', () => go('disconnect'))}
            {secondary('Sign out of demo', () => go('signed-out'))}
          </>
        );
      case 'locations':
        return (
          <>
            <div className="rp-section-label">
              <span>{locations.length} locations</span>
              <button onClick={() => editLocation(null)}>
                <Plus size={16} /> Add new
              </button>
            </div>
            {locations.map((l) => (
              <div className="rp-panel" key={l.id}>
                <div className="rp-location-title">
                  <MapPin size={20} />
                  <h3>{l.name}</h3>
                  {activeLocation === l.id && <span>Active</span>}
                </div>
                <p>{l.address}</p>
                <div className="rp-location-actions">
                  <button
                    onClick={() => {
                      setActiveLocation(l.id);
                      setNotice(`${l.name} selected.`);
                    }}
                    disabled={activeLocation === l.id}
                  >
                    {activeLocation === l.id ? 'Selected' : 'Use location'}
                  </button>
                  <button onClick={() => editLocation(l)}>Edit details</button>
                </div>
              </div>
            ))}
            {!locations.length &&
              primary('Add your first location', () => editLocation(null))}
            {secondary('Back to settings', () => root('settings'))}
          </>
        );
      case 'location-edit':
        return (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              saveLocation();
            }}
          >
            {field('Location name', locName, setLocName, 'e.g. Home')}
            {field('Address', address, setAddress, 'Street address and city')}
            {select(
              'Utility',
              utility,
              ['BC Hydro', 'Other utility'],
              setUtility,
            )}
            <button type="submit" className="rp-primary">
              Save location
            </button>
            <button type="button" className="rp-secondary" onClick={back}>
              Cancel
            </button>
            {editingLocation && (
              <button
                type="button"
                className="rp-inline-link rp-danger"
                onClick={() => go('remove-location')}
              >
                Delete this location
              </button>
            )}
          </form>
        );
      case 'remove-location':
        return (
          <div className="rp-confirm">
            <MapPin size={44} />
            <h3>Delete {locName}?</h3>
            <p>
              This removes the location from this demo. Your sample devices
              remain available.
            </p>
            {primary('Delete location', () => {
              const remaining = locations.filter(
                (l) => l.id !== editingLocation,
              );
              setLocations(remaining);
              if (activeLocation === editingLocation)
                setActiveLocation(remaining[0]?.id ?? '');
              root('locations');
              setNotice('Location deleted.');
            })}
            {secondary('Keep location', back)}
          </div>
        );
      case 'notifications':
        return (
          <>
            <div className="rp-panel">
              <h3>Keep me informed</h3>
              {toggle('Push notifications', push, (v) => {
                setPush(v);
                setNotice('Notification preference saved.');
              })}
              {toggle('Email alerts', emailAlerts, (v) => {
                setEmailAlerts(v);
                setNotice('Email preference saved.');
              })}
            </div>
            <div className="rp-panel">
              <span className="rp-kicker">TODAY / SAMPLE EVENT</span>
              <h3>Reduce demand from 6–9 PM</h3>
              <p>
                Your target is an average of 3.5 kW. Check live energy or pause
                a device to explore the response.
              </p>
              {secondary('View live energy', () => {
                setPeriod('Live');
                root('home');
              })}
            </div>
            {secondary('Notification help', () => go('support'))}
          </>
        );
      case 'profile':
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!profileName.trim() || !/^\S+@\S+\.\S+$/.test(profileEmail)) {
                setError('Enter a name and a valid email address.');
                return;
              }
              setError('');
              setNotice('Profile updated for this demo session.');
            }}
            noValidate
          >
            <div className="rp-device-symbol">
              <UserRound size={40} />
            </div>
            {field('Your name', profileName, setProfileName)}
            {field('Email address', profileEmail, setProfileEmail, '', 'email')}
            <button type="submit" className="rp-primary">
              Save profile
            </button>
            <button type="button" className="rp-secondary" onClick={back}>
              Cancel
            </button>
            <p className="rp-footnote">
              Use sample information. Nothing is sent or stored outside this
              page.
            </p>
          </form>
        );
      case 'support':
        return (
          <>
            <div className="rp-panel">
              <h3>Where are my EAGLE codes?</h3>
              <p>
                The Cloud ID and install code are printed beside the barcode on
                the device and its box. In this demo, choose “Use sample
                details” to try the connection flow.
              </p>
              {secondary('Open connection setup', () => go('eagle-method'))}
            </div>
            <div className="rp-panel">
              <h3>Why charge later?</h3>
              <p>
                A schedule makes the timing explicit. The best time depends on
                your utility plan; this demo uses a sample 1 AM schedule.
              </p>
              {secondary('Set a charging schedule', () => {
                setSchedule(true);
                go('charging');
              })}
            </div>
            <div className="rp-panel">
              <h3>Is this live energy data?</h3>
              <p>
                No. This is an interactive design demonstration. Device changes,
                preferences, and profile edits remain in the current page
                session.
              </p>
            </div>
            {secondary('Return home', () => root('home'))}
          </>
        );
      case 'disconnect':
        return (
          <div className="rp-confirm">
            <Wifi size={44} />
            <h3>Disconnect your EAGLE?</h3>
            <p>
              The dashboard will return to its empty state. You can reconnect
              through setup.
            </p>
            {primary('Disconnect', () => {
              setConnected(false);
              root('home');
              setNotice('EAGLE disconnected.');
            })}
            {secondary('Stay connected', back)}
          </div>
        );
      case 'signed-out':
        return success(
          'You’re signed out.',
          'This is a local demo, so there is no account session to close. Restart to explore with fresh sample data.',
          'Restart demo',
          reset,
        );
    }
  }
  return (
    <div
      className={`rf-demo rf-working-demo ${screen === 'analytics' ? 'rp-desktop-layout' : ''} ${motionPaused ? 'rf-motion-paused' : ''} ${standalone ? 'rp-standalone' : ''}`}
    >
      <aside className="rf-demo-menu">
        <span className="rf-kicker">CHOOSE A JOURNEY</span>
        {journeys.map((j) => (
          <button
            key={j.id}
            onClick={() => begin(j.id, j.screen)}
            aria-pressed={journey === j.id}
          >
            {j.label}
            <ArrowUpRight size={16} />
          </button>
        ))}
        <p>
          Local interactive prototype.
          <br />
          Illustrative data. No hardware connection.
        </p>
        <div className="rp-demo-utilities">
          <button
            onClick={() => setMotionPaused((p) => !p)}
            aria-pressed={motionPaused}
          >
            {motionPaused ? <Play size={15} /> : <Pause size={15} />}{' '}
            {motionPaused ? 'Resume' : 'Pause'} motion
          </button>
          <button onClick={reset}>
            <RotateCcw size={15} /> Reset demo
          </button>
          {!standalone && (
            <Link href="/rainforest">
              Open full screen <ArrowUpRight size={15} />
            </Link>
          )}
        </div>
      </aside>
      <div
        className={`rp-app ${light ? 'rp-light' : ''} ${screen === 'analytics' ? 'rp-app-desktop' : ''}`}
      >
        {screen !== 'analytics' && (
          <div className="rp-status-bar">
            <span>9:41</span>
            <span>
              <Wifi size={13} />
              <span className="rp-battery" />
            </span>
          </div>
        )}
        <header className="rp-app-header">
          <button
            onClick={screen === 'home' ? () => go('locations') : back}
            aria-label={screen === 'home' ? 'Choose location' : 'Go back'}
          >
            {screen === 'home' ? <MapPin size={20} /> : <ArrowLeft size={20} />}
          </button>
          <h2 tabIndex={-1} ref={titleRef}>
            {screen === 'home'
              ? location?.name === 'Home'
                ? 'My house'
                : (location?.name ?? 'My house')
              : screen === 'device-detail'
                ? (selected?.name ?? 'Device')
                : screen === 'thermostat'
                  ? (thermostatDevice?.name ?? 'Thermostat')
                  : screenTitles[screen]}
          </h2>
          <button
            onClick={() => go(screen === 'home' ? 'notifications' : 'settings')}
            aria-label={screen === 'home' ? 'Notifications' : 'Settings'}
          >
            {screen === 'home' ? <Bell size={19} /> : <Settings size={19} />}
          </button>
        </header>
        <div className="rp-app-scroll" ref={scrollRef}>
          {error && (
            <div className="rp-error" role="alert">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          {notice && (
            <output className="rp-notice">
              <Check size={16} />
              {notice}
              <button
                onClick={() => setNotice('')}
                aria-label="Dismiss message"
              >
                <X size={14} />
              </button>
            </output>
          )}
          {/* Event handlers capture timer refs; no ref is read while rendering this content. */}
          {/* oxlint-disable-next-line react/react-compiler */}
          {content()}
        </div>
        <nav className="rp-bottom-nav" aria-label="Prototype navigation">
          <button
            aria-current={
              screen === 'home' || screen === 'devices' ? 'page' : undefined
            }
            onClick={() => root('home')}
          >
            <House size={20} />
            House
          </button>
          <button
            aria-current={screen === 'charging' ? 'page' : undefined}
            onClick={() => {
              setSelectedId(
                devices.find((d) => d.type === 'Wallbox Charger')?.id ??
                  'charger',
              );
              root('charging');
            }}
          >
            <Car size={20} />
            Car
          </button>
          <button
            aria-current={
              screen === 'settings' || screen === 'profile' ? 'page' : undefined
            }
            onClick={() => root('settings')}
          >
            <UserRound size={20} />
            Profile
          </button>
        </nav>
      </div>
      <aside className="rf-demo-context">
        <span className="rf-kicker">THE INTERACTION</span>
        <h3>{description[0]}</h3>
        <p>{description[1]}</p>
        <div className="rp-interaction-note">
          <span>
            <Check size={16} /> Real controls
          </span>
          <span>
            <Check size={16} /> Editable inputs
          </span>
          <span>
            <Check size={16} /> Back & recovery paths
          </span>
        </div>
        <p className="rp-demo-disclaimer">
          Changes are kept only while this page is open. Use Reset demo to start
          again.
        </p>
      </aside>
    </div>
  );
}
