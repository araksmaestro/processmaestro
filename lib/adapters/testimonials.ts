// Adapter: maps SmartSuite Testimonials records to the shape the section needs.
// The frontend imports THIS, never the SmartSuite client directly.
import { listRecords, getRecord } from "@/lib/smartsuite/client";
import type { TestimonialRecord, NamedRecord } from "@/lib/smartsuite/types";

const TESTIMONIALS_TABLE = "6a4b8d0431a2c6ad0fe4e42f";
const ORGS_TABLE = "64ceb00a3dd12a0e8b9c920e";
const SECTION_FIELD = "s7987685a8";
const SECTION_TESTIMONIALS = "KwWGD"; // "Testimonials" option value code
const STATUS_PUBLISH = "complete"; // "Publish" status value (is_complete)
// 5 min: testimonials change rarely; longer TTL keeps SmartSuite reads low.
const REVALIDATE = 300;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  position: string;
  company: string;
  /** Reviewer photo (same-origin file-proxy URL), or undefined → show initials. */
  avatar?: string;
};

// The record title is auto-generated as "[[Contact]] - ", so the reviewer's name
// is everything before the trailing " - ". Reading it straight from the title
// avoids a per-contact getRecord that can rate-limit (429) and silently blank
// the name — which is exactly what was dropping names on some cards.
function nameFromTitle(rec: TestimonialRecord): string {
  const title = typeof rec.title === "string" ? rec.title : "";
  return title.split(/\s+-\s*/)[0].trim();
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

// The Contact-photo lookup (s883fae9a9) returns the linked contact's image file
// nested a few levels deep: [[[ { handle, ... } ]]]. It rides along in the single
// testimonials listRecords call — no extra request. Flatten to the first file
// handle and serve it through the same-origin proxy (optimizable by next/image).
function avatarUrlOf(rec: TestimonialRecord): string | undefined {
  const field = rec.s883fae9a9;
  if (!Array.isArray(field)) return undefined;
  const file = (field as unknown[])
    .flat(Infinity)
    .find(
      (f): f is { handle: string } =>
        !!f && typeof f === "object" && typeof (f as { handle?: unknown }).handle === "string"
    );
  return file ? `/api/ss-file/${file.handle}` : undefined;
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
          { field: "status", comparison: "is", value: STATUS_PUBLISH },
        ],
      },
      sort: [{ field: "autonumber", direction: "asc" }],
    };

    const { items } = await listRecords<TestimonialRecord>(TESTIMONIALS_TABLE, body, REVALIDATE);

    // Safety net: only tagged AND published records, even if the server filter changes.
    const tagged = items.filter(
      (r) =>
        Array.isArray(r.s7987685a8) &&
        r.s7987685a8.includes(SECTION_TESTIMONIALS) &&
        r.status?.value === STATUS_PUBLISH
    );

    // Name comes from the title (no network call). Only the company still needs
    // resolving — via the org lookup ids.
    const orgIds = tagged.map(orgIdOf).filter((x): x is string => Boolean(x));
    const orgMap = await resolveNames(ORGS_TABLE, orgIds);

    return tagged.map((rec): Testimonial => {
      const oId = orgIdOf(rec);
      return {
        id: rec.id,
        quote: typeof rec.se807231b4 === "string" ? rec.se807231b4 : "",
        name: nameFromTitle(rec),
        position: positionOf(rec),
        company: (oId && orgMap.get(oId)) || "",
        avatar: avatarUrlOf(rec),
      };
    });
  } catch (err) {
    console.error("[testimonials] SmartSuite fetch failed:", err);
    return [];
  }
}
