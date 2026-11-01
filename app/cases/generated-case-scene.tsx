import './generated-scenes.css';

const scenes = {
  'affinity-agreements-engine': {
    title: 'From complexity to continuity.',
    label: 'AGREEMENTS WORKFLOW / PRODUCT DESIGN',
    alt: 'Illustrative agreements-workflow mockup on a desktop monitor in a navy and cobalt architectural workspace',
    caption: 'Art-directed concept artwork. The illustrative interface contains no client information.',
  },
  'usability-research': {
    title: 'Make room for better questions.',
    label: 'RESEARCH / A WORK IN PROGRESS',
    alt: 'Illustrative research synthesis on a tablet beside an interview notebook, cards and an hourglass in a sage studio',
    caption: 'Art-directed research concept. Illustrative synthesis, not participant data or reported findings.',
  },
} as const;

export function GeneratedCaseScene({slug}:{slug:string}) {
  if (!(slug in scenes)) return null;
  const scene = scenes[slug as keyof typeof scenes];
  return <figure className="generated-case-scene">
    <div className="generated-case-scene-heading"><span>{scene.label}</span><h2>{scene.title}</h2></div>
    <img src={`/images/covers/generated/${slug}.webp`} alt={scene.alt} width="1536" height="1024" loading="lazy" decoding="async"/>
    <figcaption>{scene.caption}</figcaption>
  </figure>;
}
