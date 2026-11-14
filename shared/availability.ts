import { z } from 'zod';

export const observationSchema = z.object({
  providerSlug: z.string(),
  countrySlug: z.string(),
  casino: z.string().nullable(),
  available: z.boolean().nullable(),
  checkedAt: z.string().nullable(),
  source: z.string().nullable(),
});
export const responseSchema = z.object({
  observations: z.array(observationSchema),
  configured: z.boolean(),
  truncated: z.boolean(),
});
export type Observation = z.infer<typeof observationSchema>;
export type AvailabilityResponse = z.infer<typeof responseSchema>;
export type AvailabilityStatus = 'available' | 'unavailable' | 'unknown';

// Conflicting and incomplete evidence must never silently become a definitive yes/no.
export function summarize(rows: Observation[]): AvailabilityStatus {
  if (!rows.length) return 'unknown';
  const values = new Set(rows.map((row) => row.available));
  if (values.has(true) && values.has(false)) return 'unknown';
  if (values.has(null)) return 'unknown';
  return values.has(true) ? 'available' : 'unavailable';
}
export function formatDate(value: string | null): string {
  if (!value) return 'Not dated';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Not dated'
    : date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      });
}
