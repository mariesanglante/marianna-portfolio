// Server-only: imported by the request proxy and access endpoint, never client UI.
export const ACCESS_COOKIE = 'portfolio_prototype_access';
export const ACCESS_DURATION = 8 * 60 * 60;
const encoder = new TextEncoder();

async function signingKey() {
  const secret = process.env.PROTOTYPE_ACCESS_SECRET;
  if (!secret) throw new Error('Prototype access is not configured');
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createAccessToken() {
  const expires = String(Date.now() + ACCESS_DURATION * 1000);
  const signature = await crypto.subtle.sign('HMAC', await signingKey(), encoder.encode(expires));
  return `${expires}.${Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, '0')).join('')}`;
}

export async function hasPrototypeAccess(token?: string) {
  if (!token) return false;
  const [expires, signature, extra] = token.split('.');
  if (extra || !/^\d{13}$/.test(expires) || !/^[a-f0-9]{64}$/.test(signature ?? '') || Number(expires) <= Date.now()) return false;
  try {
    const bytes = Uint8Array.from(signature.match(/../g)!, byte => parseInt(byte, 16));
    return await crypto.subtle.verify('HMAC', await signingKey(), bytes, encoder.encode(expires));
  } catch {
    return false;
  }
}
