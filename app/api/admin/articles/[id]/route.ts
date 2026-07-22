import { isAuthError, requireCatalogSession } from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { articleRepository } from "@/lib/repositories/article.repository";
import { articleSchema } from "@/lib/validations/content";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = await request.json();
  const parsed = articleSchema.partial().safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  const article = await articleRepository.update(id, parsed.data);
  return jsonOk(article);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  await articleRepository.delete(id);
  return jsonOk({ success: true });
}
