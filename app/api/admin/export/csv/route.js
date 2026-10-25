import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';
import { buildRequestWhere, formatPakistanDate, readFilters, safeSpreadsheetText } from '../../../../../lib/admin-requests';
import { getAdminSession } from '../../../../../lib/admin-session';

export async function GET(request) {
  if (!await getAdminSession()) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });
  }

  const filters = readFilters(new URL(request.url).searchParams);
  const where = buildRequestWhere(filters);
  const { rows } = await pool.query(
    `SELECT id, created_at, name, email, phone, country, service, status, message, notes, is_read, updated_at
     FROM consultations ${where.sql} ORDER BY created_at DESC, id DESC`,
    where.values
  );
  const columns = ['Request #', 'Date', 'Name', 'Email', 'Phone', 'Country', 'Matter', 'Status', 'Message', 'Notes', 'Read', 'Updated'];
  const values = rows.map((row) => [
    row.id, formatPakistanDate(row.created_at), row.name, row.email, row.phone, row.country,
    row.service, row.status, row.message, row.notes, row.is_read ? 'Yes' : 'No',
    formatPakistanDate(row.updated_at),
  ]);
  const csvCell = (value) => {
    const safe = safeSpreadsheetText(value).replace(/"/g, '""');
    return `"${safe}"`;
  };
  const csv = [columns, ...values].map((row) => row.map(csvCell).join(',')).join('\r\n');
  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="consultation-requests.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
