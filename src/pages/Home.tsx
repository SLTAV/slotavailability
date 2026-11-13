import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowRight, ArrowUpRight, Clock3, Globe2, Layers3, ShieldCheck } from 'lucide-react';
import { AvailabilityPanel } from '../components/Availability';
import { CountryCard, ProviderCard, SectionHeading } from '../components/Cards';
import { SearchBox } from '../components/SearchBox';
import { countries, providers } from '../data/catalog';

function StudioArtwork() {
  return (
    <div className="hero-art studio-art" aria-hidden="true">
      <div className="art-disc" />
      <div className="floating-studio studio-back">
        <span>NC</span>
        <small>NOLIMIT CITY</small>
      </div>
      <div className="floating-studio studio-middle">
        <span>
          H<span className="cut">/</span>G
        </span>
        <small>HACKSAW GAMING</small>
      </div>
      <div className="floating-studio studio-front">
        <span>
          PP<i>✦</i>
        </span>
        <small>PRAGMATIC PLAY</small>
      </div>
      <span className="art-spark spark-one">✦</span>
      <span className="art-spark spark-two">+</span>
    </div>
  );
}
function GlobeArtwork() {
  return (
    <div className="hero-art globe-art" aria-hidden="true">
      <div className="planet">
        <svg viewBox="0 0 260 260">
          <defs>
            <radialGradient id="planet" cx="30%" cy="20%">
              <stop stopColor="#b9d2ec" />
              <stop offset=".6" stopColor="#587492" />
              <stop offset="1" stopColor="#27364c" />
            </radialGradient>
            <clipPath id="planet-clip">
              <circle cx="130" cy="130" r="114" />
            </clipPath>
          </defs>
          <circle cx="130" cy="130" r="114" fill="url(#planet)" />
          <g clipPath="url(#planet-clip)" fill="none" stroke="#deecfc" strokeOpacity=".28">
            <ellipse cx="130" cy="130" rx="60" ry="114" />
            <ellipse cx="130" cy="130" rx="94" ry="114" />
            <path d="M16 130h228M26 87h208M26 173h208M55 43h150M55 217h150M130 16v228" />
          </g>
          <g fill="#d6e8fa" opacity=".52">
            <path d="M52 66l30-19 29 8 12 21-16 10-2 20-17 8-4 23-18-8-6-23-22-13zM90 137l25 9 11 18-8 20-15 24-12-15-6-29zM145 69l19-15 39 14 15 21-24 10-18-7-8 15-26-12zM145 107l28 4 12 24-12 29-17 13-15-27-9-28zM193 172l20-9 15 15-9 15-27-4z" />
          </g>
        </svg>
      </div>
      <span className="globe-label label-ca">
        <span className="mini-dot" /> Canada
      </span>
      <span className="globe-label label-de">
        <span className="mini-dot" /> Germany
      </span>
      <span className="globe-label label-au">
        <span className="mini-dot" /> Australia
      </span>
    </div>
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
          <StudioArtwork />
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
          <GlobeArtwork />
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
