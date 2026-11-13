import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, X } from 'lucide-react';
import { Button, IconButton } from '@mui/material';
import { searchCatalog } from '../data/catalog';

export function SearchBox({ initial = '' }: { initial?: string }) {
  const [query, setQuery] = useState(initial);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const matches = searchCatalog(query);
  const show = expanded && query.trim().length > 0;
  return (
    <div
      className="search-block"
      onKeyDown={(event) => {
        if (event.key === 'Escape') setExpanded(false);
      }}
    >
      <form
        className="search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setExpanded(false);
          navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }}
      >
        <Search size={21} aria-hidden="true" />
        <label htmlFor="global-search" className="sr-only">
          Search providers or countries
        </label>
        <input
          id="global-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setExpanded(true);
          }}
          onFocus={() => setExpanded(true)}
          placeholder="Search a provider or country…"
          autoComplete="off"
        />
        {query && (
          <IconButton aria-label="Clear search" size="small" onClick={() => setQuery('')}>
            <X size={16} />
          </IconButton>
        )}
        <span className="search-hint">Find your connection</span>
        <Button type="submit" variant="contained" endIcon={<ArrowRight size={16} />}>
          Search
        </Button>
      </form>
      {show && (
        <div className="search-suggestions" aria-live="polite">
          <span className="eyebrow">MATCHING THE DIRECTORY</span>
          {[
            ...matches.providers.map((p) => ({
              name: p.name,
              to: `/provider/${p.slug}`,
              kind: 'Provider',
            })),
            ...matches.countries.map((c) => ({
              name: c.name,
              to: `/country/${c.slug}`,
              kind: 'Country',
            })),
          ]
            .slice(0, 7)
            .map((result) => (
              <Link key={result.to} to={result.to} onClick={() => setExpanded(false)}>
                <strong>{result.name}</strong>
                <span>
                  {result.kind}
                  <ArrowUpRightIcon />
                </span>
              </Link>
            ))}
          {!matches.providers.length && !matches.countries.length && (
            <p>No matches yet. Try a different provider or country.</p>
          )}
        </div>
      )}
    </div>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={14} />;
}
