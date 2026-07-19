import { CheckCircle2, ListChecks } from "lucide-react";

import { SkuLabel } from "@/components/shared/sku-label";
import type { Product } from "@/lib/types";

type ProductInfoSectionProps = {
  product: Product;
};

export function ProductInfoSection({ product }: ProductInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <SkuLabel sku={product.sku} className="mb-1 font-bold" />
        <h2 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">
          {product.name}
        </h2>
      </div>
      <div className="rounded-xl bg-surface-container p-4">
        <p className="text-body-sm text-on-surface-variant">Harga Unit:</p>
        <h3 className="text-2xl font-bold text-primary">{product.priceLabel}</h3>
        {product.priceNote ? (
          <p className="mt-1 text-body-sm italic text-outline">
            {product.priceNote}
          </p>
        ) : null}
      </div>
      {product.features?.length ? (
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 font-bold text-on-surface">
            <ListChecks className="h-5 w-5 text-primary" />
            Product Features
          </h4>
          <ul className="space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-status-ready" />
                <span className="text-body-md text-on-surface-variant">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function ProductDownloadsSection({ product }: ProductInfoSectionProps) {
  if (!product.downloads?.length) {
    return null;
  }

  return (
    <div className="border-t border-border-subtle pt-4">
      <h4 className="mb-4 font-bold text-on-surface">Downloads & Resources</h4>
      <div className="grid grid-cols-1 gap-3">
        {product.downloads.map((download) => (
          <a
            key={download.title}
            href={download.href}
            className="group flex items-center gap-3 rounded-lg border border-border-subtle p-3 transition-colors hover:bg-surface-container-low"
          >
            <span className="text-primary">PDF</span>
            <div className="min-w-0 overflow-hidden">
              <p className="truncate text-body-sm font-semibold text-on-surface">
                {download.title}
              </p>
              <p className="text-[12px] text-outline">{download.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
