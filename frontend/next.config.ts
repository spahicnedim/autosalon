import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "autosalon-cdn.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "s3.eu-central-2.wasabisys.com",
        pathname: "/autosalon-storage/**",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
