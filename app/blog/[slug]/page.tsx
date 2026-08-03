import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import BookingButton from "@/components/BookingButton";
import { SITE, SITE_URL } from "@/lib/site";
import { ORG_ID, PERSON_ID } from "@/lib/jsonld";
import { getPost, getAllSlugs, posts, AUTHORS, DEFAULT_AUTHOR } from "@/content/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog" };
  const author = AUTHORS[post.author ?? DEFAULT_AUTHOR] ?? AUTHORS[DEFAULT_AUTHOR];
  const images = [{ url: SITE.ogCard, width: 1200, height: 630, alt: post.title }];
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Process Maestro`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [author.name],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Process Maestro`,
      description: post.excerpt,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const authorKey = post.author ?? DEFAULT_AUTHOR;
  const author = AUTHORS[authorKey] ?? AUTHORS[DEFAULT_AUTHOR];
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      ...(authorKey === "vasken" ? { "@id": PERSON_ID } : {}),
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@id": ORG_ID,
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/pm-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}${SITE.ogCard}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav variant="dark" active="blog" />

      <main style={{ background: "var(--pm-bg)", color: "var(--pm-ink-1)", overflowX: "hidden" }}>
        <article>
          <header className="blog-art-hero">
            <div className="inner">
              <nav className="blog-crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link> › <Link href="/blog">Blog</Link> › {post.title}
              </nav>
              <div className="blog-cat">{post.category}</div>
              <h1>{post.title}</h1>
              <div className="blog-art-meta">
                <span className="blog-av" aria-hidden="true">
                  {author.photo ? (
                    <Image
                      src={author.photo}
                      alt=""
                      width={38}
                      height={38}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    author.initials
                  )}
                </span>
                <span>
                  <strong style={{ color: "var(--pm-ink-1)" }}>{author.name}</strong> ·{" "}
                  {author.byline}
                </span>
                <span className="blog-dot" aria-hidden="true" />
                <span>{post.readMinutes} min read</span>
                <span className="blog-dot" aria-hidden="true" />
                <span>{post.dateLabel}</span>
              </div>
            </div>
          </header>

          <div className="blog-prose">
            {/* Trusted, hand-authored markup (see content/blog.ts). */}
            <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

            <aside className="blog-author">
              <div className="av" aria-hidden="true">
                {author.photo ? (
                  <Image
                    src={author.photo}
                    alt=""
                    width={52}
                    height={52}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  author.initials
                )}
              </div>
              <div>
                <div className="nm">{author.name}</div>
                <div className="rl">{author.role}</div>
                <p>{author.bio}</p>
              </div>
            </aside>

            <div className="blog-artcta">
              <div>
                <h3>Not sure which tools your business actually needs?</h3>
                <p>
                  Book a free 30-minute consult. We&apos;ll diagnose the problem first - and tell
                  you honestly what it&apos;ll take.
                </p>
              </div>
              <BookingButton
                label="Book a Consultation →"
                slot="section-cta"
                service="general"
                variant="dark"
                className="pm-display"
                style={{
                  flex: "none",
                  background: "var(--pm-purple-darkest)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 16,
                  padding: "15px 28px",
                  borderRadius: 12,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="blog-related" aria-labelledby="blog-related-heading">
            <h4 id="blog-related-heading">Keep reading</h4>
            <div className="blog-grid" style={{ padding: 0 }}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                  <div className={`blog-cover g${p.gradient ?? 1}`}>
                    {p.cover && (
                      <Image src={p.cover} alt="" fill sizes="(max-width: 820px) 100vw, 380px" style={{ objectFit: "cover" }} />
                    )}
                  </div>
                  <div className="in">
                    <div className="blog-cat">{p.category}</div>
                    <h3>{p.title}</h3>
                    <p className="ex">{p.excerpt}</p>
                    <div className="m">{p.readMinutes} min read</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
