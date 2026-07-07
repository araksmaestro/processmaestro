import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Hourly consulting, custom development, and fractional services — coming soon from Process Maestro.",
};

export default function ServicesPage() {
  return (
    <PlaceholderPage
      eyebrow="What we do"
      title="Services"
      blurb="Detailed service offerings are coming soon. In the meantime, see our core expertise on the homepage or book a free consultation."
    />
  );
}
