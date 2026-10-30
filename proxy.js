import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_COOKIE = 'paxlegis_admin';

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;
  if (pathname === '/admin/login' || pathname === '/api/admin/login') return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const secret = process.env.AUTH_SECRET;
  if (token && secret && secret.length >= 32) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ['HS256'] });
      if (payload.sub && typeof payload.username === 'string') return NextResponse.next();
    } catch {
      // Invalid or expired sessions are handled like signed-out requests.
    }
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });
  }

  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
