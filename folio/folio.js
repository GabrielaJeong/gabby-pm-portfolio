// ==================== FOLIO CASE STUDY · JS ====================
// ENGINEERING RIGOR: data-group="engineering" exec-phase-card (펼침/접힘 카드)
// KEY DECISIONS는 .decision-card 직렬 구조로 변경되어 토글 인터랙션 없음

(function () {
  'use strict';

  if (window.initExpandCards) {
    initExpandCards('.exec-phase-card[data-group="engineering"]', { firstOpen: false });
  }
})();

// ==================== PRICING — 질문 카드 푸터 링크(같은 페이지 내 스크롤) ====================
// pages 모드는 해시(#pricing 등 '페이지 키')로 페이지를 전환한다. 푸터 링크의
// #pricing-table/#decision-margin/#revenue-stack는 페이지 키가 아니므로, 기본
// 해시 이동에 맡기면 목차바 로직이 첫 페이지(Intro)로 되돌려버린다.
// → 해시를 바꾸지 않고, 이미 열려 있는 pricing 페이지 안에서 대상으로 직접 스크롤.
(function () {
  'use strict';

  var cards = document.querySelectorAll('a.q-card[href^="#"]');
  if (!cards.length) return;

  function stickyOffset() {
    var nav = document.querySelector('.nav');
    var toc = document.querySelector('.case-toc');
    var h = 0;
    if (nav) h += nav.getBoundingClientRect().height;
    if (toc) h += toc.getBoundingClientRect().height;
    return h + 16; // 여유 간격
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      var target = document.getElementById(card.getAttribute('href').slice(1));
      if (!target) return; // 대상 없으면 기본 동작
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - stickyOffset();
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    });
  });
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

  // 등급 색 (표 행 바·범례와 동일 매핑): 저가 gray / 중급 gold-dim / 고급 gold
  var COL_LOW  = 'rgba(' + BORDER_RGB + ', 0.6)';
  var COL_MID  = 'rgba(' + ACCENT_RGB + ', 0.55)';
  var COL_HIGH = ACCENT;
  var COL_COST = 'rgba(' + BORDER_RGB + ', 0.35)';
  // 인덱스별 판매가 막대 색 (1~3행 저가 / 4~7행 중급 / 8~10행 고급)
  var priceColors = priceData.map(function (_, i) {
    if (i <= 2) return COL_LOW;
    if (i <= 6) return COL_MID;
    return COL_HIGH;
  });

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
            backgroundColor: COL_COST,
            borderWidth: 0,
            borderRadius: 3,
            barPercentage: 0.7,
            categoryPercentage: 0.7
          },
          {
            label: '판매가',
            data: priceData,
            backgroundColor: priceColors,
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
            onClick: function () {},   // 커스텀 4항목 범례 — 데이터셋 토글 비활성
            labels: {
              color: 'rgba(' + ACCENT_RGB + ', 0.85)',
              font: { family: 'Pretendard', size: 11 },
              boxWidth: 10,
              boxHeight: 10,
              padding: 16,
              generateLabels: function () {
                return [
                  { text: '저가', fillStyle: COL_LOW,  strokeStyle: COL_LOW,  lineWidth: 0 },
                  { text: '중급', fillStyle: COL_MID,  strokeStyle: COL_MID,  lineWidth: 0 },
                  { text: '고급', fillStyle: COL_HIGH, strokeStyle: COL_HIGH, lineWidth: 0 },
                  { text: '원가', fillStyle: COL_COST, strokeStyle: COL_COST, lineWidth: 0 }
                ];
              }
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

// ==================== REVENUE STRUCTURE — 현재 층 요약 하이라이트 ====================
// 뷰포트에서 가장 많이 보이는 층 카드(data-layer)에 대응하는 REVENUE SUMMARY 항목을
// accent로 하이라이트. pages 모드로 숨겨져 있어도 표시 후 스크롤 시 정상 동작.
(function () {
  'use strict';

  var cards = document.querySelectorAll('.revenue-layout .exec-step-card[data-layer]');
  var items = document.querySelectorAll('.revenue-summary .exec-tradeoff-item[data-layer]');
  if (!cards.length || !items.length || !('IntersectionObserver' in window)) return;

  var ratios = {};

  function setActive() {
    var best = null, bestRatio = 0;
    Object.keys(ratios).forEach(function (k) {
      if (ratios[k] > bestRatio) { bestRatio = ratios[k]; best = k; }
    });
    items.forEach(function (it) {
      it.classList.toggle('is-active', best !== null && it.getAttribute('data-layer') === best);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      ratios[en.target.getAttribute('data-layer')] = en.isIntersecting ? en.intersectionRatio : 0;
    });
    setActive();
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  cards.forEach(function (c) { observer.observe(c); });
})();
