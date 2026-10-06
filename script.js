(function () {
  var root = document.documentElement;

  // Theme toggle
  var themeBtn = document.querySelector('.theme-toggle');
  themeBtn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  var now = new Date();
  document.getElementById('year').textContent = now.getFullYear();

  // Stamp the hero receipt with the visitor's date and time
  function pad(n) { return String(n).padStart(2, '0'); }
  document.getElementById('r-date').textContent =
    pad(now.getDate()) + '.' + pad(now.getMonth() + 1) + '.' + now.getFullYear() + ' ' +
    pad(now.getHours()) + ':' + pad(now.getMinutes());

  if (!('IntersectionObserver' in window)) return;

  // Reveal on scroll
  var revealTargets = document.querySelectorAll(
    '.section-title, .principles li, .stages li, .job, .project, .more-list li, .skill-group, .contact-lede, .contact-links'
  );
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Highlight the current section in the nav
  var links = {};
  navLinks.querySelectorAll('a').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle('active', id === entry.target.id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) {
    if (links[s.id]) sectionObserver.observe(s);
  });
})();
