import type { Product } from "@/lib/types";

import { ProductCard } from "@/components/shared/product-card";

type FeaturedProductsSectionProps = {
  products: Product[];
};

export function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  return (
    <section className="px-margin-mobile py-section-gap md:px-margin-desktop">
      <h3 className="mb-8 text-headline-md text-primary">Peralatan Terbaru</h3>
      <div className="grid grid-cols-1 gap-8">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
