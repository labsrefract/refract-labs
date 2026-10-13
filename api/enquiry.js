const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TYPES = new Set([
  "software-development",

  "infrastructure-devops",

  "design",

  "strategy-advisory",

  "support-maintenance",

  "ai-agents",
])

const SLOT_HOURS = new Set([9, 10, 11, 12, 14, 15, 16])

const SLOT_RE = /^(\d{4}-\d{2}-\d{2})T(\d{2}):00:00\+03:00$/

const MAX = { name: 120, email: 200, message: 5000 }

const LEAD_MS = 60 * 60 * 1000

const WINDOW_MS = 28 * 24 * 60 * 60 * 1000

export const typeLabel = {
  "software-development": "Software Development",

  "infrastructure-devops": "Infrastructure & DevOps",

  design: "Design",

  "strategy-advisory": "Strategy & Advisory",

  "support-maintenance": "Support & Maintenance",

  "ai-agents": "Refract AI agents",
}

function isWeekdayEAT(iso) {
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Nairobi",

    weekday: "short",
  }).format(new Date(iso))

  return wd !== "Sat" && wd !== "Sun"
}

function validateSlot(slot, now) {
  const match = SLOT_RE.exec(String(slot || ""))

  if (!match) return "Pick a time for the call."

  const hour = Number(match[2])

  if (!SLOT_HOURS.has(hour)) return "That time is not available."

  const iso = `${match[1]}T${match[2]}:00:00+03:00`

  const when = new Date(iso)

  if (Number.isNaN(when.getTime())) return "Pick a time for the call."

  if (!isWeekdayEAT(iso)) {
    return "Calls are weekdays, Nairobi time."
  }

  if (when.getTime() <= now.getTime() + LEAD_MS) {
    return "Pick a time at least an hour from now."
  }

  if (when.getTime() > now.getTime() + WINDOW_MS) {
    return "Pick a time in the next few weeks."
  }

  return ""
}

export function validateEnquiry(body) {
  const intent = body.intent === "call" ? "call" : "message"

  const name = String(body.name || "").trim()

  const email = String(body.email || "").trim()

  const type = String(body.type || "").trim()

  const message = String(body.message || "").trim()

  const slot = String(body.slot || "").trim()

  const errors = {}

  if (!name) errors.name = "Please enter your name."
  else if (name.length > MAX.name) errors.name = "Name is too long."

  if (!email) errors.email = "Please enter your email."
  else if (!EMAIL_RE.test(email) || email.length > MAX.email) {
    errors.email = "Please enter a valid email."
  }

  if (!TYPES.has(type)) errors.type = "Please select a service."

  if (intent === "message") {
    if (!message) errors.message = "Please tell us a bit about the project."
    else if (message.length > MAX.message)
      errors.message = "Message is too long."
  } else if (message.length > MAX.message) {
    errors.message = "Message is too long."
  }

  if (intent === "call") {
    const slotError = validateSlot(slot, new Date())

    if (slotError) errors.slot = slotError
  }

  return { intent, name, email, type, message, slot, errors }
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
  }).format(new Date(iso))
}

function escapeHtml(value) {
  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")
}

function htmlBlock(text) {
  return escapeHtml(text).replace(/\n/g, "<br />")
}

function row(label, valueHtml, accent) {
  return `<tr><td style="padding:20px 0 7px;font-family:'Source Sans 3',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${accent};font-weight:600;">${escapeHtml(label)}</td></tr>
  <tr><td style="padding:0 0 20px;font-family:'Source Sans 3',Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#161513;border-bottom:1px solid #d9d4c8;overflow-wrap:anywhere;word-break:break-word;">${valueHtml}</td></tr>`
}

function brandedEmail({ kicker, title, rows, bodyLabel, body, ai = false }) {
  const accent = ai ? "#5b3fc4" : "#0d6e8c"
  const highlight = ai ? "#c5b6ff" : "#73d4e8"
  const rowsHtml = rows
    .map(([label, valueHtml]) => row(label, valueHtml, accent))
    .join("")
  const message =
    body != null
      ? `<tr><td style="padding:24px 0 10px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${accent};font-weight:600;">${escapeHtml(bodyLabel)}</td></tr>
    <tr><td style="padding:20px;background:#f3f1eb;border:1px solid #d9d4c8;border-radius:12px;font-size:16px;line-height:1.7;color:#4a4844;overflow-wrap:anywhere;word-break:break-word;">${body}</td></tr>`
      : ""

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(title)} | Refract Labs</title>
  <!--[if !mso]><!-->
  <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet" />
  <!--<![endif]-->
  <style>
    body,table,td,p,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table { border-collapse:separate; mso-table-lspace:0pt; mso-table-rspace:0pt; }
    @media only screen and (max-width:620px) {
      .email-outer { padding:20px 12px !important; }
      .email-padding { padding-left:24px !important; padding-right:24px !important; }
      .email-title { font-size:34px !important; }
    }
  </style>
  <!--[if mso]><style>body,table,td,p,a,h1 { font-family:Arial,Helvetica,sans-serif !important; }</style><![endif]-->
