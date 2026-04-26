// ==================== FOLIO CASE STUDY · JS ====================
// KEY DECISIONS: expand-toggle.js의 initExpandCards 재사용
// IMPACT 카드: div (항상 펼쳐진 상태, 토글 없음)

(function () {
  'use strict';

  if (window.initExpandCards) {
    initExpandCards('.exec-phase-card', { firstOpen: true });
  }
})();
