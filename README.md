# 배민 CEO 사이트 · 콘텐츠 집중도 대시보드

ceo.baemin.com 메인페이지 외식업 콘텐츠 집중도 분석 대시보드입니다.

## 라이브 대시보드

👉 **[대시보드 바로보기](https://kwkimd.github.io/baeminsquare_main/)**

## 구성

| 파일 | 설명 |
|------|------|
| docs/index.html | GitHub Pages 대시보드 (Chart.js) |
| pps_script/Code.gs | Google Apps Script - Sheets → JSON API |

## 데이터 연동 방법

1. Google Sheets 열기 → 확장 프로그램 → Apps Script
2. pps_script/Code.gs 코드 붙여넣기
3. 배포 → 새 배포 → **웹 앱** (실행 계정: 나, 액세스: 모든 사용자)
4. 배포 URL 복사
5. docs/index.html 상단 APPS_SCRIPT_URL = '' 에 URL 붙여넣기
6. 파일 다시 업로드

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
- Google Apps Script (Web App API)
- GitHub Pages

---
배민 마케팅 데이터 분석팀