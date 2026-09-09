// Exercise the component's actual handlers without a browser or external accounts.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = fs.readFileSync('app/cases/coinflix-demo.tsx', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
let state = [],
  cursor = 0,
  tree;
const effects = [];
const hooks = {
  useState(initial) {
    const i = cursor++;
    if (!(i in state)) state[i] = initial;
    return [
      state[i],
      (v) => {
        state[i] = typeof v === 'function' ? v(state[i]) : v;
      },
    ];
  },
  useRef(initial) {
    const i = cursor++;
    if (!(i in state)) state[i] = { current: initial };
    return state[i];
  },
  useEffect(fn) {
    effects.push(fn);
  },
};
const jsx = (type, props) => ({ type, props: props || {} });
const output = { exports: {} };
new Function('require', 'module', 'exports', compiled)(
  (id) =>
    id === 'react'
      ? hooks
      : id === 'react/jsx-runtime'
        ? { jsx, jsxs: jsx, Fragment: 'fragment' }
        : id === 'lucide-react'
          ? new Proxy({}, { get: (_, key) => key })
          : {},
  output,
  output.exports,
);
function render() {
  effects.length = 0;
  cursor = 0;
  tree = output.exports.CoinflixDemo();
  return tree;
}
function nodes(node = tree) {
  if (!node) return [];
  if (Array.isArray(node)) return node.flatMap((n) => nodes(n));
  if (typeof node !== 'object') return [];
  return [node, ...nodes(node.props?.children ?? null)];
}
function text(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (Array.isArray(node)) return node.map(text).join('');
  if (typeof node !== 'object') return String(node);
  return text(node.props?.children);
}
function find(type, label) {
  const matches = nodes().filter(
    (n) =>
      n.type === type &&
      (text(n).trim() === label.trim() || n.props['aria-label'] === label),
  );
  assert(matches.length, `Missing ${type}: ${label}`);
  return matches[0];
}
function click(label) {
  const button = find('button', label);
  assert(!button.props.disabled, `Disabled: ${label}`);
  button.props.onClick();
  render();
}
function heading(label) {
  assert(
    nodes().some((n) => n.type === 'h4' && text(n) === label),
    `Expected screen ${label}`,
  );
}
function input(label, value) {
  const l = nodes().find(
    (n) => n.type === 'label' && text(n).startsWith(label),
  );
  assert(l, `Missing label: ${label}`);
  const field = nodes(l).find((n) =>
    ['input', 'textarea', 'select'].includes(n.type),
  );
  field.props.onChange({ target: { value } });
  render();
}
function submit() {
  const form = nodes().find((n) => n.type === 'form');
  assert(form, 'Missing form');
  form.props.onSubmit({ preventDefault() {} });
  render();
}
function contains(value) {
  assert(text(tree).includes(value), `Missing content: ${value}`);
}
render();
heading('Discover');
click('Search stories and creators');
input('Find something good', 'nothing-matches');
contains('No stories found');
click('Show all stories');
contains('After Hours');
click('Return to discovery');
const story = nodes().find(
  (n) => n.type === 'button' && n.props.className === 'cd-story',
);
story.props.onClick();
render();
heading('Now playing');
click('Save');
click('128');
contains('129');

click('2');
heading('Conversation');
input('Join the conversation', 'Love this story.');
submit();
contains('Love this story.');
click('Back to the episode');
click('View all 3 episodes');
heading('Episodes');
const eps = nodes().filter(
  (n) => n.type === 'button' && n.props.className === 'cd-list-item',
);
eps[2].props.onClick();
render();
heading('Now playing');
click('Watch the series again');
contains('The city wakes up');
click('Create');
heading('Create a story');
assert(find('button', 'Continue to details ').props.disabled);
click('Use sample clip');
click('Continue to details ');
input('Video title', 'My test story');
input('Publish as', 'New series');
input('Series name', 'My series');
submit();
heading('Review & publish');
contains('My series');
click('Edit details');
input('Publish as', 'Episode in a series');
submit();
heading('Review & publish');
contains('After Hours');
click('Publish demo story');
heading('Published');
click('View my profile');
heading('Your profile');
contains('My test story');
const own = nodes().find(
  (n) => n.type === 'button' && text(n).includes('Play your demo story'),
);
own.props.onClick();
render();
heading('Now playing');
contains('My test story');
assert(!text(tree).includes('View all 3 episodes'));
click('Back to my stories');
click('Edit profile');
input('Display name', '');
submit();
contains('Please add a display name.');
input('Display name', 'Taylor');
submit();
heading('Your profile');
contains('Taylor');
click('Edit profile');
input('Display name', 'Discarded');
click('Cancel changes');
contains('Taylor');
assert(!text(tree).includes('Discarded'));
click('Wallet');
click('Connect demo wallet');
click('Support a creator');
input('Demo credits', '999');
submit();
contains('Not enough demo credits.');
click('Add 100 free demo credits');
input('Demo credits', '10');
submit();
heading('Support sent');
contains('210');
click('View wallet activity');
contains('Support sent');
click('Support a creator');
click('Cancel · back to wallet');
heading('Your wallet');
click('Profile');
click('Settings');
click('Try demo sign-in');
click('Try account recovery');
click('Restore demo session');
heading('Your profile');
click('Settings');
click('Sign out of demo');
heading('Your profile');
click('Create');
click('Use sample clip');
click('Continue to details ');
input('Video title', 'Preserved draft');
click('Discover');
click('Create');
click('Continue to details ');
assert.equal(
  nodes().find((n) => n.type === 'input' && n.props.maxLength === 60).props
    .value,
  'Preserved draft',
);
// All reachable screens provide persistent discovery and five navigation destinations.
for (const destination of [
  'Discover',
  'Search',
  'Create',
  'Wallet',
  'Profile',
]) {
  click(destination);
  assert(find('button', 'Return to discovery'));
}
click('Reset demo');
heading('Discover');
click('Profile');
contains('Jamie Lee');
contains('Your first story starts here.');
click('Wallet');
contains('Connect demo wallet');
click('Create');
click('Use sample clip');
click('Continue to details ');
input('Video title', 'Single story');
submit();
contains('Single video');
click('Publish demo story');
click('View my profile');
contains('Single story');
console.log(
  'PASS: discovery/search recovery; likes/save/comments; series replay; three publishing formats; published playback; profile validation/cancel; wallet recovery/support/cancel; account recovery; persistent drafts; navigation and reset.',
);

