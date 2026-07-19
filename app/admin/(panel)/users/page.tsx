import { UsersManager } from "@/components/admin/users-manager";
import { requireSuperAdminPage } from "@/lib/admin/auth";

export default async function AdminUsersPage() {
  await requireSuperAdminPage();
  return <UsersManager />;
}
