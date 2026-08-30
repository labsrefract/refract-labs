import type { CSSProperties } from "react";
import { Link, NavLink } from "react-router";

const navLinks = [
  { label: "Home",     to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work",     to: "/work"     },
  { label: "Process",  to: "/process"  },
  { label: "About",    to: "/about"    },
  { label: "Contact",  to: "/contact"  },
];

const socialLinks = [
  { label: "LinkedIn",  href: "#" },
  { label: "GitHub",    href: "#" },
  { label: "Twitter / X", href: "#" },
];

const mono: CSSProperties = { fontFamily: "JetBrains Mono, monospace" };

function ColHeader({ text }: { text: string }) {
  return (
    <p className="text-xs font-mono font-medium uppercase tracking-widest mb-5"
      style={{ color: "var(--accent)", ...mono }}>
      {text}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border-dashed)" }}>
      <div className="absolute inset-0 scan-lines" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-0">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12"
          style={{ borderBottom: "1px dashed var(--border-dashed)" }}>

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="block mb-4">
              <div className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>
                Sintrix Technologies
              </div>
              <div className="text-xs font-mono" style={{ color: "var(--accent)", ...mono }}>
                // software engineering studio
              </div>
            </Link>
            {/* Status line */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 mt-1"
              style={{ backgroundColor: "var(--green-soft)", border: "1px solid var(--green-border)", borderRadius: "4px" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "var(--green)", boxShadow: "0 0 4px var(--green-glow)" }} />
              <span className="text-xs font-mono" style={{ color: "var(--green)", ...mono, letterSpacing: "0.06em" }}>
                SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <ColHeader text="// NAVIGATE" />
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className="inline-flex items-center gap-1.5 text-sm font-mono transition-colors duration-150 nav-link"
                    style={({ isActive }) => ({ color: isActive ? "var(--accent)" : "var(--muted)", ...mono })}
                  >
                    <span style={{ color: "var(--subtle)" }}>&gt;</span>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Connect */}
          <div>
            <ColHeader text="// CONNECT" />
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="mailto:hello@sintrix.dev"
                  className="inline-flex items-center gap-1.5 text-sm font-mono nav-link"
                  style={{ color: "var(--muted)", ...mono }}>
                  <span style={{ color: "var(--subtle)" }}>&gt;</span>
                  hello@sintrix.dev
                </a>
              </li>
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href}
                    className="inline-flex items-center gap-1.5 text-sm font-mono nav-link"
                    style={{ color: "var(--muted)", ...mono }}>
                    <span style={{ color: "var(--subtle)" }}>&gt;</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Start a project */}
          <div>
            <ColHeader text="// START A PROJECT" />
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              Have something in mind?<br />Let's build it.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono font-semibold transition-all duration-200"
              style={{ color: "var(--text)", border: "1px solid var(--accent-pill-border)", borderRadius: "6px", backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-pill-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
            >
              <span style={{ color: "var(--subtle)" }}>&gt;</span>
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5">
          <p className="text-xs font-mono" style={{ color: "var(--subtle)", ...mono }}>
            © 2026 Sintrix Technologies. All rights reserved.
          </p>
          <p className="text-xs font-mono" style={{ color: "var(--subtle)", ...mono }}>
            BUILT WITH ♥ AND CODE
          </p>
        </div>
      </div>
    </footer>
  );
}
