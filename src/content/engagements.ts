export const engagements = [
  {
    id: "project",
    title: "Build a project",
    audience: "For a defined outcome",
    description:
      "A new website, application, or a focused improvement. We agree on the scope and a practical path to delivery.",
    includes: [
      "Defined deliverables",
      "Milestones and agreed fees",
      "Launch and handover",
    ],
  },
  {
    id: "support",
    title: "Ongoing support",
    audience: "For the work after launch",
    description:
      "Keep your software healthy as your business grows, with a support plan shaped around what you need.",
    includes: [
      "Maintenance and fixes",
      "Updates and testing",
      "Agreed coverage and response times",
    ],
  },
  {
    id: "engineering",
    title: "Dedicated engineering",
    audience: "For extra team capacity",
    description:
      "Bring engineers alongside your team for development and delivery, with clear responsibilities from the start.",
    includes: [
      "Work within your team",
      "Agreed availability",
      "Clear ownership of tasks",
    ],
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
