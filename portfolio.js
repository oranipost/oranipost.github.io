(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => { toggle?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); };
  if (toggle && nav) {
    toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
    document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
  }
  const ring = document.querySelector('.top-progress circle');
  const total = 2 * Math.PI * 23;
  if (ring) { ring.style.strokeDasharray = total; let frame = 0; const update = () => { const range = document.documentElement.scrollHeight - innerHeight; const progress = range > 0 ? Math.max(0, Math.min(1, scrollY / range)) : 0; ring.style.strokeDashoffset = total * (1 - progress); frame = 0; }; const schedule = () => { if (!frame) frame = requestAnimationFrame(update); }; addEventListener('scroll', schedule, {passive: true}); addEventListener('resize', schedule); update(); }
  const copy = document.querySelector('#copy-link');
  if (copy) copy.addEventListener('click', async () => { const status = document.querySelector('#copy-status'); try { await navigator.clipboard.writeText('https://oranipost.github.io'); status.textContent = 'Portfolio link copied'; } catch { status.textContent = 'Copy the address from your browser'; } });
  const slides = [...document.querySelectorAll('[data-slide]')];
  const selectors = [...document.querySelectorAll('[data-show]')];
  if (slides.length) {
    let current = 0;
    const show = (next) => {
      current = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle('is-active', active);
        slide.classList.toggle('is-after', i === (current + 1) % slides.length);
        slide.classList.toggle('is-before', i === (current + slides.length - 1) % slides.length);
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
      });
      selectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
      const status = document.querySelector('#showcase-status');
      if (status) status.textContent = `${selectors[current].textContent}, highlight ${current + 1} of ${slides.length}`;
    };
    selectors.forEach(button => button.addEventListener('click', () => show(Number(button.dataset.show))));
    document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => show(current + Number(button.dataset.step))));
    document.querySelector('.showcase-select')?.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1);
      show(next); selectors[current].focus();
    });
  }
  // Content is visible by default; motion is a progressive enhancement.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold: .08});
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
})();
