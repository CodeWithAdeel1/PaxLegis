CREATE TABLE IF NOT EXISTS consultations (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(160) NOT NULL,
  phone       VARCHAR(40)  NOT NULL,
  country     VARCHAR(80),
  service     VARCHAR(80)  NOT NULL,
  message     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations (created_at DESC);

ALTER TABLE consultations
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS is_read BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

UPDATE consultations SET updated_at = created_at WHERE updated_at IS NULL;
ALTER TABLE consultations ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE consultations ALTER COLUMN updated_at SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_consultations_is_read ON consultations (is_read);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'consultations_status_check'
      AND conrelid = 'consultations'::regclass
  ) THEN
    ALTER TABLE consultations
      ADD CONSTRAINT consultations_status_check
      CHECK (status IN ('new', 'contacted', 'closed'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations (status);

CREATE TABLE IF NOT EXISTS careers_jobs (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(160) NOT NULL UNIQUE,
  title VARCHAR(160) NOT NULL,
  open BOOLEAN NOT NULL DEFAULT true,
  location VARCHAR(160) NOT NULL,
  job_type VARCHAR(80) NOT NULL DEFAULT 'Full-time',
  date_posted VARCHAR(20),
  valid_through VARCHAR(20),
  summary TEXT NOT NULL,
  responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_careers_jobs_open ON careers_jobs (open);
CREATE INDEX IF NOT EXISTS idx_careers_jobs_slug ON careers_jobs (slug);

CREATE TABLE IF NOT EXISTS job_applications (
  id SERIAL PRIMARY KEY,
  job_slug VARCHAR(160) NOT NULL,
  job_title VARCHAR(160) NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  city VARCHAR(80) NOT NULL,
  experience VARCHAR(20) NOT NULL,
  licence_status VARCHAR(80) NOT NULL,
  current_position VARCHAR(160),
  linkedin VARCHAR(300),
  cover_note TEXT,
  cv_filename VARCHAR(255) NOT NULL,
  cv_mime VARCHAR(120) NOT NULL,
  cv_data BYTEA NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'new',
  notes TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_job_applications_created ON job_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_slug ON job_applications (job_slug);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'job_applications_status_check'
      AND conrelid = 'job_applications'::regclass
  ) THEN
    ALTER TABLE job_applications ADD CONSTRAINT job_applications_status_check
      CHECK (status IN ('new', 'shortlisted', 'rejected', 'hired'));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(80) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
