(() => {
  const path = location.pathname;
  const icons = {Home:'⌂',Search:'⌕',Providers:'▦',Countries:'⚑','World Map':'◎','Recently Checked':'◷',About:'ⓘ','Help Us':'♡'};
  const links = [['Home','/'],['Search','/#search'],['Providers','/providers/'],['Countries','/countries/'],['World Map','/map/'],['Recently Checked','/#recently-checked'],['About','/about/'],['Help Us','/help-us/']];
  const active = href => href==='/' ? path==='/' : !href.includes('#') && (path.startsWith(href) || (href==='/providers/' && path.startsWith('/provider/')) || (href==='/countries/' && path.startsWith('/country/')));
  document.body.insertAdjacentHTML('afterbegin', `<a class="skip-link" href="#main-content">Skip to content</a><aside class="app-sidebar" id="app-sidebar"><a class="sidebar-brand" href="/" aria-label="SlotAvailability home"><span class="brand-mark">s<span>∕</span>a</span><span class="sidebar-label">The directory</span></a><nav aria-label="Main navigation">${links.map(([name,href],i)=>`${i===6?'<div class="nav-divider"></div>':''}<a href="${href}" title="${name}" class="side-link ${active(href)?'is-active':''}" ${active(href)?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${icons[name]}</span><span class="sidebar-label">${name}</span></a>`).join('')}</nav><div class="sidebar-bottom"><span class="sidebar-label">Independent. Transparent.<br><span class="quiet">A clearer view of availability.</span></span><a class="side-link" href="/casinos/" title="Tracked casinos"><span class="nav-icon" aria-hidden="true">▤</span><span class="sidebar-label">Tracked casinos</span></a></div></aside><button class="sidebar-backdrop" aria-label="Close navigation" hidden></button>`);
  const header = document.querySelector('body > header');
  header.className='app-topbar';
  header.innerHTML='<button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-controls="app-sidebar" aria-expanded="true">☰</button><a class="app-logo" href="/">Slot<span>Availability</span><span class="beta-label">BETA</span></a><div class="topbar-note"><span class="live-dot"></span> Independent availability database</div><a class="topbar-help" href="/help-us/">Contribute ↗</a>';
  const button = header.querySelector('.menu-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const mobile = matchMedia('(max-width: 700px)');
  let compact=false; try { compact=localStorage.getItem('sa-sidebar')==='compact'; } catch {}
  const sync=()=>{document.body.classList.toggle('sidebar-compact',!mobile.matches && compact); if(!mobile.matches)document.body.classList.remove('mobile-nav-open');const open=mobile.matches?document.body.classList.contains('mobile-nav-open'):!compact; button.setAttribute('aria-expanded',String(open));backdrop.hidden=!(mobile.matches && open);document.querySelector('.app-sidebar').inert=mobile.matches && !open;};
  button.addEventListener('click',()=>{if(mobile.matches)document.body.classList.toggle('mobile-nav-open');else {compact=!compact;try {localStorage.setItem('sa-sidebar',compact?'compact':'expanded');}catch{}}sync();});
  function close(){document.body.classList.remove('mobile-nav-open');sync();}
  backdrop.addEventListener('click',close);
  document.querySelectorAll('.side-link').forEach(a=>a.addEventListener('click',()=>{if(mobile.matches)close();}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus();} if(e.key==='Tab' && mobile.matches && document.body.classList.contains('mobile-nav-open')){const focusable=[button,...document.querySelectorAll('.app-sidebar a')]; const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  mobile.addEventListener('change',sync);sync();
})();
