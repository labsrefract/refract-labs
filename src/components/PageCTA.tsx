import { Link } from "react-router";

interface PageCTAProps {
  eyebrow?: string;
  headline?: string;
  sub?: string;
}

export default function PageCTA({
  eyebrow = "// GET IN TOUCH",
  headline = "Have a project in mind?",
  sub = "Tell us what you're building — we'll get back to you within 24 hours.",
}: PageCTAProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "80px",
        paddingBottom: "80px",
        borderTop: "1px solid var(--accent-pill-border)",
      }}
    >
      <div className="absolute inset-0 scan-lines" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5"
          style={{ backgroundColor: "var(--accent-soft)", border: "1px solid var(--accent-pill-border)", borderRadius: "4px" }}>
          <span className="text-xs font-mono font-medium uppercase tracking-widest"
            style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
            {eyebrow}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>
          {headline}
        </h2>
        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
          {sub}
        </p>

        <Link
          to="/contact"
          className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm font-mono font-semibold"
          style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: "6px" }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)" }}>&gt;</span> Start a Project
        </Link>
      </div>
    </section>
  );
}
