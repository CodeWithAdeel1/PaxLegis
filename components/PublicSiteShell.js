'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import { SERVICES, waLink } from '../lib/site';
import { WhatsApp } from '../lib/icons';

export default function PublicSiteShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isAdmin) return children;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header services={SERVICES} />
      <main id="main">{children}</main>
      <Footer />
      <a className="wa-float" href={waLink('Hi, I need legal advice.')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsApp size={21} aria-hidden="true" /> WhatsApp</a>
    </>
  );
}
