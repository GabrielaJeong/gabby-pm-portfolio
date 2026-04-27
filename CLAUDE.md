# CLAUDE.md — gabby-pm-portfolio

> ⚠️ **모든 작업 시작 전 반드시 읽고 따를 강제 규칙서.**
> 이 문서의 규칙은 가비님 명시 승인 없이 위반할 수 없습니다.
> 콘텐츠/맥락 정보는 가비님 메시지에서 받습니다.

---

## 0. 작업 시작 전 필수 점검 (매번)

새 작업 시작 시 **반드시** 다음 순서로 진행:

1. **이 CLAUDE.md 끝까지 읽기**
2. **DESIGN_SYSTEM.md 읽기** (디자인 토큰 / 컴포넌트 규칙)
3. **LEARNED.md 읽기** (반복 실수 패턴 — 같은 실수 절대 금지)
4. **메타브 페이지(/metavv/) 직접 참고** — 디자인 시스템의 정답 페이지
5. 작업 시작

위 4단계 중 하나라도 누락 시 작업 결과 거부 사유.

---

## 1. 프로젝트 개요

- **이름**: gabby-pm-portfolio
- **스택**: Vanilla HTML / CSS / JS (프레임워크 없음)
- **배포**: Vercel (GitHub main push 시 자동)
- **폰트**: Pretendard Variable (jsdelivr CDN)

---

## 2. 파일 구조

```
gabby-pm-portfolio/
├── index.html          # 메인 페이지
├── styles.css          # 글로벌 토큰 (--bg, --gold, --space-N 등)
├── components.css      # ★ 공유 컴포넌트 (메타브에서 검증된 모든 케이스 스터디 공통 클래스)
├── nav.js              # 공유 네비게이션 컴포넌트
├── script.js           # 공용 JS
├── reveal.js           # Reveal on Scroll (모든 페이지 공유)
├── expand-toggle.js    # 펼침/접힘 유틸리티 (모든 페이지 공유)
├── CLAUDE.md           # 이 파일 (강제 규칙서)
├── docs/
│   ├── DESIGN_SYSTEM.md    # 디자인 토큰 상세
│   └── LEARNED.md          # 반복 실수 패턴
├── assets/             # 정적 파일 (resume.pdf, profile.jpg)
├── metavv/             # 정답 페이지 — metavv.css = 메타브 전용 스타일만
├── folio/
├── banggooso/
└── momscare/
```

**CSS 임포트 순서 (모든 케이스 스터디 페이지 필수):**
```html
<link rel="stylesheet" href="/styles.css">      <!-- 1. 글로벌 토큰 -->
<link rel="stylesheet" href="/components.css">  <!-- 2. 공유 컴포넌트 -->
<link rel="stylesheet" href="/{page}.css">      <!-- 3. 페이지 전용 -->
```

URL 매핑 (Vercel 자동):
- `/` → 메인
- `/metavv/`, `/folio/`, `/banggooso/`, `/momscare/` → 각 상세

---

## 3. 디자인 시스템 강제 규칙

### 3-1. 컴포넌트 조회 우선순위

새 페이지/컴포넌트 작업 시 **반드시 이 순서로 확인**:

1. **`/components.css` 먼저** — 공유 컴포넌트 목록 확인 (최우선)
2. **메타브 페이지 HTML/CSS** — 동일/유사 패턴 확인
3. **둘 다에 없으면 가비님에게 확인** — 신규 클래스 임의 생성 절대 금지

`/components.css`에 있는 클래스 = 모든 페이지에서 바로 사용 가능.
`/metavv/metavv.css` = 메타브 전용 스타일 (탭 네비, 케이스별 특수 다이어그램 등)만 포함.

메타브 페이지에서 동일 패턴을 찾으면:
- 있으면 그 클래스 그대로 재사용 (rename 금지)
- 없으면 가비님에게 물어볼 것 (새 클래스 임의 생성 금지)

### 3-2. 디자인 토큰만 사용 (하드코딩 금지)

다음은 **모든 작업에서 강제**:

- 색상: `var(--bg)`, `var(--surface)`, `var(--gold)`, `var(--text)`, `var(--text-muted)`, `var(--border)`, `var(--border-strong)`, `var(--text-label-gold)` 등
- 패딩: `var(--card-padding-sm/md/lg)`, `var(--space-1~16)`
- 폰트 크기: `var(--fs-display/h1/h2/h3/body/sub/caption)`
- 라인 하이트: `var(--lh-tight/snug/normal/relaxed)`
- 라운드: `var(--radius-sm/md/lg)`
- 트랜지션: `var(--reveal-duration)`, `var(--reveal-easing)` 등

상세 토큰 정의는 **DESIGN_SYSTEM.md** 및 `styles.css` 참조.

토큰에 없는 값이 필요하면 **신규 토큰을 styles.css에 추가**하고
**가비님에게 알릴 것**. 하드코딩 절대 금지.

### 3-3. 컨테이너화 강제 규칙

⚠️ 가비님이 가장 자주 발견하는 실수 — **컨테이너 누락 / 일관성 깨짐**

모든 영역(section)은 다음 패턴을 따른다:

