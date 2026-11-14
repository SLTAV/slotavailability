import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Compass, X } from 'lucide-react';
import { Button, IconButton } from '@mui/material';
import { searchCatalog } from '../data/catalog';

type Category = 'providers' | 'countries';
export function GuidedSearchBox({
  query: controlledQuery,
  category: controlledCategory,
  onChange,
}: {
  query?: string;
  category?: Category;
  onChange?: (query: string, category: Category) => void;
}) {
  const [localQuery, setLocalQuery] = useState('');
  const [localCategory, setLocalCategory] = useState<Category>('providers');
  const query = controlledQuery ?? localQuery;
  const category = controlledCategory ?? localCategory;
  const setQuery = (value: string) => (onChange ? onChange(value, category) : setLocalQuery(value));
  const setCategory = (value: Category) => {
    if (onChange) onChange('', value);
    else {
      setLocalCategory(value);
      setLocalQuery('');
    }
  };
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const matches = searchCatalog(query);
  const show = !onChange && expanded && query.trim().length > 0;
  const isProvider = category === 'providers';
  const results = isProvider
    ? matches.providers.map((p) => ({ name: p.name, to: `/provider/${p.slug}` }))
    : matches.countries.map((c) => ({ name: c.name, to: `/country/${c.slug}` }));
  return (
    <div
      className="search-block guided-search"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setExpanded(false);
      }}
    >
      <div className="search-category-row">
        <div className="search-categories" role="group" aria-label="Search category">
          {(['providers', 'countries'] as const).map((kind) => (
            <button
              key={kind}
              type="button"
              aria-pressed={category === kind}
              onClick={() => {
                setCategory(kind);
                setExpanded(false);
              }}
            >
              {kind === 'providers' ? 'Providers' : 'Countries'}
            </button>
          ))}
        </div>
      </div>
      <form
        className="search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setExpanded(false);
          if (onChange) {
            onChange(query.trim(), category);
            return;
          }
          navigate(
            query.trim()
              ? `/search?q=${encodeURIComponent(query.trim())}&type=${category}`
              : `/${category}`,
          );
        }}
      >
        <Search size={21} aria-hidden="true" />
        <label htmlFor="global-search" className="sr-only">
          {isProvider ? 'Find a provider' : 'Find a country'}
        </label>
        <input
          id="global-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setExpanded(true);
          }}
          onFocus={() => setExpanded(true)}
          placeholder={isProvider ? 'Find a provider…' : 'Find a country…'}
          aria-expanded={show}
          aria-controls={show ? 'catalog-search-results' : undefined}
          autoComplete="off"
        />
        {query && (
          <IconButton aria-label="Clear search" size="small" onClick={() => setQuery('')}>
            <X size={16} />
          </IconButton>
        )}
        <Button type="submit" variant="outlined" endIcon={<ArrowRight size={16} />}>
          Explore
        </Button>
      </form>
      {show && (
        <div id="catalog-search-results" className="search-suggestions" aria-live="polite">
          <span className="eyebrow">
            {isProvider ? 'MATCHING PROVIDERS' : 'MATCHING COUNTRIES'}
          </span>
          {results.slice(0, 7).map((result) => (
            <Link key={result.to} to={result.to} onClick={() => setExpanded(false)}>
              <strong>{result.name}</strong>
              <span>
                {isProvider ? 'Provider' : 'Country'}
                <ArrowUpRightIcon />
              </span>
            </Link>
          ))}
          {!results.length && <p>No matching {category}. Try another name.</p>}
        </div>
      )}
    </div>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={14} />;
}

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  const found = searchCatalog(query);
  const results = [
    ...found.providers
      .slice(0, 4)
      .map((p) => ({ name: p.name, to: `/provider/${p.slug}`, kind: 'Providers' })),
    ...found.countries
      .slice(0, 4)
      .map((c) => ({ name: c.name, to: `/country/${c.slug}`, kind: 'Countries' })),
  ];
  const show = expanded && query.trim().length > 0;
  return (
    <div
      className="search-block exploration-search"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setExpanded(false);
          setActive(-1);
        }
      }}
    >
      <form
        className="search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setExpanded(false);
          const category =
            !found.providers.length && found.countries.length ? 'countries' : 'providers';
          navigate(
            show && active >= 0 && results[active]
              ? results[active].to
              : `/search?q=${encodeURIComponent(query.trim())}&type=${category}`,
          );
        }}
      >
        <Compass size={22} aria-hidden="true" />
        <label className="sr-only" htmlFor="home-search">
          Search providers or countries
        </label>
        <input
          id="home-search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={show}
          aria-controls={show ? 'home-search-results' : undefined}
          aria-activedescendant={show && active >= 0 ? `home-result-${active}` : undefined}
          placeholder="Search a provider or country…"
          value={query}
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setExpanded(true);
            setActive(-1);
          }}
          onFocus={() => setExpanded(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setExpanded(false);
              setActive(-1);
            }
            if (
              (event.key === 'ArrowDown' || event.key === 'ArrowUp') &&
              query.trim() &&
              results.length
            ) {
              event.preventDefault();
              setExpanded(true);
              setActive((previous) =>
                event.key === 'ArrowDown'
                  ? (previous + 1) % results.length
                  : previous <= 0
                    ? results.length - 1
                    : previous - 1,
              );
            }
          }}
        />
        {query && (
          <IconButton
            aria-label="Clear search"
            size="small"
            onClick={() => {
              setQuery('');
              setActive(-1);
            }}
          >
            <X size={16} />
          </IconButton>
        )}
        <Button type="submit" variant="outlined" endIcon={<ArrowRight size={16} />}>
          Explore
        </Button>
      </form>
      {show && (
        <div className="search-suggestions exploration-results">
          <div
            id="home-search-results"
            role="listbox"
            aria-label="Matching providers and countries"
          >
            {(['Providers', 'Countries'] as const).map((kind) => (
              <div role="group" aria-label={kind} key={kind}>
                <span className="eyebrow">{kind}</span>
                {results.map(
                  (item, index) =>
                    item.kind === kind && (
                      <Link
                        id={`home-result-${index}`}
                        role="option"
                        aria-selected={active === index}
                        className={active === index ? 'is-highlighted' : ''}
                        tabIndex={-1}
                        key={item.to}
                        to={item.to}
                        onClick={() => setExpanded(false)}
                      >
                        <strong>{item.name}</strong>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    ),
                )}
                {!results.some((item) => item.kind === kind) && (
                  <p>No matching {kind.toLowerCase()}.</p>
                )}
              </div>
            ))}
          </div>
          <div className="search-keyboard-hint">↑ ↓ to navigate · Enter to open · Esc to close</div>
        </div>
      )}
      <span className="sr-only" role="status">
        {show ? `${results.length} matching results` : ''}
      </span>
    </div>
  );
}
