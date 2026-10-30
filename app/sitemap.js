import { SITE, SERVICES } from '../lib/site';
import { JOBS } from '../lib/jobs';
export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, priority: 0.7 },
    ...SERVICES.map((s) => ({ url: `${SITE.url}/${s.slug}`, lastModified: now, priority: 0.9 })),
    { url: `${SITE.url}/book`, lastModified: now, priority: 0.7 },
    ...(JOBS.some((job) => job.open) ? [{ url: `${SITE.url}/careers`, lastModified: now, priority: 0.7 }] : []),
    ...JOBS.filter((job) => job.open).map((job) => ({ url: `${SITE.url}/careers/${job.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
