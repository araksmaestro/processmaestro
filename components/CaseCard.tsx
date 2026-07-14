import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/home";

export default function CaseCard({
  href,
  cover,
  category,
  location,
  title,
  summary,
  results,
}: CaseStudy) {
  return (
    <Link
      href={href}
      className="pm-case-card"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--pm-case-bg)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: 190, background: "var(--pm-purple-darkest)" }}>
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 360px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "26px 26px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <span
            className="pm-display"
            style={{
              fontWeight: 600,
              fontSize: 12.5,
              color: "var(--pm-lime)",
              background: "rgba(140,220,0,0.12)",
              border: "1px solid rgba(140,220,0,0.35)",
              padding: "5px 12px",
              borderRadius: 100,
            }}
          >
            {category}
          </span>
          {location && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 13,
                color: "#a99cc2",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: "none" }}>
                <path
                  d="M12 21c4-4.5 7-8.05 7-11a7 7 0 1 0-14 0c0 2.95 3 6.5 7 11Z"
                  fill="#8CDC00"
                  fillOpacity="0.18"
                  stroke="#8CDC00"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.4" fill="#8CDC00" />
              </svg>
              {location}
            </span>
          )}
        </div>
        <h3
          className="pm-display"
          style={{
            fontWeight: 700,
            fontSize: 22,
            lineHeight: 1.22,
            color: "#fff",
            margin: "0 0 12px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "#b4a8c8",
            margin: "0 0 22px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {summary}
        </p>
        {results && results.length > 0 && (
          <div>
            <div
              className="pm-display"
              style={{ fontWeight: 600, fontSize: 13, color: "var(--pm-lime)", marginBottom: 12 }}
            >
              Key Results:
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: "0 0 24px",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {results.map((r) => (
                <li
                  key={r}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 11,
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "#cfc5de",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--pm-lime)",
                      marginTop: 7,
                    }}
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <span
          className="pm-display"
          style={{
            marginTop: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
            fontSize: 15,
            color: "#c4b5f0",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 20,
          }}
        >
          View Case Study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
