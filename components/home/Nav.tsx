"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const linkStyle = {
  textDecoration: "none",
  color: "var(--pm-muted-3)",
  fontWeight: 500,
  fontSize: 15,
} as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="pm-header">
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
          <a href="#industries" style={linkStyle}>
            Industries
          </a>
          <Link href="/case-studies" style={linkStyle}>
            Case Studies
          </Link>
          <Link href="/services" style={linkStyle}>
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

      {/* Mobile dropdown drawer */}
      <div id="pm-mobile-menu" className={`pm-mobile-menu${open ? " pm-open" : ""}`}>
        <a href="#industries" onClick={close}>
          Industries
        </a>
        <Link href="/case-studies" onClick={close}>
          Case Studies
        </Link>
        <Link href="/services" onClick={close}>
          Services
        </Link>
        <a href="#consult" className="pm-mobile-consult" onClick={close}>
          Free Consultation
        </a>
      </div>
    </header>
  );
}
