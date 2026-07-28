// Structured data (JSON-LD) builders. Every value is derived from site config,
// static content, or live SmartSuite data — nothing hardcoded that duplicates a
// source of truth, and nothing asserted that isn't visible on the page.
//
// Note on reviews: Google does not show star rich-results for reviews an entity
// hosts about itself. These Review/AggregateRating nodes are for entity
// understanding and AI summaries, not for stars in search results.
import { SITE, SITE_URL } from "@/lib/site";
import { expertise } from "@/content/home";
import type { Testimonial } from "@/lib/adapters/testimonials";

// Stable global entity ids so other pages (e.g. the case-study Article) can
// reference the same Organization/Person by @id instead of minting duplicates.
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#founder`;
const LOGO = `${SITE_URL}${SITE.ogImage}`;

function organizationNode() {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE_URL,
    logo: LOGO,
    image: LOGO,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: "Worldwide",
    sameAs: [SITE.linkedin],
    knowsAbout: expertise.map((e) => e.name),
    founder: { "@id": PERSON_ID },
  };
}

function founderNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.founderFullName,
    jobTitle: "Founder & CEO",
    description: SITE.founderBio,
    worksFor: { "@id": ORG_ID },
    sameAs: [SITE.linkedin],
  };
}

/**
 * Homepage graph: the organization + founder, plus a Review per testimonial that
 * is actually shown on the page. aggregateRating is included only because every
 * displayed testimonial shows 5 stars, and reviewCount is the live count — no
 * invented numbers.
 */
export function homepageJsonLd(testimonials: Testimonial[]) {
  const reviews = testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5, worstRating: 1 },
    itemReviewed: { "@id": ORG_ID },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationNode(),
        ...(reviews.length
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: 5,
                bestRating: 5,
                reviewCount: reviews.length,
              },
              review: reviews,
            }
          : {}),
      },
      founderNode(),
    ],
  };
}

/** Case study detail: Home > Case Studies > this case study. */
export function caseBreadcrumbJsonLd(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE_URL}/case-studies` },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${SITE_URL}/case-studies/${slug}`,
      },
    ],
  };
}

/** Services page: one Service per offering, provided by the organization. */
export function servicesJsonLd(offerings: { slug: string; title: string; lead: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": offerings.map((s) => ({
      "@type": "Service",
      name: s.title,
      description: s.lead,
      url: `${SITE_URL}/services#${s.slug}`,
      provider: {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: SITE.name,
        url: SITE_URL,
      },
    })),
  };
}
