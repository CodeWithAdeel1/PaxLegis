import Link from 'next/link';
import { SITE, SERVICES, waLink } from '../lib/site';
import { ArrowRight, CalendarDays, Check, CheckCircle2, ChevronDown, Landmark, Scale, SERVICE_ICONS, WhatsApp } from '../lib/icons';
import { ArrowUpRight, BriefcaseBusiness, FileCheck2, Globe2, LockKeyhole, MonitorSmartphone } from 'lucide-react';

export const metadata = {
  title: { absolute: 'Lawyers in Pakistan | PaxLegis' },
  description: 'Speak with PaxLegis about family, criminal, civil, tax, immigration or travel restriction matters in Pakistan. Remote consultations available.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Lawyers in Pakistan | PaxLegis',
    description: 'Practical legal guidance for clients in Pakistan and overseas.',
    url: '/',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'PaxLegis Advocates & Legal Consultants' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Lawyers in Pakistan | PaxLegis', description: 'Practical legal guidance for clients in Pakistan and overseas.', images: ['/opengraph-image'] },
};

const homeFaqs = [
  ['Can I speak with a lawyer online?', 'Yes. You can request a consultation through the booking form. The office will contact you using the details you provide to discuss availability and next steps.'],
  ['Do you assist clients living outside Pakistan?', 'Remote consultation may be available for overseas Pakistanis. Whether a representative, Power of Attorney or personal appearance is needed depends on the particular matter and authority.'],
  ['What should I include in my first message?', 'Briefly describe the legal matter, relevant dates or deadlines, and the city or authority involved. Avoid sending sensitive original documents until a secure method is agreed.'],
];

const firmSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${SITE.url}/#legal-service`,
  name: SITE.name,
  url: SITE.url,
  slogan: SITE.slogan,
  telephone: SITE.phone.includes('0000000') ? undefined : SITE.phone,
  email: SITE.email.endsWith('example.com') ? undefined : SITE.email,
  areaServed: SITE.areaServed,
  sameAs: SITE.socialLinks.length ? SITE.socialLinks : undefined,
  logo: SITE.logoUrl.startsWith('TODO:') ? undefined : SITE.logoUrl,
  address: Object.values(SITE.address).some((value) => String(value).startsWith('TODO:'))
    ? undefined
    : { '@type': 'PostalAddress', ...SITE.address },
  openingHours: SITE.officeHours.startsWith('TODO:') ? undefined : SITE.officeHours,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Legal practice areas',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.h1, url: `${SITE.url}/${service.slug}` },
    })),
  },
};

