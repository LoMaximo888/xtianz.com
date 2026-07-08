const navToggle=document.querySelector('.nav-toggle');const nav=document.querySelector('#site-nav');if(navToggle&&nav){navToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',open?'true':'false')});}
const reveals=document.querySelectorAll('.reveal');const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}})},{threshold:.12});reveals.forEach(el=>obs.observe(el));

const currentDateTargets=document.querySelectorAll('[data-current-date]');if(currentDateTargets.length){const d=new Date();const f=new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric'}).format(d);currentDateTargets.forEach(el=>{el.textContent=f;});}
