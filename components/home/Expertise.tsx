"use client";

import { useEffect, useState } from "react";
import { expertise } from "@/content/home";

export default function Expertise() {
  // activeIndex drives both layouts. null = all-collapsed (mobile only);
  // the desktop panel falls back to item 0 when null.
  const [active, setActive] = useState<number | null>(0);
  const desktopIndex = active ?? 0;

  // The desktop panel is server-rendered (it carries the h3 + description for
  // each area). The mobile accordion is the SAME content in a different DOM, so
  // to avoid every expertise description appearing twice in the server HTML it's
  // mounted client-side only. CSS still decides which is visible per breakpoint.
  const [mounted, setMounted] = useState(false);
  // Mount gate so the client-only mobile accordion doesn't duplicate the SSR
  // panel's descriptions in the server HTML.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="services"
      aria-labelledby="expertise-heading"
      style={{ background: "var(--pm-lilac)" }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }} className="pm-pad">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <div className="pm-eyebrow" style={{ color: "var(--pm-lime-hover)", marginBottom: 14 }}>
            What we do
          </div>
          <h2
            id="expertise-heading"
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
            Core expertise
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--pm-muted-1)", margin: 0 }}>
            Where strategy meets execution, and your workflows start running on
            autopilot.
          </p>
        </div>

        {/* ===== Desktop: selector list + shared detail panel (> 820px) ===== */}
        <div className="pm-exp-desktop">
          <div
            role="tablist"
            aria-label="Core expertise areas"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {expertise.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`exp-tab-${i}`}
                aria-selected={desktopIndex === i}
                aria-controls={`exp-panel-${i}`}
                data-active={desktopIndex === i}
                className="pm-exp-btn"
                onClick={() => setActive(i)}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }} aria-hidden="true">
                  {item.icon}
                </span>
                <span className="pm-display" style={{ fontWeight: 600, fontSize: 16 }}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          {/* All items stacked in one grid cell → panel height is locked to the
              tallest item natively (zero layout shift, no JS measuring). */}
          <div className="pm-exp-panel">
            {expertise.map((item, i) => (
              <div
                key={item.name}
                id={`exp-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`exp-tab-${i}`}
                aria-hidden={desktopIndex !== i}
                data-active={desktopIndex === i}
                className="pm-exp-item"
              >
                <div
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: 76,
                    height: 76,
                    borderRadius: 18,
                    background: "linear-gradient(140deg, #f0eafb, #e4d8f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 34,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="pm-display"
                    style={{
                      fontWeight: 700,
                      fontSize: 26,
                      margin: "0 0 14px",
                      color: "var(--pm-ink-3)",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--pm-muted-4)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Mobile: accordion, one open at a time (<= 820px) =====
            Client-only so its descriptions don't duplicate the desktop panel's
            in the server HTML. */}
        {mounted && (
        <div className="pm-exp-mobile">
          {expertise.map((item, i) => {
            const open = active === i;
            return (
              <div key={item.name} className="pm-acc-row" data-open={open}>
                <button
                  type="button"
                  className="pm-acc-header"
                  aria-expanded={open}
                  aria-controls={`acc-body-${i}`}
                  onClick={() => setActive(open ? null : i)}
                >
                  <span style={{ fontSize: 20, lineHeight: 1 }} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="pm-acc-name">{item.name}</span>
                  <span className="pm-acc-chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>
                <div id={`acc-body-${i}`} role="region" aria-label={item.name} className="pm-acc-body">
                  <div className="pm-acc-body-inner">
                    <p className="pm-acc-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
