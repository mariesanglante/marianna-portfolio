import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, ArrowRight } from 'lucide-react';
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
            <span>SYSTEMS & PRODUCT DESIGN</span>
          </div>
          <div className="pc-hero-title">
            <h1>
              A little closer.
              <br />
              <em>By design.</em>
            </h1>
            <a href="#pc-experience" className="pc-orbit-link">
              <span aria-hidden="true">↗</span>Experience
              <br />
              the product
            </a>
          </div>
          <div className="pc-hero-bottom">
            <p>
              A shared language for the moments
              <br />
              that bring creators and their people together.
            </p>
            <span>
              ONE PRODUCT.
              <br />
              MANY WAYS TO CONNECT.
            </span>
            <a href="#pc-context" aria-label="Explore the Pearl story">
              <ArrowDown size={23} />
            </a>
          </div>
        </section>
        <section
          className="pc-showcase"
          aria-label="Pearl original product design"
        >
          <div className="pc-showcase-top">
            <span className="pc-wordmark">
              <i />
              pearl.
            </span>
            <span>A PLACE FOR YOUR PEOPLE</span>
            <span>01 — THE EXPERIENCE</span>
          </div>
          <div className="pc-showcase-art">
            <Image
              priority
              src="/notion/05d8ddd4-6026-4349-8762-701d637410ad.webp"
              alt="Original Pearl profile, feed, and community chat designs on desktop and mobile"
              width={1400}
              height={1050}
            />
          </div>
          <div className="pc-showcase-bottom">
            <span>DESKTOP ↔ MOBILE</span>
            <span>Original product designs / Pearl</span>
          </div>
        </section>
        <div className="pc-wrap">
          <dl className="pc-facts">
            <div>
              <dt>MY ROLE</dt>
              <dd>Senior UX Designer</dd>
            </div>
            <div>
              <dt>MY FOCUS</dt>
              <dd>Design system & delivery planning</dd>
            </div>
            <div>
              <dt>THE PRODUCT</dt>
              <dd>Creator & fan communities</dd>
            </div>
            <div>
              <dt>THE WORK</dt>
              <dd>Audit · Consolidate · Document</dd>
            </div>
          </dl>
        </div>
        <nav className="pc-chapters" aria-label="Pearl case chapters">
          <div className="pc-wrap">
            {[
              ['context', 'The connection'],
              ['system', 'The shared language'],
              ['craft', 'The details'],
              ['experience', 'Try Pearl'],
            ].map(([id, title], i) => (
              <a href={'#pc-' + id} key={id}>
                <span>0{i + 1}</span>
                {title}
              </a>
            ))}
          </div>
        </nav>
        <section id="pc-context" className="pc-wrap pc-section">
          <div className="pc-kicker">01 / THE CONNECTION</div>
          <div className="pc-editorial">
            <h2>
              More than content.
              <br />
              <em>A sense of belonging.</em>
            </h2>
            <div>
              <p className="pc-lead">
                Follow someone’s work. Join their world.
              </p>
              <p>
                Pearl brings exclusive content, paid interactions, and community
                conversations into one product. For creators, it is a place to
                build a closer relationship with their audience. For fans, a way
                to take part.
              </p>
              <p>
                That breadth puts pressure on the interface. A profile, a
                subscription, and a chatroom need different details — but they
                should still feel like the same place.
              </p>
            </div>
          </div>
          <PearlMoment />
          <div className="pc-principles">
            {[
              [
                '01',
                'Familiar, across features.',
                'Patterns should carry from the feed to the conversation, rather than ask people to learn a new interface.',
              ],
              [
                '02',
                'Clear, at the decision.',
                'Free following and paid interactions need distinct actions, visible terms, and understandable states.',
              ],
              [
                '03',
                'Consistent, as it grows.',
                'New components should expand the library without fragmenting the experience.',
              ],
            ].map(([n, h, p]) => (
              <article key={n}>
                <span>{n} / DESIGN INTENT</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="pc-system" className="pc-system-section">
          <div className="pc-wrap">
            <div className="pc-kicker">02 / THE SHARED LANGUAGE</div>
            <div className="pc-editorial">
              <h2>
                A growing product.
                <br />
                <em>One coherent system.</em>
              </h2>
              <div>
                <p className="pc-lead">
                  My work began with what already existed.
                </p>
                <p>
                  I reviewed the UI kit and product designs, identified
                  components that were missing from the library, and integrated
                  them into a standardized, token-based foundation.
                </p>
                <p>
                  Alongside the system, I planned the design workload week by
                  week: defining milestones, tasks, and deliverables to keep the
                  work clear and manageable.
                </p>
              </div>
            </div>
            <div className="pc-process">
              {[
                [
                  '01',
                  'Look closely.',
                  'Audit the existing screens and UI kit.',
                ],
                [
                  '02',
                  'Find the pattern.',
                  'Separate reusable structures from unique needs.',
                ],
                [
                  '03',
                  'Bring it together.',
                  'Integrate components, variants, and states.',
                ],
                [
                  '04',
                  'Make it usable.',
                  'Document purpose, usage, and specifications.',
                ],
              ].map(([n, h, p]) => (
                <article key={n}>
                  <span>{n}</span>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
            <div className="pc-system-statement">
              <span>THE PRINCIPLE</span>
              <p>
                Consistency is not making everything the same.
                <br />
                It is making the next thing <em>feel familiar.</em>
              </p>
            </div>
          </div>
        </section>
        <section id="pc-craft" className="pc-wrap pc-section">
          <div className="pc-kicker">
            03 / THE DETAILS THAT HOLD IT TOGETHER
          </div>
          <div className="pc-editorial">
            <h2>
              Small pieces.
              <br />
              <em>A recognisable whole.</em>
            </h2>
            <div>
              <p className="pc-lead">
                A library people can actually work with.
              </p>
              <p>
                Buttons, avatars, feed items, profiles, inputs, and chat
                patterns were brought into the same reference. Documentation
                explained what each component was for, how to use it, and which
                variations it supported.
              </p>
              <p>Explore a few of the original component families below.</p>
            </div>
          </div>
          <PearlLibrary />
        </section>
        <section className="pc-atmosphere">
          <div className="pc-wrap">
            <div className="pc-kicker">THE VISUAL LANGUAGE</div>
            <div className="pc-atmosphere-heading">
              <h2>
                Room for personality.
                <br />
                <em>Built on a rhythm.</em>
              </h2>
              <p>
                Soft surfaces. Expressive imagery.
                <br />A blue-to-violet thread connecting the details.
              </p>
            </div>
            <figure>
              <Image
                src="/notion/0ac34c01-3948-4b41-aa57-cace42c44618.webp"
                alt="Original Pearl dark visual explorations showing consistent profile, feed, and subscription patterns"
                width={2098}
                height={1278}
              />
              <figcaption>
                <span>EARLY VISUAL EXPLORATIONS</span>
                <span>One foundation, different expressions.</span>
              </figcaption>
            </figure>
            <div className="pc-palette">
              <div>
                <span style={{ background: '#728eff' }} />
                <p>
                  ACTION<small>Violet</small>
                </p>
              </div>
              <div>
                <span style={{ background: '#6fc4f6' }} />
                <p>
                  EXPRESSION<small>Sky blue</small>
                </p>
              </div>
              <div>
                <span style={{ background: '#f0f6ff' }} />
                <p>
                  SPACE<small>Soft blue</small>
                </p>
              </div>
              <div>
                <span style={{ background: '#222534' }} />
                <p>
                  STRUCTURE<small>Ink</small>
                </p>
              </div>
              <p>
                From foundational styles
                <br />
                to a shared interaction language.
              </p>
            </div>
          </div>
        </section>
        <section className="pc-wrap pc-section pc-outcome">
          <div className="pc-kicker">THE CONTRIBUTION</div>
          <div className="pc-editorial">
            <h2>
              Less reinvention.
              <br />
              <em>More room to create.</em>
            </h2>
            <div>
              <p className="pc-lead">
                A consolidated library. A clearer way forward.
              </p>
              <p>
                The work brought unique components into a common system and made
                their usage explicit. Designers and developers could return to
                one reference for patterns, variants, and specifications.
              </p>
              <p>
                The original project describes qualitative improvements to
                consistency and workflow. This case presents the delivered
                system and design decisions; it does not claim measured business
                results.
              </p>
              <div className="pc-credit">
                Original project work through Awesomic. Source materials credit
                intellectual-property ownership to Awesomic, Inc. Detailed
                project walkthrough available by request.
              </div>
            </div>
          </div>
        </section>
        <section id="pc-experience" className="pc-demo-section">
          <div className="pc-wrap">
            <div className="pc-kicker">04 / FROM SYSTEM TO EXPERIENCE</div>
            <div className="pc-demo-heading">
              <h2>
                Your people.
                <br />
                <em>Your place.</em>
              </h2>
              <div>
                <p>
                  Follow a creator. Save a moment.
                  <br />
                  Join the conversation.
                </p>
                <p className="pc-demo-note">
                  The refreshed prototype explores clearer navigation, distinct
                  membership decisions, and flows with a way forward — and a way
                  back.
                </p>
                <Link className="pc-inline-link" href="/pearl">
                  Explore Pearl full screen <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>
            <PearlExperience />
            <div className="pc-demo-journeys">
              <span>THINGS TO TRY</span>
              <p>
                Save a post <ArrowRight size={14} /> Find it in Saved
              </p>
              <p>
                Join the inner circle <ArrowRight size={14} /> Unlock a post
              </p>
              <p>
                Leave a comment <ArrowRight size={14} /> Keep the conversation
                going
              </p>
            </div>
          </div>
        </section>
        <section className="pc-wrap pc-closing">
          <span>PEARL / END OF CASE</span>
          <Link href="/cases/coinflix">
            <div>
              <small>UP NEXT — COINFLIX</small>
              <h2>
                A new stage
                <br />
                for <em>small stories.</em>
              </h2>
            </div>
            <ArrowUpRight size={65} />
          </Link>
          <div className="pc-closing-links">
            <Link href="/cases">← All case studies</Link>
            <a href="#main">Back to the beginning ↑</a>
          </div>
        </section>
      </main>
      <CaseFooter disclaimer />
    </>
  );
}
