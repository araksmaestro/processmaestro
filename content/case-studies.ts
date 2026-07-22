// Case Studies types. The list, detail, and homepage sections all source their
// data live from SmartSuite via lib/adapters/case-studies.ts — there is no
// static/placeholder case-study content here (removed to avoid shipping fake
// cards with dead links when a fetch fails).

export type CaseMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
};

// Detail-page-only fields. A record with `detail` set is rendered by the
// /case-studies/[slug] template; records without it are card-only for now.
export type CaseStudyDetail = {
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

export type CaseStudy = {
  slug: string; // stable id / detail route param (bare, no "case-studies/" prefix)
  url?: string; // explicit card link override; falls back to '#' in v1
  cover: string; // '/case-studies/case-*.png'
  category: string;
  location: string;
  title: string;
  summary: string;
  results: string[];
  detail?: CaseStudyDetail; // present → has a detail page
};
