import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BriefcaseBusiness, MapPin, Clock3, Check, ArrowLeft } from 'lucide-react';
import { JOBS } from '../../../lib/jobs';
import { getJob } from '../../../lib/careers-jobs';
import { SITE } from '../../../lib/site';
import ApplyForm from '../../../components/ApplyForm';
import JobShareButtons from '../../../components/JobShareButtons';

export const generateStaticParams = () => JOBS.map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }) { const {slug}=await params; const job=await getJob(slug); if(!job) return {}; return {title:`${job.title} | Careers`,description:job.summary.slice(0,157),alternates:{canonical:`/careers/${job.slug}`},openGraph:{title:`${job.title} at PaxLegis`,description:job.summary,url:`/careers/${job.slug}`,type:'website',images:[{url:'/careers/opengraph-image',width:1200,height:630}]},twitter:{card:'summary_large_image',title:`${job.title} at PaxLegis`,description:job.summary,images:['/careers/opengraph-image']}}; }
function realDate(value){return /^\d{4}-\d{2}-\d{2}$/.test(value||'') && !value.startsWith('TODO') ? value : null;}
export default async function JobPage({params}) { const {slug}=await params; const job=await getJob(slug); if(!job) notFound(); if(!job.open) return <section className="section"><div className="wrap closed-state"><BriefcaseBusiness aria-hidden="true" /><h1>This position is closed</h1><p>The role you selected is no longer accepting applications.</p><Link className="btn gold" href="/careers"><ArrowLeft aria-hidden="true" />Back to careers</Link></div></section>;
 const url=`${SITE.url}/careers/${job.slug}`; const datePosted=realDate(job.datePosted), validThrough=realDate(job.validThrough); const logo=SITE.logoUrl&&!SITE.logoUrl.startsWith('TODO') ? SITE.logoUrl : undefined; const city=job.location&&!job.location.startsWith('TODO') && job.location !== 'Pakistan' ? job.location : undefined;
 const jobPosting={ '@context':'https://schema.org','@type':'JobPosting',title:job.title,description:job.summary,hiringOrganization:{'@type':'Organization',name:SITE.name,url:SITE.url,logo},employmentType:'FULL_TIME',directApply:true,url,jobLocation:{'@type':'Place',address:{'@type':'PostalAddress',addressCountry:'PK',addressLocality:city}},datePosted,validThrough};
 Object.keys(jobPosting).forEach(k=>{if(jobPosting[k]==null||jobPosting[k]==='')delete jobPosting[k]}); Object.keys(jobPosting.jobLocation.address).forEach(k=>{if(!jobPosting.jobLocation.address[k])delete jobPosting.jobLocation.address[k]}); if(!Object.keys(jobPosting.jobLocation.address).length) delete jobPosting.jobLocation;
 const structured=[jobPosting,{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE.url},{'@type':'ListItem',position:2,name:'Careers',item:`${SITE.url}/careers`},{'@type':'ListItem',position:3,name:job.title,item:url}]}];
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}} />
 <section className="hero job-hero"><div className="wrap job-hero-inner"><p className="crumbs"><Link href="/careers">Careers</Link><span>/</span>{job.title}</p><div className="job-hero-copy"><span className="job-status-pill">Open position</span><h1>{job.title}</h1><p>Join PaxLegis and build your advocacy career with thoughtful mentoring and meaningful court experience.</p><div className="job-meta"><span><MapPin aria-hidden="true" />{job.location}</span><span><Clock3 aria-hidden="true" />{job.type}</span></div><JobShareButtons url={url} title={job.title}/></div></div></section>
 <section className="section job-page-section"><div className="wrap job-layout"><div className="job-details">
 <section className="job-content-card job-overview"><p className="eyebrow">Position overview</p><h2>About the role</h2><p>{job.summary}</p></section>
 <section className="job-content-card"><h2>Responsibilities</h2><ul className="job-list">{job.responsibilities.map(item=><li key={item}><span><Check aria-hidden="true" /></span>{item}</li>)}</ul></section>
 <section className="job-content-card"><h2>Requirements</h2><ul className="job-list">{job.requirements.map(item=><li key={item}><span><Check aria-hidden="true" /></span>{item}</li>)}</ul></section>
 <section className="job-content-card"><h2>What we offer</h2><ul className="job-list">{job.benefits.map(item=><li key={item}><span><Check aria-hidden="true" /></span>{item}</li>)}</ul></section>
 <section className="job-content-card job-application-section" id="apply"><p className="eyebrow">Application</p><h2>Apply for this position</h2><p className="application-intro">Complete the form below. Our recruitment team will review your details and contact you if there is a match.</p><ApplyForm job={job}/></section>
 </div><aside className="job-apply-card"><span className="job-card-icon"><BriefcaseBusiness aria-hidden="true" /></span><p className="job-card-kicker">This role is open</p><h2>Interested in this position?</h2><p>Send your details and CV for consideration by our team.</p><div className="job-card-facts"><span><MapPin aria-hidden="true" />{job.location}</span><span><Clock3 aria-hidden="true" />{job.type}</span></div><a className="btn gold" href="#apply">Apply now</a></aside></div></section></>;
}
