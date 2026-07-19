import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/produk", destination: "/kategori", permanent: true },
      {
        source: "/produk/kategori/:slug",
        destination: "/kategori/:slug",
        permanent: true,
      },
      { source: "/berita", destination: "/", permanent: true },
      { source: "/katalog", destination: "/kategori", permanent: true },
    ];
  },
};

export default nextConfig;
