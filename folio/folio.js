// ==================== FOLIO CASE STUDY · JS ====================

(function () {
  'use strict';

  // 메트릭 카드 토글
  document.querySelectorAll('.impact-metric-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // KEY DECISIONS 펼침/접힘
  document.querySelectorAll('.key-decision-card').forEach(function (card) {
    var btn = card.querySelector('.key-decision-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
})();
