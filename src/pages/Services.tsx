import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import { services } from "../content/services";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Services() {
  usePageMeta(
    "Services — Refract Labs",
    "Web apps, mobile apps, automation, MVP development, and technical consulting from Refract Labs.",
  );

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Engineering, end to end."
        subtitle="We work across the full product lifecycle — from the first sketch to production and the iterations after."
      />

      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-24 py-14 lg:py-16 grid lg:grid-cols-[minmax(0,280px)_1fr] gap-8 lg:gap-16"
              style={i < services.length - 1 ? { borderBottom: "1px solid var(--border)" } : undefined}
            >
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
                  {s.kicker}
                </p>
                <h2 className="text-2xl font-bold">{s.title}</h2>
              </div>
              <div>
                <p className="text-base mb-8" style={{ color: "var(--muted)" }}>
                  {s.desc}
                </p>
                <div
                  className="p-6"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                >
                  <p className="eyebrow">What's included</p>
                  <ul className="flex flex-col gap-3">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm" style={{ color: "var(--muted)" }}>
                        <span style={{ color: "var(--accent)" }} aria-hidden="true">
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PageCTA sub="Tell us what you are building and we will figure out the right approach together." />
    </>
  );
}
