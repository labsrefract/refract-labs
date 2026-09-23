import { useState, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "../components/Button";
import CallScheduler from "../components/CallScheduler";
import Reveal from "../components/Reveal";
import { site } from "../content/site";
import { enquiryTypes } from "../content/services";
import { usePageMeta } from "../hooks/usePageMeta";

const faqs = [
  {
    q: "How fast do you reply?",
    a: "Within one business day. Discovery calls are 30 minutes and free.",
  },
  {
    q: "Do you take every project?",
    a: "No. We take a small number at a time so the people who bid the work are the people who build it.",
  },
  {
    q: "Where are you based?",
    a: "Nairobi. We work with clients here and remotely. Call times are Africa/Nairobi (EAT).",
  },
];

type Field = "name" | "email" | "type" | "message";
type FormState = Record<Field, string>;
type FieldErrors = Partial<Record<Field, string>>;

const empty: FormState = { name: "", email: "", type: "", message: "" };

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email.";
  if (!form.type) errors.type = "Please select a service.";
  if (!form.message.trim()) errors.message = "Please tell us a bit about the project.";
  return errors;
}

function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "preview" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function update<K extends Field>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "message",
          name: form.name.trim(),
          email: form.email.trim(),
          type: form.type,
          message: form.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: FieldErrors;
        preview?: boolean;
      };

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please email us instead.");
        setStatus("error");
        return;
      }

      setStatus(data.preview ? "preview" : "success");
    } catch {
      setServerError("Could not reach the server. Check your connection or email us directly.");
      setStatus("error");
    }
  }

  if (status === "success" || status === "preview") {
    return (
      <p className="alert alert-ok" role="status">
        {status === "preview"
          ? "Local preview — the form validated, but email is not sent until RESEND_API_KEY and CONTACT_TO_EMAIL are set."
          : "Message received. We will get back to you within one business day."}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="contact-form">
      {status === "error" && (
        <p className="alert alert-error" role="alert">
          {serverError}{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="field-input"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="field-label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="field-input"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="contact-type">
          Service
        </label>
        <select
          id="contact-type"
          name="type"
          required
          value={form.type}
          onChange={(e) => update("type", e.target.value)}
          className="field-input"
          aria-invalid={errors.type ? true : undefined}
          aria-describedby={errors.type ? "contact-type-error" : undefined}
        >
          <option value="" disabled>
            Select a service
          </option>
          {enquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p id="contact-type-error" className="field-error">
            {errors.type}
          </p>
        )}
      </div>

      <div>
        <label className="field-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="field-input resize-y min-h-[8rem]"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="field-error">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

export default function Contact() {
  usePageMeta(
    "Contact — Refract Labs",
    "Start a project with Refract Labs. Write to us or book a 30-minute discovery call — we reply within one business day.",
    "/contact",
  );

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            Have a project
            <br />
            in mind?
          </>
        }
        subtitle="Write to us, or pick a time for a 30-minute discovery call. We reply within one business day."
      />

      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="contact-page">
          <Reveal className="contact-direct">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span aria-hidden="true"> · </span>
            {site.location}
            <span aria-hidden="true"> · </span>
            Typical reply 1 day
            <span aria-hidden="true"> · </span>
            <a href="#call">Book a call</a>
          </Reveal>

          <Reveal className="contact-chapter" id="write">
            <h2 className="contact-chapter-title">Write</h2>
            <p className="contact-chapter-lead">Tell us what you are building. We will come back with how we would approach it.</p>
            <ContactForm />
          </Reveal>

          <Reveal className="contact-chapter" id="call">
            <h2 className="contact-chapter-title">Book a call</h2>
            <p className="contact-chapter-lead">
              30 minutes, weekdays, Nairobi time. This is a request — we will confirm the slot by email.
            </p>
            <CallScheduler />
          </Reveal>

          <div className="contact-faq">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 50} className="contact-faq-item">
                <h2>{item.q}</h2>
                <p>{item.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
