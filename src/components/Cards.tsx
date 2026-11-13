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
export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      to={`/provider/${provider.slug}`}
      className={`provider-card provider-${provider.slug}`}
      style={{ '--studio-color': provider.color } as CSSProperties}
    >
      <div className="provider-art">
        <div className="studio-orbit" />
        <span className="studio-monogram" aria-hidden="true">
          {provider.initials}
        </span>
        <strong>{provider.mark}</strong>
        <span className="provider-art-label">
          {provider.name.includes('Gaming') ? 'GAMING STUDIO' : 'SLOT PROVIDER'}
        </span>
      </div>
      <div className="provider-info">
        <strong>{provider.name}</strong>
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
}: {
  country: Country;
  variant?: 'compact' | 'postcard';
}) {
  const photo =
    variant === 'postcard' ? countryPhotos.find((item) => item.slug === country.slug) : null;
  if (photo) {
    return (
      <Link
        className="country-card country-postcard"
        to={`/country/${country.slug}`}
        aria-label={`Explore ${country.name}`}
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
          <strong>{country.name}</strong>
          <span>{photo.location}</span>
        </div>
        <ArrowUpRight className="postcard-arrow" size={17} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <Link className="country-card" to={`/country/${country.slug}`}>
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
