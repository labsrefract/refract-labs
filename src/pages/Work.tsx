import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import { caseStudies } from "../content/work";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Work() {
  usePageMeta(
    "Work — Refract Labs",
    "Selected work from Refract Labs — web apps, mobile apps, automation, and platforms we have designed and built.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Recent builds."
        subtitle="A few engagements that show how we work — challenge, approach, and result."
      />

      <section className="pb-24 lg:pb-32" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70} className="h-full">
              <Link to={`/work/${p.slug}`} className="card-link p-6 lg:p-7">
                <div className="mb-5">
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                    {p.sector}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">{p.name}</h2>
                <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                  {p.summary}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Next up"
        headline="Your project could be next."
        sub="We take on a small number of projects each quarter. If you have something to build, let's talk."
      />
    </>
  );
}
