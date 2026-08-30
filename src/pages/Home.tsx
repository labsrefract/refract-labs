import { Link } from "react-router";
import Eyebrow from "../components/Eyebrow";
import PageCTA from "../components/PageCTA";

// ─── IDE Mockup ───────────────────────────────────────────────────────────────

function IDEMockup() {
  return (
    <div
      className="w-full overflow-hidden select-none"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border-strong)",
        borderRadius: "8px",
        boxShadow: "var(--shadow-ide)",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "12px",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: "var(--chrome)", borderBottom: "1px solid var(--border)" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
        <span className="ml-3 text-xs font-mono" style={{ color: "var(--subtle)" }}>
          sintrix — api/projects.ts — 80×32
        </span>
      </div>

      {/* Editor body */}
      <div className="flex" style={{ minHeight: "280px" }}>

        {/* File tree */}
        <div
          className="hidden sm:flex flex-col py-3 shrink-0"
          style={{
            width: "148px",
            backgroundColor: "var(--tree-bg)",
            borderRight: "1px solid var(--border)",
            fontSize: "11px",
          }}
        >
          <div className="px-3 pb-2 mb-1" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--subtle)" }}>
              EXPLORER
            </span>
          </div>
          {[
            { label: "SINTRIX", indent: 0, kind: "root" },
            { label: "▾ src", indent: 1, kind: "folder" },
            { label: "▾ api", indent: 2, kind: "folder" },
            { label: "projects.ts", indent: 3, kind: "file-active" },
            { label: "auth.ts", indent: 3, kind: "file" },
            { label: "▾ components", indent: 2, kind: "folder" },
            { label: "App.tsx", indent: 3, kind: "file" },
            { label: "Nav.tsx", indent: 3, kind: "file" },
            { label: "▾ lib", indent: 2, kind: "folder" },
            { label: "db.ts", indent: 3, kind: "file" },
            { label: "utils.ts", indent: 3, kind: "file" },
            { label: "package.json", indent: 1, kind: "file" },
            { label: "tsconfig.json", indent: 1, kind: "file" },
          ].map((item, i) => (
            <div
              key={i}
              className={`tree-item px-2 py-0.5 flex items-center gap-1 ${item.kind === "file-active" ? "tree-item-active" : ""}`}
              style={{
                paddingLeft: `${(item.indent * 10) + 8}px`,
                color: item.kind === "root"
                  ? "var(--subtle)"
                  : item.kind === "folder"
                  ? "var(--muted)"
                  : item.kind === "file-active"
                  ? "var(--accent)"
                  : "var(--lineno)",
                fontWeight: item.kind === "root" ? 600 : 400,
                fontSize: item.kind === "root" ? "9px" : "11px",
                letterSpacing: item.kind === "root" ? "0.08em" : undefined,
              }}
            >
              {item.kind === "file" || item.kind === "file-active" ? (
                <span style={{ color: item.kind === "file-active" ? "var(--accent)" : "var(--lineno)", marginRight: "2px", fontSize: "9px" }}>●</span>
              ) : null}
              {item.label}
            </div>
          ))}
        </div>

        {/* Code pane */}
        <div className="flex-1 overflow-hidden py-4 px-4" style={{ backgroundColor: "var(--surface)" }}>
          <pre className="leading-relaxed whitespace-pre text-xs overflow-x-auto">
            <span className="syntax-lineno">1</span>
            <span className="syntax-comment">{"// Sintrix — project API handler\n"}</span>
            <span className="syntax-lineno">2</span>
            {"\n"}
            <span className="syntax-lineno">3</span>
            <span className="syntax-keyword">import </span>
            <span className="syntax-variable">{"{ db } "}</span>
            <span className="syntax-keyword">from </span>
            <span className="syntax-string">{"'../lib/db';\n"}</span>
            <span className="syntax-lineno">4</span>
            <span className="syntax-keyword">import type </span>
            <span className="syntax-type">{"{ Project } "}</span>
            <span className="syntax-keyword">from </span>
            <span className="syntax-string">{"'../types';\n"}</span>
            <span className="syntax-lineno">5</span>
            {"\n"}
            <span className="syntax-lineno">6</span>
            <span className="syntax-keyword">export async function </span>
            <span className="syntax-function">getProjects</span>
            <span className="syntax-variable">{"(): "}</span>
            <span className="syntax-type">{"Promise<Project[]>"}</span>
            <span className="syntax-variable">{" {\n"}</span>
            <span className="syntax-lineno">7</span>
            <span className="syntax-keyword">{"  const "}</span>
            <span className="syntax-variable">{"rows = "}</span>
            <span className="syntax-keyword">{"await "}</span>
            <span className="syntax-variable">{"db\n"}</span>
            <span className="syntax-lineno">8</span>
            <span className="syntax-variable">{"    ."}</span>
            <span className="syntax-function">{"selectFrom"}</span>
            <span className="syntax-string">{"('projects')\n"}</span>
            <span className="syntax-lineno">9</span>
            <span className="syntax-variable">{"    ."}</span>
            <span className="syntax-function">{"selectAll"}</span>
            <span className="syntax-variable">{"()\n"}</span>
            <span className="syntax-lineno">10</span>
            <span className="syntax-variable">{"    ."}</span>
            <span className="syntax-function">{"where"}</span>
            <span className="syntax-variable">{"("}</span>
            <span className="syntax-string">{"'status'"}</span>
            <span className="syntax-variable">{", "}</span>
            <span className="syntax-string">{"'active'"}</span>
            <span className="syntax-variable">{")\n"}</span>
            <span className="syntax-lineno">11</span>
            <span className="syntax-variable">{"    ."}</span>
            <span className="syntax-function">{"execute"}</span>
            <span className="syntax-variable">{"();\n"}</span>
            <span className="syntax-lineno">12</span>
            {"\n"}
            <span className="syntax-lineno">13</span>
            <span className="syntax-keyword">{"  return "}</span>
            <span className="syntax-variable">{"rows."}</span>
            <span className="syntax-function">{"map"}</span>
            <span className="syntax-variable">{"(row => ({\n"}</span>
            <span className="syntax-lineno">14</span>
            <span className="syntax-variable">{"    id: row."}</span>
            <span className="syntax-prop">{"id"}</span>
            <span className="syntax-variable">{",\n"}</span>
            <span className="syntax-lineno">15</span>
            <span className="syntax-variable">{"    name: row."}</span>
            <span className="syntax-prop">{"name"}</span>
            <span className="syntax-variable">{",\n"}</span>
            <span className="syntax-lineno">16</span>
            <span className="syntax-variable">{"    stack: row."}</span>
            <span className="syntax-prop">{"stack"}</span>
            <span className="syntax-variable">{"."}</span>
            <span className="syntax-function">{"split"}</span>
            <span className="syntax-variable">{"("}</span>
            <span className="syntax-string">{"','"}</span>
            <span className="syntax-variable">{"),\n"}</span>
            <span className="syntax-lineno">17</span>
            <span className="syntax-variable">{"  })); "}</span>
            <span className="cursor-blink" />
            {"\n"}
          </pre>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-1"
        style={{
          backgroundColor: "var(--status-bar-bg)",
          borderTop: "1px solid var(--border)",
          fontSize: "11px",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        <div className="flex items-center gap-4">
          <span style={{ color: "rgba(255,255,255,0.9)" }}>⎇ main</span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>✓ 0 errors</span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ color: "rgba(255,255,255,0.6)" }}>Ln 17, Col 8</span>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>TypeScript</span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>UTF-8</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="absolute inset-0 scan-lines opacity-100" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center min-h-[calc(100vh-64px)]">

          {/* Copy */}
          <div className="flex flex-col justify-center">
            <div
              className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 self-start"
              style={{
                backgroundColor: "var(--accent-soft)",
                border: "1px solid var(--accent-pill-border)",
                borderRadius: "4px",
              }}
            >
              <span
                className="text-xs font-mono font-medium uppercase tracking-widest"
                style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
              >
                // FULL-STACK DEVELOPMENT STUDIO
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight mb-5"
              style={{ color: "var(--text)", letterSpacing: "-0.025em" }}
            >
              We build software
              <br />
              that ships.
            </h1>
            <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "var(--muted)" }}>
              Sintrix Technologies designs and builds web apps, mobile apps, and
              MVPs for startups and growing businesses who need to move fast
              without cutting corners.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-mono font-semibold"
                style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: "6px" }}
              >
                <span style={{ color: "rgba(255,255,255,0.6)" }}>&gt;</span> Start a Project
              </Link>
              <Link
                to="/work"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3 text-sm font-mono font-semibold border"
                style={{ color: "var(--text)", borderColor: "var(--border-dashed)", borderRadius: "6px" }}
              >
                View Our Work
              </Link>
            </div>
          </div>

          {/* IDE */}
          <div className="lg:pl-6">
            <IDEMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack Strip ─────────────────────────────────────────────────────────

