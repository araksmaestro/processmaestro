// Adapter: maps SmartSuite Testimonials records to the shape the section needs.
// The frontend imports THIS, never the SmartSuite client directly.
import { listRecords } from "@/lib/smartsuite/client";
import type { TestimonialRecord } from "@/lib/smartsuite/types";

const TESTIMONIALS_TABLE = "6a4b8d0431a2c6ad0fe4e42f";
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
// A multi-select value is present. With `hydrated: true` the section field comes
// back as { label, value } objects; a raw read returns bare value codes. Accept
// either shape so hydration can't silently empty the safety-net filter.
function hasSection(field: unknown, value: string): boolean {
  return (
    Array.isArray(field) &&
    field.some(
      (v) =>
        v === value ||
        (!!v && typeof v === "object" && (v as { value?: unknown }).value === value)
    )
  );
}

function nameFromTitle(rec: TestimonialRecord): string {
  const title = typeof rec.title === "string" ? rec.title : "";
  return title.split(/\s+-\s*/)[0].trim();
}

// Company name. With `hydrated: true` the org link rides along already resolved
// as [[[{ id, title }]]] (title = company), so we read it straight off the single
// listRecords call — no per-org getRecord that can rate-limit (429) and silently
// blank the company. This mirrors how the case-studies adapter reads its country.
function companyOf(rec: TestimonialRecord): string {
  const field = rec.s839847d0a;
  if (!Array.isArray(field)) return "";
  const linked = (field as unknown[])
    .flat(Infinity)
    .find(
      (v): v is { title?: unknown } =>
        !!v && typeof v === "object" && "title" in v
    );
  return linked && typeof linked.title === "string" ? linked.title : "";
}

function positionOf(rec: TestimonialRecord): string {
  const v = rec.sc53e5a510;
  const first = Array.isArray(v) && Array.isArray(v[0]) ? v[0][0] : undefined;
  return typeof first === "string" ? first : "";
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
      // Hydrate so the org link resolves to its title (company) inline — no
      // follow-up per-org getRecord calls.
      hydrated: true,
    };

    const { items } = await listRecords<TestimonialRecord>(TESTIMONIALS_TABLE, body, REVALIDATE);

    // Safety net: only tagged AND published records, even if the server filter changes.
    const tagged = items.filter(
      (r) => hasSection(r.s7987685a8, SECTION_TESTIMONIALS) && r.status?.value === STATUS_PUBLISH
    );

    // Everything — name (title), company (hydrated org link), position, avatar —
    // now comes from this single listRecords call; no extra network round-trips.
    return tagged.map((rec): Testimonial => ({
      id: rec.id,
      quote: typeof rec.se807231b4 === "string" ? rec.se807231b4 : "",
      name: nameFromTitle(rec),
      position: positionOf(rec),
      company: companyOf(rec),
      avatar: avatarUrlOf(rec),
    }));
  } catch (err) {
    console.error("[testimonials] SmartSuite fetch failed:", err);
    return [];
  }
}
