// Shared adapter: maps SmartSuite Case Studies records to the CaseCard shape.
// Consumed by BOTH the /case-studies list page and the homepage case section.
// The frontend imports THIS, never the SmartSuite client directly.
import { listRecords, getRecord } from "@/lib/smartsuite/client";
import type { CaseStudyRecord, SmartSuiteLinkedRecord } from "@/lib/smartsuite/types";

const CASE_STUDIES_TABLE = "6a464a1dc29d15c9caeec59c";
const COUNTRY_TABLE = "687e0a45103799a6ba5955e0";
const COUNTRY_NAME_FIELD = "scbd84eea5"; // Country name (NOT `title`, which is "ZA- South Africa")
const FEATURED_FIELD = "s03f4a8d8f";
const STATUS_PUBLISHED = "complete"; // "Ready for Publishing"
const REVALIDATE = 30;

export type CaseStudyCard = {
  slug: string;
  href: string;
  cover: string;
  category: string;
  location: string;
  title: string;
  summary: string;
  results: string[];
};

// Linked fields come back hydrated as { id, title }[]; guard for bare ids too.
function firstLinkId(field: unknown): string | undefined {
  if (!Array.isArray(field) || field.length === 0) return undefined;
  const f = field[0];
  if (typeof f === "string") return f;
  if (f && typeof f === "object" && "id" in f) return (f as SmartSuiteLinkedRecord).id;
  return undefined;
}

function firstTitle(field: unknown): string {
  if (!Array.isArray(field) || field.length === 0) return "";
  const f = field[0];
  if (typeof f === "string") return f;
  if (f && typeof f === "object" && "title" in f) return (f as SmartSuiteLinkedRecord).title ?? "";
  return "";
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

// Resolve Country ids → the plain name field via per-id GET (deduped, parallel).
// SmartSuite rejects filtering the `id` field, so a batch id filter isn't possible.
async function resolveCountryNames(ids: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  await Promise.all(
    [...new Set(ids)].map(async (id) => {
      try {
        const rec = await getRecord<Record<string, unknown>>(COUNTRY_TABLE, id, REVALIDATE);
        const name = rec?.[COUNTRY_NAME_FIELD];
        if (typeof name === "string" && name) map.set(id, name);
      } catch {
        // Unresolved → location falls back to "".
      }
    })
  );
  return map;
}

/**
 * Fetch published case studies mapped to the CaseCard shape.
 * - default: all published (status = complete)
 * - featuredOnly: also Featured = true (homepage subset)
 * Server-side only. Returns [] on any error (callers render an empty/fallback state).
 */
export async function getCaseStudies(
  opts: { featuredOnly?: boolean; limit?: number } = {}
): Promise<CaseStudyCard[]> {
  try {
    const fields: Array<{ field: string; comparison: string; value: unknown }> = [
      { field: "status", comparison: "is", value: STATUS_PUBLISHED },
    ];
    if (opts.featuredOnly) {
      fields.push({ field: FEATURED_FIELD, comparison: "is", value: true });
    }

    const body = {
      filter: { operator: "and", fields },
      sort: [{ field: "autonumber", direction: "asc" }],
      limit: opts.limit ?? 500,
      offset: 0,
      hydrated: true,
    };

    const { items } = await listRecords<CaseStudyRecord>(CASE_STUDIES_TABLE, body, REVALIDATE);

    // Safety net: only published, even if the server filter ever changes.
    const published = items.filter((r) => r.status?.value === STATUS_PUBLISHED);

    const countryIds = published
      .map((r) => firstLinkId(r.s81a7abc62))
      .filter((x): x is string => Boolean(x));
    const countryMap = await resolveCountryNames(countryIds);

    const cards = published.map((rec): CaseStudyCard => {
      const handle = Array.isArray(rec.sae9c2cd99) ? rec.sae9c2cd99[0]?.handle : undefined;
      const slug = typeof rec.sf1fb67a8f === "string" ? rec.sf1fb67a8f : "";
      const countryId = firstLinkId(rec.s81a7abc62);
      return {
        slug,
        href: slug ? `/${slug}` : "#",
        cover: handle ? `/api/ss-file/${handle}` : "",
        category: firstTitle(rec.sf3d75aea0),
        location: (countryId && countryMap.get(countryId)) || "",
        title: typeof rec.title === "string" ? rec.title : "",
        summary: typeof rec.s48d6c3d8d === "string" ? rec.s48d6c3d8d : "",
        results: allTitles(rec.s058517f16).slice(0, 2),
      };
    });

    return opts.limit ? cards.slice(0, opts.limit) : cards;
  } catch (err) {
    console.error("[case-studies] SmartSuite fetch failed:", err);
    return [];
  }
}
