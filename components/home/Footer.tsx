import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { serviceNavItems, type ServiceSlug } from "@/content/services";

// The footer lists the services in its own order (per the design), which is not
// the nav's order — but the labels and hrefs still come from the one record set.
const FOOTER_SERVICE_ORDER: ServiceSlug[] = [
  "hourly-consulting",
  "custom-development",
  "fractional-services",
];

const linkStyle = {
  textDecoration: "none",
  color: "var(--pm-on-dark-muted-2)",
  fontSize: 15,
} as const;

const colTitleStyle = {
  fontWeight: 600,
  fontSize: 15,
  color: "#fff",
  marginBottom: 16,
} as const;

export default function Footer() {
  return (
    <footer style={{ background: "var(--pm-footer-bg)", color: "var(--pm-on-dark-2)" }}>
      <div
        className="pm-footer pm-pad"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "68px 32px 40px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
          gap: 40,
        }}
      >
        <div>
          <Image
            src="/pm-logo.png"
            alt="Process Maestro"
            width={108}
            height={32}
            style={{ height: 32, width: "auto", filter: "brightness(0) invert(1)", marginBottom: 16 }}
          />
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--pm-on-dark-muted-1)",
              margin: "0 0 18px",
              maxWidth: 260,
            }}
          >
            Let&apos;s stay in touch.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={`mailto:${SITE.email}`}
              className="pm-social"
              aria-label="Email Process Maestro"
              style={{
                textDecoration: "none",
                width: 38,
                height: 38,
                borderRadius: 9,
                background: "rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--pm-on-dark-2)",
                fontSize: 16,
              }}
            >
              <span aria-hidden="true">✉</span>
            </a>
            <a
              href="https://www.linkedin.com/in/vasken-bakalian/"
              target="_blank"
              rel="noopener noreferrer"
              className="pm-social"
              aria-label="Process Maestro on LinkedIn"
              style={{
                textDecoration: "none",
                width: 38,
                height: 38,
                borderRadius: 9,
                background: "rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--pm-on-dark-2)",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              <span aria-hidden="true">in</span>
            </a>
          </div>
        </div>

        <nav aria-label="General">
          <div className="pm-display" style={colTitleStyle}>
            General
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <a href="#industries" className="pm-footer-link" style={linkStyle}>
              Industries
            </a>
            <Link href="/case-studies" className="pm-footer-link" style={linkStyle}>
              Case Studies
            </Link>
          </div>
        </nav>

        <nav aria-label="Services">
          <div className="pm-display" style={colTitleStyle}>
            Services
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {FOOTER_SERVICE_ORDER.map((slug) => {
              const item = serviceNavItems.find((service) => service.slug === slug);
              if (!item) return null;
              // Plain <a>, not next/link: next/link pushStates, which does not fire
              // `hashchange`, so these would silently fail to switch the tab for
              // someone already on /services.
              return (
                <a key={slug} href={item.href} className="pm-footer-link" style={linkStyle}>
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        <div>
          <div className="pm-display" style={colTitleStyle}>
            Contact Info
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <a href="tel:+37455023420" className="pm-footer-link" style={linkStyle}>
              <span aria-hidden="true">📞</span> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="pm-footer-link" style={linkStyle}>
              <span aria-hidden="true">✉</span> {SITE.email}
            </a>
          </div>
        </div>
      </div>

      {/* Utility row — legal links live here on EVERY page. The withdrawal slot
          is always rendered but hidden by CSS unless consent is granted (see the
          html[data-pm-consent] rule), avoiding any server/client render mismatch. */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px 18px",
          padding: 22,
          fontSize: 13,
          color: "var(--pm-on-dark-muted-3)",
        }}
      >
        <span>© 2026 Process Maestro. All rights reserved.</span>
        <span aria-hidden="true" style={{ opacity: 0.5 }}>
          •
        </span>
        <Link href="/privacy" className="pm-footer-link" style={{ textDecoration: "none", color: "var(--pm-on-dark-muted-1)" }}>
          Privacy Policy
        </Link>
        <span className="pm-withdraw-slot">
          <span aria-hidden="true" style={{ opacity: 0.5, marginRight: 18 }}>
            •
          </span>
          <a
            href="#"
            data-pm-withdraw
            className="pm-footer-link"
            style={{ textDecoration: "none", color: "var(--pm-on-dark-muted-1)" }}
          >
            Turn off analytics
          </a>
        </span>
      </div>
    </footer>
  );
}
