import { useState } from "react";
import { Link } from "react-router";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/ScrollReveal";
import { founders, type Founder } from "../content/team";
import { site } from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";

function PersonPhoto({ founder }: { founder: Founder }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`studio-person-portrait${!founder.photo || failed ? " is-initials" : ""}`}>
      {founder.photo && !failed ? <img src={founder.photo} alt={`Portrait of ${founder.name}`} width={416} height={416} loading="lazy" decoding="async" onError={() => setFailed(true)} /> : <span aria-hidden="true">{founder.initials}</span>}
      <span className="studio-person-portrait-index" aria-hidden="true">REFRACT / PEOPLE</span>
    </div>
  );
}
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
    body: "Every client gets senior attention — not a junior team managed by a senior one. We ask hard questions, push back when scope does not serve the goal, and stay engaged past launch.",
  },
];

export default function About() {
  usePageMeta("About — Refract Labs", "A Nairobi software studio. Meet the senior team that designs, builds, and supports your software.", "/about");
  return (
    <div className="studio-page software-scroll-content">
      <header className="studio-header">
        <Reveal className="studio-header-copy ai-mask-head" rise={false}>
          <span className="studio-location"><FiMapPin aria-hidden="true" /> NAIROBI, KENYA</span>
          <h1><span className="ai-mask-word"><span>Built by engineers.</span></span><br /><span className="ai-mask-word"><span>Run by people who care.</span></span></h1>
          <p className="ai-mask-after">We’re Refract Labs. A small, senior team that turns your ideas into software—and stays close to the work long after launch.</p>
          <div className="studio-header-links ai-mask-after"><Link to="/work">Explore our work <FiArrowUpRight aria-hidden="true" /></Link><a href="#studio-team">Meet the team <FiArrowUpRight aria-hidden="true" /></a></div>
        </Reveal>
      </header>
      <section className="studio-story-section" aria-labelledby="studio-story-heading">
        <Reveal className="studio-story-panel" rise={false}>
          <div className="studio-story-intro">
            <span className="studio-eyebrow">WHY REFRACT EXISTS</span>
            <h2 id="studio-story-heading">A smaller team.<br />A longer view.</h2>
            <p>{story[0].body}</p>
          </div>
          <div className="studio-story-aside">
            <p className="studio-statement">The people on the call<br />are the people on the work.</p>
            <dl className="studio-facts">
              <div><dt>Projects shipped</dt><dd>{site.projectsShipped}</dd></div>
              <div><dt>Client retention</dt><dd>{site.clientRetention}</dd></div>
              <div><dt>Founders, directly involved</dt><dd>{String(founders.length).padStart(2, "0")}</dd></div>
            </dl>
          </div>
        </Reveal>
      </section>
      <section className="studio-principles" aria-labelledby="studio-principles-heading">
        <Reveal className="studio-section-heading ai-mask-head" rise={false}>
          <span className="projects-eyebrow">OUR APPROACH</span>
          <h2 id="studio-principles-heading"><span className="ai-mask-word"><span>How we show up.</span></span></h2>
        </Reveal>
        <div className="studio-principles-grid">
          {story.slice(1).map((item, index) => (
            <Reveal key={item.heading} className="studio-principle offer-card-reveal" rise={false} delay={index * 120}>
              <span className="studio-principle-number">0{index + 1}</span>
              <h3>{item.heading}</h3><p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="studio-team" id="studio-team" aria-labelledby="studio-team-heading">
        <Reveal className="studio-team-heading studio-section-heading ai-mask-head" rise={false}>
          <div><span className="projects-eyebrow">THE PEOPLE</span><h2 id="studio-team-heading"><span className="ai-mask-word"><span>Who you work with.</span></span></h2></div>
          <p className="ai-mask-after">Three founders. Complementary skills.<br />Direct access to the people responsible.</p>
        </Reveal>
        <div className="studio-team-grid">
          {founders.map((founder, index) => (
            <Reveal as="article" key={founder.name} className="studio-person offer-card-reveal" rise={false} delay={index * 120}>
              <PersonPhoto founder={founder} />
              <div className="studio-person-heading"><h3>{founder.name}</h3><div className="studio-person-socials">
                {founder.linkedin && <a href={founder.linkedin} target="_blank" rel="noreferrer" aria-label={`${founder.name} on LinkedIn`}><FiLinkedin aria-hidden="true" /></a>}
                {founder.github && <a href={founder.github} target="_blank" rel="noreferrer" aria-label={`${founder.name} on GitHub`}><FiGithub aria-hidden="true" /></a>}
              </div></div>
              <p className="studio-person-role">{founder.role}</p><p className="studio-person-bio">{founder.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <PageCTA eyebrow="Let's talk" headline="Good work starts with a conversation." sub="Tell us what you have in mind. You will hear directly from the team who would build it." />
    </div>
  );
}