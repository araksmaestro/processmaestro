"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serviceNavItems } from "@/content/services";

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
  const [servicesOpen, setServicesOpen] = useState(false);
  // Expanded by default so the three services are visible without an extra tap.
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const servicesRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setServicesOpen(false);
  }, []);

  // Escape closes whichever menu is open.
  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, servicesOpen, close]);

  // Outside click closes the desktop dropdown.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  // The panel is a <=760px affordance; widening past it strands an open panel.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 761px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const dark = variant === "dark";
  // On dark (sub-page) headers the in-page anchors point back to the homepage.
  const anchorBase = dark ? "/" : "";
  const baseColor = dark ? "var(--pm-on-dark-1)" : "var(--pm-muted-3)";
  const servicesActive = active === "services";

  const linkBase = (isActive: boolean) =>
    ({
      textDecoration: "none",
      color: isActive ? "#fff" : baseColor,
      fontWeight: isActive ? 600 : 500,
      fontSize: 15,
    }) as const;

  const linkStyle = (isActive: boolean) =>
    ({
      ...linkBase(isActive),
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

          {/* Services + dropdown — ships to every page, independent of the
              Services page's tab state. The hash is the only interface. */}
          <div
            className="pm-nav-services"
            ref={servicesRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span className="pm-nav-services-face" data-active={servicesActive}>
              <Link
                href="/services"
                aria-current={servicesActive ? "page" : undefined}
                style={linkBase(servicesActive)}
              >
                Services
              </Link>
              {/* Separate control so hover isn't the only way in (touch + keyboard). */}
              <button
                type="button"
                className="pm-nav-caret"
                aria-label="Toggle services menu"
                aria-expanded={servicesOpen}
                aria-controls="pm-services-menu"
                style={{ color: servicesActive ? "#fff" : baseColor }}
                onClick={() => setServicesOpen((v) => !v)}
              >
                <span aria-hidden="true">▾</span>
              </button>
            </span>

            <div id="pm-services-menu" className="pm-services-menu" data-open={servicesOpen}>
              {serviceNavItems.map((item) => (
                // Plain <a>: a same-document hash change fires `hashchange`, which is
                // what the Services page listens on. next/link would pushState instead.
                <a key={item.slug} href={item.href} onClick={() => setServicesOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

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
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="pm-mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </nav>

      {/* Mobile panel (<=760px) */}
      {open && (
        <>
          <div className="pm-mobile-backdrop" onClick={close} aria-hidden="true" />
          <div
            id="pm-mobile-menu"
            className="pm-mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="pm-mobile-head">
              <Link href="/" onClick={close} aria-label="Process Maestro home">
                {/* The logo asset already carries the wordmark. */}
                <Image
                  src="/pm-logo.png"
                  alt="Process Maestro"
                  width={108}
                  height={32}
                  className="pm-mobile-logo"
                />
              </Link>
              <button
                type="button"
                className="pm-mobile-close"
                aria-label="Close menu"
                onClick={close}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <nav className="pm-mobile-body" aria-label="Mobile">
              <a href={`${anchorBase}#industries`} className="pm-mobile-link" onClick={close}>
                Industries
              </a>
              <Link href="/case-studies" className="pm-mobile-link" onClick={close}>
                Case Studies
              </Link>

              {/* Services owns its three sub-items rather than listing them as siblings. */}
              <div className="pm-mobile-group">
                <div className="pm-mobile-group-head">
                  <Link href="/services" className="pm-mobile-link" onClick={close}>
                    Services
                  </Link>
                  <button
                    type="button"
                    className="pm-mobile-caret"
                    aria-label="Toggle services"
                    aria-expanded={mobileServicesOpen}
                    aria-controls="pm-mobile-services"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    <span aria-hidden="true">⌄</span>
                  </button>
                </div>
                {mobileServicesOpen && (
                  <div id="pm-mobile-services" className="pm-mobile-sub">
                    {serviceNavItems.map((item) => (
                      <a key={item.slug} href={item.href} onClick={close}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href={`${anchorBase}#consult`} className="pm-mobile-consult" onClick={close}>
                Free Consultation
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
