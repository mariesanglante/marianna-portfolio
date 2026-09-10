'use client';
import { useState } from 'react';
export default function AccessForm() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  return <form className="nda-form" onSubmit={async event => {
    event.preventDefault(); setError(''); setPending(true);
    try {
      const response = await fetch('/api/prototype-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
      const result = await response.json();
      if (!response.ok) { setError(result.error || 'Unable to unlock. Please try again.'); return; }
      const requested = new URLSearchParams(window.location.search).get('returnTo') || '/cases';
      const destination = new URL(requested, window.location.origin);
      window.location.assign(destination.origin === window.location.origin && !destination.pathname.startsWith('/api/') && destination.pathname !== '/nda-access' ? destination.href : '/cases');
    } catch { setError('Unable to connect. Please try again.'); }
    finally { setPending(false); }
  }}><label htmlFor="nda-code">Access code</label><input id="nda-code" name="code" type="password" inputMode="numeric" pattern="[0-9]{6}" autoComplete="off" maxLength={6} minLength={6} required value={code} onChange={event => { setCode(event.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }} aria-invalid={!!error} aria-describedby={error ? 'nda-error' : undefined} placeholder="Six-digit code"/><button disabled={pending} type="submit">{pending ? 'Unlocking…' : 'Unlock private work ↗'}</button><p className="nda-error" id="nda-error" role="status">{error}</p></form>;
}
