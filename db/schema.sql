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

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(80) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
