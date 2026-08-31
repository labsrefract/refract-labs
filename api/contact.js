/**
 * Vercel serverless function for the contact form.
 * TODO: set RESEND_API_KEY and CONTACT_TO_EMAIL in the Vercel project.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = new Set(["web", "mobile", "mvp", "consulting", "other"]);
const MAX = { name: 120, email: 200, message: 5000 };

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function validate(body) {
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const type = String(body.type || "").trim();
  const message = String(body.message || "").trim();
  const errors = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > MAX.name) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email) || email.length > MAX.email) {
    errors.email = "Please enter a valid email.";
  }

  if (!TYPES.has(type)) errors.type = "Please select a project type.";

  if (!message) errors.message = "Please tell us a bit about the project.";
  else if (message.length > MAX.message) errors.message = "Message is too long.";

  return { name, email, type, message, errors };
}

const typeLabel = {
  web: "Web app",
  mobile: "Mobile app",
  mvp: "MVP",
  consulting: "Technical consulting",
  other: "Other",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ error: "Could not read that request." });
  }

  const { name, email, type, message, errors } = validate(body);
  if (Object.keys(errors).length) {
    return res.status(422).json({ error: "Please fix the highlighted fields.", errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return res.status(503).json({
      error:
        "The contact inbox is not configured yet. Email hello@refractlabs.dev directly, or set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Refract Labs <onboarding@resend.dev>";
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Type: ${typeLabel[type] || type}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New inquiry from ${name} (${typeLabel[type] || type})`,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error", response.status, detail);
      return res.status(502).json({ error: "We could not send the message. Try email instead." });
    }
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "We could not send the message. Try email instead." });
  }

  return res.status(200).json({ ok: true });
}
