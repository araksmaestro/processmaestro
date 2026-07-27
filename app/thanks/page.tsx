import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import BookingCompleted from "@/components/consent/BookingCompleted";

// DORMANT — this is the Calendly confirmation-page redirect target. Calendly's
// external redirect requires a PAID plan; the account is currently on Free, so no
// real booking reaches this route yet. Keep the page and its `booking_completed`
// event exactly as-is: the day the plan upgrades and the Calendly redirect is set
// to /thanks, this goes live with no code change. (The interim conversion signal
// is `booking_click`, fired from BookingButton.) Not a bug — do not delete.
//
// Calendly appends invitee name/email as query params. This page never reads,
// renders, logs, or stores them — it stays fully static and out of search results.
export const metadata: Metadata = {
  title: "Booking confirmed",
  robots: { index: false, follow: false },
};

const HEADER_WASH = "radial-gradient(90% 70% at 50% 0%, #3a2560 0%, #2a1642 60%)";

export default function ThanksPage() {
  return (
    <>
      <Nav variant="dark" />
      <BookingCompleted />

      <main
        style={{
          background: HEADER_WASH,
          color: "#fff",
          overflowX: "hidden",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="pm-pad"
          style={{ maxWidth: 620, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              margin: "0 auto 28px",
              background: "rgba(140,220,0,0.14)",
              border: "1px solid rgba(140,220,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12.5l5 5L20 6.5"
                stroke="#8CDC00"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1
            className="pm-display"
            style={{
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: "0 0 16px",
            }}
          >
            Your consultation is booked
          </h1>

          <p style={{ fontSize: 17.5, lineHeight: 1.7, color: "#CBB8E6", margin: "0 0 14px" }}>
            You&rsquo;ll receive a calendar invite with the video-call link by email shortly. If you
            don&rsquo;t see it, check your spam folder.
          </p>
          <p style={{ fontSize: 17.5, lineHeight: 1.7, color: "#CBB8E6", margin: "0 0 36px" }}>
            On the call we&rsquo;ll walk through your current process, where the bottlenecks are, and
            exactly where automation can save you time — no prep needed on your side.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              className="pm-cta-primary pm-display"
              style={{
                textDecoration: "none",
                background: "#8CDC00",
                color: "#22350a",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 26px",
                borderRadius: 11,
                boxShadow: "0 8px 24px rgba(140,220,0,0.3)",
              }}
            >
              Back to home
            </Link>
            <Link
              href="/case-studies"
              className="pm-ghost pm-display"
              style={{
                textDecoration: "none",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 26px",
                borderRadius: 11,
              }}
            >
              Explore case studies
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
