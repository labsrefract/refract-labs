const CLOUDINARY = "https://res.cloudinary.com/vcrqvhjf/image/upload";

function teamShot(version: string, publicId: string) {
  return `${CLOUDINARY}/f_auto,q_auto,c_fill,g_face,w_416,h_416/${version}/${publicId}`;
}

export type Founder = {
  name: string;
  role: string;
  bio: string;
  stack: readonly string[];
  initials: string;
  photo?: string;
  linkedin?: string;
  github?: string;
};

export const founders: readonly Founder[] = [
  {
    name: "David Ouma",
    role: "Co-founder & backend engineer",
    bio: "Backend-focused engineer in Nairobi. Designs APIs, authentication, and real-time systems in Node.js, and ships the frontend when the product needs it. Information Technology graduate from JKUAT.",
    stack: ["Node.js", "Express", "PostgreSQL", "MongoDB", "React", "Docker"],
    initials: "DO",
    photo: teamShot("v1788882280", "david.jpg"),
    linkedin: "https://www.linkedin.com/in/oumadavid",
    github: "https://github.com/oumadavid",
  },
  {
    name: "Stephen Githua",
    role: "Co-founder & product engineer",
    bio: "Product-minded frontend engineer. Turns messy briefs into interfaces that hold up in production — React, TypeScript, and the unglamorous work of making software feel finished.",
    stack: ["React", "TypeScript", "React Native", "CSS"],
    initials: "SG",
    photo: teamShot("v1788882291", "steve.jpg"),
    linkedin: "https://www.linkedin.com/in/stephen-githua",
  },
  {
    name: "Hosanna Alex",
    role: "Co-founder & backend engineer",
    bio: "Backend engineer in Nairobi. Builds APIs and databases that hold up under pressure — marketplace platforms, finance trackers, work-management systems. Currently finishing a BSc in Information Technology at JKUAT.",
    stack: ["Python", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "Flask"],
    initials: "HA",
    photo: "https://avatars.githubusercontent.com/u/81245867?v=4",
    linkedin: "https://www.linkedin.com/in/hosanacodes",
    github: "https://github.com/hosanacodes",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

/** Placeholder quotes until real client lines replace them. */
export const testimonials: readonly Testimonial[] = [
  {
    quote: "They built a site we actually send people to. Quotes come in from the form instead of us chasing missed calls.",
    name: "James Otieno",
    role: "Director",
    company: "Highland Glaziers",
  },
  {
    quote: "Three services, one site, and WhatsApp as the close. Customers find what they need without us walking them through it.",
    name: "Mercy Njeri",
    role: "Founder",
    company: "Nairobi Curtains",
  },
  {
    quote: "Bookings used to live in inboxes. Now the calendar is the source of truth — for the front desk and for anyone hiring a room.",
    name: "Paul Mwangi",
    role: "Operations lead",
    company: "Dispute Resolution Hub",
  },
];
