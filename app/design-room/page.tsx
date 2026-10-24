import {NotionArticle} from '../cases/notion-article';
import {CaseHeader,CaseFooter} from '../cases/components';

export const metadata={title:'Design room — Marianna Gonchar',description:'A pixel forest map through my design practice, creative roots and teaching.'};

function ForestLevelArt(){return <svg className="dr-forest-art" viewBox="0 0 1200 360" role="img" aria-label="A pixel forest path leading toward a moonlit mountain">
  <rect width="1200" height="360" fill="#151222"/>
  <path d="M0 236h120v-24h96v24h96v-48h72v48h96v-72h96v72h96v-36h96v36h96v-84h72v84h96v-48h96v48h72v124H0z" fill="#29203c"/>
  <path d="M0 278h168v-24h96v24h144v-36h72v36h120v-24h120v24h120v-48h96v48h96v-24h120v106H0z" fill="#443050"/>
  <path d="M0 318h120v-24h72v24h144v-24h72v24h192v-36h96v36h120v-24h96v24h192v42H0z" fill="#70436f"/>
  <path d="M540 360v-24h24v-24h24v-24h24v-24h24v-24h24v-24h24v-24h24v24h24v24h24v24h24v24h24v24h24v24h24v24z" fill="#d8b9d5"/>
  <path d="M612 240h24v24h-24zm48-48h24v24h-24zm48 48h24v24h-24z" fill="#f0d5eb"/>
  <g fill="#c89bd1"><path d="M90 214h24v24H90zm24-48h24v48h-24zm24 24h24v24h-24zm96 48h24v24h-24zm-24-72h24v72h-24zm-24 24h24v24h-24z"/><path d="M1020 202h24v24h-24zm24-48h24v48h-24zm24 24h24v24h-24zm48 48h24v24h-24zm-24-72h24v72h-24z"/></g>
  <g fill="#f19bc5"><path d="M142 236h12v12h-12zm-24-12h12v12h-12zm36 0h12v12h-12zM1044 224h12v12h-12zm-24-12h12v12h-12zm36 0h12v12h-12z"/></g>
  <path d="M924 74h48v12h24v24h12v48h-12v24h-24v12h-48v-12h-24v-24h-12v-48h12V86h24z" fill="#f7e9a0"/>
  <path d="M950 98h24v12h12v24h-12v24h-24v-12h12v-36h-12z" fill="#e9d988"/>
  <g fill="#f7e9a0"><path d="M820 108h12v12h-12zm52 72h12v12h-12zm120-96h12v12h-12zm60 48h12v12h-12z"/></g>
  <g fill="#c89bd1"><path d="M756 92h12v24h-12zm-12-12h12v12h-12zm-12-12h12v12h-12zM1100 88h12v24h-12zm12-12h12v12h-12z"/></g>
  <path d="M0 344h1200v16H0z" fill="#a66fa4"/>
</svg>}

export default function DesignRoom(){return <><CaseHeader/><main id="main" className="wrap case-study tone-purple design-room-game">
  <a className="case-back" href="/">← Home</a>
  <section className="dr-game-intro" aria-labelledby="dr-title">
    <div className="dr-intro-top"><span className="dr-level-tag"><i/> PLAYER 01 · MARIANNA</span><span className="dr-top-label">DESIGN ROOM / WORLD MAP</span></div>
    <blockquote className="dr-quote">“If you don’t know where you’re going, any road will get you there.”</blockquote>
    <div className="dr-title-row"><div><div className="eyebrow">BEHIND THE WORK</div><h1 id="dr-title">My design <span>world.</span></h1></div><p>Choose a trail to explore the ideas, experiences, and people that shaped how I design.</p></div>
    <div className="dr-landscape"><ForestLevelArt/><span className="dr-landscape-label">THE CREATIVE FOREST <b>● ● ●</b></span></div>
    <nav className="dr-level-map" aria-label="Design room levels">
      <a href="#n-10f50abb-37fc-48a8-805f-af0aa1596712"><span className="dr-level-number">01</span><span><b>Origin story</b><small>Kyiv · first pixels</small></span><i>↘</i></a>
      <a href="#n-d8ca5503-683d-4e3f-8309-b9fd2cd371f6"><span className="dr-level-number">02</span><span><b>How I think</b><small>Empathy · curiosity</small></span><i>↘</i></a>
      <a href="#n-7190c0fb-0d7b-48ef-a8dd-74229d113a89"><span className="dr-level-number">03</span><span><b>Share the knowledge</b><small>Teaching · mentoring</small></span><i>↘</i></a>
    </nav>
  </section>
  <NotionArticle slug="design-room"/>
</main><CaseFooter/></>}
