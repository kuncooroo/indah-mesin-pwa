import { NewsSection } from "@/components/sections/news/news-section";
import { catalogService } from "@/lib/services/catalog.service";

export default async function BeritaPage() {
  const articles = await catalogService.getArticles();

  return (
    <div className="page-rise">
      <NewsSection articles={articles} />
    </div>
  );
}
