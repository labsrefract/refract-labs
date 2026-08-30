import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";

// ─── Status pill ──────────────────────────────────────────────────────────────

function StatusPill({ label }: { label: string }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 self-start"
      style={{
        color: "var(--accent)",
        backgroundColor: "var(--accent-soft)",
        border: "1px solid var(--accent-pill-border)",
        borderRadius: "4px",
        fontFamily: "JetBrains Mono, monospace",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    cmd: "$ build --web",
    statusTag: "[ENGINEERING]",
    icon: "◈",
    title: "Web Applications",
    desc: "We design and build fast, scalable web applications using modern frameworks and proven engineering practices. From customer-facing platforms to complex internal dashboards, we handle the full stack — architecture, backend, frontend, deployment, and everything in between.",
    includes: [
      "Full-stack development with React, Next.js, and Node.js",
      "Database design and API architecture (REST & GraphQL)",
      "Authentication, permissions, and multi-tenant systems",
      "Performance optimization, monitoring, and scalability planning",
    ],
    visual: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect x="1" y="1" width="46" height="46" rx="7" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <rect x="8" y="8" width="32" height="5" rx="2" fill="var(--border)" />
        <rect x="8" y="17" width="20" height="3" rx="1.5" fill="var(--accent)" fillOpacity="0.35" />
        <rect x="8" y="23" width="32" height="2" rx="1" fill="var(--border)" />
        <rect x="8" y="28" width="24" height="2" rx="1" fill="var(--border)" />
        <rect x="8" y="33" width="16" height="2" rx="1" fill="var(--border)" />
        <circle cx="38" cy="38" r="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M35.5 38l2 2 3-3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    cmd: "$ build --mobile",
    statusTag: "[ENGINEERING]",
    icon: "⬡",
    title: "Mobile Applications",
    desc: "We build native and cross-platform mobile applications for iOS and Android that feel right in the hand. Our mobile work prioritizes performance, offline reliability, and polished UX — not just porting a website to smaller screens.",
    includes: [
      "React Native apps for iOS and Android from a single codebase",
      "Native module integration and device API access",
      "Push notifications, background sync, and offline support",
      "App Store and Google Play submission and release management",
    ],
    visual: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect x="13" y="1" width="22" height="46" rx="5" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <rect x="18" y="5" width="12" height="2" rx="1" fill="var(--border)" />
        <rect x="17" y="11" width="14" height="10" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="17" y="24" width="6" height="6" rx="1.5" fill="var(--border)" />
        <rect x="25" y="24" width="6" height="6" rx="1.5" fill="var(--border)" />
        <rect x="17" y="32" width="14" height="3" rx="1.5" fill="var(--border)" />
        <circle cx="24" cy="43" r="2" fill="var(--border)" />
      </svg>
    ),
  },
  {
    cmd: "$ build --mvp",
    statusTag: "[PRODUCT]",
    icon: "⟳",
    title: "MVP Development",
    desc: "Speed matters most when you're validating an idea. We scope MVPs tightly, cut what doesn't matter on day one, and build what does — cleanly, so the codebase doesn't become a liability when it's time to grow. We've helped founders go from whiteboard to working product in weeks.",
    includes: [
      "Scope workshops to define the minimum viable feature set",
      "Rapid prototyping and iterative sprint delivery",
      "Clean, documented code that scales beyond the MVP",
      "Post-launch support and iteration planning",
    ],
    visual: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <path d="M24 8v8M24 32v8M8 24h8M32 24h8" stroke="var(--border-dashed)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="7" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M21 24l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    cmd: "$ consult --technical",
    statusTag: "[STRATEGY]",
    icon: "⌬",
    title: "Technical Consulting",
    desc: "Sometimes you don't need more code — you need a clearer picture of what you're building and why. We provide hands-on technical consulting for teams that need a senior engineering perspective without adding a full-time hire.",
    includes: [
      "Architecture and infrastructure reviews with actionable recommendations",
      "Tech stack selection and migration planning",
      "Code quality audits and refactoring roadmaps",
      "Engineering process setup: CI/CD, testing, and deployment workflows",
    ],
    visual: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="10" width="16" height="12" rx="3" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <rect x="28" y="10" width="16" height="12" rx="3" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="16" y="30" width="16" height="10" rx="3" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <path d="M12 22v4a4 4 0 004 4M36 22v4a4 4 0 01-4 4" stroke="var(--border-dashed)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 22v8" stroke="var(--border-dashed)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="// WHAT WE DO"
        title="Engineering, end to end."
        subtitle="We work across the full product lifecycle — from the first whiteboard sketch to production deployment and ongoing iteration."
      />

      {/* Services list */}
      <section className="pb-0" style={{ backgroundColor: "var(--bg)", borderTop: "1px dashed var(--border-dashed)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {services.map((s, i) => (
            <div key={s.title}>
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 py-14 lg:py-16">
                {/* Left col */}
                <div className="lg:w-64 shrink-0 flex flex-col gap-4">
                  {/* Command label */}
                  <span
                    className="text-xs font-mono self-start px-2 py-1"
                    style={{
                      color: "var(--orange)",
                      backgroundColor: "var(--orange-soft)",
                      border: "1px solid var(--orange-border, rgba(255,107,53,0.2))",
                      borderRadius: "4px",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {s.cmd}
                  </span>

                  {/* Icon + title row */}
                  <div className="flex items-start gap-3">
                    <span className="text-xl font-mono mt-0.5" style={{ color: "var(--accent)" }}>{s.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight mb-1.5" style={{ color: "var(--text)" }}>
                        {s.title}
                      </h2>
                      <StatusPill label={s.statusTag} />
                    </div>
                  </div>

                  {/* Visual in a terminal card */}
                  <div
                    className="mt-2 p-4 flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {s.visual}
                  </div>
                </div>

                {/* Right col */}
                <div className="flex-1">
                  <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                    {s.desc}
                  </p>

                  {/* What's included */}
                  <div
                    className="p-6"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-5"
                      style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      // What's included
                    </p>
                    <ul className="flex flex-col gap-3">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-px text-xs font-mono font-semibold shrink-0"
                            style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
                          >
                            &gt;
                          </span>
                          <span className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {i < services.length - 1 && (
                <hr className="divider-dashed" />
              )}
            </div>
          ))}
        </div>
      </section>

      <PageCTA eyebrow="// READY TO BUILD?" sub="Tell us what you're building and we'll figure out the right approach together." />
    </>
  );
}
