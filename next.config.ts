import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/faq",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
