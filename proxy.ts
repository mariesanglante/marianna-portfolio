import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE, hasPrototypeAccess } from './lib/prototype-access';

export async function proxy(request: NextRequest) {
  // ManGo is a public concept case; the other project access rules remain intact.
  if (request.nextUrl.pathname.replace(/\/$/, '') === '/cases/mango-bank') {
    return NextResponse.next();
  }
  const allowed = await hasPrototypeAccess(request.cookies.get(ACCESS_COOKIE)?.value);
  const response = allowed ? NextResponse.next() : NextResponse.redirect(new URL(`/nda-access?returnTo=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`, request.url));
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.headers.set('Vary', 'Cookie');
  return response;
}

export const config = {
  matcher: ['/cases/:slug+', '/semaverse/:path*', '/pearl/:path*', '/welltrax/:path*', '/rainforest/:path*', '/cloudbilling/:path*', '/simcare/:path*', '/causal-brain/:path*', '/design-room/:path*'],
};
