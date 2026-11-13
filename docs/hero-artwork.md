# Hero artwork: Verre & lumière

The approved direction B uses three translucent indigo studio plaques for Providers and a glass Earth with an orbital ring for Countries. The Encre & indigo palette, HTML headings, links and button text remain separate from the artwork.

Both images were created with the built-in image generation tool, using the approved concept board as a reference. Each source was requested on a transparent background, without any text, UI frame, button or real provider logo.

## Final prompt briefs

- Providers: three upright smoked/frosted glass studio plaques, taller central plaque, two smaller rear plaques, abstract geometric emblems, indigo rim light #ADA8FF, subtle base reflection, complete group with transparent margins.
- Countries: translucent glass Earth with recognisable frosted continents, latitude/longitude etchings, a single angled orbit with three light nodes, mist-blue light #9EBCDA, subtle base reflection, complete globe and ring with transparent margins.

## Production files

- `public/illustrations/providers-glass.webp`
- `public/illustrations/countries-glass.webp`

Each is 768×768 with alpha transparency. `scripts/prepare-hero-art.mjs` performs only resizing and WebP encoding using Sharp; pass the two original PNG paths to reproduce the production assets. The original generated PNGs remain retained separately. Artwork is decorative and has empty alt text; route names and destination links provide the accessible content.
