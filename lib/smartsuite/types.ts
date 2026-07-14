// Raw SmartSuite response shapes (server-side only).

export type SmartSuiteFile = {
  handle: string;
  metadata?: {
    filename?: string;
    mimetype?: string;
    size?: number;
  };
  file_type?: string;
};

// A hydrated linked-record entry. With `hydrated: true` the API returns
// `{ id, title }`; without it, linked fields are bare id strings.
export type SmartSuiteLinkedRecord = { id: string; title?: string };
export type LinkedField = Array<SmartSuiteLinkedRecord | string> | undefined;

// Case Studies table record (only the fields the homepage cards need).
export type CaseStudyRecord = {
  id: string;
  title?: string;
  s4affd4869?: string; // Short Description
  sf1fb67a8f?: string; // Slug (already includes "case-studies/" prefix)
  s03f4a8d8f?: boolean; // Featured (yes/no)
  sae9c2cd99?: SmartSuiteFile[]; // Cover Image (card thumbnail)
  sf3d75aea0?: LinkedField; // Industry → category
  s81a7abc62?: LinkedField; // Country → location
  s058517f16?: LinkedField; // Results → key results
  [key: string]: unknown;
};

export type ListResponse<T> = {
  items: T[];
  total: number;
  offset: number;
  limit: number;
};

// --- Testimonials table + name/company resolution ---

// Testimonials table record (only the slugs the section needs).
export type TestimonialRecord = {
  id: string;
  autonumber?: number;
  se807231b4?: string; // Testimonial (quote, plain text)
  sc53e5a510?: string[][]; // Position (lookup → e.g. [["CFO"]])
  s57b3d9959?: string[]; // Contact (linked record → [contactId])
  s839847d0a?: unknown; // Organization (lookup of a link → nested [[[orgId]]])
  s7987685a8?: string[]; // Section (multi-select option codes)
  [key: string]: unknown;
};

// Minimal shape for Contacts / Organizations lookups (id + title).
export type NamedRecord = { id: string; title?: string };
