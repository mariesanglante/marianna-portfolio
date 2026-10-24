import {NotionArticle} from '../cases/notion-article';
import {CaseHeader,CaseFooter} from '../cases/components';

export const metadata={title:'Design room — Marianna Gonchar',description:'A pixel forest map through my design practice, creative roots and teaching.'};

function ForestLevelArt(){return <svg className="dr-forest-art" viewBox="0 0 1200 360" role="img" aria-label="A moonlit pixel forest with a winding trail, tall trees, and a small wolf companion">
  <defs>
    <pattern id="dr-night-stars" width="120" height="90" patternUnits="userSpaceOnUse"><path d="M18 20h6v6h-6zm62 46h4v4h-4zm28-55h3v3h-3z" fill="#e7d9ee" opacity=".8"/></pattern>
  </defs>
  <rect width="1200" height="360" fill="#181625"/>
  <rect width="1200" height="180" fill="url(#dr-night-stars)"/>
  
  <path fill="#252039" d="M0 231 88 176l70 43 103-80 79 58 73-46 81 55 104-89 83 70 87-50 85 52 91-81 83 59 86-48 87 55v116H0z"/>
  <path fill="#302542" d="M0 255h132l68-41 71 42h97l64-36 66 34h124l78-50 73 51h126l74-43 74 43h152v105H0z"/>
  
  <path fill="#725173" d="M490 360v-24h36v-20h32v-20h30v-20h34v-20h38v-20h34v-20h28v20h32v20h30v20h28v20h28v20h28v20h30v24z"/>
  <path fill="#a989a8" d="M535 360v-20h35v-20h35v-20h35v-20h36v-20h36v-20h25v20h32v20h29v20h30v20h32v20h38v20z"/>
  <path fill="#d0b5cb" d="M595 360v-18h32v-18h34v-18h36v-18h36v-18h20v18h32v18h31v18h33v18h34v18z"/>
  
  <path fill="#f4e49a" d="M945 36h48v8h24v16h16v24h8v40h-8v24h-16v16h-24v8h-48v-8h-24v-16h-16v-24h-8V84h8V60h16V44h24z"/>
  <path fill="#e0d080" d="M985 52h16v12h16v20h-12V72h-20v24h-16V72h16zm-34 64h16v16h-16zm60 18h16v12h-16z"/>
  <g fill="#f4e49a"><path d="M826 68h8v8h-8zm50 60h6v6h-6zm122-88h6v6h-6zm88 47h8v8h-8z"/></g>
  <g fill="#c89bd1"><path d="M756 70h7v7h-7zm-9-9h7v7h-7zm-9-9h7v7h-7zm224 122h7v7h-7zm-17 10h7v7h-7z"/></g>
  
  <path fill="#29213b" d="M350 253V175h-18v-20h18v-18h18v-23h20V95h24v19h18v23h18v18h18v20h-18v78zm340 2v-72h-18v-18h18v-18h17v-24h20v-20h22v20h19v24h17v18h18v18h-18v72z"/>
  <path fill="#473052" d="M374 174h18v-22h18v-24h16v24h18v22h-18v21h-18v21h-16v-21h-18zm326 23h18v-21h17v-23h17v23h18v21h-18v20h-17v17h-17v-17h-18z"/>
  
  <path fill="#241d35" d="M0 0h235v20h-19v20h-20v20h-24v19h-22v22h-22V80h-21V60H86V40H62V20H38V0zm1200 0H966v20h20v20h20v20h24v19h22v22h22V80h21V60h21V40h24V20h24V0z"/>
  <path fill="#382746" d="M0 0h171v15h-18v18h-18v18h-22v18H91v20H70V69H52V51H34V33H16V16H0zm1200 0h-171v15h18v18h18v18h22v18h22v20h21V69h18V51h18V33h18V16h16z"/>
  <g fill="#5c3a64">
    <path d="M33 12h22v16H33zm45 26h20v16H78zm42 26h19v16h-19zm37-43h20v16h-20zm877-27h22v16h-22zm-42 26h20v16h-20zm-42 26h19v16h-19zm-38-43h20v16h-20z"/>
    <path d="M185 7h18v14h-18zm-17 27h17v14h-17zm-16 27h16v14h-16zm911-54h18v14h-18zm17 27h17v14h-17zm16 27h16v14h-16z"/>
  </g>
  <g fill="#b77cac"><path d="M54 18h8v8h-8zm86 43h8v8h-8zm66-43h7v7h-7zm-35 31h7v7h-7zm920-31h8v8h-8zm-86 43h8v8h-8zm-66-43h7v7h-7zm35 31h7v7h-7z"/></g>
  
  <path fill="#30213b" d="M104 140h24v112h-24zm42 26h16v-20h18v20h20v86h-54zm906-26h24v112h-24zm-42 26h16v-20h18v20h20v86h-54z"/>
  <path fill="#68466c" d="M111 169h9v42h-9zm946 4h9v45h-9z"/>
  <path fill="#4e3556" d="M0 270h26v-18h17v18h18v-26h17v26h23v20H0zm173 4h21v-17h14v17h18v-25h16v25h18v19h-87zm692 0h20v-18h16v18h17v-25h17v25h21v18h-91zm229 0h22v-18h16v18h16v-25h16v25h20v20h-90z"/>
  
  <path fill="#d8d0dc" d="M281 286h20v-15h16v-18h14v-23h15v-18h14v-18h13v-23h15v20h16v14h19v13h-16v14h-13v15h-16v18h-13v20h26v12h-44v-10h-14v10h-49v-10h-20v-11z"/>
  <path fill="#a99daf" d="M303 276v-15h14v-20h14v-21h15v-18h12v-14h9v17h14v13h17v10h-15v15h-14v17h-15v16h-22v10h-20v-10h-15z"/>
  <path fill="#f1e7ef" d="M326 264v-17h13v-18h14v-17h12v-15h7v16h14v12h15v8h-14v12h-14v14h-13v14h-20v-9z"/>
  <path fill="#826e86" d="M283 265h13v-13h11v15h-10v14h-14zm66 17h14v10h-14zm-34 0h14v10h-14z"/>
  <path fill="#e694b6" d="M368 193h10v-7h7v7h-7v7h-10z"/>
  <path fill="#26202f" d="M382 195h8v5h-8z"/>
  <path fill="#f4e49a" d="M383 196h4v3h-4z"/>
  
  <path fill="#b58ad0" d="M78 312h9v-17h8v17h13v-10h8v10h13v13H78zm945 1h12v-17h8v17h13v-10h8v10h12v13h-53z"/>
  <path fill="#f19bc5" d="M83 310h8v-7h7v7h8v6H83zm945 0h8v-7h8v7h8v6h-24z"/>
  <path fill="#f8e697" d="M227 246h7v7h-7zm411 24h6v6h-6zm67-65h6v6h-6zm351 45h7v7h-7zm-900 30h6v6h-6z"/>
  <path fill="#34233d" d="M0 344h1200v16H0z"/>
  {/* Refined wolf avatar, moon texture and foreground landmarks. */}
  <g shapeRendering="crispEdges">
    {/* Wolf face and coat: crisp ear insets, eye line, muzzle, ruff, flank and paw details. */}
    <path fill="#f4edf2" d="M373 174h7v-8h6v9h-6v8h-7zm14 4h7v9h-7z"/>
    <path fill="#bd80b2" d="M375 173h3v7h-3zm13 7h4v5h-4z"/>
    <path fill="#786b82" d="M368 185h7v5h-7zm6 7h7v4h-7z"/>
    <path fill="#fff0ad" d="M383 196h4v3h-4z"/>
    <path fill="#171321" d="M392 201h7v4h-7zm7 4h7v4h-7zm7 4h7v4h-7z"/>
    <path fill="#f8e6ee" d="M390 207h7v4h-7zm8 4h8v4h-8zm8 4h8v4h-8z"/>
    <path fill="#a99daf" d="M375 216h7v9h-7zm-8 10h7v10h-7zm-8 12h7v10h-7zm-9 12h8v9h-8z"/>
    <path fill="#f1e7ef" d="M379 222h6v9h-6zm-8 11h6v9h-6zm-8 11h6v9h-6zm-8 11h6v8h-6z"/>
    <path fill="#756780" d="M325 263h10v8h-10zm8-11h8v7h-8zm10-12h8v7h-8zm10-12h8v7h-8z"/>
    <path fill="#c7bacd" d="M300 265h8v7h-8zm16 7h9v5h-9zm50 9h9v5h-9zm-34 0h8v5h-8z"/>
    <path fill="#f8e697" d="M318 273h4v3h-4zm43 6h4v3h-4z"/>
    {/* Moon craters and stepped rim highlights. */}
    <path fill="#d9c96f" d="M968 66h14v9h-14zm35 39h12v9h-12zm-22 30h10v8h-10zm38-71h9v7h-9z"/>
    <path fill="#fff0ad" d="M954 60h7v28h-7zm8-12h8v7h-8zm70 39h6v23h-6zm-24 51h8v7h-8z"/>
    <path fill="#d487b4" d="M982 89h7v7h-7zm29 41h7v7h-7z"/>
    {/* Foreground landmarks: a few purposeful stones, fern tufts and grouped flowers. */}
    <path fill="#80517b" d="M156 332h20v-7h14v7h10v7h-44zm806 4h18v-6h17v6h13v7h-48zm150-5h16v-7h15v7h11v7h-42z"/>
    <path fill="#c89bd1" d="M165 327h10v5h-10zm810 5h9v5h-9zm149-1h10v5h-10z"/>
    <path fill="#4e3556" d="M20 339h7v-18h6v18h8v-9h6v9h8v7H20zm1128 2h8v-20h6v20h9v-10h6v10h8v7h-37z"/>
    <path fill="#f19bc5" d="M31 316h8v8h-8zm1120 0h8v8h-8z"/>
    <path fill="#f8e697" d="M27 321h5v5h-5zm1124 1h5v5h-5z"/>
    <path fill="#684569" d="M476 338h18v-7h8v7h11v6h-37zm231 1h18v-7h8v7h11v6h-37z"/>
    <path fill="#d487b4" d="M485 332h6v6h-6zm231 1h6v6h-6z"/>
  </g>
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
