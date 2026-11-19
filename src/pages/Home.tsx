import { useEffect, useRef, useState } from "react"
import heroWorkspace from "../assets/hero-workspace.jpeg"
import { Link } from "react-router"
import { FiArrowUpRight } from "react-icons/fi"
import EngagementOptions from "../components/EngagementOptions"
import SoftwareFAQ from "../components/SoftwareFAQ"
import PageCTA from "../components/PageCTA"
import Reveal from "../components/ScrollReveal"
import { ButtonLink } from "../components/Button"
import ServiceArt, { type ServiceArtKind } from "../components/ServiceArt"
import ShowcaseCard from "../components/ShowcaseCard"
import { usePageMeta } from "../hooks/usePageMeta"
import { processSteps } from "../content/process"
import { categoryPath, serviceCategories } from "../content/services"
import { site } from "../content/site"
import { testimonials } from "../content/team"
import { caseStudies } from "../content/work"

const homepageProjects = caseStudies.filter((project) => project.featuredOnHome === true)

/** Proof under the hero: three numbers, kept out of the hero itself. */
const proofStats = [
  { value: site.projectsShipped, label: "Projects shipped" },
  { value: site.clientRetention, label: "Client retention" },
  { value: "1 day", label: "Typical reply" },
  { value: site.expertYears, label: "Combined expert years" },
] as const

const serviceArt: Record<(typeof serviceCategories)[number]["id"], ServiceArtKind> = {
  "software-development": "software",
  "infrastructure-devops": "infrastructure",
  "design": "design",
  "strategy-advisory": "strategy",
  "support-maintenance": "support",
}

const heroCards = serviceCategories.map((category) => ({
  art: serviceArt[category.id],
  label: category.kicker,
  title: category.title,
  copy: category.intro,
  to: categoryPath(category.id),
}))

