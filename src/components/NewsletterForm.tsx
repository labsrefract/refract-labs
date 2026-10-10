import { useId, useState, type FormEvent } from "react";
import { LuArrowRight, LuCheck } from "react-icons/lu";

type Status = "idle" | "submitting" | "done" | "error";

/** Footer newsletter signup. Posts to /api/subscribe, which adds the address to Resend. */
export default function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "We couldn't sign you up just now. Please try again.");
      setStatus("done");
      setMessage("You're on the list. Look out for the next issue.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "We couldn't sign you up just now. Please try again.");
    }
  }

  return (
    <form className="footer-newsletter-form" onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="footer-newsletter-field">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error" ? true : undefined}
          aria-describedby={message ? `${id}-status` : undefined}
          disabled={status === "submitting"}
        />
        <button
          type="submit"
          className="footer-newsletter-submit"
          aria-label="Subscribe"
          disabled={status === "submitting"}
        >
          {status === "done" ? <LuCheck size={18} aria-hidden="true" /> : <LuArrowRight size={18} aria-hidden="true" />}
        </button>
      </div>
      {/* Honeypot: hidden from people, often filled in by bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="footer-newsletter-trap"
        aria-hidden="true"
      />
      <p
        id={`${id}-status`}
        className={status === "error" ? "footer-newsletter-status is-error" : "footer-newsletter-status"}
        role="status"
      >
        {message}
      </p>
    </form>
  );
}
