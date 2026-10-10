import PageCTA from "../components/PageCTA";
import Reveal from "../components/ScrollReveal";
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
    <div className="work-page">
      <header className="work-page-header">
        <Reveal className="work-page-heading ai-mask-head" rise={false}>
          <h1><span className="ai-mask-word"><span>Ideas we’ve put to work.</span></span></h1>
          <p className="ai-mask-after">Websites that bring in enquiries. Booking tools that simplify the day. Explore the projects, the problems behind them, and what we built to help.</p>
        </Reveal>
      </header>

      <section className="projects-section work-gallery pb-24 lg:pb-32" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12">
          <div className="work-index-grid">
            {caseStudies.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <WorkCard project={p} heading="h2" layout="tile" showDescription />
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
    </div>
  );
}
