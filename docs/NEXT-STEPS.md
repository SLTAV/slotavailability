# Checkpoint — 14 November 2026

## Current state

Adventure theme implemented across Home, Search, Providers, Countries, World Map, Recently Checked, About and Help Us. B2 original compass brand in the header/footer/favicon. Ten unique provider banners and ten original detailed provider cards, using plain-text names. Country postcard cards and licensed photographs. Adaptive single-row Home sections. Shared themed recent-check tables. Regional map zoom and reset. Donation UI is demonstration-only (BTC, ETH, USDC, USDT), no receiving addresses or networks configured.

Existing Supabase provider_availability is connected read-only through the ignored local .env. Last verification: 150 observations, 10 providers, 15 countries; API data matched Supabase. Values are observations, not independent guarantees of current availability. Never commit .env or credentials.

## Next agreed work

1. Canada country profile: proposal shown, implementation paused by user. Reuse existing header/sidebar and actual provider-card components. Dedicated country hero, provider search/status filters and recent observations. Keep actual data, dates and Unknown states.
2. Country profiles for the other countries after Canada is approved.
3. Redesign the provider/country observation detail page (/availability) to match the theme and make evidence/context/source readable.
4. Complete mobile/navigation/accessibility review before a shareable hosted test version.
5. Donations: configure public receiving addresses and precise networks only when supplied and explicitly requested. No invented balances, addresses or QR codes.

## Design and language decisions

- Follow docs/provider-card-art-direction.md and docs/references/provider-cards-approved.png for future provider art.
- Original characters; no official logos or official game characters. Names are plain text.
- Use database, country and service in visitor-facing copy; avoid directory, market and casino.
- Only three statuses: Available, Not available, Unknown. Conflicting or incomplete evidence remains Unknown.
- Homepage cards adapt to available width live; View all accesses the full catalog.
- Keep the visible live preview running and preserve the existing menu/header during content-page redesigns.

## Verification

Build, domain tests and formatting checks are run at this checkpoint. Manual checks cover Home -> provider -> country observation details, the country profile route, and return navigation. This is a development checkpoint on checkpoint/adventure-2026-11-14, not a merge or production deployment. The older rebuild/react-foundation branch is preserved separately because its published foundation commits have a different history. The checkpoint branch is the active continuation branch.
