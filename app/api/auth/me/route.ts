import { getSessionFromCookie } from "@/lib/auth/session";
import { jsonError, jsonOk } from "@/lib/api/response";

export async function GET() {
  const session = await getSessionFromCookie();

  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  return jsonOk({
    user: {
      id: session.sub,
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
}
