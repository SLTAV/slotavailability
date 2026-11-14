import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import type { Country, Provider } from '../data/catalog';
import countryPhotos from '../data/country-photos.json';

export function SectionHeading({
  title,
  icon,
  to,
  action = 'View all',
  subtitle,
}: {
  title: string;
  icon?: ReactNode;
  to?: string;
  action?: string;
  subtitle?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>
          {icon}
          {title}
        </h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {to && (
        <Link className="section-action" to={to}>
          {action}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
const detailedProviderArt = new Set([
  'hacksaw-gaming',
  'pragmatic-play',
  'nolimit-city',
  'relax-gaming',
  'push-gaming',
  'play-n-go',
  'evolution',
  'bgaming',
  'elk-studios',
  'thunderkick',
]);
export function ProviderCard({
  provider,
  illustrated = false,
}: {
  provider: Provider;
  illustrated?: boolean;
}) {
  const detailed = illustrated && detailedProviderArt.has(provider.slug);
  return (
    <Link
      to={`/provider/${provider.slug}`}
      aria-label={illustrated ? `${provider.name} — View availability` : undefined}
      className={`provider-card provider-${provider.slug}${illustrated ? ' provider-card-illustrated' : ''}${detailed ? ' provider-card-detailed' : ''}`}
      style={illustrated ? undefined : ({ '--studio-color': provider.color } as CSSProperties)}
    >
      <div className="provider-art">
        {illustrated ? (
          <>
            <img
              className="provider-silhouette"
              src={`/illustrations/${detailed ? 'providers-detailed' : 'providers'}/${provider.slug}.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              width={600}
              height={detailed ? 800 : 400}
            />
            <span className="provider-wordmark" aria-hidden="true">
              {provider.name}
            </span>
          </>
        ) : (
          <>
            <div className="studio-orbit" />
            <span className="studio-monogram" aria-hidden="true">
              {provider.initials}
            </span>
            <strong>{provider.mark}</strong>
            <span className="provider-art-label">
              {provider.name.includes('Gaming') ? 'GAMING STUDIO' : 'SLOT PROVIDER'}
            </span>
          </>
        )}
      </div>
      <div className="provider-info">
        {!illustrated && <strong>{provider.name}</strong>}
        <span>
          View availability <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
export function Flag({ code }: { code: string }) {
  return (
    <span className={`flag flag-${code.toLowerCase()}`} aria-label={code}>
      {['CA', 'BR', 'AU', 'NZ', 'GB', 'NO', 'FI', 'DK', 'CH'].includes(code)
        ? { CA: '◆', BR: '◆', AU: '✦', NZ: '✦', GB: '✚', NO: '✚', FI: '✚', DK: '✚', CH: '+' }[code]
        : ''}
    </span>
  );
}
export function CountryCard({
  country,
  variant = 'compact',
  to,
  label,
}: {
  country: Country;
  variant?: 'compact' | 'postcard';
  to?: string;
  label?: string;
}) {
  const photo =
    variant === 'postcard' ? countryPhotos.find((item) => item.slug === country.slug) : null;
  if (photo) {
    return (
      <Link
        className="country-card country-postcard"
        to={to ?? `/country/${country.slug}`}
        aria-label={label ?? `Explore ${country.name}`}
      >
        <img
          src={`/countries/${country.slug}.webp`}
          alt=""
          width={720}
          height={960}
          loading="lazy"
          decoding="async"
        />
        <div className="postcard-caption">
          <img
            className="postcard-flag"
            src={`/flags/${country.code.toLowerCase()}.svg`}
            alt=""
            width={24}
            height={18}
            loading="lazy"
          />
          <strong>{country.name}</strong>
        </div>
        <ArrowUpRight className="postcard-arrow" size={17} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <Link className="country-card" to={to ?? `/country/${country.slug}`}>
      <Flag code={country.code} />
      <strong>{country.name}</strong>
      <span>
        {country.region}
        <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
}
