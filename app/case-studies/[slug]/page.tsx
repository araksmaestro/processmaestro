import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import CaseMediaSlider from "@/components/case-studies/CaseMediaSlider";
import BookingButton from "@/components/BookingButton";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/adapters/case-studies";
import { SITE, SITE_URL } from "@/lib/site";
import { caseBreadcrumbJsonLd } from "@/lib/jsonld";

// Revalidate so newly published / edited case studies appear without a redeploy.
export const revalidate = 30;

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  if (!c) return { title: "Case Study" };
  // Prefer the case study's own cover for the social card; fall back to the
  // site default (resolved to absolute via metadataBase).
  const cover = c.media[0]?.src;
  const images = cover
    ? [{ url: cover, alt: c.title }]
    : [{ url: SITE.ogCard, width: 1200, height: 630, alt: SITE.name }];
  return {
    title: c.title,
    description: c.subhead,
    alternates: { canonical: `/case-studies/${c.slug}` },
    openGraph: {
      title: `${c.title} | Process Maestro`,
      description: c.subhead,
      url: `/case-studies/${c.slug}`,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.title} | Process Maestro`,
      description: c.subhead,
      images,
    },
  };
}

const PAGE_BG = "#171226";
const HERO_WASH = "radial-gradient(90% 60% at 20% 0%, #241a3d 0%, #171226 60%)";

/* ---- inline icons (lime stroke) ---- */
const MapPin = () => (
  <svg width="13" height="15" viewBox="0 0 12 14" fill="none" style={{ flex: "none" }} aria-hidden="true">
    <path
      d="M6 0.5C3.1 0.5 0.75 2.85 0.75 5.75c0 3.6 4.5 7.4 4.7 7.56a0.85 0.85 0 0 0 1.1 0c0.2-0.16 4.7-3.96 4.7-7.56C11.25 2.85 8.9 0.5 6 0.5Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
      fill="#8CDC00"
    />
  </svg>
);
const ClientIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#8CDC00" strokeWidth="1.8" />
    <path d="M5 20a7 7 0 0 1 14 0" stroke="#8CDC00" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const ClockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="#8CDC00" strokeWidth="1.8" />
    <path d="M12 7v5l3.5 2" stroke="#8CDC00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const AboutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="#8CDC00" strokeWidth="1.8" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" stroke="#8CDC00" strokeWidth="1.8" />
  </svg>
);
const ChallengeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3.5l9 15.5H3l9-15.5Z" stroke="#8CDC00" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 10v4M12 16.5v.5" stroke="#8CDC00" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const SolutionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10.3 4.3a2.4 2.4 0 0 1 3.4 0l.5.5a2.4 2.4 0 0 0 2 .7l.7-.1a2.4 2.4 0 0 1 2.5 2.4v.7a2.4 2.4 0 0 0 .9 1.9l.5.4a2.4 2.4 0 0 1 0 3.4l-.5.5a2.4 2.4 0 0 0-.7 2v.7a2.4 2.4 0 0 1-2.4 2.5h-.7a2.4 2.4 0 0 0-1.9.9l-.4.5a2.4 2.4 0 0 1-3.4 0l-.5-.5a2.4 2.4 0 0 0-2-.7l-.7.1a2.4 2.4 0 0 1-2.5-2.4v-.7a2.4 2.4 0 0 0-.9-1.9l-.5-.4a2.4 2.4 0 0 1 0-3.4l.5-.5a2.4 2.4 0 0 0 .7-2v-.7a2.4 2.4 0 0 1 2.4-2.5h.7a2.4 2.4 0 0 0 1.9-.9l.4-.5Z"
      stroke="#8CDC00"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="12" r="3" stroke="#8CDC00" strokeWidth="1.6" />
  </svg>
);
const ChartIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 19c8 0 13-4 15-15M14 4h6v6" stroke="#8CDC00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ToolsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.3-.6-.6-2.3 2.3-2.5Z"
      stroke="#8CDC00"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);
const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flex: "none", marginTop: 1 }} aria-hidden="true">
    <circle cx="12" cy="12" r="9.2" stroke="#8CDC00" strokeWidth="1.6" />
    <path d="M8 12l2.6 2.6L16 9" stroke="#8CDC00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flex: "none", marginTop: 1 }} aria-hidden="true">
    <path d="M5 20V10M12 20V4M19 20v-7" stroke="#8CDC00" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function SectionH2({ icon, children, mb = 16 }: { icon: React.ReactNode; children: React.ReactNode; mb?: number }) {
  return (
    <h2
      className="pm-display"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontWeight: 700,
        fontSize: 25,
        margin: `0 0 ${mb}px`,
        color: "#fff",
      }}
    >
      {icon}
      {children}
    </h2>
  );
}

const paragraphStyle = { fontSize: 16.5, lineHeight: 1.7, color: "#B4A8C8", margin: 0 } as const;

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  if (!c) notFound();

  // Alias so the existing markup keeps using cs.* (card fields) and d.* (detail
  // fields); CaseStudyFull is flat and carries both sets.
  const cs = c;
  const d = c;

  // Conditional rendering: only render sections/elements whose data is present,
  // so cases with sparse content (and SmartSuite records with empty fields later)
  // never show empty headings, blank cards, or dangling dividers.
  const hasMeta = Boolean(d.client || d.duration);
  const hasOutcomes = d.resultCards.length > 0;
  const hasTestimonial = Boolean(d.testimonial && d.testimonial.quote);
  const hasKeyOutcomesCard = hasOutcomes || hasTestimonial;

  // Article structured data — makes each case study eligible for rich results.
  // Absolute image URL (media src is a same-origin proxy path); no date fields
  // exist on the record, so those are intentionally omitted rather than faked.
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.subhead,
    image: c.media[0]?.src ? `${SITE_URL}${c.media[0].src}` : `${SITE_URL}/pm-logo.png`,
    ...(c.category ? { articleSection: c.category } : null),
    author: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/pm-logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/case-studies/${c.slug}`,
    },
  };

  const breadcrumbLd = caseBreadcrumbJsonLd(c.title, c.slug);

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
      <Nav variant="dark" active="case-studies" />

      <div style={{ background: PAGE_BG, color: "#fff", overflowX: "hidden" }}>
        {/* ===== Hero wash ===== */}
        <div style={{ background: HERO_WASH }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px 0" }} className="pm-pad">
            <Link
              href="/case-studies"
              className="cd-backlink"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                textDecoration: "none",
                color: "#B4A8C8",
                fontSize: 14.5,
                fontWeight: 500,
                marginBottom: 30,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Case Studies
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
              <span className="pm-display" style={{ fontWeight: 600, fontSize: 14, color: "var(--pm-lime)" }}>
                {cs.category}
              </span>
              {cs.location && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#A99CC2" }}>
                  <MapPin />
                  {cs.location}
                </span>
              )}
            </div>

            <h1 className="cd-h1 pm-display">{cs.title}</h1>
            {d.subhead && (
              <p style={{ fontSize: 18, color: "#C4B5DB", margin: "0 0 26px", maxWidth: 680 }}>{d.subhead}</p>
            )}

            {d.heroStat && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 16,
                  background: "rgba(140,220,0,0.1)",
                  border: "1px solid rgba(140,220,0,0.3)",
                  borderRadius: 16,
                  padding: "18px 26px",
                  margin: "0 0 30px",
                }}
              >
                <span className="pm-display" style={{ fontWeight: 700, fontSize: 40, lineHeight: 1, color: "var(--pm-lime)" }}>
                  {d.heroStat.value}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.4, color: "#C4B5DB", maxWidth: 220 }}>{d.heroStat.label}</span>
              </div>
            )}

            {hasMeta && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 28,
                  paddingBottom: 44,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {d.client && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 15, color: "#D8CCEA" }}>
                    <ClientIcon />
                    <span style={{ color: "#A99CC2" }}>Client:</span> {d.client}
                  </span>
                )}
                {d.duration && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 15, color: "#D8CCEA" }}>
                    <ClockIcon />
                    <span style={{ color: "#A99CC2" }}>Duration:</span> {d.duration}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== Body grid ===== */}
        <div className="cd-main pm-pad">
          {/* LEFT — article */}
          <article>
            {d.media.length > 0 && <CaseMediaSlider media={d.media} />}

            {d.aboutClient && (
              <section style={{ marginBottom: 44 }} aria-label="About the Client">
                <SectionH2 icon={<AboutIcon />}>About the Client</SectionH2>
                <p style={paragraphStyle}>{d.aboutClient}</p>
              </section>
            )}

            {d.challenge && (
              <section style={{ marginBottom: 44 }} aria-label="The Challenge">
                <SectionH2 icon={<ChallengeIcon />}>The Challenge</SectionH2>
                <p style={paragraphStyle}>{d.challenge}</p>
              </section>
            )}

            {d.solution.length > 0 && (
            <section style={{ marginBottom: 44 }} aria-label="The Solution">
              <SectionH2 icon={<SolutionIcon />} mb={18}>
                The Solution
              </SectionH2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 15 }}>
                {d.solution.map((s) => (
                  <li
                    key={s.tool}
                    style={{ display: "flex", alignItems: "flex-start", gap: 13, fontSize: 16, lineHeight: 1.55, color: "#CFC5DE" }}
                  >
                    <CheckIcon />
                    <span>
                      <strong style={{ color: "#fff", fontWeight: 600 }}>{s.tool}</strong> — {s.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            )}

            {d.resultCards.length > 0 && (
            <section style={{ marginBottom: 44 }} aria-label="The Results">
              <SectionH2 icon={<ChartIcon />} mb={18}>
                The Results
              </SectionH2>
              <div className="cd-duo">
                {d.resultCards.map((r) => (
                  <div
                    key={r.text}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 13,
                      background: "var(--pm-case-bg)",
                      border: "1px solid rgba(140,220,0,0.18)",
                      borderRadius: 14,
                      padding: "20px 22px",
                    }}
                  >
                    <BarIcon />
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: "#E4DCF0" }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </section>
            )}

            {d.tools.length > 0 && (
            <section style={{ marginBottom: 20 }} aria-label="Tools Used">
              <SectionH2 icon={<ToolsIcon />} mb={18}>
                Tools Used
              </SectionH2>
              <div className="cd-duo">
                {d.tools.map((t) => (
                  <div
                    key={t.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      background: "var(--pm-case-bg)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      padding: "18px 22px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flex: "none",
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        background: "rgba(140,220,0,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 17,
                      }}
                    >
                      {t.icon}
                    </span>
                    <span className="pm-display" style={{ fontWeight: 600, fontSize: 15.5, color: "#E4DCF0" }}>
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            )}
          </article>

          {/* RIGHT — sticky sidebar */}
          <aside className="cd-aside">
            {hasKeyOutcomesCard && (
              <div
                style={{
                  background: "var(--pm-case-bg)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  padding: 26,
                }}
              >
                {hasOutcomes && (
                  <>
                    <h3
                      className="pm-display"
                      style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, margin: "0 0 20px", color: "#fff" }}
                    >
                      <ChartIcon size={20} />
                      Key Outcomes
                    </h3>
                    <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                      {d.resultCards.map((r) => (
                        <li
                          key={r.text}
                          style={{ display: "flex", alignItems: "flex-start", gap: 11, fontSize: 14.5, lineHeight: 1.5, color: "#CFC5DE" }}
                        >
                          <CheckIcon size={18} />
                          <span>{r.text}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {hasTestimonial && (
                  <div style={hasOutcomes ? { borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 } : undefined}>
                    <div
                      aria-label={`Rated ${d.testimonial.rating ?? 5} out of 5`}
                      style={{ color: "var(--pm-lime)", fontSize: 14, letterSpacing: 2, marginBottom: 12 }}
                    >
                      ★★★★★
                    </div>
                    <blockquote style={{ margin: "0 0 16px", fontSize: 14.5, lineHeight: 1.6, fontStyle: "italic", color: "#CFC5DE" }}>
                      &ldquo;{d.testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="pm-display" style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>
                      {d.testimonial.author}
                    </div>
                    {d.testimonial.org && <div style={{ fontSize: 13, color: "#A99CC2" }}>{d.testimonial.org}</div>}
                  </div>
                )}
              </div>
            )}

            <div
              style={{
                background: "linear-gradient(150deg, #3a2560, #2a1748)",
                border: "1px solid rgba(140,220,0,0.25)",
                borderRadius: 20,
                padding: 26,
              }}
            >
              <h3 className="pm-display" style={{ fontWeight: 700, fontSize: 19, lineHeight: 1.25, margin: "0 0 8px", color: "#fff" }}>
                Want to Launch Campaigns Without Lifting a Finger?
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#C4B5DB", margin: "0 0 20px" }}>
                Let&apos;s build your custom ad engine.
              </p>
              <BookingButton
                label="Book a free consultation"
                slot="section-cta"
                service="general"
                variant="primary"
                className="pm-cta-primary pm-display"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "var(--pm-lime)",
                  color: "var(--pm-purple-darkest)",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: 14,
                  borderRadius: 11,
                  boxShadow: "0 8px 20px rgba(140,220,0,0.3)",
                }}
              />
            </div>
          </aside>
        </div>

        {/* ===== Explore more CTA band ===== */}
        <section
          aria-labelledby="cd-cta-heading"
          style={{ background: "var(--pm-grad-cta)", color: "#22350a", marginTop: 72 }}
        >
          <div
            className="pm-pad"
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "60px 32px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 28,
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h2
                id="cd-cta-heading"
                className="pm-display"
                style={{ fontWeight: 700, fontSize: 34, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 8px", color: "#1f2f08" }}
              >
                Explore more success stories
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "#33470f", margin: 0 }}>
                See how teams across industries automated their way out of manual work.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="pm-dark-cta pm-display"
              style={{
                flex: "none",
                textDecoration: "none",
                background: "var(--pm-purple-darkest)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                padding: "17px 32px",
                borderRadius: 13,
                boxShadow: "0 10px 26px rgba(42,20,64,0.3)",
              }}
            >
              View all case studies →
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
