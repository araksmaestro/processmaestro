import { tools } from "@/content/home";

export default function Tools() {
  return (
    <section aria-labelledby="tools-heading" style={{ background: "var(--pm-lilac)" }}>
      <div
        className="pm-split pm-sec-pad pm-pad"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "84px 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div className="pm-eyebrow" style={{ color: "var(--pm-lime-hover)", marginBottom: 14 }}>
            Tools we use
          </div>
          <h2
            id="tools-heading"
            className="pm-h2 pm-display"
            style={{
              fontWeight: 700,
              fontSize: 36,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              color: "var(--pm-ink-1)",
            }}
          >
            The best tool for the job — every time
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--pm-muted-1)", margin: 0 }}>
            We&apos;re platform-agnostic. We pick the right stack for your business
            and design around it, so your processes are optimized for maximum
            efficiency — not locked to one vendor.
          </p>
        </div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {tools.map((tool) => (
            <li
              key={tool}
              className="pm-display"
              style={{
                background: "#fff",
                border: "1px solid var(--pm-card-border)",
                borderRadius: 12,
                padding: "12px 18px",
                fontWeight: 600,
                fontSize: 15,
                color: "var(--pm-muted-3)",
                boxShadow: "0 2px 8px rgba(80,40,120,0.05)",
              }}
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
