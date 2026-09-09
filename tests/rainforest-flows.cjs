// Exercise actual component handlers with a small hook harness; no browser or hardware.
const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript');
const compile=p=>ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const domain={exports:{}};new Function('exports',compile('app/cases/rainforest-model.ts'))(domain.exports);
const m=domain.exports;let state=[],cursor=0,tree,timers=new Map(),timerId=0;
const hooks={useState(initial){let i=cursor++;if(!(i in state))state[i]=initial;return[state[i],v=>state[i]=typeof v==='function'?v(state[i]):v]},useReducer(reducer,initial){const [value,set]=this.useState(initial);return[value,action=>set(v=>reducer(v,action))]},useRef(initial){let i=cursor++;return state[i]??(state[i]={current:initial})},useEffect(){},useId(){return'id'}};
hooks.useReducer=hooks.useReducer.bind(hooks);
const jsx=(type,props)=>({type,props:props||{}}),out={exports:{}};
new Function('require','exports','setTimeout','clearTimeout',compile('app/cases/rainforest-demo.tsx'))(id=>id==='react'?hooks:id==='react/jsx-runtime'?{jsx,jsxs:jsx,Fragment:'fragment'}:id.includes('rainforest-model')?m:id.includes('/input')?{Input:'input'}:id.includes('/switch')?{Switch:'switch'}:id.includes('/tabs')?{Tabs:'tabs',TabsList:'tablist',TabsTrigger:'tab',TabsContent:'tabpanel'}:new Proxy({},{get:(_,k)=>k}),out.exports,fn=>{timers.set(++timerId,fn);return timerId},id=>timers.delete(id));
function render(){cursor=0;tree=out.exports.RainforestDemo({});return tree}
function nodes(n=tree){return !n?[]:Array.isArray(n)?n.flatMap(nodes):typeof n==='object'?[n,...nodes(n.props?.children??null)]:[]}
function text(n=tree){return n==null||typeof n==='boolean'?'':Array.isArray(n)?n.map(text).join(''):typeof n==='object'?text(n.props?.children??null):String(n)}
function find(type,label){const n=nodes().find(n=>n.type===type&&(text(n).trim()===label||n.props['aria-label']===label));assert(n,`Missing ${type}: ${label}`);return n}
function click(label){const n=find('button',label);assert(!n.props.disabled);n.props.onClick();render()}
function input(label,value){const l=nodes().find(n=>n.type==='label'&&text(n).startsWith(label));assert(l,label);nodes(l).find(n=>['input','select'].includes(n.type)).props.onChange({target:{value}});render()}
function submit(){nodes().find(n=>n.type==='form').props.onSubmit({preventDefault(){}});render()}
function contains(s){assert(text().includes(s),`Missing content: ${s}`)}
function toggle(label,value){find('switch',label).props.onCheckedChange(value);render()}
function tick(){const callbacks=[...timers.values()];timers.clear();callbacks.forEach(f=>f());render()}
function heading(s){assert.equal(text(nodes().find(n=>n.type==='h2')),s)}
render();heading('My house');click('Choose location');heading('My locations');click('Go back');heading('My house');
click('Connect an EAGLE');click('Scan barcode');click('Simulate detection of the EAGLE barcode');heading('Manual entry');submit();contains('Connecting');tick();heading('EAGLE connected');click('See energy usage');heading('My house');
click('Connection recovery');submit();tick();contains('We couldn’t reach');assert.equal(nodes().find(n=>n.type==='input').props.value,'00bb20');submit();tick();heading('EAGLE connected');
click('Connect an EAGLE');click('Enter details manually');submit();contains('6-character Cloud ID');click('Use sample details');submit();click('House');tick();heading('My house'); // stale timer must not redirect
click('Add & control devices');click('Add new');submit();contains('Give this device a name');input('Device type','Smart Plug');input('Manufacturer','TP-Link');input('Device name','Desk lamp');input('What’s plugged in?','Other');submit();heading('Device added');click('Open device');heading('Desk lamp');toggle('Device power',false);contains('0.0');input('Device name','Reading lamp');click('Save changes');heading('Reading lamp');click('Remove device');click('Keep device');heading('Reading lamp');click('Remove device');click('Remove device');heading('My devices');assert(!text().includes('Reading lamp'));
click('Thermostat');nodes().find(n=>n.type==='tabs').props.onValueChange('Heat');render();contains('Heating to');click('Increase target temperature');contains('71°');click('Edit device details');click('Remove device');click('Remove device');click('Thermostat');contains('No thermostat connected');click('Add a device');heading('Add a device');click('Cancel');
click('Car charging');click('Pause charging');contains('Charging paused');toggle('Scheduled charging',true);input('Start time','02:30');click('Save schedule');contains('02:30');click('Resume charging');contains('Car is charging');click('Edit device details');click('Remove device');click('Remove device');click('Car');contains('No charger connected');
click('Locations & settings');click('My locations');click('Add new');submit();contains('Give this location a name');input('Location name','Studio');input('Address','123 Main Street');submit();contains('Studio');click('House');heading('Studio');
click('Profile');click('Notifications');toggle('Push notifications',false);contains('preference saved');click('Go back');click('Edit profile');input('Email address','bad');submit();contains('valid email');input('Email address','sample@example.com');submit();contains('Profile updated');
click('Desktop analytics');toggle('Compare periods',true);input('Compare to','Custom range');input('From','2026-09-10');input('To','2026-09-01');contains('end date must');input('To','2026-09-20');assert(!text().includes('end date must'));toggle('Cost overlay',true);contains('Estimated cost');
click('Reset demo');heading('My house');contains('9.632');click('Pause motion');contains('Resume motion');
for(const p of m.periods){assert.equal(m.periodUsage[p].length,m.periodLabels[p].length);assert.equal(m.energyCsv(p,.12).split('\n').length,m.periodUsage[p].length+1)}
assert(m.validateEagle('x','short'));assert.equal(m.validateEagle('00bb20','126627-373839-smck93'),'');assert(m.validateLocation('',''));assert.equal(m.validateLocation('Home','123 Main Street'),'');
for(const j of m.journeys){let n=m.navigation({screen:'home',history:[]},{type:'go',screen:j.screen});n=m.navigation(n,{type:'back'});assert.equal(n.screen,'home')}
console.log('PASS: 8 journeys, connection recovery/cancellation, device CRUD and independent state, thermostat/charger empty states, location/profile validation, analytics, reset and navigation.');
