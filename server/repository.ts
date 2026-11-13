import pg from 'pg';
import { z } from 'zod';
import type { AvailabilityResponse } from '../shared/availability.js';

const legacySchema = z.array(
  z.object({
    provider_slug: z.string(),
    country_slug: z.string(),
    available: z.boolean().nullable(),
    last_checked: z.string().nullable(),
    source: z.string().nullable().optional(),
  }),
);
let pool: pg.Pool | undefined;
let cached: { expires: number; value: AvailabilityResponse } | undefined;

export async function readAvailability(): Promise<AvailabilityResponse> {
  if (cached && cached.expires > Date.now()) return cached.value;
  let value: AvailabilityResponse;
  if (process.env.DATABASE_URL) {
    pool ??= new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 4,
      connectionTimeoutMillis: 5000,
      statement_timeout: 8000,
    });
    const { rows } = await pool.query(
      'SELECT provider_slug AS "providerSlug", country_slug AS "countrySlug", casino, available, checked_at::text AS "checkedAt", source FROM availability_observations ORDER BY checked_at DESC NULLS LAST LIMIT 1001',
    );
    value = { observations: rows.slice(0, 1000), configured: true, truncated: rows.length > 1000 };
  } else if (process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY) {
    const url = new URL('/rest/v1/provider_availability', process.env.SUPABASE_URL);
    url.search = new URLSearchParams({
      select: 'provider_slug,country_slug,available,last_checked,source',
      order: 'last_checked.desc.nullslast',
      limit: '1001',
    }).toString();
    const response = await fetch(url, {
      headers: { apikey: process.env.SUPABASE_PUBLISHABLE_KEY },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Availability source unavailable');
    const rows = legacySchema.parse(await response.json());
    value = {
      observations: rows.slice(0, 1000).map((row) => ({
        providerSlug: row.provider_slug,
        countrySlug: row.country_slug,
        casino: null,
        available: row.available,
        checkedAt: row.last_checked,
        source: row.source ?? null,
      })),
      configured: true,
      truncated: rows.length > 1000,
    };
  } else {
    value = { observations: [], configured: false, truncated: false };
  }
  cached = { expires: Date.now() + 60_000, value };
  return value;
}
