'use client';

import { CoinflixDemo } from './coinflix-demo';
import Link from 'next/link';
import Image from 'next/image';
import { CaseHeader, CaseFooter } from './components';
import './coinflix-case.css';

const artwork = [
  '/notion/c4b10ea4-5b2e-4327-a8a7-152eadcb543e.webp',
  '/notion/4e0fc0bb-046b-408f-a548-67c22aa21fa8.webp',
  '/notion/068ca78f-213c-45c6-ac58-615862d2db15.webp',
  '/notion/235a9cc6-7df5-4c3c-8a20-86b0ab99bae0.webp',
];
export function CoinflixCase() {
  return (
    <>
      <CaseHeader />
      <main id="main" className="cf-case">
        <section className="cf-hero cf-shell">
          <div className="cf-topline">
            <Link href="/cases">← All cases</Link>
            <span>PRODUCT DESIGN · 2021</span>
            <span>ENTERTAINMENT / WEB3</span>
          </div>
          <div className="cf-hero-title">
            <div>
              <p className="cf-kicker">COINFLIX</p>
              <h1>
              Make short-form
              <br />
              <em>stories feel whole.</em>
              </h1>
            </div>
            <a className="cf-play" href="#coinflix-prototype">
              <span aria-hidden="true">↗</span>Play the
              <br />
              prototype
            </a>
          </div>
          <div className="cf-hero-bottom">
            <p>
              I designed the viewer and creator experience for a mobile
              entertainment concept combining short-form shows, social features,
              and blockchain-based participation.
            </p>
            <span>
              DISCOVER. WATCH. CREATE.
              <br />
              DESIGNED TO CONNECT.
            </span>
          </div>
        </section>
        <figure className="cf-cover">
          <Image
            unoptimized
            src={artwork[0]}
            alt="Coinflix onboarding screens with vivid abstract artwork and pink-to-purple actions"
            width="2800"
            height="2100"
            fetchPriority="high"
          />
          <figcaption>Coinflix / Original mobile product design</figcaption>
        </figure>
        <nav className="cf-chapters cf-shell" aria-label="Case study chapters">
          <a href="#cf-glance">At a glance</a>
          <a href="#cf-challenge">The challenge</a>
          <a href="#cf-decisions">Key decisions</a>
          <a href="#cf-outcome">Result & reflection</a>
        </nav>
        <section id="cf-glance" className="cf-section cf-shell">
          <p className="cf-kicker">AT A GLANCE</p>
          <div className="cf-editorial">
            <h2>One clear entry<br/><em>to a complex idea.</em></h2>
            <div><p className="cf-lead">The strongest design choice was to lead with entertainment and keep blockchain participation secondary.</p><p>The archive documents the product concept and design deliverables, but no launch, activation, or growth data. I can show the decisions and the proposed experience; I can’t claim a measured activation lift.</p></div>
          </div>
          <dl className="cf-meta">
            <div><dt>Product</dt><dd>Coinflix · mobile entertainment concept</dd></div>
            <div><dt>Problem</dt><dd>Unite short shows, creator publishing, community, and token participation</dd></div>
            <div><dt>My role</dt><dd>Product designer · research, flows, wireframes, mobile UI</dd></div>
            <div><dt>Team</dt><dd>Startup client through Awesomic; partner roles not recorded</dd></div>
            <div><dt>Timeline</dt><dd>2021 design project</dd></div>
            <div><dt>Outcome</dt><dd>End-to-end mobile app design; activation change not measured or documented</dd></div>
          </dl>
        </section>
        <section id="cf-challenge" className="cf-section cf-shell">
          <p className="cf-kicker">THE CHALLENGE</p>
          <div className="cf-editorial">
            <h2>
              Entertainment first.
              <br />
              <em>Complexity backstage.</em>
            </h2>
            <div>
              <p className="cf-lead">
              Two groups had to understand one unfamiliar product: viewers
              looking for engaging short-form entertainment and creators looking
              for audience, community, and new monetization options.
              </p>
              <p>
                The stakes were clarity and trust. If token mechanics appeared
                before the content value, they could add friction to a product
                people should be able to browse and enjoy. The brief also
                stretched across viewing, publishing, social interaction, and
                wallet concepts; no engineering or launch constraints are
                documented in the project archive.
              </p>
            </div>
          </div>
          <dl className="cf-meta">
            <div>
              <dt>My role</dt>
              <dd>Product designer</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Research synthesis → flows → wireframes → mobile UI</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>Startup project · through Awesomic</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>
                2021 design
                <br />2026 portfolio demo reconstruction
              </dd>
            </div>
          </dl>
          <div className="cf-question"><span>THE DESIGN QUESTION</span><p>How might the product make <em>watching valuable before asking for commitment?</em></p></div>
        </section>
        <section id="cf-experience" className="cf-experience">
          <div className="cf-shell">
            <p className="cf-kicker">MY OWNERSHIP</p>
            <div className="cf-section-head">
              <h2>
                I shaped the
                <br />
                viewer and
                <br />
                <em>creator flows.</em>
              </h2>
              <p>
                I personally translated the brief and survey themes into
                navigation, viewing, publishing, and participation screens.
                The startup brief and product direction were shared; the archive
                does not identify other contributors by name or role.
              </p>
            </div>
            <CoinflixDemo />
          </div>
        </section>
        <section id="cf-decisions" className="cf-section cf-shell">
          <p className="cf-kicker">KEY DECISIONS · EVIDENCE & TRADEOFFS</p>
          <div className="cf-editorial">
            <h2>
              Make the show
              <br />
              <em>the front door.</em>
            </h2>
            <div>
              <p className="cf-lead">
                Survey notes report preference for short-form, immersive
                content. I prioritized a content feed and kept show/episode
                context one step away.
              </p>
              <p>
                Tradeoff: an immersive player supports focused viewing, while
                show descriptions, episode lists, and creator profiles help
                people decide what to watch next. Those surfaces connect a quick
                clip to a series without making the feed itself feel like a
                catalog. The archive provides qualitative survey themes, not
                sample size or task-test results.
              </p>
            </div>
          </div>
          <figure className="cf-art">
            <Image
              unoptimized
              src={artwork[1]}
              width="2800"
              height="2100"
              loading="lazy"
              alt="Series description, immersive video player, and episode selection in Coinflix"
            />
            <figcaption>
              <span>DECISION 1 · VIEWER</span>Discover a show → watch → choose the
              next episode
            </figcaption>
          </figure>
          <div className="cf-publish">
            <p className="cf-kicker">DECISION 2 · CREATOR</p>
            <h3>
              One publishing entry.
              <br />
              Room for different stories.
            </h3>
            <div className="cf-publish-path" aria-label="Publishing flow">
              <span>Capture or upload</span>
              <i aria-hidden="true">→</i>
              <span>Add details</span>
              <i aria-hidden="true">→</i>
              <div>
                <span>Single video</span>
                <span>New series</span>
                <span>Episode in a series</span>
              </div>
              <i aria-hidden="true">→</i>
              <span>Publish</span>
            </div>
            <p>
              The brief included both standalone short videos and episodic
              shows. I separated adding content details from choosing its
              destination (single video, new series, or existing series), so
              one publishing entry could support all three. This is a design
              rationale; no usability result is recorded.
            </p>
          </div>
          <figure className="cf-art">
            <Image
              unoptimized
              src={artwork[2]}
              width="2800"
              height="2100"
              loading="lazy"
              alt="Coinflix camera, bidding concept, and wallet screens"
            />
            <figcaption>
              <span>DECISION 3 · PARTICIPATION</span>Capture, ownership
              concepts, and wallet access
            </figcaption>
          </figure>
        </section>
        <section id="cf-system" className="cf-system cf-shell">
          <p className="cf-kicker">DECISION 4 · VISUAL HIERARCHY</p>
          <div className="cf-editorial">
            <h2>
              Quiet interface.
              <br />
              <em>Loud personality.</em>
            </h2>
            <div>
              <p className="cf-lead">
                A dark canvas lets video lead; color distinguishes primary
                actions from the viewing surface.
              </p>
              <p>
                The product brief combined entertainment with unfamiliar
                blockchain mechanics. I used vivid artwork for brand expression
                and restrained app surfaces for legibility. Gradients mark key
                actions. This balances a distinctive identity against the need
                to keep content and controls easy to scan.
              </p>
            </div>
          </div>
          <div className="cf-design-grid">
            <div className="cf-type-card">
              <span>TYPOGRAPHY / ORIGINAL UI</span>
              <strong>Aa</strong>
              <div>
                <b>Avenir</b>
                <p>
                  A clear, approachable voice for a content-heavy interface.
                </p>
              </div>
            </div>
            <div className="cf-color-card">
              <span>COLOR / PRODUCT PALETTE</span>
              <div className="cf-swatches">
                <div>Midnight</div>
                <div>Violet</div>
                <div>Pink</div>
              </div>
              <p>
                Dark foundations. High-energy accents.
                <br />A recognizable gradient for primary actions.
              </p>
              <div className="cf-sample-action" aria-hidden="true">
                Continue <span>→</span>
              </div>
            </div>
          </div>
          <figure className="cf-art">
            <Image
              unoptimized
              src={artwork[3]}
              width="2800"
              height="2100"
              loading="lazy"
              alt="Original Coinflix registration designs including email, password, verification, and error states"
            />
            <figcaption>
              <span>THE DETAILS MATTER</span>Onboarding, validation, and
              recovery states
            </figcaption>
          </figure>
        </section>
        <section id="cf-outcome" className="cf-outcome">
          <div className="cf-shell">
            <p className="cf-kicker">RESULT</p>
            <h2>
              A connected
              <br />
              <em>design, not a growth claim.</em>
            </h2>
            <div className="cf-outcome-copy">
              <p>
                The project delivered a mobile app design spanning discovery,
                viewing, social interaction, creator publishing, and proposed
                participation features. The archive records no shipped release,
                activation rate, conversion lift, or user feedback quote; there
                is no defensible activation growth number to report.
              </p>
              <p>
                For this portfolio, I rebuilt selected journeys as an
                interactive web demo, with editable content, connected states,
                and an animated walkthrough. This is a 2026 concept
                reconstruction; publishing, accounts, and credits are simulated.
              </p>
            </div>
            <a className="cf-button cf-button-dark" href="#coinflix-prototype">
              Explore the interactive demo <span>↗</span>
            </a>
            <div className="cf-reflection">
              <h3>Reflection · what I’d validate next</h3>
              <p>
                I would first test whether viewers can find and continue a
                series, whether creators can distinguish a standalone post from
                an episode, and whether wallet and ownership concepts make sense
                before commitment. I would then instrument the funnel from first
                open to first completed show and creator publish. That evidence
                could tell us whether content-first entry reduces early
                friction—and whether participation tools earn their place.
              </p>
            </div>
          </div>
        </section>
        <section className="cf-credits cf-shell">
          <div>
            <p className="cf-kicker">PROJECT MATERIAL</p>
            <a href="#coinflix-prototype">Play the interactive demo ↑</a>
            <a
              href="https://mariesanglante.notion.site/Startup-Coinflix-app-design-3b603ca43cc84372a4af5a917fdf67c1"
              target="_blank"
              rel="noreferrer"
            >
              Original project archive ↗
            </a>
          </div>
          <p>
            Project work through{' '}
            <a href="https://awesomic.com" target="_blank" rel="noreferrer">
              Awesomic
            </a>
            . According to Design Development Agreement No. 07/09/2021, all
            intellectual property is owned by Awesomic, Inc. Original product
            visuals are presented with that credit.
          </p>
        </section>
        <Link className="cf-next cf-shell" href="/cases">
          <span>KEEP EXPLORING</span>
          <strong>
            More work. <i>↗</i>
          </strong>
        </Link>
      </main>
      <CaseFooter disclaimer />
    </>
  );
}
