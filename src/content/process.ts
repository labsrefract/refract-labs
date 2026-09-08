export const processSteps = [
  {
    id: "discover",
    num: "01",
    title: "Discover",
    teaser: "Goals, constraints, and what success looks like before a line of code.",
    desc: "Every project starts with listening. We run structured discovery to understand your goals, users, constraints, and what success looks like. We ask hard questions about scope, budget, and timeline early — because the most expensive engineering decisions are the ones made without enough information.",
  },
  {
    id: "design",
    num: "02",
    title: "Design",
    teaser: "Flows, data, and interface — mapped as something we can actually build.",
    desc: "With a clear picture of the problem, we map the product: information architecture, user flows, data models, and interface concepts. Design stays embedded in engineering, so every interaction is something we have thought through the implementation of.",
  },
  {
    id: "build",
    num: "03",
    title: "Build",
    teaser: "Short sprints, working software, reviews and CI as defaults.",
    desc: "We write clean, tested, documented code and ship in short sprints with working software at the end of each one. You can see progress, give feedback, and course-correct without waiting months for a big reveal. Reviews, tests, and CI/CD are defaults, not extras.",
  },
  {
    id: "launch",
    num: "04",
    title: "Launch",
    teaser: "Deploy, watch the first weeks, then stay on or hand off with docs.",
    desc: "We handle production deployment, environment setup, monitoring, and the first weeks after go-live. After things are stable we can stay on a retainer, or hand off with documentation. We do not disappear when the code ships.",
  },
] as const;
