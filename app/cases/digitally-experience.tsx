'use client';

/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- The image viewport must be focusable for keyboard scrolling when zoomed. */
/* eslint-disable next/no-img-element -- Exact source exports are pre-optimized local WebP assets with explicit dimensions. */

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import type { SubmitEvent, ReactNode } from 'react';

const root = '/images/digitally/';
const screens = [
  {
    key: 'case',
    label: 'The work',
    title: 'Case-study page',
    height: 7647,
    note: 'Original desktop design. Figures and testimonials are source-page content, not verified results of my work.',
  },
  {
    key: 'team',
    label: 'The people',
    title: 'Team-member page',
    height: 3997,
    note: 'Original desktop design. The profile includes sample name, biography and contact content.',
  },
  {
    key: 'contact',
    label: 'The conversation',
    title: 'Contact page',
    height: 1637,
    note: 'Original desktop design. The live reconstruction above demonstrates its local form states.',
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="dg-label">{children}</span>;
}

function OriginalScreen({
  name,
  children,
  className = '',
}: {
  name: string;
  children: ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const titleId = useId();
  const source = screens.find((s) => s.key === name)!;
  return (
    <div className={`dg-original ${className}`}>
      <button
        type="button"
        className="dg-screen-button"
        onClick={() => {
          setZoomed(false);
          dialog.current?.showModal();
        }}
        aria-label={`Inspect original ${source.title.toLowerCase()}`}
      >
        {children}
        <span className="dg-inspect">
          Inspect original <span aria-hidden="true">↗</span>
        </span>
      </button>
      <dialog className="dg-dialog" ref={dialog} aria-labelledby={titleId}>
        <div className="dg-dialog-bar">
          <div>
            <strong id={titleId}>{source.title}</strong>
            <p>{source.note}</p>
          </div>
          <div className="dg-dialog-actions">
            <button
              type="button"
              aria-pressed={zoomed}
              onClick={() => setZoomed(!zoomed)}
            >
              {zoomed ? 'Fit page' : 'Zoom in'}
            </button>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
            >
              Close ×
            </button>
          </div>
        </div>
        <div
          className={`dg-dialog-image ${zoomed ? 'is-zoomed' : ''}`}
          tabIndex={0}
          aria-label="Original screen, scroll to inspect"
        >
          <img
            src={`${root}${name}-full.webp`}
            alt={`Complete original Digitally ${source.title.toLowerCase()}`}
            width="1440"
            height={source.height}
            loading="lazy"
          />
        </div>
      </dialog>
    </div>
  );
}

function ServiceNavigation() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  return (
    <div
      className="dg-navigation-demo"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <nav
        aria-label="Digitally prototype navigation"
        className="dg-product-nav"
      >
        <button
          ref={trigger}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              trigger.current?.focus();
            }
          }}
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className={open ? 'is-active' : ''}
        >
          Services <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
        <a href="#dg-people" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#dg-work" onClick={() => setOpen(false)}>
          Works
        </a>
        <img src={`${root}logo.webp`} alt="Digitally" width="198" height="42" />
        <a href="#dg-gallery" onClick={() => setOpen(false)}>
          Explore pages
        </a>
        <a href="#dg-contact" onClick={() => setOpen(false)}>
          Contacts
        </a>
      </nav>
      <div id={id} className="dg-megamenu" hidden={!open}>
        <div>
          <h4>Grow Brands</h4>
          <p>
            Businesses with some revenue looking to grow exponentially in the
            new year.
          </p>
          <ul>
            {[
              'Lawyers',
              'Hospitality & Tourism',
              'Medical',
              'Wedding Industry',
              'Hotels',
              'Accountants',
              'Insurance',
              'Real-Estate',
              'Financial Services',
              'Retail',
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Ally Partners</h4>
          <p>
            Brands looking to saturate the market and become household names.
          </p>
          <ul>
            {[
              'Automotive',
              'Food & Beverage',
              'Healthcare Systems',
              'Insurance Networks',
              'Saas Platforms',
              'Insurance',
              'Hospitality Management',
              'Hotel & Restaurant Chains',
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dg-nav-art">
        <p>
          More than a Digital Agency,
          <br />
          <strong>Your Digital Ally</strong>
        </p>
        <a className="dg-oval" href="#dg-contact">
          Work With Us
        </a>
        <img
          src={`${root}home-hero.webp`}
          alt="Original oversized Digit Ally typography"
          width="1440"
          height="720"
          loading="lazy"
        />
      </div>
      <p className="dg-demo-note">
        Live menu reconstruction · Navigation connects to this case study.
      </p>
    </div>
  );
}

const intents = ['Start a Project', 'Ask Us a Question', 'Customer Support'];
function ContactDemo() {
  const [intent, setIntent] = useState(0);
  const [sent, setSent] = useState(false);
  const [compact, setCompact] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const id = useId();
  const result = useRef<HTMLOutputElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    requestAnimationFrame(() => result.current?.focus());
  }
  function reset() {
    setSent(false);
    setName('');
    setEmail('');
    setMessage('');
    setIntent(0);
    requestAnimationFrame(() => firstField.current?.focus());
  }
  return (
    <>
      <div className="dg-contact-toolbar">
        <span>LIVE PROTOTYPE / NOTHING IS SENT</span>
        <button
          type="button"
          aria-pressed={compact}
          onClick={() => setCompact(!compact)}
        >
          {compact ? 'Expand preview ↗' : 'Try narrow layout ↙'}
        </button>
      </div>
      <div className={`dg-contact-shell ${compact ? 'dg-compact' : ''}`}>
        <div className="dg-contact-ui">
          <img
            className="dg-form-contour"
            src={`${root}contour.svg`}
            alt=""
            width="621"
            height="951"
            loading="lazy"
          />
          <div className="dg-form-content">
            <h3>
              Contact <span>Digitally</span>
            </h3>
            <fieldset
              className="dg-intents"
              aria-label="Reason for contacting Digitally"
            >
              {intents.map((text, i) => (
                <button
                  type="button"
                  key={text}
                  aria-pressed={intent === i}
                  disabled={sent}
                  onClick={() => setIntent(i)}
                >
                  <img
                    src={`${root}${i === 0 ? 'layers' : 'question'}.svg`}
                    alt=""
                    width="32"
                    height="32"
                  />
                  {text}
                </button>
              ))}
            </fieldset>
            {sent ? (
              <output className="dg-form-result" ref={result} tabIndex={-1}>
                <SectionLabel>PROTOTYPE COMPLETE</SectionLabel>
                <h4>Your message is ready.</h4>
                <p>
                  You completed the{' '}
                  <strong>{intents[intent].toLowerCase()}</strong> flow. This is
                  a portfolio demonstration; nothing was sent or saved.
                </p>
                <button className="dg-send" type="button" onClick={reset}>
                  Try again <span aria-hidden="true">↗</span>
                </button>
              </output>
            ) : (
              <>
                <div className="dg-contact-intro">
                  <h4>
                    {
                      [
                        'Start a project with us',
                        'Ask us a question',
                        'Customer support',
                      ][intent]
                    }
                  </h4>
                  <p>Select a reason, then try the form below.</p>
                </div>
                <form onSubmit={submit} className="dg-form">
                  <h4>Send Us a Message</h4>
                  <div className="dg-field-row">
                    <label htmlFor={`${id}-name`}>
                      Name
                      <input
                        ref={firstField}
                        id={`${id}-name`}
                        name="name"
                        autoComplete="off"
                        required
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        pattern=".*\S.*"
                      />
                    </label>
                    <label htmlFor={`${id}-email`}>
                      Email
                      <input
                        id={`${id}-email`}
                        name="email"
                        type="email"
                        autoComplete="off"
                        required
                        maxLength={254}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                  <label htmlFor={`${id}-message`}>
                    Message
                    <textarea
                      id={`${id}-message`}
                      name="message"
                      required
                      maxLength={2000}
                      value={message}
                      onChange={(e) => {
                        e.target.setCustomValidity(
                          e.target.value.trim()
                            ? ''
                            : 'Please enter a message.',
                        );
                        setMessage(e.target.value);
                      }}
                      rows={3}
                    />
                  </label>
                  <div className="dg-submit-row">
                    <button className="dg-send" type="submit">
                      Send{' '}
                      <img
                        src={`${root}arrow.svg`}
                        alt=""
                        width="24"
                        height="24"
                      />
                    </button>
                    <p>
                      Demo only. Your entries stay in this page and are cleared
                      when you leave.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="dg-adaptation-note">
        Responsive portfolio reconstruction from the desktop design. Selection,
        validation and completion demonstrate local behavior.
      </p>
    </>
  );
}

function DetailComposition() {
  const [notes, setNotes] = useState(false);
  return (
    <div className="dg-details-composition">
      <div className="dg-detail-tools">
        <span>THE VISUAL LANGUAGE</span>
        <button
          type="button"
          aria-expanded={notes}
          aria-controls="dg-detail-notes"
          onClick={() => setNotes(!notes)}
        >
          {notes ? 'Hide' : 'Show'} design notes {notes ? '−' : '+'}
        </button>
      </div>
      <div className="dg-detail-grid">
        <div className="dg-letter">
          <span>Aa</span>
          <p>
            Poppins
            <br />A confident editorial voice.
          </p>
        </div>
        <div className="dg-lime">
          <span>#A8D200</span>
          <strong>
            A little
            <br />
            goes a long way.
          </strong>
        </div>
        <div className="dg-linework">
          <img
            src={`${root}contour.svg`}
            alt="Original fine-line contour artwork"
            width="621"
            height="951"
            loading="lazy"
          />
          <span>Movement, held in a line.</span>
        </div>
        <div className="dg-control">
          <a className="dg-oval" href="#dg-contact">
            Work With Us
          </a>
          <span>An invitation with character.</span>
        </div>
      </div>
      <div className="dg-detail-notes" id="dg-detail-notes" hidden={!notes}>
        <p>
          <strong>01 / Type.</strong> Poppins shapes the headings; Inter gives
          controls a quieter voice.
        </p>
        <p>
          <strong>02 / Contrast.</strong> Lime identifies actions and selected
          states against white and black.
        </p>
        <p>
          <strong>03 / Contours.</strong> Original line artwork carries the
          identity across page boundaries.
        </p>
        <p>
          <strong>04 / Invitation.</strong> The repeated ellipse gives the
          contact action a recognizable silhouette.
        </p>
      </div>
    </div>
  );
}

function ScreenGallery() {
  const [active, setActive] = useState(0);
  const selected = screens[active];
  return (
    <div className="dg-gallery">
      <fieldset
        className="dg-gallery-controls"
        aria-label="Choose an original page"
      >
        {screens.map((screen, i) => (
          <button
            type="button"
            key={screen.key}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {screen.label}
          </button>
        ))}
      </fieldset>
      <div aria-live="polite">
        <p className="dg-gallery-caption">
          {selected.title} <span>Original desktop / 1440 px</span>
        </p>
      </div>
      <OriginalScreen key={selected.key} name={selected.key}>
        <div className="dg-gallery-image">
          <img
            src={`${root}${selected.key}-full.webp`}
            alt={`Original ${selected.title.toLowerCase()}, select to inspect the complete page`}
            width="1440"
            height={selected.height}
            loading="lazy"
          />
        </div>
      </OriginalScreen>
      <p className="dg-source-note">{selected.note}</p>
    </div>
  );
}

export function DigitallyExperience() {
  return (
    <main id="main" className="dg-case">
      <section className="dg-hero wrap">
        <div className="dg-hero-top">
          <Link href="/cases">← All cases</Link>
          <span>WEBSITE EXTENSIONS / 2021</span>
        </div>
        <h1>
          Digitally<span aria-hidden="true">.</span>
        </h1>
        <div className="dg-hero-bottom">
          <p>
            Room for the work.
            <br />
            Space for the people.
          </p>
          <div>
            <span>UX & UI DESIGN</span>
            <a href="#dg-work">
              Explore the project <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
      <section className="dg-opening" aria-label="Original project screens">
        <div className="dg-opening-inner">
          <span className="dg-opening-label">
            ONE IDENTITY. MORE ROOM TO TELL THE STORY.
          </span>
          <OriginalScreen name="case" className="dg-opening-work">
            <img
              src={`${root}case-hero.webp`}
              alt="Digitally case-study design with its original laptop composition and contour artwork"
              width="1440"
              height="856"
              fetchPriority="high"
            />
          </OriginalScreen>
          <OriginalScreen name="team" className="dg-opening-team">
            <img
              src={`${root}team-hero.webp`}
              alt="Digitally team-member design with circular portrait and lime typography"
              width="1440"
              height="833"
            />
          </OriginalScreen>
          <span className="dg-opening-foot">CASE STUDIES ↗ TEAM PROFILES</span>
        </div>
      </section>
      <section className="dg-chapter wrap dg-idea">
        <div>
          <SectionLabel>01 / THE IDEA</SectionLabel>
          <h2>
            A bigger story.
            <br />
            The same identity.
          </h2>
        </div>
        <div>
          <p className="dg-body-large">
            An agency’s website needs to show both what it makes and who makes
            it happen.
          </p>
          <p>
            I extended Digitally’s existing website with case-study and
            team-member pages, keeping the established visual language intact.
          </p>
          <dl className="dg-metadata">
            <div>
              <dt>Role</dt>
              <dd>UX & UI Designer</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>Digital agency</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Website</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>2021</dd>
            </div>
          </dl>
        </div>
      </section>
      <section id="dg-work" className="dg-work">
        <div className="wrap dg-chapter">
          <div>
            <SectionLabel>02 / ROOM FOR THE WORK</SectionLabel>
            <h2>
              Let the project
              <br />
              take the lead.
            </h2>
          </div>
          <div>
            <p>
              The new case-study page gives a project room to unfold: a strong
              opening, a clear explanation and visual evidence along the way.
            </p>
            <p>
              I carried the site’s scale, contrast and graphic details into a
              longer editorial format.
            </p>
          </div>
        </div>
        <div className="wrap">
          <OriginalScreen name="case">
            <img
              src={`${root}case-hero.webp`}
              alt="Original case-study opening: oversized project preview on a contour background"
              width="1440"
              height="856"
              loading="lazy"
            />
          </OriginalScreen>
          <div className="dg-work-detail">
            <span>
              FROM FIRST IMPRESSION
              <br />
              TO THE STORY BEHIND IT.
            </span>
            <img
              src={`${root}case-detail.webp`}
              alt="Original landing-page conversion section with chart and explanatory text"
              width="1440"
              height="614"
              loading="lazy"
            />
          </div>
          <p className="dg-source-note">
            Original page content is shown as designed; its figures are not
            claimed as outcomes of this website work.
          </p>
        </div>
      </section>
      <section className="dg-people wrap" id="dg-people">
        <div className="dg-people-copy">
          <SectionLabel>03 / SPACE FOR THE PEOPLE</SectionLabel>
          <h2>
            Put a face
            <br />
            to the expertise.
          </h2>
          <p>
            A team profile should feel like part of the agency. The circular
            portrait, confident type and shared contact action connect the
            person to the brand.
          </p>
          <p>
            The profile leads naturally to a conversation. Follow that
            invitation into the working form.
          </p>
          <a className="dg-oval" href="#dg-contact">
            Work With Us
          </a>
          <span className="dg-small-note">
            Try the profile-to-contact journey ↓
          </span>
        </div>
        <div className="dg-people-stage">
          <OriginalScreen name="team">
            <img
              src={`${root}team-hero.webp`}
              alt="Arlene McCoy sample profile in the original team page design"
              width="1440"
              height="833"
              loading="lazy"
            />
          </OriginalScreen>
          <div className="dg-portrait-caption">
            <img
              src={`${root}portrait.webp`}
              alt="Circular portrait from the original team design"
              width="550"
              height="550"
              loading="lazy"
            />
            <div>
              <span>ONE SHARED LANGUAGE</span>
              <p>
                Distinct people.
                <br />A recognizable agency.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="dg-navigation-section">
        <div className="wrap">
          <div className="dg-chapter">
            <div>
              <SectionLabel>04 / FIND YOUR WAY</SectionLabel>
              <h2>
                More pages.
                <br />
                Still one website.
              </h2>
            </div>
            <div>
              <p>
                The shared navigation holds the experience together. Open
                Services to explore the original two-column menu, then move
                between the work, people and contact sections.
              </p>
            </div>
          </div>
          <ServiceNavigation />
        </div>
      </section>
      <section className="wrap dg-dna">
        <SectionLabel>05 / DETAILS THAT BELONG</SectionLabel>
        <h2>
          Keep the character.
          <br />
          Carry it further.
        </h2>
        <DetailComposition />
      </section>
      <section className="dg-contact-section" id="dg-contact">
        <div className="wrap">
          <div className="dg-chapter">
            <div>
              <SectionLabel>06 / START A CONVERSATION</SectionLabel>
              <h2>
                From “who are you?”
                <br />
                to “let’s talk.”
              </h2>
            </div>
            <div>
              <p>
                Three reasons to get in touch. One familiar form. Choose an
                enquiry type, enter a sample message and complete the
                interaction.
              </p>
              <div className="dg-flow">
                <span>01 Choose</span>
                <span>02 Write</span>
                <span>03 Complete</span>
              </div>
            </div>
          </div>
          <ContactDemo />
        </div>
      </section>
      <section className="wrap dg-final-showcase" id="dg-gallery">
        <div className="dg-chapter">
          <div>
            <SectionLabel>07 / THE COMPLETE PICTURE</SectionLabel>
            <h2>
              Different pages.
              <br />
              Clearly Digitally.
            </h2>
          </div>
          <p>Explore the original designs at your own pace.</p>
        </div>
        <ScreenGallery />
      </section>
      <section className="wrap dg-ending">
        <SectionLabel>DESIGNED TO BELONG</SectionLabel>
        <h2>
          More room for
          <br />
          what makes an agency.
        </h2>
        <div className="dg-ending-bottom">
          <p>
            Case-study pages. Team biographies.
            <br />A consistent visual language.
          </p>
          <p>
            UX & UI design · 2021
            <br />
            Project work through Awesomic.
          </p>
        </div>
        <p className="dg-source-note">
          This portfolio presents my website design contribution. The
          interactive reconstruction adds responsive layouts and local demo
          states to the original desktop work.
        </p>
        <Link href="/cases/opus" className="next-case">
          <div>
            <span className="eyebrow">NEXT / OPUS RENTAL MANAGEMENT</span>
            <h2>
              A clear introduction
              <br />
              to property care.
            </h2>
          </div>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
