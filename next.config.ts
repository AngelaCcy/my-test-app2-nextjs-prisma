import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        search: "",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
