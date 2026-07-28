import type { Metadata } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import CaseCard from "@/components/CaseCard";
import BookingButton from "@/components/BookingButton";
import { getCaseStudies, type CaseStudyCard } from "@/lib/adapters/case-studies";

// Cover URLs are served through the same-origin /api/ss-file proxy (stable
// paths), so ISR is safe. 5-minute revalidate: publish/featured edits appear
// within ~5 min while keeping background SmartSuite reads to at most ~1 per
// 5 min per fetch (deduped across all visitors), well under any rate limit.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real businesses, real results. Explore how Process Maestro's clients eliminated manual work and scaled faster with workflow design and automation.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Process Maestro",
    description:
      "Explore how our clients eliminated manual work and scaled faster with workflow design and business-process automation.",
    url: "/case-studies",
    type: "website",
  },
};

// Page-specific gradients (used once here).
const HERO_BG =
  "radial-gradient(120% 130% at 50% 0%, #5c2f86 0%, #3a1e5c 55%, #2a1440 100%)";
const HEADLINE_GRADIENT = {
  background: "linear-gradient(100deg, #8CDC00 30%, #b9a9d1 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export default async function CaseStudiesPage() {
  // Live published case studies from SmartSuite (no fabricated fallback).
  // On a fetch failure at runtime we RETHROW so ISR keeps serving the last
  // successfully-rendered page — the previously-shown cards, real data — rather
  // than caching a blank one. At build there is no prior page to fall back to, so
  // there we tolerate an empty result instead of failing the whole build.
  let cards: CaseStudyCard[];
  try {
    cards = await getCaseStudies();
  } catch (err) {
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      cards = [];
    } else {
      throw err;
    }
  }

  return (
    <>
      <Nav variant="dark" active="case-studies" />

      <main style={{ background: "#F7F5FB", color: "var(--pm-ink-1)", overflowX: "hidden" }}>
        {/* ===== Hero ===== */}
        <section
          aria-labelledby="cs-hero-heading"
          style={{ position: "relative", background: HERO_BG, overflow: "hidden", color: "#fff" }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="cs-hero pm-pad">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(140,220,0,0.14)",
                border: "1px solid rgba(140,220,0,0.35)",
                color: "var(--pm-lime-light)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "8px 16px",
                borderRadius: 100,
                marginBottom: 30,
              }}
            >
              <span aria-hidden="true" style={{ fontSize: 14 }}>
                📊
              </span>{" "}
              Success Stories
            </div>
            <h1 id="cs-hero-heading" className="cs-h1">
              Real <span style={HEADLINE_GRADIENT}>Businesses!</span>{" "}
              <br />
              Real <span style={HEADLINE_GRADIENT}>Results!</span>
            </h1>
            <p className="cs-sub">
              Explore how our clients eliminated manual work and scaled faster. We
              break down what the problem was, how we solved it, why it mattered,
              and which tools made it possible.
            </p>
          </div>
        </section>

        {/* ===== Case grid ===== */}
        <section aria-labelledby="cs-grid-heading" style={{ background: "#F7F5FB" }}>
          {/* sr-only H2 so the outline is H1 → H2 → H3 (card titles) without
              adding a visible heading the design doesn't have. */}
          <h2 id="cs-grid-heading" className="sr-only">
            Featured case studies
          </h2>
          {/* Cards sit directly on the light section (no elevated panel), so the
              padding that used to live on the panel now lives on this container. */}
          <div className="cs-grid-pad">
            <div
              className="pm-cards"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}
            >
              {cards.map((cs) => (
                <CaseCard
                  key={cs.slug || cs.title}
                  href={cs.href}
                  cover={cs.cover}
                  category={cs.category}
                  location={cs.location}
                  title={cs.title}
                  summary={cs.summary}
                  results={cs.results}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA band ===== */}
        <section
          aria-labelledby="cs-cta-heading"
          style={{ background: "var(--pm-grad-cta)", color: "#22350a" }}
        >
          <div className="cs-cta-inner pm-pad">
            <div style={{ maxWidth: 580 }}>
              <h2
                id="cs-cta-heading"
                className="pm-display"
                style={{
                  fontWeight: 700,
                  fontSize: 36,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 10px",
                  color: "#1f2f08",
                }}
              >
                Could your business be next?
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "#33470f", margin: 0 }}>
                Book a free 30-minute consult and we&apos;ll show you exactly where
                automation can save you time and money.
              </p>
            </div>
            <BookingButton
              label="Book a Consultation →"
              slot="section-cta"
              service="general"
              variant="dark"
              className="pm-dark-cta pm-display"
              style={{
                flex: "none",
                textDecoration: "none",
                background: "var(--pm-purple-darkest)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 17,
                padding: "18px 34px",
                borderRadius: 13,
                boxShadow: "0 10px 26px rgba(42,20,64,0.3)",
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
