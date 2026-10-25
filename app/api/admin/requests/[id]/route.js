import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';
import { REQUEST_STATUSES } from '../../../../../lib/admin-requests';
import { getAdminSession, validRequestId } from '../../../../../lib/admin-session';

export async function PATCH(request, { params }) {
  if (!await getAdminSession()) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });
  }
  const { id } = await params;
  if (!validRequestId(id)) return NextResponse.json({ error: 'Request not found.' }, { status: 404 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please check the information and try again.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Please check the information and try again.' }, { status: 400 });
  }

  const updates = [];
  const values = [];
  if (Object.hasOwn(body, 'status')) {
    if (!REQUEST_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Choose a valid status.' }, { status: 400 });
    }
    values.push(body.status);
    updates.push(`status = $${values.length}`);
  }
  if (Object.hasOwn(body, 'notes')) {
    if (typeof body.notes !== 'string' || body.notes.length > 10000) {
      return NextResponse.json({ error: 'Notes must be 10,000 characters or fewer.' }, { status: 400 });
    }
    values.push(body.notes.trim());
    updates.push(`notes = $${values.length}`);
  }
  if (!updates.length) return NextResponse.json({ error: 'There is nothing to save.' }, { status: 400 });

  values.push(id);
  const { rowCount } = await pool.query(
    `UPDATE consultations SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${values.length}`,
    values
  );
  if (!rowCount) return NextResponse.json({ error: 'Request not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  if (!await getAdminSession()) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });
  }
  const { id } = await params;
  if (!validRequestId(id)) return NextResponse.json({ error: 'Request not found.' }, { status: 404 });

  const { rowCount } = await pool.query('DELETE FROM consultations WHERE id = $1', [id]);
  if (!rowCount) return NextResponse.json({ error: 'Request not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
