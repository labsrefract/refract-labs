import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Every project starts with listening. We run structured discovery to understand your goals, users, constraints, and what success looks like. We ask hard questions about scope, budget, and timeline early — because the most expensive engineering decisions are the ones made without enough information.",
  },
  {
    num: "02",
    title: "Design",
    desc: "With a clear picture of the problem, we map the product: information architecture, user flows, data models, and interface concepts. Design stays embedded in engineering, so every interaction is something we have thought through the implementation of.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We write clean, tested, documented code and ship in short sprints with working software at the end of each one. You can see progress, give feedback, and course-correct without waiting months for a big reveal. Reviews, tests, and CI/CD are defaults, not extras.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "We handle production deployment, environment setup, monitoring, and the first weeks after go-live. After things are stable we can stay on a retainer, or hand off with documentation. We do not disappear when the code ships.",
  },
];

export default function Process() {
  usePageMeta(
    "Process — Refract Labs",
    "How Refract Labs takes a product from discovery through design, build, and launch.",
  );

  return (
    <>
      <PageHeader
        eyebrow="How we work"
        title="From idea to launch."
        subtitle="A deliberate process built around transparency, short feedback loops, and software that works in production — not just in staging."
      />

      <section className="pb-20 lg:pb-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Reveal as="ol">
            {steps.map((s, i) => (
              <li
                key={s.num}
                className="py-12"
                style={i < steps.length - 1 ? { borderBottom: "1px solid var(--border)" } : undefined}
              >
                <p className="text-sm font-semibold mb-3" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {s.num}
                </p>
                <h2 className="text-3xl font-bold mb-4">{s.title}</h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  {s.desc}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <PageCTA
        eyebrow="Ready to start?"
        headline="Let's run the process together."
        sub="Discovery calls are free. Tell us what you are building and we will walk through how we would approach it."
      />
    </>
  );
}
