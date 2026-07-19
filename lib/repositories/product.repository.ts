import { prisma } from "@/lib/db/prisma";
import type { ProductInput } from "@/lib/validations/admin";

export const productRepository = {
  findAll(options?: {
    includeInactive?: boolean;
    categoryId?: string;
    featuredOnly?: boolean;
  }) {
    return prisma.product.findMany({
      where: {
        isActive: options?.includeInactive ? undefined : true,
        categoryId: options?.categoryId,
        isFeatured: options?.featuredOnly ? true : undefined,
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        category: {
          select: { id: true, slug: true, label: true },
        },
      },
    });
  },

  findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, slug: true, label: true },
        },
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: { id: true, slug: true, label: true },
        },
      },
    });
  },

  create(data: ProductInput) {
    return prisma.product.create({
      data: {
        ...data,
        gallery: data.gallery ?? undefined,
        features: data.features ?? undefined,
        specifications: data.specifications ?? undefined,
        downloads: data.downloads ?? undefined,
        benefit: data.benefit ?? undefined,
      },
      include: {
        category: { select: { id: true, slug: true, label: true } },
      },
    });
  },

  update(id: string, data: Partial<ProductInput>) {
    return prisma.product.update({
      where: { id },
      data: {
        ...data,
        gallery: data.gallery ?? undefined,
        features: data.features ?? undefined,
        specifications: data.specifications ?? undefined,
        downloads: data.downloads ?? undefined,
        benefit: data.benefit ?? undefined,
      },
      include: {
        category: { select: { id: true, slug: true, label: true } },
      },
    });
  },

  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  },

  count() {
    return prisma.product.count();
  },

  countFeatured() {
    return prisma.product.count({ where: { isFeatured: true, isActive: true } });
  },
};
