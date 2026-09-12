import Link from 'next/link';
import Image from 'next/image';
import './cases/rainforest-case.css';
import './cases/causal-case.css';
import './portrait.css';
import './cases/simcare-case.css';
import './home-gallery.css';
const Arrow = () => <span aria-hidden="true">↗</span>;
function CaseCover({ slug, name, tagline, kind, src, second }: { slug: string; name: string; tagline: string; kind: string; src: string; second?: string }) {
  return <Link className={`project-visual collection-cover cover-${slug}`} href={`/cases/${slug}`} aria-label={`View ${name} case study`}>
    <div className="cover-heading"><span>{name}</span><span className="cover-open" aria-hidden="true">↗</span></div>
    <div className={`cover-art cover-art-${kind}`}><Image unoptimized width={kind === "phones" ? 375 : 1200} height={kind === "phones" ? 812 : kind === "mobile" ? 1573 : 850} sizes="(max-width: 700px) 90vw, 45vw" src={src} alt={`${name} product design preview`} loading="lazy"/>{second && <Image unoptimized width={375} height={812} sizes="(max-width: 700px) 35vw, 18vw" src={second} alt={`${name} second product screen`} loading="lazy"/>}</div>
    <span className="cover-tagline">{tagline}</span>
  </Link>;
}
export default function Home() {
  return (
    <>
      <Link className="skip-link" href="#main">Skip to content</Link>
      <header className="site-header wrap">
        <Link className="wordmark" href="#main" aria-label="Marianna Gonchar, home">Marianna Gonchar<span className="wordmark-dot">.</span></Link>
        <nav aria-label="Main navigation"><Link href="#cases">Cases</Link><Link href="#about">About</Link><Link href="/cv">CV <Arrow /></Link><Link className="nav-contact" href="mailto:marfantastik@gmail.com">Let’s talk <Arrow /></Link></nav>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="intro">
          <div className="eyebrow"><span className="status-dot"/>Independent thinking. Shared ambition.</div>
          <div className="portfolio-intro-with-photo"><h1 id="intro">Marianna Gonchar is a<br className="desktop-break"/> senior product designer<br className="desktop-break"/> making <span className="serif">complex</span> feel simple.</h1><Image className="portfolio-portrait" src="/images/marianna-gonchar-portrait.png" alt="Marianna Gonchar" width="1254" height="1254" fetchPriority="high"/></div>
          <div className="hero-bottom"><p>AI platforms. Everyday finances. Thoughtful digital experiences.<br/>From the first question to the details that make it work.</p><Link className="text-link" href="#cases">Explore selected work <span aria-hidden="true">↓</span></Link></div>
        </section>
        <section id="cases" className="work wrap home-gallery" aria-labelledby="cases-title">
          <div className="section-heading"><div><span className="work-kicker">A selection of my work</span><h2 id="cases-title">Thoughtful products.<br/><span className="serif">Distinct perspectives.</span></h2></div><span>Strategy, systems & the details in between<br/>Selected cases / 01–08</span></div><div className="case-gallery">
          <article className="project project-lumio"><CaseCover slug="lumio-couples" name="Lumio" tagline="Finance, shared" kind="mobile" src="/images/lumio-phones.png"/>

            <div className="project-copy"><div className="project-meta"><span>01 / LUMIO</span><span>FINTECH · MOBILE</span></div><h3>Shared money.<br/>Individual lives.</h3><p>Helping Lumio evolve from automatic savings to couples’ finances. End-to-end design, grounded in 32 user interviews and built around how people actually share money.</p><div className="role">Sole Designer · Research to release</div><Link className="pill-link" href="/cases/lumio-couples">NDA · Unlock case <Arrow /></Link></div>
          </article>
          <article className="project project-sema"><CaseCover slug="semaverse" name="Semaverse" tagline="Intelligence, connected" kind="desktop" src="/images/semaverse-vault.webp"/>
            <div className="project-copy"><div className="project-meta"><span>02 / SEMAVERSE</span><span>AI · B2B PLATFORM</span></div><h3>Intelligence,<br/>made legible.</h3><p>Making AI work understandable through connected research, visible progress, and document changes people can review and recover.</p><div className="role">Solo Product Designer · 2023–2026</div><Link className="pill-link" href="/cases/semaverse">NDA · Unlock case <Arrow /></Link></div>

          </article>
          <article className="project project-oasive"><CaseCover slug="oasive" name="Oasive" tagline="Clarity in complexity" kind="desktop" src="/images/oasive/live-og.webp"/>

            <div className="project-copy"><div className="project-meta"><span>03 / OASIVE</span><span>FINTECH · WEBSITE</span></div><h3>A complex product.<br/>A clear introduction.</h3><p>Designing and refining the website for an AI fixed-income platform—from the product story and visual hierarchy to motion and responsive detail.</p><div className="role">UX/UI design · Motion · Responsive refinement</div><Link className="pill-link" href="/cases/oasive">NDA · Unlock case <Arrow /></Link></div>
          </article>
          <article className="project project-simcare"><CaseCover slug="simcare" name="SimCare" tagline="Practice with confidence" kind="desktop" src="/images/covers/simcare-interface.png"/><div className="project-copy"><div className="project-meta"><span>04 / SIMCARE</span><span>COUNSELING EDUCATION · WEBSITE</span></div><h3>A more human introduction<br/>to AI-powered practice.</h3><p>A connected website for simulations, field experience, course discovery, pricing, and support. Explore all five pages in an animated prototype.</p><div className="role">Website UX/UI · Product storytelling · Responsive design</div><Link className="pill-link" href="/cases/simcare">NDA · Unlock case <Arrow /></Link></div></article>
          <article className="project project-coinflix"><CaseCover slug="coinflix" name="Coinflix" tagline="Stories worth discovering" kind="phones" src="/images/coinflix/home.png" second="/images/coinflix/details.png"/><div className="project-copy"><div className="project-meta"><span>05 / COINFLIX</span><span>ENTERTAINMENT · MOBILE</span></div><h3>Short-form stories.<br/>A bigger role for creators.</h3><p>Designing a mobile entertainment platform that brings content discovery, community, and creator monetization together, from early research to the full app experience.</p><div className="role">Senior Product Designer · Research · Mobile UX/UI</div><Link className="pill-link" href="/cases/coinflix">NDA · Unlock case <Arrow /></Link></div></article>
          <article className="project project-causal"><CaseCover slug="causal-labs" name="Causal Labs" tagline="A clearer forecast" kind="desktop" src="/images/covers/causal-labs-interface.png"/><div className="project-copy"><div className="project-meta"><span>06 / CAUSAL LABS</span><span>WEATHER INTELLIGENCE · AVIATION</span></div><h3>Weather signals.<br/>Operational context.</h3><p>Connecting weather events, affected airports, and prediction timing in one map-based experience. Explore the design decisions through an animated, interactive prototype.</p><div className="role">Interface design · Interaction flows · Prototyping</div><Link className="pill-link" href="/cases/causal-labs">NDA · Unlock case <Arrow /></Link></div></article>
          <article className="project project-ascy"><CaseCover slug="ascy" name="Ascy" tagline="From thought to action" kind="phones" src="/images/ascy/welcome.png" second="/images/ascy/home.png"/><div className="project-copy"><div className="project-meta"><span>07 / ASCY</span><span>VOICE-FIRST · MOBILE</span></div><h3>A thought.<br/>Already a note.</h3><p>A calm space for the things you don’t want to forget. From voice capture to editable notes and checklists, with a connected prototype of the main flows.</p><div className="role">Mobile UX/UI · Interaction design · Prototyping</div><Link className="pill-link" href="/cases/ascy">NDA · Unlock case <Arrow/></Link></div></article><article className="project project-rainforest"><CaseCover slug="rainforest" name="Rainforest" tagline="Energy at your fingertips" kind="phones" src="/images/rainforest/home.png" second="/images/rainforest/charging.png"/><div className="project-copy"><div className="project-meta"><span>08 / RAINFOREST</span><span>CONNECTED HOME · PRODUCT</span></div><h3>Making energy<br/>feel tangible.</h3><p>Connecting live demand, device controls, and everyday decisions. Explore the home-energy experience through a working, local prototype.</p><div className="role">Product UX/UI · Interaction design · Visual system</div><Link className="pill-link" href="/cases/rainforest">NDA · Unlock case <Arrow/></Link></div></article></div><div className="all-cases"><span>There’s more to explore.</span><Link href="/cases" className="all-cases-button">View all cases <span className="all-cases-arrow" aria-hidden="true">↗</span></Link><p>More products, experiments, and the thinking behind them.</p></div>
        </section>
        <section id="about" className="about wrap" aria-labelledby="about-title"><div className="section-heading"><h2 id="about-title">A little about me</h2><span>Kyiv, Ukraine · Working internationally</span></div><div className="about-grid"><h3>Curious about people.<br/>Serious about <span className="serif">craft.</span></h3><div><p>I’m a Ukrainian product designer with 10+ years in the digital industry, working across startups, agencies, and complex products.</p><p>I connect research, product thinking, and hands-on design. Alongside my practice, I teach UX and mobile interface design at Projector Institute.</p><Link className="text-link" href="/cv">More about my experience <Arrow /></Link><Link className="text-link design-room-link" href="/design-room">Visit my design room <Arrow /></Link></div></div></section>
      </main>
      <footer className="footer"><div className="wrap"><div className="footer-top"><p>A new product. A complex challenge. Your next teammate.</p><Link href="mailto:marfantastik@gmail.com">Let’s make it <span className="serif">matter.</span><Arrow /></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Marianna Gonchar</span><div><Link href="https://www.linkedin.com/in/marianna-gonchar-15933aa8/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></Link><Link href="mailto:marfantastik@gmail.com">Email <Arrow /></Link><Link href="#main">Back to top ↑</Link></div></div></div></footer>
    </>
  );
}
