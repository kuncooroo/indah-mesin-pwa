import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";

import { PriceDisplay } from "@/components/shared/price-display";
import { SkuLabel } from "@/components/shared/sku-label";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl border border-border-subtle bg-white transition-all hover:shadow-xl",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 520px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <StatusBadge
          status={product.status}
          label={product.statusLabel}
          className="absolute top-3 left-3"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h4 className="text-body-md font-bold leading-tight text-on-surface">
            {product.name}
          </h4>
          <SkuLabel sku={product.sku} />
        </div>
        <p className="mb-6 line-clamp-2 text-body-sm text-on-surface-variant">
          {product.description}
        </p>
        <div className="flex items-center justify-between border-t border-border-subtle pt-4">
          <PriceDisplay price={product.priceLabel} />
          <Link
            href={`/produk/${product.slug}`}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-white"
          >
            Detail
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