function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(firmSchema) }} />
      <section className="hero home-hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">PaxLegis Advocates &amp; Legal Consultants</p>
            <h1>Clear legal guidance. A steadier way forward.</h1>
            <p className="hero-lede">Practical support for family, criminal, civil and other legal matters in Pakistan—with remote consultations for Pakistanis abroad.</p>
            <div className="hero-actions">
              <Link className="btn gold" href="/book"><CalendarDays size={19} strokeWidth={1.75} aria-hidden="true" /> Book Online Consultation</Link>
              <a className="btn hero-whatsapp" href={waLink('Hi, I would like to discuss a legal matter.')} target="_blank" rel="noopener noreferrer"><WhatsApp size={20} aria-hidden="true" /> Chat on WhatsApp</a>
            </div>
            <p className="hero-note">Need a starting point? Send a short message on WhatsApp.</p>
          </div>
          <div className="hero-panel" aria-label="Quick help">
            <p className="hero-panel-kicker">QUICK HELP</p>
            <h2>Start with your matter</h2>
            <div className="hero-quick-links">
              {[
                { slug: 'family-litigation', label: 'Family law', Icon: SERVICE_ICONS.family },
                { slug: 'criminal-defence', label: 'Criminal defence', Icon: SERVICE_ICONS.criminal },
                { slug: 'overseas-clients', label: 'Overseas clients', Icon: SERVICE_ICONS.overseas },
              ].map(({ slug, label, Icon }) => (
                <Link href={`/${slug}`} key={slug}>
                  <span><Icon size={19} aria-hidden="true" />{label}</span><ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link href="#how-it-works" className="text-link">See how we work <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="How we support clients">
        <div className="wrap trust-items">
          <p><span><Landmark size={19} aria-hidden="true" /></span><strong>Pakistan courts</strong><small>Guidance on matters connected to Pakistan</small></p>
          <p><span><Globe2 size={19} aria-hidden="true" /></span><strong>Overseas clients</strong><small>UK, UAE, USA and Canada</small></p>
          <p><span><MonitorSmartphone size={19} aria-hidden="true" /></span><strong>Online consultations</strong><small>Start the conversation remotely</small></p>
          <p><span><LockKeyhole size={19} aria-hidden="true" /></span><strong>Confidential advice</strong><small>Discuss your matter with care</small></p>
        </div>
      </section>

      <section className="section section-practice" id="practice">
        <div className="wrap">
          <div className="section-heading">
            <p className="eyebrow">Our practice areas</p>
            <h2>Legal help for the matter you are facing</h2>
            <p>Choose a topic to learn about common steps, useful documents and ways to get in touch.</p>
          </div>
          <div className="practice-grid">
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="practice-card">
                <span className="practice-icon" aria-hidden="true">
                  {(() => { const Icon = SERVICE_ICONS[service.icon]; return <Icon size={25} strokeWidth={1.75} aria-hidden="true" />; })()}
                </span>
                <span className="practice-card-title">{service.nav}</span>
                <span className="practice-card-copy">{service.items[0]?.[1] || service.desc}</span>
                <span className="practice-card-link">Learn more <ArrowRight size={17} strokeWidth={1.75} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="wrap">
          <div className="section-heading centered">
            <p className="eyebrow">A clear process</p>
            <h2>How it works</h2>
            <p>Start with the facts. We will help you understand the next steps.</p>
          </div>
          <ol className="steps-grid">
            <li><span className="step-number">01</span><h3><Check size={20} strokeWidth={1.75} aria-hidden="true" /> Share your case</h3><p>Tell us what happened, where it happened and whether an important date is coming up.</p></li>
            <li><span className="step-number">02</span><h3><Scale size={20} strokeWidth={1.75} aria-hidden="true" /> Get clear advice</h3><p>Discuss your documents and questions to understand options, requirements and uncertainties.</p></li>
            <li><span className="step-number">03</span><h3><CheckCircle2 size={20} strokeWidth={1.75} aria-hidden="true" /> We act for you</h3><p>If you choose to proceed, agree the scope, fees and communication plan before work begins.</p></li>
          </ol>
        </div>
      </section>

      <section className="section overseas-section">
        <div className="wrap overseas-grid">
          <div className="overseas-copy">
            <p className="eyebrow">For overseas Pakistanis</p>
            <h2>Talk through your Pakistan matter from abroad</h2>
            <p>Begin remotely with a clear summary and copies of the documents you have. We can discuss representation, authorization and whether any in-person step may be required for your specific matter.</p>
            <Link className="btn gold" href="/overseas-clients">Explore overseas legal help <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="overseas-features">
            <article><span><FileCheck2 aria-hidden="true" /></span><div><h3>Power of Attorney</h3><p>Discuss preparation and attestation requirements for your matter.</p></div></article>
            <article><span><MonitorSmartphone aria-hidden="true" /></span><div><h3>Online court appearances</h3><p>Understand whether remote participation may be available in your case.</p></div></article>
            <article><span><BriefcaseBusiness aria-hidden="true" /></span><div><h3>Case tracking reports</h3><p>Agree on a clear process for important dates and case updates.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="wrap faq-wrap">
          <div className="section-heading">
            <p className="eyebrow">Before you get in touch</p>
            <h2>Common questions</h2>
            <p>Every matter is different. These answers can help you prepare for an initial conversation.</p>
          </div>
          <div className="faq-list">
            {homeFaqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" /></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap final-cta-inner">
          <div><p className="eyebrow">A helpful first step</p><h2>Tell us what you need help with.</h2><p>Share a short summary and the office will follow up using your preferred contact details.</p></div>
          <div className="hero-actions">
            <Link className="btn gold" href="/book"><CalendarDays size={19} strokeWidth={1.75} aria-hidden="true" /> Book Online Consultation</Link>
            <a className="btn hero-whatsapp" href={waLink('Hi, I would like to discuss a legal matter.')} target="_blank" rel="noopener noreferrer"><WhatsApp size={20} aria-hidden="true" /> Message on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
