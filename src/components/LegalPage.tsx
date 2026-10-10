import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { FiFileText, FiArrowUpRight, FiMail } from "react-icons/fi";
import Reveal from "./ScrollReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { site } from "../content/site";

const pages = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookies" },
] as const;

export default function LegalPage({ title, description, path, subtitle, children }: {
  title: string;
  description: string;
  path: string;
  subtitle: string;
  children: ReactNode;
}) {
  usePageMeta(`${title} — Refract Labs`, description, path);
  const { pathname } = useLocation();
  const sections = Children.toArray(children).map((child, index) => {
    const id = `policy-section-${index + 1}`;
    const heading = isValidElement<{ children?: ReactNode }>(child)
      ? Children.toArray(child.props.children).find((item) => isValidElement(item) && item.type === "h2")
      : undefined;
    const label = isValidElement<{ children?: ReactNode }>(heading) ? heading.props.children : `Section ${index + 1}`;
    return { id, label, content: isValidElement<{ id?: string }>(child) ? cloneElement(child, { id }) : child };
  });

  return (
    <article className="legal-document software-scroll-content">
      <header className="legal-document-header">
        <Reveal className="ai-mask-head" rise={false}>
          <span className="legal-document-icon"><FiFileText aria-hidden="true" /></span>
          <span className="projects-eyebrow">LEGAL & POLICIES</span>
          <h1><span className="ai-mask-word"><span>{title}</span></span></h1>
          <p className="ai-mask-after">{subtitle}</p>
          <span className="legal-version ai-mask-after">Last updated October 2026</span>
        </Reveal>
      </header>
      <div className="legal-page">
        <nav className="legal-switch" aria-label="Legal policies">
          {pages.map((page) => <Link key={page.to} to={page.to} aria-current={pathname === page.to ? "page" : undefined}>{page.label}</Link>)}
        </nav>
        <div className="legal-document-grid">
          <aside className="legal-sidebar">
            <nav aria-label="On this page">
              <span className="legal-sidebar-label">ON THIS PAGE</span>
              <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a></li>)}</ol>
            </nav>
            <a className="legal-question" href={`mailto:${site.email}`}><FiMail aria-hidden="true" /><span>Questions about a policy?<strong>Email our team <FiArrowUpRight aria-hidden="true" /></strong></span></a>
          </aside>
          <div>
            <div className="legal-copy">{sections.map((section) => section.content)}</div>
            <p className="legal-updated">Last updated October 2026. These pages are not legal advice. A signed engagement or product agreement, if you have one, controls if it conflicts with what is written here.</p>
          </div>
        </div>
      </div>
    </article>
  );
}