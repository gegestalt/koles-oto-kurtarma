(function () {
  'use strict';

  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  function openMenu() {
    mobileNav.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Menüyü kapat');
  }

  function closeMenu() {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menüyü aç');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      if (mobileNav.hidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileNav.hidden) {
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
