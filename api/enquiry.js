const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = new Set(["web", "mobile", "automation", "mvp", "consulting", "other"]);
const SLOT_HOURS = new Set([9, 10, 11, 12, 14, 15, 16]);
const SLOT_RE = /^(\d{4}-\d{2}-\d{2})T(\d{2}):00:00\+03:00$/;
const MAX = { name: 120, email: 200, message: 5000 };
const LEAD_MS = 60 * 60 * 1000;
const WINDOW_MS = 28 * 24 * 60 * 60 * 1000;

export const typeLabel = {
  web: "Web app",
  mobile: "Mobile app",
  automation: "Automation",
  mvp: "MVP",
  consulting: "Technical consulting",
  other: "Other",
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

  if (!TYPES.has(type)) errors.type = "Please select a project type.";

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

export function enquiryEmail({ intent, name, email, type, message, slot }) {
  const kind = typeLabel[type] || type;
  if (intent === "call") {
    const when = formatSlot(slot);
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
    };
  }

  return {
    subject: `New inquiry from ${name} (${kind})`,
    text: [`Name: ${name}`, `Email: ${email}`, `Type: ${kind}`, "", message].join("\n"),
  };
}
