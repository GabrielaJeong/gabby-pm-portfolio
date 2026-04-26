# 가비 PM 포트폴리오 — 디자인 시스템

> `styles.css :root` 기반 실제 구현 기준.
> 새 페이지·컴포넌트 추가 시 여기서 토큰·패턴을 먼저 찾을 것.
> 없으면 기존 패턴에서 파생 — 임의 하드코딩 금지.

---

## 1. 컬러 토큰

### 레거시 (메인 페이지 기반)

```css
--bg:           #000000;                    /* 배경 */
--surface:      #1a1919;                    /* 카드, 박스 */
--gold:         #f5cfa5;                    /* 포인트 골드 */
--text:         #d8d4ca;                    /* 기본 본문 (메인 페이지) */
--text-muted:   #8a8882;                    /* 보조 텍스트 (메인 페이지) */
--border:       rgba(138, 136, 130, 0.2);  /* 기본 구분선 */
--border-strong: rgba(138, 136, 130, 0.4); /* 강조 구분선 */
```

### 텍스트 계층 (상세 페이지용, 다크 배경 최적화)

```css
--text-primary:        #FFFFFF;                     /* 메인 수치, 큰 제목 */
--text-secondary:      rgba(255, 255, 255, 0.85);   /* 본문, 인용문 */
--text-tertiary:       rgba(255, 255, 255, 0.65);   /* 부가 설명, 출처 */
--text-quaternary:     rgba(255, 255, 255, 0.45);   /* 매우 보조적 (화살표 등) */
--text-label-gold:     rgba(245, 207, 165, 0.85);   /* 영문 라벨 */
--text-label-gold-dim: rgba(245, 207, 165, 0.55);   /* 흐린 골드 (따옴표 등) */
```

### 경계선

```css
--border-default: rgba(255, 255, 255, 0.12);  /* 구분선 (상세 페이지) */
--border-gold:    rgba(245, 207, 165, 0.50);  /* 골드 강조 경계선 */
/* --border / --border-strong: 메인 페이지 레거시 토큰, 혼용 가능 */
```

### 사용 규칙

- 하드코딩 컬러 값 사용 금지. 반드시 토큰 사용.
- **본문 텍스트는 `var(--text-secondary)` 이상** — 0.65 이하 명도는 부가/매우 보조에만 제한.
- 메인 페이지(`index.html`)는 레거시 토큰(`--text`, `--text-muted`) 사용.
- 상세 페이지(`/metavv/`, `/folio/` 등)는 새 텍스트 계층 토큰 사용.

---

## 2. 타이포그래피

### 폰트 크기 스케일

| 용도 | 토큰 | 크기 | 굵기 토큰 | 굵기 | 사용처 예시 |
|---|---|---|---|---|---|
| 디스플레이 수치 | `--fs-display` | 56px | `--fw-display` | 600 | IMPACT 메인 수치 (262%, 11건) |
| 섹션 타이틀 | `--fs-h1` | 32px | `--fw-h1` | 700 | case-section-title |
| 카드 제목 | `--fs-h2` | 20px | `--fw-h2` | 600 | 인용 카드 상단 수치, 차트 타이틀 |
| 서브 카드 제목 | `--fs-h3` | 18px | `--fw-h3` | 600 | 인용 카드 헤드라인, 케이스 타이틀 |
| 본문 | `--fs-body` | 14px | `--fw-body` | 400 | 인용문, IMPACT 한글 서브텍스트 |
| 부가 설명 | `--fs-sub` | 13px | `--fw-body` | 400 | 출처, 부제, CTA 텍스트 |
| 라벨/캡션 | `--fs-caption` | 12px | `--fw-caption` | 500 | 영문 라벨 (COST RECOVERY 등) |

> **floor: 12px — 11px 이하 사용 절대 금지.**

### Line-height 스케일

| 용도 | 토큰 | 값 | 사용처 |
|---|---|---|---|
| 디스플레이 수치 | `--lh-tight` | 1 | 262%, 15명, 10명 등 큰 수치 |
| 제목 | `--lh-snug` | 1.2 | case-section-title, 카드 제목 |
| 본문 | `--lh-normal` | 1.5 | 인용 카드 헤드라인, 일반 설명 |
| 긴 캡션 | `--lh-relaxed` | 1.7 | 인용문 본문, 하단 캡션, ctx-paragraph |

### 사용 규칙

- **디스플레이 수치에 `var(--lh-tight)` 필수** — 본문 line-height 사용 시 카드 하단에 시각적 틈 발생.
- 영문 라벨에 `letter-spacing: 0.08em ~ 0.12em` 적용.
- 본문(`--fs-body` 이상)은 `var(--text-secondary)` 색상 사용.

---

## 3. 레이아웃 토큰

