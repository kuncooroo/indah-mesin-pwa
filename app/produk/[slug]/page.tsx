import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/sections/product/product-detail-view";
import { getProductBySlug, products } from "@/lib/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="page-rise pb-24">
      <ProductDetailView product={product} />
    </div>
  );
}
