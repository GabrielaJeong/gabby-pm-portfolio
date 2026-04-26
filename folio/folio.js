// ==================== FOLIO CASE STUDY · JS ====================
// KEY DECISIONS: data-group 없는 exec-phase-card (첫 번째만 열림)
// ENGINEERING RIGOR: data-group="engineering" exec-phase-card (첫 번째만 열림)

(function () {
  'use strict';

  if (window.initExpandCards) {
    // KEY DECISIONS 카드 그룹
    initExpandCards('.exec-phase-card:not([data-group])', { firstOpen: true });
    // ENGINEERING RIGOR 카드 그룹
    initExpandCards('.exec-phase-card[data-group="engineering"]', { firstOpen: false });
  }
})();
