import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/admin-session';

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please complete both password fields.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Please complete both password fields.' }, { status: 400 });
  }

  const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
  const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
  if (currentPassword.length > 200 || newPassword.length < 10 || newPassword.length > 200) {
    return NextResponse.json({ error: 'Your new password must be at least 10 characters.' }, { status: 400 });
  }

  const { rows } = await pool.query(
    'SELECT password_hash FROM admin_users WHERE id = $1',
    [session.id]
  );
  if (!rows[0] || !await bcrypt.compare(currentPassword, rows[0].password_hash)) {
    return NextResponse.json({ error: 'Your current password is incorrect.' }, { status: 400 });
  }

  const hash = await bcrypt.hash(newPassword, 12);
  await pool.query('UPDATE admin_users SET password_hash = $1 WHERE id = $2', [hash, session.id]);
  return NextResponse.json({ ok: true });
}
