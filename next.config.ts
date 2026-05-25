import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hide the Next.js dev indicator (the floating "N" badge) */
  devIndicators: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
