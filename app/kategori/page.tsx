import { AppHeader } from "@/components/layout/app-header";
import { CategoryCatalog } from "@/components/sections/category/category-catalog";

export default function CategoryPage() {
  return (
    <div className="page-rise">
      <AppHeader />
      <main className="mx-auto max-w-7xl pb-8">
        <CategoryCatalog initialCategory="food-processing" />
      </main>
    </div>
  );
}
