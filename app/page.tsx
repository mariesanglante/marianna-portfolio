import Link from 'next/link';
import Image from 'next/image';
import caseCovers from './cases/archive-previews.json';
import './cases/rainforest-case.css';
import './cases/causal-case.css';
import './portrait.css';
import './cases/simcare-case.css';
import './home-gallery.css';
const Arrow = ({ direction = 'up-right' }: { direction?: 'up-right' | 'down' | 'up' }) => <span className={`pixel-arrow pixel-arrow-${direction}`} aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M1 6h8V2l6 6-6 6v-4H1z"/></svg></span>;
const PixelStar = () => <span className="pixel-star-icon" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M6 0h4v4h2v2h4v4h-4v2h-2v4H6v-4H4v-2H0V6h4V4h2z"/></svg></span>;
const LinkedInIcon = () => <span className="pixel-contact-icon" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path fill="currentColor" fillRule="evenodd" d="M1 1h14v14H1zM3 3v10h10V3z"/><path d="M4 6h2v6H4zM4 4h2v2H4zM8 6h2v1h1V6h2v6h-2V9h-1v3H8z"/></svg></span>;
const EmailIcon = () => <span className="pixel-contact-icon pixel-email-icon" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M2 4h12v8H2zM3 5l5 4 5-4M3 11l3-3m7 3-3-3"/></svg></span>;
function CaseCover({ slug, name, tagline, kind, src, second }: { slug: string; name: string; tagline: string; kind: string; src?: string; second?: string }) {
  const cover = caseCovers[slug as keyof typeof caseCovers] as { src: string; second?: string } | undefined;
  const mainImage = src || cover?.src;
  const secondImage = second || cover?.second;
  return <Link className={`project-visual collection-cover cover-${slug}`} href={`/cases/${slug}`} aria-label={`View ${name} case study`}>
    <div className="cover-heading"><span>{name}</span><span className="cover-open" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M1 6h8V2l6 6-6 6v-4H1z"/></svg></span></div>
    <div className={`cover-art cover-art-${kind} ${mainImage ? 'cover-art-real' : `cover-art-abstract abstract-${slug}`}`} aria-hidden="true">{mainImage ? <><img src={mainImage} alt="" loading="lazy" decoding="async"/>{secondImage && <img src={secondImage} alt="" loading="lazy" decoding="async"/>}</> : <><span className="abstract-screen abstract-screen-main"><span className="abstract-screen-top"/><span className="abstract-screen-sidebar"/><span className="abstract-screen-chart"/><span className="abstract-screen-card"/></span>{kind === "phones" && <span className="abstract-screen abstract-screen-secondary"><span className="abstract-screen-top"/><span className="abstract-screen-card"/></span>}</>}</div>
    <span className="cover-tagline">{tagline}</span>
  </Link>;
}
export default function Home() {
  return (
    <>
      <Link className="skip-link" href="#main">Skip to content</Link>
      <div className="portfolio-home">
      <header className="site-header wrap">
        <Link className="wordmark" href="#main" aria-label="MG Design, home">MG DESIGN<span className="wordmark-dot">.</span></Link>
        <nav aria-label="Main navigation"><Link href="#cases">Cases</Link><Link href="#about">About</Link><Link href="/cv">CV <Arrow /></Link><Link className="nav-contact" href="mailto:marfantastik@gmail.com">Let’s talk <PixelStar /></Link></nav>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="intro">
          <div className="eyebrow"><span className="status-dot"/>Independent thinking. Shared ambition.</div>
          <div className="portfolio-intro-with-photo"><h1 id="intro">Marianna Gonchar is a<br className="desktop-break"/> senior product designer<br className="desktop-break"/> making <span className="serif">complex</span> feel simple.</h1><Image className="portfolio-portrait" src="/images/marianna-gonchar-portrait.png" alt="Marianna Gonchar" width="1254" height="1254" fetchPriority="high"/></div>
          <div className="hero-bottom"><p>AI platforms. Everyday finances. Thoughtful digital experiences.<br/>From the first question to the details that make it work.</p><Link className="text-link" href="#cases">Explore selected work <Arrow direction="down" /></Link></div>
          </section>
        <section id="cases" className="work wrap home-gallery" aria-labelledby="cases-title">
          <div className="section-heading"><div><span className="work-kicker">A selection of my work</span><h2 id="cases-title">Thoughtful products.<br/><span className="serif">Distinct perspectives.</span></h2></div><span>Strategy, systems & the details in between<br/>Selected cases / 01–04</span></div><div className="case-gallery">
          <article className="project"><CaseCover slug="rainforest" name="Home energy product" tagline="Energy at your fingertips" kind="phones"/><div className="project-copy"><div className="project-meta"><span>01 / CONNECTED HOME</span><span>PRODUCT · MOBILE</span></div><h3>Making energy<br/>feel tangible.</h3><p>Connecting live energy, device setup, thermostat control, and car charging in one home-energy experience.</p><div className="role">Product UX/UI · Interaction design · Visual system</div><Link className="pill-link" href="/cases/rainforest">Explore case study <Arrow/></Link></div></article>
          <article className="project"><CaseCover slug="mango-bank" name="Independent wallet concept" tagline="A little crypto. A lot of freedom." kind="phones"/><div className="project-copy"><div className="project-meta"><span>02 / DIGITAL WALLET</span><span>FINTECH · MOBILE</span></div><h3>A little crypto.<br/>A lot of freedom.</h3><p>A mobile wallet concept exploring onboarding, transfers, exchanges, activity, and everyday card controls.</p><div className="role">Product concept · Mobile UX/UI</div><Link className="pill-link" href="/cases/mango-bank">Explore case study <Arrow/></Link></div></article>
          <article className="project"><CaseCover slug="coinflix" name="Entertainment platform" tagline="Stories worth discovering" kind="phones"/><div className="project-copy"><div className="project-meta"><span>03 / ENTERTAINMENT</span><span>PRODUCT · MOBILE</span></div><h3>Short-form stories.<br/>A bigger role for creators.</h3><p>Designing an entertainment platform that brings content discovery, community, and creator monetization together.</p><div className="role">Senior Product Designer · Research · Mobile UX/UI</div><Link className="pill-link" href="/cases/coinflix">Explore case study <Arrow/></Link></div></article>
          <article className="project"><CaseCover slug="lumio-activation" name="Fintech activation" tagline="A first shared moment" kind="composition"/><div className="project-copy"><div className="project-meta"><span>04 / FINTECH ACTIVATION</span><span>PRODUCT · MOBILE</span></div><h3>Get couples to their<br/>first shared moment.</h3><p>Using funnel analysis to identify friction and shape an onboarding experiment for a shared-finance product.</p><div className="role">Product strategy · UX design · Experimentation</div><Link className="pill-link" href="/cases/lumio-activation">Explore case study <Arrow/></Link></div></article></div><div className="all-cases"><span>There’s more to explore.</span><Link href="/cases" className="all-cases-button">View all cases <span className="all-cases-arrow" aria-hidden="true"><Arrow/></span></Link><p>More products, experiments, and the thinking behind them.</p></div>
        </section>
        <section id="about" className="about wrap" aria-labelledby="about-title"><div className="section-heading"><h2 id="about-title">A little about me</h2><span>Kyiv, Ukraine · Working internationally</span></div><div className="about-grid"><h3>Curious about people.<br/>Serious about <span className="serif">craft.</span></h3><div><p>I’m a Ukrainian product designer with 10+ years in the digital industry, working across startups, agencies, and complex products.</p><p>I connect research, product thinking, and hands-on design. Alongside my practice, I teach UX and mobile interface design at Projector Institute.</p><Link className="text-link" href="/cv">More about my experience <Arrow /></Link><Link className="text-link design-room-link" href="/design-room">Visit my design room <Arrow /></Link></div></div></section>
      </main>
      <footer className="footer"><div className="wrap"><div className="footer-top"><p>A new product. A complex challenge. Your next teammate.</p><Link className="footer-cta" href="mailto:marfantastik@gmail.com"><span className="footer-cta-copy">Let’s make it <span className="serif">matter.</span></span><span className="footer-pixel-shot" aria-hidden="true">{Array.from({length:8},(_,i)=><i key={i}/>)}</span></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Marianna Gonchar</span><div><Link href="https://www.linkedin.com/in/marianna-gonchar-15933aa8/" target="_blank" rel="noreferrer">LinkedIn <LinkedInIcon /></Link><Link href="mailto:marfantastik@gmail.com">Email <EmailIcon /></Link><Link href="#main">Back to top</Link></div></div></div></footer>
      </div>
    </>
  );
}
