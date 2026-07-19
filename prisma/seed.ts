import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { hashPassword } from "../lib/auth/password";
import { PrismaClient, StockStatus, UserRole } from "../lib/generated/prisma/client";
import { categoryTabs, homeCategories } from "../lib/data/categories";
import { products } from "../lib/data/products";

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

  console.log("Seed completed.");
  console.log("Superadmin: superadmin@industrialx.com / SuperAdmin123!");
  console.log("Admin: admin@industrialx.com / Admin123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
