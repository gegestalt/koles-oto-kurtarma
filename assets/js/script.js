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

  // Dönüşüm takibi: her arama (tel:) ve WhatsApp tıklamasını Vercel
  // Analytics'e özel olay olarak gönderir. Böylece SEO'nun gerçekten
  // telefon araması getirip getirmediği ölçülebilir.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="tel:"], a[href*="wa.me"], a[href*="api.whatsapp"]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var isCall = href.indexOf('tel:') === 0;
    var loc = a.getAttribute('data-loc') || 'inline';
    try {
      if (window.va) {
        window.va('event', {
          name: isCall ? 'call_click' : 'whatsapp_click',
          data: { location: loc, page: location.pathname }
        });
      }
    } catch (err) { /* takip başarısız olsa da bağlantı normal çalışır */ }
  });
})();
