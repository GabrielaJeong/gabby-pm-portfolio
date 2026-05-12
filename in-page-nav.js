/* ============================================================
   in-page-nav.js — 재사용 가능한 floating side nav

   사용법: HTML에 다음 형태로 작성하면 JS가 li 동적 생성.

   <aside class="in-page-nav" data-nav-config='[
     {"id": "about",       "label": "About"},
     {"id": "experience",  "label": "Experience"},
     {"id": "work",        "label": "Work", "children": [
       {"id": "proj-metavv",     "label": "메타브"},
       {"id": "proj-folio",      "label": "Folio"},
       {"id": "proj-banggooso",  "label": "방구석연구소"},
       {"id": "proj-momscare",   "label": "맘스케어"}
     ]},
     {"id": "contact",     "label": "Contact"}
   ]'></aside>

   기능: li 자동 생성 + smooth scroll + scroll-spy
   ============================================================ */

(function () {
  'use strict';

  function initInPageNav(root) {
    var configRaw = root.getAttribute('data-nav-config');
    if (!configRaw) return;

    var config;
    try {
      config = JSON.parse(configRaw);
      console.log('[in-page-nav] parsed config:', config);
    } catch (e) {
      console.error('[in-page-nav] invalid JSON config:', e, '\nraw:', configRaw);
      return;
    }

    /* ─ ul/li 동적 생성 ─ */
    var list = document.createElement('ul');
    list.className = 'in-page-nav-list';

    var allTargets = [];   // scroll-spy 추적 대상: {id, el, itemEl, isSub}

    config.forEach(function (entry) {
      var li = createNavItem(entry, allTargets, false);
      if (li) list.appendChild(li);
    });

    root.innerHTML = '';
    root.appendChild(list);

    /* ─ smooth scroll ─ */
    list.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      var offset = getScrollOffset();
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.replaceState(null, '', hash);
    });

    /* ─ 라인 endpoint 측정 (첫·마지막 점 실제 중앙 위치) ─ */
    function syncLineEndpoints() {
      var listRect = list.getBoundingClientRect();
      var firstDot = allTargets[0] && allTargets[0].itemEl.querySelector('.in-page-nav-dot, .in-page-nav-subdot');
      var lastDot = allTargets[allTargets.length - 1] && allTargets[allTargets.length - 1].itemEl.querySelector('.in-page-nav-dot, .in-page-nav-subdot');
      if (!firstDot || !lastDot) return;
      var firstRect = firstDot.getBoundingClientRect();
      var lastRect = lastDot.getBoundingClientRect();
      var topOffset = (firstRect.top + firstRect.height / 2) - listRect.top;
      var bottomOffset = listRect.bottom - (lastRect.top + lastRect.height / 2);
      list.style.setProperty('--nav-line-top', topOffset + 'px');
      list.style.setProperty('--nav-line-bottom', bottomOffset + 'px');
    }
    syncLineEndpoints();
    window.addEventListener('resize', syncLineEndpoints, { passive: true });

    /* ─ scroll-spy ─ IntersectionObserver로 현재 섹션 추적 */
    if (!('IntersectionObserver' in window) || allTargets.length === 0) return;

    var visibleIds = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleIds.add(entry.target.id);
        else visibleIds.delete(entry.target.id);
      });
      updateActiveState(allTargets, visibleIds);
    }, {
      rootMargin: '-30% 0px -50% 0px',  // viewport 중간 30~50% 위치에 들어온 섹션을 활성
      threshold: 0
    });

    allTargets.forEach(function (t) {
      if (t.el) observer.observe(t.el);
    });
  }

  function createNavItem(entry, allTargets, isSub) {
    var target = document.getElementById(entry.id);
    if (!target) {
      console.warn('[in-page-nav] section not found: #' + entry.id);
      return null;
    }

    var li = document.createElement('li');
    li.className = isSub ? 'in-page-nav-subitem' : 'in-page-nav-item';

    var a = document.createElement('a');
    a.className = isSub ? 'in-page-nav-sublink' : 'in-page-nav-link';
    a.href = '#' + entry.id;

    var dot = document.createElement('span');
    dot.className = isSub ? 'in-page-nav-subdot' : 'in-page-nav-dot';
    dot.setAttribute('aria-hidden', 'true');

    var label = document.createElement('span');
    label.className = isSub ? 'in-page-nav-sublabel' : 'in-page-nav-label';
    label.textContent = entry.label;

    a.appendChild(dot);
    a.appendChild(label);
    li.appendChild(a);

    allTargets.push({ id: entry.id, el: target, itemEl: li, isSub: isSub });

    if (entry.children && entry.children.length) {
      var sub = document.createElement('ul');
      sub.className = 'in-page-nav-sub';
      entry.children.forEach(function (child) {
        var subLi = createNavItem(child, allTargets, true);
        if (subLi) sub.appendChild(subLi);
      });
      li.appendChild(sub);
    }

    return li;
  }

  function updateActiveState(allTargets, visibleIds) {
    if (visibleIds.size === 0) {
      // 아무 것도 안 보이면 모두 비활성/미통과
      allTargets.forEach(function (t) {
        t.itemEl.classList.remove('is-active', 'is-passed');
      });
      updateProgressLine(allTargets, null);
      return;
    }
    // 페이지 안에서 가장 먼저 나타나는(=가장 위에 있는) visible 섹션을 활성으로
    var topMost = null;
    var topMostY = Infinity;
    var topMostIdx = -1;
    allTargets.forEach(function (t, i) {
      if (visibleIds.has(t.id)) {
        var y = t.el.getBoundingClientRect().top;
        if (y < topMostY) {
          topMostY = y;
          topMost = t;
          topMostIdx = i;
        }
      }
    });

    // 활성 = 골드 + ring / 활성 이전 항목 = is-passed(골드) / 이후 = 비활성
    allTargets.forEach(function (t, i) {
      if (t === topMost) {
        t.itemEl.classList.add('is-active');
        t.itemEl.classList.remove('is-passed');
      } else if (i < topMostIdx) {
        t.itemEl.classList.add('is-passed');
        t.itemEl.classList.remove('is-active');
      } else {
        t.itemEl.classList.remove('is-active', 'is-passed');
      }
    });

    updateProgressLine(allTargets, topMost);
  }

  /* ─ 세로 라인 진행도 — 첫 점 중앙 ~ 활성 점 중앙 거리로 height 계산 ─ */
  function updateProgressLine(allTargets, activeTarget) {
    if (allTargets.length === 0) return;
    var list = allTargets[0].itemEl.parentElement;   // ul.in-page-nav-list
    if (!list) return;

    if (!activeTarget) {
      list.style.setProperty('--nav-progress', '0px');
      return;
    }

    // 라인 시작점 = 첫 번째 점 중앙 (CSS의 ::after top과 일치해야 함)
    var firstDot = allTargets[0].itemEl.querySelector('.in-page-nav-dot, .in-page-nav-subdot');
    var activeDot = activeTarget.itemEl.querySelector('.in-page-nav-dot, .in-page-nav-subdot');
    if (!firstDot || !activeDot) {
      list.style.setProperty('--nav-progress', '0px');
      return;
    }

    var firstRect = firstDot.getBoundingClientRect();
    var activeRect = activeDot.getBoundingClientRect();
    var lineStartY = firstRect.top + firstRect.height / 2;
    var activeY = activeRect.top + activeRect.height / 2;

    var progressPx = Math.max(0, activeY - lineStartY);
    list.style.setProperty('--nav-progress', progressPx + 'px');
  }

  function getScrollOffset() {
    // 글로벌 nav 높이만큼 빼서 섹션 헤더가 가려지지 않게
    var nav = document.querySelector('.nav, header nav, .global-nav');
    if (nav) return nav.getBoundingClientRect().height + 20;
    return 80;
  }

  /* ─ init ─ */
  function init() {
    var navs = document.querySelectorAll('.in-page-nav[data-nav-config]');
    console.log('[in-page-nav] found', navs.length, 'nav element(s)');
    navs.forEach(initInPageNav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
