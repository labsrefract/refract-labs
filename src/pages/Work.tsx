import PageCTA from "../components/PageCTA";
import Reveal from "../components/ScrollReveal";
import ShowcaseCard from "../components/ShowcaseCard";
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

      {/* The same project cards as the homepage, with the tools each one was built with. An odd last card spans the full width. */}
      <section className="work-showcase" aria-label="Projects">
        <ul className="showcase-grid">
          {caseStudies.map((project, index) => (
            <Reveal as="li" key={project.slug} className="showcase-item" delay={(index % 2) * 90}>
              <ShowcaseCard project={project} heading="h2" showStack />
            </Reveal>
          ))}
        </ul>
      </section>

      <PageCTA
        eyebrow="Next up"
        headline="Your project could be next."
        sub="We take on a small number of projects each quarter. If you have something to build, let's talk."
      />
    </div>
  );
}
