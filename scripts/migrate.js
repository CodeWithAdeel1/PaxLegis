const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('./load-env');
const seedJob = {
  slug: 'associate-advocate', title: 'Associate Advocate', open: true, location: 'Pakistan',
  jobType: 'Full-time', datePosted: '', validThrough: '',
  summary: 'PaxLegis is looking for an Associate Advocate to support our work across family litigation and other legal matters. The role offers practical court exposure, supervised drafting experience and the opportunity to work with clients in Pakistan and overseas.',
  responsibilities: ['Appear in court as assigned and assist senior advocates.', 'Draft pleadings and petitions with appropriate review.', 'Conduct legal research and prepare case notes.', 'Communicate with clients clearly and professionally.', 'Maintain case files, records, deadlines and hearing updates.'],
  requirements: ['LLB degree.', 'Bar council enrolment and licence to practise.', 'Relevant court experience is preferred; requirements to be confirmed before posting: TODO.', 'Good legal drafting and document-preparation skills.', 'Ability to communicate professionally in English and Urdu.'],
  benefits: ['Mentoring and supervised legal work.', 'Exposure to family litigation, criminal, civil and overseas client matters.'],
};

async function migrate() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    await pool.query(fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf8'));
    await pool.query("UPDATE consultations SET service = 'Family Litigation' WHERE service = 'Family Law'");
    await pool.query(
      `INSERT INTO careers_jobs (slug, title, open, location, job_type, date_posted, valid_through, summary, responsibilities, requirements, benefits)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11::jsonb)
       ON CONFLICT (slug) DO NOTHING`,
      [seedJob.slug, seedJob.title, seedJob.open, seedJob.location, seedJob.jobType, seedJob.datePosted || null, seedJob.validThrough || null, seedJob.summary, JSON.stringify(seedJob.responsibilities), JSON.stringify(seedJob.requirements), JSON.stringify(seedJob.benefits)]
    );
    console.log('Database migrated.');
  } finally {
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error(`Migration failed: ${error.message}`);
  process.exitCode = 1;
});