```html
<section class="[name]-section">
  <!-- 풀폭 background는 section 자체에 -->
  <div class="container">
    <!-- 콘텐츠는 항상 container 안에 -->
  </div>
</section>
```

- `.container`는 max-width + 좌우 padding 제공
- 페이지의 모든 영역 헤더가 동일한 좌우 정렬선에 위치해야 함
- `.container`를 다른 이름으로 만들지 말 것 (`-inner`, `-wrap` 등 신규 클래스 금지)
- 풀폭 배경은 section 자체에 적용, 콘텐츠는 항상 `.container` 안

### 3-4. 카드 정렬 강제 규칙

같은 줄에 있는 카드는:
- `display: grid` + `grid-template-columns: repeat(N, 1fr)` (N = 카드 개수)
- `align-items: stretch` (높이 자동 동일)
- 카드 자체에 `width: 100%`
- 카드 내부 본문 길이가 다르면 `display: flex; flex-direction: column;` + 하단 요소에 `margin-top: auto`

### 3-5. 정렬 규칙

- **다이어그램 노드**: 가운데 정렬 (`text-align: center`)
- **콘텐츠 카드**: 왼쪽 정렬 (`text-align: left`)
- **메트릭/수치 카드**: 왼쪽 정렬 (라벨 → 큰 수치 → 부연 설명)

---

## 4. 신규 클래스 추가 절차

새 클래스를 추가하기 전 **반드시** 다음 점검:

1. 기존 클래스로 표현 가능한가? → 가능하면 재사용
2. 메타브 페이지에 동일/유사 패턴이 있는가? → 있으면 그 클래스 사용
3. 정말 새로 필요한가? → 필요한 이유 가비님에게 보고 후 승인 받기

신규 클래스 임의 생성 시 작업 결과 거부 사유.

---

## 5. 인터랙션 표준

다음 인터랙션은 **모든 페이지가 공유**:

- **Reveal on Scroll**: `reveal.js` 사용. 신규 reveal 로직 만들지 말 것
- **Chart.js**: `charts.js`의 helper 함수 사용. 직접 Chart.js 인스턴스 만들지 말 것
- **Tab 전환** (필요 시): 메타브의 `setupCaseTabs()` 그대로 사용

---

## 6. 메타브 페이지 복제 시 주의 (다른 페이지 작업 시)

- `cases-wrapper` 안에만 탭 네비가 있어야 sticky 범위 제한됨
- `meta-reflection`은 max-width + padding 직접 적용 (case-inner 미사용)
- `project-navigation`은 full-bleed 배경 + `proj-nav-inner`로 콘텐츠 제약
- 탭 있는 페이지만 `setupCaseTabs()` JS 필요
- LEARNED 카드에 출처 라벨 있으면 반드시 flex column + meta-source margin-top: auto

---

## 7. 작업 후 보고 규칙

작업 완료 후 **반드시** 다음을 가비님에게 보고:

1. 위 강제 규칙 모두 통과했는지 (각 항목 ✅/❌)
2. 신규 클래스 추가 여부 (있으면 목록 + 추가 사유)
3. 신규 토큰 추가 여부
4. 하드코딩 잔존 여부 (의도된 one-off만 허용)
5. 메타브 페이지 컴포넌트 재사용 비율
6. **자체 검증 결과 (필수, 5가지)**
   - [검증 1] 하드코딩 색상값: N건
   - [검증 2] 하드코딩 픽셀: N건 (예외 명시)
   - [검증 3] 음수 margin: N건
   - [검증 4] 신규 클래스: N개 (목록 + 사유)
   - [검증 5] !important: N건

⚠️ 자체 검증 누락 시 작업 결과 거부 사유.
⚠️ 검증 5가지의 grep 절차는 LEARNED.md L18 참조.
⚠️ 검증 결과가 ❌인 항목이 있으면 즉시 수정 후 다시 검증.

**push 시 CHANGELOG.md 업데이트 (필수)**:
- 파일: `/CHANGELOG.md`
- 위치: 해당 날짜 섹션 (없으면 새로 생성)
- 형식: `| \`커밋해시\` | 변경 내용 한 줄 요약 |`
- push 전 CHANGELOG.md 커밋 포함할 것

---

## 8. 작업 결과 거부 사유

다음 중 하나라도 발생 시 가비님이 작업 결과를 거부할 수 있음:

- DESIGN_SYSTEM.md 또는 LEARNED.md 또는 메타브 페이지 미참조
- 토큰 무시한 하드코딩
- 신규 클래스 임의 생성
- 컨테이너 패턴 위반
- 카드 정렬 규칙 위반
- LEARNED.md에 명시된 반복 실수 재발생
- **자체 검증 5가지 누락 또는 결과 보고 누락**
- **검증 결과 ❌인 채로 작업 보고**
- **신규 클래스 6개 이상 추가하면서 가비님 승인 미확인**

---

## 9. 인코딩 주의

대화창 첨부 파일의 한글이 `ëìì¤` 같이 깨져 보이면:
- 임의 디코딩 금지
- 즉시 가비님에게 알리고 원본 텍스트 직접 받기