import { isAuthError, requireCatalogSession } from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { faqRepository } from "@/lib/repositories/faq.repository";
import { faqSchema } from "@/lib/validations/content";

export async function GET() {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const faqs = await faqRepository.findAll(true);
  return jsonOk(faqs);
}

export async function POST(request: Request) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = faqSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  const faq = await faqRepository.create(parsed.data);
  return jsonOk(faq, { status: 201 });
}
