(function () {
  'use strict';

  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  var navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    mobileNav.classList.add('open');
    navOverlay.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Menüyü kapat');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menüyü aç');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileNav && navOverlay) {
    menuToggle.addEventListener('click', function () {
      if (mobileNav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navOverlay.addEventListener('click', closeMenu);

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  var iconRetries = 0;
  function renderIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    } else if (iconRetries < 50) {
      iconRetries += 1;
      setTimeout(renderIcons, 100);
    }
  }
  renderIcons();
})();
