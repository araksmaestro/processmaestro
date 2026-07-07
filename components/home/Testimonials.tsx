"use client";

import { useState } from "react";
import { testimonials, type Testimonial } from "@/content/home";
import TestimonialModal from "@/components/TestimonialModal";

function TestiCard({
  t,
  onOpen,
}: {
  t: Testimonial;
  onOpen: () => void;
}) {
  return (
    <figure
      style={{
        boxSizing: "border-box",
        flex: "none",
        width: 360,
        margin: "0 22px 0 0",
        background: "var(--pm-card-light)",
        border: "1px solid var(--pm-card-border)",
        borderRadius: 20,
        padding: 28,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 16 }}>
        <div
          aria-hidden="true"
          className="pm-display"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--pm-grad-avatar)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          {t.initials}
        </div>
        <figcaption>
          <div className="pm-display" style={{ fontWeight: 600, fontSize: 16, color: "var(--pm-ink-3)" }}>
            {t.name}
          </div>
          <div style={{ fontSize: 13, color: "var(--pm-muted-2)" }}>{t.role}</div>
        </figcaption>
      </div>
      <div
        aria-label="Rated 5 out of 5"
        style={{ color: "var(--pm-amber)", fontSize: 15, letterSpacing: 2, marginBottom: 14 }}
      >
        ★★★★★
      </div>
      <blockquote
        style={{
          fontSize: 15.5,
          lineHeight: 1.6,
          color: "var(--pm-ink-2)",
          margin: "0 0 18px",
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {t.quote}
      </blockquote>
      <button
        type="button"
        onClick={onOpen}
        className="pm-display"
        style={{
          alignSelf: "flex-start",
          background: "none",
          border: "none",
          padding: 0,
          color: "var(--pm-lime-hover)",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Read full testimonial →
      </button>
    </figure>
  );
}

export default function Testimonials() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section aria-labelledby="testimonials-heading" style={{ background: "var(--pm-bg)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }} className="pm-pad">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <div className="pm-eyebrow" style={{ color: "var(--pm-lime-hover)", marginBottom: 14 }}>
            Success stories
          </div>
          <h2
            id="testimonials-heading"
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
            What our clients say
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--pm-muted-1)", margin: 0 }}>
            Businesses of all sizes have transformed their operations and achieved
            remarkable growth.
          </p>
        </div>

        <div className="pm-testi-viewport">
          <div className="pm-testi-track">
            <div className="pm-testi-group" style={{ display: "flex" }}>
              {testimonials.map((t, i) => (
                <TestiCard key={`a-${t.name}`} t={t} onOpen={() => setSelected(i)} />
              ))}
            </div>
            <div
              className="pm-testi-group"
              data-clone="true"
              aria-hidden="true"
              style={{ display: "flex" }}
            >
              {testimonials.map((t, i) => (
                <TestiCard key={`b-${t.name}`} t={t} onOpen={() => setSelected(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <TestimonialModal
        testimonial={selected === null ? null : testimonials[selected]}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
