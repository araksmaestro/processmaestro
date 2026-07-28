import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Founder from "@/components/home/Founder";
import Expertise from "@/components/home/Expertise";
import CaseStudies from "@/components/home/CaseStudies";
import Industries from "@/components/home/Industries";
import Tools from "@/components/home/Tools";
import PainPoints from "@/components/home/PainPoints";
import Testimonials from "@/components/home/Testimonials";
import CtaBand from "@/components/home/CtaBand";
import Footer from "@/components/home/Footer";
import { getTestimonials } from "@/lib/adapters/testimonials";
import { homepageJsonLd } from "@/lib/jsonld";

// Revalidate periodically so SmartSuite content changes appear without a redeploy.
// 5 min balances freshness against background SmartSuite read volume.
export const revalidate = 300;

export default async function Home() {
  const testimonials = await getTestimonials();

  // Reviews are built from the SAME testimonials rendered below, so the markup
  // never asserts a review that isn't visible on the page.
  const jsonLd = homepageJsonLd(testimonials);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Founder />
        <Expertise />
        <CaseStudies />
        <Industries />
        <Tools />
        <PainPoints />
        <Testimonials testimonials={testimonials} />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
