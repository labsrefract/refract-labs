import { Link, useParams } from "react-router";
import { getCaseStudy } from "../content/work";
import { ButtonLink } from "../components/Button";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import NotFound from "./NotFound";

const sections = [
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
  );

  if (!project) return <NotFound />;

  return (
    <article className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal>
        <p className="mb-6">
          <Link to="/work" className="nav-link">
            ← All work
          </Link>
        </p>
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
          {project.sector}
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">{project.name}</h1>
        <p className="mt-5 text-lg" style={{ color: "var(--muted)" }}>
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-12">
          {sections.map((s, i) => (
            <Reveal as="section" key={s.key} delay={i * 80}>
              <h2 className="text-2xl font-bold mb-3">{s.label}</h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                {project[s.key]}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
          <ButtonLink to="/contact">Start a project</ButtonLink>
        </div>
      </div>
    </article>
  );
}
