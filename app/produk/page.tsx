import { ProductCatalog } from "@/components/sections/product/product-catalog";
import { catalogService } from "@/lib/services/catalog.service";

type ProductPageProps = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function ProductListingPage({
  searchParams,
}: ProductPageProps) {
  const params = await searchParams;
  const initialFilter = params.kategori ?? "all";
  const products = await catalogService.getCatalogProducts();

  return (
    <div className="page-rise">
      <main>
        <ProductCatalog initialFilter={initialFilter} products={products} />
      </main>
    </div>
  );
}
