import { prisma } from "@/lib/db/prisma";
import type { ReviewInput } from "@/lib/validations/content";

export const reviewRepository = {
  findAll(includeInactive = false) {
    return prisma.productReview.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        product: { select: { id: true, slug: true, name: true } },
      },
    });
  },

  findById(id: string) {
    return prisma.productReview.findUnique({
      where: { id },
      include: {
        product: { select: { id: true, slug: true, name: true } },
      },
    });
  },

  findByProductSlug(slug: string) {
    return prisma.productReview.findMany({
      where: {
        isActive: true,
        product: { slug },
      },
      orderBy: [{ sortOrder: "asc" }],
    });
  },

  count() {
    return prisma.productReview.count();
  },

  create(data: ReviewInput) {
    return prisma.productReview.create({ data });
  },

  update(id: string, data: Partial<ReviewInput>) {
    return prisma.productReview.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.productReview.delete({ where: { id } });
  },
};
