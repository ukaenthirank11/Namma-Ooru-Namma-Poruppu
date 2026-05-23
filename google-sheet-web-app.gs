const SPREADSHEET_ID = '1UvCv8EZvDNamZr6PB2UMamZNzBvM9DAOKnJPIGbD1nM'
const SHEET_NAME = 'Sheet1'

function doPost(event) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
  const data = JSON.parse(event.postData.contents || '{}')

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.phone || '',
    data.email || '',
    Number(data.bottleCount || 0),
    Number(data.points || 0),
  ])

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  )
}
