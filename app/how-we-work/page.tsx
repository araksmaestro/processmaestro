import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import BookingButton from "@/components/BookingButton";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "We solve the problem first, then choose the tools that fit. Process Maestro is a consulting-first, tool-agnostic team - deep in SmartSuite, Make.com, Claude Code and Xano, but never limited to them.",
  alternates: { canonical: "/how-we-work" },
  openGraph: {
    title: "How We Work | Process Maestro",
    description:
      "Right solution first, tools second. Our consulting-first, tool-agnostic method for automating and scaling your operations.",
    url: "/how-we-work",
    type: "website",
  },
};

// The core stack: role + a credential/tag line. `partner` renders the "Official
// Partner" pill (the natural home for the SmartSuite + Make.com badges - swap the
// text pill for the badge image once supplied).
type Tool = { name: string; role: string; tag: string; partner: boolean; badge?: string };
const STACK: Tool[] = [
  {
    name: "SmartSuite",
    role: "Ops data & workflows",
    tag: "Certified Consultant",
    partner: true,
    badge: "/smartsuite-partner.png",
  },
  {
    name: "Make.com",
    role: "Automation & integrations",
    tag: "Certified Partner",
    partner: true,
    badge: "/make-partner.png",
  },
  { name: "Claude Code", role: "Custom front-ends", tag: "AI-accelerated", partner: false },
  { name: "Xano", role: "Backend at scale", tag: "For big data", partner: false },
];

// The method is a real, ordered sequence (discovery to support), so the numbering
// carries meaning rather than decoration.
const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "Focused sessions to learn how your business actually runs - the real workflow, not the org-chart version.",
  },
  {
    n: "02",
    title: "Map",
    desc: "We document it as BPMN process maps and an ER data model. This blueprint exposes the bottlenecks and drives every decision that follows.",
  },
  {
    n: "03",
    title: "Choose the right tools",
    desc: "Only now do we pick the stack - SmartSuite, Make.com, Xano, a custom build - based on your data, budget and team. Never a default.",
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
    desc: "We stay with you as you grow - and we'll tell you honestly when it's time to move up, like SmartSuite to Xano for bigger data.",
  },
] as const;

