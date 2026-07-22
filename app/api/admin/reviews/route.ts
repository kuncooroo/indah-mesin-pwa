import { isAuthError, requireCatalogSession } from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { reviewRepository } from "@/lib/repositories/review.repository";
import { reviewSchema } from "@/lib/validations/content";

export async function GET() {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const reviews = await reviewRepository.findAll(true);
  return jsonOk(reviews);
}

export async function POST(request: Request) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  const review = await reviewRepository.create({
    ...parsed.data,
    productId: parsed.data.productId || null,
    image: parsed.data.image || null,
    dateLabel: parsed.data.dateLabel || null,
  });
  return jsonOk(review, { status: 201 });
}
