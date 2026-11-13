export type Provider = {
  slug: string;
  name: string;
  mark: string;
  color: string;
  initials: string;
};
export type Country = {
  slug: string;
  name: string;
  code: string;
  region: string;
  coordinates: [number, number];
};
export const providers: Provider[] = [
  {
    slug: 'hacksaw-gaming',
    name: 'Hacksaw Gaming',
    mark: 'HACKSAW',
    color: '#d5e8b3',
    initials: 'HG',
  },
  {
    slug: 'pragmatic-play',
    name: 'Pragmatic Play',
    mark: 'PRAGMATIC',
    color: '#ebbd7e',
    initials: 'PP',
  },
  { slug: 'nolimit-city', name: 'Nolimit City', mark: 'NOLIMIT', color: '#c0bbec', initials: 'NC' },
  { slug: 'relax-gaming', name: 'Relax Gaming', mark: 'relax', color: '#92d9dc', initials: 'RG' },
  { slug: 'push-gaming', name: 'Push Gaming', mark: 'PUSH', color: '#e8abbc', initials: 'PG' },
  { slug: 'play-n-go', name: 'Play’n GO', mark: 'Play’n GO', color: '#9cbcf2', initials: 'GO' },
  { slug: 'evolution', name: 'Evolution', mark: 'evolution', color: '#c7cfd9', initials: 'EV' },
  { slug: 'bgaming', name: 'BGaming', mark: 'BGAMING', color: '#edb4df', initials: 'BG' },
  { slug: 'elk-studios', name: 'ELK Studios', mark: 'ELK', color: '#c9d7ad', initials: 'ELK' },
  {
    slug: 'thunderkick',
    name: 'Thunderkick',
    mark: 'THUNDERKICK',
    color: '#f1d68c',
    initials: 'TK',
  },
];
export const countries: Country[] = [
  { name: 'Canada', slug: 'canada', code: 'CA', region: 'Americas', coordinates: [-106, 57] },
  { name: 'Brazil', slug: 'brazil', code: 'BR', region: 'Americas', coordinates: [-52, -12] },
  { name: 'Australia', slug: 'australia', code: 'AU', region: 'Oceania', coordinates: [134, -25] },
  { name: 'Germany', slug: 'germany', code: 'DE', region: 'Europe', coordinates: [10, 51] },
  { name: 'Sweden', slug: 'sweden', code: 'SE', region: 'Europe', coordinates: [16, 63] },
  {
    name: 'United Kingdom',
    slug: 'united-kingdom',
    code: 'GB',
    region: 'Europe',
    coordinates: [-3, 55],
  },
  {
    name: 'New Zealand',
    slug: 'new-zealand',
    code: 'NZ',
    region: 'Oceania',
    coordinates: [173, -41],
  },
  { name: 'Switzerland', slug: 'switzerland', code: 'CH', region: 'Europe', coordinates: [8, 47] },
  { name: 'Netherlands', slug: 'netherlands', code: 'NL', region: 'Europe', coordinates: [5, 52] },
  { name: 'Norway', slug: 'norway', code: 'NO', region: 'Europe', coordinates: [9, 62] },
  { name: 'Finland', slug: 'finland', code: 'FI', region: 'Europe', coordinates: [26, 65] },
  { name: 'Denmark', slug: 'denmark', code: 'DK', region: 'Europe', coordinates: [10, 56] },
  { name: 'Belgium', slug: 'belgium', code: 'BE', region: 'Europe', coordinates: [4, 50] },
  { name: 'Portugal', slug: 'portugal', code: 'PT', region: 'Europe', coordinates: [-8, 39] },
  { name: 'Austria', slug: 'austria', code: 'AT', region: 'Europe', coordinates: [14, 48] },
];
export const providerName = (slug: string) => providers.find((p) => p.slug === slug)?.name ?? slug;
export const countryName = (slug: string) => countries.find((c) => c.slug === slug)?.name ?? slug;
export const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]/g, '');
export function searchCatalog(query: string) {
  const q = normalize(query);
  return {
    providers: providers.filter((p) => normalize(p.name).includes(q)),
    countries: countries.filter((c) => normalize(c.name + c.code).includes(q)),
  };
}
