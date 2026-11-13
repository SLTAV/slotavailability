-- Run explicitly on a new database. Never applied automatically to the old project.
CREATE TABLE IF NOT EXISTS availability_observations (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  provider_slug text NOT NULL,
  country_slug text NOT NULL,
  casino text,
  available boolean,
  checked_at timestamptz,
  source text
);
CREATE INDEX IF NOT EXISTS observations_lookup ON availability_observations(provider_slug, country_slug, checked_at DESC);
CREATE INDEX IF NOT EXISTS observations_recent ON availability_observations(checked_at DESC);
