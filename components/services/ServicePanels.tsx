"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
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

      <div
        role="tabpanel"
        id={`svc-panel-${active.slug}`}
        aria-labelledby={`svc-tab-${active.slug}`}
      >
        <section style={{ background: "var(--pm-services-bg)" }}>
          <div className="svc-split pm-pad">
            <div className="svc-hero-card">
              <h1 className="svc-h1">{active.title}</h1>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--pm-on-dark-4)",
                  margin: "0 0 26px",
                  maxWidth: 440,
                }}
              >
                {active.lead}
              </p>
              <p style={{ fontSize: 16, color: "var(--pm-on-dark-6)", margin: "0 0 26px" }}>
                {active.prompt}
              </p>
              <a
                href={active.heroCta.href}
                className="svc-cta pm-display"
                style={{ alignSelf: "flex-start", padding: "15px 28px" }}
              >
                {active.heroCta.label}
              </a>
            </div>

            <div className="svc-hero-media">
              <Image
                src={active.image.src}
                alt={active.image.alt}
                fill
                priority
                sizes="(max-width: 860px) 100vw, 50vw"
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
              <h2
                className="pm-display"
                style={{
                  fontWeight: 700,
                  fontSize: 34,
                  letterSpacing: "-0.01em",
                  margin: "0 0 16px",
                }}
              >
                {active.heading}
              </h2>
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

            <p style={{ ...bodyStyle, margin: "0 0 22px" }}>{active.paragraphs[0]}</p>
            <p style={{ ...bodyStyle, margin: "0 0 40px" }}>{active.paragraphs[1]}</p>

            <div
              style={{
                background: "var(--pm-services-benefit-bg)",
                border: "1px solid var(--pm-services-benefit-border)",
                borderRadius: 18,
                padding: "34px 38px",
                marginBottom: 40,
              }}
            >
              <h3
                className="pm-display"
                style={{ fontWeight: 700, fontSize: 21, margin: "0 0 22px", color: "#fff" }}
              >
                {active.benefitTitle}
              </h3>
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
                {active.benefits.map((benefit) => (
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
              {active.closing}
            </p>

            <div style={{ textAlign: "center" }}>
              <a
                href={active.bottomCta.href}
                className="svc-cta pm-display"
                style={{ padding: "16px 34px" }}
              >
                {active.bottomCta.label}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
