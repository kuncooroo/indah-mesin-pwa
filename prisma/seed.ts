import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { hashPassword } from "../lib/auth/password";
import {
  ArticleCategory,
  FaqCategory,
  PrismaClient,
  StockStatus,
  UserRole,
} from "../lib/generated/prisma/client";
import { categoryTabs, homeCategories } from "../lib/data/categories";
import { products } from "../lib/data/products";
import { articles } from "../lib/data/articles";
import { faqItems } from "../lib/data/faq";
import { defaultTestimonials } from "../lib/data/product-testimonials";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const categorySeed = [
  ...homeCategories.map((category, index) => ({
    slug: category.slug,
    label: category.label,
    icon: category.icon,
    sortOrder: index,
  })),
  ...categoryTabs.map((category, index) => ({
    slug: category.slug,
    label: category.label,
    icon: category.icon,
    sortOrder: homeCategories.length + index,
  })),
];

function mapStockStatus(status: "ready" | "indent"): StockStatus {
  return status === "ready" ? StockStatus.READY : StockStatus.INDENT;
}

function mapArticleCategory(
  category: "artikel" | "tips-mesin" | "teknologi" | "event",
): ArticleCategory {
  const map: Record<string, ArticleCategory> = {
    artikel: ArticleCategory.ARTIKEL,
    "tips-mesin": ArticleCategory.TIPS_MESIN,
    teknologi: ArticleCategory.TEKNOLOGI,
    event: ArticleCategory.EVENT,
  };
  return map[category] ?? ArticleCategory.ARTIKEL;
}

function mapFaqCategory(
  category: "umum" | "akun" | "layanan" | "pemesanan",
): FaqCategory {
  const map: Record<string, FaqCategory> = {
    umum: FaqCategory.UMUM,
    akun: FaqCategory.AKUN,
    layanan: FaqCategory.LAYANAN,
    pemesanan: FaqCategory.PEMESANAN,
  };
  return map[category] ?? FaqCategory.UMUM;
}

function parseArticleDate(dateLabel: string): Date {
  const parsed = new Date(dateLabel);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

async function main() {
  console.log("Seeding database...");

  const superadminPassword = await hashPassword("SuperAdmin123!");
  const adminPassword = await hashPassword("Admin123!");

  await prisma.user.upsert({
    where: { email: "superadmin@industrialx.com" },
    update: {},
    create: {
      email: "superadmin@industrialx.com",
      name: "Super Admin",
      password: superadminPassword,
      role: UserRole.SUPERADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@industrialx.com" },
    update: {},
    create: {
      email: "admin@industrialx.com",
      name: "Admin IndustrialX",
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  });

  const categoryMap = new Map<string, string>();

  for (const category of categorySeed) {
    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        label: category.label,
        icon: category.icon,
        sortOrder: category.sortOrder,
      },
      create: {
        slug: category.slug,
        label: category.label,
        icon: category.icon,
        sortOrder: category.sortOrder,
      },
    });

    categoryMap.set(category.slug, record.id);
  }

  const featuredSlugs = new Set([
    "vertical-machining-center-vmc-850",
    "automatic-liquid-filler-alf-5000",
    "industrial-retort-sterilizer",
  ]);

  for (const [index, product] of products.entries()) {
    const categoryId = categoryMap.get(product.categorySlug);

    if (!categoryId) {
      console.warn(`Skipping ${product.slug}: category ${product.categorySlug} not found`);
      continue;
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        sku: product.sku,
        name: product.name,
        description: product.description,
        image: product.image,
        categoryId,
        status: mapStockStatus(product.status),
        statusLabel: product.statusLabel,
        priceLabel: product.priceLabel,
        priceNote: product.priceNote,
        gallery: product.gallery ?? undefined,
        features: product.features ?? undefined,
        specifications: product.specifications ?? undefined,
        downloads: product.downloads ?? undefined,
        benefit: product.benefit ?? undefined,
        isFeatured: featuredSlugs.has(product.slug),
        sortOrder: index,
      },
      create: {
        slug: product.slug,
        sku: product.sku,
        name: product.name,
        description: product.description,
        image: product.image,
        categoryId,
        status: mapStockStatus(product.status),
        statusLabel: product.statusLabel,
        priceLabel: product.priceLabel,
        priceNote: product.priceNote,
        gallery: product.gallery ?? undefined,
        features: product.features ?? undefined,
        specifications: product.specifications ?? undefined,
        downloads: product.downloads ?? undefined,
        benefit: product.benefit ?? undefined,
        isFeatured: featuredSlugs.has(product.slug),
        sortOrder: index,
      },
    });
  }

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: mapArticleCategory(article.category),
        categoryLabel: article.categoryLabel,
        image: article.image,
        featured: article.featured ?? false,
        publishedAt: parseArticleDate(article.date),
      },
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: mapArticleCategory(article.category),
        categoryLabel: article.categoryLabel,
        image: article.image,
        featured: article.featured ?? false,
        publishedAt: parseArticleDate(article.date),
      },
    });
  }

  for (const [index, faq] of faqItems.entries()) {
    const existing = await prisma.faq.findFirst({
      where: { question: faq.question },
    });

    if (existing) {
      await prisma.faq.update({
        where: { id: existing.id },
        data: {
          category: mapFaqCategory(faq.category),
          answer: faq.answer,
          sortOrder: index,
        },
      });
    } else {
      await prisma.faq.create({
        data: {
          category: mapFaqCategory(faq.category),
          question: faq.question,
          answer: faq.answer,
          sortOrder: index,
        },
      });
    }
  }

  const retortProduct = await prisma.product.findUnique({
    where: { slug: "industrial-retort-sterilizer" },
    select: { id: true },
  });

  for (const [index, testimonial] of defaultTestimonials.entries()) {
    const existing = await prisma.productReview.findFirst({
      where: { authorName: testimonial.name, company: testimonial.company },
    });

    const reviewData = {
      productId: retortProduct?.id ?? null,
      authorName: testimonial.name,
      company: testimonial.company,
      rating: testimonial.rating,
      review: testimonial.review,
      image: testimonial.image,
      dateLabel: testimonial.dateLabel,
      sortOrder: index,
    };

    if (existing) {
      await prisma.productReview.update({
        where: { id: existing.id },
        data: reviewData,
      });
    } else {
      await prisma.productReview.create({ data: reviewData });
    }
  }

  const customerPassword = await hashPassword("User123!");
  const customer = await prisma.customer.upsert({
    where: { email: "user@industrialx.com" },
    update: {},
    create: {
      email: "user@industrialx.com",
      name: "Demo User",
      password: customerPassword,
      phone: "081234567890",
    },
  });

  const favoriteProduct = await prisma.product.findFirst({
    where: { slug: "industrial-retort-sterilizer" },
    select: { id: true },
  });

  if (favoriteProduct) {
    await prisma.favorite.upsert({
      where: {
        customerId_productId: {
          customerId: customer.id,
          productId: favoriteProduct.id,
        },
      },
      update: {},
      create: {
        customerId: customer.id,
        productId: favoriteProduct.id,
      },
    });
  }

  console.log("Seed completed.");
  console.log("Superadmin: superadmin@industrialx.com / SuperAdmin123!");
  console.log("Admin: admin@industrialx.com / Admin123!");
  console.log("Customer (PWA): user@industrialx.com / User123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
