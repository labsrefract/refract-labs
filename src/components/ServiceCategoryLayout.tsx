import { Link } from "react-router";
import Eyebrow from "./Eyebrow";
import { categoryPath, serviceCategories, type ServiceCategory } from "../content/services";

export default function ServiceCategoryLayout({ category }: { category: ServiceCategory }) {
  const others = serviceCategories.filter((item) => item.id !== category.id);

  return (
    <article className="service-cat">
      <header className="service-cat-hero">
        <div className="service-cat-shell">
          <Eyebrow text="Services" />
          <h1 className="service-cat-title">{category.title}</h1>
          <p className="service-cat-intro">{category.intro}</p>
        </div>
      </header>

      <div className="service-cat-shell">
        <ul className="service-card-grid">
          {category.services.map((service) => (
            <li key={service.id} id={service.id} className="service-card">
              <h2 className="service-card-title">{service.title}</h2>
              <p className="service-card-copy">{service.description}</p>
              <ul className="service-card-tags" aria-label={`${service.title} focus areas`}>
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <section className="service-cat-more" aria-labelledby="other-services-heading">
        <div className="service-cat-shell">
          <Eyebrow text="Continue" />
          <h2 id="other-services-heading" className="service-cat-more-title">
            Other services
          </h2>
          <ul className="service-cat-more-grid">
            {others.map((item) => (
              <li key={item.id}>
                <Link to={categoryPath(item.id)} className="service-cat-more-link">
                  <span className="service-cat-more-kicker">{item.kicker}</span>
                  <span className="service-cat-more-name">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
