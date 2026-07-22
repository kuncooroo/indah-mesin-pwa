import { isAuthError, requireCatalogSession } from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { articleRepository } from "@/lib/repositories/article.repository";
import { articleSchema } from "@/lib/validations/content";

export async function GET() {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const articles = await articleRepository.findAll(true);
  return jsonOk(articles);
}

export async function POST(request: Request) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = articleSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  const existing = await articleRepository.findBySlug(parsed.data.slug);
  if (existing) {
    return jsonError("Slug artikel sudah digunakan", 409);
  }

  const article = await articleRepository.create(parsed.data);
  return jsonOk(article, { status: 201 });
}
