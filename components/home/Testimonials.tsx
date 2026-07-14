"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/adapters/testimonials";
import TestimonialModal from "@/components/TestimonialModal";

const GAP = 22;
const AUTO_SPEED = 0.5; // px per animation frame (~30px/s) — gentle drift

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
  const n = items.length;

  const [selected, setSelected] = useState<number | null>(null);
  // Copies of the base set rendered back-to-back for a seamless loop. Grown
  // after measuring so the track always overflows the viewport by >= 1 period.
  const [reps, setReps] = useState(3);

  const trackRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef(0); // width of one base-set period (incl. connecting gap)
  const initedRef = useRef(false);
  const hoveringRef = useRef(false);
  const interactingRef = useRef(false);
  const drag = useRef({ startX: 0, startLeft: 0, active: false });
  const movedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep scrollLeft in the middle band [period, 2*period) so it can loop forever
  // in either direction — the jump by one period is invisible (content repeats).
  const wrap = useCallback(() => {
    const el = trackRef.current;
    const p = periodRef.current;
    if (!el || p <= 0) return;
    if (el.scrollLeft >= 2 * p) el.scrollLeft -= p;
    else if (el.scrollLeft < p) el.scrollLeft += p;
  }, []);

  // Measure the period, ensure enough copies to fill the viewport, then center.
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el || n === 0) return;
    const cards = el.querySelectorAll<HTMLElement>(".pm-testi-card");
    if (cards.length < n + 1) return; // need 2 copies to measure one period
    const period = cards[n].offsetLeft - cards[0].offsetLeft;
    if (period <= 0) return;
    periodRef.current = period;
    const needed = Math.ceil((el.clientWidth + 2 * period) / period) + 1;
    if (needed > reps) {
      setReps(needed);
      return; // re-measure after the re-render
    }
    if (!initedRef.current) {
      el.scrollLeft = period;
      initedRef.current = true;
    }
  }, [n, reps]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  // Auto-drift loop. Disabled under reduced motion (manual looping still works).
  useEffect(() => {
    if (n === 0) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const tick = () => {
      const el = trackRef.current;
      if (el && periodRef.current > 0 && !hoveringRef.current && !interactingRef.current) {
        el.scrollLeft += AUTO_SPEED;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n, wrap]);

  const pauseInteract = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    interactingRef.current = true;
  };
  const resumeInteract = (delay: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      interactingRef.current = false;
    }, delay);
  };

  const step = () => {
    const card = trackRef.current?.querySelector<HTMLElement>(".pm-testi-card");
    return (card?.offsetWidth ?? 360) + GAP;
  };
  const scrollByCard = (dir: number) => {
    pauseInteract();
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
    resumeInteract(700);
  };

  // Pointer drag: pauses auto for any pointer; mouse also drives scrollLeft.
  // Capture is deferred to the first real move (>4px) so a plain click reaches
  // the card button (capturing on pointerdown would swallow the click).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pauseInteract();
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
    if (movedRef.current) {
      el.scrollLeft = drag.current.startLeft - dx;
      wrap();
    }
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasMouseDrag = drag.current.active;
    drag.current.active = false;
    const el = trackRef.current;
    el?.classList.remove("pm-dragging");
    if (wasMouseDrag) {
      try {
        el?.releasePointerCapture?.(e.pointerId);
      } catch {
        /* pointer already released */
      }
    }
    // Let touch momentum settle before auto resumes.
    resumeInteract(e.pointerType === "mouse" ? 300 : 800);
  };
  // Suppress the click synthesized after a drag so it doesn't open the modal.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  const onMouseEnter = () => {
    hoveringRef.current = true;
  };
  const onMouseLeave = () => {
    hoveringRef.current = false;
  };

  if (n === 0) return null;

  const rendered = Array.from({ length: reps }, () => items).flat();

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

        <div className="pm-testi-wrap" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <button
            type="button"
            className="pm-testi-arrow pm-testi-prev"
            aria-label="Previous testimonials"
            onClick={() => scrollByCard(-1)}
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div
            ref={trackRef}
            className="pm-testi-scroller"
            tabIndex={0}
            role="group"
            aria-label="Client testimonials"
            onScroll={wrap}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
          >
            {rendered.map((t, i) => (
              <TestiCard key={i} t={t} onOpen={() => setSelected(i % n)} />
            ))}
          </div>

          <button
            type="button"
            className="pm-testi-arrow pm-testi-next"
            aria-label="Next testimonials"
            onClick={() => scrollByCard(1)}
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
