import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
      { source: "/kategori", destination: "/produk", permanent: true },
      {
        source: "/kategori/:slug",
        destination: "/produk?kategori=:slug",
        permanent: false,
      },
      { source: "/katalog", destination: "/produk", permanent: true },
      { source: "/favorit", destination: "/simpanan", permanent: true },
      { source: "/kontak", destination: "/akun", permanent: true },
    ];
  },
};

export default nextConfig;
