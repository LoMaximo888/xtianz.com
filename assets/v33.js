(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lightweight neural-constellation background. It is decorative, pointer-safe,
  // pauses when the tab is hidden, and disables itself for reduced motion.
  if (!reduced && !document.querySelector('.ai-network-bg')) {
    const canvas = document.createElement('canvas');
    canvas.className = 'ai-network-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0, height = 0, dpr = 1, frame = 0, running = true;
    let pointer = { x: -9999, y: -9999 };
    let nodes = [];

    const makeNode = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .17,
      vy: (Math.random() - .5) * .17,
      r: Math.random() * 1.15 + .45,
      hue: Math.random() > .74 ? '180,140,255' : '101,240,255',
      phase: Math.random() * Math.PI * 2
    });

    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      dpr = Math.min(devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(64, Math.round(width * height / 26000)));
      nodes = Array.from({ length: count }, makeNode);
    };

    const draw = () => {
      if (!running) return;
      frame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      const maxLink = width < 720 ? 112 : 150;
      const maxLink2 = maxLink * maxLink;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dxp = n.x - pointer.x, dyp = n.y - pointer.y;
        const pd2 = dxp * dxp + dyp * dyp;
        if (pd2 < 16000 && pd2 > 1) {
          const force = (1 - pd2 / 16000) * .035;
          n.vx += dxp * force / Math.sqrt(pd2);
          n.vy += dyp * force / Math.sqrt(pd2);
        }
        n.vx *= .995; n.vy *= .995;
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j], dx = n.x - m.x, dy = n.y - m.y, d2 = dx * dx + dy * dy;
          if (d2 < maxLink2) {
            const alpha = (1 - d2 / maxLink2) * .115;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(117,178,255,${alpha})`;
            ctx.lineWidth = .55;
            ctx.stroke();
          }
        }
        const pulse = .72 + Math.sin(performance.now() * .0012 + n.phase) * .25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.hue},${.22 + pulse * .14})`;
        ctx.fill();
      }
    };

    resize();
    addEventListener('resize', resize, { passive: true });
    addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
    addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { running = false; cancelAnimationFrame(frame); }
      else if (!running) { running = true; draw(); }
    });
    draw();
  }

  // Subtle parallax for the hero system core on precise-pointer devices.
  const core = document.querySelector('[data-system-core]');
  if (core && !reduced && matchMedia('(pointer:fine)').matches) {
    core.addEventListener('pointermove', e => {
      const r = core.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      core.style.setProperty('--ry', `${x * 5.5}deg`);
      core.style.setProperty('--rx', `${y * -5.5}deg`);
    });
    core.addEventListener('pointerleave', () => {
      core.style.setProperty('--ry', '0deg');
      core.style.setProperty('--rx', '0deg');
    });
  }

  // Add a faint pointer spotlight to interactive editorial cards.
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.signal-quad article,.bento-card,.dmv-source-card,.lab-preview-grid article,.three-way article,.source-card,.magazine-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
      });
      card.classList.add('v33-spotlight');
    });
  }
})();
