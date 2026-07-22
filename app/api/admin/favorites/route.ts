import { isAuthError, requireCatalogSession } from "@/lib/auth/guard";
import { jsonOk } from "@/lib/api/response";
import { favoriteRepository } from "@/lib/repositories/favorite.repository";

export async function GET() {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const favorites = await favoriteRepository.findAll();
  return jsonOk(favorites);
}
