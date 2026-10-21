import Link from 'next/link';
import Image from 'next/image';
import './cases/rainforest-case.css';
import './cases/causal-case.css';
import './portrait.css';
import './cases/simcare-case.css';
import './home-gallery.css';
const Arrow = () => <span aria-hidden="true">↗</span>;
function CaseCover({ slug, name, tagline, kind, src, second }: { slug: string; name: string; tagline: string; kind: string; src?: string; second?: string }) {
  return <Link className={`project-visual collection-cover cover-${slug}`} href={`/cases/${slug}`} aria-label={`View ${name} case study`}>
    <div className="cover-heading"><span>{name}</span><span className="cover-open" aria-hidden="true">↗</span></div>
    <div className={`cover-art cover-art-abstract cover-art-${kind} abstract-${slug}`} aria-hidden="true"><span className="abstract-screen abstract-screen-main"><span className="abstract-screen-top"/><span className="abstract-screen-sidebar"/><span className="abstract-screen-chart"/><span className="abstract-screen-card"/></span>{kind === "phones" && <span className="abstract-screen abstract-screen-secondary"><span className="abstract-screen-top"/><span className="abstract-screen-card"/></span>}</div>
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
          <div className="section-heading"><div><span className="work-kicker">A selection of my work</span><h2 id="cases-title">Thoughtful products.<br/><span className="serif">Distinct perspectives.</span></h2></div><span>Strategy, systems & the details in between<br/>Selected cases / 01–04</span></div><div className="case-gallery">
          <article className="project"><CaseCover slug="rainforest" name="Home energy product" tagline="Energy at your fingertips" kind="phones"/><div className="project-copy"><div className="project-meta"><span>01 / CONNECTED HOME</span><span>PRODUCT · MOBILE</span></div><h3>Making energy<br/>feel tangible.</h3><p>Connecting live energy, device setup, thermostat control, and car charging in one home-energy experience.</p><div className="role">Product UX/UI · Interaction design · Visual system</div><Link className="pill-link" href="/cases/rainforest">Explore case study <Arrow/></Link></div></article>
          <article className="project"><CaseCover slug="mango-bank" name="Independent wallet concept" tagline="A little crypto. A lot of freedom." kind="phones"/><div className="project-copy"><div className="project-meta"><span>02 / DIGITAL WALLET</span><span>FINTECH · MOBILE</span></div><h3>A little crypto.<br/>A lot of freedom.</h3><p>A mobile wallet concept exploring onboarding, transfers, exchanges, activity, and everyday card controls.</p><div className="role">Product concept · Mobile UX/UI</div><Link className="pill-link" href="/cases/mango-bank">Explore case study <Arrow/></Link></div></article>
          <article className="project"><CaseCover slug="coinflix" name="Entertainment platform" tagline="Stories worth discovering" kind="phones"/><div className="project-copy"><div className="project-meta"><span>03 / ENTERTAINMENT</span><span>PRODUCT · MOBILE</span></div><h3>Short-form stories.<br/>A bigger role for creators.</h3><p>Designing an entertainment platform that brings content discovery, community, and creator monetization together.</p><div className="role">Senior Product Designer · Research · Mobile UX/UI</div><Link className="pill-link" href="/cases/coinflix">Explore case study <Arrow/></Link></div></article>
          <article className="project"><CaseCover slug="lumio-activation" name="Fintech activation" tagline="A first shared moment" kind="mobile"/><div className="project-copy"><div className="project-meta"><span>04 / FINTECH ACTIVATION</span><span>PRODUCT · MOBILE</span></div><h3>Get couples to their<br/>first shared moment.</h3><p>Using funnel analysis to identify friction and shape an onboarding experiment for a shared-finance product.</p><div className="role">Product strategy · UX design · Experimentation</div><Link className="pill-link" href="/cases/lumio-activation">Explore case study <Arrow/></Link></div></article></div><div className="all-cases"><span>There’s more to explore.</span><Link href="/cases" className="all-cases-button">View all cases <span className="all-cases-arrow" aria-hidden="true">↗</span></Link><p>More products, experiments, and the thinking behind them.</p></div>
        </section>
        <section id="about" className="about wrap" aria-labelledby="about-title"><div className="section-heading"><h2 id="about-title">A little about me</h2><span>Kyiv, Ukraine · Working internationally</span></div><div className="about-grid"><h3>Curious about people.<br/>Serious about <span className="serif">craft.</span></h3><div><p>I’m a Ukrainian product designer with 10+ years in the digital industry, working across startups, agencies, and complex products.</p><p>I connect research, product thinking, and hands-on design. Alongside my practice, I teach UX and mobile interface design at Projector Institute.</p><Link className="text-link" href="/cv">More about my experience <Arrow /></Link><Link className="text-link design-room-link" href="/design-room">Visit my design room <Arrow /></Link></div></div></section>
      </main>
      <footer className="footer"><div className="wrap"><div className="footer-top"><p>A new product. A complex challenge. Your next teammate.</p><Link href="mailto:marfantastik@gmail.com">Let’s make it <span className="serif">matter.</span><Arrow /></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Marianna Gonchar</span><div><Link href="https://www.linkedin.com/in/marianna-gonchar-15933aa8/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></Link><Link href="mailto:marfantastik@gmail.com">Email <Arrow /></Link><Link href="#main">Back to top ↑</Link></div></div></div></footer>
    </>
  );
}
