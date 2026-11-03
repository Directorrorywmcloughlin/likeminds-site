// Like Minds founding members: receives sign-ups from likeminds.ae and appends them to the sheet.
// Deploy: Apps Script editor > Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
// Paste the resulting /exec URL into FORM_ENDPOINT on the site.

const SHEET_ID = "1bQsjYem4lvSTU1v7ItTRz1ttrLvWeQKJRwKgQO3eCFI";
const COLUMNS = ["submitted_at", "name", "email", "city", "craft", "consent", "founding_member", "source"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow(COLUMNS.map(k => data[k] == null ? "" : String(data[k])));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Like Minds sign-up endpoint is live.");
}
