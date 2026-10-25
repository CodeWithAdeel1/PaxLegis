import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminNav from '../../components/AdminNav';
import { pool } from '../../lib/db';
import { buildRequestWhere, PAGE_SIZE, readFilters } from '../../lib/admin-requests';
import { getAdminSession } from '../../lib/admin-session';
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileSpreadsheet, FileText, Inbox, Search, UsersRound } from 'lucide-react';

export const dynamic = 'force-dynamic';

function queryString(filters, page) {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.matter) params.set('matter', filters.matter);
  if (filters.status) params.set('status', filters.status);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);
  if (page > 1) params.set('page', String(page));
  return params.toString();
}

function Metric({ label, value, Icon, highlight = false }) {
  return (
    <article className={`admin-metric${highlight ? ' highlight' : ''}`}>
      <div className="admin-metric-top">
        <span className="admin-metric-icon"><Icon aria-hidden="true" /></span>
        {highlight && Number(value) > 0 && <span className="admin-pulse" aria-label="Unread requests" />}
      </div>
      <strong>{value}</strong>
      <span className="admin-metric-label">{label}</span>
    </article>
  );
}

function dashboardGreeting() {
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    hour12: false,
  }).format(new Date()));
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
}


function friendlyRequestDate(value) {
  const date = new Date(value);
  const dateKey = (input) => new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(input);
  const today = dateKey(new Date());
  const requestedDay = dateKey(date);
  if (today === requestedDay) {
    return `Today, ${new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit' }).format(date)}`;
  }
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

export default async function AdminDashboard({ searchParams }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const params = await searchParams;
  const filters = readFilters(params);
  const where = buildRequestWhere(filters);
  const offset = (filters.page - 1) * PAGE_SIZE;
  const [tableResult, countResult, mattersResult] = await Promise.all([
    pool.query(
      `SELECT id, created_at, name, phone, service, status, is_read, LEFT(message, 100) AS message
       FROM consultations ${where.sql}
       ORDER BY created_at DESC, id DESC
       LIMIT $${where.values.length + 1} OFFSET $${where.values.length + 2}`,
      [...where.values, PAGE_SIZE, offset]
    ),
    pool.query(
      `SELECT
        COUNT(*) FILTER (WHERE ${where.sql ? where.sql.slice(6) : 'TRUE'})::int AS filtered_count,
        COUNT(*) FILTER (WHERE is_read = false)::int AS new_count,
        COUNT(*)::int AS total_count,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('week', NOW() AT TIME ZONE 'Asia/Karachi') AT TIME ZONE 'Asia/Karachi')::int AS week_count,
        COUNT(*) FILTER (WHERE status = 'contacted')::int AS contacted_count,
        COUNT(*) FILTER (WHERE status = 'closed')::int AS closed_count
       FROM consultations`,
      where.values
    ),
    pool.query('SELECT DISTINCT service FROM consultations ORDER BY service'),
  ]);
  const rows = tableResult.rows;
  const summary = countResult.rows[0];
  const totalRows = summary.filtered_count;
  const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
  const exportQuery = queryString(filters, 1);
  const hasFilters = Boolean(filters.search || filters.matter || filters.status || filters.from || filters.to);
  const today = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  return (
    <>
      <AdminNav username={session.username.charAt(0).toUpperCase() + session.username.slice(1)} />
      <main className="admin-main">
        <div className="admin-heading">
          <div><p className="admin-eyebrow">Office dashboard</p><h1>{dashboardGreeting()}, {session.username.charAt(0).toUpperCase() + session.username.slice(1)}
            </h1><p className="admin-subtitle"><CalendarDays size={17} aria-hidden="true" />{today}</p></div>
          <div className="admin-downloads">
            <a className="admin-button primary" href={`/api/admin/export/excel${exportQuery ? `?${exportQuery}` : ''}`}><FileSpreadsheet size={18} aria-hidden="true" />Download Excel</a>
            <a className="admin-button secondary" href={`/api/admin/export/csv${exportQuery ? `?${exportQuery}` : ''}`}><FileText size={18} aria-hidden="true" />Download CSV</a>
          </div>
          {params?.notice === 'deleted' && <p className="admin-alert success" role="status">Request deleted.</p>}
        </div>

        <section className="admin-metrics" aria-label="Request summary">
          <Metric label="New requests" value={summary.new_count} Icon={Inbox} highlight />
          <Metric label="Total requests" value={summary.total_count} Icon={UsersRound} />
          <Metric label="This week" value={summary.week_count} Icon={CalendarDays} />
          <Metric label="Contacted" value={summary.contacted_count} Icon={Clock3} />
          <Metric label="Closed" value={summary.closed_count} Icon={CheckCircle2} />
        </section>

        <form className="admin-filters" method="get">
          <label className="admin-search">Search requests<span className="admin-search-control"><Search aria-hidden="true" /><input name="search" type="search" placeholder="Name, phone, email or message" defaultValue={filters.search} /></span></label>
          <label>Matter
            <select name="matter" defaultValue={filters.matter}>
              <option value="">All matters</option>
              {mattersResult.rows.map(({ service }) => <option key={service} value={service}>{service}</option>)}
            </select>
          </label>
          <label>Status
            <select name="status" defaultValue={filters.status}>
              <option value="">All statuses</option>
              <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
            </select>
          </label>
          <label>From date<input type="date" name="from" defaultValue={filters.from} /></label>
          <label>To date<input type="date" name="to" defaultValue={filters.to} /></label>
          <div className="admin-filter-buttons">
            <button className="admin-button primary" type="submit"><Search size={17} aria-hidden="true" /></button>
            <Link className="admin-button secondary" href="/admin">Clear filters</Link>
          </div>
        </form>

        <section id="admin-requests" className="admin-table-card" aria-label="Consultation requests">
          {rows.length === 0 ? (
            <div className="admin-empty">
              <span className="admin-empty-icon"><Inbox aria-hidden="true" /></span>
              <h2>{hasFilters ? 'No requests match those filters' : 'No requests yet.'}</h2>
              <p>{hasFilters ? 'Try changing your search or filters.' : 'New consultation requests will appear here.'}</p>
            </div>
          ) : (
            <>
              <div className="admin-table-scroll">
                <table className="admin-table">
                  <thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>Matter</th><th>Message</th><th>Status</th></tr></thead>
                  <tbody>
                    {rows.map((row) => {
                      const phoneDigits = row.phone.replace(/\D/g, '');
                      return (
                      <tr key={row.id} className={!row.is_read ? 'admin-unread' : undefined}>
                        <td><Link href={`/admin/requests/${row.id}`} className="admin-row-link">{friendlyRequestDate(row.created_at)}</Link></td>
                        <td><Link href={`/admin/requests/${row.id}`} className="admin-row-link admin-name-cell"><span className="admin-initials">{initials(row.name)}</span><strong>{row.name}</strong>{!row.is_read && <span className="admin-new-dot" title="Unread request"><span className="sr-only">New</span></span>}</Link></td>
                        <td><Link href={`/admin/requests/${row.id}`} className="admin-row-link">{row.phone}</Link></td>
                        <td><Link href={`/admin/requests/${row.id}`} className="admin-row-link"><span className="admin-matter-chip">{row.service}</span></Link></td>
                        <td><Link href={`/admin/requests/${row.id}`} className="admin-row-link">{row.message || '—'}</Link></td>
                        <td><Link href={`/admin/requests/${row.id}`} className="admin-row-link"><span className={`admin-status ${row.status}`}>{row.status}</span></Link></td>
                        <td className="admin-mobile-quick">
                          {phoneDigits && <a className="admin-quick-link" href={`tel:${phoneDigits}`} aria-label={`Call ${row.name}`}>Call</a>}
                          {phoneDigits && <a className="admin-quick-link" href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${row.name}`}>WhatsApp</a>}
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
              <div className="admin-pagination">
                <span>Showing {offset + 1}–{offset + rows.length} of {totalRows}</span>
                <div>
                  {filters.page > 1 ? <Link className="admin-button secondary small" href={`/admin?${queryString(filters, filters.page - 1)}`}><ChevronLeft size={17} aria-hidden="true" />Previous</Link> : <button className="admin-button secondary small" type="button" disabled><ChevronLeft size={17} aria-hidden="true" />Previous</button>}
                  <span>Page {filters.page} of {totalPages}</span>
                  {filters.page < totalPages ? <Link className="admin-button secondary small" href={`/admin?${queryString(filters, filters.page + 1)}`}>Next<ChevronRight size={17} aria-hidden="true" /></Link> : <button className="admin-button secondary small" type="button" disabled>Next<ChevronRight size={17} aria-hidden="true" /></button>}
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
