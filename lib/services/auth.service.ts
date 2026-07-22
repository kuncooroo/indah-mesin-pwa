import { verifyPassword, hashPassword } from "@/lib/auth/password";
import {
  createSessionToken,
  setSessionCookie,
  type SessionPayload,
} from "@/lib/auth/session";
import { categoryRepository } from "@/lib/repositories/category.repository";
import { productRepository } from "@/lib/repositories/product.repository";
import { userRepository } from "@/lib/repositories/user.repository";
import { articleRepository } from "@/lib/repositories/article.repository";
import { faqRepository } from "@/lib/repositories/faq.repository";
import { reviewRepository } from "@/lib/repositories/review.repository";
import { favoriteRepository } from "@/lib/repositories/favorite.repository";
import { customerRepository } from "@/lib/repositories/customer.repository";
import { notificationService } from "@/lib/services/notification.service";
import { prisma } from "@/lib/db/prisma";
import type { LoginInput } from "@/lib/validations/admin";
import type { RegisterInput } from "@/lib/validations/customer";
import { randomBytes } from "node:crypto";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

async function createSessionFor(payload: SessionPayload) {
  const token = await createSessionToken(payload);
  await setSessionCookie(token);
  return token;
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

    await createSessionFor(sessionPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },

  async loginCustomer(input: LoginInput) {
    const customer = await customerRepository.findByEmail(
      input.email.toLowerCase(),
    );

    if (!customer || !customer.isActive) {
      throw new AuthError("Email atau password salah");
    }

    const valid = await verifyPassword(input.password, customer.password);

    if (!valid) {
      throw new AuthError("Email atau password salah");
    }

    const sessionPayload: SessionPayload = {
      sub: customer.id,
      email: customer.email,
      name: customer.name,
      role: "CUSTOMER",
    };

    await createSessionFor(sessionPayload);

    return {
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        role: "CUSTOMER" as const,
      },
    };
  },

  async registerCustomer(input: RegisterInput) {
    const email = input.email.toLowerCase();
    const existing = await customerRepository.findByEmail(email);

    if (existing) {
      throw new AuthError("Email sudah terdaftar");
    }

    const passwordHash = await hashPassword(input.password);
    const customer = await customerRepository.create({
      email,
      name: input.name.trim(),
      password: passwordHash,
      phone: input.phone?.trim() || null,
    });

    const sessionPayload: SessionPayload = {
      sub: customer.id,
      email: customer.email,
      name: customer.name,
      role: "CUSTOMER",
    };

    await createSessionFor(sessionPayload);

    void notificationService.notifyWelcome(
      customer.id,
      customer.email,
      customer.name,
    );

    return {
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        role: "CUSTOMER" as const,
      },
    };
  },

  async loginOrRegisterWithGoogle(profile: {
    googleId: string;
    email: string;
    name: string;
    avatarUrl?: string;
  }) {
    const email = profile.email.toLowerCase();
    let customer =
      (await customerRepository.findByGoogleId(profile.googleId)) ??
      (await customerRepository.findByEmail(email));

    let isNew = false;

    if (!customer) {
      isNew = true;
      const passwordHash = await hashPassword(
        randomBytes(32).toString("hex"),
      );
      customer = await customerRepository.create({
        email,
        name: profile.name.trim() || email.split("@")[0],
        password: passwordHash,
        googleId: profile.googleId,
        avatarUrl: profile.avatarUrl ?? null,
      });
    } else if (!customer.googleId) {
      customer = await customerRepository.update(customer.id, {
        googleId: profile.googleId,
        avatarUrl: profile.avatarUrl ?? customer.avatarUrl,
      });
    }

    if (!customer.isActive) {
      throw new AuthError("Akun tidak aktif");
    }

    const sessionPayload: SessionPayload = {
      sub: customer.id,
      email: customer.email,
      name: customer.name,
      role: "CUSTOMER",
    };

    await createSessionFor(sessionPayload);

    if (isNew) {
      void notificationService.notifyWelcome(
        customer.id,
        customer.email,
        customer.name,
      );
    }

    return {
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        role: "CUSTOMER" as const,
      },
      isNew,
    };
  },
};

export const dashboardService = {
  async getStats() {
    const [
      users,
      categories,
      products,
      featuredProducts,
      articles,
      faqs,
      reviews,
      rfqs,
      favorites,
      customers,
    ] = await Promise.all([
      userRepository.count(),
      categoryRepository.count(),
      productRepository.count(),
      productRepository.countFeatured(),
      articleRepository.count(),
      faqRepository.count(),
      reviewRepository.count(),
      prisma.rfq.count(),
      favoriteRepository.count(),
      customerRepository.count(),
    ]);

    return {
      users,
      categories,
      products,
      featuredProducts,
      articles,
      faqs,
      reviews,
      rfqs,
      favorites,
      customers,
    };
  },
};
