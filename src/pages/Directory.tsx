import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import { CountryCard, ProviderCard, SectionHeading } from '../components/Cards';
import { countries, providers, normalize, searchCatalog } from '../data/catalog';
import { GuidedSearchBox } from '../components/SearchBox';

export function Providers() {
  const [query, setQuery] = useState('');
  const visible = providers.filter((p) => normalize(p.name).includes(normalize(query)));
  return (
    <>
      <h1 className="sr-only">Explore providers</h1>
      <div className="search-adventure-banner providers-adventure-banner">
        <img
          src="/illustrations/providers-workshop-banner.webp"
          alt=""
          width={1800}
          height={600}
          fetchPriority="high"
        />
      </div>
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
      <div className="provider-grid">
        {visible.map((provider) => (
          <ProviderCard key={provider.slug} provider={provider} illustrated />
        ))}
      </div>
      {!visible.length && <EmptySearch />}
    </>
  );
}
export function Countries() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');
  const visible = countries.filter(
    (c) =>
      normalize(c.name).includes(normalize(query)) && (region === 'All' || c.region === region),
  );
  return (
    <>
      <h1 className="sr-only">Explore countries</h1>
      <div className="search-adventure-banner countries-adventure-banner">
        <img
          src="/illustrations/adventure-portals-banner.webp"
          alt=""
          width={1800}
          height={600}
          fetchPriority="high"
        />
      </div>
      <div className="directory-toolbar">
        <div className="filter-chips" aria-label="Filter by region">
          {['All', 'Europe', 'Americas', 'Oceania'].map((r) => (
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
      <div className="country-grid">
        {visible.map((country) => (
          <CountryCard key={country.slug} country={country} variant="postcard" />
        ))}
      </div>
      {!visible.length && <EmptySearch />}
    </>
  );
}
export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('type') === 'countries' ? 'countries' : 'providers';
  const found = searchCatalog(query);
  const matches = {
    providers: category === 'countries' ? [] : found.providers,
    countries: category === 'providers' ? [] : found.countries,
  };
  return (
    <>
      <h1 className="sr-only">Search the database</h1>
      <div className="search-adventure-banner">
        <img
          src="/illustrations/search-adventure-banner.webp"
          alt=""
          width={1800}
          height={600}
          fetchPriority="high"
        />
      </div>
      <GuidedSearchBox
        query={query}
        category={category}
        onChange={(value, kind) => setParams({ q: value, type: kind }, { replace: true })}
      />
      {category !== 'countries' && (
        <section className="content-section">
          <SectionHeading title={`Providers (${matches.providers.length})`} />
          <div className="provider-grid search-provider-grid">
            {matches.providers.map((provider) => (
              <ProviderCard key={provider.slug} provider={provider} illustrated />
            ))}
          </div>
        </section>
      )}
      {category !== 'providers' && (
        <section className="content-section">
          <SectionHeading title={`Countries (${matches.countries.length})`} />
          <div className="country-grid">
            {matches.countries.map((country) => (
              <CountryCard key={country.slug} country={country} variant="postcard" />
            ))}
          </div>
        </section>
      )}
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
