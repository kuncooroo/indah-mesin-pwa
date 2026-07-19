import { isAuthError, requireAdminSession } from "@/lib/auth/guard";
import { jsonOk } from "@/lib/api/response";
import { dashboardService } from "@/lib/services/auth.service";

export async function GET() {
  const auth = await requireAdminSession();
  if (isAuthError(auth)) return auth;

  const stats = await dashboardService.getStats();
  return jsonOk(stats);
}
