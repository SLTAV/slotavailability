import test from 'node:test';
import assert from 'node:assert/strict';
import { summarize, formatDate, responseSchema, type Observation } from '../shared/availability';
import { searchCatalog, countries, providers } from '../src/data/catalog';
const row = (available: boolean | null): Observation => ({
  providerSlug: 'hacksaw-gaming',
  countrySlug: 'canada',
  available,
  checkedAt: null,
  casino: null,
  source: null,
});
test('conflicting observations remain unknown rather than available', () =>
  assert.equal(summarize([row(true), row(false)]), 'unknown'));
test('incomplete evidence is not advertised as confirmed', () => {
  assert.equal(summarize([]), 'unknown');
  assert.equal(summarize([row(true), row(null)]), 'unknown');
  assert.equal(summarize([row(false)]), 'unavailable');
});
test('directory search tolerates apostrophes and country codes', () => {
  assert.equal(searchCatalog("play'n go").providers[0]?.slug, 'play-n-go');
  assert.ok(searchCatalog('CA').countries.some((c) => c.slug === 'canada'));
});
test('catalog routes are unique', () => {
  assert.equal(new Set(providers.map((p) => p.slug)).size, providers.length);
  assert.equal(new Set(countries.map((c) => c.slug)).size, countries.length);
});
test('dates are honest and time zone independent', () => {
  assert.equal(formatDate(null), 'Not dated');
  assert.equal(formatDate('bad'), 'Not dated');
  assert.equal(formatDate('2026-06-20'), '20 Jun 2026');
});
test('API contract rejects availability strings', () =>
  assert.equal(
    responseSchema.safeParse({
      configured: true,
      truncated: false,
      observations: [{ ...row(true), available: 'true' }],
    }).success,
    false,
  ));
