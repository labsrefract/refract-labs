export type CaseStudy = {
  slug: string;
  name: string;
  sector: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "booking-platform",
    name: "Multi-tenant booking platform",
    sector: "Hospitality",
    summary: "A scheduling product that had to support multiple brands without multiplying the codebase.",
    challenge:
      "The client needed one platform that several properties could run independently — different branding, pricing, and staff permissions — without a separate deploy for each.",
    approach:
      "We modeled tenancy at the data layer first, then built a React admin and a public booking flow on a shared API. Payments, availability, and audit logs were designed as first-class resources rather than bolted on.",
    result:
      "A single codebase serving multiple properties, with role-based access and a release process the internal team could run without us in the loop.",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    slug: "operations-dashboard",
    name: "Live operations dashboard",
    sector: "Logistics",
    summary: "A dispatch view that had to stay accurate while vehicles and jobs moved in real time.",
    challenge:
      "Operators were stitching together spreadsheets and a legacy tool. They needed one screen for jobs, vehicles, and exceptions — updating as the field changed, not on a five-minute refresh.",
    approach:
      "We put a Go service in front of the existing systems of record, streamed changes over WebSockets, and designed the UI around the dispatcher's actual scan pattern rather than a generic data grid.",
    result:
      "Dispatchers could act on a live picture of the fleet. Exception handling moved from chat threads into the product.",
    stack: ["Next.js", "Go", "WebSockets", "Redis"],
  },
  {
    slug: "procurement-app",
    name: "B2B procurement app",
    sector: "Supply chain",
    summary: "A mobile-first workflow for buyers who spend most of their day away from a desk.",
    challenge:
      "Field buyers were emailing photos and POs. The company wanted a proper app without waiting a year for native iOS and Android in parallel.",
    approach:
      "We shipped a React Native app against a typed API, with offline drafts and a review queue for the office. The first release covered the three tasks that actually blocked orders; everything else waited.",
    result:
      "Buyers could raise and track orders from site. The office stopped reconciling inboxes to know what had been committed.",
    stack: ["React Native", "TypeScript", "Node.js"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}
