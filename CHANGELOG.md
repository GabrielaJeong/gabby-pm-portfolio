# CHANGELOG

> 작업마다 push 시 이 파일에 기록합니다.
> 형식: `날짜 | 커밋 | 변경 내용`

---

## 2026-06-12

| 커밋 | 변경 내용 |
|---|---|
| `76b93c0` | feat(moodyfit): 프론트 데모(moodyfit-alpha.vercel.app) iframe 임베드 — 폰 비율(390×844), '새 창에서 열기'+프론트 전용 안내. 페이지 전용 moodyfit.css 신설, 히어로 문구 데모 안내로 조정 |
| `6803715` | content: 도메인 표기 'B2C SaaS' → 'B2B·B2C SaaS' (홈 히어로 타이프라이터 + /work/ 메타) — B2B/B2C 둘 다 수행 반영 |
| `03eb0de` | content(banggooso): 사이드 케이스 콘텐츠를 '기획에 참여한 …(50만)·…(16만)'으로 정정 — 사용자 참여수처럼 읽히던 표현을 PM 기획 참여 역할로 명확화 |
| `79a73a7` | style(work): #selected-work(.proj-section) 상단 패딩 116→80px 축소(하단 유지) |
| `5ef7f02` | redesign(metavv): STRATEGY를 '공통 자산 → 3 수익축' 다이어그램(revenue-tree)으로 레이아웃 피벗 — 하단 베이스(메타브·80만 유저·월 30만 UV)에서 3축이 뻗는 구조로 '하나의 자산을 빠짐없이 수익화' 시각화. 신규 클래스 7 |
| `06512e6` | redesign(metavv): CASE 01 STRATEGY를 '빠짐없는 수익 설계'로 재구성 — 카드 라벨 AXIS→수익원(기존 유저/신규 고객/무료 트래픽), 완결성 서브카피, 중복 PHASE 타임라인 제거 + 죽은 axis-timeline CSS 정리 |
| `084234d` | style(metavv): CASE 02 STRATEGY 타이틀 '전체 문의 중 17%를 차지한 CS의 원인' 골드 색강조 |
| `43537c5` | fix(metavv): CASE 02 RESULT 메트릭 줄바꿈 깨짐 수정(.result-num word-break:keep-all + '감소' small 스팬, '투입 최소화'→'최소화') + 타이틀 'UX 변경만으로 CS를 80% 감소시키다' 골드 색강조 |
| `3cff1fc` | fix(case): 본문 페이지 상단정렬 통일(.case-main flex-start, 히어로만 .is-hero-page 중앙정렬) — 짧은 메타 리플렉션이 가운데로 내려 상단 공백이 페이지마다 달랐던 문제 해소(banggooso 위치 기준). + momscare impact 페이지 IMPACT↔collab 과한 갭 정리 |
| `98ff3e0` | style(case): 섹션 페이지 번호(.case-section-num 02/03/04) 전 케이스 제거(metavv/banggooso/momscare 각 3개) + 죽은 CSS 정리. 지표 수치는 유지 |
| `33634de` | refactor(momscare): IMPACT(KPI)를 Collab과 합쳐 impact 페이지로 재구성, 원래 impact 페이지(CONTEXT+PROBLEM)는 context로 변경. toc: top/context/main-case/impact/reflection |
| `7e226ac` | docs(convention): 케이스 페이지(pages 모드) 레이아웃 규약 확립 — CASE PAGE LAYOUT 토큰 그룹화 + --case-block-gap 신설(100px 토큰화·값 보존), CLAUDE.md §6-2 강제 규약(절대규칙+체크리스트+grep), DESIGN_SYSTEM.md §9 모델. 현재 코드 규약 준수 확인 |
| `79cf65d` | fix(case): banggooso main-case-intro border-top(선) 제거+여백 축소, PROBLEM 후행 선/여백 정리(:has) + 히어로↔flip 간격 복원(.case-hero.toc-page-tail 예외, toc-page-tail 회귀 수정) + momscare STRATEGY 아래 표지 이미지 추가(reveal+플로트 애니메이션, .momscare-cover) |
| `a994af2` | fix(metavv): flip 버튼 gap(space-3) 추가 + .toc-page-tail(마지막 블록 후행 border/padding/margin 리셋)로 #impact·#problem 버튼 위 선·잉여패딩 제거 + 미니탭 라벨 CASE A/B→A/B & .mini-tab-nav 목차바 아래 sticky 고정 |
| `fcf04e9` | fix(in-page-nav): 비활성 회색 점이 반투명(0.45)이라 뒤 진행 라인이 비치던 문제 — 같은 회색을 --bg 위에 합성해 완전 불투명화(라인 비침 제거) |
| `e2a8360` | docs(learned): L25 추가(가시성 모델 전환 시 스캐폴딩 유령 여백 반성+점검 절차) + 전체 코드 유령 패딩 감사(folio 2건 외 없음, metavv case-block은 부모 토글로 안전) + folio 히어로 서브카피 수정 |
| `456d4c1` | fix(folio): 히어로↔flip 간격이 metavv와 달랐던 원인 제거 — .live-preview-section + .case-inner padding-top(64px)이 Intro에서 빈 래퍼에 유령 공간을 남겨 flip을 밀어냄(L24 스크롤 잔재). 제거하여 전 페이지 간격 일관화 |
| `6baac50` | refactor(case-hero): --nav-h 근사값(62px)을 case-toc.js의 nav 실측값으로 동기화(setProperty) — 본문 세로 중앙정렬 계산이 정확/반응형. nav 자체는 미수정(부작용 없음), 토큰은 폴백 유지 |
| `463cf30` | refactor(case-hero): 히어로 공유 컴포넌트 완전 토큰화 — 하드코딩(font-size 72/18px, max-width 820/720px) 제거. 신규 토큰 --fs-case-title/--measure-summary, summary max-width 이중정의 통합, 죽은 .case-hero-visual* CSS·folio 중복 word-break 제거. 히어로 규칙 하드코딩 px 0건 |
| `70a0667` | fix(case-hero): folio 등 히어로가 위로 붙던 잔여 문제 — [히어로+flip] 묶음이 뷰포트보다 살짝 커 상단 정렬 폴백되던 것을, 큰 여백 축소(flip 패딩·히어로↔메타 간격·메타 패딩)로 ~64px 줄여 중앙정렬 유도 |
| `86d8e0a` | fix(case-hero): 짧은 히어로(folio)에서 flip 버튼이 너무 아래로 가던 문제 — 히어로를 뷰포트만큼 키우는 대신 .case-main이 [히어로+flip]을 한 묶음으로 뷰포트 중앙(justify-content: safe center)에 배치, 내용 길면 상단 정렬 폴백. --case-flip-h 토큰 제거 |
| `bee3b89` | style(case-hero): pages 히어로를 뷰포트 세로 중앙으로(min-height 100svh-nav-목차바-갭-flip + flex center) — 메뉴에 붙던 문제·하단 flip 버튼 가림 해소. 메타 4항목 가운데 정렬(text-align center), 'Scroll to explore' 제거, 고아 border-bottom/margin-bottom 제거. 신규 토큰 --nav-h/--case-flip-h |
| `e5db932` | feat(metavv): Intro에 묶여있던 히어로/임팩트/컨텍스트/문제를 페이지로 분리(banggooso 패턴) — toc: Intro(히어로 단독)/Impact(임팩트 대시보드+컨텍스트)/Problem/Case 01/02/03/Reflection |
| `6250d43` | fix(banggooso-hero): 타이틀 'B2B 협업 자산으로 전환하다' 한 줄로(2줄 구성) + 서브카피 '플랫폼에서' 뒤 줄바꿈으로 '가졌습니다.' 오펀 해소. .case-title/.case-summary에 word-break: keep-all 전역 추가(한글 어절 단위 줄바꿈) |
| `393555c` | fix(subbar): work 서브바 ↔ 케이스 목차바 하단 구분선 위치 통일 — 두 바 높이(48 vs 52px) 불일치를 공통 토큰 --subbar-height(48px)로 통일(세로 패딩 제거+min-height+가운데 정렬) |
| `ca70c1d` | feat(metavv): Cases 내부 탭(CASE 01/02/03)을 목차바 독립 페이지로 분리 — 이중 네비 제거, 각 case-content에 id+data-page 부여(Intro/Case 01/02/03/Reflection), 탭 네비·죽은 탭 CSS 제거, cases-wrapper는 구조용 패스스루로(빈 페이지 띠 방지) |
| `47faa00` | fix(case-toc): 목차바↔첫 컴포넌트 갭을 단일 토큰(--case-content-top, 40px)으로 통일 + pages 모드 첫 블록의 고아 선행 구분선/빈 띠 제거(.toc-page-lead가 margin/padding/border-top 리셋). 페이지별 제각각 갭(48/80px)→40px. 신규 토큰 1·신규 클래스 1(.toc-page-lead). LEARNED L24 |
| `4854d91` | content(moodyfit): 준비 중 안내에 제품 한 줄 소개 추가 — '가중치와 LLM을 활용한 추천 시스템을 접목한 멀티 패션 커머스 앱' |
| `88303b9` | fix(case-hero): 히어로 텍스트가 페이지 중앙이 아닌 좌측으로 치우치던 문제 수정 — 페이지별 CSS(metavv/folio/momscare)가 .case-hero-grid를 2단(이미지 자리)으로 오버라이드해 텍스트가 좌측 칸 안에서만 가운데 정렬됐던 것을 단일 컬럼(1fr)로 통일, justify-items 제거, 죽은 목업 규칙 정리(banggooso 포함) |
| `deefb20` | fix(folio): pages 모드에서 'WHY ENGINEERING RIGOR' 블록이 전 페이지에 노출되던 버그 — .case-inner로만 감싸져 data-page 미부여(토글 제외)였던 것을 data-page=engineering로 귀속 |
| `92c89f6` | fix(case-hero): 중앙정렬 후 타이틀 오펀 줄바꿈 수정 — case-hero-text max-width 780px(2컬럼 잔재) 제거→100%, summary만 720px 가독 폭 유지. LEARNED L23(정렬 변경=폭·줄바꿈·정렬선 3종 점검) 기록 |
| `229a07d` | feat(case-toc): metavv/folio/momscare에 책-페이지 모드(data-toc-mode=pages) 적용 — 블록별 data-page 태깅으로 한 번에 한 페이지만 표시. metavv Intro(히어로·임팩트·컨텍스트·문제)/Cases(탭 전체)/Reflection, folio Why에 How·What·Features 묶음, momscare Impact에 컨텍스트·문제 묶음 |
| `63d265a` | refactor(case): NEXT PROJECT 블록 + 'Next' 목차 항목 제거(4개 케이스 페이지) — 페이지 구조 변경으로 페이지 간 NEXT 네비 불필요 |
| `46f7eac` | style(case-hero): 케이스 히어로 디바이스 목업 이미지 제거 + 헤더/서브헤더 중앙정렬(case-hero-grid 1컬럼·case-hero-text 가운데). 목업은 추후 직접 구성 예정 |

