import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import { BrandMark } from "../components/Logo";
import { founders } from "../content/team";
import { usePageMeta } from "../hooks/usePageMeta";

const story = [
  {
    heading: "Why we started Refract Labs",
    body: "We started Refract Labs after watching the same pattern too many times: a founder with a sharp idea, a large agency with a long contract, and a codebase that was unmaintainable by the time the engagement ended. We wanted a smaller model — a senior team that treats every project like a product they will still have to live with.",
  },
  {
    heading: "What we believe about software",
    body: "Good software is specific. It solves a real problem for real people, and it does not try to solve problems that have not arrived yet. We have seen products fail not because of bad technology but because of scope that ballooned before anyone had validation. We build lean, we build clean, and we build for the next engineer as much as for the next user.",
  },
  {
    heading: "How we work with clients",
    body: "We take on a small number of projects at a time, by design. Every client gets senior attention — not a junior team managed by a senior one. We ask hard questions, push back when scope does not serve the goal, and stay engaged past launch.",
  },
];

export default function About() {
  usePageMeta(
    "About — Refract Labs",
    "Refract Labs is a software studio. Every project is handled directly by the people who build it.",
  );

  return (
    <>
      <PageHeader
        eyebrow="The studio"
        title={
          <>
            Built by engineers,
            <br />
            run by engineers.
          </>
        }
        subtitle="Refract Labs is a software studio. No account managers, no junior developers, no outsourced work. Every project is handled directly by the people who build it."
      />

      <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="eyebrow">The story</p>
            <BrandMark
              className="mt-6 w-full max-w-[220px] rounded-xl object-cover logo-lockup"
              alt="Refract Labs"
            />
          </div>
          <div>
            {story.map((s, i) => (
              <div
                key={s.heading}
                className="py-8"
                style={i < story.length - 1 ? { borderBottom: "1px solid var(--border)" } : undefined}
              >
                <h2 className="text-xl font-bold mb-3">{s.heading}</h2>
                <p style={{ color: "var(--muted)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-10">
            <p className="eyebrow">Founders</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Who you work with.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {founders.map((f) => (
              <article
                key={f.name}
                className="p-8"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
              >
                {f.photo ? (
                  <img
                    src={f.photo}
                    alt=""
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover object-top mb-5"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-sm font-semibold"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)", fontFamily: "var(--font-display)" }}
                    aria-hidden="true"
                  >
                    {f.initials}
                  </div>
                )}
                <h3 className="text-lg font-bold">{f.name}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--accent)" }}>
                  {f.role}
                </p>
                <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                  {f.bio}
                </p>
                {f.linkedin || f.github ? (
                  <div className="flex flex-wrap gap-3">
                    {f.linkedin ? (
                      <a href={f.linkedin} className="nav-link text-sm" target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                    ) : null}
                    {f.github ? (
                      <a href={f.github} className="nav-link text-sm" target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    ) : null}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {f.stack.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCTA sub="We are selective about what we take on, which means the projects we do take on get our full attention." />
    </>
  );
}
