export const periods = ['Live', 'Day', 'Week', 'Month', 'Year'] as const;
export type Period = (typeof periods)[number];
export type DeviceType =
  | 'Thermostat'
  | 'Smart Plug'
  | 'Washing Machine'
  | 'Wallbox Charger';
export interface Device {
  id: string;
  type: DeviceType;
  name: string;
  manufacturer: string;
  model: string;
  on: boolean;
  appliance?: string;
  mode?: string;
  target?: number;
}
export interface Location {
  id: string;
  name: string;
  address: string;
  utility: string;
}
export const initialDevices: Device[] = [
  {
    id: 'thermostat',
    type: 'Thermostat',
    name: 'Zen Thermostat',
    manufacturer: 'Zen',
    model: 'Zen',
    on: false,
  },
  {
    id: 'charger',
    type: 'Wallbox Charger',
    name: 'Wallbox Charger',
    manufacturer: 'Wallbox',
    model: 'Pulsar',
    on: true,
  },
  {
    id: 'plug',
    type: 'Smart Plug',
    name: 'Water heater',
    manufacturer: 'Samsung',
    model: 'GP-WOU019BBEWA',
    on: true,
    appliance: 'Water Heater',
  },
  {
    id: 'washer',
    type: 'Washing Machine',
    name: 'Washing Machine',
    manufacturer: 'Samsung',
    model: 'WW9800T',
    on: true,
  },
];
export const manufacturers: Record<DeviceType, Record<string, string[]>> = {
  Thermostat: { Zen: ['Zen'], Google: ['Nest'] },
  'Smart Plug': { Samsung: ['GP-WOU019BBEWA'], 'TP-Link': ['Tapo P110'] },
  'Washing Machine': {
    Samsung: ['WW9800T', 'WW90T554DAE'],
    LG: ['ThinQ F4V9'],
  },
  'Wallbox Charger': { Wallbox: ['Pulsar'], Tesla: ['Wall Connector'] },
};
export const periodUsage: Record<Period, number[]> = {
  Live: [3.1, 3.8, 3.4, 4.2, 4.7, 4.1, 3.7, 3.5, 3.9, 4.3, 4.2, 4.332],
  Day: [0.8, 0.6, 0.5, 1.6, 2.8, 1.9, 1.2, 1.7, 3.8, 2.6, 1.6, 1.1],
  Week: [48, 62, 81, 56, 72, 43, 71.7],
  Month: [180, 235, 211, 199, 161.4],
  Year: [780, 740, 820, 890, 1020, 1100, 1240, 1160, 1010, 950, 1016, 1110],
};
export const periodLabels: Record<Period, string[]> = {
  Live: ['−15m', '', '', '', '', '', '', '', '', '', '', 'Now'],
  Day: ['00', '', '04', '', '08', '', '12', '', '16', '', '20', '24'],
  Week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  Month: ['1–6', '7–12', '13–18', '19–24', '25–30'],
  Year: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
};
export function sumUsage(period: Period) {
  return periodUsage[period].reduce((a, b) => a + b, 0);
}
export function validateEagle(cloudId: string, installCode: string) {
  if (!/^[a-z0-9]{6}$/i.test(cloudId.trim()))
    return 'Enter the 6-character Cloud ID printed on your EAGLE.';
  if (installCode.trim().length < 8)
    return 'Enter the install code from the device label (at least 8 characters).';
  return '';
}
export function validateLocation(name: string, address: string) {
  return !name.trim()
    ? 'Give this location a name.'
    : address.trim().length < 5
      ? 'Enter a complete address.'
      : '';
}
export function nextModel(type: DeviceType, manufacturer: string) {
  return manufacturers[type][manufacturer]?.[0] ?? '';
}
export function energyCsv(period: Period, rate: number) {
  return (
    'Period,Energy (kWh),Cost (USD)\n' +
    periodUsage[period]
      .map(
        (v, i) =>
          `${periodLabels[period][i] || i + 1},${v.toFixed(3)},${(v * rate).toFixed(2)}`,
      )
      .join('\n')
  );
}
export type Screen =
  | 'home'
  | 'devices'
  | 'eagle-method'
  | 'eagle-scan'
  | 'eagle-manual'
  | 'eagle-success'
  | 'device-add'
  | 'device-detail'
  | 'device-success'
  | 'thermostat'
  | 'charging'
  | 'settings'
  | 'locations'
  | 'location-edit'
  | 'notifications'
  | 'support'
  | 'profile'
  | 'remove-device'
  | 'remove-location'
  | 'disconnect'
  | 'analytics'
  | 'signed-out';
export interface NavState {
  screen: Screen;
  history: Screen[];
}
export type NavAction =
  | { type: 'go'; screen: Screen }
  | { type: 'back' }
  | { type: 'root'; screen: Screen };
export function navigation(state: NavState, action: NavAction): NavState {
  if (action.type === 'root') return { screen: action.screen, history: [] };
  if (action.type === 'back')
    return {
      screen: state.history.at(-1) ?? 'home',
      history: state.history.slice(0, -1),
    };
  if (action.screen === state.screen) return state;
  return { screen: action.screen, history: [...state.history, state.screen] };
}
export const journeys = [
  { id: 'energy', label: 'Live energy', screen: 'home' },
  { id: 'connect', label: 'Connect an EAGLE', screen: 'eagle-method' },
  { id: 'devices', label: 'Add & control devices', screen: 'devices' },
  { id: 'thermostat', label: 'Thermostat', screen: 'thermostat' },
  { id: 'charging', label: 'Car charging', screen: 'charging' },
  { id: 'settings', label: 'Locations & settings', screen: 'settings' },
  { id: 'analytics', label: 'Desktop analytics', screen: 'analytics' },
  { id: 'recovery', label: 'Connection recovery', screen: 'eagle-manual' },
] as const;
