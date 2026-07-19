import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/auth/permissions";
import { getSessionFromCookie } from "@/lib/auth/session";

export async function requireAdminPage() {
  const session = await getSessionFromCookie();

  if (!session || !isAdmin(session)) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireSuperAdminPage() {
  const session = await requireAdminPage();

  if (session.role !== "SUPERADMIN") {
    redirect("/admin");
  }

  return session;
}
