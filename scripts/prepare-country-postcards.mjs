import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Editorial photos selected from their individual free Unsplash photo pages.
const photos = JSON.parse(await readFile('src/data/country-photos.json', 'utf8'));
await mkdir('public/countries', { recursive: true });
await Promise.all(
  photos.map(async (photo) => {
    const url = new URL(photo.image);
    url.search = new URLSearchParams({ auto: 'format', fit: 'max', w: '1200', q: '85' }).toString();
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/'))
      throw new Error(`Photo download failed: ${photo.slug} (${response.status})`);
    const original = Buffer.from(await response.arrayBuffer());
    const output = `public/countries/${photo.slug}.webp`;
    await sharp(original)
      .rotate()
      .resize({ width: 720, height: 960, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 83, effort: 5 })
      .toFile(output);
    console.log(`${photo.slug}: saved ${output}`);
  }),
);
