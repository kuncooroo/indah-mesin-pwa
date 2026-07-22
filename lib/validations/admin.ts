import { z } from "zod";

import { StockStatus, UserRole } from "@/lib/generated/prisma/client";

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const categorySchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan strip"),
  label: z.string().min(2),
  icon: z.string().optional(),
  description: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const productSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan strip"),
  sku: z.string().min(2),
  name: z.string().min(2),
  description: z.string().min(10),
  image: z
    .string()
    .min(1, "Gambar wajib diunggah")
    .refine(
      (value) => value.startsWith("/assets/") || value.startsWith("http"),
      "Path gambar tidak valid",
    ),
  categoryId: z.string().min(1),
  status: z.enum(StockStatus),
  statusLabel: z.string().min(2),
  priceLabel: z.string().min(2),
  priceNote: z.string().optional(),
  gallery: z.unknown().optional(),
  features: z.array(z.string()).optional(),
  specifications: z
    .array(z.object({ attribute: z.string(), value: z.string() }))
    .optional(),
  downloads: z
    .array(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
  benefit: z.unknown().optional(),
  minOrder: z.coerce.number().int().min(1).default(1),
  rating: z.coerce.number().min(0).max(5).default(0),
  soldCount: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const userSchema = z.object({
  email: z.email(),
  name: z.string().min(2),
  password: z.string().min(8).optional(),
  role: z.enum(UserRole),
  isActive: z.boolean().default(true),
});

export const createUserSchema = userSchema.extend({
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const updateUserSchema = userSchema.partial();

export type LoginInput = z.infer<typeof loginSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type UserInput = z.infer<typeof userSchema>;
