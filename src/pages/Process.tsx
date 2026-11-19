import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/ScrollReveal";
import ServiceArt from "../components/ServiceArt";
import { processSteps } from "../content/process";
import { usePageMeta } from "../hooks/usePageMeta";

/**
 * The full process: the homepage timeline turned on its side, with every
 * phase open — its summary, what happens in it, and what the client gets.
 * Links such as /process#build (from the homepage timeline) scroll to that
 * phase and highlight its marker.
 */
export default function Process() {
  const { hash } = useLocation();
  const [targetId, setTargetId] = useState<string | null>(() => processSteps.find((step) => `#${step.id}` === hash)?.id ?? null);
  usePageMeta("Process — Refract Labs", "How Refract Labs takes a product from discovery through design, build, and launch.", "/process");

  useEffect(() => {
    const step = processSteps.find((item) => `#${item.id}` === hash);
    setTargetId(step?.id ?? null);
    if (!step) return;
    const frame = window.requestAnimationFrame(() => document.getElementById(step.id)?.scrollIntoView({ block: "center" }));
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="process-page software-scroll-content">
      <header className="work-page-header">
        <Reveal className="work-page-heading ai-mask-head" rise={false}>
          <h1><span className="ai-mask-word"><span>From idea to launch.</span></span></h1>
          <p className="ai-mask-after">Four phases. One team. You see the work as it happens. Here is what each phase involves and what you get from it.</p>
        </Reveal>
      </header>
      <section className="phase-steps-section" aria-label="Our four project phases">
        <ol className="phase-steps">
          {processSteps.map((step) => (
            // The highlight sits on the inner element: Reveal adds its own class to the li directly,
            // and a changing className on the li would wipe that class and leave the phase hidden.
            <Reveal as="li" key={step.id} id={step.id} className="phase-step-item offer-card-reveal" rise={false}>
              <div className={`phase-step${targetId === step.id ? " is-target" : ""}`}>
              <span className="timeline-node" aria-hidden="true">
                <ServiceArt kind={step.art} />
              </span>
              <div className="phase-step-main">
                <span className="timeline-num">{step.num}</span>
                <h2>{step.title}</h2>
                <p className="phase-step-lead">{step.teaser}</p>
              </div>
              <div className="phase-step-detail">
                <p>{step.desc}</p>
                <p className="timeline-get">
                  <span>You get</span>
                  {step.youGet}
                </p>
              </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
      <PageCTA eyebrow="Ready to start?" headline="Let's run the process together." sub="Discovery calls are free. Tell us what you are building and we will walk through how we would approach it." />
    </div>
  );
}
