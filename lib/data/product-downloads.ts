import type { ProductDownload } from "@/lib/types";

export const retortDownloads: ProductDownload[] = [
  {
    title: "Brosur Retort Sterilizer",
    subtitle: "Spesifikasi teknis & fitur produk",
    href: "/assets/downloads/brosur-retort-sterilizer.pdf",
  },
  {
    title: "SOP Operasional Retort",
    subtitle: "Panduan operasi & prosedur keselamatan",
    href: "/assets/downloads/sop-operasional-retort.pdf",
  },
];

const retortProductSlugs = new Set(["industrial-retort-sterilizer"]);

export function getProductDownloads(
  slug: string,
  downloads?: ProductDownload[],
): ProductDownload[] {
  if (downloads?.length) {
    return downloads.map((item) => ({
      ...item,
      href: item.href === "#" ? resolvePlaceholderHref(item.title) : item.href,
    }));
  }

  if (retortProductSlugs.has(slug)) {
    return retortDownloads;
  }

  return [];
}

function resolvePlaceholderHref(title: string): string {
  if (title.toLowerCase().includes("sop")) {
    return "/assets/downloads/sop-operasional-retort.pdf";
  }

  return "/assets/downloads/brosur-retort-sterilizer.pdf";
}
