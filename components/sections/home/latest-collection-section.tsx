import { HomeProductCard } from "@/components/sections/home/home-product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCatalogProductMetaBySlug } from "@/lib/data/product-catalog";
import type { Product } from "@/lib/types";

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
      <div className="grid grid-cols-2 gap-3 auto-rows-fr">
        {rowProducts.map((product) => {
          const meta = getCatalogProductMetaBySlug(product.slug);
          const displayName = productDisplayNames[product.slug] ?? product.name;

          return (
            <HomeProductCard
              key={product.slug}
              product={{
                ...product,
                name: displayName,
              }}
              categoryTag={productSubtitles[product.slug] ?? product.categoryLabel}
              rating={meta?.rating}
              soldLabel={meta?.soldLabel}
              floating
            />
          );
        })}
      </div>
    </section>
  );
}
