import { getSessionFromCookie } from "@/lib/auth/session";
import { jsonError, jsonOk } from "@/lib/api/response";
import { notificationService } from "@/lib/services/notification.service";

export async function GET() {
  const session = await getSessionFromCookie();

  if (!session || session.role !== "CUSTOMER") {
    return jsonError("Unauthorized", 401);
  }

  const notifications = await notificationService.listForCustomer(session.sub);

  return jsonOk(
    notifications.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      message: item.message,
      isRead: item.isRead,
      sentEmail: item.sentEmail,
      createdAt: item.createdAt.toISOString(),
    })),
  );
}
