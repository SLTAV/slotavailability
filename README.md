# SlotAvailability

Static provider availability directory. Serve the repository root; no build or installation is required.

## Local preview

From the repository root, run `node scripts/preview.cjs`, then open http://127.0.0.1:4173.

## Interface

- `assets/nav.js`: shared fixed sidebar and top bar, persisted desktop collapse, mobile menu, keyboard handling.
- `assets/redesign.css`: application shell, dashboard and responsive layouts, layered over existing detail-page styles.
- `assets/catalog.js`: searchable provider/country directory. Keep it aligned with detail-page routes when expanding coverage.
- `assets/home.js`: local directory search and recent observations from the existing Supabase public REST API.

Recent checks are individual database observations, not a country-wide guarantee. Unknown values remain unknown. The Popular Providers section is editorial, not an analytics ranking. Provider lettering is typographic artwork, not official logo assets.

## Initial audit (13 November 2026)

Baseline: main at 433de2e. The repository contains 36 HTML pages, a large shared stylesheet and duplicated inline data-fetching scripts. No package manifest, build pipeline or tests were present. Supabase was already connected with a frontend publishable key. Existing navigation contained placeholder links. The old homepage selected the first database row as an overall result; the redesign instead links recent observations to the existing detailed comparison route.

The redesign branch was created before file modifications. Existing detail-page data logic and map behavior are retained. Their duplicated queries and aggregation semantics remain follow-up work. The existing noindex/nofollow policy is preserved. Production deployment is separate from this redesign.

## Validation

JavaScript syntax checks; local-route checks; Supabase recent-check query returned HTTP 200. Browser checks: desktop layout and collapse, provider/country search, 390px mobile layout with no horizontal overflow, mobile menu open/close, and real recent records including unknown values.

