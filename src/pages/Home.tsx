import { Link } from "react-router";
import Eyebrow from "../components/Eyebrow";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import { BrandMark } from "../components/Logo";
import { ButtonLink } from "../components/Button";
import { usePageMeta } from "../hooks/usePageMeta";
import { services } from "../content/services";
import { caseStudies } from "../content/work";
import { testimonials } from "../content/team";

const steps = ["Discover", "Design", "Build", "Launch"];

function Hero() {
  return (
    <section className="hero pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Eyebrow text="Software · Intelligence · Security" className="hero-in hero-in-1" />
          <h1 className="hero-in hero-in-2 text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold" style={{ color: "var(--text)" }}>
            We bend ideas
            <br />
            into products.
          </h1>
          <p className="hero-in hero-in-3 mt-6 text-lg max-w-lg" style={{ color: "var(--muted)" }}>
            Refract Labs designs and builds web apps, mobile apps, automation, and MVPs for startups and growing businesses who need
            to move fast without cutting corners.
          </p>
          <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/contact">Start a project</ButtonLink>
            <ButtonLink to="/work" variant="ghost">
              See the work
            </ButtonLink>
          </div>
        </div>
        <div className="hero-visual min-w-0 flex justify-center lg:justify-end">
          <BrandMark
            className="hero-logo hero-in hero-in-5 w-full max-w-sm lg:max-w-md rounded-2xl object-cover"
            alt="Refract Labs — Software, Intelligence, Security"
          />
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="py-16 lg:py-20" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <Eyebrow text="What clients say" />
            <h2 className="text-2xl sm:text-3xl font-bold">From the people we ship with.</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal
              as="figure"
              key={i}
              delay={i * 80}
              className="p-6 lg:p-8"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
            >
              <blockquote className="text-lg leading-relaxed" style={{ color: "var(--text)" }}>
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm" style={{ color: "var(--muted)" }}>
                {t.attribution}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <Eyebrow text="What we do" />
            <h2 className="text-2xl sm:text-3xl font-bold">Engineering, end to end.</h2>
          </div>
          <Link to="/services" className="nav-link">
            All services →
          </Link>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 70} className="h-full">
              <Link to={`/services#${s.id}`} className="card-link p-6 lg:p-7">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
                {s.kicker}
              </p>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-[15px]" style={{ color: "var(--muted)" }}>
                {s.summary}
              </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkTeaser() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--surface-2)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <Eyebrow text="Selected work" />
            <h2 className="text-2xl sm:text-3xl font-bold">Selected work.</h2>
          </div>
          <Link to="/work" className="nav-link">
            All work →
          </Link>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {caseStudies.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70} className="h-full">
              <Link to={`/work/${p.slug}`} className="card-link p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                  {p.sector}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{p.name}</h3>
              <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                {p.summary}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTeaser() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <Eyebrow text="How we work" />
            <h2 className="text-2xl sm:text-3xl font-bold">From idea to launch.</h2>
          </div>
          <Link to="/process" className="nav-link">
            The process →
          </Link>
        </Reveal>
        <Reveal as="ol" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((title, i) => (
            <li
              key={title}
              className="p-5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
            >
              <span className="block text-sm font-semibold mb-2" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-bold">{title}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    "Refract Labs — Software, Intelligence, Security",
    "Refract Labs designs and builds web apps, mobile apps, automation, and MVPs for startups and growing businesses.",
  );

  return (
    <>
      <Hero />
      <Proof />
      <ServicesTeaser />
      <WorkTeaser />
      <ProcessTeaser />
      <PageCTA />
    </>
  );
}
