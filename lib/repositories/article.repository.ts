import { prisma } from "@/lib/db/prisma";
import type { ArticleInput } from "@/lib/validations/content";

export const articleRepository = {
  findAll(includeInactive = false) {
    return prisma.article.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ publishedAt: "desc" }],
    });
  },

  findById(id: string) {
    return prisma.article.findUnique({ where: { id } });
  },

  findBySlug(slug: string) {
    return prisma.article.findUnique({ where: { slug } });
  },

  count() {
    return prisma.article.count();
  },

  create(data: ArticleInput) {
    return prisma.article.create({ data });
  },

  update(id: string, data: Partial<ArticleInput>) {
    return prisma.article.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.article.delete({ where: { id } });
  },
};
