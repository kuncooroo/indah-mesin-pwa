import { verifyPassword } from "@/lib/auth/password";
import {
  createSessionToken,
  setSessionCookie,
  type SessionPayload,
} from "@/lib/auth/session";
import { categoryRepository } from "@/lib/repositories/category.repository";
import { productRepository } from "@/lib/repositories/product.repository";
import { userRepository } from "@/lib/repositories/user.repository";
import type { LoginInput } from "@/lib/validations/admin";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const authService = {
  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email.toLowerCase());

    if (!user || !user.isActive) {
      throw new AuthError("Email atau password salah");
    }

    const valid = await verifyPassword(input.password, user.password);

    if (!valid) {
      throw new AuthError("Email atau password salah");
    }

    const sessionPayload: SessionPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await createSessionToken(sessionPayload);
    await setSessionCookie(token);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },
};

export const dashboardService = {
  async getStats() {
    const [users, categories, products, featuredProducts] = await Promise.all([
      userRepository.count(),
      categoryRepository.count(),
      productRepository.count(),
      productRepository.countFeatured(),
    ]);

    return { users, categories, products, featuredProducts };
  },
};
