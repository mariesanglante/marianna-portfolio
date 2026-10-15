import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { CaseHeader, CaseFooter } from './components';
import { PearlLibrary, PearlExperience, PearlMoment } from './pearl-experience';
import './pearl-case.css';

export function PearlCase() {
  return (
    <>
      <CaseHeader />
      <main id="main" className="pc-case">
        <section className="pc-hero pc-wrap">
          <div className="pc-topline">
            <Link href="/cases">SELECTED WORK / PEARL</Link>
            <span>CREATOR COMMUNITIES</span>
            <span>PRODUCT & SYSTEMS DESIGN</span>
          </div>
          <div className="pc-hero-title">
            <h1>
              One coherent
              <br />
              <em>creator experience.</em>
            </h1>
            <a href="#pc-result" className="pc-orbit-link">
              <span aria-hidden="true">↘</span>See the
              <br />result
            </a>
          </div>
          <div className="pc-hero-bottom">
            <p>
              I consolidated Pearl’s growing UI kit into a documented,
              token-based system so profiles, feeds, and community chat could
              share patterns without losing their distinct needs.
            </p>
            <a href="#pc-context" aria-label="Explore the Pearl story">
              <ArrowDown size={23} />
            </a>
          </div>
        </section>

        <section className="pc-showcase" aria-label="Pearl product design">
          <div className="pc-showcase-top">
            <span className="pc-wordmark"><i />pearl.</span>
            <span>CREATOR & FAN COMMUNITIES</span>
            <span>PRODUCT DESIGN</span>
          </div>
          <div className="pc-showcase-art">
            <Image priority src="/notion/05d8ddd4-6026-4349-8762-701d637410ad.webp" alt="Pearl profile, feed, and community chat designs across desktop and mobile" width={1400} height={1050} />
          </div>
          <div className="pc-showcase-bottom">
            <span>DESKTOP ↔ MOBILE</span>
            <span>Original project design</span>
          </div>
        </section>

        <div className="pc-wrap">
          <dl className="pc-facts">
            <div><dt>PRODUCT</dt><dd>Pearl · creator and fan communities</dd></div>
            <div><dt>MY ROLE</dt><dd>Senior UX Designer</dd></div>
            <div><dt>OWNERSHIP</dt><dd>UI audit, design system, documentation, delivery planning</dd></div>
            <div><dt>TEAM & TIMELINE</dt><dd>Not specified in the project materials</dd></div>
            <div><dt>OUTCOME</dt><dd>Consolidated, documented component library</dd></div>
          </dl>
        </div>

        <nav className="pc-chapters" aria-label="Pearl case sections">
          <div className="pc-wrap">
            {[
              ['context', 'Challenge'],
              ['system', 'My ownership'],
              ['craft', 'Key decisions'],
              ['result', 'Result & reflection'],
            ].map(([id, title], i) => <a href={'#pc-' + id} key={id}><span>0{i + 1}</span>{title}</a>)}
          </div>
        </nav>

        <section id="pc-context" className="pc-wrap pc-section">
          <div className="pc-kicker">01 / THE CHALLENGE</div>
          <div className="pc-editorial">
            <h2>Many ways to connect.<br /><em>One product to understand.</em></h2>
            <div>
              <p className="pc-lead">Pearl brought creators and their audiences together through content, paid interactions, and community conversation.</p>
              <p>Each surface had its own requirements: a profile introduces a creator, a feed organizes content, and chat supports ongoing conversation. As the product grew, its UI kit no longer covered every component in the designs. That made consistency and handoff harder to sustain.</p>
              <p>The source materials document the product and interface challenge, but do not identify a specific research study, user segment, or business metric. I treated the existing UI kit and product screens as the evidence available for this system-level work.</p>
            </div>
          </div>
          <PearlMoment />
        </section>

        <section id="pc-system" className="pc-system-section">
          <div className="pc-wrap">
            <div className="pc-kicker">02 / MY OWNERSHIP</div>
            <div className="pc-editorial">
              <h2>Make the system<br /><em>usable beyond one screen.</em></h2>
              <div>
                <p className="pc-lead">I owned the audit and consolidation of Pearl’s design foundation.</p>
                <p>I reviewed the existing UI kit alongside product designs, identified components that were used in the product but missing from the library, and integrated them into a standardized, token-based system.</p>
                <p>I documented component purpose, usage, variants, states, and specifications, and planned the design workload into milestones, tasks, and deliverables. The materials establish my individual ownership of this work; they do not specify the wider team’s roles or implementation responsibilities.</p>
              </div>
            </div>
            <div className="pc-process">
              {[
                ['01', 'Audit', 'Compare the UI kit with the existing product screens.'],
                ['02', 'Consolidate', 'Bring missing and overlapping patterns into a shared library.'],
                ['03', 'Specify', 'Document intended use, variants, states, and handoff details.'],
                ['04', 'Plan', 'Break the design work into milestones and deliverables.'],
              ].map(([n, h, p]) => <article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}
            </div>
          </div>
        </section>

        <section id="pc-craft" className="pc-wrap pc-section">
          <div className="pc-kicker">03 / KEY DECISIONS</div>
          <div className="pc-editorial">
            <h2>Shared patterns.<br /><em>Distinct interactions.</em></h2>
            <div>
              <p className="pc-lead">The central decision was to standardize the repeatable parts without flattening the differences between product surfaces.</p>
              <p>The evidence was the existing interface and UI kit: some patterns already repeated, while other components in product designs had no library reference. The resulting system groups reusable components and their states while allowing profile, feed, and chat patterns to keep context-specific structure.</p>
            </div>
          </div>
          <div className="pc-decision-list">
            <article><span>DECISION 01</span><h3>Consolidate before adding more.</h3><p><strong>Evidence:</strong> Comparing shipped design screens with the UI kit revealed missing components and overlapping patterns.</p><p><strong>Tradeoff:</strong> A shared library requires upfront naming and structure, but reduces one-off references as the product expands.</p><p><strong>Design change:</strong> Components, variants, and states were integrated into one token-based foundation.</p></article>
            <article><span>DECISION 02</span><h3>Reuse structure, preserve context.</h3><p><strong>Evidence:</strong> Profiles, content feeds, and chats serve different tasks, even when they share identity and action patterns.</p><p><strong>Tradeoff:</strong> Reusing everything would make the interface predictable but could obscure each surface’s purpose.</p><p><strong>Design change:</strong> Shared visual and interaction patterns carry across features, while content-specific layouts remain distinct.</p></article>
            <article><span>DECISION 03</span><h3>Make states and usage explicit.</h3><p><strong>Evidence:</strong> A component library is only actionable when people can tell which variant and state to use.</p><p><strong>Tradeoff:</strong> More documentation takes time, but leaves fewer implementation choices implicit.</p><p><strong>Design change:</strong> The reference includes purpose, usage guidance, variants, states, and specifications.</p></article>
          </div>
          <PearlLibrary />
        </section>

        <section id="pc-result" className="pc-result-section">
          <div className="pc-wrap pc-section">
            <div className="pc-kicker">04 / RESULT & REFLECTION</div>
            <div className="pc-editorial">
              <h2>A clearer design<br /><em>reference to build from.</em></h2>
              <div>
                <p className="pc-lead">The delivered outcome was a consolidated component library with documented usage and specifications, plus a planned set of design milestones and deliverables.</p>
                <p>The project materials describe qualitative improvements to consistency and workflow, but provide no measured before-and-after results or direct user feedback. I therefore can’t attribute a quantified impact to this work.</p>
                <p><strong>With more time,</strong> I would validate the system with designers and engineers using real feature work, then track adoption, repeated component gaps, and handoff questions. I would also test key interaction decisions with creators and fans rather than relying only on interface review.</p>
                <div className="pc-credit">Project work through Awesomic. Source materials credit intellectual-property ownership to Awesomic, Inc. Detailed project walkthrough available by request.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="pc-experience" className="pc-demo-section">
          <div className="pc-wrap">
            <div className="pc-kicker">DESIGN EXPLORATION / 2026 PORTFOLIO PROTOTYPE</div>
            <div className="pc-demo-heading">
              <h2>See the product<br /><em>in context.</em></h2>
              <div><p>Explore a separate portfolio prototype of Pearl’s creator community experience.</p><p className="pc-demo-note">This refreshed prototype is an illustration, not a project outcome or validation of the original work. Payments, gifts, and messages are simulated.</p><Link className="pc-inline-link" href="/pearl">Explore prototype <ArrowUpRight size={19} /></Link></div>
            </div>
            <PearlExperience />
          </div>
        </section>

        <section className="pc-wrap pc-closing">
          <span>PEARL / END OF CASE</span>
          <Link href="/cases/coinflix"><div><small>UP NEXT — COINFLIX</small><h2>A new stage<br />for <em>small stories.</em></h2></div><ArrowUpRight size={65} /></Link>
          <div className="pc-closing-links"><Link href="/cases">← All case studies</Link><a href="#main">Back to the beginning ↑</a></div>
        </section>
      </main>
      <CaseFooter disclaimer />
    </>
  );
}
