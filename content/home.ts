// ============================================================
// Static homepage content.
// This is the seam where SmartSuite (or another backend) plugs in
// later — keep these shapes clean and typed. Sections import from here.
// ============================================================

export type Expertise = {
  icon: string;
  name: string;
  desc: string;
};

export type CaseStudy = {
  cover: string;
  category: string;
  location?: string;
  href: string;
  title: string;
  summary: string;
  results?: string[];
};

export type Industry = {
  icon: string;
  name: string;
  desc: string;
};

export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
};

export const expertise: Expertise[] = [
  {
    icon: "🗺️",
    name: "Process Mapping",
    desc: "Before touching any tech, we dive deep into understanding your operations. Through focused sessions, we extract the actual way your business runs, not the ideal version, but the reality. Then we map it all out (usually using BPMN) and walk you through it. This brings clarity, exposes bottlenecks, and becomes the blueprint for anything we build later. It's not a formality! It's how we set the foundation right.",
  },
  {
    icon: "🗄️",
    name: "Database Schema Design",
    desc: "Database design isn't just important, it's everything. A poorly structured database slows down growth, kills reporting, and causes chaos down the line. We've been designing relational databases since 2011, long before the no-code era. Our schema designs are flexible, clean, and built for long-term scale. Easy to extract any data or KPI. We start every project with an ER diagram, because it's the backbone of everything that follows.",
  },
  {
    icon: "⚡",
    name: "Automations & Integrations",
    desc: "If your tools aren't talking to each other, you're wasting time. We specialize in building automated systems that handle repetitive tasks and move data where it needs to go. From Make.com to n8n.io, from custom APIs to AI triggers, we've done it all. Whether it's syncing CRMs, managing workflows, or creating logic-heavy automations, we bring deep experience and a high standard of reliability.",
  },
  {
    icon: "🤖",
    name: "Artificial Intelligence",
    desc: "It's 2025. If you're not leveraging AI, you're behind. We build smart workflows and agents that don't just reply, they think, extract, and act. We blend AI into your systems using tools like Make.com and n8n, creating real automation with real intelligence. From chatbots, virtual assistants, auto-report generation, and AI-based approval workflows, to document analyzers that scan long files and pull the exact info needed. What used to take hours is now done in seconds.",
  },
  {
    icon: "🖥️",
    name: "Front-end Portals",
    desc: "We use front-end builders like Softr, WeWeb, and others to deliver full-stack solutions with a clean interface and great user experience. Whether it's a client portal, internal tool, or dashboard, we design it to be intuitive, responsive, and actually pleasant to use. No clunky screens. Just clear, functional design that makes your workflows accessible.",
  },
];

export const homeCases: CaseStudy[] = [
  {
    cover: "/case-wealth.png",
    category: "Wealth Management",
    location: "South Africa",
    href: "#",
    title: "Wealth Management System for a South African Firm",
    summary:
      "A complete investment-management platform with messaging, automated client onboarding, and financial tracking.",
    results: [
      "Centralized client and investment data management",
      "Automated task creation reducing manual oversight",
    ],
  },
  {
    cover: "/case-facebook.png",
    category: "Digital Marketing",
    location: "Poland",
    href: "#",
    title: "Automating Facebook Campaign Creation with AI & the Meta API",
    summary:
      "A launch-to-live pipeline that turns briefs into fully built ad campaigns, cutting manual setup time dramatically.",
    results: [
      "Campaign launch time cut from 2 hours to under 2 minutes",
      "Eliminated manual Meta logins and copy/paste workflows",
    ],
  },
  {
    cover: "/case-research.png",
    category: "Research",
    location: "United Kingdom",
    href: "#",
    title: "Automating Task Management for Acuity Research",
    summary:
      "A managed task-and-survey workflow that keeps a multi-stage research operation coordinated and on schedule.",
    results: [
      "Task creation reduced from hours to seconds",
      "Account managers save 25–30% of their time monthly",
    ],
  },
];

export const industries: Industry[] = [
  {
    icon: "🛡️",
    name: "Governance, Risk & Compliance",
    desc: "Structured controls and audit-ready workflows that keep governance, risk, and regulatory compliance on track.",
  },
  {
    icon: "📈",
    name: "VC Firms & Fund Management",
    desc: "Deal-flow tracking, LP reporting, and portfolio operations streamlined into one connected system.",
  },
  {
    icon: "🚚",
    name: "Supply Chain & Procurement",
    desc: "Automated purchasing, vendor management, and inventory processes that cut delays and maintain quality.",
  },
  {
    icon: "✈️",
    name: "Travel & Tourism",
    desc: "Bookings, itineraries, and client communication automated so every trip runs smoothly end-to-end.",
  },
  {
    icon: "📣",
    name: "Digital Marketing",
    desc: "Campaign creation, reporting, and client onboarding automated to free your team from repetitive setup.",
  },
  {
    icon: "👥",
    name: "HR & Recruitment",
    desc: "Applicant tracking, onboarding, and people ops handled with less admin and a better candidate experience.",
  },
  {
    icon: "🏗️",
    name: "Construction Management",
    desc: "Project scheduling, subcontractor coordination, and document control kept organized on every job site.",
  },
  {
    icon: "📋",
    name: "Project Management",
    desc: "Tasks, timelines, and team coordination centralized so nothing slips through the cracks.",
  },
  {
    icon: "🏠",
    name: "Property Management",
    desc: "Tenant requests, maintenance, and leasing workflows automated for smoother day-to-day operations.",
  },
];

export const tools: string[] = [
  "SmartSuite",
  "Make",
  "Airtable",
  "Zapier",
  "n8n",
  "Notion",
  "Google Workspace",
  "Slack",
  "OpenAI",
  "BPMN",
];

export const painPoints: string[] = [
  "Your organization relies on dozens of Excel sheets, and your data is scattered everywhere.",
  "You use a messy tangle of disconnected apps that don't talk to each other.",
  "You've been told a custom app (traditional development) will cost you dearly.",
  "You built a custom app back in the late 90s or early 2000s — and now it's hard to change, expensive to maintain, and no one knows how it works.",
  "You're starting from scratch and want systems that scale, without being paralyzed by too many options.",
];

export const testimonials: Testimonial[] = [
  {
    initials: "AL",
    name: "Adam Lahbar",
    role: "CEO & Founder, Digital Sandwich Agency",
    quote:
      "Highly recommend Vasken for his exceptional skills and expertise in no-code development. He has built several solutions for us in SmartSuite, and each project has exceeded our expectations.",
  },
  {
    initials: "US",
    name: "Udi Strykowski",
    role: "CFO, IsraBridge",
    quote:
      "I've had the pleasure of working with Vasken as he implemented a complex workflow for our platform on SmartSuite — an implementation that continues to power our operations effectively today.",
  },
  {
    initials: "RU",
    name: "Ruben Uzan",
    role: "Consultant, Profitable Connection",
    quote:
      "His capacity to understand complex problems and solve them in a matter of minutes is nothing short of impressive. More than that, he knows how to explain what he did.",
  },
];
