/* =========================================================
   reveal.js — Scroll Reveal via IntersectionObserver
   Usage:
     data-reveal            → 기본 reveal
     data-reveal-delay="1"  → 0.1s 지연 (그리드 두 번째 카드)
     data-reveal-delay="2"  → 0.2s 지연 (그리드 세 번째 카드)
   Import: <script src="/reveal.js" defer></script>
   ========================================================= */

(function () {
  'use strict';

  // prefers-reduced-motion 대응 (접근성)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = Array.prototype.slice.call(
    document.querySelectorAll('[data-reveal]')
  );
  if (!targets.length) return;

  // .js-reveal 클래스로 CSS reveal 모드 활성화
  document.documentElement.classList.add('js-reveal');

  // 현재 뷰포트 안에 있는지 확인
  function isVisible(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // 즉시 표시 (애니메이션·딜레이 없음)
  function revealNow(el) {
    el.style.transitionDuration = '0s';
    el.style.transitionDelay   = '0s';
    el.classList.add('revealed');
  }

  // IntersectionObserver — 뷰포트 진입 시 revealed 추가 (한 번만)
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(function (el) {
    if (isVisible(el)) {
      revealNow(el); // 첫 화면 요소: 즉시 보임
    } else {
      observer.observe(el);
    }
  });

  // 탭 전환 시 해당 탭의 모든 reveal 요소 즉시 표시
  // (metavv.js 의 activateTab 에서 호출)
  window.__revealTabContent = function (container) {
    if (!container) return;
    container.querySelectorAll('[data-reveal]:not(.revealed)').forEach(revealNow);
  };
})();
