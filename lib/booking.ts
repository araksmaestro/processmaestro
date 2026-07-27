// ============================================================
// Calendly booking config + helpers.
// Single source of truth for the scheduling URL, the UTM query
// string, and the lazy script loader. BookingButton is the only
// consumer; call sites never build a Calendly URL by hand.
// ============================================================

// One event type: a 30-minute free consultation. Attribution is via UTMs,
// not separate links. Overridable per-env; defaults to the confirmed link.
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/vasken-processmaestro/30-min-free-consulting";

export type BookingSlot =
  | "nav"
  | "hero"
  | "section-cta"
  | "footer"
  | "mobile-menu";

export type BookingService =
  | "hourly-consulting"
  | "fractional-services"
  | "custom-development"
  | "general";

/** Route → utm_campaign. Derived from the path, never passed at the call site. */
export function campaignFromPath(pathname: string): string {
  // Normalize: strip leading/trailing slashes. Vercel's static prerender hands
  // the root route through as "/index" (local dev resolves it as "/"), so treat
  // "" and "index" as the homepage — otherwise homepage clicks are mis-tagged
  // utm_campaign=index.
  const p = (pathname || "").replace(/^\/+|\/+$/g, "");
  if (p === "" || p === "index") return "homepage";
  if (p === "services") return "services";
  if (p === "case-studies") return "case-studies";
  if (p.startsWith("case-studies/")) return `case-${p.slice("case-studies/".length)}`;
  // Fallback for any future route: hyphenate.
  return p.replace(/\//g, "-");
}

/**
 * Full Calendly URL the widget (or the anchor fallback) receives.
 * Insertion order matches the design's worked example exactly. The widget
 * hide-flags come first, then UTMs; embed-set values override the parent URL.
 */
export function buildBookingUrl({
  campaign,
  content,
  term,
}: {
  campaign: string;
  content: BookingSlot;
  term: BookingService;
}): string {
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    hide_event_type_details: "1",
    utm_source: "website",
    utm_medium: "cta",
    utm_campaign: campaign,
    utm_content: content,
    utm_term: term,
  });
  return `${CALENDLY_URL}?${params.toString()}`;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

// Module-level guard: N buttons on a page trigger exactly one injection.
let calendlyLoader: Promise<void> | null = null;

/**
 * Inject the Calendly widget assets once, on first intent (hover/focus).
 * Resolves whether the script loads or errors — the anchor fallback covers
 * any click that lands before it's ready, so we never reject or block.
 */
export function ensureCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (calendlyLoader) return calendlyLoader;

  calendlyLoader = new Promise<void>((resolve) => {
    // Warm the connections first. The popup's scheduling page loads from
    // calendly.com — a host we otherwise never touch until the click fires
    // initPopupWidget. Preconnecting during the hover→click gap means the click
    // skips DNS + TCP + TLS and only pays for the page fetch. Downloads nothing.
    for (const host of [
      "https://assets.calendly.com",
      "https://calendly.com",
    ]) {
      const preconnect = document.createElement("link");
      preconnect.rel = "preconnect";
      preconnect.href = host;
      document.head.appendChild(preconnect);
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // fallback anchor handles clicks
    document.head.appendChild(script);
  });

  return calendlyLoader;
}
