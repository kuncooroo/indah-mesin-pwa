import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { catalogService } from "@/lib/services/catalog.service";

export async function generateStaticParams() {
  const slugs = await catalogService.getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await catalogService.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="page-rise pb-8">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink href="/berita" />
          <h1 className="text-[17px] font-bold text-primary">Berita</h1>
          <span className="size-6" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-4">
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl bg-surface-container">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 480px) 100vw, 400px"
            className="object-cover"
            priority
          />
        </div>

        <span className="text-[11px] font-semibold text-primary">
          {article.categoryLabel}
        </span>
        <h2 className="mt-1 text-[20px] leading-snug font-bold text-primary">
          {article.title}
        </h2>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-on-surface-variant">
          <Calendar className="size-3.5" />
          {article.date}
        </p>

        <p className="mt-4 text-[13px] leading-relaxed text-on-surface-variant">
          {article.excerpt}
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-on-surface">
          {article.content}
        </p>
      </main>
    </div>
  );
}
