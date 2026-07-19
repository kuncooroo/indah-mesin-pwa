import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IndustrialX Marketplace",
    short_name: "IndustrialX",
    description: "Marketplace mesin industri B2B dengan pemesanan via WhatsApp",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8ff",
    theme_color: "#00236f",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
