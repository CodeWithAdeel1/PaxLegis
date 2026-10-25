import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import AdminNav from '../../../../components/AdminNav';
import AdminRequestActions from '../../../../components/AdminRequestActions';
import { pool } from '../../../../lib/db';
import { formatPakistanDate } from '../../../../lib/admin-requests';
import { getAdminSession, validRequestId } from '../../../../lib/admin-session';
import { CalendarDays, CheckCircle2, Hash, Mail, MapPin, MessageSquareText, Phone, UserRound } from 'lucide-react';

export const dynamic = 'force-dynamic';

function Field({ label, Icon, children }) {
  return <div className="admin-detail-field"><span className="admin-detail-field-icon"><Icon aria-hidden="true" /></span><div><dt>{label}</dt><dd>{children || 'Not provided'}</dd></div></div>;
}

export default async function AdminRequestDetail({ params }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  if (!validRequestId(id)) notFound();
  const result = await pool.query('SELECT * FROM consultations WHERE id = $1', [id]);
  const request = result.rows[0];
  if (!request) notFound();

  if (!request.is_read) {
    await pool.query('UPDATE consultations SET is_read = true WHERE id = $1', [id]);
    request.is_read = true;
  }
  const phoneDigits = request.phone.replace(/\D/g, '');
  const whatsappUrl = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent('Hello, I am contacting you about your consultation request.')}`
    : null;

  return (
    <>
      <AdminNav username={session.username} />
      <main className="admin-main">
        <p className="admin-back"><Link href="/admin">Requests</Link><span>/</span><span>{request.name}</span></p>
        <div className="admin-heading">
          <div><p className="admin-eyebrow">Request received {formatPakistanDate(request.created_at)}</p><h1>{request.name}</h1></div>
        </div>
        <div className="admin-detail-layout">
          <section className="admin-detail-card">
            <h2>Request details</h2>
            <dl className="admin-detail-list">
              <Field label="Request number" Icon={Hash}>{request.id}</Field>
              <Field label="Name" Icon={UserRound}>{request.name}</Field>
              <Field label="Email" Icon={Mail}><a href={`mailto:${request.email}`}>{request.email}</a></Field>
              <Field label="Phone / WhatsApp" Icon={Phone}><a href={`tel:${phoneDigits}`}>{request.phone}</a></Field>
              <Field label="Country" Icon={MapPin}>{request.country}</Field>
              <Field label="Matter" Icon={MessageSquareText}>{request.service}</Field>
              <Field label="Status" Icon={CheckCircle2}><span className={`admin-status ${request.status}`}>{request.status}</span></Field>
              <Field label="Read status" Icon={CheckCircle2}>{request.is_read ? 'Read' : 'Unread'}</Field>
              <Field label="Date received" Icon={CalendarDays}>{formatPakistanDate(request.created_at)}</Field>
              <Field label="Last updated" Icon={CalendarDays}>{formatPakistanDate(request.updated_at)}</Field>
              <Field label="Message" Icon={MessageSquareText}><div className="admin-message">{request.message || 'No message provided'}</div></Field>
            </dl>
          </section>
          <AdminRequestActions id={request.id} status={request.status} notes={request.notes} phone={phoneDigits} whatsappUrl={whatsappUrl} email={request.email} />
        </div>
      </main>
    </>
  );
}
