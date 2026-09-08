import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import PageHeader from "./PageHeader";
import Reveal from "./Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

const pages = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookies" },
] as const;

export default function LegalPage({
  title,
  description,
  path,
  subtitle,
  children,
}: {
  title: string;
  description: string;
  path: string;
  subtitle: string;
  children: ReactNode;
}) {
  usePageMeta(`${title} — Refract Labs`, description, path);
  const { pathname } = useLocation();

  return (
    <>
      <PageHeader eyebrow="Legal" title={title} subtitle={subtitle} />
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="legal-page">
          <nav className="legal-switch" aria-label="Legal">
            {pages.map((p) =>
              pathname === p.to ? (
                <span key={p.to} aria-current="page">
                  {p.label}
                </span>
              ) : (
                <Link key={p.to} to={p.to}>
                  {p.label}
                </Link>
              ),
            )}
          </nav>
          <div className="legal-copy">{children}</div>
          <Reveal className="legal-updated">
            Last updated September 2026. This is written for the marketing site, not as formal legal advice.
          </Reveal>
        </div>
      </section>
    </>
  );
}
