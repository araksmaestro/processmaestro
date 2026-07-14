import { industries } from "@/content/home";

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-heading" style={{ background: "var(--pm-bg)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }} className="pm-pad">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <div className="pm-eyebrow" style={{ color: "var(--pm-lime-hover)", marginBottom: 14 }}>
            Our experience
          </div>
          <h2
            id="industries-heading"
            className="pm-h2 pm-display"
            style={{
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 14px",
              color: "var(--pm-ink-1)",
            }}
          >
            Industries we&apos;ve worked with
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--pm-muted-1)", margin: 0 }}>
            We&apos;ve helped businesses across many sectors optimize their
            processes and improve efficiency.
          </p>
        </div>

        <div
          className="pm-cards"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {industries.map((ind) => (
            <article
              key={ind.name}
              className="pm-industry-card"
              style={{
                background: "var(--pm-card-light)",
                border: "1px solid var(--pm-card-border)",
                borderRadius: 18,
                padding: 26,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  background: "var(--pm-purple-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                {ind.icon}
              </div>
              <h3
                className="pm-display"
                style={{ fontWeight: 600, fontSize: 18, margin: "0 0 8px", color: "var(--pm-ink-3)" }}
              >
                {ind.name}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--pm-muted-1)", margin: 0 }}>
                {ind.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
