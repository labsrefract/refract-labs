import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import WorkCard from "../components/WorkCard";
import { caseStudies } from "../content/work";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Work() {
  usePageMeta(
    "Work — Refract Labs",
    "Selected work from Refract Labs — products, platforms, and sites we have designed and built.",
    "/work",
  );

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Recent builds."
        subtitle="Challenge, approach, and result — with the sites themselves, not just the stack."
      />

      <section className="pb-24 lg:pb-32" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12">
          <div className="work-index-grid">
            {caseStudies.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <WorkCard project={p} heading="h2" layout="tile" />
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
