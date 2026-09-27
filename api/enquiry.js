const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = new Set([
  "software-development",
  "infrastructure-devops",
  "design",
  "strategy-advisory",
  "support-maintenance",
]);
const SLOT_HOURS = new Set([9, 10, 11, 12, 14, 15, 16]);
const SLOT_RE = /^(\d{4}-\d{2}-\d{2})T(\d{2}):00:00\+03:00$/;
const MAX = { name: 120, email: 200, message: 5000 };
const LEAD_MS = 60 * 60 * 1000;
const WINDOW_MS = 28 * 24 * 60 * 60 * 1000;

export const typeLabel = {
  "software-development": "Software Development",
  "infrastructure-devops": "Infrastructure & DevOps",
  design: "Design",
  "strategy-advisory": "Strategy & Advisory",
  "support-maintenance": "Support & Maintenance",
};

function isWeekdayEAT(iso) {
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Nairobi",
    weekday: "short",
  }).format(new Date(iso));
  return wd !== "Sat" && wd !== "Sun";
}

function validateSlot(slot, now) {
  const match = SLOT_RE.exec(String(slot || ""));
  if (!match) return "Pick a time for the call.";
  const hour = Number(match[2]);
  if (!SLOT_HOURS.has(hour)) return "That time is not available.";
  const iso = `${match[1]}T${match[2]}:00:00+03:00`;
  const when = new Date(iso);
  if (Number.isNaN(when.getTime())) return "Pick a time for the call.";
  if (!isWeekdayEAT(iso)) {
    return "Calls are weekdays, Nairobi time.";
  }
  if (when.getTime() <= now.getTime() + LEAD_MS) {
    return "Pick a time at least an hour from now.";
  }
  if (when.getTime() > now.getTime() + WINDOW_MS) {
    return "Pick a time in the next few weeks.";
  }
  return "";
}

export function validateEnquiry(body) {
  const intent = body.intent === "call" ? "call" : "message";
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const type = String(body.type || "").trim();
  const message = String(body.message || "").trim();
  const slot = String(body.slot || "").trim();
  const errors = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > MAX.name) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email) || email.length > MAX.email) {
    errors.email = "Please enter a valid email.";
  }

  if (!TYPES.has(type)) errors.type = "Please select a service.";

  if (intent === "message") {
    if (!message) errors.message = "Please tell us a bit about the project.";
    else if (message.length > MAX.message) errors.message = "Message is too long.";
  } else if (message.length > MAX.message) {
    errors.message = "Message is too long.";
  }

  if (intent === "call") {
    const slotError = validateSlot(slot, new Date());
    if (slotError) errors.slot = slotError;
  }

  return { intent, name, email, type, message, slot, errors };
}

function formatSlot(iso) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlBlock(text) {
  return escapeHtml(text).replace(/\n/g, "<br />");
}

function row(label, valueHtml) {
  return `<tr>
    <td style="padding:10px 0 4px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#0d6e8c;font-weight:700;">${escapeHtml(label)}</td>
  </tr>
  <tr>
    <td style="padding:0 0 14px;font-size:16px;line-height:1.45;color:#161513;border-bottom:1px solid #d9d4c8;">${valueHtml}</td>
  </tr>`;
}

function brandedEmail({ kicker, title, rows, bodyLabel, body }) {
  const rowsHtml = rows
    .map(([label, valueHtml]) => row(label, valueHtml))
    .join("");
  const message =
    body != null
      ? `<tr>
          <td style="padding:18px 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#0d6e8c;font-weight:700;">${escapeHtml(bodyLabel)}</td>
        </tr>
        <tr>
          <td style="padding:14px 16px;background:#e8e4db;border:1px solid #d9d4c8;border-radius:8px;font-size:16px;line-height:1.55;color:#161513;">${body}</td>
        </tr>`
      : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f1eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1eb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fffdf8;border:1px solid #d9d4c8;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="height:6px;background:#0d6e8c;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#0d6e8c;">${escapeHtml(kicker)}</p>
              <h1 style="margin:0;font-size:26px;line-height:1.2;font-weight:400;color:#161513;letter-spacing:-0.03em;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 8px;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rowsHtml}
                ${message}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#5c5954;">
              Reply to this email to write them back. <a href="https://www.refractlabs.tech" style="color:#0d6e8c;text-decoration:none;">www.refractlabs.tech</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function enquiryEmail({ intent, name, email, type, message, slot }) {
  const kind = typeLabel[type] || type;
  const safeName = escapeHtml(name);
  const mailLink = `<a href="mailto:${escapeHtml(email)}" style="color:#0d6e8c;text-decoration:none;">${escapeHtml(email)}</a>`;

  if (intent === "call") {
    const when = formatSlot(slot);
    const note = message ? htmlBlock(message) : "No note.";
    return {
      subject: `Call request from ${name} — ${when} EAT`,
      text: [
        "Intent: Discovery call (30 minutes)",
        `Requested: ${when} EAT`,
        `ISO: ${slot}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Type: ${kind}`,
        "",
        message || "(No note.)",
      ].join("\n"),
      html: brandedEmail({
        kicker: "Refract Labs",
        title: "Call request",
        rows: [
          ["Requested", `${escapeHtml(when)} EAT`],
          ["Name", safeName],
          ["Email", mailLink],
          ["Service", escapeHtml(kind)],
        ],
        bodyLabel: "Note",
        body: note,
      }),
    };
  }

  return {
    subject: `New inquiry from ${name} (${kind})`,
    text: [`Name: ${name}`, `Email: ${email}`, `Type: ${kind}`, "", message].join("\n"),
    html: brandedEmail({
      kicker: "Refract Labs",
      title: "New inquiry",
      rows: [
        ["Name", safeName],
        ["Email", mailLink],
        ["Service", escapeHtml(kind)],
      ],
      bodyLabel: "Message",
      body: htmlBlock(message),
    }),
  };
}
