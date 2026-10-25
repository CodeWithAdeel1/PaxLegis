import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, SERVICES, callLink, getService, waLink } from '../../lib/site';
import ContactButtons from '../../components/ContactButtons';
import { ArrowRight, ChevronDown, Check, SERVICE_ICONS, WhatsApp, CalendarDays } from '../../lib/icons';

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.desc,
    keywords: s.keywords,
    alternates: { canonical: `/${s.slug}` },
    openGraph: {
      title: `${s.title} | PaxLegis`,
      description: s.desc,
      url: `/${s.slug}`,
      type: 'website',
      images: [{ url: `/${s.slug}/opengraph-image`, width: 1200, height: 630, alt: `${s.h1} | PaxLegis` }],
    },
    twitter: { card: 'summary_large_image', title: `${s.title} | PaxLegis`, description: s.desc, images: [`/${s.slug}/opengraph-image`] },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Service',
      name: s.h1,
      description: s.desc,
      serviceType: s.area,
      provider: { '@type': 'LegalService', '@id': `${SITE.url}/#legal-service`, name: SITE.name, url: SITE.url },
      areaServed: SITE.areaServed,
      url: `${SITE.url}/${s.slug}`,
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: s.h1, item: `${SITE.url}/${s.slug}` },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="hero service-hero">
        <div className="wrap service-hero-grid">
          <div className="service-hero-copy">
          <p className="crumbs"><Link href="/">Home</Link> / {s.h1}</p>
          <p className="eyebrow">Legal guidance in Pakistan and for overseas clients</p>
          <h1>{s.h1}</h1>
          <p className="service-intro">{s.intro}</p>
          <ContactButtons area={s.area} dark />
          </div>
          <aside className="service-hero-note">
            <span className="service-hero-icon">{(() => { const Icon = SERVICE_ICONS[s.icon]; return <Icon size={25} aria-hidden="true" />; })()}</span>
            <p className="hero-panel-kicker">A CLEAR FIRST STEP</p>
            <h2>Understand your options.</h2>
            <p>Share the essentials and discuss practical next steps with our office.</p>
            <a href="#what-we-handle" className="text-link">Explore what we handle <ArrowRight size={17} aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <section className="section service-content-section">
        <div className="wrap split service-layout">
          <div className="service-main-content">
            <section id="what-we-handle" className="service-handle-section">
              <p className="eyebrow">Practical support</p>
              <h2>What we handle</h2>
              <div className="service-items-grid">
                {s.items.map(([t, d]) => <article className="service-item-card" key={t}><span><Check size={19} strokeWidth={1.75} aria-hidden="true" /></span><div><h3>{t}</h3><p>{d}</p></div></article>)}
              </div>
            </section>
            {s.sections.map((section) => (
              <section className="service-copy-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <h2 className="service-heading">How we work</h2>
            <ol className="service-steps">
              {s.steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.description}</span></li>)}
            </ol>
            <h2 className="service-heading">What to prepare</h2>
            <ul className="prepare-list">
              {s.prepare.map((item) => <li key={item}><Check size={17} strokeWidth={1.75} aria-hidden="true" /> {item}</li>)}
            </ul>
            <section className="service-faq">
              <p className="eyebrow">Useful to know</p>
              <h2>Frequently asked questions</h2>
              <div className="faq-list">{s.faq.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" /></summary><p>{a}</p></details>)}</div>
            </section>
            <p className="legal-note">This page provides general information, not legal advice. The available options depend on your circumstances and applicable law; outcomes and timelines cannot be guaranteed.</p>
          </div>
          <aside className="panel service-contact">
            <h3>Speak to a lawyer</h3>
            <p>Share your documents and questions. We reply with next steps.</p>
            <ContactButtons area={s.area} />
          </aside>
        </div>
      </section>

      <section className="section related-services-section">
        <div className="wrap">
          <p className="eyebrow">Explore more</p>
          <h2>Other practice areas</h2>
          <div className="related-services-grid">
            {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
              <Link key={x.slug} className="related-service-card" href={`/${x.slug}`}>
                <span className="practice-icon">{(() => { const Icon = SERVICE_ICONS[x.icon]; return <Icon size={23} aria-hidden="true" />; })()}</span>
                <strong>{x.nav}</strong><span>{x.desc}</span><span className="practice-card-link">Learn more <ArrowRight size={16} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <nav className="service-mobile-bar" aria-label={`Contact about ${s.area}`}>
        <a className="mobile-bar-whatsapp" href={waLink(`Hi, I need ${s.area} advice`)} target="_blank" rel="noopener noreferrer"><WhatsApp size={19} aria-hidden="true" /> WhatsApp</a>
        <a className="mobile-bar-call" href={callLink()}>Call</a>
        <Link className="mobile-bar-book" href={`/book?service=${encodeURIComponent(s.area)}`}><CalendarDays size={18} aria-hidden="true" /> Book</Link>
      </nav>
    </>
  );
}
