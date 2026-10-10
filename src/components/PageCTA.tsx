import { Link } from "react-router";
import { FiArrowUpRight, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { ButtonLink } from "./Button";
import Reveal from "./ScrollReveal";
import { site } from "../content/site";

export default function PageCTA({
  eyebrow = "Start a project",
  headline = "Have something to build?",
  sub = "Tell us what you are working on. We reply within one business day.",
}: { eyebrow?: string; headline?: string; sub?: string }) {
  return (
    <section className="page-cta" aria-label="Start a conversation with Refract">
      <div className="page-cta-inner" data-theme="dark">
        <Reveal className="page-cta-copy ai-mask-head" rise={false}>
          <span className="page-cta-eyebrow">{eyebrow}</span>
          <h2 className="page-cta-title"><span className="ai-mask-word"><span>{headline}</span></span></h2>
          <p className="page-cta-sub ai-mask-after">{sub}</p>
          <div className="page-cta-actions ai-mask-after">
            <ButtonLink to="/contact">Start a project <FiArrowUpRight aria-hidden="true" /></ButtonLink>
            <Link to="/process" className="page-cta-process-link">See how we work <FiArrowUpRight aria-hidden="true" /></Link>
          </div>
        </Reveal>
        <Reveal className="page-cta-aside offer-card-reveal" rise={false} delay={150}>
          <span className="page-cta-contact-label">A DIRECT LINE TO THE TEAM</span>
          <h3>Let’s hear your idea.</h3>
          <p className="page-cta-contact-intro">An early thought, a detailed brief, or software that needs a fresh pair of eyes. Start where you are.</p>
          <a className="page-cta-mail" href={`mailto:${site.email}`}><FiMail aria-hidden="true" /><span>{site.email}</span><FiArrowUpRight aria-hidden="true" /></a>
          <div className="page-cta-contact-meta"><span><FiMapPin aria-hidden="true" />{site.location}</span><span><FiClock aria-hidden="true" />Reply within one business day</span></div>
        </Reveal>
      </div>
    </section>
  );
}