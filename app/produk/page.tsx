import { ProductCatalog } from "@/components/sections/product/product-catalog";

type ProductPageProps = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function ProductListingPage({
  searchParams,
}: ProductPageProps) {
  const params = await searchParams;
  const initialFilter = mapLegacyCategory(params.kategori);

  return (
    <div className="page-rise">
      <main>
        <ProductCatalog initialFilter={initialFilter} />
      </main>
    </div>
  );
}

function mapLegacyCategory(slug?: string): string {
  if (!slug) return "all";

  const mapping: Record<string, string> = {
    sterilisasi: "sterilisator",
    "food-processing": "sterilisator",
    packaging: "retort-parts",
    cnc: "lainnya",
    pertanian: "lainnya",
    logistik: "lainnya",
    produksi: "pompa",
  };

  return mapping[slug] ?? "all";
}
