import { AuthError, authService } from "@/lib/services/auth.service";
import { jsonError, jsonOk } from "@/lib/api/response";
import { exchangeGoogleCode } from "@/lib/auth/google";
import { z } from "zod";

const exchangeSchema = z.object({
  code: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = exchangeSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Kode Google tidak valid", 422);
    }

    const profile = await exchangeGoogleCode(parsed.data.code, "postmessage");

    if (!profile.email) {
      return jsonError("Email Google tidak tersedia", 400);
    }

    const result = await authService.loginOrRegisterWithGoogle({
      googleId: profile.sub,
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.picture,
    });

    return jsonOk(result);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError(error.message, 401);
    }

    console.error("[auth/google/exchange]", error);
    return jsonError("Login Google gagal", 500);
  }
}
