import {
  isAuthError,
  requireCatalogSession,
  requireSuperAdminSession,
} from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { categoryRepository } from "@/lib/repositories/category.repository";
import { categorySchema } from "@/lib/validations/admin";

export async function GET() {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const categories = await categoryRepository.findAll(true);
  return jsonOk(categories);
}

export async function POST(request: Request) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = categorySchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  const existing = await categoryRepository.findBySlug(parsed.data.slug);
  if (existing) {
    return jsonError("Slug kategori sudah digunakan", 409);
  }

  const category = await categoryRepository.create(parsed.data);
  return jsonOk(category, { status: 201 });
}
