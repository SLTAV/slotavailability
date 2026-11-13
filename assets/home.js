(() => {
  const catalog=window.SA_CATALOG;
  const input=document.querySelector('#directory-query');
  const results=document.querySelector('#search-results');
  function search(){const term=input.value.trim().toLowerCase();results.replaceChildren();results.hidden=!term;if(!term)return;const matches=[...catalog.providers.map(p=>({...p,type:'provider'})),...catalog.countries.map(c=>({...c,type:'country'}))].filter(x=>x.name.toLowerCase().includes(term));if(!matches.length){results.textContent='No matches. Try another provider or country.';return;}for(const item of matches){const a=document.createElement('a');a.href=`/${item.type}/${item.slug}/`;a.textContent=`${item.name} →`;const label=document.createElement('small');label.textContent=item.type==='provider'?'Provider':'Country';a.append(label);results.append(a);}}
  input.addEventListener('input',search);document.querySelector('#directory-form').addEventListener('submit',e=>{e.preventDefault();search();results.querySelector('a')?.focus();});
  const recent=document.querySelector('#recent-results'),refresh=document.querySelector('#refresh-recent');
  const allowed=(value)=>typeof value==='string' && /^[a-z0-9-]+$/.test(value);
  async function loadRecent(){refresh.disabled=true;recent.textContent='Loading the latest checks…';try{
    const response=await fetch('https://hqqwkjietqcmewzsaugp.supabase.co/rest/v1/provider_availability?select=provider,provider_slug,country,country_slug,available,last_checked&last_checked=not.is.null&order=last_checked.desc&limit=5',{headers:{apikey:'sb_publishable_SIDGigPpsbkQgtbo0u2uOg_w3w1slmH'},signal:AbortSignal.timeout(12000)});
    if(!response.ok)throw Error('Unavailable');const rows=await response.json();if(!Array.isArray(rows))throw Error('Invalid response');recent.replaceChildren();if(!rows.length){recent.textContent='No dated checks have been published yet.';return;}
    for(const row of rows){if(!allowed(row.provider_slug)||!allowed(row.country_slug))continue;const a=document.createElement('a');a.className='recent-row';a.href=`/availability/?provider=${encodeURIComponent(row.provider_slug)}&country=${encodeURIComponent(row.country_slug)}`;
      const name=document.createElement('strong');name.textContent=row.provider;
      const country=document.createElement('span');country.textContent=row.country;
      const status=document.createElement('span');status.className='check-status '+(row.available===true?'yes':row.available===false?'no':'unknown');status.textContent=row.available===true?'Available':row.available===false?'Not available':'Unknown';
      const time=document.createElement('time');const date=new Date(row.last_checked);time.textContent=Number.isNaN(date.getTime())?'Date unavailable':date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});if(!Number.isNaN(date.getTime()))time.dateTime=date.toISOString();a.append(name,country,status,time);recent.append(a);}
    if(!recent.children.length)recent.textContent='No valid checks are available yet.';
  }catch{recent.textContent='Recent checks are temporarily unavailable. You can still explore providers and countries.';}finally{refresh.disabled=false;}}
  refresh.addEventListener('click',loadRecent);loadRecent();
})();
