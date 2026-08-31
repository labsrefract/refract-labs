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
    bio: "Backend-focused engineer in Nairobi. Designs APIs, authentication, and real-time systems in Node.js, and ships the frontend when the product needs it. Currently studying Information Technology at JKUAT.",
    stack: ["Node.js", "Express", "PostgreSQL", "MongoDB", "React", "Docker"],
    initials: "DO",
    photo: "/team/david-ouma.jpg",
    linkedin: "https://www.linkedin.com/in/oumadavid",
    github: "https://github.com/oumadavid",
  },
  {
    name: "Stephen Githua",
    role: "Co-founder & product engineer",
    bio: "Product-minded frontend engineer. Turns messy briefs into interfaces that hold up in production — React, TypeScript, and the unglamorous work of making software feel finished.",
    stack: ["React", "TypeScript", "React Native", "CSS"],
    initials: "SG",
    linkedin: "https://www.linkedin.com/in/stephen-githua",
  },
  {
    name: "Hosanna Alex",
    role: "Co-founder & security engineer",
    bio: "Application security and infrastructure. Threat modeling, auth reviews, and the checks that keep a launch from becoming an incident.",
    stack: ["Security", "AWS", "Python", "Go"],
    initials: "HA",
    linkedin: "https://www.linkedin.com/in/hosanna-alex",
  },
];

export const testimonials = [
  {
    quote:
      "They treated the booking platform like a product they would still own. We launched one tenancy model instead of three codebases, and the properties could run it without calling us every week.",
    attribution: "Amara Njoroge, Head of Product — Harborline Hospitality",
  },
  {
    quote:
      "The dispatch screen stopped being a report and became the way we work. Exceptions that used to live in chat now live in the product.",
    attribution: "James Okello, Operations Lead — Northline Logistics",
  },
] as const;
