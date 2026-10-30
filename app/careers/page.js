import Link from 'next/link';
import { BriefcaseBusiness, HeartHandshake, Scale, UsersRound, MapPin, Clock3, ArrowRight } from 'lucide-react';
import { getJobs } from '../../lib/careers-jobs';
import { SITE } from '../../lib/site';

export const metadata = {
  title: 'Careers at PaxLegis',
  description: 'Explore legal careers and apply for opportunities with PaxLegis Advocates & Legal Consultants in Pakistan.',
  alternates: { canonical: '/careers' },
  openGraph: { title: 'Careers at PaxLegis', description: 'Join our legal team and build your advocacy career.', url: '/careers', type: 'website', images: [{ url: '/careers/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Careers at PaxLegis', description: 'Explore opportunities with PaxLegis.', images: ['/careers/opengraph-image'] },
};

export default async function CareersPage() {
  const jobs = await getJobs();
  const openJobs = jobs.filter((job) => job.open);
  return <>
    <section className="hero careers-hero"><div className="wrap"><p className="eyebrow">Careers at PaxLegis</p><h1>Join PaxLegis</h1><p className="hero-lede">Peace through Law</p></div></section>
    <section className="section"><div className="wrap">
      <div className="section-heading centered"><p className="eyebrow">Why PaxLegis</p><h2>Build a thoughtful legal career</h2></div>
      <div className="career-value-grid">
        <article><HeartHandshake aria-hidden="true" /><h3>Mentorship</h3><p>Learn through thoughtful supervision, preparation and review.</p></article>
        <article><Scale aria-hidden="true" /><h3>Meaningful practice</h3><p>Gain exposure across family, criminal and civil matters.</p></article>
        <article><UsersRound aria-hidden="true" /><h3>Client perspective</h3><p>Develop confidence communicating with clients in Pakistan and overseas.</p></article>
      </div>
      <div className="careers-heading"><p className="eyebrow">Current opportunities</p><h2>{openJobs.length ? 'Open positions' : 'No openings right now'}</h2></div>
      {openJobs.length ? <div className="jobs-grid">{openJobs.map((job) => <article className="job-card" key={job.slug}>
        <span className="job-icon"><BriefcaseBusiness aria-hidden="true" /></span><h3>{job.title}</h3>
        <div className="job-meta"><span><MapPin aria-hidden="true" />{job.location}</span><span><Clock3 aria-hidden="true" />{job.type}</span></div>
        <p>{job.summary}</p><Link className="btn gold" href={`/careers/${job.slug}`}>View and apply <ArrowRight aria-hidden="true" /></Link>
      </article>)}</div> : <div className="careers-empty"><p>No openings right now. You may send your CV to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></div>}
    </div></section>
  </>;
}
