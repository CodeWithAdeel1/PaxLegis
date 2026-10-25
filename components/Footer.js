import Image from 'next/image';
import Link from 'next/link';
import { SITE, SERVICES, waLink, mailLink, callLink } from '../lib/site';
import SecretAdminTrigger from './SecretAdminTrigger';
import { Clock, Mail, MapPin, Phone, WhatsApp } from '../lib/icons';

export default function Footer() {
  return (
    <footer>
      <div className="wrap cols">
        <div>
          <Link className="footer-logo" href="/" aria-label="PaxLegis home">
            <Image src="/logo-light.svg" width={330} height={64} alt="PaxLegis Advocates & Legal Consultants" />
          </Link>
          <p>{SITE.slogan}. Clear, practical legal guidance for clients in Pakistan and overseas.</p>
          <p className="footer-placeholder"><MapPin size={17} strokeWidth={1.75} aria-hidden="true" /> {SITE.officeAddress}</p>
          <p className="footer-placeholder"><Clock size={17} strokeWidth={1.75} aria-hidden="true" /> Office hours: {SITE.officeHours}</p>
        </div>
        <div>
          <h3>Practice areas</h3>
          <ul>{SERVICES.map((s) => <li key={s.slug}><Link href={`/${s.slug}`}>{s.h1}</Link></li>)}</ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={waLink('Hi, I need legal advice.')} rel="noopener"><WhatsApp size={17} aria-hidden="true" /> WhatsApp us</a></li>
            <li><a href={mailLink('Legal consultation request')}><Mail size={17} strokeWidth={1.75} aria-hidden="true" /> {SITE.email}</a></li>
            <li><a href={callLink()}><Phone size={17} strokeWidth={1.75} aria-hidden="true" /> {SITE.phone}</a></li>
          </ul>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About PaxLegis</Link></li>
            <li><Link href="/book">Book online consultation</Link></li>
            <li><Link href="/overseas-clients">Overseas clients</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 28 }}>
        <small><SecretAdminTrigger>&copy; {new Date().getFullYear()} {SITE.name}. Information on this website is general and not a substitute for legal advice.</SecretAdminTrigger></small>
      </div>
    </footer>
  );
}
