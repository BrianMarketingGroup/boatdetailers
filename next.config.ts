import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone needed for Docker/Cloud Run; skip locally on Windows to avoid pnpm symlink EPERM
  ...(process.env.STANDALONE === "1" ? { output: "standalone" } : {}),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
    ],
  },
};

export default nextConfig;
