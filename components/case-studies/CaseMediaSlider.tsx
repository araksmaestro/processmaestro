"use client";

import { useState } from "react";
import Image from "next/image";
import type { CaseMedia } from "@/content/case-studies";

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CaseMediaSlider({ media }: { media: CaseMedia[] }) {
  const [index, setIndex] = useState(0);
  const len = media.length;
  const clamp = (n: number) => (len <= 0 ? 0 : ((n % len) + len) % len);
  const go = (n: number) => setIndex(clamp(n));
  const current = clamp(index);
  const multiple = len > 1;

  if (len === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Case study media"
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 50px rgba(10,4,24,0.5)",
        marginBottom: 48,
        background: "#0f0b1c",
      }}
    >
      <div
        style={{
          display: "flex",
          transition: "transform .45s cubic-bezier(.4,0,.2,1)",
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {media.map((m, i) => (
          <div
            key={i}
            aria-hidden={multiple && i !== current}
            style={{
              position: "relative",
              flex: "0 0 100%",
              width: "100%",
              aspectRatio: "16 / 9",
              background: "#0f0b1c",
            }}
          >
            {m.type === "video" ? (
              <video
                src={m.src}
                poster={m.poster}
                controls
                playsInline
                preload="metadata"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  background: "#0f0b1c",
                }}
              />
            ) : (
              <Image
                src={m.src}
                alt={m.alt ?? ""}
                fill
                sizes="(max-width: 900px) 100vw, 800px"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            )}
          </div>
        ))}
      </div>

      {multiple && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className="cd-slider-arrow"
            style={{ left: 14 }}
            onClick={() => go(current - 1)}
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="cd-slider-arrow"
            style={{ right: 14 }}
            onClick={() => go(current + 1)}
          >
            <Arrow dir="right" />
          </button>
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 9,
            }}
          >
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                onClick={() => go(i)}
                style={{
                  width: i === current ? 26 : 9,
                  height: 9,
                  border: "none",
                  borderRadius: 5,
                  padding: 0,
                  cursor: "pointer",
                  background: i === current ? "#8CDC00" : "rgba(255,255,255,0.45)",
                  transition: "width .3s, background .3s",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
