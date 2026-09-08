import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import { processSteps } from "../content/process";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Process() {
  usePageMeta(
    "Process — Refract Labs",
    "How Refract Labs takes a product from discovery through design, build, and launch.",
    "/process",
  );

  return (
    <>
      <PageHeader
        eyebrow="How we work"
        title="From idea to launch."
        subtitle="Four phases. Short loops. You see the work as it happens — not after a three-month reveal."
      />

      <section style={{ borderTop: "1px solid var(--border)" }}>
        <ol className="process-track">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 50} id={s.id} className="process-phase">
              <span className="process-phase-num" aria-hidden="true">
                {s.num}
              </span>
              <div className="process-phase-copy">
                <h2 className="process-phase-title">{s.title}</h2>
                <p className="process-phase-lede">{s.teaser}</p>
                <p className="process-phase-body">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <PageCTA
        eyebrow="Ready to start?"
        headline="Let's run the process together."
        sub="Discovery calls are free. Tell us what you are building and we will walk through how we would approach it."
      />
    </>
  );
}
