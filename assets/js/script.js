(function () {
  'use strict';

  var menuToggle = document.getElementById('menuToggle');
  var navDrawer = document.getElementById('navDrawer');
  var navOverlay = document.getElementById('navOverlay');
  var yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function openDrawer() {
    navDrawer.classList.add('open');
    navOverlay.classList.add('open');
    navDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var firstLink = navDrawer.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    navOverlay.classList.remove('open');
    navDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && navDrawer && navOverlay) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
        menuToggle.focus();
      } else {
        openDrawer();
      }
    });

    navOverlay.addEventListener('click', closeDrawer);

    navDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
        closeDrawer();
        menuToggle.focus();
      }
    });
  }
})();
