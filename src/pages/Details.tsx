import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@mui/material';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AvailabilityPanel } from '../components/Availability';
import { PageHeading } from '../components/Cards';
import { countries, providers } from '../data/catalog';

export function ProviderDetail() {
  const { slug } = useParams();
  const provider = providers.find((p) => p.slug === slug);
  const [params, setParams] = useSearchParams();
  if (!provider) return <NotFound />;
  return (
    <>
      <Link className="back-link" to="/providers">
        <ArrowLeft size={15} /> All providers
      </Link>
      <PageHeading
        eyebrow="PROVIDER PROFILE"
        title={provider.name}
        description={`Explore recorded observations for ${provider.name} across the countries in our directory.`}
      />
      <div className="detail-summary">
        <div className="detail-monogram" style={{ color: provider.color }}>
          {provider.initials}
        </div>
        <div>
          <span className="eyebrow">AVAILABILITY BY MARKET</span>
          <h2>Where is {provider.name} available?</h2>
          <p>
            Each row is an observation, with its own date and status. Missing casino information is
            explicitly marked.
          </p>
        </div>
      </div>
      <div className="directory-toolbar">
        <h2 className="small-heading">Recorded observations</h2>
        <TextField
          select
          size="small"
          label="Country"
          value={params.get('country') || ''}
          onChange={(e) => setParams(e.target.value ? { country: e.target.value } : {})}
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">All countries</MenuItem>
          {countries.map((c) => (
            <MenuItem key={c.slug} value={c.slug}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <AvailabilityPanel
        provider={slug}
        country={params.get('country') || undefined}
        limit={1000}
      />
    </>
  );
}
export function CountryDetail() {
  const { slug } = useParams();
  const country = countries.find((c) => c.slug === slug);
  if (!country) return <NotFound />;
  return (
    <>
      <Link className="back-link" to="/countries">
        <ArrowLeft size={15} /> All countries
      </Link>
      <PageHeading
        eyebrow={`${country.region.toUpperCase()} / ${country.code}`}
        title={`Providers in ${country.name}`}
        description="Explore recorded observations for this market. A provider’s availability can vary between casinos."
      />
      <AvailabilityPanel country={slug} limit={1000} />
    </>
  );
}
export function AvailabilityPage() {
  const [params, setParams] = useSearchParams();
  const provider = params.get('provider') || '';
  const country = params.get('country') || '';
  function change(key: string, value: string) {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  }
  return (
    <>
      <PageHeading
        eyebrow="THE RECORDED PICTURE"
        title="Check availability"
        description="Choose a provider and country to inspect the underlying observations."
      />
      <div className="availability-filters">
        <TextField
          select
          label="Provider"
          value={providers.some((p) => p.slug === provider) ? provider : ''}
          onChange={(e) => change('provider', e.target.value)}
        >
          <MenuItem value="">All providers</MenuItem>
          {providers.map((p) => (
            <MenuItem key={p.slug} value={p.slug}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Country"
          value={countries.some((c) => c.slug === country) ? country : ''}
          onChange={(e) => change('country', e.target.value)}
        >
          <MenuItem value="">All countries</MenuItem>
          {countries.map((c) => (
            <MenuItem key={c.slug} value={c.slug}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <AvailabilityPanel
        provider={provider || undefined}
        country={country || undefined}
        limit={1000}
      />
      <p className="data-note">
        An observation is not a guarantee of current access. Check the date and confirm with the
        relevant casino.
      </p>
    </>
  );
}
export function Recent() {
  return (
    <>
      <PageHeading
        eyebrow="THE LATEST OBSERVATIONS"
        title="Recently checked"
        description="The most recent dated records, newest first. An unknown status means availability has not been confirmed."
      />
      <AvailabilityPanel limit={50} datedOnly />
    </>
  );
}
export function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">404 / OFF THE MAP</span>
      <h1>This page isn’t in the directory.</h1>
      <p>Let’s find your next connection.</p>
      <Button component={Link} to="/" variant="contained" endIcon={<ArrowRight size={17} />}>
        Back to home
      </Button>
    </div>
  );
}
