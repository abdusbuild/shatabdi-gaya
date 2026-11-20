import { after } from "next/server";

// Server-side copy of every website enquiry. The browser still hands the enquiry to WhatsApp or the
// visitor's email app; in parallel it posts the same fields here, and this route forwards them to the
// school's Google Apps Script (see docs/enquiry-apps-script.md), which adds a row to a Google Sheet
// and emails the office. The Apps Script URL lives only in ENQUIRY_WEBHOOK_URL on the server.

const FORMS = ["Admission enquiry from website", "Message from website"] as const;

// Every field a form may send, with its longest accepted length.
const FIELDS: Record<string, number> = {
  "Parent name": 60,
  "Student name": 60,
  Name: 60,
  Phone: 10,
  Email: 120,
  "Class sought": 40,
  Message: 1500,
};

const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const PHONE = /^[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit: 5 enquiries per 10 minutes per IP address. It lives in this server
// instance's memory, so it is per instance and resets on a cold start; it stops casual floods, not
// a determined attacker.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  return recent.length > LIMIT;
}

const json = (status: number, body: object) => Response.json(body, { status });

function validate(raw: unknown): { form: string; page: string; fields: Record<string, string> } | string {
  if (!raw || typeof raw !== "object") return "bad body";
  const { form, page, fields } = raw as Record<string, unknown>;
  if (typeof form !== "string" || !(FORMS as readonly string[]).includes(form)) return "unknown form";
  if (!fields || typeof fields !== "object") return "no fields";
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields as Record<string, unknown>)) {
    if (!(k in FIELDS)) return `unexpected field ${k}`;
    if (typeof v !== "string") return `bad ${k}`;
    const val = v.trim();
    if (!val) continue;
    if (val.length > FIELDS[k]) return `${k} too long`;
    if ((k === "Parent name" || k === "Student name" || k === "Name") && !NAME.test(val)) return `bad ${k}`;
    if (k === "Phone" && !PHONE.test(val)) return "bad phone";
    if (k === "Email" && !EMAIL.test(val)) return "bad email";
    clean[k] = val;
  }
  // Each form needs a way to reach the sender
  if (form === FORMS[0] && !(clean["Parent name"] && clean.Phone)) return "missing name or phone";
  if (form === FORMS[1] && !(clean.Name && clean.Message && (clean.Phone || clean.Email))) return "missing name, message or contact";
  const path = typeof page === "string" && /^\/[\w\-/]{0,80}$/.test(page) ? page : "";
  return { form, page: path, fields: clean };
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json(415, { ok: false });
  const text = await request.text();
  if (text.length > 8000) return json(413, { ok: false });

  let body: unknown;
  try { body = JSON.parse(text); } catch { return json(400, { ok: false }); }

  // Honeypot: a hidden field people never see. Bots that fill it get a normal-looking reply.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) return json(200, { ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return json(429, { ok: false });

  const result = validate(body);
  if (typeof result === "string") return json(400, { ok: false, error: result });

  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) {
    console.error("[enquiry] ENQUIRY_WEBHOOK_URL is not set; enquiry not recorded");
    return json(503, { ok: false });
  }

  // Answer the browser now and forward afterwards, so a slow Google response never holds it up.
  after(async () => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...result, receivedAt: new Date().toISOString() }),
        redirect: "follow", // Apps Script answers with a redirect to the script's output
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) console.error(`[enquiry] webhook answered ${res.status}`);
    } catch (e) {
      console.error("[enquiry] webhook failed:", e instanceof Error ? e.message : e);
    }
  });
  return json(202, { ok: true });
}
