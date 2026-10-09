import { Link, NavLink } from "react-router";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { AI_PATH, DEMO_PATH, agentPath, agents } from "../content/ai";
import { categoryPath, serviceCategories } from "../content/services";
import { site } from "../content/site";
import { Logo } from "./Logo";
import NewsletterForm from "./NewsletterForm";

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? "nav-link nav-link-active" : "nav-link");

function Socials() {
  const items: { label: string; href: string; Icon: IconType }[] = [
    { label: "LinkedIn", href: site.socials.linkedin, Icon: FaLinkedinIn },
    { label: "GitHub", href: site.socials.github, Icon: FaGithub },
    { label: "X", href: site.socials.x, Icon: FaXTwitter },
  ].filter((s) => s.href);

  if (!items.length) return null;

  return (
    <ul className="footer-socials">
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a href={href} className="footer-social" target="_blank" rel="noreferrer" aria-label={label}>
            <Icon size={16} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">
        {/* Brand and link columns */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-10">
          <div className="col-span-2">
            <Logo size="footer" />
            <p className="mt-4 text-sm max-w-xs" style={{ color: "var(--muted)" }}>
              A software and AI studio in Nairobi, building custom software and AI agents for businesses.
            </p>
            <Socials />
          </div>

          <div>
            <p className="eyebrow">Refract AI</p>
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink to={AI_PATH} end className={navClass}>
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
                  <NavLink to={categoryPath(category.id)} className={navClass}>
                    {category.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Company</p>
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink to="/" end className={navClass}>
                  Home
                </NavLink>
              </li>
              {site.footerNav.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={navClass}>
                    {l.label}
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
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <div>
            <p className="footer-newsletter-title">Subscribe for notes from the studio</p>
            <p className="footer-newsletter-text">
              What we're learning building AI agents and software in Nairobi. Unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Fine print */}
        <div className="footer-legal">
          <p>
            © {new Date().getFullYear()} Refract Labs. All rights reserved.
            <span className="footer-legal-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </span>
          </p>
          <p>Built for the long run.</p>
        </div>
      </div>
    </footer>
  );
}
