import Image from 'next/image';
import Link from 'next/link';
import { SITE, SERVICES, mailLink, waLink } from '../../lib/site';
import { ArrowRight, CalendarDays, SERVICE_ICONS, WhatsApp, Mail } from '../../lib/icons';

export const metadata = {
  title: 'About PaxLegis Advocates & Legal Consultants',
  description: 'Learn about PaxLegis, our practical approach to legal matters in Pakistan, and how we communicate with clients at home and abroad.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About PaxLegis Advocates & Legal Consultants',
    description: 'Learn about PaxLegis and our approach to legal matters in Pakistan and for overseas Pakistanis.',
    url: '/about',
    type: 'website',
  },
};

const aboutSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About PaxLegis Advocates & Legal Consultants',
    description: metadata.description,
    url: `${SITE.url}/about`,
    mainEntity: { '@type': 'LegalService', name: SITE.name, url: SITE.url },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'About PaxLegis', item: `${SITE.url}/about` },
    ],
  },
];

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default function AboutPage() {
  const teamHasContent = Boolean(
    SITE.lawyerNames || SITE.lawyerPhotos.length || SITE.barCouncilNumbers ||
    SITE.yearsExperience || SITE.officeAddressDetails || SITE.confirmedOfficeHours
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(aboutSchema) }} />
      <section className="hero about-hero">
        <div className="wrap">
          <p className="eyebrow">{SITE.slogan}</p>
          <h1>About PaxLegis</h1>
          <p className="hero-lede">Practical legal guidance for people and organizations in Pakistan.<br />We also assist overseas Pakistanis with matters connected to Pakistan.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap about-content">
          <div className="section-heading">
            <p className="eyebrow">Who we are</p>
            <h2>Legal support grounded in clear communication</h2>
            <p>PaxLegis Advocates &amp; Legal Consultants serves clients in Pakistan and overseas Pakistanis living in the UK, UAE, USA and Canada. We help clients understand the issues, documents and possible next steps relevant to their matter.</p>
          </div>

          <section className="about-block">
            <p className="eyebrow">Our approach</p>
            <div className="about-points">
              <article><h3>Clear advice</h3><p>We aim to explain legal information and options in plain language, including important uncertainties.</p></article>
              <article><h3>Regular updates</h3><p>We agree how case progress, key dates and requests for instructions will be communicated.</p></article>
              <article><h3>Practical resolution</h3><p>Where suitable and lawful, we consider ways to resolve disputes without unnecessary litigation.</p></article>
            </div>
          </section>

          <section className="about-block">
            <p className="eyebrow">What we do</p>
            <h2>Explore our practice areas</h2>
            <div className="about-services">
              {SERVICES.map((service) => (
                <Link className="about-service-card" href={`/${service.slug}`} key={service.slug}>
                  {(() => { const Icon = SERVICE_ICONS[service.icon]; return <Icon size={24} strokeWidth={1.75} aria-hidden="true" />; })()}
                  <h3>{service.h1}</h3>
                  <p>{service.desc}</p>
                  <span>Learn about {service.nav.toLowerCase()} <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </section>

          <section className="about-block about-overseas">
            <p className="eyebrow">For overseas Pakistanis</p>
            <h2>Stay informed while you are abroad</h2>
            <ul>
              <li>Discuss Power of Attorney preparation and attestation requirements for your matter.</li>
              <li>Communicate online and agree on practical ways to exchange instructions and documents.</li>
              <li>Arrange case-tracking reports and updates around important dates and developments.</li>
            </ul>
          </section>

          {teamHasContent && (
            <section className="about-block about-team">
              <p className="eyebrow">Our team</p>
              <h2>Meet the legal professionals</h2>
              {/* TODO: Fill lawyer names, photos, bar council numbers, experience, office address and hours with verified details. */}
              {SITE.lawyerNames && <p><strong>Lawyers:</strong> {SITE.lawyerNames}</p>}
              {SITE.lawyerPhotos.length > 0 && (
                <div className="about-team-photos">
                  {SITE.lawyerPhotos.map((photo) => (
                    <figure key={photo.src}>
                      <Image src={photo.src} width={140} height={140} alt={photo.alt || photo.name || 'PaxLegis lawyer'} />
                      {photo.name && <figcaption>{photo.name}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
              {SITE.barCouncilNumbers && <p><strong>Bar council numbers:</strong> {SITE.barCouncilNumbers}</p>}
              {SITE.yearsExperience && <p><strong>Experience:</strong> {SITE.yearsExperience}</p>}
              {SITE.officeAddressDetails && <p><strong>Office address:</strong> {SITE.officeAddressDetails}</p>}
              {SITE.confirmedOfficeHours && <p><strong>Office hours:</strong> {SITE.confirmedOfficeHours}</p>}
            </section>
          )}
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap final-cta-inner">
          <div><p className="eyebrow">Peace through Law</p><h2>Talk with us about your matter</h2><p>Share a short summary and we can discuss an appropriate next step.</p></div>
          <div className="hero-actions">
            <Link className="btn gold" href="/book"><CalendarDays size={19} strokeWidth={1.75} aria-hidden="true" /> Book Consultation</Link>
            <a className="btn hero-whatsapp" href={waLink('Hi, I need legal advice.')} target="_blank" rel="noopener noreferrer"><WhatsApp size={19} aria-hidden="true" /> WhatsApp</a>
            <a className="btn hero-whatsapp" href={mailLink('Legal consultation request')}><Mail size={19} strokeWidth={1.75} aria-hidden="true" /> Email</a>
          </div>
        </div>
      </section>
      <p className="wrap about-disclaimer">This page provides general information, not legal advice. Advice depends on the facts and applicable law in each matter.</p>
    </>
  );
}
