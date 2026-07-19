import Link from "next/link";
import { Heart, Plus } from "lucide-react";

import { ProductThumb } from "@/components/shared/product-thumb";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Product } from "@/lib/types";

type HomeProductCardProps = {
  product: Product;
  subtitle?: string;
  showContactAdmin?: boolean;
  floating?: boolean;
};

export function HomeProductCard({
  product,
  subtitle,
  showContactAdmin = false,
  floating = false,
}: HomeProductCardProps) {
  return (
    <article
      className={
        floating
          ? "home-product-card-float overflow-hidden rounded-2xl border border-border-subtle bg-white"
          : "overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm"
      }
    >
      <div className="relative aspect-[4/3]">        <ProductThumb className="size-full" iconClassName="size-12" />
        <button
          type="button"
          aria-label="Simpan ke favorit"
          className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white/90 text-on-surface-variant shadow-sm"
        >
          <Heart className="size-3.5" strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-2 p-3">
        <div>
          <h4 className="line-clamp-2 text-[13px] leading-snug font-bold text-on-surface">
            {product.name}
          </h4>
          <p className="mt-0.5 line-clamp-1 text-[10px] text-on-surface-variant">
            {subtitle ?? product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          {showContactAdmin ? (
            <span className="text-[11px] font-semibold text-on-surface-variant">
              Hubungi Admin
            </span>
          ) : (
            <span className="text-[12px] font-bold text-primary">
              {product.priceLabel}
            </span>
          )}
          <Link
            href={`/produk/${product.slug}`}
            aria-label={`Detail ${product.name}`}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white"
          >
            <Plus className="size-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </article>
  );
}

type LatestCollectionSectionProps = {
  products: Product[];
};

const productDisplayNames: Record<string, string> = {
  "automatic-vacuum-packaging-machine": "Mesin Vacuum Sealer",
  "automatic-liquid-filling-machine-beverages": "Mesin Pengisi Cairan",
};

const productSubtitles: Record<string, string> = {
  "automatic-vacuum-packaging-machine": "Double Chamber - Heavy Duty",
  "automatic-liquid-filling-machine-beverages": "Otomatis - 12 Nozzle",
  "14-head-multihead-weigher": "High Speed - Food Grade",
  "industrial-food-dehydrator": "Kapasitas Besar - Uniform Drying",
};

export function LatestCollectionSection({
  products,
}: LatestCollectionSectionProps) {
  const rowProducts = products.slice(0, 2);

  if (!rowProducts.length) return null;

  return (
    <section className="px-4 pt-5 pb-2">
      <SectionHeading title="Koleksi Terbaru" href="/produk" className="mb-4" />
      <div className="grid grid-cols-2 gap-3">
        {rowProducts.map((product, index) => (
          <HomeProductCard
            key={product.slug}
            product={{
              ...product,
              name: productDisplayNames[product.slug] ?? product.name,
            }}
            subtitle={productSubtitles[product.slug]}
            showContactAdmin={index === 0 || product.status === "indent"}
            floating
          />
        ))}
      </div>
    </section>
  );
}