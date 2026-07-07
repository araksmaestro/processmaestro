import { painPoints } from "@/content/home";

export default function PainPoints() {
  return (
    <section
      aria-labelledby="painpoints-heading"
      style={{ background: "var(--pm-grad-whoneeds)", color: "var(--pm-on-dark)" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "92px 32px" }} className="pm-pad">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <div className="pm-eyebrow" style={{ color: "var(--pm-lime-light)", marginBottom: 14 }}>
            Is this you?
          </div>
          <h2
            id="painpoints-heading"
            className="pm-h2 pm-display"
            style={{
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Who needs our services?
          </h2>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: 14, listStyle: "none", margin: 0, padding: 0 }}>
          {painPoints.map((point) => (
            <li
              key={point}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "20px 24px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: "none",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "var(--pm-lime)",
                  color: "var(--pm-purple-darkest)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 15,
                  marginTop: 1,
                }}
              >
                ✓
              </span>
              <p style={{ fontSize: 17.5, lineHeight: 1.55, color: "var(--pm-on-dark-3)", margin: 0 }}>
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
