"use client";

import Link from "next/link";
import { Star } from "lucide-react";

import { FavoriteButton } from "@/components/shared/favorite-button";
import { ProductThumb } from "@/components/shared/product-thumb";
import { favoriteProductId } from "@/lib/favorites-store";
import type { Product } from "@/lib/types";

type HomeProductCardProps = {
  product: Product;
  categoryTag?: string;
  rating?: number;
  soldLabel?: string;
  floating?: boolean;
};

export function HomeProductCard({
  product,
  categoryTag,
  rating = 4.8,
  soldLabel = "100+ terjual",
  floating = false,
}: HomeProductCardProps) {
  const favoriteId = favoriteProductId(product.slug, product.name);

  return (
    <Link href={`/produk/${product.slug}`} className="block h-full">
      <article
        className={
          floating
            ? "home-product-card-float flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white transition-colors hover:border-primary"
            : "flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm transition-colors hover:border-primary"
        }
      >
        <div className="relative aspect-[4/3] w-full shrink-0">
          <ProductThumb className="size-full" iconClassName="size-12" />
          <FavoriteButton
            product={{
              id: favoriteId,
              slug: product.slug,
              name: product.name,
              priceLabel: product.priceLabel,
              image: product.image,
              description: product.description,
            }}
            className="absolute top-2 right-2 z-10 text-primary/70"
            iconClassName="size-4"
          />
        </div>

        <div className="flex flex-1 flex-col space-y-2 p-3">
          <div className="flex-1">
            <h4 className="line-clamp-2 text-[13px] leading-snug font-bold text-on-surface">
              {product.name}
            </h4>
            <p className="mt-0.5 line-clamp-1 text-[10px] text-on-surface-variant">
              {categoryTag ?? product.categoryLabel}
            </p>
          </div>

          <p className="text-[12px] font-bold text-primary">{product.priceLabel}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#a16207]">
              <Star className="size-3 fill-[#eab308] text-[#eab308]" />
              {rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-on-surface-variant">{soldLabel}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
