// ==================== BGYK CASE STUDY · JS ====================

(function () {
  'use strict';

  // 메트릭 카드 토글
  document.querySelectorAll('.impact-metric-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // 바 애니메이션 (IntersectionObserver)
  var bars = document.querySelectorAll('.prob-bar-fill');
  if (bars.length && 'IntersectionObserver' in window) {
    bars.forEach(function (bar) {
      bar.dataset.targetWidth = bar.style.width;
      bar.style.width = '0%';
    });
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          requestAnimationFrame(function () { bar.style.width = bar.dataset.targetWidth; });
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(function (bar) { barObserver.observe(bar); });
  }
})();
