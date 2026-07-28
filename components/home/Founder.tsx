import Image from "next/image";

/*
 * TODO (copy): These founder paragraphs are placeholder copy transcribed from the
 * design handoff. Confirm the final wording — and the exact years of experience
 * (handoff says "17 years"; the build brief referenced ~15) — with the client.
 */
export default function Founder() {
  return (
    <section aria-labelledby="founder-heading" style={{ background: "var(--pm-bg)" }}>
      <div
        className="pm-split pm-sec-pad pm-pad"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "96px 32px",
          display: "grid",
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-14px -14px 20px 20px",
              background: "var(--pm-grad-founder-frame)",
              borderRadius: 24,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 420,
              borderRadius: 22,
              overflow: "hidden",
            }}
          >
            <Image
              src="/founder_vasken.jpg"
              alt="Vasken, founder of Process Maestro"
              fill
              sizes="(max-width: 960px) 90vw, 400px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div>
          <div
            className="pm-eyebrow"
            style={{ color: "var(--pm-lime-hover)", marginBottom: 14 }}
          >
            Meet the founder
          </div>
          <h2
            id="founder-heading"
            className="pm-h2 pm-display"
            style={{
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 8px",
              color: "var(--pm-ink-1)",
            }}
          >
            Hi, I&apos;m Vasken
          </h2>
          <div
            style={{
              fontSize: 15,
              color: "var(--pm-muted-2)",
              fontWeight: 600,
              marginBottom: 22,
            }}
          >
            Founder &amp; CEO, Process Maestro
          </div>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--pm-ink-2)",
              margin: "0 0 18px",
            }}
          >
            17 years in tech — developer, team lead, product manager, and founder
            of a software shop. After deep-diving into every corner of building
            software, I found my calling in{" "}
            <strong style={{ color: "var(--pm-purple-primary)" }}>
              workflow design and process automation.
            </strong>
          </p>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--pm-ink-2)",
              margin: 0,
            }}
          >
            My mission is simple: unshackle your business processes and turn noise
            and chaos into a symphony. With the right tools, structured data, and
            well-designed automation, even the most complex operations become a
            game worth playing.
          </p>
        </div>
      </div>
    </section>
  );
}
