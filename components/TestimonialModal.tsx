"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type ModalTestimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

type Props = {
  testimonial: ModalTestimonial | null;
  onClose: () => void;
};

export default function TestimonialModal({ testimonial, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!testimonial) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Lock body scroll while the modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [testimonial, onClose]);

  if (!testimonial) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="testi-modal-name"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(30,16,48,0.55)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div
        className="pm-modal-card"
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 24,
          maxWidth: 600,
          width: "100%",
          padding: 44,
          boxShadow: "var(--pm-shadow-modal)",
        }}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close testimonial"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "none",
            background: "#f0eafb",
            color: "var(--pm-purple-primary)",
            fontSize: 24,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
          <div
            aria-hidden="true"
            className="pm-display"
            style={{
              flex: "none",
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
              background: "var(--pm-grad-avatar)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt=""
                width={56}
                height={56}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              testimonial.initials
            )}
          </div>
          <div>
            <div
              id="testi-modal-name"
              className="pm-display"
              style={{ fontWeight: 700, fontSize: 19, color: "var(--pm-ink-3)" }}
            >
              {testimonial.name}
            </div>
            <div style={{ fontSize: 14, color: "var(--pm-muted-2)", marginTop: 2 }}>
              {testimonial.role}
            </div>
          </div>
        </div>
        <div
          aria-label="Rated 5 out of 5"
          style={{ color: "var(--pm-amber)", fontSize: 16, letterSpacing: 3, marginBottom: 18 }}
        >
          ★★★★★
        </div>
        <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: "var(--pm-ink-2)" }}>
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
