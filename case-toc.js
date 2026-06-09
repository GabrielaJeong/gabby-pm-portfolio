/* =========================================================
   case-toc.js — 케이스 페이지 상단 고정 섹션 목차바
   사용: <nav class="case-toc" data-nav-config='[{"id","label"}]'></nav>
        (글로벌 nav 바로 다음, 페이지 상단에 배치)
   기능: li 자동 생성 + 현재 섹션 강조(scroll-spy) + 클릭 smooth scroll
        (sticky 위치는 글로벌 nav 높이에 맞춰 JS가 동기화)
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

  /* ─ li 생성 (실제 존재하는 섹션만) ─ */
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
    targets.push({ id: item.id, el: el, link: a });
  });

  if (!targets.length) return;
  toc.innerHTML = '';
  toc.appendChild(list);

  function navHeight() {
    return globalNav ? globalNav.getBoundingClientRect().height : 0;
  }

  /* ─ sticky top = 글로벌 nav 높이 (그 아래 붙음) ─ */
  function syncTop() {
    toc.style.top = navHeight() + 'px';
  }
  syncTop();
  window.addEventListener('resize', syncTop, { passive: true });

  /* ─ 클릭 → smooth scroll (nav + toc 높이만큼 오프셋) ─ */
  function scrollOffset() {
    return navHeight() + toc.getBoundingClientRect().height + 8;
  }

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

  /* ─ scroll-spy ─ */
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
          if (y < topMostY) {
            topMostY = y;
            activeId = t.id;
          }
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

  targets.forEach(function (t) {
    observer.observe(t.el);
  });

  /* 페이지 끝 보정 */
  var raf = null;
  window.addEventListener(
    'scroll',
    function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        updateActive();
      });
    },
    { passive: true }
  );
})();
