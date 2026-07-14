import Link from "next/link";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";

/*
 * Lightweight placeholder for the sibling pages referenced by the homepage.
 * Full Case Studies and Services pages are separate handoffs (out of scope here).
 */
export default function PlaceholderPage({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--pm-lilac)",
        }}
      >
        <div className="pm-pad" style={{ textAlign: "center", maxWidth: 640, padding: "96px 32px" }}>
          <div className="pm-eyebrow" style={{ color: "var(--pm-lime-hover)", marginBottom: 14 }}>
            {eyebrow}
          </div>
          <h1
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
            {title}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--pm-muted-1)", margin: "0 0 28px" }}>
            {blurb}
          </p>
          <Link
            href="/"
            className="pm-cta-primary pm-display"
            style={{
              textDecoration: "none",
              background: "var(--pm-lime)",
              color: "var(--pm-purple-darkest)",
              fontWeight: 600,
              fontSize: 16,
              padding: "14px 26px",
              borderRadius: 12,
              boxShadow: "var(--pm-shadow-cta)",
              display: "inline-block",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
