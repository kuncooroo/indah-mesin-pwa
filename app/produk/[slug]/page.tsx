import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/sections/product/product-detail-view";
import { catalogService } from "@/lib/services/catalog.service";

export async function generateStaticParams() {
  const slugs = await catalogService.getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const [product, reviews] = await Promise.all([
    catalogService.getProductBySlug(slug),
    catalogService.getProductReviews(slug),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="page-rise">
      <ProductDetailView product={product} reviews={reviews} />
    </div>
  );
}
