import {NotionArticle} from '../cases/notion-article';
import {CaseHeader,CaseFooter} from '../cases/components';
export const metadata={title:'Design room — Marianna Gonchar',description:'My background, creative practice, teaching and full project archive.'};
export default function DesignRoom(){return <><CaseHeader/><main id="main" className="wrap case-study tone-purple"><a className="case-back" href="/">← Home</a><div className="case-intro"><div className="eyebrow">BEHIND THE WORK</div><h1>My design <span className="serif">room.</span></h1></div><NotionArticle slug="design-room"/></main><CaseFooter/></>}
