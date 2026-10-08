import { Link, NavLink } from "react-router";
import { AI_PATH, DEMO_PATH, agentPath, agents } from "../content/ai";
import { categoryPath, serviceCategories } from "../content/services";
import { site } from "../content/site";
import { Logo } from "./Logo";

function Socials() {
  const items = [
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "GitHub", href: site.socials.github },
    { label: "X", href: site.socials.x },
  ].filter((s) => s.href);

  if (!items.length) return null;

  return (
    <ul className="flex flex-col gap-2">
      {items.map((s) => (
        <li key={s.label}>
          <a href={s.href} className="nav-link" target="_blank" rel="noreferrer">
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <div>
            <Logo size="footer" />
            <p className="mt-4 text-sm max-w-xs" style={{ color: "var(--muted)" }}>
              A software and AI studio in Nairobi, building custom software and AI agents for businesses.
            </p>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}>
                  Home
                </NavLink>
              </li>
              {site.footerNav.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Refract AI</p>
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink to={AI_PATH} end className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}>
                  All agents
                </NavLink>
              </li>
              {agents.slice(0, 3).map((agent) => (
                <li key={agent.id}>
                  <Link to={agentPath(agent.id)} className="nav-link">
                    {agent.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={DEMO_PATH} className="nav-link">
                  Book a demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Refract Software</p>
            <ul className="flex flex-col gap-2">
              {serviceCategories.map((category) => (
                <li key={category.id}>
                  <NavLink
                    to={categoryPath(category.id)}
                    className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
                  >
                    {category.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={`mailto:${site.email}`} className="nav-link">
                  {site.email}
                </a>
              </li>
              <li className="text-sm" style={{ color: "var(--muted)" }}>
                {site.location}
              </li>
            </ul>
            <div className="mt-6">
              <p className="eyebrow">Connect</p>
              <Socials />
            </div>
          </div>

          <div>
            <p className="eyebrow">Legal</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/privacy" className="nav-link">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="nav-link">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="nav-link">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm"
          style={{ borderTop: "1px solid var(--border)", color: "var(--subtle)" }}
        >
          <p>© {new Date().getFullYear()} Refract Labs. All rights reserved.</p>
          <p>Built for the long run.</p>
        </div>
      </div>
    </footer>
  );
}
