import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Button, Drawer, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Globe2,
  HeartHandshake,
  Home,
  Layers3,
  Menu,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { providers, providerName, countryName } from '../data/catalog';

const navigation = [
  { to: '/', title: 'Home', icon: Home, end: true },
  { to: '/search', title: 'Search', icon: Search },
  { to: '/providers', title: 'Providers', icon: Layers3 },
  { to: '/countries', title: 'Countries', icon: Globe2 },
  { to: '/map', title: 'World Map', icon: Globe2 },
  { to: '/recent', title: 'Recently Checked', icon: Clock3 },
];
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" to="/" aria-label="SlotAvailability home">
      <img src="/favicon.svg" alt="" width="30" height="30" />
      {!compact && (
        <span>
          Slot<span>Availability</span>
        </span>
      )}
    </Link>
  );
}
export function Shell() {
  const mobile = useMediaQuery('(max-width: 760px)');
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(() => {
    try {
      return localStorage.getItem('sa-v2-sidebar') === 'compact';
    } catch {
      return false;
    }
  });
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    const parts = location.pathname.split('/').filter(Boolean);
    const page =
      parts[0] === 'provider'
        ? providerName(parts[1])
        : parts[0] === 'country'
          ? countryName(parts[1])
          : (
              {
                providers: 'Providers',
                countries: 'Countries',
                map: 'World Map',
                recent: 'Recently Checked',
                search: 'Search',
                availability: 'Check Availability',
                about: 'About',
                'help-us': 'Help Us',
              } as Record<string, string>
            )[parts[0]];
    document.title = page
      ? `${page} · SlotAvailability`
      : 'SlotAvailability — Find your connection';
  }, [location.pathname]);
  function toggle() {
    if (mobile) setOpen(true);
    else
      setCompact((value) => {
        try {
          localStorage.setItem('sa-v2-sidebar', value ? 'open' : 'compact');
        } catch {
          /* Preference storage is optional. */
        }
        return !value;
      });
  }
  const collapsed = compact && !mobile;
  const content = (
    <>
      <div className="sidebar-top">
        <span className="sidebar-caption">DISCOVER</span>
        {mobile ? (
          <IconButton aria-label="Close navigation" onClick={() => setOpen(false)}>
            <X size={18} />
          </IconButton>
        ) : (
          <Tooltip title={compact ? 'Expand sidebar' : 'Collapse sidebar'}>
            <IconButton
              aria-label={compact ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={toggle}
            >
              {compact ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
            </IconButton>
          </Tooltip>
        )}
      </div>
      <nav aria-label="Main navigation">
        {navigation.map(({ to, title, icon: Icon, end }) => (
          <Tooltip key={to} title={collapsed ? title : ''} placement="right">
            <NavLink
              to={to}
              end={end}
              aria-label={title}
              className={`nav-link ${(to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)) || (to === '/providers' && location.pathname.startsWith('/provider/')) || (to === '/countries' && location.pathname.startsWith('/country/')) ? 'active' : ''}`}
            >
              <Icon size={19} />
              <span>{title}</span>
              {title === 'Providers' && <small>{providers.length}</small>}
            </NavLink>
          </Tooltip>
        ))}
      </nav>
      <div className="sidebar-divider" />
      <nav aria-label="Information">
        <NavLink to="/about" className="nav-link" aria-label="About">
          <CircleHelp size={19} />
          <span>About</span>
        </NavLink>
        <NavLink to="/help-us" className="nav-link" aria-label="Help us">
          <HeartHandshake size={19} />
          <span>Help Us</span>
        </NavLink>
      </nav>
      <div className="sidebar-bottom">
        <ShieldCheck size={21} />
        <div>
          <strong>Independent by design.</strong>
          <p>Clarity without the noise.</p>
        </div>
      </div>
    </>
  );
  return (
    <div className={`app-shell ${collapsed ? 'is-compact' : ''}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-brand">
          <IconButton className="mobile-toggle" onClick={toggle} aria-label="Open navigation">
            <Menu size={22} />
          </IconButton>
          <Brand />
        </div>
        <div className="topbar-center">
          <span className="status-dot" /> Your independent availability directory
        </div>
        <Button
          component={Link}
          to="/help-us"
          variant="outlined"
          size="small"
          endIcon={<ArrowUpRight size={15} />}
        >
          Contribute
        </Button>
      </header>
      {mobile ? (
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{ paper: { className: 'sidebar mobile-sidebar', sx: { width: 250 } } }}
        >
          {content}
        </Drawer>
      ) : (
        <aside className="sidebar">{content}</aside>
      )}
      <main id="main" className="main-content" tabIndex={-1}>
        <Outlet />
        <footer className="footer">
          <div>
            <Brand />
            <p>A clearer picture of provider availability.</p>
          </div>
          <div className="footer-links">
            <Link to="/about">About the directory</Link>
            <Link to="/help-us">
              Help us improve <ArrowUpRight size={13} />
            </Link>
          </div>
          <p className="footer-note">
            Independent information, not a guarantee of access. Always confirm availability and
            local requirements. 18+
          </p>
          <span className="footer-copyright">© {new Date().getFullYear()} SlotAvailability</span>
        </footer>
      </main>
    </div>
  );
}
