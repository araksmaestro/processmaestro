import BookingButton from "@/components/BookingButton";

const HERO_PILLS = [
  "Hourly Consulting",
  "Fractional Services",
  "Retainer Model",
  "Custom Solution",
];

const STEPS = [
  {
    label: "Step 1 · Discover",
    title: "Map how you actually work",
    top: 300,
    delay: "0s",
    highlight: false,
  },
  {
    label: "Step 2 · Design",
    title: "Model the ideal process (BPMN)",
    top: 190,
    delay: "0.8s",
    highlight: false,
  },
  {
    label: "Step 3 · Automate",
    title: "Ship it — and it runs itself",
    top: 78,
    delay: "1.6s",
    highlight: true,
  },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position: "relative",
        background: "var(--pm-grad-hero)",
        color: "var(--pm-on-dark)",
        overflow: "hidden",
      }}
    >
      {/* dot-grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="pm-split pm-hero-pad pm-pad"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "88px 32px 96px",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 56,
          alignItems: "center",
          position: "relative",
        }}
      >
        <div className="pm-hero-copy">
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
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              padding: "7px 14px",
              borderRadius: 100,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--pm-lime)",
                boxShadow: "0 0 10px var(--pm-lime)",
              }}
            />
            Process Optimization Experts
          </div>
          <h1
            id="hero-heading"
            className="pm-h1 pm-display"
            style={{
              fontWeight: 700,
              fontSize: 58,
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              margin: "0 0 22px",
            }}
          >
            Workflow <span style={{ color: "var(--pm-lime)" }}>Design</span>
            {" & "}Business Process{" "}
            <span style={{ color: "var(--pm-lime)" }}>Automation</span>
          </h1>
          <p
            className="pm-hero-subhead"
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--pm-on-dark-1)",
              maxWidth: 520,
              margin: "0 0 34px",
            }}
          >
            We orchestrate the full cycle from discovery to implementation to
            training and maintenance.
          </p>
          <div
            className="pm-hero-ctas"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginBottom: 40,
            }}
          >
            <BookingButton
              label="Free Consultation →"
              slot="hero"
              service="general"
              variant="primary"
              className="pm-cta-primary pm-display"
              style={{
                textDecoration: "none",
                background: "var(--pm-lime)",
                color: "var(--pm-purple-darkest)",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 28px",
                borderRadius: 12,
                boxShadow: "var(--pm-shadow-cta)",
              }}
            />
            <a
              href="#cases"
              className="pm-ghost pm-display"
              style={{
                textDecoration: "none",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "var(--pm-on-dark)",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 28px",
                borderRadius: 12,
              }}
            >
              View Case Studies
            </a>
          </div>
          <ul
            className="pm-hero-pills"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {HERO_PILLS.map((pill) => (
              <li
                key={pill}
                style={{
                  fontSize: 13,
                  color: "var(--pm-on-dark-2)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  padding: "8px 14px",
                  borderRadius: 100,
                }}
              >
                ✓ {pill}
              </li>
            ))}
          </ul>
        </div>

        {/* process-flow motif */}
        <div
          className="pm-hero-motif"
          aria-hidden="true"
          style={{ position: "relative", height: 440 }}
        >
          <svg
            viewBox="0 0 60 400"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: 40,
              top: 20,
              height: 360,
              width: 60,
              overflow: "visible",
            }}
          >
            <path
              d="M30 380 L30 20"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={2}
              fill="none"
            />
            <path
              className="pm-anim-dash"
              d="M30 380 L30 20"
              stroke="var(--pm-lime)"
              strokeWidth={3}
              fill="none"
              strokeDasharray="10 8"
            />
          </svg>
          <div
            className="pm-anim-twinkle"
            style={{
              position: "absolute",
              top: 6,
              right: 8,
              color: "var(--pm-amber)",
              fontSize: 30,
            }}
          >
            ✦
          </div>
          <div
            className="pm-anim-twinkle"
            style={{
              position: "absolute",
              top: 34,
              right: 44,
              color: "var(--pm-amber)",
              fontSize: 18,
              animationDuration: "3.6s",
              animationDelay: "0.5s",
            }}
          >
            ✦
          </div>

          {STEPS.map((step) => (
            <div
              key={step.label}
              className="pm-anim-floaty"
              style={{
                position: "absolute",
                left: 20,
                right: 20,
                top: step.top,
                background: step.highlight
                  ? "linear-gradient(120deg, rgba(140,220,0,0.18), rgba(140,220,0,0.06))"
                  : "rgba(255,255,255,0.06)",
                border: step.highlight
                  ? "1px solid rgba(140,220,0,0.4)"
                  : "1px solid rgba(255,255,255,0.14)",
                borderRadius: 16,
                padding: "16px 18px",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                animationDelay: step.delay,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--pm-lime-light)",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {step.label}
              </div>
              <div
                className="pm-display"
                style={{ fontWeight: 600, fontSize: 17 }}
              >
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
