import ExcelJS from 'exceljs';
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

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Consultation requests');
  sheet.columns = [
    { header: 'Request #', key: 'id', width: 14 },
    { header: 'Date', key: 'date', width: 26 },
    { header: 'Name', key: 'name', width: 26 },
    { header: 'Email', key: 'email', width: 32 },
    { header: 'Phone', key: 'phone', width: 20 },
    { header: 'Country', key: 'country', width: 18 },
    { header: 'Matter', key: 'service', width: 26 },
    { header: 'Status', key: 'status', width: 16 },
    { header: 'Message', key: 'message', width: 60 },
    { header: 'Notes', key: 'notes', width: 60 },
    { header: 'Read', key: 'read', width: 12 },
    { header: 'Updated', key: 'updated', width: 26 },
  ];
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
  sheet.getRow(1).font = { bold: true };
  sheet.autoFilter = { from: 'A1', to: 'L1' };

  for (const row of rows) {
    sheet.addRow({
      id: row.id,
      date: formatPakistanDate(row.created_at),
      name: safeSpreadsheetText(row.name),
      email: safeSpreadsheetText(row.email),
      phone: safeSpreadsheetText(row.phone),
      country: safeSpreadsheetText(row.country),
      service: safeSpreadsheetText(row.service),
      status: row.status,
      message: safeSpreadsheetText(row.message),
      notes: safeSpreadsheetText(row.notes),
      read: row.is_read ? 'Yes' : 'No',
      updated: formatPakistanDate(row.updated_at),
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="consultation-requests.xlsx"',
      'Cache-Control': 'no-store',
    },
  });
}
