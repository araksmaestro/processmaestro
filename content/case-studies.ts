// Static content for the Case Studies list page (v1 — no SmartSuite).
// Mirrors how the homepage uses content/home.ts. A later prompt can swap this
// for a SmartSuite adapter (cover ← file field, url ← /case-studies/{Slug}, etc.).

export type CaseMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
};

// Detail-page-only fields. A record with `detail` set is rendered by the
// /case-studies/[slug] template; records without it are card-only for now.
export type CaseStudyDetail = {
  subhead: string;
  client: string;
  duration: string;
  heroStat?: { value: string; label: string };
  media: CaseMedia[];
  aboutClient: string;
  challenge: string;
  solution: { tool: string; desc: string }[];
  resultCards: { text: string }[];
  tools: { icon: string; name: string }[];
  testimonial: { quote: string; author: string; org: string; rating?: number };
};

export type CaseStudy = {
  slug: string; // stable id / detail route param (bare, no "case-studies/" prefix)
  url?: string; // explicit card link override; falls back to '#' in v1
  cover: string; // '/case-studies/case-*.png'
  category: string;
  location: string;
  title: string;
  summary: string;
  results: string[];
  detail?: CaseStudyDetail; // present → has a detail page
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "wealth-management-south-africa",
    cover: "/case-studies/case-wealth.png",
    category: "Financial Services",
    location: "South Africa",
    title: "Complete Wealth Management System for a South African Firm",
    summary:
      "A South African wealth management firm managing complex investment portfolios for individuals, companies, households, and trusts needed one connected system to replace scattered tools.",
    results: [
      "Centralized client and investment data management",
      "Automated task creation reducing manual oversight",
    ],
  },
  {
    slug: "facebook-automation",
    url: "/case-studies/facebook-automation",
    cover: "/case-studies/case-facebook.png",
    category: "Digital Marketing",
    location: "Poland",
    title: "Automating Facebook Campaign Creation with AI & Meta API",
    summary:
      "A digital-first marketing team running frequent Facebook ad campaigns for multiple clients needed a scalable way to launch campaigns without hours of manual setup.",
    results: [
      "Campaign launch time reduced from 2 hours to under 2 minutes",
      "Eliminated manual Meta logins and copy/paste workflows",
    ],
    detail: {
      subhead: "Scalable Ads, Zero Manual Work — A Fully Automated FB Ads Engine",
      client: "Digital Marketing Agency",
      duration: "3 months",
      heroStat: { value: "2 hrs → 2 min", label: "to launch a campaign, fully automated" },
      media: [
        {
          type: "image",
          src: "/case-studies/case-facebook-hero.png",
          alt: "Automating Facebook Campaign Creation",
        },
      ],
      aboutClient:
        "A digital-first marketing team running frequent Facebook ad campaigns for multiple clients. They needed a scalable way to launch campaigns without manually jumping between spreadsheets, ad copy drafts, and Meta Business Manager.",
      challenge:
        "Before automation, launching each campaign required copying data from Google Sheets, manually drafting ad copy, and logging into Meta to set up audiences and targeting. The team wanted to move fast, but bottlenecks and manual steps made campaign setup time-consuming and error-prone.",
      solution: [
        { tool: "Google Sheets", desc: "Campaign data auto-synced in real time" },
        { tool: "ChatGPT", desc: "AI generates high-converting headlines & ad copy" },
        { tool: "Validation Layer", desc: "Built-in checks catch errors before launch" },
        {
          tool: "Meta API",
          desc: "5 automated calls handle campaign creation, audience setup, ad deployment, and publishing",
        },
        { tool: "Cloud Storage", desc: "All creative assets are uploaded and managed automatically" },
      ],
      resultCards: [
        { text: "Campaign launch time reduced from 2 hours to under 2 minutes" },
        { text: "Launch ten campaigns as easily as one" },
        { text: "Eliminated manual Meta logins and copy/paste workflows" },
        { text: "Near real-time deployment across multiple accounts" },
      ],
      tools: [
        { icon: "📊", name: "Google Sheets" },
        { icon: "◆", name: "Meta API" },
        { icon: "☁️", name: "ChatGPT (OpenAI)" },
        { icon: "⚙️", name: "Make (for automation logic)" },
        { icon: "🗂️", name: "Google Drive" },
        { icon: "✅", name: "Validation Layer" },
      ],
      testimonial: {
        quote:
          "This setup lets us move fast. It's like having a full-time ad ops team working behind the scenes — automatically.",
        author: "Marketing Team Lead",
        org: "Digital Marketing Agency",
        rating: 5,
      },
    },
  },
  {
    slug: "acuity-research-task-management",
    cover: "/case-studies/case-research.png",
    category: "Market Research",
    location: "United Kingdom",
    title: "Automating Task Management for Acuity Research",
    summary:
      "Acuity Research is a UK-based agency specializing in data-driven market research. Their projects involve managing complex, multi-stage tasks across many contracts.",
    results: [
      "Task creation reduced from hours per contract to seconds",
      "Account managers save 25–30% of their time monthly",
    ],
  },
  {
    slug: "foodz-x-supply-chain",
    cover: "/case-studies/case-supply.png",
    category: "Supply Chain",
    location: "Netherlands",
    title: "Automating Supply Chain & Procurement for Foodz-X",
    summary:
      "Foodz-X, a fast-growing food distribution business, was drowning in manual purchase orders and supplier follow-ups spread across disconnected spreadsheets and inboxes.",
    results: [
      "Purchase orders generated automatically from stock levels",
      "Supplier follow-ups cut from days to minutes",
    ],
  },
  {
    slug: "feedback-automation",
    cover: "/case-studies/case-feedback.png",
    category: "People Ops",
    location: "Remote",
    title: "Optimizing Feedback Automation for a Fast-Growing Organization",
    summary:
      "A rapidly scaling company needed to collect, route, and act on employee and customer feedback without a growing administrative burden on the team.",
    results: [
      "Feedback triaged and routed automatically with AI",
      "Response time on critical feedback cut by 80%",
    ],
  },
  {
    slug: "property-client-portal",
    cover: "/case-studies/case-portal.png",
    category: "Real Estate",
    location: "UAE",
    title: "Client Portal for a Property Management Firm",
    summary:
      "A property management company needed a single portal for tenants, owners, and staff to replace scattered spreadsheets and endless email threads.",
    results: [
      "One portal for tenants, owners, and maintenance requests",
      "Manual status updates eliminated end-to-end",
    ],
  },
];
