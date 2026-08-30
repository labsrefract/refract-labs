import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";

const founders = [
  {
    name: "Alex Rivera",
    role: "Co-Founder & Engineer",
    bio: "Full-stack engineer with 8 years building products for startups and Fortune 500s. Previously led engineering at two Y Combinator companies, where he built platforms scaled to millions of users. Specializes in React, Node.js, and distributed systems. Obsessed with clean code, fast deploys, and writing software that other engineers actually enjoy working in.",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    initials: "AR",
  },
  {
    name: "Jordan Kim",
    role: "Co-Founder & Engineer",
    bio: "Mobile and systems engineer who has led product engineering at two Series A startups from first commit to acquisition. Deep expertise in React Native, iOS, and backend architecture. Believes the best software is built by small teams with high trust and clear constraints.",
    stack: ["React Native", "iOS", "Go", "AWS"],
    initials: "JK",
  },
];

const story = [
  {
    heading: "Why we started Sintrix",
    body: "We started Sintrix after watching the same pattern play out too many times: a founder with a sharp idea, a large agency with a long contract, and a codebase that was unmaintainable by the time the engagement ended. We believed there was a better model — a small, senior team that treated every project like it was their own product, not a billable line item. That's what we built.",
  },
  {
    heading: "What we believe about software",
    body: "Good software is specific. It solves a real problem for real people, and it doesn't try to solve problems that haven't arrived yet. We've seen too many products fail not because of bad technology but because of scope that ballooned before the product had validation. We build lean, we build clean, and we build for the next engineer as much as for the next user.",
  },
  {
    heading: "How we work with clients",
    body: "We take on a small number of projects at a time, by design. Every client gets senior attention — not a junior team managed by a senior one. We're embedded partners, not vendors. We ask hard questions, push back when scope doesn't serve the goal, and stay engaged past launch. The best relationships we have are with founders who wanted a technical co-founder but needed someone external.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="// THE TEAM"
        title={<>Built by engineers,<br />run by engineers.</>}
        subtitle="Sintrix is a two-person studio. No account managers, no junior developers, no outsourced work. Every project is handled directly by the founders."
      />

      {/* Our Story */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--bg)", borderTop: "1px dashed var(--border-dashed)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-20">
            {/* Sidebar label */}
            <div className="pt-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  border: "1px solid var(--accent-pill-border)",
                  borderRadius: "4px",
                }}
              >
                <span
                  className="text-xs font-mono font-medium uppercase tracking-widest"
                  style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
                >
                  // WHY WE STARTED SINTRIX
                </span>
              </div>
            </div>

            {/* Story blocks */}
            <div className="flex flex-col gap-0">
              {story.map((s, i) => (
                <div key={s.heading}>
                  <div className="py-8">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                      {s.heading}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                      {s.body}
                    </p>
                  </div>
                  {i < story.length - 1 && <hr className="divider-dashed" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--surface-2)", borderTop: "1px dashed var(--border-dashed)", borderBottom: "1px dashed var(--border-dashed)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            className="inline-flex items-center gap-2 mb-12 px-3 py-1.5"
            style={{
              backgroundColor: "var(--accent-soft)",
              border: "1px solid var(--accent-pill-border)",
              borderRadius: "4px",
            }}
          >
            <span
              className="text-xs font-mono font-medium uppercase tracking-widest"
              style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
            >
              // FOUNDERS
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {founders.map((f) => (
              <div
                key={f.name}
                className="card-hover p-8 lg:p-10 flex flex-col"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-sm font-mono font-semibold shrink-0"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    border: "2px solid var(--accent)",
                    color: "var(--accent)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {f.initials}
                </div>

                <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text)" }}>{f.name}</h3>

                {/* Terminal status role line */}
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--green)" }}
                  />
                  <span
                    className="text-xs font-mono"
                    style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    [ONLINE] {f.role}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>{f.bio}</p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {f.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5"
                      style={{
                        color: "var(--accent)",
                        backgroundColor: "var(--accent-soft)",
                        border: "1px solid var(--accent-pill-border)",
                        borderRadius: "4px",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA eyebrow="// WORK WITH US" sub="We're selective about what we take on, which means the projects we do take on get our full attention." />
    </>
  );
}
