import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world process transformation across industries — coming soon from Process Maestro.",
};

export default function CaseStudiesPage() {
  return (
    <PlaceholderPage
      eyebrow="Client results"
      title="Case Studies"
      blurb="Our full case-study library is coming soon. In the meantime, explore the featured results on the homepage."
    />
  );
}
