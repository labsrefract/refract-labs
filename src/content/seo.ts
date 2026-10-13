import { caseStudies } from "./work"
import { serviceCategories } from "./services"

export const seoSite = {
  url: "https://www.refractlabs.tech",
  title: "Refract Labs | Software Development & AI Agents in Nairobi",
  description:
    "Refract Labs builds custom software, websites and AI agents for businesses. A Nairobi team for design, development, cloud infrastructure and ongoing support.",
  image: "https://www.refractlabs.tech/og-image-v2.jpg",
  imageAlt: "Refract Labs: We bend ideas into products. Glass prism with teal and violet accents.",
}
export const seoPages = [
  { path: "/", title: seoSite.title, description: seoSite.description },
  {
    path: "/ai",
    title: "Refract AI | AI Agents for Business",
    description:
      "AI agents for customer support, collections and back-office work, connected to WhatsApp, M-Pesa and your existing business systems.",
  },
  {
    path: "/work",
    title: "Our Work | Software & Website Projects | Refract Labs",
    description:
      "Explore websites and software built by Refract Labs, including projects for construction, interiors, room bookings and manufacturing businesses.",
  },
  {
    path: "/process",
    title: "Our Process | Discover, Design, Build & Launch | Refract Labs",
    description:
      "See how Refract Labs takes your project from discovery and design to development, launch and ongoing support.",
  },
  {
    path: "/about",
    title: "About Refract Labs | Meet Our Nairobi Software Team",
    description:
      "Meet the Refract Labs founders: a Nairobi team building custom software and practical AI, with direct communication from discovery through support.",
  },
  {
    path: "/contact",
    title: "Contact Refract Labs | Start a Project or Book a Call",
    description:
      "Tell Refract Labs about your software or AI project, or request a free 30-minute discovery call. Based in Nairobi; replies within one business day.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Refract Labs",
    description:
      "How Refract Labs handles personal information across its websites, products and services.",
  },
  {
    path: "/terms",
    title: "Terms of Service | Refract Labs",
    description:
      "Terms for using websites, products and services operated by Refract Labs.",
  },
  {
    path: "/cookies",
    title: "Cookie Policy | Refract Labs",
    description:
      "How Refract Labs uses cookies, local storage and related technologies, and how you can control them.",
  },
  ...serviceCategories.map((category) => ({
    path: `/services/${category.id}`,
    title: `${category.title} Services | Refract Labs`,
    description: category.metaDescription,
  })),
  ...caseStudies.map((project) => ({
    path: `/work/${project.slug}`,
    title: `${project.name} | Project Case Study | Refract Labs`,
    description: project.summary,
    image: project.image,
  })),
]
export function seoForPath(path: string) {
  return seoPages.find((page) => page.path === path)
}
export const organizationData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": seoSite.url + "/#organization",
      name: "Refract Labs",
      url: seoSite.url + "/",
      logo: seoSite.url + "/favicon-192.png",
      description: seoSite.description,
      email: "hello@refractlabs.tech",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      sameAs: [
        "https://www.linkedin.com/company/refract-labs",
        "https://github.com/labsrefract",
        "https://x.com/refractlabs",
      ],
    },
    {
      "@type": "WebSite",
      "@id": seoSite.url + "/#website",
      name: "Refract Labs",
      url: seoSite.url + "/",
      publisher: { "@id": seoSite.url + "/#organization" },
      inLanguage: "en",
    },
  ],
}
