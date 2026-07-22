import { prisma } from "@/lib/db/prisma";
import type { FaqInput } from "@/lib/validations/content";

export const faqRepository = {
  findAll(includeInactive = false) {
    return prisma.faq.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
  },

  findById(id: string) {
    return prisma.faq.findUnique({ where: { id } });
  },

  count() {
    return prisma.faq.count();
  },

  create(data: FaqInput) {
    return prisma.faq.create({ data });
  },

  update(id: string, data: Partial<FaqInput>) {
    return prisma.faq.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.faq.delete({ where: { id } });
  },
};
