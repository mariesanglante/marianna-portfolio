/* Original local design exports are intentionally rendered at their native aspect ratio. */
/* oxlint-disable next/no-img-element */
import Link from 'next/link';
import { CaseHeader, CaseFooter } from './components';
import { RainforestDemo } from './rainforest-demo';
import './rainforest-case.css';

const image = (name: string) => `/images/rainforest/${name}.png`;
function Phone({
  name,
  alt,
  className = '',
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`rf-phone ${className}`}>
      <img
        src={image(name)}
        alt={alt}
        width="390"
        height="845"
        loading="lazy"
      />
    </div>
  );
}
export function RainforestCase() {
  return (
    <>
      <CaseHeader />
      <main id="main" className="rf-case">
        <section className="rf-intro rf-shell">
          <Link href="/cases" className="case-back">
            ← All cases
          </Link>
          <div className="rf-meta">
            <span>RAINFOREST / CONNECTED HOME</span>
            <span>PRODUCT DESIGN · MOBILE & WEB</span>
          </div>
          <h1>
            See the energy.
            <br />
            <em>Know what to do.</em>
          </h1>
          <div className="rf-intro-bottom">
            <p>
              I paired live demand with estimated cost and the home’s target, then
              connected the reading to the device a person could act on. In four
              months, that direction became 50 screens and states across eight
              connected journeys and two product surfaces.
            </p>
            <a className="rf-link" href="#rf-experience">
              Try the experience <span>↘</span>
            </a>
          </div>
          <div className="rf-top-metrics" aria-label="Documented project outputs">
            <article><strong>50</strong><span>Screens &amp; interaction states</span></article>
            <article><strong>8</strong><span>Connected product journeys</span></article>
            <article><strong>2</strong><span>Mobile &amp; desktop surfaces</span></article>
            <article><strong>4 <i>mo</i></strong><span>Project timeline</span></article>
          </div>
          <p className="rf-metrics-note">Documented design outputs · Production MAU, retention, conversion and handoff metrics were not available.</p>
        </section>
        <section
          className="rf-hero-art"
          aria-label="Rainforest product overview"
        >
          <div className="rf-hero-label">
            <span className="rf-live-dot" /> A PULSE ON YOUR HOME
          </div>
          <div className="rf-hero-phones">
            <Phone
              name="week"
              alt="Weekly energy use with a demand response event"
              className="rf-hero-left"
            />
            <Phone
              name="home"
              alt="Rainforest live energy dashboard showing current demand"
              className="rf-hero-center"
            />
            <Phone
              name="charging"
              alt="Wallbox charging status and energy use"
              className="rf-hero-right"
            />
          </div>
          <div className="rf-hero-foot">
            <span>
              See the demand.
              <br />
              Understand the cost.
              <br />
              Choose what happens next.
            </span>
            <span>
              01—08
              <br />
              CONNECTED JOURNEYS
            </span>
          </div>
        </section>
        <div className="rf-shell">
          <div className="rf-case-summary">
            <span className="rf-kicker">AT A GLANCE</span>
            <p><strong>Product:</strong> Rainforest, a connected-home energy product for monitoring household use and controlling devices. <strong>Problem:</strong> a kilowatt reading showed consumption, but not its cost, context, or the next useful action.</p>
          </div>
          <dl className="rf-facts">
            <div>
              <dt>My role</dt>
              <dd>User research, prototyping, UX/UI design, design system, art direction &amp; brand design</dd>
            </div>
            <div>
              <dt>Product</dt>
              <dd>
                Mobile app
                <br />
                Desktop energy dashboard
              </dd>
            </div>
            <div>
              <dt>Outcome</dt>
              <dd>50 screens &amp; states · 8 journeys · 2 surfaces</dd>
            </div>
            <div>
              <dt>Team & timeline</dt>
              <dd>
                CEO, CTO, 2 frontend engineers,
                <br />1 backend engineer &amp; QA · 4 months
              </dd>
            </div>
          </dl>
          <section className="rf-chapter" id="rf-challenge">
            <div>
              <span className="rf-kicker">01 / THE CHALLENGE</span>
              <h2>
                The number is only
                <br />
                half the story.
              </h2>
            </div>
            <div>
              <p className="rf-lead">
                For people managing energy at home, a live reading needs context
                before it can guide a decision.
              </p>
              <p>
                The product had to connect live demand, cost, historical use,
                and individual devices without crowding one dashboard with every
                time scale and control.
              </p>
              <p>
                It also needed a useful first-run state before a monitor was
                connected, device-specific controls, and a shared home and
                location context across mobile and desktop. The portfolio
                prototype uses illustrative data and does not connect to hardware.
              </p>
            </div>
          </section>
          <section className="rf-ownership">
            <span className="rf-kicker">02 / MY OWNERSHIP</span>
            <h2>Research through delivery.</h2>
            <p><strong>My scope:</strong> user research, prototyping, mobile and desktop UI design, information hierarchy, setup and recovery flows, device controls, data visualization, and art direction. I built and maintained the design system and brand expression across both surfaces.</p>
            <p><strong>Team context:</strong> I worked with a CEO, CTO, two frontend engineers, one backend engineer, and QA over four months. I owned the design work shown here; engineering and QA delivered implementation. The available case materials do not include research findings or post-launch analytics, so I make no claim about business impact.</p>
          </section>
          <section className="rf-principles">
            <div>
              <span>KEY DECISION 01 / LIVE DEMAND</span>
              <h3>Give the reading meaning.</h3>
              <p>
                <b>Trade-off:</b> a live kilowatt value is easy to scan but hard
                to interpret alone; adding every detail would crowd the overview.
                <b> Change:</b> I paired demand with estimated hourly cost and
                the home’s target, then linked the summary to the devices behind
                the reading.
              </p>
            </div>
            <div>
              <span>KEY DECISION 02 / TIME SCALE</span>
              <h3>Separate now from history.</h3>
              <p>
                <b>Trade-off:</b> mixing live demand with accumulated use blurs
                whether a number describes now or a period. <b>Change:</b> I
                separated the live view from day, week, month, and year totals;
                desktop aligns consumption and cost for period comparisons.
              </p>
            </div>
            <div>
              <span>KEY DECISION 03 / ACTION</span>
              <h3>Connect the signal to control.</h3>
              <p>
                <b>Constraint:</b> the product has no live reading before the
                monitor is connected, and controls differ by device. <b>Change:</b>
                I made setup the empty-state action, offered scan and manual
                entry, and designed controls for each device’s job.
              </p>
            </div>
          </section>
        </div>
        <section className="rf-experience" id="rf-experience">
          <div className="rf-shell">
            <div className="rf-section-top">
              <div>
                <span className="rf-kicker">EXPLORE / THE CONNECTED PROTOTYPE</span>
                <h2>
                  Less explaining.
                  <br />
                  <em>More exploring.</em>
                </h2>
              </div>
              <p>
                Move through the core journeys.
                <br />
                The screens are from the design; the controls run locally in
                this portfolio.
              </p>
            </div>
            <RainforestDemo />
          </div>
        </section>
        <section className="rf-shell rf-film-section" aria-labelledby="rf-film-title">
          <div className="rf-section-top">
            <div><span className="rf-kicker">IN MOTION / THE PRODUCT STORY</span><h2 id="rf-film-title">A home with<br /><em>a visible pulse.</em></h2></div>
            <p>From a first connection to everyday control. A short motion presentation of the product screens.</p>
          </div>
          <video controls playsInline preload="metadata" poster="/images/rainforest/editorial/01-cover.jpg" aria-label="Rainforest product film: monitoring, connection and charging" src="/videos/rainforest/rainforest-product-film.mp4" />
        </section>
        <section className="rf-shell rf-chapter">
          <div>
            <span className="rf-kicker">KEY DECISION 04 / FIRST CONNECTION</span>
            <h2>
              An empty state
              <br />
              with somewhere to go.
            </h2>
          </div>
          <div>
            <p className="rf-lead">
              <strong>Constraint:</strong> no connected monitor means no live
              data. The first screen still needs to move setup forward.
            </p>
            <p>
              <strong>Change:</strong> I turned the empty state into the EAGLE
              setup entry point and offered barcode scanning plus manual entry.
              That keeps an unreadable or unavailable barcode from blocking setup.
            </p>
            <p>
              Connection feedback confirms success and returns people to the
              dashboard. On failure, the flow keeps their entered details available
              for correction and retry.
            </p>
          </div>
        </section>
        <section className="rf-setup-strip">
          <div className="rf-shell">
            <div className="rf-screen-trio">
              <figure>
                <Phone
                  name="empty"
                  alt="Empty energy dashboard with a Connect EAGLE action"
                />
                <figcaption>
                  <b>01</b> Explain what’s missing.
                </figcaption>
              </figure>
              <figure>
                <Phone
                  name="scan"
                  alt="EAGLE barcode scanning with a manual entry alternative"
                />
                <figcaption>
                  <b>02</b> Offer another way.
                </figcaption>
              </figure>
              <figure>
                <Phone
                  name="connected"
                  alt="EAGLE connected confirmation with a return-home action"
                />
                <figcaption>
                  <b>03</b> Confirm the next step.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="rf-shell rf-chapter">
          <div>
            <span className="rf-kicker">KEY DECISION 05 / DEVICE CONTROL</span>
            <h2>
              The right control.
              <br />
              For the right device.
            </h2>
          </div>
          <div>
            <p className="rf-lead">
              <strong>Trade-off:</strong> one shared control pattern would be
              consistent, but a thermostat, smart plug, and car charger need
              different actions.
            </p>
            <p>
              <strong>Change:</strong> the shared device list leads to controls
              shaped around each job: off/heat/cool for temperature, an explicit
              on/off state for an appliance, and charging speed, session use,
              and pause/resume for the car.
            </p>
            <p>
              Smart-plug setup also asks which appliance is connected so the
              device is recognizable later.
            </p>
          </div>
        </section>
        <section className="rf-control-art">
          <div className="rf-shell rf-control-grid">
            <div className="rf-control-copy">
              <span className="rf-kicker">
                SHARED LANGUAGE. SPECIFIC BEHAVIOR.
              </span>
              <h2>
                One home.
                <br />
                <em>Many rhythms.</em>
              </h2>
              <div className="rf-mode-labels">
                <span>Off</span>
                <span>Heat</span>
                <span>Cool</span>
              </div>
              <p>
                Mode changes remain explicit. Status animation belongs to active
                processes, while the controls stay still and easy to find.
              </p>
            </div>
            <Phone name="heat" alt="Zen thermostat in heating mode" />
            <Phone
              name="charging"
              alt="Active car charging with a stop control"
            />
          </div>
        </section>
        <section className="rf-shell rf-dashboard-section">
          <div className="rf-chapter">
            <div>
              <span className="rf-kicker">KEY DECISION 06 / DESKTOP COMPARISON</span>
              <h2>
                Zoom out.
                <br />
                Keep the context.
              </h2>
            </div>
            <div>
              <p className="rf-lead">
                <strong>Trade-off:</strong> mobile is suited to a quick reading;
                comparing periods and relating use to cost needs more room.
              </p>
              <p>
                <strong>Change:</strong> on desktop, usage and cost share a time
                axis; comparison periods sit beside a consistent summary of the
                selected period, consumption, and cost.
              </p>
            </div>
          </div>
          <figure className="rf-dashboard-art">
            <img
              src={image('dashboard')}
              width="1244"
              height="904"
              alt="Desktop energy dashboard comparing energy usage and cost across two periods"
              loading="lazy"
            />
            <figcaption>
              Energy and cost, brought onto the same timeline.
            </figcaption>
          </figure>
        </section>
        <section className="rf-system">
          <div className="rf-shell">
            <div className="rf-section-top">
              <div>
                <span className="rf-kicker">KEY DECISION 07 / DESIGN SYSTEM</span>
                <h2>
                  Quiet around the data.
                  <br />
                  <em>Alive at the center.</em>
                </h2>
              </div>
              <p>
                <strong>Trade-off:</strong> two surfaces and many device states
                need a shared visual language without making unlike controls look
                identical. <strong>Change:</strong> I built and maintained shared
                type, color, spacing, and feedback rules; violet marks actions,
                while labels and state color carry meaning.
              </p>
            </div>
            <div className="rf-system-grid">
              <div className="rf-type-spec">
                <span>TYPE / ANYBODY + SATOSHI</span>
                <strong>Aa 4.332</strong>
                <p>
                  A distinctive numerical voice.
                  <br />
                  An approachable reading rhythm.
                </p>
              </div>
              <div className="rf-color-spec">
                <span>COLOR / ROLE BEFORE DECORATION</span>
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <p>Foundation · Surface · Action · Active</p>
              </div>
              <div className="rf-motion-spec">
                <span>MOTION / A QUIET STATUS SIGNAL</span>
                <div className="rf-signal" aria-hidden="true">
                  <span />
                  LIVE
                </div>
                <p>
                  Soft pulses for live activity.
                  <br />
                  Stillness for decisions.
                </p>
              </div>
            </div>
            <figure className="rf-system-board"><a href="/images/rainforest/editorial/03-design-system.jpg" target="_blank" rel="noreferrer"><img src="/images/rainforest/editorial/03-design-system.jpg" width="1920" height="1400" loading="lazy" alt="Rainforest design system: Anybody and Satoshi typography, dark foundation and layered surfaces, violet actions, status colors, buttons, selectors and feedback states" /></a><figcaption>A shared foundation for typography, controls and state. Open the board to explore the details.</figcaption></figure>
          </div>
        </section>
        <section className="rf-flow-section" id="rf-user-flow">
          <div className="rf-shell">
            <div className="rf-section-top"><div><span className="rf-kicker">KEY DECISION / SETUP &amp; RECOVERY</span><h2>A clear path.<br /><em>Even backwards.</em></h2></div><p>Two ways to connect, explicit success feedback, and a recovery path that keeps entered details close.</p></div>
            <div className="rf-flow-caption"><span>01 / CONNECT THE HOME</span><span>SETUP → FEEDBACK → LIVE DATA</span></div>
            <div className="rf-flow-path">
              <div className="rf-flow-node"><small>START</small><h3>No monitor yet</h3><p>Explain what is missing. Connect an EAGLE.</p></div><span className="rf-flow-arrow" aria-hidden="true">→</span>
              <div className="rf-flow-choice"><div className="rf-flow-node"><small>OPTION A</small><h3>Scan the barcode</h3></div><span>or</span><div className="rf-flow-node"><small>OPTION B</small><h3>Enter details</h3></div></div><span className="rf-flow-arrow" aria-hidden="true">→</span>
              <div className="rf-flow-node"><small>CONNECT</small><h3>Validate & connect</h3><p>Show progress. Keep entered values.</p></div><span className="rf-flow-arrow" aria-hidden="true">→</span>
              <div className="rf-flow-node rf-flow-success"><small>READY</small><h3>A readable home</h3><p>Confirm success. Reveal live demand.</p></div>
            </div>
            <div className="rf-flow-recovery"><span aria-hidden="true">↶</span><div><strong>Connection failed? Keep the path open.</strong><p>Explain the issue → correct the details → retry. No dead end, no starting over.</p></div></div>
            <div className="rf-flow-caption"><span>02 / EVERYDAY CONTROL</span><span>UNDERSTAND → ACT → CONFIRM</span></div>
            <ol className="rf-daily-flow">{[['Read the signal','Live demand, target and cost.'],['Choose a device','Thermostat, smart plug or charger.'],['Take control','Change a mode, switch off or pause.'],['See what changed','Explicit status. Back to the overview.']].map(([title,body],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
            <a className="rf-link" href="/images/rainforest/editorial/04-user-flow.jpg" target="_blank" rel="noreferrer">Open the complete flow <span>↗</span></a>
          </div>
        </section>
        <section className="rf-architecture-section" id="rf-architecture">
          <div className="rf-shell">
            <div className="rf-section-top"><div><span className="rf-kicker">08 / APP ARCHITECTURE</span><h2>Many functions.<br /><em>One home.</em></h2></div><p>A shared home and location context connects monitoring, device control and preferences. Desktop extends the view for comparison.</p></div>
            <div className="rf-architecture-root"><span className="rf-live-dot" /><strong>Home / location context</strong><span>The common thread.</span></div>
            <div className="rf-architecture-branches">{[
              ['01','Energy','Understand the moment.',['Live demand + targets','Demand-response events','Use by day, week, month, year','Consumption ↔ cost']],
              ['02','Devices','Act on the right appliance.',['Device list + onboarding','Thermostat modes','Smart-plug controls','EV charging + schedules']],
              ['03','Settings','Make the home your own.',['Locations + EAGLE monitor','Appearance','Notifications','Profile + support']],
              ['04','Desktop','Find the bigger pattern.',['Usage + cost overview','Period selection','Comparison periods','Aligned chart summaries']],
            ].map(([n,title,subtitle,items])=><article key={String(title)}><span>{n}</span><h3>{title}</h3><p>{subtitle}</p><ul>{(items as string[]).map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>
            <div className="rf-shared-layer"><span>SHARED EXPERIENCE LAYER</span><p>Navigation <b>·</b> Design tokens <b>·</b> Charts <b>·</b> Device states <b>·</b> Feedback & recovery</p></div>
            <p className="rf-architecture-note">Product information architecture reconstructed for this case.</p>
            <a className="rf-link" href="/images/rainforest/editorial/05-app-architecture.jpg" target="_blank" rel="noreferrer">Open the architecture board <span>↗</span></a>
            <video className="rf-system-film" controls playsInline preload="metadata" poster="/images/rainforest/editorial/03-design-system.jpg" aria-label="Rainforest systems film: design system, user flow and app architecture" src="/videos/rainforest/rainforest-system-film.mp4" />
          </div>
        </section>
        <section className="rf-shell rf-delivery">
          <span className="rf-kicker">05 / RESULT</span>
          <h2>
            From an invisible system
            <br />
            to a <em>readable home.</em>
          </h2>
          <p>
            The deliverable was a connected product direction: 50 screens and
            interaction states, eight core journeys, and mobile plus desktop
            surfaces. The prototype makes setup, control, comparison, and
            recovery reviewable as end-to-end paths.
          </p>
          <div className="rf-outcome-grid">
            <div>
              <strong>50</strong>
              <span>Screens & interaction states</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Core journeys</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Connected product surfaces</span>
            </div>
          </div>
          <div className="rf-impact-panel">
            <span>PRODUCT IMPACT / NOT RECORDED</span>
            <strong>MAU · retention · activation · conversion · handoff time</strong>
            <p>No verified baseline or post-launch values were available. I’m not presenting design outputs as proof of business impact.</p>
          </div>
          <div className="rf-measurement-plan">
            <span className="rf-kicker">NEXT / MEASURES TO COLLECT</span>
            <div>
              <article><b>Activation</b><p>Share of new accounts that connect an EAGLE and view a first reading. Compare pre/post design or experiment variants.</p></article>
              <article><b>Retention</b><p>30-day return rate for activated households, segmented by first device setup and repeat energy checks.</p></article>
              <article><b>Conversion</b><p>Monitor setup starts that reach a successful connection and first live reading.</p></article>
              <article><b>Handoff</b><p>Median time from design approval to engineer-ready implementation, plus clarification or rework count.</p></article>
            </div>
            <p className="rf-evidence-note">Baselines, targets, and results are unreported in the source materials; these are proposed definitions, not achieved outcomes.</p>
          </div>
          <div className="rf-reflection">
            <span className="rf-kicker">06 / REFLECTION</span>
            <h3>Validate comprehension, then measure behavior.</h3>
            <p>With more time, I would test whether people distinguish live demand from accumulated use, whether cost and target cues help them choose a device action, and where monitor setup breaks down. I would instrument setup completion and first-reading activation, then track 30-day retention and handoff time against a documented baseline before making impact claims.</p>
          </div>
          <a className="rf-link" href="#rf-experience">
            Explore the interactions again <span>↑</span>
          </a>
        </section>
        <section className="rf-shell rf-library">
          <div className="rf-section-top">
            <div>
              <span className="rf-kicker">THE DETAILS / SCREEN LIBRARY</span>
              <h2>Every state has a job.</h2>
            </div>
            <p>Explore the design details at full size.</p>
          </div>
          <div className="rf-library-grid">
            {[
              ['home', 'Live demand'],
              ['week', 'Weekly use'],
              ['cost', 'Energy cost'],
              ['devices', 'My devices'],
              ['thermostat', 'Thermostat off'],
              ['heat', 'Heating'],
              ['cool', 'Cooling'],
              ['charging', 'Charging'],
              ['paused', 'Charging paused'],
              ['empty', 'No monitor connected'],
              ['connect', 'Connection options'],
              ['scan', 'Barcode scan'],
              ['manual', 'Manual entry'],
              ['filled', 'Ready to connect'],
              ['error', 'Connection recovery'],
              ['connected', 'Connected'],
              ['add', 'Add a device'],
              ['type', 'Choose device type'],
              ['manufacturer', 'Manufacturer'],
              ['model', 'Model selection'],
              ['details', 'Device details'],
              ['added', 'Device added'],
              ['plug', 'Smart-plug details'],
              ['plug-appliance', 'What’s plugged in?'],
              ['plug-added', 'Smart plug added'],
              ['on', 'Appliance on'],
              ['off', 'Appliance off'],
              ['settings', 'Settings'],
              ['location', 'Location details'],
              ['light', 'Light appearance'],
            ].map(([name, label]) => (
              <a key={name} href={image(name)} target="_blank" rel="noreferrer">
                <img
                  src={image(name)}
                  alt={label}
                  width="390"
                  height="845"
                  loading="lazy"
                />
                <span>{label} ↗</span>
              </a>
            ))}
          </div>
        </section>
        <div className="rf-shell">
          <Link className="next-case" href="/cases/ascy">
            <div>
              <span className="eyebrow">NEXT / ASCY</span>
              <h2>
                A thought.
                <br />
                Already a note.
              </h2>
            </div>
            <span>↗</span>
          </Link>
        </div>
      </main>
      <CaseFooter disclaimer />
    </>
  );
}
