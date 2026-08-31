import { ButtonLink } from "./Button";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

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
    <section
      className="py-20 lg:py-28"
      style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
        <Eyebrow text={eyebrow} />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-3xl" style={{ color: "var(--text)" }}>
          {headline}
        </h2>
        <p className="mt-4 text-lg max-w-xl" style={{ color: "var(--muted)" }}>
          {sub}
        </p>
        <div className="mt-8">
          <ButtonLink to="/contact">Start a project</ButtonLink>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
