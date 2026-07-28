// Central site config. Change SITE_URL here when the production domain is confirmed.
// TODO: confirm final production URL with the client before launch.
export const SITE_URL = "https://processmaestro.co";

export const SITE = {
  name: "Process Maestro",
  title: "Process Maestro — Workflow Design & Business Process Automation",
  // Kept ~155 chars so it isn't truncated in search results.
  description:
    "Process Maestro replaces scattered spreadsheets and disconnected apps with clean, scalable systems: workflow design, database architecture, automation & AI.",
  keywords: [
    "workflow design",
    "business process automation",
    "process optimization",
    "no-code development",
    "SmartSuite",
    "Make.com",
    "n8n",
    "database schema design",
    "systems integration",
    "AI automation",
  ],
  founder: "Vasken",
  // Full name for the founder Person JSON-LD (the visible page uses the first
  // name; the LinkedIn sameAs disambiguates the entity).
  founderFullName: "Vasken Bakalian",
  // Plain-text bio for the Person `description` — kept in sync with the visible
  // "Hi, I'm Vasken" bio's opening paragraph in components/home/Founder.tsx.
  founderBio:
    "17 years in tech — developer, team lead, product manager, and founder of a software shop. After deep-diving into every corner of building software, I found my calling in workflow design and process automation.",
  email: "vasken@processmaestro.co",
  phone: "+374 55 023420",
  // Founder's LinkedIn (same profile linked in the footer) — used as `sameAs`
  // for both the organization and the founder Person in JSON-LD.
  linkedin: "https://www.linkedin.com/in/vasken-bakalian/",
  // Logo (used in JSON-LD and as the org image).
  ogImage: "/pm-logo.png",
  // Purpose-built 1200x630 social card (default og:image / twitter:image).
  ogCard: "/og-card.png",
} as const;
