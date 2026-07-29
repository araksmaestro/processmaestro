import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getCaseStudySlugs } from "@/lib/adapters/case-studies";

// Keep the sitemap fresh as case studies are published/unpublished in SmartSuite.
// 5 min: shares the published-records fetch cache with the case pages.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Indexable routes only. /thanks is intentionally excluded (noindex).
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/how-we-work`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Individual case-study pages — the content-rich, keyword-rich URLs. If the
  // SmartSuite fetch fails (e.g. offline build), fall back to the static routes.
  const slugs = await getCaseStudySlugs();
  const caseRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/case-studies/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseRoutes];
}
