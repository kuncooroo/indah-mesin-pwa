import { AuthError, authService } from "@/lib/services/auth.service";
import { jsonError, jsonOk } from "@/lib/api/response";
import { registerSchema } from "@/lib/validations/customer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
    }

    const result = await authService.registerCustomer(parsed.data);
    return jsonOk(result);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError(error.message, 400);
    }

    console.error("[auth/customer/register]", error);
    return jsonError("Terjadi kesalahan server", 500);
  }
}
