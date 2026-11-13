import { Button } from '@mui/material';
import { Mail, ShieldCheck, Eye, HeartHandshake } from 'lucide-react';
import { PageHeading } from '../components/Cards';
export function About() {
  return (
    <>
      <PageHeading
        eyebrow="INDEPENDENT BY DESIGN"
        title="Clarity, without the noise."
        description="SlotAvailability is an independent directory that makes provider availability easier to explore."
      />
      <div className="information-grid">
        {[
          {
            icon: Eye,
            title: 'A clearer picture',
            text: 'Explore providers, countries and dated observations in one place. The directory is an information resource, not a casino.',
          },
          {
            icon: ShieldCheck,
            title: 'Honest about uncertainty',
            text: 'Available, not available and unknown describe recorded observations. They are not a guarantee of access, licensing or eligibility.',
          },
          {
            icon: HeartHandshake,
            title: 'Built to get better',
            text: 'Coverage grows with better information. Popular Providers is an editorial selection, not a ranking based on traffic or availability.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <article className="info-card" key={title}>
            <Icon size={26} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <article className="prose-card">
        <h2>How to read the directory</h2>
        <p>
          Start with a provider or a country. Each observation shows the recorded status and the
          last check date. When the source does not identify a casino, the directory says so.
          Missing information remains unknown.
        </p>
        <p>
          Studio lettering and country symbols are custom directory illustrations. They do not
          indicate a commercial affiliation.
        </p>
      </article>
    </>
  );
}
export function Help() {
  const href =
    'mailto:contact@slotavailability.com?subject=Availability%20observation&body=Provider%3A%20%0ACountry%3A%20%0ACasino%3A%20%0ADate%20checked%3A%20%0AWhat%20changed%3A%20%0ASource%3A%20';
  return (
    <>
      <PageHeading
        eyebrow="HELP US IMPROVE"
        title="Good information makes a difference."
        description="Spotted a change, a missing market or a detail that needs correcting? We’d like to hear from you."
      />
      <article className="prose-card help-page">
        <HeartHandshake size={40} />
        <h2>Share an observation</h2>
        <p>
          Include the provider, country, casino, date checked and a source or description of what
          you observed. Reports need to be reviewed before becoming published observations.
        </p>
        <Button component="a" href={href} variant="contained" startIcon={<Mail size={17} />}>
          Email an observation
        </Button>
        <p className="data-note">Opens your email app · contact@slotavailability.com</p>
      </article>
    </>
  );
}
