import type { Metadata } from "next";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Process Maestro collects, uses, and protects personal data through this website — analytics consent, cookies, third parties, retention, and your rights.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Process Maestro",
    description:
      "What personal data Process Maestro collects through this website, why, and your rights over it.",
    url: "/privacy",
    type: "website",
  },
};

const HEADER_WASH = "radial-gradient(90% 60% at 20% 0%, #3a2560 0%, #2a1642 60%)";

export default function PrivacyPage() {
  return (
    <>
      <Nav variant="dark" />

      <main style={{ background: "#2a1642", color: "#fff", overflowX: "hidden" }}>
        {/* ===== Header ===== */}
        <div style={{ background: HEADER_WASH, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="pm-pad" style={{ maxWidth: 820, margin: "0 auto", padding: "60px 32px 44px" }}>
            <div
              className="pm-display"
              style={{
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8CDC00",
                marginBottom: 14,
              }}
            >
              Legal
            </div>
            <h1 className="pm-legal-h1">Privacy Policy</h1>
            <p style={{ fontSize: 15, color: "#B0A0CC", margin: 0 }}>Last updated: 24 July 2026</p>
          </div>
        </div>

        {/* ===== Policy body (approved copy — source of truth, do not edit) ===== */}
        <div className="pm-legal-prose pm-pad" style={{ maxWidth: 820, margin: "0 auto", padding: "44px 32px 80px" }}>
          <h2>1. Who we are</h2>
          <div className="pm-legal-rule" />
          <p>
            Process Maestro provides workflow design and business process automation consulting. This
            policy explains what personal data we collect through this website, why we collect it, and
            what rights you have over it.
          </p>
          <p>
            For the purposes of data protection law, Process Maestro is the data controller for the
            information described here.
          </p>
          <p>
            Contact: <a href="mailto:vasken@processmaestro.co">vasken@processmaestro.co</a>
          </p>

          <h2>2. What we collect</h2>
          <div className="pm-legal-rule" />
          <h3>If you visit the site</h3>
          <p>
            We use Google Analytics to understand how the site is used. This data is pseudonymous. It
            does not tell us who you are.
          </p>
          <p>
            Until you accept analytics cookies, Google Analytics runs in a restricted mode: it sets no
            cookies and cannot identify you, and sends only anonymous, aggregated measurements. If you
            accept, it additionally sets analytics cookies that let us understand return visits and
            journeys through the site. If you decline, it stays in the restricted, cookieless mode.
          </p>
          <h3>If you book a consultation</h3>
          <p>
            Our booking form is provided by Calendly. When you book, you give Calendly your name, email
            address, timezone, and anything you write in the booking form. That information is passed to
            us so we can hold the meeting and contact you about it.
          </p>
          <h3>If you email or call us</h3>
          <p>
            We keep the contents of your message and your contact details so we can reply and, where
            relevant, continue the conversation about working together.
          </p>
          <h3>What we do not collect</h3>
          <p>
            We do not have user accounts, we do not sell anything through this website, and we do not run
            advertising or tracking pixels. We do not sell or rent your personal data to anyone.
          </p>

          <h2>3. Why we use it, and our legal basis</h2>
          <div className="pm-legal-rule" />
          <div className="pm-legal-table-wrap">
            <table className="pm-legal-table">
              <thead>
                <tr>
                  <th className="pm-legal-th">What</th>
                  <th className="pm-legal-th">Why</th>
                  <th className="pm-legal-th">Legal basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pm-legal-td">
                    <strong>Analytics</strong>
                  </td>
                  <td className="pm-legal-td">
                    To see which pages and topics are useful and improve the site
                  </td>
                  <td className="pm-legal-td">Your consent</td>
                </tr>
                <tr>
                  <td className="pm-legal-td">
                    <strong>Booking details</strong>
                  </td>
                  <td className="pm-legal-td">To schedule and hold the meeting you requested</td>
                  <td className="pm-legal-td">
                    To take steps at your request before entering a contract
                  </td>
                </tr>
                <tr>
                  <td className="pm-legal-td">
                    <strong>Emails and enquiries</strong>
                  </td>
                  <td className="pm-legal-td">To reply to you and discuss potential work</td>
                  <td className="pm-legal-td">Our legitimate interest in responding to enquiries</td>
                </tr>
                <tr>
                  <td className="pm-legal-td">
                    <strong>Server logs</strong>
                  </td>
                  <td className="pm-legal-td">Security, diagnosing faults, keeping the site available</td>
                  <td className="pm-legal-td">
                    Our legitimate interest in running a secure, working website
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. Cookies</h2>
          <div className="pm-legal-rule" />
          <p>We use two kinds:</p>
          <h3>Essential</h3>
          <p>A small record of your cookie choice, so we do not ask again on every page.</p>
          <h3>Analytics</h3>
          <p>
            Set by Google Analytics, and only if you accept. These help us count visits and understand
            which content is used.
          </p>
          <p>
            You can withdraw your consent at any time using the &ldquo;Turn off analytics&rdquo; link in
            the site footer. That deletes the analytics cookies and returns Google Analytics to its
            restricted, cookieless mode. You can also clear this site&rsquo;s cookies in your browser
            settings.
          </p>

          <h2>5. Who else sees your data</h2>
          <div className="pm-legal-rule" />
          <p>We use a small number of service providers, and they process data on our behalf:</p>
          <ul>
            <li>
              <strong>Google (Google Analytics)</strong>, for website analytics. Only if you accept
              analytics cookies.
            </li>
            <li>
              <strong>Calendly</strong>, for scheduling consultations.
            </li>
            <li>
              <strong>Vercel</strong>, which hosts this website and processes server logs.
            </li>
          </ul>
          <p>
            We do not share your personal data with anyone else, except where we are legally required to.
          </p>

          <h2>6. Where your data goes and how long we keep it</h2>
          <div className="pm-legal-rule" />
          <p>
            Google, Calendly, and Vercel are based in the United States, so your data may be transferred
            outside the UK and European Economic Area. These transfers rely on the safeguards those
            providers put in place, including standard contractual clauses and, where applicable, the
            EU-US and UK-US Data Privacy Framework.
          </p>
          <h3>Retention</h3>
          <ul>
            <li>
              <strong>Analytics data:</strong> kept for 14 months, then automatically deleted by Google.
            </li>
            <li>
              <strong>Booking and enquiry data:</strong> kept for as long as we are in contact about
              potential or ongoing work, and for a reasonable period afterwards for our business records.
            </li>
            <li>
              <strong>Server logs:</strong> kept for a short period by our hosting provider for security
              and diagnostics.
            </li>
          </ul>

          <h2>7. Your rights</h2>
          <div className="pm-legal-rule" />
          <p>Wherever you are, you can ask us to:</p>
          <ul>
            <li>tell you what personal data we hold about you, and give you a copy</li>
            <li>correct anything inaccurate</li>
            <li>delete your data</li>
            <li>restrict how we use it</li>
            <li>
              stop analytics at any time, without affecting anything done before you withdrew consent
            </li>
          </ul>
          <p>
            To exercise any of these, email{" "}
            <a href="mailto:vasken@processmaestro.co">vasken@processmaestro.co</a>. We will respond within
            one month.
          </p>

          <h2>8. Children</h2>
          <div className="pm-legal-rule" />
          <p>
            This website is aimed at businesses and is not directed at children. We do not knowingly
            collect data from anyone under 16.
          </p>

          <h2>9. Changes to this policy</h2>
          <div className="pm-legal-rule" />
          <p>
            If we change how we handle personal data, we will update this page and change the date at the
            top. If the change is significant, we will make that clear.
          </p>

          <h2>10. Contact</h2>
          <div className="pm-legal-rule" />
          <p>Questions about this policy or about your data:</p>
          <p>
            Email: <a href="mailto:vasken@processmaestro.co">vasken@processmaestro.co</a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