function Hero() {
  const [visible, setVisible] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (carouselRef.current) observer.observe(carouselRef.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section className="hero sw-hero-framed">
      <div className="sw-hero-shell">
        <div className="sw-hero-stage">
          <div className="reference-hero-photo" aria-hidden="true" style={{ backgroundImage: `url(${heroWorkspace})` }} />
          <div className="reference-hero-copy">
            <span className="reference-hero-label">{site.tagline}</span>
            <h1 className="software-hero-reveal-title">
              <span className="sr-only">We bend ideas into products.</span>
              <span className="software-hero-line" aria-hidden="true"><span>We bend ideas</span></span>
              <span className="software-hero-line" aria-hidden="true"><span>into products.</span></span>
            </h1>
            <p>We design, build, and look after software for startups and growing businesses who need to move fast without cutting corners — products, the cloud they run on, and the work after launch.</p>
            <div className="reference-hero-actions"><ButtonLink to="/contact">Start a project</ButtonLink><ButtonLink to="/work" variant="ghost">See the work</ButtonLink></div>
          </div>
          <div className="reference-hero-art" ref={carouselRef}>
            <div className="reference-art-dots" aria-hidden="true" />
            <div className="reference-carousel-window" role="region" aria-label="Our software services">
              <div className={`reference-carousel-track${visible ? " is-visible" : ""}`}>
                {[0, 1].map((copy) => (
                  <div key={copy} className="reference-carousel-group" aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
                    {heroCards.map((card, index) => (
                      <Link key={card.label} to={card.to} className="reference-feature-card" tabIndex={copy === 1 ? -1 : undefined}>
                        <Reveal className="hero-card-entry" rise={false} delay={index * 80}>
                        <div className="reference-card-top"><span className="reference-card-icon"><ServiceArt kind={card.art} /></span><span className="reference-card-active-status">ACTIVE</span></div>
                        <span className="reference-card-kicker">{card.label}</span>
                        <h2>{card.title}</h2>
                        <p>{card.copy}</p>
                        <span className="reference-card-category"><span>Explore services</span><FiArrowUpRight aria-hidden="true" /></span>
                        </Reveal>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="sw-hero-footer">
          <Link to="/about" className="reference-team">
            <span className="reference-team-mark" aria-hidden="true">r.</span>
            <span><strong>Your software team</strong><small>From first sketch to ongoing support</small><i /></span>
          </Link>
          <ProofStrip />
        </div>
      </div>
    </section>
  )
}
function ProofStrip() {
  return (
    <section className="sw-proof" aria-label="Refract Software in numbers">
      <dl className="sw-proof-list max-w-7xl mx-auto px-6 lg:px-10">
        {proofStats.map((stat) => (
          <div key={stat.label} className="sw-proof-stat">
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function WorkTeaser() {
  return (
    <section className="projects-section home-showcase py-16 lg:py-24" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="projects-heading ai-mask-head flex items-end justify-between gap-4 mb-8 flex-wrap" rise={false}>
          <div className="projects-heading-copy"><span className="projects-eyebrow">SELECTED WORK</span><h2 className="text-3xl sm:text-4xl"><span className="ai-mask-word"><span>Ideas we’ve put to work.</span></span></h2></div>
          <p className="projects-intro ai-mask-after">A place to showcase your craft. A simpler way to take bookings. A clearer path to an enquiry. Here’s how we’ve helped businesses put their next idea into practice.</p>
        </Reveal>
        <ul className="showcase-grid">
          {homepageProjects.map((project, index) => (
            <Reveal as="li" key={project.slug} className="showcase-item" delay={(index % 2) * 90}>
              <ShowcaseCard project={project} />
            </Reveal>
          ))}
        </ul>
        <div className="showcase-more">
          <ButtonLink to="/work" variant="ghost">
            See all projects <FiArrowUpRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
const serviceSummaries = {
  "software-development": "Web apps, mobile apps, MVPs and custom systems. Built for your users, and for the engineer who comes next.",
  "infrastructure-devops": "Cloud architecture, automation, deployment pipelines and databases. The foundations that keep your software running.",
  "design": "Clear interfaces and clickable prototypes. Test the experience before you commit to the build.",
  "strategy-advisory": "Senior guidance on architecture, product direction and delivery. A practical plan your team can work with.",
  "support-maintenance": "Maintenance, testing and dedicated engineers. Named people to keep production healthy after launch.",
}

/**
 * One tile of the "What we do" bento. `slot` places it in the grid (a–f) and
 * decides where its illustration sits; `tone` alternates the surface shade.
 */
function BentoTile({
  slot,
  tone,
  to,
  art,
  kicker,
  title,
  summary,
  delay = 0,
}: {
  slot: "a" | "b" | "c" | "d" | "e" | "f"
  tone: "raised" | "sunken"
  to: string
  art: ServiceArtKind
  kicker: string
  title: string
  summary: string
  delay?: number
}) {
  return (
    <Reveal className={`offer-card-reveal offer-slot-${slot}`} rise={false} delay={delay}>
      <Link to={to} className={`offer-bento-tile offer-bento-${tone}`}>
        <ServiceArt kind={art} className="offer-bento-art" />
        <div className="offer-bento-copy">
          <span className="offer-bento-kicker">{kicker}</span>
          <h3>{title}</h3>
          <p>{summary}</p>
        </div>
        <FiArrowUpRight className="offer-tile-arrow" aria-hidden="true" />
      </Link>
    </Reveal>
  )
}

function ServicesTeaser() {
  const [software, infrastructure, design, strategy, support] = serviceCategories
  const tile = (category: (typeof serviceCategories)[number]) => ({
    to: categoryPath(category.id),
    art: serviceArt[category.id],
    kicker: category.kicker,
    title: category.title,
    summary: serviceSummaries[category.id],
  })
  return (
    <section className="offer-section" aria-labelledby="offer-heading">
      <div className="offer-panel">
        <Reveal className="offer-heading ai-mask-head" rise={false}>
          <h2 id="offer-heading"><span className="ai-mask-word"><span>What we do.</span></span></h2>
          <p className="ai-mask-after">Software, infrastructure, design, advisory, and support.<br />From the first sketch through production.</p>
        </Reveal>
        <div className="offer-mosaic offer-bento">
          <BentoTile slot="a" tone="sunken" {...tile(software)} />
          <BentoTile slot="b" tone="raised" delay={100} {...tile(infrastructure)} />
          <BentoTile slot="c" tone="sunken" delay={160} {...tile(design)} />
          <BentoTile slot="d" tone="sunken" delay={220} {...tile(strategy)} />
          <BentoTile slot="e" tone="raised" delay={160} {...tile(support)} />
          <BentoTile
            slot="f"
            tone="sunken"
            delay={260}
            to="/services"
            art="next"
            kicker="All services"
            title="Find your next step."
            summary="Not sure where to start? Explore everything we do."
          />
        </div>
      </div>
    </section>
  )
}
function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function Voices() {
  if (!testimonials.length) return null
  return (
    <section className="client-stories" aria-labelledby="client-stories-heading">
      <div className="client-stories-shell">
        <Reveal className="client-stories-heading ai-mask-head" rise={false}>
          <span className="projects-eyebrow">TESTIMONIALS</span>
          <h2 id="client-stories-heading"><span className="ai-mask-word"><span>The experience of working together.</span></span></h2>
        </Reveal>
        <ul className="client-stories-grid">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.name} className="client-story-reveal offer-card-reveal" rise={false} delay={index * 120}>
              <figure className="client-story">
                <div className="client-story-body">
                  <span className="client-story-quote-mark" aria-hidden="true">“</span>
                  <blockquote>{testimonial.quote}</blockquote>
                </div>
                <figcaption className="client-story-author">
                  <span className="client-story-avatar" aria-hidden="true">{initialsFromName(testimonial.name)}</span>
                  <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small>
                    {testimonial.workSlug ? <Link to={`/work/${testimonial.workSlug}`}>{testimonial.company}</Link> : <small>{testimonial.company}</small>}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
/**
 * "Our process" on the homepage: a compact four-step timeline (across on
 * desktop, down on phones). The /process page keeps the fuller zigzag view
 * with each phase's detail, so this links there rather than repeating it.
 */
function ProcessTeaser() {
  return (
    <section className="process-journey home-timeline" aria-labelledby="process-journey-heading">
      <div className="process-journey-shell">
        <Reveal className="process-journey-heading ai-mask-head" rise={false}>
          <span className="projects-eyebrow">THE PROCESS</span>
          <h2 id="process-journey-heading"><span className="ai-mask-word"><span>Our process.</span></span></h2>
          <p className="ai-mask-after">Four phases. One team. You see the work as it happens.</p>
        </Reveal>
        <ol className="timeline">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.id} className="timeline-step offer-card-reveal" rise={false} delay={index * 90}>
              <Link to={`/process#${step.id}`} className="timeline-link">
                <span className="timeline-node" aria-hidden="true">
                  <ServiceArt kind={step.art} />
                </span>
                <span className="timeline-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.teaser}</p>
                <p className="timeline-get">
                  <span>You get</span>
                  {step.youGet}
                </p>
              </Link>
            </Reveal>
          ))}
        </ol>
        <div className="timeline-more">
          <ButtonLink to="/process" variant="ghost">
            A closer look at how we work <FiArrowUpRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
export default function Home() {
  usePageMeta(
    "Refract Labs — From sketch through production",
    "Refract Labs designs, builds, and looks after software — products, infrastructure, design, advisory, and support — for startups and growing businesses.",
    "/",
  )

  return (
    <>
      <Hero />
      <div className="software-scroll-content">
      <ServicesTeaser />
      <EngagementOptions />
      <WorkTeaser />
      <ProcessTeaser />
      {testimonials.length ? <Voices /> : null}
      <SoftwareFAQ />
      <PageCTA />
      </div>
    </>
  )
}
