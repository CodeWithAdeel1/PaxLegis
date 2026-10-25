export const REQUEST_STATUSES = ['new', 'contacted', 'closed'];
export const PAGE_SIZE = 20;

export function readFilters(params) {
  const values = params instanceof URLSearchParams
    ? Object.fromEntries(params.entries())
    : params || {};
  return {
    search: typeof values.search === 'string' ? values.search.trim().slice(0, 200) : '',
    matter: typeof values.matter === 'string' ? values.matter.trim().slice(0, 80) : '',
    status: REQUEST_STATUSES.includes(values.status) ? values.status : '',
    from: isDate(values.from) ? values.from : '',
    to: isDate(values.to) ? values.to : '',
    page: /^\d+$/.test(String(values.page || '')) && Number.isSafeInteger(Number(values.page))
      ? Math.min(1000000, Math.max(1, Number(values.page)))
      : 1,
  };
}

function isDate(value) {
  return typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

export function buildRequestWhere(filters) {
  const clauses = [];
  const values = [];
  const add = (clause, value) => {
    values.push(value);
    clauses.push(clause.replace('?', `$${values.length}`));
  };

  if (filters.search) {
    const search = `%${filters.search.replace(/[\\%_]/g, '\\$&')}%`;
    values.push(search);
    const n = `$${values.length}`;
    clauses.push(`(name ILIKE ${n} ESCAPE E'\\\\' OR phone ILIKE ${n} ESCAPE E'\\\\' OR email ILIKE ${n} ESCAPE E'\\\\' OR message ILIKE ${n} ESCAPE E'\\\\')`);
  }
  if (filters.matter) add('service = ?', filters.matter);
  if (filters.status) add('status = ?', filters.status);
  if (filters.from) add(`(created_at AT TIME ZONE 'Asia/Karachi')::date >= ?::date`, filters.from);
  if (filters.to) add(`(created_at AT TIME ZONE 'Asia/Karachi')::date <= ?::date`, filters.to);

  return { sql: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', values };
}

export function formatPakistanDate(value) {
  if (!value) return '';
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(new Date(value));
  const get = (type) => parts.find((part) => part.type === type)?.value || '';
  return `${get('day')} ${get('month')} ${get('year')}, ${get('hour')}:${get('minute')} ${get('dayPeriod').toUpperCase()}`;
}

export function safeSpreadsheetText(value) {
  const text = String(value ?? '');
  return /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
}
