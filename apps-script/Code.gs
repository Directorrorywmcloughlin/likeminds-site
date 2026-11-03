// Like Minds founding members: receives sign-ups from likeminds.ae and appends them to the sheet.

const SHEET_ID = "1bQsjYem4lvSTU1v7ItTRz1ttrLvWeQKJRwKgQO3eCFI";
const COLUMNS = ["submitted_at", "first_name", "last_name", "email", "city", "roles", "instagram", "linkedin", "work", "consent", "founding_member", "source"];

// stop anything typed into the form running as a spreadsheet formula
function safe(v) {
  const s = v == null ? "" : String(v).slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    if (!data.email || data.website) return out({ ok: false });
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow(COLUMNS.map(k => safe(data[k])));
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doGet() {
  return ContentService.createTextOutput("Like Minds sign-up endpoint is live.");
}
