import { ProviderProfile } from './ProviderProfile';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@mui/material';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AvailabilityPanel } from '../components/Availability';
import { PageHeading } from '../components/Cards';
import { countries, providers } from '../data/catalog';

export function ProviderDetail() {
  const { slug } = useParams();
  const provider = providers.find((p) => p.slug === slug);
  if (!provider) return <NotFound />;
  return <ProviderProfile key={provider.slug} provider={provider} />;
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
        description="Explore recorded observations for this country. Availability can vary by service and change over time."
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
        relevant service.
      </p>
    </>
  );
}
export function Recent() {
  return (
    <div className="recent-checks-surface">
      <h1 className="sr-only">Recently checked</h1>
      <div className="search-adventure-banner">
        <img
          src="/illustrations/recent-observations-banner.webp"
          alt=""
          width={1800}
          height={600}
          fetchPriority="high"
        />
      </div>
      <div className="recent-checks-heading">
        <h2>Recently Checked</h2>
        <p>The latest dated observations, shared for a clearer picture.</p>
      </div>
      <AvailabilityPanel limit={25} datedOnly loadMore />
    </div>
  );
}
export function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">404 / OFF THE MAP</span>
      <h1>This page isn’t in the database.</h1>
      <p>Let’s find your next connection.</p>
      <Button component={Link} to="/" variant="contained" endIcon={<ArrowRight size={17} />}>
        Back to home
      </Button>
    </div>
  );
}
