import { Link } from "react-router"
import { useId, useState, type CSSProperties } from "react"
import { site } from "../content/site"
import { ButtonLink } from "./Button"
import Reveal from "./ScrollReveal"

const questions = [
  {
    question: "How long does a project take?",
    answer:
      "It depends on the scope, integrations and how ready the content is. We agree on a realistic timeline after discovery, with clear milestones so you know what happens next.",
  },
  {
    question: "How do you price the work?",
    answer:
      "We scope the project with you before quoting. The proposal sets out the deliverables, fees and payment stages. Hosting, third-party tools and ongoing support are identified separately where they apply.",
  },
  {
    question: "Will I own the code?",
    answer:
      "Ownership, licensing and handover are set out in your project agreement. We clarify what you receive, including source code, documentation and access, before the work starts. Third-party tools keep their own licences.",
  },
  {
    question: "Can you improve software we already have?",
    answer:
      "Yes. We can review an existing website, application or infrastructure and help with fixes, new features or a wider rebuild. We start by understanding the codebase and what needs to change.",
  },
  {
    question: "Do you handle hosting and deployment?",
    answer:
      "We can help set up the infrastructure and deploy your product. We agree on account access, hosting arrangements and recurring costs so you know what you will be running after launch.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can provide maintenance, testing and ongoing engineering support. The coverage, response times and costs are agreed for your project, so you have a clear plan for the work after launch.",
  },
]

export default function SoftwareFAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  const groups = [
    { title: "Scope & planning", items: questions.slice(0, 3), offset: 0 },
    { title: "Delivery & support", items: questions.slice(3), offset: 3 },
  ]
  return (
    <section className="software-faq" aria-labelledby="software-faq-heading">
      <div className="ai-wrap ai-faq-layout">
        <Reveal className="ai-faq-aside ai-mask-head" rise={false}>
          <span className="ai-eyebrow">
            <span className="ai-eyebrow-index">FAQ</span>
            <span className="ai-eyebrow-rule" />
            Refract Software
          </span>
          <h2 id="software-faq-heading" className="ai-h2">
            <span className="ai-mask-word">
              <span>Questions, answered</span>
            </span>
          </h2>
          <p className="ai-muted ai-mask-after">
            Can't find what you're looking for? Ask us directly. We reply within
            one business day.
          </p>
          <div className="ai-faq-contact ai-mask-after">
            <a href={`mailto:${site.email}`} className="ai-faq-email">
              {site.email}
            </a>
            <ButtonLink to="/contact">Start a project</ButtonLink>
          </div>
        </Reveal>
        <div className="ai-faq-groups">
          {groups.map((group) => (
            <div key={group.title} className="ai-faq-group">
              <p className="ai-faq-group-title">{group.title}</p>
              <div className="ai-faq">
                {group.items.map((item, index) => {
                  const position = group.offset + index
                  const isOpen = open === position
                  const answerId = `${baseId}-answer-${position}`
                  const buttonId = `${baseId}-question-${position}`
                  return (
                    <Reveal
                      key={item.question}
                      className="offer-card-reveal"
                      rise={false}
                      delay={index * 60}
                    >
                      <div className={`ai-faq-item${isOpen ? " is-open" : ""}`}>
                        <h3 className="ai-faq-q">
                          <button
                            id={buttonId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={answerId}
                            onClick={() => setOpen(isOpen ? null : position)}
                          >
                            <span className="ai-chev" aria-hidden="true" />
                            {item.question}
                          </button>
                        </h3>
                        <div
                          id={answerId}
                          className="ai-faq-body"
                          role="region"
                          aria-labelledby={buttonId}
                          aria-hidden={!isOpen}
                        >
                          <div>
                            <p>
                              {item.answer.split(" ").map((word, wordIndex) => (
                                <span
                                  key={wordIndex}
                                  className="ai-faq-word"
                                  style={{ "--w": wordIndex } as CSSProperties}
                                >
                                  {word}{" "}
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
