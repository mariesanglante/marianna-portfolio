import {NotionArticle} from '../cases/notion-article';
import {CaseHeader,CaseFooter} from '../cases/components';

export const metadata={title:'Design room — Marianna Gonchar',description:'A pixel forest map through my design practice, creative roots and teaching.'};

function ForestLevelArt(){return <svg className="dr-forest-art" viewBox="0 0 1200 360" role="img" aria-label="Detailed 16-bit pixel forest at dusk, with layered trees, a winding path, moon, flowers, and a howling wolf">
  <defs>
    <pattern id="dr-star-grid" width="96" height="72" patternUnits="userSpaceOnUse"><path d="M16 16h8v8h-8zm54 34h5v5h-5zM86 8h3v3h-3z" fill="#e8d8ed" opacity=".8"/></pattern>
    <pattern id="dr-ground-grain" width="64" height="32" patternUnits="userSpaceOnUse"><path d="M4 25h8v3H4zm32-12h6v3h-6zm18 17h5v2h-5zM20 5h4v2h-4z" fill="#dba4c8" opacity=".32"/></pattern>
  </defs>
  <rect width="1200" height="360" fill="#151222"/>
  <rect width="1200" height="220" fill="url(#dr-star-grid)"/>
  <path d="M0 188l80-52 56 34 88-75 60 45 72-55 82 74 80-58 92 61 71-76 76 57 78-94 78 64 76-39 74 53 81-55 66 47v142H0z" fill="#211a33"/>
  <path d="M0 213l94-45 68 33 88-46 86 35 80-52 88 61 95-40 91 45 71-61 82 46 90-38 73 42 81-53 113 58v84H0z" fill="#2b203b"/>
  <path d="M0 245h1200v115H0z" fill="#382842"/>
  <path d="M0 279h1200v81H0z" fill="#503451"/>
  <path d="M0 312h1200v48H0z" fill="#71446a"/>
  <path d="M0 312h1200v48H0z" fill="url(#dr-ground-grain)"/>
  <path d="M506 360l10-20h31v-19h29v-20h31v-19h32v-19h31v-20h31v-20h24v20h31v20h26v20h29v19h30v19h30v20h34l12 20z" fill="#b28baa"/>
  <path d="M562 360l12-17h35v-20h34v-20h33v-19h34v-20h21v20h31v19h29v20h34v20h37l12 17z" fill="#d4b3d0"/>
  <path d="M640 360l18-17h27v-18h38v-18h27v18h30v18h31l18 17z" fill="#ead3e8"/>
  <!-- moon, stars, and drifting fireflies -->
  <path d="M883 38h48v8h24v16h16v32h8v40h-8v24h-16v16h-24v8h-48v-8h-24v-16h-16v-24h-8V78h8V62h16V46h24z" fill="#f4e49a"/>
  <path d="M927 54h18v10h16v20h-10V72h-16v26h-16V80h8zM887 116h16v16h-16zm38 30h18v12h-18zm34-48h12v14h-12z" fill="#e1cf7d"/>
  <path d="M835 86h9v9h-9zm117-48h8v8h-8zm75 62h8v8h-8zm-254-66h9v9h-9zm-46 58h8v8h-8zm396-40h9v9h-9z" fill="#f4e49a"/>
  <path d="M772 60h8v8h-8zm-9-9h8v8h-8zm-9-9h8v8h-8zm207 139h8v8h-8zm-24 10h8v8h-8zm-17 10h8v8h-8z" fill="#c89bd1"/>
  <!-- distant pine crowns -->
  <path d="M456 226v-30h-18v-20h18v-18h18v-20h18v-17h23v17h18v20h17v18h18v20h-18v30z" fill="#251c37"/>
  <path d="M727 228v-27h-18v-19h18v-18h18v-21h18v-17h22v17h17v21h18v18h16v19h-16v27z" fill="#251b36"/>
  <path d="M724 203h34v7h-34zm34-28h24v7h-24zm24 29h35v7h-35z" fill="#392542"/>
  <!-- left ancient forest tree -->
  <path d="M108 246V176H91v-18h18v-22h18v-24h20v-20h18V82h20v10h21v17h19v17h18v19h17v22h-17v16h-21v23h-19v40z" fill="#30213b"/>
  <path d="M162 246v-48h17v-24h18v-18h18v-18h17v17h-17v22h-18v24h-18v45z" fill="#4a2d51"/>
  <path d="M125 140h25v13h-25zm43-43h20v14h-20zm38 23h21v14h-21zm-63 68h22v12h-22z" fill="#9b6893"/>
  <path d="M118 246h16v22h-16zm24-17h16v17h-16zm20-24h16v24h-16zm18-25h16v25h-16zm21-21h16v21h-16zm21-19h16v19h-16z" fill="#b58ad0"/>
  <path d="M119 244h9v9h-9zm22-17h9v9h-9zm23-23h9v9h-9zm20-24h9v9h-9zm21-22h9v9h-9z" fill="#e89ac5"/>
  <!-- right giant tree and roots -->
  <path d="M1041 259v-48h-17v-23h-18v-22h-17v-19h-17v-20h-19v-22h20V88h22V69h19V55h21v14h20v16h19v18h18v21h17v20h-17v19h-18v19h-19v21h-17v56z" fill="#2b1e39"/>
  <path d="M1051 255v-56h17v-22h18v-18h18v-21h17v-19h17v19h-17v20h-17v22h-18v21h-18v54z" fill="#4b2c50"/>
  <path d="M1011 108h24v14h-24zm44-35h20v14h-20zm38 26h20v14h-20zm-80 62h22v14h-22z" fill="#95628c"/>
  <path d="M1000 154h18v-18h18v-17h18v-17h18v17h-18v17h-18v18h-18v31h-18zm69 12h18v-18h18v-18h18v18h-18v18h-18v22h-18z" fill="#b58ad0"/>
  <!-- canopy leaves overhead -->
  <path d="M0 0h238v21h-19v18h-20v20h-24v17h-24v20h-27v15h-19v-17H87V75H68V58H50V42H30V25H0zM1200 0H969v18h21v17h19v19h21v18h23v22h22v16h24V91h17V73h18V58h20V40h21V24h24z" fill="#281d35"/>
  <path d="M0 0h174v16h-18v15h-19v18h-21v16H96v17H75V67H57V50H39V34H20V18H0zm1200 0h-171v16h18v15h20v18h20v16h20v17h20V67h18V50h18V34h19V18h18z" fill="#3d2947"/>
  <path d="M48 27h20v16H48zm32 22h20v16H80zm47 24h21v16h-21zm55-42h19v16h-19zm834-7h20v16h-20zm-35 25h20v16h-20zm-44 24h21v16h-21zm-53-40h19v16h-19z" fill="#765076"/>
  <path d="M26 18h11v11H26zm76 35h11v11h-11zm82-32h11v11h-11zm940 2h11v11h-11zm-61 32h11v11h-11zm-79-35h11v11h-11z" fill="#cf85b6"/>
  <!-- hanging vines -->
  <path d="M294 0h8v58h-8zm8 58h16v8h-16zm-42 0h8v34h-8zm-8 34h16v8h-16zm612-92h8v49h-8zm8 49h16v8h-16zm44-49h8v73h-8zm-8 73h16v8h-16z" fill="#6d4b70"/>
  <path d="M294 48h8v8h-8zm-42 35h8v8h-8zm628-43h8v8h-8zm36 57h8v8h-8z" fill="#a675a0"/>
  <!-- trunks, roots, and bark detail -->
  <path d="M70 268v-43h14v-24h18v67zm1050 0v-52h18v-24h15v76z" fill="#30213b"/>
  <path d="M78 237h7v26h-7zm18-26h7v16h-7zm1028 2h7v38h-7zm16-16h7v15h-7z" fill="#765076"/>
  <path d="M75 268h-34v9h34v9h24v-9h18v-9H98zm1044 0h-26v9h26v9h25v-9h18v-9z" fill="#30213b"/>
  <!-- wolf companion, sitting on a mossy ledge -->
  <path d="M248 276h18v-14h16v-20h14v-29h14v-18h16v-16h14v-14h17v18h16v18h16v13h-16v15h-15v14h-18v14h-13v18h24v10h-58v-9h-18v9h-51v-9h-19v-10h22z" fill="#c9c0cf"/>
  <path d="M265 266v-18h13v-25h15v-22h14v-16h15v-13h10v18h15v15h17v13h-17v15h-14v14h-16v18h-17v10h-28z" fill="#aaa0b5"/>
  <path d="M282 258v-18h12v-18h14v-21h12v-16h8v17h14v14h15v10h-15v14h-14v18h-12v10h-23v-10z" fill="#e8dce9"/>
  <path d="M301 197h10v-18h10v-14h10v22h-9v15h-11v12h-10zm46-7h11v10h15v10h-14v-8h-12z" fill="#d8c7db"/>
  <path d="M260 253h16v-15h10v16h-10v16h-16zm63 22h16v10h-16zm-36 0h16v10h-16z" fill="#756a86"/>
  <path d="M344 183h8v-6h8v6h-8v7h-8z" fill="#ffb4ca"/>
  <path d="M356 189h8v5h-8z" fill="#211a2b"/>
  <path d="M356 189h4v3h-4z" fill="#f7e9a0"/>
  <path d="M378 196h14v7h-14zm13 7h8v7h-8zm8 7h8v7h-8z" fill="#f1b6dc"/>
  <!-- foreground foliage clusters -->
  <path d="M0 284h20v-22h18v-15h17v15h15v22h19v-17h16v17h20v27H0zm424 6h19v-22h18v-17h19v17h15v22h20v24H424zm490-1h18v-21h17v-18h18v18h18v21h19v-16h15v16h20v27H914zm199 2h18v-20h16v-18h18v18h18v20h17v-14h16v14h18v24h-121z" fill="#533457"/>
  <path d="M16 282h12v-13h12v-9h13v9h11v13h12v13H16zm425 0h13v-13h13v-12h13v12h13v13h13v13h-65zm491-1h12v-12h13v-11h13v11h12v12h13v13h-63zm272-1h12v-12h13v-11h12v11h13v12h11v13h-61z" fill="#80517b"/>
  <path d="M14 281h10v-8h10v-8h10v8h10v8h8v8H14zm425 0h9v-9h10v-8h10v8h10v9h10v8h-49zm491-1h10v-8h10v-8h10v8h10v8h10v8h-50zm271-1h9v-8h10v-8h10v8h10v8h10v8h-49z" fill="#a874a2"/>
  <!-- mushrooms, ferns, blossoms, grass -->
  <path d="M92 296h6v-13h7v-11h8v11h8v13h6v17H92zm1002-1h8v-16h7v-12h9v12h8v16h7v17h-39z" fill="#dc9ac2"/>
  <path d="M91 287h36v8H91zm1002-4h40v8h-40z" fill="#f4c38d"/>
  <path d="M138 319h8v-16h8v16h12v-13h8v13h12v-18h8v18h10v6h-66zm822-1h9v-19h8v19h13v-12h8v12h14v-18h8v18h10v7h-70zm168-2h8v-16h8v16h12v-13h8v13h12v8h-56z" fill="#b58ad0"/>
  <path d="M170 316h9v-11h7v11h9v5h-25zm825 0h9v-10h8v10h9v5h-26z" fill="#f19bc5"/>
  <path d="M45 337h7v-17h7v17h10v-11h7v11h10v-16h7v16h10v8H45zm320 1h7v-14h7v14h11v-10h7v10h11v9h-43zm460-1h7v-17h7v17h10v-11h7v11h10v-16h7v16h10v8H825zm267 1h7v-13h7v13h10v-10h7v10h12v9h-43z" fill="#d487b4"/>
  <path d="M0 350h1200v10H0z" fill="#36243d"/>
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
