export default function CtaBand() {
  return (
    <section
      id="consult"
      aria-labelledby="cta-heading"
      style={{ background: "var(--pm-grad-cta)", color: "#22350a" }}
    >
      <div
        className="pm-pad"
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "72px 32px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h2
            id="cta-heading"
            className="pm-h2 pm-display"
            style={{
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              color: "#1f2f08",
            }}
          >
            Book a free 30-minute consult
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "#33470f", margin: 0 }}>
            Walk us through your business bottlenecks and we&apos;ll show you
            exactly where automation can save you time and money — no strings
            attached.
          </p>
        </div>
        {/* TODO: point href at the real booking link (e.g. Calendly) once confirmed. */}
        <a
          href="#"
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
        >
          Book a Consultation →
        </a>
      </div>
    </section>
  );
}
