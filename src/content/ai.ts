/**
 * Refract AI: agent catalogue and landing-page copy.
 */

export type GlyphKind = "circle" | "bars" | "frame" | "rings" | "tri" | "wave" | "square" | "link" | "dots";

export interface Agent {
  id: string;
  glyph: GlyphKind;
  short: string;
  name: string;
  desc: string;
  tag?: "Beta" | "Soon";
}

export const AI_PATH = "/ai";
export const DEMO_PATH = "/contact?type=ai-agents#call";

/** Processes a visitor can name as their first agent; the choice pre-fills the booking note. */
export const firstProcesses = [
  { id: "invoices", label: "Overdue invoices", note: "chasing overdue invoices" },
  { id: "reconciliation", label: "M-Pesa reconciliation", note: "M-Pesa reconciliation" },
  { id: "kyc", label: "KYC checks", note: "KYC document checks" },
  { id: "support", label: "WhatsApp support", note: "customer support on WhatsApp" },
  { id: "other", label: "Something else", note: "" },
] as const;

export type FirstProcessId = (typeof firstProcesses)[number]["id"];

/** Booking link for the demo call, carrying the chosen process when there is one. */
export const demoPathFor = (process?: FirstProcessId) =>
  process && process !== "other" ? `/contact?type=ai-agents&process=${process}#call` : DEMO_PATH;

/**
 * The note to start a booking with, from the `process` query value. Only known
 * processes are accepted, so the link can't put arbitrary text in the form.
 */
export function processNoteFromQuery(value: string | null) {
  const match = firstProcesses.find((p) => p.id === value);
  return match?.note ? `I’d like to see an agent handle ${match.note}.` : "";
}

export const agentPath = (id: string) => `${AI_PATH}?agent=${id}#try`;

export const agents: Agent[] = [
  {
    id: "support",
    glyph: "circle",
    short: "Support",
    name: "Support agent",
    desc: "Answers customers on WhatsApp, web and email",
  },
  {
    id: "collections",
    glyph: "bars",
    short: "Collections",
    name: "Collections agent",
    desc: "Sends reminders and agrees payment plans",
  },
  {
    id: "onboarding",
    glyph: "frame",
    short: "Onboarding",
    name: "Onboarding agent",
    desc: "Collects and checks KYC documents",
    tag: "Beta",
  },
  {
    id: "reconciliation",
    glyph: "rings",
    short: "Reconciliation",
    name: "Reconciliation agent",
    desc: "Matches payments, bank lines and invoices",
  },
  {
    id: "sales",
    glyph: "tri",
    short: "Sales",
    name: "Sales agent",
    desc: "Qualifies leads and books meetings",
  },
  {
    id: "voice",
    glyph: "wave",
    short: "Voice",
    name: "Voice agent",
    desc: "Handles inbound calls in English and Kiswahili",
    tag: "Soon",
  },
];

/** One step the agent takes in a demo, shown in the activity trace. */
export interface ScenarioStep {
  system: string;
  text: string;
  at: string;
  flag?: boolean;
}

/** A worked example for "See an agent at work", told as a problem the visitor recognises. */
export interface Scenario {
  agent: string;
  problem: string;
  channel: string;
  from: string;
  message: string;
  steps: ScenarioStep[];
  reply: string;
  took: string;
  byHand: string;
  note: string;
}

