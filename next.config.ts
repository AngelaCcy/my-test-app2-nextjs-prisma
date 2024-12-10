import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        search: '',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
