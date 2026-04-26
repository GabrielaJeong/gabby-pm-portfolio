/* ========================================================
   METAVV CASE STUDY · JS
   - Chart.js로 매출 J-curve 그래프
   - 메트릭 카드 / 인용 카드 토글 인터랙션
   ======================================================== */

(function () {
  'use strict';

  // ============ 1. Chart.js 매출 그래프 ============
  function renderRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');

    // 13개월 매출 데이터 2024.04 ~ 2025.04 (만원 단위)
    const labels = ['4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월'];
    const data = [15, 18, 22, 28, 38, 55, 90, 160, 290, 500, 780, 980, 1100];

    // 골드 그라데이션 (라인 아래 영역)
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(245, 207, 165, 0.18)');
    gradient.addColorStop(1, 'rgba(245, 207, 165, 0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '월 매출 (만원)',
          data: data,
          borderColor: '#F5CFA5',
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#F5CFA5',
          pointBorderColor: '#F5CFA5',
          pointRadius: function (context) {
            // 시작점과 끝점만 점 표시
            const i = context.dataIndex;
            if (i === 0 || i === data.length - 1) return 5;
            return 0;
          },
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1200,
          easing: 'easeOutCubic'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(26, 25, 25, 0.95)',
            titleColor: '#F5CFA5',
            bodyColor: '#D8D4CA',
            titleFont: { family: 'Pretendard', size: 11, weight: '500' },
            bodyFont: { family: 'Pretendard', size: 13, weight: '500' },
            padding: 12,
            displayColors: false,
            borderColor: 'rgba(245, 207, 165, 0.3)',
            borderWidth: 1,
            callbacks: {
              title: function (items) { return items[0].label; },
              label: function (item) {
                return item.parsed.y.toLocaleString() + '만원';
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#8A8882',
              font: { family: 'Pretendard', size: 10 }
            },
            border: { color: 'rgba(138, 136, 130, 0.15)' }
          },
          y: {
            grid: {
              color: 'rgba(138, 136, 130, 0.08)',
              drawBorder: false
            },
            ticks: {
              color: '#8A8882',
              font: { family: 'Pretendard', size: 10 },
              callback: function (value) {
                if (value === 0) return '0';
                if (value >= 1000) return (value / 1000).toFixed(1) + 'k';
                return value;
              }
            },
            border: { display: false }
          }
        }
      }
    });
  }

  // ============ 2. 인용 카드 토글 인터랙션 ============
  function setupToggleCards() {
    document.querySelectorAll('.quote-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const expanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!expanded));
      });
    });
  }

  // ============ 2-b. 비용 회수율 도넛 차트 ============
  function setupCostDonut() {
    var canvas = document.getElementById('costDonut');
    if (!canvas || typeof Chart === 'undefined') return;

    var triggered = false;

    function render() {
      if (triggered) return;
      triggered = true;

      var ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [2, 98],
            backgroundColor: ['#F5CFA5', 'rgba(138, 136, 130, 0.15)'],
            borderColor: ['transparent', 'transparent'],
            borderWidth: 0,
            hoverBackgroundColor: ['#F5CFA5', 'rgba(138, 136, 130, 0.28)']
          }]
        },
        options: {
          responsive: false,
          cutout: '72%',
          animation: { duration: 1200, easing: 'easeOutCubic' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(26, 25, 25, 0.95)',
              titleColor: '#F5CFA5',
              bodyColor: '#D8D4CA',
              titleFont: { family: 'Pretendard', size: 11, weight: '500' },
              bodyFont: { family: 'Pretendard', size: 13, weight: '500' },
              padding: 12,
              displayColors: false,
              borderColor: 'rgba(245, 207, 165, 0.3)',
              borderWidth: 1,
              callbacks: {
                title: function (items) {
                  return items[0].dataIndex === 0 ? '월 매출 (스튜디오 결제)' : '월 인프라 비용 (서버·DB)';
                },
                label: function (item) {
                  return item.dataIndex === 0 ? '15만원 (2%)' : '405만원 (98%)';
                }
              }
            }
          }
        }
      });
    }

    if (!('IntersectionObserver' in window)) {
      render();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          render();
          observer.unobserve(canvas);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(canvas);
  }

  // ============ 3. 직접 매출 막대 애니메이션 트리거 ============
  function setupBarAnimation() {
    const bars = document.querySelectorAll('.prob-bar-fill');
    if (!bars.length || !('IntersectionObserver' in window)) return;

    // 초기 width를 0으로 설정 후, 직접 지정한 width로 복구
    bars.forEach(function (bar) {
      bar.dataset.targetWidth = bar.style.width;
      bar.style.width = '0%';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          requestAnimationFrame(function () {
            bar.style.width = bar.dataset.targetWidth;
          });
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  // ============ 4. Mini-tab 토글 (Tab 3 내부) ============
  function setupMiniTabs() {
    var miniTabBtns = document.querySelectorAll('.mini-tab-nav .mini-tab');
    var miniContents = document.querySelectorAll('.mini-case-content');

    if (!miniTabBtns.length) return;

    miniTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.miniTab;

        miniTabBtns.forEach(function (b) {
          b.setAttribute('aria-selected', b.dataset.miniTab === target ? 'true' : 'false');
        });

        miniContents.forEach(function (content) {
          if (content.dataset.miniCase === target) {
            content.removeAttribute('hidden');
          } else {
            content.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  // ============ 5. Phase 카드 펼침/접힘 ============
  function setupPhaseCards() {
    document.querySelectorAll('.exec-phase-card').forEach(function (card) {
      var btn = card.querySelector('.exec-phase-toggle');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var expanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    });
  }

  // ============ Init ============
  function init() {
    renderRevenueChart();
    setupToggleCards();
    setupCostDonut();
    setupBarAnimation();
    setupPhaseCards();
    setupMiniTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ==================== CASE TAB NAVIGATION + URL HASH ROUTING ====================
(function setupCaseTabs() {
  'use strict';

  var tabs         = document.querySelectorAll('.case-tab');
  var contents     = document.querySelectorAll('.case-content');
  var tabNav       = document.querySelector('.case-tab-nav');
  var casesWrapper = document.querySelector('.cases-wrapper');
  var VALID_TABS   = ['revenue', 'cs', 'zero-to-one'];

  if (!tabs.length || !contents.length) return;

  // 페이지 기준 절대 Y 계산 (scrollY와 무관한 고정값)
  function getAbsoluteTop(el) {
    var top = 0;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent;
    }
    return top;
  }

  // 탭 활성화
  function activateTab(tabName, scroll) {
    tabs.forEach(function (tab) {
      tab.setAttribute('aria-selected', tab.dataset.tab === tabName ? 'true' : 'false');
    });

    contents.forEach(function (content) {
      if (content.dataset.case === tabName) {
        content.removeAttribute('hidden');
        // 탭 전환 시 reveal 요소 즉시 표시 (스크롤 애니메이션 없음)
        if (window.__revealTabContent) window.__revealTabContent(content);
      } else {
        content.setAttribute('hidden', '');
      }
    });

    // 클릭 시에만 스크롤 — getAbsoluteTop으로 고정 위치 계산 (누적 X)
    if (scroll && casesWrapper) {
      var navH  = tabNav ? tabNav.offsetHeight : 80;
      var target = getAbsoluteTop(casesWrapper) - navH;
      window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    }
  }

  // 탭 클릭 — 해시 업데이트 + 스크롤 O
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var tabName = tab.dataset.tab;
      history.pushState(null, '', '#' + tabName);
      activateTab(tabName, true);
    });
  });

  // 해시 처리 — 스크롤 X (페이지 로드 / popstate 모두)
  function handleHash() {
    var hash = window.location.hash.replace('#', '');
    activateTab(VALID_TABS.indexOf(hash) !== -1 ? hash : 'revenue', false);
  }

  window.addEventListener('popstate', handleHash);
  handleHash();
})();

// ==================== SCROLL INDICATOR ====================
(function () {
  var indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;
  window.addEventListener('scroll', function () {
    indicator.classList.toggle('is-hidden', window.scrollY > 80);
  }, { passive: true });
})();
