import AccessForm from './access-form';
import './access.css';
export const metadata = { title: 'Private project access — Marianna Gonchar', robots: { index: false, follow: false } };
export default function NDAAccessPage() {
  return <main className="nda-page" id="main"><a className="nda-wordmark" href="/">Marianna Gonchar.</a><section className="nda-card" aria-labelledby="nda-title"><span className="nda-label">NDA · RESTRICTED ACCESS</span><h1 id="nda-title">A closer look,<br/><i>by invitation.</i></h1><p>These case studies and interactive prototypes are available by request. Enter your access code to continue.</p><AccessForm/><a className="nda-request" href="mailto:marfantastik@gmail.com?subject=Portfolio%20access%20request">Request access ↗</a></section><a className="nda-back" href="/cases">← Back to selected work</a></main>;
}
