/* =========================================================
   expand-toggle.js — Reusable card expand / collapse

   Usage:
     initExpandCards('.my-card', { firstOpen: true })

   Card markup:
     <div role="button" tabindex="0" aria-expanded="false">
       ...header content...
       <div data-expand-detail>...body...</div>
     </div>

   Import:
     <script src="/expand-toggle.js" defer></script>
   ========================================================= */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setOpen(card, open) {
    var detail = card.querySelector('[data-expand-detail]');
    if (!detail) return;

    if (!detail._expandInit) {
      detail.style.overflow = 'hidden';
      detail.style.maxHeight = '0';
      if (!reducedMotion) {
        detail.style.transition = 'max-height 0.35s ease';
      }
      detail._expandInit = true;
    }

    card.setAttribute('aria-expanded', open ? 'true' : 'false');
    detail.style.maxHeight = open ? detail.scrollHeight + 'px' : '0';
  }

  function toggle(card) {
    setOpen(card, card.getAttribute('aria-expanded') !== 'true');
  }

  window.initExpandCards = function (selector, options) {
    options = options || {};
    var cards = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!cards.length) return;

    cards.forEach(function (card, i) {
      setOpen(card, !!(options.firstOpen && i === 0));

      card.addEventListener('click', function () {
        toggle(card);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle(card);
        }
      });
    });
  };
})();
