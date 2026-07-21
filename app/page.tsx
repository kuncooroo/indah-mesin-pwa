import { CategoriesSection } from "@/components/sections/home/categories-section";
import { BestSellerSection } from "@/components/sections/home/best-seller-section";
import { HomeHeader } from "@/components/sections/home/home-header";
import { LatestCollectionSection } from "@/components/sections/home/latest-collection-section";
import { PromoHeroSection } from "@/components/sections/home/promo-hero-section";
import { UsefulArticlesSection } from "@/components/sections/home/useful-articles-section";
import {
  getBestSellerProduct,
  getLatestCollectionProducts,
} from "@/lib/data/products";

export default function HomePage() {
  const bestSeller = getBestSellerProduct();
  const latestProducts = getLatestCollectionProducts();

  return (
    <div className="page-rise">
      <HomeHeader />
      <main>
        <PromoHeroSection />
        <CategoriesSection />
        {bestSeller ? <BestSellerSection product={bestSeller} /> : null}
        <LatestCollectionSection products={latestProducts} />
        <UsefulArticlesSection />
      </main>
    </div>
  );
}
