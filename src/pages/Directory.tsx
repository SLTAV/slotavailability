import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import { CountryCard, PageHeading, ProviderCard, SectionHeading } from '../components/Cards';
import { countries, providers, normalize, searchCatalog } from '../data/catalog';

export function Providers() {
  const [query, setQuery] = useState('');
  const visible = providers.filter((p) => normalize(p.name).includes(normalize(query)));
  return (
    <>
      <PageHeading
        eyebrow="THE STUDIOS"
        title="Explore providers"
        description="Find a studio. Explore its markets. Get a clearer view of availability."
      />
      <div className="directory-toolbar">
        <TextField
          size="small"
          label="Find a provider"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            },
          }}
        />
        <span>{visible.length} providers</span>
      </div>
      <div className="provider-grid directory-grid">
        {visible.map((provider) => (
          <ProviderCard key={provider.slug} provider={provider} />
        ))}
      </div>
      {!visible.length && <EmptySearch />}
    </>
  );
}
export function Countries() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All markets');
  const visible = countries.filter(
    (c) =>
      normalize(c.name).includes(normalize(query)) &&
      (region === 'All markets' || c.region === region),
  );
  return (
    <>
      <PageHeading
        eyebrow="THE MARKETS"
        title="A world to explore"
        description="Browse the countries in our directory and discover their recorded provider availability."
      />
      <div className="directory-toolbar">
        <div className="filter-chips" aria-label="Filter by region">
          {['All markets', 'Europe', 'Americas', 'Oceania'].map((r) => (
            <Button
              key={r}
              variant={region === r ? 'contained' : 'text'}
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              size="small"
            >
              {r}
            </Button>
          ))}
        </div>
        <TextField
          size="small"
          label="Find a country"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="country-grid directory-grid">
        {visible.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>
      {!visible.length && <EmptySearch />}
    </>
  );
}
export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const matches = searchCatalog(query);
  return (
    <>
      <PageHeading
        eyebrow="FIND YOUR CONNECTION"
        title="Search the directory"
        description="Search across providers and countries. Pick a result to explore recorded checks."
      />
      <TextField
        className="page-search"
        fullWidth
        label="Provider or country"
        value={query}
        onChange={(e) => setParams({ q: e.target.value }, { replace: true })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          },
        }}
      />
      <section className="content-section">
        <SectionHeading title={`Providers (${matches.providers.length})`} />
        <div className="provider-grid">
          {matches.providers.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>
      <section className="content-section">
        <SectionHeading title={`Countries (${matches.countries.length})`} />
        <div className="country-grid">
          {matches.countries.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>
      </section>
      {!matches.providers.length && !matches.countries.length && <EmptySearch />}
    </>
  );
}
function EmptySearch() {
  return (
    <div className="empty-panel">
      <Search size={24} />
      <div>
        <strong>No matching results.</strong>
        <p>Try another name or clear your filters.</p>
      </div>
    </div>
  );
}
