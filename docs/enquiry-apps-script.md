# Website enquiries → Google Sheet + office email

Every enquiry form on the site (admissions page, contact page, the "Get in touch" popup) still opens
WhatsApp or the visitor's email app. At the same time the browser posts the same fields to the
site's own `/api/enquiry` route, which forwards them to a Google Apps Script web app. The script
adds a row to a Google Sheet and emails the office, so the school has a record of every enquiry
even when the visitor never presses send in WhatsApp or their email app.

```
browser ──POST──▶ /api/enquiry (Vercel) ──POST──▶ Apps Script web app ──▶ Google Sheet + email
```

The Apps Script URL is stored only in the Vercel environment variable `ENQUIRY_WEBHOOK_URL`. It is
never sent to browsers. Until that variable is set, `/api/enquiry` answers 503 and logs
`ENQUIRY_WEBHOOK_URL is not set`. Visitors don't notice anything, because the WhatsApp/email handoff
does not depend on it.

## 1. Create the sheet and script (school's Google account)

Sign in with the **school's** Google account, not a personal one, so the sheet and the
emails stay with the school.

1. Create a new Google Sheet named, for example, **Website enquiries**.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the sample code and paste the script below.
4. Set `OFFICE_EMAIL` to the address that should receive enquiry emails.
   <!-- TODO(client): confirm which address receives enquiries (info@shatabdigaya.com or shatabdi.public@gmail.com). -->
5. Click **Save**.

```js
// Shatabdi Public School: website enquiries.
// Receives enquiries from https://shatabdigaya.com/api/enquiry, adds a row to this sheet and
// emails the office.

const OFFICE_EMAIL = "info@shatabdigaya.com"; // TODO(client): confirm the receiving address
const SHEET_NAME = "Enquiries";
const COLUMNS = ["Received", "Form", "Page", "Parent name", "Student name", "Name", "Phone", "Email", "Class sought", "Message"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const f = data.fields || {};

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.setFrozenRows(1);
    }

    const received = data.receivedAt ? new Date(data.receivedAt) : new Date();
    // A leading apostrophe keeps values such as "=..." or "+91..." from being read as formulas
    const safe = (v) => (v ? "'" + String(v) : "");
    sheet.appendRow([
      received,
      safe(data.form),
      safe(data.page),
      safe(f["Parent name"]),
      safe(f["Student name"]),
      safe(f["Name"]),
      safe(f["Phone"]),
      safe(f["Email"]),
      safe(f["Class sought"]),
      safe(f["Message"]),
    ]);

    const lines = Object.keys(f).map((k) => k + ": " + f[k]).join("\n");
    MailApp.sendEmail({
      to: OFFICE_EMAIL,
      subject: (data.form || "Website enquiry") + (f["Parent name"] || f["Name"] ? " – " + (f["Parent name"] || f["Name"]) : ""),
      body:
        lines +
        "\n\nPage: " + (data.page || "-") +
        "\nReceived: " + received.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) +
        "\n\nThe visitor may also have sent this on WhatsApp or by email. All enquiries are in the sheet: " + ss.getUrl(),
      replyTo: f["Email"] || undefined,
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 2. Deploy it as a web app

1. In the Apps Script editor click **Deploy → New deployment**.
2. Click the gear next to **Select type** and choose **Web app**.
3. Set:
   - **Description:** Website enquiries
   - **Execute as:** Me (the school account)
   - **Who has access:** Anyone
4. Click **Deploy**, then **Authorize access**. Google asks for permission to edit the sheet and
   send email as the school account. Choose the school account and allow it. Google may show an
   "unverified app" screen; click **Advanced → Go to … (unsafe)**. This is expected for a script you
   wrote yourself.
5. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/…/exec`.

"Anyone" means anyone who has the URL can post to it. Treat the URL as a secret: keep it only in
Vercel, never in the code or in a public place.

## 3. Add the URL to Vercel

1. Vercel → the project → **Settings → Environment Variables**.
2. Add `ENQUIRY_WEBHOOK_URL` with the Web app URL as the value, for **Production** (and Preview if
   you want to test there).
3. Redeploy so the new value is picked up.

## 4. Test

1. Open the live site, fill in the enquiry form on the admissions page with test details and press
   send. You can close the WhatsApp tab without sending.
2. Within a few seconds a new row should appear in the **Enquiries** tab of the sheet, and an email
   should arrive at `OFFICE_EMAIL`.
3. If nothing arrives, look in Vercel → the project → **Logs** for lines starting `[enquiry]`, and in
   Apps Script → **Executions** for errors.

## Changing the script later

After editing the script, use **Deploy → Manage deployments → edit (pencil) → Version: New version →
Deploy**. This keeps the same URL, so Vercel does not need changing. Creating a *new deployment*
instead gives a new URL, which would then have to be updated in Vercel.

## What the website checks before forwarding

`app/api/enquiry/route.ts`:

- accepts only JSON up to 8 KB, from the two known forms, with known field names
- checks names (letters only), phone (10 digits starting 6–9), email format and lengths
- drops bot submissions that fill a hidden "website" field (honeypot)
- allows 5 enquiries per 10 minutes per IP address. This limit is held in memory, so it is
  best-effort: it resets when Vercel starts a new server instance
- answers the browser immediately and forwards to the script afterwards, with a 10 s timeout

## Privacy

Enquiry details (names, phone, email, class, message) are now stored in the school's Google Sheet
and Gmail. The privacy policy has been updated to say so; see the `TODO(client)` notes there.
