// Adapter: maps SmartSuite Testimonials records to the shape the section needs.
// The frontend imports THIS, never the SmartSuite client directly.
import { listRecords, getRecord } from "@/lib/smartsuite/client";
import type { TestimonialRecord, NamedRecord } from "@/lib/smartsuite/types";

const TESTIMONIALS_TABLE = "6a4b8d0431a2c6ad0fe4e42f";
const CONTACTS_TABLE = "64ceb4f21c6a27ff1583dcb9";
const ORGS_TABLE = "64ceb00a3dd12a0e8b9c920e";
const SECTION_FIELD = "s7987685a8";
const SECTION_TESTIMONIALS = "KwWGD"; // "Testimonials" option value code
const REVALIDATE = 30;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  position: string;
  company: string;
};

function contactIdOf(rec: TestimonialRecord): string | undefined {
  return Array.isArray(rec.s57b3d9959) ? rec.s57b3d9959[0] : undefined;
}

function orgIdOf(rec: TestimonialRecord): string | undefined {
  const flat = Array.isArray(rec.s839847d0a)
    ? (rec.s839847d0a as unknown[]).flat(Infinity)
    : [];
  const first = flat[0];
  return typeof first === "string" ? first : undefined;
}

function positionOf(rec: TestimonialRecord): string {
  const v = rec.sc53e5a510;
  return (Array.isArray(v) && Array.isArray(v[0]) ? v[0][0] : undefined) ?? "";
}

// Resolve linked-record ids to their `title` via per-id GET (deduped, in
// parallel). SmartSuite rejects filtering by `id`, so we can't batch these.
async function resolveNames(tableId: string, ids: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  await Promise.all(
    [...new Set(ids)].map(async (id) => {
      try {
        const rec = await getRecord<NamedRecord>(tableId, id, REVALIDATE);
        if (rec?.title) map.set(id, rec.title);
      } catch {
        // Leave unresolved → name/company falls back to "".
      }
    })
  );
  return map;
}

/**
 * Fetch testimonials tagged with the "Testimonials" Section, resolving each
 * author's name and company. Server-side only. Returns [] on any error so the
 * section renders its empty state rather than crashing.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const body = {
      limit: 500,
      offset: 0,
      filter: {
        operator: "and",
        fields: [
          { field: SECTION_FIELD, comparison: "has_any_of", value: [SECTION_TESTIMONIALS] },
        ],
      },
      sort: [{ field: "autonumber", direction: "asc" }],
    };

    const { items } = await listRecords<TestimonialRecord>(TESTIMONIALS_TABLE, body, REVALIDATE);

    // Safety net: never let an untagged record through even if the server filter changes.
    const tagged = items.filter(
      (r) => Array.isArray(r.s7987685a8) && r.s7987685a8.includes(SECTION_TESTIMONIALS)
    );

    const contactIds = tagged.map(contactIdOf).filter((x): x is string => Boolean(x));
    const orgIds = tagged.map(orgIdOf).filter((x): x is string => Boolean(x));
    const [contactMap, orgMap] = await Promise.all([
      resolveNames(CONTACTS_TABLE, contactIds),
      resolveNames(ORGS_TABLE, orgIds),
    ]);

    return tagged.map((rec): Testimonial => {
      const cId = contactIdOf(rec);
      const oId = orgIdOf(rec);
      return {
        id: rec.id,
        quote: typeof rec.se807231b4 === "string" ? rec.se807231b4 : "",
        name: (cId && contactMap.get(cId)) || "",
        position: positionOf(rec),
        company: (oId && orgMap.get(oId)) || "",
      };
    });
  } catch (err) {
    console.error("[testimonials] SmartSuite fetch failed:", err);
    return [];
  }
}
