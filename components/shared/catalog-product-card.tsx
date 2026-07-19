import Link from "next/link";
import { Heart, Plus } from "lucide-react";

import { ProductThumb } from "@/components/shared/product-thumb";
import type { CatalogProduct } from "@/lib/data/product-catalog";

type CatalogProductCardProps = {
  product: CatalogProduct;
};

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <ProductThumb className="size-full" iconClassName="size-14" />
        <button
          type="button"
          aria-label="Simpan ke favorit"
          className="absolute top-2 right-2 text-primary/70"
        >
          <Heart className="size-4" strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-2 p-3">
        <div>
          <h4 className="line-clamp-2 text-[13px] leading-snug font-bold text-primary">
            {product.name}
          </h4>
          <p className="mt-0.5 text-[10px] text-on-surface-variant">
            {product.categoryTag}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <span className="text-[12px] font-bold text-primary">
            {product.priceLabel}
          </span>
          <Link
            href={`/produk/${product.slug}`}
            aria-label={`Detail ${product.name}`}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#dbeafe] text-primary"
          >
            <Plus className="size-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </article>
  );
}
