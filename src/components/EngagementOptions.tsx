import { Link } from "react-router"
import { FiArrowUpRight } from "react-icons/fi"
import { engagementRows, engagements } from "../content/engagements"
import Reveal from "./ScrollReveal"
import ServiceArt from "./ServiceArt"

/**
 * "Ways to work together": the three engagements as equal columns that share
 * the same rows (Best for, How it runs, Commitment, You get), so they can be
 * compared at a glance. On wide screens the columns use a subgrid, which keeps
 * each row level across all three cards whatever the length of its text.
 */
export default function EngagementOptions() {
  return (
    <section className="engagement-section" aria-labelledby="engagement-heading">
      <div className="engagement-shell">
        <Reveal className="engagement-heading ai-mask-head" rise={false}>
          <span className="projects-eyebrow">WAYS TO WORK TOGETHER</span>
          <h2 id="engagement-heading">
            <span className="ai-mask-word">
              <span>Pick the fit for your team.</span>
            </span>
          </h2>
          <p className="ai-mask-after">
            A focused build, ongoing care, or extra hands on your team. Compare
            them side by side.
          </p>
        </Reveal>
        <ul className="engagement-compare">
          {engagements.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              className="engagement-card-reveal offer-card-reveal"
              rise={false}
              delay={index * 90}
            >
              <article className={`engagement-card engagement-card-${item.id}`} aria-labelledby={`engagement-${item.id}`}>
                <ServiceArt kind={item.art} className="engagement-art" />
                <h3 id={`engagement-${item.id}`}>{item.title}</h3>
                <p className="engagement-summary">{item.description}</p>
                <dl className="engagement-facts">
                  {engagementRows.map((row) => (
                    <div key={row.key} className="engagement-fact">
                      <dt>{row.label}</dt>
                      <dd>{item[row.key]}</dd>
                    </div>
                  ))}
                </dl>
                <Link className="engagement-cta" to={`/contact?engagement=${item.id}#write`}>
                  {item.cta}
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="engagement-note">
          Scope, responsibilities and fees are agreed before work starts.
        </p>
      </div>
    </section>
  )
}
