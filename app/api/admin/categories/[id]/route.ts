import {
  isAuthError,
  requireCatalogSession,
} from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { categoryRepository } from "@/lib/repositories/category.repository";
import { categorySchema } from "@/lib/validations/admin";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const category = await categoryRepository.findById(id);

  if (!category) {
    return jsonError("Kategori tidak ditemukan", 404);
  }

  return jsonOk(category);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = await request.json();
  const parsed = categorySchema.partial().safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  if (parsed.data.slug) {
    const existing = await categoryRepository.findBySlug(parsed.data.slug);
    if (existing && existing.id !== id) {
      return jsonError("Slug kategori sudah digunakan", 409);
    }
  }

  try {
    const category = await categoryRepository.update(id, parsed.data);
    return jsonOk(category);
  } catch {
    return jsonError("Kategori tidak ditemukan", 404);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  try {
    await categoryRepository.delete(id);
    return jsonOk({ success: true });
  } catch {
    return jsonError("Kategori tidak dapat dihapus (masih memiliki produk)", 400);
  }
}
