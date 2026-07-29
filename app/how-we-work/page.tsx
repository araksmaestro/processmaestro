import type { Metadata } from "next";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import BookingButton from "@/components/BookingButton";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "We solve the problem first, then choose the tools that fit. Process Maestro is a consulting-first, tool-agnostic team — deep in SmartSuite, Make.com, Claude Code and Xano, but never limited to them.",
  alternates: { canonical: "/how-we-work" },
  openGraph: {
    title: "How We Work | Process Maestro",
    description:
      "Right solution first, tools second. Our consulting-first, tool-agnostic method for automating and scaling your operations.",
    url: "/how-we-work",
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

// The core stack: role + a credential/tag line. `partner` renders the "Official
// Partner" pill (the natural home for the SmartSuite + Make.com badges — swap the
// text pill for the badge image once supplied).
const STACK = [
  { name: "SmartSuite", role: "Ops data & workflows", tag: "Official Partner", partner: true },
  { name: "Make.com", role: "Automation engine", tag: "Official Partner", partner: true },
  { name: "Claude Code", role: "Custom front-ends", tag: "AI-accelerated", partner: false },
  { name: "Xano", role: "Backend at scale", tag: "For big data", partner: false },
] as const;

// The method is a real, ordered sequence (discovery → support), so the numbering
// carries meaning rather than decoration.
const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "Focused sessions to learn how your business actually runs — the real workflow, not the org-chart version.",
  },
  {
    n: "02",
    title: "Map",
    desc: "We document it as BPMN process maps and an ER data model. This blueprint exposes the bottlenecks and drives every decision that follows.",
  },
  {
    n: "03",
    title: "Choose the right tools",
    desc: "Only now do we pick the stack — SmartSuite, Make.com, Xano, a custom build — based on your data, budget and team. Never a default.",
  },
  {
    n: "04",
    title: "Design & build",
    desc: "We architect a clean, scalable database and build the system around your real process, not a rigid template.",
  },
  {
    n: "05",
    title: "Automate & connect",
    desc: "We wire your tools together with Make.com and n8n so data moves itself and the manual work disappears.",
  },
  {
    n: "06",
    title: "Support & scale",
    desc: "We stay with you as you grow — and we'll tell you honestly when it's time to move up, like SmartSuite to Xano for bigger data.",
  },
] as const;

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "How We Work", item: `${SITE_URL}/how-we-work` },
  ],
};

