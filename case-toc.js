/* =========================================================
   case-toc.js — 케이스 페이지 상단 고정 섹션 목차바
   사용: <nav class="case-toc" data-nav-config='[{"id","label"}]'></nav>
        (글로벌 nav 바로 다음, 페이지 상단에 배치)

   두 가지 모드:
   - 기본(스크롤): 클릭 시 해당 섹션으로 smooth scroll + scroll-spy 강조
   - pages 모드(data-toc-mode="pages"): "책 페이지"처럼 한 번에 한 페이지만 표시.
     각 콘텐츠 블록에 data-page="<섹션 id>"를 달아두면 그 페이지만 보이고 나머지는 숨김.
     상단 목차바 + 하단 prev/next 넘김 버튼으로 이동.
   ========================================================= */

(function () {
  'use strict';

  var toc = document.querySelector('.case-toc[data-nav-config]');
  if (!toc) return;

  var config;
  try {
    config = JSON.parse(toc.getAttribute('data-nav-config'));
  } catch (e) {
    console.error('[case-toc] invalid JSON config:', e);
    return;
  }

  var globalNav = document.querySelector('.nav');
  var pagesMode = toc.getAttribute('data-toc-mode') === 'pages';

  /* ─ 목차 링크 생성 (실제 존재하는 섹션만) ─ */
  var list = document.createElement('ul');
  list.className = 'case-toc-list';

  var targets = [];
  config.forEach(function (item) {
    var el = document.getElementById(item.id);
    if (!el) return;
    var li = document.createElement('li');
    li.className = 'case-toc-item';
    var a = document.createElement('a');
    a.className = 'case-toc-link';
    a.href = '#' + item.id;
    a.textContent = item.label;
    li.appendChild(a);
    list.appendChild(li);
    targets.push({ id: item.id, label: item.label, link: a, el: el });
  });

  if (!targets.length) return;

  // 목차바 = [← 모든 프로젝트 보기 (좌)] ............ [섹션 메뉴 (우)]
  var inner = document.createElement('div');
  inner.className = 'case-toc-inner';
  var back = document.createElement('a');
  back.className = 'case-toc-back';
  back.href = '/work/';
  back.textContent = '← 모든 프로젝트 보기';
  inner.appendChild(back);
  inner.appendChild(list);
  toc.innerHTML = '';
  toc.appendChild(inner);

  function navHeight() {
    return globalNav ? globalNav.getBoundingClientRect().height : 0;
  }
  function syncTop() {
    var h = navHeight();
    toc.style.top = h + 'px';
    // 측정한 실제 nav 높이를 --nav-h 토큰에 반영 → 본문 세로 중앙정렬 계산이
    // 근사값이 아닌 정확값으로(반응형). nav는 건드리지 않는다.
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
  syncTop();
  window.addEventListener('resize', syncTop, { passive: true });

  function scrollOffset() {
    return navHeight() + toc.getBoundingClientRect().height + 8;
  }

  if (pagesMode) setupPages();
  else setupScroll();

  /* ════════ PAGES 모드 ════════ */
  function setupPages() {
    var caseMain = document.querySelector('.case-main') || document.body;
    var blocks = Array.prototype.slice.call(caseMain.querySelectorAll('[data-page]'));
    var validKeys = targets.map(function (t) { return t.id; });

    /* 하단 prev/next 넘김 바 */
    var flip = document.createElement('div');
    flip.className = 'case-flip';
    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'case-flip-btn case-flip-prev';
    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'case-flip-btn case-flip-next';
    flip.appendChild(prev);
    flip.appendChild(next);
    caseMain.appendChild(flip);

    function indexOfKey(key) {
      for (var i = 0; i < targets.length; i++) if (targets[i].id === key) return i;
      return 0;
    }

    function show(key) {
      var leadAssigned = false;
      var lastMatch = null;
      blocks.forEach(function (b) {
        var match = b.getAttribute('data-page') === key;
        b.style.display = match ? '' : 'none';
        // 이 페이지의 첫 보이는 블록만 lead로 표시 → 선행 구분선/여백 제거 (CSS)
        if (match && !leadAssigned) {
          b.classList.add('toc-page-lead');
          leadAssigned = true;
        } else {
          b.classList.remove('toc-page-lead');
        }
        b.classList.remove('toc-page-tail');
        if (match) lastMatch = b;
      });
      // 마지막 보이는 블록 → tail로 표시 (후행 구분선/잉여 여백 제거)
      if (lastMatch) lastMatch.classList.add('toc-page-tail');
      // 첫 페이지(히어로)만 뷰포트 세로 중앙정렬, 나머지 본문 페이지는 상단 정렬
      caseMain.classList.toggle('is-hero-page', key === targets[0].id);
      targets.forEach(function (t) {
        t.link.classList.toggle('is-active', t.id === key);
      });
      // 보이게 된 블록의 reveal 요소 즉시 표시 (스크롤 애니메이션 없이)
      if (window.__revealTabContent) {
        blocks.forEach(function (b) {
          if (b.getAttribute('data-page') === key) window.__revealTabContent(b);
        });
      }
      // prev/next 라벨 갱신
      var i = indexOfKey(key);
      var p = targets[i - 1], n = targets[i + 1];
      if (p) { prev.style.display = ''; prev.textContent = '← ' + p.label; prev.dataset.target = p.id; }
      else prev.style.display = 'none';
      if (n) { next.style.display = ''; next.textContent = n.label + ' →'; next.dataset.target = n.id; }
      else next.style.display = 'none';
    }

    function go(key) {
      if (validKeys.indexOf(key) === -1) key = targets[0].id;
      show(key);
      history.replaceState(null, '', '#' + key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    list.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      e.preventDefault();
      go(link.getAttribute('href').slice(1));
    });
    prev.addEventListener('click', function () { if (prev.dataset.target) go(prev.dataset.target); });
    next.addEventListener('click', function () { if (next.dataset.target) go(next.dataset.target); });

    window.addEventListener('popstate', function () {
      var h = window.location.hash.replace('#', '');
      show(validKeys.indexOf(h) !== -1 ? h : targets[0].id);
    });

    /* 초기: 해시 우선, 없으면 첫 페이지 (스크롤 이동 없음) */
    var hash = window.location.hash.replace('#', '');
    show(validKeys.indexOf(hash) !== -1 ? hash : targets[0].id);
  }

  /* ════════ 스크롤 모드 (기본) ════════ */
  function setupScroll() {
    list.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - scrollOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    });

    if (!('IntersectionObserver' in window)) return;

    var visible = new Set();
    function updateActive() {
      var atBottom =
        window.scrollY + window.innerHeight + 80 >= document.documentElement.scrollHeight;
      var activeId = null;
      if (atBottom) {
        activeId = targets[targets.length - 1].id;
      } else if (visible.size) {
        var topMostY = Infinity;
        targets.forEach(function (t) {
          if (visible.has(t.id)) {
            var y = t.el.getBoundingClientRect().top;
            if (y < topMostY) { topMostY = y; activeId = t.id; }
          }
        });
      }
      targets.forEach(function (t) {
        t.link.classList.toggle('is-active', t.id === activeId);
      });
    }

    var topMargin = Math.round(navHeight() + toc.getBoundingClientRect().height);
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) visible.add(en.target.id);
          else visible.delete(en.target.id);
        });
        updateActive();
      },
      { rootMargin: '-' + topMargin + 'px 0px -55% 0px', threshold: 0 }
    );
    targets.forEach(function (t) { observer.observe(t.el); });

    var raf = null;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = null; updateActive(); });
    }, { passive: true });
  }
})();
