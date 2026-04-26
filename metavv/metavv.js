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

    // 12개월 매출 데이터 (만원 단위)
    // 15만원 → 1100만원 J-curve
    const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const data = [15, 18, 22, 28, 38, 55, 90, 160, 290, 500, 780, 1100];

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

  // ============ 2. 카드 토글 인터랙션 ============
  function setupToggleCards() {
    // 메트릭 카드 (IMPACT DASHBOARD)
    document.querySelectorAll('.impact-metric-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const expanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!expanded));
      });
    });

    // 인용 카드 (PROBLEM)
    document.querySelectorAll('.quote-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const expanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!expanded));
      });
    });
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

  // ============ Init ============
  function init() {
    renderRevenueChart();
    setupToggleCards();
    setupBarAnimation();
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

  const tabs     = document.querySelectorAll('.case-tab');
  const contents = document.querySelectorAll('.case-content');
  const tabNav   = document.querySelector('.case-tab-nav');
  const VALID_TABS = ['revenue', 'cs', 'zero-to-one'];

  if (!tabs.length || !contents.length) return;

  // 탭 활성화
  function activateTab(tabName, options) {
    var scroll = options && options.scroll !== undefined ? options.scroll : true;

    // 탭 aria-selected 갱신
    tabs.forEach(function (tab) {
      tab.setAttribute('aria-selected', tab.dataset.tab === tabName ? 'true' : 'false');
    });

    // 콘텐츠 show / hide
    contents.forEach(function (content) {
      if (content.dataset.case === tabName) {
        content.removeAttribute('hidden');
      } else {
        content.setAttribute('hidden', '');
      }
    });

    // 탭 네비 바로 아래로 smooth scroll
    if (scroll && tabNav) {
      var navOffset = tabNav.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: navOffset, behavior: 'smooth' });
    }
  }

  // 탭 클릭
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var tabName = tab.dataset.tab;
      history.pushState(null, '', '#' + tabName);
      activateTab(tabName, { scroll: true });
    });
  });

  // 해시 기반 초기화 (새로고침 / 링크 공유 대응)
  function handleHash() {
    var hash = window.location.hash.replace('#', '');
    if (VALID_TABS.indexOf(hash) !== -1) {
      activateTab(hash, { scroll: false });
    } else {
      activateTab('revenue', { scroll: false });
    }
  }

  // 뒤로가기 / 앞으로가기 대응
  window.addEventListener('popstate', handleHash);

  // 초기 실행
  handleHash();
})();
