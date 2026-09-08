import { ButtonLink } from "./Button";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { site } from "../content/site";

export default function PageCTA({
  eyebrow = "Start a project",
  headline = "Have something to build?",
  sub = "Tell us what you are working on. We reply within one business day.",
}: {
  eyebrow?: string;
  headline?: string;
  sub?: string;
}) {
  return (
    <section className="page-cta">
      <div className="page-cta-inner">
        <Reveal className="page-cta-copy">
          <Eyebrow text={eyebrow} />
          <h2 className="page-cta-title">{headline}</h2>
          <p className="page-cta-sub">{sub}</p>
        </Reveal>
        <Reveal className="page-cta-aside" delay={80}>
          <a className="page-cta-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p className="page-cta-meta">
            {site.location}
            <span aria-hidden="true"> · </span>
            Typical reply 1 day
          </p>
          <ButtonLink to="/contact">Start a project</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
