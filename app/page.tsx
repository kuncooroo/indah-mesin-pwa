import { AppHeader } from "@/components/layout/app-header";
import { PwaInstallBanner } from "@/components/layout/pwa-install-banner";
import { CategoriesSection } from "@/components/sections/home/categories-section";
import { FeaturedProductsSection } from "@/components/sections/home/featured-products-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { QuickFiltersSection } from "@/components/sections/home/quick-filters-section";
import { RfqSection } from "@/components/sections/home/rfq-section";
import { getHomeProducts } from "@/lib/data/products";

export default function HomePage() {
  const products = getHomeProducts();

  return (
    <div className="page-rise">
      <PwaInstallBanner />
      <AppHeader showAccount />
      <main className="mx-auto max-w-7xl">
        <HeroSection />
        <CategoriesSection />
        <QuickFiltersSection />
        <FeaturedProductsSection products={products} />
        <RfqSection />
      </main>
    </div>
  );
}
