import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowRight, ArrowUpRight, Clock3, Globe2, Layers3, ShieldCheck } from 'lucide-react';
import { AvailabilityPanel } from '../components/Availability';
import { CountryCard, ProviderCard, SectionHeading } from '../components/Cards';
import { SearchBox } from '../components/SearchBox';
import { countries, providers } from '../data/catalog';

function HeroArtwork({ kind }: { kind: 'providers' | 'countries' }) {
  return (
    <img
      className={`hero-art hero-glass hero-glass-${kind}`}
      src={`/illustrations/${kind}-glass.webp`}
      alt=""
      aria-hidden="true"
      width={768}
      height={768}
      decoding="async"
      fetchPriority="high"
      draggable={false}
    />
  );
}
export default function Home() {
  return (
    <>
      <div className="home-intro">
        <div>
          <span className="eyebrow">THE WORLD OF SLOT PROVIDERS</span>
          <h1>Find your connection.</h1>
        </div>
        <span className="intro-note">
          <ShieldCheck size={15} /> Independent. Transparent. In one place.
        </span>
      </div>
      <div className="hero-grid">
        <Link to="/providers" className="hero-card hero-providers">
          <div className="hero-copy">
            <span className="hero-kicker">THE STUDIOS BEHIND THE SLOTS</span>
            <h2>Providers</h2>
            <p>
              Your favourite studios.
              <br />
              Discover where they’re available.
            </p>
            <span className="hero-button">
              Explore providers <ArrowUpRight size={17} />
            </span>
            <span className="hero-footnote">{providers.length} studios in the directory</span>
          </div>
          <HeroArtwork kind="providers" />
        </Link>
        <Link to="/countries" className="hero-card hero-countries">
          <div className="hero-copy">
            <span className="hero-kicker">EXPLORE BEYOND BORDERS</span>
            <h2>Countries</h2>
            <p>
              A world of possibilities.
              <br />
              Find the providers in your market.
            </p>
            <span className="hero-button">
              Explore countries <ArrowUpRight size={17} />
            </span>
            <span className="hero-footnote">{countries.length} markets to explore</span>
          </div>
          <HeroArtwork kind="countries" />
        </Link>
      </div>
      <SearchBox />
      <section className="content-section">
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
      <section className="content-section">
        <SectionHeading title="Popular Providers" icon={<Layers3 size={19} />} to="/providers" />
        <div className="provider-grid">
          {providers.slice(0, 6).map((provider) => (
            <ProviderCard provider={provider} key={provider.slug} />
          ))}
        </div>
      </section>
      <section className="content-section">
        <SectionHeading title="Countries" icon={<Globe2 size={19} />} to="/countries" />
        <div className="country-grid">
          {countries.slice(0, 6).map((country) => (
            <CountryCard country={country} key={country.slug} />
          ))}
        </div>
      </section>
      <div className="help-banner">
        <div className="help-symbol">
          <ShieldCheck size={30} />
        </div>
        <div>
          <span className="eyebrow">BETTER TOGETHER</span>
          <h2>Good information starts with you.</h2>
          <p>Spotted a change? Help us make the directory more accurate.</p>
        </div>
        <Button
          component={Link}
          to="/help-us"
          variant="outlined"
          endIcon={<ArrowRight size={16} />}
        >
          Help us improve
        </Button>
      </div>
    </>
  );
}
