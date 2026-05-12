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
      // 아무 것도 안 보이면 모두 비활성
      allTargets.forEach(function (t) { t.itemEl.classList.remove('is-active'); });
      return;
    }
    // 페이지 안에서 가장 먼저 나타나는(=가장 위에 있는) visible 섹션을 활성으로
    var topMost = null;
    var topMostY = Infinity;
    allTargets.forEach(function (t) {
      if (visibleIds.has(t.id)) {
        var y = t.el.getBoundingClientRect().top;
        if (y < topMostY) {
          topMostY = y;
          topMost = t;
        }
      }
    });

    allTargets.forEach(function (t) {
      if (t === topMost) t.itemEl.classList.add('is-active');
      else t.itemEl.classList.remove('is-active');
    });
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
