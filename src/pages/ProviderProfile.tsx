import { CountryCard } from '../components/Cards';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { ArrowLeft, Map, HeartHandshake, Search } from 'lucide-react';
import { countries, normalize, type Provider } from '../data/catalog';
import { useAvailability } from '../lib/useAvailability';
import { ObservationTable, StatusBadge } from '../components/Availability';
import { formatDate, summarize, type AvailabilityStatus } from '../../shared/availability';

const filters: { value: 'all' | AvailabilityStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'unavailable', label: 'Not available' },
  { value: 'unknown', label: 'Unknown' },
];
export function ProviderProfile({ provider }: { provider: Provider }) {
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState<'all' | AvailabilityStatus>('all');
  const [page, setPage] = useState(1);
  const { data, loading, error, retry } = useAvailability(provider.slug);
  const query = params.get('q') ?? '';
  const countryFilter = params.get('country');
  const rows = data?.observations ?? [];
  const cards = countries
    .map((country) => {
      const observations = rows.filter((row) => row.countrySlug === country.slug);
      const dated = observations
        .map((row) => row.checkedAt)
        .filter((date): date is string => Boolean(date) && Number.isFinite(Date.parse(date!)))
        .sort((a, b) => Date.parse(b) - Date.parse(a));
      return { country, status: summarize(observations), date: dated[0] ?? null };
    })
    .filter(
      (item) =>
        (!countryFilter || item.country.slug === countryFilter) &&
        normalize(item.country.name + ' ' + item.country.code).includes(normalize(query)) &&
        (status === 'all' || item.status === status),
    );
  const visibleSlugs = new Set(cards.map((item) => item.country.slug));
  const observations = rows
    .filter((row) => visibleSlugs.has(row.countrySlug))
    .sort((a, b) => (Date.parse(b.checkedAt ?? '') || 0) - (Date.parse(a.checkedAt ?? '') || 0));
  const banner = `/illustrations/provider-banners/${provider.slug}.webp`;
  return (
    <div className="provider-profile">
      <nav className="profile-breadcrumb" aria-label="Breadcrumb">
        <Link to="/providers">
          <ArrowLeft size={14} />
          Providers
        </Link>
        <span>/</span>
        <span>{provider.name}</span>
      </nav>
      <section className="profile-hero">
        <img
          className="profile-hero-image"
          src={banner}
          alt=""
          width={1800}
          height={600}
          fetchPriority="high"
        />
        <div>
          <span className="eyebrow">PROVIDER PROFILE</span>
          <h1>{provider.name}</h1>
          <p>Explore recorded availability by country.</p>
        </div>
      </section>
      <section aria-labelledby="profile-countries-title">
        <div className="profile-section-heading">
          <h2 id="profile-countries-title">Availability by country</h2>
          <Link to="/map">
            <Map size={16} />
            World map
          </Link>
        </div>
        <div className="profile-filters">
          <div className="profile-search">
            <Search size={17} />
            <TextField
              size="small"
              placeholder="Find a country"
              value={query}
              slotProps={{ htmlInput: { 'aria-label': 'Find a country' } }}
              onChange={(e) => {
                setParams(e.target.value ? { q: e.target.value } : {}, { replace: true });
                setPage(1);
              }}
            />
          </div>
          <div
            className="profile-status-filters"
            role="group"
            aria-label="Filter by recorded status"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                aria-pressed={status === filter.value}
                onClick={() => {
                  setStatus(filter.value);
                  setPage(1);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        {countryFilter && (
          <Button
            size="small"
            className="profile-clear-country"
            onClick={() => {
              setParams({}, { replace: true });
              setPage(1);
            }}
          >
            Show all countries
          </Button>
        )}
        {error && (
          <div className="profile-data-notice" role="alert">
            <span>Checks are temporarily unavailable. Country details are still accessible.</span>
            <Button onClick={retry}>Try again</Button>
          </div>
        )}
        <div className="country-grid profile-postcard-grid" aria-busy={loading}>
          {cards.map((item) => (
            <article className="profile-postcard-item" key={item.country.slug}>
              <CountryCard
                country={item.country}
                variant="postcard"
                to={`/availability?provider=${provider.slug}&country=${item.country.slug}`}
                label={`View ${provider.name} in ${item.country.name}`}
              />
              <div className="profile-postcard-info">
                {!loading && !error && <StatusBadge status={item.status} />}
                <span>
                  {loading
                    ? 'Loading checks…'
                    : error
                      ? 'Checks unavailable'
                      : item.date
                        ? 'Last checked ' + formatDate(item.date)
                        : 'No dated check'}
                </span>
              </div>
            </article>
          ))}
        </div>
        {!cards.length && (
          <div className="empty-panel">
            No countries match these filters.
            <Button
              onClick={() => {
                setStatus('all');
                setParams({}, { replace: true });
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
        <p className="data-note">
          Recorded observations can change over time. Unknown means availability has not been
          confirmed.
        </p>
      </section>
      <section className="profile-observations" aria-labelledby="profile-observations-title">
        <div className="profile-section-heading">
          <h2 id="profile-observations-title">Latest observations</h2>
          <Button
            component={Link}
            to="/help-us"
            variant="outlined"
            startIcon={<HeartHandshake size={16} />}
          >
            Share an observation
          </Button>
        </div>
        {loading ? (
          <p className="data-note" role="status">
            Loading observations…
          </p>
        ) : error ? (
          <p className="data-note">Observations could not be loaded. Please try again above.</p>
        ) : observations.length ? (
          <>
            <ObservationTable rows={observations.slice(0, page * 25)} />
            {observations.length > page * 25 && (
              <div className="load-more-checks">
                <Button variant="outlined" onClick={() => setPage((value) => value + 1)}>
                  Load more
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-panel">No published observations for this selection yet.</div>
        )}
        {data?.truncated && (
          <p className="data-note">
            Only the most recent observations are shown; this is not complete coverage.
          </p>
        )}
      </section>
    </div>
  );
}
