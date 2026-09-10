import { CloudbillingHeroDiagram } from '../cloudbilling/final-home';
import '../cloudbilling/final-home.css';
import Link from 'next/link';
import Image from 'next/image';
import { CaseHeader, CaseFooter } from './components';
import { BillingFlow, CloudbillingMotion } from '../cloudbilling/website';
import '../cloudbilling/website.css';
import './cloudbilling-case.css';
export function CloudbillingCase() {
  return (
    <>
      <CaseHeader />
      <CloudbillingMotion />
      <main id="main" className="cw-case">
        <section className="cwc-intro wrap">
          <Link className="case-back" href="/cases">
            ← All cases
          </Link>
          <div className="cwc-meta">
            <span>SELECTED WORK / 2026</span>
            <span>B2B SAAS · WEBSITE EXPERIENCE</span>
          </div>
          <h1>
            Complexity,
            <br />
            <i className="serif">beautifully connected.</i>
          </h1>
          <div className="cwc-deck">
            <p>
              A new digital expression for CloudBilling.
              <br />
              Turning a complex billing engine into a clear, confident story —
              and an experience you can explore.
            </p>
            <Link href="/cloudbilling" className="cwc-launch">
              Explore the website <span>↗</span>
            </Link>
          </div>
          <dl className="case-details">
            <div>
              <dt>Client</dt>
              <dd>CloudBilling</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>Website UX/UI design</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Product story · Visual system · Responsive UI</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>2026 · Interactive portfolio prototype</dd>
            </div>
          </dl>
        </section>
        <section className="cwc-cover">
          <div className="cwc-cover-top">
            <span>CLOUDBILLING / A CONNECTED EXPERIENCE</span>
            <span>DESIGN IN MOTION ↗</span>
          </div>
          <Link
            href="/cloudbilling"
            className="cwc-browser"
            aria-label="Explore the interactive CloudBilling website"
          >
            <div className="cwc-browser-bar">
              <span>● ● ●</span>
              <span>CloudBilling — Website experience</span>
              <span>↗</span>
            </div>
            <div className="cwc-browser-body">
              <div>
                <span className="cw-kicker">CLOUD & SAAS BILLING PLATFORM</span>
                <h2>
                  We master billing
                  <br />
                  complexity for
                  <br />
                  <strong>Cloud Providers.</strong>
                </h2>
                <p>
                  Every resource mapped to the right customer. Every invoice
                  accurate.
                </p>
                <span className="cwc-small-cta">Explore the experience ↗</span>
              </div>
              <CloudbillingHeroDiagram />
            </div>
          </Link>
          <div className="cwc-cover-bottom">
            <span>A technical product. A human introduction.</span>
            <Link href="/cloudbilling">Open full website ↗</Link>
          </div>
        </section>
        <div className="wrap">
          <section className="cwc-chapter" data-cw-reveal>
            <div>
              <span className="cw-kicker">01 / THE CHALLENGE</span>
              <h2>
                First, make
                <br />
                <i className="serif">the complex click.</i>
              </h2>
            </div>
            <div>
              <p className="cwc-lead">
                CloudBilling connects usage, customers, products and pricing
                rules. The website needed to connect those ideas for people.
              </p>
              <p>
                The design challenge was to explain a technical platform without
                making the visitor do the hard work. A list of capabilities
                could describe the engine, but a connected story could show why
                it matters.
              </p>
              <p>
                The direction brings product positioning, information hierarchy
                and technical illustration together. Visitors can understand the
                offer first, then explore the detail at their own pace.
              </p>
            </div>
          </section>
          <div className="cwc-principles" data-cw-reveal>
            {[
              [
                '01',
                'Lead with clarity.',
                'A benefit before a specification. A clear next step after each explanation.',
              ],
              [
                '02',
                'Make the system visible.',
                'Connect inputs, rules and outputs so the product story has a shape.',
              ],
              [
                '03',
                'Let detail unfold.',
                'Product tabs and progressive explanations keep depth within reach.',
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n} / DESIGN PRINCIPLE</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
          <section className="cwc-chapter" data-cw-reveal>
            <div>
              <span className="cw-kicker">02 / THE EXPERIENCE</span>
              <h2>
                One platform.
                <br />
                <i className="serif">A clearer narrative.</i>
              </h2>
            </div>
            <div>
              <p className="cwc-lead">
                Three offers, with a shared visual language and room for their
                differences.
              </p>
              <p>
                CloudBilling Engine, Datasets and Managed Billing sit inside a
                consistent product panel. Each selection pairs a focused
                explanation with a visual model, keeping the path from
                understanding to action short.
              </p>
              <p>
                The interactive interpretation adds deliberate transitions,
                responsive navigation and a complete demo-request flow. Motion
                gives feedback and rhythm to the underlying design.
              </p>
              <Link className="text-link" href="/cloudbilling#platform">
                Try the product explorer <span>↗</span>
              </Link>
            </div>
          </section>
          <figure className="cwc-design">
            <Image
              unoptimized
              src="/images/cloudbilling/engine.png"
              width={1280}
              height={484}
              alt="Original CloudBilling product panel design with offer tabs, an orange demo action and a connected billing diagram"
              loading="lazy"
            />
            <figcaption>
              <span>DESIGN FOUNDATION / PRODUCT EXPLORER</span>
              <span>Clear hierarchy. Connected illustration.</span>
            </figcaption>
          </figure>
        </div>
        <section className="cwc-interactive">
          <div className="wrap">
            <div className="cwc-interactive-head">
              <div>
                <span className="cw-kicker">03 / TRY THE STORY</span>
                <h2>
                  From raw usage
                  <br />
                  to <i className="serif">a clear outcome.</i>
                </h2>
              </div>
              <p>
                Select a stage to follow the journey.
                <br />
                The explanation and the system move together.
              </p>
            </div>
            <BillingFlow compact />
          </div>
        </section>
        <div className="wrap">
          <section className="cwc-mobile" data-cw-reveal>
            <div>
              <span className="cw-kicker">04 / RESPONSIVE BY DESIGN</span>
              <h2>
                Same story.
                <br />
                <i className="serif">A different rhythm.</i>
              </h2>
              <p>
                On a smaller screen, the narrative becomes a deliberate
                sequence. The explanation leads, the primary action stays within
                reach, and the diagram gets its own space.
              </p>
              <p>
                The live prototype carries that approach through the navigation,
                product explorer and billing walkthrough, with keyboard controls
                and reduced-motion support.
              </p>
              <div className="cwc-chips">
                <span>Responsive layouts</span>
                <span>Keyboard navigation</span>
                <span>Reduced motion</span>
              </div>
              <Link className="text-link" href="/cloudbilling">
                Explore at your screen size ↗
              </Link>
            </div>
            <div className="cwc-phone-stage">
              <span className="cwc-stage-note">
                SMALL SCREEN. FULL PICTURE.
              </span>
              <div className="cwc-phone">
                <div className="cwc-phone-top">
                  9:41 <span>● ▰</span>
                </div>
                <Image
                  unoptimized
                  src="/images/cloudbilling/mobile.png"
                  width={343}
                  height={647}
                  alt="Mobile CloudBilling design with stacked product content, a full-width demo button and a billing-flow diagram"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
          <section className="cwc-system" data-cw-reveal>
            <span className="cw-kicker">05 / THE VISUAL LANGUAGE</span>
            <div className="cwc-system-head">
              <h2>
                Quiet confidence.
                <br />
                <i className="serif">A distinctive signal.</i>
              </h2>
              <p>
                Deep blue creates a stable foundation. Warm orange makes actions
                visible. Green becomes a signal inside the flow. Soft neutral
                surfaces give the information room to breathe.
              </p>
            </div>
            <div className="cwc-palette">
              <div style={{ background: '#01284f' }}>
                <span>01 / FOUNDATION</span>
                <strong>Deep blue</strong>
                <small>#01284F</small>
              </div>
              <div style={{ background: '#ff5b29' }}>
                <span>02 / ACTION</span>
                <strong>CTA orange</strong>
                <small>#FF5B29</small>
              </div>
              <div style={{ background: '#91f77a', color: '#01284f' }}>
                <span>03 / SIGNAL</span>
                <strong>Electric green</strong>
                <small>#91F77A</small>
              </div>
              <div style={{ background: '#fbfaf9', color: '#01284f' }}>
                <span>04 / SPACE</span>
                <strong>Soft white</strong>
                <small>#FBFAF9</small>
              </div>
            </div>
            <div className="cwc-type">
              <span>Aa</span>
              <div>
                <span className="cw-kicker">TYPOGRAPHIC DIRECTION</span>
                <h3>Clarity at every level.</h3>
                <p>
                  General Sans carries the original website’s visual hierarchy,
                  from confident headlines to clear product detail. Consistent
                  spacing and restrained motion make a complex billing story
                  easy to follow.
                </p>
              </div>
            </div>
          </section>
          <section className="cwc-outcome" data-cw-reveal>
            <span className="cw-kicker">06 / THE RESULT</span>
            <h2>
              A technical story.
              <br />
              <i className="serif">An intuitive experience.</i>
            </h2>
            <p>
              A cohesive website direction that connects the product narrative,
              technical illustrations and responsive UI. This portfolio version
              brings the design to life through working interactions and motion.
            </p>
            <p className="cwc-note">
              The prototype demonstrates the website experience with
              illustrative states. It is not connected to the CloudBilling
              platform, and demo requests are not submitted.
            </p>
            <Link href="/cloudbilling" className="cwc-launch">
              Experience CloudBilling <span>↗</span>
            </Link>
          </section>
          <Link className="next-case" href="/cases/oasive">
            <div>
              <span className="eyebrow">NEXT / OASIVE</span>
              <h2>Making specialist finance feel clear.</h2>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
      <CaseFooter disclaimer />
    </>
  );
}
