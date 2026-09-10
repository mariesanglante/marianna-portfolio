import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE, ACCESS_DURATION, createAccessToken } from '../../../lib/prototype-access';

export async function POST(request: NextRequest) {
  const headers = { 'Cache-Control': 'private, no-store' };
  if (request.headers.get('origin') !== request.nextUrl.origin) return NextResponse.json({ error: 'Please try again from this website.' }, { status: 403, headers });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Enter the six-digit access code.' }, { status: 400, headers }); }
  if (body?.code !== '666666') return NextResponse.json({ error: 'That code isn’t correct. Please try again.' }, { status: 401, headers });
  try {
    const response = NextResponse.json({ ok: true }, { headers });
    response.cookies.set(ACCESS_COOKIE, await createAccessToken(), { httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'strict', path: '/', maxAge: ACCESS_DURATION });
    return response;
  } catch { return NextResponse.json({ error: 'Access is temporarily unavailable. Please contact me for help.' }, { status: 503, headers }); }
}

export async function DELETE(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return new NextResponse(null, { status: 403 });
  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set(ACCESS_COOKIE, '', { httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'strict', path: '/', maxAge: 0 });
  return response;
}
