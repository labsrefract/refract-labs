/**
 * Vercel serverless function for the footer newsletter signup.
 * TODO: set RESEND_API_KEY (and optionally RESEND_NEWSLETTER_SEGMENT_ID) in the Vercel project.
 */
import { addSubscriber, validateSubscribe } from "./newsletter.js";

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

  const { email, spam, error } = validateSubscribe(body);
  if (error) return res.status(422).json({ error });
  // Pretend success to bots so they don't retry.
  if (spam) return res.status(200).json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Signups aren't open yet. Email hello@refractlabs.tech to join the list." });
  }

  try {
    const result = await addSubscriber({ apiKey, email, segmentId: process.env.RESEND_NEWSLETTER_SEGMENT_ID });
    if (!result.ok) {
      console.error("Resend contacts error", result.status, result.detail);
      return res.status(502).json({ error: "We couldn't sign you up just now. Please try again." });
    }
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "We couldn't sign you up just now. Please try again." });
  }

  return res.status(200).json({ ok: true });
}
