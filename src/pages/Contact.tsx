import { useState, type FormEvent, type CSSProperties } from "react";
import { Link } from "react-router";
import { FiArrowUpRight, FiMail, FiMapPin, FiClock, FiMessageSquare, FiCalendar } from "react-icons/fi";
import { Button } from "../components/Button";
import CallScheduler from "../components/CallScheduler";
import Reveal from "../components/ScrollReveal";
import { site } from "../content/site";
import { useSearchParams } from "react-router";
import { enquiryTypeFromQuery, enquiryTypes } from "../content/services";
import { processNoteFromQuery } from "../content/ai";
import { usePageMeta } from "../hooks/usePageMeta";

const faqs = [
  {
    q: "How fast do you reply?",
    a: "Within one business day. Discovery calls are 30 minutes and free.",
  },
  {
    q: "Who actually does the work?",
    a: "The same people you talk to. We do not hand the project to a junior team after the call.",
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
  const [params] = useSearchParams();
  const [form, setForm] = useState<FormState>(() => ({
    ...empty,
    type: enquiryTypeFromQuery(params.get("type")),
    message: processNoteFromQuery(params.get("process")),
  }));
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
    <article className="contact-studio software-scroll-content">
      <header className="contact-studio-header">
        <Reveal className="ai-mask-head" rise={false}>
          <span className="projects-eyebrow">LET'S TALK</span>
          <h1><span className="ai-mask-word"><span>Good work starts</span></span><br /><span className="ai-mask-word" style={{ "--line": 1 } as CSSProperties}><span>with a conversation.</span></span></h1>
          <p className="ai-mask-after">Tell us what you have in mind. A new product, a better website, or a problem that needs untangling. We will help you find a practical next step.</p>
          <div className="contact-studio-choices ai-mask-after"><a href="#write">Write to us <FiArrowUpRight aria-hidden="true" /></a><a href="#call">Book a discovery call <FiArrowUpRight aria-hidden="true" /></a></div>
        </Reveal>
      </header>
      <div className="contact-page">
        <Reveal className="contact-studio-direct" rise={false}>
          <a href={`mailto:${site.email}`}><FiMail aria-hidden="true" /><span><small>A DIRECT LINE</small>{site.email}</span><FiArrowUpRight aria-hidden="true" /></a>
          <div><FiMapPin aria-hidden="true" /><span><small>BASED IN</small>{site.location}</span></div>
          <div><FiClock aria-hidden="true" /><span><small>OUR REPLY</small>Within one business day</span></div>
        </Reveal>
        <section className="contact-studio-chapter" id="write" aria-labelledby="contact-write-title">
          <Reveal className="contact-studio-intro ai-mask-head" rise={false}>
            <span className="contact-studio-icon"><FiMessageSquare aria-hidden="true" /></span>
            <span className="projects-eyebrow">01 / SEND A MESSAGE</span>
            <h2 id="contact-write-title"><span className="ai-mask-word"><span>What's on your mind?</span></span></h2>
            <p className="ai-mask-after">Tell us what you are building, what you need help with, and where you want to go. A rough idea is a good place to start.</p>
            <p className="contact-studio-note">Your enquiry goes straight to the team doing the work.</p>
          </Reveal>
          <div className="contact-studio-form-panel"><ContactForm /><p className="contact-studio-privacy">We use your details to respond to your enquiry. Read our <Link to="/privacy">privacy policy</Link>.</p></div>
        </section>
        <section className="contact-studio-chapter" id="call" aria-labelledby="contact-call-title">
          <Reveal className="contact-studio-intro ai-mask-head" rise={false}>
            <span className="contact-studio-icon"><FiCalendar aria-hidden="true" /></span>
            <span className="projects-eyebrow">02 / MEET THE TEAM</span>
            <h2 id="contact-call-title"><span className="ai-mask-word"><span>Talk it through.</span></span></h2>
            <p className="ai-mask-after">A free, 30-minute discovery call to understand your goals and see how we can help.</p>
            <ul className="contact-studio-call-notes"><li>Weekdays, Nairobi time (EAT).</li><li>Choose a day and time that suits you.</li><li>This is a request. We will confirm the slot by email.</li></ul>
          </Reveal>
          <div className="contact-studio-form-panel"><CallScheduler /></div>
        </section>
        <section className="contact-studio-faq" aria-labelledby="contact-faq-title">
          <Reveal className="ai-mask-head" rise={false}><span className="projects-eyebrow">BEFORE WE TALK</span><h2 id="contact-faq-title"><span className="ai-mask-word"><span>A few useful answers.</span></span></h2></Reveal>
          <div className="contact-faq">{faqs.map((item, index) => <Reveal key={item.q} className="contact-faq-item" rise={false} delay={index * 80}><h3>{item.q}</h3><p>{item.a}</p></Reveal>)}</div>
        </section>
      </div>
    </article>
  );
}