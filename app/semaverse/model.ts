export type Section = {
  id: string;
  title: string;
  body: string;
  sourceIds: number[];
};
export type Doc = {
  id: string;
  title: string;
  template: string;
  sections: Section[];
  revisions: { label: string; sections: Section[] }[];
};
export type Source = {
  id: number;
  title: string;
  category: string;
  publisher: string;
  summary: string;
  body: string;
};
export const sources: Source[] = [
  {
    id: 1,
    title: 'The next chapter of European healthcare software',
    category: 'Healthcare',
    publisher: 'Sector research · Sample brief',
    summary:
      'Clinical workflows, patient engagement, and fragmented systems create room for focused software businesses.',
    body: 'This illustrative research brief maps three opportunities: reducing administrative work, connecting fragmented clinical systems, and improving the patient experience. Buyers value integration with existing workflows and measurable time savings. The investment question is whether a product becomes essential enough to retain customers through long procurement cycles.',
  },
  {
    id: 2,
    title: 'Healthcare SaaS: what makes growth durable?',
    category: 'Healthcare',
    publisher: 'Investment team · Sample analysis',
    summary:
      'Retention, implementation costs, and repeatable distribution matter more than headline growth.',
    body: 'Evaluate recurring revenue quality alongside gross retention, customer concentration, and implementation effort. Ask for cohort-level evidence, customer references, and a clear split between subscription revenue and services. A promising thesis needs a credible route from successful pilots to repeatable deployments.',
  },
  {
    id: 3,
    title: 'AI in clinical workflows: opportunity and friction',
    category: 'Healthcare',
    publisher: 'Research desk · Sample note',
    summary:
      'Documentation and workflow assistance offer practical entry points, with human review built in.',
    body: 'The sample research focuses on administrative assistance and documentation. Adoption depends on reliability, transparent human review, data handling, and fit with everyday clinical routines. Diligence should distinguish tested product capabilities from roadmap promises and identify the cost of maintaining quality.',
  },
  {
    id: 4,
    title: 'AI agents move from answers to actions',
    category: 'Technology',
    publisher: 'Technology desk · Sample brief',
    summary:
      'The next generation of tools coordinates research, software, and repeatable business tasks.',
    body: 'Agent workflows connect information retrieval with actions. Teams need visibility into progress, permission boundaries, and reversible changes. The strongest experiences expose intermediate work so people can check evidence and refine direction before committing to a result.',
  },
  {
    id: 5,
    title: 'A practical framework for enterprise AI adoption',
    category: 'Technology',
    publisher: 'Research desk · Sample note',
    summary:
      'Start with a measurable workflow, reliable information, and a clear owner.',
    body: 'This sample framework evaluates workflow fit, information quality, human oversight, and measurable value. Select a bounded task, establish a baseline, and measure time saved alongside error rates. Escalation and undo paths belong in the core experience.',
  },
  {
    id: 6,
    title: 'Clean energy software and the operating layer',
    category: 'Green energy',
    publisher: 'Sector research · Sample brief',
    summary:
      'Asset monitoring and maintenance planning connect energy infrastructure to operational decisions.',
    body: 'Illustrative opportunities include asset monitoring, maintenance scheduling, and energy forecasting. Diligence should test integration costs, data availability, sales cycles, and customer concentration. Recurring software revenue must be separated from hardware and implementation services.',
  },
];
export const templates = [
  'Investment Memo',
  'Investment Thesis',
  'Sector Analysis',
  'Target List',
];
export function makeDocument(
  title: string,
  template: string,
  ids: number[],
): Doc {
  const selected = sources.filter((s) => ids.includes(s.id));
  const healthcare = selected.some((s) => s.category === 'Healthcare');
  const topic = healthcare
    ? 'European healthcare SaaS'
    : selected[0]?.category.toLowerCase() || 'the selected sector';
  const content: [string, string][] =
    template === 'Target List'
      ? [
          [
            'Screening criteria',
            `Find businesses in ${topic} with recurring revenue, repeatable deployment, and evidence of strong customer retention.`,
          ],
          [
            'Priority profiles',
            'Workflow specialist — deeply embedded in a daily task.\nInfrastructure provider — connects existing systems.\nVertical platform — serves a focused customer segment.',
          ],
          [
            'Next steps',
            'Build a verified company list, request cohort data, and schedule customer reference calls. Company names are intentionally left for verified research.',
          ],
        ]
      : [
          [
            'Executive summary',
            `Explore ${topic} through a focused, evidence-led investment lens. The opportunity is to back essential workflow software with durable retention and a repeatable route to market. This draft uses the selected sample research and identifies questions for further diligence.`,
          ],
          [
            'Market overview',
            healthcare
              ? 'European healthcare software spans clinical workflows, patient engagement, and administrative operations. Fragmented systems create demand for tools that reduce manual work and fit into established care delivery. Validate market size and growth against current primary sources before an investment decision.'
              : `The ${topic} landscape rewards products that solve a measurable operational problem. Assess buyer needs, competitive alternatives, and the cost of adopting a new tool. Validate market estimates independently.`,
          ],
          [
            'Why invest',
            'A product embedded in a recurring workflow can build durable customer relationships. Favor measurable time savings, a clear economic buyer, and implementation that becomes more repeatable as the business scales.',
          ],
          [
            'Competitive landscape',
            'Compare focused workflow specialists with broad platforms and existing in-house processes. Evaluate differentiation through customer references, integration depth, and evidence of switching costs. A feature comparison alone does not establish a defensible advantage.',
          ],
          [
            'Risks and open questions',
            'Long procurement cycles may delay revenue. Implementation services can dilute margins. Customer concentration and reliance on third-party systems require scrutiny. Request retention cohorts, deployment timelines, and a clear account of product limitations.',
          ],
          [
            'Recommended next steps',
            '1. Validate the market thesis with primary research.\n2. Interview three prospective customers.\n3. Review revenue quality and retention cohorts.\n4. Compare integration effort across shortlisted products.\n5. Revisit the thesis with the investment team.',
          ],
        ];
  return {
    id: `doc-${Date.now()}`,
    title,
    template,
    sections: content.map(([name, body], i) => ({
      id: `s-${i}`,
      title: name,
      body,
      sourceIds: selected.slice(0, 3).map((s) => s.id),
    })),
    revisions: [],
  };
}
export function revise(doc: Doc, sections: Section[], label: string): Doc {
  return {
    ...doc,
    sections,
    revisions: [{ label, sections: doc.sections }, ...doc.revisions].slice(
      0,
      12,
    ),
  };
}
export function assistantChange(doc: Doc, prompt: string): Section[] {
  const p = prompt.toLowerCase();
  let index = doc.sections.findIndex((s) =>
    p.includes(s.title.toLowerCase().split(' ')[0]),
  );
  if (index < 0)
    index = /risk/.test(p)
      ? doc.sections.findIndex((s) => s.title.includes('Risks'))
      : 0;
  const n = Math.max(0, index);
  return doc.sections.map((s, i) =>
    i !== n
      ? s
      : {
          ...s,
          body: /short|concise|summari/.test(p)
            ? s.body.split('. ').slice(0, 2).join('. ').replace(/\.$/, '') + '.'
            : /compet/.test(p)
              ? 'The landscape includes vertical workflow specialists, broad enterprise platforms, and internal tools. Compare them on implementation time, workflow coverage, retention, and customer-verified outcomes. The next diligence step is to validate a company shortlist using primary sources.'
              : s.body +
                '\n\nDiligence focus: ' +
                prompt.trim().replace(/[.!?]+$/, '') +
                '. Confirm the assumptions with customer evidence and current primary research.',
        },
  );
}
export function downloadText(doc: Doc) {
  return (
    `# ${doc.title}\n\nPortfolio demonstration — illustrative content.\n\n` +
    doc.sections
      .map(
        (s) =>
          `## ${s.title}\n\n${s.body}\n\nSources: ${s.sourceIds
            .map((id) => sources.find((s) => s.id === id)?.title)
            .filter(Boolean)
            .join('; ')}`,
      )
      .join('\n\n')
  );
}
