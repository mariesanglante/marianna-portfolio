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
              I redesigned the way people work with documents and AI—so they can
              follow the reasoning, understand the changes, and stay in control.
            </p>
            <a href="#sc-prototype" className="sc-cta">
              Experience the product <ArrowDown size={19} />
            </a>
          </div>
        </section>
        <div className="sc-wrap sc-hero-stage">
          <SemaverseShowcase />
        </div>
        <div className="sc-wrap">
          <dl className="sc-facts">
            <div>
              <dt>MY ROLE</dt>
              <dd>Solo Product Designer</dd>
            </div>
            <div>
              <dt>OWNERSHIP</dt>
              <dd>Research → Design → Rollout</dd>
            </div>
            <div>
              <dt>THE PRODUCT</dt>
              <dd>AI investment workspace</dd>
            </div>
            <div>
              <dt>THE FOCUS</dt>
              <dd>Documents, data & agents</dd>
            </div>
          </dl>
        </div>
        <nav className="sc-chapter-nav" aria-label="Case study chapters">
          <div className="sc-wrap">
            <a href="#sc-challenge">
              01 <span>The challenge</span>
            </a>
            <a href="#sc-decisions">
              02 <span>Design decisions</span>
            </a>
            <a href="#sc-system">
              03 <span>The system</span>
            </a>
            <a href="#sc-outcome">
              04 <span>The outcome</span>
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
                Investment work depends on knowing where information came
                from—and what happened to it along the way.
              </p>
              <p>
                Documents, structured financial data, and AI-generated analysis
                live inside the same workflow. A polished answer is only part of
                the experience. People also need to understand the source
                material, the system’s progress, and the state of their own
                work.
              </p>
              <p>
                My role was to bring those moving parts into a predictable
                product experience, from document handling to interactions with
                AI agents.
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
          <div className="sc-chapter-label">02 / THREE DESIGN DECISIONS</div>
          <div className="sc-decision">
            <div className="sc-decision-copy">
              <span className="sc-big-number">01</span>
              <h2>
                Keep context
                <br />
                <i>within reach.</i>
              </h2>
              <p>
                Moving from research into a document should not mean losing the
                research. I connected document management, structured
                information, and AI interactions through a consistent workspace.
              </p>
              <p>
                Collections establish context. The central canvas holds the
                work. The assistant stays beside it. Each area has a distinct
                purpose while supporting the same task.
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
                I defined distinct viewing, editing, processing, and saved
                states. A user action and a completed system action need
                different feedback.
              </p>
              <p>
                The same principle runs through the reconstructed demo: selected
                sources are explicit, generation shows progress, and a stopped
                action leaves existing work intact.
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
                Document saving and versioning were part of the core experience.
                People needed a reliable record of the work, especially when AI
                contributed to it.
              </p>
              <p>
                In the portfolio prototype, Archer proposes edits before
                applying them. Manual changes stay protected, and revision
                history provides a clear route back.
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
            03 / DESIGNING THE WHOLE SYSTEM
          </div>
          <div className="sc-editorial">
            <h2>
              Consistency lives
              <br />
              <i>between screens.</i>
            </h2>
            <div>
              <p className="sc-lead">
                The work went beyond a set of finished layouts.
              </p>
              <p>
                I worked across research, usability testing, interface design,
                and implementation with engineering. Reusable interaction rules
                connected uploads, forms, financial data, document management,
                and agent activity.
              </p>
              <p>
                Technical constraints and edge cases shaped the work throughout
                delivery. The goal was a consistent basis for implementation,
                with clear behavior when a task changes, stops, or needs another
                look.
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
            <div className="sc-chapter-label">04 / THE OUTCOME</div>
            <div className="sc-editorial">
              <h2>
                Less ambiguity.
                <br />
                <i>More confidence.</i>
              </h2>
              <div>
                <p className="sc-lead">
                  The redesign made core workflows more understandable and
                  strengthened the traceability of document work.
                </p>
                <p>
                  Clearer states reduced confusion around AI actions. Connected
                  patterns made document handling more predictable. Close
                  collaboration with engineering carried the design through
                  implementation and edge cases.
                </p>
                <p className="sc-evidence-note">
                  These are qualitative outcomes from my documented project
                  experience. This case does not claim measured conversion,
                  revenue, or time-saving results.
                </p>
              </div>
            </div>
            <div className="sc-takeaway">
              <span>WHAT I TAKE FORWARD</span>
              <p>
                In an AI product, the interface needs to explain the <i>work</i>{' '}
                as carefully as it presents the <i>answer.</i>
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
      <CaseFooter />
    </>
  );
}
