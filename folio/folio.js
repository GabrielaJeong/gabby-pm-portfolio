// ==================== FOLIO CASE STUDY · JS ====================
// KEY DECISIONS: data-group 없는 exec-phase-card (모두 닫힌 상태로 시작)
// ENGINEERING RIGOR: data-group="engineering" exec-phase-card (모두 닫힌 상태로 시작)

(function () {
  'use strict';

  if (window.initExpandCards) {
    // KEY DECISIONS 카드 그룹
    initExpandCards('.exec-phase-card:not([data-group])', { firstOpen: false });
    // ENGINEERING RIGOR 카드 그룹
    initExpandCards('.exec-phase-card[data-group="engineering"]', { firstOpen: false });
  }
})();
