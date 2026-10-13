import { Link } from "react-router"
import { FiLayers, FiTool, FiUsers } from "react-icons/fi"
import { engagements } from "../content/engagements"
import Reveal from "./ScrollReveal"
const icons = [FiLayers, FiTool, FiUsers]

export default function EngagementOptions() {
  return (
    <section
      className="engagement-section"
      aria-labelledby="engagement-heading"
    >
      <div className="engagement-shell">
        <Reveal className="engagement-heading ai-mask-head" rise={false}>
          <span className="projects-eyebrow">WAYS TO WORK TOGETHER</span>
          <h2 id="engagement-heading">
            <span className="ai-mask-word">
              <span>A fit for your next step.</span>
            </span>
          </h2>
          <p className="ai-mask-after">
            A focused build, ongoing care, or extra hands on your team. Start
            with what your business needs.
          </p>
        </Reveal>
        <ol className="engagement-mosaic">
          {engagements.map((item, index) => {
            const Icon = icons[index]
            return (
              <Reveal
                as="li"
                key={item.id}
                className={`engagement-card-reveal engagement-position-${index} offer-card-reveal`}
                rise={false}
                delay={index * 90}
              >
                <Link
                  className={`engagement-card engagement-card-${item.id}`}
                  to={`/contact?engagement=${item.id}#write`}
                >
                  <div className="engagement-card-top">
                    <span className="engagement-number">
                      {String(index + 1).padStart(2, "0")} / WORK WITH US
                    </span>
                    <Icon className="engagement-icon" aria-hidden="true" />
                  </div>
                  <div className="engagement-card-body">
                    <div className="engagement-title">
                      <span className="engagement-audience">
                        {item.audience}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <ul className="engagement-includes">
                      {item.includes.map((line, lineIndex) => (
                        <li key={line}>
                          <span aria-hidden="true">
                            {String(lineIndex + 1).padStart(2, "0")}
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="engagement-card-foot">
                    Talk about this
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ol>
        <p className="engagement-note">
          Scope, responsibilities and fees are agreed before work starts.
        </p>
      </div>
    </section>
  )
}
