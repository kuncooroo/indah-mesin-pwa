import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { StockStatus } from "@/lib/generated/prisma/client";
import type { Article } from "@/lib/data/articles";
import type { FaqCategory, FaqItem } from "@/lib/data/faq";
import type { CatalogProduct } from "@/lib/data/product-catalog";
import type { ProductTestimonial } from "@/lib/data/product-testimonials";
import type { Product, ProductGalleryItem, StockStatus as UiStockStatus } from "@/lib/types";
import { articleRepository } from "@/lib/repositories/article.repository";
import { categoryRepository } from "@/lib/repositories/category.repository";
import { faqRepository } from "@/lib/repositories/faq.repository";
import { productRepository } from "@/lib/repositories/product.repository";
import { reviewRepository } from "@/lib/repositories/review.repository";

type DbProduct = Awaited<ReturnType<typeof productRepository.findAll>>[number];
type DbArticle = Awaited<ReturnType<typeof articleRepository.findAll>>[number];
type DbFaq = Awaited<ReturnType<typeof faqRepository.findAll>>[number];
type DbReview = Awaited<ReturnType<typeof reviewRepository.findByProductSlug>>[number];

const articleCategoryMap = {
  ARTIKEL: "artikel",
  TIPS_MESIN: "tips-mesin",
  TEKNOLOGI: "teknologi",
  EVENT: "event",
} as const;

const faqCategoryMap = {
  UMUM: "umum",
  AKUN: "akun",
  LAYANAN: "layanan",
  PEMESANAN: "pemesanan",
} as const;

function mapStockStatus(status: StockStatus): UiStockStatus {
  return status === StockStatus.READY ? "ready" : "indent";
}

function parseJsonArray<T>(value: unknown): T[] | undefined {
  if (!value || !Array.isArray(value)) return undefined;
  return value as T[];
}

function formatSoldLabel(count: number): string {
  if (count >= 1000) return `${Math.floor(count / 100) * 100}+ terjual`;
  if (count > 0) return `${count}+ terjual`;
  return "Baru";
}

export function mapDbProductToUi(product: DbProduct): Product {
  const gallery = parseJsonArray<ProductGalleryItem>(product.gallery);

  return {
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    description: product.description,
    categorySlug: product.category.slug,
    categoryLabel: product.category.label,
    image: product.image,
    gallery,
    status: mapStockStatus(product.status),
    statusLabel: product.statusLabel,
    priceLabel: product.priceLabel,
    priceNote: product.priceNote ?? undefined,
    minOrder: product.minOrder,
    rating: product.rating,
    soldCount: product.soldCount,
    soldLabel: formatSoldLabel(product.soldCount),
    isFeatured: product.isFeatured,
    features: parseJsonArray<string>(product.features),
    specifications: parseJsonArray<{ attribute: string; value: string }>(
      product.specifications,
    ),
    downloads: parseJsonArray<{ title: string; subtitle: string; href: string }>(
      product.downloads,
    ),
    benefit: product.benefit as Product["benefit"],
  };
}

export function mapDbProductToCatalog(product: DbProduct): CatalogProduct {
  return {
    slug: product.slug,
    name: product.name,
    categoryTag: product.category.label,
    categoryBadge: product.category.label,
    priceLabel: product.priceLabel,
    image: product.image,
    filterId: product.category.slug,
    productTypeId: product.category.slug,
    brandId: "industrialx",
    readyStock: product.status === StockStatus.READY,
    rating: product.rating || 0,
    soldLabel: formatSoldLabel(product.soldCount),
    location: "Indonesia",
  };
}

export function mapDbArticleToUi(article: DbArticle): Article {
  const category =
    articleCategoryMap[article.category as keyof typeof articleCategoryMap] ??
    "artikel";

  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category,
    categoryLabel: article.categoryLabel,
    date: format(article.publishedAt, "d MMM yyyy", { locale: localeId }),
    image: article.image,
    featured: article.featured,
  };
}

export function mapDbFaqToUi(faq: DbFaq): FaqItem {
  const category =
    faqCategoryMap[faq.category as keyof typeof faqCategoryMap] ?? "umum";

  return {
    id: faq.id,
    category: category as FaqCategory,
    question: faq.question,
    answer: faq.answer,
  };
}

export function mapDbReviewToTestimonial(review: DbReview): ProductTestimonial {
  return {
    id: review.id,
    name: review.authorName,
    company: review.company,
    rating: review.rating,
    image:
      review.image ??
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    review: review.review,
    dateLabel: review.dateLabel ?? "",
  };
}

export const catalogService = {
  async getProducts() {
    const products = await productRepository.findAll();
    return products.map(mapDbProductToUi);
  },

  async getCatalogProducts() {
    const products = await productRepository.findAll();
    return products.map(mapDbProductToCatalog);
  },

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);
    if (!product || !product.isActive) return null;
    return mapDbProductToUi(product);
  },

  async getProductSlugs() {
    const products = await productRepository.findAll();
    return products.map((p) => p.slug);
  },

  async getFeaturedProduct() {
    const products = await productRepository.findAll({ featuredOnly: true });
    const product = products[0] ?? (await productRepository.findAll())[0];
    return product ? mapDbProductToUi(product) : null;
  },

  async getLatestProducts(limit = 6) {
    const products = await productRepository.findAll();
    return products.slice(0, limit).map(mapDbProductToUi);
  },

  async getCategories() {
    return categoryRepository.findAll();
  },

  async getArticles() {
    const articles = await articleRepository.findAll();
    return articles.map(mapDbArticleToUi);
  },

  async getArticleBySlug(slug: string) {
    const article = await articleRepository.findBySlug(slug);
    if (!article || !article.isActive) return null;
    return mapDbArticleToUi(article);
  },

  async getArticleSlugs() {
    const articles = await articleRepository.findAll();
    return articles.map((a) => a.slug);
  },

  async getFaqs() {
    const faqs = await faqRepository.findAll();
    return faqs.map(mapDbFaqToUi);
  },

  async getProductReviews(slug: string) {
    const reviews = await reviewRepository.findByProductSlug(slug);
    return reviews.map(mapDbReviewToTestimonial);
  },
};
