# SlotAvailability — clean foundation

A new React + TypeScript application, authored from an empty database. No HTML, JavaScript or CSS from the former static site is imported. The catalog names and optional existing database are content, not reused application code.

## Stack and provenance

Gamdom publicly describes React, MUI, Node.js/Express and PostgreSQL in its own [engineering recruitment post](https://www.linkedin.com/posts/gamdom-com_fullstackdeveloper-reactjs-nodejs-activity-7346077690988298242-rz_g). This project uses those technologies, plus TypeScript, Vite, React Router and Zod. It does not claim to reproduce Gamdom's private infrastructure. Payments and accounts are outside the current implementation. The donation module is a UI demonstration with no configured addresses or transfer functionality.

The design takes the established casino-database navigation pattern: fixed dark header, collapsible desktop sidebar, mobile drawer, two primary discovery cards and dense card grids. All components, styles and decorative illustrations are new. Provider cards use original detailed adventure illustrations with plain-text provider names. Country cards use credited photographs and flag-icons SVG flags. The B2 brand uses the approved original design.

## Run locally

Node 22 or newer is required.

1. `npm ci`
2. Copy `.env.example` to `.env` and optionally configure one data source.
3. `npm run dev`
4. Open http://127.0.0.1:4173.

The Vite client proxies `/api` to Express on port 4174. With no data source configured, the database remains usable and shows an explicit empty state rather than invented availability.

## Build and check

- `npm run build` — strict TypeScript check, production client and Node server builds.
- `npm test` — domain and API-contract tests.
- `npm run format:check` — formatting check.
- `npm start` — serve the built client and API on `HOST` / `PORT` (defaults 127.0.0.1:4174).

For a hosted Node service, set `HOST=0.0.0.0`, `PORT` as required, and `NODE_ENV=production` behind HTTPS. Static-only hosting needs the API hosted separately and `/api` forwarded to it; this Express server is not a Cloudflare Worker deployment. No production deployment is performed by this branch.

## Structure

- `src/components`: shared shell, search, cards and availability table.
- `src/pages`: home, directories, profiles, recent checks, information and lazy-loaded map.
- `src/theme.ts`: MUI theme; `src/styles.css`: new layout and component styles.
- `src/data/catalog.ts`: single provider/country catalog, routes and search normalization.
- `shared/availability.ts`: typed, runtime-validated API contract and uncertainty rules.
- `server`: read-only data repository and Express API, input validation, request limits and security headers.
- `db/schema.sql`: standalone PostgreSQL observation table and indexes.
- `tests`: evidence aggregation, missing dates, search and API-contract cases.

## Data sources

Choose one server-side configuration. Credentials never go into the client build.

1. `DATABASE_URL`: PostgreSQL using `db/schema.sql`. Apply the schema deliberately to a new database with a migration-capable user, then give the application a SELECT-only database account. This path is implemented but has not been verified against a provisioned PostgreSQL instance.
2. `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`: an optional read-only adapter for the existing `provider_availability` API. It reads only provider/country slugs, availability, date and source. The previous table has no `casino` column, so the interface explicitly labels that information as unspecified. No schema or data is written.

The local preview uses the existing Supabase public API through an ignored `.env`. That configuration is not committed. Observations are cached for 60 seconds. The foundation limits the response to the most recent 1,000 rows; server-side pagination is a future extension before growing beyond this size. Catalog counts describe catalog entries, not verified coverage. Popular Providers is an editorial selection.

## Preserved versions

- `archive/static-before-rebuild`: original site at `433de2e`.
- `archive/first-redesign`: previous static redesign at `1787483` (PR #1 closed).
- `rebuild/react-foundation`: this new application.

The new branch replaces the repository tree; old versions remain recoverable in the archive branches and Git history. The `main` branch is not automatically merged or deployed.

## Verification performed

Production build and strict type check; six domain/contract tests; API health, valid filtering, invalid-input 400 and missing-endpoint 404; live Supabase reads; desktop collapse/expand and search-to-country navigation; country-region filtering; rendered world map; 390px mobile layout without document overflow and drawer open/close. The PostgreSQL connection and eventual hosting deployment require their own environment verification.

Map geometry is bundled from `world-atlas` (Natural Earth public-domain cartography); it loads only on the map route. Provider artwork is authored locally. External fonts and remote images are not required.
