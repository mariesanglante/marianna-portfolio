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
      <footer className="footer"><div className="wrap"><div className="footer-top"><svg className="footer-forest-scene" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
<rect width="1440" height="420" fill="#10121d"/>
<path fill="#1b1728" d="M0 420V233h36v-24h24v-36h30v-42h30v42h24v35h26v-27h27v-42h25v-35h31v35h28v42h26v46h30v-26h28v-38h27v-25h27v25h29v38h27v52h31v-32h27v-43h25v-37h29v-30h31v30h26v39h29v46h28v28h32v-26h28v-38h26v-24h27v24h31v38h28v41h30v-26h28v-42h25v-34h29v-33h30v33h29v39h28v44h31v28h29v-28h28v-39h26v-29h28v-29h30v29h29v41h29v36h29v23h40V420z"/>
<path fill="#292039" d="M0 420V289h31v-29h22v-26h25v26h25v29h24v-20h27v-29h25v-31h27v31h24v29h31v20h30v-22h26v-25h28v-29h26v29h28v25h27v22h31v-21h25v-29h28v-25h26v-32h28v32h27v26h29v28h30v21h31v-22h28v-26h26v-28h27v28h30v25h28v23h32v-22h26v-28h29v-26h27v-29h29v29h28v26h31v28h28v22h33v-22h29v-25h27v-28h27v-27h29v27h29v27h28v26h32v22h30v-20h29v-27h26v-25h28v-30h29v30h28v26h28v25h33v-20h25v-28h31v-23h25v-30h29v30h29v25h26v29h31v23h32V420z"/>
<path fill="#3a2748" d="M0 420V338h27v-22h20v-18h20v18h22v22h26v-20h24v-21h20v-24h23v24h22v21h27v20h25v-21h23v-20h24v-24h23v24h24v20h24v21h28v-20h22v-22h23v-21h22v21h24v23h23v20h27v-20h24v-22h22v-21h23v21h23v22h25v20h28v-20h22v-22h24v-22h23v22h24v21h23v21h28v-21h22v-22h25v-22h22v22h24v22h25v21h29v-21h24v-22h22v-22h23v22h23v22h25v21h27v-20h22v-23h23v-19h24v19h23v23h26v20h26v-20h24v-22h24v-22h22v22h23v22h27v22h30v-21h23v-23h24v-20h22v-21h25v21h24v22h24v21h25v21h29v-20h24v-23h23v-20h25v-21h24v21h23v22h27v21h30v21h32V420z"/>
<path fill="#62406a" d="M0 420V374h35v-19h17v-17h20v17h19v19h26v-18h20v-17h20v-18h21v18h19v17h26v18h31v-18h20v-18h21v-17h20v17h21v18h20v18h27v-18h21v-18h20v-17h21v17h20v18h22v18h29v-18h20v-17h21v-19h19v19h22v17h20v18h28v-18h22v-18h20v-17h22v17h21v18h21v18h28v-18h19v-17h23v-18h20v18h21v17h21v18h30v-18h20v-18h21v-17h22v17h20v18h25v18h28v-18h19v-17h22v-19h20v19h22v17h20v18h32v-18h21v-18h20v-17h21v17h23v18h21v18h29v-18h22v-18h20v-17h22v17h20v18h24v18h31v-18h20v-17h22v-18h20v18h21v17h24v18h29v-18h22v-18h20v-17h23v17h21v18h23v18h36v-46z"/>
<!-- trunks, stepped bark highlights, and root bridges -->
<path fill="#291e38" d="M112 420V247h22v-34h18v34h20v173zm1227 0V221h24v-35h20v35h20v199zM372 420V282h18v-29h17v29h18v138zm560 0V264h19v-32h18v32h19v156zm-720 0v-58h25v-15h19v15h23v58zm845 0v-55h22v-18h20v18h24v55z"/>
<path fill="#795276" d="M123 278h9v38h-9zm19-43h9v31h-9zm153 115h9v18h-9zm589-77h9v39h-9zm19-30h9v24h-9zm360 6h9v45h-9zm18-46h9v36h-9z"/>
<!-- blocky canopy clusters, layered highlights -->
<g fill="#4d3158">
<path d="M0 0h183v22h-21v18h-21v20h-26v19H91v22H68V80H48V61H30V42H14V22H0z"/>
<path d="M234 0h130v18h-20v18h-19v21h-24v17h-22V57h-19V38h-16V18h-10z"/>
<path d="M1440 0h-185v22h20v18h21v20h25v19h25v22h24V80h20V61h18V42h18V22h14z"/>
<path d="M1205 0h-130v18h19v18h20v21h23v17h23V57h19V38h16V18h10z"/>
</g>
<g fill="#7d547d">
<path d="M28 16h22v16H28zm39 28h20v16H67zm45 22h18v16h-18zm1075-50h23v17h-23zm43 29h20v16h-20zm43 22h19v16h-19z"/>
<path d="M283 9h18v14h-18zm-20 27h17v14h-17zm-15 25h16v14h-16zm929-52h18v14h-18zm20 27h17v14h-17zm16 25h17v14h-17z"/>
</g>
<g fill="#bd80b2"><path d="M48 20h8v8h-8zm75 48h8v8h-8zm157-47h8v8h-8zm-32 38h8v8h-8zm1000-39h8v8h-8zm74 47h8v8h-8zm-157-47h8v8h-8zm34 39h8v8h-8z"/></g>
<!-- moonlit pixel motes -->
<g fill="#f8e697"><path d="M340 116h8v8h-8zm89 45h6v6h-6zm384-63h8v8h-8zm-173 38h6v6h-6zm494-54h8v8h-8z"/></g>
<g fill="#d66aa8"><path d="M210 354h8v8h-8zm186 25h8v8h-8zm304-16h7v7h-7zm420 10h8v8h-8zm228-31h8v8h-8z"/></g>
<!-- foreground ferns and tiny blossoms -->
<path fill="#8c5b87" d="M0 420v-28h17v-18h9v18h18v-26h10v26h19v28zm268 0v-22h14v-19h9v19h15v22zm489 0v-26h17v-20h9v20h18v26zm412 0v-21h15v-18h9v18h18v21zm198 0v-27h14v-17h9v17h16v27z"/>
<g fill="#f19bc5"><path d="M40 374h8v8h-8zm14-8h8v8h-8zm8 8h8v8h-8zm250 18h8v8h-8zm529-15h8v8h-8zm12-8h8v8h-8zm8 8h8v8h-8zm407-9h8v8h-8zm12-8h8v8h-8z"/></g>
<path fill="#a66fa4" d="M0 412h1440v8H0z"/>
</svg><div className="footer-copy"><p>A new product. A complex challenge. Your next teammate.</p><Link className="footer-cta" href="mailto:marfantastik@gmail.com"><span className="footer-cta-copy">Let’s make it <span className="serif">matter.</span></span></Link></div><img className="footer-night-scene" src="/images/footer-wolf-moon.webp" alt="" width="1312" height="1199" aria-hidden="true"/><span className="footer-howl-sound" aria-hidden="true"><i/><i/><i/></span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Marianna Gonchar</span><div><Link href="https://www.linkedin.com/in/marianna-gonchar-15933aa8/" target="_blank" rel="noreferrer">LinkedIn <LinkedInIcon /></Link><Link href="mailto:marfantastik@gmail.com">Email <EmailIcon /></Link><Link href="#main">Back to top</Link></div></div></div></footer>
      </div>
    </>
  );
}
