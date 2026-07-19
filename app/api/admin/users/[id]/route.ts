import {
  isAuthError,
  requireSuperAdminSession,
} from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { userRepository } from "@/lib/repositories/user.repository";
import { updateUserSchema } from "@/lib/validations/admin";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const auth = await requireSuperAdminSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const user = await userRepository.findById(id);

  if (!user) {
    return jsonError("Pengguna tidak ditemukan", 404);
  }

  return jsonOk(user);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const auth = await requireSuperAdminSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  if (id === auth.session.sub) {
    const body = await request.json();
    if (body.role && body.role !== auth.session.role) {
      return jsonError("Tidak dapat mengubah role akun sendiri", 400);
    }
    if (body.isActive === false) {
      return jsonError("Tidak dapat menonaktifkan akun sendiri", 400);
    }
  }

  const body = await request.json();
  const parsed = updateUserSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
  }

  if (parsed.data.email) {
    const existing = await userRepository.findByEmail(parsed.data.email.toLowerCase());
    if (existing && existing.id !== id) {
      return jsonError("Email sudah terdaftar", 409);
    }
  }

  try {
    const user = await userRepository.update(id, {
      ...parsed.data,
      email: parsed.data.email?.toLowerCase(),
    });
    return jsonOk(user);
  } catch {
    return jsonError("Pengguna tidak ditemukan", 404);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireSuperAdminSession();
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  if (id === auth.session.sub) {
    return jsonError("Tidak dapat menghapus akun sendiri", 400);
  }

  try {
    await userRepository.delete(id);
    return jsonOk({ success: true });
  } catch {
    return jsonError("Pengguna tidak ditemukan", 404);
  }
}
