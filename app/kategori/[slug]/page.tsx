import { AppHeader } from "@/components/layout/app-header";
import { CategoryCatalog } from "@/components/sections/category/category-catalog";

type CategorySlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategorySlugPage({
  params,
}: CategorySlugPageProps) {
  const { slug } = await params;

  return (
    <div className="page-rise">
      <AppHeader />
      <main className="mx-auto max-w-7xl pb-8">
        <CategoryCatalog initialCategory={slug} />
      </main>
    </div>
  );
}
