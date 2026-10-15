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
            Making energy
            <br />
            <em>feel tangible.</em>
          </h1>
          <div className="rf-intro-bottom">
            <p>
              I put live demand, estimated cost, and the home’s target together,
              then gave people a path to the devices behind the reading.
            </p>
            <a className="rf-link" href="#rf-experience">
              Try the experience <span>↘</span>
            </a>
          </div>
          <p className="rf-intro-result">50 screens &amp; states · 8 connected journeys · 2 product surfaces</p>
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
            <p>Rainforest is a connected-home product for monitoring energy use and controlling devices. A kilowatt reading showed what a home was using, but did not explain whether it mattered or what someone could do next.</p>
          </div>
          <dl className="rf-facts">
            <div>
              <dt>My role</dt>
              <dd>
                Product designer · UX/UI
                <br />
                Interaction & visual system
              </dd>
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
              <dd>
                50 screens & states
                <br />8 connected journeys
              </dd>
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
                A kilowatt reading tells you what is happening. It doesn’t tell
                you whether to care—or what to do next.
              </p>
              <p>
                People managing energy at home need to move between live
                demand, historical use, cost, and individual devices. Showing
                every scale at once would make the dashboard harder to read.
              </p>
              <p>
                The experience also had to work before a monitor was connected,
                when no live data was available. Mobile and desktop needed to
                share the same home and location context.
              </p>
            </div>
          </section>
          <section className="rf-ownership">
            <span className="rf-kicker">02 / MY OWNERSHIP</span>
            <h2>From the reading to the action.</h2>
            <p>I designed the mobile and desktop UX/UI, information hierarchy, setup and recovery flows, device controls, charts, interaction states, and visual system shown here. I connected the main paths in a portfolio prototype so the transitions can be reviewed. This case shows my design contribution; the available materials do not establish ownership of product requirements, engineering, or launch outcomes.</p>
          </section>
          <section className="rf-principles">
            <div>
              <span>KEY DECISION 01 / LIVE DEMAND</span>
              <h3>Give the reading meaning.</h3>
              <p>
                A kilowatt value alone offers no threshold or action. I paired
                current demand with estimated hourly cost and the active target,
                then linked high usage to the devices behind it.
              </p>
            </div>
            <div>
              <span>KEY DECISION 02 / TIME SCALE</span>
              <h3>Separate now from history.</h3>
              <p>
                Live demand and accumulated use answer different questions. I
                kept the live view distinct and let people switch among day,
                week, month, and year totals.
              </p>
            </div>
            <div>
              <span>KEY DECISION 03 / ACTION</span>
              <h3>Connect the signal to control.</h3>
              <p>
                A useful reading should lead somewhere. The dashboard offers a
                route to connect the monitor, inspect a device, change a mode,
                or pause charging.
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
              Before the data, there is a device to connect.
            </p>
            <p>
              With no monitor connected, the dashboard cannot show live energy.
              I used the empty state to start EAGLE setup and offered both barcode
              scanning and manual entry, so a missing or unreadable code would not
              stop the journey.
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
              A shared control pattern would be consistent, but a thermostat,
              smart plug, and car charger require different actions.
            </p>
            <p>
              The shared device list leads to controls shaped around the job:
              off, heat, and cool for temperature; an explicit on/off state for
              an appliance; charging speed, session use, and pause/resume for
              the car.
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
                Mobile gives a quick reading. Comparing periods and relating
                consumption to cost needs more room.
              </p>
              <p>
                Usage and cost share the same time axis. Comparison periods add
                another layer without sending the person to a separate report. A
                consistent summary keeps the selected period, consumption, and
                cost visible together.
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
                <span className="rf-kicker">06 / DESIGN SYSTEM</span>
                <h2>
                  Quiet around the data.
                  <br />
                  <em>Alive at the center.</em>
                </h2>
              </div>
              <p>
                Dark surfaces create hierarchy. Violet connects controls and
                data. Color and motion reinforce state, alongside readable
                labels.
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
            <div className="rf-section-top"><div><span className="rf-kicker">07 / USER FLOW</span><h2>A clear path.<br /><em>Even backwards.</em></h2></div><p>The first connection sets the tone. Two ways in, an explicit confirmation, and a recovery path that keeps the entered details close.</p></div>
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
          <span className="rf-kicker">RESULT / WHAT IS DOCUMENTED</span>
          <h2>
            From an invisible system
            <br />
            to a <em>readable home.</em>
          </h2>
          <p>
            The design connects monitoring, setup, device control, and comparison
            in one product language. The prototype makes complete paths and
            recovery states reviewable, beyond individual screens.
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
          <p className="rf-evidence-note">
            This case documents the design and an AI-assisted portfolio
            reconstruction. Device data is illustrative; the prototype does not
            connect to hardware. Usability findings, launch metrics, energy savings,
            and business impact were not available for this case.
          </p>
          <div className="rf-reflection">
            <span className="rf-kicker">REFLECTION / NEXT EVIDENCE</span>
            <h3>Test comprehension before claiming impact.</h3>
            <p>With more time, I would test whether people distinguish live demand from accumulated usage, whether cost and target cues help them choose an action, and where first-time monitor setup breaks down. Those findings would guide the next iteration and provide evidence beyond the completeness of the design.</p>
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
