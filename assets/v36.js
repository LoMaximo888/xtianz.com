(()=>{
  'use strict';
  const RELEASE='v36-2026-07-22';
  window.XTIANZ_RELEASE=RELEASE;

  // Verify that the HTML and release manifest came from the same deployment.
  const marker=document.querySelector('meta[name="xtianz-build"]')?.content;
  fetch('/release.json',{cache:'no-store'})
    .then(r=>r.ok?r.json():Promise.reject(new Error(`HTTP ${r.status}`)))
    .then(data=>{
      if(marker!==data.build){console.warn(`XTIANZ deployment mismatch: HTML=${marker||'missing'}, manifest=${data.build||'missing'}`);}
      else{console.info(`XTIANZ ${data.build} verified`);}
    })
    .catch(err=>console.warn('XTIANZ release verification unavailable',err));

  // Ensure the current route is reflected even on utility and article pages.
  const path=location.pathname.replace(/\/$/,'')||'/';
  const links=[...document.querySelectorAll('.site-nav a')];
  if(!links.some(a=>a.hasAttribute('aria-current'))){
    const sectionMap={
      '/articles/what-is-mcp-ai-agents.html':'/ai-mcp.html',
      '/articles/ai-agents-enterprise-operations.html':'/ai-mcp.html',
      '/articles/mcp-security-governance-checklist.html':'/ai-mcp.html',
      '/articles/mcp-specification-status.html':'/ai-mcp.html',
      '/articles/top-ai-search-questions.html':'/ai-mcp.html',
      '/articles/mangos-explained-ai-companies.html':'/mangos.html',
      '/articles/private-ai-companies-openai-anthropic-spacex.html':'/mangos.html',
      '/articles/nvidia-ai-infrastructure-boom.html':'/markets.html',
      '/articles/ai-stock-movers-watchlist.html':'/markets.html',
      '/articles/ai-data-centers-power-water.html':'/markets.html',
      '/articles/dmv-ai-infrastructure-corridor.html':'/dmv.html',
      '/articles/xtianz-weekly-signal-method.html':'/signals.html'
    };
    const target=sectionMap[path]||path;
    links.find(a=>new URL(a.href,location.origin).pathname===target)?.setAttribute('aria-current','page');
  }

  // Mobile-navigation quality: close on Escape, link selection, or outside click.
  const nav=document.querySelector('#site-nav');
  const toggle=document.querySelector('.nav-toggle');
  if(nav&&toggle){
    const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');};
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();toggle.focus();}});
    nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
    document.addEventListener('pointerdown',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))close();});
  }
})();
