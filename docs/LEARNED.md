# LEARNED.md — 반복 실수 패턴 모음

> ⚠️ 클코는 매 작업 시작 시 이 파일을 반드시 읽는다.
> 여기 명시된 패턴을 또 어기면 작업 결과 거부 사유.

---

## L01. 컨테이너화 누락

**문제**: 새 영역 만들 때 헤더/콘텐츠가 `.container` 밖에 위치해서 좌우 정렬선이 다른 영역과 어긋남.

**증상 예시**: NEXT PROJECT 헤더가 화면 가장자리에 닿아있고, 다른 영역은 정렬되어 있음.

**올바른 패턴**:
```html
<section class="next-section">
  <div class="container">
    <h2>제목</h2>
    <p>본문</p>
  </div>
</section>
```

**금지**:
- 헤더만 `.container` 밖에 두기
- `.container` 대신 `-inner`, `-wrap` 등 신규 클래스 만들기
- section의 padding으로 좌우 정렬 처리하기 (max-width 효과 없음)

---

## L02. 패딩 토큰 무시한 하드코딩

**문제**: 카드/영역 패딩에 px 값 직접 박음 (`padding: 24px 32px` 등).

**올바른 패턴**:
- 카드: `var(--card-padding-sm/md/lg)`
- 영역 간격: `var(--space-N)`

**금지**: px 값 직접 입력. 토큰에 없는 값이 필요하면 styles.css에 신규 토큰 추가 후 사용.

---

## L03. 같은 줄 카드 높이/너비 안 맞음

**문제**: 카드 3개가 한 줄에 있는데 본문 길이가 달라서 카드 높이가 제각각, 또는 너비가 달라짐.

