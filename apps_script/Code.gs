/**
 * 배민 CEO 사이트 대시보드 - Google Apps Script Web App
 *
 * [배포 방법]
 * 1. Google Sheets 열기 → 확장 프로그램 → Apps Script
 * 2. 이 코드 전체 붙여넣기
 * 3. 배포 → 새 배포 → 유형: 웹 앱
 * 4. 실행 계정: 나(자신), 액세스 권한: 모든 사용자
 * 5. 배포 → URL 복사 → HTML의 APPS_SCRIPT_URL에 붙여넣기
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

function doGet(e) {
  const callback = e.parameter.callback; // JSONP 지원
  const sheet    = e.parameter.sheet || 'all';

  let result;
  try {
    result = sheet === 'all' ? getAllData() : getSheetData(sheet);
  } catch(err) {
    result = { error: err.toString() };
  }

  const json = JSON.stringify(result);
  const output = callback
    ? ContentService.createTextOutput(`${callback}(${json})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT)
    : ContentService.createTextOutput(json)
        .setMimeType(ContentService.MimeType.JSON);

  return output;
}

// 전체 시트 데이터 반환
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

// 특정 시트 데이터 반환
function getSheetData(key) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheetName = SHEET_MAP[key];
  if (!sheetName) throw new Error('Unknown sheet key: ' + key);
  return fetchSheetRows(ss, sheetName);
}

// 시트 → 행 배열 변환
function fetchSheetRows(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return [];

  const values = sheet.getRange(1, 1, lastRow, lastCol).getValues();

  // 빈 행 제거 후 반환
  return values
    .filter(row => row[0] !== '' && row[0] !== null && row[0] !== undefined)
    .map(row => row.map(cell => {
      // Date 객체 처리
      if (cell instanceof Date) return Utilities.formatDate(cell, 'Asia/Seoul', 'yyyy-MM-dd');
      return cell;
    }));
}
