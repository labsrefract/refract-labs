import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FiPlus, FiMinus } from "react-icons/fi";
import PageCTA from "../components/PageCTA";
import Reveal from "../components/ScrollReveal";
import { processSteps } from "../content/process";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Process() {
  const { hash } = useLocation();
  const [openStep, setOpenStep] = useState<string | null>(() => processSteps.find((step) => `#${step.id}` === hash)?.id ?? null);
  usePageMeta("Process — Refract Labs", "How Refract Labs takes a product from discovery through design, build, and launch.", "/process");

  useEffect(() => {
    const step = processSteps.find((item) => `#${item.id}` === hash);
    if (!step) return;
    setOpenStep(step.id);
    const frame = window.requestAnimationFrame(() => document.getElementById(step.id)?.scrollIntoView({ block: "center" }));
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="process-page software-scroll-content">
      <header className="work-page-header">
        <Reveal className="work-page-heading ai-mask-head" rise={false}>
          <h1><span className="ai-mask-word"><span>From idea to launch.</span></span></h1>
          <p className="ai-mask-after">Four phases. One team. You see the work as it happens. Explore each step to see how we take your project forward.</p>
        </Reveal>
      </header>
      <section className="process-journey process-page-journey" aria-label="Our four project phases">
        <div className="process-journey-shell">
          <ol className="process-journey-steps">
            {processSteps.map((step, index) => {
              const expanded = openStep === step.id;
              return (
                <Reveal as="li" key={step.id} id={step.id} className="process-journey-step offer-card-reveal" rise={false} delay={index * 70}>
                  <button type="button" className={`process-journey-card process-journey-tone-${index}`} id={`process-trigger-${step.id}`} aria-expanded={expanded} aria-controls={`process-details-${step.id}`} onClick={() => setOpenStep(expanded ? null : step.id)}>
                    <span className="process-journey-number">{step.num}</span>
                    <span className="process-journey-copy"><span className="process-page-step-title">{step.title}</span><span className="process-page-step-teaser">{step.teaser}</span></span>
                    <span className="process-page-toggle" aria-hidden="true">{expanded ? <FiMinus /> : <FiPlus />}</span>
                  </button>
                  <div className="process-page-details" id={`process-details-${step.id}`} role="region" aria-labelledby={`process-trigger-${step.id}`} hidden={!expanded}>
                    <span className="process-page-details-label">WHAT HAPPENS IN THIS PHASE</span>
                    <p>{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>
      <PageCTA eyebrow="Ready to start?" headline="Let's run the process together." sub="Discovery calls are free. Tell us what you are building and we will walk through how we would approach it." />
    </div>
  );
}