**올바른 패턴**:
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  gap: var(--space-4);
}
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.card-footer {
  margin-top: auto;
}
```

**금지**:
- `grid-template-columns: auto auto auto`
- `align-items: start` (높이 다 다르게 됨)
- 카드 width 안 정해두기

---

## L04. 펼침/접힘 인터랙션의 구분선 노출 문제

**문제**: 펼친 상태에서만 보여야 할 구분선이 접힘 상태에서도 노출됨.

**올바른 패턴**:
- 구분선은 **펼쳐지는 콘텐츠 영역 내부**에 위치
- 접힘 상태에서는 max-height: 0 + overflow: hidden으로 콘텐츠 + 구분선이 함께 사라짐

**금지**: 구분선을 카드 자체에 붙이고 접힘 상태에서도 노출되게 두기.

---

## L05. LEARNED 카드 출처 라벨 정렬 깨짐

**문제**: 같은 줄 LEARNED 카드 본문 길이가 달라서 출처 라벨(CASE 01 / CASE 02 등) 위치가 카드마다 어긋남.

**올바른 패턴**:
```css
.learned-card {
  display: flex;
  flex-direction: column;
}
.learned-card .body { flex: 1; }
.meta-source {
  margin-top: auto;
}
```

**금지**: 출처 라벨에 고정 margin/padding 박아두기.

---

## L06. 펼침 인터랙션 트리거 시각적 약함

**문제**: 펼침 트리거가 우상단 작은 "+" 같은 약한 시그널이라 사용자가 못 알아챔.

**올바른 패턴**:
- 화살표(▼/▲)는 카드 하단 중앙에 배치
- 카드 전체가 클릭 영역 (cursor: pointer)
- 호버 시 카드 전체에 미묘한 효과
- 펼침 시 화살표 회전 애니메이션

**금지**: 작은 "+" 한 글자만 우상단 구석에 두기.

---

## L07. IMPACT 카드 펼침 인터랙션의 그리드 정렬 깨짐

**문제**: 같은 줄 카드 중 하나만 펼치면 그 카드만 길어지고 옆 카드는 그대로라 사용자가 옆 카드는 별 거 없다고 인지.

**올바른 패턴**: 
- IMPACT 같은 요약 메트릭 영역은 펼침 인터랙션 사용 X
- 모든 카드를 처음부터 펼친 상태로 노출
- 카드별 콘텐츠 분량을 비슷하게 맞춤

**금지**: 같은 줄 카드 중 일부만 토글되는 구조.

---

## L08. HERO 영역 상단 공백 과도

**문제**: 글로벌 헤더 아래 콘텐츠까지 공백이 너무 커서 첫 화면에서 메인 콘텐츠가 화면 중앙 이하로 밀림.

**올바른 패턴**:
- HERO 영역 상단 padding은 적정 수준 (`var(--space-8)~--space-12`)
- 첫 화면(viewport 100vh) 안에서 타이틀 + 서브카피 + 메타 그리드까지 자연스럽게 다 보이도록
- 타이틀이 화면 상단 1/3 ~ 1/2 지점에 오도록

**금지**: HERO에 큰 padding-top 박아 첫 화면 밀기.

---

## L09. PPT 같은 페이지에 Scroll 유도 시그널 부재

**문제**: 첫 화면에 콘텐츠 채워졌는데 "더 아래 있다" 시그널 없음.

**올바른 패턴**:
- HERO 하단에 절제된 Scroll 유도 컴포넌트 (↓ + "Scroll to explore")
- bounce 애니메이션 (2~3초 주기)
- 스크롤 시 자연스럽게 fade out
- prefers-reduced-motion 처리

**금지**: PPT 스타일 페이지인데 첫 화면 끝에 시그널 없이 끊기기.

---

## L10. PROBLEM 영역 차트 임팩트 약함

**문제**: 가로 막대 비교 차트는 임팩트 약함. "심각함"이 안 와닿음.

**올바른 패턴**:
- 핵심 메시지를 도넛 차트 + 중앙 큰 수치로 시각화 (예: "비용 회수율 2%")
- 골드(메인) + 미묘한 회색 대비
- 보조 데이터는 작은 글씨로 도넛 옆/아래

**금지**: 막대 차트만으로 끝내기.

---

## L11. 신규 클래스 임의 생성

**문제**: 메타브에 이미 있는 패턴인데도 페이지마다 새 클래스 만듦 (`.bgyk-card`, `.momscare-card` 등).

**올바른 패턴**:
1. 메타브 페이지에서 동일 패턴 찾기
2. 있으면 그 클래스 그대로 사용 (`.impact-card`, `.phase-card` 등)
3. 페이지별 스코프가 정말 필요하면 가비님 승인 후 추가

**금지**: 페이지마다 새 클래스 prefix 만들기.

---

## L12. Reveal on Scroll과 차트 애니메이션 충돌

**문제**: Reveal on Scroll로 차트 컨테이너 등장 → Chart.js 내부 애니메이션이 동시 발동해서 어색함.

**올바른 패턴**:
- Reveal로 컨테이너 등장 → 등장 완료 후 Chart.js 애니메이션 발동
- IntersectionObserver로 차트 영역 진입 감지 후 Chart.js 초기화

**금지**: 페이지 로드 시 Chart.js 즉시 초기화 + Reveal 동시 적용.

---

## L13. SVG 다이어그램 박스 텍스트 정렬 오독

**문제**: "다이어그램 박스 텍스트가 좌측 쏠림"이라는 요청을 레이아웃 구조(2열 그리드) 문제로 오독하여, ctx-grid 전체를 flex-column으로 바꾸는 잘못된 수정을 가함.

**실제 원인**: SVG 내부 텍스트 정렬은 `text-anchor="middle"` + 박스 중앙 x좌표로 이미 처리됨. 레이아웃(2열 그리드) 자체는 올바름.

**올바른 판단 기준**:
- SVG 다이어그램 박스 텍스트 정렬 → `text-anchor="middle"` + x 좌표가 박스 중앙인지 확인
- 레이아웃(2열 그리드) 정렬 → 그리드/플렉스 컨테이너 구조 확인
- "박스가 좌측으로 쏠려 보인다" → 레이아웃 문제인지 SVG 내부 텍스트 문제인지 먼저 구분

**금지**: 텍스트 정렬 요청을 레이아웃 재구조화로 해석해 ctx-grid 같은 의도된 2열 레이아웃을 무너뜨리기.

---

## L14. 신규 클래스 폭발

**문제**: 새 영역/페이지 작업 시 메타브 또는 components.css에 이미 있는 패턴을 무시하고 새 클래스를 대량 생성. 한 페이지에 30+개 신규 클래스가 발견되는 사례.

**증상 예시**:
- LIVE PREVIEW 영역에 `.live-browser-frame`, `.live-browser-bar`, `.live-browser-dots` 등 10+개 신규 클래스
- DESIGN SYSTEM 영역에 `.ds-section`, `.ds-swatches`, `.ds-swatch-color`, `.ds-type-scale` 등 14+개

**올바른 패턴**:
1. 작업 전 메타브 페이지 + components.css 모두 검색
2. 동일/유사 패턴 있으면 그 클래스 그대로 사용 (rename 금지)
3. 진짜 신규로 필요한 경우만 가비님 승인 후 추가
4. 신규 클래스는 페이지별 CSS에만 추가, components.css 오염 금지

**금지**:
- 기존 `.axis-card` 패턴이 있는데 `.ds-component-card` 새로 만들기
- 기존 `.case-block-header` 있는데 다른 영역 헤더용 신규 클래스 만들기
- "이 영역만의 차별점이라서" 라는 이유로 신규 클래스 정당화

---

## L15. 하드코딩 색상값

**문제**: 디자인 토큰(`var(--*)`)을 무시하고 색상 값을 직접 입력.

**증상 예시**:
```css
background: #0A0E17;
background: #131927;
border: 1px solid #2a3a50;
background: rgba(0, 0, 0, 0.72);
box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
```

**올바른 패턴**:
- 모든 색상은 `var(--*)` 토큰 사용
- 토큰에 없는 색상이 필요하면 `styles.css`에 신규 토큰 추가 후 사용
- rgba 투명도도 토큰화 (`--bg-overlay`, `--border-subtle` 등)

**금지**:
- 16진수 색상 직접 입력
- `rgba()` 직접 입력 (글로벌 토큰 외)
- "이 영역만 살짝 다르게" 라며 임의 색상 사용

---

## L16. 음수 margin으로 영역 분리

**문제**: 영역에 풀폭 배경 적용하려고 음수 margin + padding 사용. 컨테이너 패턴 위반.

**증상 예시**:
```css
.case-section[data-section="execution"] {
  margin-left: calc(-1 * var(--space-12));
  margin-right: calc(-1 * var(--space-12));
  padding-left: var(--space-12);
  background: rgba(255, 255, 255, 0.03);
}
```

**올바른 패턴** (LEARNED.md L01 컨테이너화):
```html
<section class="execution-section">  <!-- 풀폭 배경은 section 자체에 -->
  <div class="container">             <!-- 콘텐츠는 항상 .container 안에 -->
    ...
  </div>
