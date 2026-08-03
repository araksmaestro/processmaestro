import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import { getPostsSorted } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Straight talk on running your business better - automation, no-code systems, and the honest calls behind them, written for the people who run operations.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Process Maestro",
    description:
      "Automation, no-code systems, and the honest calls behind them - for the people who run operations, not the developers who build them.",
    url: "/blog",
    type: "website",
  },
};

// Topic filter chips are visual for now (no client-side filtering yet); the tag
// set is derived from the posts so it stays in sync as content grows.
const CHIPS = ["All", "SmartSuite", "Make.com", "Xano", "Operations", "Automation"];

function PostCard({
  href,
  gradient,
  cover,
  category,
  title,
  excerpt,
  readMinutes,
}: {
  href: string;
  gradient?: 1 | 2 | 3;
  cover?: string;
  category: string;
  title: string;
  excerpt: string;
  readMinutes: number;
}) {
  return (
    <Link href={href} className="blog-card">
      <div className={`blog-cover g${gradient ?? 1}`}>
        {cover && (
          <Image src={cover} alt="" fill sizes="(max-width: 820px) 100vw, 380px" style={{ objectFit: "cover" }} />
        )}
      </div>
      <div className="in">
        <div className="blog-cat">{category}</div>
        <h3>{title}</h3>
        <p className="ex">{excerpt}</p>
        <div className="m">{readMinutes} min read</div>
      </div>
    </Link>
  );
}

export default function BlogIndexPage() {
  const sorted = getPostsSorted();
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Nav variant="dark" active="blog" />

      <main style={{ background: "var(--pm-bg)", color: "var(--pm-ink-1)", overflowX: "hidden" }}>
        <section className="blog-hero" aria-labelledby="blog-hero-heading">
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="inner">
            <div className="pm-eyebrow" style={{ color: "var(--pm-lime-light)" }}>
              Insights
            </div>
            <h1 id="blog-hero-heading">Straight talk on running your business better</h1>
            <p>
              Automation, no-code systems, and the honest calls behind them - written for the
              people who run operations, not the developers who build them.
            </p>
          </div>
        </section>

        <div className="blog-wrap">
          <div className="blog-chips" role="list" aria-label="Filter by topic">
            {CHIPS.map((c) => (
              <span key={c} className="blog-chip" data-on={c === "All"} role="listitem">
                {c}
              </span>
            ))}
          </div>

          {featured && (
            <Link href={`/blog/${featured.slug}`} className="blog-feat">
              <div className={`blog-cover g${featured.gradient ?? 1}`}>
                {featured.cover && (
                  <Image
                    src={featured.cover}
                    alt=""
                    fill
                    sizes="(max-width: 820px) 100vw, 560px"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <span className="tag">Featured</span>
              </div>
              <div className="body">
                <div className="blog-cat">{featured.category}</div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="blog-meta">
                  {featured.dateLabel} · {featured.readMinutes} min read
                </div>
              </div>
            </Link>
          )}

          <div className="blog-grid">
            {rest.map((p) => (
              <PostCard
                key={p.slug}
                href={`/blog/${p.slug}`}
                gradient={p.gradient}
                cover={p.cover}
                category={p.category}
                title={p.title}
                excerpt={p.excerpt}
                readMinutes={p.readMinutes}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