export default function HowWeWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav variant="dark" active="how-we-work" />

      <main style={{ background: "var(--pm-bg)", color: "var(--pm-ink-1)", overflowX: "hidden" }}>
        {/* ===== Hero ===== */}
        <section
          aria-labelledby="hww-hero-heading"
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
          <div className="hww-hero pm-pad">
            <div
              className="pm-eyebrow"
              style={{ color: "var(--pm-lime-light)", marginBottom: 18 }}
            >
              How we work
            </div>
            <h1
              id="hww-hero-heading"
              className="pm-display"
              style={{
                fontWeight: 800,
                fontSize: 46,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: "0 0 20px",
              }}
            >
              Right <span style={HEADLINE_GRADIENT}>solution</span> first.
              <br />
              Tools second.
            </h1>
            <p
              style={{
                fontSize: 19,
                lineHeight: 1.6,
                color: "var(--pm-on-dark-4)",
                maxWidth: 620,
                margin: "0 auto",
              }}
            >
              Process Maestro is an outcomes team, not a tool vendor. We diagnose
              the real problem, then choose — and build with — whatever fits. We go
              deep in a core stack, and we&apos;re never limited to it.
            </p>
          </div>
        </section>

        {/* ===== Consulting-first + the stack ===== */}
        <section aria-labelledby="hww-stack-heading" style={{ background: "var(--pm-bg)" }}>
          <div className="hww-pad" style={{ padding: "84px 32px 20px" }}>
            <div
              style={{
                background: "var(--pm-purple-primary)",
                borderRadius: 18,
                padding: "26px 30px",
                boxShadow: "0 16px 40px rgba(42,20,64,0.16)",
              }}
            >
              <div
                className="pm-eyebrow"
                style={{ color: "var(--pm-lime-light)", marginBottom: 8 }}
              >
                The #1 thing · quality consulting
              </div>
              <div
                className="pm-display"
                style={{ fontWeight: 700, fontSize: 24, lineHeight: 1.25, color: "#fff" }}
              >
                We solve the problem first — then choose the tools that fit.
              </div>
            </div>
          </div>

          <div className="hww-pad" style={{ padding: "24px 32px 0" }}>
            <h2 id="hww-stack-heading" className="sr-only">
              Our core stack
            </h2>
            <div
              className="pm-eyebrow"
              style={{ color: "var(--pm-muted-1)", marginBottom: 16 }}
            >
              Our core stack
            </div>
            <div className="hww-stack">
              {STACK.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: "var(--pm-card-light)",
                    border: "1px solid var(--pm-card-border)",
                    borderRadius: 16,
                    padding: 22,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 4,
                      borderRadius: 2,
                      background: "var(--pm-lime)",
                      marginBottom: 16,
                    }}
                  />
                  <div
                    className="pm-display"
                    style={{ fontWeight: 700, fontSize: 19, color: "var(--pm-ink-1)" }}
                  >
                    {t.name}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--pm-muted-1)", marginTop: 6 }}>
                    {t.role}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 700,
                        color: t.partner ? "var(--pm-purple-primary)" : "var(--pm-muted-1)",
                        background: t.partner ? "rgba(140,220,0,0.14)" : "transparent",
                        border: t.partner
                          ? "1px solid rgba(140,220,0,0.35)"
                          : "1px solid var(--pm-card-border)",
                        borderRadius: 100,
                        padding: "3px 10px",
                      }}
                    >
                      {t.partner && (
                        <span
                          aria-hidden="true"
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--pm-lime)",
                          }}
                        />
                      )}
                      {t.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Never locked in */}
          <div className="hww-pad" style={{ padding: "24px 32px 84px" }}>
            <div
              style={{
                border: "1.5px dashed var(--pm-line-strong, #c9b7d9)",
                borderRadius: 16,
                padding: "22px 26px",
                background: "var(--pm-bg)",
              }}
            >
              <div
                className="pm-display"
                style={{ fontWeight: 700, fontSize: 18, color: "var(--pm-ink-1)", marginBottom: 6 }}
              >
                Never locked to one tool
              </div>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "var(--pm-ink-2)", maxWidth: 760 }}>
                The core stack covers most needs. When your problem calls for
                something else — Airtable, n8n, Softr, or fully custom code — that&apos;s
                what we use. The right fit always beats a favorite tool.
              </p>
            </div>
          </div>
        </section>

        {/* ===== The method ===== */}
        <section
          aria-labelledby="hww-method-heading"
          style={{ background: "var(--pm-purple-2)", color: "#fff" }}
        >
          <div className="hww-pad" style={{ padding: "84px 32px" }}>
            <div className="pm-eyebrow" style={{ color: "var(--pm-lime-light)", marginBottom: 14 }}>
              Our method
            </div>
            <h2
              id="hww-method-heading"
              className="pm-display"
              style={{
                fontWeight: 700,
                fontSize: 36,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: "0 0 12px",
              }}
            >
              Six steps from problem to system
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--pm-on-dark-7)", maxWidth: 640, margin: "0 0 44px" }}>
              The tools change per project. The method doesn&apos;t — it&apos;s how we make
              sure you get the right solution, not our favorite one.
            </p>
            <div className="hww-steps">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div
                    className="pm-display"
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: "var(--pm-lime-light)",
                      letterSpacing: "0.06em",
                      marginBottom: 12,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="pm-display"
                    style={{ fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 8 }}
                  >
                    {s.title}
                  </div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--pm-on-dark-2)" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA band ===== */}
        <section
          aria-labelledby="hww-cta-heading"
          style={{ background: "var(--pm-grad-cta)", color: "#22350a" }}
        >
          <div className="hww-cta-inner">
            <div style={{ maxWidth: 600 }}>
              <h2
                id="hww-cta-heading"
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
                Not sure which tools your business actually needs?
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "#33470f", margin: 0 }}>
                Book a free 30-minute consult. We&apos;ll diagnose the problem first —
                and tell you honestly what it&apos;ll take.
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
