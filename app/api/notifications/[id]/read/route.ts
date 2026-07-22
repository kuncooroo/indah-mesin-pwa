import { getSessionFromCookie } from "@/lib/auth/session";
import { jsonError, jsonOk } from "@/lib/api/response";
import { notificationService } from "@/lib/services/notification.service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(_request: Request, context: RouteContext) {
  const session = await getSessionFromCookie();

  if (!session || session.role !== "CUSTOMER") {
    return jsonError("Unauthorized", 401);
  }

  const { id } = await context.params;
  await notificationService.markRead(id, session.sub);

  return jsonOk({ success: true });
}
