import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Every project starts with listening. We run structured discovery sessions to understand your goals, your users, your constraints, and what success looks like. We ask hard questions about scope, budget, and timeline early — because the most expensive engineering decisions are the ones made without enough information. Discovery gives us the foundation to build the right thing, not just the fast thing.",
    visual: (
      <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="8" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M30 30l7 7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 24h8M24 20v8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Design",
    desc: "With a clear picture of the problem, we map the product: information architecture, user flows, data models, and interface concepts. We don't hand off wireframes and disappear — our design process is embedded in engineering. That means every interaction we design is something we've thought through the implementation of. The result is fewer surprises and a product that ships closer to the original vision.",
    visual: (
      <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
        <rect x="4" y="8" width="36" height="28" rx="4" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <rect x="10" y="14" width="12" height="8" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.45" />
        <path d="M26 18h8M26 22h6" stroke="var(--border-dashed)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 28h24" stroke="var(--border-dashed)" strokeWidth="1" strokeLinecap="round" />
        <path d="M36 28l12 12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
        <circle cx="46" cy="42" r="6" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Build",
    desc: "We write clean, tested, documented code — not code that works until the next engineer has to touch it. We ship in short sprints with working software at the end of each one. You can see progress, give feedback, and course-correct without waiting months for a big reveal. We use pull request reviews, automated testing, and CI/CD pipelines by default, not as optional extras.",
    visual: (
      <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
        <rect x="4" y="10" width="48" height="36" rx="5" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <path d="M4 18h48" stroke="var(--border-dashed)" strokeWidth="1" />
        <circle cx="11" cy="14" r="2" fill="#FF5F57" />
        <circle cx="18" cy="14" r="2" fill="#FEBC2E" />
        <circle cx="25" cy="14" r="2" fill="#28C840" />
        <path d="M13 30l5 4-5 4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        <path d="M22 38h14" stroke="var(--border-dashed)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Launch",
    desc: "Shipping is a craft. We handle production deployment, environment configuration, monitoring setup, and post-launch stability. We don't disappear when the code goes live — we stay engaged through the first weeks after launch, watching for issues and making sure the product is performing as expected. After stabilization, we can transition to an ongoing maintenance or iteration retainer, or hand off cleanly with full documentation.",
    visual: (
      <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
        <path d="M28 48C28 48 8 36 8 20a20 20 0 0140 0c0 16-20 28-20 28z" stroke="var(--border-dashed)" strokeWidth="1.5" />
        <circle cx="28" cy="20" r="5" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M28 4v6M28 34v6M44 20h-6M18 20h-6" stroke="var(--border-dashed)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 20l5-8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <>
      <PageHeader
        eyebrow="// HOW WE WORK"
        title="From idea to launch."
        subtitle="A deliberate process built around transparency, short feedback loops, and shipping software that works in production — not just in staging."
      />

      <section
        className="pb-20 lg:pb-28"
        style={{ backgroundColor: "var(--bg)", borderTop: "1px dashed var(--border-dashed)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex gap-0">

              {/* Left: number + dashed pipeline line */}
              <div className="flex flex-col items-center mr-8 lg:mr-12 pt-14">
                <div
                  className="w-14 h-10 flex items-center justify-center shrink-0 z-10"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    border: "1px solid var(--accent-pill-border)",
                    borderRadius: "6px",
                  }}
                >
                  <span
                    className="text-sm font-mono font-semibold"
                    style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    &gt;{s.num}
                  </span>
                </div>

                {/* Dashed vertical connector */}
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 mt-3"
                    style={{
                      width: "1px",
                      borderLeft: "2px dashed var(--border-dashed)",
                      minHeight: "60px",
                    }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div className="flex-1 py-14">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">

                  {/* Text */}
                  <div className="flex-1">
                    <h2
                      className="text-2xl sm:text-3xl font-bold tracking-tight mb-5"
                      style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
                    >
                      {s.title}
                    </h2>
                    <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                      {s.desc}
                    </p>
                  </div>

                  {/* Visual in terminal-window card */}
                  <div
                    className="shrink-0 overflow-hidden"
                    style={{
                      width: "120px",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {/* Mini chrome bar */}
                    <div
                      className="flex items-center gap-1 px-2 py-1.5"
                      style={{ backgroundColor: "var(--chrome)", borderBottom: "1px solid var(--border)" }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28C840" }} />
                    </div>
                    <div className="flex items-center justify-center p-4" style={{ backgroundColor: "var(--surface)" }}>
                      {s.visual}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PageCTA eyebrow="// READY TO START?" headline="Let's run the process together." sub="Discovery calls are free. Tell us what you're building and we'll walk through how we'd approach it." />
    </>
  );
}
