/* Keep links from earlier versions of the portfolio useful. */
(() => {
  'use strict';

  const sections = Object.freeze({
    'software.html': 'projects',
    'research.html': 'research',
    'honors-economics-beef-exports.html': 'gcic',
    'honors-history-hessians.html': 'history',
    'honors-theatre-music.html': 'theatre',
    'experience.html': 'experience',
    'speaking.html': 'experience',
    'campus.html': 'experience',
    'mascot.html': 'experience',
    'recognition.html': 'recognition',
    'skills.html': 'interests',
    'about.html': 'about'
  });
  const aliases = Object.freeze({
    top: 'top',
    main: 'main',
    software: 'projects',
    projects: 'projects',
    'selected-work': 'projects',
    portfolio: 'projects',
    research: 'research',
    gcic: 'gcic',
    history: 'history',
    theatre: 'theatre',
    experience: 'experience',
    videos: 'experience',
    recognition: 'recognition',
    baftx: 'recognition',
    skills: 'interests',
    credentials: 'interests',
    about: 'about',
    interests: 'interests',
    contact: 'contact'
  });

  const filename = location.pathname.split('/').pop().toLowerCase();
  if (!Object.hasOwn(sections, filename)) return;

  const fragment = location.hash.slice(1).toLowerCase();
  const target = Object.hasOwn(aliases, fragment)
    ? aliases[fragment]
    : sections[filename];
  const destination = new URL('index.html', location.href);
  destination.hash = target;
  location.replace(destination.href);
})();