export const scenarios: Scenario[] = [
  {
    agent: "support",
    problem: "Paid, but the order still shows unpaid",
    channel: "WhatsApp",
    from: "Customer",
    message: "Hi, I paid KES 4,500 by M-Pesa this morning but order #10482 still says unpaid.",
    steps: [
      { system: "WhatsApp", text: "Read the message and found order #10482", at: "0.4s" },
      { system: "M-Pesa", text: "Looked up payment QK7H2… for KES 4,500", at: "1.6s" },
      { system: "ERP", text: "Matched it to order #10482 and marked it paid", at: "3.1s" },
      { system: "Finance", text: "Logged the correction for the finance team", at: "4.2s" },
    ],
    reply: "Thanks for waiting. I found your payment of KES 4,500 and order #10482 is now marked paid. Asante!",
    took: "6s",
    byHand: "about 40 minutes by hand",
    note: "No hand-off · logged for finance",
  },
  {
    agent: "collections",
    problem: "Invoices more than 30 days overdue",
    channel: "Finance inbox",
    from: "Finance team",
    message: "Follow up on every invoice more than 30 days overdue.",
    steps: [
      { system: "ERP", text: "Found 14 invoices more than 30 days overdue", at: "1.2s" },
      { system: "SMS", text: "Sent payment reminders to 11 customers", at: "9.8s" },
      { system: "Policy", text: "Proposed payment plans to 3 larger accounts", at: "21s" },
      { system: "CRM", text: "Flagged 2 disputed invoices for your team", at: "34s", flag: true },
    ],
    reply: "Done. 11 reminders sent, 3 payment plans proposed, and 2 disputes are waiting for you in the CRM.",
    took: "38s",
    byHand: "about a day of calls",
    note: "2 disputes need a person",
  },
  {
    agent: "onboarding",
    problem: "Check a new business account’s documents",
    channel: "Operations queue",
    from: "Operations",
    message: "Check the documents for new business account #A-2207.",
    steps: [
      { system: "Documents", text: "Read the 3 documents the applicant uploaded", at: "2.0s" },
      { system: "KYC", text: "Verified the director’s national ID", at: "6.4s" },
      { system: "KRA", text: "Confirmed the KRA PIN is valid", at: "9.1s" },
      { system: "Registry", text: "Certificate of incorporation has expired", at: "14s", flag: true },
      { system: "Email", text: "Asked the applicant for a current copy", at: "17s" },
    ],
    reply: "ID and KRA PIN check out. The certificate of incorporation has expired, so I asked for a current copy and paused the application.",
    took: "21s",
    byHand: "about 2 hours of checks",
    note: "Paused, not rejected",
  },
  {
    agent: "reconciliation",
    problem: "Yesterday’s till against the bank statement",
    channel: "Finance inbox",
    from: "Finance team",
    message: "Reconcile yesterday’s till and bank statement.",
    steps: [
      { system: "Till", text: "Loaded 318 till entries from yesterday", at: "0.8s" },
      { system: "Bank", text: "Loaded the matching bank statement lines", at: "2.3s" },
      { system: "Ledger", text: "Matched 312 of 318 transactions", at: "8.7s" },
      { system: "Review", text: "4 duplicate till entries and 2 unexplained bank charges", at: "11s", flag: true },
    ],
    reply: "Matched 312 of 318 transactions. 6 need review: 4 duplicate till entries and 2 bank charges with no matching invoice.",
    took: "14s",
    byHand: "half a day by hand",
    note: "6 items for review",
  },
];

export const featuredAgent = {
  title: "Support agent, now on WhatsApp",
  desc: "Answers customers in English and Kiswahili and hands off to your team when a case needs a person.",
};

export const steps = [
  { n: "01", t: "Connect your systems", d: "We link the agent to your payments, CRM and messaging accounts." },
  { n: "02", t: "Set the rules", d: "Choose what it can do alone and what needs a person’s approval." },
  { n: "03", t: "Go live", d: "Start with one channel, review the results, then expand." },
];

/**
 * How it works: requests that travel through the agent's four stages. When a
 * decision needs a person, `flag` marks the Decide stage.
 */
export interface AnatomyRun {
  channel: string;
  message: string;
  read: string;
  decide: string;
  act: string;
  report: string;
  flag?: boolean;
}

export const anatomyRuns: AnatomyRun[] = [
  {
    channel: "SMS",
    message: "Nimetuma malipo, mbona sijapata risiti?",
    read: "Missing receipt for an M-Pesa payment",
    decide: "Resend the receipt · within your rules",
    act: "mpesa.lookup() → receipt.send()",
    report: "Logged in the support inbox",
  },
  {
    channel: "WhatsApp",
    message: "Can I get a refund of KES 12,000 for order #4471?",
    read: "Refund request, KES 12,000",
    decide: "Over the KES 5,000 limit · ask a person",
    act: "Holds the refund for approval",
    report: "Approval request sent to Wanjiku",
    flag: true,
  },
  {
    channel: "Email",
    message: "Please send our statement for March.",
    read: "Statement request from Acme Ltd",
    decide: "Sender verified · within your rules",
    act: "erp.statement(\"March\") → email.send()",
    report: "Sent and logged for finance",
  },
];

/* Platform cards. Each card loops a small scene of an agent at work. */

/** Every channel: messages arrive, the agent thinks, replies and closes them. */
export const inbox = [
  { c: "WhatsApp", m: "Where is my order #10482?", r: "On its way. It arrives today before 2pm.", s: "resolved" },
  { c: "SMS", m: "Nimetuma malipo, mbona sijapata risiti?", r: "Risiti yako imetumwa sasa. Asante!", s: "resolved" },
  { c: "Voice", m: "Balance enquiry, 1m 12s", r: "Read out the balance and last 3 payments.", s: "resolved" },
  { c: "Email", m: "Invoice INV-2291 looks wrong", r: "Sent to finance with the original quote.", s: "escalated" },
  { c: "Web chat", m: "Can I change my delivery address?", r: "Updated to Kilimani. New delivery tomorrow.", s: "resolved" },
];

