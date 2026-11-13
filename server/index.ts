import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { z } from 'zod';
import { readAvailability } from './repository.js';

const app = express();
app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:'],
        'upgrade-insecure-requests': process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    strictTransportSecurity: process.env.NODE_ENV === 'production' ? undefined : false,
  }),
);
app.use(
  '/api',
  rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }),
);
const filters = z.object({
  provider: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  country: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
});
app.get('/api/availability', async (req, res) => {
  const parsed = filters.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid provider or country.' });
    return;
  }
  try {
    const data = await readAvailability();
    res.json({
      ...data,
      observations: data.observations.filter(
        (row) =>
          (!parsed.data.provider || row.providerSlug === parsed.data.provider) &&
          (!parsed.data.country || row.countrySlug === parsed.data.country),
      ),
    });
  } catch {
    res
      .status(503)
      .json({ error: 'Availability checks are temporarily unavailable. Please try again.' });
  }
});
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found.' }));
const dist = path.resolve('dist');
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get('/{*path}', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.listen(Number(process.env.PORT || 4174), process.env.HOST || '127.0.0.1', () =>
  console.log(`API ready on port ${process.env.PORT || 4174}`),
);
