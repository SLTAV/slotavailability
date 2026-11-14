import { ResponsiveCardRow } from '../components/ResponsiveCardRow';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Compass,
  Layers3,
  MapPinned,
  Sparkles,
} from 'lucide-react';
import { AvailabilityPanel } from '../components/Availability';
import { CountryCard, ProviderCard, SectionHeading } from '../components/Cards';
import { SearchBox } from '../components/SearchBox';
import { countries, providers } from '../data/catalog';

function HeroArtwork({ kind }: { kind: 'providers' | 'countries' }) {
  return (
    <img
      className={`hero-art hero-adventure-art hero-adventure-art-${kind}`}
      src={`/illustrations/${kind}-adventure.webp`}
      alt=""
      aria-hidden="true"
      width={1200}
      height={800}
      decoding="async"
      fetchPriority="high"
      draggable={false}
    />
  );
}
export default function Home() {
  return (
    <>
      <h1 className="sr-only">SlotAvailability — Provider availability by country</h1>
      <div className="hero-grid">
        <Link to="/providers" className="hero-card hero-providers">
          <div className="hero-copy">
            <span className="hero-kicker">
              <Sparkles size={12} /> FIND YOUR FAVOURITES
            </span>
            <h2>Providers</h2>
            <p>Big studios. Iconic slots.</p>
            <span className="hero-button">
              <Compass size={16} /> Explore providers <ArrowUpRight size={17} />
            </span>
          </div>
          <HeroArtwork kind="providers" />
        </Link>
        <Link to="/countries" className="hero-card hero-countries">
          <div className="hero-copy">
            <span className="hero-kicker">
              <MapPinned size={12} /> EXPLORE THE SLOT WORLD
            </span>
            <h2>Countries</h2>
            <p>Your country. Your line-up.</p>
            <span className="hero-button">
              <Compass size={16} /> Explore countries <ArrowUpRight size={17} />
            </span>
          </div>
          <HeroArtwork kind="countries" />
        </Link>
      </div>
      <SearchBox />

      <section className="content-section">
        <SectionHeading title="Popular Providers" icon={<Layers3 size={19} />} to="/providers" />
        <ResponsiveCardRow className="provider-grid">
          {providers.map((provider) => (
            <ProviderCard provider={provider} key={provider.slug} illustrated />
          ))}
        </ResponsiveCardRow>
      </section>
      <section className="content-section">
        <SectionHeading title="Countries" icon={<MapPinned size={19} />} to="/countries" />
        <ResponsiveCardRow className="country-grid">
          {countries.map((country) => (
            <CountryCard country={country} key={country.slug} variant="postcard" />
          ))}
        </ResponsiveCardRow>
      </section>
      <section className="content-section recent-checks-surface">
        <SectionHeading
          title="Recently Checked"
          icon={<Clock3 size={19} />}
          to="/recent"
          action="All checks"
        />
        <AvailabilityPanel limit={3} datedOnly />
        <p className="data-note">
          <span className="status-dot" /> Actual recorded observations. Unknown means not yet
          confirmed.
        </p>
      </section>
      <section className="help-banner" aria-labelledby="contribution-heading">
        <div className="help-copy">
          <span className="eyebrow">BETTER TOGETHER</span>
          <h2 id="contribution-heading">What you know helps everyone.</h2>
          <p>Share your observations and help build a clearer picture of provider availability.</p>
          <Button
            component={Link}
            to="/help-us"
            variant="contained"
            endIcon={<ArrowRight size={17} />}
          >
            Contribute
          </Button>
        </div>
        <img
          className="help-artwork"
          src="/illustrations/better-together-expedition.webp"
          alt=""
          aria-hidden="true"
          width={1800}
          height={600}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </section>
    </>
  );
}
