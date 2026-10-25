import Link from 'next/link';
import { waLink, mailLink } from '../lib/site';
import { CalendarDays, Mail, WhatsApp } from '../lib/icons';

// Practice-specific one-click WhatsApp + Email buttons
export default function ContactButtons({ area, dark, compact = false }) {
  const wa = waLink(`Hi, I need ${area} advice`);
  const mail = mailLink(`${area} consultation request`);
  return (
    <div className="row">
      <a className="btn wa" href={wa} target="_blank" rel="noopener noreferrer"><WhatsApp size={20} aria-hidden="true" /> WhatsApp{compact ? '' : `: ${area}`}</a>
      {!compact && <a className={'btn ' + (dark ? 'ghost' : 'line')} href={mail}><Mail size={19} strokeWidth={1.75} aria-hidden="true" /> Email us</a>}
      {!compact && <Link className="btn gold" href={`/book?service=${encodeURIComponent(area)}`}><CalendarDays size={19} strokeWidth={1.75} aria-hidden="true" /> Book online consultation</Link>}
    </div>
  );
}
