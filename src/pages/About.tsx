import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/Reveal";
import { founders } from "../content/team";
import { usePageMeta } from "../hooks/usePageMeta";

const story = [
  {
    heading: "Why we started",
    body: "We started Refract Labs after watching the same pattern too many times: a founder with a sharp idea, a large agency with a long contract, and a codebase that was unmaintainable by the time the engagement ended. We wanted a smaller model — senior people who treat every project like a product they will still have to live with.",
  },
  {
    heading: "What we believe",
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
    "/about",
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
        subtitle="No account managers, no junior developers, no outsourced work. Every project is handled directly by the people who build it."
      />

      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="about-story">
          {story.map((s, i) => (
            <Reveal key={s.heading} delay={i * 60} className="about-essay">
              <h2 className="about-essay-title">{s.heading}</h2>
              <p className="about-essay-body">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-people">
        <div className="about-people-inner">
          <Reveal className="about-people-head">
            <p className="eyebrow">The people</p>
            <h2 className="about-people-title">Who you work with.</h2>
            <p className="about-people-lead">
              Nairobi. Direct. The people on the call are the people who write the code.
            </p>
          </Reveal>

          {founders.map((f, i) => (
            <Reveal as="article" key={f.name} delay={i * 70} className="about-person">
              {f.photo ? (
                <img
                  src={f.photo}
                  alt={`Portrait of ${f.name}`}
                  width={104}
                  height={104}
                  className="about-person-photo"
                />
              ) : (
                <div className="about-person-photo about-person-fallback" aria-hidden="true">
                  {f.initials}
                </div>
              )}
              <div className="about-person-id">
                <h3 className="about-person-name">{f.name}</h3>
                <p className="about-person-role">{f.role}</p>
              </div>
              <div className="about-person-copy">
                <p className="about-person-bio">{f.bio}</p>
                {f.linkedin || f.github ? (
                  <p className="about-person-links">
                    {f.linkedin ? (
                      <a href={f.linkedin} className="nav-link" target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                    ) : null}
                    {f.linkedin && f.github ? <span aria-hidden="true"> · </span> : null}
                    {f.github ? (
                      <a href={f.github} className="nav-link" target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    ) : null}
                  </p>
                ) : null}
                <ul className="about-person-stack">
                  {f.stack.map((tag) => (
                    <li key={tag}>
                      <span className="chip">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCTA sub="We are selective about what we take on, which means the projects we do take on get our full attention." />
    </>
  );
}
