import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, sessionCookieOptions } from '../../../../lib/admin-auth';
import { getAdminSession } from '../../../../lib/admin-session';

export async function POST() {
  if (!await getAdminSession()) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, '', { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
