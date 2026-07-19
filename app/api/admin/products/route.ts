import {
  isAuthError,
  requireCatalogSession,
} from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { productRepository } from "@/lib/repositories/product.repository";
import { productSchema } from "@/lib/validations/admin";

export async function GET(request: Request) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId") ?? undefined;

  const products = await productRepository.findAll({
    includeInactive: true,
    categoryId,
  });

  return jsonOk(products);
}

export async function POST(request: Request) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  const existingSlug = await productRepository.findBySlug(parsed.data.slug);
  if (existingSlug) {
    return jsonError("Slug produk sudah digunakan", 409);
  }

  const product = await productRepository.create(parsed.data);
  return jsonOk(product, { status: 201 });
}