const techTags = [
  "React", "TypeScript", "Node.js", "Next.js",
  "PostgreSQL", "AWS", "React Native", "Go",
];

function TechStrip() {
  return (
    <div
      className="relative"
      style={{ borderTop: "1px dashed var(--border-dashed)", borderBottom: "1px dashed var(--border-dashed)", backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center gap-6 flex-wrap">
        <span
          className="text-xs font-mono shrink-0"
          style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}
        >
          // TOOLS WE USE
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="tech-tag text-xs font-mono px-2.5 py-1 cursor-default"
              style={{
                color: "var(--muted)",
                border: "1px solid var(--border-strong)",
                borderRadius: "4px",
                fontFamily: "JetBrains Mono, monospace",
                backgroundColor: "var(--surface)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

const stats = [
  { value: "15+", label: "PROJECTS SHIPPED" },
  { value: "100%", label: "CLIENT SATISFACTION" },
  { value: "24HR", label: "AVG RESPONSE TIME" },
  { value: "2", label: "FOUNDING ENGINEERS" },
];

function StatsRow() {
  return (
    <div style={{ backgroundColor: "var(--bg)", borderBottom: "1px dashed var(--border-dashed)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="py-8 px-6 flex flex-col gap-1"
              style={{
                borderLeft: i > 0 ? "1px solid var(--border)" : undefined,
              }}
            >
              <span
                className="text-3xl lg:text-4xl font-bold tracking-tight"
                style={{ color: "var(--accent)", fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
              >
                {s.value}
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.06em" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services Teaser ──────────────────────────────────────────────────────────

const servicesTease = [
  {
    cmd: "$ build --web",
    icon: "◈",
    title: "Web Applications",
    desc: "Full-stack platforms from dashboards to customer-facing products, built with modern frameworks.",
  },
  {
    cmd: "$ build --mobile",
    icon: "⬡",
    title: "Mobile Applications",
    desc: "Native and cross-platform apps optimized for performance and real-world usage.",
  },
  {
    cmd: "$ build --mvp",
    icon: "⟳",
    title: "MVP Development",
    desc: "Rapid path from idea to shippable product without sacrificing code quality.",
  },
  {
    cmd: "$ consult --technical",
    icon: "⌬",
    title: "Technical Consulting",
    desc: "Architecture guidance, stack decisions, and hands-on engineering support.",
  },
];

function ServicesTeaser() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Eyebrow text="// WHAT WE DO" />
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
            >
              Engineering, end to end.
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-mono inline-flex items-center gap-2 transition-colors duration-150 nav-link"
            style={{ color: "var(--muted)", fontFamily: "JetBrains Mono, monospace" }}
          >
            View All Services
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesTease.map((s) => (
            <div
              key={s.title}
              className="card-hover p-6 flex flex-col"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="text-xs font-mono mb-4 px-2 py-1 self-start"
                style={{
                  color: "var(--orange)",
                  backgroundColor: "var(--orange-soft)",
                  borderRadius: "3px",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {s.cmd}
              </div>
              <div className="text-lg font-mono mb-3" style={{ color: "var(--accent)" }}>
                {s.icon}
              </div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text)" }}>{s.title}</h3>
              <p className="text-xs leading-relaxed mt-auto" style={{ color: "var(--muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Work Teaser ──────────────────────────────────────────────────────────────

const featuredWork = [
  {
    name: "Project Aurora",
    url: "sintrix.dev/projects/aurora",
    desc: "A booking platform built for scale.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "Project Nimbus",
    url: "sintrix.dev/projects/nimbus",
    desc: "Real-time logistics dashboard for fleet management.",
    tags: ["Next.js", "WebSockets", "Go"],
  },
  {
    name: "Project Vertex",
    url: "sintrix.dev/projects/vertex",
    desc: "Cross-platform mobile app for B2B procurement.",
    tags: ["React Native", "TypeScript"],
  },
];

function WorkTeaser() {
  return (
    <section style={{ backgroundColor: "var(--surface-2)", borderTop: "1px dashed var(--border-dashed)", borderBottom: "1px dashed var(--border-dashed)" }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Eyebrow text="// SELECTED WORK" />
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
            >
              Recent builds.
            </h2>
          </div>
          <Link
            to="/work"
            className="text-sm font-mono inline-flex items-center gap-2 transition-colors duration-150 nav-link"
            style={{ color: "var(--muted)", fontFamily: "JetBrains Mono, monospace" }}
          >
            View All Work
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWork.map((p) => (
            <div
              key={p.name}
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
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1a4 4 0 100 8A4 4 0 005 1zm0 0v8M1 5h8" stroke="var(--lineno)" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span
                    className="text-xs font-mono truncate"
                    style={{ color: "var(--subtle)", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {p.url}
                  </span>
                </div>
              </div>

              {/* Screenshot area */}
              <div className="relative h-32 overflow-hidden" style={{ backgroundColor: "var(--tree-bg)" }}>
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`grid-${p.name}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.8" fill="var(--border-strong)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${p.name})`} />
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

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{p.name}</h3>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--muted)" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-0.5"
                      style={{
                        color: "var(--accent)",
                        backgroundColor: "var(--accent-soft)",
                        borderRadius: "3px",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Teaser ───────────────────────────────────────────────────────────

const stepTitles = ["Discover", "Design", "Build", "Launch"];

function ProcessTeaser() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Eyebrow text="// HOW WE WORK" />
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
            >
              From idea to launch.
            </h2>
          </div>
          <Link
            to="/process"
            className="text-sm font-mono inline-flex items-center gap-2 transition-colors duration-150 nav-link"
            style={{ color: "var(--muted)", fontFamily: "JetBrains Mono, monospace" }}
          >
            See Our Process
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stepTitles.map((title, i) => (
            <div
              key={title}
              className="card-hover flex items-center gap-3 p-5"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                className="text-sm font-mono font-semibold shrink-0"
                style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
              >
                &gt;{String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <TechStrip />
      <StatsRow />
      <ServicesTeaser />
      <WorkTeaser />
      <ProcessTeaser />
      <PageCTA />
    </>
  );
}
