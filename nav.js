/* =========================================================
   nav.js — 공유 네비게이션 컴포넌트
   모든 페이지에서 <script src="/nav.js"></script>로 로드.
   document.write()로 파서 인라인 주입 → 레이아웃 시프트 없음.
   현재 페이지 path 기준으로 Work 서브메뉴 링크 골드 강조.
   ========================================================= */

(function () {
  'use strict';

  var path = window.location.pathname;

  function active(href) {
    return path.startsWith(href) ? ' style="color: var(--gold);"' : '';
  }

  var html = [
    '<nav class="nav" id="nav">',
      '<div class="nav-inner">',
        '<a href="/" class="nav-logo">Gabby</a>',
        '<ul class="nav-links">',
          '<li><a href="/#about">About</a></li>',
          '<li><a href="/#experience">Experience</a></li>',
          '<li class="nav-dropdown">',
            '<button class="nav-dropdown-toggle" aria-expanded="false">',
              'Work <span class="nav-dropdown-arrow">▾</span>',
            '</button>',
            '<ul class="nav-dropdown-menu">',
              '<li><a href="/metavv/"' + active('/metavv/') + '>Metavv</a></li>',
              '<li><a href="/folio/"'   + active('/folio/')   + '>Folio</a></li>',
              '<li><a href="/banggooso/"' + active('/banggooso/') + '>Banggooso</a></li>',
              '<li><a href="/momscare/"' + active('/momscare/') + '>Momscare</a></li>',
            '</ul>',
          '</li>',
          '<li><a href="/#contact">Contact</a></li>',
        '</ul>',
        '<a href="/resume.pdf" class="nav-cta" target="_blank" rel="noopener">Resume</a>',
        '<button class="nav-hamburger" aria-label="메뉴 열기" id="hamburger">',
          '<span></span><span></span><span></span>',
        '</button>',
      '</div>',
      '<div class="nav-drawer" id="drawer">',
        '<a href="/#about">About</a>',
        '<a href="/#experience">Experience</a>',
        '<div class="drawer-work">',
          '<button class="drawer-work-toggle" aria-expanded="false">',
            'Work <span class="drawer-work-arrow">▾</span>',
          '</button>',
          '<div class="drawer-work-sub">',
            '<a href="/metavv/"'    + active('/metavv/')    + '>Metavv</a>',
            '<a href="/folio/"'     + active('/folio/')     + '>Folio</a>',
            '<a href="/banggooso/"' + active('/banggooso/') + '>Banggooso</a>',
            '<a href="/momscare/"'  + active('/momscare/')  + '>Momscare</a>',
          '</div>',
        '</div>',
        '<a href="/#contact">Contact</a>',
        '<a href="/resume.pdf" class="drawer-cta" target="_blank" rel="noopener">Resume</a>',
      '</div>',
    '</nav>',
  ].join('');

  document.write(html);
})();
