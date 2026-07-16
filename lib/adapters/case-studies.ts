// Shared adapter: maps SmartSuite Case Studies records to the shapes the UI needs.
// Consumed by the /case-studies list, the homepage case section, and the
// /case-studies/[slug] detail page. The frontend imports THIS, never the client.
import { listRecords, getRecord } from "@/lib/smartsuite/client";
import type { CaseStudyRecord, SmartSuiteLinkedRecord, SmartSuiteFile } from "@/lib/smartsuite/types";
import type { CaseMedia } from "@/content/case-studies";

const CASE_STUDIES_TABLE = "6a464a1dc29d15c9caeec59c";
const COUNTRY_TABLE = "687e0a45103799a6ba5955e0";
const COUNTRY_NAME_FIELD = "scbd84eea5"; // Country name (NOT `title`, which is "ZA- South Africa")
const FEATURED_FIELD = "s03f4a8d8f";
const STATUS_PUBLISHED = "complete";
const REVALIDATE = 30;
// SmartSuite Tools table has no icon field yet — default until one is added.
const DEFAULT_TOOL_ICON = "🛠️";

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

export type CaseStudyFull = {
  slug: string;
  href: string;
  title: string;
  category: string;
  location: string;
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

// ---- small field helpers ----
const str = (v: unknown): string => (typeof v === "string" ? v : "");

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

// Slugs may be stored bare ("wealth-…") or with the legacy "case-studies/" prefix
// (or a stray leading slash). Normalize to the bare route param.
function normalizeSlug(raw: unknown): string {
  return str(raw).replace(/^\/+/, "").replace(/^case-studies\//, "").trim();
}

// Solution record titles hold "Tool – Description" in one string; split on the
// first spaced dash. If there's no dash, the whole title is the tool name.
function splitSolution(title: string): { tool: string; desc: string } {
  const m = title.match(/\s[–—-]\s/);
  if (m && m.index !== undefined) {
    return { tool: title.slice(0, m.index).trim(), desc: title.slice(m.index + m[0].length).trim() };
  }
  return { tool: title.trim(), desc: "" };
}

// Detail media: prefer Detail Page Image (s4f476378c), fall back to Cover Image.
function mediaFrom(rec: CaseStudyRecord): CaseMedia[] {
  const detail = rec.s4f476378c as SmartSuiteFile[] | undefined;
  const cover = rec.sae9c2cd99 as SmartSuiteFile[] | undefined;
  const files = Array.isArray(detail) && detail.length > 0 ? detail : cover;
  if (!Array.isArray(files)) return [];
  return files
    .filter((f) => f && typeof f.handle === "string" && f.handle)
    .map((f) => ({ type: "image" as const, src: `/api/ss-file/${f.handle}`, alt: "" }));
}

async function resolveCountryNames(ids: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  await Promise.all(
    [...new Set(ids)].map(async (id) => {
      try {
        const rec = await getRecord<Record<string, unknown>>(COUNTRY_TABLE, id, REVALIDATE);
        const name = rec?.[COUNTRY_NAME_FIELD];
        if (typeof name === "string" && name) map.set(id, name);
      } catch {
        /* unresolved → "" */
      }
    })
  );
  return map;
}

// Single shared read of all published records (hydrated). Identical body across
// callers so Next's Data Cache dedupes it during a build/request.
async function fetchPublished(): Promise<CaseStudyRecord[]> {
  const body = {
    filter: { operator: "and", fields: [{ field: "status", comparison: "is", value: STATUS_PUBLISHED }] },
    sort: [{ field: "autonumber", direction: "asc" }],
    limit: 500,
    offset: 0,
    hydrated: true,
  };
  const { items } = await listRecords<CaseStudyRecord>(CASE_STUDIES_TABLE, body, REVALIDATE);
  return items.filter((r) => r.status?.value === STATUS_PUBLISHED);
}

/**
 * Case cards (list page + homepage featured subset). Live SmartSuite data only.
 */
export async function getCaseStudies(
  opts: { featuredOnly?: boolean; limit?: number } = {}
): Promise<CaseStudyCard[]> {
  try {
    let items = await fetchPublished();
    if (opts.featuredOnly) items = items.filter((r) => r[FEATURED_FIELD] === true);

    const countryIds = items
      .map((r) => firstLinkId(r.s81a7abc62))
      .filter((x): x is string => Boolean(x));
    const countryMap = await resolveCountryNames(countryIds);

    const cards = items.map((rec): CaseStudyCard => {
      const handle = Array.isArray(rec.sae9c2cd99) ? rec.sae9c2cd99[0]?.handle : undefined;
      const slug = normalizeSlug(rec.sf1fb67a8f);
      const countryId = firstLinkId(rec.s81a7abc62);
      return {
        slug,
        href: slug ? `/case-studies/${slug}` : "#",
        cover: handle ? `/api/ss-file/${handle}` : "",
        category: firstTitle(rec.sf3d75aea0),
        location: (countryId && countryMap.get(countryId)) || "",
        title: str(rec.title),
        summary: str(rec.s48d6c3d8d),
        results: allTitles(rec.s058517f16).slice(0, 2),
      };
    });

    return opts.limit ? cards.slice(0, opts.limit) : cards;
  } catch (err) {
    console.error("[case-studies] SmartSuite fetch failed:", err);
    return [];
  }
}

/** Bare slugs of published case studies — for generateStaticParams(). */
export async function getCaseStudySlugs(): Promise<string[]> {
  try {
    const items = await fetchPublished();
    return items.map((r) => normalizeSlug(r.sf1fb67a8f)).filter(Boolean);
  } catch (err) {
    console.error("[case-studies] slug fetch failed:", err);
    return [];
  }
}

/** Full detail record for one published case study, matched by bare slug. */
export async function getCaseStudy(slug: string): Promise<CaseStudyFull | null> {
  try {
    const items = await fetchPublished();
    const rec = items.find((r) => normalizeSlug(r.sf1fb67a8f) === slug);
    if (!rec) return null;

    const countryId = firstLinkId(rec.s81a7abc62);
    const countryMap = countryId
      ? await resolveCountryNames([countryId])
      : new Map<string, string>();

    const statValue = str(rec.s635ca48c8);

    return {
      slug,
      href: `/case-studies/${slug}`,
      title: str(rec.title),
      category: firstTitle(rec.sf3d75aea0),
      location: (countryId && countryMap.get(countryId)) || "",
      subhead: str(rec.s4affd4869),
      client: str(rec.se89cb4378),
      duration: str(rec.s76732d846),
      heroStat: statValue ? { value: statValue, label: str(rec.swmhvl5a) } : undefined,
      media: mediaFrom(rec),
      aboutClient: str(rec.s48d6c3d8d),
      challenge: str(rec.sfee252c52),
      solution: allTitles(rec.s1d8a86c61)
        .map(splitSolution)
        .filter((s) => s.tool || s.desc),
      resultCards: allTitles(rec.s058517f16).map((t) => ({ text: t })),
      tools: allTitles(rec.s51aa9957f).map((name) => ({ icon: DEFAULT_TOOL_ICON, name })),
      testimonial: {
        quote: str(rec.sb6eb19d7d),
        author: str(rec.s1a3c530b9),
        org: firstTitle(rec.s6fce6b7ac),
        rating: 5,
      },
    };
  } catch (err) {
    console.error("[case-studies] detail fetch failed:", err);
    return null;
  }
}