</section>
```
```css
.execution-section {
  background: rgba(255, 255, 255, 0.03);
  padding: var(--space-12) 0;
}
```

**금지**:
- 음수 margin으로 콘텐츠 영역 밖으로 빠져나가기
- max-width 컨테이너 깨고 배경 적용하기
- 부모 padding을 음수로 보정하기

---

## L17. 페이지별 CSS의 다른 페이지 CSS 임포트

**문제**: `folio.css`가 `metavv.css`를 임포트하는 구조 — 페이지 전용 CSS가 다른 페이지 전용 CSS에 의존.

**증상 예시**:
```html
<link rel="stylesheet" href="/metavv/metavv.css">
<link rel="stylesheet" href="/folio/folio.css">
```

**올바른 패턴**:
- 공유 컴포넌트는 `components.css`로 분리
- 모든 페이지가 `components.css` 임포트
- 페이지별 CSS는 그 페이지 전용 차별 스타일만
- 페이지 CSS 끼리 의존 관계 없음

**금지**:
- 다른 페이지 CSS 임포트
- 페이지별 CSS에 공유 컴포넌트 정의

---

## L18. CLAUDE.md / LEARNED.md / 메타브 정답 페이지 미참조

**문제**: 작업 메시지 첫 줄에 "CLAUDE.md / LEARNED.md / 메타브 페이지 확인 후 시작" 명시되어 있어도 클코가 무시하고 자기 판단으로 작업 진행.

**증상 예시**:
- CLAUDE.md 토큰 강제 규칙 무시 → 하드코딩 색상값 발생 (L15)
- LEARNED.md L01 컨테이너화 무시 → 음수 margin 사용 (L16)
- 메타브 정답 페이지 패턴 무시 → 신규 클래스 폭발 (L14)

**올바른 패턴**:
- 작업 시작 전 반드시 CLAUDE.md 0번 항목 준수
- 4단계 점검 완료 보고 후 작업 시작
- 작업 중 의문 발생 시 임의 판단 금지, 가비님에게 확인

**금지**:
- "확인 완료"라고 보고만 하고 실제로는 안 읽음
- 새 작업이라고 강제 규칙 무시
- 시간 절약 위해 점검 단계 건너뛰기