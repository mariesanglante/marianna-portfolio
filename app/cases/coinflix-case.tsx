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
                A new stage
                <br />
                for <em>small stories.</em>
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
              A mobile entertainment platform where short-form stories, creator
              communities, and a proposed token economy meet.
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
          <a href="#cf-challenge">01 — The challenge</a>
          <a href="#cf-experience">02 — The experience</a>
          <a href="#cf-system">03 — The expression</a>
          <a href="#cf-outcome">04 — The outcome</a>
        </nav>
        <section id="cf-challenge" className="cf-section cf-shell">
          <p className="cf-kicker">01 / THE CHALLENGE</p>
          <div className="cf-editorial">
            <h2>
              Entertainment first.
              <br />
              <em>Complexity backstage.</em>
            </h2>
            <div>
              <p className="cf-lead">
                Coinflix brought three products into one: a short-form video
                app, a creator community, and a blockchain-powered platform.
              </p>
              <p>
                The design challenge was to make them feel like one experience.
                Viewers needed an easy way into the content. Creators needed a
                clear path from capturing a moment to publishing a series.
                Participation features needed a place without overwhelming
                either journey.
              </p>
            </div>
          </div>
          <dl className="cf-meta">
            <div>
              <dt>My role</dt>
              <dd>Senior Product Designer</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Research → flows → mobile UI</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>Startup · through Awesomic</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>
                2021 design
                <br />
                2026 prototype reconstruction
              </dd>
            </div>
          </dl>
          <div className="cf-question">
            <span>THE DESIGN QUESTION</span>
            <p>
              How do you make a new kind of platform feel{' '}
              <em>instantly familiar?</em>
            </p>
          </div>
          <div className="cf-three">
            <article>
              <span>01 / UNDERSTAND</span>
              <h3>Two sides of the same story.</h3>
              <p>
                The original process included user surveys, competitor analysis,
                personas, and journey mapping around viewers and creators.
              </p>
            </article>
            <article>
              <span>02 / STRUCTURE</span>
              <h3>Make the next step obvious.</h3>
              <p>
                Paper sketches and low- to mid-fidelity wireframes shaped the
                routes into discovery, engagement, and publishing.
              </p>
            </article>
            <article>
              <span>03 / REFINE</span>
              <h3>Keep the story in focus.</h3>
              <p>
                High-fidelity designs brought content, social actions, and
                creator tools into a shared visual language, refined through
                feedback.
              </p>
            </article>
          </div>
        </section>
        <section id="cf-experience" className="cf-experience">
          <div className="cf-shell">
            <p className="cf-kicker">02 / THE EXPERIENCE</p>
            <div className="cf-section-head">
              <h2>
                Watch it.
                <br />
                Make it.
                <br />
                <em>Be part of it.</em>
              </h2>
              <p>
                Three connected journeys.
                <br />
                Explore the working demo below. Every journey stays on this
                page.
              </p>
            </div>
            <CoinflixDemo />
          </div>
        </section>
        <section className="cf-section cf-shell">
          <div className="cf-editorial">
            <h2>
              Short form.
              <br />
              <em>Longer connections.</em>
            </h2>
            <div>
              <p className="cf-lead">
                A video is an entry point. A series gives people a reason to
                stay.
              </p>
              <p>
                Show descriptions, episode lists, and creator profiles give
                individual moments a wider context. The design moves between
                immersive viewing and lightweight navigation, keeping the next
                story within reach.
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
              <span>VIEWER EXPERIENCE</span>Discover a show → watch → choose the
              next episode
            </figcaption>
          </figure>
          <div className="cf-publish">
            <p className="cf-kicker">THE CREATOR SIDE</p>
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
              Separating content details from its place in a series makes the
              publishing journey easier to understand—and leaves room for
              creators to grow beyond a single clip.
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
              <span>CREATOR & PARTICIPATION TOOLS</span>Capture, ownership
              concepts, and wallet access
            </figcaption>
          </figure>
        </section>
        <section id="cf-system" className="cf-system cf-shell">
          <p className="cf-kicker">03 / THE EXPRESSION</p>
          <div className="cf-editorial">
            <h2>
              Quiet interface.
              <br />
              <em>Loud personality.</em>
            </h2>
            <div>
              <p className="cf-lead">
                A dark canvas lets the content lead. Electric color gives the
                product its own voice.
              </p>
              <p>
                Vivid abstract forms establish an expressive first impression.
                Inside the app, restrained surfaces and consistent controls give
                videos and creator content the space to stand out.
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
            <p className="cf-kicker">04 / THE OUTCOME</p>
            <h2>
              A product you can
              <br />
              <em>walk through.</em>
            </h2>
            <div className="cf-outcome-copy">
              <p>
                The original project delivered a complete mobile app design
                spanning discovery, viewing, community, publishing, and
                participation features.
              </p>
              <p>
                For this portfolio, I rebuilt the main journeys as an
                interactive web demo, with editable content, connected states,
                and an animated walkthrough. This is a 2026 concept
                reconstruction; publishing, accounts, and credits are simulated.
              </p>
            </div>
            <a className="cf-button cf-button-dark" href="#coinflix-prototype">
              Explore the interactive demo <span>↗</span>
            </a>
            <div className="cf-reflection">
              <h3>What I would validate next</h3>
              <p>
                Can viewers find and continue a series without guidance? Do
                creators understand when to publish a single video versus an
                episode? Are wallet and ownership concepts clear before users
                commit? The next step is task-based testing of those decisions;
                verified launch or growth metrics are not available for this
                case.
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
      <CaseFooter />
    </>
  );
}
