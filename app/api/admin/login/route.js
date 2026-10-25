import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from '../../../../lib/db';
import { createAdminSession, ADMIN_COOKIE, sessionCookieOptions } from '../../../../lib/admin-auth';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map();
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

function clientKey(request) {
  return request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';
}

export async function POST(request) {
  if (failures.size > 10000) {
    const now = Date.now();
    for (const [ip, attempts] of failures) {
      const active = attempts.filter((time) => now - time < WINDOW_MS);
      if (active.length) failures.set(ip, active);
      else failures.delete(ip);
    }
  }
  const key = clientKey(request);
  const now = Date.now();
  const recent = (failures.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_FAILURES) {
    failures.set(key, recent);
    return NextResponse.json({ error: 'Too many sign-in attempts. Please wait 15 minutes.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Enter your username and password.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Enter your username and password.' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase().slice(0, 80) : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const result = username && password.length <= 200
    ? await pool.query('SELECT id, username, password_hash FROM admin_users WHERE username = $1', [username])
    : { rows: [] };
  const user = result.rows[0];
  const passwordMatches = await bcrypt.compare(password.slice(0, 200), user?.password_hash || DUMMY_HASH);

  if (!user || !passwordMatches) {
    failures.set(key, [...recent, now]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json({ error: 'Wrong username or password' }, { status: 401 });
  }

  failures.delete(key);
  const token = await createAdminSession(user);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions());
  return response;
}
