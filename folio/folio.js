// ==================== FOLIO CASE STUDY · JS ====================
// ENGINEERING RIGOR: data-group="engineering" exec-phase-card (펼침/접힘 카드)
// KEY DECISIONS는 .decision-card 직렬 구조로 변경되어 토글 인터랙션 없음

(function () {
  'use strict';

  if (window.initExpandCards) {
    initExpandCards('.exec-phase-card[data-group="engineering"]', { firstOpen: false });
  }
})();

// ==================== PRICING — 원가 대비 판매가 마진 차트 ====================
// 가로 막대(원가 vs 판매가) 10개 모델. metavv.js와 동일하게 테마 CSS 변수에서 색을 읽고,
// Reveal와 충돌하지 않도록 IntersectionObserver로 뷰포트 진입 후 초기화(LEARNED L12).
(function () {
  'use strict';

  var canvas = document.getElementById('pricingMarginChart');
  if (!canvas || typeof Chart === 'undefined') return;

  var rootStyle = getComputedStyle(document.documentElement);
  var ACCENT = rootStyle.getPropertyValue('--gold').trim() || 'rgb(245, 207, 165)';
  var ACCENT_RGB = rootStyle.getPropertyValue('--gold-rgb').trim() || '245, 207, 165';
  var BORDER_RGB = rootStyle.getPropertyValue('--border-rgb').trim() || '138, 136, 130';

  var labels = [
    'Gemini 3.1 Flash-Lite', 'Gemini 2.5 Flash', 'GLM-4.7 / GLM 5', 'Claude Haiku 4.5',
    'Gemini 2.5 Pro', 'Gemini 3.5 Flash', 'Gemini 3.1 Pro', 'Claude Sonnet 4.6',
    'Claude Opus 4.6', 'Claude Opus 4.7'
  ];
  var costData  = [4, 6, 6, 16, 24, 26, 34, 48, 81, 81];
  var priceData = [34, 46, 48, 48, 72, 76, 102, 116, 194, 194];

  var triggered = false;

  function render() {
    if (triggered) return;
    triggered = true;

    var ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '원가',
            data: costData,
            backgroundColor: 'rgba(' + BORDER_RGB + ', 0.35)',
            borderWidth: 0,
            borderRadius: 3,
            barPercentage: 0.7,
            categoryPercentage: 0.7
          },
          {
            label: '판매가',
            data: priceData,
            backgroundColor: ACCENT,
            borderWidth: 0,
            borderRadius: 3,
            barPercentage: 0.7,
            categoryPercentage: 0.7
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1200, easing: 'easeOutCubic' },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: 'rgba(' + ACCENT_RGB + ', 0.85)',
              font: { family: 'Pretendard', size: 11 },
              boxWidth: 10,
              boxHeight: 10,
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: 'rgba(26, 25, 25, 0.95)',
            titleColor: ACCENT,
            bodyColor: '#D8D4CA',
            titleFont: { family: 'Pretendard', size: 11, weight: '500' },
            bodyFont: { family: 'Pretendard', size: 13, weight: '500' },
            padding: 12,
            displayColors: false,
            borderColor: 'rgba(' + ACCENT_RGB + ', 0.3)',
            borderWidth: 1,
            callbacks: {
              title: function (items) { return items[0].label; },
              label: function (item) {
                var i = item.dataIndex;
                var margin = (priceData[i] / costData[i]).toFixed(1);
                if (item.dataset.label === '판매가') {
                  return '판매가 ' + priceData[i] + '원 · 마진 ' + margin + '배';
                }
                return '원가 약 ' + costData[i] + '원';
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(' + BORDER_RGB + ', 0.08)', drawBorder: false },
            ticks: {
              color: '#8A8882',
              font: { family: 'Pretendard', size: 10 },
              callback: function (value) { return value + '원'; }
            },
            border: { display: false }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: '#A8B5C8',
              font: { family: 'Pretendard', size: 11 }
            },
            border: { color: 'rgba(138, 136, 130, 0.15)' }
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
  }, { threshold: 0.3 });

  observer.observe(canvas);
})();
