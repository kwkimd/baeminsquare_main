# 배민 CEO 사이트 · 콘텐츠 집중도 대시보드

ceo.baemin.com 메인페이지 외식업 콘텐츠 집중도 분석 대시보드입니다.

## 라이브 대시보드 (woowahan.com 계정 필요)

👉 **[대시보드 바로보기](https://script.google.com/a/macros/woowahan.com/s/AKfycbxE1bHMx9_O4Sb-4cKgaHCZE7rs7eHco10VzILL6yH7LjKimmkiTPhvwKM7aNwLwNKAbg/exec)**

> woowahan.com Google 계정으로 로그인 후 접근 가능합니다.

## 구성

| 파일 | 설명 |
|------|------|
| `apps_script/Code.gs` | Google Apps Script 서버 - Sheets 데이터 + HTML 서빙 |
| `apps_script/Dashboard.html` | 대시보드 UI (Chart.js, google.script.run) |
| `docs/index.html` | GitHub Pages 버전 (참고용) |

## 분석 지표 (7개)

- **Q1** 이탈률 추이 (기준: 50% 초과 시 경고)
- **Q2** 스크롤 깊이 분포
- **Q3** 핵심 슬롯 CTR (215·216·217·218·238)
- **Q4** 체류시간 (목표: 90초)
- **Q5** 재방문률 (기준: 20% 미만 시 구독 강화 권고)
- **Q6** 업종별 클릭·체류 버블 차트
- **Q7** 디바이스별 행동 비교 (PC vs 모바일)

## 기술 스택

- Chart.js 4.4.0 (CDN)
- Google Apps Script (HtmlService + google.script.run)
- Google Sheets (자동 데이터 파이프라인)

---
배민 마케팅 데이터 분석팀