### Spacing — 4px 그리드

```css
--space-1:  4px    --space-2:  8px    --space-3:  12px
--space-4:  16px   --space-5:  20px   --space-6:  24px
--space-7:  28px   --space-8:  32px   --space-10: 40px
--space-12: 48px   --space-16: 64px
```

### 카드 패딩

```css
--card-padding-sm: 16px 20px   /* 다이어그램 노드, 깔때기 카드 */
--card-padding-md: 20px 24px   /* 일반 중간 카드 */
--card-padding-lg: 28px 32px   /* IMPACT 카드, 인용 카드, EXTERNAL RECORD */
```

### 카드 내부 간격

```css
--card-gap-tight:   8px    /* 라벨 ↔ 메인 텍스트 */
--card-gap-default: 12px   /* 일반 마진 */
--card-gap-loose:   20px   /* 섹션 분리 (펼침 상태 인용 부제 등) */
```

### Border Radius

```css
--radius-sm: 8px    /* 인용 카드, 퍼널 카드, 블로그 항목 */
--radius-md: 12px   /* EXTERNAL RECORD 박스 (= --radius-card) */
--radius-lg: 16px   /* 외곽 컨테이너 (PHASE 깔때기 wrapper 등) */
```

> 레거시: `--radius-card: 12px`, `--radius-btn: 8px`, `--radius-tag: 6px` — 메인 페이지 컴포넌트에 사용.

### 섹션 간격

```css
--section-gap:   64px   /* 섹션과 섹션 사이 */
--section-inner: 48px   /* 섹션 내부 컴포넌트 간 */
```

### 페이지 셸

```css
max-width:    1440px   /* 데스크탑 전용 */
side-padding: 48px     /* case-inner 기준 */
```

---

## 4. 카드 패턴

### A. 다이어그램 노드 카드 (center)

사용처: CONTEXT (B2C VISITORS, SAAS USERS, 메타브, 메타브 스튜디오, SHARED INFRASTRUCTURE), PHASE 깔때기 (FREE/PLUS, PRO, ENTERPRISE, TOTAL, PHASE 02)

```css
text-align:  center;
padding:     var(--card-padding-sm);   /* 16px 20px */
display:     flex;
flex-direction: column;
align-items: center;
```

내부 구조 순서:
1. 영문 라벨 — `--fs-caption / --fw-caption / --text-label-gold / letter-spacing: 0.08em`
2. 메인 텍스트 — `--fs-h3 / --fw-h3 / --text-primary / --lh-snug`
3. 부가 설명 — `--fs-caption / --fw-body / --text-tertiary / --lh-normal`

마진:
- 라벨 → 메인: `var(--card-gap-tight)` (8px)
- 메인 → 부가: `var(--space-1)` (4px)

### B. 콘텐츠 카드 (left)

사용처: IMPACT 메트릭 카드, PROBLEM 인용 카드, EXTERNAL RECORD 박스

```css
text-align:  left;
padding:     var(--card-padding-lg);   /* 28px 32px */
```

IMPACT 카드 내부 순서:
1. 영문 라벨 — `margin-bottom: var(--card-gap-default)`
2. 메인 수치 — `--fs-display / --lh-tight / margin-bottom: var(--space-4)`
3. 한글 서브 — `--fs-body / --text-secondary / margin-bottom: var(--card-gap-loose)`
4. CTA — `--fs-sub / --text-tertiary / margin-top: auto` (카드 하단 고정)

### C. 외곽 컨테이너 (영역 그루핑)

사용처: PHASE 깔때기 외곽 wrapper

```css
padding:          var(--space-8);                  /* 32px */
background:       rgba(255, 255, 255, 0.02);
border:           1px solid var(--border-default);
border-radius:    var(--radius-lg);               /* 16px */
```

> ⚠️ "패딩 제거" 지시 시 이 컨테이너 자체를 삭제하지 말 것.
> padding 값만 줄이고 border/background/border-radius는 유지.

### 사용 규칙

- **한 카드 안에서 정렬 혼용 금지** — 라벨/메인/부가설명 모두 동일 정렬.
- **같은 종류 카드는 같은 패딩 토큰** — 다이어그램 노드끼리 패딩 달라지면 안 됨.
- 정렬 규칙: **다이어그램 노드 = center / 콘텐츠 카드 = left.**

---

## 5. 그리드 규칙

같은 줄 카드 → 동일 너비 + 동일 높이.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 또는 1fr 1fr */
  gap: var(--space-4);
  align-items: stretch;                   /* 높이 통일 — 필수 */
}

