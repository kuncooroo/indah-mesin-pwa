import {
  isAuthError,
  requireCatalogSession,
} from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { productRepository } from "@/lib/repositories/product.repository";
import { productSchema } from "@/lib/validations/admin";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const product = await productRepository.findById(id);

  if (!product) {
    return jsonError("Produk tidak ditemukan", 404);
  }

  return jsonOk(product);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = await request.json();
  const parsed = productSchema.partial().safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  if (parsed.data.slug) {
    const existing = await productRepository.findBySlug(parsed.data.slug);
    if (existing && existing.id !== id) {
      return jsonError("Slug produk sudah digunakan", 409);
    }
  }

  try {
    const product = await productRepository.update(id, parsed.data);
    return jsonOk(product);
  } catch {
    return jsonError("Produk tidak ditemukan", 404);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  try {
    await productRepository.delete(id);
    return jsonOk({ success: true });
  } catch {
    return jsonError("Produk tidak ditemukan", 404);
  }
}
