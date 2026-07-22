import { isAuthError, requireCatalogSession } from "@/lib/auth/guard";
import { jsonOk } from "@/lib/api/response";
import { customerRepository } from "@/lib/repositories/customer.repository";

export async function GET() {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  const customers = await customerRepository.findAll();
  return jsonOk(customers);
}
