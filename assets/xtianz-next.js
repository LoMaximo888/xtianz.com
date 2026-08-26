(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const overlay = document.querySelector('[data-overlay]');
  const openers = document.querySelectorAll('[data-search-open],[data-menu-open]');
  const close = document.querySelector('[data-overlay-close]');
  const setOverlay = (open) => {
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  openers.forEach(b => b.addEventListener('click', () => setOverlay(true)));
  close?.addEventListener('click', () => setOverlay(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOverlay(false); });

  const canvas = document.getElementById('networkCanvas');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let w=0,h=0,dpr=1,points=[];
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w*dpr; canvas.height = h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = Math.max(28, Math.min(72, Math.floor(w/22)));
    points = Array.from({length:count}, () => ({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.3+.4}));
  };
  const draw = () => {
    ctx.clearRect(0,0,w,h);
    for (const p of points){ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1; }
    for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++){
      const a=points[i],b=points[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
      if(d<135){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(94,230,255,${(1-d/135)*.13})`;ctx.stroke();}
    }
    points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(185,255,74,.45)';ctx.fill();});
    requestAnimationFrame(draw);
  };
  resize(); draw(); window.addEventListener('resize', resize);
})();
