'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
const base = '/images/cloudbilling/final/';
function Asset({
  file,
  alt = '',
  className = '',
  width = 24,
  height = 24,
}: {
  file: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      unoptimized
      src={base + file}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
function Arrow() {
  return (
    <Asset file="1491-14619-imgProperty1Arrow.svg" className="cbf-arrow" />
  );
}
export function CloudbillingBrand({ green = false }: { green?: boolean }) {
  return (
    <span className="cbf-brand">
      <Asset
        file={
          green ? '1142-41031-imgGroup36602.svg' : '618-5689-imgGroup36602.svg'
        }
        width={32}
        height={32}
      />
      <Asset
        file={
          green
            ? '1142-41031-imgCloudBilling.svg'
            : '618-5689-imgCloudBilling.svg'
        }
        alt="CloudBilling"
        width={152}
        height={26}
      />
    </span>
  );
}
export function CloudbillingHeroDiagram() {
  return (
    <figure
      className="cbf-diagram"
      aria-label="Public cloud, distributors and own services flow through the CloudBilling engine to accurate invoices and structured billing data"
    >
      <div className="cbf-diagram-glow" />
      <Asset
        file="1142-41031-imgSvg.svg"
        className="cbf-connections"
        width={640}
        height={600}
      />
      <div className="cbf-glass cbf-public">
        <strong>PUBLIC CLOUD</strong>
        <div className="cbf-provider-pair">
          <div>
            <span>Microsoft</span>
            <small>Azure</small>
          </div>
          <div>
            <span className="cbf-aws">
              <Asset file="1142-41031-imgVector.svg" width={18} height={6} />
              <Asset file="1142-41031-imgGroup1.svg" width={18} height={4} />
            </span>
            <span>Amazon</span>
            <small>AWS</small>
          </div>
        </div>
        <span className="cbf-more">+ more</span>
      </div>
      <div className="cbf-glass cbf-distributors">
        <strong>DISTRIBUTORS</strong>
        <div className="cbf-vendors">
          {[
            ['imgArrow4Logo.svg', 'Arrow'],
            ['imgCopacoCloudLogo1.png', 'Copaco'],
            ['imgTdsynnexLogoDefault1.png', 'TD Synnex'],
            ['imgPax8Wht1.svg', 'Pax8'],
          ].map(([file, name]) => (
            <div key={name}>
              <span>
                <span
                  className={`cbf-logo-crop ${name === 'Copaco' ? 'cbf-copaco' : name === 'TD Synnex' ? 'cbf-synnex' : ''}`}
                >
                  <Asset file={'1142-41031-' + file} />
                </span>
              </span>
              <small>{name}</small>
            </div>
          ))}
        </div>
        <span className="cbf-more-text">20+ more</span>
      </div>
      <div className="cbf-glass cbf-own">
        <strong>OWN SERVICES</strong>
        <div>
          Virtualization and
          <br />
          Private Cloud Platforms
        </div>
        <div>Monitoring and RMM tools</div>
        <div>Manual Data</div>
        <span className="cbf-more-text">API</span>
      </div>
      <div className="cbf-glass cbf-central">
        <strong>BILLING ENGINE</strong>
        <CloudbillingBrand green />
      </div>
      <div className="cbf-glass cbf-invoices">
        <div className="cbf-output-icon">
          <Asset file="1142-41031-imgGroup2.svg" />
        </div>
        <div>
          <b>Invoices</b>
          <p>
            Accurate, branded invoices
            <br />
            per customer & subscription
          </p>
        </div>
      </div>
      <div className="cbf-glass cbf-data">
        <div>
          <span className="cbf-output-icon">
            <Asset file="1142-41031-imgGroup3.svg" />
          </span>
          <b>Data</b>
        </div>
        <p>
          Exports, REST API &<br />
          structured billing
          <br />
          data streams
        </p>
      </div>
      <span className="cbf-flow-dot cbf-flow-dot-one" />
      <span className="cbf-flow-dot cbf-flow-dot-two" />
      <span className="cbf-flow-dot cbf-flow-dot-three" />
    </figure>
  );
}
const problems = [
  {
    title: 'Time-consuming and manual work',
    icon: 'imgFrame.svg',
    body: 'Scattered usage data and manual spreadsheet work slow down each billing cycle. Bring the data together and automate the steps between usage and invoice.',
  },
  {
    title: 'No clear billing',
    icon: 'imgFrame3.svg',
    body: 'Connect every resource to the right customer. A clear relationship between source data, pricing rules and invoices makes billing easier to explain.',
  },
  {
    title: 'Revenue leakage',
    icon: 'imgFrame2.svg',
    body: 'Unmapped resources and missed charges leave revenue uncollected. Consistent resource mapping makes exceptions visible before invoices are sent.',
  },
  {
    title: 'Invoice disputes',
    icon: 'imgFrame4.svg',
    body: 'Make every invoice traceable to the underlying usage and pricing rules, so your team can answer customer questions with confidence.',
  },
];
const differentiators = [
  [
    'Deep billing expertise',
    'We understand the intricacies of multi-cloud environments, vendor pricing, and subscription models inside out. So you can focus on your customers.',
    'imgGroup.svg',
    'imgSvg.svg',
  ],
  [
    'Smart resource mapping',
    'We map every resource to the right customer. No more guesswork, just accurate invoices.',
    'imgGroup1.svg',
    'imgGroup2.svg',
  ],
  [
    'Partner mindset',
    'We work with you. Your growth is our growth.',
    'imgGroup3.svg',
    'imgGroup4.svg',
  ],
  [
    'Pragmatic delivery',
    'Concrete results. Success means hours saved, revenue recovered and invoice accuracy.',
    'imgGroup5.svg',
    'imgGroup6.svg',
  ],
];
const products = [
  {
    name: 'CloudBilling Engine',
    title: 'Automated invoicing for any complexity',
    copy: 'Multi-cloud, multi-vendor, multi-currency. Usage-based, subscriptions, or hybrid. The CloudBilling engine handles it all and generates accurate invoices with full traceability of products and usage.',
    image: '/images/cloudbilling/engine-diagram.png',
  },
  {
    name: 'Datasets',
    title: 'All your billing data in one place',
    copy: 'Usage, products, customers, and invoices consolidated into an analytics-ready dataset. Build dashboards, integrate with other systems, or automate complex reporting.',
    image: base + 'datasets.png',
  },
  {
    name: 'Managed Billing',
    title: 'Expert validation before every invoice',
    copy: 'We compare source data from your providers against CloudBilling, flag discrepancies, and confirm accuracy. Only then do you approve and send.',
    image: base + 'managed.png',
  },
];
const integrations = [
  'AWS',
  'Microsoft',
  'Google Cloud',
  'VMware',
  'Pax8',
  'Ingram Micro',
  'TD Synnex',
  'Business Central',
];
const faq = [
  [
    'What does CloudBilling cost?',
    'Pricing depends on your billing complexity, connected sources and operational requirements. Request a demo to discuss the scope that fits your business.',
  ],
  [
    'Who is CloudBilling for?',
    'CloudBilling is designed for cloud providers, managed service providers and SaaS businesses managing complex usage-based, subscription or hybrid billing.',
  ],
  [
    'What is revenue leakage and how much am I losing?',
    'Revenue leakage is usage or services that are delivered but never correctly invoiced. Your actual exposure depends on your data and processes; reviewing unmatched resources and missed charges is a useful starting point.',
  ],
  [
    'How long does implementation take?',
    'Implementation depends on your source systems, pricing rules and data readiness. The process includes connecting sources, mapping customers and resources, configuring rules, and validating invoices before going live.',
  ],
  [
    'Why choose CloudBilling over building in-house?',
    'A dedicated billing platform brings integrations, resource mapping and billing logic together, reducing the need to build and maintain that infrastructure internally.',
  ],
];
const menus: Record<
  string,
  { label: string; href: string; description: string }[]
> = {
  Products: [
    {
      label: 'CloudBilling Engine',
      href: '#platform',
      description: 'Automated invoicing for any complexity',
    },
    {
      label: 'Datasets',
      href: '#platform',
      description: 'Your billing data in one place',
    },
    {
      label: 'Managed Billing',
      href: '#platform',
      description: 'Expert validation before every invoice',
    },
    {
      label: 'Integrations',
      href: '#integrations',
      description: 'Connect your existing ecosystem',
    },
  ],
  Solutions: [
    {
      label: 'Billing automation',
      href: '#solution',
      description: 'From multi-vendor usage to accurate invoices',
    },
    {
      label: 'Resource mapping',
      href: '#approach',
      description: 'Every resource, matched to the right customer',
    },
    {
      label: 'Revenue assurance',
      href: '#problem',
      description: 'Bring missed charges into view',
    },
  ],
  Markets: [
    {
      label: 'Cloud providers',
      href: '#platform',
      description: 'Multi-cloud and multi-vendor billing',
    },
    {
      label: 'Managed service providers',
      href: '#solution',
      description: 'Bring order to complex MSP billing',
    },
    {
      label: 'SaaS businesses',
      href: '#platform',
      description: 'Subscriptions, usage-based and hybrid models',
    },
  ],
  Resources: [
    {
      label: 'Frequently asked questions',
      href: '#faq',
      description: 'Answers to common billing questions',
    },
    {
      label: 'Customer story',
      href: '#customer-story',
      description: 'The personal touch at Wolters Kluwer',
    },
    {
      label: 'Design case study',
      href: '/cases/cloudbilling',
      description: 'Explore the thinking behind this website',
    },
  ],
  Company: [
    {
      label: 'Our approach',
      href: '#approach',
      description: 'A partner mindset and pragmatic delivery',
    },
    {
      label: 'Contact',
      href: '#contact',
      description: 'Let’s talk about your billing',
    },
    {
      label: 'Support',
      href: '#faq',
      description: 'Find answers and explore the platform',
    },
  ],
};
export default function CloudbillingFinalHome() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [product, setProduct] = useState(0);
  const [problem, setProblem] = useState<number | null>(null);
  const [question, setQuestion] = useState<number | null>(null);
  const [motion, setMotion] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState('contact');
  const [filter, setFilter] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  const show = (type = 'contact') => {
    setSubmitted(false);
    setModal(type);
    setFilter('');
    setOpenMenu(null);
    setMobile(false);
    dialog.current?.showModal();
  };
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (header.current && !header.current.contains(e.target as Node))
        setOpenMenu(null);
    };
    const escape = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        header.current?.contains(document.activeElement)
      ) {
        header.current
          .querySelector<HTMLButtonElement>('button[aria-expanded="true"]')
          ?.focus();
        setOpenMenu(null);
        setMobile(false);
      }
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cbf-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll('[data-cbf-reveal]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`cbf-home ${motion ? '' : 'cbf-paused'}`}>
      <Link className="cbf-skip" href="#cbf-main">
        Skip to content
      </Link>
      <header ref={header} className="cbf-nav" id="cbf-top">
        <Link href="#cbf-top" aria-label="CloudBilling home">
          <CloudbillingBrand />
        </Link>
        <button
          className="cbf-menu-toggle"
          aria-expanded={mobile}
          aria-controls="cbf-menu"
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? 'Close' : 'Menu'}{' '}
          <span aria-hidden="true">{mobile ? '−' : '+'}</span>
        </button>
        <nav
          aria-label="Main navigation"
          id="cbf-menu"
          className={mobile ? 'is-open' : ''}
        >
          {Object.keys(menus).map((name) => (
            <div className="cbf-nav-item" key={name}>
              <button
                aria-expanded={openMenu === name}
                aria-controls={`cbf-menu-${name}`}
                onClick={() => setOpenMenu(openMenu === name ? null : name)}
              >
                {name}
                <Asset file="618-5689-imgFrame.svg" width={14} height={14} />
              </button>
              <div
                className="cbf-dropdown"
                id={`cbf-menu-${name}`}
                hidden={openMenu !== name}
              >
                {menus[name].map((item, i) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      if (name === 'Products' && i < 3) setProduct(i);
                      setOpenMenu(null);
                      setMobile(false);
                    }}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="cbf-nav-actions">
          <Link href="#faq">Support</Link>
          <button className="cbf-button" onClick={() => show()}>
            Contact Us
          </button>
        </div>
      </header>
      <main id="cbf-main">
        <section className="cbf-hero cbf-shell">
          <div className="cbf-hero-copy">
            <span className="cbf-eyebrow">CLOUD & SAAS BILLING PLATFORM</span>
            <h1>
              We master billing
              <br className="cbf-desktop-break" /> complexity for
              <br className="cbf-desktop-break" /> <span>Cloud Providers.</span>
            </h1>
            <p>
              MSP billing involves scattered usage data, pricing rules buried in
              spreadsheets, and hours spent on manual processes. CloudBilling
              brings order. Every resource mapped to the right customer.
              <br />
              Every invoice accurate.
            </p>
            <div className="cbf-actions">
              <button className="cbf-button" onClick={() => show()}>
                Get in Touch
              </button>
              <Link className="cbf-button cbf-button-outline" href="#approach">
                See How it Works
              </Link>
            </div>
          </div>
          <CloudbillingHeroDiagram />
        </section>
        <section className="cbf-logos cbf-shell" aria-label="Trusted companies">
          <span>TRUSTED BY INNOVATIVE COMPANIES</span>
          <div>
            <Asset
              file="618-6571-imgAkamaiLogoV51.svg"
              alt="Akamai"
              width={120}
              height={44}
            />
            <span className="cbf-vm-logo">
              <Asset
                file="618-6571-imgGroup1.svg"
                alt="VMware"
                width={126}
                height={24}
              />
              <Asset
                file="618-6571-imgGroup.svg"
                alt="by Broadcom"
                width={72}
                height={11}
              />
            </span>
            <Asset
              file="618-6571-imgFicoLogoWhite1.svg"
              alt="FICO"
              width={116}
              height={41}
            />
            <Asset
              file="618-6571-imgRsLogo2021B1.svg"
              alt="Rackspace Technology"
              width={126}
              height={39}
            />
          </div>
        </section>
        <section className="cbf-problem cbf-shell" id="problem">
          <div className="cbf-heading" data-cbf-reveal>
            <span className="cbf-eyebrow">THE PROBLEM</span>
            <h2>What billing really takes</h2>
            <p>
              Without intelligent automation, managing billing for complex cloud
              and SaaS businesses
              <br className="cbf-desktop-break" /> means dealing with constant
              challenges that drain resources and hurt revenue.
            </p>
          </div>
          <div className="cbf-problem-grid">
            {problems.map((p, i) => (
              <article className={problem === i ? 'is-open' : ''} key={p.title}>
                <button
                  onClick={() => setProblem(problem === i ? null : i)}
                  aria-expanded={problem === i}
                  aria-controls={`cbf-problem-${i}`}
                >
                  <span className="cbf-problem-icon">
                    <Asset file={'618-6617-' + p.icon} />
                  </span>
                  {p.title}
                  <Asset
                    file="618-6617-imgFrame1.svg"
                    className="cbf-problem-chevron"
                  />
                </button>
                <p id={`cbf-problem-${i}`} hidden={problem !== i}>
                  {p.body}
                </p>
              </article>
            ))}
          </div>
          <button className="cbf-button" onClick={() => show()}>
            Request a Demo <Arrow />
          </button>
        </section>
        <div className="cbf-section-bridge cbf-shell" aria-hidden="true" />
        <section className="cbf-approach cbf-shell" id="approach">
          <div className="cbf-heading" data-cbf-reveal>
            <span className="cbf-eyebrow">OUR APPROACH</span>
            <h2>
              We absorb billing complexity
              <br />
              so you can focus on growth
            </h2>
            <p>
              Cloud platforms, distributors, and vendors were built for their
              own purposes. After
              <br className="cbf-desktop-break" /> years of growth, their
              systems become a maze of subscriptions.
              <br />
              We made it our mission to master that maze.
            </p>
          </div>
          <div className="cbf-differentiators">
            <h3>Four differentiators</h3>
            {differentiators.map(([title, copy, left, right], i) => (
              <article key={title} data-cbf-reveal>
                <div>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </div>
                <div className="cbf-mini-illustration" aria-hidden="true">
                  <div>
                    <span>
                      <Asset file={'1491-14385-' + left} />
                    </span>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="cbf-mini-result">
                    <span>
                      <Asset file={'1491-14385-' + right} />
                    </span>
                    {i === 3 ? <i className="cbf-result-bar" /> : <b>••</b>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="cbf-solution cbf-shell" id="solution">
          <div className="cbf-heading" data-cbf-reveal>
            <span className="cbf-eyebrow">SOLUTION</span>
            <h2>
              An automated billing platform that turns
              <br className="cbf-desktop-break" /> complex multi-vendor usage
              into
              <br className="cbf-desktop-break" /> accurate customer invoices
            </h2>
          </div>
          <div className="cbf-solution-grid">
            <ul>
              {[
                '100% accurate billing data you can trust',
                'Automate up to 90% of your billing work',
                'Process invoices 93% faster',
                'Recover the 2–4% revenue that currently remains uncollected',
                'Connect with 10+ cloud providers, distributors, and vendors out of the box',
              ].map((text) => (
                <li key={text}>
                  <Asset file="1491-14655-imgSvg.svg" width={20} height={20} />
                  {text}
                </li>
              ))}
            </ul>
            <div className="cbf-solution-card">
              <h3>Automated invoicing for any complexity</h3>
              <p>
                Multi-cloud, multi-vendor, multi-currency. Usage-based,
                subscriptions, or hybrid—CloudBilling generates accurate,
                explainable invoices.
              </p>
              <div className="cbf-meter-pair">
                <div>
                  <strong>Usage & pricing</strong>
                  <i />
                  <i />
                  <span>
                    Feeds <span>Rules</span>
                  </span>
                </div>
                <div>
                  <strong>Invoice output</strong>
                  <i />
                  <i />
                  <span>
                    Accuracy <span>Speed</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cbf-platform cbf-shell" id="platform">
          <div className="cbf-heading" data-cbf-reveal>
            <span className="cbf-eyebrow">PLATFORM OVERVIEW</span>
            <h2>The all-in-one billing platform</h2>
            <p>
              Four core modules working together to turn billing complexity into
              accurate,
              <br className="cbf-desktop-break" /> explainable invoices.
            </p>
          </div>
          <div className="cbf-product-panel">
            <div className="cbf-product-copy">
              <div
                className="cbf-product-tabs"
                role="tablist"
                aria-label="Platform products"
              >
                {products.map((p, i) => (
                  <button
                    id={`cbf-product-${i}`}
                    key={p.name}
                    role="tab"
                    aria-selected={product === i}
                    tabIndex={product === i ? 0 : -1}
                    aria-controls="cbf-product-content"
                    onClick={() => setProduct(i)}
                    onKeyDown={(e) => {
                      if (
                        ['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(
                          e.key,
                        )
                      ) {
                        e.preventDefault();
                        const n =
                          e.key === 'Home'
                            ? 0
                            : e.key === 'End'
                              ? 2
                              : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3;
                        setProduct(n);
                        document.getElementById(`cbf-product-${n}`)?.focus();
                      }
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <div
                id="cbf-product-content"
                role="tabpanel"
                aria-labelledby={`cbf-product-${product}`}
                key={product}
              >
                <h3>{products[product].title}</h3>
                <p>{products[product].copy}</p>
                <button className="cbf-button" onClick={() => show()}>
                  Request demo <Arrow />
                </button>
              </div>
            </div>
            <Image
              unoptimized
              src={products[product].image}
              alt={`${products[product].name} process illustration`}
              width={568}
              height={383}
              className="cbf-product-image"
            />
          </div>
        </section>
        <section className="cbf-integrations cbf-shell" id="integrations">
          <div className="cbf-heading" data-cbf-reveal>
            <span className="cbf-eyebrow">INTEGRATIONS</span>
            <h2>Works with the tools you already use</h2>
            <p>
              10+ ready-made integrations with cloud providers, distributors,
              and accounting systems.
            </p>
          </div>
          <div className="cbf-integration-list">
            {integrations.map((name, i) => (
              <button
                key={name}
                onClick={() => {
                  show('integrations');
                  setFilter(name);
                }}
              >
                <Asset
                  file={`618-6844-imgFrame${i % 7 === 0 ? '' : i % 7}.svg`}
                />
                {name}
              </button>
            ))}
          </div>
          <button
            className="cbf-text-button"
            onClick={() => show('integrations')}
          >
            See All Integrations <Asset file="618-6844-imgIcon.svg" />
          </button>
        </section>
        <section className="cbf-testimonial cbf-shell" id="customer-story">
          <div className="cbf-testimonial-card">
            <Asset
              file="618-6852-imgGroup36634.svg"
              className="cbf-testimonial-mark"
              width={700}
              height={860}
            />
            <Asset
              file="618-6852-imgSvg.svg"
              className="cbf-quote-icon"
              width={42}
              height={42}
            />
            <blockquote>
              “The personal touch of CloudBilling is
              <br className="cbf-desktop-break" /> great. We really feel that
              we’re more
              <br className="cbf-desktop-break" /> than just a number.”
            </blockquote>
            <div className="cbf-person">
              <Asset
                file="618-6852-imgManfred.png"
                alt="Manfred van der Hart"
                width={48}
                height={48}
              />
              <div>
                <strong>Manfred van der Hart</strong>
                <span>Financial Director, Wolters Kluwer</span>
              </div>
            </div>
            <button className="cbf-text-button" onClick={() => show('story')}>
              Read Case Study <Asset file="618-6852-imgIcon.svg" />
            </button>
          </div>
        </section>
        <section className="cbf-faq cbf-shell" id="faq">
          <h2>Frequently asked questions</h2>
          <div>
            {faq.map(([q, a], i) => (
              <article key={q}>
                <button
                  aria-expanded={question === i}
                  aria-controls={`cbf-answer-${i}`}
                  onClick={() => setQuestion(question === i ? null : i)}
                >
                  {q}
                  <span aria-hidden="true">{question === i ? '−' : '+'}</span>
                </button>
                <p id={`cbf-answer-${i}`} hidden={question !== i}>
                  {a}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="cbf-cta cbf-shell" id="contact">
          <div className="cbf-powered">
            <Asset file="1469-16150-imgFrame.svg" width={16} height={16} />
            Powered by AI-driven automation
            <Asset file="1469-16150-imgFrame1.svg" width={20} height={20} />
          </div>
          <h2>
            Go from manual billing to
            <br />
            <span>fully automated</span> today
          </h2>
          <p>
            Join cloud providers and SaaS businesses that trust CloudBilling to
            automate their
            <br className="cbf-desktop-break" /> order-to-cash operations with
            intelligent AI.
          </p>
          <div className="cbf-actions">
            <button className="cbf-button" onClick={() => show()}>
              Request a Demo <Asset file="1469-16150-imgIcon.svg" />
            </button>
            <button className="cbf-text-button" onClick={() => show()}>
              Talk to Sales
            </button>
          </div>
          <div className="cbf-compliance">
            <span>Your data, safe and compliant</span>
            <span>
              <Asset file="1469-16150-imgFrame2.svg" />
              ISO 27001 Certified
            </span>
            <span>
              <Asset file="1469-16150-imgFrame2.svg" />
              GDPR Compliant
            </span>
          </div>
        </section>
      </main>
      <footer className="cbf-footer">
        <div className="cbf-footer-grid">
          <div>
            <Link href="#cbf-top" aria-label="CloudBilling home">
              <CloudbillingBrand />
            </Link>
            <p>
              Automated billing for complex cloud
              <br />
              and SaaS businesses. Fast, accurate,
              <br />
              and consolidated invoices at scale.
            </p>
          </div>
          <div>
            <h3>Product</h3>
            <Link href="#platform">Features</Link>
            <Link href="#integrations">Integrations</Link>
            <Link href="#faq" onClick={() => setQuestion(0)}>
              Pricing
            </Link>
            <button onClick={() => show('updates')}>Changelog</button>
          </div>
          <div>
            <h3>Resources</h3>
            <Link href="#approach">Documentation</Link>
            <Link href="#approach">Guides</Link>
            <Link href="/cases/cloudbilling">Blog</Link>
            <Link href="#faq">Support</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="#approach">About</Link>
            <button onClick={() => show('company')}>Careers</button>
            <button onClick={() => show()}>Contact</button>
            <Link href="#integrations">Partners</Link>
          </div>
          <div>
            <h3>Legal</h3>
            <button onClick={() => show('privacy')}>Privacy</button>
            <button onClick={() => show('terms')}>Terms</button>
          </div>
        </div>
        <div className="cbf-footer-bottom">
          <span>© 2026 CloudBilling. All rights reserved.</span>
          <div>
            <button onClick={() => show('privacy')}>Privacy Policy</button>
            <button onClick={() => show('terms')}>Terms of Service</button>
          </div>
        </div>
        <div className="cbf-prototype-credit">
          <Link href="/cases/cloudbilling">
            Portfolio prototype by Marianna Gonchar · View case study ↗
          </Link>
          <button aria-pressed={!motion} onClick={() => setMotion(!motion)}>
            {motion ? 'Pause animations' : 'Resume animations'}
          </button>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="cbf-dialog"
        aria-label={
          modal === 'contact'
            ? 'Request a CloudBilling demo'
            : modal === 'integrations'
              ? 'Explore integrations'
              : 'CloudBilling information'
        }
      >
        <button
          className="cbf-close"
          aria-label="Close dialog"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        {modal === 'contact' ? (
          submitted ? (
            <div>
              <span className="cbf-eyebrow">DEMO REQUEST</span>
              <h2>Thank you for exploring.</h2>
              <p>
                You’ve reached the confirmation state. This is a portfolio
                prototype: your details have not been sent or stored.
              </p>
              <button
                className="cbf-button"
                onClick={() => dialog.current?.close()}
              >
                Continue exploring <Arrow />
              </button>
            </div>
          ) : (
            <>
              <span className="cbf-eyebrow">LET’S TALK BILLING</span>
              <h2>
                See what CloudBilling
                <br />
                can do for you.
              </h2>
              <p>
                Explore the demo request flow. This prototype does not send or
                store your details.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label>
                  Name
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Work email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                </label>
                <label>
                  I’m interested in
                  <select defaultValue={products[product].name}>
                    {products.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                </label>
                <button className="cbf-button" type="submit">
                  Request a Demo <Arrow />
                </button>
              </form>
            </>
          )
        ) : modal === 'integrations' ? (
          <>
            <span className="cbf-eyebrow">YOUR CONNECTED ECOSYSTEM</span>
            <h2>Explore integrations</h2>
            <p>
              Connect cloud providers, distributors and accounting systems to
              your billing workflow.
            </p>
            <label>
              Find an integration
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search by name"
              />
            </label>
            <div className="cbf-integration-results">
              {integrations
                .filter((n) => n.toLowerCase().includes(filter.toLowerCase()))
                .map((n) => (
                  <div key={n}>
                    <strong>{n}</strong>
                    <span>
                      {['Business Central'].includes(n)
                        ? 'Accounting system'
                        : ['Pax8', 'Ingram Micro', 'TD Synnex'].includes(n)
                          ? 'Distributor'
                          : 'Cloud platform'}
                    </span>
                  </div>
                ))}
              {!integrations.some((n) =>
                n.toLowerCase().includes(filter.toLowerCase()),
              ) && (
                <p>
                  No matching integration. Try another name or ask about your
                  setup.
                </p>
              )}
            </div>
            <button className="cbf-button" onClick={() => show()}>
              Discuss your integrations <Arrow />
            </button>
          </>
        ) : modal === 'story' ? (
          <>
            <span className="cbf-eyebrow">
              CUSTOMER PERSPECTIVE / WOLTERS KLUWER
            </span>
            <h2>More than just a number.</h2>
            <blockquote>
              “The personal touch of CloudBilling is great. We really feel that
              we’re more than just a number.”
            </blockquote>
            <p>
              Manfred van der Hart
              <br />
              Financial Director, Wolters Kluwer
            </p>
            <p>
              A partner mindset is one of the four differentiators in the
              CloudBilling website story: personal attention alongside the
              technology.
            </p>
            <button
              className="cbf-button"
              onClick={() => {
                dialog.current?.close();
                document.getElementById('approach')?.scrollIntoView();
              }}
            >
              Explore our approach <Arrow />
            </button>
          </>
        ) : (
          <>
            <span className="cbf-eyebrow">PORTFOLIO PROTOTYPE</span>
            <h2>
              {modal === 'privacy'
                ? 'Privacy in this prototype'
                : modal === 'terms'
                  ? 'About this demonstration'
                  : modal === 'updates'
                    ? 'Website experience · 2026'
                    : 'Meet the design behind the website'}
            </h2>
            <p>
              {modal === 'privacy'
                ? 'The demo form runs only in your browser. It does not send or persist the information you enter, and this experience has no account or billing connection.'
                : modal === 'terms'
                  ? 'This website is an interactive demonstration of the CloudBilling website design. It is not a service agreement, a billing system, or a way to purchase CloudBilling services.'
                  : modal === 'updates'
                    ? 'This version brings the final homepage design to life with product switching, navigation menus, expandable explanations, integration search, and responsive layouts.'
                    : 'This portfolio presents the website design and its interactive implementation. Explore the case study for the visual system, product storytelling and design decisions.'}
            </p>
            <Link className="cbf-button" href="/cases/cloudbilling">
              View the design case <Arrow />
            </Link>
          </>
        )}
      </dialog>
    </div>
  );
}
