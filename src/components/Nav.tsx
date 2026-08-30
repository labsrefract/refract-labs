import { useState } from "react";
import { NavLink, Link } from "react-router";
import { useTheme } from "../context/theme";

const links = [
  { label: "Services", to: "/services" },
  { label: "Work",     to: "/work"     },
  { label: "Process",  to: "/process"  },
  { label: "About",    to: "/about"    },
  { label: "Contact",  to: "/contact"  },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="block" onClick={() => setOpen(false)}>
          <span className="text-base font-bold tracking-tight" style={{ color: "var(--text)" }}>
            Sintrix Technologies
          </span>
          <div className="hidden lg:block text-xs mt-0.5 font-mono" style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
            // software engineering studio
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-sm font-medium transition-colors duration-150"
              style={({ isActive }) => ({
                color: isActive ? "var(--text)" : "var(--muted)",
                fontFamily: "JetBrains Mono, monospace",
              })}
            >
              {l.label}
            </NavLink>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="flex items-center justify-center w-8 h-8 rounded transition-colors duration-150"
            style={{
              color: "var(--muted)",
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              borderRadius: "6px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-pill-border)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          <Link
            to="/contact"
            className="btn-primary text-sm font-mono font-semibold px-4 py-2"
            style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: "6px" }}
          >
            &gt; Start a Project
          </Link>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-8 h-8"
            style={{ color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "6px", backgroundColor: "var(--surface)" }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 transition-all duration-200" style={{ backgroundColor: "var(--text)", transform: open ? "rotate(45deg) translate(4px, 4px)" : "" }} />
            <span className="block w-5 h-0.5 transition-all duration-200" style={{ backgroundColor: "var(--text)", opacity: open ? 0 : 1 }} />
            <span className="block w-5 h-0.5 transition-all duration-200" style={{ backgroundColor: "var(--text)", transform: open ? "rotate(-45deg) translate(4px, -4px)" : "" }} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-sm font-mono transition-colors duration-150"
              style={({ isActive }) => ({ color: isActive ? "var(--text)" : "var(--muted)", fontFamily: "JetBrains Mono, monospace" })}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="btn-primary text-sm font-mono font-semibold px-4 py-2 text-center mt-1"
            style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: "6px" }}
            onClick={() => setOpen(false)}
          >
            &gt; Start a Project
          </Link>
        </div>
      )}
    </nav>
  );
}
