import { AuthError, authService } from "@/lib/services/auth.service";
import { jsonError, jsonOk } from "@/lib/api/response";
import { loginSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
    }

    const result = await authService.login(parsed.data);
    return jsonOk(result);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError(error.message, 401);
    }

    console.error("[auth/login]", error);
    return jsonError("Terjadi kesalahan server", 500);
  }
}
