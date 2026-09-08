import { useMemo, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { formatCallSlot, isValidCallSlot, listCallDays, listCallTimes } from "../lib/callSlots";
import { site } from "../content/site";

const TYPES = [
  { value: "web", label: "Web app" },
  { value: "mobile", label: "Mobile app" },
  { value: "automation", label: "Automation" },
  { value: "mvp", label: "MVP" },
  { value: "consulting", label: "Technical consulting" },
  { value: "other", label: "Other" },
] as const;

type Field = "name" | "email" | "type" | "message" | "slot";
type FormState = Record<"name" | "email" | "type" | "message", string>;
type FieldErrors = Partial<Record<Field, string>>;

const empty: FormState = { name: "", email: "", type: "", message: "" };

function validate(form: FormState, slot: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email.";
  if (!form.type) errors.type = "Please select a project type.";
  if (!slot || !isValidCallSlot(slot)) errors.slot = "Pick a day and time.";
  return errors;
}

export default function CallScheduler() {
  const days = useMemo(() => listCallDays(), []);
  const [day, setDay] = useState(days[0]?.ymd ?? "");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "preview" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [confirmed, setConfirmed] = useState("");

  const times = useMemo(() => (day ? listCallTimes(day) : []), [day]);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function pickDay(ymd: string) {
    setDay(ymd);
    setSlot("");
    setErrors((e) => ({ ...e, slot: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(form, slot);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "call",
          name: form.name.trim(),
          email: form.email.trim(),
          type: form.type,
          message: form.message.trim(),
          slot,
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

      setConfirmed(formatCallSlot(slot));
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
          ? `Local preview — requested for ${confirmed}. Email is not sent until RESEND_API_KEY and CONTACT_TO_EMAIL are set.`
          : `Requested for ${confirmed}. We will confirm by email within one business day.`}
      </p>
    );
  }

  if (!days.length) {
    return (
      <p style={{ color: "var(--muted)" }}>
        No open slots this window. Email{" "}
        <a href={`mailto:${site.email}`} className="nav-link">
          {site.email}
        </a>{" "}
        and we will find a time.
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

      <fieldset className="slot-fieldset">
        <legend className="field-label">Day</legend>
        <div className="slot-row" role="radiogroup" aria-label="Day">
          {days.map((d) => (
            <button
              key={d.ymd}
              type="button"
              className="slot-chip"
              aria-pressed={day === d.ymd}
              onClick={() => pickDay(d.ymd)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="slot-fieldset">
        <legend className="field-label">Time · 30 minutes · EAT</legend>
        <div className="slot-row" role="radiogroup" aria-label="Time">
          {times.length ? (
            times.map((t) => (
              <button
                key={t.iso}
                type="button"
                className="slot-chip"
                aria-pressed={slot === t.iso}
                onClick={() => {
                  setSlot(t.iso);
                  setErrors((e) => ({ ...e, slot: undefined }));
                }}
              >
                {t.label}
              </button>
            ))
          ) : (
            <p className="slot-empty">No times left this day. Pick another.</p>
          )}
        </div>
        {errors.slot && (
          <p id="call-slot-error" className="field-error">
            {errors.slot}
          </p>
        )}
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label" htmlFor="call-name">
            Name
          </label>
          <input
            id="call-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="field-input"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "call-name-error" : undefined}
          />
          {errors.name && (
            <p id="call-name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="field-label" htmlFor="call-email">
            Email
          </label>
          <input
            id="call-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="field-input"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "call-email-error" : undefined}
          />
          {errors.email && (
            <p id="call-email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="call-type">
          Project type
        </label>
        <select
          id="call-type"
          name="type"
          required
          value={form.type}
          onChange={(e) => update("type", e.target.value)}
          className="field-input"
          aria-invalid={errors.type ? true : undefined}
          aria-describedby={errors.type ? "call-type-error" : undefined}
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
          <p id="call-type-error" className="field-error">
            {errors.type}
          </p>
        )}
      </div>

      <div>
        <label className="field-label" htmlFor="call-note">
          Note <span className="field-optional">optional</span>
        </label>
        <textarea
          id="call-note"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="field-input resize-y min-h-[6rem]"
        />
      </div>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request this time"}
      </Button>
    </form>
  );
}
