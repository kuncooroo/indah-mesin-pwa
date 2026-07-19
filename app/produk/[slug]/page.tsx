import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import {
  ProductDownloadsSection,
  ProductInfoSection,
} from "@/components/sections/product/product-info-section";
import { ProductBenefitsSection } from "@/components/sections/product/product-benefits-section";
import {
  StickyWhatsAppBar,
} from "@/components/sections/product/product-actions";
import { ProductGallery } from "@/components/sections/product/product-gallery";
import { ProductSpecsTable } from "@/components/sections/product/product-specs-table";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
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

  const gallery = product.gallery ?? [
    { src: product.image, alt: product.name },
  ];
  const productUrl = `/produk/${product.slug}`;

  return (
    <div className="page-rise pb-36 md:pb-24">
      <AppHeader showMenu={false} showSearch />
      <main className="mx-auto max-w-7xl px-margin-mobile py-8 md:px-margin-desktop">
        <Breadcrumbs
          items={[
            { label: "Equipment List", href: "/kategori" },
            { label: product.categoryLabel, href: `/kategori/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 items-start gap-gutter">
          <div className="space-y-4">
            <ProductGallery
              items={gallery}
              status={product.status}
              statusLabel={product.statusLabel}
            />
          </div>

          <div className="space-y-6">
            <ProductInfoSection product={product} />
            <ProductDownloadsSection product={product} />
          </div>
        </div>

        {product.specifications?.length ? (
          <ProductSpecsTable specifications={product.specifications} />
        ) : null}

        {product.benefit ? (
          <ProductBenefitsSection benefit={product.benefit} />
        ) : null}
      </main>

      <StickyWhatsAppBar
        productName={product.name}
        sku={product.sku}
        productUrl={productUrl}
      />
    </div>
  );
}
