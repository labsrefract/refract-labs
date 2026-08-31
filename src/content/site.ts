/**
 * Site-wide copy and contact details.
 */
export const site = {
  name: "Refract Labs",
  tagline: "Software · Intelligence · Security",
  email: "hello@refractlabs.dev",
  location: "Remote — worldwide",
  logo: "https://res.cloudinary.com/vcrqvhjf/image/upload/f_auto,q_auto/WhatsApp_Image_2026-08-27_at_13.32.12",
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
