import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack5: false,
  // swcMinify: false,
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
