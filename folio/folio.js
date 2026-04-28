// ==================== FOLIO CASE STUDY · JS ====================
// ENGINEERING RIGOR: data-group="engineering" exec-phase-card (펼침/접힘 카드)
// KEY DECISIONS는 .decision-card 직렬 구조로 변경되어 토글 인터랙션 없음

(function () {
  'use strict';

  if (window.initExpandCards) {
    initExpandCards('.exec-phase-card[data-group="engineering"]', { firstOpen: false });
  }
})();
