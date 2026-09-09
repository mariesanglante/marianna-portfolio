'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
const products = [
  {
    name: 'CloudBilling Engine',
    title: 'Every complexity.\nOne clear invoice.',
    copy: 'Multi-cloud, multi-vendor, multi-currency. Bring usage, subscriptions and hybrid pricing together in one traceable billing flow.',
    tags: ['Usage-based billing', 'Flexible pricing', 'Invoice automation'],
  },
  {
    name: 'Datasets',
    title: 'Your billing data.\nA bigger picture.',
    copy: 'Bring structured billing data into your reporting workflow. Connect costs, customers and consumption to make the next decision clearer.',
    tags: ['Structured exports', 'Connected reporting', 'Cost visibility'],
  },
  {
    name: 'Managed Billing',
    title: 'More expertise.\nLess operational work.',
    copy: 'A billing operation supported by specialists. Keep your focus on customers while the recurring work follows a consistent, controlled process.',
    tags: ['Billing operations', 'Expert support', 'Repeatable processes'],
  },
];
const stages = [
  {
    title: 'Ingest & connect',
    description:
      'Usage, licence and subscription records arrive from your connected sources. Each record is mapped to its customer and product; unmatched data is flagged for review.',
    label: 'Data ingestion & resource mapping',
    items: ['Cloud usage', 'Subscriptions', 'Own services'],
    status: 'Records matched to customers',
  },
  {
    title: 'Apply the rules',
    description:
      'The engine applies the pricing logic behind every agreement: subscriptions, consumption, margins and customer-specific rates.',
    label: 'Pricing rule application',
    items: ['Usage × rate', 'Subscriptions', 'Custom margins'],
    status: 'Pricing rules applied',
  },
  {
    title: 'Review & approve',
    description:
      'Mapped usage becomes a clear invoice. Review the line items and their source before moving the billing run forward.',
    label: 'Invoice generation & approval',
    items: ['Source traceability', 'Line-item review', 'Approval'],
    status: 'Invoices ready for approval',
  },
  {
    title: 'Deliver & export',
    description:
      'Approved invoices and structured data are ready for the next step, from customer delivery to finance and reporting workflows.',
    label: 'Delivery & exports',
    items: ['Invoice PDF', 'CSV export', 'Finance systems'],
    status: 'Ready for delivery',
  },
];
export function BillingFlow({ compact = false }: { compact?: boolean }) {
  const [stage, setStage] = useState(0);
  return (
    <div className={`cw-flow ${compact ? 'cw-flow-compact' : ''}`}>
      <div className="cw-flow-heading">
        <span className="cw-kicker">THE BILLING JOURNEY</span>
        <span className="cw-live">Interactive demo</span>
      </div>
      <div className="cw-flow-grid">
        <div className="cw-steps">
          {stages.map((s, i) => (
            <div
              className={`cw-step ${stage === i ? 'is-active' : ''}`}
              key={s.title}
            >
              <button
                aria-expanded={stage === i}
                aria-controls={`flow-${compact ? 'mini' : 'full'}-${i}`}
                onClick={() => setStage(i)}
              >
                <span>0{i + 1}</span>
                {s.title}
                <b aria-hidden="true">{stage === i ? '−' : '+'}</b>
              </button>
              <div
                id={`flow-${compact ? 'mini' : 'full'}-${i}`}
                hidden={stage !== i}
              >
                <p>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cw-machine" aria-live="polite">
          <div className="cw-machine-top">
            <span>ILLUSTRATIVE BILLING RUN</span>
            <span>0{stage + 1} / 04</span>
          </div>
          <div className="cw-source-row">
            {stages[stage].items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="cw-pipeline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="cw-engine-core">
            <span className="cw-core-mark">C</span>
            <strong>CloudBilling</strong>
            <small>{stages[stage].label}</small>
          </div>
          <div className="cw-pipeline lower" aria-hidden="true">
            <i />
          </div>
          <div key={stage} className="cw-output">
            <span className="cw-signal" />
            <div>
              <small>OUTPUT / 0{stage + 1}</small>
              <strong>{stages[stage].status}</strong>
            </div>
            <span aria-hidden="true">↗</span>
          </div>
          <button className="cw-next" onClick={() => setStage((stage + 1) % 4)}>
            {stage === 3 ? 'Replay the journey' : 'Next stage'}{' '}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export function CloudbillingMotion() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-cw-reveal]');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cw-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
export default function CloudbillingWebsite() {
  const [product, setProduct] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [motion, setMotion] = useState(true);
  const requestDemo = () => {
    setSent(false);
    dialog.current?.showModal();
  };
  return (
    <div className={`cw-site ${motion ? '' : 'cw-paused'}`}>
      <CloudbillingMotion />
      <Link className="cw-skip" href="#cw-main">
        Skip to content
      </Link>
      <div className="cw-demo-bar">
        <Link href="/cases/cloudbilling">← Marianna Gonchar / Case study</Link>
        <span>Website prototype · 2026</span>
        <button onClick={() => setMotion(!motion)} aria-pressed={!motion}>
          {motion ? 'Pause motion' : 'Resume motion'}
        </button>
      </div>
      <header id="cw-top" className="cw-nav">
        <Link href="#cw-top" className="cw-brand">
          <span className="cw-core-mark">C</span>CloudBilling
          <span className="cw-brand-dot">®</span>
        </Link>
        <button
          className="cw-mobile-toggle"
          aria-expanded={menu}
          aria-controls="cw-navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? 'Close' : 'Menu'} <span>{menu ? '−' : '+'}</span>
        </button>
        <nav
          id="cw-navigation"
          className={menu ? 'is-open' : ''}
          aria-label="CloudBilling navigation"
        >
          <Link href="#products" onClick={() => setMenu(false)}>
            Products
          </Link>
          <Link href="#how-it-works" onClick={() => setMenu(false)}>
            How it works
          </Link>
          <Link href="#why-cloudbilling" onClick={() => setMenu(false)}>
            Why CloudBilling
          </Link>
          <button className="cw-button" onClick={requestDemo}>
            Request demo <span>↗</span>
          </button>
        </nav>
      </header>
      <main id="cw-main">
        <section className="cw-hero">
          <div className="cw-orbit cw-orbit-one" aria-hidden="true" />
          <div className="cw-orbit cw-orbit-two" aria-hidden="true" />
          <div className="cw-hero-copy">
            <div className="cw-kicker">
              <span className="cw-signal" /> COMPLEXITY IN. CLARITY OUT.
            </div>
            <h1>
              Billing.
              <br />
              Beautifully
              <br />
              <em>connected.</em>
            </h1>
            <p>
              Every source. Every customer. Every invoice.
              <br />
              One connected flow for the way you do business.
            </p>
            <div className="cw-actions">
              <button className="cw-button" onClick={requestDemo}>
                Let’s simplify your billing <span>↗</span>
              </button>
              <Link href="#how-it-works" className="cw-text-link">
                Explore the engine <span>↓</span>
              </Link>
            </div>
            <div className="cw-hero-note">
              Built for complexity. Designed for clarity.
            </div>
          </div>
          <div className="cw-hero-art">
            <div className="cw-art-top">
              <span>ONE CONNECTED ECOSYSTEM</span>
              <span className="cw-live">System overview</span>
            </div>
            <Image
              unoptimized
              src="/images/cloudbilling/flow-hero.png"
              alt="Public cloud, distributors and own services connected through the CloudBilling engine to invoices and data"
              width="676"
              height="794"
              fetchPriority="high"
            />
            <div className="cw-floating-label">
              <span className="cw-signal" /> From usage to understanding.
            </div>
          </div>
          <div className="cw-hero-bottom">
            <span>SCROLL TO CONNECT THE DOTS</span>
            <span>01 — 04 ↓</span>
          </div>
        </section>
        <div className="cw-capabilities">
          <span>ONE PLATFORM. MANY POSSIBILITIES.</span>
          <div>
            Multi-cloud <i /> Multi-vendor <i /> Multi-currency <i />{' '}
            Usage-based <i /> Subscription
          </div>
        </div>
        <section
          className="cw-products cw-section"
          id="products"
          data-cw-reveal
        >
          <div className="cw-section-head">
            <span className="cw-kicker">01 / THE PLATFORM</span>
            <h2>
              Your business moves forward.
              <br />
              <em>Your billing should too.</em>
            </h2>
            <p>
              Three connected offers. One consistent way to bring complexity
              into focus.
            </p>
          </div>
          <div
            className="cw-tabs"
            role="tablist"
            aria-label="CloudBilling products"
          >
            {products.map((p, i) => (
              <button
                key={p.name}
                id={`product-tab-${i}`}
                role="tab"
                aria-selected={i === product}
                aria-controls="product-panel"
                tabIndex={i === product ? 0 : -1}
                onClick={() => setProduct(i)}
                onKeyDown={(e) => {
                  if (
                    ['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)
                  ) {
                    e.preventDefault();
                    const n =
                      e.key === 'Home'
                        ? 0
                        : e.key === 'End'
                          ? 2
                          : (product + (e.key === 'ArrowRight' ? 1 : 2)) % 3;
                    setProduct(n);
                    document.getElementById(`product-tab-${n}`)?.focus();
                  }
                }}
              >
                <span>0{i + 1}</span>
                {p.name}
                <b>↗</b>
              </button>
            ))}
          </div>
          <div
            className="cw-product-panel"
            id="product-panel"
            role="tabpanel"
            aria-labelledby={`product-tab-${product}`}
          >
            <div key={product} className="cw-product-copy">
              <span className="cw-kicker">{products[product].name}</span>
              <h3>{products[product].title}</h3>
              <p>{products[product].copy}</p>
              <div className="cw-tags">
                {products[product].tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <button className="cw-text-link" onClick={requestDemo}>
                Explore what’s possible <span>↗</span>
              </button>
            </div>
            <div className={`cw-product-art product-${product}`}>
              {product === 0 ? (
                <Image
                  unoptimized
                  src="/images/cloudbilling/engine-diagram.png"
                  alt="Customers, products, pricing rules and purchases flow into the engine and produce accurate invoices"
                  width="942"
                  height="635"
                />
              ) : product === 1 ? (
                <div className="cw-data-card">
                  <span className="cw-kicker">CONNECTED INTELLIGENCE</span>
                  <h4>
                    Make every data
                    <br />
                    point count.
                  </h4>
                  <div className="cw-bars" aria-hidden="true">
                    {[38, 58, 44, 72, 60, 89, 75, 100].map((h, i) => (
                      <span
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 80}ms`,
                        }}
                        key={i}
                      />
                    ))}
                  </div>
                  <div className="cw-data-foot">Usage → Context → Insight</div>
                </div>
              ) : (
                <div className="cw-service-card">
                  <span className="cw-kicker">A CONNECTED OPERATION</span>
                  {[
                    'Data prepared',
                    'Billing reviewed',
                    'Ready for your customers',
                  ].map((t, i) => (
                    <div key={t}>
                      <span>0{i + 1}</span>
                      <strong>{t}</strong>
                      <b>✓</b>
                    </div>
                  ))}
                  <p>Your team. Supported at every step.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="cw-dark-section" id="how-it-works">
          <div className="cw-section" data-cw-reveal>
            <div className="cw-section-head">
              <span className="cw-kicker">02 / UNDER THE HOOD</span>
              <h2>
                See the flow.
                <br />
                <em>Feel the control.</em>
              </h2>
              <p>
                From raw usage to an approved invoice.
                <br />
                Explore what happens at every step.
              </p>
            </div>
            <BillingFlow />
          </div>
        </section>
        <section
          className="cw-section cw-why"
          id="why-cloudbilling"
          data-cw-reveal
        >
          <span className="cw-kicker">03 / DESIGNED AROUND YOUR REALITY</span>
          <h2>
            Complex behind the scenes.
            <br />
            <em>Clear where it counts.</em>
          </h2>
          <div className="cw-value-grid">
            {[
              [
                '01',
                'A single source of clarity',
                'Bring fragmented usage and subscription data into a connected billing story.',
              ],
              [
                '02',
                'Your rules, respected',
                'Support the pricing models and customer agreements that make your business yours.',
              ],
              [
                '03',
                'Confidence in every detail',
                'Follow the relationship between source data, applied rules and the resulting invoice.',
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n} /</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="cw-final">
          <span className="cw-kicker">04 / YOUR NEXT CHAPTER</span>
          <h2>
            Less friction.
            <br />
            <em>More forward.</em>
          </h2>
          <button className="cw-button" onClick={requestDemo}>
            Let’s talk billing <span>↗</span>
          </button>
          <span className="cw-final-word" aria-hidden="true">
            CloudBilling
          </span>
        </section>
      </main>
      <footer className="cw-footer">
        <Link className="cw-brand" href="#cw-top">
          CloudBilling®
        </Link>
        <p>
          Website design & interactive prototype
          <br />
          by Marianna Gonchar · 2026
        </p>
        <Link className="cw-text-link" href="/cases/cloudbilling">
          Behind the design ↗
        </Link>
      </footer>
      <dialog className="cw-dialog" ref={dialog}>
        <button
          className="cw-dialog-close"
          aria-label="Close demo request"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <span className="cw-kicker">EXPLORE THE EXPERIENCE</span>
        {sent ? (
          <output>
            <h2>
              You’re all set.
              <br />
              <em>That’s the flow.</em>
            </h2>
            <p>
              This is the prototype’s confirmation state. No information was
              sent or stored.
            </p>
            <button
              className="cw-button"
              onClick={() => dialog.current?.close()}
            >
              Back to exploring ↗
            </button>
          </output>
        ) : (
          <>
            <h2>
              Great billing starts
              <br />
              with a conversation.
            </h2>
            <p>
              Try the demo request experience. This portfolio prototype does not
              send or store your details.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label>
                Your name
                <input
                  required
                  name="name"
                  placeholder="Alex Morgan"
                  autoComplete="name"
                />
              </label>
              <label>
                Work email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="alex@company.com"
                  autoComplete="email"
                />
              </label>
              <label>
                What brings you here?
                <select name="interest">
                  <option>CloudBilling Engine</option>
                  <option>Datasets</option>
                  <option>Managed Billing</option>
                </select>
              </label>
              <button className="cw-button" type="submit">
                Try demo request <span>↗</span>
              </button>
            </form>
          </>
        )}
      </dialog>
    </div>
  );
}
