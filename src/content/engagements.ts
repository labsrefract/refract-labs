/** The rows every engagement is compared on, in display order. */
export const engagementRows = [
  { key: "bestFor", label: "Best for" },
  { key: "howItRuns", label: "How it runs" },
  { key: "commitment", label: "Commitment" },
  { key: "youGet", label: "You get" },
] as const

export const engagements = [
  {
    id: "project",
    title: "Build a project",
    art: "build",
    description:
      "A new website, application, or a focused improvement, delivered against an agreed scope.",
    bestFor: "A new product, or a clear upgrade to one you have",
    howItRuns: "Fixed scope, milestones and agreed fees",
    commitment: "Per project",
    youGet: "A launched product and a full handover",
    cta: "Start a project",
  },
  {
    id: "support",
    title: "Ongoing support",
    art: "care",
    description:
      "Keep your software healthy as your business grows, with a plan shaped around what you need.",
    bestFor: "Software that is already live",
    howItRuns: "A monthly plan with agreed coverage and response times",
    commitment: "3 months minimum",
    youGet: "Fixes, updates and testing from a named person",
    cta: "Set up support",
  },
  {
    id: "engineering",
    title: "Dedicated engineering",
    art: "team",
    description:
      "Engineers who join your team for development and delivery, with clear responsibilities from the start.",
    bestFor: "Teams that need more capacity",
    howItRuns: "Named engineers in your stand-ups, repo and tracker",
    commitment: "3 months minimum",
    youGet: "Agreed availability and clear ownership of tasks",
    cta: "Add engineers",
  },
] as const
export function engagementFromQuery(value: string | null) {
  return engagements.some((item) => item.id === value) ? value! : ""
}
export function engagementMessage(value: string, message: string) {
  const item = engagements.find((item) => item.id === value)
  return item ? "Engagement: " + item.title + "\n\n" + message : message
}

const engagementStarters: Record<string, string> = {
  project:
    "I'd like to discuss building a project with Refract Labs.\n\nProject idea:\nGoals:\nPreferred timeline:",
  support:
    "I'd like to discuss ongoing support for our software.\n\nExisting website or application:\nWhat needs attention:\nSupport needs:",
  engineering:
    "I'd like to discuss dedicated engineering support for our team.\n\nWhat we are building:\nSkills or capacity needed:\nPreferred start date:",
}
export function engagementStarter(value: string) {
  return engagementStarters[value] ?? ""
}
export function engagementService(value: string) {
  return value === "project"
    ? "software-development"
    : value === "support" || value === "engineering"
      ? "support-maintenance"
      : ""
}
