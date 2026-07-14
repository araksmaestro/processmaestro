"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/adapters/testimonials";
import TestimonialModal from "@/components/TestimonialModal";

const GAP = 22;

// Display shape derived from the adapter data: initials avatar + "Role, Company".
type DisplayTestimonial = {
  id: string;
  initials: string;
  name: string;
  role: string;
  quote: string;
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function toDisplay(t: Testimonial): DisplayTestimonial {
  return {
    id: t.id,
    initials: initialsFromName(t.name),
    name: t.name,
    role: [t.position, t.company].filter(Boolean).join(", "),
    quote: t.quote,
  };
}

function TestiCard({ t, onOpen }: { t: DisplayTestimonial; onOpen: () => void }) {
  return (
    <figure
      className="pm-testi-card"
      style={{
        boxSizing: "border-box",
        margin: 0,
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

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.map(toDisplay);
  const [selected, setSelected] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startLeft: 0, active: false });
  const movedRef = useRef(false);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // Small tolerance: scroll-snap + the track's 2px side padding mean the
    // resting scrollLeft is a couple px off 0 / the exact max.
    const EPS = 4;
    setPrevDisabled(el.scrollLeft <= EPS);
    setNextDisabled(el.scrollLeft >= el.scrollWidth - el.clientWidth - EPS);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const step = () => {
    const card = trackRef.current?.querySelector<HTMLElement>(".pm-testi-card");
    return (card?.offsetWidth ?? 360) + GAP;
  };
  const scrollByCard = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch is left to native scrolling).
  // Capture + the dragging class are deferred to the first real move (>4px) so a
  // plain click still reaches the card button — capturing on pointerdown would
  // retarget the click to the scroller and swallow it.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft, active: true };
    movedRef.current = false;
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4 && !movedRef.current) {
      movedRef.current = true;
      el.classList.add("pm-dragging");
      el.setPointerCapture?.(e.pointerId);
    }
    if (movedRef.current) el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = trackRef.current;
    el?.classList.remove("pm-dragging");
    try {
      el?.releasePointerCapture?.(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };
  // Suppress the click synthesized after a drag so it doesn't open the modal.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  // Nothing to show (empty or backend error) → render nothing rather than an empty section.
  if (items.length === 0) return null;

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

        <div className="pm-testi-wrap">
          <button
            type="button"
            className="pm-testi-arrow pm-testi-prev"
            aria-label="Previous testimonials"
            onClick={() => scrollByCard(-1)}
            style={{ opacity: prevDisabled ? 0.35 : 1 }}
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div
            ref={trackRef}
            className="pm-testi-scroller"
            tabIndex={0}
            role="group"
            aria-label="Client testimonials"
            onScroll={updateArrows}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
          >
            {items.map((t, i) => (
              <TestiCard key={t.id} t={t} onOpen={() => setSelected(i)} />
            ))}
          </div>

          <button
            type="button"
            className="pm-testi-arrow pm-testi-next"
            aria-label="Next testimonials"
            onClick={() => scrollByCard(1)}
            style={{ opacity: nextDisabled ? 0.35 : 1 }}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <TestimonialModal
        testimonial={selected === null ? null : items[selected]}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
