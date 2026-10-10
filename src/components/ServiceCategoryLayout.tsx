import { Link } from "react-router";
import { FiCode, FiCloud, FiPenTool, FiCompass, FiTool, FiArrowUpRight, FiGlobe, FiSmartphone, FiZap, FiLayers, FiLink, FiDatabase, FiRefreshCw, FiCheckCircle, FiUsers, FiMonitor } from "react-icons/fi";
import type { IconType } from "react-icons";
import Reveal from "./ScrollReveal";
import PageCTA from "./PageCTA";
import { ButtonLink } from "./Button";
import { categoryPath, serviceCategories, type ServiceCategory } from "../content/services";

const categoryIcons: Record<string, IconType> = { "software-development": FiCode, "infrastructure-devops": FiCloud, design: FiPenTool, "strategy-advisory": FiCompass, "support-maintenance": FiTool };
const serviceIcons: Record<string, IconType> = { "web-development": FiGlobe, "mobile-app-development": FiSmartphone, "mvp-development": FiZap, "custom-software-development": FiLayers, "api-development-integrations": FiLink, automation: FiZap, "cloud-architecture-migration": FiCloud, "devops-ci-cd-setup": FiRefreshCw, "database-design-management": FiDatabase, "ui-ux-design": FiMonitor, "product-design-prototyping": FiPenTool, "technical-consulting": FiCompass, "digital-transformation-consulting": FiLayers, "product-management-as-a-service": FiUsers, "ongoing-maintenance-support": FiTool, "qa-testing-services": FiCheckCircle, "staff-augmentation": FiUsers };

export default function ServiceCategoryLayout({ category }: { category: ServiceCategory }) {
  const others = serviceCategories.filter((item) => item.id !== category.id);
  const CategoryIcon = categoryIcons[category.id] ?? FiCode;
  const enquiry = `/contact?type=${category.id}`;
  return (
    <article className="service-cat service-detail-page software-scroll-content">
      <header className="service-cat-hero">
        <Reveal className="service-detail-heading ai-mask-head" rise={false}>
          <span className="service-detail-glyph"><CategoryIcon aria-hidden="true" strokeWidth={1.5} /></span>
          <span className="projects-eyebrow">{category.kicker}</span>
          <h1><span className="ai-mask-word"><span>{category.title}</span></span></h1>
          <p className="ai-mask-after">{category.intro}</p>
          <div className="service-detail-actions ai-mask-after"><ButtonLink to={enquiry}>Let’s talk <FiArrowUpRight aria-hidden="true" /></ButtonLink><a href="#service-detail-offering">Explore the services ↓</a></div>
        </Reveal>
      </header>
      <section className="service-cat-shell service-detail-offering" id="service-detail-offering" aria-labelledby="service-offering-heading">
        <Reveal className="service-detail-section-heading" rise={false}><h2 id="service-offering-heading">Where we can help.</h2><p>Find the right starting point for your project.</p></Reveal>
        <ul className="service-card-grid">
          {category.services.map((service, index) => {
            const Icon = serviceIcons[service.id] ?? CategoryIcon;
            return (
              <Reveal as="li" key={service.id} id={service.id} className="service-detail-card offer-card-reveal" rise={false} delay={(index % 2) * 100}>
                <div className="service-detail-card-top"><span className="service-detail-card-icon"><Icon aria-hidden="true" strokeWidth={1.5} /></span><span className="service-detail-card-number">{String(index + 1).padStart(2,"0")}</span></div>
                <h3>{service.title}</h3><p>{service.description}</p>
                <ul className="service-detail-tags" aria-label={`${service.title} focus areas`}>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </Reveal>
            );
          })}
        </ul>
      </section>
      <section className="service-cat-shell service-detail-related" aria-labelledby="other-services-heading">
        <Reveal className="service-detail-section-heading ai-mask-head" rise={false}><span className="projects-eyebrow">THE REST OF THE PICTURE</span><h2 id="other-services-heading"><span className="ai-mask-word"><span>Good work connects.</span></span></h2><p className="ai-mask-after">Design, development, infrastructure and support. Explore the other ways we can help.</p></Reveal>
        <ul className="service-detail-related-grid">
          {others.map((item, index) => {
            const Icon = categoryIcons[item.id] ?? FiCode;
            return <Reveal as="li" key={item.id} className="offer-card-reveal" rise={false} delay={(index % 2) * 100}><Link to={categoryPath(item.id)}><Icon className="service-detail-related-icon" aria-hidden="true" /><span><small>{item.kicker}</small><strong>{item.title}</strong></span><FiArrowUpRight aria-hidden="true" /></Link></Reveal>;
          })}
        </ul>
      </section>
      <PageCTA headline="Let’s talk about your next step." sub="Tell us what you need to build, improve, or keep running. We will help you find a practical starting point." />
    </article>
  );
}