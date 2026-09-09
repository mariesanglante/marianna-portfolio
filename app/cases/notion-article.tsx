import {LumioDemo} from './lumio-demo';
import {Fragment} from 'react';
import originals from './notion-content.json';
export type OriginalPage = {title:string;html:string;headings:{id:string;title:string;level:number}[];properties:{label:string;html:string}[];comments:{author:string;html:string}[];cover:string|null;source:string};
export const originalPages = originals as Record<string,OriginalPage>;
export function NotionArticle({slug}:{slug:string}){
 const page=originalPages[slug];if(!page)return null;
 const videoStart=slug==='lumio-couples'?page.html.indexOf('<div class="notion-columns"><div class="notion-column"><figure class="notion-video"'): -1;
 const videoEnd=videoStart<0?-1:page.html.indexOf('<h2 id="n-f68e19be-d1f5-4abb-a70d-f3fab0061d9e">',videoStart);
 const sections=videoStart>=0&&videoEnd>videoStart?[page.html.slice(0,videoStart),page.html.slice(videoEnd)]:[page.html];
 const headings=page.headings.filter(h=>h.level===2);
 return <div className="original-case"><div className="original-heading"><span className="eyebrow">FULL PROJECT</span><p>{page.title}</p></div>{page.properties.length>0&&<dl className="notion-properties">{page.properties.map(p=><div key={p.label}><dt>{p.label}</dt><dd dangerouslySetInnerHTML={{__html:p.html}}/></div>)}</dl>}{page.cover&&<figure className="notion-source-cover"><img src={page.cover} alt="Original Notion page cover"/></figure>}{headings.length>1&&<details className="notion-contents"><summary>In this case <span>↓</span></summary><nav aria-label="Case contents">{headings.map(h=><a href={`#${h.id}`} key={h.id}>{h.title}</a>)}</nav></details>}{sections.map((html,i)=><Fragment key={i}>{i===1&&<LumioDemo/>}<div className="notion-body" dangerouslySetInnerHTML={{__html:html}}/></Fragment>)}{page.comments.length>0&&<section className="notion-comments"><h2>Project notes</h2>{page.comments.map((c,i)=><div key={i}><div className="eyebrow">{c.author}</div><p dangerouslySetInnerHTML={{__html:c.html}}/></div>)}</section>}<div className="notion-source-note"><p>Original project text and media. Dates and reported results reflect the original write-up.</p></div></div>
}
