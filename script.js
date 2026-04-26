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

// ==================== NAV DROPDOWN (모바일 Work 아코디언) ====================
const drawerWork = document.querySelector('.drawer-work');
const drawerWorkToggle = document.querySelector('.drawer-work-toggle');

if (drawerWorkToggle) {
  drawerWorkToggle.addEventListener('click', () => {
    const isOpen = drawerWork.classList.toggle('open');
    drawerWorkToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// 드로어 Work 하위 링크 클릭 시 드로어 닫기
document.querySelectorAll('.drawer-work-sub a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('drawer-open');
    hamburger.setAttribute('aria-label', '메뉴 열기');
  });
});

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

hamburger.addEventListener('click', () => {
  nav.classList.toggle('drawer-open');
  const isOpen = nav.classList.contains('drawer-open');
  hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

document.querySelectorAll('.nav-drawer a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('drawer-open');
    hamburger.setAttribute('aria-label', '메뉴 열기');
  });
});

// ==================== SECTION ACTIVE UNDERLINE ====================
const sections = ['work', 'about', 'experience', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

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
