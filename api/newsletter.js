/**
 * Shared newsletter signup logic for the Vercel function (api/subscribe.js)
 * and the local dev middleware in vite.config.ts.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reads a signup request. `website` is a honeypot: a field hidden from people
 * that bots tend to fill in, so a filled one is treated as spam.
 */
export function validateSubscribe(body) {
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const spam = typeof body?.website === "string" && body.website.trim() !== "";
  const error = !email ? "Please enter your email." : !EMAIL_RE.test(email) || email.length > 254 ? "Please enter a valid email." : "";
  return { email, spam, error };
}

/**
 * Adds the address to Resend as a subscribed contact, in the newsletter
 * segment when one is configured. An address that is already a contact
 * counts as subscribed.
 * Returns { ok: true } or { ok: false, status, detail }.
 */
export async function addSubscriber({ apiKey, email, segmentId }) {
  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    }),
  });

  if (response.ok || response.status === 409) return { ok: true };
  return { ok: false, status: response.status, detail: await response.text() };
}
