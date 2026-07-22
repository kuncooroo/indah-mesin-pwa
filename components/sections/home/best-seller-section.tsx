import Link from "next/link";
import { Star } from "lucide-react";

import { ProductThumb } from "@/components/shared/product-thumb";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";import type { Product } from "@/lib/types";
import { productOrderMessage, waUrl } from "@/lib/whatsapp";

type BestSellerSectionProps = {
  product: Product;
};

export function BestSellerSection({ product }: BestSellerSectionProps) {
  const waHref = waUrl(
    productOrderMessage({
      name: product.name,
      sku: product.sku,
      productUrl: `https://industrialx.id/produk/${product.slug}`,
    }),
  );

  return (
    <section className="px-4 py-2">
      <h3 className="mb-3 text-[17px] font-bold text-primary">Pilihan Terlaris</h3>
      <article className="overflow-hidden rounded-3xl bg-surface-container">
        <div className="flex min-h-[210px]">
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <span className="inline-flex rounded-md bg-status-ready px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                {product.statusLabel}
              </span>
              <h4 className="mt-2 line-clamp-2 text-[15px] leading-snug font-bold text-primary">
                Industrial Retort Sterilizer
              </h4>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
                Sistem sterilisasi tekanan tinggi untuk industri makanan menengah.
              </p>
            </div>

            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-on-surface shadow-sm">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  4.9
                </span>
                <Link
                  href={`/produk/${product.slug}`}
                  className="rounded-full border border-border-subtle bg-white px-3 py-1 text-[11px] font-semibold text-primary"
                >
                  Detail Teknik
                </Link>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[13px] font-semibold text-white"
              >
                <WhatsAppIcon className="size-4 text-white" />
                Pesan via WA
              </a>
            </div>
          </div>

          <div className="relative w-[42%] shrink-0 p-3">
            <ProductThumb className="size-full rounded-2xl" iconClassName="size-16" />
          </div>        </div>
      </article>
    </section>
  );
}
