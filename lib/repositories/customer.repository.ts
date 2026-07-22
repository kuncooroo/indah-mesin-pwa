import { prisma } from "@/lib/db/prisma";

type CreateCustomerInput = {
  email: string;
  name: string;
  password: string;
  phone?: string | null;
  googleId?: string | null;
  avatarUrl?: string | null;
};

export const customerRepository = {
  findByEmail(email: string) {
    return prisma.customer.findUnique({ where: { email: email.toLowerCase() } });
  },

  findByGoogleId(googleId: string) {
    return prisma.customer.findUnique({ where: { googleId } });
  },

  findById(id: string) {
    return prisma.customer.findUnique({ where: { id } });
  },

  create(data: CreateCustomerInput) {
    return prisma.customer.create({
      data: {
        email: data.email.toLowerCase(),
        name: data.name,
        password: data.password,
        phone: data.phone ?? null,
        googleId: data.googleId ?? null,
        avatarUrl: data.avatarUrl ?? null,
      },
    });
  },

  update(
    id: string,
    data: Partial<Omit<CreateCustomerInput, "email">> & { isActive?: boolean },
  ) {
    return prisma.customer.update({ where: { id }, data });
  },

  findAll() {
    return prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isActive: true,
        createdAt: true,
        _count: { select: { favorites: true, rfqs: true } },
      },
    });
  },

  count() {
    return prisma.customer.count();
  },
};
