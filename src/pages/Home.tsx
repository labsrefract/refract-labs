import { Link } from "react-router";
import Eyebrow from "../components/Eyebrow";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import WorkCard from "../components/WorkCard";
import { ButtonLink } from "../components/Button";
import { usePageMeta } from "../hooks/usePageMeta";
import { processSteps } from "../content/process";
import { serviceCategories } from "../content/services";
import { site } from "../content/site";
import { testimonials } from "../content/team";
import { caseStudies } from "../content/work";

const pictured = caseStudies.filter((p) => p.image);
const unpictured = caseStudies.filter((p) => !p.image);

const heroStats = [
  { value: site.projectsShipped, label: "Projects shipped" },
  { value: site.clientRetention, label: "Client retention" },
  { value: "1 day", label: "Typical reply" },
  { value: site.expertYears, label: "Combined expert years" },
] as const;

function Hero() {
  return (
    <section className="hero pt-28 pb-14 lg:pt-36 lg:pb-20">
      <div className="hero-stage max-w-7xl mx-auto px-6 lg:px-10">
        <div className="hero-copy">
          <Eyebrow text={site.tagline} className="hero-in hero-in-1" />
          <h1 className="hero-in hero-in-2 text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold" style={{ color: "var(--text)" }}>
            We bend ideas
            <br />
            into products.
          </h1>
          <p className="hero-in hero-in-3 mt-6 text-lg max-w-lg" style={{ color: "var(--muted)" }}>
            We design, build, and look after software for startups and growing businesses who need to move fast without cutting
            corners — products, the cloud they run on, and the work after launch.
          </p>
          <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/contact">Start a project</ButtonLink>
            <ButtonLink to="/work" variant="ghost">
              See the work
            </ButtonLink>
          </div>
        </div>
        <dl className="hero-stats hero-in hero-in-5">
          {heroStats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <dt className="hero-stat-label">{stat.label}</dt>
              <dd className="hero-stat-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function WorkTeaser() {
  return (
    <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <h2 className="text-2xl sm:text-3xl font-bold">Recent builds.</h2>
          <Link to="/work" className="nav-link">
            All work →
          </Link>
        </Reveal>

        <div className="home-work-grid">
          {pictured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <WorkCard project={p} layout="tile" />
            </Reveal>
          ))}
        </div>

        {unpictured.length ? (
          <div className="mt-4 flex flex-col gap-3">
            {unpictured.map((p) => (
              <Reveal key={p.slug}>
                <Link to={`/work/${p.slug}`} className="home-work-line">
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                    {p.sector}
                  </span>
                  <span className="font-bold">{p.name}</span>
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    {p.summary}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ServicesTeaser() {
  return (
    <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold">What we do.</h2>
        </Reveal>
        <Reveal>
          <p className="max-w-xl mb-10 text-[15px]" style={{ color: "var(--muted)" }}>
            Software, infrastructure, design, advisory, and support — from the first sketch through production.
          </p>
        </Reveal>
        <ol className="home-offer">
          {serviceCategories.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={i * 40}>
                <Link to={`/services/${s.id}`} className="home-offer-link">
                  <span className="home-offer-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="home-offer-kicker">{s.kicker}</span>
                  <h3 className="home-offer-title">{s.title}</h3>
                  <p className="home-offer-copy">{s.intro}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function VoiceStars({ rating }: { rating: number }) {
  return (
    <p className="home-voice-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={i < rating ? "is-on" : "is-off"} viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 2.6l2.47 7.04H22l-6.02 4.38 2.3 7.08L12 16.92l-6.28 4.18 2.3-7.08L2 9.64h7.53L12 2.6z" />
        </svg>
      ))}
    </p>
  );
}

function Voices() {
  if (!testimonials.length) return null;

  return (
    <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold">From clients.</h2>
        </Reveal>
        <Reveal>
          <p className="max-w-xl mb-10 text-[15px]" style={{ color: "var(--muted)" }}>
            A few words from people we have shipped with — and the work those words sit on.
          </p>
        </Reveal>
        <ul className="home-voices">
          {testimonials.map((t, i) => {
            const body = (
              <>
                <span className="home-voice-tab-back" aria-hidden="true" />
                <div className="home-voice-tab">
                  <p className="home-voice-name">{t.name}</p>
                  <p className="home-voice-role">{t.role}</p>
                </div>
                <span className="home-voice-avatar" aria-hidden="true">
                  {initialsFromName(t.name)}
                </span>
                <div className="home-voice-card">
                  <VoiceStars rating={t.rating} />
                  <p className="home-voice-quote">{t.quote}</p>
                </div>
              </>
            );

            return (
              <Reveal as="li" key={t.name} delay={i * 40}>
                {t.workSlug ? (
                  <Link to={`/work/${t.workSlug}`} className="home-voice">
                    {body}
                  </Link>
                ) : (
                  <blockquote className="home-voice">{body}</blockquote>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ProcessTeaser() {
  return (
    <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4 mb-4 flex-wrap">
          <h2 className="text-2xl sm:text-3xl font-bold">How we work.</h2>
          <Link to="/process" className="nav-link">
            The process →
          </Link>
        </Reveal>
        <Reveal>
          <p className="max-w-xl mb-10 text-[15px]" style={{ color: "var(--muted)" }}>
            Four phases from the first conversation to production. You see the work as it happens.
          </p>
        </Reveal>
        <ol className="home-process">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 50} className="home-process-step">
              <Link to={`/process#${s.id}`} className="home-process-link">
                <span className="home-process-num" aria-hidden="true">
                  {s.num}
                </span>
                <h3 className="home-process-title">{s.title}</h3>
                <p className="home-process-copy">{s.teaser}</p>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    "Refract Labs — From sketch through production",
    "Refract Labs designs, builds, and looks after software — products, infrastructure, design, advisory, and support — for startups and growing businesses.",
    "/",
  );

  return (
    <>
      <Hero />
      <ServicesTeaser />
      <WorkTeaser />
      <ProcessTeaser />
      {testimonials.length ? <Voices /> : null}
      <PageCTA />
    </>
  );
}
