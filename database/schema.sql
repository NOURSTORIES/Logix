CREATE TABLE IF NOT EXISTS project_requests (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(254),
  phone VARCHAR(40) NOT NULL,
  service VARCHAR(80) NOT NULL,
  budget VARCHAR(80),
  message TEXT NOT NULL,
  status VARCHAR(24) NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','in_progress','completed','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_requests_created_at
  ON project_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_requests_status
  ON project_requests (status);
