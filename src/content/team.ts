import stevePhoto from "../assets/team/steve.jpg";

const CLOUDINARY = "https://res.cloudinary.com/vcrqvhjf/image/upload";

function teamShot(version: string, publicId: string) {
  return `${CLOUDINARY}/f_auto,q_auto,c_fill,g_face,w_416,h_416/${version}/${publicId}`;
}

export type Founder = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
  linkedin?: string;
  github?: string;
};

export const founders: readonly Founder[] = [
  {
    name: "Stephen Githua",
    role: "Co-founder & Business Lead",
    bio: "Leads how the studio takes work on. Turns a messy brief into a scoped engagement — what to build, what to skip, and what a first version actually has to do.",
    initials: "SG",
    photo: stevePhoto,
    linkedin: "https://www.linkedin.com/in/stephen-githua",
  },
  {
    name: "David Ouma",
    role: "Co-founder & Lead Developer",
    bio: "Leads how the studio builds. Architecture, APIs, and the codebase you keep after launch — then the frontend when the product needs it. Information Technology graduate from JKUAT, based in Nairobi.",
    initials: "DO",
    photo: teamShot("v1788882280", "david.jpg"),
    linkedin: "https://www.linkedin.com/in/oumadavid",
    github: "https://github.com/oumadavid",
  },
  {
    name: "Hosanna Alex",
    role: "Co-founder & Customer Success",
    bio: "Leads what happens after we start. The named person on the work: updates, questions, and keeping production from becoming an open tab.",
    initials: "HA",
    linkedin: "https://www.linkedin.com/in/hosanacodes",
    github: "https://github.com/hosanacodes",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: 1 | 2 | 3 | 4 | 5;
  workSlug?: string;
};

/** Placeholder quotes until real client lines replace them. */
export const testimonials: readonly Testimonial[] = [
  {
    quote: "They built a site we actually send people to. Quotes come in from the form instead of us chasing missed calls.",
    name: "James Otieno",
    role: "Director",
    company: "Highland Glaziers",
    rating: 4,
    workSlug: "highland-glaziers",
  },
  {
    quote: "Three services, one site, and WhatsApp as the close. Customers find what they need without us walking them through it.",
    name: "Mercy Njeri",
    role: "Founder",
    company: "Nairobi Curtains",
    rating: 5,
    workSlug: "nairobi-curtains",
  },
  {
    quote: "Bookings used to live in inboxes. Now the calendar is the source of truth — for the front desk and for anyone hiring a room.",
    name: "Paul Mwangi",
    role: "Operations lead",
    company: "Dispute Resolution Hub",
    rating: 3,
    workSlug: "dispute-resolution-hub",
  },
];
