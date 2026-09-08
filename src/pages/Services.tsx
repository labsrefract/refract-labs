import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import { services } from "../content/services";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Services() {
  usePageMeta(
    "Services — Refract Labs",
    "Web apps, mobile apps, automation, MVP development, and technical consulting from Refract Labs.",
    "/services",
  );

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Engineering, end to end."
        subtitle="Web, mobile, automation, MVPs, and consulting — from the first sketch through production and the iterations after."
      />

      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {services.map((s, i) => (
            <Reveal
              as="article"
              key={s.id}
              id={s.id}
              delay={i * 50}
              className="service-chapter"
            >
              <span className="service-chapter-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="service-chapter-kicker">{s.kicker}</p>
              <h2 className="service-chapter-title">{s.title}</h2>
              <div className="service-chapter-body">
                <p className="service-chapter-desc">{s.desc}</p>
                <p className="eyebrow">Included</p>
                <ul className="service-includes">
                  {s.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCTA sub="Tell us what you are building and we will figure out the right approach together." />
    </>
  );
}
