// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== 모바일 드로어 Work 아코디언 ====================
document.querySelectorAll('.drawer-work').forEach((work) => {
  const toggle = work.querySelector('.drawer-work-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const isOpen = work.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});
// 드로어 일반 링크 클릭 시 닫기는 아래 `.nav-drawer a` 핸들러가 처리.

// ==================== NAV SCROLL EFFECT ====================
const nav = document.getElementById('nav');

const handleScroll = () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ==================== MOBILE DRAWER ====================
const hamburger = document.getElementById('hamburger');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('drawer-open');
    const isOpen = nav.classList.contains('drawer-open');
    hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });
}

document.querySelectorAll('.nav-drawer a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('drawer-open');
    hamburger.setAttribute('aria-label', '메뉴 열기');
  });
});

// (구) SECTION ACTIVE UNDERLINE 옵저버 제거 — About/Work는 별도 페이지가 되어
// 스크롤 추적 대상이 없고, Contact만 남아 '한 번 켜지면 안 꺼지는' 고정 선택 버그를
// 유발했음. Contact는 nav 메뉴에서 분리(우측 별도 링크)했고 활성 표시 없음.

// ==================== ABOUT · Q&A ACCORDION ====================
// 모든 Q&A는 기본 닫힌 상태로 시작.
// 클릭 시 해당 항목만 토글 (다른 항목은 그대로 유지).

document.querySelectorAll('.qa-item .qa-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.qa-item');
    const isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

// ==================== CAPABILITIES · TAB INTERACTION ====================
// 각 카드의 INSIGHT / ACTION / IMPACT 탭 클릭 시
// 해당 단계 콘텐츠로 페이드+슬라이드 전환.
// 카드별로 독립 동작 (한 카드 변경이 다른 카드에 영향 없음).

document.querySelectorAll('.cap-card').forEach((card) => {
  const tabs = card.querySelectorAll('.cap-tab');
  const contents = card.querySelectorAll('.cap-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const stage = tab.dataset.stage;

      tabs.forEach((t) => {
        const isActive = t.dataset.stage === stage;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      contents.forEach((c) => {
        c.classList.toggle('active', c.dataset.stage === stage);
      });
    });
  });
});

// ==================== THEME TOGGLE (홈 전용 라이트/다크) ====================
// data-theme는 index.html <head> 인라인 스크립트가 먼저 적용(FOUC 방지).
// 여기선 토글 클릭으로 전환 + localStorage 저장만 담당.
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  const syncLabel = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    themeToggle.setAttribute('aria-label', isLight ? '다크 모드로 전환' : '라이트 모드로 전환');
  };
  syncLabel();

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
    } catch (e) { /* localStorage 차단 환경 무시 */ }
    syncLabel();
  });
}
