import { Link } from "react-router";
import type { CaseStudy } from "../content/work";

export default function WorkCard({
  project,
  heading: Heading = "h3",
  layout = "card",
}: {
  project: CaseStudy;
  heading?: "h2" | "h3";
  layout?: "card" | "tile";
}) {
  if (layout === "tile") {
    return (
      <Link to={`/work/${project.slug}`} className="work-tile">
        {project.image ? (
          <img src={project.image} alt="" width={1440} height={900} className="work-shot" loading="lazy" decoding="async" />
        ) : (
          <div className="work-tile-blank" aria-hidden="true" />
        )}
        <div className="work-tile-caption">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            {project.sector}
          </span>
          <Heading className="text-[15px] font-bold mt-1">{project.name}</Heading>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/work/${project.slug}`} className={`card-link overflow-hidden ${project.image ? "" : "p-6 lg:p-7"}`}>
      {project.image ? (
        <img src={project.image} alt="" width={1440} height={900} className="work-shot" loading="lazy" decoding="async" />
      ) : null}
      <div className={project.image ? "p-6 lg:p-7 flex flex-col flex-1" : "contents"}>
        <span className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
          {project.sector}
        </span>
        <Heading className="text-lg font-bold mb-2">{project.name}</Heading>
        <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
