import Image from 'next/image';
import Link from 'next/link';
import { CaseHeader, CaseFooter } from './components';
import { WelltraxExperience } from './welltrax-experience';
import './welltrax-case.css';
const chapters = [
  ['context', 'The real world'],
  ['flow', 'The next move'],
  ['detail', 'The details'],
  ['conditions', 'Every condition'],
  ['experience', 'Try the product'],
];
export function WelltraxCase() {
  return (
    <>
      <CaseHeader />
      <main id="main" className="wx-case">
        <section className="wx-hero wx-wrap">
          <div className="wx-topline">
            <Link href="/cases">← Selected work / 10</Link>
            <span>WELLTRAX · LOGISTICS</span>
            <span>PRODUCT DESIGN / 2021</span>
          </div>
          <div className="wx-hero-title">
            <h1>
              Clarity, for
              <br />
              the <em>long haul.</em>
            </h1>
            <a className="wx-round-link" href="#wx-experience">
              <span aria-hidden="true">↘</span>Experience
              <br />
              the product
            </a>
          </div>
          <div className="wx-hero-bottom">
            <p>
              A working companion for truck drivers.
              <br />
              From the first pickup to the final drop.
            </p>
            <span>
              TABLET-FIRST. FIELD-READY.
              <br />
              DESIGNED AROUND THE DRIVER.
            </span>
          </div>
        </section>
        <figure className="wx-cover">
          <Image
            src="/notion/cacc762d-6da8-4961-9cdf-16438caa672e.webp"
            alt="Original Welltrax tablet designs showing load review, pickup forms, and tank measurements"
            width={1600}
            height={1200}
            priority
          />
          <figcaption>
            <span>WELLTRAX / ORIGINAL PRODUCT DESIGN</span>
            <span>LESS SEARCHING. A CLEARER NEXT STEP.</span>
          </figcaption>
        </figure>
        <div className="wx-wrap">
          <dl className="wx-facts">
            <div>
              <dt>MY ROLE</dt>
              <dd>Senior Product Designer</dd>
            </div>
            <div>
              <dt>THE PRODUCT</dt>
              <dd>Driver logistics application</dd>
            </div>
            <div>
              <dt>THE SCOPE</dt>
              <dd>Research, flows, UI & system</dd>
            </div>
            <div>
              <dt>THE PLATFORM</dt>
              <dd>iPad first · 2021</dd>
            </div>
          </dl>
        </div>
        <nav className="wx-chapters" aria-label="Welltrax case chapters">
          <div className="wx-wrap">
            {chapters.map(([id, label], i) => (
              <a href={`#wx-${id}`} key={id}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {label}
              </a>
            ))}
          </div>
        </nav>
        <section className="wx-wrap wx-chapter" id="wx-context">
          <div className="wx-kicker">01 / THE REAL WORLD</div>
          <div className="wx-editorial">
            <h2>
              The road doesn’t
              <br />
              follow a <em>happy path.</em>
            </h2>
            <div>
              <p className="wx-lead">
                Remote locations. Changing instructions. Multiple tanks. A
                connection that comes and goes.
              </p>
              <p>
                Drivers needed to manage pickups and deliveries while keeping
                track of the operational details behind each stop. The interface
                had to make a complex job readable in a demanding environment.
              </p>
              <p>
                I redesigned the experience around that reality: the load as the
                overview, the stop as the task, and a clear next action at every
                stage.
              </p>
            </div>
          </div>
          <div className="wx-constraints">
            <article>
              <span>01 — ATTENTION</span>
              <h3>Make the next step obvious.</h3>
              <p>
                Put the current stop and its action ahead of the information
                that can wait.
              </p>
            </article>
            <article>
              <span>02 — COMPLEXITY</span>
              <h3>Keep detail in context.</h3>
              <p>
                Connect tanks, contacts, timings, and documentation to the stop
                they belong to.
              </p>
            </article>
            <article>
              <span>03 — CONDITIONS</span>
              <h3>Design beyond the desk.</h3>
              <p>
                Account for night work, shared devices, and unreliable
                connectivity from the start.
              </p>
            </article>
          </div>
        </section>
        <section className="wx-flow-section" id="wx-flow">
          <div className="wx-wrap">
            <div className="wx-kicker">02 / THE NEXT MOVE</div>
            <div className="wx-editorial">
              <h2>
                A whole journey.
                <br />
                <em>One clear action.</em>
              </h2>
              <div>
                <p className="wx-lead">Review. Drive. Arrive. Complete.</p>
                <p>
                  The load view gives drivers the sequence before they start. At
                  each stop, the interface changes with the work: arrival,
                  measurements, documentation, then departure.
                </p>
                <p>
                  Future stops stay visible without competing with the task at
                  hand. Completed stops become records the driver can return to.
                </p>
              </div>
            </div>
            <div className="wx-journey" aria-label="Driver workflow">
              {[
                ['01', 'Review the load', 'Know the route and instructions.'],
                ['02', 'Start driving', 'Make the current stop explicit.'],
                [
                  '03',
                  'Record the stop',
                  'Capture the detail where it belongs.',
                ],
                ['04', 'Confirm departure', 'Close the loop and move forward.'],
              ].map(([n, title, desc]) => (
                <div key={n}>
                  <span>{n}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            <div className="wx-design-note">
              <span>THE DESIGN DECISION</span>
              <p>
                Progress should be visible in the interface, without asking the
                driver to reconstruct it from memory.
              </p>
            </div>
          </div>
        </section>
        <section className="wx-wrap wx-chapter" id="wx-detail">
          <div className="wx-kicker">03 / THE DETAILS</div>
          <div className="wx-editorial">
            <h2>
              Complex work.
              <br />
              <em>Considered structure.</em>
            </h2>
            <div>
              <p className="wx-lead">A pickup is more than a location.</p>
              <p>
                It can involve several tanks, different gauging methods,
                temperature readings, seals, and supporting documents. I grouped
                that detail into repeatable tank sections, with tabs keeping
                each tank distinct.
              </p>
              <p>
                Contacts can change in the field. Documentation belongs
                alongside the work. Validation needs to explain what to correct
                before the driver moves on.
              </p>
            </div>
          </div>
          <figure className="wx-tank-figure">
            <Image
              src="/notion/21f1aeac-566d-40a3-91f7-1a429f22a75a.webp"
              alt="Original pickup design sequence with separate tank tabs, gauging fields, measurement groups, and a general attachments section"
              width={1950}
              height={996}
            />
            <figcaption>
              One repeatable structure, adapted to multiple tanks and gauging
              methods. Original design exploration.
            </figcaption>
          </figure>
          <div className="wx-detail-notes">
            <article>
              <span>CONTEXT</span>
              <h3>One tank at a time.</h3>
              <p>
                Tank tabs contain the complexity while preserving a consistent
                form structure.
              </p>
            </article>
            <article>
              <span>CONFIDENCE</span>
              <h3>Correction before completion.</h3>
              <p>
                Required information and field-level guidance support a
                deliberate departure.
              </p>
            </article>
            <article>
              <span>CONTINUITY</span>
              <h3>Details travel with the stop.</h3>
              <p>
                Contacts, measurements, and attachments remain connected to the
                task.
              </p>
            </article>
          </div>
        </section>
        <section className="wx-night-section" id="wx-conditions">
          <div className="wx-wrap">
            <div className="wx-kicker">04 / EVERY CONDITION</div>
            <div className="wx-editorial">
              <h2>
                Same clarity.
                <br />
                <em>Different light.</em>
              </h2>
              <div>
                <p className="wx-lead">Night mode was a working requirement.</p>
                <p>
                  Drivers often worked after dark. A paired day-and-night
                  palette keeps the hierarchy familiar while changing the
                  screen’s brightness and contrast.
                </p>
                <p>
                  The wider experience also considered intermittent connectivity
                  and shared devices: drivers could change trucks or
                  transporters, and more than one person could use the same
                  tablet.
                </p>
              </div>
            </div>
            <figure className="wx-night-figure">
              <Image
                src="/notion/dfea5a93-b8ef-46cf-856b-02738a3898f9.webp"
                alt="Original Welltrax My Loads interface in night mode and day mode, with matching navigation and load hierarchy"
                width={1587}
                height={1024}
              />
              <figcaption>
                Day and night, using the same visual language. Original product
                screens.
              </figcaption>
            </figure>
            <div className="wx-system-strip">
              <div>
                <span className="wx-swatch navy" />
                <span>
                  STRUCTURE
                  <br />
                  <b>Deep navy</b>
                </span>
              </div>
              <div>
                <span className="wx-swatch orange" />
                <span>
                  ACTION
                  <br />
                  <b>Warm orange</b>
                </span>
              </div>
              <div>
                <span className="wx-swatch pale" />
                <span>
                  SPACE
                  <br />
                  <b>Soft blue</b>
                </span>
              </div>
              <p>
                A small set of reusable patterns.
                <br />A consistent language across the journey.
              </p>
            </div>
          </div>
        </section>
        <section className="wx-wrap wx-chapter wx-outcome">
          <div className="wx-kicker">THE CONTRIBUTION</div>
          <div className="wx-editorial">
            <h2>
              From isolated screens
              <br />
              to a <em>working system.</em>
            </h2>
            <div>
              <p className="wx-lead">
                A coherent driver workflow, from load review to departure.
              </p>
              <p>
                The work brought together research, user flows, iterative
                prototypes, tablet interfaces, and a reusable UI kit. Feedback
                from stakeholders, drivers, and internal teams informed the
                design iterations.
              </p>
              <p>
                The original project does not report measured post-launch
                results. This case focuses on the design decisions and delivered
                experience.
              </p>
              <div className="wx-credit">
                Original project work through Awesomic. The source case credits
                intellectual-property ownership to Awesomic, Inc. Detailed
                project walkthrough available by request.
              </div>
            </div>
          </div>
        </section>
        <section className="wx-demo-section" id="wx-experience">
          <div className="wx-wrap">
            <div className="wx-demo-heading">
              <div>
                <div className="wx-kicker">05 / EXPERIENCE THE THINKING</div>
                <h2>
                  Your next stop.
                  <br />
                  <em>Try it for yourself.</em>
                </h2>
              </div>
              <div>
                <p>
                  Review a load, record tank details, finish a delivery, and
                  explore night mode.
                </p>
                <p className="wx-small">
                  The 2026 portfolio demo revisits the original design with
                  clearer actions, saved drafts, and recoverable flows. It is a
                  demonstration, not the production application.
                </p>
              </div>
            </div>
            <WelltraxExperience />
          </div>
        </section>
        <section className="wx-wrap wx-closing">
          <span>WELLTRAX / END OF CASE</span>
          <Link href="/cases/pearl">
            <div>
              <small>UP NEXT — PEARL</small>
              <h2>
                One language for
                <br />a growing product.
              </h2>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <CaseFooter disclaimer />
    </>
  );
}
