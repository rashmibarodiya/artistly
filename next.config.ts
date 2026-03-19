import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // or restrict to your domains
      },
    ],
  },
};

export default nextConfig;