const Arrow = () => <span aria-hidden="true">↗</span>;
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header wrap">
        <a className="wordmark" href="#main" aria-label="Marianna Gonchar, home">Marianna Gonchar<span className="wordmark-dot">.</span></a>
        <nav aria-label="Main navigation"><a href="#cases">Cases</a><a href="#about">About</a><a href="/Marianna-Gonchar-CV.pdf" target="_blank" rel="noreferrer">CV <Arrow /></a><a className="nav-contact" href="mailto:marfantastik@gmail.com">Let’s talk <Arrow /></a></nav>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="intro">
          <div className="eyebrow"><span className="status-dot"/>Independent thinking. Shared ambition.</div>
          <h1 id="intro">Marianna Gonchar is a<br className="desktop-break"/> senior product designer<br className="desktop-break"/> making <span className="serif">complex</span> feel simple.</h1>
          <div className="hero-bottom"><p>AI platforms. Everyday finances. Thoughtful digital experiences.<br/>From the first question to the details that make it work.</p><a className="text-link" href="#cases">Explore selected work <span aria-hidden="true">↓</span></a></div>
        </section>
        <section id="cases" className="work wrap" aria-labelledby="cases-title">
          <div className="section-heading"><h2 id="cases-title">Selected cases</h2><span>Strategy, systems & the details in between</span></div>
          <article className="project project-sema">
            <div className="project-copy"><div className="project-meta"><span>01 / SEMAVERSE</span><span>AI · B2B PLATFORM</span></div><h3>Clarity in a world<br/>of complex data.</h3><p>Redesigning an AI investment platform so people can navigate documents, understand system states, and work with confidence.</p><div className="role">Solo Product Designer · 2023–2026</div><a className="pill-link" href="/cases/semaverse">View case study <Arrow /></a></div>
            <a className="project-visual sema-visual" href="/cases/semaverse" aria-label="Read Semaverse case study"><span className="visual-label">SEMAVERSE / AI WORKSPACE</span><img src="/images/semaverse-vault.webp" alt="Semaverse AI Vault with document categories, processing progress, and an AI agent panel" width="2050" height="1460"/><span className="visual-footer">Complex workflows. Clear interactions.<span aria-hidden="true">↗</span></span></a>
          </article>
          <article className="project project-lumio">
            <a className="project-visual lumio-visual" href="/cases/lumio-couples" aria-label="Read Lumio couples finances case study"><span className="lumio-logotype">lumio<span>®</span></span><img src="/images/lumio-phones.png" alt="Lumio mobile app showing a couple’s shared spending and recurring expenses" width="1080" height="1416" loading="lazy"/><span className="visual-caption">A little more together.</span></a>
            <div className="project-copy"><div className="project-meta"><span>02 / LUMIO</span><span>FINTECH · MOBILE</span></div><h3>Shared money.<br/>Individual lives.</h3><p>Helping Lumio evolve from automatic savings to couples’ finances. End-to-end design, grounded in 32 user interviews and built around how people actually share money.</p><div className="role">Sole Designer · Research to release</div><a className="pill-link" href="/cases/lumio-couples">View case study <Arrow /></a></div>
          </article>
          <article className="project project-activation">
            <div className="project-copy"><div className="project-meta"><span>03 / LUMIO</span><span>ACTIVATION · EXPERIMENTATION</span></div><h3>Less friction.<br/>More first steps.</h3><p>Rethinking the journey to a couple’s first shared value. Using research and funnel analysis to make getting started feel worth it.</p><div className="role">Product strategy · UX · A/B testing</div><a className="pill-link" href="/cases/lumio-activation">View case study <Arrow /></a></div>
            <a className="project-visual activation-visual" href="/cases/lumio-activation" aria-label="Read Lumio activation case study"><div className="metric-heading">SMALLER STEPS. MEANINGFUL CHANGE.</div><div className="metric"><span>Partner invitations sent</span><strong>19<span>%</span><i>→</i>44<span>%</span></strong></div><div className="metric"><span>Bank accounts connected</span><strong>55<span>%</span><i>→</i>71<span>%</span></strong></div><div className="metric-note">Reported 30-day results · Variant A <Arrow /></div></a>
          </article>
          <div className="more-work"><span>More explorations, different challenges.</span><a href="/cases">Browse the case archive <Arrow /></a></div>
        </section>
        <section id="about" className="about wrap" aria-labelledby="about-title"><div className="section-heading"><h2 id="about-title">A little about me</h2><span>Kyiv, Ukraine · Working internationally</span></div><div className="about-grid"><h3>Curious about people.<br/>Serious about <span className="serif">craft.</span></h3><div><p>I’m a Ukrainian product designer with 10+ years in the digital industry, working across startups, agencies, and complex products.</p><p>I connect research, product thinking, and hands-on design. Alongside my practice, I teach UX and mobile interface design at Projector Institute.</p><a className="text-link" href="/Marianna-Gonchar-CV.pdf" target="_blank" rel="noreferrer">More about my experience <Arrow /></a><a className="text-link design-room-link" href="/design-room">Visit my design room <Arrow /></a></div></div></section>
      </main>
      <footer className="footer"><div className="wrap"><div className="footer-top"><p>A new product. A complex challenge. Your next teammate.</p><a href="mailto:marfantastik@gmail.com">Let’s make it <span className="serif">matter.</span><Arrow /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Marianna Gonchar</span><div><a href="https://www.linkedin.com/in/marianna-gonchar-15933aa8/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="mailto:marfantastik@gmail.com">Email <Arrow /></a><a href="#main">Back to top ↑</a></div></div></div></footer>
    </>
  );
}
