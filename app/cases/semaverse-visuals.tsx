'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  FileText,
  Folder,
  History,
  Search,
  Sparkles,
} from 'lucide-react';
const scenes = [
  {
    label: 'Gather the context',
    title: 'Healthcare SaaS',
    description: 'A focused collection of signals, context, and ideas.',
    message:
      'I’ll use your selected sources to build the first draft. You decide what belongs in the analysis.',
    tag: '03 SOURCES SELECTED',
  },
  {
    label: 'See the work',
    title: 'Investment Memo',
    description: 'Turning selected research into a structured point of view.',
    message:
      'Your research is connected. I’m structuring the analysis and identifying questions for further diligence.',
    tag: 'DRAFT IN PROGRESS',
  },
  {
    label: 'Own the decision',
    title: 'Investment Memo',
    description: 'European healthcare SaaS · Ready for your review',
    message:
      'The suggested edit is ready. Review the change before applying it. Your previous version is preserved.',
    tag: 'READY TO REVIEW',
  },
];
export function SemaverseShowcase() {
  const [scene, setScene] = useState(2);
  const s = scenes[scene];
  return (
    <div className="sc-showcase">
      <div className="sc-stage-caption">
        <span>
          <i /> ONE CONNECTED WORKSPACE
        </span>
        <span>RESEARCH → REASONING → REVIEW</span>
      </div>
      <div
        className="sc-screen"
        aria-label="Interactive illustration of three Semaverse workflow stages"
      >
        <aside className="sc-screen-sidebar">
          <div className="sc-screen-brand">
            <Image
              src="/images/semaverse/logo.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
            />
            <b>Semaverse</b>
          </div>
          <span className="sc-screen-create">＋ Create document</span>
          <small>WORKSPACE</small>
          <span>
            <Folder size={14} /> Collections
          </span>
          <span>
            <Bookmark size={14} /> Saved items
          </span>
          <span className="sc-screen-active">
            <FileText size={14} />{' '}
            {scene === 0 ? 'Research' : 'Investment memo'}
          </span>
          <small>MY COLLECTIONS</small>
          <span>
            <Folder size={14} /> Healthcare SaaS
          </span>
          <span>
            <Folder size={14} /> Technology
          </span>
          <div className="sc-screen-user">
            <b>M</b>
            <span>
              Marianna’s workspace<small>Personal collection</small>
            </span>
          </div>
        </aside>
        <div className="sc-screen-main">
          <div className="sc-screen-crumb">
            Workspace <ChevronRight size={12} /> Healthcare SaaS{' '}
            <span>
              <Check size={12} /> Saved
            </span>
          </div>
          <div className="sc-screen-page" key={scene}>
            <div className="sc-screen-eyebrow">{s.tag}</div>
            <h3>{s.title}</h3>
            <p className="sc-screen-subtitle">{s.description}</p>
            {scene === 0 ? (
              <div className="sc-screen-sources">
                {[
                  'The next chapter of European healthcare software',
                  'Healthcare SaaS: what makes growth durable?',
                  'AI in clinical workflows: opportunity and friction',
                ].map((t, i) => (
                  <div key={t}>
                    <span className="sc-screen-check">
                      <Check size={12} />
                    </span>
                    <div>
                      <small>RESEARCH NOTE / 0{i + 1}</small>
                      <strong>{t}</strong>
                      <p>Selected for the investment thesis.</p>
                    </div>
                    <Bookmark size={15} />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="sc-screen-toc">
                  <span>TABLE OF CONTENTS</span>
                  <span>6 sections ↓</span>
                </div>
                <h4>Executive summary</h4>
                <p>
                  Essential workflow software. Durable customer relationships. A
                  repeatable route to market.
                </p>
                <h4>Market overview</h4>
                <p>
                  European healthcare software spans clinical workflows, patient
                  engagement, and administrative operations.
                </p>
                <div
                  className={`sc-screen-change ${scene === 1 ? 'sc-generating' : ''}`}
                >
                  <div>
                    <Sparkles size={14} />
                    <span>
                      {scene === 1
                        ? 'Building the analysis'
                        : 'Suggested refinement'}
                    </span>
                  </div>
                  <h4>Competitive landscape</h4>
                  <p>
                    Compare focused workflow specialists with broad platforms.
                    Validate differentiation through customer evidence and
                    integration depth.
                  </p>
                  <span className="sc-screen-citation">
                    <FileText size={11} /> 3 connected sources
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <aside className="sc-screen-archer">
          <div className="sc-screen-archer-title">
            <Sparkles size={16} />
            <b>Archer Assistant</b>
          </div>
          <div className="sc-screen-chat" key={scene}>
            <small>ARCHER</small>
            <p>{s.message}</p>
          </div>
          <div className="sc-screen-task">
            <div>
              <Check size={13} /> Selected context
            </div>
            <div>
              {scene === 0 ? (
                <span className="sc-status-dot" />
              ) : (
                <Check size={13} />
              )}{' '}
              Structured analysis
            </div>
            <div>
              {scene === 2 ? (
                <Check size={13} />
              ) : (
                <span className="sc-status-dot" />
              )}{' '}
              Human review
            </div>
          </div>
          <div className="sc-screen-history">
            <History size={18} />
            <b>Every change has a way back.</b>
            <span>Previous versions stay connected to the document.</span>
          </div>
          <div className="sc-screen-input">
            Ask Archer to refine your draft…
            <span>
              Send to Archer <ArrowRight size={13} />
            </span>
          </div>
        </aside>
      </div>
      <div
        className="sc-scene-controls"
        aria-label="Explore the workflow illustration"
      >
        {scenes.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setScene(i)}
            className={scene === i ? 'active' : ''}
            aria-pressed={scene === i}
          >
            <span>0{i + 1}</span>
            {s.label}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <p className="sc-stage-note">
        Interactive reconstruction with illustrative content. Choose a stage to
        explore.
      </p>
    </div>
  );
}
export function SemaverseReview() {
  const [applied, setApplied] = useState(false);
  return (
    <div className="sc-review">
      <div className="sc-review-top">
        <span>
          <Sparkles size={16} /> Archer’s suggestion
        </span>
        <span className={applied ? 'sc-review-saved' : ''}>
          {applied ? 'Applied · Version 2' : 'Awaiting your review'}
        </span>
      </div>
      <div className="sc-review-copy">
        <span className="sc-review-overline">EXECUTIVE SUMMARY</span>
        <p className={applied ? 'sc-old sc-old-hidden' : 'sc-old'}>
          The sector presents a number of potential opportunities for investors
          to consider.
        </p>
        <p className="sc-new">
          Focus on essential workflow software with durable retention and a
          repeatable route to market.
        </p>
        <div className="sc-review-source">
          <FileText size={14} /> Grounded in 3 selected sources
        </div>
      </div>
      <div className="sc-review-bottom">
        <span aria-live="polite">
          {applied ? (
            <>
              <Check size={15} /> Previous version preserved
            </>
          ) : (
            <>
              <History size={15} /> Your current draft is unchanged
            </>
          )}
        </span>
        <button onClick={() => setApplied(!applied)}>
          {applied ? 'Undo change' : 'Apply this edit'}
          {applied ? <History size={16} /> : <Check size={16} />}
        </button>
      </div>
      <small className="sc-review-note">
        Try applying the example edit, then undo it.
      </small>
    </div>
  );
}
export function SemaverseLifecycle() {
  const [step, setStep] = useState(0);
  const states = [
    {
      name: 'Selected',
      detail: 'The chosen sources define the scope of the work.',
      icon: Search,
    },
    {
      name: 'Processing',
      detail: 'Visible progress explains what the system is doing.',
      icon: Sparkles,
    },
    {
      name: 'Review',
      detail: 'Suggestions wait for a person to accept them.',
      icon: FileText,
    },
    {
      name: 'Saved',
      detail: 'The document is saved with a recoverable history.',
      icon: Check,
    },
  ];
  const Icon = states[step].icon;
  return (
    <div className="sc-lifecycle">
      <div className="sc-state-tabs">
        {states.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setStep(i)}
            className={step === i ? 'active' : ''}
            aria-pressed={step === i}
          >
            <span>0{i + 1}</span>
            {s.name}
          </button>
        ))}
      </div>
      <div className="sc-state-detail" key={step}>
        <span className="sc-state-icon">
          <Icon size={29} />
        </span>
        <div>
          <span>DOCUMENT STATE / 0{step + 1}</span>
          <h3>{states[step].name}</h3>
          <p>{states[step].detail}</p>
        </div>
      </div>
    </div>
  );
}
