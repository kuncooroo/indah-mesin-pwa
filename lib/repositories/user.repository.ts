import { prisma } from "@/lib/db/prisma";
import type { UserInput } from "@/lib/validations/admin";
import { hashPassword } from "@/lib/auth/password";

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  findAll() {
    return prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async create(data: UserInput & { password: string }) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        isActive: data.isActive,
        password: await hashPassword(data.password),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  },

  async update(id: string, data: Partial<UserInput>) {
    const updateData: Record<string, unknown> = {
      email: data.email,
      name: data.name,
      role: data.role,
      isActive: data.isActive,
    };

    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });
  },

  delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },

  count() {
    return prisma.user.count();
  },
};
