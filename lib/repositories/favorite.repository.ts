import { prisma } from "@/lib/db/prisma";

export const favoriteRepository = {
  findAll() {
    return prisma.favorite.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { id: true, name: true, email: true } },
        product: { select: { id: true, slug: true, name: true } },
      },
    });
  },

  count() {
    return prisma.favorite.count();
  },

  findByCustomer(customerId: string) {
    return prisma.favorite.findMany({
      where: { customerId },
      include: {
        product: { select: { id: true, slug: true, name: true, image: true, priceLabel: true } },
      },
    });
  },
};