/** One connection: the call the agent makes to each system, clockwise from the top. */
export const hubCalls = [
  { node: "M-Pesa", call: "mpesa.lookup" },
  { node: "Core bank", call: "bank.balance" },
  { node: "ERP", call: "erp.update" },
  { node: "CRM", call: "crm.note" },
];

/** Privacy: raw records that get masked before they reach a model. */
export const privacyRecords = [
  { name: "Joyce Mbugua", phone: "+254 712 384 412", id: "28417735" },
  { name: "Brian Otieno", phone: "+254 733 902 118", id: "31570264" },
  { name: "Amina Hassan", phone: "+254 701 558 027", id: "27904413" },
];

/** People approve: actions under the limit go through; the rest wait for a person. */
export const approvalLimit = 5000;
export const approvalQueue = [
  { what: "Refund to customer #4402", amount: 1200 },
  { what: "Refund to customer #4417", amount: 800 },
  { what: "Refund to customer #4471", amount: 12000 },
  { what: "Refund to customer #4480", amount: 2500 },
];
export const approver = "Wanjiku";

/** Languages: the customer writes in one language and the agent answers in it. */
export const languages = [
  { c: "SW", name: "Kiswahili", ask: "Nimelipa, mbona oda haijafika?", t: "Nimepata malipo yako. Oda inafika leo!" },
  { c: "EN", name: "English", ask: "I’ve paid, why hasn’t my order arrived?", t: "I’ve found your payment. It arrives today!" },
  { c: "FR", name: "French", ask: "J’ai payé, où est ma commande ?", t: "J’ai trouvé votre paiement. Elle arrive aujourd’hui !" },
];

/** Volume: daily conversations over a month, peaking at month-end. */
export const volumeBars = [22, 30, 26, 38, 34, 48, 44, 58, 52, 40, 36, 46, 62, 74, 88, 96, 70, 54, 42, 34];
export const volumePeak = 15;

/** Audit log: entries the live log cycles through. */
export const auditLog = [
  { actor: "support", action: "read ticket #20931" },
  { actor: "support", action: "mpesa.lookup(\"QK7H2…\")" },
  { actor: "support", action: "order #10482 → ", result: "paid" },
  { actor: "policy", action: "approval skipped (< 5,000)" },
  { actor: "collect", action: "sms.send(0712 ••• 409)" },
  { actor: "collect", action: "plan.propose(INV-2291)" },
  { actor: "policy", action: "approval needed (12,000)" },
  { actor: "recon", action: "matched 312 of 318 → ", result: "6 for review" },
];

/** A job an agent does in an industry, and the systems it works with there. */
export interface IndustryJob {
  text: string;
  agent: string;
  systems: string;
}

export interface Industry {
  id: string;
  title: string;
  line: string;
  jobs: IndustryJob[];
}

