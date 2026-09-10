export type Service = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  kicker: string;
  intro: string;
  metaDescription: string;
  services: readonly Service[];
};

export const serviceCategories = [
  {
    id: "software-development",
    title: "Software Development",
    kicker: "Product & platform",
    intro:
      "Products, platforms, and first versions — built so the codebase is still yours after launch. We take on the architecture, the build, and the handover as one piece of work.",
    metaDescription:
      "Software development services from Refract Labs: web apps, mobile apps, MVPs, custom systems, and API integrations.",
    services: [
      {
        id: "web-development",
        title: "Web Development",
        description:
          "Full-stack web apps — customer-facing products, internal tools, and platforms. Architecture, frontend, backend, and deployment as one piece of work.",
        tags: ["Custom sites", "E-commerce", "CMS integration", "API integrations"],
      },
      {
        id: "mobile-app-development",
        title: "Mobile App Development",
        description:
          "iOS and Android apps that feel native in the hand. Shared code where it saves time, native where it shows, and a release process that gets into the stores.",
        tags: ["iOS", "Android", "React Native", "Store submission"],
      },
      {
        id: "mvp-development",
        title: "MVP Development",
        description:
          "A first version you can put in front of customers — tight scope and a clean codebase. Built so the next iteration is not a rewrite.",
        tags: ["Scope workshop", "Prototype", "First release", "Launch support"],
      },
      {
        id: "custom-software-development",
        title: "Custom / Enterprise Software Development",
        description:
          "Software shaped around how the organisation already works. Permissions, reporting, and integrations designed in, not bolted on.",
        tags: ["Internal tools", "RBAC", "Integrations", "Reporting"],
      },
      {
        id: "api-development-integrations",
        title: "API Development & Third-Party Integrations",
        description:
          "Stable APIs and the glue between the tools you already pay for. Auth, versioning, and docs are part of the work, not a later ticket.",
        tags: ["REST", "GraphQL", "Webhooks", "Third-party APIs"],
      },
    ],
  },
  {
    id: "infrastructure-devops",
    title: "Infrastructure & DevOps",
    kicker: "Cloud & operations",
    intro:
      "The plumbing that keeps software running: cloud, pipelines, data, and jobs that should not need a person. Production should be boring — and a migration should not bet the company on one night.",
    metaDescription:
      "Infrastructure and DevOps from Refract Labs: automation, cloud architecture and migration, CI/CD, and database design.",
    services: [
      {
        id: "automation",
        title: "Automation",
        description:
          "Scripts, APIs, and workflows so your team spends time on work that needs a person. The smallest set of steps that pay off, with monitoring you can run without us.",
        tags: ["Workflows", "Scheduled jobs", "Webhooks", "Internal tools"],
      },
      {
        id: "cloud-architecture-migration",
        title: "Cloud Architecture & Migration",
        description:
          "A hosting picture you can explain, and a migration that does not bet the company on one night. You keep the keys.",
        tags: ["AWS", "GCP", "Migration", "Cost control"],
      },
      {
        id: "devops-ci-cd-setup",
        title: "DevOps / CI-CD Setup",
        description:
          "Build, test, and ship on a pipeline you can trust. Environments that match, and a rollback that is a button — not a war room.",
        tags: ["CI/CD", "Environments", "Rollbacks", "Secrets"],
      },
      {
        id: "database-design-management",
        title: "Database Design & Management",
        description:
          "Schemas, indexes, and backups that match how the product is queried. A migration path the next engineer can follow.",
        tags: ["Postgres", "Schema design", "Backups", "Migrations"],
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    kicker: "Interface & product",
    intro:
      "Interfaces and product thinking before (and during) the build, so engineering is not guessing at the screen. We design beside the people who will ship it.",
    metaDescription:
      "UI/UX and product design from Refract Labs: flows, interface systems, and prototypes you can test before you engineer the wrong thing.",
    services: [
      {
        id: "ui-ux-design",
        title: "UI/UX Design",
        description:
          "Flows and interface systems that hold up in the browser and on a phone. Designed beside the people who will ship it — not a deck that dies in Figma.",
        tags: ["Information architecture", "Design systems", "Responsive UI", "Handoff"],
      },
      {
        id: "product-design-prototyping",
        title: "Product Design & Prototyping",
        description:
          "Clickable prototypes you can test before you pay to engineer the wrong thing. A scoped picture of the product, then the cuts that keep v1 honest.",
        tags: ["Prototyping", "MVP scope", "User testing", "Product picture"],
      },
    ],
  },
  {
    id: "strategy-advisory",
    title: "Strategy & Advisory",
    kicker: "Senior perspective",
    intro:
      "A clearer picture of what to build, what to skip, and how the work should run. Sometimes you do not need more code — you need a plan the team you have can absorb.",
    metaDescription:
      "Technical consulting, digital transformation, and product management as a service from Refract Labs.",
    services: [
      {
        id: "technical-consulting",
        title: "Technical Consulting",
        description:
          "A senior view on architecture, stack, and how the work should run. A plan you could run without us — staying to implement is a separate engagement.",
        tags: ["Architecture review", "Stack choice", "Code audit", "Process"],
      },
      {
        id: "digital-transformation-consulting",
        title: "Digital Transformation Consulting",
        description:
          "Map the tools and hand-offs, then a sequence the team can absorb. A plan you can run, not a rebrand of the same chaos.",
        tags: ["Current-state map", "Tooling", "Change sequence", "Working sessions"],
      },
      {
        id: "product-management-as-a-service",
        title: "Product Management as a Service",
        description:
          "Backlog, scope, and stakeholder rhythm for a season, not a permanent seat. Useful between hires, or when the founder should not also be the PM.",
        tags: ["Backlog", "Scope cuts", "Cadence", "Handover"],
      },
    ],
  },
  {
    id: "support-maintenance",
    title: "Support & Maintenance",
    kicker: "After launch",
    intro:
      "Keep what shipped healthy — tests, retainers, and extra hands when the next quarter needs more capacity. Named people, scoped hours, not an open tab.",
    metaDescription:
      "Maintenance contracts, QA, and staff augmentation from Refract Labs: keep production healthy and add capacity when you need it.",
    services: [
      {
        id: "ongoing-maintenance-support",
        title: "Ongoing Maintenance & Support Contracts",
        description:
          "Updates, monitoring, and a named person to call when production misbehaves. Scoped hours, not an open tab.",
        tags: ["Retainer", "Monitoring", "Security patches", "Named owner"],
      },
      {
        id: "qa-testing-services",
        title: "QA & Testing Services",
        description:
          "Coverage on the paths that lose money when they break. Embed with a sprint, or run a pass before a release.",
        tags: ["Manual QA", "Automated tests", "Release pass", "Sprint embed"],
      },
      {
        id: "staff-augmentation",
        title: "Staff Augmentation / Dedicated Dev Teams",
        description:
          "Engineers who join your cadence for a defined stretch. Your stand-ups, your repo, your tracker — named people, not a rotating bench.",
        tags: ["Dedicated engineers", "Embedded teams", "Named people", "Defined stretch"],
      },
    ],
  },
] as const satisfies readonly ServiceCategory[];

export const services = serviceCategories.flatMap((category) => category.services);

export function categoryPath(categoryId: string) {
  return `/services/${categoryId}`;
}

export function servicePath(categoryId: string, serviceId: string) {
  return `/services/${categoryId}#${serviceId}`;
}

const legacyRedirects: Record<string, string> = {
  "web-development": "/services/software-development#web-development",
  "mobile-app-development": "/services/software-development#mobile-app-development",
  "mvp-development": "/services/software-development#mvp-development",
  "custom-software-development": "/services/software-development#custom-software-development",
  "cloud-architecture-migration": "/services/infrastructure-devops#cloud-architecture-migration",
  "technical-consulting": "/services/strategy-advisory#technical-consulting",
  "staff-augmentation": "/services/support-maintenance#staff-augmentation",
};

export function getServiceCategory(slug: string | undefined) {
  if (!slug) return undefined;
  return serviceCategories.find((category) => category.id === slug);
}

export function getLegacyServiceRedirect(slug: string | undefined) {
  if (!slug) return undefined;
  return legacyRedirects[slug];
}
