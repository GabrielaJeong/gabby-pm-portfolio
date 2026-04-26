// ==================== MOMSCARE CASE STUDY · JS ====================

(function () {
  'use strict';

  // 메트릭 카드 토글
  document.querySelectorAll('.impact-metric-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
})();
