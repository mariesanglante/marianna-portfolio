import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  FileText,
  Folder,
  History,
  Sparkles,
} from 'lucide-react';
import { CaseHeader, CaseFooter } from './components';
import SemaversePrototype from '../semaverse/prototype';
import {
  SemaverseShowcase,
  SemaverseReview,
  SemaverseLifecycle,
} from './semaverse-visuals';
import './semaverse-case.css';
export function SemaverseCase() {
  return (
    <>
      <CaseHeader />
      <main className="sc-case" id="main">
        <section className="sc-intro sc-wrap">
          <div className="sc-intro-line">
            <Link href="/cases">SELECTED WORK / 02</Link>
            <span>SEMAVERSE · AI INVESTMENT PLATFORM</span>
            <span>2023 — JAN 2026</span>
          </div>
          <h1>
            Intelligence,
            <br />
            <span>
              made <i>legible.</i>
            </span>
            <span className="sc-title-arrow" aria-hidden="true">
              ↘
            </span>
          </h1>
          <div className="sc-intro-bottom">
            <p>
              I connected source research, document writing, and AI review in one
              workspace. Users could see what the AI used, review its suggestions,
              and restore earlier work.
            </p>
            <a href="#sc-prototype" className="sc-cta">
              Experience the product <ArrowDown size={19} />
            </a>
          </div>
          <div className="sc-impact" aria-label="Reported outcome">
            <strong>35%</strong>
            <p>less time to create an investment document, indicated by feedback from <b>42 investment users</b></p>
          </div>
        </section>
        <div className="sc-wrap sc-hero-stage">
          <SemaverseShowcase />
        </div>
        <div className="sc-wrap">
          <div className="sc-at-glance">
            <span className="sc-chapter-label">AT A GLANCE</span>
            <p>Semaverse is an AI investment workspace. People needed to create documents from research and financial data while understanding where information came from, what the system was doing, and what changed.</p>
          </div>
          <dl className="sc-facts">
            <div>
              <dt>MY ROLE</dt>
              <dd>Solo Product Designer</dd>
            </div>
            <div>
              <dt>TEAM</dt>
              <dd>CEO, CTO, 2 frontend developers, 1 backend developer</dd>
            </div>
            <div>
              <dt>TIMELINE</dt>
              <dd>2023 – January 2026</dd>
            </div>
            <div>
              <dt>OUTCOME</dt>
              <dd>35% less document creation time, per user feedback</dd>
            </div>
          </dl>
        </div>
        <nav className="sc-chapter-nav" aria-label="Case study chapters">
          <div className="sc-wrap">
            <a href="#sc-challenge">
              01 <span>The challenge</span>
            </a>
            <a href="#sc-ownership">
              02 <span>My ownership</span>
            </a>
            <a href="#sc-decisions">
              03 <span>Design decisions</span>
            </a>
            <a href="#sc-system">
              04 <span>The system</span>
            </a>
            <a href="#sc-outcome">
              05 <span>Result & reflection</span>
            </a>
            <a href="#sc-prototype">
              Try it <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
        <section className="sc-wrap sc-chapter sc-challenge" id="sc-challenge">
          <div className="sc-chapter-label">01 / THE CHALLENGE</div>
          <div className="sc-editorial">
            <h2>
              Powerful AI.
              <br />A very human
              <br />
              <i>need for clarity.</i>
            </h2>
            <div>
              <p className="sc-lead">
                Investment users need to know where information came from—and
                what happened to it along the way.
              </p>
              <p>
                Source documents, structured financial data, and AI-generated
                analysis all feed the same investment document. A polished draft
                is not enough if its claims cannot be traced or an AI action
                changes work without a clear signal.
              </p>
              <p>
                The interface had to keep sources close, show progress during
                longer actions, and make edits reviewable and reversible.
              </p>
            </div>
          </div>
          <div className="sc-questions">
            <div>
              <span>CONTEXT</span>
              <h3>
                What is this
                <br />
                based on?
              </h3>
              <p>Keep the source material connected to the analysis.</p>
            </div>
            <div>
              <span>STATUS</span>
              <h3>
                What is happening
                <br />
                right now?
              </h3>
              <p>Distinguish work in progress from a completed action.</p>
            </div>
            <div>
              <span>CONTROL</span>
              <h3>
                What changed—and
                <br />
                can I go back?
              </h3>
              <p>Make edits understandable and previous work recoverable.</p>
            </div>
          </div>
        </section>
        <section className="sc-wrap sc-ownership" id="sc-ownership">
          <span className="sc-chapter-label">02 / MY OWNERSHIP</span>
          <h2>I designed the path<br /><i>from source to decision.</i></h2>
          <p>As the solo product designer, I shaped the workspace structure, document workflow, AI interaction states, and patterns for review and revision. I worked from research and usability testing through interface design and rollout, including implementation details with engineering. The frontend and backend developers built the product; my responsibility was the experience and its interaction rules.</p>
        </section>
        <section className="sc-principle">
          <div className="sc-wrap">
            <span className="sc-chapter-label">THE DESIGN PRINCIPLE</span>
            <h2>
              Make the work visible.
              <br />
              <span>Keep the decision human.</span>
            </h2>
            <p>
              A connected experience for source material, AI reasoning, and the
              person making the call.
            </p>
            <div
              className="sc-principle-line"
              aria-label="Sources lead to analysis and human review"
            >
              <span>
                <FileText size={20} /> Source material
              </span>
              <ArrowUpRight size={22} />
              <span>
                <Sparkles size={20} /> AI assistance
              </span>
              <ArrowUpRight size={22} />
              <span>
                <Check size={20} /> Human judgment
              </span>
            </div>
          </div>
        </section>
        <section className="sc-wrap sc-chapter" id="sc-decisions">
          <div className="sc-chapter-label">03 / KEY DESIGN DECISIONS</div>
          <div className="sc-decision">
            <div className="sc-decision-copy">
              <span className="sc-big-number">01</span>
              <h2>
                Keep context
                <br />
                <i>within reach.</i>
              </h2>
              <p>
                Moving from research into a document risked losing the evidence
                behind a claim. I kept selected sources beside the writing area
                and connected document management, structured data, and AI
                assistance in one workspace.
              </p>
              <p>
                Collections hold context, the central canvas holds the document,
                and Archer stays beside the work. Each area answers a different
                question without sending users into a separate workflow.
              </p>
              <div className="sc-design-rule">
                <span>DESIGN RULE</span>
                <strong>One task. Three connected surfaces.</strong>
              </div>
            </div>
            <figure className="sc-context-figure">
              <div className="sc-context-columns">
                <div>
                  <Folder size={28} />
                  <span>CONTEXT</span>
                  <b>Collections</b>
                  <p>
                    Selected research
                    <br />
                    Saved sources
                    <br />
                    Related documents
                  </p>
                </div>
                <div>
                  <FileText size={28} />
                  <span>WORK</span>
                  <b>Document</b>
                  <p>
                    Structured analysis
                    <br />
                    Editable sections
                    <br />
                    Source references
                  </p>
                </div>
                <div>
                  <Sparkles size={28} />
                  <span>ASSISTANCE</span>
                  <b>Archer</b>
                  <p>
                    Instructions
                    <br />
                    Progress
                    <br />
                    Suggested changes
                  </p>
                </div>
              </div>
              <figcaption>
                Workspace anatomy · each surface answers a different question.
              </figcaption>
            </figure>
          </div>
          <div className="sc-decision sc-decision-reverse">
            <div className="sc-decision-copy">
              <span className="sc-big-number">02</span>
              <h2>
                Give every action
                <br />
                <i>a readable state.</i>
              </h2>
              <p>
                A quiet interface reduces noise, but silence during generation
                makes it hard to tell whether work is in progress or complete.
                I defined distinct selected, processing, review, and saved
                states.
              </p>
              <p>
                Selected sources remain explicit, generation shows progress,
                and stopping an action leaves existing work intact. Text and
                icon cues reinforce the status colors.
              </p>
              <div className="sc-design-rule">
                <span>DESIGN RULE</span>
                <strong>Progress should explain, not distract.</strong>
              </div>
            </div>
            <SemaverseLifecycle />
          </div>
          <div className="sc-decision">
            <div className="sc-decision-copy">
              <span className="sc-big-number">03</span>
              <h2>
                Make change
                <br />
                <i>reversible.</i>
              </h2>
              <p>
                Investment users need a reliable record of what changed,
                especially when AI contributes to a document. Automatic edits
                would be faster but could obscure responsibility for the final
                text.
              </p>
              <p>
                Archer proposes an edit for review before applying it. The
                current draft remains unchanged until acceptance, and revision
                history provides a route back.
              </p>
              <div className="sc-design-rule">
                <span>DESIGN RULE</span>
                <strong>A suggestion is not a commitment.</strong>
              </div>
            </div>
            <SemaverseReview />
          </div>
        </section>
        <section className="sc-original-stage">
          <div className="sc-wrap">
            <div className="sc-original-heading">
              <div>
                <span className="sc-chapter-label">
                  FROM THE ORIGINAL DESIGN
                </span>
                <h2>
                  The workspace,
                  <br />
                  <i>in detail.</i>
                </h2>
              </div>
              <p>
                Document structure and agent activity share a frame of
                reference. The original design brings navigation, analysis, and
                the conversation into one working surface.
              </p>
            </div>
            <figure>
              <a
                href="/images/semaverse/original-workspace.png"
                target="_blank"
                rel="noreferrer"
                aria-label="Open original Semaverse workspace image at full size"
              >
                <Image
                  src="/images/semaverse/original-workspace.png"
                  alt="Original Semaverse design showing collection navigation, an investment memo canvas, and Archer assistant alongside it"
                  width={1512}
                  height={982}
                  unoptimized
                />
                <span>
                  View original screen <ArrowUpRight size={18} />
                </span>
              </a>
              <figcaption>
                Original design export · template and assistant states shown as
                designed. Open the image to inspect the details.
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="sc-wrap sc-chapter" id="sc-system">
          <div className="sc-chapter-label">
            04 / DESIGNING THE WHOLE SYSTEM
          </div>
          <div className="sc-editorial">
            <h2>
              Consistency lives
              <br />
              <i>between screens.</i>
            </h2>
            <div>
              <p className="sc-lead">
                The decisions had to work across uploads, forms, financial data,
                documents, and agent activity.
              </p>
              <p>
                I defined reusable hierarchy and state rules so people could
                recognise the same signals across those tasks. I worked with
                engineering on stopped actions, revisions, and other edge cases.
              </p>
              <p>
                The result was a consistent basis for implementation, including
                clear behavior when a task changes, stops, or needs another look.
              </p>
            </div>
          </div>
          <div className="sc-system-board">
            <div className="sc-type-tile">
              <span>HIERARCHY</span>
              <strong>
                Aa<span>→</span>
              </strong>
              <p>Readable at every level.</p>
              <div>
                <b>Investment Memo</b>
                <span>Market overview</span>
                <small>Source · Research collection</small>
              </div>
            </div>
            <div className="sc-state-tile">
              <span>STATE LANGUAGE</span>
              <h3>
                Different states.
                <br />
                Clear signals.
              </h3>
              <div>
                <span>
                  <Check size={15} /> Selected
                </span>
                <span>
                  <Sparkles size={15} /> Processing
                </span>
                <span>
                  <FileText size={15} /> Review
                </span>
                <span>
                  <Check size={15} /> Saved
                </span>
                <span>
                  <History size={15} /> Restored
                </span>
              </div>
              <p>Text and icon cues support the color.</p>
            </div>
            <div className="sc-rule-tile">
              <span>INTERACTION PRINCIPLES</span>
              {[
                'Keep context visible.',
                'Explain system activity.',
                'Let people review.',
                'Preserve a way back.',
              ].map((t, i) => (
                <div key={t}>
                  <span>0{i + 1}</span>
                  <strong>{t}</strong>
                </div>
              ))}
            </div>
          </div>
          <p className="sc-caption">
            Selected interaction principles, illustrated through the portfolio
            reconstruction.
          </p>
        </section>
        <section className="sc-outcome" id="sc-outcome">
          <div className="sc-wrap">
            <div className="sc-chapter-label">05 / RESULT</div>
            <div className="sc-editorial">
              <h2>
                35% less time.
                <br />
                <i>More control.</i>
              </h2>
              <div>
                <p className="sc-lead">
                  Feedback from 42 investment users indicated a 35% reduction
                  in time to create an investment document.
                </p>
                <p>
                  The redesigned workflow kept research, document structure,
                  AI progress, and proposed changes visible together. It gave
                  users a way to inspect and reverse AI-assisted edits.
                </p>
                <p className="sc-evidence-note">
                  The 35% figure is based on user feedback. The available case
                  materials do not specify the timing method or comparison
                  baseline, so it is presented as a feedback-based finding.
                </p>
              </div>
            </div>
            <div className="sc-takeaway">
              <span>REFLECTION / NEXT EVIDENCE</span>
              <p>
                I would repeat the document task in a timed study, then test
                whether users can identify a claim’s sources, explain an AI
                action’s status, and restore a previous version without help.
              </p>
            </div>
          </div>
        </section>
        <section className="sc-prototype-section" id="sc-prototype">
          <div className="sc-wrap">
            <div className="sc-prototype-heading">
              <div>
                <span className="sc-chapter-label">EXPERIENCE THE DESIGN</span>
                <h2>
                  Your turn
                  <br />
                  <i>to explore.</i>
                </h2>
              </div>
              <div>
                <p>
                  Select research, create a document, ask Archer to refine it,
                  then review or undo the changes.
                </p>
                <Link href="/semaverse" className="sc-cta">
                  Open full-screen prototype <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>
            <SemaversePrototype embedded />
            <p className="sc-caption">
              Coded portfolio reconstruction based on the original design.
              Additional states complete the demonstration. Research and AI
              responses are simulated; documents save in your browser. Portfolio
              implementation created with AI assistance.
            </p>
          </div>
        </section>
        <div className="sc-wrap">
          <Link href="/cases/lumio-couples" className="sc-next">
            <div>
              <span>NEXT CASE / LUMIO</span>
              <h2>
                Shared money.
                <br />
                <i>Individual lives.</i>
              </h2>
            </div>
            <ArrowUpRight size={64} />
          </Link>
        </div>
      </main>
      <CaseFooter disclaimer />
    </>
  );
}
