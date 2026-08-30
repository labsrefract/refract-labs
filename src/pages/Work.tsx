import PageHeader from "../components/PageHeader";
import PageCTA from "../components/PageCTA";

const projects = [
  {
    name: "Project Aurora",
    url: "sintrix.dev/projects/aurora",
    typeTag: "[WEB APP]",
    desc: "A multi-tenant booking platform built for scale across hospitality and events.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
  },
  {
    name: "Project Nimbus",
    url: "sintrix.dev/projects/nimbus",
    typeTag: "[DASHBOARD]",
    desc: "Real-time logistics dashboard and dispatch system for fleet management operations.",
    tags: ["Next.js", "WebSockets", "Go", "Redis", "Mapbox"],
  },
  {
    name: "Project Vertex",
    url: "sintrix.dev/projects/vertex",
    typeTag: "[MOBILE APP]",
    desc: "Cross-platform mobile app for B2B procurement and supplier relationship management.",
    tags: ["React Native", "TypeScript", "Supabase", "Expo"],
  },
  {
    name: "Project Solace",
    url: "sintrix.dev/projects/solace",
    typeTag: "[MOBILE APP]",
    desc: "Mental health and journaling app with end-to-end encryption and therapist portals.",
    tags: ["React Native", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    name: "Project Meridian",
    url: "sintrix.dev/projects/meridian",
    typeTag: "[ANALYTICS]",
    desc: "Internal analytics platform for a Series B fintech — charts, filters, and custom reporting.",
    tags: ["React", "GraphQL", "Python", "Recharts", "Snowflake"],
  },
  {
    name: "Project Halcyon",
    url: "sintrix.dev/projects/halcyon",
    typeTag: "[MVP]",
    desc: "Consumer marketplace connecting freelance creatives with agencies for project work.",
    tags: ["Next.js", "Prisma", "Stripe Connect", "Algolia"],
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div
      className="card-hover flex flex-col"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
      }}
    >
      {/* Browser chrome */}
      <div style={{ backgroundColor: "var(--chrome)", borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
        </div>
        <div
          className="mx-3 mb-2 px-3 py-1 flex items-center gap-2"
          style={{ backgroundColor: "var(--chrome-url)", borderRadius: "4px" }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M5 1a4 4 0 100 8A4 4 0 005 1zm0 0v8M1 5h8" stroke="var(--lineno)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-mono truncate" style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}>
            {project.url}
          </span>
        </div>
      </div>

      {/* Screenshot area */}
      <div className="relative h-40 overflow-hidden" style={{ backgroundColor: "var(--tree-bg)" }}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`dots-${project.name}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="var(--border-strong)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${project.name})`} />
        </svg>
        <div className="absolute top-4 right-5 w-12 h-12 opacity-15" style={{ border: "1.5px solid var(--accent)", transform: "rotate(10deg)", borderRadius: "4px" }} />
        <div className="absolute bottom-3 left-4 w-16 h-6 opacity-10" style={{ border: "1.5px solid var(--orange)", borderRadius: "3px" }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono"
          style={{ color: "var(--lineno)", fontFamily: "JetBrains Mono, monospace" }}
        >
          [ preview ]
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-base" style={{ color: "var(--text)" }}>{project.name}</h3>
          <span
            className="text-xs font-mono shrink-0 px-2 py-0.5"
            style={{
              color: "var(--accent)",
              backgroundColor: "var(--accent-soft)",
              border: "1px solid var(--accent-pill-border)",
              borderRadius: "4px",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.03em",
            }}
          >
            {project.typeTag}
          </span>
        </div>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((t) => (
            <span
              key={t}
              className="tech-tag text-xs font-mono px-2 py-0.5"
              style={{
                color: "var(--muted)",
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border-strong)",
                borderRadius: "4px",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <>
      <PageHeader
        eyebrow="// SELECTED WORK"
        title="Recent builds."
        subtitle="A selection of products we've designed, engineered, and shipped. Each project is under NDA — names are placeholders."
      />

      <section
        className="pb-28 lg:pb-36"
        style={{ backgroundColor: "var(--bg)", borderTop: "1px dashed var(--border-dashed)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
          </div>
        </div>
      </section>

      <PageCTA eyebrow="// NEXT UP" headline="Your project could be next." sub="We take on a small number of projects each quarter. If you have something to build, let's talk." />
    </>
  );
}
