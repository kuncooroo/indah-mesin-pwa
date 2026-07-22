import { CategoriesSection } from "@/components/sections/home/categories-section";
import { BestSellerSection } from "@/components/sections/home/best-seller-section";
import { HomeHeader } from "@/components/sections/home/home-header";
import { LatestCollectionSection } from "@/components/sections/home/latest-collection-section";
import { PromoHeroSection } from "@/components/sections/home/promo-hero-section";
import { UsefulArticlesSection } from "@/components/sections/home/useful-articles-section";
import { catalogService } from "@/lib/services/catalog.service";

export default async function HomePage() {
  const [bestSeller, latestProducts, articles] = await Promise.all([
    catalogService.getFeaturedProduct(),
    catalogService.getLatestProducts(6),
    catalogService.getArticles(),
  ]);

  return (
    <div className="page-rise">
      <HomeHeader />
      <main>
        <PromoHeroSection />
        <CategoriesSection />
        {bestSeller ? <BestSellerSection product={bestSeller} /> : null}
        <LatestCollectionSection products={latestProducts} />
        <UsefulArticlesSection articles={articles} />
      </main>
    </div>
  );
}
