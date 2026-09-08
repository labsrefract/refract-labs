/**
 * Vercel serverless function for the contact form and call requests.
 * TODO: set RESEND_API_KEY and CONTACT_TO_EMAIL in the Vercel project.
 */
import { enquiryEmail, validateEnquiry } from "./enquiry.js";

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

  const { intent, name, email, type, message, slot, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return res.status(422).json({ error: "Please fix the highlighted fields.", errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return res.status(503).json({
      error:
        "The contact inbox is not configured yet. Email internal.refract.labs@gmail.com directly, or set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Refract Labs <onboarding@resend.dev>";
  const mail = enquiryEmail({ intent, name, email, type, message, slot });

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
        subject: mail.subject,
        text: mail.text,
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
