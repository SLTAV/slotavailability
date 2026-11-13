# Country postcard photographs

The six homepage country cards use full-bleed editorial photographs. Directory and search cards keep their compact design. Country names remain HTML overlays, so links stay identifiable and accessible. Local WebP files are lazy-loaded; a dark gradient maintains label contrast.

Photos were selected from individual free Unsplash photo pages and downloaded on 13 November 2026 under the [Unsplash License](https://unsplash.com/license). Photographer, photo-page link and source image URL are recorded in `src/data/country-photos.json`. Public credits are available on the About page. The photographs are representative scenes, not availability evidence or endorsements.

- Canada — Moraine Lake, Joseph Northcutt: https://unsplash.com/photos/cxXIlpKEcqU
- Brazil — Rio de Janeiro, Jonathan Borba: https://unsplash.com/photos/j_ibL7ytVBY
- Australia — Sydney Opera House, Pejman Ajorlou: https://unsplash.com/photos/wc3jzzOrD20
- Germany — Neuschwanstein Castle, Johannes Plenio: https://unsplash.com/photos/OwMTchwUTNw
- Sweden — Stockholm waterfront, Julie Gaïa Guzal: https://unsplash.com/photos/Lz-9RPVEh94
- United Kingdom — Westminster, Peter Beke: https://unsplash.com/photos/sWx26pdgEto

Recreate the local files using `node scripts/prepare-country-postcards.mjs` (requires network access). This only resizes and encodes the licensed photographs; CSS handles the postcard crop.
