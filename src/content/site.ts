import ogImageAsset from "../assets/og-image.png";
import logoAsset from "../assets/logo.png";

/**
 * Site-wide copy and contact details.
 */

export const site = {
  name: "Refract Labs",
  tagline: "Software · Intelligence · Security",
  email: "hello@refractlabs.tech",
  location: "Nairobi, Kenya",
  url: "https://www.refractlabs.tech",
  logo: logoAsset,
  ogImage: ogImageAsset,
  clientRetention: "96%",
  projectsShipped: "20+",
  expertYears: "20+",
  socials: {
    linkedin: "https://www.linkedin.com/company/refract-labs",
    github: "https://github.com/labsrefract",
    x: "https://x.com/refractlabs",
  },
  /** Top-level links after the Software and AI menus. Process lives in the footer. */
  nav: [
    { label: "Work", to: "/work" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  footerNav: [
    { label: "Work", to: "/work" },
    { label: "Process", to: "/process" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
} as const;