export const industries: Industry[] = [
  {
    id: "banks",
    title: "Banks & fintech",
    line: "Data stays in your cloud, and every action is logged for your compliance team.",
    jobs: [
      { text: "KYC document checks", agent: "onboarding", systems: "ID · KRA · Registry" },
      { text: "Loan repayment reminders", agent: "collections", systems: "Core banking · SMS" },
      { text: "Dispute and chargeback triage", agent: "support", systems: "Card switch · CRM" },
    ],
  },
  {
    id: "telcos",
    title: "Telcos",
    line: "Built for high volumes across WhatsApp, SMS and voice, without hiring for the peak.",
    jobs: [
      { text: "Airtime and data support", agent: "support", systems: "WhatsApp · Billing" },
      { text: "Agent-network reconciliation", agent: "reconciliation", systems: "M-Pesa · Ledger" },
      { text: "Churn-risk outreach", agent: "sales", systems: "CRM · SMS" },
    ],
  },
  {
    id: "retail",
    title: "SMEs & retail",
    line: "Works with the till, M-Pesa and WhatsApp you already run.",
    jobs: [
      { text: "WhatsApp order support", agent: "support", systems: "WhatsApp · Orders" },
      { text: "M-Pesa payment matching", agent: "reconciliation", systems: "M-Pesa · Till" },
      { text: "Supplier invoice follow-up", agent: "collections", systems: "Accounting · Email" },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    line: "Guides claims and renewals step by step, with people approving every payout.",
    jobs: [
      { text: "First notice of loss by phone", agent: "voice", systems: "Voice · Claims system" },
      { text: "Claim document checks", agent: "onboarding", systems: "Documents · Claims system" },
      { text: "Premium and renewal reminders", agent: "collections", systems: "Policy admin · SMS" },
    ],
  },
  {
    id: "microfinance",
    title: "Microfinance & SACCOs",
    line: "Answers members in Kiswahili and keeps the loan book current every day.",
    jobs: [
      { text: "Member loan enquiries", agent: "support", systems: "WhatsApp · Core banking" },
      { text: "Repayment plans and reminders", agent: "collections", systems: "M-Pesa · SMS" },
      { text: "Daily M-Pesa reconciliation", agent: "reconciliation", systems: "M-Pesa · Ledger" },
    ],
  },
  {
    id: "logistics",
    title: "Logistics",
    line: "Keeps customers updated on deliveries and drivers’ cash collections matched.",
    jobs: [
      { text: "Delivery status updates", agent: "support", systems: "WhatsApp · Dispatch" },
      { text: "Cash-on-delivery reconciliation", agent: "reconciliation", systems: "M-Pesa · Dispatch" },
      { text: "Quote requests and bookings", agent: "sales", systems: "Web chat · CRM" },
    ],
  },
];

/** FAQ, grouped by topic. `link` points the reader somewhere useful on the page or site. */
export interface Faq {
  q: string;
  a: string;
  link?: { label: string; to: string };
}

export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "The product",
    items: [
      {
        q: "What is a Refract AI agent?",
        a: "Software that handles a defined job, such as answering support tickets or chasing overdue invoices, by reading from and acting in your existing systems within limits you set.",
        link: { label: "See an agent at work", to: `${AI_PATH}#try` },
      },
      {
        q: "How is this different from Refract Software?",
        a: "Refract AI sells ready-made agent products you can switch on. Refract Software builds custom software to your specification. Many clients use both.",
      },
      {
        q: "Do agents work in Kiswahili?",
        a: "Yes. Agents work in English and Kiswahili by default, with French and other languages available.",
      },
      {
        q: "What happens when the agent isn’t sure?",
        a: "It hands the conversation to a person on your team, with the full context, instead of guessing. You decide which topics always go to a person.",
      },
    ],
  },
  {
    title: "Data & control",
    items: [
      {
        q: "Where is our data stored?",
        a: "In your cloud account or in Refract-managed infrastructure, depending on your requirements. Personal data is masked before it reaches a model.",
      },
      {
        q: "Do you comply with Kenya’s Data Protection Act?",
        a: "Yes. We handle personal data in line with the Data Protection Act, 2019. Personal data is masked before it reaches a model, you choose where it is hosted, and every action is logged.",
      },
      {
        q: "What if an agent makes a mistake?",
        a: "Agents only act within the limits you set, and anything above them waits for a person to approve. Every action is logged in plain language, so your team can see what happened and correct it.",
      },
      {
        q: "Can we leave and keep our data?",
        a: "Yes. You can export your data and conversation history. If you leave, we keep it for a period after your contract ends so you can take it with you, then delete it.",
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        q: "Which systems can agents connect to?",
        a: "M-Pesa, WhatsApp Business, SMS gateways, common CRMs and ERPs, and core banking systems. If yours isn’t listed, we build the connector.",
      },
      {
        q: "Do we need our own developers?",
        a: "No. We connect the agent to your systems and set it up with your team. If you have developers, they can work with us on any custom connectors.",
      },
      {
        q: "How long does it take to go live?",
        a: "Most teams run a pilot within a few weeks of the first call. Timelines depend on how many systems the agent needs to reach.",
        link: { label: "Book a demo", to: DEMO_PATH },
      },
    ],
  },
];

export const softwareLinks = [
  {
    glyph: "square" as GlyphKind,
    t: "Custom platforms",
    d: "Web and mobile products designed and built to your specification.",
    to: "/services/software-development",
  },
  {
    glyph: "link" as GlyphKind,
    t: "Integrations & APIs",
    d: "Connect payment rails, core systems and partners reliably.",
    to: "/services/software-development#api-development-integrations",
  },
  {
    glyph: "dots" as GlyphKind,
    t: "Dedicated teams",
    d: "A product team from Nairobi that ships with you long term.",
    to: "/services/support-maintenance#staff-augmentation",
  },
];
