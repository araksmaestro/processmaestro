"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NavVariant = "light" | "dark";
type NavActive = "industries" | "case-studies" | "services";

export default function Nav({
  variant = "light",
  active,
}: {
  variant?: NavVariant;
  active?: NavActive;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const dark = variant === "dark";
  // On dark (sub-page) headers the in-page anchors point back to the homepage.
  const anchorBase = dark ? "/" : "";
  const baseColor = dark ? "var(--pm-on-dark-1)" : "var(--pm-muted-3)";

  const linkStyle = (isActive: boolean) =>
    ({
      textDecoration: "none",
      color: isActive ? "#fff" : baseColor,
      fontWeight: isActive ? 600 : 500,
      fontSize: 15,
      ...(isActive
        ? { borderBottom: "2px solid var(--pm-lime)", paddingBottom: 2 }
        : null),
    }) as const;

  return (
    <header className={`pm-header${dark ? " pm-header--dark" : ""}`}>
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
            className="pm-logo-img"
          />
        </Link>

        {/* Desktop links */}
        <div className="pm-nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href={`${anchorBase}#industries`} style={linkStyle(active === "industries")}>
            Industries
          </a>
          <Link
            href="/case-studies"
            aria-current={active === "case-studies" ? "page" : undefined}
            style={linkStyle(active === "case-studies")}
          >
            Case Studies
          </Link>
          <Link href="/services" style={linkStyle(active === "services")}>
            Services
          </Link>
          <a
            href={`${anchorBase}#consult`}
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

        {/* Mobile hamburger */}
        <button
          type="button"
          className="pm-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="pm-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile dropdown drawer (active underline intentionally not applied here) */}
      <div id="pm-mobile-menu" className={`pm-mobile-menu${open ? " pm-open" : ""}`}>
        <a href={`${anchorBase}#industries`} onClick={close}>
          Industries
        </a>
        <Link href="/case-studies" onClick={close}>
          Case Studies
        </Link>
        <Link href="/services" onClick={close}>
          Services
        </Link>
        <a href={`${anchorBase}#consult`} className="pm-mobile-consult" onClick={close}>
          Free Consultation
        </a>
      </div>
    </header>
  );
}
