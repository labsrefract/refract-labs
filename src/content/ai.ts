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
  prompt?: string;
  reply?: string;
}

export const AI_PATH = "/ai";
export const DEMO_PATH = "/contact?type=ai-agents#call";
export const agentPath = (id: string) => `${AI_PATH}?agent=${id}#try`;

export const agents: Agent[] = [
  {
    id: "support",
    glyph: "circle",
    short: "Support",
    name: "Support agent",
    desc: "Answers customers on WhatsApp, web and email",
    prompt: "A customer says their M-Pesa payment went through but the order still shows unpaid.",
    reply:
      "Matched payment QK7H2… (KES 4,500) to order #10482, marked it paid, and confirmed with the customer on WhatsApp. Logged for finance.",
  },
  {
    id: "collections",
    glyph: "bars",
    short: "Collections",
    name: "Collections agent",
    desc: "Sends reminders and agrees payment plans",
    prompt: "Follow up on invoices more than 30 days overdue.",
    reply:
      "Found 14 overdue invoices. Sent reminders to 11, proposed payment plans to 3 larger accounts, and flagged 2 disputes for your team.",
  },
  {
    id: "onboarding",
    glyph: "frame",
    short: "Onboarding",
    name: "Onboarding agent",
    desc: "Collects and checks KYC documents",
    tag: "Beta",
    prompt: "Check the documents for new business account #A-2207.",
    reply:
      "ID and KRA PIN are valid. The certificate of incorporation has expired, so I asked the applicant for a current copy and paused the application.",
  },
  {
    id: "reconciliation",
    glyph: "rings",
    short: "Reconciliation",
    name: "Reconciliation agent",
    desc: "Matches payments, bank lines and invoices",
    prompt: "Reconcile yesterday’s till and bank statement.",
    reply: "Matched 312 of 318 transactions. 6 need review: 4 duplicate till entries and 2 bank charges with no matching invoice.",
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

export const demoAgents = agents.filter((a) => a.prompt && a.reply);

export const featuredAgent = {
  title: "Support agent, now on WhatsApp",
  desc: "Answers customers in English and Kiswahili and hands off to your team when a case needs a person.",
};

export const steps = [
  { n: "01", t: "Connect your systems", d: "We link the agent to your payments, CRM and messaging accounts." },
  { n: "02", t: "Set the rules", d: "Choose what it can do alone and what needs a person’s approval." },
  { n: "03", t: "Go live", d: "Start with one channel, review the results, then expand." },
];

export const tasks = ["Ticket triage", "Payment reminders", "KYC checks", "Statement matching", "Lead qualification", "Call summaries"];
export const systems = ["M-Pesa", "WhatsApp", "SMS", "Core banking", "CRM", "ERP", "Email"];

export const channels = [
  { c: "WhatsApp", m: "“Where is my order #10482?”", s: "resolved" },
  { c: "SMS", m: "Payment reminder sent to 0712 ••• 409", s: "delivered" },
  { c: "Voice", m: "Balance enquiry, 1m 12s", s: "resolved" },
  { c: "Email", m: "Invoice INV-2291 dispute received", s: "escalated" },
  { c: "Web chat", m: "“Can I change my delivery address?”", s: "resolved" },
];

export const languages = [
  { c: "SW", t: "Nimepata malipo yako. Asante!" },
  { c: "EN", t: "I’ve found your payment. Thank you!" },
  { c: "FR", t: "J’ai trouvé votre paiement. Merci !" },
];

export const volumeBars = [22, 30, 26, 38, 34, 48, 44, 58, 52, 40, 36, 46, 62, 74, 88, 96, 70, 54, 42, 34];
export const volumePeak = 15;

export const auditLog = [
  { time: "09:41:02", actor: "support", action: "read ticket #20931" },
  { time: "09:41:03", actor: "support", action: "mpesa.lookup(\"QK7H2…\")" },
  { time: "09:41:04", actor: "support", action: "order #10482 → ", result: "paid" },
  { time: "09:41:04", actor: "policy", action: "approval skipped (< 5,000)" },
];

export const useCases = [
  {
    n: "01",
    title: "Banks & fintech",
    img: "image · banking / app",
    items: ["KYC document checks", "Loan repayment reminders", "Dispute and chargeback triage"],
  },
  {
    n: "02",
    title: "Telcos",
    img: "image · network / retail shop",
    items: ["Airtime and data support", "Agent-network reconciliation", "Churn-risk outreach"],
  },
  {
    n: "03",
    title: "SMEs & retail",
    img: "image · shopfront / warehouse",
    items: ["WhatsApp order support", "M-Pesa payment matching", "Supplier invoice follow-up"],
  },
];

export const faqs = [
  {
    q: "What is a Refract AI agent?",
    a: "Software that handles a defined job, such as answering support tickets or chasing overdue invoices, by reading from and acting in your existing systems within limits you set.",
  },
  {
    q: "How is this different from Refract Software?",
    a: "Refract AI sells ready-made agent products you can switch on. Refract Software builds custom software to your specification. Many clients use both.",
  },
  {
    q: "Which systems can agents connect to?",
    a: "M-Pesa, WhatsApp Business, SMS gateways, common CRMs and ERPs, and core banking systems. If yours isn’t listed, we build the connector.",
  },
  {
    q: "Where is our data stored?",
    a: "In your cloud account or in Refract-managed infrastructure, depending on your requirements. Personal data is masked before it reaches a model.",
  },
  {
    q: "How long does it take to go live?",
    a: "Most teams run a pilot within a few weeks of the first call. Timelines depend on how many systems the agent needs to reach.",
  },
  {
    q: "Do agents work in Kiswahili?",
    a: "Yes. Agents work in English and Kiswahili by default, with French and other languages available.",
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
