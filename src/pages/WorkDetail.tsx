import { Link, useParams } from "react-router";
import { FiArrowLeft, FiArrowUpRight, FiTarget, FiLayers, FiCheckCircle } from "react-icons/fi";
import { caseStudies, getCaseStudy } from "../content/work";
import Reveal from "../components/ScrollReveal";
import PageCTA from "../components/PageCTA";
import { usePageMeta } from "../hooks/usePageMeta";
import NotFound from "./NotFound";

const beats = [
  { key: "challenge", label: "The challenge", Icon: FiTarget },
  { key: "approach", label: "Our approach", Icon: FiLayers },
  { key: "result", label: "The result", Icon: FiCheckCircle },
] as const;

export default function WorkDetail() {
  const { slug } = useParams();
  const project = slug ? getCaseStudy(slug) : undefined;
  usePageMeta(project ? `${project.name} — Refract Labs` : "Work — Refract Labs", project?.summary ?? "Case study from Refract Labs.", slug ? `/work/${slug}` : "/work");
  if (!project) return <NotFound />;
  const index = caseStudies.findIndex((item) => item.slug === project.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="case-study-page software-scroll-content" key={project.slug}>
      <div className="case-study-shell">
        <Link to="/work" className="case-study-back"><FiArrowLeft aria-hidden="true" /> All work</Link>
        <header className="case-study-header">
          <Reveal className="ai-mask-head" rise={false}>
            <span className="projects-eyebrow">{project.sector}</span>
            <h1><span className="ai-mask-word"><span>{project.name}</span></span></h1>
            <p className="ai-mask-after">{project.summary}</p>
          </Reveal>
          <Reveal className="case-study-facts offer-card-reveal" rise={false}>
            <div><span>CLIENT</span><strong>{project.name}</strong></div>
            <div><span>SECTOR</span><strong>{project.sector}</strong></div>
            <div><span>BUILT WITH</span><ul>{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
            {project.url && <a href={project.url} target="_blank" rel="noreferrer">Visit live site <FiArrowUpRight aria-hidden="true" /></a>}
          </Reveal>
        </header>
        {project.image && <Reveal as="figure" className="case-study-preview offer-card-reveal" rise={false}>
          <div className="case-study-browser" aria-hidden="true"><span /><span /><span /><small>{project.url ? new URL(project.url).hostname : project.name}</small></div>
          <img src={project.image} alt={`${project.name} website homepage`} width={1440} height={900} fetchPriority="high" decoding="async" />
          <figcaption>{project.name} — website overview</figcaption>
        </Reveal>}
        <section className="case-study-story" aria-labelledby="case-study-story-title">
          <Reveal className="case-study-story-heading ai-mask-head" rise={false}><span className="projects-eyebrow">BEHIND THE BUILD</span><h2 id="case-study-story-title"><span className="ai-mask-word"><span>From problem</span></span><br /><span className="ai-mask-word"><span>to a working product.</span></span></h2></Reveal>
          <div className="case-study-beats">{beats.map(({ key, label, Icon }, position) => <Reveal as="section" key={key} className={`case-study-beat case-study-beat-${key} offer-card-reveal`} rise={false}>
            <div className="case-study-beat-top"><span className="case-study-beat-icon"><Icon aria-hidden="true" /></span><span>{String(position + 1).padStart(2, "0")}</span></div>
            <h3>{label}</h3><p>{project[key]}</p>
          </Reveal>)}</div>
        </section>
        {next && next.slug !== project.slug && <section className="case-study-next-section" aria-label="Next project"><Reveal rise={false}><Link className="case-study-next" to={`/work/${next.slug}`}>
          <div><span className="projects-eyebrow">EXPLORE THE NEXT PROJECT</span><h2>{next.name}</h2><p>{next.summary}</p><span className="case-study-next-action">View project <FiArrowUpRight aria-hidden="true" /></span></div>
          {next.image && <img src={next.image} alt={`${next.name} website preview`} width={640} height={400} loading="lazy" decoding="async" />}
        </Link></Reveal></section>}
      </div>
      <PageCTA headline="Have something in mind?" sub="Tell us what your business needs. We will help you turn the idea into a practical plan." />
    </article>
  );
}