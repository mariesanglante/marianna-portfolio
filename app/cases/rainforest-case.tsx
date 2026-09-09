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
              A home is full of invisible activity.
              <br />
              This is how it becomes something you can understand—and control.
            </p>
            <a className="rf-link" href="#rf-experience">
              Try the experience <span>↘</span>
            </a>
          </div>
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
          <dl className="rf-facts">
            <div>
              <dt>Design scope</dt>
              <dd>
                Product UX/UI
                <br />
                Interaction & visual system
              </dd>
            </div>
            <div>
              <dt>Surfaces</dt>
              <dd>
                Mobile app
                <br />
                Desktop energy dashboard
              </dd>
            </div>
            <div>
              <dt>Prototype</dt>
              <dd>
                50 screens & states
                <br />8 connected journeys
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>
                Awareness → understanding
                <br />→ everyday control
              </dd>
            </div>
          </dl>
          <section className="rf-chapter" id="rf-challenge">
            <div>
              <span className="rf-kicker">01 / THE DESIGN PROBLEM</span>
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
                The design connects live demand, historical use, cost, and
                individual devices. The challenge is to make those different
                scales feel like one coherent experience: from a glance at the
                house to a decision about a single appliance.
              </p>
              <p>
                Setup belongs to that experience too. Until a monitor is
                connected, the dashboard needs to offer a useful next step.
              </p>
            </div>
          </section>
          <section className="rf-principles">
            <div>
              <span>01 / NOTICE</span>
              <h3>One clear signal.</h3>
              <p>
                Lead with current demand. Keep the cost and target close enough
                to give it meaning.
              </p>
            </div>
            <div>
              <span>02 / UNDERSTAND</span>
              <h3>Context, on demand.</h3>
              <p>
                Separate live readings from historical totals. Let people move
                between energy and cost.
              </p>
            </div>
            <div>
              <span>03 / ACT</span>
              <h3>A visible next step.</h3>
              <p>
                Connect the monitor, inspect a device, change a mode, or pause
                charging.
              </p>
            </div>
          </section>
        </div>
        <section className="rf-experience" id="rf-experience">
          <div className="rf-shell">
            <div className="rf-section-top">
              <div>
                <span className="rf-kicker">02 / FEEL THE DIFFERENCE</span>
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
        <section className="rf-shell rf-chapter">
          <div>
            <span className="rf-kicker">03 / THE FIRST CONNECTION</span>
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
              The EAGLE journey gives two routes into the same outcome: scan the
              code or enter the details. Clear instructions, a filled form,
              connection feedback, and a return to the dashboard turn setup into
              a complete path.
            </p>
            <p>
              Recovery is part of the flow. An unsuccessful connection keeps the
              person close to the information they need to correct.
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
            <span className="rf-kicker">04 / EVERYDAY CONTROL</span>
            <h2>
              The right control.
              <br />
              For the right device.
            </h2>
          </div>
          <div>
            <p className="rf-lead">
              A thermostat, a smart plug, and a car don’t need the same
              interface.
            </p>
            <p>
              The shared device list leads to controls shaped around the job:
              off, heat, and cool for temperature; an explicit on/off state for
              an appliance; charging speed, session use, and pause/resume for
              the car.
            </p>
            <p>
              The smart-plug setup also asks what is plugged in. That small
              detail gives a generic piece of hardware a recognizable place in
              the home.
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
              <span className="rf-kicker">05 / A WIDER VIEW</span>
              <h2>
                Zoom out.
                <br />
                Keep the context.
              </h2>
            </div>
            <div>
              <p className="rf-lead">
                The phone answers “what’s happening?” The desktop makes room for
                “how does it compare?”
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
                <span className="rf-kicker">06 / THE VISUAL LANGUAGE</span>
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
          </div>
        </section>
        <section className="rf-shell rf-delivery">
          <span className="rf-kicker">07 / WHAT THE WORK MAKES POSSIBLE</span>
          <h2>
            From an invisible system
            <br />
            to a <em>readable home.</em>
          </h2>
          <p>
            The design brings monitoring, setup, device control, and comparison
            into one product language. The connected prototype makes the
            transitions and recovery states reviewable—not just the individual
            screens.
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
            connect to hardware. No energy-saving or business-impact results are
            claimed.
          </p>
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
      <CaseFooter />
    </>
  );
}
