import { pool } from './db';
import { JOBS as fallbackJobs } from './jobs';

export async function getJobs() {
  try {
    const { rows } = await pool.query('SELECT slug,title,open,location,job_type AS type,date_posted AS "datePosted",valid_through AS "validThrough",summary,responsibilities,requirements,benefits FROM careers_jobs ORDER BY created_at DESC, id DESC');
    if (rows.length) return rows.map(normalize);
  } catch {}
  return fallbackJobs;
}
export async function getJob(slug) {
  try {
    const { rows } = await pool.query('SELECT slug,title,open,location,job_type AS type,date_posted AS "datePosted",valid_through AS "validThrough",summary,responsibilities,requirements,benefits FROM careers_jobs WHERE slug=$1',[slug]);
    if (rows[0]) return normalize(rows[0]);
  } catch {}
  return fallbackJobs.find(job=>job.slug===slug)||null;
}
function normalize(job){return {...job, responsibilities:Array.isArray(job.responsibilities)?job.responsibilities:[], requirements:Array.isArray(job.requirements)?job.requirements:[], benefits:Array.isArray(job.benefits)?job.benefits:[], open:Boolean(job.open)}}
