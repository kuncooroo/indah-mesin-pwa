import { prisma } from "@/lib/db/prisma";
import type { CategoryInput } from "@/lib/validations/admin";

export const categoryRepository = {
  findAll(includeInactive = false) {
    return prisma.category.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
      include: {
        _count: { select: { products: true } },
      },
    });
  },

  findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
  },

  findBySlug(slug: string) {
    return prisma.category.findUnique({ where: { slug } });
  },

  create(data: CategoryInput) {
    return prisma.category.create({ data });
  },

  update(id: string, data: Partial<CategoryInput>) {
    return prisma.category.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  },

  count() {
    return prisma.category.count();
  },
};
