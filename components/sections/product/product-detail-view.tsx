"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Heart, Search, Star } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { ProductThumb } from "@/components/shared/product-thumb";
import { getProductDownloads } from "@/lib/data/product-downloads";
import type { Product } from "@/lib/types";
import { productOrderMessage, waUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const variantTabs = ["Steam Retort", "Water Spray", "Rotary"];
const productDisplayOverrides: Record<
  string,
  { title?: string; description?: string; priceLabel?: string; headerTitle?: string }
> = {
  "industrial-retort-sterilizer": {
    title: "Industrial Retort Sterilizer",
    headerTitle: "Retort",
    description:
      "Sistem sterilisasi tekanan tinggi untuk pengolahan makanan dan minuman. Dirancang stabil, aman, dan efisien untuk skala industri.",
    priceLabel: "Rp 850.000.000",
  },
};

type ProductDetailViewProps = {
  product: Product;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [activeTab, setActiveTab] = useState(variantTabs[0]);
  const [favorited, setFavorited] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const galleryItems = useMemo(() => {
    if (product.gallery?.length) {
      return product.gallery;
    }

    return Array.from({ length: 4 }, (_, index) => ({
      src: product.image,
      alt: `${product.name} ${index + 1}`,
    }));
  }, [product.gallery, product.image, product.name]);

  const downloads = useMemo(
    () => getProductDownloads(product.slug, product.downloads),
    [product.slug, product.downloads],
  );

  const overrides = productDisplayOverrides[product.slug] ?? {};
  const title = overrides.title ?? product.name;
  const headerTitle = overrides.headerTitle ?? product.categoryLabel;
  const description = overrides.description ?? product.description;
  const priceLabel = overrides.priceLabel ?? product.priceLabel.replace("+", "");

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/produk/${product.slug}`
      : `/produk/${product.slug}`;

  const waHref = waUrl(
    productOrderMessage({
      name: title,
      sku: product.sku,
      productUrl,
    }),
  );

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <BackLink href="/produk" />
          <h1 className="text-[17px] font-bold text-primary">{headerTitle}</h1>
          <button
            type="button"
            aria-label="Cari"
            className="flex size-9 items-center justify-center rounded-full bg-[#f1f5f9] text-primary"
          >
            <Search className="size-[18px]" strokeWidth={2.2} />
          </button>
        </div>

        <div className="flex border-t border-border-subtle">
          {variantTabs.map((tab, index) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative flex-1 py-3 text-[12px] font-medium transition-colors",
                  isActive ? "font-bold text-primary" : "text-on-surface-variant",
                  index > 0 && "border-l border-border-subtle",
                )}
              >
                {tab}
                {isActive ? (
                  <span className="absolute right-4 bottom-0 left-4 h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
            );
          })}
        </div>
      </header>

      <main className="px-4 pt-4">
        <section className="space-y-3">
          <div className="overflow-hidden rounded-3xl">
            <ProductThumb className="aspect-[4/3] w-full" iconClassName="size-20" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {galleryItems.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                aria-label={`Lihat gambar ${index + 1}`}
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  "overflow-hidden rounded-xl border-2 transition-colors",
                  index === activeImageIndex
                    ? "border-primary"
                    : "border-border-subtle",
                )}
              >
                <ProductThumb className="aspect-square w-full" iconClassName="size-8" />
              </button>
            ))}
          </div>
        </section>
        <section className="mt-5 space-y-4">
          <div>
            <h2 className="text-[20px] leading-snug font-bold text-primary">{title}</h2>
            <p className="mt-2 text-[12px] leading-relaxed text-on-surface-variant">
              {description}
            </p>
          </div>

          <div className="border-t border-border-subtle pt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[22px] font-bold text-primary">{priceLabel}</p>
              <button
                type="button"
                aria-label="Simpan ke favorit"
                onClick={() => setFavorited((value) => !value)}
                className="flex size-10 items-center justify-center text-primary"
              >
                <Heart
                  className={cn("size-5", favorited && "fill-primary")}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border-subtle py-4">
            <span className="text-[13px] font-medium text-on-surface-variant">
              Ulasan Pengguna
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-primary text-primary"
                  strokeWidth={0}
                />
              ))}
            </div>
          </div>

          {downloads.length ? (
            <div className="space-y-3 border-t border-border-subtle pt-4">
              <h3 className="text-[14px] font-bold text-primary">Download Dokumen</h3>
              <div className="space-y-2">
                {downloads.map((download) => (
                  <a
                    key={download.href}
                    href={download.href}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white p-3 shadow-sm transition-colors hover:bg-[#f8fafc]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-primary">
                      <FileText className="size-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-primary">
                        {download.title}
                      </p>
                      <p className="text-[11px] text-on-surface-variant">
                        {download.subtitle}
                      </p>
                    </div>
                    <Download className="size-4 shrink-0 text-primary" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-[15px] font-semibold text-white shadow-sm"
          >
            Hubungi Admin
          </a>
        </section>
      </main>
    </div>
  );
}
