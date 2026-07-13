// Adapter: maps raw SmartSuite Case Studies records to the CaseCard shape.
// The frontend imports THIS, never the SmartSuite client directly.
import { listRecords } from "@/lib/smartsuite/client";
import type { CaseStudyRecord, SmartSuiteLinkedRecord } from "@/lib/smartsuite/types";
import type { CaseStudy } from "@/content/home";

const CASE_STUDIES_TABLE = "6a464a1dc29d15c9caeec59c";
const FEATURED = "s03f4a8d8f";

// Linked fields come back hydrated as { id, title }[]; guard for bare strings too.
function firstTitle(field: unknown): string | undefined {
  if (!Array.isArray(field) || field.length === 0) return undefined;
  const first = field[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "title" in first) {
    return (first as SmartSuiteLinkedRecord).title;
  }
  return undefined;
}

function allTitles(field: unknown): string[] {
  if (!Array.isArray(field)) return [];
  return field
    .map((v) =>
      typeof v === "string"
        ? v
        : v && typeof v === "object" && "title" in v
          ? (v as SmartSuiteLinkedRecord).title
          : undefined
    )
    .filter((t): t is string => Boolean(t));
}

// Country titles are formatted "{ISO}- {name}" (e.g. "ZA- South Africa").
function stripCountryPrefix(title: string): string {
  return title.replace(/^[A-Z]{2,3}-\s*/, "").trim() || title;
}

/**
 * Fetch up to `limit` FEATURED case studies, mapped to the CaseCard shape.
 * Server-side only. Throws on backend error (the caller falls back to static).
 */
export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudy[]> {
  const body = {
    filter: {
      operator: "and",
      fields: [{ field: FEATURED, comparison: "is", value: true }],
    },
    sort: [{ field: "first_created", direction: "asc" }],
    limit,
    offset: 0,
    hydrated: true,
  };

  const { items } = await listRecords<CaseStudyRecord>(CASE_STUDIES_TABLE, body);

  return items.map((rec): CaseStudy => {
    const handle = Array.isArray(rec.sae9c2cd99) ? rec.sae9c2cd99[0]?.handle : undefined;
    const slug = typeof rec.sf1fb67a8f === "string" ? rec.sf1fb67a8f : "";
    const country = firstTitle(rec.s81a7abc62);
    const results = allTitles(rec.s058517f16);

    const card: CaseStudy = {
      cover: handle ? `/api/ss-file/${handle}` : "",
      category: firstTitle(rec.sf3d75aea0) ?? "",
      title: typeof rec.title === "string" ? rec.title : "",
      summary: typeof rec.s4affd4869 === "string" ? rec.s4affd4869 : "",
      href: slug ? `/${slug}` : "#",
    };
    if (country) card.location = stripCountryPrefix(country);
    if (results.length > 0) card.results = results;
    return card;
  });
}
