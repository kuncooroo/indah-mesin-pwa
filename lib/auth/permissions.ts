import { UserRole } from "@/lib/generated/prisma/client";
import type { SessionPayload } from "@/lib/auth/types";

export function isSuperAdmin(session: SessionPayload | null): boolean {
  return session?.role === UserRole.SUPERADMIN;
}

export function isAdmin(session: SessionPayload | null): boolean {
  return (
    session?.role === UserRole.ADMIN || session?.role === UserRole.SUPERADMIN
  );
}

export function canManageUsers(session: SessionPayload | null): boolean {
  return isSuperAdmin(session);
}

export function canManageCatalog(session: SessionPayload | null): boolean {
  return isAdmin(session);
}
