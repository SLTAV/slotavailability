import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Mail, ShieldCheck, Eye, HeartHandshake } from 'lucide-react';
import countryPhotos from '../data/country-photos.json';
import { countryName } from '../data/catalog';
export function About() {
  return (
    <>
      <section className="about-hero about-intro">
        <span className="eyebrow">INDEPENDENT INFORMATION. SHARED DISCOVERIES.</span>
        <h1>
          Shared knowledge.
          <br />A clearer picture.
        </h1>
        <p>
          Explore provider availability by country, with dated observations and the context behind
          each check. Built around shared knowledge, our independent database helps everyone find
          useful information and contribute what they discover.
        </p>
      </section>
      <div className="information-grid about-values">
        {[
          {
            icon: HeartHandshake,
            title: 'Your discoveries matter.',
            text: 'Found a change or a missing detail? Share what you observed, where and when. Each contribution helps others find clearer information and helps the database grow.',
          },
          {
            icon: Eye,
            title: 'Clear about what we know.',
            text: 'Each status comes from recorded observations, with dates and context where available. Missing or conflicting information is marked Unknown, so you can judge the information for yourself.',
          },
          {
            icon: ShieldCheck,
            title: 'Information comes first.',
            text: 'Our purpose is to make provider availability easier to understand. Explore the database freely and form your own view. Provider names and illustrations identify the subject; they do not imply a partnership or endorsement.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <article className="info-card about-value-card" key={title}>
            <Icon size={26} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <article className="prose-card about-stewardship">
        <div className="about-stewardship-intro">
          <span className="eyebrow">READ THE DATA. KEEP THE CONTEXT.</span>
          <h2>
            A useful starting point.
            <br />A picture that keeps evolving.
          </h2>
          <p>
            Availability can change. Our database brings observations together so you can explore
            what has been recorded, when it was checked and where more information is needed.
          </p>
        </div>
        <div className="about-reading-guide">
          <div>
            <span className="about-guide-number">01</span>
            <div>
              <h3>Start with a provider or country</h3>
              <p>
                Explore the recorded statuses and open the observations behind them. Available, Not
                available and Unknown describe the information we have for that selection.
              </p>
            </div>
          </div>
          <div>
            <span className="about-guide-number">02</span>
            <div>
              <h3>Look at the date and context</h3>
              <p>
                A check describes an observation at a particular time. Availability may differ
                between services. A missing date or detail stays visible, and incomplete or
                conflicting information remains Unknown.
              </p>
            </div>
          </div>
          <div>
            <span className="about-guide-number">03</span>
            <div>
              <h3>Help keep the picture up to date</h3>
              <p>
                Found a change or an error? Share the provider, country, date and what you observed.
                Clear context helps us review contributions and improve the database.
              </p>
            </div>
          </div>
        </div>
        <p className="about-context-note">
          An observation is a reference point, not a guarantee of current access. Always confirm
          availability and local requirements with the relevant service.
        </p>
      </article>
      <section className="about-contribute">
        <HeartHandshake size={32} />
        <div>
          <h2>Your observations can help others.</h2>
          <p>
            Found a change or something we missed? Share the provider, country, service, date and
            what you observed.
          </p>
        </div>
        <Button component={Link} to="/help-us" variant="outlined">
          Share an observation
        </Button>
      </section>
      <details className="photo-credits">
        <summary>Country photo credits</summary>
        <ul>
          {countryPhotos.map((photo) => (
            <li key={photo.slug}>
              <a href={photo.page} target="_blank" rel="noreferrer">
                {countryName(photo.slug)} — {photo.location} — {photo.photographer} /{' '}
                {'source' in photo ? photo.source : 'Unsplash'}
              </a>
              {'license' in photo && (
                <>
                  <br />
                  <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                    {photo.license}
                  </a>{' '}
                  · {photo.changes}
                </>
              )}
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
export function Help() {
  const href =
    'mailto:contact@slotavailability.com?subject=Availability%20observation&body=Provider%3A%20%0ACountry%3A%20%0AService%3A%20%0ADate%20checked%3A%20%0AWhat%20changed%3A%20%0ASource%3A%20';
  return (
    <>
      <section className="about-hero help-hero">
        <span className="eyebrow">ONE OBSERVATION. A SHARED DISCOVERY.</span>
        <h1>
          Share what you find.
          <br />
          Help others explore.
        </h1>
        <p>
          A change in availability, a missing country or a detail that needs correcting — your
          observations can help. Share what you found and help make the database more useful for
          everyone.
        </p>
        <Button component="a" href={href} variant="outlined" startIcon={<Mail size={17} />}>
          Share an observation
        </Button>
        <p className="help-email-note">Opens your email app · contact@slotavailability.com</p>
      </section>
      <div className="information-grid about-values help-steps">
        {[
          {
            icon: Eye,
            title: 'Start with what you saw.',
            text: 'Tell us which provider and country you explored, and what you noticed. A change in availability, a missing detail or an error is a useful place to start. One clear observation is enough.',
          },
          {
            icon: ShieldCheck,
            title: 'Add the useful details.',
            text: 'Include the date and the service you checked. A source link or a screenshot can help explain what happened. Keep the relevant context and leave out personal or account information.',
          },
          {
            icon: Mail,
            title: 'Send it our way.',
            text: 'Use the email button to share your observation or correction. Contributions are reviewed before publication, and useful details help us understand what changed. Every contribution adds to the shared picture.',
          },
        ].map(({ icon: Icon, title, text }, index) => (
          <article className="info-card help-value-card" key={title}>
            <div className="help-step-heading">
              <Icon size={26} />
              <span>0{index + 1}</span>
            </div>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <section className="about-contribute">
        <HeartHandshake size={32} />
        <div>
          <h2>Small details can make a difference.</h2>
          <p>
            You don’t need to investigate everything. One clear observation, a missing country or a
            correction is a useful place to start.
          </p>
        </div>
        <Button component="a" href={href} variant="outlined" startIcon={<Mail size={17} />}>
          Get in touch
        </Button>
      </section>
    </>
  );
}
