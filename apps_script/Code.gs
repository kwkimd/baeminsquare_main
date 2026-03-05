/**
 * 배민 CEO 사이트 대시보드 - Google Apps Script Web App
 *
 * [Apps Script에 추가할 파일]
 * 1. Code.gs  → 이 파일 (서버 사이드)
 * 2. Dashboard.html → 대시보드 HTML (클라이언트 사이드)
 *
 * [배포 방법]
 * 1. Google Sheets 열기 → 확장 프로그램 → Apps Script
 * 2. Code.gs에 이 코드 전체 붙여넣기
 * 3. 왼쪽 + 버튼 → HTML → 이름: Dashboard → dashboard.html 내용 붙여넣기
 * 4. 배포 → 새 배포 → 유형: 웹 앱
 *    - 실행 계정: 나(자신)
 *    - 액세스 권한: woowahan.com의 모든 사용자
 * 5. 배포 URL = 대시보드 URL (그대로 공유)
 */

const SHEET_ID = '1-UUoGn9bI3fy2EULVI3j3QCI3hXMsm1B2mIHQcLUq2k';

const SHEET_MAP = {
  'bounce':   '이탈률',
  'scroll':   '스크롤',
  'ctr':      '콘텐츠CTR',
  'dwell':    '체류시간',
  'revisit':  '재방문률',
  'category': '업종별분석',
  'device':   '디바이스별'
};

// ── 진입점: HTML 서빙 또는 JSON 반환 ──────────────────────
function doGet(e) {
  const sheet = e.parameter.sheet;

  // ?sheet=all 또는 ?sheet=<key> → JSON 반환 (테스트용)
  if (sheet) {
    let result;
    try {
      result = sheet === 'all' ? getAllData() : getSheetData(sheet);
    } catch(err) {
      result = { error: err.toString() };
    }
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 파라미터 없음 → 대시보드 HTML 서빙
  return HtmlService
    .createHtmlOutputFromFile('Dashboard')
    .setTitle('배민 CEO 사이트 · 콘텐츠 집중도 대시보드')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ── 클라이언트(google.script.run) 에서 호출되는 함수 ───────
function getAllDataForClient() {
  return getAllData();
}

// ── 전체 시트 데이터 반환 ──────────────────────────────────
function getAllData() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const result = {};
  for (const [key, sheetName] of Object.entries(SHEET_MAP)) {
    try {
      result[key] = fetchSheetRows(ss, sheetName);
    } catch(e) {
      result[key] = [];
    }
  }
  result._updated = new Date().toISOString();
  return result;
}

// ── 특정 시트 데이터 반환 ──────────────────────────────────
function getSheetData(key) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheetName = SHEET_MAP[key];
  if (!sheetName) throw new Error('Unknown sheet key: ' + key);
  return fetchSheetRows(ss, sheetName);
}

// ── 시트 → 행 배열 변환 ───────────────────────────────────
function fetchSheetRows(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return [];

  const values = sheet.getRange(1, 1, lastRow, lastCol).getValues();

  return values
    .filter(row => row[0] !== '' && row[0] !== null && row[0] !== undefined)
    .map(row => row.map(cell => {
      if (cell instanceof Date) return Utilities.formatDate(cell, 'Asia/Seoul', 'yyyy-MM-dd');
      return cell;
    }));
}
