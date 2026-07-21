"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import BookingButton from "@/components/BookingButton";
import {
  DEFAULT_SERVICE,
  resolveServiceSlug,
  services,
  type ServiceSlug,
} from "@/content/services";

const bodyStyle = {
  fontSize: 17,
  lineHeight: 1.75,
  color: "var(--pm-on-dark-7)",
} as const;

export default function ServicePanels() {
  const [activeService, setActiveService] = useState<ServiceSlug>(DEFAULT_SERVICE);

  // The URL hash is the source of truth, and the only interface the nav,
  // footer, and off-page deep links need. The hash never reaches the server,
  // so the first paint is the default and this corrects it on mount.
  useEffect(() => {
    const sync = () => setActiveService(resolveServiceSlug(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const selectService = useCallback((slug: ServiceSlug) => {
    setActiveService(slug);
    window.history.replaceState(null, "", `#${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const active = services.find((s) => s.slug === activeService) ?? services[0];

  return (
    <>
      <div
        style={{
          background: "var(--pm-services-tabbar-bg)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="pm-pad"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "20px 32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="svc-tabs" role="tablist" aria-label="Services">
            {services.map((service) => (
              <button
                key={service.slug}
                type="button"
                role="tab"
                id={`svc-tab-${service.slug}`}
                className="svc-tab"
                aria-selected={service.slug === active.slug}
                aria-controls={`svc-panel-${service.slug}`}
                onClick={() => selectService(service.slug)}
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* One page-level H1 for the whole page. Per-service titles below are H2s,
          so the outline stays single-H1. sr-only keeps the design unchanged while
          giving crawlers and screen readers a clear page heading. */}
      <h1 className="sr-only">
        Process Maestro Services — Hourly Consulting, Fractional Services &amp; Custom
        Development
      </h1>

      {/* Every service panel is rendered so all three are in the server HTML and
          indexable; inactive ones are hidden (display:none) but stay in the DOM. */}
      {services.map((service) => {
        const isActive = service.slug === active.slug;
        return (
          <div
            key={service.slug}
            role="tabpanel"
            id={`svc-panel-${service.slug}`}
            aria-labelledby={`svc-tab-${service.slug}`}
            hidden={!isActive}
          >
            <section style={{ background: "var(--pm-services-bg)" }}>
              <div className="svc-split pm-pad">
                <div className="svc-hero-card">
                  <h2 className="svc-h1">{service.title}</h2>
                  <p
                    style={{
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: "var(--pm-on-dark-4)",
                      margin: "0 0 26px",
                      maxWidth: 440,
                    }}
                  >
                    {service.lead}
                  </p>
                  <p style={{ fontSize: 16, color: "var(--pm-on-dark-6)", margin: "0 0 26px" }}>
                    {service.prompt}
                  </p>
                  <BookingButton
                    label={service.heroCtaLabel}
                    slot="hero"
                    service={service.slug}
                    variant="svc"
                    className="svc-cta pm-display"
                    style={{ alignSelf: "flex-start", padding: "15px 28px" }}
                  />
                </div>

                <div className="svc-hero-media">
                  {/* Priority only on the default (SSR-visible, above-fold) panel:
                      it drives LCP. The hidden panels' images stay lazy so they
                      aren't fetched until their tab is shown. */}
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    priority={service.slug === DEFAULT_SERVICE}
                    sizes="(max-width: 860px) 0px, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </section>

            <section style={{ background: "var(--pm-services-section-bg)" }}>
              <div
                className="pm-pad"
                style={{ maxWidth: 900, margin: "0 auto", padding: "76px 32px 84px" }}
              >
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                  <h3
                    className="pm-display"
                    style={{
                      fontWeight: 700,
                      fontSize: 34,
                      letterSpacing: "-0.01em",
                      margin: "0 0 16px",
                    }}
                  >
                    {service.heading}
                  </h3>
                  <div
                    style={{
                      width: 240,
                      height: 3,
                      background: "var(--pm-lime)",
                      margin: "0 auto",
                      borderRadius: 2,
                    }}
                  />
                </div>

                <p style={{ ...bodyStyle, margin: "0 0 22px" }}>{service.paragraphs[0]}</p>
                <p style={{ ...bodyStyle, margin: "0 0 40px" }}>{service.paragraphs[1]}</p>

                <div
                  style={{
                    background: "var(--pm-services-benefit-bg)",
                    border: "1px solid var(--pm-services-benefit-border)",
                    borderRadius: 18,
                    padding: "34px 38px",
                    marginBottom: 40,
                  }}
                >
                  <h4
                    className="pm-display"
                    style={{ fontWeight: 700, fontSize: 21, margin: "0 0 22px", color: "#fff" }}
                  >
                    {service.benefitTitle}
                  </h4>
                  <ul
                    className="pm-duo"
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          fontSize: 15.5,
                          lineHeight: 1.45,
                          color: "var(--pm-on-dark-5)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            color: "var(--pm-lime)",
                            fontWeight: 700,
                            marginTop: 1,
                          }}
                        >
                          ✓
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <p style={{ ...bodyStyle, margin: "0 0 44px", textAlign: "center" }}>
                  {service.closing}
                </p>

                <div style={{ textAlign: "center" }}>
                  <BookingButton
                    label={service.bottomCtaLabel}
                    slot="section-cta"
                    service={service.slug}
                    variant="svc"
                    className="svc-cta pm-display"
                    style={{ padding: "16px 34px" }}
                  />
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}
