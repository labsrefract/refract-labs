/**
 * Site-wide copy and contact details.
 */
const CLOUDINARY = "https://res.cloudinary.com/vcrqvhjf/image/upload";
const LOGO_ID = "WhatsApp_Image_2026-08-27_at_13.32.12";

export const site = {
  name: "Refract Labs",
  tagline: "Software · Intelligence · Security",
  email: "hello@refractlabs.tech",
  location: "Nairobi, Kenya",
  url: "https://refractlabs.tech",
  logo: `${CLOUDINARY}/f_auto,q_auto/${LOGO_ID}`,
  ogImage: `${CLOUDINARY}/c_fill,g_auto,w_1200,h_630,f_auto,q_auto/${LOGO_ID}`,
  clientRetention: "96%",
  projectsShipped: "20+",
  expertYears: "20+",
  socials: {
    linkedin: "https://www.linkedin.com/company/refract-labs",
    github: "https://github.com/labsrefract",
    x: "https://x.com/refractlabs",
  },
  nav: [
    { label: "Services", to: "/services" },
    { label: "Work", to: "/work" },
    { label: "Process", to: "/process" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
} as const;