// Hero convergence: the capabilities that combine into working systems.
const NODES = [
  "Workflow design",
  "Data structure",
  "Custom front-end",
  "Process automation",
  "Integrations",
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
        <header className="hww-hero" aria-labelledby="hww-hero-heading">
          <div className="hww-hero-grid">
            <div>
              <div className="pm-eyebrow hww-anim hww-d1" style={{ color: "var(--pm-lime-light)" }}>
                How we work
              </div>
              <h1 id="hww-hero-heading" className="pm-display hww-h1 hww-anim hww-d2">
                Right <span className="hww-lime">solution</span> first.
                <br />
                Tools second.
              </h1>
              <p className="hww-hero-sub hww-anim hww-d3">
                Process Maestro is an outcomes team, not a tool vendor. We diagnose
                the real problem, then choose and build with whatever fits. Deep in
                a core stack, never limited to it.
              </p>
              <div className="hww-anim hww-d4" style={{ marginTop: 34 }}>
                <BookingButton
                  label="Book a consultation →"
                  slot="hero"
                  service="general"
                  variant="dark"
                  className="pm-display"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--pm-lime)",
                    color: "#20330a",
                    fontWeight: 700,
                    fontSize: 16,
                    textDecoration: "none",
                    padding: "15px 26px",
                    borderRadius: 12,
                    boxShadow: "0 12px 30px rgba(140,220,0,0.28)",
                  }}
                />
              </div>
            </div>

            {/* Convergence motif: four capabilities -> one working system. */}
            <svg
              className="hww-converge hww-anim hww-d3"
              viewBox="0 0 400 304"
              role="img"
              aria-label="Five capabilities - workflow design, data structure, custom front-end, process automation and integrations - converge into apps that run themselves."
            >
              {NODES.map((label, i) => {
                const y = 20 + i * 56;
                const cy = y + 20;
                return (
                  <g key={label}>
                    <rect className="n" x="6" y={y} width="176" height="40" rx="9" />
                    <text className="nt" x="20" y={cy + 4.5}>
                      {label}
                    </text>
                    <path className="wire" d={`M182,${cy} C242,${cy} 255,152 300,152`} />
                  </g>
                );
              })}
              <circle className="pulse" cx="300" cy="152" r="7" fill="var(--pm-lime)" />
              <rect className="out" x="306" y="122" width="88" height="60" rx="12" />
              <text className="ot" x="350" y="148" textAnchor="middle" fontSize="12.5">
                Apps that
              </text>
              <text className="ot" x="350" y="165" textAnchor="middle" fontSize="12.5">
                run themselves
              </text>
            </svg>
          </div>
        </header>

        {/* ===== #1 thing strip ===== */}
        <div className="hww-strip">
          <div className="hww-strip-in">
            <div className="lbl">The&nbsp;#1&nbsp;thing · quality consulting</div>
            <div className="stmt">
              We solve the problem first - <b>then choose the tools that fit.</b>
            </div>
          </div>
        </div>

        {/* ===== Core stack ===== */}
        <section aria-labelledby="hww-stack-heading">
          <div className="hww-sec">
            <div className="hww-sechead">
              <div className="pm-eyebrow" style={{ color: "var(--pm-purple-soft, #8a63b8)" }}>
                Our core stack
              </div>
              <h2 id="hww-stack-heading" className="pm-display">
                Deep expertise in a few tools. Loyalty to none.
              </h2>
            </div>
            <div className="hww-stack">
              {STACK.map((t, i) => (
                <div className="hww-tool" key={t.name}>
                  <div className="idx">{`0${i + 1}`}</div>
                  <div className="nm">{t.name}</div>
                  <div className="role">{t.role}</div>
                  {t.badge ? (
                    <Image
                      src={t.badge}
                      alt={`${t.name} ${t.tag}`}
                      width={48}
                      height={48}
                      style={{ display: "block", marginTop: 14 }}
                    />
                  ) : (
                    <span className={`hww-tag ${t.partner ? "partner" : "plain"}`}>
                      {t.partner && <span className="dot" aria-hidden="true" />}
                      {t.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="hww-open">
              <span className="lead">Never locked in</span>
              <span className="chips">
                <span>Airtable</span>
                <span>n8n</span>
                <span>Softr</span>
                <span>WeWeb</span>
                <span>custom code</span>
              </span>
              <span className="tail">- whatever the problem actually calls for.</span>
            </div>
          </div>
        </section>

        {/* ===== Method ===== */}
        <section className="hww-method" aria-labelledby="hww-method-heading">
          <div className="hww-sec">
            <div className="hww-sechead">
              <div className="pm-eyebrow" style={{ color: "var(--pm-lime-light)" }}>
                Our method
              </div>
              <h2 id="hww-method-heading" className="pm-display">
                Six steps from problem to system
              </h2>
              <p className="hww-method-lead">
                The tools change per project. The method doesn&apos;t - it&apos;s how we
                make sure you get the right solution, not our favorite one.
              </p>
            </div>
            <div className="hww-steps">
              {STEPS.map((s) => (
                <div className="hww-step" key={s.n}>
                  <div className="no">{s.n}</div>
                  <div>
                    <p className="t pm-display">{s.title}</p>
                    <p className="d">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Manifesto ===== */}
        <section className="hww-manifesto" aria-labelledby="hww-manifesto-heading">
          <div className="hww-sec">
            <div className="pm-eyebrow" style={{ color: "var(--pm-purple-soft, #8a63b8)" }}>
              Why tool-agnostic wins
            </div>
            <p id="hww-manifesto-heading" className="hww-quote">
              Most shops sell you their <span className="hww-lime">one tool.</span> We
              tell you when yours isn&apos;t enough.
            </p>
            <p className="hww-msub">
              That honesty is the whole point. The right architecture outlasts any
              single platform, so we design for your outcome, then pick the tools
              that get you there fastest and scale the longest.
            </p>
          </div>
        </section>

        {/* ===== CTA band ===== */}
        <section className="hww-cta" aria-labelledby="hww-cta-heading">
          <div className="hww-cta-in">
            <div>
              <h2 id="hww-cta-heading" className="pm-display">
                Not sure which tools your business actually needs?
              </h2>
              <p>
                Book a free 30-minute consult. We&apos;ll diagnose the problem first -
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
