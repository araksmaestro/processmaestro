import Link from "next/link";
import CaseCard from "@/components/CaseCard";
import { homeCases } from "@/content/home";

export default function CaseStudies() {
  return (
    <section
      id="cases"
      aria-labelledby="cases-heading"
      style={{ background: "var(--pm-grad-cases)", color: "var(--pm-on-dark)" }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }} className="pm-pad">
        <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 56px" }}>
          <div className="pm-eyebrow" style={{ color: "var(--pm-lime-light)", marginBottom: 14 }}>
            Client results
          </div>
          <h2
            id="cases-heading"
            className="pm-h2 pm-display"
            style={{
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 14px",
            }}
          >
            Real-world process transformation
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--pm-on-dark-1)", margin: 0 }}>
            How teams across industries streamlined their operations — and got
            measurable results.
          </p>
        </div>

        <div
          className="pm-cards"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}
        >
          {homeCases.map((cs) => (
            <CaseCard key={cs.title} {...cs} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link
            href="/case-studies"
            className="pm-ghost pm-display"
            style={{
              textDecoration: "none",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "var(--pm-on-dark)",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 11,
              display: "inline-block",
            }}
          >
            View all case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