.card {
  width: 100%;
  box-sizing: border-box;
}
```

### 사용 규칙

- `width: auto / max-content / fit-content` 사용 금지 — 카드 너비가 콘텐츠 길이에 따라 달라져 정렬 깨짐.
- `align-items: stretch` 누락 시 카드 높이 불일치 — 그리드에 필수.
- `grid-template-columns`는 `1fr` 또는 명시적 px 값만 사용.

---

## 6. 인터랙션 패턴

### 펼침/접힘 (인용 카드)

```css
/* 접힘 상태: max-height로 숨김 */
.quote-card-detail {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, margin-top 0.3s ease, padding-top 0.3s ease;
}
.quote-card[aria-expanded="true"] .quote-card-detail {
  max-height: 280px;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px dashed var(--border-default);
}

/* + 아이콘 회전 */
.quote-card-toggle { transition: transform 0.25s ease; }
.quote-card[aria-expanded="true"] .quote-card-toggle { transform: rotate(45deg); }
```

### 호버

```css
/* 카드 */
.card:hover { border-color: var(--border-gold); transform: translateY(-2px); }

/* 링크 화살표 */
.blog-list-item:hover .blog-list-arrow { color: var(--text-label-gold); }
```

---

## 7. 컴포넌트 카탈로그 (Phase 1 완료)

| 컴포넌트 | 핵심 클래스 | 정렬 | 패딩 토큰 |
|---|---|---|---|
| 백 링크 | `.case-back-link` | left | — |
| 케이스 HERO | `.case-hero`, `.case-meta-grid` | left | — |
| Chart.js 카드 | `.impact-chart-card` | left | `--space-10` |
| IMPACT 메트릭 카드 | `.impact-metric-card` | **left** | `--card-padding-lg` |
| CONTEXT SVG 다이어그램 | `.ctx-diagram`, `.ctx-arch-svg` | center (SVG) | `--space-10 --space-8` |
| PHASE 깔때기 외곽 | `.phase-funnel-wrapper` | — | `--space-8` |
| PHASE 세그먼트 카드 | `.phase-card` | **center** | `--card-padding-sm` |
| TOTAL 박스 | `.phase-total-box` | **center** | `--card-padding-sm` |
| PHASE 02 박스 | `.phase-02-box` | **center** | `--card-padding-sm` |
| 인용 카드 | `.quote-card` | **left** | `--card-padding-lg` |
| EXTERNAL RECORD | `.blog-collection` | left | `--card-padding-lg` |

### Phase 2 추가 예정

| 섹션 | 정렬 방침 | 패딩 방침 |
|---|---|---|
| STRATEGY | 콘텐츠 카드 → left | `--card-padding-lg` |
| EXECUTION | 콘텐츠 카드 → left | `--card-padding-lg` |
| RESULT | 수치 다이어그램 혼합 | 종류별 패턴 적용 |
| REFLECTION | 콘텐츠 카드 → left | `--card-padding-lg` |
| NAVIGATION | — | — |

---

## 8. 자주 하는 실수 (피해야 할 것)

실제 작업 중 발생한 문제와 해결책. 앞으로 같은 실수 반복하지 말 것.

**컨테이너 삭제 금지**
- "쓸데없는 패딩 제거" 지시 시 컨테이너 자체를 삭제하면 안 됨.
- 배경/보더/라운드는 유지하고 `padding` 값만 조정.
- 컨테이너가 사라지면 영역 그루핑이 깨져 페이지가 흩어져 보임.

**카드 내 정렬 혼용 금지**
- 한 카드 안에서 "메타브"는 center, "콘텐츠 무료 제공"은 left처럼 정렬이 갈리면 안 됨.
- 카드 내 모든 자식 요소는 동일 정렬 사용.

**`width: auto` 금지**
- 콘텐츠 길이만큼만 너비를 차지 → 같은 줄 카드끼리 너비 차이 발생.
- 그리드 + `1fr` + `width: 100%` + `align-items: stretch` 조합 사용.

**디스플레이 수치에 본문 line-height 금지**
- "262%", "15명" 같은 큰 수치에 `line-height: 1.5` → 카드 하단 시각적 틈 발생.
- 무조건 `var(--lh-tight)` 사용.

**본문 색상 0.65 이하 금지**
- 다크 배경(#000)에서 가독성 깨짐.
- 본문은 `var(--text-secondary)` (0.85) 이상 사용.

**폰트 floor 12px**
- 11px 이하 폰트 사용 금지.
- 어떤 보조 텍스트도 `var(--fs-caption)` (12px) 이상.

**SVG 텍스트 정렬 주의**
- SVG 내 텍스트는 CSS `text-align`이 아닌 `text-anchor` 속성으로 정렬.
- 다이어그램 노드 = `text-anchor="middle"`, x 좌표 = 카드 중앙.
- 정렬 변경 시 x 좌표도 함께 수정해야 함.
