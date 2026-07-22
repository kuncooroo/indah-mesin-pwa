import { HomeProductCard } from "@/components/sections/home/home-product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Product } from "@/lib/types";

type LatestCollectionSectionProps = {
  products: Product[];
};

export function LatestCollectionSection({
  products,
}: LatestCollectionSectionProps) {
  const rowProducts = products.slice(0, 2);

  if (!rowProducts.length) return null;

  return (
    <section className="px-4 pt-5 pb-2">
      <SectionHeading title="Koleksi Terbaru" href="/produk" className="mb-4" />
      <div className="grid grid-cols-2 gap-3 auto-rows-fr">
        {rowProducts.map((product) => (
          <HomeProductCard
            key={product.slug}
            product={product}
            categoryTag={product.categoryLabel}
            rating={product.rating}
            soldLabel={product.soldLabel}
            floating
          />
        ))}
      </div>
    </section>
  );
}
