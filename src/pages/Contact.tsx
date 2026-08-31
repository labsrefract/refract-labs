import { useState, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "../components/Button";
import { site } from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";

const TYPES = [
  { value: "web", label: "Web app" },
  { value: "mobile", label: "Mobile app" },
  { value: "automation", label: "Automation" },
  { value: "mvp", label: "MVP" },
  { value: "consulting", label: "Technical consulting" },
  { value: "other", label: "Other" },
] as const;

type Field = "name" | "email" | "type" | "message";
type FormState = Record<Field, string>;
type FieldErrors = Partial<Record<Field, string>>;

const empty: FormState = { name: "", email: "", type: "", message: "" };

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email.";
  if (!form.type) errors.type = "Please select a project type.";
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
      <div className="p-8 lg:p-10" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
        <p className="alert alert-ok" role="status">
          {status === "preview"
            ? "Local preview — the form validated, but email is not sent until RESEND_API_KEY and CONTACT_TO_EMAIL are set."
            : "Message received. We will get back to you within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="p-8 lg:p-10 flex flex-col gap-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}
    >
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
          Project type
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
            Select a type
          </option>
          {TYPES.map((t) => (
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
    "Start a project with Refract Labs. Tell us what you are building — we reply within one business day.",
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
        subtitle="Tell us what you are building. We reply within one business day."
      />

      <section className="pb-24 lg:pb-32" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          <ContactForm />

          <aside className="p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <p className="eyebrow">Direct</p>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              Prefer email? Write to us and we will pick it up from there.
            </p>
            <a href={`mailto:${site.email}`} className="nav-link">
              {site.email}
            </a>
            <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
              {site.location}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
