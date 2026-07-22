"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Calendar, Search, Star } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import {
  articleCategories,
  type Article,
} from "@/lib/data/articles";
import { cn } from "@/lib/utils";

function getFeaturedArticle(articles: Article[]) {
  return articles.find((article) => article.featured) ?? articles[0] ?? null;
}

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/berita/${article.slug}`}
      className="block overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 480px) 100vw, 400px"
          className="object-cover"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white">
          <Star className="size-3 fill-white" strokeWidth={0} />
          Featured
        </span>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="text-[15px] leading-snug font-bold text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
          {article.excerpt}
        </p>
        <p className="flex items-center gap-1.5 text-[10px] text-on-surface-variant">
          <Calendar className="size-3" />
          {article.date}
        </p>
      </div>
    </Link>
  );
}

function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link
      href={`/berita/${article.slug}`}
      className="flex gap-3 rounded-2xl border border-border-subtle bg-white p-3 shadow-sm"
    >
      <div className="relative size-[88px] shrink-0 overflow-hidden rounded-xl bg-surface-container">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="88px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[10px] font-semibold text-primary">
          {article.categoryLabel}
        </span>
        <h4 className="mt-0.5 line-clamp-2 text-[13px] leading-snug font-bold text-primary">
          {article.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-on-surface-variant">
          {article.excerpt}
        </p>
        <p className="mt-auto flex items-center gap-1 pt-2 text-[10px] text-on-surface-variant">
          <Calendar className="size-3" />
          {article.date}
        </p>
      </div>
    </Link>
  );
}

type NewsSectionProps = {
  articles: Article[];
};

export function NewsSection({ articles }: NewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = getFeaturedArticle(articles);

  const latestArticles = useMemo(() => {
    let list = articles.filter((article) => !article.featured);

    if (activeCategory !== "all") {
      list = list.filter((article) => article.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const term = searchQuery.trim().toLowerCase();
      list = list.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term),
      );
    }

    return list;
  }, [articles, activeCategory, searchQuery]);

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <BackLink />
          <h1 className="text-[17px] font-bold text-primary">Berita</h1>
          <button
            type="button"
            aria-label="Cari artikel"
            onClick={() => {
              const query = prompt("Cari artikel...");
              if (query !== null) setSearchQuery(query);
            }}
            className="flex size-9 items-center justify-center rounded-full text-primary"
          >
            <Search className="size-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4">
        <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {articleCategories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "border border-border-subtle bg-white text-primary",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {featured && activeCategory === "all" && !searchQuery ? (
          <section className="mb-5">
            <FeaturedArticleCard article={featured} />
          </section>
        ) : null}

        <section id="daftar-artikel">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-primary">Artikel Berguna</h2>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                document
                  .getElementById("daftar-artikel")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-[12px] font-semibold text-primary"
            >
              Lihat Semua &gt;
            </button>
          </div>

          <div className="space-y-3">
            {latestArticles.map((article) => (
              <ArticleListItem key={article.slug} article={article} />
            ))}
          </div>

          {!latestArticles.length ? (
            <p className="py-12 text-center text-[13px] text-on-surface-variant">
              Tidak ada artikel ditemukan.
            </p>
          ) : null}
        </section>
      </main>
    </div>
  );
}
