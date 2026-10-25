import Link from 'next/link';
import { SERVICES } from '../lib/site';

export const metadata = {
  title: 'Page not found',
  description: 'The page could not be found. Explore PaxLegis legal practice areas or return to the home page.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section not-found-section">
      <div className="wrap">
        <p className="eyebrow">404 · Page not found</p>
        <h1>Let’s find the right place to start.</h1>
        <p>The page may have moved or the address may be incorrect. Visit the home page or choose a practice area below.</p>
        <Link className="btn gold" href="/">Go to the home page</Link>
        <h2>Explore our practice areas</h2>
        <ul className="not-found-links">
          {SERVICES.map((service) => <li key={service.slug}><Link href={`/${service.slug}`}>{service.title} <span aria-hidden="true">→</span></Link></li>)}
        </ul>
      </div>
    </section>
  );
}
