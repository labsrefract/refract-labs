export const services = [
  {
    id: "web",
    slug: "web",
    title: "Web applications",
    kicker: "Product & platform",
    summary:
      "Full-stack products — customer-facing apps, internal tools, and multi-tenant platforms — built to stay maintainable after launch.",
    desc: "We design and build web applications with modern frameworks and proven engineering practice. From customer-facing products to complex internal systems, we own the stack: architecture, backend, frontend, and deployment.",
    includes: [
      "Full-stack development with React, Next.js, and Node.js",
      "Database design and API architecture (REST and GraphQL)",
      "Authentication, permissions, and multi-tenant systems",
      "Performance, monitoring, and a plan for scale",
    ],
  },
  {
    id: "mobile",
    slug: "mobile",
    title: "Mobile applications",
    kicker: "iOS & Android",
    summary:
      "Native-feeling apps for iOS and Android, with offline reliability and a release process that actually gets into the stores.",
    desc: "We build native and cross-platform mobile applications that feel right in the hand. The work prioritizes performance, offline use, and a polished UX — not a website squeezed onto a smaller screen.",
    includes: [
      "React Native apps for iOS and Android from a single codebase",
      "Native module integration and device APIs",
      "Push notifications, background sync, and offline support",
      "App Store and Google Play submission and release management",
    ],
  },
  {
    id: "automation",
    slug: "automation",
    title: "Automation",
    kicker: "Workflows & integrations",
    summary:
      "Replace repetitive ops with reliable scripts, APIs, and workflows — so your team spends time on the work that actually needs a person.",
    desc: "We design and build automation that sits between the tools you already use. The goal is fewer hand-offs, fewer missed steps, and a system your team can run without us in the loop.",
    includes: [
      "Process mapping and the smallest set of automations that pay off",
      "API integrations, webhooks, and scheduled jobs",
      "Internal tools that wrap messy systems in a clean flow",
      "Monitoring, retries, and a handoff the team can operate",
    ],
  },
  {
    id: "mvp",
    slug: "mvp",
    title: "MVP development",
    kicker: "From idea to first users",
    summary:
      "A tight scope, a clean codebase, and a path from whiteboard to something you can put in front of customers.",
    desc: "Speed matters most when you are validating an idea. We scope MVPs tightly, cut what does not matter on day one, and build what does — cleanly, so the codebase is not a liability when it is time to grow.",
    includes: [
      "Scope workshops to define the minimum viable feature set",
      "Rapid prototyping and iterative sprint delivery",
      "Documented code that can scale beyond the first release",
      "Post-launch support and an iteration plan",
    ],
  },
  {
    id: "consulting",
    slug: "consulting",
    title: "Technical consulting",
    kicker: "Senior perspective",
    summary:
      "Architecture, stack decisions, and engineering process — without adding a full-time hire you do not need yet.",
    desc: "Sometimes you do not need more code. You need a clearer picture of what you are building and why. We provide hands-on consulting for teams that want a senior engineering view without a full-time hire.",
    includes: [
      "Architecture and infrastructure reviews with concrete recommendations",
      "Tech stack selection and migration planning",
      "Code quality audits and refactoring roadmaps",
      "CI/CD, testing, and deployment workflow setup",
    ],
  },
] as const;
