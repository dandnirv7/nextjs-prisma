import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.pikbest.com",
      },
      {
        protocol: "https",
        hostname: "www.static-src.com",
      },
      {
        protocol: "https",
        hostname: "assets.surlatable.com",
      },
      {
        protocol: "https",
        hostname: "www.nescafe.com",
      },
      {
        protocol: "https",
        hostname: "assets.tmecosys.com",
      },
    ],
  },
};

export default nextConfig;
