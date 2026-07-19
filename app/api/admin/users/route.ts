import {
  isAuthError,
  requireSuperAdminSession,
} from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { userRepository } from "@/lib/repositories/user.repository";
import { createUserSchema } from "@/lib/validations/admin";

export async function GET() {
  const auth = await requireSuperAdminSession();
  if (isAuthError(auth)) return auth;

  const users = await userRepository.findAll();
  return jsonOk(users);
}

export async function POST(request: Request) {
  const auth = await requireSuperAdminSession();
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  const existing = await userRepository.findByEmail(parsed.data.email.toLowerCase());
  if (existing) {
    return jsonError("Email sudah terdaftar", 409);
  }

  const user = await userRepository.create({
    ...parsed.data,
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
  });

  return jsonOk(user, { status: 201 });
}