---

## 2026-06-03

| 커밋 | 변경 내용 |
|---|---|
| `64aff34` | feat(hero): 홈 히어로 기술/에디토리얼 무드 재구성(브랜드 유지) — 초대형 'PRODUCT MANAGER' 타이포 + 모노스페이스 어노테이션(eyebrow·좌표·상태라인) + 데코 레이더(SVG) + 라이브 시계(KST). 대표 수치 pill 유지, 옛 슬로건/요약/푸터 클래스 제거 |
| `17f1d08` | fix(work): Work 드롭다운(42dc41b)을 되돌리고 /work/ 전용 제품 서브탭 바(.work-subnav, nav 아래)로 변경 — MAIN/SIDE 제품 바로가기. nav Work 일반 링크 복구로 메뉴 정렬 문제 해소 |
| `42dc41b` | refactor(ia): How I Work·Track Record를 /work/→/about/ 이동(About=나+역량+이력, Work=제품만), nav Work를 Main/Side 제품 드롭다운으로(데스크탑 hover + 모바일 드로어 아코디언, Work 토글은 /work/), 홈 About/Work 입구 카드 섹션 삭제(홈=Hero) |
| `eadba3a` | feat(contact): Contact를 별도 페이지(/contact/)로 분리 — 홈 Contact 섹션을 /contact/로 이동(홈=Hero+About/Work 입구), nav Contact를 /contact/ 페이지 링크로(경로 active), 6386840의 우측 분리 되돌림. Contact가 홈 스크롤 앵커가 아니게 되어 고정 선택 문제 해소. CLAUDE.md 구조/URL 갱신 |
| `6386840` | fix(nav): Contact 고정 선택 버그 제거 — 스크롤 활성-밑줄 옵저버(이탈 시 미해제)가 잔재로 Contact만 고정시키던 것 삭제, Contact를 About/Work 메뉴에서 빼 우측 별도 링크(.nav-contact)로 분리 |
| `45f626b` | fix(case-toc): 떠있던 백링크를 목차바로 통합(좌측 백링크 + 우측 정렬 메뉴, 4개 토크 페이지 공통) + banggooso CONTEXT를 IMPACT 앞으로(무엇인가→성과 흐름). banggooso HERO scroll-indicator 제거 + CONTEXT를 Impact 페이지로(1e7bf52) |
| `322d8bc` | feat(case-toc): 책-페이지 모드(data-toc-mode=pages) 추가 — 한 번에 한 섹션만 표시 + 상단 목차/하단 prev·next 넘김. banggooso 프로토타입 적용(블록 12개 data-page 태깅). 'Top'→'Intro' 라벨도 변경(8516d99). metavv/folio/momscare는 스크롤 모드 유지(추후 확장) |
| `b3c8486` | feat(case-toc): 케이스 페이지 상단 고정 섹션 목차바 추가 — 글로벌 nav 아래 sticky, scroll-spy 현재 섹션 강조 + 클릭 점프. metavv/folio/banggooso/momscare에 적용, 기존 플로팅 닷 네비 대체. case-main padding-top 조정 |
| `5457abe` | refactor(work): /work/ 지표 3중 중복 정리 — How I Work을 지표·서사 정본으로, Track Record는 골드 지표 강조 빼고 스코프 중심 이력으로 슬림(7개 유지), Selected Work 카드는 티저 유지 |
| `cef3413` | feat(theme): 라이트 모드를 케이스(프로덕트) 페이지까지 확장 — components/페이지 CSS 테마색 RGB 채널 토큰화(다크 무변화), --shadow-rgb 채널 추가, metavv 차트 accent CSS 변수 연동(라이트=블루), 케이스 5개 FOUC 스크립트, nav 토글 전역화. metavv --mv-*·folio 네이비 데모는 고정 |
| `e35ac73` | refactor(ia): 홈을 ABOUT/WORK 별도 페이지로 분리 — `/about/`(포지셔닝·타임라인·Q&A) + `/work/`(Selected Work→How I Work→Track Record) 신규, index는 Hero+입구 카드 2개+Contact로 슬림화, nav를 About·Work·Contact 3축으로 재작성(Main/Side 드롭다운 대체), 테마 토글 about/work까지 확대, 케이스 back-link /#work→/work/, 전역 02–06 번호 폐기. 신규 클래스 7(입구 카드) |
| `d9d3a0e` | style(layout): 화면 스케일 가볍게 압축 — 콘텐츠 폭 1440→1280px(전역), 홈 섹션 세로 패딩 160→116px(about/cap/proj/exp/contact). 타이포 유지 |
| `bf5de42` | style(theme): 라이트 모드 배경을 화이트에 더 가깝게 (#f5f8fc → #fafcfe), 쿨 틴트 약화 + nav 오버레이 동기화 |
| `5ab3659` | style(theme): 라이트 모드 팔레트 웜 골드 → 쿨 블루(소프트 화이트 #f5f8fc + 블루 악센트 #3A6FB0 + 딥 슬레이트). 채널 값만 교체로 호버/보더/그라데이션 자동 반영 |
| `ee64443` | feat(theme): 라이트 모드 추가(홈 전용) — 색상을 RGB 채널 토큰(--fg-rgb/--gold-rgb/--border-rgb/--overlay-rgb)으로 재구성하고 본문 하드코딩 색 ~40곳 토큰화(다크 무변화), [data-theme=light] 팔레트(웜 오프화이트+진한 골드 #B07A3C), nav 토글 버튼·script.js 핸들러·index.html FOUC 인라인 스크립트. 케이스 페이지는 다크 전용 유지 |
| `01e29f3` | fix(about): 타임라인이 길어지면 Q&A와 붙던 간격 버그 수정 — .qa-label margin-top 80px(모바일 56px)로 about-grid↔Q&A 명시 분리(사진 컬럼 높이 의존 제거) + LEARNED.md L22 추가 |
| `3cedf23` | feat(about): 타임라인에 '2026 — 현재 · AI 프로덕트 빌드' 항목 추가(current 이동) — 사이드 프로젝트에 AI PM 확장 서사 연결, about 인트로/캡션 문구 업데이트 + 고아 </span> 정리 |
| `e897212` | refactor(projects): 케이스 페이지 프로젝트 라벨을 전역 PROJECT 0X → MAIN/SIDE PRODUCT 카테고리로 통일(HERO 태그 5곳 + NEXT PROJECT 4블록), NEXT에 Moodyfit 포함해 5개 cross-link(각 페이지 나머지 4개), metavv NEXT href 버그 교정(/#work→직접 링크), block-label OTHER PROJECTS→NEXT PROJECT, .project-nav-grid 3→4열+반응형 |
| `b4d8b5b` | feat(moodyfit): Moodyfit '준비 중' 임시 페이지 추가(case-page 셸 재사용, 신규 클래스 0) + Side Product 드롭다운·모바일 드로어 연결 + Work SIDE PRODUCT 그룹에 Moodyfit 카드(COMING SOON) 추가 |
| `2f70ad0` | fix(nav): 메타브 메뉴 라벨 '메타브/메타브 스튜디오'→'메타브'로 단축 (드롭다운 폭 절약) |
| `05f4186` | fix(nav): Main Product 메뉴 항목 한글화 (Metavv→메타브/메타브 스튜디오, Banggooso→방구석연구소, Momscare→맘스케어) — 데스크탑+모바일, Side의 Folio는 유지 |
| `54f6be2` | feat(nav): 글로벌 nav의 단일 Work 드롭다운을 top-level 'Main Product▾'(메타브·방구석·맘스케어) / 'Side Product▾'(Folio) 두 메뉴로 분리 (데스크탑+모바일 드로어) — 메뉴 레벨에서 본업/사이드 구분 노출, script.js 다중 .drawer-work 아코디언 지원, 드롭다운 내부 그룹 라벨 클래스 제거 |
| `23cc5a5` | feat(work): Work를 MAIN PRODUCT(메타브·방구석·맘스케어) / SIDE PRODUCT(Folio)로 분리 — 라벨 그룹 2개 스택 + 글로벌 nav 드롭다운·모바일 드로어에 그룹 라벨, .proj-grid 4→3열, 신규 클래스 4개(.proj-group/.proj-group-label/.nav-dropdown-group/.drawer-work-group), Moodyfit는 추후 Side에 추가 |
| `e2204af` | fix(nav): 글로벌 nav 활성 밑줄이 존재하지 않는 `data-section`을 참조해 항상 미동작하던 버그 수정 (href 해시 매칭으로 변경) + 중복/TDZ `.drawer-work-sub a` 핸들러 제거 + hamburger null 가드 / in-page-nav 디버그 console.log 제거 / index.html script.js 경로 절대화 / 하네스 독스 정합화(CLAUDE.md charts.js·in-page-nav.js, README 로컬 서버 필수) |

## 2026-04-29

| 커밋 | 변경 내용 |
|---|---|
| `8d186ee` | fix(hero-metrics): 텍스트 깨짐/공백 해결 — weight 통일(색만 강조), letter-spacing 0, tabular-nums, gold 앞 공백 &nbsp; |
| `cedef68` | fix(hero): slogan 폰트 88→72px (큰 화면 가독성 회복), 태그 gold weight 700→600 (Pretendard 단차 완화로 텍스트 깨짐 해소) |
| `2bd4ebb` | fix(hero-metrics): 수치 3개를 pill 태그로 시각 강조 (gold tint 배경 + 1px border + 999px radius) |
| `cde483d` | feat(hero): 메인 히어로 카피·정보 구조 재설계 — 'h1 + 수치 3개 + 도메인 요약' 첫 화면 노출, '심리학의 시선' → '사용자 행동을 읽고, 수익 구조' 톤 전환 |
| `1b30d6b` | fix(banggooso-hero): h1 'B2B 협업 자산으로 / 전환하다' 줄바꿈, summary '다층 책임' → '다층적인 책임을 가졌습니다' |
| `78fc13d` | fix(content): Folio 상단 '바이브 코딩' → 'AI 코딩 도구' 프로페셔널화 (본문 VIBE CODING TRAP 서사는 유지), 방구석연구소 제목 '운영하다' → '유휴 콘텐츠 IP를 B2B 협업 자산으로 전환하다' |
| `d8b904b` | fix(contact): 메인 Contact 카피 범용화 ('패스오더의 사이클' → '제품의 다음 사이클') + PM 정체성 1줄 강화 |
| `968a674` | fix(content): 사실 정합성 1단계 — 방구석연구소 회원 30만/UV 70~120만 통일, 타임라인 '2024—현재' → '2024—2025', 맘스케어 '후원사 3곳' → '3개 이해관계자' 표현 정확화 |
| `9490b9f` | fix(folio-hero): case-title 60→72px로 다른 케이스 페이지와 통일 |
| `9e33e45` | feat(folio-in-page-nav): nav 항목 5→9개로 확장 (Why / Decisions / Documents / Engineering 추가) |
| `9b484a8` | feat(in-page-nav): folio/banggooso/momscare 페이지 적용 (Phase 2 마무리) |
| `7d20376` | fix(in-page-nav): page bottom 도달 시 마지막 항목 강제 활성 fallback (NEXT 섹션 활성 안 되는 사각지대 해결) |
| `3c5dde2` | fix(in-page-nav): 라인 endpoint를 JS로 실측 (CSS calc이 라벨 line-height 영향으로 점 위 ~3px '꼭다리' 발생) |
| `bab08ab` | fix(in-page-nav): 진행 라인 시작/끝점을 첫·마지막 점 중앙으로 맞춤 (라인이 점 위로 삐져나오는 문제 해결) |
| `47e95cc` | fix(in-page-nav): 활성 이전 점에 .is-passed 클래스 부여 → 골드로 채워서 진행 라인과 시각 연속 |
| `ad89758` | fix(in-page-nav): 비활성 dot도 채워진 점으로 변경 (활성→비활성 전환 시 '비어있는 원' 느낌 해결) |
| `a29cac2` | feat(in-page-nav): 세로 라인 진행도 + 활성 점 ring pulse + 메타브 페이지 적용 (Phase 2: Top/Cases/Reflection/Next) |
| `79f9282` | refactor(in-page-nav): Work sub-tier 제거 — 프로젝트는 별도 페이지라 in-page anchor와 의미 충돌 |
| `9b8fa29` | fix(in-page-nav): CSS를 components.css → styles.css로 이동 (메인 홈은 components.css 미임포트라서 스타일 미적용 문제 해결) |
| `2b08a05` | debug(in-page-nav): console 로깅 추가 |
| `51b1f5f` | feat: in-page-nav 컴포넌트 추가 (floating side nav, dot→hover로 라벨+sub-tier 펼침, scroll-spy + smooth scroll) — 메인 홈 적용, JSON config 기반 재사용 가능 |
| `4cbbc87` | index: ABOUT 영역 프로필 사진(.about-photo img) 하단 페이드아웃(mask-image) |
| `cdfbe0a` | components: HERO 디바이스 목업 직접 자식 img 하단 페이드아웃(mask-image) — 이미지 잘림 자연스럽게 (folio 폰 mockup 영향 없음) |
| `5c61625` | folio: DESIGN SYSTEM 컴포넌트 demo 높이를 고정값(absolute, 240px)으로 — 콘텐츠 변화에 무관한 카탈로그 일관성 + 직전 max-width 되돌림 |
| `6d64782` | folio: DESIGN SYSTEM Input/Send demo 폭 제한 (max-width 260px) — 다른 카드와 비례 맞춤 (다음 커밋에서 되돌림) |
| `67398e4` | folio: DESIGN SYSTEM 컴포넌트 demo 높이 자동 동일화 (flex:1 + min-height 200px) — Character Card 키워진 후 시각적 비대칭 해결 (다음 커밋에서 height 고정으로 변경) |

## 2026-04-28

| 커밋 | 변경 내용 |
|---|---|
| `69de718` | folio: DESIGN SYSTEM Character Card 미니데모를 실제 folio 앱 구조에 맞게 재구성 (번호+상태배지+태그오버레이+외부정보) |
| `d080074` | folio: DESIGN SYSTEM 섹션 UX 고도화 — 색상 시멘틱 그룹화 + 타이포 위계 강화 + 컴포넌트 시각화, 인라인 하드코딩 12건 제거 |
| `48dcb63` | metavv: CASE 02 EXECUTION 블록 margin-top 32px, margin-bottom 64px 적용 |
| `a199d05` | metavv: CASE 02 EXECUTION 화면 갤러리 위치를 카드 그리드 위로 이동 |
| `a0931dc` | metavv: CASE 02 EXECUTION 카드 그리드 아래 화면 갤러리 추가 (이미지 4장, 신규 클래스 4개) |
| (pending) | metavv: TRY IT 컴포넌트 크기 조정 — max-width 900px, 좌측 300px 고정 |
| (pending) | metavv: TRY IT CSS → metavv.studio 변수 기반으로 전환 (--mv-* 스코프) |
| `fda5ed1` | metavv: TRY IT · IMAGE CUSTOM UI 재설계 — 실제 제품 스크린샷 기반 |
| `928accf` | metavv: TRY IT · IMAGE CUSTOM 위치 이동 → Case 03 EXECUTION 직후로 이동 |
| `11f540c` | metavv: TRY IT · IMAGE CUSTOM 미니 인터랙티브 컴포넌트 추가 (EXECUTION 직후) |
| `11f540c` | banggooso: SIDE CASES → 메인카드(SIDE 02) + 보조 3열(01·03·04) 구조 재설계 |
| `b386319` | banggooso: HERO 이미지 하단 클립 100px |
| `fe47af3` | banggooso: HERO 이미지 하단 50px 클립 |
| `29e1d87` | momscare: HERO 이미지 width 400px |
| `4a91f16` | banggooso: HERO 이미지 width 400px |
| `ba8ade5` | banggooso/momscare: HERO 디바이스 목업 패턴 적용 |
| `b365d27` | case-main padding-top 80→60px, scroll-indicator margin-top 50px |
| `011d32b` | metavv: HERO 이미지 translateX 95px + index.html |
| `7a24aa7` | metavv: HERO 이미지 translateX 105px |
| `931528a` | metavv: HERO 이미지 translateX 115px |
| `33fd058` | metavv: HERO 이미지 translateX 120px |
| `7612b38` | metavv: HERO 이미지 translateY -2px |
| `190972f` | metavv: HERO 이미지 translateY -5px |
| `f1379e2` | metavv: HERO 이미지 translateY -8px |
| `bca6790` | metavv: HERO grid 비율 1.3fr 1fr |
| `54b57a2` | metavv: HERO tags+h1 grid 안으로, align-items:start |
| `c7fb8fc` | metavv: HERO 이미지 translateX 125px, translateY -30px |
| `9944675` | metavv: HERO h1 전체 너비 |
| `51d6daa` | metavv: HERO grid 복원 + h1 word-break |
| `5637f9e` | metavv: HERO 이미지 절대위치 |
| `41532f9` | metavv: HERO grid 비율 1fr 1.3fr |
| `2a39bd9` | metavv: HERO 이미지 offset 110px |
| `f681308` | metavv: HERO 이미지 150px 이동 + overflow clip |
| `12b6252` | assets/hero: 디바이스 목업 이미지 4개 추가 |
| `afb9295` | metavv: HERO 디바이스 목업 이미지 추가 (좌우 2단) |
| `f20a7e7` | 이미지 자산 /assets 폴더 통합 정리 |
| `5b452d0` | banggooso: index.html 업데이트 |

---

## 2026-04-27

| 커밋 | 변경 내용 |
|---|---|
| `2f6db3e` | folio: 콘텐츠 업데이트 (WHY/HOW 본문, case-summary 줄바꿈) |
| `fdbc4a4` | folio: Live Preview 위 구분선 제거 |
| `3c109e4` | folio: FEATURES h3 아래 빈 block-sub 추가 (헤더 패딩) |
| `81626e3` | folio: WHY ENGINEERING RIGOR ↔ DESIGN SYSTEM 순서 교체 + ds-section border-bottom 제거 |
| `cfbd891` | folio: exec-tradeoff-list → 다음 섹션 간격 추가 |
| `be5755c` | folio: engineering 카드 첫 번째 자동 펼침 비활성화 |
| `11c4778` | folio: ENGINEERING RIGOR exec-phase-detail 내부 간격 추가 |
| `2544609` | 메인 프로젝트 카드 업데이트 (카카오뱅크→방구석연구소, 메타브\|스튜디오) |
| `3e3d05e` | 전 페이지: Banggooso → 방구석연구소 (프로젝트 네비 카드) |
| `f0ca946` | folio: meta-reflection 상단 구분선 제거 |
| `4138926` | folio: case-section margin-bottom 100px 제거 |
| `938d5db` | folio: ENGINEERING RIGOR 하단 구분선 제거 |
| `bf2af86` | folio: LEARNED 영역 메타브 META REFLECTION 패턴으로 교체 |
| `fd62962` | folio: ENGINEERING RIGOR 아코디언 카드 2×2 그리드로 변경 |
| `ef43e25` | folio: ENGINEERING RIGOR 섹션 내 컨테이너 간격 추가 |
| `1c521a2` | folio: '왜 PM이 여기까지 했는가' 서브 텍스트 추가 |
| `2b6ff9b` | metavv: exec-phase-card 첫 번째 카드 자동 펼침 비활성화 |
| `3910e14` | folio: case-section border-bottom 제거 + KEY DECISIONS 상단 패딩 확보 |
| `b0f0f68` | folio: case-section 내 case-block 상단 여백 추가 |
| `206e001` | folio: MODEL VALIDATION 카드 폰트 크기 통일 |
| `5b43e9c` | folio: WHAT 섹션 impact-metric-grid 4열로 변경 |
| `e083231` | folio: live-preview border-bottom 제거 + WHY 섹션 상단 패딩 추가 |
| `d7de237` | folio: 섹션 배경색 통일 |
| `f8a3367` | folio: iframe 배율 85%로 축소 |
| `9276b67` | folio: HERO Open Live Demo 버튼 제거 |
| `c161ea9` | folio: LIVE PREVIEW iframe 임베드 전환 + SECURITY CSP frame-ancestors 추가 |
| `b966a7d` | LEARNED.md: L13~L17 재배치 + L19 이동 |
| `d939d55` | CLAUDE.md + LEARNED.md: 자체 검증 5가지 강제화 |
| `48678a3` | components.css 분리 + LEARNED.md L14-L18 추가 |
| `98dbd62` | folio: ENGINEERING RIGOR 영역 추가 |
| `26d4c9e` | folio: DESIGN SYSTEM 섹션 실제 Folio 디자인 시스템 값으로 업데이트 |
| `638988a` | folio: PRODUCT DOCUMENTS 영역 상세 업데이트 (이미지 경로, 상세 설명) |
| `7275812` | folio: PRODUCT DOCUMENTS 영역 추가 |
| `c588b9a` | 메인: 프로젝트 카드 4열 한줄 레이아웃으로 변경 |
| `c348997` | nav 로고 Gabriela 변경 + hero-label 위치 수정 |
| `110b863` | assets/ 폴더 생성, resume.pdf · profile.jpg 이동 |
| `bc1e9f3` | nav.js: 네비게이션 컴포넌트화 (5개 HTML 공통화) |
| `f0fdef5` | 방구석/맘스케어/folio: 메타브 정답 페이지 패턴으로 리팩토링 |
| `0717974` | 전 페이지 nav: 방구석연구소→Banggooso, bgyk→banggooso 파일명 통일 |
| `049d7eb` | 전 페이지 case-tag primary PROJECT 넘버링 통일 |

---

## 2026-04-26

| 커밋 | 변경 내용 |
|---|---|
| `26d4c9e` | folio: DESIGN SYSTEM 섹션 실제 값으로 업데이트 |
| `572415f` | folio: PRODUCT DOCUMENTS placeholder → 실제 이미지로 교체 |
| `a8289a5` | folio: PRODUCT DOCUMENTS 미리보기 이미지 추가 |
| `df59749` | folio: prd-toc.png → prd-doc.png 파일명 수정 |
| `9e0ca12` | folio/docs 폴더 생성 (스크린샷 업로드 경로) |
| `638988a` | folio: PRODUCT DOCUMENTS 영역 상세 업데이트 |
| `7275812` | folio: PRODUCT DOCUMENTS 영역 추가 |
| `c588b9a` | projects 카드 4열 한줄 레이아웃으로 변경 |
| `c348997` | nav 로고 Gabriela 변경 + hero-label 위치 수정 |
| `110b863` | assets/ 폴더 생성, 정적 파일 이동 |
| `e998338` | index.html: 기존 nav 블록 제거 (nav.js로 대체) |
| `bc1e9f3` | nav.js: 네비게이션 컴포넌트화 (5개 HTML 공통화) |
| `39f8b38` | momscare/folio: 헤더 하단 빈 sub + proj-nav-inner→row 수정 |
| `ea0c26f` | banggooso: REFLECTION·NEXT PROJECT h2 아래 빈 sub 추가 |
| `42ef96e` | banggooso: 헤더/컨테이너/카드 일관성 수정 |
| `bd0dd57` | banggooso: IMPACT 첫 카드 숫자 크기 통일 (result-num--sm 제거) |
| `0717974` | nav 통일: 방구석연구소 → Banggooso, bgyk → banggooso |
| `049d7eb` | 전 페이지 case-tag primary PROJECT 넘버링 통일 |
| `f0fdef5` | 방구석/맘스케어/folio: 메타브 정답 페이지 패턴으로 리팩토링 |
| `9702fe2` | metavv: 날짜 범위·V1/V2 라벨 em dash 복원 |
| `1796abc` | metavv: em dash(—) 전체 쉼표(,)로 교체 (22곳) |
| `85c4cb2` | metavv: exec-tradeoff-list 다음 exec-detail-body 상단 여백 추가 |
| `7d243a4` | metavv: PHASE 2 캔버스 레이아웃 재조정 |
| `17c0967` | metavv: PHASE 2 사업 캔버스 구조 적용 |
| `c6463d2` | metavv: PHASE 1/2/3 흐름도 아코디언 통합 |
| `099f9aa` | metavv: Tab1 EXECUTION 영역 배경 톤·보더로 챕터 분리 강화 |
| `17cf13f` | metavv: PHASE 1 의사결정 흐름도 시안 + STRATEGY 결론 박스 제거 |
| `7039350` | metavv: STRATEGY 결론 캡션 → Before/After 결론 박스로 강화 |
| `566e524` | metavv: EXECUTION 3단계 시각 위계 강화 |
| `010daa5` | metavv: AXIS 02 태그 추가 — 간접 마케팅 효과 |
| `937d741` | metavv: AXIS 카드 bullet → exec-step 태그로 변경 |
| `7849dfb` | metavv: Tab1 STRATEGY 시각 강화 |
| `be70f45` | metavv: CONTEXT 다이어그램 SVG→HTML/CSS 전환 |
| `be89150` | revert: CONTEXT ctx-grid 원상복구 + L13 오류 수정 |
| `1e96ecc` | metavv: CONTEXT 다이어그램 정중앙 정렬 + L13 추가 |
| `27b6188` | metavv: HERO scroll indicator 여백 조정 |
| `e550b6a` | docs 폴더 이동 및 CLAUDE.md / index.html 업데이트 |
| `7142ed6` | metavv: PHASE 카드 화살표/구분선 개선 + IMPACT separator + hero 여백 |
| `16a4572` | metavv: EXECUTION Phase 카드 펼침 인터랙션 개선 + expand-toggle 유틸 추가 |
| `3e31cab` | metavv: IMPACT 카드 토글 제거 + PROBLEM 도넛 차트 교체 |
| `22ec366` | metavv: phase-funnel justify-content center; result-card overflow fix |
| `69acdb4` | metavv: chart 13mo Apr-Apr, mid-label 제거, scroll indicator 중앙 |
| `925d666` | metavv: discovery-grid align-items stretch — 좌/우 컬럼 하단 정렬 |
| `e6d5a00` | metavv: SVG 카드 텍스트 y좌표 하향 (수직 중앙 정렬 보정) |
| `957ba59` | metavv: HERO 상단 패딩 축소 + scroll indicator 추가 (bounce + fade) |
| `3b30ee7` | reveal-on-scroll 추가: reveal.js + 토큰 + data-reveal + 탭 hook |
| `c928b82` | metavv: LEARNED 02 insight 리라이팅 |
| `05010f4` | metavv: dummy sub 추가; h2 margin 복원; 빈 sub height:0 |
| `97e6686` | metavv: case-section-title/block-title margin-bottom 8→32px |
| `1371b60` | metavv: nav heading — 각 row 자체 padding (proj-nav-row) |
| `998521c` | metavv: learned-body margin-bottom 추가 (점선 간격) |
| `47abe89` | metavv: nav heading padding — proj-nav-inner → case-inner 교체 |
| `336dd7c` | metavv: finalize — phase-arrow font-size token fix |
| `266fcf4` | /bgyk/ → /banggooso/ 전 페이지 폴더명 통일 |
| `4e41f98` | /kakaobank/ → /bgyk/ 전 페이지 교체 + Kakaobank → 방구석연구소 |
| `4fe84f0` | /folio/ 케이스 페이지 추가 — AI 캐릭터 챗 라이브 + iframe + DS viz |
| `31d6129` | /momscare/ 케이스 페이지 추가 — Phase 1 (collab timeline 포함) |
| `039dc23` | /bgyk/ 케이스 페이지 추가 — 방구석연구소 Phase 1 |
| `99d79d5` | metavv: block-* 클래스 리팩터, case-section-sub margin 절반 (64→32) |
| `066b172` | metavv: header padding — proj-nav-inner + meta-reflection direct padding |
| `7e486cf` | metavv: meta-source 카드 하단 고정 (flex+margin-top:auto) |
| `3b4676f` | metavv: full-bleed 레이아웃 리팩터 — 섹션 case-inner 밖으로 이동 |
| `0bdcf4b` | metavv: tab scroll 누적 fix (offsetTop), 영역 시각 분리, meta-reflection 강한 분기 |
| `dbd6a86` | metavv: sticky 범위 fix (cases-wrapper) + grid 카드 overflow fix (min-width:0) |
| `23da0fc` | metavv: META REFLECTION + PROJECT NAVIGATION 추가 (탭 외부 항상 노출) |
| `68f9a93` | metavv: Tab 3 콘텐츠 — 0→1 기획 CASE A/B + mini-tab + meta reflection |
| `9cdfa41` | metavv: Tab 2 콘텐츠 — CS UX 개선 STRATEGY/EXECUTION/RESULT/REFLECTION |
| `6aef3ba` | metavv: Tab 1 콘텐츠 — STRATEGY/EXECUTION/RESULT/REFLECTION |
| `f01ed28` | metavv: tab nav + URL hash routing + sticky behavior (Phase 2 shell) |
| `c311e7f` | DESIGN_SYSTEM.md 추가; CLAUDE.md DS 참조 + phase 상태 업데이트 |
| `2199ce5` | metavv: full CSS 리팩터 — DS 토큰, 정렬 규칙, grid stretch, lh 토큰 |
| `3db49f3` | lh 토큰 추가; 다이어그램/funnel 카드 중앙 정렬; phase 컨테이너 복원 |
| `8df71bc` | metavv: SVG 카드 텍스트 좌측 정렬, SHARED INFRA 박스 확장, blog 패딩 |
| `d996428` | styles.css 글로벌 디자인 토큰 시스템 추가; metavv.css 토큰 적용 |
| `bc6bef4` | metavv: SVG 깔때기 → HTML 교체, quote card 토글 fix, 가독성 정리 |
| `e75021c` | metavv CSS fix: 타이포그래피 토큰, 가독성, 폰트 floor 12px, word-break |
| `33e7fe3` | 풀 포트폴리오 추가: Hero/About/Capabilities/Projects/Experience/Contact + metavv Phase 1 |

---

## 2026-04-23

| 커밋 | 변경 내용 |
|---|---|
| `fcfe24c` | Initial commit |

---

> ⚠️ 이후 작업마다 push 전 이 파일의 해당 날짜 섹션에 한 줄 추가할 것.
> 형식: `| \`커밋해시\` | 변경 내용 요약 |`
