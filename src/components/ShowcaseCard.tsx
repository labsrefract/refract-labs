import { Link } from "react-router"
import { FiArrowUpRight } from "react-icons/fi"
import type { CaseStudy } from "../content/work"

/** The site's address without the protocol or "www.", for the browser-frame bar. */
function siteHost(url?: string) {
  if (!url) return ""
  try {
    return new URL(url).host.replace(/^www\./, "")
  } catch {
    return ""
  }
}

/**
 * A project card for the homepage and /work: the full screenshot in a browser
 * frame (the frame matches the screenshots' wide 1440 × 672 shape so their
 * sides are not cut), then the sector, name and what changed for the client.
 * The title link stretches over the whole card; "Visit site" sits above it so
 * it stays its own link. `showStack` adds the tools used, for the /work page.
 */
export default function ShowcaseCard({
  project,
  heading: Heading = "h3",
  showStack = false,
}: {
  project: CaseStudy
  heading?: "h2" | "h3"
  showStack?: boolean
}) {
  const host = siteHost(project.url)
  return (
    <article className="showcase-card">
      <div className="showcase-frame" aria-hidden="true">
        <div className="showcase-bar">
          <span className="showcase-dot" />
          <span className="showcase-dot" />
          <span className="showcase-dot" />
          {host ? <span className="showcase-url">{host}</span> : null}
        </div>
        {project.image ? (
          <img src={project.image} alt="" width={1440} height={672} className="showcase-shot" loading="lazy" decoding="async" />
        ) : (
          <div className="showcase-shot showcase-shot-blank" />
        )}
      </div>
      <div className="showcase-body">
        <span className="showcase-sector">{project.sector}</span>
        <Heading className="showcase-title">
          <Link to={`/work/${project.slug}`} className="showcase-link">
            {project.name}
          </Link>
        </Heading>
        <p>{project.result}</p>
        {showStack && project.stack.length ? (
          <ul className="showcase-stack" aria-label={`Built with`}>
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        ) : null}
        <div className="showcase-actions">
          <span className="showcase-read" aria-hidden="true">
            Read the case study <FiArrowUpRight />
          </span>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer" className="showcase-visit">
              Visit site <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> (opens {host || project.name} in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
