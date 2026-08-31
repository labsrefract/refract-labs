import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useTheme } from "../context/theme";
import { site } from "../content/site";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const themeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const nodes = panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    nodes[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "var(--nav-bg)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[4.5rem]">
        <Logo />

        <div className="hidden md:flex items-center gap-7">
          {site.nav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
            >
              {l.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={toggle}
            aria-label={themeLabel}
            className="flex items-center justify-center w-9 h-9"
            style={{ color: "var(--muted)", border: "1px solid var(--border)", background: "var(--surface)", borderRadius: "6px" }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <ButtonLink to="/contact" className="!py-2.5 !px-4 !text-sm">
            Start a project
          </ButtonLink>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={themeLabel}
            className="flex items-center justify-center w-10 h-10"
            style={{ color: "var(--muted)", border: "1px solid var(--border)", background: "var(--surface)", borderRadius: "6px" }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            ref={toggleRef}
            type="button"
            className="flex items-center justify-center w-10 h-10"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            style={{ color: "var(--text)", border: "1px solid var(--border)", background: "var(--surface)", borderRadius: "6px" }}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id={panelId}
          ref={panelRef}
          className="md:hidden px-6 py-5 flex flex-col gap-4"
          style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
        >
          {site.nav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "nav-link nav-link-active text-base" : "nav-link text-base")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <ButtonLink to="/contact" onClick={() => setOpen(false)}>
            Start a project
          </ButtonLink>
        </div>
      )}
    </nav>
  );
}
