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

// Revalidate periodically so SmartSuite content changes appear without a redeploy.
export const revalidate = 30;

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <>
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
