/* =========================================================
   nav.js — 공유 글로벌 네비게이션 컴포넌트
   모든 페이지에서 <script src="/nav.js"></script>로 로드.
   document.write()로 파서 인라인 주입 → 레이아웃 시프트 없음.
   상위 위계: About / Work / Contact 3축.
   ========================================================= */

(function () {
  'use strict';

  var path = window.location.pathname;

  function active(href) {
    return path.indexOf(href) === 0 ? ' style="color: var(--gold);"' : '';
  }

  // 모든 페이지가 라이트/다크 토큰을 지원 → 토글 전역 노출.
  var themeToggle =
    '<button class="theme-toggle" id="themeToggle" type="button" aria-label="라이트 모드로 전환" title="테마 전환"></button>';

  var html = [
    '<nav class="nav" id="nav">',
      '<div class="nav-inner">',
        '<a href="/" class="nav-logo">Gabriela&#39;s Portfolio</a>',
        '<ul class="nav-links">',
          '<li><a href="/about/"' + active('/about/') + '>About</a></li>',
          '<li><a href="/work/"'  + active('/work/')  + '>Work</a></li>',
          '<li><a href="/#contact">Contact</a></li>',
        '</ul>',
        themeToggle,
        '<a href="/assets/resume.pdf" class="nav-cta" target="_blank" rel="noopener">Resume</a>',
        '<button class="nav-hamburger" aria-label="메뉴 열기" id="hamburger">',
          '<span></span><span></span><span></span>',
        '</button>',
      '</div>',
      '<div class="nav-drawer" id="drawer">',
        '<a href="/about/"' + active('/about/') + '>About</a>',
        '<a href="/work/"'  + active('/work/')  + '>Work</a>',
        '<a href="/#contact">Contact</a>',
        '<a href="/assets/resume.pdf" class="drawer-cta" target="_blank" rel="noopener">Resume</a>',
      '</div>',
    '</nav>',
  ].join('');

  document.write(html);
})();
