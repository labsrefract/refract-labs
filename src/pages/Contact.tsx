import { useState } from "react";
import type { CSSProperties } from "react";
import PageHeader from "../components/PageHeader";

// ─── Contact form in terminal panel ───────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputStyle: CSSProperties = {
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border-strong)",
    borderRadius: "6px",
    color: "var(--text)",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    width: "100%",
  };

  const labelStyle: CSSProperties = {
    color: "var(--muted)",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    display: "block",
    marginBottom: "6px",
    fontWeight: 500,
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        boxShadow: "var(--shadow-md)",
        overflow: "hidden",
      }}
    >
      {/* Terminal chrome bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: "var(--chrome)", borderBottom: "1px solid var(--border)" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
        <span
          className="ml-3 text-xs font-mono"
          style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}
        >
          new-project.request
        </span>
      </div>

      <div className="p-8">
        {sent ? (
          <div className="py-10 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "var(--accent-soft)", border: "1px solid var(--accent-pill-border)" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11l5 5 9-9" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>Message received.</p>
            <p className="text-sm font-mono" style={{ color: "var(--muted)", fontFamily: "JetBrains Mono, monospace" }}>
              // Response within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-3"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Project Type</label>
              <select
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="px-4 py-3"
                style={{ ...inputStyle, appearance: "none" as const }}
              >
                <option value="" disabled>Select a type...</option>
                <option value="web">Web App</option>
                <option value="mobile">Mobile App</option>
                <option value="mvp">MVP</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                required
                rows={6}
                placeholder="Tell us about your project — what you're building, where you are in the process, and any constraints we should know about."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="px-4 py-3 resize-none"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              className="btn-primary self-start px-8 py-3 text-sm font-mono font-semibold"
              style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              <span style={{ color: "rgba(255,255,255,0.6)" }}>&gt;</span> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <div className="flex flex-col gap-5">

      {/* Contact details */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden",
        }}
      >
        {/* Mini chrome */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5"
          style={{ backgroundColor: "var(--chrome)", borderBottom: "1px solid var(--border)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
          <span className="ml-2 text-xs font-mono" style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}>contact.info</span>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {/* Status line */}
          <p
            className="text-xs font-mono"
            style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
          >
            // AVG RESPONSE TIME: 24HRS
          </p>

          <hr className="divider-dashed" />

          <div className="flex items-start gap-3">
            <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 3.5l6 4 6-4M1 3.5h12v8H1z" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-xs font-mono mb-0.5" style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}>EMAIL</p>
              <a href="mailto:hello@sintrix.dev" className="text-sm nav-link font-mono" style={{ color: "var(--text)", fontFamily: "JetBrains Mono, monospace" }}>
                hello@sintrix.dev
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1a4 4 0 014 4c0 3-4 8-4 8S3 8 3 5a4 4 0 014-4z" stroke="var(--accent)" strokeWidth="1.2" />
              <circle cx="7" cy="5" r="1.5" fill="var(--accent)" />
            </svg>
            <div>
              <p className="text-xs font-mono mb-0.5" style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}>LOCATION</p>
              <p className="text-sm font-mono" style={{ color: "var(--text)", fontFamily: "JetBrains Mono, monospace" }}>Remote — worldwide</p>
            </div>
          </div>

          <hr className="divider-dashed" />

          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="transition-opacity hover:opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 11v6M7 8v.01M12 17v-4a2 2 0 014 0v4M12 11v6" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="transition-opacity hover:opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </a>
            <a href="#" aria-label="X (Twitter)" className="transition-opacity hover:opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16M4 20L20 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Book a call */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center gap-1.5 px-4 py-2.5"
          style={{ backgroundColor: "var(--chrome)", borderBottom: "1px solid var(--border)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
          <span className="ml-2 text-xs font-mono" style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}>calendar.booking</span>
        </div>

        <div className="p-6">
          <p
            className="text-xs font-mono mb-2"
            style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
          >
            // BOOK A CALL
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
            Prefer to talk first? Book a free 30-minute discovery call — no commitment required.
          </p>

          <div
            className="flex flex-col items-center justify-center gap-3 py-8 px-4"
            style={{
              backgroundColor: "var(--bg)",
              border: "1px dashed var(--border-dashed)",
              borderRadius: "6px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="4" width="24" height="22" rx="3" stroke="var(--border-dashed)" strokeWidth="1.5" />
              <path d="M2 10h24" stroke="var(--border-dashed)" strokeWidth="1.5" />
              <path d="M8 2v4M20 2v4" stroke="var(--border-dashed)" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="7" y="14" width="4" height="4" rx="1" fill="var(--accent)" fillOpacity="0.35" />
              <rect x="13" y="14" width="4" height="4" rx="1" fill="var(--border)" />
              <rect x="19" y="14" width="4" height="4" rx="1" fill="var(--border)" />
              <rect x="7" y="20" width="4" height="4" rx="1" fill="var(--border)" />
              <rect x="13" y="20" width="4" height="4" rx="1" fill="var(--border)" />
            </svg>
            <p className="text-xs font-mono text-center" style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}>
              // calendar embed placeholder
            </p>
            <button
              className="btn-primary text-xs font-mono font-semibold px-5 py-2"
              style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              &gt; Book a 30-min call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="// GET IN TOUCH"
        title={<>Have a project<br />in mind?</>}
        subtitle="Tell us what you're building — we'll get back to you within 24 hours."
      />

      <section
        className="pb-28 lg:pb-36"
        style={{ backgroundColor: "var(--bg)", borderTop: "1px dashed var(--border-dashed)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
            <ContactForm />
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
}
