import { Link, useParams } from "react-router";
import { caseStudies, getCaseStudy } from "../content/work";
import { ButtonLink } from "../components/Button";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import NotFound from "./NotFound";

const beats = [
  { key: "challenge", label: "Challenge" },
  { key: "approach", label: "Approach" },
  { key: "result", label: "Result" },
] as const;

export default function WorkDetail() {
  const { slug } = useParams();
  const project = slug ? getCaseStudy(slug) : undefined;

  usePageMeta(
    project ? `${project.name} — Refract Labs` : "Work — Refract Labs",
    project?.summary ?? "Case study from Refract Labs.",
    slug ? `/work/${slug}` : "/work",
  );

  if (!project) return <NotFound />;

  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = index >= 0 ? caseStudies[(index + 1) % caseStudies.length] : undefined;

  return (
    <article className="work-case">
      <div className="work-case-inner">
        <Reveal className="work-case-head">
          <p className="mb-6">
            <Link to="/work" className="nav-link">
              ← All work
            </Link>
          </p>
          <p className="work-case-kicker">{project.sector}</p>
          <h1 className="work-case-title">{project.name}</h1>
          <p className="work-case-summary">{project.summary}</p>
        </Reveal>

        {project.image ? (
          <Reveal className="work-case-figure" delay={50}>
            <img
              src={project.image}
              alt={`${project.name} homepage`}
              width={1440}
              height={900}
              className="work-shot"
              fetchPriority="high"
              decoding="async"
            />
          </Reveal>
        ) : null}

        <Reveal className="work-case-meta" delay={80}>
          <ul className="work-case-stack">
            {project.stack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          {project.url ? (
            <a href={project.url} className="nav-link" target="_blank" rel="noreferrer">
              Visit site →
            </a>
          ) : null}
        </Reveal>

        <div className="work-case-beats">
          {beats.map((s, i) => (
            <Reveal as="section" key={s.key} delay={i * 50} className="work-case-beat">
              <h2>{s.label}</h2>
              <p>{project[s.key]}</p>
            </Reveal>
          ))}
        </div>

        <div className="work-case-foot">
          {next && next.slug !== project.slug ? (
            <Link to={`/work/${next.slug}`} className="work-case-next">
              <span>Next</span>
              {next.name}
            </Link>
          ) : null}
          <ButtonLink to="/contact">Start a project</ButtonLink>
        </div>
      </div>
    </article>
  );
}
