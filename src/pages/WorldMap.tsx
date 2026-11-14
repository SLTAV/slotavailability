import { useState } from 'react';
import { Link } from 'react-router-dom';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import atlas from 'world-atlas/countries-110m.json';
import { Button, MenuItem, TextField } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { countries } from '../data/catalog';

const topology = atlas as unknown as Topology<{ countries: GeometryCollection }>;
const allLand = feature(topology, topology.objects.countries);
// Fit the projection to the same continents that are actually rendered.
const land = {
  ...allLand,
  features: allLand.features.filter((country) => String(country.id) !== '010'),
};
const projection = geoNaturalEarth1().fitExtent(
  [
    [20, 15],
    [980, 485],
  ],
  land,
);
const path = geoPath(projection);
const [[left, top], [right, bottom]] = path.bounds(land);
const mapViewBox = [left - 12, top - 12, right - left + 24, bottom - top + 24].join(' ');
export default function WorldMap() {
  const [selected, setSelected] = useState(countries[0]);
  const [zoomRegion, setZoomRegion] = useState<string | null>(null);
  const regionBounds: Record<string, [number, number, number, number]> = {
    Europe: [-26, 33, 45, 73],
    Americas: [-168, -57, -30, 76],
    Oceania: [108, -49, 180, 2],
  };
  const bounds = zoomRegion ? regionBounds[zoomRegion] : null;
  const zoomBox = bounds
    ? (() => {
        const points = [
          [bounds[0], bounds[1]],
          [bounds[2], bounds[1]],
          [bounds[0], bounds[3]],
          [bounds[2], bounds[3]],
        ].map((point) => projection(point as [number, number])!);
        const xs = points.map((point) => point[0]);
        const ys = points.map((point) => point[1]);
        const x = Math.min(...xs),
          y = Math.min(...ys);
        return [x - 10, y - 10, Math.max(...xs) - x + 20, Math.max(...ys) - y + 20].join(' ');
      })()
    : mapViewBox;
  const selectCountry = (country: (typeof countries)[number]) => {
    setSelected(country);
    setZoomRegion(country.region);
  };
  return (
    <>
      <h1 className="sr-only">Explore the map</h1>
      <div className="search-adventure-banner">
        <img
          src="/illustrations/adventure-atlas-banner.webp"
          alt=""
          width={1800}
          height={600}
          fetchPriority="high"
        />
      </div>
      <div className="map-layout atlas-map-layout">
        <div className="world-map">
          {zoomRegion && (
            <Button className="map-reset" onClick={() => setZoomRegion(null)} variant="outlined">
              ← World view
            </Button>
          )}
          <svg
            viewBox={zoomBox}
            role="img"
            aria-label="World map showing countries in the database"
          >
            <defs>
              <pattern id="atlas-parchment" patternUnits="userSpaceOnUse" width="1000" height="667">
                <image
                  href="/illustrations/atlas-parchment-texture.webp"
                  width="1000"
                  height="667"
                />
              </pattern>
              <filter id="atlas-paper" x="0" y="0" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  seed="8"
                  result="grain"
                />
                <feColorMatrix in="grain" type="saturate" values="0" />
                <feBlend in="SourceGraphic" mode="multiply" />
                <feComposite in2="SourceGraphic" operator="in" />
              </filter>
              <linearGradient id="atlas-land" x2="0.6" y2="1">
                <stop stopColor="#e2bf7e" />
                <stop offset="1" stopColor="#b88b49" />
              </linearGradient>
            </defs>
            <g className="land-shapes">
              {land.features.map((f, i) => (
                <path
                  key={i}
                  d={path(f) || ''}
                  className={
                    (f.properties as { name?: string })?.name === selected.name
                      ? 'selected-land'
                      : undefined
                  }
                />
              ))}
            </g>
            {countries.map((country) => {
              const position = projection(country.coordinates);
              if (!position) return null;
              return (
                <g
                  key={country.slug}
                  transform={`translate(${position[0]},${position[1]})`}
                  className={`map-marker ${selected.slug === country.slug ? 'selected' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${country.name}`}
                  aria-pressed={selected.slug === country.slug}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      selectCountry(country);
                    }
                  }}
                  onClick={() => selectCountry(country)}
                >
                  <title>{country.name}</title>
                  <circle r={zoomRegion ? 3.5 : 10} className="marker-halo" />
                  <circle r={zoomRegion ? 1.5 : 4} />
                </g>
              );
            })}
          </svg>
          <span className="atlas-compass" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
              <path
                d="M50 7 59 40 93 50 59 59 50 93 41 59 7 50 41 41Z"
                fill="#bd9252"
                stroke="#f3d899"
              />
              <path d="M50 7V50H93L59 40Z M50 93V50H7L41 59Z" fill="#403527" />
              <path
                d="M23 23 50 41 77 23 59 50 77 77 50 59 23 77 41 50Z"
                fill="none"
                stroke="#d0af71"
              />
              <circle cx="50" cy="50" r="4" fill="#efcf8b" />
            </svg>
            <small>N</small>
          </span>
        </div>
        <aside className="map-detail">
          <TextField
            select
            fullWidth
            label="Choose a country"
            value={selected.slug}
            onChange={(e) => selectCountry(countries.find((c) => c.slug === e.target.value)!)}
          >
            {countries.map((c) => (
              <MenuItem value={c.slug} key={c.slug}>
                <span className="map-country-option">
                  <img src={`/flags/${c.code.toLowerCase()}.svg`} alt="" width={20} height={15} />
                  {c.name}
                </span>
              </MenuItem>
            ))}
          </TextField>
          <img
            key={selected.slug}
            className="map-country-photo"
            src={`/countries/${selected.slug}.webp`}
            alt=""
            width={720}
            height={960}
          />
          <img
            className="map-country-flag"
            src={`/flags/${selected.code.toLowerCase()}.svg`}
            alt={`${selected.name} flag`}
            width={48}
            height={36}
          />
          <span className="eyebrow">{selected.region}</span>
          <h2>{selected.name}</h2>
          <p>Explore providers and recorded checks for this country.</p>
          <Button
            component={Link}
            to={`/country/${selected.slug}`}
            variant="contained"
            endIcon={<ArrowRight size={16} />}
          >
            Explore country
          </Button>
        </aside>
      </div>
    </>
  );
}
