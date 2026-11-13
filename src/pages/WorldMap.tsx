import { useState } from 'react';
import { Link } from 'react-router-dom';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import atlas from 'world-atlas/countries-110m.json';
import { Button, MenuItem, TextField } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { countries } from '../data/catalog';
import { PageHeading, Flag } from '../components/Cards';

const topology = atlas as unknown as Topology<{ countries: GeometryCollection }>;
const land = feature(topology, topology.objects.countries);
const projection = geoNaturalEarth1().fitExtent(
  [
    [20, 15],
    [980, 485],
  ],
  land,
);
const path = geoPath(projection);
export default function WorldMap() {
  const [selected, setSelected] = useState(countries[0]);
  return (
    <>
      <PageHeading
        eyebrow="A GLOBAL PERSPECTIVE"
        title="Explore the map"
        description="Discover the markets in our directory. Markers show directory coverage, not confirmed availability."
      />
      <div className="map-layout">
        <div className="world-map">
          <svg
            viewBox="0 0 1000 500"
            role="img"
            aria-label="World map showing countries in the directory"
          >
            <g className="land-shapes">
              {land.features.map((f, i) => (
                <path key={i} d={path(f) || ''} />
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
                  onClick={() => setSelected(country)}
                >
                  <title>{country.name}</title>
                  <circle r="10" className="marker-halo" />
                  <circle r="4" />
                </g>
              );
            })}
          </svg>
          <span className="map-legend">
            <span className="status-dot" /> Countries in the directory
          </span>
        </div>
        <aside className="map-detail">
          <TextField
            select
            fullWidth
            label="Choose a country"
            value={selected.slug}
            onChange={(e) => setSelected(countries.find((c) => c.slug === e.target.value)!)}
          >
            {countries.map((c) => (
              <MenuItem value={c.slug} key={c.slug}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
          <Flag code={selected.code} />
          <span className="eyebrow">{selected.region}</span>
          <h2>{selected.name}</h2>
          <p>Explore providers and recorded checks for this market.</p>
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
