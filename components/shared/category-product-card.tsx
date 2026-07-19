import Link from "next/link";
import Image from "next/image";

import { PriceDisplay } from "@/components/shared/price-display";
import { SkuLabel } from "@/components/shared/sku-label";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryProductCardProps = {
  product: Product;
  className?: string;
};

export function CategoryProductCard({
  product,
  className,
}: CategoryProductCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden bg-metallic-bg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 520px) 100vw, 240px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <StatusBadge
          status={product.status}
          label={product.statusLabel.toUpperCase()}
          className="absolute top-3 left-3 tracking-wider"
        />
      </div>
      <div className="flex flex-grow flex-col p-4">
        <SkuLabel
          sku={product.sku}
          className="mb-1 uppercase tracking-widest text-on-surface-variant"
        />
        <h3 className="mb-2 line-clamp-2 text-headline-md text-primary">
          {product.name}
        </h3>
        <div className="mt-auto">
          <PriceDisplay price={product.priceLabel} className="mb-4" />
          <Link
            href={`/produk/${product.slug}`}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-primary text-button-text text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  );
}
