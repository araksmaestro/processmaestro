// ============================================================
// Static Services content.
// One record per service drives everything: the nav dropdown, the
// mobile nav group, the tab bar, and the panel template. Add a
// service here and it appears in all four places.
// Same seam as content/home.ts — swap for a backend later.
// ============================================================

export type ServiceSlug =
  | "hourly-consulting"
  | "fractional-services"
  | "custom-development";

export type ServiceCta = {
  label: string;
  href: string;
};

export type Service = {
  slug: ServiceSlug;
  /** Nav dropdown, mobile nav, and tab-bar label. */
  label: string;
  title: string;
  lead: string;
  prompt: string;
  heroCta: ServiceCta;
  image: { src: string; alt: string };
  heading: string;
  paragraphs: [string, string];
  benefitTitle: string;
  benefits: string[];
  closing: string;
  bottomCta: ServiceCta;
};

/** Shown when the URL hash is absent or unrecognized. */
export const DEFAULT_SERVICE: ServiceSlug = "custom-development";

const CONSULT_HREF = "/#consult";

export const services: Service[] = [
  {
    slug: "hourly-consulting",
    label: "Hourly Consulting",
    title: "Hourly Consulting",
    lead: "Our team works to understand your unique process so that we can help you create a solution that is unique to how you operate.",
    prompt: "Start with our application below!",
    heroCta: { label: "Book a Consultancy", href: CONSULT_HREF },
    image: { src: "/svc-hourly.png", alt: "Hourly consulting" },
    heading: "Schedule an hour with an expert",
    paragraphs: [
      "Perhaps you have a broken automation, or a tricky formula that you can't quite figure out? In these cases, you just need to meet with an expert who can help you get “unstuck” — this is where our team of hourly consultants comes into play!",
      "Schedule an hour with an expert and pay for that time all using the calendar below. At the scheduled time, your assigned consultant will attend your private online session and you can troubleshoot together. We encourage you to record each session so that you can retain it for your records and review it in the future should you need it. Our team is trained in Airtable, SmartSuite, Softr, Zapier, Make, and Fillout. If you need some expert help to overcome your current hurdles, this is the option for you.",
    ],
    benefitTitle: "Benefits of Hourly Consulting",
    benefits: [
      "Get immediate expert help for your specific challenges",
      "No long-term commitment — just book the hours you need",
      "Record sessions for future reference",
      "Access to specialists in various platforms and technologies",
      "Cost-effective solution for small-scale problems",
    ],
    closing:
      "Book a block of time whenever you need it and get unstuck fast — no long-term commitment required.",
    bottomCta: { label: "Book a Consultancy", href: CONSULT_HREF },
  },
  {
    slug: "fractional-services",
    label: "Fractional Services",
    title: "Fractional Services",
    lead: "Access expert operational technology talent without the overhead of a full-time hire. Our fractional experts integrate with your team to create lasting value.",
    prompt: "Scale your capabilities as needed!",
    heroCta: { label: "Explore Fractional Services", href: CONSULT_HREF },
    image: { src: "/svc-fractional.png", alt: "Fractional services" },
    heading: "Flexible Expertise When You Need It",
    paragraphs: [
      "Our fractional services provide dedicated expertise without the commitment of a full-time hire. We offer skilled professionals who work with your team on a part-time, ongoing basis to implement, maintain, and optimize your operational systems.",
      "Whether you need a fractional CTO, database administrator, automation specialist, or no-code developer, our team integrates seamlessly with yours. We provide strategic guidance, hands-on implementation, and knowledge transfer to your existing staff.",
    ],
    benefitTitle: "Fractional Roles We Provide",
    benefits: [
      "Fractional CTO/CIO for technology strategy and oversight",
      "Database architects and administrators",
      "Automation specialists for workflow optimization",
      "No-code/low-code platform experts",
      "AI implementation consultants",
      "Data analysts and business intelligence specialists",
    ],
    closing:
      "Our fractional team members typically work 10–20 hours per week on your projects, providing consistent progress without the overhead of a full-time employee. This model is perfect for growing businesses that need expert guidance but aren't ready for a permanent hire.",
    bottomCta: { label: "Explore Fractional Services", href: CONSULT_HREF },
  },
  {
    slug: "custom-development",
    label: "Custom Development",
    title: "Custom Development",
    lead: "Tailored software solutions built specifically for your business needs. From workflow automation to custom portals, we create the exact tools you need to excel.",
    prompt: "Start your custom project today!",
    heroCta: { label: "Request Custom Solution", href: CONSULT_HREF },
    image: { src: "/svc-custom.png", alt: "Custom development" },
    heading: "Bespoke Solutions for Your Business",
    paragraphs: [
      "When off-the-shelf software doesn't quite fit your unique requirements, our custom development services provide tailored solutions built specifically for your business needs. We specialize in creating custom applications, integrations, and workflows that align perfectly with your processes.",
      "Our development approach begins with thorough process mapping and database design to ensure the foundation is solid. We then create systems that automate your workflows, connect your data, and provide intuitive interfaces for your team and customers.",
    ],
    benefitTitle: "Our Custom Development Services",
    benefits: [
      "Custom workflow automation systems",
      "Client and internal portals",
      "Database design and implementation",
      "API development and integrations",
      "AI-enhanced applications",
      "Mobile-responsive web applications",
      "Business intelligence dashboards",
    ],
    closing:
      "We build using modern technologies and platforms, focusing on maintainable, scalable solutions. Our process includes regular check-ins, thorough testing, and comprehensive documentation — and once your solution is live, we provide training and ongoing support to ensure its success.",
    bottomCta: { label: "Start Your Custom Project", href: CONSULT_HREF },
  },
];

/**
 * Nav-shaped view of the same records. The nav imports this instead of the
 * full panel copy so it never depends on the Services page.
 */
export const serviceNavItems = services.map(({ slug, label }) => ({
  slug,
  label,
  href: `/services#${slug}`,
}));

export function isServiceSlug(value: string): value is ServiceSlug {
  return services.some((service) => service.slug === value);
}

/** Maps a raw `location.hash` to a service, falling back to the default. */
export function resolveServiceSlug(hash: string): ServiceSlug {
  const key = hash.replace(/^#/, "");
  return isServiceSlug(key) ? key : DEFAULT_SERVICE;
}
