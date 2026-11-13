import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const [providers, countries] = process.argv.slice(2);
if (!providers || !countries) {
  throw new Error('Usage: node scripts/prepare-hero-art.mjs <providers.png> <countries.png>');
}
await mkdir('public/illustrations', { recursive: true });
for (const [name, source] of [
  ['providers', providers],
  ['countries', countries],
]) {
  const output = `public/illustrations/${name}-glass.webp`;
  await sharp(source)
    .resize({ width: 768, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  const stats = await sharp(output).stats();
  console.log(`${output}: ${metadata.width}×${metadata.height}, transparent=${!stats.isOpaque}`);
}
