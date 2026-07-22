import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → apex. processmaestro.co is canonical; serving both hostnames is
      // duplicate content. Host-based match preserves the full path. (Next.js
      // emits 308 for permanent redirects.)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.processmaestro.co" }],
        destination: "https://processmaestro.co/:path*",
        permanent: true,
      },
      // Retired Acuity Research slug → its current slug (in case the old URL was
      // crawled/linked).
      {
        source: "/case-studies/wealth-management-south-africa2",
        destination: "/case-studies/market-research-task-automation-smartsuite",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
