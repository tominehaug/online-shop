import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.cloud.noroff.dev",
        port: "",
        pathname: "/api/online-shop/**",
      },
    ],
  },
};

export default nextConfig;