function tick(delay) {
  const original = global.setTimeout;
  const timers = [];
  global.setTimeout = (fn, ms) => {
    timers.push({ fn, ms });
    return 0;
  };
  try {
    for (const effect of effects) effect();
  } finally {
    global.setTimeout = original;
  }
  const timer = timers.find((t) => t.ms === delay);
  assert(timer, `Missing timer ${delay}`);
  timer.fn();
  render();
}
click('Reset demo');
click('Watch a quick walkthrough');
heading('Discover');
for (const label of [
  'Now playing',
  'Episodes',
  'Creator',
  'Create a story',
  'Video details',
  'Review & publish',
  'Published',
  'Your wallet',
]) {
  tick(3400);
  heading(label);
}
contains('Tour complete.');
click('Watch a quick walkthrough');
tick(3400);
click('Take control');
heading('Now playing');
assert(!text(tree).includes('Guided walkthrough'));
click('Play episode');
for (let i = 0; i < 50; i++) tick(400);
contains('Episode complete');
click('Replay episode');
tick(400);
assert(!text(tree).includes('Episode complete'));
click('Profile');
click('Settings');
const autoplay = nodes().find(
  (n) => n.type === 'input' && n.props.id === 'cd-autoplay',
);
autoplay.props.onChange({ target: { checked: true } });
render();
click('Discover');
click('Watch After Hours');
for (let i = 0; i < 50; i++) tick(400);
contains('A different way home');
console.log(
  'PASS: walkthrough completes all nine steps; take-control exits tour; playback completes/replays; autoplay advances episodes.',
);

// Publishing is validated at its action boundary, even after tour navigation.
click('Reset demo');
click('Create');
click('Use sample clip');
click('Continue to details ');
input('Video title', '   ');
click('Watch a quick walkthrough');
for (let i = 0; i < 6; i++) tick(3400);
heading('Review & publish');
click('Publish demo story');
heading('Video details');
contains('Add a video title');
// Keyboard interaction cancels the tour before its timer can replace the screen.
click('Watch a quick walkthrough');
for (let i = 0; i < 5; i++) tick(3400);
heading('Video details');
const content = nodes().find((n) => n.props.className === 'cd-content');
content.props.onKeyDownCapture();
render();
assert(!text(tree).includes('Guided walkthrough'));
input('Video title', 'Saved snapshot');
input('Description', 'Original description');
submit();
click('Publish demo story');
click('Go back');
heading('Review & publish');
click('Publish demo story');
click('View my profile');
assert.equal(
  nodes().filter(
    (n) => n.type === 'button' && text(n).includes('Play your demo story'),
  ).length,
  1,
  'Same draft must not publish twice',
);
click('Create');
click('Use sample clip');
click('Continue to details ');
input('Video title', 'Second draft');
input('Description', 'Changed description');
click('Profile');
nodes()
  .find((n) => n.type === 'button' && text(n).includes('Play your demo story'))
  .props.onClick();
render();
contains('Original description');
assert(!text(tree).includes('Changed description'));
click('Create');
click('Continue to details ');
submit();
click('Publish demo story');
click('View my profile');
assert.equal(
  nodes().filter(
    (n) => n.type === 'button' && text(n).includes('Play your demo story'),
  ).length,
  2,
  'A new draft must publish independently',
);
console.log(
  'PASS: publish validation after tour; keyboard takeover; idempotent draft publishing; immutable story details; independent new drafts.',
);
