export type CaseStudy = {
  slug: string;
  name: string;
  sector: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  stack: string[];
  url?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "highland-glaziers",
    name: "Highland Glaziers",
    sector: "Construction",
    summary: "A site for a Kisumu aluminium contractor — services, a project gallery, and a quote path that actually gets used.",
    challenge:
      "Highland Glaziers had the work (windows, doors, curtain walls, facades) but no place online that could show completed jobs or take a quote without a phone call.",
    approach:
      "We built a React site around the sales path: services, a filterable project gallery, a quote form, and WhatsApp as the fastest close. Analytics went in so they can see which pages earn enquiries.",
    result:
      "Visitors can browse the work and send a quote from highlandglaziers.app instead of waiting on a brochure or a call.",
    stack: ["React", "Vite"],
    url: "https://highlandglaziers.app",
  },
  {
    slug: "nairobi-curtains",
    name: "Nairobi Curtains",
    sector: "Home & interiors",
    summary: "Curtain sales, installation, and laundry on one site — collections, enquiries, and WhatsApp as the close.",
    challenge:
      "The business runs three related services across several cities. They needed one site that could explain the work, show collections, and take an enquiry without listing prices that go stale.",
    approach:
      "We structured the site around those three lines: collection browsing, a contact form, and WhatsApp as the fastest path. Copy and IA stay with the trade, not a generic shop template.",
    result:
      "A public site that can take an enquiry for a new set of curtains, a fitting, or a pickup — and route it to the team the same day.",
    stack: ["React", "Vite"],
    url: "https://nairobi-curtains.vercel.app",
  },
  {
    slug: "dispute-resolution-hub",
    name: "Dispute Resolution Hub",
    sector: "Legal services",
    summary: "A booking product for offices and meeting rooms, with an admin side to run the calendar.",
    challenge:
      "The Hub lets people hire private offices, boardrooms, and meeting space in Kilimani. Bookings were landing on the phone and in inboxes; staff had no single place to see what was reserved.",
    approach:
      "We built a public booking flow for the spaces, and an admin so the team could confirm, update, and manage those bookings without a spreadsheet.",
    result:
      "Visitors can reserve a room from the site. Staff manage the calendar from the back office instead of reconstructing it from messages.",
    stack: ["React", "Node.js"],
  },
  {
    slug: "lexah-holdings",
    name: "Lexah Holdings",
    sector: "Manufacturing",
    summary: "A company site for interlocking pavers and composites made from recovered plastic — products, process, and a quote path.",
    challenge:
      "Lexah needed a public face that could explain a materials story (waste plastic into construction units) and collect project enquiries from developers and homeowners.",
    approach:
      "We designed a straightforward marketing site: product specs, the manufacturing process, and a quote form, on their own domain.",
    result:
      "lexahholdings.co.ke is the place a specifier can read the materials story and request a quote.",
    stack: ["PHP", "JavaScript"],
    url: "https://lexahholdings.co.ke",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}
