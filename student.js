(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu(); toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav?.contains(event.target) && !toggle?.contains(event.target)) closeMenu();
  });
  const links = [...document.querySelectorAll('#main-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const matching = links.find(link => link.hash === `#${entry.target.id}`);
        if (!matching) continue;
        links.forEach(link => link.removeAttribute('aria-current'));
        matching.setAttribute('aria-current', 'location');
      }
    }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
    links.forEach(link => {
      const section = document.getElementById(link.hash.slice(1));
      if (section) observer.observe(section);
    });
  }
  // Keep links from the earlier homepage pointing to the relevant section.
  const oldAnchors = {'#portfolio':'#projects', '#selected-work':'#projects', '#software':'#projects'};
  if (oldAnchors[location.hash]) location.replace(oldAnchors[location.hash]);
})();
