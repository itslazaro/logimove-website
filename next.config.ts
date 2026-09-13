import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets the dev server accept requests (including the HMR websocket) coming
  // through an ngrok tunnel instead of localhost. Next.js blocks unknown
  // cross-origin dev origins by default (as of Next 15+); without this the
  // tunnel's requests 403 and the client bundle never finishes hydrating —
  // which is why the loader animation appeared to hang forever over ngrok.
  allowedDevOrigins: ["*.ngrok-free.dev", "*.ngrok-free.app", "*.ngrok.io", "*.ngrok.app"],
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
