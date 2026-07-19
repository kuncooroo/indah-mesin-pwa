import { NextResponse } from "next/server";

import { canManageCatalog, canManageUsers, isAdmin } from "@/lib/auth/permissions";
import { getSessionFromCookie } from "@/lib/auth/session";
import type { SessionPayload } from "@/lib/auth/types";

export type AuthContext = {
  session: SessionPayload;
};

export async function requireAdminSession(): Promise<
  AuthContext | NextResponse
> {
  const session = await getSessionFromCookie();

  if (!session || !isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return { session };
}

export async function requireSuperAdminSession(): Promise<
  AuthContext | NextResponse
> {
  const session = await getSessionFromCookie();

  if (!session || !canManageUsers(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return { session };
}

export async function requireCatalogSession(): Promise<
  AuthContext | NextResponse
> {
  const session = await getSessionFromCookie();

  if (!session || !canManageCatalog(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return { session };
}

export function isAuthError(
  result: AuthContext | NextResponse,
): result is NextResponse {
  return result instanceof NextResponse;
}
