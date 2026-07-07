import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--pm-card-border)",
      }}
    >
      <nav
        className="pm-nav pm-pad"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" aria-label="Process Maestro home" style={{ display: "inline-flex" }}>
          <Image
            src="/pm-logo.png"
            alt="Process Maestro"
            width={115}
            height={34}
            priority
            style={{ height: 34, width: "auto" }}
          />
        </Link>
        <div
          className="pm-nav-links"
          style={{ display: "flex", alignItems: "center", gap: 32 }}
        >
          <a
            href="#industries"
            style={{
              textDecoration: "none",
              color: "var(--pm-muted-3)",
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            Industries
          </a>
          <Link
            href="/case-studies"
            style={{
              textDecoration: "none",
              color: "var(--pm-muted-3)",
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            Case Studies
          </Link>
          <Link
            href="/services"
            style={{
              textDecoration: "none",
              color: "var(--pm-muted-3)",
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            Services
          </Link>
          <a
            href="#consult"
            className="pm-nav-consult pm-display"
            style={{
              textDecoration: "none",
              background: "var(--pm-lime)",
              color: "var(--pm-purple-darkest)",
              fontWeight: 600,
              fontSize: 14,
              padding: "11px 20px",
              borderRadius: 10,
              boxShadow: "0 4px 14px rgba(140,220,0,0.35)",
            }}
          >
            Free Consultation
          </a>
        </div>
      </nav>
    </header>
  );
}
