import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useTheme } from "../context/theme";
import { AI_PATH, DEMO_PATH, agentPath, agents, featuredAgent, industries } from "../content/ai";
import { categoryPath, serviceCategories } from "../content/services";
import { site } from "../content/site";
import { useDivision } from "../hooks/useDivision";
import AgentGlyph from "./AgentGlyph";
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

/** Dropdowns: Services on the Software navbar, Agents and Solutions on the AI one. */
type Menu = "services" | "agents" | "solutions";

/** In-page sections of the AI landing page linked from its navbar. */
const aiSections = [
  { label: "How it works", to: `${AI_PATH}#how-it-works` },
  { label: "FAQ", to: `${AI_PATH}#faq` },
];
const industryPath = (id: string) => `${AI_PATH}?industry=${id}#industries`;

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * The navbar follows the division you are in: Refract Software (teal) or
 * Refract AI (purple). Each shows only its own links, plus one switch across
 * to the other division.
 */
export default function Nav() {
  const division = useDivision();
  const isAI = division === "ai";
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [mobileMenu, setMobileMenu] = useState<Menu | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const panelId = useId();
  const megaId = useId();
  const mobileMenuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const agentsBtnRef = useRef<HTMLButtonElement>(null);
  const solutionsBtnRef = useRef<HTMLButtonElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number>(0);
  const themeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  const linksRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });
  const triggerRef = (m: Menu) => (m === "agents" ? agentsBtnRef : m === "solutions" ? solutionsBtnRef : servicesBtnRef);
  const servicesActive = location.pathname === "/services" || location.pathname.startsWith("/services/");

  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setMobileMenu(null);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  }, [location.pathname, menu, division]);

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
  }, [open, mobileMenu]);

  useEffect(() => {
    if (!menu) return;
    const trigger = triggerRef(menu);

    function onDoc(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (
        megaRef.current?.contains(target) ||
        agentsBtnRef.current?.contains(target) ||
        solutionsBtnRef.current?.contains(target) ||
        servicesBtnRef.current?.contains(target)
      )
        return;
      setMenu(null);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenu(null);
        trigger.current?.focus();
      }
    }

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  function openMenu(next: Menu) {
    window.clearTimeout(hoverTimer.current);
    setMenu(next);
  }

  function closeMenuSoon() {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMenu(null), 140);
  }

  function onTriggerKey(next: Menu) {
    return (e: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setMenu(next);
        requestAnimationFrame(() => {
          megaRef.current?.querySelector<HTMLElement>("a")?.focus();
        });
      }
    };
  }

  /**
   * Links to a section of the current page don't change the URL when it
   * already matches, so the router won't scroll; scroll to the section here.
   */
  function sameUrlScroll(to: string) {
    return () => {
      setOpen(false);
      setMenu(null);
      if (location.pathname + location.search + location.hash !== to) return;
      const id = to.split("#")[1];
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
    };
  }

  const agentsMega = (
    <div id={megaId} ref={megaRef} className="nav-ai-mega" aria-label="Agents">
      <div className="nav-ai-catalogue">
        <div className="nav-ai-head">
          <span className="nav-ai-kicker">Agent catalogue</span>
          <Link to={AI_PATH} className="nav-ai-all">
            All agents →
          </Link>
        </div>
        <ul className="nav-ai-grid">
          {agents.map((agent) => (
            <li key={agent.id}>
              <Link to={agentPath(agent.id)} className="nav-ai-agent" onClick={sameUrlScroll(agentPath(agent.id))}>
                <AgentGlyph kind={agent.glyph} />
                <span className="nav-ai-agent-text">
                  <span className="nav-ai-agent-name">
                    {agent.name}
                    {agent.tag ? <span className="nav-ai-tag">{agent.tag}</span> : null}
                  </span>
                  <span className="nav-ai-agent-desc">{agent.desc}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-ai-featured">
        <span className="nav-ai-featured-kicker">Featured agent</span>
        <span className="nav-ai-featured-title">{featuredAgent.title}</span>
        <span className="nav-ai-featured-desc">{featuredAgent.desc}</span>
        <Link to={DEMO_PATH} className="nav-ai-featured-cta">
          Book a demo
        </Link>
      </div>
    </div>
  );

  const solutionsMega = (
    <div id={megaId} ref={megaRef} className="nav-ai-mega nav-solutions-mega" aria-label="Solutions">
      <div className="nav-ai-catalogue">
        <div className="nav-ai-head">
          <span className="nav-ai-kicker">Solutions by industry</span>
          <Link to={`${AI_PATH}#industries`} className="nav-ai-all" onClick={sameUrlScroll(`${AI_PATH}#industries`)}>
            All industries →
          </Link>
        </div>
        <ul className="nav-solutions-grid">
          {industries.map((ind) => (
            <li key={ind.id}>
              <Link to={industryPath(ind.id)} className="nav-solution" onClick={sameUrlScroll(industryPath(ind.id))}>
                <span className="nav-solution-title">{ind.title}</span>
                <span className="nav-ai-agent-desc">{ind.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Services menu: the five categories, not every service.
  const servicesMega = (
    <div id={megaId} ref={megaRef} className="nav-ai-mega nav-solutions-mega nav-services-mega" aria-label="Services">
      <div className="nav-ai-catalogue">
        <div className="nav-ai-head">
          <span className="nav-ai-kicker">Refract Software services</span>
          <Link to="/services" className="nav-ai-all">
            All services →
          </Link>
        </div>
        <ul className="nav-solutions-grid">
          {serviceCategories.map((category) => (
            <li key={category.id}>
              <Link to={categoryPath(category.id)} className="nav-solution">
                <span className="nav-solution-title">{category.title}</span>
                <span className="nav-ai-agent-desc">{category.kicker}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // The switch across to the other division, coloured as that division.
  const divisionSwitch = isAI ? (
    <Link to="/" className="nav-switch is-software">
      Refract Software <span aria-hidden="true">→</span>
    </Link>
  ) : (
    <Link to={AI_PATH} className="nav-switch is-ai">
      <span className="nav-switch-mark" aria-hidden="true">
        AI
      </span>
      Refract AI <span aria-hidden="true">→</span>
    </Link>
  );

  const menuTrigger = (m: Menu, label: string, active = false) => (
    <div className="nav-services" onMouseEnter={() => openMenu(m)}>
      <button
        ref={triggerRef(m)}
        type="button"
        className={active ? "nav-link nav-link-active nav-services-trigger" : "nav-link nav-services-trigger"}
        aria-expanded={menu === m}
        aria-haspopup="true"
        aria-controls={menu === m ? megaId : undefined}
        onClick={() => setMenu(menu === m ? null : m)}
        onKeyDown={onTriggerKey(m)}
      >
        {label}
        <Chevron open={menu === m} />
      </button>
    </div>
  );

  return (
    <nav
      className={`site-nav is-${division}${menu ? " is-mega" : ""}${scrolled ? " is-scrolled" : ""}`}
      aria-label={isAI ? "Refract AI" : "Refract Software"}
      onMouseLeave={closeMenuSoon}
    >
      <div className="site-nav-bar">
        <div className="nav-brand">
          <Logo />
          {isAI ? (
            <Link to={AI_PATH} className="nav-division-tag" aria-label="Refract AI home">
              AI
            </Link>
          ) : null}
        </div>

        {/* Desktop: logo left, main links centred, actions right. */}
        <div className="hidden md:flex nav-center">
          <div ref={linksRef} className="nav-links flex items-center gap-6">
            {isAI ? (
              <>
                {menuTrigger("agents", "Agents")}
                {menuTrigger("solutions", "Solutions")}
                {aiSections.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="nav-link nav-section-link"
                    onMouseEnter={closeMenuSoon}
                    onClick={sameUrlScroll(s.to)}
                  >
                    {s.label}
                  </Link>
                ))}
              </>
            ) : (
              site.nav.map((l) =>
                l.to === "/services" ? (
                  <div key={l.to}>{menuTrigger("services", l.label, servicesActive)}</div>
                ) : (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onMouseEnter={closeMenuSoon}
                    className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
                  >
                    {l.label}
                  </NavLink>
                ),
              )
            )}
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
        </div>

        <div className="hidden md:flex items-center gap-4 pr-1 nav-actions">
          {divisionSwitch}
          <button type="button" onClick={toggle} aria-label={themeLabel} className="site-nav-icon">
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          {isAI ? (
            <Link to={DEMO_PATH} className="btn nav-ai-cta !py-2.5 !px-4 !text-sm !rounded-full">
              Book a demo
            </Link>
          ) : (
            <ButtonLink to="/contact" className="!py-2.5 !px-4 !text-sm !rounded-full">
              Start a project
            </ButtonLink>
          )}
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

      {menu ? (
        <div className="hidden md:block nav-mega-wrap" onMouseEnter={() => openMenu(menu)}>
          {menu === "agents" ? agentsMega : menu === "solutions" ? solutionsMega : servicesMega}
        </div>
      ) : null}

      {open ? (
        <div id={panelId} ref={panelRef} className="site-nav-panel md:hidden">
          {isAI ? (
            <>
              {(["agents", "solutions"] as const).map((m) => (
                <div key={m} className="nav-mobile-services">
                  <button
                    type="button"
                    className="nav-link text-base nav-mobile-services-trigger"
                    aria-expanded={mobileMenu === m}
                    aria-controls={mobileMenu === m ? mobileMenuId : undefined}
                    onClick={() => setMobileMenu(mobileMenu === m ? null : m)}
                  >
                    {m === "agents" ? "Agents" : "Solutions"}
                    <Chevron open={mobileMenu === m} />
                  </button>
                  {mobileMenu === m ? (
                    <div id={mobileMenuId} className="nav-mobile-ai-panel">
                      {m === "agents"
                        ? agents.map((agent) => (
                            <Link
                              key={agent.id}
                              to={agentPath(agent.id)}
                              className="nav-ai-agent"
                              onClick={sameUrlScroll(agentPath(agent.id))}
                            >
                              <AgentGlyph kind={agent.glyph} size={36} />
                              <span className="nav-ai-agent-text">
                                <span className="nav-ai-agent-name is-sm">{agent.name}</span>
                                <span className="nav-ai-agent-desc">{agent.desc}</span>
                              </span>
                            </Link>
                          ))
                        : industries.map((ind) => (
                            <Link
                              key={ind.id}
                              to={industryPath(ind.id)}
                              className="nav-link nav-mobile-cat"
                              onClick={sameUrlScroll(industryPath(ind.id))}
                            >
                              {ind.title}
                            </Link>
                          ))}
                    </div>
                  ) : null}
                </div>
              ))}
              {aiSections.map((s) => (
                <Link key={s.to} to={s.to} className="nav-link text-base" onClick={sameUrlScroll(s.to)}>
                  {s.label}
                </Link>
              ))}
            </>
          ) : (
            site.nav.map((l) =>
              l.to === "/services" ? (
                <div key={l.to} className="nav-mobile-services">
                  <button
                    type="button"
                    className={
                      servicesActive
                        ? "nav-link nav-link-active text-base nav-mobile-services-trigger"
                        : "nav-link text-base nav-mobile-services-trigger"
                    }
                    aria-expanded={mobileMenu === "services"}
                    aria-controls={mobileMenu === "services" ? mobileMenuId : undefined}
                    onClick={() => setMobileMenu(mobileMenu === "services" ? null : "services")}
                  >
                    {l.label}
                    <Chevron open={mobileMenu === "services"} />
                  </button>
                  {mobileMenu === "services" ? (
                    <div id={mobileMenuId} className="nav-mobile-ai-panel">
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
                      <Link to="/services" className="nav-ai-all" onClick={() => setOpen(false)}>
                        All services →
                      </Link>
                    </div>
                  ) : null}
                </div>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => (isActive ? "nav-link nav-link-active text-base" : "nav-link text-base")}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ),
            )
          )}
          <div className="nav-mobile-switch">{divisionSwitch}</div>
          {isAI ? (
            <Link to={DEMO_PATH} className="btn nav-ai-cta !rounded-full mt-1" onClick={() => setOpen(false)}>
              Book a demo
            </Link>
          ) : (
            <ButtonLink to="/contact" className="!rounded-full mt-1" onClick={() => setOpen(false)}>
              Start a project
            </ButtonLink>
          )}
        </div>
      ) : null}
    </nav>
  );
}
