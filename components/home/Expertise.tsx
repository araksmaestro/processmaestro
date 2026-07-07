"use client";

import { useState } from "react";
import { expertise } from "@/content/home";

export default function Expertise() {
  const [active, setActive] = useState(0);

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

        <div className="pm-exp-widget">
          {/* Selector list */}
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
                aria-selected={active === i}
                aria-controls={`exp-panel-${i}`}
                data-active={active === i}
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

          {/* Detail panel — all items stacked in one grid cell so height is
              locked to the tallest item (zero layout shift on switch). */}
          <div className="pm-exp-panel">
            {expertise.map((item, i) => (
              <div
                key={item.name}
                id={`exp-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`exp-tab-${i}`}
                aria-hidden={active !== i}
                data-active={active === i}
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
      </div>
    </section>
  );
}
