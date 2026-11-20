/* ==========================================================================
   QULABYZ LIMITED — site scripts
   ========================================================================== */

/* WhatsApp number in international format, digits only (no +, no spaces).
   TODO: replace with the client's confirmed WhatsApp number before launch. */
var WHATSAPP_NUMBER = '8613800000000';

/* Display form of the number, shown on the contact page. */
var WHATSAPP_DISPLAY = '+86 138 0000 0000';

(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  var items = document.querySelectorAll('.reveal');
  if (items.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- WhatsApp links ---------- */
  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink('Hello Angel, I found QULABYZ online and would like to ask about your tableware sets.');
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = WHATSAPP_DISPLAY;
  });

  /* ---------- Prefill from ?product= / #anchor links ---------- */
  var params = new URLSearchParams(window.location.search);
  var wanted = params.get('product');
  var productField = document.getElementById('product');
  if (wanted && productField) {
    for (var i = 0; i < productField.options.length; i++) {
      var optText = productField.options[i].text.replace(/&amp;/g, '&');
      if (optText.toLowerCase().indexOf(wanted.toLowerCase()) === 0 ||
          wanted.toLowerCase().indexOf(optText.toLowerCase().split(' ')[0]) === 0) {
        productField.selectedIndex = i;
        break;
      }
    }
  }

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      var name = get('name');
      var email = get('email');
      var message = get('message');

      if (!name || !email || !message) {
        alert('Please add your name, email and a short message so we can reply properly.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        alert('That email address does not look complete — please check it.');
        return;
      }

      var lines = [
        'New enquiry from the QULABYZ website',
        '',
        'Name: ' + name,
        'Company: ' + (get('company') || '-'),
        'Email: ' + email,
        'Country / market: ' + (get('country') || '-'),
        'Collection: ' + (get('product') || '-'),
        'Quantity: ' + (get('quantity') || '-'),
        '',
        'Message:',
        message
      ];

      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
