import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string | ReactNode;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pb-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}>
      <div className="absolute inset-0 scan-lines" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5"
          style={{ backgroundColor: "var(--accent-soft)", border: "1px solid var(--accent-pill-border)", borderRadius: "4px" }}>
          <span className="text-xs font-mono font-medium uppercase tracking-widest"
            style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
            {eyebrow}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          style={{ color: "var(--text)", letterSpacing: "-0.025em" }}>
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg max-w-2xl" style={{ color: "var(--muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
