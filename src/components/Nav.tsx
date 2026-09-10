import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useTheme } from "../context/theme";
import { categoryPath, serviceCategories, servicePath } from "../content/services";
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={open ? "nav-chevron is-open" : "nav-chevron"}>
      <path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
const restNav = site.nav.filter((item) => item.label !== "Services");

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const panelId = useId();
  const megaId = useId();
  const mobileServicesId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number>(0);
  const themeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  const linksRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });
  const servicesActive = location.pathname === "/services" || location.pathname.startsWith("/services/");

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname, location.hash]);

  useLayoutEffect(() => {
    function measure() {
      const list = linksRef.current;
      if (!list) return;
      const active = list.querySelector(".nav-link-active");
      if (!(active instanceof HTMLElement)) {
        setUnderline((current) => ({ ...current, opacity: 0 }));
        return;
      }
      const parent = list.getBoundingClientRect();
      const box = active.getBoundingClientRect();
      setUnderline({
        left: box.left - parent.left,
        width: box.width,
        opacity: 1,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [location.pathname, megaOpen]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
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
  }, [open, mobileServicesOpen]);

  useEffect(() => {
    if (!megaOpen) return;

    function onDoc(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (megaRef.current?.contains(target) || servicesBtnRef.current?.contains(target)) return;
      setMegaOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaOpen(false);
        servicesBtnRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  function openMega() {
    window.clearTimeout(hoverTimer.current);
    setMegaOpen(true);
  }

  function closeMegaSoon() {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  }

  function onServicesKey(e: ReactKeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMegaOpen(true);
      requestAnimationFrame(() => {
        megaRef.current?.querySelector<HTMLElement>("a")?.focus();
      });
    }
  }

  const mega = (
    <div
      id={megaId}
      ref={megaRef}
      className="nav-mega"
      aria-label="Services"
    >
      {serviceCategories.map((category) => (
        <div key={category.id} className="nav-mega-col">
          <Link to={categoryPath(category.id)} className="nav-mega-heading">
            {category.title}
          </Link>
          <ul className="nav-mega-list">
            {category.services.map((service) => (
              <li key={service.id}>
                <Link to={servicePath(category.id, service.id)} className="nav-mega-link">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <nav
      className={megaOpen ? "site-nav is-mega" : "site-nav"}
      aria-label="Primary"
      onMouseLeave={closeMegaSoon}
    >
      <div className="site-nav-bar">
        <Logo />

        <div className="hidden md:flex items-center gap-7 pr-1">
          <div ref={linksRef} className="nav-links flex items-center gap-7">
            <div className="nav-services" onMouseEnter={openMega}>
              <button
                ref={servicesBtnRef}
                type="button"
                className={servicesActive ? "nav-link nav-link-active nav-services-trigger" : "nav-link nav-services-trigger"}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls={megaId}
                onClick={() => setMegaOpen(true)}
                onKeyDown={onServicesKey}
              >
                Services
                <Chevron open={megaOpen} />
              </button>
            </div>
            {restNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
              >
                {l.label}
              </NavLink>
            ))}
            <span
              className="nav-underline"
              aria-hidden="true"
              style={{
                width: underline.width,
                opacity: underline.opacity,
                transform: `translateX(${underline.left}px)`,
              }}
            />
          </div>
          <button type="button" onClick={toggle} aria-label={themeLabel} className="site-nav-icon">
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <ButtonLink to="/contact" className="!py-2.5 !px-4 !text-sm !rounded-full">
            Start a project
          </ButtonLink>
        </div>

        <div className="md:hidden flex items-center gap-2 pr-0.5">
          <button type="button" onClick={toggle} aria-label={themeLabel} className="site-nav-icon site-nav-icon-lg">
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            ref={toggleRef}
            type="button"
            className="site-nav-icon site-nav-icon-lg"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
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

      {megaOpen ? (
        <div className="hidden md:block nav-mega-wrap" onMouseEnter={openMega}>
          {mega}
        </div>
      ) : null}

      {open ? (
        <div id={panelId} ref={panelRef} className="site-nav-panel md:hidden">
          <div className="nav-mobile-services">
            <button
              type="button"
              className={servicesActive ? "nav-link nav-link-active text-base nav-mobile-services-trigger" : "nav-link text-base nav-mobile-services-trigger"}
              aria-expanded={mobileServicesOpen}
              aria-controls={mobileServicesId}
              onClick={() => setMobileServicesOpen((value) => !value)}
            >
              Services
              <Chevron open={mobileServicesOpen} />
            </button>
            {mobileServicesOpen ? (
              <div id={mobileServicesId} className="nav-mobile-services-panel">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={categoryPath(category.id)}
                    className="nav-link nav-mobile-cat"
                    onClick={() => setOpen(false)}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {restNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "nav-link nav-link-active text-base" : "nav-link text-base")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <ButtonLink to="/contact" className="!rounded-full mt-1" onClick={() => setOpen(false)}>
            Start a project
          </ButtonLink>
        </div>
      ) : null}
    </nav>
  );
}
