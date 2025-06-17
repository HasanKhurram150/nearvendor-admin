import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack5: false,
  swcMinify: false,
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "storage.googleapis.com",
      "devent.com",
      "example.com",
      "images.lumacdn.com",
      "cdn.lu.ma",
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "images.lumacdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.lu.ma",
      },
    ],
  },
};

export default nextConfig;
