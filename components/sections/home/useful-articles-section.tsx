import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { articles } from "@/lib/data/articles";

export function UsefulArticlesSection() {
  const previewArticles = articles.filter((article) => !article.featured).slice(0, 2);

  if (!previewArticles.length) return null;

  return (
    <section className="px-4 py-4">
      <SectionHeading title="Artikel Berguna" href="/berita" className="mb-4" />
      <div className="space-y-3">
        {previewArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/berita/${article.slug}`}
            className="flex gap-3 rounded-2xl border border-border-subtle bg-white p-3 shadow-sm transition-colors hover:border-primary"
          >
            <div className="relative size-[72px] shrink-0 overflow-hidden rounded-xl bg-[#eef4ff]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="72px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold text-primary">
                {article.categoryLabel}
              </span>
              <h4 className="mt-0.5 line-clamp-2 text-[13px] leading-snug font-bold text-primary">
                {article.title}
              </h4>
              <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-on-surface-variant">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
