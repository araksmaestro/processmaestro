import type { Metadata } from "next";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import ServicePanels from "@/components/services/ServicePanels";
import { services } from "@/content/services";
import { servicesJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Hourly consulting, fractional services, and custom development — expert help with workflow design, automation, and the systems your business runs on.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Process Maestro",
    description:
      "Hourly consulting, fractional services, and custom development from Process Maestro.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  const jsonLd = servicesJsonLd(
    services.map((s) => ({ slug: s.slug, title: s.title, lead: s.lead })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav variant="dark" active="services" />

      <main style={{ background: "var(--pm-services-bg)", color: "#fff", overflowX: "hidden" }}>
        <ServicePanels />
      </main>

      <Footer />
    </>
  );
}
