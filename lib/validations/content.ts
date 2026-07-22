import { z } from "zod";

import {
  ArticleCategory,
  FaqCategory,
} from "@/lib/generated/prisma/client";

export const articleSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan strip"),
  title: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  category: z.nativeEnum(ArticleCategory),
  categoryLabel: z.string().min(2),
  image: z
    .string()
    .min(1, "Gambar wajib diunggah")
    .refine(
      (value) => value.startsWith("/assets/") || value.startsWith("http"),
      "Path gambar tidak valid",
    ),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  publishedAt: z.coerce.date(),
});

export const faqSchema = z.object({
  category: z.nativeEnum(FaqCategory),
  question: z.string().min(5),
  answer: z.string().min(5),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const reviewSchema = z.object({
  productId: z.string().optional().nullable(),
  authorName: z.string().min(2),
  company: z.string().min(2),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  review: z.string().min(10),
  image: z
    .string()
    .refine(
      (value) =>
        !value ||
        value.startsWith("/assets/") ||
        value.startsWith("http"),
      "Path gambar tidak valid",
    )
    .optional()
    .nullable(),
  dateLabel: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export type ArticleInput = z.infer<typeof articleSchema>;
export type FaqInput = z.infer<typeof faqSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
