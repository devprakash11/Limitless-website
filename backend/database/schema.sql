CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin','editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(80) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  service VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','in_progress','completed','closed')),
  email_notification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (email_notification_status IN ('pending','sent','failed','skipped')),
  email_error TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);
CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries (LOWER(email));

CREATE TABLE IF NOT EXISTS designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  creator VARCHAR(120) NOT NULL DEFAULT 'Limitless Design',
  description TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  specifications JSONB NOT NULL DEFAULT '[]'::JSONB,
  formats JSONB NOT NULL DEFAULT '[]'::JSONB,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS designs_category_idx ON designs (category);
CREATE INDEX IF NOT EXISTS designs_published_created_idx ON designs (published, created_at DESC);

CREATE TABLE IF NOT EXISTS download_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id UUID REFERENCES designs(id) ON DELETE SET NULL,
  design_slug VARCHAR(180) NOT NULL,
  file_format VARCHAR(40) NOT NULL,
  ip_hash VARCHAR(128),
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS download_events_created_at_idx ON download_events (created_at DESC);
CREATE INDEX IF NOT EXISTS download_events_slug_idx ON download_events (design_slug);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS admins_set_updated_at ON admins;
CREATE TRIGGER admins_set_updated_at BEFORE UPDATE ON admins
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS inquiries_set_updated_at ON inquiries;
CREATE TRIGGER inquiries_set_updated_at BEFORE UPDATE ON inquiries
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS designs_set_updated_at ON designs;
CREATE TRIGGER designs_set_updated_at BEFORE UPDATE ON designs
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