</head>
<body style="margin:0;padding:0;background:#f3f1eb;font-family:'Source Sans 3',Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;line-height:1px;color:#f3f1eb;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(title)}. A new conversation for the Refract team.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1eb;"><tr><td class="email-outer" align="center" style="padding:40px 16px;">
    <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fffdf8;border:1px solid #d9d4c8;border-radius:20px;overflow:hidden;">
      <tr><td class="email-padding" bgcolor="#101114" style="padding:32px 36px 38px;background:#101114;border-radius:19px 19px 0 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td width="56" valign="middle"><a href="https://www.refractlabs.tech/" style="text-decoration:none;"><img src="https://www.refractlabs.tech/favicon-96.png" alt="Refract Labs logo" width="44" height="44" style="display:block;border:0;border-radius:10px;" /></a></td>
          <td valign="middle"><p style="margin:0;font-family:'Cabinet Grotesk',Arial,Helvetica,sans-serif;font-size:24px;line-height:1.2;font-weight:600;letter-spacing:-0.7px;color:#f2efe8;">Refract Labs</p><p style="margin:6px 0 0;font-size:11px;line-height:1.5;color:#c2bdb3;">Software &middot; Intelligence &middot; Security</p></td>
        </tr></table>
        <p style="margin:32px 0 12px;font-size:11px;line-height:1.5;letter-spacing:0.1em;text-transform:uppercase;color:${highlight};">${escapeHtml(kicker)}</p>
        <h1 class="email-title" style="margin:0;font-family:'Cabinet Grotesk',Arial,Helvetica,sans-serif;font-size:42px;line-height:1.08;font-weight:600;letter-spacing:-1.4px;color:#f2efe8;">${escapeHtml(title)}.</h1>
        <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#c2bdb3;">${
          bodyLabel === "Note"
            ? "A requested discovery call. Confirm the time with the sender before booking."
            : "A new idea, straight to the team. The project details are below."
        }</p>
      </td></tr>
      <tr><td class="email-padding" style="padding:12px 36px 32px;font-family:'Source Sans 3',Arial,Helvetica,sans-serif;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}${message}</table></td></tr>
      <tr><td class="email-padding" style="padding:0 36px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-top:24px;border-top:1px solid #d9d4c8;font-size:14px;line-height:1.65;color:#4a4844;">Reply to this email to write them back.<p style="margin:10px 0 0;font-size:12px;color:#5c5954;">Nairobi, Kenya &middot; Refract Labs<br /><a href="https://www.refractlabs.tech/" style="color:${accent};text-decoration:underline;text-underline-offset:3px;">refractlabs.tech</a></p></td></tr></table></td></tr>
    </table>
    <!--[if mso]></td></tr></table><![endif]-->
  </td></tr></table>
</body>
</html>`
}
export function enquiryEmail({ intent, name, email, type, message, slot }) {
  const kind = typeLabel[type] || type

  const safeName = escapeHtml(name)

  const mailLink = `<a href="mailto:${escapeHtml(email)}" style="color:#0d6e8c;text-decoration:none;">${escapeHtml(email)}</a>`

  if (intent === "call") {
    const when = formatSlot(slot)

    const note = message ? htmlBlock(message) : "No note."

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
        kicker:
          intent === "call" ? "Discovery call request" : "Project enquiry",
        ai: type === "ai-agents",

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
    }
  }

  return {
    subject: `New inquiry from ${name} (${kind})`,

    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Type: ${kind}`,
      "",
      message,
    ].join("\n"),

    html: brandedEmail({
      kicker: intent === "call" ? "Discovery call request" : "Project enquiry",
      ai: type === "ai-agents",

      title: "New inquiry",

      rows: [
        ["Name", safeName],

        ["Email", mailLink],

        ["Service", escapeHtml(kind)],
      ],

      bodyLabel: "Message",

      body: htmlBlock(message),
    }),
  }
}
